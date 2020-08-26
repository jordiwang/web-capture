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
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
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
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }\n\nfunction _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }\n\nvar WebCapture = /*#__PURE__*/function () {\n  function WebCapture(option) {\n    var _this = this;\n\n    _classCallCheck(this, WebCapture);\n\n    this.option = option;\n    this.cacheFile = null;\n    this.cacheFilePtr = 0;\n    window.Module = {\n      instantiateWasm: function instantiateWasm(info, receiveInstance) {\n        fetch('./wasm/capture.wasm').then(function (response) {\n          return response.arrayBuffer();\n        }).then(function (bytes) {\n          return WebAssembly.instantiate(bytes, info);\n        }).then(function (result) {\n          receiveInstance(result.instance);\n        });\n      },\n      onRuntimeInitialized: function onRuntimeInitialized() {\n        if (_this.option.onInit) {\n          _this.option.onInit();\n        }\n      }\n    };\n\n    this._loadLib();\n  }\n\n  _createClass(WebCapture, [{\n    key: \"_loadLib\",\n    value: function _loadLib() {\n      var node = document.createElement('script');\n\n      node.onload = function () {\n        document.body.removeChild(node);\n        node = null;\n      };\n\n      node.async = true;\n      node.src = './wasm/capture.js';\n      node.crossOrigin = 'true';\n      document.body.appendChild(node);\n    }\n  }, {\n    key: \"_getImageDataUrl\",\n    value: function _getImageDataUrl(width, height, imageBuffer) {\n      var canvas = document.createElement('canvas');\n      var ctx = canvas.getContext('2d');\n      canvas.width = width;\n      canvas.height = height;\n      var imageData = ctx.createImageData(width, height);\n      var j = 0;\n\n      for (var i = 0; i < imageBuffer.length; i++) {\n        if (i && i % 3 == 0) {\n          imageData.data[j] = 255;\n          j += 1;\n        }\n\n        imageData.data[j] = imageBuffer[i];\n        j += 1;\n      }\n\n      ctx.putImageData(imageData, 0, 0, 0, 0, width, height);\n      return canvas.toDataURL('image/jpeg');\n    }\n  }, {\n    key: \"_getImageInfo\",\n    value: function _getImageInfo(imgDataPtr) {\n      var width = Module.HEAPU32[imgDataPtr / 4],\n          height = Module.HEAPU32[imgDataPtr / 4 + 1],\n          duration = Module.HEAPU32[imgDataPtr / 4 + 2],\n          imageBufferPtr = Module.HEAPU32[imgDataPtr / 4 + 3],\n          imageBuffer = Module.HEAPU8.subarray(imageBufferPtr, imageBufferPtr + width * height * 3);\n\n      Module._free(imgDataPtr);\n\n      Module._free(imageBufferPtr);\n\n      return {\n        width: width,\n        height: height,\n        duration: duration,\n        imageBuffer: imageBuffer\n      };\n    }\n  }, {\n    key: \"setFile\",\n    value: function setFile(file, callback) {\n      // this.cacheFile = file;\n      //         if (this.cacheFilePtr) {\n      //             Module._free(this.cacheFilePtr);\n      //         }\n      var fileReader = new FileReader();\n      var filePtr = 0;\n\n      fileReader.onload = function () {\n        var fileBuffer = new Uint8Array(fileReader.result);\n        setInterval(function () {\n          if (filePtr > 0) {\n            Module._free(filePtr);\n          }\n\n          filePtr = Module._malloc(fileBuffer.length);\n          Module.HEAP8.set(fileBuffer, filePtr);\n\n          var code = Module._setFile(filePtr, fileBuffer.length);\n\n          console.log(code);\n          console.log(filePtr);\n        }, 1000); // filePtr = Module._malloc(fileBuffer.length);\n        // console.log('==========', filePtr);\n        // this.cacheFilePtr = filePtr;\n        // Module.HEAP8.set(fileBuffer, filePtr);\n        // let code = Module._setFile(filePtr, fileBuffer.length);\n        // callback(filePtr);\n      };\n\n      fileReader.readAsArrayBuffer(file);\n    }\n  }, {\n    key: \"capture\",\n    value: function capture(file, timeStamp, callback) {\n      var _this2 = this;\n\n      if (file === this.cacheFile) {\n        var imgDataPtr = Module._capture(timeStamp);\n\n        var imgInfo = this._getImageInfo(imgDataPtr);\n\n        var dataUrl = this._getImageDataUrl(imgInfo.width, imgInfo.height, imgInfo.imageBuffer);\n\n        callback(dataUrl, imgInfo);\n      } else {\n        this.setFile(file, function () {\n          var imgDataPtr = Module._capture(timeStamp);\n\n          var imgInfo = _this2._getImageInfo(imgDataPtr);\n\n          var dataUrl = _this2._getImageDataUrl(imgInfo.width, imgInfo.height, imgInfo.imageBuffer);\n\n          callback(dataUrl, imgInfo);\n        });\n      }\n    }\n  }]);\n\n  return WebCapture;\n}();\n\nwindow.WebCapture = WebCapture;\n/* harmony default export */ __webpack_exports__[\"default\"] = (WebCapture);\n\n//# sourceURL=webpack:///./src/index.js?");

/***/ })

/******/ });