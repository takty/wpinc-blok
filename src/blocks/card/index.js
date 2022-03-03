import { InnerBlocks, useBlockProps } from '@wordpress/block-editor';
import { registerBlockType } from '@wordpress/blocks';

import './style.scss';
import './editor.scss';

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
});
