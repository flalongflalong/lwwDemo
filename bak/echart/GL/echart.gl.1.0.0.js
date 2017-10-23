(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("echarts"));
	else if(typeof define === 'function' && define.amd)
		define(["echarts"], factory);
	else if(typeof exports === 'object')
		exports["echarts-gl"] = factory(require("echarts"));
	else
		root["echarts-gl"] = factory(root["echarts"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_0__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
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
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
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
/******/ 	return __webpack_require__(__webpack_require__.s = 99);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_0__;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

/**
 * @fileoverview gl-matrix - High performance matrix and vector operations
 * @author Brandon Jones
 * @author Colin MacKenzie IV
 * @version 2.2.2
 */

/* Copyright (c) 2013, Brandon Jones, Colin MacKenzie IV. All rights reserved.

Redistribution and use in source and binary forms, with or without modification,
are permitted provided that the following conditions are met:

  * Redistributions of source code must retain the above copyright notice, this
    list of conditions and the following disclaimer.
  * Redistributions in binary form must reproduce the above copyright notice,
    this list of conditions and the following disclaimer in the documentation
    and/or other materials provided with the distribution.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND
ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR
ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
(INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON
ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
(INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE. */


(function(_global) {
  "use strict";

  var shim = {};
  if (false) {
    if(typeof define == 'function' && typeof define.amd == 'object' && define.amd) {
      shim.exports = {};
      define(function() {
        return shim.exports;
      });
    } else {
      // gl-matrix lives in a browser, define its namespaces in global
      shim.exports = typeof(window) !== 'undefined' ? window : _global;
    }
  }
  else {
    // gl-matrix lives in commonjs, define its namespaces in exports
    shim.exports = exports;
  }

  (function(exports) {
    /* Copyright (c) 2013, Brandon Jones, Colin MacKenzie IV. All rights reserved.

Redistribution and use in source and binary forms, with or without modification,
are permitted provided that the following conditions are met:

  * Redistributions of source code must retain the above copyright notice, this
    list of conditions and the following disclaimer.
  * Redistributions in binary form must reproduce the above copyright notice,
    this list of conditions and the following disclaimer in the documentation
    and/or other materials provided with the distribution.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND
ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR
ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
(INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON
ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
(INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE. */


if(!GLMAT_EPSILON) {
    var GLMAT_EPSILON = 0.000001;
}

if(!GLMAT_ARRAY_TYPE) {
    var GLMAT_ARRAY_TYPE = (typeof Float32Array !== 'undefined') ? Float32Array : Array;
}

if(!GLMAT_RANDOM) {
    var GLMAT_RANDOM = Math.random;
}

/**
 * @class Common utilities
 * @name glMatrix
 */
var glMatrix = {};

/**
 * Sets the type of array used when creating new vectors and matrices
 *
 * @param {Type} type Array type, such as Float32Array or Array
 */
glMatrix.setMatrixArrayType = function(type) {
    GLMAT_ARRAY_TYPE = type;
}

if(typeof(exports) !== 'undefined') {
    exports.glMatrix = glMatrix;
}

var degree = Math.PI / 180;

/**
* Convert Degree To Radian
*
* @param {Number} Angle in Degrees
*/
glMatrix.toRadian = function(a){
     return a * degree;
}
;
/* Copyright (c) 2013, Brandon Jones, Colin MacKenzie IV. All rights reserved.

Redistribution and use in source and binary forms, with or without modification,
are permitted provided that the following conditions are met:

  * Redistributions of source code must retain the above copyright notice, this
    list of conditions and the following disclaimer.
  * Redistributions in binary form must reproduce the above copyright notice,
    this list of conditions and the following disclaimer in the documentation
    and/or other materials provided with the distribution.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND
ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR
ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
(INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON
ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
(INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE. */

/**
 * @class 2 Dimensional Vector
 * @name vec2
 */

var vec2 = {};

/**
 * Creates a new, empty vec2
 *
 * @returns {vec2} a new 2D vector
 */
vec2.create = function() {
    var out = new GLMAT_ARRAY_TYPE(2);
    out[0] = 0;
    out[1] = 0;
    return out;
};

/**
 * Creates a new vec2 initialized with values from an existing vector
 *
 * @param {vec2} a vector to clone
 * @returns {vec2} a new 2D vector
 */
vec2.clone = function(a) {
    var out = new GLMAT_ARRAY_TYPE(2);
    out[0] = a[0];
    out[1] = a[1];
    return out;
};

/**
 * Creates a new vec2 initialized with the given values
 *
 * @param {Number} x X component
 * @param {Number} y Y component
 * @returns {vec2} a new 2D vector
 */
vec2.fromValues = function(x, y) {
    var out = new GLMAT_ARRAY_TYPE(2);
    out[0] = x;
    out[1] = y;
    return out;
};

/**
 * Copy the values from one vec2 to another
 *
 * @param {vec2} out the receiving vector
 * @param {vec2} a the source vector
 * @returns {vec2} out
 */
vec2.copy = function(out, a) {
    out[0] = a[0];
    out[1] = a[1];
    return out;
};

/**
 * Set the components of a vec2 to the given values
 *
 * @param {vec2} out the receiving vector
 * @param {Number} x X component
 * @param {Number} y Y component
 * @returns {vec2} out
 */
vec2.set = function(out, x, y) {
    out[0] = x;
    out[1] = y;
    return out;
};

/**
 * Adds two vec2's
 *
 * @param {vec2} out the receiving vector
 * @param {vec2} a the first operand
 * @param {vec2} b the second operand
 * @returns {vec2} out
 */
vec2.add = function(out, a, b) {
    out[0] = a[0] + b[0];
    out[1] = a[1] + b[1];
    return out;
};

/**
 * Subtracts vector b from vector a
 *
 * @param {vec2} out the receiving vector
 * @param {vec2} a the first operand
 * @param {vec2} b the second operand
 * @returns {vec2} out
 */
vec2.subtract = function(out, a, b) {
    out[0] = a[0] - b[0];
    out[1] = a[1] - b[1];
    return out;
};

/**
 * Alias for {@link vec2.subtract}
 * @function
 */
vec2.sub = vec2.subtract;

/**
 * Multiplies two vec2's
 *
 * @param {vec2} out the receiving vector
 * @param {vec2} a the first operand
 * @param {vec2} b the second operand
 * @returns {vec2} out
 */
vec2.multiply = function(out, a, b) {
    out[0] = a[0] * b[0];
    out[1] = a[1] * b[1];
    return out;
};

/**
 * Alias for {@link vec2.multiply}
 * @function
 */
vec2.mul = vec2.multiply;

/**
 * Divides two vec2's
 *
 * @param {vec2} out the receiving vector
 * @param {vec2} a the first operand
 * @param {vec2} b the second operand
 * @returns {vec2} out
 */
vec2.divide = function(out, a, b) {
    out[0] = a[0] / b[0];
    out[1] = a[1] / b[1];
    return out;
};

/**
 * Alias for {@link vec2.divide}
 * @function
 */
vec2.div = vec2.divide;

/**
 * Returns the minimum of two vec2's
 *
 * @param {vec2} out the receiving vector
 * @param {vec2} a the first operand
 * @param {vec2} b the second operand
 * @returns {vec2} out
 */
vec2.min = function(out, a, b) {
    out[0] = Math.min(a[0], b[0]);
    out[1] = Math.min(a[1], b[1]);
    return out;
};

/**
 * Returns the maximum of two vec2's
 *
 * @param {vec2} out the receiving vector
 * @param {vec2} a the first operand
 * @param {vec2} b the second operand
 * @returns {vec2} out
 */
vec2.max = function(out, a, b) {
    out[0] = Math.max(a[0], b[0]);
    out[1] = Math.max(a[1], b[1]);
    return out;
};

/**
 * Scales a vec2 by a scalar number
 *
 * @param {vec2} out the receiving vector
 * @param {vec2} a the vector to scale
 * @param {Number} b amount to scale the vector by
 * @returns {vec2} out
 */
vec2.scale = function(out, a, b) {
    out[0] = a[0] * b;
    out[1] = a[1] * b;
    return out;
};

/**
 * Adds two vec2's after scaling the second operand by a scalar value
 *
 * @param {vec2} out the receiving vector
 * @param {vec2} a the first operand
 * @param {vec2} b the second operand
 * @param {Number} scale the amount to scale b by before adding
 * @returns {vec2} out
 */
vec2.scaleAndAdd = function(out, a, b, scale) {
    out[0] = a[0] + (b[0] * scale);
    out[1] = a[1] + (b[1] * scale);
    return out;
};

/**
 * Calculates the euclidian distance between two vec2's
 *
 * @param {vec2} a the first operand
 * @param {vec2} b the second operand
 * @returns {Number} distance between a and b
 */
vec2.distance = function(a, b) {
    var x = b[0] - a[0],
        y = b[1] - a[1];
    return Math.sqrt(x*x + y*y);
};

/**
 * Alias for {@link vec2.distance}
 * @function
 */
vec2.dist = vec2.distance;

/**
 * Calculates the squared euclidian distance between two vec2's
 *
 * @param {vec2} a the first operand
 * @param {vec2} b the second operand
 * @returns {Number} squared distance between a and b
 */
vec2.squaredDistance = function(a, b) {
    var x = b[0] - a[0],
        y = b[1] - a[1];
    return x*x + y*y;
};

/**
 * Alias for {@link vec2.squaredDistance}
 * @function
 */
vec2.sqrDist = vec2.squaredDistance;

/**
 * Calculates the length of a vec2
 *
 * @param {vec2} a vector to calculate length of
 * @returns {Number} length of a
 */
vec2.length = function (a) {
    var x = a[0],
        y = a[1];
    return Math.sqrt(x*x + y*y);
};

/**
 * Alias for {@link vec2.length}
 * @function
 */
vec2.len = vec2.length;

/**
 * Calculates the squared length of a vec2
 *
 * @param {vec2} a vector to calculate squared length of
 * @returns {Number} squared length of a
 */
vec2.squaredLength = function (a) {
    var x = a[0],
        y = a[1];
    return x*x + y*y;
};

/**
 * Alias for {@link vec2.squaredLength}
 * @function
 */
vec2.sqrLen = vec2.squaredLength;

/**
 * Negates the components of a vec2
 *
 * @param {vec2} out the receiving vector
 * @param {vec2} a vector to negate
 * @returns {vec2} out
 */
vec2.negate = function(out, a) {
    out[0] = -a[0];
    out[1] = -a[1];
    return out;
};

/**
 * Returns the inverse of the components of a vec2
 *
 * @param {vec2} out the receiving vector
 * @param {vec2} a vector to invert
 * @returns {vec2} out
 */
vec2.inverse = function(out, a) {
  out[0] = 1.0 / a[0];
  out[1] = 1.0 / a[1];
  return out;
};

/**
 * Normalize a vec2
 *
 * @param {vec2} out the receiving vector
 * @param {vec2} a vector to normalize
 * @returns {vec2} out
 */
vec2.normalize = function(out, a) {
    var x = a[0],
        y = a[1];
    var len = x*x + y*y;
    if (len > 0) {
        //TODO: evaluate use of glm_invsqrt here?
        len = 1 / Math.sqrt(len);
        out[0] = a[0] * len;
        out[1] = a[1] * len;
    }
    return out;
};

/**
 * Calculates the dot product of two vec2's
 *
 * @param {vec2} a the first operand
 * @param {vec2} b the second operand
 * @returns {Number} dot product of a and b
 */
vec2.dot = function (a, b) {
    return a[0] * b[0] + a[1] * b[1];
};

/**
 * Computes the cross product of two vec2's
 * Note that the cross product must by definition produce a 3D vector
 *
 * @param {vec3} out the receiving vector
 * @param {vec2} a the first operand
 * @param {vec2} b the second operand
 * @returns {vec3} out
 */
vec2.cross = function(out, a, b) {
    var z = a[0] * b[1] - a[1] * b[0];
    out[0] = out[1] = 0;
    out[2] = z;
    return out;
};

/**
 * Performs a linear interpolation between two vec2's
 *
 * @param {vec2} out the receiving vector
 * @param {vec2} a the first operand
 * @param {vec2} b the second operand
 * @param {Number} t interpolation amount between the two inputs
 * @returns {vec2} out
 */
vec2.lerp = function (out, a, b, t) {
    var ax = a[0],
        ay = a[1];
    out[0] = ax + t * (b[0] - ax);
    out[1] = ay + t * (b[1] - ay);
    return out;
};

/**
 * Generates a random vector with the given scale
 *
 * @param {vec2} out the receiving vector
 * @param {Number} [scale] Length of the resulting vector. If ommitted, a unit vector will be returned
 * @returns {vec2} out
 */
vec2.random = function (out, scale) {
    scale = scale || 1.0;
    var r = GLMAT_RANDOM() * 2.0 * Math.PI;
    out[0] = Math.cos(r) * scale;
    out[1] = Math.sin(r) * scale;
    return out;
};

/**
 * Transforms the vec2 with a mat2
 *
 * @param {vec2} out the receiving vector
 * @param {vec2} a the vector to transform
 * @param {mat2} m matrix to transform with
 * @returns {vec2} out
 */
vec2.transformMat2 = function(out, a, m) {
    var x = a[0],
        y = a[1];
    out[0] = m[0] * x + m[2] * y;
    out[1] = m[1] * x + m[3] * y;
    return out;
};

/**
 * Transforms the vec2 with a mat2d
 *
 * @param {vec2} out the receiving vector
 * @param {vec2} a the vector to transform
 * @param {mat2d} m matrix to transform with
 * @returns {vec2} out
 */
vec2.transformMat2d = function(out, a, m) {
    var x = a[0],
        y = a[1];
    out[0] = m[0] * x + m[2] * y + m[4];
    out[1] = m[1] * x + m[3] * y + m[5];
    return out;
};

/**
 * Transforms the vec2 with a mat3
 * 3rd vector component is implicitly '1'
 *
 * @param {vec2} out the receiving vector
 * @param {vec2} a the vector to transform
 * @param {mat3} m matrix to transform with
 * @returns {vec2} out
 */
vec2.transformMat3 = function(out, a, m) {
    var x = a[0],
        y = a[1];
    out[0] = m[0] * x + m[3] * y + m[6];
    out[1] = m[1] * x + m[4] * y + m[7];
    return out;
};

/**
 * Transforms the vec2 with a mat4
 * 3rd vector component is implicitly '0'
 * 4th vector component is implicitly '1'
 *
 * @param {vec2} out the receiving vector
 * @param {vec2} a the vector to transform
 * @param {mat4} m matrix to transform with
 * @returns {vec2} out
 */
vec2.transformMat4 = function(out, a, m) {
    var x = a[0],
        y = a[1];
    out[0] = m[0] * x + m[4] * y + m[12];
    out[1] = m[1] * x + m[5] * y + m[13];
    return out;
};

/**
 * Perform some operation over an array of vec2s.
 *
 * @param {Array} a the array of vectors to iterate over
 * @param {Number} stride Number of elements between the start of each vec2. If 0 assumes tightly packed
 * @param {Number} offset Number of elements to skip at the beginning of the array
 * @param {Number} count Number of vec2s to iterate over. If 0 iterates over entire array
 * @param {Function} fn Function to call for each vector in the array
 * @param {Object} [arg] additional argument to pass to fn
 * @returns {Array} a
 * @function
 */
vec2.forEach = (function() {
    var vec = vec2.create();

    return function(a, stride, offset, count, fn, arg) {
        var i, l;
        if(!stride) {
            stride = 2;
        }

        if(!offset) {
            offset = 0;
        }

        if(count) {
            l = Math.min((count * stride) + offset, a.length);
        } else {
            l = a.length;
        }

        for(i = offset; i < l; i += stride) {
            vec[0] = a[i]; vec[1] = a[i+1];
            fn(vec, vec, arg);
            a[i] = vec[0]; a[i+1] = vec[1];
        }

        return a;
    };
})();

/**
 * Returns a string representation of a vector
 *
 * @param {vec2} vec vector to represent as a string
 * @returns {String} string representation of the vector
 */
vec2.str = function (a) {
    return 'vec2(' + a[0] + ', ' + a[1] + ')';
};

if(typeof(exports) !== 'undefined') {
    exports.vec2 = vec2;
}
;
/* Copyright (c) 2013, Brandon Jones, Colin MacKenzie IV. All rights reserved.

Redistribution and use in source and binary forms, with or without modification,
are permitted provided that the following conditions are met:

  * Redistributions of source code must retain the above copyright notice, this
    list of conditions and the following disclaimer.
  * Redistributions in binary form must reproduce the above copyright notice,
    this list of conditions and the following disclaimer in the documentation
    and/or other materials provided with the distribution.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND
ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR
ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
(INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON
ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
(INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE. */

/**
 * @class 3 Dimensional Vector
 * @name vec3
 */

var vec3 = {};

/**
 * Creates a new, empty vec3
 *
 * @returns {vec3} a new 3D vector
 */
vec3.create = function() {
    var out = new GLMAT_ARRAY_TYPE(3);
    out[0] = 0;
    out[1] = 0;
    out[2] = 0;
    return out;
};

/**
 * Creates a new vec3 initialized with values from an existing vector
 *
 * @param {vec3} a vector to clone
 * @returns {vec3} a new 3D vector
 */
vec3.clone = function(a) {
    var out = new GLMAT_ARRAY_TYPE(3);
    out[0] = a[0];
    out[1] = a[1];
    out[2] = a[2];
    return out;
};

/**
 * Creates a new vec3 initialized with the given values
 *
 * @param {Number} x X component
 * @param {Number} y Y component
 * @param {Number} z Z component
 * @returns {vec3} a new 3D vector
 */
vec3.fromValues = function(x, y, z) {
    var out = new GLMAT_ARRAY_TYPE(3);
    out[0] = x;
    out[1] = y;
    out[2] = z;
    return out;
};

/**
 * Copy the values from one vec3 to another
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a the source vector
 * @returns {vec3} out
 */
vec3.copy = function(out, a) {
    out[0] = a[0];
    out[1] = a[1];
    out[2] = a[2];
    return out;
};

/**
 * Set the components of a vec3 to the given values
 *
 * @param {vec3} out the receiving vector
 * @param {Number} x X component
 * @param {Number} y Y component
 * @param {Number} z Z component
 * @returns {vec3} out
 */
vec3.set = function(out, x, y, z) {
    out[0] = x;
    out[1] = y;
    out[2] = z;
    return out;
};

/**
 * Adds two vec3's
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a the first operand
 * @param {vec3} b the second operand
 * @returns {vec3} out
 */
vec3.add = function(out, a, b) {
    out[0] = a[0] + b[0];
    out[1] = a[1] + b[1];
    out[2] = a[2] + b[2];
    return out;
};

/**
 * Subtracts vector b from vector a
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a the first operand
 * @param {vec3} b the second operand
 * @returns {vec3} out
 */
vec3.subtract = function(out, a, b) {
    out[0] = a[0] - b[0];
    out[1] = a[1] - b[1];
    out[2] = a[2] - b[2];
    return out;
};

/**
 * Alias for {@link vec3.subtract}
 * @function
 */
vec3.sub = vec3.subtract;

/**
 * Multiplies two vec3's
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a the first operand
 * @param {vec3} b the second operand
 * @returns {vec3} out
 */
vec3.multiply = function(out, a, b) {
    out[0] = a[0] * b[0];
    out[1] = a[1] * b[1];
    out[2] = a[2] * b[2];
    return out;
};

/**
 * Alias for {@link vec3.multiply}
 * @function
 */
vec3.mul = vec3.multiply;

/**
 * Divides two vec3's
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a the first operand
 * @param {vec3} b the second operand
 * @returns {vec3} out
 */
vec3.divide = function(out, a, b) {
    out[0] = a[0] / b[0];
    out[1] = a[1] / b[1];
    out[2] = a[2] / b[2];
    return out;
};

/**
 * Alias for {@link vec3.divide}
 * @function
 */
vec3.div = vec3.divide;

/**
 * Returns the minimum of two vec3's
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a the first operand
 * @param {vec3} b the second operand
 * @returns {vec3} out
 */
vec3.min = function(out, a, b) {
    out[0] = Math.min(a[0], b[0]);
    out[1] = Math.min(a[1], b[1]);
    out[2] = Math.min(a[2], b[2]);
    return out;
};

/**
 * Returns the maximum of two vec3's
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a the first operand
 * @param {vec3} b the second operand
 * @returns {vec3} out
 */
vec3.max = function(out, a, b) {
    out[0] = Math.max(a[0], b[0]);
    out[1] = Math.max(a[1], b[1]);
    out[2] = Math.max(a[2], b[2]);
    return out;
};

/**
 * Scales a vec3 by a scalar number
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a the vector to scale
 * @param {Number} b amount to scale the vector by
 * @returns {vec3} out
 */
vec3.scale = function(out, a, b) {
    out[0] = a[0] * b;
    out[1] = a[1] * b;
    out[2] = a[2] * b;
    return out;
};

/**
 * Adds two vec3's after scaling the second operand by a scalar value
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a the first operand
 * @param {vec3} b the second operand
 * @param {Number} scale the amount to scale b by before adding
 * @returns {vec3} out
 */
vec3.scaleAndAdd = function(out, a, b, scale) {
    out[0] = a[0] + (b[0] * scale);
    out[1] = a[1] + (b[1] * scale);
    out[2] = a[2] + (b[2] * scale);
    return out;
};

/**
 * Calculates the euclidian distance between two vec3's
 *
 * @param {vec3} a the first operand
 * @param {vec3} b the second operand
 * @returns {Number} distance between a and b
 */
vec3.distance = function(a, b) {
    var x = b[0] - a[0],
        y = b[1] - a[1],
        z = b[2] - a[2];
    return Math.sqrt(x*x + y*y + z*z);
};

/**
 * Alias for {@link vec3.distance}
 * @function
 */
vec3.dist = vec3.distance;

/**
 * Calculates the squared euclidian distance between two vec3's
 *
 * @param {vec3} a the first operand
 * @param {vec3} b the second operand
 * @returns {Number} squared distance between a and b
 */
vec3.squaredDistance = function(a, b) {
    var x = b[0] - a[0],
        y = b[1] - a[1],
        z = b[2] - a[2];
    return x*x + y*y + z*z;
};

/**
 * Alias for {@link vec3.squaredDistance}
 * @function
 */
vec3.sqrDist = vec3.squaredDistance;

/**
 * Calculates the length of a vec3
 *
 * @param {vec3} a vector to calculate length of
 * @returns {Number} length of a
 */
vec3.length = function (a) {
    var x = a[0],
        y = a[1],
        z = a[2];
    return Math.sqrt(x*x + y*y + z*z);
};

/**
 * Alias for {@link vec3.length}
 * @function
 */
vec3.len = vec3.length;

/**
 * Calculates the squared length of a vec3
 *
 * @param {vec3} a vector to calculate squared length of
 * @returns {Number} squared length of a
 */
vec3.squaredLength = function (a) {
    var x = a[0],
        y = a[1],
        z = a[2];
    return x*x + y*y + z*z;
};

/**
 * Alias for {@link vec3.squaredLength}
 * @function
 */
vec3.sqrLen = vec3.squaredLength;

/**
 * Negates the components of a vec3
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a vector to negate
 * @returns {vec3} out
 */
vec3.negate = function(out, a) {
    out[0] = -a[0];
    out[1] = -a[1];
    out[2] = -a[2];
    return out;
};

/**
 * Returns the inverse of the components of a vec3
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a vector to invert
 * @returns {vec3} out
 */
vec3.inverse = function(out, a) {
  out[0] = 1.0 / a[0];
  out[1] = 1.0 / a[1];
  out[2] = 1.0 / a[2];
  return out;
};

/**
 * Normalize a vec3
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a vector to normalize
 * @returns {vec3} out
 */
vec3.normalize = function(out, a) {
    var x = a[0],
        y = a[1],
        z = a[2];
    var len = x*x + y*y + z*z;
    if (len > 0) {
        //TODO: evaluate use of glm_invsqrt here?
        len = 1 / Math.sqrt(len);
        out[0] = a[0] * len;
        out[1] = a[1] * len;
        out[2] = a[2] * len;
    }
    return out;
};

/**
 * Calculates the dot product of two vec3's
 *
 * @param {vec3} a the first operand
 * @param {vec3} b the second operand
 * @returns {Number} dot product of a and b
 */
vec3.dot = function (a, b) {
    return a[0] * b[0] + a[1] * b[1] + a[2] * b[2];
};

/**
 * Computes the cross product of two vec3's
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a the first operand
 * @param {vec3} b the second operand
 * @returns {vec3} out
 */
vec3.cross = function(out, a, b) {
    var ax = a[0], ay = a[1], az = a[2],
        bx = b[0], by = b[1], bz = b[2];

    out[0] = ay * bz - az * by;
    out[1] = az * bx - ax * bz;
    out[2] = ax * by - ay * bx;
    return out;
};

/**
 * Performs a linear interpolation between two vec3's
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a the first operand
 * @param {vec3} b the second operand
 * @param {Number} t interpolation amount between the two inputs
 * @returns {vec3} out
 */
vec3.lerp = function (out, a, b, t) {
    var ax = a[0],
        ay = a[1],
        az = a[2];
    out[0] = ax + t * (b[0] - ax);
    out[1] = ay + t * (b[1] - ay);
    out[2] = az + t * (b[2] - az);
    return out;
};

/**
 * Generates a random vector with the given scale
 *
 * @param {vec3} out the receiving vector
 * @param {Number} [scale] Length of the resulting vector. If ommitted, a unit vector will be returned
 * @returns {vec3} out
 */
vec3.random = function (out, scale) {
    scale = scale || 1.0;

    var r = GLMAT_RANDOM() * 2.0 * Math.PI;
    var z = (GLMAT_RANDOM() * 2.0) - 1.0;
    var zScale = Math.sqrt(1.0-z*z) * scale;

    out[0] = Math.cos(r) * zScale;
    out[1] = Math.sin(r) * zScale;
    out[2] = z * scale;
    return out;
};

/**
 * Transforms the vec3 with a mat4.
 * 4th vector component is implicitly '1'
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a the vector to transform
 * @param {mat4} m matrix to transform with
 * @returns {vec3} out
 */
vec3.transformMat4 = function(out, a, m) {
    var x = a[0], y = a[1], z = a[2],
        w = m[3] * x + m[7] * y + m[11] * z + m[15];
    w = w || 1.0;
    out[0] = (m[0] * x + m[4] * y + m[8] * z + m[12]) / w;
    out[1] = (m[1] * x + m[5] * y + m[9] * z + m[13]) / w;
    out[2] = (m[2] * x + m[6] * y + m[10] * z + m[14]) / w;
    return out;
};

/**
 * Transforms the vec3 with a mat3.
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a the vector to transform
 * @param {mat4} m the 3x3 matrix to transform with
 * @returns {vec3} out
 */
vec3.transformMat3 = function(out, a, m) {
    var x = a[0], y = a[1], z = a[2];
    out[0] = x * m[0] + y * m[3] + z * m[6];
    out[1] = x * m[1] + y * m[4] + z * m[7];
    out[2] = x * m[2] + y * m[5] + z * m[8];
    return out;
};

/**
 * Transforms the vec3 with a quat
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a the vector to transform
 * @param {quat} q quaternion to transform with
 * @returns {vec3} out
 */
vec3.transformQuat = function(out, a, q) {
    // benchmarks: http://jsperf.com/quaternion-transform-vec3-implementations

    var x = a[0], y = a[1], z = a[2],
        qx = q[0], qy = q[1], qz = q[2], qw = q[3],

        // calculate quat * vec
        ix = qw * x + qy * z - qz * y,
        iy = qw * y + qz * x - qx * z,
        iz = qw * z + qx * y - qy * x,
        iw = -qx * x - qy * y - qz * z;

    // calculate result * inverse quat
    out[0] = ix * qw + iw * -qx + iy * -qz - iz * -qy;
    out[1] = iy * qw + iw * -qy + iz * -qx - ix * -qz;
    out[2] = iz * qw + iw * -qz + ix * -qy - iy * -qx;
    return out;
};

/**
 * Rotate a 3D vector around the x-axis
 * @param {vec3} out The receiving vec3
 * @param {vec3} a The vec3 point to rotate
 * @param {vec3} b The origin of the rotation
 * @param {Number} c The angle of rotation
 * @returns {vec3} out
 */
vec3.rotateX = function(out, a, b, c){
   var p = [], r=[];
      //Translate point to the origin
      p[0] = a[0] - b[0];
      p[1] = a[1] - b[1];
    p[2] = a[2] - b[2];

      //perform rotation
      r[0] = p[0];
      r[1] = p[1]*Math.cos(c) - p[2]*Math.sin(c);
      r[2] = p[1]*Math.sin(c) + p[2]*Math.cos(c);

      //translate to correct position
      out[0] = r[0] + b[0];
      out[1] = r[1] + b[1];
      out[2] = r[2] + b[2];

    return out;
};

/**
 * Rotate a 3D vector around the y-axis
 * @param {vec3} out The receiving vec3
 * @param {vec3} a The vec3 point to rotate
 * @param {vec3} b The origin of the rotation
 * @param {Number} c The angle of rotation
 * @returns {vec3} out
 */
vec3.rotateY = function(out, a, b, c){
    var p = [], r=[];
    //Translate point to the origin
    p[0] = a[0] - b[0];
    p[1] = a[1] - b[1];
    p[2] = a[2] - b[2];

    //perform rotation
    r[0] = p[2]*Math.sin(c) + p[0]*Math.cos(c);
    r[1] = p[1];
    r[2] = p[2]*Math.cos(c) - p[0]*Math.sin(c);

    //translate to correct position
    out[0] = r[0] + b[0];
    out[1] = r[1] + b[1];
    out[2] = r[2] + b[2];

    return out;
};

/**
 * Rotate a 3D vector around the z-axis
 * @param {vec3} out The receiving vec3
 * @param {vec3} a The vec3 point to rotate
 * @param {vec3} b The origin of the rotation
 * @param {Number} c The angle of rotation
 * @returns {vec3} out
 */
vec3.rotateZ = function(out, a, b, c){
    var p = [], r=[];
    //Translate point to the origin
    p[0] = a[0] - b[0];
    p[1] = a[1] - b[1];
    p[2] = a[2] - b[2];

    //perform rotation
    r[0] = p[0]*Math.cos(c) - p[1]*Math.sin(c);
    r[1] = p[0]*Math.sin(c) + p[1]*Math.cos(c);
    r[2] = p[2];

    //translate to correct position
    out[0] = r[0] + b[0];
    out[1] = r[1] + b[1];
    out[2] = r[2] + b[2];

    return out;
};

/**
 * Perform some operation over an array of vec3s.
 *
 * @param {Array} a the array of vectors to iterate over
 * @param {Number} stride Number of elements between the start of each vec3. If 0 assumes tightly packed
 * @param {Number} offset Number of elements to skip at the beginning of the array
 * @param {Number} count Number of vec3s to iterate over. If 0 iterates over entire array
 * @param {Function} fn Function to call for each vector in the array
 * @param {Object} [arg] additional argument to pass to fn
 * @returns {Array} a
 * @function
 */
vec3.forEach = (function() {
    var vec = vec3.create();

    return function(a, stride, offset, count, fn, arg) {
        var i, l;
        if(!stride) {
            stride = 3;
        }

        if(!offset) {
            offset = 0;
        }

        if(count) {
            l = Math.min((count * stride) + offset, a.length);
        } else {
            l = a.length;
        }

        for(i = offset; i < l; i += stride) {
            vec[0] = a[i]; vec[1] = a[i+1]; vec[2] = a[i+2];
            fn(vec, vec, arg);
            a[i] = vec[0]; a[i+1] = vec[1]; a[i+2] = vec[2];
        }

        return a;
    };
})();

/**
 * Get the angle between two 3D vectors
 * @param {vec3} a The first operand
 * @param {vec3} b The second operand
 * @returns {Number} The angle in radians
 */
vec3.angle = function(a, b) {

    var tempA = vec3.fromValues(a[0], a[1], a[2]);
    var tempB = vec3.fromValues(b[0], b[1], b[2]);

    vec3.normalize(tempA, tempA);
    vec3.normalize(tempB, tempB);

    var cosine = vec3.dot(tempA, tempB);

    if(cosine > 1.0){
        return 0;
    } else {
        return Math.acos(cosine);
    }
};

/**
 * Returns a string representation of a vector
 *
 * @param {vec3} vec vector to represent as a string
 * @returns {String} string representation of the vector
 */
vec3.str = function (a) {
    return 'vec3(' + a[0] + ', ' + a[1] + ', ' + a[2] + ')';
};

if(typeof(exports) !== 'undefined') {
    exports.vec3 = vec3;
}
;
/* Copyright (c) 2013, Brandon Jones, Colin MacKenzie IV. All rights reserved.

Redistribution and use in source and binary forms, with or without modification,
are permitted provided that the following conditions are met:

  * Redistributions of source code must retain the above copyright notice, this
    list of conditions and the following disclaimer.
  * Redistributions in binary form must reproduce the above copyright notice,
    this list of conditions and the following disclaimer in the documentation
    and/or other materials provided with the distribution.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND
ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR
ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
(INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON
ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
(INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE. */

/**
 * @class 4 Dimensional Vector
 * @name vec4
 */

var vec4 = {};

/**
 * Creates a new, empty vec4
 *
 * @returns {vec4} a new 4D vector
 */
vec4.create = function() {
    var out = new GLMAT_ARRAY_TYPE(4);
    out[0] = 0;
    out[1] = 0;
    out[2] = 0;
    out[3] = 0;
    return out;
};

/**
 * Creates a new vec4 initialized with values from an existing vector
 *
 * @param {vec4} a vector to clone
 * @returns {vec4} a new 4D vector
 */
vec4.clone = function(a) {
    var out = new GLMAT_ARRAY_TYPE(4);
    out[0] = a[0];
    out[1] = a[1];
    out[2] = a[2];
    out[3] = a[3];
    return out;
};

/**
 * Creates a new vec4 initialized with the given values
 *
 * @param {Number} x X component
 * @param {Number} y Y component
 * @param {Number} z Z component
 * @param {Number} w W component
 * @returns {vec4} a new 4D vector
 */
vec4.fromValues = function(x, y, z, w) {
    var out = new GLMAT_ARRAY_TYPE(4);
    out[0] = x;
    out[1] = y;
    out[2] = z;
    out[3] = w;
    return out;
};

/**
 * Copy the values from one vec4 to another
 *
 * @param {vec4} out the receiving vector
 * @param {vec4} a the source vector
 * @returns {vec4} out
 */
vec4.copy = function(out, a) {
    out[0] = a[0];
    out[1] = a[1];
    out[2] = a[2];
    out[3] = a[3];
    return out;
};

/**
 * Set the components of a vec4 to the given values
 *
 * @param {vec4} out the receiving vector
 * @param {Number} x X component
 * @param {Number} y Y component
 * @param {Number} z Z component
 * @param {Number} w W component
 * @returns {vec4} out
 */
vec4.set = function(out, x, y, z, w) {
    out[0] = x;
    out[1] = y;
    out[2] = z;
    out[3] = w;
    return out;
};

/**
 * Adds two vec4's
 *
 * @param {vec4} out the receiving vector
 * @param {vec4} a the first operand
 * @param {vec4} b the second operand
 * @returns {vec4} out
 */
vec4.add = function(out, a, b) {
    out[0] = a[0] + b[0];
    out[1] = a[1] + b[1];
    out[2] = a[2] + b[2];
    out[3] = a[3] + b[3];
    return out;
};

/**
 * Subtracts vector b from vector a
 *
 * @param {vec4} out the receiving vector
 * @param {vec4} a the first operand
 * @param {vec4} b the second operand
 * @returns {vec4} out
 */
vec4.subtract = function(out, a, b) {
    out[0] = a[0] - b[0];
    out[1] = a[1] - b[1];
    out[2] = a[2] - b[2];
    out[3] = a[3] - b[3];
    return out;
};

/**
 * Alias for {@link vec4.subtract}
 * @function
 */
vec4.sub = vec4.subtract;

/**
 * Multiplies two vec4's
 *
 * @param {vec4} out the receiving vector
 * @param {vec4} a the first operand
 * @param {vec4} b the second operand
 * @returns {vec4} out
 */
vec4.multiply = function(out, a, b) {
    out[0] = a[0] * b[0];
    out[1] = a[1] * b[1];
    out[2] = a[2] * b[2];
    out[3] = a[3] * b[3];
    return out;
};

/**
 * Alias for {@link vec4.multiply}
 * @function
 */
vec4.mul = vec4.multiply;

/**
 * Divides two vec4's
 *
 * @param {vec4} out the receiving vector
 * @param {vec4} a the first operand
 * @param {vec4} b the second operand
 * @returns {vec4} out
 */
vec4.divide = function(out, a, b) {
    out[0] = a[0] / b[0];
    out[1] = a[1] / b[1];
    out[2] = a[2] / b[2];
    out[3] = a[3] / b[3];
    return out;
};

/**
 * Alias for {@link vec4.divide}
 * @function
 */
vec4.div = vec4.divide;

/**
 * Returns the minimum of two vec4's
 *
 * @param {vec4} out the receiving vector
 * @param {vec4} a the first operand
 * @param {vec4} b the second operand
 * @returns {vec4} out
 */
vec4.min = function(out, a, b) {
    out[0] = Math.min(a[0], b[0]);
    out[1] = Math.min(a[1], b[1]);
    out[2] = Math.min(a[2], b[2]);
    out[3] = Math.min(a[3], b[3]);
    return out;
};

/**
 * Returns the maximum of two vec4's
 *
 * @param {vec4} out the receiving vector
 * @param {vec4} a the first operand
 * @param {vec4} b the second operand
 * @returns {vec4} out
 */
vec4.max = function(out, a, b) {
    out[0] = Math.max(a[0], b[0]);
    out[1] = Math.max(a[1], b[1]);
    out[2] = Math.max(a[2], b[2]);
    out[3] = Math.max(a[3], b[3]);
    return out;
};

/**
 * Scales a vec4 by a scalar number
 *
 * @param {vec4} out the receiving vector
 * @param {vec4} a the vector to scale
 * @param {Number} b amount to scale the vector by
 * @returns {vec4} out
 */
vec4.scale = function(out, a, b) {
    out[0] = a[0] * b;
    out[1] = a[1] * b;
    out[2] = a[2] * b;
    out[3] = a[3] * b;
    return out;
};

/**
 * Adds two vec4's after scaling the second operand by a scalar value
 *
 * @param {vec4} out the receiving vector
 * @param {vec4} a the first operand
 * @param {vec4} b the second operand
 * @param {Number} scale the amount to scale b by before adding
 * @returns {vec4} out
 */
vec4.scaleAndAdd = function(out, a, b, scale) {
    out[0] = a[0] + (b[0] * scale);
    out[1] = a[1] + (b[1] * scale);
    out[2] = a[2] + (b[2] * scale);
    out[3] = a[3] + (b[3] * scale);
    return out;
};

/**
 * Calculates the euclidian distance between two vec4's
 *
 * @param {vec4} a the first operand
 * @param {vec4} b the second operand
 * @returns {Number} distance between a and b
 */
vec4.distance = function(a, b) {
    var x = b[0] - a[0],
        y = b[1] - a[1],
        z = b[2] - a[2],
        w = b[3] - a[3];
    return Math.sqrt(x*x + y*y + z*z + w*w);
};

/**
 * Alias for {@link vec4.distance}
 * @function
 */
vec4.dist = vec4.distance;

/**
 * Calculates the squared euclidian distance between two vec4's
 *
 * @param {vec4} a the first operand
 * @param {vec4} b the second operand
 * @returns {Number} squared distance between a and b
 */
vec4.squaredDistance = function(a, b) {
    var x = b[0] - a[0],
        y = b[1] - a[1],
        z = b[2] - a[2],
        w = b[3] - a[3];
    return x*x + y*y + z*z + w*w;
};

/**
 * Alias for {@link vec4.squaredDistance}
 * @function
 */
vec4.sqrDist = vec4.squaredDistance;

/**
 * Calculates the length of a vec4
 *
 * @param {vec4} a vector to calculate length of
 * @returns {Number} length of a
 */
vec4.length = function (a) {
    var x = a[0],
        y = a[1],
        z = a[2],
        w = a[3];
    return Math.sqrt(x*x + y*y + z*z + w*w);
};

/**
 * Alias for {@link vec4.length}
 * @function
 */
vec4.len = vec4.length;

/**
 * Calculates the squared length of a vec4
 *
 * @param {vec4} a vector to calculate squared length of
 * @returns {Number} squared length of a
 */
vec4.squaredLength = function (a) {
    var x = a[0],
        y = a[1],
        z = a[2],
        w = a[3];
    return x*x + y*y + z*z + w*w;
};

/**
 * Alias for {@link vec4.squaredLength}
 * @function
 */
vec4.sqrLen = vec4.squaredLength;

/**
 * Negates the components of a vec4
 *
 * @param {vec4} out the receiving vector
 * @param {vec4} a vector to negate
 * @returns {vec4} out
 */
vec4.negate = function(out, a) {
    out[0] = -a[0];
    out[1] = -a[1];
    out[2] = -a[2];
    out[3] = -a[3];
    return out;
};

/**
 * Returns the inverse of the components of a vec4
 *
 * @param {vec4} out the receiving vector
 * @param {vec4} a vector to invert
 * @returns {vec4} out
 */
vec4.inverse = function(out, a) {
  out[0] = 1.0 / a[0];
  out[1] = 1.0 / a[1];
  out[2] = 1.0 / a[2];
  out[3] = 1.0 / a[3];
  return out;
};

/**
 * Normalize a vec4
 *
 * @param {vec4} out the receiving vector
 * @param {vec4} a vector to normalize
 * @returns {vec4} out
 */
vec4.normalize = function(out, a) {
    var x = a[0],
        y = a[1],
        z = a[2],
        w = a[3];
    var len = x*x + y*y + z*z + w*w;
    if (len > 0) {
        len = 1 / Math.sqrt(len);
        out[0] = a[0] * len;
        out[1] = a[1] * len;
        out[2] = a[2] * len;
        out[3] = a[3] * len;
    }
    return out;
};

/**
 * Calculates the dot product of two vec4's
 *
 * @param {vec4} a the first operand
 * @param {vec4} b the second operand
 * @returns {Number} dot product of a and b
 */
vec4.dot = function (a, b) {
    return a[0] * b[0] + a[1] * b[1] + a[2] * b[2] + a[3] * b[3];
};

/**
 * Performs a linear interpolation between two vec4's
 *
 * @param {vec4} out the receiving vector
 * @param {vec4} a the first operand
 * @param {vec4} b the second operand
 * @param {Number} t interpolation amount between the two inputs
 * @returns {vec4} out
 */
vec4.lerp = function (out, a, b, t) {
    var ax = a[0],
        ay = a[1],
        az = a[2],
        aw = a[3];
    out[0] = ax + t * (b[0] - ax);
    out[1] = ay + t * (b[1] - ay);
    out[2] = az + t * (b[2] - az);
    out[3] = aw + t * (b[3] - aw);
    return out;
};

/**
 * Generates a random vector with the given scale
 *
 * @param {vec4} out the receiving vector
 * @param {Number} [scale] Length of the resulting vector. If ommitted, a unit vector will be returned
 * @returns {vec4} out
 */
vec4.random = function (out, scale) {
    scale = scale || 1.0;

    //TODO: This is a pretty awful way of doing this. Find something better.
    out[0] = GLMAT_RANDOM();
    out[1] = GLMAT_RANDOM();
    out[2] = GLMAT_RANDOM();
    out[3] = GLMAT_RANDOM();
    vec4.normalize(out, out);
    vec4.scale(out, out, scale);
    return out;
};

/**
 * Transforms the vec4 with a mat4.
 *
 * @param {vec4} out the receiving vector
 * @param {vec4} a the vector to transform
 * @param {mat4} m matrix to transform with
 * @returns {vec4} out
 */
vec4.transformMat4 = function(out, a, m) {
    var x = a[0], y = a[1], z = a[2], w = a[3];
    out[0] = m[0] * x + m[4] * y + m[8] * z + m[12] * w;
    out[1] = m[1] * x + m[5] * y + m[9] * z + m[13] * w;
    out[2] = m[2] * x + m[6] * y + m[10] * z + m[14] * w;
    out[3] = m[3] * x + m[7] * y + m[11] * z + m[15] * w;
    return out;
};

/**
 * Transforms the vec4 with a quat
 *
 * @param {vec4} out the receiving vector
 * @param {vec4} a the vector to transform
 * @param {quat} q quaternion to transform with
 * @returns {vec4} out
 */
vec4.transformQuat = function(out, a, q) {
    var x = a[0], y = a[1], z = a[2],
        qx = q[0], qy = q[1], qz = q[2], qw = q[3],

        // calculate quat * vec
        ix = qw * x + qy * z - qz * y,
        iy = qw * y + qz * x - qx * z,
        iz = qw * z + qx * y - qy * x,
        iw = -qx * x - qy * y - qz * z;

    // calculate result * inverse quat
    out[0] = ix * qw + iw * -qx + iy * -qz - iz * -qy;
    out[1] = iy * qw + iw * -qy + iz * -qx - ix * -qz;
    out[2] = iz * qw + iw * -qz + ix * -qy - iy * -qx;
    return out;
};

/**
 * Perform some operation over an array of vec4s.
 *
 * @param {Array} a the array of vectors to iterate over
 * @param {Number} stride Number of elements between the start of each vec4. If 0 assumes tightly packed
 * @param {Number} offset Number of elements to skip at the beginning of the array
 * @param {Number} count Number of vec4s to iterate over. If 0 iterates over entire array
 * @param {Function} fn Function to call for each vector in the array
 * @param {Object} [arg] additional argument to pass to fn
 * @returns {Array} a
 * @function
 */
vec4.forEach = (function() {
    var vec = vec4.create();

    return function(a, stride, offset, count, fn, arg) {
        var i, l;
        if(!stride) {
            stride = 4;
        }

        if(!offset) {
            offset = 0;
        }

        if(count) {
            l = Math.min((count * stride) + offset, a.length);
        } else {
            l = a.length;
        }

        for(i = offset; i < l; i += stride) {
            vec[0] = a[i]; vec[1] = a[i+1]; vec[2] = a[i+2]; vec[3] = a[i+3];
            fn(vec, vec, arg);
            a[i] = vec[0]; a[i+1] = vec[1]; a[i+2] = vec[2]; a[i+3] = vec[3];
        }

        return a;
    };
})();

/**
 * Returns a string representation of a vector
 *
 * @param {vec4} vec vector to represent as a string
 * @returns {String} string representation of the vector
 */
vec4.str = function (a) {
    return 'vec4(' + a[0] + ', ' + a[1] + ', ' + a[2] + ', ' + a[3] + ')';
};

if(typeof(exports) !== 'undefined') {
    exports.vec4 = vec4;
}
;
/* Copyright (c) 2013, Brandon Jones, Colin MacKenzie IV. All rights reserved.

Redistribution and use in source and binary forms, with or without modification,
are permitted provided that the following conditions are met:

  * Redistributions of source code must retain the above copyright notice, this
    list of conditions and the following disclaimer.
  * Redistributions in binary form must reproduce the above copyright notice,
    this list of conditions and the following disclaimer in the documentation
    and/or other materials provided with the distribution.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND
ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR
ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
(INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON
ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
(INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE. */

/**
 * @class 2x2 Matrix
 * @name mat2
 */

var mat2 = {};

/**
 * Creates a new identity mat2
 *
 * @returns {mat2} a new 2x2 matrix
 */
mat2.create = function() {
    var out = new GLMAT_ARRAY_TYPE(4);
    out[0] = 1;
    out[1] = 0;
    out[2] = 0;
    out[3] = 1;
    return out;
};

/**
 * Creates a new mat2 initialized with values from an existing matrix
 *
 * @param {mat2} a matrix to clone
 * @returns {mat2} a new 2x2 matrix
 */
mat2.clone = function(a) {
    var out = new GLMAT_ARRAY_TYPE(4);
    out[0] = a[0];
    out[1] = a[1];
    out[2] = a[2];
    out[3] = a[3];
    return out;
};

/**
 * Copy the values from one mat2 to another
 *
 * @param {mat2} out the receiving matrix
 * @param {mat2} a the source matrix
 * @returns {mat2} out
 */
mat2.copy = function(out, a) {
    out[0] = a[0];
    out[1] = a[1];
    out[2] = a[2];
    out[3] = a[3];
    return out;
};

/**
 * Set a mat2 to the identity matrix
 *
 * @param {mat2} out the receiving matrix
 * @returns {mat2} out
 */
mat2.identity = function(out) {
    out[0] = 1;
    out[1] = 0;
    out[2] = 0;
    out[3] = 1;
    return out;
};

/**
 * Transpose the values of a mat2
 *
 * @param {mat2} out the receiving matrix
 * @param {mat2} a the source matrix
 * @returns {mat2} out
 */
mat2.transpose = function(out, a) {
    // If we are transposing ourselves we can skip a few steps but have to cache some values
    if (out === a) {
        var a1 = a[1];
        out[1] = a[2];
        out[2] = a1;
    } else {
        out[0] = a[0];
        out[1] = a[2];
        out[2] = a[1];
        out[3] = a[3];
    }

    return out;
};

/**
 * Inverts a mat2
 *
 * @param {mat2} out the receiving matrix
 * @param {mat2} a the source matrix
 * @returns {mat2} out
 */
mat2.invert = function(out, a) {
    var a0 = a[0], a1 = a[1], a2 = a[2], a3 = a[3],

        // Calculate the determinant
        det = a0 * a3 - a2 * a1;

    if (!det) {
        return null;
    }
    det = 1.0 / det;

    out[0] =  a3 * det;
    out[1] = -a1 * det;
    out[2] = -a2 * det;
    out[3] =  a0 * det;

    return out;
};

/**
 * Calculates the adjugate of a mat2
 *
 * @param {mat2} out the receiving matrix
 * @param {mat2} a the source matrix
 * @returns {mat2} out
 */
mat2.adjoint = function(out, a) {
    // Caching this value is nessecary if out == a
    var a0 = a[0];
    out[0] =  a[3];
    out[1] = -a[1];
    out[2] = -a[2];
    out[3] =  a0;

    return out;
};

/**
 * Calculates the determinant of a mat2
 *
 * @param {mat2} a the source matrix
 * @returns {Number} determinant of a
 */
mat2.determinant = function (a) {
    return a[0] * a[3] - a[2] * a[1];
};

/**
 * Multiplies two mat2's
 *
 * @param {mat2} out the receiving matrix
 * @param {mat2} a the first operand
 * @param {mat2} b the second operand
 * @returns {mat2} out
 */
mat2.multiply = function (out, a, b) {
    var a0 = a[0], a1 = a[1], a2 = a[2], a3 = a[3];
    var b0 = b[0], b1 = b[1], b2 = b[2], b3 = b[3];
    out[0] = a0 * b0 + a2 * b1;
    out[1] = a1 * b0 + a3 * b1;
    out[2] = a0 * b2 + a2 * b3;
    out[3] = a1 * b2 + a3 * b3;
    return out;
};

/**
 * Alias for {@link mat2.multiply}
 * @function
 */
mat2.mul = mat2.multiply;

/**
 * Rotates a mat2 by the given angle
 *
 * @param {mat2} out the receiving matrix
 * @param {mat2} a the matrix to rotate
 * @param {Number} rad the angle to rotate the matrix by
 * @returns {mat2} out
 */
mat2.rotate = function (out, a, rad) {
    var a0 = a[0], a1 = a[1], a2 = a[2], a3 = a[3],
        s = Math.sin(rad),
        c = Math.cos(rad);
    out[0] = a0 *  c + a2 * s;
    out[1] = a1 *  c + a3 * s;
    out[2] = a0 * -s + a2 * c;
    out[3] = a1 * -s + a3 * c;
    return out;
};

/**
 * Scales the mat2 by the dimensions in the given vec2
 *
 * @param {mat2} out the receiving matrix
 * @param {mat2} a the matrix to rotate
 * @param {vec2} v the vec2 to scale the matrix by
 * @returns {mat2} out
 **/
mat2.scale = function(out, a, v) {
    var a0 = a[0], a1 = a[1], a2 = a[2], a3 = a[3],
        v0 = v[0], v1 = v[1];
    out[0] = a0 * v0;
    out[1] = a1 * v0;
    out[2] = a2 * v1;
    out[3] = a3 * v1;
    return out;
};

/**
 * Returns a string representation of a mat2
 *
 * @param {mat2} mat matrix to represent as a string
 * @returns {String} string representation of the matrix
 */
mat2.str = function (a) {
    return 'mat2(' + a[0] + ', ' + a[1] + ', ' + a[2] + ', ' + a[3] + ')';
};

/**
 * Returns Frobenius norm of a mat2
 *
 * @param {mat2} a the matrix to calculate Frobenius norm of
 * @returns {Number} Frobenius norm
 */
mat2.frob = function (a) {
    return(Math.sqrt(Math.pow(a[0], 2) + Math.pow(a[1], 2) + Math.pow(a[2], 2) + Math.pow(a[3], 2)))
};

/**
 * Returns L, D and U matrices (Lower triangular, Diagonal and Upper triangular) by factorizing the input matrix
 * @param {mat2} L the lower triangular matrix
 * @param {mat2} D the diagonal matrix
 * @param {mat2} U the upper triangular matrix
 * @param {mat2} a the input matrix to factorize
 */

mat2.LDU = function (L, D, U, a) {
    L[2] = a[2]/a[0];
    U[0] = a[0];
    U[1] = a[1];
    U[3] = a[3] - L[2] * U[1];
    return [L, D, U];
};

if(typeof(exports) !== 'undefined') {
    exports.mat2 = mat2;
}
;
/* Copyright (c) 2013, Brandon Jones, Colin MacKenzie IV. All rights reserved.

Redistribution and use in source and binary forms, with or without modification,
are permitted provided that the following conditions are met:

  * Redistributions of source code must retain the above copyright notice, this
    list of conditions and the following disclaimer.
  * Redistributions in binary form must reproduce the above copyright notice,
    this list of conditions and the following disclaimer in the documentation
    and/or other materials provided with the distribution.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND
ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR
ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
(INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON
ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
(INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE. */

/**
 * @class 2x3 Matrix
 * @name mat2d
 *
 * @description
 * A mat2d contains six elements defined as:
 * <pre>
 * [a, c, tx,
 *  b, d, ty]
 * </pre>
 * This is a short form for the 3x3 matrix:
 * <pre>
 * [a, c, tx,
 *  b, d, ty,
 *  0, 0, 1]
 * </pre>
 * The last row is ignored so the array is shorter and operations are faster.
 */

var mat2d = {};

/**
 * Creates a new identity mat2d
 *
 * @returns {mat2d} a new 2x3 matrix
 */
mat2d.create = function() {
    var out = new GLMAT_ARRAY_TYPE(6);
    out[0] = 1;
    out[1] = 0;
    out[2] = 0;
    out[3] = 1;
    out[4] = 0;
    out[5] = 0;
    return out;
};

/**
 * Creates a new mat2d initialized with values from an existing matrix
 *
 * @param {mat2d} a matrix to clone
 * @returns {mat2d} a new 2x3 matrix
 */
mat2d.clone = function(a) {
    var out = new GLMAT_ARRAY_TYPE(6);
    out[0] = a[0];
    out[1] = a[1];
    out[2] = a[2];
    out[3] = a[3];
    out[4] = a[4];
    out[5] = a[5];
    return out;
};

/**
 * Copy the values from one mat2d to another
 *
 * @param {mat2d} out the receiving matrix
 * @param {mat2d} a the source matrix
 * @returns {mat2d} out
 */
mat2d.copy = function(out, a) {
    out[0] = a[0];
    out[1] = a[1];
    out[2] = a[2];
    out[3] = a[3];
    out[4] = a[4];
    out[5] = a[5];
    return out;
};

/**
 * Set a mat2d to the identity matrix
 *
 * @param {mat2d} out the receiving matrix
 * @returns {mat2d} out
 */
mat2d.identity = function(out) {
    out[0] = 1;
    out[1] = 0;
    out[2] = 0;
    out[3] = 1;
    out[4] = 0;
    out[5] = 0;
    return out;
};

/**
 * Inverts a mat2d
 *
 * @param {mat2d} out the receiving matrix
 * @param {mat2d} a the source matrix
 * @returns {mat2d} out
 */
mat2d.invert = function(out, a) {
    var aa = a[0], ab = a[1], ac = a[2], ad = a[3],
        atx = a[4], aty = a[5];

    var det = aa * ad - ab * ac;
    if(!det){
        return null;
    }
    det = 1.0 / det;

    out[0] = ad * det;
    out[1] = -ab * det;
    out[2] = -ac * det;
    out[3] = aa * det;
    out[4] = (ac * aty - ad * atx) * det;
    out[5] = (ab * atx - aa * aty) * det;
    return out;
};

/**
 * Calculates the determinant of a mat2d
 *
 * @param {mat2d} a the source matrix
 * @returns {Number} determinant of a
 */
mat2d.determinant = function (a) {
    return a[0] * a[3] - a[1] * a[2];
};

/**
 * Multiplies two mat2d's
 *
 * @param {mat2d} out the receiving matrix
 * @param {mat2d} a the first operand
 * @param {mat2d} b the second operand
 * @returns {mat2d} out
 */
mat2d.multiply = function (out, a, b) {
    var a0 = a[0], a1 = a[1], a2 = a[2], a3 = a[3], a4 = a[4], a5 = a[5],
        b0 = b[0], b1 = b[1], b2 = b[2], b3 = b[3], b4 = b[4], b5 = b[5];
    out[0] = a0 * b0 + a2 * b1;
    out[1] = a1 * b0 + a3 * b1;
    out[2] = a0 * b2 + a2 * b3;
    out[3] = a1 * b2 + a3 * b3;
    out[4] = a0 * b4 + a2 * b5 + a4;
    out[5] = a1 * b4 + a3 * b5 + a5;
    return out;
};

/**
 * Alias for {@link mat2d.multiply}
 * @function
 */
mat2d.mul = mat2d.multiply;


/**
 * Rotates a mat2d by the given angle
 *
 * @param {mat2d} out the receiving matrix
 * @param {mat2d} a the matrix to rotate
 * @param {Number} rad the angle to rotate the matrix by
 * @returns {mat2d} out
 */
mat2d.rotate = function (out, a, rad) {
    var a0 = a[0], a1 = a[1], a2 = a[2], a3 = a[3], a4 = a[4], a5 = a[5],
        s = Math.sin(rad),
        c = Math.cos(rad);
    out[0] = a0 *  c + a2 * s;
    out[1] = a1 *  c + a3 * s;
    out[2] = a0 * -s + a2 * c;
    out[3] = a1 * -s + a3 * c;
    out[4] = a4;
    out[5] = a5;
    return out;
};

/**
 * Scales the mat2d by the dimensions in the given vec2
 *
 * @param {mat2d} out the receiving matrix
 * @param {mat2d} a the matrix to translate
 * @param {vec2} v the vec2 to scale the matrix by
 * @returns {mat2d} out
 **/
mat2d.scale = function(out, a, v) {
    var a0 = a[0], a1 = a[1], a2 = a[2], a3 = a[3], a4 = a[4], a5 = a[5],
        v0 = v[0], v1 = v[1];
    out[0] = a0 * v0;
    out[1] = a1 * v0;
    out[2] = a2 * v1;
    out[3] = a3 * v1;
    out[4] = a4;
    out[5] = a5;
    return out;
};

/**
 * Translates the mat2d by the dimensions in the given vec2
 *
 * @param {mat2d} out the receiving matrix
 * @param {mat2d} a the matrix to translate
 * @param {vec2} v the vec2 to translate the matrix by
 * @returns {mat2d} out
 **/
mat2d.translate = function(out, a, v) {
    var a0 = a[0], a1 = a[1], a2 = a[2], a3 = a[3], a4 = a[4], a5 = a[5],
        v0 = v[0], v1 = v[1];
    out[0] = a0;
    out[1] = a1;
    out[2] = a2;
    out[3] = a3;
    out[4] = a0 * v0 + a2 * v1 + a4;
    out[5] = a1 * v0 + a3 * v1 + a5;
    return out;
};

/**
 * Returns a string representation of a mat2d
 *
 * @param {mat2d} a matrix to represent as a string
 * @returns {String} string representation of the matrix
 */
mat2d.str = function (a) {
    return 'mat2d(' + a[0] + ', ' + a[1] + ', ' + a[2] + ', ' +
                    a[3] + ', ' + a[4] + ', ' + a[5] + ')';
};

/**
 * Returns Frobenius norm of a mat2d
 *
 * @param {mat2d} a the matrix to calculate Frobenius norm of
 * @returns {Number} Frobenius norm
 */
mat2d.frob = function (a) {
    return(Math.sqrt(Math.pow(a[0], 2) + Math.pow(a[1], 2) + Math.pow(a[2], 2) + Math.pow(a[3], 2) + Math.pow(a[4], 2) + Math.pow(a[5], 2) + 1))
};

if(typeof(exports) !== 'undefined') {
    exports.mat2d = mat2d;
}
;
/* Copyright (c) 2013, Brandon Jones, Colin MacKenzie IV. All rights reserved.

Redistribution and use in source and binary forms, with or without modification,
are permitted provided that the following conditions are met:

  * Redistributions of source code must retain the above copyright notice, this
    list of conditions and the following disclaimer.
  * Redistributions in binary form must reproduce the above copyright notice,
    this list of conditions and the following disclaimer in the documentation
    and/or other materials provided with the distribution.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND
ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR
ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
(INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON
ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
(INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE. */

/**
 * @class 3x3 Matrix
 * @name mat3
 */

var mat3 = {};

/**
 * Creates a new identity mat3
 *
 * @returns {mat3} a new 3x3 matrix
 */
mat3.create = function() {
    var out = new GLMAT_ARRAY_TYPE(9);
    out[0] = 1;
    out[1] = 0;
    out[2] = 0;
    out[3] = 0;
    out[4] = 1;
    out[5] = 0;
    out[6] = 0;
    out[7] = 0;
    out[8] = 1;
    return out;
};

/**
 * Copies the upper-left 3x3 values into the given mat3.
 *
 * @param {mat3} out the receiving 3x3 matrix
 * @param {mat4} a   the source 4x4 matrix
 * @returns {mat3} out
 */
mat3.fromMat4 = function(out, a) {
    out[0] = a[0];
    out[1] = a[1];
    out[2] = a[2];
    out[3] = a[4];
    out[4] = a[5];
    out[5] = a[6];
    out[6] = a[8];
    out[7] = a[9];
    out[8] = a[10];
    return out;
};

/**
 * Creates a new mat3 initialized with values from an existing matrix
 *
 * @param {mat3} a matrix to clone
 * @returns {mat3} a new 3x3 matrix
 */
mat3.clone = function(a) {
    var out = new GLMAT_ARRAY_TYPE(9);
    out[0] = a[0];
    out[1] = a[1];
    out[2] = a[2];
    out[3] = a[3];
    out[4] = a[4];
    out[5] = a[5];
    out[6] = a[6];
    out[7] = a[7];
    out[8] = a[8];
    return out;
};

/**
 * Copy the values from one mat3 to another
 *
 * @param {mat3} out the receiving matrix
 * @param {mat3} a the source matrix
 * @returns {mat3} out
 */
mat3.copy = function(out, a) {
    out[0] = a[0];
    out[1] = a[1];
    out[2] = a[2];
    out[3] = a[3];
    out[4] = a[4];
    out[5] = a[5];
    out[6] = a[6];
    out[7] = a[7];
    out[8] = a[8];
    return out;
};

/**
 * Set a mat3 to the identity matrix
 *
 * @param {mat3} out the receiving matrix
 * @returns {mat3} out
 */
mat3.identity = function(out) {
    out[0] = 1;
    out[1] = 0;
    out[2] = 0;
    out[3] = 0;
    out[4] = 1;
    out[5] = 0;
    out[6] = 0;
    out[7] = 0;
    out[8] = 1;
    return out;
};

/**
 * Transpose the values of a mat3
 *
 * @param {mat3} out the receiving matrix
 * @param {mat3} a the source matrix
 * @returns {mat3} out
 */
mat3.transpose = function(out, a) {
    // If we are transposing ourselves we can skip a few steps but have to cache some values
    if (out === a) {
        var a01 = a[1], a02 = a[2], a12 = a[5];
        out[1] = a[3];
        out[2] = a[6];
        out[3] = a01;
        out[5] = a[7];
        out[6] = a02;
        out[7] = a12;
    } else {
        out[0] = a[0];
        out[1] = a[3];
        out[2] = a[6];
        out[3] = a[1];
        out[4] = a[4];
        out[5] = a[7];
        out[6] = a[2];
        out[7] = a[5];
        out[8] = a[8];
    }

    return out;
};

/**
 * Inverts a mat3
 *
 * @param {mat3} out the receiving matrix
 * @param {mat3} a the source matrix
 * @returns {mat3} out
 */
mat3.invert = function(out, a) {
    var a00 = a[0], a01 = a[1], a02 = a[2],
        a10 = a[3], a11 = a[4], a12 = a[5],
        a20 = a[6], a21 = a[7], a22 = a[8],

        b01 = a22 * a11 - a12 * a21,
        b11 = -a22 * a10 + a12 * a20,
        b21 = a21 * a10 - a11 * a20,

        // Calculate the determinant
        det = a00 * b01 + a01 * b11 + a02 * b21;

    if (!det) {
        return null;
    }
    det = 1.0 / det;

    out[0] = b01 * det;
    out[1] = (-a22 * a01 + a02 * a21) * det;
    out[2] = (a12 * a01 - a02 * a11) * det;
    out[3] = b11 * det;
    out[4] = (a22 * a00 - a02 * a20) * det;
    out[5] = (-a12 * a00 + a02 * a10) * det;
    out[6] = b21 * det;
    out[7] = (-a21 * a00 + a01 * a20) * det;
    out[8] = (a11 * a00 - a01 * a10) * det;
    return out;
};

/**
 * Calculates the adjugate of a mat3
 *
 * @param {mat3} out the receiving matrix
 * @param {mat3} a the source matrix
 * @returns {mat3} out
 */
mat3.adjoint = function(out, a) {
    var a00 = a[0], a01 = a[1], a02 = a[2],
        a10 = a[3], a11 = a[4], a12 = a[5],
        a20 = a[6], a21 = a[7], a22 = a[8];

    out[0] = (a11 * a22 - a12 * a21);
    out[1] = (a02 * a21 - a01 * a22);
    out[2] = (a01 * a12 - a02 * a11);
    out[3] = (a12 * a20 - a10 * a22);
    out[4] = (a00 * a22 - a02 * a20);
    out[5] = (a02 * a10 - a00 * a12);
    out[6] = (a10 * a21 - a11 * a20);
    out[7] = (a01 * a20 - a00 * a21);
    out[8] = (a00 * a11 - a01 * a10);
    return out;
};

/**
 * Calculates the determinant of a mat3
 *
 * @param {mat3} a the source matrix
 * @returns {Number} determinant of a
 */
mat3.determinant = function (a) {
    var a00 = a[0], a01 = a[1], a02 = a[2],
        a10 = a[3], a11 = a[4], a12 = a[5],
        a20 = a[6], a21 = a[7], a22 = a[8];

    return a00 * (a22 * a11 - a12 * a21) + a01 * (-a22 * a10 + a12 * a20) + a02 * (a21 * a10 - a11 * a20);
};

/**
 * Multiplies two mat3's
 *
 * @param {mat3} out the receiving matrix
 * @param {mat3} a the first operand
 * @param {mat3} b the second operand
 * @returns {mat3} out
 */
mat3.multiply = function (out, a, b) {
    var a00 = a[0], a01 = a[1], a02 = a[2],
        a10 = a[3], a11 = a[4], a12 = a[5],
        a20 = a[6], a21 = a[7], a22 = a[8],

        b00 = b[0], b01 = b[1], b02 = b[2],
        b10 = b[3], b11 = b[4], b12 = b[5],
        b20 = b[6], b21 = b[7], b22 = b[8];

    out[0] = b00 * a00 + b01 * a10 + b02 * a20;
    out[1] = b00 * a01 + b01 * a11 + b02 * a21;
    out[2] = b00 * a02 + b01 * a12 + b02 * a22;

    out[3] = b10 * a00 + b11 * a10 + b12 * a20;
    out[4] = b10 * a01 + b11 * a11 + b12 * a21;
    out[5] = b10 * a02 + b11 * a12 + b12 * a22;

    out[6] = b20 * a00 + b21 * a10 + b22 * a20;
    out[7] = b20 * a01 + b21 * a11 + b22 * a21;
    out[8] = b20 * a02 + b21 * a12 + b22 * a22;
    return out;
};

/**
 * Alias for {@link mat3.multiply}
 * @function
 */
mat3.mul = mat3.multiply;

/**
 * Translate a mat3 by the given vector
 *
 * @param {mat3} out the receiving matrix
 * @param {mat3} a the matrix to translate
 * @param {vec2} v vector to translate by
 * @returns {mat3} out
 */
mat3.translate = function(out, a, v) {
    var a00 = a[0], a01 = a[1], a02 = a[2],
        a10 = a[3], a11 = a[4], a12 = a[5],
        a20 = a[6], a21 = a[7], a22 = a[8],
        x = v[0], y = v[1];

    out[0] = a00;
    out[1] = a01;
    out[2] = a02;

    out[3] = a10;
    out[4] = a11;
    out[5] = a12;

    out[6] = x * a00 + y * a10 + a20;
    out[7] = x * a01 + y * a11 + a21;
    out[8] = x * a02 + y * a12 + a22;
    return out;
};

/**
 * Rotates a mat3 by the given angle
 *
 * @param {mat3} out the receiving matrix
 * @param {mat3} a the matrix to rotate
 * @param {Number} rad the angle to rotate the matrix by
 * @returns {mat3} out
 */
mat3.rotate = function (out, a, rad) {
    var a00 = a[0], a01 = a[1], a02 = a[2],
        a10 = a[3], a11 = a[4], a12 = a[5],
        a20 = a[6], a21 = a[7], a22 = a[8],

        s = Math.sin(rad),
        c = Math.cos(rad);

    out[0] = c * a00 + s * a10;
    out[1] = c * a01 + s * a11;
    out[2] = c * a02 + s * a12;

    out[3] = c * a10 - s * a00;
    out[4] = c * a11 - s * a01;
    out[5] = c * a12 - s * a02;

    out[6] = a20;
    out[7] = a21;
    out[8] = a22;
    return out;
};

/**
 * Scales the mat3 by the dimensions in the given vec2
 *
 * @param {mat3} out the receiving matrix
 * @param {mat3} a the matrix to rotate
 * @param {vec2} v the vec2 to scale the matrix by
 * @returns {mat3} out
 **/
mat3.scale = function(out, a, v) {
    var x = v[0], y = v[1];

    out[0] = x * a[0];
    out[1] = x * a[1];
    out[2] = x * a[2];

    out[3] = y * a[3];
    out[4] = y * a[4];
    out[5] = y * a[5];

    out[6] = a[6];
    out[7] = a[7];
    out[8] = a[8];
    return out;
};

/**
 * Copies the values from a mat2d into a mat3
 *
 * @param {mat3} out the receiving matrix
 * @param {mat2d} a the matrix to copy
 * @returns {mat3} out
 **/
mat3.fromMat2d = function(out, a) {
    out[0] = a[0];
    out[1] = a[1];
    out[2] = 0;

    out[3] = a[2];
    out[4] = a[3];
    out[5] = 0;

    out[6] = a[4];
    out[7] = a[5];
    out[8] = 1;
    return out;
};

/**
* Calculates a 3x3 matrix from the given quaternion
*
* @param {mat3} out mat3 receiving operation result
* @param {quat} q Quaternion to create matrix from
*
* @returns {mat3} out
*/
mat3.fromQuat = function (out, q) {
    var x = q[0], y = q[1], z = q[2], w = q[3],
        x2 = x + x,
        y2 = y + y,
        z2 = z + z,

        xx = x * x2,
        yx = y * x2,
        yy = y * y2,
        zx = z * x2,
        zy = z * y2,
        zz = z * z2,
        wx = w * x2,
        wy = w * y2,
        wz = w * z2;

    out[0] = 1 - yy - zz;
    out[3] = yx - wz;
    out[6] = zx + wy;

    out[1] = yx + wz;
    out[4] = 1 - xx - zz;
    out[7] = zy - wx;

    out[2] = zx - wy;
    out[5] = zy + wx;
    out[8] = 1 - xx - yy;

    return out;
};

/**
* Calculates a 3x3 normal matrix (transpose inverse) from the 4x4 matrix
*
* @param {mat3} out mat3 receiving operation result
* @param {mat4} a Mat4 to derive the normal matrix from
*
* @returns {mat3} out
*/
mat3.normalFromMat4 = function (out, a) {
    var a00 = a[0], a01 = a[1], a02 = a[2], a03 = a[3],
        a10 = a[4], a11 = a[5], a12 = a[6], a13 = a[7],
        a20 = a[8], a21 = a[9], a22 = a[10], a23 = a[11],
        a30 = a[12], a31 = a[13], a32 = a[14], a33 = a[15],

        b00 = a00 * a11 - a01 * a10,
        b01 = a00 * a12 - a02 * a10,
        b02 = a00 * a13 - a03 * a10,
        b03 = a01 * a12 - a02 * a11,
        b04 = a01 * a13 - a03 * a11,
        b05 = a02 * a13 - a03 * a12,
        b06 = a20 * a31 - a21 * a30,
        b07 = a20 * a32 - a22 * a30,
        b08 = a20 * a33 - a23 * a30,
        b09 = a21 * a32 - a22 * a31,
        b10 = a21 * a33 - a23 * a31,
        b11 = a22 * a33 - a23 * a32,

        // Calculate the determinant
        det = b00 * b11 - b01 * b10 + b02 * b09 + b03 * b08 - b04 * b07 + b05 * b06;

    if (!det) {
        return null;
    }
    det = 1.0 / det;

    out[0] = (a11 * b11 - a12 * b10 + a13 * b09) * det;
    out[1] = (a12 * b08 - a10 * b11 - a13 * b07) * det;
    out[2] = (a10 * b10 - a11 * b08 + a13 * b06) * det;

    out[3] = (a02 * b10 - a01 * b11 - a03 * b09) * det;
    out[4] = (a00 * b11 - a02 * b08 + a03 * b07) * det;
    out[5] = (a01 * b08 - a00 * b10 - a03 * b06) * det;

    out[6] = (a31 * b05 - a32 * b04 + a33 * b03) * det;
    out[7] = (a32 * b02 - a30 * b05 - a33 * b01) * det;
    out[8] = (a30 * b04 - a31 * b02 + a33 * b00) * det;

    return out;
};

/**
 * Returns a string representation of a mat3
 *
 * @param {mat3} mat matrix to represent as a string
 * @returns {String} string representation of the matrix
 */
mat3.str = function (a) {
    return 'mat3(' + a[0] + ', ' + a[1] + ', ' + a[2] + ', ' +
                    a[3] + ', ' + a[4] + ', ' + a[5] + ', ' +
                    a[6] + ', ' + a[7] + ', ' + a[8] + ')';
};

/**
 * Returns Frobenius norm of a mat3
 *
 * @param {mat3} a the matrix to calculate Frobenius norm of
 * @returns {Number} Frobenius norm
 */
mat3.frob = function (a) {
    return(Math.sqrt(Math.pow(a[0], 2) + Math.pow(a[1], 2) + Math.pow(a[2], 2) + Math.pow(a[3], 2) + Math.pow(a[4], 2) + Math.pow(a[5], 2) + Math.pow(a[6], 2) + Math.pow(a[7], 2) + Math.pow(a[8], 2)))
};


if(typeof(exports) !== 'undefined') {
    exports.mat3 = mat3;
}
;
/* Copyright (c) 2013, Brandon Jones, Colin MacKenzie IV. All rights reserved.

Redistribution and use in source and binary forms, with or without modification,
are permitted provided that the following conditions are met:

  * Redistributions of source code must retain the above copyright notice, this
    list of conditions and the following disclaimer.
  * Redistributions in binary form must reproduce the above copyright notice,
    this list of conditions and the following disclaimer in the documentation
    and/or other materials provided with the distribution.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND
ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR
ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
(INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON
ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
(INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE. */

/**
 * @class 4x4 Matrix
 * @name mat4
 */

var mat4 = {};

/**
 * Creates a new identity mat4
 *
 * @returns {mat4} a new 4x4 matrix
 */
mat4.create = function() {
    var out = new GLMAT_ARRAY_TYPE(16);
    out[0] = 1;
    out[1] = 0;
    out[2] = 0;
    out[3] = 0;
    out[4] = 0;
    out[5] = 1;
    out[6] = 0;
    out[7] = 0;
    out[8] = 0;
    out[9] = 0;
    out[10] = 1;
    out[11] = 0;
    out[12] = 0;
    out[13] = 0;
    out[14] = 0;
    out[15] = 1;
    return out;
};

/**
 * Creates a new mat4 initialized with values from an existing matrix
 *
 * @param {mat4} a matrix to clone
 * @returns {mat4} a new 4x4 matrix
 */
mat4.clone = function(a) {
    var out = new GLMAT_ARRAY_TYPE(16);
    out[0] = a[0];
    out[1] = a[1];
    out[2] = a[2];
    out[3] = a[3];
    out[4] = a[4];
    out[5] = a[5];
    out[6] = a[6];
    out[7] = a[7];
    out[8] = a[8];
    out[9] = a[9];
    out[10] = a[10];
    out[11] = a[11];
    out[12] = a[12];
    out[13] = a[13];
    out[14] = a[14];
    out[15] = a[15];
    return out;
};

/**
 * Copy the values from one mat4 to another
 *
 * @param {mat4} out the receiving matrix
 * @param {mat4} a the source matrix
 * @returns {mat4} out
 */
mat4.copy = function(out, a) {
    out[0] = a[0];
    out[1] = a[1];
    out[2] = a[2];
    out[3] = a[3];
    out[4] = a[4];
    out[5] = a[5];
    out[6] = a[6];
    out[7] = a[7];
    out[8] = a[8];
    out[9] = a[9];
    out[10] = a[10];
    out[11] = a[11];
    out[12] = a[12];
    out[13] = a[13];
    out[14] = a[14];
    out[15] = a[15];
    return out;
};

/**
 * Set a mat4 to the identity matrix
 *
 * @param {mat4} out the receiving matrix
 * @returns {mat4} out
 */
mat4.identity = function(out) {
    out[0] = 1;
    out[1] = 0;
    out[2] = 0;
    out[3] = 0;
    out[4] = 0;
    out[5] = 1;
    out[6] = 0;
    out[7] = 0;
    out[8] = 0;
    out[9] = 0;
    out[10] = 1;
    out[11] = 0;
    out[12] = 0;
    out[13] = 0;
    out[14] = 0;
    out[15] = 1;
    return out;
};

/**
 * Transpose the values of a mat4
 *
 * @param {mat4} out the receiving matrix
 * @param {mat4} a the source matrix
 * @returns {mat4} out
 */
mat4.transpose = function(out, a) {
    // If we are transposing ourselves we can skip a few steps but have to cache some values
    if (out === a) {
        var a01 = a[1], a02 = a[2], a03 = a[3],
            a12 = a[6], a13 = a[7],
            a23 = a[11];

        out[1] = a[4];
        out[2] = a[8];
        out[3] = a[12];
        out[4] = a01;
        out[6] = a[9];
        out[7] = a[13];
        out[8] = a02;
        out[9] = a12;
        out[11] = a[14];
        out[12] = a03;
        out[13] = a13;
        out[14] = a23;
    } else {
        out[0] = a[0];
        out[1] = a[4];
        out[2] = a[8];
        out[3] = a[12];
        out[4] = a[1];
        out[5] = a[5];
        out[6] = a[9];
        out[7] = a[13];
        out[8] = a[2];
        out[9] = a[6];
        out[10] = a[10];
        out[11] = a[14];
        out[12] = a[3];
        out[13] = a[7];
        out[14] = a[11];
        out[15] = a[15];
    }

    return out;
};

/**
 * Inverts a mat4
 *
 * @param {mat4} out the receiving matrix
 * @param {mat4} a the source matrix
 * @returns {mat4} out
 */
mat4.invert = function(out, a) {
    var a00 = a[0], a01 = a[1], a02 = a[2], a03 = a[3],
        a10 = a[4], a11 = a[5], a12 = a[6], a13 = a[7],
        a20 = a[8], a21 = a[9], a22 = a[10], a23 = a[11],
        a30 = a[12], a31 = a[13], a32 = a[14], a33 = a[15],

        b00 = a00 * a11 - a01 * a10,
        b01 = a00 * a12 - a02 * a10,
        b02 = a00 * a13 - a03 * a10,
        b03 = a01 * a12 - a02 * a11,
        b04 = a01 * a13 - a03 * a11,
        b05 = a02 * a13 - a03 * a12,
        b06 = a20 * a31 - a21 * a30,
        b07 = a20 * a32 - a22 * a30,
        b08 = a20 * a33 - a23 * a30,
        b09 = a21 * a32 - a22 * a31,
        b10 = a21 * a33 - a23 * a31,
        b11 = a22 * a33 - a23 * a32,

        // Calculate the determinant
        det = b00 * b11 - b01 * b10 + b02 * b09 + b03 * b08 - b04 * b07 + b05 * b06;

    if (!det) {
        return null;
    }
    det = 1.0 / det;

    out[0] = (a11 * b11 - a12 * b10 + a13 * b09) * det;
    out[1] = (a02 * b10 - a01 * b11 - a03 * b09) * det;
    out[2] = (a31 * b05 - a32 * b04 + a33 * b03) * det;
    out[3] = (a22 * b04 - a21 * b05 - a23 * b03) * det;
    out[4] = (a12 * b08 - a10 * b11 - a13 * b07) * det;
    out[5] = (a00 * b11 - a02 * b08 + a03 * b07) * det;
    out[6] = (a32 * b02 - a30 * b05 - a33 * b01) * det;
    out[7] = (a20 * b05 - a22 * b02 + a23 * b01) * det;
    out[8] = (a10 * b10 - a11 * b08 + a13 * b06) * det;
    out[9] = (a01 * b08 - a00 * b10 - a03 * b06) * det;
    out[10] = (a30 * b04 - a31 * b02 + a33 * b00) * det;
    out[11] = (a21 * b02 - a20 * b04 - a23 * b00) * det;
    out[12] = (a11 * b07 - a10 * b09 - a12 * b06) * det;
    out[13] = (a00 * b09 - a01 * b07 + a02 * b06) * det;
    out[14] = (a31 * b01 - a30 * b03 - a32 * b00) * det;
    out[15] = (a20 * b03 - a21 * b01 + a22 * b00) * det;

    return out;
};

/**
 * Calculates the adjugate of a mat4
 *
 * @param {mat4} out the receiving matrix
 * @param {mat4} a the source matrix
 * @returns {mat4} out
 */
mat4.adjoint = function(out, a) {
    var a00 = a[0], a01 = a[1], a02 = a[2], a03 = a[3],
        a10 = a[4], a11 = a[5], a12 = a[6], a13 = a[7],
        a20 = a[8], a21 = a[9], a22 = a[10], a23 = a[11],
        a30 = a[12], a31 = a[13], a32 = a[14], a33 = a[15];

    out[0]  =  (a11 * (a22 * a33 - a23 * a32) - a21 * (a12 * a33 - a13 * a32) + a31 * (a12 * a23 - a13 * a22));
    out[1]  = -(a01 * (a22 * a33 - a23 * a32) - a21 * (a02 * a33 - a03 * a32) + a31 * (a02 * a23 - a03 * a22));
    out[2]  =  (a01 * (a12 * a33 - a13 * a32) - a11 * (a02 * a33 - a03 * a32) + a31 * (a02 * a13 - a03 * a12));
    out[3]  = -(a01 * (a12 * a23 - a13 * a22) - a11 * (a02 * a23 - a03 * a22) + a21 * (a02 * a13 - a03 * a12));
    out[4]  = -(a10 * (a22 * a33 - a23 * a32) - a20 * (a12 * a33 - a13 * a32) + a30 * (a12 * a23 - a13 * a22));
    out[5]  =  (a00 * (a22 * a33 - a23 * a32) - a20 * (a02 * a33 - a03 * a32) + a30 * (a02 * a23 - a03 * a22));
    out[6]  = -(a00 * (a12 * a33 - a13 * a32) - a10 * (a02 * a33 - a03 * a32) + a30 * (a02 * a13 - a03 * a12));
    out[7]  =  (a00 * (a12 * a23 - a13 * a22) - a10 * (a02 * a23 - a03 * a22) + a20 * (a02 * a13 - a03 * a12));
    out[8]  =  (a10 * (a21 * a33 - a23 * a31) - a20 * (a11 * a33 - a13 * a31) + a30 * (a11 * a23 - a13 * a21));
    out[9]  = -(a00 * (a21 * a33 - a23 * a31) - a20 * (a01 * a33 - a03 * a31) + a30 * (a01 * a23 - a03 * a21));
    out[10] =  (a00 * (a11 * a33 - a13 * a31) - a10 * (a01 * a33 - a03 * a31) + a30 * (a01 * a13 - a03 * a11));
    out[11] = -(a00 * (a11 * a23 - a13 * a21) - a10 * (a01 * a23 - a03 * a21) + a20 * (a01 * a13 - a03 * a11));
    out[12] = -(a10 * (a21 * a32 - a22 * a31) - a20 * (a11 * a32 - a12 * a31) + a30 * (a11 * a22 - a12 * a21));
    out[13] =  (a00 * (a21 * a32 - a22 * a31) - a20 * (a01 * a32 - a02 * a31) + a30 * (a01 * a22 - a02 * a21));
    out[14] = -(a00 * (a11 * a32 - a12 * a31) - a10 * (a01 * a32 - a02 * a31) + a30 * (a01 * a12 - a02 * a11));
    out[15] =  (a00 * (a11 * a22 - a12 * a21) - a10 * (a01 * a22 - a02 * a21) + a20 * (a01 * a12 - a02 * a11));
    return out;
};

/**
 * Calculates the determinant of a mat4
 *
 * @param {mat4} a the source matrix
 * @returns {Number} determinant of a
 */
mat4.determinant = function (a) {
    var a00 = a[0], a01 = a[1], a02 = a[2], a03 = a[3],
        a10 = a[4], a11 = a[5], a12 = a[6], a13 = a[7],
        a20 = a[8], a21 = a[9], a22 = a[10], a23 = a[11],
        a30 = a[12], a31 = a[13], a32 = a[14], a33 = a[15],

        b00 = a00 * a11 - a01 * a10,
        b01 = a00 * a12 - a02 * a10,
        b02 = a00 * a13 - a03 * a10,
        b03 = a01 * a12 - a02 * a11,
        b04 = a01 * a13 - a03 * a11,
        b05 = a02 * a13 - a03 * a12,
        b06 = a20 * a31 - a21 * a30,
        b07 = a20 * a32 - a22 * a30,
        b08 = a20 * a33 - a23 * a30,
        b09 = a21 * a32 - a22 * a31,
        b10 = a21 * a33 - a23 * a31,
        b11 = a22 * a33 - a23 * a32;

    // Calculate the determinant
    return b00 * b11 - b01 * b10 + b02 * b09 + b03 * b08 - b04 * b07 + b05 * b06;
};

/**
 * Multiplies two mat4's
 *
 * @param {mat4} out the receiving matrix
 * @param {mat4} a the first operand
 * @param {mat4} b the second operand
 * @returns {mat4} out
 */
mat4.multiply = function (out, a, b) {
    var a00 = a[0], a01 = a[1], a02 = a[2], a03 = a[3],
        a10 = a[4], a11 = a[5], a12 = a[6], a13 = a[7],
        a20 = a[8], a21 = a[9], a22 = a[10], a23 = a[11],
        a30 = a[12], a31 = a[13], a32 = a[14], a33 = a[15];

    // Cache only the current line of the second matrix
    var b0  = b[0], b1 = b[1], b2 = b[2], b3 = b[3];
    out[0] = b0*a00 + b1*a10 + b2*a20 + b3*a30;
    out[1] = b0*a01 + b1*a11 + b2*a21 + b3*a31;
    out[2] = b0*a02 + b1*a12 + b2*a22 + b3*a32;
    out[3] = b0*a03 + b1*a13 + b2*a23 + b3*a33;

    b0 = b[4]; b1 = b[5]; b2 = b[6]; b3 = b[7];
    out[4] = b0*a00 + b1*a10 + b2*a20 + b3*a30;
    out[5] = b0*a01 + b1*a11 + b2*a21 + b3*a31;
    out[6] = b0*a02 + b1*a12 + b2*a22 + b3*a32;
    out[7] = b0*a03 + b1*a13 + b2*a23 + b3*a33;

    b0 = b[8]; b1 = b[9]; b2 = b[10]; b3 = b[11];
    out[8] = b0*a00 + b1*a10 + b2*a20 + b3*a30;
    out[9] = b0*a01 + b1*a11 + b2*a21 + b3*a31;
    out[10] = b0*a02 + b1*a12 + b2*a22 + b3*a32;
    out[11] = b0*a03 + b1*a13 + b2*a23 + b3*a33;

    b0 = b[12]; b1 = b[13]; b2 = b[14]; b3 = b[15];
    out[12] = b0*a00 + b1*a10 + b2*a20 + b3*a30;
    out[13] = b0*a01 + b1*a11 + b2*a21 + b3*a31;
    out[14] = b0*a02 + b1*a12 + b2*a22 + b3*a32;
    out[15] = b0*a03 + b1*a13 + b2*a23 + b3*a33;
    return out;
};

/**
 * Multiplies two affine mat4's
 * Add by https://github.com/pissang
 * @param {mat4} out the receiving matrix
 * @param {mat4} a the first operand
 * @param {mat4} b the second operand
 * @returns {mat4} out
 */
mat4.multiplyAffine = function (out, a, b) {
    var a00 = a[0], a01 = a[1], a02 = a[2],
        a10 = a[4], a11 = a[5], a12 = a[6],
        a20 = a[8], a21 = a[9], a22 = a[10],
        a30 = a[12], a31 = a[13], a32 = a[14];

    // Cache only the current line of the second matrix
    var b0  = b[0], b1 = b[1], b2 = b[2];
    out[0] = b0*a00 + b1*a10 + b2*a20;
    out[1] = b0*a01 + b1*a11 + b2*a21;
    out[2] = b0*a02 + b1*a12 + b2*a22;
    // out[3] = 0;

    b0 = b[4]; b1 = b[5]; b2 = b[6];
    out[4] = b0*a00 + b1*a10 + b2*a20;
    out[5] = b0*a01 + b1*a11 + b2*a21;
    out[6] = b0*a02 + b1*a12 + b2*a22;
    // out[7] = 0;

    b0 = b[8]; b1 = b[9]; b2 = b[10];
    out[8] = b0*a00 + b1*a10 + b2*a20;
    out[9] = b0*a01 + b1*a11 + b2*a21;
    out[10] = b0*a02 + b1*a12 + b2*a22;
    // out[11] = 0;

    b0 = b[12]; b1 = b[13]; b2 = b[14];
    out[12] = b0*a00 + b1*a10 + b2*a20 + a30;
    out[13] = b0*a01 + b1*a11 + b2*a21 + a31;
    out[14] = b0*a02 + b1*a12 + b2*a22 + a32;
    // out[15] = 1;
    return out;
};

/**
 * Alias for {@link mat4.multiply}
 * @function
 */
mat4.mul = mat4.multiply;

/**
 * Alias for {@link mat4.multiplyAffine}
 * @function
 */
mat4.mulAffine = mat4.multiplyAffine;
/**
 * Translate a mat4 by the given vector
 *
 * @param {mat4} out the receiving matrix
 * @param {mat4} a the matrix to translate
 * @param {vec3} v vector to translate by
 * @returns {mat4} out
 */
mat4.translate = function (out, a, v) {
    var x = v[0], y = v[1], z = v[2],
        a00, a01, a02, a03,
        a10, a11, a12, a13,
        a20, a21, a22, a23;

    if (a === out) {
        out[12] = a[0] * x + a[4] * y + a[8] * z + a[12];
        out[13] = a[1] * x + a[5] * y + a[9] * z + a[13];
        out[14] = a[2] * x + a[6] * y + a[10] * z + a[14];
        out[15] = a[3] * x + a[7] * y + a[11] * z + a[15];
    } else {
        a00 = a[0]; a01 = a[1]; a02 = a[2]; a03 = a[3];
        a10 = a[4]; a11 = a[5]; a12 = a[6]; a13 = a[7];
        a20 = a[8]; a21 = a[9]; a22 = a[10]; a23 = a[11];

        out[0] = a00; out[1] = a01; out[2] = a02; out[3] = a03;
        out[4] = a10; out[5] = a11; out[6] = a12; out[7] = a13;
        out[8] = a20; out[9] = a21; out[10] = a22; out[11] = a23;

        out[12] = a00 * x + a10 * y + a20 * z + a[12];
        out[13] = a01 * x + a11 * y + a21 * z + a[13];
        out[14] = a02 * x + a12 * y + a22 * z + a[14];
        out[15] = a03 * x + a13 * y + a23 * z + a[15];
    }

    return out;
};

/**
 * Scales the mat4 by the dimensions in the given vec3
 *
 * @param {mat4} out the receiving matrix
 * @param {mat4} a the matrix to scale
 * @param {vec3} v the vec3 to scale the matrix by
 * @returns {mat4} out
 **/
mat4.scale = function(out, a, v) {
    var x = v[0], y = v[1], z = v[2];

    out[0] = a[0] * x;
    out[1] = a[1] * x;
    out[2] = a[2] * x;
    out[3] = a[3] * x;
    out[4] = a[4] * y;
    out[5] = a[5] * y;
    out[6] = a[6] * y;
    out[7] = a[7] * y;
    out[8] = a[8] * z;
    out[9] = a[9] * z;
    out[10] = a[10] * z;
    out[11] = a[11] * z;
    out[12] = a[12];
    out[13] = a[13];
    out[14] = a[14];
    out[15] = a[15];
    return out;
};

/**
 * Rotates a mat4 by the given angle
 *
 * @param {mat4} out the receiving matrix
 * @param {mat4} a the matrix to rotate
 * @param {Number} rad the angle to rotate the matrix by
 * @param {vec3} axis the axis to rotate around
 * @returns {mat4} out
 */
mat4.rotate = function (out, a, rad, axis) {
    var x = axis[0], y = axis[1], z = axis[2],
        len = Math.sqrt(x * x + y * y + z * z),
        s, c, t,
        a00, a01, a02, a03,
        a10, a11, a12, a13,
        a20, a21, a22, a23,
        b00, b01, b02,
        b10, b11, b12,
        b20, b21, b22;

    if (Math.abs(len) < GLMAT_EPSILON) { return null; }

    len = 1 / len;
    x *= len;
    y *= len;
    z *= len;

    s = Math.sin(rad);
    c = Math.cos(rad);
    t = 1 - c;

    a00 = a[0]; a01 = a[1]; a02 = a[2]; a03 = a[3];
    a10 = a[4]; a11 = a[5]; a12 = a[6]; a13 = a[7];
    a20 = a[8]; a21 = a[9]; a22 = a[10]; a23 = a[11];

    // Construct the elements of the rotation matrix
    b00 = x * x * t + c; b01 = y * x * t + z * s; b02 = z * x * t - y * s;
    b10 = x * y * t - z * s; b11 = y * y * t + c; b12 = z * y * t + x * s;
    b20 = x * z * t + y * s; b21 = y * z * t - x * s; b22 = z * z * t + c;

    // Perform rotation-specific matrix multiplication
    out[0] = a00 * b00 + a10 * b01 + a20 * b02;
    out[1] = a01 * b00 + a11 * b01 + a21 * b02;
    out[2] = a02 * b00 + a12 * b01 + a22 * b02;
    out[3] = a03 * b00 + a13 * b01 + a23 * b02;
    out[4] = a00 * b10 + a10 * b11 + a20 * b12;
    out[5] = a01 * b10 + a11 * b11 + a21 * b12;
    out[6] = a02 * b10 + a12 * b11 + a22 * b12;
    out[7] = a03 * b10 + a13 * b11 + a23 * b12;
    out[8] = a00 * b20 + a10 * b21 + a20 * b22;
    out[9] = a01 * b20 + a11 * b21 + a21 * b22;
    out[10] = a02 * b20 + a12 * b21 + a22 * b22;
    out[11] = a03 * b20 + a13 * b21 + a23 * b22;

    if (a !== out) { // If the source and destination differ, copy the unchanged last row
        out[12] = a[12];
        out[13] = a[13];
        out[14] = a[14];
        out[15] = a[15];
    }
    return out;
};

/**
 * Rotates a matrix by the given angle around the X axis
 *
 * @param {mat4} out the receiving matrix
 * @param {mat4} a the matrix to rotate
 * @param {Number} rad the angle to rotate the matrix by
 * @returns {mat4} out
 */
mat4.rotateX = function (out, a, rad) {
    var s = Math.sin(rad),
        c = Math.cos(rad),
        a10 = a[4],
        a11 = a[5],
        a12 = a[6],
        a13 = a[7],
        a20 = a[8],
        a21 = a[9],
        a22 = a[10],
        a23 = a[11];

    if (a !== out) { // If the source and destination differ, copy the unchanged rows
        out[0]  = a[0];
        out[1]  = a[1];
        out[2]  = a[2];
        out[3]  = a[3];
        out[12] = a[12];
        out[13] = a[13];
        out[14] = a[14];
        out[15] = a[15];
    }

    // Perform axis-specific matrix multiplication
    out[4] = a10 * c + a20 * s;
    out[5] = a11 * c + a21 * s;
    out[6] = a12 * c + a22 * s;
    out[7] = a13 * c + a23 * s;
    out[8] = a20 * c - a10 * s;
    out[9] = a21 * c - a11 * s;
    out[10] = a22 * c - a12 * s;
    out[11] = a23 * c - a13 * s;
    return out;
};

/**
 * Rotates a matrix by the given angle around the Y axis
 *
 * @param {mat4} out the receiving matrix
 * @param {mat4} a the matrix to rotate
 * @param {Number} rad the angle to rotate the matrix by
 * @returns {mat4} out
 */
mat4.rotateY = function (out, a, rad) {
    var s = Math.sin(rad),
        c = Math.cos(rad),
        a00 = a[0],
        a01 = a[1],
        a02 = a[2],
        a03 = a[3],
        a20 = a[8],
        a21 = a[9],
        a22 = a[10],
        a23 = a[11];

    if (a !== out) { // If the source and destination differ, copy the unchanged rows
        out[4]  = a[4];
        out[5]  = a[5];
        out[6]  = a[6];
        out[7]  = a[7];
        out[12] = a[12];
        out[13] = a[13];
        out[14] = a[14];
        out[15] = a[15];
    }

    // Perform axis-specific matrix multiplication
    out[0] = a00 * c - a20 * s;
    out[1] = a01 * c - a21 * s;
    out[2] = a02 * c - a22 * s;
    out[3] = a03 * c - a23 * s;
    out[8] = a00 * s + a20 * c;
    out[9] = a01 * s + a21 * c;
    out[10] = a02 * s + a22 * c;
    out[11] = a03 * s + a23 * c;
    return out;
};

/**
 * Rotates a matrix by the given angle around the Z axis
 *
 * @param {mat4} out the receiving matrix
 * @param {mat4} a the matrix to rotate
 * @param {Number} rad the angle to rotate the matrix by
 * @returns {mat4} out
 */
mat4.rotateZ = function (out, a, rad) {
    var s = Math.sin(rad),
        c = Math.cos(rad),
        a00 = a[0],
        a01 = a[1],
        a02 = a[2],
        a03 = a[3],
        a10 = a[4],
        a11 = a[5],
        a12 = a[6],
        a13 = a[7];

    if (a !== out) { // If the source and destination differ, copy the unchanged last row
        out[8]  = a[8];
        out[9]  = a[9];
        out[10] = a[10];
        out[11] = a[11];
        out[12] = a[12];
        out[13] = a[13];
        out[14] = a[14];
        out[15] = a[15];
    }

    // Perform axis-specific matrix multiplication
    out[0] = a00 * c + a10 * s;
    out[1] = a01 * c + a11 * s;
    out[2] = a02 * c + a12 * s;
    out[3] = a03 * c + a13 * s;
    out[4] = a10 * c - a00 * s;
    out[5] = a11 * c - a01 * s;
    out[6] = a12 * c - a02 * s;
    out[7] = a13 * c - a03 * s;
    return out;
};

/**
 * Creates a matrix from a quaternion rotation and vector translation
 * This is equivalent to (but much faster than):
 *
 *     mat4.identity(dest);
 *     mat4.translate(dest, vec);
 *     var quatMat = mat4.create();
 *     quat4.toMat4(quat, quatMat);
 *     mat4.multiply(dest, quatMat);
 *
 * @param {mat4} out mat4 receiving operation result
 * @param {quat4} q Rotation quaternion
 * @param {vec3} v Translation vector
 * @returns {mat4} out
 */
mat4.fromRotationTranslation = function (out, q, v) {
    // Quaternion math
    var x = q[0], y = q[1], z = q[2], w = q[3],
        x2 = x + x,
        y2 = y + y,
        z2 = z + z,

        xx = x * x2,
        xy = x * y2,
        xz = x * z2,
        yy = y * y2,
        yz = y * z2,
        zz = z * z2,
        wx = w * x2,
        wy = w * y2,
        wz = w * z2;

    out[0] = 1 - (yy + zz);
    out[1] = xy + wz;
    out[2] = xz - wy;
    out[3] = 0;
    out[4] = xy - wz;
    out[5] = 1 - (xx + zz);
    out[6] = yz + wx;
    out[7] = 0;
    out[8] = xz + wy;
    out[9] = yz - wx;
    out[10] = 1 - (xx + yy);
    out[11] = 0;
    out[12] = v[0];
    out[13] = v[1];
    out[14] = v[2];
    out[15] = 1;

    return out;
};

mat4.fromQuat = function (out, q) {
    var x = q[0], y = q[1], z = q[2], w = q[3],
        x2 = x + x,
        y2 = y + y,
        z2 = z + z,

        xx = x * x2,
        yx = y * x2,
        yy = y * y2,
        zx = z * x2,
        zy = z * y2,
        zz = z * z2,
        wx = w * x2,
        wy = w * y2,
        wz = w * z2;

    out[0] = 1 - yy - zz;
    out[1] = yx + wz;
    out[2] = zx - wy;
    out[3] = 0;

    out[4] = yx - wz;
    out[5] = 1 - xx - zz;
    out[6] = zy + wx;
    out[7] = 0;

    out[8] = zx + wy;
    out[9] = zy - wx;
    out[10] = 1 - xx - yy;
    out[11] = 0;

    out[12] = 0;
    out[13] = 0;
    out[14] = 0;
    out[15] = 1;

    return out;
};

/**
 * Generates a frustum matrix with the given bounds
 *
 * @param {mat4} out mat4 frustum matrix will be written into
 * @param {Number} left Left bound of the frustum
 * @param {Number} right Right bound of the frustum
 * @param {Number} bottom Bottom bound of the frustum
 * @param {Number} top Top bound of the frustum
 * @param {Number} near Near bound of the frustum
 * @param {Number} far Far bound of the frustum
 * @returns {mat4} out
 */
mat4.frustum = function (out, left, right, bottom, top, near, far) {
    var rl = 1 / (right - left),
        tb = 1 / (top - bottom),
        nf = 1 / (near - far);
    out[0] = (near * 2) * rl;
    out[1] = 0;
    out[2] = 0;
    out[3] = 0;
    out[4] = 0;
    out[5] = (near * 2) * tb;
    out[6] = 0;
    out[7] = 0;
    out[8] = (right + left) * rl;
    out[9] = (top + bottom) * tb;
    out[10] = (far + near) * nf;
    out[11] = -1;
    out[12] = 0;
    out[13] = 0;
    out[14] = (far * near * 2) * nf;
    out[15] = 0;
    return out;
};

/**
 * Generates a perspective projection matrix with the given bounds
 *
 * @param {mat4} out mat4 frustum matrix will be written into
 * @param {number} fovy Vertical field of view in radians
 * @param {number} aspect Aspect ratio. typically viewport width/height
 * @param {number} near Near bound of the frustum
 * @param {number} far Far bound of the frustum
 * @returns {mat4} out
 */
mat4.perspective = function (out, fovy, aspect, near, far) {
    var f = 1.0 / Math.tan(fovy / 2),
        nf = 1 / (near - far);
    out[0] = f / aspect;
    out[1] = 0;
    out[2] = 0;
    out[3] = 0;
    out[4] = 0;
    out[5] = f;
    out[6] = 0;
    out[7] = 0;
    out[8] = 0;
    out[9] = 0;
    out[10] = (far + near) * nf;
    out[11] = -1;
    out[12] = 0;
    out[13] = 0;
    out[14] = (2 * far * near) * nf;
    out[15] = 0;
    return out;
};

/**
 * Generates a orthogonal projection matrix with the given bounds
 *
 * @param {mat4} out mat4 frustum matrix will be written into
 * @param {number} left Left bound of the frustum
 * @param {number} right Right bound of the frustum
 * @param {number} bottom Bottom bound of the frustum
 * @param {number} top Top bound of the frustum
 * @param {number} near Near bound of the frustum
 * @param {number} far Far bound of the frustum
 * @returns {mat4} out
 */
mat4.ortho = function (out, left, right, bottom, top, near, far) {
    var lr = 1 / (left - right),
        bt = 1 / (bottom - top),
        nf = 1 / (near - far);
    out[0] = -2 * lr;
    out[1] = 0;
    out[2] = 0;
    out[3] = 0;
    out[4] = 0;
    out[5] = -2 * bt;
    out[6] = 0;
    out[7] = 0;
    out[8] = 0;
    out[9] = 0;
    out[10] = 2 * nf;
    out[11] = 0;
    out[12] = (left + right) * lr;
    out[13] = (top + bottom) * bt;
    out[14] = (far + near) * nf;
    out[15] = 1;
    return out;
};

/**
 * Generates a look-at matrix with the given eye position, focal point, and up axis
 *
 * @param {mat4} out mat4 frustum matrix will be written into
 * @param {vec3} eye Position of the viewer
 * @param {vec3} center Point the viewer is looking at
 * @param {vec3} up vec3 pointing up
 * @returns {mat4} out
 */
mat4.lookAt = function (out, eye, center, up) {
    var x0, x1, x2, y0, y1, y2, z0, z1, z2, len,
        eyex = eye[0],
        eyey = eye[1],
        eyez = eye[2],
        upx = up[0],
        upy = up[1],
        upz = up[2],
        centerx = center[0],
        centery = center[1],
        centerz = center[2];

    if (Math.abs(eyex - centerx) < GLMAT_EPSILON &&
        Math.abs(eyey - centery) < GLMAT_EPSILON &&
        Math.abs(eyez - centerz) < GLMAT_EPSILON) {
        return mat4.identity(out);
    }

    z0 = eyex - centerx;
    z1 = eyey - centery;
    z2 = eyez - centerz;

    len = 1 / Math.sqrt(z0 * z0 + z1 * z1 + z2 * z2);
    z0 *= len;
    z1 *= len;
    z2 *= len;

    x0 = upy * z2 - upz * z1;
    x1 = upz * z0 - upx * z2;
    x2 = upx * z1 - upy * z0;
    len = Math.sqrt(x0 * x0 + x1 * x1 + x2 * x2);
    if (!len) {
        x0 = 0;
        x1 = 0;
        x2 = 0;
    } else {
        len = 1 / len;
        x0 *= len;
        x1 *= len;
        x2 *= len;
    }

    y0 = z1 * x2 - z2 * x1;
    y1 = z2 * x0 - z0 * x2;
    y2 = z0 * x1 - z1 * x0;

    len = Math.sqrt(y0 * y0 + y1 * y1 + y2 * y2);
    if (!len) {
        y0 = 0;
        y1 = 0;
        y2 = 0;
    } else {
        len = 1 / len;
        y0 *= len;
        y1 *= len;
        y2 *= len;
    }

    out[0] = x0;
    out[1] = y0;
    out[2] = z0;
    out[3] = 0;
    out[4] = x1;
    out[5] = y1;
    out[6] = z1;
    out[7] = 0;
    out[8] = x2;
    out[9] = y2;
    out[10] = z2;
    out[11] = 0;
    out[12] = -(x0 * eyex + x1 * eyey + x2 * eyez);
    out[13] = -(y0 * eyex + y1 * eyey + y2 * eyez);
    out[14] = -(z0 * eyex + z1 * eyey + z2 * eyez);
    out[15] = 1;

    return out;
};

/**
 * Returns a string representation of a mat4
 *
 * @param {mat4} mat matrix to represent as a string
 * @returns {String} string representation of the matrix
 */
mat4.str = function (a) {
    return 'mat4(' + a[0] + ', ' + a[1] + ', ' + a[2] + ', ' + a[3] + ', ' +
                    a[4] + ', ' + a[5] + ', ' + a[6] + ', ' + a[7] + ', ' +
                    a[8] + ', ' + a[9] + ', ' + a[10] + ', ' + a[11] + ', ' +
                    a[12] + ', ' + a[13] + ', ' + a[14] + ', ' + a[15] + ')';
};

/**
 * Returns Frobenius norm of a mat4
 *
 * @param {mat4} a the matrix to calculate Frobenius norm of
 * @returns {Number} Frobenius norm
 */
mat4.frob = function (a) {
    return(Math.sqrt(Math.pow(a[0], 2) + Math.pow(a[1], 2) + Math.pow(a[2], 2) + Math.pow(a[3], 2) + Math.pow(a[4], 2) + Math.pow(a[5], 2) + Math.pow(a[6], 2) + Math.pow(a[7], 2) + Math.pow(a[8], 2) + Math.pow(a[9], 2) + Math.pow(a[10], 2) + Math.pow(a[11], 2) + Math.pow(a[12], 2) + Math.pow(a[13], 2) + Math.pow(a[14], 2) + Math.pow(a[15], 2) ))
};


if(typeof(exports) !== 'undefined') {
    exports.mat4 = mat4;
}
;
/* Copyright (c) 2013, Brandon Jones, Colin MacKenzie IV. All rights reserved.

Redistribution and use in source and binary forms, with or without modification,
are permitted provided that the following conditions are met:

  * Redistributions of source code must retain the above copyright notice, this
    list of conditions and the following disclaimer.
  * Redistributions in binary form must reproduce the above copyright notice,
    this list of conditions and the following disclaimer in the documentation
    and/or other materials provided with the distribution.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND
ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR
ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
(INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON
ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
(INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE. */

/**
 * @class Quaternion
 * @name quat
 */

var quat = {};

/**
 * Creates a new identity quat
 *
 * @returns {quat} a new quaternion
 */
quat.create = function() {
    var out = new GLMAT_ARRAY_TYPE(4);
    out[0] = 0;
    out[1] = 0;
    out[2] = 0;
    out[3] = 1;
    return out;
};

/**
 * Sets a quaternion to represent the shortest rotation from one
 * vector to another.
 *
 * Both vectors are assumed to be unit length.
 *
 * @param {quat} out the receiving quaternion.
 * @param {vec3} a the initial vector
 * @param {vec3} b the destination vector
 * @returns {quat} out
 */
quat.rotationTo = (function() {
    var tmpvec3 = vec3.create();
    var xUnitVec3 = vec3.fromValues(1,0,0);
    var yUnitVec3 = vec3.fromValues(0,1,0);

    return function(out, a, b) {
        var dot = vec3.dot(a, b);
        if (dot < -0.999999) {
            vec3.cross(tmpvec3, xUnitVec3, a);
            if (vec3.length(tmpvec3) < 0.000001)
                vec3.cross(tmpvec3, yUnitVec3, a);
            vec3.normalize(tmpvec3, tmpvec3);
            quat.setAxisAngle(out, tmpvec3, Math.PI);
            return out;
        } else if (dot > 0.999999) {
            out[0] = 0;
            out[1] = 0;
            out[2] = 0;
            out[3] = 1;
            return out;
        } else {
            vec3.cross(tmpvec3, a, b);
            out[0] = tmpvec3[0];
            out[1] = tmpvec3[1];
            out[2] = tmpvec3[2];
            out[3] = 1 + dot;
            return quat.normalize(out, out);
        }
    };
})();

/**
 * Sets the specified quaternion with values corresponding to the given
 * axes. Each axis is a vec3 and is expected to be unit length and
 * perpendicular to all other specified axes.
 *
 * @param {vec3} view  the vector representing the viewing direction
 * @param {vec3} right the vector representing the local "right" direction
 * @param {vec3} up    the vector representing the local "up" direction
 * @returns {quat} out
 */
quat.setAxes = (function() {
    var matr = mat3.create();

    return function(out, view, right, up) {
        matr[0] = right[0];
        matr[3] = right[1];
        matr[6] = right[2];

        matr[1] = up[0];
        matr[4] = up[1];
        matr[7] = up[2];

        matr[2] = -view[0];
        matr[5] = -view[1];
        matr[8] = -view[2];

        return quat.normalize(out, quat.fromMat3(out, matr));
    };
})();

/**
 * Creates a new quat initialized with values from an existing quaternion
 *
 * @param {quat} a quaternion to clone
 * @returns {quat} a new quaternion
 * @function
 */
quat.clone = vec4.clone;

/**
 * Creates a new quat initialized with the given values
 *
 * @param {Number} x X component
 * @param {Number} y Y component
 * @param {Number} z Z component
 * @param {Number} w W component
 * @returns {quat} a new quaternion
 * @function
 */
quat.fromValues = vec4.fromValues;

/**
 * Copy the values from one quat to another
 *
 * @param {quat} out the receiving quaternion
 * @param {quat} a the source quaternion
 * @returns {quat} out
 * @function
 */
quat.copy = vec4.copy;

/**
 * Set the components of a quat to the given values
 *
 * @param {quat} out the receiving quaternion
 * @param {Number} x X component
 * @param {Number} y Y component
 * @param {Number} z Z component
 * @param {Number} w W component
 * @returns {quat} out
 * @function
 */
quat.set = vec4.set;

/**
 * Set a quat to the identity quaternion
 *
 * @param {quat} out the receiving quaternion
 * @returns {quat} out
 */
quat.identity = function(out) {
    out[0] = 0;
    out[1] = 0;
    out[2] = 0;
    out[3] = 1;
    return out;
};

/**
 * Sets a quat from the given angle and rotation axis,
 * then returns it.
 *
 * @param {quat} out the receiving quaternion
 * @param {vec3} axis the axis around which to rotate
 * @param {Number} rad the angle in radians
 * @returns {quat} out
 **/
quat.setAxisAngle = function(out, axis, rad) {
    rad = rad * 0.5;
    var s = Math.sin(rad);
    out[0] = s * axis[0];
    out[1] = s * axis[1];
    out[2] = s * axis[2];
    out[3] = Math.cos(rad);
    return out;
};

/**
 * Adds two quat's
 *
 * @param {quat} out the receiving quaternion
 * @param {quat} a the first operand
 * @param {quat} b the second operand
 * @returns {quat} out
 * @function
 */
quat.add = vec4.add;

/**
 * Multiplies two quat's
 *
 * @param {quat} out the receiving quaternion
 * @param {quat} a the first operand
 * @param {quat} b the second operand
 * @returns {quat} out
 */
quat.multiply = function(out, a, b) {
    var ax = a[0], ay = a[1], az = a[2], aw = a[3],
        bx = b[0], by = b[1], bz = b[2], bw = b[3];

    out[0] = ax * bw + aw * bx + ay * bz - az * by;
    out[1] = ay * bw + aw * by + az * bx - ax * bz;
    out[2] = az * bw + aw * bz + ax * by - ay * bx;
    out[3] = aw * bw - ax * bx - ay * by - az * bz;
    return out;
};

/**
 * Alias for {@link quat.multiply}
 * @function
 */
quat.mul = quat.multiply;

/**
 * Scales a quat by a scalar number
 *
 * @param {quat} out the receiving vector
 * @param {quat} a the vector to scale
 * @param {Number} b amount to scale the vector by
 * @returns {quat} out
 * @function
 */
quat.scale = vec4.scale;

/**
 * Rotates a quaternion by the given angle about the X axis
 *
 * @param {quat} out quat receiving operation result
 * @param {quat} a quat to rotate
 * @param {number} rad angle (in radians) to rotate
 * @returns {quat} out
 */
quat.rotateX = function (out, a, rad) {
    rad *= 0.5;

    var ax = a[0], ay = a[1], az = a[2], aw = a[3],
        bx = Math.sin(rad), bw = Math.cos(rad);

    out[0] = ax * bw + aw * bx;
    out[1] = ay * bw + az * bx;
    out[2] = az * bw - ay * bx;
    out[3] = aw * bw - ax * bx;
    return out;
};

/**
 * Rotates a quaternion by the given angle about the Y axis
 *
 * @param {quat} out quat receiving operation result
 * @param {quat} a quat to rotate
 * @param {number} rad angle (in radians) to rotate
 * @returns {quat} out
 */
quat.rotateY = function (out, a, rad) {
    rad *= 0.5;

    var ax = a[0], ay = a[1], az = a[2], aw = a[3],
        by = Math.sin(rad), bw = Math.cos(rad);

    out[0] = ax * bw - az * by;
    out[1] = ay * bw + aw * by;
    out[2] = az * bw + ax * by;
    out[3] = aw * bw - ay * by;
    return out;
};

/**
 * Rotates a quaternion by the given angle about the Z axis
 *
 * @param {quat} out quat receiving operation result
 * @param {quat} a quat to rotate
 * @param {number} rad angle (in radians) to rotate
 * @returns {quat} out
 */
quat.rotateZ = function (out, a, rad) {
    rad *= 0.5;

    var ax = a[0], ay = a[1], az = a[2], aw = a[3],
        bz = Math.sin(rad), bw = Math.cos(rad);

    out[0] = ax * bw + ay * bz;
    out[1] = ay * bw - ax * bz;
    out[2] = az * bw + aw * bz;
    out[3] = aw * bw - az * bz;
    return out;
};

/**
 * Calculates the W component of a quat from the X, Y, and Z components.
 * Assumes that quaternion is 1 unit in length.
 * Any existing W component will be ignored.
 *
 * @param {quat} out the receiving quaternion
 * @param {quat} a quat to calculate W component of
 * @returns {quat} out
 */
quat.calculateW = function (out, a) {
    var x = a[0], y = a[1], z = a[2];

    out[0] = x;
    out[1] = y;
    out[2] = z;
    out[3] = Math.sqrt(Math.abs(1.0 - x * x - y * y - z * z));
    return out;
};

/**
 * Calculates the dot product of two quat's
 *
 * @param {quat} a the first operand
 * @param {quat} b the second operand
 * @returns {Number} dot product of a and b
 * @function
 */
quat.dot = vec4.dot;

/**
 * Performs a linear interpolation between two quat's
 *
 * @param {quat} out the receiving quaternion
 * @param {quat} a the first operand
 * @param {quat} b the second operand
 * @param {Number} t interpolation amount between the two inputs
 * @returns {quat} out
 * @function
 */
quat.lerp = vec4.lerp;

/**
 * Performs a spherical linear interpolation between two quat
 *
 * @param {quat} out the receiving quaternion
 * @param {quat} a the first operand
 * @param {quat} b the second operand
 * @param {Number} t interpolation amount between the two inputs
 * @returns {quat} out
 */
quat.slerp = function (out, a, b, t) {
    // benchmarks:
    //    http://jsperf.com/quaternion-slerp-implementations

    var ax = a[0], ay = a[1], az = a[2], aw = a[3],
        bx = b[0], by = b[1], bz = b[2], bw = b[3];

    var        omega, cosom, sinom, scale0, scale1;

    // calc cosine
    cosom = ax * bx + ay * by + az * bz + aw * bw;
    // adjust signs (if necessary)
    if ( cosom < 0.0 ) {
        cosom = -cosom;
        bx = - bx;
        by = - by;
        bz = - bz;
        bw = - bw;
    }
    // calculate coefficients
    if ( (1.0 - cosom) > 0.000001 ) {
        // standard case (slerp)
        omega  = Math.acos(cosom);
        sinom  = Math.sin(omega);
        scale0 = Math.sin((1.0 - t) * omega) / sinom;
        scale1 = Math.sin(t * omega) / sinom;
    } else {
        // "from" and "to" quaternions are very close
        //  ... so we can do a linear interpolation
        scale0 = 1.0 - t;
        scale1 = t;
    }
    // calculate final values
    out[0] = scale0 * ax + scale1 * bx;
    out[1] = scale0 * ay + scale1 * by;
    out[2] = scale0 * az + scale1 * bz;
    out[3] = scale0 * aw + scale1 * bw;

    return out;
};

/**
 * Calculates the inverse of a quat
 *
 * @param {quat} out the receiving quaternion
 * @param {quat} a quat to calculate inverse of
 * @returns {quat} out
 */
quat.invert = function(out, a) {
    var a0 = a[0], a1 = a[1], a2 = a[2], a3 = a[3],
        dot = a0*a0 + a1*a1 + a2*a2 + a3*a3,
        invDot = dot ? 1.0/dot : 0;

    // TODO: Would be faster to return [0,0,0,0] immediately if dot == 0

    out[0] = -a0*invDot;
    out[1] = -a1*invDot;
    out[2] = -a2*invDot;
    out[3] = a3*invDot;
    return out;
};

/**
 * Calculates the conjugate of a quat
 * If the quaternion is normalized, this function is faster than quat.inverse and produces the same result.
 *
 * @param {quat} out the receiving quaternion
 * @param {quat} a quat to calculate conjugate of
 * @returns {quat} out
 */
quat.conjugate = function (out, a) {
    out[0] = -a[0];
    out[1] = -a[1];
    out[2] = -a[2];
    out[3] = a[3];
    return out;
};

/**
 * Calculates the length of a quat
 *
 * @param {quat} a vector to calculate length of
 * @returns {Number} length of a
 * @function
 */
quat.length = vec4.length;

/**
 * Alias for {@link quat.length}
 * @function
 */
quat.len = quat.length;

/**
 * Calculates the squared length of a quat
 *
 * @param {quat} a vector to calculate squared length of
 * @returns {Number} squared length of a
 * @function
 */
quat.squaredLength = vec4.squaredLength;

/**
 * Alias for {@link quat.squaredLength}
 * @function
 */
quat.sqrLen = quat.squaredLength;

/**
 * Normalize a quat
 *
 * @param {quat} out the receiving quaternion
 * @param {quat} a quaternion to normalize
 * @returns {quat} out
 * @function
 */
quat.normalize = vec4.normalize;

/**
 * Creates a quaternion from the given 3x3 rotation matrix.
 *
 * NOTE: The resultant quaternion is not normalized, so you should be sure
 * to renormalize the quaternion yourself where necessary.
 *
 * @param {quat} out the receiving quaternion
 * @param {mat3} m rotation matrix
 * @returns {quat} out
 * @function
 */
quat.fromMat3 = function(out, m) {
    // Algorithm in Ken Shoemake's article in 1987 SIGGRAPH course notes
    // article "Quaternion Calculus and Fast Animation".
    var fTrace = m[0] + m[4] + m[8];
    var fRoot;

    if ( fTrace > 0.0 ) {
        // |w| > 1/2, may as well choose w > 1/2
        fRoot = Math.sqrt(fTrace + 1.0);  // 2w
        out[3] = 0.5 * fRoot;
        fRoot = 0.5/fRoot;  // 1/(4w)
        out[0] = (m[5]-m[7])*fRoot;
        out[1] = (m[6]-m[2])*fRoot;
        out[2] = (m[1]-m[3])*fRoot;
    } else {
        // |w| <= 1/2
        var i = 0;
        if ( m[4] > m[0] )
          i = 1;
        if ( m[8] > m[i*3+i] )
          i = 2;
        var j = (i+1)%3;
        var k = (i+2)%3;

        fRoot = Math.sqrt(m[i*3+i]-m[j*3+j]-m[k*3+k] + 1.0);
        out[i] = 0.5 * fRoot;
        fRoot = 0.5 / fRoot;
        out[3] = (m[j*3+k] - m[k*3+j]) * fRoot;
        out[j] = (m[j*3+i] + m[i*3+j]) * fRoot;
        out[k] = (m[k*3+i] + m[i*3+k]) * fRoot;
    }

    return out;
};

/**
 * Returns a string representation of a quatenion
 *
 * @param {quat} vec vector to represent as a string
 * @returns {String} string representation of the vector
 */
quat.str = function (a) {
    return 'quat(' + a[0] + ', ' + a[1] + ', ' + a[2] + ', ' + a[3] + ')';
};

if(typeof(exports) !== 'undefined') {
    exports.quat = quat;
}
;













  })(shim.exports);
})(this);

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

var Mesh = __webpack_require__(25);
var Renderer = __webpack_require__(52);
var Texture2D = __webpack_require__(5);
var Texture = __webpack_require__(6);
var Shader = __webpack_require__(7);
var Material = __webpack_require__(16);
var Node3D = __webpack_require__(35);
var StaticGeometry = __webpack_require__(13);
var echarts = __webpack_require__(0);
var Scene = __webpack_require__(26);
var LRUCache = __webpack_require__(60);
var textureUtil = __webpack_require__(47);
var EChartsSurface = __webpack_require__(169);
var AmbientCubemapLight = __webpack_require__(203);
var AmbientSHLight = __webpack_require__(204);
var shUtil = __webpack_require__(231);
var retrieve = __webpack_require__(4);

var animatableMixin = __webpack_require__(171);
echarts.util.extend(Node3D.prototype, animatableMixin);

// Some common shaders
Shader.import(__webpack_require__(227));
Shader.import(__webpack_require__(82));
Shader.import(__webpack_require__(179));
Shader.import(__webpack_require__(178));
Shader.import(__webpack_require__(183));
Shader.import(__webpack_require__(186));
Shader.import(__webpack_require__(181));
Shader.import(__webpack_require__(187));

function isValueNone(value) {
    return !value || value === 'none';
}

function isValueImage(value) {
    return value instanceof HTMLCanvasElement
        || value instanceof HTMLImageElement
        || value instanceof Image;
}

function isECharts(value) {
    return value.getZr && value.setOption;
}

// Overwrite addToScene and removeFromScene
var oldAddToScene = Scene.prototype.addToScene;
var oldRemoveFromScene = Scene.prototype.removeFromScene;

Scene.prototype.addToScene = function (node) {
    oldAddToScene.call(this, node);

    if (this.__zr) {
        var zr = this.__zr;
        node.traverse(function (child) {
            child.__zr = zr;
            if (child.addAnimatorsToZr) {
                child.addAnimatorsToZr(zr);
            }
        });
    }
};

Scene.prototype.removeFromScene = function (node) {
    oldRemoveFromScene.call(this, node);

    node.traverse(function (child) {
        var zr = child.__zr;
        child.__zr = null;
        if (zr && child.removeAnimatorsFromZr) {
            child.removeAnimatorsFromZr(zr);
        }
    });
};

/**
 * @param {string} textureName
 * @param {string|HTMLImageElement|HTMLCanvasElement} imgValue
 * @param {module:echarts/ExtensionAPI} api
 * @param {Object} [textureOpts]
 */
Material.prototype.setTextureImage = function (textureName, imgValue, api, textureOpts) {
    if (!this.shader) {
        return;
    }

    var zr = api.getZr();
    var material = this;
    var texture;
    // disableTexture first
    material.shader.disableTexture(textureName);
    if (!isValueNone(imgValue)) {
        texture = graphicGL.loadTexture(imgValue, api, textureOpts, function (texture) {
            material.shader.enableTexture(textureName);
            zr && zr.refresh();
        });
        // Set texture immediately for other code to verify if have this texture.
        material.set(textureName, texture);
    }

    return texture;
};

var graphicGL = {};

graphicGL.Renderer = Renderer;

graphicGL.Node = Node3D;

graphicGL.Mesh = Mesh;

graphicGL.Shader = Shader;

graphicGL.Material = Material;

graphicGL.Texture = Texture;

graphicGL.Texture2D = Texture2D;

// Geometries
graphicGL.Geometry = StaticGeometry;

graphicGL.SphereGeometry = __webpack_require__(75);

graphicGL.PlaneGeometry = __webpack_require__(46);

graphicGL.CubeGeometry = __webpack_require__(74);

// Lights
graphicGL.AmbientLight = __webpack_require__(202);
graphicGL.DirectionalLight = __webpack_require__(76);
graphicGL.PointLight = __webpack_require__(77);
graphicGL.SpotLight = __webpack_require__(78);

// Cameras
graphicGL.PerspectiveCamera = __webpack_require__(44);
graphicGL.OrthographicCamera = __webpack_require__(36);

// Math
graphicGL.Vector2 = __webpack_require__(28);
graphicGL.Vector3 = __webpack_require__(3);
graphicGL.Vector4 = __webpack_require__(209);

graphicGL.Quaternion = __webpack_require__(55);

graphicGL.Matrix2 = __webpack_require__(206);
graphicGL.Matrix2d = __webpack_require__(207);
graphicGL.Matrix3 = __webpack_require__(208);
graphicGL.Matrix4 = __webpack_require__(9);

graphicGL.Plane = __webpack_require__(79);
graphicGL.Ray = __webpack_require__(56);
graphicGL.BoundingBox = __webpack_require__(14);
graphicGL.Frustum = __webpack_require__(54);

// Texture utilities

var blankImage = textureUtil.createBlank('rgba(255,255,255,0)').image;


function nearestPowerOfTwo(val) {
    return Math.pow(2, Math.round(Math.log(val) / Math.LN2));
}
function convertTextureToPowerOfTwo(texture) {
    if ((texture.wrapS === Texture.REPEAT || texture.wrapT === Texture.REPEAT)
     && texture.image
     ) {
        // var canvas = document.createElement('canvas');
        var width = nearestPowerOfTwo(texture.width);
        var height = nearestPowerOfTwo(texture.height);
        if (width !== texture.width || height !== texture.height) {
            var canvas = document.createElement('canvas');
            canvas.width = width;
            canvas.height = height;
            var ctx = canvas.getContext('2d');
            ctx.drawImage(texture.image, 0, 0, width, height);
            texture.image = canvas;
        }
    }
}
/**
 * @param {string|HTMLImageElement|HTMLCanvasElement} imgValue
 * @param {module:echarts/ExtensionAPI} api
 * @param {Object} [textureOpts]
 * @param {Function} cb
 */
// TODO Promise, test
graphicGL.loadTexture = function (imgValue, api, textureOpts, cb) {
    if (typeof textureOpts === 'function') {
        cb = textureOpts;
        textureOpts = {};
    }
    textureOpts = textureOpts || {};

    var keys = Object.keys(textureOpts).sort();
    var prefix = '';
    for (var i = 0; i < keys.length; i++) {
        prefix += keys[i] + '_' + textureOpts[keys[i]] + '_';
    }

    var textureCache = api.__textureCache = api.__textureCache || new LRUCache(20);

    if (isECharts(imgValue)) {
        var id = imgValue.__textureid__;
        var textureObj = textureCache.get(prefix + id);
        if (!textureObj) {
            var surface = new EChartsSurface(imgValue);
            surface.onupdate = function () {
                api.getZr().refresh();
            };
            textureObj = {
                texture: surface.getTexture()
            };
            for (var i = 0; i < keys.length; i++) {
                textureObj.texture[keys[i]] = textureOpts[keys[i]];
            }
            id = imgValue.__textureid__ || '__ecgl_ec__' + textureObj.texture.__GUID__;
            imgValue.__textureid__ = id;
            textureCache.put(prefix + id, textureObj);
            cb && cb(textureObj.texture);
        }
        else {
            textureObj.texture.surface.setECharts(imgValue);

            cb && cb(textureObj.texture);
        }
        return textureObj.texture;
    }
    else if (isValueImage(imgValue)) {
        var id = imgValue.__textureid__;
        var textureObj = textureCache.get(prefix + id);
        if (!textureObj) {
            textureObj = {
                texture: new graphicGL.Texture2D({
                    image: imgValue
                })
            };
            for (var i = 0; i < keys.length; i++) {
                textureObj.texture[keys[i]] = textureOpts[keys[i]];
            }
            id = imgValue.__textureid__ || '__ecgl_image__' + textureObj.texture.__GUID__;
            imgValue.__textureid__ = id;
            textureCache.put(prefix + id, textureObj);

            convertTextureToPowerOfTwo(textureObj.texture);
            // TODO Next tick?
            cb && cb(textureObj.texture);
        }
        return textureObj.texture;
    }
    else {
        var textureObj = textureCache.get(prefix + imgValue);
        if (textureObj) {
            if (textureObj.callbacks) {
                // Add to pending callbacks
                textureObj.callbacks.push(cb);
            }
            else {
                // TODO Next tick?
                cb && cb(textureObj.texture);
            }
        }
        else {
            // Maybe base64
            if (imgValue.match(/.hdr$|^data:application\/octet-stream/)) {
                textureObj = {
                    callbacks: [cb]
                };
                var texture = textureUtil.loadTexture(imgValue, {
                    exposure: textureOpts.exposure,
                    fileType: 'hdr'
                }, function () {
                    texture.dirty();
                    textureObj.callbacks.forEach(function (cb) {
                        cb && cb(texture);
                    });
                    textureObj.callbacks = null;
                });
                textureObj.texture = texture;
                textureCache.put(prefix + imgValue, textureObj);
            }
            else {
                var texture = new graphicGL.Texture2D({
                    image: new Image()
                });
                for (var i = 0; i < keys.length; i++) {
                    texture[keys[i]] = textureOpts[keys[i]];
                }

                textureObj = {
                    texture: texture,
                    callbacks: [cb]
                };
                var originalImage = texture.image;
                originalImage.onload = function () {
                    texture.image = originalImage;
                    convertTextureToPowerOfTwo(texture);

                    texture.dirty();
                    textureObj.callbacks.forEach(function (cb) {
                        cb && cb(texture);
                    });
                    textureObj.callbacks = null;
                };
                originalImage.src = imgValue;
                // Use blank image as place holder.
                texture.image = blankImage;

                textureCache.put(prefix + imgValue, textureObj);
            }
        }

        return textureObj.texture;
    }
};

/**
 * Create ambientCubemap and ambientSH light. respectively to have specular and diffuse light
 * @return {Object} { specular, diffuse }
 */
graphicGL.createAmbientCubemap = function (opt, renderer, api, cb) {
    opt = opt || {};
    var textureUrl = opt.texture;
    var exposure = retrieve.firstNotNull(opt.exposure, 1.0);

    var ambientCubemap = new AmbientCubemapLight({
        intensity: retrieve.firstNotNull(opt.specularIntensity, 1.0)
    });
    var ambientSH = new AmbientSHLight({
        intensity: retrieve.firstNotNull(opt.diffuseIntensity, 1.0),
        coefficients: [0.844, 0.712, 0.691, -0.037, 0.083, 0.167, 0.343, 0.288, 0.299, -0.041, -0.021, -0.009, -0.003, -0.041, -0.064, -0.011, -0.007, -0.004, -0.031, 0.034, 0.081, -0.060, -0.049, -0.060, 0.046, 0.056, 0.050]
    });


    ambientCubemap.cubemap = graphicGL.loadTexture(textureUrl, api, {
        exposure: exposure
    }, function () {
        // TODO Performance when multiple view
        ambientCubemap.cubemap.flipY = false;
        ambientCubemap.prefilter(renderer, 32);
        ambientSH.coefficients = shUtil.projectEnvironmentMap(renderer, ambientCubemap.cubemap, {
            lod: 1
        });

        cb && cb();

        // TODO Refresh ?
    });

    return {
        specular: ambientCubemap,
        diffuse: ambientSH
    };
};

/**
 * Create a blank texture for placeholder
 */
graphicGL.createBlankTexture = textureUtil.createBlank;

/**
 * If value is image
 * @param {*}
 * @return {boolean}
 */
graphicGL.isImage = isValueImage;

graphicGL.additiveBlend = function (gl) {
    gl.blendEquation(gl.FUNC_ADD);
    gl.blendFunc(gl.SRC_ALPHA, gl.ONE);
};

/**
 * @param {string|Array.<number>} colorStr
 * @param {Array.<number>} [rgba]
 * @return {Array.<number>} rgba
 */
graphicGL.parseColor = function (colorStr, rgba) {
    if (colorStr instanceof Array) {
        if (!rgba) {
            rgba = [];
        }
        // Color has been parsed.
        rgba[0] = colorStr[0];
        rgba[1] = colorStr[1];
        rgba[2] = colorStr[2];
        if (colorStr.length > 3) {
            rgba[3] = colorStr[3];
        }
        else {
            rgba[3] = 1;
        }
        return rgba;
    }

    rgba = echarts.color.parse(colorStr || '#000', rgba) || [0, 0, 0, 0];
    rgba[0] /= 255;
    rgba[1] /= 255;
    rgba[2] /= 255;
    return rgba;
};

/**
 * Convert alpha beta rotation to direction.
 * @param {number} alpha
 * @param {number} beta
 * @return {Array.<number>}
 */
graphicGL.directionFromAlphaBeta = function (alpha, beta) {
    var theta = alpha / 180 * Math.PI + Math.PI / 2;
    var phi = -beta / 180 * Math.PI + Math.PI / 2;

    var dir = [];
    var r = Math.sin(theta);
    dir[0] = r * Math.cos(phi);
    dir[1] = -Math.cos(theta);
    dir[2] = r * Math.sin(phi);

    return dir;
};
/**
 * Get shadow resolution from shadowQuality configuration
 */
graphicGL.getShadowResolution = function (shadowQuality) {
    var shadowResolution = 1024;
    switch (shadowQuality) {
        case 'low':
            shadowResolution = 512;
            break;
        case 'medium':
            break;
        case 'high':
            shadowResolution = 2048;
            break;
        case 'ultra':
            shadowResolution = 4096;
            break;
    }
    return shadowResolution;
};

/**
 * Shading utilities
 */
graphicGL.COMMON_SHADERS = ['lambert', 'color', 'realistic', 'hatching'];

/**
 * Create shader including vertex and fragment
 * @param {string} prefix.
 */
graphicGL.createShader = function (prefix) {
    var vertexShaderStr = Shader.source(prefix + '.vertex');
    var fragmentShaderStr = Shader.source(prefix + '.fragment');
    if (!vertexShaderStr) {
        console.error('Vertex shader of \'%s\' not exits', prefix);
    }
    if (!fragmentShaderStr) {
        console.error('Fragment shader of \'%s\' not exits', prefix);
    }
    return new Shader({
        name: prefix,
        vertex: vertexShaderStr,
        fragment: fragmentShaderStr
    });
};
/**
 * Set material from model.
 * @param {qtek.Material} material
 * @param {module:echarts/model/Model} model
 * @param {module:echarts/ExtensionAPI} api
 */
graphicGL.setMaterialFromModel = function (shading, material, model, api) {
    var materialModel = model.getModel(shading + 'Material');
    var detailTexture = materialModel.get('detailTexture');
    var uvRepeat = retrieve.firstNotNull(materialModel.get('textureTiling'), 1.0);
    var uvOffset = retrieve.firstNotNull(materialModel.get('textureOffset'), 0.0);
    if (typeof uvRepeat === 'number') {
        uvRepeat = [uvRepeat, uvRepeat];
    }
    if (typeof uvOffset === 'number') {
        uvOffset = [uvOffset, uvOffset];
    }
    var repeatParam = (uvRepeat[0] > 1 || uvRepeat[1] > 1) ? graphicGL.Texture.REPEAT : graphicGL.Texture.CLAMP_TO_EDGE;
    var textureOpt = {
        anisotropic: 8,
        wrapS: repeatParam,
        wrapT: repeatParam
    };
    if (shading === 'realistic') {
        var roughness = materialModel.get('roughness');
        var metalness = materialModel.get('metalness');
        if (metalness != null) {
            // Try to treat as a texture, TODO More check
            if (isNaN(metalness)) {
                material.setTextureImage('metalnessMap', metalness, api, textureOpt);
                metalness = retrieve.firstNotNull(materialModel.get('metalnessAdjust'), 0.5);
            }
        }
        else {
            // Default metalness.
            metalness = 0;
        }
        if (roughness != null) {
            // Try to treat as a texture, TODO More check
            if (isNaN(roughness)) {
                material.setTextureImage('roughnessMap', roughness, api, textureOpt);
                roughness = retrieve.firstNotNull(materialModel.get('roughnessAdjust'), 0.5);
            }
        }
        else {
            // Default roughness.
            roughness = 0.5;
        }
        var normalTextureVal = materialModel.get('normalTexture');
        material.setTextureImage('detailMap', detailTexture, api, textureOpt);
        material.setTextureImage('normalMap', normalTextureVal, api, textureOpt);
        material.set({
            roughness: roughness,
            metalness: metalness,
            detailUvRepeat: uvRepeat,
            detailUvOffset: uvOffset
        });
        // var normalTexture = material.get('normalMap');
        // if (normalTexture) {
            // PENDING
            // normalTexture.format = Texture.SRGB;
        // }
    }
    else if (shading === 'lambert') {
        material.setTextureImage('detailMap', detailTexture, api, textureOpt);
        material.set({
            detailUvRepeat: uvRepeat,
            detailUvOffset: uvOffset
        });
    }
    else if (shading === 'color') {
        material.setTextureImage('detailMap', detailTexture, api, textureOpt);
        material.set({
            detailUvRepeat: uvRepeat,
            detailUvOffset: uvOffset
        });
    }
    else if (shading === 'hatching') {
        var tams = materialModel.get('hatchingTextures') || [];
        if (tams.length < 6) {
            if (true) {
                console.error('Invalid hatchingTextures.');
            }
        }
        for (var i = 0; i < 6; i++) {
            material.setTextureImage('hatch' + (i + 1), tams[i], api, {
                anisotropic: 8,
                wrapS: graphicGL.Texture.REPEAT,
                wrapT: graphicGL.Texture.REPEAT
            });
        }
        material.set({
            detailUvRepeat: uvRepeat,
            detailUvOffset: uvOffset
        });
    }
};

graphicGL.updateVertexAnimation = function (
    mappingAttributes, previousMesh, currentMesh, seriesModel
) {
    var enableAnimation = seriesModel.get('animation');
    var duration = seriesModel.get('animationDurationUpdate');
    var easing = seriesModel.get('animationEasingUpdate');
    var shadowDepthMaterial = currentMesh.shadowDepthMaterial;

    if (enableAnimation && previousMesh && duration > 0
    // Only animate when bar count are not changed
    && previousMesh.geometry.vertexCount === currentMesh.geometry.vertexCount
    ) {
        currentMesh.material.shader.define('vertex', 'VERTEX_ANIMATION');
        currentMesh.ignorePreZ = true;
        if (shadowDepthMaterial) {
            shadowDepthMaterial.shader.define('vertex', 'VERTEX_ANIMATION');
        }
        for (var i = 0; i < mappingAttributes.length; i++) {
            currentMesh.geometry.attributes[mappingAttributes[i][0]].value =
            previousMesh.geometry.attributes[mappingAttributes[i][1]].value;
        }
        currentMesh.geometry.dirty();
        currentMesh.__percent = 0;
        currentMesh.material.set('percent', 0);
        currentMesh.stopAnimation();
        currentMesh.animate()
            .when(duration, {
                __percent: 1
            })
            .during(function () {
                currentMesh.material.set('percent', currentMesh.__percent);
                if (shadowDepthMaterial) {
                    shadowDepthMaterial.set('percent', currentMesh.__percent);
                }
            })
            .done(function () {
                currentMesh.ignorePreZ = false;
                currentMesh.material.shader.undefine('vertex', 'VERTEX_ANIMATION');
                if (shadowDepthMaterial) {
                    shadowDepthMaterial.shader.undefine('vertex', 'VERTEX_ANIMATION');
                }
            })
            .start(easing);
    }
    else {
        currentMesh.material.shader.undefine('vertex', 'VERTEX_ANIMATION');
        if (shadowDepthMaterial) {
            shadowDepthMaterial.shader.undefine('vertex', 'VERTEX_ANIMATION');
        }
    }
};

module.exports = graphicGL;

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";



    var glMatrix = __webpack_require__(1);
    var vec3 = glMatrix.vec3;

    /**
     * @constructor
     * @alias qtek.math.Vector3
     * @param {number} x
     * @param {number} y
     * @param {number} z
     */
    var Vector3 = function(x, y, z) {

        x = x || 0;
        y = y || 0;
        z = z || 0;

        /**
         * Storage of Vector3, read and write of x, y, z will change the values in _array
         * All methods also operate on the _array instead of x, y, z components
         * @name _array
         * @type {Float32Array}
         */
        this._array = vec3.fromValues(x, y, z);

        /**
         * Dirty flag is used by the Node to determine
         * if the matrix is updated to latest
         * @name _dirty
         * @type {boolean}
         */
        this._dirty = true;
    };

    Vector3.prototype = {

        constructor : Vector3,

        /**
         * Add b to self
         * @param  {qtek.math.Vector3} b
         * @return {qtek.math.Vector3}
         */
        add: function (b) {
            vec3.add(this._array, this._array, b._array);
            this._dirty = true;
            return this;
        },

        /**
         * Set x, y and z components
         * @param  {number}  x
         * @param  {number}  y
         * @param  {number}  z
         * @return {qtek.math.Vector3}
         */
        set: function (x, y, z) {
            this._array[0] = x;
            this._array[1] = y;
            this._array[2] = z;
            this._dirty = true;
            return this;
        },

        /**
         * Set x, y and z components from array
         * @param  {Float32Array|number[]} arr
         * @return {qtek.math.Vector3}
         */
        setArray: function (arr) {
            this._array[0] = arr[0];
            this._array[1] = arr[1];
            this._array[2] = arr[2];

            this._dirty = true;
            return this;
        },

        /**
         * Clone a new Vector3
         * @return {qtek.math.Vector3}
         */
        clone: function () {
            return new Vector3(this.x, this.y, this.z);
        },

        /**
         * Copy from b
         * @param  {qtek.math.Vector3} b
         * @return {qtek.math.Vector3}
         */
        copy: function (b) {
            vec3.copy(this._array, b._array);
            this._dirty = true;
            return this;
        },

        /**
         * Cross product of self and b, written to a Vector3 out
         * @param  {qtek.math.Vector3} a
         * @param  {qtek.math.Vector3} b
         * @return {qtek.math.Vector3}
         */
        cross: function (a, b) {
            vec3.cross(this._array, a._array, b._array);
            this._dirty = true;
            return this;
        },

        /**
         * Alias for distance
         * @param  {qtek.math.Vector3} b
         * @return {number}
         */
        dist: function (b) {
            return vec3.dist(this._array, b._array);
        },

        /**
         * Distance between self and b
         * @param  {qtek.math.Vector3} b
         * @return {number}
         */
        distance: function (b) {
            return vec3.distance(this._array, b._array);
        },

        /**
         * Alias for divide
         * @param  {qtek.math.Vector3} b
         * @return {qtek.math.Vector3}
         */
        div: function (b) {
            vec3.div(this._array, this._array, b._array);
            this._dirty = true;
            return this;
        },

        /**
         * Divide self by b
         * @param  {qtek.math.Vector3} b
         * @return {qtek.math.Vector3}
         */
        divide: function (b) {
            vec3.divide(this._array, this._array, b._array);
            this._dirty = true;
            return this;
        },

        /**
         * Dot product of self and b
         * @param  {qtek.math.Vector3} b
         * @return {number}
         */
        dot: function (b) {
            return vec3.dot(this._array, b._array);
        },

        /**
         * Alias of length
         * @return {number}
         */
        len: function () {
            return vec3.len(this._array);
        },

        /**
         * Calculate the length
         * @return {number}
         */
        length: function () {
            return vec3.length(this._array);
        },
        /**
         * Linear interpolation between a and b
         * @param  {qtek.math.Vector3} a
         * @param  {qtek.math.Vector3} b
         * @param  {number}  t
         * @return {qtek.math.Vector3}
         */
        lerp: function (a, b, t) {
            vec3.lerp(this._array, a._array, b._array, t);
            this._dirty = true;
            return this;
        },

        /**
         * Minimum of self and b
         * @param  {qtek.math.Vector3} b
         * @return {qtek.math.Vector3}
         */
        min: function (b) {
            vec3.min(this._array, this._array, b._array);
            this._dirty = true;
            return this;
        },

        /**
         * Maximum of self and b
         * @param  {qtek.math.Vector3} b
         * @return {qtek.math.Vector3}
         */
        max: function (b) {
            vec3.max(this._array, this._array, b._array);
            this._dirty = true;
            return this;
        },

        /**
         * Alias for multiply
         * @param  {qtek.math.Vector3} b
         * @return {qtek.math.Vector3}
         */
        mul: function (b) {
            vec3.mul(this._array, this._array, b._array);
            this._dirty = true;
            return this;
        },

        /**
         * Mutiply self and b
         * @param  {qtek.math.Vector3} b
         * @return {qtek.math.Vector3}
         */
        multiply: function (b) {
            vec3.multiply(this._array, this._array, b._array);
            this._dirty = true;
            return this;
        },

        /**
         * Negate self
         * @return {qtek.math.Vector3}
         */
        negate: function () {
            vec3.negate(this._array, this._array);
            this._dirty = true;
            return this;
        },

        /**
         * Normalize self
         * @return {qtek.math.Vector3}
         */
        normalize: function () {
            vec3.normalize(this._array, this._array);
            this._dirty = true;
            return this;
        },

        /**
         * Generate random x, y, z components with a given scale
         * @param  {number} scale
         * @return {qtek.math.Vector3}
         */
        random: function (scale) {
            vec3.random(this._array, scale);
            this._dirty = true;
            return this;
        },

        /**
         * Scale self
         * @param  {number}  scale
         * @return {qtek.math.Vector3}
         */
        scale: function (s) {
            vec3.scale(this._array, this._array, s);
            this._dirty = true;
            return this;
        },

        /**
         * Scale b and add to self
         * @param  {qtek.math.Vector3} b
         * @param  {number}  scale
         * @return {qtek.math.Vector3}
         */
        scaleAndAdd: function (b, s) {
            vec3.scaleAndAdd(this._array, this._array, b._array, s);
            this._dirty = true;
            return this;
        },

        /**
         * Alias for squaredDistance
         * @param  {qtek.math.Vector3} b
         * @return {number}
         */
        sqrDist: function (b) {
            return vec3.sqrDist(this._array, b._array);
        },

        /**
         * Squared distance between self and b
         * @param  {qtek.math.Vector3} b
         * @return {number}
         */
        squaredDistance: function (b) {
            return vec3.squaredDistance(this._array, b._array);
        },

        /**
         * Alias for squaredLength
         * @return {number}
         */
        sqrLen: function () {
            return vec3.sqrLen(this._array);
        },

        /**
         * Squared length of self
         * @return {number}
         */
        squaredLength: function () {
            return vec3.squaredLength(this._array);
        },

        /**
         * Alias for subtract
         * @param  {qtek.math.Vector3} b
         * @return {qtek.math.Vector3}
         */
        sub: function (b) {
            vec3.sub(this._array, this._array, b._array);
            this._dirty = true;
            return this;
        },

        /**
         * Subtract b from self
         * @param  {qtek.math.Vector3} b
         * @return {qtek.math.Vector3}
         */
        subtract: function (b) {
            vec3.subtract(this._array, this._array, b._array);
            this._dirty = true;
            return this;
        },

        /**
         * Transform self with a Matrix3 m
         * @param  {qtek.math.Matrix3} m
         * @return {qtek.math.Vector3}
         */
        transformMat3: function (m) {
            vec3.transformMat3(this._array, this._array, m._array);
            this._dirty = true;
            return this;
        },

        /**
         * Transform self with a Matrix4 m
         * @param  {qtek.math.Matrix4} m
         * @return {qtek.math.Vector3}
         */
        transformMat4: function (m) {
            vec3.transformMat4(this._array, this._array, m._array);
            this._dirty = true;
            return this;
        },
        /**
         * Transform self with a Quaternion q
         * @param  {qtek.math.Quaternion} q
         * @return {qtek.math.Vector3}
         */
        transformQuat: function (q) {
            vec3.transformQuat(this._array, this._array, q._array);
            this._dirty = true;
            return this;
        },

        /**
         * Trasnform self into projection space with m
         * @param  {qtek.math.Matrix4} m
         * @return {qtek.math.Vector3}
         */
        applyProjection: function (m) {
            var v = this._array;
            m = m._array;

            // Perspective projection
            if (m[15] === 0) {
                var w = -1 / v[2];
                v[0] = m[0] * v[0] * w;
                v[1] = m[5] * v[1] * w;
                v[2] = (m[10] * v[2] + m[14]) * w;
            }
            else {
                v[0] = m[0] * v[0] + m[12];
                v[1] = m[5] * v[1] + m[13];
                v[2] = m[10] * v[2] + m[14];
            }
            this._dirty = true;

            return this;
        },

        eulerFromQuat: function(q, order) {
            Vector3.eulerFromQuat(this, q, order);
        },

        eulerFromMat3: function (m, order) {
            Vector3.eulerFromMat3(this, m, order);
        },

        toString: function() {
            return '[' + Array.prototype.join.call(this._array, ',') + ']';
        },

        toArray: function () {
            return Array.prototype.slice.call(this._array);
        }
    };

    var defineProperty = Object.defineProperty;
    // Getter and Setter
    if (defineProperty) {

        var proto = Vector3.prototype;
        /**
         * @name x
         * @type {number}
         * @memberOf qtek.math.Vector3
         * @instance
         */
        defineProperty(proto, 'x', {
            get: function () {
                return this._array[0];
            },
            set: function (value) {
                this._array[0] = value;
                this._dirty = true;
            }
        });

        /**
         * @name y
         * @type {number}
         * @memberOf qtek.math.Vector3
         * @instance
         */
        defineProperty(proto, 'y', {
            get: function () {
                return this._array[1];
            },
            set: function (value) {
                this._array[1] = value;
                this._dirty = true;
            }
        });

        /**
         * @name z
         * @type {number}
         * @memberOf qtek.math.Vector3
         * @instance
         */
        defineProperty(proto, 'z', {
            get: function () {
                return this._array[2];
            },
            set: function (value) {
                this._array[2] = value;
                this._dirty = true;
            }
        });
    }


    // Supply methods that are not in place

    /**
     * @param  {qtek.math.Vector3} out
     * @param  {qtek.math.Vector3} a
     * @param  {qtek.math.Vector3} b
     * @return {qtek.math.Vector3}
     */
    Vector3.add = function(out, a, b) {
        vec3.add(out._array, a._array, b._array);
        out._dirty = true;
        return out;
    };

    /**
     * @param  {qtek.math.Vector3} out
     * @param  {number}  x
     * @param  {number}  y
     * @param  {number}  z
     * @return {qtek.math.Vector3}
     */
    Vector3.set = function(out, x, y, z) {
        vec3.set(out._array, x, y, z);
        out._dirty = true;
    };

    /**
     * @param  {qtek.math.Vector3} out
     * @param  {qtek.math.Vector3} b
     * @return {qtek.math.Vector3}
     */
    Vector3.copy = function(out, b) {
        vec3.copy(out._array, b._array);
        out._dirty = true;
        return out;
    };

    /**
     * @param  {qtek.math.Vector3} out
     * @param  {qtek.math.Vector3} a
     * @param  {qtek.math.Vector3} b
     * @return {qtek.math.Vector3}
     */
    Vector3.cross = function(out, a, b) {
        vec3.cross(out._array, a._array, b._array);
        out._dirty = true;
        return out;
    };

    /**
     * @param  {qtek.math.Vector3} a
     * @param  {qtek.math.Vector3} b
     * @return {number}
     */
    Vector3.dist = function(a, b) {
        return vec3.distance(a._array, b._array);
    };

    /**
     * @method
     * @param  {qtek.math.Vector3} a
     * @param  {qtek.math.Vector3} b
     * @return {number}
     */
    Vector3.distance = Vector3.dist;

    /**
     * @param  {qtek.math.Vector3} out
     * @param  {qtek.math.Vector3} a
     * @param  {qtek.math.Vector3} b
     * @return {qtek.math.Vector3}
     */
    Vector3.div = function(out, a, b) {
        vec3.divide(out._array, a._array, b._array);
        out._dirty = true;
        return out;
    };

    /**
     * @method
     * @param  {qtek.math.Vector3} out
     * @param  {qtek.math.Vector3} a
     * @param  {qtek.math.Vector3} b
     * @return {qtek.math.Vector3}
     */
    Vector3.divide = Vector3.div;

    /**
     * @param  {qtek.math.Vector3} a
     * @param  {qtek.math.Vector3} b
     * @return {number}
     */
    Vector3.dot = function(a, b) {
        return vec3.dot(a._array, b._array);
    };

    /**
     * @param  {qtek.math.Vector3} a
     * @return {number}
     */
    Vector3.len = function(b) {
        return vec3.length(b._array);
    };

    // Vector3.length = Vector3.len;

    /**
     * @param  {qtek.math.Vector3} out
     * @param  {qtek.math.Vector3} a
     * @param  {qtek.math.Vector3} b
     * @param  {number}  t
     * @return {qtek.math.Vector3}
     */
    Vector3.lerp = function(out, a, b, t) {
        vec3.lerp(out._array, a._array, b._array, t);
        out._dirty = true;
        return out;
    };
    /**
     * @param  {qtek.math.Vector3} out
     * @param  {qtek.math.Vector3} a
     * @param  {qtek.math.Vector3} b
     * @return {qtek.math.Vector3}
     */
    Vector3.min = function(out, a, b) {
        vec3.min(out._array, a._array, b._array);
        out._dirty = true;
        return out;
    };

    /**
     * @param  {qtek.math.Vector3} out
     * @param  {qtek.math.Vector3} a
     * @param  {qtek.math.Vector3} b
     * @return {qtek.math.Vector3}
     */
    Vector3.max = function(out, a, b) {
        vec3.max(out._array, a._array, b._array);
        out._dirty = true;
        return out;
    };
    /**
     * @param  {qtek.math.Vector3} out
     * @param  {qtek.math.Vector3} a
     * @param  {qtek.math.Vector3} b
     * @return {qtek.math.Vector3}
     */
    Vector3.mul = function(out, a, b) {
        vec3.multiply(out._array, a._array, b._array);
        out._dirty = true;
        return out;
    };
    /**
     * @method
     * @param  {qtek.math.Vector3} out
     * @param  {qtek.math.Vector3} a
     * @param  {qtek.math.Vector3} b
     * @return {qtek.math.Vector3}
     */
    Vector3.multiply = Vector3.mul;
    /**
     * @param  {qtek.math.Vector3} out
     * @param  {qtek.math.Vector3} a
     * @return {qtek.math.Vector3}
     */
    Vector3.negate = function(out, a) {
        vec3.negate(out._array, a._array);
        out._dirty = true;
        return out;
    };
    /**
     * @param  {qtek.math.Vector3} out
     * @param  {qtek.math.Vector3} a
     * @return {qtek.math.Vector3}
     */
    Vector3.normalize = function(out, a) {
        vec3.normalize(out._array, a._array);
        out._dirty = true;
        return out;
    };
    /**
     * @param  {qtek.math.Vector3} out
     * @param  {number}  scale
     * @return {qtek.math.Vector3}
     */
    Vector3.random = function(out, scale) {
        vec3.random(out._array, scale);
        out._dirty = true;
        return out;
    };
    /**
     * @param  {qtek.math.Vector3} out
     * @param  {qtek.math.Vector3} a
     * @param  {number}  scale
     * @return {qtek.math.Vector3}
     */
    Vector3.scale = function(out, a, scale) {
        vec3.scale(out._array, a._array, scale);
        out._dirty = true;
        return out;
    };
    /**
     * @param  {qtek.math.Vector3} out
     * @param  {qtek.math.Vector3} a
     * @param  {qtek.math.Vector3} b
     * @param  {number}  scale
     * @return {qtek.math.Vector3}
     */
    Vector3.scaleAndAdd = function(out, a, b, scale) {
        vec3.scaleAndAdd(out._array, a._array, b._array, scale);
        out._dirty = true;
        return out;
    };
    /**
     * @param  {qtek.math.Vector3} a
     * @param  {qtek.math.Vector3} b
     * @return {number}
     */
    Vector3.sqrDist = function(a, b) {
        return vec3.sqrDist(a._array, b._array);
    };
    /**
     * @method
     * @param  {qtek.math.Vector3} a
     * @param  {qtek.math.Vector3} b
     * @return {number}
     */
    Vector3.squaredDistance = Vector3.sqrDist;
    /**
     * @param  {qtek.math.Vector3} a
     * @return {number}
     */
    Vector3.sqrLen = function(a) {
        return vec3.sqrLen(a._array);
    };
    /**
     * @method
     * @param  {qtek.math.Vector3} a
     * @return {number}
     */
    Vector3.squaredLength = Vector3.sqrLen;

    /**
     * @param  {qtek.math.Vector3} out
     * @param  {qtek.math.Vector3} a
     * @param  {qtek.math.Vector3} b
     * @return {qtek.math.Vector3}
     */
    Vector3.sub = function(out, a, b) {
        vec3.subtract(out._array, a._array, b._array);
        out._dirty = true;
        return out;
    };
    /**
     * @method
     * @param  {qtek.math.Vector3} out
     * @param  {qtek.math.Vector3} a
     * @param  {qtek.math.Vector3} b
     * @return {qtek.math.Vector3}
     */
    Vector3.subtract = Vector3.sub;

    /**
     * @param  {qtek.math.Vector3} out
     * @param  {qtek.math.Vector3} a
     * @param  {Matrix3} m
     * @return {qtek.math.Vector3}
     */
    Vector3.transformMat3 = function(out, a, m) {
        vec3.transformMat3(out._array, a._array, m._array);
        out._dirty = true;
        return out;
    };

    /**
     * @param  {qtek.math.Vector3} out
     * @param  {qtek.math.Vector3} a
     * @param  {qtek.math.Matrix4} m
     * @return {qtek.math.Vector3}
     */
    Vector3.transformMat4 = function(out, a, m) {
        vec3.transformMat4(out._array, a._array, m._array);
        out._dirty = true;
        return out;
    };
    /**
     * @param  {qtek.math.Vector3} out
     * @param  {qtek.math.Vector3} a
     * @param  {qtek.math.Quaternion} q
     * @return {qtek.math.Vector3}
     */
    Vector3.transformQuat = function(out, a, q) {
        vec3.transformQuat(out._array, a._array, q._array);
        out._dirty = true;
        return out;
    };

    function clamp(val, min, max) {
        return val < min ? min : (val > max ? max : val);
    }
    var atan2 = Math.atan2;
    var asin = Math.asin;
    var abs = Math.abs;
    /**
     * Convert quaternion to euler angle
     * Quaternion must be normalized
     * From three.js
     */
    Vector3.eulerFromQuat = function (out, q, order) {
        out._dirty = true;
        q = q._array;

        var target = out._array;
        var x = q[0], y = q[1], z = q[2], w = q[3];
        var x2 = x * x;
        var y2 = y * y;
        var z2 = z * z;
        var w2 = w * w;

        var order = (order || 'XYZ').toUpperCase();

        switch (order) {
            case 'XYZ':
                target[0] = atan2(2 * (x * w - y * z), (w2 - x2 - y2 + z2));
                target[1] = asin(clamp(2 * (x * z + y * w), - 1, 1));
                target[2] = atan2(2 * (z * w - x * y), (w2 + x2 - y2 - z2));
                break;
            case 'YXZ':
                target[0] = asin(clamp(2 * (x * w - y * z), - 1, 1));
                target[1] = atan2(2 * (x * z + y * w), (w2 - x2 - y2 + z2));
                target[2] = atan2(2 * (x * y + z * w), (w2 - x2 + y2 - z2));
                break;
            case 'ZXY':
                target[0] = asin(clamp(2 * (x * w + y * z), - 1, 1));
                target[1] = atan2(2 * (y * w - z * x), (w2 - x2 - y2 + z2));
                target[2] = atan2(2 * (z * w - x * y), (w2 - x2 + y2 - z2));
                break;
            case 'ZYX':
                target[0] = atan2(2 * (x * w + z * y), (w2 - x2 - y2 + z2));
                target[1] = asin(clamp(2 * (y * w - x * z), - 1, 1));
                target[2] = atan2(2 * (x * y + z * w), (w2 + x2 - y2 - z2));
                break;
            case 'YZX':
                target[0] = atan2(2 * (x * w - z * y), (w2 - x2 + y2 - z2));
                target[1] = atan2(2 * (y * w - x * z), (w2 + x2 - y2 - z2));
                target[2] = asin(clamp(2 * (x * y + z * w), - 1, 1));
                break;
            case 'XZY':
                target[0] = atan2(2 * (x * w + y * z), (w2 - x2 + y2 - z2));
                target[1] = atan2(2 * (x * z + y * w), (w2 + x2 - y2 - z2));
                target[2] = asin(clamp(2 * (z * w - x * y), - 1, 1));
                break;
            default:
                console.warn('Unkown order: ' + order);
        }
        return out;
    };

    /**
     * Convert rotation matrix to euler angle
     * from three.js
     */
    Vector3.eulerFromMat3 = function (out, m, order) {
        // assumes the upper 3x3 of m is a pure rotation matrix (i.e, unscaled)
        var te = m._array;
        var m11 = te[0], m12 = te[3], m13 = te[6];
        var m21 = te[1], m22 = te[4], m23 = te[7];
        var m31 = te[2], m32 = te[5], m33 = te[8];
        var target = out._array;

        var order = (order || 'XYZ').toUpperCase();

        switch (order) {
            case 'XYZ':
                target[1] = asin(clamp(m13, -1, 1));
                if (abs(m13) < 0.99999) {
                    target[0] = atan2(-m23, m33);
                    target[2] = atan2(-m12, m11);
                }
                else {
                    target[0] = atan2(m32, m22);
                    target[2] = 0;
                }
                break;
            case 'YXZ':
                target[0] = asin(-clamp(m23, -1, 1));
                if (abs(m23) < 0.99999) {
                    target[1] = atan2(m13, m33);
                    target[2] = atan2(m21, m22);
                }
                else {
                    target[1] = atan2(-m31, m11);
                    target[2] = 0;
                }
                break;
            case 'ZXY':
                target[0] = asin(clamp(m32, -1, 1));
                if (abs(m32) < 0.99999) {
                    target[1] = atan2(-m31, m33);
                    target[2] = atan2(-m12, m22);
                }
                else {
                    target[1] = 0;
                    target[2] = atan2(m21, m11);
                }
                break;
            case 'ZYX':
                target[1] = asin(-clamp(m31, -1, 1));
                if (abs(m31) < 0.99999) {
                    target[0] = atan2(m32, m33);
                    target[2] = atan2(m21, m11);
                }
                else {
                    target[0] = 0;
                    target[2] = atan2(-m12, m22);
                }
                break;
            case 'YZX':
                target[2] = asin(clamp(m21, -1, 1));
                if (abs(m21) < 0.99999) {
                    target[0] = atan2(-m23, m22);
                    target[1] = atan2(-m31, m11);
                }
                else {
                    target[0] = 0;
                    target[1] = atan2(m13, m33);
                }
                break;
            case 'XZY':
                target[2] = asin(-clamp(m12, -1, 1));
                if (abs(m12) < 0.99999) {
                    target[0] = atan2(m32, m22);
                    target[1] = atan2(m13, m11);
                }
                else {
                    target[0] = atan2(-m23, m33);
                    target[1] = 0;
                }
                break;
            default:
                console.warn('Unkown order: ' + order);
        }
        out._dirty = true;

        return out;
    };

    /**
     * @type {qtek.math.Vector3}
     */
    Vector3.POSITIVE_X = new Vector3(1, 0, 0);
    /**
     * @type {qtek.math.Vector3}
     */
    Vector3.NEGATIVE_X = new Vector3(-1, 0, 0);
    /**
     * @type {qtek.math.Vector3}
     */
    Vector3.POSITIVE_Y = new Vector3(0, 1, 0);
    /**
     * @type {qtek.math.Vector3}
     */
    Vector3.NEGATIVE_Y = new Vector3(0, -1, 0);
    /**
     * @type {qtek.math.Vector3}
     */
    Vector3.POSITIVE_Z = new Vector3(0, 0, 1);
    /**
     * @type {qtek.math.Vector3}
     */
    Vector3.NEGATIVE_Z = new Vector3(0, 0, -1);
    /**
     * @type {qtek.math.Vector3}
     */
    Vector3.UP = new Vector3(0, 1, 0);
    /**
     * @type {qtek.math.Vector3}
     */
    Vector3.ZERO = new Vector3(0, 0, 0);

    module.exports = Vector3;


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

var echarts = __webpack_require__(0);

var retrieve = {

    firstNotNull: function () {
        for (var i = 0, len = arguments.length; i < len; i++) {
            if (arguments[i] != null) {
                return arguments[i];
            }
        }
    },

    /**
     * @param {module:echarts/data/List} data
     * @param {Object} payload Contains dataIndex (means rawIndex) / dataIndexInside / name
     *                         each of which can be Array or primary type.
     * @return {number|Array.<number>} dataIndex If not found, return undefined/null.
     */
    queryDataIndex: function (data, payload) {
        if (payload.dataIndexInside != null) {
            return payload.dataIndexInside;
        }
        else if (payload.dataIndex != null) {
            return echarts.util.isArray(payload.dataIndex)
                ? echarts.util.map(payload.dataIndex, function (value) {
                    return data.indexOfRawIndex(value);
                })
                : data.indexOfRawIndex(payload.dataIndex);
        }
        else if (payload.name != null) {
            return echarts.util.isArray(payload.name)
                ? echarts.util.map(payload.name, function (value) {
                    return data.indexOfName(value);
                })
                : data.indexOfName(payload.name);
        }
    }
};

module.exports = retrieve;

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {



    var Texture = __webpack_require__(6);
    var glinfo = __webpack_require__(17);
    var glenum = __webpack_require__(11);
    var mathUtil = __webpack_require__(80);
    var isPowerOfTwo = mathUtil.isPowerOfTwo;

    /**
     * @constructor qtek.Texture2D
     * @extends qtek.Texture
     *
     * @example
     *     ...
     *     var mat = new qtek.Material({
     *         shader: qtek.shader.library.get('qtek.phong', 'diffuseMap')
     *     });
     *     var diffuseMap = new qtek.Texture2D();
     *     diffuseMap.load('assets/textures/diffuse.jpg');
     *     mat.set('diffuseMap', diffuseMap);
     *     ...
     *     diffuseMap.success(function() {
     *         // Wait for the diffuse texture loaded
     *         animation.on('frame', function(frameTime) {
     *             renderer.render(scene, camera);
     *         });
     *     });
     */
    var Texture2D = Texture.extend(function() {
        return /** @lends qtek.Texture2D# */ {
            /**
             * @type {HTMLImageElement|HTMLCanvasElemnet}
             */
            image: null,
            /**
             * @type {Uint8Array|Float32Array}
             */
            pixels: null,
            /**
             * @type {Array.<Object>}
             * @example
             *     [{
             *         image: mipmap0,
             *         pixels: null
             *     }, {
             *         image: mipmap1,
             *         pixels: null
             *     }, ....]
             */
            mipmaps: []
        };
    }, {
        update: function(_gl) {

            _gl.bindTexture(_gl.TEXTURE_2D, this._cache.get('webgl_texture'));

            this.updateCommon( _gl);

            var glFormat = this.format;
            var glType = this.type;

            _gl.texParameteri(_gl.TEXTURE_2D, _gl.TEXTURE_WRAP_S, this.wrapS);
            _gl.texParameteri(_gl.TEXTURE_2D, _gl.TEXTURE_WRAP_T, this.wrapT);

            _gl.texParameteri(_gl.TEXTURE_2D, _gl.TEXTURE_MAG_FILTER, this.magFilter);
            _gl.texParameteri(_gl.TEXTURE_2D, _gl.TEXTURE_MIN_FILTER, this.minFilter);

            var anisotropicExt = glinfo.getExtension(_gl, 'EXT_texture_filter_anisotropic');
            if (anisotropicExt && this.anisotropic > 1) {
                _gl.texParameterf(_gl.TEXTURE_2D, anisotropicExt.TEXTURE_MAX_ANISOTROPY_EXT, this.anisotropic);
            }

            // Fallback to float type if browser don't have half float extension
            if (glType === 36193) {
                var halfFloatExt = glinfo.getExtension(_gl, 'OES_texture_half_float');
                if (!halfFloatExt) {
                    glType = glenum.FLOAT;
                }
            }

            if (this.mipmaps.length) {
                var width = this.width;
                var height = this.height;
                for (var i = 0; i < this.mipmaps.length; i++) {
                    var mipmap = this.mipmaps[i];
                    this._updateTextureData(_gl, mipmap, i, width, height, glFormat, glType);
                    width /= 2;
                    height /= 2;
                }
            }
            else {
                this._updateTextureData(_gl, this, 0, this.width, this.height, glFormat, glType);

                if (this.useMipmap && !this.NPOT) {
                    _gl.generateMipmap(_gl.TEXTURE_2D);
                }
            }

            _gl.bindTexture(_gl.TEXTURE_2D, null);
        },

        _updateTextureData: function (_gl, data, level, width, height, glFormat, glType) {
            if (data.image) {
                _gl.texImage2D(_gl.TEXTURE_2D, level, glFormat, glFormat, glType, data.image);
            }
            else {
                // Can be used as a blank texture when writing render to texture(RTT)
                if (
                    glFormat <= Texture.COMPRESSED_RGBA_S3TC_DXT5_EXT
                    && glFormat >= Texture.COMPRESSED_RGB_S3TC_DXT1_EXT
                ) {
                    _gl.compressedTexImage2D(_gl.TEXTURE_2D, level, glFormat, width, height, 0, data.pixels);
                }
                else {
                    // Is a render target if pixels is null
                    _gl.texImage2D(_gl.TEXTURE_2D, level, glFormat, width, height, 0, glFormat, glType, data.pixels);
                }
            }
        },

        /**
         * @param  {WebGLRenderingContext} _gl
         * @memberOf qtek.Texture2D.prototype
         */
        generateMipmap: function(_gl) {
            if (this.useMipmap && !this.NPOT) {
                _gl.bindTexture(_gl.TEXTURE_2D, this._cache.get('webgl_texture'));
                _gl.generateMipmap(_gl.TEXTURE_2D);
            }
        },

        isPowerOfTwo: function() {
            var width;
            var height;
            if (this.image) {
                width = this.image.width;
                height = this.image.height;
            }
            else {
                width = this.width;
                height = this.height;
            }
            return isPowerOfTwo(width) && isPowerOfTwo(height);
        },

        isRenderable: function() {
            if (this.image) {
                return this.image.nodeName === 'CANVAS'
                    || this.image.nodeName === 'VIDEO'
                    || this.image.complete;
            }
            else {
                return !!(this.width && this.height);
            }
        },

        bind: function(_gl) {
            _gl.bindTexture(_gl.TEXTURE_2D, this.getWebGLTexture(_gl));
        },

        unbind: function(_gl) {
            _gl.bindTexture(_gl.TEXTURE_2D, null);
        },

        load: function (src, crossOrigin) {
            var image = new Image();
            if (crossOrigin) {
                image.crossOrigin = crossOrigin;
            }
            var self = this;
            image.onload = function() {
                self.dirty();
                self.trigger('success', self);
                image.onload = null;
            };
            image.onerror = function() {
                self.trigger('error', self);
                image.onerror = null;
            };

            image.src = src;
            this.image = image;

            return this;
        }
    });

    Object.defineProperty(Texture2D.prototype, 'width', {
        get: function () {
            if (this.image) {
                return this.image.width;
            }
            return this._width;
        },
        set: function (value) {
            if (this.image) {
                console.warn('Texture from image can\'t set width');
            }
            else {
                if (this._width !== value) {
                    this.dirty();
                }
                this._width = value;
            }
        }
    });
    Object.defineProperty(Texture2D.prototype, 'height', {
        get: function () {
            if (this.image) {
                return this.image.height;
            }
            return this._height;
        },
        set: function (value) {
            if (this.image) {
                console.warn('Texture from image can\'t set height');
            }
            else {
                if (this._height !== value) {
                    this.dirty();
                }
                this._height = value;
            }
        }
    });

    module.exports = Texture2D;


/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/**
 * Base class for all textures like compressed texture, texture2d, texturecube
 * TODO mapping
 */


    var Base = __webpack_require__(8);
    var glenum = __webpack_require__(11);
    var Cache = __webpack_require__(45);
    var glinfo = __webpack_require__(17);

    /**
     * @constructor qtek.Texture
     * @extends qtek.core.Base
     */
    var Texture = Base.extend(
    /** @lends qtek.Texture# */
    {
        /**
         * Texture width, only needed when the texture is used as a render target
         * @type {number}
         */
        width: 512,
        /**
         * Texture height, only needed when the texture is used as a render target
         * @type {number}
         */
        height: 512,
        /**
         * Texel data type
         * @type {number}
         */
        type: glenum.UNSIGNED_BYTE,
        /**
         * Format of texel data
         * @type {number}
         */
        format: glenum.RGBA,
        /**
         * @type {number}
         */
        wrapS: glenum.CLAMP_TO_EDGE,
        /**
         * @type {number}
         */
        wrapT: glenum.CLAMP_TO_EDGE,
        /**
         * @type {number}
         */
        minFilter: glenum.LINEAR_MIPMAP_LINEAR,
        /**
         * @type {number}
         */
        magFilter: glenum.LINEAR,
        /**
         * @type {boolean}
         */
        useMipmap: true,

        /**
         * Anisotropic filtering, enabled if value is larger than 1
         * @see http://blog.tojicode.com/2012/03/anisotropic-filtering-in-webgl.html
         * @type {number}
         */
        anisotropic: 1,
        // pixelStorei parameters, not available when texture is used as render target
        // http://www.khronos.org/opengles/sdk/docs/man/xhtml/glPixelStorei.xml
        /**
         * @type {boolean}
         */
        flipY: true,
        /**
         * @type {number}
         */
        unpackAlignment: 4,
        /**
         * @type {boolean}
         */
        premultiplyAlpha: false,

        /**
         * Dynamic option for texture like video
         * @type {boolean}
         */
        dynamic: false,

        NPOT: false
    }, function () {
        this._cache = new Cache();
    },
    /** @lends qtek.Texture.prototype */
    {

        getWebGLTexture: function (_gl) {
            var cache = this._cache;
            cache.use(_gl.__GLID__);

            if (cache.miss('webgl_texture')) {
                // In a new gl context, create new texture and set dirty true
                cache.put('webgl_texture', _gl.createTexture());
            }
            if (this.dynamic) {
                this.update(_gl);
            }
            else if (cache.isDirty()) {
                this.update(_gl);
                cache.fresh();
            }

            return cache.get('webgl_texture');
        },

        bind: function () {},
        unbind: function () {},

        /**
         * Mark texture is dirty and update in the next frame
         */
        dirty: function () {
            if (this._cache) {
                this._cache.dirtyAll();
            }
        },

        update: function (_gl) {},

        // Update the common parameters of texture
        updateCommon: function (_gl) {
            _gl.pixelStorei(_gl.UNPACK_FLIP_Y_WEBGL, this.flipY);
            _gl.pixelStorei(_gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL, this.premultiplyAlpha);
            _gl.pixelStorei(_gl.UNPACK_ALIGNMENT, this.unpackAlignment);

            this._fallBack(_gl);
        },

        _fallBack: function (_gl) {
            // Use of none-power of two texture
            // http://www.khronos.org/webgl/wiki/WebGL_and_OpenGL_Differences

            var isPowerOfTwo = this.isPowerOfTwo();

            if (this.format === glenum.DEPTH_COMPONENT) {
                this.useMipmap = false;
            }

            var sRGBExt = glinfo.getExtension(_gl, 'EXT_sRGB');
            // Fallback
            if (this.format === Texture.SRGB && !sRGBExt) {
                this.format = Texture.RGB;
            }
            if (this.format === Texture.SRGB_ALPHA && !sRGBExt) {
                this.format = Texture.RGBA;
            }

            if (!isPowerOfTwo || !this.useMipmap) {
                // none-power of two flag
                this.NPOT = true;
                // Save the original value for restore
                this._minFilterOriginal = this.minFilter;
                this._magFilterOriginal = this.magFilter;
                this._wrapSOriginal = this.wrapS;
                this._wrapTOriginal = this.wrapT;

                if (this.minFilter == glenum.NEAREST_MIPMAP_NEAREST ||
                    this.minFilter == glenum.NEAREST_MIPMAP_LINEAR) {
                    this.minFilter = glenum.NEAREST;
                } else if (
                    this.minFilter == glenum.LINEAR_MIPMAP_LINEAR ||
                    this.minFilter == glenum.LINEAR_MIPMAP_NEAREST
                ) {
                    this.minFilter = glenum.LINEAR;
                }

                this.wrapS = glenum.CLAMP_TO_EDGE;
                this.wrapT = glenum.CLAMP_TO_EDGE;
            }
            else {
                this.NPOT = false;
                if (this._minFilterOriginal) {
                    this.minFilter = this._minFilterOriginal;
                }
                if (this._magFilterOriginal) {
                    this.magFilter = this._magFilterOriginal;
                }
                if (this._wrapSOriginal) {
                    this.wrapS = this._wrapSOriginal;
                }
                if (this._wrapTOriginal) {
                    this.wrapT = this._wrapTOriginal;
                }
            }

        },

        nextHighestPowerOfTwo: function (x) {
            --x;
            for (var i = 1; i < 32; i <<= 1) {
                x = x | x >> i;
            }
            return x + 1;
        },
        /**
         * @param  {WebGLRenderingContext} _gl
         */
        dispose: function (_gl) {

            var cache = this._cache;

            cache.use(_gl.__GLID__);

            var webglTexture = cache.get('webgl_texture');
            if (webglTexture){
                _gl.deleteTexture(webglTexture);
            }
            cache.deleteContext(_gl.__GLID__);

        },
        /**
         * Test if image of texture is valid and loaded.
         * @return {boolean}
         */
        isRenderable: function () {},

        isPowerOfTwo: function () {}
    });

    Object.defineProperty(Texture.prototype, 'width', {
        get: function () {
            return this._width;
        },
        set: function (value) {
            this._width = value;
        }
    });
    Object.defineProperty(Texture.prototype, 'height', {
        get: function () {
            return this._height;
        },
        set: function (value) {
            this._height = value;
        }
    });

    /* DataType */
    Texture.BYTE = glenum.BYTE;
    Texture.UNSIGNED_BYTE = glenum.UNSIGNED_BYTE;
    Texture.SHORT = glenum.SHORT;
    Texture.UNSIGNED_SHORT = glenum.UNSIGNED_SHORT;
    Texture.INT = glenum.INT;
    Texture.UNSIGNED_INT = glenum.UNSIGNED_INT;
    Texture.FLOAT = glenum.FLOAT;
    Texture.HALF_FLOAT = 0x8D61;

    // ext.UNSIGNED_INT_24_8_WEBGL for WEBGL_depth_texture extension
    Texture.UNSIGNED_INT_24_8_WEBGL = 34042;

    /* PixelFormat */
    Texture.DEPTH_COMPONENT = glenum.DEPTH_COMPONENT;
    Texture.DEPTH_STENCIL = glenum.DEPTH_STENCIL;
    Texture.ALPHA = glenum.ALPHA;
    Texture.RGB = glenum.RGB;
    Texture.RGBA = glenum.RGBA;
    Texture.LUMINANCE = glenum.LUMINANCE;
    Texture.LUMINANCE_ALPHA = glenum.LUMINANCE_ALPHA;

    // https://www.khronos.org/registry/webgl/extensions/EXT_sRGB/
    Texture.SRGB = 0x8C40;
    Texture.SRGB_ALPHA = 0x8C42;

    /* Compressed Texture */
    Texture.COMPRESSED_RGB_S3TC_DXT1_EXT = 0x83F0;
    Texture.COMPRESSED_RGBA_S3TC_DXT1_EXT = 0x83F1;
    Texture.COMPRESSED_RGBA_S3TC_DXT3_EXT = 0x83F2;
    Texture.COMPRESSED_RGBA_S3TC_DXT5_EXT = 0x83F3;

    /* TextureMagFilter */
    Texture.NEAREST = glenum.NEAREST;
    Texture.LINEAR = glenum.LINEAR;

    /* TextureMinFilter */
    /*      NEAREST */
    /*      LINEAR */
    Texture.NEAREST_MIPMAP_NEAREST = glenum.NEAREST_MIPMAP_NEAREST;
    Texture.LINEAR_MIPMAP_NEAREST = glenum.LINEAR_MIPMAP_NEAREST;
    Texture.NEAREST_MIPMAP_LINEAR = glenum.NEAREST_MIPMAP_LINEAR;
    Texture.LINEAR_MIPMAP_LINEAR = glenum.LINEAR_MIPMAP_LINEAR;

    /* TextureParameterName */
    // Texture.TEXTURE_MAG_FILTER = glenum.TEXTURE_MAG_FILTER;
    // Texture.TEXTURE_MIN_FILTER = glenum.TEXTURE_MIN_FILTER;

    /* TextureWrapMode */
    Texture.REPEAT = glenum.REPEAT;
    Texture.CLAMP_TO_EDGE = glenum.CLAMP_TO_EDGE;
    Texture.MIRRORED_REPEAT = glenum.MIRRORED_REPEAT;


    module.exports = Texture;


/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/**
 * Mainly do the parse and compile of shader string
 * Support shader code chunk import and export
 * Support shader semantics
 * http://www.nvidia.com/object/using_sas.html
 * https://github.com/KhronosGroup/collada2json/issues/45
 *
 * TODO: Use etpl or other string template engine
 */


    var Base = __webpack_require__(8);
    var util = __webpack_require__(27);
    var Cache = __webpack_require__(45);
    var vendor = __webpack_require__(20);
    var glMatrix = __webpack_require__(1);
    var glInfo = __webpack_require__(17);
    var mat2 = glMatrix.mat2;
    var mat3 = glMatrix.mat3;
    var mat4 = glMatrix.mat4;

    var uniformRegex = /uniform\s+(bool|float|int|vec2|vec3|vec4|ivec2|ivec3|ivec4|mat2|mat3|mat4|sampler2D|samplerCube)\s+([\w\,]+)?(\[.*?\])?\s*(:\s*([\S\s]+?))?;/g;
    var attributeRegex = /attribute\s+(float|int|vec2|vec3|vec4)\s+(\w*)\s*(:\s*(\w+))?;/g;
    var defineRegex = /#define\s+(\w+)?(\s+[\w-.]+)?\s*;?\s*\n/g;
    var loopRegex = /for\s*?\(int\s*?_idx_\s*\=\s*([\w-]+)\;\s*_idx_\s*<\s*([\w-]+);\s*_idx_\s*\+\+\s*\)\s*\{\{([\s\S]+?)(?=\}\})\}\}/g;

    var uniformTypeMap = {
        'bool': '1i',
        'int': '1i',
        'sampler2D': 't',
        'samplerCube': 't',
        'float': '1f',
        'vec2': '2f',
        'vec3': '3f',
        'vec4': '4f',
        'ivec2': '2i',
        'ivec3': '3i',
        'ivec4': '4i',
        'mat2': 'm2',
        'mat3': 'm3',
        'mat4': 'm4'
    };

    var uniformValueConstructor = {
        'bool': function () {return true;},
        'int': function () {return 0;},
        'float': function () {return 0;},
        'sampler2D': function () {return null;},
        'samplerCube': function () {return null;},

        'vec2': function () {return [0, 0];},
        'vec3': function () {return [0, 0, 0];},
        'vec4': function () {return [0, 0, 0, 0];},

        'ivec2': function () {return [0, 0];},
        'ivec3': function () {return [0, 0, 0];},
        'ivec4': function () {return [0, 0, 0, 0];},

        'mat2': function () {return mat2.create();},
        'mat3': function () {return mat3.create();},
        'mat4': function () {return mat4.create();},

        'array': function () {return [];}
    };

    var attribSemantics = [
        'POSITION',
        'NORMAL',
        'BINORMAL',
        'TANGENT',
        'TEXCOORD',
        'TEXCOORD_0',
        'TEXCOORD_1',
        'COLOR',
        // Skinning
        // https://github.com/KhronosGroup/glTF/blob/master/specification/README.md#semantics
        'JOINT',
        'WEIGHT'
    ];
    var uniformSemantics = [
        'SKIN_MATRIX',
        // Information about viewport
        'VIEWPORT_SIZE',
        'VIEWPORT',
        'DEVICEPIXELRATIO',
        // Window size for window relative coordinate
        // https://www.opengl.org/sdk/docs/man/html/gl_FragCoord.xhtml
        'WINDOW_SIZE',
        // Infomation about camera
        'NEAR',
        'FAR',
        // Time
        'TIME'
    ];
    var matrixSemantics = [
        'WORLD',
        'VIEW',
        'PROJECTION',
        'WORLDVIEW',
        'VIEWPROJECTION',
        'WORLDVIEWPROJECTION',
        'WORLDINVERSE',
        'VIEWINVERSE',
        'PROJECTIONINVERSE',
        'WORLDVIEWINVERSE',
        'VIEWPROJECTIONINVERSE',
        'WORLDVIEWPROJECTIONINVERSE',
        'WORLDTRANSPOSE',
        'VIEWTRANSPOSE',
        'PROJECTIONTRANSPOSE',
        'WORLDVIEWTRANSPOSE',
        'VIEWPROJECTIONTRANSPOSE',
        'WORLDVIEWPROJECTIONTRANSPOSE',
        'WORLDINVERSETRANSPOSE',
        'VIEWINVERSETRANSPOSE',
        'PROJECTIONINVERSETRANSPOSE',
        'WORLDVIEWINVERSETRANSPOSE',
        'VIEWPROJECTIONINVERSETRANSPOSE',
        'WORLDVIEWPROJECTIONINVERSETRANSPOSE'
    ];

    // Enable attribute operation is global to all programs
    // Here saved the list of all enabled attribute index
    // http://www.mjbshaw.com/2013/03/webgl-fixing-invalidoperation.html
    var enabledAttributeList = {};

    var SHADER_STATE_TO_ENABLE = 1;
    var SHADER_STATE_KEEP_ENABLE = 2;
    var SHADER_STATE_PENDING = 3;

    /**
     * @constructor qtek.Shader
     * @extends qtek.core.Base
     *
     * @example
     *     // Create a phong shader
     *     var shader = new qtek.Shader({
     *         vertex: qtek.Shader.source('qtek.phong.vertex'),
     *         fragment: qtek.Shader.source('qtek.phong.fragment')
     *     });
     *     // Enable diffuse texture
     *     shader.enableTexture('diffuseMap');
     *     // Use alpha channel in diffuse texture
     *     shader.define('fragment', 'DIFFUSEMAP_ALPHA_ALPHA');
     */
    var Shader = Base.extend(function () {
        return /** @lends qtek.Shader# */ {
            /**
             * Vertex shader code
             * @type {string}
             */
            vertex: '',

            /**
             * Fragment shader code
             * @type {string}
             */
            fragment: '',


            // FIXME mediump is toooooo low for depth on mobile
            precision: 'highp',

            // Properties follow will be generated by the program
            attribSemantics: {},
            matrixSemantics: {},
            uniformSemantics: {},
            matrixSemanticKeys: [],

            uniformTemplates: {},
            attributeTemplates: {},

            /**
             * Custom defined values in the vertex shader
             * @type {Object}
             */
            vertexDefines: {},
            /**
             * Custom defined values in the vertex shader
             * @type {Object}
             */
            fragmentDefines: {},

            /**
             * Enabled extensions
             * @type {Array.<string>}
             */
            extensions: [
                'OES_standard_derivatives',
                'EXT_shader_texture_lod'
            ],

            /**
             * Used light group. default is all zero
             */
            lightGroup: 0,

            // Defines the each type light number in the scene
            // AMBIENT_LIGHT
            // AMBIENT_SH_LIGHT
            // AMBIENT_CUBEMAP_LIGHT
            // POINT_LIGHT
            // SPOT_LIGHT
            // AREA_LIGHT
            lightNumber: {},

            _textureSlot: 0,

            _attacheMaterialNumber: 0,

            _uniformList: [],
            // {
            //  enabled: true
            //  shaderType: "vertex",
            // }
            _textureStatus: {},

            _vertexProcessed: '',
            _fragmentProcessed: '',

            _currentLocationsMap: {}
        };
    }, function () {

        this._cache = new Cache();

        // All context use same code
        this._codeDirty = true;

        this._updateShaderString();
    },
    /** @lends qtek.Shader.prototype */
    {
        isEqual: function (otherShader) {
            if (!otherShader) {
                return false;
            }
            if (this === otherShader) {
                // Still needs update and rebind if dirty.
                return !this._codeDirty;
            }
            if (otherShader._codeDirty) {
                otherShader._updateShaderString();
            }
            if (this._codeDirty) {
                this._updateShaderString();
            }
            return !(otherShader._vertexProcessed !== this._vertexProcessed
                || otherShader._fragmentProcessed !== this._fragmentProcessed);
        },
        /**
         * Set vertex shader code
         * @param {string} str
         */
        setVertex: function (str) {
            this.vertex = str;
            this._updateShaderString();
            this.dirty();
        },

        /**
         * Set fragment shader code
         * @param {string} str
         */
        setFragment: function (str) {
            this.fragment = str;
            this._updateShaderString();
            this.dirty();
        },

        /**
         * Bind shader program
         * Return true or error msg if error happened
         * @param {WebGLRenderingContext} _gl
         */
        bind: function (_gl) {
            var cache = this._cache;
            cache.use(_gl.__GLID__, getCacheSchema);

            this._currentLocationsMap = cache.get('locations');

            // Reset slot
            this._textureSlot = 0;

            if (this._codeDirty) {
                // PENDING
                // var availableExts = [];
                // var extensions = this.extensions;
                // for (var i = 0; i < extensions.length; i++) {
                //     if (glInfo.getExtension(_gl, extensions[i])) {
                //         availableExts.push(extensions[i]);
                //     }
                // }
                this._updateShaderString();
            }

            if (cache.isDirty('program')) {
                var errMsg = this._buildProgram(_gl, this._vertexProcessed, this._fragmentProcessed);
                cache.fresh('program');

                if (errMsg) {
                    return errMsg;
                }
            }

            _gl.useProgram(cache.get('program'));
        },

        /**
         * Mark dirty and update program in next frame
         */
        dirty: function () {
            var cache = this._cache;
            this._codeDirty = true;
            cache.dirtyAll('program');
            for (var i = 0; i < cache._caches.length; i++) {
                if (cache._caches[i]) {
                    var context = cache._caches[i];
                    context['locations'] = {};
                    context['attriblocations'] = {};
                }
            }
        },

        _updateShaderString: function (extensions) {

            if (this.vertex !== this._vertexPrev ||
                this.fragment !== this._fragmentPrev
            ) {

                this._parseImport();

                this.attribSemantics = {};
                this.matrixSemantics = {};
                this._textureStatus = {};

                this._parseUniforms();
                this._parseAttributes();
                this._parseDefines();

                this._vertexPrev = this.vertex;
                this._fragmentPrev = this.fragment;
            }

            this._addDefineExtensionAndPrecision(extensions);

            this._vertexProcessed = this._unrollLoop(this._vertexProcessed, this.vertexDefines);
            this._fragmentProcessed = this._unrollLoop(this._fragmentProcessed, this.fragmentDefines);

            this._codeDirty = false;
        },

        /**
         * Add a #define micro in shader code
         * @param  {string} shaderType Can be vertex, fragment or both
         * @param  {string} symbol
         * @param  {number} [val]
         */
        define: function (shaderType, symbol, val) {
            var vertexDefines = this.vertexDefines;
            var fragmentDefines = this.fragmentDefines;
            if (shaderType !== 'vertex' && shaderType !== 'fragment' && shaderType !== 'both'
                && arguments.length < 3
            ) {
                // shaderType default to be 'both'
                val = symbol;
                symbol = shaderType;
                shaderType = 'both';
            }
            val = val != null ? val : null;
            if (shaderType === 'vertex' || shaderType === 'both') {
                if (vertexDefines[symbol] !== val) {
                    vertexDefines[symbol] = val;
                    // Mark as dirty
                    this.dirty();
                }
            }
            if (shaderType === 'fragment' || shaderType === 'both') {
                if (fragmentDefines[symbol] !== val) {
                    fragmentDefines[symbol] = val;
                    if (shaderType !== 'both') {
                        this.dirty();
                    }
                }
            }
        },

        /**
         * @param  {string} shaderType Can be vertex, fragment or both
         * @param  {string} symbol
         */
        undefine: function (shaderType, symbol) {
            if (shaderType !== 'vertex' && shaderType !== 'fragment' && shaderType !== 'both'
                && arguments.length < 2
            ) {
                // shaderType default to be 'both'
                symbol = shaderType;
                shaderType = 'both';
            }
            if (shaderType === 'vertex' || shaderType === 'both') {
                if (this.isDefined('vertex', symbol)) {
                    delete this.vertexDefines[symbol];
                    // Mark as dirty
                    this.dirty();
                }
            }
            if (shaderType === 'fragment' || shaderType === 'both') {
                if (this.isDefined('fragment', symbol)) {
                    delete this.fragmentDefines[symbol];
                    if (shaderType !== 'both') {
                        this.dirty();
                    }
                }
            }
        },

        /**
         * @param  {string} shaderType Can be vertex, fragment or both
         * @param  {string} symbol
         */
        isDefined: function (shaderType, symbol) {
            switch (shaderType) {
                case 'vertex':
                    return this.vertexDefines[symbol] !== undefined;
                case 'fragment':
                    return this.fragmentDefines[symbol] !== undefined;
            }
        },
        /**
         * @param  {string} shaderType Can be vertex, fragment or both
         * @param  {string} symbol
         */
        getDefine: function (shaderType, symbol) {
            switch(shaderType) {
                case 'vertex':
                    return this.vertexDefines[symbol];
                case 'fragment':
                    return this.fragmentDefines[symbol];
            }
        },
        /**
         * Enable a texture, actually it will add a #define micro in the shader code
         * For example, if texture symbol is diffuseMap, it will add a line `#define DIFFUSEMAP_ENABLED` in the shader code
         * @param  {string} symbol
         */
        enableTexture: function (symbol) {
            if (symbol instanceof Array) {
                for (var i = 0; i < symbol.length; i++) {
                    this.enableTexture(symbol[i]);
                }
                return;
            }

            var status = this._textureStatus[symbol];
            if (status) {
                var isEnabled = status.enabled;
                if (!isEnabled) {
                    status.enabled = true;
                    this.dirty();
                }
            }
        },
        /**
         * Enable all textures used in the shader
         */
        enableTexturesAll: function () {
            var textureStatus = this._textureStatus;
            for (var symbol in textureStatus) {
                textureStatus[symbol].enabled = true;
            }

            this.dirty();
        },
        /**
         * Disable a texture, it remove a #define micro in the shader
         * @param  {string} symbol
         */
        disableTexture: function (symbol) {
            if (symbol instanceof Array) {
                for (var i = 0; i < symbol.length; i++) {
                    this.disableTexture(symbol[i]);
                }
                return;
            }

            var status = this._textureStatus[symbol];
            if (status) {
                var isDisabled = ! status.enabled;
                if (!isDisabled) {
                    status.enabled = false;
                    this.dirty();
                }
            }
        },
        /**
         * Disable all textures used in the shader
         */
        disableTexturesAll: function () {
            var textureStatus = this._textureStatus;
            for (var symbol in textureStatus) {
                textureStatus[symbol].enabled = false;
            }

            this.dirty();
        },
        /**
         * @param  {string}  symbol
         * @return {boolean}
         */
        isTextureEnabled: function (symbol) {
            var textureStatus = this._textureStatus;
            return !!textureStatus[symbol]
                && textureStatus[symbol].enabled;
        },

        getEnabledTextures: function () {
            var enabledTextures = [];
            var textureStatus = this._textureStatus;
            for (var symbol in textureStatus) {
                if (textureStatus[symbol].enabled) {
                    enabledTextures.push(symbol);
                }
            }
            return enabledTextures;
        },

        hasUniform: function (symbol) {
            var location = this._currentLocationsMap[symbol];
            return location !== null && location !== undefined;
        },

        currentTextureSlot: function () {
            return this._textureSlot;
        },

        resetTextureSlot: function (slot) {
            this._textureSlot = slot || 0;
        },

        takeCurrentTextureSlot: function (_gl, texture) {
            var textureSlot = this._textureSlot;

            this.useTextureSlot(_gl, texture, textureSlot);

            this._textureSlot++;

            return textureSlot;
        },

        useTextureSlot: function (_gl, texture, slot) {
            if (texture) {
                _gl.activeTexture(_gl.TEXTURE0 + slot);
                // Maybe texture is not loaded yet;
                if (texture.isRenderable()) {
                    texture.bind(_gl);
                }
                else {
                    // Bind texture to null
                    texture.unbind(_gl);
                }
            }
        },

        setUniform: function (_gl, type, symbol, value) {
            var locationMap = this._currentLocationsMap;
            var location = locationMap[symbol];
            // Uniform is not existed in the shader
            if (location === null || location === undefined) {
                return false;
            }
            switch (type) {
                case 'm4':
                    // The matrix must be created by glmatrix and can pass it directly.
                    _gl.uniformMatrix4fv(location, false, value);
                    break;
                case '2i':
                    _gl.uniform2i(location, value[0], value[1]);
                    break;
                case '2f':
                    _gl.uniform2f(location, value[0], value[1]);
                    break;
                case '3i':
                    _gl.uniform3i(location, value[0], value[1], value[2]);
                    break;
                case '3f':
                    _gl.uniform3f(location, value[0], value[1], value[2]);
                    break;
                case '4i':
                    _gl.uniform4i(location, value[0], value[1], value[2], value[3]);
                    break;
                case '4f':
                    _gl.uniform4f(location, value[0], value[1], value[2], value[3]);
                    break;
                case '1i':
                    _gl.uniform1i(location, value);
                    break;
                case '1f':
                    _gl.uniform1f(location, value);
                    break;
                case '1fv':
                    _gl.uniform1fv(location, value);
                    break;
                case '1iv':
                    _gl.uniform1iv(location, value);
                    break;
                case '2iv':
                    _gl.uniform2iv(location, value);
                    break;
                case '2fv':
                    _gl.uniform2fv(location, value);
                    break;
                case '3iv':
                    _gl.uniform3iv(location, value);
                    break;
                case '3fv':
                    _gl.uniform3fv(location, value);
                    break;
                case '4iv':
                    _gl.uniform4iv(location, value);
                    break;
                case '4fv':
                    _gl.uniform4fv(location, value);
                    break;
                case 'm2':
                case 'm2v':
                    _gl.uniformMatrix2fv(location, false, value);
                    break;
                case 'm3':
                case 'm3v':
                    _gl.uniformMatrix3fv(location, false, value);
                    break;
                case 'm4v':
                    // Raw value
                    if (value instanceof Array) {
                        var array = new vendor.Float32Array(value.length * 16);
                        var cursor = 0;
                        for (var i = 0; i < value.length; i++) {
                            var item = value[i];
                            for (var j = 0; j < 16; j++) {
                                array[cursor++] = item[j];
                            }
                        }
                        _gl.uniformMatrix4fv(location, false, array);
                    }
                    else if (value instanceof vendor.Float32Array) {   // ArrayBufferView
                        _gl.uniformMatrix4fv(location, false, value);
                    }
                    break;
            }
            return true;
        },

        setUniformOfSemantic: function (_gl, semantic, val) {
            var semanticInfo = this.uniformSemantics[semantic];
            if (semanticInfo) {
                return this.setUniform(_gl, semanticInfo.type, semanticInfo.symbol, val);
            }
            return false;
        },

        // Enable the attributes passed in and disable the rest
        // Example Usage:
        // enableAttributes(_gl, ["position", "texcoords"])
        enableAttributes: function (_gl, attribList, vao) {

            var program = this._cache.get('program');

            var locationMap = this._cache.get('attriblocations');

            var enabledAttributeListInContext;
            if (vao) {
                enabledAttributeListInContext = vao.__enabledAttributeList;
            }
            else {
                enabledAttributeListInContext = enabledAttributeList[_gl.__GLID__];
            }
            if (! enabledAttributeListInContext) {
                // In vertex array object context
                // PENDING Each vao object needs to enable attributes again?
                if (vao) {
                    enabledAttributeListInContext
                        = vao.__enabledAttributeList
                        = [];
                }
                else {
                    enabledAttributeListInContext
                        = enabledAttributeList[_gl.__GLID__]
                        = [];
                }
            }
            var locationList = [];
            for (var i = 0; i < attribList.length; i++) {
                var symbol = attribList[i];
                if (!this.attributeTemplates[symbol]) {
                    locationList[i] = -1;
                    continue;
                }
                var location = locationMap[symbol];
                if (location === undefined) {
                    location = _gl.getAttribLocation(program, symbol);
                    // Attrib location is a number from 0 to ...
                    if (location === -1) {
                        locationList[i] = -1;
                        continue;
                    }
                    locationMap[symbol] = location;
                }
                locationList[i] = location;

                if (!enabledAttributeListInContext[location]) {
                    enabledAttributeListInContext[location] = SHADER_STATE_TO_ENABLE;
                }
                else {
                    enabledAttributeListInContext[location] = SHADER_STATE_KEEP_ENABLE;
                }
            }

            for (var i = 0; i < enabledAttributeListInContext.length; i++) {
                switch(enabledAttributeListInContext[i]){
                    case SHADER_STATE_TO_ENABLE:
                        _gl.enableVertexAttribArray(i);
                        enabledAttributeListInContext[i] = SHADER_STATE_PENDING;
                        break;
                    case SHADER_STATE_KEEP_ENABLE:
                        enabledAttributeListInContext[i] = SHADER_STATE_PENDING;
                        break;
                    // Expired
                    case SHADER_STATE_PENDING:
                        _gl.disableVertexAttribArray(i);
                        enabledAttributeListInContext[i] = 0;
                        break;
                }
            }

            return locationList;
        },

        _parseImport: function () {

            this._vertexProcessedWithoutDefine = Shader.parseImport(this.vertex);
            this._fragmentProcessedWithoutDefine = Shader.parseImport(this.fragment);

        },

        _addDefineExtensionAndPrecision: function (extensions) {

            extensions = extensions || this.extensions;
            // Extension declaration must before all non-preprocessor codes
            // TODO vertex ? extension enum ?
            var extensionStr = [];
            for (var i = 0; i < extensions.length; i++) {
                extensionStr.push('#extension GL_' + extensions[i] + ' : enable');
            }

            // Add defines
            // VERTEX
            var defineStr = this._getDefineStr(this.vertexDefines);
            this._vertexProcessed = defineStr + '\n' + this._vertexProcessedWithoutDefine;

            // FRAGMENT
            var defineStr = this._getDefineStr(this.fragmentDefines);
            var code = defineStr + '\n' + this._fragmentProcessedWithoutDefine;

            // Add precision
            this._fragmentProcessed = extensionStr.join('\n') + '\n'
                + ['precision', this.precision, 'float'].join(' ') + ';\n'
                + ['precision', this.precision, 'int'].join(' ') + ';\n'
                // depth texture may have precision problem on iOS device.
                + ['precision', this.precision, 'sampler2D'].join(' ') + ';\n'
                + code;
        },

        _getDefineStr: function (defines) {

            var lightNumber = this.lightNumber;
            var textureStatus = this._textureStatus;
            var defineStr = [];
            for (var lightType in lightNumber) {
                var count = lightNumber[lightType];
                if (count > 0) {
                    defineStr.push('#define ' + lightType.toUpperCase() + '_COUNT ' + count);
                }
            }
            for (var symbol in textureStatus) {
                var status = textureStatus[symbol];
                if (status.enabled) {
                    defineStr.push('#define ' + symbol.toUpperCase() + '_ENABLED');
                }
            }
            // Custom Defines
            for (var symbol in defines) {
                var value = defines[symbol];
                if (value === null) {
                    defineStr.push('#define ' + symbol);
                }
                else{
                    defineStr.push('#define ' + symbol + ' ' + value.toString());
                }
            }
            return defineStr.join('\n');
        },

        _unrollLoop: function (shaderStr, defines) {
            // Loop unroll from three.js, https://github.com/mrdoob/three.js/blob/master/src/renderers/webgl/WebGLProgram.js#L175
            // In some case like shadowMap in loop use 'i' to index value much slower.

            // Loop use _idx_ and increased with _idx_++ will be unrolled
            // Use {{ }} to match the pair so the if statement will not be affected
            // Write like following
            // for (int _idx_ = 0; _idx_ < 4; _idx_++) {{
            //     vec3 color = texture2D(textures[_idx_], uv).rgb;
            // }}
            function replace(match, start, end, snippet) {
                var unroll = '';
                // Try to treat as define
                if (isNaN(start)) {
                    if (start in defines) {
                        start = defines[start];
                    }
                    else {
                        start = lightNumberDefines[start];
                    }
                }
                if (isNaN(end)) {
                    if (end in defines) {
                        end = defines[end];
                    }
                    else {
                        end = lightNumberDefines[end];
                    }
                }
                // TODO Error checking

                for (var idx = parseInt(start); idx < parseInt(end); idx++) {
                    // PENDING Add scope?
                    unroll += '{'
                        + snippet
                            .replace(/float\s*\(\s*_idx_\s*\)/g, idx.toFixed(1))
                            .replace(/_idx_/g, idx)
                    + '}';
                }

                return unroll;
            }

            var lightNumberDefines = {};
            for (var lightType in this.lightNumber) {
                lightNumberDefines[lightType + '_COUNT'] = this.lightNumber[lightType];
            }
            return shaderStr.replace(loopRegex, replace);
        },

        _parseUniforms: function () {
            var uniforms = {};
            var self = this;
            var shaderType = 'vertex';
            this._uniformList = [];

            this._vertexProcessedWithoutDefine = this._vertexProcessedWithoutDefine.replace(uniformRegex, _uniformParser);
            shaderType = 'fragment';
            this._fragmentProcessedWithoutDefine = this._fragmentProcessedWithoutDefine.replace(uniformRegex, _uniformParser);

            self.matrixSemanticKeys = Object.keys(this.matrixSemantics);

            function _uniformParser(str, type, symbol, isArray, semanticWrapper, semantic) {
                if (type && symbol) {
                    var uniformType = uniformTypeMap[type];
                    var isConfigurable = true;
                    var defaultValueFunc;
                    if (uniformType) {
                        self._uniformList.push(symbol);
                        if (type === 'sampler2D' || type === 'samplerCube') {
                            // Texture is default disabled
                            self._textureStatus[symbol] = {
                                enabled: false,
                                shaderType: shaderType
                            };
                        }
                        if (isArray) {
                            uniformType += 'v';
                        }
                        if (semantic) {
                            // This case is only for SKIN_MATRIX
                            // TODO
                            if (attribSemantics.indexOf(semantic) >= 0) {
                                self.attribSemantics[semantic] = {
                                    symbol: symbol,
                                    type: uniformType
                                };
                                isConfigurable = false;
                            }
                            else if (matrixSemantics.indexOf(semantic) >= 0) {
                                var isTranspose = false;
                                var semanticNoTranspose = semantic;
                                if (semantic.match(/TRANSPOSE$/)) {
                                    isTranspose = true;
                                    semanticNoTranspose = semantic.slice(0, -9);
                                }
                                self.matrixSemantics[semantic] = {
                                    symbol: symbol,
                                    type: uniformType,
                                    isTranspose: isTranspose,
                                    semanticNoTranspose: semanticNoTranspose
                                };
                                isConfigurable = false;
                            }
                            else if (uniformSemantics.indexOf(semantic) >= 0) {
                                self.uniformSemantics[semantic] = {
                                    symbol: symbol,
                                    type: uniformType
                                };
                                isConfigurable = false;
                            }
                            else {
                                // The uniform is not configurable, which means it will not appear
                                // in the material uniform properties
                                if (semantic === 'unconfigurable') {
                                    isConfigurable = false;
                                }
                                else {
                                    // Uniform have a defalut value, like
                                    // uniform vec3 color: [1, 1, 1];
                                    defaultValueFunc = self._parseDefaultValue(type, semantic);
                                    if (!defaultValueFunc) {
                                        throw new Error('Unkown semantic "' + semantic + '"');
                                    }
                                    else {
                                        semantic = '';
                                    }
                                }
                            }
                        }

                        if (isConfigurable) {
                            uniforms[symbol] = {
                                type: uniformType,
                                value: isArray ? uniformValueConstructor['array'] : (defaultValueFunc || uniformValueConstructor[type]),
                                semantic: semantic || null
                            };
                        }
                    }
                    return ['uniform', type, symbol, isArray].join(' ') + ';\n';
                }
            }

            this.uniformTemplates = uniforms;
        },

        _parseDefaultValue: function (type, str) {
            var arrayRegex = /\[\s*(.*)\s*\]/;
            if (type === 'vec2' || type === 'vec3' || type === 'vec4') {
                var arrayStr = arrayRegex.exec(str)[1];
                if (arrayStr) {
                    var arr = arrayStr.split(/\s*,\s*/);
                    return function () {
                        return new vendor.Float32Array(arr);
                    };
                }
                else {
                    // Invalid value
                    return;
                }
            }
            else if (type === 'bool') {
                return function () {
                    return str.toLowerCase() === 'true' ? true : false;
                };
            }
            else if (type === 'float') {
                return function () {
                    return parseFloat(str);
                };
            }
            else if (type === 'int') {
                return function () {
                    return parseInt(str);
                };
            }
        },

        // Create a new uniform instance for material
        createUniforms: function () {
            var uniforms = {};

            for (var symbol in this.uniformTemplates){
                var uniformTpl = this.uniformTemplates[symbol];
                uniforms[symbol] = {
                    type: uniformTpl.type,
                    value: uniformTpl.value()
                };
            }

            return uniforms;
        },

        // Attached to material
        attached: function () {
            this._attacheMaterialNumber++;
        },

        // Detached to material
        detached: function () {
            this._attacheMaterialNumber--;
        },

        isAttachedToAny: function () {
            return this._attacheMaterialNumber !== 0;
        },

        _parseAttributes: function () {
            var attributes = {};
            var self = this;
            this._vertexProcessedWithoutDefine = this._vertexProcessedWithoutDefine.replace(
                attributeRegex, _attributeParser
            );

            function _attributeParser(str, type, symbol, semanticWrapper, semantic) {
                if (type && symbol) {
                    var size = 1;
                    switch (type) {
                        case 'vec4':
                            size = 4;
                            break;
                        case 'vec3':
                            size = 3;
                            break;
                        case 'vec2':
                            size = 2;
                            break;
                        case 'float':
                            size = 1;
                            break;
                    }

                    attributes[symbol] = {
                        // Can only be float
                        type: 'float',
                        size: size,
                        semantic: semantic || null
                    };

                    if (semantic) {
                        if (attribSemantics.indexOf(semantic) < 0) {
                            throw new Error('Unkown semantic "' + semantic + '"');
                        }
                        else {
                            self.attribSemantics[semantic] = {
                                symbol: symbol,
                                type: type
                            };
                        }
                    }
                }

                return ['attribute', type, symbol].join(' ') + ';\n';
            }

            this.attributeTemplates = attributes;
        },

        _parseDefines: function () {
            var self = this;
            var shaderType = 'vertex';
            this._vertexProcessedWithoutDefine = this._vertexProcessedWithoutDefine.replace(defineRegex, _defineParser);
            shaderType = 'fragment';
            this._fragmentProcessedWithoutDefine = this._fragmentProcessedWithoutDefine.replace(defineRegex, _defineParser);

            function _defineParser(str, symbol, value) {
                var defines = shaderType === 'vertex' ? self.vertexDefines : self.fragmentDefines;
                if (!defines[symbol]) { // Haven't been defined by user
                    if (value == 'false') {
                        defines[symbol] = false;
                    }
                    else if (value == 'true') {
                        defines[symbol] = true;
                    }
                    else {
                        defines[symbol] = value 
                            // If can parse to float
                            ? (isNaN(parseFloat(value)) ? value : parseFloat(value))
                            : null;
                    }
                }
                return '';
            }
        },

        // Return true or error msg if error happened
        _buildProgram: function (_gl, vertexShaderString, fragmentShaderString) {
            var cache = this._cache;
            if (cache.get('program')) {
                _gl.deleteProgram(cache.get('program'));
            }
            var program = _gl.createProgram();

            var vertexShader = _gl.createShader(_gl.VERTEX_SHADER);
            _gl.shaderSource(vertexShader, vertexShaderString);
            _gl.compileShader(vertexShader);

            var fragmentShader = _gl.createShader(_gl.FRAGMENT_SHADER);
            _gl.shaderSource(fragmentShader, fragmentShaderString);
            _gl.compileShader(fragmentShader);

            var msg = checkShaderErrorMsg(_gl, vertexShader, vertexShaderString);
            if (msg) {
                return msg;
            }
            msg = checkShaderErrorMsg(_gl, fragmentShader, fragmentShaderString);
            if (msg) {
                return msg;
            }

            _gl.attachShader(program, vertexShader);
            _gl.attachShader(program, fragmentShader);
            // Force the position bind to location 0;
            if (this.attribSemantics['POSITION']) {
                _gl.bindAttribLocation(program, 0, this.attribSemantics['POSITION'].symbol);
            }
            else {
                // Else choose an attribute and bind to location 0;
                var keys = Object.keys(this.attributeTemplates);
                _gl.bindAttribLocation(program, 0, keys[0]);
            }

            _gl.linkProgram(program);

            if (!_gl.getProgramParameter(program, _gl.LINK_STATUS)) {
                return 'Could not link program\n' + 'VALIDATE_STATUS: ' + _gl.getProgramParameter(program, _gl.VALIDATE_STATUS) + ', gl error [' + _gl.getError() + ']';
            }

            // Cache uniform locations
            for (var i = 0; i < this._uniformList.length; i++) {
                var uniformSymbol = this._uniformList[i];
                var locationMap = cache.get('locations');
                locationMap[uniformSymbol] = _gl.getUniformLocation(program, uniformSymbol);
            }

            _gl.deleteShader(vertexShader);
            _gl.deleteShader(fragmentShader);

            cache.put('program', program);
        },

        /**
         * Clone a new shader
         * @return {qtek.Shader}
         */
        clone: function () {
            var shader = new Shader({
                vertex: this.vertex,
                fragment: this.fragment,
                vertexDefines: util.clone(this.vertexDefines),
                fragmentDefines: util.clone(this.fragmentDefines)
            });
            for (var name in this._textureStatus) {
                shader._textureStatus[name] = util.clone(this._textureStatus[name]);
            }
            return shader;
        },
        /**
         * Dispose given context
         * @param  {WebGLRenderingContext} _gl
         */
        dispose: function (_gl) {
            var cache = this._cache;

            cache.use(_gl.__GLID__);
            var program = cache.get('program');
            if (program) {
                _gl.deleteProgram(program);
            }
            cache.deleteContext(_gl.__GLID__);

            this._locations = {};
        }
    });

    function getCacheSchema() {
        return {
            locations: {},
            attriblocations: {}
        };
    }

    // Return true or error msg if error happened
    function checkShaderErrorMsg(_gl, shader, shaderString) {
        if (!_gl.getShaderParameter(shader, _gl.COMPILE_STATUS)) {
            return [_gl.getShaderInfoLog(shader), addLineNumbers(shaderString)].join('\n');
        }
    }

    // some util functions
    function addLineNumbers(string) {
        var chunks = string.split('\n');
        for (var i = 0, il = chunks.length; i < il; i ++) {
            // Chrome reports shader errors on lines
            // starting counting from 1
            chunks[i] = (i + 1) + ': ' + chunks[i];
        }
        return chunks.join('\n');
    }

    var importRegex = /(@import)\s*([0-9a-zA-Z_\-\.]*)/g;
    Shader.parseImport = function (shaderStr) {
        shaderStr = shaderStr.replace(importRegex, function (str, importSymbol, importName) {
            var str = Shader.source(importName);
            if (str) {
                // Recursively parse
                return Shader.parseImport(str);
            }
            else {
                console.error('Shader chunk "' + importName + '" not existed in library');
                return '';
            }
        });
        return shaderStr;
    };

    var exportRegex = /(@export)\s*([0-9a-zA-Z_\-\.]*)\s*\n([\s\S]*?)@end/g;

    /**
     * Import shader source
     * @param  {string} shaderStr
     * @memberOf qtek.Shader
     */
    Shader['import'] = function (shaderStr) {
        shaderStr.replace(exportRegex, function (str, exportSymbol, exportName, code) {
            var code = code.replace(/(^[\s\t\xa0\u3000]+)|([\u3000\xa0\s\t]+\x24)/g, '');
            if (code) {
                var parts = exportName.split('.');
                var obj = Shader.codes;
                var i = 0;
                var key;
                while (i < parts.length - 1) {
                    key = parts[i++];
                    if (!obj[key]) {
                        obj[key] = {};
                    }
                    obj = obj[key];
                }
                key = parts[i];
                obj[key] = code;
            }
            return code;
        });
    };

    /**
     * Library to store all the loaded shader codes
     * @type {Object}
     * @readOnly
     * @memberOf qtek.Shader
     */
    Shader.codes = {};

    /**
     * Get shader source
     * @param  {string} name
     * @return {string}
     * @memberOf qtek.Shader
     */
    Shader.source = function (name) {
        var parts = name.split('.');
        var obj = Shader.codes;
        var i = 0;
        while (obj && i < parts.length) {
            var key = parts[i++];
            obj = obj[key];
        }
        if (typeof obj !== 'string') {
            // FIXME Use default instead
            console.error('Shader "' + name + '" not existed in library');
            return '';
        }
        return obj;
    };

    module.exports = Shader;


/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";



    var extendMixin = __webpack_require__(201);
    var notifierMixin = __webpack_require__(53);
    var util = __webpack_require__(27);

    /**
     * Base class of all objects
     * @constructor
     * @alias qtek.core.Base
     * @mixes qtek.core.mixin.notifier
     */
    var Base = function () {
        /**
         * @type {number}
         */
        this.__GUID__ = util.genGUID();
    };

    Base.__initializers__ = [
        function (opts) {
            util.extend(this, opts);
        }
    ];

    util.extend(Base, extendMixin);
    util.extend(Base.prototype, notifierMixin);

    module.exports = Base;


/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";



    var glMatrix = __webpack_require__(1);
    var Vector3 = __webpack_require__(3);
    var mat4 = glMatrix.mat4;
    var vec3 = glMatrix.vec3;
    var mat3 = glMatrix.mat3;
    var quat = glMatrix.quat;

    /**
     * @constructor
     * @alias qtek.math.Matrix4
     */
    var Matrix4 = function() {

        this._axisX = new Vector3();
        this._axisY = new Vector3();
        this._axisZ = new Vector3();

        /**
         * Storage of Matrix4
         * @name _array
         * @type {Float32Array}
         */
        this._array = mat4.create();

        /**
         * @name _dirty
         * @type {boolean}
         */
        this._dirty = true;
    };

    Matrix4.prototype = {

        constructor: Matrix4,

        /**
         * Set components from array
         * @param  {Float32Array|number[]} arr
         */
        setArray: function (arr) {
            for (var i = 0; i < this._array.length; i++) {
                this._array[i] = arr[i];
            }
            this._dirty = true;
            return this;
        },
        /**
         * Calculate the adjugate of self, in-place
         * @return {qtek.math.Matrix4}
         */
        adjoint: function() {
            mat4.adjoint(this._array, this._array);
            this._dirty = true;
            return this;
        },

        /**
         * Clone a new Matrix4
         * @return {qtek.math.Matrix4}
         */
        clone: function() {
            return (new Matrix4()).copy(this);
        },

        /**
         * Copy from b
         * @param  {qtek.math.Matrix4} b
         * @return {qtek.math.Matrix4}
         */
        copy: function(a) {
            mat4.copy(this._array, a._array);
            this._dirty = true;
            return this;
        },

        /**
         * Calculate matrix determinant
         * @return {number}
         */
        determinant: function() {
            return mat4.determinant(this._array);
        },

        /**
         * Set upper 3x3 part from quaternion
         * @param  {qtek.math.Quaternion} q
         * @return {qtek.math.Matrix4}
         */
        fromQuat: function(q) {
            mat4.fromQuat(this._array, q._array);
            this._dirty = true;
            return this;
        },

        /**
         * Set from a quaternion rotation and a vector translation
         * @param  {qtek.math.Quaternion} q
         * @param  {qtek.math.Vector3} v
         * @return {qtek.math.Matrix4}
         */
        fromRotationTranslation: function(q, v) {
            mat4.fromRotationTranslation(this._array, q._array, v._array);
            this._dirty = true;
            return this;
        },

        /**
         * Set from Matrix2d, it is used when converting a 2d shape to 3d space.
         * In 3d space it is equivalent to ranslate on xy plane and rotate about z axis
         * @param  {qtek.math.Matrix2d} m2d
         * @return {qtek.math.Matrix4}
         */
        fromMat2d: function(m2d) {
            Matrix4.fromMat2d(this, m2d);
            return this;
        },

        /**
         * Set from frustum bounds
         * @param  {number} left
         * @param  {number} right
         * @param  {number} bottom
         * @param  {number} top
         * @param  {number} near
         * @param  {number} far
         * @return {qtek.math.Matrix4}
         */
        frustum: function (left, right, bottom, top, near, far) {
            mat4.frustum(this._array, left, right, bottom, top, near, far);
            this._dirty = true;
            return this;
        },

        /**
         * Set to a identity matrix
         * @return {qtek.math.Matrix4}
         */
        identity: function() {
            mat4.identity(this._array);
            this._dirty = true;
            return this;
        },

        /**
         * Invert self
         * @return {qtek.math.Matrix4}
         */
        invert: function() {
            mat4.invert(this._array, this._array);
            this._dirty = true;
            return this;
        },

        /**
         * Set as a matrix with the given eye position, focal point, and up axis
         * @param  {qtek.math.Vector3} eye
         * @param  {qtek.math.Vector3} center
         * @param  {qtek.math.Vector3} up
         * @return {qtek.math.Matrix4}
         */
        lookAt: function(eye, center, up) {
            mat4.lookAt(this._array, eye._array, center._array, up._array);
            this._dirty = true;
            return this;
        },

        /**
         * Alias for mutiply
         * @param  {qtek.math.Matrix4} b
         * @return {qtek.math.Matrix4}
         */
        mul: function(b) {
            mat4.mul(this._array, this._array, b._array);
            this._dirty = true;
            return this;
        },

        /**
         * Alias for multiplyLeft
         * @param  {qtek.math.Matrix4} a
         * @return {qtek.math.Matrix4}
         */
        mulLeft: function(a) {
            mat4.mul(this._array, a._array, this._array);
            this._dirty = true;
            return this;
        },

        /**
         * Multiply self and b
         * @param  {qtek.math.Matrix4} b
         * @return {qtek.math.Matrix4}
         */
        multiply: function(b) {
            mat4.multiply(this._array, this._array, b._array);
            this._dirty = true;
            return this;
        },

        /**
         * Multiply a and self, a is on the left
         * @param  {qtek.math.Matrix3} a
         * @return {qtek.math.Matrix3}
         */
        multiplyLeft: function(a) {
            mat4.multiply(this._array, a._array, this._array);
            this._dirty = true;
            return this;
        },

        /**
         * Set as a orthographic projection matrix
         * @param  {number} left
         * @param  {number} right
         * @param  {number} bottom
         * @param  {number} top
         * @param  {number} near
         * @param  {number} far
         * @return {qtek.math.Matrix4}
         */
        ortho: function(left, right, bottom, top, near, far) {
            mat4.ortho(this._array, left, right, bottom, top, near, far);
            this._dirty = true;
            return this;
        },
        /**
         * Set as a perspective projection matrix
         * @param  {number} fovy
         * @param  {number} aspect
         * @param  {number} near
         * @param  {number} far
         * @return {qtek.math.Matrix4}
         */
        perspective: function(fovy, aspect, near, far) {
            mat4.perspective(this._array, fovy, aspect, near, far);
            this._dirty = true;
            return this;
        },

        /**
         * Rotate self by rad about axis.
         * Equal to right-multiply a rotaion matrix
         * @param  {number}   rad
         * @param  {qtek.math.Vector3} axis
         * @return {qtek.math.Matrix4}
         */
        rotate: function(rad, axis) {
            mat4.rotate(this._array, this._array, rad, axis._array);
            this._dirty = true;
            return this;
        },

        /**
         * Rotate self by a given radian about X axis.
         * Equal to right-multiply a rotaion matrix
         * @param {number} rad
         * @return {qtek.math.Matrix4}
         */
        rotateX: function(rad) {
            mat4.rotateX(this._array, this._array, rad);
            this._dirty = true;
            return this;
        },

        /**
         * Rotate self by a given radian about Y axis.
         * Equal to right-multiply a rotaion matrix
         * @param {number} rad
         * @return {qtek.math.Matrix4}
         */
        rotateY: function(rad) {
            mat4.rotateY(this._array, this._array, rad);
            this._dirty = true;
            return this;
        },

        /**
         * Rotate self by a given radian about Z axis.
         * Equal to right-multiply a rotaion matrix
         * @param {number} rad
         * @return {qtek.math.Matrix4}
         */
        rotateZ: function(rad) {
            mat4.rotateZ(this._array, this._array, rad);
            this._dirty = true;
            return this;
        },

        /**
         * Scale self by s
         * Equal to right-multiply a scale matrix
         * @param  {qtek.math.Vector3}  s
         * @return {qtek.math.Matrix4}
         */
        scale: function(v) {
            mat4.scale(this._array, this._array, v._array);
            this._dirty = true;
            return this;
        },

        /**
         * Translate self by v.
         * Equal to right-multiply a translate matrix
         * @param  {qtek.math.Vector3}  v
         * @return {qtek.math.Matrix4}
         */
        translate: function(v) {
            mat4.translate(this._array, this._array, v._array);
            this._dirty = true;
            return this;
        },

        /**
         * Transpose self, in-place.
         * @return {qtek.math.Matrix2}
         */
        transpose: function() {
            mat4.transpose(this._array, this._array);
            this._dirty = true;
            return this;
        },

        /**
         * Decompose a matrix to SRT
         * @param {qtek.math.Vector3} [scale]
         * @param {qtek.math.Quaternion} rotation
         * @param {qtek.math.Vector} position
         * @see http://msdn.microsoft.com/en-us/library/microsoft.xna.framework.matrix.decompose.aspx
         */
        decomposeMatrix: (function() {

            var x = vec3.create();
            var y = vec3.create();
            var z = vec3.create();

            var m3 = mat3.create();

            return function(scale, rotation, position) {

                var el = this._array;
                vec3.set(x, el[0], el[1], el[2]);
                vec3.set(y, el[4], el[5], el[6]);
                vec3.set(z, el[8], el[9], el[10]);

                var sx = vec3.length(x);
                var sy = vec3.length(y);
                var sz = vec3.length(z);

                // if determine is negative, we need to invert one scale
                var det = this.determinant();
                if (det < 0) {
                    sx = -sx;
                }

                if (scale) {
                    scale.set(sx, sy, sz);
                }

                position.set(el[12], el[13], el[14]);

                mat3.fromMat4(m3, el);
                // Not like mat4, mat3 in glmatrix seems to be row-based
                // Seems fixed in gl-matrix 2.2.2
                // https://github.com/toji/gl-matrix/issues/114
                // mat3.transpose(m3, m3);

                m3[0] /= sx;
                m3[1] /= sx;
                m3[2] /= sx;

                m3[3] /= sy;
                m3[4] /= sy;
                m3[5] /= sy;

                m3[6] /= sz;
                m3[7] /= sz;
                m3[8] /= sz;

                quat.fromMat3(rotation._array, m3);
                quat.normalize(rotation._array, rotation._array);

                rotation._dirty = true;
                position._dirty = true;
            };
        })(),

        toString: function() {
            return '[' + Array.prototype.join.call(this._array, ',') + ']';
        },

        toArray: function () {
            return Array.prototype.slice.call(this._array);
        }
    };

    var defineProperty = Object.defineProperty;

    if (defineProperty) {
        var proto = Matrix4.prototype;
        /**
         * Z Axis of local transform
         * @name z
         * @type {qtek.math.Vector3}
         * @memberOf qtek.math.Matrix4
         * @instance
         */
        defineProperty(proto, 'z', {
            get: function () {
                var el = this._array;
                this._axisZ.set(el[8], el[9], el[10]);
                return this._axisZ;
            },
            set: function (v) {
                // TODO Here has a problem
                // If only set an item of vector will not work
                var el = this._array;
                v = v._array;
                el[8] = v[0];
                el[9] = v[1];
                el[10] = v[2];

                this._dirty = true;
            }
        });

        /**
         * Y Axis of local transform
         * @name y
         * @type {qtek.math.Vector3}
         * @memberOf qtek.math.Matrix4
         * @instance
         */
        defineProperty(proto, 'y', {
            get: function () {
                var el = this._array;
                this._axisY.set(el[4], el[5], el[6]);
                return this._axisY;
            },
            set: function (v) {
                var el = this._array;
                v = v._array;
                el[4] = v[0];
                el[5] = v[1];
                el[6] = v[2];

                this._dirty = true;
            }
        });

        /**
         * X Axis of local transform
         * @name x
         * @type {qtek.math.Vector3}
         * @memberOf qtek.math.Matrix4
         * @instance
         */
        defineProperty(proto, 'x', {
            get: function () {
                var el = this._array;
                this._axisX.set(el[0], el[1], el[2]);
                return this._axisX;
            },
            set: function (v) {
                var el = this._array;
                v = v._array;
                el[0] = v[0];
                el[1] = v[1];
                el[2] = v[2];

                this._dirty = true;
            }
        })
    }

    /**
     * @param  {qtek.math.Matrix4} out
     * @param  {qtek.math.Matrix4} a
     * @return {qtek.math.Matrix4}
     */
    Matrix4.adjoint = function(out, a) {
        mat4.adjoint(out._array, a._array);
        out._dirty = true;
        return out;
    };

    /**
     * @param  {qtek.math.Matrix4} out
     * @param  {qtek.math.Matrix4} a
     * @return {qtek.math.Matrix4}
     */
    Matrix4.copy = function(out, a) {
        mat4.copy(out._array, a._array);
        out._dirty = true;
        return out;
    };

    /**
     * @param  {qtek.math.Matrix4} a
     * @return {number}
     */
    Matrix4.determinant = function(a) {
        return mat4.determinant(a._array);
    };

    /**
     * @param  {qtek.math.Matrix4} out
     * @return {qtek.math.Matrix4}
     */
    Matrix4.identity = function(out) {
        mat4.identity(out._array);
        out._dirty = true;
        return out;
    };

    /**
     * @param  {qtek.math.Matrix4} out
     * @param  {number}  left
     * @param  {number}  right
     * @param  {number}  bottom
     * @param  {number}  top
     * @param  {number}  near
     * @param  {number}  far
     * @return {qtek.math.Matrix4}
     */
    Matrix4.ortho = function(out, left, right, bottom, top, near, far) {
        mat4.ortho(out._array, left, right, bottom, top, near, far);
        out._dirty = true;
        return out;
    };

    /**
     * @param  {qtek.math.Matrix4} out
     * @param  {number}  fovy
     * @param  {number}  aspect
     * @param  {number}  near
     * @param  {number}  far
     * @return {qtek.math.Matrix4}
     */
    Matrix4.perspective = function(out, fovy, aspect, near, far) {
        mat4.perspective(out._array, fovy, aspect, near, far);
        out._dirty = true;
        return out;
    };

    /**
     * @param  {qtek.math.Matrix4} out
     * @param  {qtek.math.Vector3} eye
     * @param  {qtek.math.Vector3} center
     * @param  {qtek.math.Vector3} up
     * @return {qtek.math.Matrix4}
     */
    Matrix4.lookAt = function(out, eye, center, up) {
        mat4.lookAt(out._array, eye._array, center._array, up._array);
        out._dirty = true;
        return out;
    };

    /**
     * @param  {qtek.math.Matrix4} out
     * @param  {qtek.math.Matrix4} a
     * @return {qtek.math.Matrix4}
     */
    Matrix4.invert = function(out, a) {
        mat4.invert(out._array, a._array);
        out._dirty = true;
        return out;
    };

    /**
     * @param  {qtek.math.Matrix4} out
     * @param  {qtek.math.Matrix4} a
     * @param  {qtek.math.Matrix4} b
     * @return {qtek.math.Matrix4}
     */
    Matrix4.mul = function(out, a, b) {
        mat4.mul(out._array, a._array, b._array);
        out._dirty = true;
        return out;
    };

    /**
     * @method
     * @param  {qtek.math.Matrix4} out
     * @param  {qtek.math.Matrix4} a
     * @param  {qtek.math.Matrix4} b
     * @return {qtek.math.Matrix4}
     */
    Matrix4.multiply = Matrix4.mul;

    /**
     * @param  {qtek.math.Matrix4}    out
     * @param  {qtek.math.Quaternion} q
     * @return {qtek.math.Matrix4}
     */
    Matrix4.fromQuat = function(out, q) {
        mat4.fromQuat(out._array, q._array);
        out._dirty = true;
        return out;
    };

    /**
     * @param  {qtek.math.Matrix4}    out
     * @param  {qtek.math.Quaternion} q
     * @param  {qtek.math.Vector3}    v
     * @return {qtek.math.Matrix4}
     */
    Matrix4.fromRotationTranslation = function(out, q, v) {
        mat4.fromRotationTranslation(out._array, q._array, v._array);
        out._dirty = true;
        return out;
    };

    /**
     * @param  {qtek.math.Matrix4} m4
     * @param  {qtek.math.Matrix2d} m2d
     * @return {qtek.math.Matrix4}
     */
    Matrix4.fromMat2d = function(m4, m2d) {
        m4._dirty = true;
        var m2d = m2d._array;
        var m4 = m4._array;

        m4[0] = m2d[0];
        m4[4] = m2d[2];
        m4[12] = m2d[4];

        m4[1] = m2d[1];
        m4[5] = m2d[3];
        m4[13] = m2d[5];

        return m4;
    };

    /**
     * @param  {qtek.math.Matrix4} out
     * @param  {qtek.math.Matrix4} a
     * @param  {number}  rad
     * @param  {qtek.math.Vector3} axis
     * @return {qtek.math.Matrix4}
     */
    Matrix4.rotate = function(out, a, rad, axis) {
        mat4.rotate(out._array, a._array, rad, axis._array);
        out._dirty = true;
        return out;
    };

    /**
     * @param  {qtek.math.Matrix4} out
     * @param  {qtek.math.Matrix4} a
     * @param  {number}  rad
     * @return {qtek.math.Matrix4}
     */
    Matrix4.rotateX = function(out, a, rad) {
        mat4.rotateX(out._array, a._array, rad);
        out._dirty = true;
        return out;
    };

    /**
     * @param  {qtek.math.Matrix4} out
     * @param  {qtek.math.Matrix4} a
     * @param  {number}  rad
     * @return {qtek.math.Matrix4}
     */
    Matrix4.rotateY = function(out, a, rad) {
        mat4.rotateY(out._array, a._array, rad);
        out._dirty = true;
        return out;
    };

    /**
     * @param  {qtek.math.Matrix4} out
     * @param  {qtek.math.Matrix4} a
     * @param  {number}  rad
     * @return {qtek.math.Matrix4}
     */
    Matrix4.rotateZ = function(out, a, rad) {
        mat4.rotateZ(out._array, a._array, rad);
        out._dirty = true;
        return out;
    };

    /**
     * @param  {qtek.math.Matrix4} out
     * @param  {qtek.math.Matrix4} a
     * @param  {qtek.math.Vector3} v
     * @return {qtek.math.Matrix4}
     */
    Matrix4.scale = function(out, a, v) {
        mat4.scale(out._array, a._array, v._array);
        out._dirty = true;
        return out;
    };

    /**
     * @param  {qtek.math.Matrix4} out
     * @param  {qtek.math.Matrix4} a
     * @return {qtek.math.Matrix4}
     */
    Matrix4.transpose = function(out, a) {
        mat4.transpose(out._array, a._array);
        out._dirty = true;
        return out;
    };

    /**
     * @param  {qtek.math.Matrix4} out
     * @param  {qtek.math.Matrix4} a
     * @param  {qtek.math.Vector3} v
     * @return {qtek.math.Matrix4}
     */
    Matrix4.translate = function(out, a, v) {
        mat4.translate(out._array, a._array, v._array);
        out._dirty = true;
        return out;
    };

    module.exports = Matrix4;


/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";



    var Base = __webpack_require__(8);
    var Texture = __webpack_require__(6);
    var TextureCube = __webpack_require__(23);
    var glinfo = __webpack_require__(17);
    var glenum = __webpack_require__(11);
    var Cache = __webpack_require__(45);

    var KEY_FRAMEBUFFER = 'framebuffer';
    var KEY_RENDERBUFFER = 'renderbuffer';
    var KEY_RENDERBUFFER_WIDTH = KEY_RENDERBUFFER + '_width';
    var KEY_RENDERBUFFER_HEIGHT = KEY_RENDERBUFFER + '_height';
    var KEY_RENDERBUFFER_ATTACHED = KEY_RENDERBUFFER + '_attached';
    var KEY_DEPTHTEXTURE_ATTACHED = 'depthtexture_attached';

    var GL_FRAMEBUFFER = glenum.FRAMEBUFFER;
    var GL_RENDERBUFFER = glenum.RENDERBUFFER;
    var GL_DEPTH_ATTACHMENT = glenum.DEPTH_ATTACHMENT;
    var GL_COLOR_ATTACHMENT0 = glenum.COLOR_ATTACHMENT0;
    /**
     * @constructor qtek.FrameBuffer
     * @extends qtek.core.Base
     */
    var FrameBuffer = Base.extend(
    /** @lends qtek.FrameBuffer# */
    {
        /**
         * If use depth buffer
         * @type {boolean}
         */
        depthBuffer: true,

        /**
         * @type {Object}
         */
        viewport: null,

        _width: 0,
        _height: 0,

        _textures: null,

        _boundRenderer: null,
    }, function () {
        // Use cache
        this._cache = new Cache();

        this._textures = {};
    },

    /**@lends qtek.FrameBuffer.prototype. */
    {
        /**
         * Get attached texture width
         * {number}
         */
        // FIXME Can't use before #bind
        getTextureWidth: function () {
            return this._width;
        },

        /**
         * Get attached texture height
         * {number}
         */
        getTextureHeight: function () {
            return this._height;
        },

        /**
         * Bind the framebuffer to given renderer before rendering
         * @param  {qtek.Renderer} renderer
         */
        bind: function (renderer) {

            if (renderer.__currentFrameBuffer) {
                // Already bound
                if (renderer.__currentFrameBuffer === this) {
                    return;
                }

                console.warn('Renderer already bound with another framebuffer. Unbind it first');
            }
            renderer.__currentFrameBuffer = this;

            var _gl = renderer.gl;

            _gl.bindFramebuffer(GL_FRAMEBUFFER, this._getFrameBufferGL(_gl));
            this._boundRenderer = renderer;
            var cache = this._cache;

            cache.put('viewport', renderer.viewport);

            var hasTextureAttached = false;
            var width;
            var height;
            for (var attachment in this._textures) {
                hasTextureAttached = true;
                var obj = this._textures[attachment];
                if (obj) {
                    // TODO Do width, height checking, make sure size are same
                    width = obj.texture.width;
                    height = obj.texture.height;
                    // Attach textures
                    this._doAttach(_gl, obj.texture, attachment, obj.target);
                }
            }

            this._width = width;
            this._height = height;

            if (!hasTextureAttached && this.depthBuffer) {
                console.error('Must attach texture before bind, or renderbuffer may have incorrect width and height.')
            }

            if (this.viewport) {
                renderer.setViewport(this.viewport);
            }
            else {
                renderer.setViewport(0, 0, width, height, 1);
            }

            var attachedTextures = cache.get('attached_textures');
            if (attachedTextures) {
                for (var attachment in attachedTextures) {
                    if (!this._textures[attachment]) {
                        var target = attachedTextures[attachment];
                        this._doDetach(_gl, attachment, target);
                    }
                }
            }
            if (!cache.get(KEY_DEPTHTEXTURE_ATTACHED) && this.depthBuffer) {
                // Create a new render buffer
                if (cache.miss(KEY_RENDERBUFFER)) {
                    cache.put(KEY_RENDERBUFFER, _gl.createRenderbuffer());
                }
                var renderbuffer = cache.get(KEY_RENDERBUFFER);

                if (width !== cache.get(KEY_RENDERBUFFER_WIDTH)
                     || height !== cache.get(KEY_RENDERBUFFER_HEIGHT)) {
                    _gl.bindRenderbuffer(GL_RENDERBUFFER, renderbuffer);
                    _gl.renderbufferStorage(GL_RENDERBUFFER, _gl.DEPTH_COMPONENT16, width, height);
                    cache.put(KEY_RENDERBUFFER_WIDTH, width);
                    cache.put(KEY_RENDERBUFFER_HEIGHT, height);
                    _gl.bindRenderbuffer(GL_RENDERBUFFER, null);
                }
                if (!cache.get(KEY_RENDERBUFFER_ATTACHED)) {
                    _gl.framebufferRenderbuffer(GL_FRAMEBUFFER, GL_DEPTH_ATTACHMENT, GL_RENDERBUFFER, renderbuffer);
                    cache.put(KEY_RENDERBUFFER_ATTACHED, true);
                }
            }
        },

        /**
         * Unbind the frame buffer after rendering
         * @param  {qtek.Renderer} renderer
         */
        unbind: function (renderer) {
            // Remove status record on renderer
            renderer.__currentFrameBuffer = null;

            var _gl = renderer.gl;

            _gl.bindFramebuffer(GL_FRAMEBUFFER, null);
            this._boundRenderer = null;

            this._cache.use(_gl.__GLID__);
            var viewport = this._cache.get('viewport');
            // Reset viewport;
            if (viewport) {
                renderer.setViewport(viewport);
            }

            this.updateMipmap(_gl);
        },

        // Because the data of texture is changed over time,
        // Here update the mipmaps of texture each time after rendered;
        updateMipmap: function (_gl) {
            for (var attachment in this._textures) {
                var obj = this._textures[attachment];
                if (obj) {
                    var texture = obj.texture;
                    // FIXME some texture format can't generate mipmap
                    if (!texture.NPOT && texture.useMipmap
                        && texture.minFilter === Texture.LINEAR_MIPMAP_LINEAR) {
                        var target = texture instanceof TextureCube ? glenum.TEXTURE_CUBE_MAP : glenum.TEXTURE_2D;
                        _gl.bindTexture(target, texture.getWebGLTexture(_gl));
                        _gl.generateMipmap(target);
                        _gl.bindTexture(target, null);
                    }
                }
            }
        },

        /**
         * 0x8CD5, 36053, FRAMEBUFFER_COMPLETE
         * 0x8CD6, 36054, FRAMEBUFFER_INCOMPLETE_ATTACHMENT
         * 0x8CD7, 36055, FRAMEBUFFER_INCOMPLETE_MISSING_ATTACHMENT
         * 0x8CD9, 36057, FRAMEBUFFER_INCOMPLETE_DIMENSIONS
         * 0x8CDD, 36061, FRAMEBUFFER_UNSUPPORTED
         */
        checkStatus: function (_gl) {
            return _gl.checkFramebufferStatus(GL_FRAMEBUFFER);
        },

        _getFrameBufferGL: function (_gl) {
            var cache = this._cache;
            cache.use(_gl.__GLID__);

            if (cache.miss(KEY_FRAMEBUFFER)) {
                cache.put(KEY_FRAMEBUFFER, _gl.createFramebuffer());
            }

            return cache.get(KEY_FRAMEBUFFER);
        },

        /**
         * Attach a texture(RTT) to the framebuffer
         * @param  {qtek.Texture} texture
         * @param  {number} [attachment=gl.COLOR_ATTACHMENT0]
         * @param  {number} [target=gl.TEXTURE_2D]
         */
        attach: function (texture, attachment, target) {

            if (!texture.width) {
                throw new Error('The texture attached to color buffer is not a valid.');
            }
            // TODO width and height check

            // If the depth_texture extension is enabled, developers
            // Can attach a depth texture to the depth buffer
            // http://blog.tojicode.com/2012/07/using-webgldepthtexture.html
            attachment = attachment || GL_COLOR_ATTACHMENT0;
            target = target || glenum.TEXTURE_2D;

            var boundRenderer = this._boundRenderer;
            var _gl = boundRenderer && boundRenderer.gl;
            var attachedTextures;

            if (_gl) {
                var cache = this._cache;
                cache.use(_gl.__GLID__);
                attachedTextures = cache.get('attached_textures');
            }

            // Check if texture attached
            var previous = this._textures[attachment];
            if (previous && previous.target === target
                && previous.texture === texture
                && (attachedTextures && attachedTextures[attachment] != null)
            ) {
                return;
            }

            var canAttach = true;
            if (_gl) {
                canAttach = this._doAttach(_gl, texture, attachment, target);
                // Set viewport again incase attached to different size textures.
                if (!this.viewport) {
                    boundRenderer.setViewport(0, 0, texture.width, texture.height, 1);
                }
            }

            if (canAttach) {
                this._textures[attachment] = this._textures[attachment] || {};
                this._textures[attachment].texture = texture;
                this._textures[attachment].target = target;
            }
        },

        _doAttach: function (_gl, texture, attachment, target) {

            // Make sure texture is always updated
            // Because texture width or height may be changed and in this we can't be notified
            // FIXME awkward;
            var webglTexture = texture.getWebGLTexture(_gl);
            // Assume cache has been used.
            var attachedTextures = this._cache.get('attached_textures');
            if (attachedTextures && attachedTextures[attachment]) {
                var obj = attachedTextures[attachment];
                // Check if texture and target not changed
                if (obj.texture === texture && obj.target === target) {
                    return;
                }
            }
            attachment = +attachment;

            var canAttach = true;
            if (attachment === GL_DEPTH_ATTACHMENT || attachment === glenum.DEPTH_STENCIL_ATTACHMENT) {
                var extension = glinfo.getExtension(_gl, 'WEBGL_depth_texture');

                if (!extension) {
                    console.error('Depth texture is not supported by the browser');
                    canAttach = false;
                }
                if (texture.format !== glenum.DEPTH_COMPONENT
                    && texture.format !== glenum.DEPTH_STENCIL
                ) {
                    console.error('The texture attached to depth buffer is not a valid.');
                    canAttach = false;
                }

                // Dispose render buffer created previous
                if (canAttach) {
                    var renderbuffer = this._cache.get(KEY_RENDERBUFFER);
                    if (renderbuffer) {
                        _gl.framebufferRenderbuffer(GL_FRAMEBUFFER, GL_DEPTH_ATTACHMENT, GL_RENDERBUFFER, null);
                        _gl.deleteRenderbuffer(renderbuffer);
                        this._cache.put(KEY_RENDERBUFFER, false);
                    }

                    this._cache.put(KEY_RENDERBUFFER_ATTACHED, false);
                    this._cache.put(KEY_DEPTHTEXTURE_ATTACHED, true);
                }
            }

            // Mipmap level can only be 0
            _gl.framebufferTexture2D(GL_FRAMEBUFFER, attachment, target, webglTexture, 0);

            if (!attachedTextures) {
                attachedTextures = {};
                this._cache.put('attached_textures', attachedTextures);
            }
            attachedTextures[attachment] = attachedTextures[attachment] || {};
            attachedTextures[attachment].texture = texture;
            attachedTextures[attachment].target = target;

            return canAttach;
        },

        _doDetach: function (_gl, attachment, target) {
            // Detach a texture from framebuffer
            // https://github.com/KhronosGroup/WebGL/blob/master/conformance-suites/1.0.0/conformance/framebuffer-test.html#L145
            _gl.framebufferTexture2D(GL_FRAMEBUFFER, attachment, target, null, 0);

            // Assume cache has been used.
            var attachedTextures = this._cache.get('attached_textures');
            if (attachedTextures && attachedTextures[attachment]) {
                attachedTextures[attachment] = null;
            }

            if (attachment === GL_DEPTH_ATTACHMENT || attachment === glenum.DEPTH_STENCIL_ATTACHMENT) {
                this._cache.put(KEY_DEPTHTEXTURE_ATTACHED, false);
            }
        },

        /**
         * Detach a texture
         * @param  {number} [attachment=gl.COLOR_ATTACHMENT0]
         * @param  {number} [target=gl.TEXTURE_2D]
         */
        detach: function (attachment, target) {
            // TODO depth extension check ?
            this._textures[attachment] = null;
            if (this._boundRenderer) {
                var gl = this._boundRenderer.gl;
                var cache = this._cache;
                cache.use(gl.__GLID__);
                this._doDetach(gl, attachment, target);
            }
        },
        /**
         * Dispose
         * @param  {WebGLRenderingContext} _gl
         */
        dispose: function (_gl) {

            var cache = this._cache;

            cache.use(_gl.__GLID__);

            var renderBuffer = cache.get(KEY_RENDERBUFFER);
            if (renderBuffer) {
                _gl.deleteRenderbuffer(renderBuffer);
            }
            var frameBuffer = cache.get(KEY_FRAMEBUFFER);
            if (frameBuffer) {
                _gl.deleteFramebuffer(frameBuffer);
            }
            cache.deleteContext(_gl.__GLID__);

            // Clear cache for reusing
            this._textures = {};

        }
    });

    FrameBuffer.DEPTH_ATTACHMENT = GL_DEPTH_ATTACHMENT;
    FrameBuffer.COLOR_ATTACHMENT0 = GL_COLOR_ATTACHMENT0;
    FrameBuffer.STENCIL_ATTACHMENT = glenum.STENCIL_ATTACHMENT;
    FrameBuffer.DEPTH_STENCIL_ATTACHMENT = glenum.DEPTH_STENCIL_ATTACHMENT;

    module.exports = FrameBuffer;


/***/ }),
/* 11 */
/***/ (function(module, exports) {

/**
 * @namespace qtek.core.glenum
 * @see http://www.khronos.org/registry/webgl/specs/latest/1.0/#5.14
 */


module.exports = {
    /* ClearBufferMask */
    DEPTH_BUFFER_BIT               : 0x00000100,
    STENCIL_BUFFER_BIT             : 0x00000400,
    COLOR_BUFFER_BIT               : 0x00004000,

    /* BeginMode */
    POINTS                         : 0x0000,
    LINES                          : 0x0001,
    LINE_LOOP                      : 0x0002,
    LINE_STRIP                     : 0x0003,
    TRIANGLES                      : 0x0004,
    TRIANGLE_STRIP                 : 0x0005,
    TRIANGLE_FAN                   : 0x0006,

    /* AlphaFunction (not supported in ES20) */
    /*      NEVER */
    /*      LESS */
    /*      EQUAL */
    /*      LEQUAL */
    /*      GREATER */
    /*      NOTEQUAL */
    /*      GEQUAL */
    /*      ALWAYS */

    /* BlendingFactorDest */
    ZERO                           : 0,
    ONE                            : 1,
    SRC_COLOR                      : 0x0300,
    ONE_MINUS_SRC_COLOR            : 0x0301,
    SRC_ALPHA                      : 0x0302,
    ONE_MINUS_SRC_ALPHA            : 0x0303,
    DST_ALPHA                      : 0x0304,
    ONE_MINUS_DST_ALPHA            : 0x0305,

    /* BlendingFactorSrc */
    /*      ZERO */
    /*      ONE */
    DST_COLOR                      : 0x0306,
    ONE_MINUS_DST_COLOR            : 0x0307,
    SRC_ALPHA_SATURATE             : 0x0308,
    /*      SRC_ALPHA */
    /*      ONE_MINUS_SRC_ALPHA */
    /*      DST_ALPHA */
    /*      ONE_MINUS_DST_ALPHA */

    /* BlendEquationSeparate */
    FUNC_ADD                       : 0x8006,
    BLEND_EQUATION                 : 0x8009,
    BLEND_EQUATION_RGB             : 0x8009, /* same as BLEND_EQUATION */
    BLEND_EQUATION_ALPHA           : 0x883D,

    /* BlendSubtract */
    FUNC_SUBTRACT                  : 0x800A,
    FUNC_REVERSE_SUBTRACT          : 0x800B,

    /* Separate Blend Functions */
    BLEND_DST_RGB                  : 0x80C8,
    BLEND_SRC_RGB                  : 0x80C9,
    BLEND_DST_ALPHA                : 0x80CA,
    BLEND_SRC_ALPHA                : 0x80CB,
    CONSTANT_COLOR                 : 0x8001,
    ONE_MINUS_CONSTANT_COLOR       : 0x8002,
    CONSTANT_ALPHA                 : 0x8003,
    ONE_MINUS_CONSTANT_ALPHA       : 0x8004,
    BLEND_COLOR                    : 0x8005,

    /* Buffer Objects */
    ARRAY_BUFFER                   : 0x8892,
    ELEMENT_ARRAY_BUFFER           : 0x8893,
    ARRAY_BUFFER_BINDING           : 0x8894,
    ELEMENT_ARRAY_BUFFER_BINDING   : 0x8895,

    STREAM_DRAW                    : 0x88E0,
    STATIC_DRAW                    : 0x88E4,
    DYNAMIC_DRAW                   : 0x88E8,

    BUFFER_SIZE                    : 0x8764,
    BUFFER_USAGE                   : 0x8765,

    CURRENT_VERTEX_ATTRIB          : 0x8626,

    /* CullFaceMode */
    FRONT                          : 0x0404,
    BACK                           : 0x0405,
    FRONT_AND_BACK                 : 0x0408,

    /* DepthFunction */
    /*      NEVER */
    /*      LESS */
    /*      EQUAL */
    /*      LEQUAL */
    /*      GREATER */
    /*      NOTEQUAL */
    /*      GEQUAL */
    /*      ALWAYS */

    /* EnableCap */
    /* TEXTURE_2D */
    CULL_FACE                      : 0x0B44,
    BLEND                          : 0x0BE2,
    DITHER                         : 0x0BD0,
    STENCIL_TEST                   : 0x0B90,
    DEPTH_TEST                     : 0x0B71,
    SCISSOR_TEST                   : 0x0C11,
    POLYGON_OFFSET_FILL            : 0x8037,
    SAMPLE_ALPHA_TO_COVERAGE       : 0x809E,
    SAMPLE_COVERAGE                : 0x80A0,

    /* ErrorCode */
    NO_ERROR                       : 0,
    INVALID_ENUM                   : 0x0500,
    INVALID_VALUE                  : 0x0501,
    INVALID_OPERATION              : 0x0502,
    OUT_OF_MEMORY                  : 0x0505,

    /* FrontFaceDirection */
    CW                             : 0x0900,
    CCW                            : 0x0901,

    /* GetPName */
    LINE_WIDTH                     : 0x0B21,
    ALIASED_POINT_SIZE_RANGE       : 0x846D,
    ALIASED_LINE_WIDTH_RANGE       : 0x846E,
    CULL_FACE_MODE                 : 0x0B45,
    FRONT_FACE                     : 0x0B46,
    DEPTH_RANGE                    : 0x0B70,
    DEPTH_WRITEMASK                : 0x0B72,
    DEPTH_CLEAR_VALUE              : 0x0B73,
    DEPTH_FUNC                     : 0x0B74,
    STENCIL_CLEAR_VALUE            : 0x0B91,
    STENCIL_FUNC                   : 0x0B92,
    STENCIL_FAIL                   : 0x0B94,
    STENCIL_PASS_DEPTH_FAIL        : 0x0B95,
    STENCIL_PASS_DEPTH_PASS        : 0x0B96,
    STENCIL_REF                    : 0x0B97,
    STENCIL_VALUE_MASK             : 0x0B93,
    STENCIL_WRITEMASK              : 0x0B98,
    STENCIL_BACK_FUNC              : 0x8800,
    STENCIL_BACK_FAIL              : 0x8801,
    STENCIL_BACK_PASS_DEPTH_FAIL   : 0x8802,
    STENCIL_BACK_PASS_DEPTH_PASS   : 0x8803,
    STENCIL_BACK_REF               : 0x8CA3,
    STENCIL_BACK_VALUE_MASK        : 0x8CA4,
    STENCIL_BACK_WRITEMASK         : 0x8CA5,
    VIEWPORT                       : 0x0BA2,
    SCISSOR_BOX                    : 0x0C10,
    /*      SCISSOR_TEST */
    COLOR_CLEAR_VALUE              : 0x0C22,
    COLOR_WRITEMASK                : 0x0C23,
    UNPACK_ALIGNMENT               : 0x0CF5,
    PACK_ALIGNMENT                 : 0x0D05,
    MAX_TEXTURE_SIZE               : 0x0D33,
    MAX_VIEWPORT_DIMS              : 0x0D3A,
    SUBPIXEL_BITS                  : 0x0D50,
    RED_BITS                       : 0x0D52,
    GREEN_BITS                     : 0x0D53,
    BLUE_BITS                      : 0x0D54,
    ALPHA_BITS                     : 0x0D55,
    DEPTH_BITS                     : 0x0D56,
    STENCIL_BITS                   : 0x0D57,
    POLYGON_OFFSET_UNITS           : 0x2A00,
    /*      POLYGON_OFFSET_FILL */
    POLYGON_OFFSET_FACTOR          : 0x8038,
    TEXTURE_BINDING_2D             : 0x8069,
    SAMPLE_BUFFERS                 : 0x80A8,
    SAMPLES                        : 0x80A9,
    SAMPLE_COVERAGE_VALUE          : 0x80AA,
    SAMPLE_COVERAGE_INVERT         : 0x80AB,

    /* GetTextureParameter */
    /*      TEXTURE_MAG_FILTER */
    /*      TEXTURE_MIN_FILTER */
    /*      TEXTURE_WRAP_S */
    /*      TEXTURE_WRAP_T */

    COMPRESSED_TEXTURE_FORMATS     : 0x86A3,

    /* HintMode */
    DONT_CARE                      : 0x1100,
    FASTEST                        : 0x1101,
    NICEST                         : 0x1102,

    /* HintTarget */
    GENERATE_MIPMAP_HINT            : 0x8192,

    /* DataType */
    BYTE                           : 0x1400,
    UNSIGNED_BYTE                  : 0x1401,
    SHORT                          : 0x1402,
    UNSIGNED_SHORT                 : 0x1403,
    INT                            : 0x1404,
    UNSIGNED_INT                   : 0x1405,
    FLOAT                          : 0x1406,

    /* PixelFormat */
    DEPTH_COMPONENT                : 0x1902,
    ALPHA                          : 0x1906,
    RGB                            : 0x1907,
    RGBA                           : 0x1908,
    LUMINANCE                      : 0x1909,
    LUMINANCE_ALPHA                : 0x190A,

    /* PixelType */
    /*      UNSIGNED_BYTE */
    UNSIGNED_SHORT_4_4_4_4         : 0x8033,
    UNSIGNED_SHORT_5_5_5_1         : 0x8034,
    UNSIGNED_SHORT_5_6_5           : 0x8363,

    /* Shaders */
    FRAGMENT_SHADER                  : 0x8B30,
    VERTEX_SHADER                    : 0x8B31,
    MAX_VERTEX_ATTRIBS               : 0x8869,
    MAX_VERTEX_UNIFORM_VECTORS       : 0x8DFB,
    MAX_VARYING_VECTORS              : 0x8DFC,
    MAX_COMBINED_TEXTURE_IMAGE_UNITS : 0x8B4D,
    MAX_VERTEX_TEXTURE_IMAGE_UNITS   : 0x8B4C,
    MAX_TEXTURE_IMAGE_UNITS          : 0x8872,
    MAX_FRAGMENT_UNIFORM_VECTORS     : 0x8DFD,
    SHADER_TYPE                      : 0x8B4F,
    DELETE_STATUS                    : 0x8B80,
    LINK_STATUS                      : 0x8B82,
    VALIDATE_STATUS                  : 0x8B83,
    ATTACHED_SHADERS                 : 0x8B85,
    ACTIVE_UNIFORMS                  : 0x8B86,
    ACTIVE_ATTRIBUTES                : 0x8B89,
    SHADING_LANGUAGE_VERSION         : 0x8B8C,
    CURRENT_PROGRAM                  : 0x8B8D,

    /* StencilFunction */
    NEVER                          : 0x0200,
    LESS                           : 0x0201,
    EQUAL                          : 0x0202,
    LEQUAL                         : 0x0203,
    GREATER                        : 0x0204,
    NOTEQUAL                       : 0x0205,
    GEQUAL                         : 0x0206,
    ALWAYS                         : 0x0207,

    /* StencilOp */
    /*      ZERO */
    KEEP                           : 0x1E00,
    REPLACE                        : 0x1E01,
    INCR                           : 0x1E02,
    DECR                           : 0x1E03,
    INVERT                         : 0x150A,
    INCR_WRAP                      : 0x8507,
    DECR_WRAP                      : 0x8508,

    /* StringName */
    VENDOR                         : 0x1F00,
    RENDERER                       : 0x1F01,
    VERSION                        : 0x1F02,

    /* TextureMagFilter */
    NEAREST                        : 0x2600,
    LINEAR                         : 0x2601,

    /* TextureMinFilter */
    /*      NEAREST */
    /*      LINEAR */
    NEAREST_MIPMAP_NEAREST         : 0x2700,
    LINEAR_MIPMAP_NEAREST          : 0x2701,
    NEAREST_MIPMAP_LINEAR          : 0x2702,
    LINEAR_MIPMAP_LINEAR           : 0x2703,

    /* TextureParameterName */
    TEXTURE_MAG_FILTER             : 0x2800,
    TEXTURE_MIN_FILTER             : 0x2801,
    TEXTURE_WRAP_S                 : 0x2802,
    TEXTURE_WRAP_T                 : 0x2803,

    /* TextureTarget */
    TEXTURE_2D                     : 0x0DE1,
    TEXTURE                        : 0x1702,

    TEXTURE_CUBE_MAP               : 0x8513,
    TEXTURE_BINDING_CUBE_MAP       : 0x8514,
    TEXTURE_CUBE_MAP_POSITIVE_X    : 0x8515,
    TEXTURE_CUBE_MAP_NEGATIVE_X    : 0x8516,
    TEXTURE_CUBE_MAP_POSITIVE_Y    : 0x8517,
    TEXTURE_CUBE_MAP_NEGATIVE_Y    : 0x8518,
    TEXTURE_CUBE_MAP_POSITIVE_Z    : 0x8519,
    TEXTURE_CUBE_MAP_NEGATIVE_Z    : 0x851A,
    MAX_CUBE_MAP_TEXTURE_SIZE      : 0x851C,

    /* TextureUnit */
    TEXTURE0                       : 0x84C0,
    TEXTURE1                       : 0x84C1,
    TEXTURE2                       : 0x84C2,
    TEXTURE3                       : 0x84C3,
    TEXTURE4                       : 0x84C4,
    TEXTURE5                       : 0x84C5,
    TEXTURE6                       : 0x84C6,
    TEXTURE7                       : 0x84C7,
    TEXTURE8                       : 0x84C8,
    TEXTURE9                       : 0x84C9,
    TEXTURE10                      : 0x84CA,
    TEXTURE11                      : 0x84CB,
    TEXTURE12                      : 0x84CC,
    TEXTURE13                      : 0x84CD,
    TEXTURE14                      : 0x84CE,
    TEXTURE15                      : 0x84CF,
    TEXTURE16                      : 0x84D0,
    TEXTURE17                      : 0x84D1,
    TEXTURE18                      : 0x84D2,
    TEXTURE19                      : 0x84D3,
    TEXTURE20                      : 0x84D4,
    TEXTURE21                      : 0x84D5,
    TEXTURE22                      : 0x84D6,
    TEXTURE23                      : 0x84D7,
    TEXTURE24                      : 0x84D8,
    TEXTURE25                      : 0x84D9,
    TEXTURE26                      : 0x84DA,
    TEXTURE27                      : 0x84DB,
    TEXTURE28                      : 0x84DC,
    TEXTURE29                      : 0x84DD,
    TEXTURE30                      : 0x84DE,
    TEXTURE31                      : 0x84DF,
    ACTIVE_TEXTURE                 : 0x84E0,

    /* TextureWrapMode */
    REPEAT                         : 0x2901,
    CLAMP_TO_EDGE                  : 0x812F,
    MIRRORED_REPEAT                : 0x8370,

    /* Uniform Types */
    FLOAT_VEC2                     : 0x8B50,
    FLOAT_VEC3                     : 0x8B51,
    FLOAT_VEC4                     : 0x8B52,
    INT_VEC2                       : 0x8B53,
    INT_VEC3                       : 0x8B54,
    INT_VEC4                       : 0x8B55,
    BOOL                           : 0x8B56,
    BOOL_VEC2                      : 0x8B57,
    BOOL_VEC3                      : 0x8B58,
    BOOL_VEC4                      : 0x8B59,
    FLOAT_MAT2                     : 0x8B5A,
    FLOAT_MAT3                     : 0x8B5B,
    FLOAT_MAT4                     : 0x8B5C,
    SAMPLER_2D                     : 0x8B5E,
    SAMPLER_CUBE                   : 0x8B60,

    /* Vertex Arrays */
    VERTEX_ATTRIB_ARRAY_ENABLED        : 0x8622,
    VERTEX_ATTRIB_ARRAY_SIZE           : 0x8623,
    VERTEX_ATTRIB_ARRAY_STRIDE         : 0x8624,
    VERTEX_ATTRIB_ARRAY_TYPE           : 0x8625,
    VERTEX_ATTRIB_ARRAY_NORMALIZED     : 0x886A,
    VERTEX_ATTRIB_ARRAY_POINTER        : 0x8645,
    VERTEX_ATTRIB_ARRAY_BUFFER_BINDING : 0x889F,

    /* Shader Source */
    COMPILE_STATUS                 : 0x8B81,

    /* Shader Precision-Specified Types */
    LOW_FLOAT                      : 0x8DF0,
    MEDIUM_FLOAT                   : 0x8DF1,
    HIGH_FLOAT                     : 0x8DF2,
    LOW_INT                        : 0x8DF3,
    MEDIUM_INT                     : 0x8DF4,
    HIGH_INT                       : 0x8DF5,

    /* Framebuffer Object. */
    FRAMEBUFFER                    : 0x8D40,
    RENDERBUFFER                   : 0x8D41,

    RGBA4                          : 0x8056,
    RGB5_A1                        : 0x8057,
    RGB565                         : 0x8D62,
    DEPTH_COMPONENT16              : 0x81A5,
    STENCIL_INDEX                  : 0x1901,
    STENCIL_INDEX8                 : 0x8D48,
    DEPTH_STENCIL                  : 0x84F9,

    RENDERBUFFER_WIDTH             : 0x8D42,
    RENDERBUFFER_HEIGHT            : 0x8D43,
    RENDERBUFFER_INTERNAL_FORMAT   : 0x8D44,
    RENDERBUFFER_RED_SIZE          : 0x8D50,
    RENDERBUFFER_GREEN_SIZE        : 0x8D51,
    RENDERBUFFER_BLUE_SIZE         : 0x8D52,
    RENDERBUFFER_ALPHA_SIZE        : 0x8D53,
    RENDERBUFFER_DEPTH_SIZE        : 0x8D54,
    RENDERBUFFER_STENCIL_SIZE      : 0x8D55,

    FRAMEBUFFER_ATTACHMENT_OBJECT_TYPE           : 0x8CD0,
    FRAMEBUFFER_ATTACHMENT_OBJECT_NAME           : 0x8CD1,
    FRAMEBUFFER_ATTACHMENT_TEXTURE_LEVEL         : 0x8CD2,
    FRAMEBUFFER_ATTACHMENT_TEXTURE_CUBE_MAP_FACE : 0x8CD3,

    COLOR_ATTACHMENT0              : 0x8CE0,
    DEPTH_ATTACHMENT               : 0x8D00,
    STENCIL_ATTACHMENT             : 0x8D20,
    DEPTH_STENCIL_ATTACHMENT       : 0x821A,

    NONE                           : 0,

    FRAMEBUFFER_COMPLETE                      : 0x8CD5,
    FRAMEBUFFER_INCOMPLETE_ATTACHMENT         : 0x8CD6,
    FRAMEBUFFER_INCOMPLETE_MISSING_ATTACHMENT : 0x8CD7,
    FRAMEBUFFER_INCOMPLETE_DIMENSIONS         : 0x8CD9,
    FRAMEBUFFER_UNSUPPORTED                   : 0x8CDD,

    FRAMEBUFFER_BINDING            : 0x8CA6,
    RENDERBUFFER_BINDING           : 0x8CA7,
    MAX_RENDERBUFFER_SIZE          : 0x84E8,

    INVALID_FRAMEBUFFER_OPERATION  : 0x0506,

    /* WebGL-specific enums */
    UNPACK_FLIP_Y_WEBGL            : 0x9240,
    UNPACK_PREMULTIPLY_ALPHA_WEBGL : 0x9241,
    CONTEXT_LOST_WEBGL             : 0x9242,
    UNPACK_COLORSPACE_CONVERSION_WEBGL : 0x9243,
    BROWSER_DEFAULT_WEBGL          : 0x9244,
};


/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";



    var Base = __webpack_require__(8);
    var OrthoCamera = __webpack_require__(36);
    var Plane = __webpack_require__(46);
    var Shader = __webpack_require__(7);
    var Material = __webpack_require__(16);
    var Mesh = __webpack_require__(25);
    var glinfo = __webpack_require__(17);
    var glenum = __webpack_require__(11);

    Shader['import'](__webpack_require__(222));

    var planeGeo = new Plane();
    var mesh = new Mesh({
        geometry: planeGeo,
        frustumCulling: false
    });
    var camera = new OrthoCamera();

    /**
     * @constructor qtek.compositor.Pass
     * @extends qtek.core.Base
     */
    var Pass = Base.extend(function () {
        return /** @lends qtek.compositor.Pass# */ {
            /**
             * Fragment shader string
             * @type {string}
             */
            // PENDING shader or fragment ?
            fragment : '',

            /**
             * @type {Object}
             */
            outputs : null,

            /**
             * @type {qtek.Material}
             */
            material : null,

            /**
             * @type {Boolean}
             */
            blendWithPrevious: false,

            /**
             * @type {Boolean}
             */
            clearColor: false,

            /**
             * @type {Boolean}
             */
            clearDepth: true
        };
    }, function() {

        var shader = new Shader({
            vertex : Shader.source('qtek.compositor.vertex'),
            fragment : this.fragment
        });
        var material = new Material({
            shader : shader
        });
        shader.enableTexturesAll();

        this.material = material;

    },
    /** @lends qtek.compositor.Pass.prototype */
    {
        /**
         * @param {string} name
         * @param {} value
         */
        setUniform : function(name, value) {
            var uniform = this.material.uniforms[name];
            if (uniform) {
                uniform.value = value;
            }
        },
        /**
         * @param  {string} name
         * @return {}
         */
        getUniform : function(name) {
            var uniform = this.material.uniforms[name];
            if (uniform) {
                return uniform.value;
            }
        },
        /**
         * @param  {qtek.Texture} texture
         * @param  {number} attachment
         */
        attachOutput : function(texture, attachment) {
            if (!this.outputs) {
                this.outputs = {};
            }
            attachment = attachment || glenum.COLOR_ATTACHMENT0;
            this.outputs[attachment] = texture;
        },
        /**
         * @param  {qtek.Texture} texture
         */
        detachOutput : function(texture) {
            for (var attachment in this.outputs) {
                if (this.outputs[attachment] === texture) {
                    this.outputs[attachment] = null;
                }
            }
        },

        bind : function(renderer, frameBuffer) {

            if (this.outputs) {
                for (var attachment in this.outputs) {
                    var texture = this.outputs[attachment];
                    if (texture) {
                        frameBuffer.attach(texture, attachment);
                    }
                }
            }

            if (frameBuffer) {
                frameBuffer.bind(renderer);
            }
        },

        unbind : function(renderer, frameBuffer) {
            frameBuffer.unbind(renderer);
        },
        /**
         * @param  {qtek.Renderer} renderer
         * @param  {qtek.FrameBuffer} [frameBuffer]
         */
        render : function(renderer, frameBuffer) {

            var _gl = renderer.gl;

            if (frameBuffer) {
                this.bind(renderer, frameBuffer);
                // MRT Support in chrome
                // https://www.khronos.org/registry/webgl/sdk/tests/conformance/extensions/ext-draw-buffers.html
                var ext = glinfo.getExtension(_gl, 'EXT_draw_buffers');
                if (ext && this.outputs) {
                    var bufs = [];
                    for (var attachment in this.outputs) {
                        attachment = +attachment;
                        if (attachment >= _gl.COLOR_ATTACHMENT0 && attachment <= _gl.COLOR_ATTACHMENT0 + 8) {
                            bufs.push(attachment);
                        }
                    }
                    ext.drawBuffersEXT(bufs);
                }
            }

            this.trigger('beforerender', this, renderer);

            // FIXME Don't clear in each pass in default, let the color overwrite the buffer
            // FIXME pixels may be discard
            var clearBit = this.clearDepth ? _gl.DEPTH_BUFFER_BIT : 0;
            _gl.depthMask(true);
            if (this.clearColor) {
                clearBit = clearBit | _gl.COLOR_BUFFER_BIT;
                _gl.colorMask(true, true, true, true);
                var cc = this.clearColor;
                if (cc instanceof Array) {
                    _gl.clearColor(cc[0], cc[1], cc[2], cc[3]);
                }
            }
            _gl.clear(clearBit);

            if (this.blendWithPrevious) {
                // Blend with previous rendered scene in the final output
                // FIXME Configure blend.
                // FIXME It will cause screen blink？
                _gl.enable(_gl.BLEND);
                this.material.transparent = true;
            }
            else {
                _gl.disable(_gl.BLEND);
                this.material.transparent = false;
            }

            this.renderQuad(renderer);

            this.trigger('afterrender', this, renderer);

            if (frameBuffer) {
                this.unbind(renderer, frameBuffer);
            }
        },

        /**
         * Simply do quad rendering
         */
        renderQuad: function (renderer) {
            mesh.material = this.material;
            renderer.renderQueue([mesh], camera);
        },

        /**
         * @param  {WebGLRenderingContext} _gl
         */
        dispose: function (gl) {
            this.material.dispose(gl);
        }
    });

    module.exports = Pass;


/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/**
 * StaticGeometry can not be changed once they've been setup
 */


    var Geometry = __webpack_require__(196);
    var BoundingBox = __webpack_require__(14);
    var glMatrix = __webpack_require__(1);
    var vendor = __webpack_require__(20);
    var glenum = __webpack_require__(11);
    var mat4 = glMatrix.mat4;
    var vec3 = glMatrix.vec3;

    var StaticAttribute = Geometry.StaticAttribute;
    var vec3Create = vec3.create;
    var vec3Add = vec3.add;
    var vec3Set = vec3.set;

    function makeAttrKey(attrName) {
        return 'attr_' + attrName;
    }
    /**
     * @constructor qtek.StaticGeometry
     * @extends qtek.Geometry
     */
    var StaticGeometry = Geometry.extend(function () {
        return /** @lends qtek.StaticGeometry# */ {
            attributes: {
                 position: new StaticAttribute('position', 'float', 3, 'POSITION'),
                 texcoord0: new StaticAttribute('texcoord0', 'float', 2, 'TEXCOORD_0'),
                 texcoord1: new StaticAttribute('texcoord1', 'float', 2, 'TEXCOORD_1'),
                 normal: new StaticAttribute('normal', 'float', 3, 'NORMAL'),
                 tangent: new StaticAttribute('tangent', 'float', 4, 'TANGENT'),
                 color: new StaticAttribute('color', 'float', 4, 'COLOR'),
                 // Skinning attributes
                 // Each vertex can be bind to 4 bones, because the
                 // sum of weights is 1, so the weights is stored in vec3 and the last
                 // can be calculated by 1-w.x-w.y-w.z
                 weight: new StaticAttribute('weight', 'float', 3, 'WEIGHT'),
                 joint: new StaticAttribute('joint', 'float', 4, 'JOINT'),
                 // For wireframe display
                 // http://codeflow.org/entries/2012/aug/02/easy-wireframe-display-with-barycentric-coordinates/
                 barycentric: new StaticAttribute('barycentric', 'float', 3, null),
            },

            hint: glenum.STATIC_DRAW,

            /**
             * @type {Uint16Array|Uint32Array}
             */
            indices: null,

            _normalType: 'vertex',

            _enabledAttributes: null
        };
    },
    /** @lends qtek.StaticGeometry.prototype */
    {
        updateBoundingBox: function () {
            var bbox = this.boundingBox;
            if (!bbox) {
                bbox = this.boundingBox = new BoundingBox();
            }
            var posArr = this.attributes.position.value;
            if (posArr && posArr.length) {
                var min = bbox.min;
                var max = bbox.max;
                var minArr = min._array;
                var maxArr = max._array;
                vec3.set(minArr, posArr[0], posArr[1], posArr[2]);
                vec3.set(maxArr, posArr[0], posArr[1], posArr[2]);
                for (var i = 3; i < posArr.length;) {
                    var x = posArr[i++];
                    var y = posArr[i++];
                    var z = posArr[i++];
                    if (x < minArr[0]) { minArr[0] = x; }
                    if (y < minArr[1]) { minArr[1] = y; }
                    if (z < minArr[2]) { minArr[2] = z; }

                    if (x > maxArr[0]) { maxArr[0] = x; }
                    if (y > maxArr[1]) { maxArr[1] = y; }
                    if (z > maxArr[2]) { maxArr[2] = z; }
                }
                min._dirty = true;
                max._dirty = true;
            }
        },

        dirty: function () {
            var enabledAttributes = this.getEnabledAttributes();
            for (var i = 0; i < enabledAttributes.length; i++) {
                this.dirtyAttribute(enabledAttributes[i]);
            }
            this.dirtyIndices();
            this._enabledAttributes = null;
        },

        dirtyIndices: function () {
            this._cache.dirtyAll('indices');
        },

        dirtyAttribute: function (attrName) {
            this._cache.dirtyAll(makeAttrKey(attrName));
            this._cache.dirtyAll('attributes');
        },

        getTriangleIndices: function (idx, out) {
            if (idx < this.triangleCount && idx >= 0) {
                if (!out) {
                    out = vec3Create();
                }
                var indices = this.indices;
                out[0] = indices[idx * 3];
                out[1] = indices[idx * 3 + 1];
                out[2] = indices[idx * 3 + 2];
                return out;
            }
        },

        setTriangleIndices: function (idx, arr) {
            var indices = this.indices;
            indices[idx * 3] = arr[0];
            indices[idx * 3 + 1] = arr[1];
            indices[idx * 3 + 2] = arr[2];
        },

        isUseIndices: function () {
            return !!this.indices;
        },

        initIndicesFromArray: function (array) {
            var value;
            var ArrayConstructor = this.vertexCount > 0xffff
                ? vendor.Uint32Array : vendor.Uint16Array;
            // Convert 2d array to flat
            if (array[0] && (array[0].length)) {
                var n = 0;
                var size = 3;

                value = new ArrayConstructor(array.length * size);
                for (var i = 0; i < array.length; i++) {
                    for (var j = 0; j < size; j++) {
                        value[n++] = array[i][j];
                    }
                }
            }
            else {
                value = new ArrayConstructor(array);
            }

            this.indices = value;
        },

        createAttribute: function (name, type, size, semantic) {
            var attrib = new StaticAttribute(name, type, size, semantic);
            if (this.attributes[name]) {
                this.removeAttribute(name);
            }
            this.attributes[name] = attrib;
            this._attributeList.push(name);
            return attrib;
        },

        removeAttribute: function (name) {
            var attributeList = this._attributeList;
            var idx = attributeList.indexOf(name);
            if (idx >= 0) {
                attributeList.splice(idx, 1);
                delete this.attributes[name];
                return true;
            }
            return false;
        },

        /**
         * Get enabled attributes name list
         * Attribute which has the same vertex number with position is treated as a enabled attribute
         * @return {string[]}
         */
        getEnabledAttributes: function () {
            var enabledAttributes = this._enabledAttributes;
            var attributeList = this._attributeList;
            // Cache
            if (enabledAttributes) {
                return enabledAttributes;
            }

            var result = [];
            var nVertex = this.vertexCount;

            for (var i = 0; i < attributeList.length; i++) {
                var name = attributeList[i];
                var attrib = this.attributes[name];
                if (attrib.value) {
                    if (attrib.value.length === nVertex * attrib.size) {
                        result.push(name);
                    }
                }
            }

            this._enabledAttributes = result;

            return result;
        },

        getBufferChunks: function (_gl) {
            var cache = this._cache;
            cache.use(_gl.__GLID__);
            var isAttributesDirty = cache.isDirty('attributes');
            var isIndicesDirty = cache.isDirty('indices');
            if (isAttributesDirty || isIndicesDirty) {
                this._updateBuffer(_gl, isAttributesDirty, isIndicesDirty);
                var enabledAttributes = this.getEnabledAttributes();
                for (var i = 0; i < enabledAttributes.length; i++) {
                    cache.fresh(makeAttrKey(enabledAttributes[i]));
                }
                cache.fresh('attributes');
                cache.fresh('indices');
            }
            return cache.get('chunks');
        },

        _updateBuffer: function (_gl, isAttributesDirty, isIndicesDirty) {
            var cache = this._cache;
            var chunks = cache.get('chunks');
            var firstUpdate = false;
            if (!chunks) {
                chunks = [];
                // Intialize
                chunks[0] = {
                    attributeBuffers: [],
                    indicesBuffer: null
                };
                cache.put('chunks', chunks);
                firstUpdate = true;
            }

            var chunk = chunks[0];
            var attributeBuffers = chunk.attributeBuffers;
            var indicesBuffer = chunk.indicesBuffer;

            if (isAttributesDirty || firstUpdate) {
                var attributeList = this.getEnabledAttributes();

                var attributeBufferMap = {};
                if (!firstUpdate) {
                    for (var i = 0; i < attributeBuffers.length; i++) {
                        attributeBufferMap[attributeBuffers[i].name] = attributeBuffers[i];
                    }
                }
                // FIXME If some attributes removed
                for (var k = 0; k < attributeList.length; k++) {
                    var name = attributeList[k];
                    var attribute = this.attributes[name];

                    var bufferInfo;

                    if (!firstUpdate) {
                        bufferInfo = attributeBufferMap[name];
                    }
                    var buffer;
                    if (bufferInfo) {
                        buffer = bufferInfo.buffer;
                    }
                    else {
                        buffer = _gl.createBuffer();
                    }
                    if (cache.isDirty(makeAttrKey(name))) {
                        // Only update when they are dirty.
                        // TODO: Use BufferSubData?
                        _gl.bindBuffer(_gl.ARRAY_BUFFER, buffer);
                        _gl.bufferData(_gl.ARRAY_BUFFER, attribute.value, this.hint);
                    }

                    attributeBuffers[k] = new Geometry.AttributeBuffer(name, attribute.type, buffer, attribute.size, attribute.semantic);
                }
                // Remove unused attributes buffers.
                // PENDING
                for (var i = k; i < attributeBuffers.length; i++) {
                    _gl.deleteBuffer(attributeBuffers[i].buffer);
                }
                attributeBuffers.length = k;

            }

            if (this.isUseIndices() && (isIndicesDirty || firstUpdate)) {
                if (!indicesBuffer) {
                    indicesBuffer = new Geometry.IndicesBuffer(_gl.createBuffer());
                    chunk.indicesBuffer = indicesBuffer;
                }
                indicesBuffer.count = this.indices.length;
                _gl.bindBuffer(_gl.ELEMENT_ARRAY_BUFFER, indicesBuffer.buffer);
                _gl.bufferData(_gl.ELEMENT_ARRAY_BUFFER, this.indices, this.hint);
            }
        },

        generateVertexNormals: function () {
            if (!this.vertexCount) {
                return;
            }

            var indices = this.indices;
            var attributes = this.attributes;
            var positions = attributes.position.value;
            var normals = attributes.normal.value;

            if (!normals || normals.length !== positions.length) {
                normals = attributes.normal.value = new vendor.Float32Array(positions.length);
            }
            else {
                // Reset
                for (var i = 0; i < normals.length; i++) {
                    normals[i] = 0;
                }
            }

            var p1 = vec3Create();
            var p2 = vec3Create();
            var p3 = vec3Create();

            var v21 = vec3Create();
            var v32 = vec3Create();

            var n = vec3Create();

            // TODO if no indices
            for (var f = 0; f < indices.length;) {
                var i1 = indices[f++];
                var i2 = indices[f++];
                var i3 = indices[f++];

                vec3Set(p1, positions[i1*3], positions[i1*3+1], positions[i1*3+2]);
                vec3Set(p2, positions[i2*3], positions[i2*3+1], positions[i2*3+2]);
                vec3Set(p3, positions[i3*3], positions[i3*3+1], positions[i3*3+2]);

                vec3.sub(v21, p1, p2);
                vec3.sub(v32, p2, p3);
                vec3.cross(n, v21, v32);
                // Already be weighted by the triangle area
                for (var i = 0; i < 3; i++) {
                    normals[i1*3+i] = normals[i1*3+i] + n[i];
                    normals[i2*3+i] = normals[i2*3+i] + n[i];
                    normals[i3*3+i] = normals[i3*3+i] + n[i];
                }
            }

            for (var i = 0; i < normals.length;) {
                vec3Set(n, normals[i], normals[i+1], normals[i+2]);
                vec3.normalize(n, n);
                normals[i++] = n[0];
                normals[i++] = n[1];
                normals[i++] = n[2];
            }
            this.dirty();
        },

        generateFaceNormals: function () {
            if (!this.vertexCount) {
                return;
            }

            if (!this.isUniqueVertex()) {
                this.generateUniqueVertex();
            }

            var indices = this.indices;
            var attributes = this.attributes;
            var positions = attributes.position.value;
            var normals = attributes.normal.value;

            var p1 = vec3Create();
            var p2 = vec3Create();
            var p3 = vec3Create();

            var v21 = vec3Create();
            var v32 = vec3Create();
            var n = vec3Create();

            if (!normals) {
                normals = attributes.normal.value = new Float32Array(positions.length);
            }
            for (var f = 0; f < indices.length;) {
                var i1 = indices[f++];
                var i2 = indices[f++];
                var i3 = indices[f++];

                vec3Set(p1, positions[i1*3], positions[i1*3+1], positions[i1*3+2]);
                vec3Set(p2, positions[i2*3], positions[i2*3+1], positions[i2*3+2]);
                vec3Set(p3, positions[i3*3], positions[i3*3+1], positions[i3*3+2]);

                vec3.sub(v21, p1, p2);
                vec3.sub(v32, p2, p3);
                vec3.cross(n, v21, v32);

                vec3.normalize(n, n);

                for (var i = 0; i < 3; i++) {
                    normals[i1*3 + i] = n[i];
                    normals[i2*3 + i] = n[i];
                    normals[i3*3 + i] = n[i];
                }
            }
            this.dirty();
        },

        generateTangents: function () {
            if (!this.vertexCount) {
                return;
            }

            var nVertex = this.vertexCount;
            var attributes = this.attributes;
            if (!attributes.tangent.value) {
                attributes.tangent.value = new Float32Array(nVertex * 4);
            }
            var texcoords = attributes.texcoord0.value;
            var positions = attributes.position.value;
            var tangents = attributes.tangent.value;
            var normals = attributes.normal.value;

            var tan1 = [];
            var tan2 = [];
            for (var i = 0; i < nVertex; i++) {
                tan1[i] = [0.0, 0.0, 0.0];
                tan2[i] = [0.0, 0.0, 0.0];
            }

            var sdir = [0.0, 0.0, 0.0];
            var tdir = [0.0, 0.0, 0.0];
            var indices = this.indices;
            for (var i = 0; i < indices.length;) {
                var i1 = indices[i++],
                    i2 = indices[i++],
                    i3 = indices[i++],

                    st1s = texcoords[i1 * 2],
                    st2s = texcoords[i2 * 2],
                    st3s = texcoords[i3 * 2],
                    st1t = texcoords[i1 * 2 + 1],
                    st2t = texcoords[i2 * 2 + 1],
                    st3t = texcoords[i3 * 2 + 1],

                    p1x = positions[i1 * 3],
                    p2x = positions[i2 * 3],
                    p3x = positions[i3 * 3],
                    p1y = positions[i1 * 3 + 1],
                    p2y = positions[i2 * 3 + 1],
                    p3y = positions[i3 * 3 + 1],
                    p1z = positions[i1 * 3 + 2],
                    p2z = positions[i2 * 3 + 2],
                    p3z = positions[i3 * 3 + 2];

                var x1 = p2x - p1x,
                    x2 = p3x - p1x,
                    y1 = p2y - p1y,
                    y2 = p3y - p1y,
                    z1 = p2z - p1z,
                    z2 = p3z - p1z;

                var s1 = st2s - st1s,
                    s2 = st3s - st1s,
                    t1 = st2t - st1t,
                    t2 = st3t - st1t;

                var r = 1.0 / (s1 * t2 - t1 * s2);
                sdir[0] = (t2 * x1 - t1 * x2) * r;
                sdir[1] = (t2 * y1 - t1 * y2) * r;
                sdir[2] = (t2 * z1 - t1 * z2) * r;

                tdir[0] = (s1 * x2 - s2 * x1) * r;
                tdir[1] = (s1 * y2 - s2 * y1) * r;
                tdir[2] = (s1 * z2 - s2 * z1) * r;

                vec3Add(tan1[i1], tan1[i1], sdir);
                vec3Add(tan1[i2], tan1[i2], sdir);
                vec3Add(tan1[i3], tan1[i3], sdir);
                vec3Add(tan2[i1], tan2[i1], tdir);
                vec3Add(tan2[i2], tan2[i2], tdir);
                vec3Add(tan2[i3], tan2[i3], tdir);
            }
            var tmp = vec3Create();
            var nCrossT = vec3Create();
            var n = vec3Create();
            for (var i = 0; i < nVertex; i++) {
                n[0] = normals[i * 3];
                n[1] = normals[i * 3 + 1];
                n[2] = normals[i * 3 + 2];
                var t = tan1[i];

                // Gram-Schmidt orthogonalize
                vec3.scale(tmp, n, vec3.dot(n, t));
                vec3.sub(tmp, t, tmp);
                vec3.normalize(tmp, tmp);
                // Calculate handedness.
                vec3.cross(nCrossT, n, t);
                tangents[i * 4] = tmp[0];
                tangents[i * 4 + 1] = tmp[1];
                tangents[i * 4 + 2] = tmp[2];
                tangents[i * 4 + 3] = vec3.dot(nCrossT, tan2[i]) < 0.0 ? -1.0 : 1.0;
            }
            this.dirty();
        },

        isUniqueVertex: function () {
            if (this.isUseIndices()) {
                return this.vertexCount === this.indices.length;
            }
            else {
                return true;
            }
        },

        generateUniqueVertex: function () {
            if (!this.vertexCount) {
                return;
            }

            if (this.indices.length > 0xffff) {
                this.indices = new vendor.Uint32Array(this.indices);
            }

            var attributes = this.attributes;
            var indices = this.indices;

            var attributeNameList = this.getEnabledAttributes();

            var oldAttrValues = {};
            for (var a = 0; a < attributeNameList.length; a++) {
                var name = attributeNameList[a];
                oldAttrValues[name] = attributes[name].value;
                attributes[name].init(this.indices.length);
            }

            var cursor = 0;
            for (var i = 0; i < indices.length; i++) {
                var ii = indices[i];
                for (var a = 0; a < attributeNameList.length; a++) {
                    var name = attributeNameList[a];
                    var array = attributes[name].value;
                    var size = attributes[name].size;

                    for (var k = 0; k < size; k++) {
                        array[cursor * size + k] = oldAttrValues[name][ii * size + k];
                    }
                }
                indices[i] = cursor;
                cursor++;
            }

            this.dirty();
        },

        generateBarycentric: function () {
            if (!this.vertexCount) {
                return;
            }

            if (!this.isUniqueVertex()) {
                this.generateUniqueVertex();
            }

            var attributes = this.attributes;
            var array = attributes.barycentric.value;
            var indices = this.indices;
            // Already existed;
            if (array && array.length === indices.length * 3) {
                return;
            }
            array = attributes.barycentric.value = new Float32Array(indices.length * 3);
            for (var i = 0; i < indices.length;) {
                for (var j = 0; j < 3; j++) {
                    var ii = indices[i++];
                    array[ii * 3 + j] = 1;
                }
            }
            this.dirty();
        },

        applyTransform: function (matrix) {

            var attributes = this.attributes;
            var positions = attributes.position.value;
            var normals = attributes.normal.value;
            var tangents = attributes.tangent.value;

            matrix = matrix._array;
            // Normal Matrix
            var inverseTransposeMatrix = mat4.create();
            mat4.invert(inverseTransposeMatrix, matrix);
            mat4.transpose(inverseTransposeMatrix, inverseTransposeMatrix);

            var vec3TransformMat4 = vec3.transformMat4;
            var vec3ForEach = vec3.forEach;
            vec3ForEach(positions, 3, 0, null, vec3TransformMat4, matrix);
            if (normals) {
                vec3ForEach(normals, 3, 0, null, vec3TransformMat4, inverseTransposeMatrix);
            }
            if (tangents) {
                vec3ForEach(tangents, 4, 0, null, vec3TransformMat4, inverseTransposeMatrix);
            }

            if (this.boundingBox) {
                this.updateBoundingBox();
            }
        },

        dispose: function (_gl) {

            var cache = this._cache;

            cache.use(_gl.__GLID__);
            var chunks = cache.get('chunks');
            if (chunks) {
                for (var c = 0; c < chunks.length; c++) {
                    var chunk = chunks[c];

                    for (var k = 0; k < chunk.attributeBuffers.length; k++) {
                        var attribs = chunk.attributeBuffers[k];
                        _gl.deleteBuffer(attribs.buffer);
                    }
                }
            }
            cache.deleteContext(_gl.__GLID__);
        }
    });

    if (Object.defineProperty) {
        Object.defineProperty(StaticGeometry.prototype, 'vertexCount', {

            enumerable: false,

            get: function () {
                var mainAttribute = this.attributes[this.mainAttribute];
                if (!mainAttribute || !mainAttribute.value) {
                    return 0;
                }
                return mainAttribute.value.length / mainAttribute.size;
            }
        });
        Object.defineProperty(StaticGeometry.prototype, 'triangleCount', {

            enumerable: false,

            get: function () {
                var indices = this.indices;
                if (!indices) {
                    return 0;
                }
                else {
                    return indices.length / 3;
                }
            }
        });
    }

    StaticGeometry.Attribute = Geometry.StaticAttribute;

    module.exports = StaticGeometry;


/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";



    var Vector3 = __webpack_require__(3);
    var glMatrix = __webpack_require__(1);
    var vec3 = glMatrix.vec3;

    var vec3Copy = vec3.copy;
    var vec3Set = vec3.set;

    /**
     * Axis aligned bounding box
     * @constructor
     * @alias qtek.math.BoundingBox
     * @param {qtek.math.Vector3} [min]
     * @param {qtek.math.Vector3} [max]
     */
    var BoundingBox = function (min, max) {

        /**
         * Minimum coords of bounding box
         * @type {qtek.math.Vector3}
         */
        this.min = min || new Vector3(Infinity, Infinity, Infinity);

        /**
         * Maximum coords of bounding box
         * @type {qtek.math.Vector3}
         */
        this.max = max || new Vector3(-Infinity, -Infinity, -Infinity);
    };

    BoundingBox.prototype = {

        constructor: BoundingBox,
        /**
         * Update min and max coords from a vertices array
         * @param  {array} vertices
         */
        updateFromVertices: function (vertices) {
            if (vertices.length > 0) {
                var min = this.min;
                var max = this.max;
                var minArr = min._array;
                var maxArr = max._array;
                vec3Copy(minArr, vertices[0]);
                vec3Copy(maxArr, vertices[0]);
                for (var i = 1; i < vertices.length; i++) {
                    var vertex = vertices[i];

                    if (vertex[0] < minArr[0]) { minArr[0] = vertex[0]; }
                    if (vertex[1] < minArr[1]) { minArr[1] = vertex[1]; }
                    if (vertex[2] < minArr[2]) { minArr[2] = vertex[2]; }

                    if (vertex[0] > maxArr[0]) { maxArr[0] = vertex[0]; }
                    if (vertex[1] > maxArr[1]) { maxArr[1] = vertex[1]; }
                    if (vertex[2] > maxArr[2]) { maxArr[2] = vertex[2]; }
                }
                min._dirty = true;
                max._dirty = true;
            }
        },

        /**
         * Union operation with another bounding box
         * @param  {qtek.math.BoundingBox} bbox
         */
        union: function (bbox) {
            var min = this.min;
            var max = this.max;
            vec3.min(min._array, min._array, bbox.min._array);
            vec3.max(max._array, max._array, bbox.max._array);
            min._dirty = true;
            max._dirty = true;
            return this;
        },

        /**
         * Intersection operation with another bounding box
         * @param  {qtek.math.BoundingBox} bbox
         */
        intersection: function (bbox) {
            var min = this.min;
            var max = this.max;
            vec3.max(min._array, min._array, bbox.min._array);
            vec3.min(max._array, max._array, bbox.max._array);
            min._dirty = true;
            max._dirty = true;
            return this;
        },

        /**
         * If intersect with another bounding box
         * @param  {qtek.math.BoundingBox} bbox
         * @return {boolean}
         */
        intersectBoundingBox: function (bbox) {
            var _min = this.min._array;
            var _max = this.max._array;

            var _min2 = bbox.min._array;
            var _max2 = bbox.max._array;

            return ! (_min[0] > _max2[0] || _min[1] > _max2[1] || _min[2] > _max2[2]
                || _max[0] < _min2[0] || _max[1] < _min2[1] || _max[2] < _min2[2]);
        },

        /**
         * If contain another bounding box entirely
         * @param  {qtek.math.BoundingBox} bbox
         * @return {boolean}
         */
        containBoundingBox: function (bbox) {

            var _min = this.min._array;
            var _max = this.max._array;

            var _min2 = bbox.min._array;
            var _max2 = bbox.max._array;

            return _min[0] <= _min2[0] && _min[1] <= _min2[1] && _min[2] <= _min2[2]
                && _max[0] >= _max2[0] && _max[1] >= _max2[1] && _max[2] >= _max2[2];
        },

        /**
         * If contain point entirely
         * @param  {qtek.math.Vector3} point
         * @return {boolean}
         */
        containPoint: function (p) {
            var _min = this.min._array;
            var _max = this.max._array;

            var _p = p._array;

            return _min[0] <= _p[0] && _min[1] <= _p[1] && _min[2] <= _p[2]
                && _max[0] >= _p[0] && _max[1] >= _p[1] && _max[2] >= _p[2];
        },

        /**
         * If bounding box is finite
         */
        isFinite: function () {
            var _min = this.min._array;
            var _max = this.max._array;
            return isFinite(_min[0]) && isFinite(_min[1]) && isFinite(_min[2])
                && isFinite(_max[0]) && isFinite(_max[1]) && isFinite(_max[2]);
        },

        /**
         * Apply an affine transform matrix to the bounding box
         * @param  {qtek.math.Matrix4} matrix
         */
        applyTransform: (function () {
            // http://dev.theomader.com/transform-bounding-boxes/
            var xa = vec3.create();
            var xb = vec3.create();
            var ya = vec3.create();
            var yb = vec3.create();
            var za = vec3.create();
            var zb = vec3.create();

            return function (matrix) {
                var min = this.min._array;
                var max = this.max._array;

                var m = matrix._array;

                xa[0] = m[0] * min[0]; xa[1] = m[1] * min[0]; xa[2] = m[2] * min[0];
                xb[0] = m[0] * max[0]; xb[1] = m[1] * max[0]; xb[2] = m[2] * max[0];

                ya[0] = m[4] * min[1]; ya[1] = m[5] * min[1]; ya[2] = m[6] * min[1];
                yb[0] = m[4] * max[1]; yb[1] = m[5] * max[1]; yb[2] = m[6] * max[1];

                za[0] = m[8] * min[2]; za[1] = m[9] * min[2]; za[2] = m[10] * min[2];
                zb[0] = m[8] * max[2]; zb[1] = m[9] * max[2]; zb[2] = m[10] * max[2];

                min[0] = Math.min(xa[0], xb[0]) + Math.min(ya[0], yb[0]) + Math.min(za[0], zb[0]) + m[12];
                min[1] = Math.min(xa[1], xb[1]) + Math.min(ya[1], yb[1]) + Math.min(za[1], zb[1]) + m[13];
                min[2] = Math.min(xa[2], xb[2]) + Math.min(ya[2], yb[2]) + Math.min(za[2], zb[2]) + m[14];

                max[0] = Math.max(xa[0], xb[0]) + Math.max(ya[0], yb[0]) + Math.max(za[0], zb[0]) + m[12];
                max[1] = Math.max(xa[1], xb[1]) + Math.max(ya[1], yb[1]) + Math.max(za[1], zb[1]) + m[13];
                max[2] = Math.max(xa[2], xb[2]) + Math.max(ya[2], yb[2]) + Math.max(za[2], zb[2]) + m[14];

                this.min._dirty = true;
                this.max._dirty = true;

                return this;
            };
        })(),

        /**
         * Apply a projection matrix to the bounding box
         * @param  {qtek.math.Matrix4} matrix
         */
        applyProjection: function (matrix) {
            var min = this.min._array;
            var max = this.max._array;

            var m = matrix._array;
            // min in min z
            var v10 = min[0];
            var v11 = min[1];
            var v12 = min[2];
            // max in min z
            var v20 = max[0];
            var v21 = max[1];
            var v22 = min[2];
            // max in max z
            var v30 = max[0];
            var v31 = max[1];
            var v32 = max[2];

            if (m[15] === 1) {  // Orthographic projection
                min[0] = m[0] * v10 + m[12];
                min[1] = m[5] * v11 + m[13];
                max[2] = m[10] * v12 + m[14];

                max[0] = m[0] * v30 + m[12];
                max[1] = m[5] * v31 + m[13];
                min[2] = m[10] * v32 + m[14];
            }
            else {
                var w = -1 / v12;
                min[0] = m[0] * v10 * w;
                min[1] = m[5] * v11 * w;
                max[2] = (m[10] * v12 + m[14]) * w;

                w = -1 / v22;
                max[0] = m[0] * v20 * w;
                max[1] = m[5] * v21 * w;

                w = -1 / v32;
                min[2] = (m[10] * v32 + m[14]) * w;
            }
            this.min._dirty = true;
            this.max._dirty = true;

            return this;
        },

        updateVertices: function () {
            var vertices = this.vertices;
            if (!vertices) {
                // Cube vertices
                var vertices = [];
                for (var i = 0; i < 8; i++) {
                    vertices[i] = vec3.fromValues(0, 0, 0);
                }

                /**
                 * Eight coords of bounding box
                 * @type {Float32Array[]}
                 */
                this.vertices = vertices;
            }
            var min = this.min._array;
            var max = this.max._array;
            //--- min z
            // min x
            vec3Set(vertices[0], min[0], min[1], min[2]);
            vec3Set(vertices[1], min[0], max[1], min[2]);
            // max x
            vec3Set(vertices[2], max[0], min[1], min[2]);
            vec3Set(vertices[3], max[0], max[1], min[2]);

            //-- max z
            vec3Set(vertices[4], min[0], min[1], max[2]);
            vec3Set(vertices[5], min[0], max[1], max[2]);
            vec3Set(vertices[6], max[0], min[1], max[2]);
            vec3Set(vertices[7], max[0], max[1], max[2]);

            return this;
        },
        /**
         * Copy values from another bounding box
         * @param  {qtek.math.BoundingBox} bbox
         */
        copy: function (bbox) {
            var min = this.min;
            var max = this.max;
            vec3Copy(min._array, bbox.min._array);
            vec3Copy(max._array, bbox.max._array);
            min._dirty = true;
            max._dirty = true;
            return this;
        },

        /**
         * Clone a new bounding box
         * @return {qtek.math.BoundingBox}
         */
        clone: function () {
            var boundingBox = new BoundingBox();
            boundingBox.copy(this);
            return boundingBox;
        }
    };

    module.exports = BoundingBox;


/***/ }),
/* 15 */
/***/ (function(module, exports) {

/**
 * @module zrender/core/util
 */


    // 用于处理merge时无法遍历Date等对象的问题
    var BUILTIN_OBJECT = {
        '[object Function]': 1,
        '[object RegExp]': 1,
        '[object Date]': 1,
        '[object Error]': 1,
        '[object CanvasGradient]': 1,
        '[object CanvasPattern]': 1,
        // For node-canvas
        '[object Image]': 1,
        '[object Canvas]': 1
    };

    var TYPED_ARRAY = {
        '[object Int8Array]': 1,
        '[object Uint8Array]': 1,
        '[object Uint8ClampedArray]': 1,
        '[object Int16Array]': 1,
        '[object Uint16Array]': 1,
        '[object Int32Array]': 1,
        '[object Uint32Array]': 1,
        '[object Float32Array]': 1,
        '[object Float64Array]': 1
    };

    var objToString = Object.prototype.toString;

    var arrayProto = Array.prototype;
    var nativeForEach = arrayProto.forEach;
    var nativeFilter = arrayProto.filter;
    var nativeSlice = arrayProto.slice;
    var nativeMap = arrayProto.map;
    var nativeReduce = arrayProto.reduce;

    /**
     * Those data types can be cloned:
     *     Plain object, Array, TypedArray, number, string, null, undefined.
     * Those data types will be assgined using the orginal data:
     *     BUILTIN_OBJECT
     * Instance of user defined class will be cloned to a plain object, without
     * properties in prototype.
     * Other data types is not supported (not sure what will happen).
     *
     * Caution: do not support clone Date, for performance consideration.
     * (There might be a large number of date in `series.data`).
     * So date should not be modified in and out of echarts.
     *
     * @param {*} source
     * @return {*} new
     */
    function clone(source) {
        if (source == null || typeof source != 'object') {
            return source;
        }

        var result = source;
        var typeStr = objToString.call(source);

        if (typeStr === '[object Array]') {
            result = [];
            for (var i = 0, len = source.length; i < len; i++) {
                result[i] = clone(source[i]);
            }
        }
        else if (TYPED_ARRAY[typeStr]) {
            var Ctor = source.constructor;
            if (source.constructor.from) {
                result = Ctor.from(source);
            }
            else {
                result = new Ctor(source.length);
                for (var i = 0, len = source.length; i < len; i++) {
                    result[i] = clone(source[i]);
                }
            }
        }
        else if (!BUILTIN_OBJECT[typeStr] && !isPrimitive(source) && !isDom(source)) {
            result = {};
            for (var key in source) {
                if (source.hasOwnProperty(key)) {
                    result[key] = clone(source[key]);
                }
            }
        }

        return result;
    }

    /**
     * @memberOf module:zrender/core/util
     * @param {*} target
     * @param {*} source
     * @param {boolean} [overwrite=false]
     */
    function merge(target, source, overwrite) {
        // We should escapse that source is string
        // and enter for ... in ...
        if (!isObject(source) || !isObject(target)) {
            return overwrite ? clone(source) : target;
        }

        for (var key in source) {
            if (source.hasOwnProperty(key)) {
                var targetProp = target[key];
                var sourceProp = source[key];

                if (isObject(sourceProp)
                    && isObject(targetProp)
                    && !isArray(sourceProp)
                    && !isArray(targetProp)
                    && !isDom(sourceProp)
                    && !isDom(targetProp)
                    && !isBuiltInObject(sourceProp)
                    && !isBuiltInObject(targetProp)
                    && !isPrimitive(sourceProp)
                    && !isPrimitive(targetProp)
                ) {
                    // 如果需要递归覆盖，就递归调用merge
                    merge(targetProp, sourceProp, overwrite);
                }
                else if (overwrite || !(key in target)) {
                    // 否则只处理overwrite为true，或者在目标对象中没有此属性的情况
                    // NOTE，在 target[key] 不存在的时候也是直接覆盖
                    target[key] = clone(source[key], true);
                }
            }
        }

        return target;
    }

    /**
     * @param {Array} targetAndSources The first item is target, and the rests are source.
     * @param {boolean} [overwrite=false]
     * @return {*} target
     */
    function mergeAll(targetAndSources, overwrite) {
        var result = targetAndSources[0];
        for (var i = 1, len = targetAndSources.length; i < len; i++) {
            result = merge(result, targetAndSources[i], overwrite);
        }
        return result;
    }

    /**
     * @param {*} target
     * @param {*} source
     * @memberOf module:zrender/core/util
     */
    function extend(target, source) {
        for (var key in source) {
            if (source.hasOwnProperty(key)) {
                target[key] = source[key];
            }
        }
        return target;
    }

    /**
     * @param {*} target
     * @param {*} source
     * @param {boolean} [overlay=false]
     * @memberOf module:zrender/core/util
     */
    function defaults(target, source, overlay) {
        for (var key in source) {
            if (source.hasOwnProperty(key)
                && (overlay ? source[key] != null : target[key] == null)
            ) {
                target[key] = source[key];
            }
        }
        return target;
    }

    function createCanvas() {
        return document.createElement('canvas');
    }
    // FIXME
    var _ctx;
    function getContext() {
        if (!_ctx) {
            // Use util.createCanvas instead of createCanvas
            // because createCanvas may be overwritten in different environment
            _ctx = util.createCanvas().getContext('2d');
        }
        return _ctx;
    }

    /**
     * 查询数组中元素的index
     * @memberOf module:zrender/core/util
     */
    function indexOf(array, value) {
        if (array) {
            if (array.indexOf) {
                return array.indexOf(value);
            }
            for (var i = 0, len = array.length; i < len; i++) {
                if (array[i] === value) {
                    return i;
                }
            }
        }
        return -1;
    }

    /**
     * 构造类继承关系
     *
     * @memberOf module:zrender/core/util
     * @param {Function} clazz 源类
     * @param {Function} baseClazz 基类
     */
    function inherits(clazz, baseClazz) {
        var clazzPrototype = clazz.prototype;
        function F() {}
        F.prototype = baseClazz.prototype;
        clazz.prototype = new F();

        for (var prop in clazzPrototype) {
            clazz.prototype[prop] = clazzPrototype[prop];
        }
        clazz.prototype.constructor = clazz;
        clazz.superClass = baseClazz;
    }

    /**
     * @memberOf module:zrender/core/util
     * @param {Object|Function} target
     * @param {Object|Function} sorce
     * @param {boolean} overlay
     */
    function mixin(target, source, overlay) {
        target = 'prototype' in target ? target.prototype : target;
        source = 'prototype' in source ? source.prototype : source;

        defaults(target, source, overlay);
    }

    /**
     * Consider typed array.
     * @param {Array|TypedArray} data
     */
    function isArrayLike(data) {
        if (! data) {
            return;
        }
        if (typeof data == 'string') {
            return false;
        }
        return typeof data.length == 'number';
    }

    /**
     * 数组或对象遍历
     * @memberOf module:zrender/core/util
     * @param {Object|Array} obj
     * @param {Function} cb
     * @param {*} [context]
     */
    function each(obj, cb, context) {
        if (!(obj && cb)) {
            return;
        }
        if (obj.forEach && obj.forEach === nativeForEach) {
            obj.forEach(cb, context);
        }
        else if (obj.length === +obj.length) {
            for (var i = 0, len = obj.length; i < len; i++) {
                cb.call(context, obj[i], i, obj);
            }
        }
        else {
            for (var key in obj) {
                if (obj.hasOwnProperty(key)) {
                    cb.call(context, obj[key], key, obj);
                }
            }
        }
    }

    /**
     * 数组映射
     * @memberOf module:zrender/core/util
     * @param {Array} obj
     * @param {Function} cb
     * @param {*} [context]
     * @return {Array}
     */
    function map(obj, cb, context) {
        if (!(obj && cb)) {
            return;
        }
        if (obj.map && obj.map === nativeMap) {
            return obj.map(cb, context);
        }
        else {
            var result = [];
            for (var i = 0, len = obj.length; i < len; i++) {
                result.push(cb.call(context, obj[i], i, obj));
            }
            return result;
        }
    }

    /**
     * @memberOf module:zrender/core/util
     * @param {Array} obj
     * @param {Function} cb
     * @param {Object} [memo]
     * @param {*} [context]
     * @return {Array}
     */
    function reduce(obj, cb, memo, context) {
        if (!(obj && cb)) {
            return;
        }
        if (obj.reduce && obj.reduce === nativeReduce) {
            return obj.reduce(cb, memo, context);
        }
        else {
            for (var i = 0, len = obj.length; i < len; i++) {
                memo = cb.call(context, memo, obj[i], i, obj);
            }
            return memo;
        }
    }

    /**
     * 数组过滤
     * @memberOf module:zrender/core/util
     * @param {Array} obj
     * @param {Function} cb
     * @param {*} [context]
     * @return {Array}
     */
    function filter(obj, cb, context) {
        if (!(obj && cb)) {
            return;
        }
        if (obj.filter && obj.filter === nativeFilter) {
            return obj.filter(cb, context);
        }
        else {
            var result = [];
            for (var i = 0, len = obj.length; i < len; i++) {
                if (cb.call(context, obj[i], i, obj)) {
                    result.push(obj[i]);
                }
            }
            return result;
        }
    }

    /**
     * 数组项查找
     * @memberOf module:zrender/core/util
     * @param {Array} obj
     * @param {Function} cb
     * @param {*} [context]
     * @return {Array}
     */
    function find(obj, cb, context) {
        if (!(obj && cb)) {
            return;
        }
        for (var i = 0, len = obj.length; i < len; i++) {
            if (cb.call(context, obj[i], i, obj)) {
                return obj[i];
            }
        }
    }

    /**
     * @memberOf module:zrender/core/util
     * @param {Function} func
     * @param {*} context
     * @return {Function}
     */
    function bind(func, context) {
        var args = nativeSlice.call(arguments, 2);
        return function () {
            return func.apply(context, args.concat(nativeSlice.call(arguments)));
        };
    }

    /**
     * @memberOf module:zrender/core/util
     * @param {Function} func
     * @return {Function}
     */
    function curry(func) {
        var args = nativeSlice.call(arguments, 1);
        return function () {
            return func.apply(this, args.concat(nativeSlice.call(arguments)));
        };
    }

    /**
     * @memberOf module:zrender/core/util
     * @param {*} value
     * @return {boolean}
     */
    function isArray(value) {
        return objToString.call(value) === '[object Array]';
    }

    /**
     * @memberOf module:zrender/core/util
     * @param {*} value
     * @return {boolean}
     */
    function isFunction(value) {
        return typeof value === 'function';
    }

    /**
     * @memberOf module:zrender/core/util
     * @param {*} value
     * @return {boolean}
     */
    function isString(value) {
        return objToString.call(value) === '[object String]';
    }

    /**
     * @memberOf module:zrender/core/util
     * @param {*} value
     * @return {boolean}
     */
    function isObject(value) {
        // Avoid a V8 JIT bug in Chrome 19-20.
        // See https://code.google.com/p/v8/issues/detail?id=2291 for more details.
        var type = typeof value;
        return type === 'function' || (!!value && type == 'object');
    }

    /**
     * @memberOf module:zrender/core/util
     * @param {*} value
     * @return {boolean}
     */
    function isBuiltInObject(value) {
        return !!BUILTIN_OBJECT[objToString.call(value)];
    }

    /**
     * @memberOf module:zrender/core/util
     * @param {*} value
     * @return {boolean}
     */
    function isDom(value) {
        return typeof value === 'object'
            && typeof value.nodeType === 'number'
            && typeof value.ownerDocument === 'object';
    }

    /**
     * Whether is exactly NaN. Notice isNaN('a') returns true.
     * @param {*} value
     * @return {boolean}
     */
    function eqNaN(value) {
        return value !== value;
    }

    /**
     * If value1 is not null, then return value1, otherwise judget rest of values.
     * Low performance.
     * @memberOf module:zrender/core/util
     * @return {*} Final value
     */
    function retrieve(values) {
        for (var i = 0, len = arguments.length; i < len; i++) {
            if (arguments[i] != null) {
                return arguments[i];
            }
        }
    }

    function retrieve2(value0, value1) {
        return value0 != null
            ? value0
            : value1;
    }

    function retrieve3(value0, value1, value2) {
        return value0 != null
            ? value0
            : value1 != null
            ? value1
            : value2;
    }

    /**
     * @memberOf module:zrender/core/util
     * @param {Array} arr
     * @param {number} startIndex
     * @param {number} endIndex
     * @return {Array}
     */
    function slice() {
        return Function.call.apply(nativeSlice, arguments);
    }

    /**
     * Normalize css liked array configuration
     * e.g.
     *  3 => [3, 3, 3, 3]
     *  [4, 2] => [4, 2, 4, 2]
     *  [4, 3, 2] => [4, 3, 2, 3]
     * @param {number|Array.<number>} val
     * @return {Array.<number>}
     */
    function normalizeCssArray(val) {
        if (typeof (val) === 'number') {
            return [val, val, val, val];
        }
        var len = val.length;
        if (len === 2) {
            // vertical | horizontal
            return [val[0], val[1], val[0], val[1]];
        }
        else if (len === 3) {
            // top | horizontal | bottom
            return [val[0], val[1], val[2], val[1]];
        }
        return val;
    }

    /**
     * @memberOf module:zrender/core/util
     * @param {boolean} condition
     * @param {string} message
     */
    function assert(condition, message) {
        if (!condition) {
            throw new Error(message);
        }
    }

    var primitiveKey = '__ec_primitive__';
    /**
     * Set an object as primitive to be ignored traversing children in clone or merge
     */
    function setAsPrimitive(obj) {
        obj[primitiveKey] = true;
    }

    function isPrimitive(obj) {
        return obj[primitiveKey];
    }

    /**
     * @constructor
     * @param {Object} obj Only apply `ownProperty`.
     */
    function HashMap(obj) {
        obj && each(obj, function (value, key) {
            this.set(key, value);
        }, this);
    }

    // Add prefix to avoid conflict with Object.prototype.
    var HASH_MAP_PREFIX = '_ec_';
    var HASH_MAP_PREFIX_LENGTH = 4;

    HashMap.prototype = {
        constructor: HashMap,
        // Do not provide `has` method to avoid defining what is `has`.
        // (We usually treat `null` and `undefined` as the same, different
        // from ES6 Map).
        get: function (key) {
            return this[HASH_MAP_PREFIX + key];
        },
        set: function (key, value) {
            this[HASH_MAP_PREFIX + key] = value;
            // Comparing with invocation chaining, `return value` is more commonly
            // used in this case: `var someVal = map.set('a', genVal());`
            return value;
        },
        // Although util.each can be performed on this hashMap directly, user
        // should not use the exposed keys, who are prefixed.
        each: function (cb, context) {
            context !== void 0 && (cb = bind(cb, context));
            for (var prefixedKey in this) {
                this.hasOwnProperty(prefixedKey)
                    && cb(this[prefixedKey], prefixedKey.slice(HASH_MAP_PREFIX_LENGTH));
            }
        },
        // Do not use this method if performance sensitive.
        removeKey: function (key) {
            delete this[HASH_MAP_PREFIX + key];
        }
    };

    function createHashMap(obj) {
        return new HashMap(obj);
    }

    var util = {
        inherits: inherits,
        mixin: mixin,
        clone: clone,
        merge: merge,
        mergeAll: mergeAll,
        extend: extend,
        defaults: defaults,
        getContext: getContext,
        createCanvas: createCanvas,
        indexOf: indexOf,
        slice: slice,
        find: find,
        isArrayLike: isArrayLike,
        each: each,
        map: map,
        reduce: reduce,
        filter: filter,
        bind: bind,
        curry: curry,
        isArray: isArray,
        isString: isString,
        isObject: isObject,
        isFunction: isFunction,
        isBuiltInObject: isBuiltInObject,
        isDom: isDom,
        eqNaN: eqNaN,
        retrieve: retrieve,
        retrieve2: retrieve2,
        retrieve3: retrieve3,
        assert: assert,
        setAsPrimitive: setAsPrimitive,
        createHashMap: createHashMap,
        normalizeCssArray: normalizeCssArray,
        noop: function () {}
    };
    module.exports = util;



/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";



    var Base = __webpack_require__(8);
    var Texture = __webpack_require__(6);

    /**
     * @constructor qtek.Material
     * @extends qtek.core.Base
     */
    var Material = Base.extend(
    /** @lends qtek.Material# */
    {
        /**
         * @type {string}
         */
        name: '',

        /**
         * @type {Object}
         */
        // uniforms: null,

        /**
         * @type {qtek.Shader}
         */
        // shader: null,

        /**
         * @type {boolean}
         */
        depthTest: true,

        /**
         * @type {boolean}
         */
        depthMask: true,

        /**
         * @type {boolean}
         */
        transparent: false,
        /**
         * Blend func is a callback function when the material
         * have custom blending
         * The gl context will be the only argument passed in tho the
         * blend function
         * Detail of blend function in WebGL:
         * http://www.khronos.org/registry/gles/specs/2.0/es_full_spec_2.0.25.pdf
         *
         * Example :
         * function(_gl) {
         *  _gl.blendEquation(_gl.FUNC_ADD);
         *  _gl.blendFunc(_gl.SRC_ALPHA, _gl.ONE_MINUS_SRC_ALPHA);
         * }
         */
        blend: null,

        // shadowTransparentMap : null

        _enabledUniforms: null,
    }, function () {
        if (!this.name) {
            this.name = 'MATERIAL_' + this.__GUID__;
        }
        if (this.shader) {
            this.attachShader(this.shader);
        }
        if (!this.uniforms) {
            this.uniforms = {};
        }
    },
    /** @lends qtek.Material.prototype */
    {

        /**
         * @param  {WebGLRenderingContext} _gl
         * @param  {qtek.Shader} [shader]
         * @param  {qtek.Material} [prevMaterial]
         * @param  {qtek.Shader} [prevShader]
         * @return {Object}
         */
        bind: function(_gl, shader, prevMaterial, prevShader) {
            // PENDING Same texture in different material take different slot?

            // May use shader of other material if shader code are same
            var shader = shader || this.shader;

            // var sameShader = prevShader === shader;

            var currentTextureSlot = shader.currentTextureSlot();

            for (var u = 0; u < this._enabledUniforms.length; u++) {
                var symbol = this._enabledUniforms[u];
                var uniformValue = this.uniforms[symbol].value;
                if (uniformValue instanceof Texture) {
                    // Reset slot
                    uniformValue.__slot = -1;
                }
                else if (uniformValue instanceof Array) {
                    for (var i = 0; i < uniformValue.length; i++) {
                        if (uniformValue[i] instanceof Texture) {
                            uniformValue[i].__slot = -1;
                        }
                    }
                }
            }
            // Set uniforms
            for (var u = 0; u < this._enabledUniforms.length; u++) {
                var symbol = this._enabledUniforms[u];
                var uniform = this.uniforms[symbol];
                var uniformValue = uniform.value;

                // PENDING
                // When binding two materials with the same shader
                // Many uniforms will be be set twice even if they have the same value
                // So add a evaluation to see if the uniform is really needed to be set
                // if (prevMaterial && sameShader) {
                //     if (prevMaterial.uniforms[symbol].value === uniformValue) {
                //         continue;
                //     }
                // }
                
                if (uniformValue === null) {
                    // FIXME Assume material with same shader have same order uniforms
                    // Or if different material use same textures,
                    // the slot will be different and still skipped because optimization
                    if (uniform.type === 't') {
                        var slot = shader.currentTextureSlot();
                        var res = shader.setUniform(_gl, '1i', symbol, slot);
                        if (res) { // Texture is enabled
                            // Still occupy the slot to make sure same texture in different materials have same slot.
                            shader.takeCurrentTextureSlot(_gl, null);
                        }
                    }
                    continue;
                }
                else if (uniformValue instanceof Texture) {
                    if (uniformValue.__slot < 0) {
                        var slot = shader.currentTextureSlot();
                        var res = shader.setUniform(_gl, '1i', symbol, slot);
                        if (!res) { // Texture uniform is not enabled
                            continue;
                        }
                        shader.takeCurrentTextureSlot(_gl, uniformValue);
                        uniformValue.__slot = slot;
                    }
                    // Multiple uniform use same texture..
                    else {
                        shader.setUniform(_gl, '1i', symbol, uniformValue.__slot);
                    }
                }
                else if (uniformValue instanceof Array) {
                    if (uniformValue.length === 0) {
                        continue;
                    }
                    // Texture Array
                    var exampleValue = uniformValue[0];

                    if (exampleValue instanceof Texture) {
                        if (!shader.hasUniform(symbol)) {
                            continue;
                        }

                        var arr = [];
                        for (var i = 0; i < uniformValue.length; i++) {
                            var texture = uniformValue[i];

                            if (texture.__slot < 0) {
                                var slot = shader.currentTextureSlot();
                                arr.push(slot);
                                shader.takeCurrentTextureSlot(_gl, texture);
                                texture.__slot = slot;
                            }
                            else {
                                arr.push(texture.__slot);
                            }
                        }

                        shader.setUniform(_gl, '1iv', symbol, arr);
                    }
                    else {
                        shader.setUniform(_gl, uniform.type, symbol, uniformValue);
                    }
                }
                else{
                    shader.setUniform(_gl, uniform.type, symbol, uniformValue);
                }
            }
            // Texture slot maybe used out of material.
            shader.resetTextureSlot(currentTextureSlot);
        },

        /**
         * @param {string} symbol
         * @param {number|array|qtek.Texture|ArrayBufferView} value
         */
        setUniform: function (symbol, value) {
            if (value === undefined) {
                console.warn('Uniform value "' + symbol + '" is undefined');
            }
            var uniform = this.uniforms[symbol];
            if (uniform) {
                uniform.value = value;
            }
        },

        /**
         * @param {Object} obj
         */
        setUniforms: function(obj) {
            for (var key in obj) {
                var val = obj[key];
                this.setUniform(key, val);
            }
        },

        /**
         * Enable a uniform
         * It only have effect on the uniform exists in shader.
         * @param  {string} symbol
         */
        // enableUniform: function (symbol) {
        //     if (this.uniforms[symbol] && !this.isUniformEnabled(symbol)) {
        //         this._enabledUniforms.push(symbol);
        //     }
        // },

        // /**
        //  * Disable a uniform
        //  * It will not affect the uniform state in the shader. Because the shader uniforms is parsed from shader code with naive regex. When using micro to disable some uniforms in the shader. It will still try to set these uniforms in each rendering pass. We can disable these uniforms manually if we need this bit performance improvement. Mostly we can simply ignore it.
        //  * @param  {string} symbol
        //  */
        // disableUniform: function (symbol) {
        //     var idx = this._enabledUniforms.indexOf(symbol);
        //     if (idx >= 0) {
        //         this._enabledUniforms.splice(idx, 1);
        //     }
        // },

        /**
         * @param  {string}  symbol
         * @return {boolean}
         */
        isUniformEnabled: function (symbol) {
            return this._enabledUniforms.indexOf(symbol) >= 0;
        },

        /**
         * Alias of setUniform and setUniforms
         * @param {object|string} symbol
         * @param {number|array|qtek.Texture|ArrayBufferView} [value]
         */
        set: function (symbol, value) {
            if (typeof(symbol) === 'object') {
                for (var key in symbol) {
                    var val = symbol[key];
                    this.set(key, val);
                }
            }
            else {
                var uniform = this.uniforms[symbol];
                if (uniform) {
                    if (typeof value === 'undefined') {
                        console.warn('Uniform value "' + symbol + '" is undefined');
                        value = null;
                    }
                    uniform.value = value;
                }
            }
        },
        /**
         * Get uniform value
         * @param  {string} symbol
         * @return {number|array|qtek.Texture|ArrayBufferView}
         */
        get: function (symbol) {
            var uniform = this.uniforms[symbol];
            if (uniform) {
                return uniform.value;
            }
        },
        /**
         * Attach a shader instance
         * @param  {qtek.Shader} shader
         * @param  {boolean} keepUniform If try to keep uniform value
         */
        attachShader: function(shader, keepUniform) {
            if (this.shader) {
                this.shader.detached();
            }

            var originalUniforms = this.uniforms;

            // Ignore if uniform can use in shader.
            this.uniforms = shader.createUniforms();
            this.shader = shader;

            var uniforms = this.uniforms;
            this._enabledUniforms = Object.keys(uniforms);
            // Make sure uniforms are set in same order to avoid texture slot wrong
            this._enabledUniforms.sort();

            if (keepUniform) {
                for (var symbol in originalUniforms) {
                    if (uniforms[symbol]) {
                        uniforms[symbol].value = originalUniforms[symbol].value;
                    }
                }
            }

            shader.attached();
        },

        /**
         * Detach a shader instance
         */
        detachShader: function() {
            this.shader.detached();
            this.shader = null;
            this.uniforms = {};
        },

        /**
         * Clone a new material and keep uniforms, shader will not be cloned
         * @return {qtek.Material}
         */
        clone: function () {
            var material = new this.constructor({
                name: this.name,
                shader: this.shader
            });
            for (var symbol in this.uniforms) {
                material.uniforms[symbol].value = this.uniforms[symbol].value;
            }
            material.depthTest = this.depthTest;
            material.depthMask = this.depthMask;
            material.transparent = this.transparent;
            material.blend = this.blend;

            return material;
        },

        /**
         * Dispose material, if material shader is not attached to any other materials
         * Shader will also be disposed
         * @param {WebGLRenderingContext} gl
         * @param {boolean} [disposeTexture=false] If dispose the textures used in the material
         */
        dispose: function(_gl, disposeTexture) {
            if (disposeTexture) {
                for (var name in this.uniforms) {
                    var val = this.uniforms[name].value;
                    if (!val) {
                        continue;
                    }
                    if (val instanceof Texture) {
                        val.dispose(_gl);
                    }
                    else if (val instanceof Array) {
                        for (var i = 0; i < val.length; i++) {
                            if (val[i] instanceof Texture) {
                                val[i].dispose(_gl);
                            }
                        }
                    }
                }
            }
            var shader = this.shader;
            if (shader) {
                this.detachShader();
                if (!shader.isAttachedToAny()) {
                    shader.dispose(_gl);
                }
            }
        }
    });

    module.exports = Material;


/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/**
 * @namespace qtek.core.glinfo
 * @see http://www.khronos.org/registry/webgl/extensions/
 */


    var EXTENSION_LIST = [
        'OES_texture_float',
        'OES_texture_half_float',
        'OES_texture_float_linear',
        'OES_texture_half_float_linear',
        'OES_standard_derivatives',
        'OES_vertex_array_object',
        'OES_element_index_uint',
        'WEBGL_compressed_texture_s3tc',
        'WEBGL_depth_texture',
        'EXT_texture_filter_anisotropic',
        'EXT_shader_texture_lod',
        'WEBGL_draw_buffers',
        'EXT_frag_depth',
        'EXT_sRGB'
    ];

    var PARAMETER_NAMES = [
        'MAX_TEXTURE_SIZE',
        'MAX_CUBE_MAP_TEXTURE_SIZE'
    ];

    var extensions = {};
    var parameters = {};

    var glinfo = {
        /**
         * Initialize all extensions and parameters in context
         * @param  {WebGLRenderingContext} _gl
         * @memberOf qtek.core.glinfo
         */
        initialize: function (_gl) {
            var glid = _gl.__GLID__;
            if (extensions[glid]) {
                return;
            }
            extensions[glid] = {};
            parameters[glid] = {};
            // Get webgl extension
            for (var i = 0; i < EXTENSION_LIST.length; i++) {
                var extName = EXTENSION_LIST[i];

                this._createExtension(_gl, extName);
            }
            // Get parameters
            for (var i = 0; i < PARAMETER_NAMES.length; i++) {
                var name = PARAMETER_NAMES[i];
                parameters[glid][name] = _gl.getParameter(_gl[name]);
            }
        },

        /**
         * Get extension
         * @param  {WebGLRenderingContext} _gl
         * @param {string} name - Extension name, vendorless
         * @return {WebGLExtension}
         * @memberOf qtek.core.glinfo
         */
        getExtension: function (_gl, name) {
            var glid = _gl.__GLID__;
            if (extensions[glid]) {
                if (typeof(extensions[glid][name]) == 'undefined') {
                    this._createExtension(_gl, name);
                }
                return extensions[glid][name];
            }
        },

        /**
         * Get parameter
         * @param {WebGLRenderingContext} _gl
         * @param {string} name Parameter name
         * @return {*}
         */
        getParameter: function (_gl, name) {
            var glid = _gl.__GLID__;
            if (parameters[glid]) {
                return parameters[glid][name];
            }
        },

        /**
         * Dispose context
         * @param  {WebGLRenderingContext} _gl
         * @memberOf qtek.core.glinfo
         */
        dispose: function (_gl) {
            delete extensions[_gl.__GLID__];
            delete parameters[_gl.__GLID__];
        },

        _createExtension: function (_gl, name) {
            var ext = _gl.getExtension(name);
            if (!ext) {
                ext = _gl.getExtension('MOZ_' + name);
            }
            if (!ext) {
                ext = _gl.getExtension('WEBKIT_' + name);
            }

            extensions[_gl.__GLID__][name] = ext;
        }
    };

    module.exports = glinfo;


/***/ }),
/* 18 */
/***/ (function(module, exports) {

module.exports = function (seriesType, ecModel, api) {
    ecModel.eachSeriesByType(seriesType, function (seriesModel) {
        var data = seriesModel.getData();
        var opacityAccessPath = seriesModel.visualColorAccessPath.split('.');
        opacityAccessPath[opacityAccessPath.length - 1] ='opacity';

        var opacity = seriesModel.get(opacityAccessPath);

        data.setVisual('opacity', opacity == null ? 1 : opacity);

        if (data.hasItemOption) {
            data.each(function (idx) {
                var itemModel = data.getItemModel(idx);
                var opacity = itemModel.get(opacityAccessPath);
                if (opacity != null) {
                    data.setItemVisual(idx, 'opacity', opacity);
                }
            });
        }
    });
};

/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";



    var Node = __webpack_require__(35);

    /**
     * @constructor qtek.Light
     * @extends qtek.Node
     */
    var Light = Node.extend(function(){
        return /** @lends qtek.Light# */ {
            /**
             * Light RGB color
             * @type {number[]}
             */
            color: [1, 1, 1],

            /**
             * Light intensity
             * @type {number}
             */
            intensity: 1.0,

            // Config for shadow map
            /**
             * If light cast shadow
             * @type {boolean}
             */
            castShadow: true,

            /**
             * Shadow map size
             * @type {number}
             */
            shadowResolution: 512,

            /**
             * Light group, shader with same `lightGroup` will be affected
             *
             * Only useful in forward rendering
             * @type {number}
             */
            group: 0
        };
    },
    /** @lends qtek.Light.prototype. */
    {
        /**
         * Light type
         * @type {string}
         * @memberOf qtek.Light#
         */
        type: '',

        /**
         * @return {qtek.Light}
         * @memberOf qtek.Light.prototype
         */
        clone: function() {
            var light = Node.prototype.clone.call(this);
            light.color = Array.prototype.slice.call(this.color);
            light.intensity = this.intensity;
            light.castShadow = this.castShadow;
            light.shadowResolution = this.shadowResolution;

            return light;
        }
    });

    module.exports = Light;


/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";



    var supportWebGL = true;
    try {
        var canvas = document.createElement('canvas');
        var gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
        if (!gl) {
            throw new Error();
        }
    } catch (e) {
        supportWebGL = false;
    }

    var vendor = {};

    /**
     * If support WebGL
     * @return {boolean}
     */
    vendor.supportWebGL = function () {
        return supportWebGL;
    };


    vendor.Int8Array = typeof Int8Array == 'undefined' ? Array : Int8Array;

    vendor.Uint8Array = typeof Uint8Array == 'undefined' ? Array : Uint8Array;

    vendor.Uint16Array = typeof Uint16Array == 'undefined' ? Array : Uint16Array;

    vendor.Uint32Array = typeof Uint32Array == 'undefined' ? Array : Uint32Array;

    vendor.Int16Array = typeof Int16Array == 'undefined' ? Array : Int16Array;

    vendor.Float32Array = typeof Float32Array == 'undefined' ? Array : Float32Array;

    vendor.Float64Array = typeof Float64Array == 'undefined' ? Array : Float64Array;

    module.exports = vendor;


/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

/*
 * @module echarts-gl/core/ViewGL
 * @author Yi Shen(http://github.com/pissang)
 */

var echarts = __webpack_require__(0);

var Scene = __webpack_require__(26);
var ShadowMapPass = __webpack_require__(211);
var PerspectiveCamera = __webpack_require__(44);
var OrthographicCamera = __webpack_require__(36);
var Matrix4 = __webpack_require__(9);
var Vector3 = __webpack_require__(3);
var Vector2 = __webpack_require__(28);

var notifier = __webpack_require__(53);

var EffectCompositor = __webpack_require__(158);
var TemporalSuperSampling = __webpack_require__(164);
var halton = __webpack_require__(39);

/**
 * @constructor
 * @alias module:echarts-gl/core/ViewGL
 * @param {string} [projection='perspective']
 */
function ViewGL(projection) {

    projection = projection || 'perspective';

    /**
     * @type {module:echarts-gl/core/LayerGL}
     */
    this.layer = null;
    /**
     * @type {qtek.Scene}
     */
    this.scene = new Scene();

    /**
     * @type {qtek.Node}
     */
    this.rootNode = this.scene;

    this.viewport = {
        x: 0, y: 0, width: 0, height: 0
    };

    this.setProjection(projection);

    this._compositor = new EffectCompositor();

    this._temporalSS = new TemporalSuperSampling();

    this._shadowMapPass = new ShadowMapPass();

    var pcfKernels = [];
    var off = 0;
    for (var i = 0; i < 30; i++) {
        var pcfKernel = [];
        for (var k = 0; k < 6; k++) {
            pcfKernel.push(halton(off, 2) * 4.0 - 2.0);
            pcfKernel.push(halton(off, 3) * 4.0 - 2.0);
            off++;
        }
        pcfKernels.push(pcfKernel);
    }
    this._pcfKernels = pcfKernels;

    this.scene.on('beforerender', function (renderer, scene, camera) {
        if (this.needsTemporalSS()) {
            this._temporalSS.jitterProjection(renderer, camera);
        }
    }, this);
}

/**
 * Set camera type of group
 * @param {string} cameraType 'perspective' | 'orthographic'
 */
ViewGL.prototype.setProjection = function (projection) {
    var oldCamera = this.camera;
    oldCamera && oldCamera.update();
    if (projection === 'perspective') {
        if (!(this.camera instanceof PerspectiveCamera)) {
            this.camera = new PerspectiveCamera();
            if (oldCamera) {
                this.camera.setLocalTransform(oldCamera.localTransform);
            }
        }
    }
    else {
        if (!(this.camera instanceof OrthographicCamera)) {
            this.camera = new OrthographicCamera();
            if (oldCamera) {
                this.camera.setLocalTransform(oldCamera.localTransform);
            }
        }
    }
    // PENDING
    this.camera.near = 0.1;
    this.camera.far = 2000;
};

/**
 * Set viewport of group
 * @param {number} x Viewport left bottom x
 * @param {number} y Viewport left bottom y
 * @param {number} width Viewport height
 * @param {number} height Viewport height
 * @param {number} [dpr=1]
 */
ViewGL.prototype.setViewport = function (x, y, width, height, dpr) {
    if (this.camera instanceof PerspectiveCamera) {
        this.camera.aspect = width / height;
    }
    dpr = dpr || 1;

    this.viewport.x = x;
    this.viewport.y = y;
    this.viewport.width = width;
    this.viewport.height = height;
    this.viewport.devicePixelRatio = dpr;

    // Source and output of compositor use high dpr texture.
    // But the intermediate texture of bloom, dof effects use fixed 1.0 dpr
    this._compositor.resize(width * dpr, height * dpr);
    this._temporalSS.resize(width * dpr, height * dpr);
};

/**
 * If contain screen point x, y
 * @param {number} x offsetX
 * @param {number} y offsetY
 * @return {boolean}
 */
ViewGL.prototype.containPoint = function (x, y) {
    var viewport = this.viewport;
    var height = this.layer.renderer.getHeight();
    // Flip y;
    y = height - y;
    return x >= viewport.x && y >= viewport.y
        && x <= viewport.x + viewport.width && y <= viewport.y + viewport.height;
};

/**
 * Cast a ray
 * @param {number} x offsetX
 * @param {number} y offsetY
 * @param {qtek.math.Ray} out
 * @return {qtek.math.Ray}
 */
var ndc = new Vector2();
ViewGL.prototype.castRay = function (x, y, out) {
    var renderer = this.layer.renderer;

    var oldViewport = renderer.viewport;
    renderer.viewport = this.viewport;
    renderer.screenToNDC(x, y, ndc);
    this.camera.castRay(ndc, out);
    renderer.viewport = oldViewport;

    return out;
};

/**
 * Prepare and update scene before render
 */
ViewGL.prototype.prepareRender = function () {
    this.scene.update();
    this.camera.update();

    this._needsSortProgressively = false;
    // If has any transparent mesh needs sort triangles progressively.
    for (var i = 0; i < this.scene.transparentQueue.length; i++) {
        var renderable = this.scene.transparentQueue[i];
        var geometry = renderable.geometry;
        if (geometry.needsSortVerticesProgressively && geometry.needsSortVerticesProgressively()) {
            this._needsSortProgressively = true;
        }
        if (geometry.needsSortTrianglesProgressively && geometry.needsSortTrianglesProgressively()) {
            this._needsSortProgressively = true;
        }
    }

    this._frame = 0;
    this._temporalSS.resetFrame();
};

ViewGL.prototype.render = function (renderer, accumulating) {
    this._doRender(renderer, accumulating, this._frame);
    this._frame++;
};

ViewGL.prototype.needsAccumulate = function () {
    return this.needsTemporalSS() || this._needsSortProgressively;
};

ViewGL.prototype.needsTemporalSS = function () {
    var enableTemporalSS = this._enableTemporalSS;
    if (enableTemporalSS == 'auto') {
        enableTemporalSS = this._enablePostEffect;
    }
    return enableTemporalSS;
};

ViewGL.prototype.hasDOF = function () {
    return this._enableDOF;
};

ViewGL.prototype.isAccumulateFinished = function () {
    return this.needsTemporalSS() ? this._temporalSS.isFinished()
        : (this._frame > 30);
};

ViewGL.prototype._doRender = function (renderer, accumulating, accumFrame) {

    var scene = this.scene;
    var camera = this.camera;

    accumFrame = accumFrame || 0;

    this._updateTransparent(renderer, scene, camera, accumFrame);

    if (!accumulating) {
        this._shadowMapPass.kernelPCF = this._pcfKernels[0];
        // Not render shadowmap pass in accumulating frame.
        this._shadowMapPass.render(renderer, scene, camera, true);
    }

    this._updateShadowPCFKernel(accumFrame);

    // Shadowmap will set clearColor.
    renderer.gl.clearColor(0.0, 0.0, 0.0, 0.0);

    if (this._enablePostEffect) {
        // normal render also needs to be jittered when have edge pass.
        if (this.needsTemporalSS()) {
            this._temporalSS.jitterProjection(renderer, camera);
        }
        this._compositor.updateNormal(renderer, scene, camera, this._temporalSS.getFrame());
    }

    // Always update SSAO to make sure have correct ssaoMap status
    this._updateSSAO(renderer, scene, camera, this._temporalSS.getFrame());

    if (this._enablePostEffect) {

        var frameBuffer = this._compositor.getSourceFrameBuffer();
        frameBuffer.bind(renderer);
        renderer.gl.clear(renderer.gl.DEPTH_BUFFER_BIT | renderer.gl.COLOR_BUFFER_BIT);
        renderer.render(scene, camera, true, true);
        frameBuffer.unbind(renderer);

        if (this.needsTemporalSS() && accumulating) {
            this._compositor.composite(renderer, camera, this._temporalSS.getSourceFrameBuffer(), this._temporalSS.getFrame());
            renderer.setViewport(this.viewport);
            this._temporalSS.render(renderer);
        }
        else {
            renderer.setViewport(this.viewport);
            this._compositor.composite(renderer, camera, null, 0);
        }
    }
    else {
        if (this.needsTemporalSS() && accumulating) {
            var frameBuffer = this._temporalSS.getSourceFrameBuffer();
            frameBuffer.bind(renderer);
            renderer.saveClear();
            renderer.clearBit = renderer.gl.DEPTH_BUFFER_BIT | renderer.gl.COLOR_BUFFER_BIT;
            renderer.render(scene, camera, true);
            renderer.restoreClear();
            frameBuffer.unbind(renderer);

            renderer.setViewport(this.viewport);
            this._temporalSS.render(renderer);
        }
        else {
            renderer.setViewport(this.viewport);
            renderer.render(scene, camera, true, true);
        }
    }

    // this._shadowMapPass.renderDebug(renderer);
    // this._compositor._normalPass.renderDebug(renderer);
};

ViewGL.prototype._updateTransparent = function (renderer, scene, camera, frame) {

    var v3 = new Vector3();
    var invWorldTransform = new Matrix4();
    var cameraWorldPosition = camera.getWorldPosition();

    // Sort transparent object.
    for (var i = 0; i < scene.transparentQueue.length; i++) {
        var renderable = scene.transparentQueue[i];
        var geometry = renderable.geometry;
        Matrix4.invert(invWorldTransform, renderable.worldTransform);
        Vector3.transformMat4(v3, cameraWorldPosition, invWorldTransform);
        if (geometry.needsSortTriangles && geometry.needsSortTriangles()) {
            geometry.doSortTriangles(v3, frame);
        }
        if (geometry.needsSortVertices && geometry.needsSortVertices()) {
            geometry.doSortVertices(v3, frame);
        }
    }
};

ViewGL.prototype._updateSSAO = function (renderer, scene, camera, frame) {
    var ifEnableSSAO = this._enableSSAO && this._enablePostEffect;
    if (ifEnableSSAO) {
        this._compositor.updateSSAO(renderer, scene, camera, this._temporalSS.getFrame());
    }

    for (var i = 0; i < scene.opaqueQueue.length; i++) {
        var renderable = scene.opaqueQueue[i];
        // PENDING
        if (renderable.renderNormal) {
            renderable.material.shader[ifEnableSSAO ? 'enableTexture' : 'disableTexture']('ssaoMap');
        }
        if (ifEnableSSAO) {
            renderable.material.set('ssaoMap', this._compositor.getSSAOTexture());
        }
    }
};

ViewGL.prototype._updateShadowPCFKernel = function (frame) {
    var pcfKernel = this._pcfKernels[frame % this._pcfKernels.length];
    var opaqueQueue = this.scene.opaqueQueue;
    for (var i = 0; i < opaqueQueue.length; i++) {
        if (opaqueQueue[i].receiveShadow) {
            opaqueQueue[i].material.set('pcfKernel', pcfKernel);
            opaqueQueue[i].material.shader.define('fragment', 'PCF_KERNEL_SIZE', pcfKernel.length / 2);
        }
    }
};

ViewGL.prototype.dispose = function (renderer) {
    this._compositor.dispose(renderer.gl);
    this._temporalSS.dispose(renderer.gl);
    this._shadowMapPass.dispose(renderer);
};
/**
 * @param {module:echarts/Model} Post effect model
 */
ViewGL.prototype.setPostEffect = function (postEffectModel, api) {
    var compositor = this._compositor;
    this._enablePostEffect = postEffectModel.get('enable');
    var bloomModel = postEffectModel.getModel('bloom');
    var edgeModel = postEffectModel.getModel('edge');
    var dofModel = postEffectModel.getModel('DOF', postEffectModel.getModel('depthOfField'));
    var ssaoModel = postEffectModel.getModel('SSAO', postEffectModel.getModel('screenSpaceAmbientOcclusion'));
    var ssrModel = postEffectModel.getModel('SSR', postEffectModel.getModel('screenSpaceReflection'));
    var fxaaModel = postEffectModel.getModel('FXAA');
    var colorCorrModel = postEffectModel.getModel('colorCorrection');
    bloomModel.get('enable') ? compositor.enableBloom() : compositor.disableBloom();
    dofModel.get('enable') ? compositor.enableDOF() : compositor.disableDOF();
    ssrModel.get('enable') ? compositor.enableSSR() : compositor.disableSSR();
    colorCorrModel.get('enable') ? compositor.enableColorCorrection() : compositor.disableColorCorrection();
    edgeModel.get('enable') ? compositor.enableEdge() : compositor.disableEdge();
    fxaaModel.get('enable') ? compositor.enableFXAA() : compositor.disableFXAA();

    this._enableDOF = dofModel.get('enable');
    this._enableSSAO = ssaoModel.get('enable');

    this._enableSSAO ? compositor.enableSSAO() : compositor.disableSSAO();

    compositor.setBloomIntensity(bloomModel.get('intensity'));
    compositor.setEdgeColor(edgeModel.get('color'));
    compositor.setColorLookupTexture(colorCorrModel.get('lookupTexture'), api);
    compositor.setExposure(colorCorrModel.get('exposure'));

    ['radius', 'quality', 'intensity'].forEach(function (name) {
        compositor.setSSAOParameter(name, ssaoModel.get(name));
    });
    ['quality', 'maxRoughness'].forEach(function (name) {
        compositor.setSSRParameter(name, ssrModel.get(name));
    });
    ['quality', 'focalDistance', 'focalRange', 'blurRadius', 'fstop'].forEach(function (name) {
        compositor.setDOFParameter(name, dofModel.get(name));
    });
    ['brightness', 'contrast', 'saturation'].forEach(function (name) {
        compositor.setColorCorrection(name, colorCorrModel.get(name));
    });
    
};

ViewGL.prototype.setDOFFocusOnPoint = function (depth) {
    if (this._enablePostEffect) {

        if (depth > this.camera.far || depth < this.camera.near) {
            return;
        }

        this._compositor.setDOFParameter('focalDistance', depth);
        return true;
    }
};

ViewGL.prototype.setTemporalSuperSampling = function (temporalSuperSamplingModel) {
    this._enableTemporalSS = temporalSuperSamplingModel.get('enable');
};

ViewGL.prototype.isLinearSpace = function () {
    return this._enablePostEffect;
};

ViewGL.prototype.setRootNode = function (rootNode) {
    if (this.rootNode === rootNode) {
        return;
    }
    var children = this.rootNode.children();
    for (var i = 0; i < children.length; i++) {
        rootNode.add(children[i]);
    }
    if (rootNode !== this.scene) {
        this.scene.add(rootNode);
    }

    this.rootNode = rootNode;
};
// Proxies
ViewGL.prototype.add = function (node3D) {
    this.rootNode.add(node3D);
};
ViewGL.prototype.remove = function (node3D) {
    this.rootNode.remove(node3D);
};
ViewGL.prototype.removeAll = function (node3D) {
    this.rootNode.removeAll(node3D);
};

echarts.util.extend(ViewGL.prototype, notifier);

module.exports = ViewGL;

/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

/**
 * Lines geometry
 * Use screen space projected lines lineWidth > MAX_LINE_WIDTH
 * https://mattdesl.svbtle.com/drawing-lines-is-hard
 * @module echarts-gl/util/geometry/LinesGeometry
 * @author Yi Shen(http://github.com/pissang)
 */

var StaticGeometry = __webpack_require__(13);
var vec3 = __webpack_require__(1).vec3;
var echarts = __webpack_require__(0);
var dynamicConvertMixin = __webpack_require__(34);

// var CURVE_RECURSION_LIMIT = 8;
// var CURVE_COLLINEAR_EPSILON = 40;

var sampleLinePoints = [[0, 0], [1, 1]];
/**
 * @constructor
 * @alias module:echarts-gl/util/geometry/LinesGeometry
 * @extends qtek.StaticGeometry
 */

var LinesGeometry = StaticGeometry.extend(function () {
    return {

        segmentScale: 1,

        dynamic: true,
        /**
         * Need to use mesh to expand lines if lineWidth > MAX_LINE_WIDTH
         */
        useNativeLine: true,

        attributes: {
            position: new StaticGeometry.Attribute('position', 'float', 3, 'POSITION'),
            positionPrev: new StaticGeometry.Attribute('positionPrev', 'float', 3),
            positionNext: new StaticGeometry.Attribute('positionNext', 'float', 3),
            prevPositionPrev: new StaticGeometry.Attribute('prevPositionPrev', 'float', 3),
            prevPosition: new StaticGeometry.Attribute('prevPosition', 'float', 3),
            prevPositionNext: new StaticGeometry.Attribute('prevPositionNext', 'float', 3),
            offset: new StaticGeometry.Attribute('offset', 'float', 1),
            color: new StaticGeometry.Attribute('color', 'float', 4, 'COLOR')
        }
    };
},
/** @lends module: echarts-gl/util/geometry/LinesGeometry.prototype */
{

    /**
     * Reset offset
     */
    resetOffset: function () {
        this._vertexOffset = 0;
        this._triangleOffset = 0;

        this._itemVertexOffsets = [];
    },

    /**
     * @param {number} nVertex
     */
    setVertexCount: function (nVertex) {
        var attributes = this.attributes;
        if (this.vertexCount !== nVertex) {
            attributes.position.init(nVertex);
            attributes.color.init(nVertex);

            if (!this.useNativeLine) {
                attributes.positionPrev.init(nVertex);
                attributes.positionNext.init(nVertex);
                attributes.offset.init(nVertex);
            }

            if (nVertex > 0xffff) {
                if (this.indices instanceof Uint16Array) {
                    this.indices = new Uint32Array(this.indices);
                }
            }
            else {
                if (this.indices instanceof Uint32Array) {
                    this.indices = new Uint16Array(this.indices);
                }
            }
        }
    },

    /**
     * @param {number} nTriangle
     */
    setTriangleCount: function (nTriangle) {
        if (this.triangleCount !== nTriangle) {
            if (nTriangle === 0) {
                this.indices = null;
            }
            else {
                this.indices = this.vertexCount > 0xffff ? new Uint32Array(nTriangle * 3) : new Uint16Array(nTriangle * 3);
            }
        }
    },

    _getCubicCurveApproxStep: function (p0, p1, p2, p3) {
        var len = vec3.dist(p0, p1) + vec3.dist(p2, p1) + vec3.dist(p3, p2);
        var step = 1 / (len + 1) * this.segmentScale;
        return step;
    },

    /**
     * Get vertex count of cubic curve
     * @param {Array.<number>} p0
     * @param {Array.<number>} p1
     * @param {Array.<number>} p2
     * @param {Array.<number>} p3
     * @return number
     */
    getCubicCurveVertexCount: function (p0, p1, p2, p3) {
        var step = this._getCubicCurveApproxStep(p0, p1, p2, p3);
        var segCount = Math.ceil(1 / step);
        if (!this.useNativeLine) {
            return segCount * 2 + 2;
        }
        else {
            return segCount * 2;
        }
    },

    /**
     * Get face count of cubic curve
     * @param {Array.<number>} p0
     * @param {Array.<number>} p1
     * @param {Array.<number>} p2
     * @param {Array.<number>} p3
     * @return number
     */
    getCubicCurveTriangleCount: function (p0, p1, p2, p3) {
        var step = this._getCubicCurveApproxStep(p0, p1, p2, p3);
        var segCount = Math.ceil(1 / step);
        if (!this.useNativeLine) {
            return segCount * 2;
        }
        else {
            return 0;
        }
    },

    /**
     * Get vertex count of line
     * @return {number}
     */
    getLineVertexCount: function () {
        return this.getPolylineVertexCount(sampleLinePoints);
    },

    /**
     * Get face count of line
     * @return {number}
     */
    getLineTriangleCount: function () {
        return this.getPolylineTriangleCount(sampleLinePoints);
    },

    getPolylineVertexCount: function (points) {
        var is2DArray = typeof points[0] !== 'number';
        var pointsLen = is2DArray ? points.length : (points.length / 3);
        return !this.useNativeLine ? ((pointsLen - 1) * 2 + 2) : (pointsLen - 1) * 2;
    },

    getPolylineTriangleCount: function (points) {
        var is2DArray = typeof points[0] !== 'number';
        var pointsLen = is2DArray ? points.length : (points.length / 3);
        return !this.useNativeLine ? Math.max(pointsLen - 1, 0) * 2 : 0;
    },

    /**
     * Add a cubic curve
     * @param {Array.<number>} p0
     * @param {Array.<number>} p1
     * @param {Array.<number>} p2
     * @param {Array.<number>} p3
     * @param {Array.<number>} color
     * @param {number} [lineWidth=1]
     */
    addCubicCurve: function (p0, p1, p2, p3, color, lineWidth) {
        if (lineWidth == null) {
            lineWidth = 1;
        }
        // incremental interpolation
        // http://antigrain.com/research/bezier_interpolation/index.html#PAGE_BEZIER_INTERPOLATION
        var x0 = p0[0], y0 = p0[1], z0 = p0[2];
        var x1 = p1[0], y1 = p1[1], z1 = p1[2];
        var x2 = p2[0], y2 = p2[1], z2 = p2[2];
        var x3 = p3[0], y3 = p3[1], z3 = p3[2];

        var step = this._getCubicCurveApproxStep(p0, p1, p2, p3);

        var step2 = step * step;
        var step3 = step2 * step;

        var pre1 = 3.0 * step;
        var pre2 = 3.0 * step2;
        var pre4 = 6.0 * step2;
        var pre5 = 6.0 * step3;

        var tmp1x = x0 - x1 * 2.0 + x2;
        var tmp1y = y0 - y1 * 2.0 + y2;
        var tmp1z = z0 - z1 * 2.0 + z2;

        var tmp2x = (x1 - x2) * 3.0 - x0 + x3;
        var tmp2y = (y1 - y2) * 3.0 - y0 + y3;
        var tmp2z = (z1 - z2) * 3.0 - z0 + z3;

        var fx = x0;
        var fy = y0;
        var fz = z0;

        var dfx = (x1 - x0) * pre1 + tmp1x * pre2 + tmp2x * step3;
        var dfy = (y1 - y0) * pre1 + tmp1y * pre2 + tmp2y * step3;
        var dfz = (z1 - z0) * pre1 + tmp1z * pre2 + tmp2z * step3;

        var ddfx = tmp1x * pre4 + tmp2x * pre5;
        var ddfy = tmp1y * pre4 + tmp2y * pre5;
        var ddfz = tmp1z * pre4 + tmp2z * pre5;

        var dddfx = tmp2x * pre5;
        var dddfy = tmp2y * pre5;
        var dddfz = tmp2z * pre5;

        var t = 0;

        var k = 0;
        var segCount = Math.ceil(1 / step);

        var points = new Float32Array((segCount + 1) * 3);
        var points = [];
        var offset = 0;
        for (var k = 0; k < segCount + 1; k++) {
            points[offset++] = fx;
            points[offset++] = fy;
            points[offset++] = fz;

            fx += dfx; fy += dfy; fz += dfz;
            dfx += ddfx; dfy += ddfy; dfz += ddfz;
            ddfx += dddfx; ddfy += dddfy; ddfz += dddfz;
            t += step;

            if (t > 1) {
                fx = dfx > 0 ? Math.min(fx, x3) : Math.max(fx, x3);
                fy = dfy > 0 ? Math.min(fy, y3) : Math.max(fy, y3);
                fz = dfz > 0 ? Math.min(fz, z3) : Math.max(fz, z3);
            }
        }

        return this.addPolyline(points, color, lineWidth, false);
    },

    /**
     * Add a straight line
     * @param {Array.<number>} p0
     * @param {Array.<number>} p1
     * @param {Array.<number>} color
     * @param {number} [lineWidth=1]
     */
    addLine: function (p0, p1, color, lineWidth) {
        return this.addPolyline([p0, p1], color, lineWidth, false);
    },

    /**
     * Add a straight line
     * @param {Array.<Array> | Array.<number>} points
     * @param {Array.<number> | Array.<Array>} color
     * @param {number} [lineWidth=1]
     * @param {boolean} [notSharingColor=false]
     */
    addPolyline: function (points, color, lineWidth, notSharingColor) {
        if (!points.length) {
            return;
        }

        this._itemVertexOffsets.push(this._vertexOffset);

        var is2DArray = typeof points[0] !== 'number';
        var positionAttr = this.attributes.position;
        var positionPrevAttr = this.attributes.positionPrev;
        var positionNextAttr = this.attributes.positionNext;
        var colorAttr = this.attributes.color;
        var offsetAttr = this.attributes.offset;
        var indices = this.indices;

        var vertexOffset = this._vertexOffset;
        var pointCount = is2DArray ? points.length : points.length / 3;
        var iterCount = pointCount;
        var point;
        var pointColor;
        if (pointCount < 2) {
            return;
        }

        if (lineWidth == null) {
            lineWidth = 1;
        }
        lineWidth = Math.max(lineWidth, 0.01);

        for (var k = 0; k < iterCount; k++) {
            if (is2DArray) {
                point = points[k];
                if (notSharingColor) {
                    pointColor = color[k];
                }
                else {
                    pointColor = color;
                }
            }
            else {
                var k3 = k * 3;
                point = point || [];
                point[0] = points[k3];
                point[1] = points[k3 + 1];
                point[2] = points[k3 + 2];

                if (notSharingColor) {
                    var k4 = k * 4;
                    pointColor = pointColor || [];
                    pointColor[0] = color[k4];
                    pointColor[1] = color[k4 + 1];
                    pointColor[2] = color[k4 + 2];
                    pointColor[3] = color[k4 + 3];
                }
                else {
                    pointColor = color;
                }
            }
            if (!this.useNativeLine) {
                if (k < iterCount - 1) {
                    // Set to next two points
                    positionPrevAttr.set(vertexOffset + 2, point);
                    positionPrevAttr.set(vertexOffset + 3, point);
                }
                if (k > 0) {
                    // Set to previous two points
                    positionNextAttr.set(vertexOffset - 2, point);
                    positionNextAttr.set(vertexOffset - 1, point);
                }

                positionAttr.set(vertexOffset, point);
                positionAttr.set(vertexOffset + 1, point);

                colorAttr.set(vertexOffset, pointColor);
                colorAttr.set(vertexOffset + 1, pointColor);

                offsetAttr.set(vertexOffset, lineWidth / 2);
                offsetAttr.set(vertexOffset + 1, -lineWidth / 2);

                vertexOffset += 2;
            }
            else {
                if (k > 1) {
                    positionAttr.copy(vertexOffset, vertexOffset - 1);
                    colorAttr.copy(vertexOffset, vertexOffset - 1);
                    vertexOffset++;
                }
            }

            if (!this.useNativeLine) {
                if (k > 0) {
                    var idx3 = this._triangleOffset * 3;
                    var indices = this.indices;
                    // 0-----2
                    // 1-----3
                    // 0->1->2, 1->3->2
                    indices[idx3] = vertexOffset - 4;
                    indices[idx3 + 1] = vertexOffset - 3;
                    indices[idx3 + 2] = vertexOffset - 2;

                    indices[idx3 + 3] = vertexOffset - 3;
                    indices[idx3 + 4] = vertexOffset - 1;
                    indices[idx3 + 5] = vertexOffset - 2;

                    this._triangleOffset += 2;
                }
            }
            else {
                colorAttr.set(vertexOffset, pointColor);
                positionAttr.set(vertexOffset, point);
                vertexOffset++;
            }
        }
        if (!this.useNativeLine) {
            var start = this._vertexOffset;
            var end = this._vertexOffset + pointCount * 2;
            positionPrevAttr.copy(start, start + 2);
            positionPrevAttr.copy(start + 1, start + 3);
            positionNextAttr.copy(end - 1, end - 3);
            positionNextAttr.copy(end - 2, end - 4);
        }

        this._vertexOffset = vertexOffset;

        return this._vertexOffset;
    },

    /**
     * Set color of single line.
     */
    setItemColor: function (idx, color) {
        var startOffset = this._itemVertexOffsets[idx];
        var endOffset = idx < this._itemVertexOffsets.length - 1 ? this._itemVertexOffsets[idx + 1] : this._vertexOffset;
        
        for (var i = startOffset; i < endOffset; i++) {
            this.attributes.color.set(i, color);
        }
        this.dirty('color');
    },

    /**
     * @return {number}
     */
    currentTriangleOffset: function () {
        return this._triangleOffset;
    },

    /**
     * @return {number}
     */
    currentVertexOffset: function () {
        return this._vertexOffset;
    }
});

echarts.util.defaults(LinesGeometry.prototype, dynamicConvertMixin);

module.exports = LinesGeometry;

/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {



    var Texture = __webpack_require__(6);
    var glinfo = __webpack_require__(17);
    var glenum = __webpack_require__(11);
    var util = __webpack_require__(27);
    var mathUtil = __webpack_require__(80);
    var isPowerOfTwo = mathUtil.isPowerOfTwo;

    var targetList = ['px', 'nx', 'py', 'ny', 'pz', 'nz'];

    /**
     * @constructor qtek.TextureCube
     * @extends qtek.Texture
     *
     * @example
     *     ...
     *     var mat = new qtek.Material({
     *         shader: qtek.shader.library.get('qtek.phong', 'environmentMap')
     *     });
     *     var envMap = new qtek.TextureCube();
     *     envMap.load({
     *         'px': 'assets/textures/sky/px.jpg',
     *         'nx': 'assets/textures/sky/nx.jpg'
     *         'py': 'assets/textures/sky/py.jpg'
     *         'ny': 'assets/textures/sky/ny.jpg'
     *         'pz': 'assets/textures/sky/pz.jpg'
     *         'nz': 'assets/textures/sky/nz.jpg'
     *     });
     *     mat.set('environmentMap', envMap);
     *     ...
     *     envMap.success(function () {
     *         // Wait for the sky texture loaded
     *         animation.on('frame', function (frameTime) {
     *             renderer.render(scene, camera);
     *         });
     *     });
     */
    var TextureCube = Texture.extend(function () {
        return /** @lends qtek.TextureCube# */{
            /**
             * @type {Object}
             * @property {HTMLImageElement|HTMLCanvasElemnet} px
             * @property {HTMLImageElement|HTMLCanvasElemnet} nx
             * @property {HTMLImageElement|HTMLCanvasElemnet} py
             * @property {HTMLImageElement|HTMLCanvasElemnet} ny
             * @property {HTMLImageElement|HTMLCanvasElemnet} pz
             * @property {HTMLImageElement|HTMLCanvasElemnet} nz
             */
            image: {
                px: null,
                nx: null,
                py: null,
                ny: null,
                pz: null,
                nz: null
            },
            /**
             * @type {Object}
             * @property {Uint8Array} px
             * @property {Uint8Array} nx
             * @property {Uint8Array} py
             * @property {Uint8Array} ny
             * @property {Uint8Array} pz
             * @property {Uint8Array} nz
             */
            pixels: {
                px: null,
                nx: null,
                py: null,
                ny: null,
                pz: null,
                nz: null
            },

            /**
             * @type {Array.<Object>}
             */
            mipmaps: []
       };
    }, {
        update: function (_gl) {

            _gl.bindTexture(_gl.TEXTURE_CUBE_MAP, this._cache.get('webgl_texture'));

            this.updateCommon(_gl);

            var glFormat = this.format;
            var glType = this.type;

            _gl.texParameteri(_gl.TEXTURE_CUBE_MAP, _gl.TEXTURE_WRAP_S, this.wrapS);
            _gl.texParameteri(_gl.TEXTURE_CUBE_MAP, _gl.TEXTURE_WRAP_T, this.wrapT);

            _gl.texParameteri(_gl.TEXTURE_CUBE_MAP, _gl.TEXTURE_MAG_FILTER, this.magFilter);
            _gl.texParameteri(_gl.TEXTURE_CUBE_MAP, _gl.TEXTURE_MIN_FILTER, this.minFilter);

            var anisotropicExt = glinfo.getExtension(_gl, 'EXT_texture_filter_anisotropic');
            if (anisotropicExt && this.anisotropic > 1) {
                _gl.texParameterf(_gl.TEXTURE_CUBE_MAP, anisotropicExt.TEXTURE_MAX_ANISOTROPY_EXT, this.anisotropic);
            }

            // Fallback to float type if browser don't have half float extension
            if (glType === 36193) {
                var halfFloatExt = glinfo.getExtension(_gl, 'OES_texture_half_float');
                if (!halfFloatExt) {
                    glType = glenum.FLOAT;
                }
            }

            if (this.mipmaps.length) {
                var width = this.width;
                var height = this.height;
                for (var i = 0; i < this.mipmaps.length; i++) {
                    var mipmap = this.mipmaps[i];
                    this._updateTextureData(_gl, mipmap, i, width, height, glFormat, glType);
                    width /= 2;
                    height /= 2;
                }
            }
            else {
                this._updateTextureData(_gl, this, 0, this.width, this.height, glFormat, glType);

                if (!this.NPOT && this.useMipmap) {
                    _gl.generateMipmap(_gl.TEXTURE_CUBE_MAP);
                }
            }

            _gl.bindTexture(_gl.TEXTURE_CUBE_MAP, null);
        },

        _updateTextureData: function (_gl, data, level, width, height, glFormat, glType) {
            for (var i = 0; i < 6; i++) {
                var target = targetList[i];
                var img = data.image && data.image[target];
                if (img) {
                    _gl.texImage2D(_gl.TEXTURE_CUBE_MAP_POSITIVE_X + i, level, glFormat, glFormat, glType, img);
                }
                else {
                    _gl.texImage2D(_gl.TEXTURE_CUBE_MAP_POSITIVE_X + i, level, glFormat, width, height, 0, glFormat, glType, data.pixels && data.pixels[target]);
                }
            }
        },

        /**
         * @param  {WebGLRenderingContext} _gl
         * @memberOf qtek.TextureCube.prototype
         */
        generateMipmap: function (_gl) {
            if (this.useMipmap && !this.NPOT) {
                _gl.bindTexture(_gl.TEXTURE_CUBE_MAP, this._cache.get('webgl_texture'));
                _gl.generateMipmap(_gl.TEXTURE_CUBE_MAP);
            }
        },

        bind: function (_gl) {

            _gl.bindTexture(_gl.TEXTURE_CUBE_MAP, this.getWebGLTexture(_gl));
        },

        unbind: function (_gl) {
            _gl.bindTexture(_gl.TEXTURE_CUBE_MAP, null);
        },

        // Overwrite the isPowerOfTwo method
        isPowerOfTwo: function () {
            if (this.image.px) {
                return isPowerOfTwo(this.image.px.width)
                    && isPowerOfTwo(this.image.px.height);
            }
            else {
                return isPowerOfTwo(this.width)
                    && isPowerOfTwo(this.height);
            }
        },

        isRenderable: function () {
            if (this.image.px) {
                return isImageRenderable(this.image.px)
                    && isImageRenderable(this.image.nx)
                    && isImageRenderable(this.image.py)
                    && isImageRenderable(this.image.ny)
                    && isImageRenderable(this.image.pz)
                    && isImageRenderable(this.image.nz);
            }
            else {
                return !!(this.width && this.height);
            }
        },

        load: function (imageList, crossOrigin) {
            var loading = 0;
            var self = this;
            util.each(imageList, function (src, target){
                var image = new Image();
                if (crossOrigin) {
                    image.crossOrigin = crossOrigin;
                }
                image.onload = function () {
                    loading --;
                    if (loading === 0){
                        self.dirty();
                        self.trigger('success', self);
                    }
                    image.onload = null;
                };
                image.onerror = function () {
                    loading --;
                    image.onerror = null;
                };

                loading++;
                image.src = src;
                self.image[target] = image;
            });

            return this;
        }
    });

    Object.defineProperty(TextureCube.prototype, 'width', {
        get: function () {
            if (this.image && this.image.px) {
                return this.image.px.width;
            }
            return this._width;
        },
        set: function (value) {
            if (this.image && this.image.px) {
                console.warn('Texture from image can\'t set width');
            }
            else {
                if (this._width !== value) {
                    this.dirty();
                }
                this._width = value;
            }
        }
    });
    Object.defineProperty(TextureCube.prototype, 'height', {
        get: function () {
            if (this.image && this.image.px) {
                return this.image.px.height;
            }
            return this._height;
        },
        set: function (value) {
            if (this.image && this.image.px) {
                console.warn('Texture from image can\'t set height');
            }
            else {
                if (this._height !== value) {
                    this.dirty();
                }
                this._height = value;
            }
        }
    });
    function isImageRenderable(image) {
        return image.nodeName === 'CANVAS' ||
                image.nodeName === 'VIDEO' ||
                image.complete;
    }

    module.exports = TextureCube;


/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

var echarts = __webpack_require__(0);

var formatUtil = {};
formatUtil.getFormattedLabel = function (seriesModel, dataIndex, status, dataType, dimIndex) {
    status = status || 'normal';
    var data = seriesModel.getData(dataType);
    var itemModel = data.getItemModel(dataIndex);

    var params = seriesModel.getDataParams(dataIndex, dataType);
    if (dimIndex != null && (params.value instanceof Array)) {
        params.value = params.value[dimIndex];
    }

    var formatter = itemModel.get(status === 'normal' ? ['label', 'formatter'] : ['emphasis', 'label', 'formatter']);
    if (formatter == null) {
        formatter = itemModel.get(['label', 'formatter']);
    }
    var text;
    if (typeof formatter === 'function') {
        params.status = status;
        text = formatter(params);
    }
    else if (typeof formatter === 'string') {
        text = echarts.format.formatTpl(formatter, params);
    }
    return text;
};

/**
 * If value is not array, then convert it to array.
 * @param  {*} value
 * @return {Array} [value] or value
 */
formatUtil.normalizeToArray = function (value) {
    return value instanceof Array
        ? value
        : value == null
        ? []
        : [value];
};

module.exports = formatUtil;

/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";



    var Renderable = __webpack_require__(70);
    var glenum = __webpack_require__(11);
    var Texture2D = __webpack_require__(5);

    /**
     * @constructor qtek.Mesh
     * @extends qtek.Renderable
     */
    var Mesh = Renderable.extend(
    /** @lends qtek.Mesh# */
    {
        /**
         * Used when it is a skinned mesh
         * @type {qtek.Skeleton}
         */
        skeleton: null,
        /**
         * Joints indices Meshes can share the one skeleton instance and each mesh can use one part of joints. Joints indices indicate the index of joint in the skeleton instance
         * @type {number[]}
         */
        joints: null,

        /**
         * If store the skin matrices in vertex texture
         */
        useSkinMatricesTexture: false

    }, function () {
        if (!this.joints) {
            this.joints = [];
        }
    }, {
        render: function (_gl, shader) {
            shader = shader || this.material.shader;
            // Set pose matrices of skinned mesh
            if (this.skeleton) {
                // TODO Multiple mesh share same skeleton
                this.skeleton.update();

                var skinMatricesArray = this.skeleton.getSubSkinMatrices(this.__GUID__, this.joints);

                if (this.useSkinMatricesTexture) {
                    var size;
                    var numJoints = this.joints.length;
                    if (numJoints > 256) {
                        size = 64;
                    }
                    else if (numJoints > 64) {
                        size = 32;
                    }
                    else if (numJoints > 16) {
                        size = 16;
                    }
                    else {
                        size = 8;
                    }

                    var texture = this.getSkinMatricesTexture();
                    texture.width = size;
                    texture.height = size;

                    if (!texture.pixels || texture.pixels.length !== size * size * 4) {
                        texture.pixels = new Float32Array(size * size * 4);
                    }
                    texture.pixels.set(skinMatricesArray);
                    texture.dirty();

                    shader.setUniform(_gl, '1f', 'skinMatricesTextureSize', size);
                }
                else {
                    shader.setUniformOfSemantic(_gl, 'SKIN_MATRIX', skinMatricesArray);
                }
            }

            return Renderable.prototype.render.call(this, _gl, shader);
        },

        getSkinMatricesTexture: function () {
            this._skinMatricesTexture = this._skinMatricesTexture || new Texture2D({
                type: glenum.FLOAT,
                minFilter: glenum.NEAREST,
                magFilter: glenum.NEAREST,
                useMipmap: false,
                flipY: false
            });

            return this._skinMatricesTexture;
        }
    });

    // Enums
    Mesh.POINTS = glenum.POINTS;
    Mesh.LINES = glenum.LINES;
    Mesh.LINE_LOOP = glenum.LINE_LOOP;
    Mesh.LINE_STRIP = glenum.LINE_STRIP;
    Mesh.TRIANGLES = glenum.TRIANGLES;
    Mesh.TRIANGLE_STRIP = glenum.TRIANGLE_STRIP;
    Mesh.TRIANGLE_FAN = glenum.TRIANGLE_FAN;

    Mesh.BACK = glenum.BACK;
    Mesh.FRONT = glenum.FRONT;
    Mesh.FRONT_AND_BACK = glenum.FRONT_AND_BACK;
    Mesh.CW = glenum.CW;
    Mesh.CCW = glenum.CCW;

    module.exports = Mesh;


/***/ }),
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";



    var Node = __webpack_require__(35);
    var Light = __webpack_require__(19);
    var BoundingBox = __webpack_require__(14);

    /**
     * @constructor qtek.Scene
     * @extends qtek.Node
     */
    var Scene = Node.extend(function () {
        return /** @lends qtek.Scene# */ {
            /**
             * Global material of scene
             * @type {Material}
             */
            material: null,

            /**
             * @type {boolean}
             */
            autoUpdate: true,

            /**
             * Opaque renderable list, it will be updated automatically
             * @type {Renderable[]}
             * @readonly
             */
            opaqueQueue: [],

            /**
             * Opaque renderable list, it will be updated automatically
             * @type {Renderable[]}
             * @readonly
             */
            transparentQueue: [],

            lights: [],


            /**
             * Scene bounding box in view space.
             * Used when camera needs to adujst the near and far plane automatically
             * so that the view frustum contains the visible objects as tightly as possible.
             * Notice:
             *  It is updated after rendering (in the step of frustum culling passingly). So may be not so accurate, but saves a lot of calculation
             *
             * @type {qtek.math.BoundingBox}
             */
            viewBoundingBoxLastFrame: new BoundingBox(),

            // Properties to save the light information in the scene
            // Will be set in the render function
            _lightUniforms: {},

            _lightNumber: {
                // groupId: {
                    // POINT_LIGHT: 0,
                    // DIRECTIONAL_LIGHT: 0,
                    // SPOT_LIGHT: 0,
                    // AMBIENT_LIGHT: 0,
                    // AMBIENT_SH_LIGHT: 0
                // }
            },

            _opaqueObjectCount: 0,
            _transparentObjectCount: 0,

            _nodeRepository: {},

        };
    }, function () {
        this._scene = this;
    },
    /** @lends qtek.Scene.prototype. */
    {
        /**
         * Add node to scene
         * @param {Node} node
         */
        addToScene: function (node) {
            if (node.name) {
                this._nodeRepository[node.name] = node;
            }
        },

        /**
         * Remove node from scene
         * @param {Node} node
         */
        removeFromScene: function (node) {
            if (node.name) {
                delete this._nodeRepository[node.name];
            }
        },

        /**
         * Get node by name
         * @param  {string} name
         * @return {Node}
         * @DEPRECATED
         */
        getNode: function (name) {
            return this._nodeRepository[name];
        },

        /**
         * Clone a new scene node recursively, including material, skeleton.
         * Shader and geometry instances will not been cloned
         * @param  {qtek.Node} node
         * @return {qtek.Node}
         */
        cloneNode: function (node) {
            var newNode = node.clone();
            var materialsMap = {};

            var cloneSkeleton = function (current, currentNew) {
                if (current.skeleton) {
                    currentNew.skeleton = current.skeleton.clone(node, newNode);
                    currentNew.joints = current.joints.slice();
                }
                if (current.material) {
                    materialsMap[current.material.__GUID__] = {
                        oldMat: current.material
                    };
                }
                for (var i = 0; i < current._children.length; i++) {
                    cloneSkeleton(current._children[i], currentNew._children[i]);
                }
            };

            cloneSkeleton(node, newNode);

            for (var guid in materialsMap) {
                materialsMap[guid].newMat = materialsMap[guid].oldMat.clone();
            }

            // Replace material
            newNode.traverse(function (current) {
                if (current.material) {
                    current.material = materialsMap[current.material.__GUID__].newMat;
                }
            });

            return newNode;
        },


        /**
         * Scene update
         * @param  {boolean} force
         * @param  {boolean} notUpdateLights
         *         Useful in deferred pipeline
         */
        update: function (force, notUpdateLights) {
            if (!(this.autoUpdate || force)) {
                return;
            }
            Node.prototype.update.call(this, force);

            var lights = this.lights;
            var sceneMaterialTransparent = this.material && this.material.transparent;

            this._opaqueObjectCount = 0;
            this._transparentObjectCount = 0;

            lights.length = 0;

            this._updateRenderQueue(this, sceneMaterialTransparent);

            this.opaqueQueue.length = this._opaqueObjectCount;
            this.transparentQueue.length = this._transparentObjectCount;

            // reset
            if (!notUpdateLights) {
                var lightNumber = this._lightNumber;
                // Reset light numbers
                for (var group in lightNumber) {
                    for (var type in lightNumber[group]) {
                        lightNumber[group][type] = 0;
                    }
                }
                for (var i = 0; i < lights.length; i++) {
                    var light = lights[i];
                    var group = light.group;
                    if (!lightNumber[group]) {
                        lightNumber[group] = {};
                    }
                    // User can use any type of light
                    lightNumber[group][light.type] = lightNumber[group][light.type] || 0;
                    lightNumber[group][light.type]++;
                }
                // PENDING Remove unused group?

                this._updateLightUniforms();
            }
        },

        // Traverse the scene and add the renderable
        // object to the render queue
        _updateRenderQueue: function (parent, sceneMaterialTransparent) {
            if (parent.invisible) {
                return;
            }

            for (var i = 0; i < parent._children.length; i++) {
                var child = parent._children[i];

                if (child instanceof Light) {
                    this.lights.push(child);
                }
                if (child.isRenderable()) {
                    if (child.material.transparent || sceneMaterialTransparent) {
                        this.transparentQueue[this._transparentObjectCount++] = child;
                    }
                    else {
                        this.opaqueQueue[this._opaqueObjectCount++] = child;
                    }
                }
                if (child._children.length > 0) {
                    this._updateRenderQueue(child);
                }
            }
        },

        _updateLightUniforms: function () {
            var lights = this.lights;
            // Put the light cast shadow before the light not cast shadow
            lights.sort(lightSortFunc);

            var lightUniforms = this._lightUniforms;
            for (var group in lightUniforms) {
                for (var symbol in lightUniforms[group]) {
                    lightUniforms[group][symbol].value.length = 0;
                }
            }
            for (var i = 0; i < lights.length; i++) {

                var light = lights[i];
                var group = light.group;

                for (var symbol in light.uniformTemplates) {

                    var uniformTpl = light.uniformTemplates[symbol];
                    if (!lightUniforms[group]) {
                        lightUniforms[group] = {};
                    }
                    if (!lightUniforms[group][symbol]) {
                        lightUniforms[group][symbol] = {
                            type: '',
                            value: []
                        };
                    }
                    var value = uniformTpl.value(light);
                    var lu = lightUniforms[group][symbol];
                    lu.type = uniformTpl.type + 'v';
                    switch (uniformTpl.type) {
                        case '1i':
                        case '1f':
                        case 't':
                            lu.value.push(value);
                            break;
                        case '2f':
                        case '3f':
                        case '4f':
                            for (var j =0; j < value.length; j++) {
                                lu.value.push(value[j]);
                            }
                            break;
                        default:
                            console.error('Unkown light uniform type ' + uniformTpl.type);
                    }
                }
            }
        },

        isShaderLightNumberChanged: function (shader) {
            var group = shader.lightGroup;
            // PENDING Performance
            for (var type in this._lightNumber[group]) {
                if (this._lightNumber[group][type] !== shader.lightNumber[type]) {
                    return true;
                }
            }
            for (var type in shader.lightNumber) {
                if (this._lightNumber[group][type] !== shader.lightNumber[type]) {
                    return true;
                }
            }
            return false;
        },

        setShaderLightNumber: function (shader) {
            var group = shader.lightGroup;
            for (var type in this._lightNumber[group]) {
                shader.lightNumber[type] = this._lightNumber[group][type];
            }
            shader.dirty();
        },

        setLightUniforms: function (shader, _gl) {
            var group = shader.lightGroup;
            for (var symbol in this._lightUniforms[group]) {
                var lu = this._lightUniforms[group][symbol];
                if (lu.type === 'tv') {
                    for (var i = 0; i < lu.value.length; i++) {
                        var texture = lu.value[i];
                        var slot = shader.currentTextureSlot();
                        var result = shader.setUniform(_gl, '1i', symbol, slot);
                        if (result) {
                            shader.takeCurrentTextureSlot(_gl, texture);
                        }
                    }
                }
                else {
                    shader.setUniform(_gl, lu.type, symbol, lu.value);
                }
            }
        },

        /**
         * Dispose self, clear all the scene objects
         * But resources of gl like texuture, shader will not be disposed.
         * Mostly you should use disposeScene method in Renderer to do dispose.
         */
        dispose: function () {
            this.material = null;
            this.opaqueQueue = [];
            this.transparentQueue = [];

            this.lights = [];

            this._lightUniforms = {};

            this._lightNumber = {};
            this._nodeRepository = {};
        }
    });

    function lightSortFunc(a, b) {
        if (b.castShadow && !a.castShadow) {
            return true;
        }
    }

    module.exports = Scene;


/***/ }),
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";



    var guid = 0;

    var ArrayProto = Array.prototype;
    var nativeForEach = ArrayProto.forEach;

    /**
     * Util functions
     * @namespace qtek.core.util
     */
	var util = {

        /**
         * Generate GUID
         * @return {number}
         * @memberOf qtek.core.util
         */
		genGUID: function() {
			return ++guid;
		},
        /**
         * Relative path to absolute path
         * @param  {string} path
         * @param  {string} basePath
         * @return {string}
         * @memberOf qtek.core.util
         */
        relative2absolute: function(path, basePath) {
            if (!basePath || path.match(/^\//)) {
                return path;
            }
            var pathParts = path.split('/');
            var basePathParts = basePath.split('/');

            var item = pathParts[0];
            while(item === '.' || item === '..') {
                if (item === '..') {
                    basePathParts.pop();
                }
                pathParts.shift();
                item = pathParts[0];
            }
            return basePathParts.join('/') + '/' + pathParts.join('/');
        },

        /**
         * Extend target with source
         * @param  {Object} target
         * @param  {Object} source
         * @return {Object}
         * @memberOf qtek.core.util
         */
        extend: function(target, source) {
            if (source) {
                for (var name in source) {
                    if (source.hasOwnProperty(name)) {
                        target[name] = source[name];
                    }
                }
            }
            return target;
        },

        /**
         * Extend properties to target if not exist.
         * @param  {Object} target
         * @param  {Object} source
         * @return {Object}
         * @memberOf qtek.core.util
         */
        defaults: function(target, source) {
            if (source) {
                for (var propName in source) {
                    if (target[propName] === undefined) {
                        target[propName] = source[propName];
                    }
                }
            }
            return target;
        },
        /**
         * Extend properties with a given property list to avoid for..in.. iteration.
         * @param  {Object} target
         * @param  {Object} source
         * @param  {Array.<string>} propList
         * @return {Object}
         * @memberOf qtek.core.util
         */
        extendWithPropList: function(target, source, propList) {
            if (source) {
                for (var i = 0; i < propList.length; i++) {
                    var propName = propList[i];
                    target[propName] = source[propName];
                }
            }
            return target;
        },
        /**
         * Extend properties to target if not exist. With a given property list avoid for..in.. iteration.
         * @param  {Object} target
         * @param  {Object} source
         * @param  {Array.<string>} propList
         * @return {Object}
         * @memberOf qtek.core.util
         */
        defaultsWithPropList: function(target, source, propList) {
            if (source) {
                for (var i = 0; i < propList.length; i++) {
                    var propName = propList[i];
                    if (target[propName] == null) {
                        target[propName] = source[propName];
                    }
                }
            }
            return target;
        },
        /**
         * @param  {Object|Array} obj
         * @param  {Function} iterator
         * @param  {Object} [context]
         * @memberOf qtek.core.util
         */
        each: function(obj, iterator, context) {
            if (!(obj && iterator)) {
                return;
            }
            if (obj.forEach && obj.forEach === nativeForEach) {
                obj.forEach(iterator, context);
            } else if (obj.length === + obj.length) {
                for (var i = 0, len = obj.length; i < len; i++) {
                    iterator.call(context, obj[i], i, obj);
                }
            } else {
                for (var key in obj) {
                    if (obj.hasOwnProperty(key)) {
                        iterator.call(context, obj[key], key, obj);
                    }
                }
            }
        },

        /**
         * Is object ?
         * @param  {}  obj
         * @return {boolean}
         * @memberOf qtek.core.util
         */
        isObject: function(obj) {
            return obj === Object(obj);
        },

        /**
         * Is array ?
         * @param  {}  obj
         * @return {boolean}
         * @memberOf qtek.core.util
         */
        isArray: function(obj) {
            return obj instanceof Array;
        },

        /**
         * Is array like, which have a length property
         * @param  {}  obj
         * @return {boolean}
         * @memberOf qtek.core.util
         */
        isArrayLike: function(obj) {
            if (!obj) {
                return false;
            } else {
                return obj.length === + obj.length;
            }
        },

        /**
         * @param  {} obj
         * @return {}
         * @memberOf qtek.core.util
         */
        clone: function(obj) {
            if (!util.isObject(obj)) {
                return obj;
            } else if (util.isArray(obj)) {
                return obj.slice();
            } else if (util.isArrayLike(obj)) { // is typed array
                var ret = new obj.constructor(obj.length);
                for (var i = 0; i < obj.length; i++) {
                    ret[i] = obj[i];
                }
                return ret;
            } else {
                return util.extend({}, obj);
            }
        }
	};

    module.exports = util;


/***/ }),
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";



    var glMatrix = __webpack_require__(1);
    var vec2 = glMatrix.vec2;

    /**
     * @constructor
     * @alias qtek.math.Vector2
     * @param {number} x
     * @param {number} y
     */
    var Vector2 = function(x, y) {

        x = x || 0;
        y = y || 0;

        /**
         * Storage of Vector2, read and write of x, y will change the values in _array
         * All methods also operate on the _array instead of x, y components
         * @name _array
         * @type {Float32Array}
         */
        this._array = vec2.fromValues(x, y);

        /**
         * Dirty flag is used by the Node to determine
         * if the matrix is updated to latest
         * @name _dirty
         * @type {boolean}
         */
        this._dirty = true;
    };

    Vector2.prototype = {

        constructor: Vector2,

        /**
         * Add b to self
         * @param  {qtek.math.Vector2} b
         * @return {qtek.math.Vector2}
         */
        add: function(b) {
            vec2.add(this._array, this._array, b._array);
            this._dirty = true;
            return this;
        },

        /**
         * Set x and y components
         * @param  {number}  x
         * @param  {number}  y
         * @return {qtek.math.Vector2}
         */
        set: function(x, y) {
            this._array[0] = x;
            this._array[1] = y;
            this._dirty = true;
            return this;
        },

        /**
         * Set x and y components from array
         * @param  {Float32Array|number[]} arr
         * @return {qtek.math.Vector2}
         */
        setArray: function(arr) {
            this._array[0] = arr[0];
            this._array[1] = arr[1];

            this._dirty = true;
            return this;
        },

        /**
         * Clone a new Vector2
         * @return {qtek.math.Vector2}
         */
        clone: function() {
            return new Vector2(this.x, this.y);
        },

        /**
         * Copy x, y from b
         * @param  {qtek.math.Vector2} b
         * @return {qtek.math.Vector2}
         */
        copy: function(b) {
            vec2.copy(this._array, b._array);
            this._dirty = true;
            return this;
        },

        /**
         * Cross product of self and b, written to a Vector3 out
         * @param  {qtek.math.Vector3} out
         * @param  {qtek.math.Vector2} b
         * @return {qtek.math.Vector2}
         */
        cross: function(out, b) {
            vec2.cross(out._array, this._array, b._array);
            out._dirty = true;
            return this;
        },

        /**
         * Alias for distance
         * @param  {qtek.math.Vector2} b
         * @return {number}
         */
        dist: function(b) {
            return vec2.dist(this._array, b._array);
        },

        /**
         * Distance between self and b
         * @param  {qtek.math.Vector2} b
         * @return {number}
         */
        distance: function(b) {
            return vec2.distance(this._array, b._array);
        },

        /**
         * Alias for divide
         * @param  {qtek.math.Vector2} b
         * @return {qtek.math.Vector2}
         */
        div: function(b) {
            vec2.div(this._array, this._array, b._array);
            this._dirty = true;
            return this;
        },

        /**
         * Divide self by b
         * @param  {qtek.math.Vector2} b
         * @return {qtek.math.Vector2}
         */
        divide: function(b) {
            vec2.divide(this._array, this._array, b._array);
            this._dirty = true;
            return this;
        },

        /**
         * Dot product of self and b
         * @param  {qtek.math.Vector2} b
         * @return {number}
         */
        dot: function(b) {
            return vec2.dot(this._array, b._array);
        },

        /**
         * Alias of length
         * @return {number}
         */
        len: function() {
            return vec2.len(this._array);
        },

        /**
         * Calculate the length
         * @return {number}
         */
        length: function() {
            return vec2.length(this._array);
        },

        /**
         * Linear interpolation between a and b
         * @param  {qtek.math.Vector2} a
         * @param  {qtek.math.Vector2} b
         * @param  {number}  t
         * @return {qtek.math.Vector2}
         */
        lerp: function(a, b, t) {
            vec2.lerp(this._array, a._array, b._array, t);
            this._dirty = true;
            return this;
        },

        /**
         * Minimum of self and b
         * @param  {qtek.math.Vector2} b
         * @return {qtek.math.Vector2}
         */
        min: function(b) {
            vec2.min(this._array, this._array, b._array);
            this._dirty = true;
            return this;
        },

        /**
         * Maximum of self and b
         * @param  {qtek.math.Vector2} b
         * @return {qtek.math.Vector2}
         */
        max: function(b) {
            vec2.max(this._array, this._array, b._array);
            this._dirty = true;
            return this;
        },

        /**
         * Alias for multiply
         * @param  {qtek.math.Vector2} b
         * @return {qtek.math.Vector2}
         */
        mul: function(b) {
            vec2.mul(this._array, this._array, b._array);
            this._dirty = true;
            return this;
        },

        /**
         * Mutiply self and b
         * @param  {qtek.math.Vector2} b
         * @return {qtek.math.Vector2}
         */
        multiply: function(b) {
            vec2.multiply(this._array, this._array, b._array);
            this._dirty = true;
            return this;
        },

        /**
         * Negate self
         * @return {qtek.math.Vector2}
         */
        negate: function() {
            vec2.negate(this._array, this._array);
            this._dirty = true;
            return this;
        },

        /**
         * Normalize self
         * @return {qtek.math.Vector2}
         */
        normalize: function() {
            vec2.normalize(this._array, this._array);
            this._dirty = true;
            return this;
        },

        /**
         * Generate random x, y components with a given scale
         * @param  {number} scale
         * @return {qtek.math.Vector2}
         */
        random: function(scale) {
            vec2.random(this._array, scale);
            this._dirty = true;
            return this;
        },

        /**
         * Scale self
         * @param  {number}  scale
         * @return {qtek.math.Vector2}
         */
        scale: function(s) {
            vec2.scale(this._array, this._array, s);
            this._dirty = true;
            return this;
        },

        /**
         * Scale b and add to self
         * @param  {qtek.math.Vector2} b
         * @param  {number}  scale
         * @return {qtek.math.Vector2}
         */
        scaleAndAdd: function(b, s) {
            vec2.scaleAndAdd(this._array, this._array, b._array, s);
            this._dirty = true;
            return this;
        },

        /**
         * Alias for squaredDistance
         * @param  {qtek.math.Vector2} b
         * @return {number}
         */
        sqrDist: function(b) {
            return vec2.sqrDist(this._array, b._array);
        },

        /**
         * Squared distance between self and b
         * @param  {qtek.math.Vector2} b
         * @return {number}
         */
        squaredDistance: function(b) {
            return vec2.squaredDistance(this._array, b._array);
        },

        /**
         * Alias for squaredLength
         * @return {number}
         */
        sqrLen: function() {
            return vec2.sqrLen(this._array);
        },

        /**
         * Squared length of self
         * @return {number}
         */
        squaredLength: function() {
            return vec2.squaredLength(this._array);
        },

        /**
         * Alias for subtract
         * @param  {qtek.math.Vector2} b
         * @return {qtek.math.Vector2}
         */
        sub: function(b) {
            vec2.sub(this._array, this._array, b._array);
            this._dirty = true;
            return this;
        },

        /**
         * Subtract b from self
         * @param  {qtek.math.Vector2} b
         * @return {qtek.math.Vector2}
         */
        subtract: function(b) {
            vec2.subtract(this._array, this._array, b._array);
            this._dirty = true;
            return this;
        },

        /**
         * Transform self with a Matrix2 m
         * @param  {qtek.math.Matrix2} m
         * @return {qtek.math.Vector2}
         */
        transformMat2: function(m) {
            vec2.transformMat2(this._array, this._array, m._array);
            this._dirty = true;
            return this;
        },

        /**
         * Transform self with a Matrix2d m
         * @param  {qtek.math.Matrix2d} m
         * @return {qtek.math.Vector2}
         */
        transformMat2d: function(m) {
            vec2.transformMat2d(this._array, this._array, m._array);
            this._dirty = true;
            return this;
        },

        /**
         * Transform self with a Matrix3 m
         * @param  {qtek.math.Matrix3} m
         * @return {qtek.math.Vector2}
         */
        transformMat3: function(m) {
            vec2.transformMat3(this._array, this._array, m._array);
            this._dirty = true;
            return this;
        },

        /**
         * Transform self with a Matrix4 m
         * @param  {qtek.math.Matrix4} m
         * @return {qtek.math.Vector2}
         */
        transformMat4: function(m) {
            vec2.transformMat4(this._array, this._array, m._array);
            this._dirty = true;
            return this;
        },

        toString: function() {
            return '[' + Array.prototype.join.call(this._array, ',') + ']';
        },

        toArray: function () {
            return Array.prototype.slice.call(this._array);
        }
    };

    // Getter and Setter
    if (Object.defineProperty) {

        var proto = Vector2.prototype;
        /**
         * @name x
         * @type {number}
         * @memberOf qtek.math.Vector2
         * @instance
         */
        Object.defineProperty(proto, 'x', {
            get: function () {
                return this._array[0];
            },
            set: function (value) {
                this._array[0] = value;
                this._dirty = true;
            }
        });

        /**
         * @name y
         * @type {number}
         * @memberOf qtek.math.Vector2
         * @instance
         */
        Object.defineProperty(proto, 'y', {
            get: function () {
                return this._array[1];
            },
            set: function (value) {
                this._array[1] = value;
                this._dirty = true;
            }
        });
    }

    // Supply methods that are not in place

    /**
     * @param  {qtek.math.Vector2} out
     * @param  {qtek.math.Vector2} a
     * @param  {qtek.math.Vector2} b
     * @return {qtek.math.Vector2}
     */
    Vector2.add = function(out, a, b) {
        vec2.add(out._array, a._array, b._array);
        out._dirty = true;
        return out;
    };

    /**
     * @param  {qtek.math.Vector2} out
     * @param  {number}  x
     * @param  {number}  y
     * @return {qtek.math.Vector2}
     */
    Vector2.set = function(out, x, y) {
        vec2.set(out._array, x, y);
        out._dirty = true;
        return out;
    };

    /**
     * @param  {qtek.math.Vector2} out
     * @param  {qtek.math.Vector2} b
     * @return {qtek.math.Vector2}
     */
    Vector2.copy = function(out, b) {
        vec2.copy(out._array, b._array);
        out._dirty = true;
        return out;
    };

    /**
     * @param  {qtek.math.Vector3} out
     * @param  {qtek.math.Vector2} a
     * @param  {qtek.math.Vector2} b
     * @return {qtek.math.Vector2}
     */
    Vector2.cross = function(out, a, b) {
        vec2.cross(out._array, a._array, b._array);
        out._dirty = true;
        return out;
    };
    /**
     * @param  {qtek.math.Vector2} a
     * @param  {qtek.math.Vector2} b
     * @return {number}
     */
    Vector2.dist = function(a, b) {
        return vec2.distance(a._array, b._array);
    };
    /**
     * @method
     * @param  {qtek.math.Vector2} a
     * @param  {qtek.math.Vector2} b
     * @return {number}
     */
    Vector2.distance = Vector2.dist;
    /**
     * @param  {qtek.math.Vector2} out
     * @param  {qtek.math.Vector2} a
     * @param  {qtek.math.Vector2} b
     * @return {qtek.math.Vector2}
     */
    Vector2.div = function(out, a, b) {
        vec2.divide(out._array, a._array, b._array);
        out._dirty = true;
        return out;
    };
    /**
     * @method
     * @param  {qtek.math.Vector2} out
     * @param  {qtek.math.Vector2} a
     * @param  {qtek.math.Vector2} b
     * @return {qtek.math.Vector2}
     */
    Vector2.divide = Vector2.div;
    /**
     * @param  {qtek.math.Vector2} a
     * @param  {qtek.math.Vector2} b
     * @return {number}
     */
    Vector2.dot = function(a, b) {
        return vec2.dot(a._array, b._array);
    };

    /**
     * @param  {qtek.math.Vector2} a
     * @return {number}
     */
    Vector2.len = function(b) {
        return vec2.length(b._array);
    };

    // Vector2.length = Vector2.len;

    /**
     * @param  {qtek.math.Vector2} out
     * @param  {qtek.math.Vector2} a
     * @param  {qtek.math.Vector2} b
     * @param  {number}  t
     * @return {qtek.math.Vector2}
     */
    Vector2.lerp = function(out, a, b, t) {
        vec2.lerp(out._array, a._array, b._array, t);
        out._dirty = true;
        return out;
    };
    /**
     * @param  {qtek.math.Vector2} out
     * @param  {qtek.math.Vector2} a
     * @param  {qtek.math.Vector2} b
     * @return {qtek.math.Vector2}
     */
    Vector2.min = function(out, a, b) {
        vec2.min(out._array, a._array, b._array);
        out._dirty = true;
        return out;
    };

    /**
     * @param  {qtek.math.Vector2} out
     * @param  {qtek.math.Vector2} a
     * @param  {qtek.math.Vector2} b
     * @return {qtek.math.Vector2}
     */
    Vector2.max = function(out, a, b) {
        vec2.max(out._array, a._array, b._array);
        out._dirty = true;
        return out;
    };
    /**
     * @param  {qtek.math.Vector2} out
     * @param  {qtek.math.Vector2} a
     * @param  {qtek.math.Vector2} b
     * @return {qtek.math.Vector2}
     */
    Vector2.mul = function(out, a, b) {
        vec2.multiply(out._array, a._array, b._array);
        out._dirty = true;
        return out;
    };
    /**
     * @method
     * @param  {qtek.math.Vector2} out
     * @param  {qtek.math.Vector2} a
     * @param  {qtek.math.Vector2} b
     * @return {qtek.math.Vector2}
     */
    Vector2.multiply = Vector2.mul;
    /**
     * @param  {qtek.math.Vector2} out
     * @param  {qtek.math.Vector2} a
     * @return {qtek.math.Vector2}
     */
    Vector2.negate = function(out, a) {
        vec2.negate(out._array, a._array);
        out._dirty = true;
        return out;
    };
    /**
     * @param  {qtek.math.Vector2} out
     * @param  {qtek.math.Vector2} a
     * @return {qtek.math.Vector2}
     */
    Vector2.normalize = function(out, a) {
        vec2.normalize(out._array, a._array);
        out._dirty = true;
        return out;
    };
    /**
     * @param  {qtek.math.Vector2} out
     * @param  {number}  scale
     * @return {qtek.math.Vector2}
     */
    Vector2.random = function(out, scale) {
        vec2.random(out._array, scale);
        out._dirty = true;
        return out;
    };
    /**
     * @param  {qtek.math.Vector2} out
     * @param  {qtek.math.Vector2} a
     * @param  {number}  scale
     * @return {qtek.math.Vector2}
     */
    Vector2.scale = function(out, a, scale) {
        vec2.scale(out._array, a._array, scale);
        out._dirty = true;
        return out;
    };
    /**
     * @param  {qtek.math.Vector2} out
     * @param  {qtek.math.Vector2} a
     * @param  {qtek.math.Vector2} b
     * @param  {number}  scale
     * @return {qtek.math.Vector2}
     */
    Vector2.scaleAndAdd = function(out, a, b, scale) {
        vec2.scaleAndAdd(out._array, a._array, b._array, scale);
        out._dirty = true;
        return out;
    };
    /**
     * @param  {qtek.math.Vector2} a
     * @param  {qtek.math.Vector2} b
     * @return {number}
     */
    Vector2.sqrDist = function(a, b) {
        return vec2.sqrDist(a._array, b._array);
    };
    /**
     * @method
     * @param  {qtek.math.Vector2} a
     * @param  {qtek.math.Vector2} b
     * @return {number}
     */
    Vector2.squaredDistance = Vector2.sqrDist;

    /**
     * @param  {qtek.math.Vector2} a
     * @return {number}
     */
    Vector2.sqrLen = function(a) {
        return vec2.sqrLen(a._array);
    };
    /**
     * @method
     * @param  {qtek.math.Vector2} a
     * @return {number}
     */
    Vector2.squaredLength = Vector2.sqrLen;

    /**
     * @param  {qtek.math.Vector2} out
     * @param  {qtek.math.Vector2} a
     * @param  {qtek.math.Vector2} b
     * @return {qtek.math.Vector2}
     */
    Vector2.sub = function(out, a, b) {
        vec2.subtract(out._array, a._array, b._array);
        out._dirty = true;
        return out;
    };
    /**
     * @method
     * @param  {qtek.math.Vector2} out
     * @param  {qtek.math.Vector2} a
     * @param  {qtek.math.Vector2} b
     * @return {qtek.math.Vector2}
     */
    Vector2.subtract = Vector2.sub;
    /**
     * @param  {qtek.math.Vector2} out
     * @param  {qtek.math.Vector2} a
     * @param  {qtek.math.Matrix2} m
     * @return {qtek.math.Vector2}
     */
    Vector2.transformMat2 = function(out, a, m) {
        vec2.transformMat2(out._array, a._array, m._array);
        out._dirty = true;
        return out;
    };
    /**
     * @param  {qtek.math.Vector2}  out
     * @param  {qtek.math.Vector2}  a
     * @param  {qtek.math.Matrix2d} m
     * @return {qtek.math.Vector2}
     */
    Vector2.transformMat2d = function(out, a, m) {
        vec2.transformMat2d(out._array, a._array, m._array);
        out._dirty = true;
        return out;
    };
    /**
     * @param  {qtek.math.Vector2} out
     * @param  {qtek.math.Vector2} a
     * @param  {Matrix3} m
     * @return {qtek.math.Vector2}
     */
    Vector2.transformMat3 = function(out, a, m) {
        vec2.transformMat3(out._array, a._array, m._array);
        out._dirty = true;
        return out;
    };
    /**
     * @param  {qtek.math.Vector2} out
     * @param  {qtek.math.Vector2} a
     * @param  {qtek.math.Matrix4} m
     * @return {qtek.math.Vector2}
     */
    Vector2.transformMat4 = function(out, a, m) {
        vec2.transformMat4(out._array, a._array, m._array);
        out._dirty = true;
        return out;
    };

    module.exports = Vector2;



/***/ }),
/* 29 */
/***/ (function(module, exports, __webpack_require__) {

var echarts = __webpack_require__(0);

function otherDimToDataDim (data, otherDim) {
    var dataDim = [];
    echarts.util.each(data.dimensions, function (dimName) {
        var dimItem = data.getDimensionInfo(dimName);
        var otherDims = dimItem.otherDims;
        var dimIndex = otherDims[otherDim];
        if (dimIndex != null && dimIndex !== false) {
            dataDim[dimIndex] = dimItem.name;
        }
    });
    return dataDim;
}

module.exports = function (seriesModel, dataIndex, multipleSeries) {
    function formatArrayValue(value) {
        var vertially = true;

        var result = [];
        var tooltipDims = otherDimToDataDim(data, 'tooltip');

        tooltipDims.length
            ? echarts.util.each(tooltipDims, function (dimIdx) {
                setEachItem(data.get(dimIdx, dataIndex), dimIdx);
            })
            // By default, all dims is used on tooltip.
            : echarts.util.each(value, setEachItem);

        function setEachItem(val, dimIdx) {
            var dimInfo = data.getDimensionInfo(dimIdx);
            // If `dimInfo.tooltip` is not set, show tooltip.
            if (!dimInfo || dimInfo.otherDims.tooltip === false) {
                return;
            }
            var dimType = dimInfo.type;
            var valStr = (vertially ? '- ' + (dimInfo.tooltipName || dimInfo.name) + ': ' : '')
                + (dimType === 'ordinal'
                    ? val + ''
                    : dimType === 'time'
                    ? (multipleSeries ? '' : echarts.format.formatTime('yyyy/MM/dd hh:mm:ss', val))
                    : echarts.format.addCommas(val)
                );
            valStr && result.push(echarts.format.encodeHTML(valStr));
        }

        return (vertially ? '<br/>' : '') + result.join(vertially ? '<br/>' : ', ');
    }

    var data = seriesModel.getData();

    var value = seriesModel.getRawValue(dataIndex);
    var formattedValue = echarts.util.isArray(value)
        ? formatArrayValue(value) : echarts.format.encodeHTML(echarts.format.addCommas(value));
    var name = data.getName(dataIndex);

    var color = data.getItemVisual(dataIndex, 'color');
    if (echarts.util.isObject(color) && color.colorStops) {
        color = (color.colorStops[0] || {}).color;
    }
    color = color || 'transparent';

    var colorEl = echarts.format.getTooltipMarker(color);

    var seriesName = seriesModel.name;
    // FIXME
    if (seriesName === '\0-') {
        // Not show '-'
        seriesName = '';
    }
    seriesName = seriesName
        ? echarts.format.encodeHTML(seriesName) + (!multipleSeries ? '<br/>' : ': ')
        : '';
    return !multipleSeries
        ? seriesName + colorEl
            + (name
                ? echarts.format.encodeHTML(name) + ': ' + formattedValue
                : formattedValue
            )
        : colorEl + seriesName + formattedValue;
};

/***/ }),
/* 30 */
/***/ (function(module, exports, __webpack_require__) {

var graphicGL = __webpack_require__(2);
var Skybox = __webpack_require__(57);
var Skydome = __webpack_require__(58);
var echarts = __webpack_require__(0);

function SceneHelper() {
}

SceneHelper.prototype = {
    constructor: SceneHelper,

    setScene: function (scene) {
        this._scene = scene;

        if (this._skybox) {
            this._skybox.attachScene(this._scene);
        }
    },

    initLight: function (rootNode) {
        this._lightRoot = rootNode;
        /**
         * @type {qtek.light.Directional}
         */
        this.mainLight = new graphicGL.DirectionalLight({
            shadowBias: 0.005
        });

        /**
         * @type {qtek.light.Ambient}
         */
        this.ambientLight = new graphicGL.AmbientLight();

        rootNode.add(this.mainLight);
        rootNode.add(this.ambientLight);
    },

    dispose: function () {
        if (this._lightRoot) {
            this._lightRoot.remove(this.mainLight);
            this._lightRoot.remove(this.ambientLight);
        }
    },

    updateLight: function (componentModel) {

        var mainLight = this.mainLight;
        var ambientLight = this.ambientLight;

        var lightModel = componentModel.getModel('light');
        var mainLightModel = lightModel.getModel('main');
        var ambientLightModel = lightModel.getModel('ambient');

        mainLight.intensity = mainLightModel.get('intensity');
        ambientLight.intensity = ambientLightModel.get('intensity');
        mainLight.color = graphicGL.parseColor(mainLightModel.get('color')).slice(0, 3);
        ambientLight.color = graphicGL.parseColor(ambientLightModel.get('color')).slice(0, 3);

        var alpha = mainLightModel.get('alpha') || 0;
        var beta = mainLightModel.get('beta') || 0;
        mainLight.position.setArray(graphicGL.directionFromAlphaBeta(alpha, beta));
        mainLight.lookAt(graphicGL.Vector3.ZERO);

        mainLight.castShadow = mainLightModel.get('shadow');
        mainLight.shadowResolution = graphicGL.getShadowResolution(mainLightModel.get('shadowQuality'));
    },

    updateAmbientCubemap: function (renderer, componentModel, api) {
        var ambientCubemapModel = componentModel.getModel('light.ambientCubemap');

        var textureUrl = ambientCubemapModel.get('texture');
        if (textureUrl) {
            this._cubemapLightsCache = this._cubemapLightsCache || {};
            var lights = this._cubemapLightsCache[textureUrl];
            if (!lights) {
                var self = this;
                lights = this._cubemapLightsCache[textureUrl]
                    = graphicGL.createAmbientCubemap(ambientCubemapModel.option, renderer, api, function () {
                        // Use prefitered cubemap
                        if (self._skybox instanceof Skybox) {
                            self._skybox.setEnvironmentMap(lights.specular.cubemap);
                        }

                        api.getZr().refresh();
                    });
            }
            this._lightRoot.add(lights.diffuse);
            this._lightRoot.add(lights.specular);

            this._currentCubemapLights = lights;
        }
        else if (this._currentCubemapLights) {
            this._lightRoot.remove(this._currentCubemapLights.diffuse);
            this._lightRoot.remove(this._currentCubemapLights.specular);
            this._currentCubemapLights = null;
        }
    },

    updateSkybox: function (renderer, componentModel, api) {
        var environmentUrl = componentModel.get('environment');

        var self = this;
        function getSkybox() {
            if (!(self._skybox instanceof Skybox)) {
                if (self._skybox) {
                    self._skybox.dispose(renderer.gl);
                }
                self._skybox = new Skybox();
            }
            return self._skybox;
        }
        function getSkydome() {
            if (!(self._skybox instanceof Skydome)) {
                if (self._skybox) {
                    self._skybox.dispose(renderer.gl);
                }
                self._skybox = new Skydome();
            }
            return self._skybox;
        }

        if (environmentUrl && environmentUrl !== 'none') {
            if (environmentUrl === 'auto') {
                // Use environment in ambient cubemap
                if (this._currentCubemapLights) {
                    var skybox = getSkybox();
                    var cubemap = this._currentCubemapLights.specular.cubemap;
                    skybox.setEnvironmentMap(cubemap);
                    if (this._scene) {
                        skybox.attachScene(this._scene);
                    }
                    skybox.material.set('lod', 2);
                }
                else if (this._skybox) {
                    this._skybox.detachScene();
                }
            }
            // Is gradient or color string
            else if ((typeof environmentUrl === 'object' && environmentUrl.colorStops)
                || (typeof environmentUrl === 'string' && echarts.color.parse(environmentUrl))
            ) {
                var skydome = getSkydome();
                var texture = new graphicGL.Texture2D({
                    anisotropic: 8,
                    flipY: false
                });
                skydome.setEnvironmentMap(texture);
                var canvas = texture.image = document.createElement('canvas');
                canvas.width = canvas.height = 16;
                var ctx = canvas.getContext('2d');
                var rect = new echarts.graphic.Rect({
                    shape: { x: 0, y: 0, width: 16, height: 16 },
                    style: { fill: environmentUrl }
                });
                rect.brush(ctx);

                skydome.attachScene(this._scene);
            }
            else {
                // Panorama
                var skydome = getSkydome();
                var texture = graphicGL.loadTexture(environmentUrl, api, {
                    anisotropic: 8,
                    flipY: false
                });
                skydome.setEnvironmentMap(texture);

                skydome.attachScene(this._scene);
            }
        }
        else {
            if (this._skybox) {
                this._skybox.detachScene(this._scene);
            }
            this._skybox = null;
        }

        var coordSys = componentModel.coordinateSystem;
        if (this._skybox) {
            if (coordSys && coordSys.viewGL
                && environmentUrl !== 'auto'
                && !(environmentUrl.match && environmentUrl.match(/.hdr$/))
            ) {
                var srgbDefineMethod = coordSys.viewGL.isLinearSpace() ? 'define' : 'undefine';
                this._skybox.material.shader[srgbDefineMethod]('fragment', 'SRGB_DECODE');
            }
            else {
                this._skybox.material.shader.undefine('fragment', 'SRGB_DECODE');
            }
            // var ambientCubemapUrl = environmentUrl === 'auto'
            //     ? componentModel.get('light.ambientCubemap.texture')
            //     : environmentUrl;
        }
    }
};

module.exports = SceneHelper;

/***/ }),
/* 31 */
/***/ (function(module, exports) {

module.exports = {
    defaultOption: {
        // Light is available when material.shading is not color
        light: {
            // Main light
            main: {
                shadow: false,
                // low, medium, high, ultra
                shadowQuality: 'high',

                color: '#fff',
                intensity: 1,

                alpha: 0,
                beta: 0
            },
            ambient: {
                color: '#fff',
                intensity: 0.2
            },
            ambientCubemap: {
                // Panorama environment texture,
                // Support .hdr and commmon web formats.
                texture: null,
                // Available when texture is hdr.
                exposure: 1,
                // Intensity for diffuse term
                diffuseIntensity: 0.5,
                // Intensity for specular term, only available when shading is realastic
                specularIntensity: 0.5
            }
        }
    }
};

/***/ }),
/* 32 */
/***/ (function(module, exports) {

module.exports = {
    defaultOption: {
        // Post effect
        postEffect: {
            enable: false,

            bloom: {
                enable: true,
                intensity: 0.1
            },
            depthOfField: {
                enable: false,
                focalRange: 20,
                focalDistance: 50,
                blurRadius: 10,
                fstop: 2.8,
                quality: 'medium'
            },

            screenSpaceAmbientOcclusion: {
                enable: false,
                radius: 2,
                // low, medium, high, ultra
                quality: 'medium',
                intensity: 1
            },

            screenSpaceReflection: {
                enable: false,
                quality: 'medium',
                maxRoughness: 0.8
            },

            colorCorrection: {
                enable: true,

                exposure: 0,

                brightness: 0,

                contrast: 1,

                saturation: 1,

                lookupTexture: ''
            },

            edge: {
                enable: false
            },

            FXAA: {
                enable: false
            }
        },

        // Temporal super sampling when the picture is still.
        temporalSuperSampling: {
            // Only enabled when postEffect is enabled
            enable: 'auto'
        }
    }
};

/***/ }),
/* 33 */
/***/ (function(module, exports) {

module.exports = {
    defaultOption: {
        shading: null,

        realisticMaterial: {
            textureTiling: 1,
            textureOffset: 0,

            detailTexture: null
        },

        lambertMaterial: {
            textureTiling: 1,
            textureOffset: 0,

            detailTexture: null
        },

        colorMaterial: {
            textureTiling: 1,
            textureOffset: 0,

            detailTexture: null
        },

        hatchingMaterial: {
            textureTiling: 1,
            textureOffset: 0,

            paperColor: '#fff'
        }
    }
};

/***/ }),
/* 34 */
/***/ (function(module, exports) {

module.exports = {
    convertToDynamicArray: function (clear) {
        if (clear) {
            this.resetOffset();
        }
        var attributes = this.attributes;
        for (var name in attributes) {
            if (clear || !attributes[name].value) {
                attributes[name].value = [];
            }
            else {
                attributes[name].value = Array.prototype.slice.call(attributes[name].value);
            }
        }
        if (clear || !this.indices) {
            this.indices = [];
        }
        else {
            this.indices = Array.prototype.slice.call(this.indices);
        }
    },

    convertToTypedArray: function () {
        var attributes = this.attributes;
        for (var name in attributes) {
            if (attributes[name].value && attributes[name].value.length > 0) {
                attributes[name].value = new Float32Array(attributes[name].value);
            }
            else {
                attributes[name].value = null;
            }
        }
        if (this.indices && this.indices.length > 0) {
            this.indices = this.vertexCount > 0xffff ? new Uint32Array(this.indices) : new Uint16Array(this.indices);
        }

        this.dirty();
    }
};

/***/ }),
/* 35 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";



    var Base = __webpack_require__(8);
    var Vector3 = __webpack_require__(3);
    var Quaternion = __webpack_require__(55);
    var Matrix4 = __webpack_require__(9);
    var glMatrix = __webpack_require__(1);
    var BoundingBox = __webpack_require__(14);
    var mat4 = glMatrix.mat4;

    var nameId = 0;

    /**
     * @constructor qtek.Node
     * @extends qtek.core.Base
     */
    var Node = Base.extend(
    /** @lends qtek.Node# */
    {
        /**
         * Scene node name
         * @type {string}
         */
        name: '',

        /**
         * Position relative to its parent node. aka translation.
         * @type {qtek.math.Vector3}
         */
        position: null,

        /**
         * Rotation relative to its parent node. Represented by a quaternion
         * @type {qtek.math.Quaternion}
         */
        rotation: null,

        /**
         * Scale relative to its parent node
         * @type {qtek.math.Vector3}
         */
        scale: null,

        /**
         * Affine transform matrix relative to its root scene.
         * @type {qtek.math.Matrix4}
         */
        worldTransform: null,

        /**
         * Affine transform matrix relative to its parent node.
         * Composited with position, rotation and scale.
         * @type {qtek.math.Matrix4}
         */
        localTransform: null,

        /**
         * If the local transform is update from SRT(scale, rotation, translation, which is position here) each frame
         * @type {boolean}
         */
        autoUpdateLocalTransform: true,

        /**
         * Parent of current scene node
         * @type {?qtek.Node}
         * @private
         */
        _parent: null,
        /**
         * The root scene mounted. Null if it is a isolated node
         * @type {?qtek.Scene}
         * @private
         */
        _scene: null,

        _needsUpdateWorldTransform: true,

        _inIterating: false,

        // Depth for transparent queue sorting
        __depth: 0

    }, function () {

        if (!this.name) {
            this.name = (this.type || 'NODE') + '_' + (nameId++);
        }

        if (!this.position) {
            this.position = new Vector3();
        }
        if (!this.rotation) {
            this.rotation = new Quaternion();
        }
        if (!this.scale) {
            this.scale = new Vector3(1, 1, 1);
        }

        this.worldTransform = new Matrix4();
        this.localTransform = new Matrix4();

        this._children = [];

    },
    /**@lends qtek.Node.prototype. */
    {

        /**
         * @memberOf qtek.Node
         * @type {qtek.math.Vector3}
         * @instance
         */
        target: null,
        /**
         * If node and its chilren invisible
         * @type {boolean}
         * @memberOf qtek.Node
         * @instance
         */
        invisible: false,

        /**
         * Return true if it is a renderable scene node, like Mesh and ParticleSystem
         * @return {boolean}
         */
        isRenderable: function () {
            return false;
        },

        /**
         * Set the name of the scene node
         * @param {string} name
         */
        setName: function (name) {
            var scene = this._scene;
            if (scene) {
                var nodeRepository = scene._nodeRepository;
                delete nodeRepository[this.name];
                nodeRepository[name] = this;
            }
            this.name = name;
        },

        /**
         * Add a child node
         * @param {qtek.Node} node
         */
        add: function (node) {
            if (this._inIterating) {
                console.warn('Add operation can cause unpredictable error when in iterating');
            }
            var originalParent = node._parent;
            if (originalParent === this) {
                return;
            }
            if (originalParent) {
                originalParent.remove(node);
            }
            node._parent = this;
            this._children.push(node);

            var scene = this._scene;
            if (scene && scene !== node.scene) {
                node.traverse(this._addSelfToScene, this);
            }
            // Mark children needs update transform
            // In case child are remove and added again after parent moved
            node._needsUpdateWorldTransform = true;
        },

        /**
         * Remove the given child scene node
         * @param {qtek.Node} node
         */
        remove: function (node) {
            if (this._inIterating) {
                console.warn('Remove operation can cause unpredictable error when in iterating');
            }
            var children = this._children;
            var idx = children.indexOf(node);
            if (idx < 0) {
                return;
            }

            children.splice(idx, 1);
            node._parent = null;

            if (this._scene) {
                node.traverse(this._removeSelfFromScene, this);
            }
        },

        /**
         * Remove all children
         */
        removeAll: function () {
            var children = this._children;

            for (var idx = 0; idx < children.length; idx++) {
                children[idx]._parent = null;

                if (this._scene) {
                    children[idx].traverse(this._removeSelfFromScene, this);
                }
            }

            this._children = [];
        },

        /**
         * Get the scene mounted
         * @return {qtek.Scene}
         */
        getScene: function () {
            return this._scene;
        },

        /**
         * Get parent node
         * @return {qtek.Scene}
         */
        getParent: function () {
            return this._parent;
        },

        _removeSelfFromScene: function (descendant) {
            descendant._scene.removeFromScene(descendant);
            descendant._scene = null;
        },

        _addSelfToScene: function (descendant) {
            this._scene.addToScene(descendant);
            descendant._scene = this._scene;
        },

        /**
         * Return true if it is ancestor of the given scene node
         * @param {qtek.Node} node
         */
        isAncestor: function (node) {
            var parent = node._parent;
            while(parent) {
                if (parent === this) {
                    return true;
                }
                parent = parent._parent;
            }
            return false;
        },

        /**
         * Get a new created array of all its children nodes
         * @return {qtek.Node[]}
         */
        children: function () {
            return this._children.slice();
        },

        childAt: function (idx) {
            return this._children[idx];
        },

        /**
         * Get first child with the given name
         * @param {string} name
         * @return {qtek.Node}
         */
        getChildByName: function (name) {
            var children = this._children;
            for (var i = 0; i < children.length; i++) {
                if (children[i].name === name) {
                    return children[i];
                }
            }
        },

        /**
         * Get first descendant have the given name
         * @param {string} name
         * @return {qtek.Node}
         */
        getDescendantByName: function (name) {
            var children = this._children;
            for (var i = 0; i < children.length; i++) {
                var child = children[i];
                if (child.name === name) {
                    return child;
                } else {
                    var res = child.getDescendantByName(name);
                    if (res) {
                        return res;
                    }
                }
            }
        },

        /**
         * Query descendant node by path
         * @param {string} path
         * @return {qtek.Node}
         */
        queryNode: function (path) {
            if (!path) {
                return;
            }
            // TODO Name have slash ?
            var pathArr = path.split('/');
            var current = this;
            for (var i = 0; i < pathArr.length; i++) {
                var name = pathArr[i];
                // Skip empty
                if (!name) {
                    continue;
                }
                var found = false;
                var children = current._children;
                for (var j = 0; j < children.length; j++) {
                    var child = children[j];
                    if (child.name === name) {
                        current = child;
                        found = true;
                        break;
                    }
                }
                // Early return if not found
                if (!found) {
                    return;
                }
            }

            return current;
        },

        /**
         * Get query path, relative to rootNode(default is scene)
         * @return {string}
         */
        getPath: function (rootNode) {
            if (!this._parent) {
                return '/';
            }

            var current = this._parent;
            var path = this.name;
            while (current._parent) {
                path = current.name + '/' + path;
                if (current._parent == rootNode) {
                    break;
                }
                current = current._parent;
            }
            if (!current._parent && rootNode) {
                return null;
            }
            return path;
        },

        /**
         * Depth first traverse all its descendant scene nodes and
         * @param {Function} callback
         * @param {Node} [context]
         * @param {Function} [ctor]
         */
        traverse: function (callback, context, ctor) {

            this._inIterating = true;

            if (ctor == null || this.constructor === ctor) {
                callback.call(context, this);
            }
            var _children = this._children;
            for(var i = 0, len = _children.length; i < len; i++) {
                _children[i].traverse(callback, context, ctor);
            }

            this._inIterating = false;
        },

        eachChild: function (callback, context, ctor) {
            this._inIterating = true;

            var _children = this._children;
            var noCtor = ctor == null;
            for(var i = 0, len = _children.length; i < len; i++) {
                var child = _children[i];
                if (noCtor || child.constructor === ctor) {
                    callback.call(context, child, i);
                }
            }

            this._inIterating = false;
        },

        /**
         * Set the local transform and decompose to SRT
         * @param {qtek.math.Matrix4} matrix
         */
        setLocalTransform: function (matrix) {
            mat4.copy(this.localTransform._array, matrix._array);
            this.decomposeLocalTransform();
        },

        /**
         * Decompose the local transform to SRT
         */
        decomposeLocalTransform: function (keepScale) {
            var scale = !keepScale ? this.scale: null;
            this.localTransform.decomposeMatrix(scale, this.rotation, this.position);
        },

        /**
         * Set the world transform and decompose to SRT
         * @param {qtek.math.Matrix4} matrix
         */
        setWorldTransform: function (matrix) {
            mat4.copy(this.worldTransform._array, matrix._array);
            this.decomposeWorldTransform();
        },

        /**
         * Decompose the world transform to SRT
         * @method
         */
        decomposeWorldTransform: (function () {

            var tmp = mat4.create();

            return function (keepScale) {
                var localTransform = this.localTransform;
                var worldTransform = this.worldTransform;
                // Assume world transform is updated
                if (this._parent) {
                    mat4.invert(tmp, this._parent.worldTransform._array);
                    mat4.multiply(localTransform._array, tmp, worldTransform._array);
                } else {
                    mat4.copy(localTransform._array, worldTransform._array);
                }
                var scale = !keepScale ? this.scale: null;
                localTransform.decomposeMatrix(scale, this.rotation, this.position);
            };
        })(),

        transformNeedsUpdate: function () {
            return this.position._dirty
                || this.rotation._dirty
                || this.scale._dirty;
        },

        /**
         * Update local transform from SRT
         * Notice that local transform will not be updated if _dirty mark of position, rotation, scale is all false
         */
        updateLocalTransform: function () {
            var position = this.position;
            var rotation = this.rotation;
            var scale = this.scale;

            if (this.transformNeedsUpdate()) {
                var m = this.localTransform._array;

                // Transform order, scale->rotation->position
                mat4.fromRotationTranslation(m, rotation._array, position._array);

                mat4.scale(m, m, scale._array);

                rotation._dirty = false;
                scale._dirty = false;
                position._dirty = false;

                this._needsUpdateWorldTransform = true;
            }
        },

        /**
         * Update world transform, assume its parent world transform have been updated
         */
        _updateWorldTransformTopDown: function () {
            var localTransform = this.localTransform._array;
            var worldTransform = this.worldTransform._array;
            if (this._parent) {
                mat4.multiplyAffine(
                    worldTransform,
                    this._parent.worldTransform._array,
                    localTransform
                );
            }
            else {
                mat4.copy(worldTransform, localTransform);
            }
        },

        // Update world transform before whole scene is updated.
        updateWorldTransform: function () {
            // Find the root node which transform needs update;
            var rootNodeIsD