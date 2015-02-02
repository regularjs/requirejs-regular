(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("regularjs"));
	else if(typeof define === 'function' && define.amd)
		define(["regularjs"], factory);
	else if(typeof exports === 'object')
		exports["rgl"] = factory(require("regularjs"));
	else
		root["rgl"] = factory(root["regularjs"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_1__) {
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
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
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
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/* WEBPACK VAR INJECTION */(function(process) {
	!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(2), __webpack_require__(1)], __WEBPACK_AMD_DEFINE_RESULT__ = function (text, parser) {

	    if(!text.get && typeof nodeRequire !== "undefined" && typeof process !== 'undefined'){
	        text.get = function (url, callback, errback) {
	            var fs = nodeRequire("fs");
	            var file = fs.readFileSync(url, 'utf8');
	            //Remove BOM (Byte Mark Order) from utf8 files if it is there.
	            if (file.indexOf('\uFEFF') === 0) {
	                file = file.substring(1);
	            }
	            callback(file);
	        }
	    }

	    if(!text.get) text.get = function(){}

	    var tpl = function(str, data){
	        return str.replace(/\{\{(\w+)\}\}/g, function(all, name){
	            return data[name] || ""
	        })
	    }

	    var buildMap = {};
	    var template = 'define("{{pn}}!{{mn}}", function(){ return {{ast}} });\n';


	    function load(name, req, onLoad, config){
	        var rgl_config = config.rgl || {}
	        // load text1 files with text1 plugin
	        text.load(name, req, function(data,r){
	            onLoad(
	              (buildMap[name] = parser.parse(data, {END: rgl_config.END, BEGIN: rgl_config.BEGIN, stringify: false}))
	            );
	        }, config);
	    }


	    function write(pn, mn, writeModule){
	        if(buildMap[mn]){
	            writeModule(
	                tpl(template,{
	                    pn: pn,
	                    mn: mn,
	                    ast: JSON.stringify(buildMap[mn])
	                })
	            )
	        }
	    }
	    return {
	        load : load,
	        write : write
	    };

	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(3)))

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_1__;

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/* WEBPACK VAR INJECTION */(function(module, process) {/**
	 * @license RequireJS text 2.0.12 Copyright (c) 2010-2014, The Dojo Foundation All Rights Reserved.
	 * Available via the MIT or new BSD license.
	 * see: http://github.com/requirejs/text for details
	 */
	/*jslint regexp: true */
	/*global require, XMLHttpRequest, ActiveXObject,
	  define, window, process, Packages,
	  java, location, Components, FileUtils */

	!(__WEBPACK_AMD_DEFINE_ARRAY__ = [module], __WEBPACK_AMD_DEFINE_RESULT__ = function (module) {
	    'use strict';

	    var text, fs, Cc, Ci, xpcIsWindows,
	        progIds = ['Msxml2.XMLHTTP', 'Microsoft.XMLHTTP', 'Msxml2.XMLHTTP.4.0'],
	        xmlRegExp = /^\s*<\?xml(\s)+version=[\'\"](\d)*.(\d)*[\'\"](\s)*\?>/im,
	        bodyRegExp = /<body[^>]*>\s*([\s\S]+)\s*<\/body>/im,
	        hasLocation = typeof location !== 'undefined' && location.href,
	        defaultProtocol = hasLocation && location.protocol && location.protocol.replace(/\:/, ''),
	        defaultHostName = hasLocation && location.hostname,
	        defaultPort = hasLocation && (location.port || undefined),
	        buildMap = {},
	        masterConfig = (module.config && module.config()) || {};

	    text = {
	        version: '2.0.12',

	        strip: function (content) {
	            //Strips <?xml ...?> declarations so that external SVG and XML
	            //documents can be added to a document without worry. Also, if the string
	            //is an HTML document, only the part inside the body tag is returned.
	            if (content) {
	                content = content.replace(xmlRegExp, "");
	                var matches = content.match(bodyRegExp);
	                if (matches) {
	                    content = matches[1];
	                }
	            } else {
	                content = "";
	            }
	            return content;
	        },

	        jsEscape: function (content) {
	            return content.replace(/(['\\])/g, '\\$1')
	                .replace(/[\f]/g, "\\f")
	                .replace(/[\b]/g, "\\b")
	                .replace(/[\n]/g, "\\n")
	                .replace(/[\t]/g, "\\t")
	                .replace(/[\r]/g, "\\r")
	                .replace(/[\u2028]/g, "\\u2028")
	                .replace(/[\u2029]/g, "\\u2029");
	        },

	        createXhr: masterConfig.createXhr || function () {
	            //Would love to dump the ActiveX crap in here. Need IE 6 to die first.
	            var xhr, i, progId;
	            if (typeof XMLHttpRequest !== "undefined") {
	                return new XMLHttpRequest();
	            } else if (typeof ActiveXObject !== "undefined") {
	                for (i = 0; i < 3; i += 1) {
	                    progId = progIds[i];
	                    try {
	                        xhr = new ActiveXObject(progId);
	                    } catch (e) {}

	                    if (xhr) {
	                        progIds = [progId];  // so faster next time
	                        break;
	                    }
	                }
	            }

	            return xhr;
	        },

	        /**
	         * Parses a resource name into its component parts. Resource names
	         * look like: module/name.ext!strip, where the !strip part is
	         * optional.
	         * @param {String} name the resource name
	         * @returns {Object} with properties "moduleName", "ext" and "strip"
	         * where strip is a boolean.
	         */
	        parseName: function (name) {
	            var modName, ext, temp,
	                strip = false,
	                index = name.indexOf("."),
	                isRelative = name.indexOf('./') === 0 ||
	                             name.indexOf('../') === 0;

	            if (index !== -1 && (!isRelative || index > 1)) {
	                modName = name.substring(0, index);
	                ext = name.substring(index + 1, name.length);
	            } else {
	                modName = name;
	            }

	            temp = ext || modName;
	            index = temp.indexOf("!");
	            if (index !== -1) {
	                //Pull off the strip arg.
	                strip = temp.substring(index + 1) === "strip";
	                temp = temp.substring(0, index);
	                if (ext) {
	                    ext = temp;
	                } else {
	                    modName = temp;
	                }
	            }

	            return {
	                moduleName: modName,
	                ext: ext,
	                strip: strip
	            };
	        },

	        xdRegExp: /^((\w+)\:)?\/\/([^\/\\]+)/,

	        /**
	         * Is an URL on another domain. Only works for browser use, returns
	         * false in non-browser environments. Only used to know if an
	         * optimized .js version of a text resource should be loaded
	         * instead.
	         * @param {String} url
	         * @returns Boolean
	         */
	        useXhr: function (url, protocol, hostname, port) {
	            var uProtocol, uHostName, uPort,
	                match = text.xdRegExp.exec(url);
	            if (!match) {
	                return true;
	            }
	            uProtocol = match[2];
	            uHostName = match[3];

	            uHostName = uHostName.split(':');
	            uPort = uHostName[1];
	            uHostName = uHostName[0];

	            return (!uProtocol || uProtocol === protocol) &&
	                   (!uHostName || uHostName.toLowerCase() === hostname.toLowerCase()) &&
	                   ((!uPort && !uHostName) || uPort === port);
	        },

	        finishLoad: function (name, strip, content, onLoad) {
	            content = strip ? text.strip(content) : content;
	            if (masterConfig.isBuild) {
	                buildMap[name] = content;
	            }
	            onLoad(content);
	        },

	        load: function (name, req, onLoad, config) {
	            //Name has format: some.module.filext!strip
	            //The strip part is optional.
	            //if strip is present, then that means only get the string contents
	            //inside a body tag in an HTML string. For XML/SVG content it means
	            //removing the <?xml ...?> declarations so the content can be inserted
	            //into the current doc without problems.

	            // Do not bother with the work if a build and text will
	            // not be inlined.
	            if (config && config.isBuild && !config.inlineText) {
	                onLoad();
	                return;
	            }

	            masterConfig.isBuild = config && config.isBuild;

	            var parsed = text.parseName(name),
	                nonStripName = parsed.moduleName +
	                    (parsed.ext ? '.' + parsed.ext : ''),
	                url = req.toUrl(nonStripName),
	                useXhr = (masterConfig.useXhr) ||
	                         text.useXhr;

	            // Do not load if it is an empty: url
	            if (url.indexOf('empty:') === 0) {
	                onLoad();
	                return;
	            }

	            //Load the text. Use XHR if possible and in a browser.
	            if (!hasLocation || useXhr(url, defaultProtocol, defaultHostName, defaultPort)) {
	                text.get(url, function (content) {
	                    text.finishLoad(name, parsed.strip, content, onLoad);
	                }, function (err) {
	                    if (onLoad.error) {
	                        onLoad.error(err);
	                    }
	                });
	            } else {
	                //Need to fetch the resource across domains. Assume
	                //the resource has been optimized into a JS module. Fetch
	                //by the module name + extension, but do not include the
	                //!strip part to avoid file system issues.
	                req([nonStripName], function (content) {
	                    text.finishLoad(parsed.moduleName + '.' + parsed.ext,
	                                    parsed.strip, content, onLoad);
	                });
	            }
	        },

	        write: function (pluginName, moduleName, write, config) {
	            if (buildMap.hasOwnProperty(moduleName)) {
	                var content = text.jsEscape(buildMap[moduleName]);
	                write.asModule(pluginName + "!" + moduleName,
	                               "define(function () { return '" +
	                                   content +
	                               "';});\n");
	            }
	        },

	        writeFile: function (pluginName, moduleName, req, write, config) {
	            var parsed = text.parseName(moduleName),
	                extPart = parsed.ext ? '.' + parsed.ext : '',
	                nonStripName = parsed.moduleName + extPart,
	                //Use a '.js' file name so that it indicates it is a
	                //script that can be loaded across domains.
	                fileName = req.toUrl(parsed.moduleName + extPart) + '.js';

	            //Leverage own load() method to load plugin value, but only
	            //write out values that do not have the strip argument,
	            //to avoid any potential issues with ! in file names.
	            text.load(nonStripName, req, function (value) {
	                //Use own write() method to construct full module value.
	                //But need to create shell that translates writeFile's
	                //write() to the right interface.
	                var textWrite = function (contents) {
	                    return write(fileName, contents);
	                };
	                textWrite.asModule = function (moduleName, contents) {
	                    return write.asModule(moduleName, fileName, contents);
	                };

	                text.write(pluginName, nonStripName, textWrite, config);
	            }, config);
	        }
	    };

	    if (masterConfig.env === 'node' || (!masterConfig.env &&
	            typeof process !== "undefined" &&
	            process.versions &&
	            !!process.versions.node &&
	            !process.versions['node-webkit'])) {
	        //Using special require.nodeRequire, something added by r.js.
	        fs = __webpack_require__(4).nodeRequire('fs');

	        text.get = function (url, callback, errback) {
	            try {
	                var file = fs.readFileSync(url, 'utf8');
	                //Remove BOM (Byte Mark Order) from utf8 files if it is there.
	                if (file.indexOf('\uFEFF') === 0) {
	                    file = file.substring(1);
	                }
	                callback(file);
	            } catch (e) {
	                if (errback) {
	                    errback(e);
	                }
	            }
	        };
	    } else if (masterConfig.env === 'xhr' || (!masterConfig.env &&
	            text.createXhr())) {
	        text.get = function (url, callback, errback, headers) {
	            var xhr = text.createXhr(), header;
	            xhr.open('GET', url, true);

	            //Allow plugins direct access to xhr headers
	            if (headers) {
	                for (header in headers) {
	                    if (headers.hasOwnProperty(header)) {
	                        xhr.setRequestHeader(header.toLowerCase(), headers[header]);
	                    }
	                }
	            }

	            //Allow overrides specified in config
	            if (masterConfig.onXhr) {
	                masterConfig.onXhr(xhr, url);
	            }

	            xhr.onreadystatechange = function (evt) {
	                var status, err;
	                //Do not explicitly handle errors, those should be
	                //visible via console output in the browser.
	                if (xhr.readyState === 4) {
	                    status = xhr.status || 0;
	                    if (status > 399 && status < 600) {
	                        //An http 4xx or 5xx error. Signal an error.
	                        err = new Error(url + ' HTTP status: ' + status);
	                        err.xhr = xhr;
	                        if (errback) {
	                            errback(err);
	                        }
	                    } else {
	                        callback(xhr.responseText);
	                    }

	                    if (masterConfig.onXhrComplete) {
	                        masterConfig.onXhrComplete(xhr, url);
	                    }
	                }
	            };
	            xhr.send(null);
	        };
	    } else if (masterConfig.env === 'rhino' || (!masterConfig.env &&
	            typeof Packages !== 'undefined' && typeof java !== 'undefined')) {
	        //Why Java, why is this so awkward?
	        text.get = function (url, callback) {
	            var stringBuffer, line,
	                encoding = "utf-8",
	                file = new java.io.File(url),
	                lineSeparator = java.lang.System.getProperty("line.separator"),
	                input = new java.io.BufferedReader(new java.io.InputStreamReader(new java.io.FileInputStream(file), encoding)),
	                content = '';
	            try {
	                stringBuffer = new java.lang.StringBuffer();
	                line = input.readLine();

	                // Byte Order Mark (BOM) - The Unicode Standard, version 3.0, page 324
	                // http://www.unicode.org/faq/utf_bom.html

	                // Note that when we use utf-8, the BOM should appear as "EF BB BF", but it doesn't due to this bug in the JDK:
	                // http://bugs.sun.com/bugdatabase/view_bug.do?bug_id=4508058
	                if (line && line.length() && line.charAt(0) === 0xfeff) {
	                    // Eat the BOM, since we've already found the encoding on this file,
	                    // and we plan to concatenating this buffer with others; the BOM should
	                    // only appear at the top of a file.
	                    line = line.substring(1);
	                }

	                if (line !== null) {
	                    stringBuffer.append(line);
	                }

	                while ((line = input.readLine()) !== null) {
	                    stringBuffer.append(lineSeparator);
	                    stringBuffer.append(line);
	                }
	                //Make sure we return a JavaScript string and not a Java string.
	                content = String(stringBuffer.toString()); //String
	            } finally {
	                input.close();
	            }
	            callback(content);
	        };
	    } else if (masterConfig.env === 'xpconnect' || (!masterConfig.env &&
	            typeof Components !== 'undefined' && Components.classes &&
	            Components.interfaces)) {
	        //Avert your gaze!
	        Cc = Components.classes;
	        Ci = Components.interfaces;
	        Components.utils['import']('resource://gre/modules/FileUtils.jsm');
	        xpcIsWindows = ('@mozilla.org/windows-registry-key;1' in Cc);

	        text.get = function (url, callback) {
	            var inStream, convertStream, fileObj,
	                readData = {};

	            if (xpcIsWindows) {
	                url = url.replace(/\//g, '\\');
	            }

	            fileObj = new FileUtils.File(url);

	            //XPCOM, you so crazy
	            try {
	                inStream = Cc['@mozilla.org/network/file-input-stream;1']
	                           .createInstance(Ci.nsIFileInputStream);
	                inStream.init(fileObj, 1, 0, false);

	                convertStream = Cc['@mozilla.org/intl/converter-input-stream;1']
	                                .createInstance(Ci.nsIConverterInputStream);
	                convertStream.init(inStream, "utf-8", inStream.available(),
	                Ci.nsIConverterInputStream.DEFAULT_REPLACEMENT_CHARACTER);

	                convertStream.readString(inStream.available(), readData);
	                convertStream.close();
	                inStream.close();
	                callback(readData.value);
	            } catch (e) {
	                throw new Error((fileObj && fileObj.path || '') + ': ' + e);
	            }
	        };
	    }
	    return text;
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(8)(module), __webpack_require__(3)))

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	// shim for using process in browser

	var process = module.exports = {};

	process.nextTick = (function () {
	    var canSetImmediate = typeof window !== 'undefined'
	    && window.setImmediate;
	    var canMutationObserver = typeof window !== 'undefined'
	    && window.MutationObserver;
	    var canPost = typeof window !== 'undefined'
	    && window.postMessage && window.addEventListener
	    ;

	    if (canSetImmediate) {
	        return function (f) { return window.setImmediate(f) };
	    }

	    var queue = [];

	    if (canMutationObserver) {
	        var hiddenDiv = document.createElement("div");
	        var observer = new MutationObserver(function () {
	            var queueList = queue.slice();
	            queue.length = 0;
	            queueList.forEach(function (fn) {
	                fn();
	            });
	        });

	        observer.observe(hiddenDiv, { attributes: true });

	        return function nextTick(fn) {
	            if (!queue.length) {
	                hiddenDiv.setAttribute('yes', 'no');
	            }
	            queue.push(fn);
	        };
	    }

	    if (canPost) {
	        window.addEventListener('message', function (ev) {
	            var source = ev.source;
	            if ((source === window || source === null) && ev.data === 'process-tick') {
	                ev.stopPropagation();
	                if (queue.length > 0) {
	                    var fn = queue.shift();
	                    fn();
	                }
	            }
	        }, true);

	        return function nextTick(fn) {
	            queue.push(fn);
	            window.postMessage('process-tick', '*');
	        };
	    }

	    return function nextTick(fn) {
	        setTimeout(fn, 0);
	    };
	})();

	process.title = 'browser';
	process.browser = true;
	process.env = {};
	process.argv = [];

	function noop() {}

	process.on = noop;
	process.addListener = noop;
	process.once = noop;
	process.off = noop;
	process.removeListener = noop;
	process.removeAllListeners = noop;
	process.emit = noop;

	process.binding = function (name) {
	    throw new Error('process.binding is not supported');
	};

	// TODO(shtylman)
	process.cwd = function () { return '/' };
	process.chdir = function (dir) {
	    throw new Error('process.chdir is not supported');
	};


/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	var map = {
		"./text": 2,
		"./text.js": 2
	};
	function webpackContext(req) {
		return __webpack_require__(webpackContextResolve(req));
	};
	function webpackContextResolve(req) {
		return map[req] || (function() { throw new Error("Cannot find module '" + req + "'.") }());
	};
	webpackContext.keys = function webpackContextKeys() {
		return Object.keys(map);
	};
	webpackContext.resolve = webpackContextResolve;
	module.exports = webpackContext;
	webpackContext.id = 4;


/***/ },
/* 5 */,
/* 6 */,
/* 7 */,
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = function(module) {
		if(!module.webpackPolyfill) {
			module.deprecate = function() {};
			module.paths = [];
			// module.parent = undefined by default
			module.children = [];
			module.webpackPolyfill = 1;
		}
		return module;
	}


/***/ }
/******/ ])
});
