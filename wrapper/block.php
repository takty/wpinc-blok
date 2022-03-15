<?php
/**
 * Block
 *
 * @package Sample
 * @author Takuto Yanagida
 * @version 2022-03-15
 */

namespace sample {
	require_once __DIR__ . '/blok/block.php';

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
		\wpinc\blok\initialize( $args );
	}

	/**
	 * Sets used heading tags.
	 *
	 * @param int $first_level First level of heading tag.
	 * @param int $count       Count of headings.
	 */
	function set_used_heading( int $first_level = 2, int $count = 3 ): void {
		\wpinc\blok\set_used_heading( $first_level, $count );
	}

	/**
	 * Unregisters block types.
	 *
	 * @param string|string[] $type_s A block type or an array of block types.
	 */
	function unregister_block_type( $type_s ): void {
		\wpinc\blok\unregister_block_type( $type_s );
	}

	/**
	 * Unregisters block categories.
	 *
	 * @param string|string[] $category_s A category or an array of categories.
	 */
	function unregister_block_category( $category_s ): void {
		\wpinc\blok\unregister_block_category( $category_s );
	}

	/**
	 * Unregisters block variations.
	 *
	 * @param string          $type        A block type.
	 * @param string|string[] $variation_s A variation or an array of variations.
	 */
	function unregister_block_variation( string $type, $variation_s ): void {
		\wpinc\blok\unregister_block_variation( $type, $variation_s );
	}

	/**
	 * Unregisters block styles.
	 *
	 * @param string          $type    A block type.
	 * @param string|string[] $style_s A style or an array of styles.
	 */
	function unregister_block_style( string $type, $style_s ): void {
		\wpinc\blok\unregister_block_style( $type, $style_s );
	}
}
