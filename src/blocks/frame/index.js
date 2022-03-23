/**
 * Frame block
 *
 * @author Takuto Yanagida
 * @version 2022-03-24
 */

import { __ } from '@wordpress/i18n';
import { InnerBlocks, useBlockProps } from '@wordpress/block-editor';
import { registerBlockType, createBlock, rawHandler } from '@wordpress/blocks';
import { cloneElement } from '@wordpress/element';
import { __experimentalConvert } from '@wordpress/block-library';

import './style.scss';
import './editor.scss';

const icon = <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48"><path d="M32 35.5H9A3.5 3.5 0 0 1 5.5 32V9A3.5 3.5 0 0 1 9 5.5h23A3.5 3.5 0 0 1 35.5 9v23a3.5 3.5 0 0 1-3.5 3.5ZM9 8.5a.5.5 0 0 0-.5.5v23a.5.5 0 0 0 .5.5h23a.5.5 0 0 0 .5-.5V9a.5.5 0 0 0-.5-.5Z"/><path d="M37.5 43h-26v-3h26a2.5 2.5 0 0 0 2.5-2.5v-22h3v22a5.5 5.5 0 0 1-5.5 5.5Z"/></svg>;
const cls  = window?.wpinc_frame_args?.class_frame ?? 'frame';

function edit() {
	const label      = __('Frame', 'wpinc');
	const blockProps = useBlockProps({ className: cls });

	return (
		<div data-container-label={label} {...blockProps}>
			<InnerBlocks />
		</div>
	);
}

function save() {
	const blockProps = useBlockProps.save({ className: cls });
	return (
		<div {...blockProps}>
			<InnerBlocks.Content />
		</div>
	);
}

const transforms = {
	from: [
		{
			type     : 'block',
			blocks   : ['core/group'],
			transform: (attributes, innerBlocks) => {
				return createBlock('wpinc/frame', {}, innerBlocks);
			},
		},
		{
			type        : 'block',
			blocks      : ['*'],
			isMultiBlock: true,
			isMatch: (attributes, blocks) => {
				if (blocks.length === 1 && blocks[0].name === 'wpinc/frame') {
					return false;
				}
				return true;
			},
			__experimentalConvert(blocks) {
				const groupInnerBlocks = blocks.map(b => {
					return createBlock(b.name, b.attributes, b.innerBlocks);
				});
				return createBlock('wpinc/frame', {}, groupInnerBlocks);
			},
		},
		{
			type     : 'raw',
			selector : 'div.frame, div.frame-alt',
			transform: node => {
				const innerBlocks = rawHandler({
					HTML: node.innerHTML,
				});
				let cn = null;
				if (node.classList.contains('frame-alt')) {
					cn = 'is-style-alt';
				}
				return createBlock('wpinc/frame', { className: cn }, innerBlocks);
			},
		}
	],
	to: [
		{
			type     : 'block',
			blocks   : ['core/group'],
			transform: (attributes, innerBlocks) => {
				return createBlock(
					'core/group', {}, innerBlocks
				);
			},
			priority: 20,
		},
	],
};

registerBlockType('wpinc/frame', { edit, save, icon, transforms });


// -----------------------------------------------------------------------------


const removeDefault = (element, blockType, attributes) => {
	if ('wpinc/frame' === blockType.name) {
		if ('is-style-default' === attributes.className) {
			return cloneElement(element, { className: cls });
		}
	}
	return element;
}

wp.hooks.addFilter(
	'blocks.getSaveElement',
	'wpinc/blok/frame_filter_remove_default',
	removeDefault
);


// -----------------------------------------------------------------------------


wp.blocks.registerBlockStyle( 'wpinc/frame', {
	name     : 'default',
	label    : __('Default', 'wpinc'),
	isDefault: true,
} );
