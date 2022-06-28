/**
 * Block Unregistration
 *
 * @author Takuto Yanagida
 * @version 2022-06-28
 */

wp.domReady(function () {
	const types           = window?.wpinc_blok_unregistration?.types           ?? [];
	const categories      = window?.wpinc_blok_unregistration?.categories      ?? [];
	const type_variations = window?.wpinc_blok_unregistration?.type_variations ?? {};
	const type_styles     = window?.wpinc_blok_unregistration?.type_styles     ?? {};

	const origTypes     = wp.blocks.getBlockTypes();
	const origTypeNames = new Set();
	for (const t of origTypes) {
		origTypeNames.add(t.name);
	}

	for (const t of types) {
		if (origTypeNames.has(t.name)) {
			wp.blocks.unregisterBlockType(t);
		}
	}
	const cs = new Set(categories);
	for (const t of origTypes) {
		if (cs.has(t.category)) {
			wp.blocks.unregisterBlockType(t.name);
		}
	}
	for (const [t, vs] of Object.entries(type_variations)) {
		const all = wp.blocks.getBlockVariations(t);
		for (const a of all) {
			if (match(a.name, vs)) {
				wp.blocks.unregisterBlockVariation(t, a.name);
			}
		}
	}
	for (const [t, ss] of Object.entries(type_styles)) {
		for (const s of ss) {
			wp.blocks.unregisterBlockStyle(t, s);
		}
	}

	function match(t, vs) {
		let match = false;
		let containNot = false;
		for (const v of vs) {
			if (v.startsWith('!')) {
				if (v.substring(1) === t) return false;
				containNot = true;
			} else {
				if (v === t) match = true;
			}
		}
		return match || containNot;
	}
});
