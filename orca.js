/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./browser/buffer.js":
/*!***************************!*\
  !*** ./browser/buffer.js ***!
  \***************************/
/*! unknown exports (runtime-defined) */
/*! runtime requirements: module */
/*! CommonJS bailout: module.exports is used directly at 1:0-14 */
/***/ ((module) => {

module.exports = {
  from: (s) => s,
};


/***/ }),

/***/ "./browser/dgram.js":
/*!**************************!*\
  !*** ./browser/dgram.js ***!
  \**************************/
/*! unknown exports (runtime-defined) */
/*! runtime requirements: module, __webpack_require__ */
/*! CommonJS bailout: module.exports is used directly at 33:0-14 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var EventEmitter = __webpack_require__(/*! events */ "./node_modules/events/events.js");

let ports = window.top.ports;
if (!ports) {
  ports = window.top.ports = {};
}

class Socket extends EventEmitter {
  bind(port) {
    this.port = port;
    ports[port] = this;
    this.emit("listening");
  }
  address() {
    return {
      address: "0.0.0.0",
      port: this.port,
    };
  }
  send(buf, port, ip, onError) {
    const target = ports[port];
    if (!target) onError(new Error("Unable to connect"));
    target.emit("message", buf);
  }
  close() {
    this.removeAllListeners();
    if (this.port && ports[this.port] === this) {
      delete ports[this.port];
    }
  }
}

module.exports = {
  createSocket() {
    return new Socket();
  },
};


/***/ }),

/***/ "./browser/electron.js":
/*!*****************************!*\
  !*** ./browser/electron.js ***!
  \*****************************/
/*! unknown exports (runtime-defined) */
/*! runtime requirements: module */
/*! CommonJS bailout: module.exports is used directly at 1:0-14 */
/***/ ((module) => {

module.exports = {
  remote: {
    dialog: {},
  },
};


/***/ }),

/***/ "./browser/node-osc.js":
/*!*****************************!*\
  !*** ./browser/node-osc.js ***!
  \*****************************/
/*! unknown exports (runtime-defined) */
/*! runtime requirements: module */
/*! CommonJS bailout: module.exports is used directly at 1:0-14 */
/***/ ((module) => {

module.exports = false;


/***/ }),

/***/ "./node_modules/events/events.js":
/*!***************************************!*\
  !*** ./node_modules/events/events.js ***!
  \***************************************/
/*! unknown exports (runtime-defined) */
/*! runtime requirements: module */
/*! CommonJS bailout: module.exports is used directly at 56:0-14 */
/***/ ((module) => {

"use strict";
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.



var R = typeof Reflect === 'object' ? Reflect : null
var ReflectApply = R && typeof R.apply === 'function'
  ? R.apply
  : function ReflectApply(target, receiver, args) {
    return Function.prototype.apply.call(target, receiver, args);
  }

var ReflectOwnKeys
if (R && typeof R.ownKeys === 'function') {
  ReflectOwnKeys = R.ownKeys
} else if (Object.getOwnPropertySymbols) {
  ReflectOwnKeys = function ReflectOwnKeys(target) {
    return Object.getOwnPropertyNames(target)
      .concat(Object.getOwnPropertySymbols(target));
  };
} else {
  ReflectOwnKeys = function ReflectOwnKeys(target) {
    return Object.getOwnPropertyNames(target);
  };
}

function ProcessEmitWarning(warning) {
  if (console && console.warn) console.warn(warning);
}

var NumberIsNaN = Number.isNaN || function NumberIsNaN(value) {
  return value !== value;
}

function EventEmitter() {
  EventEmitter.init.call(this);
}
module.exports = EventEmitter;
module.exports.once = once;

// Backwards-compat with node 0.10.x
EventEmitter.EventEmitter = EventEmitter;

EventEmitter.prototype._events = undefined;
EventEmitter.prototype._eventsCount = 0;
EventEmitter.prototype._maxListeners = undefined;

// By default EventEmitters will print a warning if more than 10 listeners are
// added to it. This is a useful default which helps finding memory leaks.
var defaultMaxListeners = 10;

function checkListener(listener) {
  if (typeof listener !== 'function') {
    throw new TypeError('The "listener" argument must be of type Function. Received type ' + typeof listener);
  }
}

Object.defineProperty(EventEmitter, 'defaultMaxListeners', {
  enumerable: true,
  get: function() {
    return defaultMaxListeners;
  },
  set: function(arg) {
    if (typeof arg !== 'number' || arg < 0 || NumberIsNaN(arg)) {
      throw new RangeError('The value of "defaultMaxListeners" is out of range. It must be a non-negative number. Received ' + arg + '.');
    }
    defaultMaxListeners = arg;
  }
});

EventEmitter.init = function() {

  if (this._events === undefined ||
      this._events === Object.getPrototypeOf(this)._events) {
    this._events = Object.create(null);
    this._eventsCount = 0;
  }

  this._maxListeners = this._maxListeners || undefined;
};

// Obviously not all Emitters should be limited to 10. This function allows
// that to be increased. Set to zero for unlimited.
EventEmitter.prototype.setMaxListeners = function setMaxListeners(n) {
  if (typeof n !== 'number' || n < 0 || NumberIsNaN(n)) {
    throw new RangeError('The value of "n" is out of range. It must be a non-negative number. Received ' + n + '.');
  }
  this._maxListeners = n;
  return this;
};

function _getMaxListeners(that) {
  if (that._maxListeners === undefined)
    return EventEmitter.defaultMaxListeners;
  return that._maxListeners;
}

EventEmitter.prototype.getMaxListeners = function getMaxListeners() {
  return _getMaxListeners(this);
};

EventEmitter.prototype.emit = function emit(type) {
  var args = [];
  for (var i = 1; i < arguments.length; i++) args.push(arguments[i]);
  var doError = (type === 'error');

  var events = this._events;
  if (events !== undefined)
    doError = (doError && events.error === undefined);
  else if (!doError)
    return false;

  // If there is no 'error' event listener then throw.
  if (doError) {
    var er;
    if (args.length > 0)
      er = args[0];
    if (er instanceof Error) {
      // Note: The comments on the `throw` lines are intentional, they show
      // up in Node's output if this results in an unhandled exception.
      throw er; // Unhandled 'error' event
    }
    // At least give some kind of context to the user
    var err = new Error('Unhandled error.' + (er ? ' (' + er.message + ')' : ''));
    err.context = er;
    throw err; // Unhandled 'error' event
  }

  var handler = events[type];

  if (handler === undefined)
    return false;

  if (typeof handler === 'function') {
    ReflectApply(handler, this, args);
  } else {
    var len = handler.length;
    var listeners = arrayClone(handler, len);
    for (var i = 0; i < len; ++i)
      ReflectApply(listeners[i], this, args);
  }

  return true;
};

function _addListener(target, type, listener, prepend) {
  var m;
  var events;
  var existing;

  checkListener(listener);

  events = target._events;
  if (events === undefined) {
    events = target._events = Object.create(null);
    target._eventsCount = 0;
  } else {
    // To avoid recursion in the case that type === "newListener"! Before
    // adding it to the listeners, first emit "newListener".
    if (events.newListener !== undefined) {
      target.emit('newListener', type,
                  listener.listener ? listener.listener : listener);

      // Re-assign `events` because a newListener handler could have caused the
      // this._events to be assigned to a new object
      events = target._events;
    }
    existing = events[type];
  }

  if (existing === undefined) {
    // Optimize the case of one listener. Don't need the extra array object.
    existing = events[type] = listener;
    ++target._eventsCount;
  } else {
    if (typeof existing === 'function') {
      // Adding the second element, need to change to array.
      existing = events[type] =
        prepend ? [listener, existing] : [existing, listener];
      // If we've already got an array, just append.
    } else if (prepend) {
      existing.unshift(listener);
    } else {
      existing.push(listener);
    }

    // Check for listener leak
    m = _getMaxListeners(target);
    if (m > 0 && existing.length > m && !existing.warned) {
      existing.warned = true;
      // No error code for this since it is a Warning
      // eslint-disable-next-line no-restricted-syntax
      var w = new Error('Possible EventEmitter memory leak detected. ' +
                          existing.length + ' ' + String(type) + ' listeners ' +
                          'added. Use emitter.setMaxListeners() to ' +
                          'increase limit');
      w.name = 'MaxListenersExceededWarning';
      w.emitter = target;
      w.type = type;
      w.count = existing.length;
      ProcessEmitWarning(w);
    }
  }

  return target;
}

EventEmitter.prototype.addListener = function addListener(type, listener) {
  return _addListener(this, type, listener, false);
};

EventEmitter.prototype.on = EventEmitter.prototype.addListener;

EventEmitter.prototype.prependListener =
    function prependListener(type, listener) {
      return _addListener(this, type, listener, true);
    };

function onceWrapper() {
  if (!this.fired) {
    this.target.removeListener(this.type, this.wrapFn);
    this.fired = true;
    if (arguments.length === 0)
      return this.listener.call(this.target);
    return this.listener.apply(this.target, arguments);
  }
}

function _onceWrap(target, type, listener) {
  var state = { fired: false, wrapFn: undefined, target: target, type: type, listener: listener };
  var wrapped = onceWrapper.bind(state);
  wrapped.listener = listener;
  state.wrapFn = wrapped;
  return wrapped;
}

EventEmitter.prototype.once = function once(type, listener) {
  checkListener(listener);
  this.on(type, _onceWrap(this, type, listener));
  return this;
};

EventEmitter.prototype.prependOnceListener =
    function prependOnceListener(type, listener) {
      checkListener(listener);
      this.prependListener(type, _onceWrap(this, type, listener));
      return this;
    };

// Emits a 'removeListener' event if and only if the listener was removed.
EventEmitter.prototype.removeListener =
    function removeListener(type, listener) {
      var list, events, position, i, originalListener;

      checkListener(listener);

      events = this._events;
      if (events === undefined)
        return this;

      list = events[type];
      if (list === undefined)
        return this;

      if (list === listener || list.listener === listener) {
        if (--this._eventsCount === 0)
          this._events = Object.create(null);
        else {
          delete events[type];
          if (events.removeListener)
            this.emit('removeListener', type, list.listener || listener);
        }
      } else if (typeof list !== 'function') {
        position = -1;

        for (i = list.length - 1; i >= 0; i--) {
          if (list[i] === listener || list[i].listener === listener) {
            originalListener = list[i].listener;
            position = i;
            break;
          }
        }

        if (position < 0)
          return this;

        if (position === 0)
          list.shift();
        else {
          spliceOne(list, position);
        }

        if (list.length === 1)
          events[type] = list[0];

        if (events.removeListener !== undefined)
          this.emit('removeListener', type, originalListener || listener);
      }

      return this;
    };

EventEmitter.prototype.off = EventEmitter.prototype.removeListener;

EventEmitter.prototype.removeAllListeners =
    function removeAllListeners(type) {
      var listeners, events, i;

      events = this._events;
      if (events === undefined)
        return this;

      // not listening for removeListener, no need to emit
      if (events.removeListener === undefined) {
        if (arguments.length === 0) {
          this._events = Object.create(null);
          this._eventsCount = 0;
        } else if (events[type] !== undefined) {
          if (--this._eventsCount === 0)
            this._events = Object.create(null);
          else
            delete events[type];
        }
        return this;
      }

      // emit removeListener for all listeners on all events
      if (arguments.length === 0) {
        var keys = Object.keys(events);
        var key;
        for (i = 0; i < keys.length; ++i) {
          key = keys[i];
          if (key === 'removeListener') continue;
          this.removeAllListeners(key);
        }
        this.removeAllListeners('removeListener');
        this._events = Object.create(null);
        this._eventsCount = 0;
        return this;
      }

      listeners = events[type];

      if (typeof listeners === 'function') {
        this.removeListener(type, listeners);
      } else if (listeners !== undefined) {
        // LIFO order
        for (i = listeners.length - 1; i >= 0; i--) {
          this.removeListener(type, listeners[i]);
        }
      }

      return this;
    };

function _listeners(target, type, unwrap) {
  var events = target._events;

  if (events === undefined)
    return [];

  var evlistener = events[type];
  if (evlistener === undefined)
    return [];

  if (typeof evlistener === 'function')
    return unwrap ? [evlistener.listener || evlistener] : [evlistener];

  return unwrap ?
    unwrapListeners(evlistener) : arrayClone(evlistener, evlistener.length);
}

EventEmitter.prototype.listeners = function listeners(type) {
  return _listeners(this, type, true);
};

EventEmitter.prototype.rawListeners = function rawListeners(type) {
  return _listeners(this, type, false);
};

EventEmitter.listenerCount = function(emitter, type) {
  if (typeof emitter.listenerCount === 'function') {
    return emitter.listenerCount(type);
  } else {
    return listenerCount.call(emitter, type);
  }
};

EventEmitter.prototype.listenerCount = listenerCount;
function listenerCount(type) {
  var events = this._events;

  if (events !== undefined) {
    var evlistener = events[type];

    if (typeof evlistener === 'function') {
      return 1;
    } else if (evlistener !== undefined) {
      return evlistener.length;
    }
  }

  return 0;
}

EventEmitter.prototype.eventNames = function eventNames() {
  return this._eventsCount > 0 ? ReflectOwnKeys(this._events) : [];
};

function arrayClone(arr, n) {
  var copy = new Array(n);
  for (var i = 0; i < n; ++i)
    copy[i] = arr[i];
  return copy;
}

function spliceOne(list, index) {
  for (; index + 1 < list.length; index++)
    list[index] = list[index + 1];
  list.pop();
}

function unwrapListeners(arr) {
  var ret = new Array(arr.length);
  for (var i = 0; i < ret.length; ++i) {
    ret[i] = arr[i].listener || arr[i];
  }
  return ret;
}

function once(emitter, name) {
  return new Promise(function (resolve, reject) {
    function eventListener() {
      if (errorListener !== undefined) {
        emitter.removeListener('error', errorListener);
      }
      resolve([].slice.call(arguments));
    };
    var errorListener;

    // Adding an error listener is not optional because
    // if an error is thrown on an event emitter we cannot
    // guarantee that the actual event we are waiting will
    // be fired. The result could be a silent way to create
    // memory or file descriptor leaks, which is something
    // we should avoid.
    if (name !== 'error') {
      errorListener = function errorListener(err) {
        emitter.removeListener(name, eventListener);
        reject(err);
      };

      emitter.once('error', errorListener);
    }

    emitter.once(name, eventListener);
  });
}


/***/ }),

/***/ "./orca/desktop/sources/scripts/core/io/cc.js":
/*!****************************************************!*\
  !*** ./orca/desktop/sources/scripts/core/io/cc.js ***!
  \****************************************************/
/*! namespace exports */
/*! export default [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_exports__, __webpack_require__.r, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => __WEBPACK_DEFAULT_EXPORT__
/* harmony export */ });


function MidiCC (client) {
  this.stack = []
  this.offset = 64

  this.start = function () {
    console.info('MidiCC', 'Starting..')
  }

  this.clear = function () {
    this.stack = []
  }

  this.run = function () {
    if (this.stack.length < 1) { return }
    const device = client.io.midi.outputDevice()
    if (!device) { console.warn('CC', 'No Midi device.'); return }
    for (const msg of this.stack) {
      if (msg.type === 'cc' && !isNaN(msg.channel) && !isNaN(msg.knob) && !isNaN(msg.value)) {
        device.send([0xb0 + msg.channel, this.offset + msg.knob, msg.value])
      } else if (msg.type === 'pb' && !isNaN(msg.channel) && !isNaN(msg.lsb) && !isNaN(msg.msb)) {
        device.send([0xe0 + msg.channel, msg.lsb, msg.msb])
      } else if (msg.type === 'pg' && !isNaN(msg.channel)) {
        if (!isNaN(msg.bank)) { device.send([0xb0 + msg.channel, 0, msg.bank]) }
        if (!isNaN(msg.sub)) { device.send([0xb0 + msg.channel, 32, msg.sub]) }
        if (!isNaN(msg.pgm)) { device.send([0xc0 + msg.channel, msg.pgm]) }
      } else {
        console.warn('CC', 'Unknown message', msg)
      }
    }
  }

  this.setOffset = function (offset) {
    if (isNaN(offset)) { return }
    this.offset = offset
    console.log('CC', 'Set offset to ' + this.offset)
  }
}

/*** EXPORTS FROM exports-loader ***/
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (MidiCC);


/***/ }),

/***/ "./orca/desktop/sources/scripts/lib/acels.js":
/*!***************************************************!*\
  !*** ./orca/desktop/sources/scripts/lib/acels.js ***!
  \***************************************************/
/*! namespace exports */
/*! export default [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__, __webpack_exports__, __webpack_require__.r, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => __WEBPACK_DEFAULT_EXPORT__
/* harmony export */ });


function Acels (client) {
  this.all = {}
  this.roles = {}
  this.pipe = null

  this.install = (host = window) => {
    host.addEventListener('keydown', this.onKeyDown, false)
    host.addEventListener('keyup', this.onKeyUp, false)
  }

  this.set = (cat, name, accelerator, downfn, upfn) => {
    if (this.all[accelerator]) { console.warn('Acels', `Trying to overwrite ${this.all[accelerator].name}, with ${name}.`) }
    this.all[accelerator] = { cat, name, downfn, upfn, accelerator }
  }

  this.add = (cat, role) => {
    this.all[':' + role] = { cat, name: role, role }
  }

  this.get = (accelerator) => {
    return this.all[accelerator]
  }

  this.sort = () => {
    const h = {}
    for (const item of Object.values(this.all)) {
      if (!h[item.cat]) { h[item.cat] = [] }
      h[item.cat].push(item)
    }
    return h
  }

  this.convert = (event) => {
    const accelerator = event.key === ' ' ? 'Space' : event.key.substr(0, 1).toUpperCase() + event.key.substr(1)
    if ((event.ctrlKey || event.metaKey) && event.shiftKey) {
      return `CmdOrCtrl+Shift+${accelerator}`
    }
    if (event.shiftKey && event.key.toUpperCase() !== event.key) {
      return `Shift+${accelerator}`
    }
    if (event.altKey && event.key.length !== 1) {
      return `Alt+${accelerator}`
    }
    if (event.ctrlKey || event.metaKey) {
      return `CmdOrCtrl+${accelerator}`
    }
    return accelerator
  }

  this.pipe = (obj) => {
    this.pipe = obj
  }

  this.onKeyDown = (e) => {
    const target = this.get(this.convert(e))
    if (!target || !target.downfn) { return this.pipe ? this.pipe.onKeyDown(e) : null }
    target.downfn()
    e.preventDefault()
  }

  this.onKeyUp = (e) => {
    const target = this.get(this.convert(e))
    if (!target || !target.upfn) { return this.pipe ? this.pipe.onKeyUp(e) : null }
    target.upfn()
    e.preventDefault()
  }

  this.toMarkdown = () => {
    const cats = this.sort()
    let text = ''
    for (const cat in cats) {
      text += `\n### ${cat}\n\n`
      for (const item of cats[cat]) {
        text += item.accelerator ? `- \`${item.accelerator.replace('`', 'tilde')}\`: ${item.name}\n` : ''
      }
    }
    return text.trim()
  }

  this.toString = () => {
    const cats = this.sort()
    let text = ''
    for (const cat in cats) {
      text += `\n${cat}\n\n`
      for (const item of cats[cat]) {
        text += item.accelerator ? `${item.name.padEnd(25, '.')} ${item.accelerator}\n` : ''
      }
    }
    return text.trim()
  }

  // Electron specifics

  this.inject = (name = 'Untitled') => {
    const app = __webpack_require__(/*! electron */ "./browser/electron.js").remote.app
    const injection = []

    injection.push({
      label: name,
      submenu: [
        { label: 'About', click: () => { __webpack_require__(/*! electron */ "./browser/electron.js").shell.openExternal('https://github.com/hundredrabbits/' + name) } },
        {
          label: 'Theme',
          submenu: [
            { label: 'Download Themes', click: () => { __webpack_require__(/*! electron */ "./browser/electron.js").shell.openExternal('https://github.com/hundredrabbits/Themes') } },
            { label: 'Open Theme', click: () => { client.theme.open() } },
            { label: 'Reset Theme', accelerator: 'CmdOrCtrl+Escape', click: () => { client.theme.reset() } }
          ]
        },
        { label: 'Fullscreen', accelerator: 'CmdOrCtrl+Enter', click: () => { app.toggleFullscreen() } },
        { label: 'Hide', accelerator: 'CmdOrCtrl+H', click: () => { app.toggleVisible() } },
        { label: 'Toggle Menubar', accelerator: 'Alt+H', click: () => { app.toggleMenubar() } },
        { label: 'Inspect', accelerator: 'CmdOrCtrl+Tab', click: () => { app.inspect() } },
        { role: 'quit' }
      ]
    })

    const sorted = this.sort()
    for (const cat of Object.keys(sorted)) {
      const submenu = []
      for (const option of sorted[cat]) {
        if (option.role) {
          submenu.push({ role: option.role })
        } else if (option.type) {
          submenu.push({ type: option.type })
        } else {
          submenu.push({ label: option.name, accelerator: option.accelerator, click: option.downfn })
        }
      }
      injection.push({ label: cat, submenu: submenu })
    }
    app.injectMenu(injection)
  }
}

/*** EXPORTS FROM exports-loader ***/
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Acels);


/***/ }),

/***/ "./orca/desktop/sources/scripts/lib/history.js":
/*!*****************************************************!*\
  !*** ./orca/desktop/sources/scripts/lib/history.js ***!
  \*****************************************************/
/*! namespace exports */
/*! export default [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_exports__, __webpack_require__.r, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => __WEBPACK_DEFAULT_EXPORT__
/* harmony export */ });


function History () {
  this.index = 0
  this.frames = []
  this.host = null
  this.key = null

  this.bind = function (host, key) {
    console.log('History is recording..')
    this.host = host
    this.key = key
    this.reset()
  }

  this.reset = function () {
    this.index = 0
    this.frames = []
  }

  this.record = function (data) {
    if (this.index === this.frames.length) {
      this.append(data)
    } else {
      this.fork(data)
    }
    this.trim()
    this.index = this.frames.length
  }

  this.undo = function () {
    if (this.index === 0) { console.warn('History', 'Reached beginning'); return }
    this.index = clamp(this.index - 1, 0, this.frames.length - 2)
    this.apply(this.frames[this.index])
  }

  this.redo = function () {
    if (this.index + 1 > this.frames.length - 1) { console.warn('History', 'Reached end'); return }
    this.index = clamp(this.index + 1, 0, this.frames.length - 1)
    this.apply(this.frames[this.index])
  }

  this.apply = function (f) {
    if (!this.host[this.key]) { console.log(`Unknown binding to key ${this.key}`); return }
    if (!f || f.length !== this.host[this.key].length) { return }
    this.host[this.key] = this.frames[this.index]
  }

  this.append = function (data) {
    if (!data) { return }
    if (this.frames[this.index - 1] && this.frames[this.index - 1] === data) { return }
    this.frames.push(data)
  }

  this.fork = function (data) {
    this.frames = this.frames.slice(0, this.index + 1)
    this.append(data)
  }

  this.trim = function (limit = 30) {
    if (this.frames.length < limit) { return }
    this.frames.shift()
  }

  this.last = function () {
    return this.frames[this.index - 1]
  }

  this.length = function () {
    return this.frames.length
  }

  function clamp (v, min, max) { return v < min ? min : v > max ? max : v }
}

/*** EXPORTS FROM exports-loader ***/
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (History);


/***/ }),

/***/ "./orca/desktop/sources/scripts/lib/source.js":
/*!****************************************************!*\
  !*** ./orca/desktop/sources/scripts/lib/source.js ***!
  \****************************************************/
/*! namespace exports */
/*! export default [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_exports__, __webpack_require__.r, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => __WEBPACK_DEFAULT_EXPORT__
/* harmony export */ });


/* global FileReader */
/* global MouseEvent */

function Source (client) {
  this.cache = {}

  this.install = () => {
  }

  this.start = () => {
    this.new()
  }

  this.new = () => {
    console.log('Source', 'New file..')
    this.cache = {}
  }

  this.open = (ext, callback, store = false) => {
    console.log('Source', 'Open file..')
    const input = document.createElement('input')
    input.type = 'file'
    input.onchange = (e) => {
      const file = e.target.files[0]
      if (file.name.indexOf('.' + ext) < 0) { console.warn('Source', `Skipped ${file.name}`); return }
      this.read(file, callback, store)
    }
    input.click()
  }

  this.load = (ext, callback) => {
    console.log('Source', 'Load files..')
    const input = document.createElement('input')
    input.type = 'file'
    input.setAttribute('multiple', 'multiple')
    input.onchange = (e) => {
      for (const file of e.target.files) {
        if (file.name.indexOf('.' + ext) < 0) { console.warn('Source', `Skipped ${file.name}`); continue }
        this.read(file, this.store)
      }
    }
    input.click()
  }

  this.store = (file, content) => {
    console.info('Source', 'Stored ' + file.name)
    this.cache[file.name] = content
  }

  this.save = (name, content, type = 'text/plain', callback) => {
    this.saveAs(name, content, type, callback)
  }

  this.saveAs = (name, ext, content, type = 'text/plain', callback) => {
    console.log('Source', 'Save new file..')
    this.write(name, ext, content, type, callback)
  }

  // I/O

  this.read = (file, callback, store = false) => {
    const reader = new FileReader()
    reader.onload = (event) => {
      const res = event.target.result
      if (callback) { callback(file, res) }
      if (store) { this.store(file, res) }
    }
    reader.readAsText(file, 'UTF-8')
  }

  this.write = (name, ext, content, type, settings = 'charset=utf-8') => {
    const link = document.createElement('a')
    link.setAttribute('download', `${name}-${timestamp()}.${ext}`)
    if (type === 'image/png' || type === 'image/jpeg') {
      link.setAttribute('href', content)
    } else {
      link.setAttribute('href', 'data:' + type + ';' + settings + ',' + encodeURIComponent(content))
    }
    link.dispatchEvent(new MouseEvent('click', { bubbles: true, cancelable: true, view: window }))
  }

  function timestamp (d = new Date(), e = new Date(d)) {
    return `${arvelie()}-${neralie()}`
  }

  function arvelie (date = new Date()) {
    const start = new Date(date.getFullYear(), 0, 0)
    const diff = (date - start) + ((start.getTimezoneOffset() - date.getTimezoneOffset()) * 60 * 1000)
    const doty = Math.floor(diff / 86400000) - 1
    const y = date.getFullYear().toString().substr(2, 2)
    const m = doty === 364 || doty === 365 ? '+' : String.fromCharCode(97 + Math.floor(doty / 14)).toUpperCase()
    const d = `${(doty === 365 ? 1 : doty === 366 ? 2 : (doty % 14)) + 1}`.padStart(2, '0')
    return `${y}${m}${d}`
  }

  function neralie (d = new Date(), e = new Date(d)) {
    const ms = e - d.setHours(0, 0, 0, 0)
    return (ms / 8640 / 10000).toFixed(6).substr(2, 6)
  }
}

/*** EXPORTS FROM exports-loader ***/
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Source);


/***/ }),

/***/ "./orca/desktop/sources/scripts/lib/theme.js":
/*!***************************************************!*\
  !*** ./orca/desktop/sources/scripts/lib/theme.js ***!
  \***************************************************/
/*! namespace exports */
/*! export default [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_exports__, __webpack_require__.r, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => __WEBPACK_DEFAULT_EXPORT__
/* harmony export */ });


/* global localStorage */
/* global FileReader */
/* global DOMParser */

function Theme (client) {
  this.el = document.createElement('style')
  this.el.type = 'text/css'

  this.active = {}
  this.default = {
    background: '#eeeeee',
    f_high: '#0a0a0a',
    f_med: '#4a4a4a',
    f_low: '#6a6a6a',
    f_inv: '#111111',
    b_high: '#a1a1a1',
    b_med: '#c1c1c1',
    b_low: '#ffffff',
    b_inv: '#ffb545'
  }

  // Callbacks
  this.onLoad = () => {}

  this.install = (host = document.body) => {
    window.addEventListener('dragover', this.drag)
    window.addEventListener('drop', this.drop)
    host.appendChild(this.el)
  }

  this.start = () => {
    console.log('Theme', 'Starting..')
    if (isJson(localStorage.theme)) {
      const storage = JSON.parse(localStorage.theme)
      if (isValid(storage)) {
        console.log('Theme', 'Loading theme in localStorage..')
        this.load(storage)
        return
      }
    }
    this.load(this.default)
  }

  this.open = () => {
    console.log('Theme', 'Open theme..')
    const input = document.createElement('input')
    input.type = 'file'
    input.onchange = (e) => {
      this.read(e.target.files[0], this.load)
    }
    input.click()
  }

  this.load = (data) => {
    const theme = this.parse(data)
    if (!isValid(theme)) { console.warn('Theme', 'Invalid format'); return }
    console.log('Theme', 'Loaded theme!')
    this.el.innerHTML = `:root { 
      --background: ${theme.background}; 
      --f_high: ${theme.f_high}; 
      --f_med: ${theme.f_med}; 
      --f_low: ${theme.f_low}; 
      --f_inv: ${theme.f_inv}; 
      --b_high: ${theme.b_high}; 
      --b_med: ${theme.b_med}; 
      --b_low: ${theme.b_low}; 
      --b_inv: ${theme.b_inv};
    }`
    localStorage.setItem('theme', JSON.stringify(theme))
    this.active = theme
    if (this.onLoad) {
      this.onLoad(data)
    }
  }

  this.reset = () => {
    this.load(this.default)
  }

  this.set = (key, val) => {
    if (!val) { return }
    const hex = (`${val}`.substr(0, 1) !== '#' ? '#' : '') + `${val}`
    if (!isColor(hex)) { console.warn('Theme', `${hex} is not a valid color.`); return }
    this.active[key] = hex
  }

  this.read = (key) => {
    return this.active[key]
  }

  this.parse = (any) => {
    if (isValid(any)) { return any }
    if (isJson(any)) { return JSON.parse(any) }
    if (isHtml(any)) { return extract(any) }
  }

  // Drag

  this.drag = (e) => {
    e.stopPropagation()
    e.preventDefault()
    e.dataTransfer.dropEffect = 'copy'
  }

  this.drop = (e) => {
    e.preventDefault()
    const file = e.dataTransfer.files[0]
    if (file.name.indexOf('.svg') > -1) {
      this.read(file, this.load)
    }
    e.stopPropagation()
  }

  this.read = (file, callback) => {
    const reader = new FileReader()
    reader.onload = (event) => {
      callback(event.target.result)
    }
    reader.readAsText(file, 'UTF-8')
  }

  // Helpers

  function extract (xml) {
    const svg = new DOMParser().parseFromString(xml, 'text/xml')
    try {
      return {
        background: svg.getElementById('background').getAttribute('fill'),
        f_high: svg.getElementById('f_high').getAttribute('fill'),
        f_med: svg.getElementById('f_med').getAttribute('fill'),
        f_low: svg.getElementById('f_low').getAttribute('fill'),
        f_inv: svg.getElementById('f_inv').getAttribute('fill'),
        b_high: svg.getElementById('b_high').getAttribute('fill'),
        b_med: svg.getElementById('b_med').getAttribute('fill'),
        b_low: svg.getElementById('b_low').getAttribute('fill'),
        b_inv: svg.getElementById('b_inv').getAttribute('fill')
      }
    } catch (err) {
      console.warn('Theme', 'Incomplete SVG Theme', err)
    }
  }

  function isValid (json) {
    if (!json) { return false }
    if (!json.background || !isColor(json.background)) { return false }
    if (!json.f_high || !isColor(json.f_high)) { return false }
    if (!json.f_med || !isColor(json.f_med)) { return false }
    if (!json.f_low || !isColor(json.f_low)) { return false }
    if (!json.f_inv || !isColor(json.f_inv)) { return false }
    if (!json.b_high || !isColor(json.b_high)) { return false }
    if (!json.b_med || !isColor(json.b_med)) { return false }
    if (!json.b_low || !isColor(json.b_low)) { return false }
    if (!json.b_inv || !isColor(json.b_inv)) { return false }
    return true
  }

  function isColor (hex) {
    return /^#([0-9A-F]{3}){1,2}$/i.test(hex)
  }

  function isJson (text) {
    try { JSON.parse(text); return true } catch (error) { return false }
  }

  function isHtml (text) {
    try { new DOMParser().parseFromString(text, 'text/xml'); return true } catch (error) { return false }
  }
}

/*** EXPORTS FROM exports-loader ***/
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Theme);


/***/ }),

/***/ "./orca/desktop/sources/scripts/client.js":
/*!************************************************!*\
  !*** ./orca/desktop/sources/scripts/client.js ***!
  \************************************************/
/*! namespace exports */
/*! export default [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__, __webpack_exports__, __webpack_require__.r, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => __WEBPACK_DEFAULT_EXPORT__
/* harmony export */ });
/* harmony import */ var _core_library_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./core/library.js */ "./orca/desktop/sources/scripts/core/library.js");
/* harmony import */ var _lib_acels_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./lib/acels.js */ "./orca/desktop/sources/scripts/lib/acels.js");
/* harmony import */ var _lib_source_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./lib/source.js */ "./orca/desktop/sources/scripts/lib/source.js");
/* harmony import */ var _lib_history_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./lib/history.js */ "./orca/desktop/sources/scripts/lib/history.js");
/* harmony import */ var _core_orca_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./core/orca.js */ "./orca/desktop/sources/scripts/core/orca.js");
/* harmony import */ var _core_io_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./core/io.js */ "./orca/desktop/sources/scripts/core/io.js");
/* harmony import */ var _cursor_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./cursor.js */ "./orca/desktop/sources/scripts/cursor.js");
/* harmony import */ var _commander_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./commander.js */ "./orca/desktop/sources/scripts/commander.js");
/* harmony import */ var _clock_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./clock.js */ "./orca/desktop/sources/scripts/clock.js");
/* harmony import */ var _lib_theme_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./lib/theme.js */ "./orca/desktop/sources/scripts/lib/theme.js");
/*** IMPORTS FROM imports-loader ***/












'use strict'

/* global library */
/* global Acels */
/* global Source */
/* global History */
/* global Orca */
/* global IO */
/* global Cursor */
/* global Commander */
/* global Clock */
/* global Theme */

function Client () {
  this.version = 176
  this.library = _core_library_js__WEBPACK_IMPORTED_MODULE_0__.default

  this.theme = new _lib_theme_js__WEBPACK_IMPORTED_MODULE_3__.default(this)
  this.acels = new _lib_acels_js__WEBPACK_IMPORTED_MODULE_1__.default(this)
  this.source = new _lib_source_js__WEBPACK_IMPORTED_MODULE_4__.default(this)
  this.history = new _lib_history_js__WEBPACK_IMPORTED_MODULE_5__.default(this)

  this.orca = new _core_orca_js__WEBPACK_IMPORTED_MODULE_6__.default(this.library)
  this.io = new _core_io_js__WEBPACK_IMPORTED_MODULE_2__.default(this)
  this.cursor = new _cursor_js__WEBPACK_IMPORTED_MODULE_7__.default(this)
  this.commander = new _commander_js__WEBPACK_IMPORTED_MODULE_8__.default(this)
  this.clock = new _clock_js__WEBPACK_IMPORTED_MODULE_9__.default(this)

  // Settings
  this.scale = window.devicePixelRatio
  this.grid = { w: 8, h: 8 }
  this.tile = {
    w: +localStorage.getItem('tilew') || 10,
    h: +localStorage.getItem('tileh') || 15
  }
  this.guide = false

  this.el = document.createElement('canvas')
  this.context = this.el.getContext('2d')

  this.install = (host) => {
    host.appendChild(this.el)
    this.theme.install(host)

    this.theme.default = { background: '#000000', f_high: '#ffffff', f_med: '#777777', f_low: '#444444', f_inv: '#000000', b_high: '#eeeeee', b_med: '#72dec2', b_low: '#444444', b_inv: '#ffb545' }

    this.acels.set('File', 'New', 'CmdOrCtrl+N', () => { this.reset() })
    this.acels.set('File', 'Open', 'CmdOrCtrl+O', () => { this.source.open('orca', this.whenOpen, true) })
    this.acels.set('File', 'Import Modules', 'CmdOrCtrl+L', () => { this.source.load('orca') })
    this.acels.set('File', 'Export', 'CmdOrCtrl+S', () => { this.source.write('orca', 'orca', `${this.orca}`, 'text/plain') })
    this.acels.set('File', 'Export Selection', 'CmdOrCtrl+Shift+S', () => { this.source.write('orca', 'orca', `${this.cursor.selection()}`, 'text/plain') })

    this.acels.set('Edit', 'Undo', 'CmdOrCtrl+Z', () => { this.history.undo() })
    this.acels.set('Edit', 'Redo', 'CmdOrCtrl+Shift+Z', () => { this.history.redo() })
    this.acels.add('Edit', 'cut')
    this.acels.add('Edit', 'copy')
    this.acels.add('Edit', 'paste')
    this.acels.set('Edit', 'Select All', 'CmdOrCtrl+A', () => { this.cursor.selectAll() })
    this.acels.set('Edit', 'Erase Selection', 'Backspace', () => { if (this.cursor.ins) { this.cursor.erase(); this.cursor.move(-1, 0) } else { this[this.commander.isActive ? 'commander' : 'cursor'].erase() } })
    this.acels.set('Edit', 'Uppercase', 'CmdOrCtrl+Shift+U', () => { this.cursor.toUpperCase() })
    this.acels.set('Edit', 'Lowercase', 'CmdOrCtrl+Shift+L', () => { this.cursor.toLowerCase() })
    this.acels.set('Edit', 'Drag North', 'Alt+ArrowUp', () => { this.cursor.drag(0, 1) })
    this.acels.set('Edit', 'Drag East', 'Alt+ArrowRight', () => { this.cursor.drag(1, 0) })
    this.acels.set('Edit', 'Drag South', 'Alt+ArrowDown', () => { this.cursor.drag(0, -1) })
    this.acels.set('Edit', 'Drag West', 'Alt+ArrowLeft', () => { this.cursor.drag(-1, 0) })
    this.acels.set('Edit', 'Drag North(Leap)', 'CmdOrCtrl+Alt+ArrowUp', () => { this.cursor.drag(0, this.grid.h) })
    this.acels.set('Edit', 'Drag East(Leap)', 'CmdOrCtrl+Alt+ArrowRight', () => { this.cursor.drag(this.grid.w, 0) })
    this.acels.set('Edit', 'Drag South(Leap)', 'CmdOrCtrl+Alt+ArrowDown', () => { this.cursor.drag(0, -this.grid.h) })
    this.acels.set('Edit', 'Drag West(Leap)', 'CmdOrCtrl+Alt+ArrowLeft', () => { this.cursor.drag(-this.grid.w, 0) })

    this.acels.set('Project', 'Find', 'CmdOrCtrl+J', () => { this.commander.start('find:') })
    this.acels.set('Project', 'Inject', 'CmdOrCtrl+B', () => { this.commander.start('inject:') })
    this.acels.set('Project', 'Toggle Commander', 'CmdOrCtrl+K', () => { this.commander.start() })
    this.acels.set('Project', 'Run Commander', 'Enter', () => { this.commander.run() })

    this.acels.set('Cursor', 'Toggle Insert Mode', 'CmdOrCtrl+I', () => { this.cursor.ins = !this.cursor.ins })
    this.acels.set('Cursor', 'Toggle Block Comment', 'CmdOrCtrl+/', () => { this.cursor.comment() })
    this.acels.set('Cursor', 'Trigger Operator', 'CmdOrCtrl+P', () => { this.cursor.trigger() })
    this.acels.set('Cursor', 'Reset', 'Escape', () => { this.toggleGuide(false); this.commander.stop(); this.clear(); this.clock.isPaused = false; this.cursor.reset() })

    this.acels.set('Move', 'Move North', 'ArrowUp', () => { this.cursor.move(0, 1) })
    this.acels.set('Move', 'Move East', 'ArrowRight', () => { this.cursor.move(1, 0) })
    this.acels.set('Move', 'Move South', 'ArrowDown', () => { this.cursor.move(0, -1) })
    this.acels.set('Move', 'Move West', 'ArrowLeft', () => { this.cursor.move(-1, 0) })
    this.acels.set('Move', 'Move North(Leap)', 'CmdOrCtrl+ArrowUp', () => { this.cursor.move(0, this.grid.h) })
    this.acels.set('Move', 'Move East(Leap)', 'CmdOrCtrl+ArrowRight', () => { this.cursor.move(this.grid.w, 0) })
    this.acels.set('Move', 'Move South(Leap)', 'CmdOrCtrl+ArrowDown', () => { this.cursor.move(0, -this.grid.h) })
    this.acels.set('Move', 'Move West(Leap)', 'CmdOrCtrl+ArrowLeft', () => { this.cursor.move(-this.grid.w, 0) })
    this.acels.set('Move', 'Scale North', 'Shift+ArrowUp', () => { this.cursor.scale(0, 1) })
    this.acels.set('Move', 'Scale East', 'Shift+ArrowRight', () => { this.cursor.scale(1, 0) })
    this.acels.set('Move', 'Scale South', 'Shift+ArrowDown', () => { this.cursor.scale(0, -1) })
    this.acels.set('Move', 'Scale West', 'Shift+ArrowLeft', () => { this.cursor.scale(-1, 0) })
    this.acels.set('Move', 'Scale North(Leap)', 'CmdOrCtrl+Shift+ArrowUp', () => { this.cursor.scale(0, this.grid.h) })
    this.acels.set('Move', 'Scale East(Leap)', 'CmdOrCtrl+Shift+ArrowRight', () => { this.cursor.scale(this.grid.w, 0) })
    this.acels.set('Move', 'Scale South(Leap)', 'CmdOrCtrl+Shift+ArrowDown', () => { this.cursor.scale(0, -this.grid.h) })
    this.acels.set('Move', 'Scale West(Leap)', 'CmdOrCtrl+Shift+ArrowLeft', () => { this.cursor.scale(-this.grid.w, 0) })

    this.acels.set('Clock', 'Play/Pause', 'Space', () => { if (this.cursor.ins) { this.cursor.move(1, 0) } else { this.clock.togglePlay(false) } })
    this.acels.set('Clock', 'Frame By Frame', 'CmdOrCtrl+F', () => { this.clock.touch() })
    this.acels.set('Clock', 'Reset Frame', 'CmdOrCtrl+Shift+R', () => { this.clock.setFrame(0) })
    this.acels.set('Clock', 'Incr. Speed', '>', () => { this.clock.modSpeed(1) })
    this.acels.set('Clock', 'Decr. Speed', '<', () => { this.clock.modSpeed(-1) })
    this.acels.set('Clock', 'Incr. Speed(10x)', 'CmdOrCtrl+>', () => { this.clock.modSpeed(10, true) })
    this.acels.set('Clock', 'Decr. Speed(10x)', 'CmdOrCtrl+<', () => { this.clock.modSpeed(-10, true) })

    this.acels.set('View', 'Toggle Retina', 'Tab', () => { this.toggleRetina() })
    this.acels.set('View', 'Toggle Guide', 'CmdOrCtrl+G', () => { this.toggleGuide() })
    this.acels.set('View', 'Incr. Col', ']', () => { this.modGrid(1, 0) })
    this.acels.set('View', 'Decr. Col', '[', () => { this.modGrid(-1, 0) })
    this.acels.set('View', 'Incr. Row', '}', () => { this.modGrid(0, 1) })
    this.acels.set('View', 'Decr. Row', '{', () => { this.modGrid(0, -1) })
    this.acels.set('View', 'Zoom In', 'CmdOrCtrl+=', () => { this.modZoom(0.0625) })
    this.acels.set('View', 'Zoom Out', 'CmdOrCtrl+-', () => { this.modZoom(-0.0625) })
    this.acels.set('View', 'Zoom Reset', 'CmdOrCtrl+0', () => { this.modZoom(1, true) })

    this.acels.set('Midi', 'Play/Pause Midi', 'CmdOrCtrl+Space', () => { this.clock.togglePlay(true) })
    this.acels.set('Midi', 'Next Input Device', 'CmdOrCtrl+,', () => { this.clock.setFrame(0); this.io.midi.selectNextInput() })
    this.acels.set('Midi', 'Next Output Device', 'CmdOrCtrl+.', () => { this.clock.setFrame(0); this.io.midi.selectNextOutput() })
    this.acels.set('Midi', 'Refresh Devices', 'CmdOrCtrl+Shift+M', () => { this.io.midi.refresh() })

    this.acels.set('Communication', 'Choose OSC Port', 'alt+O', () => { this.commander.start('osc:') })
    this.acels.set('Communication', 'Choose UDP Port', 'alt+U', () => { this.commander.start('udp:') })

    this.acels.install(window)
    this.acels.pipe(this.commander)
  }

  this.start = () => {
    console.info('Client', 'Starting..')
    console.info(`${this.acels}`)
    this.theme.start()
    this.io.start()
    this.history.bind(this.orca, 's')
    this.history.record(this.orca.s)
    this.clock.start()
    this.cursor.start()

    this.reset()
    this.modZoom()
    this.update()
    this.el.className = 'ready'

    this.toggleGuide()
  }

  this.reset = () => {
    this.orca.reset()
    this.resize()
    this.source.new()
    this.history.reset()
    this.cursor.reset()
    this.clock.play()
  }

  this.run = () => {
    this.io.clear()
    this.clock.run()
    this.orca.run()
    this.io.run()
    this.update()
  }

  this.update = () => {
    if (document.hidden === true) { return }
    this.clear()
    this.ports = this.findPorts()
    this.drawProgram()
    this.drawInterface()
    this.drawGuide()
  }

  this.whenOpen = (file, text) => {
    const lines = text.trim().split(/\r?\n/)
    const w = lines[0].length
    const h = lines.length
    const s = lines.join('\n').trim()

    this.orca.load(w, h, s)
    this.history.reset()
    this.history.record(this.orca.s)
    this.resize()
  }

  this.setGrid = (w, h) => {
    this.grid.w = w
    this.grid.h = h
    this.update()
  }

  this.toggleRetina = () => {
    this.scale = this.scale === 1 ? window.devicePixelRatio : 1
    console.log('Client', `Pixel resolution: ${this.scale}`)
    this.resize(true)
  }

  this.toggleGuide = (force = null) => {
    const display = force !== null ? force : this.guide !== true
    if (display === this.guide) { return }
    console.log('Client', `Toggle Guide: ${display}`)
    this.guide = display
    this.update()
  }

  this.modGrid = (x = 0, y = 0) => {
    const w = clamp(this.grid.w + x, 4, 16)
    const h = clamp(this.grid.h + y, 4, 16)
    this.setGrid(w, h)
  }

  this.modZoom = (mod = 0, reset = false) => {
    this.tile = {
      w: reset ? 10 : this.tile.w * (mod + 1),
      h: reset ? 15 : this.tile.h * (mod + 1),
      ws: Math.floor(this.tile.w * this.scale),
      hs: Math.floor(this.tile.h * this.scale)
    }
    localStorage.setItem('tilew', this.tile.w)
    localStorage.setItem('tileh', this.tile.h)
    this.resize(true)
  }

  //

  this.isCursor = (x, y) => {
    return x === this.cursor.x && y === this.cursor.y
  }

  this.isMarker = (x, y) => {
    return x % this.grid.w === 0 && y % this.grid.h === 0
  }

  this.isNear = (x, y) => {
    return x > (parseInt(this.cursor.x / this.grid.w) * this.grid.w) - 1 && x <= ((1 + parseInt(this.cursor.x / this.grid.w)) * this.grid.w) && y > (parseInt(this.cursor.y / this.grid.h) * this.grid.h) - 1 && y <= ((1 + parseInt(this.cursor.y / this.grid.h)) * this.grid.h)
  }

  this.isLocals = (x, y) => {
    return this.isNear(x, y) === true && (x % (this.grid.w / 4) === 0 && y % (this.grid.h / 4) === 0) === true
  }

  this.isInvisible = (x, y) => {
    return this.orca.glyphAt(x, y) === '.' && !this.isMarker(x, y) && !this.cursor.selected(x, y) && !this.isLocals(x, y) && !this.ports[this.orca.indexAt(x, y)] && !this.orca.lockAt(x, y)
  }

  this.findPorts = () => {
    const a = new Array((this.orca.w * this.orca.h) - 1)
    for (const operator of this.orca.runtime) {
      if (this.orca.lockAt(operator.x, operator.y)) { continue }
      const ports = operator.getPorts()
      for (const port of ports) {
        const index = this.orca.indexAt(port[0], port[1])
        a[index] = port
      }
    }
    return a
  }

  // Interface

  this.makeTheme = (type) => {
    // Operator
    if (type === 0) { return { bg: this.theme.active.b_med, fg: this.theme.active.f_low } }
    // Haste
    if (type === 1) { return { fg: this.theme.active.b_med } }
    // Input
    if (type === 2) { return { fg: this.theme.active.b_high } }
    // Output
    if (type === 3) { return { bg: this.theme.active.b_high, fg: this.theme.active.f_low } }
    // Selected
    if (type === 4) { return { bg: this.theme.active.b_inv, fg: this.theme.active.f_inv } }
    // Locked
    if (type === 5) { return { fg: this.theme.active.f_med } }
    // Reader
    if (type === 6) { return { fg: this.theme.active.b_inv } }
    // Invisible
    if (type === 7) { return {} }
    // Output Bang
    if (type === 8) { return { bg: this.theme.active.b_low, fg: this.theme.active.f_high } }
    // Output Reader
    if (type === 9) { return { bg: this.theme.active.b_inv, fg: this.theme.active.background } }
    // Reader+Background
    if (type === 10) { return { bg: this.theme.active.background, fg: this.theme.active.f_high } }
    // Clock(yellow fg)
    if (type === 11) { return { fg: this.theme.active.b_inv } }
    // Default
    return { fg: this.theme.active.f_low }
  }

  // Canvas

  this.clear = () => {
    this.context.clearRect(0, 0, this.el.width, this.el.height)
  }

  this.drawProgram = () => {
    const selection = this.cursor.read()
    for (let y = 0; y < this.orca.h; y++) {
      for (let x = 0; x < this.orca.w; x++) {
        // Handle blanks
        if (this.isInvisible(x, y)) { continue }
        // Make Glyph
        const g = this.orca.glyphAt(x, y)
        // Get glyph
        const glyph = g !== '.' ? g : this.isCursor(x, y) ? (this.clock.isPaused ? '~' : '@') : this.isMarker(x, y) ? '+' : g
        // Make Style
        this.drawSprite(x, y, glyph, this.makeStyle(x, y, glyph, selection))
      }
    }
  }

  this.makeStyle = (x, y, glyph, selection) => {
    if (this.cursor.selected(x, y)) { return 4 }
    const isLocked = this.orca.lockAt(x, y)
    if (selection === glyph && isLocked === false && selection !== '.') { return 6 }
    if (glyph === '*' && isLocked === false) { return 2 }
    const port = this.ports[this.orca.indexAt(x, y)]
    if (port) { return port[2] }
    if (isLocked === true) { return 5 }
    return 20
  }

  this.drawInterface = () => {
    this.write(`${this.cursor.inspect()}`, this.grid.w * 0, this.orca.h, this.grid.w - 1)
    this.write(`${this.cursor.x},${this.cursor.y}${this.cursor.ins ? '+' : ''}`, this.grid.w * 1, this.orca.h, this.grid.w, this.cursor.ins ? 1 : 2)
    this.write(`${this.cursor.w}:${this.cursor.h}`, this.grid.w * 2, this.orca.h, this.grid.w)
    this.write(`${this.orca.f}f${this.clock.isPaused ? '~' : ''}`, this.grid.w * 3, this.orca.h, this.grid.w)
    this.write(`${this.io.inspect(this.grid.w)}`, this.grid.w * 4, this.orca.h, this.grid.w - 1)
    this.write(this.orca.f < 250 ? `< ${this.io.midi.toInputString()}` : '', this.grid.w * 5, this.orca.h, this.grid.w * 4)

    if (this.commander.isActive === true) {
      this.write(`${this.commander.query}${this.orca.f % 2 === 0 ? '_' : ''}`, this.grid.w * 0, this.orca.h + 1, this.grid.w * 4)
    } else {
      this.write(this.orca.f < 25 ? `ver${this.version}` : `${Object.keys(this.source.cache).length} mods`, this.grid.w * 0, this.orca.h + 1, this.grid.w)
      this.write(`${this.orca.w}x${this.orca.h}`, this.grid.w * 1, this.orca.h + 1, this.grid.w)
      this.write(`${this.grid.w}/${this.grid.h}${this.tile.w !== 10 ? ' ' + (this.tile.w / 10).toFixed(1) : ''}`, this.grid.w * 2, this.orca.h + 1, this.grid.w)
      this.write(`${this.clock}`, this.grid.w * 3, this.orca.h + 1, this.grid.w, this.clock.isPuppet ? 3 : this.io.midi.isClock ? 11 : this.clock.isPaused ? 20 : 2)
      this.write(`${display(Object.keys(this.orca.variables).join(''), this.orca.f, this.grid.w - 1)}`, this.grid.w * 4, this.orca.h + 1, this.grid.w - 1)
      this.write(this.orca.f < 250 ? `> ${this.io.midi.toOutputString()}` : '', this.grid.w * 5, this.orca.h + 1, this.grid.w * 4)
    }
  }

  this.drawGuide = () => {
    if (this.guide !== true) { return }
    const operators = Object.keys(this.library).filter((val) => { return isNaN(val) })
    for (const id in operators) {
      const key = operators[id]
      const oper = new this.library[key]()
      const text = oper.info
      const frame = this.orca.h - 4
      const x = (Math.floor(parseInt(id) / frame) * 32) + 2
      const y = (parseInt(id) % frame) + 2
      this.write(key, x, y, 99, 3)
      this.write(text, x + 2, y, 99, 10)
    }
  }

  this.drawSprite = (x, y, g, type) => {
    const theme = this.makeTheme(type)
    if (theme.bg) {
      this.context.fillStyle = theme.bg
      this.context.fillRect(x * this.tile.ws, (y) * this.tile.hs, this.tile.ws, this.tile.hs)
    }
    if (theme.fg) {
      this.context.fillStyle = theme.fg
      this.context.fillText(g, (x + 0.5) * this.tile.ws, (y + 1) * this.tile.hs)
    }
  }

  this.write = (text, offsetX, offsetY, limit = 50, type = 2) => {
    for (let x = 0; x < text.length && x < limit; x++) {
      this.drawSprite(offsetX + x, offsetY, text.substr(x, 1), type)
    }
  }

  // Resize tools

  this.resize = () => {
    const pad = 30
    const size = { w: window.innerWidth - (pad * 2), h: window.innerHeight - ((pad * 2) + this.tile.h * 2) }
    const tiles = { w: Math.ceil(size.w / this.tile.w), h: Math.ceil(size.h / this.tile.h) }
    const bounds = this.orca.bounds()

    // Clamp at limits of orca file
    if (tiles.w < bounds.w + 1) { tiles.w = bounds.w + 1 }
    if (tiles.h < bounds.h + 1) { tiles.h = bounds.h + 1 }

    this.crop(tiles.w, tiles.h)

    // Keep cursor in bounds
    if (this.cursor.x >= tiles.w) { this.cursor.moveTo(tiles.w - 1, this.cursor.y) }
    if (this.cursor.y >= tiles.h) { this.cursor.moveTo(this.cursor.x, tiles.h - 1) }

    const w = this.tile.ws * this.orca.w
    const h = (this.tile.hs + (this.tile.hs / 5)) * this.orca.h

    if (w === this.el.width && h === this.el.height) { return }

    console.log(`Resized to: ${this.orca.w}x${this.orca.h}`)

    this.el.width = w
    this.el.height = h
    this.el.style.width = `${Math.ceil(this.tile.w * this.orca.w)}px`
    this.el.style.height = `${Math.ceil((this.tile.h + (this.tile.h / 5)) * this.orca.h)}px`

    this.context.textBaseline = 'bottom'
    this.context.textAlign = 'center'
    this.context.font = `${this.tile.hs * 0.75}px input_mono_medium`
    this.update()
  }

  this.crop = (w, h) => {
    let block = `${this.orca}`

    if (h > this.orca.h) {
      block = `${block}${`\n${'.'.repeat(this.orca.w)}`.repeat((h - this.orca.h))}`
    } else if (h < this.orca.h) {
      block = `${block}`.split(/\r?\n/).slice(0, (h - this.orca.h)).join('\n').trim()
    }

    if (w > this.orca.w) {
      block = `${block}`.split(/\r?\n/).map((val) => { return val + ('.').repeat((w - this.orca.w)) }).join('\n').trim()
    } else if (w < this.orca.w) {
      block = `${block}`.split(/\r?\n/).map((val) => { return val.substr(0, val.length + (w - this.orca.w)) }).join('\n').trim()
    }

    this.history.reset()
    this.orca.load(w, h, block, this.orca.f)
  }

  // Docs

  this.docs = () => {
    let html = ''
    const operators = Object.keys(_core_library_js__WEBPACK_IMPORTED_MODULE_0__.default).filter((val) => { return isNaN(val) })
    for (const id in operators) {
      const oper = new this.library[operators[id]]()
      const ports = oper.ports.input ? Object.keys(oper.ports.input).reduce((acc, key, val) => { return acc + ' ' + key }, '') : ''
      html += `- \`${oper.glyph.toUpperCase()}\` **${oper.name}**${ports !== '' ? '(' + ports.trim() + ')' : ''}: ${oper.info}.\n`
    }
    return html
  }

  // Events

  window.addEventListener('dragover', (e) => {
    e.stopPropagation()
    e.preventDefault()
    e.dataTransfer.dropEffect = 'copy'
  })

  window.addEventListener('drop', (e) => {
    e.preventDefault()
    e.stopPropagation()
    for (const file of e.dataTransfer.files) {
      if (file.name.indexOf('.orca') < 0) { continue }
      this.toggleGuide(false)
      this.source.read(file, null, true)
      this.commander.start('inject:' + file.name.replace('.orca', ''))
    }
  })

  window.onresize = (e) => {
    this.resize()
  }

  // Helpers

  function display (str, f, max) { return str.length < max ? str : str.slice(f % str.length) + str.substr(0, f % str.length) }
  function clamp (v, min, max) { return v < min ? min : v > max ? max : v }
}

/*** EXPORTS FROM exports-loader ***/
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Client);


/***/ }),

/***/ "./orca/desktop/sources/scripts/clock.js":
/*!***********************************************!*\
  !*** ./orca/desktop/sources/scripts/clock.js ***!
  \***********************************************/
/*! namespace exports */
/*! export default [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_exports__, __webpack_require__.r, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => __WEBPACK_DEFAULT_EXPORT__
/* harmony export */ });


/* global Blob */

function Clock (client) {
  const workerScript = 'onmessage = (e) => { setInterval(() => { postMessage(true) }, e.data)}'
  const worker = window.URL.createObjectURL(new Blob([workerScript], { type: 'text/javascript' }))

  this.isPaused = true
  this.timer = null
  this.isPuppet = false

  this.speed = { value: 120, target: 120 }

  this.start = function () {
    const memory = parseInt(window.localStorage.getItem('bpm'))
    const target = memory >= 60 ? memory : 120
    this.setSpeed(target, target, true)
    this.play()
  }

  this.touch = function () {
    this.stop()
    client.run()
  }

  this.run = function () {
    if (this.speed.target === this.speed.value) { return }
    this.setSpeed(this.speed.value + (this.speed.value < this.speed.target ? 1 : -1), null, true)
  }

  this.setSpeed = (value, target = null, setTimer = false) => {
    if (this.speed.value === value && this.speed.target === target && this.timer) { return }
    if (value) { this.speed.value = clamp(value, 60, 300) }
    if (target) { this.speed.target = clamp(target, 60, 300) }
    if (setTimer === true) { this.setTimer(this.speed.value) }
  }

  this.modSpeed = function (mod = 0, animate = false) {
    if (animate === true) {
      this.setSpeed(null, this.speed.target + mod)
    } else {
      this.setSpeed(this.speed.value + mod, this.speed.value + mod, true)
      client.update()
    }
  }

  // Controls

  this.togglePlay = function (msg = false) {
    if (this.isPaused === true) {
      this.play(msg)
    } else {
      this.stop(msg)
    }
    client.update()
  }

  this.play = function (msg = false, midiStart = false) {
    console.log('Clock', 'Play', msg, midiStart)
    if (this.isPaused === false && !midiStart) { return }
    this.isPaused = false
    if (this.isPuppet === true) {
      console.warn('Clock', 'External Midi control')
      if (!pulse.frame || midiStart) {  // no frames counted while paused (starting from no clock, unlikely) or triggered by MIDI clock START
        this.setFrame(0)  // make sure frame aligns with pulse count for an accurate beat
        pulse.frame = 0
        pulse.count = 5   // by MIDI standard next pulse is the beat
      }
    } else {
      if (msg === true) { client.io.midi.sendClockStart() }
      this.setSpeed(this.speed.target, this.speed.target, true)
    }
  }

  this.stop = function (msg = false) {
    console.log('Clock', 'Stop')
    if (this.isPaused === true) { return }
    this.isPaused = true
    if (this.isPuppet === true) {
      console.warn('Clock', 'External Midi control')
    } else {
      if (msg === true || client.io.midi.isClock) { client.io.midi.sendClockStop() }
      this.clearTimer()
    }
    client.io.midi.allNotesOff()
    client.io.midi.silence()
  }

  // External Clock

  const pulse = {
    count: 0,
    last: null,
    timer: null,
    frame: 0  // paused frame counter
  }

  this.tap = function () {
    pulse.count = (pulse.count + 1) % 6
    pulse.last = performance.now()
    if (!this.isPuppet) {
      console.log('Clock', 'Puppeteering starts..')
      this.isPuppet = true
      this.clearTimer()
      pulse.timer = setInterval(() => {
        if (performance.now() - pulse.last < 2000) { return }
        this.untap()
      }, 2000)
    }
    if (pulse.count == 0) {
      if (this.isPaused) { pulse.frame++ }
      else {
        if (pulse.frame > 0) {
          this.setFrame(client.orca.f + pulse.frame)
          pulse.frame = 0
        }
        client.run()
      }
    }
  }

  this.untap = function () {
    console.log('Clock', 'Puppeteering stops..')
    clearInterval(pulse.timer)
    this.isPuppet = false
    pulse.frame = 0
    pulse.last = null
    if (!this.isPaused) {
      this.setTimer(this.speed.value)
    }
  }

  // Timer

  this.setTimer = function (bpm) {
    if (bpm < 60) { console.warn('Clock', 'Error ' + bpm); return }
    this.clearTimer()
    window.localStorage.setItem('bpm', bpm)
    this.timer = new Worker(worker)
    this.timer.postMessage((60000 / parseInt(bpm)) / 4)
    this.timer.onmessage = (event) => {
      client.io.midi.sendClock()
      client.run()
    }
  }

  this.clearTimer = function () {
    if (this.timer) {
      this.timer.terminate()
    }
    this.timer = null
  }

  this.setFrame = function (f) {
    if (isNaN(f)) { return }
    client.orca.f = clamp(f, 0, 9999999)
  }

  // UI

  this.toString = function () {
    const diff = this.speed.target - this.speed.value
    const _offset = Math.abs(diff) > 5 ? (diff > 0 ? `+${diff}` : diff) : ''
    const _message = this.isPuppet === true ? 'midi' : `${this.speed.value}${_offset}`
    const _beat = diff === 0 && client.orca.f % 4 === 0 ? '*' : ''
    return `${_message}${_beat}`
  }

  function clamp (v, min, max) { return v < min ? min : v > max ? max : v }
}

/*** EXPORTS FROM exports-loader ***/
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Clock);


/***/ }),

/***/ "./orca/desktop/sources/scripts/commander.js":
/*!***************************************************!*\
  !*** ./orca/desktop/sources/scripts/commander.js ***!
  \***************************************************/
/*! namespace exports */
/*! export default [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_exports__, __webpack_require__.r, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => __WEBPACK_DEFAULT_EXPORT__
/* harmony export */ });


function Commander (client) {
  this.isActive = false
  this.query = ''
  this.history = []
  this.historyIndex = 0

  // Library

  this.passives = {
    find: (p) => { client.cursor.find(p.str) },
    select: (p) => { client.cursor.select(p.x, p.y, p.w || 0, p.h || 0) },
    inject: (p) => {
      client.cursor.select(p._x, p._y)
      if (client.source.cache[p._str + '.orca']) {
        const block = client.source.cache[p._str + '.orca']
        const rect = client.orca.toRect(block)
        client.cursor.scaleTo(rect.x, rect.y)
      }
    }
  }

  this.actives = {
    // Ports
    osc: (p) => { client.io.osc.select(p.int) },
    udp: (p) => {
      client.io.udp.selectOutput(p.x)
      if (p.y !== null) { client.io.udp.selectInput(p.y) }
    },
    midi: (p) => {
      client.io.midi.selectOutput(p.x)
      if (p.y !== null) { client.io.midi.selectInput(p.y) }
    },
    ip: (p) => { client.io.setIp(p.str) },
    cc: (p) => { client.io.cc.setOffset(p.int) },
    pg: (p) => { client.io.cc.stack.push({ channel: clamp(p.ints[0], 0, 15), bank: p.ints[1], sub: p.ints[2], pgm: clamp(p.ints[3], 0, 127), type: 'pg' }); client.io.cc.run() },
    // Cursor
    copy: (p) => { client.cursor.copy() },
    paste: (p) => { client.cursor.paste(true) },
    erase: (p) => { client.cursor.erase() },
    // Controls
    play: (p) => { client.clock.play() },
    stop: (p) => { client.clock.stop() },
    run: (p) => { client.run() },
    // Time
    apm: (p) => { client.clock.setSpeed(null, p.int) },
    bpm: (p) => { client.clock.setSpeed(p.int, p.int, true) },
    frame: (p) => { client.clock.setFrame(p.int) },
    rewind: (p) => { client.clock.setFrame(client.orca.f - p.int) },
    skip: (p) => { client.clock.setFrame(client.orca.f + p.int) },
    time: (p, origin) => {
      const formatted = new Date(250 * (client.orca.f * (60 / client.clock.speed.value))).toISOString().substr(14, 5).replace(/:/g, '')
      client.orca.writeBlock(origin ? origin.x : client.cursor.x, origin ? origin.y : client.cursor.y, `${formatted}`)
    },
    // Themeing
    color: (p) => {
      if (p.parts[0]) { client.theme.set('b_low', p.parts[0]) }
      if (p.parts[1]) { client.theme.set('b_med', p.parts[1]) }
      if (p.parts[2]) { client.theme.set('b_high', p.parts[2]) }
    },
    // Edit
    find: (p) => { client.cursor.find(p.str) },
    select: (p) => { client.cursor.select(p.x, p.y, p.w || 0, p.h || 0) },
    inject: (p, origin) => {
      const block = client.source.cache[p._str + '.orca']
      if (!block) { console.warn('Commander', 'Unknown block: ' + p._str); return }
      client.orca.writeBlock(origin ? origin.x : client.cursor.x, origin ? origin.y : client.cursor.y, block)
      client.cursor.scaleTo(0, 0)
    },
    write: (p) => {
      client.orca.writeBlock(p._x || client.cursor.x, p._y || client.cursor.y, p._str)
    }
  }

  // Make shorthands
  for (const id in this.actives) {
    this.actives[id.substr(0, 2)] = this.actives[id]
  }

  function Param (val) {
    this.str = `${val}`
    this.length = this.str.length
    this.chars = this.str.split('')
    this.int = !isNaN(val) ? parseInt(val) : null
    this.parts = val.split(';')
    this.ints = this.parts.map((val) => { return parseInt(val) })
    this.x = parseInt(this.parts[0])
    this.y = parseInt(this.parts[1])
    this.w = parseInt(this.parts[2])
    this.h = parseInt(this.parts[3])
    // Optionals Position Style
    this._str = this.parts[0]
    this._x = parseInt(this.parts[1])
    this._y = parseInt(this.parts[2])
  }

  // Begin

  this.start = (q = '') => {
    this.isActive = true
    this.query = q
    client.cursor.ins = false
    client.update()
  }

  this.stop = () => {
    this.isActive = false
    this.query = ''
    this.historyIndex = this.history.length
    client.update()
  }

  this.erase = function () {
    this.query = this.query.slice(0, -1)
    this.preview()
  }

  this.write = (key) => {
    if (key === 'Backspace') { this.erase(); return }
    if (key === 'Enter') { this.run(); return }
    if (key === 'Escape') { this.stop(); return }
    if (key.length > 1) { return }
    this.query += key
    this.preview()
  }

  this.run = function () {
    const tool = this.isActive === true ? 'commander' : 'cursor'
    client[tool].trigger()
    client.update()
  }

  this.trigger = function (msg = this.query, origin = null, stopping = true) {
    const cmd = `${msg}`.split(':')[0].trim().replace(/\W/g, '').toLowerCase()
    const val = `${msg}`.substr(cmd.length + 1)
    const fn = this.actives[cmd]
    if (!fn) { console.warn('Commander', `Unknown message: ${msg}`); this.stop(); return }
    fn(new Param(val), origin)
    this.history.push(msg)
    this.historyIndex = this.history.length
    if (stopping) {
      this.stop()
    }
  }

  this.preview = function (msg = this.query) {
    const cmd = `${msg}`.split(':')[0].toLowerCase()
    const val = `${msg}`.substr(cmd.length + 1)
    if (!this.passives[cmd]) { return }
    this.passives[cmd](new Param(val), false)
  }

  // Events

  this.onKeyDown = (e) => {
    if (e.ctrlKey || e.metaKey) { return }
    client[this.isActive === true ? 'commander' : 'cursor'].write(e.key)
    e.stopPropagation()
  }

  this.onKeyUp = (e) => {
    client.update()
  }

  // UI

  this.toString = function () {
    return `${this.query}`
  }

  // Utils

  function clamp (v, min, max) { return v < min ? min : v > max ? max : v }
}

/*** EXPORTS FROM exports-loader ***/
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Commander);


/***/ }),

/***/ "./orca/desktop/sources/scripts/cursor.js":
/*!************************************************!*\
  !*** ./orca/desktop/sources/scripts/cursor.js ***!
  \************************************************/
/*! namespace exports */
/*! export default [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_exports__, __webpack_require__.r, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => __WEBPACK_DEFAULT_EXPORT__
/* harmony export */ });


function Cursor (client) {
  this.x = 0
  this.y = 0
  this.w = 0
  this.h = 0

  this.minX = 0
  this.maxX = 0
  this.minY = 0
  this.maxY = 0

  this.ins = false

  this.start = () => {
    document.onmousedown = this.onMouseDown
    document.onmouseup = this.onMouseUp
    document.onmousemove = this.onMouseMove
    document.oncopy = this.onCopy
    document.oncut = this.onCut
    document.onpaste = this.onPaste
    document.oncontextmenu = this.onContextMenu
  }

  this.select = (x = this.x, y = this.y, w = this.w, h = this.h) => {
    if (isNaN(x) || isNaN(y) || isNaN(w) || isNaN(h)) { return }
    const rect = { x: clamp(parseInt(x), 0, client.orca.w - 1), y: clamp(parseInt(y), 0, client.orca.h - 1), w: clamp(parseInt(w), -this.x, client.orca.w - 1), h: clamp(parseInt(h), -this.y, client.orca.h - 1) }

    if (this.x === rect.x && this.y === rect.y && this.w === rect.w && this.h === rect.h) {
      return // Don't update when unchanged
    }

    this.x = rect.x
    this.y = rect.y
    this.w = rect.w
    this.h = rect.h
    this.calculateBounds()
    client.toggleGuide(false)
    client.update()
  }

  this.selectAll = () => {
    this.select(0, 0, client.orca.w, client.orca.h)
    this.ins = false
  }

  this.move = (x, y) => {
    this.select(this.x + parseInt(x), this.y - parseInt(y))
  }

  this.moveTo = (x, y) => {
    this.select(x, y)
  }

  this.scale = (w, h) => {
    this.select(this.x, this.y, this.w + parseInt(w), this.h - parseInt(h))
  }

  this.scaleTo = (w, h) => {
    this.select(this.x, this.y, w, h)
  }

  this.drag = (x, y) => {
    if (isNaN(x) || isNaN(y)) { return }
    this.ins = false
    const block = this.selection()
    this.erase()
    this.move(x, y)
    client.orca.writeBlock(this.minX, this.minY, block)
    client.history.record(client.orca.s)
  }

  this.reset = (pos = false) => {
    this.select(pos ? 0 : this.x, pos ? 0 : this.y, 0, 0)
    this.ins = 0
  }

  this.read = () => {
    return client.orca.glyphAt(this.x, this.y)
  }

  this.write = (g) => {
    if (!client.orca.isAllowed(g)) { return }
    if (client.orca.write(this.x, this.y, g) && this.ins) {
      this.move(1, 0)
    }
    client.history.record(client.orca.s)
  }

  this.erase = () => {
    for (let y = this.minY; y <= this.maxY; y++) {
      for (let x = this.minX; x <= this.maxX; x++) {
        client.orca.write(x, y, '.')
      }
    }
    client.history.record(client.orca.s)
  }

  this.find = (str) => {
    const i = client.orca.s.indexOf(str)
    if (i < 0) { return }
    const pos = client.orca.posAt(i)
    this.select(pos.x, pos.y, str.length - 1, 0)
  }

  this.inspect = () => {
    if (this.w !== 0 || this.h !== 0) { return 'multi' }
    const index = client.orca.indexAt(this.x, this.y)
    const port = client.ports[index]
    if (port) { return `${port[3]}` }
    if (client.orca.lockAt(this.x, this.y)) { return 'locked' }
    return 'empty'
  }

  this.trigger = () => {
    const operator = client.orca.operatorAt(this.x, this.y)
    if (!operator) { console.warn('Cursor', 'Nothing to trigger.'); return }
    console.log('Cursor', 'Trigger: ' + operator.name)
    operator.run(true)
  }

  this.comment = () => {
    const block = this.selection()
    const lines = block.trim().split(/\r?\n/)
    const char = block.substr(0, 1) === '#' ? '.' : '#'
    const res = lines.map((line) => { return `${char}${line.substr(1, line.length - 2)}${char}` }).join('\n')
    client.orca.writeBlock(this.minX, this.minY, res)
    client.history.record(client.orca.s)
  }

  this.toUpperCase = () => {
    const block = this.selection().toUpperCase()
    client.orca.writeBlock(this.minX, this.minY, block)
  }

  this.toLowerCase = () => {
    const block = this.selection().toLowerCase()
    client.orca.writeBlock(this.minX, this.minY, block)
  }

  this.toRect = () => {
    return {
      x: this.minX,
      y: this.minY,
      w: this.maxX - this.minX + 1,
      h: this.maxY - this.minY + 1
    }
  }

  this.calculateBounds = () => {
    this.minX = this.x < this.x + this.w ? this.x : this.x + this.w
    this.minY = this.y < this.y + this.h ? this.y : this.y + this.h
    this.maxX = this.x > this.x + this.w ? this.x : this.x + this.w
    this.maxY = this.y > this.y + this.h ? this.y : this.y + this.h
  }

  this.selected = (x, y, w = 0, h = 0) => {
    return x >= this.minX && x <= this.maxX && y >= this.minY && y <= this.maxY
  }

  this.selection = (rect = this.toRect()) => {
    return client.orca.getBlock(rect.x, rect.y, rect.w, rect.h)
  }

  this.mouseFrom = null

  this.onMouseDown = (e) => {
    if (e.button !== 0) { this.cut(); return }
    const pos = this.mousePick(e.clientX, e.clientY)
    this.select(pos.x, pos.y, 0, 0)
    this.mouseFrom = pos
  }

  this.onMouseMove = (e) => {
    if (!this.mouseFrom) { return }
    const pos = this.mousePick(e.clientX, e.clientY)
    this.select(this.mouseFrom.x, this.mouseFrom.y, pos.x - this.mouseFrom.x, pos.y - this.mouseFrom.y)
  }

  this.onMouseUp = (e) => {
    if (this.mouseFrom) {
      const pos = this.mousePick(e.clientX, e.clientY)
      this.select(this.mouseFrom.x, this.mouseFrom.y, pos.x - this.mouseFrom.x, pos.y - this.mouseFrom.y)
    }
    this.mouseFrom = null
  }

  this.mousePick = (x, y, w = client.tile.w, h = client.tile.h) => {
    return { x: parseInt((x - 30) / w), y: parseInt((y - 30) / h) }
  }

  this.onContextMenu = (e) => {
    e.preventDefault()
  }

  this.copy = function () {
    document.execCommand('copy')
  }

  this.cut = function () {
    document.execCommand('cut')
  }

  this.paste = function (overlap = false) {
    document.execCommand('paste')
  }

  this.onCopy = (e) => {
    e.clipboardData.setData('text/plain', this.selection())
    e.preventDefault()
  }

  this.onCut = (e) => {
    this.onCopy(e)
    this.erase()
  }

  this.onPaste = (e) => {
    const data = e.clipboardData.getData('text/plain').trim()
    client.orca.writeBlock(this.minX, this.minY, data, this.ins)
    client.history.record(client.orca.s)
    this.scaleTo(data.split(/\r?\n/)[0].length - 1, data.split(/\r?\n/).length - 1)
    e.preventDefault()
  }

  function clamp (v, min, max) { return v < min ? min : v > max ? max : v }
}

/*** EXPORTS FROM exports-loader ***/
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Cursor);


/***/ }),

/***/ "./orca/desktop/sources/scripts/core/io/midi.js":
/*!******************************************************!*\
  !*** ./orca/desktop/sources/scripts/core/io/midi.js ***!
  \******************************************************/
/*! namespace exports */
/*! export default [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__, __webpack_exports__, __webpack_require__.r, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => __WEBPACK_DEFAULT_EXPORT__
/* harmony export */ });
/* harmony import */ var _transpose_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../transpose.js */ "./orca/desktop/sources/scripts/core/transpose.js");
/*** IMPORTS FROM imports-loader ***/



'use strict'

/* global transposeTable */

function Midi (client) {
  this.mode = 0
  this.isClock = false

  this.outputIndex = -1
  this.inputIndex = -1

  this.outputs = []
  this.inputs = []
  this.stack = []

  this.start = function () {
    console.info('Midi Starting..')
    this.refresh()
  }

  this.clear = function () {
    this.stack = this.stack.filter((item) => { return item })
  }

  this.run = function () {
    for (const id in this.stack) {
      const item = this.stack[id]
      if (item.isPlayed === false) {
        this.press(item)
      }
      if (item.length < 1) {
        this.release(item, id)
      } else {
        item.length--
      }
    }
  }

  this.trigger = function (item, down) {
    if (!this.outputDevice()) { console.warn('MIDI', 'No midi output!'); return }

    const transposed = this.transpose(item.note, item.octave)
    const channel = !isNaN(item.channel) ? parseInt(item.channel) : client.orca.valueOf(item.channel)

    if (!transposed) { return }

    const c = down === true ? 0x90 + channel : 0x80 + channel
    const n = transposed.id
    const v = parseInt((item.velocity / 16) * 127)

    if (!n || c === 127) { return }

    this.outputDevice().send([c, n, v])
  }

  this.press = function (item) {
    if (!item) { return }
    this.trigger(item, true)
    item.isPlayed = true
  }

  this.release = function (item, id) {
    if (!item) { return }
    this.trigger(item, false)
    delete this.stack[id]
  }

  this.silence = function () {
    for (const item of this.stack) {
      this.release(item)
    }
  }

  this.push = function (channel, octave, note, velocity, length, isPlayed = false) {
    const item = { channel, octave, note, velocity, length, isPlayed }
    // Retrigger duplicates
    for (const id in this.stack) {
      const dup = this.stack[id]
      if (dup.channel === channel && dup.octave === octave && dup.note === note) { this.release(item, id) }
    }
    this.stack.push(item)
  }

  this.allNotesOff = function () {
    if (!this.outputDevice()) { return }
    console.log('MIDI', 'All Notes Off')
    for (let chan = 0; chan < 16; chan++) {
      this.outputDevice().send([0xB0 + chan, 123, 0])
    }
  }

  // Clock

  this.ticks = []

  this.sendClockStart = function () {
    if (!this.outputDevice()) { return }
    this.isClock = true
    this.outputDevice().send([0xFA], 0)
    console.log('MIDI', 'MIDI Start Sent')
  }

  this.sendClockStop = function () {
    if (!this.outputDevice()) { return }
    this.isClock = false
    this.outputDevice().send([0xFC], 0)
    console.log('MIDI', 'MIDI Stop Sent')
  }

  this.sendClock = function () {
    if (!this.outputDevice()) { return }
    if (this.isClock !== true) { return }

    const bpm = client.clock.speed.value
    const frameTime = (60000 / bpm) / 4
    const frameFrag = frameTime / 6

    for (let id = 0; id < 6; id++) {
      if (this.ticks[id]) { clearTimeout(this.ticks[id]) }
      this.ticks[id] = setTimeout(() => { this.outputDevice().send([0xF8], 0) }, parseInt(id) * frameFrag)
    }
  }

  this.receive = function (msg) {
    switch (msg.data[0]) {
      // Clock
      case 0xF8:
        client.clock.tap()
        break
      case 0xFA:
        console.log('MIDI', 'Start Received')
        client.clock.play(false, true)
        break
      case 0xFB:
        console.log('MIDI', 'Continue Received')
        client.clock.play()
        break
      case 0xFC:
        console.log('MIDI', 'Stop Received')
        client.clock.stop()
        break
    }
  }

  // Tools

  this.selectOutput = function (id) {
    if (id === -1) { this.outputIndex = -1; console.log('MIDI', 'Select Output Device: None'); return }
    if (!this.outputs[id]) { console.warn('MIDI',`Unknown device with id ${id}`); return }

    this.outputIndex = parseInt(id)
    console.log('MIDI', `Select Output Device: ${this.outputDevice().name}`)
  }

  this.selectInput = function (id) {
    if (this.inputDevice()) { this.inputDevice().onmidimessage = null }
    if (id === -1) { this.inputIndex = -1; console.log('MIDI', 'Select Input Device: None'); return }
    if (!this.inputs[id]) { console.warn('MIDI',`Unknown device with id ${id}`); return }

    this.inputIndex = parseInt(id)
    this.inputDevice().onmidimessage = (msg) => { this.receive(msg) }
    console.log('MIDI', `Select Input Device: ${this.inputDevice().name}`)
  }

  this.outputDevice = function () {
    return this.outputs[this.outputIndex]
  }

  this.inputDevice = function () {
    return this.inputs[this.inputIndex]
  }

  this.selectNextOutput = () => {
    this.outputIndex = this.outputIndex < this.outputs.length ? this.outputIndex + 1 : 0
    client.update()
  }

  this.selectNextInput = () => {
    const id = this.inputIndex < this.inputs.length - 1 ? this.inputIndex + 1 : -1
    this.selectInput(id)
    client.update()
  }

  // Setup

  this.refresh = function () {
    if (!navigator.requestMIDIAccess) { return }
    navigator.requestMIDIAccess().then(this.access, (err) => {
      console.warn('No Midi', err)
    })
  }

  this.access = (midiAccess) => {
    const outputs = midiAccess.outputs.values()
    this.outputs = []
    for (let i = outputs.next(); i && !i.done; i = outputs.next()) {
      this.outputs.push(i.value)
    }
    this.selectOutput(0)

    const inputs = midiAccess.inputs.values()
    this.inputs = []
    for (let i = inputs.next(); i && !i.done; i = inputs.next()) {
      this.inputs.push(i.value)
    }
    this.selectInput(-1)
  }

  // UI

  this.transpose = function (n, o = 3) {
    if (!_transpose_js__WEBPACK_IMPORTED_MODULE_0__.default[n]) { return null }
    const octave = clamp(parseInt(o) + parseInt(_transpose_js__WEBPACK_IMPORTED_MODULE_0__.default[n].charAt(1)), 0, 8)
    const note = _transpose_js__WEBPACK_IMPORTED_MODULE_0__.default[n].charAt(0)
    const value = ['C', 'c', 'D', 'd', 'E', 'F', 'f', 'G', 'g', 'A', 'a', 'B'].indexOf(note)
    const id = clamp((octave * 12) + value + 24, 0, 127)
    return { id, value, note, octave }
  }

  this.convert = function (id) {
    const note = ['C', 'c', 'D', 'd', 'E', 'F', 'f', 'G', 'g', 'A', 'a', 'B'][id % 12]
    const octave = Math.floor(id / 12) - 5
    const name = `${note}${octave}`
    const key = Object.values(_transpose_js__WEBPACK_IMPORTED_MODULE_0__.default).indexOf(name)
    return Object.keys(_transpose_js__WEBPACK_IMPORTED_MODULE_0__.default)[key]
  }

  this.toString = function () {
    return !navigator.requestMIDIAccess ? 'No Midi Support' : this.outputDevice() ? `${this.outputDevice().name}` : 'No Midi Device'
  }

  this.toInputString = () => {
    return !navigator.requestMIDIAccess ? 'No Midi Support' : this.inputDevice() ? `${this.inputDevice().name}` : 'No Input Device'
  }

  this.toOutputString = () => {
    return !navigator.requestMIDIAccess ? 'No Midi Support' : this.outputDevice() ? `${this.outputDevice().name}` : 'No Output Device'
  }

  this.length = function () {
    return this.stack.length
  }

  function clamp (v, min, max) { return v < min ? min : v > max ? max : v }
}

/*** EXPORTS FROM exports-loader ***/
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Midi);


/***/ }),

/***/ "./orca/desktop/sources/scripts/core/io/mono.js":
/*!******************************************************!*\
  !*** ./orca/desktop/sources/scripts/core/io/mono.js ***!
  \******************************************************/
/*! namespace exports */
/*! export default [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_exports__, __webpack_require__.r, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => __WEBPACK_DEFAULT_EXPORT__
/* harmony export */ });


function Mono (client) {
  this.stack = {}

  this.start = function () {
    console.info('MidiMono Starting..')
  }

  this.clear = function () {

  }

  this.run = function () {
    for (const id in this.stack) {
      if (this.stack[id].length < 1) {
        this.release(this.stack[id], id)
      }
      if (!this.stack[id]) { continue }
      if (this.stack[id].isPlayed === false) {
        this.press(this.stack[id])
      }
      this.stack[id].length--
    }
  }

  this.press = function (item) {
    if (!item) { return }
    client.io.midi.trigger(item, true)
    item.isPlayed = true
  }

  this.release = function (item) {
    if (!item) { return }
    client.io.midi.trigger(item, false)
    delete this.stack[item.channel]
  }

  this.silence = function () {
    for (const item of this.stack) {
      this.release(item)
    }
  }

  this.push = function (channel, octave, note, velocity, length, isPlayed = false) {
    if (this.stack[channel]) {
      this.release(this.stack[channel])
    }
    this.stack[channel] = { channel, octave, note, velocity, length, isPlayed }
  }

  this.length = function () {
    return Object.keys(this.stack).length
  }
}

/*** EXPORTS FROM exports-loader ***/
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Mono);


/***/ }),

/***/ "./orca/desktop/sources/scripts/core/io/osc.js":
/*!*****************************************************!*\
  !*** ./orca/desktop/sources/scripts/core/io/osc.js ***!
  \*****************************************************/
/*! namespace exports */
/*! export default [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_exports__, __webpack_require__.r, __webpack_require__, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => __WEBPACK_DEFAULT_EXPORT__
/* harmony export */ });


function Osc (client) {
  const osc = __webpack_require__(/*! node-osc */ "./browser/node-osc.js")

  this.stack = []
  this.socket = null
  this.port = null
  this.options = { default: 49162, tidalCycles: 6010, sonicPi: 4559, superCollider: 57120, norns: 10111 }

  this.start = function () {
    if (!osc) { console.warn('OSC', 'Could not start.'); return }
    console.info('OSC', 'Starting..')
    this.setup()
    this.select()
  }

  this.clear = function () {
    this.stack = []
  }

  this.run = function () {
    for (const item of this.stack) {
      this.play(item)
    }
  }

  this.push = function (path, msg) {
    this.stack.push({ path, msg })
  }

  this.play = function ({ path, msg }) {
    if (!this.socket) { console.warn('OSC', 'Unavailable socket'); return }
    const oscMsg = new osc.Message(path)
    for (var i = 0; i < msg.length; i++) {
      oscMsg.append(client.orca.valueOf(msg.charAt(i)))
    }
    this.socket.send(oscMsg, (err) => {
      if (err) { console.warn(err) }
    })
  }

  this.select = function (port = this.options.default) {
    if (parseInt(port) === this.port) { console.warn('OSC', 'Already selected'); return }
    if (isNaN(port) || port < 1000) { console.warn('OSC', 'Unavailable port'); return }
    console.info('OSC', `Selected port: ${port}`)
    this.port = parseInt(port)
    this.setup()
  }

  this.setup = function () {
    if (!this.port) { return }
    if (this.socket) { this.socket.close() }
    this.socket = new osc.Client(client.io.ip, this.port)
    console.info('OSC', `Started socket at ${client.io.ip}:${this.port}`)
  }
}

/*** EXPORTS FROM exports-loader ***/
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Osc);


/***/ }),

/***/ "./orca/desktop/sources/scripts/core/io/udp.js":
/*!*****************************************************!*\
  !*** ./orca/desktop/sources/scripts/core/io/udp.js ***!
  \*****************************************************/
/*! namespace exports */
/*! export default [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__, __webpack_exports__, __webpack_require__.r, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => __WEBPACK_DEFAULT_EXPORT__
/* harmony export */ });
/* provided dependency */ var Buffer = __webpack_require__(/*! ./browser/buffer.js */ "./browser/buffer.js");


function Udp (client) {
  const dgram = __webpack_require__(/*! dgram */ "./browser/dgram.js")

  this.stack = []
  this.port = null
  this.socket = dgram ? dgram.createSocket('udp4') : null
  this.listener = dgram ? dgram.createSocket('udp4') : null

  this.start = function () {
    if (!dgram || !this.socket || !this.listener) { console.warn('UDP', 'Could not start.'); return }
    console.info('UDP', 'Starting..')

    this.selectInput()
    this.selectOutput()
  }

  this.clear = function () {
    this.stack = []
  }

  this.run = function () {
    for (const item of this.stack) {
      this.play(item)
    }
  }

  this.push = function (msg) {
    this.stack.push(msg)
  }

  this.play = function (data) {
    if (!this.socket) { return }
    this.socket.send(Buffer.from(`${data}`), this.port, client.io.ip, (err) => {
      if (err) { console.warn(err) }
    })
  }

  this.selectOutput = function (port = 49161) {
    if (!dgram) { console.warn('UDP', 'Unavailable.'); return }
    if (parseInt(port) === this.port) { console.warn('UDP', 'Already selected'); return }
    if (isNaN(port) || port < 1000) { console.warn('UDP', 'Unavailable port'); return }

    console.log('UDP', `Output: ${port}`)
    this.port = parseInt(port)
  }

  this.selectInput = (port = 49160) => {
    if (!dgram) { console.warn('UDP', 'Unavailable.'); return }
    if (this.listener) { this.listener.close() }

    console.log('UDP', `Input: ${port}`)
    this.listener = dgram.createSocket('udp4')

    this.listener.on('message', (msg, rinfo) => {
      client.commander.trigger(`${msg}`)
    })

    this.listener.on('listening', () => {
      const address = this.listener.address()
      console.info('UDP', `Started socket at ${address.address}:${address.port}`)
    })

    this.listener.on('error', (err) => {
      console.warn('UDP', `Server error:\n ${err.stack}`)
      this.listener.close()
    })

    this.listener.bind(port)
  }
}

/*** EXPORTS FROM exports-loader ***/
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Udp);


/***/ }),

/***/ "./orca/desktop/sources/scripts/core/io.js":
/*!*************************************************!*\
  !*** ./orca/desktop/sources/scripts/core/io.js ***!
  \*************************************************/
/*! namespace exports */
/*! export default [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__, __webpack_exports__, __webpack_require__.r, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => __WEBPACK_DEFAULT_EXPORT__
/* harmony export */ });
/* harmony import */ var _io_midi_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./io/midi.js */ "./orca/desktop/sources/scripts/core/io/midi.js");
/* harmony import */ var _io_cc_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./io/cc.js */ "./orca/desktop/sources/scripts/core/io/cc.js");
/* harmony import */ var _io_mono_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./io/mono.js */ "./orca/desktop/sources/scripts/core/io/mono.js");
/* harmony import */ var _io_udp_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./io/udp.js */ "./orca/desktop/sources/scripts/core/io/udp.js");
/* harmony import */ var _io_osc_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./io/osc.js */ "./orca/desktop/sources/scripts/core/io/osc.js");
/*** IMPORTS FROM imports-loader ***/







'use strict'

/* global Midi */
/* global MidiCC */
/* global Mono */
/* global Udp */
/* global Osc */

function IO (client) {
  this.ip = '127.0.0.1'

  this.midi = new _io_midi_js__WEBPACK_IMPORTED_MODULE_0__.default(client)
  this.cc = new _io_cc_js__WEBPACK_IMPORTED_MODULE_3__.default(client)
  this.mono = new _io_mono_js__WEBPACK_IMPORTED_MODULE_4__.default(client)
  this.udp = new _io_udp_js__WEBPACK_IMPORTED_MODULE_1__.default(client)
  this.osc = new _io_osc_js__WEBPACK_IMPORTED_MODULE_2__.default(client)

  this.start = function () {
    this.midi.start()
    this.cc.start()
    this.mono.start()
    this.udp.start()
    this.osc.start()
    this.clear()
  }

  this.clear = function () {
    this.midi.clear()
    this.cc.clear()
    this.mono.clear()
    this.udp.clear()
    this.osc.clear()
  }

  this.run = function () {
    this.midi.run()
    this.cc.run()
    this.mono.run()
    this.udp.run()
    this.osc.run()
  }

  this.silence = function () {
    this.midi.silence()
    this.mono.silence()
  }

  this.setIp = function (addr = '127.0.0.1') {
    if (validateIP(addr) !== true && addr.indexOf('.local') === -1) { console.warn('IO', 'Invalid IP'); return }
    this.ip = addr
    console.log('IO', 'Set target IP to ' + this.ip)
    this.osc.setup()
  }

  this.length = function () {
    return this.midi.length() + this.mono.length() + this.cc.stack.length + this.udp.stack.length + this.osc.stack.length
  }

  this.inspect = function (limit = client.grid.w) {
    let text = ''
    for (let i = 0; i < this.length(); i++) {
      text += '|'
    }
    return fill(text, limit, '.')
  }

  function validateIP (addr) { return !!(/^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/.test(addr)) }
  function fill (str, len, chr) { while (str.length < len) { str += chr }; return str }
}

/*** EXPORTS FROM exports-loader ***/
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (IO);


/***/ }),

/***/ "./orca/desktop/sources/scripts/core/library.js":
/*!******************************************************!*\
  !*** ./orca/desktop/sources/scripts/core/library.js ***!
  \******************************************************/
/*! namespace exports */
/*! export default [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__, __webpack_exports__, __webpack_require__.r, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => __WEBPACK_DEFAULT_EXPORT__
/* harmony export */ });
/* harmony import */ var _operator_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./operator.js */ "./orca/desktop/sources/scripts/core/operator.js");
/*** IMPORTS FROM imports-loader ***/



'use strict'

/* global Operator */
/* global client */

const library = {}

library.a = function OperatorA (orca, x, y, passive) {
  _operator_js__WEBPACK_IMPORTED_MODULE_0__.default.call(this, orca, x, y, 'a', passive)

  this.name = 'add'
  this.info = 'Outputs sum of inputs'

  this.ports.a = { x: -1, y: 0 }
  this.ports.b = { x: 1, y: 0 }
  this.ports.output = { x: 0, y: 1, sensitive: true, output: true }

  this.operation = function (force = false) {
    const a = this.listen(this.ports.a, true)
    const b = this.listen(this.ports.b, true)
    return orca.keyOf(a + b)
  }
}

library.b = function OperatorL (orca, x, y, passive) {
  _operator_js__WEBPACK_IMPORTED_MODULE_0__.default.call(this, orca, x, y, 'b', passive)

  this.name = 'subtract'
  this.info = 'Outputs difference of inputs'

  this.ports.a = { x: -1, y: 0 }
  this.ports.b = { x: 1, y: 0 }
  this.ports.output = { x: 0, y: 1, sensitive: true, output: true }

  this.operation = function (force = false) {
    const a = this.listen(this.ports.a, true)
    const b = this.listen(this.ports.b, true)
    return orca.keyOf(Math.abs(b - a))
  }
}

library.c = function OperatorC (orca, x, y, passive) {
  _operator_js__WEBPACK_IMPORTED_MODULE_0__.default.call(this, orca, x, y, 'c', passive)

  this.name = 'clock'
  this.info = 'Outputs modulo of frame'

  this.ports.rate = { x: -1, y: 0, clamp: { min: 1 } }
  this.ports.mod = { x: 1, y: 0, default: '8' }
  this.ports.output = { x: 0, y: 1, sensitive: true, output: true }

  this.operation = function (force = false) {
    const rate = this.listen(this.ports.rate, true)
    const mod = this.listen(this.ports.mod, true)
    const val = Math.floor(orca.f / rate) % mod
    return orca.keyOf(val)
  }
}

library.d = function OperatorD (orca, x, y, passive) {
  _operator_js__WEBPACK_IMPORTED_MODULE_0__.default.call(this, orca, x, y, 'd', passive)

  this.name = 'delay'
  this.info = 'Bangs on modulo of frame'

  this.ports.rate = { x: -1, y: 0, clamp: { min: 1 } }
  this.ports.mod = { x: 1, y: 0, default: '8' }
  this.ports.output = { x: 0, y: 1, bang: true, output: true }

  this.operation = function (force = false) {
    const rate = this.listen(this.ports.rate, true)
    const mod = this.listen(this.ports.mod, true)
    const res = orca.f % (mod * rate)
    return res === 0 || mod === 1
  }
}

library.e = function OperatorE (orca, x, y, passive) {
  _operator_js__WEBPACK_IMPORTED_MODULE_0__.default.call(this, orca, x, y, 'e', passive)

  this.name = 'east'
  this.info = 'Moves eastward, or bangs'
  this.draw = false

  this.operation = function () {
    this.move(1, 0)
    this.passive = false
  }
}

library.f = function OperatorF (orca, x, y, passive) {
  _operator_js__WEBPACK_IMPORTED_MODULE_0__.default.call(this, orca, x, y, 'f', passive)

  this.name = 'if'
  this.info = 'Bangs if inputs are equal'

  this.ports.a = { x: -1, y: 0 }
  this.ports.b = { x: 1, y: 0 }
  this.ports.output = { x: 0, y: 1, bang: true, output: true }

  this.operation = function (force = false) {
    const a = this.listen(this.ports.a)
    const b = this.listen(this.ports.b)
    return a === b
  }
}

library.g = function OperatorG (orca, x, y, passive) {
  _operator_js__WEBPACK_IMPORTED_MODULE_0__.default.call(this, orca, x, y, 'g', passive)

  this.name = 'generator'
  this.info = 'Writes operands with offset'

  this.ports.x = { x: -3, y: 0 }
  this.ports.y = { x: -2, y: 0 }
  this.ports.len = { x: -1, y: 0, clamp: { min: 1 } }

  this.operation = function (force = false) {
    const len = this.listen(this.ports.len, true)
    const x = this.listen(this.ports.x, true)
    const y = this.listen(this.ports.y, true) + 1
    for (let offset = 0; offset < len; offset++) {
      const inPort = { x: offset + 1, y: 0 }
      const outPort = { x: x + offset, y: y, output: true }
      this.addPort(`in${offset}`, inPort)
      this.addPort(`out${offset}`, outPort)
      const res = this.listen(inPort)
      this.output(`${res}`, outPort)
    }
  }
}

library.h = function OperatorH (orca, x, y, passive) {
  _operator_js__WEBPACK_IMPORTED_MODULE_0__.default.call(this, orca, x, y, 'h', passive)

  this.name = 'halt'
  this.info = 'Halts southward operand'

  this.ports.output = { x: 0, y: 1, reader: true, output: true }

  this.operation = function (force = false) {
    orca.lock(this.x + this.ports.output.x, this.y + this.ports.output.y)
    return this.listen(this.ports.output, true)
  }
}

library.i = function OperatorI (orca, x, y, passive) {
  _operator_js__WEBPACK_IMPORTED_MODULE_0__.default.call(this, orca, x, y, 'i', passive)

  this.name = 'increment'
  this.info = 'Increments southward operand'

  this.ports.step = { x: -1, y: 0, default: '1' }
  this.ports.mod = { x: 1, y: 0 }
  this.ports.output = { x: 0, y: 1, sensitive: true, reader: true, output: true }

  this.operation = function (force = false) {
    const step = this.listen(this.ports.step, true)
    const mod = this.listen(this.ports.mod, true)
    const val = this.listen(this.ports.output, true)
    return orca.keyOf((val + step) % (mod > 0 ? mod : 36))
  }
}

library.j = function OperatorJ (orca, x, y, passive) {
  _operator_js__WEBPACK_IMPORTED_MODULE_0__.default.call(this, orca, x, y, 'j', passive)

  this.name = 'jumper'
  this.info = 'Outputs northward operand'

  this.ports.val = { x: 0, y: -1 }
  this.ports.output = { x: 0, y: 1, output: true }

  this.operation = function (force = false) {
    orca.lock(this.x, this.y + 1)
    return this.listen(this.ports.val)
  }
}

library.k = function OperatorK (orca, x, y, passive) {
  _operator_js__WEBPACK_IMPORTED_MODULE_0__.default.call(this, orca, x, y, 'k', passive)

  this.name = 'konkat'
  this.info = 'Reads multiple variables'

  this.ports.len = { x: -1, y: 0, clamp: { min: 1 } }

  this.operation = function (force = false) {
    this.len = this.listen(this.ports.len, true)
    for (let offset = 0; offset < this.len; offset++) {
      const key = orca.glyphAt(this.x + offset + 1, this.y)
      orca.lock(this.x + offset + 1, this.y)
      if (key === '.') { continue }
      const inPort = { x: offset + 1, y: 0 }
      const outPort = { x: offset + 1, y: 1, output: true }
      this.addPort(`in${offset}`, inPort)
      this.addPort(`out${offset}`, outPort)
      const res = orca.valueIn(key)
      this.output(`${res}`, outPort)
    }
  }
}

library.l = function OperatorL (orca, x, y, passive) {
  _operator_js__WEBPACK_IMPORTED_MODULE_0__.default.call(this, orca, x, y, 'l', passive)

  this.name = 'lesser'
  this.info = 'Outputs smallest input'

  this.ports.a = { x: -1, y: 0 }
  this.ports.b = { x: 1, y: 0 }
  this.ports.output = { x: 0, y: 1, sensitive: true, output: true }

  this.operation = function (force = false) {
    const a = this.listen(this.ports.a)
    const b = this.listen(this.ports.b)
    return a !== '.' && b !== '.' ? orca.keyOf(Math.min(orca.valueOf(a), orca.valueOf(b))) : '.'
  }
}

library.m = function OperatorM (orca, x, y, passive) {
  _operator_js__WEBPACK_IMPORTED_MODULE_0__.default.call(this, orca, x, y, 'm', passive)

  this.name = 'multiply'
  this.info = 'Outputs product of inputs'

  this.ports.a = { x: -1, y: 0 }
  this.ports.b = { x: 1, y: 0 }
  this.ports.output = { x: 0, y: 1, sensitive: true, output: true }

  this.operation = function (force = false) {
    const a = this.listen(this.ports.a, true)
    const b = this.listen(this.ports.b, true)
    return orca.keyOf(a * b)
  }
}

library.n = function OperatorN (orca, x, y, passive) {
  _operator_js__WEBPACK_IMPORTED_MODULE_0__.default.call(this, orca, x, y, 'n', passive)

  this.name = 'north'
  this.info = 'Moves Northward, or bangs'
  this.draw = false

  this.operation = function () {
    this.move(0, -1)
    this.passive = false
  }
}

library.o = function OperatorO (orca, x, y, passive) {
  _operator_js__WEBPACK_IMPORTED_MODULE_0__.default.call(this, orca, x, y, 'o', passive)

  this.name = 'read'
  this.info = 'Reads operand with offset'

  this.ports.x = { x: -2, y: 0 }
  this.ports.y = { x: -1, y: 0 }
  this.ports.output = { x: 0, y: 1, output: true }

  this.operation = function (force = false) {
    const x = this.listen(this.ports.x, true)
    const y = this.listen(this.ports.y, true)
    this.addPort('read', { x: x + 1, y: y })
    return this.listen(this.ports.read)
  }
}

library.p = function OperatorP (orca, x, y, passive) {
  _operator_js__WEBPACK_IMPORTED_MODULE_0__.default.call(this, orca, x, y, 'p', passive)

  this.name = 'push'
  this.info = 'Writes eastward operand'

  this.ports.key = { x: -2, y: 0 }
  this.ports.len = { x: -1, y: 0, clamp: { min: 1 } }
  this.ports.val = { x: 1, y: 0 }

  this.operation = function (force = false) {
    const len = this.listen(this.ports.len, true)
    const key = this.listen(this.ports.key, true)
    for (let offset = 0; offset < len; offset++) {
      orca.lock(this.x + offset, this.y + 1)
    }
    this.ports.output = { x: (key % len), y: 1, output: true }
    return this.listen(this.ports.val)
  }
}

library.q = function OperatorQ (orca, x, y, passive) {
  _operator_js__WEBPACK_IMPORTED_MODULE_0__.default.call(this, orca, x, y, 'q', passive)

  this.name = 'query'
  this.info = 'Reads operands with offset'

  this.ports.x = { x: -3, y: 0 }
  this.ports.y = { x: -2, y: 0 }
  this.ports.len = { x: -1, y: 0, clamp: { min: 1 } }

  this.operation = function (force = false) {
    const len = this.listen(this.ports.len, true)
    const x = this.listen(this.ports.x, true)
    const y = this.listen(this.ports.y, true)
    for (let offset = 0; offset < len; offset++) {
      const inPort = { x: x + offset + 1, y: y }
      const outPort = { x: offset - len + 1, y: 1, output: true }
      this.addPort(`in${offset}`, inPort)
      this.addPort(`out${offset}`, outPort)
      const res = this.listen(inPort)
      this.output(`${res}`, outPort)
    }
  }
}

library.r = function OperatorR (orca, x, y, passive) {
  _operator_js__WEBPACK_IMPORTED_MODULE_0__.default.call(this, orca, x, y, 'r', passive)

  this.name = 'random'
  this.info = 'Outputs random value'

  this.ports.min = { x: -1, y: 0 }
  this.ports.max = { x: 1, y: 0 }
  this.ports.output = { x: 0, y: 1, sensitive: true, output: true }

  this.operation = function (force = false) {
    const min = this.listen(this.ports.min, true)
    const max = this.listen(this.ports.max, true)
    const val = parseInt((Math.random() * ((max > 0 ? max : 36) - min)) + min)
    return orca.keyOf(val)
  }
}

library.s = function OperatorS (orca, x, y, passive) {
  _operator_js__WEBPACK_IMPORTED_MODULE_0__.default.call(this, orca, x, y, 's', passive)

  this.name = 'south'
  this.info = 'Moves southward, or bangs'
  this.draw = false

  this.operation = function () {
    this.move(0, 1)
    this.passive = false
  }
}

library.t = function OperatorT (orca, x, y, passive) {
  _operator_js__WEBPACK_IMPORTED_MODULE_0__.default.call(this, orca, x, y, 't', passive)

  this.name = 'track'
  this.info = 'Reads eastward operand'

  this.ports.key = { x: -2, y: 0 }
  this.ports.len = { x: -1, y: 0, clamp: { min: 1 } }
  this.ports.output = { x: 0, y: 1, output: true }

  this.operation = function (force = false) {
    const len = this.listen(this.ports.len, true)
    const key = this.listen(this.ports.key, true)
    for (let offset = 0; offset < len; offset++) {
      orca.lock(this.x + offset + 1, this.y)
    }
    this.ports.val = { x: (key % len) + 1, y: 0 }
    return this.listen(this.ports.val)
  }
}

library.u = function OperatorU (orca, x, y, passive) {
  _operator_js__WEBPACK_IMPORTED_MODULE_0__.default.call(this, orca, x, y, 'u', passive)

  this.name = 'uclid'
  this.info = 'Bangs on Euclidean rhythm'

  this.ports.step = { x: -1, y: 0, clamp: { min: 0 }, default: '1' }
  this.ports.max = { x: 1, y: 0, clamp: { min: 1 }, default: '8' }
  this.ports.output = { x: 0, y: 1, bang: true, output: true }

  this.operation = function (force = false) {
    const step = this.listen(this.ports.step, true)
    const max = this.listen(this.ports.max, true)
    const bucket = (step * (orca.f + max - 1)) % max + step
    return bucket >= max
  }
}

library.v = function OperatorV (orca, x, y, passive) {
  _operator_js__WEBPACK_IMPORTED_MODULE_0__.default.call(this, orca, x, y, 'v', passive)

  this.name = 'variable'
  this.info = 'Reads and writes variable'

  this.ports.write = { x: -1, y: 0 }
  this.ports.read = { x: 1, y: 0 }

  this.operation = function (force = false) {
    const write = this.listen(this.ports.write)
    const read = this.listen(this.ports.read)
    if (write === '.' && read !== '.') {
      this.addPort('output', { x: 0, y: 1 })
    }
    if (write !== '.') {
      orca.variables[write] = read
      return
    }
    return orca.valueIn(read)
  }
}

library.w = function OperatorW (orca, x, y, passive) {
  _operator_js__WEBPACK_IMPORTED_MODULE_0__.default.call(this, orca, x, y, 'w', passive)

  this.name = 'west'
  this.info = 'Moves westward, or bangs'
  this.draw = false

  this.operation = function () {
    this.move(-1, 0)
    this.passive = false
  }
}

library.x = function OperatorX (orca, x, y, passive) {
  _operator_js__WEBPACK_IMPORTED_MODULE_0__.default.call(this, orca, x, y, 'x', passive)

  this.name = 'write'
  this.info = 'Writes operand with offset'

  this.ports.x = { x: -2, y: 0 }
  this.ports.y = { x: -1, y: 0 }
  this.ports.val = { x: 1, y: 0 }

  this.operation = function (force = false) {
    const x = this.listen(this.ports.x, true)
    const y = this.listen(this.ports.y, true) + 1
    this.addPort('output', { x: x, y: y, output: true })
    return this.listen(this.ports.val)
  }
}

library.y = function OperatorY (orca, x, y, passive) {
  _operator_js__WEBPACK_IMPORTED_MODULE_0__.default.call(this, orca, x, y, 'y', passive)

  this.name = 'jymper'
  this.info = 'Outputs westward operand'

  this.ports.val = { x: -1, y: 0 }
  this.ports.output = { x: 1, y: 0, output: true }

  this.operation = function (force = false) {
    orca.lock(this.x + 1, this.y)
    return this.listen(this.ports.val)
  }
}

library.z = function OperatorZ (orca, x, y, passive) {
  _operator_js__WEBPACK_IMPORTED_MODULE_0__.default.call(this, orca, x, y, 'z', passive)

  this.name = 'lerp'
  this.info = 'Transitions operand to target'

  this.ports.rate = { x: -1, y: 0, default: '1' }
  this.ports.target = { x: 1, y: 0 }
  this.ports.output = { x: 0, y: 1, sensitive: true, reader: true, output: true }

  this.operation = function (force = false) {
    const rate = this.listen(this.ports.rate, true)
    const target = this.listen(this.ports.target, true)
    const val = this.listen(this.ports.output, true)
    const mod = val <= target - rate ? rate : val >= target + rate ? -rate : target - val
    return orca.keyOf(val + mod)
  }
}

// Specials

library['*'] = function OperatorBang (orca, x, y, passive) {
  _operator_js__WEBPACK_IMPORTED_MODULE_0__.default.call(this, orca, x, y, '*', true)

  this.name = 'bang'
  this.info = 'Bangs neighboring operands'
  this.draw = false

  this.run = function (force = false) {
    this.draw = false
    this.erase()
  }
}

library['#'] = function OperatorComment (orca, x, y, passive) {
  _operator_js__WEBPACK_IMPORTED_MODULE_0__.default.call(this, orca, x, y, '#', true)

  this.name = 'comment'
  this.info = 'Halts line'
  this.draw = false

  this.operation = function () {
    for (let x = this.x + 1; x <= orca.w; x++) {
      orca.lock(x, this.y)
      if (orca.glyphAt(x, this.y) === this.glyph) { break }
    }
    orca.lock(this.x, this.y)
  }
}

// IO

library.$ = function OperatorSelf (orca, x, y, passive) {
  _operator_js__WEBPACK_IMPORTED_MODULE_0__.default.call(this, orca, x, y, '*', true)

  this.name = 'self'
  this.info = 'Sends ORCA command'

  this.run = function (force = false) {
    let msg = ''
    for (let x = 1; x <= 36; x++) {
      const g = orca.glyphAt(this.x + x, this.y)
      orca.lock(this.x + x, this.y)
      if (g === '.') { break }
      msg += g
    }

    if (!this.hasNeighbor('*') && force === false) { return }
    if (msg === '') { return }

    this.draw = false
    client.commander.trigger(`${msg}`, { x, y: y + 1 }, false)
  }
}

library[':'] = function OperatorMidi (orca, x, y, passive) {
  _operator_js__WEBPACK_IMPORTED_MODULE_0__.default.call(this, orca, x, y, ':', true)

  this.name = 'midi'
  this.info = 'Sends MIDI note'
  this.ports.channel = { x: 1, y: 0 }
  this.ports.octave = { x: 2, y: 0, clamp: { min: 0, max: 8 } }
  this.ports.note = { x: 3, y: 0 }
  this.ports.velocity = { x: 4, y: 0, default: 'f', clamp: { min: 0, max: 16 } }
  this.ports.length = { x: 5, y: 0, default: '1', clamp: { min: 0, max: 32 } }

  this.operation = function (force = false) {
    if (!this.hasNeighbor('*') && force === false) { return }
    if (this.listen(this.ports.channel) === '.') { return }
    if (this.listen(this.ports.octave) === '.') { return }
    if (this.listen(this.ports.note) === '.') { return }
    if (!isNaN(this.listen(this.ports.note))) { return }

    const channel = this.listen(this.ports.channel, true)
    if (channel > 15) { return }
    const octave = this.listen(this.ports.octave, true)
    const note = this.listen(this.ports.note)
    const velocity = this.listen(this.ports.velocity, true)
    const length = this.listen(this.ports.length, true)

    client.io.midi.push(channel, octave, note, velocity, length)

    if (force === true) {
      client.io.midi.run()
    }

    this.draw = false
  }
}

library['!'] = function OperatorCC (orca, x, y) {
  _operator_js__WEBPACK_IMPORTED_MODULE_0__.default.call(this, orca, x, y, '!', true)

  this.name = 'cc'
  this.info = 'Sends MIDI control change'
  this.ports.channel = { x: 1, y: 0 }
  this.ports.knob = { x: 2, y: 0, clamp: { min: 0 } }
  this.ports.value = { x: 3, y: 0, clamp: { min: 0 } }

  this.operation = function (force = false) {
    if (!this.hasNeighbor('*') && force === false) { return }
    if (this.listen(this.ports.channel) === '.') { return }
    if (this.listen(this.ports.knob) === '.') { return }

    const channel = this.listen(this.ports.channel, true)
    if (channel > 15) { return }
    const knob = this.listen(this.ports.knob, true)
    const rawValue = this.listen(this.ports.value, true)
    const value = Math.ceil((127 * rawValue) / 35)

    client.io.cc.stack.push({ channel, knob, value, type: 'cc' })

    this.draw = false

    if (force === true) {
      client.io.cc.run()
    }
  }
}

library['?'] = function OperatorPB (orca, x, y) {
  _operator_js__WEBPACK_IMPORTED_MODULE_0__.default.call(this, orca, x, y, '?', true)

  this.name = 'pb'
  this.info = 'Sends MIDI pitch bend'
  this.ports.channel = { x: 1, y: 0, clamp: { min: 0, max: 15 } }
  this.ports.lsb = { x: 2, y: 0, clamp: { min: 0 } }
  this.ports.msb = { x: 3, y: 0, clamp: { min: 0 } }

  this.operation = function (force = false) {
    if (!this.hasNeighbor('*') && force === false) { return }
    if (this.listen(this.ports.channel) === '.') { return }
    if (this.listen(this.ports.lsb) === '.') { return }

    const channel = this.listen(this.ports.channel, true)
    const rawlsb = this.listen(this.ports.lsb, true)
    const lsb = Math.ceil((127 * rawlsb) / 35)
    const rawmsb = this.listen(this.ports.msb, true)
    const msb = Math.ceil((127 * rawmsb) / 35)

    client.io.cc.stack.push({ channel, lsb, msb, type: 'pb' })

    this.draw = false

    if (force === true) {
      client.io.cc.run()
    }
  }
}

library['%'] = function OperatorMono (orca, x, y, passive) {
  _operator_js__WEBPACK_IMPORTED_MODULE_0__.default.call(this, orca, x, y, '%', true)

  this.name = 'mono'
  this.info = 'Sends MIDI monophonic note'
  this.ports.channel = { x: 1, y: 0 }
  this.ports.octave = { x: 2, y: 0, clamp: { min: 0, max: 8 } }
  this.ports.note = { x: 3, y: 0 }
  this.ports.velocity = { x: 4, y: 0, default: 'f', clamp: { min: 0, max: 16 } }
  this.ports.length = { x: 5, y: 0, default: '1', clamp: { min: 0, max: 32 } }

  this.operation = function (force = false) {
    if (!this.hasNeighbor('*') && force === false) { return }
    if (this.listen(this.ports.channel) === '.') { return }
    if (this.listen(this.ports.octave) === '.') { return }
    if (this.listen(this.ports.note) === '.') { return }
    if (!isNaN(this.listen(this.ports.note))) { return }

    const channel = this.listen(this.ports.channel, true)
    if (channel > 15) { return }
    const octave = this.listen(this.ports.octave, true)
    const note = this.listen(this.ports.note)
    const velocity = this.listen(this.ports.velocity, true)
    const length = this.listen(this.ports.length, true)

    client.io.mono.push(channel, octave, note, velocity, length)

    if (force === true) {
      client.io.mono.run()
    }

    this.draw = false
  }
}

library['='] = function OperatorOsc (orca, x, y, passive) {
  _operator_js__WEBPACK_IMPORTED_MODULE_0__.default.call(this, orca, x, y, '=', true)

  this.name = 'osc'
  this.info = 'Sends OSC message'

  this.ports.path = { x: 1, y: 0 }

  this.operation = function (force = false) {
    let msg = ''
    for (let x = 2; x <= 36; x++) {
      const g = orca.glyphAt(this.x + x, this.y)
      orca.lock(this.x + x, this.y)
      if (g === '.') { break }
      msg += g
    }

    if (!this.hasNeighbor('*') && force === false) { return }

    const path = this.listen(this.ports.path)

    if (!path || path === '.') { return }

    this.draw = false
    client.io.osc.push('/' + path, msg)

    if (force === true) {
      client.io.osc.run()
    }
  }
}

library[';'] = function OperatorUdp (orca, x, y, passive) {
  _operator_js__WEBPACK_IMPORTED_MODULE_0__.default.call(this, orca, x, y, ';', true)

  this.name = 'udp'
  this.info = 'Sends UDP message'

  this.operation = function (force = false) {
    let msg = ''
    for (let x = 1; x <= 36; x++) {
      const g = orca.glyphAt(this.x + x, this.y)
      orca.lock(this.x + x, this.y)
      if (g === '.') { break }
      msg += g
    }

    if (!this.hasNeighbor('*') && force === false) { return }

    this.draw = false
    client.io.udp.push(msg)

    if (force === true) {
      client.io.udp.run()
    }
  }
}

// Add numbers

for (let i = 0; i <= 9; i++) {
  library[`${i}`] = function OperatorNull (orca, x, y, passive) {
    _operator_js__WEBPACK_IMPORTED_MODULE_0__.default.call(this, orca, x, y, '.', false)

    this.name = 'null'
    this.info = 'empty'

    // Overwrite run, to disable draw.
    this.run = function (force = false) {

    }
  }
}

/*** EXPORTS FROM exports-loader ***/
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (library);


/***/ }),

/***/ "./orca/desktop/sources/scripts/core/operator.js":
/*!*******************************************************!*\
  !*** ./orca/desktop/sources/scripts/core/operator.js ***!
  \*******************************************************/
/*! namespace exports */
/*! export default [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_exports__, __webpack_require__.r, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => __WEBPACK_DEFAULT_EXPORT__
/* harmony export */ });


function Operator (orca, x, y, glyph = '.', passive = false) {
  this.name = 'unknown'
  this.x = x
  this.y = y
  this.passive = passive
  this.draw = passive
  this.glyph = passive ? glyph.toUpperCase() : glyph
  this.info = '--'
  this.ports = {}

  // Actions

  this.listen = function (port, toValue = false) {
    if (!port) { return (toValue ? 0 : '.') }
    const g = orca.glyphAt(this.x + port.x, this.y + port.y)
    const glyph = (g === '.' || g === '*') && port.default ? port.default : g
    if (toValue) {
      const min = port.clamp && port.clamp.min ? port.clamp.min : 0
      const max = port.clamp && port.clamp.max ? port.clamp.max : 36
      return clamp(orca.valueOf(glyph), min, max)
    }
    return glyph
  }

  this.output = function (g, port = this.ports.output) {
    if (!port) { console.warn(this.name, 'Trying to output, but no port'); return }
    if (!g) { return }
    orca.write(this.x + port.x, this.y + port.y, this.shouldUpperCase() === true ? `${g}`.toUpperCase() : g)
  }

  this.bang = function (b) {
    if (!this.ports.output) { console.warn(this.name, 'Trying to bang, but no port'); return }
    orca.write(this.x + this.ports.output.x, this.y + this.ports.output.y, b ? '*' : '.')
    orca.lock(this.x + this.ports.output.x, this.y + this.ports.output.y)
  }

  // Phases

  this.run = function (force = false) {
    // Operate
    const payload = this.operation(force)
    // Permissions
    for (const port of Object.values(this.ports)) {
      if (port.bang) { continue }
      orca.lock(this.x + port.x, this.y + port.y)
    }

    if (this.ports.output) {
      if (this.ports.output.bang === true) {
        this.bang(payload)
      } else {
        this.output(payload)
      }
    }
  }

  this.operation = function () {
    // Used in individual operators
  }

  // Helpers

  this.lock = function () {
    orca.lock(this.x, this.y)
  }

  this.replace = function (g) {
    orca.write(this.x, this.y, g)
  }

  this.erase = function () {
    this.replace('.')
  }

  this.explode = function () {
    this.replace('*')
  }

  this.move = function (x, y) {
    const offset = { x: this.x + x, y: this.y + y }
    if (!orca.inBounds(offset.x, offset.y)) { this.explode(); return }
    const collider = orca.glyphAt(offset.x, offset.y)
    if (collider !== '*' && collider !== '.') { this.explode(); return }
    this.erase()
    this.x += x
    this.y += y
    this.replace(this.glyph)
    this.lock()
  }

  this.hasNeighbor = function (g) {
    if (orca.glyphAt(this.x + 1, this.y) === g) { return true }
    if (orca.glyphAt(this.x - 1, this.y) === g) { return true }
    if (orca.glyphAt(this.x, this.y + 1) === g) { return true }
    if (orca.glyphAt(this.x, this.y - 1) === g) { return true }
    return false
  }

  // Docs

  this.addPort = function (name, pos) {
    this.ports[name] = pos
  }

  this.getPorts = function () {
    const a = []
    if (this.draw === true) {
      a.push([this.x, this.y, 0, `${this.name.charAt(0).toUpperCase() + this.name.substring(1).toLowerCase()}`])
    }
    if (!this.passive) { return a }
    for (const id in this.ports) {
      const port = this.ports[id]
      const type = port.output ? 3 : port.x < 0 || port.y < 0 ? 1 : 2
      a.push([this.x + port.x, this.y + port.y, type, `${this.glyph}-${id}`])
    }
    return a
  }

  this.shouldUpperCase = function (ports = this.ports) {
    if (!this.ports.output || !this.ports.output.sensitive) { return false }
    const value = this.listen({ x: 1, y: 0 })
    if (value.toLowerCase() === value.toUpperCase()) { return false }
    if (value.toUpperCase() !== value) { return false }
    return true
  }

  // Docs

  function clamp (v, min, max) { return v < min ? min : v > max ? max : v }
}

/*** EXPORTS FROM exports-loader ***/
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Operator);


/***/ }),

/***/ "./orca/desktop/sources/scripts/core/orca.js":
/*!***************************************************!*\
  !*** ./orca/desktop/sources/scripts/core/orca.js ***!
  \***************************************************/
/*! namespace exports */
/*! export default [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_exports__, __webpack_require__.r, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => __WEBPACK_DEFAULT_EXPORT__
/* harmony export */ });


function Orca (library) {
  this.keys = '0123456789abcdefghijklmnopqrstuvwxyz'.split('')

  this.w = 1 // Default Width
  this.h = 1 // Default Height
  this.f = 0 // Frame
  this.s = '' // String

  this.locks = []
  this.runtime = []
  this.variables = {}

  this.run = function () {
    this.runtime = this.parse()
    this.operate(this.runtime)
    this.f += 1
  }

  this.reset = function (w = this.w, h = this.h) {
    this.f = 0
    this.w = w
    this.h = h
    this.replace(new Array((this.h * this.w) + 1).join('.'))
  }

  this.load = function (w, h, s, f = 0) {
    this.w = w
    this.h = h
    this.f = f
    this.replace(this.clean(s))
    return this
  }

  this.write = function (x, y, g) {
    if (!g) { return false }
    if (g.length !== 1) { return false }
    if (!this.inBounds(x, y)) { return false }
    if (this.glyphAt(x, y) === g) { return false }
    const index = this.indexAt(x, y)
    const glyph = !this.isAllowed(g) ? '.' : g
    const string = this.s.substr(0, index) + glyph + this.s.substr(index + 1)
    this.replace(string)
    return true
  }

  this.clean = (str) => {
    return `${str}`.replace(/\n/g, '').trim().substr(0, this.w * this.h).split('').map((g) => {
      return !this.isAllowed(g) ? '.' : g
    }).join('')
  }

  this.replace = function (s) {
    this.s = s
  }

  // Operators

  this.parse = function () {
    const a = []
    for (let y = 0; y < this.h; y++) {
      for (let x = 0; x < this.w; x++) {
        const g = this.glyphAt(x, y)
        if (g === '.' || !this.isAllowed(g)) { continue }
        a.push(new library[g.toLowerCase()](this, x, y, g === g.toUpperCase()))
      }
    }
    return a
  }

  this.operate = function (operators) {
    this.release()
    for (const operator of operators) {
      if (this.lockAt(operator.x, operator.y)) { continue }
      if (operator.passive || operator.hasNeighbor('*')) {
        operator.run()
      }
    }
  }

  this.bounds = function () {
    let w = 0
    let h = 0
    for (let y = 0; y < this.h; y++) {
      for (let x = 0; x < this.w; x++) {
        const g = this.glyphAt(x, y)
        if (g !== '.') {
          if (x > w) { w = x }
          if (y > h) { h = y }
        }
      }
    }
    return { w, h }
  }

  // Blocks

  this.getBlock = (x, y, w, h) => {
    let lines = ''
    for (let _y = y; _y < y + h; _y++) {
      let line = ''
      for (let _x = x; _x < x + w; _x++) {
        line += this.glyphAt(_x, _y)
      }
      lines += line + '\n'
    }
    return lines
  }

  this.writeBlock = (x, y, block, overlap = false) => {
    if (!block) { return }
    const lines = block.split(/\r?\n/)
    let _y = y
    for (const line of lines) {
      let _x = x
      for (const y in line) {
        const glyph = line[y]
        this.write(_x, _y, overlap === true && glyph === '.' ? this.glyphAt(_x, _y) : glyph)
        _x++
      }
      _y++
    }
  }

  // Locks

  this.release = function () {
    this.locks = new Array(this.w * this.h)
    this.variables = {}
  }

  this.unlock = function (x, y) {
    this.locks[this.indexAt(x, y)] = null
  }

  this.lock = function (x, y) {
    if (this.lockAt(x, y)) { return }
    this.locks[this.indexAt(x, y)] = true
  }

  // Helpers

  this.inBounds = function (x, y) {
    return Number.isInteger(x) && Number.isInteger(y) && x >= 0 && x < this.w && y >= 0 && y < this.h
  }

  this.isAllowed = function (g) {
    return g === '.' || !!library[`${g}`.toLowerCase()]
  }

  this.isSpecial = function (g) {
    return g.toLowerCase() === g.toUpperCase() && isNaN(g)
  }

  this.keyOf = function (val, uc = false) {
    return uc === true ? this.keys[val % 36].toUpperCase() : this.keys[val % 36]
  }

  this.valueOf = function (g) {
    return !g || g === '.' || g === '*' ? 0 : this.keys.indexOf(`${g}`.toLowerCase())
  }

  this.indexAt = function (x, y) {
    return this.inBounds(x, y) === true ? x + (this.w * y) : -1
  }

  this.operatorAt = function (x, y) {
    return this.runtime.filter((item) => { return item.x === x && item.y === y })[0]
  }

  this.posAt = function (index) {
    return { x: index % this.w, y: parseInt(index / this.w) }
  }

  this.glyphAt = function (x, y) {
    return this.s.charAt(this.indexAt(x, y))
  }

  this.valueAt = function (x, y) {
    return this.valueOf(this.glyphAt(x, y))
  }

  this.lockAt = function (x, y) {
    return this.locks[this.indexAt(x, y)] === true
  }

  this.valueIn = function (key) {
    return this.variables[key] || '.'
  }

  // Tools

  this.format = () => {
    const a = []
    for (let y = 0; y < this.h; y++) {
      a.push(this.s.substr(y * this.w, this.w))
    }
    return a.reduce((acc, val) => {
      return `${acc}${val}\n`
    }, '')
  }

  this.length = () => {
    return this.strip().length
  }

  this.strip = () => {
    return this.s.replace(/[^a-zA-Z0-9+]+/gi, '').trim()
  }

  this.toString = () => {
    return this.format().trim()
  }

  this.toRect = (str = this.s) => {
    const lines = str.trim().split(/\r?\n/)
    return { x: lines[0].length, y: lines.length }
  }

  this.reset()
}

/*** EXPORTS FROM exports-loader ***/
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Orca);


/***/ }),

/***/ "./orca/desktop/sources/scripts/core/transpose.js":
/*!********************************************************!*\
  !*** ./orca/desktop/sources/scripts/core/transpose.js ***!
  \********************************************************/
/*! namespace exports */
/*! export default [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_exports__, __webpack_require__.r, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => __WEBPACK_DEFAULT_EXPORT__
/* harmony export */ });


const transposeTable = {
  A: 'A0',
  a: 'a0',
  B: 'B0',
  C: 'C0',
  c: 'c0',
  D: 'D0',
  d: 'd0',
  E: 'E0',
  F: 'F0',
  f: 'f0',
  G: 'G0',
  g: 'g0',
  H: 'A0',
  h: 'a0',
  I: 'B0',
  J: 'C1',
  j: 'c1',
  K: 'D1',
  k: 'd1',
  L: 'E1',
  M: 'F1',
  m: 'f1',
  N: 'G1',
  n: 'g1',
  O: 'A1',
  o: 'a1',
  P: 'B1',
  Q: 'C2',
  q: 'c2',
  R: 'D2',
  r: 'd2',
  S: 'E2',
  T: 'F2',
  t: 'f2',
  U: 'G2',
  u: 'g2',
  V: 'A2',
  v: 'a2',
  W: 'B2',
  X: 'C3',
  x: 'c3',
  Y: 'D3',
  y: 'd3',
  Z: 'E3',
  // Catch e
  e: 'F0',
  l: 'F1',
  s: 'F2',
  z: 'F3',
  // Catch b
  b: 'C1',
  i: 'C1',
  p: 'C2',
  w: 'C3'
}

/*** EXPORTS FROM exports-loader ***/
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (transposeTable);


/***/ }),

/***/ "./node_modules/lz-string/libs/lz-string.js":
/*!**************************************************!*\
  !*** ./node_modules/lz-string/libs/lz-string.js ***!
  \**************************************************/
/*! unknown exports (runtime-defined) */
/*! runtime requirements: __webpack_require__, __webpack_exports__, module */
/***/ ((module, exports, __webpack_require__) => {

var __WEBPACK_AMD_DEFINE_RESULT__;// Copyright (c) 2013 Pieroxy <pieroxy@pieroxy.net>
// This work is free. You can redistribute it and/or modify it
// under the terms of the WTFPL, Version 2
// For more information see LICENSE.txt or http://www.wtfpl.net/
//
// For more information, the home page:
// http://pieroxy.net/blog/pages/lz-string/testing.html
//
// LZ-based compression algorithm, version 1.4.4
var LZString = (function() {

// private property
var f = String.fromCharCode;
var keyStrBase64 = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
var keyStrUriSafe = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+-$";
var baseReverseDic = {};

function getBaseValue(alphabet, character) {
  if (!baseReverseDic[alphabet]) {
    baseReverseDic[alphabet] = {};
    for (var i=0 ; i<alphabet.length ; i++) {
      baseReverseDic[alphabet][alphabet.charAt(i)] = i;
    }
  }
  return baseReverseDic[alphabet][character];
}

var LZString = {
  compressToBase64 : function (input) {
    if (input == null) return "";
    var res = LZString._compress(input, 6, function(a){return keyStrBase64.charAt(a);});
    switch (res.length % 4) { // To produce valid Base64
    default: // When could this happen ?
    case 0 : return res;
    case 1 : return res+"===";
    case 2 : return res+"==";
    case 3 : return res+"=";
    }
  },

  decompressFromBase64 : function (input) {
    if (input == null) return "";
    if (input == "") return null;
    return LZString._decompress(input.length, 32, function(index) { return getBaseValue(keyStrBase64, input.charAt(index)); });
  },

  compressToUTF16 : function (input) {
    if (input == null) return "";
    return LZString._compress(input, 15, function(a){return f(a+32);}) + " ";
  },

  decompressFromUTF16: function (compressed) {
    if (compressed == null) return "";
    if (compressed == "") return null;
    return LZString._decompress(compressed.length, 16384, function(index) { return compressed.charCodeAt(index) - 32; });
  },

  //compress into uint8array (UCS-2 big endian format)
  compressToUint8Array: function (uncompressed) {
    var compressed = LZString.compress(uncompressed);
    var buf=new Uint8Array(compressed.length*2); // 2 bytes per character

    for (var i=0, TotalLen=compressed.length; i<TotalLen; i++) {
      var current_value = compressed.charCodeAt(i);
      buf[i*2] = current_value >>> 8;
      buf[i*2+1] = current_value % 256;
    }
    return buf;
  },

  //decompress from uint8array (UCS-2 big endian format)
  decompressFromUint8Array:function (compressed) {
    if (compressed===null || compressed===undefined){
        return LZString.decompress(compressed);
    } else {
        var buf=new Array(compressed.length/2); // 2 bytes per character
        for (var i=0, TotalLen=buf.length; i<TotalLen; i++) {
          buf[i]=compressed[i*2]*256+compressed[i*2+1];
        }

        var result = [];
        buf.forEach(function (c) {
          result.push(f(c));
        });
        return LZString.decompress(result.join(''));

    }

  },


  //compress into a string that is already URI encoded
  compressToEncodedURIComponent: function (input) {
    if (input == null) return "";
    return LZString._compress(input, 6, function(a){return keyStrUriSafe.charAt(a);});
  },

  //decompress from an output of compressToEncodedURIComponent
  decompressFromEncodedURIComponent:function (input) {
    if (input == null) return "";
    if (input == "") return null;
    input = input.replace(/ /g, "+");
    return LZString._decompress(input.length, 32, function(index) { return getBaseValue(keyStrUriSafe, input.charAt(index)); });
  },

  compress: function (uncompressed) {
    return LZString._compress(uncompressed, 16, function(a){return f(a);});
  },
  _compress: function (uncompressed, bitsPerChar, getCharFromInt) {
    if (uncompressed == null) return "";
    var i, value,
        context_dictionary= {},
        context_dictionaryToCreate= {},
        context_c="",
        context_wc="",
        context_w="",
        context_enlargeIn= 2, // Compensate for the first entry which should not count
        context_dictSize= 3,
        context_numBits= 2,
        context_data=[],
        context_data_val=0,
        context_data_position=0,
        ii;

    for (ii = 0; ii < uncompressed.length; ii += 1) {
      context_c = uncompressed.charAt(ii);
      if (!Object.prototype.hasOwnProperty.call(context_dictionary,context_c)) {
        context_dictionary[context_c] = context_dictSize++;
        context_dictionaryToCreate[context_c] = true;
      }

      context_wc = context_w + context_c;
      if (Object.prototype.hasOwnProperty.call(context_dictionary,context_wc)) {
        context_w = context_wc;
      } else {
        if (Object.prototype.hasOwnProperty.call(context_dictionaryToCreate,context_w)) {
          if (context_w.charCodeAt(0)<256) {
            for (i=0 ; i<context_numBits ; i++) {
              context_data_val = (context_data_val << 1);
              if (context_data_position == bitsPerChar-1) {
                context_data_position = 0;
                context_data.push(getCharFromInt(context_data_val));
                context_data_val = 0;
              } else {
                context_data_position++;
              }
            }
            value = context_w.charCodeAt(0);
            for (i=0 ; i<8 ; i++) {
              context_data_val = (context_data_val << 1) | (value&1);
              if (context_data_position == bitsPerChar-1) {
                context_data_position = 0;
                context_data.push(getCharFromInt(context_data_val));
                context_data_val = 0;
              } else {
                context_data_position++;
              }
              value = value >> 1;
            }
          } else {
            value = 1;
            for (i=0 ; i<context_numBits ; i++) {
              context_data_val = (context_data_val << 1) | value;
              if (context_data_position ==bitsPerChar-1) {
                context_data_position = 0;
                context_data.push(getCharFromInt(context_data_val));
                context_data_val = 0;
              } else {
                context_data_position++;
              }
              value = 0;
            }
            value = context_w.charCodeAt(0);
            for (i=0 ; i<16 ; i++) {
              context_data_val = (context_data_val << 1) | (value&1);
              if (context_data_position == bitsPerChar-1) {
                context_data_position = 0;
                context_data.push(getCharFromInt(context_data_val));
                context_data_val = 0;
              } else {
                context_data_position++;
              }
              value = value >> 1;
            }
          }
          context_enlargeIn--;
          if (context_enlargeIn == 0) {
            context_enlargeIn = Math.pow(2, context_numBits);
            context_numBits++;
          }
          delete context_dictionaryToCreate[context_w];
        } else {
          value = context_dictionary[context_w];
          for (i=0 ; i<context_numBits ; i++) {
            context_data_val = (context_data_val << 1) | (value&1);
            if (context_data_position == bitsPerChar-1) {
              context_data_position = 0;
              context_data.push(getCharFromInt(context_data_val));
              context_data_val = 0;
            } else {
              context_data_position++;
            }
            value = value >> 1;
          }


        }
        context_enlargeIn--;
        if (context_enlargeIn == 0) {
          context_enlargeIn = Math.pow(2, context_numBits);
          context_numBits++;
        }
        // Add wc to the dictionary.
        context_dictionary[context_wc] = context_dictSize++;
        context_w = String(context_c);
      }
    }

    // Output the code for w.
    if (context_w !== "") {
      if (Object.prototype.hasOwnProperty.call(context_dictionaryToCreate,context_w)) {
        if (context_w.charCodeAt(0)<256) {
          for (i=0 ; i<context_numBits ; i++) {
            context_data_val = (context_data_val << 1);
            if (context_data_position == bitsPerChar-1) {
              context_data_position = 0;
              context_data.push(getCharFromInt(context_data_val));
              context_data_val = 0;
            } else {
              context_data_position++;
            }
          }
          value = context_w.charCodeAt(0);
          for (i=0 ; i<8 ; i++) {
            context_data_val = (context_data_val << 1) | (value&1);
            if (context_data_position == bitsPerChar-1) {
              context_data_position = 0;
              context_data.push(getCharFromInt(context_data_val));
              context_data_val = 0;
            } else {
              context_data_position++;
            }
            value = value >> 1;
          }
        } else {
          value = 1;
          for (i=0 ; i<context_numBits ; i++) {
            context_data_val = (context_data_val << 1) | value;
            if (context_data_position == bitsPerChar-1) {
              context_data_position = 0;
              context_data.push(getCharFromInt(context_data_val));
              context_data_val = 0;
            } else {
              context_data_position++;
            }
            value = 0;
          }
          value = context_w.charCodeAt(0);
          for (i=0 ; i<16 ; i++) {
            context_data_val = (context_data_val << 1) | (value&1);
            if (context_data_position == bitsPerChar-1) {
              context_data_position = 0;
              context_data.push(getCharFromInt(context_data_val));
              context_data_val = 0;
            } else {
              context_data_position++;
            }
            value = value >> 1;
          }
        }
        context_enlargeIn--;
        if (context_enlargeIn == 0) {
          context_enlargeIn = Math.pow(2, context_numBits);
          context_numBits++;
        }
        delete context_dictionaryToCreate[context_w];
      } else {
        value = context_dictionary[context_w];
        for (i=0 ; i<context_numBits ; i++) {
          context_data_val = (context_data_val << 1) | (value&1);
          if (context_data_position == bitsPerChar-1) {
            context_data_position = 0;
            context_data.push(getCharFromInt(context_data_val));
            context_data_val = 0;
          } else {
            context_data_position++;
          }
          value = value >> 1;
        }


      }
      context_enlargeIn--;
      if (context_enlargeIn == 0) {
        context_enlargeIn = Math.pow(2, context_numBits);
        context_numBits++;
      }
    }

    // Mark the end of the stream
    value = 2;
    for (i=0 ; i<context_numBits ; i++) {
      context_data_val = (context_data_val << 1) | (value&1);
      if (context_data_position == bitsPerChar-1) {
        context_data_position = 0;
        context_data.push(getCharFromInt(context_data_val));
        context_data_val = 0;
      } else {
        context_data_position++;
      }
      value = value >> 1;
    }

    // Flush the last char
    while (true) {
      context_data_val = (context_data_val << 1);
      if (context_data_position == bitsPerChar-1) {
        context_data.push(getCharFromInt(context_data_val));
        break;
      }
      else context_data_position++;
    }
    return context_data.join('');
  },

  decompress: function (compressed) {
    if (compressed == null) return "";
    if (compressed == "") return null;
    return LZString._decompress(compressed.length, 32768, function(index) { return compressed.charCodeAt(index); });
  },

  _decompress: function (length, resetValue, getNextValue) {
    var dictionary = [],
        next,
        enlargeIn = 4,
        dictSize = 4,
        numBits = 3,
        entry = "",
        result = [],
        i,
        w,
        bits, resb, maxpower, power,
        c,
        data = {val:getNextValue(0), position:resetValue, index:1};

    for (i = 0; i < 3; i += 1) {
      dictionary[i] = i;
    }

    bits = 0;
    maxpower = Math.pow(2,2);
    power=1;
    while (power!=maxpower) {
      resb = data.val & data.position;
      data.position >>= 1;
      if (data.position == 0) {
        data.position = resetValue;
        data.val = getNextValue(data.index++);
      }
      bits |= (resb>0 ? 1 : 0) * power;
      power <<= 1;
    }

    switch (next = bits) {
      case 0:
          bits = 0;
          maxpower = Math.pow(2,8);
          power=1;
          while (power!=maxpower) {
            resb = data.val & data.position;
            data.position >>= 1;
            if (data.position == 0) {
              data.position = resetValue;
              data.val = getNextValue(data.index++);
            }
            bits |= (resb>0 ? 1 : 0) * power;
            power <<= 1;
          }
        c = f(bits);
        break;
      case 1:
          bits = 0;
          maxpower = Math.pow(2,16);
          power=1;
          while (power!=maxpower) {
            resb = data.val & data.position;
            data.position >>= 1;
            if (data.position == 0) {
              data.position = resetValue;
              data.val = getNextValue(data.index++);
            }
            bits |= (resb>0 ? 1 : 0) * power;
            power <<= 1;
          }
        c = f(bits);
        break;
      case 2:
        return "";
    }
    dictionary[3] = c;
    w = c;
    result.push(c);
    while (true) {
      if (data.index > length) {
        return "";
      }

      bits = 0;
      maxpower = Math.pow(2,numBits);
      power=1;
      while (power!=maxpower) {
        resb = data.val & data.position;
        data.position >>= 1;
        if (data.position == 0) {
          data.position = resetValue;
          data.val = getNextValue(data.index++);
        }
        bits |= (resb>0 ? 1 : 0) * power;
        power <<= 1;
      }

      switch (c = bits) {
        case 0:
          bits = 0;
          maxpower = Math.pow(2,8);
          power=1;
          while (power!=maxpower) {
            resb = data.val & data.position;
            data.position >>= 1;
            if (data.position == 0) {
              data.position = resetValue;
              data.val = getNextValue(data.index++);
            }
            bits |= (resb>0 ? 1 : 0) * power;
            power <<= 1;
          }

          dictionary[dictSize++] = f(bits);
          c = dictSize-1;
          enlargeIn--;
          break;
        case 1:
          bits = 0;
          maxpower = Math.pow(2,16);
          power=1;
          while (power!=maxpower) {
            resb = data.val & data.position;
            data.position >>= 1;
            if (data.position == 0) {
              data.position = resetValue;
              data.val = getNextValue(data.index++);
            }
            bits |= (resb>0 ? 1 : 0) * power;
            power <<= 1;
          }
          dictionary[dictSize++] = f(bits);
          c = dictSize-1;
          enlargeIn--;
          break;
        case 2:
          return result.join('');
      }

      if (enlargeIn == 0) {
        enlargeIn = Math.pow(2, numBits);
        numBits++;
      }

      if (dictionary[c]) {
        entry = dictionary[c];
      } else {
        if (c === dictSize) {
          entry = w + w.charAt(0);
        } else {
          return null;
        }
      }
      result.push(entry);

      // Add w+entry[0] to the dictionary.
      dictionary[dictSize++] = w + entry.charAt(0);
      enlargeIn--;

      w = entry;

      if (enlargeIn == 0) {
        enlargeIn = Math.pow(2, numBits);
        numBits++;
      }

    }
  }
};
  return LZString;
})();

if (true) {
  !(__WEBPACK_AMD_DEFINE_RESULT__ = (function () { return LZString; }).call(exports, __webpack_require__, exports, module),
		__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
} else {}


/***/ }),

/***/ "./orca.js":
/*!*****************!*\
  !*** ./orca.js ***!
  \*****************/
/*! namespace exports */
/*! exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__, __webpack_require__.n, __webpack_require__.r, __webpack_exports__, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _orca_desktop_sources_scripts_client__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./orca/desktop/sources/scripts/client */ "./orca/desktop/sources/scripts/client.js");
/* harmony import */ var lz_string__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! lz-string */ "./node_modules/lz-string/libs/lz-string.js");
/* harmony import */ var lz_string__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(lz_string__WEBPACK_IMPORTED_MODULE_1__);



const client = (window.client = new _orca_desktop_sources_scripts_client__WEBPACK_IMPORTED_MODULE_0__.default());

// Expose a function to be called from the parent
window.start = () => {
  client.install(document.body);
  client.start();

  // Read compressed orca file from URL
  let code;
  let hash = window.top.location.hash.slice(1);
  if (hash.length) {
    try {
      code = lz_string__WEBPACK_IMPORTED_MODULE_1___default().decompressFromEncodedURIComponent(hash);
      client.whenOpen("", code);
    } catch (e) {}
  }

  document.addEventListener("keyup", (e) => {
    const newCode = client.orca.toString();
    if (newCode !== code) {
      code = newCode;
      hash = lz_string__WEBPACK_IMPORTED_MODULE_1___default().compressToEncodedURIComponent(code);
      window.top.history.replaceState(undefined, undefined, `#${hash}`);
    }
  });
};


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		if(__webpack_module_cache__[moduleId]) {
/******/ 			return __webpack_module_cache__[moduleId].exports;
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
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => module['default'] :
/******/ 				() => module;
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
/******/ 		__webpack_require__.o = (obj, prop) => Object.prototype.hasOwnProperty.call(obj, prop)
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
/************************************************************************/
/******/ 	// startup
/******/ 	// Load entry module
/******/ 	__webpack_require__("./orca.js");
/******/ 	// This entry module used 'exports' so it can't be inlined
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9vcmNhLnd0Zi8uL2Jyb3dzZXIvYnVmZmVyLmpzIiwid2VicGFjazovL29yY2Eud3RmLy4vYnJvd3Nlci9kZ3JhbS5qcyIsIndlYnBhY2s6Ly9vcmNhLnd0Zi8uL2Jyb3dzZXIvZWxlY3Ryb24uanMiLCJ3ZWJwYWNrOi8vb3JjYS53dGYvLi9icm93c2VyL25vZGUtb3NjLmpzIiwid2VicGFjazovL29yY2Eud3RmLy4vbm9kZV9tb2R1bGVzL2V2ZW50cy9ldmVudHMuanMiLCJ3ZWJwYWNrOi8vb3JjYS53dGYvLi9vcmNhL2Rlc2t0b3Avc291cmNlcy9zY3JpcHRzL2NvcmUvaW8vY2MuanMiLCJ3ZWJwYWNrOi8vb3JjYS53dGYvLi9vcmNhL2Rlc2t0b3Avc291cmNlcy9zY3JpcHRzL2xpYi9hY2Vscy5qcyIsIndlYnBhY2s6Ly9vcmNhLnd0Zi8uL29yY2EvZGVza3RvcC9zb3VyY2VzL3NjcmlwdHMvbGliL2hpc3RvcnkuanMiLCJ3ZWJwYWNrOi8vb3JjYS53dGYvLi9vcmNhL2Rlc2t0b3Avc291cmNlcy9zY3JpcHRzL2xpYi9zb3VyY2UuanMiLCJ3ZWJwYWNrOi8vb3JjYS53dGYvLi9vcmNhL2Rlc2t0b3Avc291cmNlcy9zY3JpcHRzL2xpYi90aGVtZS5qcyIsIndlYnBhY2s6Ly9vcmNhLnd0Zi8uL29yY2EvZGVza3RvcC9zb3VyY2VzL3NjcmlwdHMvY2xpZW50LmpzIiwid2VicGFjazovL29yY2Eud3RmLy4vb3JjYS9kZXNrdG9wL3NvdXJjZXMvc2NyaXB0cy9jbG9jay5qcyIsIndlYnBhY2s6Ly9vcmNhLnd0Zi8uL29yY2EvZGVza3RvcC9zb3VyY2VzL3NjcmlwdHMvY29tbWFuZGVyLmpzIiwid2VicGFjazovL29yY2Eud3RmLy4vb3JjYS9kZXNrdG9wL3NvdXJjZXMvc2NyaXB0cy9jdXJzb3IuanMiLCJ3ZWJwYWNrOi8vb3JjYS53dGYvLi9vcmNhL2Rlc2t0b3Avc291cmNlcy9zY3JpcHRzL2NvcmUvaW8vbWlkaS5qcyIsIndlYnBhY2s6Ly9vcmNhLnd0Zi8uL29yY2EvZGVza3RvcC9zb3VyY2VzL3NjcmlwdHMvY29yZS9pby9tb25vLmpzIiwid2VicGFjazovL29yY2Eud3RmLy4vb3JjYS9kZXNrdG9wL3NvdXJjZXMvc2NyaXB0cy9jb3JlL2lvL29zYy5qcyIsIndlYnBhY2s6Ly9vcmNhLnd0Zi8uL29yY2EvZGVza3RvcC9zb3VyY2VzL3NjcmlwdHMvY29yZS9pby91ZHAuanMiLCJ3ZWJwYWNrOi8vb3JjYS53dGYvLi9vcmNhL2Rlc2t0b3Avc291cmNlcy9zY3JpcHRzL2NvcmUvaW8uanMiLCJ3ZWJwYWNrOi8vb3JjYS53dGYvLi9vcmNhL2Rlc2t0b3Avc291cmNlcy9zY3JpcHRzL2NvcmUvbGlicmFyeS5qcyIsIndlYnBhY2s6Ly9vcmNhLnd0Zi8uL29yY2EvZGVza3RvcC9zb3VyY2VzL3NjcmlwdHMvY29yZS9vcGVyYXRvci5qcyIsIndlYnBhY2s6Ly9vcmNhLnd0Zi8uL29yY2EvZGVza3RvcC9zb3VyY2VzL3NjcmlwdHMvY29yZS9vcmNhLmpzIiwid2VicGFjazovL29yY2Eud3RmLy4vb3JjYS9kZXNrdG9wL3NvdXJjZXMvc2NyaXB0cy9jb3JlL3RyYW5zcG9zZS5qcyIsIndlYnBhY2s6Ly9vcmNhLnd0Zi8uL25vZGVfbW9kdWxlcy9sei1zdHJpbmcvbGlicy9sei1zdHJpbmcuanMiLCJ3ZWJwYWNrOi8vb3JjYS53dGYvLi9vcmNhLmpzIiwid2VicGFjazovL29yY2Eud3RmL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL29yY2Eud3RmL3dlYnBhY2svcnVudGltZS9jb21wYXQgZ2V0IGRlZmF1bHQgZXhwb3J0Iiwid2VicGFjazovL29yY2Eud3RmL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9vcmNhLnd0Zi93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL29yY2Eud3RmL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBv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LGFBQWEsOEVBQXNDO0FBQ25ELGdFQUFnRSxLQUFLO0FBQ3JFO0FBQ0EsR0FBRztBQUNIOzs7Ozs7O1VDNUJBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBOztVQUVBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBOzs7OztXQ3JCQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EsZ0NBQWdDLFlBQVk7V0FDNUM7V0FDQSxFOzs7OztXQ1BBO1dBQ0E7V0FDQTtXQUNBO1dBQ0Esd0NBQXdDLHlDQUF5QztXQUNqRjtXQUNBO1dBQ0EsRTs7Ozs7V0NQQSxzRjs7Ozs7V0NBQTtXQUNBO1dBQ0E7V0FDQSxzREFBc0Qsa0JBQWtCO1dBQ3hFO1dBQ0EsK0NBQStDLGNBQWM7V0FDN0QsRTs7OztVQ05BO1VBQ0E7VUFDQTtVQUNBIiwiZmlsZSI6Im9yY2EuanMiLCJzb3VyY2VzQ29udGVudCI6WyJtb2R1bGUuZXhwb3J0cyA9IHtcbiAgZnJvbTogKHMpID0+IHMsXG59O1xuIiwidmFyIEV2ZW50RW1pdHRlciA9IHJlcXVpcmUoXCJldmVudHNcIik7XG5cbmxldCBwb3J0cyA9IHdpbmRvdy50b3AucG9ydHM7XG5pZiAoIXBvcnRzKSB7XG4gIHBvcnRzID0gd2luZG93LnRvcC5wb3J0cyA9IHt9O1xufVxuXG5jbGFzcyBTb2NrZXQgZXh0ZW5kcyBFdmVudEVtaXR0ZXIge1xuICBiaW5kKHBvcnQpIHtcbiAgICB0aGlzLnBvcnQgPSBwb3J0O1xuICAgIHBvcnRzW3BvcnRdID0gdGhpcztcbiAgICB0aGlzLmVtaXQoXCJsaXN0ZW5pbmdcIik7XG4gIH1cbiAgYWRkcmVzcygpIHtcbiAgICByZXR1cm4ge1xuICAgICAgYWRkcmVzczogXCIwLjAuMC4wXCIsXG4gICAgICBwb3J0OiB0aGlzLnBvcnQsXG4gICAgfTtcbiAgfVxuICBzZW5kKGJ1ZiwgcG9ydCwgaXAsIG9uRXJyb3IpIHtcbiAgICBjb25zdCB0YXJnZXQgPSBwb3J0c1twb3J0XTtcbiAgICBpZiAoIXRhcmdldCkgb25FcnJvcihuZXcgRXJyb3IoXCJVbmFibGUgdG8gY29ubmVjdFwiKSk7XG4gICAgdGFyZ2V0LmVtaXQoXCJtZXNzYWdlXCIsIGJ1Zik7XG4gIH1cbiAgY2xvc2UoKSB7XG4gICAgdGhpcy5yZW1vdmVBbGxMaXN0ZW5lcnMoKTtcbiAgICBpZiAodGhpcy5wb3J0ICYmIHBvcnRzW3RoaXMucG9ydF0gPT09IHRoaXMpIHtcbiAgICAgIGRlbGV0ZSBwb3J0c1t0aGlzLnBvcnRdO1xuICAgIH1cbiAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgY3JlYXRlU29ja2V0KCkge1xuICAgIHJldHVybiBuZXcgU29ja2V0KCk7XG4gIH0sXG59O1xuIiwibW9kdWxlLmV4cG9ydHMgPSB7XG4gIHJlbW90ZToge1xuICAgIGRpYWxvZzoge30sXG4gIH0sXG59O1xuIiwibW9kdWxlLmV4cG9ydHMgPSBmYWxzZTtcbiIsIi8vIENvcHlyaWdodCBKb3llbnQsIEluYy4gYW5kIG90aGVyIE5vZGUgY29udHJpYnV0b3JzLlxuLy9cbi8vIFBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uIG9idGFpbmluZyBhXG4vLyBjb3B5IG9mIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZG9jdW1lbnRhdGlvbiBmaWxlcyAodGhlXG4vLyBcIlNvZnR3YXJlXCIpLCB0byBkZWFsIGluIHRoZSBTb2Z0d2FyZSB3aXRob3V0IHJlc3RyaWN0aW9uLCBpbmNsdWRpbmdcbi8vIHdpdGhvdXQgbGltaXRhdGlvbiB0aGUgcmlnaHRzIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBtZXJnZSwgcHVibGlzaCxcbi8vIGRpc3RyaWJ1dGUsIHN1YmxpY2Vuc2UsIGFuZC9vciBzZWxsIGNvcGllcyBvZiB0aGUgU29mdHdhcmUsIGFuZCB0byBwZXJtaXRcbi8vIHBlcnNvbnMgdG8gd2hvbSB0aGUgU29mdHdhcmUgaXMgZnVybmlzaGVkIHRvIGRvIHNvLCBzdWJqZWN0IHRvIHRoZVxuLy8gZm9sbG93aW5nIGNvbmRpdGlvbnM6XG4vL1xuLy8gVGhlIGFib3ZlIGNvcHlyaWdodCBub3RpY2UgYW5kIHRoaXMgcGVybWlzc2lvbiBub3RpY2Ugc2hhbGwgYmUgaW5jbHVkZWRcbi8vIGluIGFsbCBjb3BpZXMgb3Igc3Vic3RhbnRpYWwgcG9ydGlvbnMgb2YgdGhlIFNvZnR3YXJlLlxuLy9cbi8vIFRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIsIFdJVEhPVVQgV0FSUkFOVFkgT0YgQU5ZIEtJTkQsIEVYUFJFU1Ncbi8vIE9SIElNUExJRUQsIElOQ0xVRElORyBCVVQgTk9UIExJTUlURUQgVE8gVEhFIFdBUlJBTlRJRVMgT0Zcbi8vIE1FUkNIQU5UQUJJTElUWSwgRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQU5EIE5PTklORlJJTkdFTUVOVC4gSU5cbi8vIE5PIEVWRU5UIFNIQUxMIFRIRSBBVVRIT1JTIE9SIENPUFlSSUdIVCBIT0xERVJTIEJFIExJQUJMRSBGT1IgQU5ZIENMQUlNLFxuLy8gREFNQUdFUyBPUiBPVEhFUiBMSUFCSUxJVFksIFdIRVRIRVIgSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBUT1JUIE9SXG4vLyBPVEhFUldJU0UsIEFSSVNJTkcgRlJPTSwgT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgU09GVFdBUkUgT1IgVEhFXG4vLyBVU0UgT1IgT1RIRVIgREVBTElOR1MgSU4gVEhFIFNPRlRXQVJFLlxuXG4ndXNlIHN0cmljdCc7XG5cbnZhciBSID0gdHlwZW9mIFJlZmxlY3QgPT09ICdvYmplY3QnID8gUmVmbGVjdCA6IG51bGxcbnZhciBSZWZsZWN0QXBwbHkgPSBSICYmIHR5cGVvZiBSLmFwcGx5ID09PSAnZnVuY3Rpb24nXG4gID8gUi5hcHBseVxuICA6IGZ1bmN0aW9uIFJlZmxlY3RBcHBseSh0YXJnZXQsIHJlY2VpdmVyLCBhcmdzKSB7XG4gICAgcmV0dXJuIEZ1bmN0aW9uLnByb3RvdHlwZS5hcHBseS5jYWxsKHRhcmdldCwgcmVjZWl2ZXIsIGFyZ3MpO1xuICB9XG5cbnZhciBSZWZsZWN0T3duS2V5c1xuaWYgKFIgJiYgdHlwZW9mIFIub3duS2V5cyA9PT0gJ2Z1bmN0aW9uJykge1xuICBSZWZsZWN0T3duS2V5cyA9IFIub3duS2V5c1xufSBlbHNlIGlmIChPYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzKSB7XG4gIFJlZmxlY3RPd25LZXlzID0gZnVuY3Rpb24gUmVmbGVjdE93bktleXModGFyZ2V0KSB7XG4gICAgcmV0dXJuIE9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzKHRhcmdldClcbiAgICAgIC5jb25jYXQoT2JqZWN0LmdldE93blByb3BlcnR5U3ltYm9scyh0YXJnZXQpKTtcbiAgfTtcbn0gZWxzZSB7XG4gIFJlZmxlY3RPd25LZXlzID0gZnVuY3Rpb24gUmVmbGVjdE93bktleXModGFyZ2V0KSB7XG4gICAgcmV0dXJuIE9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzKHRhcmdldCk7XG4gIH07XG59XG5cbmZ1bmN0aW9uIFByb2Nlc3NFbWl0V2FybmluZyh3YXJuaW5nKSB7XG4gIGlmIChjb25zb2xlICYmIGNvbnNvbGUud2FybikgY29uc29sZS53YXJuKHdhcm5pbmcpO1xufVxuXG52YXIgTnVtYmVySXNOYU4gPSBOdW1iZXIuaXNOYU4gfHwgZnVuY3Rpb24gTnVtYmVySXNOYU4odmFsdWUpIHtcbiAgcmV0dXJuIHZhbHVlICE9PSB2YWx1ZTtcbn1cblxuZnVuY3Rpb24gRXZlbnRFbWl0dGVyKCkge1xuICBFdmVudEVtaXR0ZXIuaW5pdC5jYWxsKHRoaXMpO1xufVxubW9kdWxlLmV4cG9ydHMgPSBFdmVudEVtaXR0ZXI7XG5tb2R1bGUuZXhwb3J0cy5vbmNlID0gb25jZTtcblxuLy8gQmFja3dhcmRzLWNvbXBhdCB3aXRoIG5vZGUgMC4xMC54XG5FdmVudEVtaXR0ZXIuRXZlbnRFbWl0dGVyID0gRXZlbnRFbWl0dGVyO1xuXG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLl9ldmVudHMgPSB1bmRlZmluZWQ7XG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLl9ldmVudHNDb3VudCA9IDA7XG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLl9tYXhMaXN0ZW5lcnMgPSB1bmRlZmluZWQ7XG5cbi8vIEJ5IGRlZmF1bHQgRXZlbnRFbWl0dGVycyB3aWxsIHByaW50IGEgd2FybmluZyBpZiBtb3JlIHRoYW4gMTAgbGlzdGVuZXJzIGFyZVxuLy8gYWRkZWQgdG8gaXQuIFRoaXMgaXMgYSB1c2VmdWwgZGVmYXVsdCB3aGljaCBoZWxwcyBmaW5kaW5nIG1lbW9yeSBsZWFrcy5cbnZhciBkZWZhdWx0TWF4TGlzdGVuZXJzID0gMTA7XG5cbmZ1bmN0aW9uIGNoZWNrTGlzdGVuZXIobGlzdGVuZXIpIHtcbiAgaWYgKHR5cGVvZiBsaXN0ZW5lciAhPT0gJ2Z1bmN0aW9uJykge1xuICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ1RoZSBcImxpc3RlbmVyXCIgYXJndW1lbnQgbXVzdCBiZSBvZiB0eXBlIEZ1bmN0aW9uLiBSZWNlaXZlZCB0eXBlICcgKyB0eXBlb2YgbGlzdGVuZXIpO1xuICB9XG59XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShFdmVudEVtaXR0ZXIsICdkZWZhdWx0TWF4TGlzdGVuZXJzJywge1xuICBlbnVtZXJhYmxlOiB0cnVlLFxuICBnZXQ6IGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiBkZWZhdWx0TWF4TGlzdGVuZXJzO1xuICB9LFxuICBzZXQ6IGZ1bmN0aW9uKGFyZykge1xuICAgIGlmICh0eXBlb2YgYXJnICE9PSAnbnVtYmVyJyB8fCBhcmcgPCAwIHx8IE51bWJlcklzTmFOKGFyZykpIHtcbiAgICAgIHRocm93IG5ldyBSYW5nZUVycm9yKCdUaGUgdmFsdWUgb2YgXCJkZWZhdWx0TWF4TGlzdGVuZXJzXCIgaXMgb3V0IG9mIHJhbmdlLiBJdCBtdXN0IGJlIGEgbm9uLW5lZ2F0aXZlIG51bWJlci4gUmVjZWl2ZWQgJyArIGFyZyArICcuJyk7XG4gICAgfVxuICAgIGRlZmF1bHRNYXhMaXN0ZW5lcnMgPSBhcmc7XG4gIH1cbn0pO1xuXG5FdmVudEVtaXR0ZXIuaW5pdCA9IGZ1bmN0aW9uKCkge1xuXG4gIGlmICh0aGlzLl9ldmVudHMgPT09IHVuZGVmaW5lZCB8fFxuICAgICAgdGhpcy5fZXZlbnRzID09PSBPYmplY3QuZ2V0UHJvdG90eXBlT2YodGhpcykuX2V2ZW50cykge1xuICAgIHRoaXMuX2V2ZW50cyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gICAgdGhpcy5fZXZlbnRzQ291bnQgPSAwO1xuICB9XG5cbiAgdGhpcy5fbWF4TGlzdGVuZXJzID0gdGhpcy5fbWF4TGlzdGVuZXJzIHx8IHVuZGVmaW5lZDtcbn07XG5cbi8vIE9idmlvdXNseSBub3QgYWxsIEVtaXR0ZXJzIHNob3VsZCBiZSBsaW1pdGVkIHRvIDEwLiBUaGlzIGZ1bmN0aW9uIGFsbG93c1xuLy8gdGhhdCB0byBiZSBpbmNyZWFzZWQuIFNldCB0byB6ZXJvIGZvciB1bmxpbWl0ZWQuXG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLnNldE1heExpc3RlbmVycyA9IGZ1bmN0aW9uIHNldE1heExpc3RlbmVycyhuKSB7XG4gIGlmICh0eXBlb2YgbiAhPT0gJ251bWJlcicgfHwgbiA8IDAgfHwgTnVtYmVySXNOYU4obikpIHtcbiAgICB0aHJvdyBuZXcgUmFuZ2VFcnJvcignVGhlIHZhbHVlIG9mIFwiblwiIGlzIG91dCBvZiByYW5nZS4gSXQgbXVzdCBiZSBhIG5vbi1uZWdhdGl2ZSBudW1iZXIuIFJlY2VpdmVkICcgKyBuICsgJy4nKTtcbiAgfVxuICB0aGlzLl9tYXhMaXN0ZW5lcnMgPSBuO1xuICByZXR1cm4gdGhpcztcbn07XG5cbmZ1bmN0aW9uIF9nZXRNYXhMaXN0ZW5lcnModGhhdCkge1xuICBpZiAodGhhdC5fbWF4TGlzdGVuZXJzID09PSB1bmRlZmluZWQpXG4gICAgcmV0dXJuIEV2ZW50RW1pdHRlci5kZWZhdWx0TWF4TGlzdGVuZXJzO1xuICByZXR1cm4gdGhhdC5fbWF4TGlzdGVuZXJzO1xufVxuXG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLmdldE1heExpc3RlbmVycyA9IGZ1bmN0aW9uIGdldE1heExpc3RlbmVycygpIHtcbiAgcmV0dXJuIF9nZXRNYXhMaXN0ZW5lcnModGhpcyk7XG59O1xuXG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLmVtaXQgPSBmdW5jdGlvbiBlbWl0KHR5cGUpIHtcbiAgdmFyIGFyZ3MgPSBbXTtcbiAgZm9yICh2YXIgaSA9IDE7IGkgPCBhcmd1bWVudHMubGVuZ3RoOyBpKyspIGFyZ3MucHVzaChhcmd1bWVudHNbaV0pO1xuICB2YXIgZG9FcnJvciA9ICh0eXBlID09PSAnZXJyb3InKTtcblxuICB2YXIgZXZlbnRzID0gdGhpcy5fZXZlbnRzO1xuICBpZiAoZXZlbnRzICE9PSB1bmRlZmluZWQpXG4gICAgZG9FcnJvciA9IChkb0Vycm9yICYmIGV2ZW50cy5lcnJvciA9PT0gdW5kZWZpbmVkKTtcbiAgZWxzZSBpZiAoIWRvRXJyb3IpXG4gICAgcmV0dXJuIGZhbHNlO1xuXG4gIC8vIElmIHRoZXJlIGlzIG5vICdlcnJvcicgZXZlbnQgbGlzdGVuZXIgdGhlbiB0aHJvdy5cbiAgaWYgKGRvRXJyb3IpIHtcbiAgICB2YXIgZXI7XG4gICAgaWYgKGFyZ3MubGVuZ3RoID4gMClcbiAgICAgIGVyID0gYXJnc1swXTtcbiAgICBpZiAoZXIgaW5zdGFuY2VvZiBFcnJvcikge1xuICAgICAgLy8gTm90ZTogVGhlIGNvbW1lbnRzIG9uIHRoZSBgdGhyb3dgIGxpbmVzIGFyZSBpbnRlbnRpb25hbCwgdGhleSBzaG93XG4gICAgICAvLyB1cCBpbiBOb2RlJ3Mgb3V0cHV0IGlmIHRoaXMgcmVzdWx0cyBpbiBhbiB1bmhhbmRsZWQgZXhjZXB0aW9uLlxuICAgICAgdGhyb3cgZXI7IC8vIFVuaGFuZGxlZCAnZXJyb3InIGV2ZW50XG4gICAgfVxuICAgIC8vIEF0IGxlYXN0IGdpdmUgc29tZSBraW5kIG9mIGNvbnRleHQgdG8gdGhlIHVzZXJcbiAgICB2YXIgZXJyID0gbmV3IEVycm9yKCdVbmhhbmRsZWQgZXJyb3IuJyArIChlciA/ICcgKCcgKyBlci5tZXNzYWdlICsgJyknIDogJycpKTtcbiAgICBlcnIuY29udGV4dCA9IGVyO1xuICAgIHRocm93IGVycjsgLy8gVW5oYW5kbGVkICdlcnJvcicgZXZlbnRcbiAgfVxuXG4gIHZhciBoYW5kbGVyID0gZXZlbnRzW3R5cGVdO1xuXG4gIGlmIChoYW5kbGVyID09PSB1bmRlZmluZWQpXG4gICAgcmV0dXJuIGZhbHNlO1xuXG4gIGlmICh0eXBlb2YgaGFuZGxlciA9PT0gJ2Z1bmN0aW9uJykge1xuICAgIFJlZmxlY3RBcHBseShoYW5kbGVyLCB0aGlzLCBhcmdzKTtcbiAgfSBlbHNlIHtcbiAgICB2YXIgbGVuID0gaGFuZGxlci5sZW5ndGg7XG4gICAgdmFyIGxpc3RlbmVycyA9IGFycmF5Q2xvbmUoaGFuZGxlciwgbGVuKTtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGxlbjsgKytpKVxuICAgICAgUmVmbGVjdEFwcGx5KGxpc3RlbmVyc1tpXSwgdGhpcywgYXJncyk7XG4gIH1cblxuICByZXR1cm4gdHJ1ZTtcbn07XG5cbmZ1bmN0aW9uIF9hZGRMaXN0ZW5lcih0YXJnZXQsIHR5cGUsIGxpc3RlbmVyLCBwcmVwZW5kKSB7XG4gIHZhciBtO1xuICB2YXIgZXZlbnRzO1xuICB2YXIgZXhpc3Rpbmc7XG5cbiAgY2hlY2tMaXN0ZW5lcihsaXN0ZW5lcik7XG5cbiAgZXZlbnRzID0gdGFyZ2V0Ll9ldmVudHM7XG4gIGlmIChldmVudHMgPT09IHVuZGVmaW5lZCkge1xuICAgIGV2ZW50cyA9IHRhcmdldC5fZXZlbnRzID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiAgICB0YXJnZXQuX2V2ZW50c0NvdW50ID0gMDtcbiAgfSBlbHNlIHtcbiAgICAvLyBUbyBhdm9pZCByZWN1cnNpb24gaW4gdGhlIGNhc2UgdGhhdCB0eXBlID09PSBcIm5ld0xpc3RlbmVyXCIhIEJlZm9yZVxuICAgIC8vIGFkZGluZyBpdCB0byB0aGUgbGlzdGVuZXJzLCBmaXJzdCBlbWl0IFwibmV3TGlzdGVuZXJcIi5cbiAgICBpZiAoZXZlbnRzLm5ld0xpc3RlbmVyICE9PSB1bmRlZmluZWQpIHtcbiAgICAgIHRhcmdldC5lbWl0KCduZXdMaXN0ZW5lcicsIHR5cGUsXG4gICAgICAgICAgICAgICAgICBsaXN0ZW5lci5saXN0ZW5lciA/IGxpc3RlbmVyLmxpc3RlbmVyIDogbGlzdGVuZXIpO1xuXG4gICAgICAvLyBSZS1hc3NpZ24gYGV2ZW50c2AgYmVjYXVzZSBhIG5ld0xpc3RlbmVyIGhhbmRsZXIgY291bGQgaGF2ZSBjYXVzZWQgdGhlXG4gICAgICAvLyB0aGlzLl9ldmVudHMgdG8gYmUgYXNzaWduZWQgdG8gYSBuZXcgb2JqZWN0XG4gICAgICBldmVudHMgPSB0YXJnZXQuX2V2ZW50cztcbiAgICB9XG4gICAgZXhpc3RpbmcgPSBldmVudHNbdHlwZV07XG4gIH1cblxuICBpZiAoZXhpc3RpbmcgPT09IHVuZGVmaW5lZCkge1xuICAgIC8vIE9wdGltaXplIHRoZSBjYXNlIG9mIG9uZSBsaXN0ZW5lci4gRG9uJ3QgbmVlZCB0aGUgZXh0cmEgYXJyYXkgb2JqZWN0LlxuICAgIGV4aXN0aW5nID0gZXZlbnRzW3R5cGVdID0gbGlzdGVuZXI7XG4gICAgKyt0YXJnZXQuX2V2ZW50c0NvdW50O1xuICB9IGVsc2Uge1xuICAgIGlmICh0eXBlb2YgZXhpc3RpbmcgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgIC8vIEFkZGluZyB0aGUgc2Vjb25kIGVsZW1lbnQsIG5lZWQgdG8gY2hhbmdlIHRvIGFycmF5LlxuICAgICAgZXhpc3RpbmcgPSBldmVudHNbdHlwZV0gPVxuICAgICAgICBwcmVwZW5kID8gW2xpc3RlbmVyLCBleGlzdGluZ10gOiBbZXhpc3RpbmcsIGxpc3RlbmVyXTtcbiAgICAgIC8vIElmIHdlJ3ZlIGFscmVhZHkgZ290IGFuIGFycmF5LCBqdXN0IGFwcGVuZC5cbiAgICB9IGVsc2UgaWYgKHByZXBlbmQpIHtcbiAgICAgIGV4aXN0aW5nLnVuc2hpZnQobGlzdGVuZXIpO1xuICAgIH0gZWxzZSB7XG4gICAgICBleGlzdGluZy5wdXNoKGxpc3RlbmVyKTtcbiAgICB9XG5cbiAgICAvLyBDaGVjayBmb3IgbGlzdGVuZXIgbGVha1xuICAgIG0gPSBfZ2V0TWF4TGlzdGVuZXJzKHRhcmdldCk7XG4gICAgaWYgKG0gPiAwICYmIGV4aXN0aW5nLmxlbmd0aCA+IG0gJiYgIWV4aXN0aW5nLndhcm5lZCkge1xuICAgICAgZXhpc3Rpbmcud2FybmVkID0gdHJ1ZTtcbiAgICAgIC8vIE5vIGVycm9yIGNvZGUgZm9yIHRoaXMgc2luY2UgaXQgaXMgYSBXYXJuaW5nXG4gICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tcmVzdHJpY3RlZC1zeW50YXhcbiAgICAgIHZhciB3ID0gbmV3IEVycm9yKCdQb3NzaWJsZSBFdmVudEVtaXR0ZXIgbWVtb3J5IGxlYWsgZGV0ZWN0ZWQuICcgK1xuICAgICAgICAgICAgICAgICAgICAgICAgICBleGlzdGluZy5sZW5ndGggKyAnICcgKyBTdHJpbmcodHlwZSkgKyAnIGxpc3RlbmVycyAnICtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgJ2FkZGVkLiBVc2UgZW1pdHRlci5zZXRNYXhMaXN0ZW5lcnMoKSB0byAnICtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgJ2luY3JlYXNlIGxpbWl0Jyk7XG4gICAgICB3Lm5hbWUgPSAnTWF4TGlzdGVuZXJzRXhjZWVkZWRXYXJuaW5nJztcbiAgICAgIHcuZW1pdHRlciA9IHRhcmdldDtcbiAgICAgIHcudHlwZSA9IHR5cGU7XG4gICAgICB3LmNvdW50ID0gZXhpc3RpbmcubGVuZ3RoO1xuICAgICAgUHJvY2Vzc0VtaXRXYXJuaW5nKHcpO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiB0YXJnZXQ7XG59XG5cbkV2ZW50RW1pdHRlci5wcm90b3R5cGUuYWRkTGlzdGVuZXIgPSBmdW5jdGlvbiBhZGRMaXN0ZW5lcih0eXBlLCBsaXN0ZW5lcikge1xuICByZXR1cm4gX2FkZExpc3RlbmVyKHRoaXMsIHR5cGUsIGxpc3RlbmVyLCBmYWxzZSk7XG59O1xuXG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLm9uID0gRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5hZGRMaXN0ZW5lcjtcblxuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5wcmVwZW5kTGlzdGVuZXIgPVxuICAgIGZ1bmN0aW9uIHByZXBlbmRMaXN0ZW5lcih0eXBlLCBsaXN0ZW5lcikge1xuICAgICAgcmV0dXJuIF9hZGRMaXN0ZW5lcih0aGlzLCB0eXBlLCBsaXN0ZW5lciwgdHJ1ZSk7XG4gICAgfTtcblxuZnVuY3Rpb24gb25jZVdyYXBwZXIoKSB7XG4gIGlmICghdGhpcy5maXJlZCkge1xuICAgIHRoaXMudGFyZ2V0LnJlbW92ZUxpc3RlbmVyKHRoaXMudHlwZSwgdGhpcy53cmFwRm4pO1xuICAgIHRoaXMuZmlyZWQgPSB0cnVlO1xuICAgIGlmIChhcmd1bWVudHMubGVuZ3RoID09PSAwKVxuICAgICAgcmV0dXJuIHRoaXMubGlzdGVuZXIuY2FsbCh0aGlzLnRhcmdldCk7XG4gICAgcmV0dXJuIHRoaXMubGlzdGVuZXIuYXBwbHkodGhpcy50YXJnZXQsIGFyZ3VtZW50cyk7XG4gIH1cbn1cblxuZnVuY3Rpb24gX29uY2VXcmFwKHRhcmdldCwgdHlwZSwgbGlzdGVuZXIpIHtcbiAgdmFyIHN0YXRlID0geyBmaXJlZDogZmFsc2UsIHdyYXBGbjogdW5kZWZpbmVkLCB0YXJnZXQ6IHRhcmdldCwgdHlwZTogdHlwZSwgbGlzdGVuZXI6IGxpc3RlbmVyIH07XG4gIHZhciB3cmFwcGVkID0gb25jZVdyYXBwZXIuYmluZChzdGF0ZSk7XG4gIHdyYXBwZWQubGlzdGVuZXIgPSBsaXN0ZW5lcjtcbiAgc3RhdGUud3JhcEZuID0gd3JhcHBlZDtcbiAgcmV0dXJuIHdyYXBwZWQ7XG59XG5cbkV2ZW50RW1pdHRlci5wcm90b3R5cGUub25jZSA9IGZ1bmN0aW9uIG9uY2UodHlwZSwgbGlzdGVuZXIpIHtcbiAgY2hlY2tMaXN0ZW5lcihsaXN0ZW5lcik7XG4gIHRoaXMub24odHlwZSwgX29uY2VXcmFwKHRoaXMsIHR5cGUsIGxpc3RlbmVyKSk7XG4gIHJldHVybiB0aGlzO1xufTtcblxuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5wcmVwZW5kT25jZUxpc3RlbmVyID1cbiAgICBmdW5jdGlvbiBwcmVwZW5kT25jZUxpc3RlbmVyKHR5cGUsIGxpc3RlbmVyKSB7XG4gICAgICBjaGVja0xpc3RlbmVyKGxpc3RlbmVyKTtcbiAgICAgIHRoaXMucHJlcGVuZExpc3RlbmVyKHR5cGUsIF9vbmNlV3JhcCh0aGlzLCB0eXBlLCBsaXN0ZW5lcikpO1xuICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfTtcblxuLy8gRW1pdHMgYSAncmVtb3ZlTGlzdGVuZXInIGV2ZW50IGlmIGFuZCBvbmx5IGlmIHRoZSBsaXN0ZW5lciB3YXMgcmVtb3ZlZC5cbkV2ZW50RW1pdHRlci5wcm90b3R5cGUucmVtb3ZlTGlzdGVuZXIgPVxuICAgIGZ1bmN0aW9uIHJlbW92ZUxpc3RlbmVyKHR5cGUsIGxpc3RlbmVyKSB7XG4gICAgICB2YXIgbGlzdCwgZXZlbnRzLCBwb3NpdGlvbiwgaSwgb3JpZ2luYWxMaXN0ZW5lcjtcblxuICAgICAgY2hlY2tMaXN0ZW5lcihsaXN0ZW5lcik7XG5cbiAgICAgIGV2ZW50cyA9IHRoaXMuX2V2ZW50cztcbiAgICAgIGlmIChldmVudHMgPT09IHVuZGVmaW5lZClcbiAgICAgICAgcmV0dXJuIHRoaXM7XG5cbiAgICAgIGxpc3QgPSBldmVudHNbdHlwZV07XG4gICAgICBpZiAobGlzdCA9PT0gdW5kZWZpbmVkKVxuICAgICAgICByZXR1cm4gdGhpcztcblxuICAgICAgaWYgKGxpc3QgPT09IGxpc3RlbmVyIHx8IGxpc3QubGlzdGVuZXIgPT09IGxpc3RlbmVyKSB7XG4gICAgICAgIGlmICgtLXRoaXMuX2V2ZW50c0NvdW50ID09PSAwKVxuICAgICAgICAgIHRoaXMuX2V2ZW50cyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgIGRlbGV0ZSBldmVudHNbdHlwZV07XG4gICAgICAgICAgaWYgKGV2ZW50cy5yZW1vdmVMaXN0ZW5lcilcbiAgICAgICAgICAgIHRoaXMuZW1pdCgncmVtb3ZlTGlzdGVuZXInLCB0eXBlLCBsaXN0Lmxpc3RlbmVyIHx8IGxpc3RlbmVyKTtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIGlmICh0eXBlb2YgbGlzdCAhPT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICBwb3NpdGlvbiA9IC0xO1xuXG4gICAgICAgIGZvciAoaSA9IGxpc3QubGVuZ3RoIC0gMTsgaSA+PSAwOyBpLS0pIHtcbiAgICAgICAgICBpZiAobGlzdFtpXSA9PT0gbGlzdGVuZXIgfHwgbGlzdFtpXS5saXN0ZW5lciA9PT0gbGlzdGVuZXIpIHtcbiAgICAgICAgICAgIG9yaWdpbmFsTGlzdGVuZXIgPSBsaXN0W2ldLmxpc3RlbmVyO1xuICAgICAgICAgICAgcG9zaXRpb24gPSBpO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHBvc2l0aW9uIDwgMClcbiAgICAgICAgICByZXR1cm4gdGhpcztcblxuICAgICAgICBpZiAocG9zaXRpb24gPT09IDApXG4gICAgICAgICAgbGlzdC5zaGlmdCgpO1xuICAgICAgICBlbHNlIHtcbiAgICAgICAgICBzcGxpY2VPbmUobGlzdCwgcG9zaXRpb24pO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGxpc3QubGVuZ3RoID09PSAxKVxuICAgICAgICAgIGV2ZW50c1t0eXBlXSA9IGxpc3RbMF07XG5cbiAgICAgICAgaWYgKGV2ZW50cy5yZW1vdmVMaXN0ZW5lciAhPT0gdW5kZWZpbmVkKVxuICAgICAgICAgIHRoaXMuZW1pdCgncmVtb3ZlTGlzdGVuZXInLCB0eXBlLCBvcmlnaW5hbExpc3RlbmVyIHx8IGxpc3RlbmVyKTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfTtcblxuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5vZmYgPSBFdmVudEVtaXR0ZXIucHJvdG90eXBlLnJlbW92ZUxpc3RlbmVyO1xuXG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLnJlbW92ZUFsbExpc3RlbmVycyA9XG4gICAgZnVuY3Rpb24gcmVtb3ZlQWxsTGlzdGVuZXJzKHR5cGUpIHtcbiAgICAgIHZhciBsaXN0ZW5lcnMsIGV2ZW50cywgaTtcblxuICAgICAgZXZlbnRzID0gdGhpcy5fZXZlbnRzO1xuICAgICAgaWYgKGV2ZW50cyA9PT0gdW5kZWZpbmVkKVxuICAgICAgICByZXR1cm4gdGhpcztcblxuICAgICAgLy8gbm90IGxpc3RlbmluZyBmb3IgcmVtb3ZlTGlzdGVuZXIsIG5vIG5lZWQgdG8gZW1pdFxuICAgICAgaWYgKGV2ZW50cy5yZW1vdmVMaXN0ZW5lciA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIGlmIChhcmd1bWVudHMubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgdGhpcy5fZXZlbnRzID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiAgICAgICAgICB0aGlzLl9ldmVudHNDb3VudCA9IDA7XG4gICAgICAgIH0gZWxzZSBpZiAoZXZlbnRzW3R5cGVdICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICBpZiAoLS10aGlzLl9ldmVudHNDb3VudCA9PT0gMClcbiAgICAgICAgICAgIHRoaXMuX2V2ZW50cyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gICAgICAgICAgZWxzZVxuICAgICAgICAgICAgZGVsZXRlIGV2ZW50c1t0eXBlXTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgIH1cblxuICAgICAgLy8gZW1pdCByZW1vdmVMaXN0ZW5lciBmb3IgYWxsIGxpc3RlbmVycyBvbiBhbGwgZXZlbnRzXG4gICAgICBpZiAoYXJndW1lbnRzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICB2YXIga2V5cyA9IE9iamVjdC5rZXlzKGV2ZW50cyk7XG4gICAgICAgIHZhciBrZXk7XG4gICAgICAgIGZvciAoaSA9IDA7IGkgPCBrZXlzLmxlbmd0aDsgKytpKSB7XG4gICAgICAgICAga2V5ID0ga2V5c1tpXTtcbiAgICAgICAgICBpZiAoa2V5ID09PSAncmVtb3ZlTGlzdGVuZXInKSBjb250aW51ZTtcbiAgICAgICAgICB0aGlzLnJlbW92ZUFsbExpc3RlbmVycyhrZXkpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMucmVtb3ZlQWxsTGlzdGVuZXJzKCdyZW1vdmVMaXN0ZW5lcicpO1xuICAgICAgICB0aGlzLl9ldmVudHMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuICAgICAgICB0aGlzLl9ldmVudHNDb3VudCA9IDA7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgfVxuXG4gICAgICBsaXN0ZW5lcnMgPSBldmVudHNbdHlwZV07XG5cbiAgICAgIGlmICh0eXBlb2YgbGlzdGVuZXJzID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgIHRoaXMucmVtb3ZlTGlzdGVuZXIodHlwZSwgbGlzdGVuZXJzKTtcbiAgICAgIH0gZWxzZSBpZiAobGlzdGVuZXJzICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgLy8gTElGTyBvcmRlclxuICAgICAgICBmb3IgKGkgPSBsaXN0ZW5lcnMubGVuZ3RoIC0gMTsgaSA+PSAwOyBpLS0pIHtcbiAgICAgICAgICB0aGlzLnJlbW92ZUxpc3RlbmVyKHR5cGUsIGxpc3RlbmVyc1tpXSk7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfTtcblxuZnVuY3Rpb24gX2xpc3RlbmVycyh0YXJnZXQsIHR5cGUsIHVud3JhcCkge1xuICB2YXIgZXZlbnRzID0gdGFyZ2V0Ll9ldmVudHM7XG5cbiAgaWYgKGV2ZW50cyA9PT0gdW5kZWZpbmVkKVxuICAgIHJldHVybiBbXTtcblxuICB2YXIgZXZsaXN0ZW5lciA9IGV2ZW50c1t0eXBlXTtcbiAgaWYgKGV2bGlzdGVuZXIgPT09IHVuZGVmaW5lZClcbiAgICByZXR1cm4gW107XG5cbiAgaWYgKHR5cGVvZiBldmxpc3RlbmVyID09PSAnZnVuY3Rpb24nKVxuICAgIHJldHVybiB1bndyYXAgPyBbZXZsaXN0ZW5lci5saXN0ZW5lciB8fCBldmxpc3RlbmVyXSA6IFtldmxpc3RlbmVyXTtcblxuICByZXR1cm4gdW53cmFwID9cbiAgICB1bndyYXBMaXN0ZW5lcnMoZXZsaXN0ZW5lcikgOiBhcnJheUNsb25lKGV2bGlzdGVuZXIsIGV2bGlzdGVuZXIubGVuZ3RoKTtcbn1cblxuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5saXN0ZW5lcnMgPSBmdW5jdGlvbiBsaXN0ZW5lcnModHlwZSkge1xuICByZXR1cm4gX2xpc3RlbmVycyh0aGlzLCB0eXBlLCB0cnVlKTtcbn07XG5cbkV2ZW50RW1pdHRlci5wcm90b3R5cGUucmF3TGlzdGVuZXJzID0gZnVuY3Rpb24gcmF3TGlzdGVuZXJzKHR5cGUpIHtcbiAgcmV0dXJuIF9saXN0ZW5lcnModGhpcywgdHlwZSwgZmFsc2UpO1xufTtcblxuRXZlbnRFbWl0dGVyLmxpc3RlbmVyQ291bnQgPSBmdW5jdGlvbihlbWl0dGVyLCB0eXBlKSB7XG4gIGlmICh0eXBlb2YgZW1pdHRlci5saXN0ZW5lckNvdW50ID09PSAnZnVuY3Rpb24nKSB7XG4gICAgcmV0dXJuIGVtaXR0ZXIubGlzdGVuZXJDb3VudCh0eXBlKTtcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gbGlzdGVuZXJDb3VudC5jYWxsKGVtaXR0ZXIsIHR5cGUpO1xuICB9XG59O1xuXG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLmxpc3RlbmVyQ291bnQgPSBsaXN0ZW5lckNvdW50O1xuZnVuY3Rpb24gbGlzdGVuZXJDb3VudCh0eXBlKSB7XG4gIHZhciBldmVudHMgPSB0aGlzLl9ldmVudHM7XG5cbiAgaWYgKGV2ZW50cyAhPT0gdW5kZWZpbmVkKSB7XG4gICAgdmFyIGV2bGlzdGVuZXIgPSBldmVudHNbdHlwZV07XG5cbiAgICBpZiAodHlwZW9mIGV2bGlzdGVuZXIgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgIHJldHVybiAxO1xuICAgIH0gZWxzZSBpZiAoZXZsaXN0ZW5lciAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICByZXR1cm4gZXZsaXN0ZW5lci5sZW5ndGg7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIDA7XG59XG5cbkV2ZW50RW1pdHRlci5wcm90b3R5cGUuZXZlbnROYW1lcyA9IGZ1bmN0aW9uIGV2ZW50TmFtZXMoKSB7XG4gIHJldHVybiB0aGlzLl9ldmVudHNDb3VudCA+IDAgPyBSZWZsZWN0T3duS2V5cyh0aGlzLl9ldmVudHMpIDogW107XG59O1xuXG5mdW5jdGlvbiBhcnJheUNsb25lKGFyciwgbikge1xuICB2YXIgY29weSA9IG5ldyBBcnJheShuKTtcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBuOyArK2kpXG4gICAgY29weVtpXSA9IGFycltpXTtcbiAgcmV0dXJuIGNvcHk7XG59XG5cbmZ1bmN0aW9uIHNwbGljZU9uZShsaXN0LCBpbmRleCkge1xuICBmb3IgKDsgaW5kZXggKyAxIDwgbGlzdC5sZW5ndGg7IGluZGV4KyspXG4gICAgbGlzdFtpbmRleF0gPSBsaXN0W2luZGV4ICsgMV07XG4gIGxpc3QucG9wKCk7XG59XG5cbmZ1bmN0aW9uIHVud3JhcExpc3RlbmVycyhhcnIpIHtcbiAgdmFyIHJldCA9IG5ldyBBcnJheShhcnIubGVuZ3RoKTtcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCByZXQubGVuZ3RoOyArK2kpIHtcbiAgICByZXRbaV0gPSBhcnJbaV0ubGlzdGVuZXIgfHwgYXJyW2ldO1xuICB9XG4gIHJldHVybiByZXQ7XG59XG5cbmZ1bmN0aW9uIG9uY2UoZW1pdHRlciwgbmFtZSkge1xuICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xuICAgIGZ1bmN0aW9uIGV2ZW50TGlzdGVuZXIoKSB7XG4gICAgICBpZiAoZXJyb3JMaXN0ZW5lciAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIGVtaXR0ZXIucmVtb3ZlTGlzdGVuZXIoJ2Vycm9yJywgZXJyb3JMaXN0ZW5lcik7XG4gICAgICB9XG4gICAgICByZXNvbHZlKFtdLnNsaWNlLmNhbGwoYXJndW1lbnRzKSk7XG4gICAgfTtcbiAgICB2YXIgZXJyb3JMaXN0ZW5lcjtcblxuICAgIC8vIEFkZGluZyBhbiBlcnJvciBsaXN0ZW5lciBpcyBub3Qgb3B0aW9uYWwgYmVjYXVzZVxuICAgIC8vIGlmIGFuIGVycm9yIGlzIHRocm93biBvbiBhbiBldmVudCBlbWl0dGVyIHdlIGNhbm5vdFxuICAgIC8vIGd1YXJhbnRlZSB0aGF0IHRoZSBhY3R1YWwgZXZlbnQgd2UgYXJlIHdhaXRpbmcgd2lsbFxuICAgIC8vIGJlIGZpcmVkLiBUaGUgcmVzdWx0IGNvdWxkIGJlIGEgc2lsZW50IHdheSB0byBjcmVhdGVcbiAgICAvLyBtZW1vcnkgb3IgZmlsZSBkZXNjcmlwdG9yIGxlYWtzLCB3aGljaCBpcyBzb21ldGhpbmdcbiAgICAvLyB3ZSBzaG91bGQgYXZvaWQuXG4gICAgaWYgKG5hbWUgIT09ICdlcnJvcicpIHtcbiAgICAgIGVycm9yTGlzdGVuZXIgPSBmdW5jdGlvbiBlcnJvckxpc3RlbmVyKGVycikge1xuICAgICAgICBlbWl0dGVyLnJlbW92ZUxpc3RlbmVyKG5hbWUsIGV2ZW50TGlzdGVuZXIpO1xuICAgICAgICByZWplY3QoZXJyKTtcbiAgICAgIH07XG5cbiAgICAgIGVtaXR0ZXIub25jZSgnZXJyb3InLCBlcnJvckxpc3RlbmVyKTtcbiAgICB9XG5cbiAgICBlbWl0dGVyLm9uY2UobmFtZSwgZXZlbnRMaXN0ZW5lcik7XG4gIH0pO1xufVxuIiwiJ3VzZSBzdHJpY3QnXG5cbmZ1bmN0aW9uIE1pZGlDQyAoY2xpZW50KSB7XG4gIHRoaXMuc3RhY2sgPSBbXVxuICB0aGlzLm9mZnNldCA9IDY0XG5cbiAgdGhpcy5zdGFydCA9IGZ1bmN0aW9uICgpIHtcbiAgICBjb25zb2xlLmluZm8oJ01pZGlDQycsICdTdGFydGluZy4uJylcbiAgfVxuXG4gIHRoaXMuY2xlYXIgPSBmdW5jdGlvbiAoKSB7XG4gICAgdGhpcy5zdGFjayA9IFtdXG4gIH1cblxuICB0aGlzLnJ1biA9IGZ1bmN0aW9uICgpIHtcbiAgICBpZiAodGhpcy5zdGFjay5sZW5ndGggPCAxKSB7IHJldHVybiB9XG4gICAgY29uc3QgZGV2aWNlID0gY2xpZW50LmlvLm1pZGkub3V0cHV0RGV2aWNlKClcbiAgICBpZiAoIWRldmljZSkgeyBjb25zb2xlLndhcm4oJ0NDJywgJ05vIE1pZGkgZGV2aWNlLicpOyByZXR1cm4gfVxuICAgIGZvciAoY29uc3QgbXNnIG9mIHRoaXMuc3RhY2spIHtcbiAgICAgIGlmIChtc2cudHlwZSA9PT0gJ2NjJyAmJiAhaXNOYU4obXNnLmNoYW5uZWwpICYmICFpc05hTihtc2cua25vYikgJiYgIWlzTmFOKG1zZy52YWx1ZSkpIHtcbiAgICAgICAgZGV2aWNlLnNlbmQoWzB4YjAgKyBtc2cuY2hhbm5lbCwgdGhpcy5vZmZzZXQgKyBtc2cua25vYiwgbXNnLnZhbHVlXSlcbiAgICAgIH0gZWxzZSBpZiAobXNnLnR5cGUgPT09ICdwYicgJiYgIWlzTmFOKG1zZy5jaGFubmVsKSAmJiAhaXNOYU4obXNnLmxzYikgJiYgIWlzTmFOKG1zZy5tc2IpKSB7XG4gICAgICAgIGRldmljZS5zZW5kKFsweGUwICsgbXNnLmNoYW5uZWwsIG1zZy5sc2IsIG1zZy5tc2JdKVxuICAgICAgfSBlbHNlIGlmIChtc2cudHlwZSA9PT0gJ3BnJyAmJiAhaXNOYU4obXNnLmNoYW5uZWwpKSB7XG4gICAgICAgIGlmICghaXNOYU4obXNnLmJhbmspKSB7IGRldmljZS5zZW5kKFsweGIwICsgbXNnLmNoYW5uZWwsIDAsIG1zZy5iYW5rXSkgfVxuICAgICAgICBpZiAoIWlzTmFOKG1zZy5zdWIpKSB7IGRldmljZS5zZW5kKFsweGIwICsgbXNnLmNoYW5uZWwsIDMyLCBtc2cuc3ViXSkgfVxuICAgICAgICBpZiAoIWlzTmFOKG1zZy5wZ20pKSB7IGRldmljZS5zZW5kKFsweGMwICsgbXNnLmNoYW5uZWwsIG1zZy5wZ21dKSB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBjb25zb2xlLndhcm4oJ0NDJywgJ1Vua25vd24gbWVzc2FnZScsIG1zZylcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICB0aGlzLnNldE9mZnNldCA9IGZ1bmN0aW9uIChvZmZzZXQpIHtcbiAgICBpZiAoaXNOYU4ob2Zmc2V0KSkgeyByZXR1cm4gfVxuICAgIHRoaXMub2Zmc2V0ID0gb2Zmc2V0XG4gICAgY29uc29sZS5sb2coJ0NDJywgJ1NldCBvZmZzZXQgdG8gJyArIHRoaXMub2Zmc2V0KVxuICB9XG59XG5cbi8qKiogRVhQT1JUUyBGUk9NIGV4cG9ydHMtbG9hZGVyICoqKi9cbmV4cG9ydCBkZWZhdWx0IE1pZGlDQztcbiIsIid1c2Ugc3RyaWN0J1xuXG5mdW5jdGlvbiBBY2VscyAoY2xpZW50KSB7XG4gIHRoaXMuYWxsID0ge31cbiAgdGhpcy5yb2xlcyA9IHt9XG4gIHRoaXMucGlwZSA9IG51bGxcblxuICB0aGlzLmluc3RhbGwgPSAoaG9zdCA9IHdpbmRvdykgPT4ge1xuICAgIGhvc3QuYWRkRXZlbnRMaXN0ZW5lcigna2V5ZG93bicsIHRoaXMub25LZXlEb3duLCBmYWxzZSlcbiAgICBob3N0LmFkZEV2ZW50TGlzdGVuZXIoJ2tleXVwJywgdGhpcy5vbktleVVwLCBmYWxzZSlcbiAgfVxuXG4gIHRoaXMuc2V0ID0gKGNhdCwgbmFtZSwgYWNjZWxlcmF0b3IsIGRvd25mbiwgdXBmbikgPT4ge1xuICAgIGlmICh0aGlzLmFsbFthY2NlbGVyYXRvcl0pIHsgY29uc29sZS53YXJuKCdBY2VscycsIGBUcnlpbmcgdG8gb3ZlcndyaXRlICR7dGhpcy5hbGxbYWNjZWxlcmF0b3JdLm5hbWV9LCB3aXRoICR7bmFtZX0uYCkgfVxuICAgIHRoaXMuYWxsW2FjY2VsZXJhdG9yXSA9IHsgY2F0LCBuYW1lLCBkb3duZm4sIHVwZm4sIGFjY2VsZXJhdG9yIH1cbiAgfVxuXG4gIHRoaXMuYWRkID0gKGNhdCwgcm9sZSkgPT4ge1xuICAgIHRoaXMuYWxsWyc6JyArIHJvbGVdID0geyBjYXQsIG5hbWU6IHJvbGUsIHJvbGUgfVxuICB9XG5cbiAgdGhpcy5nZXQgPSAoYWNjZWxlcmF0b3IpID0+IHtcbiAgICByZXR1cm4gdGhpcy5hbGxbYWNjZWxlcmF0b3JdXG4gIH1cblxuICB0aGlzLnNvcnQgPSAoKSA9PiB7XG4gICAgY29uc3QgaCA9IHt9XG4gICAgZm9yIChjb25zdCBpdGVtIG9mIE9iamVjdC52YWx1ZXModGhpcy5hbGwpKSB7XG4gICAgICBpZiAoIWhbaXRlbS5jYXRdKSB7IGhbaXRlbS5jYXRdID0gW10gfVxuICAgICAgaFtpdGVtLmNhdF0ucHVzaChpdGVtKVxuICAgIH1cbiAgICByZXR1cm4gaFxuICB9XG5cbiAgdGhpcy5jb252ZXJ0ID0gKGV2ZW50KSA9PiB7XG4gICAgY29uc3QgYWNjZWxlcmF0b3IgPSBldmVudC5rZXkgPT09ICcgJyA/ICdTcGFjZScgOiBldmVudC5rZXkuc3Vic3RyKDAsIDEpLnRvVXBwZXJDYXNlKCkgKyBldmVudC5rZXkuc3Vic3RyKDEpXG4gICAgaWYgKChldmVudC5jdHJsS2V5IHx8IGV2ZW50Lm1ldGFLZXkpICYmIGV2ZW50LnNoaWZ0S2V5KSB7XG4gICAgICByZXR1cm4gYENtZE9yQ3RybCtTaGlmdCske2FjY2VsZXJhdG9yfWBcbiAgICB9XG4gICAgaWYgKGV2ZW50LnNoaWZ0S2V5ICYmIGV2ZW50LmtleS50b1VwcGVyQ2FzZSgpICE9PSBldmVudC5rZXkpIHtcbiAgICAgIHJldHVybiBgU2hpZnQrJHthY2NlbGVyYXRvcn1gXG4gICAgfVxuICAgIGlmIChldmVudC5hbHRLZXkgJiYgZXZlbnQua2V5Lmxlbmd0aCAhPT0gMSkge1xuICAgICAgcmV0dXJuIGBBbHQrJHthY2NlbGVyYXRvcn1gXG4gICAgfVxuICAgIGlmIChldmVudC5jdHJsS2V5IHx8IGV2ZW50Lm1ldGFLZXkpIHtcbiAgICAgIHJldHVybiBgQ21kT3JDdHJsKyR7YWNjZWxlcmF0b3J9YFxuICAgIH1cbiAgICByZXR1cm4gYWNjZWxlcmF0b3JcbiAgfVxuXG4gIHRoaXMucGlwZSA9IChvYmopID0+IHtcbiAgICB0aGlzLnBpcGUgPSBvYmpcbiAgfVxuXG4gIHRoaXMub25LZXlEb3duID0gKGUpID0+IHtcbiAgICBjb25zdCB0YXJnZXQgPSB0aGlzLmdldCh0aGlzLmNvbnZlcnQoZSkpXG4gICAgaWYgKCF0YXJnZXQgfHwgIXRhcmdldC5kb3duZm4pIHsgcmV0dXJuIHRoaXMucGlwZSA/IHRoaXMucGlwZS5vbktleURvd24oZSkgOiBudWxsIH1cbiAgICB0YXJnZXQuZG93bmZuKClcbiAgICBlLnByZXZlbnREZWZhdWx0KClcbiAgfVxuXG4gIHRoaXMub25LZXlVcCA9IChlKSA9PiB7XG4gICAgY29uc3QgdGFyZ2V0ID0gdGhpcy5nZXQodGhpcy5jb252ZXJ0KGUpKVxuICAgIGlmICghdGFyZ2V0IHx8ICF0YXJnZXQudXBmbikgeyByZXR1cm4gdGhpcy5waXBlID8gdGhpcy5waXBlLm9uS2V5VXAoZSkgOiBudWxsIH1cbiAgICB0YXJnZXQudXBmbigpXG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpXG4gIH1cblxuICB0aGlzLnRvTWFya2Rvd24gPSAoKSA9PiB7XG4gICAgY29uc3QgY2F0cyA9IHRoaXMuc29ydCgpXG4gICAgbGV0IHRleHQgPSAnJ1xuICAgIGZvciAoY29uc3QgY2F0IGluIGNhdHMpIHtcbiAgICAgIHRleHQgKz0gYFxcbiMjIyAke2NhdH1cXG5cXG5gXG4gICAgICBmb3IgKGNvbnN0IGl0ZW0gb2YgY2F0c1tjYXRdKSB7XG4gICAgICAgIHRleHQgKz0gaXRlbS5hY2NlbGVyYXRvciA/IGAtIFxcYCR7aXRlbS5hY2NlbGVyYXRvci5yZXBsYWNlKCdgJywgJ3RpbGRlJyl9XFxgOiAke2l0ZW0ubmFtZX1cXG5gIDogJydcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHRleHQudHJpbSgpXG4gIH1cblxuICB0aGlzLnRvU3RyaW5nID0gKCkgPT4ge1xuICAgIGNvbnN0IGNhdHMgPSB0aGlzLnNvcnQoKVxuICAgIGxldCB0ZXh0ID0gJydcbiAgICBmb3IgKGNvbnN0IGNhdCBpbiBjYXRzKSB7XG4gICAgICB0ZXh0ICs9IGBcXG4ke2NhdH1cXG5cXG5gXG4gICAgICBmb3IgKGNvbnN0IGl0ZW0gb2YgY2F0c1tjYXRdKSB7XG4gICAgICAgIHRleHQgKz0gaXRlbS5hY2NlbGVyYXRvciA/IGAke2l0ZW0ubmFtZS5wYWRFbmQoMjUsICcuJyl9ICR7aXRlbS5hY2NlbGVyYXRvcn1cXG5gIDogJydcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHRleHQudHJpbSgpXG4gIH1cblxuICAvLyBFbGVjdHJvbiBzcGVjaWZpY3NcblxuICB0aGlzLmluamVjdCA9IChuYW1lID0gJ1VudGl0bGVkJykgPT4ge1xuICAgIGNvbnN0IGFwcCA9IHJlcXVpcmUoJ2VsZWN0cm9uJykucmVtb3RlLmFwcFxuICAgIGNvbnN0IGluamVjdGlvbiA9IFtdXG5cbiAgICBpbmplY3Rpb24ucHVzaCh7XG4gICAgICBsYWJlbDogbmFtZSxcbiAgICAgIHN1Ym1lbnU6IFtcbiAgICAgICAgeyBsYWJlbDogJ0Fib3V0JywgY2xpY2s6ICgpID0+IHsgcmVxdWlyZSgnZWxlY3Ryb24nKS5zaGVsbC5vcGVuRXh0ZXJuYWwoJ2h0dHBzOi8vZ2l0aHViLmNvbS9odW5kcmVkcmFiYml0cy8nICsgbmFtZSkgfSB9LFxuICAgICAgICB7XG4gICAgICAgICAgbGFiZWw6ICdUaGVtZScsXG4gICAgICAgICAgc3VibWVudTogW1xuICAgICAgICAgICAgeyBsYWJlbDogJ0Rvd25sb2FkIFRoZW1lcycsIGNsaWNrOiAoKSA9PiB7IHJlcXVpcmUoJ2VsZWN0cm9uJykuc2hlbGwub3BlbkV4dGVybmFsKCdodHRwczovL2dpdGh1Yi5jb20vaHVuZHJlZHJhYmJpdHMvVGhlbWVzJykgfSB9LFxuICAgICAgICAgICAgeyBsYWJlbDogJ09wZW4gVGhlbWUnLCBjbGljazogKCkgPT4geyBjbGllbnQudGhlbWUub3BlbigpIH0gfSxcbiAgICAgICAgICAgIHsgbGFiZWw6ICdSZXNldCBUaGVtZScsIGFjY2VsZXJhdG9yOiAnQ21kT3JDdHJsK0VzY2FwZScsIGNsaWNrOiAoKSA9PiB7IGNsaWVudC50aGVtZS5yZXNldCgpIH0gfVxuICAgICAgICAgIF1cbiAgICAgICAgfSxcbiAgICAgICAgeyBsYWJlbDogJ0Z1bGxzY3JlZW4nLCBhY2NlbGVyYXRvcjogJ0NtZE9yQ3RybCtFbnRlcicsIGNsaWNrOiAoKSA9PiB7IGFwcC50b2dnbGVGdWxsc2NyZWVuKCkgfSB9LFxuICAgICAgICB7IGxhYmVsOiAnSGlkZScsIGFjY2VsZXJhdG9yOiAnQ21kT3JDdHJsK0gnLCBjbGljazogKCkgPT4geyBhcHAudG9nZ2xlVmlzaWJsZSgpIH0gfSxcbiAgICAgICAgeyBsYWJlbDogJ1RvZ2dsZSBNZW51YmFyJywgYWNjZWxlcmF0b3I6ICdBbHQrSCcsIGNsaWNrOiAoKSA9PiB7IGFwcC50b2dnbGVNZW51YmFyKCkgfSB9LFxuICAgICAgICB7IGxhYmVsOiAnSW5zcGVjdCcsIGFjY2VsZXJhdG9yOiAnQ21kT3JDdHJsK1RhYicsIGNsaWNrOiAoKSA9PiB7IGFwcC5pbnNwZWN0KCkgfSB9LFxuICAgICAgICB7IHJvbGU6ICdxdWl0JyB9XG4gICAgICBdXG4gICAgfSlcblxuICAgIGNvbnN0IHNvcnRlZCA9IHRoaXMuc29ydCgpXG4gICAgZm9yIChjb25zdCBjYXQgb2YgT2JqZWN0LmtleXMoc29ydGVkKSkge1xuICAgICAgY29uc3Qgc3VibWVudSA9IFtdXG4gICAgICBmb3IgKGNvbnN0IG9wdGlvbiBvZiBzb3J0ZWRbY2F0XSkge1xuICAgICAgICBpZiAob3B0aW9uLnJvbGUpIHtcbiAgICAgICAgICBzdWJtZW51LnB1c2goeyByb2xlOiBvcHRpb24ucm9sZSB9KVxuICAgICAgICB9IGVsc2UgaWYgKG9wdGlvbi50eXBlKSB7XG4gICAgICAgICAgc3VibWVudS5wdXNoKHsgdHlwZTogb3B0aW9uLnR5cGUgfSlcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBzdWJtZW51LnB1c2goeyBsYWJlbDogb3B0aW9uLm5hbWUsIGFjY2VsZXJhdG9yOiBvcHRpb24uYWNjZWxlcmF0b3IsIGNsaWNrOiBvcHRpb24uZG93bmZuIH0pXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGluamVjdGlvbi5wdXNoKHsgbGFiZWw6IGNhdCwgc3VibWVudTogc3VibWVudSB9KVxuICAgIH1cbiAgICBhcHAuaW5qZWN0TWVudShpbmplY3Rpb24pXG4gIH1cbn1cblxuLyoqKiBFWFBPUlRTIEZST00gZXhwb3J0cy1sb2FkZXIgKioqL1xuZXhwb3J0IGRlZmF1bHQgQWNlbHM7XG4iLCIndXNlIHN0cmljdCdcblxuZnVuY3Rpb24gSGlzdG9yeSAoKSB7XG4gIHRoaXMuaW5kZXggPSAwXG4gIHRoaXMuZnJhbWVzID0gW11cbiAgdGhpcy5ob3N0ID0gbnVsbFxuICB0aGlzLmtleSA9IG51bGxcblxuICB0aGlzLmJpbmQgPSBmdW5jdGlvbiAoaG9zdCwga2V5KSB7XG4gICAgY29uc29sZS5sb2coJ0hpc3RvcnkgaXMgcmVjb3JkaW5nLi4nKVxuICAgIHRoaXMuaG9zdCA9IGhvc3RcbiAgICB0aGlzLmtleSA9IGtleVxuICAgIHRoaXMucmVzZXQoKVxuICB9XG5cbiAgdGhpcy5yZXNldCA9IGZ1bmN0aW9uICgpIHtcbiAgICB0aGlzLmluZGV4ID0gMFxuICAgIHRoaXMuZnJhbWVzID0gW11cbiAgfVxuXG4gIHRoaXMucmVjb3JkID0gZnVuY3Rpb24gKGRhdGEpIHtcbiAgICBpZiAodGhpcy5pbmRleCA9PT0gdGhpcy5mcmFtZXMubGVuZ3RoKSB7XG4gICAgICB0aGlzLmFwcGVuZChkYXRhKVxuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmZvcmsoZGF0YSlcbiAgICB9XG4gICAgdGhpcy50cmltKClcbiAgICB0aGlzLmluZGV4ID0gdGhpcy5mcmFtZXMubGVuZ3RoXG4gIH1cblxuICB0aGlzLnVuZG8gPSBmdW5jdGlvbiAoKSB7XG4gICAgaWYgKHRoaXMuaW5kZXggPT09IDApIHsgY29uc29sZS53YXJuKCdIaXN0b3J5JywgJ1JlYWNoZWQgYmVnaW5uaW5nJyk7IHJldHVybiB9XG4gICAgdGhpcy5pbmRleCA9IGNsYW1wKHRoaXMuaW5kZXggLSAxLCAwLCB0aGlzLmZyYW1lcy5sZW5ndGggLSAyKVxuICAgIHRoaXMuYXBwbHkodGhpcy5mcmFtZXNbdGhpcy5pbmRleF0pXG4gIH1cblxuICB0aGlzLnJlZG8gPSBmdW5jdGlvbiAoKSB7XG4gICAgaWYgKHRoaXMuaW5kZXggKyAxID4gdGhpcy5mcmFtZXMubGVuZ3RoIC0gMSkgeyBjb25zb2xlLndhcm4oJ0hpc3RvcnknLCAnUmVhY2hlZCBlbmQnKTsgcmV0dXJuIH1cbiAgICB0aGlzLmluZGV4ID0gY2xhbXAodGhpcy5pbmRleCArIDEsIDAsIHRoaXMuZnJhbWVzLmxlbmd0aCAtIDEpXG4gICAgdGhpcy5hcHBseSh0aGlzLmZyYW1lc1t0aGlzLmluZGV4XSlcbiAgfVxuXG4gIHRoaXMuYXBwbHkgPSBmdW5jdGlvbiAoZikge1xuICAgIGlmICghdGhpcy5ob3N0W3RoaXMua2V5XSkgeyBjb25zb2xlLmxvZyhgVW5rbm93biBiaW5kaW5nIHRvIGtleSAke3RoaXMua2V5fWApOyByZXR1cm4gfVxuICAgIGlmICghZiB8fCBmLmxlbmd0aCAhPT0gdGhpcy5ob3N0W3RoaXMua2V5XS5sZW5ndGgpIHsgcmV0dXJuIH1cbiAgICB0aGlzLmhvc3RbdGhpcy5rZXldID0gdGhpcy5mcmFtZXNbdGhpcy5pbmRleF1cbiAgfVxuXG4gIHRoaXMuYXBwZW5kID0gZnVuY3Rpb24gKGRhdGEpIHtcbiAgICBpZiAoIWRhdGEpIHsgcmV0dXJuIH1cbiAgICBpZiAodGhpcy5mcmFtZXNbdGhpcy5pbmRleCAtIDFdICYmIHRoaXMuZnJhbWVzW3RoaXMuaW5kZXggLSAxXSA9PT0gZGF0YSkgeyByZXR1cm4gfVxuICAgIHRoaXMuZnJhbWVzLnB1c2goZGF0YSlcbiAgfVxuXG4gIHRoaXMuZm9yayA9IGZ1bmN0aW9uIChkYXRhKSB7XG4gICAgdGhpcy5mcmFtZXMgPSB0aGlzLmZyYW1lcy5zbGljZSgwLCB0aGlzLmluZGV4ICsgMSlcbiAgICB0aGlzLmFwcGVuZChkYXRhKVxuICB9XG5cbiAgdGhpcy50cmltID0gZnVuY3Rpb24gKGxpbWl0ID0gMzApIHtcbiAgICBpZiAodGhpcy5mcmFtZXMubGVuZ3RoIDwgbGltaXQpIHsgcmV0dXJuIH1cbiAgICB0aGlzLmZyYW1lcy5zaGlmdCgpXG4gIH1cblxuICB0aGlzLmxhc3QgPSBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIHRoaXMuZnJhbWVzW3RoaXMuaW5kZXggLSAxXVxuICB9XG5cbiAgdGhpcy5sZW5ndGggPSBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIHRoaXMuZnJhbWVzLmxlbmd0aFxuICB9XG5cbiAgZnVuY3Rpb24gY2xhbXAgKHYsIG1pbiwgbWF4KSB7IHJldHVybiB2IDwgbWluID8gbWluIDogdiA+IG1heCA/IG1heCA6IHYgfVxufVxuXG4vKioqIEVYUE9SVFMgRlJPTSBleHBvcnRzLWxvYWRlciAqKiovXG5leHBvcnQgZGVmYXVsdCBIaXN0b3J5O1xuIiwiJ3VzZSBzdHJpY3QnXG5cbi8qIGdsb2JhbCBGaWxlUmVhZGVyICovXG4vKiBnbG9iYWwgTW91c2VFdmVudCAqL1xuXG5mdW5jdGlvbiBTb3VyY2UgKGNsaWVudCkge1xuICB0aGlzLmNhY2hlID0ge31cblxuICB0aGlzLmluc3RhbGwgPSAoKSA9PiB7XG4gIH1cblxuICB0aGlzLnN0YXJ0ID0gKCkgPT4ge1xuICAgIHRoaXMubmV3KClcbiAgfVxuXG4gIHRoaXMubmV3ID0gKCkgPT4ge1xuICAgIGNvbnNvbGUubG9nKCdTb3VyY2UnLCAnTmV3IGZpbGUuLicpXG4gICAgdGhpcy5jYWNoZSA9IHt9XG4gIH1cblxuICB0aGlzLm9wZW4gPSAoZXh0LCBjYWxsYmFjaywgc3RvcmUgPSBmYWxzZSkgPT4ge1xuICAgIGNvbnNvbGUubG9nKCdTb3VyY2UnLCAnT3BlbiBmaWxlLi4nKVxuICAgIGNvbnN0IGlucHV0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW5wdXQnKVxuICAgIGlucHV0LnR5cGUgPSAnZmlsZSdcbiAgICBpbnB1dC5vbmNoYW5nZSA9IChlKSA9PiB7XG4gICAgICBjb25zdCBmaWxlID0gZS50YXJnZXQuZmlsZXNbMF1cbiAgICAgIGlmIChmaWxlLm5hbWUuaW5kZXhPZignLicgKyBleHQpIDwgMCkgeyBjb25zb2xlLndhcm4oJ1NvdXJjZScsIGBTa2lwcGVkICR7ZmlsZS5uYW1lfWApOyByZXR1cm4gfVxuICAgICAgdGhpcy5yZWFkKGZpbGUsIGNhbGxiYWNrLCBzdG9yZSlcbiAgICB9XG4gICAgaW5wdXQuY2xpY2soKVxuICB9XG5cbiAgdGhpcy5sb2FkID0gKGV4dCwgY2FsbGJhY2spID0+IHtcbiAgICBjb25zb2xlLmxvZygnU291cmNlJywgJ0xvYWQgZmlsZXMuLicpXG4gICAgY29uc3QgaW5wdXQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbnB1dCcpXG4gICAgaW5wdXQudHlwZSA9ICdmaWxlJ1xuICAgIGlucHV0LnNldEF0dHJpYnV0ZSgnbXVsdGlwbGUnLCAnbXVsdGlwbGUnKVxuICAgIGlucHV0Lm9uY2hhbmdlID0gKGUpID0+IHtcbiAgICAgIGZvciAoY29uc3QgZmlsZSBvZiBlLnRhcmdldC5maWxlcykge1xuICAgICAgICBpZiAoZmlsZS5uYW1lLmluZGV4T2YoJy4nICsgZXh0KSA8IDApIHsgY29uc29sZS53YXJuKCdTb3VyY2UnLCBgU2tpcHBlZCAke2ZpbGUubmFtZX1gKTsgY29udGludWUgfVxuICAgICAgICB0aGlzLnJlYWQoZmlsZSwgdGhpcy5zdG9yZSlcbiAgICAgIH1cbiAgICB9XG4gICAgaW5wdXQuY2xpY2soKVxuICB9XG5cbiAgdGhpcy5zdG9yZSA9IChmaWxlLCBjb250ZW50KSA9PiB7XG4gICAgY29uc29sZS5pbmZvKCdTb3VyY2UnLCAnU3RvcmVkICcgKyBmaWxlLm5hbWUpXG4gICAgdGhpcy5jYWNoZVtmaWxlLm5hbWVdID0gY29udGVudFxuICB9XG5cbiAgdGhpcy5zYXZlID0gKG5hbWUsIGNvbnRlbnQsIHR5cGUgPSAndGV4dC9wbGFpbicsIGNhbGxiYWNrKSA9PiB7XG4gICAgdGhpcy5zYXZlQXMobmFtZSwgY29udGVudCwgdHlwZSwgY2FsbGJhY2spXG4gIH1cblxuICB0aGlzLnNhdmVBcyA9IChuYW1lLCBleHQsIGNvbnRlbnQsIHR5cGUgPSAndGV4dC9wbGFpbicsIGNhbGxiYWNrKSA9PiB7XG4gICAgY29uc29sZS5sb2coJ1NvdXJjZScsICdTYXZlIG5ldyBmaWxlLi4nKVxuICAgIHRoaXMud3JpdGUobmFtZSwgZXh0LCBjb250ZW50LCB0eXBlLCBjYWxsYmFjaylcbiAgfVxuXG4gIC8vIEkvT1xuXG4gIHRoaXMucmVhZCA9IChmaWxlLCBjYWxsYmFjaywgc3RvcmUgPSBmYWxzZSkgPT4ge1xuICAgIGNvbnN0IHJlYWRlciA9IG5ldyBGaWxlUmVhZGVyKClcbiAgICByZWFkZXIub25sb2FkID0gKGV2ZW50KSA9PiB7XG4gICAgICBjb25zdCByZXMgPSBldmVudC50YXJnZXQucmVzdWx0XG4gICAgICBpZiAoY2FsbGJhY2spIHsgY2FsbGJhY2soZmlsZSwgcmVzKSB9XG4gICAgICBpZiAoc3RvcmUpIHsgdGhpcy5zdG9yZShmaWxlLCByZXMpIH1cbiAgICB9XG4gICAgcmVhZGVyLnJlYWRBc1RleHQoZmlsZSwgJ1VURi04JylcbiAgfVxuXG4gIHRoaXMud3JpdGUgPSAobmFtZSwgZXh0LCBjb250ZW50LCB0eXBlLCBzZXR0aW5ncyA9ICdjaGFyc2V0PXV0Zi04JykgPT4ge1xuICAgIGNvbnN0IGxpbmsgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdhJylcbiAgICBsaW5rLnNldEF0dHJpYnV0ZSgnZG93bmxvYWQnLCBgJHtuYW1lfS0ke3RpbWVzdGFtcCgpfS4ke2V4dH1gKVxuICAgIGlmICh0eXBlID09PSAnaW1hZ2UvcG5nJyB8fCB0eXBlID09PSAnaW1hZ2UvanBlZycpIHtcbiAgICAgIGxpbmsuc2V0QXR0cmlidXRlKCdocmVmJywgY29udGVudClcbiAgICB9IGVsc2Uge1xuICAgICAgbGluay5zZXRBdHRyaWJ1dGUoJ2hyZWYnLCAnZGF0YTonICsgdHlwZSArICc7JyArIHNldHRpbmdzICsgJywnICsgZW5jb2RlVVJJQ29tcG9uZW50KGNvbnRlbnQpKVxuICAgIH1cbiAgICBsaW5rLmRpc3BhdGNoRXZlbnQobmV3IE1vdXNlRXZlbnQoJ2NsaWNrJywgeyBidWJibGVzOiB0cnVlLCBjYW5jZWxhYmxlOiB0cnVlLCB2aWV3OiB3aW5kb3cgfSkpXG4gIH1cblxuICBmdW5jdGlvbiB0aW1lc3RhbXAgKGQgPSBuZXcgRGF0ZSgpLCBlID0gbmV3IERhdGUoZCkpIHtcbiAgICByZXR1cm4gYCR7YXJ2ZWxpZSgpfS0ke25lcmFsaWUoKX1gXG4gIH1cblxuICBmdW5jdGlvbiBhcnZlbGllIChkYXRlID0gbmV3IERhdGUoKSkge1xuICAgIGNvbnN0IHN0YXJ0ID0gbmV3IERhdGUoZGF0ZS5nZXRGdWxsWWVhcigpLCAwLCAwKVxuICAgIGNvbnN0IGRpZmYgPSAoZGF0ZSAtIHN0YXJ0KSArICgoc3RhcnQuZ2V0VGltZXpvbmVPZmZzZXQoKSAtIGRhdGUuZ2V0VGltZXpvbmVPZmZzZXQoKSkgKiA2MCAqIDEwMDApXG4gICAgY29uc3QgZG90eSA9IE1hdGguZmxvb3IoZGlmZiAvIDg2NDAwMDAwKSAtIDFcbiAgICBjb25zdCB5ID0gZGF0ZS5nZXRGdWxsWWVhcigpLnRvU3RyaW5nKCkuc3Vic3RyKDIsIDIpXG4gICAgY29uc3QgbSA9IGRvdHkgPT09IDM2NCB8fCBkb3R5ID09PSAzNjUgPyAnKycgOiBTdHJpbmcuZnJvbUNoYXJDb2RlKDk3ICsgTWF0aC5mbG9vcihkb3R5IC8gMTQpKS50b1VwcGVyQ2FzZSgpXG4gICAgY29uc3QgZCA9IGAkeyhkb3R5ID09PSAzNjUgPyAxIDogZG90eSA9PT0gMzY2ID8gMiA6IChkb3R5ICUgMTQpKSArIDF9YC5wYWRTdGFydCgyLCAnMCcpXG4gICAgcmV0dXJuIGAke3l9JHttfSR7ZH1gXG4gIH1cblxuICBmdW5jdGlvbiBuZXJhbGllIChkID0gbmV3IERhdGUoKSwgZSA9IG5ldyBEYXRlKGQpKSB7XG4gICAgY29uc3QgbXMgPSBlIC0gZC5zZXRIb3VycygwLCAwLCAwLCAwKVxuICAgIHJldHVybiAobXMgLyA4NjQwIC8gMTAwMDApLnRvRml4ZWQoNikuc3Vic3RyKDIsIDYpXG4gIH1cbn1cblxuLyoqKiBFWFBPUlRTIEZST00gZXhwb3J0cy1sb2FkZXIgKioqL1xuZXhwb3J0IGRlZmF1bHQgU291cmNlO1xuIiwiJ3VzZSBzdHJpY3QnXG5cbi8qIGdsb2JhbCBsb2NhbFN0b3JhZ2UgKi9cbi8qIGdsb2JhbCBGaWxlUmVhZGVyICovXG4vKiBnbG9iYWwgRE9NUGFyc2VyICovXG5cbmZ1bmN0aW9uIFRoZW1lIChjbGllbnQpIHtcbiAgdGhpcy5lbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3N0eWxlJylcbiAgdGhpcy5lbC50eXBlID0gJ3RleHQvY3NzJ1xuXG4gIHRoaXMuYWN0aXZlID0ge31cbiAgdGhpcy5kZWZhdWx0ID0ge1xuICAgIGJhY2tncm91bmQ6ICcjZWVlZWVlJyxcbiAgICBmX2hpZ2g6ICcjMGEwYTBhJyxcbiAgICBmX21lZDogJyM0YTRhNGEnLFxuICAgIGZfbG93OiAnIzZhNmE2YScsXG4gICAgZl9pbnY6ICcjMTExMTExJyxcbiAgICBiX2hpZ2g6ICcjYTFhMWExJyxcbiAgICBiX21lZDogJyNjMWMxYzEnLFxuICAgIGJfbG93OiAnI2ZmZmZmZicsXG4gICAgYl9pbnY6ICcjZmZiNTQ1J1xuICB9XG5cbiAgLy8gQ2FsbGJhY2tzXG4gIHRoaXMub25Mb2FkID0gKCkgPT4ge31cblxuICB0aGlzLmluc3RhbGwgPSAoaG9zdCA9IGRvY3VtZW50LmJvZHkpID0+IHtcbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignZHJhZ292ZXInLCB0aGlzLmRyYWcpXG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ2Ryb3AnLCB0aGlzLmRyb3ApXG4gICAgaG9zdC5hcHBlbmRDaGlsZCh0aGlzLmVsKVxuICB9XG5cbiAgdGhpcy5zdGFydCA9ICgpID0+IHtcbiAgICBjb25zb2xlLmxvZygnVGhlbWUnLCAnU3RhcnRpbmcuLicpXG4gICAgaWYgKGlzSnNvbihsb2NhbFN0b3JhZ2UudGhlbWUpKSB7XG4gICAgICBjb25zdCBzdG9yYWdlID0gSlNPTi5wYXJzZShsb2NhbFN0b3JhZ2UudGhlbWUpXG4gICAgICBpZiAoaXNWYWxpZChzdG9yYWdlKSkge1xuICAgICAgICBjb25zb2xlLmxvZygnVGhlbWUnLCAnTG9hZGluZyB0aGVtZSBpbiBsb2NhbFN0b3JhZ2UuLicpXG4gICAgICAgIHRoaXMubG9hZChzdG9yYWdlKVxuICAgICAgICByZXR1cm5cbiAgICAgIH1cbiAgICB9XG4gICAgdGhpcy5sb2FkKHRoaXMuZGVmYXVsdClcbiAgfVxuXG4gIHRoaXMub3BlbiA9ICgpID0+IHtcbiAgICBjb25zb2xlLmxvZygnVGhlbWUnLCAnT3BlbiB0aGVtZS4uJylcbiAgICBjb25zdCBpbnB1dCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2lucHV0JylcbiAgICBpbnB1dC50eXBlID0gJ2ZpbGUnXG4gICAgaW5wdXQub25jaGFuZ2UgPSAoZSkgPT4ge1xuICAgICAgdGhpcy5yZWFkKGUudGFyZ2V0LmZpbGVzWzBdLCB0aGlzLmxvYWQpXG4gICAgfVxuICAgIGlucHV0LmNsaWNrKClcbiAgfVxuXG4gIHRoaXMubG9hZCA9IChkYXRhKSA9PiB7XG4gICAgY29uc3QgdGhlbWUgPSB0aGlzLnBhcnNlKGRhdGEpXG4gICAgaWYgKCFpc1ZhbGlkKHRoZW1lKSkgeyBjb25zb2xlLndhcm4oJ1RoZW1lJywgJ0ludmFsaWQgZm9ybWF0Jyk7IHJldHVybiB9XG4gICAgY29uc29sZS5sb2coJ1RoZW1lJywgJ0xvYWRlZCB0aGVtZSEnKVxuICAgIHRoaXMuZWwuaW5uZXJIVE1MID0gYDpyb290IHsgXG4gICAgICAtLWJhY2tncm91bmQ6ICR7dGhlbWUuYmFja2dyb3VuZH07IFxuICAgICAgLS1mX2hpZ2g6ICR7dGhlbWUuZl9oaWdofTsgXG4gICAgICAtLWZfbWVkOiAke3RoZW1lLmZfbWVkfTsgXG4gICAgICAtLWZfbG93OiAke3RoZW1lLmZfbG93fTsgXG4gICAgICAtLWZfaW52OiAke3RoZW1lLmZfaW52fTsgXG4gICAgICAtLWJfaGlnaDogJHt0aGVtZS5iX2hpZ2h9OyBcbiAgICAgIC0tYl9tZWQ6ICR7dGhlbWUuYl9tZWR9OyBcbiAgICAgIC0tYl9sb3c6ICR7dGhlbWUuYl9sb3d9OyBcbiAgICAgIC0tYl9pbnY6ICR7dGhlbWUuYl9pbnZ9O1xuICAgIH1gXG4gICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oJ3RoZW1lJywgSlNPTi5zdHJpbmdpZnkodGhlbWUpKVxuICAgIHRoaXMuYWN0aXZlID0gdGhlbWVcbiAgICBpZiAodGhpcy5vbkxvYWQpIHtcbiAgICAgIHRoaXMub25Mb2FkKGRhdGEpXG4gICAgfVxuICB9XG5cbiAgdGhpcy5yZXNldCA9ICgpID0+IHtcbiAgICB0aGlzLmxvYWQodGhpcy5kZWZhdWx0KVxuICB9XG5cbiAgdGhpcy5zZXQgPSAoa2V5LCB2YWwpID0+IHtcbiAgICBpZiAoIXZhbCkgeyByZXR1cm4gfVxuICAgIGNvbnN0IGhleCA9IChgJHt2YWx9YC5zdWJzdHIoMCwgMSkgIT09ICcjJyA/ICcjJyA6ICcnKSArIGAke3ZhbH1gXG4gICAgaWYgKCFpc0NvbG9yKGhleCkpIHsgY29uc29sZS53YXJuKCdUaGVtZScsIGAke2hleH0gaXMgbm90IGEgdmFsaWQgY29sb3IuYCk7IHJldHVybiB9XG4gICAgdGhpcy5hY3RpdmVba2V5XSA9IGhleFxuICB9XG5cbiAgdGhpcy5yZWFkID0gKGtleSkgPT4ge1xuICAgIHJldHVybiB0aGlzLmFjdGl2ZVtrZXldXG4gIH1cblxuICB0aGlzLnBhcnNlID0gKGFueSkgPT4ge1xuICAgIGlmIChpc1ZhbGlkKGFueSkpIHsgcmV0dXJuIGFueSB9XG4gICAgaWYgKGlzSnNvbihhbnkpKSB7IHJldHVybiBKU09OLnBhcnNlKGFueSkgfVxuICAgIGlmIChpc0h0bWwoYW55KSkgeyByZXR1cm4gZXh0cmFjdChhbnkpIH1cbiAgfVxuXG4gIC8vIERyYWdcblxuICB0aGlzLmRyYWcgPSAoZSkgPT4ge1xuICAgIGUuc3RvcFByb3BhZ2F0aW9uKClcbiAgICBlLnByZXZlbnREZWZhdWx0KClcbiAgICBlLmRhdGFUcmFuc2Zlci5kcm9wRWZmZWN0ID0gJ2NvcHknXG4gIH1cblxuICB0aGlzLmRyb3AgPSAoZSkgPT4ge1xuICAgIGUucHJldmVudERlZmF1bHQoKVxuICAgIGNvbnN0IGZpbGUgPSBlLmRhdGFUcmFuc2Zlci5maWxlc1swXVxuICAgIGlmIChmaWxlLm5hbWUuaW5kZXhPZignLnN2ZycpID4gLTEpIHtcbiAgICAgIHRoaXMucmVhZChmaWxlLCB0aGlzLmxvYWQpXG4gICAgfVxuICAgIGUuc3RvcFByb3BhZ2F0aW9uKClcbiAgfVxuXG4gIHRoaXMucmVhZCA9IChmaWxlLCBjYWxsYmFjaykgPT4ge1xuICAgIGNvbnN0IHJlYWRlciA9IG5ldyBGaWxlUmVhZGVyKClcbiAgICByZWFkZXIub25sb2FkID0gKGV2ZW50KSA9PiB7XG4gICAgICBjYWxsYmFjayhldmVudC50YXJnZXQucmVzdWx0KVxuICAgIH1cbiAgICByZWFkZXIucmVhZEFzVGV4dChmaWxlLCAnVVRGLTgnKVxuICB9XG5cbiAgLy8gSGVscGVyc1xuXG4gIGZ1bmN0aW9uIGV4dHJhY3QgKHhtbCkge1xuICAgIGNvbnN0IHN2ZyA9IG5ldyBET01QYXJzZXIoKS5wYXJzZUZyb21TdHJpbmcoeG1sLCAndGV4dC94bWwnKVxuICAgIHRyeSB7XG4gICAgICByZXR1cm4ge1xuICAgICAgICBiYWNrZ3JvdW5kOiBzdmcuZ2V0RWxlbWVudEJ5SWQoJ2JhY2tncm91bmQnKS5nZXRBdHRyaWJ1dGUoJ2ZpbGwnKSxcbiAgICAgICAgZl9oaWdoOiBzdmcuZ2V0RWxlbWVudEJ5SWQoJ2ZfaGlnaCcpLmdldEF0dHJpYnV0ZSgnZmlsbCcpLFxuICAgICAgICBmX21lZDogc3ZnLmdldEVsZW1lbnRCeUlkKCdmX21lZCcpLmdldEF0dHJpYnV0ZSgnZmlsbCcpLFxuICAgICAgICBmX2xvdzogc3ZnLmdldEVsZW1lbnRCeUlkKCdmX2xvdycpLmdldEF0dHJpYnV0ZSgnZmlsbCcpLFxuICAgICAgICBmX2ludjogc3ZnLmdldEVsZW1lbnRCeUlkKCdmX2ludicpLmdldEF0dHJpYnV0ZSgnZmlsbCcpLFxuICAgICAgICBiX2hpZ2g6IHN2Zy5nZXRFbGVtZW50QnlJZCgnYl9oaWdoJykuZ2V0QXR0cmlidXRlKCdmaWxsJyksXG4gICAgICAgIGJfbWVkOiBzdmcuZ2V0RWxlbWVudEJ5SWQoJ2JfbWVkJykuZ2V0QXR0cmlidXRlKCdmaWxsJyksXG4gICAgICAgIGJfbG93OiBzdmcuZ2V0RWxlbWVudEJ5SWQoJ2JfbG93JykuZ2V0QXR0cmlidXRlKCdmaWxsJyksXG4gICAgICAgIGJfaW52OiBzdmcuZ2V0RWxlbWVudEJ5SWQoJ2JfaW52JykuZ2V0QXR0cmlidXRlKCdmaWxsJylcbiAgICAgIH1cbiAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgIGNvbnNvbGUud2FybignVGhlbWUnLCAnSW5jb21wbGV0ZSBTVkcgVGhlbWUnLCBlcnIpXG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gaXNWYWxpZCAoanNvbikge1xuICAgIGlmICghanNvbikgeyByZXR1cm4gZmFsc2UgfVxuICAgIGlmICghanNvbi5iYWNrZ3JvdW5kIHx8ICFpc0NvbG9yKGpzb24uYmFja2dyb3VuZCkpIHsgcmV0dXJuIGZhbHNlIH1cbiAgICBpZiAoIWpzb24uZl9oaWdoIHx8ICFpc0NvbG9yKGpzb24uZl9oaWdoKSkgeyByZXR1cm4gZmFsc2UgfVxuICAgIGlmICghanNvbi5mX21lZCB8fCAhaXNDb2xvcihqc29uLmZfbWVkKSkgeyByZXR1cm4gZmFsc2UgfVxuICAgIGlmICghanNvbi5mX2xvdyB8fCAhaXNDb2xvcihqc29uLmZfbG93KSkgeyByZXR1cm4gZmFsc2UgfVxuICAgIGlmICghanNvbi5mX2ludiB8fCAhaXNDb2xvcihqc29uLmZfaW52KSkgeyByZXR1cm4gZmFsc2UgfVxuICAgIGlmICghanNvbi5iX2hpZ2ggfHwgIWlzQ29sb3IoanNvbi5iX2hpZ2gpKSB7IHJldHVybiBmYWxzZSB9XG4gICAgaWYgKCFqc29uLmJfbWVkIHx8ICFpc0NvbG9yKGpzb24uYl9tZWQpKSB7IHJldHVybiBmYWxzZSB9XG4gICAgaWYgKCFqc29uLmJfbG93IHx8ICFpc0NvbG9yKGpzb24uYl9sb3cpKSB7IHJldHVybiBmYWxzZSB9XG4gICAgaWYgKCFqc29uLmJfaW52IHx8ICFpc0NvbG9yKGpzb24uYl9pbnYpKSB7IHJldHVybiBmYWxzZSB9XG4gICAgcmV0dXJuIHRydWVcbiAgfVxuXG4gIGZ1bmN0aW9uIGlzQ29sb3IgKGhleCkge1xuICAgIHJldHVybiAvXiMoWzAtOUEtRl17M30pezEsMn0kL2kudGVzdChoZXgpXG4gIH1cblxuICBmdW5jdGlvbiBpc0pzb24gKHRleHQpIHtcbiAgICB0cnkgeyBKU09OLnBhcnNlKHRleHQpOyByZXR1cm4gdHJ1ZSB9IGNhdGNoIChlcnJvcikgeyByZXR1cm4gZmFsc2UgfVxuICB9XG5cbiAgZnVuY3Rpb24gaXNIdG1sICh0ZXh0KSB7XG4gICAgdHJ5IHsgbmV3IERPTVBhcnNlcigpLnBhcnNlRnJvbVN0cmluZyh0ZXh0LCAndGV4dC94bWwnKTsgcmV0dXJuIHRydWUgfSBjYXRjaCAoZXJyb3IpIHsgcmV0dXJuIGZhbHNlIH1cbiAgfVxufVxuXG4vKioqIEVYUE9SVFMgRlJPTSBleHBvcnRzLWxvYWRlciAqKiovXG5leHBvcnQgZGVmYXVsdCBUaGVtZTtcbiIsIi8qKiogSU1QT1JUUyBGUk9NIGltcG9ydHMtbG9hZGVyICoqKi9cbid1c2Ugc3RyaWN0JztcbmltcG9ydCBsaWJyYXJ5IGZyb20gXCIuL2NvcmUvbGlicmFyeS5qc1wiO1xuaW1wb3J0IEFjZWxzIGZyb20gXCIuL2xpYi9hY2Vscy5qc1wiO1xuaW1wb3J0IFNvdXJjZSBmcm9tIFwiLi9saWIvc291cmNlLmpzXCI7XG5pbXBvcnQgSGlzdG9yeSBmcm9tIFwiLi9saWIvaGlzdG9yeS5qc1wiO1xuaW1wb3J0IE9yY2EgZnJvbSBcIi4vY29yZS9vcmNhLmpzXCI7XG5pbXBvcnQgSU8gZnJvbSBcIi4vY29yZS9pby5qc1wiO1xuaW1wb3J0IEN1cnNvciBmcm9tIFwiLi9jdXJzb3IuanNcIjtcbmltcG9ydCBDb21tYW5kZXIgZnJvbSBcIi4vY29tbWFuZGVyLmpzXCI7XG5pbXBvcnQgQ2xvY2sgZnJvbSBcIi4vY2xvY2suanNcIjtcbmltcG9ydCBUaGVtZSBmcm9tIFwiLi9saWIvdGhlbWUuanNcIjtcblxuJ3VzZSBzdHJpY3QnXG5cbi8qIGdsb2JhbCBsaWJyYXJ5ICovXG4vKiBnbG9iYWwgQWNlbHMgKi9cbi8qIGdsb2JhbCBTb3VyY2UgKi9cbi8qIGdsb2JhbCBIaXN0b3J5ICovXG4vKiBnbG9iYWwgT3JjYSAqL1xuLyogZ2xvYmFsIElPICovXG4vKiBnbG9iYWwgQ3Vyc29yICovXG4vKiBnbG9iYWwgQ29tbWFuZGVyICovXG4vKiBnbG9iYWwgQ2xvY2sgKi9cbi8qIGdsb2JhbCBUaGVtZSAqL1xuXG5mdW5jdGlvbiBDbGllbnQgKCkge1xuICB0aGlzLnZlcnNpb24gPSAxNzZcbiAgdGhpcy5saWJyYXJ5ID0gbGlicmFyeVxuXG4gIHRoaXMudGhlbWUgPSBuZXcgVGhlbWUodGhpcylcbiAgdGhpcy5hY2VscyA9IG5ldyBBY2Vscyh0aGlzKVxuICB0aGlzLnNvdXJjZSA9IG5ldyBTb3VyY2UodGhpcylcbiAgdGhpcy5oaXN0b3J5ID0gbmV3IEhpc3RvcnkodGhpcylcblxuICB0aGlzLm9yY2EgPSBuZXcgT3JjYSh0aGlzLmxpYnJhcnkpXG4gIHRoaXMuaW8gPSBuZXcgSU8odGhpcylcbiAgdGhpcy5jdXJzb3IgPSBuZXcgQ3Vyc29yKHRoaXMpXG4gIHRoaXMuY29tbWFuZGVyID0gbmV3IENvbW1hbmRlcih0aGlzKVxuICB0aGlzLmNsb2NrID0gbmV3IENsb2NrKHRoaXMpXG5cbiAgLy8gU2V0dGluZ3NcbiAgdGhpcy5zY2FsZSA9IHdpbmRvdy5kZXZpY2VQaXhlbFJhdGlvXG4gIHRoaXMuZ3JpZCA9IHsgdzogOCwgaDogOCB9XG4gIHRoaXMudGlsZSA9IHtcbiAgICB3OiArbG9jYWxTdG9yYWdlLmdldEl0ZW0oJ3RpbGV3JykgfHwgMTAsXG4gICAgaDogK2xvY2FsU3RvcmFnZS5nZXRJdGVtKCd0aWxlaCcpIHx8IDE1XG4gIH1cbiAgdGhpcy5ndWlkZSA9IGZhbHNlXG5cbiAgdGhpcy5lbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2NhbnZhcycpXG4gIHRoaXMuY29udGV4dCA9IHRoaXMuZWwuZ2V0Q29udGV4dCgnMmQnKVxuXG4gIHRoaXMuaW5zdGFsbCA9IChob3N0KSA9PiB7XG4gICAgaG9zdC5hcHBlbmRDaGlsZCh0aGlzLmVsKVxuICAgIHRoaXMudGhlbWUuaW5zdGFsbChob3N0KVxuXG4gICAgdGhpcy50aGVtZS5kZWZhdWx0ID0geyBiYWNrZ3JvdW5kOiAnIzAwMDAwMCcsIGZfaGlnaDogJyNmZmZmZmYnLCBmX21lZDogJyM3Nzc3NzcnLCBmX2xvdzogJyM0NDQ0NDQnLCBmX2ludjogJyMwMDAwMDAnLCBiX2hpZ2g6ICcjZWVlZWVlJywgYl9tZWQ6ICcjNzJkZWMyJywgYl9sb3c6ICcjNDQ0NDQ0JywgYl9pbnY6ICcjZmZiNTQ1JyB9XG5cbiAgICB0aGlzLmFjZWxzLnNldCgnRmlsZScsICdOZXcnLCAnQ21kT3JDdHJsK04nLCAoKSA9PiB7IHRoaXMucmVzZXQoKSB9KVxuICAgIHRoaXMuYWNlbHMuc2V0KCdGaWxlJywgJ09wZW4nLCAnQ21kT3JDdHJsK08nLCAoKSA9PiB7IHRoaXMuc291cmNlLm9wZW4oJ29yY2EnLCB0aGlzLndoZW5PcGVuLCB0cnVlKSB9KVxuICAgIHRoaXMuYWNlbHMuc2V0KCdGaWxlJywgJ0ltcG9ydCBNb2R1bGVzJywgJ0NtZE9yQ3RybCtMJywgKCkgPT4geyB0aGlzLnNvdXJjZS5sb2FkKCdvcmNhJykgfSlcbiAgICB0aGlzLmFjZWxzLnNldCgnRmlsZScsICdFeHBvcnQnLCAnQ21kT3JDdHJsK1MnLCAoKSA9PiB7IHRoaXMuc291cmNlLndyaXRlKCdvcmNhJywgJ29yY2EnLCBgJHt0aGlzLm9yY2F9YCwgJ3RleHQvcGxhaW4nKSB9KVxuICAgIHRoaXMuYWNlbHMuc2V0KCdGaWxlJywgJ0V4cG9ydCBTZWxlY3Rpb24nLCAnQ21kT3JDdHJsK1NoaWZ0K1MnLCAoKSA9PiB7IHRoaXMuc291cmNlLndyaXRlKCdvcmNhJywgJ29yY2EnLCBgJHt0aGlzLmN1cnNvci5zZWxlY3Rpb24oKX1gLCAndGV4dC9wbGFpbicpIH0pXG5cbiAgICB0aGlzLmFjZWxzLnNldCgnRWRpdCcsICdVbmRvJywgJ0NtZE9yQ3RybCtaJywgKCkgPT4geyB0aGlzLmhpc3RvcnkudW5kbygpIH0pXG4gICAgdGhpcy5hY2Vscy5zZXQoJ0VkaXQnLCAnUmVkbycsICdDbWRPckN0cmwrU2hpZnQrWicsICgpID0+IHsgdGhpcy5oaXN0b3J5LnJlZG8oKSB9KVxuICAgIHRoaXMuYWNlbHMuYWRkKCdFZGl0JywgJ2N1dCcpXG4gICAgdGhpcy5hY2Vscy5hZGQoJ0VkaXQnLCAnY29weScpXG4gICAgdGhpcy5hY2Vscy5hZGQoJ0VkaXQnLCAncGFzdGUnKVxuICAgIHRoaXMuYWNlbHMuc2V0KCdFZGl0JywgJ1NlbGVjdCBBbGwnLCAnQ21kT3JDdHJsK0EnLCAoKSA9PiB7IHRoaXMuY3Vyc29yLnNlbGVjdEFsbCgpIH0pXG4gICAgdGhpcy5hY2Vscy5zZXQoJ0VkaXQnLCAnRXJhc2UgU2VsZWN0aW9uJywgJ0JhY2tzcGFjZScsICgpID0+IHsgaWYgKHRoaXMuY3Vyc29yLmlucykgeyB0aGlzLmN1cnNvci5lcmFzZSgpOyB0aGlzLmN1cnNvci5tb3ZlKC0xLCAwKSB9IGVsc2UgeyB0aGlzW3RoaXMuY29tbWFuZGVyLmlzQWN0aXZlID8gJ2NvbW1hbmRlcicgOiAnY3Vyc29yJ10uZXJhc2UoKSB9IH0pXG4gICAgdGhpcy5hY2Vscy5zZXQoJ0VkaXQnLCAnVXBwZXJjYXNlJywgJ0NtZE9yQ3RybCtTaGlmdCtVJywgKCkgPT4geyB0aGlzLmN1cnNvci50b1VwcGVyQ2FzZSgpIH0pXG4gICAgdGhpcy5hY2Vscy5zZXQoJ0VkaXQnLCAnTG93ZXJjYXNlJywgJ0NtZE9yQ3RybCtTaGlmdCtMJywgKCkgPT4geyB0aGlzLmN1cnNvci50b0xvd2VyQ2FzZSgpIH0pXG4gICAgdGhpcy5hY2Vscy5zZXQoJ0VkaXQnLCAnRHJhZyBOb3J0aCcsICdBbHQrQXJyb3dVcCcsICgpID0+IHsgdGhpcy5jdXJzb3IuZHJhZygwLCAxKSB9KVxuICAgIHRoaXMuYWNlbHMuc2V0KCdFZGl0JywgJ0RyYWcgRWFzdCcsICdBbHQrQXJyb3dSaWdodCcsICgpID0+IHsgdGhpcy5jdXJzb3IuZHJhZygxLCAwKSB9KVxuICAgIHRoaXMuYWNlbHMuc2V0KCdFZGl0JywgJ0RyYWcgU291dGgnLCAnQWx0K0Fycm93RG93bicsICgpID0+IHsgdGhpcy5jdXJzb3IuZHJhZygwLCAtMSkgfSlcbiAgICB0aGlzLmFjZWxzLnNldCgnRWRpdCcsICdEcmFnIFdlc3QnLCAnQWx0K0Fycm93TGVmdCcsICgpID0+IHsgdGhpcy5jdXJzb3IuZHJhZygtMSwgMCkgfSlcbiAgICB0aGlzLmFjZWxzLnNldCgnRWRpdCcsICdEcmFnIE5vcnRoKExlYXApJywgJ0NtZE9yQ3RybCtBbHQrQXJyb3dVcCcsICgpID0+IHsgdGhpcy5jdXJzb3IuZHJhZygwLCB0aGlzLmdyaWQuaCkgfSlcbiAgICB0aGlzLmFjZWxzLnNldCgnRWRpdCcsICdEcmFnIEVhc3QoTGVhcCknLCAnQ21kT3JDdHJsK0FsdCtBcnJvd1JpZ2h0JywgKCkgPT4geyB0aGlzLmN1cnNvci5kcmFnKHRoaXMuZ3JpZC53LCAwKSB9KVxuICAgIHRoaXMuYWNlbHMuc2V0KCdFZGl0JywgJ0RyYWcgU291dGgoTGVhcCknLCAnQ21kT3JDdHJsK0FsdCtBcnJvd0Rvd24nLCAoKSA9PiB7IHRoaXMuY3Vyc29yLmRyYWcoMCwgLXRoaXMuZ3JpZC5oKSB9KVxuICAgIHRoaXMuYWNlbHMuc2V0KCdFZGl0JywgJ0RyYWcgV2VzdChMZWFwKScsICdDbWRPckN0cmwrQWx0K0Fycm93TGVmdCcsICgpID0+IHsgdGhpcy5jdXJzb3IuZHJhZygtdGhpcy5ncmlkLncsIDApIH0pXG5cbiAgICB0aGlzLmFjZWxzLnNldCgnUHJvamVjdCcsICdGaW5kJywgJ0NtZE9yQ3RybCtKJywgKCkgPT4geyB0aGlzLmNvbW1hbmRlci5zdGFydCgnZmluZDonKSB9KVxuICAgIHRoaXMuYWNlbHMuc2V0KCdQcm9qZWN0JywgJ0luamVjdCcsICdDbWRPckN0cmwrQicsICgpID0+IHsgdGhpcy5jb21tYW5kZXIuc3RhcnQoJ2luamVjdDonKSB9KVxuICAgIHRoaXMuYWNlbHMuc2V0KCdQcm9qZWN0JywgJ1RvZ2dsZSBDb21tYW5kZXInLCAnQ21kT3JDdHJsK0snLCAoKSA9PiB7IHRoaXMuY29tbWFuZGVyLnN0YXJ0KCkgfSlcbiAgICB0aGlzLmFjZWxzLnNldCgnUHJvamVjdCcsICdSdW4gQ29tbWFuZGVyJywgJ0VudGVyJywgKCkgPT4geyB0aGlzLmNvbW1hbmRlci5ydW4oKSB9KVxuXG4gICAgdGhpcy5hY2Vscy5zZXQoJ0N1cnNvcicsICdUb2dnbGUgSW5zZXJ0IE1vZGUnLCAnQ21kT3JDdHJsK0knLCAoKSA9PiB7IHRoaXMuY3Vyc29yLmlucyA9ICF0aGlzLmN1cnNvci5pbnMgfSlcbiAgICB0aGlzLmFjZWxzLnNldCgnQ3Vyc29yJywgJ1RvZ2dsZSBCbG9jayBDb21tZW50JywgJ0NtZE9yQ3RybCsvJywgKCkgPT4geyB0aGlzLmN1cnNvci5jb21tZW50KCkgfSlcbiAgICB0aGlzLmFjZWxzLnNldCgnQ3Vyc29yJywgJ1RyaWdnZXIgT3BlcmF0b3InLCAnQ21kT3JDdHJsK1AnLCAoKSA9PiB7IHRoaXMuY3Vyc29yLnRyaWdnZXIoKSB9KVxuICAgIHRoaXMuYWNlbHMuc2V0KCdDdXJzb3InLCAnUmVzZXQnLCAnRXNjYXBlJywgKCkgPT4geyB0aGlzLnRvZ2dsZUd1aWRlKGZhbHNlKTsgdGhpcy5jb21tYW5kZXIuc3RvcCgpOyB0aGlzLmNsZWFyKCk7IHRoaXMuY2xvY2suaXNQYXVzZWQgPSBmYWxzZTsgdGhpcy5jdXJzb3IucmVzZXQoKSB9KVxuXG4gICAgdGhpcy5hY2Vscy5zZXQoJ01vdmUnLCAnTW92ZSBOb3J0aCcsICdBcnJvd1VwJywgKCkgPT4geyB0aGlzLmN1cnNvci5tb3ZlKDAsIDEpIH0pXG4gICAgdGhpcy5hY2Vscy5zZXQoJ01vdmUnLCAnTW92ZSBFYXN0JywgJ0Fycm93UmlnaHQnLCAoKSA9PiB7IHRoaXMuY3Vyc29yLm1vdmUoMSwgMCkgfSlcbiAgICB0aGlzLmFjZWxzLnNldCgnTW92ZScsICdNb3ZlIFNvdXRoJywgJ0Fycm93RG93bicsICgpID0+IHsgdGhpcy5jdXJzb3IubW92ZSgwLCAtMSkgfSlcbiAgICB0aGlzLmFjZWxzLnNldCgnTW92ZScsICdNb3ZlIFdlc3QnLCAnQXJyb3dMZWZ0JywgKCkgPT4geyB0aGlzLmN1cnNvci5tb3ZlKC0xLCAwKSB9KVxuICAgIHRoaXMuYWNlbHMuc2V0KCdNb3ZlJywgJ01vdmUgTm9ydGgoTGVhcCknLCAnQ21kT3JDdHJsK0Fycm93VXAnLCAoKSA9PiB7IHRoaXMuY3Vyc29yLm1vdmUoMCwgdGhpcy5ncmlkLmgpIH0pXG4gICAgdGhpcy5hY2Vscy5zZXQoJ01vdmUnLCAnTW92ZSBFYXN0KExlYXApJywgJ0NtZE9yQ3RybCtBcnJvd1JpZ2h0JywgKCkgPT4geyB0aGlzLmN1cnNvci5tb3ZlKHRoaXMuZ3JpZC53LCAwKSB9KVxuICAgIHRoaXMuYWNlbHMuc2V0KCdNb3ZlJywgJ01vdmUgU291dGgoTGVhcCknLCAnQ21kT3JDdHJsK0Fycm93RG93bicsICgpID0+IHsgdGhpcy5jdXJzb3IubW92ZSgwLCAtdGhpcy5ncmlkLmgpIH0pXG4gICAgdGhpcy5hY2Vscy5zZXQoJ01vdmUnLCAnTW92ZSBXZXN0KExlYXApJywgJ0NtZE9yQ3RybCtBcnJvd0xlZnQnLCAoKSA9PiB7IHRoaXMuY3Vyc29yLm1vdmUoLXRoaXMuZ3JpZC53LCAwKSB9KVxuICAgIHRoaXMuYWNlbHMuc2V0KCdNb3ZlJywgJ1NjYWxlIE5vcnRoJywgJ1NoaWZ0K0Fycm93VXAnLCAoKSA9PiB7IHRoaXMuY3Vyc29yLnNjYWxlKDAsIDEpIH0pXG4gICAgdGhpcy5hY2Vscy5zZXQoJ01vdmUnLCAnU2NhbGUgRWFzdCcsICdTaGlmdCtBcnJvd1JpZ2h0JywgKCkgPT4geyB0aGlzLmN1cnNvci5zY2FsZSgxLCAwKSB9KVxuICAgIHRoaXMuYWNlbHMuc2V0KCdNb3ZlJywgJ1NjYWxlIFNvdXRoJywgJ1NoaWZ0K0Fycm93RG93bicsICgpID0+IHsgdGhpcy5jdXJzb3Iuc2NhbGUoMCwgLTEpIH0pXG4gICAgdGhpcy5hY2Vscy5zZXQoJ01vdmUnLCAnU2NhbGUgV2VzdCcsICdTaGlmdCtBcnJvd0xlZnQnLCAoKSA9PiB7IHRoaXMuY3Vyc29yLnNjYWxlKC0xLCAwKSB9KVxuICAgIHRoaXMuYWNlbHMuc2V0KCdNb3ZlJywgJ1NjYWxlIE5vcnRoKExlYXApJywgJ0NtZE9yQ3RybCtTaGlmdCtBcnJvd1VwJywgKCkgPT4geyB0aGlzLmN1cnNvci5zY2FsZSgwLCB0aGlzLmdyaWQuaCkgfSlcbiAgICB0aGlzLmFjZWxzLnNldCgnTW92ZScsICdTY2FsZSBFYXN0KExlYXApJywgJ0NtZE9yQ3RybCtTaGlmdCtBcnJvd1JpZ2h0JywgKCkgPT4geyB0aGlzLmN1cnNvci5zY2FsZSh0aGlzLmdyaWQudywgMCkgfSlcbiAgICB0aGlzLmFjZWxzLnNldCgnTW92ZScsICdTY2FsZSBTb3V0aChMZWFwKScsICdDbWRPckN0cmwrU2hpZnQrQXJyb3dEb3duJywgKCkgPT4geyB0aGlzLmN1cnNvci5zY2FsZSgwLCAtdGhpcy5ncmlkLmgpIH0pXG4gICAgdGhpcy5hY2Vscy5zZXQoJ01vdmUnLCAnU2NhbGUgV2VzdChMZWFwKScsICdDbWRPckN0cmwrU2hpZnQrQXJyb3dMZWZ0JywgKCkgPT4geyB0aGlzLmN1cnNvci5zY2FsZSgtdGhpcy5ncmlkLncsIDApIH0pXG5cbiAgICB0aGlzLmFjZWxzLnNldCgnQ2xvY2snLCAnUGxheS9QYXVzZScsICdTcGFjZScsICgpID0+IHsgaWYgKHRoaXMuY3Vyc29yLmlucykgeyB0aGlzLmN1cnNvci5tb3ZlKDEsIDApIH0gZWxzZSB7IHRoaXMuY2xvY2sudG9nZ2xlUGxheShmYWxzZSkgfSB9KVxuICAgIHRoaXMuYWNlbHMuc2V0KCdDbG9jaycsICdGcmFtZSBCeSBGcmFtZScsICdDbWRPckN0cmwrRicsICgpID0+IHsgdGhpcy5jbG9jay50b3VjaCgpIH0pXG4gICAgdGhpcy5hY2Vscy5zZXQoJ0Nsb2NrJywgJ1Jlc2V0IEZyYW1lJywgJ0NtZE9yQ3RybCtTaGlmdCtSJywgKCkgPT4geyB0aGlzLmNsb2NrLnNldEZyYW1lKDApIH0pXG4gICAgdGhpcy5hY2Vscy5zZXQoJ0Nsb2NrJywgJ0luY3IuIFNwZWVkJywgJz4nLCAoKSA9PiB7IHRoaXMuY2xvY2subW9kU3BlZWQoMSkgfSlcbiAgICB0aGlzLmFjZWxzLnNldCgnQ2xvY2snLCAnRGVjci4gU3BlZWQnLCAnPCcsICgpID0+IHsgdGhpcy5jbG9jay5tb2RTcGVlZCgtMSkgfSlcbiAgICB0aGlzLmFjZWxzLnNldCgnQ2xvY2snLCAnSW5jci4gU3BlZWQoMTB4KScsICdDbWRPckN0cmwrPicsICgpID0+IHsgdGhpcy5jbG9jay5tb2RTcGVlZCgxMCwgdHJ1ZSkgfSlcbiAgICB0aGlzLmFjZWxzLnNldCgnQ2xvY2snLCAnRGVjci4gU3BlZWQoMTB4KScsICdDbWRPckN0cmwrPCcsICgpID0+IHsgdGhpcy5jbG9jay5tb2RTcGVlZCgtMTAsIHRydWUpIH0pXG5cbiAgICB0aGlzLmFjZWxzLnNldCgnVmlldycsICdUb2dnbGUgUmV0aW5hJywgJ1RhYicsICgpID0+IHsgdGhpcy50b2dnbGVSZXRpbmEoKSB9KVxuICAgIHRoaXMuYWNlbHMuc2V0KCdWaWV3JywgJ1RvZ2dsZSBHdWlkZScsICdDbWRPckN0cmwrRycsICgpID0+IHsgdGhpcy50b2dnbGVHdWlkZSgpIH0pXG4gICAgdGhpcy5hY2Vscy5zZXQoJ1ZpZXcnLCAnSW5jci4gQ29sJywgJ10nLCAoKSA9PiB7IHRoaXMubW9kR3JpZCgxLCAwKSB9KVxuICAgIHRoaXMuYWNlbHMuc2V0KCdWaWV3JywgJ0RlY3IuIENvbCcsICdbJywgKCkgPT4geyB0aGlzLm1vZEdyaWQoLTEsIDApIH0pXG4gICAgdGhpcy5hY2Vscy5zZXQoJ1ZpZXcnLCAnSW5jci4gUm93JywgJ30nLCAoKSA9PiB7IHRoaXMubW9kR3JpZCgwLCAxKSB9KVxuICAgIHRoaXMuYWNlbHMuc2V0KCdWaWV3JywgJ0RlY3IuIFJvdycsICd7JywgKCkgPT4geyB0aGlzLm1vZEdyaWQoMCwgLTEpIH0pXG4gICAgdGhpcy5hY2Vscy5zZXQoJ1ZpZXcnLCAnWm9vbSBJbicsICdDbWRPckN0cmwrPScsICgpID0+IHsgdGhpcy5tb2Rab29tKDAuMDYyNSkgfSlcbiAgICB0aGlzLmFjZWxzLnNldCgnVmlldycsICdab29tIE91dCcsICdDbWRPckN0cmwrLScsICgpID0+IHsgdGhpcy5tb2Rab29tKC0wLjA2MjUpIH0pXG4gICAgdGhpcy5hY2Vscy5zZXQoJ1ZpZXcnLCAnWm9vbSBSZXNldCcsICdDbWRPckN0cmwrMCcsICgpID0+IHsgdGhpcy5tb2Rab29tKDEsIHRydWUpIH0pXG5cbiAgICB0aGlzLmFjZWxzLnNldCgnTWlkaScsICdQbGF5L1BhdXNlIE1pZGknLCAnQ21kT3JDdHJsK1NwYWNlJywgKCkgPT4geyB0aGlzLmNsb2NrLnRvZ2dsZVBsYXkodHJ1ZSkgfSlcbiAgICB0aGlzLmFjZWxzLnNldCgnTWlkaScsICdOZXh0IElucHV0IERldmljZScsICdDbWRPckN0cmwrLCcsICgpID0+IHsgdGhpcy5jbG9jay5zZXRGcmFtZSgwKTsgdGhpcy5pby5taWRpLnNlbGVjdE5leHRJbnB1dCgpIH0pXG4gICAgdGhpcy5hY2Vscy5zZXQoJ01pZGknLCAnTmV4dCBPdXRwdXQgRGV2aWNlJywgJ0NtZE9yQ3RybCsuJywgKCkgPT4geyB0aGlzLmNsb2NrLnNldEZyYW1lKDApOyB0aGlzLmlvLm1pZGkuc2VsZWN0TmV4dE91dHB1dCgpIH0pXG4gICAgdGhpcy5hY2Vscy5zZXQoJ01pZGknLCAnUmVmcmVzaCBEZXZpY2VzJywgJ0NtZE9yQ3RybCtTaGlmdCtNJywgKCkgPT4geyB0aGlzLmlvLm1pZGkucmVmcmVzaCgpIH0pXG5cbiAgICB0aGlzLmFjZWxzLnNldCgnQ29tbXVuaWNhdGlvbicsICdDaG9vc2UgT1NDIFBvcnQnLCAnYWx0K08nLCAoKSA9PiB7IHRoaXMuY29tbWFuZGVyLnN0YXJ0KCdvc2M6JykgfSlcbiAgICB0aGlzLmFjZWxzLnNldCgnQ29tbXVuaWNhdGlvbicsICdDaG9vc2UgVURQIFBvcnQnLCAnYWx0K1UnLCAoKSA9PiB7IHRoaXMuY29tbWFuZGVyLnN0YXJ0KCd1ZHA6JykgfSlcblxuICAgIHRoaXMuYWNlbHMuaW5zdGFsbCh3aW5kb3cpXG4gICAgdGhpcy5hY2Vscy5waXBlKHRoaXMuY29tbWFuZGVyKVxuICB9XG5cbiAgdGhpcy5zdGFydCA9ICgpID0+IHtcbiAgICBjb25zb2xlLmluZm8oJ0NsaWVudCcsICdTdGFydGluZy4uJylcbiAgICBjb25zb2xlLmluZm8oYCR7dGhpcy5hY2Vsc31gKVxuICAgIHRoaXMudGhlbWUuc3RhcnQoKVxuICAgIHRoaXMuaW8uc3RhcnQoKVxuICAgIHRoaXMuaGlzdG9yeS5iaW5kKHRoaXMub3JjYSwgJ3MnKVxuICAgIHRoaXMuaGlzdG9yeS5yZWNvcmQodGhpcy5vcmNhLnMpXG4gICAgdGhpcy5jbG9jay5zdGFydCgpXG4gICAgdGhpcy5jdXJzb3Iuc3RhcnQoKVxuXG4gICAgdGhpcy5yZXNldCgpXG4gICAgdGhpcy5tb2Rab29tKClcbiAgICB0aGlzLnVwZGF0ZSgpXG4gICAgdGhpcy5lbC5jbGFzc05hbWUgPSAncmVhZHknXG5cbiAgICB0aGlzLnRvZ2dsZUd1aWRlKClcbiAgfVxuXG4gIHRoaXMucmVzZXQgPSAoKSA9PiB7XG4gICAgdGhpcy5vcmNhLnJlc2V0KClcbiAgICB0aGlzLnJlc2l6ZSgpXG4gICAgdGhpcy5zb3VyY2UubmV3KClcbiAgICB0aGlzLmhpc3RvcnkucmVzZXQoKVxuICAgIHRoaXMuY3Vyc29yLnJlc2V0KClcbiAgICB0aGlzLmNsb2NrLnBsYXkoKVxuICB9XG5cbiAgdGhpcy5ydW4gPSAoKSA9PiB7XG4gICAgdGhpcy5pby5jbGVhcigpXG4gICAgdGhpcy5jbG9jay5ydW4oKVxuICAgIHRoaXMub3JjYS5ydW4oKVxuICAgIHRoaXMuaW8ucnVuKClcbiAgICB0aGlzLnVwZGF0ZSgpXG4gIH1cblxuICB0aGlzLnVwZGF0ZSA9ICgpID0+IHtcbiAgICBpZiAoZG9jdW1lbnQuaGlkZGVuID09PSB0cnVlKSB7IHJldHVybiB9XG4gICAgdGhpcy5jbGVhcigpXG4gICAgdGhpcy5wb3J0cyA9IHRoaXMuZmluZFBvcnRzKClcbiAgICB0aGlzLmRyYXdQcm9ncmFtKClcbiAgICB0aGlzLmRyYXdJbnRlcmZhY2UoKVxuICAgIHRoaXMuZHJhd0d1aWRlKClcbiAgfVxuXG4gIHRoaXMud2hlbk9wZW4gPSAoZmlsZSwgdGV4dCkgPT4ge1xuICAgIGNvbnN0IGxpbmVzID0gdGV4dC50cmltKCkuc3BsaXQoL1xccj9cXG4vKVxuICAgIGNvbnN0IHcgPSBsaW5lc1swXS5sZW5ndGhcbiAgICBjb25zdCBoID0gbGluZXMubGVuZ3RoXG4gICAgY29uc3QgcyA9IGxpbmVzLmpvaW4oJ1xcbicpLnRyaW0oKVxuXG4gICAgdGhpcy5vcmNhLmxvYWQodywgaCwgcylcbiAgICB0aGlzLmhpc3RvcnkucmVzZXQoKVxuICAgIHRoaXMuaGlzdG9yeS5yZWNvcmQodGhpcy5vcmNhLnMpXG4gICAgdGhpcy5yZXNpemUoKVxuICB9XG5cbiAgdGhpcy5zZXRHcmlkID0gKHcsIGgpID0+IHtcbiAgICB0aGlzLmdyaWQudyA9IHdcbiAgICB0aGlzLmdyaWQuaCA9IGhcbiAgICB0aGlzLnVwZGF0ZSgpXG4gIH1cblxuICB0aGlzLnRvZ2dsZVJldGluYSA9ICgpID0+IHtcbiAgICB0aGlzLnNjYWxlID0gdGhpcy5zY2FsZSA9PT0gMSA/IHdpbmRvdy5kZXZpY2VQaXhlbFJhdGlvIDogMVxuICAgIGNvbnNvbGUubG9nKCdDbGllbnQnLCBgUGl4ZWwgcmVzb2x1dGlvbjogJHt0aGlzLnNjYWxlfWApXG4gICAgdGhpcy5yZXNpemUodHJ1ZSlcbiAgfVxuXG4gIHRoaXMudG9nZ2xlR3VpZGUgPSAoZm9yY2UgPSBudWxsKSA9PiB7XG4gICAgY29uc3QgZGlzcGxheSA9IGZvcmNlICE9PSBudWxsID8gZm9yY2UgOiB0aGlzLmd1aWRlICE9PSB0cnVlXG4gICAgaWYgKGRpc3BsYXkgPT09IHRoaXMuZ3VpZGUpIHsgcmV0dXJuIH1cbiAgICBjb25zb2xlLmxvZygnQ2xpZW50JywgYFRvZ2dsZSBHdWlkZTogJHtkaXNwbGF5fWApXG4gICAgdGhpcy5ndWlkZSA9IGRpc3BsYXlcbiAgICB0aGlzLnVwZGF0ZSgpXG4gIH1cblxuICB0aGlzLm1vZEdyaWQgPSAoeCA9IDAsIHkgPSAwKSA9PiB7XG4gICAgY29uc3QgdyA9IGNsYW1wKHRoaXMuZ3JpZC53ICsgeCwgNCwgMTYpXG4gICAgY29uc3QgaCA9IGNsYW1wKHRoaXMuZ3JpZC5oICsgeSwgNCwgMTYpXG4gICAgdGhpcy5zZXRHcmlkKHcsIGgpXG4gIH1cblxuICB0aGlzLm1vZFpvb20gPSAobW9kID0gMCwgcmVzZXQgPSBmYWxzZSkgPT4ge1xuICAgIHRoaXMudGlsZSA9IHtcbiAgICAgIHc6IHJlc2V0ID8gMTAgOiB0aGlzLnRpbGUudyAqIChtb2QgKyAxKSxcbiAgICAgIGg6IHJlc2V0ID8gMTUgOiB0aGlzLnRpbGUuaCAqIChtb2QgKyAxKSxcbiAgICAgIHdzOiBNYXRoLmZsb29yKHRoaXMudGlsZS53ICogdGhpcy5zY2FsZSksXG4gICAgICBoczogTWF0aC5mbG9vcih0aGlzLnRpbGUuaCAqIHRoaXMuc2NhbGUpXG4gICAgfVxuICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCd0aWxldycsIHRoaXMudGlsZS53KVxuICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCd0aWxlaCcsIHRoaXMudGlsZS5oKVxuICAgIHRoaXMucmVzaXplKHRydWUpXG4gIH1cblxuICAvL1xuXG4gIHRoaXMuaXNDdXJzb3IgPSAoeCwgeSkgPT4ge1xuICAgIHJldHVybiB4ID09PSB0aGlzLmN1cnNvci54ICYmIHkgPT09IHRoaXMuY3Vyc29yLnlcbiAgfVxuXG4gIHRoaXMuaXNNYXJrZXIgPSAoeCwgeSkgPT4ge1xuICAgIHJldHVybiB4ICUgdGhpcy5ncmlkLncgPT09IDAgJiYgeSAlIHRoaXMuZ3JpZC5oID09PSAwXG4gIH1cblxuICB0aGlzLmlzTmVhciA9ICh4LCB5KSA9PiB7XG4gICAgcmV0dXJuIHggPiAocGFyc2VJbnQodGhpcy5jdXJzb3IueCAvIHRoaXMuZ3JpZC53KSAqIHRoaXMuZ3JpZC53KSAtIDEgJiYgeCA8PSAoKDEgKyBwYXJzZUludCh0aGlzLmN1cnNvci54IC8gdGhpcy5ncmlkLncpKSAqIHRoaXMuZ3JpZC53KSAmJiB5ID4gKHBhcnNlSW50KHRoaXMuY3Vyc29yLnkgLyB0aGlzLmdyaWQuaCkgKiB0aGlzLmdyaWQuaCkgLSAxICYmIHkgPD0gKCgxICsgcGFyc2VJbnQodGhpcy5jdXJzb3IueSAvIHRoaXMuZ3JpZC5oKSkgKiB0aGlzLmdyaWQuaClcbiAgfVxuXG4gIHRoaXMuaXNMb2NhbHMgPSAoeCwgeSkgPT4ge1xuICAgIHJldHVybiB0aGlzLmlzTmVhcih4LCB5KSA9PT0gdHJ1ZSAmJiAoeCAlICh0aGlzLmdyaWQudyAvIDQpID09PSAwICYmIHkgJSAodGhpcy5ncmlkLmggLyA0KSA9PT0gMCkgPT09IHRydWVcbiAgfVxuXG4gIHRoaXMuaXNJbnZpc2libGUgPSAoeCwgeSkgPT4ge1xuICAgIHJldHVybiB0aGlzLm9yY2EuZ2x5cGhBdCh4LCB5KSA9PT0gJy4nICYmICF0aGlzLmlzTWFya2VyKHgsIHkpICYmICF0aGlzLmN1cnNvci5zZWxlY3RlZCh4LCB5KSAmJiAhdGhpcy5pc0xvY2Fscyh4LCB5KSAmJiAhdGhpcy5wb3J0c1t0aGlzLm9yY2EuaW5kZXhBdCh4LCB5KV0gJiYgIXRoaXMub3JjYS5sb2NrQXQoeCwgeSlcbiAgfVxuXG4gIHRoaXMuZmluZFBvcnRzID0gKCkgPT4ge1xuICAgIGNvbnN0IGEgPSBuZXcgQXJyYXkoKHRoaXMub3JjYS53ICogdGhpcy5vcmNhLmgpIC0gMSlcbiAgICBmb3IgKGNvbnN0IG9wZXJhdG9yIG9mIHRoaXMub3JjYS5ydW50aW1lKSB7XG4gICAgICBpZiAodGhpcy5vcmNhLmxvY2tBdChvcGVyYXRvci54LCBvcGVyYXRvci55KSkgeyBjb250aW51ZSB9XG4gICAgICBjb25zdCBwb3J0cyA9IG9wZXJhdG9yLmdldFBvcnRzKClcbiAgICAgIGZvciAoY29uc3QgcG9ydCBvZiBwb3J0cykge1xuICAgICAgICBjb25zdCBpbmRleCA9IHRoaXMub3JjYS5pbmRleEF0KHBvcnRbMF0sIHBvcnRbMV0pXG4gICAgICAgIGFbaW5kZXhdID0gcG9ydFxuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gYVxuICB9XG5cbiAgLy8gSW50ZXJmYWNlXG5cbiAgdGhpcy5tYWtlVGhlbWUgPSAodHlwZSkgPT4ge1xuICAgIC8vIE9wZXJhdG9yXG4gICAgaWYgKHR5cGUgPT09IDApIHsgcmV0dXJuIHsgYmc6IHRoaXMudGhlbWUuYWN0aXZlLmJfbWVkLCBmZzogdGhpcy50aGVtZS5hY3RpdmUuZl9sb3cgfSB9XG4gICAgLy8gSGFzdGVcbiAgICBpZiAodHlwZSA9PT0gMSkgeyByZXR1cm4geyBmZzogdGhpcy50aGVtZS5hY3RpdmUuYl9tZWQgfSB9XG4gICAgLy8gSW5wdXRcbiAgICBpZiAodHlwZSA9PT0gMikgeyByZXR1cm4geyBmZzogdGhpcy50aGVtZS5hY3RpdmUuYl9oaWdoIH0gfVxuICAgIC8vIE91dHB1dFxuICAgIGlmICh0eXBlID09PSAzKSB7IHJldHVybiB7IGJnOiB0aGlzLnRoZW1lLmFjdGl2ZS5iX2hpZ2gsIGZnOiB0aGlzLnRoZW1lLmFjdGl2ZS5mX2xvdyB9IH1cbiAgICAvLyBTZWxlY3RlZFxuICAgIGlmICh0eXBlID09PSA0KSB7IHJldHVybiB7IGJnOiB0aGlzLnRoZW1lLmFjdGl2ZS5iX2ludiwgZmc6IHRoaXMudGhlbWUuYWN0aXZlLmZfaW52IH0gfVxuICAgIC8vIExvY2tlZFxuICAgIGlmICh0eXBlID09PSA1KSB7IHJldHVybiB7IGZnOiB0aGlzLnRoZW1lLmFjdGl2ZS5mX21lZCB9IH1cbiAgICAvLyBSZWFkZXJcbiAgICBpZiAodHlwZSA9PT0gNikgeyByZXR1cm4geyBmZzogdGhpcy50aGVtZS5hY3RpdmUuYl9pbnYgfSB9XG4gICAgLy8gSW52aXNpYmxlXG4gICAgaWYgKHR5cGUgPT09IDcpIHsgcmV0dXJuIHt9IH1cbiAgICAvLyBPdXRwdXQgQmFuZ1xuICAgIGlmICh0eXBlID09PSA4KSB7IHJldHVybiB7IGJnOiB0aGlzLnRoZW1lLmFjdGl2ZS5iX2xvdywgZmc6IHRoaXMudGhlbWUuYWN0aXZlLmZfaGlnaCB9IH1cbiAgICAvLyBPdXRwdXQgUmVhZGVyXG4gICAgaWYgKHR5cGUgPT09IDkpIHsgcmV0dXJuIHsgYmc6IHRoaXMudGhlbWUuYWN0aXZlLmJfaW52LCBmZzogdGhpcy50aGVtZS5hY3RpdmUuYmFja2dyb3VuZCB9IH1cbiAgICAvLyBSZWFkZXIrQmFja2dyb3VuZFxuICAgIGlmICh0eXBlID09PSAxMCkgeyByZXR1cm4geyBiZzogdGhpcy50aGVtZS5hY3RpdmUuYmFja2dyb3VuZCwgZmc6IHRoaXMudGhlbWUuYWN0aXZlLmZfaGlnaCB9IH1cbiAgICAvLyBDbG9jayh5ZWxsb3cgZmcpXG4gICAgaWYgKHR5cGUgPT09IDExKSB7IHJldHVybiB7IGZnOiB0aGlzLnRoZW1lLmFjdGl2ZS5iX2ludiB9IH1cbiAgICAvLyBEZWZhdWx0XG4gICAgcmV0dXJuIHsgZmc6IHRoaXMudGhlbWUuYWN0aXZlLmZfbG93IH1cbiAgfVxuXG4gIC8vIENhbnZhc1xuXG4gIHRoaXMuY2xlYXIgPSAoKSA9PiB7XG4gICAgdGhpcy5jb250ZXh0LmNsZWFyUmVjdCgwLCAwLCB0aGlzLmVsLndpZHRoLCB0aGlzLmVsLmhlaWdodClcbiAgfVxuXG4gIHRoaXMuZHJhd1Byb2dyYW0gPSAoKSA9PiB7XG4gICAgY29uc3Qgc2VsZWN0aW9uID0gdGhpcy5jdXJzb3IucmVhZCgpXG4gICAgZm9yIChsZXQgeSA9IDA7IHkgPCB0aGlzLm9yY2EuaDsgeSsrKSB7XG4gICAgICBmb3IgKGxldCB4ID0gMDsgeCA8IHRoaXMub3JjYS53OyB4KyspIHtcbiAgICAgICAgLy8gSGFuZGxlIGJsYW5rc1xuICAgICAgICBpZiAodGhpcy5pc0ludmlzaWJsZSh4LCB5KSkgeyBjb250aW51ZSB9XG4gICAgICAgIC8vIE1ha2UgR2x5cGhcbiAgICAgICAgY29uc3QgZyA9IHRoaXMub3JjYS5nbHlwaEF0KHgsIHkpXG4gICAgICAgIC8vIEdldCBnbHlwaFxuICAgICAgICBjb25zdCBnbHlwaCA9IGcgIT09ICcuJyA/IGcgOiB0aGlzLmlzQ3Vyc29yKHgsIHkpID8gKHRoaXMuY2xvY2suaXNQYXVzZWQgPyAnficgOiAnQCcpIDogdGhpcy5pc01hcmtlcih4LCB5KSA/ICcrJyA6IGdcbiAgICAgICAgLy8gTWFrZSBTdHlsZVxuICAgICAgICB0aGlzLmRyYXdTcHJpdGUoeCwgeSwgZ2x5cGgsIHRoaXMubWFrZVN0eWxlKHgsIHksIGdseXBoLCBzZWxlY3Rpb24pKVxuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHRoaXMubWFrZVN0eWxlID0gKHgsIHksIGdseXBoLCBzZWxlY3Rpb24pID0+IHtcbiAgICBpZiAodGhpcy5jdXJzb3Iuc2VsZWN0ZWQoeCwgeSkpIHsgcmV0dXJuIDQgfVxuICAgIGNvbnN0IGlzTG9ja2VkID0gdGhpcy5vcmNhLmxvY2tBdCh4LCB5KVxuICAgIGlmIChzZWxlY3Rpb24gPT09IGdseXBoICYmIGlzTG9ja2VkID09PSBmYWxzZSAmJiBzZWxlY3Rpb24gIT09ICcuJykgeyByZXR1cm4gNiB9XG4gICAgaWYgKGdseXBoID09PSAnKicgJiYgaXNMb2NrZWQgPT09IGZhbHNlKSB7IHJldHVybiAyIH1cbiAgICBjb25zdCBwb3J0ID0gdGhpcy5wb3J0c1t0aGlzLm9yY2EuaW5kZXhBdCh4LCB5KV1cbiAgICBpZiAocG9ydCkgeyByZXR1cm4gcG9ydFsyXSB9XG4gICAgaWYgKGlzTG9ja2VkID09PSB0cnVlKSB7IHJldHVybiA1IH1cbiAgICByZXR1cm4gMjBcbiAgfVxuXG4gIHRoaXMuZHJhd0ludGVyZmFjZSA9ICgpID0+IHtcbiAgICB0aGlzLndyaXRlKGAke3RoaXMuY3Vyc29yLmluc3BlY3QoKX1gLCB0aGlzLmdyaWQudyAqIDAsIHRoaXMub3JjYS5oLCB0aGlzLmdyaWQudyAtIDEpXG4gICAgdGhpcy53cml0ZShgJHt0aGlzLmN1cnNvci54fSwke3RoaXMuY3Vyc29yLnl9JHt0aGlzLmN1cnNvci5pbnMgPyAnKycgOiAnJ31gLCB0aGlzLmdyaWQudyAqIDEsIHRoaXMub3JjYS5oLCB0aGlzLmdyaWQudywgdGhpcy5jdXJzb3IuaW5zID8gMSA6IDIpXG4gICAgdGhpcy53cml0ZShgJHt0aGlzLmN1cnNvci53fToke3RoaXMuY3Vyc29yLmh9YCwgdGhpcy5ncmlkLncgKiAyLCB0aGlzLm9yY2EuaCwgdGhpcy5ncmlkLncpXG4gICAgdGhpcy53cml0ZShgJHt0aGlzLm9yY2EuZn1mJHt0aGlzLmNsb2NrLmlzUGF1c2VkID8gJ34nIDogJyd9YCwgdGhpcy5ncmlkLncgKiAzLCB0aGlzLm9yY2EuaCwgdGhpcy5ncmlkLncpXG4gICAgdGhpcy53cml0ZShgJHt0aGlzLmlvLmluc3BlY3QodGhpcy5ncmlkLncpfWAsIHRoaXMuZ3JpZC53ICogNCwgdGhpcy5vcmNhLmgsIHRoaXMuZ3JpZC53IC0gMSlcbiAgICB0aGlzLndyaXRlKHRoaXMub3JjYS5mIDwgMjUwID8gYDwgJHt0aGlzLmlvLm1pZGkudG9JbnB1dFN0cmluZygpfWAgOiAnJywgdGhpcy5ncmlkLncgKiA1LCB0aGlzLm9yY2EuaCwgdGhpcy5ncmlkLncgKiA0KVxuXG4gICAgaWYgKHRoaXMuY29tbWFuZGVyLmlzQWN0aXZlID09PSB0cnVlKSB7XG4gICAgICB0aGlzLndyaXRlKGAke3RoaXMuY29tbWFuZGVyLnF1ZXJ5fSR7dGhpcy5vcmNhLmYgJSAyID09PSAwID8gJ18nIDogJyd9YCwgdGhpcy5ncmlkLncgKiAwLCB0aGlzLm9yY2EuaCArIDEsIHRoaXMuZ3JpZC53ICogNClcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy53cml0ZSh0aGlzLm9yY2EuZiA8IDI1ID8gYHZlciR7dGhpcy52ZXJzaW9ufWAgOiBgJHtPYmplY3Qua2V5cyh0aGlzLnNvdXJjZS5jYWNoZSkubGVuZ3RofSBtb2RzYCwgdGhpcy5ncmlkLncgKiAwLCB0aGlzLm9yY2EuaCArIDEsIHRoaXMuZ3JpZC53KVxuICAgICAgdGhpcy53cml0ZShgJHt0aGlzLm9yY2Eud314JHt0aGlzLm9yY2EuaH1gLCB0aGlzLmdyaWQudyAqIDEsIHRoaXMub3JjYS5oICsgMSwgdGhpcy5ncmlkLncpXG4gICAgICB0aGlzLndyaXRlKGAke3RoaXMuZ3JpZC53fS8ke3RoaXMuZ3JpZC5ofSR7dGhpcy50aWxlLncgIT09IDEwID8gJyAnICsgKHRoaXMudGlsZS53IC8gMTApLnRvRml4ZWQoMSkgOiAnJ31gLCB0aGlzLmdyaWQudyAqIDIsIHRoaXMub3JjYS5oICsgMSwgdGhpcy5ncmlkLncpXG4gICAgICB0aGlzLndyaXRlKGAke3RoaXMuY2xvY2t9YCwgdGhpcy5ncmlkLncgKiAzLCB0aGlzLm9yY2EuaCArIDEsIHRoaXMuZ3JpZC53LCB0aGlzLmNsb2NrLmlzUHVwcGV0ID8gMyA6IHRoaXMuaW8ubWlkaS5pc0Nsb2NrID8gMTEgOiB0aGlzLmNsb2NrLmlzUGF1c2VkID8gMjAgOiAyKVxuICAgICAgdGhpcy53cml0ZShgJHtkaXNwbGF5KE9iamVjdC5rZXlzKHRoaXMub3JjYS52YXJpYWJsZXMpLmpvaW4oJycpLCB0aGlzLm9yY2EuZiwgdGhpcy5ncmlkLncgLSAxKX1gLCB0aGlzLmdyaWQudyAqIDQsIHRoaXMub3JjYS5oICsgMSwgdGhpcy5ncmlkLncgLSAxKVxuICAgICAgdGhpcy53cml0ZSh0aGlzLm9yY2EuZiA8IDI1MCA/IGA+ICR7dGhpcy5pby5taWRpLnRvT3V0cHV0U3RyaW5nKCl9YCA6ICcnLCB0aGlzLmdyaWQudyAqIDUsIHRoaXMub3JjYS5oICsgMSwgdGhpcy5ncmlkLncgKiA0KVxuICAgIH1cbiAgfVxuXG4gIHRoaXMuZHJhd0d1aWRlID0gKCkgPT4ge1xuICAgIGlmICh0aGlzLmd1aWRlICE9PSB0cnVlKSB7IHJldHVybiB9XG4gICAgY29uc3Qgb3BlcmF0b3JzID0gT2JqZWN0LmtleXModGhpcy5saWJyYXJ5KS5maWx0ZXIoKHZhbCkgPT4geyByZXR1cm4gaXNOYU4odmFsKSB9KVxuICAgIGZvciAoY29uc3QgaWQgaW4gb3BlcmF0b3JzKSB7XG4gICAgICBjb25zdCBrZXkgPSBvcGVyYXRvcnNbaWRdXG4gICAgICBjb25zdCBvcGVyID0gbmV3IHRoaXMubGlicmFyeVtrZXldKClcbiAgICAgIGNvbnN0IHRleHQgPSBvcGVyLmluZm9cbiAgICAgIGNvbnN0IGZyYW1lID0gdGhpcy5vcmNhLmggLSA0XG4gICAgICBjb25zdCB4ID0gKE1hdGguZmxvb3IocGFyc2VJbnQoaWQpIC8gZnJhbWUpICogMzIpICsgMlxuICAgICAgY29uc3QgeSA9IChwYXJzZUludChpZCkgJSBmcmFtZSkgKyAyXG4gICAgICB0aGlzLndyaXRlKGtleSwgeCwgeSwgOTksIDMpXG4gICAgICB0aGlzLndyaXRlKHRleHQsIHggKyAyLCB5LCA5OSwgMTApXG4gICAgfVxuICB9XG5cbiAgdGhpcy5kcmF3U3ByaXRlID0gKHgsIHksIGcsIHR5cGUpID0+IHtcbiAgICBjb25zdCB0aGVtZSA9IHRoaXMubWFrZVRoZW1lKHR5cGUpXG4gICAgaWYgKHRoZW1lLmJnKSB7XG4gICAgICB0aGlzLmNvbnRleHQuZmlsbFN0eWxlID0gdGhlbWUuYmdcbiAgICAgIHRoaXMuY29udGV4dC5maWxsUmVjdCh4ICogdGhpcy50aWxlLndzLCAoeSkgKiB0aGlzLnRpbGUuaHMsIHRoaXMudGlsZS53cywgdGhpcy50aWxlLmhzKVxuICAgIH1cbiAgICBpZiAodGhlbWUuZmcpIHtcbiAgICAgIHRoaXMuY29udGV4dC5maWxsU3R5bGUgPSB0aGVtZS5mZ1xuICAgICAgdGhpcy5jb250ZXh0LmZpbGxUZXh0KGcsICh4ICsgMC41KSAqIHRoaXMudGlsZS53cywgKHkgKyAxKSAqIHRoaXMudGlsZS5ocylcbiAgICB9XG4gIH1cblxuICB0aGlzLndyaXRlID0gKHRleHQsIG9mZnNldFgsIG9mZnNldFksIGxpbWl0ID0gNTAsIHR5cGUgPSAyKSA9PiB7XG4gICAgZm9yIChsZXQgeCA9IDA7IHggPCB0ZXh0Lmxlbmd0aCAmJiB4IDwgbGltaXQ7IHgrKykge1xuICAgICAgdGhpcy5kcmF3U3ByaXRlKG9mZnNldFggKyB4LCBvZmZzZXRZLCB0ZXh0LnN1YnN0cih4LCAxKSwgdHlwZSlcbiAgICB9XG4gIH1cblxuICAvLyBSZXNpemUgdG9vbHNcblxuICB0aGlzLnJlc2l6ZSA9ICgpID0+IHtcbiAgICBjb25zdCBwYWQgPSAzMFxuICAgIGNvbnN0IHNpemUgPSB7IHc6IHdpbmRvdy5pbm5lcldpZHRoIC0gKHBhZCAqIDIpLCBoOiB3aW5kb3cuaW5uZXJIZWlnaHQgLSAoKHBhZCAqIDIpICsgdGhpcy50aWxlLmggKiAyKSB9XG4gICAgY29uc3QgdGlsZXMgPSB7IHc6IE1hdGguY2VpbChzaXplLncgLyB0aGlzLnRpbGUudyksIGg6IE1hdGguY2VpbChzaXplLmggLyB0aGlzLnRpbGUuaCkgfVxuICAgIGNvbnN0IGJvdW5kcyA9IHRoaXMub3JjYS5ib3VuZHMoKVxuXG4gICAgLy8gQ2xhbXAgYXQgbGltaXRzIG9mIG9yY2EgZmlsZVxuICAgIGlmICh0aWxlcy53IDwgYm91bmRzLncgKyAxKSB7IHRpbGVzLncgPSBib3VuZHMudyArIDEgfVxuICAgIGlmICh0aWxlcy5oIDwgYm91bmRzLmggKyAxKSB7IHRpbGVzLmggPSBib3VuZHMuaCArIDEgfVxuXG4gICAgdGhpcy5jcm9wKHRpbGVzLncsIHRpbGVzLmgpXG5cbiAgICAvLyBLZWVwIGN1cnNvciBpbiBib3VuZHNcbiAgICBpZiAodGhpcy5jdXJzb3IueCA+PSB0aWxlcy53KSB7IHRoaXMuY3Vyc29yLm1vdmVUbyh0aWxlcy53IC0gMSwgdGhpcy5jdXJzb3IueSkgfVxuICAgIGlmICh0aGlzLmN1cnNvci55ID49IHRpbGVzLmgpIHsgdGhpcy5jdXJzb3IubW92ZVRvKHRoaXMuY3Vyc29yLngsIHRpbGVzLmggLSAxKSB9XG5cbiAgICBjb25zdCB3ID0gdGhpcy50aWxlLndzICogdGhpcy5vcmNhLndcbiAgICBjb25zdCBoID0gKHRoaXMudGlsZS5ocyArICh0aGlzLnRpbGUuaHMgLyA1KSkgKiB0aGlzLm9yY2EuaFxuXG4gICAgaWYgKHcgPT09IHRoaXMuZWwud2lkdGggJiYgaCA9PT0gdGhpcy5lbC5oZWlnaHQpIHsgcmV0dXJuIH1cblxuICAgIGNvbnNvbGUubG9nKGBSZXNpemVkIHRvOiAke3RoaXMub3JjYS53fXgke3RoaXMub3JjYS5ofWApXG5cbiAgICB0aGlzLmVsLndpZHRoID0gd1xuICAgIHRoaXMuZWwuaGVpZ2h0ID0gaFxuICAgIHRoaXMuZWwuc3R5bGUud2lkdGggPSBgJHtNYXRoLmNlaWwodGhpcy50aWxlLncgKiB0aGlzLm9yY2Eudyl9cHhgXG4gICAgdGhpcy5lbC5zdHlsZS5oZWlnaHQgPSBgJHtNYXRoLmNlaWwoKHRoaXMudGlsZS5oICsgKHRoaXMudGlsZS5oIC8gNSkpICogdGhpcy5vcmNhLmgpfXB4YFxuXG4gICAgdGhpcy5jb250ZXh0LnRleHRCYXNlbGluZSA9ICdib3R0b20nXG4gICAgdGhpcy5jb250ZXh0LnRleHRBbGlnbiA9ICdjZW50ZXInXG4gICAgdGhpcy5jb250ZXh0LmZvbnQgPSBgJHt0aGlzLnRpbGUuaHMgKiAwLjc1fXB4IGlucHV0X21vbm9fbWVkaXVtYFxuICAgIHRoaXMudXBkYXRlKClcbiAgfVxuXG4gIHRoaXMuY3JvcCA9ICh3LCBoKSA9PiB7XG4gICAgbGV0IGJsb2NrID0gYCR7dGhpcy5vcmNhfWBcblxuICAgIGlmIChoID4gdGhpcy5vcmNhLmgpIHtcbiAgICAgIGJsb2NrID0gYCR7YmxvY2t9JHtgXFxuJHsnLicucmVwZWF0KHRoaXMub3JjYS53KX1gLnJlcGVhdCgoaCAtIHRoaXMub3JjYS5oKSl9YFxuICAgIH0gZWxzZSBpZiAoaCA8IHRoaXMub3JjYS5oKSB7XG4gICAgICBibG9jayA9IGAke2Jsb2NrfWAuc3BsaXQoL1xccj9cXG4vKS5zbGljZSgwLCAoaCAtIHRoaXMub3JjYS5oKSkuam9pbignXFxuJykudHJpbSgpXG4gICAgfVxuXG4gICAgaWYgKHcgPiB0aGlzLm9yY2Eudykge1xuICAgICAgYmxvY2sgPSBgJHtibG9ja31gLnNwbGl0KC9cXHI/XFxuLykubWFwKCh2YWwpID0+IHsgcmV0dXJuIHZhbCArICgnLicpLnJlcGVhdCgodyAtIHRoaXMub3JjYS53KSkgfSkuam9pbignXFxuJykudHJpbSgpXG4gICAgfSBlbHNlIGlmICh3IDwgdGhpcy5vcmNhLncpIHtcbiAgICAgIGJsb2NrID0gYCR7YmxvY2t9YC5zcGxpdCgvXFxyP1xcbi8pLm1hcCgodmFsKSA9PiB7IHJldHVybiB2YWwuc3Vic3RyKDAsIHZhbC5sZW5ndGggKyAodyAtIHRoaXMub3JjYS53KSkgfSkuam9pbignXFxuJykudHJpbSgpXG4gICAgfVxuXG4gICAgdGhpcy5oaXN0b3J5LnJlc2V0KClcbiAgICB0aGlzLm9yY2EubG9hZCh3LCBoLCBibG9jaywgdGhpcy5vcmNhLmYpXG4gIH1cblxuICAvLyBEb2NzXG5cbiAgdGhpcy5kb2NzID0gKCkgPT4ge1xuICAgIGxldCBodG1sID0gJydcbiAgICBjb25zdCBvcGVyYXRvcnMgPSBPYmplY3Qua2V5cyhsaWJyYXJ5KS5maWx0ZXIoKHZhbCkgPT4geyByZXR1cm4gaXNOYU4odmFsKSB9KVxuICAgIGZvciAoY29uc3QgaWQgaW4gb3BlcmF0b3JzKSB7XG4gICAgICBjb25zdCBvcGVyID0gbmV3IHRoaXMubGlicmFyeVtvcGVyYXRvcnNbaWRdXSgpXG4gICAgICBjb25zdCBwb3J0cyA9IG9wZXIucG9ydHMuaW5wdXQgPyBPYmplY3Qua2V5cyhvcGVyLnBvcnRzLmlucHV0KS5yZWR1Y2UoKGFjYywga2V5LCB2YWwpID0+IHsgcmV0dXJuIGFjYyArICcgJyArIGtleSB9LCAnJykgOiAnJ1xuICAgICAgaHRtbCArPSBgLSBcXGAke29wZXIuZ2x5cGgudG9VcHBlckNhc2UoKX1cXGAgKioke29wZXIubmFtZX0qKiR7cG9ydHMgIT09ICcnID8gJygnICsgcG9ydHMudHJpbSgpICsgJyknIDogJyd9OiAke29wZXIuaW5mb30uXFxuYFxuICAgIH1cbiAgICByZXR1cm4gaHRtbFxuICB9XG5cbiAgLy8gRXZlbnRzXG5cbiAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ2RyYWdvdmVyJywgKGUpID0+IHtcbiAgICBlLnN0b3BQcm9wYWdhdGlvbigpXG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpXG4gICAgZS5kYXRhVHJhbnNmZXIuZHJvcEVmZmVjdCA9ICdjb3B5J1xuICB9KVxuXG4gIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdkcm9wJywgKGUpID0+IHtcbiAgICBlLnByZXZlbnREZWZhdWx0KClcbiAgICBlLnN0b3BQcm9wYWdhdGlvbigpXG4gICAgZm9yIChjb25zdCBmaWxlIG9mIGUuZGF0YVRyYW5zZmVyLmZpbGVzKSB7XG4gICAgICBpZiAoZmlsZS5uYW1lLmluZGV4T2YoJy5vcmNhJykgPCAwKSB7IGNvbnRpbnVlIH1cbiAgICAgIHRoaXMudG9nZ2xlR3VpZGUoZmFsc2UpXG4gICAgICB0aGlzLnNvdXJjZS5yZWFkKGZpbGUsIG51bGwsIHRydWUpXG4gICAgICB0aGlzLmNvbW1hbmRlci5zdGFydCgnaW5qZWN0OicgKyBmaWxlLm5hbWUucmVwbGFjZSgnLm9yY2EnLCAnJykpXG4gICAgfVxuICB9KVxuXG4gIHdpbmRvdy5vbnJlc2l6ZSA9IChlKSA9PiB7XG4gICAgdGhpcy5yZXNpemUoKVxuICB9XG5cbiAgLy8gSGVscGVyc1xuXG4gIGZ1bmN0aW9uIGRpc3BsYXkgKHN0ciwgZiwgbWF4KSB7IHJldHVybiBzdHIubGVuZ3RoIDwgbWF4ID8gc3RyIDogc3RyLnNsaWNlKGYgJSBzdHIubGVuZ3RoKSArIHN0ci5zdWJzdHIoMCwgZiAlIHN0ci5sZW5ndGgpIH1cbiAgZnVuY3Rpb24gY2xhbXAgKHYsIG1pbiwgbWF4KSB7IHJldHVybiB2IDwgbWluID8gbWluIDogdiA+IG1heCA/IG1heCA6IHYgfVxufVxuXG4vKioqIEVYUE9SVFMgRlJPTSBleHBvcnRzLWxvYWRlciAqKiovXG5leHBvcnQgZGVmYXVsdCBDbGllbnQ7XG4iLCIndXNlIHN0cmljdCdcblxuLyogZ2xvYmFsIEJsb2IgKi9cblxuZnVuY3Rpb24gQ2xvY2sgKGNsaWVudCkge1xuICBjb25zdCB3b3JrZXJTY3JpcHQgPSAnb25tZXNzYWdlID0gKGUpID0+IHsgc2V0SW50ZXJ2YWwoKCkgPT4geyBwb3N0TWVzc2FnZSh0cnVlKSB9LCBlLmRhdGEpfSdcbiAgY29uc3Qgd29ya2VyID0gd2luZG93LlVSTC5jcmVhdGVPYmplY3RVUkwobmV3IEJsb2IoW3dvcmtlclNjcmlwdF0sIHsgdHlwZTogJ3RleHQvamF2YXNjcmlwdCcgfSkpXG5cbiAgdGhpcy5pc1BhdXNlZCA9IHRydWVcbiAgdGhpcy50aW1lciA9IG51bGxcbiAgdGhpcy5pc1B1cHBldCA9IGZhbHNlXG5cbiAgdGhpcy5zcGVlZCA9IHsgdmFsdWU6IDEyMCwgdGFyZ2V0OiAxMjAgfVxuXG4gIHRoaXMuc3RhcnQgPSBmdW5jdGlvbiAoKSB7XG4gICAgY29uc3QgbWVtb3J5ID0gcGFyc2VJbnQod2luZG93LmxvY2FsU3RvcmFnZS5nZXRJdGVtKCdicG0nKSlcbiAgICBjb25zdCB0YXJnZXQgPSBtZW1vcnkgPj0gNjAgPyBtZW1vcnkgOiAxMjBcbiAgICB0aGlzLnNldFNwZWVkKHRhcmdldCwgdGFyZ2V0LCB0cnVlKVxuICAgIHRoaXMucGxheSgpXG4gIH1cblxuICB0aGlzLnRvdWNoID0gZnVuY3Rpb24gKCkge1xuICAgIHRoaXMuc3RvcCgpXG4gICAgY2xpZW50LnJ1bigpXG4gIH1cblxuICB0aGlzLnJ1biA9IGZ1bmN0aW9uICgpIHtcbiAgICBpZiAodGhpcy5zcGVlZC50YXJnZXQgPT09IHRoaXMuc3BlZWQudmFsdWUpIHsgcmV0dXJuIH1cbiAgICB0aGlzLnNldFNwZWVkKHRoaXMuc3BlZWQudmFsdWUgKyAodGhpcy5zcGVlZC52YWx1ZSA8IHRoaXMuc3BlZWQudGFyZ2V0ID8gMSA6IC0xKSwgbnVsbCwgdHJ1ZSlcbiAgfVxuXG4gIHRoaXMuc2V0U3BlZWQgPSAodmFsdWUsIHRhcmdldCA9IG51bGwsIHNldFRpbWVyID0gZmFsc2UpID0+IHtcbiAgICBpZiAodGhpcy5zcGVlZC52YWx1ZSA9PT0gdmFsdWUgJiYgdGhpcy5zcGVlZC50YXJnZXQgPT09IHRhcmdldCAmJiB0aGlzLnRpbWVyKSB7IHJldHVybiB9XG4gICAgaWYgKHZhbHVlKSB7IHRoaXMuc3BlZWQudmFsdWUgPSBjbGFtcCh2YWx1ZSwgNjAsIDMwMCkgfVxuICAgIGlmICh0YXJnZXQpIHsgdGhpcy5zcGVlZC50YXJnZXQgPSBjbGFtcCh0YXJnZXQsIDYwLCAzMDApIH1cbiAgICBpZiAoc2V0VGltZXIgPT09IHRydWUpIHsgdGhpcy5zZXRUaW1lcih0aGlzLnNwZWVkLnZhbHVlKSB9XG4gIH1cblxuICB0aGlzLm1vZFNwZWVkID0gZnVuY3Rpb24gKG1vZCA9IDAsIGFuaW1hdGUgPSBmYWxzZSkge1xuICAgIGlmIChhbmltYXRlID09PSB0cnVlKSB7XG4gICAgICB0aGlzLnNldFNwZWVkKG51bGwsIHRoaXMuc3BlZWQudGFyZ2V0ICsgbW9kKVxuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLnNldFNwZWVkKHRoaXMuc3BlZWQudmFsdWUgKyBtb2QsIHRoaXMuc3BlZWQudmFsdWUgKyBtb2QsIHRydWUpXG4gICAgICBjbGllbnQudXBkYXRlKClcbiAgICB9XG4gIH1cblxuICAvLyBDb250cm9sc1xuXG4gIHRoaXMudG9nZ2xlUGxheSA9IGZ1bmN0aW9uIChtc2cgPSBmYWxzZSkge1xuICAgIGlmICh0aGlzLmlzUGF1c2VkID09PSB0cnVlKSB7XG4gICAgICB0aGlzLnBsYXkobXNnKVxuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLnN0b3AobXNnKVxuICAgIH1cbiAgICBjbGllbnQudXBkYXRlKClcbiAgfVxuXG4gIHRoaXMucGxheSA9IGZ1bmN0aW9uIChtc2cgPSBmYWxzZSwgbWlkaVN0YXJ0ID0gZmFsc2UpIHtcbiAgICBjb25zb2xlLmxvZygnQ2xvY2snLCAnUGxheScsIG1zZywgbWlkaVN0YXJ0KVxuICAgIGlmICh0aGlzLmlzUGF1c2VkID09PSBmYWxzZSAmJiAhbWlkaVN0YXJ0KSB7IHJldHVybiB9XG4gICAgdGhpcy5pc1BhdXNlZCA9IGZhbHNlXG4gICAgaWYgKHRoaXMuaXNQdXBwZXQgPT09IHRydWUpIHtcbiAgICAgIGNvbnNvbGUud2FybignQ2xvY2snLCAnRXh0ZXJuYWwgTWlkaSBjb250cm9sJylcbiAgICAgIGlmICghcHVsc2UuZnJhbWUgfHwgbWlkaVN0YXJ0KSB7ICAvLyBubyBmcmFtZXMgY291bnRlZCB3aGlsZSBwYXVzZWQgKHN0YXJ0aW5nIGZyb20gbm8gY2xvY2ssIHVubGlrZWx5KSBvciB0cmlnZ2VyZWQgYnkgTUlESSBjbG9jayBTVEFSVFxuICAgICAgICB0aGlzLnNldEZyYW1lKDApICAvLyBtYWtlIHN1cmUgZnJhbWUgYWxpZ25zIHdpdGggcHVsc2UgY291bnQgZm9yIGFuIGFjY3VyYXRlIGJlYXRcbiAgICAgICAgcHVsc2UuZnJhbWUgPSAwXG4gICAgICAgIHB1bHNlLmNvdW50ID0gNSAgIC8vIGJ5IE1JREkgc3RhbmRhcmQgbmV4dCBwdWxzZSBpcyB0aGUgYmVhdFxuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICBpZiAobXNnID09PSB0cnVlKSB7IGNsaWVudC5pby5taWRpLnNlbmRDbG9ja1N0YXJ0KCkgfVxuICAgICAgdGhpcy5zZXRTcGVlZCh0aGlzLnNwZWVkLnRhcmdldCwgdGhpcy5zcGVlZC50YXJnZXQsIHRydWUpXG4gICAgfVxuICB9XG5cbiAgdGhpcy5zdG9wID0gZnVuY3Rpb24gKG1zZyA9IGZhbHNlKSB7XG4gICAgY29uc29sZS5sb2coJ0Nsb2NrJywgJ1N0b3AnKVxuICAgIGlmICh0aGlzLmlzUGF1c2VkID09PSB0cnVlKSB7IHJldHVybiB9XG4gICAgdGhpcy5pc1BhdXNlZCA9IHRydWVcbiAgICBpZiAodGhpcy5pc1B1cHBldCA9PT0gdHJ1ZSkge1xuICAgICAgY29uc29sZS53YXJuKCdDbG9jaycsICdFeHRlcm5hbCBNaWRpIGNvbnRyb2wnKVxuICAgIH0gZWxzZSB7XG4gICAgICBpZiAobXNnID09PSB0cnVlIHx8IGNsaWVudC5pby5taWRpLmlzQ2xvY2spIHsgY2xpZW50LmlvLm1pZGkuc2VuZENsb2NrU3RvcCgpIH1cbiAgICAgIHRoaXMuY2xlYXJUaW1lcigpXG4gICAgfVxuICAgIGNsaWVudC5pby5taWRpLmFsbE5vdGVzT2ZmKClcbiAgICBjbGllbnQuaW8ubWlkaS5zaWxlbmNlKClcbiAgfVxuXG4gIC8vIEV4dGVybmFsIENsb2NrXG5cbiAgY29uc3QgcHVsc2UgPSB7XG4gICAgY291bnQ6IDAsXG4gICAgbGFzdDogbnVsbCxcbiAgICB0aW1lcjogbnVsbCxcbiAgICBmcmFtZTogMCAgLy8gcGF1c2VkIGZyYW1lIGNvdW50ZXJcbiAgfVxuXG4gIHRoaXMudGFwID0gZnVuY3Rpb24gKCkge1xuICAgIHB1bHNlLmNvdW50ID0gKHB1bHNlLmNvdW50ICsgMSkgJSA2XG4gICAgcHVsc2UubGFzdCA9IHBlcmZvcm1hbmNlLm5vdygpXG4gICAgaWYgKCF0aGlzLmlzUHVwcGV0KSB7XG4gICAgICBjb25zb2xlLmxvZygnQ2xvY2snLCAnUHVwcGV0ZWVyaW5nIHN0YXJ0cy4uJylcbiAgICAgIHRoaXMuaXNQdXBwZXQgPSB0cnVlXG4gICAgICB0aGlzLmNsZWFyVGltZXIoKVxuICAgICAgcHVsc2UudGltZXIgPSBzZXRJbnRlcnZhbCgoKSA9PiB7XG4gICAgICAgIGlmIChwZXJmb3JtYW5jZS5ub3coKSAtIHB1bHNlLmxhc3QgPCAyMDAwKSB7IHJldHVybiB9XG4gICAgICAgIHRoaXMudW50YXAoKVxuICAgICAgfSwgMjAwMClcbiAgICB9XG4gICAgaWYgKHB1bHNlLmNvdW50ID09IDApIHtcbiAgICAgIGlmICh0aGlzLmlzUGF1c2VkKSB7IHB1bHNlLmZyYW1lKysgfVxuICAgICAgZWxzZSB7XG4gICAgICAgIGlmIChwdWxzZS5mcmFtZSA+IDApIHtcbiAgICAgICAgICB0aGlzLnNldEZyYW1lKGNsaWVudC5vcmNhLmYgKyBwdWxzZS5mcmFtZSlcbiAgICAgICAgICBwdWxzZS5mcmFtZSA9IDBcbiAgICAgICAgfVxuICAgICAgICBjbGllbnQucnVuKClcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICB0aGlzLnVudGFwID0gZnVuY3Rpb24gKCkge1xuICAgIGNvbnNvbGUubG9nKCdDbG9jaycsICdQdXBwZXRlZXJpbmcgc3RvcHMuLicpXG4gICAgY2xlYXJJbnRlcnZhbChwdWxzZS50aW1lcilcbiAgICB0aGlzLmlzUHVwcGV0ID0gZmFsc2VcbiAgICBwdWxzZS5mcmFtZSA9IDBcbiAgICBwdWxzZS5sYXN0ID0gbnVsbFxuICAgIGlmICghdGhpcy5pc1BhdXNlZCkge1xuICAgICAgdGhpcy5zZXRUaW1lcih0aGlzLnNwZWVkLnZhbHVlKVxuICAgIH1cbiAgfVxuXG4gIC8vIFRpbWVyXG5cbiAgdGhpcy5zZXRUaW1lciA9IGZ1bmN0aW9uIChicG0pIHtcbiAgICBpZiAoYnBtIDwgNjApIHsgY29uc29sZS53YXJuKCdDbG9jaycsICdFcnJvciAnICsgYnBtKTsgcmV0dXJuIH1cbiAgICB0aGlzLmNsZWFyVGltZXIoKVxuICAgIHdpbmRvdy5sb2NhbFN0b3JhZ2Uuc2V0SXRlbSgnYnBtJywgYnBtKVxuICAgIHRoaXMudGltZXIgPSBuZXcgV29ya2VyKHdvcmtlcilcbiAgICB0aGlzLnRpbWVyLnBvc3RNZXNzYWdlKCg2MDAwMCAvIHBhcnNlSW50KGJwbSkpIC8gNClcbiAgICB0aGlzLnRpbWVyLm9ubWVzc2FnZSA9IChldmVudCkgPT4ge1xuICAgICAgY2xpZW50LmlvLm1pZGkuc2VuZENsb2NrKClcbiAgICAgIGNsaWVudC5ydW4oKVxuICAgIH1cbiAgfVxuXG4gIHRoaXMuY2xlYXJUaW1lciA9IGZ1bmN0aW9uICgpIHtcbiAgICBpZiAodGhpcy50aW1lcikge1xuICAgICAgdGhpcy50aW1lci50ZXJtaW5hdGUoKVxuICAgIH1cbiAgICB0aGlzLnRpbWVyID0gbnVsbFxuICB9XG5cbiAgdGhpcy5zZXRGcmFtZSA9IGZ1bmN0aW9uIChmKSB7XG4gICAgaWYgKGlzTmFOKGYpKSB7IHJldHVybiB9XG4gICAgY2xpZW50Lm9yY2EuZiA9IGNsYW1wKGYsIDAsIDk5OTk5OTkpXG4gIH1cblxuICAvLyBVSVxuXG4gIHRoaXMudG9TdHJpbmcgPSBmdW5jdGlvbiAoKSB7XG4gICAgY29uc3QgZGlmZiA9IHRoaXMuc3BlZWQudGFyZ2V0IC0gdGhpcy5zcGVlZC52YWx1ZVxuICAgIGNvbnN0IF9vZmZzZXQgPSBNYXRoLmFicyhkaWZmKSA+IDUgPyAoZGlmZiA+IDAgPyBgKyR7ZGlmZn1gIDogZGlmZikgOiAnJ1xuICAgIGNvbnN0IF9tZXNzYWdlID0gdGhpcy5pc1B1cHBldCA9PT0gdHJ1ZSA/ICdtaWRpJyA6IGAke3RoaXMuc3BlZWQudmFsdWV9JHtfb2Zmc2V0fWBcbiAgICBjb25zdCBfYmVhdCA9IGRpZmYgPT09IDAgJiYgY2xpZW50Lm9yY2EuZiAlIDQgPT09IDAgPyAnKicgOiAnJ1xuICAgIHJldHVybiBgJHtfbWVzc2FnZX0ke19iZWF0fWBcbiAgfVxuXG4gIGZ1bmN0aW9uIGNsYW1wICh2LCBtaW4sIG1heCkgeyByZXR1cm4gdiA8IG1pbiA/IG1pbiA6IHYgPiBtYXggPyBtYXggOiB2IH1cbn1cblxuLyoqKiBFWFBPUlRTIEZST00gZXhwb3J0cy1sb2FkZXIgKioqL1xuZXhwb3J0IGRlZmF1bHQgQ2xvY2s7XG4iLCIndXNlIHN0cmljdCdcblxuZnVuY3Rpb24gQ29tbWFuZGVyIChjbGllbnQpIHtcbiAgdGhpcy5pc0FjdGl2ZSA9IGZhbHNlXG4gIHRoaXMucXVlcnkgPSAnJ1xuICB0aGlzLmhpc3RvcnkgPSBbXVxuICB0aGlzLmhpc3RvcnlJbmRleCA9IDBcblxuICAvLyBMaWJyYXJ5XG5cbiAgdGhpcy5wYXNzaXZlcyA9IHtcbiAgICBmaW5kOiAocCkgPT4geyBjbGllbnQuY3Vyc29yLmZpbmQocC5zdHIpIH0sXG4gICAgc2VsZWN0OiAocCkgPT4geyBjbGllbnQuY3Vyc29yLnNlbGVjdChwLngsIHAueSwgcC53IHx8IDAsIHAuaCB8fCAwKSB9LFxuICAgIGluamVjdDogKHApID0+IHtcbiAgICAgIGNsaWVudC5jdXJzb3Iuc2VsZWN0KHAuX3gsIHAuX3kpXG4gICAgICBpZiAoY2xpZW50LnNvdXJjZS5jYWNoZVtwLl9zdHIgKyAnLm9yY2EnXSkge1xuICAgICAgICBjb25zdCBibG9jayA9IGNsaWVudC5zb3VyY2UuY2FjaGVbcC5fc3RyICsgJy5vcmNhJ11cbiAgICAgICAgY29uc3QgcmVjdCA9IGNsaWVudC5vcmNhLnRvUmVjdChibG9jaylcbiAgICAgICAgY2xpZW50LmN1cnNvci5zY2FsZVRvKHJlY3QueCwgcmVjdC55KVxuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHRoaXMuYWN0aXZlcyA9IHtcbiAgICAvLyBQb3J0c1xuICAgIG9zYzogKHApID0+IHsgY2xpZW50LmlvLm9zYy5zZWxlY3QocC5pbnQpIH0sXG4gICAgdWRwOiAocCkgPT4ge1xuICAgICAgY2xpZW50LmlvLnVkcC5zZWxlY3RPdXRwdXQocC54KVxuICAgICAgaWYgKHAueSAhPT0gbnVsbCkgeyBjbGllbnQuaW8udWRwLnNlbGVjdElucHV0KHAueSkgfVxuICAgIH0sXG4gICAgbWlkaTogKHApID0+IHtcbiAgICAgIGNsaWVudC5pby5taWRpLnNlbGVjdE91dHB1dChwLngpXG4gICAgICBpZiAocC55ICE9PSBudWxsKSB7IGNsaWVudC5pby5taWRpLnNlbGVjdElucHV0KHAueSkgfVxuICAgIH0sXG4gICAgaXA6IChwKSA9PiB7IGNsaWVudC5pby5zZXRJcChwLnN0cikgfSxcbiAgICBjYzogKHApID0+IHsgY2xpZW50LmlvLmNjLnNldE9mZnNldChwLmludCkgfSxcbiAgICBwZzogKHApID0+IHsgY2xpZW50LmlvLmNjLnN0YWNrLnB1c2goeyBjaGFubmVsOiBjbGFtcChwLmludHNbMF0sIDAsIDE1KSwgYmFuazogcC5pbnRzWzFdLCBzdWI6IHAuaW50c1syXSwgcGdtOiBjbGFtcChwLmludHNbM10sIDAsIDEyNyksIHR5cGU6ICdwZycgfSk7IGNsaWVudC5pby5jYy5ydW4oKSB9LFxuICAgIC8vIEN1cnNvclxuICAgIGNvcHk6IChwKSA9PiB7IGNsaWVudC5jdXJzb3IuY29weSgpIH0sXG4gICAgcGFzdGU6IChwKSA9PiB7IGNsaWVudC5jdXJzb3IucGFzdGUodHJ1ZSkgfSxcbiAgICBlcmFzZTogKHApID0+IHsgY2xpZW50LmN1cnNvci5lcmFzZSgpIH0sXG4gICAgLy8gQ29udHJvbHNcbiAgICBwbGF5OiAocCkgPT4geyBjbGllbnQuY2xvY2sucGxheSgpIH0sXG4gICAgc3RvcDogKHApID0+IHsgY2xpZW50LmNsb2NrLnN0b3AoKSB9LFxuICAgIHJ1bjogKHApID0+IHsgY2xpZW50LnJ1bigpIH0sXG4gICAgLy8gVGltZVxuICAgIGFwbTogKHApID0+IHsgY2xpZW50LmNsb2NrLnNldFNwZWVkKG51bGwsIHAuaW50KSB9LFxuICAgIGJwbTogKHApID0+IHsgY2xpZW50LmNsb2NrLnNldFNwZWVkKHAuaW50LCBwLmludCwgdHJ1ZSkgfSxcbiAgICBmcmFtZTogKHApID0+IHsgY2xpZW50LmNsb2NrLnNldEZyYW1lKHAuaW50KSB9LFxuICAgIHJld2luZDogKHApID0+IHsgY2xpZW50LmNsb2NrLnNldEZyYW1lKGNsaWVudC5vcmNhLmYgLSBwLmludCkgfSxcbiAgICBza2lwOiAocCkgPT4geyBjbGllbnQuY2xvY2suc2V0RnJhbWUoY2xpZW50Lm9yY2EuZiArIHAuaW50KSB9LFxuICAgIHRpbWU6IChwLCBvcmlnaW4pID0+IHtcbiAgICAgIGNvbnN0IGZvcm1hdHRlZCA9IG5ldyBEYXRlKDI1MCAqIChjbGllbnQub3JjYS5mICogKDYwIC8gY2xpZW50LmNsb2NrLnNwZWVkLnZhbHVlKSkpLnRvSVNPU3RyaW5nKCkuc3Vic3RyKDE0LCA1KS5yZXBsYWNlKC86L2csICcnKVxuICAgICAgY2xpZW50Lm9yY2Eud3JpdGVCbG9jayhvcmlnaW4gPyBvcmlnaW4ueCA6IGNsaWVudC5jdXJzb3IueCwgb3JpZ2luID8gb3JpZ2luLnkgOiBjbGllbnQuY3Vyc29yLnksIGAke2Zvcm1hdHRlZH1gKVxuICAgIH0sXG4gICAgLy8gVGhlbWVpbmdcbiAgICBjb2xvcjogKHApID0+IHtcbiAgICAgIGlmIChwLnBhcnRzWzBdKSB7IGNsaWVudC50aGVtZS5zZXQoJ2JfbG93JywgcC5wYXJ0c1swXSkgfVxuICAgICAgaWYgKHAucGFydHNbMV0pIHsgY2xpZW50LnRoZW1lLnNldCgnYl9tZWQnLCBwLnBhcnRzWzFdKSB9XG4gICAgICBpZiAocC5wYXJ0c1syXSkgeyBjbGllbnQudGhlbWUuc2V0KCdiX2hpZ2gnLCBwLnBhcnRzWzJdKSB9XG4gICAgfSxcbiAgICAvLyBFZGl0XG4gICAgZmluZDogKHApID0+IHsgY2xpZW50LmN1cnNvci5maW5kKHAuc3RyKSB9LFxuICAgIHNlbGVjdDogKHApID0+IHsgY2xpZW50LmN1cnNvci5zZWxlY3QocC54LCBwLnksIHAudyB8fCAwLCBwLmggfHwgMCkgfSxcbiAgICBpbmplY3Q6IChwLCBvcmlnaW4pID0+IHtcbiAgICAgIGNvbnN0IGJsb2NrID0gY2xpZW50LnNvdXJjZS5jYWNoZVtwLl9zdHIgKyAnLm9yY2EnXVxuICAgICAgaWYgKCFibG9jaykgeyBjb25zb2xlLndhcm4oJ0NvbW1hbmRlcicsICdVbmtub3duIGJsb2NrOiAnICsgcC5fc3RyKTsgcmV0dXJuIH1cbiAgICAgIGNsaWVudC5vcmNhLndyaXRlQmxvY2sob3JpZ2luID8gb3JpZ2luLnggOiBjbGllbnQuY3Vyc29yLngsIG9yaWdpbiA/IG9yaWdpbi55IDogY2xpZW50LmN1cnNvci55LCBibG9jaylcbiAgICAgIGNsaWVudC5jdXJzb3Iuc2NhbGVUbygwLCAwKVxuICAgIH0sXG4gICAgd3JpdGU6IChwKSA9PiB7XG4gICAgICBjbGllbnQub3JjYS53cml0ZUJsb2NrKHAuX3ggfHwgY2xpZW50LmN1cnNvci54LCBwLl95IHx8IGNsaWVudC5jdXJzb3IueSwgcC5fc3RyKVxuICAgIH1cbiAgfVxuXG4gIC8vIE1ha2Ugc2hvcnRoYW5kc1xuICBmb3IgKGNvbnN0IGlkIGluIHRoaXMuYWN0aXZlcykge1xuICAgIHRoaXMuYWN0aXZlc1tpZC5zdWJzdHIoMCwgMildID0gdGhpcy5hY3RpdmVzW2lkXVxuICB9XG5cbiAgZnVuY3Rpb24gUGFyYW0gKHZhbCkge1xuICAgIHRoaXMuc3RyID0gYCR7dmFsfWBcbiAgICB0aGlzLmxlbmd0aCA9IHRoaXMuc3RyLmxlbmd0aFxuICAgIHRoaXMuY2hhcnMgPSB0aGlzLnN0ci5zcGxpdCgnJylcbiAgICB0aGlzLmludCA9ICFpc05hTih2YWwpID8gcGFyc2VJbnQodmFsKSA6IG51bGxcbiAgICB0aGlzLnBhcnRzID0gdmFsLnNwbGl0KCc7JylcbiAgICB0aGlzLmludHMgPSB0aGlzLnBhcnRzLm1hcCgodmFsKSA9PiB7IHJldHVybiBwYXJzZUludCh2YWwpIH0pXG4gICAgdGhpcy54ID0gcGFyc2VJbnQodGhpcy5wYXJ0c1swXSlcbiAgICB0aGlzLnkgPSBwYXJzZUludCh0aGlzLnBhcnRzWzFdKVxuICAgIHRoaXMudyA9IHBhcnNlSW50KHRoaXMucGFydHNbMl0pXG4gICAgdGhpcy5oID0gcGFyc2VJbnQodGhpcy5wYXJ0c1szXSlcbiAgICAvLyBPcHRpb25hbHMgUG9zaXRpb24gU3R5bGVcbiAgICB0aGlzLl9zdHIgPSB0aGlzLnBhcnRzWzBdXG4gICAgdGhpcy5feCA9IHBhcnNlSW50KHRoaXMucGFydHNbMV0pXG4gICAgdGhpcy5feSA9IHBhcnNlSW50KHRoaXMucGFydHNbMl0pXG4gIH1cblxuICAvLyBCZWdpblxuXG4gIHRoaXMuc3RhcnQgPSAocSA9ICcnKSA9PiB7XG4gICAgdGhpcy5pc0FjdGl2ZSA9IHRydWVcbiAgICB0aGlzLnF1ZXJ5ID0gcVxuICAgIGNsaWVudC5jdXJzb3IuaW5zID0gZmFsc2VcbiAgICBjbGllbnQudXBkYXRlKClcbiAgfVxuXG4gIHRoaXMuc3RvcCA9ICgpID0+IHtcbiAgICB0aGlzLmlzQWN0aXZlID0gZmFsc2VcbiAgICB0aGlzLnF1ZXJ5ID0gJydcbiAgICB0aGlzLmhpc3RvcnlJbmRleCA9IHRoaXMuaGlzdG9yeS5sZW5ndGhcbiAgICBjbGllbnQudXBkYXRlKClcbiAgfVxuXG4gIHRoaXMuZXJhc2UgPSBmdW5jdGlvbiAoKSB7XG4gICAgdGhpcy5xdWVyeSA9IHRoaXMucXVlcnkuc2xpY2UoMCwgLTEpXG4gICAgdGhpcy5wcmV2aWV3KClcbiAgfVxuXG4gIHRoaXMud3JpdGUgPSAoa2V5KSA9PiB7XG4gICAgaWYgKGtleSA9PT0gJ0JhY2tzcGFjZScpIHsgdGhpcy5lcmFzZSgpOyByZXR1cm4gfVxuICAgIGlmIChrZXkgPT09ICdFbnRlcicpIHsgdGhpcy5ydW4oKTsgcmV0dXJuIH1cbiAgICBpZiAoa2V5ID09PSAnRXNjYXBlJykgeyB0aGlzLnN0b3AoKTsgcmV0dXJuIH1cbiAgICBpZiAoa2V5Lmxlbmd0aCA+IDEpIHsgcmV0dXJuIH1cbiAgICB0aGlzLnF1ZXJ5ICs9IGtleVxuICAgIHRoaXMucHJldmlldygpXG4gIH1cblxuICB0aGlzLnJ1biA9IGZ1bmN0aW9uICgpIHtcbiAgICBjb25zdCB0b29sID0gdGhpcy5pc0FjdGl2ZSA9PT0gdHJ1ZSA/ICdjb21tYW5kZXInIDogJ2N1cnNvcidcbiAgICBjbGllbnRbdG9vbF0udHJpZ2dlcigpXG4gICAgY2xpZW50LnVwZGF0ZSgpXG4gIH1cblxuICB0aGlzLnRyaWdnZXIgPSBmdW5jdGlvbiAobXNnID0gdGhpcy5xdWVyeSwgb3JpZ2luID0gbnVsbCwgc3RvcHBpbmcgPSB0cnVlKSB7XG4gICAgY29uc3QgY21kID0gYCR7bXNnfWAuc3BsaXQoJzonKVswXS50cmltKCkucmVwbGFjZSgvXFxXL2csICcnKS50b0xvd2VyQ2FzZSgpXG4gICAgY29uc3QgdmFsID0gYCR7bXNnfWAuc3Vic3RyKGNtZC5sZW5ndGggKyAxKVxuICAgIGNvbnN0IGZuID0gdGhpcy5hY3RpdmVzW2NtZF1cbiAgICBpZiAoIWZuKSB7IGNvbnNvbGUud2FybignQ29tbWFuZGVyJywgYFVua25vd24gbWVzc2FnZTogJHttc2d9YCk7IHRoaXMuc3RvcCgpOyByZXR1cm4gfVxuICAgIGZuKG5ldyBQYXJhbSh2YWwpLCBvcmlnaW4pXG4gICAgdGhpcy5oaXN0b3J5LnB1c2gobXNnKVxuICAgIHRoaXMuaGlzdG9yeUluZGV4ID0gdGhpcy5oaXN0b3J5Lmxlbmd0aFxuICAgIGlmIChzdG9wcGluZykge1xuICAgICAgdGhpcy5zdG9wKClcbiAgICB9XG4gIH1cblxuICB0aGlzLnByZXZpZXcgPSBmdW5jdGlvbiAobXNnID0gdGhpcy5xdWVyeSkge1xuICAgIGNvbnN0IGNtZCA9IGAke21zZ31gLnNwbGl0KCc6JylbMF0udG9Mb3dlckNhc2UoKVxuICAgIGNvbnN0IHZhbCA9IGAke21zZ31gLnN1YnN0cihjbWQubGVuZ3RoICsgMSlcbiAgICBpZiAoIXRoaXMucGFzc2l2ZXNbY21kXSkgeyByZXR1cm4gfVxuICAgIHRoaXMucGFzc2l2ZXNbY21kXShuZXcgUGFyYW0odmFsKSwgZmFsc2UpXG4gIH1cblxuICAvLyBFdmVudHNcblxuICB0aGlzLm9uS2V5RG93biA9IChlKSA9PiB7XG4gICAgaWYgKGUuY3RybEtleSB8fCBlLm1ldGFLZXkpIHsgcmV0dXJuIH1cbiAgICBjbGllbnRbdGhpcy5pc0FjdGl2ZSA9PT0gdHJ1ZSA/ICdjb21tYW5kZXInIDogJ2N1cnNvciddLndyaXRlKGUua2V5KVxuICAgIGUuc3RvcFByb3BhZ2F0aW9uKClcbiAgfVxuXG4gIHRoaXMub25LZXlVcCA9IChlKSA9PiB7XG4gICAgY2xpZW50LnVwZGF0ZSgpXG4gIH1cblxuICAvLyBVSVxuXG4gIHRoaXMudG9TdHJpbmcgPSBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIGAke3RoaXMucXVlcnl9YFxuICB9XG5cbiAgLy8gVXRpbHNcblxuICBmdW5jdGlvbiBjbGFtcCAodiwgbWluLCBtYXgpIHsgcmV0dXJuIHYgPCBtaW4gPyBtaW4gOiB2ID4gbWF4ID8gbWF4IDogdiB9XG59XG5cbi8qKiogRVhQT1JUUyBGUk9NIGV4cG9ydHMtbG9hZGVyICoqKi9cbmV4cG9ydCBkZWZhdWx0IENvbW1hbmRlcjtcbiIsIid1c2Ugc3RyaWN0J1xuXG5mdW5jdGlvbiBDdXJzb3IgKGNsaWVudCkge1xuICB0aGlzLnggPSAwXG4gIHRoaXMueSA9IDBcbiAgdGhpcy53ID0gMFxuICB0aGlzLmggPSAwXG5cbiAgdGhpcy5taW5YID0gMFxuICB0aGlzLm1heFggPSAwXG4gIHRoaXMubWluWSA9IDBcbiAgdGhpcy5tYXhZID0gMFxuXG4gIHRoaXMuaW5zID0gZmFsc2VcblxuICB0aGlzLnN0YXJ0ID0gKCkgPT4ge1xuICAgIGRvY3VtZW50Lm9ubW91c2Vkb3duID0gdGhpcy5vbk1vdXNlRG93blxuICAgIGRvY3VtZW50Lm9ubW91c2V1cCA9IHRoaXMub25Nb3VzZVVwXG4gICAgZG9jdW1lbnQub25tb3VzZW1vdmUgPSB0aGlzLm9uTW91c2VNb3ZlXG4gICAgZG9jdW1lbnQub25jb3B5ID0gdGhpcy5vbkNvcHlcbiAgICBkb2N1bWVudC5vbmN1dCA9IHRoaXMub25DdXRcbiAgICBkb2N1bWVudC5vbnBhc3RlID0gdGhpcy5vblBhc3RlXG4gICAgZG9jdW1lbnQub25jb250ZXh0bWVudSA9IHRoaXMub25Db250ZXh0TWVudVxuICB9XG5cbiAgdGhpcy5zZWxlY3QgPSAoeCA9IHRoaXMueCwgeSA9IHRoaXMueSwgdyA9IHRoaXMudywgaCA9IHRoaXMuaCkgPT4ge1xuICAgIGlmIChpc05hTih4KSB8fCBpc05hTih5KSB8fCBpc05hTih3KSB8fCBpc05hTihoKSkgeyByZXR1cm4gfVxuICAgIGNvbnN0IHJlY3QgPSB7IHg6IGNsYW1wKHBhcnNlSW50KHgpLCAwLCBjbGllbnQub3JjYS53IC0gMSksIHk6IGNsYW1wKHBhcnNlSW50KHkpLCAwLCBjbGllbnQub3JjYS5oIC0gMSksIHc6IGNsYW1wKHBhcnNlSW50KHcpLCAtdGhpcy54LCBjbGllbnQub3JjYS53IC0gMSksIGg6IGNsYW1wKHBhcnNlSW50KGgpLCAtdGhpcy55LCBjbGllbnQub3JjYS5oIC0gMSkgfVxuXG4gICAgaWYgKHRoaXMueCA9PT0gcmVjdC54ICYmIHRoaXMueSA9PT0gcmVjdC55ICYmIHRoaXMudyA9PT0gcmVjdC53ICYmIHRoaXMuaCA9PT0gcmVjdC5oKSB7XG4gICAgICByZXR1cm4gLy8gRG9uJ3QgdXBkYXRlIHdoZW4gdW5jaGFuZ2VkXG4gICAgfVxuXG4gICAgdGhpcy54ID0gcmVjdC54XG4gICAgdGhpcy55ID0gcmVjdC55XG4gICAgdGhpcy53ID0gcmVjdC53XG4gICAgdGhpcy5oID0gcmVjdC5oXG4gICAgdGhpcy5jYWxjdWxhdGVCb3VuZHMoKVxuICAgIGNsaWVudC50b2dnbGVHdWlkZShmYWxzZSlcbiAgICBjbGllbnQudXBkYXRlKClcbiAgfVxuXG4gIHRoaXMuc2VsZWN0QWxsID0gKCkgPT4ge1xuICAgIHRoaXMuc2VsZWN0KDAsIDAsIGNsaWVudC5vcmNhLncsIGNsaWVudC5vcmNhLmgpXG4gICAgdGhpcy5pbnMgPSBmYWxzZVxuICB9XG5cbiAgdGhpcy5tb3ZlID0gKHgsIHkpID0+IHtcbiAgICB0aGlzLnNlbGVjdCh0aGlzLnggKyBwYXJzZUludCh4KSwgdGhpcy55IC0gcGFyc2VJbnQoeSkpXG4gIH1cblxuICB0aGlzLm1vdmVUbyA9ICh4LCB5KSA9PiB7XG4gICAgdGhpcy5zZWxlY3QoeCwgeSlcbiAgfVxuXG4gIHRoaXMuc2NhbGUgPSAodywgaCkgPT4ge1xuICAgIHRoaXMuc2VsZWN0KHRoaXMueCwgdGhpcy55LCB0aGlzLncgKyBwYXJzZUludCh3KSwgdGhpcy5oIC0gcGFyc2VJbnQoaCkpXG4gIH1cblxuICB0aGlzLnNjYWxlVG8gPSAodywgaCkgPT4ge1xuICAgIHRoaXMuc2VsZWN0KHRoaXMueCwgdGhpcy55LCB3LCBoKVxuICB9XG5cbiAgdGhpcy5kcmFnID0gKHgsIHkpID0+IHtcbiAgICBpZiAoaXNOYU4oeCkgfHwgaXNOYU4oeSkpIHsgcmV0dXJuIH1cbiAgICB0aGlzLmlucyA9IGZhbHNlXG4gICAgY29uc3QgYmxvY2sgPSB0aGlzLnNlbGVjdGlvbigpXG4gICAgdGhpcy5lcmFzZSgpXG4gICAgdGhpcy5tb3ZlKHgsIHkpXG4gICAgY2xpZW50Lm9yY2Eud3JpdGVCbG9jayh0aGlzLm1pblgsIHRoaXMubWluWSwgYmxvY2spXG4gICAgY2xpZW50Lmhpc3RvcnkucmVjb3JkKGNsaWVudC5vcmNhLnMpXG4gIH1cblxuICB0aGlzLnJlc2V0ID0gKHBvcyA9IGZhbHNlKSA9PiB7XG4gICAgdGhpcy5zZWxlY3QocG9zID8gMCA6IHRoaXMueCwgcG9zID8gMCA6IHRoaXMueSwgMCwgMClcbiAgICB0aGlzLmlucyA9IDBcbiAgfVxuXG4gIHRoaXMucmVhZCA9ICgpID0+IHtcbiAgICByZXR1cm4gY2xpZW50Lm9yY2EuZ2x5cGhBdCh0aGlzLngsIHRoaXMueSlcbiAgfVxuXG4gIHRoaXMud3JpdGUgPSAoZykgPT4ge1xuICAgIGlmICghY2xpZW50Lm9yY2EuaXNBbGxvd2VkKGcpKSB7IHJldHVybiB9XG4gICAgaWYgKGNsaWVudC5vcmNhLndyaXRlKHRoaXMueCwgdGhpcy55LCBnKSAmJiB0aGlzLmlucykge1xuICAgICAgdGhpcy5tb3ZlKDEsIDApXG4gICAgfVxuICAgIGNsaWVudC5oaXN0b3J5LnJlY29yZChjbGllbnQub3JjYS5zKVxuICB9XG5cbiAgdGhpcy5lcmFzZSA9ICgpID0+IHtcbiAgICBmb3IgKGxldCB5ID0gdGhpcy5taW5ZOyB5IDw9IHRoaXMubWF4WTsgeSsrKSB7XG4gICAgICBmb3IgKGxldCB4ID0gdGhpcy5taW5YOyB4IDw9IHRoaXMubWF4WDsgeCsrKSB7XG4gICAgICAgIGNsaWVudC5vcmNhLndyaXRlKHgsIHksICcuJylcbiAgICAgIH1cbiAgICB9XG4gICAgY2xpZW50Lmhpc3RvcnkucmVjb3JkKGNsaWVudC5vcmNhLnMpXG4gIH1cblxuICB0aGlzLmZpbmQgPSAoc3RyKSA9PiB7XG4gICAgY29uc3QgaSA9IGNsaWVudC5vcmNhLnMuaW5kZXhPZihzdHIpXG4gICAgaWYgKGkgPCAwKSB7IHJldHVybiB9XG4gICAgY29uc3QgcG9zID0gY2xpZW50Lm9yY2EucG9zQXQoaSlcbiAgICB0aGlzLnNlbGVjdChwb3MueCwgcG9zLnksIHN0ci5sZW5ndGggLSAxLCAwKVxuICB9XG5cbiAgdGhpcy5pbnNwZWN0ID0gKCkgPT4ge1xuICAgIGlmICh0aGlzLncgIT09IDAgfHwgdGhpcy5oICE9PSAwKSB7IHJldHVybiAnbXVsdGknIH1cbiAgICBjb25zdCBpbmRleCA9IGNsaWVudC5vcmNhLmluZGV4QXQodGhpcy54LCB0aGlzLnkpXG4gICAgY29uc3QgcG9ydCA9IGNsaWVudC5wb3J0c1tpbmRleF1cbiAgICBpZiAocG9ydCkgeyByZXR1cm4gYCR7cG9ydFszXX1gIH1cbiAgICBpZiAoY2xpZW50Lm9yY2EubG9ja0F0KHRoaXMueCwgdGhpcy55KSkgeyByZXR1cm4gJ2xvY2tlZCcgfVxuICAgIHJldHVybiAnZW1wdHknXG4gIH1cblxuICB0aGlzLnRyaWdnZXIgPSAoKSA9PiB7XG4gICAgY29uc3Qgb3BlcmF0b3IgPSBjbGllbnQub3JjYS5vcGVyYXRvckF0KHRoaXMueCwgdGhpcy55KVxuICAgIGlmICghb3BlcmF0b3IpIHsgY29uc29sZS53YXJuKCdDdXJzb3InLCAnTm90aGluZyB0byB0cmlnZ2VyLicpOyByZXR1cm4gfVxuICAgIGNvbnNvbGUubG9nKCdDdXJzb3InLCAnVHJpZ2dlcjogJyArIG9wZXJhdG9yLm5hbWUpXG4gICAgb3BlcmF0b3IucnVuKHRydWUpXG4gIH1cblxuICB0aGlzLmNvbW1lbnQgPSAoKSA9PiB7XG4gICAgY29uc3QgYmxvY2sgPSB0aGlzLnNlbGVjdGlvbigpXG4gICAgY29uc3QgbGluZXMgPSBibG9jay50cmltKCkuc3BsaXQoL1xccj9cXG4vKVxuICAgIGNvbnN0IGNoYXIgPSBibG9jay5zdWJzdHIoMCwgMSkgPT09ICcjJyA/ICcuJyA6ICcjJ1xuICAgIGNvbnN0IHJlcyA9IGxpbmVzLm1hcCgobGluZSkgPT4geyByZXR1cm4gYCR7Y2hhcn0ke2xpbmUuc3Vic3RyKDEsIGxpbmUubGVuZ3RoIC0gMil9JHtjaGFyfWAgfSkuam9pbignXFxuJylcbiAgICBjbGllbnQub3JjYS53cml0ZUJsb2NrKHRoaXMubWluWCwgdGhpcy5taW5ZLCByZXMpXG4gICAgY2xpZW50Lmhpc3RvcnkucmVjb3JkKGNsaWVudC5vcmNhLnMpXG4gIH1cblxuICB0aGlzLnRvVXBwZXJDYXNlID0gKCkgPT4ge1xuICAgIGNvbnN0IGJsb2NrID0gdGhpcy5zZWxlY3Rpb24oKS50b1VwcGVyQ2FzZSgpXG4gICAgY2xpZW50Lm9yY2Eud3JpdGVCbG9jayh0aGlzLm1pblgsIHRoaXMubWluWSwgYmxvY2spXG4gIH1cblxuICB0aGlzLnRvTG93ZXJDYXNlID0gKCkgPT4ge1xuICAgIGNvbnN0IGJsb2NrID0gdGhpcy5zZWxlY3Rpb24oKS50b0xvd2VyQ2FzZSgpXG4gICAgY2xpZW50Lm9yY2Eud3JpdGVCbG9jayh0aGlzLm1pblgsIHRoaXMubWluWSwgYmxvY2spXG4gIH1cblxuICB0aGlzLnRvUmVjdCA9ICgpID0+IHtcbiAgICByZXR1cm4ge1xuICAgICAgeDogdGhpcy5taW5YLFxuICAgICAgeTogdGhpcy5taW5ZLFxuICAgICAgdzogdGhpcy5tYXhYIC0gdGhpcy5taW5YICsgMSxcbiAgICAgIGg6IHRoaXMubWF4WSAtIHRoaXMubWluWSArIDFcbiAgICB9XG4gIH1cblxuICB0aGlzLmNhbGN1bGF0ZUJvdW5kcyA9ICgpID0+IHtcbiAgICB0aGlzLm1pblggPSB0aGlzLnggPCB0aGlzLnggKyB0aGlzLncgPyB0aGlzLnggOiB0aGlzLnggKyB0aGlzLndcbiAgICB0aGlzLm1pblkgPSB0aGlzLnkgPCB0aGlzLnkgKyB0aGlzLmggPyB0aGlzLnkgOiB0aGlzLnkgKyB0aGlzLmhcbiAgICB0aGlzLm1heFggPSB0aGlzLnggPiB0aGlzLnggKyB0aGlzLncgPyB0aGlzLnggOiB0aGlzLnggKyB0aGlzLndcbiAgICB0aGlzLm1heFkgPSB0aGlzLnkgPiB0aGlzLnkgKyB0aGlzLmggPyB0aGlzLnkgOiB0aGlzLnkgKyB0aGlzLmhcbiAgfVxuXG4gIHRoaXMuc2VsZWN0ZWQgPSAoeCwgeSwgdyA9IDAsIGggPSAwKSA9PiB7XG4gICAgcmV0dXJuIHggPj0gdGhpcy5taW5YICYmIHggPD0gdGhpcy5tYXhYICYmIHkgPj0gdGhpcy5taW5ZICYmIHkgPD0gdGhpcy5tYXhZXG4gIH1cblxuICB0aGlzLnNlbGVjdGlvbiA9IChyZWN0ID0gdGhpcy50b1JlY3QoKSkgPT4ge1xuICAgIHJldHVybiBjbGllbnQub3JjYS5nZXRCbG9jayhyZWN0LngsIHJlY3QueSwgcmVjdC53LCByZWN0LmgpXG4gIH1cblxuICB0aGlzLm1vdXNlRnJvbSA9IG51bGxcblxuICB0aGlzLm9uTW91c2VEb3duID0gKGUpID0+IHtcbiAgICBpZiAoZS5idXR0b24gIT09IDApIHsgdGhpcy5jdXQoKTsgcmV0dXJuIH1cbiAgICBjb25zdCBwb3MgPSB0aGlzLm1vdXNlUGljayhlLmNsaWVudFgsIGUuY2xpZW50WSlcbiAgICB0aGlzLnNlbGVjdChwb3MueCwgcG9zLnksIDAsIDApXG4gICAgdGhpcy5tb3VzZUZyb20gPSBwb3NcbiAgfVxuXG4gIHRoaXMub25Nb3VzZU1vdmUgPSAoZSkgPT4ge1xuICAgIGlmICghdGhpcy5tb3VzZUZyb20pIHsgcmV0dXJuIH1cbiAgICBjb25zdCBwb3MgPSB0aGlzLm1vdXNlUGljayhlLmNsaWVudFgsIGUuY2xpZW50WSlcbiAgICB0aGlzLnNlbGVjdCh0aGlzLm1vdXNlRnJvbS54LCB0aGlzLm1vdXNlRnJvbS55LCBwb3MueCAtIHRoaXMubW91c2VGcm9tLngsIHBvcy55IC0gdGhpcy5tb3VzZUZyb20ueSlcbiAgfVxuXG4gIHRoaXMub25Nb3VzZVVwID0gKGUpID0+IHtcbiAgICBpZiAodGhpcy5tb3VzZUZyb20pIHtcbiAgICAgIGNvbnN0IHBvcyA9IHRoaXMubW91c2VQaWNrKGUuY2xpZW50WCwgZS5jbGllbnRZKVxuICAgICAgdGhpcy5zZWxlY3QodGhpcy5tb3VzZUZyb20ueCwgdGhpcy5tb3VzZUZyb20ueSwgcG9zLnggLSB0aGlzLm1vdXNlRnJvbS54LCBwb3MueSAtIHRoaXMubW91c2VGcm9tLnkpXG4gICAgfVxuICAgIHRoaXMubW91c2VGcm9tID0gbnVsbFxuICB9XG5cbiAgdGhpcy5tb3VzZVBpY2sgPSAoeCwgeSwgdyA9IGNsaWVudC50aWxlLncsIGggPSBjbGllbnQudGlsZS5oKSA9PiB7XG4gICAgcmV0dXJuIHsgeDogcGFyc2VJbnQoKHggLSAzMCkgLyB3KSwgeTogcGFyc2VJbnQoKHkgLSAzMCkgLyBoKSB9XG4gIH1cblxuICB0aGlzLm9uQ29udGV4dE1lbnUgPSAoZSkgPT4ge1xuICAgIGUucHJldmVudERlZmF1bHQoKVxuICB9XG5cbiAgdGhpcy5jb3B5ID0gZnVuY3Rpb24gKCkge1xuICAgIGRvY3VtZW50LmV4ZWNDb21tYW5kKCdjb3B5JylcbiAgfVxuXG4gIHRoaXMuY3V0ID0gZnVuY3Rpb24gKCkge1xuICAgIGRvY3VtZW50LmV4ZWNDb21tYW5kKCdjdXQnKVxuICB9XG5cbiAgdGhpcy5wYXN0ZSA9IGZ1bmN0aW9uIChvdmVybGFwID0gZmFsc2UpIHtcbiAgICBkb2N1bWVudC5leGVjQ29tbWFuZCgncGFzdGUnKVxuICB9XG5cbiAgdGhpcy5vbkNvcHkgPSAoZSkgPT4ge1xuICAgIGUuY2xpcGJvYXJkRGF0YS5zZXREYXRhKCd0ZXh0L3BsYWluJywgdGhpcy5zZWxlY3Rpb24oKSlcbiAgICBlLnByZXZlbnREZWZhdWx0KClcbiAgfVxuXG4gIHRoaXMub25DdXQgPSAoZSkgPT4ge1xuICAgIHRoaXMub25Db3B5KGUpXG4gICAgdGhpcy5lcmFzZSgpXG4gIH1cblxuICB0aGlzLm9uUGFzdGUgPSAoZSkgPT4ge1xuICAgIGNvbnN0IGRhdGEgPSBlLmNsaXBib2FyZERhdGEuZ2V0RGF0YSgndGV4dC9wbGFpbicpLnRyaW0oKVxuICAgIGNsaWVudC5vcmNhLndyaXRlQmxvY2sodGhpcy5taW5YLCB0aGlzLm1pblksIGRhdGEsIHRoaXMuaW5zKVxuICAgIGNsaWVudC5oaXN0b3J5LnJlY29yZChjbGllbnQub3JjYS5zKVxuICAgIHRoaXMuc2NhbGVUbyhkYXRhLnNwbGl0KC9cXHI/XFxuLylbMF0ubGVuZ3RoIC0gMSwgZGF0YS5zcGxpdCgvXFxyP1xcbi8pLmxlbmd0aCAtIDEpXG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpXG4gIH1cblxuICBmdW5jdGlvbiBjbGFtcCAodiwgbWluLCBtYXgpIHsgcmV0dXJuIHYgPCBtaW4gPyBtaW4gOiB2ID4gbWF4ID8gbWF4IDogdiB9XG59XG5cbi8qKiogRVhQT1JUUyBGUk9NIGV4cG9ydHMtbG9hZGVyICoqKi9cbmV4cG9ydCBkZWZhdWx0IEN1cnNvcjtcbiIsIi8qKiogSU1QT1JUUyBGUk9NIGltcG9ydHMtbG9hZGVyICoqKi9cbid1c2Ugc3RyaWN0JztcbmltcG9ydCB0cmFuc3Bvc2VUYWJsZSBmcm9tIFwiLi4vdHJhbnNwb3NlLmpzXCI7XG5cbid1c2Ugc3RyaWN0J1xuXG4vKiBnbG9iYWwgdHJhbnNwb3NlVGFibGUgKi9cblxuZnVuY3Rpb24gTWlkaSAoY2xpZW50KSB7XG4gIHRoaXMubW9kZSA9IDBcbiAgdGhpcy5pc0Nsb2NrID0gZmFsc2VcblxuICB0aGlzLm91dHB1dEluZGV4ID0gLTFcbiAgdGhpcy5pbnB1dEluZGV4ID0gLTFcblxuICB0aGlzLm91dHB1dHMgPSBbXVxuICB0aGlzLmlucHV0cyA9IFtdXG4gIHRoaXMuc3RhY2sgPSBbXVxuXG4gIHRoaXMuc3RhcnQgPSBmdW5jdGlvbiAoKSB7XG4gICAgY29uc29sZS5pbmZvKCdNaWRpIFN0YXJ0aW5nLi4nKVxuICAgIHRoaXMucmVmcmVzaCgpXG4gIH1cblxuICB0aGlzLmNsZWFyID0gZnVuY3Rpb24gKCkge1xuICAgIHRoaXMuc3RhY2sgPSB0aGlzLnN0YWNrLmZpbHRlcigoaXRlbSkgPT4geyByZXR1cm4gaXRlbSB9KVxuICB9XG5cbiAgdGhpcy5ydW4gPSBmdW5jdGlvbiAoKSB7XG4gICAgZm9yIChjb25zdCBpZCBpbiB0aGlzLnN0YWNrKSB7XG4gICAgICBjb25zdCBpdGVtID0gdGhpcy5zdGFja1tpZF1cbiAgICAgIGlmIChpdGVtLmlzUGxheWVkID09PSBmYWxzZSkge1xuICAgICAgICB0aGlzLnByZXNzKGl0ZW0pXG4gICAgICB9XG4gICAgICBpZiAoaXRlbS5sZW5ndGggPCAxKSB7XG4gICAgICAgIHRoaXMucmVsZWFzZShpdGVtLCBpZClcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGl0ZW0ubGVuZ3RoLS1cbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICB0aGlzLnRyaWdnZXIgPSBmdW5jdGlvbiAoaXRlbSwgZG93bikge1xuICAgIGlmICghdGhpcy5vdXRwdXREZXZpY2UoKSkgeyBjb25zb2xlLndhcm4oJ01JREknLCAnTm8gbWlkaSBvdXRwdXQhJyk7IHJldHVybiB9XG5cbiAgICBjb25zdCB0cmFuc3Bvc2VkID0gdGhpcy50cmFuc3Bvc2UoaXRlbS5ub3RlLCBpdGVtLm9jdGF2ZSlcbiAgICBjb25zdCBjaGFubmVsID0gIWlzTmFOKGl0ZW0uY2hhbm5lbCkgPyBwYXJzZUludChpdGVtLmNoYW5uZWwpIDogY2xpZW50Lm9yY2EudmFsdWVPZihpdGVtLmNoYW5uZWwpXG5cbiAgICBpZiAoIXRyYW5zcG9zZWQpIHsgcmV0dXJuIH1cblxuICAgIGNvbnN0IGMgPSBkb3duID09PSB0cnVlID8gMHg5MCArIGNoYW5uZWwgOiAweDgwICsgY2hhbm5lbFxuICAgIGNvbnN0IG4gPSB0cmFuc3Bvc2VkLmlkXG4gICAgY29uc3QgdiA9IHBhcnNlSW50KChpdGVtLnZlbG9jaXR5IC8gMTYpICogMTI3KVxuXG4gICAgaWYgKCFuIHx8IGMgPT09IDEyNykgeyByZXR1cm4gfVxuXG4gICAgdGhpcy5vdXRwdXREZXZpY2UoKS5zZW5kKFtjLCBuLCB2XSlcbiAgfVxuXG4gIHRoaXMucHJlc3MgPSBmdW5jdGlvbiAoaXRlbSkge1xuICAgIGlmICghaXRlbSkgeyByZXR1cm4gfVxuICAgIHRoaXMudHJpZ2dlcihpdGVtLCB0cnVlKVxuICAgIGl0ZW0uaXNQbGF5ZWQgPSB0cnVlXG4gIH1cblxuICB0aGlzLnJlbGVhc2UgPSBmdW5jdGlvbiAoaXRlbSwgaWQpIHtcbiAgICBpZiAoIWl0ZW0pIHsgcmV0dXJuIH1cbiAgICB0aGlzLnRyaWdnZXIoaXRlbSwgZmFsc2UpXG4gICAgZGVsZXRlIHRoaXMuc3RhY2tbaWRdXG4gIH1cblxuICB0aGlzLnNpbGVuY2UgPSBmdW5jdGlvbiAoKSB7XG4gICAgZm9yIChjb25zdCBpdGVtIG9mIHRoaXMuc3RhY2spIHtcbiAgICAgIHRoaXMucmVsZWFzZShpdGVtKVxuICAgIH1cbiAgfVxuXG4gIHRoaXMucHVzaCA9IGZ1bmN0aW9uIChjaGFubmVsLCBvY3RhdmUsIG5vdGUsIHZlbG9jaXR5LCBsZW5ndGgsIGlzUGxheWVkID0gZmFsc2UpIHtcbiAgICBjb25zdCBpdGVtID0geyBjaGFubmVsLCBvY3RhdmUsIG5vdGUsIHZlbG9jaXR5LCBsZW5ndGgsIGlzUGxheWVkIH1cbiAgICAvLyBSZXRyaWdnZXIgZHVwbGljYXRlc1xuICAgIGZvciAoY29uc3QgaWQgaW4gdGhpcy5zdGFjaykge1xuICAgICAgY29uc3QgZHVwID0gdGhpcy5zdGFja1tpZF1cbiAgICAgIGlmIChkdXAuY2hhbm5lbCA9PT0gY2hhbm5lbCAmJiBkdXAub2N0YXZlID09PSBvY3RhdmUgJiYgZHVwLm5vdGUgPT09IG5vdGUpIHsgdGhpcy5yZWxlYXNlKGl0ZW0sIGlkKSB9XG4gICAgfVxuICAgIHRoaXMuc3RhY2sucHVzaChpdGVtKVxuICB9XG5cbiAgdGhpcy5hbGxOb3Rlc09mZiA9IGZ1bmN0aW9uICgpIHtcbiAgICBpZiAoIXRoaXMub3V0cHV0RGV2aWNlKCkpIHsgcmV0dXJuIH1cbiAgICBjb25zb2xlLmxvZygnTUlESScsICdBbGwgTm90ZXMgT2ZmJylcbiAgICBmb3IgKGxldCBjaGFuID0gMDsgY2hhbiA8IDE2OyBjaGFuKyspIHtcbiAgICAgIHRoaXMub3V0cHV0RGV2aWNlKCkuc2VuZChbMHhCMCArIGNoYW4sIDEyMywgMF0pXG4gICAgfVxuICB9XG5cbiAgLy8gQ2xvY2tcblxuICB0aGlzLnRpY2tzID0gW11cblxuICB0aGlzLnNlbmRDbG9ja1N0YXJ0ID0gZnVuY3Rpb24gKCkge1xuICAgIGlmICghdGhpcy5vdXRwdXREZXZpY2UoKSkgeyByZXR1cm4gfVxuICAgIHRoaXMuaXNDbG9jayA9IHRydWVcbiAgICB0aGlzLm91dHB1dERldmljZSgpLnNlbmQoWzB4RkFdLCAwKVxuICAgIGNvbnNvbGUubG9nKCdNSURJJywgJ01JREkgU3RhcnQgU2VudCcpXG4gIH1cblxuICB0aGlzLnNlbmRDbG9ja1N0b3AgPSBmdW5jdGlvbiAoKSB7XG4gICAgaWYgKCF0aGlzLm91dHB1dERldmljZSgpKSB7IHJldHVybiB9XG4gICAgdGhpcy5pc0Nsb2NrID0gZmFsc2VcbiAgICB0aGlzLm91dHB1dERldmljZSgpLnNlbmQoWzB4RkNdLCAwKVxuICAgIGNvbnNvbGUubG9nKCdNSURJJywgJ01JREkgU3RvcCBTZW50JylcbiAgfVxuXG4gIHRoaXMuc2VuZENsb2NrID0gZnVuY3Rpb24gKCkge1xuICAgIGlmICghdGhpcy5vdXRwdXREZXZpY2UoKSkgeyByZXR1cm4gfVxuICAgIGlmICh0aGlzLmlzQ2xvY2sgIT09IHRydWUpIHsgcmV0dXJuIH1cblxuICAgIGNvbnN0IGJwbSA9IGNsaWVudC5jbG9jay5zcGVlZC52YWx1ZVxuICAgIGNvbnN0IGZyYW1lVGltZSA9ICg2MDAwMCAvIGJwbSkgLyA0XG4gICAgY29uc3QgZnJhbWVGcmFnID0gZnJhbWVUaW1lIC8gNlxuXG4gICAgZm9yIChsZXQgaWQgPSAwOyBpZCA8IDY7IGlkKyspIHtcbiAgICAgIGlmICh0aGlzLnRpY2tzW2lkXSkgeyBjbGVhclRpbWVvdXQodGhpcy50aWNrc1tpZF0pIH1cbiAgICAgIHRoaXMudGlja3NbaWRdID0gc2V0VGltZW91dCgoKSA9PiB7IHRoaXMub3V0cHV0RGV2aWNlKCkuc2VuZChbMHhGOF0sIDApIH0sIHBhcnNlSW50KGlkKSAqIGZyYW1lRnJhZylcbiAgICB9XG4gIH1cblxuICB0aGlzLnJlY2VpdmUgPSBmdW5jdGlvbiAobXNnKSB7XG4gICAgc3dpdGNoIChtc2cuZGF0YVswXSkge1xuICAgICAgLy8gQ2xvY2tcbiAgICAgIGNhc2UgMHhGODpcbiAgICAgICAgY2xpZW50LmNsb2NrLnRhcCgpXG4gICAgICAgIGJyZWFrXG4gICAgICBjYXNlIDB4RkE6XG4gICAgICAgIGNvbnNvbGUubG9nKCdNSURJJywgJ1N0YXJ0IFJlY2VpdmVkJylcbiAgICAgICAgY2xpZW50LmNsb2NrLnBsYXkoZmFsc2UsIHRydWUpXG4gICAgICAgIGJyZWFrXG4gICAgICBjYXNlIDB4RkI6XG4gICAgICAgIGNvbnNvbGUubG9nKCdNSURJJywgJ0NvbnRpbnVlIFJlY2VpdmVkJylcbiAgICAgICAgY2xpZW50LmNsb2NrLnBsYXkoKVxuICAgICAgICBicmVha1xuICAgICAgY2FzZSAweEZDOlxuICAgICAgICBjb25zb2xlLmxvZygnTUlESScsICdTdG9wIFJlY2VpdmVkJylcbiAgICAgICAgY2xpZW50LmNsb2NrLnN0b3AoKVxuICAgICAgICBicmVha1xuICAgIH1cbiAgfVxuXG4gIC8vIFRvb2xzXG5cbiAgdGhpcy5zZWxlY3RPdXRwdXQgPSBmdW5jdGlvbiAoaWQpIHtcbiAgICBpZiAoaWQgPT09IC0xKSB7IHRoaXMub3V0cHV0SW5kZXggPSAtMTsgY29uc29sZS5sb2coJ01JREknLCAnU2VsZWN0IE91dHB1dCBEZXZpY2U6IE5vbmUnKTsgcmV0dXJuIH1cbiAgICBpZiAoIXRoaXMub3V0cHV0c1tpZF0pIHsgY29uc29sZS53YXJuKCdNSURJJyxgVW5rbm93biBkZXZpY2Ugd2l0aCBpZCAke2lkfWApOyByZXR1cm4gfVxuXG4gICAgdGhpcy5vdXRwdXRJbmRleCA9IHBhcnNlSW50KGlkKVxuICAgIGNvbnNvbGUubG9nKCdNSURJJywgYFNlbGVjdCBPdXRwdXQgRGV2aWNlOiAke3RoaXMub3V0cHV0RGV2aWNlKCkubmFtZX1gKVxuICB9XG5cbiAgdGhpcy5zZWxlY3RJbnB1dCA9IGZ1bmN0aW9uIChpZCkge1xuICAgIGlmICh0aGlzLmlucHV0RGV2aWNlKCkpIHsgdGhpcy5pbnB1dERldmljZSgpLm9ubWlkaW1lc3NhZ2UgPSBudWxsIH1cbiAgICBpZiAoaWQgPT09IC0xKSB7IHRoaXMuaW5wdXRJbmRleCA9IC0xOyBjb25zb2xlLmxvZygnTUlESScsICdTZWxlY3QgSW5wdXQgRGV2aWNlOiBOb25lJyk7IHJldHVybiB9XG4gICAgaWYgKCF0aGlzLmlucHV0c1tpZF0pIHsgY29uc29sZS53YXJuKCdNSURJJyxgVW5rbm93biBkZXZpY2Ugd2l0aCBpZCAke2lkfWApOyByZXR1cm4gfVxuXG4gICAgdGhpcy5pbnB1dEluZGV4ID0gcGFyc2VJbnQoaWQpXG4gICAgdGhpcy5pbnB1dERldmljZSgpLm9ubWlkaW1lc3NhZ2UgPSAobXNnKSA9PiB7IHRoaXMucmVjZWl2ZShtc2cpIH1cbiAgICBjb25zb2xlLmxvZygnTUlESScsIGBTZWxlY3QgSW5wdXQgRGV2aWNlOiAke3RoaXMuaW5wdXREZXZpY2UoKS5uYW1lfWApXG4gIH1cblxuICB0aGlzLm91dHB1dERldmljZSA9IGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gdGhpcy5vdXRwdXRzW3RoaXMub3V0cHV0SW5kZXhdXG4gIH1cblxuICB0aGlzLmlucHV0RGV2aWNlID0gZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiB0aGlzLmlucHV0c1t0aGlzLmlucHV0SW5kZXhdXG4gIH1cblxuICB0aGlzLnNlbGVjdE5leHRPdXRwdXQgPSAoKSA9PiB7XG4gICAgdGhpcy5vdXRwdXRJbmRleCA9IHRoaXMub3V0cHV0SW5kZXggPCB0aGlzLm91dHB1dHMubGVuZ3RoID8gdGhpcy5vdXRwdXRJbmRleCArIDEgOiAwXG4gICAgY2xpZW50LnVwZGF0ZSgpXG4gIH1cblxuICB0aGlzLnNlbGVjdE5leHRJbnB1dCA9ICgpID0+IHtcbiAgICBjb25zdCBpZCA9IHRoaXMuaW5wdXRJbmRleCA8IHRoaXMuaW5wdXRzLmxlbmd0aCAtIDEgPyB0aGlzLmlucHV0SW5kZXggKyAxIDogLTFcbiAgICB0aGlzLnNlbGVjdElucHV0KGlkKVxuICAgIGNsaWVudC51cGRhdGUoKVxuICB9XG5cbiAgLy8gU2V0dXBcblxuICB0aGlzLnJlZnJlc2ggPSBmdW5jdGlvbiAoKSB7XG4gICAgaWYgKCFuYXZpZ2F0b3IucmVxdWVzdE1JRElBY2Nlc3MpIHsgcmV0dXJuIH1cbiAgICBuYXZpZ2F0b3IucmVxdWVzdE1JRElBY2Nlc3MoKS50aGVuKHRoaXMuYWNjZXNzLCAoZXJyKSA9PiB7XG4gICAgICBjb25zb2xlLndhcm4oJ05vIE1pZGknLCBlcnIpXG4gICAgfSlcbiAgfVxuXG4gIHRoaXMuYWNjZXNzID0gKG1pZGlBY2Nlc3MpID0+IHtcbiAgICBjb25zdCBvdXRwdXRzID0gbWlkaUFjY2Vzcy5vdXRwdXRzLnZhbHVlcygpXG4gICAgdGhpcy5vdXRwdXRzID0gW11cbiAgICBmb3IgKGxldCBpID0gb3V0cHV0cy5uZXh0KCk7IGkgJiYgIWkuZG9uZTsgaSA9IG91dHB1dHMubmV4dCgpKSB7XG4gICAgICB0aGlzLm91dHB1dHMucHVzaChpLnZhbHVlKVxuICAgIH1cbiAgICB0aGlzLnNlbGVjdE91dHB1dCgwKVxuXG4gICAgY29uc3QgaW5wdXRzID0gbWlkaUFjY2Vzcy5pbnB1dHMudmFsdWVzKClcbiAgICB0aGlzLmlucHV0cyA9IFtdXG4gICAgZm9yIChsZXQgaSA9IGlucHV0cy5uZXh0KCk7IGkgJiYgIWkuZG9uZTsgaSA9IGlucHV0cy5uZXh0KCkpIHtcbiAgICAgIHRoaXMuaW5wdXRzLnB1c2goaS52YWx1ZSlcbiAgICB9XG4gICAgdGhpcy5zZWxlY3RJbnB1dCgtMSlcbiAgfVxuXG4gIC8vIFVJXG5cbiAgdGhpcy50cmFuc3Bvc2UgPSBmdW5jdGlvbiAobiwgbyA9IDMpIHtcbiAgICBpZiAoIXRyYW5zcG9zZVRhYmxlW25dKSB7IHJldHVybiBudWxsIH1cbiAgICBjb25zdCBvY3RhdmUgPSBjbGFtcChwYXJzZUludChvKSArIHBhcnNlSW50KHRyYW5zcG9zZVRhYmxlW25dLmNoYXJBdCgxKSksIDAsIDgpXG4gICAgY29uc3Qgbm90ZSA9IHRyYW5zcG9zZVRhYmxlW25dLmNoYXJBdCgwKVxuICAgIGNvbnN0IHZhbHVlID0gWydDJywgJ2MnLCAnRCcsICdkJywgJ0UnLCAnRicsICdmJywgJ0cnLCAnZycsICdBJywgJ2EnLCAnQiddLmluZGV4T2Yobm90ZSlcbiAgICBjb25zdCBpZCA9IGNsYW1wKChvY3RhdmUgKiAxMikgKyB2YWx1ZSArIDI0LCAwLCAxMjcpXG4gICAgcmV0dXJuIHsgaWQsIHZhbHVlLCBub3RlLCBvY3RhdmUgfVxuICB9XG5cbiAgdGhpcy5jb252ZXJ0ID0gZnVuY3Rpb24gKGlkKSB7XG4gICAgY29uc3Qgbm90ZSA9IFsnQycsICdjJywgJ0QnLCAnZCcsICdFJywgJ0YnLCAnZicsICdHJywgJ2cnLCAnQScsICdhJywgJ0InXVtpZCAlIDEyXVxuICAgIGNvbnN0IG9jdGF2ZSA9IE1hdGguZmxvb3IoaWQgLyAxMikgLSA1XG4gICAgY29uc3QgbmFtZSA9IGAke25vdGV9JHtvY3RhdmV9YFxuICAgIGNvbnN0IGtleSA9IE9iamVjdC52YWx1ZXModHJhbnNwb3NlVGFibGUpLmluZGV4T2YobmFtZSlcbiAgICByZXR1cm4gT2JqZWN0LmtleXModHJhbnNwb3NlVGFibGUpW2tleV1cbiAgfVxuXG4gIHRoaXMudG9TdHJpbmcgPSBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuICFuYXZpZ2F0b3IucmVxdWVzdE1JRElBY2Nlc3MgPyAnTm8gTWlkaSBTdXBwb3J0JyA6IHRoaXMub3V0cHV0RGV2aWNlKCkgPyBgJHt0aGlzLm91dHB1dERldmljZSgpLm5hbWV9YCA6ICdObyBNaWRpIERldmljZSdcbiAgfVxuXG4gIHRoaXMudG9JbnB1dFN0cmluZyA9ICgpID0+IHtcbiAgICByZXR1cm4gIW5hdmlnYXRvci5yZXF1ZXN0TUlESUFjY2VzcyA/ICdObyBNaWRpIFN1cHBvcnQnIDogdGhpcy5pbnB1dERldmljZSgpID8gYCR7dGhpcy5pbnB1dERldmljZSgpLm5hbWV9YCA6ICdObyBJbnB1dCBEZXZpY2UnXG4gIH1cblxuICB0aGlzLnRvT3V0cHV0U3RyaW5nID0gKCkgPT4ge1xuICAgIHJldHVybiAhbmF2aWdhdG9yLnJlcXVlc3RNSURJQWNjZXNzID8gJ05vIE1pZGkgU3VwcG9ydCcgOiB0aGlzLm91dHB1dERldmljZSgpID8gYCR7dGhpcy5vdXRwdXREZXZpY2UoKS5uYW1lfWAgOiAnTm8gT3V0cHV0IERldmljZSdcbiAgfVxuXG4gIHRoaXMubGVuZ3RoID0gZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiB0aGlzLnN0YWNrLmxlbmd0aFxuICB9XG5cbiAgZnVuY3Rpb24gY2xhbXAgKHYsIG1pbiwgbWF4KSB7IHJldHVybiB2IDwgbWluID8gbWluIDogdiA+IG1heCA/IG1heCA6IHYgfVxufVxuXG4vKioqIEVYUE9SVFMgRlJPTSBleHBvcnRzLWxvYWRlciAqKiovXG5leHBvcnQgZGVmYXVsdCBNaWRpO1xuIiwiJ3VzZSBzdHJpY3QnXG5cbmZ1bmN0aW9uIE1vbm8gKGNsaWVudCkge1xuICB0aGlzLnN0YWNrID0ge31cblxuICB0aGlzLnN0YXJ0ID0gZnVuY3Rpb24gKCkge1xuICAgIGNvbnNvbGUuaW5mbygnTWlkaU1vbm8gU3RhcnRpbmcuLicpXG4gIH1cblxuICB0aGlzLmNsZWFyID0gZnVuY3Rpb24gKCkge1xuXG4gIH1cblxuICB0aGlzLnJ1biA9IGZ1bmN0aW9uICgpIHtcbiAgICBmb3IgKGNvbnN0IGlkIGluIHRoaXMuc3RhY2spIHtcbiAgICAgIGlmICh0aGlzLnN0YWNrW2lkXS5sZW5ndGggPCAxKSB7XG4gICAgICAgIHRoaXMucmVsZWFzZSh0aGlzLnN0YWNrW2lkXSwgaWQpXG4gICAgICB9XG4gICAgICBpZiAoIXRoaXMuc3RhY2tbaWRdKSB7IGNvbnRpbnVlIH1cbiAgICAgIGlmICh0aGlzLnN0YWNrW2lkXS5pc1BsYXllZCA9PT0gZmFsc2UpIHtcbiAgICAgICAgdGhpcy5wcmVzcyh0aGlzLnN0YWNrW2lkXSlcbiAgICAgIH1cbiAgICAgIHRoaXMuc3RhY2tbaWRdLmxlbmd0aC0tXG4gICAgfVxuICB9XG5cbiAgdGhpcy5wcmVzcyA9IGZ1bmN0aW9uIChpdGVtKSB7XG4gICAgaWYgKCFpdGVtKSB7IHJldHVybiB9XG4gICAgY2xpZW50LmlvLm1pZGkudHJpZ2dlcihpdGVtLCB0cnVlKVxuICAgIGl0ZW0uaXNQbGF5ZWQgPSB0cnVlXG4gIH1cblxuICB0aGlzLnJlbGVhc2UgPSBmdW5jdGlvbiAoaXRlbSkge1xuICAgIGlmICghaXRlbSkgeyByZXR1cm4gfVxuICAgIGNsaWVudC5pby5taWRpLnRyaWdnZXIoaXRlbSwgZmFsc2UpXG4gICAgZGVsZXRlIHRoaXMuc3RhY2tbaXRlbS5jaGFubmVsXVxuICB9XG5cbiAgdGhpcy5zaWxlbmNlID0gZnVuY3Rpb24gKCkge1xuICAgIGZvciAoY29uc3QgaXRlbSBvZiB0aGlzLnN0YWNrKSB7XG4gICAgICB0aGlzLnJlbGVhc2UoaXRlbSlcbiAgICB9XG4gIH1cblxuICB0aGlzLnB1c2ggPSBmdW5jdGlvbiAoY2hhbm5lbCwgb2N0YXZlLCBub3RlLCB2ZWxvY2l0eSwgbGVuZ3RoLCBpc1BsYXllZCA9IGZhbHNlKSB7XG4gICAgaWYgKHRoaXMuc3RhY2tbY2hhbm5lbF0pIHtcbiAgICAgIHRoaXMucmVsZWFzZSh0aGlzLnN0YWNrW2NoYW5uZWxdKVxuICAgIH1cbiAgICB0aGlzLnN0YWNrW2NoYW5uZWxdID0geyBjaGFubmVsLCBvY3RhdmUsIG5vdGUsIHZlbG9jaXR5LCBsZW5ndGgsIGlzUGxheWVkIH1cbiAgfVxuXG4gIHRoaXMubGVuZ3RoID0gZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiBPYmplY3Qua2V5cyh0aGlzLnN0YWNrKS5sZW5ndGhcbiAgfVxufVxuXG4vKioqIEVYUE9SVFMgRlJPTSBleHBvcnRzLWxvYWRlciAqKiovXG5leHBvcnQgZGVmYXVsdCBNb25vO1xuIiwiJ3VzZSBzdHJpY3QnXG5cbmZ1bmN0aW9uIE9zYyAoY2xpZW50KSB7XG4gIGNvbnN0IG9zYyA9IHJlcXVpcmUoJ25vZGUtb3NjJylcblxuICB0aGlzLnN0YWNrID0gW11cbiAgdGhpcy5zb2NrZXQgPSBudWxsXG4gIHRoaXMucG9ydCA9IG51bGxcbiAgdGhpcy5vcHRpb25zID0geyBkZWZhdWx0OiA0OTE2MiwgdGlkYWxDeWNsZXM6IDYwMTAsIHNvbmljUGk6IDQ1NTksIHN1cGVyQ29sbGlkZXI6IDU3MTIwLCBub3JuczogMTAxMTEgfVxuXG4gIHRoaXMuc3RhcnQgPSBmdW5jdGlvbiAoKSB7XG4gICAgaWYgKCFvc2MpIHsgY29uc29sZS53YXJuKCdPU0MnLCAnQ291bGQgbm90IHN0YXJ0LicpOyByZXR1cm4gfVxuICAgIGNvbnNvbGUuaW5mbygnT1NDJywgJ1N0YXJ0aW5nLi4nKVxuICAgIHRoaXMuc2V0dXAoKVxuICAgIHRoaXMuc2VsZWN0KClcbiAgfVxuXG4gIHRoaXMuY2xlYXIgPSBmdW5jdGlvbiAoKSB7XG4gICAgdGhpcy5zdGFjayA9IFtdXG4gIH1cblxuICB0aGlzLnJ1biA9IGZ1bmN0aW9uICgpIHtcbiAgICBmb3IgKGNvbnN0IGl0ZW0gb2YgdGhpcy5zdGFjaykge1xuICAgICAgdGhpcy5wbGF5KGl0ZW0pXG4gICAgfVxuICB9XG5cbiAgdGhpcy5wdXNoID0gZnVuY3Rpb24gKHBhdGgsIG1zZykge1xuICAgIHRoaXMuc3RhY2sucHVzaCh7IHBhdGgsIG1zZyB9KVxuICB9XG5cbiAgdGhpcy5wbGF5ID0gZnVuY3Rpb24gKHsgcGF0aCwgbXNnIH0pIHtcbiAgICBpZiAoIXRoaXMuc29ja2V0KSB7IGNvbnNvbGUud2FybignT1NDJywgJ1VuYXZhaWxhYmxlIHNvY2tldCcpOyByZXR1cm4gfVxuICAgIGNvbnN0IG9zY01zZyA9IG5ldyBvc2MuTWVzc2FnZShwYXRoKVxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbXNnLmxlbmd0aDsgaSsrKSB7XG4gICAgICBvc2NNc2cuYXBwZW5kKGNsaWVudC5vcmNhLnZhbHVlT2YobXNnLmNoYXJBdChpKSkpXG4gICAgfVxuICAgIHRoaXMuc29ja2V0LnNlbmQob3NjTXNnLCAoZXJyKSA9PiB7XG4gICAgICBpZiAoZXJyKSB7IGNvbnNvbGUud2FybihlcnIpIH1cbiAgICB9KVxuICB9XG5cbiAgdGhpcy5zZWxlY3QgPSBmdW5jdGlvbiAocG9ydCA9IHRoaXMub3B0aW9ucy5kZWZhdWx0KSB7XG4gICAgaWYgKHBhcnNlSW50KHBvcnQpID09PSB0aGlzLnBvcnQpIHsgY29uc29sZS53YXJuKCdPU0MnLCAnQWxyZWFkeSBzZWxlY3RlZCcpOyByZXR1cm4gfVxuICAgIGlmIChpc05hTihwb3J0KSB8fCBwb3J0IDwgMTAwMCkgeyBjb25zb2xlLndhcm4oJ09TQycsICdVbmF2YWlsYWJsZSBwb3J0Jyk7IHJldHVybiB9XG4gICAgY29uc29sZS5pbmZvKCdPU0MnLCBgU2VsZWN0ZWQgcG9ydDogJHtwb3J0fWApXG4gICAgdGhpcy5wb3J0ID0gcGFyc2VJbnQocG9ydClcbiAgICB0aGlzLnNldHVwKClcbiAgfVxuXG4gIHRoaXMuc2V0dXAgPSBmdW5jdGlvbiAoKSB7XG4gICAgaWYgKCF0aGlzLnBvcnQpIHsgcmV0dXJuIH1cbiAgICBpZiAodGhpcy5zb2NrZXQpIHsgdGhpcy5zb2NrZXQuY2xvc2UoKSB9XG4gICAgdGhpcy5zb2NrZXQgPSBuZXcgb3NjLkNsaWVudChjbGllbnQuaW8uaXAsIHRoaXMucG9ydClcbiAgICBjb25zb2xlLmluZm8oJ09TQycsIGBTdGFydGVkIHNvY2tldCBhdCAke2NsaWVudC5pby5pcH06JHt0aGlzLnBvcnR9YClcbiAgfVxufVxuXG4vKioqIEVYUE9SVFMgRlJPTSBleHBvcnRzLWxvYWRlciAqKiovXG5leHBvcnQgZGVmYXVsdCBPc2M7XG4iLCIndXNlIHN0cmljdCdcblxuZnVuY3Rpb24gVWRwIChjbGllbnQpIHtcbiAgY29uc3QgZGdyYW0gPSByZXF1aXJlKCdkZ3JhbScpXG5cbiAgdGhpcy5zdGFjayA9IFtdXG4gIHRoaXMucG9ydCA9IG51bGxcbiAgdGhpcy5zb2NrZXQgPSBkZ3JhbSA/IGRncmFtLmNyZWF0ZVNvY2tldCgndWRwNCcpIDogbnVsbFxuICB0aGlzLmxpc3RlbmVyID0gZGdyYW0gPyBkZ3JhbS5jcmVhdGVTb2NrZXQoJ3VkcDQnKSA6IG51bGxcblxuICB0aGlzLnN0YXJ0ID0gZnVuY3Rpb24gKCkge1xuICAgIGlmICghZGdyYW0gfHwgIXRoaXMuc29ja2V0IHx8ICF0aGlzLmxpc3RlbmVyKSB7IGNvbnNvbGUud2FybignVURQJywgJ0NvdWxkIG5vdCBzdGFydC4nKTsgcmV0dXJuIH1cbiAgICBjb25zb2xlLmluZm8oJ1VEUCcsICdTdGFydGluZy4uJylcblxuICAgIHRoaXMuc2VsZWN0SW5wdXQoKVxuICAgIHRoaXMuc2VsZWN0T3V0cHV0KClcbiAgfVxuXG4gIHRoaXMuY2xlYXIgPSBmdW5jdGlvbiAoKSB7XG4gICAgdGhpcy5zdGFjayA9IFtdXG4gIH1cblxuICB0aGlzLnJ1biA9IGZ1bmN0aW9uICgpIHtcbiAgICBmb3IgKGNvbnN0IGl0ZW0gb2YgdGhpcy5zdGFjaykge1xuICAgICAgdGhpcy5wbGF5KGl0ZW0pXG4gICAgfVxuICB9XG5cbiAgdGhpcy5wdXNoID0gZnVuY3Rpb24gKG1zZykge1xuICAgIHRoaXMuc3RhY2sucHVzaChtc2cpXG4gIH1cblxuICB0aGlzLnBsYXkgPSBmdW5jdGlvbiAoZGF0YSkge1xuICAgIGlmICghdGhpcy5zb2NrZXQpIHsgcmV0dXJuIH1cbiAgICB0aGlzLnNvY2tldC5zZW5kKEJ1ZmZlci5mcm9tKGAke2RhdGF9YCksIHRoaXMucG9ydCwgY2xpZW50LmlvLmlwLCAoZXJyKSA9PiB7XG4gICAgICBpZiAoZXJyKSB7IGNvbnNvbGUud2FybihlcnIpIH1cbiAgICB9KVxuICB9XG5cbiAgdGhpcy5zZWxlY3RPdXRwdXQgPSBmdW5jdGlvbiAocG9ydCA9IDQ5MTYxKSB7XG4gICAgaWYgKCFkZ3JhbSkgeyBjb25zb2xlLndhcm4oJ1VEUCcsICdVbmF2YWlsYWJsZS4nKTsgcmV0dXJuIH1cbiAgICBpZiAocGFyc2VJbnQocG9ydCkgPT09IHRoaXMucG9ydCkgeyBjb25zb2xlLndhcm4oJ1VEUCcsICdBbHJlYWR5IHNlbGVjdGVkJyk7IHJldHVybiB9XG4gICAgaWYgKGlzTmFOKHBvcnQpIHx8IHBvcnQgPCAxMDAwKSB7IGNvbnNvbGUud2FybignVURQJywgJ1VuYXZhaWxhYmxlIHBvcnQnKTsgcmV0dXJuIH1cblxuICAgIGNvbnNvbGUubG9nKCdVRFAnLCBgT3V0cHV0OiAke3BvcnR9YClcbiAgICB0aGlzLnBvcnQgPSBwYXJzZUludChwb3J0KVxuICB9XG5cbiAgdGhpcy5zZWxlY3RJbnB1dCA9IChwb3J0ID0gNDkxNjApID0+IHtcbiAgICBpZiAoIWRncmFtKSB7IGNvbnNvbGUud2FybignVURQJywgJ1VuYXZhaWxhYmxlLicpOyByZXR1cm4gfVxuICAgIGlmICh0aGlzLmxpc3RlbmVyKSB7IHRoaXMubGlzdGVuZXIuY2xvc2UoKSB9XG5cbiAgICBjb25zb2xlLmxvZygnVURQJywgYElucHV0OiAke3BvcnR9YClcbiAgICB0aGlzLmxpc3RlbmVyID0gZGdyYW0uY3JlYXRlU29ja2V0KCd1ZHA0JylcblxuICAgIHRoaXMubGlzdGVuZXIub24oJ21lc3NhZ2UnLCAobXNnLCByaW5mbykgPT4ge1xuICAgICAgY2xpZW50LmNvbW1hbmRlci50cmlnZ2VyKGAke21zZ31gKVxuICAgIH0pXG5cbiAgICB0aGlzLmxpc3RlbmVyLm9uKCdsaXN0ZW5pbmcnLCAoKSA9PiB7XG4gICAgICBjb25zdCBhZGRyZXNzID0gdGhpcy5saXN0ZW5lci5hZGRyZXNzKClcbiAgICAgIGNvbnNvbGUuaW5mbygnVURQJywgYFN0YXJ0ZWQgc29ja2V0IGF0ICR7YWRkcmVzcy5hZGRyZXNzfToke2FkZHJlc3MucG9ydH1gKVxuICAgIH0pXG5cbiAgICB0aGlzLmxpc3RlbmVyLm9uKCdlcnJvcicsIChlcnIpID0+IHtcbiAgICAgIGNvbnNvbGUud2FybignVURQJywgYFNlcnZlciBlcnJvcjpcXG4gJHtlcnIuc3RhY2t9YClcbiAgICAgIHRoaXMubGlzdGVuZXIuY2xvc2UoKVxuICAgIH0pXG5cbiAgICB0aGlzLmxpc3RlbmVyLmJpbmQocG9ydClcbiAgfVxufVxuXG4vKioqIEVYUE9SVFMgRlJPTSBleHBvcnRzLWxvYWRlciAqKiovXG5leHBvcnQgZGVmYXVsdCBVZHA7XG4iLCIvKioqIElNUE9SVFMgRlJPTSBpbXBvcnRzLWxvYWRlciAqKiovXG4ndXNlIHN0cmljdCc7XG5pbXBvcnQgTWlkaSBmcm9tIFwiLi9pby9taWRpLmpzXCI7XG5pbXBvcnQgTWlkaUNDIGZyb20gXCIuL2lvL2NjLmpzXCI7XG5pbXBvcnQgTW9ubyBmcm9tIFwiLi9pby9tb25vLmpzXCI7XG5pbXBvcnQgVWRwIGZyb20gXCIuL2lvL3VkcC5qc1wiO1xuaW1wb3J0IE9zYyBmcm9tIFwiLi9pby9vc2MuanNcIjtcblxuJ3VzZSBzdHJpY3QnXG5cbi8qIGdsb2JhbCBNaWRpICovXG4vKiBnbG9iYWwgTWlkaUNDICovXG4vKiBnbG9iYWwgTW9ubyAqL1xuLyogZ2xvYmFsIFVkcCAqL1xuLyogZ2xvYmFsIE9zYyAqL1xuXG5mdW5jdGlvbiBJTyAoY2xpZW50KSB7XG4gIHRoaXMuaXAgPSAnMTI3LjAuMC4xJ1xuXG4gIHRoaXMubWlkaSA9IG5ldyBNaWRpKGNsaWVudClcbiAgdGhpcy5jYyA9IG5ldyBNaWRpQ0MoY2xpZW50KVxuICB0aGlzLm1vbm8gPSBuZXcgTW9ubyhjbGllbnQpXG4gIHRoaXMudWRwID0gbmV3IFVkcChjbGllbnQpXG4gIHRoaXMub3NjID0gbmV3IE9zYyhjbGllbnQpXG5cbiAgdGhpcy5zdGFydCA9IGZ1bmN0aW9uICgpIHtcbiAgICB0aGlzLm1pZGkuc3RhcnQoKVxuICAgIHRoaXMuY2Muc3RhcnQoKVxuICAgIHRoaXMubW9uby5zdGFydCgpXG4gICAgdGhpcy51ZHAuc3RhcnQoKVxuICAgIHRoaXMub3NjLnN0YXJ0KClcbiAgICB0aGlzLmNsZWFyKClcbiAgfVxuXG4gIHRoaXMuY2xlYXIgPSBmdW5jdGlvbiAoKSB7XG4gICAgdGhpcy5taWRpLmNsZWFyKClcbiAgICB0aGlzLmNjLmNsZWFyKClcbiAgICB0aGlzLm1vbm8uY2xlYXIoKVxuICAgIHRoaXMudWRwLmNsZWFyKClcbiAgICB0aGlzLm9zYy5jbGVhcigpXG4gIH1cblxuICB0aGlzLnJ1biA9IGZ1bmN0aW9uICgpIHtcbiAgICB0aGlzLm1pZGkucnVuKClcbiAgICB0aGlzLmNjLnJ1bigpXG4gICAgdGhpcy5tb25vLnJ1bigpXG4gICAgdGhpcy51ZHAucnVuKClcbiAgICB0aGlzLm9zYy5ydW4oKVxuICB9XG5cbiAgdGhpcy5zaWxlbmNlID0gZnVuY3Rpb24gKCkge1xuICAgIHRoaXMubWlkaS5zaWxlbmNlKClcbiAgICB0aGlzLm1vbm8uc2lsZW5jZSgpXG4gIH1cblxuICB0aGlzLnNldElwID0gZnVuY3Rpb24gKGFkZHIgPSAnMTI3LjAuMC4xJykge1xuICAgIGlmICh2YWxpZGF0ZUlQKGFkZHIpICE9PSB0cnVlICYmIGFkZHIuaW5kZXhPZignLmxvY2FsJykgPT09IC0xKSB7IGNvbnNvbGUud2FybignSU8nLCAnSW52YWxpZCBJUCcpOyByZXR1cm4gfVxuICAgIHRoaXMuaXAgPSBhZGRyXG4gICAgY29uc29sZS5sb2coJ0lPJywgJ1NldCB0YXJnZXQgSVAgdG8gJyArIHRoaXMuaXApXG4gICAgdGhpcy5vc2Muc2V0dXAoKVxuICB9XG5cbiAgdGhpcy5sZW5ndGggPSBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIHRoaXMubWlkaS5sZW5ndGgoKSArIHRoaXMubW9uby5sZW5ndGgoKSArIHRoaXMuY2Muc3RhY2subGVuZ3RoICsgdGhpcy51ZHAuc3RhY2subGVuZ3RoICsgdGhpcy5vc2Muc3RhY2subGVuZ3RoXG4gIH1cblxuICB0aGlzLmluc3BlY3QgPSBmdW5jdGlvbiAobGltaXQgPSBjbGllbnQuZ3JpZC53KSB7XG4gICAgbGV0IHRleHQgPSAnJ1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5sZW5ndGgoKTsgaSsrKSB7XG4gICAgICB0ZXh0ICs9ICd8J1xuICAgIH1cbiAgICByZXR1cm4gZmlsbCh0ZXh0LCBsaW1pdCwgJy4nKVxuICB9XG5cbiAgZnVuY3Rpb24gdmFsaWRhdGVJUCAoYWRkcikgeyByZXR1cm4gISEoL14oMjVbMC01XXwyWzAtNF1bMC05XXxbMDFdP1swLTldWzAtOV0/KVxcLigyNVswLTVdfDJbMC00XVswLTldfFswMV0/WzAtOV1bMC05XT8pXFwuKDI1WzAtNV18MlswLTRdWzAtOV18WzAxXT9bMC05XVswLTldPylcXC4oMjVbMC01XXwyWzAtNF1bMC05XXxbMDFdP1swLTldWzAtOV0/KSQvLnRlc3QoYWRkcikpIH1cbiAgZnVuY3Rpb24gZmlsbCAoc3RyLCBsZW4sIGNocikgeyB3aGlsZSAoc3RyLmxlbmd0aCA8IGxlbikgeyBzdHIgKz0gY2hyIH07IHJldHVybiBzdHIgfVxufVxuXG4vKioqIEVYUE9SVFMgRlJPTSBleHBvcnRzLWxvYWRlciAqKiovXG5leHBvcnQgZGVmYXVsdCBJTztcbiIsIi8qKiogSU1QT1JUUyBGUk9NIGltcG9ydHMtbG9hZGVyICoqKi9cbid1c2Ugc3RyaWN0JztcbmltcG9ydCBPcGVyYXRvciBmcm9tIFwiLi9vcGVyYXRvci5qc1wiO1xuXG4ndXNlIHN0cmljdCdcblxuLyogZ2xvYmFsIE9wZXJhdG9yICovXG4vKiBnbG9iYWwgY2xpZW50ICovXG5cbmNvbnN0IGxpYnJhcnkgPSB7fVxuXG5saWJyYXJ5LmEgPSBmdW5jdGlvbiBPcGVyYXRvckEgKG9yY2EsIHgsIHksIHBhc3NpdmUpIHtcbiAgT3BlcmF0b3IuY2FsbCh0aGlzLCBvcmNhLCB4LCB5LCAnYScsIHBhc3NpdmUpXG5cbiAgdGhpcy5uYW1lID0gJ2FkZCdcbiAgdGhpcy5pbmZvID0gJ091dHB1dHMgc3VtIG9mIGlucHV0cydcblxuICB0aGlzLnBvcnRzLmEgPSB7IHg6IC0xLCB5OiAwIH1cbiAgdGhpcy5wb3J0cy5iID0geyB4OiAxLCB5OiAwIH1cbiAgdGhpcy5wb3J0cy5vdXRwdXQgPSB7IHg6IDAsIHk6IDEsIHNlbnNpdGl2ZTogdHJ1ZSwgb3V0cHV0OiB0cnVlIH1cblxuICB0aGlzLm9wZXJhdGlvbiA9IGZ1bmN0aW9uIChmb3JjZSA9IGZhbHNlKSB7XG4gICAgY29uc3QgYSA9IHRoaXMubGlzdGVuKHRoaXMucG9ydHMuYSwgdHJ1ZSlcbiAgICBjb25zdCBiID0gdGhpcy5saXN0ZW4odGhpcy5wb3J0cy5iLCB0cnVlKVxuICAgIHJldHVybiBvcmNhLmtleU9mKGEgKyBiKVxuICB9XG59XG5cbmxpYnJhcnkuYiA9IGZ1bmN0aW9uIE9wZXJhdG9yTCAob3JjYSwgeCwgeSwgcGFzc2l2ZSkge1xuICBPcGVyYXRvci5jYWxsKHRoaXMsIG9yY2EsIHgsIHksICdiJywgcGFzc2l2ZSlcblxuICB0aGlzLm5hbWUgPSAnc3VidHJhY3QnXG4gIHRoaXMuaW5mbyA9ICdPdXRwdXRzIGRpZmZlcmVuY2Ugb2YgaW5wdXRzJ1xuXG4gIHRoaXMucG9ydHMuYSA9IHsgeDogLTEsIHk6IDAgfVxuICB0aGlzLnBvcnRzLmIgPSB7IHg6IDEsIHk6IDAgfVxuICB0aGlzLnBvcnRzLm91dHB1dCA9IHsgeDogMCwgeTogMSwgc2Vuc2l0aXZlOiB0cnVlLCBvdXRwdXQ6IHRydWUgfVxuXG4gIHRoaXMub3BlcmF0aW9uID0gZnVuY3Rpb24gKGZvcmNlID0gZmFsc2UpIHtcbiAgICBjb25zdCBhID0gdGhpcy5saXN0ZW4odGhpcy5wb3J0cy5hLCB0cnVlKVxuICAgIGNvbnN0IGIgPSB0aGlzLmxpc3Rlbih0aGlzLnBvcnRzLmIsIHRydWUpXG4gICAgcmV0dXJuIG9yY2Eua2V5T2YoTWF0aC5hYnMoYiAtIGEpKVxuICB9XG59XG5cbmxpYnJhcnkuYyA9IGZ1bmN0aW9uIE9wZXJhdG9yQyAob3JjYSwgeCwgeSwgcGFzc2l2ZSkge1xuICBPcGVyYXRvci5jYWxsKHRoaXMsIG9yY2EsIHgsIHksICdjJywgcGFzc2l2ZSlcblxuICB0aGlzLm5hbWUgPSAnY2xvY2snXG4gIHRoaXMuaW5mbyA9ICdPdXRwdXRzIG1vZHVsbyBvZiBmcmFtZSdcblxuICB0aGlzLnBvcnRzLnJhdGUgPSB7IHg6IC0xLCB5OiAwLCBjbGFtcDogeyBtaW46IDEgfSB9XG4gIHRoaXMucG9ydHMubW9kID0geyB4OiAxLCB5OiAwLCBkZWZhdWx0OiAnOCcgfVxuICB0aGlzLnBvcnRzLm91dHB1dCA9IHsgeDogMCwgeTogMSwgc2Vuc2l0aXZlOiB0cnVlLCBvdXRwdXQ6IHRydWUgfVxuXG4gIHRoaXMub3BlcmF0aW9uID0gZnVuY3Rpb24gKGZvcmNlID0gZmFsc2UpIHtcbiAgICBjb25zdCByYXRlID0gdGhpcy5saXN0ZW4odGhpcy5wb3J0cy5yYXRlLCB0cnVlKVxuICAgIGNvbnN0IG1vZCA9IHRoaXMubGlzdGVuKHRoaXMucG9ydHMubW9kLCB0cnVlKVxuICAgIGNvbnN0IHZhbCA9IE1hdGguZmxvb3Iob3JjYS5mIC8gcmF0ZSkgJSBtb2RcbiAgICByZXR1cm4gb3JjYS5rZXlPZih2YWwpXG4gIH1cbn1cblxubGlicmFyeS5kID0gZnVuY3Rpb24gT3BlcmF0b3JEIChvcmNhLCB4LCB5LCBwYXNzaXZlKSB7XG4gIE9wZXJhdG9yLmNhbGwodGhpcywgb3JjYSwgeCwgeSwgJ2QnLCBwYXNzaXZlKVxuXG4gIHRoaXMubmFtZSA9ICdkZWxheSdcbiAgdGhpcy5pbmZvID0gJ0JhbmdzIG9uIG1vZHVsbyBvZiBmcmFtZSdcblxuICB0aGlzLnBvcnRzLnJhdGUgPSB7IHg6IC0xLCB5OiAwLCBjbGFtcDogeyBtaW46IDEgfSB9XG4gIHRoaXMucG9ydHMubW9kID0geyB4OiAxLCB5OiAwLCBkZWZhdWx0OiAnOCcgfVxuICB0aGlzLnBvcnRzLm91dHB1dCA9IHsgeDogMCwgeTogMSwgYmFuZzogdHJ1ZSwgb3V0cHV0OiB0cnVlIH1cblxuICB0aGlzLm9wZXJhdGlvbiA9IGZ1bmN0aW9uIChmb3JjZSA9IGZhbHNlKSB7XG4gICAgY29uc3QgcmF0ZSA9IHRoaXMubGlzdGVuKHRoaXMucG9ydHMucmF0ZSwgdHJ1ZSlcbiAgICBjb25zdCBtb2QgPSB0aGlzLmxpc3Rlbih0aGlzLnBvcnRzLm1vZCwgdHJ1ZSlcbiAgICBjb25zdCByZXMgPSBvcmNhLmYgJSAobW9kICogcmF0ZSlcbiAgICByZXR1cm4gcmVzID09PSAwIHx8IG1vZCA9PT0gMVxuICB9XG59XG5cbmxpYnJhcnkuZSA9IGZ1bmN0aW9uIE9wZXJhdG9yRSAob3JjYSwgeCwgeSwgcGFzc2l2ZSkge1xuICBPcGVyYXRvci5jYWxsKHRoaXMsIG9yY2EsIHgsIHksICdlJywgcGFzc2l2ZSlcblxuICB0aGlzLm5hbWUgPSAnZWFzdCdcbiAgdGhpcy5pbmZvID0gJ01vdmVzIGVhc3R3YXJkLCBvciBiYW5ncydcbiAgdGhpcy5kcmF3ID0gZmFsc2VcblxuICB0aGlzLm9wZXJhdGlvbiA9IGZ1bmN0aW9uICgpIHtcbiAgICB0aGlzLm1vdmUoMSwgMClcbiAgICB0aGlzLnBhc3NpdmUgPSBmYWxzZVxuICB9XG59XG5cbmxpYnJhcnkuZiA9IGZ1bmN0aW9uIE9wZXJhdG9yRiAob3JjYSwgeCwgeSwgcGFzc2l2ZSkge1xuICBPcGVyYXRvci5jYWxsKHRoaXMsIG9yY2EsIHgsIHksICdmJywgcGFzc2l2ZSlcblxuICB0aGlzLm5hbWUgPSAnaWYnXG4gIHRoaXMuaW5mbyA9ICdCYW5ncyBpZiBpbnB1dHMgYXJlIGVxdWFsJ1xuXG4gIHRoaXMucG9ydHMuYSA9IHsgeDogLTEsIHk6IDAgfVxuICB0aGlzLnBvcnRzLmIgPSB7IHg6IDEsIHk6IDAgfVxuICB0aGlzLnBvcnRzLm91dHB1dCA9IHsgeDogMCwgeTogMSwgYmFuZzogdHJ1ZSwgb3V0cHV0OiB0cnVlIH1cblxuICB0aGlzLm9wZXJhdGlvbiA9IGZ1bmN0aW9uIChmb3JjZSA9IGZhbHNlKSB7XG4gICAgY29uc3QgYSA9IHRoaXMubGlzdGVuKHRoaXMucG9ydHMuYSlcbiAgICBjb25zdCBiID0gdGhpcy5saXN0ZW4odGhpcy5wb3J0cy5iKVxuICAgIHJldHVybiBhID09PSBiXG4gIH1cbn1cblxubGlicmFyeS5nID0gZnVuY3Rpb24gT3BlcmF0b3JHIChvcmNhLCB4LCB5LCBwYXNzaXZlKSB7XG4gIE9wZXJhdG9yLmNhbGwodGhpcywgb3JjYSwgeCwgeSwgJ2cnLCBwYXNzaXZlKVxuXG4gIHRoaXMubmFtZSA9ICdnZW5lcmF0b3InXG4gIHRoaXMuaW5mbyA9ICdXcml0ZXMgb3BlcmFuZHMgd2l0aCBvZmZzZXQnXG5cbiAgdGhpcy5wb3J0cy54ID0geyB4OiAtMywgeTogMCB9XG4gIHRoaXMucG9ydHMueSA9IHsgeDogLTIsIHk6IDAgfVxuICB0aGlzLnBvcnRzLmxlbiA9IHsgeDogLTEsIHk6IDAsIGNsYW1wOiB7IG1pbjogMSB9IH1cblxuICB0aGlzLm9wZXJhdGlvbiA9IGZ1bmN0aW9uIChmb3JjZSA9IGZhbHNlKSB7XG4gICAgY29uc3QgbGVuID0gdGhpcy5saXN0ZW4odGhpcy5wb3J0cy5sZW4sIHRydWUpXG4gICAgY29uc3QgeCA9IHRoaXMubGlzdGVuKHRoaXMucG9ydHMueCwgdHJ1ZSlcbiAgICBjb25zdCB5ID0gdGhpcy5saXN0ZW4odGhpcy5wb3J0cy55LCB0cnVlKSArIDFcbiAgICBmb3IgKGxldCBvZmZzZXQgPSAwOyBvZmZzZXQgPCBsZW47IG9mZnNldCsrKSB7XG4gICAgICBjb25zdCBpblBvcnQgPSB7IHg6IG9mZnNldCArIDEsIHk6IDAgfVxuICAgICAgY29uc3Qgb3V0UG9ydCA9IHsgeDogeCArIG9mZnNldCwgeTogeSwgb3V0cHV0OiB0cnVlIH1cbiAgICAgIHRoaXMuYWRkUG9ydChgaW4ke29mZnNldH1gLCBpblBvcnQpXG4gICAgICB0aGlzLmFkZFBvcnQoYG91dCR7b2Zmc2V0fWAsIG91dFBvcnQpXG4gICAgICBjb25zdCByZXMgPSB0aGlzLmxpc3RlbihpblBvcnQpXG4gICAgICB0aGlzLm91dHB1dChgJHtyZXN9YCwgb3V0UG9ydClcbiAgICB9XG4gIH1cbn1cblxubGlicmFyeS5oID0gZnVuY3Rpb24gT3BlcmF0b3JIIChvcmNhLCB4LCB5LCBwYXNzaXZlKSB7XG4gIE9wZXJhdG9yLmNhbGwodGhpcywgb3JjYSwgeCwgeSwgJ2gnLCBwYXNzaXZlKVxuXG4gIHRoaXMubmFtZSA9ICdoYWx0J1xuICB0aGlzLmluZm8gPSAnSGFsdHMgc291dGh3YXJkIG9wZXJhbmQnXG5cbiAgdGhpcy5wb3J0cy5vdXRwdXQgPSB7IHg6IDAsIHk6IDEsIHJlYWRlcjogdHJ1ZSwgb3V0cHV0OiB0cnVlIH1cblxuICB0aGlzLm9wZXJhdGlvbiA9IGZ1bmN0aW9uIChmb3JjZSA9IGZhbHNlKSB7XG4gICAgb3JjYS5sb2NrKHRoaXMueCArIHRoaXMucG9ydHMub3V0cHV0LngsIHRoaXMueSArIHRoaXMucG9ydHMub3V0cHV0LnkpXG4gICAgcmV0dXJuIHRoaXMubGlzdGVuKHRoaXMucG9ydHMub3V0cHV0LCB0cnVlKVxuICB9XG59XG5cbmxpYnJhcnkuaSA9IGZ1bmN0aW9uIE9wZXJhdG9ySSAob3JjYSwgeCwgeSwgcGFzc2l2ZSkge1xuICBPcGVyYXRvci5jYWxsKHRoaXMsIG9yY2EsIHgsIHksICdpJywgcGFzc2l2ZSlcblxuICB0aGlzLm5hbWUgPSAnaW5jcmVtZW50J1xuICB0aGlzLmluZm8gPSAnSW5jcmVtZW50cyBzb3V0aHdhcmQgb3BlcmFuZCdcblxuICB0aGlzLnBvcnRzLnN0ZXAgPSB7IHg6IC0xLCB5OiAwLCBkZWZhdWx0OiAnMScgfVxuICB0aGlzLnBvcnRzLm1vZCA9IHsgeDogMSwgeTogMCB9XG4gIHRoaXMucG9ydHMub3V0cHV0ID0geyB4OiAwLCB5OiAxLCBzZW5zaXRpdmU6IHRydWUsIHJlYWRlcjogdHJ1ZSwgb3V0cHV0OiB0cnVlIH1cblxuICB0aGlzLm9wZXJhdGlvbiA9IGZ1bmN0aW9uIChmb3JjZSA9IGZhbHNlKSB7XG4gICAgY29uc3Qgc3RlcCA9IHRoaXMubGlzdGVuKHRoaXMucG9ydHMuc3RlcCwgdHJ1ZSlcbiAgICBjb25zdCBtb2QgPSB0aGlzLmxpc3Rlbih0aGlzLnBvcnRzLm1vZCwgdHJ1ZSlcbiAgICBjb25zdCB2YWwgPSB0aGlzLmxpc3Rlbih0aGlzLnBvcnRzLm91dHB1dCwgdHJ1ZSlcbiAgICByZXR1cm4gb3JjYS5rZXlPZigodmFsICsgc3RlcCkgJSAobW9kID4gMCA/IG1vZCA6IDM2KSlcbiAgfVxufVxuXG5saWJyYXJ5LmogPSBmdW5jdGlvbiBPcGVyYXRvckogKG9yY2EsIHgsIHksIHBhc3NpdmUpIHtcbiAgT3BlcmF0b3IuY2FsbCh0aGlzLCBvcmNhLCB4LCB5LCAnaicsIHBhc3NpdmUpXG5cbiAgdGhpcy5uYW1lID0gJ2p1bXBlcidcbiAgdGhpcy5pbmZvID0gJ091dHB1dHMgbm9ydGh3YXJkIG9wZXJhbmQnXG5cbiAgdGhpcy5wb3J0cy52YWwgPSB7IHg6IDAsIHk6IC0xIH1cbiAgdGhpcy5wb3J0cy5vdXRwdXQgPSB7IHg6IDAsIHk6IDEsIG91dHB1dDogdHJ1ZSB9XG5cbiAgdGhpcy5vcGVyYXRpb24gPSBmdW5jdGlvbiAoZm9yY2UgPSBmYWxzZSkge1xuICAgIG9yY2EubG9jayh0aGlzLngsIHRoaXMueSArIDEpXG4gICAgcmV0dXJuIHRoaXMubGlzdGVuKHRoaXMucG9ydHMudmFsKVxuICB9XG59XG5cbmxpYnJhcnkuayA9IGZ1bmN0aW9uIE9wZXJhdG9ySyAob3JjYSwgeCwgeSwgcGFzc2l2ZSkge1xuICBPcGVyYXRvci5jYWxsKHRoaXMsIG9yY2EsIHgsIHksICdrJywgcGFzc2l2ZSlcblxuICB0aGlzLm5hbWUgPSAna29ua2F0J1xuICB0aGlzLmluZm8gPSAnUmVhZHMgbXVsdGlwbGUgdmFyaWFibGVzJ1xuXG4gIHRoaXMucG9ydHMubGVuID0geyB4OiAtMSwgeTogMCwgY2xhbXA6IHsgbWluOiAxIH0gfVxuXG4gIHRoaXMub3BlcmF0aW9uID0gZnVuY3Rpb24gKGZvcmNlID0gZmFsc2UpIHtcbiAgICB0aGlzLmxlbiA9IHRoaXMubGlzdGVuKHRoaXMucG9ydHMubGVuLCB0cnVlKVxuICAgIGZvciAobGV0IG9mZnNldCA9IDA7IG9mZnNldCA8IHRoaXMubGVuOyBvZmZzZXQrKykge1xuICAgICAgY29uc3Qga2V5ID0gb3JjYS5nbHlwaEF0KHRoaXMueCArIG9mZnNldCArIDEsIHRoaXMueSlcbiAgICAgIG9yY2EubG9jayh0aGlzLnggKyBvZmZzZXQgKyAxLCB0aGlzLnkpXG4gICAgICBpZiAoa2V5ID09PSAnLicpIHsgY29udGludWUgfVxuICAgICAgY29uc3QgaW5Qb3J0ID0geyB4OiBvZmZzZXQgKyAxLCB5OiAwIH1cbiAgICAgIGNvbnN0IG91dFBvcnQgPSB7IHg6IG9mZnNldCArIDEsIHk6IDEsIG91dHB1dDogdHJ1ZSB9XG4gICAgICB0aGlzLmFkZFBvcnQoYGluJHtvZmZzZXR9YCwgaW5Qb3J0KVxuICAgICAgdGhpcy5hZGRQb3J0KGBvdXQke29mZnNldH1gLCBvdXRQb3J0KVxuICAgICAgY29uc3QgcmVzID0gb3JjYS52YWx1ZUluKGtleSlcbiAgICAgIHRoaXMub3V0cHV0KGAke3Jlc31gLCBvdXRQb3J0KVxuICAgIH1cbiAgfVxufVxuXG5saWJyYXJ5LmwgPSBmdW5jdGlvbiBPcGVyYXRvckwgKG9yY2EsIHgsIHksIHBhc3NpdmUpIHtcbiAgT3BlcmF0b3IuY2FsbCh0aGlzLCBvcmNhLCB4LCB5LCAnbCcsIHBhc3NpdmUpXG5cbiAgdGhpcy5uYW1lID0gJ2xlc3NlcidcbiAgdGhpcy5pbmZvID0gJ091dHB1dHMgc21hbGxlc3QgaW5wdXQnXG5cbiAgdGhpcy5wb3J0cy5hID0geyB4OiAtMSwgeTogMCB9XG4gIHRoaXMucG9ydHMuYiA9IHsgeDogMSwgeTogMCB9XG4gIHRoaXMucG9ydHMub3V0cHV0ID0geyB4OiAwLCB5OiAxLCBzZW5zaXRpdmU6IHRydWUsIG91dHB1dDogdHJ1ZSB9XG5cbiAgdGhpcy5vcGVyYXRpb24gPSBmdW5jdGlvbiAoZm9yY2UgPSBmYWxzZSkge1xuICAgIGNvbnN0IGEgPSB0aGlzLmxpc3Rlbih0aGlzLnBvcnRzLmEpXG4gICAgY29uc3QgYiA9IHRoaXMubGlzdGVuKHRoaXMucG9ydHMuYilcbiAgICByZXR1cm4gYSAhPT0gJy4nICYmIGIgIT09ICcuJyA/IG9yY2Eua2V5T2YoTWF0aC5taW4ob3JjYS52YWx1ZU9mKGEpLCBvcmNhLnZhbHVlT2YoYikpKSA6ICcuJ1xuICB9XG59XG5cbmxpYnJhcnkubSA9IGZ1bmN0aW9uIE9wZXJhdG9yTSAob3JjYSwgeCwgeSwgcGFzc2l2ZSkge1xuICBPcGVyYXRvci5jYWxsKHRoaXMsIG9yY2EsIHgsIHksICdtJywgcGFzc2l2ZSlcblxuICB0aGlzLm5hbWUgPSAnbXVsdGlwbHknXG4gIHRoaXMuaW5mbyA9ICdPdXRwdXRzIHByb2R1Y3Qgb2YgaW5wdXRzJ1xuXG4gIHRoaXMucG9ydHMuYSA9IHsgeDogLTEsIHk6IDAgfVxuICB0aGlzLnBvcnRzLmIgPSB7IHg6IDEsIHk6IDAgfVxuICB0aGlzLnBvcnRzLm91dHB1dCA9IHsgeDogMCwgeTogMSwgc2Vuc2l0aXZlOiB0cnVlLCBvdXRwdXQ6IHRydWUgfVxuXG4gIHRoaXMub3BlcmF0aW9uID0gZnVuY3Rpb24gKGZvcmNlID0gZmFsc2UpIHtcbiAgICBjb25zdCBhID0gdGhpcy5saXN0ZW4odGhpcy5wb3J0cy5hLCB0cnVlKVxuICAgIGNvbnN0IGIgPSB0aGlzLmxpc3Rlbih0aGlzLnBvcnRzLmIsIHRydWUpXG4gICAgcmV0dXJuIG9yY2Eua2V5T2YoYSAqIGIpXG4gIH1cbn1cblxubGlicmFyeS5uID0gZnVuY3Rpb24gT3BlcmF0b3JOIChvcmNhLCB4LCB5LCBwYXNzaXZlKSB7XG4gIE9wZXJhdG9yLmNhbGwodGhpcywgb3JjYSwgeCwgeSwgJ24nLCBwYXNzaXZlKVxuXG4gIHRoaXMubmFtZSA9ICdub3J0aCdcbiAgdGhpcy5pbmZvID0gJ01vdmVzIE5vcnRod2FyZCwgb3IgYmFuZ3MnXG4gIHRoaXMuZHJhdyA9IGZhbHNlXG5cbiAgdGhpcy5vcGVyYXRpb24gPSBmdW5jdGlvbiAoKSB7XG4gICAgdGhpcy5tb3ZlKDAsIC0xKVxuICAgIHRoaXMucGFzc2l2ZSA9IGZhbHNlXG4gIH1cbn1cblxubGlicmFyeS5vID0gZnVuY3Rpb24gT3BlcmF0b3JPIChvcmNhLCB4LCB5LCBwYXNzaXZlKSB7XG4gIE9wZXJhdG9yLmNhbGwodGhpcywgb3JjYSwgeCwgeSwgJ28nLCBwYXNzaXZlKVxuXG4gIHRoaXMubmFtZSA9ICdyZWFkJ1xuICB0aGlzLmluZm8gPSAnUmVhZHMgb3BlcmFuZCB3aXRoIG9mZnNldCdcblxuICB0aGlzLnBvcnRzLnggPSB7IHg6IC0yLCB5OiAwIH1cbiAgdGhpcy5wb3J0cy55ID0geyB4OiAtMSwgeTogMCB9XG4gIHRoaXMucG9ydHMub3V0cHV0ID0geyB4OiAwLCB5OiAxLCBvdXRwdXQ6IHRydWUgfVxuXG4gIHRoaXMub3BlcmF0aW9uID0gZnVuY3Rpb24gKGZvcmNlID0gZmFsc2UpIHtcbiAgICBjb25zdCB4ID0gdGhpcy5saXN0ZW4odGhpcy5wb3J0cy54LCB0cnVlKVxuICAgIGNvbnN0IHkgPSB0aGlzLmxpc3Rlbih0aGlzLnBvcnRzLnksIHRydWUpXG4gICAgdGhpcy5hZGRQb3J0KCdyZWFkJywgeyB4OiB4ICsgMSwgeTogeSB9KVxuICAgIHJldHVybiB0aGlzLmxpc3Rlbih0aGlzLnBvcnRzLnJlYWQpXG4gIH1cbn1cblxubGlicmFyeS5wID0gZnVuY3Rpb24gT3BlcmF0b3JQIChvcmNhLCB4LCB5LCBwYXNzaXZlKSB7XG4gIE9wZXJhdG9yLmNhbGwodGhpcywgb3JjYSwgeCwgeSwgJ3AnLCBwYXNzaXZlKVxuXG4gIHRoaXMubmFtZSA9ICdwdXNoJ1xuICB0aGlzLmluZm8gPSAnV3JpdGVzIGVhc3R3YXJkIG9wZXJhbmQnXG5cbiAgdGhpcy5wb3J0cy5rZXkgPSB7IHg6IC0yLCB5OiAwIH1cbiAgdGhpcy5wb3J0cy5sZW4gPSB7IHg6IC0xLCB5OiAwLCBjbGFtcDogeyBtaW46IDEgfSB9XG4gIHRoaXMucG9ydHMudmFsID0geyB4OiAxLCB5OiAwIH1cblxuICB0aGlzLm9wZXJhdGlvbiA9IGZ1bmN0aW9uIChmb3JjZSA9IGZhbHNlKSB7XG4gICAgY29uc3QgbGVuID0gdGhpcy5saXN0ZW4odGhpcy5wb3J0cy5sZW4sIHRydWUpXG4gICAgY29uc3Qga2V5ID0gdGhpcy5saXN0ZW4odGhpcy5wb3J0cy5rZXksIHRydWUpXG4gICAgZm9yIChsZXQgb2Zmc2V0ID0gMDsgb2Zmc2V0IDwgbGVuOyBvZmZzZXQrKykge1xuICAgICAgb3JjYS5sb2NrKHRoaXMueCArIG9mZnNldCwgdGhpcy55ICsgMSlcbiAgICB9XG4gICAgdGhpcy5wb3J0cy5vdXRwdXQgPSB7IHg6IChrZXkgJSBsZW4pLCB5OiAxLCBvdXRwdXQ6IHRydWUgfVxuICAgIHJldHVybiB0aGlzLmxpc3Rlbih0aGlzLnBvcnRzLnZhbClcbiAgfVxufVxuXG5saWJyYXJ5LnEgPSBmdW5jdGlvbiBPcGVyYXRvclEgKG9yY2EsIHgsIHksIHBhc3NpdmUpIHtcbiAgT3BlcmF0b3IuY2FsbCh0aGlzLCBvcmNhLCB4LCB5LCAncScsIHBhc3NpdmUpXG5cbiAgdGhpcy5uYW1lID0gJ3F1ZXJ5J1xuICB0aGlzLmluZm8gPSAnUmVhZHMgb3BlcmFuZHMgd2l0aCBvZmZzZXQnXG5cbiAgdGhpcy5wb3J0cy54ID0geyB4OiAtMywgeTogMCB9XG4gIHRoaXMucG9ydHMueSA9IHsgeDogLTIsIHk6IDAgfVxuICB0aGlzLnBvcnRzLmxlbiA9IHsgeDogLTEsIHk6IDAsIGNsYW1wOiB7IG1pbjogMSB9IH1cblxuICB0aGlzLm9wZXJhdGlvbiA9IGZ1bmN0aW9uIChmb3JjZSA9IGZhbHNlKSB7XG4gICAgY29uc3QgbGVuID0gdGhpcy5saXN0ZW4odGhpcy5wb3J0cy5sZW4sIHRydWUpXG4gICAgY29uc3QgeCA9IHRoaXMubGlzdGVuKHRoaXMucG9ydHMueCwgdHJ1ZSlcbiAgICBjb25zdCB5ID0gdGhpcy5saXN0ZW4odGhpcy5wb3J0cy55LCB0cnVlKVxuICAgIGZvciAobGV0IG9mZnNldCA9IDA7IG9mZnNldCA8IGxlbjsgb2Zmc2V0KyspIHtcbiAgICAgIGNvbnN0IGluUG9ydCA9IHsgeDogeCArIG9mZnNldCArIDEsIHk6IHkgfVxuICAgICAgY29uc3Qgb3V0UG9ydCA9IHsgeDogb2Zmc2V0IC0gbGVuICsgMSwgeTogMSwgb3V0cHV0OiB0cnVlIH1cbiAgICAgIHRoaXMuYWRkUG9ydChgaW4ke29mZnNldH1gLCBpblBvcnQpXG4gICAgICB0aGlzLmFkZFBvcnQoYG91dCR7b2Zmc2V0fWAsIG91dFBvcnQpXG4gICAgICBjb25zdCByZXMgPSB0aGlzLmxpc3RlbihpblBvcnQpXG4gICAgICB0aGlzLm91dHB1dChgJHtyZXN9YCwgb3V0UG9ydClcbiAgICB9XG4gIH1cbn1cblxubGlicmFyeS5yID0gZnVuY3Rpb24gT3BlcmF0b3JSIChvcmNhLCB4LCB5LCBwYXNzaXZlKSB7XG4gIE9wZXJhdG9yLmNhbGwodGhpcywgb3JjYSwgeCwgeSwgJ3InLCBwYXNzaXZlKVxuXG4gIHRoaXMubmFtZSA9ICdyYW5kb20nXG4gIHRoaXMuaW5mbyA9ICdPdXRwdXRzIHJhbmRvbSB2YWx1ZSdcblxuICB0aGlzLnBvcnRzLm1pbiA9IHsgeDogLTEsIHk6IDAgfVxuICB0aGlzLnBvcnRzLm1heCA9IHsgeDogMSwgeTogMCB9XG4gIHRoaXMucG9ydHMub3V0cHV0ID0geyB4OiAwLCB5OiAxLCBzZW5zaXRpdmU6IHRydWUsIG91dHB1dDogdHJ1ZSB9XG5cbiAgdGhpcy5vcGVyYXRpb24gPSBmdW5jdGlvbiAoZm9yY2UgPSBmYWxzZSkge1xuICAgIGNvbnN0IG1pbiA9IHRoaXMubGlzdGVuKHRoaXMucG9ydHMubWluLCB0cnVlKVxuICAgIGNvbnN0IG1heCA9IHRoaXMubGlzdGVuKHRoaXMucG9ydHMubWF4LCB0cnVlKVxuICAgIGNvbnN0IHZhbCA9IHBhcnNlSW50KChNYXRoLnJhbmRvbSgpICogKChtYXggPiAwID8gbWF4IDogMzYpIC0gbWluKSkgKyBtaW4pXG4gICAgcmV0dXJuIG9yY2Eua2V5T2YodmFsKVxuICB9XG59XG5cbmxpYnJhcnkucyA9IGZ1bmN0aW9uIE9wZXJhdG9yUyAob3JjYSwgeCwgeSwgcGFzc2l2ZSkge1xuICBPcGVyYXRvci5jYWxsKHRoaXMsIG9yY2EsIHgsIHksICdzJywgcGFzc2l2ZSlcblxuICB0aGlzLm5hbWUgPSAnc291dGgnXG4gIHRoaXMuaW5mbyA9ICdNb3ZlcyBzb3V0aHdhcmQsIG9yIGJhbmdzJ1xuICB0aGlzLmRyYXcgPSBmYWxzZVxuXG4gIHRoaXMub3BlcmF0aW9uID0gZnVuY3Rpb24gKCkge1xuICAgIHRoaXMubW92ZSgwLCAxKVxuICAgIHRoaXMucGFzc2l2ZSA9IGZhbHNlXG4gIH1cbn1cblxubGlicmFyeS50ID0gZnVuY3Rpb24gT3BlcmF0b3JUIChvcmNhLCB4LCB5LCBwYXNzaXZlKSB7XG4gIE9wZXJhdG9yLmNhbGwodGhpcywgb3JjYSwgeCwgeSwgJ3QnLCBwYXNzaXZlKVxuXG4gIHRoaXMubmFtZSA9ICd0cmFjaydcbiAgdGhpcy5pbmZvID0gJ1JlYWRzIGVhc3R3YXJkIG9wZXJhbmQnXG5cbiAgdGhpcy5wb3J0cy5rZXkgPSB7IHg6IC0yLCB5OiAwIH1cbiAgdGhpcy5wb3J0cy5sZW4gPSB7IHg6IC0xLCB5OiAwLCBjbGFtcDogeyBtaW46IDEgfSB9XG4gIHRoaXMucG9ydHMub3V0cHV0ID0geyB4OiAwLCB5OiAxLCBvdXRwdXQ6IHRydWUgfVxuXG4gIHRoaXMub3BlcmF0aW9uID0gZnVuY3Rpb24gKGZvcmNlID0gZmFsc2UpIHtcbiAgICBjb25zdCBsZW4gPSB0aGlzLmxpc3Rlbih0aGlzLnBvcnRzLmxlbiwgdHJ1ZSlcbiAgICBjb25zdCBrZXkgPSB0aGlzLmxpc3Rlbih0aGlzLnBvcnRzLmtleSwgdHJ1ZSlcbiAgICBmb3IgKGxldCBvZmZzZXQgPSAwOyBvZmZzZXQgPCBsZW47IG9mZnNldCsrKSB7XG4gICAgICBvcmNhLmxvY2sodGhpcy54ICsgb2Zmc2V0ICsgMSwgdGhpcy55KVxuICAgIH1cbiAgICB0aGlzLnBvcnRzLnZhbCA9IHsgeDogKGtleSAlIGxlbikgKyAxLCB5OiAwIH1cbiAgICByZXR1cm4gdGhpcy5saXN0ZW4odGhpcy5wb3J0cy52YWwpXG4gIH1cbn1cblxubGlicmFyeS51ID0gZnVuY3Rpb24gT3BlcmF0b3JVIChvcmNhLCB4LCB5LCBwYXNzaXZlKSB7XG4gIE9wZXJhdG9yLmNhbGwodGhpcywgb3JjYSwgeCwgeSwgJ3UnLCBwYXNzaXZlKVxuXG4gIHRoaXMubmFtZSA9ICd1Y2xpZCdcbiAgdGhpcy5pbmZvID0gJ0JhbmdzIG9uIEV1Y2xpZGVhbiByaHl0aG0nXG5cbiAgdGhpcy5wb3J0cy5zdGVwID0geyB4OiAtMSwgeTogMCwgY2xhbXA6IHsgbWluOiAwIH0sIGRlZmF1bHQ6ICcxJyB9XG4gIHRoaXMucG9ydHMubWF4ID0geyB4OiAxLCB5OiAwLCBjbGFtcDogeyBtaW46IDEgfSwgZGVmYXVsdDogJzgnIH1cbiAgdGhpcy5wb3J0cy5vdXRwdXQgPSB7IHg6IDAsIHk6IDEsIGJhbmc6IHRydWUsIG91dHB1dDogdHJ1ZSB9XG5cbiAgdGhpcy5vcGVyYXRpb24gPSBmdW5jdGlvbiAoZm9yY2UgPSBmYWxzZSkge1xuICAgIGNvbnN0IHN0ZXAgPSB0aGlzLmxpc3Rlbih0aGlzLnBvcnRzLnN0ZXAsIHRydWUpXG4gICAgY29uc3QgbWF4ID0gdGhpcy5saXN0ZW4odGhpcy5wb3J0cy5tYXgsIHRydWUpXG4gICAgY29uc3QgYnVja2V0ID0gKHN0ZXAgKiAob3JjYS5mICsgbWF4IC0gMSkpICUgbWF4ICsgc3RlcFxuICAgIHJldHVybiBidWNrZXQgPj0gbWF4XG4gIH1cbn1cblxubGlicmFyeS52ID0gZnVuY3Rpb24gT3BlcmF0b3JWIChvcmNhLCB4LCB5LCBwYXNzaXZlKSB7XG4gIE9wZXJhdG9yLmNhbGwodGhpcywgb3JjYSwgeCwgeSwgJ3YnLCBwYXNzaXZlKVxuXG4gIHRoaXMubmFtZSA9ICd2YXJpYWJsZSdcbiAgdGhpcy5pbmZvID0gJ1JlYWRzIGFuZCB3cml0ZXMgdmFyaWFibGUnXG5cbiAgdGhpcy5wb3J0cy53cml0ZSA9IHsgeDogLTEsIHk6IDAgfVxuICB0aGlzLnBvcnRzLnJlYWQgPSB7IHg6IDEsIHk6IDAgfVxuXG4gIHRoaXMub3BlcmF0aW9uID0gZnVuY3Rpb24gKGZvcmNlID0gZmFsc2UpIHtcbiAgICBjb25zdCB3cml0ZSA9IHRoaXMubGlzdGVuKHRoaXMucG9ydHMud3JpdGUpXG4gICAgY29uc3QgcmVhZCA9IHRoaXMubGlzdGVuKHRoaXMucG9ydHMucmVhZClcbiAgICBpZiAod3JpdGUgPT09ICcuJyAmJiByZWFkICE9PSAnLicpIHtcbiAgICAgIHRoaXMuYWRkUG9ydCgnb3V0cHV0JywgeyB4OiAwLCB5OiAxIH0pXG4gICAgfVxuICAgIGlmICh3cml0ZSAhPT0gJy4nKSB7XG4gICAgICBvcmNhLnZhcmlhYmxlc1t3cml0ZV0gPSByZWFkXG4gICAgICByZXR1cm5cbiAgICB9XG4gICAgcmV0dXJuIG9yY2EudmFsdWVJbihyZWFkKVxuICB9XG59XG5cbmxpYnJhcnkudyA9IGZ1bmN0aW9uIE9wZXJhdG9yVyAob3JjYSwgeCwgeSwgcGFzc2l2ZSkge1xuICBPcGVyYXRvci5jYWxsKHRoaXMsIG9yY2EsIHgsIHksICd3JywgcGFzc2l2ZSlcblxuICB0aGlzLm5hbWUgPSAnd2VzdCdcbiAgdGhpcy5pbmZvID0gJ01vdmVzIHdlc3R3YXJkLCBvciBiYW5ncydcbiAgdGhpcy5kcmF3ID0gZmFsc2VcblxuICB0aGlzLm9wZXJhdGlvbiA9IGZ1bmN0aW9uICgpIHtcbiAgICB0aGlzLm1vdmUoLTEsIDApXG4gICAgdGhpcy5wYXNzaXZlID0gZmFsc2VcbiAgfVxufVxuXG5saWJyYXJ5LnggPSBmdW5jdGlvbiBPcGVyYXRvclggKG9yY2EsIHgsIHksIHBhc3NpdmUpIHtcbiAgT3BlcmF0b3IuY2FsbCh0aGlzLCBvcmNhLCB4LCB5LCAneCcsIHBhc3NpdmUpXG5cbiAgdGhpcy5uYW1lID0gJ3dyaXRlJ1xuICB0aGlzLmluZm8gPSAnV3JpdGVzIG9wZXJhbmQgd2l0aCBvZmZzZXQnXG5cbiAgdGhpcy5wb3J0cy54ID0geyB4OiAtMiwgeTogMCB9XG4gIHRoaXMucG9ydHMueSA9IHsgeDogLTEsIHk6IDAgfVxuICB0aGlzLnBvcnRzLnZhbCA9IHsgeDogMSwgeTogMCB9XG5cbiAgdGhpcy5vcGVyYXRpb24gPSBmdW5jdGlvbiAoZm9yY2UgPSBmYWxzZSkge1xuICAgIGNvbnN0IHggPSB0aGlzLmxpc3Rlbih0aGlzLnBvcnRzLngsIHRydWUpXG4gICAgY29uc3QgeSA9IHRoaXMubGlzdGVuKHRoaXMucG9ydHMueSwgdHJ1ZSkgKyAxXG4gICAgdGhpcy5hZGRQb3J0KCdvdXRwdXQnLCB7IHg6IHgsIHk6IHksIG91dHB1dDogdHJ1ZSB9KVxuICAgIHJldHVybiB0aGlzLmxpc3Rlbih0aGlzLnBvcnRzLnZhbClcbiAgfVxufVxuXG5saWJyYXJ5LnkgPSBmdW5jdGlvbiBPcGVyYXRvclkgKG9yY2EsIHgsIHksIHBhc3NpdmUpIHtcbiAgT3BlcmF0b3IuY2FsbCh0aGlzLCBvcmNhLCB4LCB5LCAneScsIHBhc3NpdmUpXG5cbiAgdGhpcy5uYW1lID0gJ2p5bXBlcidcbiAgdGhpcy5pbmZvID0gJ091dHB1dHMgd2VzdHdhcmQgb3BlcmFuZCdcblxuICB0aGlzLnBvcnRzLnZhbCA9IHsgeDogLTEsIHk6IDAgfVxuICB0aGlzLnBvcnRzLm91dHB1dCA9IHsgeDogMSwgeTogMCwgb3V0cHV0OiB0cnVlIH1cblxuICB0aGlzLm9wZXJhdGlvbiA9IGZ1bmN0aW9uIChmb3JjZSA9IGZhbHNlKSB7XG4gICAgb3JjYS5sb2NrKHRoaXMueCArIDEsIHRoaXMueSlcbiAgICByZXR1cm4gdGhpcy5saXN0ZW4odGhpcy5wb3J0cy52YWwpXG4gIH1cbn1cblxubGlicmFyeS56ID0gZnVuY3Rpb24gT3BlcmF0b3JaIChvcmNhLCB4LCB5LCBwYXNzaXZlKSB7XG4gIE9wZXJhdG9yLmNhbGwodGhpcywgb3JjYSwgeCwgeSwgJ3onLCBwYXNzaXZlKVxuXG4gIHRoaXMubmFtZSA9ICdsZXJwJ1xuICB0aGlzLmluZm8gPSAnVHJhbnNpdGlvbnMgb3BlcmFuZCB0byB0YXJnZXQnXG5cbiAgdGhpcy5wb3J0cy5yYXRlID0geyB4OiAtMSwgeTogMCwgZGVmYXVsdDogJzEnIH1cbiAgdGhpcy5wb3J0cy50YXJnZXQgPSB7IHg6IDEsIHk6IDAgfVxuICB0aGlzLnBvcnRzLm91dHB1dCA9IHsgeDogMCwgeTogMSwgc2Vuc2l0aXZlOiB0cnVlLCByZWFkZXI6IHRydWUsIG91dHB1dDogdHJ1ZSB9XG5cbiAgdGhpcy5vcGVyYXRpb24gPSBmdW5jdGlvbiAoZm9yY2UgPSBmYWxzZSkge1xuICAgIGNvbnN0IHJhdGUgPSB0aGlzLmxpc3Rlbih0aGlzLnBvcnRzLnJhdGUsIHRydWUpXG4gICAgY29uc3QgdGFyZ2V0ID0gdGhpcy5saXN0ZW4odGhpcy5wb3J0cy50YXJnZXQsIHRydWUpXG4gICAgY29uc3QgdmFsID0gdGhpcy5saXN0ZW4odGhpcy5wb3J0cy5vdXRwdXQsIHRydWUpXG4gICAgY29uc3QgbW9kID0gdmFsIDw9IHRhcmdldCAtIHJhdGUgPyByYXRlIDogdmFsID49IHRhcmdldCArIHJhdGUgPyAtcmF0ZSA6IHRhcmdldCAtIHZhbFxuICAgIHJldHVybiBvcmNhLmtleU9mKHZhbCArIG1vZClcbiAgfVxufVxuXG4vLyBTcGVjaWFsc1xuXG5saWJyYXJ5WycqJ10gPSBmdW5jdGlvbiBPcGVyYXRvckJhbmcgKG9yY2EsIHgsIHksIHBhc3NpdmUpIHtcbiAgT3BlcmF0b3IuY2FsbCh0aGlzLCBvcmNhLCB4LCB5LCAnKicsIHRydWUpXG5cbiAgdGhpcy5uYW1lID0gJ2JhbmcnXG4gIHRoaXMuaW5mbyA9ICdCYW5ncyBuZWlnaGJvcmluZyBvcGVyYW5kcydcbiAgdGhpcy5kcmF3ID0gZmFsc2VcblxuICB0aGlzLnJ1biA9IGZ1bmN0aW9uIChmb3JjZSA9IGZhbHNlKSB7XG4gICAgdGhpcy5kcmF3ID0gZmFsc2VcbiAgICB0aGlzLmVyYXNlKClcbiAgfVxufVxuXG5saWJyYXJ5WycjJ10gPSBmdW5jdGlvbiBPcGVyYXRvckNvbW1lbnQgKG9yY2EsIHgsIHksIHBhc3NpdmUpIHtcbiAgT3BlcmF0b3IuY2FsbCh0aGlzLCBvcmNhLCB4LCB5LCAnIycsIHRydWUpXG5cbiAgdGhpcy5uYW1lID0gJ2NvbW1lbnQnXG4gIHRoaXMuaW5mbyA9ICdIYWx0cyBsaW5lJ1xuICB0aGlzLmRyYXcgPSBmYWxzZVxuXG4gIHRoaXMub3BlcmF0aW9uID0gZnVuY3Rpb24gKCkge1xuICAgIGZvciAobGV0IHggPSB0aGlzLnggKyAxOyB4IDw9IG9yY2EudzsgeCsrKSB7XG4gICAgICBvcmNhLmxvY2soeCwgdGhpcy55KVxuICAgICAgaWYgKG9yY2EuZ2x5cGhBdCh4LCB0aGlzLnkpID09PSB0aGlzLmdseXBoKSB7IGJyZWFrIH1cbiAgICB9XG4gICAgb3JjYS5sb2NrKHRoaXMueCwgdGhpcy55KVxuICB9XG59XG5cbi8vIElPXG5cbmxpYnJhcnkuJCA9IGZ1bmN0aW9uIE9wZXJhdG9yU2VsZiAob3JjYSwgeCwgeSwgcGFzc2l2ZSkge1xuICBPcGVyYXRvci5jYWxsKHRoaXMsIG9yY2EsIHgsIHksICcqJywgdHJ1ZSlcblxuICB0aGlzLm5hbWUgPSAnc2VsZidcbiAgdGhpcy5pbmZvID0gJ1NlbmRzIE9SQ0EgY29tbWFuZCdcblxuICB0aGlzLnJ1biA9IGZ1bmN0aW9uIChmb3JjZSA9IGZhbHNlKSB7XG4gICAgbGV0IG1zZyA9ICcnXG4gICAgZm9yIChsZXQgeCA9IDE7IHggPD0gMzY7IHgrKykge1xuICAgICAgY29uc3QgZyA9IG9yY2EuZ2x5cGhBdCh0aGlzLnggKyB4LCB0aGlzLnkpXG4gICAgICBvcmNhLmxvY2sodGhpcy54ICsgeCwgdGhpcy55KVxuICAgICAgaWYgKGcgPT09ICcuJykgeyBicmVhayB9XG4gICAgICBtc2cgKz0gZ1xuICAgIH1cblxuICAgIGlmICghdGhpcy5oYXNOZWlnaGJvcignKicpICYmIGZvcmNlID09PSBmYWxzZSkgeyByZXR1cm4gfVxuICAgIGlmIChtc2cgPT09ICcnKSB7IHJldHVybiB9XG5cbiAgICB0aGlzLmRyYXcgPSBmYWxzZVxuICAgIGNsaWVudC5jb21tYW5kZXIudHJpZ2dlcihgJHttc2d9YCwgeyB4LCB5OiB5ICsgMSB9LCBmYWxzZSlcbiAgfVxufVxuXG5saWJyYXJ5Wyc6J10gPSBmdW5jdGlvbiBPcGVyYXRvck1pZGkgKG9yY2EsIHgsIHksIHBhc3NpdmUpIHtcbiAgT3BlcmF0b3IuY2FsbCh0aGlzLCBvcmNhLCB4LCB5LCAnOicsIHRydWUpXG5cbiAgdGhpcy5uYW1lID0gJ21pZGknXG4gIHRoaXMuaW5mbyA9ICdTZW5kcyBNSURJIG5vdGUnXG4gIHRoaXMucG9ydHMuY2hhbm5lbCA9IHsgeDogMSwgeTogMCB9XG4gIHRoaXMucG9ydHMub2N0YXZlID0geyB4OiAyLCB5OiAwLCBjbGFtcDogeyBtaW46IDAsIG1heDogOCB9IH1cbiAgdGhpcy5wb3J0cy5ub3RlID0geyB4OiAzLCB5OiAwIH1cbiAgdGhpcy5wb3J0cy52ZWxvY2l0eSA9IHsgeDogNCwgeTogMCwgZGVmYXVsdDogJ2YnLCBjbGFtcDogeyBtaW46IDAsIG1heDogMTYgfSB9XG4gIHRoaXMucG9ydHMubGVuZ3RoID0geyB4OiA1LCB5OiAwLCBkZWZhdWx0OiAnMScsIGNsYW1wOiB7IG1pbjogMCwgbWF4OiAzMiB9IH1cblxuICB0aGlzLm9wZXJhdGlvbiA9IGZ1bmN0aW9uIChmb3JjZSA9IGZhbHNlKSB7XG4gICAgaWYgKCF0aGlzLmhhc05laWdoYm9yKCcqJykgJiYgZm9yY2UgPT09IGZhbHNlKSB7IHJldHVybiB9XG4gICAgaWYgKHRoaXMubGlzdGVuKHRoaXMucG9ydHMuY2hhbm5lbCkgPT09ICcuJykgeyByZXR1cm4gfVxuICAgIGlmICh0aGlzLmxpc3Rlbih0aGlzLnBvcnRzLm9jdGF2ZSkgPT09ICcuJykgeyByZXR1cm4gfVxuICAgIGlmICh0aGlzLmxpc3Rlbih0aGlzLnBvcnRzLm5vdGUpID09PSAnLicpIHsgcmV0dXJuIH1cbiAgICBpZiAoIWlzTmFOKHRoaXMubGlzdGVuKHRoaXMucG9ydHMubm90ZSkpKSB7IHJldHVybiB9XG5cbiAgICBjb25zdCBjaGFubmVsID0gdGhpcy5saXN0ZW4odGhpcy5wb3J0cy5jaGFubmVsLCB0cnVlKVxuICAgIGlmIChjaGFubmVsID4gMTUpIHsgcmV0dXJuIH1cbiAgICBjb25zdCBvY3RhdmUgPSB0aGlzLmxpc3Rlbih0aGlzLnBvcnRzLm9jdGF2ZSwgdHJ1ZSlcbiAgICBjb25zdCBub3RlID0gdGhpcy5saXN0ZW4odGhpcy5wb3J0cy5ub3RlKVxuICAgIGNvbnN0IHZlbG9jaXR5ID0gdGhpcy5saXN0ZW4odGhpcy5wb3J0cy52ZWxvY2l0eSwgdHJ1ZSlcbiAgICBjb25zdCBsZW5ndGggPSB0aGlzLmxpc3Rlbih0aGlzLnBvcnRzLmxlbmd0aCwgdHJ1ZSlcblxuICAgIGNsaWVudC5pby5taWRpLnB1c2goY2hhbm5lbCwgb2N0YXZlLCBub3RlLCB2ZWxvY2l0eSwgbGVuZ3RoKVxuXG4gICAgaWYgKGZvcmNlID09PSB0cnVlKSB7XG4gICAgICBjbGllbnQuaW8ubWlkaS5ydW4oKVxuICAgIH1cblxuICAgIHRoaXMuZHJhdyA9IGZhbHNlXG4gIH1cbn1cblxubGlicmFyeVsnISddID0gZnVuY3Rpb24gT3BlcmF0b3JDQyAob3JjYSwgeCwgeSkge1xuICBPcGVyYXRvci5jYWxsKHRoaXMsIG9yY2EsIHgsIHksICchJywgdHJ1ZSlcblxuICB0aGlzLm5hbWUgPSAnY2MnXG4gIHRoaXMuaW5mbyA9ICdTZW5kcyBNSURJIGNvbnRyb2wgY2hhbmdlJ1xuICB0aGlzLnBvcnRzLmNoYW5uZWwgPSB7IHg6IDEsIHk6IDAgfVxuICB0aGlzLnBvcnRzLmtub2IgPSB7IHg6IDIsIHk6IDAsIGNsYW1wOiB7IG1pbjogMCB9IH1cbiAgdGhpcy5wb3J0cy52YWx1ZSA9IHsgeDogMywgeTogMCwgY2xhbXA6IHsgbWluOiAwIH0gfVxuXG4gIHRoaXMub3BlcmF0aW9uID0gZnVuY3Rpb24gKGZvcmNlID0gZmFsc2UpIHtcbiAgICBpZiAoIXRoaXMuaGFzTmVpZ2hib3IoJyonKSAmJiBmb3JjZSA9PT0gZmFsc2UpIHsgcmV0dXJuIH1cbiAgICBpZiAodGhpcy5saXN0ZW4odGhpcy5wb3J0cy5jaGFubmVsKSA9PT0gJy4nKSB7IHJldHVybiB9XG4gICAgaWYgKHRoaXMubGlzdGVuKHRoaXMucG9ydHMua25vYikgPT09ICcuJykgeyByZXR1cm4gfVxuXG4gICAgY29uc3QgY2hhbm5lbCA9IHRoaXMubGlzdGVuKHRoaXMucG9ydHMuY2hhbm5lbCwgdHJ1ZSlcbiAgICBpZiAoY2hhbm5lbCA+IDE1KSB7IHJldHVybiB9XG4gICAgY29uc3Qga25vYiA9IHRoaXMubGlzdGVuKHRoaXMucG9ydHMua25vYiwgdHJ1ZSlcbiAgICBjb25zdCByYXdWYWx1ZSA9IHRoaXMubGlzdGVuKHRoaXMucG9ydHMudmFsdWUsIHRydWUpXG4gICAgY29uc3QgdmFsdWUgPSBNYXRoLmNlaWwoKDEyNyAqIHJhd1ZhbHVlKSAvIDM1KVxuXG4gICAgY2xpZW50LmlvLmNjLnN0YWNrLnB1c2goeyBjaGFubmVsLCBrbm9iLCB2YWx1ZSwgdHlwZTogJ2NjJyB9KVxuXG4gICAgdGhpcy5kcmF3ID0gZmFsc2VcblxuICAgIGlmIChmb3JjZSA9PT0gdHJ1ZSkge1xuICAgICAgY2xpZW50LmlvLmNjLnJ1bigpXG4gICAgfVxuICB9XG59XG5cbmxpYnJhcnlbJz8nXSA9IGZ1bmN0aW9uIE9wZXJhdG9yUEIgKG9yY2EsIHgsIHkpIHtcbiAgT3BlcmF0b3IuY2FsbCh0aGlzLCBvcmNhLCB4LCB5LCAnPycsIHRydWUpXG5cbiAgdGhpcy5uYW1lID0gJ3BiJ1xuICB0aGlzLmluZm8gPSAnU2VuZHMgTUlESSBwaXRjaCBiZW5kJ1xuICB0aGlzLnBvcnRzLmNoYW5uZWwgPSB7IHg6IDEsIHk6IDAsIGNsYW1wOiB7IG1pbjogMCwgbWF4OiAxNSB9IH1cbiAgdGhpcy5wb3J0cy5sc2IgPSB7IHg6IDIsIHk6IDAsIGNsYW1wOiB7IG1pbjogMCB9IH1cbiAgdGhpcy5wb3J0cy5tc2IgPSB7IHg6IDMsIHk6IDAsIGNsYW1wOiB7IG1pbjogMCB9IH1cblxuICB0aGlzLm9wZXJhdGlvbiA9IGZ1bmN0aW9uIChmb3JjZSA9IGZhbHNlKSB7XG4gICAgaWYgKCF0aGlzLmhhc05laWdoYm9yKCcqJykgJiYgZm9yY2UgPT09IGZhbHNlKSB7IHJldHVybiB9XG4gICAgaWYgKHRoaXMubGlzdGVuKHRoaXMucG9ydHMuY2hhbm5lbCkgPT09ICcuJykgeyByZXR1cm4gfVxuICAgIGlmICh0aGlzLmxpc3Rlbih0aGlzLnBvcnRzLmxzYikgPT09ICcuJykgeyByZXR1cm4gfVxuXG4gICAgY29uc3QgY2hhbm5lbCA9IHRoaXMubGlzdGVuKHRoaXMucG9ydHMuY2hhbm5lbCwgdHJ1ZSlcbiAgICBjb25zdCByYXdsc2IgPSB0aGlzLmxpc3Rlbih0aGlzLnBvcnRzLmxzYiwgdHJ1ZSlcbiAgICBjb25zdCBsc2IgPSBNYXRoLmNlaWwoKDEyNyAqIHJhd2xzYikgLyAzNSlcbiAgICBjb25zdCByYXdtc2IgPSB0aGlzLmxpc3Rlbih0aGlzLnBvcnRzLm1zYiwgdHJ1ZSlcbiAgICBjb25zdCBtc2IgPSBNYXRoLmNlaWwoKDEyNyAqIHJhd21zYikgLyAzNSlcblxuICAgIGNsaWVudC5pby5jYy5zdGFjay5wdXNoKHsgY2hhbm5lbCwgbHNiLCBtc2IsIHR5cGU6ICdwYicgfSlcblxuICAgIHRoaXMuZHJhdyA9IGZhbHNlXG5cbiAgICBpZiAoZm9yY2UgPT09IHRydWUpIHtcbiAgICAgIGNsaWVudC5pby5jYy5ydW4oKVxuICAgIH1cbiAgfVxufVxuXG5saWJyYXJ5WyclJ10gPSBmdW5jdGlvbiBPcGVyYXRvck1vbm8gKG9yY2EsIHgsIHksIHBhc3NpdmUpIHtcbiAgT3BlcmF0b3IuY2FsbCh0aGlzLCBvcmNhLCB4LCB5LCAnJScsIHRydWUpXG5cbiAgdGhpcy5uYW1lID0gJ21vbm8nXG4gIHRoaXMuaW5mbyA9ICdTZW5kcyBNSURJIG1vbm9waG9uaWMgbm90ZSdcbiAgdGhpcy5wb3J0cy5jaGFubmVsID0geyB4OiAxLCB5OiAwIH1cbiAgdGhpcy5wb3J0cy5vY3RhdmUgPSB7IHg6IDIsIHk6IDAsIGNsYW1wOiB7IG1pbjogMCwgbWF4OiA4IH0gfVxuICB0aGlzLnBvcnRzLm5vdGUgPSB7IHg6IDMsIHk6IDAgfVxuICB0aGlzLnBvcnRzLnZlbG9jaXR5ID0geyB4OiA0LCB5OiAwLCBkZWZhdWx0OiAnZicsIGNsYW1wOiB7IG1pbjogMCwgbWF4OiAxNiB9IH1cbiAgdGhpcy5wb3J0cy5sZW5ndGggPSB7IHg6IDUsIHk6IDAsIGRlZmF1bHQ6ICcxJywgY2xhbXA6IHsgbWluOiAwLCBtYXg6IDMyIH0gfVxuXG4gIHRoaXMub3BlcmF0aW9uID0gZnVuY3Rpb24gKGZvcmNlID0gZmFsc2UpIHtcbiAgICBpZiAoIXRoaXMuaGFzTmVpZ2hib3IoJyonKSAmJiBmb3JjZSA9PT0gZmFsc2UpIHsgcmV0dXJuIH1cbiAgICBpZiAodGhpcy5saXN0ZW4odGhpcy5wb3J0cy5jaGFubmVsKSA9PT0gJy4nKSB7IHJldHVybiB9XG4gICAgaWYgKHRoaXMubGlzdGVuKHRoaXMucG9ydHMub2N0YXZlKSA9PT0gJy4nKSB7IHJldHVybiB9XG4gICAgaWYgKHRoaXMubGlzdGVuKHRoaXMucG9ydHMubm90ZSkgPT09ICcuJykgeyByZXR1cm4gfVxuICAgIGlmICghaXNOYU4odGhpcy5saXN0ZW4odGhpcy5wb3J0cy5ub3RlKSkpIHsgcmV0dXJuIH1cblxuICAgIGNvbnN0IGNoYW5uZWwgPSB0aGlzLmxpc3Rlbih0aGlzLnBvcnRzLmNoYW5uZWwsIHRydWUpXG4gICAgaWYgKGNoYW5uZWwgPiAxNSkgeyByZXR1cm4gfVxuICAgIGNvbnN0IG9jdGF2ZSA9IHRoaXMubGlzdGVuKHRoaXMucG9ydHMub2N0YXZlLCB0cnVlKVxuICAgIGNvbnN0IG5vdGUgPSB0aGlzLmxpc3Rlbih0aGlzLnBvcnRzLm5vdGUpXG4gICAgY29uc3QgdmVsb2NpdHkgPSB0aGlzLmxpc3Rlbih0aGlzLnBvcnRzLnZlbG9jaXR5LCB0cnVlKVxuICAgIGNvbnN0IGxlbmd0aCA9IHRoaXMubGlzdGVuKHRoaXMucG9ydHMubGVuZ3RoLCB0cnVlKVxuXG4gICAgY2xpZW50LmlvLm1vbm8ucHVzaChjaGFubmVsLCBvY3RhdmUsIG5vdGUsIHZlbG9jaXR5LCBsZW5ndGgpXG5cbiAgICBpZiAoZm9yY2UgPT09IHRydWUpIHtcbiAgICAgIGNsaWVudC5pby5tb25vLnJ1bigpXG4gICAgfVxuXG4gICAgdGhpcy5kcmF3ID0gZmFsc2VcbiAgfVxufVxuXG5saWJyYXJ5Wyc9J10gPSBmdW5jdGlvbiBPcGVyYXRvck9zYyAob3JjYSwgeCwgeSwgcGFzc2l2ZSkge1xuICBPcGVyYXRvci5jYWxsKHRoaXMsIG9yY2EsIHgsIHksICc9JywgdHJ1ZSlcblxuICB0aGlzLm5hbWUgPSAnb3NjJ1xuICB0aGlzLmluZm8gPSAnU2VuZHMgT1NDIG1lc3NhZ2UnXG5cbiAgdGhpcy5wb3J0cy5wYXRoID0geyB4OiAxLCB5OiAwIH1cblxuICB0aGlzLm9wZXJhdGlvbiA9IGZ1bmN0aW9uIChmb3JjZSA9IGZhbHNlKSB7XG4gICAgbGV0IG1zZyA9ICcnXG4gICAgZm9yIChsZXQgeCA9IDI7IHggPD0gMzY7IHgrKykge1xuICAgICAgY29uc3QgZyA9IG9yY2EuZ2x5cGhBdCh0aGlzLnggKyB4LCB0aGlzLnkpXG4gICAgICBvcmNhLmxvY2sodGhpcy54ICsgeCwgdGhpcy55KVxuICAgICAgaWYgKGcgPT09ICcuJykgeyBicmVhayB9XG4gICAgICBtc2cgKz0gZ1xuICAgIH1cblxuICAgIGlmICghdGhpcy5oYXNOZWlnaGJvcignKicpICYmIGZvcmNlID09PSBmYWxzZSkgeyByZXR1cm4gfVxuXG4gICAgY29uc3QgcGF0aCA9IHRoaXMubGlzdGVuKHRoaXMucG9ydHMucGF0aClcblxuICAgIGlmICghcGF0aCB8fCBwYXRoID09PSAnLicpIHsgcmV0dXJuIH1cblxuICAgIHRoaXMuZHJhdyA9IGZhbHNlXG4gICAgY2xpZW50LmlvLm9zYy5wdXNoKCcvJyArIHBhdGgsIG1zZylcblxuICAgIGlmIChmb3JjZSA9PT0gdHJ1ZSkge1xuICAgICAgY2xpZW50LmlvLm9zYy5ydW4oKVxuICAgIH1cbiAgfVxufVxuXG5saWJyYXJ5Wyc7J10gPSBmdW5jdGlvbiBPcGVyYXRvclVkcCAob3JjYSwgeCwgeSwgcGFzc2l2ZSkge1xuICBPcGVyYXRvci5jYWxsKHRoaXMsIG9yY2EsIHgsIHksICc7JywgdHJ1ZSlcblxuICB0aGlzLm5hbWUgPSAndWRwJ1xuICB0aGlzLmluZm8gPSAnU2VuZHMgVURQIG1lc3NhZ2UnXG5cbiAgdGhpcy5vcGVyYXRpb24gPSBmdW5jdGlvbiAoZm9yY2UgPSBmYWxzZSkge1xuICAgIGxldCBtc2cgPSAnJ1xuICAgIGZvciAobGV0IHggPSAxOyB4IDw9IDM2OyB4KyspIHtcbiAgICAgIGNvbnN0IGcgPSBvcmNhLmdseXBoQXQodGhpcy54ICsgeCwgdGhpcy55KVxuICAgICAgb3JjYS5sb2NrKHRoaXMueCArIHgsIHRoaXMueSlcbiAgICAgIGlmIChnID09PSAnLicpIHsgYnJlYWsgfVxuICAgICAgbXNnICs9IGdcbiAgICB9XG5cbiAgICBpZiAoIXRoaXMuaGFzTmVpZ2hib3IoJyonKSAmJiBmb3JjZSA9PT0gZmFsc2UpIHsgcmV0dXJuIH1cblxuICAgIHRoaXMuZHJhdyA9IGZhbHNlXG4gICAgY2xpZW50LmlvLnVkcC5wdXNoKG1zZylcblxuICAgIGlmIChmb3JjZSA9PT0gdHJ1ZSkge1xuICAgICAgY2xpZW50LmlvLnVkcC5ydW4oKVxuICAgIH1cbiAgfVxufVxuXG4vLyBBZGQgbnVtYmVyc1xuXG5mb3IgKGxldCBpID0gMDsgaSA8PSA5OyBpKyspIHtcbiAgbGlicmFyeVtgJHtpfWBdID0gZnVuY3Rpb24gT3BlcmF0b3JOdWxsIChvcmNhLCB4LCB5LCBwYXNzaXZlKSB7XG4gICAgT3BlcmF0b3IuY2FsbCh0aGlzLCBvcmNhLCB4LCB5LCAnLicsIGZhbHNlKVxuXG4gICAgdGhpcy5uYW1lID0gJ251bGwnXG4gICAgdGhpcy5pbmZvID0gJ2VtcHR5J1xuXG4gICAgLy8gT3ZlcndyaXRlIHJ1biwgdG8gZGlzYWJsZSBkcmF3LlxuICAgIHRoaXMucnVuID0gZnVuY3Rpb24gKGZvcmNlID0gZmFsc2UpIHtcblxuICAgIH1cbiAgfVxufVxuXG4vKioqIEVYUE9SVFMgRlJPTSBleHBvcnRzLWxvYWRlciAqKiovXG5leHBvcnQgZGVmYXVsdCBsaWJyYXJ5O1xuIiwiJ3VzZSBzdHJpY3QnXG5cbmZ1bmN0aW9uIE9wZXJhdG9yIChvcmNhLCB4LCB5LCBnbHlwaCA9ICcuJywgcGFzc2l2ZSA9IGZhbHNlKSB7XG4gIHRoaXMubmFtZSA9ICd1bmtub3duJ1xuICB0aGlzLnggPSB4XG4gIHRoaXMueSA9IHlcbiAgdGhpcy5wYXNzaXZlID0gcGFzc2l2ZVxuICB0aGlzLmRyYXcgPSBwYXNzaXZlXG4gIHRoaXMuZ2x5cGggPSBwYXNzaXZlID8gZ2x5cGgudG9VcHBlckNhc2UoKSA6IGdseXBoXG4gIHRoaXMuaW5mbyA9ICctLSdcbiAgdGhpcy5wb3J0cyA9IHt9XG5cbiAgLy8gQWN0aW9uc1xuXG4gIHRoaXMubGlzdGVuID0gZnVuY3Rpb24gKHBvcnQsIHRvVmFsdWUgPSBmYWxzZSkge1xuICAgIGlmICghcG9ydCkgeyByZXR1cm4gKHRvVmFsdWUgPyAwIDogJy4nKSB9XG4gICAgY29uc3QgZyA9IG9yY2EuZ2x5cGhBdCh0aGlzLnggKyBwb3J0LngsIHRoaXMueSArIHBvcnQueSlcbiAgICBjb25zdCBnbHlwaCA9IChnID09PSAnLicgfHwgZyA9PT0gJyonKSAmJiBwb3J0LmRlZmF1bHQgPyBwb3J0LmRlZmF1bHQgOiBnXG4gICAgaWYgKHRvVmFsdWUpIHtcbiAgICAgIGNvbnN0IG1pbiA9IHBvcnQuY2xhbXAgJiYgcG9ydC5jbGFtcC5taW4gPyBwb3J0LmNsYW1wLm1pbiA6IDBcbiAgICAgIGNvbnN0IG1heCA9IHBvcnQuY2xhbXAgJiYgcG9ydC5jbGFtcC5tYXggPyBwb3J0LmNsYW1wLm1heCA6IDM2XG4gICAgICByZXR1cm4gY2xhbXAob3JjYS52YWx1ZU9mKGdseXBoKSwgbWluLCBtYXgpXG4gICAgfVxuICAgIHJldHVybiBnbHlwaFxuICB9XG5cbiAgdGhpcy5vdXRwdXQgPSBmdW5jdGlvbiAoZywgcG9ydCA9IHRoaXMucG9ydHMub3V0cHV0KSB7XG4gICAgaWYgKCFwb3J0KSB7IGNvbnNvbGUud2Fybih0aGlzLm5hbWUsICdUcnlpbmcgdG8gb3V0cHV0LCBidXQgbm8gcG9ydCcpOyByZXR1cm4gfVxuICAgIGlmICghZykgeyByZXR1cm4gfVxuICAgIG9yY2Eud3JpdGUodGhpcy54ICsgcG9ydC54LCB0aGlzLnkgKyBwb3J0LnksIHRoaXMuc2hvdWxkVXBwZXJDYXNlKCkgPT09IHRydWUgPyBgJHtnfWAudG9VcHBlckNhc2UoKSA6IGcpXG4gIH1cblxuICB0aGlzLmJhbmcgPSBmdW5jdGlvbiAoYikge1xuICAgIGlmICghdGhpcy5wb3J0cy5vdXRwdXQpIHsgY29uc29sZS53YXJuKHRoaXMubmFtZSwgJ1RyeWluZyB0byBiYW5nLCBidXQgbm8gcG9ydCcpOyByZXR1cm4gfVxuICAgIG9yY2Eud3JpdGUodGhpcy54ICsgdGhpcy5wb3J0cy5vdXRwdXQueCwgdGhpcy55ICsgdGhpcy5wb3J0cy5vdXRwdXQueSwgYiA/ICcqJyA6ICcuJylcbiAgICBvcmNhLmxvY2sodGhpcy54ICsgdGhpcy5wb3J0cy5vdXRwdXQueCwgdGhpcy55ICsgdGhpcy5wb3J0cy5vdXRwdXQueSlcbiAgfVxuXG4gIC8vIFBoYXNlc1xuXG4gIHRoaXMucnVuID0gZnVuY3Rpb24gKGZvcmNlID0gZmFsc2UpIHtcbiAgICAvLyBPcGVyYXRlXG4gICAgY29uc3QgcGF5bG9hZCA9IHRoaXMub3BlcmF0aW9uKGZvcmNlKVxuICAgIC8vIFBlcm1pc3Npb25zXG4gICAgZm9yIChjb25zdCBwb3J0IG9mIE9iamVjdC52YWx1ZXModGhpcy5wb3J0cykpIHtcbiAgICAgIGlmIChwb3J0LmJhbmcpIHsgY29udGludWUgfVxuICAgICAgb3JjYS5sb2NrKHRoaXMueCArIHBvcnQueCwgdGhpcy55ICsgcG9ydC55KVxuICAgIH1cblxuICAgIGlmICh0aGlzLnBvcnRzLm91dHB1dCkge1xuICAgICAgaWYgKHRoaXMucG9ydHMub3V0cHV0LmJhbmcgPT09IHRydWUpIHtcbiAgICAgICAgdGhpcy5iYW5nKHBheWxvYWQpXG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLm91dHB1dChwYXlsb2FkKVxuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHRoaXMub3BlcmF0aW9uID0gZnVuY3Rpb24gKCkge1xuICAgIC8vIFVzZWQgaW4gaW5kaXZpZHVhbCBvcGVyYXRvcnNcbiAgfVxuXG4gIC8vIEhlbHBlcnNcblxuICB0aGlzLmxvY2sgPSBmdW5jdGlvbiAoKSB7XG4gICAgb3JjYS5sb2NrKHRoaXMueCwgdGhpcy55KVxuICB9XG5cbiAgdGhpcy5yZXBsYWNlID0gZnVuY3Rpb24gKGcpIHtcbiAgICBvcmNhLndyaXRlKHRoaXMueCwgdGhpcy55LCBnKVxuICB9XG5cbiAgdGhpcy5lcmFzZSA9IGZ1bmN0aW9uICgpIHtcbiAgICB0aGlzLnJlcGxhY2UoJy4nKVxuICB9XG5cbiAgdGhpcy5leHBsb2RlID0gZnVuY3Rpb24gKCkge1xuICAgIHRoaXMucmVwbGFjZSgnKicpXG4gIH1cblxuICB0aGlzLm1vdmUgPSBmdW5jdGlvbiAoeCwgeSkge1xuICAgIGNvbnN0IG9mZnNldCA9IHsgeDogdGhpcy54ICsgeCwgeTogdGhpcy55ICsgeSB9XG4gICAgaWYgKCFvcmNhLmluQm91bmRzKG9mZnNldC54LCBvZmZzZXQueSkpIHsgdGhpcy5leHBsb2RlKCk7IHJldHVybiB9XG4gICAgY29uc3QgY29sbGlkZXIgPSBvcmNhLmdseXBoQXQob2Zmc2V0LngsIG9mZnNldC55KVxuICAgIGlmIChjb2xsaWRlciAhPT0gJyonICYmIGNvbGxpZGVyICE9PSAnLicpIHsgdGhpcy5leHBsb2RlKCk7IHJldHVybiB9XG4gICAgdGhpcy5lcmFzZSgpXG4gICAgdGhpcy54ICs9IHhcbiAgICB0aGlzLnkgKz0geVxuICAgIHRoaXMucmVwbGFjZSh0aGlzLmdseXBoKVxuICAgIHRoaXMubG9jaygpXG4gIH1cblxuICB0aGlzLmhhc05laWdoYm9yID0gZnVuY3Rpb24gKGcpIHtcbiAgICBpZiAob3JjYS5nbHlwaEF0KHRoaXMueCArIDEsIHRoaXMueSkgPT09IGcpIHsgcmV0dXJuIHRydWUgfVxuICAgIGlmIChvcmNhLmdseXBoQXQodGhpcy54IC0gMSwgdGhpcy55KSA9PT0gZykgeyByZXR1cm4gdHJ1ZSB9XG4gICAgaWYgKG9yY2EuZ2x5cGhBdCh0aGlzLngsIHRoaXMueSArIDEpID09PSBnKSB7IHJldHVybiB0cnVlIH1cbiAgICBpZiAob3JjYS5nbHlwaEF0KHRoaXMueCwgdGhpcy55IC0gMSkgPT09IGcpIHsgcmV0dXJuIHRydWUgfVxuICAgIHJldHVybiBmYWxzZVxuICB9XG5cbiAgLy8gRG9jc1xuXG4gIHRoaXMuYWRkUG9ydCA9IGZ1bmN0aW9uIChuYW1lLCBwb3MpIHtcbiAgICB0aGlzLnBvcnRzW25hbWVdID0gcG9zXG4gIH1cblxuICB0aGlzLmdldFBvcnRzID0gZnVuY3Rpb24gKCkge1xuICAgIGNvbnN0IGEgPSBbXVxuICAgIGlmICh0aGlzLmRyYXcgPT09IHRydWUpIHtcbiAgICAgIGEucHVzaChbdGhpcy54LCB0aGlzLnksIDAsIGAke3RoaXMubmFtZS5jaGFyQXQoMCkudG9VcHBlckNhc2UoKSArIHRoaXMubmFtZS5zdWJzdHJpbmcoMSkudG9Mb3dlckNhc2UoKX1gXSlcbiAgICB9XG4gICAgaWYgKCF0aGlzLnBhc3NpdmUpIHsgcmV0dXJuIGEgfVxuICAgIGZvciAoY29uc3QgaWQgaW4gdGhpcy5wb3J0cykge1xuICAgICAgY29uc3QgcG9ydCA9IHRoaXMucG9ydHNbaWRdXG4gICAgICBjb25zdCB0eXBlID0gcG9ydC5vdXRwdXQgPyAzIDogcG9ydC54IDwgMCB8fCBwb3J0LnkgPCAwID8gMSA6IDJcbiAgICAgIGEucHVzaChbdGhpcy54ICsgcG9ydC54LCB0aGlzLnkgKyBwb3J0LnksIHR5cGUsIGAke3RoaXMuZ2x5cGh9LSR7aWR9YF0pXG4gICAgfVxuICAgIHJldHVybiBhXG4gIH1cblxuICB0aGlzLnNob3VsZFVwcGVyQ2FzZSA9IGZ1bmN0aW9uIChwb3J0cyA9IHRoaXMucG9ydHMpIHtcbiAgICBpZiAoIXRoaXMucG9ydHMub3V0cHV0IHx8ICF0aGlzLnBvcnRzLm91dHB1dC5zZW5zaXRpdmUpIHsgcmV0dXJuIGZhbHNlIH1cbiAgICBjb25zdCB2YWx1ZSA9IHRoaXMubGlzdGVuKHsgeDogMSwgeTogMCB9KVxuICAgIGlmICh2YWx1ZS50b0xvd2VyQ2FzZSgpID09PSB2YWx1ZS50b1VwcGVyQ2FzZSgpKSB7IHJldHVybiBmYWxzZSB9XG4gICAgaWYgKHZhbHVlLnRvVXBwZXJDYXNlKCkgIT09IHZhbHVlKSB7IHJldHVybiBmYWxzZSB9XG4gICAgcmV0dXJuIHRydWVcbiAgfVxuXG4gIC8vIERvY3NcblxuICBmdW5jdGlvbiBjbGFtcCAodiwgbWluLCBtYXgpIHsgcmV0dXJuIHYgPCBtaW4gPyBtaW4gOiB2ID4gbWF4ID8gbWF4IDogdiB9XG59XG5cbi8qKiogRVhQT1JUUyBGUk9NIGV4cG9ydHMtbG9hZGVyICoqKi9cbmV4cG9ydCBkZWZhdWx0IE9wZXJhdG9yO1xuIiwiJ3VzZSBzdHJpY3QnXG5cbmZ1bmN0aW9uIE9yY2EgKGxpYnJhcnkpIHtcbiAgdGhpcy5rZXlzID0gJzAxMjM0NTY3ODlhYmNkZWZnaGlqa2xtbm9wcXJzdHV2d3h5eicuc3BsaXQoJycpXG5cbiAgdGhpcy53ID0gMSAvLyBEZWZhdWx0IFdpZHRoXG4gIHRoaXMuaCA9IDEgLy8gRGVmYXVsdCBIZWlnaHRcbiAgdGhpcy5mID0gMCAvLyBGcmFtZVxuICB0aGlzLnMgPSAnJyAvLyBTdHJpbmdcblxuICB0aGlzLmxvY2tzID0gW11cbiAgdGhpcy5ydW50aW1lID0gW11cbiAgdGhpcy52YXJpYWJsZXMgPSB7fVxuXG4gIHRoaXMucnVuID0gZnVuY3Rpb24gKCkge1xuICAgIHRoaXMucnVudGltZSA9IHRoaXMucGFyc2UoKVxuICAgIHRoaXMub3BlcmF0ZSh0aGlzLnJ1bnRpbWUpXG4gICAgdGhpcy5mICs9IDFcbiAgfVxuXG4gIHRoaXMucmVzZXQgPSBmdW5jdGlvbiAodyA9IHRoaXMudywgaCA9IHRoaXMuaCkge1xuICAgIHRoaXMuZiA9IDBcbiAgICB0aGlzLncgPSB3XG4gICAgdGhpcy5oID0gaFxuICAgIHRoaXMucmVwbGFjZShuZXcgQXJyYXkoKHRoaXMuaCAqIHRoaXMudykgKyAxKS5qb2luKCcuJykpXG4gIH1cblxuICB0aGlzLmxvYWQgPSBmdW5jdGlvbiAodywgaCwgcywgZiA9IDApIHtcbiAgICB0aGlzLncgPSB3XG4gICAgdGhpcy5oID0gaFxuICAgIHRoaXMuZiA9IGZcbiAgICB0aGlzLnJlcGxhY2UodGhpcy5jbGVhbihzKSlcbiAgICByZXR1cm4gdGhpc1xuICB9XG5cbiAgdGhpcy53cml0ZSA9IGZ1bmN0aW9uICh4LCB5LCBnKSB7XG4gICAgaWYgKCFnKSB7IHJldHVybiBmYWxzZSB9XG4gICAgaWYgKGcubGVuZ3RoICE9PSAxKSB7IHJldHVybiBmYWxzZSB9XG4gICAgaWYgKCF0aGlzLmluQm91bmRzKHgsIHkpKSB7IHJldHVybiBmYWxzZSB9XG4gICAgaWYgKHRoaXMuZ2x5cGhBdCh4LCB5KSA9PT0gZykgeyByZXR1cm4gZmFsc2UgfVxuICAgIGNvbnN0IGluZGV4ID0gdGhpcy5pbmRleEF0KHgsIHkpXG4gICAgY29uc3QgZ2x5cGggPSAhdGhpcy5pc0FsbG93ZWQoZykgPyAnLicgOiBnXG4gICAgY29uc3Qgc3RyaW5nID0gdGhpcy5zLnN1YnN0cigwLCBpbmRleCkgKyBnbHlwaCArIHRoaXMucy5zdWJzdHIoaW5kZXggKyAxKVxuICAgIHRoaXMucmVwbGFjZShzdHJpbmcpXG4gICAgcmV0dXJuIHRydWVcbiAgfVxuXG4gIHRoaXMuY2xlYW4gPSAoc3RyKSA9PiB7XG4gICAgcmV0dXJuIGAke3N0cn1gLnJlcGxhY2UoL1xcbi9nLCAnJykudHJpbSgpLnN1YnN0cigwLCB0aGlzLncgKiB0aGlzLmgpLnNwbGl0KCcnKS5tYXAoKGcpID0+IHtcbiAgICAgIHJldHVybiAhdGhpcy5pc0FsbG93ZWQoZykgPyAnLicgOiBnXG4gICAgfSkuam9pbignJylcbiAgfVxuXG4gIHRoaXMucmVwbGFjZSA9IGZ1bmN0aW9uIChzKSB7XG4gICAgdGhpcy5zID0gc1xuICB9XG5cbiAgLy8gT3BlcmF0b3JzXG5cbiAgdGhpcy5wYXJzZSA9IGZ1bmN0aW9uICgpIHtcbiAgICBjb25zdCBhID0gW11cbiAgICBmb3IgKGxldCB5ID0gMDsgeSA8IHRoaXMuaDsgeSsrKSB7XG4gICAgICBmb3IgKGxldCB4ID0gMDsgeCA8IHRoaXMudzsgeCsrKSB7XG4gICAgICAgIGNvbnN0IGcgPSB0aGlzLmdseXBoQXQoeCwgeSlcbiAgICAgICAgaWYgKGcgPT09ICcuJyB8fCAhdGhpcy5pc0FsbG93ZWQoZykpIHsgY29udGludWUgfVxuICAgICAgICBhLnB1c2gobmV3IGxpYnJhcnlbZy50b0xvd2VyQ2FzZSgpXSh0aGlzLCB4LCB5LCBnID09PSBnLnRvVXBwZXJDYXNlKCkpKVxuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gYVxuICB9XG5cbiAgdGhpcy5vcGVyYXRlID0gZnVuY3Rpb24gKG9wZXJhdG9ycykge1xuICAgIHRoaXMucmVsZWFzZSgpXG4gICAgZm9yIChjb25zdCBvcGVyYXRvciBvZiBvcGVyYXRvcnMpIHtcbiAgICAgIGlmICh0aGlzLmxvY2tBdChvcGVyYXRvci54LCBvcGVyYXRvci55KSkgeyBjb250aW51ZSB9XG4gICAgICBpZiAob3BlcmF0b3IucGFzc2l2ZSB8fCBvcGVyYXRvci5oYXNOZWlnaGJvcignKicpKSB7XG4gICAgICAgIG9wZXJhdG9yLnJ1bigpXG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgdGhpcy5ib3VuZHMgPSBmdW5jdGlvbiAoKSB7XG4gICAgbGV0IHcgPSAwXG4gICAgbGV0IGggPSAwXG4gICAgZm9yIChsZXQgeSA9IDA7IHkgPCB0aGlzLmg7IHkrKykge1xuICAgICAgZm9yIChsZXQgeCA9IDA7IHggPCB0aGlzLnc7IHgrKykge1xuICAgICAgICBjb25zdCBnID0gdGhpcy5nbHlwaEF0KHgsIHkpXG4gICAgICAgIGlmIChnICE9PSAnLicpIHtcbiAgICAgICAgICBpZiAoeCA+IHcpIHsgdyA9IHggfVxuICAgICAgICAgIGlmICh5ID4gaCkgeyBoID0geSB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHsgdywgaCB9XG4gIH1cblxuICAvLyBCbG9ja3NcblxuICB0aGlzLmdldEJsb2NrID0gKHgsIHksIHcsIGgpID0+IHtcbiAgICBsZXQgbGluZXMgPSAnJ1xuICAgIGZvciAobGV0IF95ID0geTsgX3kgPCB5ICsgaDsgX3krKykge1xuICAgICAgbGV0IGxpbmUgPSAnJ1xuICAgICAgZm9yIChsZXQgX3ggPSB4OyBfeCA8IHggKyB3OyBfeCsrKSB7XG4gICAgICAgIGxpbmUgKz0gdGhpcy5nbHlwaEF0KF94LCBfeSlcbiAgICAgIH1cbiAgICAgIGxpbmVzICs9IGxpbmUgKyAnXFxuJ1xuICAgIH1cbiAgICByZXR1cm4gbGluZXNcbiAgfVxuXG4gIHRoaXMud3JpdGVCbG9jayA9ICh4LCB5LCBibG9jaywgb3ZlcmxhcCA9IGZhbHNlKSA9PiB7XG4gICAgaWYgKCFibG9jaykgeyByZXR1cm4gfVxuICAgIGNvbnN0IGxpbmVzID0gYmxvY2suc3BsaXQoL1xccj9cXG4vKVxuICAgIGxldCBfeSA9IHlcbiAgICBmb3IgKGNvbnN0IGxpbmUgb2YgbGluZXMpIHtcbiAgICAgIGxldCBfeCA9IHhcbiAgICAgIGZvciAoY29uc3QgeSBpbiBsaW5lKSB7XG4gICAgICAgIGNvbnN0IGdseXBoID0gbGluZVt5XVxuICAgICAgICB0aGlzLndyaXRlKF94LCBfeSwgb3ZlcmxhcCA9PT0gdHJ1ZSAmJiBnbHlwaCA9PT0gJy4nID8gdGhpcy5nbHlwaEF0KF94LCBfeSkgOiBnbHlwaClcbiAgICAgICAgX3grK1xuICAgICAgfVxuICAgICAgX3krK1xuICAgIH1cbiAgfVxuXG4gIC8vIExvY2tzXG5cbiAgdGhpcy5yZWxlYXNlID0gZnVuY3Rpb24gKCkge1xuICAgIHRoaXMubG9ja3MgPSBuZXcgQXJyYXkodGhpcy53ICogdGhpcy5oKVxuICAgIHRoaXMudmFyaWFibGVzID0ge31cbiAgfVxuXG4gIHRoaXMudW5sb2NrID0gZnVuY3Rpb24gKHgsIHkpIHtcbiAgICB0aGlzLmxvY2tzW3RoaXMuaW5kZXhBdCh4LCB5KV0gPSBudWxsXG4gIH1cblxuICB0aGlzLmxvY2sgPSBmdW5jdGlvbiAoeCwgeSkge1xuICAgIGlmICh0aGlzLmxvY2tBdCh4LCB5KSkgeyByZXR1cm4gfVxuICAgIHRoaXMubG9ja3NbdGhpcy5pbmRleEF0KHgsIHkpXSA9IHRydWVcbiAgfVxuXG4gIC8vIEhlbHBlcnNcblxuICB0aGlzLmluQm91bmRzID0gZnVuY3Rpb24gKHgsIHkpIHtcbiAgICByZXR1cm4gTnVtYmVyLmlzSW50ZWdlcih4KSAmJiBOdW1iZXIuaXNJbnRlZ2VyKHkpICYmIHggPj0gMCAmJiB4IDwgdGhpcy53ICYmIHkgPj0gMCAmJiB5IDwgdGhpcy5oXG4gIH1cblxuICB0aGlzLmlzQWxsb3dlZCA9IGZ1bmN0aW9uIChnKSB7XG4gICAgcmV0dXJuIGcgPT09ICcuJyB8fCAhIWxpYnJhcnlbYCR7Z31gLnRvTG93ZXJDYXNlKCldXG4gIH1cblxuICB0aGlzLmlzU3BlY2lhbCA9IGZ1bmN0aW9uIChnKSB7XG4gICAgcmV0dXJuIGcudG9Mb3dlckNhc2UoKSA9PT0gZy50b1VwcGVyQ2FzZSgpICYmIGlzTmFOKGcpXG4gIH1cblxuICB0aGlzLmtleU9mID0gZnVuY3Rpb24gKHZhbCwgdWMgPSBmYWxzZSkge1xuICAgIHJldHVybiB1YyA9PT0gdHJ1ZSA/IHRoaXMua2V5c1t2YWwgJSAzNl0udG9VcHBlckNhc2UoKSA6IHRoaXMua2V5c1t2YWwgJSAzNl1cbiAgfVxuXG4gIHRoaXMudmFsdWVPZiA9IGZ1bmN0aW9uIChnKSB7XG4gICAgcmV0dXJuICFnIHx8IGcgPT09ICcuJyB8fCBnID09PSAnKicgPyAwIDogdGhpcy5rZXlzLmluZGV4T2YoYCR7Z31gLnRvTG93ZXJDYXNlKCkpXG4gIH1cblxuICB0aGlzLmluZGV4QXQgPSBmdW5jdGlvbiAoeCwgeSkge1xuICAgIHJldHVybiB0aGlzLmluQm91bmRzKHgsIHkpID09PSB0cnVlID8geCArICh0aGlzLncgKiB5KSA6IC0xXG4gIH1cblxuICB0aGlzLm9wZXJhdG9yQXQgPSBmdW5jdGlvbiAoeCwgeSkge1xuICAgIHJldHVybiB0aGlzLnJ1bnRpbWUuZmlsdGVyKChpdGVtKSA9PiB7IHJldHVybiBpdGVtLnggPT09IHggJiYgaXRlbS55ID09PSB5IH0pWzBdXG4gIH1cblxuICB0aGlzLnBvc0F0ID0gZnVuY3Rpb24gKGluZGV4KSB7XG4gICAgcmV0dXJuIHsgeDogaW5kZXggJSB0aGlzLncsIHk6IHBhcnNlSW50KGluZGV4IC8gdGhpcy53KSB9XG4gIH1cblxuICB0aGlzLmdseXBoQXQgPSBmdW5jdGlvbiAoeCwgeSkge1xuICAgIHJldHVybiB0aGlzLnMuY2hhckF0KHRoaXMuaW5kZXhBdCh4LCB5KSlcbiAgfVxuXG4gIHRoaXMudmFsdWVBdCA9IGZ1bmN0aW9uICh4LCB5KSB7XG4gICAgcmV0dXJuIHRoaXMudmFsdWVPZih0aGlzLmdseXBoQXQoeCwgeSkpXG4gIH1cblxuICB0aGlzLmxvY2tBdCA9IGZ1bmN0aW9uICh4LCB5KSB7XG4gICAgcmV0dXJuIHRoaXMubG9ja3NbdGhpcy5pbmRleEF0KHgsIHkpXSA9PT0gdHJ1ZVxuICB9XG5cbiAgdGhpcy52YWx1ZUluID0gZnVuY3Rpb24gKGtleSkge1xuICAgIHJldHVybiB0aGlzLnZhcmlhYmxlc1trZXldIHx8ICcuJ1xuICB9XG5cbiAgLy8gVG9vbHNcblxuICB0aGlzLmZvcm1hdCA9ICgpID0+IHtcbiAgICBjb25zdCBhID0gW11cbiAgICBmb3IgKGxldCB5ID0gMDsgeSA8IHRoaXMuaDsgeSsrKSB7XG4gICAgICBhLnB1c2godGhpcy5zLnN1YnN0cih5ICogdGhpcy53LCB0aGlzLncpKVxuICAgIH1cbiAgICByZXR1cm4gYS5yZWR1Y2UoKGFjYywgdmFsKSA9PiB7XG4gICAgICByZXR1cm4gYCR7YWNjfSR7dmFsfVxcbmBcbiAgICB9LCAnJylcbiAgfVxuXG4gIHRoaXMubGVuZ3RoID0gKCkgPT4ge1xuICAgIHJldHVybiB0aGlzLnN0cmlwKCkubGVuZ3RoXG4gIH1cblxuICB0aGlzLnN0cmlwID0gKCkgPT4ge1xuICAgIHJldHVybiB0aGlzLnMucmVwbGFjZSgvW15hLXpBLVowLTkrXSsvZ2ksICcnKS50cmltKClcbiAgfVxuXG4gIHRoaXMudG9TdHJpbmcgPSAoKSA9PiB7XG4gICAgcmV0dXJuIHRoaXMuZm9ybWF0KCkudHJpbSgpXG4gIH1cblxuICB0aGlzLnRvUmVjdCA9IChzdHIgPSB0aGlzLnMpID0+IHtcbiAgICBjb25zdCBsaW5lcyA9IHN0ci50cmltKCkuc3BsaXQoL1xccj9cXG4vKVxuICAgIHJldHVybiB7IHg6IGxpbmVzWzBdLmxlbmd0aCwgeTogbGluZXMubGVuZ3RoIH1cbiAgfVxuXG4gIHRoaXMucmVzZXQoKVxufVxuXG4vKioqIEVYUE9SVFMgRlJPTSBleHBvcnRzLWxvYWRlciAqKiovXG5leHBvcnQgZGVmYXVsdCBPcmNhO1xuIiwiJ3VzZSBzdHJpY3QnXG5cbmNvbnN0IHRyYW5zcG9zZVRhYmxlID0ge1xuICBBOiAnQTAnLFxuICBhOiAnYTAnLFxuICBCOiAnQjAnLFxuICBDOiAnQzAnLFxuICBjOiAnYzAnLFxuICBEOiAnRDAnLFxuICBkOiAnZDAnLFxuICBFOiAnRTAnLFxuICBGOiAnRjAnLFxuICBmOiAnZjAnLFxuICBHOiAnRzAnLFxuICBnOiAnZzAnLFxuICBIOiAnQTAnLFxuICBoOiAnYTAnLFxuICBJOiAnQjAnLFxuICBKOiAnQzEnLFxuICBqOiAnYzEnLFxuICBLOiAnRDEnLFxuICBrOiAnZDEnLFxuICBMOiAnRTEnLFxuICBNOiAnRjEnLFxuICBtOiAnZjEnLFxuICBOOiAnRzEnLFxuICBuOiAnZzEnLFxuICBPOiAnQTEnLFxuICBvOiAnYTEnLFxuICBQOiAnQjEnLFxuICBROiAnQzInLFxuICBxOiAnYzInLFxuICBSOiAnRDInLFxuICByOiAnZDInLFxuICBTOiAnRTInLFxuICBUOiAnRjInLFxuICB0OiAnZjInLFxuICBVOiAnRzInLFxuICB1OiAnZzInLFxuICBWOiAnQTInLFxuICB2OiAnYTInLFxuICBXOiAnQjInLFxuICBYOiAnQzMnLFxuICB4OiAnYzMnLFxuICBZOiAnRDMnLFxuICB5OiAnZDMnLFxuICBaOiAnRTMnLFxuICAvLyBDYXRjaCBlXG4gIGU6ICdGMCcsXG4gIGw6ICdGMScsXG4gIHM6ICdGMicsXG4gIHo6ICdGMycsXG4gIC8vIENhdGNoIGJcbiAgYjogJ0MxJyxcbiAgaTogJ0MxJyxcbiAgcDogJ0MyJyxcbiAgdzogJ0MzJ1xufVxuXG4vKioqIEVYUE9SVFMgRlJPTSBleHBvcnRzLWxvYWRlciAqKiovXG5leHBvcnQgZGVmYXVsdCB0cmFuc3Bvc2VUYWJsZTtcbiIsIi8vIENvcHlyaWdodCAoYykgMjAxMyBQaWVyb3h5IDxwaWVyb3h5QHBpZXJveHkubmV0PlxuLy8gVGhpcyB3b3JrIGlzIGZyZWUuIFlvdSBjYW4gcmVkaXN0cmlidXRlIGl0IGFuZC9vciBtb2RpZnkgaXRcbi8vIHVuZGVyIHRoZSB0ZXJtcyBvZiB0aGUgV1RGUEwsIFZlcnNpb24gMlxuLy8gRm9yIG1vcmUgaW5mb3JtYXRpb24gc2VlIExJQ0VOU0UudHh0IG9yIGh0dHA6Ly93d3cud3RmcGwubmV0L1xuLy9cbi8vIEZvciBtb3JlIGluZm9ybWF0aW9uLCB0aGUgaG9tZSBwYWdlOlxuLy8gaHR0cDovL3BpZXJveHkubmV0L2Jsb2cvcGFnZXMvbHotc3RyaW5nL3Rlc3RpbmcuaHRtbFxuLy9cbi8vIExaLWJhc2VkIGNvbXByZXNzaW9uIGFsZ29yaXRobSwgdmVyc2lvbiAxLjQuNFxudmFyIExaU3RyaW5nID0gKGZ1bmN0aW9uKCkge1xuXG4vLyBwcml2YXRlIHByb3BlcnR5XG52YXIgZiA9IFN0cmluZy5mcm9tQ2hhckNvZGU7XG52YXIga2V5U3RyQmFzZTY0ID0gXCJBQkNERUZHSElKS0xNTk9QUVJTVFVWV1hZWmFiY2RlZmdoaWprbG1ub3BxcnN0dXZ3eHl6MDEyMzQ1Njc4OSsvPVwiO1xudmFyIGtleVN0clVyaVNhZmUgPSBcIkFCQ0RFRkdISUpLTE1OT1BRUlNUVVZXWFlaYWJjZGVmZ2hpamtsbW5vcHFyc3R1dnd4eXowMTIzNDU2Nzg5Ky0kXCI7XG52YXIgYmFzZVJldmVyc2VEaWMgPSB7fTtcblxuZnVuY3Rpb24gZ2V0QmFzZVZhbHVlKGFscGhhYmV0LCBjaGFyYWN0ZXIpIHtcbiAgaWYgKCFiYXNlUmV2ZXJzZURpY1thbHBoYWJldF0pIHtcbiAgICBiYXNlUmV2ZXJzZURpY1thbHBoYWJldF0gPSB7fTtcbiAgICBmb3IgKHZhciBpPTAgOyBpPGFscGhhYmV0Lmxlbmd0aCA7IGkrKykge1xuICAgICAgYmFzZVJldmVyc2VEaWNbYWxwaGFiZXRdW2FscGhhYmV0LmNoYXJBdChpKV0gPSBpO1xuICAgIH1cbiAgfVxuICByZXR1cm4gYmFzZVJldmVyc2VEaWNbYWxwaGFiZXRdW2NoYXJhY3Rlcl07XG59XG5cbnZhciBMWlN0cmluZyA9IHtcbiAgY29tcHJlc3NUb0Jhc2U2NCA6IGZ1bmN0aW9uIChpbnB1dCkge1xuICAgIGlmIChpbnB1dCA9PSBudWxsKSByZXR1cm4gXCJcIjtcbiAgICB2YXIgcmVzID0gTFpTdHJpbmcuX2NvbXByZXNzKGlucHV0LCA2LCBmdW5jdGlvbihhKXtyZXR1cm4ga2V5U3RyQmFzZTY0LmNoYXJBdChhKTt9KTtcbiAgICBzd2l0Y2ggKHJlcy5sZW5ndGggJSA0KSB7IC8vIFRvIHByb2R1Y2UgdmFsaWQgQmFzZTY0XG4gICAgZGVmYXVsdDogLy8gV2hlbiBjb3VsZCB0aGlzIGhhcHBlbiA/XG4gICAgY2FzZSAwIDogcmV0dXJuIHJlcztcbiAgICBjYXNlIDEgOiByZXR1cm4gcmVzK1wiPT09XCI7XG4gICAgY2FzZSAyIDogcmV0dXJuIHJlcytcIj09XCI7XG4gICAgY2FzZSAzIDogcmV0dXJuIHJlcytcIj1cIjtcbiAgICB9XG4gIH0sXG5cbiAgZGVjb21wcmVzc0Zyb21CYXNlNjQgOiBmdW5jdGlvbiAoaW5wdXQpIHtcbiAgICBpZiAoaW5wdXQgPT0gbnVsbCkgcmV0dXJuIFwiXCI7XG4gICAgaWYgKGlucHV0ID09IFwiXCIpIHJldHVybiBudWxsO1xuICAgIHJldHVybiBMWlN0cmluZy5fZGVjb21wcmVzcyhpbnB1dC5sZW5ndGgsIDMyLCBmdW5jdGlvbihpbmRleCkgeyByZXR1cm4gZ2V0QmFzZVZhbHVlKGtleVN0ckJhc2U2NCwgaW5wdXQuY2hhckF0KGluZGV4KSk7IH0pO1xuICB9LFxuXG4gIGNvbXByZXNzVG9VVEYxNiA6IGZ1bmN0aW9uIChpbnB1dCkge1xuICAgIGlmIChpbnB1dCA9PSBudWxsKSByZXR1cm4gXCJcIjtcbiAgICByZXR1cm4gTFpTdHJpbmcuX2NvbXByZXNzKGlucHV0LCAxNSwgZnVuY3Rpb24oYSl7cmV0dXJuIGYoYSszMik7fSkgKyBcIiBcIjtcbiAgfSxcblxuICBkZWNvbXByZXNzRnJvbVVURjE2OiBmdW5jdGlvbiAoY29tcHJlc3NlZCkge1xuICAgIGlmIChjb21wcmVzc2VkID09IG51bGwpIHJldHVybiBcIlwiO1xuICAgIGlmIChjb21wcmVzc2VkID09IFwiXCIpIHJldHVybiBudWxsO1xuICAgIHJldHVybiBMWlN0cmluZy5fZGVjb21wcmVzcyhjb21wcmVzc2VkLmxlbmd0aCwgMTYzODQsIGZ1bmN0aW9uKGluZGV4KSB7IHJldHVybiBjb21wcmVzc2VkLmNoYXJDb2RlQXQoaW5kZXgpIC0gMzI7IH0pO1xuICB9LFxuXG4gIC8vY29tcHJlc3MgaW50byB1aW50OGFycmF5IChVQ1MtMiBiaWcgZW5kaWFuIGZvcm1hdClcbiAgY29tcHJlc3NUb1VpbnQ4QXJyYXk6IGZ1bmN0aW9uICh1bmNvbXByZXNzZWQpIHtcbiAgICB2YXIgY29tcHJlc3NlZCA9IExaU3RyaW5nLmNvbXByZXNzKHVuY29tcHJlc3NlZCk7XG4gICAgdmFyIGJ1Zj1uZXcgVWludDhBcnJheShjb21wcmVzc2VkLmxlbmd0aCoyKTsgLy8gMiBieXRlcyBwZXIgY2hhcmFjdGVyXG5cbiAgICBmb3IgKHZhciBpPTAsIFRvdGFsTGVuPWNvbXByZXNzZWQubGVuZ3RoOyBpPFRvdGFsTGVuOyBpKyspIHtcbiAgICAgIHZhciBjdXJyZW50X3ZhbHVlID0gY29tcHJlc3NlZC5jaGFyQ29kZUF0KGkpO1xuICAgICAgYnVmW2kqMl0gPSBjdXJyZW50X3ZhbHVlID4+PiA4O1xuICAgICAgYnVmW2kqMisxXSA9IGN1cnJlbnRfdmFsdWUgJSAyNTY7XG4gICAgfVxuICAgIHJldHVybiBidWY7XG4gIH0sXG5cbiAgLy9kZWNvbXByZXNzIGZyb20gdWludDhhcnJheSAoVUNTLTIgYmlnIGVuZGlhbiBmb3JtYXQpXG4gIGRlY29tcHJlc3NGcm9tVWludDhBcnJheTpmdW5jdGlvbiAoY29tcHJlc3NlZCkge1xuICAgIGlmIChjb21wcmVzc2VkPT09bnVsbCB8fCBjb21wcmVzc2VkPT09dW5kZWZpbmVkKXtcbiAgICAgICAgcmV0dXJuIExaU3RyaW5nLmRlY29tcHJlc3MoY29tcHJlc3NlZCk7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgdmFyIGJ1Zj1uZXcgQXJyYXkoY29tcHJlc3NlZC5sZW5ndGgvMik7IC8vIDIgYnl0ZXMgcGVyIGNoYXJhY3RlclxuICAgICAgICBmb3IgKHZhciBpPTAsIFRvdGFsTGVuPWJ1Zi5sZW5ndGg7IGk8VG90YWxMZW47IGkrKykge1xuICAgICAgICAgIGJ1ZltpXT1jb21wcmVzc2VkW2kqMl0qMjU2K2NvbXByZXNzZWRbaSoyKzFdO1xuICAgICAgICB9XG5cbiAgICAgICAgdmFyIHJlc3VsdCA9IFtdO1xuICAgICAgICBidWYuZm9yRWFjaChmdW5jdGlvbiAoYykge1xuICAgICAgICAgIHJlc3VsdC5wdXNoKGYoYykpO1xuICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuIExaU3RyaW5nLmRlY29tcHJlc3MocmVzdWx0LmpvaW4oJycpKTtcblxuICAgIH1cblxuICB9LFxuXG5cbiAgLy9jb21wcmVzcyBpbnRvIGEgc3RyaW5nIHRoYXQgaXMgYWxyZWFkeSBVUkkgZW5jb2RlZFxuICBjb21wcmVzc1RvRW5jb2RlZFVSSUNvbXBvbmVudDogZnVuY3Rpb24gKGlucHV0KSB7XG4gICAgaWYgKGlucHV0ID09IG51bGwpIHJldHVybiBcIlwiO1xuICAgIHJldHVybiBMWlN0cmluZy5fY29tcHJlc3MoaW5wdXQsIDYsIGZ1bmN0aW9uKGEpe3JldHVybiBrZXlTdHJVcmlTYWZlLmNoYXJBdChhKTt9KTtcbiAgfSxcblxuICAvL2RlY29tcHJlc3MgZnJvbSBhbiBvdXRwdXQgb2YgY29tcHJlc3NUb0VuY29kZWRVUklDb21wb25lbnRcbiAgZGVjb21wcmVzc0Zyb21FbmNvZGVkVVJJQ29tcG9uZW50OmZ1bmN0aW9uIChpbnB1dCkge1xuICAgIGlmIChpbnB1dCA9PSBudWxsKSByZXR1cm4gXCJcIjtcbiAgICBpZiAoaW5wdXQgPT0gXCJcIikgcmV0dXJuIG51bGw7XG4gICAgaW5wdXQgPSBpbnB1dC5yZXBsYWNlKC8gL2csIFwiK1wiKTtcbiAgICByZXR1cm4gTFpTdHJpbmcuX2RlY29tcHJlc3MoaW5wdXQubGVuZ3RoLCAzMiwgZnVuY3Rpb24oaW5kZXgpIHsgcmV0dXJuIGdldEJhc2VWYWx1ZShrZXlTdHJVcmlTYWZlLCBpbnB1dC5jaGFyQXQoaW5kZXgpKTsgfSk7XG4gIH0sXG5cbiAgY29tcHJlc3M6IGZ1bmN0aW9uICh1bmNvbXByZXNzZWQpIHtcbiAgICByZXR1cm4gTFpTdHJpbmcuX2NvbXByZXNzKHVuY29tcHJlc3NlZCwgMTYsIGZ1bmN0aW9uKGEpe3JldHVybiBmKGEpO30pO1xuICB9LFxuICBfY29tcHJlc3M6IGZ1bmN0aW9uICh1bmNvbXByZXNzZWQsIGJpdHNQZXJDaGFyLCBnZXRDaGFyRnJvbUludCkge1xuICAgIGlmICh1bmNvbXByZXNzZWQgPT0gbnVsbCkgcmV0dXJuIFwiXCI7XG4gICAgdmFyIGksIHZhbHVlLFxuICAgICAgICBjb250ZXh0X2RpY3Rpb25hcnk9IHt9LFxuICAgICAgICBjb250ZXh0X2RpY3Rpb25hcnlUb0NyZWF0ZT0ge30sXG4gICAgICAgIGNvbnRleHRfYz1cIlwiLFxuICAgICAgICBjb250ZXh0X3djPVwiXCIsXG4gICAgICAgIGNvbnRleHRfdz1cIlwiLFxuICAgICAgICBjb250ZXh0X2VubGFyZ2VJbj0gMiwgLy8gQ29tcGVuc2F0ZSBmb3IgdGhlIGZpcnN0IGVudHJ5IHdoaWNoIHNob3VsZCBub3QgY291bnRcbiAgICAgICAgY29udGV4dF9kaWN0U2l6ZT0gMyxcbiAgICAgICAgY29udGV4dF9udW1CaXRzPSAyLFxuICAgICAgICBjb250ZXh0X2RhdGE9W10sXG4gICAgICAgIGNvbnRleHRfZGF0YV92YWw9MCxcbiAgICAgICAgY29udGV4dF9kYXRhX3Bvc2l0aW9uPTAsXG4gICAgICAgIGlpO1xuXG4gICAgZm9yIChpaSA9IDA7IGlpIDwgdW5jb21wcmVzc2VkLmxlbmd0aDsgaWkgKz0gMSkge1xuICAgICAgY29udGV4dF9jID0gdW5jb21wcmVzc2VkLmNoYXJBdChpaSk7XG4gICAgICBpZiAoIU9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChjb250ZXh0X2RpY3Rpb25hcnksY29udGV4dF9jKSkge1xuICAgICAgICBjb250ZXh0X2RpY3Rpb25hcnlbY29udGV4dF9jXSA9IGNvbnRleHRfZGljdFNpemUrKztcbiAgICAgICAgY29udGV4dF9kaWN0aW9uYXJ5VG9DcmVhdGVbY29udGV4dF9jXSA9IHRydWU7XG4gICAgICB9XG5cbiAgICAgIGNvbnRleHRfd2MgPSBjb250ZXh0X3cgKyBjb250ZXh0X2M7XG4gICAgICBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKGNvbnRleHRfZGljdGlvbmFyeSxjb250ZXh0X3djKSkge1xuICAgICAgICBjb250ZXh0X3cgPSBjb250ZXh0X3djO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChjb250ZXh0X2RpY3Rpb25hcnlUb0NyZWF0ZSxjb250ZXh0X3cpKSB7XG4gICAgICAgICAgaWYgKGNvbnRleHRfdy5jaGFyQ29kZUF0KDApPDI1Nikge1xuICAgICAgICAgICAgZm9yIChpPTAgOyBpPGNvbnRleHRfbnVtQml0cyA7IGkrKykge1xuICAgICAgICAgICAgICBjb250ZXh0X2RhdGFfdmFsID0gKGNvbnRleHRfZGF0YV92YWwgPDwgMSk7XG4gICAgICAgICAgICAgIGlmIChjb250ZXh0X2RhdGFfcG9zaXRpb24gPT0gYml0c1BlckNoYXItMSkge1xuICAgICAgICAgICAgICAgIGNvbnRleHRfZGF0YV9wb3NpdGlvbiA9IDA7XG4gICAgICAgICAgICAgICAgY29udGV4dF9kYXRhLnB1c2goZ2V0Q2hhckZyb21JbnQoY29udGV4dF9kYXRhX3ZhbCkpO1xuICAgICAgICAgICAgICAgIGNvbnRleHRfZGF0YV92YWwgPSAwO1xuICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGNvbnRleHRfZGF0YV9wb3NpdGlvbisrO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB2YWx1ZSA9IGNvbnRleHRfdy5jaGFyQ29kZUF0KDApO1xuICAgICAgICAgICAgZm9yIChpPTAgOyBpPDggOyBpKyspIHtcbiAgICAgICAgICAgICAgY29udGV4dF9kYXRhX3ZhbCA9IChjb250ZXh0X2RhdGFfdmFsIDw8IDEpIHwgKHZhbHVlJjEpO1xuICAgICAgICAgICAgICBpZiAoY29udGV4dF9kYXRhX3Bvc2l0aW9uID09IGJpdHNQZXJDaGFyLTEpIHtcbiAgICAgICAgICAgICAgICBjb250ZXh0X2RhdGFfcG9zaXRpb24gPSAwO1xuICAgICAgICAgICAgICAgIGNvbnRleHRfZGF0YS5wdXNoKGdldENoYXJGcm9tSW50KGNvbnRleHRfZGF0YV92YWwpKTtcbiAgICAgICAgICAgICAgICBjb250ZXh0X2RhdGFfdmFsID0gMDtcbiAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBjb250ZXh0X2RhdGFfcG9zaXRpb24rKztcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB2YWx1ZSA9IHZhbHVlID4+IDE7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHZhbHVlID0gMTtcbiAgICAgICAgICAgIGZvciAoaT0wIDsgaTxjb250ZXh0X251bUJpdHMgOyBpKyspIHtcbiAgICAgICAgICAgICAgY29udGV4dF9kYXRhX3ZhbCA9IChjb250ZXh0X2RhdGFfdmFsIDw8IDEpIHwgdmFsdWU7XG4gICAgICAgICAgICAgIGlmIChjb250ZXh0X2RhdGFfcG9zaXRpb24gPT1iaXRzUGVyQ2hhci0xKSB7XG4gICAgICAgICAgICAgICAgY29udGV4dF9kYXRhX3Bvc2l0aW9uID0gMDtcbiAgICAgICAgICAgICAgICBjb250ZXh0X2RhdGEucHVzaChnZXRDaGFyRnJvbUludChjb250ZXh0X2RhdGFfdmFsKSk7XG4gICAgICAgICAgICAgICAgY29udGV4dF9kYXRhX3ZhbCA9IDA7XG4gICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgY29udGV4dF9kYXRhX3Bvc2l0aW9uKys7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgdmFsdWUgPSAwO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdmFsdWUgPSBjb250ZXh0X3cuY2hhckNvZGVBdCgwKTtcbiAgICAgICAgICAgIGZvciAoaT0wIDsgaTwxNiA7IGkrKykge1xuICAgICAgICAgICAgICBjb250ZXh0X2RhdGFfdmFsID0gKGNvbnRleHRfZGF0YV92YWwgPDwgMSkgfCAodmFsdWUmMSk7XG4gICAgICAgICAgICAgIGlmIChjb250ZXh0X2RhdGFfcG9zaXRpb24gPT0gYml0c1BlckNoYXItMSkge1xuICAgICAgICAgICAgICAgIGNvbnRleHRfZGF0YV9wb3NpdGlvbiA9IDA7XG4gICAgICAgICAgICAgICAgY29udGV4dF9kYXRhLnB1c2goZ2V0Q2hhckZyb21JbnQoY29udGV4dF9kYXRhX3ZhbCkpO1xuICAgICAgICAgICAgICAgIGNvbnRleHRfZGF0YV92YWwgPSAwO1xuICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGNvbnRleHRfZGF0YV9wb3NpdGlvbisrO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIHZhbHVlID0gdmFsdWUgPj4gMTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgICAgY29udGV4dF9lbmxhcmdlSW4tLTtcbiAgICAgICAgICBpZiAoY29udGV4dF9lbmxhcmdlSW4gPT0gMCkge1xuICAgICAgICAgICAgY29udGV4dF9lbmxhcmdlSW4gPSBNYXRoLnBvdygyLCBjb250ZXh0X251bUJpdHMpO1xuICAgICAgICAgICAgY29udGV4dF9udW1CaXRzKys7XG4gICAgICAgICAgfVxuICAgICAgICAgIGRlbGV0ZSBjb250ZXh0X2RpY3Rpb25hcnlUb0NyZWF0ZVtjb250ZXh0X3ddO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHZhbHVlID0gY29udGV4dF9kaWN0aW9uYXJ5W2NvbnRleHRfd107XG4gICAgICAgICAgZm9yIChpPTAgOyBpPGNvbnRleHRfbnVtQml0cyA7IGkrKykge1xuICAgICAgICAgICAgY29udGV4dF9kYXRhX3ZhbCA9IChjb250ZXh0X2RhdGFfdmFsIDw8IDEpIHwgKHZhbHVlJjEpO1xuICAgICAgICAgICAgaWYgKGNvbnRleHRfZGF0YV9wb3NpdGlvbiA9PSBiaXRzUGVyQ2hhci0xKSB7XG4gICAgICAgICAgICAgIGNvbnRleHRfZGF0YV9wb3NpdGlvbiA9IDA7XG4gICAgICAgICAgICAgIGNvbnRleHRfZGF0YS5wdXNoKGdldENoYXJGcm9tSW50KGNvbnRleHRfZGF0YV92YWwpKTtcbiAgICAgICAgICAgICAgY29udGV4dF9kYXRhX3ZhbCA9IDA7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICBjb250ZXh0X2RhdGFfcG9zaXRpb24rKztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHZhbHVlID0gdmFsdWUgPj4gMTtcbiAgICAgICAgICB9XG5cblxuICAgICAgICB9XG4gICAgICAgIGNvbnRleHRfZW5sYXJnZUluLS07XG4gICAgICAgIGlmIChjb250ZXh0X2VubGFyZ2VJbiA9PSAwKSB7XG4gICAgICAgICAgY29udGV4dF9lbmxhcmdlSW4gPSBNYXRoLnBvdygyLCBjb250ZXh0X251bUJpdHMpO1xuICAgICAgICAgIGNvbnRleHRfbnVtQml0cysrO1xuICAgICAgICB9XG4gICAgICAgIC8vIEFkZCB3YyB0byB0aGUgZGljdGlvbmFyeS5cbiAgICAgICAgY29udGV4dF9kaWN0aW9uYXJ5W2NvbnRleHRfd2NdID0gY29udGV4dF9kaWN0U2l6ZSsrO1xuICAgICAgICBjb250ZXh0X3cgPSBTdHJpbmcoY29udGV4dF9jKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBPdXRwdXQgdGhlIGNvZGUgZm9yIHcuXG4gICAgaWYgKGNvbnRleHRfdyAhPT0gXCJcIikge1xuICAgICAgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChjb250ZXh0X2RpY3Rpb25hcnlUb0NyZWF0ZSxjb250ZXh0X3cpKSB7XG4gICAgICAgIGlmIChjb250ZXh0X3cuY2hhckNvZGVBdCgwKTwyNTYpIHtcbiAgICAgICAgICBmb3IgKGk9MCA7IGk8Y29udGV4dF9udW1CaXRzIDsgaSsrKSB7XG4gICAgICAgICAgICBjb250ZXh0X2RhdGFfdmFsID0gKGNvbnRleHRfZGF0YV92YWwgPDwgMSk7XG4gICAgICAgICAgICBpZiAoY29udGV4dF9kYXRhX3Bvc2l0aW9uID09IGJpdHNQZXJDaGFyLTEpIHtcbiAgICAgICAgICAgICAgY29udGV4dF9kYXRhX3Bvc2l0aW9uID0gMDtcbiAgICAgICAgICAgICAgY29udGV4dF9kYXRhLnB1c2goZ2V0Q2hhckZyb21JbnQoY29udGV4dF9kYXRhX3ZhbCkpO1xuICAgICAgICAgICAgICBjb250ZXh0X2RhdGFfdmFsID0gMDtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIGNvbnRleHRfZGF0YV9wb3NpdGlvbisrO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgICB2YWx1ZSA9IGNvbnRleHRfdy5jaGFyQ29kZUF0KDApO1xuICAgICAgICAgIGZvciAoaT0wIDsgaTw4IDsgaSsrKSB7XG4gICAgICAgICAgICBjb250ZXh0X2RhdGFfdmFsID0gKGNvbnRleHRfZGF0YV92YWwgPDwgMSkgfCAodmFsdWUmMSk7XG4gICAgICAgICAgICBpZiAoY29udGV4dF9kYXRhX3Bvc2l0aW9uID09IGJpdHNQZXJDaGFyLTEpIHtcbiAgICAgICAgICAgICAgY29udGV4dF9kYXRhX3Bvc2l0aW9uID0gMDtcbiAgICAgICAgICAgICAgY29udGV4dF9kYXRhLnB1c2goZ2V0Q2hhckZyb21JbnQoY29udGV4dF9kYXRhX3ZhbCkpO1xuICAgICAgICAgICAgICBjb250ZXh0X2RhdGFfdmFsID0gMDtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIGNvbnRleHRfZGF0YV9wb3NpdGlvbisrO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdmFsdWUgPSB2YWx1ZSA+PiAxO1xuICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB2YWx1ZSA9IDE7XG4gICAgICAgICAgZm9yIChpPTAgOyBpPGNvbnRleHRfbnVtQml0cyA7IGkrKykge1xuICAgICAgICAgICAgY29udGV4dF9kYXRhX3ZhbCA9IChjb250ZXh0X2RhdGFfdmFsIDw8IDEpIHwgdmFsdWU7XG4gICAgICAgICAgICBpZiAoY29udGV4dF9kYXRhX3Bvc2l0aW9uID09IGJpdHNQZXJDaGFyLTEpIHtcbiAgICAgICAgICAgICAgY29udGV4dF9kYXRhX3Bvc2l0aW9uID0gMDtcbiAgICAgICAgICAgICAgY29udGV4dF9kYXRhLnB1c2goZ2V0Q2hhckZyb21JbnQoY29udGV4dF9kYXRhX3ZhbCkpO1xuICAgICAgICAgICAgICBjb250ZXh0X2RhdGFfdmFsID0gMDtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIGNvbnRleHRfZGF0YV9wb3NpdGlvbisrO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdmFsdWUgPSAwO1xuICAgICAgICAgIH1cbiAgICAgICAgICB2YWx1ZSA9IGNvbnRleHRfdy5jaGFyQ29kZUF0KDApO1xuICAgICAgICAgIGZvciAoaT0wIDsgaTwxNiA7IGkrKykge1xuICAgICAgICAgICAgY29udGV4dF9kYXRhX3ZhbCA9IChjb250ZXh0X2RhdGFfdmFsIDw8IDEpIHwgKHZhbHVlJjEpO1xuICAgICAgICAgICAgaWYgKGNvbnRleHRfZGF0YV9wb3NpdGlvbiA9PSBiaXRzUGVyQ2hhci0xKSB7XG4gICAgICAgICAgICAgIGNvbnRleHRfZGF0YV9wb3NpdGlvbiA9IDA7XG4gICAgICAgICAgICAgIGNvbnRleHRfZGF0YS5wdXNoKGdldENoYXJGcm9tSW50KGNvbnRleHRfZGF0YV92YWwpKTtcbiAgICAgICAgICAgICAgY29udGV4dF9kYXRhX3ZhbCA9IDA7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICBjb250ZXh0X2RhdGFfcG9zaXRpb24rKztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHZhbHVlID0gdmFsdWUgPj4gMTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgY29udGV4dF9lbmxhcmdlSW4tLTtcbiAgICAgICAgaWYgKGNvbnRleHRfZW5sYXJnZUluID09IDApIHtcbiAgICAgICAgICBjb250ZXh0X2VubGFyZ2VJbiA9IE1hdGgucG93KDIsIGNvbnRleHRfbnVtQml0cyk7XG4gICAgICAgICAgY29udGV4dF9udW1CaXRzKys7XG4gICAgICAgIH1cbiAgICAgICAgZGVsZXRlIGNvbnRleHRfZGljdGlvbmFyeVRvQ3JlYXRlW2NvbnRleHRfd107XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB2YWx1ZSA9IGNvbnRleHRfZGljdGlvbmFyeVtjb250ZXh0X3ddO1xuICAgICAgICBmb3IgKGk9MCA7IGk8Y29udGV4dF9udW1CaXRzIDsgaSsrKSB7XG4gICAgICAgICAgY29udGV4dF9kYXRhX3ZhbCA9IChjb250ZXh0X2RhdGFfdmFsIDw8IDEpIHwgKHZhbHVlJjEpO1xuICAgICAgICAgIGlmIChjb250ZXh0X2RhdGFfcG9zaXRpb24gPT0gYml0c1BlckNoYXItMSkge1xuICAgICAgICAgICAgY29udGV4dF9kYXRhX3Bvc2l0aW9uID0gMDtcbiAgICAgICAgICAgIGNvbnRleHRfZGF0YS5wdXNoKGdldENoYXJGcm9tSW50KGNvbnRleHRfZGF0YV92YWwpKTtcbiAgICAgICAgICAgIGNvbnRleHRfZGF0YV92YWwgPSAwO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBjb250ZXh0X2RhdGFfcG9zaXRpb24rKztcbiAgICAgICAgICB9XG4gICAgICAgICAgdmFsdWUgPSB2YWx1ZSA+PiAxO1xuICAgICAgICB9XG5cblxuICAgICAgfVxuICAgICAgY29udGV4dF9lbmxhcmdlSW4tLTtcbiAgICAgIGlmIChjb250ZXh0X2VubGFyZ2VJbiA9PSAwKSB7XG4gICAgICAgIGNvbnRleHRfZW5sYXJnZUluID0gTWF0aC5wb3coMiwgY29udGV4dF9udW1CaXRzKTtcbiAgICAgICAgY29udGV4dF9udW1CaXRzKys7XG4gICAgICB9XG4gICAgfVxuXG4gICAgLy8gTWFyayB0aGUgZW5kIG9mIHRoZSBzdHJlYW1cbiAgICB2YWx1ZSA9IDI7XG4gICAgZm9yIChpPTAgOyBpPGNvbnRleHRfbnVtQml0cyA7IGkrKykge1xuICAgICAgY29udGV4dF9kYXRhX3ZhbCA9IChjb250ZXh0X2RhdGFfdmFsIDw8IDEpIHwgKHZhbHVlJjEpO1xuICAgICAgaWYgKGNvbnRleHRfZGF0YV9wb3NpdGlvbiA9PSBiaXRzUGVyQ2hhci0xKSB7XG4gICAgICAgIGNvbnRleHRfZGF0YV9wb3NpdGlvbiA9IDA7XG4gICAgICAgIGNvbnRleHRfZGF0YS5wdXNoKGdldENoYXJGcm9tSW50KGNvbnRleHRfZGF0YV92YWwpKTtcbiAgICAgICAgY29udGV4dF9kYXRhX3ZhbCA9IDA7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBjb250ZXh0X2RhdGFfcG9zaXRpb24rKztcbiAgICAgIH1cbiAgICAgIHZhbHVlID0gdmFsdWUgPj4gMTtcbiAgICB9XG5cbiAgICAvLyBGbHVzaCB0aGUgbGFzdCBjaGFyXG4gICAgd2hpbGUgKHRydWUpIHtcbiAgICAgIGNvbnRleHRfZGF0YV92YWwgPSAoY29udGV4dF9kYXRhX3ZhbCA8PCAxKTtcbiAgICAgIGlmIChjb250ZXh0X2RhdGFfcG9zaXRpb24gPT0gYml0c1BlckNoYXItMSkge1xuICAgICAgICBjb250ZXh0X2RhdGEucHVzaChnZXRDaGFyRnJvbUludChjb250ZXh0X2RhdGFfdmFsKSk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgICAgZWxzZSBjb250ZXh0X2RhdGFfcG9zaXRpb24rKztcbiAgICB9XG4gICAgcmV0dXJuIGNvbnRleHRfZGF0YS5qb2luKCcnKTtcbiAgfSxcblxuICBkZWNvbXByZXNzOiBmdW5jdGlvbiAoY29tcHJlc3NlZCkge1xuICAgIGlmIChjb21wcmVzc2VkID09IG51bGwpIHJldHVybiBcIlwiO1xuICAgIGlmIChjb21wcmVzc2VkID09IFwiXCIpIHJldHVybiBudWxsO1xuICAgIHJldHVybiBMWlN0cmluZy5fZGVjb21wcmVzcyhjb21wcmVzc2VkLmxlbmd0aCwgMzI3NjgsIGZ1bmN0aW9uKGluZGV4KSB7IHJldHVybiBjb21wcmVzc2VkLmNoYXJDb2RlQXQoaW5kZXgpOyB9KTtcbiAgfSxcblxuICBfZGVjb21wcmVzczogZnVuY3Rpb24gKGxlbmd0aCwgcmVzZXRWYWx1ZSwgZ2V0TmV4dFZhbHVlKSB7XG4gICAgdmFyIGRpY3Rpb25hcnkgPSBbXSxcbiAgICAgICAgbmV4dCxcbiAgICAgICAgZW5sYXJnZUluID0gNCxcbiAgICAgICAgZGljdFNpemUgPSA0LFxuICAgICAgICBudW1CaXRzID0gMyxcbiAgICAgICAgZW50cnkgPSBcIlwiLFxuICAgICAgICByZXN1bHQgPSBbXSxcbiAgICAgICAgaSxcbiAgICAgICAgdyxcbiAgICAgICAgYml0cywgcmVzYiwgbWF4cG93ZXIsIHBvd2VyLFxuICAgICAgICBjLFxuICAgICAgICBkYXRhID0ge3ZhbDpnZXROZXh0VmFsdWUoMCksIHBvc2l0aW9uOnJlc2V0VmFsdWUsIGluZGV4OjF9O1xuXG4gICAgZm9yIChpID0gMDsgaSA8IDM7IGkgKz0gMSkge1xuICAgICAgZGljdGlvbmFyeVtpXSA9IGk7XG4gICAgfVxuXG4gICAgYml0cyA9IDA7XG4gICAgbWF4cG93ZXIgPSBNYXRoLnBvdygyLDIpO1xuICAgIHBvd2VyPTE7XG4gICAgd2hpbGUgKHBvd2VyIT1tYXhwb3dlcikge1xuICAgICAgcmVzYiA9IGRhdGEudmFsICYgZGF0YS5wb3NpdGlvbjtcbiAgICAgIGRhdGEucG9zaXRpb24gPj49IDE7XG4gICAgICBpZiAoZGF0YS5wb3NpdGlvbiA9PSAwKSB7XG4gICAgICAgIGRhdGEucG9zaXRpb24gPSByZXNldFZhbHVlO1xuICAgICAgICBkYXRhLnZhbCA9IGdldE5leHRWYWx1ZShkYXRhLmluZGV4KyspO1xuICAgICAgfVxuICAgICAgYml0cyB8PSAocmVzYj4wID8gMSA6IDApICogcG93ZXI7XG4gICAgICBwb3dlciA8PD0gMTtcbiAgICB9XG5cbiAgICBzd2l0Y2ggKG5leHQgPSBiaXRzKSB7XG4gICAgICBjYXNlIDA6XG4gICAgICAgICAgYml0cyA9IDA7XG4gICAgICAgICAgbWF4cG93ZXIgPSBNYXRoLnBvdygyLDgpO1xuICAgICAgICAgIHBvd2VyPTE7XG4gICAgICAgICAgd2hpbGUgKHBvd2VyIT1tYXhwb3dlcikge1xuICAgICAgICAgICAgcmVzYiA9IGRhdGEudmFsICYgZGF0YS5wb3NpdGlvbjtcbiAgICAgICAgICAgIGRhdGEucG9zaXRpb24gPj49IDE7XG4gICAgICAgICAgICBpZiAoZGF0YS5wb3NpdGlvbiA9PSAwKSB7XG4gICAgICAgICAgICAgIGRhdGEucG9zaXRpb24gPSByZXNldFZhbHVlO1xuICAgICAgICAgICAgICBkYXRhLnZhbCA9IGdldE5leHRWYWx1ZShkYXRhLmluZGV4KyspO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgYml0cyB8PSAocmVzYj4wID8gMSA6IDApICogcG93ZXI7XG4gICAgICAgICAgICBwb3dlciA8PD0gMTtcbiAgICAgICAgICB9XG4gICAgICAgIGMgPSBmKGJpdHMpO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgMTpcbiAgICAgICAgICBiaXRzID0gMDtcbiAgICAgICAgICBtYXhwb3dlciA9IE1hdGgucG93KDIsMTYpO1xuICAgICAgICAgIHBvd2VyPTE7XG4gICAgICAgICAgd2hpbGUgKHBvd2VyIT1tYXhwb3dlcikge1xuICAgICAgICAgICAgcmVzYiA9IGRhdGEudmFsICYgZGF0YS5wb3NpdGlvbjtcbiAgICAgICAgICAgIGRhdGEucG9zaXRpb24gPj49IDE7XG4gICAgICAgICAgICBpZiAoZGF0YS5wb3NpdGlvbiA9PSAwKSB7XG4gICAgICAgICAgICAgIGRhdGEucG9zaXRpb24gPSByZXNldFZhbHVlO1xuICAgICAgICAgICAgICBkYXRhLnZhbCA9IGdldE5leHRWYWx1ZShkYXRhLmluZGV4KyspO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgYml0cyB8PSAocmVzYj4wID8gMSA6IDApICogcG93ZXI7XG4gICAgICAgICAgICBwb3dlciA8PD0gMTtcbiAgICAgICAgICB9XG4gICAgICAgIGMgPSBmKGJpdHMpO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgMjpcbiAgICAgICAgcmV0dXJuIFwiXCI7XG4gICAgfVxuICAgIGRpY3Rpb25hcnlbM10gPSBjO1xuICAgIHcgPSBjO1xuICAgIHJlc3VsdC5wdXNoKGMpO1xuICAgIHdoaWxlICh0cnVlKSB7XG4gICAgICBpZiAoZGF0YS5pbmRleCA+IGxlbmd0aCkge1xuICAgICAgICByZXR1cm4gXCJcIjtcbiAgICAgIH1cblxuICAgICAgYml0cyA9IDA7XG4gICAgICBtYXhwb3dlciA9IE1hdGgucG93KDIsbnVtQml0cyk7XG4gICAgICBwb3dlcj0xO1xuICAgICAgd2hpbGUgKHBvd2VyIT1tYXhwb3dlcikge1xuICAgICAgICByZXNiID0gZGF0YS52YWwgJiBkYXRhLnBvc2l0aW9uO1xuICAgICAgICBkYXRhLnBvc2l0aW9uID4+PSAxO1xuICAgICAgICBpZiAoZGF0YS5wb3NpdGlvbiA9PSAwKSB7XG4gICAgICAgICAgZGF0YS5wb3NpdGlvbiA9IHJlc2V0VmFsdWU7XG4gICAgICAgICAgZGF0YS52YWwgPSBnZXROZXh0VmFsdWUoZGF0YS5pbmRleCsrKTtcbiAgICAgICAgfVxuICAgICAgICBiaXRzIHw9IChyZXNiPjAgPyAxIDogMCkgKiBwb3dlcjtcbiAgICAgICAgcG93ZXIgPDw9IDE7XG4gICAgICB9XG5cbiAgICAgIHN3aXRjaCAoYyA9IGJpdHMpIHtcbiAgICAgICAgY2FzZSAwOlxuICAgICAgICAgIGJpdHMgPSAwO1xuICAgICAgICAgIG1heHBvd2VyID0gTWF0aC5wb3coMiw4KTtcbiAgICAgICAgICBwb3dlcj0xO1xuICAgICAgICAgIHdoaWxlIChwb3dlciE9bWF4cG93ZXIpIHtcbiAgICAgICAgICAgIHJlc2IgPSBkYXRhLnZhbCAmIGRhdGEucG9zaXRpb247XG4gICAgICAgICAgICBkYXRhLnBvc2l0aW9uID4+PSAxO1xuICAgICAgICAgICAgaWYgKGRhdGEucG9zaXRpb24gPT0gMCkge1xuICAgICAgICAgICAgICBkYXRhLnBvc2l0aW9uID0gcmVzZXRWYWx1ZTtcbiAgICAgICAgICAgICAgZGF0YS52YWwgPSBnZXROZXh0VmFsdWUoZGF0YS5pbmRleCsrKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGJpdHMgfD0gKHJlc2I+MCA/IDEgOiAwKSAqIHBvd2VyO1xuICAgICAgICAgICAgcG93ZXIgPDw9IDE7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgZGljdGlvbmFyeVtkaWN0U2l6ZSsrXSA9IGYoYml0cyk7XG4gICAgICAgICAgYyA9IGRpY3RTaXplLTE7XG4gICAgICAgICAgZW5sYXJnZUluLS07XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgMTpcbiAgICAgICAgICBiaXRzID0gMDtcbiAgICAgICAgICBtYXhwb3dlciA9IE1hdGgucG93KDIsMTYpO1xuICAgICAgICAgIHBvd2VyPTE7XG4gICAgICAgICAgd2hpbGUgKHBvd2VyIT1tYXhwb3dlcikge1xuICAgICAgICAgICAgcmVzYiA9IGRhdGEudmFsICYgZGF0YS5wb3NpdGlvbjtcbiAgICAgICAgICAgIGRhdGEucG9zaXRpb24gPj49IDE7XG4gICAgICAgICAgICBpZiAoZGF0YS5wb3NpdGlvbiA9PSAwKSB7XG4gICAgICAgICAgICAgIGRhdGEucG9zaXRpb24gPSByZXNldFZhbHVlO1xuICAgICAgICAgICAgICBkYXRhLnZhbCA9IGdldE5leHRWYWx1ZShkYXRhLmluZGV4KyspO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgYml0cyB8PSAocmVzYj4wID8gMSA6IDApICogcG93ZXI7XG4gICAgICAgICAgICBwb3dlciA8PD0gMTtcbiAgICAgICAgICB9XG4gICAgICAgICAgZGljdGlvbmFyeVtkaWN0U2l6ZSsrXSA9IGYoYml0cyk7XG4gICAgICAgICAgYyA9IGRpY3RTaXplLTE7XG4gICAgICAgICAgZW5sYXJnZUluLS07XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgMjpcbiAgICAgICAgICByZXR1cm4gcmVzdWx0LmpvaW4oJycpO1xuICAgICAgfVxuXG4gICAgICBpZiAoZW5sYXJnZUluID09IDApIHtcbiAgICAgICAgZW5sYXJnZUluID0gTWF0aC5wb3coMiwgbnVtQml0cyk7XG4gICAgICAgIG51bUJpdHMrKztcbiAgICAgIH1cblxuICAgICAgaWYgKGRpY3Rpb25hcnlbY10pIHtcbiAgICAgICAgZW50cnkgPSBkaWN0aW9uYXJ5W2NdO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgaWYgKGMgPT09IGRpY3RTaXplKSB7XG4gICAgICAgICAgZW50cnkgPSB3ICsgdy5jaGFyQXQoMCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHJlc3VsdC5wdXNoKGVudHJ5KTtcblxuICAgICAgLy8gQWRkIHcrZW50cnlbMF0gdG8gdGhlIGRpY3Rpb25hcnkuXG4gICAgICBkaWN0aW9uYXJ5W2RpY3RTaXplKytdID0gdyArIGVudHJ5LmNoYXJBdCgwKTtcbiAgICAgIGVubGFyZ2VJbi0tO1xuXG4gICAgICB3ID0gZW50cnk7XG5cbiAgICAgIGlmIChlbmxhcmdlSW4gPT0gMCkge1xuICAgICAgICBlbmxhcmdlSW4gPSBNYXRoLnBvdygyLCBudW1CaXRzKTtcbiAgICAgICAgbnVtQml0cysrO1xuICAgICAgfVxuXG4gICAgfVxuICB9XG59O1xuICByZXR1cm4gTFpTdHJpbmc7XG59KSgpO1xuXG5pZiAodHlwZW9mIGRlZmluZSA9PT0gJ2Z1bmN0aW9uJyAmJiBkZWZpbmUuYW1kKSB7XG4gIGRlZmluZShmdW5jdGlvbiAoKSB7IHJldHVybiBMWlN0cmluZzsgfSk7XG59IGVsc2UgaWYoIHR5cGVvZiBtb2R1bGUgIT09ICd1bmRlZmluZWQnICYmIG1vZHVsZSAhPSBudWxsICkge1xuICBtb2R1bGUuZXhwb3J0cyA9IExaU3RyaW5nXG59XG4iLCJpbXBvcnQgQ2xpZW50IGZyb20gXCIuL29yY2EvZGVza3RvcC9zb3VyY2VzL3NjcmlwdHMvY2xpZW50XCI7XG5pbXBvcnQgTFpTdHJpbmcgZnJvbSBcImx6LXN0cmluZ1wiO1xuXG5jb25zdCBjbGllbnQgPSAod2luZG93LmNsaWVudCA9IG5ldyBDbGllbnQoKSk7XG5cbi8vIEV4cG9zZSBhIGZ1bmN0aW9uIHRvIGJlIGNhbGxlZCBmcm9tIHRoZSBwYXJlbnRcbndpbmRvdy5zdGFydCA9ICgpID0+IHtcbiAgY2xpZW50Lmluc3RhbGwoZG9jdW1lbnQuYm9keSk7XG4gIGNsaWVudC5zdGFydCgpO1xuXG4gIC8vIFJlYWQgY29tcHJlc3NlZCBvcmNhIGZpbGUgZnJvbSBVUkxcbiAgbGV0IGNvZGU7XG4gIGxldCBoYXNoID0gd2luZG93LnRvcC5sb2NhdGlvbi5oYXNoLnNsaWNlKDEpO1xuICBpZiAoaGFzaC5sZW5ndGgpIHtcbiAgICB0cnkge1xuICAgICAgY29kZSA9IExaU3RyaW5nLmRlY29tcHJlc3NGcm9tRW5jb2RlZFVSSUNvbXBvbmVudChoYXNoKTtcbiAgICAgIGNsaWVudC53aGVuT3BlbihcIlwiLCBjb2RlKTtcbiAgICB9IGNhdGNoIChlKSB7fVxuICB9XG5cbiAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcImtleXVwXCIsIChlKSA9PiB7XG4gICAgY29uc3QgbmV3Q29kZSA9IGNsaWVudC5vcmNhLnRvU3RyaW5nKCk7XG4gICAgaWYgKG5ld0NvZGUgIT09IGNvZGUpIHtcbiAgICAgIGNvZGUgPSBuZXdDb2RlO1xuICAgICAgaGFzaCA9IExaU3RyaW5nLmNvbXByZXNzVG9FbmNvZGVkVVJJQ29tcG9uZW50KGNvZGUpO1xuICAgICAgd2luZG93LnRvcC5oaXN0b3J5LnJlcGxhY2VTdGF0ZSh1bmRlZmluZWQsIHVuZGVmaW5lZCwgYCMke2hhc2h9YCk7XG4gICAgfVxuICB9KTtcbn07XG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHRpZihfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdKSB7XG5cdFx0cmV0dXJuIF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0uZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSAobW9kdWxlKSA9PiB7XG5cdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuXHRcdCgpID0+IG1vZHVsZVsnZGVmYXVsdCddIDpcblx0XHQoKSA9PiBtb2R1bGU7XG5cdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsIHsgYTogZ2V0dGVyIH0pO1xuXHRyZXR1cm4gZ2V0dGVyO1xufTsiLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsIi8vIHN0YXJ0dXBcbi8vIExvYWQgZW50cnkgbW9kdWxlXG5fX3dlYnBhY2tfcmVxdWlyZV9fKFwiLi9vcmNhLmpzXCIpO1xuLy8gVGhpcyBlbnRyeSBtb2R1bGUgdXNlZCAnZXhwb3J0cycgc28gaXQgY2FuJ3QgYmUgaW5saW5lZFxuIl0sInNvdXJjZVJvb3QiOiIifQ==