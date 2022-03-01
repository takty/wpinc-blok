import { __ } from '@wordpress/i18n';
import { BlockControls, InnerBlocks, useBlockProps } from '@wordpress/block-editor';
import { Toolbar, ToolbarButton } from '@wordpress/components';
import { pullquote, stack } from '@wordpress/icons';
import { registerBlockType } from '@wordpress/blocks';

import './style.scss';
import './editor.scss';

function edit({ attributes, setAttributes }) {
	const { type } = attributes;
	const setType  = type => setAttributes({ type });

	const blockProps = useBlockProps();
	return (
		<div data-type-label={'scroll' === type ? __('Tab [Scroll]', 'wpinc') : __('Tab [Stack]', 'wpinc')} {...blockProps}>
			{
				<BlockControls>
					<Toolbar>
						<ToolbarButton
							isActive = {'scroll' === type}
							onClick  = {() => setType('scroll')}
							icon     = {pullquote}
							label    = {__('Scroll', 'wpinc')}
						/>
						<ToolbarButton
							isActive = {'stack' === type}
							onClick  = {() => setType('stack')}
							icon     = {stack}
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
	const blockProps = useBlockProps.save({ className: 'scroll' === attributes.type ? 'pseudo-tab-page' : 'tab-page' });

	return (
		<div {...blockProps}>
			<InnerBlocks.Content />
		</div>
	);
}

registerBlockType('wpinc/tab', {
	edit,
	save,
});
