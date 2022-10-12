/**
 * Input block
 *
 * @author Takuto Yanagida
 * @version 2022-10-12
 */

import { __ } from '@wordpress/i18n';
import { BlockControls, useBlockProps } from '@wordpress/block-editor';
import { ToolbarDropdownMenu, TextControl } from '@wordpress/components';
import { registerBlockType } from '@wordpress/blocks';
import { useSelect } from '@wordpress/data';
import { useEntityProp } from '@wordpress/core-data';

import './style.scss';
import './editor.scss';

const icon       = <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48"><path d="M37 27H11a3.5 3.5 0 0 1-3.5-3.5V21h3v2.5c0 .28.22.5.5.5h26a.5.5 0 0 0 .5-.5V21h3v2.5A3.5 3.5 0 0 1 37 27ZM37 14H11a3.5 3.5 0 0 1-3.5-3.5V8h3v2.5c0 .28.22.5.5.5h26a.5.5 0 0 0 .5-.5V8h3v2.5A3.5 3.5 0 0 1 37 14Z"/><circle cx="24" cy="38.5" r="1.5"/><circle cx="29.5" cy="38.5" r="1.5"/><circle cx="35" cy="38.5" r="1.5"/><circle cx="18.5" cy="38.5" r="1.5"/><circle cx="13" cy="38.5" r="1.5"/><circle cx="9" cy="35.5" r="1.5"/><circle cx="39" cy="35.5" r="1.5"/></svg>;
const iconKeys   = <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48"><circle cx="27" cy="30" r="1.5"/><circle cx="33" cy="30" r="1.5"/><circle cx="21" cy="30" r="1.5"/><circle cx="15" cy="30" r="1.5"/><circle cx="9" cy="30" r="1.5"/><circle cx="39" cy="30" r="1.5"/><circle cx="27" cy="41" r="1.5"/><circle cx="39" cy="35.5" r="1.5"/><circle cx="9" cy="35.5" r="1.5"/><circle cx="33" cy="41" r="1.5"/><circle cx="21" cy="41" r="1.5"/><circle cx="15" cy="41" r="1.5"/><circle cx="9" cy="41" r="1.5"/><circle cx="39" cy="41" r="1.5"/><circle cx="27" cy="7" r="1.5"/><circle cx="33" cy="7" r="1.5"/><circle cx="21" cy="7" r="1.5"/><circle cx="15" cy="7" r="1.5"/><circle cx="9" cy="7" r="1.5"/><circle cx="39" cy="7" r="1.5"/><circle cx="27" cy="18" r="1.5"/><circle cx="39" cy="12.5" r="1.5"/><circle cx="9" cy="12.5" r="1.5"/><circle cx="33" cy="18" r="1.5"/><circle cx="21" cy="18" r="1.5"/><circle cx="15" cy="18" r="1.5"/><circle cx="9" cy="18" r="1.5"/><circle cx="39" cy="18" r="1.5"/></svg>;
const iconKey    = <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48"><circle cx="18.5" cy="14.5" r="1.5"/><circle cx="24" cy="13" r="1.5"/><circle cx="29.5" cy="14.5" r="1.5"/><circle cx="18.5" cy="33.5" r="1.5"/><circle cx="24" cy="35" r="1.5"/><circle cx="29.5" cy="33.5" r="1.5"/><circle cx="14.5" cy="18.5" r="1.5"/><circle cx="13" cy="24" r="1.5"/><circle cx="14.5" cy="29.5" r="1.5"/><circle cx="33.5" cy="18.5" r="1.5"/><circle cx="35" cy="24" r="1.5"/><circle cx="33.5" cy="29.5" r="1.5"/></svg>;
const iconKeySel = <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48"><circle cx="18.5" cy="14.5" r="1.5"/><circle cx="24" cy="13" r="1.5"/><circle cx="29.5" cy="14.5" r="1.5"/><circle cx="18.5" cy="33.5" r="1.5"/><circle cx="24" cy="35" r="1.5"/><circle cx="29.5" cy="33.5" r="1.5"/><circle cx="14.5" cy="18.5" r="1.5"/><circle cx="13" cy="24" r="1.5"/><circle cx="14.5" cy="29.5" r="1.5"/><circle cx="33.5" cy="18.5" r="1.5"/><circle cx="35" cy="24" r="1.5"/><circle cx="33.5" cy="29.5" r="1.5"/><circle cx="24" cy="24" r="6"/></svg>;

const label = __('Items', 'wpinc');
const es    = window?.wpinc_input_args?.entries ?? [];

function edit({ attributes, setAttributes }) {
	const { key } = attributes;
	const setKey  = key => setAttributes({ key });
	if (!key && es.length) setKey(es[0].key);

	const pt              = useSelect(s => s('core/editor').getCurrentPostType(), []);
	const [meta, setMeta] = useEntityProp('postType', pt, 'meta');
	const metaVal         = meta[key];
	const updateMeta      = (k, v) => setMeta({ ...meta, [k]: v });

	const keyLabel   = es.filter(e => e.key === key)[0]?.label ?? label;
	const blockProps = useBlockProps({ className: `input-${key}` });

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
			<TextControl
				label               = {keyLabel}
				value               = {metaVal}
				onChange            = {v => updateMeta(key, v)}
				hideLabelFromVision = {true}
			/>
		</div>
	);
}

function save() {
	return null;
}

registerBlockType('wpinc/input', { edit, save, icon });
