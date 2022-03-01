<?php
/**
 * Block Plugins
 *
 * @package Wpinc Blok
 * @author Takuto Yanagida
 * @version 2022-03-01
 */

namespace wpinc\blok;

/**
 * Initializes.
 */
function initialize() {
	add_filter( 'plugins_url', '\wpinc\blok\_cb_plugins_url', 10, 3 );
	$blocks = array( 'tab' );
	foreach ( $blocks as $b ) {
		register_block_type( __DIR__ . "/blocks/$b" );
		wp_set_script_translations( "wpinc-$b-editor-script", 'wpinc', __DIR__ . '\languages' );
	}
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
