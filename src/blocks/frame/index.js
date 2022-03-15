/**
 * Frame block
 *
 * @author Takuto Yanagida
 * @version 2022-03-15
 */

import { __ } from '@wordpress/i18n';
import { BlockControls, InnerBlocks, useBlockProps } from '@wordpress/block-editor';
import { Toolbar, ToolbarButton } from '@wordpress/components';
import { registerBlockType, createBlock } from '@wordpress/blocks';
import { __experimentalConvert } from '@wordpress/block-library';

import './style.scss';
import './editor.scss';

const icon        = <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48"><path d="M32 35.5H9A3.5 3.5 0 0 1 5.5 32V9A3.5 3.5 0 0 1 9 5.5h23A3.5 3.5 0 0 1 35.5 9v23a3.5 3.5 0 0 1-3.5 3.5ZM9 8.5a.5.5 0 0 0-.5.5v23a.5.5 0 0 0 .5.5h23a.5.5 0 0 0 .5-.5V9a.5.5 0 0 0-.5-.5Z"/><path d="M37.5 43h-26v-3h26a2.5 2.5 0 0 0 2.5-2.5v-22h3v22a5.5 5.5 0 0 1-5.5 5.5Z"/></svg>;
const icon_normal = <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48"><path d="M35.5 39h-23A3.5 3.5 0 0 1 9 35.5v-23A3.5 3.5 0 0 1 12.5 9h23a3.5 3.5 0 0 1 3.5 3.5v23a3.5 3.5 0 0 1-3.5 3.5Zm-23-27a.5.5 0 0 0-.5.5v23a.5.5 0 0 0 .5.5h23a.5.5 0 0 0 .5-.5v-23a.5.5 0 0 0-.5-.5Z" /></svg>;
const icon_alt    = <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48"><path d="M36 39h-3.4a1.5 1.5 0 1 1 0-3H36v.08a1.5 1.5 0 0 1 0 2.84Zm-9.21 0h-2.9a1.5 1.5 0 0 1 0-3h2.9a1.5 1.5 0 0 1 0 3Zm-8.71 0h-2.9a1.5 1.5 0 0 1 0-3h2.9a1.5 1.5 0 0 1 0 3Zm-7.58-2A1.5 1.5 0 0 1 9 35.5v-2.9a1.5 1.5 0 0 1 3 0v2.9a1.5 1.5 0 0 1-1.5 1.5Zm27-2.69a1.5 1.5 0 0 1-1.5-1.5v-2.9a1.5 1.5 0 0 1 3 0v2.9a1.5 1.5 0 0 1-1.5 1.5Zm-27-6.02A1.5 1.5 0 0 1 9 26.8v-2.9a1.5 1.5 0 0 1 3 0v2.9a1.5 1.5 0 0 1-1.5 1.5Zm27-2.7a1.5 1.5 0 0 1-1.5-1.5v-2.9a1.5 1.5 0 0 1 3 0v2.9a1.5 1.5 0 0 1-1.5 1.5Zm-27-6a1.5 1.5 0 0 1-1.5-1.5v-2.91a1.5 1.5 0 0 1 3 0v2.9a1.5 1.5 0 0 1-1.5 1.5Zm27-2.7a1.5 1.5 0 0 1-1.5-1.5V12.5a1.5 1.5 0 0 1 1.5-1.5 1.5 1.5 0 0 1 1.5 1.48v2.9a1.5 1.5 0 0 1-1.5 1.5ZM32.82 12h-2.9a1.5 1.5 0 0 1 0-3h2.9a1.5 1.5 0 0 1 0 3Zm-8.72 0h-2.9a1.5 1.5 0 0 1 0-3h2.9a1.5 1.5 0 0 1 0 3Zm-8.7 0h-2.9a1.5 1.5 0 1 1-.01-3h2.9a1.5 1.5 0 1 1 0 3Z"/></svg>;

const cls_normal = window?.wpinc_frame_args?.class_frame_normal ?? 'frame';
const cls_alt    = window?.wpinc_frame_args?.class_frame_alt    ?? 'frame-alt';

function edit({ attributes, setAttributes }) {
	const { type } = attributes;
	const setType  = type => setAttributes({ type });

	const label      = __('normal' === type ? 'Frame [Normal]' : 'Frame [Alt.]', 'wpinc');
	const blockProps = useBlockProps({
		className: 'normal' === type ? cls_normal : cls_alt
	});

	return (
		<div data-container-label={label} {...blockProps}>
			{
				<BlockControls>
					<Toolbar>
						<ToolbarButton
							isActive = {'normal' === type}
							onClick  = {() => setType('normal')}
							icon     = {icon_normal}
							label    = {__('Normal', 'wpinc')}
						/>
						<ToolbarButton
							isActive = {'alt' === type}
							onClick  = {() => setType('alt')}
							icon     = {icon_alt}
							label    = {__('Alt.', 'wpinc')}
						/>
					</Toolbar>
				</BlockControls>
			}
			<InnerBlocks />
		</div>
	);
}

function save({ attributes }) {
	const { type } = attributes;

	const blockProps = useBlockProps.save({
		className: 'normal' === type ? cls_normal : cls_alt
	});

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

registerBlockType('wpinc/frame', {
	edit,
	save,
	icon,
	transforms,
});
