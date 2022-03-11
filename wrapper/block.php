<?php
/**
 * Block
 *
 * @package Sample
 * @author Takuto Yanagida
 * @version 2022-03-11
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
}
