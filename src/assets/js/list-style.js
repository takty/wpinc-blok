/**
 * List Style
 *
 * @author Takuto Yanagida
 * @version 2022-03-22
 *
 * Based on https://github.com/WordPress/gutenberg/issues/15160
 */

((wp) => {
	const {
		i18n   : { __ },
		compose: { createHigherOrderComponent },
		element: { createElement, cloneElement },
		blocks : { registerBlockStyle },
	} = wp;
	const el = createElement;


	// -------------------------------------------------------------------------


	registerBlockStyle('core/list', {
		name     : 'default',
		label    : __('Default', 'wpinc'),
		isDefault: true,
	});
	registerBlockStyle('core/list', {
		name : 'circle',
		label: __('Circle', 'wpinc'),
	});
	registerBlockStyle('core/list', {
		name : 'square',
		label: __('Square', 'wpinc'),
	});

	registerBlockStyle('core/list', {
		name : 'lower-alpha',
		label: __('Lower Alpha', 'wpinc'),
	});
	registerBlockStyle('core/list', {
		name : 'lower-greek',
		label: __('Lower Greek', 'wpinc'),
	});
	registerBlockStyle('core/list', {
		name : 'lower-roman',
		label: __('Lower Roman', 'wpinc'),
	});
	registerBlockStyle('core/list', {
		name : 'upper-alpha',
		label: __('Upper Alpha', 'wpinc'),
	});
	registerBlockStyle('core/list', {
		name : 'upper-roman',
		label: __('Upper Roman', 'wpinc'),
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

			if (!('prevClassName' in attributes)) {
				attributes.prevClassName = attributes.className;
			}
			if (!('prevOrdered' in attributes)) {
				attributes.prevOrdered = attributes.ordered;
			}

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

			setAttributes({ prevClassName: attributes.className });

			const o = isOrdered(attributes.className ?? '');
			if (o !== null) {
				setAttributes({
					prevOrdered: o,
					ordered    : o,
				});
			}
			return el(BlockEdit, props);
		};
	}, 'withStyle');

	wp.hooks.addFilter(
		'editor.BlockEdit',
		'wpinc/blok/list_filter_style',
		filter
	);

	const removeDefault = (element, blockType, attributes) => {
		if ('core/list' === blockType.name) {
			if ('is-style-default' === attributes.className) {
				return cloneElement(element, { className: null });
			}
		}
		return element;
	}

	wp.hooks.addFilter(
		'blocks.getSaveElement',
		'wpinc/blok/list_filter_remove_default',
		removeDefault
	);
})(window.wp);
