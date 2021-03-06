webpackJsonp([0],[
/* 0 */
/*!*************************************************!*\
  !*** ./node_modules/core-js/modules/_export.js ***!
  \*************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(/*! ./_global */ 2);
var core = __webpack_require__(/*! ./_core */ 21);
var hide = __webpack_require__(/*! ./_hide */ 12);
var redefine = __webpack_require__(/*! ./_redefine */ 13);
var ctx = __webpack_require__(/*! ./_ctx */ 18);
var PROTOTYPE = 'prototype';

var $export = function (type, name, source) {
  var IS_FORCED = type & $export.F;
  var IS_GLOBAL = type & $export.G;
  var IS_STATIC = type & $export.S;
  var IS_PROTO = type & $export.P;
  var IS_BIND = type & $export.B;
  var target = IS_GLOBAL ? global : IS_STATIC ? global[name] || (global[name] = {}) : (global[name] || {})[PROTOTYPE];
  var exports = IS_GLOBAL ? core : core[name] || (core[name] = {});
  var expProto = exports[PROTOTYPE] || (exports[PROTOTYPE] = {});
  var key, own, out, exp;
  if (IS_GLOBAL) source = name;
  for (key in source) {
    // contains in native
    own = !IS_FORCED && target && target[key] !== undefined;
    // export native or passed
    out = (own ? target : source)[key];
    // bind timers to global for call from export context
    exp = IS_BIND && own ? ctx(out, global) : IS_PROTO && typeof out == 'function' ? ctx(Function.call, out) : out;
    // extend global
    if (target) redefine(target, key, out, type & $export.U);
    // export
    if (exports[key] != out) hide(exports, key, exp);
    if (IS_PROTO && expProto[key] != out) expProto[key] = out;
  }
};
global.core = core;
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
/* 1 */
/*!****************************************************!*\
  !*** ./node_modules/core-js/modules/_an-object.js ***!
  \****************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(/*! ./_is-object */ 4);
module.exports = function (it) {
  if (!isObject(it)) throw TypeError(it + ' is not an object!');
  return it;
};


/***/ }),
/* 2 */
/*!*************************************************!*\
  !*** ./node_modules/core-js/modules/_global.js ***!
  \*************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports) {

// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
var global = module.exports = typeof window != 'undefined' && window.Math == Math
  ? window : typeof self != 'undefined' && self.Math == Math ? self
  // eslint-disable-next-line no-new-func
  : Function('return this')();
if (typeof __g == 'number') __g = global; // eslint-disable-line no-undef


/***/ }),
/* 3 */
/*!************************************************!*\
  !*** ./node_modules/core-js/modules/_fails.js ***!
  \************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports) {

module.exports = function (exec) {
  try {
    return !!exec();
  } catch (e) {
    return true;
  }
};


/***/ }),
/* 4 */
/*!****************************************************!*\
  !*** ./node_modules/core-js/modules/_is-object.js ***!
  \****************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports) {

module.exports = function (it) {
  return typeof it === 'object' ? it !== null : typeof it === 'function';
};


/***/ }),
/* 5 */
/*!**********************************************!*\
  !*** ./node_modules/core-js/modules/_wks.js ***!
  \**********************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

var store = __webpack_require__(/*! ./_shared */ 51)('wks');
var uid = __webpack_require__(/*! ./_uid */ 33);
var Symbol = __webpack_require__(/*! ./_global */ 2).Symbol;
var USE_SYMBOL = typeof Symbol == 'function';

var $exports = module.exports = function (name) {
  return store[name] || (store[name] =
    USE_SYMBOL && Symbol[name] || (USE_SYMBOL ? Symbol : uid)('Symbol.' + name));
};

$exports.store = store;


/***/ }),
/* 6 */
/*!******************************************************!*\
  !*** ./node_modules/core-js/modules/_descriptors.js ***!
  \******************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// Thank's IE8 for his funny defineProperty
module.exports = !__webpack_require__(/*! ./_fails */ 3)(function () {
  return Object.defineProperty({}, 'a', { get: function () { return 7; } }).a != 7;
});


/***/ }),
/* 7 */
/*!****************************************************!*\
  !*** ./node_modules/core-js/modules/_object-dp.js ***!
  \****************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

var anObject = __webpack_require__(/*! ./_an-object */ 1);
var IE8_DOM_DEFINE = __webpack_require__(/*! ./_ie8-dom-define */ 97);
var toPrimitive = __webpack_require__(/*! ./_to-primitive */ 22);
var dP = Object.defineProperty;

exports.f = __webpack_require__(/*! ./_descriptors */ 6) ? Object.defineProperty : function defineProperty(O, P, Attributes) {
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
/* 8 */
/*!****************************************************!*\
  !*** ./node_modules/core-js/modules/_to-length.js ***!
  \****************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// 7.1.15 ToLength
var toInteger = __webpack_require__(/*! ./_to-integer */ 24);
var min = Math.min;
module.exports = function (it) {
  return it > 0 ? min(toInteger(it), 0x1fffffffffffff) : 0; // pow(2, 53) - 1 == 9007199254740991
};


/***/ }),
/* 9 */
/*!****************************************************!*\
  !*** ./node_modules/core-js/modules/_to-object.js ***!
  \****************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// 7.1.13 ToObject(argument)
var defined = __webpack_require__(/*! ./_defined */ 23);
module.exports = function (it) {
  return Object(defined(it));
};


/***/ }),
/* 10 */
/*!*****************************************************!*\
  !*** ./node_modules/core-js/modules/_a-function.js ***!
  \*****************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports) {

module.exports = function (it) {
  if (typeof it != 'function') throw TypeError(it + ' is not a function!');
  return it;
};


/***/ }),
/* 11 */
/*!**********************************************!*\
  !*** ./node_modules/core-js/modules/_has.js ***!
  \**********************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports) {

var hasOwnProperty = {}.hasOwnProperty;
module.exports = function (it, key) {
  return hasOwnProperty.call(it, key);
};


/***/ }),
/* 12 */
/*!***********************************************!*\
  !*** ./node_modules/core-js/modules/_hide.js ***!
  \***********************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

var dP = __webpack_require__(/*! ./_object-dp */ 7);
var createDesc = __webpack_require__(/*! ./_property-desc */ 32);
module.exports = __webpack_require__(/*! ./_descriptors */ 6) ? function (object, key, value) {
  return dP.f(object, key, createDesc(1, value));
} : function (object, key, value) {
  object[key] = value;
  return object;
};


/***/ }),
/* 13 */
/*!***************************************************!*\
  !*** ./node_modules/core-js/modules/_redefine.js ***!
  \***************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(/*! ./_global */ 2);
var hide = __webpack_require__(/*! ./_hide */ 12);
var has = __webpack_require__(/*! ./_has */ 11);
var SRC = __webpack_require__(/*! ./_uid */ 33)('src');
var TO_STRING = 'toString';
var $toString = Function[TO_STRING];
var TPL = ('' + $toString).split(TO_STRING);

__webpack_require__(/*! ./_core */ 21).inspectSource = function (it) {
  return $toString.call(it);
};

(module.exports = function (O, key, val, safe) {
  var isFunction = typeof val == 'function';
  if (isFunction) has(val, 'name') || hide(val, 'name', key);
  if (O[key] === val) return;
  if (isFunction) has(val, SRC) || hide(val, SRC, O[key] ? '' + O[key] : TPL.join(String(key)));
  if (O === global) {
    O[key] = val;
  } else if (!safe) {
    delete O[key];
    hide(O, key, val);
  } else if (O[key]) {
    O[key] = val;
  } else {
    hide(O, key, val);
  }
// add fake Function#toString for correct work wrapped methods / constructors with methods like LoDash isNative
})(Function.prototype, TO_STRING, function toString() {
  return typeof this == 'function' && this[SRC] || $toString.call(this);
});


/***/ }),
/* 14 */
/*!******************************************************!*\
  !*** ./node_modules/core-js/modules/_string-html.js ***!
  \******************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__(/*! ./_export */ 0);
var fails = __webpack_require__(/*! ./_fails */ 3);
var defined = __webpack_require__(/*! ./_defined */ 23);
var quot = /"/g;
// B.2.3.2.1 CreateHTML(string, tag, attribute, value)
var createHTML = function (string, tag, attribute, value) {
  var S = String(defined(string));
  var p1 = '<' + tag;
  if (attribute !== '') p1 += ' ' + attribute + '="' + String(value).replace(quot, '&quot;') + '"';
  return p1 + '>' + S + '</' + tag + '>';
};
module.exports = function (NAME, exec) {
  var O = {};
  O[NAME] = exec(createHTML);
  $export($export.P + $export.F * fails(function () {
    var test = ''[NAME]('"');
    return test !== test.toLowerCase() || test.split('"').length > 3;
  }), 'String', O);
};


/***/ }),
/* 15 */
/*!*****************************************************!*\
  !*** ./node_modules/core-js/modules/_to-iobject.js ***!
  \*****************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// to indexed object, toObject with fallback for non-array-like ES3 strings
var IObject = __webpack_require__(/*! ./_iobject */ 48);
var defined = __webpack_require__(/*! ./_defined */ 23);
module.exports = function (it) {
  return IObject(defined(it));
};


/***/ }),
/* 16 */
/*!******************************************************!*\
  !*** ./node_modules/core-js/modules/_object-gopd.js ***!
  \******************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

var pIE = __webpack_require__(/*! ./_object-pie */ 49);
var createDesc = __webpack_require__(/*! ./_property-desc */ 32);
var toIObject = __webpack_require__(/*! ./_to-iobject */ 15);
var toPrimitive = __webpack_require__(/*! ./_to-primitive */ 22);
var has = __webpack_require__(/*! ./_has */ 11);
var IE8_DOM_DEFINE = __webpack_require__(/*! ./_ie8-dom-define */ 97);
var gOPD = Object.getOwnPropertyDescriptor;

exports.f = __webpack_require__(/*! ./_descriptors */ 6) ? gOPD : function getOwnPropertyDescriptor(O, P) {
  O = toIObject(O);
  P = toPrimitive(P, true);
  if (IE8_DOM_DEFINE) try {
    return gOPD(O, P);
  } catch (e) { /* empty */ }
  if (has(O, P)) return createDesc(!pIE.f.call(O, P), O[P]);
};


/***/ }),
/* 17 */
/*!*****************************************************!*\
  !*** ./node_modules/core-js/modules/_object-gpo.js ***!
  \*****************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.9 / 15.2.3.2 Object.getPrototypeOf(O)
var has = __webpack_require__(/*! ./_has */ 11);
var toObject = __webpack_require__(/*! ./_to-object */ 9);
var IE_PROTO = __webpack_require__(/*! ./_shared-key */ 69)('IE_PROTO');
var ObjectProto = Object.prototype;

module.exports = Object.getPrototypeOf || function (O) {
  O = toObject(O);
  if (has(O, IE_PROTO)) return O[IE_PROTO];
  if (typeof O.constructor == 'function' && O instanceof O.constructor) {
    return O.constructor.prototype;
  } return O instanceof Object ? ObjectProto : null;
};


/***/ }),
/* 18 */
/*!**********************************************!*\
  !*** ./node_modules/core-js/modules/_ctx.js ***!
  \**********************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// optional / simple context binding
var aFunction = __webpack_require__(/*! ./_a-function */ 10);
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
/* 19 */
/*!**********************************************!*\
  !*** ./node_modules/core-js/modules/_cof.js ***!
  \**********************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports) {

var toString = {}.toString;

module.exports = function (it) {
  return toString.call(it).slice(8, -1);
};


/***/ }),
/* 20 */
/*!********************************************************!*\
  !*** ./node_modules/core-js/modules/_strict-method.js ***!
  \********************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var fails = __webpack_require__(/*! ./_fails */ 3);

module.exports = function (method, arg) {
  return !!method && fails(function () {
    // eslint-disable-next-line no-useless-call
    arg ? method.call(null, function () { /* empty */ }, 1) : method.call(null);
  });
};


/***/ }),
/* 21 */
/*!***********************************************!*\
  !*** ./node_modules/core-js/modules/_core.js ***!
  \***********************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports) {

var core = module.exports = { version: '2.5.3' };
if (typeof __e == 'number') __e = core; // eslint-disable-line no-undef


/***/ }),
/* 22 */
/*!*******************************************************!*\
  !*** ./node_modules/core-js/modules/_to-primitive.js ***!
  \*******************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// 7.1.1 ToPrimitive(input [, PreferredType])
var isObject = __webpack_require__(/*! ./_is-object */ 4);
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
/* 23 */
/*!**************************************************!*\
  !*** ./node_modules/core-js/modules/_defined.js ***!
  \**************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports) {

// 7.2.1 RequireObjectCoercible(argument)
module.exports = function (it) {
  if (it == undefined) throw TypeError("Can't call method on  " + it);
  return it;
};


/***/ }),
/* 24 */
/*!*****************************************************!*\
  !*** ./node_modules/core-js/modules/_to-integer.js ***!
  \*****************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports) {

// 7.1.4 ToInteger
var ceil = Math.ceil;
var floor = Math.floor;
module.exports = function (it) {
  return isNaN(it = +it) ? 0 : (it > 0 ? floor : ceil)(it);
};


/***/ }),
/* 25 */
/*!*****************************************************!*\
  !*** ./node_modules/core-js/modules/_object-sap.js ***!
  \*****************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// most Object methods by ES6 should accept primitives
var $export = __webpack_require__(/*! ./_export */ 0);
var core = __webpack_require__(/*! ./_core */ 21);
var fails = __webpack_require__(/*! ./_fails */ 3);
module.exports = function (KEY, exec) {
  var fn = (core.Object || {})[KEY] || Object[KEY];
  var exp = {};
  exp[KEY] = exec(fn);
  $export($export.S + $export.F * fails(function () { fn(1); }), 'Object', exp);
};


/***/ }),
/* 26 */
/*!********************************************************!*\
  !*** ./node_modules/core-js/modules/_array-methods.js ***!
  \********************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// 0 -> Array#forEach
// 1 -> Array#map
// 2 -> Array#filter
// 3 -> Array#some
// 4 -> Array#every
// 5 -> Array#find
// 6 -> Array#findIndex
var ctx = __webpack_require__(/*! ./_ctx */ 18);
var IObject = __webpack_require__(/*! ./_iobject */ 48);
var toObject = __webpack_require__(/*! ./_to-object */ 9);
var toLength = __webpack_require__(/*! ./_to-length */ 8);
var asc = __webpack_require__(/*! ./_array-species-create */ 86);
module.exports = function (TYPE, $create) {
  var IS_MAP = TYPE == 1;
  var IS_FILTER = TYPE == 2;
  var IS_SOME = TYPE == 3;
  var IS_EVERY = TYPE == 4;
  var IS_FIND_INDEX = TYPE == 6;
  var NO_HOLES = TYPE == 5 || IS_FIND_INDEX;
  var create = $create || asc;
  return function ($this, callbackfn, that) {
    var O = toObject($this);
    var self = IObject(O);
    var f = ctx(callbackfn, that, 3);
    var length = toLength(self.length);
    var index = 0;
    var result = IS_MAP ? create($this, length) : IS_FILTER ? create($this, 0) : undefined;
    var val, res;
    for (;length > index; index++) if (NO_HOLES || index in self) {
      val = self[index];
      res = f(val, index, O);
      if (TYPE) {
        if (IS_MAP) result[index] = res;   // map
        else if (res) switch (TYPE) {
          case 3: return true;             // some
          case 5: return val;              // find
          case 6: return index;            // findIndex
          case 2: result.push(val);        // filter
        } else if (IS_EVERY) return false; // every
      }
    }
    return IS_FIND_INDEX ? -1 : IS_SOME || IS_EVERY ? IS_EVERY : result;
  };
};


/***/ }),
/* 27 */
/*!******************************************************!*\
  !*** ./node_modules/core-js/modules/_typed-array.js ***!
  \******************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

if (__webpack_require__(/*! ./_descriptors */ 6)) {
  var LIBRARY = __webpack_require__(/*! ./_library */ 34);
  var global = __webpack_require__(/*! ./_global */ 2);
  var fails = __webpack_require__(/*! ./_fails */ 3);
  var $export = __webpack_require__(/*! ./_export */ 0);
  var $typed = __webpack_require__(/*! ./_typed */ 61);
  var $buffer = __webpack_require__(/*! ./_typed-buffer */ 92);
  var ctx = __webpack_require__(/*! ./_ctx */ 18);
  var anInstance = __webpack_require__(/*! ./_an-instance */ 40);
  var propertyDesc = __webpack_require__(/*! ./_property-desc */ 32);
  var hide = __webpack_require__(/*! ./_hide */ 12);
  var redefineAll = __webpack_require__(/*! ./_redefine-all */ 42);
  var toInteger = __webpack_require__(/*! ./_to-integer */ 24);
  var toLength = __webpack_require__(/*! ./_to-length */ 8);
  var toIndex = __webpack_require__(/*! ./_to-index */ 123);
  var toAbsoluteIndex = __webpack_require__(/*! ./_to-absolute-index */ 36);
  var toPrimitive = __webpack_require__(/*! ./_to-primitive */ 22);
  var has = __webpack_require__(/*! ./_has */ 11);
  var classof = __webpack_require__(/*! ./_classof */ 50);
  var isObject = __webpack_require__(/*! ./_is-object */ 4);
  var toObject = __webpack_require__(/*! ./_to-object */ 9);
  var isArrayIter = __webpack_require__(/*! ./_is-array-iter */ 83);
  var create = __webpack_require__(/*! ./_object-create */ 37);
  var getPrototypeOf = __webpack_require__(/*! ./_object-gpo */ 17);
  var gOPN = __webpack_require__(/*! ./_object-gopn */ 38).f;
  var getIterFn = __webpack_require__(/*! ./core.get-iterator-method */ 85);
  var uid = __webpack_require__(/*! ./_uid */ 33);
  var wks = __webpack_require__(/*! ./_wks */ 5);
  var createArrayMethod = __webpack_require__(/*! ./_array-methods */ 26);
  var createArrayIncludes = __webpack_require__(/*! ./_array-includes */ 52);
  var speciesConstructor = __webpack_require__(/*! ./_species-constructor */ 59);
  var ArrayIterators = __webpack_require__(/*! ./es6.array.iterator */ 88);
  var Iterators = __webpack_require__(/*! ./_iterators */ 45);
  var $iterDetect = __webpack_require__(/*! ./_iter-detect */ 56);
  var setSpecies = __webpack_require__(/*! ./_set-species */ 39);
  var arrayFill = __webpack_require__(/*! ./_array-fill */ 87);
  var arrayCopyWithin = __webpack_require__(/*! ./_array-copy-within */ 113);
  var $DP = __webpack_require__(/*! ./_object-dp */ 7);
  var $GOPD = __webpack_require__(/*! ./_object-gopd */ 16);
  var dP = $DP.f;
  var gOPD = $GOPD.f;
  var RangeError = global.RangeError;
  var TypeError = global.TypeError;
  var Uint8Array = global.Uint8Array;
  var ARRAY_BUFFER = 'ArrayBuffer';
  var SHARED_BUFFER = 'Shared' + ARRAY_BUFFER;
  var BYTES_PER_ELEMENT = 'BYTES_PER_ELEMENT';
  var PROTOTYPE = 'prototype';
  var ArrayProto = Array[PROTOTYPE];
  var $ArrayBuffer = $buffer.ArrayBuffer;
  var $DataView = $buffer.DataView;
  var arrayForEach = createArrayMethod(0);
  var arrayFilter = createArrayMethod(2);
  var arraySome = createArrayMethod(3);
  var arrayEvery = createArrayMethod(4);
  var arrayFind = createArrayMethod(5);
  var arrayFindIndex = createArrayMethod(6);
  var arrayIncludes = createArrayIncludes(true);
  var arrayIndexOf = createArrayIncludes(false);
  var arrayValues = ArrayIterators.values;
  var arrayKeys = ArrayIterators.keys;
  var arrayEntries = ArrayIterators.entries;
  var arrayLastIndexOf = ArrayProto.lastIndexOf;
  var arrayReduce = ArrayProto.reduce;
  var arrayReduceRight = ArrayProto.reduceRight;
  var arrayJoin = ArrayProto.join;
  var arraySort = ArrayProto.sort;
  var arraySlice = ArrayProto.slice;
  var arrayToString = ArrayProto.toString;
  var arrayToLocaleString = ArrayProto.toLocaleString;
  var ITERATOR = wks('iterator');
  var TAG = wks('toStringTag');
  var TYPED_CONSTRUCTOR = uid('typed_constructor');
  var DEF_CONSTRUCTOR = uid('def_constructor');
  var ALL_CONSTRUCTORS = $typed.CONSTR;
  var TYPED_ARRAY = $typed.TYPED;
  var VIEW = $typed.VIEW;
  var WRONG_LENGTH = 'Wrong length!';

  var $map = createArrayMethod(1, function (O, length) {
    return allocate(speciesConstructor(O, O[DEF_CONSTRUCTOR]), length);
  });

  var LITTLE_ENDIAN = fails(function () {
    // eslint-disable-next-line no-undef
    return new Uint8Array(new Uint16Array([1]).buffer)[0] === 1;
  });

  var FORCED_SET = !!Uint8Array && !!Uint8Array[PROTOTYPE].set && fails(function () {
    new Uint8Array(1).set({});
  });

  var toOffset = function (it, BYTES) {
    var offset = toInteger(it);
    if (offset < 0 || offset % BYTES) throw RangeError('Wrong offset!');
    return offset;
  };

  var validate = function (it) {
    if (isObject(it) && TYPED_ARRAY in it) return it;
    throw TypeError(it + ' is not a typed array!');
  };

  var allocate = function (C, length) {
    if (!(isObject(C) && TYPED_CONSTRUCTOR in C)) {
      throw TypeError('It is not a typed array constructor!');
    } return new C(length);
  };

  var speciesFromList = function (O, list) {
    return fromList(speciesConstructor(O, O[DEF_CONSTRUCTOR]), list);
  };

  var fromList = function (C, list) {
    var index = 0;
    var length = list.length;
    var result = allocate(C, length);
    while (length > index) result[index] = list[index++];
    return result;
  };

  var addGetter = function (it, key, internal) {
    dP(it, key, { get: function () { return this._d[internal]; } });
  };

  var $from = function from(source /* , mapfn, thisArg */) {
    var O = toObject(source);
    var aLen = arguments.length;
    var mapfn = aLen > 1 ? arguments[1] : undefined;
    var mapping = mapfn !== undefined;
    var iterFn = getIterFn(O);
    var i, length, values, result, step, iterator;
    if (iterFn != undefined && !isArrayIter(iterFn)) {
      for (iterator = iterFn.call(O), values = [], i = 0; !(step = iterator.next()).done; i++) {
        values.push(step.value);
      } O = values;
    }
    if (mapping && aLen > 2) mapfn = ctx(mapfn, arguments[2], 2);
    for (i = 0, length = toLength(O.length), result = allocate(this, length); length > i; i++) {
      result[i] = mapping ? mapfn(O[i], i) : O[i];
    }
    return result;
  };

  var $of = function of(/* ...items */) {
    var index = 0;
    var length = arguments.length;
    var result = allocate(this, length);
    while (length > index) result[index] = arguments[index++];
    return result;
  };

  // iOS Safari 6.x fails here
  var TO_LOCALE_BUG = !!Uint8Array && fails(function () { arrayToLocaleString.call(new Uint8Array(1)); });

  var $toLocaleString = function toLocaleString() {
    return arrayToLocaleString.apply(TO_LOCALE_BUG ? arraySlice.call(validate(this)) : validate(this), arguments);
  };

  var proto = {
    copyWithin: function copyWithin(target, start /* , end */) {
      return arrayCopyWithin.call(validate(this), target, start, arguments.length > 2 ? arguments[2] : undefined);
    },
    every: function every(callbackfn /* , thisArg */) {
      return arrayEvery(validate(this), callbackfn, arguments.length > 1 ? arguments[1] : undefined);
    },
    fill: function fill(value /* , start, end */) { // eslint-disable-line no-unused-vars
      return arrayFill.apply(validate(this), arguments);
    },
    filter: function filter(callbackfn /* , thisArg */) {
      return speciesFromList(this, arrayFilter(validate(this), callbackfn,
        arguments.length > 1 ? arguments[1] : undefined));
    },
    find: function find(predicate /* , thisArg */) {
      return arrayFind(validate(this), predicate, arguments.length > 1 ? arguments[1] : undefined);
    },
    findIndex: function findIndex(predicate /* , thisArg */) {
      return arrayFindIndex(validate(this), predicate, arguments.length > 1 ? arguments[1] : undefined);
    },
    forEach: function forEach(callbackfn /* , thisArg */) {
      arrayForEach(validate(this), callbackfn, arguments.length > 1 ? arguments[1] : undefined);
    },
    indexOf: function indexOf(searchElement /* , fromIndex */) {
      return arrayIndexOf(validate(this), searchElement, arguments.length > 1 ? arguments[1] : undefined);
    },
    includes: function includes(searchElement /* , fromIndex */) {
      return arrayIncludes(validate(this), searchElement, arguments.length > 1 ? arguments[1] : undefined);
    },
    join: function join(separator) { // eslint-disable-line no-unused-vars
      return arrayJoin.apply(validate(this), arguments);
    },
    lastIndexOf: function lastIndexOf(searchElement /* , fromIndex */) { // eslint-disable-line no-unused-vars
      return arrayLastIndexOf.apply(validate(this), arguments);
    },
    map: function map(mapfn /* , thisArg */) {
      return $map(validate(this), mapfn, arguments.length > 1 ? arguments[1] : undefined);
    },
    reduce: function reduce(callbackfn /* , initialValue */) { // eslint-disable-line no-unused-vars
      return arrayReduce.apply(validate(this), arguments);
    },
    reduceRight: function reduceRight(callbackfn /* , initialValue */) { // eslint-disable-line no-unused-vars
      return arrayReduceRight.apply(validate(this), arguments);
    },
    reverse: function reverse() {
      var that = this;
      var length = validate(that).length;
      var middle = Math.floor(length / 2);
      var index = 0;
      var value;
      while (index < middle) {
        value = that[index];
        that[index++] = that[--length];
        that[length] = value;
      } return that;
    },
    some: function some(callbackfn /* , thisArg */) {
      return arraySome(validate(this), callbackfn, arguments.length > 1 ? arguments[1] : undefined);
    },
    sort: function sort(comparefn) {
      return arraySort.call(validate(this), comparefn);
    },
    subarray: function subarray(begin, end) {
      var O = validate(this);
      var length = O.length;
      var $begin = toAbsoluteIndex(begin, length);
      return new (speciesConstructor(O, O[DEF_CONSTRUCTOR]))(
        O.buffer,
        O.byteOffset + $begin * O.BYTES_PER_ELEMENT,
        toLength((end === undefined ? length : toAbsoluteIndex(end, length)) - $begin)
      );
    }
  };

  var $slice = function slice(start, end) {
    return speciesFromList(this, arraySlice.call(validate(this), start, end));
  };

  var $set = function set(arrayLike /* , offset */) {
    validate(this);
    var offset = toOffset(arguments[1], 1);
    var length = this.length;
    var src = toObject(arrayLike);
    var len = toLength(src.length);
    var index = 0;
    if (len + offset > length) throw RangeError(WRONG_LENGTH);
    while (index < len) this[offset + index] = src[index++];
  };

  var $iterators = {
    entries: function entries() {
      return arrayEntries.call(validate(this));
    },
    keys: function keys() {
      return arrayKeys.call(validate(this));
    },
    values: function values() {
      return arrayValues.call(validate(this));
    }
  };

  var isTAIndex = function (target, key) {
    return isObject(target)
      && target[TYPED_ARRAY]
      && typeof key != 'symbol'
      && key in target
      && String(+key) == String(key);
  };
  var $getDesc = function getOwnPropertyDescriptor(target, key) {
    return isTAIndex(target, key = toPrimitive(key, true))
      ? propertyDesc(2, target[key])
      : gOPD(target, key);
  };
  var $setDesc = function defineProperty(target, key, desc) {
    if (isTAIndex(target, key = toPrimitive(key, true))
      && isObject(desc)
      && has(desc, 'value')
      && !has(desc, 'get')
      && !has(desc, 'set')
      // TODO: add validation descriptor w/o calling accessors
      && !desc.configurable
      && (!has(desc, 'writable') || desc.writable)
      && (!has(desc, 'enumerable') || desc.enumerable)
    ) {
      target[key] = desc.value;
      return target;
    } return dP(target, key, desc);
  };

  if (!ALL_CONSTRUCTORS) {
    $GOPD.f = $getDesc;
    $DP.f = $setDesc;
  }

  $export($export.S + $export.F * !ALL_CONSTRUCTORS, 'Object', {
    getOwnPropertyDescriptor: $getDesc,
    defineProperty: $setDesc
  });

  if (fails(function () { arrayToString.call({}); })) {
    arrayToString = arrayToLocaleString = function toString() {
      return arrayJoin.call(this);
    };
  }

  var $TypedArrayPrototype$ = redefineAll({}, proto);
  redefineAll($TypedArrayPrototype$, $iterators);
  hide($TypedArrayPrototype$, ITERATOR, $iterators.values);
  redefineAll($TypedArrayPrototype$, {
    slice: $slice,
    set: $set,
    constructor: function () { /* noop */ },
    toString: arrayToString,
    toLocaleString: $toLocaleString
  });
  addGetter($TypedArrayPrototype$, 'buffer', 'b');
  addGetter($TypedArrayPrototype$, 'byteOffset', 'o');
  addGetter($TypedArrayPrototype$, 'byteLength', 'l');
  addGetter($TypedArrayPrototype$, 'length', 'e');
  dP($TypedArrayPrototype$, TAG, {
    get: function () { return this[TYPED_ARRAY]; }
  });

  // eslint-disable-next-line max-statements
  module.exports = function (KEY, BYTES, wrapper, CLAMPED) {
    CLAMPED = !!CLAMPED;
    var NAME = KEY + (CLAMPED ? 'Clamped' : '') + 'Array';
    var GETTER = 'get' + KEY;
    var SETTER = 'set' + KEY;
    var TypedArray = global[NAME];
    var Base = TypedArray || {};
    var TAC = TypedArray && getPrototypeOf(TypedArray);
    var FORCED = !TypedArray || !$typed.ABV;
    var O = {};
    var TypedArrayPrototype = TypedArray && TypedArray[PROTOTYPE];
    var getter = function (that, index) {
      var data = that._d;
      return data.v[GETTER](index * BYTES + data.o, LITTLE_ENDIAN);
    };
    var setter = function (that, index, value) {
      var data = that._d;
      if (CLAMPED) value = (value = Math.round(value)) < 0 ? 0 : value > 0xff ? 0xff : value & 0xff;
      data.v[SETTER](index * BYTES + data.o, value, LITTLE_ENDIAN);
    };
    var addElement = function (that, index) {
      dP(that, index, {
        get: function () {
          return getter(this, index);
        },
        set: function (value) {
          return setter(this, index, value);
        },
        enumerable: true
      });
    };
    if (FORCED) {
      TypedArray = wrapper(function (that, data, $offset, $length) {
        anInstance(that, TypedArray, NAME, '_d');
        var index = 0;
        var offset = 0;
        var buffer, byteLength, length, klass;
        if (!isObject(data)) {
          length = toIndex(data);
          byteLength = length * BYTES;
          buffer = new $ArrayBuffer(byteLength);
        } else if (data instanceof $ArrayBuffer || (klass = classof(data)) == ARRAY_BUFFER || klass == SHARED_BUFFER) {
          buffer = data;
          offset = toOffset($offset, BYTES);
          var $len = data.byteLength;
          if ($length === undefined) {
            if ($len % BYTES) throw RangeError(WRONG_LENGTH);
            byteLength = $len - offset;
            if (byteLength < 0) throw RangeError(WRONG_LENGTH);
          } else {
            byteLength = toLength($length) * BYTES;
            if (byteLength + offset > $len) throw RangeError(WRONG_LENGTH);
          }
          length = byteLength / BYTES;
        } else if (TYPED_ARRAY in data) {
          return fromList(TypedArray, data);
        } else {
          return $from.call(TypedArray, data);
        }
        hide(that, '_d', {
          b: buffer,
          o: offset,
          l: byteLength,
          e: length,
          v: new $DataView(buffer)
        });
        while (index < length) addElement(that, index++);
      });
      TypedArrayPrototype = TypedArray[PROTOTYPE] = create($TypedArrayPrototype$);
      hide(TypedArrayPrototype, 'constructor', TypedArray);
    } else if (!fails(function () {
      TypedArray(1);
    }) || !fails(function () {
      new TypedArray(-1); // eslint-disable-line no-new
    }) || !$iterDetect(function (iter) {
      new TypedArray(); // eslint-disable-line no-new
      new TypedArray(null); // eslint-disable-line no-new
      new TypedArray(1.5); // eslint-disable-line no-new
      new TypedArray(iter); // eslint-disable-line no-new
    }, true)) {
      TypedArray = wrapper(function (that, data, $offset, $length) {
        anInstance(that, TypedArray, NAME);
        var klass;
        // `ws` module bug, temporarily remove validation length for Uint8Array
        // https://github.com/websockets/ws/pull/645
        if (!isObject(data)) return new Base(toIndex(data));
        if (data instanceof $ArrayBuffer || (klass = classof(data)) == ARRAY_BUFFER || klass == SHARED_BUFFER) {
          return $length !== undefined
            ? new Base(data, toOffset($offset, BYTES), $length)
            : $offset !== undefined
              ? new Base(data, toOffset($offset, BYTES))
              : new Base(data);
        }
        if (TYPED_ARRAY in data) return fromList(TypedArray, data);
        return $from.call(TypedArray, data);
      });
      arrayForEach(TAC !== Function.prototype ? gOPN(Base).concat(gOPN(TAC)) : gOPN(Base), function (key) {
        if (!(key in TypedArray)) hide(TypedArray, key, Base[key]);
      });
      TypedArray[PROTOTYPE] = TypedArrayPrototype;
      if (!LIBRARY) TypedArrayPrototype.constructor = TypedArray;
    }
    var $nativeIterator = TypedArrayPrototype[ITERATOR];
    var CORRECT_ITER_NAME = !!$nativeIterator
      && ($nativeIterator.name == 'values' || $nativeIterator.name == undefined);
    var $iterator = $iterators.values;
    hide(TypedArray, TYPED_CONSTRUCTOR, true);
    hide(TypedArrayPrototype, TYPED_ARRAY, NAME);
    hide(TypedArrayPrototype, VIEW, true);
    hide(TypedArrayPrototype, DEF_CONSTRUCTOR, TypedArray);

    if (CLAMPED ? new TypedArray(1)[TAG] != NAME : !(TAG in TypedArrayPrototype)) {
      dP(TypedArrayPrototype, TAG, {
        get: function () { return NAME; }
      });
    }

    O[NAME] = TypedArray;

    $export($export.G + $export.W + $export.F * (TypedArray != Base), O);

    $export($export.S, NAME, {
      BYTES_PER_ELEMENT: BYTES
    });

    $export($export.S + $export.F * fails(function () { Base.of.call(TypedArray, 1); }), NAME, {
      from: $from,
      of: $of
    });

    if (!(BYTES_PER_ELEMENT in TypedArrayPrototype)) hide(TypedArrayPrototype, BYTES_PER_ELEMENT, BYTES);

    $export($export.P, NAME, proto);

    setSpecies(NAME);

    $export($export.P + $export.F * FORCED_SET, NAME, { set: $set });

    $export($export.P + $export.F * !CORRECT_ITER_NAME, NAME, $iterators);

    if (!LIBRARY && TypedArrayPrototype.toString != arrayToString) TypedArrayPrototype.toString = arrayToString;

    $export($export.P + $export.F * fails(function () {
      new TypedArray(1).slice();
    }), NAME, { slice: $slice });

    $export($export.P + $export.F * (fails(function () {
      return [1, 2].toLocaleString() != new TypedArray([1, 2]).toLocaleString();
    }) || !fails(function () {
      TypedArrayPrototype.toLocaleString.call([1, 2]);
    })), NAME, { toLocaleString: $toLocaleString });

    Iterators[NAME] = CORRECT_ITER_NAME ? $nativeIterator : $iterator;
    if (!LIBRARY && !CORRECT_ITER_NAME) hide(TypedArrayPrototype, ITERATOR, $iterator);
  };
} else module.exports = function () { /* empty */ };


/***/ }),
/* 28 */
/*!***************************************************!*\
  !*** ./node_modules/core-js/modules/_metadata.js ***!
  \***************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

var Map = __webpack_require__(/*! ./es6.map */ 118);
var $export = __webpack_require__(/*! ./_export */ 0);
var shared = __webpack_require__(/*! ./_shared */ 51)('metadata');
var store = shared.store || (shared.store = new (__webpack_require__(/*! ./es6.weak-map */ 121))());

var getOrCreateMetadataMap = function (target, targetKey, create) {
  var targetMetadata = store.get(target);
  if (!targetMetadata) {
    if (!create) return undefined;
    store.set(target, targetMetadata = new Map());
  }
  var keyMetadata = targetMetadata.get(targetKey);
  if (!keyMetadata) {
    if (!create) return undefined;
    targetMetadata.set(targetKey, keyMetadata = new Map());
  } return keyMetadata;
};
var ordinaryHasOwnMetadata = function (MetadataKey, O, P) {
  var metadataMap = getOrCreateMetadataMap(O, P, false);
  return metadataMap === undefined ? false : metadataMap.has(MetadataKey);
};
var ordinaryGetOwnMetadata = function (MetadataKey, O, P) {
  var metadataMap = getOrCreateMetadataMap(O, P, false);
  return metadataMap === undefined ? undefined : metadataMap.get(MetadataKey);
};
var ordinaryDefineOwnMetadata = function (MetadataKey, MetadataValue, O, P) {
  getOrCreateMetadataMap(O, P, true).set(MetadataKey, MetadataValue);
};
var ordinaryOwnMetadataKeys = function (target, targetKey) {
  var metadataMap = getOrCreateMetadataMap(target, targetKey, false);
  var keys = [];
  if (metadataMap) metadataMap.forEach(function (_, key) { keys.push(key); });
  return keys;
};
var toMetaKey = function (it) {
  return it === undefined || typeof it == 'symbol' ? it : String(it);
};
var exp = function (O) {
  $export($export.S, 'Reflect', O);
};

module.exports = {
  store: store,
  map: getOrCreateMetadataMap,
  has: ordinaryHasOwnMetadata,
  get: ordinaryGetOwnMetadata,
  set: ordinaryDefineOwnMetadata,
  keys: ordinaryOwnMetadataKeys,
  key: toMetaKey,
  exp: exp
};


/***/ }),
/* 29 */,
/* 30 */
/*!***********************************************!*\
  !*** ./node_modules/core-js/modules/_meta.js ***!
  \***********************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

var META = __webpack_require__(/*! ./_uid */ 33)('meta');
var isObject = __webpack_require__(/*! ./_is-object */ 4);
var has = __webpack_require__(/*! ./_has */ 11);
var setDesc = __webpack_require__(/*! ./_object-dp */ 7).f;
var id = 0;
var isExtensible = Object.isExtensible || function () {
  return true;
};
var FREEZE = !__webpack_require__(/*! ./_fails */ 3)(function () {
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
/* 31 */
/*!*************************************************************!*\
  !*** ./node_modules/core-js/modules/_add-to-unscopables.js ***!
  \*************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// 22.1.3.31 Array.prototype[@@unscopables]
var UNSCOPABLES = __webpack_require__(/*! ./_wks */ 5)('unscopables');
var ArrayProto = Array.prototype;
if (ArrayProto[UNSCOPABLES] == undefined) __webpack_require__(/*! ./_hide */ 12)(ArrayProto, UNSCOPABLES, {});
module.exports = function (key) {
  ArrayProto[UNSCOPABLES][key] = true;
};


/***/ }),
/* 32 */
/*!********************************************************!*\
  !*** ./node_modules/core-js/modules/_property-desc.js ***!
  \********************************************************/
/*! dynamic exports provided */
/*! all exports used */
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
/* 33 */
/*!**********************************************!*\
  !*** ./node_modules/core-js/modules/_uid.js ***!
  \**********************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports) {

var id = 0;
var px = Math.random();
module.exports = function (key) {
  return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++id + px).toString(36));
};


/***/ }),
/* 34 */
/*!**************************************************!*\
  !*** ./node_modules/core-js/modules/_library.js ***!
  \**************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports) {

module.exports = false;


/***/ }),
/* 35 */
/*!******************************************************!*\
  !*** ./node_modules/core-js/modules/_object-keys.js ***!
  \******************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.14 / 15.2.3.14 Object.keys(O)
var $keys = __webpack_require__(/*! ./_object-keys-internal */ 99);
var enumBugKeys = __webpack_require__(/*! ./_enum-bug-keys */ 70);

module.exports = Object.keys || function keys(O) {
  return $keys(O, enumBugKeys);
};


/***/ }),
/* 36 */
/*!************************************************************!*\
  !*** ./node_modules/core-js/modules/_to-absolute-index.js ***!
  \************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

var toInteger = __webpack_require__(/*! ./_to-integer */ 24);
var max = Math.max;
var min = Math.min;
module.exports = function (index, length) {
  index = toInteger(index);
  return index < 0 ? max(index + length, 0) : min(index, length);
};


/***/ }),
/* 37 */
/*!********************************************************!*\
  !*** ./node_modules/core-js/modules/_object-create.js ***!
  \********************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
var anObject = __webpack_require__(/*! ./_an-object */ 1);
var dPs = __webpack_require__(/*! ./_object-dps */ 100);
var enumBugKeys = __webpack_require__(/*! ./_enum-bug-keys */ 70);
var IE_PROTO = __webpack_require__(/*! ./_shared-key */ 69)('IE_PROTO');
var Empty = function () { /* empty */ };
var PROTOTYPE = 'prototype';

// Create object with fake `null` prototype: use iframe Object with cleared prototype
var createDict = function () {
  // Thrash, waste and sodomy: IE GC bug
  var iframe = __webpack_require__(/*! ./_dom-create */ 67)('iframe');
  var i = enumBugKeys.length;
  var lt = '<';
  var gt = '>';
  var iframeDocument;
  iframe.style.display = 'none';
  __webpack_require__(/*! ./_html */ 71).appendChild(iframe);
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
/* 38 */
/*!******************************************************!*\
  !*** ./node_modules/core-js/modules/_object-gopn.js ***!
  \******************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.7 / 15.2.3.4 Object.getOwnPropertyNames(O)
var $keys = __webpack_require__(/*! ./_object-keys-internal */ 99);
var hiddenKeys = __webpack_require__(/*! ./_enum-bug-keys */ 70).concat('length', 'prototype');

exports.f = Object.getOwnPropertyNames || function getOwnPropertyNames(O) {
  return $keys(O, hiddenKeys);
};


/***/ }),
/* 39 */
/*!******************************************************!*\
  !*** ./node_modules/core-js/modules/_set-species.js ***!
  \******************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var global = __webpack_require__(/*! ./_global */ 2);
var dP = __webpack_require__(/*! ./_object-dp */ 7);
var DESCRIPTORS = __webpack_require__(/*! ./_descriptors */ 6);
var SPECIES = __webpack_require__(/*! ./_wks */ 5)('species');

module.exports = function (KEY) {
  var C = global[KEY];
  if (DESCRIPTORS && C && !C[SPECIES]) dP.f(C, SPECIES, {
    configurable: true,
    get: function () { return this; }
  });
};


/***/ }),
/* 40 */
/*!******************************************************!*\
  !*** ./node_modules/core-js/modules/_an-instance.js ***!
  \******************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports) {

module.exports = function (it, Constructor, name, forbiddenField) {
  if (!(it instanceof Constructor) || (forbiddenField !== undefined && forbiddenField in it)) {
    throw TypeError(name + ': incorrect invocation!');
  } return it;
};


/***/ }),
/* 41 */
/*!*************************************************!*\
  !*** ./node_modules/core-js/modules/_for-of.js ***!
  \*************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

var ctx = __webpack_require__(/*! ./_ctx */ 18);
var call = __webpack_require__(/*! ./_iter-call */ 111);
var isArrayIter = __webpack_require__(/*! ./_is-array-iter */ 83);
var anObject = __webpack_require__(/*! ./_an-object */ 1);
var toLength = __webpack_require__(/*! ./_to-length */ 8);
var getIterFn = __webpack_require__(/*! ./core.get-iterator-method */ 85);
var BREAK = {};
var RETURN = {};
var exports = module.exports = function (iterable, entries, fn, that, ITERATOR) {
  var iterFn = ITERATOR ? function () { return iterable; } : getIterFn(iterable);
  var f = ctx(fn, that, entries ? 2 : 1);
  var index = 0;
  var length, step, iterator, result;
  if (typeof iterFn != 'function') throw TypeError(iterable + ' is not iterable!');
  // fast case for arrays with default iterator
  if (isArrayIter(iterFn)) for (length = toLength(iterable.length); length > index; index++) {
    result = entries ? f(anObject(step = iterable[index])[0], step[1]) : f(iterable[index]);
    if (result === BREAK || result === RETURN) return result;
  } else for (iterator = iterFn.call(iterable); !(step = iterator.next()).done;) {
    result = call(iterator, f, step.value, entries);
    if (result === BREAK || result === RETURN) return result;
  }
};
exports.BREAK = BREAK;
exports.RETURN = RETURN;


/***/ }),
/* 42 */
/*!*******************************************************!*\
  !*** ./node_modules/core-js/modules/_redefine-all.js ***!
  \*******************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

var redefine = __webpack_require__(/*! ./_redefine */ 13);
module.exports = function (target, src, safe) {
  for (var key in src) redefine(target, key, src[key], safe);
  return target;
};


/***/ }),
/* 43 */
/*!************************************************************!*\
  !*** ./node_modules/core-js/modules/_set-to-string-tag.js ***!
  \************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

var def = __webpack_require__(/*! ./_object-dp */ 7).f;
var has = __webpack_require__(/*! ./_has */ 11);
var TAG = __webpack_require__(/*! ./_wks */ 5)('toStringTag');

module.exports = function (it, tag, stat) {
  if (it && !has(it = stat ? it : it.prototype, TAG)) def(it, TAG, { configurable: true, value: tag });
};


/***/ }),
/* 44 */
/*!******************************************************!*\
  !*** ./node_modules/core-js/modules/_string-trim.js ***!
  \******************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__(/*! ./_export */ 0);
var defined = __webpack_require__(/*! ./_defined */ 23);
var fails = __webpack_require__(/*! ./_fails */ 3);
var spaces = __webpack_require__(/*! ./_string-ws */ 73);
var space = '[' + spaces + ']';
var non = '\u200b\u0085';
var ltrim = RegExp('^' + space + space + '*');
var rtrim = RegExp(space + space + '*$');

var exporter = function (KEY, exec, ALIAS) {
  var exp = {};
  var FORCE = fails(function () {
    return !!spaces[KEY]() || non[KEY]() != non;
  });
  var fn = exp[KEY] = FORCE ? exec(trim) : spaces[KEY];
  if (ALIAS) exp[ALIAS] = fn;
  $export($export.P + $export.F * FORCE, 'String', exp);
};

// 1 -> String#trimLeft
// 2 -> String#trimRight
// 3 -> String#trim
var trim = exporter.trim = function (string, TYPE) {
  string = String(defined(string));
  if (TYPE & 1) string = string.replace(ltrim, '');
  if (TYPE & 2) string = string.replace(rtrim, '');
  return string;
};

module.exports = exporter;


/***/ }),
/* 45 */
/*!****************************************************!*\
  !*** ./node_modules/core-js/modules/_iterators.js ***!
  \****************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports) {

module.exports = {};


/***/ }),
/* 46 */
/*!**************************************************************!*\
  !*** ./node_modules/core-js/modules/_validate-collection.js ***!
  \**************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(/*! ./_is-object */ 4);
module.exports = function (it, TYPE) {
  if (!isObject(it) || it._t !== TYPE) throw TypeError('Incompatible receiver, ' + TYPE + ' required!');
  return it;
};


/***/ }),
/* 47 */,
/* 48 */
/*!**************************************************!*\
  !*** ./node_modules/core-js/modules/_iobject.js ***!
  \**************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// fallback for non-array-like ES3 and non-enumerable old V8 strings
var cof = __webpack_require__(/*! ./_cof */ 19);
// eslint-disable-next-line no-prototype-builtins
module.exports = Object('z').propertyIsEnumerable(0) ? Object : function (it) {
  return cof(it) == 'String' ? it.split('') : Object(it);
};


/***/ }),
/* 49 */
/*!*****************************************************!*\
  !*** ./node_modules/core-js/modules/_object-pie.js ***!
  \*****************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports) {

exports.f = {}.propertyIsEnumerable;


/***/ }),
/* 50 */
/*!**************************************************!*\
  !*** ./node_modules/core-js/modules/_classof.js ***!
  \**************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// getting tag from 19.1.3.6 Object.prototype.toString()
var cof = __webpack_require__(/*! ./_cof */ 19);
var TAG = __webpack_require__(/*! ./_wks */ 5)('toStringTag');
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
/* 51 */
/*!*************************************************!*\
  !*** ./node_modules/core-js/modules/_shared.js ***!
  \*************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(/*! ./_global */ 2);
var SHARED = '__core-js_shared__';
var store = global[SHARED] || (global[SHARED] = {});
module.exports = function (key) {
  return store[key] || (store[key] = {});
};


/***/ }),
/* 52 */
/*!*********************************************************!*\
  !*** ./node_modules/core-js/modules/_array-includes.js ***!
  \*********************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// false -> Array#indexOf
// true  -> Array#includes
var toIObject = __webpack_require__(/*! ./_to-iobject */ 15);
var toLength = __webpack_require__(/*! ./_to-length */ 8);
var toAbsoluteIndex = __webpack_require__(/*! ./_to-absolute-index */ 36);
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
/* 53 */
/*!******************************************************!*\
  !*** ./node_modules/core-js/modules/_object-gops.js ***!
  \******************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports) {

exports.f = Object.getOwnPropertySymbols;


/***/ }),
/* 54 */
/*!***************************************************!*\
  !*** ./node_modules/core-js/modules/_is-array.js ***!
  \***************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// 7.2.2 IsArray(argument)
var cof = __webpack_require__(/*! ./_cof */ 19);
module.exports = Array.isArray || function isArray(arg) {
  return cof(arg) == 'Array';
};


/***/ }),
/* 55 */
/*!****************************************************!*\
  !*** ./node_modules/core-js/modules/_is-regexp.js ***!
  \****************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// 7.2.8 IsRegExp(argument)
var isObject = __webpack_require__(/*! ./_is-object */ 4);
var cof = __webpack_require__(/*! ./_cof */ 19);
var MATCH = __webpack_require__(/*! ./_wks */ 5)('match');
module.exports = function (it) {
  var isRegExp;
  return isObject(it) && ((isRegExp = it[MATCH]) !== undefined ? !!isRegExp : cof(it) == 'RegExp');
};


/***/ }),
/* 56 */
/*!******************************************************!*\
  !*** ./node_modules/core-js/modules/_iter-detect.js ***!
  \******************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

var ITERATOR = __webpack_require__(/*! ./_wks */ 5)('iterator');
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


/***/ }),
/* 57 */
/*!************************************************!*\
  !*** ./node_modules/core-js/modules/_flags.js ***!
  \************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// 21.2.5.3 get RegExp.prototype.flags
var anObject = __webpack_require__(/*! ./_an-object */ 1);
module.exports = function () {
  var that = anObject(this);
  var result = '';
  if (that.global) result += 'g';
  if (that.ignoreCase) result += 'i';
  if (that.multiline) result += 'm';
  if (that.unicode) result += 'u';
  if (that.sticky) result += 'y';
  return result;
};


/***/ }),
/* 58 */
/*!*****************************************************!*\
  !*** ./node_modules/core-js/modules/_fix-re-wks.js ***!
  \*****************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var hide = __webpack_require__(/*! ./_hide */ 12);
var redefine = __webpack_require__(/*! ./_redefine */ 13);
var fails = __webpack_require__(/*! ./_fails */ 3);
var defined = __webpack_require__(/*! ./_defined */ 23);
var wks = __webpack_require__(/*! ./_wks */ 5);

module.exports = function (KEY, length, exec) {
  var SYMBOL = wks(KEY);
  var fns = exec(defined, SYMBOL, ''[KEY]);
  var strfn = fns[0];
  var rxfn = fns[1];
  if (fails(function () {
    var O = {};
    O[SYMBOL] = function () { return 7; };
    return ''[KEY](O) != 7;
  })) {
    redefine(String.prototype, KEY, strfn);
    hide(RegExp.prototype, SYMBOL, length == 2
      // 21.2.5.8 RegExp.prototype[@@replace](string, replaceValue)
      // 21.2.5.11 RegExp.prototype[@@split](string, limit)
      ? function (string, arg) { return rxfn.call(string, this, arg); }
      // 21.2.5.6 RegExp.prototype[@@match](string)
      // 21.2.5.9 RegExp.prototype[@@search](string)
      : function (string) { return rxfn.call(string, this); }
    );
  }
};


/***/ }),
/* 59 */
/*!**************************************************************!*\
  !*** ./node_modules/core-js/modules/_species-constructor.js ***!
  \**************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// 7.3.20 SpeciesConstructor(O, defaultConstructor)
var anObject = __webpack_require__(/*! ./_an-object */ 1);
var aFunction = __webpack_require__(/*! ./_a-function */ 10);
var SPECIES = __webpack_require__(/*! ./_wks */ 5)('species');
module.exports = function (O, D) {
  var C = anObject(O).constructor;
  var S;
  return C === undefined || (S = anObject(C)[SPECIES]) == undefined ? D : aFunction(S);
};


/***/ }),
/* 60 */
/*!*****************************************************!*\
  !*** ./node_modules/core-js/modules/_collection.js ***!
  \*****************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var global = __webpack_require__(/*! ./_global */ 2);
var $export = __webpack_require__(/*! ./_export */ 0);
var redefine = __webpack_require__(/*! ./_redefine */ 13);
var redefineAll = __webpack_require__(/*! ./_redefine-all */ 42);
var meta = __webpack_require__(/*! ./_meta */ 30);
var forOf = __webpack_require__(/*! ./_for-of */ 41);
var anInstance = __webpack_require__(/*! ./_an-instance */ 40);
var isObject = __webpack_require__(/*! ./_is-object */ 4);
var fails = __webpack_require__(/*! ./_fails */ 3);
var $iterDetect = __webpack_require__(/*! ./_iter-detect */ 56);
var setToStringTag = __webpack_require__(/*! ./_set-to-string-tag */ 43);
var inheritIfRequired = __webpack_require__(/*! ./_inherit-if-required */ 74);

module.exports = function (NAME, wrapper, methods, common, IS_MAP, IS_WEAK) {
  var Base = global[NAME];
  var C = Base;
  var ADDER = IS_MAP ? 'set' : 'add';
  var proto = C && C.prototype;
  var O = {};
  var fixMethod = function (KEY) {
    var fn = proto[KEY];
    redefine(proto, KEY,
      KEY == 'delete' ? function (a) {
        return IS_WEAK && !isObject(a) ? false : fn.call(this, a === 0 ? 0 : a);
      } : KEY == 'has' ? function has(a) {
        return IS_WEAK && !isObject(a) ? false : fn.call(this, a === 0 ? 0 : a);
      } : KEY == 'get' ? function get(a) {
        return IS_WEAK && !isObject(a) ? undefined : fn.call(this, a === 0 ? 0 : a);
      } : KEY == 'add' ? function add(a) { fn.call(this, a === 0 ? 0 : a); return this; }
        : function set(a, b) { fn.call(this, a === 0 ? 0 : a, b); return this; }
    );
  };
  if (typeof C != 'function' || !(IS_WEAK || proto.forEach && !fails(function () {
    new C().entries().next();
  }))) {
    // create collection constructor
    C = common.getConstructor(wrapper, NAME, IS_MAP, ADDER);
    redefineAll(C.prototype, methods);
    meta.NEED = true;
  } else {
    var instance = new C();
    // early implementations not supports chaining
    var HASNT_CHAINING = instance[ADDER](IS_WEAK ? {} : -0, 1) != instance;
    // V8 ~  Chromium 40- weak-collections throws on primitives, but should return false
    var THROWS_ON_PRIMITIVES = fails(function () { instance.has(1); });
    // most early implementations doesn't supports iterables, most modern - not close it correctly
    var ACCEPT_ITERABLES = $iterDetect(function (iter) { new C(iter); }); // eslint-disable-line no-new
    // for early implementations -0 and +0 not the same
    var BUGGY_ZERO = !IS_WEAK && fails(function () {
      // V8 ~ Chromium 42- fails only with 5+ elements
      var $instance = new C();
      var index = 5;
      while (index--) $instance[ADDER](index, index);
      return !$instance.has(-0);
    });
    if (!ACCEPT_ITERABLES) {
      C = wrapper(function (target, iterable) {
        anInstance(target, C, NAME);
        var that = inheritIfRequired(new Base(), target, C);
        if (iterable != undefined) forOf(iterable, IS_MAP, that[ADDER], that);
        return that;
      });
      C.prototype = proto;
      proto.constructor = C;
    }
    if (THROWS_ON_PRIMITIVES || BUGGY_ZERO) {
      fixMethod('delete');
      fixMethod('has');
      IS_MAP && fixMethod('get');
    }
    if (BUGGY_ZERO || HASNT_CHAINING) fixMethod(ADDER);
    // weak collections should not contains .clear method
    if (IS_WEAK && proto.clear) delete proto.clear;
  }

  setToStringTag(C, NAME);

  O[NAME] = C;
  $export($export.G + $export.W + $export.F * (C != Base), O);

  if (!IS_WEAK) common.setStrong(C, NAME, IS_MAP);

  return C;
};


/***/ }),
/* 61 */
/*!************************************************!*\
  !*** ./node_modules/core-js/modules/_typed.js ***!
  \************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(/*! ./_global */ 2);
var hide = __webpack_require__(/*! ./_hide */ 12);
var uid = __webpack_require__(/*! ./_uid */ 33);
var TYPED = uid('typed_array');
var VIEW = uid('view');
var ABV = !!(global.ArrayBuffer && global.DataView);
var CONSTR = ABV;
var i = 0;
var l = 9;
var Typed;

var TypedArrayConstructors = (
  'Int8Array,Uint8Array,Uint8ClampedArray,Int16Array,Uint16Array,Int32Array,Uint32Array,Float32Array,Float64Array'
).split(',');

while (i < l) {
  if (Typed = global[TypedArrayConstructors[i++]]) {
    hide(Typed.prototype, TYPED, true);
    hide(Typed.prototype, VIEW, true);
  } else CONSTR = false;
}

module.exports = {
  ABV: ABV,
  CONSTR: CONSTR,
  TYPED: TYPED,
  VIEW: VIEW
};


/***/ }),
/* 62 */
/*!************************************************************!*\
  !*** ./node_modules/core-js/modules/_object-forced-pam.js ***!
  \************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// Forced replacement prototype accessors methods
module.exports = __webpack_require__(/*! ./_library */ 34) || !__webpack_require__(/*! ./_fails */ 3)(function () {
  var K = Math.random();
  // In FF throws only define methods
  // eslint-disable-next-line no-undef, no-useless-call
  __defineSetter__.call(null, K, function () { /* empty */ });
  delete __webpack_require__(/*! ./_global */ 2)[K];
});


/***/ }),
/* 63 */
/*!************************************************************!*\
  !*** ./node_modules/core-js/modules/_set-collection-of.js ***!
  \************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// https://tc39.github.io/proposal-setmap-offrom/
var $export = __webpack_require__(/*! ./_export */ 0);

module.exports = function (COLLECTION) {
  $export($export.S, COLLECTION, { of: function of() {
    var length = arguments.length;
    var A = new Array(length);
    while (length--) A[length] = arguments[length];
    return new this(A);
  } });
};


/***/ }),
/* 64 */
/*!**************************************************************!*\
  !*** ./node_modules/core-js/modules/_set-collection-from.js ***!
  \**************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// https://tc39.github.io/proposal-setmap-offrom/
var $export = __webpack_require__(/*! ./_export */ 0);
var aFunction = __webpack_require__(/*! ./_a-function */ 10);
var ctx = __webpack_require__(/*! ./_ctx */ 18);
var forOf = __webpack_require__(/*! ./_for-of */ 41);

module.exports = function (COLLECTION) {
  $export($export.S, COLLECTION, { from: function from(source /* , mapFn, thisArg */) {
    var mapFn = arguments[1];
    var mapping, A, n, cb;
    aFunction(this);
    mapping = mapFn !== undefined;
    if (mapping) aFunction(mapFn);
    if (source == undefined) return new this();
    A = [];
    if (mapping) {
      n = 0;
      cb = ctx(mapFn, arguments[2], 2);
      forOf(source, false, function (nextItem) {
        A.push(cb(nextItem, n++));
      });
    } else {
      forOf(source, false, A.push, A);
    }
    return new this(A);
  } });
};


/***/ }),
/* 65 */
/*!***************************************************************!*\
  !*** ./node_modules/phaser-list-view/lib/utils/math_utils.js ***!
  \***************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var MathUtils = {
  nearestMultiple: function nearestMultiple(n, multiple) {
    return Math.round(n / multiple) * multiple;
  },

  scaleBetween: function scaleBetween(lo, hi, scale) {
    return lo + (hi - lo) * scale;
  },

  // returns a percentage between hi and lo from a given input
  // e.g percentageBetween2(7, 4, 10) -> .5
  percentageBetween2: function percentageBetween2(input, lo, hi) {
    return (input - lo) / (hi - lo);
  }
};

exports.default = MathUtils;

/***/ }),
/* 66 */
/*!***************************************************!*\
  !*** ./node_modules/phaser-list-view/lib/util.js ***!
  \***************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.parseBounds = parseBounds;
exports.getWidthOrHeight = getWidthOrHeight;
exports.capitalizeFirstLetter = capitalizeFirstLetter;
exports.findChild = findChild;
exports.detectDrag = detectDrag;
exports.dispatchClicks = dispatchClicks;

var _config = __webpack_require__(/*! ./config */ 135);

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function parseBounds(bounds) {
  bounds.x = bounds.x ? bounds.x : 0;
  bounds.y = bounds.y ? bounds.y : 0;
  if (bounds.width <= 0) {
    console.warn('PhaserListView: bounds.width <= 0');
  } else if (bounds.height <= 0) {
    console.warn('PhaserListView: bounds.height <= 0');
  }
  return bounds;
}

// prefer nominalWidth and nominalHeight
function getWidthOrHeight(displayObject, widthOrHeight) {
  return displayObject['nominal' + capitalizeFirstLetter(widthOrHeight)] || displayObject[widthOrHeight];
}

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

function findChild(children, predicate) {
  var scope = arguments.length <= 2 || arguments[2] === undefined ? null : arguments[2];

  if (!children) return false;
  for (var i = 0; i < children.length; i++) {
    var child = children[i];
    if (!child) continue;
    if (predicate.call(scope, child)) {
      return child;
    }
    var found = findChild(child.children, predicate, scope);
    if (found) {
      return found;
    }
  }
  return false;
}

function detectDrag(pointer) {
  var distanceX = Math.abs(pointer.positionDown.x - pointer.positionUp.x);
  var distanceY = Math.abs(pointer.positionDown.y - pointer.positionUp.y);
  var time = pointer.timeUp - pointer.timeDown;
  return distanceX > _config2.default.AUTO_DETECT_THRESHOLD || distanceY > _config2.default.AUTO_DETECT_THRESHOLD;
}

function dispatchClicks(pointer, clickables, type) {
  if (type == 'onInputUp' && detectDrag(pointer)) return;
  // SEARCH OBJECT UNDER POINT AS THERE IS NO CLICK PROPAGATION SUPPORT IN PHASER
  var found = findChild(clickables, function (clickable) {
    var pt = clickable.worldPosition;
    var anchor = clickable.anchor;
    var pivot = clickable.pivot;
    var width = clickable.width;
    var height = clickable.height;
    var scale = clickable.scale;

    var x = pt.x - (anchor ? anchor.x * width : 0) - pivot.x * scale.x;
    var y = pt.y - (anchor ? anchor.y * height : 0) - pivot.y * scale.y;
    // console.log('does ', x, y, clickable.width, clickable.height, ' intersect ', pointer.x, pointer.y)
    return clickable.inputEnabled && new Phaser.Rectangle(x, y, clickable.width, clickable.height).contains(pointer.x, pointer.y);
  });
  if (found && found.events && found.events[type] && found.events[type].dispatch) {
    found.events[type].dispatch(found, pointer, true);
  }
  return found;
}

/***/ }),
/* 67 */
/*!*****************************************************!*\
  !*** ./node_modules/core-js/modules/_dom-create.js ***!
  \*****************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(/*! ./_is-object */ 4);
var document = __webpack_require__(/*! ./_global */ 2).document;
// typeof document.createElement is 'object' in old IE
var is = isObject(document) && isObject(document.createElement);
module.exports = function (it) {
  return is ? document.createElement(it) : {};
};


/***/ }),
/* 68 */
/*!*****************************************************!*\
  !*** ./node_modules/core-js/modules/_wks-define.js ***!
  \*****************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(/*! ./_global */ 2);
var core = __webpack_require__(/*! ./_core */ 21);
var LIBRARY = __webpack_require__(/*! ./_library */ 34);
var wksExt = __webpack_require__(/*! ./_wks-ext */ 98);
var defineProperty = __webpack_require__(/*! ./_object-dp */ 7).f;
module.exports = function (name) {
  var $Symbol = core.Symbol || (core.Symbol = LIBRARY ? {} : global.Symbol || {});
  if (name.charAt(0) != '_' && !(name in $Symbol)) defineProperty($Symbol, name, { value: wksExt.f(name) });
};


/***/ }),
/* 69 */
/*!*****************************************************!*\
  !*** ./node_modules/core-js/modules/_shared-key.js ***!
  \*****************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

var shared = __webpack_require__(/*! ./_shared */ 51)('keys');
var uid = __webpack_require__(/*! ./_uid */ 33);
module.exports = function (key) {
  return shared[key] || (shared[key] = uid(key));
};


/***/ }),
/* 70 */
/*!********************************************************!*\
  !*** ./node_modules/core-js/modules/_enum-bug-keys.js ***!
  \********************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports) {

// IE 8- don't enum bug keys
module.exports = (
  'constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf'
).split(',');


/***/ }),
/* 71 */
/*!***********************************************!*\
  !*** ./node_modules/core-js/modules/_html.js ***!
  \***********************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

var document = __webpack_require__(/*! ./_global */ 2).document;
module.exports = document && document.documentElement;


/***/ }),
/* 72 */
/*!****************************************************!*\
  !*** ./node_modules/core-js/modules/_set-proto.js ***!
  \****************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// Works with __proto__ only. Old v8 can't work with null proto objects.
/* eslint-disable no-proto */
var isObject = __webpack_require__(/*! ./_is-object */ 4);
var anObject = __webpack_require__(/*! ./_an-object */ 1);
var check = function (O, proto) {
  anObject(O);
  if (!isObject(proto) && proto !== null) throw TypeError(proto + ": can't set as prototype!");
};
module.exports = {
  set: Object.setPrototypeOf || ('__proto__' in {} ? // eslint-disable-line
    function (test, buggy, set) {
      try {
        set = __webpack_require__(/*! ./_ctx */ 18)(Function.call, __webpack_require__(/*! ./_object-gopd */ 16).f(Object.prototype, '__proto__').set, 2);
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
/* 73 */
/*!****************************************************!*\
  !*** ./node_modules/core-js/modules/_string-ws.js ***!
  \****************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports) {

module.exports = '\x09\x0A\x0B\x0C\x0D\x20\xA0\u1680\u180E\u2000\u2001\u2002\u2003' +
  '\u2004\u2005\u2006\u2007\u2008\u2009\u200A\u202F\u205F\u3000\u2028\u2029\uFEFF';


/***/ }),
/* 74 */
/*!**************************************************************!*\
  !*** ./node_modules/core-js/modules/_inherit-if-required.js ***!
  \**************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(/*! ./_is-object */ 4);
var setPrototypeOf = __webpack_require__(/*! ./_set-proto */ 72).set;
module.exports = function (that, target, C) {
  var S = target.constructor;
  var P;
  if (S !== C && typeof S == 'function' && (P = S.prototype) !== C.prototype && isObject(P) && setPrototypeOf) {
    setPrototypeOf(that, P);
  } return that;
};


/***/ }),
/* 75 */
/*!********************************************************!*\
  !*** ./node_modules/core-js/modules/_string-repeat.js ***!
  \********************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var toInteger = __webpack_require__(/*! ./_to-integer */ 24);
var defined = __webpack_require__(/*! ./_defined */ 23);

module.exports = function repeat(count) {
  var str = String(defined(this));
  var res = '';
  var n = toInteger(count);
  if (n < 0 || n == Infinity) throw RangeError("Count can't be negative");
  for (;n > 0; (n >>>= 1) && (str += str)) if (n & 1) res += str;
  return res;
};


/***/ }),
/* 76 */
/*!****************************************************!*\
  !*** ./node_modules/core-js/modules/_math-sign.js ***!
  \****************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports) {

// 20.2.2.28 Math.sign(x)
module.exports = Math.sign || function sign(x) {
  // eslint-disable-next-line no-self-compare
  return (x = +x) == 0 || x != x ? x : x < 0 ? -1 : 1;
};


/***/ }),
/* 77 */
/*!*****************************************************!*\
  !*** ./node_modules/core-js/modules/_math-expm1.js ***!
  \*****************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports) {

// 20.2.2.14 Math.expm1(x)
var $expm1 = Math.expm1;
module.exports = (!$expm1
  // Old FF bug
  || $expm1(10) > 22025.465794806719 || $expm1(10) < 22025.4657948067165168
  // Tor Browser bug
  || $expm1(-2e-17) != -2e-17
) ? function expm1(x) {
  return (x = +x) == 0 ? x : x > -1e-6 && x < 1e-6 ? x + x * x / 2 : Math.exp(x) - 1;
} : $expm1;


/***/ }),
/* 78 */
/*!****************************************************!*\
  !*** ./node_modules/core-js/modules/_string-at.js ***!
  \****************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

var toInteger = __webpack_require__(/*! ./_to-integer */ 24);
var defined = __webpack_require__(/*! ./_defined */ 23);
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
/* 79 */
/*!******************************************************!*\
  !*** ./node_modules/core-js/modules/_iter-define.js ***!
  \******************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var LIBRARY = __webpack_require__(/*! ./_library */ 34);
var $export = __webpack_require__(/*! ./_export */ 0);
var redefine = __webpack_require__(/*! ./_redefine */ 13);
var hide = __webpack_require__(/*! ./_hide */ 12);
var has = __webpack_require__(/*! ./_has */ 11);
var Iterators = __webpack_require__(/*! ./_iterators */ 45);
var $iterCreate = __webpack_require__(/*! ./_iter-create */ 80);
var setToStringTag = __webpack_require__(/*! ./_set-to-string-tag */ 43);
var getPrototypeOf = __webpack_require__(/*! ./_object-gpo */ 17);
var ITERATOR = __webpack_require__(/*! ./_wks */ 5)('iterator');
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
  var $default = (!BUGGY && $native) || getMethod(DEFAULT);
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
/* 80 */
/*!******************************************************!*\
  !*** ./node_modules/core-js/modules/_iter-create.js ***!
  \******************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var create = __webpack_require__(/*! ./_object-create */ 37);
var descriptor = __webpack_require__(/*! ./_property-desc */ 32);
var setToStringTag = __webpack_require__(/*! ./_set-to-string-tag */ 43);
var IteratorPrototype = {};

// 25.1.2.1.1 %IteratorPrototype%[@@iterator]()
__webpack_require__(/*! ./_hide */ 12)(IteratorPrototype, __webpack_require__(/*! ./_wks */ 5)('iterator'), function () { return this; });

module.exports = function (Constructor, NAME, next) {
  Constructor.prototype = create(IteratorPrototype, { next: descriptor(1, next) });
  setToStringTag(Constructor, NAME + ' Iterator');
};


/***/ }),
/* 81 */
/*!*********************************************************!*\
  !*** ./node_modules/core-js/modules/_string-context.js ***!
  \*********************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// helper for String#{startsWith, endsWith, includes}
var isRegExp = __webpack_require__(/*! ./_is-regexp */ 55);
var defined = __webpack_require__(/*! ./_defined */ 23);

module.exports = function (that, searchString, NAME) {
  if (isRegExp(searchString)) throw TypeError('String#' + NAME + " doesn't accept regex!");
  return String(defined(that));
};


/***/ }),
/* 82 */
/*!**********************************************************!*\
  !*** ./node_modules/core-js/modules/_fails-is-regexp.js ***!
  \**********************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

var MATCH = __webpack_require__(/*! ./_wks */ 5)('match');
module.exports = function (KEY) {
  var re = /./;
  try {
    '/./'[KEY](re);
  } catch (e) {
    try {
      re[MATCH] = false;
      return !'/./'[KEY](re);
    } catch (f) { /* empty */ }
  } return true;
};


/***/ }),
/* 83 */
/*!********************************************************!*\
  !*** ./node_modules/core-js/modules/_is-array-iter.js ***!
  \********************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// check on default Array iterator
var Iterators = __webpack_require__(/*! ./_iterators */ 45);
var ITERATOR = __webpack_require__(/*! ./_wks */ 5)('iterator');
var ArrayProto = Array.prototype;

module.exports = function (it) {
  return it !== undefined && (Iterators.Array === it || ArrayProto[ITERATOR] === it);
};


/***/ }),
/* 84 */
/*!**********************************************************!*\
  !*** ./node_modules/core-js/modules/_create-property.js ***!
  \**********************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $defineProperty = __webpack_require__(/*! ./_object-dp */ 7);
var createDesc = __webpack_require__(/*! ./_property-desc */ 32);

module.exports = function (object, index, value) {
  if (index in object) $defineProperty.f(object, index, createDesc(0, value));
  else object[index] = value;
};


/***/ }),
/* 85 */
/*!******************************************************************!*\
  !*** ./node_modules/core-js/modules/core.get-iterator-method.js ***!
  \******************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

var classof = __webpack_require__(/*! ./_classof */ 50);
var ITERATOR = __webpack_require__(/*! ./_wks */ 5)('iterator');
var Iterators = __webpack_require__(/*! ./_iterators */ 45);
module.exports = __webpack_require__(/*! ./_core */ 21).getIteratorMethod = function (it) {
  if (it != undefined) return it[ITERATOR]
    || it['@@iterator']
    || Iterators[classof(it)];
};


/***/ }),
/* 86 */
/*!***************************************************************!*\
  !*** ./node_modules/core-js/modules/_array-species-create.js ***!
  \***************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// 9.4.2.3 ArraySpeciesCreate(originalArray, length)
var speciesConstructor = __webpack_require__(/*! ./_array-species-constructor */ 232);

module.exports = function (original, length) {
  return new (speciesConstructor(original))(length);
};


/***/ }),
/* 87 */
/*!*****************************************************!*\
  !*** ./node_modules/core-js/modules/_array-fill.js ***!
  \*****************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// 22.1.3.6 Array.prototype.fill(value, start = 0, end = this.length)

var toObject = __webpack_require__(/*! ./_to-object */ 9);
var toAbsoluteIndex = __webpack_require__(/*! ./_to-absolute-index */ 36);
var toLength = __webpack_require__(/*! ./_to-length */ 8);
module.exports = function fill(value /* , start = 0, end = @length */) {
  var O = toObject(this);
  var length = toLength(O.length);
  var aLen = arguments.length;
  var index = toAbsoluteIndex(aLen > 1 ? arguments[1] : undefined, length);
  var end = aLen > 2 ? arguments[2] : undefined;
  var endPos = end === undefined ? length : toAbsoluteIndex(end, length);
  while (endPos > index) O[index++] = value;
  return O;
};


/***/ }),
/* 88 */
/*!************************************************************!*\
  !*** ./node_modules/core-js/modules/es6.array.iterator.js ***!
  \************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var addToUnscopables = __webpack_require__(/*! ./_add-to-unscopables */ 31);
var step = __webpack_require__(/*! ./_iter-step */ 114);
var Iterators = __webpack_require__(/*! ./_iterators */ 45);
var toIObject = __webpack_require__(/*! ./_to-iobject */ 15);

// 22.1.3.4 Array.prototype.entries()
// 22.1.3.13 Array.prototype.keys()
// 22.1.3.29 Array.prototype.values()
// 22.1.3.30 Array.prototype[@@iterator]()
module.exports = __webpack_require__(/*! ./_iter-define */ 79)(Array, 'Array', function (iterated, kind) {
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
/* 89 */
/*!***********************************************!*\
  !*** ./node_modules/core-js/modules/_task.js ***!
  \***********************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

var ctx = __webpack_require__(/*! ./_ctx */ 18);
var invoke = __webpack_require__(/*! ./_invoke */ 104);
var html = __webpack_require__(/*! ./_html */ 71);
var cel = __webpack_require__(/*! ./_dom-create */ 67);
var global = __webpack_require__(/*! ./_global */ 2);
var process = global.process;
var setTask = global.setImmediate;
var clearTask = global.clearImmediate;
var MessageChannel = global.MessageChannel;
var Dispatch = global.Dispatch;
var counter = 0;
var queue = {};
var ONREADYSTATECHANGE = 'onreadystatechange';
var defer, channel, port;
var run = function () {
  var id = +this;
  // eslint-disable-next-line no-prototype-builtins
  if (queue.hasOwnProperty(id)) {
    var fn = queue[id];
    delete queue[id];
    fn();
  }
};
var listener = function (event) {
  run.call(event.data);
};
// Node.js 0.9+ & IE10+ has setImmediate, otherwise:
if (!setTask || !clearTask) {
  setTask = function setImmediate(fn) {
    var args = [];
    var i = 1;
    while (arguments.length > i) args.push(arguments[i++]);
    queue[++counter] = function () {
      // eslint-disable-next-line no-new-func
      invoke(typeof fn == 'function' ? fn : Function(fn), args);
    };
    defer(counter);
    return counter;
  };
  clearTask = function clearImmediate(id) {
    delete queue[id];
  };
  // Node.js 0.8-
  if (__webpack_require__(/*! ./_cof */ 19)(process) == 'process') {
    defer = function (id) {
      process.nextTick(ctx(run, id, 1));
    };
  // Sphere (JS game engine) Dispatch API
  } else if (Dispatch && Dispatch.now) {
    defer = function (id) {
      Dispatch.now(ctx(run, id, 1));
    };
  // Browsers with MessageChannel, includes WebWorkers
  } else if (MessageChannel) {
    channel = new MessageChannel();
    port = channel.port2;
    channel.port1.onmessage = listener;
    defer = ctx(port.postMessage, port, 1);
  // Browsers with postMessage, skip WebWorkers
  // IE8 has postMessage, but it's sync & typeof its postMessage is 'object'
  } else if (global.addEventListener && typeof postMessage == 'function' && !global.importScripts) {
    defer = function (id) {
      global.postMessage(id + '', '*');
    };
    global.addEventListener('message', listener, false);
  // IE8-
  } else if (ONREADYSTATECHANGE in cel('script')) {
    defer = function (id) {
      html.appendChild(cel('script'))[ONREADYSTATECHANGE] = function () {
        html.removeChild(this);
        run.call(id);
      };
    };
  // Rest old browsers
  } else {
    defer = function (id) {
      setTimeout(ctx(run, id, 1), 0);
    };
  }
}
module.exports = {
  set: setTask,
  clear: clearTask
};


/***/ }),
/* 90 */
/*!****************************************************!*\
  !*** ./node_modules/core-js/modules/_microtask.js ***!
  \****************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(/*! ./_global */ 2);
var macrotask = __webpack_require__(/*! ./_task */ 89).set;
var Observer = global.MutationObserver || global.WebKitMutationObserver;
var process = global.process;
var Promise = global.Promise;
var isNode = __webpack_require__(/*! ./_cof */ 19)(process) == 'process';

module.exports = function () {
  var head, last, notify;

  var flush = function () {
    var parent, fn;
    if (isNode && (parent = process.domain)) parent.exit();
    while (head) {
      fn = head.fn;
      head = head.next;
      try {
        fn();
      } catch (e) {
        if (head) notify();
        else last = undefined;
        throw e;
      }
    } last = undefined;
    if (parent) parent.enter();
  };

  // Node.js
  if (isNode) {
    notify = function () {
      process.nextTick(flush);
    };
  // browsers with MutationObserver, except iOS Safari - https://github.com/zloirock/core-js/issues/339
  } else if (Observer && !(global.navigator && global.navigator.standalone)) {
    var toggle = true;
    var node = document.createTextNode('');
    new Observer(flush).observe(node, { characterData: true }); // eslint-disable-line no-new
    notify = function () {
      node.data = toggle = !toggle;
    };
  // environments with maybe non-completely correct, but existent Promise
  } else if (Promise && Promise.resolve) {
    var promise = Promise.resolve();
    notify = function () {
      promise.then(flush);
    };
  // for other environments - macrotask based on:
  // - setImmediate
  // - MessageChannel
  // - window.postMessag
  // - onreadystatechange
  // - setTimeout
  } else {
    notify = function () {
      // strange IE + webpack dev server bug - use .call(global)
      macrotask.call(global, flush);
    };
  }

  return function (fn) {
    var task = { fn: fn, next: undefined };
    if (last) last.next = task;
    if (!head) {
      head = task;
      notify();
    } last = task;
  };
};


/***/ }),
/* 91 */
/*!*****************************************************************!*\
  !*** ./node_modules/core-js/modules/_new-promise-capability.js ***!
  \*****************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// 25.4.1.5 NewPromiseCapability(C)
var aFunction = __webpack_require__(/*! ./_a-function */ 10);

function PromiseCapability(C) {
  var resolve, reject;
  this.promise = new C(function ($$resolve, $$reject) {
    if (resolve !== undefined || reject !== undefined) throw TypeError('Bad Promise constructor');
    resolve = $$resolve;
    reject = $$reject;
  });
  this.resolve = aFunction(resolve);
  this.reject = aFunction(reject);
}

module.exports.f = function (C) {
  return new PromiseCapability(C);
};


/***/ }),
/* 92 */
/*!*******************************************************!*\
  !*** ./node_modules/core-js/modules/_typed-buffer.js ***!
  \*******************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var global = __webpack_require__(/*! ./_global */ 2);
var DESCRIPTORS = __webpack_require__(/*! ./_descriptors */ 6);
var LIBRARY = __webpack_require__(/*! ./_library */ 34);
var $typed = __webpack_require__(/*! ./_typed */ 61);
var hide = __webpack_require__(/*! ./_hide */ 12);
var redefineAll = __webpack_require__(/*! ./_redefine-all */ 42);
var fails = __webpack_require__(/*! ./_fails */ 3);
var anInstance = __webpack_require__(/*! ./_an-instance */ 40);
var toInteger = __webpack_require__(/*! ./_to-integer */ 24);
var toLength = __webpack_require__(/*! ./_to-length */ 8);
var toIndex = __webpack_require__(/*! ./_to-index */ 123);
var gOPN = __webpack_require__(/*! ./_object-gopn */ 38).f;
var dP = __webpack_require__(/*! ./_object-dp */ 7).f;
var arrayFill = __webpack_require__(/*! ./_array-fill */ 87);
var setToStringTag = __webpack_require__(/*! ./_set-to-string-tag */ 43);
var ARRAY_BUFFER = 'ArrayBuffer';
var DATA_VIEW = 'DataView';
var PROTOTYPE = 'prototype';
var WRONG_LENGTH = 'Wrong length!';
var WRONG_INDEX = 'Wrong index!';
var $ArrayBuffer = global[ARRAY_BUFFER];
var $DataView = global[DATA_VIEW];
var Math = global.Math;
var RangeError = global.RangeError;
// eslint-disable-next-line no-shadow-restricted-names
var Infinity = global.Infinity;
var BaseBuffer = $ArrayBuffer;
var abs = Math.abs;
var pow = Math.pow;
var floor = Math.floor;
var log = Math.log;
var LN2 = Math.LN2;
var BUFFER = 'buffer';
var BYTE_LENGTH = 'byteLength';
var BYTE_OFFSET = 'byteOffset';
var $BUFFER = DESCRIPTORS ? '_b' : BUFFER;
var $LENGTH = DESCRIPTORS ? '_l' : BYTE_LENGTH;
var $OFFSET = DESCRIPTORS ? '_o' : BYTE_OFFSET;

// IEEE754 conversions based on https://github.com/feross/ieee754
function packIEEE754(value, mLen, nBytes) {
  var buffer = new Array(nBytes);
  var eLen = nBytes * 8 - mLen - 1;
  var eMax = (1 << eLen) - 1;
  var eBias = eMax >> 1;
  var rt = mLen === 23 ? pow(2, -24) - pow(2, -77) : 0;
  var i = 0;
  var s = value < 0 || value === 0 && 1 / value < 0 ? 1 : 0;
  var e, m, c;
  value = abs(value);
  // eslint-disable-next-line no-self-compare
  if (value != value || value === Infinity) {
    // eslint-disable-next-line no-self-compare
    m = value != value ? 1 : 0;
    e = eMax;
  } else {
    e = floor(log(value) / LN2);
    if (value * (c = pow(2, -e)) < 1) {
      e--;
      c *= 2;
    }
    if (e + eBias >= 1) {
      value += rt / c;
    } else {
      value += rt * pow(2, 1 - eBias);
    }
    if (value * c >= 2) {
      e++;
      c /= 2;
    }
    if (e + eBias >= eMax) {
      m = 0;
      e = eMax;
    } else if (e + eBias >= 1) {
      m = (value * c - 1) * pow(2, mLen);
      e = e + eBias;
    } else {
      m = value * pow(2, eBias - 1) * pow(2, mLen);
      e = 0;
    }
  }
  for (; mLen >= 8; buffer[i++] = m & 255, m /= 256, mLen -= 8);
  e = e << mLen | m;
  eLen += mLen;
  for (; eLen > 0; buffer[i++] = e & 255, e /= 256, eLen -= 8);
  buffer[--i] |= s * 128;
  return buffer;
}
function unpackIEEE754(buffer, mLen, nBytes) {
  var eLen = nBytes * 8 - mLen - 1;
  var eMax = (1 << eLen) - 1;
  var eBias = eMax >> 1;
  var nBits = eLen - 7;
  var i = nBytes - 1;
  var s = buffer[i--];
  var e = s & 127;
  var m;
  s >>= 7;
  for (; nBits > 0; e = e * 256 + buffer[i], i--, nBits -= 8);
  m = e & (1 << -nBits) - 1;
  e >>= -nBits;
  nBits += mLen;
  for (; nBits > 0; m = m * 256 + buffer[i], i--, nBits -= 8);
  if (e === 0) {
    e = 1 - eBias;
  } else if (e === eMax) {
    return m ? NaN : s ? -Infinity : Infinity;
  } else {
    m = m + pow(2, mLen);
    e = e - eBias;
  } return (s ? -1 : 1) * m * pow(2, e - mLen);
}

function unpackI32(bytes) {
  return bytes[3] << 24 | bytes[2] << 16 | bytes[1] << 8 | bytes[0];
}
function packI8(it) {
  return [it & 0xff];
}
function packI16(it) {
  return [it & 0xff, it >> 8 & 0xff];
}
function packI32(it) {
  return [it & 0xff, it >> 8 & 0xff, it >> 16 & 0xff, it >> 24 & 0xff];
}
function packF64(it) {
  return packIEEE754(it, 52, 8);
}
function packF32(it) {
  return packIEEE754(it, 23, 4);
}

function addGetter(C, key, internal) {
  dP(C[PROTOTYPE], key, { get: function () { return this[internal]; } });
}

function get(view, bytes, index, isLittleEndian) {
  var numIndex = +index;
  var intIndex = toIndex(numIndex);
  if (intIndex + bytes > view[$LENGTH]) throw RangeError(WRONG_INDEX);
  var store = view[$BUFFER]._b;
  var start = intIndex + view[$OFFSET];
  var pack = store.slice(start, start + bytes);
  return isLittleEndian ? pack : pack.reverse();
}
function set(view, bytes, index, conversion, value, isLittleEndian) {
  var numIndex = +index;
  var intIndex = toIndex(numIndex);
  if (intIndex + bytes > view[$LENGTH]) throw RangeError(WRONG_INDEX);
  var store = view[$BUFFER]._b;
  var start = intIndex + view[$OFFSET];
  var pack = conversion(+value);
  for (var i = 0; i < bytes; i++) store[start + i] = pack[isLittleEndian ? i : bytes - i - 1];
}

if (!$typed.ABV) {
  $ArrayBuffer = function ArrayBuffer(length) {
    anInstance(this, $ArrayBuffer, ARRAY_BUFFER);
    var byteLength = toIndex(length);
    this._b = arrayFill.call(new Array(byteLength), 0);
    this[$LENGTH] = byteLength;
  };

  $DataView = function DataView(buffer, byteOffset, byteLength) {
    anInstance(this, $DataView, DATA_VIEW);
    anInstance(buffer, $ArrayBuffer, DATA_VIEW);
    var bufferLength = buffer[$LENGTH];
    var offset = toInteger(byteOffset);
    if (offset < 0 || offset > bufferLength) throw RangeError('Wrong offset!');
    byteLength = byteLength === undefined ? bufferLength - offset : toLength(byteLength);
    if (offset + byteLength > bufferLength) throw RangeError(WRONG_LENGTH);
    this[$BUFFER] = buffer;
    this[$OFFSET] = offset;
    this[$LENGTH] = byteLength;
  };

  if (DESCRIPTORS) {
    addGetter($ArrayBuffer, BYTE_LENGTH, '_l');
    addGetter($DataView, BUFFER, '_b');
    addGetter($DataView, BYTE_LENGTH, '_l');
    addGetter($DataView, BYTE_OFFSET, '_o');
  }

  redefineAll($DataView[PROTOTYPE], {
    getInt8: function getInt8(byteOffset) {
      return get(this, 1, byteOffset)[0] << 24 >> 24;
    },
    getUint8: function getUint8(byteOffset) {
      return get(this, 1, byteOffset)[0];
    },
    getInt16: function getInt16(byteOffset /* , littleEndian */) {
      var bytes = get(this, 2, byteOffset, arguments[1]);
      return (bytes[1] << 8 | bytes[0]) << 16 >> 16;
    },
    getUint16: function getUint16(byteOffset /* , littleEndian */) {
      var bytes = get(this, 2, byteOffset, arguments[1]);
      return bytes[1] << 8 | bytes[0];
    },
    getInt32: function getInt32(byteOffset /* , littleEndian */) {
      return unpackI32(get(this, 4, byteOffset, arguments[1]));
    },
    getUint32: function getUint32(byteOffset /* , littleEndian */) {
      return unpackI32(get(this, 4, byteOffset, arguments[1])) >>> 0;
    },
    getFloat32: function getFloat32(byteOffset /* , littleEndian */) {
      return unpackIEEE754(get(this, 4, byteOffset, arguments[1]), 23, 4);
    },
    getFloat64: function getFloat64(byteOffset /* , littleEndian */) {
      return unpackIEEE754(get(this, 8, byteOffset, arguments[1]), 52, 8);
    },
    setInt8: function setInt8(byteOffset, value) {
      set(this, 1, byteOffset, packI8, value);
    },
    setUint8: function setUint8(byteOffset, value) {
      set(this, 1, byteOffset, packI8, value);
    },
    setInt16: function setInt16(byteOffset, value /* , littleEndian */) {
      set(this, 2, byteOffset, packI16, value, arguments[2]);
    },
    setUint16: function setUint16(byteOffset, value /* , littleEndian */) {
      set(this, 2, byteOffset, packI16, value, arguments[2]);
    },
    setInt32: function setInt32(byteOffset, value /* , littleEndian */) {
      set(this, 4, byteOffset, packI32, value, arguments[2]);
    },
    setUint32: function setUint32(byteOffset, value /* , littleEndian */) {
      set(this, 4, byteOffset, packI32, value, arguments[2]);
    },
    setFloat32: function setFloat32(byteOffset, value /* , littleEndian */) {
      set(this, 4, byteOffset, packF32, value, arguments[2]);
    },
    setFloat64: function setFloat64(byteOffset, value /* , littleEndian */) {
      set(this, 8, byteOffset, packF64, value, arguments[2]);
    }
  });
} else {
  if (!fails(function () {
    $ArrayBuffer(1);
  }) || !fails(function () {
    new $ArrayBuffer(-1); // eslint-disable-line no-new
  }) || fails(function () {
    new $ArrayBuffer(); // eslint-disable-line no-new
    new $ArrayBuffer(1.5); // eslint-disable-line no-new
    new $ArrayBuffer(NaN); // eslint-disable-line no-new
    return $ArrayBuffer.name != ARRAY_BUFFER;
  })) {
    $ArrayBuffer = function ArrayBuffer(length) {
      anInstance(this, $ArrayBuffer);
      return new BaseBuffer(toIndex(length));
    };
    var ArrayBufferProto = $ArrayBuffer[PROTOTYPE] = BaseBuffer[PROTOTYPE];
    for (var keys = gOPN(BaseBuffer), j = 0, key; keys.length > j;) {
      if (!((key = keys[j++]) in $ArrayBuffer)) hide($ArrayBuffer, key, BaseBuffer[key]);
    }
    if (!LIBRARY) ArrayBufferProto.constructor = $ArrayBuffer;
  }
  // iOS Safari 7.x bug
  var view = new $DataView(new $ArrayBuffer(2));
  var $setInt8 = $DataView[PROTOTYPE].setInt8;
  view.setInt8(0, 2147483648);
  view.setInt8(1, 2147483649);
  if (view.getInt8(0) || !view.getInt8(1)) redefineAll($DataView[PROTOTYPE], {
    setInt8: function setInt8(byteOffset, value) {
      $setInt8.call(this, byteOffset, value << 24 >> 24);
    },
    setUint8: function setUint8(byteOffset, value) {
      $setInt8.call(this, byteOffset, value << 24 >> 24);
    }
  }, true);
}
setToStringTag($ArrayBuffer, ARRAY_BUFFER);
setToStringTag($DataView, DATA_VIEW);
hide($DataView[PROTOTYPE], $typed.VIEW, true);
exports[ARRAY_BUFFER] = $ArrayBuffer;
exports[DATA_VIEW] = $DataView;


/***/ }),
/* 93 */
/*!*****************************************************!*\
  !*** ./node_modules/core-js/modules/_user-agent.js ***!
  \*****************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(/*! ./_global */ 2);
var navigator = global.navigator;

module.exports = navigator && navigator.userAgent || '';


/***/ }),
/* 94 */
/*!***********************!*\
  !*** ./src/config.js ***!
  \***********************/
/*! exports provided: default */
/*! exports used: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony default export */ __webpack_exports__["a"] = ({
    gameWidth: window.innerWidth,
    gameHeight: window.innerHeight,
    scoreRecord: 0,
    facebookID: '152735522079067',
    localStorageName: 'familytree',
    webfonts: ['Roboto'],
    width: 360, /* stage width in pixels */
    height: 360, /* stage height in pixels */
    camWidth: 640,
    camHeight: 480,
    backgroundColor: 0x4488cc
});

/***/ }),
/* 95 */
/*!**********************************!*\
  !*** ./src/language/language.js ***!
  \**********************************/
/*! exports provided: default */
/*! exports used: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony default export */ __webpack_exports__["a"] = ({
    // ID / PLAIN TEXT 
    start: 'START',
    you: 'YOU',
    grandmother: 'GRAND-MOTHER',
    grandfather: 'GRAND-FATHER',
    grandgrandmother: 'GRAND-GRANDMOTHER',
    grandgrandfather: 'GRAND-GRANDFATHER',
    mother: 'MOTHER',
    father: 'FATHER',
    stepmother: 'STEP-MOTHER',
    stepfather: 'STEP-FATHER',
    uncle: 'UNCLE',
    aunt: 'AUNT',
    brother: 'BROTHER',
    sister: 'SISTER',
    sibling: 'SIBLING',
    stepbrother: 'STEP-BROTHER',
    stepsister: 'STEP-SISTER',
    cousin: 'COUSIN',
    son: 'SON',
    daughter: 'DAUGHTER',
    parents: 'ADD PARENT',
    brothers: 'ADD BROTHER/SISTER',
    stepparents: 'ADD STEP PARENT',
    stepbrothers: 'ADD STEP BROTHER/SISTER',
    children: 'ADD CHILD',
    download: 'DOWNLOAD',
    share: 'SHARE ON FACEBOOK',
    boy: 'BOY',
    girl: 'GIRL',
    grandDaughter: 'GRAND DAUGHTER',
    grandSon: 'GRAND SON'
});

/***/ }),
/* 96 */
/*!*******************************************************!*\
  !*** ./node_modules/phaser-list-view/lib/scroller.js ***!
  \*******************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _math_utils = __webpack_require__(/*! ./utils/math_utils */ 65);

var _math_utils2 = _interopRequireDefault(_math_utils);

var _util = __webpack_require__(/*! ./util */ 66);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var _ptHelper = new Phaser.Point();

var defaultOptions = {
  from: 0,
  to: 200,
  direction: 'y',
  momentum: false,
  snapping: false,
  bouncing: false,
  deceleration: 0.5, // value between 0 and 1
  overflow: 20,
  snapStep: 10,
  emitMoving: false,
  duration: 2, // (s) duration of the inertial scrolling simulation.
  speedLimit: 3, // set maximum speed. Higher values will allow faster scroll (which comes down to a bigger offset for the duration of the momentum scroll) note: touch motion determines actual speed, this is just a limit.
  flickTimeThreshold: 100, // (ms) determines if a flick occurred: time between last updated movement @ touchmove and time @ touchend, if smaller than this value, trigger inertial scrolling
  offsetThreshold: 30, // (pixels) determines if calculated offset is above this threshold
  acceleration: 0.5, // increase the multiplier by this value, each time the user swipes again when still scrolling. The multiplier is used to multiply the offset. Set to 0 to disable.
  accelerationT: 250, // (ms) time between successive swipes that determines if the multiplier is increased (if lower than this value)
  maxAcceleration: 4,
  time: {}, // contains timestamps of the most recent down, up, and move events
  multiplier: 1, //acceleration multiplier, don't edit here
  swipeEnabled: false,
  swipeThreshold: 5, // (pixels) must move this many pixels for a swipe action
  swipeTimeThreshold: 250, // (ms) determines if a swipe occurred: time between last updated movement @ touchmove and time @ touchend, if smaller than this value, trigger swipe
  minDuration: 0.5,
  addListeners: true
};

// Pure logic scroller
// Originally adapted from http://yusyuslabs.com/tutorial-momentum-scrolling-inside-scrollable-area-with-phaser-js/
//

var Scroller = function () {
  function Scroller(game, clickObject) {
    var maskLimits = arguments.length <= 2 || arguments[2] === undefined ? {} : arguments[2];
    var options = arguments.length <= 3 || arguments[3] === undefined ? {} : arguments[3];

    _classCallCheck(this, Scroller);

    this.game = game;
    this.clickObject = clickObject;

    this.maskLimits = maskLimits;

    this.o = this.options = Object.assign({}, defaultOptions, options);

    this._updateMinMax();

    this.dispatchValues = { step: 0, total: 0, percent: 0 };

    this.addListeners();

    this.clickables = [];

    this.isDown = false; // isDown is true when the down event has fired but the up event has not
    this.isScrolling = false; // isScrolling is true when the down event has fired but the complete event has not

    this.scrollObject = {};

    this.init();

    this.tweenScroll = this.game.add.tween(this.scrollObject).to({}, 0, Phaser.Easing.Quartic.Out);
    this.tweenScroll.onUpdateCallback(this.handleUpdate, this);
    this.tweenScroll.onComplete.add(this.handleComplete, this);
  }

  _createClass(Scroller, [{
    key: 'destroy',
    value: function destroy() {
      this.tweenScroll.stop();
      this.removeListeners();
      this.clickObject.destroy();
      this.clickables = null;
      this.options = this.o = null;
      this.maskLimits = null;
      this.enabled = false;
      this.game = null;
      this.dispatchValues = null;
      this.isDown = null;
      this.target = null;
      this.destroyed = true;
    }
  }, {
    key: 'addListeners',
    value: function addListeners() {
      this.events = {
        onUpdate: new Phaser.Signal(),
        onInputUp: new Phaser.Signal(),
        onInputDown: new Phaser.Signal(),
        onInputMove: new Phaser.Signal(),
        onComplete: new Phaser.Signal(),
        onSwipe: new Phaser.Signal()
      };

      if (this.o.addListeners) {
        this.clickObject.inputEnabled = true;
        this.clickObject.events.onInputDown.add(this.handleDown, this);
        this.clickObject.events.onInputUp.add(this.handleUp, this);
      }
    }
  }, {
    key: 'removeListeners',
    value: function removeListeners() {
      if (this.o.addListeners) {
        this.clickObject.events.onInputDown.remove(this.handleDown, this);
        this.clickObject.events.onInputUp.remove(this.handleUp, this);
      }

      for (var property in this.events) {
        if (this.events.hasOwnProperty(property)) {
          this.events[property].dispose();
        }
      }
    }
  }, {
    key: 'enable',
    value: function enable() {
      this.enabled = true;
    }
  }, {
    key: 'disable',
    value: function disable() {
      this.enabled = false;
    }
  }, {
    key: 'init',
    value: function init() {
      this.scrollObject[this.o.direction] = this.o.from;
      this.maxOffset = this.maskLimits[this.o.direction] * this.o.speedLimit;
      this.enable();
    }
  }, {
    key: 'reset',
    value: function reset() {
      this.tweenScroll.pause();
      this.o.multiplier = 1;
      this.init();
    }
  }, {
    key: 'setFromTo',
    value: function setFromTo(_from, _to) {
      this.o.from = _from;
      this.o.to = _to;
      this._updateMinMax();
    }
  }, {
    key: 'isTweening',
    value: function isTweening() {
      return this.tweenScroll.isRunning;
    }
  }, {
    key: 'registerClickables',
    value: function registerClickables(clickables) {
      this.clickables = clickables;
    }
  }, {
    key: 'handleDown',
    value: function handleDown(target, pointer) {
      if (!this.enabled) return;
      this.isDown = true;
      // console.log('input down', pointer.y)
      this.target = this.requested = this.scrollObject[this.o.direction];
      this.o.time.down = pointer.timeDown;

      if (this.o.addListeners) this.game.input.addMoveCallback(this.handleMove, this);

      //check if block is currently scrolling and set multiplier
      if (this.isTweening() && this.o.time.down - this.o.time.up < this.o.accelerationT) {
        //swipe while animation was happening, increase multiplier
        this.o.multiplier += this.o.acceleration;
        // console.log('swipe while animation is happening', this.o.multiplier)
      } else {
        //reset
        this.o.multiplier = 1;
      }

      //stop tween for touch-to-stop
      this.tweenScroll.stop();
      this.tweenScroll.pendingDelete = false;

      (0, _util.dispatchClicks)(pointer, this.clickables, 'onInputDown');
      this.events.onInputDown.dispatch(target, pointer);
    }
  }, {
    key: 'handleMove',
    value: function handleMove(pointer, x, y) {
      if (!this.enabled) return;
      this.isScrolling = true;
      _ptHelper.set(x, y);
      this.diff = this.old - _ptHelper[this.o.direction];

      this.diff = this._requestDiff(this.diff, this.target, this.min, this.max, this.o.overflow);

      this.target -= this.diff;

      this.old = _ptHelper[this.o.direction];

      //store timestamp for event
      this.o.time.move = this.game.time.time;

      this.acc = Math.min(Math.abs(this.diff / 30), this.o.maxAcceleration);

      //go ahead and move the block
      this.scrollObject[this.o.direction] = this.target;
      this.handleUpdate();

      if (this.o.emitMoving) this.events.onInputMove.dispatch(pointer, x, y);
    }
  }, {
    key: 'handleUp',
    value: function handleUp(target, pointer) {
      this.isDown = false;
      // console.log('end')
      if (this.o.addListeners) this.game.input.deleteMoveCallback(this.handleMove, this);

      //store timestamp for event
      this.o.time.up = pointer.timeUp;

      if (this.o.time.up - this.o.time.down > this.o.accelerationT) {
        this.o.multiplier = 1; // reset
      }

      var o = {
        duration: 1,
        target: this.target
      };

      // *** BOUNCING
      if (!this.o.bouncing) o.duration = 0.01;

      if (!this.o.infinite && this.scrollObject[this.o.direction] > this.max) {
        this.target = this.max;
        this.tweenTo(o.duration, this.target);
      } else if (!this.o.infinite && this.scrollObject[this.o.direction] < this.min) {
        this.target = this.min;
        this.tweenTo(o.duration, this.target);
      } else {
        // *** MOMENTUM
        this._addMomentum(o);

        // *** SWIPING
        this._addSwiping(o, pointer);

        // *** SNAPPING
        this._addSnapping(o);

        // *** LIMITS
        this._addLimits(o);

        // *** DURATION
        this._calculateDuration(o);

        this.tweenTo(o.duration, o.target);
      }

      (0, _util.dispatchClicks)(pointer, this.clickables, 'onInputUp');
      this.events.onInputUp.dispatch(target, pointer, _util.dispatchClicks);
    }
  }, {
    key: '_addMomentum',
    value: function _addMomentum(o) {
      if (!this.o.momentum) return o.target;

      //distance to move after release
      var offset = Math.pow(this.acc, 2) * this.maskLimits[this.o.direction];
      offset = Math.min(this.maxOffset, offset);
      offset = this.diff > 0 ? -this.o.multiplier * offset : this.o.multiplier * offset;

      if (this.o.time.up - this.o.time.move < this.o.flickTimeThreshold && offset !== 0 && Math.abs(offset) > this.o.offsetThreshold) {
        o.target += offset;
      }
      return o;
    }
  }, {
    key: '_addSwiping',
    value: function _addSwiping(o, pointer) {
      var swipeDistance = Math.abs(this.down - this.current);
      if (this.o.swipeEnabled && this.o.time.up - this.o.time.down < this.o.swipeTimeThreshold && swipeDistance > this.o.swipeThreshold) {
        var direction = pointer[this.o.direction] < this.down ? 'forward' : 'backward';

        if (direction == 'forward') {
          o.target -= this.o.snapStep / 2;
        } else {
          o.target += this.o.snapStep / 2;
        }

        this.events.onSwipe.dispatch(direction);
      }
      return o;
    }
  }, {
    key: '_addSnapping',
    value: function _addSnapping(o) {
      if (!this.o.snapping) {
        return o;
      }
      o.target = _math_utils2.default.nearestMultiple(o.target, this.o.snapStep);
      return o;
    }
  }, {
    key: '_addLimits',
    value: function _addLimits(o) {
      if (this.o.infinite) return o;
      o.target = Math.max(o.target, this.min);
      o.target = Math.min(o.target, this.max);
      return o;
    }
  }, {
    key: '_calculateDuration',
    value: function _calculateDuration(o) {
      var distance = Math.abs(o.target - this.scrollObject[this.o.direction]);
      o.duration = this.o.duration * distance / this.maxOffset;
      o.duration = Math.max(this.o.minDuration, o.duration);
      return o;
    }
  }, {
    key: '_requestDiff',
    value: function _requestDiff(diff, target, min, max, overflow) {
      if (this.o.infinite) return diff;

      var scale = 0;
      if (target > max) {
        scale = (max + overflow - target) / overflow;
        diff *= scale;
      } else if (target < min) {
        scale = -(min - overflow - target) / overflow;
        diff *= scale;
      }
      return diff;
    }
  }, {
    key: 'tweenToSnap',
    value: function tweenToSnap(duration, snapIndex) {
      var target = this.o.from - this.o.snapStep * snapIndex;
      this.tweenTo(duration, target);
    }

    /**
     * [tweenTo tween to scroller to the target]
     * @param  {Number} duration duration in seconds
     * @param  {Number} target   target relative to the scroller space (usually pixels, but can be angle)
     */

  }, {
    key: 'tweenTo',
    value: function tweenTo(duration, target) {
      if (duration == 0) return this.setTo(target);

      //stop a tween if it is currently happening
      var o = _defineProperty({}, this.o.direction, target);

      this.tweenScroll.onUpdateCallback(this.handleUpdate, this);
      this.tweenScroll.onComplete.add(this.handleComplete, this);

      this.tweenScroll.updateTweenData('vEnd', o, -1);
      this.tweenScroll.updateTweenData('duration', duration * 1000, -1);
      this.tweenScroll.updateTweenData('percent ', 0, -1);

      this.tweenScroll.start();
    }

    // TODO - not really sure what this cancel method should do.
    // Obviously it's meant to cancel a currently active scroll...but I'm
    // not sure what expect from that.

  }, {
    key: 'cancel',
    value: function cancel() {
      this.isDown = false;
    }

    /**
     * [setTo sets the scroller to the target]
     * @param  {Number} target   target relative to the scroller space (usually pixels, but can be angle)
     */

  }, {
    key: 'setTo',
    value: function setTo(target) {
      //stop a tween if it is currently happening
      this.scrollObject[this.o.direction] = target;
      this.tweenScroll.stop();

      this.handleUpdate();
      this.handleComplete();
    }
  }, {
    key: 'handleUpdate',
    value: function handleUpdate() {
      if (!this.enabled) return;
      if (this.o.infinite) {
        this.dispatchValues.total = Phaser.Math.wrap(this.scrollObject[this.o.direction], this.min, this.max);
      } else {
        this.dispatchValues.total = this.scrollObject[this.o.direction];
      }

      var step = this.dispatchValues.total - this.previousTotal;
      if (step < -this.length / 2) {
        step = step + this.length;
      } else if (step > this.length / 2) {
        step = step - this.length;
      }

      this.dispatchValues.step = step;
      this.dispatchValues.percent = _math_utils2.default.percentageBetween2(this.dispatchValues.total, this.o.from, this.o.to);
      this.events.onUpdate.dispatch(this.dispatchValues);

      this.previousTotal = this.dispatchValues.total;
    }
  }, {
    key: 'handleComplete',
    value: function handleComplete() {
      if (!this.enabled) return;
      this.isScrolling = false;
      // reset multiplier when finished
      this.o.multiplier = 1;
      this.events.onComplete.dispatch();
    }
  }, {
    key: '_updateMinMax',
    value: function _updateMinMax() {
      this.min = Math.min(this.o.from, this.o.to);
      this.max = Math.max(this.o.from, this.o.to);
      this.length = Math.abs(this.max - this.min);
      this.previousTotal = this.o.from;
    }
  }]);

  return Scroller;
}();

exports.default = Scroller;

/***/ }),
/* 97 */
/*!*********************************************************!*\
  !*** ./node_modules/core-js/modules/_ie8-dom-define.js ***!
  \*********************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

module.exports = !__webpack_require__(/*! ./_descriptors */ 6) && !__webpack_require__(/*! ./_fails */ 3)(function () {
  return Object.defineProperty(__webpack_require__(/*! ./_dom-create */ 67)('div'), 'a', { get: function () { return 7; } }).a != 7;
});


/***/ }),
/* 98 */
/*!**************************************************!*\
  !*** ./node_modules/core-js/modules/_wks-ext.js ***!
  \**************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

exports.f = __webpack_require__(/*! ./_wks */ 5);


/***/ }),
/* 99 */
/*!***************************************************************!*\
  !*** ./node_modules/core-js/modules/_object-keys-internal.js ***!
  \***************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

var has = __webpack_require__(/*! ./_has */ 11);
var toIObject = __webpack_require__(/*! ./_to-iobject */ 15);
var arrayIndexOf = __webpack_require__(/*! ./_array-includes */ 52)(false);
var IE_PROTO = __webpack_require__(/*! ./_shared-key */ 69)('IE_PROTO');

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
/* 100 */
/*!*****************************************************!*\
  !*** ./node_modules/core-js/modules/_object-dps.js ***!
  \*****************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

var dP = __webpack_require__(/*! ./_object-dp */ 7);
var anObject = __webpack_require__(/*! ./_an-object */ 1);
var getKeys = __webpack_require__(/*! ./_object-keys */ 35);

module.exports = __webpack_require__(/*! ./_descriptors */ 6) ? Object.defineProperties : function defineProperties(O, Properties) {
  anObject(O);
  var keys = getKeys(Properties);
  var length = keys.length;
  var i = 0;
  var P;
  while (length > i) dP.f(O, P = keys[i++], Properties[P]);
  return O;
};


/***/ }),
/* 101 */
/*!**********************************************************!*\
  !*** ./node_modules/core-js/modules/_object-gopn-ext.js ***!
  \**********************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// fallback for IE11 buggy Object.getOwnPropertyNames with iframe and window
var toIObject = __webpack_require__(/*! ./_to-iobject */ 15);
var gOPN = __webpack_require__(/*! ./_object-gopn */ 38).f;
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
/* 102 */
/*!********************************************************!*\
  !*** ./node_modules/core-js/modules/_object-assign.js ***!
  \********************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// 19.1.2.1 Object.assign(target, source, ...)
var getKeys = __webpack_require__(/*! ./_object-keys */ 35);
var gOPS = __webpack_require__(/*! ./_object-gops */ 53);
var pIE = __webpack_require__(/*! ./_object-pie */ 49);
var toObject = __webpack_require__(/*! ./_to-object */ 9);
var IObject = __webpack_require__(/*! ./_iobject */ 48);
var $assign = Object.assign;

// should work with symbols and should have deterministic property order (V8 bug)
module.exports = !$assign || __webpack_require__(/*! ./_fails */ 3)(function () {
  var A = {};
  var B = {};
  // eslint-disable-next-line no-undef
  var S = Symbol();
  var K = 'abcdefghijklmnopqrst';
  A[S] = 7;
  K.split('').forEach(function (k) { B[k] = k; });
  return $assign({}, A)[S] != 7 || Object.keys($assign({}, B)).join('') != K;
}) ? function assign(target, source) { // eslint-disable-line no-unused-vars
  var T = toObject(target);
  var aLen = arguments.length;
  var index = 1;
  var getSymbols = gOPS.f;
  var isEnum = pIE.f;
  while (aLen > index) {
    var S = IObject(arguments[index++]);
    var keys = getSymbols ? getKeys(S).concat(getSymbols(S)) : getKeys(S);
    var length = keys.length;
    var j = 0;
    var key;
    while (length > j) if (isEnum.call(S, key = keys[j++])) T[key] = S[key];
  } return T;
} : $assign;


/***/ }),
/* 103 */
/*!***********************************************!*\
  !*** ./node_modules/core-js/modules/_bind.js ***!
  \***********************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var aFunction = __webpack_require__(/*! ./_a-function */ 10);
var isObject = __webpack_require__(/*! ./_is-object */ 4);
var invoke = __webpack_require__(/*! ./_invoke */ 104);
var arraySlice = [].slice;
var factories = {};

var construct = function (F, len, args) {
  if (!(len in factories)) {
    for (var n = [], i = 0; i < len; i++) n[i] = 'a[' + i + ']';
    // eslint-disable-next-line no-new-func
    factories[len] = Function('F,a', 'return new F(' + n.join(',') + ')');
  } return factories[len](F, args);
};

module.exports = Function.bind || function bind(that /* , ...args */) {
  var fn = aFunction(this);
  var partArgs = arraySlice.call(arguments, 1);
  var bound = function (/* args... */) {
    var args = partArgs.concat(arraySlice.call(arguments));
    return this instanceof bound ? construct(fn, args.length, args) : invoke(fn, args, that);
  };
  if (isObject(fn.prototype)) bound.prototype = fn.prototype;
  return bound;
};


/***/ }),
/* 104 */
/*!*************************************************!*\
  !*** ./node_modules/core-js/modules/_invoke.js ***!
  \*************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports) {

// fast apply, http://jsperf.lnkit.com/fast-apply/5
module.exports = function (fn, args, that) {
  var un = that === undefined;
  switch (args.length) {
    case 0: return un ? fn()
                      : fn.call(that);
    case 1: return un ? fn(args[0])
                      : fn.call(that, args[0]);
    case 2: return un ? fn(args[0], args[1])
                      : fn.call(that, args[0], args[1]);
    case 3: return un ? fn(args[0], args[1], args[2])
                      : fn.call(that, args[0], args[1], args[2]);
    case 4: return un ? fn(args[0], args[1], args[2], args[3])
                      : fn.call(that, args[0], args[1], args[2], args[3]);
  } return fn.apply(that, args);
};


/***/ }),
/* 105 */
/*!****************************************************!*\
  !*** ./node_modules/core-js/modules/_parse-int.js ***!
  \****************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

var $parseInt = __webpack_require__(/*! ./_global */ 2).parseInt;
var $trim = __webpack_require__(/*! ./_string-trim */ 44).trim;
var ws = __webpack_require__(/*! ./_string-ws */ 73);
var hex = /^[-+]?0[xX]/;

module.exports = $parseInt(ws + '08') !== 8 || $parseInt(ws + '0x16') !== 22 ? function parseInt(str, radix) {
  var string = $trim(String(str), 3);
  return $parseInt(string, (radix >>> 0) || (hex.test(string) ? 16 : 10));
} : $parseInt;


/***/ }),
/* 106 */
/*!******************************************************!*\
  !*** ./node_modules/core-js/modules/_parse-float.js ***!
  \******************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

var $parseFloat = __webpack_require__(/*! ./_global */ 2).parseFloat;
var $trim = __webpack_require__(/*! ./_string-trim */ 44).trim;

module.exports = 1 / $parseFloat(__webpack_require__(/*! ./_string-ws */ 73) + '-0') !== -Infinity ? function parseFloat(str) {
  var string = $trim(String(str), 3);
  var result = $parseFloat(string);
  return result === 0 && string.charAt(0) == '-' ? -0 : result;
} : $parseFloat;


/***/ }),
/* 107 */
/*!*********************************************************!*\
  !*** ./node_modules/core-js/modules/_a-number-value.js ***!
  \*********************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

var cof = __webpack_require__(/*! ./_cof */ 19);
module.exports = function (it, msg) {
  if (typeof it != 'number' && cof(it) != 'Number') throw TypeError(msg);
  return +it;
};


/***/ }),
/* 108 */
/*!*****************************************************!*\
  !*** ./node_modules/core-js/modules/_is-integer.js ***!
  \*****************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// 20.1.2.3 Number.isInteger(number)
var isObject = __webpack_require__(/*! ./_is-object */ 4);
var floor = Math.floor;
module.exports = function isInteger(it) {
  return !isObject(it) && isFinite(it) && floor(it) === it;
};


/***/ }),
/* 109 */
/*!*****************************************************!*\
  !*** ./node_modules/core-js/modules/_math-log1p.js ***!
  \*****************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports) {

// 20.2.2.20 Math.log1p(x)
module.exports = Math.log1p || function log1p(x) {
  return (x = +x) > -1e-8 && x < 1e-8 ? x - x * x / 2 : Math.log(1 + x);
};


/***/ }),
/* 110 */
/*!******************************************************!*\
  !*** ./node_modules/core-js/modules/_math-fround.js ***!
  \******************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// 20.2.2.16 Math.fround(x)
var sign = __webpack_require__(/*! ./_math-sign */ 76);
var pow = Math.pow;
var EPSILON = pow(2, -52);
var EPSILON32 = pow(2, -23);
var MAX32 = pow(2, 127) * (2 - EPSILON32);
var MIN32 = pow(2, -126);

var roundTiesToEven = function (n) {
  return n + 1 / EPSILON - 1 / EPSILON;
};

module.exports = Math.fround || function fround(x) {
  var $abs = Math.abs(x);
  var $sign = sign(x);
  var a, result;
  if ($abs < MIN32) return $sign * roundTiesToEven($abs / MIN32 / EPSILON32) * MIN32 * EPSILON32;
  a = (1 + EPSILON32 / EPSILON) * $abs;
  result = a - (a - $abs);
  // eslint-disable-next-line no-self-compare
  if (result > MAX32 || result != result) return $sign * Infinity;
  return $sign * result;
};


/***/ }),
/* 111 */
/*!****************************************************!*\
  !*** ./node_modules/core-js/modules/_iter-call.js ***!
  \****************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// call something on iterator step with safe closing on error
var anObject = __webpack_require__(/*! ./_an-object */ 1);
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
/* 112 */
/*!*******************************************************!*\
  !*** ./node_modules/core-js/modules/_array-reduce.js ***!
  \*******************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

var aFunction = __webpack_require__(/*! ./_a-function */ 10);
var toObject = __webpack_require__(/*! ./_to-object */ 9);
var IObject = __webpack_require__(/*! ./_iobject */ 48);
var toLength = __webpack_require__(/*! ./_to-length */ 8);

module.exports = function (that, callbackfn, aLen, memo, isRight) {
  aFunction(callbackfn);
  var O = toObject(that);
  var self = IObject(O);
  var length = toLength(O.length);
  var index = isRight ? length - 1 : 0;
  var i = isRight ? -1 : 1;
  if (aLen < 2) for (;;) {
    if (index in self) {
      memo = self[index];
      index += i;
      break;
    }
    index += i;
    if (isRight ? index < 0 : length <= index) {
      throw TypeError('Reduce of empty array with no initial value');
    }
  }
  for (;isRight ? index >= 0 : length > index; index += i) if (index in self) {
    memo = callbackfn(memo, self[index], index, O);
  }
  return memo;
};


/***/ }),
/* 113 */
/*!************************************************************!*\
  !*** ./node_modules/core-js/modules/_array-copy-within.js ***!
  \************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// 22.1.3.3 Array.prototype.copyWithin(target, start, end = this.length)

var toObject = __webpack_require__(/*! ./_to-object */ 9);
var toAbsoluteIndex = __webpack_require__(/*! ./_to-absolute-index */ 36);
var toLength = __webpack_require__(/*! ./_to-length */ 8);

module.exports = [].copyWithin || function copyWithin(target /* = 0 */, start /* = 0, end = @length */) {
  var O = toObject(this);
  var len = toLength(O.length);
  var to = toAbsoluteIndex(target, len);
  var from = toAbsoluteIndex(start, len);
  var end = arguments.length > 2 ? arguments[2] : undefined;
  var count = Math.min((end === undefined ? len : toAbsoluteIndex(end, len)) - from, len - to);
  var inc = 1;
  if (from < to && to < from + count) {
    inc = -1;
    from += count - 1;
    to += count - 1;
  }
  while (count-- > 0) {
    if (from in O) O[to] = O[from];
    else delete O[to];
    to += inc;
    from += inc;
  } return O;
};


/***/ }),
/* 114 */
/*!****************************************************!*\
  !*** ./node_modules/core-js/modules/_iter-step.js ***!
  \****************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports) {

module.exports = function (done, value) {
  return { value: value, done: !!done };
};


/***/ }),
/* 115 */
/*!**********************************************************!*\
  !*** ./node_modules/core-js/modules/es6.regexp.flags.js ***!
  \**********************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// 21.2.5.3 get RegExp.prototype.flags()
if (__webpack_require__(/*! ./_descriptors */ 6) && /./g.flags != 'g') __webpack_require__(/*! ./_object-dp */ 7).f(RegExp.prototype, 'flags', {
  configurable: true,
  get: __webpack_require__(/*! ./_flags */ 57)
});


/***/ }),
/* 116 */
/*!**************************************************!*\
  !*** ./node_modules/core-js/modules/_perform.js ***!
  \**************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports) {

module.exports = function (exec) {
  try {
    return { e: false, v: exec() };
  } catch (e) {
    return { e: true, v: e };
  }
};


/***/ }),
/* 117 */
/*!**********************************************************!*\
  !*** ./node_modules/core-js/modules/_promise-resolve.js ***!
  \**********************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

var anObject = __webpack_require__(/*! ./_an-object */ 1);
var isObject = __webpack_require__(/*! ./_is-object */ 4);
var newPromiseCapability = __webpack_require__(/*! ./_new-promise-capability */ 91);

module.exports = function (C, x) {
  anObject(C);
  if (isObject(x) && x.constructor === C) return x;
  var promiseCapability = newPromiseCapability.f(C);
  var resolve = promiseCapability.resolve;
  resolve(x);
  return promiseCapability.promise;
};


/***/ }),
/* 118 */
/*!*************************************************!*\
  !*** ./node_modules/core-js/modules/es6.map.js ***!
  \*************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var strong = __webpack_require__(/*! ./_collection-strong */ 119);
var validate = __webpack_require__(/*! ./_validate-collection */ 46);
var MAP = 'Map';

// 23.1 Map Objects
module.exports = __webpack_require__(/*! ./_collection */ 60)(MAP, function (get) {
  return function Map() { return get(this, arguments.length > 0 ? arguments[0] : undefined); };
}, {
  // 23.1.3.6 Map.prototype.get(key)
  get: function get(key) {
    var entry = strong.getEntry(validate(this, MAP), key);
    return entry && entry.v;
  },
  // 23.1.3.9 Map.prototype.set(key, value)
  set: function set(key, value) {
    return strong.def(validate(this, MAP), key === 0 ? 0 : key, value);
  }
}, strong, true);


/***/ }),
/* 119 */
/*!************************************************************!*\
  !*** ./node_modules/core-js/modules/_collection-strong.js ***!
  \************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var dP = __webpack_require__(/*! ./_object-dp */ 7).f;
var create = __webpack_require__(/*! ./_object-create */ 37);
var redefineAll = __webpack_require__(/*! ./_redefine-all */ 42);
var ctx = __webpack_require__(/*! ./_ctx */ 18);
var anInstance = __webpack_require__(/*! ./_an-instance */ 40);
var forOf = __webpack_require__(/*! ./_for-of */ 41);
var $iterDefine = __webpack_require__(/*! ./_iter-define */ 79);
var step = __webpack_require__(/*! ./_iter-step */ 114);
var setSpecies = __webpack_require__(/*! ./_set-species */ 39);
var DESCRIPTORS = __webpack_require__(/*! ./_descriptors */ 6);
var fastKey = __webpack_require__(/*! ./_meta */ 30).fastKey;
var validate = __webpack_require__(/*! ./_validate-collection */ 46);
var SIZE = DESCRIPTORS ? '_s' : 'size';

var getEntry = function (that, key) {
  // fast case
  var index = fastKey(key);
  var entry;
  if (index !== 'F') return that._i[index];
  // frozen object case
  for (entry = that._f; entry; entry = entry.n) {
    if (entry.k == key) return entry;
  }
};

module.exports = {
  getConstructor: function (wrapper, NAME, IS_MAP, ADDER) {
    var C = wrapper(function (that, iterable) {
      anInstance(that, C, NAME, '_i');
      that._t = NAME;         // collection type
      that._i = create(null); // index
      that._f = undefined;    // first entry
      that._l = undefined;    // last entry
      that[SIZE] = 0;         // size
      if (iterable != undefined) forOf(iterable, IS_MAP, that[ADDER], that);
    });
    redefineAll(C.prototype, {
      // 23.1.3.1 Map.prototype.clear()
      // 23.2.3.2 Set.prototype.clear()
      clear: function clear() {
        for (var that = validate(this, NAME), data = that._i, entry = that._f; entry; entry = entry.n) {
          entry.r = true;
          if (entry.p) entry.p = entry.p.n = undefined;
          delete data[entry.i];
        }
        that._f = that._l = undefined;
        that[SIZE] = 0;
      },
      // 23.1.3.3 Map.prototype.delete(key)
      // 23.2.3.4 Set.prototype.delete(value)
      'delete': function (key) {
        var that = validate(this, NAME);
        var entry = getEntry(that, key);
        if (entry) {
          var next = entry.n;
          var prev = entry.p;
          delete that._i[entry.i];
          entry.r = true;
          if (prev) prev.n = next;
          if (next) next.p = prev;
          if (that._f == entry) that._f = next;
          if (that._l == entry) that._l = prev;
          that[SIZE]--;
        } return !!entry;
      },
      // 23.2.3.6 Set.prototype.forEach(callbackfn, thisArg = undefined)
      // 23.1.3.5 Map.prototype.forEach(callbackfn, thisArg = undefined)
      forEach: function forEach(callbackfn /* , that = undefined */) {
        validate(this, NAME);
        var f = ctx(callbackfn, arguments.length > 1 ? arguments[1] : undefined, 3);
        var entry;
        while (entry = entry ? entry.n : this._f) {
          f(entry.v, entry.k, this);
          // revert to the last existing entry
          while (entry && entry.r) entry = entry.p;
        }
      },
      // 23.1.3.7 Map.prototype.has(key)
      // 23.2.3.7 Set.prototype.has(value)
      has: function has(key) {
        return !!getEntry(validate(this, NAME), key);
      }
    });
    if (DESCRIPTORS) dP(C.prototype, 'size', {
      get: function () {
        return validate(this, NAME)[SIZE];
      }
    });
    return C;
  },
  def: function (that, key, value) {
    var entry = getEntry(that, key);
    var prev, index;
    // change existing entry
    if (entry) {
      entry.v = value;
    // create new entry
    } else {
      that._l = entry = {
        i: index = fastKey(key, true), // <- index
        k: key,                        // <- key
        v: value,                      // <- value
        p: prev = that._l,             // <- previous entry
        n: undefined,                  // <- next entry
        r: false                       // <- removed
      };
      if (!that._f) that._f = entry;
      if (prev) prev.n = entry;
      that[SIZE]++;
      // add to index
      if (index !== 'F') that._i[index] = entry;
    } return that;
  },
  getEntry: getEntry,
  setStrong: function (C, NAME, IS_MAP) {
    // add .keys, .values, .entries, [@@iterator]
    // 23.1.3.4, 23.1.3.8, 23.1.3.11, 23.1.3.12, 23.2.3.5, 23.2.3.8, 23.2.3.10, 23.2.3.11
    $iterDefine(C, NAME, function (iterated, kind) {
      this._t = validate(iterated, NAME); // target
      this._k = kind;                     // kind
      this._l = undefined;                // previous
    }, function () {
      var that = this;
      var kind = that._k;
      var entry = that._l;
      // revert to the last existing entry
      while (entry && entry.r) entry = entry.p;
      // get next entry
      if (!that._t || !(that._l = entry = entry ? entry.n : that._t._f)) {
        // or finish the iteration
        that._t = undefined;
        return step(1);
      }
      // return step by kind
      if (kind == 'keys') return step(0, entry.k);
      if (kind == 'values') return step(0, entry.v);
      return step(0, [entry.k, entry.v]);
    }, IS_MAP ? 'entries' : 'values', !IS_MAP, true);

    // add [@@species], 23.1.2.2, 23.2.2.2
    setSpecies(NAME);
  }
};


/***/ }),
/* 120 */
/*!*************************************************!*\
  !*** ./node_modules/core-js/modules/es6.set.js ***!
  \*************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var strong = __webpack_require__(/*! ./_collection-strong */ 119);
var validate = __webpack_require__(/*! ./_validate-collection */ 46);
var SET = 'Set';

// 23.2 Set Objects
module.exports = __webpack_require__(/*! ./_collection */ 60)(SET, function (get) {
  return function Set() { return get(this, arguments.length > 0 ? arguments[0] : undefined); };
}, {
  // 23.2.3.1 Set.prototype.add(value)
  add: function add(value) {
    return strong.def(validate(this, SET), value = value === 0 ? 0 : value, value);
  }
}, strong);


/***/ }),
/* 121 */
/*!******************************************************!*\
  !*** ./node_modules/core-js/modules/es6.weak-map.js ***!
  \******************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var each = __webpack_require__(/*! ./_array-methods */ 26)(0);
var redefine = __webpack_require__(/*! ./_redefine */ 13);
var meta = __webpack_require__(/*! ./_meta */ 30);
var assign = __webpack_require__(/*! ./_object-assign */ 102);
var weak = __webpack_require__(/*! ./_collection-weak */ 122);
var isObject = __webpack_require__(/*! ./_is-object */ 4);
var fails = __webpack_require__(/*! ./_fails */ 3);
var validate = __webpack_require__(/*! ./_validate-collection */ 46);
var WEAK_MAP = 'WeakMap';
var getWeak = meta.getWeak;
var isExtensible = Object.isExtensible;
var uncaughtFrozenStore = weak.ufstore;
var tmp = {};
var InternalMap;

var wrapper = function (get) {
  return function WeakMap() {
    return get(this, arguments.length > 0 ? arguments[0] : undefined);
  };
};

var methods = {
  // 23.3.3.3 WeakMap.prototype.get(key)
  get: function get(key) {
    if (isObject(key)) {
      var data = getWeak(key);
      if (data === true) return uncaughtFrozenStore(validate(this, WEAK_MAP)).get(key);
      return data ? data[this._i] : undefined;
    }
  },
  // 23.3.3.5 WeakMap.prototype.set(key, value)
  set: function set(key, value) {
    return weak.def(validate(this, WEAK_MAP), key, value);
  }
};

// 23.3 WeakMap Objects
var $WeakMap = module.exports = __webpack_require__(/*! ./_collection */ 60)(WEAK_MAP, wrapper, methods, weak, true, true);

// IE11 WeakMap frozen keys fix
if (fails(function () { return new $WeakMap().set((Object.freeze || Object)(tmp), 7).get(tmp) != 7; })) {
  InternalMap = weak.getConstructor(wrapper, WEAK_MAP);
  assign(InternalMap.prototype, methods);
  meta.NEED = true;
  each(['delete', 'has', 'get', 'set'], function (key) {
    var proto = $WeakMap.prototype;
    var method = proto[key];
    redefine(proto, key, function (a, b) {
      // store frozen objects on internal weakmap shim
      if (isObject(a) && !isExtensible(a)) {
        if (!this._f) this._f = new InternalMap();
        var result = this._f[key](a, b);
        return key == 'set' ? this : result;
      // store all the rest on native weakmap
      } return method.call(this, a, b);
    });
  });
}


/***/ }),
/* 122 */
/*!**********************************************************!*\
  !*** ./node_modules/core-js/modules/_collection-weak.js ***!
  \**********************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var redefineAll = __webpack_require__(/*! ./_redefine-all */ 42);
var getWeak = __webpack_require__(/*! ./_meta */ 30).getWeak;
var anObject = __webpack_require__(/*! ./_an-object */ 1);
var isObject = __webpack_require__(/*! ./_is-object */ 4);
var anInstance = __webpack_require__(/*! ./_an-instance */ 40);
var forOf = __webpack_require__(/*! ./_for-of */ 41);
var createArrayMethod = __webpack_require__(/*! ./_array-methods */ 26);
var $has = __webpack_require__(/*! ./_has */ 11);
var validate = __webpack_require__(/*! ./_validate-collection */ 46);
var arrayFind = createArrayMethod(5);
var arrayFindIndex = createArrayMethod(6);
var id = 0;

// fallback for uncaught frozen keys
var uncaughtFrozenStore = function (that) {
  return that._l || (that._l = new UncaughtFrozenStore());
};
var UncaughtFrozenStore = function () {
  this.a = [];
};
var findUncaughtFrozen = function (store, key) {
  return arrayFind(store.a, function (it) {
    return it[0] === key;
  });
};
UncaughtFrozenStore.prototype = {
  get: function (key) {
    var entry = findUncaughtFrozen(this, key);
    if (entry) return entry[1];
  },
  has: function (key) {
    return !!findUncaughtFrozen(this, key);
  },
  set: function (key, value) {
    var entry = findUncaughtFrozen(this, key);
    if (entry) entry[1] = value;
    else this.a.push([key, value]);
  },
  'delete': function (key) {
    var index = arrayFindIndex(this.a, function (it) {
      return it[0] === key;
    });
    if (~index) this.a.splice(index, 1);
    return !!~index;
  }
};

module.exports = {
  getConstructor: function (wrapper, NAME, IS_MAP, ADDER) {
    var C = wrapper(function (that, iterable) {
      anInstance(that, C, NAME, '_i');
      that._t = NAME;      // collection type
      that._i = id++;      // collection id
      that._l = undefined; // leak store for uncaught frozen objects
      if (iterable != undefined) forOf(iterable, IS_MAP, that[ADDER], that);
    });
    redefineAll(C.prototype, {
      // 23.3.3.2 WeakMap.prototype.delete(key)
      // 23.4.3.3 WeakSet.prototype.delete(value)
      'delete': function (key) {
        if (!isObject(key)) return false;
        var data = getWeak(key);
        if (data === true) return uncaughtFrozenStore(validate(this, NAME))['delete'](key);
        return data && $has(data, this._i) && delete data[this._i];
      },
      // 23.3.3.4 WeakMap.prototype.has(key)
      // 23.4.3.4 WeakSet.prototype.has(value)
      has: function has(key) {
        if (!isObject(key)) return false;
        var data = getWeak(key);
        if (data === true) return uncaughtFrozenStore(validate(this, NAME)).has(key);
        return data && $has(data, this._i);
      }
    });
    return C;
  },
  def: function (that, key, value) {
    var data = getWeak(anObject(key), true);
    if (data === true) uncaughtFrozenStore(that).set(key, value);
    else data[that._i] = value;
    return that;
  },
  ufstore: uncaughtFrozenStore
};


/***/ }),
/* 123 */
/*!***************************************************!*\
  !*** ./node_modules/core-js/modules/_to-index.js ***!
  \***************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// https://tc39.github.io/ecma262/#sec-toindex
var toInteger = __webpack_require__(/*! ./_to-integer */ 24);
var toLength = __webpack_require__(/*! ./_to-length */ 8);
module.exports = function (it) {
  if (it === undefined) return 0;
  var number = toInteger(it);
  var length = toLength(number);
  if (number !== length) throw RangeError('Wrong length!');
  return length;
};


/***/ }),
/* 124 */
/*!***************************************************!*\
  !*** ./node_modules/core-js/modules/_own-keys.js ***!
  \***************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// all object keys, includes non-enumerable and symbols
var gOPN = __webpack_require__(/*! ./_object-gopn */ 38);
var gOPS = __webpack_require__(/*! ./_object-gops */ 53);
var anObject = __webpack_require__(/*! ./_an-object */ 1);
var Reflect = __webpack_require__(/*! ./_global */ 2).Reflect;
module.exports = Reflect && Reflect.ownKeys || function ownKeys(it) {
  var keys = gOPN.f(anObject(it));
  var getSymbols = gOPS.f;
  return getSymbols ? keys.concat(getSymbols(it)) : keys;
};


/***/ }),
/* 125 */
/*!*************************************************************!*\
  !*** ./node_modules/core-js/modules/_flatten-into-array.js ***!
  \*************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// https://tc39.github.io/proposal-flatMap/#sec-FlattenIntoArray
var isArray = __webpack_require__(/*! ./_is-array */ 54);
var isObject = __webpack_require__(/*! ./_is-object */ 4);
var toLength = __webpack_require__(/*! ./_to-length */ 8);
var ctx = __webpack_require__(/*! ./_ctx */ 18);
var IS_CONCAT_SPREADABLE = __webpack_require__(/*! ./_wks */ 5)('isConcatSpreadable');

function flattenIntoArray(target, original, source, sourceLen, start, depth, mapper, thisArg) {
  var targetIndex = start;
  var sourceIndex = 0;
  var mapFn = mapper ? ctx(mapper, thisArg, 3) : false;
  var element, spreadable;

  while (sourceIndex < sourceLen) {
    if (sourceIndex in source) {
      element = mapFn ? mapFn(source[sourceIndex], sourceIndex, original) : source[sourceIndex];

      spreadable = false;
      if (isObject(element)) {
        spreadable = element[IS_CONCAT_SPREADABLE];
        spreadable = spreadable !== undefined ? !!spreadable : isArray(element);
      }

      if (spreadable && depth > 0) {
        targetIndex = flattenIntoArray(target, original, element, toLength(element.length), targetIndex, depth - 1) - 1;
      } else {
        if (targetIndex >= 0x1fffffffffffff) throw TypeError();
        target[targetIndex] = element;
      }

      targetIndex++;
    }
    sourceIndex++;
  }
  return targetIndex;
}

module.exports = flattenIntoArray;


/***/ }),
/* 126 */
/*!*****************************************************!*\
  !*** ./node_modules/core-js/modules/_string-pad.js ***!
  \*****************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// https://github.com/tc39/proposal-string-pad-start-end
var toLength = __webpack_require__(/*! ./_to-length */ 8);
var repeat = __webpack_require__(/*! ./_string-repeat */ 75);
var defined = __webpack_require__(/*! ./_defined */ 23);

module.exports = function (that, maxLength, fillString, left) {
  var S = String(defined(that));
  var stringLength = S.length;
  var fillStr = fillString === undefined ? ' ' : String(fillString);
  var intMaxLength = toLength(maxLength);
  if (intMaxLength <= stringLength || fillStr == '') return S;
  var fillLen = intMaxLength - stringLength;
  var stringFiller = repeat.call(fillStr, Math.ceil(fillLen / fillStr.length));
  if (stringFiller.length > fillLen) stringFiller = stringFiller.slice(0, fillLen);
  return left ? stringFiller + S : S + stringFiller;
};


/***/ }),
/* 127 */
/*!**********************************************************!*\
  !*** ./node_modules/core-js/modules/_object-to-array.js ***!
  \**********************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

var getKeys = __webpack_require__(/*! ./_object-keys */ 35);
var toIObject = __webpack_require__(/*! ./_to-iobject */ 15);
var isEnum = __webpack_require__(/*! ./_object-pie */ 49).f;
module.exports = function (isEntries) {
  return function (it) {
    var O = toIObject(it);
    var keys = getKeys(O);
    var length = keys.length;
    var i = 0;
    var result = [];
    var key;
    while (length > i) if (isEnum.call(O, key = keys[i++])) {
      result.push(isEntries ? [key, O[key]] : O[key]);
    } return result;
  };
};


/***/ }),
/* 128 */
/*!*************************************************************!*\
  !*** ./node_modules/core-js/modules/_collection-to-json.js ***!
  \*************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// https://github.com/DavidBruant/Map-Set.prototype.toJSON
var classof = __webpack_require__(/*! ./_classof */ 50);
var from = __webpack_require__(/*! ./_array-from-iterable */ 129);
module.exports = function (NAME) {
  return function toJSON() {
    if (classof(this) != NAME) throw TypeError(NAME + "#toJSON isn't generic");
    return from(this);
  };
};


/***/ }),
/* 129 */
/*!**************************************************************!*\
  !*** ./node_modules/core-js/modules/_array-from-iterable.js ***!
  \**************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

var forOf = __webpack_require__(/*! ./_for-of */ 41);

module.exports = function (iter, ITERATOR) {
  var result = [];
  forOf(iter, false, result.push, result, ITERATOR);
  return result;
};


/***/ }),
/* 130 */
/*!*****************************************************!*\
  !*** ./node_modules/core-js/modules/_math-scale.js ***!
  \*****************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports) {

// https://rwaldron.github.io/proposal-math-extensions/
module.exports = Math.scale || function scale(x, inLow, inHigh, outLow, outHigh) {
  if (
    arguments.length === 0
      // eslint-disable-next-line no-self-compare
      || x != x
      // eslint-disable-next-line no-self-compare
      || inLow != inLow
      // eslint-disable-next-line no-self-compare
      || inHigh != inHigh
      // eslint-disable-next-line no-self-compare
      || outLow != outLow
      // eslint-disable-next-line no-self-compare
      || outHigh != outHigh
  ) return NaN;
  if (x === Infinity || x === -Infinity) return x;
  return (x - inLow) * (outHigh - outLow) / (inHigh - inLow) + outLow;
};


/***/ }),
/* 131 */,
/* 132 */,
/* 133 */
/*!****************************!*\
  !*** ./src/states/Boot.js ***!
  \****************************/
/*! exports provided: default */
/*! exports used: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_phaser__ = __webpack_require__(/*! phaser */ 29);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_phaser___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_phaser__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_webfontloader__ = __webpack_require__(/*! webfontloader */ 134);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_webfontloader___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_webfontloader__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__config__ = __webpack_require__(/*! ../config */ 94);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__libs_phaser_state_transition_plugin__ = __webpack_require__(/*! ../libs/phaser-state-transition-plugin */ 347);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__libs_phaser_state_transition_plugin___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3__libs_phaser_state_transition_plugin__);





/* harmony default export */ __webpack_exports__["a"] = (class extends __WEBPACK_IMPORTED_MODULE_0_phaser___default.a.State {
    init() {
        this.game.scale.scaleMode = __WEBPACK_IMPORTED_MODULE_0_phaser___default.a.ScaleManager.SHOW_ALL;
        if (!this.game.device.desktop) {
            this.game.scale.minWidth = 300;
            this.game.scale.minHeight = 100;
            this.game.scale.maxWidth = window.innerWidth * 2;
            this.game.scale.maxHeight = window.innerHeight * 2;
        } else {
            this.game.scale.maxHeight = window.innerHeight;
            this.game.scale.maxWidth = window.innerHeight * (800 / 600);
        }

        this.scale.pageAlignHorizontally = false;
        this.scale.pageAlignVertically = true;

        this.scale.forceOrientation(true, false);
        this.scale.refresh(true);

        this.fontsReady = false;
        this.fontsLoaded = this.fontsLoaded.bind(this);
    }

    preload() {
        if (__WEBPACK_IMPORTED_MODULE_2__config__["a" /* default */].webfonts.length) {
            __WEBPACK_IMPORTED_MODULE_1_webfontloader___default.a.load({
                google: {
                    families: __WEBPACK_IMPORTED_MODULE_2__config__["a" /* default */].webfonts
                },
                active: this.fontsLoaded
            });
        }

        let scale_ratio;
        let canvas_height_max = 900;
        let canvas_width_max = 1140;
        let width = this.game.world.width; //window.screen.availWidth * window.devicePixelRatio
        let height = this.game.world.height; //window.screen.availHeight * window.devicePixelRatio
        game.aspectRatio = width / height;
        game.scaleRatio = game.width / canvas_width_max;

        console.log('game dimension: ', game.world.width, 'x', game.height, 'height * scaleRatio', game.height * game.scaleRatio);
        if (game.aspectRatio < 1) {
            game.scale.setGameSize(game.width, game.height * game.scaleRatio);
        } else {
            game.scale.setGameSize(game.width, game.height);
        }

        game.canvas.oncontextmenu = function (e) {
            e.preventDefault();
        };

        this.load.image('logo', 'assets/logo.png');
        this.load.image('preloaderBar', 'assets/loading-bar.png');
        this.load.image('preloaderBar2', 'assets/loading-bar2.png');
    }

    create() {
        // this.game.stateTransition = this.game.plugins.add(Phaser.Plugin.StateTransition);
        // this.game.stateTransition.configure({
        //     duration: Phaser.Timer.SECOND * 1.5,
        //     ease: Phaser.Easing.Exponential.Out,
        //     properties: {
        //         alpha: 0
        //     }
        // });
    }

    render() {
        if (__WEBPACK_IMPORTED_MODULE_2__config__["a" /* default */].webfonts.length && this.fontsReady) {
            this.state.start('Preloader');
        }
        if (!__WEBPACK_IMPORTED_MODULE_2__config__["a" /* default */].webfonts.length) {
            this.state.start('Preloader');
        }
        this.state.start('Preloader');
    }

    fontsLoaded() {
        this.fontsReady = true;
    }
});

/***/ }),
/* 134 */,
/* 135 */
/*!*****************************************************!*\
  !*** ./node_modules/phaser-list-view/lib/config.js ***!
  \*****************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var Config = {
  AUTO_DETECT_THRESHOLD: 8
};

exports.default = Config;

/***/ }),
/* 136 */
/*!********************************************************!*\
  !*** ./node_modules/phaser-list-view/lib/list_view.js ***!
  \********************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _list_view_core = __webpack_require__(/*! ./list_view_core */ 137);

var _list_view_core2 = _interopRequireDefault(_list_view_core);

var _directional_scroller = __webpack_require__(/*! ./directional_scroller */ 138);

var _directional_scroller2 = _interopRequireDefault(_directional_scroller);

var _util = __webpack_require__(/*! ./util */ 66);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var defaultOptions = {
  direction: 'y',
  autocull: true,
  momentum: true,
  bouncing: true,
  snapping: false,
  overflow: 100,
  padding: 10,
  searchForClicks: false // if you just click on the list view it will search the list view items for onInputDown and onInputUp events.
};

var ListView = function (_ListViewCore) {
  _inherits(ListView, _ListViewCore);

  function ListView(game, parent, bounds) {
    var options = arguments.length <= 3 || arguments[3] === undefined ? {} : arguments[3];

    _classCallCheck(this, ListView);

    // we have to use a new mask instance for the click object or webgl ignores the mask
    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(ListView).call(this, game, parent, (0, _util.parseBounds)(bounds), Object.assign({}, defaultOptions, options)));

    _this.scroller = new _directional_scroller2.default(_this.game, _this._addMask(bounds), Object.assign({
      from: 0,
      to: 0
    }, _this.options));
    _this.scroller.events.onUpdate.add(function (o) {
      _this._setPosition(o.total);
    });
    _this.events.onAdded.add(function (limit) {
      var _to = Math.min(-limit, 0);
      _this.scroller.setFromTo(0, _to);
      if (_this.options.searchForClicks) {
        _this.scroller.registerClickables(_this.items);
      }
    });
    return _this;
  }

  _createClass(ListView, [{
    key: 'destroy',
    value: function destroy() {
      this.scroller.destroy();
      this.scroller = null;
      _get(Object.getPrototypeOf(ListView.prototype), 'destroy', this).call(this);
    }
  }, {
    key: 'reset',
    value: function reset() {
      this._setPosition(0);
      this.scroller.reset();
    }
  }]);

  return ListView;
}(_list_view_core2.default);

exports.default = ListView;

/***/ }),
/* 137 */
/*!*************************************************************!*\
  !*** ./node_modules/phaser-list-view/lib/list_view_core.js ***!
  \*************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _util = __webpack_require__(/*! ./util */ 66);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var defaultOptions = {
  direction: 'y',
  autocull: true,
  padding: 10
};

var ListViewCore = function () {
  function ListViewCore(game, parent, bounds) {
    var options = arguments.length <= 3 || arguments[3] === undefined ? {} : arguments[3];

    _classCallCheck(this, ListViewCore);

    this.game = game;
    this.parent = parent;
    this.bounds = bounds;

    this.o = this.options = Object.assign({}, defaultOptions, options);

    this.items = [];

    if (this.o.direction == 'y') {
      this.p = { xy: 'y', wh: 'height' };
    } else {
      this.p = { xy: 'x', wh: 'width' };
    }

    this.grp = this.game.add.group(parent);
    this.grp.position.set(bounds.x, bounds.y);

    this.events = {
      onAdded: new Phaser.Signal()
    };

    this.position = 0;

    // [MC] - is masking the fastest option here? Cropping the texture may be faster?
    this.grp.mask = this._addMask(bounds);
  }

  /**
   * [add a child to the list
   * stacks them on top of each other by measuring their
   * height and adding custom padding. Optionally you can
   * specify nominalHeight or nominalWidth on the display object,
   * this will take preference over height and width]
   * @param {DisplayObject} child
   */


  _createClass(ListViewCore, [{
    key: 'add',
    value: function add(child) {
      this.items.push(child);
      var xy = 0;
      if (this.grp.children.length > 0) {
        var lastChild = this.grp.getChildAt(this.grp.children.length - 1);
        xy = lastChild[this.p.xy] + (0, _util.getWidthOrHeight)(lastChild, this.p.wh) + this.o.padding;
      }
      child[this.p.xy] = xy;
      this.grp.addChild(child);
      this.length = xy + child[this.p.wh];

      // this._setPosition(this.position)
      this.events.onAdded.dispatch(this.length - this.bounds[this.p.wh]);
      return child;
    }

    /**
     * [addMultiple children to the list]
     * @param {...[DisplayObjects]} children
     */

  }, {
    key: 'addMultiple',
    value: function addMultiple() {
      for (var _len = arguments.length, children = Array(_len), _key = 0; _key < _len; _key++) {
        children[_key] = arguments[_key];
      }

      children.forEach(this.add, this);
    }
  }, {
    key: 'remove',
    value: function remove(child) {
      this.grp.removeChild(child);
      var index = this.items.indexOf(child);
      if (index == -1) return;
      this.items.splice(index, 1);
      return child;
    }
  }, {
    key: 'destroy',
    value: function destroy() {
      this.events.onAdded.dispose();
      this.events = null;
      this.grp.destroy();
      this.grp = null;
      this.game = null;
      this.parent = null;
      this.items = null;
    }

    /**
     * [removeAll - removes all children from the group]
     * @note This does not reset the position of the ListView.
     */

  }, {
    key: 'removeAll',
    value: function removeAll() {
      this.grp.removeAll();
      this.items = [];
    }

    /**
     * [cull - culls the off-screen list elements]
     * mainly called internally with the autoCull property
     */

  }, {
    key: 'cull',
    value: function cull() {
      for (var i = 0; i < this.items.length; i++) {
        var child = this.items[i];
        child.visible = true;
        if (child[this.p.xy] + (0, _util.getWidthOrHeight)(child, this.p.wh) + this.grp[this.p.xy] < this.bounds[this.p.xy]) {
          child.visible = false;
        } else if (child[this.p.xy] + this.grp[this.p.xy] > this.bounds[this.p.xy] + this.bounds[this.p.wh]) {
          child.visible = false;
        }
      }
    }
  }, {
    key: 'getPositionByItemIndex',
    value: function getPositionByItemIndex(index) {
      return -this.items[index][this.p.xy];
    }

    // @deprecated

  }, {
    key: 'setPosition',
    value: function setPosition(position) {
      this.moveToPosition(position);
    }
  }, {
    key: 'moveToPosition',
    value: function moveToPosition(position) {
      this.scroller.setTo(position);
    }
  }, {
    key: 'moveToItem',
    value: function moveToItem(index) {
      this.scroller.setTo(this.getPositionByItemIndex(index));
    }
  }, {
    key: 'tweenToPosition',
    value: function tweenToPosition(position) {
      var duration = arguments.length <= 1 || arguments[1] === undefined ? 1 : arguments[1];

      this.scroller.tweenTo(duration, position);
    }
  }, {
    key: 'tweenToItem',
    value: function tweenToItem(index) {
      var duration = arguments.length <= 1 || arguments[1] === undefined ? 1 : arguments[1];

      this.scroller.tweenTo(duration, this.getPositionByItemIndex(index));
    }

    /**
     * @private
     */

  }, {
    key: '_setPosition',
    value: function _setPosition(position) {
      this.position = position;
      this.grp[this.p.xy] = this.bounds[this.p.xy] + position;
      if (this.o.autocull) this.cull();
    }

    /**
     * @private
     */

  }, {
    key: '_addMask',
    value: function _addMask(bounds) {
      var mask = this.game.add.graphics(0, 0, this.parent);
      mask.beginFill(0xff0000).drawRect(bounds.x, bounds.y, bounds.width, bounds.height);
      mask.alpha = 0;
      return mask;
    }
  }]);

  return ListViewCore;
}();

exports.default = ListViewCore;

/***/ }),
/* 138 */
/*!*******************************************************************!*\
  !*** ./node_modules/phaser-list-view/lib/directional_scroller.js ***!
  \*******************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _math_utils = __webpack_require__(/*! ./utils/math_utils */ 65);

var _math_utils2 = _interopRequireDefault(_math_utils);

var _scroller = __webpack_require__(/*! ./scroller */ 96);

var _scroller2 = _interopRequireDefault(_scroller);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var DirectionalScroller = function (_Scroller) {
  _inherits(DirectionalScroller, _Scroller);

  function DirectionalScroller(game, clickObject) {
    var options = arguments.length <= 2 || arguments[2] === undefined ? {} : arguments[2];

    _classCallCheck(this, DirectionalScroller);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(DirectionalScroller).call(this, game, clickObject, { x: clickObject.width, y: clickObject.height }, options));
  }

  _createClass(DirectionalScroller, [{
    key: 'handleDown',
    value: function handleDown(target, pointer) {
      this.old = this.down = pointer[this.o.direction];
      _get(Object.getPrototypeOf(DirectionalScroller.prototype), 'handleDown', this).call(this, target, pointer);
    }
  }, {
    key: 'handleUp',
    value: function handleUp(target, pointer) {
      this.current = pointer[this.o.direction];
      _get(Object.getPrototypeOf(DirectionalScroller.prototype), 'handleUp', this).call(this, target, pointer);
    }
  }]);

  return DirectionalScroller;
}(_scroller2.default);

exports.default = DirectionalScroller;

/***/ }),
/* 139 */
/*!******************************************!*\
  !*** multi babel-polyfill ./src/main.js ***!
  \******************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! babel-polyfill */140);
module.exports = __webpack_require__(/*! D:\Work\Guru\WordBattle\familytree\src\main.js */342);


/***/ }),
/* 140 */
/*!**************************************************!*\
  !*** ./node_modules/babel-polyfill/lib/index.js ***!
  \**************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {

__webpack_require__(/*! core-js/shim */ 141);

__webpack_require__(/*! regenerator-runtime/runtime */ 338);

__webpack_require__(/*! core-js/fn/regexp/escape */ 339);

if (global._babelPolyfill) {
  throw new Error("only one instance of babel-polyfill is allowed");
}
global._babelPolyfill = true;

var DEFINE_PROPERTY = "defineProperty";
function define(O, key, value) {
  O[key] || Object[DEFINE_PROPERTY](O, key, {
    writable: true,
    configurable: true,
    value: value
  });
}

define(String.prototype, "padLeft", "".padStart);
define(String.prototype, "padRight", "".padEnd);

"pop,reverse,shift,keys,values,entries,indexOf,every,some,forEach,map,filter,find,findIndex,includes,join,slice,concat,push,splice,unshift,sort,lastIndexOf,reduce,reduceRight,copyWithin,fill".split(",").forEach(function (key) {
  [][key] && define(Array, key, Function.call.bind([][key]));
});
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(/*! ./../../webpack/buildin/global.js */ 47)))

/***/ }),
/* 141 */
/*!**************************************!*\
  !*** ./node_modules/core-js/shim.js ***!
  \**************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! ./modules/es6.symbol */ 142);
__webpack_require__(/*! ./modules/es6.object.create */ 144);
__webpack_require__(/*! ./modules/es6.object.define-property */ 145);
__webpack_require__(/*! ./modules/es6.object.define-properties */ 146);
__webpack_require__(/*! ./modules/es6.object.get-own-property-descriptor */ 147);
__webpack_require__(/*! ./modules/es6.object.get-prototype-of */ 148);
__webpack_require__(/*! ./modules/es6.object.keys */ 149);
__webpack_require__(/*! ./modules/es6.object.get-own-property-names */ 150);
__webpack_require__(/*! ./modules/es6.object.freeze */ 151);
__webpack_require__(/*! ./modules/es6.object.seal */ 152);
__webpack_require__(/*! ./modules/es6.object.prevent-extensions */ 153);
__webpack_require__(/*! ./modules/es6.object.is-frozen */ 154);
__webpack_require__(/*! ./modules/es6.object.is-sealed */ 155);
__webpack_require__(/*! ./modules/es6.object.is-extensible */ 156);
__webpack_require__(/*! ./modules/es6.object.assign */ 157);
__webpack_require__(/*! ./modules/es6.object.is */ 158);
__webpack_require__(/*! ./modules/es6.object.set-prototype-of */ 160);
__webpack_require__(/*! ./modules/es6.object.to-string */ 161);
__webpack_require__(/*! ./modules/es6.function.bind */ 162);
__webpack_require__(/*! ./modules/es6.function.name */ 163);
__webpack_require__(/*! ./modules/es6.function.has-instance */ 164);
__webpack_require__(/*! ./modules/es6.parse-int */ 165);
__webpack_require__(/*! ./modules/es6.parse-float */ 166);
__webpack_require__(/*! ./modules/es6.number.constructor */ 167);
__webpack_require__(/*! ./modules/es6.number.to-fixed */ 168);
__webpack_require__(/*! ./modules/es6.number.to-precision */ 169);
__webpack_require__(/*! ./modules/es6.number.epsilon */ 170);
__webpack_require__(/*! ./modules/es6.number.is-finite */ 171);
__webpack_require__(/*! ./modules/es6.number.is-integer */ 172);
__webpack_require__(/*! ./modules/es6.number.is-nan */ 173);
__webpack_require__(/*! ./modules/es6.number.is-safe-integer */ 174);
__webpack_require__(/*! ./modules/es6.number.max-safe-integer */ 175);
__webpack_require__(/*! ./modules/es6.number.min-safe-integer */ 176);
__webpack_require__(/*! ./modules/es6.number.parse-float */ 177);
__webpack_require__(/*! ./modules/es6.number.parse-int */ 178);
__webpack_require__(/*! ./modules/es6.math.acosh */ 179);
__webpack_require__(/*! ./modules/es6.math.asinh */ 180);
__webpack_require__(/*! ./modules/es6.math.atanh */ 181);
__webpack_require__(/*! ./modules/es6.math.cbrt */ 182);
__webpack_require__(/*! ./modules/es6.math.clz32 */ 183);
__webpack_require__(/*! ./modules/es6.math.cosh */ 184);
__webpack_require__(/*! ./modules/es6.math.expm1 */ 185);
__webpack_require__(/*! ./modules/es6.math.fround */ 186);
__webpack_require__(/*! ./modules/es6.math.hypot */ 187);
__webpack_require__(/*! ./modules/es6.math.imul */ 188);
__webpack_require__(/*! ./modules/es6.math.log10 */ 189);
__webpack_require__(/*! ./modules/es6.math.log1p */ 190);
__webpack_require__(/*! ./modules/es6.math.log2 */ 191);
__webpack_require__(/*! ./modules/es6.math.sign */ 192);
__webpack_require__(/*! ./modules/es6.math.sinh */ 193);
__webpack_require__(/*! ./modules/es6.math.tanh */ 194);
__webpack_require__(/*! ./modules/es6.math.trunc */ 195);
__webpack_require__(/*! ./modules/es6.string.from-code-point */ 196);
__webpack_require__(/*! ./modules/es6.string.raw */ 197);
__webpack_require__(/*! ./modules/es6.string.trim */ 198);
__webpack_require__(/*! ./modules/es6.string.iterator */ 199);
__webpack_require__(/*! ./modules/es6.string.code-point-at */ 200);
__webpack_require__(/*! ./modules/es6.string.ends-with */ 201);
__webpack_require__(/*! ./modules/es6.string.includes */ 202);
__webpack_require__(/*! ./modules/es6.string.repeat */ 203);
__webpack_require__(/*! ./modules/es6.string.starts-with */ 204);
__webpack_require__(/*! ./modules/es6.string.anchor */ 205);
__webpack_require__(/*! ./modules/es6.string.big */ 206);
__webpack_require__(/*! ./modules/es6.string.blink */ 207);
__webpack_require__(/*! ./modules/es6.string.bold */ 208);
__webpack_require__(/*! ./modules/es6.string.fixed */ 209);
__webpack_require__(/*! ./modules/es6.string.fontcolor */ 210);
__webpack_require__(/*! ./modules/es6.string.fontsize */ 211);
__webpack_require__(/*! ./modules/es6.string.italics */ 212);
__webpack_require__(/*! ./modules/es6.string.link */ 213);
__webpack_require__(/*! ./modules/es6.string.small */ 214);
__webpack_require__(/*! ./modules/es6.string.strike */ 215);
__webpack_require__(/*! ./modules/es6.string.sub */ 216);
__webpack_require__(/*! ./modules/es6.string.sup */ 217);
__webpack_require__(/*! ./modules/es6.date.now */ 218);
__webpack_require__(/*! ./modules/es6.date.to-json */ 219);
__webpack_require__(/*! ./modules/es6.date.to-iso-string */ 220);
__webpack_require__(/*! ./modules/es6.date.to-string */ 222);
__webpack_require__(/*! ./modules/es6.date.to-primitive */ 223);
__webpack_require__(/*! ./modules/es6.array.is-array */ 225);
__webpack_require__(/*! ./modules/es6.array.from */ 226);
__webpack_require__(/*! ./modules/es6.array.of */ 227);
__webpack_require__(/*! ./modules/es6.array.join */ 228);
__webpack_require__(/*! ./modules/es6.array.slice */ 229);
__webpack_require__(/*! ./modules/es6.array.sort */ 230);
__webpack_require__(/*! ./modules/es6.array.for-each */ 231);
__webpack_require__(/*! ./modules/es6.array.map */ 233);
__webpack_require__(/*! ./modules/es6.array.filter */ 234);
__webpack_require__(/*! ./modules/es6.array.some */ 235);
__webpack_require__(/*! ./modules/es6.array.every */ 236);
__webpack_require__(/*! ./modules/es6.array.reduce */ 237);
__webpack_require__(/*! ./modules/es6.array.reduce-right */ 238);
__webpack_require__(/*! ./modules/es6.array.index-of */ 239);
__webpack_require__(/*! ./modules/es6.array.last-index-of */ 240);
__webpack_require__(/*! ./modules/es6.array.copy-within */ 241);
__webpack_require__(/*! ./modules/es6.array.fill */ 242);
__webpack_require__(/*! ./modules/es6.array.find */ 243);
__webpack_require__(/*! ./modules/es6.array.find-index */ 244);
__webpack_require__(/*! ./modules/es6.array.species */ 245);
__webpack_require__(/*! ./modules/es6.array.iterator */ 88);
__webpack_require__(/*! ./modules/es6.regexp.constructor */ 246);
__webpack_require__(/*! ./modules/es6.regexp.to-string */ 247);
__webpack_require__(/*! ./modules/es6.regexp.flags */ 115);
__webpack_require__(/*! ./modules/es6.regexp.match */ 248);
__webpack_require__(/*! ./modules/es6.regexp.replace */ 249);
__webpack_require__(/*! ./modules/es6.regexp.search */ 250);
__webpack_require__(/*! ./modules/es6.regexp.split */ 251);
__webpack_require__(/*! ./modules/es6.promise */ 252);
__webpack_require__(/*! ./modules/es6.map */ 118);
__webpack_require__(/*! ./modules/es6.set */ 120);
__webpack_require__(/*! ./modules/es6.weak-map */ 121);
__webpack_require__(/*! ./modules/es6.weak-set */ 253);
__webpack_require__(/*! ./modules/es6.typed.array-buffer */ 254);
__webpack_require__(/*! ./modules/es6.typed.data-view */ 255);
__webpack_require__(/*! ./modules/es6.typed.int8-array */ 256);
__webpack_require__(/*! ./modules/es6.typed.uint8-array */ 257);
__webpack_require__(/*! ./modules/es6.typed.uint8-clamped-array */ 258);
__webpack_require__(/*! ./modules/es6.typed.int16-array */ 259);
__webpack_require__(/*! ./modules/es6.typed.uint16-array */ 260);
__webpack_require__(/*! ./modules/es6.typed.int32-array */ 261);
__webpack_require__(/*! ./modules/es6.typed.uint32-array */ 262);
__webpack_require__(/*! ./modules/es6.typed.float32-array */ 263);
__webpack_require__(/*! ./modules/es6.typed.float64-array */ 264);
__webpack_require__(/*! ./modules/es6.reflect.apply */ 265);
__webpack_require__(/*! ./modules/es6.reflect.construct */ 266);
__webpack_require__(/*! ./modules/es6.reflect.define-property */ 267);
__webpack_require__(/*! ./modules/es6.reflect.delete-property */ 268);
__webpack_require__(/*! ./modules/es6.reflect.enumerate */ 269);
__webpack_require__(/*! ./modules/es6.reflect.get */ 270);
__webpack_require__(/*! ./modules/es6.reflect.get-own-property-descriptor */ 271);
__webpack_require__(/*! ./modules/es6.reflect.get-prototype-of */ 272);
__webpack_require__(/*! ./modules/es6.reflect.has */ 273);
__webpack_require__(/*! ./modules/es6.reflect.is-extensible */ 274);
__webpack_require__(/*! ./modules/es6.reflect.own-keys */ 275);
__webpack_require__(/*! ./modules/es6.reflect.prevent-extensions */ 276);
__webpack_require__(/*! ./modules/es6.reflect.set */ 277);
__webpack_require__(/*! ./modules/es6.reflect.set-prototype-of */ 278);
__webpack_require__(/*! ./modules/es7.array.includes */ 279);
__webpack_require__(/*! ./modules/es7.array.flat-map */ 280);
__webpack_require__(/*! ./modules/es7.array.flatten */ 281);
__webpack_require__(/*! ./modules/es7.string.at */ 282);
__webpack_require__(/*! ./modules/es7.string.pad-start */ 283);
__webpack_require__(/*! ./modules/es7.string.pad-end */ 284);
__webpack_require__(/*! ./modules/es7.string.trim-left */ 285);
__webpack_require__(/*! ./modules/es7.string.trim-right */ 286);
__webpack_require__(/*! ./modules/es7.string.match-all */ 287);
__webpack_require__(/*! ./modules/es7.symbol.async-iterator */ 288);
__webpack_require__(/*! ./modules/es7.symbol.observable */ 289);
__webpack_require__(/*! ./modules/es7.object.get-own-property-descriptors */ 290);
__webpack_require__(/*! ./modules/es7.object.values */ 291);
__webpack_require__(/*! ./modules/es7.object.entries */ 292);
__webpack_require__(/*! ./modules/es7.object.define-getter */ 293);
__webpack_require__(/*! ./modules/es7.object.define-setter */ 294);
__webpack_require__(/*! ./modules/es7.object.lookup-getter */ 295);
__webpack_require__(/*! ./modules/es7.object.lookup-setter */ 296);
__webpack_require__(/*! ./modules/es7.map.to-json */ 297);
__webpack_require__(/*! ./modules/es7.set.to-json */ 298);
__webpack_require__(/*! ./modules/es7.map.of */ 299);
__webpack_require__(/*! ./modules/es7.set.of */ 300);
__webpack_require__(/*! ./modules/es7.weak-map.of */ 301);
__webpack_require__(/*! ./modules/es7.weak-set.of */ 302);
__webpack_require__(/*! ./modules/es7.map.from */ 303);
__webpack_require__(/*! ./modules/es7.set.from */ 304);
__webpack_require__(/*! ./modules/es7.weak-map.from */ 305);
__webpack_require__(/*! ./modules/es7.weak-set.from */ 306);
__webpack_require__(/*! ./modules/es7.global */ 307);
__webpack_require__(/*! ./modules/es7.system.global */ 308);
__webpack_require__(/*! ./modules/es7.error.is-error */ 309);
__webpack_require__(/*! ./modules/es7.math.clamp */ 310);
__webpack_require__(/*! ./modules/es7.math.deg-per-rad */ 311);
__webpack_require__(/*! ./modules/es7.math.degrees */ 312);
__webpack_require__(/*! ./modules/es7.math.fscale */ 313);
__webpack_require__(/*! ./modules/es7.math.iaddh */ 314);
__webpack_require__(/*! ./modules/es7.math.isubh */ 315);
__webpack_require__(/*! ./modules/es7.math.imulh */ 316);
__webpack_require__(/*! ./modules/es7.math.rad-per-deg */ 317);
__webpack_require__(/*! ./modules/es7.math.radians */ 318);
__webpack_require__(/*! ./modules/es7.math.scale */ 319);
__webpack_require__(/*! ./modules/es7.math.umulh */ 320);
__webpack_require__(/*! ./modules/es7.math.signbit */ 321);
__webpack_require__(/*! ./modules/es7.promise.finally */ 322);
__webpack_require__(/*! ./modules/es7.promise.try */ 323);
__webpack_require__(/*! ./modules/es7.reflect.define-metadata */ 324);
__webpack_require__(/*! ./modules/es7.reflect.delete-metadata */ 325);
__webpack_require__(/*! ./modules/es7.reflect.get-metadata */ 326);
__webpack_require__(/*! ./modules/es7.reflect.get-metadata-keys */ 327);
__webpack_require__(/*! ./modules/es7.reflect.get-own-metadata */ 328);
__webpack_require__(/*! ./modules/es7.reflect.get-own-metadata-keys */ 329);
__webpack_require__(/*! ./modules/es7.reflect.has-metadata */ 330);
__webpack_require__(/*! ./modules/es7.reflect.has-own-metadata */ 331);
__webpack_require__(/*! ./modules/es7.reflect.metadata */ 332);
__webpack_require__(/*! ./modules/es7.asap */ 333);
__webpack_require__(/*! ./modules/es7.observable */ 334);
__webpack_require__(/*! ./modules/web.timers */ 335);
__webpack_require__(/*! ./modules/web.immediate */ 336);
__webpack_require__(/*! ./modules/web.dom.iterable */ 337);
module.exports = __webpack_require__(/*! ./modules/_core */ 21);


/***/ }),
/* 142 */
/*!****************************************************!*\
  !*** ./node_modules/core-js/modules/es6.symbol.js ***!
  \****************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// ECMAScript 6 symbols shim
var global = __webpack_require__(/*! ./_global */ 2);
var has = __webpack_require__(/*! ./_has */ 11);
var DESCRIPTORS = __webpack_require__(/*! ./_descriptors */ 6);
var $export = __webpack_require__(/*! ./_export */ 0);
var redefine = __webpack_require__(/*! ./_redefine */ 13);
var META = __webpack_require__(/*! ./_meta */ 30).KEY;
var $fails = __webpack_require__(/*! ./_fails */ 3);
var shared = __webpack_require__(/*! ./_shared */ 51);
var setToStringTag = __webpack_require__(/*! ./_set-to-string-tag */ 43);
var uid = __webpack_require__(/*! ./_uid */ 33);
var wks = __webpack_require__(/*! ./_wks */ 5);
var wksExt = __webpack_require__(/*! ./_wks-ext */ 98);
var wksDefine = __webpack_require__(/*! ./_wks-define */ 68);
var enumKeys = __webpack_require__(/*! ./_enum-keys */ 143);
var isArray = __webpack_require__(/*! ./_is-array */ 54);
var anObject = __webpack_require__(/*! ./_an-object */ 1);
var isObject = __webpack_require__(/*! ./_is-object */ 4);
var toIObject = __webpack_require__(/*! ./_to-iobject */ 15);
var toPrimitive = __webpack_require__(/*! ./_to-primitive */ 22);
var createDesc = __webpack_require__(/*! ./_property-desc */ 32);
var _create = __webpack_require__(/*! ./_object-create */ 37);
var gOPNExt = __webpack_require__(/*! ./_object-gopn-ext */ 101);
var $GOPD = __webpack_require__(/*! ./_object-gopd */ 16);
var $DP = __webpack_require__(/*! ./_object-dp */ 7);
var $keys = __webpack_require__(/*! ./_object-keys */ 35);
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
  __webpack_require__(/*! ./_object-gopn */ 38).f = gOPNExt.f = $getOwnPropertyNames;
  __webpack_require__(/*! ./_object-pie */ 49).f = $propertyIsEnumerable;
  __webpack_require__(/*! ./_object-gops */ 53).f = $getOwnPropertySymbols;

  if (DESCRIPTORS && !__webpack_require__(/*! ./_library */ 34)) {
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
  keyFor: function keyFor(sym) {
    if (!isSymbol(sym)) throw TypeError(sym + ' is not a symbol!');
    for (var key in SymbolRegistry) if (SymbolRegistry[key] === sym) return key;
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
    var args = [it];
    var i = 1;
    var replacer, $replacer;
    while (arguments.length > i) args.push(arguments[i++]);
    $replacer = replacer = args[1];
    if (!isObject(replacer) && it === undefined || isSymbol(it)) return; // IE8 returns string on undefined
    if (!isArray(replacer)) replacer = function (key, value) {
      if (typeof $replacer == 'function') value = $replacer.call(this, key, value);
      if (!isSymbol(value)) return value;
    };
    args[1] = replacer;
    return _stringify.apply($JSON, args);
  }
});

// 19.4.3.4 Symbol.prototype[@@toPrimitive](hint)
$Symbol[PROTOTYPE][TO_PRIMITIVE] || __webpack_require__(/*! ./_hide */ 12)($Symbol[PROTOTYPE], TO_PRIMITIVE, $Symbol[PROTOTYPE].valueOf);
// 19.4.3.5 Symbol.prototype[@@toStringTag]
setToStringTag($Symbol, 'Symbol');
// 20.2.1.9 Math[@@toStringTag]
setToStringTag(Math, 'Math', true);
// 24.3.3 JSON[@@toStringTag]
setToStringTag(global.JSON, 'JSON', true);


/***/ }),
/* 143 */
/*!****************************************************!*\
  !*** ./node_modules/core-js/modules/_enum-keys.js ***!
  \****************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// all enumerable object keys, includes symbols
var getKeys = __webpack_require__(/*! ./_object-keys */ 35);
var gOPS = __webpack_require__(/*! ./_object-gops */ 53);
var pIE = __webpack_require__(/*! ./_object-pie */ 49);
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
/* 144 */
/*!***********************************************************!*\
  !*** ./node_modules/core-js/modules/es6.object.create.js ***!
  \***********************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__(/*! ./_export */ 0);
// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
$export($export.S, 'Object', { create: __webpack_require__(/*! ./_object-create */ 37) });


/***/ }),
/* 145 */
/*!********************************************************************!*\
  !*** ./node_modules/core-js/modules/es6.object.define-property.js ***!
  \********************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__(/*! ./_export */ 0);
// 19.1.2.4 / 15.2.3.6 Object.defineProperty(O, P, Attributes)
$export($export.S + $export.F * !__webpack_require__(/*! ./_descriptors */ 6), 'Object', { defineProperty: __webpack_require__(/*! ./_object-dp */ 7).f });


/***/ }),
/* 146 */
/*!**********************************************************************!*\
  !*** ./node_modules/core-js/modules/es6.object.define-properties.js ***!
  \**********************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__(/*! ./_export */ 0);
// 19.1.2.3 / 15.2.3.7 Object.defineProperties(O, Properties)
$export($export.S + $export.F * !__webpack_require__(/*! ./_descriptors */ 6), 'Object', { defineProperties: __webpack_require__(/*! ./_object-dps */ 100) });


/***/ }),
/* 147 */
/*!********************************************************************************!*\
  !*** ./node_modules/core-js/modules/es6.object.get-own-property-descriptor.js ***!
  \********************************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.6 Object.getOwnPropertyDescriptor(O, P)
var toIObject = __webpack_require__(/*! ./_to-iobject */ 15);
var $getOwnPropertyDescriptor = __webpack_require__(/*! ./_object-gopd */ 16).f;

__webpack_require__(/*! ./_object-sap */ 25)('getOwnPropertyDescriptor', function () {
  return function getOwnPropertyDescriptor(it, key) {
    return $getOwnPropertyDescriptor(toIObject(it), key);
  };
});


/***/ }),
/* 148 */
/*!*********************************************************************!*\
  !*** ./node_modules/core-js/modules/es6.object.get-prototype-of.js ***!
  \*********************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.9 Object.getPrototypeOf(O)
var toObject = __webpack_require__(/*! ./_to-object */ 9);
var $getPrototypeOf = __webpack_require__(/*! ./_object-gpo */ 17);

__webpack_require__(/*! ./_object-sap */ 25)('getPrototypeOf', function () {
  return function getPrototypeOf(it) {
    return $getPrototypeOf(toObject(it));
  };
});


/***/ }),
/* 149 */
/*!*********************************************************!*\
  !*** ./node_modules/core-js/modules/es6.object.keys.js ***!
  \*********************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.14 Object.keys(O)
var toObject = __webpack_require__(/*! ./_to-object */ 9);
var $keys = __webpack_require__(/*! ./_object-keys */ 35);

__webpack_require__(/*! ./_object-sap */ 25)('keys', function () {
  return function keys(it) {
    return $keys(toObject(it));
  };
});


/***/ }),
/* 150 */
/*!***************************************************************************!*\
  !*** ./node_modules/core-js/modules/es6.object.get-own-property-names.js ***!
  \***************************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.7 Object.getOwnPropertyNames(O)
__webpack_require__(/*! ./_object-sap */ 25)('getOwnPropertyNames', function () {
  return __webpack_require__(/*! ./_object-gopn-ext */ 101).f;
});


/***/ }),
/* 151 */
/*!***********************************************************!*\
  !*** ./node_modules/core-js/modules/es6.object.freeze.js ***!
  \***********************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.5 Object.freeze(O)
var isObject = __webpack_require__(/*! ./_is-object */ 4);
var meta = __webpack_require__(/*! ./_meta */ 30).onFreeze;

__webpack_require__(/*! ./_object-sap */ 25)('freeze', function ($freeze) {
  return function freeze(it) {
    return $freeze && isObject(it) ? $freeze(meta(it)) : it;
  };
});


/***/ }),
/* 152 */
/*!*********************************************************!*\
  !*** ./node_modules/core-js/modules/es6.object.seal.js ***!
  \*********************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.17 Object.seal(O)
var isObject = __webpack_require__(/*! ./_is-object */ 4);
var meta = __webpack_require__(/*! ./_meta */ 30).onFreeze;

__webpack_require__(/*! ./_object-sap */ 25)('seal', function ($seal) {
  return function seal(it) {
    return $seal && isObject(it) ? $seal(meta(it)) : it;
  };
});


/***/ }),
/* 153 */
/*!***********************************************************************!*\
  !*** ./node_modules/core-js/modules/es6.object.prevent-extensions.js ***!
  \***********************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.15 Object.preventExtensions(O)
var isObject = __webpack_require__(/*! ./_is-object */ 4);
var meta = __webpack_require__(/*! ./_meta */ 30).onFreeze;

__webpack_require__(/*! ./_object-sap */ 25)('preventExtensions', function ($preventExtensions) {
  return function preventExtensions(it) {
    return $preventExtensions && isObject(it) ? $preventExtensions(meta(it)) : it;
  };
});


/***/ }),
/* 154 */
/*!**************************************************************!*\
  !*** ./node_modules/core-js/modules/es6.object.is-frozen.js ***!
  \**************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.12 Object.isFrozen(O)
var isObject = __webpack_require__(/*! ./_is-object */ 4);

__webpack_require__(/*! ./_object-sap */ 25)('isFrozen', function ($isFrozen) {
  return function isFrozen(it) {
    return isObject(it) ? $isFrozen ? $isFrozen(it) : false : true;
  };
});


/***/ }),
/* 155 */
/*!**************************************************************!*\
  !*** ./node_modules/core-js/modules/es6.object.is-sealed.js ***!
  \**************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.13 Object.isSealed(O)
var isObject = __webpack_require__(/*! ./_is-object */ 4);

__webpack_require__(/*! ./_object-sap */ 25)('isSealed', function ($isSealed) {
  return function isSealed(it) {
    return isObject(it) ? $isSealed ? $isSealed(it) : false : true;
  };
});


/***/ }),
/* 156 */
/*!******************************************************************!*\
  !*** ./node_modules/core-js/modules/es6.object.is-extensible.js ***!
  \******************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.11 Object.isExtensible(O)
var isObject = __webpack_require__(/*! ./_is-object */ 4);

__webpack_require__(/*! ./_object-sap */ 25)('isExtensible', function ($isExtensible) {
  return function isExtensible(it) {
    return isObject(it) ? $isExtensible ? $isExtensible(it) : true : false;
  };
});


/***/ }),
/* 157 */
/*!***********************************************************!*\
  !*** ./node_modules/core-js/modules/es6.object.assign.js ***!
  \***********************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.3.1 Object.assign(target, source)
var $export = __webpack_require__(/*! ./_export */ 0);

$export($export.S + $export.F, 'Object', { assign: __webpack_require__(/*! ./_object-assign */ 102) });


/***/ }),
/* 158 */
/*!*******************************************************!*\
  !*** ./node_modules/core-js/modules/es6.object.is.js ***!
  \*******************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.3.10 Object.is(value1, value2)
var $export = __webpack_require__(/*! ./_export */ 0);
$export($export.S, 'Object', { is: __webpack_require__(/*! ./_same-value */ 159) });


/***/ }),
/* 159 */
/*!*****************************************************!*\
  !*** ./node_modules/core-js/modules/_same-value.js ***!
  \*****************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports) {

// 7.2.9 SameValue(x, y)
module.exports = Object.is || function is(x, y) {
  // eslint-disable-next-line no-self-compare
  return x === y ? x !== 0 || 1 / x === 1 / y : x != x && y != y;
};


/***/ }),
/* 160 */
/*!*********************************************************************!*\
  !*** ./node_modules/core-js/modules/es6.object.set-prototype-of.js ***!
  \*********************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.3.19 Object.setPrototypeOf(O, proto)
var $export = __webpack_require__(/*! ./_export */ 0);
$export($export.S, 'Object', { setPrototypeOf: __webpack_require__(/*! ./_set-proto */ 72).set });


/***/ }),
/* 161 */
/*!**************************************************************!*\
  !*** ./node_modules/core-js/modules/es6.object.to-string.js ***!
  \**************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// 19.1.3.6 Object.prototype.toString()
var classof = __webpack_require__(/*! ./_classof */ 50);
var test = {};
test[__webpack_require__(/*! ./_wks */ 5)('toStringTag')] = 'z';
if (test + '' != '[object z]') {
  __webpack_require__(/*! ./_redefine */ 13)(Object.prototype, 'toString', function toString() {
    return '[object ' + classof(this) + ']';
  }, true);
}


/***/ }),
/* 162 */
/*!***********************************************************!*\
  !*** ./node_modules/core-js/modules/es6.function.bind.js ***!
  \***********************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// 19.2.3.2 / 15.3.4.5 Function.prototype.bind(thisArg, args...)
var $export = __webpack_require__(/*! ./_export */ 0);

$export($export.P, 'Function', { bind: __webpack_require__(/*! ./_bind */ 103) });


/***/ }),
/* 163 */
/*!***********************************************************!*\
  !*** ./node_modules/core-js/modules/es6.function.name.js ***!
  \***********************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

var dP = __webpack_require__(/*! ./_object-dp */ 7).f;
var FProto = Function.prototype;
var nameRE = /^\s*function ([^ (]*)/;
var NAME = 'name';

// 19.2.4.2 name
NAME in FProto || __webpack_require__(/*! ./_descriptors */ 6) && dP(FProto, NAME, {
  configurable: true,
  get: function () {
    try {
      return ('' + this).match(nameRE)[1];
    } catch (e) {
      return '';
    }
  }
});


/***/ }),
/* 164 */
/*!*******************************************************************!*\
  !*** ./node_modules/core-js/modules/es6.function.has-instance.js ***!
  \*******************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var isObject = __webpack_require__(/*! ./_is-object */ 4);
var getPrototypeOf = __webpack_require__(/*! ./_object-gpo */ 17);
var HAS_INSTANCE = __webpack_require__(/*! ./_wks */ 5)('hasInstance');
var FunctionProto = Function.prototype;
// 19.2.3.6 Function.prototype[@@hasInstance](V)
if (!(HAS_INSTANCE in FunctionProto)) __webpack_require__(/*! ./_object-dp */ 7).f(FunctionProto, HAS_INSTANCE, { value: function (O) {
  if (typeof this != 'function' || !isObject(O)) return false;
  if (!isObject(this.prototype)) return O instanceof this;
  // for environment w/o native `@@hasInstance` logic enough `instanceof`, but add this:
  while (O = getPrototypeOf(O)) if (this.prototype === O) return true;
  return false;
} });


/***/ }),
/* 165 */
/*!*******************************************************!*\
  !*** ./node_modules/core-js/modules/es6.parse-int.js ***!
  \*******************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__(/*! ./_export */ 0);
var $parseInt = __webpack_require__(/*! ./_parse-int */ 105);
// 18.2.5 parseInt(string, radix)
$export($export.G + $export.F * (parseInt != $parseInt), { parseInt: $parseInt });


/***/ }),
/* 166 */
/*!*********************************************************!*\
  !*** ./node_modules/core-js/modules/es6.parse-float.js ***!
  \*********************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__(/*! ./_export */ 0);
var $parseFloat = __webpack_require__(/*! ./_parse-float */ 106);
// 18.2.4 parseFloat(string)
$export($export.G + $export.F * (parseFloat != $parseFloat), { parseFloat: $parseFloat });


/***/ }),
/* 167 */
/*!****************************************************************!*\
  !*** ./node_modules/core-js/modules/es6.number.constructor.js ***!
  \****************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var global = __webpack_require__(/*! ./_global */ 2);
var has = __webpack_require__(/*! ./_has */ 11);
var cof = __webpack_require__(/*! ./_cof */ 19);
var inheritIfRequired = __webpack_require__(/*! ./_inherit-if-required */ 74);
var toPrimitive = __webpack_require__(/*! ./_to-primitive */ 22);
var fails = __webpack_require__(/*! ./_fails */ 3);
var gOPN = __webpack_require__(/*! ./_object-gopn */ 38).f;
var gOPD = __webpack_require__(/*! ./_object-gopd */ 16).f;
var dP = __webpack_require__(/*! ./_object-dp */ 7).f;
var $trim = __webpack_require__(/*! ./_string-trim */ 44).trim;
var NUMBER = 'Number';
var $Number = global[NUMBER];
var Base = $Number;
var proto = $Number.prototype;
// Opera ~12 has broken Object#toString
var BROKEN_COF = cof(__webpack_require__(/*! ./_object-create */ 37)(proto)) == NUMBER;
var TRIM = 'trim' in String.prototype;

// 7.1.3 ToNumber(argument)
var toNumber = function (argument) {
  var it = toPrimitive(argument, false);
  if (typeof it == 'string' && it.length > 2) {
    it = TRIM ? it.trim() : $trim(it, 3);
    var first = it.charCodeAt(0);
    var third, radix, maxCode;
    if (first === 43 || first === 45) {
      third = it.charCodeAt(2);
      if (third === 88 || third === 120) return NaN; // Number('+0x1') should be NaN, old V8 fix
    } else if (first === 48) {
      switch (it.charCodeAt(1)) {
        case 66: case 98: radix = 2; maxCode = 49; break; // fast equal /^0b[01]+$/i
        case 79: case 111: radix = 8; maxCode = 55; break; // fast equal /^0o[0-7]+$/i
        default: return +it;
      }
      for (var digits = it.slice(2), i = 0, l = digits.length, code; i < l; i++) {
        code = digits.charCodeAt(i);
        // parseInt parses a string to a first unavailable symbol
        // but ToNumber should return NaN if a string contains unavailable symbols
        if (code < 48 || code > maxCode) return NaN;
      } return parseInt(digits, radix);
    }
  } return +it;
};

if (!$Number(' 0o1') || !$Number('0b1') || $Number('+0x1')) {
  $Number = function Number(value) {
    var it = arguments.length < 1 ? 0 : value;
    var that = this;
    return that instanceof $Number
      // check on 1..constructor(foo) case
      && (BROKEN_COF ? fails(function () { proto.valueOf.call(that); }) : cof(that) != NUMBER)
        ? inheritIfRequired(new Base(toNumber(it)), that, $Number) : toNumber(it);
  };
  for (var keys = __webpack_require__(/*! ./_descriptors */ 6) ? gOPN(Base) : (
    // ES3:
    'MAX_VALUE,MIN_VALUE,NaN,NEGATIVE_INFINITY,POSITIVE_INFINITY,' +
    // ES6 (in case, if modules with ES6 Number statics required before):
    'EPSILON,isFinite,isInteger,isNaN,isSafeInteger,MAX_SAFE_INTEGER,' +
    'MIN_SAFE_INTEGER,parseFloat,parseInt,isInteger'
  ).split(','), j = 0, key; keys.length > j; j++) {
    if (has(Base, key = keys[j]) && !has($Number, key)) {
      dP($Number, key, gOPD(Base, key));
    }
  }
  $Number.prototype = proto;
  proto.constructor = $Number;
  __webpack_require__(/*! ./_redefine */ 13)(global, NUMBER, $Number);
}


/***/ }),
/* 168 */
/*!*************************************************************!*\
  !*** ./node_modules/core-js/modules/es6.number.to-fixed.js ***!
  \*************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export = __webpack_require__(/*! ./_export */ 0);
var toInteger = __webpack_require__(/*! ./_to-integer */ 24);
var aNumberValue = __webpack_require__(/*! ./_a-number-value */ 107);
var repeat = __webpack_require__(/*! ./_string-repeat */ 75);
var $toFixed = 1.0.toFixed;
var floor = Math.floor;
var data = [0, 0, 0, 0, 0, 0];
var ERROR = 'Number.toFixed: incorrect invocation!';
var ZERO = '0';

var multiply = function (n, c) {
  var i = -1;
  var c2 = c;
  while (++i < 6) {
    c2 += n * data[i];
    data[i] = c2 % 1e7;
    c2 = floor(c2 / 1e7);
  }
};
var divide = function (n) {
  var i = 6;
  var c = 0;
  while (--i >= 0) {
    c += data[i];
    data[i] = floor(c / n);
    c = (c % n) * 1e7;
  }
};
var numToString = function () {
  var i = 6;
  var s = '';
  while (--i >= 0) {
    if (s !== '' || i === 0 || data[i] !== 0) {
      var t = String(data[i]);
      s = s === '' ? t : s + repeat.call(ZERO, 7 - t.length) + t;
    }
  } return s;
};
var pow = function (x, n, acc) {
  return n === 0 ? acc : n % 2 === 1 ? pow(x, n - 1, acc * x) : pow(x * x, n / 2, acc);
};
var log = function (x) {
  var n = 0;
  var x2 = x;
  while (x2 >= 4096) {
    n += 12;
    x2 /= 4096;
  }
  while (x2 >= 2) {
    n += 1;
    x2 /= 2;
  } return n;
};

$export($export.P + $export.F * (!!$toFixed && (
  0.00008.toFixed(3) !== '0.000' ||
  0.9.toFixed(0) !== '1' ||
  1.255.toFixed(2) !== '1.25' ||
  1000000000000000128.0.toFixed(0) !== '1000000000000000128'
) || !__webpack_require__(/*! ./_fails */ 3)(function () {
  // V8 ~ Android 4.3-
  $toFixed.call({});
})), 'Number', {
  toFixed: function toFixed(fractionDigits) {
    var x = aNumberValue(this, ERROR);
    var f = toInteger(fractionDigits);
    var s = '';
    var m = ZERO;
    var e, z, j, k;
    if (f < 0 || f > 20) throw RangeError(ERROR);
    // eslint-disable-next-line no-self-compare
    if (x != x) return 'NaN';
    if (x <= -1e21 || x >= 1e21) return String(x);
    if (x < 0) {
      s = '-';
      x = -x;
    }
    if (x > 1e-21) {
      e = log(x * pow(2, 69, 1)) - 69;
      z = e < 0 ? x * pow(2, -e, 1) : x / pow(2, e, 1);
      z *= 0x10000000000000;
      e = 52 - e;
      if (e > 0) {
        multiply(0, z);
        j = f;
        while (j >= 7) {
          multiply(1e7, 0);
          j -= 7;
        }
        multiply(pow(10, j, 1), 0);
        j = e - 1;
        while (j >= 23) {
          divide(1 << 23);
          j -= 23;
        }
        divide(1 << j);
        multiply(1, 1);
        divide(2);
        m = numToString();
      } else {
        multiply(0, z);
        multiply(1 << -e, 0);
        m = numToString() + repeat.call(ZERO, f);
      }
    }
    if (f > 0) {
      k = m.length;
      m = s + (k <= f ? '0.' + repeat.call(ZERO, f - k) + m : m.slice(0, k - f) + '.' + m.slice(k - f));
    } else {
      m = s + m;
    } return m;
  }
});


/***/ }),
/* 169 */
/*!*****************************************************************!*\
  !*** ./node_modules/core-js/modules/es6.number.to-precision.js ***!
  \*****************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export = __webpack_require__(/*! ./_export */ 0);
var $fails = __webpack_require__(/*! ./_fails */ 3);
var aNumberValue = __webpack_require__(/*! ./_a-number-value */ 107);
var $toPrecision = 1.0.toPrecision;

$export($export.P + $export.F * ($fails(function () {
  // IE7-
  return $toPrecision.call(1, undefined) !== '1';
}) || !$fails(function () {
  // V8 ~ Android 4.3-
  $toPrecision.call({});
})), 'Number', {
  toPrecision: function toPrecision(precision) {
    var that = aNumberValue(this, 'Number#toPrecision: incorrect invocation!');
    return precision === undefined ? $toPrecision.call(that) : $toPrecision.call(that, precision);
  }
});


/***/ }),
/* 170 */
/*!************************************************************!*\
  !*** ./node_modules/core-js/modules/es6.number.epsilon.js ***!
  \************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// 20.1.2.1 Number.EPSILON
var $export = __webpack_require__(/*! ./_export */ 0);

$export($export.S, 'Number', { EPSILON: Math.pow(2, -52) });


/***/ }),
/* 171 */
/*!**************************************************************!*\
  !*** ./node_modules/core-js/modules/es6.number.is-finite.js ***!
  \**************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// 20.1.2.2 Number.isFinite(number)
var $export = __webpack_require__(/*! ./_export */ 0);
var _isFinite = __webpack_require__(/*! ./_global */ 2).isFinite;

$export($export.S, 'Number', {
  isFinite: function isFinite(it) {
    return typeof it == 'number' && _isFinite(it);
  }
});


/***/ }),
/* 172 */
/*!***************************************************************!*\
  !*** ./node_modules/core-js/modules/es6.number.is-integer.js ***!
  \***************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// 20.1.2.3 Number.isInteger(number)
var $export = __webpack_require__(/*! ./_export */ 0);

$export($export.S, 'Number', { isInteger: __webpack_require__(/*! ./_is-integer */ 108) });


/***/ }),
/* 173 */
/*!***********************************************************!*\
  !*** ./node_modules/core-js/modules/es6.number.is-nan.js ***!
  \***********************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// 20.1.2.4 Number.isNaN(number)
var $export = __webpack_require__(/*! ./_export */ 0);

$export($export.S, 'Number', {
  isNaN: function isNaN(number) {
    // eslint-disable-next-line no-self-compare
    return number != number;
  }
});


/***/ }),
/* 174 */
/*!********************************************************************!*\
  !*** ./node_modules/core-js/modules/es6.number.is-safe-integer.js ***!
  \********************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// 20.1.2.5 Number.isSafeInteger(number)
var $export = __webpack_require__(/*! ./_export */ 0);
var isInteger = __webpack_require__(/*! ./_is-integer */ 108);
var abs = Math.abs;

$export($export.S, 'Number', {
  isSafeInteger: function isSafeInteger(number) {
    return isInteger(number) && abs(number) <= 0x1fffffffffffff;
  }
});


/***/ }),
/* 175 */
/*!*********************************************************************!*\
  !*** ./node_modules/core-js/modules/es6.number.max-safe-integer.js ***!
  \*********************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// 20.1.2.6 Number.MAX_SAFE_INTEGER
var $export = __webpack_require__(/*! ./_export */ 0);

$export($export.S, 'Number', { MAX_SAFE_INTEGER: 0x1fffffffffffff });


/***/ }),
/* 176 */
/*!*********************************************************************!*\
  !*** ./node_modules/core-js/modules/es6.number.min-safe-integer.js ***!
  \*********************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// 20.1.2.10 Number.MIN_SAFE_INTEGER
var $export = __webpack_require__(/*! ./_export */ 0);

$export($export.S, 'Number', { MIN_SAFE_INTEGER: -0x1fffffffffffff });


/***/ }),
/* 177 */
/*!****************************************************************!*\
  !*** ./node_modules/core-js/modules/es6.number.parse-float.js ***!
  \****************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__(/*! ./_export */ 0);
var $parseFloat = __webpack_require__(/*! ./_parse-float */ 106);
// 20.1.2.12 Number.parseFloat(string)
$export($export.S + $export.F * (Number.parseFloat != $parseFloat), 'Number', { parseFloat: $parseFloat });


/***/ }),
/* 178 */
/*!**************************************************************!*\
  !*** ./node_modules/core-js/modules/es6.number.parse-int.js ***!
  \**************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__(/*! ./_export */ 0);
var $parseInt = __webpack_require__(/*! ./_parse-int */ 105);
// 20.1.2.13 Number.parseInt(string, radix)
$export($export.S + $export.F * (Number.parseInt != $parseInt), 'Number', { parseInt: $parseInt });


/***/ }),
/* 179 */
/*!********************************************************!*\
  !*** ./node_modules/core-js/modules/es6.math.acosh.js ***!
  \********************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// 20.2.2.3 Math.acosh(x)
var $export = __webpack_require__(/*! ./_export */ 0);
var log1p = __webpack_require__(/*! ./_math-log1p */ 109);
var sqrt = Math.sqrt;
var $acosh = Math.acosh;

$export($export.S + $export.F * !($acosh
  // V8 bug: https://code.google.com/p/v8/issues/detail?id=3509
  && Math.floor($acosh(Number.MAX_VALUE)) == 710
  // Tor Browser bug: Math.acosh(Infinity) -> NaN
  && $acosh(Infinity) == Infinity
), 'Math', {
  acosh: function acosh(x) {
    return (x = +x) < 1 ? NaN : x > 94906265.62425156
      ? Math.log(x) + Math.LN2
      : log1p(x - 1 + sqrt(x - 1) * sqrt(x + 1));
  }
});


/***/ }),
/* 180 */
/*!********************************************************!*\
  !*** ./node_modules/core-js/modules/es6.math.asinh.js ***!
  \********************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// 20.2.2.5 Math.asinh(x)
var $export = __webpack_require__(/*! ./_export */ 0);
var $asinh = Math.asinh;

function asinh(x) {
  return !isFinite(x = +x) || x == 0 ? x : x < 0 ? -asinh(-x) : Math.log(x + Math.sqrt(x * x + 1));
}

// Tor Browser bug: Math.asinh(0) -> -0
$export($export.S + $export.F * !($asinh && 1 / $asinh(0) > 0), 'Math', { asinh: asinh });


/***/ }),
/* 181 */
/*!********************************************************!*\
  !*** ./node_modules/core-js/modules/es6.math.atanh.js ***!
  \********************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// 20.2.2.7 Math.atanh(x)
var $export = __webpack_require__(/*! ./_export */ 0);
var $atanh = Math.atanh;

// Tor Browser bug: Math.atanh(-0) -> 0
$export($export.S + $export.F * !($atanh && 1 / $atanh(-0) < 0), 'Math', {
  atanh: function atanh(x) {
    return (x = +x) == 0 ? x : Math.log((1 + x) / (1 - x)) / 2;
  }
});


/***/ }),
/* 182 */
/*!*******************************************************!*\
  !*** ./node_modules/core-js/modules/es6.math.cbrt.js ***!
  \*******************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// 20.2.2.9 Math.cbrt(x)
var $export = __webpack_require__(/*! ./_export */ 0);
var sign = __webpack_require__(/*! ./_math-sign */ 76);

$export($export.S, 'Math', {
  cbrt: function cbrt(x) {
    return sign(x = +x) * Math.pow(Math.abs(x), 1 / 3);
  }
});


/***/ }),
/* 183 */
/*!********************************************************!*\
  !*** ./node_modules/core-js/modules/es6.math.clz32.js ***!
  \********************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// 20.2.2.11 Math.clz32(x)
var $export = __webpack_require__(/*! ./_export */ 0);

$export($export.S, 'Math', {
  clz32: function clz32(x) {
    return (x >>>= 0) ? 31 - Math.floor(Math.log(x + 0.5) * Math.LOG2E) : 32;
  }
});


/***/ }),
/* 184 */
/*!*******************************************************!*\
  !*** ./node_modules/core-js/modules/es6.math.cosh.js ***!
  \*******************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// 20.2.2.12 Math.cosh(x)
var $export = __webpack_require__(/*! ./_export */ 0);
var exp = Math.exp;

$export($export.S, 'Math', {
  cosh: function cosh(x) {
    return (exp(x = +x) + exp(-x)) / 2;
  }
});


/***/ }),
/* 185 */
/*!********************************************************!*\
  !*** ./node_modules/core-js/modules/es6.math.expm1.js ***!
  \********************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// 20.2.2.14 Math.expm1(x)
var $export = __webpack_require__(/*! ./_export */ 0);
var $expm1 = __webpack_require__(/*! ./_math-expm1 */ 77);

$export($export.S + $export.F * ($expm1 != Math.expm1), 'Math', { expm1: $expm1 });


/***/ }),
/* 186 */
/*!*********************************************************!*\
  !*** ./node_modules/core-js/modules/es6.math.fround.js ***!
  \*********************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// 20.2.2.16 Math.fround(x)
var $export = __webpack_require__(/*! ./_export */ 0);

$export($export.S, 'Math', { fround: __webpack_require__(/*! ./_math-fround */ 110) });


/***/ }),
/* 187 */
/*!********************************************************!*\
  !*** ./node_modules/core-js/modules/es6.math.hypot.js ***!
  \********************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// 20.2.2.17 Math.hypot([value1[, value2[, … ]]])
var $export = __webpack_require__(/*! ./_export */ 0);
var abs = Math.abs;

$export($export.S, 'Math', {
  hypot: function hypot(value1, value2) { // eslint-disable-line no-unused-vars
    var sum = 0;
    var i = 0;
    var aLen = arguments.length;
    var larg = 0;
    var arg, div;
    while (i < aLen) {
      arg = abs(arguments[i++]);
      if (larg < arg) {
        div = larg / arg;
        sum = sum * div * div + 1;
        larg = arg;
      } else if (arg > 0) {
        div = arg / larg;
        sum += div * div;
      } else sum += arg;
    }
    return larg === Infinity ? Infinity : larg * Math.sqrt(sum);
  }
});


/***/ }),
/* 188 */
/*!*******************************************************!*\
  !*** ./node_modules/core-js/modules/es6.math.imul.js ***!
  \*******************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// 20.2.2.18 Math.imul(x, y)
var $export = __webpack_require__(/*! ./_export */ 0);
var $imul = Math.imul;

// some WebKit versions fails with big numbers, some has wrong arity
$export($export.S + $export.F * __webpack_require__(/*! ./_fails */ 3)(function () {
  return $imul(0xffffffff, 5) != -5 || $imul.length != 2;
}), 'Math', {
  imul: function imul(x, y) {
    var UINT16 = 0xffff;
    var xn = +x;
    var yn = +y;
    var xl = UINT16 & xn;
    var yl = UINT16 & yn;
    return 0 | xl * yl + ((UINT16 & xn >>> 16) * yl + xl * (UINT16 & yn >>> 16) << 16 >>> 0);
  }
});


/***/ }),
/* 189 */
/*!********************************************************!*\
  !*** ./node_modules/core-js/modules/es6.math.log10.js ***!
  \********************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// 20.2.2.21 Math.log10(x)
var $export = __webpack_require__(/*! ./_export */ 0);

$export($export.S, 'Math', {
  log10: function log10(x) {
    return Math.log(x) * Math.LOG10E;
  }
});


/***/ }),
/* 190 */
/*!********************************************************!*\
  !*** ./node_modules/core-js/modules/es6.math.log1p.js ***!
  \********************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// 20.2.2.20 Math.log1p(x)
var $export = __webpack_require__(/*! ./_export */ 0);

$export($export.S, 'Math', { log1p: __webpack_require__(/*! ./_math-log1p */ 109) });


/***/ }),
/* 191 */
/*!*******************************************************!*\
  !*** ./node_modules/core-js/modules/es6.math.log2.js ***!
  \*******************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// 20.2.2.22 Math.log2(x)
var $export = __webpack_require__(/*! ./_export */ 0);

$export($export.S, 'Math', {
  log2: function log2(x) {
    return Math.log(x) / Math.LN2;
  }
});


/***/ }),
/* 192 */
/*!*******************************************************!*\
  !*** ./node_modules/core-js/modules/es6.math.sign.js ***!
  \*******************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// 20.2.2.28 Math.sign(x)
var $export = __webpack_require__(/*! ./_export */ 0);

$export($export.S, 'Math', { sign: __webpack_require__(/*! ./_math-sign */ 76) });


/***/ }),
/* 193 */
/*!*******************************************************!*\
  !*** ./node_modules/core-js/modules/es6.math.sinh.js ***!
  \*******************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// 20.2.2.30 Math.sinh(x)
var $export = __webpack_require__(/*! ./_export */ 0);
var expm1 = __webpack_require__(/*! ./_math-expm1 */ 77);
var exp = Math.exp;

// V8 near Chromium 38 has a problem with very small numbers
$export($export.S + $export.F * __webpack_require__(/*! ./_fails */ 3)(function () {
  return !Math.sinh(-2e-17) != -2e-17;
}), 'Math', {
  sinh: function sinh(x) {
    return Math.abs(x = +x) < 1
      ? (expm1(x) - expm1(-x)) / 2
      : (exp(x - 1) - exp(-x - 1)) * (Math.E / 2);
  }
});


/***/ }),
/* 194 */
/*!*******************************************************!*\
  !*** ./node_modules/core-js/modules/es6.math.tanh.js ***!
  \*******************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// 20.2.2.33 Math.tanh(x)
var $export = __webpack_require__(/*! ./_export */ 0);
var expm1 = __webpack_require__(/*! ./_math-expm1 */ 77);
var exp = Math.exp;

$export($export.S, 'Math', {
  tanh: function tanh(x) {
    var a = expm1(x = +x);
    var b = expm1(-x);
    return a == Infinity ? 1 : b == Infinity ? -1 : (a - b) / (exp(x) + exp(-x));
  }
});


/***/ }),
/* 195 */
/*!********************************************************!*\
  !*** ./node_modules/core-js/modules/es6.math.trunc.js ***!
  \********************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// 20.2.2.34 Math.trunc(x)
var $export = __webpack_require__(/*! ./_export */ 0);

$export($export.S, 'Math', {
  trunc: function trunc(it) {
    return (it > 0 ? Math.floor : Math.ceil)(it);
  }
});


/***/ }),
/* 196 */
/*!********************************************************************!*\
  !*** ./node_modules/core-js/modules/es6.string.from-code-point.js ***!
  \********************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__(/*! ./_export */ 0);
var toAbsoluteIndex = __webpack_require__(/*! ./_to-absolute-index */ 36);
var fromCharCode = String.fromCharCode;
var $fromCodePoint = String.fromCodePoint;

// length should be 1, old FF problem
$export($export.S + $export.F * (!!$fromCodePoint && $fromCodePoint.length != 1), 'String', {
  // 21.1.2.2 String.fromCodePoint(...codePoints)
  fromCodePoint: function fromCodePoint(x) { // eslint-disable-line no-unused-vars
    var res = [];
    var aLen = arguments.length;
    var i = 0;
    var code;
    while (aLen > i) {
      code = +arguments[i++];
      if (toAbsoluteIndex(code, 0x10ffff) !== code) throw RangeError(code + ' is not a valid code point');
      res.push(code < 0x10000
        ? fromCharCode(code)
        : fromCharCode(((code -= 0x10000) >> 10) + 0xd800, code % 0x400 + 0xdc00)
      );
    } return res.join('');
  }
});


/***/ }),
/* 197 */
/*!********************************************************!*\
  !*** ./node_modules/core-js/modules/es6.string.raw.js ***!
  \********************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__(/*! ./_export */ 0);
var toIObject = __webpack_require__(/*! ./_to-iobject */ 15);
var toLength = __webpack_require__(/*! ./_to-length */ 8);

$export($export.S, 'String', {
  // 21.1.2.4 String.raw(callSite, ...substitutions)
  raw: function raw(callSite) {
    var tpl = toIObject(callSite.raw);
    var len = toLength(tpl.length);
    var aLen = arguments.length;
    var res = [];
    var i = 0;
    while (len > i) {
      res.push(String(tpl[i++]));
      if (i < aLen) res.push(String(arguments[i]));
    } return res.join('');
  }
});


/***/ }),
/* 198 */
/*!*********************************************************!*\
  !*** ./node_modules/core-js/modules/es6.string.trim.js ***!
  \*********************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// 21.1.3.25 String.prototype.trim()
__webpack_require__(/*! ./_string-trim */ 44)('trim', function ($trim) {
  return function trim() {
    return $trim(this, 3);
  };
});


/***/ }),
/* 199 */
/*!*************************************************************!*\
  !*** ./node_modules/core-js/modules/es6.string.iterator.js ***!
  \*************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $at = __webpack_require__(/*! ./_string-at */ 78)(true);

// 21.1.3.27 String.prototype[@@iterator]()
__webpack_require__(/*! ./_iter-define */ 79)(String, 'String', function (iterated) {
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
/* 200 */
/*!******************************************************************!*\
  !*** ./node_modules/core-js/modules/es6.string.code-point-at.js ***!
  \******************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export = __webpack_require__(/*! ./_export */ 0);
var $at = __webpack_require__(/*! ./_string-at */ 78)(false);
$export($export.P, 'String', {
  // 21.1.3.3 String.prototype.codePointAt(pos)
  codePointAt: function codePointAt(pos) {
    return $at(this, pos);
  }
});


/***/ }),
/* 201 */
/*!**************************************************************!*\
  !*** ./node_modules/core-js/modules/es6.string.ends-with.js ***!
  \**************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// 21.1.3.6 String.prototype.endsWith(searchString [, endPosition])

var $export = __webpack_require__(/*! ./_export */ 0);
var toLength = __webpack_require__(/*! ./_to-length */ 8);
var context = __webpack_require__(/*! ./_string-context */ 81);
var ENDS_WITH = 'endsWith';
var $endsWith = ''[ENDS_WITH];

$export($export.P + $export.F * __webpack_require__(/*! ./_fails-is-regexp */ 82)(ENDS_WITH), 'String', {
  endsWith: function endsWith(searchString /* , endPosition = @length */) {
    var that = context(this, searchString, ENDS_WITH);
    var endPosition = arguments.length > 1 ? arguments[1] : undefined;
    var len = toLength(that.length);
    var end = endPosition === undefined ? len : Math.min(toLength(endPosition), len);
    var search = String(searchString);
    return $endsWith
      ? $endsWith.call(that, search, end)
      : that.slice(end - search.length, end) === search;
  }
});


/***/ }),
/* 202 */
/*!*************************************************************!*\
  !*** ./node_modules/core-js/modules/es6.string.includes.js ***!
  \*************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// 21.1.3.7 String.prototype.includes(searchString, position = 0)

var $export = __webpack_require__(/*! ./_export */ 0);
var context = __webpack_require__(/*! ./_string-context */ 81);
var INCLUDES = 'includes';

$export($export.P + $export.F * __webpack_require__(/*! ./_fails-is-regexp */ 82)(INCLUDES), 'String', {
  includes: function includes(searchString /* , position = 0 */) {
    return !!~context(this, searchString, INCLUDES)
      .indexOf(searchString, arguments.length > 1 ? arguments[1] : undefined);
  }
});


/***/ }),
/* 203 */
/*!***********************************************************!*\
  !*** ./node_modules/core-js/modules/es6.string.repeat.js ***!
  \***********************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__(/*! ./_export */ 0);

$export($export.P, 'String', {
  // 21.1.3.13 String.prototype.repeat(count)
  repeat: __webpack_require__(/*! ./_string-repeat */ 75)
});


/***/ }),
/* 204 */
/*!****************************************************************!*\
  !*** ./node_modules/core-js/modules/es6.string.starts-with.js ***!
  \****************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// 21.1.3.18 String.prototype.startsWith(searchString [, position ])

var $export = __webpack_require__(/*! ./_export */ 0);
var toLength = __webpack_require__(/*! ./_to-length */ 8);
var context = __webpack_require__(/*! ./_string-context */ 81);
var STARTS_WITH = 'startsWith';
var $startsWith = ''[STARTS_WITH];

$export($export.P + $export.F * __webpack_require__(/*! ./_fails-is-regexp */ 82)(STARTS_WITH), 'String', {
  startsWith: function startsWith(searchString /* , position = 0 */) {
    var that = context(this, searchString, STARTS_WITH);
    var index = toLength(Math.min(arguments.length > 1 ? arguments[1] : undefined, that.length));
    var search = String(searchString);
    return $startsWith
      ? $startsWith.call(that, search, index)
      : that.slice(index, index + search.length) === search;
  }
});


/***/ }),
/* 205 */
/*!***********************************************************!*\
  !*** ./node_modules/core-js/modules/es6.string.anchor.js ***!
  \***********************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// B.2.3.2 String.prototype.anchor(name)
__webpack_require__(/*! ./_string-html */ 14)('anchor', function (createHTML) {
  return function anchor(name) {
    return createHTML(this, 'a', 'name', name);
  };
});


/***/ }),
/* 206 */
/*!********************************************************!*\
  !*** ./node_modules/core-js/modules/es6.string.big.js ***!
  \********************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// B.2.3.3 String.prototype.big()
__webpack_require__(/*! ./_string-html */ 14)('big', function (createHTML) {
  return function big() {
    return createHTML(this, 'big', '', '');
  };
});


/***/ }),
/* 207 */
/*!**********************************************************!*\
  !*** ./node_modules/core-js/modules/es6.string.blink.js ***!
  \**********************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// B.2.3.4 String.prototype.blink()
__webpack_require__(/*! ./_string-html */ 14)('blink', function (createHTML) {
  return function blink() {
    return createHTML(this, 'blink', '', '');
  };
});


/***/ }),
/* 208 */
/*!*********************************************************!*\
  !*** ./node_modules/core-js/modules/es6.string.bold.js ***!
  \*********************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// B.2.3.5 String.prototype.bold()
__webpack_require__(/*! ./_string-html */ 14)('bold', function (createHTML) {
  return function bold() {
    return createHTML(this, 'b', '', '');
  };
});


/***/ }),
/* 209 */
/*!**********************************************************!*\
  !*** ./node_modules/core-js/modules/es6.string.fixed.js ***!
  \**********************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// B.2.3.6 String.prototype.fixed()
__webpack_require__(/*! ./_string-html */ 14)('fixed', function (createHTML) {
  return function fixed() {
    return createHTML(this, 'tt', '', '');
  };
});


/***/ }),
/* 210 */
/*!**************************************************************!*\
  !*** ./node_modules/core-js/modules/es6.string.fontcolor.js ***!
  \**************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// B.2.3.7 String.prototype.fontcolor(color)
__webpack_require__(/*! ./_string-html */ 14)('fontcolor', function (createHTML) {
  return function fontcolor(color) {
    return createHTML(this, 'font', 'color', color);
  };
});


/***/ }),
/* 211 */
/*!*************************************************************!*\
  !*** ./node_modules/core-js/modules/es6.string.fontsize.js ***!
  \*************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// B.2.3.8 String.prototype.fontsize(size)
__webpack_require__(/*! ./_string-html */ 14)('fontsize', function (createHTML) {
  return function fontsize(size) {
    return createHTML(this, 'font', 'size', size);
  };
});


/***/ }),
/* 212 */
/*!************************************************************!*\
  !*** ./node_modules/core-js/modules/es6.string.italics.js ***!
  \************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// B.2.3.9 String.prototype.italics()
__webpack_require__(/*! ./_string-html */ 14)('italics', function (createHTML) {
  return function italics() {
    return createHTML(this, 'i', '', '');
  };
});


/***/ }),
/* 213 */
/*!*********************************************************!*\
  !*** ./node_modules/core-js/modules/es6.string.link.js ***!
  \*********************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// B.2.3.10 String.prototype.link(url)
__webpack_require__(/*! ./_string-html */ 14)('link', function (createHTML) {
  return function link(url) {
    return createHTML(this, 'a', 'href', url);
  };
});


/***/ }),
/* 214 */
/*!**********************************************************!*\
  !*** ./node_modules/core-js/modules/es6.string.small.js ***!
  \**********************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// B.2.3.11 String.prototype.small()
__webpack_require__(/*! ./_string-html */ 14)('small', function (createHTML) {
  return function small() {
    return createHTML(this, 'small', '', '');
  };
});


/***/ }),
/* 215 */
/*!***********************************************************!*\
  !*** ./node_modules/core-js/modules/es6.string.strike.js ***!
  \***********************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// B.2.3.12 String.prototype.strike()
__webpack_require__(/*! ./_string-html */ 14)('strike', function (createHTML) {
  return function strike() {
    return createHTML(this, 'strike', '', '');
  };
});


/***/ }),
/* 216 */
/*!********************************************************!*\
  !*** ./node_modules/core-js/modules/es6.string.sub.js ***!
  \********************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// B.2.3.13 String.prototype.sub()
__webpack_require__(/*! ./_string-html */ 14)('sub', function (createHTML) {
  return function sub() {
    return createHTML(this, 'sub', '', '');
  };
});


/***/ }),
/* 217 */
/*!********************************************************!*\
  !*** ./node_modules/core-js/modules/es6.string.sup.js ***!
  \********************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// B.2.3.14 String.prototype.sup()
__webpack_require__(/*! ./_string-html */ 14)('sup', function (createHTML) {
  return function sup() {
    return createHTML(this, 'sup', '', '');
  };
});


/***/ }),
/* 218 */
/*!******************************************************!*\
  !*** ./node_modules/core-js/modules/es6.date.now.js ***!
  \******************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// 20.3.3.1 / 15.9.4.4 Date.now()
var $export = __webpack_require__(/*! ./_export */ 0);

$export($export.S, 'Date', { now: function () { return new Date().getTime(); } });


/***/ }),
/* 219 */
/*!**********************************************************!*\
  !*** ./node_modules/core-js/modules/es6.date.to-json.js ***!
  \**********************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export = __webpack_require__(/*! ./_export */ 0);
var toObject = __webpack_require__(/*! ./_to-object */ 9);
var toPrimitive = __webpack_require__(/*! ./_to-primitive */ 22);

$export($export.P + $export.F * __webpack_require__(/*! ./_fails */ 3)(function () {
  return new Date(NaN).toJSON() !== null
    || Date.prototype.toJSON.call({ toISOString: function () { return 1; } }) !== 1;
}), 'Date', {
  // eslint-disable-next-line no-unused-vars
  toJSON: function toJSON(key) {
    var O = toObject(this);
    var pv = toPrimitive(O);
    return typeof pv == 'number' && !isFinite(pv) ? null : O.toISOString();
  }
});


/***/ }),
/* 220 */
/*!****************************************************************!*\
  !*** ./node_modules/core-js/modules/es6.date.to-iso-string.js ***!
  \****************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// 20.3.4.36 / 15.9.5.43 Date.prototype.toISOString()
var $export = __webpack_require__(/*! ./_export */ 0);
var toISOString = __webpack_require__(/*! ./_date-to-iso-string */ 221);

// PhantomJS / old WebKit has a broken implementations
$export($export.P + $export.F * (Date.prototype.toISOString !== toISOString), 'Date', {
  toISOString: toISOString
});


/***/ }),
/* 221 */
/*!*************************************************************!*\
  !*** ./node_modules/core-js/modules/_date-to-iso-string.js ***!
  \*************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// 20.3.4.36 / 15.9.5.43 Date.prototype.toISOString()
var fails = __webpack_require__(/*! ./_fails */ 3);
var getTime = Date.prototype.getTime;
var $toISOString = Date.prototype.toISOString;

var lz = function (num) {
  return num > 9 ? num : '0' + num;
};

// PhantomJS / old WebKit has a broken implementations
module.exports = (fails(function () {
  return $toISOString.call(new Date(-5e13 - 1)) != '0385-07-25T07:06:39.999Z';
}) || !fails(function () {
  $toISOString.call(new Date(NaN));
})) ? function toISOString() {
  if (!isFinite(getTime.call(this))) throw RangeError('Invalid time value');
  var d = this;
  var y = d.getUTCFullYear();
  var m = d.getUTCMilliseconds();
  var s = y < 0 ? '-' : y > 9999 ? '+' : '';
  return s + ('00000' + Math.abs(y)).slice(s ? -6 : -4) +
    '-' + lz(d.getUTCMonth() + 1) + '-' + lz(d.getUTCDate()) +
    'T' + lz(d.getUTCHours()) + ':' + lz(d.getUTCMinutes()) +
    ':' + lz(d.getUTCSeconds()) + '.' + (m > 99 ? m : '0' + lz(m)) + 'Z';
} : $toISOString;


/***/ }),
/* 222 */
/*!************************************************************!*\
  !*** ./node_modules/core-js/modules/es6.date.to-string.js ***!
  \************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

var DateProto = Date.prototype;
var INVALID_DATE = 'Invalid Date';
var TO_STRING = 'toString';
var $toString = DateProto[TO_STRING];
var getTime = DateProto.getTime;
if (new Date(NaN) + '' != INVALID_DATE) {
  __webpack_require__(/*! ./_redefine */ 13)(DateProto, TO_STRING, function toString() {
    var value = getTime.call(this);
    // eslint-disable-next-line no-self-compare
    return value === value ? $toString.call(this) : INVALID_DATE;
  });
}


/***/ }),
/* 223 */
/*!***************************************************************!*\
  !*** ./node_modules/core-js/modules/es6.date.to-primitive.js ***!
  \***************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

var TO_PRIMITIVE = __webpack_require__(/*! ./_wks */ 5)('toPrimitive');
var proto = Date.prototype;

if (!(TO_PRIMITIVE in proto)) __webpack_require__(/*! ./_hide */ 12)(proto, TO_PRIMITIVE, __webpack_require__(/*! ./_date-to-primitive */ 224));


/***/ }),
/* 224 */
/*!************************************************************!*\
  !*** ./node_modules/core-js/modules/_date-to-primitive.js ***!
  \************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var anObject = __webpack_require__(/*! ./_an-object */ 1);
var toPrimitive = __webpack_require__(/*! ./_to-primitive */ 22);
var NUMBER = 'number';

module.exports = function (hint) {
  if (hint !== 'string' && hint !== NUMBER && hint !== 'default') throw TypeError('Incorrect hint');
  return toPrimitive(anObject(this), hint != NUMBER);
};


/***/ }),
/* 225 */
/*!************************************************************!*\
  !*** ./node_modules/core-js/modules/es6.array.is-array.js ***!
  \************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// 22.1.2.2 / 15.4.3.2 Array.isArray(arg)
var $export = __webpack_require__(/*! ./_export */ 0);

$export($export.S, 'Array', { isArray: __webpack_require__(/*! ./_is-array */ 54) });


/***/ }),
/* 226 */
/*!********************************************************!*\
  !*** ./node_modules/core-js/modules/es6.array.from.js ***!
  \********************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var ctx = __webpack_require__(/*! ./_ctx */ 18);
var $export = __webpack_require__(/*! ./_export */ 0);
var toObject = __webpack_require__(/*! ./_to-object */ 9);
var call = __webpack_require__(/*! ./_iter-call */ 111);
var isArrayIter = __webpack_require__(/*! ./_is-array-iter */ 83);
var toLength = __webpack_require__(/*! ./_to-length */ 8);
var createProperty = __webpack_require__(/*! ./_create-property */ 84);
var getIterFn = __webpack_require__(/*! ./core.get-iterator-method */ 85);

$export($export.S + $export.F * !__webpack_require__(/*! ./_iter-detect */ 56)(function (iter) { Array.from(iter); }), 'Array', {
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
/* 227 */
/*!******************************************************!*\
  !*** ./node_modules/core-js/modules/es6.array.of.js ***!
  \******************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export = __webpack_require__(/*! ./_export */ 0);
var createProperty = __webpack_require__(/*! ./_create-property */ 84);

// WebKit Array.of isn't generic
$export($export.S + $export.F * __webpack_require__(/*! ./_fails */ 3)(function () {
  function F() { /* empty */ }
  return !(Array.of.call(F) instanceof F);
}), 'Array', {
  // 22.1.2.3 Array.of( ...items)
  of: function of(/* ...args */) {
    var index = 0;
    var aLen = arguments.length;
    var result = new (typeof this == 'function' ? this : Array)(aLen);
    while (aLen > index) createProperty(result, index, arguments[index++]);
    result.length = aLen;
    return result;
  }
});


/***/ }),
/* 228 */
/*!********************************************************!*\
  !*** ./node_modules/core-js/modules/es6.array.join.js ***!
  \********************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// 22.1.3.13 Array.prototype.join(separator)
var $export = __webpack_require__(/*! ./_export */ 0);
var toIObject = __webpack_require__(/*! ./_to-iobject */ 15);
var arrayJoin = [].join;

// fallback for not array-like strings
$export($export.P + $export.F * (__webpack_require__(/*! ./_iobject */ 48) != Object || !__webpack_require__(/*! ./_strict-method */ 20)(arrayJoin)), 'Array', {
  join: function join(separator) {
    return arrayJoin.call(toIObject(this), separator === undefined ? ',' : separator);
  }
});


/***/ }),
/* 229 */
/*!*********************************************************!*\
  !*** ./node_modules/core-js/modules/es6.array.slice.js ***!
  \*********************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export = __webpack_require__(/*! ./_export */ 0);
var html = __webpack_require__(/*! ./_html */ 71);
var cof = __webpack_require__(/*! ./_cof */ 19);
var toAbsoluteIndex = __webpack_require__(/*! ./_to-absolute-index */ 36);
var toLength = __webpack_require__(/*! ./_to-length */ 8);
var arraySlice = [].slice;

// fallback for not array-like ES3 strings and DOM objects
$export($export.P + $export.F * __webpack_require__(/*! ./_fails */ 3)(function () {
  if (html) arraySlice.call(html);
}), 'Array', {
  slice: function slice(begin, end) {
    var len = toLength(this.length);
    var klass = cof(this);
    end = end === undefined ? len : end;
    if (klass == 'Array') return arraySlice.call(this, begin, end);
    var start = toAbsoluteIndex(begin, len);
    var upTo = toAbsoluteIndex(end, len);
    var size = toLength(upTo - start);
    var cloned = new Array(size);
    var i = 0;
    for (; i < size; i++) cloned[i] = klass == 'String'
      ? this.charAt(start + i)
      : this[start + i];
    return cloned;
  }
});


/***/ }),
/* 230 */
/*!********************************************************!*\
  !*** ./node_modules/core-js/modules/es6.array.sort.js ***!
  \********************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export = __webpack_require__(/*! ./_export */ 0);
var aFunction = __webpack_require__(/*! ./_a-function */ 10);
var toObject = __webpack_require__(/*! ./_to-object */ 9);
var fails = __webpack_require__(/*! ./_fails */ 3);
var $sort = [].sort;
var test = [1, 2, 3];

$export($export.P + $export.F * (fails(function () {
  // IE8-
  test.sort(undefined);
}) || !fails(function () {
  // V8 bug
  test.sort(null);
  // Old WebKit
}) || !__webpack_require__(/*! ./_strict-method */ 20)($sort)), 'Array', {
  // 22.1.3.25 Array.prototype.sort(comparefn)
  sort: function sort(comparefn) {
    return comparefn === undefined
      ? $sort.call(toObject(this))
      : $sort.call(toObject(this), aFunction(comparefn));
  }
});


/***/ }),
/* 231 */
/*!************************************************************!*\
  !*** ./node_modules/core-js/modules/es6.array.for-each.js ***!
  \************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export = __webpack_require__(/*! ./_export */ 0);
var $forEach = __webpack_require__(/*! ./_array-methods */ 26)(0);
var STRICT = __webpack_require__(/*! ./_strict-method */ 20)([].forEach, true);

$export($export.P + $export.F * !STRICT, 'Array', {
  // 22.1.3.10 / 15.4.4.18 Array.prototype.forEach(callbackfn [, thisArg])
  forEach: function forEach(callbackfn /* , thisArg */) {
    return $forEach(this, callbackfn, arguments[1]);
  }
});


/***/ }),
/* 232 */
/*!********************************************************************!*\
  !*** ./node_modules/core-js/modules/_array-species-constructor.js ***!
  \********************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(/*! ./_is-object */ 4);
var isArray = __webpack_require__(/*! ./_is-array */ 54);
var SPECIES = __webpack_require__(/*! ./_wks */ 5)('species');

module.exports = function (original) {
  var C;
  if (isArray(original)) {
    C = original.constructor;
    // cross-realm fallback
    if (typeof C == 'function' && (C === Array || isArray(C.prototype))) C = undefined;
    if (isObject(C)) {
      C = C[SPECIES];
      if (C === null) C = undefined;
    }
  } return C === undefined ? Array : C;
};


/***/ }),
/* 233 */
/*!*******************************************************!*\
  !*** ./node_modules/core-js/modules/es6.array.map.js ***!
  \*******************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export = __webpack_require__(/*! ./_export */ 0);
var $map = __webpack_require__(/*! ./_array-methods */ 26)(1);

$export($export.P + $export.F * !__webpack_require__(/*! ./_strict-method */ 20)([].map, true), 'Array', {
  // 22.1.3.15 / 15.4.4.19 Array.prototype.map(callbackfn [, thisArg])
  map: function map(callbackfn /* , thisArg */) {
    return $map(this, callbackfn, arguments[1]);
  }
});


/***/ }),
/* 234 */
/*!**********************************************************!*\
  !*** ./node_modules/core-js/modules/es6.array.filter.js ***!
  \**********************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export = __webpack_require__(/*! ./_export */ 0);
var $filter = __webpack_require__(/*! ./_array-methods */ 26)(2);

$export($export.P + $export.F * !__webpack_require__(/*! ./_strict-method */ 20)([].filter, true), 'Array', {
  // 22.1.3.7 / 15.4.4.20 Array.prototype.filter(callbackfn [, thisArg])
  filter: function filter(callbackfn /* , thisArg */) {
    return $filter(this, callbackfn, arguments[1]);
  }
});


/***/ }),
/* 235 */
/*!********************************************************!*\
  !*** ./node_modules/core-js/modules/es6.array.some.js ***!
  \********************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export = __webpack_require__(/*! ./_export */ 0);
var $some = __webpack_require__(/*! ./_array-methods */ 26)(3);

$export($export.P + $export.F * !__webpack_require__(/*! ./_strict-method */ 20)([].some, true), 'Array', {
  // 22.1.3.23 / 15.4.4.17 Array.prototype.some(callbackfn [, thisArg])
  some: function some(callbackfn /* , thisArg */) {
    return $some(this, callbackfn, arguments[1]);
  }
});


/***/ }),
/* 236 */
/*!*********************************************************!*\
  !*** ./node_modules/core-js/modules/es6.array.every.js ***!
  \*********************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export = __webpack_require__(/*! ./_export */ 0);
var $every = __webpack_require__(/*! ./_array-methods */ 26)(4);

$export($export.P + $export.F * !__webpack_require__(/*! ./_strict-method */ 20)([].every, true), 'Array', {
  // 22.1.3.5 / 15.4.4.16 Array.prototype.every(callbackfn [, thisArg])
  every: function every(callbackfn /* , thisArg */) {
    return $every(this, callbackfn, arguments[1]);
  }
});


/***/ }),
/* 237 */
/*!**********************************************************!*\
  !*** ./node_modules/core-js/modules/es6.array.reduce.js ***!
  \**********************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export = __webpack_require__(/*! ./_export */ 0);
var $reduce = __webpack_require__(/*! ./_array-reduce */ 112);

$export($export.P + $export.F * !__webpack_require__(/*! ./_strict-method */ 20)([].reduce, true), 'Array', {
  // 22.1.3.18 / 15.4.4.21 Array.prototype.reduce(callbackfn [, initialValue])
  reduce: function reduce(callbackfn /* , initialValue */) {
    return $reduce(this, callbackfn, arguments.length, arguments[1], false);
  }
});


/***/ }),
/* 238 */
/*!****************************************************************!*\
  !*** ./node_modules/core-js/modules/es6.array.reduce-right.js ***!
  \****************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export = __webpack_require__(/*! ./_export */ 0);
var $reduce = __webpack_require__(/*! ./_array-reduce */ 112);

$export($export.P + $export.F * !__webpack_require__(/*! ./_strict-method */ 20)([].reduceRight, true), 'Array', {
  // 22.1.3.19 / 15.4.4.22 Array.prototype.reduceRight(callbackfn [, initialValue])
  reduceRight: function reduceRight(callbackfn /* , initialValue */) {
    return $reduce(this, callbackfn, arguments.length, arguments[1], true);
  }
});


/***/ }),
/* 239 */
/*!************************************************************!*\
  !*** ./node_modules/core-js/modules/es6.array.index-of.js ***!
  \************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export = __webpack_require__(/*! ./_export */ 0);
var $indexOf = __webpack_require__(/*! ./_array-includes */ 52)(false);
var $native = [].indexOf;
var NEGATIVE_ZERO = !!$native && 1 / [1].indexOf(1, -0) < 0;

$export($export.P + $export.F * (NEGATIVE_ZERO || !__webpack_require__(/*! ./_strict-method */ 20)($native)), 'Array', {
  // 22.1.3.11 / 15.4.4.14 Array.prototype.indexOf(searchElement [, fromIndex])
  indexOf: function indexOf(searchElement /* , fromIndex = 0 */) {
    return NEGATIVE_ZERO
      // convert -0 to +0
      ? $native.apply(this, arguments) || 0
      : $indexOf(this, searchElement, arguments[1]);
  }
});


/***/ }),
/* 240 */
/*!*****************************************************************!*\
  !*** ./node_modules/core-js/modules/es6.array.last-index-of.js ***!
  \*****************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export = __webpack_require__(/*! ./_export */ 0);
var toIObject = __webpack_require__(/*! ./_to-iobject */ 15);
var toInteger = __webpack_require__(/*! ./_to-integer */ 24);
var toLength = __webpack_require__(/*! ./_to-length */ 8);
var $native = [].lastIndexOf;
var NEGATIVE_ZERO = !!$native && 1 / [1].lastIndexOf(1, -0) < 0;

$export($export.P + $export.F * (NEGATIVE_ZERO || !__webpack_require__(/*! ./_strict-method */ 20)($native)), 'Array', {
  // 22.1.3.14 / 15.4.4.15 Array.prototype.lastIndexOf(searchElement [, fromIndex])
  lastIndexOf: function lastIndexOf(searchElement /* , fromIndex = @[*-1] */) {
    // convert -0 to +0
    if (NEGATIVE_ZERO) return $native.apply(this, arguments) || 0;
    var O = toIObject(this);
    var length = toLength(O.length);
    var index = length - 1;
    if (arguments.length > 1) index = Math.min(index, toInteger(arguments[1]));
    if (index < 0) index = length + index;
    for (;index >= 0; index--) if (index in O) if (O[index] === searchElement) return index || 0;
    return -1;
  }
});


/***/ }),
/* 241 */
/*!***************************************************************!*\
  !*** ./node_modules/core-js/modules/es6.array.copy-within.js ***!
  \***************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// 22.1.3.3 Array.prototype.copyWithin(target, start, end = this.length)
var $export = __webpack_require__(/*! ./_export */ 0);

$export($export.P, 'Array', { copyWithin: __webpack_require__(/*! ./_array-copy-within */ 113) });

__webpack_require__(/*! ./_add-to-unscopables */ 31)('copyWithin');


/***/ }),
/* 242 */
/*!********************************************************!*\
  !*** ./node_modules/core-js/modules/es6.array.fill.js ***!
  \********************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// 22.1.3.6 Array.prototype.fill(value, start = 0, end = this.length)
var $export = __webpack_require__(/*! ./_export */ 0);

$export($export.P, 'Array', { fill: __webpack_require__(/*! ./_array-fill */ 87) });

__webpack_require__(/*! ./_add-to-unscopables */ 31)('fill');


/***/ }),
/* 243 */
/*!********************************************************!*\
  !*** ./node_modules/core-js/modules/es6.array.find.js ***!
  \********************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// 22.1.3.8 Array.prototype.find(predicate, thisArg = undefined)
var $export = __webpack_require__(/*! ./_export */ 0);
var $find = __webpack_require__(/*! ./_array-methods */ 26)(5);
var KEY = 'find';
var forced = true;
// Shouldn't skip holes
if (KEY in []) Array(1)[KEY](function () { forced = false; });
$export($export.P + $export.F * forced, 'Array', {
  find: function find(callbackfn /* , that = undefined */) {
    return $find(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
  }
});
__webpack_require__(/*! ./_add-to-unscopables */ 31)(KEY);


/***/ }),
/* 244 */
/*!**************************************************************!*\
  !*** ./node_modules/core-js/modules/es6.array.find-index.js ***!
  \**************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// 22.1.3.9 Array.prototype.findIndex(predicate, thisArg = undefined)
var $export = __webpack_require__(/*! ./_export */ 0);
var $find = __webpack_require__(/*! ./_array-methods */ 26)(6);
var KEY = 'findIndex';
var forced = true;
// Shouldn't skip holes
if (KEY in []) Array(1)[KEY](function () { forced = false; });
$export($export.P + $export.F * forced, 'Array', {
  findIndex: function findIndex(callbackfn /* , that = undefined */) {
    return $find(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
  }
});
__webpack_require__(/*! ./_add-to-unscopables */ 31)(KEY);


/***/ }),
/* 245 */
/*!***********************************************************!*\
  !*** ./node_modules/core-js/modules/es6.array.species.js ***!
  \***********************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! ./_set-species */ 39)('Array');


/***/ }),
/* 246 */
/*!****************************************************************!*\
  !*** ./node_modules/core-js/modules/es6.regexp.constructor.js ***!
  \****************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(/*! ./_global */ 2);
var inheritIfRequired = __webpack_require__(/*! ./_inherit-if-required */ 74);
var dP = __webpack_require__(/*! ./_object-dp */ 7).f;
var gOPN = __webpack_require__(/*! ./_object-gopn */ 38).f;
var isRegExp = __webpack_require__(/*! ./_is-regexp */ 55);
var $flags = __webpack_require__(/*! ./_flags */ 57);
var $RegExp = global.RegExp;
var Base = $RegExp;
var proto = $RegExp.prototype;
var re1 = /a/g;
var re2 = /a/g;
// "new" creates a new object, old webkit buggy here
var CORRECT_NEW = new $RegExp(re1) !== re1;

if (__webpack_require__(/*! ./_descriptors */ 6) && (!CORRECT_NEW || __webpack_require__(/*! ./_fails */ 3)(function () {
  re2[__webpack_require__(/*! ./_wks */ 5)('match')] = false;
  // RegExp constructor can alter flags and IsRegExp works correct with @@match
  return $RegExp(re1) != re1 || $RegExp(re2) == re2 || $RegExp(re1, 'i') != '/a/i';
}))) {
  $RegExp = function RegExp(p, f) {
    var tiRE = this instanceof $RegExp;
    var piRE = isRegExp(p);
    var fiU = f === undefined;
    return !tiRE && piRE && p.constructor === $RegExp && fiU ? p
      : inheritIfRequired(CORRECT_NEW
        ? new Base(piRE && !fiU ? p.source : p, f)
        : Base((piRE = p instanceof $RegExp) ? p.source : p, piRE && fiU ? $flags.call(p) : f)
      , tiRE ? this : proto, $RegExp);
  };
  var proxy = function (key) {
    key in $RegExp || dP($RegExp, key, {
      configurable: true,
      get: function () { return Base[key]; },
      set: function (it) { Base[key] = it; }
    });
  };
  for (var keys = gOPN(Base), i = 0; keys.length > i;) proxy(keys[i++]);
  proto.constructor = $RegExp;
  $RegExp.prototype = proto;
  __webpack_require__(/*! ./_redefine */ 13)(global, 'RegExp', $RegExp);
}

__webpack_require__(/*! ./_set-species */ 39)('RegExp');


/***/ }),
/* 247 */
/*!**************************************************************!*\
  !*** ./node_modules/core-js/modules/es6.regexp.to-string.js ***!
  \**************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

__webpack_require__(/*! ./es6.regexp.flags */ 115);
var anObject = __webpack_require__(/*! ./_an-object */ 1);
var $flags = __webpack_require__(/*! ./_flags */ 57);
var DESCRIPTORS = __webpack_require__(/*! ./_descriptors */ 6);
var TO_STRING = 'toString';
var $toString = /./[TO_STRING];

var define = function (fn) {
  __webpack_require__(/*! ./_redefine */ 13)(RegExp.prototype, TO_STRING, fn, true);
};

// 21.2.5.14 RegExp.prototype.toString()
if (__webpack_require__(/*! ./_fails */ 3)(function () { return $toString.call({ source: 'a', flags: 'b' }) != '/a/b'; })) {
  define(function toString() {
    var R = anObject(this);
    return '/'.concat(R.source, '/',
      'flags' in R ? R.flags : !DESCRIPTORS && R instanceof RegExp ? $flags.call(R) : undefined);
  });
// FF44- RegExp#toString has a wrong name
} else if ($toString.name != TO_STRING) {
  define(function toString() {
    return $toString.call(this);
  });
}


/***/ }),
/* 248 */
/*!**********************************************************!*\
  !*** ./node_modules/core-js/modules/es6.regexp.match.js ***!
  \**********************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// @@match logic
__webpack_require__(/*! ./_fix-re-wks */ 58)('match', 1, function (defined, MATCH, $match) {
  // 21.1.3.11 String.prototype.match(regexp)
  return [function match(regexp) {
    'use strict';
    var O = defined(this);
    var fn = regexp == undefined ? undefined : regexp[MATCH];
    return fn !== undefined ? fn.call(regexp, O) : new RegExp(regexp)[MATCH](String(O));
  }, $match];
});


/***/ }),
/* 249 */
/*!************************************************************!*\
  !*** ./node_modules/core-js/modules/es6.regexp.replace.js ***!
  \************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// @@replace logic
__webpack_require__(/*! ./_fix-re-wks */ 58)('replace', 2, function (defined, REPLACE, $replace) {
  // 21.1.3.14 String.prototype.replace(searchValue, replaceValue)
  return [function replace(searchValue, replaceValue) {
    'use strict';
    var O = defined(this);
    var fn = searchValue == undefined ? undefined : searchValue[REPLACE];
    return fn !== undefined
      ? fn.call(searchValue, O, replaceValue)
      : $replace.call(String(O), searchValue, replaceValue);
  }, $replace];
});


/***/ }),
/* 250 */
/*!***********************************************************!*\
  !*** ./node_modules/core-js/modules/es6.regexp.search.js ***!
  \***********************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// @@search logic
__webpack_require__(/*! ./_fix-re-wks */ 58)('search', 1, function (defined, SEARCH, $search) {
  // 21.1.3.15 String.prototype.search(regexp)
  return [function search(regexp) {
    'use strict';
    var O = defined(this);
    var fn = regexp == undefined ? undefined : regexp[SEARCH];
    return fn !== undefined ? fn.call(regexp, O) : new RegExp(regexp)[SEARCH](String(O));
  }, $search];
});


/***/ }),
/* 251 */
/*!**********************************************************!*\
  !*** ./node_modules/core-js/modules/es6.regexp.split.js ***!
  \**********************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// @@split logic
__webpack_require__(/*! ./_fix-re-wks */ 58)('split', 2, function (defined, SPLIT, $split) {
  'use strict';
  var isRegExp = __webpack_require__(/*! ./_is-regexp */ 55);
  var _split = $split;
  var $push = [].push;
  var $SPLIT = 'split';
  var LENGTH = 'length';
  var LAST_INDEX = 'lastIndex';
  if (
    'abbc'[$SPLIT](/(b)*/)[1] == 'c' ||
    'test'[$SPLIT](/(?:)/, -1)[LENGTH] != 4 ||
    'ab'[$SPLIT](/(?:ab)*/)[LENGTH] != 2 ||
    '.'[$SPLIT](/(.?)(.?)/)[LENGTH] != 4 ||
    '.'[$SPLIT](/()()/)[LENGTH] > 1 ||
    ''[$SPLIT](/.?/)[LENGTH]
  ) {
    var NPCG = /()??/.exec('')[1] === undefined; // nonparticipating capturing group
    // based on es5-shim implementation, need to rework it
    $split = function (separator, limit) {
      var string = String(this);
      if (separator === undefined && limit === 0) return [];
      // If `separator` is not a regex, use native split
      if (!isRegExp(separator)) return _split.call(string, separator, limit);
      var output = [];
      var flags = (separator.ignoreCase ? 'i' : '') +
                  (separator.multiline ? 'm' : '') +
                  (separator.unicode ? 'u' : '') +
                  (separator.sticky ? 'y' : '');
      var lastLastIndex = 0;
      var splitLimit = limit === undefined ? 4294967295 : limit >>> 0;
      // Make `global` and avoid `lastIndex` issues by working with a copy
      var separatorCopy = new RegExp(separator.source, flags + 'g');
      var separator2, match, lastIndex, lastLength, i;
      // Doesn't need flags gy, but they don't hurt
      if (!NPCG) separator2 = new RegExp('^' + separatorCopy.source + '$(?!\\s)', flags);
      while (match = separatorCopy.exec(string)) {
        // `separatorCopy.lastIndex` is not reliable cross-browser
        lastIndex = match.index + match[0][LENGTH];
        if (lastIndex > lastLastIndex) {
          output.push(string.slice(lastLastIndex, match.index));
          // Fix browsers whose `exec` methods don't consistently return `undefined` for NPCG
          // eslint-disable-next-line no-loop-func
          if (!NPCG && match[LENGTH] > 1) match[0].replace(separator2, function () {
            for (i = 1; i < arguments[LENGTH] - 2; i++) if (arguments[i] === undefined) match[i] = undefined;
          });
          if (match[LENGTH] > 1 && match.index < string[LENGTH]) $push.apply(output, match.slice(1));
          lastLength = match[0][LENGTH];
          lastLastIndex = lastIndex;
          if (output[LENGTH] >= splitLimit) break;
        }
        if (separatorCopy[LAST_INDEX] === match.index) separatorCopy[LAST_INDEX]++; // Avoid an infinite loop
      }
      if (lastLastIndex === string[LENGTH]) {
        if (lastLength || !separatorCopy.test('')) output.push('');
      } else output.push(string.slice(lastLastIndex));
      return output[LENGTH] > splitLimit ? output.slice(0, splitLimit) : output;
    };
  // Chakra, V8
  } else if ('0'[$SPLIT](undefined, 0)[LENGTH]) {
    $split = function (separator, limit) {
      return separator === undefined && limit === 0 ? [] : _split.call(this, separator, limit);
    };
  }
  // 21.1.3.17 String.prototype.split(separator, limit)
  return [function split(separator, limit) {
    var O = defined(this);
    var fn = separator == undefined ? undefined : separator[SPLIT];
    return fn !== undefined ? fn.call(separator, O, limit) : $split.call(String(O), separator, limit);
  }, $split];
});


/***/ }),
/* 252 */
/*!*****************************************************!*\
  !*** ./node_modules/core-js/modules/es6.promise.js ***!
  \*****************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var LIBRARY = __webpack_require__(/*! ./_library */ 34);
var global = __webpack_require__(/*! ./_global */ 2);
var ctx = __webpack_require__(/*! ./_ctx */ 18);
var classof = __webpack_require__(/*! ./_classof */ 50);
var $export = __webpack_require__(/*! ./_export */ 0);
var isObject = __webpack_require__(/*! ./_is-object */ 4);
var aFunction = __webpack_require__(/*! ./_a-function */ 10);
var anInstance = __webpack_require__(/*! ./_an-instance */ 40);
var forOf = __webpack_require__(/*! ./_for-of */ 41);
var speciesConstructor = __webpack_require__(/*! ./_species-constructor */ 59);
var task = __webpack_require__(/*! ./_task */ 89).set;
var microtask = __webpack_require__(/*! ./_microtask */ 90)();
var newPromiseCapabilityModule = __webpack_require__(/*! ./_new-promise-capability */ 91);
var perform = __webpack_require__(/*! ./_perform */ 116);
var promiseResolve = __webpack_require__(/*! ./_promise-resolve */ 117);
var PROMISE = 'Promise';
var TypeError = global.TypeError;
var process = global.process;
var $Promise = global[PROMISE];
var isNode = classof(process) == 'process';
var empty = function () { /* empty */ };
var Internal, newGenericPromiseCapability, OwnPromiseCapability, Wrapper;
var newPromiseCapability = newGenericPromiseCapability = newPromiseCapabilityModule.f;

var USE_NATIVE = !!function () {
  try {
    // correct subclassing with @@species support
    var promise = $Promise.resolve(1);
    var FakePromise = (promise.constructor = {})[__webpack_require__(/*! ./_wks */ 5)('species')] = function (exec) {
      exec(empty, empty);
    };
    // unhandled rejections tracking support, NodeJS Promise without it fails @@species test
    return (isNode || typeof PromiseRejectionEvent == 'function') && promise.then(empty) instanceof FakePromise;
  } catch (e) { /* empty */ }
}();

// helpers
var isThenable = function (it) {
  var then;
  return isObject(it) && typeof (then = it.then) == 'function' ? then : false;
};
var notify = function (promise, isReject) {
  if (promise._n) return;
  promise._n = true;
  var chain = promise._c;
  microtask(function () {
    var value = promise._v;
    var ok = promise._s == 1;
    var i = 0;
    var run = function (reaction) {
      var handler = ok ? reaction.ok : reaction.fail;
      var resolve = reaction.resolve;
      var reject = reaction.reject;
      var domain = reaction.domain;
      var result, then;
      try {
        if (handler) {
          if (!ok) {
            if (promise._h == 2) onHandleUnhandled(promise);
            promise._h = 1;
          }
          if (handler === true) result = value;
          else {
            if (domain) domain.enter();
            result = handler(value);
            if (domain) domain.exit();
          }
          if (result === reaction.promise) {
            reject(TypeError('Promise-chain cycle'));
          } else if (then = isThenable(result)) {
            then.call(result, resolve, reject);
          } else resolve(result);
        } else reject(value);
      } catch (e) {
        reject(e);
      }
    };
    while (chain.length > i) run(chain[i++]); // variable length - can't use forEach
    promise._c = [];
    promise._n = false;
    if (isReject && !promise._h) onUnhandled(promise);
  });
};
var onUnhandled = function (promise) {
  task.call(global, function () {
    var value = promise._v;
    var unhandled = isUnhandled(promise);
    var result, handler, console;
    if (unhandled) {
      result = perform(function () {
        if (isNode) {
          process.emit('unhandledRejection', value, promise);
        } else if (handler = global.onunhandledrejection) {
          handler({ promise: promise, reason: value });
        } else if ((console = global.console) && console.error) {
          console.error('Unhandled promise rejection', value);
        }
      });
      // Browsers should not trigger `rejectionHandled` event if it was handled here, NodeJS - should
      promise._h = isNode || isUnhandled(promise) ? 2 : 1;
    } promise._a = undefined;
    if (unhandled && result.e) throw result.v;
  });
};
var isUnhandled = function (promise) {
  return promise._h !== 1 && (promise._a || promise._c).length === 0;
};
var onHandleUnhandled = function (promise) {
  task.call(global, function () {
    var handler;
    if (isNode) {
      process.emit('rejectionHandled', promise);
    } else if (handler = global.onrejectionhandled) {
      handler({ promise: promise, reason: promise._v });
    }
  });
};
var $reject = function (value) {
  var promise = this;
  if (promise._d) return;
  promise._d = true;
  promise = promise._w || promise; // unwrap
  promise._v = value;
  promise._s = 2;
  if (!promise._a) promise._a = promise._c.slice();
  notify(promise, true);
};
var $resolve = function (value) {
  var promise = this;
  var then;
  if (promise._d) return;
  promise._d = true;
  promise = promise._w || promise; // unwrap
  try {
    if (promise === value) throw TypeError("Promise can't be resolved itself");
    if (then = isThenable(value)) {
      microtask(function () {
        var wrapper = { _w: promise, _d: false }; // wrap
        try {
          then.call(value, ctx($resolve, wrapper, 1), ctx($reject, wrapper, 1));
        } catch (e) {
          $reject.call(wrapper, e);
        }
      });
    } else {
      promise._v = value;
      promise._s = 1;
      notify(promise, false);
    }
  } catch (e) {
    $reject.call({ _w: promise, _d: false }, e); // wrap
  }
};

// constructor polyfill
if (!USE_NATIVE) {
  // 25.4.3.1 Promise(executor)
  $Promise = function Promise(executor) {
    anInstance(this, $Promise, PROMISE, '_h');
    aFunction(executor);
    Internal.call(this);
    try {
      executor(ctx($resolve, this, 1), ctx($reject, this, 1));
    } catch (err) {
      $reject.call(this, err);
    }
  };
  // eslint-disable-next-line no-unused-vars
  Internal = function Promise(executor) {
    this._c = [];             // <- awaiting reactions
    this._a = undefined;      // <- checked in isUnhandled reactions
    this._s = 0;              // <- state
    this._d = false;          // <- done
    this._v = undefined;      // <- value
    this._h = 0;              // <- rejection state, 0 - default, 1 - handled, 2 - unhandled
    this._n = false;          // <- notify
  };
  Internal.prototype = __webpack_require__(/*! ./_redefine-all */ 42)($Promise.prototype, {
    // 25.4.5.3 Promise.prototype.then(onFulfilled, onRejected)
    then: function then(onFulfilled, onRejected) {
      var reaction = newPromiseCapability(speciesConstructor(this, $Promise));
      reaction.ok = typeof onFulfilled == 'function' ? onFulfilled : true;
      reaction.fail = typeof onRejected == 'function' && onRejected;
      reaction.domain = isNode ? process.domain : undefined;
      this._c.push(reaction);
      if (this._a) this._a.push(reaction);
      if (this._s) notify(this, false);
      return reaction.promise;
    },
    // 25.4.5.1 Promise.prototype.catch(onRejected)
    'catch': function (onRejected) {
      return this.then(undefined, onRejected);
    }
  });
  OwnPromiseCapability = function () {
    var promise = new Internal();
    this.promise = promise;
    this.resolve = ctx($resolve, promise, 1);
    this.reject = ctx($reject, promise, 1);
  };
  newPromiseCapabilityModule.f = newPromiseCapability = function (C) {
    return C === $Promise || C === Wrapper
      ? new OwnPromiseCapability(C)
      : newGenericPromiseCapability(C);
  };
}

$export($export.G + $export.W + $export.F * !USE_NATIVE, { Promise: $Promise });
__webpack_require__(/*! ./_set-to-string-tag */ 43)($Promise, PROMISE);
__webpack_require__(/*! ./_set-species */ 39)(PROMISE);
Wrapper = __webpack_require__(/*! ./_core */ 21)[PROMISE];

// statics
$export($export.S + $export.F * !USE_NATIVE, PROMISE, {
  // 25.4.4.5 Promise.reject(r)
  reject: function reject(r) {
    var capability = newPromiseCapability(this);
    var $$reject = capability.reject;
    $$reject(r);
    return capability.promise;
  }
});
$export($export.S + $export.F * (LIBRARY || !USE_NATIVE), PROMISE, {
  // 25.4.4.6 Promise.resolve(x)
  resolve: function resolve(x) {
    return promiseResolve(LIBRARY && this === Wrapper ? $Promise : this, x);
  }
});
$export($export.S + $export.F * !(USE_NATIVE && __webpack_require__(/*! ./_iter-detect */ 56)(function (iter) {
  $Promise.all(iter)['catch'](empty);
})), PROMISE, {
  // 25.4.4.1 Promise.all(iterable)
  all: function all(iterable) {
    var C = this;
    var capability = newPromiseCapability(C);
    var resolve = capability.resolve;
    var reject = capability.reject;
    var result = perform(function () {
      var values = [];
      var index = 0;
      var remaining = 1;
      forOf(iterable, false, function (promise) {
        var $index = index++;
        var alreadyCalled = false;
        values.push(undefined);
        remaining++;
        C.resolve(promise).then(function (value) {
          if (alreadyCalled) return;
          alreadyCalled = true;
          values[$index] = value;
          --remaining || resolve(values);
        }, reject);
      });
      --remaining || resolve(values);
    });
    if (result.e) reject(result.v);
    return capability.promise;
  },
  // 25.4.4.4 Promise.race(iterable)
  race: function race(iterable) {
    var C = this;
    var capability = newPromiseCapability(C);
    var reject = capability.reject;
    var result = perform(function () {
      forOf(iterable, false, function (promise) {
        C.resolve(promise).then(capability.resolve, reject);
      });
    });
    if (result.e) reject(result.v);
    return capability.promise;
  }
});


/***/ }),
/* 253 */
/*!******************************************************!*\
  !*** ./node_modules/core-js/modules/es6.weak-set.js ***!
  \******************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var weak = __webpack_require__(/*! ./_collection-weak */ 122);
var validate = __webpack_require__(/*! ./_validate-collection */ 46);
var WEAK_SET = 'WeakSet';

// 23.4 WeakSet Objects
__webpack_require__(/*! ./_collection */ 60)(WEAK_SET, function (get) {
  return function WeakSet() { return get(this, arguments.length > 0 ? arguments[0] : undefined); };
}, {
  // 23.4.3.1 WeakSet.prototype.add(value)
  add: function add(value) {
    return weak.def(validate(this, WEAK_SET), value, true);
  }
}, weak, false, true);


/***/ }),
/* 254 */
/*!****************************************************************!*\
  !*** ./node_modules/core-js/modules/es6.typed.array-buffer.js ***!
  \****************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export = __webpack_require__(/*! ./_export */ 0);
var $typed = __webpack_require__(/*! ./_typed */ 61);
var buffer = __webpack_require__(/*! ./_typed-buffer */ 92);
var anObject = __webpack_require__(/*! ./_an-object */ 1);
var toAbsoluteIndex = __webpack_require__(/*! ./_to-absolute-index */ 36);
var toLength = __webpack_require__(/*! ./_to-length */ 8);
var isObject = __webpack_require__(/*! ./_is-object */ 4);
var ArrayBuffer = __webpack_require__(/*! ./_global */ 2).ArrayBuffer;
var speciesConstructor = __webpack_require__(/*! ./_species-constructor */ 59);
var $ArrayBuffer = buffer.ArrayBuffer;
var $DataView = buffer.DataView;
var $isView = $typed.ABV && ArrayBuffer.isView;
var $slice = $ArrayBuffer.prototype.slice;
var VIEW = $typed.VIEW;
var ARRAY_BUFFER = 'ArrayBuffer';

$export($export.G + $export.W + $export.F * (ArrayBuffer !== $ArrayBuffer), { ArrayBuffer: $ArrayBuffer });

$export($export.S + $export.F * !$typed.CONSTR, ARRAY_BUFFER, {
  // 24.1.3.1 ArrayBuffer.isView(arg)
  isView: function isView(it) {
    return $isView && $isView(it) || isObject(it) && VIEW in it;
  }
});

$export($export.P + $export.U + $export.F * __webpack_require__(/*! ./_fails */ 3)(function () {
  return !new $ArrayBuffer(2).slice(1, undefined).byteLength;
}), ARRAY_BUFFER, {
  // 24.1.4.3 ArrayBuffer.prototype.slice(start, end)
  slice: function slice(start, end) {
    if ($slice !== undefined && end === undefined) return $slice.call(anObject(this), start); // FF fix
    var len = anObject(this).byteLength;
    var first = toAbsoluteIndex(start, len);
    var final = toAbsoluteIndex(end === undefined ? len : end, len);
    var result = new (speciesConstructor(this, $ArrayBuffer))(toLength(final - first));
    var viewS = new $DataView(this);
    var viewT = new $DataView(result);
    var index = 0;
    while (first < final) {
      viewT.setUint8(index++, viewS.getUint8(first++));
    } return result;
  }
});

__webpack_require__(/*! ./_set-species */ 39)(ARRAY_BUFFER);


/***/ }),
/* 255 */
/*!*************************************************************!*\
  !*** ./node_modules/core-js/modules/es6.typed.data-view.js ***!
  \*************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__(/*! ./_export */ 0);
$export($export.G + $export.W + $export.F * !__webpack_require__(/*! ./_typed */ 61).ABV, {
  DataView: __webpack_require__(/*! ./_typed-buffer */ 92).DataView
});


/***/ }),
/* 256 */
/*!**************************************************************!*\
  !*** ./node_modules/core-js/modules/es6.typed.int8-array.js ***!
  \**************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! ./_typed-array */ 27)('Int8', 1, function (init) {
  return function Int8Array(data, byteOffset, length) {
    return init(this, data, byteOffset, length);
  };
});


/***/ }),
/* 257 */
/*!***************************************************************!*\
  !*** ./node_modules/core-js/modules/es6.typed.uint8-array.js ***!
  \***************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! ./_typed-array */ 27)('Uint8', 1, function (init) {
  return function Uint8Array(data, byteOffset, length) {
    return init(this, data, byteOffset, length);
  };
});


/***/ }),
/* 258 */
/*!***********************************************************************!*\
  !*** ./node_modules/core-js/modules/es6.typed.uint8-clamped-array.js ***!
  \***********************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! ./_typed-array */ 27)('Uint8', 1, function (init) {
  return function Uint8ClampedArray(data, byteOffset, length) {
    return init(this, data, byteOffset, length);
  };
}, true);


/***/ }),
/* 259 */
/*!***************************************************************!*\
  !*** ./node_modules/core-js/modules/es6.typed.int16-array.js ***!
  \***************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! ./_typed-array */ 27)('Int16', 2, function (init) {
  return function Int16Array(data, byteOffset, length) {
    return init(this, data, byteOffset, length);
  };
});


/***/ }),
/* 260 */
/*!****************************************************************!*\
  !*** ./node_modules/core-js/modules/es6.typed.uint16-array.js ***!
  \****************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! ./_typed-array */ 27)('Uint16', 2, function (init) {
  return function Uint16Array(data, byteOffset, length) {
    return init(this, data, byteOffset, length);
  };
});


/***/ }),
/* 261 */
/*!***************************************************************!*\
  !*** ./node_modules/core-js/modules/es6.typed.int32-array.js ***!
  \***************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! ./_typed-array */ 27)('Int32', 4, function (init) {
  return function Int32Array(data, byteOffset, length) {
    return init(this, data, byteOffset, length);
  };
});


/***/ }),
/* 262 */
/*!****************************************************************!*\
  !*** ./node_modules/core-js/modules/es6.typed.uint32-array.js ***!
  \****************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! ./_typed-array */ 27)('Uint32', 4, function (init) {
  return function Uint32Array(data, byteOffset, length) {
    return init(this, data, byteOffset, length);
  };
});


/***/ }),
/* 263 */
/*!*****************************************************************!*\
  !*** ./node_modules/core-js/modules/es6.typed.float32-array.js ***!
  \*****************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! ./_typed-array */ 27)('Float32', 4, function (init) {
  return function Float32Array(data, byteOffset, length) {
    return init(this, data, byteOffset, length);
  };
});


/***/ }),
/* 264 */
/*!*****************************************************************!*\
  !*** ./node_modules/core-js/modules/es6.typed.float64-array.js ***!
  \*****************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! ./_typed-array */ 27)('Float64', 8, function (init) {
  return function Float64Array(data, byteOffset, length) {
    return init(this, data, byteOffset, length);
  };
});


/***/ }),
/* 265 */
/*!***********************************************************!*\
  !*** ./node_modules/core-js/modules/es6.reflect.apply.js ***!
  \***********************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// 26.1.1 Reflect.apply(target, thisArgument, argumentsList)
var $export = __webpack_require__(/*! ./_export */ 0);
var aFunction = __webpack_require__(/*! ./_a-function */ 10);
var anObject = __webpack_require__(/*! ./_an-object */ 1);
var rApply = (__webpack_require__(/*! ./_global */ 2).Reflect || {}).apply;
var fApply = Function.apply;
// MS Edge argumentsList argument is optional
$export($export.S + $export.F * !__webpack_require__(/*! ./_fails */ 3)(function () {
  rApply(function () { /* empty */ });
}), 'Reflect', {
  apply: function apply(target, thisArgument, argumentsList) {
    var T = aFunction(target);
    var L = anObject(argumentsList);
    return rApply ? rApply(T, thisArgument, L) : fApply.call(T, thisArgument, L);
  }
});


/***/ }),
/* 266 */
/*!***************************************************************!*\
  !*** ./node_modules/core-js/modules/es6.reflect.construct.js ***!
  \***************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// 26.1.2 Reflect.construct(target, argumentsList [, newTarget])
var $export = __webpack_require__(/*! ./_export */ 0);
var create = __webpack_require__(/*! ./_object-create */ 37);
var aFunction = __webpack_require__(/*! ./_a-function */ 10);
var anObject = __webpack_require__(/*! ./_an-object */ 1);
var isObject = __webpack_require__(/*! ./_is-object */ 4);
var fails = __webpack_require__(/*! ./_fails */ 3);
var bind = __webpack_require__(/*! ./_bind */ 103);
var rConstruct = (__webpack_require__(/*! ./_global */ 2).Reflect || {}).construct;

// MS Edge supports only 2 arguments and argumentsList argument is optional
// FF Nightly sets third argument as `new.target`, but does not create `this` from it
var NEW_TARGET_BUG = fails(function () {
  function F() { /* empty */ }
  return !(rConstruct(function () { /* empty */ }, [], F) instanceof F);
});
var ARGS_BUG = !fails(function () {
  rConstruct(function () { /* empty */ });
});

$export($export.S + $export.F * (NEW_TARGET_BUG || ARGS_BUG), 'Reflect', {
  construct: function construct(Target, args /* , newTarget */) {
    aFunction(Target);
    anObject(args);
    var newTarget = arguments.length < 3 ? Target : aFunction(arguments[2]);
    if (ARGS_BUG && !NEW_TARGET_BUG) return rConstruct(Target, args, newTarget);
    if (Target == newTarget) {
      // w/o altered newTarget, optimization for 0-4 arguments
      switch (args.length) {
        case 0: return new Target();
        case 1: return new Target(args[0]);
        case 2: return new Target(args[0], args[1]);
        case 3: return new Target(args[0], args[1], args[2]);
        case 4: return new Target(args[0], args[1], args[2], args[3]);
      }
      // w/o altered newTarget, lot of arguments case
      var $args = [null];
      $args.push.apply($args, args);
      return new (bind.apply(Target, $args))();
    }
    // with altered newTarget, not support built-in constructors
    var proto = newTarget.prototype;
    var instance = create(isObject(proto) ? proto : Object.prototype);
    var result = Function.apply.call(Target, instance, args);
    return isObject(result) ? result : instance;
  }
});


/***/ }),
/* 267 */
/*!*********************************************************************!*\
  !*** ./node_modules/core-js/modules/es6.reflect.define-property.js ***!
  \*********************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// 26.1.3 Reflect.defineProperty(target, propertyKey, attributes)
var dP = __webpack_require__(/*! ./_object-dp */ 7);
var $export = __webpack_require__(/*! ./_export */ 0);
var anObject = __webpack_require__(/*! ./_an-object */ 1);
var toPrimitive = __webpack_require__(/*! ./_to-primitive */ 22);

// MS Edge has broken Reflect.defineProperty - throwing instead of returning false
$export($export.S + $export.F * __webpack_require__(/*! ./_fails */ 3)(function () {
  // eslint-disable-next-line no-undef
  Reflect.defineProperty(dP.f({}, 1, { value: 1 }), 1, { value: 2 });
}), 'Reflect', {
  defineProperty: function defineProperty(target, propertyKey, attributes) {
    anObject(target);
    propertyKey = toPrimitive(propertyKey, true);
    anObject(attributes);
    try {
      dP.f(target, propertyKey, attributes);
      return true;
    } catch (e) {
      return false;
    }
  }
});


/***/ }),
/* 268 */
/*!*********************************************************************!*\
  !*** ./node_modules/core-js/modules/es6.reflect.delete-property.js ***!
  \*********************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// 26.1.4 Reflect.deleteProperty(target, propertyKey)
var $export = __webpack_require__(/*! ./_export */ 0);
var gOPD = __webpack_require__(/*! ./_object-gopd */ 16).f;
var anObject = __webpack_require__(/*! ./_an-object */ 1);

$export($export.S, 'Reflect', {
  deleteProperty: function deleteProperty(target, propertyKey) {
    var desc = gOPD(anObject(target), propertyKey);
    return desc && !desc.configurable ? false : delete target[propertyKey];
  }
});


/***/ }),
/* 269 */
/*!***************************************************************!*\
  !*** ./node_modules/core-js/modules/es6.reflect.enumerate.js ***!
  \***************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// 26.1.5 Reflect.enumerate(target)
var $export = __webpack_require__(/*! ./_export */ 0);
var anObject = __webpack_require__(/*! ./_an-object */ 1);
var Enumerate = function (iterated) {
  this._t = anObject(iterated); // target
  this._i = 0;                  // next index
  var keys = this._k = [];      // keys
  var key;
  for (key in iterated) keys.push(key);
};
__webpack_require__(/*! ./_iter-create */ 80)(Enumerate, 'Object', function () {
  var that = this;
  var keys = that._k;
  var key;
  do {
    if (that._i >= keys.length) return { value: undefined, done: true };
  } while (!((key = keys[that._i++]) in that._t));
  return { value: key, done: false };
});

$export($export.S, 'Reflect', {
  enumerate: function enumerate(target) {
    return new Enumerate(target);
  }
});


/***/ }),
/* 270 */
/*!*********************************************************!*\
  !*** ./node_modules/core-js/modules/es6.reflect.get.js ***!
  \*********************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// 26.1.6 Reflect.get(target, propertyKey [, receiver])
var gOPD = __webpack_require__(/*! ./_object-gopd */ 16);
var getPrototypeOf = __webpack_require__(/*! ./_object-gpo */ 17);
var has = __webpack_require__(/*! ./_has */ 11);
var $export = __webpack_require__(/*! ./_export */ 0);
var isObject = __webpack_require__(/*! ./_is-object */ 4);
var anObject = __webpack_require__(/*! ./_an-object */ 1);

function get(target, propertyKey /* , receiver */) {
  var receiver = arguments.length < 3 ? target : arguments[2];
  var desc, proto;
  if (anObject(target) === receiver) return target[propertyKey];
  if (desc = gOPD.f(target, propertyKey)) return has(desc, 'value')
    ? desc.value
    : desc.get !== undefined
      ? desc.get.call(receiver)
      : undefined;
  if (isObject(proto = getPrototypeOf(target))) return get(proto, propertyKey, receiver);
}

$export($export.S, 'Reflect', { get: get });


/***/ }),
/* 271 */
/*!*********************************************************************************!*\
  !*** ./node_modules/core-js/modules/es6.reflect.get-own-property-descriptor.js ***!
  \*********************************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// 26.1.7 Reflect.getOwnPropertyDescriptor(target, propertyKey)
var gOPD = __webpack_require__(/*! ./_object-gopd */ 16);
var $export = __webpack_require__(/*! ./_export */ 0);
var anObject = __webpack_require__(/*! ./_an-object */ 1);

$export($export.S, 'Reflect', {
  getOwnPropertyDescriptor: function getOwnPropertyDescriptor(target, propertyKey) {
    return gOPD.f(anObject(target), propertyKey);
  }
});


/***/ }),
/* 272 */
/*!**********************************************************************!*\
  !*** ./node_modules/core-js/modules/es6.reflect.get-prototype-of.js ***!
  \**********************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// 26.1.8 Reflect.getPrototypeOf(target)
var $export = __webpack_require__(/*! ./_export */ 0);
var getProto = __webpack_require__(/*! ./_object-gpo */ 17);
var anObject = __webpack_require__(/*! ./_an-object */ 1);

$export($export.S, 'Reflect', {
  getPrototypeOf: function getPrototypeOf(target) {
    return getProto(anObject(target));
  }
});


/***/ }),
/* 273 */
/*!*********************************************************!*\
  !*** ./node_modules/core-js/modules/es6.reflect.has.js ***!
  \*********************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// 26.1.9 Reflect.has(target, propertyKey)
var $export = __webpack_require__(/*! ./_export */ 0);

$export($export.S, 'Reflect', {
  has: function has(target, propertyKey) {
    return propertyKey in target;
  }
});


/***/ }),
/* 274 */
/*!*******************************************************************!*\
  !*** ./node_modules/core-js/modules/es6.reflect.is-extensible.js ***!
  \*******************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// 26.1.10 Reflect.isExtensible(target)
var $export = __webpack_require__(/*! ./_export */ 0);
var anObject = __webpack_require__(/*! ./_an-object */ 1);
var $isExtensible = Object.isExtensible;

$export($export.S, 'Reflect', {
  isExtensible: function isExtensible(target) {
    anObject(target);
    return $isExtensible ? $isExtensible(target) : true;
  }
});


/***/ }),
/* 275 */
/*!**************************************************************!*\
  !*** ./node_modules/core-js/modules/es6.reflect.own-keys.js ***!
  \**************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// 26.1.11 Reflect.ownKeys(target)
var $export = __webpack_require__(/*! ./_export */ 0);

$export($export.S, 'Reflect', { ownKeys: __webpack_require__(/*! ./_own-keys */ 124) });


/***/ }),
/* 276 */
/*!************************************************************************!*\
  !*** ./node_modules/core-js/modules/es6.reflect.prevent-extensions.js ***!
  \************************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// 26.1.12 Reflect.preventExtensions(target)
var $export = __webpack_require__(/*! ./_export */ 0);
var anObject = __webpack_require__(/*! ./_an-object */ 1);
var $preventExtensions = Object.preventExtensions;

$export($export.S, 'Reflect', {
  preventExtensions: function preventExtensions(target) {
    anObject(target);
    try {
      if ($preventExtensions) $preventExtensions(target);
      return true;
    } catch (e) {
      return false;
    }
  }
});


/***/ }),
/* 277 */
/*!*********************************************************!*\
  !*** ./node_modules/core-js/modules/es6.reflect.set.js ***!
  \*********************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// 26.1.13 Reflect.set(target, propertyKey, V [, receiver])
var dP = __webpack_require__(/*! ./_object-dp */ 7);
var gOPD = __webpack_require__(/*! ./_object-gopd */ 16);
var getPrototypeOf = __webpack_require__(/*! ./_object-gpo */ 17);
var has = __webpack_require__(/*! ./_has */ 11);
var $export = __webpack_require__(/*! ./_export */ 0);
var createDesc = __webpack_require__(/*! ./_property-desc */ 32);
var anObject = __webpack_require__(/*! ./_an-object */ 1);
var isObject = __webpack_require__(/*! ./_is-object */ 4);

function set(target, propertyKey, V /* , receiver */) {
  var receiver = arguments.length < 4 ? target : arguments[3];
  var ownDesc = gOPD.f(anObject(target), propertyKey);
  var existingDescriptor, proto;
  if (!ownDesc) {
    if (isObject(proto = getPrototypeOf(target))) {
      return set(proto, propertyKey, V, receiver);
    }
    ownDesc = createDesc(0);
  }
  if (has(ownDesc, 'value')) {
    if (ownDesc.writable === false || !isObject(receiver)) return false;
    existingDescriptor = gOPD.f(receiver, propertyKey) || createDesc(0);
    existingDescriptor.value = V;
    dP.f(receiver, propertyKey, existingDescriptor);
    return true;
  }
  return ownDesc.set === undefined ? false : (ownDesc.set.call(receiver, V), true);
}

$export($export.S, 'Reflect', { set: set });


/***/ }),
/* 278 */
/*!**********************************************************************!*\
  !*** ./node_modules/core-js/modules/es6.reflect.set-prototype-of.js ***!
  \**********************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// 26.1.14 Reflect.setPrototypeOf(target, proto)
var $export = __webpack_require__(/*! ./_export */ 0);
var setProto = __webpack_require__(/*! ./_set-proto */ 72);

if (setProto) $export($export.S, 'Reflect', {
  setPrototypeOf: function setPrototypeOf(target, proto) {
    setProto.check(target, proto);
    try {
      setProto.set(target, proto);
      return true;
    } catch (e) {
      return false;
    }
  }
});


/***/ }),
/* 279 */
/*!************************************************************!*\
  !*** ./node_modules/core-js/modules/es7.array.includes.js ***!
  \************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// https://github.com/tc39/Array.prototype.includes
var $export = __webpack_require__(/*! ./_export */ 0);
var $includes = __webpack_require__(/*! ./_array-includes */ 52)(true);

$export($export.P, 'Array', {
  includes: function includes(el /* , fromIndex = 0 */) {
    return $includes(this, el, arguments.length > 1 ? arguments[1] : undefined);
  }
});

__webpack_require__(/*! ./_add-to-unscopables */ 31)('includes');


/***/ }),
/* 280 */
/*!************************************************************!*\
  !*** ./node_modules/core-js/modules/es7.array.flat-map.js ***!
  \************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// https://tc39.github.io/proposal-flatMap/#sec-Array.prototype.flatMap
var $export = __webpack_require__(/*! ./_export */ 0);
var flattenIntoArray = __webpack_require__(/*! ./_flatten-into-array */ 125);
var toObject = __webpack_require__(/*! ./_to-object */ 9);
var toLength = __webpack_require__(/*! ./_to-length */ 8);
var aFunction = __webpack_require__(/*! ./_a-function */ 10);
var arraySpeciesCreate = __webpack_require__(/*! ./_array-species-create */ 86);

$export($export.P, 'Array', {
  flatMap: function flatMap(callbackfn /* , thisArg */) {
    var O = toObject(this);
    var sourceLen, A;
    aFunction(callbackfn);
    sourceLen = toLength(O.length);
    A = arraySpeciesCreate(O, 0);
    flattenIntoArray(A, O, O, sourceLen, 0, 1, callbackfn, arguments[1]);
    return A;
  }
});

__webpack_require__(/*! ./_add-to-unscopables */ 31)('flatMap');


/***/ }),
/* 281 */
/*!***********************************************************!*\
  !*** ./node_modules/core-js/modules/es7.array.flatten.js ***!
  \***********************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// https://tc39.github.io/proposal-flatMap/#sec-Array.prototype.flatten
var $export = __webpack_require__(/*! ./_export */ 0);
var flattenIntoArray = __webpack_require__(/*! ./_flatten-into-array */ 125);
var toObject = __webpack_require__(/*! ./_to-object */ 9);
var toLength = __webpack_require__(/*! ./_to-length */ 8);
var toInteger = __webpack_require__(/*! ./_to-integer */ 24);
var arraySpeciesCreate = __webpack_require__(/*! ./_array-species-create */ 86);

$export($export.P, 'Array', {
  flatten: function flatten(/* depthArg = 1 */) {
    var depthArg = arguments[0];
    var O = toObject(this);
    var sourceLen = toLength(O.length);
    var A = arraySpeciesCreate(O, 0);
    flattenIntoArray(A, O, O, sourceLen, 0, depthArg === undefined ? 1 : toInteger(depthArg));
    return A;
  }
});

__webpack_require__(/*! ./_add-to-unscopables */ 31)('flatten');


/***/ }),
/* 282 */
/*!*******************************************************!*\
  !*** ./node_modules/core-js/modules/es7.string.at.js ***!
  \*******************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// https://github.com/mathiasbynens/String.prototype.at
var $export = __webpack_require__(/*! ./_export */ 0);
var $at = __webpack_require__(/*! ./_string-at */ 78)(true);

$export($export.P, 'String', {
  at: function at(pos) {
    return $at(this, pos);
  }
});


/***/ }),
/* 283 */
/*!**************************************************************!*\
  !*** ./node_modules/core-js/modules/es7.string.pad-start.js ***!
  \**************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// https://github.com/tc39/proposal-string-pad-start-end
var $export = __webpack_require__(/*! ./_export */ 0);
var $pad = __webpack_require__(/*! ./_string-pad */ 126);
var userAgent = __webpack_require__(/*! ./_user-agent */ 93);

// https://github.com/zloirock/core-js/issues/280
$export($export.P + $export.F * /Version\/10\.\d+(\.\d+)? Safari\//.test(userAgent), 'String', {
  padStart: function padStart(maxLength /* , fillString = ' ' */) {
    return $pad(this, maxLength, arguments.length > 1 ? arguments[1] : undefined, true);
  }
});


/***/ }),
/* 284 */
/*!************************************************************!*\
  !*** ./node_modules/core-js/modules/es7.string.pad-end.js ***!
  \************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// https://github.com/tc39/proposal-string-pad-start-end
var $export = __webpack_require__(/*! ./_export */ 0);
var $pad = __webpack_require__(/*! ./_string-pad */ 126);
var userAgent = __webpack_require__(/*! ./_user-agent */ 93);

// https://github.com/zloirock/core-js/issues/280
$export($export.P + $export.F * /Version\/10\.\d+(\.\d+)? Safari\//.test(userAgent), 'String', {
  padEnd: function padEnd(maxLength /* , fillString = ' ' */) {
    return $pad(this, maxLength, arguments.length > 1 ? arguments[1] : undefined, false);
  }
});


/***/ }),
/* 285 */
/*!**************************************************************!*\
  !*** ./node_modules/core-js/modules/es7.string.trim-left.js ***!
  \**************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// https://github.com/sebmarkbage/ecmascript-string-left-right-trim
__webpack_require__(/*! ./_string-trim */ 44)('trimLeft', function ($trim) {
  return function trimLeft() {
    return $trim(this, 1);
  };
}, 'trimStart');


/***/ }),
/* 286 */
/*!***************************************************************!*\
  !*** ./node_modules/core-js/modules/es7.string.trim-right.js ***!
  \***************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// https://github.com/sebmarkbage/ecmascript-string-left-right-trim
__webpack_require__(/*! ./_string-trim */ 44)('trimRight', function ($trim) {
  return function trimRight() {
    return $trim(this, 2);
  };
}, 'trimEnd');


/***/ }),
/* 287 */
/*!**************************************************************!*\
  !*** ./node_modules/core-js/modules/es7.string.match-all.js ***!
  \**************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// https://tc39.github.io/String.prototype.matchAll/
var $export = __webpack_require__(/*! ./_export */ 0);
var defined = __webpack_require__(/*! ./_defined */ 23);
var toLength = __webpack_require__(/*! ./_to-length */ 8);
var isRegExp = __webpack_require__(/*! ./_is-regexp */ 55);
var getFlags = __webpack_require__(/*! ./_flags */ 57);
var RegExpProto = RegExp.prototype;

var $RegExpStringIterator = function (regexp, string) {
  this._r = regexp;
  this._s = string;
};

__webpack_require__(/*! ./_iter-create */ 80)($RegExpStringIterator, 'RegExp String', function next() {
  var match = this._r.exec(this._s);
  return { value: match, done: match === null };
});

$export($export.P, 'String', {
  matchAll: function matchAll(regexp) {
    defined(this);
    if (!isRegExp(regexp)) throw TypeError(regexp + ' is not a regexp!');
    var S = String(this);
    var flags = 'flags' in RegExpProto ? String(regexp.flags) : getFlags.call(regexp);
    var rx = new RegExp(regexp.source, ~flags.indexOf('g') ? flags : 'g' + flags);
    rx.lastIndex = toLength(regexp.lastIndex);
    return new $RegExpStringIterator(rx, S);
  }
});


/***/ }),
/* 288 */
/*!*******************************************************************!*\
  !*** ./node_modules/core-js/modules/es7.symbol.async-iterator.js ***!
  \*******************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! ./_wks-define */ 68)('asyncIterator');


/***/ }),
/* 289 */
/*!***************************************************************!*\
  !*** ./node_modules/core-js/modules/es7.symbol.observable.js ***!
  \***************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! ./_wks-define */ 68)('observable');


/***/ }),
/* 290 */
/*!*********************************************************************************!*\
  !*** ./node_modules/core-js/modules/es7.object.get-own-property-descriptors.js ***!
  \*********************************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// https://github.com/tc39/proposal-object-getownpropertydescriptors
var $export = __webpack_require__(/*! ./_export */ 0);
var ownKeys = __webpack_require__(/*! ./_own-keys */ 124);
var toIObject = __webpack_require__(/*! ./_to-iobject */ 15);
var gOPD = __webpack_require__(/*! ./_object-gopd */ 16);
var createProperty = __webpack_require__(/*! ./_create-property */ 84);

$export($export.S, 'Object', {
  getOwnPropertyDescriptors: function getOwnPropertyDescriptors(object) {
    var O = toIObject(object);
    var getDesc = gOPD.f;
    var keys = ownKeys(O);
    var result = {};
    var i = 0;
    var key, desc;
    while (keys.length > i) {
      desc = getDesc(O, key = keys[i++]);
      if (desc !== undefined) createProperty(result, key, desc);
    }
    return result;
  }
});


/***/ }),
/* 291 */
/*!***********************************************************!*\
  !*** ./node_modules/core-js/modules/es7.object.values.js ***!
  \***********************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// https://github.com/tc39/proposal-object-values-entries
var $export = __webpack_require__(/*! ./_export */ 0);
var $values = __webpack_require__(/*! ./_object-to-array */ 127)(false);

$export($export.S, 'Object', {
  values: function values(it) {
    return $values(it);
  }
});


/***/ }),
/* 292 */
/*!************************************************************!*\
  !*** ./node_modules/core-js/modules/es7.object.entries.js ***!
  \************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// https://github.com/tc39/proposal-object-values-entries
var $export = __webpack_require__(/*! ./_export */ 0);
var $entries = __webpack_require__(/*! ./_object-to-array */ 127)(true);

$export($export.S, 'Object', {
  entries: function entries(it) {
    return $entries(it);
  }
});


/***/ }),
/* 293 */
/*!******************************************************************!*\
  !*** ./node_modules/core-js/modules/es7.object.define-getter.js ***!
  \******************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export = __webpack_require__(/*! ./_export */ 0);
var toObject = __webpack_require__(/*! ./_to-object */ 9);
var aFunction = __webpack_require__(/*! ./_a-function */ 10);
var $defineProperty = __webpack_require__(/*! ./_object-dp */ 7);

// B.2.2.2 Object.prototype.__defineGetter__(P, getter)
__webpack_require__(/*! ./_descriptors */ 6) && $export($export.P + __webpack_require__(/*! ./_object-forced-pam */ 62), 'Object', {
  __defineGetter__: function __defineGetter__(P, getter) {
    $defineProperty.f(toObject(this), P, { get: aFunction(getter), enumerable: true, configurable: true });
  }
});


/***/ }),
/* 294 */
/*!******************************************************************!*\
  !*** ./node_modules/core-js/modules/es7.object.define-setter.js ***!
  \******************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export = __webpack_require__(/*! ./_export */ 0);
var toObject = __webpack_require__(/*! ./_to-object */ 9);
var aFunction = __webpack_require__(/*! ./_a-function */ 10);
var $defineProperty = __webpack_require__(/*! ./_object-dp */ 7);

// B.2.2.3 Object.prototype.__defineSetter__(P, setter)
__webpack_require__(/*! ./_descriptors */ 6) && $export($export.P + __webpack_require__(/*! ./_object-forced-pam */ 62), 'Object', {
  __defineSetter__: function __defineSetter__(P, setter) {
    $defineProperty.f(toObject(this), P, { set: aFunction(setter), enumerable: true, configurable: true });
  }
});


/***/ }),
/* 295 */
/*!******************************************************************!*\
  !*** ./node_modules/core-js/modules/es7.object.lookup-getter.js ***!
  \******************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export = __webpack_require__(/*! ./_export */ 0);
var toObject = __webpack_require__(/*! ./_to-object */ 9);
var toPrimitive = __webpack_require__(/*! ./_to-primitive */ 22);
var getPrototypeOf = __webpack_require__(/*! ./_object-gpo */ 17);
var getOwnPropertyDescriptor = __webpack_require__(/*! ./_object-gopd */ 16).f;

// B.2.2.4 Object.prototype.__lookupGetter__(P)
__webpack_require__(/*! ./_descriptors */ 6) && $export($export.P + __webpack_require__(/*! ./_object-forced-pam */ 62), 'Object', {
  __lookupGetter__: function __lookupGetter__(P) {
    var O = toObject(this);
    var K = toPrimitive(P, true);
    var D;
    do {
      if (D = getOwnPropertyDescriptor(O, K)) return D.get;
    } while (O = getPrototypeOf(O));
  }
});


/***/ }),
/* 296 */
/*!******************************************************************!*\
  !*** ./node_modules/core-js/modules/es7.object.lookup-setter.js ***!
  \******************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export = __webpack_require__(/*! ./_export */ 0);
var toObject = __webpack_require__(/*! ./_to-object */ 9);
var toPrimitive = __webpack_require__(/*! ./_to-primitive */ 22);
var getPrototypeOf = __webpack_require__(/*! ./_object-gpo */ 17);
var getOwnPropertyDescriptor = __webpack_require__(/*! ./_object-gopd */ 16).f;

// B.2.2.5 Object.prototype.__lookupSetter__(P)
__webpack_require__(/*! ./_descriptors */ 6) && $export($export.P + __webpack_require__(/*! ./_object-forced-pam */ 62), 'Object', {
  __lookupSetter__: function __lookupSetter__(P) {
    var O = toObject(this);
    var K = toPrimitive(P, true);
    var D;
    do {
      if (D = getOwnPropertyDescriptor(O, K)) return D.set;
    } while (O = getPrototypeOf(O));
  }
});


/***/ }),
/* 297 */
/*!*********************************************************!*\
  !*** ./node_modules/core-js/modules/es7.map.to-json.js ***!
  \*********************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// https://github.com/DavidBruant/Map-Set.prototype.toJSON
var $export = __webpack_require__(/*! ./_export */ 0);

$export($export.P + $export.R, 'Map', { toJSON: __webpack_require__(/*! ./_collection-to-json */ 128)('Map') });


/***/ }),
/* 298 */
/*!*********************************************************!*\
  !*** ./node_modules/core-js/modules/es7.set.to-json.js ***!
  \*********************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// https://github.com/DavidBruant/Map-Set.prototype.toJSON
var $export = __webpack_require__(/*! ./_export */ 0);

$export($export.P + $export.R, 'Set', { toJSON: __webpack_require__(/*! ./_collection-to-json */ 128)('Set') });


/***/ }),
/* 299 */
/*!****************************************************!*\
  !*** ./node_modules/core-js/modules/es7.map.of.js ***!
  \****************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// https://tc39.github.io/proposal-setmap-offrom/#sec-map.of
__webpack_require__(/*! ./_set-collection-of */ 63)('Map');


/***/ }),
/* 300 */
/*!****************************************************!*\
  !*** ./node_modules/core-js/modules/es7.set.of.js ***!
  \****************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// https://tc39.github.io/proposal-setmap-offrom/#sec-set.of
__webpack_require__(/*! ./_set-collection-of */ 63)('Set');


/***/ }),
/* 301 */
/*!*********************************************************!*\
  !*** ./node_modules/core-js/modules/es7.weak-map.of.js ***!
  \*********************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// https://tc39.github.io/proposal-setmap-offrom/#sec-weakmap.of
__webpack_require__(/*! ./_set-collection-of */ 63)('WeakMap');


/***/ }),
/* 302 */
/*!*********************************************************!*\
  !*** ./node_modules/core-js/modules/es7.weak-set.of.js ***!
  \*********************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// https://tc39.github.io/proposal-setmap-offrom/#sec-weakset.of
__webpack_require__(/*! ./_set-collection-of */ 63)('WeakSet');


/***/ }),
/* 303 */
/*!******************************************************!*\
  !*** ./node_modules/core-js/modules/es7.map.from.js ***!
  \******************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// https://tc39.github.io/proposal-setmap-offrom/#sec-map.from
__webpack_require__(/*! ./_set-collection-from */ 64)('Map');


/***/ }),
/* 304 */
/*!******************************************************!*\
  !*** ./node_modules/core-js/modules/es7.set.from.js ***!
  \******************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// https://tc39.github.io/proposal-setmap-offrom/#sec-set.from
__webpack_require__(/*! ./_set-collection-from */ 64)('Set');


/***/ }),
/* 305 */
/*!***********************************************************!*\
  !*** ./node_modules/core-js/modules/es7.weak-map.from.js ***!
  \***********************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// https://tc39.github.io/proposal-setmap-offrom/#sec-weakmap.from
__webpack_require__(/*! ./_set-collection-from */ 64)('WeakMap');


/***/ }),
/* 306 */
/*!***********************************************************!*\
  !*** ./node_modules/core-js/modules/es7.weak-set.from.js ***!
  \***********************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// https://tc39.github.io/proposal-setmap-offrom/#sec-weakset.from
__webpack_require__(/*! ./_set-collection-from */ 64)('WeakSet');


/***/ }),
/* 307 */
/*!****************************************************!*\
  !*** ./node_modules/core-js/modules/es7.global.js ***!
  \****************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// https://github.com/tc39/proposal-global
var $export = __webpack_require__(/*! ./_export */ 0);

$export($export.G, { global: __webpack_require__(/*! ./_global */ 2) });


/***/ }),
/* 308 */
/*!***********************************************************!*\
  !*** ./node_modules/core-js/modules/es7.system.global.js ***!
  \***********************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// https://github.com/tc39/proposal-global
var $export = __webpack_require__(/*! ./_export */ 0);

$export($export.S, 'System', { global: __webpack_require__(/*! ./_global */ 2) });


/***/ }),
/* 309 */
/*!************************************************************!*\
  !*** ./node_modules/core-js/modules/es7.error.is-error.js ***!
  \************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// https://github.com/ljharb/proposal-is-error
var $export = __webpack_require__(/*! ./_export */ 0);
var cof = __webpack_require__(/*! ./_cof */ 19);

$export($export.S, 'Error', {
  isError: function isError(it) {
    return cof(it) === 'Error';
  }
});


/***/ }),
/* 310 */
/*!********************************************************!*\
  !*** ./node_modules/core-js/modules/es7.math.clamp.js ***!
  \********************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// https://rwaldron.github.io/proposal-math-extensions/
var $export = __webpack_require__(/*! ./_export */ 0);

$export($export.S, 'Math', {
  clamp: function clamp(x, lower, upper) {
    return Math.min(upper, Math.max(lower, x));
  }
});


/***/ }),
/* 311 */
/*!**************************************************************!*\
  !*** ./node_modules/core-js/modules/es7.math.deg-per-rad.js ***!
  \**************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// https://rwaldron.github.io/proposal-math-extensions/
var $export = __webpack_require__(/*! ./_export */ 0);

$export($export.S, 'Math', { DEG_PER_RAD: Math.PI / 180 });


/***/ }),
/* 312 */
/*!**********************************************************!*\
  !*** ./node_modules/core-js/modules/es7.math.degrees.js ***!
  \**********************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// https://rwaldron.github.io/proposal-math-extensions/
var $export = __webpack_require__(/*! ./_export */ 0);
var RAD_PER_DEG = 180 / Math.PI;

$export($export.S, 'Math', {
  degrees: function degrees(radians) {
    return radians * RAD_PER_DEG;
  }
});


/***/ }),
/* 313 */
/*!*********************************************************!*\
  !*** ./node_modules/core-js/modules/es7.math.fscale.js ***!
  \*********************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// https://rwaldron.github.io/proposal-math-extensions/
var $export = __webpack_require__(/*! ./_export */ 0);
var scale = __webpack_require__(/*! ./_math-scale */ 130);
var fround = __webpack_require__(/*! ./_math-fround */ 110);

$export($export.S, 'Math', {
  fscale: function fscale(x, inLow, inHigh, outLow, outHigh) {
    return fround(scale(x, inLow, inHigh, outLow, outHigh));
  }
});


/***/ }),
/* 314 */
/*!********************************************************!*\
  !*** ./node_modules/core-js/modules/es7.math.iaddh.js ***!
  \********************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// https://gist.github.com/BrendanEich/4294d5c212a6d2254703
var $export = __webpack_require__(/*! ./_export */ 0);

$export($export.S, 'Math', {
  iaddh: function iaddh(x0, x1, y0, y1) {
    var $x0 = x0 >>> 0;
    var $x1 = x1 >>> 0;
    var $y0 = y0 >>> 0;
    return $x1 + (y1 >>> 0) + (($x0 & $y0 | ($x0 | $y0) & ~($x0 + $y0 >>> 0)) >>> 31) | 0;
  }
});


/***/ }),
/* 315 */
/*!********************************************************!*\
  !*** ./node_modules/core-js/modules/es7.math.isubh.js ***!
  \********************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// https://gist.github.com/BrendanEich/4294d5c212a6d2254703
var $export = __webpack_require__(/*! ./_export */ 0);

$export($export.S, 'Math', {
  isubh: function isubh(x0, x1, y0, y1) {
    var $x0 = x0 >>> 0;
    var $x1 = x1 >>> 0;
    var $y0 = y0 >>> 0;
    return $x1 - (y1 >>> 0) - ((~$x0 & $y0 | ~($x0 ^ $y0) & $x0 - $y0 >>> 0) >>> 31) | 0;
  }
});


/***/ }),
/* 316 */
/*!********************************************************!*\
  !*** ./node_modules/core-js/modules/es7.math.imulh.js ***!
  \********************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// https://gist.github.com/BrendanEich/4294d5c212a6d2254703
var $export = __webpack_require__(/*! ./_export */ 0);

$export($export.S, 'Math', {
  imulh: function imulh(u, v) {
    var UINT16 = 0xffff;
    var $u = +u;
    var $v = +v;
    var u0 = $u & UINT16;
    var v0 = $v & UINT16;
    var u1 = $u >> 16;
    var v1 = $v >> 16;
    var t = (u1 * v0 >>> 0) + (u0 * v0 >>> 16);
    return u1 * v1 + (t >> 16) + ((u0 * v1 >>> 0) + (t & UINT16) >> 16);
  }
});


/***/ }),
/* 317 */
/*!**************************************************************!*\
  !*** ./node_modules/core-js/modules/es7.math.rad-per-deg.js ***!
  \**************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// https://rwaldron.github.io/proposal-math-extensions/
var $export = __webpack_require__(/*! ./_export */ 0);

$export($export.S, 'Math', { RAD_PER_DEG: 180 / Math.PI });


/***/ }),
/* 318 */
/*!**********************************************************!*\
  !*** ./node_modules/core-js/modules/es7.math.radians.js ***!
  \**********************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// https://rwaldron.github.io/proposal-math-extensions/
var $export = __webpack_require__(/*! ./_export */ 0);
var DEG_PER_RAD = Math.PI / 180;

$export($export.S, 'Math', {
  radians: function radians(degrees) {
    return degrees * DEG_PER_RAD;
  }
});


/***/ }),
/* 319 */
/*!********************************************************!*\
  !*** ./node_modules/core-js/modules/es7.math.scale.js ***!
  \********************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// https://rwaldron.github.io/proposal-math-extensions/
var $export = __webpack_require__(/*! ./_export */ 0);

$export($export.S, 'Math', { scale: __webpack_require__(/*! ./_math-scale */ 130) });


/***/ }),
/* 320 */
/*!********************************************************!*\
  !*** ./node_modules/core-js/modules/es7.math.umulh.js ***!
  \********************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// https://gist.github.com/BrendanEich/4294d5c212a6d2254703
var $export = __webpack_require__(/*! ./_export */ 0);

$export($export.S, 'Math', {
  umulh: function umulh(u, v) {
    var UINT16 = 0xffff;
    var $u = +u;
    var $v = +v;
    var u0 = $u & UINT16;
    var v0 = $v & UINT16;
    var u1 = $u >>> 16;
    var v1 = $v >>> 16;
    var t = (u1 * v0 >>> 0) + (u0 * v0 >>> 16);
    return u1 * v1 + (t >>> 16) + ((u0 * v1 >>> 0) + (t & UINT16) >>> 16);
  }
});


/***/ }),
/* 321 */
/*!**********************************************************!*\
  !*** ./node_modules/core-js/modules/es7.math.signbit.js ***!
  \**********************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// http://jfbastien.github.io/papers/Math.signbit.html
var $export = __webpack_require__(/*! ./_export */ 0);

$export($export.S, 'Math', { signbit: function signbit(x) {
  // eslint-disable-next-line no-self-compare
  return (x = +x) != x ? x : x == 0 ? 1 / x == Infinity : x > 0;
} });


/***/ }),
/* 322 */
/*!*************************************************************!*\
  !*** ./node_modules/core-js/modules/es7.promise.finally.js ***!
  \*************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// https://github.com/tc39/proposal-promise-finally

var $export = __webpack_require__(/*! ./_export */ 0);
var core = __webpack_require__(/*! ./_core */ 21);
var global = __webpack_require__(/*! ./_global */ 2);
var speciesConstructor = __webpack_require__(/*! ./_species-constructor */ 59);
var promiseResolve = __webpack_require__(/*! ./_promise-resolve */ 117);

$export($export.P + $export.R, 'Promise', { 'finally': function (onFinally) {
  var C = speciesConstructor(this, core.Promise || global.Promise);
  var isFunction = typeof onFinally == 'function';
  return this.then(
    isFunction ? function (x) {
      return promiseResolve(C, onFinally()).then(function () { return x; });
    } : onFinally,
    isFunction ? function (e) {
      return promiseResolve(C, onFinally()).then(function () { throw e; });
    } : onFinally
  );
} });


/***/ }),
/* 323 */
/*!*********************************************************!*\
  !*** ./node_modules/core-js/modules/es7.promise.try.js ***!
  \*********************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// https://github.com/tc39/proposal-promise-try
var $export = __webpack_require__(/*! ./_export */ 0);
var newPromiseCapability = __webpack_require__(/*! ./_new-promise-capability */ 91);
var perform = __webpack_require__(/*! ./_perform */ 116);

$export($export.S, 'Promise', { 'try': function (callbackfn) {
  var promiseCapability = newPromiseCapability.f(this);
  var result = perform(callbackfn);
  (result.e ? promiseCapability.reject : promiseCapability.resolve)(result.v);
  return promiseCapability.promise;
} });


/***/ }),
/* 324 */
/*!*********************************************************************!*\
  !*** ./node_modules/core-js/modules/es7.reflect.define-metadata.js ***!
  \*********************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

var metadata = __webpack_require__(/*! ./_metadata */ 28);
var anObject = __webpack_require__(/*! ./_an-object */ 1);
var toMetaKey = metadata.key;
var ordinaryDefineOwnMetadata = metadata.set;

metadata.exp({ defineMetadata: function defineMetadata(metadataKey, metadataValue, target, targetKey) {
  ordinaryDefineOwnMetadata(metadataKey, metadataValue, anObject(target), toMetaKey(targetKey));
} });


/***/ }),
/* 325 */
/*!*********************************************************************!*\
  !*** ./node_modules/core-js/modules/es7.reflect.delete-metadata.js ***!
  \*********************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

var metadata = __webpack_require__(/*! ./_metadata */ 28);
var anObject = __webpack_require__(/*! ./_an-object */ 1);
var toMetaKey = metadata.key;
var getOrCreateMetadataMap = metadata.map;
var store = metadata.store;

metadata.exp({ deleteMetadata: function deleteMetadata(metadataKey, target /* , targetKey */) {
  var targetKey = arguments.length < 3 ? undefined : toMetaKey(arguments[2]);
  var metadataMap = getOrCreateMetadataMap(anObject(target), targetKey, false);
  if (metadataMap === undefined || !metadataMap['delete'](metadataKey)) return false;
  if (metadataMap.size) return true;
  var targetMetadata = store.get(target);
  targetMetadata['delete'](targetKey);
  return !!targetMetadata.size || store['delete'](target);
} });


/***/ }),
/* 326 */
/*!******************************************************************!*\
  !*** ./node_modules/core-js/modules/es7.reflect.get-metadata.js ***!
  \******************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

var metadata = __webpack_require__(/*! ./_metadata */ 28);
var anObject = __webpack_require__(/*! ./_an-object */ 1);
var getPrototypeOf = __webpack_require__(/*! ./_object-gpo */ 17);
var ordinaryHasOwnMetadata = metadata.has;
var ordinaryGetOwnMetadata = metadata.get;
var toMetaKey = metadata.key;

var ordinaryGetMetadata = function (MetadataKey, O, P) {
  var hasOwn = ordinaryHasOwnMetadata(MetadataKey, O, P);
  if (hasOwn) return ordinaryGetOwnMetadata(MetadataKey, O, P);
  var parent = getPrototypeOf(O);
  return parent !== null ? ordinaryGetMetadata(MetadataKey, parent, P) : undefined;
};

metadata.exp({ getMetadata: function getMetadata(metadataKey, target /* , targetKey */) {
  return ordinaryGetMetadata(metadataKey, anObject(target), arguments.length < 3 ? undefined : toMetaKey(arguments[2]));
} });


/***/ }),
/* 327 */
/*!***********************************************************************!*\
  !*** ./node_modules/core-js/modules/es7.reflect.get-metadata-keys.js ***!
  \***********************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

var Set = __webpack_require__(/*! ./es6.set */ 120);
var from = __webpack_require__(/*! ./_array-from-iterable */ 129);
var metadata = __webpack_require__(/*! ./_metadata */ 28);
var anObject = __webpack_require__(/*! ./_an-object */ 1);
var getPrototypeOf = __webpack_require__(/*! ./_object-gpo */ 17);
var ordinaryOwnMetadataKeys = metadata.keys;
var toMetaKey = metadata.key;

var ordinaryMetadataKeys = function (O, P) {
  var oKeys = ordinaryOwnMetadataKeys(O, P);
  var parent = getPrototypeOf(O);
  if (parent === null) return oKeys;
  var pKeys = ordinaryMetadataKeys(parent, P);
  return pKeys.length ? oKeys.length ? from(new Set(oKeys.concat(pKeys))) : pKeys : oKeys;
};

metadata.exp({ getMetadataKeys: function getMetadataKeys(target /* , targetKey */) {
  return ordinaryMetadataKeys(anObject(target), arguments.length < 2 ? undefined : toMetaKey(arguments[1]));
} });


/***/ }),
/* 328 */
/*!**********************************************************************!*\
  !*** ./node_modules/core-js/modules/es7.reflect.get-own-metadata.js ***!
  \**********************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

var metadata = __webpack_require__(/*! ./_metadata */ 28);
var anObject = __webpack_require__(/*! ./_an-object */ 1);
var ordinaryGetOwnMetadata = metadata.get;
var toMetaKey = metadata.key;

metadata.exp({ getOwnMetadata: function getOwnMetadata(metadataKey, target /* , targetKey */) {
  return ordinaryGetOwnMetadata(metadataKey, anObject(target)
    , arguments.length < 3 ? undefined : toMetaKey(arguments[2]));
} });


/***/ }),
/* 329 */
/*!***************************************************************************!*\
  !*** ./node_modules/core-js/modules/es7.reflect.get-own-metadata-keys.js ***!
  \***************************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

var metadata = __webpack_require__(/*! ./_metadata */ 28);
var anObject = __webpack_require__(/*! ./_an-object */ 1);
var ordinaryOwnMetadataKeys = metadata.keys;
var toMetaKey = metadata.key;

metadata.exp({ getOwnMetadataKeys: function getOwnMetadataKeys(target /* , targetKey */) {
  return ordinaryOwnMetadataKeys(anObject(target), arguments.length < 2 ? undefined : toMetaKey(arguments[1]));
} });


/***/ }),
/* 330 */
/*!******************************************************************!*\
  !*** ./node_modules/core-js/modules/es7.reflect.has-metadata.js ***!
  \******************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

var metadata = __webpack_require__(/*! ./_metadata */ 28);
var anObject = __webpack_require__(/*! ./_an-object */ 1);
var getPrototypeOf = __webpack_require__(/*! ./_object-gpo */ 17);
var ordinaryHasOwnMetadata = metadata.has;
var toMetaKey = metadata.key;

var ordinaryHasMetadata = function (MetadataKey, O, P) {
  var hasOwn = ordinaryHasOwnMetadata(MetadataKey, O, P);
  if (hasOwn) return true;
  var parent = getPrototypeOf(O);
  return parent !== null ? ordinaryHasMetadata(MetadataKey, parent, P) : false;
};

metadata.exp({ hasMetadata: function hasMetadata(metadataKey, target /* , targetKey */) {
  return ordinaryHasMetadata(metadataKey, anObject(target), arguments.length < 3 ? undefined : toMetaKey(arguments[2]));
} });


/***/ }),
/* 331 */
/*!**********************************************************************!*\
  !*** ./node_modules/core-js/modules/es7.reflect.has-own-metadata.js ***!
  \**********************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

var metadata = __webpack_require__(/*! ./_metadata */ 28);
var anObject = __webpack_require__(/*! ./_an-object */ 1);
var ordinaryHasOwnMetadata = metadata.has;
var toMetaKey = metadata.key;

metadata.exp({ hasOwnMetadata: function hasOwnMetadata(metadataKey, target /* , targetKey */) {
  return ordinaryHasOwnMetadata(metadataKey, anObject(target)
    , arguments.length < 3 ? undefined : toMetaKey(arguments[2]));
} });


/***/ }),
/* 332 */
/*!**************************************************************!*\
  !*** ./node_modules/core-js/modules/es7.reflect.metadata.js ***!
  \**************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

var $metadata = __webpack_require__(/*! ./_metadata */ 28);
var anObject = __webpack_require__(/*! ./_an-object */ 1);
var aFunction = __webpack_require__(/*! ./_a-function */ 10);
var toMetaKey = $metadata.key;
var ordinaryDefineOwnMetadata = $metadata.set;

$metadata.exp({ metadata: function metadata(metadataKey, metadataValue) {
  return function decorator(target, targetKey) {
    ordinaryDefineOwnMetadata(
      metadataKey, metadataValue,
      (targetKey !== undefined ? anObject : aFunction)(target),
      toMetaKey(targetKey)
    );
  };
} });


/***/ }),
/* 333 */
/*!**************************************************!*\
  !*** ./node_modules/core-js/modules/es7.asap.js ***!
  \**************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// https://github.com/rwaldron/tc39-notes/blob/master/es6/2014-09/sept-25.md#510-globalasap-for-enqueuing-a-microtask
var $export = __webpack_require__(/*! ./_export */ 0);
var microtask = __webpack_require__(/*! ./_microtask */ 90)();
var process = __webpack_require__(/*! ./_global */ 2).process;
var isNode = __webpack_require__(/*! ./_cof */ 19)(process) == 'process';

$export($export.G, {
  asap: function asap(fn) {
    var domain = isNode && process.domain;
    microtask(domain ? domain.bind(fn) : fn);
  }
});


/***/ }),
/* 334 */
/*!********************************************************!*\
  !*** ./node_modules/core-js/modules/es7.observable.js ***!
  \********************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// https://github.com/zenparsing/es-observable
var $export = __webpack_require__(/*! ./_export */ 0);
var global = __webpack_require__(/*! ./_global */ 2);
var core = __webpack_require__(/*! ./_core */ 21);
var microtask = __webpack_require__(/*! ./_microtask */ 90)();
var OBSERVABLE = __webpack_require__(/*! ./_wks */ 5)('observable');
var aFunction = __webpack_require__(/*! ./_a-function */ 10);
var anObject = __webpack_require__(/*! ./_an-object */ 1);
var anInstance = __webpack_require__(/*! ./_an-instance */ 40);
var redefineAll = __webpack_require__(/*! ./_redefine-all */ 42);
var hide = __webpack_require__(/*! ./_hide */ 12);
var forOf = __webpack_require__(/*! ./_for-of */ 41);
var RETURN = forOf.RETURN;

var getMethod = function (fn) {
  return fn == null ? undefined : aFunction(fn);
};

var cleanupSubscription = function (subscription) {
  var cleanup = subscription._c;
  if (cleanup) {
    subscription._c = undefined;
    cleanup();
  }
};

var subscriptionClosed = function (subscription) {
  return subscription._o === undefined;
};

var closeSubscription = function (subscription) {
  if (!subscriptionClosed(subscription)) {
    subscription._o = undefined;
    cleanupSubscription(subscription);
  }
};

var Subscription = function (observer, subscriber) {
  anObject(observer);
  this._c = undefined;
  this._o = observer;
  observer = new SubscriptionObserver(this);
  try {
    var cleanup = subscriber(observer);
    var subscription = cleanup;
    if (cleanup != null) {
      if (typeof cleanup.unsubscribe === 'function') cleanup = function () { subscription.unsubscribe(); };
      else aFunction(cleanup);
      this._c = cleanup;
    }
  } catch (e) {
    observer.error(e);
    return;
  } if (subscriptionClosed(this)) cleanupSubscription(this);
};

Subscription.prototype = redefineAll({}, {
  unsubscribe: function unsubscribe() { closeSubscription(this); }
});

var SubscriptionObserver = function (subscription) {
  this._s = subscription;
};

SubscriptionObserver.prototype = redefineAll({}, {
  next: function next(value) {
    var subscription = this._s;
    if (!subscriptionClosed(subscription)) {
      var observer = subscription._o;
      try {
        var m = getMethod(observer.next);
        if (m) return m.call(observer, value);
      } catch (e) {
        try {
          closeSubscription(subscription);
        } finally {
          throw e;
        }
      }
    }
  },
  error: function error(value) {
    var subscription = this._s;
    if (subscriptionClosed(subscription)) throw value;
    var observer = subscription._o;
    subscription._o = undefined;
    try {
      var m = getMethod(observer.error);
      if (!m) throw value;
      value = m.call(observer, value);
    } catch (e) {
      try {
        cleanupSubscription(subscription);
      } finally {
        throw e;
      }
    } cleanupSubscription(subscription);
    return value;
  },
  complete: function complete(value) {
    var subscription = this._s;
    if (!subscriptionClosed(subscription)) {
      var observer = subscription._o;
      subscription._o = undefined;
      try {
        var m = getMethod(observer.complete);
        value = m ? m.call(observer, value) : undefined;
      } catch (e) {
        try {
          cleanupSubscription(subscription);
        } finally {
          throw e;
        }
      } cleanupSubscription(subscription);
      return value;
    }
  }
});

var $Observable = function Observable(subscriber) {
  anInstance(this, $Observable, 'Observable', '_f')._f = aFunction(subscriber);
};

redefineAll($Observable.prototype, {
  subscribe: function subscribe(observer) {
    return new Subscription(observer, this._f);
  },
  forEach: function forEach(fn) {
    var that = this;
    return new (core.Promise || global.Promise)(function (resolve, reject) {
      aFunction(fn);
      var subscription = that.subscribe({
        next: function (value) {
          try {
            return fn(value);
          } catch (e) {
            reject(e);
            subscription.unsubscribe();
          }
        },
        error: reject,
        complete: resolve
      });
    });
  }
});

redefineAll($Observable, {
  from: function from(x) {
    var C = typeof this === 'function' ? this : $Observable;
    var method = getMethod(anObject(x)[OBSERVABLE]);
    if (method) {
      var observable = anObject(method.call(x));
      return observable.constructor === C ? observable : new C(function (observer) {
        return observable.subscribe(observer);
      });
    }
    return new C(function (observer) {
      var done = false;
      microtask(function () {
        if (!done) {
          try {
            if (forOf(x, false, function (it) {
              observer.next(it);
              if (done) return RETURN;
            }) === RETURN) return;
          } catch (e) {
            if (done) throw e;
            observer.error(e);
            return;
          } observer.complete();
        }
      });
      return function () { done = true; };
    });
  },
  of: function of() {
    for (var i = 0, l = arguments.length, items = new Array(l); i < l;) items[i] = arguments[i++];
    return new (typeof this === 'function' ? this : $Observable)(function (observer) {
      var done = false;
      microtask(function () {
        if (!done) {
          for (var j = 0; j < items.length; ++j) {
            observer.next(items[j]);
            if (done) return;
          } observer.complete();
        }
      });
      return function () { done = true; };
    });
  }
});

hide($Observable.prototype, OBSERVABLE, function () { return this; });

$export($export.G, { Observable: $Observable });

__webpack_require__(/*! ./_set-species */ 39)('Observable');


/***/ }),
/* 335 */
/*!****************************************************!*\
  !*** ./node_modules/core-js/modules/web.timers.js ***!
  \****************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// ie9- setTimeout & setInterval additional parameters fix
var global = __webpack_require__(/*! ./_global */ 2);
var $export = __webpack_require__(/*! ./_export */ 0);
var userAgent = __webpack_require__(/*! ./_user-agent */ 93);
var slice = [].slice;
var MSIE = /MSIE .\./.test(userAgent); // <- dirty ie9- check
var wrap = function (set) {
  return function (fn, time /* , ...args */) {
    var boundArgs = arguments.length > 2;
    var args = boundArgs ? slice.call(arguments, 2) : false;
    return set(boundArgs ? function () {
      // eslint-disable-next-line no-new-func
      (typeof fn == 'function' ? fn : Function(fn)).apply(this, args);
    } : fn, time);
  };
};
$export($export.G + $export.B + $export.F * MSIE, {
  setTimeout: wrap(global.setTimeout),
  setInterval: wrap(global.setInterval)
});


/***/ }),
/* 336 */
/*!*******************************************************!*\
  !*** ./node_modules/core-js/modules/web.immediate.js ***!
  \*******************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__(/*! ./_export */ 0);
var $task = __webpack_require__(/*! ./_task */ 89);
$export($export.G + $export.B, {
  setImmediate: $task.set,
  clearImmediate: $task.clear
});


/***/ }),
/* 337 */
/*!**********************************************************!*\
  !*** ./node_modules/core-js/modules/web.dom.iterable.js ***!
  \**********************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

var $iterators = __webpack_require__(/*! ./es6.array.iterator */ 88);
var getKeys = __webpack_require__(/*! ./_object-keys */ 35);
var redefine = __webpack_require__(/*! ./_redefine */ 13);
var global = __webpack_require__(/*! ./_global */ 2);
var hide = __webpack_require__(/*! ./_hide */ 12);
var Iterators = __webpack_require__(/*! ./_iterators */ 45);
var wks = __webpack_require__(/*! ./_wks */ 5);
var ITERATOR = wks('iterator');
var TO_STRING_TAG = wks('toStringTag');
var ArrayValues = Iterators.Array;

var DOMIterables = {
  CSSRuleList: true, // TODO: Not spec compliant, should be false.
  CSSStyleDeclaration: false,
  CSSValueList: false,
  ClientRectList: false,
  DOMRectList: false,
  DOMStringList: false,
  DOMTokenList: true,
  DataTransferItemList: false,
  FileList: false,
  HTMLAllCollection: false,
  HTMLCollection: false,
  HTMLFormElement: false,
  HTMLSelectElement: false,
  MediaList: true, // TODO: Not spec compliant, should be false.
  MimeTypeArray: false,
  NamedNodeMap: false,
  NodeList: true,
  PaintRequestList: false,
  Plugin: false,
  PluginArray: false,
  SVGLengthList: false,
  SVGNumberList: false,
  SVGPathSegList: false,
  SVGPointList: false,
  SVGStringList: false,
  SVGTransformList: false,
  SourceBufferList: false,
  StyleSheetList: true, // TODO: Not spec compliant, should be false.
  TextTrackCueList: false,
  TextTrackList: false,
  TouchList: false
};

for (var collections = getKeys(DOMIterables), i = 0; i < collections.length; i++) {
  var NAME = collections[i];
  var explicit = DOMIterables[NAME];
  var Collection = global[NAME];
  var proto = Collection && Collection.prototype;
  var key;
  if (proto) {
    if (!proto[ITERATOR]) hide(proto, ITERATOR, ArrayValues);
    if (!proto[TO_STRING_TAG]) hide(proto, TO_STRING_TAG, NAME);
    Iterators[NAME] = ArrayValues;
    if (explicit) for (key in $iterators) if (!proto[key]) redefine(proto, key, $iterators[key], true);
  }
}


/***/ }),
/* 338 */
/*!*****************************************************!*\
  !*** ./node_modules/regenerator-runtime/runtime.js ***!
  \*****************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global) {/**
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

    if (typeof global.process === "object" && global.process.domain) {
      invoke = global.process.domain.bind(invoke);
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
  // Among the various tricks for obtaining a reference to the global
  // object, this seems to be the most reliable technique that does not
  // use indirect eval (which violates Content Security Policy).
  typeof global === "object" ? global :
  typeof window === "object" ? window :
  typeof self === "object" ? self : this
);

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(/*! ./../webpack/buildin/global.js */ 47)))

/***/ }),
/* 339 */
/*!**************************************************!*\
  !*** ./node_modules/core-js/fn/regexp/escape.js ***!
  \**************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! ../../modules/core.regexp.escape */ 340);
module.exports = __webpack_require__(/*! ../../modules/_core */ 21).RegExp.escape;


/***/ }),
/* 340 */
/*!************************************************************!*\
  !*** ./node_modules/core-js/modules/core.regexp.escape.js ***!
  \************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// https://github.com/benjamingr/RexExp.escape
var $export = __webpack_require__(/*! ./_export */ 0);
var $re = __webpack_require__(/*! ./_replacer */ 341)(/[\\^$*+?.()|[\]{}]/g, '\\$&');

$export($export.S, 'RegExp', { escape: function escape(it) { return $re(it); } });


/***/ }),
/* 341 */
/*!***************************************************!*\
  !*** ./node_modules/core-js/modules/_replacer.js ***!
  \***************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports) {

module.exports = function (regExp, replace) {
  var replacer = replace === Object(replace) ? function (part) {
    return replace[part];
  } : replace;
  return function (it) {
    return String(it).replace(regExp, replacer);
  };
};


/***/ }),
/* 342 */
/*!*********************!*\
  !*** ./src/main.js ***!
  \*********************/
/*! no exports provided */
/*! all exports used */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_pixi__ = __webpack_require__(/*! pixi */ 131);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_pixi___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_pixi__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_p2__ = __webpack_require__(/*! p2 */ 132);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_p2___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_p2__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_phaser__ = __webpack_require__(/*! phaser */ 29);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_phaser___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_phaser__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__states_Boot__ = __webpack_require__(/*! ./states/Boot */ 133);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__states_Preloader__ = __webpack_require__(/*! ./states/Preloader */ 348);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__states_Intro__ = __webpack_require__(/*! ./states/Intro */ 349);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__states_Menu__ = __webpack_require__(/*! ./states/Menu */ 350);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__states_Game__ = __webpack_require__(/*! ./states/Game */ 351);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__config__ = __webpack_require__(/*! ./config */ 94);












class Main extends __WEBPACK_IMPORTED_MODULE_2_phaser___default.a.Game {
  constructor() {
    const docElement = document.documentElement;
    var width = docElement.clientWidth > __WEBPACK_IMPORTED_MODULE_8__config__["a" /* default */].gameWidth ? __WEBPACK_IMPORTED_MODULE_8__config__["a" /* default */].gameWidth : 800;
    var height = docElement.clientHeight > __WEBPACK_IMPORTED_MODULE_8__config__["a" /* default */].gameHeight ? __WEBPACK_IMPORTED_MODULE_8__config__["a" /* default */].gameHeight : docElement.clientHeight;

    if (docElement.clientWidth > 800) width = docElement.clientWidth;

    super(width, height, __WEBPACK_IMPORTED_MODULE_2_phaser___default.a.CANVAS, 'content', null);

    this.state.add('Boot', __WEBPACK_IMPORTED_MODULE_3__states_Boot__["a" /* default */]);
    this.state.add('Preloader', __WEBPACK_IMPORTED_MODULE_4__states_Preloader__["a" /* default */]);
    this.state.add('Intro', __WEBPACK_IMPORTED_MODULE_5__states_Intro__["a" /* default */]);
    this.state.add('Menu', __WEBPACK_IMPORTED_MODULE_6__states_Menu__["a" /* default */]);
    this.state.add('Game', __WEBPACK_IMPORTED_MODULE_7__states_Game__["a" /* default */]);

    // with Cordova with need to wait that the device is ready so we will call the Boot state in another file
    if (!window.cordova) {
      this.state.start('Boot');
    }
  }
}

window.game = new Main();

if (window.cordova) {
  var app = {
    initialize: function () {
      document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
    },

    // deviceready Event Handler
    //
    onDeviceReady: function () {
      this.receivedEvent('deviceready');

      // When the device is ready, start Phaser Boot state.
      window.game.state.start('Boot');
    },

    receivedEvent: function (id) {
      console.log('Received Event: ' + id);
    }
  };

  app.initialize();
}

/***/ }),
/* 343 */,
/* 344 */,
/* 345 */,
/* 346 */,
/* 347 */
/*!****************************************************!*\
  !*** ./src/libs/phaser-state-transition-plugin.js ***!
  \****************************************************/
/*! dynamic exports provided */
/***/ (function(module, exports) {

/**
  * StateTransition Plugin for Phaser
  */
(function (window, Phaser) {
  'use strict';

  Phaser.Plugin.StateTransition = function (game, parent) {
    Phaser.Plugin.call(this, game, parent);

    // Default transition settings
    this.settings = {
      duration: Phaser.Timer.SECOND * 0.3,
      ease: Phaser.Easing.Exponential.InOut,
      properties: {
        alpha: 0
      }
    };
    // Original implementations of state methods
    this._originalStateMethods = {};
  };

  Phaser.Plugin.StateTransition.prototype = Object.create(Phaser.Plugin.prototype);

  Phaser.Plugin.StateTransition.prototype.constructor = Phaser.Plugin.StateTransition;

  Phaser.Plugin.StateTransition.prototype.configure = function (options) {
    var property;

    if (options) {
      for (property in options) {
        if (this.settings[property]) {
          this.settings[property] = options[property];
        }
      }
    } else {
      return Object.create(this.settings);
    }
  };

  /**
    * Handles the state changes and transitions
    */
  Phaser.Plugin.StateTransition.prototype.to = function () {
    var stateName = arguments[0],
        _this = this,
        _init,
        _create;

    if (!stateName) {
      throw 'No state passed.';
    }

    // In case last transition went wrong
    this._destroy();

    // Pause game to take world snapshot
    this.game.paused = true;

    // Create current state texture
    this._texture = new Phaser.RenderTexture(this.game, this.game.width, this.game.height, 'cover');

    // Draw the current world to the render
    this._texture.renderXY(this.game.world, -this.game.camera.x, -this.game.camera.y);

    // Save original implementation of state's init and create methods
    this._originalStateMethods[stateName] = this._originalStateMethods[stateName] || {
      init: this.game.state.states[stateName].init,
      create: this.game.state.states[stateName].create
    };
    _init = this._originalStateMethods[stateName].init;
    _create = this._originalStateMethods[stateName].create;

    // Extend state init method to add cover
    this.game.state.states[stateName].init = function () {
      this.game.add.existing(_this._newCover());
      if (_init) {
        _init.apply(this, arguments);
      }
    };

    // Extend state create method to animate cover
    this.game.state.states[stateName].create = function () {
      if (_create) {
        _create.apply(this, arguments);
      }
      _this.bringToTop();
      _this._animateCover();
    };

    // Resume the game and start next state
    this.game.paused = false;
    this.game.state.start.apply(this.game.state, arguments);
  };

  /**
    * Create previous state cover
    */
  Phaser.Plugin.StateTransition.prototype._newCover = function () {
    // Create current state cover sprite
    this._cover = new Phaser.Sprite(this.game, this.game.world.centerX, this.game.world.centerY, this._texture);
    this._cover.anchor.setTo(0.5);
    return this._cover;
  };

  /**
    * Can be called in the create function of states that you transition to,
    * to ensure that the transition-sprite is on top of everything
    */
  Phaser.Plugin.StateTransition.prototype.bringToTop = function () {
    if (this._cover) {
      this._cover.bringToTop();
    }
  };

  Phaser.Plugin.StateTransition.prototype._animateCover = function () {
    var propertyValueObject, property, tween;

    for (property in this.settings.properties) {
      if (typeof this.settings.properties[property] === 'object') {
        // Create a tween for specific object property
        tween = this.game.add.tween(this._cover[property]).to(this.settings.properties[property], this.settings.duration, this.settings.ease, true);
      } else {
        // Create properties object for specific property value
        propertyValueObject = {};
        propertyValueObject[property] = this.settings.properties[property];
        tween = this.game.add.tween(this._cover).to(propertyValueObject, this.settings.duration, this.settings.ease, true);
      }
    }
    // Since all tweens have the same duration we listen to the last one created
    tween.onComplete.addOnce(this._destroy, this);
  };

  Phaser.Plugin.StateTransition.prototype._destroy = function () {
    if (this._cover) {
      this._cover.destroy();
    }
    if (this._texture) {
      this._texture.destroy();
    }
  };
})(window, Phaser);

/***/ }),
/* 348 */
/*!*********************************!*\
  !*** ./src/states/Preloader.js ***!
  \*********************************/
/*! exports provided: default */
/*! exports used: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_phaser__ = __webpack_require__(/*! phaser */ 29);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_phaser___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_phaser__);


/* harmony default export */ __webpack_exports__["a"] = (class extends __WEBPACK_IMPORTED_MODULE_0_phaser___default.a.State {
        preload() {
                this.logo = this.add.sprite(this.game.world.centerX, this.game.world.centerY, 'logo');
                this.logo.x -= this.logo.width * 0.5;
                this.logo.y -= this.logo.height;

                this.preloadBarbg = this.add.sprite(this.game.world.centerX, this.game.world.centerY, 'preloaderBar');
                this.preloadBarbg.x -= this.preloadBarbg.width * 0.5;

                this.preloadBar = this.add.sprite(this.game.world.centerX, this.preloadBarbg.y, 'preloaderBar2');
                this.preloadBar.alignIn(this.preloadBarbg, __WEBPACK_IMPORTED_MODULE_0_phaser___default.a.CENTER, 0, 0);
                this.load.setPreloadSprite(this.preloadBarbg);

                this.load.video('intro', ['assets/video/intro.ogv', 'assets/video/intro.webm', 'assets/video/intro.mp4']);
                this.load.audio('boton', ['assets/audio/boton.ogg', 'assets/audio/boton.acc']);
                this.load.audio('you', 'assets/audio/you.ogg');
                this.load.audio('father', 'assets/audio/father.ogg');
                this.load.audio('mother', 'assets/audio/mother.ogg');
                this.load.audio('stepfather', 'assets/audio/stepfather.ogg');
                this.load.audio('stepmother', 'assets/audio/stepmother.ogg');
                this.load.audio('brother', 'assets/audio/brother.ogg');
                this.load.audio('sister', 'assets/audio/sister.ogg');
                this.load.audio('stepbrother', 'assets/audio/stepbrother.ogg');
                this.load.audio('stepsister', 'assets/audio/stepsister.ogg');
                this.load.audio('uncle', 'assets/audio/uncle.ogg');
                this.load.audio('aunt', 'assets/audio/aunt.ogg');
                this.load.audio('grandfather', 'assets/audio/grandfather.ogg');
                this.load.audio('grandmother', 'assets/audio/grandmother.ogg');
                this.load.audio('grandgrandfather', 'assets/audio/grandgrandfather.ogg');
                this.load.audio('grandgrandmother', 'assets/audio/grandgrandmother.ogg');
                this.load.image('fondo', 'assets/bg.png');
                this.load.image('title', 'assets/title.png');
                this.load.image('sidemenu', 'assets/sidemenu.png');
                this.load.image('bottommenu', 'assets/bottommenu.png');
                this.load.image('voice', 'assets/voice.png');
                this.load.image('erase', 'assets/erase.png');
                this.load.image('treebg', 'assets/treebg.png');
                this.load.spritesheet('openMenu', 'assets/openMenu.png', 64, 64);
                this.load.spritesheet('genre', 'assets/genre.png', 32, 32);
                this.load.spritesheet('sidebg', 'assets/sidebg.png', 115, 117);
                this.load.spritesheet('boygirl', 'assets/boygirl.png', 96, 128);
                this.load.spritesheet('sharebtn', 'assets/sharebtn.png', 128, 48);
                this.load.spritesheet('button', 'assets/button.png', 175, 85);
                this.load.spritesheet('characters', 'assets/characters.png', 96, 128);

                /**
                 * For Webcam Plugin
                 * */

                this.game.load.atlasJSONHash('sprites', 'assets/gfx/atlas/sprites.png', 'assets/gfx/atlas/sprites.json');

                this.game.load.audio('shutter', ['assets/sfx/shutter.ogg', 'assets/sfx/shutter.mp3']);
                this.game.load.audio('click', ['assets/sfx/click.ogg', 'assets/sfx/click.mp3']);
                this.game.load.audio('ready', ['assets/sfx/ready.ogg', 'assets/sfx/ready.mp3']);
                this.game.load.audio('beep', ['assets/sfx/beep.ogg', 'assets/sfx/beep.mp3']);

                this.game.stage.smoothed = false;
        }

        create() {
                this.preloadBar.cropEnabled = false;
                this.state.start('Game');
        }
});

/***/ }),
/* 349 */
/*!*****************************!*\
  !*** ./src/states/Intro.js ***!
  \*****************************/
/*! exports provided: default */
/*! exports used: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_phaser__ = __webpack_require__(/*! phaser */ 29);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_phaser___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_phaser__);


/* harmony default export */ __webpack_exports__["a"] = (class extends __WEBPACK_IMPORTED_MODULE_0_phaser___default.a.State {
    preload() {}

    create() {
        this.introVideo = this.game.add.video('intro');
        this.introVideo.play();
        this.introVideo.addToWorld(this.game.world.centerX, this.game.world.centerY, 0.5, 0.5, 0.8, 0.8);

        this.introVideo.onComplete.add(function () {
            this.game.stateTransition.to('Menu');
            this.game.world.removeAll();
        }, this);
    }
});

/***/ }),
/* 350 */
/*!****************************!*\
  !*** ./src/states/Menu.js ***!
  \****************************/
/*! exports provided: default */
/*! exports used: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_phaser__ = __webpack_require__(/*! phaser */ 29);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_phaser___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_phaser__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__language_language__ = __webpack_require__(/*! ../language/language */ 95);



/* harmony default export */ __webpack_exports__["a"] = (class extends __WEBPACK_IMPORTED_MODULE_0_phaser___default.a.State {
      create() {
            this.sfxbtn = this.game.add.audio('boton');

            this.bg = this.game.add.sprite(0, 0, 'fondo');
            this.bg.width = this.game.width;
            this.bg.height = this.game.height;

            this.title = this.game.add.sprite(this.game.world.centerX, this.game.world.centerY, 'title');
            this.title.x -= this.title.width * 0.4;
            this.title.y -= this.title.height * 0.8;

            this.button = this.game.add.button(this.game.width * 0.5, this.game.height * 0.5, 'button', this.stop, this, 1, 0, 0, 0);
            this.button.x -= this.button.width * 0.5;
            this.button.y += this.button.height;

            this.playButton = this.game.add.text(this.button.x, this.button.y, __WEBPACK_IMPORTED_MODULE_1__language_language__["a" /* default */].start, {
                  font: "20px sans-serif", fill: "#ffffff", stroke: "#000000", strokeThickness: "6"
            });

            this.playButton.alignIn(this.button, __WEBPACK_IMPORTED_MODULE_0_phaser___default.a.TOP_CENTER, 0, -25);

            this.enterKey = this.game.input.keyboard.addKey(__WEBPACK_IMPORTED_MODULE_0_phaser___default.a.Keyboard.ENTER);

            this.enterKey.onDown.addOnce(function () {
                  this.enterKey.onDown.removeAll();
                  this.stop();
            }.bind(this), this);
      }

      stop() {
            try {

                  var data = { "envelop": null, "page": "familytree", "time": null, "eventType": "GameStarted", "eventData": navigator.userAgent };

                  $.ajax({
                        type: 'POST',
                        async: true,
                        processData: false,
                        contentType: 'application/json',
                        url: 'https://dtml.org/Activity/Record/',
                        data: JSON.stringify(data)
                  });
            } catch (err) {}

            this.sfxbtn.play();
            this.startGame();
      }

      startGame() {
            this.game.stateTransition.to('Game');
            this.game.world.removeAll();
      }
});

/***/ }),
/* 351 */
/*!****************************!*\
  !*** ./src/states/Game.js ***!
  \****************************/
/*! exports provided: default */
/*! exports used: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_phaser__ = __webpack_require__(/*! phaser */ 29);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_phaser___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_phaser__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_phaser_list_view__ = __webpack_require__(/*! phaser-list-view */ 352);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_phaser_list_view___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_phaser_list_view__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__model_Button__ = __webpack_require__(/*! ../model/Button */ 357);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__Boot__ = __webpack_require__(/*! ./Boot */ 133);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__model_Person__ = __webpack_require__(/*! ../model/Person */ 358);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__language_language__ = __webpack_require__(/*! ../language/language */ 95);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_canvas_image_saver__ = __webpack_require__(/*! canvas-image-saver */ 359);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_canvas_image_saver___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_canvas_image_saver__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__config__ = __webpack_require__(/*! ../config */ 94);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__model_WebcamPlugin__ = __webpack_require__(/*! ../model/WebcamPlugin */ 360);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__model_WebcamPlugin___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_8__model_WebcamPlugin__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__model_WebcamState__ = __webpack_require__(/*! ../model/WebcamState */ 361);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__model_WebcamState___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_9__model_WebcamState__);











/* harmony default export */ __webpack_exports__["a"] = (class extends __WEBPACK_IMPORTED_MODULE_0_phaser___default.a.State {
    init() {
        this.game.hasInitialized = false;
    }

    create() {
        this.game.selectedNode = null;
        this.bottomORside = false;
        this.bg = this.game.add.sprite(0, 0, 'fondo');
        this.bg.width = this.game.width;
        this.bg.height = this.game.height;
        this.UI = [];
        this.leftMenuButtons = [];
        this.leftMenuOpen = false;
        this.rightMenuButtons = [];
        this.rightMenuOpen = false;
        this.movingNode = false;
        this.moveDistance = 5;
        this.treeUI = [];

        this.initialMenu();

        this.game.hasInitialized = true;
    }

    initialMenu() {
        this.youText = this.game.add.text(this.game.world.centerX, this.game.world.centerY * 0.4, __WEBPACK_IMPORTED_MODULE_5__language_language__["a" /* default */].you, {
            font: "26px sans-serif", fill: "#ffffff", stroke: "#000000", strokeThickness: "6"
        });
        this.youText.scale.setTo(game.scaleRatio);
        this.youText.anchor.setTo(0.5);

        this.boyBtn = this.game.add.button(this.game.width * 0.4, this.game.world.centerY * 0.7, 'boygirl', function () {
            this.choosePlayer(0);
        }, this);
        this.boyBtn.anchor.setTo(0.5);
        this.boyBtn.scale.setTo(1.2 * game.scaleRatio);
        this.boyBtn.frame = 0;
        this.boyBtn.events.onInputOver.add(() => {
            if (this.UI[this.iterate].obj != this.boyBtn) this.triggerIterateUI(true);
        }, this);

        this.boyText = this.game.add.text(this.boyBtn.x, this.boyBtn.y + this.boyBtn.height, __WEBPACK_IMPORTED_MODULE_5__language_language__["a" /* default */].boy, {
            font: "26px sans-serif", fill: "#ffffff", stroke: "#000000", strokeThickness: "6"
        });
        this.boyText.scale.setTo(game.scaleRatio);
        this.boyText.anchor.setTo(0.5);

        this.girlBtn = this.game.add.button(this.game.width * 0.6, this.game.world.centerY * 0.7, 'boygirl', function () {
            this.choosePlayer(1);
        }.bind(this), this);
        this.girlBtn.anchor.setTo(0.5);
        this.girlBtn.frame = 1;
        this.girlBtn.scale.setTo(game.scaleRatio);
        this.girlBtn.events.onInputOver.add(() => {
            if (this.UI[this.iterate].obj != this.girlBtn) this.triggerIterateUI(false);
        }, this);

        this.girlText = this.game.add.text(this.girlBtn.x, this.girlBtn.y + 1.2 * this.girlBtn.height, __WEBPACK_IMPORTED_MODULE_5__language_language__["a" /* default */].girl, {
            font: "26px sans-serif", fill: "#ffffff", stroke: "#000000", strokeThickness: "6"
        });
        this.girlText.scale.setTo(game.scaleRatio);
        this.girlText.anchor.setTo(0.5);

        this.family = this.game.add.group();
        this.family.x = this.game.width * 0.5;
        this.family.y = this.game.height * 0.5;
        this.family.pivot.x = this.game.width * 0.5;
        this.family.pivot.y = this.game.height * 0.3;

        this.UI.push({ obj: this.boyBtn, x: game.scaleRatio, y: game.scaleRatio });
        this.UI.push({ obj: this.girlBtn, x: game.scaleRatio, y: game.scaleRatio });
        this.iterate = 0;
        this.leftMenuIteration = 0;
        this.rightMenuIteration = 0;
        this.personIteration = 0;
        this.genderType = false;

        this.upKey = this.game.input.keyboard.addKey(__WEBPACK_IMPORTED_MODULE_0_phaser___default.a.Keyboard.UP);
        this.downKey = this.game.input.keyboard.addKey(__WEBPACK_IMPORTED_MODULE_0_phaser___default.a.Keyboard.DOWN);
        this.leftKey = this.game.input.keyboard.addKey(__WEBPACK_IMPORTED_MODULE_0_phaser___default.a.Keyboard.LEFT);
        this.rightKey = this.game.input.keyboard.addKey(__WEBPACK_IMPORTED_MODULE_0_phaser___default.a.Keyboard.RIGHT);
        this.enterKey = this.game.input.keyboard.addKey(__WEBPACK_IMPORTED_MODULE_0_phaser___default.a.Keyboard.ENTER);
        this.tabKey = this.game.input.keyboard.addKey(__WEBPACK_IMPORTED_MODULE_0_phaser___default.a.Keyboard.TAB);
        this.upKey.onDown.add(function () {
            if (this.movingNode) {
                this.moveDirection = 'up';
            } else {
                if (this.leftMenuOpen) this.triggerIterateLeft(true);else if (this.rightMenuOpen) this.triggerIterateRight(true);else this.iteratePerson(true);
            }
        }.bind(this));
        this.downKey.onDown.add(function () {
            if (this.movingNode) {
                this.moveDirection = 'down';
            } else {
                if (this.leftMenuOpen) this.triggerIterateLeft(false);else if (this.rightMenuOpen) this.triggerIterateRight(false);else this.iteratePerson(false);
            }
        }.bind(this));
        //Iterate Left and enlarge selection.
        this.leftKey.onDown.add(function () {
            if (this.movingNode) {
                this.moveDirection = 'left';
            } else {
                this.triggerIterateUI(true);
            }
        }.bind(this));
        //Iterate Right and enlarge selection.
        this.rightKey.onDown.add(function () {
            if (this.movingNode) {
                this.moveDirection = 'right';
            } else {
                this.triggerIterateUI(false);
            }
        }.bind(this));

        this.upKey.onUp.add(() => {
            this.moveDirection = '';
        }, this);
        this.downKey.onUp.add(() => {
            this.moveDirection = '';
        }, this);
        this.leftKey.onUp.add(() => {
            this.moveDirection = '';
        }, this);
        this.rightKey.onUp.add(() => {
            this.moveDirection = '';
        }, this);

        this.tabKey.onDown.add(function () {
            this.swapGender();
        }.bind(this));

        this.enterKey.onDown.add(function () {
            if (this.takingPicture) {
                this.takePicture();
                return;
            }
            if (!this.leftMenuOpen && !this.rightMenuOpen) {
                this.UI.forEach(function (elm) {
                    if (elm.obj.scale.x == elm.x + 0.2) elm.obj.onInputUp.dispatch();
                }, this);
            }
            if (this.leftMenuOpen) {
                this.leftMenuButtons.forEach(function (elm) {
                    if (elm.obj.scale.x == elm.x + 0.2) {
                        try {
                            elm.obj.events.onInputUp.dispatch();
                        } catch (err) {}
                    }
                }, this);
            } else if (this.rightMenuOpen) {
                this.addCharToNode(this.rightMenuButtons[this.rightMenuIteration].children[0]);
            }
        }.bind(this));
    }

    moveIterationPerson(next) {
        if (next) {
            this.personIteration--;
            if (this.personIteration < 0) this.personIteration = this.people.length - 1;
        } else {
            this.personIteration++;
            if (this.personIteration >= this.people.length) this.personIteration = 0;
        }
    }

    iteratePerson(bool) {
        this.moveIterationPerson(bool);

        if (this.people[this.personIteration]) this.people[this.personIteration].selectNode();
    }

    triggerIterateUI(bool) {
        try {
            if (this.rightMenuOpen) this.openRightMenuBtn.events.onInputUp.dispatch();else if (this.leftMenuOpen) this.openLeftMenuBtn.events.onInputUp.dispatch();
        } catch (e) {}

        this.iterateUi(bool);

        if (this.UI[this.iterate].obj.key == 'openMenu') {
            this.UI[this.iterate].obj.onInputUp.dispatch();
        }

        this.UI.forEach(function (elm) {
            elm.obj.scale.setTo(elm.x, elm.y);
        }, this);

        if (this.UI[this.iterate].obj) this.UI[this.iterate].obj.scale.setTo(this.UI[this.iterate].obj.scale.x + 0.2);
    }

    triggerIterateRight(bool) {
        this.iterateUIRight(bool);

        var charSelection = this.rightMenuButtons[this.rightMenuIteration];
        if (charSelection.y >= this.listView.bounds.height - 100) {
            var distanceBetween = charSelection.y - this.listView.bounds.height * 0.5;
            this.listView.grp.forEach(function (item) {
                item.y -= distanceBetween;
            }.bind(this));
            console.log("Below bracket.");
        } else if (charSelection.y <= this.listView.bounds.y + 100) {
            var distanceBetween = this.listView.bounds.y + 100 - charSelection.y;
            this.listView.grp.forEach(function (item) {
                item.y += distanceBetween;
            }.bind(this));
            console.log("Above brakcet.");
        }

        this.rightMenuButtons.forEach(function (elm) {
            elm.scale.setTo(1);
        }, this);

        if (charSelection) charSelection.scale.setTo(charSelection.scale.x + 0.2);
    }

    triggerIterateLeft(bool) {
        this.iterateUILeft(bool);

        this.leftMenuButtons.forEach(function (elm) {
            elm.obj.scale.setTo(elm.x, elm.y);
        }, this);

        if (this.leftMenuButtons[this.leftMenuIteration].obj) this.leftMenuButtons[this.leftMenuIteration].obj.scale.setTo(this.leftMenuButtons[this.leftMenuIteration].obj.scale.x + 0.2);
    }

    choosePlayer(frame) {
        this.boyBtn.destroy();
        this.girlBtn.destroy();
        this.youText.destroy();
        this.boyText.destroy();
        this.girlText.destroy();
        // this.executeAnimation(this.openBottommenu);
        // this.openMenu.visible = true;
        // var mainSibGroup = new SiblingGroup({game: this});

        var config = {
            image: 'boygirl',
            key: frame,
            sex: frame != 0,
            targetNode: null,
            relationToPlayer: __WEBPACK_IMPORTED_MODULE_5__language_language__["a" /* default */].you,
            btnText: __WEBPACK_IMPORTED_MODULE_5__language_language__["a" /* default */].you
        };
        this.you = new __WEBPACK_IMPORTED_MODULE_4__model_Person__["a" /* default */](this.game, this.game.world.centerX, this.game.world.centerY, config);
        this.game.you = this.you;
        this.family.add(this.you);
        this.picWidth = this.you.character.width;
        this.picHeight = this.you.character.height;
        this.UI = [];
        this.people = [];

        this.addLeftControls();
        this.addBottomControls();
        this.addRightControls();
        this.triggerIterateUI(false);
        this.you.selectNode();
        this.people.push(this.you);

        this.leftMenuIterateLimit = this.leftMenuButtons.length;
        this.rightMenuIterateLimit = this.rightMenuButtons.length;
        this.iterateLimitRight = 0;
    }

    addBottomControls() {
        this.deleteBtn = new __WEBPACK_IMPORTED_MODULE_2__model_Button__["a" /* default */](this.game, this.game.world.width * 0.25, this.game.world.height * 0.93, this.deleteSelectedNode.bind(this), 'Delete Person', 1.5, 1);
        this.moveBtn = new __WEBPACK_IMPORTED_MODULE_2__model_Button__["a" /* default */](this.game, this.game.world.width * 0.4, this.game.world.height * 0.93, this.enableKeyboardMove.bind(this), 'Move Person', 1.5, 1);
        this.downloadBtn = new __WEBPACK_IMPORTED_MODULE_2__model_Button__["a" /* default */](this.game, this.game.world.width * 0.55, this.game.world.height * 0.93, this.capture.bind(this), 'Download', 1.5, 1);
        this.webcamBtn = new __WEBPACK_IMPORTED_MODULE_2__model_Button__["a" /* default */](this.game, this.game.world.width * 0.7, this.game.world.height * 0.93, this.enableWebcam.bind(this), 'Take Picture', 1.5, 1);
        this.UI.push({ obj: this.deleteBtn, x: 1.2 * game.scaleRatio, y: 1.2 * game.scaleRatio });
        this.UI.push({ obj: this.moveBtn, x: 1.2 * game.scaleRatio, y: 1.2 * game.scaleRatio });
        this.UI.push({ obj: this.downloadBtn, x: 1.2 * game.scaleRatio, y: 1.2 * game.scaleRatio });
        this.UI.push({ obj: this.webcamBtn, x: 1.2 * game.scaleRatio, y: 1.2 * game.scaleRatio });
    }

    enableWebcam() {
        this.takingPicture = true;
        this.game.webcam = this.game.plugins.add(__WEBPACK_IMPORTED_MODULE_0_phaser___default.a.Plugin.Webcam);
        console.log(this.game.webcam);
        this.game.bmdPic = this.game.make.bitmapData(__WEBPACK_IMPORTED_MODULE_7__config__["a" /* default */].camWidth, __WEBPACK_IMPORTED_MODULE_7__config__["a" /* default */].camHeight);
        this.game.spritePic = this.game.bmdPic.addToWorld();
        this.game.spritePic.x = this.game.world.centerX;
        this.game.spritePic.y = this.game.world.centerY;
        this.game.spritePic.anchor.setTo(0.5);

        this.game.webcam.start(__WEBPACK_IMPORTED_MODULE_7__config__["a" /* default */].camWidth, __WEBPACK_IMPORTED_MODULE_7__config__["a" /* default */].camHeight, this.game.bmdPic.context);

        this.game.input.onDown.addOnce(this.takePicture, this);
    }

    swapGender() {
        console.log("Changed list.");
        if (this.genderType) {
            this.listView.grp.forEachAlive(function (character) {
                if (this.genreType) character.children[0].frame -= 11;
            }, this);

            this.genderType = false;
        } else {
            this.listView.grp.forEachAlive(function (character) {
                if (!this.genreType) character.children[0].frame += 11;
            }, this);

            this.genderType = true;
        }
    }

    takePicture() {
        this.takingPicture = false;
        this.game.webcam.stop();
        this.game.webcam.grab(this.game.bmdPic.context, 0, 0);

        this.game.cache.addBitmapData('pic', this.game.bmdPic);
        this.game.selectedNode.character.loadTexture(this.game.cache.getBitmapData('pic'), 0);
        this.game.selectedNode.character.width = this.picWidth;
        this.game.selectedNode.character.height = this.picHeight;

        this.game.spritePic.destroy();
        //  bmd.context now contains your webcam image
        this.game.spritePic.tint = Math.random() * 0xff0000;
    }

    addRightControls() {
        this.rightMenu = this.game.add.sprite(this.game.world.width, this.game.world.centerY, 'sidemenu');
        this.rightMenu.height = this.game.world.height;
        this.rightMenu.scale.x = 1.5;
        this.rightMenu.anchor.setTo(0.5);

        var options = {
            direction: 'y',
            overflow: 100,
            padding: 10,
            swipeEnabled: true,
            offsetThreshold: 100,
            searchForClicks: true
        };

        this.listView = new __WEBPACK_IMPORTED_MODULE_1_phaser_list_view__["ListView"](this.game, this.game.world, new __WEBPACK_IMPORTED_MODULE_0_phaser___default.a.Rectangle(this.game.width - this.rightMenu.width * 0.8, 0, 220, this.rightMenu.height * 0.7), options);

        for (var i = 0; i < 11; i++) {
            var item = this.game.add.sprite(0, 0, 'sidebg');
            var character = this.game.add.sprite(0, 0, 'characters', i);

            character.alignIn(item, __WEBPACK_IMPORTED_MODULE_0_phaser___default.a.CENTER, 0, 0);
            item.addChild(character);

            character.inputEnabled = true;
            character.input.priorityID = 0;
            character.input.useHandCursor = true;
            character.events.onInputDown.add(this.addCharToNode, this);
            this.listView.add(item);
            this.rightMenuButtons.push(item);
        }
        this.listView.grp.visible = false;

        this.openRightMenuBtn = this.game.add.button(-this.rightMenu.width * 0.45, 0, 'openMenu', function () {
            if (this.openRightMenuBtn.frame == 1) {
                this.rightMenu.bringToTop();
                this.game.world.bringToTop(this.listView.grp);
                this.executeAnimation(this.openRightMenu);
                this.rightMenuOpen = true;
                this.game.time.events.add(700, () => {
                    this.listView.grp.visible = true;
                    // if(this.rightMenuOpen)
                    //     this.listView.grp.visible = false;
                });
                this.openRightMenuBtn.frame = 0;
            } else {
                this.executeAnimation(this.closeRightMenu);
                this.listView.grp.visible = false;
                this.rightMenuOpen = false;
                this.openRightMenuBtn.frame = 1;
            }
        }.bind(this));
        this.UI.push({ obj: this.openRightMenuBtn, x: game.scaleRatio, y: game.scaleRatio });
        this.openRightMenuBtn.frame = 1;

        this.genre = this.game.add.button(0, this.game.world.centerY * 0.45, 'genre', function () {
            this.listView.grp.forEachAlive(function (character) {
                if (this.genreType) character.children[0].frame -= 11;
            }, this);

            this.genreType = false;
        }.bind(this));

        this.genre.frame = 0;
        this.genre.input.priorityID = 1;
        this.genre.anchor.set(0.5);
        this.genre.scale.set(0.9, 0.9);
        this.genre.x -= this.genre.height * 0.6;
        this.genre.y -= this.genre.height * 1.2;

        this.genre2 = this.game.add.button(0, this.game.world.centerY * 0.45, 'genre', function () {
            this.listView.grp.forEachAlive(function (character) {
                if (!this.genreType) character.children[0].frame += 11;
            }, this);

            this.genreType = true;
        }.bind(this));

        this.genreType = false;
        this.genre2.frame = 1;
        this.genre2.input.priorityID = 1;
        this.genre2.anchor.set(0.5);
        this.genre2.scale.set(0.9, 0.9);
        this.genre2.x += this.genre2.height * 0.6;
        this.genre2.y -= this.genre2.height * 1.2;

        this.rightMenu.addChild(this.openRightMenuBtn);
        this.rightMenu.addChild(this.genre);
        this.rightMenu.addChild(this.genre2);

        this.openRightMenuBtn.anchor.set(0.5);
        this.openRightMenuBtn.input.priorityID = 2;
        this.openRightMenuBtn.visible = true;

        this.openRightMenu = this.game.add.tween(this.rightMenu).to({ x: this.game.world.width - this.rightMenu.width * 0.5 }, 1000, __WEBPACK_IMPORTED_MODULE_0_phaser___default.a.Easing.Exponential.Out);
        this.closeRightMenu = this.game.add.tween(this.rightMenu).to({ x: this.game.world.width + this.rightMenu.width * 0.5 }, 1000, __WEBPACK_IMPORTED_MODULE_0_phaser___default.a.Easing.Exponential.Out);

        this.openRightMenu.onStart.add(function () {
            this.bottomORside = true;
        }, this);
        this.closeRightMenu.onStart.add(function () {
            this.bottomORside = false;
        }, this);

        this.executeAnimation(this.closeRightMenu);
    }

    deleteSelectedNode() {
        if (this.game.selectedNode != this.you) {
            this.game.selectedNode.deletePerson();
            this.game.selectedNode = null;
            this.you.selectNode();
        }
    }

    enableKeyboardMove() {
        this.movingNode = !this.movingNode;
    }

    addCharToNode(sprite) {
        if (!this.game.selectedNode || this.game.selectedNode == this.you) return;

        var config = {
            image: 'characters',
            key: sprite.frame,
            sex: this.genreType,
            targetNode: this.game.selectedNode,
            btnText: null
        };

        this.game.selectedNode.setImageBg(config);
    }

    addLeftControls() {
        this.leftMenu = this.game.add.sprite(0, this.game.world.centerY, 'sidemenu');
        this.leftMenu.height = this.game.world.height;
        this.leftMenu.scale.x = 1.5;
        this.leftMenu.anchor.setTo(0.5);

        let relations = [__WEBPACK_IMPORTED_MODULE_5__language_language__["a" /* default */].parents, __WEBPACK_IMPORTED_MODULE_5__language_language__["a" /* default */].stepparents, __WEBPACK_IMPORTED_MODULE_5__language_language__["a" /* default */].brothers, __WEBPACK_IMPORTED_MODULE_5__language_language__["a" /* default */].stepbrothers, __WEBPACK_IMPORTED_MODULE_5__language_language__["a" /* default */].children];

        var offsetY = -this.leftMenu.height * 0.08;
        for (var x = 0; x < relations.length; x++) {
            let relation = relations[x];
            let button = new __WEBPACK_IMPORTED_MODULE_2__model_Button__["a" /* default */](this.game, 0, offsetY * -(x - 2), this.addRelative.bind(this), relation, 1, 0.7);
            this.leftMenu.addChild(button);
            this.leftMenuButtons.push({ obj: button, x: game.scaleRatio, y: game.scaleRatio });
        }
        ;

        this.openLeftMenuBtn = this.game.add.button(this.leftMenu.width * 0.45, 0, 'openMenu', function () {
            if (this.openLeftMenuBtn.frame == 0) {
                this.leftMenu.bringToTop();
                this.executeAnimation(this.openLeftMenu);
                this.openLeftMenuBtn.frame = 1;
            } else {
                this.executeAnimation(this.closeLeftMenu);
                // this.addBottomControls();
                this.openLeftMenuBtn.frame = 0;
            }
        }.bind(this));
        this.UI.push({ obj: this.openLeftMenuBtn, x: game.scaleRatio, y: game.scaleRatio });

        this.leftMenu.addChild(this.openLeftMenuBtn);

        this.openLeftMenuBtn.anchor.set(0.5);
        this.openLeftMenuBtn.input.priorityID = 2;
        this.openLeftMenuBtn.visible = true;

        this.openLeftMenu = this.game.add.tween(this.leftMenu).to({ x: this.leftMenu.width * 0.5 }, 1000, __WEBPACK_IMPORTED_MODULE_0_phaser___default.a.Easing.Exponential.Out);
        this.closeLeftMenu = this.game.add.tween(this.leftMenu).to({ x: -this.leftMenu.width * 0.5 }, 1000, __WEBPACK_IMPORTED_MODULE_0_phaser___default.a.Easing.Exponential.Out);

        this.openLeftMenu.onStart.add(function () {
            this.leftMenuOpen = true;
            // this.triggerIterateLeft(true);
            // this.triggerIterateLeft(false);
        }.bind(this), this);
        this.closeLeftMenu.onStart.add(function () {
            this.leftMenuOpen = false;
        }.bind(this), this);

        this.executeAnimation(this.closeLeftMenu);
    }

    addRelative(btn) {
        var targetNode = this.game.selectedNode;
        var frame = game.rnd.integerInRange(0, 10);
        var gender = game.rnd.integerInRange(0, 1);

        var config = {
            image: 'characters',
            key: frame,
            sex: gender,
            targetNode: targetNode,
            btnText: btn.text
        };

        var person = new __WEBPACK_IMPORTED_MODULE_4__model_Person__["a" /* default */](this.game, targetNode.x + 50, targetNode.y + 50, config);
        this.family.add(person);
        this.people.push(person);
    }

    iterateUILeft(left) {
        if (left) {
            this.leftMenuIteration--;
            if (this.leftMenuIteration < 0) this.leftMenuIteration = this.leftMenuIterateLimit - 1;
        } else {
            this.leftMenuIteration++;
            if (this.leftMenuIteration >= this.leftMenuButtons.length) this.leftMenuIteration = 0;
        }
    }

    iterateUIRight(left) {
        if (left) {
            this.rightMenuIteration--;
            if (this.rightMenuIteration < 0) this.rightMenuIteration = this.rightMenuIterateLimit - 1;
        } else {
            this.rightMenuIteration++;
            if (this.rightMenuIteration >= this.rightMenuButtons.length) this.rightMenuIteration = 0;
        }
    }

    iterateUi(left) {
        if (left) {
            this.iterate--;
            if (this.iterate < 0) this.iterate = this.UI.length - 1;
        } else {
            this.iterate++;
            if (this.iterate >= this.UI.length) this.iterate = 0;
        }
    }

    executeAnimation(anim) {
        if (anim && !anim.isRunning) anim.start();
    }

    update() {
        if (this.movingNode) {
            switch (this.moveDirection) {
                case 'up':
                    this.game.selectedNode.y -= this.moveDistance;
                    break;
                case 'down':
                    this.game.selectedNode.y += this.moveDistance;
                    break;
                case 'left':
                    this.game.selectedNode.x -= this.moveDistance;
                    break;
                case 'right':
                    this.game.selectedNode.x += this.moveDistance;
                    break;
                default:
                    break;
            }
        }

        if (!this.webcamAvailable) return;

        this.pixelate();

        this.countdownPlaying = this.countdown.animations.currentAnim.isPlaying;

        if (!this.countdownPlaying && this.takePicture) {
            this.shutterSound.play();

            var data = this.pixelBitmap.canvas.toDataURL();
            document.getElementById('output').style.display = "block";

            var images = ['shot-full', 'shot-120', 'shot-72', 'shot-48'];
            for (var i = 0; i < images.length; i++) {
                var img = document.getElementById(images[i]);
                img.src = data;
                var parent = img.parentNode;
                parent.href = data;
            }

            this.countdown.visible = false;
            this.takePicture = false;
            this.ui.visible = true;
            this.shutter.animations.play('shine');

            // Flash
            this.flash.alpha = 1;
            game.add.tween(this.flash).to({ alpha: 0 }, 250).start();
        }
    }

    capture() {
        // this.openMenu.frame = 0;

        var canvasImageSaver = new __WEBPACK_IMPORTED_MODULE_6_canvas_image_saver___default.a(this.game.canvas, {
            xCropOffset: 0,
            yCropOffset: 0,
            width: this.game.width,
            height: this.game.height
        }, function (canvas, fileName) {
            // Success callback
        }, function (error) {
            // Error callback
        }, this);

        this.executeAnimation(this.closeLeftMenu);
        this.executeAnimation(this.closeRightMenu);
        this.callApiActivity();
        this.game.time.events.add(1000, function () {
            canvasImageSaver.save("myfamilytree", "myfamilytree");
        }, this);
    }

    callApiActivity() {
        fetch('https://dtml.org/Activity/RecordUserActivity?id=familytree&score=' + __WEBPACK_IMPORTED_MODULE_7__config__["a" /* default */].scoreRecord, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }).then(res => res.json()).then(data => {
            console.log(data);
        }).catch(err => {
            console.log('err', err);
        });
    }

    unselectAllNodes() {
        this.game.selectedNode = null;
        this.family.forEachAlive(function (e) {
            if (e.selected) {
                e.selected = false;
                e.children[0].frame = 0;
            }
        }, this);
    }

    cameraConnected() {
        this.turnOnCamera.visible = false;
        this.ui.visible = true;

        this.readySound.play();
    }

    cameraError() {
        document.getElementById('cam').style.display = "none";
        document.getElementById('notconnected').style.display = "block";
        document.getElementById('instructions').style.display = "none";
    }

    clickShutter() {
        this.buttonSound.play();

        if (!this.countdownPlaying) {
            this.countdown.alpha = 1;
            this.countdown.scale.set(2);
            this.countdown.visible = true;
            this.countdown.animations.play('go');

            this.beepSound.play();

            this.add.tween(this.countdown.scale).to({ x: 5, y: 5 }, 500, __WEBPACK_IMPORTED_MODULE_0_phaser___default.a.Easing.Cubic.In).repeat(2).start();
            this.add.tween(this.countdown).to({ alpha: 0 }, 500, __WEBPACK_IMPORTED_MODULE_0_phaser___default.a.Easing.Cubic.In).repeat(2).start();

            this.ui.visible = false;
            this.takePicture = true;
        }
    }

    pixelate() {
        var offsetX = __WEBPACK_IMPORTED_MODULE_7__config__["a" /* default */].camWidth / 2 - this.game.world.width / 2;
        var offsetY = __WEBPACK_IMPORTED_MODULE_7__config__["a" /* default */].camHeight / 2 - this.game.world.height / 2;

        var pxContext = this.pixelBitmap.context;

        this.camBitmap.update();

        var pixel = __WEBPACK_IMPORTED_MODULE_0_phaser___default.a.Color.createColor();

        for (var x = 0; x < game.width; x += this.pixelSize) {
            for (var y = 0; y < game.height; y += this.pixelSize) {
                // Sample color at x+offsetX,y+offsetY in camBitmap
                this.camBitmap.getPixel(Math.floor(x + offsetX), Math.floor(y + offsetY), pixel);

                // Modify color
                this.posterizeFilter(pixel, 16);
                if (!this.color) this.grayscaleFilter(pixel);
                var tint = this.tintChoices[this.tintValue];
                this.tintFilter(pixel, tint.r, tint.g, tint.b);

                // Draw pixel at x,y in new bitmap
                pxContext.fillStyle = "rgb(" + pixel.r + "," + pixel.g + "," + pixel.b + ")";
                pxContext.fillRect(x, y, this.pixelSize, this.pixelSize);
            }
        }

        this.camBitmap.dirty = true;
        this.pixelBitmap.dirty = true;
    }

    grayscaleFilter(pixel) {
        var c = __WEBPACK_IMPORTED_MODULE_0_phaser___default.a.Color.RGBtoHSV(pixel.r, pixel.g, pixel.b);
        c.s = 0;
        __WEBPACK_IMPORTED_MODULE_0_phaser___default.a.Color.HSVtoRGB(c.h, c.s, c.v, pixel);
    }

    tintFilter(pixel, r, g, b) {
        pixel.r = Math.floor(pixel.r * r);
        pixel.g = Math.floor(pixel.g * g);
        pixel.b = Math.floor(pixel.b * b);
    }

    posterizeFilter(pixel, colors) {
        // Posterize
        var divisor = 256 / colors;
        pixel.r = Math.floor(Math.floor(pixel.r / divisor) * divisor);
        pixel.g = Math.floor(Math.floor(pixel.g / divisor) * divisor);
        pixel.b = Math.floor(Math.floor(pixel.b / divisor) * divisor);

        // Contrast
        var thresh = 60;
        var lowThresh = 40;
        var highThresh = 220;
        var amount = 30;
        if (pixel.r > highThresh) pixel.r = 255;
        if (pixel.r > thresh) pixel.r += amount;
        if (pixel.r < thresh) pixel.r -= amount;
        if (pixel.r < lowThresh) pixel.r = 0;

        if (pixel.g > highThresh) pixel.g = 255;
        if (pixel.g > thresh) pixel.g += amount;
        if (pixel.g < thresh) pixel.g -= amount;
        if (pixel.g < lowThresh) pixel.g = 0;

        if (pixel.b > highThresh) pixel.b = 255;
        if (pixel.b > thresh) pixel.b += amount;
        if (pixel.b < thresh) pixel.b -= amount;
        if (pixel.b < lowThresh) pixel.b = 0;
    }
});

/***/ }),
/* 352 */
/*!****************************************************!*\
  !*** ./node_modules/phaser-list-view/lib/index.js ***!
  \****************************************************/
/*! dynamic exports provided */
/*! exports used: ListView */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ScrollerEventDispatcher = exports.BasicSwiper = exports.DirectionalScroller = exports.WheelScroller = exports.SwipeCarousel = exports.ListViewCore = exports.ListView = exports.Scroller = undefined;

var _scroller = __webpack_require__(/*! ./scroller */ 96);

var _scroller2 = _interopRequireDefault(_scroller);

var _list_view = __webpack_require__(/*! ./list_view */ 136);

var _list_view2 = _interopRequireDefault(_list_view);

var _list_view_core = __webpack_require__(/*! ./list_view_core */ 137);

var _list_view_core2 = _interopRequireDefault(_list_view_core);

var _swipe_carousel = __webpack_require__(/*! ./swipe_carousel */ 353);

var _swipe_carousel2 = _interopRequireDefault(_swipe_carousel);

var _wheel_scroller = __webpack_require__(/*! ./wheel_scroller */ 354);

var _wheel_scroller2 = _interopRequireDefault(_wheel_scroller);

var _directional_scroller = __webpack_require__(/*! ./directional_scroller */ 138);

var _directional_scroller2 = _interopRequireDefault(_directional_scroller);

var _basic_swiper = __webpack_require__(/*! ./basic_swiper */ 355);

var _basic_swiper2 = _interopRequireDefault(_basic_swiper);

var _scroller_event_dispatcher = __webpack_require__(/*! ./scroller_event_dispatcher */ 356);

var _scroller_event_dispatcher2 = _interopRequireDefault(_scroller_event_dispatcher);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var PhaserListView = {
  Scroller: _scroller2.default,
  ListView: _list_view2.default,
  ListViewCore: _list_view_core2.default,
  SwipeCarousel: _swipe_carousel2.default,
  WheelScroller: _wheel_scroller2.default,
  DirectionalScroller: _directional_scroller2.default,
  BasicSwiper: _basic_swiper2.default,
  ScrollerEventDispatcher: _scroller_event_dispatcher2.default
};

exports.Scroller = _scroller2.default;
exports.ListView = _list_view2.default;
exports.ListViewCore = _list_view_core2.default;
exports.SwipeCarousel = _swipe_carousel2.default;
exports.WheelScroller = _wheel_scroller2.default;
exports.DirectionalScroller = _directional_scroller2.default;
exports.BasicSwiper = _basic_swiper2.default;
exports.ScrollerEventDispatcher = _scroller_event_dispatcher2.default;

// NOTE: we should only attach to the window in a production build

window.PhaserListView = PhaserListView;

exports.default = PhaserListView;

/***/ }),
/* 353 */
/*!*************************************************************!*\
  !*** ./node_modules/phaser-list-view/lib/swipe_carousel.js ***!
  \*************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _list_view = __webpack_require__(/*! ./list_view */ 136);

var _list_view2 = _interopRequireDefault(_list_view);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var defaultOptions = {
  direction: 'x',
  autocull: true,
  momentum: false,
  bouncing: true,
  snapping: true,
  overflow: 100,
  padding: 10,
  swipeEnabled: true,
  offset: {
    x: 100
  }
};

var SwipeCarousel = function (_ListView) {
  _inherits(SwipeCarousel, _ListView);

  function SwipeCarousel(game, parent, bounds) {
    var options = arguments.length <= 3 || arguments[3] === undefined ? {} : arguments[3];

    _classCallCheck(this, SwipeCarousel);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(SwipeCarousel).call(this, game, parent, bounds, Object.assign({}, defaultOptions, options)));

    _this.scroller.options.snapStep = bounds.width + _this.o.padding;
    return _this;
  }

  return SwipeCarousel;
}(_list_view2.default);

exports.default = SwipeCarousel;

/***/ }),
/* 354 */
/*!*************************************************************!*\
  !*** ./node_modules/phaser-list-view/lib/wheel_scroller.js ***!
  \*************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _math_utils = __webpack_require__(/*! ./utils/math_utils */ 65);

var _math_utils2 = _interopRequireDefault(_math_utils);

var _scroller = __webpack_require__(/*! ./scroller */ 96);

var _scroller2 = _interopRequireDefault(_scroller);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _Phaser$Math = Phaser.Math;
var radToDeg = _Phaser$Math.radToDeg;
var degToRad = _Phaser$Math.degToRad;

var _ptHelper = new Phaser.Point();

var defaultOptions = {
  direction: 'angle',
  infinite: false,
  speedLimit: 1.5
};

var WheelScroller = function (_Scroller) {
  _inherits(WheelScroller, _Scroller);

  function WheelScroller(game, clickObject) {
    var options = arguments.length <= 2 || arguments[2] === undefined ? {} : arguments[2];

    _classCallCheck(this, WheelScroller);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(WheelScroller).call(this, game, clickObject, { angle: clickObject.width / 2 }, Object.assign({}, defaultOptions, options)));
  }

  // extends Scroller.handleDown


  _createClass(WheelScroller, [{
    key: 'handleDown',
    value: function handleDown(target, pointer) {
      if (!this.enabled) return;
      this.centerPoint = this.clickObject.toGlobal(new Phaser.Point(0, 0));
      _ptHelper.set(pointer.x, pointer.y);
      this.old = this.down = Phaser.Math.normalizeAngle(Phaser.Math.angleBetweenPoints(_ptHelper, this.centerPoint));
      this.fullDiff = 0;

      _get(Object.getPrototypeOf(WheelScroller.prototype), 'handleDown', this).call(this, target, pointer);
    }

    // overrides Scroller.handleMove

  }, {
    key: 'handleMove',
    value: function handleMove(pointer, x, y) {
      if (!this.enabled) return;
      this.isScrolling = true;
      _ptHelper.set(x, y);
      var currentRotation = Phaser.Math.normalizeAngle(Phaser.Math.angleBetweenPoints(_ptHelper, this.centerPoint));
      var rotations = 0;

      var diffRotation = this.old - currentRotation;
      this.diff = radToDeg(diffRotation);

      if (this.diff > 180) {
        rotations = 1;
      } else if (this.diff < -180) {
        rotations = -1;
      }

      if (rotations != 0) {
        var fullCircle = rotations * degToRad(360);
        diffRotation -= fullCircle;
        this.diff = radToDeg(diffRotation);
      }

      this.diff = this._requestDiff(this.diff, this.target, this.min, this.max, this.o.overflow);

      this.fullDiff -= this.diff;

      this.target -= this.diff;

      if (this.o.infinite) {
        this.target = this._wrapTarget(this.target, this.min, this.max);
      }

      this.old = currentRotation;

      //store timestamp for event
      this.o.time.move = this.game.time.time;

      var diameter = this.clickObject.width;
      var circumference = Math.PI * diameter;
      var sectorLength = circumference * (this.diff / 360);
      this.acc = Math.min(Math.abs(sectorLength / 30), this.o.maxAcceleration);

      //go ahead and move the block
      this.scrollObject[this.o.direction] = this.target;
      this.handleUpdate();

      if (this.o.emitMoving) this.events.onInputMove.dispatch({ pointer: pointer, x: x, y: y });
    }

    // extends Scroller.handleDown

  }, {
    key: 'handleUp',
    value: function handleUp(target, pointer) {
      _ptHelper.set(pointer.x, pointer.y);
      this.current = Phaser.Math.normalizeAngle(Phaser.Math.angleBetweenPoints(_ptHelper, this.centerPoint));

      _get(Object.getPrototypeOf(WheelScroller.prototype), 'handleUp', this).call(this, target, pointer);
    }
  }, {
    key: '_wrapTarget',
    value: function _wrapTarget(target, min, max) {
      var diff = 0;
      if (target > max) {
        diff = target - max;
        target = min + diff;
      } else if (target < min) {
        diff = min - target;
        target = max - diff;
      }
      return target;
    }
  }]);

  return WheelScroller;
}(_scroller2.default);

exports.default = WheelScroller;

/***/ }),
/* 355 */
/*!***********************************************************!*\
  !*** ./node_modules/phaser-list-view/lib/basic_swiper.js ***!
  \***********************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _math_utils = __webpack_require__(/*! ./utils/math_utils */ 65);

var _math_utils2 = _interopRequireDefault(_math_utils);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var _ptHelper = new Phaser.Point();
var defaultOptions = {
  from: 0,
  to: 200,
  direction: 'y',
  snapStep: 10,
  duration: 1, // (s) duration of the inertial scrolling simulation.
  time: {}, // contains timestamps of the most recent down, up, and move events
  swipeThreshold: 5, // (pixels) must move this many pixels for a swipe action
  swipeTimeThreshold: 250, // (ms) determines if a swipe occurred: time between last updated movement @ touchmove and time @ touchend, if smaller than this value, trigger swipe
  addListeners: true
};

// ** WORK IN PROGRESS **
//
// Similar to the Scroller class but there is no focus on a start and end of the scroll surface.
// For example with Scroller if you swiped left 3 times you would continue to go further left and
// closer to the end of the limit.
// With BasicSwiper if you swiped left 3 times, each time you receive values between -1 and 1, depending
// on the direction you swipe.
//
// TODO - consolidate BasicSwiper and Scroller. At least they could share same functions
//

var BasicSwiper = function () {
  function BasicSwiper(game, clickObject) {
    var options = arguments.length <= 2 || arguments[2] === undefined ? {} : arguments[2];

    _classCallCheck(this, BasicSwiper);

    this.game = game;
    this.clickObject = clickObject;

    this.o = this.options = Object.assign({}, defaultOptions, options);

    this._updateMinMax();

    this.addListeners();

    this.scrollObject = {};
    this.scrollObject[this.o.direction] = this.o.from;

    // set tween that will be re-used for moving scrolling sprite
    this.tweenScroll = this.game.add.tween(this.scrollObject).to({}, 0, Phaser.Easing.Quartic.Out);
    this.tweenScroll.onUpdateCallback(this.handleUpdate, this);
    this.tweenScroll.onComplete.add(this.handleComplete, this);
  }

  _createClass(BasicSwiper, [{
    key: 'addListeners',
    value: function addListeners() {
      this.events = {
        onUpdate: new Phaser.Signal(),
        onInputUp: new Phaser.Signal(),
        onInputDown: new Phaser.Signal(),
        onInputMove: new Phaser.Signal(),
        onComplete: new Phaser.Signal(),
        onSwipe: new Phaser.Signal()
      };

      this.enable();

      if (this.o.addListeners) {
        this.clickObject.inputEnabled = true;
        this.clickObject.events.onInputDown.add(this.handleDown, this);
        this.clickObject.events.onInputUp.add(this.handleUp, this);
      }
    }
  }, {
    key: 'removeListeners',
    value: function removeListeners() {
      if (this.o.addListeners) {
        this.clickObject.events.onInputDown.remove(this.handleDown, this);
        this.clickObject.events.onInputUp.remove(this.handleUp, this);
      }

      for (var property in this.events) {
        if (this.events.hasOwnProperty(property)) {
          this.events[property].removeAll();
        }
      }
    }
  }, {
    key: 'destroy',
    value: function destroy() {
      this.removeListeners();
    }
  }, {
    key: 'enable',
    value: function enable() {
      this.enabled = true;
    }
  }, {
    key: 'disable',
    value: function disable() {
      this.enabled = false;
    }
  }, {
    key: 'isTweening',
    value: function isTweening() {
      return this.tweenScroll.isRunning;
    }
  }, {
    key: 'handleDown',
    value: function handleDown(target, pointer) {
      if (!this.enabled) {
        this.clickBlocked = true;
        return;
      }
      this.clickBlocked = false;
      // console.log('handle down', pointer[this.o.direction])
      this.isDown = true;
      // console.log('input down', pointer.y)
      this.old = this.down = pointer[this.o.direction];
      this.target = 0;
      this.o.time.down = pointer.timeDown;

      if (this.o.addListeners) this.game.input.addMoveCallback(this.handleMove, this);

      //stop tween for touch-to-stop
      this.tweenScroll.stop();
      this.tweenScroll.pendingDelete = false;

      this.events.onInputDown.dispatch(target, pointer);
    }
  }, {
    key: 'handleMove',
    value: function handleMove(pointer, x, y) {
      if (!this.enabled) return;
      _ptHelper.set(x, y);
      this.diff = this.old - _ptHelper[this.o.direction];
      // console.log('diff', this.diff)
      this.target -= this.diff;

      this.old = _ptHelper[this.o.direction];

      //store timestamp for event
      this.o.time.move = this.game.time.time;

      //go ahead and move the block
      this.scrollObject[this.o.direction] = this.target;
      this.handleUpdate();

      if (this.o.emitMoving) this.events.onInputMove.dispatch(pointer, x, y);
    }
  }, {
    key: 'handleUp',
    value: function handleUp(target, pointer) {
      if (!this.enabled || this.clickBlocked) return;
      this.isDown = false;
      // console.log('end')
      if (this.o.addListeners) this.game.input.deleteMoveCallback(this.handleMove, this);

      //store timestamp for event
      this.o.time.up = pointer.timeUp;

      var o = {
        duration: this.o.duration,
        target: this.target
      };

      // *** SWIPING
      this._addSwiping(o, pointer);

      // *** SNAPPING
      this._addSnapping(o);

      this.tweenTo(o.duration, o.target);

      this.events.onInputUp.dispatch(target, pointer);
    }
  }, {
    key: '_addSwiping',
    value: function _addSwiping(o, pointer) {
      var swipeDistance = Math.abs(this.down - this.old);
      if (this.o.time.up - this.o.time.down < this.o.swipeTimeThreshold && swipeDistance > this.o.swipeThreshold) {
        var direction = pointer[this.o.direction] < this.down ? 'forward' : 'backward';

        if (direction == 'forward') {
          o.target -= this.o.snapStep / 2;
        } else {
          o.target += this.o.snapStep / 2;
        }

        this.events.onSwipe.dispatch(direction);
      }
      return o;
    }
  }, {
    key: '_addSnapping',
    value: function _addSnapping(o) {
      o.target = _math_utils2.default.nearestMultiple(o.target, this.o.snapStep);
      return o;
    }
  }, {
    key: 'tweenTo',
    value: function tweenTo(duration, target) {
      // console.log('tweenTo', duration, target)
      //stop a tween if it is currently happening
      var o = {};
      o[this.o.direction] = target;

      this.tweenScroll.onUpdateCallback(this.handleUpdate, this);
      this.tweenScroll.onComplete.add(this.handleComplete, this);

      this.tweenScroll.updateTweenData('vEnd', o, -1);
      this.tweenScroll.updateTweenData('duration', duration * 1000, -1);
      this.tweenScroll.updateTweenData('percent ', 0, -1);

      this.tweenScroll.start();
    }

    // dispatches a value between -1 and 1 depending on the direction of the swipe action.

  }, {
    key: 'handleUpdate',
    value: function handleUpdate() {
      this.events.onUpdate.dispatch(_math_utils2.default.scaleBetween(-1, 1, _math_utils2.default.percentageBetween2(this.scrollObject[this.o.direction], -this.length, this.length)));
    }
  }, {
    key: 'handleComplete',
    value: function handleComplete() {
      // reset multiplier when finished
      this.o.multiplier = 1;
      this.events.onComplete.dispatch();
    }
  }, {
    key: '_updateMinMax',
    value: function _updateMinMax() {
      this.min = Math.min(this.o.from, this.o.to);
      this.max = Math.max(this.o.from, this.o.to);
      this.length = Math.abs(this.max - this.min);
      this.o.snapStep = this.length;
    }
  }]);

  return BasicSwiper;
}();

exports.default = BasicSwiper;

/***/ }),
/* 356 */
/*!************************************************************************!*\
  !*** ./node_modules/phaser-list-view/lib/scroller_event_dispatcher.js ***!
  \************************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _util = __webpack_require__(/*! ./util */ 66);

var _config = __webpack_require__(/*! ./config */ 135);

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var defaultOptions = {
  direction: 'auto',
  autoDetectThreshold: _config2.default.AUTO_DETECT_THRESHOLD
};

// Scroller Event Dispatcher is a centralized place to listener for events useful for scrollers
// The main feature of this class is the 'auto detect' for x and y directions.
// If you set 'direction' to 'auto', events won't dispatch until a direction is detected.
//

var ScrollerEventDispatcher = function () {
  function ScrollerEventDispatcher(game, clickObject) {
    var options = arguments.length <= 2 || arguments[2] === undefined ? {} : arguments[2];

    _classCallCheck(this, ScrollerEventDispatcher);

    this.game = game;
    this.clickObject = clickObject;
    this.clickables = [];

    this.o = this.options = Object.assign({}, defaultOptions, options);

    this.addListeners();
  }

  _createClass(ScrollerEventDispatcher, [{
    key: 'addListeners',
    value: function addListeners() {
      this.events = {
        onInputUp: new Phaser.Signal(),
        onInputDown: new Phaser.Signal(),
        onInputMove: new Phaser.Signal(),
        onDirectionSet: new Phaser.Signal()
      };

      this.clickObject.inputEnabled = true;
      this.enable();
      this.clickObject.events.onInputDown.add(this.handleDown, this);
      this.clickObject.events.onInputUp.add(this.handleUp, this);
    }
  }, {
    key: 'removeListeners',
    value: function removeListeners() {
      this.clickObject.events.onInputDown.remove(this.handleDown, this);
      this.clickObject.events.onInputUp.remove(this.handleUp, this);

      for (var property in this.events) {
        if (this.events.hasOwnProperty(property)) {
          this.events[property].removeAll();
        }
      }
    }
  }, {
    key: 'destroy',
    value: function destroy() {
      this.removeListeners();
    }
  }, {
    key: 'enable',
    value: function enable() {
      this.enabled = true;
    }
  }, {
    key: 'disable',
    value: function disable() {
      this.enabled = false;
    }
  }, {
    key: 'setDirection',
    value: function setDirection(direction) {
      this.direction = direction;
      this.events.onDirectionSet.dispatch(direction);
    }

    /**
     * [registerClickables]
     * If a standard click occurs on the dispatcher surface we want to handle the click.
     * @param  {Array[DisplayObjects]} clickables - Check these clickables AND their children for standard phaser input events.
     *                                              e.g. displayObject.events.onInputUp
     */

  }, {
    key: 'registerClickables',
    value: function registerClickables(clickables) {
      this.clickables = clickables;
    }
  }, {
    key: 'dispatchClicks',
    value: function dispatchClicks(pointer, clickables, type) {
      var found = (0, _util.dispatchClicks)(pointer, clickables, type);
      if (type == 'onInputDown') {
        this.currentDown = found;
      }
      return found;
    }
  }, {
    key: 'handleDown',
    value: function handleDown(target, pointer) {
      var _this = this;

      if (!this.enabled) {
        this.clickBlocked = true;
        return;
      }
      this.clickBlocked = false;

      if (this.o.direction == 'auto') {
        this.direction = null;
        this.old = null;
      } else {
        this.setDirection(this.o.direction);
        this.old = this.down = pointer[this.direction];
      }

      this.game.input.addMoveCallback(this.handleMove, this);

      this.dispatchClicks(pointer, this.clickables, 'onInputDown');
      this.events.onInputDown.dispatch(target, pointer, function (clickables, type) {
        return _this.dispatchClicks(pointer, clickables, 'onInputDown');
      });
    }
  }, {
    key: 'handleMove',
    value: function handleMove(pointer, x, y) {
      if (!this.enabled) return;

      if (!this.direction && this.o.direction == 'auto') {
        var xDist = Math.abs(pointer.positionDown.x - x);
        var yDist = Math.abs(pointer.positionDown.y - y);
        if (xDist > this.o.autoDetectThreshold || yDist > this.o.autoDetectThreshold) {
          this._cancelCurrentDown(pointer);
          var direction = xDist > yDist ? 'x' : 'y';
          this.setDirection(direction);
        } else {
          return;
        }
      }

      this.events.onInputMove.dispatch(pointer, x, y);
    }
  }, {
    key: 'handleUp',
    value: function handleUp(target, pointer) {
      var _this2 = this;

      if (!this.enabled || this.clickBlocked) return;
      this.game.input.deleteMoveCallback(this.handleMove, this);
      this.dispatchClicks(pointer, this.clickables, 'onInputUp');
      this.events.onInputUp.dispatch(target, pointer, function (clickables, type) {
        return _this2.dispatchClicks(pointer, clickables, 'onInputUp');
      });
      this.currentDown = null;
    }
  }, {
    key: '_cancelCurrentDown',
    value: function _cancelCurrentDown(pointer) {
      if (this.currentDown && this.currentDown.events && this.currentDown.events.onInputUp) {
        this.currentDown.events.onInputUp.dispatch(this.currentDown, pointer, false);
      }
      this.currentDown = null;
    }
  }]);

  return ScrollerEventDispatcher;
}();

exports.default = ScrollerEventDispatcher;

/***/ }),
/* 357 */
/*!*****************************!*\
  !*** ./src/model/Button.js ***!
  \*****************************/
/*! exports provided: default */
/*! exports used: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_phaser__ = __webpack_require__(/*! phaser */ 29);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_phaser___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_phaser__);


class Person extends __WEBPACK_IMPORTED_MODULE_0_phaser___default.a.Button {
    constructor(game, x, y, func, text, btnScale, txtScale) {
        super(game, x, y, 'sharebtn', func);
        this.anchor.setTo(0.5);
        console.log(game.aspectRatio);
        this.scale.setTo(btnScale * game.aspectRatio);
        this.game = game;
        this.text = text;

        var font = this.game.add.text(0, 0, text, {
            font: "12px sans-serif", fill: "#ffffff", stroke: "#000000", strokeThickness: "6"
        });
        font.scale.setTo(txtScale);
        font.anchor.setTo(0.5);

        this.addChild(font);

        this.game.add.existing(this);
        return this;
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Person;


/***/ }),
/* 358 */
/*!*****************************!*\
  !*** ./src/model/Person.js ***!
  \*****************************/
/*! exports provided: default */
/*! exports used: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_phaser__ = __webpack_require__(/*! phaser */ 29);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_phaser___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_phaser__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__language_language__ = __webpack_require__(/*! ../language/language */ 95);



class Person extends __WEBPACK_IMPORTED_MODULE_0_phaser___default.a.Sprite {
    constructor(game, x, y, config) {
        super(game, x, y, 'treebg', 0, config);
        this.game = game;
        this.selected = false;
        console.log(config);
        this.origConfig = config;
        this.setData(config);
        this.setConfig(config.key);
        if (config.relationToPlayer != __WEBPACK_IMPORTED_MODULE_1__language_language__["a" /* default */].you) this.line = new __WEBPACK_IMPORTED_MODULE_0_phaser___default.a.Line(x, y, this.targetNode.x, this.targetNode.y);

        return this;
    }

    deletePerson() {
        this.destroy();
    }

    update() {
        if (this.line) this.line.fromSprite(this, this.targetNode, false);
    }

    selectNode() {
        console.log("Selecting Node");
        if (null != this.game.selectedNode) this.game.selectedNode.children[0].frame = 0;
        this.game.selectedNode = this;
        this.children[0].frame = 1;
    }

    setConfig(key) {
        this.game.physics.enable(this, __WEBPACK_IMPORTED_MODULE_0_phaser___default.a.Physics.ARCADE);
        this.body.setSize(this.width, this.height, 0, 0);
        this.sfxbtn = this.game.add.audio(this.type);
        this.bg = this.game.add.sprite(0, 0, 'sidebg');
        this.bg.anchor.set(0.5);

        this.scale.set(0.5);

        this.inputEnabled = true;
        this.input.useHandCursor = true;
        this.input.enableDrag(true);
        this.anchor.setTo(0.5);
        this.events.onInputDown.add(() => {
            this.selectNode();
        }, this);

        if (this.imageUsed) {
            this.character = this.game.add.sprite(0, 0, this.imageUsed, this.sex && this.relationToPlayer != __WEBPACK_IMPORTED_MODULE_1__language_language__["a" /* default */].you ? key + 11 : key);
            this.character.anchor.set(0.5);
        }

        var erasePos = 0;

        if (this.relation != 'me') {
            var erasePos = -30;

            this.eraseBtn = this.game.add.button(30, -85, 'erase', function () {
                this.activateErase();
                this.destroy();
            }.bind(this));
        }

        this.wordVoiceBtn = this.game.add.button(erasePos, -85, 'voice', function () {
            if (this.sfxbtn.key != '') this.sfxbtn.play();
        }.bind(this));
        this.wordVoiceBtn.scale.set(1.5);
        this.wordVoiceBtn.anchor.set(0.5);

        this.nameInput = this.createTextInput(-75, 60, this.getPlayerRelation());

        this.addChild(this.bg);
        this.addChild(this.wordVoiceBtn);
        this.addChild(this.nameInput);
        if (this.relation != 'me') {
            this.eraseBtn.scale.set(1.5);
            this.eraseBtn.anchor.set(0.5);
            this.addChild(this.eraseBtn);
        }

        if (this.imageUsed) this.addChild(this.character);

        // this.setTintRelation();
        this.game.add.existing(this);
        return this;
    }

    getPlayerRelation() {
        switch (this.relationToPlayer) {
            case 'GrandParent':
                return this.sex ? __WEBPACK_IMPORTED_MODULE_1__language_language__["a" /* default */].grandmother : __WEBPACK_IMPORTED_MODULE_1__language_language__["a" /* default */].grandfather;
            case 'Parent':
                return this.sex ? __WEBPACK_IMPORTED_MODULE_1__language_language__["a" /* default */].mother : __WEBPACK_IMPORTED_MODULE_1__language_language__["a" /* default */].father;
            case 'StepParent':
                return this.sex ? __WEBPACK_IMPORTED_MODULE_1__language_language__["a" /* default */].stepmother : __WEBPACK_IMPORTED_MODULE_1__language_language__["a" /* default */].stepfather;
            case 'Uncle/Aunt':
                return this.sex ? __WEBPACK_IMPORTED_MODULE_1__language_language__["a" /* default */].aunt : __WEBPACK_IMPORTED_MODULE_1__language_language__["a" /* default */].uncle;
            case 'Sibling':
                return this.sex ? __WEBPACK_IMPORTED_MODULE_1__language_language__["a" /* default */].sister : __WEBPACK_IMPORTED_MODULE_1__language_language__["a" /* default */].brother;
            case 'StepSibling':
                return this.sex ? __WEBPACK_IMPORTED_MODULE_1__language_language__["a" /* default */].stepsister : __WEBPACK_IMPORTED_MODULE_1__language_language__["a" /* default */].stepbrother;
            case 'Child':
                return this.sex ? __WEBPACK_IMPORTED_MODULE_1__language_language__["a" /* default */].daughter : __WEBPACK_IMPORTED_MODULE_1__language_language__["a" /* default */].son;
            case 'GrandChild':
                return this.sex ? __WEBPACK_IMPORTED_MODULE_1__language_language__["a" /* default */].grandDaughter : __WEBPACK_IMPORTED_MODULE_1__language_language__["a" /* default */].grandSon;
            case 'DistantRelative':
                return 'DistantRelative';
            default:
                return 'You';
        }
    }

    setData(cfg) {
        var relation;
        var relationToPlayer;
        if (null == cfg.btnText) {
            cfg.targetNode = this.targetNode;
            cfg.btnText = this.origConfig.btnText;
        }

        switch (cfg.btnText) {
            case __WEBPACK_IMPORTED_MODULE_1__language_language__["a" /* default */].you:
                relation = __WEBPACK_IMPORTED_MODULE_1__language_language__["a" /* default */].you;
                relationToPlayer = __WEBPACK_IMPORTED_MODULE_1__language_language__["a" /* default */].you;
                break;
            case __WEBPACK_IMPORTED_MODULE_1__language_language__["a" /* default */].parents:
                relation = 'Parent';
                if (cfg.targetNode == this.game.you) {
                    relationToPlayer = 'Parent';
                } else {
                    switch (cfg.targetNode.relationToPlayer) {
                        case 'Parent':
                        case 'StepParent':
                            relationToPlayer = 'GrandParent';
                            break;
                        case 'Sibling':
                        case 'StepSibling':
                            relationToPlayer = 'Uncle/Aunt';
                            break;
                        case 'Child':
                            relationToPlayer = 'Sibling';
                            break;
                        default:
                            relationToPlayer = 'DistantRelative';
                            break;
                    }
                }
                break;
            case __WEBPACK_IMPORTED_MODULE_1__language_language__["a" /* default */].brothers:
                relation = 'Sibling';
                if (cfg.targetNode == this.game.you) {
                    relationToPlayer = 'Sibling';
                } else {
                    switch (cfg.targetNode.relationToPlayer) {
                        case 'Parent':
                        case 'StepParent':
                            relationToPlayer = 'Uncle/Aunt';
                            break;
                        case 'Sibling':
                            relationToPlayer = 'Sibling';
                            break;
                        case 'StepSibling':
                            relationToPlayer = 'StepSibling';
                            break;
                        case 'Child':
                            relationToPlayer = 'Niece/Nephew';
                            break;
                        default:
                            relationToPlayer = 'DistantRelative';
                            break;
                    }
                }
                break;
            case __WEBPACK_IMPORTED_MODULE_1__language_language__["a" /* default */].stepparents:
                relation = 'StepParent';
                if (cfg.targetNode == this.game.you) {
                    relationToPlayer = 'StepParent';
                } else {
                    switch (cfg.targetNode.relationToPlayer) {
                        case 'Parent':
                        case 'StepParent':
                            relationToPlayer = 'GrandParent';
                            break;
                        case 'Sibling':
                        case 'StepSibling':
                            relationToPlayer = 'Uncle/Aunt';
                            break;
                        case 'Child':
                            relationToPlayer = 'StepSibling';
                            break;
                        default:
                            relationToPlayer = 'DistantRelative';
                            break;
                    }
                }
                break;
            case __WEBPACK_IMPORTED_MODULE_1__language_language__["a" /* default */].stepbrothers:
                relation = 'StepSibling';
                if (cfg.targetNode == this.game.you) {
                    relationToPlayer = 'StepSibling';
                } else {
                    switch (cfg.targetNode.relationToPlayer) {
                        case 'Parent':
                        case 'StepParent':
                            relationToPlayer = 'Uncle/Aunt';
                            break;
                        case 'Sibling':
                            relationToPlayer = 'StepSibling';
                        case 'StepSibling':
                            relationToPlayer = 'Sibling';
                            break;
                        case 'Uncle/Aunt':
                            relationToPlayer = 'Uncle/Aunt';
                            break;
                        case 'Child':
                            relationToPlayer = 'Niece/Nephew';
                            break;
                        default:
                            relationToPlayer = 'DistantRelative';
                            break;
                    }
                }
                break;
            case __WEBPACK_IMPORTED_MODULE_1__language_language__["a" /* default */].children:
                relation = 'Child';
                if (cfg.targetNode == this.game.you) {
                    relationToPlayer = 'Child';
                } else {
                    switch (cfg.targetNode.relationToPlayer) {
                        case 'GrandParent':
                            relationToPlayer = 'Uncle/Aunt';
                            break;
                        case 'Parent':
                            relationToPlayer = 'Sibling';
                            break;
                        case 'StepParent':
                            relationToPlayer = 'StepSibling';
                            break;
                        case 'Uncle/Aunt':
                            relationToPlayer = 'Cousin';
                            break;
                        case 'Sibling':
                        case 'StepSibling':
                            relationToPlayer = 'Niece/Nephew';
                            break;
                        case 'Child':
                            relationToPlayer = 'GrandChild';
                            break;
                        default:
                            relationToPlayer = 'DistantRelative';
                            break;
                    }
                }
                break;
            default:
                console.log('Failed to add Relative.');
                break;
        }
        if (null != cfg.targetNode) console.log('Target: ' + cfg.targetNode.relationToPlayer);
        console.log('BtnText: ' + cfg.btnText);
        console.log('Relation: ' + relation);
        console.log('RelationToPlayer: ' + relationToPlayer);
        console.log('Gender:' + cfg.sex);

        this.imageUsed = cfg.image;
        this.key = cfg.key;
        this.sex = cfg.sex;
        this.targetNode = cfg.targetNode;
        this.relation = relation;
        this.relationToPlayer = relationToPlayer;
    }

    createTextInput(x, y, text) {
        var bmd = this.game.add.bitmapData(178, 35);
        var myInput = this.game.add.sprite(x, y, bmd);
        myInput.canvasInput = new CanvasInput({
            canvas: bmd.canvas,
            fontSize: 15,
            fontWeight: 'bold',
            width: this.bg.width + 20,
            maxlength: 20,
            borderColor: '#000',
            borderWidth: 1,
            placeHolderColor: '#000',
            placeHolder: '' + text,
            padding: 10
        });
        myInput.inputEnabled = true;
        myInput.events.onInputUp.add(this.inputFocus, this);
        return myInput;
    }

    inputFocus(sprite) {
        sprite.canvasInput.focus();
    }

    activateErase() {
        this.eraseSignal.dispatch();
    }

    setImageBg(cfg) {
        this.setData(cfg);

        if (this.character) this.character.destroy();

        console.log("RelationToPlayer: " + this.relationToPlayer);
        this.nameInput.canvasInput._placeHolder = this.relationToPlayer.toUpperCase();
        this.inputFocus(this.nameInput);

        this.character = this.game.add.sprite(0, 0, this.imageUsed, this.key);
        this.character.anchor.set(0.5);
        this.addChild(this.character);

        this.sfxbtn.destroy();
        this.sfxbtn = this.game.add.audio(this.type);
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Person;


/***/ }),
/* 359 */
/*!******************************************************************!*\
  !*** ./node_modules/canvas-image-saver/dist/canvasImageSaver.js ***!
  \******************************************************************/
/*! dynamic exports provided */
/*! exports used: default */
/***/ (function(module, exports, __webpack_require__) {

/*!
 * canvasImageSaver v0.1.2
 * Copyright 2015 aaccurso <accurso.alan@gmail.com>
 * See LICENSE in this repository for license information
 */
(function(global){
'use strict';

function BrowserCanvasSaver () {
  this.anchor = document.createElement('a');
}

BrowserCanvasSaver.prototype.save = function(canvas, successCallback, errorCallback, directory, filename) {
  this.anchor.download = filename || 'canvas.png';
  this.anchor.href = canvas.toDataURL('image/png');
  this.anchor.click();
  successCallback(canvas, filename);
};

if (true) {
  module.exports = CanvasImageSaver;
} else {
  global.CanvasImageSaver = CanvasImageSaver;
}

function CanvasImageSaver (canvas, cropOptions, successCallback, errorCallback, callbackContext) {
  var noop = function () {};

  this.canvas = canvas;
  this.cropOptions = cropOptions;
  this.successCallback = successCallback || noop;
  this.errorCallback = errorCallback || noop;
  this.callbackContext = callbackContext || this;

  if (window.cordova) {
    this.saverImplementator = new CordovaCanvasSaver();
  } else {
    this.saverImplementator = new BrowserCanvasSaver();
  }
};

CanvasImageSaver.prototype = {
  save: function (filename, directory) {
    var canvas;

    if (this.cropOptions) {
      // Sets default crop options
      this.cropOptions.xCropOffset = this.cropOptions.xCropOffset || 0;
      this.cropOptions.yCropOffset = this.cropOptions.yCropOffset || 0;
      this.cropOptions.width = this.cropOptions.width || this.canvas.width - this.cropOptions.xCropOffset;
      this.cropOptions.height = this.cropOptions.height || this.canvas.height - this.cropOptions.yCropOffset;
      // Creates temporal canvas to draw cropped image
      canvas = document.createElement('canvas');
      canvas.width = this.cropOptions.width;
      canvas.height = this.cropOptions.height;
      canvas.getContext('2d').drawImage(this.canvas,
        this.cropOptions.xCropOffset, this.cropOptions.yCropOffset,
        canvas.width, canvas.height,
        0, 0,
        canvas.width, canvas.height
      );
    } else {
      canvas = this.canvas;
    }

    return this.saverImplementator.save(
      canvas,
      this.successCallback.bind(this.callbackContext),
      this.errorCallback.bind(this.callbackContext),
      filename,
      directory
    );
  }
};

function CordovaCanvasSaver () {
  if (!window.canvas2ImagePlugin) {
    throw('You are using cordova. This library requires canvas2ImagePlugin.');
  }
}

CordovaCanvasSaver.prototype.save = function(canvas, successCallback, errorCallback, filename, directory) {
  window.canvas2ImagePlugin.saveImageDataToLibrary(
    function(pathToFile) {
     successCallback(canvas, pathToFile);
    },
    function(error) {
      console.error(error);
      errorCallback(error);
    },
    canvas,
    filename,
    directory
  );
};

})(this);

/***/ }),
/* 360 */
/*!***********************************!*\
  !*** ./src/model/WebcamPlugin.js ***!
  \***********************************/
/*! dynamic exports provided */
/***/ (function(module, exports) {

/**
 * Created by Jabito on 16/03/2018.
 */
Phaser.Plugin.Webcam = function (game, parent) {

    Phaser.Plugin.call(this, game, parent);

    if (!game.device.getUserMedia) {
        return false;
    }

    navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia;

    this.context = null;
    this.stream = null;

    this.video = document.createElement('video');
    this.video.autoplay = true;

    this.onConnect = new Phaser.Signal();
    this.onError = new Phaser.Signal();
};

Phaser.Plugin.Webcam.prototype = Object.create(Phaser.Plugin.prototype);
Phaser.Plugin.Webcam.prototype.constructor = Phaser.Plugin.Webcam;

Phaser.Plugin.Webcam.prototype.start = function (width, height, context) {

    // console.log('Webcam start', width, height);

    this.context = context;

    if (!this.stream) {
        navigator.getUserMedia({ video: { mandatory: { minWidth: width, minHeight: height } } }, this.connectCallback.bind(this), this.errorCallback.bind(this));
    }
};

Phaser.Plugin.Webcam.prototype.stop = function () {

    if (this.stream) {
        this.stream.active = false;

        this.stream = null;
    }
};

Phaser.Plugin.Webcam.prototype.connectCallback = function (stream) {

    this.stream = stream;

    this.video.src = window.URL.createObjectURL(this.stream);

    this.onConnect.dispatch(this.video);
};

Phaser.Plugin.Webcam.prototype.errorCallback = function (event) {

    this.onError.dispatch(event);
};

Phaser.Plugin.Webcam.prototype.grab = function (context, x, y) {

    if (this.stream) {
        context.drawImage(this.video, x, y);
    }
};

Phaser.Plugin.Webcam.prototype.update = function () {

    if (this.stream) {
        try {
            this.context.drawImage(this.video, 0, 0);
        } catch (e) {
            if (e.name == "NS_ERROR_NOT_AVAILABLE") {
                // Just try again. This is a bug in Firefox.
                // https://bugzilla.mozilla.org/show_bug.cgi?id=879717
            } else {
                throw e;
            }
        }
    }
};

/**
 * @name Phaser.Plugin.Webcam#active
 * @property {boolean} active - Is this Webcam plugin capturing a video stream or not?
 * @readonly
 */
Object.defineProperty(Phaser.Plugin.Webcam.prototype, "active", {

    get: function () {
        return this.stream;
    }

});

/***/ }),
/* 361 */
/*!**********************************!*\
  !*** ./src/model/WebcamState.js ***!
  \**********************************/
/*! dynamic exports provided */
/***/ (function(module, exports) {

/**
 * Added by Jabito on 16/03/2018.
 */
var WebcamState = function (game) {};

WebcamState.prototype.preload = function () {
    game.load.atlasJSONHash('sprites', 'assets/gfx/atlas/sprites.png', 'assets/gfx/atlas/sprites.json');

    game.load.audio('shutter', ['assets/sfx/shutter.ogg', 'assets/sfx/shutter.mp3']);
    game.load.audio('click', ['assets/sfx/click.ogg', 'assets/sfx/click.mp3']);
    game.load.audio('ready', ['assets/sfx/ready.ogg', 'assets/sfx/ready.mp3']);
    game.load.audio('beep', ['assets/sfx/beep.ogg', 'assets/sfx/beep.mp3']);

    game.stage.smoothed = false;
};

WebcamState.prototype.create = function () {
    game.stage.backgroundColor = G.backgroundColor;

    this.shutterSound = game.add.sound('shutter', 0.8);
    this.buttonSound = game.add.sound('click');
    this.readySound = game.add.sound('ready');
    this.beepSound = game.add.sound('beep', 0.3);

    // Setup camera
    this.camBitmap = game.add.bitmapData(G.camWidth, G.camHeight, 'cam');
    this.cam = new Phaser.Plugin.Webcam(game, this);

    this.webcamAvailable = !(navigator.getUserMedia === undefined);
    if (!this.webcamAvailable) {
        document.getElementById('instructions').style.display = "none";
        document.getElementById('unsupported').style.display = "block";
        document.getElementById('cam').style.display = "none";
    } else {
        this.cam.start(this.camBitmap.width, this.camBitmap.height, this.camBitmap.context);
        this.cam.onConnect.add(this.cameraConnected, this);
        this.cam.onError.add(this.cameraError, this);
        game.add.plugin(this.cam);
    }

    // Setup working canvas
    this.pixelBitmap = game.add.bitmapData(game.width, game.height);

    // Setup final display surface
    this.surface = game.add.sprite(0, 0, this.pixelBitmap);

    // Message to turn on the camera
    this.turnOnCamera = game.add.image(0, 0, 'sprites', 'turn-on-camera.png');
    this.turnOnCamera.scale.set(2);

    // Add UI
    this.ui = game.add.group();
    game.add.image(0, game.height / 2 - 21, 'sprites', 'button-panel.png', this.ui);

    this.shutter = game.add.sprite(game.width / 4, game.height / 2 - 22, 'sprites', 'button-01.png', this.ui);
    this.shutter.anchor.set(0.5);
    this.shutter.animations.add('shine', Phaser.Animation.generateFrameNames('button-', 1, 6, '.png', 2), 15);
    this.shutter.animations.play('shine');
    this.shutter.events.onInputDown.add(this.clickShutter, this);
    this.shutter.events.onInputOver.add(function () {
        this.shutter.animations.play('shine');
    }, this);
    this.shutter.inputEnabled = true;

    this.colorButton = game.add.sprite(game.width / 2 - 39, 0, 'sprites', 'color.png', this.ui);
    this.colorButton.events.onInputDown.add(this.colorButtonClicked, this);
    this.colorButton.inputEnabled = true;

    this.grayButton = game.add.sprite(game.width / 2 - 39, 0, 'sprites', 'gray.png', this.ui);
    this.grayButton.events.onInputDown.add(this.grayButtonClicked, this);
    this.grayButton.visible = false;
    this.grayButton.inputEnabled = true;

    this.tintButton = game.add.sprite(game.width / 2 - 39, 40, 'sprites', 'tint.png', this.ui);
    this.tintButton.events.onInputDown.add(this.tintButtonClicked, this);
    this.tintButton.inputEnabled = true;

    this.sizeButton = game.add.sprite(game.width / 2 - 39, 80, 'sprites', 'size.png', this.ui);
    this.sizeButton.events.onInputDown.add(this.sizeButtonClicked, this);
    this.sizeButton.inputEnabled = true;

    this.ui.scale.set(2);
    this.ui.visible = false;

    // Add countdown
    this.countdown = game.add.sprite(game.width / 2, game.height / 2, 'sprites', 'countdown-01.png');
    this.countdown.anchor.set(0.5);
    this.countdown.animations.add('go', Phaser.Animation.generateFrameNames('countdown-', 1, 3, '.png', 2), 2);
    this.countdown.visible = false;
    this.countdown.scale.set(2);

    // Create flash
    this.flash = game.add.graphics(0, 0);
    this.flash.beginFill(0xffffff, 1);
    this.flash.drawRect(0, 0, game.width, game.height);
    this.flash.endFill();
    this.flash.alpha = 0;

    // Flags for taking picture
    this.takePicture = false;
    this.countdownPlaying = false;

    // Flags for options
    this.color = true;
    this.tintValue = 0;
    this.pixelSize = 5;

    this.pixelSizes = [20, 15, 10, 8, 5];
    this.tintChoices = [{ r: 1, g: 1, b: 1 }, // none
    { r: 1, g: 2, b: 2 }, // cyan
    { r: 1, g: 1.5, b: 2 }, // blue
    { r: 2, g: 2, b: 1 }, // yellow
    { r: 2, g: 1, b: 1 }, // red
    { r: 2, g: 1.5, b: 1 }, // orange
    { r: 1, g: 2, b: 1 }, // green
    { r: 2, g: 1, b: 2 }];
};

WebcamState.prototype.update = function () {
    if (!this.webcamAvailable) return;

    this.pixelate();

    this.countdownPlaying = this.countdown.animations.currentAnim.isPlaying;

    if (!this.countdownPlaying && this.takePicture) {
        this.shutterSound.play();

        var data = this.pixelBitmap.canvas.toDataURL();
        document.getElementById('output').style.display = "block";

        var images = ['shot-full', 'shot-120', 'shot-72', 'shot-48'];
        for (var i = 0; i < images.length; i++) {
            var img = document.getElementById(images[i]);
            img.src = data;
            var parent = img.parentNode;
            parent.href = data;
        }

        this.countdown.visible = false;
        this.takePicture = false;
        this.ui.visible = true;
        this.shutter.animations.play('shine');

        // Flash
        this.flash.alpha = 1;
        game.add.tween(this.flash).to({ alpha: 0 }, 250).start();
    }
};

WebcamState.prototype.cameraConnected = function () {
    this.turnOnCamera.visible = false;
    this.ui.visible = true;

    this.readySound.play();
};

WebcamState.prototype.cameraError = function () {
    document.getElementById('cam').style.display = "none";
    document.getElementById('notconnected').style.display = "block";
    document.getElementById('instructions').style.display = "none";
};

WebcamState.prototype.clickShutter = function () {
    this.buttonSound.play();

    if (!this.countdownPlaying) {
        this.countdown.alpha = 1;
        this.countdown.scale.set(2);
        this.countdown.visible = true;
        this.countdown.animations.play('go');

        this.beepSound.play();

        this.add.tween(this.countdown.scale).to({ x: 5, y: 5 }, 500, Phaser.Easing.Cubic.In).repeat(2).start();
        this.add.tween(this.countdown).to({ alpha: 0 }, 500, Phaser.Easing.Cubic.In).repeat(2).start();

        this.ui.visible = false;
        this.takePicture = true;
    }
};

WebcamState.prototype.colorButtonClicked = function () {
    this.buttonSound.play();

    this.color = false;
    this.colorButton.visible = false;
    this.grayButton.visible = true;
};

WebcamState.prototype.grayButtonClicked = function () {
    this.buttonSound.play();

    this.color = true;
    this.colorButton.visible = true;
    this.grayButton.visible = false;
};

WebcamState.prototype.tintButtonClicked = function () {
    this.buttonSound.play();

    if (this.tintValue == this.tintChoices.length - 1) {
        this.tintValue = 0;
    } else {
        this.tintValue++;
    }
};

WebcamState.prototype.sizeButtonClicked = function () {
    this.buttonSound.play();

    var i = this.pixelSizes.indexOf(this.pixelSize) + 1;
    if (this.pixelSizes.length > i) {
        this.pixelSize = this.pixelSizes[i];
    } else {
        this.pixelSize = this.pixelSizes[0];
    }
};

WebcamState.prototype.pixelate = function () {
    var offsetX = G.camWidth / 2 - game.width / 2;
    var offsetY = G.camHeight / 2 - game.height / 2;

    var pxContext = this.pixelBitmap.context;

    this.camBitmap.update();

    var pixel = Phaser.Color.createColor();

    for (var x = 0; x < game.width; x += this.pixelSize) {
        for (var y = 0; y < game.height; y += this.pixelSize) {
            // Sample color at x+offsetX,y+offsetY in camBitmap
            this.camBitmap.getPixel(Math.floor(x + offsetX), Math.floor(y + offsetY), pixel);

            // Modify color
            this.posterizeFilter(pixel, 16);
            if (!this.color) this.grayscaleFilter(pixel);
            var tint = this.tintChoices[this.tintValue];
            this.tintFilter(pixel, tint.r, tint.g, tint.b);

            // Draw pixel at x,y in new bitmap
            pxContext.fillStyle = "rgb(" + pixel.r + "," + pixel.g + "," + pixel.b + ")";
            pxContext.fillRect(x, y, this.pixelSize, this.pixelSize);
        }
    }

    this.camBitmap.dirty = true;
    this.pixelBitmap.dirty = true;
};

WebcamState.prototype.grayscaleFilter = function (pixel) {
    var c = Phaser.Color.RGBtoHSV(pixel.r, pixel.g, pixel.b);
    c.s = 0;
    Phaser.Color.HSVtoRGB(c.h, c.s, c.v, pixel);
};

WebcamState.prototype.tintFilter = function (pixel, r, g, b) {
    pixel.r = Math.floor(pixel.r * r);
    pixel.g = Math.floor(pixel.g * g);
    pixel.b = Math.floor(pixel.b * b);
};

WebcamState.prototype.posterizeFilter = function (pixel, colors) {
    // Posterize
    var divisor = 256 / colors;
    pixel.r = Math.floor(Math.floor(pixel.r / divisor) * divisor);
    pixel.g = Math.floor(Math.floor(pixel.g / divisor) * divisor);
    pixel.b = Math.floor(Math.floor(pixel.b / divisor) * divisor);

    // Contrast
    var thresh = 60;
    var lowThresh = 40;
    var highThresh = 220;
    var amount = 30;
    if (pixel.r > highThresh) pixel.r = 255;
    if (pixel.r > thresh) pixel.r += amount;
    if (pixel.r < thresh) pixel.r -= amount;
    if (pixel.r < lowThresh) pixel.r = 0;

    if (pixel.g > highThresh) pixel.g = 255;
    if (pixel.g > thresh) pixel.g += amount;
    if (pixel.g < thresh) pixel.g -= amount;
    if (pixel.g < lowThresh) pixel.g = 0;

    if (pixel.b > highThresh) pixel.b = 255;
    if (pixel.b > thresh) pixel.b += amount;
    if (pixel.b < thresh) pixel.b -= amount;
    if (pixel.b < lowThresh) pixel.b = 0;
};

/***/ })
],[139]);
//# sourceMappingURL=bundle.js.map