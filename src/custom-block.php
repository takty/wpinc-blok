<?php
/**
 * Custom Block Plugins
 *
 * @package Wpinc Blok
 * @author Takuto Yanagida
 * @version 2022-03-21
 */

namespace wpinc\blok;

require_once __DIR__ . '/assets/asset-url.php';

/**
 * Registers custom blocks.
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
function register_custom_blocks( array $args = array() ): void {
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

	add_action( 'block_categories_all', fn ( $cats ) => _cb_block_categories_all( $args, $cats ) );
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
	return array_merge( $cats, $categories );  // Insert at the beginning.
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
