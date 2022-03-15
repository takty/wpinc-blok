/**
 * Heading filter
 *
 * @author Takuto Yanagida
 * @version 2022-03-15
 *
 * Based on https://github.com/WordPress/gutenberg/issues/15160
 */

((wp) => {
	const {
		compose: { createHigherOrderComponent },
		element: { createElement },
	} = wp;
	const el = createElement;

	const first_level  = window?.wpinc_blok_used_header?.first_level ?? 3;
	const targetBlocks = ['core/heading'];

	const filter = createHigherOrderComponent(BlockEdit => {
		return props => {
			if (!targetBlocks.includes(props.name)) {
				return el(BlockEdit, props);
			}
			const newProps = {
				...props,
				attributes: {
					...props.attributes,
					level: Math.max(first_level, props.attributes.level),
				},
			};
			return el(BlockEdit, newProps);
		};
	}, 'withFiltered');

	wp.hooks.addFilter(
		'editor.BlockEdit',
		'wpinc/blok/heading_filter',
		filter
	);
})(window.wp);
