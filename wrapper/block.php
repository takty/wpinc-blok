<?php
/**
 * Block
 *
 * @package Sample
 * @author Takuto Yanagida
 * @version 2022-03-01
 */

namespace sample {
	require_once __DIR__ . '/blok/block.php';

	/**
	 * Initializes.
	 */
	function initialize() {
		\wpinc\blok\initialize();
	}
}
