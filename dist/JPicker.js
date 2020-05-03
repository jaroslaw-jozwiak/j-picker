(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["JPicker"] = factory();
	else
		root["JPicker"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
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
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/JPicker.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./node_modules/hogan.js/lib/compiler.js":
/*!***********************************************!*\
  !*** ./node_modules/hogan.js/lib/compiler.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/*
 *  Copyright 2011 Twitter, Inc.
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *
 *  http://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License.
 */
(function (Hogan) {
  // Setup regex  assignments
  // remove whitespace according to Mustache spec
  var rIsWhitespace = /\S/,
      rQuot = /\"/g,
      rNewline = /\n/g,
      rCr = /\r/g,
      rSlash = /\\/g,
      rLineSep = /\u2028/,
      rParagraphSep = /\u2029/;
  Hogan.tags = {
    '#': 1,
    '^': 2,
    '<': 3,
    '$': 4,
    '/': 5,
    '!': 6,
    '>': 7,
    '=': 8,
    '_v': 9,
    '{': 10,
    '&': 11,
    '_t': 12
  };

  Hogan.scan = function scan(text, delimiters) {
    var len = text.length,
        IN_TEXT = 0,
        IN_TAG_TYPE = 1,
        IN_TAG = 2,
        state = IN_TEXT,
        tagType = null,
        tag = null,
        buf = '',
        tokens = [],
        seenTag = false,
        i = 0,
        lineStart = 0,
        otag = '{{',
        ctag = '}}';

    function addBuf() {
      if (buf.length > 0) {
        tokens.push({
          tag: '_t',
          text: new String(buf)
        });
        buf = '';
      }
    }

    function lineIsWhitespace() {
      var isAllWhitespace = true;

      for (var j = lineStart; j < tokens.length; j++) {
        isAllWhitespace = Hogan.tags[tokens[j].tag] < Hogan.tags['_v'] || tokens[j].tag == '_t' && tokens[j].text.match(rIsWhitespace) === null;

        if (!isAllWhitespace) {
          return false;
        }
      }

      return isAllWhitespace;
    }

    function filterLine(haveSeenTag, noNewLine) {
      addBuf();

      if (haveSeenTag && lineIsWhitespace()) {
        for (var j = lineStart, next; j < tokens.length; j++) {
          if (tokens[j].text) {
            if ((next = tokens[j + 1]) && next.tag == '>') {
              // set indent to token value
              next.indent = tokens[j].text.toString();
            }

            tokens.splice(j, 1);
          }
        }
      } else if (!noNewLine) {
        tokens.push({
          tag: '\n'
        });
      }

      seenTag = false;
      lineStart = tokens.length;
    }

    function changeDelimiters(text, index) {
      var close = '=' + ctag,
          closeIndex = text.indexOf(close, index),
          delimiters = trim(text.substring(text.indexOf('=', index) + 1, closeIndex)).split(' ');
      otag = delimiters[0];
      ctag = delimiters[delimiters.length - 1];
      return closeIndex + close.length - 1;
    }

    if (delimiters) {
      delimiters = delimiters.split(' ');
      otag = delimiters[0];
      ctag = delimiters[1];
    }

    for (i = 0; i < len; i++) {
      if (state == IN_TEXT) {
        if (tagChange(otag, text, i)) {
          --i;
          addBuf();
          state = IN_TAG_TYPE;
        } else {
          if (text.charAt(i) == '\n') {
            filterLine(seenTag);
          } else {
            buf += text.charAt(i);
          }
        }
      } else if (state == IN_TAG_TYPE) {
        i += otag.length - 1;
        tag = Hogan.tags[text.charAt(i + 1)];
        tagType = tag ? text.charAt(i + 1) : '_v';

        if (tagType == '=') {
          i = changeDelimiters(text, i);
          state = IN_TEXT;
        } else {
          if (tag) {
            i++;
          }

          state = IN_TAG;
        }

        seenTag = i;
      } else {
        if (tagChange(ctag, text, i)) {
          tokens.push({
            tag: tagType,
            n: trim(buf),
            otag: otag,
            ctag: ctag,
            i: tagType == '/' ? seenTag - otag.length : i + ctag.length
          });
          buf = '';
          i += ctag.length - 1;
          state = IN_TEXT;

          if (tagType == '{') {
            if (ctag == '}}') {
              i++;
            } else {
              cleanTripleStache(tokens[tokens.length - 1]);
            }
          }
        } else {
          buf += text.charAt(i);
        }
      }
    }

    filterLine(seenTag, true);
    return tokens;
  };

  function cleanTripleStache(token) {
    if (token.n.substr(token.n.length - 1) === '}') {
      token.n = token.n.substring(0, token.n.length - 1);
    }
  }

  function trim(s) {
    if (s.trim) {
      return s.trim();
    }

    return s.replace(/^\s*|\s*$/g, '');
  }

  function tagChange(tag, text, index) {
    if (text.charAt(index) != tag.charAt(0)) {
      return false;
    }

    for (var i = 1, l = tag.length; i < l; i++) {
      if (text.charAt(index + i) != tag.charAt(i)) {
        return false;
      }
    }

    return true;
  } // the tags allowed inside super templates


  var allowedInSuper = {
    '_t': true,
    '\n': true,
    '$': true,
    '/': true
  };

  function buildTree(tokens, kind, stack, customTags) {
    var instructions = [],
        opener = null,
        tail = null,
        token = null;
    tail = stack[stack.length - 1];

    while (tokens.length > 0) {
      token = tokens.shift();

      if (tail && tail.tag == '<' && !(token.tag in allowedInSuper)) {
        throw new Error('Illegal content in < super tag.');
      }

      if (Hogan.tags[token.tag] <= Hogan.tags['$'] || isOpener(token, customTags)) {
        stack.push(token);
        token.nodes = buildTree(tokens, token.tag, stack, customTags);
      } else if (token.tag == '/') {
        if (stack.length === 0) {
          throw new Error('Closing tag without opener: /' + token.n);
        }

        opener = stack.pop();

        if (token.n != opener.n && !isCloser(token.n, opener.n, customTags)) {
          throw new Error('Nesting error: ' + opener.n + ' vs. ' + token.n);
        }

        opener.end = token.i;
        return instructions;
      } else if (token.tag == '\n') {
        token.last = tokens.length == 0 || tokens[0].tag == '\n';
      }

      instructions.push(token);
    }

    if (stack.length > 0) {
      throw new Error('missing closing tag: ' + stack.pop().n);
    }

    return instructions;
  }

  function isOpener(token, tags) {
    for (var i = 0, l = tags.length; i < l; i++) {
      if (tags[i].o == token.n) {
        token.tag = '#';
        return true;
      }
    }
  }

  function isCloser(close, open, tags) {
    for (var i = 0, l = tags.length; i < l; i++) {
      if (tags[i].c == close && tags[i].o == open) {
        return true;
      }
    }
  }

  function stringifySubstitutions(obj) {
    var items = [];

    for (var key in obj) {
      items.push('"' + esc(key) + '": function(c,p,t,i) {' + obj[key] + '}');
    }

    return "{ " + items.join(",") + " }";
  }

  function stringifyPartials(codeObj) {
    var partials = [];

    for (var key in codeObj.partials) {
      partials.push('"' + esc(key) + '":{name:"' + esc(codeObj.partials[key].name) + '", ' + stringifyPartials(codeObj.partials[key]) + "}");
    }

    return "partials: {" + partials.join(",") + "}, subs: " + stringifySubstitutions(codeObj.subs);
  }

  Hogan.stringify = function (codeObj, text, options) {
    return "{code: function (c,p,i) { " + Hogan.wrapMain(codeObj.code) + " }," + stringifyPartials(codeObj) + "}";
  };

  var serialNo = 0;

  Hogan.generate = function (tree, text, options) {
    serialNo = 0;
    var context = {
      code: '',
      subs: {},
      partials: {}
    };
    Hogan.walk(tree, context);

    if (options.asString) {
      return this.stringify(context, text, options);
    }

    return this.makeTemplate(context, text, options);
  };

  Hogan.wrapMain = function (code) {
    return 'var t=this;t.b(i=i||"");' + code + 'return t.fl();';
  };

  Hogan.template = Hogan.Template;

  Hogan.makeTemplate = function (codeObj, text, options) {
    var template = this.makePartials(codeObj);
    template.code = new Function('c', 'p', 'i', this.wrapMain(codeObj.code));
    return new this.template(template, text, this, options);
  };

  Hogan.makePartials = function (codeObj) {
    var key,
        template = {
      subs: {},
      partials: codeObj.partials,
      name: codeObj.name
    };

    for (key in template.partials) {
      template.partials[key] = this.makePartials(template.partials[key]);
    }

    for (key in codeObj.subs) {
      template.subs[key] = new Function('c', 'p', 't', 'i', codeObj.subs[key]);
    }

    return template;
  };

  function esc(s) {
    return s.replace(rSlash, '\\\\').replace(rQuot, '\\\"').replace(rNewline, '\\n').replace(rCr, '\\r').replace(rLineSep, "\\u2028").replace(rParagraphSep, "\\u2029");
  }

  function chooseMethod(s) {
    return ~s.indexOf('.') ? 'd' : 'f';
  }

  function createPartial(node, context) {
    var prefix = "<" + (context.prefix || "");
    var sym = prefix + node.n + serialNo++;
    context.partials[sym] = {
      name: node.n,
      partials: {}
    };
    context.code += 't.b(t.rp("' + esc(sym) + '",c,p,"' + (node.indent || '') + '"));';
    return sym;
  }

  Hogan.codegen = {
    '#': function _(node, context) {
      context.code += 'if(t.s(t.' + chooseMethod(node.n) + '("' + esc(node.n) + '",c,p,1),' + 'c,p,0,' + node.i + ',' + node.end + ',"' + node.otag + " " + node.ctag + '")){' + 't.rs(c,p,' + 'function(c,p,t){';
      Hogan.walk(node.nodes, context);
      context.code += '});c.pop();}';
    },
    '^': function _(node, context) {
      context.code += 'if(!t.s(t.' + chooseMethod(node.n) + '("' + esc(node.n) + '",c,p,1),c,p,1,0,0,"")){';
      Hogan.walk(node.nodes, context);
      context.code += '};';
    },
    '>': createPartial,
    '<': function _(node, context) {
      var ctx = {
        partials: {},
        code: '',
        subs: {},
        inPartial: true
      };
      Hogan.walk(node.nodes, ctx);
      var template = context.partials[createPartial(node, context)];
      template.subs = ctx.subs;
      template.partials = ctx.partials;
    },
    '$': function $(node, context) {
      var ctx = {
        subs: {},
        code: '',
        partials: context.partials,
        prefix: node.n
      };
      Hogan.walk(node.nodes, ctx);
      context.subs[node.n] = ctx.code;

      if (!context.inPartial) {
        context.code += 't.sub("' + esc(node.n) + '",c,p,i);';
      }
    },
    '\n': function _(node, context) {
      context.code += write('"\\n"' + (node.last ? '' : ' + i'));
    },
    '_v': function _v(node, context) {
      context.code += 't.b(t.v(t.' + chooseMethod(node.n) + '("' + esc(node.n) + '",c,p,0)));';
    },
    '_t': function _t(node, context) {
      context.code += write('"' + esc(node.text) + '"');
    },
    '{': tripleStache,
    '&': tripleStache
  };

  function tripleStache(node, context) {
    context.code += 't.b(t.t(t.' + chooseMethod(node.n) + '("' + esc(node.n) + '",c,p,0)));';
  }

  function write(s) {
    return 't.b(' + s + ');';
  }

  Hogan.walk = function (nodelist, context) {
    var func;

    for (var i = 0, l = nodelist.length; i < l; i++) {
      func = Hogan.codegen[nodelist[i].tag];
      func && func(nodelist[i], context);
    }

    return context;
  };

  Hogan.parse = function (tokens, text, options) {
    options = options || {};
    return buildTree(tokens, '', [], options.sectionTags || []);
  };

  Hogan.cache = {};

  Hogan.cacheKey = function (text, options) {
    return [text, !!options.asString, !!options.disableLambda, options.delimiters, !!options.modelGet].join('||');
  };

  Hogan.compile = function (text, options) {
    options = options || {};
    var key = Hogan.cacheKey(text, options);
    var template = this.cache[key];

    if (template) {
      var partials = template.partials;

      for (var name in partials) {
        delete partials[name].instance;
      }

      return template;
    }

    template = this.generate(this.parse(this.scan(text, options.delimiters), text, options), text, options);
    return this.cache[key] = template;
  };
})( true ? exports : undefined);

/***/ }),

/***/ "./node_modules/hogan.js/lib/hogan.js":
/*!********************************************!*\
  !*** ./node_modules/hogan.js/lib/hogan.js ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/*
 *  Copyright 2011 Twitter, Inc.
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *
 *  http://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License.
 */
// This file is for use with Node.js. See dist/ for browser files.
var Hogan = __webpack_require__(/*! ./compiler */ "./node_modules/hogan.js/lib/compiler.js");

Hogan.Template = __webpack_require__(/*! ./template */ "./node_modules/hogan.js/lib/template.js").Template;
Hogan.template = Hogan.Template;
module.exports = Hogan;

/***/ }),

/***/ "./node_modules/hogan.js/lib/template.js":
/*!***********************************************!*\
  !*** ./node_modules/hogan.js/lib/template.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

/*
 *  Copyright 2011 Twitter, Inc.
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *
 *  http://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License.
 */
var Hogan = {};

(function (Hogan) {
  Hogan.Template = function (codeObj, text, compiler, options) {
    codeObj = codeObj || {};
    this.r = codeObj.code || this.r;
    this.c = compiler;
    this.options = options || {};
    this.text = text || '';
    this.partials = codeObj.partials || {};
    this.subs = codeObj.subs || {};
    this.buf = '';
  };

  Hogan.Template.prototype = {
    // render: replaced by generated code.
    r: function r(context, partials, indent) {
      return '';
    },
    // variable escaping
    v: hoganEscape,
    // triple stache
    t: coerceToString,
    render: function render(context, partials, indent) {
      return this.ri([context], partials || {}, indent);
    },
    // render internal -- a hook for overrides that catches partials too
    ri: function ri(context, partials, indent) {
      return this.r(context, partials, indent);
    },
    // ensurePartial
    ep: function ep(symbol, partials) {
      var partial = this.partials[symbol]; // check to see that if we've instantiated this partial before

      var template = partials[partial.name];

      if (partial.instance && partial.base == template) {
        return partial.instance;
      }

      if (typeof template == 'string') {
        if (!this.c) {
          throw new Error("No compiler available.");
        }

        template = this.c.compile(template, this.options);
      }

      if (!template) {
        return null;
      } // We use this to check whether the partials dictionary has changed


      this.partials[symbol].base = template;

      if (partial.subs) {
        // Make sure we consider parent template now
        if (!partials.stackText) partials.stackText = {};

        for (key in partial.subs) {
          if (!partials.stackText[key]) {
            partials.stackText[key] = this.activeSub !== undefined && partials.stackText[this.activeSub] ? partials.stackText[this.activeSub] : this.text;
          }
        }

        template = createSpecializedPartial(template, partial.subs, partial.partials, this.stackSubs, this.stackPartials, partials.stackText);
      }

      this.partials[symbol].instance = template;
      return template;
    },
    // tries to find a partial in the current scope and render it
    rp: function rp(symbol, context, partials, indent) {
      var partial = this.ep(symbol, partials);

      if (!partial) {
        return '';
      }

      return partial.ri(context, partials, indent);
    },
    // render a section
    rs: function rs(context, partials, section) {
      var tail = context[context.length - 1];

      if (!isArray(tail)) {
        section(context, partials, this);
        return;
      }

      for (var i = 0; i < tail.length; i++) {
        context.push(tail[i]);
        section(context, partials, this);
        context.pop();
      }
    },
    // maybe start a section
    s: function s(val, ctx, partials, inverted, start, end, tags) {
      var pass;

      if (isArray(val) && val.length === 0) {
        return false;
      }

      if (typeof val == 'function') {
        val = this.ms(val, ctx, partials, inverted, start, end, tags);
      }

      pass = !!val;

      if (!inverted && pass && ctx) {
        ctx.push(_typeof(val) == 'object' ? val : ctx[ctx.length - 1]);
      }

      return pass;
    },
    // find values with dotted names
    d: function d(key, ctx, partials, returnFound) {
      var found,
          names = key.split('.'),
          val = this.f(names[0], ctx, partials, returnFound),
          doModelGet = this.options.modelGet,
          cx = null;

      if (key === '.' && isArray(ctx[ctx.length - 2])) {
        val = ctx[ctx.length - 1];
      } else {
        for (var i = 1; i < names.length; i++) {
          found = findInScope(names[i], val, doModelGet);

          if (found !== undefined) {
            cx = val;
            val = found;
          } else {
            val = '';
          }
        }
      }

      if (returnFound && !val) {
        return false;
      }

      if (!returnFound && typeof val == 'function') {
        ctx.push(cx);
        val = this.mv(val, ctx, partials);
        ctx.pop();
      }

      return val;
    },
    // find values with normal names
    f: function f(key, ctx, partials, returnFound) {
      var val = false,
          v = null,
          found = false,
          doModelGet = this.options.modelGet;

      for (var i = ctx.length - 1; i >= 0; i--) {
        v = ctx[i];
        val = findInScope(key, v, doModelGet);

        if (val !== undefined) {
          found = true;
          break;
        }
      }

      if (!found) {
        return returnFound ? false : "";
      }

      if (!returnFound && typeof val == 'function') {
        val = this.mv(val, ctx, partials);
      }

      return val;
    },
    // higher order templates
    ls: function ls(func, cx, partials, text, tags) {
      var oldTags = this.options.delimiters;
      this.options.delimiters = tags;
      this.b(this.ct(coerceToString(func.call(cx, text)), cx, partials));
      this.options.delimiters = oldTags;
      return false;
    },
    // compile text
    ct: function ct(text, cx, partials) {
      if (this.options.disableLambda) {
        throw new Error('Lambda features disabled.');
      }

      return this.c.compile(text, this.options).render(cx, partials);
    },
    // template result buffering
    b: function b(s) {
      this.buf += s;
    },
    fl: function fl() {
      var r = this.buf;
      this.buf = '';
      return r;
    },
    // method replace section
    ms: function ms(func, ctx, partials, inverted, start, end, tags) {
      var textSource,
          cx = ctx[ctx.length - 1],
          result = func.call(cx);

      if (typeof result == 'function') {
        if (inverted) {
          return true;
        } else {
          textSource = this.activeSub && this.subsText && this.subsText[this.activeSub] ? this.subsText[this.activeSub] : this.text;
          return this.ls(result, cx, partials, textSource.substring(start, end), tags);
        }
      }

      return result;
    },
    // method replace variable
    mv: function mv(func, ctx, partials) {
      var cx = ctx[ctx.length - 1];
      var result = func.call(cx);

      if (typeof result == 'function') {
        return this.ct(coerceToString(result.call(cx)), cx, partials);
      }

      return result;
    },
    sub: function sub(name, context, partials, indent) {
      var f = this.subs[name];

      if (f) {
        this.activeSub = name;
        f(context, partials, this, indent);
        this.activeSub = false;
      }
    }
  }; //Find a key in an object

  function findInScope(key, scope, doModelGet) {
    var val;

    if (scope && _typeof(scope) == 'object') {
      if (scope[key] !== undefined) {
        val = scope[key]; // try lookup with get for backbone or similar model data
      } else if (doModelGet && scope.get && typeof scope.get == 'function') {
        val = scope.get(key);
      }
    }

    return val;
  }

  function createSpecializedPartial(instance, subs, partials, stackSubs, stackPartials, stackText) {
    function PartialTemplate() {}

    ;
    PartialTemplate.prototype = instance;

    function Substitutions() {}

    ;
    Substitutions.prototype = instance.subs;
    var key;
    var partial = new PartialTemplate();
    partial.subs = new Substitutions();
    partial.subsText = {}; //hehe. substext.

    partial.buf = '';
    stackSubs = stackSubs || {};
    partial.stackSubs = stackSubs;
    partial.subsText = stackText;

    for (key in subs) {
      if (!stackSubs[key]) stackSubs[key] = subs[key];
    }

    for (key in stackSubs) {
      partial.subs[key] = stackSubs[key];
    }

    stackPartials = stackPartials || {};
    partial.stackPartials = stackPartials;

    for (key in partials) {
      if (!stackPartials[key]) stackPartials[key] = partials[key];
    }

    for (key in stackPartials) {
      partial.partials[key] = stackPartials[key];
    }

    return partial;
  }

  var rAmp = /&/g,
      rLt = /</g,
      rGt = />/g,
      rApos = /\'/g,
      rQuot = /\"/g,
      hChars = /[&<>\"\']/;

  function coerceToString(val) {
    return String(val === null || val === undefined ? '' : val);
  }

  function hoganEscape(str) {
    str = coerceToString(str);
    return hChars.test(str) ? str.replace(rAmp, '&amp;').replace(rLt, '&lt;').replace(rGt, '&gt;').replace(rApos, '&#39;').replace(rQuot, '&quot;') : str;
  }

  var isArray = Array.isArray || function (a) {
    return Object.prototype.toString.call(a) === '[object Array]';
  };
})( true ? exports : undefined);

/***/ }),

/***/ "./src/Classes/DOM.ts":
/*!****************************!*\
  !*** ./src/Classes/DOM.ts ***!
  \****************************/
/*! exports provided: DOM */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DOM", function() { return DOM; });
var DOM = /** @class */ (function () {
    function DOM(selector, target) {
        var _this = this;
        if (target === void 0) { target = document; }
        this.wrapper = [];
        if (typeof selector === 'string') {
            target.querySelectorAll(selector).forEach(function (NodeElement) {
                _this.wrapper.push(NodeElement);
            });
        }
        else {
            this.wrapper = [selector];
        }
    }
    DOM.prototype.get = function () {
        return this.wrapper[0];
    };
    DOM.prototype.html = function (html) {
        if (html === void 0) { html = null; }
        var response = this.wrapper[0] ? this.wrapper[0].innerHTML : null;
        this.wrapper.forEach(function (WrapperTmp) {
            if (html !== null) {
                WrapperTmp.innerHTML = html;
            }
        });
        return response;
    };
    DOM.prototype.addClass = function (_class) {
        var _this = this;
        this.wrapper.forEach(function (WrapperTmp) {
            var finalClasses = [];
            WrapperTmp.classList.forEach(function (_classTmp) {
                finalClasses.push(_classTmp);
            });
            finalClasses.push(_class);
            _this.setClasses(WrapperTmp, finalClasses);
        });
        return this.wrapper[0] || null;
    };
    DOM.prototype.removeClass = function (_class) {
        var _this = this;
        this.wrapper.forEach(function (WrapperTmp) {
            var finalClasses = [];
            WrapperTmp.classList.forEach(function (_classTmp) {
                _class !== _classTmp && finalClasses.push(_classTmp);
            });
            _this.setClasses(WrapperTmp, finalClasses);
        });
        return this.wrapper[0] || null;
    };
    DOM.prototype.setClasses = function (Wrapper, classes) {
        Wrapper.className = classes.join(' ');
        return Wrapper;
    };
    return DOM;
}());



/***/ }),

/***/ "./src/Classes/Event.ts":
/*!******************************!*\
  !*** ./src/Classes/Event.ts ***!
  \******************************/
/*! exports provided: Event */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Event", function() { return Event; });
/* harmony import */ var _EventCallback__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./EventCallback */ "./src/Classes/EventCallback.ts");
/* harmony import */ var _Tools__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Tools */ "./src/Classes/Tools.ts");


var Event = /** @class */ (function () {
    function Event() {
        this.events = {};
        this.callbacksIdsSet = {};
        this.callbackId = 1;
        this.JPickerI = null;
    }
    Event.get = function () {
        if (Event.Instance === null) {
            Event.Instance = new Event;
        }
        return Event.Instance;
    };
    Event.prototype.setJPicker = function (JPickerI) {
        this.JPickerI = JPickerI;
        return this;
    };
    Event.prototype.addListener = function (key, callback) {
        var currentCallbackId = this.callbackId;
        this.callbackId++;
        if (typeof this.events[key] === 'undefined') {
            this.events[key] = new _EventCallback__WEBPACK_IMPORTED_MODULE_0__["EventCallback"](key);
        }
        this.events[key].addCallback(callback, currentCallbackId);
        this.callbacksIdsSet[currentCallbackId] = key;
        return currentCallbackId;
    };
    Event.prototype.removeListener = function (callbackId) {
        var key = this.callbacksIdsSet[callbackId] || '';
        if (typeof this.events[key] !== 'undefined') {
            this.events[key].removeListener(callbackId);
        }
        return this;
    };
    Event.prototype.trigger = function (key) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        if (_Tools__WEBPACK_IMPORTED_MODULE_1__["Tools"].d(this.events[key])) {
            this.events[key].run(args);
        }
        else {
            _Tools__WEBPACK_IMPORTED_MODULE_1__["Tools"].error('Event ' + key + ' is not defined');
        }
        return this;
    };
    Event.Instance = null;
    return Event;
}());



/***/ }),

/***/ "./src/Classes/EventCallback.ts":
/*!**************************************!*\
  !*** ./src/Classes/EventCallback.ts ***!
  \**************************************/
/*! exports provided: EventCallback */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EventCallback", function() { return EventCallback; });
var EventCallback = /** @class */ (function () {
    function EventCallback(key) {
        this.callbacks = [];
        this.callbacksIndex = {};
        this.key = key;
    }
    EventCallback.prototype.run = function (args) {
        var _this = this;
        if (args === void 0) { args = []; }
        this.callbacks.forEach(function (callback) {
            callback.apply(_this, args);
        });
        return this;
    };
    EventCallback.prototype.addCallback = function (callback, callbackId) {
        this.callbacksIndex[callbackId] = this.callbacks.push(callback) - 1;
        return this;
    };
    EventCallback.prototype.removeEvent = function (callbackId) {
        var index = this.callbacksIndex[callbackId] || -1;
        if (index > -1) {
            this.callbacks.splice(index, 1);
        }
        delete this.callbacksIndex[callbackId];
        return this;
    };
    return EventCallback;
}());



/***/ }),

/***/ "./src/Classes/EventsDict.ts":
/*!***********************************!*\
  !*** ./src/Classes/EventsDict.ts ***!
  \***********************************/
/*! exports provided: NEXT_MONTH_CLICK, PREV_MONTH_CLICK, DAY_CLICK, DAY_MOUSE_ENTER, DAY_MOUSE_LEAVE, RANGE_CLICK, VALUE_CLICK */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NEXT_MONTH_CLICK", function() { return NEXT_MONTH_CLICK; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PREV_MONTH_CLICK", function() { return PREV_MONTH_CLICK; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DAY_CLICK", function() { return DAY_CLICK; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DAY_MOUSE_ENTER", function() { return DAY_MOUSE_ENTER; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DAY_MOUSE_LEAVE", function() { return DAY_MOUSE_LEAVE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RANGE_CLICK", function() { return RANGE_CLICK; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "VALUE_CLICK", function() { return VALUE_CLICK; });
var NEXT_MONTH_CLICK = 'onNextMonthClick';
var PREV_MONTH_CLICK = 'onPrevMonthClick';
var DAY_CLICK = 'onDayClick';
var DAY_MOUSE_ENTER = 'onDayMouseEnter';
var DAY_MOUSE_LEAVE = 'onDayMouseLeave';
var RANGE_CLICK = 'onRangeClick';
var VALUE_CLICK = 'onValueClick';


/***/ }),

/***/ "./src/Classes/JPickerConfig.ts":
/*!**************************************!*\
  !*** ./src/Classes/JPickerConfig.ts ***!
  \**************************************/
/*! exports provided: JPickerConfig */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "JPickerConfig", function() { return JPickerConfig; });
/* harmony import */ var _Tools__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Tools */ "./src/Classes/Tools.ts");
/* harmony import */ var _JPickerRangesConfig__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./JPickerRangesConfig */ "./src/Classes/JPickerRangesConfig.ts");


var JPickerConfig = /** @class */ (function () {
    function JPickerConfig() {
        this.config = {};
    }
    JPickerConfig.get = function () {
        if (JPickerConfig.Instance === null) {
            JPickerConfig.Instance = new JPickerConfig;
        }
        return JPickerConfig.Instance;
    };
    JPickerConfig.prototype.setConfig = function (config) {
        if (config === void 0) { config = null; }
        if (config !== null && typeof config === 'object') {
            for (var key in config) {
                this.config[key] = config[key];
            }
        }
        return this;
    };
    JPickerConfig.prototype.getTextValue = function (key) {
        return (this.config[key] || '').toString();
    };
    JPickerConfig.prototype.getObjectValue = function (key) {
        var result = this.config[key] || {};
        if (typeof result !== 'object') {
            _Tools__WEBPACK_IMPORTED_MODULE_0__["Tools"].error('Wrong value in config for field "' + key + '"');
        }
        return result;
    };
    JPickerConfig.prototype.isRange = function () {
        return this.config.range || false;
    };
    JPickerConfig.prototype.getWrapper = function () {
        return this.config.wrapper || '';
    };
    JPickerConfig.prototype.getToday = function () {
        return _Tools__WEBPACK_IMPORTED_MODULE_0__["Tools"].getDate(this.config.today, new Date);
    };
    JPickerConfig.prototype.getCurrentValue = function () {
        var value = this.config.currentDate, date = _Tools__WEBPACK_IMPORTED_MODULE_0__["Tools"].getDate(value), result = [], date1, date2, time1, time2;
        if (date !== null) {
            result.push(date);
        }
        else if (_Tools__WEBPACK_IMPORTED_MODULE_0__["Tools"].isArray(value)) {
            date1 = _Tools__WEBPACK_IMPORTED_MODULE_0__["Tools"].getDate(value[0]);
            date2 = _Tools__WEBPACK_IMPORTED_MODULE_0__["Tools"].getDate(value[1]);
            if (date1 !== null && date2 !== null) {
                result.push(date1, date2);
            }
        }
        if (result.length === 0) {
            result.push(this.getToday());
        }
        if (this.isRange() && _Tools__WEBPACK_IMPORTED_MODULE_0__["Tools"].u(result[1])) {
            time1 = result[0].getTime();
            time2 = time1 + (24 * 3600 * 1000);
            result[1] = new Date(time2);
        }
        return result;
    };
    JPickerConfig.prototype.getMonths = function () {
        return this.config.months || [
            'January',
            'February',
            'March',
            'April',
            'May',
            'June',
            'July',
            'August',
            'September',
            'October',
            'November',
            'December',
        ];
    };
    JPickerConfig.prototype.getWeeksDays = function () {
        return this.config.weekDays || [
            'Mo',
            'Tu',
            'We',
            'Th',
            'Fr',
            'Sat',
            'Sun',
        ];
    };
    JPickerConfig.prototype.showRangesPredefined = function () {
        return this.isRange() &&
            ((_Tools__WEBPACK_IMPORTED_MODULE_0__["Tools"].isArray(this.config.rangesSet) && this.config.rangesSet.length > 0)
                || _Tools__WEBPACK_IMPORTED_MODULE_0__["Tools"].u(this.config.rangesSet));
    };
    JPickerConfig.prototype.getRangesSet = function () {
        var rangesSet = this.config.rangesSet;
        if (this.showRangesPredefined()) {
            if (_Tools__WEBPACK_IMPORTED_MODULE_0__["Tools"].u(rangesSet)) {
                rangesSet = null;
            }
            return (new _JPickerRangesConfig__WEBPACK_IMPORTED_MODULE_1__["JPickerRangesConfig"](this.config.rangesSet)).getRanges();
        }
        return [];
    };
    JPickerConfig.prototype.getRangesLabel = function () {
        var defaultLabels = {}, result = this.config.rangesLabels || {};
        defaultLabels[_JPickerRangesConfig__WEBPACK_IMPORTED_MODULE_1__["JPickerRangesConfig"].THIS_WEEK] = 'This week';
        defaultLabels[_JPickerRangesConfig__WEBPACK_IMPORTED_MODULE_1__["JPickerRangesConfig"].LAST_WEEK] = 'Last week';
        defaultLabels[_JPickerRangesConfig__WEBPACK_IMPORTED_MODULE_1__["JPickerRangesConfig"].NEXT_WEEK] = 'Next week';
        defaultLabels[_JPickerRangesConfig__WEBPACK_IMPORTED_MODULE_1__["JPickerRangesConfig"].LAST_3_DAYS] = 'Last 3 days';
        defaultLabels[_JPickerRangesConfig__WEBPACK_IMPORTED_MODULE_1__["JPickerRangesConfig"].LAST_7_DAYS] = 'Last 7 days';
        defaultLabels[_JPickerRangesConfig__WEBPACK_IMPORTED_MODULE_1__["JPickerRangesConfig"].LAST_30_DAYS] = 'Last 30 days';
        defaultLabels[_JPickerRangesConfig__WEBPACK_IMPORTED_MODULE_1__["JPickerRangesConfig"].THIS_MONTH] = 'This month';
        defaultLabels[_JPickerRangesConfig__WEBPACK_IMPORTED_MODULE_1__["JPickerRangesConfig"].LAST_MONTH] = 'Last month';
        defaultLabels[_JPickerRangesConfig__WEBPACK_IMPORTED_MODULE_1__["JPickerRangesConfig"].NEXT_MONTH] = 'Next month';
        defaultLabels[_JPickerRangesConfig__WEBPACK_IMPORTED_MODULE_1__["JPickerRangesConfig"].THIS_QUARTER] = 'This quarter';
        defaultLabels[_JPickerRangesConfig__WEBPACK_IMPORTED_MODULE_1__["JPickerRangesConfig"].LAST_QUARTER] = 'Last quarter';
        defaultLabels[_JPickerRangesConfig__WEBPACK_IMPORTED_MODULE_1__["JPickerRangesConfig"].NEXT_QUARTER] = 'Next quarter';
        for (var key in defaultLabels) {
            if (_Tools__WEBPACK_IMPORTED_MODULE_0__["Tools"].u(result[key])) {
                result[key] = defaultLabels[key];
            }
        }
        return result;
    };
    JPickerConfig.prototype.getRangesTitle = function () {
        return this.config.rangesTitle || 'Choose range';
    };
    JPickerConfig.Instance = null;
    return JPickerConfig;
}());



/***/ }),

/***/ "./src/Classes/JPickerRangesConfig.ts":
/*!********************************************!*\
  !*** ./src/Classes/JPickerRangesConfig.ts ***!
  \********************************************/
/*! exports provided: JPickerRangesConfig */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "JPickerRangesConfig", function() { return JPickerRangesConfig; });
/* harmony import */ var _Tools__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Tools */ "./src/Classes/Tools.ts");
/* harmony import */ var _JPickerConfig__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./JPickerConfig */ "./src/Classes/JPickerConfig.ts");


var JPickerRangesConfig = /** @class */ (function () {
    function JPickerRangesConfig(userRanges) {
        this.userRanges = [];
        if (_Tools__WEBPACK_IMPORTED_MODULE_0__["Tools"].isArray(userRanges)) {
            this.userRanges = userRanges;
        }
        else {
            this.userRanges = this.getDefaultsRanges();
        }
    }
    JPickerRangesConfig.prototype.getRanges = function () {
        var _this = this;
        var ranges = [];
        this.userRanges.forEach(function (item) {
            ranges.push(_this.parseRangeItem(item));
        });
        return ranges;
    };
    JPickerRangesConfig.prototype.parseRangeItem = function (item) {
        var result;
        if (_Tools__WEBPACK_IMPORTED_MODULE_0__["Tools"].isString(item)) {
            result = this.getRangeData(item);
        }
        else {
            result = item;
        }
        result.range = this.parseRangeDate(result.range);
        return result;
    };
    JPickerRangesConfig.prototype.parseRangeDate = function (input) {
        var result = [];
        input.forEach(function (value) {
            if (_Tools__WEBPACK_IMPORTED_MODULE_0__["Tools"].isDate(value)) {
                result.push(value);
            }
            else {
                result.push(new Date(value * 1000));
            }
        });
        return result;
    };
    JPickerRangesConfig.prototype.getRangeData = function (key) {
        var labels = _JPickerConfig__WEBPACK_IMPORTED_MODULE_1__["JPickerConfig"].get().getRangesLabel(), label = labels[key] || _Tools__WEBPACK_IMPORTED_MODULE_0__["Tools"].error('Range key "' + key + '" does not have label'), rangesTmp;
        switch (key) {
            case JPickerRangesConfig.THIS_WEEK:
            case JPickerRangesConfig.LAST_WEEK:
            case JPickerRangesConfig.NEXT_WEEK:
                rangesTmp = this.processWeeks(key);
                break;
            case JPickerRangesConfig.LAST_3_DAYS:
            case JPickerRangesConfig.LAST_7_DAYS:
            case JPickerRangesConfig.LAST_30_DAYS:
                rangesTmp = this.processLastDays(key);
                break;
            case JPickerRangesConfig.THIS_MONTH:
            case JPickerRangesConfig.LAST_MONTH:
            case JPickerRangesConfig.NEXT_MONTH:
                rangesTmp = this.processMonths(key);
                break;
            case JPickerRangesConfig.THIS_QUARTER:
            case JPickerRangesConfig.LAST_QUARTER:
            case JPickerRangesConfig.NEXT_QUARTER:
                rangesTmp = this.processQuarters(key);
                break;
            default:
                _Tools__WEBPACK_IMPORTED_MODULE_0__["Tools"].error('Range key "' + key + '" does not exist');
                break;
        }
        return {
            label: label,
            range: [
                new Date((new Date(rangesTmp[0])).setHours(0, 0, 0, 0)),
                new Date((new Date(rangesTmp[1])).setHours(23, 59, 59, 0))
            ]
        };
    };
    JPickerRangesConfig.prototype.processWeeks = function (range) {
        var today = _JPickerConfig__WEBPACK_IMPORTED_MODULE_1__["JPickerConfig"].get().getToday(), currentDay = today.getDay(), currentTime = today.getTime(), from, to;
        if (currentDay === 0) {
            currentDay = 7;
        }
        switch (range) {
            case JPickerRangesConfig.THIS_WEEK:
                from = currentTime - this.getTimeForDays(currentDay - 1);
                break;
            case JPickerRangesConfig.LAST_WEEK:
                from = currentTime - this.getTimeForDays(currentDay + 6);
                break;
            case JPickerRangesConfig.NEXT_WEEK:
                from = currentTime + this.getTimeForDays(7 - currentDay + 1);
                break;
        }
        to = from + this.getTimeForDays(6);
        return [from, to];
    };
    JPickerRangesConfig.prototype.processLastDays = function (range) {
        var to = _JPickerConfig__WEBPACK_IMPORTED_MODULE_1__["JPickerConfig"].get().getToday().getTime(), from = to;
        switch (range) {
            case JPickerRangesConfig.LAST_3_DAYS:
                from -= this.getTimeForDays(2);
                break;
            case JPickerRangesConfig.LAST_7_DAYS:
                from -= this.getTimeForDays(6);
                break;
            case JPickerRangesConfig.LAST_30_DAYS:
                from -= this.getTimeForDays(29);
                break;
        }
        return [from, to];
    };
    JPickerRangesConfig.prototype.processMonths = function (range) {
        var today = _JPickerConfig__WEBPACK_IMPORTED_MODULE_1__["JPickerConfig"].get().getToday(), currentMonth = today.getMonth(), nextMonth = currentMonth + 1, prevMonth = currentMonth - 1, currentYear = today.getFullYear(), nextYear = currentYear, prevYear = currentYear, from, to;
        if (nextMonth > 11) {
            nextMonth = 0;
            nextYear++;
        }
        if (prevMonth < 0) {
            prevMonth = 11;
            prevYear--;
        }
        switch (range) {
            case JPickerRangesConfig.THIS_MONTH:
                from = (new Date(currentYear, currentMonth)).getTime();
                to = (new Date(nextYear, nextMonth)).getTime() - 1000;
                break;
            case JPickerRangesConfig.LAST_MONTH:
                from = (new Date(prevYear, prevMonth)).getTime();
                to = (new Date(currentYear, currentMonth)).getTime() - 1000;
                break;
            case JPickerRangesConfig.NEXT_MONTH:
                from = (new Date(nextYear, nextMonth)).getTime();
                nextMonth++;
                if (nextMonth > 11) {
                    nextMonth = 0;
                    nextYear++;
                }
                to = (new Date(nextYear, nextMonth)).getTime() - 1000;
                break;
        }
        return [from, to];
    };
    JPickerRangesConfig.prototype.processQuarters = function (range) {
        var today = _JPickerConfig__WEBPACK_IMPORTED_MODULE_1__["JPickerConfig"].get().getToday(), currentQuarter, currentMonth = today.getMonth(), nextMonth, prevMonth, currentYear = today.getFullYear(), nextYear = currentYear, prevYear = currentYear, prevQuarter, nextQuarter, from, to, quarters = {
            1: [0, 1, 2],
            2: [3, 4, 5],
            3: [6, 7, 8],
            4: [9, 10, 11],
        };
        for (var _quarter in quarters) {
            if (quarters[_quarter].indexOf(currentMonth) > -1) {
                currentQuarter = _Tools__WEBPACK_IMPORTED_MODULE_0__["Tools"].int(_quarter);
            }
        }
        prevQuarter = currentQuarter - 1;
        nextQuarter = currentQuarter + 1;
        if (prevQuarter < 1) {
            prevQuarter = 4;
            prevYear--;
        }
        if (nextQuarter > 4) {
            nextQuarter = 1;
            nextYear++;
        }
        currentMonth = quarters[currentQuarter][0];
        prevMonth = quarters[prevQuarter][0];
        nextMonth = quarters[nextQuarter][0];
        switch (range) {
            case JPickerRangesConfig.THIS_QUARTER:
                from = (new Date(currentYear, currentMonth)).getTime();
                to = (new Date(nextYear, nextMonth)).getTime() - 1000;
                break;
            case JPickerRangesConfig.LAST_QUARTER:
                from = (new Date(prevYear, prevMonth)).getTime();
                to = (new Date(currentYear, currentMonth)).getTime() - 1000;
                break;
            case JPickerRangesConfig.NEXT_QUARTER:
                from = (new Date(nextYear, nextMonth)).getTime();
                nextMonth += 3;
                if (nextMonth > 11) {
                    nextMonth = nextMonth - 11;
                    nextYear++;
                }
                to = (new Date(nextYear, nextMonth)).getTime() - 1000;
                break;
        }
        return [from, to];
    };
    JPickerRangesConfig.prototype.getTimeForDays = function (days) {
        return days * 24 * 3600 * 1000;
    };
    JPickerRangesConfig.prototype.getDefaultsRanges = function () {
        return [
            JPickerRangesConfig.THIS_WEEK,
            JPickerRangesConfig.LAST_WEEK,
            JPickerRangesConfig.NEXT_WEEK,
            JPickerRangesConfig.LAST_3_DAYS,
            JPickerRangesConfig.LAST_7_DAYS,
            JPickerRangesConfig.LAST_30_DAYS,
            JPickerRangesConfig.THIS_MONTH,
            JPickerRangesConfig.LAST_MONTH,
            JPickerRangesConfig.NEXT_MONTH,
            JPickerRangesConfig.THIS_QUARTER,
            JPickerRangesConfig.LAST_QUARTER,
            JPickerRangesConfig.NEXT_QUARTER,
        ];
    };
    JPickerRangesConfig.THIS_WEEK = 'this_week';
    JPickerRangesConfig.LAST_WEEK = 'last_week';
    JPickerRangesConfig.NEXT_WEEK = 'next_week';
    JPickerRangesConfig.LAST_3_DAYS = 'last_3_days';
    JPickerRangesConfig.LAST_7_DAYS = 'last_7_days';
    JPickerRangesConfig.LAST_30_DAYS = 'last_30_days';
    JPickerRangesConfig.THIS_MONTH = 'this_month';
    JPickerRangesConfig.LAST_MONTH = 'last_month';
    JPickerRangesConfig.NEXT_MONTH = 'next_month';
    JPickerRangesConfig.THIS_QUARTER = 'this_quarter';
    JPickerRangesConfig.LAST_QUARTER = 'last_quarter';
    JPickerRangesConfig.NEXT_QUARTER = 'next_quarter';
    return JPickerRangesConfig;
}());



/***/ }),

/***/ "./src/Classes/Tools.ts":
/*!******************************!*\
  !*** ./src/Classes/Tools.ts ***!
  \******************************/
/*! exports provided: Tools */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Tools", function() { return Tools; });
var Tools = /** @class */ (function () {
    function Tools() {
    }
    Tools.getDate = function (value, _default) {
        if (_default === void 0) { _default = null; }
        if (typeof value === 'number') {
            return new Date(value * 1000);
        }
        else if (value instanceof Date) {
            return value;
        }
        return _default;
    };
    Tools.isDate = function (value) {
        return value instanceof Date;
    };
    Tools.isArray = function (value) {
        return value instanceof Array;
    };
    Tools.isNumber = function (value) {
        return typeof value === 'number';
    };
    Tools.isString = function (value) {
        return typeof value === 'string';
    };
    Tools.isFunction = function (value) {
        return typeof value === 'function';
    };
    Tools.int = function (value) {
        return parseInt(value, 10) || 0;
    };
    Tools.error = function (message, checkDocs) {
        if (checkDocs === void 0) { checkDocs = true; }
        message += '.';
        if (checkDocs) {
            message += ' Check documentation: https://jpicker.com/docs';
        }
        throw new Error(message);
    };
    Tools.d = function (value) {
        return typeof value !== 'undefined' && value !== null;
    };
    Tools.u = function (value) {
        return !Tools.d(value);
    };
    return Tools;
}());



/***/ }),

/***/ "./src/Components/Component.ts":
/*!*************************************!*\
  !*** ./src/Components/Component.ts ***!
  \*************************************/
/*! exports provided: Component */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Component", function() { return Component; });
/* harmony import */ var _HTMLBuilder__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./HTMLBuilder */ "./src/Components/HTMLBuilder.ts");

var Component = /** @class */ (function () {
    function Component() {
        this.HTMLBuilderI = null;
        this.componentPrepared = false;
        this.HTMLBuilderI = new _HTMLBuilder__WEBPACK_IMPORTED_MODULE_0__["HTMLBuilder"]();
    }
    Component.prototype.getHTMLElement = function () {
        if (!this.componentPrepared) {
            this.onComponentPreparation();
            this.HTMLBuilderI
                .setMustache(this.getMustache())
                .setMustacheVars(this.getMustacheVars())
                .setEvents(this.getEvents());
            this.componentPrepared = true;
        }
        return this.HTMLBuilderI.getHTMLElement();
    };
    Component.prototype.refreshHTMLElement = function () {
        this.componentPrepared = false;
        this.HTMLBuilderI = new _HTMLBuilder__WEBPACK_IMPORTED_MODULE_0__["HTMLBuilder"]();
        this.getHTMLElement();
        return this;
    };
    Component.prototype.onComponentPreparation = function () {
        return this;
    };
    Component.prototype.getEventObject = function (selector, type, callback) {
        return {
            selector: selector,
            type: type,
            callback: callback
        };
    };
    Component.prototype.getEvents = function () {
        return [];
    };
    Component.prototype.getMustacheVars = function () {
        return {};
    };
    return Component;
}());



/***/ }),

/***/ "./src/Components/DayPicker/CalendarCell.ts":
/*!**************************************************!*\
  !*** ./src/Components/DayPicker/CalendarCell.ts ***!
  \**************************************************/
/*! exports provided: CalendarCell */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CalendarCell", function() { return CalendarCell; });
var CalendarCell = /** @class */ (function () {
    function CalendarCell() {
        this.cellClass = '';
        this.attributes = [];
        this.content = '';
    }
    CalendarCell.prototype.getClass = function () {
        return this.cellClass;
    };
    CalendarCell.prototype.getLabel = function () {
        return this.content;
    };
    CalendarCell.prototype.setClass = function (_class) {
        this.cellClass = _class;
        return this;
    };
    CalendarCell.prototype.addClass = function (_class) {
        this.cellClass += ' ' + _class;
        return this;
    };
    CalendarCell.prototype.setContent = function (content) {
        this.content = content;
        return this;
    };
    CalendarCell.prototype.setContentDay = function (day) {
        this.content = day.toString();
        return this;
    };
    CalendarCell.prototype.addAttribute = function (name, value) {
        this.attributes.push('data-' + name + '=' + value);
        return this;
    };
    return CalendarCell;
}());



/***/ }),

/***/ "./src/Components/DayPicker/DayPicker.mustache":
/*!*****************************************************!*\
  !*** ./src/Components/DayPicker/DayPicker.mustache ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var H = __webpack_require__(/*! hogan.js */ "./node_modules/hogan.js/lib/hogan.js");
module.exports = function() { var T = new H.Template({code: function (c,p,i) { var t=this;t.b(i=i||"");t.b("<div class=\"jpicker-days-wrapper\">\r");t.b("\n" + i);if(t.s(t.f("calendar",c,p,1),c,p,0,53,546,"{{ }}")){t.rs(c,p,function(c,p,t){t.b("        <div class=\"jpicker-calendar-row\">\r");t.b("\n" + i);if(t.s(t.d(".",c,p,1),c,p,0,117,518,"{{ }}")){t.rs(c,p,function(c,p,t){t.b("                <div class=\"jpicker-calendar-cell ");t.b(t.v(t.f("cellClass",c,p,0)));t.b("\" ");if(t.s(t.f("attributes",c,p,1),c,p,0,199,205,"{{ }}")){t.rs(c,p,function(c,p,t){t.b(t.v(t.d(".",c,p,0)));t.b(" ");});c.pop();}t.b(">\r");t.b("\n" + i);t.b("                    <div class=\"jpicker-calendar-cell-content\">\r");t.b("\n" + i);t.b("                        <div class=\"jpicker-cell-out\">\r");t.b("\n" + i);t.b("                            <div class=\"jpicker-cell-in\">");t.b(t.t(t.f("content",c,p,0)));t.b("</div>\r");t.b("\n" + i);t.b("                        </div>\r");t.b("\n" + i);t.b("                    </div>\r");t.b("\n" + i);t.b("                </div>\r");t.b("\n" + i);});c.pop();}t.b("        </div>\r");t.b("\n" + i);});c.pop();}t.b("</div>\r");t.b("\n");return t.fl(); },partials: {}, subs: {  }}, "<div class=\"jpicker-days-wrapper\">\r\n    {{#calendar}}\r\n        <div class=\"jpicker-calendar-row\">\r\n            {{#.}}\r\n                <div class=\"jpicker-calendar-cell {{cellClass}}\" {{#attributes}}{{.}} {{/attributes}}>\r\n                    <div class=\"jpicker-calendar-cell-content\">\r\n                        <div class=\"jpicker-cell-out\">\r\n                            <div class=\"jpicker-cell-in\">{{{content}}}</div>\r\n                        </div>\r\n                    </div>\r\n                </div>\r\n            {{/.}}\r\n        </div>\r\n    {{/calendar}}\r\n</div>\r\n", H);return T.render.apply(T, arguments); };

/***/ }),

/***/ "./src/Components/DayPicker/DayPicker.ts":
/*!***********************************************!*\
  !*** ./src/Components/DayPicker/DayPicker.ts ***!
  \***********************************************/
/*! exports provided: DayPicker */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DayPicker", function() { return DayPicker; });
/* harmony import */ var _Picker__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Picker */ "./src/Components/Picker.ts");
/* harmony import */ var _Classes_JPickerConfig__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../Classes/JPickerConfig */ "./src/Classes/JPickerConfig.ts");
/* harmony import */ var _Classes_EventsDict__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../Classes/EventsDict */ "./src/Classes/EventsDict.ts");
/* harmony import */ var _Classes_Event__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../Classes/Event */ "./src/Classes/Event.ts");
/* harmony import */ var _Classes_Tools__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../Classes/Tools */ "./src/Classes/Tools.ts");
/* harmony import */ var _Classes_DOM__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../Classes/DOM */ "./src/Classes/DOM.ts");
/* harmony import */ var _CalendarCell__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./CalendarCell */ "./src/Components/DayPicker/CalendarCell.ts");
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();







var DayPicker = /** @class */ (function (_super) {
    __extends(DayPicker, _super);
    function DayPicker(month, year) {
        var _this = _super.call(this) || this;
        _this.selectedDays = [];
        _this.dayWithMouse = null;
        _this.month = month;
        _this.year = year;
        return _this;
    }
    DayPicker.prototype.setMonth = function (month) {
        this.month = month;
        return this;
    };
    DayPicker.prototype.setYear = function (year) {
        this.year = year;
        return this;
    };
    DayPicker.prototype.setSelectedDay = function (Day, whichDay) {
        if (whichDay === void 0) { whichDay = 0; }
        if (Day === null) {
            this.selectedDays.splice(whichDay, 1);
        }
        else {
            this.selectedDays[whichDay] = Day;
        }
        return this;
    };
    DayPicker.prototype.setDayWithMouseEnter = function (dayWithMouse) {
        this.dayWithMouse = dayWithMouse;
        return this;
    };
    DayPicker.prototype.refreshSelectedDays = function () {
        var HTMLElement = this.getHTMLElement(), classForDay = '';
        (new _Classes_DOM__WEBPACK_IMPORTED_MODULE_5__["DOM"]('.jpicker-selected-range-day', HTMLElement)).removeClass('jpicker-selected-range-day');
        (new _Classes_DOM__WEBPACK_IMPORTED_MODULE_5__["DOM"]('.jpicker-selected-day', HTMLElement)).removeClass('jpicker-selected-day');
        //@todo optimize!
        for (var day = 1; day <= 31; day++) {
            classForDay = this.getClassForSelectedDays(day);
            if (classForDay.length > 0) {
                (new _Classes_DOM__WEBPACK_IMPORTED_MODULE_5__["DOM"]('[data-day="' + day + '"]', HTMLElement)).addClass(classForDay);
            }
        }
        return this;
    };
    DayPicker.prototype.getMonthSet = function () {
        return [].concat([this.getLabelsRow()], this.getMonthCells());
    };
    DayPicker.prototype.getFirstWeekDay = function () {
        return (new Date(this.year, this.month - 1, 1)).getDay();
    };
    DayPicker.prototype.getDaysInMonth = function () {
        var _31 = [1, 3, 5, 7, 8, 10, 12];
        if (this.month === 2) {
            return (this.year % 4) === 0 ? 29 : 28;
        }
        return _31.indexOf(this.month) > -1 ? 31 : 30;
    };
    DayPicker.prototype.getEvents = function () {
        return [
            this.getEventObject('.jpicker-calendar-cell.av', 'click', this.onDayClick(this)),
            this.getEventObject('.jpicker-calendar-cell.av', 'mouseenter', this.onDayMouseEnter(this)),
            this.getEventObject('.jpicker-calendar-cell.av', 'mouseleave', this.onDayMouseLeave(this))
        ];
    };
    DayPicker.prototype.onDayClick = function (that) {
        return function (EventData) {
            var day = this.getAttribute('data-day'), dayConverted = _Classes_Tools__WEBPACK_IMPORTED_MODULE_4__["Tools"].int(day);
            _Classes_Event__WEBPACK_IMPORTED_MODULE_3__["Event"].get().trigger(_Classes_EventsDict__WEBPACK_IMPORTED_MODULE_2__["DAY_CLICK"], dayConverted, [dayConverted, that.month, that.year]);
        };
    };
    DayPicker.prototype.onDayMouseEnter = function (that) {
        return function (EventData) {
            var day = this.getAttribute('data-day'), dayConverted = _Classes_Tools__WEBPACK_IMPORTED_MODULE_4__["Tools"].int(day);
            _Classes_Event__WEBPACK_IMPORTED_MODULE_3__["Event"].get().trigger(_Classes_EventsDict__WEBPACK_IMPORTED_MODULE_2__["DAY_MOUSE_ENTER"], dayConverted, [dayConverted, that.month, that.year]);
        };
    };
    DayPicker.prototype.onDayMouseLeave = function (that) {
        return function (EventData) {
            var day = this.getAttribute('data-day'), dayConverted = _Classes_Tools__WEBPACK_IMPORTED_MODULE_4__["Tools"].int(day);
            _Classes_Event__WEBPACK_IMPORTED_MODULE_3__["Event"].get().trigger(_Classes_EventsDict__WEBPACK_IMPORTED_MODULE_2__["DAY_MOUSE_LEAVE"], dayConverted, [dayConverted, that.month, that.year]);
        };
    };
    DayPicker.prototype.getMustacheVars = function () {
        return {
            calendar: this.getMonthSet()
        };
    };
    DayPicker.prototype.getMustache = function () {
        return __webpack_require__(/*! ./DayPicker.mustache */ "./src/Components/DayPicker/DayPicker.mustache");
    };
    DayPicker.prototype.isToday = function (dayNb) {
        var today = _Classes_JPickerConfig__WEBPACK_IMPORTED_MODULE_1__["JPickerConfig"].get().getToday(), processingDay = new Date(this.year, this.month - 1, dayNb);
        return today.getDate() === processingDay.getDate()
            && today.getMonth() === processingDay.getMonth()
            && today.getFullYear() === processingDay.getFullYear();
    };
    DayPicker.prototype.getMonthCells = function () {
        var flag = true, firstIteration = true, firstDay = this.getFirstWeekDay(), daysCount = this.getDaysInMonth(), isRange = _Classes_JPickerConfig__WEBPACK_IMPORTED_MODULE_1__["JPickerConfig"].get().isRange(), result = [], _day = 0, counter;
        if (firstDay === 0) {
            firstDay = 7;
        }
        while (flag) {
            var week = [];
            for (counter = 1; counter <= 7; counter++) {
                var CalendarCellI = new _CalendarCell__WEBPACK_IMPORTED_MODULE_6__["CalendarCell"];
                if (firstIteration && counter < firstDay) {
                    CalendarCellI.setClass('empty');
                    _day = 0;
                }
                else if (_day < daysCount && flag) {
                    _day++;
                    CalendarCellI
                        .addClass('av')
                        .addClass(this.getClassForSelectedDays(_day))
                        .addAttribute('day', _day);
                    if (_day === daysCount && counter === 7) {
                        flag = false;
                    }
                }
                else {
                    CalendarCellI.setClass('empty');
                    _day = 0;
                    flag = false;
                }
                if (this.isToday(_day)) {
                    CalendarCellI.addClass('today');
                }
                if (_day > 0) {
                    CalendarCellI.setContentDay(_day);
                }
                week.push(CalendarCellI);
            }
            firstIteration = false;
            result.push(week);
        }
        return result;
    };
    DayPicker.prototype.getClassForSelectedDays = function (day) {
        var _this = this;
        var checkingDayTime = (new Date(this.year, this.month - 1, day)).getTime(), selectedTimes = [], result = '', min, max, maxIndex;
        this.selectedDays.forEach(function (DayDate) {
            var selectedDay = DayDate.getDate(), month = DayDate.getMonth() + 1, year = DayDate.getFullYear();
            selectedTimes.push(DayDate.getTime());
            if (selectedDay === day && month === _this.month && year === _this.year) {
                result = 'jpicker-selected-day';
            }
        });
        if (result.length === 0) {
            if (selectedTimes.length < 2 && this.dayWithMouse !== null) {
                selectedTimes.push(this.dayWithMouse.getTime());
            }
            selectedTimes.sort();
            maxIndex = selectedTimes.length - 1;
            min = _Classes_Tools__WEBPACK_IMPORTED_MODULE_4__["Tools"].d(selectedTimes[0]) ? selectedTimes[0] : null;
            max = _Classes_Tools__WEBPACK_IMPORTED_MODULE_4__["Tools"].d(selectedTimes[maxIndex]) ? selectedTimes[maxIndex] : null;
            if (min !== null && max !== null && min < checkingDayTime && checkingDayTime < max) {
                result = 'jpicker-selected-range-day';
            }
        }
        return result;
    };
    DayPicker.prototype.getLabelsRow = function () {
        var result = [];
        _Classes_JPickerConfig__WEBPACK_IMPORTED_MODULE_1__["JPickerConfig"].get().getWeeksDays().forEach(function (day) {
            result.push((new _CalendarCell__WEBPACK_IMPORTED_MODULE_6__["CalendarCell"]).setContent(day).setClass('jpicker-label'));
        });
        return result;
    };
    return DayPicker;
}(_Picker__WEBPACK_IMPORTED_MODULE_0__["Picker"]));



/***/ }),

/***/ "./src/Components/HTMLBuilder.ts":
/*!***************************************!*\
  !*** ./src/Components/HTMLBuilder.ts ***!
  \***************************************/
/*! exports provided: HTMLBuilder */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "HTMLBuilder", function() { return HTMLBuilder; });
var HTMLBuilder = /** @class */ (function () {
    function HTMLBuilder() {
        this.HTMLElement = null;
        this.mustacheVars = {};
        this.events = [];
    }
    HTMLBuilder.prototype.getHTMLElement = function () {
        if (this.HTMLElement === null) {
            this.prepareElement();
        }
        this.prepareEvents();
        return this.HTMLElement;
    };
    HTMLBuilder.prototype.setMustachePath = function (mustachePath) {
        this.mustachePath = mustachePath;
        return this;
    };
    HTMLBuilder.prototype.setMustacheVars = function (mustacheVars) {
        this.mustacheVars = mustacheVars;
        return this;
    };
    HTMLBuilder.prototype.addEvent = function (selector, type, callback) {
        return this.addEventObject({
            selector: selector,
            type: type,
            callback: callback
        });
    };
    HTMLBuilder.prototype.addEventObject = function (event) {
        this.events.push(event);
        return this;
    };
    HTMLBuilder.prototype.setEvents = function (events) {
        this.events = events;
        return this;
    };
    HTMLBuilder.prototype.setMustache = function (requireCallback) {
        this.mustacheRequireCallback = requireCallback;
        return this;
    };
    HTMLBuilder.prototype.prepareElement = function () {
        var parent = document.createElement('div');
        parent.innerHTML = this.getHTMLFromMustache();
        this.HTMLElement = parent.firstChild;
        return this;
    };
    HTMLBuilder.prototype.prepareEvents = function () {
        var _this = this;
        this.events.forEach(function (event) {
            var elements;
            if (event.selector === 'this') {
                elements = [_this.HTMLElement];
            }
            else {
                elements = _this.HTMLElement.querySelectorAll(event.selector);
            }
            elements.forEach(function (Element) {
                Element.addEventListener(event.type, event.callback);
            });
        });
        this.events = [];
        return this;
    };
    HTMLBuilder.prototype.getHTMLFromMustache = function () {
        return this.mustacheRequireCallback(this.mustacheVars);
    };
    return HTMLBuilder;
}());



/***/ }),

/***/ "./src/Components/Header/Header.mustache":
/*!***********************************************!*\
  !*** ./src/Components/Header/Header.mustache ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var H = __webpack_require__(/*! hogan.js */ "./node_modules/hogan.js/lib/hogan.js");
module.exports = function() { var T = new H.Template({code: function (c,p,i) { var t=this;t.b(i=i||"");t.b("<div class=\"jpicker-header-wrapper\">\r");t.b("\n" + i);t.b("    <div class=\"jpicker-title\">");t.b(t.v(t.f("title",c,p,0)));t.b("</div>\r");t.b("\n" + i);t.b("    <div class=\"jpicker-description\">");t.b(t.v(t.f("description",c,p,0)));t.b("</div>\r");t.b("\n" + i);t.b("</div>\r");t.b("\n");return t.fl(); },partials: {}, subs: {  }}, "<div class=\"jpicker-header-wrapper\">\r\n    <div class=\"jpicker-title\">{{title}}</div>\r\n    <div class=\"jpicker-description\">{{description}}</div>\r\n</div>\r\n", H);return T.render.apply(T, arguments); };

/***/ }),

/***/ "./src/Components/Header/Header.ts":
/*!*****************************************!*\
  !*** ./src/Components/Header/Header.ts ***!
  \*****************************************/
/*! exports provided: Header */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Header", function() { return Header; });
/* harmony import */ var _Component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Component */ "./src/Components/Component.ts");
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();

var Header = /** @class */ (function (_super) {
    __extends(Header, _super);
    function Header(title, description) {
        if (title === void 0) { title = ''; }
        if (description === void 0) { description = ''; }
        var _this = _super.call(this) || this;
        _this.title = title;
        _this.description = description;
        return _this;
    }
    Header.prototype.getMustacheVars = function () {
        return {
            title: this.title,
            description: this.description
        };
    };
    Header.prototype.getMustache = function () {
        return __webpack_require__(/*! ./Header.mustache */ "./src/Components/Header/Header.mustache");
    };
    return Header;
}(_Component__WEBPACK_IMPORTED_MODULE_0__["Component"]));



/***/ }),

/***/ "./src/Components/JPicker/JPicker.mustache":
/*!*************************************************!*\
  !*** ./src/Components/JPicker/JPicker.mustache ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var H = __webpack_require__(/*! hogan.js */ "./node_modules/hogan.js/lib/hogan.js");
module.exports = function() { var T = new H.Template({code: function (c,p,i) { var t=this;t.b(i=i||"");t.b("<div class=\"jpicker-wrapper\"></div>\r");t.b("\n");return t.fl(); },partials: {}, subs: {  }}, "<div class=\"jpicker-wrapper\"></div>\r\n", H);return T.render.apply(T, arguments); };

/***/ }),

/***/ "./src/Components/JPicker/JPicker.ts":
/*!*******************************************!*\
  !*** ./src/Components/JPicker/JPicker.ts ***!
  \*******************************************/
/*! exports provided: JPicker */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "JPicker", function() { return JPicker; });
/* harmony import */ var _Classes_DOM__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../Classes/DOM */ "./src/Classes/DOM.ts");
/* harmony import */ var _Classes_JPickerConfig__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../Classes/JPickerConfig */ "./src/Classes/JPickerConfig.ts");
/* harmony import */ var _Component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../Component */ "./src/Components/Component.ts");
/* harmony import */ var _Classes_Event__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../Classes/Event */ "./src/Classes/Event.ts");
/* harmony import */ var _JPickerBuilder__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./JPickerBuilder */ "./src/Components/JPicker/JPickerBuilder.ts");
/* harmony import */ var _JPickerEvents__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./JPickerEvents */ "./src/Components/JPicker/JPickerEvents.ts");
/* harmony import */ var _JPickerChanger__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./JPickerChanger */ "./src/Components/JPicker/JPickerChanger.ts");
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();







var JPicker = /** @class */ (function (_super) {
    __extends(JPicker, _super);
    function JPicker(config) {
        if (config === void 0) { config = null; }
        var _this = _super.call(this) || this;
        _Classes_JPickerConfig__WEBPACK_IMPORTED_MODULE_1__["JPickerConfig"].get().setConfig(config);
        _Classes_Event__WEBPACK_IMPORTED_MODULE_3__["Event"].get().setJPicker(_this);
        _this.JPickerBuilderI = new _JPickerBuilder__WEBPACK_IMPORTED_MODULE_4__["JPickerBuilder"](_this);
        _this.JPickerEventsI = new _JPickerEvents__WEBPACK_IMPORTED_MODULE_5__["JPickerEvents"](_this);
        _this.JPickerChangerI = new _JPickerChanger__WEBPACK_IMPORTED_MODULE_6__["JPickerChanger"](_this);
        _this.run();
        return _this;
    }
    JPicker.prototype.getBuilder = function () {
        return this.JPickerBuilderI;
    };
    JPicker.prototype.getCurrentValue = function () {
        return this.currentValue;
    };
    JPicker.prototype.setCurrentValue = function (currentValue) {
        this.currentValue = currentValue;
        return this;
    };
    JPicker.prototype.getVisibleDate = function () {
        return this.visibleDate;
    };
    JPicker.prototype.setVisibleDate = function (visibleDate) {
        this.visibleDate = visibleDate;
        return this;
    };
    JPicker.prototype.changeDate = function () {
    };
    JPicker.prototype.run = function () {
        var Wrapper = new _Classes_DOM__WEBPACK_IMPORTED_MODULE_0__["DOM"](_Classes_JPickerConfig__WEBPACK_IMPORTED_MODULE_1__["JPickerConfig"].get().getWrapper());
        this.JPickerBuilderI.buildHTML();
        this.JPickerEventsI.createEvents();
        Wrapper.get().appendChild(this.getHTMLElement());
    };
    JPicker.prototype.getMustache = function () {
        return __webpack_require__(/*! ./JPicker.mustache */ "./src/Components/JPicker/JPicker.mustache");
    };
    return JPicker;
}(_Component__WEBPACK_IMPORTED_MODULE_2__["Component"]));



/***/ }),

/***/ "./src/Components/JPicker/JPickerBuilder.ts":
/*!**************************************************!*\
  !*** ./src/Components/JPicker/JPickerBuilder.ts ***!
  \**************************************************/
/*! exports provided: JPickerBuilder */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "JPickerBuilder", function() { return JPickerBuilder; });
/* harmony import */ var _Header_Header__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Header/Header */ "./src/Components/Header/Header.ts");
/* harmony import */ var _Menu_Menu__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../Menu/Menu */ "./src/Components/Menu/Menu.ts");
/* harmony import */ var _DayPicker_DayPicker__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../DayPicker/DayPicker */ "./src/Components/DayPicker/DayPicker.ts");
/* harmony import */ var _MonthPicker_MonthPicker__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../MonthPicker/MonthPicker */ "./src/Components/MonthPicker/MonthPicker.ts");
/* harmony import */ var _YearPicker_YearPicker__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../YearPicker/YearPicker */ "./src/Components/YearPicker/YearPicker.ts");
/* harmony import */ var _Value_Value__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../Value/Value */ "./src/Components/Value/Value.ts");
/* harmony import */ var _JPickerHelper__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./JPickerHelper */ "./src/Components/JPicker/JPickerHelper.ts");
/* harmony import */ var _Classes_Tools__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../Classes/Tools */ "./src/Classes/Tools.ts");
/* harmony import */ var _Ranges_Ranges__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../Ranges/Ranges */ "./src/Components/Ranges/Ranges.ts");
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();









var JPickerBuilder = /** @class */ (function (_super) {
    __extends(JPickerBuilder, _super);
    function JPickerBuilder() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    JPickerBuilder.prototype.buildHTML = function () {
        var JPickerHTML = this.JPickerI.getHTMLElement();
        this
            .prepareHeader()
            .prepareValue()
            .prepareMenu()
            .prepareDayPicker()
            .prepareMonthPicker()
            .prepareYearPicker()
            .prepareRanges();
        JPickerHTML.appendChild(this.HeaderI.getHTMLElement());
        JPickerHTML.appendChild(this.ValueI.getHTMLElement());
        JPickerHTML.appendChild(this.MenuI.getHTMLElement());
        JPickerHTML.appendChild(this.DayPickerI.getHTMLElement());
        if (this.JPickerConfigI.showRangesPredefined()) {
            JPickerHTML.appendChild(this.RangesI.getHTMLElement());
        }
        //JPickerHTML.appendChild(this.MonthPickerI.getHTMLElement());
        return this;
    };
    JPickerBuilder.prototype.getHeader = function () {
        return this.HeaderI;
    };
    JPickerBuilder.prototype.getValue = function () {
        return this.ValueI;
    };
    JPickerBuilder.prototype.getMenu = function () {
        return this.MenuI;
    };
    JPickerBuilder.prototype.setDayPicker = function (DayPickerI) {
        this.DayPickerI = DayPickerI;
        return this;
    };
    JPickerBuilder.prototype.getDayPicker = function () {
        return this.DayPickerI;
    };
    JPickerBuilder.prototype.getMonthPicker = function () {
        return this.MonthPickerI;
    };
    JPickerBuilder.prototype.getYearPicker = function () {
        return this.YearPickerI;
    };
    JPickerBuilder.prototype.getRanges = function () {
        return this.RangesI;
    };
    JPickerBuilder.prototype.prepareHeader = function () {
        var title = this.JPickerConfigI.getTextValue('title'), description = this.JPickerConfigI.getTextValue('description');
        this.HeaderI = new _Header_Header__WEBPACK_IMPORTED_MODULE_0__["Header"](title, description);
        return this;
    };
    JPickerBuilder.prototype.prepareValue = function () {
        var currentValue = this.JPickerConfigI.getCurrentValue();
        this.JPickerI.setCurrentValue(currentValue);
        this.ValueI = new _Value_Value__WEBPACK_IMPORTED_MODULE_5__["Value"](currentValue[0], currentValue[1] || null);
        return this;
    };
    JPickerBuilder.prototype.prepareMenu = function () {
        var currentDate = this.JPickerConfigI.getCurrentValue()[0];
        this.MenuI = new _Menu_Menu__WEBPACK_IMPORTED_MODULE_1__["Menu"](currentDate.getMonth() + 1, currentDate.getFullYear());
        return this;
    };
    JPickerBuilder.prototype.prepareDayPicker = function () {
        var currentValues = this.JPickerConfigI.getCurrentValue(), currentDate = currentValues[0], m = currentDate.getMonth() + 1, y = currentDate.getFullYear();
        this.JPickerI.setVisibleDate([m, y]);
        this.DayPickerI = new _DayPicker_DayPicker__WEBPACK_IMPORTED_MODULE_2__["DayPicker"](m, y);
        this.DayPickerI.setSelectedDay(currentDate, 0);
        if (_Classes_Tools__WEBPACK_IMPORTED_MODULE_7__["Tools"].d(currentValues[1])) {
            this.DayPickerI.setSelectedDay(currentValues[1], 1);
        }
        return this;
    };
    JPickerBuilder.prototype.prepareMonthPicker = function () {
        var currentDate = this.JPickerConfigI.getCurrentValue()[0];
        this.MonthPickerI = new _MonthPicker_MonthPicker__WEBPACK_IMPORTED_MODULE_3__["MonthPicker"](currentDate.getMonth() + 1);
        return this;
    };
    JPickerBuilder.prototype.prepareYearPicker = function () {
        var currentDate = this.JPickerConfigI.getCurrentValue()[0];
        this.YearPickerI = new _YearPicker_YearPicker__WEBPACK_IMPORTED_MODULE_4__["YearPicker"](currentDate.getFullYear());
        return this;
    };
    JPickerBuilder.prototype.prepareRanges = function () {
        this.RangesI = new _Ranges_Ranges__WEBPACK_IMPORTED_MODULE_8__["Ranges"]();
        return this;
    };
    return JPickerBuilder;
}(_JPickerHelper__WEBPACK_IMPORTED_MODULE_6__["JPickerHelper"]));



/***/ }),

/***/ "./src/Components/JPicker/JPickerChanger.ts":
/*!**************************************************!*\
  !*** ./src/Components/JPicker/JPickerChanger.ts ***!
  \**************************************************/
/*! exports provided: JPickerChanger */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "JPickerChanger", function() { return JPickerChanger; });
/* harmony import */ var _JPickerHelper__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./JPickerHelper */ "./src/Components/JPicker/JPickerHelper.ts");
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();

var JPickerChanger = /** @class */ (function (_super) {
    __extends(JPickerChanger, _super);
    function JPickerChanger() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return JPickerChanger;
}(_JPickerHelper__WEBPACK_IMPORTED_MODULE_0__["JPickerHelper"]));



/***/ }),

/***/ "./src/Components/JPicker/JPickerEvents.ts":
/*!*************************************************!*\
  !*** ./src/Components/JPicker/JPickerEvents.ts ***!
  \*************************************************/
/*! exports provided: JPickerEvents */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "JPickerEvents", function() { return JPickerEvents; });
/* harmony import */ var _Classes_Event__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../Classes/Event */ "./src/Classes/Event.ts");
/* harmony import */ var _Classes_EventsDict__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../Classes/EventsDict */ "./src/Classes/EventsDict.ts");
/* harmony import */ var _Classes_Tools__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../Classes/Tools */ "./src/Classes/Tools.ts");
/* harmony import */ var _JPickerHelper__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./JPickerHelper */ "./src/Components/JPicker/JPickerHelper.ts");
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();




var JPickerEvents = /** @class */ (function (_super) {
    __extends(JPickerEvents, _super);
    function JPickerEvents() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.daysSelected = 0;
        return _this;
    }
    JPickerEvents.prototype.createEvents = function () {
        return this
            .addListeners(this.getDefaultEvents())
            .addListeners(this.JPickerConfigI.getObjectValue('events'));
    };
    JPickerEvents.prototype.nextMonthClick = function () {
        return this.changeMonth(true);
    };
    JPickerEvents.prototype.prevMonthClick = function () {
        return this.changeMonth(false);
    };
    JPickerEvents.prototype.getDefaultEvents = function () {
        var result = {}, that = this;
        [
            [_Classes_EventsDict__WEBPACK_IMPORTED_MODULE_1__["NEXT_MONTH_CLICK"], this.nextMonthClick],
            [_Classes_EventsDict__WEBPACK_IMPORTED_MODULE_1__["PREV_MONTH_CLICK"], this.prevMonthClick],
            [_Classes_EventsDict__WEBPACK_IMPORTED_MODULE_1__["DAY_CLICK"], this.dayClick],
            [_Classes_EventsDict__WEBPACK_IMPORTED_MODULE_1__["DAY_MOUSE_ENTER"], this.dayMouseEnter],
            [_Classes_EventsDict__WEBPACK_IMPORTED_MODULE_1__["DAY_MOUSE_LEAVE"], this.dayMouseLeave],
            [_Classes_EventsDict__WEBPACK_IMPORTED_MODULE_1__["RANGE_CLICK"], this.rangeClick],
            [_Classes_EventsDict__WEBPACK_IMPORTED_MODULE_1__["VALUE_CLICK"], this.valueClick],
        ].forEach(function (eventArray) {
            result[eventArray[0].toString()] = function () {
                eventArray[1].apply(that, arguments);
            };
        });
        return result;
    };
    JPickerEvents.prototype.addListeners = function (events) {
        for (var eventName in events) {
            if (_Classes_Tools__WEBPACK_IMPORTED_MODULE_2__["Tools"].isFunction(events[eventName])) {
                _Classes_Event__WEBPACK_IMPORTED_MODULE_0__["Event"].get().addListener(eventName, events[eventName]);
            }
        }
        return this;
    };
    JPickerEvents.prototype.dayClick = function (day, date) {
        var DateI = new Date(date[2], date[1] - 1, date[0]);
        if (this.JPickerConfigI.isRange()) {
            if ((this.daysSelected % 2) === 0) {
                this.dateOneTmp = DateI;
                this.dateTwoTmp = null;
                this.JPickerI.getBuilder().getValue().setDateOne(DateI).setDateTwoOpacity(true).refresh();
                this.JPickerI.getBuilder()
                    .getDayPicker()
                    .setSelectedDay(DateI, 0)
                    .setSelectedDay(null, 1)
                    .refreshSelectedDays();
            }
            else {
                this.dateTwoTmp = new Date(DateI.getTime() + (24 * 3600 * 1000) - 1);
                this.setRange();
            }
            this.daysSelected++;
        }
        else {
            this.JPickerI.setCurrentValue([DateI]);
            this.JPickerI.getBuilder().getValue().setDateOne(DateI).refresh();
            this.JPickerI.getBuilder().getDayPicker().setSelectedDay(DateI, 0).refreshSelectedDays();
        }
        return this;
    };
    JPickerEvents.prototype.setRange = function () {
        var time1 = this.dateOneTmp.getTime(), time2 = this.dateTwoTmp.getTime(), ValueI = this.JPickerI.getBuilder().getValue(), DayPickerI = this.JPickerI.getBuilder().getDayPicker(), DateTmp;
        if (time1 > time2) {
            DateTmp = this.dateOneTmp;
            this.dateOneTmp = this.dateTwoTmp;
            this.dateTwoTmp = DateTmp;
        }
        ValueI.setDateOne(this.dateOneTmp);
        DayPickerI.setSelectedDay(this.dateOneTmp, 0);
        this.JPickerI.setCurrentValue([this.dateOneTmp, this.dateTwoTmp]);
        ValueI.setDateTwo(this.dateTwoTmp).setDateTwoOpacity(false).refresh();
        DayPickerI.setSelectedDay(this.dateTwoTmp, 1).refreshSelectedDays();
        return this;
    };
    JPickerEvents.prototype.dayMouseEnter = function (day, date) {
        if (this.JPickerConfigI.isRange() && this.dateTwoTmp === null) {
            var DateI = new Date(date[2], date[1] - 1, date[0]);
            this.JPickerI.getBuilder().getDayPicker().setDayWithMouseEnter(DateI).refreshSelectedDays();
        }
        return this;
    };
    JPickerEvents.prototype.dayMouseLeave = function (day, date) {
        if (this.JPickerConfigI.isRange() && this.dateTwoTmp === null) {
            this.JPickerI.getBuilder().getDayPicker().setDayWithMouseEnter(null).refreshSelectedDays();
        }
        return this;
    };
    JPickerEvents.prototype.rangeClick = function (FromDate, ToDate) {
        var visibleDate = this.JPickerI.getVisibleDate(), month = FromDate.getMonth() + 1, year = FromDate.getFullYear();
        this.dateOneTmp = FromDate;
        this.dateTwoTmp = ToDate;
        this.setRange();
        if (month !== visibleDate[0] || year !== visibleDate[1]) {
            this.setMonthAndYear(month, year);
        }
        return this;
    };
    JPickerEvents.prototype.valueClick = function (ValueDate) {
        var visibleDate = this.JPickerI.getVisibleDate(), month = ValueDate.getMonth() + 1, year = ValueDate.getFullYear();
        if (month !== visibleDate[0] || year !== visibleDate[1]) {
            this.setMonthAndYear(month, year);
        }
        return this;
    };
    JPickerEvents.prototype.changeMonth = function (increment) {
        var visibleDate = this.JPickerI.getVisibleDate(), month = visibleDate[0], year = visibleDate[1];
        month += (increment ? 1 : -1);
        if (month > 12) {
            month = 1;
            year++;
        }
        if (month < 1) {
            month = 12;
            year--;
        }
        return this.setMonthAndYear(month, year);
    };
    JPickerEvents.prototype.setMonthAndYear = function (month, year) {
        var DayPickerI = this.JPickerI.getBuilder().getDayPicker(), currentWrapper = this.JPickerI.getHTMLElement().querySelector('.jpicker-days-wrapper');
        DayPickerI.setMonth(month).setYear(year).refreshHTMLElement();
        DayPickerI.refreshSelectedDays();
        currentWrapper.replaceWith(DayPickerI.getHTMLElement());
        this.JPickerI.getBuilder().getMenu().setValues(month, year);
        this.JPickerI.setVisibleDate([month, year]);
        return this;
    };
    return JPickerEvents;
}(_JPickerHelper__WEBPACK_IMPORTED_MODULE_3__["JPickerHelper"]));



/***/ }),

/***/ "./src/Components/JPicker/JPickerHelper.ts":
/*!*************************************************!*\
  !*** ./src/Components/JPicker/JPickerHelper.ts ***!
  \*************************************************/
/*! exports provided: JPickerHelper */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "JPickerHelper", function() { return JPickerHelper; });
/* harmony import */ var _Classes_JPickerConfig__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../Classes/JPickerConfig */ "./src/Classes/JPickerConfig.ts");

var JPickerHelper = /** @class */ (function () {
    function JPickerHelper(JPickerI) {
        this.JPickerI = JPickerI;
        this.JPickerConfigI = _Classes_JPickerConfig__WEBPACK_IMPORTED_MODULE_0__["JPickerConfig"].get();
    }
    return JPickerHelper;
}());



/***/ }),

/***/ "./src/Components/List/List.mustache":
/*!*******************************************!*\
  !*** ./src/Components/List/List.mustache ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var H = __webpack_require__(/*! hogan.js */ "./node_modules/hogan.js/lib/hogan.js");
module.exports = function() { var T = new H.Template({code: function (c,p,i) { var t=this;t.b(i=i||"");t.b("<div class=\"jpicker-list-wrapper ");t.b(t.v(t.f("wrapperClass",c,p,0)));t.b("\">\r");t.b("\n" + i);t.b("    <div class=\"jpicker-list\">\r");t.b("\n" + i);if(t.s(t.f("elements",c,p,1),c,p,0,106,235,"{{ }}")){t.rs(c,p,function(c,p,t){t.b("            <div class=\"jpicker-element ");if(t.s(t.f("selected",c,p,1),c,p,0,161,177,"{{ }}")){t.rs(c,p,function(c,p,t){t.b("jpicker-selected");});c.pop();}t.b("\" data-key=\"");t.b(t.v(t.f("key",c,p,0)));t.b("\">");t.b(t.v(t.f("name",c,p,0)));t.b("</div>\r");t.b("\n" + i);});c.pop();}t.b("    </div>\r");t.b("\n" + i);t.b("</div>\r");t.b("\n");return t.fl(); },partials: {}, subs: {  }}, "<div class=\"jpicker-list-wrapper {{wrapperClass}}\">\r\n    <div class=\"jpicker-list\">\r\n        {{#elements}}\r\n            <div class=\"jpicker-element {{#selected}}jpicker-selected{{/selected}}\" data-key=\"{{key}}\">{{name}}</div>\r\n        {{/elements}}\r\n    </div>\r\n</div>\r\n", H);return T.render.apply(T, arguments); };

/***/ }),

/***/ "./src/Components/Menu/Menu.mustache":
/*!*******************************************!*\
  !*** ./src/Components/Menu/Menu.mustache ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var H = __webpack_require__(/*! hogan.js */ "./node_modules/hogan.js/lib/hogan.js");
module.exports = function() { var T = new H.Template({code: function (c,p,i) { var t=this;t.b(i=i||"");t.b("<div class=\"jpicker-menu\">\r");t.b("\n" + i);t.b("    <div class=\"jpicker-arrow-left\"></div>\r");t.b("\n" + i);t.b("    <div class=\"jpicker-menu-month\">\r");t.b("\n" + i);t.b("        ");t.b(t.v(t.f("monthName",c,p,0)));t.b("\r");t.b("\n" + i);t.b("    </div>\r");t.b("\n" + i);t.b("    <div class=\"jpicker-menu-year\">\r");t.b("\n" + i);t.b("        <input type=\"number\" class=\"jpicker-menu-year-value\" value=\"");t.b(t.v(t.f("year",c,p,0)));t.b("\">\r");t.b("\n" + i);t.b("    </div>\r");t.b("\n" + i);t.b("    <div class=\"jpicker-arrow-right\"></div>\r");t.b("\n" + i);t.b("</div>\r");t.b("\n");return t.fl(); },partials: {}, subs: {  }}, "<div class=\"jpicker-menu\">\r\n    <div class=\"jpicker-arrow-left\"></div>\r\n    <div class=\"jpicker-menu-month\">\r\n        {{monthName}}\r\n    </div>\r\n    <div class=\"jpicker-menu-year\">\r\n        <input type=\"number\" class=\"jpicker-menu-year-value\" value=\"{{year}}\">\r\n    </div>\r\n    <div class=\"jpicker-arrow-right\"></div>\r\n</div>\r\n", H);return T.render.apply(T, arguments); };

/***/ }),

/***/ "./src/Components/Menu/Menu.ts":
/*!*************************************!*\
  !*** ./src/Components/Menu/Menu.ts ***!
  \*************************************/
/*! exports provided: Menu */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Menu", function() { return Menu; });
/* harmony import */ var _Component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Component */ "./src/Components/Component.ts");
/* harmony import */ var _Classes_Event__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../Classes/Event */ "./src/Classes/Event.ts");
/* harmony import */ var _Classes_EventsDict__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../Classes/EventsDict */ "./src/Classes/EventsDict.ts");
/* harmony import */ var _Classes_JPickerConfig__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../Classes/JPickerConfig */ "./src/Classes/JPickerConfig.ts");
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();




var Menu = /** @class */ (function (_super) {
    __extends(Menu, _super);
    function Menu(month, year) {
        var _this = _super.call(this) || this;
        _this.month = month;
        _this.year = year;
        return _this;
    }
    Menu.prototype.setValues = function (month, year) {
        if (month === void 0) { month = null; }
        if (year === void 0) { year = null; }
        if (month !== null) {
            this.month = month;
        }
        if (year !== null) {
            this.year = year;
        }
        return this.refresh();
    };
    Menu.prototype.refresh = function () {
        var Wrapper = this.getHTMLElement(), MonthWrapper = Wrapper.querySelector('.jpicker-menu-month'), YearInput = Wrapper.querySelector('.jpicker-menu-year-value');
        MonthWrapper.innerText = this.getMonthName();
        YearInput.value = this.year.toString();
        return this;
    };
    Menu.prototype.getEvents = function () {
        return [
            this.getEventObject('.jpicker-arrow-right', 'click', this.onArrayRightClick),
            this.getEventObject('.jpicker-arrow-left', 'click', this.onArrayLeftClick)
        ];
    };
    Menu.prototype.onArrayRightClick = function () {
        _Classes_Event__WEBPACK_IMPORTED_MODULE_1__["Event"].get().trigger(_Classes_EventsDict__WEBPACK_IMPORTED_MODULE_2__["NEXT_MONTH_CLICK"]);
    };
    Menu.prototype.onArrayLeftClick = function () {
        _Classes_Event__WEBPACK_IMPORTED_MODULE_1__["Event"].get().trigger(_Classes_EventsDict__WEBPACK_IMPORTED_MODULE_2__["PREV_MONTH_CLICK"]);
    };
    Menu.prototype.getMustacheVars = function () {
        return {
            monthName: this.getMonthName(),
            year: this.year
        };
    };
    Menu.prototype.getMonthName = function () {
        return _Classes_JPickerConfig__WEBPACK_IMPORTED_MODULE_3__["JPickerConfig"].get().getMonths()[this.month - 1];
    };
    Menu.prototype.getMustache = function () {
        return __webpack_require__(/*! ./Menu.mustache */ "./src/Components/Menu/Menu.mustache");
    };
    return Menu;
}(_Component__WEBPACK_IMPORTED_MODULE_0__["Component"]));



/***/ }),

/***/ "./src/Components/MonthPicker/MonthPicker.ts":
/*!***************************************************!*\
  !*** ./src/Components/MonthPicker/MonthPicker.ts ***!
  \***************************************************/
/*! exports provided: MonthPicker */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MonthPicker", function() { return MonthPicker; });
/* harmony import */ var _Picker__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Picker */ "./src/Components/Picker.ts");
/* harmony import */ var _Classes_JPickerConfig__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../Classes/JPickerConfig */ "./src/Classes/JPickerConfig.ts");
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();


var MonthPicker = /** @class */ (function (_super) {
    __extends(MonthPicker, _super);
    function MonthPicker(month) {
        var _this = _super.call(this) || this;
        _this.month = month;
        return _this;
    }
    MonthPicker.prototype.getEvents = function () {
        return [
            this.getEventObject('.jpicker-element', 'click', this.onMonthClick)
        ];
    };
    MonthPicker.prototype.onMonthClick = function () {
        console.log(this, arguments);
    };
    MonthPicker.prototype.getMustacheVars = function () {
        return {
            elements: this.getMonths(),
            wrapperClass: 'jpicker-months-wrapper'
        };
    };
    MonthPicker.prototype.getMonths = function () {
        var _this = this;
        var months = _Classes_JPickerConfig__WEBPACK_IMPORTED_MODULE_1__["JPickerConfig"].get().getMonths(), number = 1, result = [];
        months.forEach(function (monthName) {
            result.push({
                key: number,
                name: monthName,
                selected: _this.month === number
            });
            number++;
        });
        return result;
    };
    MonthPicker.prototype.getMustache = function () {
        return __webpack_require__(/*! ../List/List.mustache */ "./src/Components/List/List.mustache");
    };
    return MonthPicker;
}(_Picker__WEBPACK_IMPORTED_MODULE_0__["Picker"]));



/***/ }),

/***/ "./src/Components/Picker.ts":
/*!**********************************!*\
  !*** ./src/Components/Picker.ts ***!
  \**********************************/
/*! exports provided: Picker */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Picker", function() { return Picker; });
/* harmony import */ var _Component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Component */ "./src/Components/Component.ts");
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();

var Picker = /** @class */ (function (_super) {
    __extends(Picker, _super);
    function Picker() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return Picker;
}(_Component__WEBPACK_IMPORTED_MODULE_0__["Component"]));



/***/ }),

/***/ "./src/Components/Ranges/Ranges.mustache":
/*!***********************************************!*\
  !*** ./src/Components/Ranges/Ranges.mustache ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var H = __webpack_require__(/*! hogan.js */ "./node_modules/hogan.js/lib/hogan.js");
module.exports = function() { var T = new H.Template({code: function (c,p,i) { var t=this;t.b(i=i||"");t.b("<div class=\"jpicker-ranges-wrapper\">\r");t.b("\n" + i);t.b("    <div class=\"jpickcer-ranges-title\">");t.b(t.v(t.f("title",c,p,0)));t.b("</div>\r");t.b("\n" + i);t.b("    <div class=\"jpicker-ranges-list\">\r");t.b("\n" + i);if(t.s(t.f("ranges",c,p,1),c,p,0,152,236,"{{ }}")){t.rs(c,p,function(c,p,t){t.b("            <div class=\"jpicker-range\" data-key=\"");t.b(t.v(t.f("id",c,p,0)));t.b("\">");t.b(t.v(t.f("label",c,p,0)));t.b("</div>\r");t.b("\n" + i);});c.pop();}t.b("    </div>\r");t.b("\n" + i);t.b("</div>\r");t.b("\n");return t.fl(); },partials: {}, subs: {  }}, "<div class=\"jpicker-ranges-wrapper\">\r\n    <div class=\"jpickcer-ranges-title\">{{title}}</div>\r\n    <div class=\"jpicker-ranges-list\">\r\n        {{#ranges}}\r\n            <div class=\"jpicker-range\" data-key=\"{{id}}\">{{label}}</div>\r\n        {{/ranges}}\r\n    </div>\r\n</div>\r\n", H);return T.render.apply(T, arguments); };

/***/ }),

/***/ "./src/Components/Ranges/Ranges.ts":
/*!*****************************************!*\
  !*** ./src/Components/Ranges/Ranges.ts ***!
  \*****************************************/
/*! exports provided: Ranges */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Ranges", function() { return Ranges; });
/* harmony import */ var _Component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Component */ "./src/Components/Component.ts");
/* harmony import */ var _Classes_JPickerConfig__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../Classes/JPickerConfig */ "./src/Classes/JPickerConfig.ts");
/* harmony import */ var _Classes_Tools__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../Classes/Tools */ "./src/Classes/Tools.ts");
/* harmony import */ var _Classes_Event__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../Classes/Event */ "./src/Classes/Event.ts");
/* harmony import */ var _Classes_EventsDict__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../Classes/EventsDict */ "./src/Classes/EventsDict.ts");
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();





var Ranges = /** @class */ (function (_super) {
    __extends(Ranges, _super);
    function Ranges() {
        var _this = _super.call(this) || this;
        _this.ranges = _Classes_JPickerConfig__WEBPACK_IMPORTED_MODULE_1__["JPickerConfig"].get().getRangesSet();
        _this.ranges.forEach(function (v, key) {
            v.id = key;
        });
        return _this;
    }
    Ranges.prototype.getEvents = function () {
        return [
            this.getEventObject('.jpicker-range', 'click', this.onRangeClick(this))
        ];
    };
    Ranges.prototype.onRangeClick = function (that) {
        return function () {
            var key = this.getAttribute('data-key'), keyInt = _Classes_Tools__WEBPACK_IMPORTED_MODULE_2__["Tools"].int(key), range = that.ranges[keyInt].range;
            _Classes_Event__WEBPACK_IMPORTED_MODULE_3__["Event"].get().trigger(_Classes_EventsDict__WEBPACK_IMPORTED_MODULE_4__["RANGE_CLICK"], range[0], range[1]);
        };
    };
    Ranges.prototype.getMustacheVars = function () {
        return {
            title: _Classes_JPickerConfig__WEBPACK_IMPORTED_MODULE_1__["JPickerConfig"].get().getRangesTitle(),
            ranges: this.ranges
        };
    };
    Ranges.prototype.getMustache = function () {
        return __webpack_require__(/*! ./Ranges.mustache */ "./src/Components/Ranges/Ranges.mustache");
    };
    return Ranges;
}(_Component__WEBPACK_IMPORTED_MODULE_0__["Component"]));



/***/ }),

/***/ "./src/Components/Value/Value.mustache":
/*!*********************************************!*\
  !*** ./src/Components/Value/Value.mustache ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var H = __webpack_require__(/*! hogan.js */ "./node_modules/hogan.js/lib/hogan.js");
module.exports = function() { var T = new H.Template({code: function (c,p,i) { var t=this;t.b(i=i||"");t.b("<div class=\"jpicker-value-wrapper ");if(t.s(t.f("twoValues",c,p,1),c,p,0,48,66,"{{ }}")){t.rs(c,p,function(c,p,t){t.b("jpicker-two-values");});c.pop();}t.b(" ");if(t.s(t.f("dateOpacity1",c,p,1),c,p,0,98,114,"{{ }}")){t.rs(c,p,function(c,p,t){t.b("date-one-opacity");});c.pop();}t.b(" ");if(t.s(t.f("dateOpacity2",c,p,1),c,p,0,149,165,"{{ }}")){t.rs(c,p,function(c,p,t){t.b("date-two-opacity");});c.pop();}t.b("\">\r");t.b("\n" + i);t.b("    <div class=\"jpicker-value-one\">");t.b(t.v(t.f("dateFormatted1",c,p,0)));t.b("</div>\r");t.b("\n" + i);t.b("    <div class=\"jpicker-value-separator\">-</div>\r");t.b("\n" + i);t.b("    <div class=\"jpicker-value-two\">");t.b(t.v(t.f("dateFormatted2",c,p,0)));t.b("</div>\r");t.b("\n" + i);t.b("</div>\r");t.b("\n");return t.fl(); },partials: {}, subs: {  }}, "<div class=\"jpicker-value-wrapper {{#twoValues}}jpicker-two-values{{/twoValues}} {{#dateOpacity1}}date-one-opacity{{/dateOpacity1}} {{#dateOpacity2}}date-two-opacity{{/dateOpacity2}}\">\r\n    <div class=\"jpicker-value-one\">{{dateFormatted1}}</div>\r\n    <div class=\"jpicker-value-separator\">-</div>\r\n    <div class=\"jpicker-value-two\">{{dateFormatted2}}</div>\r\n</div>\r\n", H);return T.render.apply(T, arguments); };

/***/ }),

/***/ "./src/Components/Value/Value.ts":
/*!***************************************!*\
  !*** ./src/Components/Value/Value.ts ***!
  \***************************************/
/*! exports provided: Value */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Value", function() { return Value; });
/* harmony import */ var _Component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Component */ "./src/Components/Component.ts");
/* harmony import */ var _Classes_DOM__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../Classes/DOM */ "./src/Classes/DOM.ts");
/* harmony import */ var _Classes_Event__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../Classes/Event */ "./src/Classes/Event.ts");
/* harmony import */ var _Classes_EventsDict__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../Classes/EventsDict */ "./src/Classes/EventsDict.ts");
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();




var Value = /** @class */ (function (_super) {
    __extends(Value, _super);
    function Value(date1, date2) {
        if (date1 === void 0) { date1 = null; }
        if (date2 === void 0) { date2 = null; }
        var _this = _super.call(this) || this;
        _this.date1 = null;
        _this.dateOpacity1 = false;
        _this.date2 = null;
        _this.dateOpacity2 = false;
        _this.date1 = date1;
        _this.date2 = date2;
        return _this;
    }
    Value.prototype.setDateOne = function (date1) {
        this.date1 = date1;
        return this;
    };
    Value.prototype.setDateTwo = function (date2) {
        this.date2 = date2;
        return this;
    };
    Value.prototype.setDateOneOpacity = function (dateOpacity1) {
        this.dateOpacity1 = dateOpacity1;
        return this;
    };
    Value.prototype.setDateTwoOpacity = function (dateOpacity2) {
        this.dateOpacity2 = dateOpacity2;
        return this;
    };
    Value.prototype.refresh = function () {
        var HTMLElement = this.getHTMLElement(), DateOneElement = HTMLElement.querySelector('.jpicker-value-one'), opacityClass = 'jpicker-opacity', DateTwoElement;
        DateOneElement.innerText = this.getDateFormatted(this.date1);
        if (this.date2 !== null) {
            DateTwoElement = HTMLElement.querySelector('.jpicker-value-two');
            DateTwoElement.innerText = this.getDateFormatted(this.date2);
        }
        if (this.dateOpacity1) {
            (new _Classes_DOM__WEBPACK_IMPORTED_MODULE_1__["DOM"]('.jpicker-value-one', HTMLElement)).addClass(opacityClass);
        }
        else {
            (new _Classes_DOM__WEBPACK_IMPORTED_MODULE_1__["DOM"]('.jpicker-value-one', HTMLElement)).removeClass(opacityClass);
        }
        if (this.dateOpacity2) {
            (new _Classes_DOM__WEBPACK_IMPORTED_MODULE_1__["DOM"]('.jpicker-value-two', HTMLElement)).addClass(opacityClass);
        }
        else {
            (new _Classes_DOM__WEBPACK_IMPORTED_MODULE_1__["DOM"]('.jpicker-value-two', HTMLElement)).removeClass(opacityClass);
        }
        return this;
    };
    Value.prototype.getDateFormatted = function (date) {
        if (date === null) {
            return '';
        }
        var day = date.getDate(), month = date.getMonth() + 1, year = date.getFullYear();
        return this.getWithZero(day) + '.' + this.getWithZero(month) + '.' + year.toString();
    };
    Value.prototype.getWithZero = function (value) {
        return value < 10 ? '0' + value.toString() : value.toString();
    };
    Value.prototype.getEvents = function () {
        return [
            this.getEventObject('.jpicker-value-one, .jpicker-value-two', 'click', this.onValueClick(this))
        ];
    };
    Value.prototype.onValueClick = function (that) {
        return function () {
            var ValueDate = that.date1, HTMLValueElement = this;
            if (HTMLValueElement.classList.contains('jpicker-opacity')) {
                return;
            }
            if (HTMLValueElement.classList.contains('jpicker-value-two')) {
                ValueDate = that.date2;
            }
            _Classes_Event__WEBPACK_IMPORTED_MODULE_2__["Event"].get().trigger(_Classes_EventsDict__WEBPACK_IMPORTED_MODULE_3__["VALUE_CLICK"], ValueDate);
        };
    };
    Value.prototype.getMustacheVars = function () {
        return {
            dateFormatted1: this.getDateFormatted(this.date1),
            dateFormatted2: this.getDateFormatted(this.date2),
            dateOpacity1: this.dateOpacity1,
            dateOpacity2: this.dateOpacity2,
            twoValues: this.date2 !== null
        };
    };
    Value.prototype.getMustache = function () {
        return __webpack_require__(/*! ./Value.mustache */ "./src/Components/Value/Value.mustache");
    };
    return Value;
}(_Component__WEBPACK_IMPORTED_MODULE_0__["Component"]));



/***/ }),

/***/ "./src/Components/YearPicker/YearPicker.ts":
/*!*************************************************!*\
  !*** ./src/Components/YearPicker/YearPicker.ts ***!
  \*************************************************/
/*! exports provided: YearPicker */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "YearPicker", function() { return YearPicker; });
/* harmony import */ var _Picker__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Picker */ "./src/Components/Picker.ts");
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();

var YearPicker = /** @class */ (function (_super) {
    __extends(YearPicker, _super);
    function YearPicker(year) {
        if (year === void 0) { year = null; }
        var _this = _super.call(this) || this;
        _this.year = year;
        return _this;
    }
    YearPicker.prototype.getEvents = function () {
        return [
            this.getEventObject('.jpicker-element', 'click', this.onYearClick)
        ];
    };
    YearPicker.prototype.onYearClick = function () {
        console.log(this, arguments);
    };
    YearPicker.prototype.getMustacheVars = function () {
        return {
            elements: this.getYears(),
            wrapperClass: 'jpicker-years-wrapper'
        };
    };
    YearPicker.prototype.getYears = function () {
        var currentYear = this.year || this.getCurrentYear(), minYear = currentYear - 7, maxYear = currentYear + 7, result = [];
        for (var year = minYear; year <= maxYear; year++) {
            result.push({
                key: year,
                name: year,
                selected: currentYear === year
            });
        }
        return result;
    };
    YearPicker.prototype.getCurrentYear = function () {
        return (new Date).getFullYear();
    };
    YearPicker.prototype.getMustache = function () {
        return __webpack_require__(/*! ../List/List.mustache */ "./src/Components/List/List.mustache");
    };
    return YearPicker;
}(_Picker__WEBPACK_IMPORTED_MODULE_0__["Picker"]));



/***/ }),

/***/ "./src/JPicker.ts":
/*!************************!*\
  !*** ./src/JPicker.ts ***!
  \************************/
/*! exports provided: JPicker */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Components_JPicker_JPicker__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Components/JPicker/JPicker */ "./src/Components/JPicker/JPicker.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "JPicker", function() { return _Components_JPicker_JPicker__WEBPACK_IMPORTED_MODULE_0__["JPicker"]; });




/***/ })

/******/ })["JPicker"];
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9KUGlja2VyL3dlYnBhY2svdW5pdmVyc2FsTW9kdWxlRGVmaW5pdGlvbiIsIndlYnBhY2s6Ly9KUGlja2VyL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL0pQaWNrZXIvLi9ub2RlX21vZHVsZXMvaG9nYW4uanMvbGliL2NvbXBpbGVyLmpzIiwid2VicGFjazovL0pQaWNrZXIvLi9ub2RlX21vZHVsZXMvaG9nYW4uanMvbGliL2hvZ2FuLmpzIiwid2VicGFjazovL0pQaWNrZXIvLi9ub2RlX21vZHVsZXMvaG9nYW4uanMvbGliL3RlbXBsYXRlLmpzIiwid2VicGFjazovL0pQaWNrZXIvLi9zcmMvQ2xhc3Nlcy9ET00udHMiLCJ3ZWJwYWNrOi8vSlBpY2tlci8uL3NyYy9DbGFzc2VzL0V2ZW50LnRzIiwid2VicGFjazovL0pQaWNrZXIvLi9zcmMvQ2xhc3Nlcy9FdmVudENhbGxiYWNrLnRzIiwid2VicGFjazovL0pQaWNrZXIvLi9zcmMvQ2xhc3Nlcy9FdmVudHNEaWN0LnRzIiwid2VicGFjazovL0pQaWNrZXIvLi9zcmMvQ2xhc3Nlcy9KUGlja2VyQ29uZmlnLnRzIiwid2VicGFjazovL0pQaWNrZXIvLi9zcmMvQ2xhc3Nlcy9KUGlja2VyUmFuZ2VzQ29uZmlnLnRzIiwid2VicGFjazovL0pQaWNrZXIvLi9zcmMvQ2xhc3Nlcy9Ub29scy50cyIsIndlYnBhY2s6Ly9KUGlja2VyLy4vc3JjL0NvbXBvbmVudHMvQ29tcG9uZW50LnRzIiwid2VicGFjazovL0pQaWNrZXIvLi9zcmMvQ29tcG9uZW50cy9EYXlQaWNrZXIvQ2FsZW5kYXJDZWxsLnRzIiwid2VicGFjazovL0pQaWNrZXIvLi9zcmMvQ29tcG9uZW50cy9EYXlQaWNrZXIvRGF5UGlja2VyLm11c3RhY2hlIiwid2VicGFjazovL0pQaWNrZXIvLi9zcmMvQ29tcG9uZW50cy9EYXlQaWNrZXIvRGF5UGlja2VyLnRzIiwid2VicGFjazovL0pQaWNrZXIvLi9zcmMvQ29tcG9uZW50cy9IVE1MQnVpbGRlci50cyIsIndlYnBhY2s6Ly9KUGlja2VyLy4vc3JjL0NvbXBvbmVudHMvSGVhZGVyL0hlYWRlci5tdXN0YWNoZSIsIndlYnBhY2s6Ly9KUGlja2VyLy4vc3JjL0NvbXBvbmVudHMvSGVhZGVyL0hlYWRlci50cyIsIndlYnBhY2s6Ly9KUGlja2VyLy4vc3JjL0NvbXBvbmVudHMvSlBpY2tlci9KUGlja2VyLm11c3RhY2hlIiwid2VicGFjazovL0pQaWNrZXIvLi9zcmMvQ29tcG9uZW50cy9KUGlja2VyL0pQaWNrZXIudHMiLCJ3ZWJwYWNrOi8vSlBpY2tlci8uL3NyYy9Db21wb25lbnRzL0pQaWNrZXIvSlBpY2tlckJ1aWxkZXIudHMiLCJ3ZWJwYWNrOi8vSlBpY2tlci8uL3NyYy9Db21wb25lbnRzL0pQaWNrZXIvSlBpY2tlckNoYW5nZXIudHMiLCJ3ZWJwYWNrOi8vSlBpY2tlci8uL3NyYy9Db21wb25lbnRzL0pQaWNrZXIvSlBpY2tlckV2ZW50cy50cyIsIndlYnBhY2s6Ly9KUGlja2VyLy4vc3JjL0NvbXBvbmVudHMvSlBpY2tlci9KUGlja2VySGVscGVyLnRzIiwid2VicGFjazovL0pQaWNrZXIvLi9zcmMvQ29tcG9uZW50cy9MaXN0L0xpc3QubXVzdGFjaGUiLCJ3ZWJwYWNrOi8vSlBpY2tlci8uL3NyYy9Db21wb25lbnRzL01lbnUvTWVudS5tdXN0YWNoZSIsIndlYnBhY2s6Ly9KUGlja2VyLy4vc3JjL0NvbXBvbmVudHMvTWVudS9NZW51LnRzIiwid2VicGFjazovL0pQaWNrZXIvLi9zcmMvQ29tcG9uZW50cy9Nb250aFBpY2tlci9Nb250aFBpY2tlci50cyIsIndlYnBhY2s6Ly9KUGlja2VyLy4vc3JjL0NvbXBvbmVudHMvUGlja2VyLnRzIiwid2VicGFjazovL0pQaWNrZXIvLi9zcmMvQ29tcG9uZW50cy9SYW5nZXMvUmFuZ2VzLm11c3RhY2hlIiwid2VicGFjazovL0pQaWNrZXIvLi9zcmMvQ29tcG9uZW50cy9SYW5nZXMvUmFuZ2VzLnRzIiwid2VicGFjazovL0pQaWNrZXIvLi9zcmMvQ29tcG9uZW50cy9WYWx1ZS9WYWx1ZS5tdXN0YWNoZSIsIndlYnBhY2s6Ly9KUGlja2VyLy4vc3JjL0NvbXBvbmVudHMvVmFsdWUvVmFsdWUudHMiLCJ3ZWJwYWNrOi8vSlBpY2tlci8uL3NyYy9Db21wb25lbnRzL1llYXJQaWNrZXIvWWVhclBpY2tlci50cyIsIndlYnBhY2s6Ly9KUGlja2VyLy4vc3JjL0pQaWNrZXIudHMiXSwibmFtZXMiOlsiSG9nYW4iLCJySXNXaGl0ZXNwYWNlIiwiclF1b3QiLCJyTmV3bGluZSIsInJDciIsInJTbGFzaCIsInJMaW5lU2VwIiwiclBhcmFncmFwaFNlcCIsInRhZ3MiLCJzY2FuIiwidGV4dCIsImRlbGltaXRlcnMiLCJsZW4iLCJsZW5ndGgiLCJJTl9URVhUIiwiSU5fVEFHX1RZUEUiLCJJTl9UQUciLCJzdGF0ZSIsInRhZ1R5cGUiLCJ0YWciLCJidWYiLCJ0b2tlbnMiLCJzZWVuVGFnIiwiaSIsImxpbmVTdGFydCIsIm90YWciLCJjdGFnIiwiYWRkQnVmIiwicHVzaCIsIlN0cmluZyIsImxpbmVJc1doaXRlc3BhY2UiLCJpc0FsbFdoaXRlc3BhY2UiLCJqIiwibWF0Y2giLCJmaWx0ZXJMaW5lIiwiaGF2ZVNlZW5UYWciLCJub05ld0xpbmUiLCJuZXh0IiwiaW5kZW50IiwidG9TdHJpbmciLCJzcGxpY2UiLCJjaGFuZ2VEZWxpbWl0ZXJzIiwiaW5kZXgiLCJjbG9zZSIsImNsb3NlSW5kZXgiLCJpbmRleE9mIiwidHJpbSIsInN1YnN0cmluZyIsInNwbGl0IiwidGFnQ2hhbmdlIiwiY2hhckF0IiwibiIsImNsZWFuVHJpcGxlU3RhY2hlIiwidG9rZW4iLCJzdWJzdHIiLCJzIiwicmVwbGFjZSIsImwiLCJhbGxvd2VkSW5TdXBlciIsImJ1aWxkVHJlZSIsImtpbmQiLCJzdGFjayIsImN1c3RvbVRhZ3MiLCJpbnN0cnVjdGlvbnMiLCJvcGVuZXIiLCJ0YWlsIiwic2hpZnQiLCJFcnJvciIsImlzT3BlbmVyIiwibm9kZXMiLCJwb3AiLCJpc0Nsb3NlciIsImVuZCIsImxhc3QiLCJvIiwib3BlbiIsImMiLCJzdHJpbmdpZnlTdWJzdGl0dXRpb25zIiwib2JqIiwiaXRlbXMiLCJrZXkiLCJlc2MiLCJqb2luIiwic3RyaW5naWZ5UGFydGlhbHMiLCJjb2RlT2JqIiwicGFydGlhbHMiLCJuYW1lIiwic3VicyIsInN0cmluZ2lmeSIsIm9wdGlvbnMiLCJ3cmFwTWFpbiIsImNvZGUiLCJzZXJpYWxObyIsImdlbmVyYXRlIiwidHJlZSIsImNvbnRleHQiLCJ3YWxrIiwiYXNTdHJpbmciLCJtYWtlVGVtcGxhdGUiLCJ0ZW1wbGF0ZSIsIlRlbXBsYXRlIiwibWFrZVBhcnRpYWxzIiwiRnVuY3Rpb24iLCJjaG9vc2VNZXRob2QiLCJjcmVhdGVQYXJ0aWFsIiwibm9kZSIsInByZWZpeCIsInN5bSIsImNvZGVnZW4iLCJjdHgiLCJpblBhcnRpYWwiLCJ3cml0ZSIsInRyaXBsZVN0YWNoZSIsIm5vZGVsaXN0IiwiZnVuYyIsInBhcnNlIiwic2VjdGlvblRhZ3MiLCJjYWNoZSIsImNhY2hlS2V5IiwiZGlzYWJsZUxhbWJkYSIsIm1vZGVsR2V0IiwiY29tcGlsZSIsImluc3RhbmNlIiwiZXhwb3J0cyIsInJlcXVpcmUiLCJtb2R1bGUiLCJjb21waWxlciIsInIiLCJwcm90b3R5cGUiLCJ2IiwiaG9nYW5Fc2NhcGUiLCJ0IiwiY29lcmNlVG9TdHJpbmciLCJyZW5kZXIiLCJyaSIsImVwIiwic3ltYm9sIiwicGFydGlhbCIsImJhc2UiLCJzdGFja1RleHQiLCJhY3RpdmVTdWIiLCJ1bmRlZmluZWQiLCJjcmVhdGVTcGVjaWFsaXplZFBhcnRpYWwiLCJzdGFja1N1YnMiLCJzdGFja1BhcnRpYWxzIiwicnAiLCJycyIsInNlY3Rpb24iLCJpc0FycmF5IiwidmFsIiwiaW52ZXJ0ZWQiLCJzdGFydCIsInBhc3MiLCJtcyIsImQiLCJyZXR1cm5Gb3VuZCIsImZvdW5kIiwibmFtZXMiLCJmIiwiZG9Nb2RlbEdldCIsImN4IiwiZmluZEluU2NvcGUiLCJtdiIsImxzIiwib2xkVGFncyIsImIiLCJjdCIsImNhbGwiLCJmbCIsInRleHRTb3VyY2UiLCJyZXN1bHQiLCJzdWJzVGV4dCIsInN1YiIsInNjb3BlIiwiZ2V0IiwiUGFydGlhbFRlbXBsYXRlIiwiU3Vic3RpdHV0aW9ucyIsInJBbXAiLCJyTHQiLCJyR3QiLCJyQXBvcyIsImhDaGFycyIsInN0ciIsInRlc3QiLCJBcnJheSIsImEiLCJPYmplY3QiXSwibWFwcGluZ3MiOiJBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRCxPO1FDVkE7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7OztRQUdBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSwwQ0FBMEMsZ0NBQWdDO1FBQzFFO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0Esd0RBQXdELGtCQUFrQjtRQUMxRTtRQUNBLGlEQUFpRCxjQUFjO1FBQy9EOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQSx5Q0FBeUMsaUNBQWlDO1FBQzFFLGdIQUFnSCxtQkFBbUIsRUFBRTtRQUNySTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLDJCQUEyQiwwQkFBMEIsRUFBRTtRQUN2RCxpQ0FBaUMsZUFBZTtRQUNoRDtRQUNBO1FBQ0E7O1FBRUE7UUFDQSxzREFBc0QsK0RBQStEOztRQUVySDtRQUNBOzs7UUFHQTtRQUNBOzs7Ozs7Ozs7Ozs7QUNsRkE7Ozs7Ozs7Ozs7Ozs7O0FBZUEsQ0FBQyxVQUFVQSxLQUFWLEVBQWlCO0FBQ2hCO0FBQ0E7QUFDQSxNQUFJQyxhQUFhLEdBQUcsSUFBcEI7QUFBQSxNQUNJQyxLQUFLLEdBQUcsS0FEWjtBQUFBLE1BRUlDLFFBQVEsR0FBSSxLQUZoQjtBQUFBLE1BR0lDLEdBQUcs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QXNCO0FBQzdDO0FBQ0E7QUFDQSxDQUFDO0FBQ2tDO0FBQ25DO0FBQ0E7QUFDQTtBQUNBLDhCQUE4QixhQUFhO0FBQzNDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxnQ0FBZ0MsaUJBQWlCO0FBQ2pEO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZUFBZSxtQkFBTyxDQUFDLGtFQUF1QjtBQUM5QztBQUNBO0FBQ0EsQ0FBQyxDQUFDLDhDQUFNO0FBQ2M7Ozs7Ozs7Ozs7Ozs7QUN2RHRCO0FBQUE7QUFBQTtBQUFBO0FBQXVEIiwiZmlsZSI6IkpQaWNrZXIuanMiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gd2VicGFja1VuaXZlcnNhbE1vZHVsZURlZmluaXRpb24ocm9vdCwgZmFjdG9yeSkge1xuXHRpZih0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcgJiYgdHlwZW9mIG1vZHVsZSA9PT0gJ29iamVjdCcpXG5cdFx0bW9kdWxlLmV4cG9ydHMgPSBmYWN0b3J5KCk7XG5cdGVsc2UgaWYodHlwZW9mIGRlZmluZSA9PT0gJ2Z1bmN0aW9uJyAmJiBkZWZpbmUuYW1kKVxuXHRcdGRlZmluZShbXSwgZmFjdG9yeSk7XG5cdGVsc2UgaWYodHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnKVxuXHRcdGV4cG9ydHNbXCJKUGlja2VyXCJdID0gZmFjdG9yeSgpO1xuXHRlbHNlXG5cdFx0cm9vdFtcIkpQaWNrZXJcIl0gPSBmYWN0b3J5KCk7XG59KSh0aGlzLCBmdW5jdGlvbigpIHtcbnJldHVybiAiLCIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBnZXR0ZXIgfSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcbiBcdFx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG4gXHRcdH1cbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbiBcdH07XG5cbiBcdC8vIGNyZWF0ZSBhIGZha2UgbmFtZXNwYWNlIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDE6IHZhbHVlIGlzIGEgbW9kdWxlIGlkLCByZXF1aXJlIGl0XG4gXHQvLyBtb2RlICYgMjogbWVyZ2UgYWxsIHByb3BlcnRpZXMgb2YgdmFsdWUgaW50byB0aGUgbnNcbiBcdC8vIG1vZGUgJiA0OiByZXR1cm4gdmFsdWUgd2hlbiBhbHJlYWR5IG5zIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDh8MTogYmVoYXZlIGxpa2UgcmVxdWlyZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy50ID0gZnVuY3Rpb24odmFsdWUsIG1vZGUpIHtcbiBcdFx0aWYobW9kZSAmIDEpIHZhbHVlID0gX193ZWJwYWNrX3JlcXVpcmVfXyh2YWx1ZSk7XG4gXHRcdGlmKG1vZGUgJiA4KSByZXR1cm4gdmFsdWU7XG4gXHRcdGlmKChtb2RlICYgNCkgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJiB2YWx1ZSAmJiB2YWx1ZS5fX2VzTW9kdWxlKSByZXR1cm4gdmFsdWU7XG4gXHRcdHZhciBucyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18ucihucyk7XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShucywgJ2RlZmF1bHQnLCB7IGVudW1lcmFibGU6IHRydWUsIHZhbHVlOiB2YWx1ZSB9KTtcbiBcdFx0aWYobW9kZSAmIDIgJiYgdHlwZW9mIHZhbHVlICE9ICdzdHJpbmcnKSBmb3IodmFyIGtleSBpbiB2YWx1ZSkgX193ZWJwYWNrX3JlcXVpcmVfXy5kKG5zLCBrZXksIGZ1bmN0aW9uKGtleSkgeyByZXR1cm4gdmFsdWVba2V5XTsgfS5iaW5kKG51bGwsIGtleSkpO1xuIFx0XHRyZXR1cm4gbnM7XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gXCIuL3NyYy9KUGlja2VyLnRzXCIpO1xuIiwiLypcbiAqICBDb3B5cmlnaHQgMjAxMSBUd2l0dGVyLCBJbmMuXG4gKiAgTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcbiAqICB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXG4gKiAgWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XG4gKlxuICogIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxuICpcbiAqICBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXG4gKiAgZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxuICogIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxuICogIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcbiAqICBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cbiAqL1xuXG4oZnVuY3Rpb24gKEhvZ2FuKSB7XG4gIC8vIFNldHVwIHJlZ2V4ICBhc3NpZ25tZW50c1xuICAvLyByZW1vdmUgd2hpdGVzcGFjZSBhY2NvcmRpbmcgdG8gTXVzdGFjaGUgc3BlY1xuICB2YXIgcklzV2hpdGVzcGFjZSA9IC9cXFMvLFxuICAgICAgclF1b3QgPSAvXFxcIi9nLFxuICAgICAgck5ld2xpbmUgPSAgL1xcbi9nLFxuICAgICAgckNyID0gL1xcci9nLFxuICAgICAgclNsYXNoID0gL1xcXFwvZyxcbiAgICAgIHJMaW5lU2VwID0gL1xcdTIwMjgvLFxuICAgICAgclBhcmFncmFwaFNlcCA9IC9cXHUyMDI5LztcblxuICBIb2dhbi50YWdzID0ge1xuICAgICcjJzogMSwgJ14nOiAyLCAnPCc6IDMsICckJzogNCxcbiAgICAnLyc6IDUsICchJzogNiwgJz4nOiA3LCAnPSc6IDgsICdfdic6IDksXG4gICAgJ3snOiAxMCwgJyYnOiAxMSwgJ190JzogMTJcbiAgfTtcblxuICBIb2dhbi5zY2FuID0gZnVuY3Rpb24gc2Nhbih0ZXh0LCBkZWxpbWl0ZXJzKSB7XG4gICAgdmFyIGxlbiA9IHRleHQubGVuZ3RoLFxuICAgICAgICBJTl9URVhUID0gMCxcbiAgICAgICAgSU5fVEFHX1RZUEUgPSAxLFxuICAgICAgICBJTl9UQUcgPSAyLFxuICAgICAgICBzdGF0ZSA9IElOX1RFWFQsXG4gICAgICAgIHRhZ1R5cGUgPSBudWxsLFxuICAgICAgICB0YWcgPSBudWxsLFxuICAgICAgICBidWYgPSAnJyxcbiAgICAgICAgdG9rZW5zID0gW10sXG4gICAgICAgIHNlZW5UYWcgPSBmYWxzZSxcbiAgICAgICAgaSA9IDAsXG4gICAgICAgIGxpbmVTdGFydCA9IDAsXG4gICAgICAgIG90YWcgPSAne3snLFxuICAgICAgICBjdGFnID0gJ319JztcblxuICAgIGZ1bmN0aW9uIGFkZEJ1ZigpIHtcbiAgICAgIGlmIChidWYubGVuZ3RoID4gMCkge1xuICAgICAgICB0b2tlbnMucHVzaCh7dGFnOiAnX3QnLCB0ZXh0OiBuZXcgU3RyaW5nKGJ1Zil9KTtcbiAgICAgICAgYnVmID0gJyc7XG4gICAgICB9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gbGluZUlzV2hpdGVzcGFjZSgpIHtcbiAgICAgIHZhciBpc0FsbFdoaXRlc3BhY2UgPSB0cnVlO1xuICAgICAgZm9yICh2YXIgaiA9IGxpbmVTdGFydDsgaiA8IHRva2Vucy5sZW5ndGg7IGorKykge1xuICAgICAgICBpc0FsbFdoaXRlc3BhY2UgPVxuICAgICAgICAgIChIb2dhbi50YWdzW3Rva2Vuc1tqXS50YWddIDwgSG9nYW4udGFnc1snX3YnXSkgfHxcbiAgICAgICAgICAodG9rZW5zW2pdLnRhZyA9PSAnX3QnICYmIHRva2Vuc1tqXS50ZXh0Lm1hdGNoKHJJc1doaXRlc3BhY2UpID09PSBudWxsKTtcbiAgICAgICAgaWYgKCFpc0FsbFdoaXRlc3BhY2UpIHtcbiAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgcmV0dXJuIGlzQWxsV2hpdGVzcGFjZTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBmaWx0ZXJMaW5lKGhhdmVTZWVuVGFnLCBub05ld0xpbmUpIHtcbiAgICAgIGFkZEJ1ZigpO1xuXG4gICAgICBpZiAoaGF2ZVNlZW5UYWcgJiYgbGluZUlzV2hpdGVzcGFjZSgpKSB7XG4gICAgICAgIGZvciAodmFyIGogPSBsaW5lU3RhcnQsIG5leHQ7IGogPCB0b2tlbnMubGVuZ3RoOyBqKyspIHtcbiAgICAgICAgICBpZiAodG9rZW5zW2pdLnRleHQpIHtcbiAgICAgICAgICAgIGlmICgobmV4dCA9IHRva2Vuc1tqKzFdKSAmJiBuZXh0LnRhZyA9PSAnPicpIHtcbiAgICAgICAgICAgICAgLy8gc2V0IGluZGVudCB0byB0b2tlbiB2YWx1ZVxuICAgICAgICAgICAgICBuZXh0LmluZGVudCA9IHRva2Vuc1tqXS50ZXh0LnRvU3RyaW5nKClcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRva2Vucy5zcGxpY2UoaiwgMSk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9IGVsc2UgaWYgKCFub05ld0xpbmUpIHtcbiAgICAgICAgdG9rZW5zLnB1c2goe3RhZzonXFxuJ30pO1xuICAgICAgfVxuXG4gICAgICBzZWVuVGFnID0gZmFsc2U7XG4gICAgICBsaW5lU3RhcnQgPSB0b2tlbnMubGVuZ3RoO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGNoYW5nZURlbGltaXRlcnModGV4dCwgaW5kZXgpIHtcbiAgICAgIHZhciBjbG9zZSA9ICc9JyArIGN0YWcsXG4gICAgICAgICAgY2xvc2VJbmRleCA9IHRleHQuaW5kZXhPZihjbG9zZSwgaW5kZXgpLFxuICAgICAgICAgIGRlbGltaXRlcnMgPSB0cmltKFxuICAgICAgICAgICAgdGV4dC5zdWJzdHJpbmcodGV4dC5pbmRleE9mKCc9JywgaW5kZXgpICsgMSwgY2xvc2VJbmRleClcbiAgICAgICAgICApLnNwbGl0KCcgJyk7XG5cbiAgICAgIG90YWcgPSBkZWxpbWl0ZXJzWzBdO1xuICAgICAgY3RhZyA9IGRlbGltaXRlcnNbZGVsaW1pdGVycy5sZW5ndGggLSAxXTtcblxuICAgICAgcmV0dXJuIGNsb3NlSW5kZXggKyBjbG9zZS5sZW5ndGggLSAxO1xuICAgIH1cblxuICAgIGlmIChkZWxpbWl0ZXJzKSB7XG4gICAgICBkZWxpbWl0ZXJzID0gZGVsaW1pdGVycy5zcGxpdCgnICcpO1xuICAgICAgb3RhZyA9IGRlbGltaXRlcnNbMF07XG4gICAgICBjdGFnID0gZGVsaW1pdGVyc1sxXTtcbiAgICB9XG5cbiAgICBmb3IgKGkgPSAwOyBpIDwgbGVuOyBpKyspIHtcbiAgICAgIGlmIChzdGF0ZSA9PSBJTl9URVhUKSB7XG4gICAgICAgIGlmICh0YWdDaGFuZ2Uob3RhZywgdGV4dCwgaSkpIHtcbiAgICAgICAgICAtLWk7XG4gICAgICAgICAgYWRkQnVmKCk7XG4gICAgICAgICAgc3RhdGUgPSBJTl9UQUdfVFlQRTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpZiAodGV4dC5jaGFyQXQoaSkgPT0gJ1xcbicpIHtcbiAgICAgICAgICAgIGZpbHRlckxpbmUoc2VlblRhZyk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGJ1ZiArPSB0ZXh0LmNoYXJBdChpKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSBpZiAoc3RhdGUgPT0gSU5fVEFHX1RZUEUpIHtcbiAgICAgICAgaSArPSBvdGFnLmxlbmd0aCAtIDE7XG4gICAgICAgIHRhZyA9IEhvZ2FuLnRhZ3NbdGV4dC5jaGFyQXQoaSArIDEpXTtcbiAgICAgICAgdGFnVHlwZSA9IHRhZyA/IHRleHQuY2hhckF0KGkgKyAxKSA6ICdfdic7XG4gICAgICAgIGlmICh0YWdUeXBlID09ICc9Jykge1xuICAgICAgICAgIGkgPSBjaGFuZ2VEZWxpbWl0ZXJzKHRleHQsIGkpO1xuICAgICAgICAgIHN0YXRlID0gSU5fVEVYVDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpZiAodGFnKSB7XG4gICAgICAgICAgICBpKys7XG4gICAgICAgICAgfVxuICAgICAgICAgIHN0YXRlID0gSU5fVEFHO1xuICAgICAgICB9XG4gICAgICAgIHNlZW5UYWcgPSBpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgaWYgKHRhZ0NoYW5nZShjdGFnLCB0ZXh0LCBpKSkge1xuICAgICAgICAgIHRva2Vucy5wdXNoKHt0YWc6IHRhZ1R5cGUsIG46IHRyaW0oYnVmKSwgb3RhZzogb3RhZywgY3RhZzogY3RhZyxcbiAgICAgICAgICAgICAgICAgICAgICAgaTogKHRhZ1R5cGUgPT0gJy8nKSA/IHNlZW5UYWcgLSBvdGFnLmxlbmd0aCA6IGkgKyBjdGFnLmxlbmd0aH0pO1xuICAgICAgICAgIGJ1ZiA9ICcnO1xuICAgICAgICAgIGkgKz0gY3RhZy5sZW5ndGggLSAxO1xuICAgICAgICAgIHN0YXRlID0gSU5fVEVYVDtcbiAgICAgICAgICBpZiAodGFnVHlwZSA9PSAneycpIHtcbiAgICAgICAgICAgIGlmIChjdGFnID09ICd9fScpIHtcbiAgICAgICAgICAgICAgaSsrO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgY2xlYW5UcmlwbGVTdGFjaGUodG9rZW5zW3Rva2Vucy5sZW5ndGggLSAxXSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGJ1ZiArPSB0ZXh0LmNoYXJBdChpKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIGZpbHRlckxpbmUoc2VlblRhZywgdHJ1ZSk7XG5cbiAgICByZXR1cm4gdG9rZW5zO1xuICB9XG5cbiAgZnVuY3Rpb24gY2xlYW5UcmlwbGVTdGFjaGUodG9rZW4pIHtcbiAgICBpZiAodG9rZW4ubi5zdWJzdHIodG9rZW4ubi5sZW5ndGggLSAxKSA9PT0gJ30nKSB7XG4gICAgICB0b2tlbi5uID0gdG9rZW4ubi5zdWJzdHJpbmcoMCwgdG9rZW4ubi5sZW5ndGggLSAxKTtcbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiB0cmltKHMpIHtcbiAgICBpZiAocy50cmltKSB7XG4gICAgICByZXR1cm4gcy50cmltKCk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHMucmVwbGFjZSgvXlxccyp8XFxzKiQvZywgJycpO1xuICB9XG5cbiAgZnVuY3Rpb24gdGFnQ2hhbmdlKHRhZywgdGV4dCwgaW5kZXgpIHtcbiAgICBpZiAodGV4dC5jaGFyQXQoaW5kZXgpICE9IHRhZy5jaGFyQXQoMCkpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICBmb3IgKHZhciBpID0gMSwgbCA9IHRhZy5sZW5ndGg7IGkgPCBsOyBpKyspIHtcbiAgICAgIGlmICh0ZXh0LmNoYXJBdChpbmRleCArIGkpICE9IHRhZy5jaGFyQXQoaSkpIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiB0cnVlO1xuICB9XG5cbiAgLy8gdGhlIHRhZ3MgYWxsb3dlZCBpbnNpZGUgc3VwZXIgdGVtcGxhdGVzXG4gIHZhciBhbGxvd2VkSW5TdXBlciA9IHsnX3QnOiB0cnVlLCAnXFxuJzogdHJ1ZSwgJyQnOiB0cnVlLCAnLyc6IHRydWV9O1xuXG4gIGZ1bmN0aW9uIGJ1aWxkVHJlZSh0b2tlbnMsIGtpbmQsIHN0YWNrLCBjdXN0b21UYWdzKSB7XG4gICAgdmFyIGluc3RydWN0aW9ucyA9IFtdLFxuICAgICAgICBvcGVuZXIgPSBudWxsLFxuICAgICAgICB0YWlsID0gbnVsbCxcbiAgICAgICAgdG9rZW4gPSBudWxsO1xuXG4gICAgdGFpbCA9IHN0YWNrW3N0YWNrLmxlbmd0aCAtIDFdO1xuXG4gICAgd2hpbGUgKHRva2Vucy5sZW5ndGggPiAwKSB7XG4gICAgICB0b2tlbiA9IHRva2Vucy5zaGlmdCgpO1xuXG4gICAgICBpZiAodGFpbCAmJiB0YWlsLnRhZyA9PSAnPCcgJiYgISh0b2tlbi50YWcgaW4gYWxsb3dlZEluU3VwZXIpKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcignSWxsZWdhbCBjb250ZW50IGluIDwgc3VwZXIgdGFnLicpO1xuICAgICAgfVxuXG4gICAgICBpZiAoSG9nYW4udGFnc1t0b2tlbi50YWddIDw9IEhvZ2FuLnRhZ3NbJyQnXSB8fCBpc09wZW5lcih0b2tlbiwgY3VzdG9tVGFncykpIHtcbiAgICAgICAgc3RhY2sucHVzaCh0b2tlbik7XG4gICAgICAgIHRva2VuLm5vZGVzID0gYnVpbGRUcmVlKHRva2VucywgdG9rZW4udGFnLCBzdGFjaywgY3VzdG9tVGFncyk7XG4gICAgICB9IGVsc2UgaWYgKHRva2VuLnRhZyA9PSAnLycpIHtcbiAgICAgICAgaWYgKHN0YWNrLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgIHRocm93IG5ldyBFcnJvcignQ2xvc2luZyB0YWcgd2l0aG91dCBvcGVuZXI6IC8nICsgdG9rZW4ubik7XG4gICAgICAgIH1cbiAgICAgICAgb3BlbmVyID0gc3RhY2sucG9wKCk7XG4gICAgICAgIGlmICh0b2tlbi5uICE9IG9wZW5lci5uICYmICFpc0Nsb3Nlcih0b2tlbi5uLCBvcGVuZXIubiwgY3VzdG9tVGFncykpIHtcbiAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ05lc3RpbmcgZXJyb3I6ICcgKyBvcGVuZXIubiArICcgdnMuICcgKyB0b2tlbi5uKTtcbiAgICAgICAgfVxuICAgICAgICBvcGVuZXIuZW5kID0gdG9rZW4uaTtcbiAgICAgICAgcmV0dXJuIGluc3RydWN0aW9ucztcbiAgICAgIH0gZWxzZSBpZiAodG9rZW4udGFnID09ICdcXG4nKSB7XG4gICAgICAgIHRva2VuLmxhc3QgPSAodG9rZW5zLmxlbmd0aCA9PSAwKSB8fCAodG9rZW5zWzBdLnRhZyA9PSAnXFxuJyk7XG4gICAgICB9XG5cbiAgICAgIGluc3RydWN0aW9ucy5wdXNoKHRva2VuKTtcbiAgICB9XG5cbiAgICBpZiAoc3RhY2subGVuZ3RoID4gMCkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdtaXNzaW5nIGNsb3NpbmcgdGFnOiAnICsgc3RhY2sucG9wKCkubik7XG4gICAgfVxuXG4gICAgcmV0dXJuIGluc3RydWN0aW9ucztcbiAgfVxuXG4gIGZ1bmN0aW9uIGlzT3BlbmVyKHRva2VuLCB0YWdzKSB7XG4gICAgZm9yICh2YXIgaSA9IDAsIGwgPSB0YWdzLmxlbmd0aDsgaSA8IGw7IGkrKykge1xuICAgICAgaWYgKHRhZ3NbaV0ubyA9PSB0b2tlbi5uKSB7XG4gICAgICAgIHRva2VuLnRhZyA9ICcjJztcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gaXNDbG9zZXIoY2xvc2UsIG9wZW4sIHRhZ3MpIHtcbiAgICBmb3IgKHZhciBpID0gMCwgbCA9IHRhZ3MubGVuZ3RoOyBpIDwgbDsgaSsrKSB7XG4gICAgICBpZiAodGFnc1tpXS5jID09IGNsb3NlICYmIHRhZ3NbaV0ubyA9PSBvcGVuKSB7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIHN0cmluZ2lmeVN1YnN0aXR1dGlvbnMob2JqKSB7XG4gICAgdmFyIGl0ZW1zID0gW107XG4gICAgZm9yICh2YXIga2V5IGluIG9iaikge1xuICAgICAgaXRlbXMucHVzaCgnXCInICsgZXNjKGtleSkgKyAnXCI6IGZ1bmN0aW9uKGMscCx0LGkpIHsnICsgb2JqW2tleV0gKyAnfScpO1xuICAgIH1cbiAgICByZXR1cm4gXCJ7IFwiICsgaXRlbXMuam9pbihcIixcIikgKyBcIiB9XCI7XG4gIH1cblxuICBmdW5jdGlvbiBzdHJpbmdpZnlQYXJ0aWFscyhjb2RlT2JqKSB7XG4gICAgdmFyIHBhcnRpYWxzID0gW107XG4gICAgZm9yICh2YXIga2V5IGluIGNvZGVPYmoucGFydGlhbHMpIHtcbiAgICAgIHBhcnRpYWxzLnB1c2goJ1wiJyArIGVzYyhrZXkpICsgJ1wiOntuYW1lOlwiJyArIGVzYyhjb2RlT2JqLnBhcnRpYWxzW2tleV0ubmFtZSkgKyAnXCIsICcgKyBzdHJpbmdpZnlQYXJ0aWFscyhjb2RlT2JqLnBhcnRpYWxzW2tleV0pICsgXCJ9XCIpO1xuICAgIH1cbiAgICByZXR1cm4gXCJwYXJ0aWFsczoge1wiICsgcGFydGlhbHMuam9pbihcIixcIikgKyBcIn0sIHN1YnM6IFwiICsgc3RyaW5naWZ5U3Vic3RpdHV0aW9ucyhjb2RlT2JqLnN1YnMpO1xuICB9XG5cbiAgSG9nYW4uc3RyaW5naWZ5ID0gZnVuY3Rpb24oY29kZU9iaiwgdGV4dCwgb3B0aW9ucykge1xuICAgIHJldHVybiBcIntjb2RlOiBmdW5jdGlvbiAoYyxwLGkpIHsgXCIgKyBIb2dhbi53cmFwTWFpbihjb2RlT2JqLmNvZGUpICsgXCIgfSxcIiArIHN0cmluZ2lmeVBhcnRpYWxzKGNvZGVPYmopICsgIFwifVwiO1xuICB9XG5cbiAgdmFyIHNlcmlhbE5vID0gMDtcbiAgSG9nYW4uZ2VuZXJhdGUgPSBmdW5jdGlvbih0cmVlLCB0ZXh0LCBvcHRpb25zKSB7XG4gICAgc2VyaWFsTm8gPSAwO1xuICAgIHZhciBjb250ZXh0ID0geyBjb2RlOiAnJywgc3Viczoge30sIHBhcnRpYWxzOiB7fSB9O1xuICAgIEhvZ2FuLndhbGsodHJlZSwgY29udGV4dCk7XG5cbiAgICBpZiAob3B0aW9ucy5hc1N0cmluZykge1xuICAgICAgcmV0dXJuIHRoaXMuc3RyaW5naWZ5KGNvbnRleHQsIHRleHQsIG9wdGlvbnMpO1xuICAgIH1cblxuICAgIHJldHVybiB0aGlzLm1ha2VUZW1wbGF0ZShjb250ZXh0LCB0ZXh0LCBvcHRpb25zKTtcbiAgfVxuXG4gIEhvZ2FuLndyYXBNYWluID0gZnVuY3Rpb24oY29kZSkge1xuICAgIHJldHVybiAndmFyIHQ9dGhpczt0LmIoaT1pfHxcIlwiKTsnICsgY29kZSArICdyZXR1cm4gdC5mbCgpOyc7XG4gIH1cblxuICBIb2dhbi50ZW1wbGF0ZSA9IEhvZ2FuLlRlbXBsYXRlO1xuXG4gIEhvZ2FuLm1ha2VUZW1wbGF0ZSA9IGZ1bmN0aW9uKGNvZGVPYmosIHRleHQsIG9wdGlvbnMpIHtcbiAgICB2YXIgdGVtcGxhdGUgPSB0aGlzLm1ha2VQYXJ0aWFscyhjb2RlT2JqKTtcbiAgICB0ZW1wbGF0ZS5jb2RlID0gbmV3IEZ1bmN0aW9uKCdjJywgJ3AnLCAnaScsIHRoaXMud3JhcE1haW4oY29kZU9iai5jb2RlKSk7XG4gICAgcmV0dXJuIG5ldyB0aGlzLnRlbXBsYXRlKHRlbXBsYXRlLCB0ZXh0LCB0aGlzLCBvcHRpb25zKTtcbiAgfVxuXG4gIEhvZ2FuLm1ha2VQYXJ0aWFscyA9IGZ1bmN0aW9uKGNvZGVPYmopIHtcbiAgICB2YXIga2V5LCB0ZW1wbGF0ZSA9IHtzdWJzOiB7fSwgcGFydGlhbHM6IGNvZGVPYmoucGFydGlhbHMsIG5hbWU6IGNvZGVPYmoubmFtZX07XG4gICAgZm9yIChrZXkgaW4gdGVtcGxhdGUucGFydGlhbHMpIHtcbiAgICAgIHRlbXBsYXRlLnBhcnRpYWxzW2tleV0gPSB0aGlzLm1ha2VQYXJ0aWFscyh0ZW1wbGF0ZS5wYXJ0aWFsc1trZXldKTtcbiAgICB9XG4gICAgZm9yIChrZXkgaW4gY29kZU9iai5zdWJzKSB7XG4gICAgICB0ZW1wbGF0ZS5zdWJzW2tleV0gPSBuZXcgRnVuY3Rpb24oJ2MnLCAncCcsICd0JywgJ2knLCBjb2RlT2JqLnN1YnNba2V5XSk7XG4gICAgfVxuICAgIHJldHVybiB0ZW1wbGF0ZTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGVzYyhzKSB7XG4gICAgcmV0dXJuIHMucmVwbGFjZShyU2xhc2gsICdcXFxcXFxcXCcpXG4gICAgICAgICAgICAucmVwbGFjZShyUXVvdCwgJ1xcXFxcXFwiJylcbiAgICAgICAgICAgIC5yZXBsYWNlKHJOZXdsaW5lLCAnXFxcXG4nKVxuICAgICAgICAgICAgLnJlcGxhY2UockNyLCAnXFxcXHInKVxuICAgICAgICAgICAgLnJlcGxhY2UockxpbmVTZXAsICdcXFxcdTIwMjgnKVxuICAgICAgICAgICAgLnJlcGxhY2UoclBhcmFncmFwaFNlcCwgJ1xcXFx1MjAyOScpO1xuICB9XG5cbiAgZnVuY3Rpb24gY2hvb3NlTWV0aG9kKHMpIHtcbiAgICByZXR1cm4gKH5zLmluZGV4T2YoJy4nKSkgPyAnZCcgOiAnZic7XG4gIH1cblxuICBmdW5jdGlvbiBjcmVhdGVQYXJ0aWFsKG5vZGUsIGNvbnRleHQpIHtcbiAgICB2YXIgcHJlZml4ID0gXCI8XCIgKyAoY29udGV4dC5wcmVmaXggfHwgXCJcIik7XG4gICAgdmFyIHN5bSA9IHByZWZpeCArIG5vZGUubiArIHNlcmlhbE5vKys7XG4gICAgY29udGV4dC5wYXJ0aWFsc1tzeW1dID0ge25hbWU6IG5vZGUubiwgcGFydGlhbHM6IHt9fTtcbiAgICBjb250ZXh0LmNvZGUgKz0gJ3QuYih0LnJwKFwiJyArICBlc2Moc3ltKSArICdcIixjLHAsXCInICsgKG5vZGUuaW5kZW50IHx8ICcnKSArICdcIikpOyc7XG4gICAgcmV0dXJuIHN5bTtcbiAgfVxuXG4gIEhvZ2FuLmNvZGVnZW4gPSB7XG4gICAgJyMnOiBmdW5jdGlvbihub2RlLCBjb250ZXh0KSB7XG4gICAgICBjb250ZXh0LmNvZGUgKz0gJ2lmKHQucyh0LicgKyBjaG9vc2VNZXRob2Qobm9kZS5uKSArICcoXCInICsgZXNjKG5vZGUubikgKyAnXCIsYyxwLDEpLCcgK1xuICAgICAgICAgICAgICAgICAgICAgICdjLHAsMCwnICsgbm9kZS5pICsgJywnICsgbm9kZS5lbmQgKyAnLFwiJyArIG5vZGUub3RhZyArIFwiIFwiICsgbm9kZS5jdGFnICsgJ1wiKSl7JyArXG4gICAgICAgICAgICAgICAgICAgICAgJ3QucnMoYyxwLCcgKyAnZnVuY3Rpb24oYyxwLHQpeyc7XG4gICAgICBIb2dhbi53YWxrKG5vZGUubm9kZXMsIGNvbnRleHQpO1xuICAgICAgY29udGV4dC5jb2RlICs9ICd9KTtjLnBvcCgpO30nO1xuICAgIH0sXG5cbiAgICAnXic6IGZ1bmN0aW9uKG5vZGUsIGNvbnRleHQpIHtcbiAgICAgIGNvbnRleHQuY29kZSArPSAnaWYoIXQucyh0LicgKyBjaG9vc2VNZXRob2Qobm9kZS5uKSArICcoXCInICsgZXNjKG5vZGUubikgKyAnXCIsYyxwLDEpLGMscCwxLDAsMCxcIlwiKSl7JztcbiAgICAgIEhvZ2FuLndhbGsobm9kZS5ub2RlcywgY29udGV4dCk7XG4gICAgICBjb250ZXh0LmNvZGUgKz0gJ307JztcbiAgICB9LFxuXG4gICAgJz4nOiBjcmVhdGVQYXJ0aWFsLFxuICAgICc8JzogZnVuY3Rpb24obm9kZSwgY29udGV4dCkge1xuICAgICAgdmFyIGN0eCA9IHtwYXJ0aWFsczoge30sIGNvZGU6ICcnLCBzdWJzOiB7fSwgaW5QYXJ0aWFsOiB0cnVlfTtcbiAgICAgIEhvZ2FuLndhbGsobm9kZS5ub2RlcywgY3R4KTtcbiAgICAgIHZhciB0ZW1wbGF0ZSA9IGNvbnRleHQucGFydGlhbHNbY3JlYXRlUGFydGlhbChub2RlLCBjb250ZXh0KV07XG4gICAgICB0ZW1wbGF0ZS5zdWJzID0gY3R4LnN1YnM7XG4gICAgICB0ZW1wbGF0ZS5wYXJ0aWFscyA9IGN0eC5wYXJ0aWFscztcbiAgICB9LFxuXG4gICAgJyQnOiBmdW5jdGlvbihub2RlLCBjb250ZXh0KSB7XG4gICAgICB2YXIgY3R4ID0ge3N1YnM6IHt9LCBjb2RlOiAnJywgcGFydGlhbHM6IGNvbnRleHQucGFydGlhbHMsIHByZWZpeDogbm9kZS5ufTtcbiAgICAgIEhvZ2FuLndhbGsobm9kZS5ub2RlcywgY3R4KTtcbiAgICAgIGNvbnRleHQuc3Vic1tub2RlLm5dID0gY3R4LmNvZGU7XG4gICAgICBpZiAoIWNvbnRleHQuaW5QYXJ0aWFsKSB7XG4gICAgICAgIGNvbnRleHQuY29kZSArPSAndC5zdWIoXCInICsgZXNjKG5vZGUubikgKyAnXCIsYyxwLGkpOyc7XG4gICAgICB9XG4gICAgfSxcblxuICAgICdcXG4nOiBmdW5jdGlvbihub2RlLCBjb250ZXh0KSB7XG4gICAgICBjb250ZXh0LmNvZGUgKz0gd3JpdGUoJ1wiXFxcXG5cIicgKyAobm9kZS5sYXN0ID8gJycgOiAnICsgaScpKTtcbiAgICB9LFxuXG4gICAgJ192JzogZnVuY3Rpb24obm9kZSwgY29udGV4dCkge1xuICAgICAgY29udGV4dC5jb2RlICs9ICd0LmIodC52KHQuJyArIGNob29zZU1ldGhvZChub2RlLm4pICsgJyhcIicgKyBlc2Mobm9kZS5uKSArICdcIixjLHAsMCkpKTsnO1xuICAgIH0sXG5cbiAgICAnX3QnOiBmdW5jdGlvbihub2RlLCBjb250ZXh0KSB7XG4gICAgICBjb250ZXh0LmNvZGUgKz0gd3JpdGUoJ1wiJyArIGVzYyhub2RlLnRleHQpICsgJ1wiJyk7XG4gICAgfSxcblxuICAgICd7JzogdHJpcGxlU3RhY2hlLFxuXG4gICAgJyYnOiB0cmlwbGVTdGFjaGVcbiAgfVxuXG4gIGZ1bmN0aW9uIHRyaXBsZVN0YWNoZShub2RlLCBjb250ZXh0KSB7XG4gICAgY29udGV4dC5jb2RlICs9ICd0LmIodC50KHQuJyArIGNob29zZU1ldGhvZChub2RlLm4pICsgJyhcIicgKyBlc2Mobm9kZS5uKSArICdcIixjLHAsMCkpKTsnO1xuICB9XG5cbiAgZnVuY3Rpb24gd3JpdGUocykge1xuICAgIHJldHVybiAndC5iKCcgKyBzICsgJyk7JztcbiAgfVxuXG4gIEhvZ2FuLndhbGsgPSBmdW5jdGlvbihub2RlbGlzdCwgY29udGV4dCkge1xuICAgIHZhciBmdW5jO1xuICAgIGZvciAodmFyIGkgPSAwLCBsID0gbm9kZWxpc3QubGVuZ3RoOyBpIDwgbDsgaSsrKSB7XG4gICAgICBmdW5jID0gSG9nYW4uY29kZWdlbltub2RlbGlzdFtpXS50YWddO1xuICAgICAgZnVuYyAmJiBmdW5jKG5vZGVsaXN0W2ldLCBjb250ZXh0KTtcbiAgICB9XG4gICAgcmV0dXJuIGNvbnRleHQ7XG4gIH1cblxuICBIb2dhbi5wYXJzZSA9IGZ1bmN0aW9uKHRva2VucywgdGV4dCwgb3B0aW9ucykge1xuICAgIG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9O1xuICAgIHJldHVybiBidWlsZFRyZWUodG9rZW5zLCAnJywgW10sIG9wdGlvbnMuc2VjdGlvblRhZ3MgfHwgW10pO1xuICB9XG5cbiAgSG9nYW4uY2FjaGUgPSB7fTtcblxuICBIb2dhbi5jYWNoZUtleSA9IGZ1bmN0aW9uKHRleHQsIG9wdGlvbnMpIHtcbiAgICByZXR1cm4gW3RleHQsICEhb3B0aW9ucy5hc1N0cmluZywgISFvcHRpb25zLmRpc2FibGVMYW1iZGEsIG9wdGlvbnMuZGVsaW1pdGVycywgISFvcHRpb25zLm1vZGVsR2V0XS5qb2luKCd8fCcpO1xuICB9XG5cbiAgSG9nYW4uY29tcGlsZSA9IGZ1bmN0aW9uKHRleHQsIG9wdGlvbnMpIHtcbiAgICBvcHRpb25zID0gb3B0aW9ucyB8fCB7fTtcbiAgICB2YXIga2V5ID0gSG9nYW4uY2FjaGVLZXkodGV4dCwgb3B0aW9ucyk7XG4gICAgdmFyIHRlbXBsYXRlID0gdGhpcy5jYWNoZVtrZXldO1xuXG4gICAgaWYgKHRlbXBsYXRlKSB7XG4gICAgICB2YXIgcGFydGlhbHMgPSB0ZW1wbGF0ZS5wYXJ0aWFscztcbiAgICAgIGZvciAodmFyIG5hbWUgaW4gcGFydGlhbHMpIHtcbiAgICAgICAgZGVsZXRlIHBhcnRpYWxzW25hbWVdLmluc3RhbmNlO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHRlbXBsYXRlO1xuICAgIH1cblxuICAgIHRlbXBsYXRlID0gdGhpcy5nZW5lcmF0ZSh0aGlzLnBhcnNlKHRoaXMuc2Nhbih0ZXh0LCBvcHRpb25zLmRlbGltaXRlcnMpLCB0ZXh0LCBvcHRpb25zKSwgdGV4dCwgb3B0aW9ucyk7XG4gICAgcmV0dXJuIHRoaXMuY2FjaGVba2V5XSA9IHRlbXBsYXRlO1xuICB9XG59KSh0eXBlb2YgZXhwb3J0cyAhPT0gJ3VuZGVmaW5lZCcgPyBleHBvcnRzIDogSG9nYW4pO1xuIiwiLypcbiAqICBDb3B5cmlnaHQgMjAxMSBUd2l0dGVyLCBJbmMuXG4gKiAgTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcbiAqICB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXG4gKiAgWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XG4gKlxuICogIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxuICpcbiAqICBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXG4gKiAgZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxuICogIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxuICogIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcbiAqICBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cbiAqL1xuXG4vLyBUaGlzIGZpbGUgaXMgZm9yIHVzZSB3aXRoIE5vZGUuanMuIFNlZSBkaXN0LyBmb3IgYnJvd3NlciBmaWxlcy5cblxudmFyIEhvZ2FuID0gcmVxdWlyZSgnLi9jb21waWxlcicpO1xuSG9nYW4uVGVtcGxhdGUgPSByZXF1aXJlKCcuL3RlbXBsYXRlJykuVGVtcGxhdGU7XG5Ib2dhbi50ZW1wbGF0ZSA9IEhvZ2FuLlRlbXBsYXRlO1xubW9kdWxlLmV4cG9ydHMgPSBIb2dhbjtcbiIsIi8qXG4gKiAgQ29weXJpZ2h0IDIwMTEgVHdpdHRlciwgSW5jLlxuICogIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XG4gKiAgeW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxuICogIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxuICpcbiAqICBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcbiAqXG4gKiAgVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxuICogIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcbiAqICBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cbiAqICBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXG4gKiAgbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG4gKi9cblxudmFyIEhvZ2FuID0ge307XG5cbihmdW5jdGlvbiAoSG9nYW4pIHtcbiAgSG9nYW4uVGVtcGxhdGUgPSBmdW5jdGlvbiAoY29kZU9iaiwgdGV4dCwgY29tcGlsZXIsIG9wdGlvbnMpIHtcbiAgICBjb2RlT2JqID0gY29kZU9iaiB8fCB7fTtcbiAgICB0aGlzLnIgPSBjb2RlT2JqLmNvZGUgfHwgdGhpcy5yO1xuICAgIHRoaXMuYyA9IGNvbXBpbGVyO1xuICAgIHRoaXMub3B0aW9ucyA9IG9wdGlvbnMgfHwge307XG4gICAgdGhpcy50ZXh0ID0gdGV4dCB8fCAnJztcbiAgICB0aGlzLnBhcnRpYWxzID0gY29kZU9iai5wYXJ0aWFscyB8fCB7fTtcbiAgICB0aGlzLnN1YnMgPSBjb2RlT2JqLnN1YnMgfHwge307XG4gICAgdGhpcy5idWYgPSAnJztcbiAgfVxuXG4gIEhvZ2FuLlRlbXBsYXRlLnByb3RvdHlwZSA9IHtcbiAgICAvLyByZW5kZXI6IHJlcGxhY2VkIGJ5IGdlbmVyYXRlZCBjb2RlLlxuICAgIHI6IGZ1bmN0aW9uIChjb250ZXh0LCBwYXJ0aWFscywgaW5kZW50KSB7IHJldHVybiAnJzsgfSxcblxuICAgIC8vIHZhcmlhYmxlIGVzY2FwaW5nXG4gICAgdjogaG9nYW5Fc2NhcGUsXG5cbiAgICAvLyB0cmlwbGUgc3RhY2hlXG4gICAgdDogY29lcmNlVG9TdHJpbmcsXG5cbiAgICByZW5kZXI6IGZ1bmN0aW9uIHJlbmRlcihjb250ZXh0LCBwYXJ0aWFscywgaW5kZW50KSB7XG4gICAgICByZXR1cm4gdGhpcy5yaShbY29udGV4dF0sIHBhcnRpYWxzIHx8IHt9LCBpbmRlbnQpO1xuICAgIH0sXG5cbiAgICAvLyByZW5kZXIgaW50ZXJuYWwgLS0gYSBob29rIGZvciBvdmVycmlkZXMgdGhhdCBjYXRjaGVzIHBhcnRpYWxzIHRvb1xuICAgIHJpOiBmdW5jdGlvbiAoY29udGV4dCwgcGFydGlhbHMsIGluZGVudCkge1xuICAgICAgcmV0dXJuIHRoaXMucihjb250ZXh0LCBwYXJ0aWFscywgaW5kZW50KTtcbiAgICB9LFxuXG4gICAgLy8gZW5zdXJlUGFydGlhbFxuICAgIGVwOiBmdW5jdGlvbihzeW1ib2wsIHBhcnRpYWxzKSB7XG4gICAgICB2YXIgcGFydGlhbCA9IHRoaXMucGFydGlhbHNbc3ltYm9sXTtcblxuICAgICAgLy8gY2hlY2sgdG8gc2VlIHRoYXQgaWYgd2UndmUgaW5zdGFudGlhdGVkIHRoaXMgcGFydGlhbCBiZWZvcmVcbiAgICAgIHZhciB0ZW1wbGF0ZSA9IHBhcnRpYWxzW3BhcnRpYWwubmFtZV07XG4gICAgICBpZiAocGFydGlhbC5pbnN0YW5jZSAmJiBwYXJ0aWFsLmJhc2UgPT0gdGVtcGxhdGUpIHtcbiAgICAgICAgcmV0dXJuIHBhcnRpYWwuaW5zdGFuY2U7XG4gICAgICB9XG5cbiAgICAgIGlmICh0eXBlb2YgdGVtcGxhdGUgPT0gJ3N0cmluZycpIHtcbiAgICAgICAgaWYgKCF0aGlzLmMpIHtcbiAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJObyBjb21waWxlciBhdmFpbGFibGUuXCIpO1xuICAgICAgICB9XG4gICAgICAgIHRlbXBsYXRlID0gdGhpcy5jLmNvbXBpbGUodGVtcGxhdGUsIHRoaXMub3B0aW9ucyk7XG4gICAgICB9XG5cbiAgICAgIGlmICghdGVtcGxhdGUpIHtcbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICB9XG5cbiAgICAgIC8vIFdlIHVzZSB0aGlzIHRvIGNoZWNrIHdoZXRoZXIgdGhlIHBhcnRpYWxzIGRpY3Rpb25hcnkgaGFzIGNoYW5nZWRcbiAgICAgIHRoaXMucGFydGlhbHNbc3ltYm9sXS5iYXNlID0gdGVtcGxhdGU7XG5cbiAgICAgIGlmIChwYXJ0aWFsLnN1YnMpIHtcbiAgICAgICAgLy8gTWFrZSBzdXJlIHdlIGNvbnNpZGVyIHBhcmVudCB0ZW1wbGF0ZSBub3dcbiAgICAgICAgaWYgKCFwYXJ0aWFscy5zdGFja1RleHQpIHBhcnRpYWxzLnN0YWNrVGV4dCA9IHt9O1xuICAgICAgICBmb3IgKGtleSBpbiBwYXJ0aWFsLnN1YnMpIHtcbiAgICAgICAgICBpZiAoIXBhcnRpYWxzLnN0YWNrVGV4dFtrZXldKSB7XG4gICAgICAgICAgICBwYXJ0aWFscy5zdGFja1RleHRba2V5XSA9ICh0aGlzLmFjdGl2ZVN1YiAhPT0gdW5kZWZpbmVkICYmIHBhcnRpYWxzLnN0YWNrVGV4dFt0aGlzLmFjdGl2ZVN1Yl0pID8gcGFydGlhbHMuc3RhY2tUZXh0W3RoaXMuYWN0aXZlU3ViXSA6IHRoaXMudGV4dDtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgdGVtcGxhdGUgPSBjcmVhdGVTcGVjaWFsaXplZFBhcnRpYWwodGVtcGxhdGUsIHBhcnRpYWwuc3VicywgcGFydGlhbC5wYXJ0aWFscyxcbiAgICAgICAgICB0aGlzLnN0YWNrU3VicywgdGhpcy5zdGFja1BhcnRpYWxzLCBwYXJ0aWFscy5zdGFja1RleHQpO1xuICAgICAgfVxuICAgICAgdGhpcy5wYXJ0aWFsc1tzeW1ib2xdLmluc3RhbmNlID0gdGVtcGxhdGU7XG5cbiAgICAgIHJldHVybiB0ZW1wbGF0ZTtcbiAgICB9LFxuXG4gICAgLy8gdHJpZXMgdG8gZmluZCBhIHBhcnRpYWwgaW4gdGhlIGN1cnJlbnQgc2NvcGUgYW5kIHJlbmRlciBpdFxuICAgIHJwOiBmdW5jdGlvbihzeW1ib2wsIGNvbnRleHQsIHBhcnRpYWxzLCBpbmRlbnQpIHtcbiAgICAgIHZhciBwYXJ0aWFsID0gdGhpcy5lcChzeW1ib2wsIHBhcnRpYWxzKTtcbiAgICAgIGlmICghcGFydGlhbCkge1xuICAgICAgICByZXR1cm4gJyc7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBwYXJ0aWFsLnJpKGNvbnRleHQsIHBhcnRpYWxzLCBpbmRlbnQpO1xuICAgIH0sXG5cbiAgICAvLyByZW5kZXIgYSBzZWN0aW9uXG4gICAgcnM6IGZ1bmN0aW9uKGNvbnRleHQsIHBhcnRpYWxzLCBzZWN0aW9uKSB7XG4gICAgICB2YXIgdGFpbCA9IGNvbnRleHRbY29udGV4dC5sZW5ndGggLSAxXTtcblxuICAgICAgaWYgKCFpc0FycmF5KHRhaWwpKSB7XG4gICAgICAgIHNlY3Rpb24oY29udGV4dCwgcGFydGlhbHMsIHRoaXMpO1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdGFpbC5sZW5ndGg7IGkrKykge1xuICAgICAgICBjb250ZXh0LnB1c2godGFpbFtpXSk7XG4gICAgICAgIHNlY3Rpb24oY29udGV4dCwgcGFydGlhbHMsIHRoaXMpO1xuICAgICAgICBjb250ZXh0LnBvcCgpO1xuICAgICAgfVxuICAgIH0sXG5cbiAgICAvLyBtYXliZSBzdGFydCBhIHNlY3Rpb25cbiAgICBzOiBmdW5jdGlvbih2YWwsIGN0eCwgcGFydGlhbHMsIGludmVydGVkLCBzdGFydCwgZW5kLCB0YWdzKSB7XG4gICAgICB2YXIgcGFzcztcblxuICAgICAgaWYgKGlzQXJyYXkodmFsKSAmJiB2YWwubGVuZ3RoID09PSAwKSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH1cblxuICAgICAgaWYgKHR5cGVvZiB2YWwgPT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICB2YWwgPSB0aGlzLm1zKHZhbCwgY3R4LCBwYXJ0aWFscywgaW52ZXJ0ZWQsIHN0YXJ0LCBlbmQsIHRhZ3MpO1xuICAgICAgfVxuXG4gICAgICBwYXNzID0gISF2YWw7XG5cbiAgICAgIGlmICghaW52ZXJ0ZWQgJiYgcGFzcyAmJiBjdHgpIHtcbiAgICAgICAgY3R4LnB1c2goKHR5cGVvZiB2YWwgPT0gJ29iamVjdCcpID8gdmFsIDogY3R4W2N0eC5sZW5ndGggLSAxXSk7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBwYXNzO1xuICAgIH0sXG5cbiAgICAvLyBmaW5kIHZhbHVlcyB3aXRoIGRvdHRlZCBuYW1lc1xuICAgIGQ6IGZ1bmN0aW9uKGtleSwgY3R4LCBwYXJ0aWFscywgcmV0dXJuRm91bmQpIHtcbiAgICAgIHZhciBmb3VuZCxcbiAgICAgICAgICBuYW1lcyA9IGtleS5zcGxpdCgnLicpLFxuICAgICAgICAgIHZhbCA9IHRoaXMuZihuYW1lc1swXSwgY3R4LCBwYXJ0aWFscywgcmV0dXJuRm91bmQpLFxuICAgICAgICAgIGRvTW9kZWxHZXQgPSB0aGlzLm9wdGlvbnMubW9kZWxHZXQsXG4gICAgICAgICAgY3ggPSBudWxsO1xuXG4gICAgICBpZiAoa2V5ID09PSAnLicgJiYgaXNBcnJheShjdHhbY3R4Lmxlbmd0aCAtIDJdKSkge1xuICAgICAgICB2YWwgPSBjdHhbY3R4Lmxlbmd0aCAtIDFdO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgZm9yICh2YXIgaSA9IDE7IGkgPCBuYW1lcy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgIGZvdW5kID0gZmluZEluU2NvcGUobmFtZXNbaV0sIHZhbCwgZG9Nb2RlbEdldCk7XG4gICAgICAgICAgaWYgKGZvdW5kICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIGN4ID0gdmFsO1xuICAgICAgICAgICAgdmFsID0gZm91bmQ7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHZhbCA9ICcnO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBpZiAocmV0dXJuRm91bmQgJiYgIXZhbCkge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9XG5cbiAgICAgIGlmICghcmV0dXJuRm91bmQgJiYgdHlwZW9mIHZhbCA9PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgIGN0eC5wdXNoKGN4KTtcbiAgICAgICAgdmFsID0gdGhpcy5tdih2YWwsIGN0eCwgcGFydGlhbHMpO1xuICAgICAgICBjdHgucG9wKCk7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiB2YWw7XG4gICAgfSxcblxuICAgIC8vIGZpbmQgdmFsdWVzIHdpdGggbm9ybWFsIG5hbWVzXG4gICAgZjogZnVuY3Rpb24oa2V5LCBjdHgsIHBhcnRpYWxzLCByZXR1cm5Gb3VuZCkge1xuICAgICAgdmFyIHZhbCA9IGZhbHNlLFxuICAgICAgICAgIHYgPSBudWxsLFxuICAgICAgICAgIGZvdW5kID0gZmFsc2UsXG4gICAgICAgICAgZG9Nb2RlbEdldCA9IHRoaXMub3B0aW9ucy5tb2RlbEdldDtcblxuICAgICAgZm9yICh2YXIgaSA9IGN0eC5sZW5ndGggLSAxOyBpID49IDA7IGktLSkge1xuICAgICAgICB2ID0gY3R4W2ldO1xuICAgICAgICB2YWwgPSBmaW5kSW5TY29wZShrZXksIHYsIGRvTW9kZWxHZXQpO1xuICAgICAgICBpZiAodmFsICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICBmb3VuZCA9IHRydWU7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgaWYgKCFmb3VuZCkge1xuICAgICAgICByZXR1cm4gKHJldHVybkZvdW5kKSA/IGZhbHNlIDogXCJcIjtcbiAgICAgIH1cblxuICAgICAgaWYgKCFyZXR1cm5Gb3VuZCAmJiB0eXBlb2YgdmFsID09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgdmFsID0gdGhpcy5tdih2YWwsIGN0eCwgcGFydGlhbHMpO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gdmFsO1xuICAgIH0sXG5cbiAgICAvLyBoaWdoZXIgb3JkZXIgdGVtcGxhdGVzXG4gICAgbHM6IGZ1bmN0aW9uKGZ1bmMsIGN4LCBwYXJ0aWFscywgdGV4dCwgdGFncykge1xuICAgICAgdmFyIG9sZFRhZ3MgPSB0aGlzLm9wdGlvbnMuZGVsaW1pdGVycztcblxuICAgICAgdGhpcy5vcHRpb25zLmRlbGltaXRlcnMgPSB0YWdzO1xuICAgICAgdGhpcy5iKHRoaXMuY3QoY29lcmNlVG9TdHJpbmcoZnVuYy5jYWxsKGN4LCB0ZXh0KSksIGN4LCBwYXJ0aWFscykpO1xuICAgICAgdGhpcy5vcHRpb25zLmRlbGltaXRlcnMgPSBvbGRUYWdzO1xuXG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfSxcblxuICAgIC8vIGNvbXBpbGUgdGV4dFxuICAgIGN0OiBmdW5jdGlvbih0ZXh0LCBjeCwgcGFydGlhbHMpIHtcbiAgICAgIGlmICh0aGlzLm9wdGlvbnMuZGlzYWJsZUxhbWJkYSkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0xhbWJkYSBmZWF0dXJlcyBkaXNhYmxlZC4nKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiB0aGlzLmMuY29tcGlsZSh0ZXh0LCB0aGlzLm9wdGlvbnMpLnJlbmRlcihjeCwgcGFydGlhbHMpO1xuICAgIH0sXG5cbiAgICAvLyB0ZW1wbGF0ZSByZXN1bHQgYnVmZmVyaW5nXG4gICAgYjogZnVuY3Rpb24ocykgeyB0aGlzLmJ1ZiArPSBzOyB9LFxuXG4gICAgZmw6IGZ1bmN0aW9uKCkgeyB2YXIgciA9IHRoaXMuYnVmOyB0aGlzLmJ1ZiA9ICcnOyByZXR1cm4gcjsgfSxcblxuICAgIC8vIG1ldGhvZCByZXBsYWNlIHNlY3Rpb25cbiAgICBtczogZnVuY3Rpb24oZnVuYywgY3R4LCBwYXJ0aWFscywgaW52ZXJ0ZWQsIHN0YXJ0LCBlbmQsIHRhZ3MpIHtcbiAgICAgIHZhciB0ZXh0U291cmNlLFxuICAgICAgICAgIGN4ID0gY3R4W2N0eC5sZW5ndGggLSAxXSxcbiAgICAgICAgICByZXN1bHQgPSBmdW5jLmNhbGwoY3gpO1xuXG4gICAgICBpZiAodHlwZW9mIHJlc3VsdCA9PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgIGlmIChpbnZlcnRlZCkge1xuICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHRleHRTb3VyY2UgPSAodGhpcy5hY3RpdmVTdWIgJiYgdGhpcy5zdWJzVGV4dCAmJiB0aGlzLnN1YnNUZXh0W3RoaXMuYWN0aXZlU3ViXSkgPyB0aGlzLnN1YnNUZXh0W3RoaXMuYWN0aXZlU3ViXSA6IHRoaXMudGV4dDtcbiAgICAgICAgICByZXR1cm4gdGhpcy5scyhyZXN1bHQsIGN4LCBwYXJ0aWFscywgdGV4dFNvdXJjZS5zdWJzdHJpbmcoc3RhcnQsIGVuZCksIHRhZ3MpO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfSxcblxuICAgIC8vIG1ldGhvZCByZXBsYWNlIHZhcmlhYmxlXG4gICAgbXY6IGZ1bmN0aW9uKGZ1bmMsIGN0eCwgcGFydGlhbHMpIHtcbiAgICAgIHZhciBjeCA9IGN0eFtjdHgubGVuZ3RoIC0gMV07XG4gICAgICB2YXIgcmVzdWx0ID0gZnVuYy5jYWxsKGN4KTtcblxuICAgICAgaWYgKHR5cGVvZiByZXN1bHQgPT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICByZXR1cm4gdGhpcy5jdChjb2VyY2VUb1N0cmluZyhyZXN1bHQuY2FsbChjeCkpLCBjeCwgcGFydGlhbHMpO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH0sXG5cbiAgICBzdWI6IGZ1bmN0aW9uKG5hbWUsIGNvbnRleHQsIHBhcnRpYWxzLCBpbmRlbnQpIHtcbiAgICAgIHZhciBmID0gdGhpcy5zdWJzW25hbWVdO1xuICAgICAgaWYgKGYpIHtcbiAgICAgICAgdGhpcy5hY3RpdmVTdWIgPSBuYW1lO1xuICAgICAgICBmKGNvbnRleHQsIHBhcnRpYWxzLCB0aGlzLCBpbmRlbnQpO1xuICAgICAgICB0aGlzLmFjdGl2ZVN1YiA9IGZhbHNlO1xuICAgICAgfVxuICAgIH1cblxuICB9O1xuXG4gIC8vRmluZCBhIGtleSBpbiBhbiBvYmplY3RcbiAgZnVuY3Rpb24gZmluZEluU2NvcGUoa2V5LCBzY29wZSwgZG9Nb2RlbEdldCkge1xuICAgIHZhciB2YWw7XG5cbiAgICBpZiAoc2NvcGUgJiYgdHlwZW9mIHNjb3BlID09ICdvYmplY3QnKSB7XG5cbiAgICAgIGlmIChzY29wZVtrZXldICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgdmFsID0gc2NvcGVba2V5XTtcblxuICAgICAgLy8gdHJ5IGxvb2t1cCB3aXRoIGdldCBmb3IgYmFja2JvbmUgb3Igc2ltaWxhciBtb2RlbCBkYXRhXG4gICAgICB9IGVsc2UgaWYgKGRvTW9kZWxHZXQgJiYgc2NvcGUuZ2V0ICYmIHR5cGVvZiBzY29wZS5nZXQgPT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICB2YWwgPSBzY29wZS5nZXQoa2V5KTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gdmFsO1xuICB9XG5cbiAgZnVuY3Rpb24gY3JlYXRlU3BlY2lhbGl6ZWRQYXJ0aWFsKGluc3RhbmNlLCBzdWJzLCBwYXJ0aWFscywgc3RhY2tTdWJzLCBzdGFja1BhcnRpYWxzLCBzdGFja1RleHQpIHtcbiAgICBmdW5jdGlvbiBQYXJ0aWFsVGVtcGxhdGUoKSB7fTtcbiAgICBQYXJ0aWFsVGVtcGxhdGUucHJvdG90eXBlID0gaW5zdGFuY2U7XG4gICAgZnVuY3Rpb24gU3Vic3RpdHV0aW9ucygpIHt9O1xuICAgIFN1YnN0aXR1dGlvbnMucHJvdG90eXBlID0gaW5zdGFuY2Uuc3VicztcbiAgICB2YXIga2V5O1xuICAgIHZhciBwYXJ0aWFsID0gbmV3IFBhcnRpYWxUZW1wbGF0ZSgpO1xuICAgIHBhcnRpYWwuc3VicyA9IG5ldyBTdWJzdGl0dXRpb25zKCk7XG4gICAgcGFydGlhbC5zdWJzVGV4dCA9IHt9OyAgLy9oZWhlLiBzdWJzdGV4dC5cbiAgICBwYXJ0aWFsLmJ1ZiA9ICcnO1xuXG4gICAgc3RhY2tTdWJzID0gc3RhY2tTdWJzIHx8IHt9O1xuICAgIHBhcnRpYWwuc3RhY2tTdWJzID0gc3RhY2tTdWJzO1xuICAgIHBhcnRpYWwuc3Vic1RleHQgPSBzdGFja1RleHQ7XG4gICAgZm9yIChrZXkgaW4gc3Vicykge1xuICAgICAgaWYgKCFzdGFja1N1YnNba2V5XSkgc3RhY2tTdWJzW2tleV0gPSBzdWJzW2tleV07XG4gICAgfVxuICAgIGZvciAoa2V5IGluIHN0YWNrU3Vicykge1xuICAgICAgcGFydGlhbC5zdWJzW2tleV0gPSBzdGFja1N1YnNba2V5XTtcbiAgICB9XG5cbiAgICBzdGFja1BhcnRpYWxzID0gc3RhY2tQYXJ0aWFscyB8fCB7fTtcbiAgICBwYXJ0aWFsLnN0YWNrUGFydGlhbHMgPSBzdGFja1BhcnRpYWxzO1xuICAgIGZvciAoa2V5IGluIHBhcnRpYWxzKSB7XG4gICAgICBpZiAoIXN0YWNrUGFydGlhbHNba2V5XSkgc3RhY2tQYXJ0aWFsc1trZXldID0gcGFydGlhbHNba2V5XTtcbiAgICB9XG4gICAgZm9yIChrZXkgaW4gc3RhY2tQYXJ0aWFscykge1xuICAgICAgcGFydGlhbC5wYXJ0aWFsc1trZXldID0gc3RhY2tQYXJ0aWFsc1trZXldO1xuICAgIH1cblxuICAgIHJldHVybiBwYXJ0aWFsO1xuICB9XG5cbiAgdmFyIHJBbXAgPSAvJi9nLFxuICAgICAgckx0ID0gLzwvZyxcbiAgICAgIHJHdCA9IC8+L2csXG4gICAgICByQXBvcyA9IC9cXCcvZyxcbiAgICAgIHJRdW90ID0gL1xcXCIvZyxcbiAgICAgIGhDaGFycyA9IC9bJjw+XFxcIlxcJ10vO1xuXG4gIGZ1bmN0aW9uIGNvZXJjZVRvU3RyaW5nKHZhbCkge1xuICAgIHJldHVybiBTdHJpbmcoKHZhbCA9PT0gbnVsbCB8fCB2YWwgPT09IHVuZGVmaW5lZCkgPyAnJyA6IHZhbCk7XG4gIH1cblxuICBmdW5jdGlvbiBob2dhbkVzY2FwZShzdHIpIHtcbiAgICBzdHIgPSBjb2VyY2VUb1N0cmluZyhzdHIpO1xuICAgIHJldHVybiBoQ2hhcnMudGVzdChzdHIpID9cbiAgICAgIHN0clxuICAgICAgICAucmVwbGFjZShyQW1wLCAnJmFtcDsnKVxuICAgICAgICAucmVwbGFjZShyTHQsICcmbHQ7JylcbiAgICAgICAgLnJlcGxhY2Uockd0LCAnJmd0OycpXG4gICAgICAgIC5yZXBsYWNlKHJBcG9zLCAnJiMzOTsnKVxuICAgICAgICAucmVwbGFjZShyUXVvdCwgJyZxdW90OycpIDpcbiAgICAgIHN0cjtcbiAgfVxuXG4gIHZhciBpc0FycmF5ID0gQXJyYXkuaXNBcnJheSB8fCBmdW5jdGlvbihhKSB7XG4gICAgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbChhKSA9PT0gJ1tvYmplY3QgQXJyYXldJztcbiAgfTtcblxufSkodHlwZW9mIGV4cG9ydHMgIT09ICd1bmRlZmluZWQnID8gZXhwb3J0cyA6IEhvZ2FuKTtcbiIsInZhciBET00gPSAvKiogQGNsYXNzICovIChmdW5jdGlvbiAoKSB7XHJcbiAgICBmdW5jdGlvbiBET00oc2VsZWN0b3IsIHRhcmdldCkge1xyXG4gICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XHJcbiAgICAgICAgaWYgKHRhcmdldCA9PT0gdm9pZCAwKSB7IHRhcmdldCA9IGRvY3VtZW50OyB9XHJcbiAgICAgICAgdGhpcy53cmFwcGVyID0gW107XHJcbiAgICAgICAgaWYgKHR5cGVvZiBzZWxlY3RvciA9PT0gJ3N0cmluZycpIHtcclxuICAgICAgICAgICAgdGFyZ2V0LnF1ZXJ5U2VsZWN0b3JBbGwoc2VsZWN0b3IpLmZvckVhY2goZnVuY3Rpb24gKE5vZGVFbGVtZW50KSB7XHJcbiAgICAgICAgICAgICAgICBfdGhpcy53cmFwcGVyLnB1c2goTm9kZUVsZW1lbnQpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMud3JhcHBlciA9IFtzZWxlY3Rvcl07XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgRE9NLnByb3RvdHlwZS5nZXQgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMud3JhcHBlclswXTtcclxuICAgIH07XHJcbiAgICBET00ucHJvdG90eXBlLmh0bWwgPSBmdW5jdGlvbiAoaHRtbCkge1xyXG4gICAgICAgIGlmIChodG1sID09PSB2b2lkIDApIHsgaHRtbCA9IG51bGw7IH1cclxuICAgICAgICB2YXIgcmVzcG9uc2UgPSB0aGlzLndyYXBwZXJbMF0gPyB0aGlzLndyYXBwZXJbMF0uaW5uZXJIVE1MIDogbnVsbDtcclxuICAgICAgICB0aGlzLndyYXBwZXIuZm9yRWFjaChmdW5jdGlvbiAoV3JhcHBlclRtcCkge1xyXG4gICAgICAgICAgICBpZiAoaHRtbCAhPT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgV3JhcHBlclRtcC5pbm5lckhUTUwgPSBodG1sO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgcmV0dXJuIHJlc3BvbnNlO1xyXG4gICAgfTtcclxuICAgIERPTS5wcm90b3R5cGUuYWRkQ2xhc3MgPSBmdW5jdGlvbiAoX2NsYXNzKSB7XHJcbiAgICAgICAgdmFyIF90aGlzID0gdGhpcztcclxuICAgICAgICB0aGlzLndyYXBwZXIuZm9yRWFjaChmdW5jdGlvbiAoV3JhcHBlclRtcCkge1xyXG4gICAgICAgICAgICB2YXIgZmluYWxDbGFzc2VzID0gW107XHJcbiAgICAgICAgICAgIFdyYXBwZXJUbXAuY2xhc3NMaXN0LmZvckVhY2goZnVuY3Rpb24gKF9jbGFzc1RtcCkge1xyXG4gICAgICAgICAgICAgICAgZmluYWxDbGFzc2VzLnB1c2goX2NsYXNzVG1wKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIGZpbmFsQ2xhc3Nlcy5wdXNoKF9jbGFzcyk7XHJcbiAgICAgICAgICAgIF90aGlzLnNldENsYXNzZXMoV3JhcHBlclRtcCwgZmluYWxDbGFzc2VzKTtcclxuICAgICAgICB9KTtcclxuICAgICAgICByZXR1cm4gdGhpcy53cmFwcGVyWzBdIHx8IG51bGw7XHJcbiAgICB9O1xyXG4gICAgRE9NLnByb3RvdHlwZS5yZW1vdmVDbGFzcyA9IGZ1bmN0aW9uIChfY2xhc3MpIHtcclxuICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xyXG4gICAgICAgIHRoaXMud3JhcHBlci5mb3JFYWNoKGZ1bmN0aW9uIChXcmFwcGVyVG1wKSB7XHJcbiAgICAgICAgICAgIHZhciBmaW5hbENsYXNzZXMgPSBbXTtcclxuICAgICAgICAgICAgV3JhcHBlclRtcC5jbGFzc0xpc3QuZm9yRWFjaChmdW5jdGlvbiAoX2NsYXNzVG1wKSB7XHJcbiAgICAgICAgICAgICAgICBfY2xhc3MgIT09IF9jbGFzc1RtcCAmJiBmaW5hbENsYXNzZXMucHVzaChfY2xhc3NUbXApO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgX3RoaXMuc2V0Q2xhc3NlcyhXcmFwcGVyVG1wLCBmaW5hbENsYXNzZXMpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHJldHVybiB0aGlzLndyYXBwZXJbMF0gfHwgbnVsbDtcclxuICAgIH07XHJcbiAgICBET00ucHJvdG90eXBlLnNldENsYXNzZXMgPSBmdW5jdGlvbiAoV3JhcHBlciwgY2xhc3Nlcykge1xyXG4gICAgICAgIFdyYXBwZXIuY2xhc3NOYW1lID0gY2xhc3Nlcy5qb2luKCcgJyk7XHJcbiAgICAgICAgcmV0dXJuIFdyYXBwZXI7XHJcbiAgICB9O1xyXG4gICAgcmV0dXJuIERPTTtcclxufSgpKTtcclxuZXhwb3J0IHsgRE9NIH07XHJcbiIsImltcG9ydCB7IEV2ZW50Q2FsbGJhY2sgfSBmcm9tIFwiLi9FdmVudENhbGxiYWNrXCI7XHJcbmltcG9ydCB7IFRvb2xzIH0gZnJvbSBcIi4vVG9vbHNcIjtcclxudmFyIEV2ZW50ID0gLyoqIEBjbGFzcyAqLyAoZnVuY3Rpb24gKCkge1xyXG4gICAgZnVuY3Rpb24gRXZlbnQoKSB7XHJcbiAgICAgICAgdGhpcy5ldmVudHMgPSB7fTtcclxuICAgICAgICB0aGlzLmNhbGxiYWNrc0lkc1NldCA9IHt9O1xyXG4gICAgICAgIHRoaXMuY2FsbGJhY2tJZCA9IDE7XHJcbiAgICAgICAgdGhpcy5KUGlja2VySSA9IG51bGw7XHJcbiAgICB9XHJcbiAgICBFdmVudC5nZXQgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgaWYgKEV2ZW50Lkluc3RhbmNlID09PSBudWxsKSB7XHJcbiAgICAgICAgICAgIEV2ZW50Lkluc3RhbmNlID0gbmV3IEV2ZW50O1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gRXZlbnQuSW5zdGFuY2U7XHJcbiAgICB9O1xyXG4gICAgRXZlbnQucHJvdG90eXBlLnNldEpQaWNrZXIgPSBmdW5jdGlvbiAoSlBpY2tlckkpIHtcclxuICAgICAgICB0aGlzLkpQaWNrZXJJID0gSlBpY2tlckk7XHJcbiAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICB9O1xyXG4gICAgRXZlbnQucHJvdG90eXBlLmFkZExpc3RlbmVyID0gZnVuY3Rpb24gKGtleSwgY2FsbGJhY2spIHtcclxuICAgICAgICB2YXIgY3VycmVudENhbGxiYWNrSWQgPSB0aGlzLmNhbGxiYWNrSWQ7XHJcbiAgICAgICAgdGhpcy5jYWxsYmFja0lkKys7XHJcbiAgICAgICAgaWYgKHR5cGVvZiB0aGlzLmV2ZW50c1trZXldID09PSAndW5kZWZpbmVkJykge1xyXG4gICAgICAgICAgICB0aGlzLmV2ZW50c1trZXldID0gbmV3IEV2ZW50Q2FsbGJhY2soa2V5KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5ldmVudHNba2V5XS5hZGRDYWxsYmFjayhjYWxsYmFjaywgY3VycmVudENhbGxiYWNrSWQpO1xyXG4gICAgICAgIHRoaXMuY2FsbGJhY2tzSWRzU2V0W2N1cnJlbnRDYWxsYmFja0lkXSA9IGtleTtcclxuICAgICAgICByZXR1cm4gY3VycmVudENhbGxiYWNrSWQ7XHJcbiAgICB9O1xyXG4gICAgRXZlbnQucHJvdG90eXBlLnJlbW92ZUxpc3RlbmVyID0gZnVuY3Rpb24gKGNhbGxiYWNrSWQpIHtcclxuICAgICAgICB2YXIga2V5ID0gdGhpcy5jYWxsYmFja3NJZHNTZXRbY2FsbGJhY2tJZF0gfHwgJyc7XHJcbiAgICAgICAgaWYgKHR5cGVvZiB0aGlzLmV2ZW50c1trZXldICE9PSAndW5kZWZpbmVkJykge1xyXG4gICAgICAgICAgICB0aGlzLmV2ZW50c1trZXldLnJlbW92ZUxpc3RlbmVyKGNhbGxiYWNrSWQpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdGhpcztcclxuICAgIH07XHJcbiAgICBFdmVudC5wcm90b3R5cGUudHJpZ2dlciA9IGZ1bmN0aW9uIChrZXkpIHtcclxuICAgICAgICB2YXIgYXJncyA9IFtdO1xyXG4gICAgICAgIGZvciAodmFyIF9pID0gMTsgX2kgPCBhcmd1bWVudHMubGVuZ3RoOyBfaSsrKSB7XHJcbiAgICAgICAgICAgIGFyZ3NbX2kgLSAxXSA9IGFyZ3VtZW50c1tfaV07XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChUb29scy5kKHRoaXMuZXZlbnRzW2tleV0pKSB7XHJcbiAgICAgICAgICAgIHRoaXMuZXZlbnRzW2tleV0ucnVuKGFyZ3MpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgVG9vbHMuZXJyb3IoJ0V2ZW50ICcgKyBrZXkgKyAnIGlzIG5vdCBkZWZpbmVkJyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgfTtcclxuICAgIEV2ZW50Lkluc3RhbmNlID0gbnVsbDtcclxuICAgIHJldHVybiBFdmVudDtcclxufSgpKTtcclxuZXhwb3J0IHsgRXZlbnQgfTtcclxuIiwidmFyIEV2ZW50Q2FsbGJhY2sgPSAvKiogQGNsYXNzICovIChmdW5jdGlvbiAoKSB7XHJcbiAgICBmdW5jdGlvbiBFdmVudENhbGxiYWNrKGtleSkge1xyXG4gICAgICAgIHRoaXMuY2FsbGJhY2tzID0gW107XHJcbiAgICAgICAgdGhpcy5jYWxsYmFja3NJbmRleCA9IHt9O1xyXG4gICAgICAgIHRoaXMua2V5ID0ga2V5O1xyXG4gICAgfVxyXG4gICAgRXZlbnRDYWxsYmFjay5wcm90b3R5cGUucnVuID0gZnVuY3Rpb24gKGFyZ3MpIHtcclxuICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xyXG4gICAgICAgIGlmIChhcmdzID09PSB2b2lkIDApIHsgYXJncyA9IFtdOyB9XHJcbiAgICAgICAgdGhpcy5jYWxsYmFja3MuZm9yRWFjaChmdW5jdGlvbiAoY2FsbGJhY2spIHtcclxuICAgICAgICAgICAgY2FsbGJhY2suYXBwbHkoX3RoaXMsIGFyZ3MpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgfTtcclxuICAgIEV2ZW50Q2FsbGJhY2sucHJvdG90eXBlLmFkZENhbGxiYWNrID0gZnVuY3Rpb24gKGNhbGxiYWNrLCBjYWxsYmFja0lkKSB7XHJcbiAgICAgICAgdGhpcy5jYWxsYmFja3NJbmRleFtjYWxsYmFja0lkXSA9IHRoaXMuY2FsbGJhY2tzLnB1c2goY2FsbGJhY2spIC0gMTtcclxuICAgICAgICByZXR1cm4gdGhpcztcclxuICAgIH07XHJcbiAgICBFdmVudENhbGxiYWNrLnByb3RvdHlwZS5yZW1vdmVFdmVudCA9IGZ1bmN0aW9uIChjYWxsYmFja0lkKSB7XHJcbiAgICAgICAgdmFyIGluZGV4ID0gdGhpcy5jYWxsYmFja3NJbmRleFtjYWxsYmFja0lkXSB8fCAtMTtcclxuICAgICAgICBpZiAoaW5kZXggPiAtMSkge1xyXG4gICAgICAgICAgICB0aGlzLmNhbGxiYWNrcy5zcGxpY2UoaW5kZXgsIDEpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBkZWxldGUgdGhpcy5jYWxsYmFja3NJbmRleFtjYWxsYmFja0lkXTtcclxuICAgICAgICByZXR1cm4gdGhpcztcclxuICAgIH07XHJcbiAgICByZXR1cm4gRXZlbnRDYWxsYmFjaztcclxufSgpKTtcclxuZXhwb3J0IHsgRXZlbnRDYWxsYmFjayB9O1xyXG4iLCJleHBvcnQgdmFyIE5FWFRfTU9OVEhfQ0xJQ0sgPSAnb25OZXh0TW9udGhDbGljayc7XHJcbmV4cG9ydCB2YXIgUFJFVl9NT05USF9DTElDSyA9ICdvblByZXZNb250aENsaWNrJztcclxuZXhwb3J0IHZhciBEQVlfQ0xJQ0sgPSAnb25EYXlDbGljayc7XHJcbmV4cG9ydCB2YXIgREFZX01PVVNFX0VOVEVSID0gJ29uRGF5TW91c2VFbnRlcic7XHJcbmV4cG9ydCB2YXIgREFZX01PVVNFX0xFQVZFID0gJ29uRGF5TW91c2VMZWF2ZSc7XHJcbmV4cG9ydCB2YXIgUkFOR0VfQ0xJQ0sgPSAnb25SYW5nZUNsaWNrJztcclxuZXhwb3J0IHZhciBWQUxVRV9DTElDSyA9ICdvblZhbHVlQ2xpY2snO1xyXG4iLCJpbXBvcnQgeyBUb29scyB9IGZyb20gXCIuL1Rvb2xzXCI7XHJcbmltcG9ydCB7IEpQaWNrZXJSYW5nZXNDb25maWcgfSBmcm9tIFwiLi9KUGlja2VyUmFuZ2VzQ29uZmlnXCI7XHJcbnZhciBKUGlja2VyQ29uZmlnID0gLyoqIEBjbGFzcyAqLyAoZnVuY3Rpb24gKCkge1xyXG4gICAgZnVuY3Rpb24gSlBpY2tlckNvbmZpZygpIHtcclxuICAgICAgICB0aGlzLmNvbmZpZyA9IHt9O1xyXG4gICAgfVxyXG4gICAgSlBpY2tlckNvbmZpZy5nZXQgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgaWYgKEpQaWNrZXJDb25maWcuSW5zdGFuY2UgPT09IG51bGwpIHtcclxuICAgICAgICAgICAgSlBpY2tlckNvbmZpZy5JbnN0YW5jZSA9IG5ldyBKUGlja2VyQ29uZmlnO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gSlBpY2tlckNvbmZpZy5JbnN0YW5jZTtcclxuICAgIH07XHJcbiAgICBKUGlja2VyQ29uZmlnLnByb3RvdHlwZS5zZXRDb25maWcgPSBmdW5jdGlvbiAoY29uZmlnKSB7XHJcbiAgICAgICAgaWYgKGNvbmZpZyA9PT0gdm9pZCAwKSB7IGNvbmZpZyA9IG51bGw7IH1cclxuICAgICAgICBpZiAoY29uZmlnICE9PSBudWxsICYmIHR5cGVvZiBjb25maWcgPT09ICdvYmplY3QnKSB7XHJcbiAgICAgICAgICAgIGZvciAodmFyIGtleSBpbiBjb25maWcpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuY29uZmlnW2tleV0gPSBjb25maWdba2V5XTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdGhpcztcclxuICAgIH07XHJcbiAgICBKUGlja2VyQ29uZmlnLnByb3RvdHlwZS5nZXRUZXh0VmFsdWUgPSBmdW5jdGlvbiAoa2V5KSB7XHJcbiAgICAgICAgcmV0dXJuICh0aGlzLmNvbmZpZ1trZXldIHx8ICcnKS50b1N0cmluZygpO1xyXG4gICAgfTtcclxuICAgIEpQaWNrZXJDb25maWcucHJvdG90eXBlLmdldE9iamVjdFZhbHVlID0gZnVuY3Rpb24gKGtleSkge1xyXG4gICAgICAgIHZhciByZXN1bHQgPSB0aGlzLmNvbmZpZ1trZXldIHx8IHt9O1xyXG4gICAgICAgIGlmICh0eXBlb2YgcmVzdWx0ICE9PSAnb2JqZWN0Jykge1xyXG4gICAgICAgICAgICBUb29scy5lcnJvcignV3JvbmcgdmFsdWUgaW4gY29uZmlnIGZvciBmaWVsZCBcIicgKyBrZXkgKyAnXCInKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcclxuICAgIH07XHJcbiAgICBKUGlja2VyQ29uZmlnLnByb3RvdHlwZS5pc1JhbmdlID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmNvbmZpZy5yYW5nZSB8fCBmYWxzZTtcclxuICAgIH07XHJcbiAgICBKUGlja2VyQ29uZmlnLnByb3RvdHlwZS5nZXRXcmFwcGVyID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmNvbmZpZy53cmFwcGVyIHx8ICcnO1xyXG4gICAgfTtcclxuICAgIEpQaWNrZXJDb25maWcucHJvdG90eXBlLmdldFRvZGF5ID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHJldHVybiBUb29scy5nZXREYXRlKHRoaXMuY29uZmlnLnRvZGF5LCBuZXcgRGF0ZSk7XHJcbiAgICB9O1xyXG4gICAgSlBpY2tlckNvbmZpZy5wcm90b3R5cGUuZ2V0Q3VycmVudFZhbHVlID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHZhciB2YWx1ZSA9IHRoaXMuY29uZmlnLmN1cnJlbnREYXRlLCBkYXRlID0gVG9vbHMuZ2V0RGF0ZSh2YWx1ZSksIHJlc3VsdCA9IFtdLCBkYXRlMSwgZGF0ZTIsIHRpbWUxLCB0aW1lMjtcclxuICAgICAgICBpZiAoZGF0ZSAhPT0gbnVsbCkge1xyXG4gICAgICAgICAgICByZXN1bHQucHVzaChkYXRlKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSBpZiAoVG9vbHMuaXNBcnJheSh2YWx1ZSkpIHtcclxuICAgICAgICAgICAgZGF0ZTEgPSBUb29scy5nZXREYXRlKHZhbHVlWzBdKTtcclxuICAgICAgICAgICAgZGF0ZTIgPSBUb29scy5nZXREYXRlKHZhbHVlWzFdKTtcclxuICAgICAgICAgICAgaWYgKGRhdGUxICE9PSBudWxsICYmIGRhdGUyICE9PSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICByZXN1bHQucHVzaChkYXRlMSwgZGF0ZTIpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChyZXN1bHQubGVuZ3RoID09PSAwKSB7XHJcbiAgICAgICAgICAgIHJlc3VsdC5wdXNoKHRoaXMuZ2V0VG9kYXkoKSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICh0aGlzLmlzUmFuZ2UoKSAmJiBUb29scy51KHJlc3VsdFsxXSkpIHtcclxuICAgICAgICAgICAgdGltZTEgPSByZXN1bHRbMF0uZ2V0VGltZSgpO1xyXG4gICAgICAgICAgICB0aW1lMiA9IHRpbWUxICsgKDI0ICogMzYwMCAqIDEwMDApO1xyXG4gICAgICAgICAgICByZXN1bHRbMV0gPSBuZXcgRGF0ZSh0aW1lMik7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiByZXN1bHQ7XHJcbiAgICB9O1xyXG4gICAgSlBpY2tlckNvbmZpZy5wcm90b3R5cGUuZ2V0TW9udGhzID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmNvbmZpZy5tb250aHMgfHwgW1xyXG4gICAgICAgICAgICAnSmFudWFyeScsXHJcbiAgICAgICAgICAgICdGZWJydWFyeScsXHJcbiAgICAgICAgICAgICdNYXJjaCcsXHJcbiAgICAgICAgICAgICdBcHJpbCcsXHJcbiAgICAgICAgICAgICdNYXknLFxyXG4gICAgICAgICAgICAnSnVuZScsXHJcbiAgICAgICAgICAgICdKdWx5JyxcclxuICAgICAgICAgICAgJ0F1Z3VzdCcsXHJcbiAgICAgICAgICAgICdTZXB0ZW1iZXInLFxyXG4gICAgICAgICAgICAnT2N0b2JlcicsXHJcbiAgICAgICAgICAgICdOb3ZlbWJlcicsXHJcbiAgICAgICAgICAgICdEZWNlbWJlcicsXHJcbiAgICAgICAgXTtcclxuICAgIH07XHJcbiAgICBKUGlja2VyQ29uZmlnLnByb3RvdHlwZS5nZXRXZWVrc0RheXMgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuY29uZmlnLndlZWtEYXlzIHx8IFtcclxuICAgICAgICAgICAgJ01vJyxcclxuICAgICAgICAgICAgJ1R1JyxcclxuICAgICAgICAgICAgJ1dlJyxcclxuICAgICAgICAgICAgJ1RoJyxcclxuICAgICAgICAgICAgJ0ZyJyxcclxuICAgICAgICAgICAgJ1NhdCcsXHJcbiAgICAgICAgICAgICdTdW4nLFxyXG4gICAgICAgIF07XHJcbiAgICB9O1xyXG4gICAgSlBpY2tlckNvbmZpZy5wcm90b3R5cGUuc2hvd1Jhbmdlc1ByZWRlZmluZWQgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuaXNSYW5nZSgpICYmXHJcbiAgICAgICAgICAgICgoVG9vbHMuaXNBcnJheSh0aGlzLmNvbmZpZy5yYW5nZXNTZXQpICYmIHRoaXMuY29uZmlnLnJhbmdlc1NldC5sZW5ndGggPiAwKVxyXG4gICAgICAgICAgICAgICAgfHwgVG9vbHMudSh0aGlzLmNvbmZpZy5yYW5nZXNTZXQpKTtcclxuICAgIH07XHJcbiAgICBKUGlja2VyQ29uZmlnLnByb3RvdHlwZS5nZXRSYW5nZXNTZXQgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgdmFyIHJhbmdlc1NldCA9IHRoaXMuY29uZmlnLnJhbmdlc1NldDtcclxuICAgICAgICBpZiAodGhpcy5zaG93UmFuZ2VzUHJlZGVmaW5lZCgpKSB7XHJcbiAgICAgICAgICAgIGlmIChUb29scy51KHJhbmdlc1NldCkpIHtcclxuICAgICAgICAgICAgICAgIHJhbmdlc1NldCA9IG51bGw7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIChuZXcgSlBpY2tlclJhbmdlc0NvbmZpZyh0aGlzLmNvbmZpZy5yYW5nZXNTZXQpKS5nZXRSYW5nZXMoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIFtdO1xyXG4gICAgfTtcclxuICAgIEpQaWNrZXJDb25maWcucHJvdG90eXBlLmdldFJhbmdlc0xhYmVsID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHZhciBkZWZhdWx0TGFiZWxzID0ge30sIHJlc3VsdCA9IHRoaXMuY29uZmlnLnJhbmdlc0xhYmVscyB8fCB7fTtcclxuICAgICAgICBkZWZhdWx0TGFiZWxzW0pQaWNrZXJSYW5nZXNDb25maWcuVEhJU19XRUVLXSA9ICdUaGlzIHdlZWsnO1xyXG4gICAgICAgIGRlZmF1bHRMYWJlbHNbSlBpY2tlclJhbmdlc0NvbmZpZy5MQVNUX1dFRUtdID0gJ0xhc3Qgd2Vlayc7XHJcbiAgICAgICAgZGVmYXVsdExhYmVsc1tKUGlja2VyUmFuZ2VzQ29uZmlnLk5FWFRfV0VFS10gPSAnTmV4dCB3ZWVrJztcclxuICAgICAgICBkZWZhdWx0TGFiZWxzW0pQaWNrZXJSYW5nZXNDb25maWcuTEFTVF8zX0RBWVNdID0gJ0xhc3QgMyBkYXlzJztcclxuICAgICAgICBkZWZhdWx0TGFiZWxzW0pQaWNrZXJSYW5nZXNDb25maWcuTEFTVF83X0RBWVNdID0gJ0xhc3QgNyBkYXlzJztcclxuICAgICAgICBkZWZhdWx0TGFiZWxzW0pQaWNrZXJSYW5nZXNDb25maWcuTEFTVF8zMF9EQVlTXSA9ICdMYXN0IDMwIGRheXMnO1xyXG4gICAgICAgIGRlZmF1bHRMYWJlbHNbSlBpY2tlclJhbmdlc0NvbmZpZy5USElTX01PTlRIXSA9ICdUaGlzIG1vbnRoJztcclxuICAgICAgICBkZWZhdWx0TGFiZWxzW0pQaWNrZXJSYW5nZXNDb25maWcuTEFTVF9NT05USF0gPSAnTGFzdCBtb250aCc7XHJcbiAgICAgICAgZGVmYXVsdExhYmVsc1tKUGlja2VyUmFuZ2VzQ29uZmlnLk5FWFRfTU9OVEhdID0gJ05leHQgbW9udGgnO1xyXG4gICAgICAgIGRlZmF1bHRMYWJlbHNbSlBpY2tlclJhbmdlc0NvbmZpZy5USElTX1FVQVJURVJdID0gJ1RoaXMgcXVhcnRlcic7XHJcbiAgICAgICAgZGVmYXVsdExhYmVsc1tKUGlja2VyUmFuZ2VzQ29uZmlnLkxBU1RfUVVBUlRFUl0gPSAnTGFzdCBxdWFydGVyJztcclxuICAgICAgICBkZWZhdWx0TGFiZWxzW0pQaWNrZXJSYW5nZXNDb25maWcuTkVYVF9RVUFSVEVSXSA9ICdOZXh0IHF1YXJ0ZXInO1xyXG4gICAgICAgIGZvciAodmFyIGtleSBpbiBkZWZhdWx0TGFiZWxzKSB7XHJcbiAgICAgICAgICAgIGlmIChUb29scy51KHJlc3VsdFtrZXldKSkge1xyXG4gICAgICAgICAgICAgICAgcmVzdWx0W2tleV0gPSBkZWZhdWx0TGFiZWxzW2tleV07XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcclxuICAgIH07XHJcbiAgICBKUGlja2VyQ29uZmlnLnByb3RvdHlwZS5nZXRSYW5nZXNUaXRsZSA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5jb25maWcucmFuZ2VzVGl0bGUgfHwgJ0Nob29zZSByYW5nZSc7XHJcbiAgICB9O1xyXG4gICAgSlBpY2tlckNvbmZpZy5JbnN0YW5jZSA9IG51bGw7XHJcbiAgICByZXR1cm4gSlBpY2tlckNvbmZpZztcclxufSgpKTtcclxuZXhwb3J0IHsgSlBpY2tlckNvbmZpZyB9O1xyXG4iLCJpbXBvcnQgeyBUb29scyB9IGZyb20gXCIuL1Rvb2xzXCI7XHJcbmltcG9ydCB7IEpQaWNrZXJDb25maWcgfSBmcm9tIFwiLi9KUGlja2VyQ29uZmlnXCI7XHJcbnZhciBKUGlja2VyUmFuZ2VzQ29uZmlnID0gLyoqIEBjbGFzcyAqLyAoZnVuY3Rpb24gKCkge1xyXG4gICAgZnVuY3Rpb24gSlBpY2tlclJhbmdlc0NvbmZpZyh1c2VyUmFuZ2VzKSB7XHJcbiAgICAgICAgdGhpcy51c2VyUmFuZ2VzID0gW107XHJcbiAgICAgICAgaWYgKFRvb2xzLmlzQXJyYXkodXNlclJhbmdlcykpIHtcclxuICAgICAgICAgICAgdGhpcy51c2VyUmFuZ2VzID0gdXNlclJhbmdlcztcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMudXNlclJhbmdlcyA9IHRoaXMuZ2V0RGVmYXVsdHNSYW5nZXMoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBKUGlja2VyUmFuZ2VzQ29uZmlnLnByb3RvdHlwZS5nZXRSYW5nZXMgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgdmFyIF90aGlzID0gdGhpcztcclxuICAgICAgICB2YXIgcmFuZ2VzID0gW107XHJcbiAgICAgICAgdGhpcy51c2VyUmFuZ2VzLmZvckVhY2goZnVuY3Rpb24gKGl0ZW0pIHtcclxuICAgICAgICAgICAgcmFuZ2VzLnB1c2goX3RoaXMucGFyc2VSYW5nZUl0ZW0oaXRlbSkpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHJldHVybiByYW5nZXM7XHJcbiAgICB9O1xyXG4gICAgSlBpY2tlclJhbmdlc0NvbmZpZy5wcm90b3R5cGUucGFyc2VSYW5nZUl0ZW0gPSBmdW5jdGlvbiAoaXRlbSkge1xyXG4gICAgICAgIHZhciByZXN1bHQ7XHJcbiAgICAgICAgaWYgKFRvb2xzLmlzU3RyaW5nKGl0ZW0pKSB7XHJcbiAgICAgICAgICAgIHJlc3VsdCA9IHRoaXMuZ2V0UmFuZ2VEYXRhKGl0ZW0pO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgcmVzdWx0ID0gaXRlbTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmVzdWx0LnJhbmdlID0gdGhpcy5wYXJzZVJhbmdlRGF0ZShyZXN1bHQucmFuZ2UpO1xyXG4gICAgICAgIHJldHVybiByZXN1bHQ7XHJcbiAgICB9O1xyXG4gICAgSlBpY2tlclJhbmdlc0NvbmZpZy5wcm90b3R5cGUucGFyc2VSYW5nZURhdGUgPSBmdW5jdGlvbiAoaW5wdXQpIHtcclxuICAgICAgICB2YXIgcmVzdWx0ID0gW107XHJcbiAgICAgICAgaW5wdXQuZm9yRWFjaChmdW5jdGlvbiAodmFsdWUpIHtcclxuICAgICAgICAgICAgaWYgKFRvb2xzLmlzRGF0ZSh2YWx1ZSkpIHtcclxuICAgICAgICAgICAgICAgIHJlc3VsdC5wdXNoKHZhbHVlKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHJlc3VsdC5wdXNoKG5ldyBEYXRlKHZhbHVlICogMTAwMCkpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcclxuICAgIH07XHJcbiAgICBKUGlja2VyUmFuZ2VzQ29uZmlnLnByb3RvdHlwZS5nZXRSYW5nZURhdGEgPSBmdW5jdGlvbiAoa2V5KSB7XHJcbiAgICAgICAgdmFyIGxhYmVscyA9IEpQaWNrZXJDb25maWcuZ2V0KCkuZ2V0UmFuZ2VzTGFiZWwoKSwgbGFiZWwgPSBsYWJlbHNba2V5XSB8fCBUb29scy5lcnJvcignUmFuZ2Uga2V5IFwiJyArIGtleSArICdcIiBkb2VzIG5vdCBoYXZlIGxhYmVsJyksIHJhbmdlc1RtcDtcclxuICAgICAgICBzd2l0Y2ggKGtleSkge1xyXG4gICAgICAgICAgICBjYXNlIEpQaWNrZXJSYW5nZXNDb25maWcuVEhJU19XRUVLOlxyXG4gICAgICAgICAgICBjYXNlIEpQaWNrZXJSYW5nZXNDb25maWcuTEFTVF9XRUVLOlxyXG4gICAgICAgICAgICBjYXNlIEpQaWNrZXJSYW5nZXNDb25maWcuTkVYVF9XRUVLOlxyXG4gICAgICAgICAgICAgICAgcmFuZ2VzVG1wID0gdGhpcy5wcm9jZXNzV2Vla3Moa2V5KTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIEpQaWNrZXJSYW5nZXNDb25maWcuTEFTVF8zX0RBWVM6XHJcbiAgICAgICAgICAgIGNhc2UgSlBpY2tlclJhbmdlc0NvbmZpZy5MQVNUXzdfREFZUzpcclxuICAgICAgICAgICAgY2FzZSBKUGlja2VyUmFuZ2VzQ29uZmlnLkxBU1RfMzBfREFZUzpcclxuICAgICAgICAgICAgICAgIHJhbmdlc1RtcCA9IHRoaXMucHJvY2Vzc0xhc3REYXlzKGtleSk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBKUGlja2VyUmFuZ2VzQ29uZmlnLlRISVNfTU9OVEg6XHJcbiAgICAgICAgICAgIGNhc2UgSlBpY2tlclJhbmdlc0NvbmZpZy5MQVNUX01PTlRIOlxyXG4gICAgICAgICAgICBjYXNlIEpQaWNrZXJSYW5nZXNDb25maWcuTkVYVF9NT05USDpcclxuICAgICAgICAgICAgICAgIHJhbmdlc1RtcCA9IHRoaXMucHJvY2Vzc01vbnRocyhrZXkpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgSlBpY2tlclJhbmdlc0NvbmZpZy5USElTX1FVQVJURVI6XHJcbiAgICAgICAgICAgIGNhc2UgSlBpY2tlclJhbmdlc0NvbmZpZy5MQVNUX1FVQVJURVI6XHJcbiAgICAgICAgICAgIGNhc2UgSlBpY2tlclJhbmdlc0NvbmZpZy5ORVhUX1FVQVJURVI6XHJcbiAgICAgICAgICAgICAgICByYW5nZXNUbXAgPSB0aGlzLnByb2Nlc3NRdWFydGVycyhrZXkpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgICAgICBUb29scy5lcnJvcignUmFuZ2Uga2V5IFwiJyArIGtleSArICdcIiBkb2VzIG5vdCBleGlzdCcpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIGxhYmVsOiBsYWJlbCxcclxuICAgICAgICAgICAgcmFuZ2U6IFtcclxuICAgICAgICAgICAgICAgIG5ldyBEYXRlKChuZXcgRGF0ZShyYW5nZXNUbXBbMF0pKS5zZXRIb3VycygwLCAwLCAwLCAwKSksXHJcbiAgICAgICAgICAgICAgICBuZXcgRGF0ZSgobmV3IERhdGUocmFuZ2VzVG1wWzFdKSkuc2V0SG91cnMoMjMsIDU5LCA1OSwgMCkpXHJcbiAgICAgICAgICAgIF1cclxuICAgICAgICB9O1xyXG4gICAgfTtcclxuICAgIEpQaWNrZXJSYW5nZXNDb25maWcucHJvdG90eXBlLnByb2Nlc3NXZWVrcyA9IGZ1bmN0aW9uIChyYW5nZSkge1xyXG4gICAgICAgIHZhciB0b2RheSA9IEpQaWNrZXJDb25maWcuZ2V0KCkuZ2V0VG9kYXkoKSwgY3VycmVudERheSA9IHRvZGF5LmdldERheSgpLCBjdXJyZW50VGltZSA9IHRvZGF5LmdldFRpbWUoKSwgZnJvbSwgdG87XHJcbiAgICAgICAgaWYgKGN1cnJlbnREYXkgPT09IDApIHtcclxuICAgICAgICAgICAgY3VycmVudERheSA9IDc7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHN3aXRjaCAocmFuZ2UpIHtcclxuICAgICAgICAgICAgY2FzZSBKUGlja2VyUmFuZ2VzQ29uZmlnLlRISVNfV0VFSzpcclxuICAgICAgICAgICAgICAgIGZyb20gPSBjdXJyZW50VGltZSAtIHRoaXMuZ2V0VGltZUZvckRheXMoY3VycmVudERheSAtIDEpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgSlBpY2tlclJhbmdlc0NvbmZpZy5MQVNUX1dFRUs6XHJcbiAgICAgICAgICAgICAgICBmcm9tID0gY3VycmVudFRpbWUgLSB0aGlzLmdldFRpbWVGb3JEYXlzKGN1cnJlbnREYXkgKyA2KTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIEpQaWNrZXJSYW5nZXNDb25maWcuTkVYVF9XRUVLOlxyXG4gICAgICAgICAgICAgICAgZnJvbSA9IGN1cnJlbnRUaW1lICsgdGhpcy5nZXRUaW1lRm9yRGF5cyg3IC0gY3VycmVudERheSArIDEpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRvID0gZnJvbSArIHRoaXMuZ2V0VGltZUZvckRheXMoNik7XHJcbiAgICAgICAgcmV0dXJuIFtmcm9tLCB0b107XHJcbiAgICB9O1xyXG4gICAgSlBpY2tlclJhbmdlc0NvbmZpZy5wcm90b3R5cGUucHJvY2Vzc0xhc3REYXlzID0gZnVuY3Rpb24gKHJhbmdlKSB7XHJcbiAgICAgICAgdmFyIHRvID0gSlBpY2tlckNvbmZpZy5nZXQoKS5nZXRUb2RheSgpLmdldFRpbWUoKSwgZnJvbSA9IHRvO1xyXG4gICAgICAgIHN3aXRjaCAocmFuZ2UpIHtcclxuICAgICAgICAgICAgY2FzZSBKUGlja2VyUmFuZ2VzQ29uZmlnLkxBU1RfM19EQVlTOlxyXG4gICAgICAgICAgICAgICAgZnJvbSAtPSB0aGlzLmdldFRpbWVGb3JEYXlzKDIpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgSlBpY2tlclJhbmdlc0NvbmZpZy5MQVNUXzdfREFZUzpcclxuICAgICAgICAgICAgICAgIGZyb20gLT0gdGhpcy5nZXRUaW1lRm9yRGF5cyg2KTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIEpQaWNrZXJSYW5nZXNDb25maWcuTEFTVF8zMF9EQVlTOlxyXG4gICAgICAgICAgICAgICAgZnJvbSAtPSB0aGlzLmdldFRpbWVGb3JEYXlzKDI5KTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gW2Zyb20sIHRvXTtcclxuICAgIH07XHJcbiAgICBKUGlja2VyUmFuZ2VzQ29uZmlnLnByb3RvdHlwZS5wcm9jZXNzTW9udGhzID0gZnVuY3Rpb24gKHJhbmdlKSB7XHJcbiAgICAgICAgdmFyIHRvZGF5ID0gSlBpY2tlckNvbmZpZy5nZXQoKS5nZXRUb2RheSgpLCBjdXJyZW50TW9udGggPSB0b2RheS5nZXRNb250aCgpLCBuZXh0TW9udGggPSBjdXJyZW50TW9udGggKyAxLCBwcmV2TW9udGggPSBjdXJyZW50TW9udGggLSAxLCBjdXJyZW50WWVhciA9IHRvZGF5LmdldEZ1bGxZZWFyKCksIG5leHRZZWFyID0gY3VycmVudFllYXIsIHByZXZZZWFyID0gY3VycmVudFllYXIsIGZyb20sIHRvO1xyXG4gICAgICAgIGlmIChuZXh0TW9udGggPiAxMSkge1xyXG4gICAgICAgICAgICBuZXh0TW9udGggPSAwO1xyXG4gICAgICAgICAgICBuZXh0WWVhcisrO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAocHJldk1vbnRoIDwgMCkge1xyXG4gICAgICAgICAgICBwcmV2TW9udGggPSAxMTtcclxuICAgICAgICAgICAgcHJldlllYXItLTtcclxuICAgICAgICB9XHJcbiAgICAgICAgc3dpdGNoIChyYW5nZSkge1xyXG4gICAgICAgICAgICBjYXNlIEpQaWNrZXJSYW5nZXNDb25maWcuVEhJU19NT05USDpcclxuICAgICAgICAgICAgICAgIGZyb20gPSAobmV3IERhdGUoY3VycmVudFllYXIsIGN1cnJlbnRNb250aCkpLmdldFRpbWUoKTtcclxuICAgICAgICAgICAgICAgIHRvID0gKG5ldyBEYXRlKG5leHRZZWFyLCBuZXh0TW9udGgpKS5nZXRUaW1lKCkgLSAxMDAwO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgSlBpY2tlclJhbmdlc0NvbmZpZy5MQVNUX01PTlRIOlxyXG4gICAgICAgICAgICAgICAgZnJvbSA9IChuZXcgRGF0ZShwcmV2WWVhciwgcHJldk1vbnRoKSkuZ2V0VGltZSgpO1xyXG4gICAgICAgICAgICAgICAgdG8gPSAobmV3IERhdGUoY3VycmVudFllYXIsIGN1cnJlbnRNb250aCkpLmdldFRpbWUoKSAtIDEwMDA7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBKUGlja2VyUmFuZ2VzQ29uZmlnLk5FWFRfTU9OVEg6XHJcbiAgICAgICAgICAgICAgICBmcm9tID0gKG5ldyBEYXRlKG5leHRZZWFyLCBuZXh0TW9udGgpKS5nZXRUaW1lKCk7XHJcbiAgICAgICAgICAgICAgICBuZXh0TW9udGgrKztcclxuICAgICAgICAgICAgICAgIGlmIChuZXh0TW9udGggPiAxMSkge1xyXG4gICAgICAgICAgICAgICAgICAgIG5leHRNb250aCA9IDA7XHJcbiAgICAgICAgICAgICAgICAgICAgbmV4dFllYXIrKztcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHRvID0gKG5ldyBEYXRlKG5leHRZZWFyLCBuZXh0TW9udGgpKS5nZXRUaW1lKCkgLSAxMDAwO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBbZnJvbSwgdG9dO1xyXG4gICAgfTtcclxuICAgIEpQaWNrZXJSYW5nZXNDb25maWcucHJvdG90eXBlLnByb2Nlc3NRdWFydGVycyA9IGZ1bmN0aW9uIChyYW5nZSkge1xyXG4gICAgICAgIHZhciB0b2RheSA9IEpQaWNrZXJDb25maWcuZ2V0KCkuZ2V0VG9kYXkoKSwgY3VycmVudFF1YXJ0ZXIsIGN1cnJlbnRNb250aCA9IHRvZGF5LmdldE1vbnRoKCksIG5leHRNb250aCwgcHJldk1vbnRoLCBjdXJyZW50WWVhciA9IHRvZGF5LmdldEZ1bGxZZWFyKCksIG5leHRZZWFyID0gY3VycmVudFllYXIsIHByZXZZZWFyID0gY3VycmVudFllYXIsIHByZXZRdWFydGVyLCBuZXh0UXVhcnRlciwgZnJvbSwgdG8sIHF1YXJ0ZXJzID0ge1xyXG4gICAgICAgICAgICAxOiBbMCwgMSwgMl0sXHJcbiAgICAgICAgICAgIDI6IFszLCA0LCA1XSxcclxuICAgICAgICAgICAgMzogWzYsIDcsIDhdLFxyXG4gICAgICAgICAgICA0OiBbOSwgMTAsIDExXSxcclxuICAgICAgICB9O1xyXG4gICAgICAgIGZvciAodmFyIF9xdWFydGVyIGluIHF1YXJ0ZXJzKSB7XHJcbiAgICAgICAgICAgIGlmIChxdWFydGVyc1tfcXVhcnRlcl0uaW5kZXhPZihjdXJyZW50TW9udGgpID4gLTEpIHtcclxuICAgICAgICAgICAgICAgIGN1cnJlbnRRdWFydGVyID0gVG9vbHMuaW50KF9xdWFydGVyKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBwcmV2UXVhcnRlciA9IGN1cnJlbnRRdWFydGVyIC0gMTtcclxuICAgICAgICBuZXh0UXVhcnRlciA9IGN1cnJlbnRRdWFydGVyICsgMTtcclxuICAgICAgICBpZiAocHJldlF1YXJ0ZXIgPCAxKSB7XHJcbiAgICAgICAgICAgIHByZXZRdWFydGVyID0gNDtcclxuICAgICAgICAgICAgcHJldlllYXItLTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKG5leHRRdWFydGVyID4gNCkge1xyXG4gICAgICAgICAgICBuZXh0UXVhcnRlciA9IDE7XHJcbiAgICAgICAgICAgIG5leHRZZWFyKys7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGN1cnJlbnRNb250aCA9IHF1YXJ0ZXJzW2N1cnJlbnRRdWFydGVyXVswXTtcclxuICAgICAgICBwcmV2TW9udGggPSBxdWFydGVyc1twcmV2UXVhcnRlcl1bMF07XHJcbiAgICAgICAgbmV4dE1vbnRoID0gcXVhcnRlcnNbbmV4dFF1YXJ0ZXJdWzBdO1xyXG4gICAgICAgIHN3aXRjaCAocmFuZ2UpIHtcclxuICAgICAgICAgICAgY2FzZSBKUGlja2VyUmFuZ2VzQ29uZmlnLlRISVNfUVVBUlRFUjpcclxuICAgICAgICAgICAgICAgIGZyb20gPSAobmV3IERhdGUoY3VycmVudFllYXIsIGN1cnJlbnRNb250aCkpLmdldFRpbWUoKTtcclxuICAgICAgICAgICAgICAgIHRvID0gKG5ldyBEYXRlKG5leHRZZWFyLCBuZXh0TW9udGgpKS5nZXRUaW1lKCkgLSAxMDAwO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgSlBpY2tlclJhbmdlc0NvbmZpZy5MQVNUX1FVQVJURVI6XHJcbiAgICAgICAgICAgICAgICBmcm9tID0gKG5ldyBEYXRlKHByZXZZZWFyLCBwcmV2TW9udGgpKS5nZXRUaW1lKCk7XHJcbiAgICAgICAgICAgICAgICB0byA9IChuZXcgRGF0ZShjdXJyZW50WWVhciwgY3VycmVudE1vbnRoKSkuZ2V0VGltZSgpIC0gMTAwMDtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIEpQaWNrZXJSYW5nZXNDb25maWcuTkVYVF9RVUFSVEVSOlxyXG4gICAgICAgICAgICAgICAgZnJvbSA9IChuZXcgRGF0ZShuZXh0WWVhciwgbmV4dE1vbnRoKSkuZ2V0VGltZSgpO1xyXG4gICAgICAgICAgICAgICAgbmV4dE1vbnRoICs9IDM7XHJcbiAgICAgICAgICAgICAgICBpZiAobmV4dE1vbnRoID4gMTEpIHtcclxuICAgICAgICAgICAgICAgICAgICBuZXh0TW9udGggPSBuZXh0TW9udGggLSAxMTtcclxuICAgICAgICAgICAgICAgICAgICBuZXh0WWVhcisrO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgdG8gPSAobmV3IERhdGUobmV4dFllYXIsIG5leHRNb250aCkpLmdldFRpbWUoKSAtIDEwMDA7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIFtmcm9tLCB0b107XHJcbiAgICB9O1xyXG4gICAgSlBpY2tlclJhbmdlc0NvbmZpZy5wcm90b3R5cGUuZ2V0VGltZUZvckRheXMgPSBmdW5jdGlvbiAoZGF5cykge1xyXG4gICAgICAgIHJldHVybiBkYXlzICogMjQgKiAzNjAwICogMTAwMDtcclxuICAgIH07XHJcbiAgICBKUGlja2VyUmFuZ2VzQ29uZmlnLnByb3RvdHlwZS5nZXREZWZhdWx0c1JhbmdlcyA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICByZXR1cm4gW1xyXG4gICAgICAgICAgICBKUGlja2VyUmFuZ2VzQ29uZmlnLlRISVNfV0VFSyxcclxuICAgICAgICAgICAgSlBpY2tlclJhbmdlc0NvbmZpZy5MQVNUX1dFRUssXHJcbiAgICAgICAgICAgIEpQaWNrZXJSYW5nZXNDb25maWcuTkVYVF9XRUVLLFxyXG4gICAgICAgICAgICBKUGlja2VyUmFuZ2VzQ29uZmlnLkxBU1RfM19EQVlTLFxyXG4gICAgICAgICAgICBKUGlja2VyUmFuZ2VzQ29uZmlnLkxBU1RfN19EQVlTLFxyXG4gICAgICAgICAgICBKUGlja2VyUmFuZ2VzQ29uZmlnLkxBU1RfMzBfREFZUyxcclxuICAgICAgICAgICAgSlBpY2tlclJhbmdlc0NvbmZpZy5USElTX01PTlRILFxyXG4gICAgICAgICAgICBKUGlja2VyUmFuZ2VzQ29uZmlnLkxBU1RfTU9OVEgsXHJcbiAgICAgICAgICAgIEpQaWNrZXJSYW5nZXNDb25maWcuTkVYVF9NT05USCxcclxuICAgICAgICAgICAgSlBpY2tlclJhbmdlc0NvbmZpZy5USElTX1FVQVJURVIsXHJcbiAgICAgICAgICAgIEpQaWNrZXJSYW5nZXNDb25maWcuTEFTVF9RVUFSVEVSLFxyXG4gICAgICAgICAgICBKUGlja2VyUmFuZ2VzQ29uZmlnLk5FWFRfUVVBUlRFUixcclxuICAgICAgICBdO1xyXG4gICAgfTtcclxuICAgIEpQaWNrZXJSYW5nZXNDb25maWcuVEhJU19XRUVLID0gJ3RoaXNfd2Vlayc7XHJcbiAgICBKUGlja2VyUmFuZ2VzQ29uZmlnLkxBU1RfV0VFSyA9ICdsYXN0X3dlZWsnO1xyXG4gICAgSlBpY2tlclJhbmdlc0NvbmZpZy5ORVhUX1dFRUsgPSAnbmV4dF93ZWVrJztcclxuICAgIEpQaWNrZXJSYW5nZXNDb25maWcuTEFTVF8zX0RBWVMgPSAnbGFzdF8zX2RheXMnO1xyXG4gICAgSlBpY2tlclJhbmdlc0NvbmZpZy5MQVNUXzdfREFZUyA9ICdsYXN0XzdfZGF5cyc7XHJcbiAgICBKUGlja2VyUmFuZ2VzQ29uZmlnLkxBU1RfMzBfREFZUyA9ICdsYXN0XzMwX2RheXMnO1xyXG4gICAgSlBpY2tlclJhbmdlc0NvbmZpZy5USElTX01PTlRIID0gJ3RoaXNfbW9udGgnO1xyXG4gICAgSlBpY2tlclJhbmdlc0NvbmZpZy5MQVNUX01PTlRIID0gJ2xhc3RfbW9udGgnO1xyXG4gICAgSlBpY2tlclJhbmdlc0NvbmZpZy5ORVhUX01PTlRIID0gJ25leHRfbW9udGgnO1xyXG4gICAgSlBpY2tlclJhbmdlc0NvbmZpZy5USElTX1FVQVJURVIgPSAndGhpc19xdWFydGVyJztcclxuICAgIEpQaWNrZXJSYW5nZXNDb25maWcuTEFTVF9RVUFSVEVSID0gJ2xhc3RfcXVhcnRlcic7XHJcbiAgICBKUGlja2VyUmFuZ2VzQ29uZmlnLk5FWFRfUVVBUlRFUiA9ICduZXh0X3F1YXJ0ZXInO1xyXG4gICAgcmV0dXJuIEpQaWNrZXJSYW5nZXNDb25maWc7XHJcbn0oKSk7XHJcbmV4cG9ydCB7IEpQaWNrZXJSYW5nZXNDb25maWcgfTtcclxuIiwidmFyIFRvb2xzID0gLyoqIEBjbGFzcyAqLyAoZnVuY3Rpb24gKCkge1xyXG4gICAgZnVuY3Rpb24gVG9vbHMoKSB7XHJcbiAgICB9XHJcbiAgICBUb29scy5nZXREYXRlID0gZnVuY3Rpb24gKHZhbHVlLCBfZGVmYXVsdCkge1xyXG4gICAgICAgIGlmIChfZGVmYXVsdCA9PT0gdm9pZCAwKSB7IF9kZWZhdWx0ID0gbnVsbDsgfVxyXG4gICAgICAgIGlmICh0eXBlb2YgdmFsdWUgPT09ICdudW1iZXInKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBuZXcgRGF0ZSh2YWx1ZSAqIDEwMDApO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmICh2YWx1ZSBpbnN0YW5jZW9mIERhdGUpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHZhbHVlO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gX2RlZmF1bHQ7XHJcbiAgICB9O1xyXG4gICAgVG9vbHMuaXNEYXRlID0gZnVuY3Rpb24gKHZhbHVlKSB7XHJcbiAgICAgICAgcmV0dXJuIHZhbHVlIGluc3RhbmNlb2YgRGF0ZTtcclxuICAgIH07XHJcbiAgICBUb29scy5pc0FycmF5ID0gZnVuY3Rpb24gKHZhbHVlKSB7XHJcbiAgICAgICAgcmV0dXJuIHZhbHVlIGluc3RhbmNlb2YgQXJyYXk7XHJcbiAgICB9O1xyXG4gICAgVG9vbHMuaXNOdW1iZXIgPSBmdW5jdGlvbiAodmFsdWUpIHtcclxuICAgICAgICByZXR1cm4gdHlwZW9mIHZhbHVlID09PSAnbnVtYmVyJztcclxuICAgIH07XHJcbiAgICBUb29scy5pc1N0cmluZyA9IGZ1bmN0aW9uICh2YWx1ZSkge1xyXG4gICAgICAgIHJldHVybiB0eXBlb2YgdmFsdWUgPT09ICdzdHJpbmcnO1xyXG4gICAgfTtcclxuICAgIFRvb2xzLmlzRnVuY3Rpb24gPSBmdW5jdGlvbiAodmFsdWUpIHtcclxuICAgICAgICByZXR1cm4gdHlwZW9mIHZhbHVlID09PSAnZnVuY3Rpb24nO1xyXG4gICAgfTtcclxuICAgIFRvb2xzLmludCA9IGZ1bmN0aW9uICh2YWx1ZSkge1xyXG4gICAgICAgIHJldHVybiBwYXJzZUludCh2YWx1ZSwgMTApIHx8IDA7XHJcbiAgICB9O1xyXG4gICAgVG9vbHMuZXJyb3IgPSBmdW5jdGlvbiAobWVzc2FnZSwgY2hlY2tEb2NzKSB7XHJcbiAgICAgICAgaWYgKGNoZWNrRG9jcyA9PT0gdm9pZCAwKSB7IGNoZWNrRG9jcyA9IHRydWU7IH1cclxuICAgICAgICBtZXNzYWdlICs9ICcuJztcclxuICAgICAgICBpZiAoY2hlY2tEb2NzKSB7XHJcbiAgICAgICAgICAgIG1lc3NhZ2UgKz0gJyBDaGVjayBkb2N1bWVudGF0aW9uOiBodHRwczovL2pwaWNrZXIuY29tL2RvY3MnO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aHJvdyBuZXcgRXJyb3IobWVzc2FnZSk7XHJcbiAgICB9O1xyXG4gICAgVG9vbHMuZCA9IGZ1bmN0aW9uICh2YWx1ZSkge1xyXG4gICAgICAgIHJldHVybiB0eXBlb2YgdmFsdWUgIT09ICd1bmRlZmluZWQnICYmIHZhbHVlICE9PSBudWxsO1xyXG4gICAgfTtcclxuICAgIFRvb2xzLnUgPSBmdW5jdGlvbiAodmFsdWUpIHtcclxuICAgICAgICByZXR1cm4gIVRvb2xzLmQodmFsdWUpO1xyXG4gICAgfTtcclxuICAgIHJldHVybiBUb29scztcclxufSgpKTtcclxuZXhwb3J0IHsgVG9vbHMgfTtcclxuIiwiaW1wb3J0IHsgSFRNTEJ1aWxkZXIgfSBmcm9tIFwiLi9IVE1MQnVpbGRlclwiO1xyXG52YXIgQ29tcG9uZW50ID0gLyoqIEBjbGFzcyAqLyAoZnVuY3Rpb24gKCkge1xyXG4gICAgZnVuY3Rpb24gQ29tcG9uZW50KCkge1xyXG4gICAgICAgIHRoaXMuSFRNTEJ1aWxkZXJJID0gbnVsbDtcclxuICAgICAgICB0aGlzLmNvbXBvbmVudFByZXBhcmVkID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5IVE1MQnVpbGRlckkgPSBuZXcgSFRNTEJ1aWxkZXIoKTtcclxuICAgIH1cclxuICAgIENvbXBvbmVudC5wcm90b3R5cGUuZ2V0SFRNTEVsZW1lbnQgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgaWYgKCF0aGlzLmNvbXBvbmVudFByZXBhcmVkKSB7XHJcbiAgICAgICAgICAgIHRoaXMub25Db21wb25lbnRQcmVwYXJhdGlvbigpO1xyXG4gICAgICAgICAgICB0aGlzLkhUTUxCdWlsZGVySVxyXG4gICAgICAgICAgICAgICAgLnNldE11c3RhY2hlKHRoaXMuZ2V0TXVzdGFjaGUoKSlcclxuICAgICAgICAgICAgICAgIC5zZXRNdXN0YWNoZVZhcnModGhpcy5nZXRNdXN0YWNoZVZhcnMoKSlcclxuICAgICAgICAgICAgICAgIC5zZXRFdmVudHModGhpcy5nZXRFdmVudHMoKSk7XHJcbiAgICAgICAgICAgIHRoaXMuY29tcG9uZW50UHJlcGFyZWQgPSB0cnVlO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdGhpcy5IVE1MQnVpbGRlckkuZ2V0SFRNTEVsZW1lbnQoKTtcclxuICAgIH07XHJcbiAgICBDb21wb25lbnQucHJvdG90eXBlLnJlZnJlc2hIVE1MRWxlbWVudCA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICB0aGlzLmNvbXBvbmVudFByZXBhcmVkID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5IVE1MQnVpbGRlckkgPSBuZXcgSFRNTEJ1aWxkZXIoKTtcclxuICAgICAgICB0aGlzLmdldEhUTUxFbGVtZW50KCk7XHJcbiAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICB9O1xyXG4gICAgQ29tcG9uZW50LnByb3RvdHlwZS5vbkNvbXBvbmVudFByZXBhcmF0aW9uID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgfTtcclxuICAgIENvbXBvbmVudC5wcm90b3R5cGUuZ2V0RXZlbnRPYmplY3QgPSBmdW5jdGlvbiAoc2VsZWN0b3IsIHR5cGUsIGNhbGxiYWNrKSB7XHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgc2VsZWN0b3I6IHNlbGVjdG9yLFxyXG4gICAgICAgICAgICB0eXBlOiB0eXBlLFxyXG4gICAgICAgICAgICBjYWxsYmFjazogY2FsbGJhY2tcclxuICAgICAgICB9O1xyXG4gICAgfTtcclxuICAgIENvbXBvbmVudC5wcm90b3R5cGUuZ2V0RXZlbnRzID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHJldHVybiBbXTtcclxuICAgIH07XHJcbiAgICBDb21wb25lbnQucHJvdG90eXBlLmdldE11c3RhY2hlVmFycyA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICByZXR1cm4ge307XHJcbiAgICB9O1xyXG4gICAgcmV0dXJuIENvbXBvbmVudDtcclxufSgpKTtcclxuZXhwb3J0IHsgQ29tcG9uZW50IH07XHJcbiIsInZhciBDYWxlbmRhckNlbGwgPSAvKiogQGNsYXNzICovIChmdW5jdGlvbiAoKSB7XHJcbiAgICBmdW5jdGlvbiBDYWxlbmRhckNlbGwoKSB7XHJcbiAgICAgICAgdGhpcy5jZWxsQ2xhc3MgPSAnJztcclxuICAgICAgICB0aGlzLmF0dHJpYnV0ZXMgPSBbXTtcclxuICAgICAgICB0aGlzLmNvbnRlbnQgPSAnJztcclxuICAgIH1cclxuICAgIENhbGVuZGFyQ2VsbC5wcm90b3R5cGUuZ2V0Q2xhc3MgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuY2VsbENsYXNzO1xyXG4gICAgfTtcclxuICAgIENhbGVuZGFyQ2VsbC5wcm90b3R5cGUuZ2V0TGFiZWwgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuY29udGVudDtcclxuICAgIH07XHJcbiAgICBDYWxlbmRhckNlbGwucHJvdG90eXBlLnNldENsYXNzID0gZnVuY3Rpb24gKF9jbGFzcykge1xyXG4gICAgICAgIHRoaXMuY2VsbENsYXNzID0gX2NsYXNzO1xyXG4gICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgfTtcclxuICAgIENhbGVuZGFyQ2VsbC5wcm90b3R5cGUuYWRkQ2xhc3MgPSBmdW5jdGlvbiAoX2NsYXNzKSB7XHJcbiAgICAgICAgdGhpcy5jZWxsQ2xhc3MgKz0gJyAnICsgX2NsYXNzO1xyXG4gICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgfTtcclxuICAgIENhbGVuZGFyQ2VsbC5wcm90b3R5cGUuc2V0Q29udGVudCA9IGZ1bmN0aW9uIChjb250ZW50KSB7XHJcbiAgICAgICAgdGhpcy5jb250ZW50ID0gY29udGVudDtcclxuICAgICAgICByZXR1cm4gdGhpcztcclxuICAgIH07XHJcbiAgICBDYWxlbmRhckNlbGwucHJvdG90eXBlLnNldENvbnRlbnREYXkgPSBmdW5jdGlvbiAoZGF5KSB7XHJcbiAgICAgICAgdGhpcy5jb250ZW50ID0gZGF5LnRvU3RyaW5nKCk7XHJcbiAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICB9O1xyXG4gICAgQ2FsZW5kYXJDZWxsLnByb3RvdHlwZS5hZGRBdHRyaWJ1dGUgPSBmdW5jdGlvbiAobmFtZSwgdmFsdWUpIHtcclxuICAgICAgICB0aGlzLmF0dHJpYnV0ZXMucHVzaCgnZGF0YS0nICsgbmFtZSArICc9JyArIHZhbHVlKTtcclxuICAgICAgICByZXR1cm4gdGhpcztcclxuICAgIH07XHJcbiAgICByZXR1cm4gQ2FsZW5kYXJDZWxsO1xyXG59KCkpO1xyXG5leHBvcnQgeyBDYWxlbmRhckNlbGwgfTtcclxuIiwidmFyIEggPSByZXF1aXJlKFwiaG9nYW4uanNcIik7XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKCkgeyB2YXIgVCA9IG5ldyBILlRlbXBsYXRlKHtjb2RlOiBmdW5jdGlvbiAoYyxwLGkpIHsgdmFyIHQ9dGhpczt0LmIoaT1pfHxcIlwiKTt0LmIoXCI8ZGl2IGNsYXNzPVxcXCJqcGlja2VyLWRheXMtd3JhcHBlclxcXCI+XFxyXCIpO3QuYihcIlxcblwiICsgaSk7aWYodC5zKHQuZihcImNhbGVuZGFyXCIsYyxwLDEpLGMscCwwLDUzLDU0NixcInt7IH19XCIpKXt0LnJzKGMscCxmdW5jdGlvbihjLHAsdCl7dC5iKFwiICAgICAgICA8ZGl2IGNsYXNzPVxcXCJqcGlja2VyLWNhbGVuZGFyLXJvd1xcXCI+XFxyXCIpO3QuYihcIlxcblwiICsgaSk7aWYodC5zKHQuZChcIi5cIixjLHAsMSksYyxwLDAsMTE3LDUxOCxcInt7IH19XCIpKXt0LnJzKGMscCxmdW5jdGlvbihjLHAsdCl7dC5iKFwiICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XFxcImpwaWNrZXItY2FsZW5kYXItY2VsbCBcIik7dC5iKHQudih0LmYoXCJjZWxsQ2xhc3NcIixjLHAsMCkpKTt0LmIoXCJcXFwiIFwiKTtpZih0LnModC5mKFwiYXR0cmlidXRlc1wiLGMscCwxKSxjLHAsMCwxOTksMjA1LFwie3sgfX1cIikpe3QucnMoYyxwLGZ1bmN0aW9uKGMscCx0KXt0LmIodC52KHQuZChcIi5cIixjLHAsMCkpKTt0LmIoXCIgXCIpO30pO2MucG9wKCk7fXQuYihcIj5cXHJcIik7dC5iKFwiXFxuXCIgKyBpKTt0LmIoXCIgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XFxcImpwaWNrZXItY2FsZW5kYXItY2VsbC1jb250ZW50XFxcIj5cXHJcIik7dC5iKFwiXFxuXCIgKyBpKTt0LmIoXCIgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVxcXCJqcGlja2VyLWNlbGwtb3V0XFxcIj5cXHJcIik7dC5iKFwiXFxuXCIgKyBpKTt0LmIoXCIgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cXFwianBpY2tlci1jZWxsLWluXFxcIj5cIik7dC5iKHQudCh0LmYoXCJjb250ZW50XCIsYyxwLDApKSk7dC5iKFwiPC9kaXY+XFxyXCIpO3QuYihcIlxcblwiICsgaSk7dC5iKFwiICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XFxyXCIpO3QuYihcIlxcblwiICsgaSk7dC5iKFwiICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cXHJcIik7dC5iKFwiXFxuXCIgKyBpKTt0LmIoXCIgICAgICAgICAgICAgICAgPC9kaXY+XFxyXCIpO3QuYihcIlxcblwiICsgaSk7fSk7Yy5wb3AoKTt9dC5iKFwiICAgICAgICA8L2Rpdj5cXHJcIik7dC5iKFwiXFxuXCIgKyBpKTt9KTtjLnBvcCgpO310LmIoXCI8L2Rpdj5cXHJcIik7dC5iKFwiXFxuXCIpO3JldHVybiB0LmZsKCk7IH0scGFydGlhbHM6IHt9LCBzdWJzOiB7ICB9fSwgXCI8ZGl2IGNsYXNzPVxcXCJqcGlja2VyLWRheXMtd3JhcHBlclxcXCI+XFxyXFxuICAgIHt7I2NhbGVuZGFyfX1cXHJcXG4gICAgICAgIDxkaXYgY2xhc3M9XFxcImpwaWNrZXItY2FsZW5kYXItcm93XFxcIj5cXHJcXG4gICAgICAgICAgICB7eyMufX1cXHJcXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cXFwianBpY2tlci1jYWxlbmRhci1jZWxsIHt7Y2VsbENsYXNzfX1cXFwiIHt7I2F0dHJpYnV0ZXN9fXt7Ln19IHt7L2F0dHJpYnV0ZXN9fT5cXHJcXG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XFxcImpwaWNrZXItY2FsZW5kYXItY2VsbC1jb250ZW50XFxcIj5cXHJcXG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVxcXCJqcGlja2VyLWNlbGwtb3V0XFxcIj5cXHJcXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cXFwianBpY2tlci1jZWxsLWluXFxcIj57e3tjb250ZW50fX19PC9kaXY+XFxyXFxuICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XFxyXFxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cXHJcXG4gICAgICAgICAgICAgICAgPC9kaXY+XFxyXFxuICAgICAgICAgICAge3svLn19XFxyXFxuICAgICAgICA8L2Rpdj5cXHJcXG4gICAge3svY2FsZW5kYXJ9fVxcclxcbjwvZGl2PlxcclxcblwiLCBIKTtyZXR1cm4gVC5yZW5kZXIuYXBwbHkoVCwgYXJndW1lbnRzKTsgfTsiLCJ2YXIgX19leHRlbmRzID0gKHRoaXMgJiYgdGhpcy5fX2V4dGVuZHMpIHx8IChmdW5jdGlvbiAoKSB7XHJcbiAgICB2YXIgZXh0ZW5kU3RhdGljcyA9IGZ1bmN0aW9uIChkLCBiKSB7XHJcbiAgICAgICAgZXh0ZW5kU3RhdGljcyA9IE9iamVjdC5zZXRQcm90b3R5cGVPZiB8fFxyXG4gICAgICAgICAgICAoeyBfX3Byb3RvX186IFtdIH0gaW5zdGFuY2VvZiBBcnJheSAmJiBmdW5jdGlvbiAoZCwgYikgeyBkLl9fcHJvdG9fXyA9IGI7IH0pIHx8XHJcbiAgICAgICAgICAgIGZ1bmN0aW9uIChkLCBiKSB7IGZvciAodmFyIHAgaW4gYikgaWYgKGIuaGFzT3duUHJvcGVydHkocCkpIGRbcF0gPSBiW3BdOyB9O1xyXG4gICAgICAgIHJldHVybiBleHRlbmRTdGF0aWNzKGQsIGIpO1xyXG4gICAgfTtcclxuICAgIHJldHVybiBmdW5jdGlvbiAoZCwgYikge1xyXG4gICAgICAgIGV4dGVuZFN0YXRpY3MoZCwgYik7XHJcbiAgICAgICAgZnVuY3Rpb24gX18oKSB7IHRoaXMuY29uc3RydWN0b3IgPSBkOyB9XHJcbiAgICAgICAgZC5wcm90b3R5cGUgPSBiID09PSBudWxsID8gT2JqZWN0LmNyZWF0ZShiKSA6IChfXy5wcm90b3R5cGUgPSBiLnByb3RvdHlwZSwgbmV3IF9fKCkpO1xyXG4gICAgfTtcclxufSkoKTtcclxuaW1wb3J0IHsgUGlja2VyIH0gZnJvbSBcIi4uL1BpY2tlclwiO1xyXG5pbXBvcnQgeyBKUGlja2VyQ29uZmlnIH0gZnJvbSBcIi4uLy4uL0NsYXNzZXMvSlBpY2tlckNvbmZpZ1wiO1xyXG5pbXBvcnQgeyBEQVlfQ0xJQ0ssIERBWV9NT1VTRV9FTlRFUiwgREFZX01PVVNFX0xFQVZFIH0gZnJvbSBcIi4uLy4uL0NsYXNzZXMvRXZlbnRzRGljdFwiO1xyXG5pbXBvcnQgeyBFdmVudCB9IGZyb20gXCIuLi8uLi9DbGFzc2VzL0V2ZW50XCI7XHJcbmltcG9ydCB7IFRvb2xzIH0gZnJvbSBcIi4uLy4uL0NsYXNzZXMvVG9vbHNcIjtcclxuaW1wb3J0IHsgRE9NIH0gZnJvbSBcIi4uLy4uL0NsYXNzZXMvRE9NXCI7XHJcbmltcG9ydCB7IENhbGVuZGFyQ2VsbCB9IGZyb20gXCIuL0NhbGVuZGFyQ2VsbFwiO1xyXG52YXIgRGF5UGlja2VyID0gLyoqIEBjbGFzcyAqLyAoZnVuY3Rpb24gKF9zdXBlcikge1xyXG4gICAgX19leHRlbmRzKERheVBpY2tlciwgX3N1cGVyKTtcclxuICAgIGZ1bmN0aW9uIERheVBpY2tlcihtb250aCwgeWVhcikge1xyXG4gICAgICAgIHZhciBfdGhpcyA9IF9zdXBlci5jYWxsKHRoaXMpIHx8IHRoaXM7XHJcbiAgICAgICAgX3RoaXMuc2VsZWN0ZWREYXlzID0gW107XHJcbiAgICAgICAgX3RoaXMuZGF5V2l0aE1vdXNlID0gbnVsbDtcclxuICAgICAgICBfdGhpcy5tb250aCA9IG1vbnRoO1xyXG4gICAgICAgIF90aGlzLnllYXIgPSB5ZWFyO1xyXG4gICAgICAgIHJldHVybiBfdGhpcztcclxuICAgIH1cclxuICAgIERheVBpY2tlci5wcm90b3R5cGUuc2V0TW9udGggPSBmdW5jdGlvbiAobW9udGgpIHtcclxuICAgICAgICB0aGlzLm1vbnRoID0gbW9udGg7XHJcbiAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICB9O1xyXG4gICAgRGF5UGlja2VyLnByb3RvdHlwZS5zZXRZZWFyID0gZnVuY3Rpb24gKHllYXIpIHtcclxuICAgICAgICB0aGlzLnllYXIgPSB5ZWFyO1xyXG4gICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgfTtcclxuICAgIERheVBpY2tlci5wcm90b3R5cGUuc2V0U2VsZWN0ZWREYXkgPSBmdW5jdGlvbiAoRGF5LCB3aGljaERheSkge1xyXG4gICAgICAgIGlmICh3aGljaERheSA9PT0gdm9pZCAwKSB7IHdoaWNoRGF5ID0gMDsgfVxyXG4gICAgICAgIGlmIChEYXkgPT09IG51bGwpIHtcclxuICAgICAgICAgICAgdGhpcy5zZWxlY3RlZERheXMuc3BsaWNlKHdoaWNoRGF5LCAxKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMuc2VsZWN0ZWREYXlzW3doaWNoRGF5XSA9IERheTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICB9O1xyXG4gICAgRGF5UGlja2VyLnByb3RvdHlwZS5zZXREYXlXaXRoTW91c2VFbnRlciA9IGZ1bmN0aW9uIChkYXlXaXRoTW91c2UpIHtcclxuICAgICAgICB0aGlzLmRheVdpdGhNb3VzZSA9IGRheVdpdGhNb3VzZTtcclxuICAgICAgICByZXR1cm4gdGhpcztcclxuICAgIH07XHJcbiAgICBEYXlQaWNrZXIucHJvdG90eXBlLnJlZnJlc2hTZWxlY3RlZERheXMgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgdmFyIEhUTUxFbGVtZW50ID0gdGhpcy5nZXRIVE1MRWxlbWVudCgpLCBjbGFzc0ZvckRheSA9ICcnO1xyXG4gICAgICAgIChuZXcgRE9NKCcuanBpY2tlci1zZWxlY3RlZC1yYW5nZS1kYXknLCBIVE1MRWxlbWVudCkpLnJlbW92ZUNsYXNzKCdqcGlja2VyLXNlbGVjdGVkLXJhbmdlLWRheScpO1xyXG4gICAgICAgIChuZXcgRE9NKCcuanBpY2tlci1zZWxlY3RlZC1kYXknLCBIVE1MRWxlbWVudCkpLnJlbW92ZUNsYXNzKCdqcGlja2VyLXNlbGVjdGVkLWRheScpO1xyXG4gICAgICAgIC8vQHRvZG8gb3B0aW1pemUhXHJcbiAgICAgICAgZm9yICh2YXIgZGF5ID0gMTsgZGF5IDw9IDMxOyBkYXkrKykge1xyXG4gICAgICAgICAgICBjbGFzc0ZvckRheSA9IHRoaXMuZ2V0Q2xhc3NGb3JTZWxlY3RlZERheXMoZGF5KTtcclxuICAgICAgICAgICAgaWYgKGNsYXNzRm9yRGF5Lmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgICAgICAgIChuZXcgRE9NKCdbZGF0YS1kYXk9XCInICsgZGF5ICsgJ1wiXScsIEhUTUxFbGVtZW50KSkuYWRkQ2xhc3MoY2xhc3NGb3JEYXkpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgfTtcclxuICAgIERheVBpY2tlci5wcm90b3R5cGUuZ2V0TW9udGhTZXQgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgcmV0dXJuIFtdLmNvbmNhdChbdGhpcy5nZXRMYWJlbHNSb3coKV0sIHRoaXMuZ2V0TW9udGhDZWxscygpKTtcclxuICAgIH07XHJcbiAgICBEYXlQaWNrZXIucHJvdG90eXBlLmdldEZpcnN0V2Vla0RheSA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICByZXR1cm4gKG5ldyBEYXRlKHRoaXMueWVhciwgdGhpcy5tb250aCAtIDEsIDEpKS5nZXREYXkoKTtcclxuICAgIH07XHJcbiAgICBEYXlQaWNrZXIucHJvdG90eXBlLmdldERheXNJbk1vbnRoID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHZhciBfMzEgPSBbMSwgMywgNSwgNywgOCwgMTAsIDEyXTtcclxuICAgICAgICBpZiAodGhpcy5tb250aCA9PT0gMikge1xyXG4gICAgICAgICAgICByZXR1cm4gKHRoaXMueWVhciAlIDQpID09PSAwID8gMjkgOiAyODtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIF8zMS5pbmRleE9mKHRoaXMubW9udGgpID4gLTEgPyAzMSA6IDMwO1xyXG4gICAgfTtcclxuICAgIERheVBpY2tlci5wcm90b3R5cGUuZ2V0RXZlbnRzID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHJldHVybiBbXHJcbiAgICAgICAgICAgIHRoaXMuZ2V0RXZlbnRPYmplY3QoJy5qcGlja2VyLWNhbGVuZGFyLWNlbGwuYXYnLCAnY2xpY2snLCB0aGlzLm9uRGF5Q2xpY2sodGhpcykpLFxyXG4gICAgICAgICAgICB0aGlzLmdldEV2ZW50T2JqZWN0KCcuanBpY2tlci1jYWxlbmRhci1jZWxsLmF2JywgJ21vdXNlZW50ZXInLCB0aGlzLm9uRGF5TW91c2VFbnRlcih0aGlzKSksXHJcbiAgICAgICAgICAgIHRoaXMuZ2V0RXZlbnRPYmplY3QoJy5qcGlja2VyLWNhbGVuZGFyLWNlbGwuYXYnLCAnbW91c2VsZWF2ZScsIHRoaXMub25EYXlNb3VzZUxlYXZlKHRoaXMpKVxyXG4gICAgICAgIF07XHJcbiAgICB9O1xyXG4gICAgRGF5UGlja2VyLnByb3RvdHlwZS5vbkRheUNsaWNrID0gZnVuY3Rpb24gKHRoYXQpIHtcclxuICAgICAgICByZXR1cm4gZnVuY3Rpb24gKEV2ZW50RGF0YSkge1xyXG4gICAgICAgICAgICB2YXIgZGF5ID0gdGhpcy5nZXRBdHRyaWJ1dGUoJ2RhdGEtZGF5JyksIGRheUNvbnZlcnRlZCA9IFRvb2xzLmludChkYXkpO1xyXG4gICAgICAgICAgICBFdmVudC5nZXQoKS50cmlnZ2VyKERBWV9DTElDSywgZGF5Q29udmVydGVkLCBbZGF5Q29udmVydGVkLCB0aGF0Lm1vbnRoLCB0aGF0LnllYXJdKTtcclxuICAgICAgICB9O1xyXG4gICAgfTtcclxuICAgIERheVBpY2tlci5wcm90b3R5cGUub25EYXlNb3VzZUVudGVyID0gZnVuY3Rpb24gKHRoYXQpIHtcclxuICAgICAgICByZXR1cm4gZnVuY3Rpb24gKEV2ZW50RGF0YSkge1xyXG4gICAgICAgICAgICB2YXIgZGF5ID0gdGhpcy5nZXRBdHRyaWJ1dGUoJ2RhdGEtZGF5JyksIGRheUNvbnZlcnRlZCA9IFRvb2xzLmludChkYXkpO1xyXG4gICAgICAgICAgICBFdmVudC5nZXQoKS50cmlnZ2VyKERBWV9NT1VTRV9FTlRFUiwgZGF5Q29udmVydGVkLCBbZGF5Q29udmVydGVkLCB0aGF0Lm1vbnRoLCB0aGF0LnllYXJdKTtcclxuICAgICAgICB9O1xyXG4gICAgfTtcclxuICAgIERheVBpY2tlci5wcm90b3R5cGUub25EYXlNb3VzZUxlYXZlID0gZnVuY3Rpb24gKHRoYXQpIHtcclxuICAgICAgICByZXR1cm4gZnVuY3Rpb24gKEV2ZW50RGF0YSkge1xyXG4gICAgICAgICAgICB2YXIgZGF5ID0gdGhpcy5nZXRBdHRyaWJ1dGUoJ2RhdGEtZGF5JyksIGRheUNvbnZlcnRlZCA9IFRvb2xzLmludChkYXkpO1xyXG4gICAgICAgICAgICBFdmVudC5nZXQoKS50cmlnZ2VyKERBWV9NT1VTRV9MRUFWRSwgZGF5Q29udmVydGVkLCBbZGF5Q29udmVydGVkLCB0aGF0Lm1vbnRoLCB0aGF0LnllYXJdKTtcclxuICAgICAgICB9O1xyXG4gICAgfTtcclxuICAgIERheVBpY2tlci5wcm90b3R5cGUuZ2V0TXVzdGFjaGVWYXJzID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIGNhbGVuZGFyOiB0aGlzLmdldE1vbnRoU2V0KClcclxuICAgICAgICB9O1xyXG4gICAgfTtcclxuICAgIERheVBpY2tlci5wcm90b3R5cGUuZ2V0TXVzdGFjaGUgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgcmV0dXJuIHJlcXVpcmUoJy4vRGF5UGlja2VyLm11c3RhY2hlJyk7XHJcbiAgICB9O1xyXG4gICAgRGF5UGlja2VyLnByb3RvdHlwZS5pc1RvZGF5ID0gZnVuY3Rpb24gKGRheU5iKSB7XHJcbiAgICAgICAgdmFyIHRvZGF5ID0gSlBpY2tlckNvbmZpZy5nZXQoKS5nZXRUb2RheSgpLCBwcm9jZXNzaW5nRGF5ID0gbmV3IERhdGUodGhpcy55ZWFyLCB0aGlzLm1vbnRoIC0gMSwgZGF5TmIpO1xyXG4gICAgICAgIHJldHVybiB0b2RheS5nZXREYXRlKCkgPT09IHByb2Nlc3NpbmdEYXkuZ2V0RGF0ZSgpXHJcbiAgICAgICAgICAgICYmIHRvZGF5LmdldE1vbnRoKCkgPT09IHByb2Nlc3NpbmdEYXkuZ2V0TW9udGgoKVxyXG4gICAgICAgICAgICAmJiB0b2RheS5nZXRGdWxsWWVhcigpID09PSBwcm9jZXNzaW5nRGF5LmdldEZ1bGxZZWFyKCk7XHJcbiAgICB9O1xyXG4gICAgRGF5UGlja2VyLnByb3RvdHlwZS5nZXRNb250aENlbGxzID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHZhciBmbGFnID0gdHJ1ZSwgZmlyc3RJdGVyYXRpb24gPSB0cnVlLCBmaXJzdERheSA9IHRoaXMuZ2V0Rmlyc3RXZWVrRGF5KCksIGRheXNDb3VudCA9IHRoaXMuZ2V0RGF5c0luTW9udGgoKSwgaXNSYW5nZSA9IEpQaWNrZXJDb25maWcuZ2V0KCkuaXNSYW5nZSgpLCByZXN1bHQgPSBbXSwgX2RheSA9IDAsIGNvdW50ZXI7XHJcbiAgICAgICAgaWYgKGZpcnN0RGF5ID09PSAwKSB7XHJcbiAgICAgICAgICAgIGZpcnN0RGF5ID0gNztcclxuICAgICAgICB9XHJcbiAgICAgICAgd2hpbGUgKGZsYWcpIHtcclxuICAgICAgICAgICAgdmFyIHdlZWsgPSBbXTtcclxuICAgICAgICAgICAgZm9yIChjb3VudGVyID0gMTsgY291bnRlciA8PSA3OyBjb3VudGVyKyspIHtcclxuICAgICAgICAgICAgICAgIHZhciBDYWxlbmRhckNlbGxJID0gbmV3IENhbGVuZGFyQ2VsbDtcclxuICAgICAgICAgICAgICAgIGlmIChmaXJzdEl0ZXJhdGlvbiAmJiBjb3VudGVyIDwgZmlyc3REYXkpIHtcclxuICAgICAgICAgICAgICAgICAgICBDYWxlbmRhckNlbGxJLnNldENsYXNzKCdlbXB0eScpO1xyXG4gICAgICAgICAgICAgICAgICAgIF9kYXkgPSAwO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZWxzZSBpZiAoX2RheSA8IGRheXNDb3VudCAmJiBmbGFnKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgX2RheSsrO1xyXG4gICAgICAgICAgICAgICAgICAgIENhbGVuZGFyQ2VsbElcclxuICAgICAgICAgICAgICAgICAgICAgICAgLmFkZENsYXNzKCdhdicpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5hZGRDbGFzcyh0aGlzLmdldENsYXNzRm9yU2VsZWN0ZWREYXlzKF9kYXkpKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAuYWRkQXR0cmlidXRlKCdkYXknLCBfZGF5KTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoX2RheSA9PT0gZGF5c0NvdW50ICYmIGNvdW50ZXIgPT09IDcpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZmxhZyA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIENhbGVuZGFyQ2VsbEkuc2V0Q2xhc3MoJ2VtcHR5Jyk7XHJcbiAgICAgICAgICAgICAgICAgICAgX2RheSA9IDA7XHJcbiAgICAgICAgICAgICAgICAgICAgZmxhZyA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuaXNUb2RheShfZGF5KSkge1xyXG4gICAgICAgICAgICAgICAgICAgIENhbGVuZGFyQ2VsbEkuYWRkQ2xhc3MoJ3RvZGF5Jyk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBpZiAoX2RheSA+IDApIHtcclxuICAgICAgICAgICAgICAgICAgICBDYWxlbmRhckNlbGxJLnNldENvbnRlbnREYXkoX2RheSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB3ZWVrLnB1c2goQ2FsZW5kYXJDZWxsSSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZmlyc3RJdGVyYXRpb24gPSBmYWxzZTtcclxuICAgICAgICAgICAgcmVzdWx0LnB1c2god2Vlayk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiByZXN1bHQ7XHJcbiAgICB9O1xyXG4gICAgRGF5UGlja2VyLnByb3RvdHlwZS5nZXRDbGFzc0ZvclNlbGVjdGVkRGF5cyA9IGZ1bmN0aW9uIChkYXkpIHtcclxuICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xyXG4gICAgICAgIHZhciBjaGVja2luZ0RheVRpbWUgPSAobmV3IERhdGUodGhpcy55ZWFyLCB0aGlzLm1vbnRoIC0gMSwgZGF5KSkuZ2V0VGltZSgpLCBzZWxlY3RlZFRpbWVzID0gW10sIHJlc3VsdCA9ICcnLCBtaW4sIG1heCwgbWF4SW5kZXg7XHJcbiAgICAgICAgdGhpcy5zZWxlY3RlZERheXMuZm9yRWFjaChmdW5jdGlvbiAoRGF5RGF0ZSkge1xyXG4gICAgICAgICAgICB2YXIgc2VsZWN0ZWREYXkgPSBEYXlEYXRlLmdldERhdGUoKSwgbW9udGggPSBEYXlEYXRlLmdldE1vbnRoKCkgKyAxLCB5ZWFyID0gRGF5RGF0ZS5nZXRGdWxsWWVhcigpO1xyXG4gICAgICAgICAgICBzZWxlY3RlZFRpbWVzLnB1c2goRGF5RGF0ZS5nZXRUaW1lKCkpO1xyXG4gICAgICAgICAgICBpZiAoc2VsZWN0ZWREYXkgPT09IGRheSAmJiBtb250aCA9PT0gX3RoaXMubW9udGggJiYgeWVhciA9PT0gX3RoaXMueWVhcikge1xyXG4gICAgICAgICAgICAgICAgcmVzdWx0ID0gJ2pwaWNrZXItc2VsZWN0ZWQtZGF5JztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIGlmIChyZXN1bHQubGVuZ3RoID09PSAwKSB7XHJcbiAgICAgICAgICAgIGlmIChzZWxlY3RlZFRpbWVzLmxlbmd0aCA8IDIgJiYgdGhpcy5kYXlXaXRoTW91c2UgIT09IG51bGwpIHtcclxuICAgICAgICAgICAgICAgIHNlbGVjdGVkVGltZXMucHVzaCh0aGlzLmRheVdpdGhNb3VzZS5nZXRUaW1lKCkpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHNlbGVjdGVkVGltZXMuc29ydCgpO1xyXG4gICAgICAgICAgICBtYXhJbmRleCA9IHNlbGVjdGVkVGltZXMubGVuZ3RoIC0gMTtcclxuICAgICAgICAgICAgbWluID0gVG9vbHMuZChzZWxlY3RlZFRpbWVzWzBdKSA/IHNlbGVjdGVkVGltZXNbMF0gOiBudWxsO1xyXG4gICAgICAgICAgICBtYXggPSBUb29scy5kKHNlbGVjdGVkVGltZXNbbWF4SW5kZXhdKSA/IHNlbGVjdGVkVGltZXNbbWF4SW5kZXhdIDogbnVsbDtcclxuICAgICAgICAgICAgaWYgKG1pbiAhPT0gbnVsbCAmJiBtYXggIT09IG51bGwgJiYgbWluIDwgY2hlY2tpbmdEYXlUaW1lICYmIGNoZWNraW5nRGF5VGltZSA8IG1heCkge1xyXG4gICAgICAgICAgICAgICAgcmVzdWx0ID0gJ2pwaWNrZXItc2VsZWN0ZWQtcmFuZ2UtZGF5JztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gcmVzdWx0O1xyXG4gICAgfTtcclxuICAgIERheVBpY2tlci5wcm90b3R5cGUuZ2V0TGFiZWxzUm93ID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHZhciByZXN1bHQgPSBbXTtcclxuICAgICAgICBKUGlja2VyQ29uZmlnLmdldCgpLmdldFdlZWtzRGF5cygpLmZvckVhY2goZnVuY3Rpb24gKGRheSkge1xyXG4gICAgICAgICAgICByZXN1bHQucHVzaCgobmV3IENhbGVuZGFyQ2VsbCkuc2V0Q29udGVudChkYXkpLnNldENsYXNzKCdqcGlja2VyLWxhYmVsJykpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHJldHVybiByZXN1bHQ7XHJcbiAgICB9O1xyXG4gICAgcmV0dXJuIERheVBpY2tlcjtcclxufShQaWNrZXIpKTtcclxuZXhwb3J0IHsgRGF5UGlja2VyIH07XHJcbiIsInZhciBIVE1MQnVpbGRlciA9IC8qKiBAY2xhc3MgKi8gKGZ1bmN0aW9uICgpIHtcclxuICAgIGZ1bmN0aW9uIEhUTUxCdWlsZGVyKCkge1xyXG4gICAgICAgIHRoaXMuSFRNTEVsZW1lbnQgPSBudWxsO1xyXG4gICAgICAgIHRoaXMubXVzdGFjaGVWYXJzID0ge307XHJcbiAgICAgICAgdGhpcy5ldmVudHMgPSBbXTtcclxuICAgIH1cclxuICAgIEhUTUxCdWlsZGVyLnByb3RvdHlwZS5nZXRIVE1MRWxlbWVudCA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICBpZiAodGhpcy5IVE1MRWxlbWVudCA9PT0gbnVsbCkge1xyXG4gICAgICAgICAgICB0aGlzLnByZXBhcmVFbGVtZW50KCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMucHJlcGFyZUV2ZW50cygpO1xyXG4gICAgICAgIHJldHVybiB0aGlzLkhUTUxFbGVtZW50O1xyXG4gICAgfTtcclxuICAgIEhUTUxCdWlsZGVyLnByb3RvdHlwZS5zZXRNdXN0YWNoZVBhdGggPSBmdW5jdGlvbiAobXVzdGFjaGVQYXRoKSB7XHJcbiAgICAgICAgdGhpcy5tdXN0YWNoZVBhdGggPSBtdXN0YWNoZVBhdGg7XHJcbiAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICB9O1xyXG4gICAgSFRNTEJ1aWxkZXIucHJvdG90eXBlLnNldE11c3RhY2hlVmFycyA9IGZ1bmN0aW9uIChtdXN0YWNoZVZhcnMpIHtcclxuICAgICAgICB0aGlzLm11c3RhY2hlVmFycyA9IG11c3RhY2hlVmFycztcclxuICAgICAgICByZXR1cm4gdGhpcztcclxuICAgIH07XHJcbiAgICBIVE1MQnVpbGRlci5wcm90b3R5cGUuYWRkRXZlbnQgPSBmdW5jdGlvbiAoc2VsZWN0b3IsIHR5cGUsIGNhbGxiYWNrKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuYWRkRXZlbnRPYmplY3Qoe1xyXG4gICAgICAgICAgICBzZWxlY3Rvcjogc2VsZWN0b3IsXHJcbiAgICAgICAgICAgIHR5cGU6IHR5cGUsXHJcbiAgICAgICAgICAgIGNhbGxiYWNrOiBjYWxsYmFja1xyXG4gICAgICAgIH0pO1xyXG4gICAgfTtcclxuICAgIEhUTUxCdWlsZGVyLnByb3RvdHlwZS5hZGRFdmVudE9iamVjdCA9IGZ1bmN0aW9uIChldmVudCkge1xyXG4gICAgICAgIHRoaXMuZXZlbnRzLnB1c2goZXZlbnQpO1xyXG4gICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgfTtcclxuICAgIEhUTUxCdWlsZGVyLnByb3RvdHlwZS5zZXRFdmVudHMgPSBmdW5jdGlvbiAoZXZlbnRzKSB7XHJcbiAgICAgICAgdGhpcy5ldmVudHMgPSBldmVudHM7XHJcbiAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICB9O1xyXG4gICAgSFRNTEJ1aWxkZXIucHJvdG90eXBlLnNldE11c3RhY2hlID0gZnVuY3Rpb24gKHJlcXVpcmVDYWxsYmFjaykge1xyXG4gICAgICAgIHRoaXMubXVzdGFjaGVSZXF1aXJlQ2FsbGJhY2sgPSByZXF1aXJlQ2FsbGJhY2s7XHJcbiAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICB9O1xyXG4gICAgSFRNTEJ1aWxkZXIucHJvdG90eXBlLnByZXBhcmVFbGVtZW50ID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHZhciBwYXJlbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcclxuICAgICAgICBwYXJlbnQuaW5uZXJIVE1MID0gdGhpcy5nZXRIVE1MRnJvbU11c3RhY2hlKCk7XHJcbiAgICAgICAgdGhpcy5IVE1MRWxlbWVudCA9IHBhcmVudC5maXJzdENoaWxkO1xyXG4gICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgfTtcclxuICAgIEhUTUxCdWlsZGVyLnByb3RvdHlwZS5wcmVwYXJlRXZlbnRzID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XHJcbiAgICAgICAgdGhpcy5ldmVudHMuZm9yRWFjaChmdW5jdGlvbiAoZXZlbnQpIHtcclxuICAgICAgICAgICAgdmFyIGVsZW1lbnRzO1xyXG4gICAgICAgICAgICBpZiAoZXZlbnQuc2VsZWN0b3IgPT09ICd0aGlzJykge1xyXG4gICAgICAgICAgICAgICAgZWxlbWVudHMgPSBbX3RoaXMuSFRNTEVsZW1lbnRdO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgZWxlbWVudHMgPSBfdGhpcy5IVE1MRWxlbWVudC5xdWVyeVNlbGVjdG9yQWxsKGV2ZW50LnNlbGVjdG9yKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbGVtZW50cy5mb3JFYWNoKGZ1bmN0aW9uIChFbGVtZW50KSB7XHJcbiAgICAgICAgICAgICAgICBFbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoZXZlbnQudHlwZSwgZXZlbnQuY2FsbGJhY2spO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9KTtcclxuICAgICAgICB0aGlzLmV2ZW50cyA9IFtdO1xyXG4gICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgfTtcclxuICAgIEhUTUxCdWlsZGVyLnByb3RvdHlwZS5nZXRIVE1MRnJvbU11c3RhY2hlID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLm11c3RhY2hlUmVxdWlyZUNhbGxiYWNrKHRoaXMubXVzdGFjaGVWYXJzKTtcclxuICAgIH07XHJcbiAgICByZXR1cm4gSFRNTEJ1aWxkZXI7XHJcbn0oKSk7XHJcbmV4cG9ydCB7IEhUTUxCdWlsZGVyIH07XHJcbiIsInZhciBIID0gcmVxdWlyZShcImhvZ2FuLmpzXCIpO1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbigpIHsgdmFyIFQgPSBuZXcgSC5UZW1wbGF0ZSh7Y29kZTogZnVuY3Rpb24gKGMscCxpKSB7IHZhciB0PXRoaXM7dC5iKGk9aXx8XCJcIik7dC5iKFwiPGRpdiBjbGFzcz1cXFwianBpY2tlci1oZWFkZXItd3JhcHBlclxcXCI+XFxyXCIpO3QuYihcIlxcblwiICsgaSk7dC5iKFwiICAgIDxkaXYgY2xhc3M9XFxcImpwaWNrZXItdGl0bGVcXFwiPlwiKTt0LmIodC52KHQuZihcInRpdGxlXCIsYyxwLDApKSk7dC5iKFwiPC9kaXY+XFxyXCIpO3QuYihcIlxcblwiICsgaSk7dC5iKFwiICAgIDxkaXYgY2xhc3M9XFxcImpwaWNrZXItZGVzY3JpcHRpb25cXFwiPlwiKTt0LmIodC52KHQuZihcImRlc2NyaXB0aW9uXCIsYyxwLDApKSk7dC5iKFwiPC9kaXY+XFxyXCIpO3QuYihcIlxcblwiICsgaSk7dC5iKFwiPC9kaXY+XFxyXCIpO3QuYihcIlxcblwiKTtyZXR1cm4gdC5mbCgpOyB9LHBhcnRpYWxzOiB7fSwgc3ViczogeyAgfX0sIFwiPGRpdiBjbGFzcz1cXFwianBpY2tlci1oZWFkZXItd3JhcHBlclxcXCI+XFxyXFxuICAgIDxkaXYgY2xhc3M9XFxcImpwaWNrZXItdGl0bGVcXFwiPnt7dGl0bGV9fTwvZGl2PlxcclxcbiAgICA8ZGl2IGNsYXNzPVxcXCJqcGlja2VyLWRlc2NyaXB0aW9uXFxcIj57e2Rlc2NyaXB0aW9ufX08L2Rpdj5cXHJcXG48L2Rpdj5cXHJcXG5cIiwgSCk7cmV0dXJuIFQucmVuZGVyLmFwcGx5KFQsIGFyZ3VtZW50cyk7IH07IiwidmFyIF9fZXh0ZW5kcyA9ICh0aGlzICYmIHRoaXMuX19leHRlbmRzKSB8fCAoZnVuY3Rpb24gKCkge1xyXG4gICAgdmFyIGV4dGVuZFN0YXRpY3MgPSBmdW5jdGlvbiAoZCwgYikge1xyXG4gICAgICAgIGV4dGVuZFN0YXRpY3MgPSBPYmplY3Quc2V0UHJvdG90eXBlT2YgfHxcclxuICAgICAgICAgICAgKHsgX19wcm90b19fOiBbXSB9IGluc3RhbmNlb2YgQXJyYXkgJiYgZnVuY3Rpb24gKGQsIGIpIHsgZC5fX3Byb3RvX18gPSBiOyB9KSB8fFxyXG4gICAgICAgICAgICBmdW5jdGlvbiAoZCwgYikgeyBmb3IgKHZhciBwIGluIGIpIGlmIChiLmhhc093blByb3BlcnR5KHApKSBkW3BdID0gYltwXTsgfTtcclxuICAgICAgICByZXR1cm4gZXh0ZW5kU3RhdGljcyhkLCBiKTtcclxuICAgIH07XHJcbiAgICByZXR1cm4gZnVuY3Rpb24gKGQsIGIpIHtcclxuICAgICAgICBleHRlbmRTdGF0aWNzKGQsIGIpO1xyXG4gICAgICAgIGZ1bmN0aW9uIF9fKCkgeyB0aGlzLmNvbnN0cnVjdG9yID0gZDsgfVxyXG4gICAgICAgIGQucHJvdG90eXBlID0gYiA9PT0gbnVsbCA/IE9iamVjdC5jcmVhdGUoYikgOiAoX18ucHJvdG90eXBlID0gYi5wcm90b3R5cGUsIG5ldyBfXygpKTtcclxuICAgIH07XHJcbn0pKCk7XHJcbmltcG9ydCB7IENvbXBvbmVudCB9IGZyb20gXCIuLi9Db21wb25lbnRcIjtcclxudmFyIEhlYWRlciA9IC8qKiBAY2xhc3MgKi8gKGZ1bmN0aW9uIChfc3VwZXIpIHtcclxuICAgIF9fZXh0ZW5kcyhIZWFkZXIsIF9zdXBlcik7XHJcbiAgICBmdW5jdGlvbiBIZWFkZXIodGl0bGUsIGRlc2NyaXB0aW9uKSB7XHJcbiAgICAgICAgaWYgKHRpdGxlID09PSB2b2lkIDApIHsgdGl0bGUgPSAnJzsgfVxyXG4gICAgICAgIGlmIChkZXNjcmlwdGlvbiA9PT0gdm9pZCAwKSB7IGRlc2NyaXB0aW9uID0gJyc7IH1cclxuICAgICAgICB2YXIgX3RoaXMgPSBfc3VwZXIuY2FsbCh0aGlzKSB8fCB0aGlzO1xyXG4gICAgICAgIF90aGlzLnRpdGxlID0gdGl0bGU7XHJcbiAgICAgICAgX3RoaXMuZGVzY3JpcHRpb24gPSBkZXNjcmlwdGlvbjtcclxuICAgICAgICByZXR1cm4gX3RoaXM7XHJcbiAgICB9XHJcbiAgICBIZWFkZXIucHJvdG90eXBlLmdldE11c3RhY2hlVmFycyA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICB0aXRsZTogdGhpcy50aXRsZSxcclxuICAgICAgICAgICAgZGVzY3JpcHRpb246IHRoaXMuZGVzY3JpcHRpb25cclxuICAgICAgICB9O1xyXG4gICAgfTtcclxuICAgIEhlYWRlci5wcm90b3R5cGUuZ2V0TXVzdGFjaGUgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgcmV0dXJuIHJlcXVpcmUoJy4vSGVhZGVyLm11c3RhY2hlJyk7XHJcbiAgICB9O1xyXG4gICAgcmV0dXJuIEhlYWRlcjtcclxufShDb21wb25lbnQpKTtcclxuZXhwb3J0IHsgSGVhZGVyIH07XHJcbiIsInZhciBIID0gcmVxdWlyZShcImhvZ2FuLmpzXCIpO1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbigpIHsgdmFyIFQgPSBuZXcgSC5UZW1wbGF0ZSh7Y29kZTogZnVuY3Rpb24gKGMscCxpKSB7IHZhciB0PXRoaXM7dC5iKGk9aXx8XCJcIik7dC5iKFwiPGRpdiBjbGFzcz1cXFwianBpY2tlci13cmFwcGVyXFxcIj48L2Rpdj5cXHJcIik7dC5iKFwiXFxuXCIpO3JldHVybiB0LmZsKCk7IH0scGFydGlhbHM6IHt9LCBzdWJzOiB7ICB9fSwgXCI8ZGl2IGNsYXNzPVxcXCJqcGlja2VyLXdyYXBwZXJcXFwiPjwvZGl2PlxcclxcblwiLCBIKTtyZXR1cm4gVC5yZW5kZXIuYXBwbHkoVCwgYXJndW1lbnRzKTsgfTsiLCJ2YXIgX19leHRlbmRzID0gKHRoaXMgJiYgdGhpcy5fX2V4dGVuZHMpIHx8IChmdW5jdGlvbiAoKSB7XHJcbiAgICB2YXIgZXh0ZW5kU3RhdGljcyA9IGZ1bmN0aW9uIChkLCBiKSB7XHJcbiAgICAgICAgZXh0ZW5kU3RhdGljcyA9IE9iamVjdC5zZXRQcm90b3R5cGVPZiB8fFxyXG4gICAgICAgICAgICAoeyBfX3Byb3RvX186IFtdIH0gaW5zdGFuY2VvZiBBcnJheSAmJiBmdW5jdGlvbiAoZCwgYikgeyBkLl9fcHJvdG9fXyA9IGI7IH0pIHx8XHJcbiAgICAgICAgICAgIGZ1bmN0aW9uIChkLCBiKSB7IGZvciAodmFyIHAgaW4gYikgaWYgKGIuaGFzT3duUHJvcGVydHkocCkpIGRbcF0gPSBiW3BdOyB9O1xyXG4gICAgICAgIHJldHVybiBleHRlbmRTdGF0aWNzKGQsIGIpO1xyXG4gICAgfTtcclxuICAgIHJldHVybiBmdW5jdGlvbiAoZCwgYikge1xyXG4gICAgICAgIGV4dGVuZFN0YXRpY3MoZCwgYik7XHJcbiAgICAgICAgZnVuY3Rpb24gX18oKSB7IHRoaXMuY29uc3RydWN0b3IgPSBkOyB9XHJcbiAgICAgICAgZC5wcm90b3R5cGUgPSBiID09PSBudWxsID8gT2JqZWN0LmNyZWF0ZShiKSA6IChfXy5wcm90b3R5cGUgPSBiLnByb3RvdHlwZSwgbmV3IF9fKCkpO1xyXG4gICAgfTtcclxufSkoKTtcclxuaW1wb3J0IHsgRE9NIH0gZnJvbSBcIi4uLy4uL0NsYXNzZXMvRE9NXCI7XHJcbmltcG9ydCB7IEpQaWNrZXJDb25maWcgfSBmcm9tIFwiLi4vLi4vQ2xhc3Nlcy9KUGlja2VyQ29uZmlnXCI7XHJcbmltcG9ydCB7IENvbXBvbmVudCB9IGZyb20gXCIuLi9Db21wb25lbnRcIjtcclxuaW1wb3J0IHsgRXZlbnQgfSBmcm9tIFwiLi4vLi4vQ2xhc3Nlcy9FdmVudFwiO1xyXG5pbXBvcnQgeyBKUGlja2VyQnVpbGRlciB9IGZyb20gXCIuL0pQaWNrZXJCdWlsZGVyXCI7XHJcbmltcG9ydCB7IEpQaWNrZXJFdmVudHMgfSBmcm9tIFwiLi9KUGlja2VyRXZlbnRzXCI7XHJcbmltcG9ydCB7IEpQaWNrZXJDaGFuZ2VyIH0gZnJvbSBcIi4vSlBpY2tlckNoYW5nZXJcIjtcclxudmFyIEpQaWNrZXIgPSAvKiogQGNsYXNzICovIChmdW5jdGlvbiAoX3N1cGVyKSB7XHJcbiAgICBfX2V4dGVuZHMoSlBpY2tlciwgX3N1cGVyKTtcclxuICAgIGZ1bmN0aW9uIEpQaWNrZXIoY29uZmlnKSB7XHJcbiAgICAgICAgaWYgKGNvbmZpZyA9PT0gdm9pZCAwKSB7IGNvbmZpZyA9IG51bGw7IH1cclxuICAgICAgICB2YXIgX3RoaXMgPSBfc3VwZXIuY2FsbCh0aGlzKSB8fCB0aGlzO1xyXG4gICAgICAgIEpQaWNrZXJDb25maWcuZ2V0KCkuc2V0Q29uZmlnKGNvbmZpZyk7XHJcbiAgICAgICAgRXZlbnQuZ2V0KCkuc2V0SlBpY2tlcihfdGhpcyk7XHJcbiAgICAgICAgX3RoaXMuSlBpY2tlckJ1aWxkZXJJID0gbmV3IEpQaWNrZXJCdWlsZGVyKF90aGlzKTtcclxuICAgICAgICBfdGhpcy5KUGlja2VyRXZlbnRzSSA9IG5ldyBKUGlja2VyRXZlbnRzKF90aGlzKTtcclxuICAgICAgICBfdGhpcy5KUGlja2VyQ2hhbmdlckkgPSBuZXcgSlBpY2tlckNoYW5nZXIoX3RoaXMpO1xyXG4gICAgICAgIF90aGlzLnJ1bigpO1xyXG4gICAgICAgIHJldHVybiBfdGhpcztcclxuICAgIH1cclxuICAgIEpQaWNrZXIucHJvdG90eXBlLmdldEJ1aWxkZXIgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuSlBpY2tlckJ1aWxkZXJJO1xyXG4gICAgfTtcclxuICAgIEpQaWNrZXIucHJvdG90eXBlLmdldEN1cnJlbnRWYWx1ZSA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5jdXJyZW50VmFsdWU7XHJcbiAgICB9O1xyXG4gICAgSlBpY2tlci5wcm90b3R5cGUuc2V0Q3VycmVudFZhbHVlID0gZnVuY3Rpb24gKGN1cnJlbnRWYWx1ZSkge1xyXG4gICAgICAgIHRoaXMuY3VycmVudFZhbHVlID0gY3VycmVudFZhbHVlO1xyXG4gICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgfTtcclxuICAgIEpQaWNrZXIucHJvdG90eXBlLmdldFZpc2libGVEYXRlID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLnZpc2libGVEYXRlO1xyXG4gICAgfTtcclxuICAgIEpQaWNrZXIucHJvdG90eXBlLnNldFZpc2libGVEYXRlID0gZnVuY3Rpb24gKHZpc2libGVEYXRlKSB7XHJcbiAgICAgICAgdGhpcy52aXNpYmxlRGF0ZSA9IHZpc2libGVEYXRlO1xyXG4gICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgfTtcclxuICAgIEpQaWNrZXIucHJvdG90eXBlLmNoYW5nZURhdGUgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICB9O1xyXG4gICAgSlBpY2tlci5wcm90b3R5cGUucnVuID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHZhciBXcmFwcGVyID0gbmV3IERPTShKUGlja2VyQ29uZmlnLmdldCgpLmdldFdyYXBwZXIoKSk7XHJcbiAgICAgICAgdGhpcy5KUGlja2VyQnVpbGRlckkuYnVpbGRIVE1MKCk7XHJcbiAgICAgICAgdGhpcy5KUGlja2VyRXZlbnRzSS5jcmVhdGVFdmVudHMoKTtcclxuICAgICAgICBXcmFwcGVyLmdldCgpLmFwcGVuZENoaWxkKHRoaXMuZ2V0SFRNTEVsZW1lbnQoKSk7XHJcbiAgICB9O1xyXG4gICAgSlBpY2tlci5wcm90b3R5cGUuZ2V0TXVzdGFjaGUgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgcmV0dXJuIHJlcXVpcmUoJy4vSlBpY2tlci5tdXN0YWNoZScpO1xyXG4gICAgfTtcclxuICAgIHJldHVybiBKUGlja2VyO1xyXG59KENvbXBvbmVudCkpO1xyXG5leHBvcnQgeyBKUGlja2VyIH07XHJcbiIsInZhciBfX2V4dGVuZHMgPSAodGhpcyAmJiB0aGlzLl9fZXh0ZW5kcykgfHwgKGZ1bmN0aW9uICgpIHtcclxuICAgIHZhciBleHRlbmRTdGF0aWNzID0gZnVuY3Rpb24gKGQsIGIpIHtcclxuICAgICAgICBleHRlbmRTdGF0aWNzID0gT2JqZWN0LnNldFByb3RvdHlwZU9mIHx8XHJcbiAgICAgICAgICAgICh7IF9fcHJvdG9fXzogW10gfSBpbnN0YW5jZW9mIEFycmF5ICYmIGZ1bmN0aW9uIChkLCBiKSB7IGQuX19wcm90b19fID0gYjsgfSkgfHxcclxuICAgICAgICAgICAgZnVuY3Rpb24gKGQsIGIpIHsgZm9yICh2YXIgcCBpbiBiKSBpZiAoYi5oYXNPd25Qcm9wZXJ0eShwKSkgZFtwXSA9IGJbcF07IH07XHJcbiAgICAgICAgcmV0dXJuIGV4dGVuZFN0YXRpY3MoZCwgYik7XHJcbiAgICB9O1xyXG4gICAgcmV0dXJuIGZ1bmN0aW9uIChkLCBiKSB7XHJcbiAgICAgICAgZXh0ZW5kU3RhdGljcyhkLCBiKTtcclxuICAgICAgICBmdW5jdGlvbiBfXygpIHsgdGhpcy5jb25zdHJ1Y3RvciA9IGQ7IH1cclxuICAgICAgICBkLnByb3RvdHlwZSA9IGIgPT09IG51bGwgPyBPYmplY3QuY3JlYXRlKGIpIDogKF9fLnByb3RvdHlwZSA9IGIucHJvdG90eXBlLCBuZXcgX18oKSk7XHJcbiAgICB9O1xyXG59KSgpO1xyXG5pbXBvcnQgeyBIZWFkZXIgfSBmcm9tIFwiLi4vSGVhZGVyL0hlYWRlclwiO1xyXG5pbXBvcnQgeyBNZW51IH0gZnJvbSBcIi4uL01lbnUvTWVudVwiO1xyXG5pbXBvcnQgeyBEYXlQaWNrZXIgfSBmcm9tIFwiLi4vRGF5UGlja2VyL0RheVBpY2tlclwiO1xyXG5pbXBvcnQgeyBNb250aFBpY2tlciB9IGZyb20gXCIuLi9Nb250aFBpY2tlci9Nb250aFBpY2tlclwiO1xyXG5pbXBvcnQgeyBZZWFyUGlja2VyIH0gZnJvbSBcIi4uL1llYXJQaWNrZXIvWWVhclBpY2tlclwiO1xyXG5pbXBvcnQgeyBWYWx1ZSB9IGZyb20gXCIuLi9WYWx1ZS9WYWx1ZVwiO1xyXG5pbXBvcnQgeyBKUGlja2VySGVscGVyIH0gZnJvbSBcIi4vSlBpY2tlckhlbHBlclwiO1xyXG5pbXBvcnQgeyBUb29scyB9IGZyb20gXCIuLi8uLi9DbGFzc2VzL1Rvb2xzXCI7XHJcbmltcG9ydCB7IFJhbmdlcyB9IGZyb20gXCIuLi9SYW5nZXMvUmFuZ2VzXCI7XHJcbnZhciBKUGlja2VyQnVpbGRlciA9IC8qKiBAY2xhc3MgKi8gKGZ1bmN0aW9uIChfc3VwZXIpIHtcclxuICAgIF9fZXh0ZW5kcyhKUGlja2VyQnVpbGRlciwgX3N1cGVyKTtcclxuICAgIGZ1bmN0aW9uIEpQaWNrZXJCdWlsZGVyKCkge1xyXG4gICAgICAgIHJldHVybiBfc3VwZXIgIT09IG51bGwgJiYgX3N1cGVyLmFwcGx5KHRoaXMsIGFyZ3VtZW50cykgfHwgdGhpcztcclxuICAgIH1cclxuICAgIEpQaWNrZXJCdWlsZGVyLnByb3RvdHlwZS5idWlsZEhUTUwgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgdmFyIEpQaWNrZXJIVE1MID0gdGhpcy5KUGlja2VySS5nZXRIVE1MRWxlbWVudCgpO1xyXG4gICAgICAgIHRoaXNcclxuICAgICAgICAgICAgLnByZXBhcmVIZWFkZXIoKVxyXG4gICAgICAgICAgICAucHJlcGFyZVZhbHVlKClcclxuICAgICAgICAgICAgLnByZXBhcmVNZW51KClcclxuICAgICAgICAgICAgLnByZXBhcmVEYXlQaWNrZXIoKVxyXG4gICAgICAgICAgICAucHJlcGFyZU1vbnRoUGlja2VyKClcclxuICAgICAgICAgICAgLnByZXBhcmVZZWFyUGlja2VyKClcclxuICAgICAgICAgICAgLnByZXBhcmVSYW5nZXMoKTtcclxuICAgICAgICBKUGlja2VySFRNTC5hcHBlbmRDaGlsZCh0aGlzLkhlYWRlckkuZ2V0SFRNTEVsZW1lbnQoKSk7XHJcbiAgICAgICAgSlBpY2tlckhUTUwuYXBwZW5kQ2hpbGQodGhpcy5WYWx1ZUkuZ2V0SFRNTEVsZW1lbnQoKSk7XHJcbiAgICAgICAgSlBpY2tlckhUTUwuYXBwZW5kQ2hpbGQodGhpcy5NZW51SS5nZXRIVE1MRWxlbWVudCgpKTtcclxuICAgICAgICBKUGlja2VySFRNTC5hcHBlbmRDaGlsZCh0aGlzLkRheVBpY2tlckkuZ2V0SFRNTEVsZW1lbnQoKSk7XHJcbiAgICAgICAgaWYgKHRoaXMuSlBpY2tlckNvbmZpZ0kuc2hvd1Jhbmdlc1ByZWRlZmluZWQoKSkge1xyXG4gICAgICAgICAgICBKUGlja2VySFRNTC5hcHBlbmRDaGlsZCh0aGlzLlJhbmdlc0kuZ2V0SFRNTEVsZW1lbnQoKSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vSlBpY2tlckhUTUwuYXBwZW5kQ2hpbGQodGhpcy5Nb250aFBpY2tlckkuZ2V0SFRNTEVsZW1lbnQoKSk7XHJcbiAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICB9O1xyXG4gICAgSlBpY2tlckJ1aWxkZXIucHJvdG90eXBlLmdldEhlYWRlciA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5IZWFkZXJJO1xyXG4gICAgfTtcclxuICAgIEpQaWNrZXJCdWlsZGVyLnByb3RvdHlwZS5nZXRWYWx1ZSA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5WYWx1ZUk7XHJcbiAgICB9O1xyXG4gICAgSlBpY2tlckJ1aWxkZXIucHJvdG90eXBlLmdldE1lbnUgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuTWVudUk7XHJcbiAgICB9O1xyXG4gICAgSlBpY2tlckJ1aWxkZXIucHJvdG90eXBlLnNldERheVBpY2tlciA9IGZ1bmN0aW9uIChEYXlQaWNrZXJJKSB7XHJcbiAgICAgICAgdGhpcy5EYXlQaWNrZXJJID0gRGF5UGlja2VySTtcclxuICAgICAgICByZXR1cm4gdGhpcztcclxuICAgIH07XHJcbiAgICBKUGlja2VyQnVpbGRlci5wcm90b3R5cGUuZ2V0RGF5UGlja2VyID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLkRheVBpY2tlckk7XHJcbiAgICB9O1xyXG4gICAgSlBpY2tlckJ1aWxkZXIucHJvdG90eXBlLmdldE1vbnRoUGlja2VyID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLk1vbnRoUGlja2VySTtcclxuICAgIH07XHJcbiAgICBKUGlja2VyQnVpbGRlci5wcm90b3R5cGUuZ2V0WWVhclBpY2tlciA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5ZZWFyUGlja2VySTtcclxuICAgIH07XHJcbiAgICBKUGlja2VyQnVpbGRlci5wcm90b3R5cGUuZ2V0UmFuZ2VzID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLlJhbmdlc0k7XHJcbiAgICB9O1xyXG4gICAgSlBpY2tlckJ1aWxkZXIucHJvdG90eXBlLnByZXBhcmVIZWFkZXIgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgdmFyIHRpdGxlID0gdGhpcy5KUGlja2VyQ29uZmlnSS5nZXRUZXh0VmFsdWUoJ3RpdGxlJyksIGRlc2NyaXB0aW9uID0gdGhpcy5KUGlja2VyQ29uZmlnSS5nZXRUZXh0VmFsdWUoJ2Rlc2NyaXB0aW9uJyk7XHJcbiAgICAgICAgdGhpcy5IZWFkZXJJID0gbmV3IEhlYWRlcih0aXRsZSwgZGVzY3JpcHRpb24pO1xyXG4gICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgfTtcclxuICAgIEpQaWNrZXJCdWlsZGVyLnByb3RvdHlwZS5wcmVwYXJlVmFsdWUgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgdmFyIGN1cnJlbnRWYWx1ZSA9IHRoaXMuSlBpY2tlckNvbmZpZ0kuZ2V0Q3VycmVudFZhbHVlKCk7XHJcbiAgICAgICAgdGhpcy5KUGlja2VySS5zZXRDdXJyZW50VmFsdWUoY3VycmVudFZhbHVlKTtcclxuICAgICAgICB0aGlzLlZhbHVlSSA9IG5ldyBWYWx1ZShjdXJyZW50VmFsdWVbMF0sIGN1cnJlbnRWYWx1ZVsxXSB8fCBudWxsKTtcclxuICAgICAgICByZXR1cm4gdGhpcztcclxuICAgIH07XHJcbiAgICBKUGlja2VyQnVpbGRlci5wcm90b3R5cGUucHJlcGFyZU1lbnUgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgdmFyIGN1cnJlbnREYXRlID0gdGhpcy5KUGlja2VyQ29uZmlnSS5nZXRDdXJyZW50VmFsdWUoKVswXTtcclxuICAgICAgICB0aGlzLk1lbnVJID0gbmV3IE1lbnUoY3VycmVudERhdGUuZ2V0TW9udGgoKSArIDEsIGN1cnJlbnREYXRlLmdldEZ1bGxZZWFyKCkpO1xyXG4gICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgfTtcclxuICAgIEpQaWNrZXJCdWlsZGVyLnByb3RvdHlwZS5wcmVwYXJlRGF5UGlja2VyID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHZhciBjdXJyZW50VmFsdWVzID0gdGhpcy5KUGlja2VyQ29uZmlnSS5nZXRDdXJyZW50VmFsdWUoKSwgY3VycmVudERhdGUgPSBjdXJyZW50VmFsdWVzWzBdLCBtID0gY3VycmVudERhdGUuZ2V0TW9udGgoKSArIDEsIHkgPSBjdXJyZW50RGF0ZS5nZXRGdWxsWWVhcigpO1xyXG4gICAgICAgIHRoaXMuSlBpY2tlckkuc2V0VmlzaWJsZURhdGUoW20sIHldKTtcclxuICAgICAgICB0aGlzLkRheVBpY2tlckkgPSBuZXcgRGF5UGlja2VyKG0sIHkpO1xyXG4gICAgICAgIHRoaXMuRGF5UGlja2VySS5zZXRTZWxlY3RlZERheShjdXJyZW50RGF0ZSwgMCk7XHJcbiAgICAgICAgaWYgKFRvb2xzLmQoY3VycmVudFZhbHVlc1sxXSkpIHtcclxuICAgICAgICAgICAgdGhpcy5EYXlQaWNrZXJJLnNldFNlbGVjdGVkRGF5KGN1cnJlbnRWYWx1ZXNbMV0sIDEpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdGhpcztcclxuICAgIH07XHJcbiAgICBKUGlja2VyQnVpbGRlci5wcm90b3R5cGUucHJlcGFyZU1vbnRoUGlja2VyID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHZhciBjdXJyZW50RGF0ZSA9IHRoaXMuSlBpY2tlckNvbmZpZ0kuZ2V0Q3VycmVudFZhbHVlKClbMF07XHJcbiAgICAgICAgdGhpcy5Nb250aFBpY2tlckkgPSBuZXcgTW9udGhQaWNrZXIoY3VycmVudERhdGUuZ2V0TW9udGgoKSArIDEpO1xyXG4gICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgfTtcclxuICAgIEpQaWNrZXJCdWlsZGVyLnByb3RvdHlwZS5wcmVwYXJlWWVhclBpY2tlciA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICB2YXIgY3VycmVudERhdGUgPSB0aGlzLkpQaWNrZXJDb25maWdJLmdldEN1cnJlbnRWYWx1ZSgpWzBdO1xyXG4gICAgICAgIHRoaXMuWWVhclBpY2tlckkgPSBuZXcgWWVhclBpY2tlcihjdXJyZW50RGF0ZS5nZXRGdWxsWWVhcigpKTtcclxuICAgICAgICByZXR1cm4gdGhpcztcclxuICAgIH07XHJcbiAgICBKUGlja2VyQnVpbGRlci5wcm90b3R5cGUucHJlcGFyZVJhbmdlcyA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICB0aGlzLlJhbmdlc0kgPSBuZXcgUmFuZ2VzKCk7XHJcbiAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICB9O1xyXG4gICAgcmV0dXJuIEpQaWNrZXJCdWlsZGVyO1xyXG59KEpQaWNrZXJIZWxwZXIpKTtcclxuZXhwb3J0IHsgSlBpY2tlckJ1aWxkZXIgfTtcclxuIiwidmFyIF9fZXh0ZW5kcyA9ICh0aGlzICYmIHRoaXMuX19leHRlbmRzKSB8fCAoZnVuY3Rpb24gKCkge1xyXG4gICAgdmFyIGV4dGVuZFN0YXRpY3MgPSBmdW5jdGlvbiAoZCwgYikge1xyXG4gICAgICAgIGV4dGVuZFN0YXRpY3MgPSBPYmplY3Quc2V0UHJvdG90eXBlT2YgfHxcclxuICAgICAgICAgICAgKHsgX19wcm90b19fOiBbXSB9IGluc3RhbmNlb2YgQXJyYXkgJiYgZnVuY3Rpb24gKGQsIGIpIHsgZC5fX3Byb3RvX18gPSBiOyB9KSB8fFxyXG4gICAgICAgICAgICBmdW5jdGlvbiAoZCwgYikgeyBmb3IgKHZhciBwIGluIGIpIGlmIChiLmhhc093blByb3BlcnR5KHApKSBkW3BdID0gYltwXTsgfTtcclxuICAgICAgICByZXR1cm4gZXh0ZW5kU3RhdGljcyhkLCBiKTtcclxuICAgIH07XHJcbiAgICByZXR1cm4gZnVuY3Rpb24gKGQsIGIpIHtcclxuICAgICAgICBleHRlbmRTdGF0aWNzKGQsIGIpO1xyXG4gICAgICAgIGZ1bmN0aW9uIF9fKCkgeyB0aGlzLmNvbnN0cnVjdG9yID0gZDsgfVxyXG4gICAgICAgIGQucHJvdG90eXBlID0gYiA9PT0gbnVsbCA/IE9iamVjdC5jcmVhdGUoYikgOiAoX18ucHJvdG90eXBlID0gYi5wcm90b3R5cGUsIG5ldyBfXygpKTtcclxuICAgIH07XHJcbn0pKCk7XHJcbmltcG9ydCB7IEpQaWNrZXJIZWxwZXIgfSBmcm9tIFwiLi9KUGlja2VySGVscGVyXCI7XHJcbnZhciBKUGlja2VyQ2hhbmdlciA9IC8qKiBAY2xhc3MgKi8gKGZ1bmN0aW9uIChfc3VwZXIpIHtcclxuICAgIF9fZXh0ZW5kcyhKUGlja2VyQ2hhbmdlciwgX3N1cGVyKTtcclxuICAgIGZ1bmN0aW9uIEpQaWNrZXJDaGFuZ2VyKCkge1xyXG4gICAgICAgIHJldHVybiBfc3VwZXIgIT09IG51bGwgJiYgX3N1cGVyLmFwcGx5KHRoaXMsIGFyZ3VtZW50cykgfHwgdGhpcztcclxuICAgIH1cclxuICAgIHJldHVybiBKUGlja2VyQ2hhbmdlcjtcclxufShKUGlja2VySGVscGVyKSk7XHJcbmV4cG9ydCB7IEpQaWNrZXJDaGFuZ2VyIH07XHJcbiIsInZhciBfX2V4dGVuZHMgPSAodGhpcyAmJiB0aGlzLl9fZXh0ZW5kcykgfHwgKGZ1bmN0aW9uICgpIHtcclxuICAgIHZhciBleHRlbmRTdGF0aWNzID0gZnVuY3Rpb24gKGQsIGIpIHtcclxuICAgICAgICBleHRlbmRTdGF0aWNzID0gT2JqZWN0LnNldFByb3RvdHlwZU9mIHx8XHJcbiAgICAgICAgICAgICh7IF9fcHJvdG9fXzogW10gfSBpbnN0YW5jZW9mIEFycmF5ICYmIGZ1bmN0aW9uIChkLCBiKSB7IGQuX19wcm90b19fID0gYjsgfSkgfHxcclxuICAgICAgICAgICAgZnVuY3Rpb24gKGQsIGIpIHsgZm9yICh2YXIgcCBpbiBiKSBpZiAoYi5oYXNPd25Qcm9wZXJ0eShwKSkgZFtwXSA9IGJbcF07IH07XHJcbiAgICAgICAgcmV0dXJuIGV4dGVuZFN0YXRpY3MoZCwgYik7XHJcbiAgICB9O1xyXG4gICAgcmV0dXJuIGZ1bmN0aW9uIChkLCBiKSB7XHJcbiAgICAgICAgZXh0ZW5kU3RhdGljcyhkLCBiKTtcclxuICAgICAgICBmdW5jdGlvbiBfXygpIHsgdGhpcy5jb25zdHJ1Y3RvciA9IGQ7IH1cclxuICAgICAgICBkLnByb3RvdHlwZSA9IGIgPT09IG51bGwgPyBPYmplY3QuY3JlYXRlKGIpIDogKF9fLnByb3RvdHlwZSA9IGIucHJvdG90eXBlLCBuZXcgX18oKSk7XHJcbiAgICB9O1xyXG59KSgpO1xyXG5pbXBvcnQgeyBFdmVudCB9IGZyb20gXCIuLi8uLi9DbGFzc2VzL0V2ZW50XCI7XHJcbmltcG9ydCB7IERBWV9DTElDSywgREFZX01PVVNFX0VOVEVSLCBEQVlfTU9VU0VfTEVBVkUsIE5FWFRfTU9OVEhfQ0xJQ0ssIFBSRVZfTU9OVEhfQ0xJQ0ssIFJBTkdFX0NMSUNLLCBWQUxVRV9DTElDSyB9IGZyb20gXCIuLi8uLi9DbGFzc2VzL0V2ZW50c0RpY3RcIjtcclxuaW1wb3J0IHsgVG9vbHMgfSBmcm9tIFwiLi4vLi4vQ2xhc3Nlcy9Ub29sc1wiO1xyXG5pbXBvcnQgeyBKUGlja2VySGVscGVyIH0gZnJvbSBcIi4vSlBpY2tlckhlbHBlclwiO1xyXG52YXIgSlBpY2tlckV2ZW50cyA9IC8qKiBAY2xhc3MgKi8gKGZ1bmN0aW9uIChfc3VwZXIpIHtcclxuICAgIF9fZXh0ZW5kcyhKUGlja2VyRXZlbnRzLCBfc3VwZXIpO1xyXG4gICAgZnVuY3Rpb24gSlBpY2tlckV2ZW50cygpIHtcclxuICAgICAgICB2YXIgX3RoaXMgPSBfc3VwZXIgIT09IG51bGwgJiYgX3N1cGVyLmFwcGx5KHRoaXMsIGFyZ3VtZW50cykgfHwgdGhpcztcclxuICAgICAgICBfdGhpcy5kYXlzU2VsZWN0ZWQgPSAwO1xyXG4gICAgICAgIHJldHVybiBfdGhpcztcclxuICAgIH1cclxuICAgIEpQaWNrZXJFdmVudHMucHJvdG90eXBlLmNyZWF0ZUV2ZW50cyA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICByZXR1cm4gdGhpc1xyXG4gICAgICAgICAgICAuYWRkTGlzdGVuZXJzKHRoaXMuZ2V0RGVmYXVsdEV2ZW50cygpKVxyXG4gICAgICAgICAgICAuYWRkTGlzdGVuZXJzKHRoaXMuSlBpY2tlckNvbmZpZ0kuZ2V0T2JqZWN0VmFsdWUoJ2V2ZW50cycpKTtcclxuICAgIH07XHJcbiAgICBKUGlja2VyRXZlbnRzLnByb3RvdHlwZS5uZXh0TW9udGhDbGljayA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5jaGFuZ2VNb250aCh0cnVlKTtcclxuICAgIH07XHJcbiAgICBKUGlja2VyRXZlbnRzLnByb3RvdHlwZS5wcmV2TW9udGhDbGljayA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5jaGFuZ2VNb250aChmYWxzZSk7XHJcbiAgICB9O1xyXG4gICAgSlBpY2tlckV2ZW50cy5wcm90b3R5cGUuZ2V0RGVmYXVsdEV2ZW50cyA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICB2YXIgcmVzdWx0ID0ge30sIHRoYXQgPSB0aGlzO1xyXG4gICAgICAgIFtcclxuICAgICAgICAgICAgW05FWFRfTU9OVEhfQ0xJQ0ssIHRoaXMubmV4dE1vbnRoQ2xpY2tdLFxyXG4gICAgICAgICAgICBbUFJFVl9NT05USF9DTElDSywgdGhpcy5wcmV2TW9udGhDbGlja10sXHJcbiAgICAgICAgICAgIFtEQVlfQ0xJQ0ssIHRoaXMuZGF5Q2xpY2tdLFxyXG4gICAgICAgICAgICBbREFZX01PVVNFX0VOVEVSLCB0aGlzLmRheU1vdXNlRW50ZXJdLFxyXG4gICAgICAgICAgICBbREFZX01PVVNFX0xFQVZFLCB0aGlzLmRheU1vdXNlTGVhdmVdLFxyXG4gICAgICAgICAgICBbUkFOR0VfQ0xJQ0ssIHRoaXMucmFuZ2VDbGlja10sXHJcbiAgICAgICAgICAgIFtWQUxVRV9DTElDSywgdGhpcy52YWx1ZUNsaWNrXSxcclxuICAgICAgICBdLmZvckVhY2goZnVuY3Rpb24gKGV2ZW50QXJyYXkpIHtcclxuICAgICAgICAgICAgcmVzdWx0W2V2ZW50QXJyYXlbMF0udG9TdHJpbmcoKV0gPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICBldmVudEFycmF5WzFdLmFwcGx5KHRoYXQsIGFyZ3VtZW50cyk7XHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcclxuICAgIH07XHJcbiAgICBKUGlja2VyRXZlbnRzLnByb3RvdHlwZS5hZGRMaXN0ZW5lcnMgPSBmdW5jdGlvbiAoZXZlbnRzKSB7XHJcbiAgICAgICAgZm9yICh2YXIgZXZlbnROYW1lIGluIGV2ZW50cykge1xyXG4gICAgICAgICAgICBpZiAoVG9vbHMuaXNGdW5jdGlvbihldmVudHNbZXZlbnROYW1lXSkpIHtcclxuICAgICAgICAgICAgICAgIEV2ZW50LmdldCgpLmFkZExpc3RlbmVyKGV2ZW50TmFtZSwgZXZlbnRzW2V2ZW50TmFtZV0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgfTtcclxuICAgIEpQaWNrZXJFdmVudHMucHJvdG90eXBlLmRheUNsaWNrID0gZnVuY3Rpb24gKGRheSwgZGF0ZSkge1xyXG4gICAgICAgIHZhciBEYXRlSSA9IG5ldyBEYXRlKGRhdGVbMl0sIGRhdGVbMV0gLSAxLCBkYXRlWzBdKTtcclxuICAgICAgICBpZiAodGhpcy5KUGlja2VyQ29uZmlnSS5pc1JhbmdlKCkpIHtcclxuICAgICAgICAgICAgaWYgKCh0aGlzLmRheXNTZWxlY3RlZCAlIDIpID09PSAwKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmRhdGVPbmVUbXAgPSBEYXRlSTtcclxuICAgICAgICAgICAgICAgIHRoaXMuZGF0ZVR3b1RtcCA9IG51bGw7XHJcbiAgICAgICAgICAgICAgICB0aGlzLkpQaWNrZXJJLmdldEJ1aWxkZXIoKS5nZXRWYWx1ZSgpLnNldERhdGVPbmUoRGF0ZUkpLnNldERhdGVUd29PcGFjaXR5KHRydWUpLnJlZnJlc2goKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuSlBpY2tlckkuZ2V0QnVpbGRlcigpXHJcbiAgICAgICAgICAgICAgICAgICAgLmdldERheVBpY2tlcigpXHJcbiAgICAgICAgICAgICAgICAgICAgLnNldFNlbGVjdGVkRGF5KERhdGVJLCAwKVxyXG4gICAgICAgICAgICAgICAgICAgIC5zZXRTZWxlY3RlZERheShudWxsLCAxKVxyXG4gICAgICAgICAgICAgICAgICAgIC5yZWZyZXNoU2VsZWN0ZWREYXlzKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmRhdGVUd29UbXAgPSBuZXcgRGF0ZShEYXRlSS5nZXRUaW1lKCkgKyAoMjQgKiAzNjAwICogMTAwMCkgLSAxKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuc2V0UmFuZ2UoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGlzLmRheXNTZWxlY3RlZCsrO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy5KUGlja2VySS5zZXRDdXJyZW50VmFsdWUoW0RhdGVJXSk7XHJcbiAgICAgICAgICAgIHRoaXMuSlBpY2tlckkuZ2V0QnVpbGRlcigpLmdldFZhbHVlKCkuc2V0RGF0ZU9uZShEYXRlSSkucmVmcmVzaCgpO1xyXG4gICAgICAgICAgICB0aGlzLkpQaWNrZXJJLmdldEJ1aWxkZXIoKS5nZXREYXlQaWNrZXIoKS5zZXRTZWxlY3RlZERheShEYXRlSSwgMCkucmVmcmVzaFNlbGVjdGVkRGF5cygpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdGhpcztcclxuICAgIH07XHJcbiAgICBKUGlja2VyRXZlbnRzLnByb3RvdHlwZS5zZXRSYW5nZSA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICB2YXIgdGltZTEgPSB0aGlzLmRhdGVPbmVUbXAuZ2V0VGltZSgpLCB0aW1lMiA9IHRoaXMuZGF0ZVR3b1RtcC5nZXRUaW1lKCksIFZhbHVlSSA9IHRoaXMuSlBpY2tlckkuZ2V0QnVpbGRlcigpLmdldFZhbHVlKCksIERheVBpY2tlckkgPSB0aGlzLkpQaWNrZXJJLmdldEJ1aWxkZXIoKS5nZXREYXlQaWNrZXIoKSwgRGF0ZVRtcDtcclxuICAgICAgICBpZiAodGltZTEgPiB0aW1lMikge1xyXG4gICAgICAgICAgICBEYXRlVG1wID0gdGhpcy5kYXRlT25lVG1wO1xyXG4gICAgICAgICAgICB0aGlzLmRhdGVPbmVUbXAgPSB0aGlzLmRhdGVUd29UbXA7XHJcbiAgICAgICAgICAgIHRoaXMuZGF0ZVR3b1RtcCA9IERhdGVUbXA7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIFZhbHVlSS5zZXREYXRlT25lKHRoaXMuZGF0ZU9uZVRtcCk7XHJcbiAgICAgICAgRGF5UGlja2VySS5zZXRTZWxlY3RlZERheSh0aGlzLmRhdGVPbmVUbXAsIDApO1xyXG4gICAgICAgIHRoaXMuSlBpY2tlckkuc2V0Q3VycmVudFZhbHVlKFt0aGlzLmRhdGVPbmVUbXAsIHRoaXMuZGF0ZVR3b1RtcF0pO1xyXG4gICAgICAgIFZhbHVlSS5zZXREYXRlVHdvKHRoaXMuZGF0ZVR3b1RtcCkuc2V0RGF0ZVR3b09wYWNpdHkoZmFsc2UpLnJlZnJlc2goKTtcclxuICAgICAgICBEYXlQaWNrZXJJLnNldFNlbGVjdGVkRGF5KHRoaXMuZGF0ZVR3b1RtcCwgMSkucmVmcmVzaFNlbGVjdGVkRGF5cygpO1xyXG4gICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgfTtcclxuICAgIEpQaWNrZXJFdmVudHMucHJvdG90eXBlLmRheU1vdXNlRW50ZXIgPSBmdW5jdGlvbiAoZGF5LCBkYXRlKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuSlBpY2tlckNvbmZpZ0kuaXNSYW5nZSgpICYmIHRoaXMuZGF0ZVR3b1RtcCA9PT0gbnVsbCkge1xyXG4gICAgICAgICAgICB2YXIgRGF0ZUkgPSBuZXcgRGF0ZShkYXRlWzJdLCBkYXRlWzFdIC0gMSwgZGF0ZVswXSk7XHJcbiAgICAgICAgICAgIHRoaXMuSlBpY2tlckkuZ2V0QnVpbGRlcigpLmdldERheVBpY2tlcigpLnNldERheVdpdGhNb3VzZUVudGVyKERhdGVJKS5yZWZyZXNoU2VsZWN0ZWREYXlzKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgfTtcclxuICAgIEpQaWNrZXJFdmVudHMucHJvdG90eXBlLmRheU1vdXNlTGVhdmUgPSBmdW5jdGlvbiAoZGF5LCBkYXRlKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuSlBpY2tlckNvbmZpZ0kuaXNSYW5nZSgpICYmIHRoaXMuZGF0ZVR3b1RtcCA9PT0gbnVsbCkge1xyXG4gICAgICAgICAgICB0aGlzLkpQaWNrZXJJLmdldEJ1aWxkZXIoKS5nZXREYXlQaWNrZXIoKS5zZXREYXlXaXRoTW91c2VFbnRlcihudWxsKS5yZWZyZXNoU2VsZWN0ZWREYXlzKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgfTtcclxuICAgIEpQaWNrZXJFdmVudHMucHJvdG90eXBlLnJhbmdlQ2xpY2sgPSBmdW5jdGlvbiAoRnJvbURhdGUsIFRvRGF0ZSkge1xyXG4gICAgICAgIHZhciB2aXNpYmxlRGF0ZSA9IHRoaXMuSlBpY2tlckkuZ2V0VmlzaWJsZURhdGUoKSwgbW9udGggPSBGcm9tRGF0ZS5nZXRNb250aCgpICsgMSwgeWVhciA9IEZyb21EYXRlLmdldEZ1bGxZZWFyKCk7XHJcbiAgICAgICAgdGhpcy5kYXRlT25lVG1wID0gRnJvbURhdGU7XHJcbiAgICAgICAgdGhpcy5kYXRlVHdvVG1wID0gVG9EYXRlO1xyXG4gICAgICAgIHRoaXMuc2V0UmFuZ2UoKTtcclxuICAgICAgICBpZiAobW9udGggIT09IHZpc2libGVEYXRlWzBdIHx8IHllYXIgIT09IHZpc2libGVEYXRlWzFdKSB7XHJcbiAgICAgICAgICAgIHRoaXMuc2V0TW9udGhBbmRZZWFyKG1vbnRoLCB5ZWFyKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICB9O1xyXG4gICAgSlBpY2tlckV2ZW50cy5wcm90b3R5cGUudmFsdWVDbGljayA9IGZ1bmN0aW9uIChWYWx1ZURhdGUpIHtcclxuICAgICAgICB2YXIgdmlzaWJsZURhdGUgPSB0aGlzLkpQaWNrZXJJLmdldFZpc2libGVEYXRlKCksIG1vbnRoID0gVmFsdWVEYXRlLmdldE1vbnRoKCkgKyAxLCB5ZWFyID0gVmFsdWVEYXRlLmdldEZ1bGxZZWFyKCk7XHJcbiAgICAgICAgaWYgKG1vbnRoICE9PSB2aXNpYmxlRGF0ZVswXSB8fCB5ZWFyICE9PSB2aXNpYmxlRGF0ZVsxXSkge1xyXG4gICAgICAgICAgICB0aGlzLnNldE1vbnRoQW5kWWVhcihtb250aCwgeWVhcik7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgfTtcclxuICAgIEpQaWNrZXJFdmVudHMucHJvdG90eXBlLmNoYW5nZU1vbnRoID0gZnVuY3Rpb24gKGluY3JlbWVudCkge1xyXG4gICAgICAgIHZhciB2aXNpYmxlRGF0ZSA9IHRoaXMuSlBpY2tlckkuZ2V0VmlzaWJsZURhdGUoKSwgbW9udGggPSB2aXNpYmxlRGF0ZVswXSwgeWVhciA9IHZpc2libGVEYXRlWzFdO1xyXG4gICAgICAgIG1vbnRoICs9IChpbmNyZW1lbnQgPyAxIDogLTEpO1xyXG4gICAgICAgIGlmIChtb250aCA+IDEyKSB7XHJcbiAgICAgICAgICAgIG1vbnRoID0gMTtcclxuICAgICAgICAgICAgeWVhcisrO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAobW9udGggPCAxKSB7XHJcbiAgICAgICAgICAgIG1vbnRoID0gMTI7XHJcbiAgICAgICAgICAgIHllYXItLTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuc2V0TW9udGhBbmRZZWFyKG1vbnRoLCB5ZWFyKTtcclxuICAgIH07XHJcbiAgICBKUGlja2VyRXZlbnRzLnByb3RvdHlwZS5zZXRNb250aEFuZFllYXIgPSBmdW5jdGlvbiAobW9udGgsIHllYXIpIHtcclxuICAgICAgICB2YXIgRGF5UGlja2VySSA9IHRoaXMuSlBpY2tlckkuZ2V0QnVpbGRlcigpLmdldERheVBpY2tlcigpLCBjdXJyZW50V3JhcHBlciA9IHRoaXMuSlBpY2tlckkuZ2V0SFRNTEVsZW1lbnQoKS5xdWVyeVNlbGVjdG9yKCcuanBpY2tlci1kYXlzLXdyYXBwZXInKTtcclxuICAgICAgICBEYXlQaWNrZXJJLnNldE1vbnRoKG1vbnRoKS5zZXRZZWFyKHllYXIpLnJlZnJlc2hIVE1MRWxlbWVudCgpO1xyXG4gICAgICAgIERheVBpY2tlckkucmVmcmVzaFNlbGVjdGVkRGF5cygpO1xyXG4gICAgICAgIGN1cnJlbnRXcmFwcGVyLnJlcGxhY2VXaXRoKERheVBpY2tlckkuZ2V0SFRNTEVsZW1lbnQoKSk7XHJcbiAgICAgICAgdGhpcy5KUGlja2VySS5nZXRCdWlsZGVyKCkuZ2V0TWVudSgpLnNldFZhbHVlcyhtb250aCwgeWVhcik7XHJcbiAgICAgICAgdGhpcy5KUGlja2VySS5zZXRWaXNpYmxlRGF0ZShbbW9udGgsIHllYXJdKTtcclxuICAgICAgICByZXR1cm4gdGhpcztcclxuICAgIH07XHJcbiAgICByZXR1cm4gSlBpY2tlckV2ZW50cztcclxufShKUGlja2VySGVscGVyKSk7XHJcbmV4cG9ydCB7IEpQaWNrZXJFdmVudHMgfTtcclxuIiwiaW1wb3J0IHsgSlBpY2tlckNvbmZpZyB9IGZyb20gXCIuLi8uLi9DbGFzc2VzL0pQaWNrZXJDb25maWdcIjtcclxudmFyIEpQaWNrZXJIZWxwZXIgPSAvKiogQGNsYXNzICovIChmdW5jdGlvbiAoKSB7XHJcbiAgICBmdW5jdGlvbiBKUGlja2VySGVscGVyKEpQaWNrZXJJKSB7XHJcbiAgICAgICAgdGhpcy5KUGlja2VySSA9IEpQaWNrZXJJO1xyXG4gICAgICAgIHRoaXMuSlBpY2tlckNvbmZpZ0kgPSBKUGlja2VyQ29uZmlnLmdldCgpO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIEpQaWNrZXJIZWxwZXI7XHJcbn0oKSk7XHJcbmV4cG9ydCB7IEpQaWNrZXJIZWxwZXIgfTtcclxuIiwidmFyIEggPSByZXF1aXJlKFwiaG9nYW4uanNcIik7XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKCkgeyB2YXIgVCA9IG5ldyBILlRlbXBsYXRlKHtjb2RlOiBmdW5jdGlvbiAoYyxwLGkpIHsgdmFyIHQ9dGhpczt0LmIoaT1pfHxcIlwiKTt0LmIoXCI8ZGl2IGNsYXNzPVxcXCJqcGlja2VyLWxpc3Qtd3JhcHBlciBcIik7dC5iKHQudih0LmYoXCJ3cmFwcGVyQ2xhc3NcIixjLHAsMCkpKTt0LmIoXCJcXFwiPlxcclwiKTt0LmIoXCJcXG5cIiArIGkpO3QuYihcIiAgICA8ZGl2IGNsYXNzPVxcXCJqcGlja2VyLWxpc3RcXFwiPlxcclwiKTt0LmIoXCJcXG5cIiArIGkpO2lmKHQucyh0LmYoXCJlbGVtZW50c1wiLGMscCwxKSxjLHAsMCwxMDYsMjM1LFwie3sgfX1cIikpe3QucnMoYyxwLGZ1bmN0aW9uKGMscCx0KXt0LmIoXCIgICAgICAgICAgICA8ZGl2IGNsYXNzPVxcXCJqcGlja2VyLWVsZW1lbnQgXCIpO2lmKHQucyh0LmYoXCJzZWxlY3RlZFwiLGMscCwxKSxjLHAsMCwxNjEsMTc3LFwie3sgfX1cIikpe3QucnMoYyxwLGZ1bmN0aW9uKGMscCx0KXt0LmIoXCJqcGlja2VyLXNlbGVjdGVkXCIpO30pO2MucG9wKCk7fXQuYihcIlxcXCIgZGF0YS1rZXk9XFxcIlwiKTt0LmIodC52KHQuZihcImtleVwiLGMscCwwKSkpO3QuYihcIlxcXCI+XCIpO3QuYih0LnYodC5mKFwibmFtZVwiLGMscCwwKSkpO3QuYihcIjwvZGl2PlxcclwiKTt0LmIoXCJcXG5cIiArIGkpO30pO2MucG9wKCk7fXQuYihcIiAgICA8L2Rpdj5cXHJcIik7dC5iKFwiXFxuXCIgKyBpKTt0LmIoXCI8L2Rpdj5cXHJcIik7dC5iKFwiXFxuXCIpO3JldHVybiB0LmZsKCk7IH0scGFydGlhbHM6IHt9LCBzdWJzOiB7ICB9fSwgXCI8ZGl2IGNsYXNzPVxcXCJqcGlja2VyLWxpc3Qtd3JhcHBlciB7e3dyYXBwZXJDbGFzc319XFxcIj5cXHJcXG4gICAgPGRpdiBjbGFzcz1cXFwianBpY2tlci1saXN0XFxcIj5cXHJcXG4gICAgICAgIHt7I2VsZW1lbnRzfX1cXHJcXG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVxcXCJqcGlja2VyLWVsZW1lbnQge3sjc2VsZWN0ZWR9fWpwaWNrZXItc2VsZWN0ZWR7ey9zZWxlY3RlZH19XFxcIiBkYXRhLWtleT1cXFwie3trZXl9fVxcXCI+e3tuYW1lfX08L2Rpdj5cXHJcXG4gICAgICAgIHt7L2VsZW1lbnRzfX1cXHJcXG4gICAgPC9kaXY+XFxyXFxuPC9kaXY+XFxyXFxuXCIsIEgpO3JldHVybiBULnJlbmRlci5hcHBseShULCBhcmd1bWVudHMpOyB9OyIsInZhciBIID0gcmVxdWlyZShcImhvZ2FuLmpzXCIpO1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbigpIHsgdmFyIFQgPSBuZXcgSC5UZW1wbGF0ZSh7Y29kZTogZnVuY3Rpb24gKGMscCxpKSB7IHZhciB0PXRoaXM7dC5iKGk9aXx8XCJcIik7dC5iKFwiPGRpdiBjbGFzcz1cXFwianBpY2tlci1tZW51XFxcIj5cXHJcIik7dC5iKFwiXFxuXCIgKyBpKTt0LmIoXCIgICAgPGRpdiBjbGFzcz1cXFwianBpY2tlci1hcnJvdy1sZWZ0XFxcIj48L2Rpdj5cXHJcIik7dC5iKFwiXFxuXCIgKyBpKTt0LmIoXCIgICAgPGRpdiBjbGFzcz1cXFwianBpY2tlci1tZW51LW1vbnRoXFxcIj5cXHJcIik7dC5iKFwiXFxuXCIgKyBpKTt0LmIoXCIgICAgICAgIFwiKTt0LmIodC52KHQuZihcIm1vbnRoTmFtZVwiLGMscCwwKSkpO3QuYihcIlxcclwiKTt0LmIoXCJcXG5cIiArIGkpO3QuYihcIiAgICA8L2Rpdj5cXHJcIik7dC5iKFwiXFxuXCIgKyBpKTt0LmIoXCIgICAgPGRpdiBjbGFzcz1cXFwianBpY2tlci1tZW51LXllYXJcXFwiPlxcclwiKTt0LmIoXCJcXG5cIiArIGkpO3QuYihcIiAgICAgICAgPGlucHV0IHR5cGU9XFxcIm51bWJlclxcXCIgY2xhc3M9XFxcImpwaWNrZXItbWVudS15ZWFyLXZhbHVlXFxcIiB2YWx1ZT1cXFwiXCIpO3QuYih0LnYodC5mKFwieWVhclwiLGMscCwwKSkpO3QuYihcIlxcXCI+XFxyXCIpO3QuYihcIlxcblwiICsgaSk7dC5iKFwiICAgIDwvZGl2PlxcclwiKTt0LmIoXCJcXG5cIiArIGkpO3QuYihcIiAgICA8ZGl2IGNsYXNzPVxcXCJqcGlja2VyLWFycm93LXJpZ2h0XFxcIj48L2Rpdj5cXHJcIik7dC5iKFwiXFxuXCIgKyBpKTt0LmIoXCI8L2Rpdj5cXHJcIik7dC5iKFwiXFxuXCIpO3JldHVybiB0LmZsKCk7IH0scGFydGlhbHM6IHt9LCBzdWJzOiB7ICB9fSwgXCI8ZGl2IGNsYXNzPVxcXCJqcGlja2VyLW1lbnVcXFwiPlxcclxcbiAgICA8ZGl2IGNsYXNzPVxcXCJqcGlja2VyLWFycm93LWxlZnRcXFwiPjwvZGl2PlxcclxcbiAgICA8ZGl2IGNsYXNzPVxcXCJqcGlja2VyLW1lbnUtbW9udGhcXFwiPlxcclxcbiAgICAgICAge3ttb250aE5hbWV9fVxcclxcbiAgICA8L2Rpdj5cXHJcXG4gICAgPGRpdiBjbGFzcz1cXFwianBpY2tlci1tZW51LXllYXJcXFwiPlxcclxcbiAgICAgICAgPGlucHV0IHR5cGU9XFxcIm51bWJlclxcXCIgY2xhc3M9XFxcImpwaWNrZXItbWVudS15ZWFyLXZhbHVlXFxcIiB2YWx1ZT1cXFwie3t5ZWFyfX1cXFwiPlxcclxcbiAgICA8L2Rpdj5cXHJcXG4gICAgPGRpdiBjbGFzcz1cXFwianBpY2tlci1hcnJvdy1yaWdodFxcXCI+PC9kaXY+XFxyXFxuPC9kaXY+XFxyXFxuXCIsIEgpO3JldHVybiBULnJlbmRlci5hcHBseShULCBhcmd1bWVudHMpOyB9OyIsInZhciBfX2V4dGVuZHMgPSAodGhpcyAmJiB0aGlzLl9fZXh0ZW5kcykgfHwgKGZ1bmN0aW9uICgpIHtcclxuICAgIHZhciBleHRlbmRTdGF0aWNzID0gZnVuY3Rpb24gKGQsIGIpIHtcclxuICAgICAgICBleHRlbmRTdGF0aWNzID0gT2JqZWN0LnNldFByb3RvdHlwZU9mIHx8XHJcbiAgICAgICAgICAgICh7IF9fcHJvdG9fXzogW10gfSBpbnN0YW5jZW9mIEFycmF5ICYmIGZ1bmN0aW9uIChkLCBiKSB7IGQuX19wcm90b19fID0gYjsgfSkgfHxcclxuICAgICAgICAgICAgZnVuY3Rpb24gKGQsIGIpIHsgZm9yICh2YXIgcCBpbiBiKSBpZiAoYi5oYXNPd25Qcm9wZXJ0eShwKSkgZFtwXSA9IGJbcF07IH07XHJcbiAgICAgICAgcmV0dXJuIGV4dGVuZFN0YXRpY3MoZCwgYik7XHJcbiAgICB9O1xyXG4gICAgcmV0dXJuIGZ1bmN0aW9uIChkLCBiKSB7XHJcbiAgICAgICAgZXh0ZW5kU3RhdGljcyhkLCBiKTtcclxuICAgICAgICBmdW5jdGlvbiBfXygpIHsgdGhpcy5jb25zdHJ1Y3RvciA9IGQ7IH1cclxuICAgICAgICBkLnByb3RvdHlwZSA9IGIgPT09IG51bGwgPyBPYmplY3QuY3JlYXRlKGIpIDogKF9fLnByb3RvdHlwZSA9IGIucHJvdG90eXBlLCBuZXcgX18oKSk7XHJcbiAgICB9O1xyXG59KSgpO1xyXG5pbXBvcnQgeyBDb21wb25lbnQgfSBmcm9tIFwiLi4vQ29tcG9uZW50XCI7XHJcbmltcG9ydCB7IEV2ZW50IH0gZnJvbSBcIi4uLy4uL0NsYXNzZXMvRXZlbnRcIjtcclxuaW1wb3J0IHsgTkVYVF9NT05USF9DTElDSywgUFJFVl9NT05USF9DTElDSyB9IGZyb20gXCIuLi8uLi9DbGFzc2VzL0V2ZW50c0RpY3RcIjtcclxuaW1wb3J0IHsgSlBpY2tlckNvbmZpZyB9IGZyb20gXCIuLi8uLi9DbGFzc2VzL0pQaWNrZXJDb25maWdcIjtcclxudmFyIE1lbnUgPSAvKiogQGNsYXNzICovIChmdW5jdGlvbiAoX3N1cGVyKSB7XHJcbiAgICBfX2V4dGVuZHMoTWVudSwgX3N1cGVyKTtcclxuICAgIGZ1bmN0aW9uIE1lbnUobW9udGgsIHllYXIpIHtcclxuICAgICAgICB2YXIgX3RoaXMgPSBfc3VwZXIuY2FsbCh0aGlzKSB8fCB0aGlzO1xyXG4gICAgICAgIF90aGlzLm1vbnRoID0gbW9udGg7XHJcbiAgICAgICAgX3RoaXMueWVhciA9IHllYXI7XHJcbiAgICAgICAgcmV0dXJuIF90aGlzO1xyXG4gICAgfVxyXG4gICAgTWVudS5wcm90b3R5cGUuc2V0VmFsdWVzID0gZnVuY3Rpb24gKG1vbnRoLCB5ZWFyKSB7XHJcbiAgICAgICAgaWYgKG1vbnRoID09PSB2b2lkIDApIHsgbW9udGggPSBudWxsOyB9XHJcbiAgICAgICAgaWYgKHllYXIgPT09IHZvaWQgMCkgeyB5ZWFyID0gbnVsbDsgfVxyXG4gICAgICAgIGlmIChtb250aCAhPT0gbnVsbCkge1xyXG4gICAgICAgICAgICB0aGlzLm1vbnRoID0gbW9udGg7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICh5ZWFyICE9PSBudWxsKSB7XHJcbiAgICAgICAgICAgIHRoaXMueWVhciA9IHllYXI7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB0aGlzLnJlZnJlc2goKTtcclxuICAgIH07XHJcbiAgICBNZW51LnByb3RvdHlwZS5yZWZyZXNoID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHZhciBXcmFwcGVyID0gdGhpcy5nZXRIVE1MRWxlbWVudCgpLCBNb250aFdyYXBwZXIgPSBXcmFwcGVyLnF1ZXJ5U2VsZWN0b3IoJy5qcGlja2VyLW1lbnUtbW9udGgnKSwgWWVhcklucHV0ID0gV3JhcHBlci5xdWVyeVNlbGVjdG9yKCcuanBpY2tlci1tZW51LXllYXItdmFsdWUnKTtcclxuICAgICAgICBNb250aFdyYXBwZXIuaW5uZXJUZXh0ID0gdGhpcy5nZXRNb250aE5hbWUoKTtcclxuICAgICAgICBZZWFySW5wdXQudmFsdWUgPSB0aGlzLnllYXIudG9TdHJpbmcoKTtcclxuICAgICAgICByZXR1cm4gdGhpcztcclxuICAgIH07XHJcbiAgICBNZW51LnByb3RvdHlwZS5nZXRFdmVudHMgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgcmV0dXJuIFtcclxuICAgICAgICAgICAgdGhpcy5nZXRFdmVudE9iamVjdCgnLmpwaWNrZXItYXJyb3ctcmlnaHQnLCAnY2xpY2snLCB0aGlzLm9uQXJyYXlSaWdodENsaWNrKSxcclxuICAgICAgICAgICAgdGhpcy5nZXRFdmVudE9iamVjdCgnLmpwaWNrZXItYXJyb3ctbGVmdCcsICdjbGljaycsIHRoaXMub25BcnJheUxlZnRDbGljaylcclxuICAgICAgICBdO1xyXG4gICAgfTtcclxuICAgIE1lbnUucHJvdG90eXBlLm9uQXJyYXlSaWdodENsaWNrID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIEV2ZW50LmdldCgpLnRyaWdnZXIoTkVYVF9NT05USF9DTElDSyk7XHJcbiAgICB9O1xyXG4gICAgTWVudS5wcm90b3R5cGUub25BcnJheUxlZnRDbGljayA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICBFdmVudC5nZXQoKS50cmlnZ2VyKFBSRVZfTU9OVEhfQ0xJQ0spO1xyXG4gICAgfTtcclxuICAgIE1lbnUucHJvdG90eXBlLmdldE11c3RhY2hlVmFycyA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICBtb250aE5hbWU6IHRoaXMuZ2V0TW9udGhOYW1lKCksXHJcbiAgICAgICAgICAgIHllYXI6IHRoaXMueWVhclxyXG4gICAgICAgIH07XHJcbiAgICB9O1xyXG4gICAgTWVudS5wcm90b3R5cGUuZ2V0TW9udGhOYW1lID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHJldHVybiBKUGlja2VyQ29uZmlnLmdldCgpLmdldE1vbnRocygpW3RoaXMubW9udGggLSAxXTtcclxuICAgIH07XHJcbiAgICBNZW51LnByb3RvdHlwZS5nZXRNdXN0YWNoZSA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICByZXR1cm4gcmVxdWlyZSgnLi9NZW51Lm11c3RhY2hlJyk7XHJcbiAgICB9O1xyXG4gICAgcmV0dXJuIE1lbnU7XHJcbn0oQ29tcG9uZW50KSk7XHJcbmV4cG9ydCB7IE1lbnUgfTtcclxuIiwidmFyIF9fZXh0ZW5kcyA9ICh0aGlzICYmIHRoaXMuX19leHRlbmRzKSB8fCAoZnVuY3Rpb24gKCkge1xyXG4gICAgdmFyIGV4dGVuZFN0YXRpY3MgPSBmdW5jdGlvbiAoZCwgYikge1xyXG4gICAgICAgIGV4dGVuZFN0YXRpY3MgPSBPYmplY3Quc2V0UHJvdG90eXBlT2YgfHxcclxuICAgICAgICAgICAgKHsgX19wcm90b19fOiBbXSB9IGluc3RhbmNlb2YgQXJyYXkgJiYgZnVuY3Rpb24gKGQsIGIpIHsgZC5fX3Byb3RvX18gPSBiOyB9KSB8fFxyXG4gICAgICAgICAgICBmdW5jdGlvbiAoZCwgYikgeyBmb3IgKHZhciBwIGluIGIpIGlmIChiLmhhc093blByb3BlcnR5KHApKSBkW3BdID0gYltwXTsgfTtcclxuICAgICAgICByZXR1cm4gZXh0ZW5kU3RhdGljcyhkLCBiKTtcclxuICAgIH07XHJcbiAgICByZXR1cm4gZnVuY3Rpb24gKGQsIGIpIHtcclxuICAgICAgICBleHRlbmRTdGF0aWNzKGQsIGIpO1xyXG4gICAgICAgIGZ1bmN0aW9uIF9fKCkgeyB0aGlzLmNvbnN0cnVjdG9yID0gZDsgfVxyXG4gICAgICAgIGQucHJvdG90eXBlID0gYiA9PT0gbnVsbCA/IE9iamVjdC5jcmVhdGUoYikgOiAoX18ucHJvdG90eXBlID0gYi5wcm90b3R5cGUsIG5ldyBfXygpKTtcclxuICAgIH07XHJcbn0pKCk7XHJcbmltcG9ydCB7IFBpY2tlciB9IGZyb20gXCIuLi9QaWNrZXJcIjtcclxuaW1wb3J0IHsgSlBpY2tlckNvbmZpZyB9IGZyb20gXCIuLi8uLi9DbGFzc2VzL0pQaWNrZXJDb25maWdcIjtcclxudmFyIE1vbnRoUGlja2VyID0gLyoqIEBjbGFzcyAqLyAoZnVuY3Rpb24gKF9zdXBlcikge1xyXG4gICAgX19leHRlbmRzKE1vbnRoUGlja2VyLCBfc3VwZXIpO1xyXG4gICAgZnVuY3Rpb24gTW9udGhQaWNrZXIobW9udGgpIHtcclxuICAgICAgICB2YXIgX3RoaXMgPSBfc3VwZXIuY2FsbCh0aGlzKSB8fCB0aGlzO1xyXG4gICAgICAgIF90aGlzLm1vbnRoID0gbW9udGg7XHJcbiAgICAgICAgcmV0dXJuIF90aGlzO1xyXG4gICAgfVxyXG4gICAgTW9udGhQaWNrZXIucHJvdG90eXBlLmdldEV2ZW50cyA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICByZXR1cm4gW1xyXG4gICAgICAgICAgICB0aGlzLmdldEV2ZW50T2JqZWN0KCcuanBpY2tlci1lbGVtZW50JywgJ2NsaWNrJywgdGhpcy5vbk1vbnRoQ2xpY2spXHJcbiAgICAgICAgXTtcclxuICAgIH07XHJcbiAgICBNb250aFBpY2tlci5wcm90b3R5cGUub25Nb250aENsaWNrID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKHRoaXMsIGFyZ3VtZW50cyk7XHJcbiAgICB9O1xyXG4gICAgTW9udGhQaWNrZXIucHJvdG90eXBlLmdldE11c3RhY2hlVmFycyA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICBlbGVtZW50czogdGhpcy5nZXRNb250aHMoKSxcclxuICAgICAgICAgICAgd3JhcHBlckNsYXNzOiAnanBpY2tlci1tb250aHMtd3JhcHBlcidcclxuICAgICAgICB9O1xyXG4gICAgfTtcclxuICAgIE1vbnRoUGlja2VyLnByb3RvdHlwZS5nZXRNb250aHMgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgdmFyIF90aGlzID0gdGhpcztcclxuICAgICAgICB2YXIgbW9udGhzID0gSlBpY2tlckNvbmZpZy5nZXQoKS5nZXRNb250aHMoKSwgbnVtYmVyID0gMSwgcmVzdWx0ID0gW107XHJcbiAgICAgICAgbW9udGhzLmZvckVhY2goZnVuY3Rpb24gKG1vbnRoTmFtZSkge1xyXG4gICAgICAgICAgICByZXN1bHQucHVzaCh7XHJcbiAgICAgICAgICAgICAgICBrZXk6IG51bWJlcixcclxuICAgICAgICAgICAgICAgIG5hbWU6IG1vbnRoTmFtZSxcclxuICAgICAgICAgICAgICAgIHNlbGVjdGVkOiBfdGhpcy5tb250aCA9PT0gbnVtYmVyXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICBudW1iZXIrKztcclxuICAgICAgICB9KTtcclxuICAgICAgICByZXR1cm4gcmVzdWx0O1xyXG4gICAgfTtcclxuICAgIE1vbnRoUGlja2VyLnByb3RvdHlwZS5nZXRNdXN0YWNoZSA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICByZXR1cm4gcmVxdWlyZSgnLi4vTGlzdC9MaXN0Lm11c3RhY2hlJyk7XHJcbiAgICB9O1xyXG4gICAgcmV0dXJuIE1vbnRoUGlja2VyO1xyXG59KFBpY2tlcikpO1xyXG5leHBvcnQgeyBNb250aFBpY2tlciB9O1xyXG4iLCJ2YXIgX19leHRlbmRzID0gKHRoaXMgJiYgdGhpcy5fX2V4dGVuZHMpIHx8IChmdW5jdGlvbiAoKSB7XHJcbiAgICB2YXIgZXh0ZW5kU3RhdGljcyA9IGZ1bmN0aW9uIChkLCBiKSB7XHJcbiAgICAgICAgZXh0ZW5kU3RhdGljcyA9IE9iamVjdC5zZXRQcm90b3R5cGVPZiB8fFxyXG4gICAgICAgICAgICAoeyBfX3Byb3RvX186IFtdIH0gaW5zdGFuY2VvZiBBcnJheSAmJiBmdW5jdGlvbiAoZCwgYikgeyBkLl9fcHJvdG9fXyA9IGI7IH0pIHx8XHJcbiAgICAgICAgICAgIGZ1bmN0aW9uIChkLCBiKSB7IGZvciAodmFyIHAgaW4gYikgaWYgKGIuaGFzT3duUHJvcGVydHkocCkpIGRbcF0gPSBiW3BdOyB9O1xyXG4gICAgICAgIHJldHVybiBleHRlbmRTdGF0aWNzKGQsIGIpO1xyXG4gICAgfTtcclxuICAgIHJldHVybiBmdW5jdGlvbiAoZCwgYikge1xyXG4gICAgICAgIGV4dGVuZFN0YXRpY3MoZCwgYik7XHJcbiAgICAgICAgZnVuY3Rpb24gX18oKSB7IHRoaXMuY29uc3RydWN0b3IgPSBkOyB9XHJcbiAgICAgICAgZC5wcm90b3R5cGUgPSBiID09PSBudWxsID8gT2JqZWN0LmNyZWF0ZShiKSA6IChfXy5wcm90b3R5cGUgPSBiLnByb3RvdHlwZSwgbmV3IF9fKCkpO1xyXG4gICAgfTtcclxufSkoKTtcclxuaW1wb3J0IHsgQ29tcG9uZW50IH0gZnJvbSBcIi4vQ29tcG9uZW50XCI7XHJcbnZhciBQaWNrZXIgPSAvKiogQGNsYXNzICovIChmdW5jdGlvbiAoX3N1cGVyKSB7XHJcbiAgICBfX2V4dGVuZHMoUGlja2VyLCBfc3VwZXIpO1xyXG4gICAgZnVuY3Rpb24gUGlja2VyKCkge1xyXG4gICAgICAgIHJldHVybiBfc3VwZXIgIT09IG51bGwgJiYgX3N1cGVyLmFwcGx5KHRoaXMsIGFyZ3VtZW50cykgfHwgdGhpcztcclxuICAgIH1cclxuICAgIHJldHVybiBQaWNrZXI7XHJcbn0oQ29tcG9uZW50KSk7XHJcbmV4cG9ydCB7IFBpY2tlciB9O1xyXG4iLCJ2YXIgSCA9IHJlcXVpcmUoXCJob2dhbi5qc1wiKTtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oKSB7IHZhciBUID0gbmV3IEguVGVtcGxhdGUoe2NvZGU6IGZ1bmN0aW9uIChjLHAsaSkgeyB2YXIgdD10aGlzO3QuYihpPWl8fFwiXCIpO3QuYihcIjxkaXYgY2xhc3M9XFxcImpwaWNrZXItcmFuZ2VzLXdyYXBwZXJcXFwiPlxcclwiKTt0LmIoXCJcXG5cIiArIGkpO3QuYihcIiAgICA8ZGl2IGNsYXNzPVxcXCJqcGlja2Nlci1yYW5nZXMtdGl0bGVcXFwiPlwiKTt0LmIodC52KHQuZihcInRpdGxlXCIsYyxwLDApKSk7dC5iKFwiPC9kaXY+XFxyXCIpO3QuYihcIlxcblwiICsgaSk7dC5iKFwiICAgIDxkaXYgY2xhc3M9XFxcImpwaWNrZXItcmFuZ2VzLWxpc3RcXFwiPlxcclwiKTt0LmIoXCJcXG5cIiArIGkpO2lmKHQucyh0LmYoXCJyYW5nZXNcIixjLHAsMSksYyxwLDAsMTUyLDIzNixcInt7IH19XCIpKXt0LnJzKGMscCxmdW5jdGlvbihjLHAsdCl7dC5iKFwiICAgICAgICAgICAgPGRpdiBjbGFzcz1cXFwianBpY2tlci1yYW5nZVxcXCIgZGF0YS1rZXk9XFxcIlwiKTt0LmIodC52KHQuZihcImlkXCIsYyxwLDApKSk7dC5iKFwiXFxcIj5cIik7dC5iKHQudih0LmYoXCJsYWJlbFwiLGMscCwwKSkpO3QuYihcIjwvZGl2PlxcclwiKTt0LmIoXCJcXG5cIiArIGkpO30pO2MucG9wKCk7fXQuYihcIiAgICA8L2Rpdj5cXHJcIik7dC5iKFwiXFxuXCIgKyBpKTt0LmIoXCI8L2Rpdj5cXHJcIik7dC5iKFwiXFxuXCIpO3JldHVybiB0LmZsKCk7IH0scGFydGlhbHM6IHt9LCBzdWJzOiB7ICB9fSwgXCI8ZGl2IGNsYXNzPVxcXCJqcGlja2VyLXJhbmdlcy13cmFwcGVyXFxcIj5cXHJcXG4gICAgPGRpdiBjbGFzcz1cXFwianBpY2tjZXItcmFuZ2VzLXRpdGxlXFxcIj57e3RpdGxlfX08L2Rpdj5cXHJcXG4gICAgPGRpdiBjbGFzcz1cXFwianBpY2tlci1yYW5nZXMtbGlzdFxcXCI+XFxyXFxuICAgICAgICB7eyNyYW5nZXN9fVxcclxcbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XFxcImpwaWNrZXItcmFuZ2VcXFwiIGRhdGEta2V5PVxcXCJ7e2lkfX1cXFwiPnt7bGFiZWx9fTwvZGl2PlxcclxcbiAgICAgICAge3svcmFuZ2VzfX1cXHJcXG4gICAgPC9kaXY+XFxyXFxuPC9kaXY+XFxyXFxuXCIsIEgpO3JldHVybiBULnJlbmRlci5hcHBseShULCBhcmd1bWVudHMpOyB9OyIsInZhciBfX2V4dGVuZHMgPSAodGhpcyAmJiB0aGlzLl9fZXh0ZW5kcykgfHwgKGZ1bmN0aW9uICgpIHtcclxuICAgIHZhciBleHRlbmRTdGF0aWNzID0gZnVuY3Rpb24gKGQsIGIpIHtcclxuICAgICAgICBleHRlbmRTdGF0aWNzID0gT2JqZWN0LnNldFByb3RvdHlwZU9mIHx8XHJcbiAgICAgICAgICAgICh7IF9fcHJvdG9fXzogW10gfSBpbnN0YW5jZW9mIEFycmF5ICYmIGZ1bmN0aW9uIChkLCBiKSB7IGQuX19wcm90b19fID0gYjsgfSkgfHxcclxuICAgICAgICAgICAgZnVuY3Rpb24gKGQsIGIpIHsgZm9yICh2YXIgcCBpbiBiKSBpZiAoYi5oYXNPd25Qcm9wZXJ0eShwKSkgZFtwXSA9IGJbcF07IH07XHJcbiAgICAgICAgcmV0dXJuIGV4dGVuZFN0YXRpY3MoZCwgYik7XHJcbiAgICB9O1xyXG4gICAgcmV0dXJuIGZ1bmN0aW9uIChkLCBiKSB7XHJcbiAgICAgICAgZXh0ZW5kU3RhdGljcyhkLCBiKTtcclxuICAgICAgICBmdW5jdGlvbiBfXygpIHsgdGhpcy5jb25zdHJ1Y3RvciA9IGQ7IH1cclxuICAgICAgICBkLnByb3RvdHlwZSA9IGIgPT09IG51bGwgPyBPYmplY3QuY3JlYXRlKGIpIDogKF9fLnByb3RvdHlwZSA9IGIucHJvdG90eXBlLCBuZXcgX18oKSk7XHJcbiAgICB9O1xyXG59KSgpO1xyXG5pbXBvcnQgeyBDb21wb25lbnQgfSBmcm9tIFwiLi4vQ29tcG9uZW50XCI7XHJcbmltcG9ydCB7IEpQaWNrZXJDb25maWcgfSBmcm9tIFwiLi4vLi4vQ2xhc3Nlcy9KUGlja2VyQ29uZmlnXCI7XHJcbmltcG9ydCB7IFRvb2xzIH0gZnJvbSBcIi4uLy4uL0NsYXNzZXMvVG9vbHNcIjtcclxuaW1wb3J0IHsgRXZlbnQgfSBmcm9tIFwiLi4vLi4vQ2xhc3Nlcy9FdmVudFwiO1xyXG5pbXBvcnQgeyBSQU5HRV9DTElDSyB9IGZyb20gXCIuLi8uLi9DbGFzc2VzL0V2ZW50c0RpY3RcIjtcclxudmFyIFJhbmdlcyA9IC8qKiBAY2xhc3MgKi8gKGZ1bmN0aW9uIChfc3VwZXIpIHtcclxuICAgIF9fZXh0ZW5kcyhSYW5nZXMsIF9zdXBlcik7XHJcbiAgICBmdW5jdGlvbiBSYW5nZXMoKSB7XHJcbiAgICAgICAgdmFyIF90aGlzID0gX3N1cGVyLmNhbGwodGhpcykgfHwgdGhpcztcclxuICAgICAgICBfdGhpcy5yYW5nZXMgPSBKUGlja2VyQ29uZmlnLmdldCgpLmdldFJhbmdlc1NldCgpO1xyXG4gICAgICAgIF90aGlzLnJhbmdlcy5mb3JFYWNoKGZ1bmN0aW9uICh2LCBrZXkpIHtcclxuICAgICAgICAgICAgdi5pZCA9IGtleTtcclxuICAgICAgICB9KTtcclxuICAgICAgICByZXR1cm4gX3RoaXM7XHJcbiAgICB9XHJcbiAgICBSYW5nZXMucHJvdG90eXBlLmdldEV2ZW50cyA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICByZXR1cm4gW1xyXG4gICAgICAgICAgICB0aGlzLmdldEV2ZW50T2JqZWN0KCcuanBpY2tlci1yYW5nZScsICdjbGljaycsIHRoaXMub25SYW5nZUNsaWNrKHRoaXMpKVxyXG4gICAgICAgIF07XHJcbiAgICB9O1xyXG4gICAgUmFuZ2VzLnByb3RvdHlwZS5vblJhbmdlQ2xpY2sgPSBmdW5jdGlvbiAodGhhdCkge1xyXG4gICAgICAgIHJldHVybiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIHZhciBrZXkgPSB0aGlzLmdldEF0dHJpYnV0ZSgnZGF0YS1rZXknKSwga2V5SW50ID0gVG9vbHMuaW50KGtleSksIHJhbmdlID0gdGhhdC5yYW5nZXNba2V5SW50XS5yYW5nZTtcclxuICAgICAgICAgICAgRXZlbnQuZ2V0KCkudHJpZ2dlcihSQU5HRV9DTElDSywgcmFuZ2VbMF0sIHJhbmdlWzFdKTtcclxuICAgICAgICB9O1xyXG4gICAgfTtcclxuICAgIFJhbmdlcy5wcm90b3R5cGUuZ2V0TXVzdGFjaGVWYXJzID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIHRpdGxlOiBKUGlja2VyQ29uZmlnLmdldCgpLmdldFJhbmdlc1RpdGxlKCksXHJcbiAgICAgICAgICAgIHJhbmdlczogdGhpcy5yYW5nZXNcclxuICAgICAgICB9O1xyXG4gICAgfTtcclxuICAgIFJhbmdlcy5wcm90b3R5cGUuZ2V0TXVzdGFjaGUgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgcmV0dXJuIHJlcXVpcmUoJy4vUmFuZ2VzLm11c3RhY2hlJyk7XHJcbiAgICB9O1xyXG4gICAgcmV0dXJuIFJhbmdlcztcclxufShDb21wb25lbnQpKTtcclxuZXhwb3J0IHsgUmFuZ2VzIH07XHJcbiIsInZhciBIID0gcmVxdWlyZShcImhvZ2FuLmpzXCIpO1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbigpIHsgdmFyIFQgPSBuZXcgSC5UZW1wbGF0ZSh7Y29kZTogZnVuY3Rpb24gKGMscCxpKSB7IHZhciB0PXRoaXM7dC5iKGk9aXx8XCJcIik7dC5iKFwiPGRpdiBjbGFzcz1cXFwianBpY2tlci12YWx1ZS13cmFwcGVyIFwiKTtpZih0LnModC5mKFwidHdvVmFsdWVzXCIsYyxwLDEpLGMscCwwLDQ4LDY2LFwie3sgfX1cIikpe3QucnMoYyxwLGZ1bmN0aW9uKGMscCx0KXt0LmIoXCJqcGlja2VyLXR3by12YWx1ZXNcIik7fSk7Yy5wb3AoKTt9dC5iKFwiIFwiKTtpZih0LnModC5mKFwiZGF0ZU9wYWNpdHkxXCIsYyxwLDEpLGMscCwwLDk4LDExNCxcInt7IH19XCIpKXt0LnJzKGMscCxmdW5jdGlvbihjLHAsdCl7dC5iKFwiZGF0ZS1vbmUtb3BhY2l0eVwiKTt9KTtjLnBvcCgpO310LmIoXCIgXCIpO2lmKHQucyh0LmYoXCJkYXRlT3BhY2l0eTJcIixjLHAsMSksYyxwLDAsMTQ5LDE2NSxcInt7IH19XCIpKXt0LnJzKGMscCxmdW5jdGlvbihjLHAsdCl7dC5iKFwiZGF0ZS10d28tb3BhY2l0eVwiKTt9KTtjLnBvcCgpO310LmIoXCJcXFwiPlxcclwiKTt0LmIoXCJcXG5cIiArIGkpO3QuYihcIiAgICA8ZGl2IGNsYXNzPVxcXCJqcGlja2VyLXZhbHVlLW9uZVxcXCI+XCIpO3QuYih0LnYodC5mKFwiZGF0ZUZvcm1hdHRlZDFcIixjLHAsMCkpKTt0LmIoXCI8L2Rpdj5cXHJcIik7dC5iKFwiXFxuXCIgKyBpKTt0LmIoXCIgICAgPGRpdiBjbGFzcz1cXFwianBpY2tlci12YWx1ZS1zZXBhcmF0b3JcXFwiPi08L2Rpdj5cXHJcIik7dC5iKFwiXFxuXCIgKyBpKTt0LmIoXCIgICAgPGRpdiBjbGFzcz1cXFwianBpY2tlci12YWx1ZS10d29cXFwiPlwiKTt0LmIodC52KHQuZihcImRhdGVGb3JtYXR0ZWQyXCIsYyxwLDApKSk7dC5iKFwiPC9kaXY+XFxyXCIpO3QuYihcIlxcblwiICsgaSk7dC5iKFwiPC9kaXY+XFxyXCIpO3QuYihcIlxcblwiKTtyZXR1cm4gdC5mbCgpOyB9LHBhcnRpYWxzOiB7fSwgc3ViczogeyAgfX0sIFwiPGRpdiBjbGFzcz1cXFwianBpY2tlci12YWx1ZS13cmFwcGVyIHt7I3R3b1ZhbHVlc319anBpY2tlci10d28tdmFsdWVze3svdHdvVmFsdWVzfX0ge3sjZGF0ZU9wYWNpdHkxfX1kYXRlLW9uZS1vcGFjaXR5e3svZGF0ZU9wYWNpdHkxfX0ge3sjZGF0ZU9wYWNpdHkyfX1kYXRlLXR3by1vcGFjaXR5e3svZGF0ZU9wYWNpdHkyfX1cXFwiPlxcclxcbiAgICA8ZGl2IGNsYXNzPVxcXCJqcGlja2VyLXZhbHVlLW9uZVxcXCI+e3tkYXRlRm9ybWF0dGVkMX19PC9kaXY+XFxyXFxuICAgIDxkaXYgY2xhc3M9XFxcImpwaWNrZXItdmFsdWUtc2VwYXJhdG9yXFxcIj4tPC9kaXY+XFxyXFxuICAgIDxkaXYgY2xhc3M9XFxcImpwaWNrZXItdmFsdWUtdHdvXFxcIj57e2RhdGVGb3JtYXR0ZWQyfX08L2Rpdj5cXHJcXG48L2Rpdj5cXHJcXG5cIiwgSCk7cmV0dXJuIFQucmVuZGVyLmFwcGx5KFQsIGFyZ3VtZW50cyk7IH07IiwidmFyIF9fZXh0ZW5kcyA9ICh0aGlzICYmIHRoaXMuX19leHRlbmRzKSB8fCAoZnVuY3Rpb24gKCkge1xyXG4gICAgdmFyIGV4dGVuZFN0YXRpY3MgPSBmdW5jdGlvbiAoZCwgYikge1xyXG4gICAgICAgIGV4dGVuZFN0YXRpY3MgPSBPYmplY3Quc2V0UHJvdG90eXBlT2YgfHxcclxuICAgICAgICAgICAgKHsgX19wcm90b19fOiBbXSB9IGluc3RhbmNlb2YgQXJyYXkgJiYgZnVuY3Rpb24gKGQsIGIpIHsgZC5fX3Byb3RvX18gPSBiOyB9KSB8fFxyXG4gICAgICAgICAgICBmdW5jdGlvbiAoZCwgYikgeyBmb3IgKHZhciBwIGluIGIpIGlmIChiLmhhc093blByb3BlcnR5KHApKSBkW3BdID0gYltwXTsgfTtcclxuICAgICAgICByZXR1cm4gZXh0ZW5kU3RhdGljcyhkLCBiKTtcclxuICAgIH07XHJcbiAgICByZXR1cm4gZnVuY3Rpb24gKGQsIGIpIHtcclxuICAgICAgICBleHRlbmRTdGF0aWNzKGQsIGIpO1xyXG4gICAgICAgIGZ1bmN0aW9uIF9fKCkgeyB0aGlzLmNvbnN0cnVjdG9yID0gZDsgfVxyXG4gICAgICAgIGQucHJvdG90eXBlID0gYiA9PT0gbnVsbCA/IE9iamVjdC5jcmVhdGUoYikgOiAoX18ucHJvdG90eXBlID0gYi5wcm90b3R5cGUsIG5ldyBfXygpKTtcclxuICAgIH07XHJcbn0pKCk7XHJcbmltcG9ydCB7IENvbXBvbmVudCB9IGZyb20gXCIuLi9Db21wb25lbnRcIjtcclxuaW1wb3J0IHsgRE9NIH0gZnJvbSBcIi4uLy4uL0NsYXNzZXMvRE9NXCI7XHJcbmltcG9ydCB7IEV2ZW50IH0gZnJvbSBcIi4uLy4uL0NsYXNzZXMvRXZlbnRcIjtcclxuaW1wb3J0IHsgVkFMVUVfQ0xJQ0sgfSBmcm9tIFwiLi4vLi4vQ2xhc3Nlcy9FdmVudHNEaWN0XCI7XHJcbnZhciBWYWx1ZSA9IC8qKiBAY2xhc3MgKi8gKGZ1bmN0aW9uIChfc3VwZXIpIHtcclxuICAgIF9fZXh0ZW5kcyhWYWx1ZSwgX3N1cGVyKTtcclxuICAgIGZ1bmN0aW9uIFZhbHVlKGRhdGUxLCBkYXRlMikge1xyXG4gICAgICAgIGlmIChkYXRlMSA9PT0gdm9pZCAwKSB7IGRhdGUxID0gbnVsbDsgfVxyXG4gICAgICAgIGlmIChkYXRlMiA9PT0gdm9pZCAwKSB7IGRhdGUyID0gbnVsbDsgfVxyXG4gICAgICAgIHZhciBfdGhpcyA9IF9zdXBlci5jYWxsKHRoaXMpIHx8IHRoaXM7XHJcbiAgICAgICAgX3RoaXMuZGF0ZTEgPSBudWxsO1xyXG4gICAgICAgIF90aGlzLmRhdGVPcGFjaXR5MSA9IGZhbHNlO1xyXG4gICAgICAgIF90aGlzLmRhdGUyID0gbnVsbDtcclxuICAgICAgICBfdGhpcy5kYXRlT3BhY2l0eTIgPSBmYWxzZTtcclxuICAgICAgICBfdGhpcy5kYXRlMSA9IGRhdGUxO1xyXG4gICAgICAgIF90aGlzLmRhdGUyID0gZGF0ZTI7XHJcbiAgICAgICAgcmV0dXJuIF90aGlzO1xyXG4gICAgfVxyXG4gICAgVmFsdWUucHJvdG90eXBlLnNldERhdGVPbmUgPSBmdW5jdGlvbiAoZGF0ZTEpIHtcclxuICAgICAgICB0aGlzLmRhdGUxID0gZGF0ZTE7XHJcbiAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICB9O1xyXG4gICAgVmFsdWUucHJvdG90eXBlLnNldERhdGVUd28gPSBmdW5jdGlvbiAoZGF0ZTIpIHtcclxuICAgICAgICB0aGlzLmRhdGUyID0gZGF0ZTI7XHJcbiAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICB9O1xyXG4gICAgVmFsdWUucHJvdG90eXBlLnNldERhdGVPbmVPcGFjaXR5ID0gZnVuY3Rpb24gKGRhdGVPcGFjaXR5MSkge1xyXG4gICAgICAgIHRoaXMuZGF0ZU9wYWNpdHkxID0gZGF0ZU9wYWNpdHkxO1xyXG4gICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgfTtcclxuICAgIFZhbHVlLnByb3RvdHlwZS5zZXREYXRlVHdvT3BhY2l0eSA9IGZ1bmN0aW9uIChkYXRlT3BhY2l0eTIpIHtcclxuICAgICAgICB0aGlzLmRhdGVPcGFjaXR5MiA9IGRhdGVPcGFjaXR5MjtcclxuICAgICAgICByZXR1cm4gdGhpcztcclxuICAgIH07XHJcbiAgICBWYWx1ZS5wcm90b3R5cGUucmVmcmVzaCA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICB2YXIgSFRNTEVsZW1lbnQgPSB0aGlzLmdldEhUTUxFbGVtZW50KCksIERhdGVPbmVFbGVtZW50ID0gSFRNTEVsZW1lbnQucXVlcnlTZWxlY3RvcignLmpwaWNrZXItdmFsdWUtb25lJyksIG9wYWNpdHlDbGFzcyA9ICdqcGlja2VyLW9wYWNpdHknLCBEYXRlVHdvRWxlbWVudDtcclxuICAgICAgICBEYXRlT25lRWxlbWVudC5pbm5lclRleHQgPSB0aGlzLmdldERhdGVGb3JtYXR0ZWQodGhpcy5kYXRlMSk7XHJcbiAgICAgICAgaWYgKHRoaXMuZGF0ZTIgIT09IG51bGwpIHtcclxuICAgICAgICAgICAgRGF0ZVR3b0VsZW1lbnQgPSBIVE1MRWxlbWVudC5xdWVyeVNlbGVjdG9yKCcuanBpY2tlci12YWx1ZS10d28nKTtcclxuICAgICAgICAgICAgRGF0ZVR3b0VsZW1lbnQuaW5uZXJUZXh0ID0gdGhpcy5nZXREYXRlRm9ybWF0dGVkKHRoaXMuZGF0ZTIpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAodGhpcy5kYXRlT3BhY2l0eTEpIHtcclxuICAgICAgICAgICAgKG5ldyBET00oJy5qcGlja2VyLXZhbHVlLW9uZScsIEhUTUxFbGVtZW50KSkuYWRkQ2xhc3Mob3BhY2l0eUNsYXNzKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIChuZXcgRE9NKCcuanBpY2tlci12YWx1ZS1vbmUnLCBIVE1MRWxlbWVudCkpLnJlbW92ZUNsYXNzKG9wYWNpdHlDbGFzcyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICh0aGlzLmRhdGVPcGFjaXR5Mikge1xyXG4gICAgICAgICAgICAobmV3IERPTSgnLmpwaWNrZXItdmFsdWUtdHdvJywgSFRNTEVsZW1lbnQpKS5hZGRDbGFzcyhvcGFjaXR5Q2xhc3MpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgKG5ldyBET00oJy5qcGlja2VyLXZhbHVlLXR3bycsIEhUTUxFbGVtZW50KSkucmVtb3ZlQ2xhc3Mob3BhY2l0eUNsYXNzKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICB9O1xyXG4gICAgVmFsdWUucHJvdG90eXBlLmdldERhdGVGb3JtYXR0ZWQgPSBmdW5jdGlvbiAoZGF0ZSkge1xyXG4gICAgICAgIGlmIChkYXRlID09PSBudWxsKSB7XHJcbiAgICAgICAgICAgIHJldHVybiAnJztcclxuICAgICAgICB9XHJcbiAgICAgICAgdmFyIGRheSA9IGRhdGUuZ2V0RGF0ZSgpLCBtb250aCA9IGRhdGUuZ2V0TW9udGgoKSArIDEsIHllYXIgPSBkYXRlLmdldEZ1bGxZZWFyKCk7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0V2l0aFplcm8oZGF5KSArICcuJyArIHRoaXMuZ2V0V2l0aFplcm8obW9udGgpICsgJy4nICsgeWVhci50b1N0cmluZygpO1xyXG4gICAgfTtcclxuICAgIFZhbHVlLnByb3RvdHlwZS5nZXRXaXRoWmVybyA9IGZ1bmN0aW9uICh2YWx1ZSkge1xyXG4gICAgICAgIHJldHVybiB2YWx1ZSA8IDEwID8gJzAnICsgdmFsdWUudG9TdHJpbmcoKSA6IHZhbHVlLnRvU3RyaW5nKCk7XHJcbiAgICB9O1xyXG4gICAgVmFsdWUucHJvdG90eXBlLmdldEV2ZW50cyA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICByZXR1cm4gW1xyXG4gICAgICAgICAgICB0aGlzLmdldEV2ZW50T2JqZWN0KCcuanBpY2tlci12YWx1ZS1vbmUsIC5qcGlja2VyLXZhbHVlLXR3bycsICdjbGljaycsIHRoaXMub25WYWx1ZUNsaWNrKHRoaXMpKVxyXG4gICAgICAgIF07XHJcbiAgICB9O1xyXG4gICAgVmFsdWUucHJvdG90eXBlLm9uVmFsdWVDbGljayA9IGZ1bmN0aW9uICh0aGF0KSB7XHJcbiAgICAgICAgcmV0dXJuIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgdmFyIFZhbHVlRGF0ZSA9IHRoYXQuZGF0ZTEsIEhUTUxWYWx1ZUVsZW1lbnQgPSB0aGlzO1xyXG4gICAgICAgICAgICBpZiAoSFRNTFZhbHVlRWxlbWVudC5jbGFzc0xpc3QuY29udGFpbnMoJ2pwaWNrZXItb3BhY2l0eScpKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKEhUTUxWYWx1ZUVsZW1lbnQuY2xhc3NMaXN0LmNvbnRhaW5zKCdqcGlja2VyLXZhbHVlLXR3bycpKSB7XHJcbiAgICAgICAgICAgICAgICBWYWx1ZURhdGUgPSB0aGF0LmRhdGUyO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIEV2ZW50LmdldCgpLnRyaWdnZXIoVkFMVUVfQ0xJQ0ssIFZhbHVlRGF0ZSk7XHJcbiAgICAgICAgfTtcclxuICAgIH07XHJcbiAgICBWYWx1ZS5wcm90b3R5cGUuZ2V0TXVzdGFjaGVWYXJzID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIGRhdGVGb3JtYXR0ZWQxOiB0aGlzLmdldERhdGVGb3JtYXR0ZWQodGhpcy5kYXRlMSksXHJcbiAgICAgICAgICAgIGRhdGVGb3JtYXR0ZWQyOiB0aGlzLmdldERhdGVGb3JtYXR0ZWQodGhpcy5kYXRlMiksXHJcbiAgICAgICAgICAgIGRhdGVPcGFjaXR5MTogdGhpcy5kYXRlT3BhY2l0eTEsXHJcbiAgICAgICAgICAgIGRhdGVPcGFjaXR5MjogdGhpcy5kYXRlT3BhY2l0eTIsXHJcbiAgICAgICAgICAgIHR3b1ZhbHVlczogdGhpcy5kYXRlMiAhPT0gbnVsbFxyXG4gICAgICAgIH07XHJcbiAgICB9O1xyXG4gICAgVmFsdWUucHJvdG90eXBlLmdldE11c3RhY2hlID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHJldHVybiByZXF1aXJlKCcuL1ZhbHVlLm11c3RhY2hlJyk7XHJcbiAgICB9O1xyXG4gICAgcmV0dXJuIFZhbHVlO1xyXG59KENvbXBvbmVudCkpO1xyXG5leHBvcnQgeyBWYWx1ZSB9O1xyXG4iLCJ2YXIgX19leHRlbmRzID0gKHRoaXMgJiYgdGhpcy5fX2V4dGVuZHMpIHx8IChmdW5jdGlvbiAoKSB7XHJcbiAgICB2YXIgZXh0ZW5kU3RhdGljcyA9IGZ1bmN0aW9uIChkLCBiKSB7XHJcbiAgICAgICAgZXh0ZW5kU3RhdGljcyA9IE9iamVjdC5zZXRQcm90b3R5cGVPZiB8fFxyXG4gICAgICAgICAgICAoeyBfX3Byb3RvX186IFtdIH0gaW5zdGFuY2VvZiBBcnJheSAmJiBmdW5jdGlvbiAoZCwgYikgeyBkLl9fcHJvdG9fXyA9IGI7IH0pIHx8XHJcbiAgICAgICAgICAgIGZ1bmN0aW9uIChkLCBiKSB7IGZvciAodmFyIHAgaW4gYikgaWYgKGIuaGFzT3duUHJvcGVydHkocCkpIGRbcF0gPSBiW3BdOyB9O1xyXG4gICAgICAgIHJldHVybiBleHRlbmRTdGF0aWNzKGQsIGIpO1xyXG4gICAgfTtcclxuICAgIHJldHVybiBmdW5jdGlvbiAoZCwgYikge1xyXG4gICAgICAgIGV4dGVuZFN0YXRpY3MoZCwgYik7XHJcbiAgICAgICAgZnVuY3Rpb24gX18oKSB7IHRoaXMuY29uc3RydWN0b3IgPSBkOyB9XHJcbiAgICAgICAgZC5wcm90b3R5cGUgPSBiID09PSBudWxsID8gT2JqZWN0LmNyZWF0ZShiKSA6IChfXy5wcm90b3R5cGUgPSBiLnByb3RvdHlwZSwgbmV3IF9fKCkpO1xyXG4gICAgfTtcclxufSkoKTtcclxuaW1wb3J0IHsgUGlja2VyIH0gZnJvbSBcIi4uL1BpY2tlclwiO1xyXG52YXIgWWVhclBpY2tlciA9IC8qKiBAY2xhc3MgKi8gKGZ1bmN0aW9uIChfc3VwZXIpIHtcclxuICAgIF9fZXh0ZW5kcyhZZWFyUGlja2VyLCBfc3VwZXIpO1xyXG4gICAgZnVuY3Rpb24gWWVhclBpY2tlcih5ZWFyKSB7XHJcbiAgICAgICAgaWYgKHllYXIgPT09IHZvaWQgMCkgeyB5ZWFyID0gbnVsbDsgfVxyXG4gICAgICAgIHZhciBfdGhpcyA9IF9zdXBlci5jYWxsKHRoaXMpIHx8IHRoaXM7XHJcbiAgICAgICAgX3RoaXMueWVhciA9IHllYXI7XHJcbiAgICAgICAgcmV0dXJuIF90aGlzO1xyXG4gICAgfVxyXG4gICAgWWVhclBpY2tlci5wcm90b3R5cGUuZ2V0RXZlbnRzID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHJldHVybiBbXHJcbiAgICAgICAgICAgIHRoaXMuZ2V0RXZlbnRPYmplY3QoJy5qcGlja2VyLWVsZW1lbnQnLCAnY2xpY2snLCB0aGlzLm9uWWVhckNsaWNrKVxyXG4gICAgICAgIF07XHJcbiAgICB9O1xyXG4gICAgWWVhclBpY2tlci5wcm90b3R5cGUub25ZZWFyQ2xpY2sgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgY29uc29sZS5sb2codGhpcywgYXJndW1lbnRzKTtcclxuICAgIH07XHJcbiAgICBZZWFyUGlja2VyLnByb3RvdHlwZS5nZXRNdXN0YWNoZVZhcnMgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgZWxlbWVudHM6IHRoaXMuZ2V0WWVhcnMoKSxcclxuICAgICAgICAgICAgd3JhcHBlckNsYXNzOiAnanBpY2tlci15ZWFycy13cmFwcGVyJ1xyXG4gICAgICAgIH07XHJcbiAgICB9O1xyXG4gICAgWWVhclBpY2tlci5wcm90b3R5cGUuZ2V0WWVhcnMgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgdmFyIGN1cnJlbnRZZWFyID0gdGhpcy55ZWFyIHx8IHRoaXMuZ2V0Q3VycmVudFllYXIoKSwgbWluWWVhciA9IGN1cnJlbnRZZWFyIC0gNywgbWF4WWVhciA9IGN1cnJlbnRZZWFyICsgNywgcmVzdWx0ID0gW107XHJcbiAgICAgICAgZm9yICh2YXIgeWVhciA9IG1pblllYXI7IHllYXIgPD0gbWF4WWVhcjsgeWVhcisrKSB7XHJcbiAgICAgICAgICAgIHJlc3VsdC5wdXNoKHtcclxuICAgICAgICAgICAgICAgIGtleTogeWVhcixcclxuICAgICAgICAgICAgICAgIG5hbWU6IHllYXIsXHJcbiAgICAgICAgICAgICAgICBzZWxlY3RlZDogY3VycmVudFllYXIgPT09IHllYXJcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiByZXN1bHQ7XHJcbiAgICB9O1xyXG4gICAgWWVhclBpY2tlci5wcm90b3R5cGUuZ2V0Q3VycmVudFllYXIgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgcmV0dXJuIChuZXcgRGF0ZSkuZ2V0RnVsbFllYXIoKTtcclxuICAgIH07XHJcbiAgICBZZWFyUGlja2VyLnByb3RvdHlwZS5nZXRNdXN0YWNoZSA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICByZXR1cm4gcmVxdWlyZSgnLi4vTGlzdC9MaXN0Lm11c3RhY2hlJyk7XHJcbiAgICB9O1xyXG4gICAgcmV0dXJuIFllYXJQaWNrZXI7XHJcbn0oUGlja2VyKSk7XHJcbmV4cG9ydCB7IFllYXJQaWNrZXIgfTtcclxuIiwiZXhwb3J0IHsgSlBpY2tlciB9IGZyb20gXCIuL0NvbXBvbmVudHMvSlBpY2tlci9KUGlja2VyXCI7XHJcbiJdLCJzb3VyY2VSb290IjoiIn0=