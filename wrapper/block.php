<?php
/**
 * Block
 *
 * @package Sample
 * @author Takuto Yanagida
 * @version 2022-03-14
 */

namespace sample {
	require_once __DIR__ . '/blok/block.php';

	/**
	 * Initializes.
	 *
	 * @param string|null $category_title Title of added category.
	 */
	function initialize( ?string $category_title = null ): void {
		\wpinc\blok\initialize( $category_title );
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
