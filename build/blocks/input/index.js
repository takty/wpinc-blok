/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/blocks/input/index.js":
/*!***********************************!*\
  !*** ./src/blocks/input/index.js ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/extends */ "./node_modules/@babel/runtime/helpers/esm/extends.js");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @wordpress/block-editor */ "@wordpress/block-editor");
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _wordpress_blocks__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @wordpress/blocks */ "@wordpress/blocks");
/* harmony import */ var _wordpress_blocks__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_wordpress_blocks__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @wordpress/data */ "@wordpress/data");
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_wordpress_data__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _wordpress_core_data__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @wordpress/core-data */ "@wordpress/core-data");
/* harmony import */ var _wordpress_core_data__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(_wordpress_core_data__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var _style_scss__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./style.scss */ "./src/blocks/input/style.scss");
/* harmony import */ var _editor_scss__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./editor.scss */ "./src/blocks/input/editor.scss");

var _window$wpinc_input_a;

/**
 * Input block
 *
 * @author Takuto Yanagida
 * @version 2022-10-12
 */









const icon = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("svg", {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 48 48"
}, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("path", {
  d: "M37 27H11a3.5 3.5 0 0 1-3.5-3.5V21h3v2.5c0 .28.22.5.5.5h26a.5.5 0 0 0 .5-.5V21h3v2.5A3.5 3.5 0 0 1 37 27ZM37 14H11a3.5 3.5 0 0 1-3.5-3.5V8h3v2.5c0 .28.22.5.5.5h26a.5.5 0 0 0 .5-.5V8h3v2.5A3.5 3.5 0 0 1 37 14Z"
}), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("circle", {
  cx: "24",
  cy: "38.5",
  r: "1.5"
}), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("circle", {
  cx: "29.5",
  cy: "38.5",
  r: "1.5"
}), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("circle", {
  cx: "35",
  cy: "38.5",
  r: "1.5"
}), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("circle", {
  cx: "18.5",
  cy: "38.5",
  r: "1.5"
}), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("circle", {
  cx: "13",
  cy: "38.5",
  r: "1.5"
}), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("circle", {
  cx: "9",
  cy: "35.5",
  r: "1.5"
}), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("circle", {
  cx: "39",
  cy: "35.5",
  r: "1.5"
}));
const iconKeys = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("svg", {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 48 48"
}, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("circle", {
  cx: "27",
  cy: "30",
  r: "1.5"
}), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("circle", {
  cx: "33",
  cy: "30",
  r: "1.5"
}), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("circle", {
  cx: "21",
  cy: "30",
  r: "1.5"
}), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("circle", {
  cx: "15",
  cy: "30",
  r: "1.5"
}), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("circle", {
  cx: "9",
  cy: "30",
  r: "1.5"
}), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("circle", {
  cx: "39",
  cy: "30",
  r: "1.5"
}), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("circle", {
  cx: "27",
  cy: "41",
  r: "1.5"
}), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("circle", {
  cx: "39",
  cy: "35.5",
  r: "1.5"
}), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("circle", {
  cx: "9",
  cy: "35.5",
  r: "1.5"
}), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("circle", {
  cx: "33",
  cy: "41",
  r: "1.5"
}), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("circle", {
  cx: "21",
  cy: "41",
  r: "1.5"
}), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("circle", {
  cx: "15",
  cy: "41",
  r: "1.5"
}), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("circle", {
  cx: "9",
  cy: "41",
  r: "1.5"
}), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("circle", {
  cx: "39",
  cy: "41",
  r: "1.5"
}), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("circle", {
  cx: "27",
  cy: "7",
  r: "1.5"
}), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("circle", {
  cx: "33",
  cy: "7",
  r: "1.5"
}), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("circle", {
  cx: "21",
  cy: "7",
  r: "1.5"
}), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("circle", {
  cx: "15",
  cy: "7",
  r: "1.5"
}), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("circle", {
  cx: "9",
  cy: "7",
  r: "1.5"
}), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("circle", {
  cx: "39",
  cy: "7",
  r: "1.5"
}), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("circle", {
  cx: "27",
  cy: "18",
  r: "1.5"
}), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("circle", {
  cx: "39",
  cy: "12.5",
  r: "1.5"
}), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("circle", {
  cx: "9",
  cy: "12.5",
  r: "1.5"
}), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("circle", {
  cx: "33",
  cy: "18",
  r: "1.5"
}), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("circle", {
  cx: "21",
  cy: "18",
  r: "1.5"
}), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("circle", {
  cx: "15",
  cy: "18",
  r: "1.5"
}), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("circle", {
  cx: "9",
  cy: "18",
  r: "1.5"
}), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("circle", {
  cx: "39",
  cy: "18",
  r: "1.5"
}));
const iconKey = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("svg", {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 48 48"
}, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("circle", {
  cx: "18.5",
  cy: "14.5",
  r: "1.5"
}), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("circle", {
  cx: "24",
  cy: "13",
  r: "1.5"
}), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("circle", {
  cx: "29.5",
  cy: "14.5",
  r: "1.5"
}), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("circle", {
  cx: "18.5",
  cy: "33.5",
  r: "1.5"
}), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("circle", {
  cx: "24",
  cy: "35",
  r: "1.5"
}), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("circle", {
  cx: "29.5",
  cy: "33.5",
  r: "1.5"
}), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("circle", {
  cx: "14.5",
  cy: "18.5",
  r: "1.5"
}), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("circle", {
  cx: "13",
  cy: "24",
  r: "1.5"
}), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("circle", {
  cx: "14.5",
  cy: "29.5",
  r: "1.5"
}), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("circle", {
  cx: "33.5",
  cy: "18.5",
  r: "1.5"
}), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("circle", {
  cx: "35",
  cy: "24",
  r: "1.5"
}), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("circle", {
  cx: "33.5",
  cy: "29.5",
  r: "1.5"
}));
const iconKeySel = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("svg", {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 48 48"
}, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("circle", {
  cx: "18.5",
  cy: "14.5",
  r: "1.5"
}), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("circle", {
  cx: "24",
  cy: "13",
  r: "1.5"
}), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("circle", {
  cx: "29.5",
  cy: "14.5",
  r: "1.5"
}), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("circle", {
  cx: "18.5",
  cy: "33.5",
  r: "1.5"
}), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("circle", {
  cx: "24",
  cy: "35",
  r: "1.5"
}), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("circle", {
  cx: "29.5",
  cy: "33.5",
  r: "1.5"
}), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("circle", {
  cx: "14.5",
  cy: "18.5",
  r: "1.5"
}), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("circle", {
  cx: "13",
  cy: "24",
  r: "1.5"
}), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("circle", {
  cx: "14.5",
  cy: "29.5",
  r: "1.5"
}), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("circle", {
  cx: "33.5",
  cy: "18.5",
  r: "1.5"
}), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("circle", {
  cx: "35",
  cy: "24",
  r: "1.5"
}), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("circle", {
  cx: "33.5",
  cy: "29.5",
  r: "1.5"
}), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("circle", {
  cx: "24",
  cy: "24",
  r: "6"
}));
const label = (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Items', 'wpinc');
const es = (_window$wpinc_input_a = window?.wpinc_input_args?.entries) !== null && _window$wpinc_input_a !== void 0 ? _window$wpinc_input_a : [];
function edit({
  attributes,
  setAttributes
}) {
  var _es$filter$0$label;
  const {
    key
  } = attributes;
  const setKey = key => setAttributes({
    key
  });
  if (!key && es.length) setKey(es[0].key);
  const pt = (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_6__.useSelect)(s => s('core/editor').getCurrentPostType(), []);
  const [meta, setMeta] = (0,_wordpress_core_data__WEBPACK_IMPORTED_MODULE_7__.useEntityProp)('postType', pt, 'meta');
  const metaVal = meta[key];
  const updateMeta = (k, v) => setMeta({
    ...meta,
    [k]: v
  });
  const keyLabel = (_es$filter$0$label = es.filter(e => e.key === key)[0]?.label) !== null && _es$filter$0$label !== void 0 ? _es$filter$0$label : label;
  const blockProps = (0,_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_3__.useBlockProps)({
    className: `input-${key}`
  });
  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("div", (0,_babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0__["default"])({
    "data-container-label": keyLabel
  }, blockProps), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_3__.BlockControls, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_4__.ToolbarDropdownMenu, {
    icon: iconKeys,
    label: label,
    controls: es.map(e => {
      return {
        icon: e.key === key ? iconKeySel : iconKey,
        title: e.label,
        onClick: () => setKey(e.key)
      };
    })
  })), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_4__.TextControl, {
    label: keyLabel,
    value: metaVal,
    onChange: v => updateMeta(key, v),
    hideLabelFromVision: true
  }));
}
function save() {
  return null;
}
(0,_wordpress_blocks__WEBPACK_IMPORTED_MODULE_5__.registerBlockType)('wpinc/input', {
  edit,
  save,
  icon
});

/***/ }),

/***/ "./src/blocks/input/editor.scss":
/*!**************************************!*\
  !*** ./src/blocks/input/editor.scss ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./src/blocks/input/style.scss":
/*!*************************************!*\
  !*** ./src/blocks/input/style.scss ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "@wordpress/block-editor":
/*!*************************************!*\
  !*** external ["wp","blockEditor"] ***!
  \*************************************/
/***/ ((module) => {

module.exports = window["wp"]["blockEditor"];

/***/ }),

/***/ "@wordpress/blocks":
/*!********************************!*\
  !*** external ["wp","blocks"] ***!
  \********************************/
/***/ ((module) => {

module.exports = window["wp"]["blocks"];

/***/ }),

/***/ "@wordpress/components":
/*!************************************!*\
  !*** external ["wp","components"] ***!
  \************************************/
/***/ ((module) => {

module.exports = window["wp"]["components"];

/***/ }),

/***/ "@wordpress/core-data":
/*!**********************************!*\
  !*** external ["wp","coreData"] ***!
  \**********************************/
/***/ ((module) => {

module.exports = window["wp"]["coreData"];

/***/ }),

/***/ "@wordpress/data":
/*!******************************!*\
  !*** external ["wp","data"] ***!
  \******************************/
/***/ ((module) => {

module.exports = window["wp"]["data"];

/***/ }),

/***/ "@wordpress/element":
/*!*********************************!*\
  !*** external ["wp","element"] ***!
  \*********************************/
/***/ ((module) => {

module.exports = window["wp"]["element"];

/***/ }),

/***/ "@wordpress/i18n":
/*!******************************!*\
  !*** external ["wp","i18n"] ***!
  \******************************/
/***/ ((module) => {

module.exports = window["wp"]["i18n"];

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/esm/extends.js":
/*!************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/esm/extends.js ***!
  \************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ _extends)
/* harmony export */ });
function _extends() {
  _extends = Object.assign ? Object.assign.bind() : function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];
      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }
    return target;
  };
  return _extends.apply(this, arguments);
}

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = __webpack_modules__;
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/chunk loaded */
/******/ 	(() => {
/******/ 		var deferred = [];
/******/ 		__webpack_require__.O = (result, chunkIds, fn, priority) => {
/******/ 			if(chunkIds) {
/******/ 				priority = priority || 0;
/******/ 				for(var i = deferred.length; i > 0 && deferred[i - 1][2] > priority; i--) deferred[i] = deferred[i - 1];
/******/ 				deferred[i] = [chunkIds, fn, priority];
/******/ 				return;
/******/ 			}
/******/ 			var notFulfilled = Infinity;
/******/ 			for (var i = 0; i < deferred.length; i++) {
/******/ 				var [chunkIds, fn, priority] = deferred[i];
/******/ 				var fulfilled = true;
/******/ 				for (var j = 0; j < chunkIds.length; j++) {
/******/ 					if ((priority & 1 === 0 || notFulfilled >= priority) && Object.keys(__webpack_require__.O).every((key) => (__webpack_require__.O[key](chunkIds[j])))) {
/******/ 						chunkIds.splice(j--, 1);
/******/ 					} else {
/******/ 						fulfilled = false;
/******/ 						if(priority < notFulfilled) notFulfilled = priority;
/******/ 					}
/******/ 				}
/******/ 				if(fulfilled) {
/******/ 					deferred.splice(i--, 1)
/******/ 					var r = fn();
/******/ 					if (r !== undefined) result = r;
/******/ 				}
/******/ 			}
/******/ 			return result;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/jsonp chunk loading */
/******/ 	(() => {
/******/ 		// no baseURI
/******/ 		
/******/ 		// object to store loaded and loading chunks
/******/ 		// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 		// [resolve, reject, Promise] = chunk loading, 0 = chunk loaded
/******/ 		var installedChunks = {
/******/ 			"index": 0,
/******/ 			"./style-index": 0
/******/ 		};
/******/ 		
/******/ 		// no chunk on demand loading
/******/ 		
/******/ 		// no prefetching
/******/ 		
/******/ 		// no preloaded
/******/ 		
/******/ 		// no HMR
/******/ 		
/******/ 		// no HMR manifest
/******/ 		
/******/ 		__webpack_require__.O.j = (chunkId) => (installedChunks[chunkId] === 0);
/******/ 		
/******/ 		// install a JSONP callback for chunk loading
/******/ 		var webpackJsonpCallback = (parentChunkLoadingFunction, data) => {
/******/ 			var [chunkIds, moreModules, runtime] = data;
/******/ 			// add "moreModules" to the modules object,
/******/ 			// then flag all "chunkIds" as loaded and fire callback
/******/ 			var moduleId, chunkId, i = 0;
/******/ 			if(chunkIds.some((id) => (installedChunks[id] !== 0))) {
/******/ 				for(moduleId in moreModules) {
/******/ 					if(__webpack_require__.o(moreModules, moduleId)) {
/******/ 						__webpack_require__.m[moduleId] = moreModules[moduleId];
/******/ 					}
/******/ 				}
/******/ 				if(runtime) var result = runtime(__webpack_require__);
/******/ 			}
/******/ 			if(parentChunkLoadingFunction) parentChunkLoadingFunction(data);
/******/ 			for(;i < chunkIds.length; i++) {
/******/ 				chunkId = chunkIds[i];
/******/ 				if(__webpack_require__.o(installedChunks, chunkId) && installedChunks[chunkId]) {
/******/ 					installedChunks[chunkId][0]();
/******/ 				}
/******/ 				installedChunks[chunkId] = 0;
/******/ 			}
/******/ 			return __webpack_require__.O(result);
/******/ 		}
/******/ 		
/******/ 		var chunkLoadingGlobal = globalThis["webpackChunkwpinc_blok"] = globalThis["webpackChunkwpinc_blok"] || [];
/******/ 		chunkLoadingGlobal.forEach(webpackJsonpCallback.bind(null, 0));
/******/ 		chunkLoadingGlobal.push = webpackJsonpCallback.bind(null, chunkLoadingGlobal.push.bind(chunkLoadingGlobal));
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module depends on other loaded chunks and execution need to be delayed
/******/ 	var __webpack_exports__ = __webpack_require__.O(undefined, ["./style-index"], () => (__webpack_require__("./src/blocks/input/index.js")))
/******/ 	__webpack_exports__ = __webpack_require__.O(__webpack_exports__);
/******/ 	
/******/ })()
;
//# sourceMappingURL=index.js.map