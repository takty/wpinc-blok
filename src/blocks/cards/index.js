/**
 * Cards block
 *
 * @author Takuto Yanagida
 * @version 2022-03-15
 */

import { __ } from '@wordpress/i18n';
import { BlockControls, InnerBlocks, useBlockProps } from '@wordpress/block-editor';
import { Toolbar, ToolbarButton } from '@wordpress/components';
import { registerBlockType } from '@wordpress/blocks';

import './style.scss';
import './editor.scss';

const icon_block  = <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48"><path d="M18.5 22h-7A3.5 3.5 0 0 1 8 18.5v-7A3.5 3.5 0 0 1 11.5 8h7a3.5 3.5 0 0 1 3.5 3.5v7a3.5 3.5 0 0 1-3.5 3.5Zm-7-11a.5.5 0 0 0-.5.5v7a.5.5 0 0 0 .5.5h7a.5.5 0 0 0 .5-.5v-7a.5.5 0 0 0-.5-.5ZM18.5 40h-7A3.5 3.5 0 0 1 8 36.5v-7a3.5 3.5 0 0 1 3.5-3.5h7a3.5 3.5 0 0 1 3.5 3.5v7a3.5 3.5 0 0 1-3.5 3.5Zm-7-11a.5.5 0 0 0-.5.5v7a.5.5 0 0 0 .5.5h7a.5.5 0 0 0 .5-.5v-7a.5.5 0 0 0-.5-.5ZM36.5 22h-7a3.5 3.5 0 0 1-3.5-3.5v-7A3.5 3.5 0 0 1 29.5 8h7a3.5 3.5 0 0 1 3.5 3.5v7a3.5 3.5 0 0 1-3.5 3.5Zm-7-11a.5.5 0 0 0-.5.5v7a.5.5 0 0 0 .5.5h7a.5.5 0 0 0 .5-.5v-7a.5.5 0 0 0-.5-.5Z" /></svg>;
const icon_card_2 = <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48"><path d="M38.5 6h-29A3.5 3.5 0 0 0 6 9.5v29A3.5 3.5 0 0 0 9.5 42h29a3.5 3.5 0 0 0 3.5-3.5v-29A3.5 3.5 0 0 0 38.5 6Zm-29 33a.5.5 0 0 1-.5-.5v-29a.5.5 0 0 1 .5-.5h13v30Zm29.5-.5a.5.5 0 0 1-.5.5h-13V9h13a.5.5 0 0 1 .5.5Z" /></svg>;
const icon_card_3 = <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48"><path d="M38.5 12h-29A3.5 3.5 0 0 0 6 15.5v17A3.5 3.5 0 0 0 9.5 36h29a3.5 3.5 0 0 0 3.5-3.5v-17a3.5 3.5 0 0 0-3.5-3.5Zm-29 21a.5.5 0 0 1-.5-.5v-17a.5.5 0 0 1 .5-.5H17v18ZM20 33V15h8v18Zm19-.5a.5.5 0 0 1-.5.5H31V15h7.5a.5.5 0 0 1 .5.5Z" /></svg>;
const icon_card_4 = <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48"><path d="M38.5 15h-29A3.5 3.5 0 0 0 6 18.5v11A3.5 3.5 0 0 0 9.5 33h29a3.5 3.5 0 0 0 3.5-3.5v-11a3.5 3.5 0 0 0-3.5-3.5Zm-29 15a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H14v12Zm7.5 0V18h5.5v12Zm8.5 0V18H31v12Zm13.5-.5a.5.5 0 0 1-.5.5H34V18h4.5a.5.5 0 0 1 .5.5Z" /></svg>;

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

registerBlockType('wpinc/cards', {
	edit,
	save,
	icon: icon_block,
});
