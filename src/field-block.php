<?php
/**
 * Field Block Plugin
 *
 * @package Wpinc Blok
 * @author Takuto Yanagida
 * @version 2024-02-29
 */

declare(strict_types=1);

namespace wpinc\blok\field;

require_once __DIR__ . '/assets/theme-plugin-url.php';
require_once __DIR__ . '/assets/admin-current-post.php';

const BLOCK_NAME = 'wpinc/field';

/** phpcs:ignore
 * Adds field block.
 *
 * phpcs:ignore
 * @param array{
 *     key                : string,
 *     label              : string,
 *     post_type          : string,
 *     do_render?         : bool,
 *     do_support_classic?: bool,
 * } $args An array of arguments.
 *
 * $args {
 *     An array of arguments.
 *
 *     @type string 'key'                Key of post meta.
 *     @type string 'label'              Label of the post meta.
 *     @type string 'post_type'          Target post type.
 *     @type bool   'do_render'          Whether to render before storing contents.
 *     @type bool   'do_support_classic' Whether the block editor can be switched to the classic editor.
 * }
 * @return bool True if the meta key was successfully registered, false if not.
 */
function add_block( array $args ): bool {
	if ( empty( $args['key'] ) || empty( $args['label'] ) || empty( $args['post_type'] ) ) {
		return false;
	}
	$args['do_render']          = $args['do_render'] ?? true;
	$args['do_support_classic'] = $args['do_support_classic'] ?? false;

	$pt = $args['post_type'];
	_register_block( $pt );

	$inst = _get_instance();
	if ( ! isset( $inst->pt_entries[ $pt ] ) ) {
		$inst->pt_entries[ $pt ] = array();  // @phpstan-ignore-line
	}
	$inst->pt_entries[ $pt ][] = array(
		'key'                => $args['key'],
		'label'              => $args['label'],
		'do_render'          => $args['do_render'],
		'do_support_classic' => $args['do_support_classic'],
	);

	return register_post_meta(
		$pt,
		$args['key'],
		array(
			'type'          => 'string',
			'single'        => true,
			'show_in_rest'  => true,
			'auth_callback' => function () {
				// For support for private fields.
				return current_user_can( 'edit_posts' );
			},
		)
	);
}

/**
 * Registers field block.
 *
 * @access private
 * @param string $pt Post type.
 */
function _register_block( string $pt ): void {
	static $do_once_pt = array();
	if ( in_array( $pt, $do_once_pt, true ) ) {
		return;
	}
	add_filter( "rest_prepare_$pt", '\wpinc\blok\field\_cb_rest_prepare_post_type', 10, 3 );

	static $do_once = false;
	if ( $do_once ) {
		return;
	}
	$do_once = true;
	\wpinc\initialize_theme_plugin_url();

	add_action( 'init', '\wpinc\blok\field\_cb_init' );
	add_action( 'save_post', '\wpinc\blok\field\_cb_save_post', 10, 2 );
	add_filter( 'pre_render_block', '\wpinc\blok\field\_cb_pre_render_block', 10, 2 );

	if ( is_admin() ) {
		add_filter( 'the_editor_content', '\wpinc\blok\field\_cb_the_editor_content' );
	}
}

/**
 * Callback function for 'init' hook.
 */
function _cb_init(): void {
	$pt = \wpinc\get_admin_post_type();
	if ( ! $pt ) {
		return;
	}
	if ( ! post_type_supports( $pt, 'custom-fields' ) ) {
		add_post_type_support( $pt, 'custom-fields' );
	}
	$tes = _get_target_entries( $pt );
	if ( ! empty( $tes ) ) {
		// Must use 'register_block_type_from_metadata' instead of 'register_block_type' for WP 5.7.
		register_block_type_from_metadata( __DIR__ . '/blocks/field' );

		wp_set_script_translations( 'wpinc-field-editor-script', 'wpinc', __DIR__ . '\languages' );
		wp_localize_script( 'wpinc-field-editor-script', 'wpinc_field_args', array( 'entries' => $tes ) );
	}
}

/**
 * Callback function for 'the_editor_content' hook.
 *
 * @param string $content Content of the current post.
 * @return string The content.
 */
function _cb_the_editor_content( string $content ): string {
	$pt = \wpinc\get_admin_post_type();
	if ( ! $pt ) {
		return $content;
	}
	$tes = _get_target_entries( $pt );
	if ( empty( $tes ) ) {
		return $content;
	}
	$keys = array();
	foreach ( $tes as $te ) {
		if ( $te['do_support_classic'] ) {
			$keys[] = $te['key'];
		}
	}
	if ( empty( $keys ) ) {
		return $content;
	}
	$bs = parse_blocks( $content );
	$c  = count( $bs );

	$bs = array_filter(
		$bs,
		function ( $b ) use ( $keys ): bool {
			return BLOCK_NAME !== $b['blockName'] || ! in_array( $b['attrs']['key'], $keys, true );
		}
	);
	if ( count( $bs ) !== $c ) {
		$content = serialize_blocks( $bs );
	}
	return $content;
}

/**
 * Callback function for 'rest_prepare_{$this->post_type}' hook.
 *
 * @param \WP_REST_Response $response The response object.
 * @param \WP_Post          $post     Post object.
 * @param \WP_REST_Request  $request  Request object.
 * @return \WP_REST_Response Response object.
 */
function _cb_rest_prepare_post_type( \WP_REST_Response $response, \WP_Post $post, \WP_REST_Request $request ): \WP_REST_Response {
	if ( 'GET' !== $request->get_method() || 'edit' !== $request['context'] ) {
		return $response;
	}
	$pt = get_post_type( $post );
	if ( ! $pt ) {
		return $response;
	}
	$tes = _get_target_entries( $pt );
	if ( empty( $tes ) ) {
		return $response;
	}
	if (
		! isset( $response->data['content'] ) || // @phpstan-ignore-line
		! isset( $response->data['content']['raw'] ) || // @phpstan-ignore-line
		! is_string( $response->data['content']['raw'] )
	) {
		return $response;
	}
	$content = $response->data['content']['raw'];
	$bs      = parse_blocks( $content );
	$c       = count( $bs );

	$keys = array();
	foreach ( $bs as $b ) {
		if ( BLOCK_NAME === $b['blockName'] ) {
			$keys[] = $b['attrs']['key'];
		}
	}
	foreach ( $tes as $te ) {
		if ( ! $te['do_support_classic'] ) {
			continue;
		}
		$k = $te['key'];
		$v = '' . get_post_meta( $post->ID, $k, true );

		if ( '' !== $v && ! in_array( $k, $keys, true ) ) {
			$b = array(
				'blockName' => BLOCK_NAME,
				'attrs'     => array( 'key' => $k ),
			);
			if ( $te['do_render'] ) {
				$b['innerContent'] = array( "<!-- wp:freeform -->$v<!-- /wp:freeform -->" );
			} else {
				$b['innerContent'] = array( $v );
			}
			$bs[] = $b;
		}
	}
	if ( count( $bs ) !== $c ) {
		$response->data['content']['raw'] = serialize_blocks( $bs );
	}
	return $response;
}

/**
 * Callback function for 'save_post' hook.
 *
 * @param int      $post_id Post ID.
 * @param \WP_Post $post    Post.
 */
function _cb_save_post( int $post_id, \WP_Post $post ): void {
	$inst = _get_instance();
	if ( ! isset( $inst->pt_entries['*'] ) && ! isset( $inst->pt_entries[ $post->post_type ] ) ) {
		return;
	}
	$entries = array_column( _get_target_entries( $post->post_type ), null, 'key' );
	$key_sbs = array();

	$bs = parse_blocks( $post->post_content );
	foreach ( $bs as $b ) {
		if ( BLOCK_NAME === $b['blockName'] ) {
			$key = (string) $b['attrs']['key'];
			if ( isset( $entries[ $key ] ) ) {
				if ( ! isset( $key_sbs[ $key ] ) ) {
					$key_sbs[ $key ] = array();
				}
				foreach ( $b['innerBlocks'] as $ib ) {
					$key_sbs[ $key ][] = $ib;
				}
			}
		}
	}
	foreach ( $key_sbs as $key => $sb ) {
		$fn  = $entries[ $key ]['do_render'] ? 'render_block' : 'serialize_block';
		$val = implode( '', array_map( $fn, $sb ) );
		update_post_meta( $post_id, $key, $val );
	}
}

/**
 * Callback function for 'pre_render_block' hook.
 *
 * @param string|null          $pre_render   The pre-rendered content. Default null.
 * @param array<string, mixed> $parsed_block The block being rendered.
 * @return string|null Pre-rendered string.
 */
function _cb_pre_render_block( ?string $pre_render, array $parsed_block ): ?string {
	if ( BLOCK_NAME === $parsed_block['blockName'] ) {
		return '';
	}
	return $pre_render;
}

/**
 * Retrieves target entries.
 *
 * @access private
 *
 * @param string $post_type Post type.
 * @return array{
 *     key               : string,
 *     label             : string,
 *     post_type         : string,
 *     do_render         : bool,
 *     do_support_classic: bool,
 * }[] Entries.
 */
function _get_target_entries( string $post_type ): array {
	$inst = _get_instance();
	$tes  = array();
	if ( isset( $inst->pt_entries[ $post_type ] ) ) {
		foreach ( $inst->pt_entries[ $post_type ] as $e ) {
			$tes[] = $e;
		}
	}
	return $tes;
}

/**
 * Gets entries.
 *
 * @access private
 *
 * @return object Entries.
 */
function _get_instance(): object {
	static $inst = null;
	if ( $inst ) {
		return $inst;
	}
	$inst = new class() {
		/**
		 * Array of post type to entries.
		 *
		 * @var array<string, array{
		 *     key               : string,
		 *     label             : string,
		 *     post_type         : string,
		 *     do_render         : bool,
		 *     do_support_classic: bool,
		 * }[]>
		 */
		public $pt_entries = array();
	};
	return $inst;
}
