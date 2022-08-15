/**
 * Heading Filter
 *
 * @author Takuto Yanagida
 * @version 2022-08-08
 *
 * Based on https://github.com/WordPress/gutenberg/issues/15160
 */

(wp => {
	const {
		compose: { createHigherOrderComponent },
		element: { createElement },
	} = wp;
	const el = createElement;

	const firstLevel   = window?.wpinc_blok_used_header?.first_level ?? 3;
	const targetBlocks = ['core/heading'];

	const restrictHeadingLevel = createHigherOrderComponent(BlockEdit => {
		return props => {
			if (!targetBlocks.includes(props.name)) {
				return el(BlockEdit, props);
			}
			const newProps = {
				...props,
				attributes: {
					...props.attributes,
					level: Math.max(firstLevel, props.attributes.level),
				},
			};
			return el(BlockEdit, newProps);
		};
	}, 'restrictHeadingLevel');

	wp.hooks.addFilter(
		'editor.BlockEdit',
		'wpinc/blok/restrict-heading-level',
		restrictHeadingLevel
	);
})(window.wp);
