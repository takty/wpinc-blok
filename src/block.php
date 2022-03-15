<?php
/**
 * Block Plugins
 *
 * @package Wpinc Blok
 * @author Takuto Yanagida
 * @version 2022-03-15
 */

namespace wpinc\blok;

require_once __DIR__ . '/assets/asset-url.php';

/**
 * Initializes.
 *
 * @param array $args {
 *     Arguments.
 *
 *     @type string 'category_title' Title of added category.
 *     @type array  'block-cards' {
 *         Arguments for cards block.
 *
 *         @type string 'class_card' CSS class for card block. Default 'card-%d'.
 *     }
 *     @type array  'block-frame' {
 *         Arguments for frame block.
 *
 *         @type string 'class_frame_normal' CSS class for normal frame. Default 'frame'.
 *         @type string 'class_frame_alt'    CSS class for alt. frame. Default 'frame-alt'.
 *     }
 *     @type array  'block-tabs' {
 *         Arguments for tabs block.
 *
 *         @type string 'class_tab_scroll' CSS class for tab scroll. Default 'tab-scroll',
 *         @type string 'class_tab_stack'  CSS class for tab stack. Default 'tab-stack',
 *     }
 * }
 */
function initialize( array $args = array() ): void {
	// phpcs:disable
	$args += array(
		'category_title' => __( 'Custom', 'wpinc_blok' ),
		'block-cards'    => array(),
		'block-frame'    => array(),
		'block-tabs'     => array(),
	);
	$args['block-cards'] += array(
		'class_card' => 'card-%d',
	);
	$args['block-frame'] += array(
		'class_frame_normal' => 'frame',
		'class_frame_alt'    => 'frame-alt',
	);
	$args['block-tabs'] += array(
		'class_tab_scroll' => 'tab-scroll',
		'class_tab_stack'  => 'tab-stack',
	);
	// phpcs:enable
	add_action(
		'block_categories_all',
		function ( $categories ) use ( $args ) {
			return _cb_block_categories_all( $args, $categories );
		},
		10
	);

	add_filter( 'plugins_url', '\wpinc\blok\_cb_plugins_url', 10, 3 );
	$blocks = array( 'card', 'cards', 'frame', 'tabs' );

	foreach ( $blocks as $b ) {
		register_block_type( __DIR__ . "/blocks/$b" );
		wp_set_script_translations( "wpinc-$b-editor-script", 'wpinc', __DIR__ . '\languages' );
		if ( isset( $args[ "block-$b" ] ) ) {
			wp_localize_script( "wpinc-$b-editor-script", "wpinc_{$b}_args", $args[ "block-$b" ] );
		}
	}
}

/**
 * Callback function for 'block_categories_all' filter.
 *
 * @access private
 *
 * @param array   $args       Arguments.
 * @param array[] $categories Array of categories for block types.
 * @return array Categories.
 */
function _cb_block_categories_all( array $args, array $categories ): array {
	$cats = array(
		array(
			'slug'  => 'wpinc',
			'title' => $args['category_title'],
		),
	);
	return array_merge( $cats, $categories );
}

/**
 * Callback function for 'plugins_url' filter.
 *
 * @access private
 *
 * @param string $url    The complete URL to the plugins directory including scheme and path.
 * @param string $path   Path relative to the URL to the plugins directory. Blank string if no path is specified.
 * @param string $plugin The plugin file path to be relative to. Blank string if no plugin is specified.
 * @return string Filtered URL.
 */
function _cb_plugins_url( string $url, string $path, string $plugin ): string {
	$theme_dir = wp_normalize_path( defined( 'THEME_PATH' ) ? THEME_PATH : get_stylesheet_directory() );
	if ( false !== strpos( $plugin, $theme_dir ) ) {
		return \wpinc\abs_url( \wpinc\get_file_uri( dirname( $plugin ) ), $path );
	}
	return $url;
}


// -----------------------------------------------------------------------------


/**
 * Sets used heading tags.
 *
 * @param int $first_level First level of heading tag.
 * @param int $count       Count of headings.
 */
function set_used_heading( int $first_level = 2, int $count = 3 ): void {
	if ( ! is_admin() ) {
		return;
	}
	$ls = array_diff(
		range( 1, 6 ),
		range( $first_level, $first_level + $count - 1 )
	);
	$hs = array();
	foreach ( $ls as $l ) {
		$h    = __( 'Heading ' . $l );  // phpcs:ignore
		$hs[] = "[aria-label=\"$h\"]";
	}
	$style = implode( ',', $hs ) . '{display:none;}';
	wp_add_inline_style( 'wp-admin', $style );
}


// -----------------------------------------------------------------------------


/**
 * Unregisters block types.
 *
 * @param string|string[] $type_s A block type or an array of block types.
 */
function unregister_block_type( $type_s ): void {
	$inst = _get_unregistered_blocks();
	$ts   = is_array( $type_s ) ? $type_s : array( $type_s );

	$inst->types = array_merge( $inst->types, $ts );
	_enqueue_script_for_unregistration();
}

/**
 * Unregisters block categories.
 *
 * @param string|string[] $category_s A category or an array of categories.
 */
function unregister_block_category( $category_s ): void {
	$inst = _get_unregistered_blocks();
	$cs   = is_array( $category_s ) ? $category_s : array( $category_s );

	$inst->categories = array_merge( $inst->categories, $cs );
	_enqueue_script_for_unregistration();
}

/**
 * Unregisters block variations.
 *
 * @param string          $type        A block type.
 * @param string|string[] $variation_s A variation or an array of variations.
 */
function unregister_block_variation( string $type, $variation_s ): void {
	$inst = _get_unregistered_blocks();
	$vs   = is_array( $variation_s ) ? $variation_s : array( $variation_s );

	if ( isset( $inst->type_variations[ $type ] ) ) {
		$inst->type_variations[ $type ] = array_merge( $inst->type_variations[ $type ], $vs );
	} else {
		$inst->type_variations[ $type ] = $vs;
	}
	_enqueue_script_for_unregistration();
}

/**
 * Unregisters block styles.
 *
 * @param string          $type    A block type.
 * @param string|string[] $style_s A style or an array of styles.
 */
function unregister_block_style( string $type, $style_s ): void {
	$inst = _get_unregistered_blocks();
	$ss   = is_array( $style_s ) ? $style_s : array( $style_s );

	if ( isset( $inst->type_styles[ $type ] ) ) {
		$inst->type_styles[ $type ] = array_merge( $inst->type_styles[ $type ], $ss );
	} else {
		$inst->type_styles[ $type ] = $ss;
	}
	_enqueue_script_for_unregistration();
}

/**
 * Gets instance of unregistered_blocks.
 *
 * @access private
 *
 * @return object Instance.
 */
function _get_unregistered_blocks(): object {
	static $inst = null;
	if ( $inst ) {
		return $inst;
	}
	$inst = new class() {
		/**
		 * Block types.
		 *
		 * @var array
		 */
		public $types = array();

		/**
		 * Block categories.
		 *
		 * @var array
		 */
		public $categories = array();

		/**
		 * Block type to variations.
		 *
		 * @var array
		 */
		public $type_variations = array();

		/**
		 * Block type to styles.
		 *
		 * @var array
		 */
		public $type_styles = array();
	};
	return $inst;
}

/**
 * Enqueues script for unregistration of blocks.
 *
 * @access private
 *
 * @param string|null $url_to URL to this script.
 */
function _enqueue_script_for_unregistration( ?string $url_to = null ): void {
	static $activated = false;
	if ( $activated ) {
		return;
	}
	$activated = true;

	$url_to = untrailingslashit( $url_to ?? \wpinc\get_file_uri( __DIR__ ) );
	add_action(
		'enqueue_block_editor_assets',
		function () use ( $url_to ) {
			wp_enqueue_script(
				'wpinc-blok-unregistration',
				\wpinc\abs_url( $url_to, './assets/js/block-unregistration.min.js' ),
				array( 'wp-blocks', 'wp-dom-ready', 'wp-edit-post' ),
				'1.0',
				true
			);
			$inst = _get_unregistered_blocks();
			$ps   = array(
				'types'           => $inst->types,
				'categories'      => $inst->categories,
				'type_variations' => $inst->type_variations,
				'type_styles'     => $inst->type_styles,
			);
			wp_localize_script( 'wpinc-blok-unregistration', 'wpinc_blok_unregistration', $ps );
		}
	);
}
