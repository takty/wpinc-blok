<?php
/**
 * Input Block Plugin
 *
 * @package Wpinc Blok
 * @author Takuto Yanagida
 * @version 2024-03-13
 */

declare(strict_types=1);

namespace wpinc\blok\input;

require_once __DIR__ . '/assets/theme-plugin-url.php';
require_once __DIR__ . '/assets/admin-current-post.php';

const BLOCK_NAME = 'wpinc/input';

/** phpcs:ignore
 * Adds input block.
 *
 * phpcs:ignore
 * @param array{
 *     key                : string,
 *     label              : string,
 *     post_type          : string,
 *     do_support_classic?: bool,
 * } $args An array of arguments.
 *
 * $args {
 *     An array of arguments.
 *
 *     @type string 'key'                Key of post meta.
 *     @type string 'label'              Label of the post meta.
 *     @type string 'post_type'          Target post type.
 *     @type bool   'do_support_classic' Whether the block editor can be switched to the classic editor.
 * }
 * @return bool True if the meta key was successfully registered, false if not.
 */
function add_block( array $args ): bool {
	if ( '' === $args['key'] || '' === $args['label'] || '' === $args['post_type'] ) {
		return false;
	}
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
 * Registers input block.
 *
 * @access private
 * @param string $pt Post type.
 */
function _register_block( string $pt ): void {
	static $do_once_pt = array();
	if ( in_array( $pt, $do_once_pt, true ) ) {
		return;
	}
	add_filter( "rest_prepare_$pt", '\wpinc\blok\input\_cb_rest_prepare_post_type', 10, 3 );

	static $do_once = false;
	if ( $do_once ) {
		return;
	}
	$do_once = true;
	\wpinc\initialize_theme_plugin_url();

	if ( did_action( 'widgets_init' ) ) {
		add_action( 'init', '\wpinc\blok\input\_cb_widgets_init', 10, 0 );
	} else {
		add_action( 'widgets_init', '\wpinc\blok\input\_cb_widgets_init', 10, 0 );
	}

	if ( is_admin() ) {
		add_filter( 'the_editor_content', '\wpinc\blok\input\_cb_the_editor_content' );
	}
}

/**
 * Callback function for 'widgets_init' hook.
 */
function _cb_widgets_init(): void {
	$pt = \wpinc\get_admin_post_type();
	if ( ! is_string( $pt ) ) {
		return;
	}
	if ( ! post_type_supports( $pt, 'custom-fields' ) ) {
		add_post_type_support( $pt, 'custom-fields' );
	}
	$tes = _get_target_entries( $pt );
	if ( ! empty( $tes ) ) {
		// Must use 'register_block_type_from_metadata' instead of 'register_block_type' for WP 5.7.
		register_block_type_from_metadata( __DIR__ . '/blocks/input' );

		wp_set_script_translations( 'wpinc-input-editor-script', 'wpinc', __DIR__ . '\languages' );
		wp_localize_script( 'wpinc-input-editor-script', 'wpinc_input_args', array( 'entries' => $tes ) );
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
	if ( ! is_string( $pt ) ) {
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
	if ( ! is_string( $pt ) ) {
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
		$v = get_post_meta( $post->ID, $k, true );

		if ( '' !== $v && ! in_array( $k, $keys, true ) ) {
			$bs[] = array(
				'blockName'    => BLOCK_NAME,
				'attrs'        => array( 'key' => $k ),
				'innerContent' => array(),
			);
		}
	}
	if ( count( $bs ) !== $c ) {
		$response->data['content']['raw'] = serialize_blocks( $bs );
	}
	return $response;
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
		 *     do_support_classic: bool,
		 * }[]>
		 */
		public $pt_entries = array();
	};
	return $inst;
}
