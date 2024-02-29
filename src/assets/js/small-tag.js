/**
 * Small Tag
 *
 * @author Takuto Yanagida
 * @version 2024-02-29
 *
 * Based on https://webomnizz.com/gutenberg-editor-add-button-to-the-toolbar/
 */

((wp) => {
	const {
		i18n       : { __ },
		compose    : { ifCondition, compose },
		element    : { createElement },
		data       : { withSelect },
		blockEditor: { RichTextToolbarButton },
		richText   : { toggleFormat, registerFormatType },
	} = wp;
	const el = createElement;

	const SmallButton = props => {
		return el(
			RichTextToolbarButton,
			{
				icon   : 'edit',
				title  : __('Small', 'wpinc'),
				onClick: () => {
					props.onChange(
						toggleFormat(props.value, {
							type: 'wpinc/small'
						})
					);
				}
			}
		);
	};

	const ConditionalSmallButton = compose(
		withSelect(select => {
			return {
				selectedBlock: select('core/block-editor').getSelectedBlock()
			}
		}),
		ifCondition(props => {
			return (
				props.selectedBlock &&
				props.selectedBlock.name === 'core/heading'
			);
		})
	)(SmallButton);

	registerFormatType('wpinc/small', {
		title    : __('Small', 'wpinc'),
		tagName  : 'small',
		className: null,
		edit     : ConditionalSmallButton,
	});
})(window.wp);
