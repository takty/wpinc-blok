/**
 * Tabs block
 *
 * @author Takuto Yanagida
 * @version 2022-03-15
 */

import { __ } from '@wordpress/i18n';
import { BlockControls, InnerBlocks, useBlockProps } from '@wordpress/block-editor';
import { Toolbar, ToolbarButton } from '@wordpress/components';
import { registerBlockType, createBlock } from '@wordpress/blocks';

import './style.scss';
import './editor.scss';

const icon_block  = <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48"><path d="M39 36a.5.5 0 0 1-.5.5h-29A.5.5 0 0 1 9 36V19H6v17a3.5 3.5 0 0 0 3.5 3.5h29A3.5 3.5 0 0 0 42 36V19h-3ZM34.74 13a.5.5 0 0 1-.45-.28l-1.4-2.79A3.48 3.48 0 0 0 29.76 8h-5.02a3.48 3.48 0 0 0-3.13 1.93l-1.11 2.22-1.1-2.22A3.48 3.48 0 0 0 16.25 8h-5.02A3.48 3.48 0 0 0 8.1 9.93l-1.74 3.48A3.52 3.52 0 0 0 6 14.97V16h3v-1.03a.5.5 0 0 1 .05-.22l1.74-3.47a.5.5 0 0 1 .45-.28h5.02a.5.5 0 0 1 .45.28l2.45 4.9h2.68l2.45-4.9a.5.5 0 0 1 .45-.28h5.02a.5.5 0 0 1 .45.28l1.4 2.79A3.48 3.48 0 0 0 34.74 16H42v-3Z" /></svg>;
const icon_scroll = <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48"><path d="M36.74 11a.5.5 0 0 1-.45-.28l-1.4-2.79A3.48 3.48 0 0 0 31.76 6h-5.02a3.48 3.48 0 0 0-3.13 1.93l-1.11 2.22-1.1-2.22A3.48 3.48 0 0 0 18.25 6h-5.02a3.48 3.48 0 0 0-3.13 1.93l-1.74 3.48A3.52 3.52 0 0 0 8 12.97V14h3v-1.03a.5.5 0 0 1 .05-.22l1.74-3.47a.5.5 0 0 1 .45-.28h5.02a.5.5 0 0 1 .45.28l2.45 4.9h2.68l2.45-4.9a.5.5 0 0 1 .45-.28h5.02a.5.5 0 0 1 .45.28l1.4 2.79A3.48 3.48 0 0 0 36.74 14H40v-3ZM36.29 38.72l-1.4-2.79A3.48 3.48 0 0 0 31.76 34h-5.02a3.48 3.48 0 0 0-3.13 1.93l-1.11 2.22-1.1-2.22A3.48 3.48 0 0 0 18.25 34h-5.02a3.48 3.48 0 0 0-3.13 1.93l-1.74 3.48A3.52 3.52 0 0 0 8 40.97V42h3v-1.03a.5.5 0 0 1 .05-.22l1.74-3.47a.5.5 0 0 1 .45-.28h5.02a.5.5 0 0 1 .45.28l2.45 4.9h2.68l2.45-4.9a.5.5 0 0 1 .45-.28h5.02a.5.5 0 0 1 .45.28l1.4 2.79A3.48 3.48 0 0 0 36.74 42H40v-3h-3.26a.5.5 0 0 1-.45-.28ZM36.5 17h-25A3.5 3.5 0 0 0 8 20.5v7a3.5 3.5 0 0 0 3.5 3.5h25a3.5 3.5 0 0 0 3.5-3.5v-7a3.5 3.5 0 0 0-3.5-3.5Zm.5 10.5a.5.5 0 0 1-.5.5h-25a.5.5 0 0 1-.5-.5v-7a.5.5 0 0 1 .5-.5h25a.5.5 0 0 1 .5.5Z" /></svg>;
const icon_stack  = <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48"><path d="M35.5 32V14a3.5 3.5 0 0 0-3.5-3.5H20.74a.5.5 0 0 1-.45-.28l-1.4-2.79a3.48 3.48 0 0 0-3.13-1.93h-5.02A3.48 3.48 0 0 0 7.6 7.43l-1.74 3.48a3.52 3.52 0 0 0-.37 1.56V32A3.5 3.5 0 0 0 9 35.5h23a3.5 3.5 0 0 0 3.5-3.5Zm-27 0V12.47a.5.5 0 0 1 .05-.22l1.74-3.47a.5.5 0 0 1 .45-.28h5.02a.5.5 0 0 1 .45.28l1.4 2.79a3.48 3.48 0 0 0 3.13 1.93H32a.5.5 0 0 1 .5.5v18a.5.5 0 0 1-.5.5H9a.5.5 0 0 1-.5-.5Z"/><path d="M40 15.5v22a2.5 2.5 0 0 1-2.5 2.5h-26v3h26a5.5 5.5 0 0 0 5.5-5.5v-22Z"/></svg>;

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

registerBlockType('wpinc/tabs', {
	edit,
	save,
	icon: icon_block,
	transforms: {
		from: [
			{
				type: 'block',
				blocks: ['core/group'],
				transform: (attributes, innerBlocks) => {
					return createBlock(
						'wpinc/tabs', {}, innerBlocks
					);
				},
			},
		],
		to: [
			{
				type: 'block',
				blocks: ['core/group'],
				transform: (attributes, innerBlocks) => {
					return createBlock(
						'core/group', {}, innerBlocks
					);
				},
				priority: 90,
			},
		],
	},
});
