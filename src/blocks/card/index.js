/**
 * Card block
 *
 * @author Takuto Yanagida
 * @version 2022-03-15
 */

import { InnerBlocks, useBlockProps } from '@wordpress/block-editor';
import { registerBlockType } from '@wordpress/blocks';

import './style.scss';
import './editor.scss';

const icon = <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48"><rect width="14" height="14" x="8" y="8" rx="3.5" /><path d="M18.5 26h-7A3.5 3.5 0 0 0 8 29.5v7a3.5 3.5 0 0 0 3.5 3.5h7a3.5 3.5 0 0 0 3.5-3.5v-7a3.5 3.5 0 0 0-3.5-3.5Zm.5 10.5a.5.5 0 0 1-.5.5h-7a.5.5 0 0 1-.5-.5v-7a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 .5.5ZM36.5 8h-7a3.5 3.5 0 0 0-3.5 3.5v7a3.5 3.5 0 0 0 3.5 3.5h7a3.5 3.5 0 0 0 3.5-3.5v-7A3.5 3.5 0 0 0 36.5 8Zm.5 10.5a.5.5 0 0 1-.5.5h-7a.5.5 0 0 1-.5-.5v-7a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 .5.5Z" /></svg>;

function edit() {
	return (
		<div {...useBlockProps()}>
			<InnerBlocks />
		</div>
	);
}

function save() {
	return (
		<div {...useBlockProps.save()}>
			<InnerBlocks.Content />
		</div>
	);
}

registerBlockType('wpinc/card', {
	edit,
	save,
	icon,
});
