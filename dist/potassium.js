/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 54);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

var core = module.exports = { version: '2.5.0' };
if (typeof __e == 'number') __e = core; // eslint-disable-line no-undef


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

var store = __webpack_require__(29)('wks');
var uid = __webpack_require__(19);
var Symbol = __webpack_require__(2).Symbol;
var USE_SYMBOL = typeof Symbol == 'function';

var $exports = module.exports = function (name) {
  return store[name] || (store[name] =
    USE_SYMBOL && Symbol[name] || (USE_SYMBOL ? Symbol : uid)('Symbol.' + name));
};

$exports.store = store;


/***/ }),
/* 2 */
/***/ (function(module, exports) {

// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
var global = module.exports = typeof window != 'undefined' && window.Math == Math
  ? window : typeof self != 'undefined' && self.Math == Math ? self
  // eslint-disable-next-line no-new-func
  : Function('return this')();
if (typeof __g == 'number') __g = global; // eslint-disable-line no-undef


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

var anObject = __webpack_require__(11);
var IE8_DOM_DEFINE = __webpack_require__(39);
var toPrimitive = __webpack_require__(21);
var dP = Object.defineProperty;

exports.f = __webpack_require__(8) ? Object.defineProperty : function defineProperty(O, P, Attributes) {
  anObject(O);
  P = toPrimitive(P, true);
  anObject(Attributes);
  if (IE8_DOM_DEFINE) try {
    return dP(O, P, Attributes);
  } catch (e) { /* empty */ }
  if ('get' in Attributes || 'set' in Attributes) throw TypeError('Accessors not supported!');
  if ('value' in Attributes) O[P] = Attributes.value;
  return O;
};


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

// to indexed object, toObject with fallback for non-array-like ES3 strings
var IObject = __webpack_require__(65);
var defined = __webpack_require__(24);
module.exports = function (it) {
  return IObject(defined(it));
};


/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

exports.default = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _defineProperty = __webpack_require__(56);

var _defineProperty2 = _interopRequireDefault(_defineProperty);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      (0, _defineProperty2.default)(target, descriptor.key, descriptor);
    }
  }

  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
}();

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(2);
var core = __webpack_require__(0);
var ctx = __webpack_require__(20);
var hide = __webpack_require__(10);
var PROTOTYPE = 'prototype';

var $export = function (type, name, source) {
  var IS_FORCED = type & $export.F;
  var IS_GLOBAL = type & $export.G;
  var IS_STATIC = type & $export.S;
  var IS_PROTO = type & $export.P;
  var IS_BIND = type & $export.B;
  var IS_WRAP = type & $export.W;
  var exports = IS_GLOBAL ? core : core[name] || (core[name] = {});
  var expProto = exports[PROTOTYPE];
  var target = IS_GLOBAL ? global : IS_STATIC ? global[name] : (global[name] || {})[PROTOTYPE];
  var key, own, out;
  if (IS_GLOBAL) source = name;
  for (key in source) {
    // contains in native
    own = !IS_FORCED && target && target[key] !== undefined;
    if (own && key in exports) continue;
    // export native or passed
    out = own ? target[key] : source[key];
    // prevent global pollution for namespaces
    exports[key] = IS_GLOBAL && typeof target[key] != 'function' ? source[key]
    // bind timers to global for call from export context
    : IS_BIND && own ? ctx(out, global)
    // wrap global constructors for prevent change them in library
    : IS_WRAP && target[key] == out ? (function (C) {
      var F = function (a, b, c) {
        if (this instanceof C) {
          switch (arguments.length) {
            case 0: return new C();
            case 1: return new C(a);
            case 2: return new C(a, b);
          } return new C(a, b, c);
        } return C.apply(this, arguments);
      };
      F[PROTOTYPE] = C[PROTOTYPE];
      return F;
    // make static versions for prototype methods
    })(out) : IS_PROTO && typeof out == 'function' ? ctx(Function.call, out) : out;
    // export proto methods to core.%CONSTRUCTOR%.methods.%NAME%
    if (IS_PROTO) {
      (exports.virtual || (exports.virtual = {}))[key] = out;
      // export proto methods to core.%CONSTRUCTOR%.prototype.%NAME%
      if (type & $export.R && expProto && !expProto[key]) hide(expProto, key, out);
    }
  }
};
// type bitmap
$export.F = 1;   // forced
$export.G = 2;   // global
$export.S = 4;   // static
$export.P = 8;   // proto
$export.B = 16;  // bind
$export.W = 32;  // wrap
$export.U = 64;  // safe
$export.R = 128; // real proto method for `library`
module.exports = $export;


/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

// Thank's IE8 for his funny defineProperty
module.exports = !__webpack_require__(13)(function () {
  return Object.defineProperty({}, 'a', { get: function () { return 7; } }).a != 7;
});


/***/ }),
/* 9 */
/***/ (function(module, exports) {

var hasOwnProperty = {}.hasOwnProperty;
module.exports = function (it, key) {
  return hasOwnProperty.call(it, key);
};


/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

var dP = __webpack_require__(3);
var createDesc = __webpack_require__(14);
module.exports = __webpack_require__(8) ? function (object, key, value) {
  return dP.f(object, key, createDesc(1, value));
} : function (object, key, value) {
  object[key] = value;
  return object;
};


/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(12);
module.exports = function (it) {
  if (!isObject(it)) throw TypeError(it + ' is not an object!');
  return it;
};


/***/ }),
/* 12 */
/***/ (function(module, exports) {

module.exports = function (it) {
  return typeof it === 'object' ? it !== null : typeof it === 'function';
};


/***/ }),
/* 13 */
/***/ (function(module, exports) {

module.exports = function (exec) {
  try {
    return !!exec();
  } catch (e) {
    return true;
  }
};


/***/ }),
/* 14 */
/***/ (function(module, exports) {

module.exports = function (bitmap, value) {
  return {
    enumerable: !(bitmap & 1),
    configurable: !(bitmap & 2),
    writable: !(bitmap & 4),
    value: value
  };
};


/***/ }),
/* 15 */
/***/ (function(module, exports) {

module.exports = {};


/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _classCallCheck2 = __webpack_require__(5);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(6);

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = __webpack_require__(22);

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = __webpack_require__(37);

var _inherits3 = _interopRequireDefault(_inherits2);

var _EventListener = __webpack_require__(49);

var _EventListener2 = _interopRequireDefault(_EventListener);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
	Mix EventMixin to enable the instances to track event listeners and send them events
	Use it like so: var YourClass = EventMixin(class { ... })
	See DataObject for an example.
*/

exports.default = function (Base) {
	return function (_Base) {
		(0, _inherits3.default)(_class, _Base);

		function _class() {
			(0, _classCallCheck3.default)(this, _class);
			return (0, _possibleConstructorReturn3.default)(this, (_class.__proto__ || Object.getPrototypeOf(_class)).apply(this, arguments));
		}

		(0, _createClass3.default)(_class, [{
			key: 'trigger',

			// Send an event to listeners
			value: function trigger(eventName) {
				var listenersToRemove = [];

				for (var _len = arguments.length, params = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
					params[_key - 1] = arguments[_key];
				}

				var _iteratorNormalCompletion = true;
				var _didIteratorError = false;
				var _iteratorError = undefined;

				try {
					for (var _iterator = this.listeners[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
						var listener = _step.value;

						if (listener.distributeEvent.apply(listener, [eventName].concat(params)) && listener.once) {
							listenersToRemove.push(listener);
						}
					}
				} catch (err) {
					_didIteratorError = true;
					_iteratorError = err;
				} finally {
					try {
						if (!_iteratorNormalCompletion && _iterator.return) {
							_iterator.return();
						}
					} finally {
						if (_didIteratorError) {
							throw _iteratorError;
						}
					}
				}

				var _iteratorNormalCompletion2 = true;
				var _didIteratorError2 = false;
				var _iteratorError2 = undefined;

				try {
					for (var _iterator2 = listenersToRemove[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
						var _listener = _step2.value;

						this.removeListener(_listener.callback, _listener.eventName);
					}
				} catch (err) {
					_didIteratorError2 = true;
					_iteratorError2 = err;
				} finally {
					try {
						if (!_iteratorNormalCompletion2 && _iterator2.return) {
							_iterator2.return();
						}
					} finally {
						if (_didIteratorError2) {
							throw _iteratorError2;
						}
					}
				}
			}
		}, {
			key: 'addListener',
			value: function addListener(callback) {
				var eventName = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : _EventListener2.default.ALL_EVENTS;
				var once = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

				this.listeners.push(new _EventListener2.default(eventName, callback, once));
			}
		}, {
			key: 'removeListener',
			value: function removeListener(callback) {
				var eventName = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

				var remove = false;
				for (var i = 0; i < this.listeners.length; i++) {
					remove = false;
					if (this.listeners[i].callback === callback) {
						if (eventName == null) {
							remove = true;
						} else if (this.listeners[i].matches(eventName)) {
							remove = true;
						}
					}
					if (remove) {
						this.listeners.splice(i, 1);
						i -= 1;
					}
				}
			}
		}, {
			key: 'clearListeners',
			value: function clearListeners() {
				if (typeof this._listeners !== 'undefined') {
					this._listeners.length = 0;
				}
			}
		}, {
			key: 'listeners',
			get: function get() {
				// Returns an array of EventListener instances
				if (typeof this._listeners == 'undefined') {
					this._listeners = [];
				}
				return this._listeners;
			}
		}]);
		return _class;
	}(Base);
};

/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _iterator = __webpack_require__(60);

var _iterator2 = _interopRequireDefault(_iterator);

var _symbol = __webpack_require__(73);

var _symbol2 = _interopRequireDefault(_symbol);

var _typeof = typeof _symbol2.default === "function" && typeof _iterator2.default === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof _symbol2.default === "function" && obj.constructor === _symbol2.default && obj !== _symbol2.default.prototype ? "symbol" : typeof obj; };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = typeof _symbol2.default === "function" && _typeof(_iterator2.default) === "symbol" ? function (obj) {
  return typeof obj === "undefined" ? "undefined" : _typeof(obj);
} : function (obj) {
  return obj && typeof _symbol2.default === "function" && obj.constructor === _symbol2.default && obj !== _symbol2.default.prototype ? "symbol" : typeof obj === "undefined" ? "undefined" : _typeof(obj);
};

/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.14 / 15.2.3.14 Object.keys(O)
var $keys = __webpack_require__(44);
var enumBugKeys = __webpack_require__(30);

module.exports = Object.keys || function keys(O) {
  return $keys(O, enumBugKeys);
};


/***/ }),
/* 19 */
/***/ (function(module, exports) {

var id = 0;
var px = Math.random();
module.exports = function (key) {
  return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++id + px).toString(36));
};


/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

// optional / simple context binding
var aFunction = __webpack_require__(59);
module.exports = function (fn, that, length) {
  aFunction(fn);
  if (that === undefined) return fn;
  switch (length) {
    case 1: return function (a) {
      return fn.call(that, a);
    };
    case 2: return function (a, b) {
      return fn.call(that, a, b);
    };
    case 3: return function (a, b, c) {
      return fn.call(that, a, b, c);
    };
  }
  return function (/* ...args */) {
    return fn.apply(that, arguments);
  };
};


/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

// 7.1.1 ToPrimitive(input [, PreferredType])
var isObject = __webpack_require__(12);
// instead of the ES6 spec version, we didn't implement @@toPrimitive case
// and the second argument - flag - preferred type is a string
module.exports = function (it, S) {
  if (!isObject(it)) return it;
  var fn, val;
  if (S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it))) return val;
  if (typeof (fn = it.valueOf) == 'function' && !isObject(val = fn.call(it))) return val;
  if (!S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it))) return val;
  throw TypeError("Can't convert object to primitive value");
};


/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _typeof2 = __webpack_require__(17);

var _typeof3 = _interopRequireDefault(_typeof2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return call && ((typeof call === "undefined" ? "undefined" : (0, _typeof3.default)(call)) === "object" || typeof call === "function") ? call : self;
};

/***/ }),
/* 23 */
/***/ (function(module, exports) {

// 7.1.4 ToInteger
var ceil = Math.ceil;
var floor = Math.floor;
module.exports = function (it) {
  return isNaN(it = +it) ? 0 : (it > 0 ? floor : ceil)(it);
};


/***/ }),
/* 24 */
/***/ (function(module, exports) {

// 7.2.1 RequireObjectCoercible(argument)
module.exports = function (it) {
  if (it == undefined) throw TypeError("Can't call method on  " + it);
  return it;
};


/***/ }),
/* 25 */
/***/ (function(module, exports) {

module.exports = true;


/***/ }),
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
var anObject = __webpack_require__(11);
var dPs = __webpack_require__(64);
var enumBugKeys = __webpack_require__(30);
var IE_PROTO = __webpack_require__(28)('IE_PROTO');
var Empty = function () { /* empty */ };
var PROTOTYPE = 'prototype';

// Create object with fake `null` prototype: use iframe Object with cleared prototype
var createDict = function () {
  // Thrash, waste and sodomy: IE GC bug
  var iframe = __webpack_require__(40)('iframe');
  var i = enumBugKeys.length;
  var lt = '<';
  var gt = '>';
  var iframeDocument;
  iframe.style.display = 'none';
  __webpack_require__(68).appendChild(iframe);
  iframe.src = 'javascript:'; // eslint-disable-line no-script-url
  // createDict = iframe.contentWindow.Object;
  // html.removeChild(iframe);
  iframeDocument = iframe.contentWindow.document;
  iframeDocument.open();
  iframeDocument.write(lt + 'script' + gt + 'document.F=Object' + lt + '/script' + gt);
  iframeDocument.close();
  createDict = iframeDocument.F;
  while (i--) delete createDict[PROTOTYPE][enumBugKeys[i]];
  return createDict();
};

module.exports = Object.create || function create(O, Properties) {
  var result;
  if (O !== null) {
    Empty[PROTOTYPE] = anObject(O);
    result = new Empty();
    Empty[PROTOTYPE] = null;
    // add "__proto__" for Object.getPrototypeOf polyfill
    result[IE_PROTO] = O;
  } else result = createDict();
  return Properties === undefined ? result : dPs(result, Properties);
};


/***/ }),
/* 27 */
/***/ (function(module, exports) {

var toString = {}.toString;

module.exports = function (it) {
  return toString.call(it).slice(8, -1);
};


/***/ }),
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

var shared = __webpack_require__(29)('keys');
var uid = __webpack_require__(19);
module.exports = function (key) {
  return shared[key] || (shared[key] = uid(key));
};


/***/ }),
/* 29 */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(2);
var SHARED = '__core-js_shared__';
var store = global[SHARED] || (global[SHARED] = {});
module.exports = function (key) {
  return store[key] || (store[key] = {});
};


/***/ }),
/* 30 */
/***/ (function(module, exports) {

// IE 8- don't enum bug keys
module.exports = (
  'constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf'
).split(',');


/***/ }),
/* 31 */
/***/ (function(module, exports, __webpack_require__) {

var def = __webpack_require__(3).f;
var has = __webpack_require__(9);
var TAG = __webpack_require__(1)('toStringTag');

module.exports = function (it, tag, stat) {
  if (it && !has(it = stat ? it : it.prototype, TAG)) def(it, TAG, { configurable: true, value: tag });
};


/***/ }),
/* 32 */
/***/ (function(module, exports, __webpack_require__) {

// 7.1.13 ToObject(argument)
var defined = __webpack_require__(24);
module.exports = function (it) {
  return Object(defined(it));
};


/***/ }),
/* 33 */
/***/ (function(module, exports, __webpack_require__) {

exports.f = __webpack_require__(1);


/***/ }),
/* 34 */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(2);
var core = __webpack_require__(0);
var LIBRARY = __webpack_require__(25);
var wksExt = __webpack_require__(33);
var defineProperty = __webpack_require__(3).f;
module.exports = function (name) {
  var $Symbol = core.Symbol || (core.Symbol = LIBRARY ? {} : global.Symbol || {});
  if (name.charAt(0) != '_' && !(name in $Symbol)) defineProperty($Symbol, name, { value: wksExt.f(name) });
};


/***/ }),
/* 35 */
/***/ (function(module, exports) {

exports.f = {}.propertyIsEnumerable;


/***/ }),
/* 36 */
/***/ (function(module, exports, __webpack_require__) {

var pIE = __webpack_require__(35);
var createDesc = __webpack_require__(14);
var toIObject = __webpack_require__(4);
var toPrimitive = __webpack_require__(21);
var has = __webpack_require__(9);
var IE8_DOM_DEFINE = __webpack_require__(39);
var gOPD = Object.getOwnPropertyDescriptor;

exports.f = __webpack_require__(8) ? gOPD : function getOwnPropertyDescriptor(O, P) {
  O = toIObject(O);
  P = toPrimitive(P, true);
  if (IE8_DOM_DEFINE) try {
    return gOPD(O, P);
  } catch (e) { /* empty */ }
  if (has(O, P)) return createDesc(!pIE.f.call(O, P), O[P]);
};


/***/ }),
/* 37 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _setPrototypeOf = __webpack_require__(84);

var _setPrototypeOf2 = _interopRequireDefault(_setPrototypeOf);

var _create = __webpack_require__(88);

var _create2 = _interopRequireDefault(_create);

var _typeof2 = __webpack_require__(17);

var _typeof3 = _interopRequireDefault(_typeof2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + (typeof superClass === "undefined" ? "undefined" : (0, _typeof3.default)(superClass)));
  }

  subClass.prototype = (0, _create2.default)(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      enumerable: false,
      writable: true,
      configurable: true
    }
  });
  if (superClass) _setPrototypeOf2.default ? (0, _setPrototypeOf2.default)(subClass, superClass) : subClass.__proto__ = superClass;
};

/***/ }),
/* 38 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _classCallCheck2 = __webpack_require__(5);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(6);

var _createClass3 = _interopRequireDefault(_createClass2);

var _EventMixin = __webpack_require__(16);

var _EventMixin2 = _interopRequireDefault(_EventMixin);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
	The parent class for DataModel and DataCollection
	It holds the event mixin and the generic function of fetching data from a remote service
*/
var DataObject = (0, _EventMixin2.default)(function () {
	function _class() {
		var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
		(0, _classCallCheck3.default)(this, _class);

		this.options = options;
		this._new = true; // True until the first fetch returns, regardless of http status
		this.cleanedUp = false;
	}

	(0, _createClass3.default)(_class, [{
		key: 'cleanup',
		value: function cleanup() {
			if (this.cleanedUp) return;
			this.cleanedUp = true;
			this.clearListeners();
		}
		// Return true until a fetch (even a failed fetch) returns

	}, {
		key: 'reset',


		// Clear out old data and set it to data, should trigger a 'reset' event
		value: function reset() {
			var data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

			throw new Error('Extending classes must implement reset');
		}
	}, {
		key: 'parse',
		value: function parse(data) {
			// Extending classes can override this to parse the data received via a fetch
			return data;
		}
	}, {
		key: 'equals',
		value: function equals(obj) {
			// Extending classes can override this to allow less strict equality
			return this === obj;
		}
	}, {
		key: 'onFirstReset',
		value: function onFirstReset(func) {
			var _this = this;

			// If already reset, immediately call func, otherwise wait until the first reset and then call func
			if (this._new) {
				this.addListener(function () {
					func(_this);
				}, 'reset', true);
			} else {
				func(this);
			}
		}
	}, {
		key: 'fetch',
		value: function (_fetch) {
			function fetch() {
				return _fetch.apply(this, arguments);
			}

			fetch.toString = function () {
				return _fetch.toString();
			};

			return fetch;
		}(function () {
			// Ask the server for data for this model or collection
			return new Promise(function (resolve, reject) {
				var _this2 = this;

				this.trigger('fetching', this);
				fetch(this.url, this.fetchOptions).then(function (response) {
					if (response.status != 200) {
						throw 'Fetch failed with status ' + response.status;
					}
					return response.json();
				}).then(function (data) {
					data = _this2.parse(data);
					_this2._new = false;
					_this2.reset(data);
					_this2.trigger('fetched', _this2, data, null);
					resolve(_this2);
				}).catch(function (err) {
					_this2._new = false;
					_this2.trigger('fetched', _this2, null, err);
					reject(err);
				});
			}.bind(this));
		})
	}, {
		key: 'save',
		value: function save() {
			// Tell the server to create (POST) or update (PUT) this model or collection
			return new Promise(function (resolve, reject) {
				var _this3 = this;

				this.trigger('saving', this);
				var options = Object.assign({}, this.fetchOptions);
				if (this.isNew) {
					options.method = 'post';
				} else {
					options.method = 'put';
				}
				options.body = JSON.stringify(this.data);
				fetch(this.url, options).then(function (response) {
					if (response.status != 200) {
						throw 'Save failed with status ' + response.status;
					}
					return response.json();
				}).then(function (data) {
					data = _this3.parse(data);
					_this3.reset(data);
					_this3._new = false;
					_this3.trigger('saved', _this3, data, null);
					resolve(_this3);
				}).catch(function (err) {
					_this3.trigger('saved', _this3, null, err);
					reject(err);
				});
			}.bind(this));
		}
	}, {
		key: 'delete',
		value: function _delete() {
			return new Promise(function (resolve, reject) {
				var _this4 = this;

				this.trigger('deleting', this);
				var options = Object.assign({}, this.fetchOptions);
				options.method = 'delete';
				fetch(this.url, options).then(function (response) {
					if (response.status != 200) {
						throw 'Delete failed with status ' + response.status;
					}
					_this4.trigger('deleted', _this4, null);
					resolve();
				}).catch(function (err) {
					_this4.trigger('deleted', _this4, err);
					reject(err);
				});
			}.bind(this));
		}
	}, {
		key: 'isNew',
		get: function get() {
			return this._new;
		}
		// Return the URL (relative or full) as a string for the endpoint used by this.fetch

	}, {
		key: 'url',
		get: function get() {
			throw new Error('Extending classes must implement url()');
		}
	}, {
		key: 'fetchOptions',
		get: function get() {
			// Extending classes can override this to add headers, methods, etc to the fetch call
			return {
				credentials: 'same-origin'
			};
		}
	}]);
	return _class;
}());

DataObject._NO_CHANGE = Symbol('no change');

exports.default = DataObject;

/***/ }),
/* 39 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = !__webpack_require__(8) && !__webpack_require__(13)(function () {
  return Object.defineProperty(__webpack_require__(40)('div'), 'a', { get: function () { return 7; } }).a != 7;
});


/***/ }),
/* 40 */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(12);
var document = __webpack_require__(2).document;
// typeof document.createElement is 'object' in old IE
var is = isObject(document) && isObject(document.createElement);
module.exports = function (it) {
  return is ? document.createElement(it) : {};
};


/***/ }),
/* 41 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $at = __webpack_require__(62)(true);

// 21.1.3.27 String.prototype[@@iterator]()
__webpack_require__(42)(String, 'String', function (iterated) {
  this._t = String(iterated); // target
  this._i = 0;                // next index
// 21.1.5.2.1 %StringIteratorPrototype%.next()
}, function () {
  var O = this._t;
  var index = this._i;
  var point;
  if (index >= O.length) return { value: undefined, done: true };
  point = $at(O, index);
  this._i += point.length;
  return { value: point, done: false };
});


/***/ }),
/* 42 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var LIBRARY = __webpack_require__(25);
var $export = __webpack_require__(7);
var redefine = __webpack_require__(43);
var hide = __webpack_require__(10);
var has = __webpack_require__(9);
var Iterators = __webpack_require__(15);
var $iterCreate = __webpack_require__(63);
var setToStringTag = __webpack_require__(31);
var getPrototypeOf = __webpack_require__(46);
var ITERATOR = __webpack_require__(1)('iterator');
var BUGGY = !([].keys && 'next' in [].keys()); // Safari has buggy iterators w/o `next`
var FF_ITERATOR = '@@iterator';
var KEYS = 'keys';
var VALUES = 'values';

var returnThis = function () { return this; };

module.exports = function (Base, NAME, Constructor, next, DEFAULT, IS_SET, FORCED) {
  $iterCreate(Constructor, NAME, next);
  var getMethod = function (kind) {
    if (!BUGGY && kind in proto) return proto[kind];
    switch (kind) {
      case KEYS: return function keys() { return new Constructor(this, kind); };
      case VALUES: return function values() { return new Constructor(this, kind); };
    } return function entries() { return new Constructor(this, kind); };
  };
  var TAG = NAME + ' Iterator';
  var DEF_VALUES = DEFAULT == VALUES;
  var VALUES_BUG = false;
  var proto = Base.prototype;
  var $native = proto[ITERATOR] || proto[FF_ITERATOR] || DEFAULT && proto[DEFAULT];
  var $default = $native || getMethod(DEFAULT);
  var $entries = DEFAULT ? !DEF_VALUES ? $default : getMethod('entries') : undefined;
  var $anyNative = NAME == 'Array' ? proto.entries || $native : $native;
  var methods, key, IteratorPrototype;
  // Fix native
  if ($anyNative) {
    IteratorPrototype = getPrototypeOf($anyNative.call(new Base()));
    if (IteratorPrototype !== Object.prototype && IteratorPrototype.next) {
      // Set @@toStringTag to native iterators
      setToStringTag(IteratorPrototype, TAG, true);
      // fix for some old engines
      if (!LIBRARY && !has(IteratorPrototype, ITERATOR)) hide(IteratorPrototype, ITERATOR, returnThis);
    }
  }
  // fix Array#{values, @@iterator}.name in V8 / FF
  if (DEF_VALUES && $native && $native.name !== VALUES) {
    VALUES_BUG = true;
    $default = function values() { return $native.call(this); };
  }
  // Define iterator
  if ((!LIBRARY || FORCED) && (BUGGY || VALUES_BUG || !proto[ITERATOR])) {
    hide(proto, ITERATOR, $default);
  }
  // Plug for library
  Iterators[NAME] = $default;
  Iterators[TAG] = returnThis;
  if (DEFAULT) {
    methods = {
      values: DEF_VALUES ? $default : getMethod(VALUES),
      keys: IS_SET ? $default : getMethod(KEYS),
      entries: $entries
    };
    if (FORCED) for (key in methods) {
      if (!(key in proto)) redefine(proto, key, methods[key]);
    } else $export($export.P + $export.F * (BUGGY || VALUES_BUG), NAME, methods);
  }
  return methods;
};


/***/ }),
/* 43 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(10);


/***/ }),
/* 44 */
/***/ (function(module, exports, __webpack_require__) {

var has = __webpack_require__(9);
var toIObject = __webpack_require__(4);
var arrayIndexOf = __webpack_require__(66)(false);
var IE_PROTO = __webpack_require__(28)('IE_PROTO');

module.exports = function (object, names) {
  var O = toIObject(object);
  var i = 0;
  var result = [];
  var key;
  for (key in O) if (key != IE_PROTO) has(O, key) && result.push(key);
  // Don't enum bug & hidden keys
  while (names.length > i) if (has(O, key = names[i++])) {
    ~arrayIndexOf(result, key) || result.push(key);
  }
  return result;
};


/***/ }),
/* 45 */
/***/ (function(module, exports, __webpack_require__) {

// 7.1.15 ToLength
var toInteger = __webpack_require__(23);
var min = Math.min;
module.exports = function (it) {
  return it > 0 ? min(toInteger(it), 0x1fffffffffffff) : 0; // pow(2, 53) - 1 == 9007199254740991
};


/***/ }),
/* 46 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.9 / 15.2.3.2 Object.getPrototypeOf(O)
var has = __webpack_require__(9);
var toObject = __webpack_require__(32);
var IE_PROTO = __webpack_require__(28)('IE_PROTO');
var ObjectProto = Object.prototype;

module.exports = Object.getPrototypeOf || function (O) {
  O = toObject(O);
  if (has(O, IE_PROTO)) return O[IE_PROTO];
  if (typeof O.constructor == 'function' && O instanceof O.constructor) {
    return O.constructor.prototype;
  } return O instanceof Object ? ObjectProto : null;
};


/***/ }),
/* 47 */
/***/ (function(module, exports) {

exports.f = Object.getOwnPropertySymbols;


/***/ }),
/* 48 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.7 / 15.2.3.4 Object.getOwnPropertyNames(O)
var $keys = __webpack_require__(44);
var hiddenKeys = __webpack_require__(30).concat('length', 'prototype');

exports.f = Object.getOwnPropertyNames || function getOwnPropertyNames(O) {
  return $keys(O, hiddenKeys);
};


/***/ }),
/* 49 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _classCallCheck2 = __webpack_require__(5);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(6);

var _createClass3 = _interopRequireDefault(_createClass2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
	EventListener holds information about listeners on an object with the eventMixin
*/
var EventListener = function () {
	function EventListener(eventName, callback) {
		var once = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
		(0, _classCallCheck3.default)(this, EventListener);

		this.eventName = eventName;
		this.callback = callback;
		this.once = once;
	}

	(0, _createClass3.default)(EventListener, [{
		key: 'matches',
		value: function matches(eventName) {
			return this.eventName === EventListener.ALL_EVENTS || eventName === this.eventName;
		}
	}, {
		key: 'distributeEvent',
		value: function distributeEvent(eventName) {
			if (this.matches(eventName)) {
				for (var _len = arguments.length, params = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
					params[_key - 1] = arguments[_key];
				}

				this.callback.apply(this, [eventName].concat(params));
				return true;
			}
			return false;
		}
	}]);
	return EventListener;
}();

exports.default = EventListener;


EventListener.ALL_EVENTS = Symbol('all events');

/***/ }),
/* 50 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _typeof2 = __webpack_require__(17);

var _typeof3 = _interopRequireDefault(_typeof2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
	Functions that generate DOM elements like el.div(...) will live in el
*/
var el = {};
exports.default = el;

/*
	domElementFunction is the behind the scenes logic for the functions like el.div(...)
	Below you will find the loop that uses domElementFunction
*/

el.domElementFunction = function (tagName) {
	// Create a boring DOM element
	var element = document.createElement(tagName);

	// A convenience function to allow chaining like `let fooDiv = el.div().appendTo(document.body)`
	element.appendTo = function (parent) {
		parent.appendChild(this);
		return this;
	};

	// if element.parentElement exists, call removeChild(element) on it 
	element.remove = function () {
		if (this.parentElement) {
			this.parentElement.removeChild(this);
		}
		return this;
	};

	// A convenience function to allow appending strings, dictionaries of attributes, arrays of subchildren, or children
	element.append = function () {
		var child = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;

		if (child === null) {
			return;
		}
		if (typeof child === 'string') {
			this.appendChild(document.createTextNode(child));
		} else if (Array.isArray(child)) {
			var _iteratorNormalCompletion = true;
			var _didIteratorError = false;
			var _iteratorError = undefined;

			try {
				for (var _iterator = child[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
					var subChild = _step.value;

					this.append(subChild);
				}
				// If it's an object but not a DOM element, consider it a dictionary of attributes
			} catch (err) {
				_didIteratorError = true;
				_iteratorError = err;
			} finally {
				try {
					if (!_iteratorNormalCompletion && _iterator.return) {
						_iterator.return();
					}
				} finally {
					if (_didIteratorError) {
						throw _iteratorError;
					}
				}
			}
		} else if ((typeof child === 'undefined' ? 'undefined' : (0, _typeof3.default)(child)) === 'object' && typeof child.nodeType === 'undefined') {
			for (var key in child) {
				if (child.hasOwnProperty(key) == false) {
					continue;
				}
				this.setAttribute(key, child[key]);
			}
		} else {
			this.appendChild(child);
		}
		return this;
	};

	element.documentPosition = function () {
		return el.documentOffset(this);
	};

	/*
 Sort element.children *in place* using the comparator function
 See https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort for an explanation of the comparator function
 */
	element.sort = function () {
		var comparator = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : el.defaultComparator;

		// Populate the holding array while removing children from the DOM
		var holdingArray = [];
		while (this.children.length > 0) {
			holdingArray.push(this.removeChild(this.children.item(0)));
		}
		holdingArray.sort(comparator);
		var _iteratorNormalCompletion2 = true;
		var _didIteratorError2 = false;
		var _iteratorError2 = undefined;

		try {
			for (var _iterator2 = holdingArray[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
				var child = _step2.value;

				this.appendChild(child);
			}
		} catch (err) {
			_didIteratorError2 = true;
			_iteratorError2 = err;
		} finally {
			try {
				if (!_iteratorNormalCompletion2 && _iterator2.return) {
					_iterator2.return();
				}
			} finally {
				if (_didIteratorError2) {
					throw _iteratorError2;
				}
			}
		}

		return this;
	};

	// Sort element.children *in place* using child[attributeName] and the comparator function
	element.sortByAttribute = function (attributeName) {
		var comparator = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : el.defaultComparator;

		this.sort(function (el1, el2) {
			return comparator(el1.getAttribute(attributeName), el2.getAttribute(attributeName));
		});
		return this;
	};

	// Convenience functions to add and remove classes from this element without duplication
	element.addClass = function (className) {
		var classAttribute = this.getAttribute('class') || '';
		var classes = classAttribute.split(/\s+/);
		if (classes.indexOf(className) != -1) {
			// Already has that class
			return this;
		}
		this.setAttribute('class', (classAttribute + ' ' + className).trim());
		return this;
	};
	element.removeClass = function (className) {
		var classAttribute = this.getAttribute('class') || '';
		var classes = classAttribute.split(/\s+/);
		var index = classes.indexOf(className);
		if (index == -1) {
			// Already does not have that class
			return this;
		}
		classes.splice(index, 1);
		classAttribute = classes.join(' ').trim();
		if (classAttribute.length == 0) {
			this.removeAttribute('class');
		} else {
			this.setAttribute('class', classes.join(' ').trim());
		}
		return this;
	};

	// Append the children parameters

	for (var _len = arguments.length, params = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
		params[_key - 1] = arguments[_key];
	}

	var _iteratorNormalCompletion3 = true;
	var _didIteratorError3 = false;
	var _iteratorError3 = undefined;

	try {
		for (var _iterator3 = params[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
			var child = _step3.value;

			element.append(child);
		}
	} catch (err) {
		_didIteratorError3 = true;
		_iteratorError3 = err;
	} finally {
		try {
			if (!_iteratorNormalCompletion3 && _iterator3.return) {
				_iterator3.return();
			}
		} finally {
			if (_didIteratorError3) {
				throw _iteratorError3;
			}
		}
	}

	return element;
};

// This comparator stringifies the passed values and returns the comparison of those values
el.defaultComparator = function (el1, el2) {
	if (el1 === el2) return 0;
	var str1 = '' + el1;
	var str2 = '' + el2;
	if (str1 == str2) return 0;
	if (str1 < str2) return -1;
	return 1;
};

// Traverse the document tree to calculate the offset in the entire document of this element
el.documentOffset = function (element) {
	var left = 0;
	var top = 0;
	var findPos = function findPos(obj) {
		left += obj.offsetLeft;
		top += obj.offsetTop;
		if (obj.offsetParent) {
			findPos(obj.offsetParent);
		}
	};
	findPos(element);
	return [left, top];
};

/* 
	The tag names that will be used to generate all of the element generating functions like el.div(...) and el.button(...)
	These names were ovingly copied from the excellent Laconic.js 
	https://github.com/joestelmach/laconic/blob/master/laconic.js
*/
el.TAGS = ['a', 'abbr', 'address', 'area', 'article', 'aside', 'audio', 'b', 'base', 'bdo', 'blockquote', 'body', 'br', 'button', 'canvas', 'caption', 'cite', 'code', 'col', 'colgroup', 'command', 'datalist', 'dd', 'del', 'details', 'dfn', 'div', 'dl', 'dt', 'em', 'embed', 'fieldset', 'figcaption', 'figure', 'footer', 'form', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'head', 'header', 'hgroup', 'hr', 'html', 'i', 'iframe', 'img', 'input', 'ins', 'keygen', 'kbd', 'label', 'legend', 'li', 'link', 'map', 'mark', 'menu', 'meta', 'meter', 'nav', 'noscript', 'object', 'ol', 'optgroup', 'option', 'output', 'p', 'picture', 'param', 'pre', 'progress', 'q', 'rp', 'rt', 'ruby', 's', 'samp', 'script', 'section', 'select', 'small', 'source', 'span', 'strong', 'style', 'sub', 'summary', 'sup', 'table', 'tbody', 'td', 'textarea', 'tfoot', 'th', 'thead', 'time', 'title', 'tr', 'ul', 'var', 'video', 'wbr'];

// This loop generates the element generating functions like el.div(...)

var _loop = function _loop(tag) {
	var innerTag = tag;
	el[innerTag] = function () {
		for (var _len2 = arguments.length, params = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
			params[_key2] = arguments[_key2];
		}

		return el.domElementFunction.apply(el, [innerTag].concat(params));
	};
};

var _iteratorNormalCompletion4 = true;
var _didIteratorError4 = false;
var _iteratorError4 = undefined;

try {
	for (var _iterator4 = el.TAGS[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
		var tag = _step4.value;

		_loop(tag);
	}
} catch (err) {
	_didIteratorError4 = true;
	_iteratorError4 = err;
} finally {
	try {
		if (!_iteratorNormalCompletion4 && _iterator4.return) {
			_iterator4.return();
		}
	} finally {
		if (_didIteratorError4) {
			throw _iteratorError4;
		}
	}
}

/***/ }),
/* 51 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _getPrototypeOf = __webpack_require__(95);

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _getOwnPropertyDescriptor = __webpack_require__(98);

var _getOwnPropertyDescriptor2 = _interopRequireDefault(_getOwnPropertyDescriptor);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function get(object, property, receiver) {
  if (object === null) object = Function.prototype;
  var desc = (0, _getOwnPropertyDescriptor2.default)(object, property);

  if (desc === undefined) {
    var parent = (0, _getPrototypeOf2.default)(object);

    if (parent === null) {
      return undefined;
    } else {
      return get(parent, property, receiver);
    }
  } else if ("value" in desc) {
    return desc.value;
  } else {
    var getter = desc.get;

    if (getter === undefined) {
      return undefined;
    }

    return getter.call(receiver);
  }
};

/***/ }),
/* 52 */
/***/ (function(module, exports, __webpack_require__) {

// most Object methods by ES6 should accept primitives
var $export = __webpack_require__(7);
var core = __webpack_require__(0);
var fails = __webpack_require__(13);
module.exports = function (KEY, exec) {
  var fn = (core.Object || {})[KEY] || Object[KEY];
  var exp = {};
  exp[KEY] = exec(fn);
  $export($export.S + $export.F * fails(function () { fn(1); }), 'Object', exp);
};


/***/ }),
/* 53 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _typeof2 = __webpack_require__(17);

var _typeof3 = _interopRequireDefault(_typeof2);

var _classCallCheck2 = __webpack_require__(5);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(6);

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = __webpack_require__(22);

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _get2 = __webpack_require__(51);

var _get3 = _interopRequireDefault(_get2);

var _inherits2 = __webpack_require__(37);

var _inherits3 = _interopRequireDefault(_inherits2);

var _DataObject2 = __webpack_require__(38);

var _DataObject3 = _interopRequireDefault(_DataObject2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
	DataModel holds a map of string,value pairs, sometimes fetched from or sent to a back-end server.
	It fires events when values are changed.

	options:
		fieldDataObjects ({}): a map of fieldName (string) to DataObject (class), used to create sub-object in this Model's data
*/
var _class = function (_DataObject) {
	(0, _inherits3.default)(_class, _DataObject);

	function _class() {
		var data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
		var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
		(0, _classCallCheck3.default)(this, _class);

		var _this = (0, _possibleConstructorReturn3.default)(this, (_class.__proto__ || Object.getPrototypeOf(_class)).call(this, options));

		if (typeof _this.options.fieldDataObjects === 'undefined') {
			_this.options.fieldDataObjects = {};
		}
		_this.data = {};
		_this.setBatch(data);
		return _this;
	}

	(0, _createClass3.default)(_class, [{
		key: 'cleanup',
		value: function cleanup() {
			(0, _get3.default)(_class.prototype.__proto__ || Object.getPrototypeOf(_class.prototype), 'cleanup', this).call(this);
			this.data = null;
		}
		/* 
  	Find a value held within this DataModel. 
  	Return values may be native types or, if mapped by options.fieldDataObjects, another DataObject
  */

	}, {
		key: 'has',
		value: function has(fieldName) {
			return typeof this.data[fieldName] !== 'undefined';
		}
	}, {
		key: 'get',
		value: function get(fieldName) {
			var defaultValue = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

			if (typeof this.data[fieldName] === 'undefined' || this.data[fieldName] === null || this.data[fieldName] === '') {
				return defaultValue;
			}
			return this.data[fieldName];
		}
		// Set a key/value pair.

	}, {
		key: 'set',
		value: function set(fieldName, value) {
			var batch = {};
			batch[fieldName] = value;
			return this.setBatch(batch);
		}

		/*
  	Set a group of values. The 'values' parameter should be an object that works in for(key in values) loops like a dictionary: {}
  	If a key is in options.fieldDataObjects then the value will be used to contruct a DataObject and that will be the saved value.
  */

	}, {
		key: 'setBatch',
		value: function setBatch(values) {
			var changes = {};
			var changed = false;
			for (var key in values) {
				var result = this._set(key, values[key]);
				if (result !== _DataObject3.default._NO_CHANGE) {
					changed = true;
					changes[key] = result;
					this.trigger('changed:' + key, this, key, result);
				}
			}
			if (changed) {
				this.trigger('changed', this, changes);
			}
			return changes;
		}
	}, {
		key: 'increment',
		value: function increment(fieldName) {
			var amount = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;

			var currentVal = fieldName in this.data ? this.data[fieldName] : 0;
			this.set(fieldName, currentVal + amount);
		}
	}, {
		key: '_set',
		value: function _set(fieldName, data) {
			// _set does not fire any events, so you probably want to use set or setBatch
			if (data instanceof _DataObject3.default) {
				if (this.data[fieldName] instanceof _DataObject3.default) {
					this.data[fieldName].reset(data.data);
				} else {
					this.data[fieldName] = data;
				}
			} else if (this.options.fieldDataObjects[fieldName]) {
				if (this.data[fieldName]) {
					this.data[fieldName].reset(data);
				} else {
					this.data[fieldName] = new this.options.fieldDataObjects[fieldName](data);
				}
			} else {
				if (this.data[fieldName] === data) {
					return _DataObject3.default._NO_CHANGE;
				}
				if (this.data[fieldName] instanceof _DataObject3.default) {
					this.data[fieldName].reset(data);
				} else {
					this.data[fieldName] = data;
				}
			}
			return this.data[fieldName];
		}
	}, {
		key: 'reset',
		value: function reset() {
			var data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

			for (var key in this.data) {
				if (typeof data[key] === 'undefined') {
					this.data[key] = null;
				}
			}
			this.setBatch(data);
			this.trigger('reset', this);
		}
	}, {
		key: 'equals',
		value: function equals(obj) {
			if (obj === null || typeof obj === 'undefined') return false;
			if (this === obj) return true;
			if ((typeof obj === 'undefined' ? 'undefined' : (0, _typeof3.default)(obj)) !== (0, _typeof3.default)(this)) return false;
			if (obj.get('id') === this.get('id')) return true;
			return false;
		}
	}]);
	return _class;
}(_DataObject3.default);

exports.default = _class;

/***/ }),
/* 54 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _Component = __webpack_require__(55);

var _Component2 = _interopRequireDefault(_Component);

var _DataCollection = __webpack_require__(91);

var _DataCollection2 = _interopRequireDefault(_DataCollection);

var _DataModel = __webpack_require__(53);

var _DataModel2 = _interopRequireDefault(_DataModel);

var _DataObject = __webpack_require__(38);

var _DataObject2 = _interopRequireDefault(_DataObject);

var _El = __webpack_require__(50);

var _El2 = _interopRequireDefault(_El);

var _Router = __webpack_require__(101);

var _Router2 = _interopRequireDefault(_Router);

var _EventListener = __webpack_require__(49);

var _EventListener2 = _interopRequireDefault(_EventListener);

var _EventMixin = __webpack_require__(16);

var _EventMixin2 = _interopRequireDefault(_EventMixin);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var k = {};

k.Component = _Component2.default;
k.DataCollection = _DataCollection2.default;
k.DataModel = _DataModel2.default;
k.el = _El2.default;
k.Router = _Router2.default;
k.EventListener = _EventListener2.default;
k.EventMixin = _EventMixin2.default;

window.k = k;

/***/ }),
/* 55 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _classCallCheck2 = __webpack_require__(5);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(6);

var _createClass3 = _interopRequireDefault(_createClass2);

var _EventMixin = __webpack_require__(16);

var _EventMixin2 = _interopRequireDefault(_EventMixin);

var _El = __webpack_require__(50);

var _El2 = _interopRequireDefault(_El);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
	Component holds the reactive logic for a DOM element
*/
var Component = (0, _EventMixin2.default)(function () {
	function _class() {
		var dataObject = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
		var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
		(0, _classCallCheck3.default)(this, _class);

		this.dataObject = dataObject; // a DataModel or DataCollection
		this.options = options;
		this.cleanedUp = false;
		if (typeof this.options.el !== 'undefined') {
			this.el = this.options.el;
		} else {
			this.el = _El2.default.div();
		}
		this.boundCallbacks = []; // { callback, dataObject } to be unbound during cleanup
		this.domEventCallbacks = []; // { callback, eventName, targetEl } to be unregistered during cleanup
		this._el.component = this;
	}

	(0, _createClass3.default)(_class, [{
		key: 'cleanup',
		value: function cleanup() {
			if (this.cleanedUp) return;
			this.cleanedUp = true;
			this.clearListeners();
			var _iteratorNormalCompletion = true;
			var _didIteratorError = false;
			var _iteratorError = undefined;

			try {
				for (var _iterator = this.boundCallbacks[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
					var bindInfo = _step.value;

					bindInfo.dataObject.removeListener(bindInfo.callback);
				}
			} catch (err) {
				_didIteratorError = true;
				_iteratorError = err;
			} finally {
				try {
					if (!_iteratorNormalCompletion && _iterator.return) {
						_iterator.return();
					}
				} finally {
					if (_didIteratorError) {
						throw _iteratorError;
					}
				}
			}

			var _iteratorNormalCompletion2 = true;
			var _didIteratorError2 = false;
			var _iteratorError2 = undefined;

			try {
				for (var _iterator2 = this.domEventCallbacks[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
					var domInfo = _step2.value;

					domInfo.targetEl.removeEventListener(domInfo.eventName, domInfo.callback);
				}
			} catch (err) {
				_didIteratorError2 = true;
				_iteratorError2 = err;
			} finally {
				try {
					if (!_iteratorNormalCompletion2 && _iterator2.return) {
						_iterator2.return();
					}
				} finally {
					if (_didIteratorError2) {
						throw _iteratorError2;
					}
				}
			}
		}
		// The root DOM element

	}, {
		key: 'listenTo',

		/*
  	Listen to a DOM event.
  	For example:
  		this.buttonEl = el.button()
  		this.listenTo('click', this.buttonEl, this.handleClick)
  */
		value: function listenTo(eventName, targetEl, callback) {
			var context = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : this;

			var boundCallback = context === null ? callback : callback.bind(context);
			var info = {
				eventName: eventName,
				targetEl: targetEl,
				originalCallback: callback,
				context: context,
				callback: boundCallback
			};
			targetEl.addEventListener(eventName, info.callback);
			this.domEventCallbacks.push(info);
		}
		/*
  	Set the targetElement.innerText to the value of dataObject.get(fieldName) as it changes
  	dataObject defaults to this.dataObject but can be any DataModel or DataCollection
  	formatter defaults to the identity function but can be any function that accepts the value and returns a string
  */

	}, {
		key: 'bindText',
		value: function bindText(fieldName, targetElement) {
			var formatter = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
			var dataObject = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : this.dataObject;

			if (formatter === null) {
				formatter = function formatter(value) {
					if (value === null) return '';
					if (typeof value === 'string') return value;
					return '' + value;
				};
			}
			var callback = function callback() {
				var result = formatter(dataObject.get(fieldName));
				targetElement.innerText = typeof result === 'string' ? result : '';
			};
			dataObject.addListener(callback, 'changed:' + fieldName);
			callback();
			this.boundCallbacks.push({
				callback: callback,
				dataObject: dataObject
			});
		}
		/*
  	Set the attributeName attribute of targetElement to the value of dataObject.get(fieldName) as it changes
  	formatter defaults to the identity function but can be any function that accepts the value and returns a string
  */

	}, {
		key: 'bindAttribute',
		value: function bindAttribute(fieldName, targetElement, attributeName) {
			var formatter = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : null;
			var dataObject = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : this.dataObject;

			if (formatter === null) {
				formatter = function formatter(value) {
					if (value === null) return '';
					if (typeof value === 'string') return value;
					return '' + value;
				};
			}
			var callback = function callback() {
				targetElement.setAttribute(attributeName, formatter(dataObject.get(fieldName)));
			};
			dataObject.addListener(callback, 'changed:' + fieldName);
			callback();
			this.boundCallbacks.push({
				callback: callback,
				dataObject: dataObject
			});
		}
	}, {
		key: 'el',
		get: function get() {
			return this._el;
		},
		set: function set(domElement) {
			if (!domElement || domElement.nodeType !== 1) {
				throw new Error('Tried to set a non-DOM element to Component.el: ' + domElement + ': ' + domElement.nodeType);
			}
			if (this._el) {
				delete this._el['component'];
			}
			this._el = domElement;
			this._el.component = this;
			this.trigger(Component.ElementChangedEvent, this, this._el);
		}
	}]);
	return _class;
}());

Component.ElementChangeEvent = 'element-changed';

exports.default = Component;

/***/ }),
/* 56 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(57), __esModule: true };

/***/ }),
/* 57 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(58);
var $Object = __webpack_require__(0).Object;
module.exports = function defineProperty(it, key, desc) {
  return $Object.defineProperty(it, key, desc);
};


/***/ }),
/* 58 */
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__(7);
// 19.1.2.4 / 15.2.3.6 Object.defineProperty(O, P, Attributes)
$export($export.S + $export.F * !__webpack_require__(8), 'Object', { defineProperty: __webpack_require__(3).f });


/***/ }),
/* 59 */
/***/ (function(module, exports) {

module.exports = function (it) {
  if (typeof it != 'function') throw TypeError(it + ' is not a function!');
  return it;
};


/***/ }),
/* 60 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(61), __esModule: true };

/***/ }),
/* 61 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(41);
__webpack_require__(69);
module.exports = __webpack_require__(33).f('iterator');


/***/ }),
/* 62 */
/***/ (function(module, exports, __webpack_require__) {

var toInteger = __webpack_require__(23);
var defined = __webpack_require__(24);
// true  -> String#at
// false -> String#codePointAt
module.exports = function (TO_STRING) {
  return function (that, pos) {
    var s = String(defined(that));
    var i = toInteger(pos);
    var l = s.length;
    var a, b;
    if (i < 0 || i >= l) return TO_STRING ? '' : undefined;
    a = s.charCodeAt(i);
    return a < 0xd800 || a > 0xdbff || i + 1 === l || (b = s.charCodeAt(i + 1)) < 0xdc00 || b > 0xdfff
      ? TO_STRING ? s.charAt(i) : a
      : TO_STRING ? s.slice(i, i + 2) : (a - 0xd800 << 10) + (b - 0xdc00) + 0x10000;
  };
};


/***/ }),
/* 63 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var create = __webpack_require__(26);
var descriptor = __webpack_require__(14);
var setToStringTag = __webpack_require__(31);
var IteratorPrototype = {};

// 25.1.2.1.1 %IteratorPrototype%[@@iterator]()
__webpack_require__(10)(IteratorPrototype, __webpack_require__(1)('iterator'), function () { return this; });

module.exports = function (Constructor, NAME, next) {
  Constructor.prototype = create(IteratorPrototype, { next: descriptor(1, next) });
  setToStringTag(Constructor, NAME + ' Iterator');
};


/***/ }),
/* 64 */
/***/ (function(module, exports, __webpack_require__) {

var dP = __webpack_require__(3);
var anObject = __webpack_require__(11);
var getKeys = __webpack_require__(18);

module.exports = __webpack_require__(8) ? Object.defineProperties : function defineProperties(O, Properties) {
  anObject(O);
  var keys = getKeys(Properties);
  var length = keys.length;
  var i = 0;
  var P;
  while (length > i) dP.f(O, P = keys[i++], Properties[P]);
  return O;
};


/***/ }),
/* 65 */
/***/ (function(module, exports, __webpack_require__) {

// fallback for non-array-like ES3 and non-enumerable old V8 strings
var cof = __webpack_require__(27);
// eslint-disable-next-line no-prototype-builtins
module.exports = Object('z').propertyIsEnumerable(0) ? Object : function (it) {
  return cof(it) == 'String' ? it.split('') : Object(it);
};


/***/ }),
/* 66 */
/***/ (function(module, exports, __webpack_require__) {

// false -> Array#indexOf
// true  -> Array#includes
var toIObject = __webpack_require__(4);
var toLength = __webpack_require__(45);
var toAbsoluteIndex = __webpack_require__(67);
module.exports = function (IS_INCLUDES) {
  return function ($this, el, fromIndex) {
    var O = toIObject($this);
    var length = toLength(O.length);
    var index = toAbsoluteIndex(fromIndex, length);
    var value;
    // Array#includes uses SameValueZero equality algorithm
    // eslint-disable-next-line no-self-compare
    if (IS_INCLUDES && el != el) while (length > index) {
      value = O[index++];
      // eslint-disable-next-line no-self-compare
      if (value != value) return true;
    // Array#indexOf ignores holes, Array#includes - not
    } else for (;length > index; index++) if (IS_INCLUDES || index in O) {
      if (O[index] === el) return IS_INCLUDES || index || 0;
    } return !IS_INCLUDES && -1;
  };
};


/***/ }),
/* 67 */
/***/ (function(module, exports, __webpack_require__) {

var toInteger = __webpack_require__(23);
var max = Math.max;
var min = Math.min;
module.exports = function (index, length) {
  index = toInteger(index);
  return index < 0 ? max(index + length, 0) : min(index, length);
};


/***/ }),
/* 68 */
/***/ (function(module, exports, __webpack_require__) {

var document = __webpack_require__(2).document;
module.exports = document && document.documentElement;


/***/ }),
/* 69 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(70);
var global = __webpack_require__(2);
var hide = __webpack_require__(10);
var Iterators = __webpack_require__(15);
var TO_STRING_TAG = __webpack_require__(1)('toStringTag');

var DOMIterables = ('CSSRuleList,CSSStyleDeclaration,CSSValueList,ClientRectList,DOMRectList,DOMStringList,' +
  'DOMTokenList,DataTransferItemList,FileList,HTMLAllCollection,HTMLCollection,HTMLFormElement,HTMLSelectElement,' +
  'MediaList,MimeTypeArray,NamedNodeMap,NodeList,PaintRequestList,Plugin,PluginArray,SVGLengthList,SVGNumberList,' +
  'SVGPathSegList,SVGPointList,SVGStringList,SVGTransformList,SourceBufferList,StyleSheetList,TextTrackCueList,' +
  'TextTrackList,TouchList').split(',');

for (var i = 0; i < DOMIterables.length; i++) {
  var NAME = DOMIterables[i];
  var Collection = global[NAME];
  var proto = Collection && Collection.prototype;
  if (proto && !proto[TO_STRING_TAG]) hide(proto, TO_STRING_TAG, NAME);
  Iterators[NAME] = Iterators.Array;
}


/***/ }),
/* 70 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var addToUnscopables = __webpack_require__(71);
var step = __webpack_require__(72);
var Iterators = __webpack_require__(15);
var toIObject = __webpack_require__(4);

// 22.1.3.4 Array.prototype.entries()
// 22.1.3.13 Array.prototype.keys()
// 22.1.3.29 Array.prototype.values()
// 22.1.3.30 Array.prototype[@@iterator]()
module.exports = __webpack_require__(42)(Array, 'Array', function (iterated, kind) {
  this._t = toIObject(iterated); // target
  this._i = 0;                   // next index
  this._k = kind;                // kind
// 22.1.5.2.1 %ArrayIteratorPrototype%.next()
}, function () {
  var O = this._t;
  var kind = this._k;
  var index = this._i++;
  if (!O || index >= O.length) {
    this._t = undefined;
    return step(1);
  }
  if (kind == 'keys') return step(0, index);
  if (kind == 'values') return step(0, O[index]);
  return step(0, [index, O[index]]);
}, 'values');

// argumentsList[@@iterator] is %ArrayProto_values% (9.4.4.6, 9.4.4.7)
Iterators.Arguments = Iterators.Array;

addToUnscopables('keys');
addToUnscopables('values');
addToUnscopables('entries');


/***/ }),
/* 71 */
/***/ (function(module, exports) {

module.exports = function () { /* empty */ };


/***/ }),
/* 72 */
/***/ (function(module, exports) {

module.exports = function (done, value) {
  return { value: value, done: !!done };
};


/***/ }),
/* 73 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(74), __esModule: true };

/***/ }),
/* 74 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(75);
__webpack_require__(81);
__webpack_require__(82);
__webpack_require__(83);
module.exports = __webpack_require__(0).Symbol;


/***/ }),
/* 75 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// ECMAScript 6 symbols shim
var global = __webpack_require__(2);
var has = __webpack_require__(9);
var DESCRIPTORS = __webpack_require__(8);
var $export = __webpack_require__(7);
var redefine = __webpack_require__(43);
var META = __webpack_require__(76).KEY;
var $fails = __webpack_require__(13);
var shared = __webpack_require__(29);
var setToStringTag = __webpack_require__(31);
var uid = __webpack_require__(19);
var wks = __webpack_require__(1);
var wksExt = __webpack_require__(33);
var wksDefine = __webpack_require__(34);
var keyOf = __webpack_require__(77);
var enumKeys = __webpack_require__(78);
var isArray = __webpack_require__(79);
var anObject = __webpack_require__(11);
var toIObject = __webpack_require__(4);
var toPrimitive = __webpack_require__(21);
var createDesc = __webpack_require__(14);
var _create = __webpack_require__(26);
var gOPNExt = __webpack_require__(80);
var $GOPD = __webpack_require__(36);
var $DP = __webpack_require__(3);
var $keys = __webpack_require__(18);
var gOPD = $GOPD.f;
var dP = $DP.f;
var gOPN = gOPNExt.f;
var $Symbol = global.Symbol;
var $JSON = global.JSON;
var _stringify = $JSON && $JSON.stringify;
var PROTOTYPE = 'prototype';
var HIDDEN = wks('_hidden');
var TO_PRIMITIVE = wks('toPrimitive');
var isEnum = {}.propertyIsEnumerable;
var SymbolRegistry = shared('symbol-registry');
var AllSymbols = shared('symbols');
var OPSymbols = shared('op-symbols');
var ObjectProto = Object[PROTOTYPE];
var USE_NATIVE = typeof $Symbol == 'function';
var QObject = global.QObject;
// Don't use setters in Qt Script, https://github.com/zloirock/core-js/issues/173
var setter = !QObject || !QObject[PROTOTYPE] || !QObject[PROTOTYPE].findChild;

// fallback for old Android, https://code.google.com/p/v8/issues/detail?id=687
var setSymbolDesc = DESCRIPTORS && $fails(function () {
  return _create(dP({}, 'a', {
    get: function () { return dP(this, 'a', { value: 7 }).a; }
  })).a != 7;
}) ? function (it, key, D) {
  var protoDesc = gOPD(ObjectProto, key);
  if (protoDesc) delete ObjectProto[key];
  dP(it, key, D);
  if (protoDesc && it !== ObjectProto) dP(ObjectProto, key, protoDesc);
} : dP;

var wrap = function (tag) {
  var sym = AllSymbols[tag] = _create($Symbol[PROTOTYPE]);
  sym._k = tag;
  return sym;
};

var isSymbol = USE_NATIVE && typeof $Symbol.iterator == 'symbol' ? function (it) {
  return typeof it == 'symbol';
} : function (it) {
  return it instanceof $Symbol;
};

var $defineProperty = function defineProperty(it, key, D) {
  if (it === ObjectProto) $defineProperty(OPSymbols, key, D);
  anObject(it);
  key = toPrimitive(key, true);
  anObject(D);
  if (has(AllSymbols, key)) {
    if (!D.enumerable) {
      if (!has(it, HIDDEN)) dP(it, HIDDEN, createDesc(1, {}));
      it[HIDDEN][key] = true;
    } else {
      if (has(it, HIDDEN) && it[HIDDEN][key]) it[HIDDEN][key] = false;
      D = _create(D, { enumerable: createDesc(0, false) });
    } return setSymbolDesc(it, key, D);
  } return dP(it, key, D);
};
var $defineProperties = function defineProperties(it, P) {
  anObject(it);
  var keys = enumKeys(P = toIObject(P));
  var i = 0;
  var l = keys.length;
  var key;
  while (l > i) $defineProperty(it, key = keys[i++], P[key]);
  return it;
};
var $create = function create(it, P) {
  return P === undefined ? _create(it) : $defineProperties(_create(it), P);
};
var $propertyIsEnumerable = function propertyIsEnumerable(key) {
  var E = isEnum.call(this, key = toPrimitive(key, true));
  if (this === ObjectProto && has(AllSymbols, key) && !has(OPSymbols, key)) return false;
  return E || !has(this, key) || !has(AllSymbols, key) || has(this, HIDDEN) && this[HIDDEN][key] ? E : true;
};
var $getOwnPropertyDescriptor = function getOwnPropertyDescriptor(it, key) {
  it = toIObject(it);
  key = toPrimitive(key, true);
  if (it === ObjectProto && has(AllSymbols, key) && !has(OPSymbols, key)) return;
  var D = gOPD(it, key);
  if (D && has(AllSymbols, key) && !(has(it, HIDDEN) && it[HIDDEN][key])) D.enumerable = true;
  return D;
};
var $getOwnPropertyNames = function getOwnPropertyNames(it) {
  var names = gOPN(toIObject(it));
  var result = [];
  var i = 0;
  var key;
  while (names.length > i) {
    if (!has(AllSymbols, key = names[i++]) && key != HIDDEN && key != META) result.push(key);
  } return result;
};
var $getOwnPropertySymbols = function getOwnPropertySymbols(it) {
  var IS_OP = it === ObjectProto;
  var names = gOPN(IS_OP ? OPSymbols : toIObject(it));
  var result = [];
  var i = 0;
  var key;
  while (names.length > i) {
    if (has(AllSymbols, key = names[i++]) && (IS_OP ? has(ObjectProto, key) : true)) result.push(AllSymbols[key]);
  } return result;
};

// 19.4.1.1 Symbol([description])
if (!USE_NATIVE) {
  $Symbol = function Symbol() {
    if (this instanceof $Symbol) throw TypeError('Symbol is not a constructor!');
    var tag = uid(arguments.length > 0 ? arguments[0] : undefined);
    var $set = function (value) {
      if (this === ObjectProto) $set.call(OPSymbols, value);
      if (has(this, HIDDEN) && has(this[HIDDEN], tag)) this[HIDDEN][tag] = false;
      setSymbolDesc(this, tag, createDesc(1, value));
    };
    if (DESCRIPTORS && setter) setSymbolDesc(ObjectProto, tag, { configurable: true, set: $set });
    return wrap(tag);
  };
  redefine($Symbol[PROTOTYPE], 'toString', function toString() {
    return this._k;
  });

  $GOPD.f = $getOwnPropertyDescriptor;
  $DP.f = $defineProperty;
  __webpack_require__(48).f = gOPNExt.f = $getOwnPropertyNames;
  __webpack_require__(35).f = $propertyIsEnumerable;
  __webpack_require__(47).f = $getOwnPropertySymbols;

  if (DESCRIPTORS && !__webpack_require__(25)) {
    redefine(ObjectProto, 'propertyIsEnumerable', $propertyIsEnumerable, true);
  }

  wksExt.f = function (name) {
    return wrap(wks(name));
  };
}

$export($export.G + $export.W + $export.F * !USE_NATIVE, { Symbol: $Symbol });

for (var es6Symbols = (
  // 19.4.2.2, 19.4.2.3, 19.4.2.4, 19.4.2.6, 19.4.2.8, 19.4.2.9, 19.4.2.10, 19.4.2.11, 19.4.2.12, 19.4.2.13, 19.4.2.14
  'hasInstance,isConcatSpreadable,iterator,match,replace,search,species,split,toPrimitive,toStringTag,unscopables'
).split(','), j = 0; es6Symbols.length > j;)wks(es6Symbols[j++]);

for (var wellKnownSymbols = $keys(wks.store), k = 0; wellKnownSymbols.length > k;) wksDefine(wellKnownSymbols[k++]);

$export($export.S + $export.F * !USE_NATIVE, 'Symbol', {
  // 19.4.2.1 Symbol.for(key)
  'for': function (key) {
    return has(SymbolRegistry, key += '')
      ? SymbolRegistry[key]
      : SymbolRegistry[key] = $Symbol(key);
  },
  // 19.4.2.5 Symbol.keyFor(sym)
  keyFor: function keyFor(key) {
    if (isSymbol(key)) return keyOf(SymbolRegistry, key);
    throw TypeError(key + ' is not a symbol!');
  },
  useSetter: function () { setter = true; },
  useSimple: function () { setter = false; }
});

$export($export.S + $export.F * !USE_NATIVE, 'Object', {
  // 19.1.2.2 Object.create(O [, Properties])
  create: $create,
  // 19.1.2.4 Object.defineProperty(O, P, Attributes)
  defineProperty: $defineProperty,
  // 19.1.2.3 Object.defineProperties(O, Properties)
  defineProperties: $defineProperties,
  // 19.1.2.6 Object.getOwnPropertyDescriptor(O, P)
  getOwnPropertyDescriptor: $getOwnPropertyDescriptor,
  // 19.1.2.7 Object.getOwnPropertyNames(O)
  getOwnPropertyNames: $getOwnPropertyNames,
  // 19.1.2.8 Object.getOwnPropertySymbols(O)
  getOwnPropertySymbols: $getOwnPropertySymbols
});

// 24.3.2 JSON.stringify(value [, replacer [, space]])
$JSON && $export($export.S + $export.F * (!USE_NATIVE || $fails(function () {
  var S = $Symbol();
  // MS Edge converts symbol values to JSON as {}
  // WebKit converts symbol values to JSON as null
  // V8 throws on boxed symbols
  return _stringify([S]) != '[null]' || _stringify({ a: S }) != '{}' || _stringify(Object(S)) != '{}';
})), 'JSON', {
  stringify: function stringify(it) {
    if (it === undefined || isSymbol(it)) return; // IE8 returns string on undefined
    var args = [it];
    var i = 1;
    var replacer, $replacer;
    while (arguments.length > i) args.push(arguments[i++]);
    replacer = args[1];
    if (typeof replacer == 'function') $replacer = replacer;
    if ($replacer || !isArray(replacer)) replacer = function (key, value) {
      if ($replacer) value = $replacer.call(this, key, value);
      if (!isSymbol(value)) return value;
    };
    args[1] = replacer;
    return _stringify.apply($JSON, args);
  }
});

// 19.4.3.4 Symbol.prototype[@@toPrimitive](hint)
$Symbol[PROTOTYPE][TO_PRIMITIVE] || __webpack_require__(10)($Symbol[PROTOTYPE], TO_PRIMITIVE, $Symbol[PROTOTYPE].valueOf);
// 19.4.3.5 Symbol.prototype[@@toStringTag]
setToStringTag($Symbol, 'Symbol');
// 20.2.1.9 Math[@@toStringTag]
setToStringTag(Math, 'Math', true);
// 24.3.3 JSON[@@toStringTag]
setToStringTag(global.JSON, 'JSON', true);


/***/ }),
/* 76 */
/***/ (function(module, exports, __webpack_require__) {

var META = __webpack_require__(19)('meta');
var isObject = __webpack_require__(12);
var has = __webpack_require__(9);
var setDesc = __webpack_require__(3).f;
var id = 0;
var isExtensible = Object.isExtensible || function () {
  return true;
};
var FREEZE = !__webpack_require__(13)(function () {
  return isExtensible(Object.preventExtensions({}));
});
var setMeta = function (it) {
  setDesc(it, META, { value: {
    i: 'O' + ++id, // object ID
    w: {}          // weak collections IDs
  } });
};
var fastKey = function (it, create) {
  // return primitive with prefix
  if (!isObject(it)) return typeof it == 'symbol' ? it : (typeof it == 'string' ? 'S' : 'P') + it;
  if (!has(it, META)) {
    // can't set metadata to uncaught frozen object
    if (!isExtensible(it)) return 'F';
    // not necessary to add metadata
    if (!create) return 'E';
    // add missing metadata
    setMeta(it);
  // return object ID
  } return it[META].i;
};
var getWeak = function (it, create) {
  if (!has(it, META)) {
    // can't set metadata to uncaught frozen object
    if (!isExtensible(it)) return true;
    // not necessary to add metadata
    if (!create) return false;
    // add missing metadata
    setMeta(it);
  // return hash weak collections IDs
  } return it[META].w;
};
// add metadata on freeze-family methods calling
var onFreeze = function (it) {
  if (FREEZE && meta.NEED && isExtensible(it) && !has(it, META)) setMeta(it);
  return it;
};
var meta = module.exports = {
  KEY: META,
  NEED: false,
  fastKey: fastKey,
  getWeak: getWeak,
  onFreeze: onFreeze
};


/***/ }),
/* 77 */
/***/ (function(module, exports, __webpack_require__) {

var getKeys = __webpack_require__(18);
var toIObject = __webpack_require__(4);
module.exports = function (object, el) {
  var O = toIObject(object);
  var keys = getKeys(O);
  var length = keys.length;
  var index = 0;
  var key;
  while (length > index) if (O[key = keys[index++]] === el) return key;
};


/***/ }),
/* 78 */
/***/ (function(module, exports, __webpack_require__) {

// all enumerable object keys, includes symbols
var getKeys = __webpack_require__(18);
var gOPS = __webpack_require__(47);
var pIE = __webpack_require__(35);
module.exports = function (it) {
  var result = getKeys(it);
  var getSymbols = gOPS.f;
  if (getSymbols) {
    var symbols = getSymbols(it);
    var isEnum = pIE.f;
    var i = 0;
    var key;
    while (symbols.length > i) if (isEnum.call(it, key = symbols[i++])) result.push(key);
  } return result;
};


/***/ }),
/* 79 */
/***/ (function(module, exports, __webpack_require__) {

// 7.2.2 IsArray(argument)
var cof = __webpack_require__(27);
module.exports = Array.isArray || function isArray(arg) {
  return cof(arg) == 'Array';
};


/***/ }),
/* 80 */
/***/ (function(module, exports, __webpack_require__) {

// fallback for IE11 buggy Object.getOwnPropertyNames with iframe and window
var toIObject = __webpack_require__(4);
var gOPN = __webpack_require__(48).f;
var toString = {}.toString;

var windowNames = typeof window == 'object' && window && Object.getOwnPropertyNames
  ? Object.getOwnPropertyNames(window) : [];

var getWindowNames = function (it) {
  try {
    return gOPN(it);
  } catch (e) {
    return windowNames.slice();
  }
};

module.exports.f = function getOwnPropertyNames(it) {
  return windowNames && toString.call(it) == '[object Window]' ? getWindowNames(it) : gOPN(toIObject(it));
};


/***/ }),
/* 81 */
/***/ (function(module, exports) {



/***/ }),
/* 82 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(34)('asyncIterator');


/***/ }),
/* 83 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(34)('observable');


/***/ }),
/* 84 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(85), __esModule: true };

/***/ }),
/* 85 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(86);
module.exports = __webpack_require__(0).Object.setPrototypeOf;


/***/ }),
/* 86 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.3.19 Object.setPrototypeOf(O, proto)
var $export = __webpack_require__(7);
$export($export.S, 'Object', { setPrototypeOf: __webpack_require__(87).set });


/***/ }),
/* 87 */
/***/ (function(module, exports, __webpack_require__) {

// Works with __proto__ only. Old v8 can't work with null proto objects.
/* eslint-disable no-proto */
var isObject = __webpack_require__(12);
var anObject = __webpack_require__(11);
var check = function (O, proto) {
  anObject(O);
  if (!isObject(proto) && proto !== null) throw TypeError(proto + ": can't set as prototype!");
};
module.exports = {
  set: Object.setPrototypeOf || ('__proto__' in {} ? // eslint-disable-line
    function (test, buggy, set) {
      try {
        set = __webpack_require__(20)(Function.call, __webpack_require__(36).f(Object.prototype, '__proto__').set, 2);
        set(test, []);
        buggy = !(test instanceof Array);
      } catch (e) { buggy = true; }
      return function setPrototypeOf(O, proto) {
        check(O, proto);
        if (buggy) O.__proto__ = proto;
        else set(O, proto);
        return O;
      };
    }({}, false) : undefined),
  check: check
};


/***/ }),
/* 88 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(89), __esModule: true };

/***/ }),
/* 89 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(90);
var $Object = __webpack_require__(0).Object;
module.exports = function create(P, D) {
  return $Object.create(P, D);
};


/***/ }),
/* 90 */
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__(7);
// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
$export($export.S, 'Object', { create: __webpack_require__(26) });


/***/ }),
/* 91 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _regenerator = __webpack_require__(92);

var _regenerator2 = _interopRequireDefault(_regenerator);

var _classCallCheck2 = __webpack_require__(5);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(6);

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = __webpack_require__(22);

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _get2 = __webpack_require__(51);

var _get3 = _interopRequireDefault(_get2);

var _inherits2 = __webpack_require__(37);

var _inherits3 = _interopRequireDefault(_inherits2);

var _DataObject2 = __webpack_require__(38);

var _DataObject3 = _interopRequireDefault(_DataObject2);

var _DataModel = __webpack_require__(53);

var _DataModel2 = _interopRequireDefault(_DataModel);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
	DataCollection represents an ordered list of DataModel instances

	options:
		dataObject (DataModel): the DataObject extending class to use to wrap each data item in this collection
*/
var DataCollection = function (_DataObject) {
	(0, _inherits3.default)(DataCollection, _DataObject);

	function DataCollection() {
		var data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
		var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
		(0, _classCallCheck3.default)(this, DataCollection);

		var _this = (0, _possibleConstructorReturn3.default)(this, (DataCollection.__proto__ || Object.getPrototypeOf(DataCollection)).call(this, options));

		if (data == null) data = [];
		_this._inReset = false;
		_this._inAddBatch = false;
		_this._boundRelayListener = _this._relayListener.bind(_this);
		_this.dataObjects = [];
		var _iteratorNormalCompletion = true;
		var _didIteratorError = false;
		var _iteratorError = undefined;

		try {
			for (var _iterator = data[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
				var datum = _step.value;

				_this.add(_this.generateDataObject(datum));
			}
		} catch (err) {
			_didIteratorError = true;
			_iteratorError = err;
		} finally {
			try {
				if (!_iteratorNormalCompletion && _iterator.return) {
					_iterator.return();
				}
			} finally {
				if (_didIteratorError) {
					throw _iteratorError;
				}
			}
		}

		return _this;
	}

	(0, _createClass3.default)(DataCollection, [{
		key: 'cleanup',
		value: function cleanup() {
			(0, _get3.default)(DataCollection.prototype.__proto__ || Object.getPrototypeOf(DataCollection.prototype), 'cleanup', this).call(this);
			var _iteratorNormalCompletion2 = true;
			var _didIteratorError2 = false;
			var _iteratorError2 = undefined;

			try {
				for (var _iterator2 = this.dataObjects[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
					var obj = _step2.value;

					obj.removeListener(this._boundRelayListener);
				}
			} catch (err) {
				_didIteratorError2 = true;
				_iteratorError2 = err;
			} finally {
				try {
					if (!_iteratorNormalCompletion2 && _iterator2.return) {
						_iterator2.return();
					}
				} finally {
					if (_didIteratorError2) {
						throw _iteratorError2;
					}
				}
			}

			this.dataObjects.length = 0;
		}
	}, {
		key: 'at',
		value: function at(index) {
			if (index < 0 || index > this.dataObjects.length - 1) {
				throw new Error('Index out of range: ' + index);
			}
			return this.dataObjects[index];
		}
	}, {
		key: 'create',
		value: function create(data) {
			var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

			// Creates an child instance and POSTs it to the collection
			return new Promise(function (resolve, reject) {
				var _this2 = this;

				var fetchOptions = Object.assign(options, this.fetchOptions);
				fetchOptions.method = 'post';
				fetchOptions.body = JSON.stringify(data);
				fetch(this.url, fetchOptions).then(function (response) {
					if (response.status != 200) {
						throw 'Create failed with status ' + response.status;
					}
					return response.json();
				}).then(function (data) {
					var dataObject = _this2.generateDataObject(data);
					_this2.add(dataObject);
					resolve(dataObject);
				}).catch(reject);
			}.bind(this));
		}
	}, {
		key: 'add',
		value: function add(dataObject) {
			if (dataObject instanceof _DataObject3.default == false) {
				dataObject = this.generateDataObject(dataObject);
			}
			if (this.dataObjects.indexOf(dataObject) !== -1) {
				// TODO stop using indexOf because equality doesn't work
				return;
			}
			this.dataObjects.push(dataObject);
			dataObject.collection = this;
			this.trigger('added', this, dataObject);
			if (this._comparator && this._inReset == false && this._inAddBatch == false) {
				this.sort(this._comparator);
			}
			dataObject.addListener(this._boundRelayListener);
		}
	}, {
		key: '_relayListener',
		value: function _relayListener() {
			this.trigger.apply(this, arguments);
		}
		// Add an array of DataObjects to the end of the collection

	}, {
		key: 'addBatch',
		value: function addBatch(dataObjects) {
			this._inAddBatch = true;
			for (var dataObject in dataObjects) {
				if (dataObject instanceof _DataObject3.default == false) {
					dataObject = this.generateDataObject(dataObject);
				}
				this.add(dataObject);
			}
			this._inAddBatch = false;
		}
	}, {
		key: 'indexOf',
		value: function indexOf(dataObject) {
			for (var i = 0; i < this.dataObjects.length; i++) {
				if (this.dataObjects[i].equals(dataObject)) {
					return i;
				}
			}
			return -1;
		}
	}, {
		key: 'firstByField',
		value: function firstByField(fieldName, value) {
			var _iteratorNormalCompletion3 = true;
			var _didIteratorError3 = false;
			var _iteratorError3 = undefined;

			try {
				for (var _iterator3 = this[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
					var model = _step3.value;

					if (model.get(fieldName) === value) {
						return model;
					}
				}
			} catch (err) {
				_didIteratorError3 = true;
				_iteratorError3 = err;
			} finally {
				try {
					if (!_iteratorNormalCompletion3 && _iterator3.return) {
						_iterator3.return();
					}
				} finally {
					if (_didIteratorError3) {
						throw _iteratorError3;
					}
				}
			}

			return null;
		}
	}, {
		key: 'remove',
		value: function remove(dataObject) {
			var index = this.indexOf(dataObject);
			if (index === -1) {
				return;
			}
			this.dataObjects[index].removeListener(this._boundRelayListener);
			this.dataObjects.splice(index, 1);
			dataObject.collection = null;
			this.trigger('removed', this, dataObject);
		}
	}, {
		key: 'reset',
		value: function reset(data) {
			this._inReset = true;
			var _iteratorNormalCompletion4 = true;
			var _didIteratorError4 = false;
			var _iteratorError4 = undefined;

			try {
				for (var _iterator4 = this.dataObjects.slice()[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
					var obj = _step4.value;

					this.remove(obj);
				}
			} catch (err) {
				_didIteratorError4 = true;
				_iteratorError4 = err;
			} finally {
				try {
					if (!_iteratorNormalCompletion4 && _iterator4.return) {
						_iterator4.return();
					}
				} finally {
					if (_didIteratorError4) {
						throw _iteratorError4;
					}
				}
			}

			var _iteratorNormalCompletion5 = true;
			var _didIteratorError5 = false;
			var _iteratorError5 = undefined;

			try {
				for (var _iterator5 = data[Symbol.iterator](), _step5; !(_iteratorNormalCompletion5 = (_step5 = _iterator5.next()).done); _iteratorNormalCompletion5 = true) {
					var datum = _step5.value;

					this.add(this.generateDataObject(datum));
				}
			} catch (err) {
				_didIteratorError5 = true;
				_iteratorError5 = err;
			} finally {
				try {
					if (!_iteratorNormalCompletion5 && _iterator5.return) {
						_iterator5.return();
					}
				} finally {
					if (_didIteratorError5) {
						throw _iteratorError5;
					}
				}
			}

			this._inReset = false;
			if (this._comparator) {
				this.sort(this._comparator);
			}
			this.trigger('reset', this);
		}
	}, {
		key: 'sort',
		value: function sort() {
			var comparator = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : DataCollection.defaultComparator;

			this.dataObjects.sort(comparator);
			this.trigger('sorted', this);
		}
	}, {
		key: 'sortByAttribute',
		value: function sortByAttribute(attributeName) {
			var comparator = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : DataCollection.defaultComparator;

			this.sort(function (obj1, obj2) {
				return comparator(obj1.get(attributeName), obj2.get(attributeName));
			});
		}
	}, {
		key: 'keepSortedByField',
		value: function keepSortedByField(fieldName) {
			var _this3 = this;

			var comparator = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : DataCollection.defaultComparator;

			this._comparator = function (obj1, obj2) {
				return comparator(obj1.get(fieldName), obj2.get(fieldName));
			};
			this.addListener(function () {
				if (_this3._comparator && _this3._inReset == false && _this3._inAddBatch == false) {
					_this3.sort(_this3._comparator);
				}
			}, 'changed:' + fieldName);
		}
	}, {
		key: Symbol.iterator,
		value: /*#__PURE__*/_regenerator2.default.mark(function value() {
			var _iteratorNormalCompletion6, _didIteratorError6, _iteratorError6, _iterator6, _step6, obj;

			return _regenerator2.default.wrap(function value$(_context) {
				while (1) {
					switch (_context.prev = _context.next) {
						case 0:
							_iteratorNormalCompletion6 = true;
							_didIteratorError6 = false;
							_iteratorError6 = undefined;
							_context.prev = 3;
							_iterator6 = this.dataObjects[Symbol.iterator]();

						case 5:
							if (_iteratorNormalCompletion6 = (_step6 = _iterator6.next()).done) {
								_context.next = 12;
								break;
							}

							obj = _step6.value;
							_context.next = 9;
							return obj;

						case 9:
							_iteratorNormalCompletion6 = true;
							_context.next = 5;
							break;

						case 12:
							_context.next = 18;
							break;

						case 14:
							_context.prev = 14;
							_context.t0 = _context['catch'](3);
							_didIteratorError6 = true;
							_iteratorError6 = _context.t0;

						case 18:
							_context.prev = 18;
							_context.prev = 19;

							if (!_iteratorNormalCompletion6 && _iterator6.return) {
								_iterator6.return();
							}

						case 21:
							_context.prev = 21;

							if (!_didIteratorError6) {
								_context.next = 24;
								break;
							}

							throw _iteratorError6;

						case 24:
							return _context.finish(21);

						case 25:
							return _context.finish(18);

						case 26:
						case 'end':
							return _context.stop();
					}
				}
			}, value, this, [[3, 14, 18, 26], [19,, 21, 25]]);
		})
	}, {
		key: 'generateDataObject',
		value: function generateDataObject(data) {
			var options = { collection: this };
			if (this.options.dataObject) {
				var dataObj = new this.options.dataObject(data, options);
			} else {
				var dataObj = new _DataModel2.default(data, options);
			}
			dataObj._new = false;
			return dataObj;
		}
	}, {
		key: 'length',
		get: function get() {
			return this.dataObjects.length;
		}
	}]);
	return DataCollection;
}(_DataObject3.default);

DataCollection.defaultComparator = function (dataObject1, dataObject2) {
	if (dataObject1 === dataObject2) return 0;
	if (typeof dataObject1.equals === 'function' && dataObject1.equals(dataObject2)) return 0;
	if (typeof dataObject1.get === 'function' && typeof dataObject2.get === 'function') {
		var val1 = dataObject1.get('id', -1);
		var val2 = dataObject2.get('id', -1);
		if (val1 === val2) return 0;
		if (val1 < val2) return -1;
		return 1;
	}
	if (dataObject1 < dataObject2) return -1;
	return 1;
};

exports.default = DataCollection;

/***/ }),
/* 92 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(93);


/***/ }),
/* 93 */
/***/ (function(module, exports, __webpack_require__) {

// This method of obtaining a reference to the global object needs to be
// kept identical to the way it is obtained in runtime.js
var g = (function() { return this })() || Function("return this")();

// Use `getOwnPropertyNames` because not all browsers support calling
// `hasOwnProperty` on the global `self` object in a worker. See #183.
var hadRuntime = g.regeneratorRuntime &&
  Object.getOwnPropertyNames(g).indexOf("regeneratorRuntime") >= 0;

// Save the old regeneratorRuntime in case it needs to be restored later.
var oldRuntime = hadRuntime && g.regeneratorRuntime;

// Force reevalutation of runtime.js.
g.regeneratorRuntime = undefined;

module.exports = __webpack_require__(94);

if (hadRuntime) {
  // Restore the original runtime.
  g.regeneratorRuntime = oldRuntime;
} else {
  // Remove the global property added by runtime.js.
  try {
    delete g.regeneratorRuntime;
  } catch(e) {
    g.regeneratorRuntime = undefined;
  }
}


/***/ }),
/* 94 */
/***/ (function(module, exports) {

/**
 * Copyright (c) 2014, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * https://raw.github.com/facebook/regenerator/master/LICENSE file. An
 * additional grant of patent rights can be found in the PATENTS file in
 * the same directory.
 */

!(function(global) {
  "use strict";

  var Op = Object.prototype;
  var hasOwn = Op.hasOwnProperty;
  var undefined; // More compressible than void 0.
  var $Symbol = typeof Symbol === "function" ? Symbol : {};
  var iteratorSymbol = $Symbol.iterator || "@@iterator";
  var asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator";
  var toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag";

  var inModule = typeof module === "object";
  var runtime = global.regeneratorRuntime;
  if (runtime) {
    if (inModule) {
      // If regeneratorRuntime is defined globally and we're in a module,
      // make the exports object identical to regeneratorRuntime.
      module.exports = runtime;
    }
    // Don't bother evaluating the rest of this file if the runtime was
    // already defined globally.
    return;
  }

  // Define the runtime globally (as expected by generated code) as either
  // module.exports (if we're in a module) or a new, empty object.
  runtime = global.regeneratorRuntime = inModule ? module.exports : {};

  function wrap(innerFn, outerFn, self, tryLocsList) {
    // If outerFn provided and outerFn.prototype is a Generator, then outerFn.prototype instanceof Generator.
    var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator;
    var generator = Object.create(protoGenerator.prototype);
    var context = new Context(tryLocsList || []);

    // The ._invoke method unifies the implementations of the .next,
    // .throw, and .return methods.
    generator._invoke = makeInvokeMethod(innerFn, self, context);

    return generator;
  }
  runtime.wrap = wrap;

  // Try/catch helper to minimize deoptimizations. Returns a completion
  // record like context.tryEntries[i].completion. This interface could
  // have been (and was previously) designed to take a closure to be
  // invoked without arguments, but in all the cases we care about we
  // already have an existing method we want to call, so there's no need
  // to create a new function object. We can even get away with assuming
  // the method takes exactly one argument, since that happens to be true
  // in every case, so we don't have to touch the arguments object. The
  // only additional allocation required is the completion record, which
  // has a stable shape and so hopefully should be cheap to allocate.
  function tryCatch(fn, obj, arg) {
    try {
      return { type: "normal", arg: fn.call(obj, arg) };
    } catch (err) {
      return { type: "throw", arg: err };
    }
  }

  var GenStateSuspendedStart = "suspendedStart";
  var GenStateSuspendedYield = "suspendedYield";
  var GenStateExecuting = "executing";
  var GenStateCompleted = "completed";

  // Returning this object from the innerFn has the same effect as
  // breaking out of the dispatch switch statement.
  var ContinueSentinel = {};

  // Dummy constructor functions that we use as the .constructor and
  // .constructor.prototype properties for functions that return Generator
  // objects. For full spec compliance, you may wish to configure your
  // minifier not to mangle the names of these two functions.
  function Generator() {}
  function GeneratorFunction() {}
  function GeneratorFunctionPrototype() {}

  // This is a polyfill for %IteratorPrototype% for environments that
  // don't natively support it.
  var IteratorPrototype = {};
  IteratorPrototype[iteratorSymbol] = function () {
    return this;
  };

  var getProto = Object.getPrototypeOf;
  var NativeIteratorPrototype = getProto && getProto(getProto(values([])));
  if (NativeIteratorPrototype &&
      NativeIteratorPrototype !== Op &&
      hasOwn.call(NativeIteratorPrototype, iteratorSymbol)) {
    // This environment has a native %IteratorPrototype%; use it instead
    // of the polyfill.
    IteratorPrototype = NativeIteratorPrototype;
  }

  var Gp = GeneratorFunctionPrototype.prototype =
    Generator.prototype = Object.create(IteratorPrototype);
  GeneratorFunction.prototype = Gp.constructor = GeneratorFunctionPrototype;
  GeneratorFunctionPrototype.constructor = GeneratorFunction;
  GeneratorFunctionPrototype[toStringTagSymbol] =
    GeneratorFunction.displayName = "GeneratorFunction";

  // Helper for defining the .next, .throw, and .return methods of the
  // Iterator interface in terms of a single ._invoke method.
  function defineIteratorMethods(prototype) {
    ["next", "throw", "return"].forEach(function(method) {
      prototype[method] = function(arg) {
        return this._invoke(method, arg);
      };
    });
  }

  runtime.isGeneratorFunction = function(genFun) {
    var ctor = typeof genFun === "function" && genFun.constructor;
    return ctor
      ? ctor === GeneratorFunction ||
        // For the native GeneratorFunction constructor, the best we can
        // do is to check its .name property.
        (ctor.displayName || ctor.name) === "GeneratorFunction"
      : false;
  };

  runtime.mark = function(genFun) {
    if (Object.setPrototypeOf) {
      Object.setPrototypeOf(genFun, GeneratorFunctionPrototype);
    } else {
      genFun.__proto__ = GeneratorFunctionPrototype;
      if (!(toStringTagSymbol in genFun)) {
        genFun[toStringTagSymbol] = "GeneratorFunction";
      }
    }
    genFun.prototype = Object.create(Gp);
    return genFun;
  };

  // Within the body of any async function, `await x` is transformed to
  // `yield regeneratorRuntime.awrap(x)`, so that the runtime can test
  // `hasOwn.call(value, "__await")` to determine if the yielded value is
  // meant to be awaited.
  runtime.awrap = function(arg) {
    return { __await: arg };
  };

  function AsyncIterator(generator) {
    function invoke(method, arg, resolve, reject) {
      var record = tryCatch(generator[method], generator, arg);
      if (record.type === "throw") {
        reject(record.arg);
      } else {
        var result = record.arg;
        var value = result.value;
        if (value &&
            typeof value === "object" &&
            hasOwn.call(value, "__await")) {
          return Promise.resolve(value.__await).then(function(value) {
            invoke("next", value, resolve, reject);
          }, function(err) {
            invoke("throw", err, resolve, reject);
          });
        }

        return Promise.resolve(value).then(function(unwrapped) {
          // When a yielded Promise is resolved, its final value becomes
          // the .value of the Promise<{value,done}> result for the
          // current iteration. If the Promise is rejected, however, the
          // result for this iteration will be rejected with the same
          // reason. Note that rejections of yielded Promises are not
          // thrown back into the generator function, as is the case
          // when an awaited Promise is rejected. This difference in
          // behavior between yield and await is important, because it
          // allows the consumer to decide what to do with the yielded
          // rejection (swallow it and continue, manually .throw it back
          // into the generator, abandon iteration, whatever). With
          // await, by contrast, there is no opportunity to examine the
          // rejection reason outside the generator function, so the
          // only option is to throw it from the await expression, and
          // let the generator function handle the exception.
          result.value = unwrapped;
          resolve(result);
        }, reject);
      }
    }

    var previousPromise;

    function enqueue(method, arg) {
      function callInvokeWithMethodAndArg() {
        return new Promise(function(resolve, reject) {
          invoke(method, arg, resolve, reject);
        });
      }

      return previousPromise =
        // If enqueue has been called before, then we want to wait until
        // all previous Promises have been resolved before calling invoke,
        // so that results are always delivered in the correct order. If
        // enqueue has not been called before, then it is important to
        // call invoke immediately, without waiting on a callback to fire,
        // so that the async generator function has the opportunity to do
        // any necessary setup in a predictable way. This predictability
        // is why the Promise constructor synchronously invokes its
        // executor callback, and why async functions synchronously
        // execute code before the first await. Since we implement simple
        // async functions in terms of async generators, it is especially
        // important to get this right, even though it requires care.
        previousPromise ? previousPromise.then(
          callInvokeWithMethodAndArg,
          // Avoid propagating failures to Promises returned by later
          // invocations of the iterator.
          callInvokeWithMethodAndArg
        ) : callInvokeWithMethodAndArg();
    }

    // Define the unified helper method that is used to implement .next,
    // .throw, and .return (see defineIteratorMethods).
    this._invoke = enqueue;
  }

  defineIteratorMethods(AsyncIterator.prototype);
  AsyncIterator.prototype[asyncIteratorSymbol] = function () {
    return this;
  };
  runtime.AsyncIterator = AsyncIterator;

  // Note that simple async functions are implemented on top of
  // AsyncIterator objects; they just return a Promise for the value of
  // the final result produced by the iterator.
  runtime.async = function(innerFn, outerFn, self, tryLocsList) {
    var iter = new AsyncIterator(
      wrap(innerFn, outerFn, self, tryLocsList)
    );

    return runtime.isGeneratorFunction(outerFn)
      ? iter // If outerFn is a generator, return the full iterator.
      : iter.next().then(function(result) {
          return result.done ? result.value : iter.next();
        });
  };

  function makeInvokeMethod(innerFn, self, context) {
    var state = GenStateSuspendedStart;

    return function invoke(method, arg) {
      if (state === GenStateExecuting) {
        throw new Error("Generator is already running");
      }

      if (state === GenStateCompleted) {
        if (method === "throw") {
          throw arg;
        }

        // Be forgiving, per 25.3.3.3.3 of the spec:
        // https://people.mozilla.org/~jorendorff/es6-draft.html#sec-generatorresume
        return doneResult();
      }

      context.method = method;
      context.arg = arg;

      while (true) {
        var delegate = context.delegate;
        if (delegate) {
          var delegateResult = maybeInvokeDelegate(delegate, context);
          if (delegateResult) {
            if (delegateResult === ContinueSentinel) continue;
            return delegateResult;
          }
        }

        if (context.method === "next") {
          // Setting context._sent for legacy support of Babel's
          // function.sent implementation.
          context.sent = context._sent = context.arg;

        } else if (context.method === "throw") {
          if (state === GenStateSuspendedStart) {
            state = GenStateCompleted;
            throw context.arg;
          }

          context.dispatchException(context.arg);

        } else if (context.method === "return") {
          context.abrupt("return", context.arg);
        }

        state = GenStateExecuting;

        var record = tryCatch(innerFn, self, context);
        if (record.type === "normal") {
          // If an exception is thrown from innerFn, we leave state ===
          // GenStateExecuting and loop back for another invocation.
          state = context.done
            ? GenStateCompleted
            : GenStateSuspendedYield;

          if (record.arg === ContinueSentinel) {
            continue;
          }

          return {
            value: record.arg,
            done: context.done
          };

        } else if (record.type === "throw") {
          state = GenStateCompleted;
          // Dispatch the exception by looping back around to the
          // context.dispatchException(context.arg) call above.
          context.method = "throw";
          context.arg = record.arg;
        }
      }
    };
  }

  // Call delegate.iterator[context.method](context.arg) and handle the
  // result, either by returning a { value, done } result from the
  // delegate iterator, or by modifying context.method and context.arg,
  // setting context.delegate to null, and returning the ContinueSentinel.
  function maybeInvokeDelegate(delegate, context) {
    var method = delegate.iterator[context.method];
    if (method === undefined) {
      // A .throw or .return when the delegate iterator has no .throw
      // method always terminates the yield* loop.
      context.delegate = null;

      if (context.method === "throw") {
        if (delegate.iterator.return) {
          // If the delegate iterator has a return method, give it a
          // chance to clean up.
          context.method = "return";
          context.arg = undefined;
          maybeInvokeDelegate(delegate, context);

          if (context.method === "throw") {
            // If maybeInvokeDelegate(context) changed context.method from
            // "return" to "throw", let that override the TypeError below.
            return ContinueSentinel;
          }
        }

        context.method = "throw";
        context.arg = new TypeError(
          "The iterator does not provide a 'throw' method");
      }

      return ContinueSentinel;
    }

    var record = tryCatch(method, delegate.iterator, context.arg);

    if (record.type === "throw") {
      context.method = "throw";
      context.arg = record.arg;
      context.delegate = null;
      return ContinueSentinel;
    }

    var info = record.arg;

    if (! info) {
      context.method = "throw";
      context.arg = new TypeError("iterator result is not an object");
      context.delegate = null;
      return ContinueSentinel;
    }

    if (info.done) {
      // Assign the result of the finished delegate to the temporary
      // variable specified by delegate.resultName (see delegateYield).
      context[delegate.resultName] = info.value;

      // Resume execution at the desired location (see delegateYield).
      context.next = delegate.nextLoc;

      // If context.method was "throw" but the delegate handled the
      // exception, let the outer generator proceed normally. If
      // context.method was "next", forget context.arg since it has been
      // "consumed" by the delegate iterator. If context.method was
      // "return", allow the original .return call to continue in the
      // outer generator.
      if (context.method !== "return") {
        context.method = "next";
        context.arg = undefined;
      }

    } else {
      // Re-yield the result returned by the delegate method.
      return info;
    }

    // The delegate iterator is finished, so forget it and continue with
    // the outer generator.
    context.delegate = null;
    return ContinueSentinel;
  }

  // Define Generator.prototype.{next,throw,return} in terms of the
  // unified ._invoke helper method.
  defineIteratorMethods(Gp);

  Gp[toStringTagSymbol] = "Generator";

  // A Generator should always return itself as the iterator object when the
  // @@iterator function is called on it. Some browsers' implementations of the
  // iterator prototype chain incorrectly implement this, causing the Generator
  // object to not be returned from this call. This ensures that doesn't happen.
  // See https://github.com/facebook/regenerator/issues/274 for more details.
  Gp[iteratorSymbol] = function() {
    return this;
  };

  Gp.toString = function() {
    return "[object Generator]";
  };

  function pushTryEntry(locs) {
    var entry = { tryLoc: locs[0] };

    if (1 in locs) {
      entry.catchLoc = locs[1];
    }

    if (2 in locs) {
      entry.finallyLoc = locs[2];
      entry.afterLoc = locs[3];
    }

    this.tryEntries.push(entry);
  }

  function resetTryEntry(entry) {
    var record = entry.completion || {};
    record.type = "normal";
    delete record.arg;
    entry.completion = record;
  }

  function Context(tryLocsList) {
    // The root entry object (effectively a try statement without a catch
    // or a finally block) gives us a place to store values thrown from
    // locations where there is no enclosing try statement.
    this.tryEntries = [{ tryLoc: "root" }];
    tryLocsList.forEach(pushTryEntry, this);
    this.reset(true);
  }

  runtime.keys = function(object) {
    var keys = [];
    for (var key in object) {
      keys.push(key);
    }
    keys.reverse();

    // Rather than returning an object with a next method, we keep
    // things simple and return the next function itself.
    return function next() {
      while (keys.length) {
        var key = keys.pop();
        if (key in object) {
          next.value = key;
          next.done = false;
          return next;
        }
      }

      // To avoid creating an additional object, we just hang the .value
      // and .done properties off the next function object itself. This
      // also ensures that the minifier will not anonymize the function.
      next.done = true;
      return next;
    };
  };

  function values(iterable) {
    if (iterable) {
      var iteratorMethod = iterable[iteratorSymbol];
      if (iteratorMethod) {
        return iteratorMethod.call(iterable);
      }

      if (typeof iterable.next === "function") {
        return iterable;
      }

      if (!isNaN(iterable.length)) {
        var i = -1, next = function next() {
          while (++i < iterable.length) {
            if (hasOwn.call(iterable, i)) {
              next.value = iterable[i];
              next.done = false;
              return next;
            }
          }

          next.value = undefined;
          next.done = true;

          return next;
        };

        return next.next = next;
      }
    }

    // Return an iterator with no values.
    return { next: doneResult };
  }
  runtime.values = values;

  function doneResult() {
    return { value: undefined, done: true };
  }

  Context.prototype = {
    constructor: Context,

    reset: function(skipTempReset) {
      this.prev = 0;
      this.next = 0;
      // Resetting context._sent for legacy support of Babel's
      // function.sent implementation.
      this.sent = this._sent = undefined;
      this.done = false;
      this.delegate = null;

      this.method = "next";
      this.arg = undefined;

      this.tryEntries.forEach(resetTryEntry);

      if (!skipTempReset) {
        for (var name in this) {
          // Not sure about the optimal order of these conditions:
          if (name.charAt(0) === "t" &&
              hasOwn.call(this, name) &&
              !isNaN(+name.slice(1))) {
            this[name] = undefined;
          }
        }
      }
    },

    stop: function() {
      this.done = true;

      var rootEntry = this.tryEntries[0];
      var rootRecord = rootEntry.completion;
      if (rootRecord.type === "throw") {
        throw rootRecord.arg;
      }

      return this.rval;
    },

    dispatchException: function(exception) {
      if (this.done) {
        throw exception;
      }

      var context = this;
      function handle(loc, caught) {
        record.type = "throw";
        record.arg = exception;
        context.next = loc;

        if (caught) {
          // If the dispatched exception was caught by a catch block,
          // then let that catch block handle the exception normally.
          context.method = "next";
          context.arg = undefined;
        }

        return !! caught;
      }

      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        var record = entry.completion;

        if (entry.tryLoc === "root") {
          // Exception thrown outside of any try block that could handle
          // it, so set the completion value of the entire function to
          // throw the exception.
          return handle("end");
        }

        if (entry.tryLoc <= this.prev) {
          var hasCatch = hasOwn.call(entry, "catchLoc");
          var hasFinally = hasOwn.call(entry, "finallyLoc");

          if (hasCatch && hasFinally) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            } else if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }

          } else if (hasCatch) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            }

          } else if (hasFinally) {
            if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }

          } else {
            throw new Error("try statement without catch or finally");
          }
        }
      }
    },

    abrupt: function(type, arg) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc <= this.prev &&
            hasOwn.call(entry, "finallyLoc") &&
            this.prev < entry.finallyLoc) {
          var finallyEntry = entry;
          break;
        }
      }

      if (finallyEntry &&
          (type === "break" ||
           type === "continue") &&
          finallyEntry.tryLoc <= arg &&
          arg <= finallyEntry.finallyLoc) {
        // Ignore the finally entry if control is not jumping to a
        // location outside the try/catch block.
        finallyEntry = null;
      }

      var record = finallyEntry ? finallyEntry.completion : {};
      record.type = type;
      record.arg = arg;

      if (finallyEntry) {
        this.method = "next";
        this.next = finallyEntry.finallyLoc;
        return ContinueSentinel;
      }

      return this.complete(record);
    },

    complete: function(record, afterLoc) {
      if (record.type === "throw") {
        throw record.arg;
      }

      if (record.type === "break" ||
          record.type === "continue") {
        this.next = record.arg;
      } else if (record.type === "return") {
        this.rval = this.arg = record.arg;
        this.method = "return";
        this.next = "end";
      } else if (record.type === "normal" && afterLoc) {
        this.next = afterLoc;
      }

      return ContinueSentinel;
    },

    finish: function(finallyLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.finallyLoc === finallyLoc) {
          this.complete(entry.completion, entry.afterLoc);
          resetTryEntry(entry);
          return ContinueSentinel;
        }
      }
    },

    "catch": function(tryLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc === tryLoc) {
          var record = entry.completion;
          if (record.type === "throw") {
            var thrown = record.arg;
            resetTryEntry(entry);
          }
          return thrown;
        }
      }

      // The context.catch method must only be called with a location
      // argument that corresponds to a known catch block.
      throw new Error("illegal catch attempt");
    },

    delegateYield: function(iterable, resultName, nextLoc) {
      this.delegate = {
        iterator: values(iterable),
        resultName: resultName,
        nextLoc: nextLoc
      };

      if (this.method === "next") {
        // Deliberately forget the last sent value so that we don't
        // accidentally pass it on to the delegate.
        this.arg = undefined;
      }

      return ContinueSentinel;
    }
  };
})(
  // In sloppy mode, unbound `this` refers to the global object, fallback to
  // Function constructor if we're in global strict mode. That is sadly a form
  // of indirect eval which violates Content Security Policy.
  (function() { return this })() || Function("return this")()
);


/***/ }),
/* 95 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(96), __esModule: true };

/***/ }),
/* 96 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(97);
module.exports = __webpack_require__(0).Object.getPrototypeOf;


/***/ }),
/* 97 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.9 Object.getPrototypeOf(O)
var toObject = __webpack_require__(32);
var $getPrototypeOf = __webpack_require__(46);

__webpack_require__(52)('getPrototypeOf', function () {
  return function getPrototypeOf(it) {
    return $getPrototypeOf(toObject(it));
  };
});


/***/ }),
/* 98 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(99), __esModule: true };

/***/ }),
/* 99 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(100);
var $Object = __webpack_require__(0).Object;
module.exports = function getOwnPropertyDescriptor(it, key) {
  return $Object.getOwnPropertyDescriptor(it, key);
};


/***/ }),
/* 100 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.6 Object.getOwnPropertyDescriptor(O, P)
var toIObject = __webpack_require__(4);
var $getOwnPropertyDescriptor = __webpack_require__(36).f;

__webpack_require__(52)('getOwnPropertyDescriptor', function () {
  return function getOwnPropertyDescriptor(it, key) {
    return $getOwnPropertyDescriptor(toIObject(it), key);
  };
});


/***/ }),
/* 101 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _toConsumableArray2 = __webpack_require__(102);

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

var _classCallCheck2 = __webpack_require__(5);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(6);

var _createClass3 = _interopRequireDefault(_createClass2);

var _EventMixin = __webpack_require__(16);

var _EventMixin2 = _interopRequireDefault(_EventMixin);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
	Router maps window.history events and URL path fragments to events
	For example, routing /^blog\/([0-9]+)\/page\/([0-9a-z]+)$/ to an event with parameters for blog and page IDs
*/
var Router = (0, _EventMixin2.default)(function () {
	function _class() {
		(0, _classCallCheck3.default)(this, _class);

		this.cleanedUp = false;
		this.routes = [];
		this.hashListener = this._checkHash.bind(this);
		window.addEventListener('hashchange', this.hashListener, false);
	}

	(0, _createClass3.default)(_class, [{
		key: 'cleanup',
		value: function cleanup() {
			if (this.cleanedUp) return;
			this.cleanedUp = true;
			window.removeEventListener('hashchange', this.hashListener);
			this.clearListeners();
		}
	}, {
		key: 'addRoute',
		value: function addRoute(regex, eventName) {
			for (var _len = arguments.length, parameters = Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
				parameters[_key - 2] = arguments[_key];
			}

			this.routes.push(new (Function.prototype.bind.apply(Route, [null].concat([regex, eventName], parameters)))());
		}
	}, {
		key: 'start',
		value: function start() {
			this._checkHash();
		}
	}, {
		key: '_checkHash',
		value: function _checkHash() {
			this._handleNewPath(document.location.hash.slice(1));
		}
	}, {
		key: '_handleNewPath',
		value: function _handleNewPath(path) {
			var _iteratorNormalCompletion = true;
			var _didIteratorError = false;
			var _iteratorError = undefined;

			try {
				for (var _iterator = this.routes[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
					var route = _step.value;

					var matches = route.matches(path);
					if (matches == null) {
						continue;
					}
					this.trigger.apply(this, [route.eventName].concat((0, _toConsumableArray3.default)(matches), (0, _toConsumableArray3.default)(route.parameters)));
					return;
				}
			} catch (err) {
				_didIteratorError = true;
				_iteratorError = err;
			} finally {
				try {
					if (!_iteratorNormalCompletion && _iterator.return) {
						_iterator.return();
					}
				} finally {
					if (_didIteratorError) {
						throw _iteratorError;
					}
				}
			}

			this.trigger(Router.UnknownRouteEvent, path);
		}
	}]);
	return _class;
}());

Router.RouteAddedEvent = 'route-added';
Router.StartedRoutingEvent = 'started-routing';
Router.UnknownRouteEvent = 'unknown-route';

exports.default = Router;

/*
	Route tracks routes for Router
*/

var Route = function () {
	function Route(regex, eventName) {
		(0, _classCallCheck3.default)(this, Route);

		this.regex = regex;
		this.eventName = eventName;

		for (var _len2 = arguments.length, parameters = Array(_len2 > 2 ? _len2 - 2 : 0), _key2 = 2; _key2 < _len2; _key2++) {
			parameters[_key2 - 2] = arguments[_key2];
		}

		this.parameters = parameters;
	}

	(0, _createClass3.default)(Route, [{
		key: 'matches',
		value: function matches(path) {
			return path.match(this.regex);
		}
	}]);
	return Route;
}();

/***/ }),
/* 102 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _from = __webpack_require__(103);

var _from2 = _interopRequireDefault(_from);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (arr) {
  if (Array.isArray(arr)) {
    for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) {
      arr2[i] = arr[i];
    }

    return arr2;
  } else {
    return (0, _from2.default)(arr);
  }
};

/***/ }),
/* 103 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(104), __esModule: true };

/***/ }),
/* 104 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(41);
__webpack_require__(105);
module.exports = __webpack_require__(0).Array.from;


/***/ }),
/* 105 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var ctx = __webpack_require__(20);
var $export = __webpack_require__(7);
var toObject = __webpack_require__(32);
var call = __webpack_require__(106);
var isArrayIter = __webpack_require__(107);
var toLength = __webpack_require__(45);
var createProperty = __webpack_require__(108);
var getIterFn = __webpack_require__(109);

$export($export.S + $export.F * !__webpack_require__(111)(function (iter) { Array.from(iter); }), 'Array', {
  // 22.1.2.1 Array.from(arrayLike, mapfn = undefined, thisArg = undefined)
  from: function from(arrayLike /* , mapfn = undefined, thisArg = undefined */) {
    var O = toObject(arrayLike);
    var C = typeof this == 'function' ? this : Array;
    var aLen = arguments.length;
    var mapfn = aLen > 1 ? arguments[1] : undefined;
    var mapping = mapfn !== undefined;
    var index = 0;
    var iterFn = getIterFn(O);
    var length, result, step, iterator;
    if (mapping) mapfn = ctx(mapfn, aLen > 2 ? arguments[2] : undefined, 2);
    // if object isn't iterable or it's array with default iterator - use simple case
    if (iterFn != undefined && !(C == Array && isArrayIter(iterFn))) {
      for (iterator = iterFn.call(O), result = new C(); !(step = iterator.next()).done; index++) {
        createProperty(result, index, mapping ? call(iterator, mapfn, [step.value, index], true) : step.value);
      }
    } else {
      length = toLength(O.length);
      for (result = new C(length); length > index; index++) {
        createProperty(result, index, mapping ? mapfn(O[index], index) : O[index]);
      }
    }
    result.length = index;
    return result;
  }
});


/***/ }),
/* 106 */
/***/ (function(module, exports, __webpack_require__) {

// call something on iterator step with safe closing on error
var anObject = __webpack_require__(11);
module.exports = function (iterator, fn, value, entries) {
  try {
    return entries ? fn(anObject(value)[0], value[1]) : fn(value);
  // 7.4.6 IteratorClose(iterator, completion)
  } catch (e) {
    var ret = iterator['return'];
    if (ret !== undefined) anObject(ret.call(iterator));
    throw e;
  }
};


/***/ }),
/* 107 */
/***/ (function(module, exports, __webpack_require__) {

// check on default Array iterator
var Iterators = __webpack_require__(15);
var ITERATOR = __webpack_require__(1)('iterator');
var ArrayProto = Array.prototype;

module.exports = function (it) {
  return it !== undefined && (Iterators.Array === it || ArrayProto[ITERATOR] === it);
};


/***/ }),
/* 108 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $defineProperty = __webpack_require__(3);
var createDesc = __webpack_require__(14);

module.exports = function (object, index, value) {
  if (index in object) $defineProperty.f(object, index, createDesc(0, value));
  else object[index] = value;
};


/***/ }),
/* 109 */
/***/ (function(module, exports, __webpack_require__) {

var classof = __webpack_require__(110);
var ITERATOR = __webpack_require__(1)('iterator');
var Iterators = __webpack_require__(15);
module.exports = __webpack_require__(0).getIteratorMethod = function (it) {
  if (it != undefined) return it[ITERATOR]
    || it['@@iterator']
    || Iterators[classof(it)];
};


/***/ }),
/* 110 */
/***/ (function(module, exports, __webpack_require__) {

// getting tag from 19.1.3.6 Object.prototype.toString()
var cof = __webpack_require__(27);
var TAG = __webpack_require__(1)('toStringTag');
// ES3 wrong here
var ARG = cof(function () { return arguments; }()) == 'Arguments';

// fallback for IE11 Script Access Denied error
var tryGet = function (it, key) {
  try {
    return it[key];
  } catch (e) { /* empty */ }
};

module.exports = function (it) {
  var O, T, B;
  return it === undefined ? 'Undefined' : it === null ? 'Null'
    // @@toStringTag case
    : typeof (T = tryGet(O = Object(it), TAG)) == 'string' ? T
    // builtinTag case
    : ARG ? cof(O)
    // ES3 arguments fallback
    : (B = cof(O)) == 'Object' && typeof O.callee == 'function' ? 'Arguments' : B;
};


/***/ }),
/* 111 */
/***/ (function(module, exports, __webpack_require__) {

var ITERATOR = __webpack_require__(1)('iterator');
var SAFE_CLOSING = false;

try {
  var riter = [7][ITERATOR]();
  riter['return'] = function () { SAFE_CLOSING = true; };
  // eslint-disable-next-line no-throw-literal
  Array.from(riter, function () { throw 2; });
} catch (e) { /* empty */ }

module.exports = function (exec, skipClosing) {
  if (!skipClosing && !SAFE_CLOSING) return false;
  var safe = false;
  try {
    var arr = [7];
    var iter = arr[ITERATOR]();
    iter.next = function () { return { done: safe = true }; };
    arr[ITERATOR] = function () { return iter; };
    exec(arr);
  } catch (e) { /* empty */ }
  return safe;
};


/***/ })
/******/ ]);