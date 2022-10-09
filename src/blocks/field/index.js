/**
 * Field block
 *
 * @author Takuto Yanagida
 * @version 2022-10-08
 */

import { __ } from '@wordpress/i18n';
import { BlockControls, InnerBlocks, useBlockProps } from '@wordpress/block-editor';
import { ToolbarDropdownMenu } from '@wordpress/components';
import { registerBlockType } from '@wordpress/blocks';
import { __experimentalConvert } from '@wordpress/block-library';

import './style.scss';
import './editor.scss';

const icon       = <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48"><path d="M40.5 13.5h-3V9a.5.5 0 0 0-.5-.5H11a.5.5 0 0 0-.5.5v4.5h-3V9A3.5 3.5 0 0 1 11 5.5h26A3.5 3.5 0 0 1 40.5 9v4.5ZM40.5 24.5h-3V20a.5.5 0 0 0-.5-.5H11a.5.5 0 0 0-.5.5v4.5h-3V20a3.5 3.5 0 0 1 3.5-3.5h26a3.5 3.5 0 0 1 3.5 3.5v4.5Z"/><circle cx="27" cy="30" r="1.5"/><circle cx="33" cy="30" r="1.5"/><circle cx="21" cy="30" r="1.5"/><circle cx="15" cy="30" r="1.5"/><circle cx="9" cy="30" r="1.5"/><circle cx="39" cy="30" r="1.5"/><circle cx="27" cy="41" r="1.5"/><circle cx="39" cy="35.5" r="1.5"/><circle cx="9" cy="35.5" r="1.5"/><circle cx="33" cy="41" r="1.5"/><circle cx="21" cy="41" r="1.5"/><circle cx="15" cy="41" r="1.5"/><circle cx="9" cy="41" r="1.5"/><circle cx="39" cy="41" r="1.5"/></svg>;
const iconKeys   = <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48"><circle cx="27" cy="30" r="1.5"/><circle cx="33" cy="30" r="1.5"/><circle cx="21" cy="30" r="1.5"/><circle cx="15" cy="30" r="1.5"/><circle cx="9" cy="30" r="1.5"/><circle cx="39" cy="30" r="1.5"/><circle cx="27" cy="41" r="1.5"/><circle cx="39" cy="35.5" r="1.5"/><circle cx="9" cy="35.5" r="1.5"/><circle cx="33" cy="41" r="1.5"/><circle cx="21" cy="41" r="1.5"/><circle cx="15" cy="41" r="1.5"/><circle cx="9" cy="41" r="1.5"/><circle cx="39" cy="41" r="1.5"/><circle cx="27" cy="7" r="1.5"/><circle cx="33" cy="7" r="1.5"/><circle cx="21" cy="7" r="1.5"/><circle cx="15" cy="7" r="1.5"/><circle cx="9" cy="7" r="1.5"/><circle cx="39" cy="7" r="1.5"/><circle cx="27" cy="18" r="1.5"/><circle cx="39" cy="12.5" r="1.5"/><circle cx="9" cy="12.5" r="1.5"/><circle cx="33" cy="18" r="1.5"/><circle cx="21" cy="18" r="1.5"/><circle cx="15" cy="18" r="1.5"/><circle cx="9" cy="18" r="1.5"/><circle cx="39" cy="18" r="1.5"/></svg>;
const iconKey    = <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48"><circle cx="18.5" cy="14.5" r="1.5"/><circle cx="24" cy="13" r="1.5"/><circle cx="29.5" cy="14.5" r="1.5"/><circle cx="18.5" cy="33.5" r="1.5"/><circle cx="24" cy="35" r="1.5"/><circle cx="29.5" cy="33.5" r="1.5"/><circle cx="14.5" cy="18.5" r="1.5"/><circle cx="13" cy="24" r="1.5"/><circle cx="14.5" cy="29.5" r="1.5"/><circle cx="33.5" cy="18.5" r="1.5"/><circle cx="35" cy="24" r="1.5"/><circle cx="33.5" cy="29.5" r="1.5"/></svg>;
const iconKeySel = <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48"><circle cx="18.5" cy="14.5" r="1.5"/><circle cx="24" cy="13" r="1.5"/><circle cx="29.5" cy="14.5" r="1.5"/><circle cx="18.5" cy="33.5" r="1.5"/><circle cx="24" cy="35" r="1.5"/><circle cx="29.5" cy="33.5" r="1.5"/><circle cx="14.5" cy="18.5" r="1.5"/><circle cx="13" cy="24" r="1.5"/><circle cx="14.5" cy="29.5" r="1.5"/><circle cx="33.5" cy="18.5" r="1.5"/><circle cx="35" cy="24" r="1.5"/><circle cx="33.5" cy="29.5" r="1.5"/><circle cx="24" cy="24" r="6"/></svg>;

const label = __('Items', 'wpinc');
const es    = window?.wpinc_field_args?.entries ?? [];

function edit({ attributes, setAttributes }) {
	let { key } = attributes;
	const setKey  = key => setAttributes({ key });

	if (!key && es.length) {
		key = es[0].key;
		setKey(key);
	}

	const keyLabel   = es.filter(e => e.key === key)[0]?.label ?? label;
	const blockProps = useBlockProps({ className: `field-${key}` });

	return (
		<div data-container-label={keyLabel} {...blockProps}>
			{
				<BlockControls>
					<ToolbarDropdownMenu
						icon     = {iconKeys}
						label    = {label}
						controls = {
							es.map( e => {
								return {
									icon   : e.key === key ? iconKeySel : iconKey,
									title  : e.label,
									onClick: () => setKey(e.key),
								}
							} )
						}
					/>
				</BlockControls>
			}
			<InnerBlocks />
		</div>
	);
}

function save() {
	const blockProps = useBlockProps.save();
	return (
		<InnerBlocks.Content {...blockProps}/>
	);
}

registerBlockType('wpinc/field', { edit, save, icon });
