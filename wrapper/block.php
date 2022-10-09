<?php
/**
 * Block
 *
 * @package Sample
 * @author Takuto Yanagida
 * @version 2022-10-09
 */

namespace sample {
	require_once __DIR__ . '/blok/custom-block.php';
	require_once __DIR__ . '/blok/field-block.php';
	require_once __DIR__ . '/blok/unregister.php';
	require_once __DIR__ . '/blok/util.php';

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
	 *         @type string 'class_frame' CSS class for frame. Default 'frame'.
	 *         @type string 'styles'      Name to label array of styles.
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
		\wpinc\blok\register_custom_blocks( $args );
	}

	/**
	 * Registers custom styles.
	 */
	function register_custom_styles(): void {
		\wpinc\blok\register_custom_styles();
	}


	// -------------------------------------------------------------------------


	/**
	 * Registers field block.
	 */
	function register_field_block(): void {
		\wpinc\blok\field\register_field_block();
	}

	/**
	 * Adds field block.
	 *
	 * @param array $args {
	 *     Arguments.
	 *
	 *     @type string 'key'       Key of post meta.
	 *     @type string 'label'     Label of the post meta.
	 *     @type string 'post_type' Target post type.
	 *     @type bool   'do_render' Whether to render before storing contents.
	 * }
	 */
	function add_field_block( array $args = array() ): void {
		\wpinc\blok\field\add_field_block( $args );
	}


	// -------------------------------------------------------------------------


	/**
	 * Adds 'small' tag button to the toolbar of heading blocks.
	 *
	 * @param string|null $url_to (Optional) URL to this script.
	 */
	function add_small_button_to_heading( ?string $url_to = null ): void {
		\wpinc\blok\add_small_button_to_heading( $url_to );
	}

	/**
	 * Adds list styles to the side panel of list blocks.
	 *
	 * @param string|null $url_to (Optional) URL to this script.
	 */
	function add_list_styles( ?string $url_to = null ): void {
		\wpinc\blok\add_list_styles( $url_to );
	}

	/**
	 * Sets used heading tags.
	 *
	 * @param int         $first_level First level of heading tag.
	 * @param int         $count       Count of headings.
	 * @param string|null $url_to      (Optional) URL to this script.
	 */
	function set_used_heading( int $first_level = 2, int $count = 3, ?string $url_to = null ): void {
		\wpinc\blok\set_used_heading( $first_level, $count );
	}


	// -------------------------------------------------------------------------


	/**
	 * Unregisters block types.
	 *
	 * @param string|string[] $type_s A block type or an array of block types.
	 * @param string|null     $url_to (Optional) URL to this script.
	 */
	function unregister_block_type( $type_s, ?string $url_to = null ): void {
		\wpinc\blok\unregister_block_type( $type_s, $url_to );
	}

	/**
	 * Unregisters block categories.
	 *
	 * @param string|string[] $category_s A category or an array of categories.
	 * @param string|null     $url_to     (Optional) URL to this script.
	 */
	function unregister_block_category( $category_s, ?string $url_to = null ): void {
		\wpinc\blok\unregister_block_category( $category_s, $url_to );
	}

	/**
	 * Unregisters block variations.
	 *
	 * @param string          $type        A block type.
	 * @param string|string[] $variation_s A variation or an array of variations.
	 * @param string|null     $url_to      (Optional) URL to this script.
	 */
	function unregister_block_variation( string $type, $variation_s, ?string $url_to = null ): void {
		\wpinc\blok\unregister_block_variation( $type, $variation_s, $url_to );
	}

	/**
	 * Unregisters block styles.
	 *
	 * @param string          $type    A block type.
	 * @param string|string[] $style_s A style or an array of styles.
	 * @param string|null     $url_to  (Optional) URL to this script.
	 */
	function unregister_block_style( string $type, $style_s, ?string $url_to = null ): void {
		\wpinc\blok\unregister_block_style( $type, $style_s, $url_to );
	}
}
