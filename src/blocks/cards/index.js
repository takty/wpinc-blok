/**
 * Cards block
 *
 * @author Takuto Yanagida
 * @version 2022-03-24
 */

import { __ } from '@wordpress/i18n';
import { BlockControls, InnerBlocks, useBlockProps } from '@wordpress/block-editor';
import { Toolbar, ToolbarButton } from '@wordpress/components';
import { registerBlockType, createBlock, rawHandler } from '@wordpress/blocks';

import './style.scss';
import './editor.scss';

const icon        = <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48"><path d="M18.5 22h-7A3.5 3.5 0 0 1 8 18.5v-7A3.5 3.5 0 0 1 11.5 8h7a3.5 3.5 0 0 1 3.5 3.5v7a3.5 3.5 0 0 1-3.5 3.5Zm-7-11a.5.5 0 0 0-.5.5v7c0 .28.22.5.5.5h7a.5.5 0 0 0 .5-.5v-7a.5.5 0 0 0-.5-.5h-7ZM18.5 40h-7A3.5 3.5 0 0 1 8 36.5v-7a3.5 3.5 0 0 1 3.5-3.5h7a3.5 3.5 0 0 1 3.5 3.5v7a3.5 3.5 0 0 1-3.5 3.5Zm-7-11a.5.5 0 0 0-.5.5v7c0 .28.22.5.5.5h7a.5.5 0 0 0 .5-.5v-7a.5.5 0 0 0-.5-.5h-7ZM36.5 22h-7a3.5 3.5 0 0 1-3.5-3.5v-7A3.5 3.5 0 0 1 29.5 8h7a3.5 3.5 0 0 1 3.5 3.5v7a3.5 3.5 0 0 1-3.5 3.5Zm-7-11a.5.5 0 0 0-.5.5v7c0 .28.22.5.5.5h7a.5.5 0 0 0 .5-.5v-7a.5.5 0 0 0-.5-.5h-7Z"/></svg>;
const icon_card_2 = <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48"><path d="M38.5 42h-29A3.5 3.5 0 0 1 6 38.5v-29A3.5 3.5 0 0 1 9.5 6h29A3.5 3.5 0 0 1 42 9.5v29a3.5 3.5 0 0 1-3.5 3.5ZM9.5 9a.5.5 0 0 0-.5.5v29c0 .28.22.5.5.5h29a.5.5 0 0 0 .5-.5v-29a.5.5 0 0 0-.5-.5h-29Z"/><path d="M22.5 9h3v30h-3z"/></svg>;
const icon_card_3 = <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48"><path d="M38.5 36h-29A3.5 3.5 0 0 1 6 32.5v-17A3.5 3.5 0 0 1 9.5 12h29a3.5 3.5 0 0 1 3.5 3.5v17a3.5 3.5 0 0 1-3.5 3.5Zm-29-21a.5.5 0 0 0-.5.5v17c0 .28.22.5.5.5h29a.5.5 0 0 0 .5-.5v-17a.5.5 0 0 0-.5-.5h-29Z"/><path d="M17 15h3v18h-3zM28 15h3v18h-3z"/></svg>;
const icon_card_4 = <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48"><path d="M38.5 33h-29A3.5 3.5 0 0 1 6 29.5v-11A3.5 3.5 0 0 1 9.5 15h29a3.5 3.5 0 0 1 3.5 3.5v11a3.5 3.5 0 0 1-3.5 3.5Zm-29-15a.5.5 0 0 0-.5.5v11c0 .28.22.5.5.5h29a.5.5 0 0 0 .5-.5v-11a.5.5 0 0 0-.5-.5h-29Z"/><path d="M14 18h3v12h-3zM22.5 18h3v12h-3zM31 18h3v12h-3z"/></svg>;

function edit({ attributes, setAttributes }) {
	const { number } = attributes;
	const setNumber  = number => setAttributes({ number });

	const label      = __(`Cards [${number} Columns]`, 'wpinc');
	const blockProps = useBlockProps({
		className: `card-${number}`
	});

	return (
		<div data-container-label={label} {...blockProps}>
			{
				<BlockControls>
					<Toolbar>
						<ToolbarButton
							isActive = {'2' === number}
							onClick  = {() => setNumber('2')}
							icon     = {icon_card_2}
							label    = {__('2 Columns', 'wpinc')}
						/>
						<ToolbarButton
							isActive = {'3' === number}
							onClick  = {() => setNumber('3')}
							icon     = {icon_card_3}
							label    = {__('3 Columns', 'wpinc')}
						/>
						<ToolbarButton
							isActive = {'4' === number}
							onClick  = {() => setNumber('4')}
							icon     = {icon_card_4}
							label    = {__('4 Columns', 'wpinc')}
						/>
					</Toolbar>
				</BlockControls>
			}
			<InnerBlocks
				allowedBlocks = {['wpinc/card']}
				orientation   = "horizontal"
			/>
		</div>
	);
}

function save({ attributes }) {
	const cls = window?.wpinc_cards_args?.class_card ?? 'card-%d';
	const blockProps = useBlockProps.save({
		className: cls.replaceAll('%d', attributes.number)
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
			type     : 'raw',
			selector : 'div.column-2, div.column-3, div.column-4',
			transform: node => {
				const cards = [];

				const ds = node.querySelectorAll(':scope > div');
				for (const d of ds) {
					cards.push(createBlock('wpinc/card', {}, rawHandler({ HTML: d.innerHTML })));
				}
				let number = 2;
				if (node.classList.contains('column-3')) number = 3;
				if (node.classList.contains('column-4')) number = 4;

				return createBlock('wpinc/cards', { number }, cards);
			},
		}
	],
};

registerBlockType('wpinc/cards', { edit, save, icon, transforms });
