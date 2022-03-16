/**
 * List Style
 *
 * @author Takuto Yanagida
 * @version 2022-03-16
 *
 * Based on https://github.com/WordPress/gutenberg/issues/15160
 */

((wp) => {
	const {
		i18n   : { __ },
		compose: { createHigherOrderComponent },
		element: { createElement },
		blocks : { registerBlockStyle },
	} = wp;
	const el = createElement;


	// -------------------------------------------------------------------------


	registerBlockStyle('core/list', {
		name       : 'circle',
		label      : __('Circle', 'wpinc'),
		inlineStyle: '.is-style-circle{list-style:circle;}',
	});
	registerBlockStyle('core/list', {
		name       : 'square',
		label      : __('Square', 'wpinc'),
		inlineStyle: '.is-style-square{list-style:square;}',
	});

	registerBlockStyle('core/list', {
		name       : 'lower-alpha',
		label      : __('Lower Alpha', 'wpinc'),
		inlineStyle: '.is-style-lower-alpha{list-style:lower-alpha;}',
	});
	registerBlockStyle('core/list', {
		name       : 'lower-greek',
		label      : __('Lower Greek', 'wpinc'),
		inlineStyle: '.is-style-lower-greek{list-style:lower-greek;}',
	});
	registerBlockStyle('core/list', {
		name       : 'lower-roman',
		label      : __('Lower Roman', 'wpinc'),
		inlineStyle: '.is-style-lower-roman{list-style:lower-roman;}',
	});
	registerBlockStyle('core/list', {
		name       : 'upper-alpha',
		label      : __('Upper Alpha', 'wpinc'),
		inlineStyle: '.is-style-upper-alpha{list-style:upper-alpha;}',
	});
	registerBlockStyle('core/list', {
		name       : 'upper-roman',
		label      : __('Upper Roman', 'wpinc'),
		inlineStyle: '.is-style-upper-roman{list-style:upper-roman;}',
	});

	function isOrdered(className) {
		const ucs = ['is-style-circle', 'is-style-square'];

		for (const c of className.split(' ')) {
			if (c.startsWith('is-style-')) {
				if (c === 'is-style-default') return null;
				if (ucs.includes(c)) return false;
				return true;
			}
		}
		return null;
	}


	// -------------------------------------------------------------------------


	const filter = createHigherOrderComponent(BlockEdit => {
		return props => {
			if ('core/list' !== props.name) {
				return el(BlockEdit, props);
			}
			const { attributes, setAttributes } = props;

			if (attributes.prevClassName ?? null === null) setAttributes({ prevClassName: attributes.className });
			if (attributes.prevOrdered   ?? null === null) setAttributes({ prevOrdered: attributes.ordered });

			if (attributes.prevOrdered !== attributes.ordered) {
				setAttributes({ prevOrdered: attributes.ordered });

				if (attributes.className !== 'is-style-default') {
					setAttributes({
						prevClassName: 'is-style-default' ,
						className    : 'is-style-default',
					});
				}
				return el(BlockEdit, props);
			}
			if (attributes.prevClassName !== attributes.className) {
				setAttributes({ prevClassName: attributes.className });

				const o = isOrdered(attributes.className ?? '');
				if (o !== null) {
					setAttributes({
						prevOrdered: o,
						ordered    : o,
					});
				}
				return el(BlockEdit, props);
			}
			return el(BlockEdit, props);
		};
	}, 'withFiltered');

	wp.hooks.addFilter(
		'editor.BlockEdit',
		'wpinc/blok/list_filter_style',
		filter
	);
})(window.wp);
