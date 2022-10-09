/**
 * Tabs block
 *
 * @author Takuto Yanagida
 * @version 2022-03-24
 */

import { __ } from '@wordpress/i18n';
import { BlockControls, InnerBlocks, useBlockProps } from '@wordpress/block-editor';
import { Toolbar, ToolbarButton } from '@wordpress/components';
import { registerBlockType, createBlock, rawHandler } from '@wordpress/blocks';
import { __experimentalConvert } from '@wordpress/block-library';

import './style.scss';
import './editor.scss';

const icon        = <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48"><path d="m9.32 17.71-2.64-1.42 3.5-6.5A1.5 1.5 0 0 1 11.5 9H19c.55 0 1.05.3 1.32.78L22 12.87l1.68-3.09A1.5 1.5 0 0 1 25 9h7.5c.57 0 1.09.32 1.34.83L35.93 14H42v3h-7c-.57 0-1.09-.32-1.34-.83L31.57 12h-5.68l-2.57 4.72a1.5 1.5 0 0 1-2.64 0L18.11 12H12.4l-3.08 5.71ZM38.5 39.53h-29a3.5 3.5 0 0 1-3.5-3.5V20h3v16.03c0 .28.22.5.5.5h29a.5.5 0 0 0 .5-.5V20h3v16.03a3.5 3.5 0 0 1-3.5 3.5Z"/></svg>;
const icon_scroll = <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48"><path d="m9.32 19.71-2.64-1.42 3.5-6.5A1.5 1.5 0 0 1 11.5 11H19c.53 0 1.02.28 1.29.73L22.85 16H42v3H22a1.5 1.5 0 0 1-1.29-.73L18.15 14H12.4l-3.07 5.71ZM42 37h-7c-.57 0-1.09-.32-1.34-.83L31.58 32h-5.72l-2.56 4.27a1.5 1.5 0 0 1-1.29.73H8v-3h13.15l2.56-4.27A1.5 1.5 0 0 1 25 29h7.5c.57 0 1.09.32 1.34.83L35.92 34h6.07v3Z"/></svg>;
const icon_stack  = <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48"><path d="m8.82 15.71-2.64-1.42 3.5-6.5A1.5 1.5 0 0 1 11 7h7.5c.53 0 1.02.28 1.29.73L22.35 12H35.5v3h-14a1.5 1.5 0 0 1-1.29-.73L17.65 10H11.9l-3.08 5.71ZM32 33.53H9a3.5 3.5 0 0 1-3.5-3.5V18h3v12.03c0 .28.22.5.5.5h23a.5.5 0 0 0 .5-.5V18h3v12.03a3.5 3.5 0 0 1-3.5 3.5Z"/><path d="M37.5 41h-26v-3h26a2.5 2.5 0 0 0 2.5-2.5V21h3v14.5c0 3.03-2.47 5.5-5.5 5.5Z"/></svg>;

function edit({ attributes, setAttributes }) {
	const { type } = attributes;
	const setType  = type => setAttributes({ type });

	const label      = __('scroll' === type ? 'Tabs [Scroll]' : 'Tabs [Stack]', 'wpinc');
	const blockProps = useBlockProps();

	return (
		<div data-container-label={label} {...blockProps}>
			{
				<BlockControls>
					<Toolbar>
						<ToolbarButton
							isActive = {'scroll' === type}
							onClick  = {() => setType('scroll')}
							icon     = {icon_scroll}
							label    = {__('Scroll', 'wpinc')}
						/>
						<ToolbarButton
							isActive = {'stack' === type}
							onClick  = {() => setType('stack')}
							icon     = {icon_stack}
							label    = {__('Stack', 'wpinc')}
						/>
					</Toolbar>
				</BlockControls>
			}
			<InnerBlocks />
		</div>
	);
}

function save({ attributes }) {
	const cls_scroll = window?.wpinc_tabs_args?.class_tab_scroll ?? 'tab-scroll';
	const cls_stack  = window?.wpinc_tabs_args?.class_tab_stack  ?? 'tab-stack';

	const blockProps = useBlockProps.save({
		className: 'scroll' === attributes.type ? cls_scroll : cls_stack
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
				return createBlock('wpinc/tabs', {}, innerBlocks);
			},
		},
		{
			type        : 'block',
			blocks      : ['*'],
			isMultiBlock: true,
			isMatch: (attributes, blocks) => {
				if (blocks.length === 1 && blocks[0].name === 'wpinc/tabs') {
					return false;
				}
				return true;
			},
			__experimentalConvert(blocks) {
				const groupInnerBlocks = blocks.map(b => {
					return createBlock(b.name, b.attributes, b.innerBlocks);
				});
				return createBlock('wpinc/tabs', {}, groupInnerBlocks);
			},
		},
		{
			type     : 'raw',
			selector : 'div.tab-page, div.pseudo-tab-page, div.tab-scroll, div.tab-stack',
			transform: node => {
				const innerBlocks = rawHandler({
					HTML: node.innerHTML,
				});
				let type = 'scroll';
				if (node.classList.contains('tab-page') || node.classList.contains('tab-stack')) {
					type = 'stack';
				}
				return createBlock('wpinc/tabs', { type }, innerBlocks);
			},
		}
	],
	to: [
		{
			type     : 'block',
			blocks   : ['core/group'],
			transform: (attributes, innerBlocks) => {
				return createBlock('core/group', {}, innerBlocks);
			},
			priority: 20,
		},
	],
};

registerBlockType('wpinc/tabs', { edit, save, icon, transforms });
