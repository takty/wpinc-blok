/**
 * Small Tag
 *
 * @author Takuto Yanagida
 * @version 2022-09-07
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
		richText,
	} = wp;
	const el = createElement;

	const SmallButton = props => {
		return el(
			RichTextToolbarButton,
			{
				icon   : 'admin-customizer',
				title  : __('Small', 'wpinc'),
				onClick: () => {
					props.onChange(
						wp.richText.toggleFormat(props.value, {
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
				selectedBlock: select('core/editor').getSelectedBlock()
			}
		}),
		ifCondition(props => {
			return (
				props.selectedBlock &&
				props.selectedBlock.name === 'core/heading'
			);
		})
	)(SmallButton);

	richText.registerFormatType('wpinc/small', {
		title    : __('Small', 'wpinc'),
		tagName  : 'small',
		className: null,
		edit     : ConditionalSmallButton,
	});
})(window.wp);
