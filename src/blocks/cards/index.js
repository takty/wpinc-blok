import { __ } from '@wordpress/i18n';
import { BlockControls, InnerBlocks, useBlockProps } from '@wordpress/block-editor';
import { Toolbar, ToolbarButton } from '@wordpress/components';
import { registerBlockType } from '@wordpress/blocks';

import './style.scss';
import './editor.scss';

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
							icon     = {<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"><path d="M9 21H3V3h6ZM15 3h6v18h-6Z"/></svg>}
							label    = {__('2 Columns', 'wpinc')}
						/>
						<ToolbarButton
							isActive = {'3' === number}
							onClick  = {() => setNumber('3')}
							icon     = {<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"><path d="M3 3h4v18H3zM10 3h4v18h-4zM17 3h4v18h-4z" /></svg>}
							label    = {__('3 Columns', 'wpinc')}
						/>
						<ToolbarButton
							isActive = {'4' === number}
							onClick  = {() => setNumber('4')}
							icon     = {<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"><path d="M3 3h3v18H3zM18 3h3v18h-3zM13 3h3v18h-3zM8 3h3v18H8z"/></svg>}
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
	const blockProps = useBlockProps.save({
		className: `card-${attributes.number}`
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
});
