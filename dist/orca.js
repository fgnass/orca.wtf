/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./orca/desktop/sources/scripts/core/io/cc.js":
/*!****************************************************!*\
  !*** ./orca/desktop/sources/scripts/core/io/cc.js ***!
  \****************************************************/
/*! namespace exports */
/*! export default [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_exports__, __webpack_require__.r, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

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
/*! runtime requirements: __webpack_exports__, __webpack_require__.r, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

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
    const app = Object(function webpackMissingModule() { var e = new Error("Cannot find module 'electron'"); e.code = 'MODULE_NOT_FOUND'; throw e; }()).remote.app
    const injection = []

    injection.push({
      label: name,
      submenu: [
        { label: 'About', click: () => { Object(function webpackMissingModule() { var e = new Error("Cannot find module 'electron'"); e.code = 'MODULE_NOT_FOUND'; throw e; }()).shell.openExternal('https://github.com/hundredrabbits/' + name) } },
        {
          label: 'Theme',
          submenu: [
            { label: 'Download Themes', click: () => { Object(function webpackMissingModule() { var e = new Error("Cannot find module 'electron'"); e.code = 'MODULE_NOT_FOUND'; throw e; }()).shell.openExternal('https://github.com/hundredrabbits/Themes') } },
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

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => __WEBPACK_DEFAULT_EXPORT__
/* harmony export */ });


function Osc (client) {
  const osc = __webpack_require__(Object(function webpackMissingModule() { var e = new Error("Cannot find module 'node-osc'"); e.code = 'MODULE_NOT_FOUND'; throw e; }()))

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
/*! runtime requirements: __webpack_exports__, __webpack_require__.r, __webpack_require__, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => __WEBPACK_DEFAULT_EXPORT__
/* harmony export */ });
/* provided dependency */ var Buffer = Object(function webpackMissingModule() { var e = new Error("Cannot find module '/Users/fgnass/Projects/fgnass/orcalab/stringbuffer.js'"); e.code = 'MODULE_NOT_FOUND'; throw e; }());


function Udp (client) {
  const dgram = __webpack_require__(Object(function webpackMissingModule() { var e = new Error("Cannot find module 'dgram'"); e.code = 'MODULE_NOT_FOUND'; throw e; }()))

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

/***/ "./orca.js":
/*!*****************!*\
  !*** ./orca.js ***!
  \*****************/
/*! namespace exports */
/*! exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__, __webpack_require__.r, __webpack_exports__, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _orca_desktop_sources_scripts_client__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./orca/desktop/sources/scripts/client */ "./orca/desktop/sources/scripts/client.js");


const client = (window.client = new _orca_desktop_sources_scripts_client__WEBPACK_IMPORTED_MODULE_0__.default());

client.install(document.body);
client.start();


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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9vcmNhbGFiLy4vb3JjYS9kZXNrdG9wL3NvdXJjZXMvc2NyaXB0cy9jb3JlL2lvL2NjLmpzIiwid2VicGFjazovL29yY2FsYWIvLi9vcmNhL2Rlc2t0b3Avc291cmNlcy9zY3JpcHRzL2xpYi9hY2Vscy5qcyIsIndlYnBhY2s6Ly9vcmNhbGFiLy4vb3JjYS9kZXNrdG9wL3NvdXJjZXMvc2NyaXB0cy9saWIvaGlzdG9yeS5qcyIsIndlYnBhY2s6Ly9vcmNhbGFiLy4vb3JjYS9kZXNrdG9wL3NvdXJjZXMvc2NyaXB0cy9saWIvc291cmNlLmpzIiwid2VicGFjazovL29yY2FsYWIvLi9vcmNhL2Rlc2t0b3Avc291cmNlcy9zY3JpcHRzL2xpYi90aGVtZS5qcyIsIndlYnBhY2s6Ly9vcmNhbGFiLy4vb3JjYS9kZXNrdG9wL3NvdXJjZXMvc2NyaXB0cy9jbGllbnQuanMiLCJ3ZWJwYWNrOi8vb3JjYWxhYi8uL29yY2EvZGVza3RvcC9zb3VyY2VzL3NjcmlwdHMvY2xvY2suanMiLCJ3ZWJwYWNrOi8vb3JjYWxhYi8uL29yY2EvZGVza3RvcC9zb3VyY2VzL3NjcmlwdHMvY29tbWFuZGVyLmpzIiwid2VicGFjazovL29yY2FsYWIvLi9vcmNhL2Rlc2t0b3Avc291cmNlcy9zY3JpcHRzL2N1cnNvci5qcyIsIndlYnBhY2s6Ly9vcmNhbGFiLy4vb3JjYS9kZXNrdG9wL3NvdXJjZXMvc2NyaXB0cy9jb3JlL2lvL21pZGkuanMiLCJ3ZWJwYWNrOi8vb3JjYWxhYi8uL29yY2EvZGVza3RvcC9zb3VyY2VzL3NjcmlwdHMvY29yZS9pby9tb25vLmpzIiwid2VicGFjazovL29yY2FsYWIvLi9vcmNhL2Rlc2t0b3Avc291cmNlcy9zY3JpcHRzL2NvcmUvaW8vb3NjLmpzIiwid2VicGFjazovL29yY2FsYWIvLi9vcmNhL2Rlc2t0b3Avc291cmNlcy9zY3JpcHRzL2NvcmUvaW8vdWRwLmpzIiwid2VicGFjazovL29yY2FsYWIvLi9vcmNhL2Rlc2t0b3Avc291cmNlcy9zY3JpcHRzL2NvcmUvaW8uanMiLCJ3ZWJwYWNrOi8vb3JjYWxhYi8uL29yY2EvZGVza3RvcC9zb3VyY2VzL3NjcmlwdHMvY29yZS9saWJyYXJ5LmpzIiwid2VicGFjazovL29yY2FsYWIvLi9vcmNhL2Rlc2t0b3Avc291cmNlcy9zY3JpcHRzL2NvcmUvb3BlcmF0b3IuanMiLCJ3ZWJwYWNrOi8vb3JjYWxhYi8uL29yY2EvZGVza3RvcC9zb3VyY2VzL3NjcmlwdHMvY29yZS9vcmNhLmpzIiwid2VicGFjazovL29yY2FsYWIvLi9vcmNhL2Rlc2t0b3Avc291cmNlcy9zY3JpcHRzL2NvcmUvdHJhbnNwb3NlLmpzIiwid2VicGFjazovL29yY2FsYWIvLi9vcmNhLmpzIiwid2VicGFjazovL29yY2FsYWIvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vb3JjYWxhYi93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vb3JjYWxhYi93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL29yY2FsYWIvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9vcmNhbGFiL3dlYnBhY2svc3RhcnR1cCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBWTs7QUFFWjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLGdDQUFnQztBQUNoQztBQUNBLGtCQUFrQix1Q0FBdUM7QUFDekQ7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0EsT0FBTztBQUNQLCtCQUErQjtBQUMvQiw4QkFBOEI7QUFDOUIsOEJBQThCO0FBQzlCLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLHdCQUF3QjtBQUN4QjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLGlFQUFlLE1BQU0sRUFBQzs7Ozs7Ozs7Ozs7Ozs7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Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsaUVBQWUsY0FBYyxFQUFDOzs7Ozs7Ozs7Ozs7Ozs7O0FDNUQ2Qjs7QUFFM0Qsb0NBQW9DLHlFQUFNOztBQUUxQztBQUNBOzs7Ozs7O1VDTEE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7Ozs7O1dDckJBO1dBQ0E7V0FDQTtXQUNBO1dBQ0Esd0NBQXdDLHlDQUF5QztXQUNqRjtXQUNBO1dBQ0EsRTs7Ozs7V0NQQSxzRjs7Ozs7V0NBQTtXQUNBO1dBQ0E7V0FDQSxzREFBc0Qsa0JBQWtCO1dBQ3hFO1dBQ0EsK0NBQStDLGNBQWM7V0FDN0QsRTs7OztVQ05BO1VBQ0E7VUFDQTtVQUNBIiwiZmlsZSI6Im9yY2EuanMiLCJzb3VyY2VzQ29udGVudCI6WyIndXNlIHN0cmljdCdcblxuZnVuY3Rpb24gTWlkaUNDIChjbGllbnQpIHtcbiAgdGhpcy5zdGFjayA9IFtdXG4gIHRoaXMub2Zmc2V0ID0gNjRcblxuICB0aGlzLnN0YXJ0ID0gZnVuY3Rpb24gKCkge1xuICAgIGNvbnNvbGUuaW5mbygnTWlkaUNDJywgJ1N0YXJ0aW5nLi4nKVxuICB9XG5cbiAgdGhpcy5jbGVhciA9IGZ1bmN0aW9uICgpIHtcbiAgICB0aGlzLnN0YWNrID0gW11cbiAgfVxuXG4gIHRoaXMucnVuID0gZnVuY3Rpb24gKCkge1xuICAgIGlmICh0aGlzLnN0YWNrLmxlbmd0aCA8IDEpIHsgcmV0dXJuIH1cbiAgICBjb25zdCBkZXZpY2UgPSBjbGllbnQuaW8ubWlkaS5vdXRwdXREZXZpY2UoKVxuICAgIGlmICghZGV2aWNlKSB7IGNvbnNvbGUud2FybignQ0MnLCAnTm8gTWlkaSBkZXZpY2UuJyk7IHJldHVybiB9XG4gICAgZm9yIChjb25zdCBtc2cgb2YgdGhpcy5zdGFjaykge1xuICAgICAgaWYgKG1zZy50eXBlID09PSAnY2MnICYmICFpc05hTihtc2cuY2hhbm5lbCkgJiYgIWlzTmFOKG1zZy5rbm9iKSAmJiAhaXNOYU4obXNnLnZhbHVlKSkge1xuICAgICAgICBkZXZpY2Uuc2VuZChbMHhiMCArIG1zZy5jaGFubmVsLCB0aGlzLm9mZnNldCArIG1zZy5rbm9iLCBtc2cudmFsdWVdKVxuICAgICAgfSBlbHNlIGlmIChtc2cudHlwZSA9PT0gJ3BiJyAmJiAhaXNOYU4obXNnLmNoYW5uZWwpICYmICFpc05hTihtc2cubHNiKSAmJiAhaXNOYU4obXNnLm1zYikpIHtcbiAgICAgICAgZGV2aWNlLnNlbmQoWzB4ZTAgKyBtc2cuY2hhbm5lbCwgbXNnLmxzYiwgbXNnLm1zYl0pXG4gICAgICB9IGVsc2UgaWYgKG1zZy50eXBlID09PSAncGcnICYmICFpc05hTihtc2cuY2hhbm5lbCkpIHtcbiAgICAgICAgaWYgKCFpc05hTihtc2cuYmFuaykpIHsgZGV2aWNlLnNlbmQoWzB4YjAgKyBtc2cuY2hhbm5lbCwgMCwgbXNnLmJhbmtdKSB9XG4gICAgICAgIGlmICghaXNOYU4obXNnLnN1YikpIHsgZGV2aWNlLnNlbmQoWzB4YjAgKyBtc2cuY2hhbm5lbCwgMzIsIG1zZy5zdWJdKSB9XG4gICAgICAgIGlmICghaXNOYU4obXNnLnBnbSkpIHsgZGV2aWNlLnNlbmQoWzB4YzAgKyBtc2cuY2hhbm5lbCwgbXNnLnBnbV0pIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGNvbnNvbGUud2FybignQ0MnLCAnVW5rbm93biBtZXNzYWdlJywgbXNnKVxuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHRoaXMuc2V0T2Zmc2V0ID0gZnVuY3Rpb24gKG9mZnNldCkge1xuICAgIGlmIChpc05hTihvZmZzZXQpKSB7IHJldHVybiB9XG4gICAgdGhpcy5vZmZzZXQgPSBvZmZzZXRcbiAgICBjb25zb2xlLmxvZygnQ0MnLCAnU2V0IG9mZnNldCB0byAnICsgdGhpcy5vZmZzZXQpXG4gIH1cbn1cblxuLyoqKiBFWFBPUlRTIEZST00gZXhwb3J0cy1sb2FkZXIgKioqL1xuZXhwb3J0IGRlZmF1bHQgTWlkaUNDO1xuIiwiJ3VzZSBzdHJpY3QnXG5cbmZ1bmN0aW9uIEFjZWxzIChjbGllbnQpIHtcbiAgdGhpcy5hbGwgPSB7fVxuICB0aGlzLnJvbGVzID0ge31cbiAgdGhpcy5waXBlID0gbnVsbFxuXG4gIHRoaXMuaW5zdGFsbCA9IChob3N0ID0gd2luZG93KSA9PiB7XG4gICAgaG9zdC5hZGRFdmVudExpc3RlbmVyKCdrZXlkb3duJywgdGhpcy5vbktleURvd24sIGZhbHNlKVxuICAgIGhvc3QuYWRkRXZlbnRMaXN0ZW5lcigna2V5dXAnLCB0aGlzLm9uS2V5VXAsIGZhbHNlKVxuICB9XG5cbiAgdGhpcy5zZXQgPSAoY2F0LCBuYW1lLCBhY2NlbGVyYXRvciwgZG93bmZuLCB1cGZuKSA9PiB7XG4gICAgaWYgKHRoaXMuYWxsW2FjY2VsZXJhdG9yXSkgeyBjb25zb2xlLndhcm4oJ0FjZWxzJywgYFRyeWluZyB0byBvdmVyd3JpdGUgJHt0aGlzLmFsbFthY2NlbGVyYXRvcl0ubmFtZX0sIHdpdGggJHtuYW1lfS5gKSB9XG4gICAgdGhpcy5hbGxbYWNjZWxlcmF0b3JdID0geyBjYXQsIG5hbWUsIGRvd25mbiwgdXBmbiwgYWNjZWxlcmF0b3IgfVxuICB9XG5cbiAgdGhpcy5hZGQgPSAoY2F0LCByb2xlKSA9PiB7XG4gICAgdGhpcy5hbGxbJzonICsgcm9sZV0gPSB7IGNhdCwgbmFtZTogcm9sZSwgcm9sZSB9XG4gIH1cblxuICB0aGlzLmdldCA9IChhY2NlbGVyYXRvcikgPT4ge1xuICAgIHJldHVybiB0aGlzLmFsbFthY2NlbGVyYXRvcl1cbiAgfVxuXG4gIHRoaXMuc29ydCA9ICgpID0+IHtcbiAgICBjb25zdCBoID0ge31cbiAgICBmb3IgKGNvbnN0IGl0ZW0gb2YgT2JqZWN0LnZhbHVlcyh0aGlzLmFsbCkpIHtcbiAgICAgIGlmICghaFtpdGVtLmNhdF0pIHsgaFtpdGVtLmNhdF0gPSBbXSB9XG4gICAgICBoW2l0ZW0uY2F0XS5wdXNoKGl0ZW0pXG4gICAgfVxuICAgIHJldHVybiBoXG4gIH1cblxuICB0aGlzLmNvbnZlcnQgPSAoZXZlbnQpID0+IHtcbiAgICBjb25zdCBhY2NlbGVyYXRvciA9IGV2ZW50LmtleSA9PT0gJyAnID8gJ1NwYWNlJyA6IGV2ZW50LmtleS5zdWJzdHIoMCwgMSkudG9VcHBlckNhc2UoKSArIGV2ZW50LmtleS5zdWJzdHIoMSlcbiAgICBpZiAoKGV2ZW50LmN0cmxLZXkgfHwgZXZlbnQubWV0YUtleSkgJiYgZXZlbnQuc2hpZnRLZXkpIHtcbiAgICAgIHJldHVybiBgQ21kT3JDdHJsK1NoaWZ0KyR7YWNjZWxlcmF0b3J9YFxuICAgIH1cbiAgICBpZiAoZXZlbnQuc2hpZnRLZXkgJiYgZXZlbnQua2V5LnRvVXBwZXJDYXNlKCkgIT09IGV2ZW50LmtleSkge1xuICAgICAgcmV0dXJuIGBTaGlmdCske2FjY2VsZXJhdG9yfWBcbiAgICB9XG4gICAgaWYgKGV2ZW50LmFsdEtleSAmJiBldmVudC5rZXkubGVuZ3RoICE9PSAxKSB7XG4gICAgICByZXR1cm4gYEFsdCske2FjY2VsZXJhdG9yfWBcbiAgICB9XG4gICAgaWYgKGV2ZW50LmN0cmxLZXkgfHwgZXZlbnQubWV0YUtleSkge1xuICAgICAgcmV0dXJuIGBDbWRPckN0cmwrJHthY2NlbGVyYXRvcn1gXG4gICAgfVxuICAgIHJldHVybiBhY2NlbGVyYXRvclxuICB9XG5cbiAgdGhpcy5waXBlID0gKG9iaikgPT4ge1xuICAgIHRoaXMucGlwZSA9IG9ialxuICB9XG5cbiAgdGhpcy5vbktleURvd24gPSAoZSkgPT4ge1xuICAgIGNvbnN0IHRhcmdldCA9IHRoaXMuZ2V0KHRoaXMuY29udmVydChlKSlcbiAgICBpZiAoIXRhcmdldCB8fCAhdGFyZ2V0LmRvd25mbikgeyByZXR1cm4gdGhpcy5waXBlID8gdGhpcy5waXBlLm9uS2V5RG93bihlKSA6IG51bGwgfVxuICAgIHRhcmdldC5kb3duZm4oKVxuICAgIGUucHJldmVudERlZmF1bHQoKVxuICB9XG5cbiAgdGhpcy5vbktleVVwID0gKGUpID0+IHtcbiAgICBjb25zdCB0YXJnZXQgPSB0aGlzLmdldCh0aGlzLmNvbnZlcnQoZSkpXG4gICAgaWYgKCF0YXJnZXQgfHwgIXRhcmdldC51cGZuKSB7IHJldHVybiB0aGlzLnBpcGUgPyB0aGlzLnBpcGUub25LZXlVcChlKSA6IG51bGwgfVxuICAgIHRhcmdldC51cGZuKClcbiAgICBlLnByZXZlbnREZWZhdWx0KClcbiAgfVxuXG4gIHRoaXMudG9NYXJrZG93biA9ICgpID0+IHtcbiAgICBjb25zdCBjYXRzID0gdGhpcy5zb3J0KClcbiAgICBsZXQgdGV4dCA9ICcnXG4gICAgZm9yIChjb25zdCBjYXQgaW4gY2F0cykge1xuICAgICAgdGV4dCArPSBgXFxuIyMjICR7Y2F0fVxcblxcbmBcbiAgICAgIGZvciAoY29uc3QgaXRlbSBvZiBjYXRzW2NhdF0pIHtcbiAgICAgICAgdGV4dCArPSBpdGVtLmFjY2VsZXJhdG9yID8gYC0gXFxgJHtpdGVtLmFjY2VsZXJhdG9yLnJlcGxhY2UoJ2AnLCAndGlsZGUnKX1cXGA6ICR7aXRlbS5uYW1lfVxcbmAgOiAnJ1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gdGV4dC50cmltKClcbiAgfVxuXG4gIHRoaXMudG9TdHJpbmcgPSAoKSA9PiB7XG4gICAgY29uc3QgY2F0cyA9IHRoaXMuc29ydCgpXG4gICAgbGV0IHRleHQgPSAnJ1xuICAgIGZvciAoY29uc3QgY2F0IGluIGNhdHMpIHtcbiAgICAgIHRleHQgKz0gYFxcbiR7Y2F0fVxcblxcbmBcbiAgICAgIGZvciAoY29uc3QgaXRlbSBvZiBjYXRzW2NhdF0pIHtcbiAgICAgICAgdGV4dCArPSBpdGVtLmFjY2VsZXJhdG9yID8gYCR7aXRlbS5uYW1lLnBhZEVuZCgyNSwgJy4nKX0gJHtpdGVtLmFjY2VsZXJhdG9yfVxcbmAgOiAnJ1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gdGV4dC50cmltKClcbiAgfVxuXG4gIC8vIEVsZWN0cm9uIHNwZWNpZmljc1xuXG4gIHRoaXMuaW5qZWN0ID0gKG5hbWUgPSAnVW50aXRsZWQnKSA9PiB7XG4gICAgY29uc3QgYXBwID0gcmVxdWlyZSgnZWxlY3Ryb24nKS5yZW1vdGUuYXBwXG4gICAgY29uc3QgaW5qZWN0aW9uID0gW11cblxuICAgIGluamVjdGlvbi5wdXNoKHtcbiAgICAgIGxhYmVsOiBuYW1lLFxuICAgICAgc3VibWVudTogW1xuICAgICAgICB7IGxhYmVsOiAnQWJvdXQnLCBjbGljazogKCkgPT4geyByZXF1aXJlKCdlbGVjdHJvbicpLnNoZWxsLm9wZW5FeHRlcm5hbCgnaHR0cHM6Ly9naXRodWIuY29tL2h1bmRyZWRyYWJiaXRzLycgKyBuYW1lKSB9IH0sXG4gICAgICAgIHtcbiAgICAgICAgICBsYWJlbDogJ1RoZW1lJyxcbiAgICAgICAgICBzdWJtZW51OiBbXG4gICAgICAgICAgICB7IGxhYmVsOiAnRG93bmxvYWQgVGhlbWVzJywgY2xpY2s6ICgpID0+IHsgcmVxdWlyZSgnZWxlY3Ryb24nKS5zaGVsbC5vcGVuRXh0ZXJuYWwoJ2h0dHBzOi8vZ2l0aHViLmNvbS9odW5kcmVkcmFiYml0cy9UaGVtZXMnKSB9IH0sXG4gICAgICAgICAgICB7IGxhYmVsOiAnT3BlbiBUaGVtZScsIGNsaWNrOiAoKSA9PiB7IGNsaWVudC50aGVtZS5vcGVuKCkgfSB9LFxuICAgICAgICAgICAgeyBsYWJlbDogJ1Jlc2V0IFRoZW1lJywgYWNjZWxlcmF0b3I6ICdDbWRPckN0cmwrRXNjYXBlJywgY2xpY2s6ICgpID0+IHsgY2xpZW50LnRoZW1lLnJlc2V0KCkgfSB9XG4gICAgICAgICAgXVxuICAgICAgICB9LFxuICAgICAgICB7IGxhYmVsOiAnRnVsbHNjcmVlbicsIGFjY2VsZXJhdG9yOiAnQ21kT3JDdHJsK0VudGVyJywgY2xpY2s6ICgpID0+IHsgYXBwLnRvZ2dsZUZ1bGxzY3JlZW4oKSB9IH0sXG4gICAgICAgIHsgbGFiZWw6ICdIaWRlJywgYWNjZWxlcmF0b3I6ICdDbWRPckN0cmwrSCcsIGNsaWNrOiAoKSA9PiB7IGFwcC50b2dnbGVWaXNpYmxlKCkgfSB9LFxuICAgICAgICB7IGxhYmVsOiAnVG9nZ2xlIE1lbnViYXInLCBhY2NlbGVyYXRvcjogJ0FsdCtIJywgY2xpY2s6ICgpID0+IHsgYXBwLnRvZ2dsZU1lbnViYXIoKSB9IH0sXG4gICAgICAgIHsgbGFiZWw6ICdJbnNwZWN0JywgYWNjZWxlcmF0b3I6ICdDbWRPckN0cmwrVGFiJywgY2xpY2s6ICgpID0+IHsgYXBwLmluc3BlY3QoKSB9IH0sXG4gICAgICAgIHsgcm9sZTogJ3F1aXQnIH1cbiAgICAgIF1cbiAgICB9KVxuXG4gICAgY29uc3Qgc29ydGVkID0gdGhpcy5zb3J0KClcbiAgICBmb3IgKGNvbnN0IGNhdCBvZiBPYmplY3Qua2V5cyhzb3J0ZWQpKSB7XG4gICAgICBjb25zdCBzdWJtZW51ID0gW11cbiAgICAgIGZvciAoY29uc3Qgb3B0aW9uIG9mIHNvcnRlZFtjYXRdKSB7XG4gICAgICAgIGlmIChvcHRpb24ucm9sZSkge1xuICAgICAgICAgIHN1Ym1lbnUucHVzaCh7IHJvbGU6IG9wdGlvbi5yb2xlIH0pXG4gICAgICAgIH0gZWxzZSBpZiAob3B0aW9uLnR5cGUpIHtcbiAgICAgICAgICBzdWJtZW51LnB1c2goeyB0eXBlOiBvcHRpb24udHlwZSB9KVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHN1Ym1lbnUucHVzaCh7IGxhYmVsOiBvcHRpb24ubmFtZSwgYWNjZWxlcmF0b3I6IG9wdGlvbi5hY2NlbGVyYXRvciwgY2xpY2s6IG9wdGlvbi5kb3duZm4gfSlcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgaW5qZWN0aW9uLnB1c2goeyBsYWJlbDogY2F0LCBzdWJtZW51OiBzdWJtZW51IH0pXG4gICAgfVxuICAgIGFwcC5pbmplY3RNZW51KGluamVjdGlvbilcbiAgfVxufVxuXG4vKioqIEVYUE9SVFMgRlJPTSBleHBvcnRzLWxvYWRlciAqKiovXG5leHBvcnQgZGVmYXVsdCBBY2VscztcbiIsIid1c2Ugc3RyaWN0J1xuXG5mdW5jdGlvbiBIaXN0b3J5ICgpIHtcbiAgdGhpcy5pbmRleCA9IDBcbiAgdGhpcy5mcmFtZXMgPSBbXVxuICB0aGlzLmhvc3QgPSBudWxsXG4gIHRoaXMua2V5ID0gbnVsbFxuXG4gIHRoaXMuYmluZCA9IGZ1bmN0aW9uIChob3N0LCBrZXkpIHtcbiAgICBjb25zb2xlLmxvZygnSGlzdG9yeSBpcyByZWNvcmRpbmcuLicpXG4gICAgdGhpcy5ob3N0ID0gaG9zdFxuICAgIHRoaXMua2V5ID0ga2V5XG4gICAgdGhpcy5yZXNldCgpXG4gIH1cblxuICB0aGlzLnJlc2V0ID0gZnVuY3Rpb24gKCkge1xuICAgIHRoaXMuaW5kZXggPSAwXG4gICAgdGhpcy5mcmFtZXMgPSBbXVxuICB9XG5cbiAgdGhpcy5yZWNvcmQgPSBmdW5jdGlvbiAoZGF0YSkge1xuICAgIGlmICh0aGlzLmluZGV4ID09PSB0aGlzLmZyYW1lcy5sZW5ndGgpIHtcbiAgICAgIHRoaXMuYXBwZW5kKGRhdGEpXG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuZm9yayhkYXRhKVxuICAgIH1cbiAgICB0aGlzLnRyaW0oKVxuICAgIHRoaXMuaW5kZXggPSB0aGlzLmZyYW1lcy5sZW5ndGhcbiAgfVxuXG4gIHRoaXMudW5kbyA9IGZ1bmN0aW9uICgpIHtcbiAgICBpZiAodGhpcy5pbmRleCA9PT0gMCkgeyBjb25zb2xlLndhcm4oJ0hpc3RvcnknLCAnUmVhY2hlZCBiZWdpbm5pbmcnKTsgcmV0dXJuIH1cbiAgICB0aGlzLmluZGV4ID0gY2xhbXAodGhpcy5pbmRleCAtIDEsIDAsIHRoaXMuZnJhbWVzLmxlbmd0aCAtIDIpXG4gICAgdGhpcy5hcHBseSh0aGlzLmZyYW1lc1t0aGlzLmluZGV4XSlcbiAgfVxuXG4gIHRoaXMucmVkbyA9IGZ1bmN0aW9uICgpIHtcbiAgICBpZiAodGhpcy5pbmRleCArIDEgPiB0aGlzLmZyYW1lcy5sZW5ndGggLSAxKSB7IGNvbnNvbGUud2FybignSGlzdG9yeScsICdSZWFjaGVkIGVuZCcpOyByZXR1cm4gfVxuICAgIHRoaXMuaW5kZXggPSBjbGFtcCh0aGlzLmluZGV4ICsgMSwgMCwgdGhpcy5mcmFtZXMubGVuZ3RoIC0gMSlcbiAgICB0aGlzLmFwcGx5KHRoaXMuZnJhbWVzW3RoaXMuaW5kZXhdKVxuICB9XG5cbiAgdGhpcy5hcHBseSA9IGZ1bmN0aW9uIChmKSB7XG4gICAgaWYgKCF0aGlzLmhvc3RbdGhpcy5rZXldKSB7IGNvbnNvbGUubG9nKGBVbmtub3duIGJpbmRpbmcgdG8ga2V5ICR7dGhpcy5rZXl9YCk7IHJldHVybiB9XG4gICAgaWYgKCFmIHx8IGYubGVuZ3RoICE9PSB0aGlzLmhvc3RbdGhpcy5rZXldLmxlbmd0aCkgeyByZXR1cm4gfVxuICAgIHRoaXMuaG9zdFt0aGlzLmtleV0gPSB0aGlzLmZyYW1lc1t0aGlzLmluZGV4XVxuICB9XG5cbiAgdGhpcy5hcHBlbmQgPSBmdW5jdGlvbiAoZGF0YSkge1xuICAgIGlmICghZGF0YSkgeyByZXR1cm4gfVxuICAgIGlmICh0aGlzLmZyYW1lc1t0aGlzLmluZGV4IC0gMV0gJiYgdGhpcy5mcmFtZXNbdGhpcy5pbmRleCAtIDFdID09PSBkYXRhKSB7IHJldHVybiB9XG4gICAgdGhpcy5mcmFtZXMucHVzaChkYXRhKVxuICB9XG5cbiAgdGhpcy5mb3JrID0gZnVuY3Rpb24gKGRhdGEpIHtcbiAgICB0aGlzLmZyYW1lcyA9IHRoaXMuZnJhbWVzLnNsaWNlKDAsIHRoaXMuaW5kZXggKyAxKVxuICAgIHRoaXMuYXBwZW5kKGRhdGEpXG4gIH1cblxuICB0aGlzLnRyaW0gPSBmdW5jdGlvbiAobGltaXQgPSAzMCkge1xuICAgIGlmICh0aGlzLmZyYW1lcy5sZW5ndGggPCBsaW1pdCkgeyByZXR1cm4gfVxuICAgIHRoaXMuZnJhbWVzLnNoaWZ0KClcbiAgfVxuXG4gIHRoaXMubGFzdCA9IGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gdGhpcy5mcmFtZXNbdGhpcy5pbmRleCAtIDFdXG4gIH1cblxuICB0aGlzLmxlbmd0aCA9IGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gdGhpcy5mcmFtZXMubGVuZ3RoXG4gIH1cblxuICBmdW5jdGlvbiBjbGFtcCAodiwgbWluLCBtYXgpIHsgcmV0dXJuIHYgPCBtaW4gPyBtaW4gOiB2ID4gbWF4ID8gbWF4IDogdiB9XG59XG5cbi8qKiogRVhQT1JUUyBGUk9NIGV4cG9ydHMtbG9hZGVyICoqKi9cbmV4cG9ydCBkZWZhdWx0IEhpc3Rvcnk7XG4iLCIndXNlIHN0cmljdCdcblxuLyogZ2xvYmFsIEZpbGVSZWFkZXIgKi9cbi8qIGdsb2JhbCBNb3VzZUV2ZW50ICovXG5cbmZ1bmN0aW9uIFNvdXJjZSAoY2xpZW50KSB7XG4gIHRoaXMuY2FjaGUgPSB7fVxuXG4gIHRoaXMuaW5zdGFsbCA9ICgpID0+IHtcbiAgfVxuXG4gIHRoaXMuc3RhcnQgPSAoKSA9PiB7XG4gICAgdGhpcy5uZXcoKVxuICB9XG5cbiAgdGhpcy5uZXcgPSAoKSA9PiB7XG4gICAgY29uc29sZS5sb2coJ1NvdXJjZScsICdOZXcgZmlsZS4uJylcbiAgICB0aGlzLmNhY2hlID0ge31cbiAgfVxuXG4gIHRoaXMub3BlbiA9IChleHQsIGNhbGxiYWNrLCBzdG9yZSA9IGZhbHNlKSA9PiB7XG4gICAgY29uc29sZS5sb2coJ1NvdXJjZScsICdPcGVuIGZpbGUuLicpXG4gICAgY29uc3QgaW5wdXQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbnB1dCcpXG4gICAgaW5wdXQudHlwZSA9ICdmaWxlJ1xuICAgIGlucHV0Lm9uY2hhbmdlID0gKGUpID0+IHtcbiAgICAgIGNvbnN0IGZpbGUgPSBlLnRhcmdldC5maWxlc1swXVxuICAgICAgaWYgKGZpbGUubmFtZS5pbmRleE9mKCcuJyArIGV4dCkgPCAwKSB7IGNvbnNvbGUud2FybignU291cmNlJywgYFNraXBwZWQgJHtmaWxlLm5hbWV9YCk7IHJldHVybiB9XG4gICAgICB0aGlzLnJlYWQoZmlsZSwgY2FsbGJhY2ssIHN0b3JlKVxuICAgIH1cbiAgICBpbnB1dC5jbGljaygpXG4gIH1cblxuICB0aGlzLmxvYWQgPSAoZXh0LCBjYWxsYmFjaykgPT4ge1xuICAgIGNvbnNvbGUubG9nKCdTb3VyY2UnLCAnTG9hZCBmaWxlcy4uJylcbiAgICBjb25zdCBpbnB1dCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2lucHV0JylcbiAgICBpbnB1dC50eXBlID0gJ2ZpbGUnXG4gICAgaW5wdXQuc2V0QXR0cmlidXRlKCdtdWx0aXBsZScsICdtdWx0aXBsZScpXG4gICAgaW5wdXQub25jaGFuZ2UgPSAoZSkgPT4ge1xuICAgICAgZm9yIChjb25zdCBmaWxlIG9mIGUudGFyZ2V0LmZpbGVzKSB7XG4gICAgICAgIGlmIChmaWxlLm5hbWUuaW5kZXhPZignLicgKyBleHQpIDwgMCkgeyBjb25zb2xlLndhcm4oJ1NvdXJjZScsIGBTa2lwcGVkICR7ZmlsZS5uYW1lfWApOyBjb250aW51ZSB9XG4gICAgICAgIHRoaXMucmVhZChmaWxlLCB0aGlzLnN0b3JlKVxuICAgICAgfVxuICAgIH1cbiAgICBpbnB1dC5jbGljaygpXG4gIH1cblxuICB0aGlzLnN0b3JlID0gKGZpbGUsIGNvbnRlbnQpID0+IHtcbiAgICBjb25zb2xlLmluZm8oJ1NvdXJjZScsICdTdG9yZWQgJyArIGZpbGUubmFtZSlcbiAgICB0aGlzLmNhY2hlW2ZpbGUubmFtZV0gPSBjb250ZW50XG4gIH1cblxuICB0aGlzLnNhdmUgPSAobmFtZSwgY29udGVudCwgdHlwZSA9ICd0ZXh0L3BsYWluJywgY2FsbGJhY2spID0+IHtcbiAgICB0aGlzLnNhdmVBcyhuYW1lLCBjb250ZW50LCB0eXBlLCBjYWxsYmFjaylcbiAgfVxuXG4gIHRoaXMuc2F2ZUFzID0gKG5hbWUsIGV4dCwgY29udGVudCwgdHlwZSA9ICd0ZXh0L3BsYWluJywgY2FsbGJhY2spID0+IHtcbiAgICBjb25zb2xlLmxvZygnU291cmNlJywgJ1NhdmUgbmV3IGZpbGUuLicpXG4gICAgdGhpcy53cml0ZShuYW1lLCBleHQsIGNvbnRlbnQsIHR5cGUsIGNhbGxiYWNrKVxuICB9XG5cbiAgLy8gSS9PXG5cbiAgdGhpcy5yZWFkID0gKGZpbGUsIGNhbGxiYWNrLCBzdG9yZSA9IGZhbHNlKSA9PiB7XG4gICAgY29uc3QgcmVhZGVyID0gbmV3IEZpbGVSZWFkZXIoKVxuICAgIHJlYWRlci5vbmxvYWQgPSAoZXZlbnQpID0+IHtcbiAgICAgIGNvbnN0IHJlcyA9IGV2ZW50LnRhcmdldC5yZXN1bHRcbiAgICAgIGlmIChjYWxsYmFjaykgeyBjYWxsYmFjayhmaWxlLCByZXMpIH1cbiAgICAgIGlmIChzdG9yZSkgeyB0aGlzLnN0b3JlKGZpbGUsIHJlcykgfVxuICAgIH1cbiAgICByZWFkZXIucmVhZEFzVGV4dChmaWxlLCAnVVRGLTgnKVxuICB9XG5cbiAgdGhpcy53cml0ZSA9IChuYW1lLCBleHQsIGNvbnRlbnQsIHR5cGUsIHNldHRpbmdzID0gJ2NoYXJzZXQ9dXRmLTgnKSA9PiB7XG4gICAgY29uc3QgbGluayA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2EnKVxuICAgIGxpbmsuc2V0QXR0cmlidXRlKCdkb3dubG9hZCcsIGAke25hbWV9LSR7dGltZXN0YW1wKCl9LiR7ZXh0fWApXG4gICAgaWYgKHR5cGUgPT09ICdpbWFnZS9wbmcnIHx8IHR5cGUgPT09ICdpbWFnZS9qcGVnJykge1xuICAgICAgbGluay5zZXRBdHRyaWJ1dGUoJ2hyZWYnLCBjb250ZW50KVxuICAgIH0gZWxzZSB7XG4gICAgICBsaW5rLnNldEF0dHJpYnV0ZSgnaHJlZicsICdkYXRhOicgKyB0eXBlICsgJzsnICsgc2V0dGluZ3MgKyAnLCcgKyBlbmNvZGVVUklDb21wb25lbnQoY29udGVudCkpXG4gICAgfVxuICAgIGxpbmsuZGlzcGF0Y2hFdmVudChuZXcgTW91c2VFdmVudCgnY2xpY2snLCB7IGJ1YmJsZXM6IHRydWUsIGNhbmNlbGFibGU6IHRydWUsIHZpZXc6IHdpbmRvdyB9KSlcbiAgfVxuXG4gIGZ1bmN0aW9uIHRpbWVzdGFtcCAoZCA9IG5ldyBEYXRlKCksIGUgPSBuZXcgRGF0ZShkKSkge1xuICAgIHJldHVybiBgJHthcnZlbGllKCl9LSR7bmVyYWxpZSgpfWBcbiAgfVxuXG4gIGZ1bmN0aW9uIGFydmVsaWUgKGRhdGUgPSBuZXcgRGF0ZSgpKSB7XG4gICAgY29uc3Qgc3RhcnQgPSBuZXcgRGF0ZShkYXRlLmdldEZ1bGxZZWFyKCksIDAsIDApXG4gICAgY29uc3QgZGlmZiA9IChkYXRlIC0gc3RhcnQpICsgKChzdGFydC5nZXRUaW1lem9uZU9mZnNldCgpIC0gZGF0ZS5nZXRUaW1lem9uZU9mZnNldCgpKSAqIDYwICogMTAwMClcbiAgICBjb25zdCBkb3R5ID0gTWF0aC5mbG9vcihkaWZmIC8gODY0MDAwMDApIC0gMVxuICAgIGNvbnN0IHkgPSBkYXRlLmdldEZ1bGxZZWFyKCkudG9TdHJpbmcoKS5zdWJzdHIoMiwgMilcbiAgICBjb25zdCBtID0gZG90eSA9PT0gMzY0IHx8IGRvdHkgPT09IDM2NSA/ICcrJyA6IFN0cmluZy5mcm9tQ2hhckNvZGUoOTcgKyBNYXRoLmZsb29yKGRvdHkgLyAxNCkpLnRvVXBwZXJDYXNlKClcbiAgICBjb25zdCBkID0gYCR7KGRvdHkgPT09IDM2NSA/IDEgOiBkb3R5ID09PSAzNjYgPyAyIDogKGRvdHkgJSAxNCkpICsgMX1gLnBhZFN0YXJ0KDIsICcwJylcbiAgICByZXR1cm4gYCR7eX0ke219JHtkfWBcbiAgfVxuXG4gIGZ1bmN0aW9uIG5lcmFsaWUgKGQgPSBuZXcgRGF0ZSgpLCBlID0gbmV3IERhdGUoZCkpIHtcbiAgICBjb25zdCBtcyA9IGUgLSBkLnNldEhvdXJzKDAsIDAsIDAsIDApXG4gICAgcmV0dXJuIChtcyAvIDg2NDAgLyAxMDAwMCkudG9GaXhlZCg2KS5zdWJzdHIoMiwgNilcbiAgfVxufVxuXG4vKioqIEVYUE9SVFMgRlJPTSBleHBvcnRzLWxvYWRlciAqKiovXG5leHBvcnQgZGVmYXVsdCBTb3VyY2U7XG4iLCIndXNlIHN0cmljdCdcblxuLyogZ2xvYmFsIGxvY2FsU3RvcmFnZSAqL1xuLyogZ2xvYmFsIEZpbGVSZWFkZXIgKi9cbi8qIGdsb2JhbCBET01QYXJzZXIgKi9cblxuZnVuY3Rpb24gVGhlbWUgKGNsaWVudCkge1xuICB0aGlzLmVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3R5bGUnKVxuICB0aGlzLmVsLnR5cGUgPSAndGV4dC9jc3MnXG5cbiAgdGhpcy5hY3RpdmUgPSB7fVxuICB0aGlzLmRlZmF1bHQgPSB7XG4gICAgYmFja2dyb3VuZDogJyNlZWVlZWUnLFxuICAgIGZfaGlnaDogJyMwYTBhMGEnLFxuICAgIGZfbWVkOiAnIzRhNGE0YScsXG4gICAgZl9sb3c6ICcjNmE2YTZhJyxcbiAgICBmX2ludjogJyMxMTExMTEnLFxuICAgIGJfaGlnaDogJyNhMWExYTEnLFxuICAgIGJfbWVkOiAnI2MxYzFjMScsXG4gICAgYl9sb3c6ICcjZmZmZmZmJyxcbiAgICBiX2ludjogJyNmZmI1NDUnXG4gIH1cblxuICAvLyBDYWxsYmFja3NcbiAgdGhpcy5vbkxvYWQgPSAoKSA9PiB7fVxuXG4gIHRoaXMuaW5zdGFsbCA9IChob3N0ID0gZG9jdW1lbnQuYm9keSkgPT4ge1xuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdkcmFnb3ZlcicsIHRoaXMuZHJhZylcbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignZHJvcCcsIHRoaXMuZHJvcClcbiAgICBob3N0LmFwcGVuZENoaWxkKHRoaXMuZWwpXG4gIH1cblxuICB0aGlzLnN0YXJ0ID0gKCkgPT4ge1xuICAgIGNvbnNvbGUubG9nKCdUaGVtZScsICdTdGFydGluZy4uJylcbiAgICBpZiAoaXNKc29uKGxvY2FsU3RvcmFnZS50aGVtZSkpIHtcbiAgICAgIGNvbnN0IHN0b3JhZ2UgPSBKU09OLnBhcnNlKGxvY2FsU3RvcmFnZS50aGVtZSlcbiAgICAgIGlmIChpc1ZhbGlkKHN0b3JhZ2UpKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKCdUaGVtZScsICdMb2FkaW5nIHRoZW1lIGluIGxvY2FsU3RvcmFnZS4uJylcbiAgICAgICAgdGhpcy5sb2FkKHN0b3JhZ2UpXG4gICAgICAgIHJldHVyblxuICAgICAgfVxuICAgIH1cbiAgICB0aGlzLmxvYWQodGhpcy5kZWZhdWx0KVxuICB9XG5cbiAgdGhpcy5vcGVuID0gKCkgPT4ge1xuICAgIGNvbnNvbGUubG9nKCdUaGVtZScsICdPcGVuIHRoZW1lLi4nKVxuICAgIGNvbnN0IGlucHV0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW5wdXQnKVxuICAgIGlucHV0LnR5cGUgPSAnZmlsZSdcbiAgICBpbnB1dC5vbmNoYW5nZSA9IChlKSA9PiB7XG4gICAgICB0aGlzLnJlYWQoZS50YXJnZXQuZmlsZXNbMF0sIHRoaXMubG9hZClcbiAgICB9XG4gICAgaW5wdXQuY2xpY2soKVxuICB9XG5cbiAgdGhpcy5sb2FkID0gKGRhdGEpID0+IHtcbiAgICBjb25zdCB0aGVtZSA9IHRoaXMucGFyc2UoZGF0YSlcbiAgICBpZiAoIWlzVmFsaWQodGhlbWUpKSB7IGNvbnNvbGUud2FybignVGhlbWUnLCAnSW52YWxpZCBmb3JtYXQnKTsgcmV0dXJuIH1cbiAgICBjb25zb2xlLmxvZygnVGhlbWUnLCAnTG9hZGVkIHRoZW1lIScpXG4gICAgdGhpcy5lbC5pbm5lckhUTUwgPSBgOnJvb3QgeyBcbiAgICAgIC0tYmFja2dyb3VuZDogJHt0aGVtZS5iYWNrZ3JvdW5kfTsgXG4gICAgICAtLWZfaGlnaDogJHt0aGVtZS5mX2hpZ2h9OyBcbiAgICAgIC0tZl9tZWQ6ICR7dGhlbWUuZl9tZWR9OyBcbiAgICAgIC0tZl9sb3c6ICR7dGhlbWUuZl9sb3d9OyBcbiAgICAgIC0tZl9pbnY6ICR7dGhlbWUuZl9pbnZ9OyBcbiAgICAgIC0tYl9oaWdoOiAke3RoZW1lLmJfaGlnaH07IFxuICAgICAgLS1iX21lZDogJHt0aGVtZS5iX21lZH07IFxuICAgICAgLS1iX2xvdzogJHt0aGVtZS5iX2xvd307IFxuICAgICAgLS1iX2ludjogJHt0aGVtZS5iX2ludn07XG4gICAgfWBcbiAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgndGhlbWUnLCBKU09OLnN0cmluZ2lmeSh0aGVtZSkpXG4gICAgdGhpcy5hY3RpdmUgPSB0aGVtZVxuICAgIGlmICh0aGlzLm9uTG9hZCkge1xuICAgICAgdGhpcy5vbkxvYWQoZGF0YSlcbiAgICB9XG4gIH1cblxuICB0aGlzLnJlc2V0ID0gKCkgPT4ge1xuICAgIHRoaXMubG9hZCh0aGlzLmRlZmF1bHQpXG4gIH1cblxuICB0aGlzLnNldCA9IChrZXksIHZhbCkgPT4ge1xuICAgIGlmICghdmFsKSB7IHJldHVybiB9XG4gICAgY29uc3QgaGV4ID0gKGAke3ZhbH1gLnN1YnN0cigwLCAxKSAhPT0gJyMnID8gJyMnIDogJycpICsgYCR7dmFsfWBcbiAgICBpZiAoIWlzQ29sb3IoaGV4KSkgeyBjb25zb2xlLndhcm4oJ1RoZW1lJywgYCR7aGV4fSBpcyBub3QgYSB2YWxpZCBjb2xvci5gKTsgcmV0dXJuIH1cbiAgICB0aGlzLmFjdGl2ZVtrZXldID0gaGV4XG4gIH1cblxuICB0aGlzLnJlYWQgPSAoa2V5KSA9PiB7XG4gICAgcmV0dXJuIHRoaXMuYWN0aXZlW2tleV1cbiAgfVxuXG4gIHRoaXMucGFyc2UgPSAoYW55KSA9PiB7XG4gICAgaWYgKGlzVmFsaWQoYW55KSkgeyByZXR1cm4gYW55IH1cbiAgICBpZiAoaXNKc29uKGFueSkpIHsgcmV0dXJuIEpTT04ucGFyc2UoYW55KSB9XG4gICAgaWYgKGlzSHRtbChhbnkpKSB7IHJldHVybiBleHRyYWN0KGFueSkgfVxuICB9XG5cbiAgLy8gRHJhZ1xuXG4gIHRoaXMuZHJhZyA9IChlKSA9PiB7XG4gICAgZS5zdG9wUHJvcGFnYXRpb24oKVxuICAgIGUucHJldmVudERlZmF1bHQoKVxuICAgIGUuZGF0YVRyYW5zZmVyLmRyb3BFZmZlY3QgPSAnY29weSdcbiAgfVxuXG4gIHRoaXMuZHJvcCA9IChlKSA9PiB7XG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpXG4gICAgY29uc3QgZmlsZSA9IGUuZGF0YVRyYW5zZmVyLmZpbGVzWzBdXG4gICAgaWYgKGZpbGUubmFtZS5pbmRleE9mKCcuc3ZnJykgPiAtMSkge1xuICAgICAgdGhpcy5yZWFkKGZpbGUsIHRoaXMubG9hZClcbiAgICB9XG4gICAgZS5zdG9wUHJvcGFnYXRpb24oKVxuICB9XG5cbiAgdGhpcy5yZWFkID0gKGZpbGUsIGNhbGxiYWNrKSA9PiB7XG4gICAgY29uc3QgcmVhZGVyID0gbmV3IEZpbGVSZWFkZXIoKVxuICAgIHJlYWRlci5vbmxvYWQgPSAoZXZlbnQpID0+IHtcbiAgICAgIGNhbGxiYWNrKGV2ZW50LnRhcmdldC5yZXN1bHQpXG4gICAgfVxuICAgIHJlYWRlci5yZWFkQXNUZXh0KGZpbGUsICdVVEYtOCcpXG4gIH1cblxuICAvLyBIZWxwZXJzXG5cbiAgZnVuY3Rpb24gZXh0cmFjdCAoeG1sKSB7XG4gICAgY29uc3Qgc3ZnID0gbmV3IERPTVBhcnNlcigpLnBhcnNlRnJvbVN0cmluZyh4bWwsICd0ZXh0L3htbCcpXG4gICAgdHJ5IHtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIGJhY2tncm91bmQ6IHN2Zy5nZXRFbGVtZW50QnlJZCgnYmFja2dyb3VuZCcpLmdldEF0dHJpYnV0ZSgnZmlsbCcpLFxuICAgICAgICBmX2hpZ2g6IHN2Zy5nZXRFbGVtZW50QnlJZCgnZl9oaWdoJykuZ2V0QXR0cmlidXRlKCdmaWxsJyksXG4gICAgICAgIGZfbWVkOiBzdmcuZ2V0RWxlbWVudEJ5SWQoJ2ZfbWVkJykuZ2V0QXR0cmlidXRlKCdmaWxsJyksXG4gICAgICAgIGZfbG93OiBzdmcuZ2V0RWxlbWVudEJ5SWQoJ2ZfbG93JykuZ2V0QXR0cmlidXRlKCdmaWxsJyksXG4gICAgICAgIGZfaW52OiBzdmcuZ2V0RWxlbWVudEJ5SWQoJ2ZfaW52JykuZ2V0QXR0cmlidXRlKCdmaWxsJyksXG4gICAgICAgIGJfaGlnaDogc3ZnLmdldEVsZW1lbnRCeUlkKCdiX2hpZ2gnKS5nZXRBdHRyaWJ1dGUoJ2ZpbGwnKSxcbiAgICAgICAgYl9tZWQ6IHN2Zy5nZXRFbGVtZW50QnlJZCgnYl9tZWQnKS5nZXRBdHRyaWJ1dGUoJ2ZpbGwnKSxcbiAgICAgICAgYl9sb3c6IHN2Zy5nZXRFbGVtZW50QnlJZCgnYl9sb3cnKS5nZXRBdHRyaWJ1dGUoJ2ZpbGwnKSxcbiAgICAgICAgYl9pbnY6IHN2Zy5nZXRFbGVtZW50QnlJZCgnYl9pbnYnKS5nZXRBdHRyaWJ1dGUoJ2ZpbGwnKVxuICAgICAgfVxuICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgY29uc29sZS53YXJuKCdUaGVtZScsICdJbmNvbXBsZXRlIFNWRyBUaGVtZScsIGVycilcbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiBpc1ZhbGlkIChqc29uKSB7XG4gICAgaWYgKCFqc29uKSB7IHJldHVybiBmYWxzZSB9XG4gICAgaWYgKCFqc29uLmJhY2tncm91bmQgfHwgIWlzQ29sb3IoanNvbi5iYWNrZ3JvdW5kKSkgeyByZXR1cm4gZmFsc2UgfVxuICAgIGlmICghanNvbi5mX2hpZ2ggfHwgIWlzQ29sb3IoanNvbi5mX2hpZ2gpKSB7IHJldHVybiBmYWxzZSB9XG4gICAgaWYgKCFqc29uLmZfbWVkIHx8ICFpc0NvbG9yKGpzb24uZl9tZWQpKSB7IHJldHVybiBmYWxzZSB9XG4gICAgaWYgKCFqc29uLmZfbG93IHx8ICFpc0NvbG9yKGpzb24uZl9sb3cpKSB7IHJldHVybiBmYWxzZSB9XG4gICAgaWYgKCFqc29uLmZfaW52IHx8ICFpc0NvbG9yKGpzb24uZl9pbnYpKSB7IHJldHVybiBmYWxzZSB9XG4gICAgaWYgKCFqc29uLmJfaGlnaCB8fCAhaXNDb2xvcihqc29uLmJfaGlnaCkpIHsgcmV0dXJuIGZhbHNlIH1cbiAgICBpZiAoIWpzb24uYl9tZWQgfHwgIWlzQ29sb3IoanNvbi5iX21lZCkpIHsgcmV0dXJuIGZhbHNlIH1cbiAgICBpZiAoIWpzb24uYl9sb3cgfHwgIWlzQ29sb3IoanNvbi5iX2xvdykpIHsgcmV0dXJuIGZhbHNlIH1cbiAgICBpZiAoIWpzb24uYl9pbnYgfHwgIWlzQ29sb3IoanNvbi5iX2ludikpIHsgcmV0dXJuIGZhbHNlIH1cbiAgICByZXR1cm4gdHJ1ZVxuICB9XG5cbiAgZnVuY3Rpb24gaXNDb2xvciAoaGV4KSB7XG4gICAgcmV0dXJuIC9eIyhbMC05QS1GXXszfSl7MSwyfSQvaS50ZXN0KGhleClcbiAgfVxuXG4gIGZ1bmN0aW9uIGlzSnNvbiAodGV4dCkge1xuICAgIHRyeSB7IEpTT04ucGFyc2UodGV4dCk7IHJldHVybiB0cnVlIH0gY2F0Y2ggKGVycm9yKSB7IHJldHVybiBmYWxzZSB9XG4gIH1cblxuICBmdW5jdGlvbiBpc0h0bWwgKHRleHQpIHtcbiAgICB0cnkgeyBuZXcgRE9NUGFyc2VyKCkucGFyc2VGcm9tU3RyaW5nKHRleHQsICd0ZXh0L3htbCcpOyByZXR1cm4gdHJ1ZSB9IGNhdGNoIChlcnJvcikgeyByZXR1cm4gZmFsc2UgfVxuICB9XG59XG5cbi8qKiogRVhQT1JUUyBGUk9NIGV4cG9ydHMtbG9hZGVyICoqKi9cbmV4cG9ydCBkZWZhdWx0IFRoZW1lO1xuIiwiLyoqKiBJTVBPUlRTIEZST00gaW1wb3J0cy1sb2FkZXIgKioqL1xuJ3VzZSBzdHJpY3QnO1xuaW1wb3J0IGxpYnJhcnkgZnJvbSBcIi4vY29yZS9saWJyYXJ5LmpzXCI7XG5pbXBvcnQgQWNlbHMgZnJvbSBcIi4vbGliL2FjZWxzLmpzXCI7XG5pbXBvcnQgU291cmNlIGZyb20gXCIuL2xpYi9zb3VyY2UuanNcIjtcbmltcG9ydCBIaXN0b3J5IGZyb20gXCIuL2xpYi9oaXN0b3J5LmpzXCI7XG5pbXBvcnQgT3JjYSBmcm9tIFwiLi9jb3JlL29yY2EuanNcIjtcbmltcG9ydCBJTyBmcm9tIFwiLi9jb3JlL2lvLmpzXCI7XG5pbXBvcnQgQ3Vyc29yIGZyb20gXCIuL2N1cnNvci5qc1wiO1xuaW1wb3J0IENvbW1hbmRlciBmcm9tIFwiLi9jb21tYW5kZXIuanNcIjtcbmltcG9ydCBDbG9jayBmcm9tIFwiLi9jbG9jay5qc1wiO1xuaW1wb3J0IFRoZW1lIGZyb20gXCIuL2xpYi90aGVtZS5qc1wiO1xuXG4ndXNlIHN0cmljdCdcblxuLyogZ2xvYmFsIGxpYnJhcnkgKi9cbi8qIGdsb2JhbCBBY2VscyAqL1xuLyogZ2xvYmFsIFNvdXJjZSAqL1xuLyogZ2xvYmFsIEhpc3RvcnkgKi9cbi8qIGdsb2JhbCBPcmNhICovXG4vKiBnbG9iYWwgSU8gKi9cbi8qIGdsb2JhbCBDdXJzb3IgKi9cbi8qIGdsb2JhbCBDb21tYW5kZXIgKi9cbi8qIGdsb2JhbCBDbG9jayAqL1xuLyogZ2xvYmFsIFRoZW1lICovXG5cbmZ1bmN0aW9uIENsaWVudCAoKSB7XG4gIHRoaXMudmVyc2lvbiA9IDE3NlxuICB0aGlzLmxpYnJhcnkgPSBsaWJyYXJ5XG5cbiAgdGhpcy50aGVtZSA9IG5ldyBUaGVtZSh0aGlzKVxuICB0aGlzLmFjZWxzID0gbmV3IEFjZWxzKHRoaXMpXG4gIHRoaXMuc291cmNlID0gbmV3IFNvdXJjZSh0aGlzKVxuICB0aGlzLmhpc3RvcnkgPSBuZXcgSGlzdG9yeSh0aGlzKVxuXG4gIHRoaXMub3JjYSA9IG5ldyBPcmNhKHRoaXMubGlicmFyeSlcbiAgdGhpcy5pbyA9IG5ldyBJTyh0aGlzKVxuICB0aGlzLmN1cnNvciA9IG5ldyBDdXJzb3IodGhpcylcbiAgdGhpcy5jb21tYW5kZXIgPSBuZXcgQ29tbWFuZGVyKHRoaXMpXG4gIHRoaXMuY2xvY2sgPSBuZXcgQ2xvY2sodGhpcylcblxuICAvLyBTZXR0aW5nc1xuICB0aGlzLnNjYWxlID0gd2luZG93LmRldmljZVBpeGVsUmF0aW9cbiAgdGhpcy5ncmlkID0geyB3OiA4LCBoOiA4IH1cbiAgdGhpcy50aWxlID0ge1xuICAgIHc6ICtsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgndGlsZXcnKSB8fCAxMCxcbiAgICBoOiArbG9jYWxTdG9yYWdlLmdldEl0ZW0oJ3RpbGVoJykgfHwgMTVcbiAgfVxuICB0aGlzLmd1aWRlID0gZmFsc2VcblxuICB0aGlzLmVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnY2FudmFzJylcbiAgdGhpcy5jb250ZXh0ID0gdGhpcy5lbC5nZXRDb250ZXh0KCcyZCcpXG5cbiAgdGhpcy5pbnN0YWxsID0gKGhvc3QpID0+IHtcbiAgICBob3N0LmFwcGVuZENoaWxkKHRoaXMuZWwpXG4gICAgdGhpcy50aGVtZS5pbnN0YWxsKGhvc3QpXG5cbiAgICB0aGlzLnRoZW1lLmRlZmF1bHQgPSB7IGJhY2tncm91bmQ6ICcjMDAwMDAwJywgZl9oaWdoOiAnI2ZmZmZmZicsIGZfbWVkOiAnIzc3Nzc3NycsIGZfbG93OiAnIzQ0NDQ0NCcsIGZfaW52OiAnIzAwMDAwMCcsIGJfaGlnaDogJyNlZWVlZWUnLCBiX21lZDogJyM3MmRlYzInLCBiX2xvdzogJyM0NDQ0NDQnLCBiX2ludjogJyNmZmI1NDUnIH1cblxuICAgIHRoaXMuYWNlbHMuc2V0KCdGaWxlJywgJ05ldycsICdDbWRPckN0cmwrTicsICgpID0+IHsgdGhpcy5yZXNldCgpIH0pXG4gICAgdGhpcy5hY2Vscy5zZXQoJ0ZpbGUnLCAnT3BlbicsICdDbWRPckN0cmwrTycsICgpID0+IHsgdGhpcy5zb3VyY2Uub3Blbignb3JjYScsIHRoaXMud2hlbk9wZW4sIHRydWUpIH0pXG4gICAgdGhpcy5hY2Vscy5zZXQoJ0ZpbGUnLCAnSW1wb3J0IE1vZHVsZXMnLCAnQ21kT3JDdHJsK0wnLCAoKSA9PiB7IHRoaXMuc291cmNlLmxvYWQoJ29yY2EnKSB9KVxuICAgIHRoaXMuYWNlbHMuc2V0KCdGaWxlJywgJ0V4cG9ydCcsICdDbWRPckN0cmwrUycsICgpID0+IHsgdGhpcy5zb3VyY2Uud3JpdGUoJ29yY2EnLCAnb3JjYScsIGAke3RoaXMub3JjYX1gLCAndGV4dC9wbGFpbicpIH0pXG4gICAgdGhpcy5hY2Vscy5zZXQoJ0ZpbGUnLCAnRXhwb3J0IFNlbGVjdGlvbicsICdDbWRPckN0cmwrU2hpZnQrUycsICgpID0+IHsgdGhpcy5zb3VyY2Uud3JpdGUoJ29yY2EnLCAnb3JjYScsIGAke3RoaXMuY3Vyc29yLnNlbGVjdGlvbigpfWAsICd0ZXh0L3BsYWluJykgfSlcblxuICAgIHRoaXMuYWNlbHMuc2V0KCdFZGl0JywgJ1VuZG8nLCAnQ21kT3JDdHJsK1onLCAoKSA9PiB7IHRoaXMuaGlzdG9yeS51bmRvKCkgfSlcbiAgICB0aGlzLmFjZWxzLnNldCgnRWRpdCcsICdSZWRvJywgJ0NtZE9yQ3RybCtTaGlmdCtaJywgKCkgPT4geyB0aGlzLmhpc3RvcnkucmVkbygpIH0pXG4gICAgdGhpcy5hY2Vscy5hZGQoJ0VkaXQnLCAnY3V0JylcbiAgICB0aGlzLmFjZWxzLmFkZCgnRWRpdCcsICdjb3B5JylcbiAgICB0aGlzLmFjZWxzLmFkZCgnRWRpdCcsICdwYXN0ZScpXG4gICAgdGhpcy5hY2Vscy5zZXQoJ0VkaXQnLCAnU2VsZWN0IEFsbCcsICdDbWRPckN0cmwrQScsICgpID0+IHsgdGhpcy5jdXJzb3Iuc2VsZWN0QWxsKCkgfSlcbiAgICB0aGlzLmFjZWxzLnNldCgnRWRpdCcsICdFcmFzZSBTZWxlY3Rpb24nLCAnQmFja3NwYWNlJywgKCkgPT4geyBpZiAodGhpcy5jdXJzb3IuaW5zKSB7IHRoaXMuY3Vyc29yLmVyYXNlKCk7IHRoaXMuY3Vyc29yLm1vdmUoLTEsIDApIH0gZWxzZSB7IHRoaXNbdGhpcy5jb21tYW5kZXIuaXNBY3RpdmUgPyAnY29tbWFuZGVyJyA6ICdjdXJzb3InXS5lcmFzZSgpIH0gfSlcbiAgICB0aGlzLmFjZWxzLnNldCgnRWRpdCcsICdVcHBlcmNhc2UnLCAnQ21kT3JDdHJsK1NoaWZ0K1UnLCAoKSA9PiB7IHRoaXMuY3Vyc29yLnRvVXBwZXJDYXNlKCkgfSlcbiAgICB0aGlzLmFjZWxzLnNldCgnRWRpdCcsICdMb3dlcmNhc2UnLCAnQ21kT3JDdHJsK1NoaWZ0K0wnLCAoKSA9PiB7IHRoaXMuY3Vyc29yLnRvTG93ZXJDYXNlKCkgfSlcbiAgICB0aGlzLmFjZWxzLnNldCgnRWRpdCcsICdEcmFnIE5vcnRoJywgJ0FsdCtBcnJvd1VwJywgKCkgPT4geyB0aGlzLmN1cnNvci5kcmFnKDAsIDEpIH0pXG4gICAgdGhpcy5hY2Vscy5zZXQoJ0VkaXQnLCAnRHJhZyBFYXN0JywgJ0FsdCtBcnJvd1JpZ2h0JywgKCkgPT4geyB0aGlzLmN1cnNvci5kcmFnKDEsIDApIH0pXG4gICAgdGhpcy5hY2Vscy5zZXQoJ0VkaXQnLCAnRHJhZyBTb3V0aCcsICdBbHQrQXJyb3dEb3duJywgKCkgPT4geyB0aGlzLmN1cnNvci5kcmFnKDAsIC0xKSB9KVxuICAgIHRoaXMuYWNlbHMuc2V0KCdFZGl0JywgJ0RyYWcgV2VzdCcsICdBbHQrQXJyb3dMZWZ0JywgKCkgPT4geyB0aGlzLmN1cnNvci5kcmFnKC0xLCAwKSB9KVxuICAgIHRoaXMuYWNlbHMuc2V0KCdFZGl0JywgJ0RyYWcgTm9ydGgoTGVhcCknLCAnQ21kT3JDdHJsK0FsdCtBcnJvd1VwJywgKCkgPT4geyB0aGlzLmN1cnNvci5kcmFnKDAsIHRoaXMuZ3JpZC5oKSB9KVxuICAgIHRoaXMuYWNlbHMuc2V0KCdFZGl0JywgJ0RyYWcgRWFzdChMZWFwKScsICdDbWRPckN0cmwrQWx0K0Fycm93UmlnaHQnLCAoKSA9PiB7IHRoaXMuY3Vyc29yLmRyYWcodGhpcy5ncmlkLncsIDApIH0pXG4gICAgdGhpcy5hY2Vscy5zZXQoJ0VkaXQnLCAnRHJhZyBTb3V0aChMZWFwKScsICdDbWRPckN0cmwrQWx0K0Fycm93RG93bicsICgpID0+IHsgdGhpcy5jdXJzb3IuZHJhZygwLCAtdGhpcy5ncmlkLmgpIH0pXG4gICAgdGhpcy5hY2Vscy5zZXQoJ0VkaXQnLCAnRHJhZyBXZXN0KExlYXApJywgJ0NtZE9yQ3RybCtBbHQrQXJyb3dMZWZ0JywgKCkgPT4geyB0aGlzLmN1cnNvci5kcmFnKC10aGlzLmdyaWQudywgMCkgfSlcblxuICAgIHRoaXMuYWNlbHMuc2V0KCdQcm9qZWN0JywgJ0ZpbmQnLCAnQ21kT3JDdHJsK0onLCAoKSA9PiB7IHRoaXMuY29tbWFuZGVyLnN0YXJ0KCdmaW5kOicpIH0pXG4gICAgdGhpcy5hY2Vscy5zZXQoJ1Byb2plY3QnLCAnSW5qZWN0JywgJ0NtZE9yQ3RybCtCJywgKCkgPT4geyB0aGlzLmNvbW1hbmRlci5zdGFydCgnaW5qZWN0OicpIH0pXG4gICAgdGhpcy5hY2Vscy5zZXQoJ1Byb2plY3QnLCAnVG9nZ2xlIENvbW1hbmRlcicsICdDbWRPckN0cmwrSycsICgpID0+IHsgdGhpcy5jb21tYW5kZXIuc3RhcnQoKSB9KVxuICAgIHRoaXMuYWNlbHMuc2V0KCdQcm9qZWN0JywgJ1J1biBDb21tYW5kZXInLCAnRW50ZXInLCAoKSA9PiB7IHRoaXMuY29tbWFuZGVyLnJ1bigpIH0pXG5cbiAgICB0aGlzLmFjZWxzLnNldCgnQ3Vyc29yJywgJ1RvZ2dsZSBJbnNlcnQgTW9kZScsICdDbWRPckN0cmwrSScsICgpID0+IHsgdGhpcy5jdXJzb3IuaW5zID0gIXRoaXMuY3Vyc29yLmlucyB9KVxuICAgIHRoaXMuYWNlbHMuc2V0KCdDdXJzb3InLCAnVG9nZ2xlIEJsb2NrIENvbW1lbnQnLCAnQ21kT3JDdHJsKy8nLCAoKSA9PiB7IHRoaXMuY3Vyc29yLmNvbW1lbnQoKSB9KVxuICAgIHRoaXMuYWNlbHMuc2V0KCdDdXJzb3InLCAnVHJpZ2dlciBPcGVyYXRvcicsICdDbWRPckN0cmwrUCcsICgpID0+IHsgdGhpcy5jdXJzb3IudHJpZ2dlcigpIH0pXG4gICAgdGhpcy5hY2Vscy5zZXQoJ0N1cnNvcicsICdSZXNldCcsICdFc2NhcGUnLCAoKSA9PiB7IHRoaXMudG9nZ2xlR3VpZGUoZmFsc2UpOyB0aGlzLmNvbW1hbmRlci5zdG9wKCk7IHRoaXMuY2xlYXIoKTsgdGhpcy5jbG9jay5pc1BhdXNlZCA9IGZhbHNlOyB0aGlzLmN1cnNvci5yZXNldCgpIH0pXG5cbiAgICB0aGlzLmFjZWxzLnNldCgnTW92ZScsICdNb3ZlIE5vcnRoJywgJ0Fycm93VXAnLCAoKSA9PiB7IHRoaXMuY3Vyc29yLm1vdmUoMCwgMSkgfSlcbiAgICB0aGlzLmFjZWxzLnNldCgnTW92ZScsICdNb3ZlIEVhc3QnLCAnQXJyb3dSaWdodCcsICgpID0+IHsgdGhpcy5jdXJzb3IubW92ZSgxLCAwKSB9KVxuICAgIHRoaXMuYWNlbHMuc2V0KCdNb3ZlJywgJ01vdmUgU291dGgnLCAnQXJyb3dEb3duJywgKCkgPT4geyB0aGlzLmN1cnNvci5tb3ZlKDAsIC0xKSB9KVxuICAgIHRoaXMuYWNlbHMuc2V0KCdNb3ZlJywgJ01vdmUgV2VzdCcsICdBcnJvd0xlZnQnLCAoKSA9PiB7IHRoaXMuY3Vyc29yLm1vdmUoLTEsIDApIH0pXG4gICAgdGhpcy5hY2Vscy5zZXQoJ01vdmUnLCAnTW92ZSBOb3J0aChMZWFwKScsICdDbWRPckN0cmwrQXJyb3dVcCcsICgpID0+IHsgdGhpcy5jdXJzb3IubW92ZSgwLCB0aGlzLmdyaWQuaCkgfSlcbiAgICB0aGlzLmFjZWxzLnNldCgnTW92ZScsICdNb3ZlIEVhc3QoTGVhcCknLCAnQ21kT3JDdHJsK0Fycm93UmlnaHQnLCAoKSA9PiB7IHRoaXMuY3Vyc29yLm1vdmUodGhpcy5ncmlkLncsIDApIH0pXG4gICAgdGhpcy5hY2Vscy5zZXQoJ01vdmUnLCAnTW92ZSBTb3V0aChMZWFwKScsICdDbWRPckN0cmwrQXJyb3dEb3duJywgKCkgPT4geyB0aGlzLmN1cnNvci5tb3ZlKDAsIC10aGlzLmdyaWQuaCkgfSlcbiAgICB0aGlzLmFjZWxzLnNldCgnTW92ZScsICdNb3ZlIFdlc3QoTGVhcCknLCAnQ21kT3JDdHJsK0Fycm93TGVmdCcsICgpID0+IHsgdGhpcy5jdXJzb3IubW92ZSgtdGhpcy5ncmlkLncsIDApIH0pXG4gICAgdGhpcy5hY2Vscy5zZXQoJ01vdmUnLCAnU2NhbGUgTm9ydGgnLCAnU2hpZnQrQXJyb3dVcCcsICgpID0+IHsgdGhpcy5jdXJzb3Iuc2NhbGUoMCwgMSkgfSlcbiAgICB0aGlzLmFjZWxzLnNldCgnTW92ZScsICdTY2FsZSBFYXN0JywgJ1NoaWZ0K0Fycm93UmlnaHQnLCAoKSA9PiB7IHRoaXMuY3Vyc29yLnNjYWxlKDEsIDApIH0pXG4gICAgdGhpcy5hY2Vscy5zZXQoJ01vdmUnLCAnU2NhbGUgU291dGgnLCAnU2hpZnQrQXJyb3dEb3duJywgKCkgPT4geyB0aGlzLmN1cnNvci5zY2FsZSgwLCAtMSkgfSlcbiAgICB0aGlzLmFjZWxzLnNldCgnTW92ZScsICdTY2FsZSBXZXN0JywgJ1NoaWZ0K0Fycm93TGVmdCcsICgpID0+IHsgdGhpcy5jdXJzb3Iuc2NhbGUoLTEsIDApIH0pXG4gICAgdGhpcy5hY2Vscy5zZXQoJ01vdmUnLCAnU2NhbGUgTm9ydGgoTGVhcCknLCAnQ21kT3JDdHJsK1NoaWZ0K0Fycm93VXAnLCAoKSA9PiB7IHRoaXMuY3Vyc29yLnNjYWxlKDAsIHRoaXMuZ3JpZC5oKSB9KVxuICAgIHRoaXMuYWNlbHMuc2V0KCdNb3ZlJywgJ1NjYWxlIEVhc3QoTGVhcCknLCAnQ21kT3JDdHJsK1NoaWZ0K0Fycm93UmlnaHQnLCAoKSA9PiB7IHRoaXMuY3Vyc29yLnNjYWxlKHRoaXMuZ3JpZC53LCAwKSB9KVxuICAgIHRoaXMuYWNlbHMuc2V0KCdNb3ZlJywgJ1NjYWxlIFNvdXRoKExlYXApJywgJ0NtZE9yQ3RybCtTaGlmdCtBcnJvd0Rvd24nLCAoKSA9PiB7IHRoaXMuY3Vyc29yLnNjYWxlKDAsIC10aGlzLmdyaWQuaCkgfSlcbiAgICB0aGlzLmFjZWxzLnNldCgnTW92ZScsICdTY2FsZSBXZXN0KExlYXApJywgJ0NtZE9yQ3RybCtTaGlmdCtBcnJvd0xlZnQnLCAoKSA9PiB7IHRoaXMuY3Vyc29yLnNjYWxlKC10aGlzLmdyaWQudywgMCkgfSlcblxuICAgIHRoaXMuYWNlbHMuc2V0KCdDbG9jaycsICdQbGF5L1BhdXNlJywgJ1NwYWNlJywgKCkgPT4geyBpZiAodGhpcy5jdXJzb3IuaW5zKSB7IHRoaXMuY3Vyc29yLm1vdmUoMSwgMCkgfSBlbHNlIHsgdGhpcy5jbG9jay50b2dnbGVQbGF5KGZhbHNlKSB9IH0pXG4gICAgdGhpcy5hY2Vscy5zZXQoJ0Nsb2NrJywgJ0ZyYW1lIEJ5IEZyYW1lJywgJ0NtZE9yQ3RybCtGJywgKCkgPT4geyB0aGlzLmNsb2NrLnRvdWNoKCkgfSlcbiAgICB0aGlzLmFjZWxzLnNldCgnQ2xvY2snLCAnUmVzZXQgRnJhbWUnLCAnQ21kT3JDdHJsK1NoaWZ0K1InLCAoKSA9PiB7IHRoaXMuY2xvY2suc2V0RnJhbWUoMCkgfSlcbiAgICB0aGlzLmFjZWxzLnNldCgnQ2xvY2snLCAnSW5jci4gU3BlZWQnLCAnPicsICgpID0+IHsgdGhpcy5jbG9jay5tb2RTcGVlZCgxKSB9KVxuICAgIHRoaXMuYWNlbHMuc2V0KCdDbG9jaycsICdEZWNyLiBTcGVlZCcsICc8JywgKCkgPT4geyB0aGlzLmNsb2NrLm1vZFNwZWVkKC0xKSB9KVxuICAgIHRoaXMuYWNlbHMuc2V0KCdDbG9jaycsICdJbmNyLiBTcGVlZCgxMHgpJywgJ0NtZE9yQ3RybCs+JywgKCkgPT4geyB0aGlzLmNsb2NrLm1vZFNwZWVkKDEwLCB0cnVlKSB9KVxuICAgIHRoaXMuYWNlbHMuc2V0KCdDbG9jaycsICdEZWNyLiBTcGVlZCgxMHgpJywgJ0NtZE9yQ3RybCs8JywgKCkgPT4geyB0aGlzLmNsb2NrLm1vZFNwZWVkKC0xMCwgdHJ1ZSkgfSlcblxuICAgIHRoaXMuYWNlbHMuc2V0KCdWaWV3JywgJ1RvZ2dsZSBSZXRpbmEnLCAnVGFiJywgKCkgPT4geyB0aGlzLnRvZ2dsZVJldGluYSgpIH0pXG4gICAgdGhpcy5hY2Vscy5zZXQoJ1ZpZXcnLCAnVG9nZ2xlIEd1aWRlJywgJ0NtZE9yQ3RybCtHJywgKCkgPT4geyB0aGlzLnRvZ2dsZUd1aWRlKCkgfSlcbiAgICB0aGlzLmFjZWxzLnNldCgnVmlldycsICdJbmNyLiBDb2wnLCAnXScsICgpID0+IHsgdGhpcy5tb2RHcmlkKDEsIDApIH0pXG4gICAgdGhpcy5hY2Vscy5zZXQoJ1ZpZXcnLCAnRGVjci4gQ29sJywgJ1snLCAoKSA9PiB7IHRoaXMubW9kR3JpZCgtMSwgMCkgfSlcbiAgICB0aGlzLmFjZWxzLnNldCgnVmlldycsICdJbmNyLiBSb3cnLCAnfScsICgpID0+IHsgdGhpcy5tb2RHcmlkKDAsIDEpIH0pXG4gICAgdGhpcy5hY2Vscy5zZXQoJ1ZpZXcnLCAnRGVjci4gUm93JywgJ3snLCAoKSA9PiB7IHRoaXMubW9kR3JpZCgwLCAtMSkgfSlcbiAgICB0aGlzLmFjZWxzLnNldCgnVmlldycsICdab29tIEluJywgJ0NtZE9yQ3RybCs9JywgKCkgPT4geyB0aGlzLm1vZFpvb20oMC4wNjI1KSB9KVxuICAgIHRoaXMuYWNlbHMuc2V0KCdWaWV3JywgJ1pvb20gT3V0JywgJ0NtZE9yQ3RybCstJywgKCkgPT4geyB0aGlzLm1vZFpvb20oLTAuMDYyNSkgfSlcbiAgICB0aGlzLmFjZWxzLnNldCgnVmlldycsICdab29tIFJlc2V0JywgJ0NtZE9yQ3RybCswJywgKCkgPT4geyB0aGlzLm1vZFpvb20oMSwgdHJ1ZSkgfSlcblxuICAgIHRoaXMuYWNlbHMuc2V0KCdNaWRpJywgJ1BsYXkvUGF1c2UgTWlkaScsICdDbWRPckN0cmwrU3BhY2UnLCAoKSA9PiB7IHRoaXMuY2xvY2sudG9nZ2xlUGxheSh0cnVlKSB9KVxuICAgIHRoaXMuYWNlbHMuc2V0KCdNaWRpJywgJ05leHQgSW5wdXQgRGV2aWNlJywgJ0NtZE9yQ3RybCssJywgKCkgPT4geyB0aGlzLmNsb2NrLnNldEZyYW1lKDApOyB0aGlzLmlvLm1pZGkuc2VsZWN0TmV4dElucHV0KCkgfSlcbiAgICB0aGlzLmFjZWxzLnNldCgnTWlkaScsICdOZXh0IE91dHB1dCBEZXZpY2UnLCAnQ21kT3JDdHJsKy4nLCAoKSA9PiB7IHRoaXMuY2xvY2suc2V0RnJhbWUoMCk7IHRoaXMuaW8ubWlkaS5zZWxlY3ROZXh0T3V0cHV0KCkgfSlcbiAgICB0aGlzLmFjZWxzLnNldCgnTWlkaScsICdSZWZyZXNoIERldmljZXMnLCAnQ21kT3JDdHJsK1NoaWZ0K00nLCAoKSA9PiB7IHRoaXMuaW8ubWlkaS5yZWZyZXNoKCkgfSlcblxuICAgIHRoaXMuYWNlbHMuc2V0KCdDb21tdW5pY2F0aW9uJywgJ0Nob29zZSBPU0MgUG9ydCcsICdhbHQrTycsICgpID0+IHsgdGhpcy5jb21tYW5kZXIuc3RhcnQoJ29zYzonKSB9KVxuICAgIHRoaXMuYWNlbHMuc2V0KCdDb21tdW5pY2F0aW9uJywgJ0Nob29zZSBVRFAgUG9ydCcsICdhbHQrVScsICgpID0+IHsgdGhpcy5jb21tYW5kZXIuc3RhcnQoJ3VkcDonKSB9KVxuXG4gICAgdGhpcy5hY2Vscy5pbnN0YWxsKHdpbmRvdylcbiAgICB0aGlzLmFjZWxzLnBpcGUodGhpcy5jb21tYW5kZXIpXG4gIH1cblxuICB0aGlzLnN0YXJ0ID0gKCkgPT4ge1xuICAgIGNvbnNvbGUuaW5mbygnQ2xpZW50JywgJ1N0YXJ0aW5nLi4nKVxuICAgIGNvbnNvbGUuaW5mbyhgJHt0aGlzLmFjZWxzfWApXG4gICAgdGhpcy50aGVtZS5zdGFydCgpXG4gICAgdGhpcy5pby5zdGFydCgpXG4gICAgdGhpcy5oaXN0b3J5LmJpbmQodGhpcy5vcmNhLCAncycpXG4gICAgdGhpcy5oaXN0b3J5LnJlY29yZCh0aGlzLm9yY2EucylcbiAgICB0aGlzLmNsb2NrLnN0YXJ0KClcbiAgICB0aGlzLmN1cnNvci5zdGFydCgpXG5cbiAgICB0aGlzLnJlc2V0KClcbiAgICB0aGlzLm1vZFpvb20oKVxuICAgIHRoaXMudXBkYXRlKClcbiAgICB0aGlzLmVsLmNsYXNzTmFtZSA9ICdyZWFkeSdcblxuICAgIHRoaXMudG9nZ2xlR3VpZGUoKVxuICB9XG5cbiAgdGhpcy5yZXNldCA9ICgpID0+IHtcbiAgICB0aGlzLm9yY2EucmVzZXQoKVxuICAgIHRoaXMucmVzaXplKClcbiAgICB0aGlzLnNvdXJjZS5uZXcoKVxuICAgIHRoaXMuaGlzdG9yeS5yZXNldCgpXG4gICAgdGhpcy5jdXJzb3IucmVzZXQoKVxuICAgIHRoaXMuY2xvY2sucGxheSgpXG4gIH1cblxuICB0aGlzLnJ1biA9ICgpID0+IHtcbiAgICB0aGlzLmlvLmNsZWFyKClcbiAgICB0aGlzLmNsb2NrLnJ1bigpXG4gICAgdGhpcy5vcmNhLnJ1bigpXG4gICAgdGhpcy5pby5ydW4oKVxuICAgIHRoaXMudXBkYXRlKClcbiAgfVxuXG4gIHRoaXMudXBkYXRlID0gKCkgPT4ge1xuICAgIGlmIChkb2N1bWVudC5oaWRkZW4gPT09IHRydWUpIHsgcmV0dXJuIH1cbiAgICB0aGlzLmNsZWFyKClcbiAgICB0aGlzLnBvcnRzID0gdGhpcy5maW5kUG9ydHMoKVxuICAgIHRoaXMuZHJhd1Byb2dyYW0oKVxuICAgIHRoaXMuZHJhd0ludGVyZmFjZSgpXG4gICAgdGhpcy5kcmF3R3VpZGUoKVxuICB9XG5cbiAgdGhpcy53aGVuT3BlbiA9IChmaWxlLCB0ZXh0KSA9PiB7XG4gICAgY29uc3QgbGluZXMgPSB0ZXh0LnRyaW0oKS5zcGxpdCgvXFxyP1xcbi8pXG4gICAgY29uc3QgdyA9IGxpbmVzWzBdLmxlbmd0aFxuICAgIGNvbnN0IGggPSBsaW5lcy5sZW5ndGhcbiAgICBjb25zdCBzID0gbGluZXMuam9pbignXFxuJykudHJpbSgpXG5cbiAgICB0aGlzLm9yY2EubG9hZCh3LCBoLCBzKVxuICAgIHRoaXMuaGlzdG9yeS5yZXNldCgpXG4gICAgdGhpcy5oaXN0b3J5LnJlY29yZCh0aGlzLm9yY2EucylcbiAgICB0aGlzLnJlc2l6ZSgpXG4gIH1cblxuICB0aGlzLnNldEdyaWQgPSAodywgaCkgPT4ge1xuICAgIHRoaXMuZ3JpZC53ID0gd1xuICAgIHRoaXMuZ3JpZC5oID0gaFxuICAgIHRoaXMudXBkYXRlKClcbiAgfVxuXG4gIHRoaXMudG9nZ2xlUmV0aW5hID0gKCkgPT4ge1xuICAgIHRoaXMuc2NhbGUgPSB0aGlzLnNjYWxlID09PSAxID8gd2luZG93LmRldmljZVBpeGVsUmF0aW8gOiAxXG4gICAgY29uc29sZS5sb2coJ0NsaWVudCcsIGBQaXhlbCByZXNvbHV0aW9uOiAke3RoaXMuc2NhbGV9YClcbiAgICB0aGlzLnJlc2l6ZSh0cnVlKVxuICB9XG5cbiAgdGhpcy50b2dnbGVHdWlkZSA9IChmb3JjZSA9IG51bGwpID0+IHtcbiAgICBjb25zdCBkaXNwbGF5ID0gZm9yY2UgIT09IG51bGwgPyBmb3JjZSA6IHRoaXMuZ3VpZGUgIT09IHRydWVcbiAgICBpZiAoZGlzcGxheSA9PT0gdGhpcy5ndWlkZSkgeyByZXR1cm4gfVxuICAgIGNvbnNvbGUubG9nKCdDbGllbnQnLCBgVG9nZ2xlIEd1aWRlOiAke2Rpc3BsYXl9YClcbiAgICB0aGlzLmd1aWRlID0gZGlzcGxheVxuICAgIHRoaXMudXBkYXRlKClcbiAgfVxuXG4gIHRoaXMubW9kR3JpZCA9ICh4ID0gMCwgeSA9IDApID0+IHtcbiAgICBjb25zdCB3ID0gY2xhbXAodGhpcy5ncmlkLncgKyB4LCA0LCAxNilcbiAgICBjb25zdCBoID0gY2xhbXAodGhpcy5ncmlkLmggKyB5LCA0LCAxNilcbiAgICB0aGlzLnNldEdyaWQodywgaClcbiAgfVxuXG4gIHRoaXMubW9kWm9vbSA9IChtb2QgPSAwLCByZXNldCA9IGZhbHNlKSA9PiB7XG4gICAgdGhpcy50aWxlID0ge1xuICAgICAgdzogcmVzZXQgPyAxMCA6IHRoaXMudGlsZS53ICogKG1vZCArIDEpLFxuICAgICAgaDogcmVzZXQgPyAxNSA6IHRoaXMudGlsZS5oICogKG1vZCArIDEpLFxuICAgICAgd3M6IE1hdGguZmxvb3IodGhpcy50aWxlLncgKiB0aGlzLnNjYWxlKSxcbiAgICAgIGhzOiBNYXRoLmZsb29yKHRoaXMudGlsZS5oICogdGhpcy5zY2FsZSlcbiAgICB9XG4gICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oJ3RpbGV3JywgdGhpcy50aWxlLncpXG4gICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oJ3RpbGVoJywgdGhpcy50aWxlLmgpXG4gICAgdGhpcy5yZXNpemUodHJ1ZSlcbiAgfVxuXG4gIC8vXG5cbiAgdGhpcy5pc0N1cnNvciA9ICh4LCB5KSA9PiB7XG4gICAgcmV0dXJuIHggPT09IHRoaXMuY3Vyc29yLnggJiYgeSA9PT0gdGhpcy5jdXJzb3IueVxuICB9XG5cbiAgdGhpcy5pc01hcmtlciA9ICh4LCB5KSA9PiB7XG4gICAgcmV0dXJuIHggJSB0aGlzLmdyaWQudyA9PT0gMCAmJiB5ICUgdGhpcy5ncmlkLmggPT09IDBcbiAgfVxuXG4gIHRoaXMuaXNOZWFyID0gKHgsIHkpID0+IHtcbiAgICByZXR1cm4geCA+IChwYXJzZUludCh0aGlzLmN1cnNvci54IC8gdGhpcy5ncmlkLncpICogdGhpcy5ncmlkLncpIC0gMSAmJiB4IDw9ICgoMSArIHBhcnNlSW50KHRoaXMuY3Vyc29yLnggLyB0aGlzLmdyaWQudykpICogdGhpcy5ncmlkLncpICYmIHkgPiAocGFyc2VJbnQodGhpcy5jdXJzb3IueSAvIHRoaXMuZ3JpZC5oKSAqIHRoaXMuZ3JpZC5oKSAtIDEgJiYgeSA8PSAoKDEgKyBwYXJzZUludCh0aGlzLmN1cnNvci55IC8gdGhpcy5ncmlkLmgpKSAqIHRoaXMuZ3JpZC5oKVxuICB9XG5cbiAgdGhpcy5pc0xvY2FscyA9ICh4LCB5KSA9PiB7XG4gICAgcmV0dXJuIHRoaXMuaXNOZWFyKHgsIHkpID09PSB0cnVlICYmICh4ICUgKHRoaXMuZ3JpZC53IC8gNCkgPT09IDAgJiYgeSAlICh0aGlzLmdyaWQuaCAvIDQpID09PSAwKSA9PT0gdHJ1ZVxuICB9XG5cbiAgdGhpcy5pc0ludmlzaWJsZSA9ICh4LCB5KSA9PiB7XG4gICAgcmV0dXJuIHRoaXMub3JjYS5nbHlwaEF0KHgsIHkpID09PSAnLicgJiYgIXRoaXMuaXNNYXJrZXIoeCwgeSkgJiYgIXRoaXMuY3Vyc29yLnNlbGVjdGVkKHgsIHkpICYmICF0aGlzLmlzTG9jYWxzKHgsIHkpICYmICF0aGlzLnBvcnRzW3RoaXMub3JjYS5pbmRleEF0KHgsIHkpXSAmJiAhdGhpcy5vcmNhLmxvY2tBdCh4LCB5KVxuICB9XG5cbiAgdGhpcy5maW5kUG9ydHMgPSAoKSA9PiB7XG4gICAgY29uc3QgYSA9IG5ldyBBcnJheSgodGhpcy5vcmNhLncgKiB0aGlzLm9yY2EuaCkgLSAxKVxuICAgIGZvciAoY29uc3Qgb3BlcmF0b3Igb2YgdGhpcy5vcmNhLnJ1bnRpbWUpIHtcbiAgICAgIGlmICh0aGlzLm9yY2EubG9ja0F0KG9wZXJhdG9yLngsIG9wZXJhdG9yLnkpKSB7IGNvbnRpbnVlIH1cbiAgICAgIGNvbnN0IHBvcnRzID0gb3BlcmF0b3IuZ2V0UG9ydHMoKVxuICAgICAgZm9yIChjb25zdCBwb3J0IG9mIHBvcnRzKSB7XG4gICAgICAgIGNvbnN0IGluZGV4ID0gdGhpcy5vcmNhLmluZGV4QXQocG9ydFswXSwgcG9ydFsxXSlcbiAgICAgICAgYVtpbmRleF0gPSBwb3J0XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBhXG4gIH1cblxuICAvLyBJbnRlcmZhY2VcblxuICB0aGlzLm1ha2VUaGVtZSA9ICh0eXBlKSA9PiB7XG4gICAgLy8gT3BlcmF0b3JcbiAgICBpZiAodHlwZSA9PT0gMCkgeyByZXR1cm4geyBiZzogdGhpcy50aGVtZS5hY3RpdmUuYl9tZWQsIGZnOiB0aGlzLnRoZW1lLmFjdGl2ZS5mX2xvdyB9IH1cbiAgICAvLyBIYXN0ZVxuICAgIGlmICh0eXBlID09PSAxKSB7IHJldHVybiB7IGZnOiB0aGlzLnRoZW1lLmFjdGl2ZS5iX21lZCB9IH1cbiAgICAvLyBJbnB1dFxuICAgIGlmICh0eXBlID09PSAyKSB7IHJldHVybiB7IGZnOiB0aGlzLnRoZW1lLmFjdGl2ZS5iX2hpZ2ggfSB9XG4gICAgLy8gT3V0cHV0XG4gICAgaWYgKHR5cGUgPT09IDMpIHsgcmV0dXJuIHsgYmc6IHRoaXMudGhlbWUuYWN0aXZlLmJfaGlnaCwgZmc6IHRoaXMudGhlbWUuYWN0aXZlLmZfbG93IH0gfVxuICAgIC8vIFNlbGVjdGVkXG4gICAgaWYgKHR5cGUgPT09IDQpIHsgcmV0dXJuIHsgYmc6IHRoaXMudGhlbWUuYWN0aXZlLmJfaW52LCBmZzogdGhpcy50aGVtZS5hY3RpdmUuZl9pbnYgfSB9XG4gICAgLy8gTG9ja2VkXG4gICAgaWYgKHR5cGUgPT09IDUpIHsgcmV0dXJuIHsgZmc6IHRoaXMudGhlbWUuYWN0aXZlLmZfbWVkIH0gfVxuICAgIC8vIFJlYWRlclxuICAgIGlmICh0eXBlID09PSA2KSB7IHJldHVybiB7IGZnOiB0aGlzLnRoZW1lLmFjdGl2ZS5iX2ludiB9IH1cbiAgICAvLyBJbnZpc2libGVcbiAgICBpZiAodHlwZSA9PT0gNykgeyByZXR1cm4ge30gfVxuICAgIC8vIE91dHB1dCBCYW5nXG4gICAgaWYgKHR5cGUgPT09IDgpIHsgcmV0dXJuIHsgYmc6IHRoaXMudGhlbWUuYWN0aXZlLmJfbG93LCBmZzogdGhpcy50aGVtZS5hY3RpdmUuZl9oaWdoIH0gfVxuICAgIC8vIE91dHB1dCBSZWFkZXJcbiAgICBpZiAodHlwZSA9PT0gOSkgeyByZXR1cm4geyBiZzogdGhpcy50aGVtZS5hY3RpdmUuYl9pbnYsIGZnOiB0aGlzLnRoZW1lLmFjdGl2ZS5iYWNrZ3JvdW5kIH0gfVxuICAgIC8vIFJlYWRlcitCYWNrZ3JvdW5kXG4gICAgaWYgKHR5cGUgPT09IDEwKSB7IHJldHVybiB7IGJnOiB0aGlzLnRoZW1lLmFjdGl2ZS5iYWNrZ3JvdW5kLCBmZzogdGhpcy50aGVtZS5hY3RpdmUuZl9oaWdoIH0gfVxuICAgIC8vIENsb2NrKHllbGxvdyBmZylcbiAgICBpZiAodHlwZSA9PT0gMTEpIHsgcmV0dXJuIHsgZmc6IHRoaXMudGhlbWUuYWN0aXZlLmJfaW52IH0gfVxuICAgIC8vIERlZmF1bHRcbiAgICByZXR1cm4geyBmZzogdGhpcy50aGVtZS5hY3RpdmUuZl9sb3cgfVxuICB9XG5cbiAgLy8gQ2FudmFzXG5cbiAgdGhpcy5jbGVhciA9ICgpID0+IHtcbiAgICB0aGlzLmNvbnRleHQuY2xlYXJSZWN0KDAsIDAsIHRoaXMuZWwud2lkdGgsIHRoaXMuZWwuaGVpZ2h0KVxuICB9XG5cbiAgdGhpcy5kcmF3UHJvZ3JhbSA9ICgpID0+IHtcbiAgICBjb25zdCBzZWxlY3Rpb24gPSB0aGlzLmN1cnNvci5yZWFkKClcbiAgICBmb3IgKGxldCB5ID0gMDsgeSA8IHRoaXMub3JjYS5oOyB5KyspIHtcbiAgICAgIGZvciAobGV0IHggPSAwOyB4IDwgdGhpcy5vcmNhLnc7IHgrKykge1xuICAgICAgICAvLyBIYW5kbGUgYmxhbmtzXG4gICAgICAgIGlmICh0aGlzLmlzSW52aXNpYmxlKHgsIHkpKSB7IGNvbnRpbnVlIH1cbiAgICAgICAgLy8gTWFrZSBHbHlwaFxuICAgICAgICBjb25zdCBnID0gdGhpcy5vcmNhLmdseXBoQXQoeCwgeSlcbiAgICAgICAgLy8gR2V0IGdseXBoXG4gICAgICAgIGNvbnN0IGdseXBoID0gZyAhPT0gJy4nID8gZyA6IHRoaXMuaXNDdXJzb3IoeCwgeSkgPyAodGhpcy5jbG9jay5pc1BhdXNlZCA/ICd+JyA6ICdAJykgOiB0aGlzLmlzTWFya2VyKHgsIHkpID8gJysnIDogZ1xuICAgICAgICAvLyBNYWtlIFN0eWxlXG4gICAgICAgIHRoaXMuZHJhd1Nwcml0ZSh4LCB5LCBnbHlwaCwgdGhpcy5tYWtlU3R5bGUoeCwgeSwgZ2x5cGgsIHNlbGVjdGlvbikpXG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgdGhpcy5tYWtlU3R5bGUgPSAoeCwgeSwgZ2x5cGgsIHNlbGVjdGlvbikgPT4ge1xuICAgIGlmICh0aGlzLmN1cnNvci5zZWxlY3RlZCh4LCB5KSkgeyByZXR1cm4gNCB9XG4gICAgY29uc3QgaXNMb2NrZWQgPSB0aGlzLm9yY2EubG9ja0F0KHgsIHkpXG4gICAgaWYgKHNlbGVjdGlvbiA9PT0gZ2x5cGggJiYgaXNMb2NrZWQgPT09IGZhbHNlICYmIHNlbGVjdGlvbiAhPT0gJy4nKSB7IHJldHVybiA2IH1cbiAgICBpZiAoZ2x5cGggPT09ICcqJyAmJiBpc0xvY2tlZCA9PT0gZmFsc2UpIHsgcmV0dXJuIDIgfVxuICAgIGNvbnN0IHBvcnQgPSB0aGlzLnBvcnRzW3RoaXMub3JjYS5pbmRleEF0KHgsIHkpXVxuICAgIGlmIChwb3J0KSB7IHJldHVybiBwb3J0WzJdIH1cbiAgICBpZiAoaXNMb2NrZWQgPT09IHRydWUpIHsgcmV0dXJuIDUgfVxuICAgIHJldHVybiAyMFxuICB9XG5cbiAgdGhpcy5kcmF3SW50ZXJmYWNlID0gKCkgPT4ge1xuICAgIHRoaXMud3JpdGUoYCR7dGhpcy5jdXJzb3IuaW5zcGVjdCgpfWAsIHRoaXMuZ3JpZC53ICogMCwgdGhpcy5vcmNhLmgsIHRoaXMuZ3JpZC53IC0gMSlcbiAgICB0aGlzLndyaXRlKGAke3RoaXMuY3Vyc29yLnh9LCR7dGhpcy5jdXJzb3IueX0ke3RoaXMuY3Vyc29yLmlucyA/ICcrJyA6ICcnfWAsIHRoaXMuZ3JpZC53ICogMSwgdGhpcy5vcmNhLmgsIHRoaXMuZ3JpZC53LCB0aGlzLmN1cnNvci5pbnMgPyAxIDogMilcbiAgICB0aGlzLndyaXRlKGAke3RoaXMuY3Vyc29yLnd9OiR7dGhpcy5jdXJzb3IuaH1gLCB0aGlzLmdyaWQudyAqIDIsIHRoaXMub3JjYS5oLCB0aGlzLmdyaWQudylcbiAgICB0aGlzLndyaXRlKGAke3RoaXMub3JjYS5mfWYke3RoaXMuY2xvY2suaXNQYXVzZWQgPyAnficgOiAnJ31gLCB0aGlzLmdyaWQudyAqIDMsIHRoaXMub3JjYS5oLCB0aGlzLmdyaWQudylcbiAgICB0aGlzLndyaXRlKGAke3RoaXMuaW8uaW5zcGVjdCh0aGlzLmdyaWQudyl9YCwgdGhpcy5ncmlkLncgKiA0LCB0aGlzLm9yY2EuaCwgdGhpcy5ncmlkLncgLSAxKVxuICAgIHRoaXMud3JpdGUodGhpcy5vcmNhLmYgPCAyNTAgPyBgPCAke3RoaXMuaW8ubWlkaS50b0lucHV0U3RyaW5nKCl9YCA6ICcnLCB0aGlzLmdyaWQudyAqIDUsIHRoaXMub3JjYS5oLCB0aGlzLmdyaWQudyAqIDQpXG5cbiAgICBpZiAodGhpcy5jb21tYW5kZXIuaXNBY3RpdmUgPT09IHRydWUpIHtcbiAgICAgIHRoaXMud3JpdGUoYCR7dGhpcy5jb21tYW5kZXIucXVlcnl9JHt0aGlzLm9yY2EuZiAlIDIgPT09IDAgPyAnXycgOiAnJ31gLCB0aGlzLmdyaWQudyAqIDAsIHRoaXMub3JjYS5oICsgMSwgdGhpcy5ncmlkLncgKiA0KVxuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLndyaXRlKHRoaXMub3JjYS5mIDwgMjUgPyBgdmVyJHt0aGlzLnZlcnNpb259YCA6IGAke09iamVjdC5rZXlzKHRoaXMuc291cmNlLmNhY2hlKS5sZW5ndGh9IG1vZHNgLCB0aGlzLmdyaWQudyAqIDAsIHRoaXMub3JjYS5oICsgMSwgdGhpcy5ncmlkLncpXG4gICAgICB0aGlzLndyaXRlKGAke3RoaXMub3JjYS53fXgke3RoaXMub3JjYS5ofWAsIHRoaXMuZ3JpZC53ICogMSwgdGhpcy5vcmNhLmggKyAxLCB0aGlzLmdyaWQudylcbiAgICAgIHRoaXMud3JpdGUoYCR7dGhpcy5ncmlkLnd9LyR7dGhpcy5ncmlkLmh9JHt0aGlzLnRpbGUudyAhPT0gMTAgPyAnICcgKyAodGhpcy50aWxlLncgLyAxMCkudG9GaXhlZCgxKSA6ICcnfWAsIHRoaXMuZ3JpZC53ICogMiwgdGhpcy5vcmNhLmggKyAxLCB0aGlzLmdyaWQudylcbiAgICAgIHRoaXMud3JpdGUoYCR7dGhpcy5jbG9ja31gLCB0aGlzLmdyaWQudyAqIDMsIHRoaXMub3JjYS5oICsgMSwgdGhpcy5ncmlkLncsIHRoaXMuY2xvY2suaXNQdXBwZXQgPyAzIDogdGhpcy5pby5taWRpLmlzQ2xvY2sgPyAxMSA6IHRoaXMuY2xvY2suaXNQYXVzZWQgPyAyMCA6IDIpXG4gICAgICB0aGlzLndyaXRlKGAke2Rpc3BsYXkoT2JqZWN0LmtleXModGhpcy5vcmNhLnZhcmlhYmxlcykuam9pbignJyksIHRoaXMub3JjYS5mLCB0aGlzLmdyaWQudyAtIDEpfWAsIHRoaXMuZ3JpZC53ICogNCwgdGhpcy5vcmNhLmggKyAxLCB0aGlzLmdyaWQudyAtIDEpXG4gICAgICB0aGlzLndyaXRlKHRoaXMub3JjYS5mIDwgMjUwID8gYD4gJHt0aGlzLmlvLm1pZGkudG9PdXRwdXRTdHJpbmcoKX1gIDogJycsIHRoaXMuZ3JpZC53ICogNSwgdGhpcy5vcmNhLmggKyAxLCB0aGlzLmdyaWQudyAqIDQpXG4gICAgfVxuICB9XG5cbiAgdGhpcy5kcmF3R3VpZGUgPSAoKSA9PiB7XG4gICAgaWYgKHRoaXMuZ3VpZGUgIT09IHRydWUpIHsgcmV0dXJuIH1cbiAgICBjb25zdCBvcGVyYXRvcnMgPSBPYmplY3Qua2V5cyh0aGlzLmxpYnJhcnkpLmZpbHRlcigodmFsKSA9PiB7IHJldHVybiBpc05hTih2YWwpIH0pXG4gICAgZm9yIChjb25zdCBpZCBpbiBvcGVyYXRvcnMpIHtcbiAgICAgIGNvbnN0IGtleSA9IG9wZXJhdG9yc1tpZF1cbiAgICAgIGNvbnN0IG9wZXIgPSBuZXcgdGhpcy5saWJyYXJ5W2tleV0oKVxuICAgICAgY29uc3QgdGV4dCA9IG9wZXIuaW5mb1xuICAgICAgY29uc3QgZnJhbWUgPSB0aGlzLm9yY2EuaCAtIDRcbiAgICAgIGNvbnN0IHggPSAoTWF0aC5mbG9vcihwYXJzZUludChpZCkgLyBmcmFtZSkgKiAzMikgKyAyXG4gICAgICBjb25zdCB5ID0gKHBhcnNlSW50KGlkKSAlIGZyYW1lKSArIDJcbiAgICAgIHRoaXMud3JpdGUoa2V5LCB4LCB5LCA5OSwgMylcbiAgICAgIHRoaXMud3JpdGUodGV4dCwgeCArIDIsIHksIDk5LCAxMClcbiAgICB9XG4gIH1cblxuICB0aGlzLmRyYXdTcHJpdGUgPSAoeCwgeSwgZywgdHlwZSkgPT4ge1xuICAgIGNvbnN0IHRoZW1lID0gdGhpcy5tYWtlVGhlbWUodHlwZSlcbiAgICBpZiAodGhlbWUuYmcpIHtcbiAgICAgIHRoaXMuY29udGV4dC5maWxsU3R5bGUgPSB0aGVtZS5iZ1xuICAgICAgdGhpcy5jb250ZXh0LmZpbGxSZWN0KHggKiB0aGlzLnRpbGUud3MsICh5KSAqIHRoaXMudGlsZS5ocywgdGhpcy50aWxlLndzLCB0aGlzLnRpbGUuaHMpXG4gICAgfVxuICAgIGlmICh0aGVtZS5mZykge1xuICAgICAgdGhpcy5jb250ZXh0LmZpbGxTdHlsZSA9IHRoZW1lLmZnXG4gICAgICB0aGlzLmNvbnRleHQuZmlsbFRleHQoZywgKHggKyAwLjUpICogdGhpcy50aWxlLndzLCAoeSArIDEpICogdGhpcy50aWxlLmhzKVxuICAgIH1cbiAgfVxuXG4gIHRoaXMud3JpdGUgPSAodGV4dCwgb2Zmc2V0WCwgb2Zmc2V0WSwgbGltaXQgPSA1MCwgdHlwZSA9IDIpID0+IHtcbiAgICBmb3IgKGxldCB4ID0gMDsgeCA8IHRleHQubGVuZ3RoICYmIHggPCBsaW1pdDsgeCsrKSB7XG4gICAgICB0aGlzLmRyYXdTcHJpdGUob2Zmc2V0WCArIHgsIG9mZnNldFksIHRleHQuc3Vic3RyKHgsIDEpLCB0eXBlKVxuICAgIH1cbiAgfVxuXG4gIC8vIFJlc2l6ZSB0b29sc1xuXG4gIHRoaXMucmVzaXplID0gKCkgPT4ge1xuICAgIGNvbnN0IHBhZCA9IDMwXG4gICAgY29uc3Qgc2l6ZSA9IHsgdzogd2luZG93LmlubmVyV2lkdGggLSAocGFkICogMiksIGg6IHdpbmRvdy5pbm5lckhlaWdodCAtICgocGFkICogMikgKyB0aGlzLnRpbGUuaCAqIDIpIH1cbiAgICBjb25zdCB0aWxlcyA9IHsgdzogTWF0aC5jZWlsKHNpemUudyAvIHRoaXMudGlsZS53KSwgaDogTWF0aC5jZWlsKHNpemUuaCAvIHRoaXMudGlsZS5oKSB9XG4gICAgY29uc3QgYm91bmRzID0gdGhpcy5vcmNhLmJvdW5kcygpXG5cbiAgICAvLyBDbGFtcCBhdCBsaW1pdHMgb2Ygb3JjYSBmaWxlXG4gICAgaWYgKHRpbGVzLncgPCBib3VuZHMudyArIDEpIHsgdGlsZXMudyA9IGJvdW5kcy53ICsgMSB9XG4gICAgaWYgKHRpbGVzLmggPCBib3VuZHMuaCArIDEpIHsgdGlsZXMuaCA9IGJvdW5kcy5oICsgMSB9XG5cbiAgICB0aGlzLmNyb3AodGlsZXMudywgdGlsZXMuaClcblxuICAgIC8vIEtlZXAgY3Vyc29yIGluIGJvdW5kc1xuICAgIGlmICh0aGlzLmN1cnNvci54ID49IHRpbGVzLncpIHsgdGhpcy5jdXJzb3IubW92ZVRvKHRpbGVzLncgLSAxLCB0aGlzLmN1cnNvci55KSB9XG4gICAgaWYgKHRoaXMuY3Vyc29yLnkgPj0gdGlsZXMuaCkgeyB0aGlzLmN1cnNvci5tb3ZlVG8odGhpcy5jdXJzb3IueCwgdGlsZXMuaCAtIDEpIH1cblxuICAgIGNvbnN0IHcgPSB0aGlzLnRpbGUud3MgKiB0aGlzLm9yY2Eud1xuICAgIGNvbnN0IGggPSAodGhpcy50aWxlLmhzICsgKHRoaXMudGlsZS5ocyAvIDUpKSAqIHRoaXMub3JjYS5oXG5cbiAgICBpZiAodyA9PT0gdGhpcy5lbC53aWR0aCAmJiBoID09PSB0aGlzLmVsLmhlaWdodCkgeyByZXR1cm4gfVxuXG4gICAgY29uc29sZS5sb2coYFJlc2l6ZWQgdG86ICR7dGhpcy5vcmNhLnd9eCR7dGhpcy5vcmNhLmh9YClcblxuICAgIHRoaXMuZWwud2lkdGggPSB3XG4gICAgdGhpcy5lbC5oZWlnaHQgPSBoXG4gICAgdGhpcy5lbC5zdHlsZS53aWR0aCA9IGAke01hdGguY2VpbCh0aGlzLnRpbGUudyAqIHRoaXMub3JjYS53KX1weGBcbiAgICB0aGlzLmVsLnN0eWxlLmhlaWdodCA9IGAke01hdGguY2VpbCgodGhpcy50aWxlLmggKyAodGhpcy50aWxlLmggLyA1KSkgKiB0aGlzLm9yY2EuaCl9cHhgXG5cbiAgICB0aGlzLmNvbnRleHQudGV4dEJhc2VsaW5lID0gJ2JvdHRvbSdcbiAgICB0aGlzLmNvbnRleHQudGV4dEFsaWduID0gJ2NlbnRlcidcbiAgICB0aGlzLmNvbnRleHQuZm9udCA9IGAke3RoaXMudGlsZS5ocyAqIDAuNzV9cHggaW5wdXRfbW9ub19tZWRpdW1gXG4gICAgdGhpcy51cGRhdGUoKVxuICB9XG5cbiAgdGhpcy5jcm9wID0gKHcsIGgpID0+IHtcbiAgICBsZXQgYmxvY2sgPSBgJHt0aGlzLm9yY2F9YFxuXG4gICAgaWYgKGggPiB0aGlzLm9yY2EuaCkge1xuICAgICAgYmxvY2sgPSBgJHtibG9ja30ke2BcXG4keycuJy5yZXBlYXQodGhpcy5vcmNhLncpfWAucmVwZWF0KChoIC0gdGhpcy5vcmNhLmgpKX1gXG4gICAgfSBlbHNlIGlmIChoIDwgdGhpcy5vcmNhLmgpIHtcbiAgICAgIGJsb2NrID0gYCR7YmxvY2t9YC5zcGxpdCgvXFxyP1xcbi8pLnNsaWNlKDAsIChoIC0gdGhpcy5vcmNhLmgpKS5qb2luKCdcXG4nKS50cmltKClcbiAgICB9XG5cbiAgICBpZiAodyA+IHRoaXMub3JjYS53KSB7XG4gICAgICBibG9jayA9IGAke2Jsb2NrfWAuc3BsaXQoL1xccj9cXG4vKS5tYXAoKHZhbCkgPT4geyByZXR1cm4gdmFsICsgKCcuJykucmVwZWF0KCh3IC0gdGhpcy5vcmNhLncpKSB9KS5qb2luKCdcXG4nKS50cmltKClcbiAgICB9IGVsc2UgaWYgKHcgPCB0aGlzLm9yY2Eudykge1xuICAgICAgYmxvY2sgPSBgJHtibG9ja31gLnNwbGl0KC9cXHI/XFxuLykubWFwKCh2YWwpID0+IHsgcmV0dXJuIHZhbC5zdWJzdHIoMCwgdmFsLmxlbmd0aCArICh3IC0gdGhpcy5vcmNhLncpKSB9KS5qb2luKCdcXG4nKS50cmltKClcbiAgICB9XG5cbiAgICB0aGlzLmhpc3RvcnkucmVzZXQoKVxuICAgIHRoaXMub3JjYS5sb2FkKHcsIGgsIGJsb2NrLCB0aGlzLm9yY2EuZilcbiAgfVxuXG4gIC8vIERvY3NcblxuICB0aGlzLmRvY3MgPSAoKSA9PiB7XG4gICAgbGV0IGh0bWwgPSAnJ1xuICAgIGNvbnN0IG9wZXJhdG9ycyA9IE9iamVjdC5rZXlzKGxpYnJhcnkpLmZpbHRlcigodmFsKSA9PiB7IHJldHVybiBpc05hTih2YWwpIH0pXG4gICAgZm9yIChjb25zdCBpZCBpbiBvcGVyYXRvcnMpIHtcbiAgICAgIGNvbnN0IG9wZXIgPSBuZXcgdGhpcy5saWJyYXJ5W29wZXJhdG9yc1tpZF1dKClcbiAgICAgIGNvbnN0IHBvcnRzID0gb3Blci5wb3J0cy5pbnB1dCA/IE9iamVjdC5rZXlzKG9wZXIucG9ydHMuaW5wdXQpLnJlZHVjZSgoYWNjLCBrZXksIHZhbCkgPT4geyByZXR1cm4gYWNjICsgJyAnICsga2V5IH0sICcnKSA6ICcnXG4gICAgICBodG1sICs9IGAtIFxcYCR7b3Blci5nbHlwaC50b1VwcGVyQ2FzZSgpfVxcYCAqKiR7b3Blci5uYW1lfSoqJHtwb3J0cyAhPT0gJycgPyAnKCcgKyBwb3J0cy50cmltKCkgKyAnKScgOiAnJ306ICR7b3Blci5pbmZvfS5cXG5gXG4gICAgfVxuICAgIHJldHVybiBodG1sXG4gIH1cblxuICAvLyBFdmVudHNcblxuICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignZHJhZ292ZXInLCAoZSkgPT4ge1xuICAgIGUuc3RvcFByb3BhZ2F0aW9uKClcbiAgICBlLnByZXZlbnREZWZhdWx0KClcbiAgICBlLmRhdGFUcmFuc2Zlci5kcm9wRWZmZWN0ID0gJ2NvcHknXG4gIH0pXG5cbiAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ2Ryb3AnLCAoZSkgPT4ge1xuICAgIGUucHJldmVudERlZmF1bHQoKVxuICAgIGUuc3RvcFByb3BhZ2F0aW9uKClcbiAgICBmb3IgKGNvbnN0IGZpbGUgb2YgZS5kYXRhVHJhbnNmZXIuZmlsZXMpIHtcbiAgICAgIGlmIChmaWxlLm5hbWUuaW5kZXhPZignLm9yY2EnKSA8IDApIHsgY29udGludWUgfVxuICAgICAgdGhpcy50b2dnbGVHdWlkZShmYWxzZSlcbiAgICAgIHRoaXMuc291cmNlLnJlYWQoZmlsZSwgbnVsbCwgdHJ1ZSlcbiAgICAgIHRoaXMuY29tbWFuZGVyLnN0YXJ0KCdpbmplY3Q6JyArIGZpbGUubmFtZS5yZXBsYWNlKCcub3JjYScsICcnKSlcbiAgICB9XG4gIH0pXG5cbiAgd2luZG93Lm9ucmVzaXplID0gKGUpID0+IHtcbiAgICB0aGlzLnJlc2l6ZSgpXG4gIH1cblxuICAvLyBIZWxwZXJzXG5cbiAgZnVuY3Rpb24gZGlzcGxheSAoc3RyLCBmLCBtYXgpIHsgcmV0dXJuIHN0ci5sZW5ndGggPCBtYXggPyBzdHIgOiBzdHIuc2xpY2UoZiAlIHN0ci5sZW5ndGgpICsgc3RyLnN1YnN0cigwLCBmICUgc3RyLmxlbmd0aCkgfVxuICBmdW5jdGlvbiBjbGFtcCAodiwgbWluLCBtYXgpIHsgcmV0dXJuIHYgPCBtaW4gPyBtaW4gOiB2ID4gbWF4ID8gbWF4IDogdiB9XG59XG5cbi8qKiogRVhQT1JUUyBGUk9NIGV4cG9ydHMtbG9hZGVyICoqKi9cbmV4cG9ydCBkZWZhdWx0IENsaWVudDtcbiIsIid1c2Ugc3RyaWN0J1xuXG4vKiBnbG9iYWwgQmxvYiAqL1xuXG5mdW5jdGlvbiBDbG9jayAoY2xpZW50KSB7XG4gIGNvbnN0IHdvcmtlclNjcmlwdCA9ICdvbm1lc3NhZ2UgPSAoZSkgPT4geyBzZXRJbnRlcnZhbCgoKSA9PiB7IHBvc3RNZXNzYWdlKHRydWUpIH0sIGUuZGF0YSl9J1xuICBjb25zdCB3b3JrZXIgPSB3aW5kb3cuVVJMLmNyZWF0ZU9iamVjdFVSTChuZXcgQmxvYihbd29ya2VyU2NyaXB0XSwgeyB0eXBlOiAndGV4dC9qYXZhc2NyaXB0JyB9KSlcblxuICB0aGlzLmlzUGF1c2VkID0gdHJ1ZVxuICB0aGlzLnRpbWVyID0gbnVsbFxuICB0aGlzLmlzUHVwcGV0ID0gZmFsc2VcblxuICB0aGlzLnNwZWVkID0geyB2YWx1ZTogMTIwLCB0YXJnZXQ6IDEyMCB9XG5cbiAgdGhpcy5zdGFydCA9IGZ1bmN0aW9uICgpIHtcbiAgICBjb25zdCBtZW1vcnkgPSBwYXJzZUludCh3aW5kb3cubG9jYWxTdG9yYWdlLmdldEl0ZW0oJ2JwbScpKVxuICAgIGNvbnN0IHRhcmdldCA9IG1lbW9yeSA+PSA2MCA/IG1lbW9yeSA6IDEyMFxuICAgIHRoaXMuc2V0U3BlZWQodGFyZ2V0LCB0YXJnZXQsIHRydWUpXG4gICAgdGhpcy5wbGF5KClcbiAgfVxuXG4gIHRoaXMudG91Y2ggPSBmdW5jdGlvbiAoKSB7XG4gICAgdGhpcy5zdG9wKClcbiAgICBjbGllbnQucnVuKClcbiAgfVxuXG4gIHRoaXMucnVuID0gZnVuY3Rpb24gKCkge1xuICAgIGlmICh0aGlzLnNwZWVkLnRhcmdldCA9PT0gdGhpcy5zcGVlZC52YWx1ZSkgeyByZXR1cm4gfVxuICAgIHRoaXMuc2V0U3BlZWQodGhpcy5zcGVlZC52YWx1ZSArICh0aGlzLnNwZWVkLnZhbHVlIDwgdGhpcy5zcGVlZC50YXJnZXQgPyAxIDogLTEpLCBudWxsLCB0cnVlKVxuICB9XG5cbiAgdGhpcy5zZXRTcGVlZCA9ICh2YWx1ZSwgdGFyZ2V0ID0gbnVsbCwgc2V0VGltZXIgPSBmYWxzZSkgPT4ge1xuICAgIGlmICh0aGlzLnNwZWVkLnZhbHVlID09PSB2YWx1ZSAmJiB0aGlzLnNwZWVkLnRhcmdldCA9PT0gdGFyZ2V0ICYmIHRoaXMudGltZXIpIHsgcmV0dXJuIH1cbiAgICBpZiAodmFsdWUpIHsgdGhpcy5zcGVlZC52YWx1ZSA9IGNsYW1wKHZhbHVlLCA2MCwgMzAwKSB9XG4gICAgaWYgKHRhcmdldCkgeyB0aGlzLnNwZWVkLnRhcmdldCA9IGNsYW1wKHRhcmdldCwgNjAsIDMwMCkgfVxuICAgIGlmIChzZXRUaW1lciA9PT0gdHJ1ZSkgeyB0aGlzLnNldFRpbWVyKHRoaXMuc3BlZWQudmFsdWUpIH1cbiAgfVxuXG4gIHRoaXMubW9kU3BlZWQgPSBmdW5jdGlvbiAobW9kID0gMCwgYW5pbWF0ZSA9IGZhbHNlKSB7XG4gICAgaWYgKGFuaW1hdGUgPT09IHRydWUpIHtcbiAgICAgIHRoaXMuc2V0U3BlZWQobnVsbCwgdGhpcy5zcGVlZC50YXJnZXQgKyBtb2QpXG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuc2V0U3BlZWQodGhpcy5zcGVlZC52YWx1ZSArIG1vZCwgdGhpcy5zcGVlZC52YWx1ZSArIG1vZCwgdHJ1ZSlcbiAgICAgIGNsaWVudC51cGRhdGUoKVxuICAgIH1cbiAgfVxuXG4gIC8vIENvbnRyb2xzXG5cbiAgdGhpcy50b2dnbGVQbGF5ID0gZnVuY3Rpb24gKG1zZyA9IGZhbHNlKSB7XG4gICAgaWYgKHRoaXMuaXNQYXVzZWQgPT09IHRydWUpIHtcbiAgICAgIHRoaXMucGxheShtc2cpXG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuc3RvcChtc2cpXG4gICAgfVxuICAgIGNsaWVudC51cGRhdGUoKVxuICB9XG5cbiAgdGhpcy5wbGF5ID0gZnVuY3Rpb24gKG1zZyA9IGZhbHNlLCBtaWRpU3RhcnQgPSBmYWxzZSkge1xuICAgIGNvbnNvbGUubG9nKCdDbG9jaycsICdQbGF5JywgbXNnLCBtaWRpU3RhcnQpXG4gICAgaWYgKHRoaXMuaXNQYXVzZWQgPT09IGZhbHNlICYmICFtaWRpU3RhcnQpIHsgcmV0dXJuIH1cbiAgICB0aGlzLmlzUGF1c2VkID0gZmFsc2VcbiAgICBpZiAodGhpcy5pc1B1cHBldCA9PT0gdHJ1ZSkge1xuICAgICAgY29uc29sZS53YXJuKCdDbG9jaycsICdFeHRlcm5hbCBNaWRpIGNvbnRyb2wnKVxuICAgICAgaWYgKCFwdWxzZS5mcmFtZSB8fCBtaWRpU3RhcnQpIHsgIC8vIG5vIGZyYW1lcyBjb3VudGVkIHdoaWxlIHBhdXNlZCAoc3RhcnRpbmcgZnJvbSBubyBjbG9jaywgdW5saWtlbHkpIG9yIHRyaWdnZXJlZCBieSBNSURJIGNsb2NrIFNUQVJUXG4gICAgICAgIHRoaXMuc2V0RnJhbWUoMCkgIC8vIG1ha2Ugc3VyZSBmcmFtZSBhbGlnbnMgd2l0aCBwdWxzZSBjb3VudCBmb3IgYW4gYWNjdXJhdGUgYmVhdFxuICAgICAgICBwdWxzZS5mcmFtZSA9IDBcbiAgICAgICAgcHVsc2UuY291bnQgPSA1ICAgLy8gYnkgTUlESSBzdGFuZGFyZCBuZXh0IHB1bHNlIGlzIHRoZSBiZWF0XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIGlmIChtc2cgPT09IHRydWUpIHsgY2xpZW50LmlvLm1pZGkuc2VuZENsb2NrU3RhcnQoKSB9XG4gICAgICB0aGlzLnNldFNwZWVkKHRoaXMuc3BlZWQudGFyZ2V0LCB0aGlzLnNwZWVkLnRhcmdldCwgdHJ1ZSlcbiAgICB9XG4gIH1cblxuICB0aGlzLnN0b3AgPSBmdW5jdGlvbiAobXNnID0gZmFsc2UpIHtcbiAgICBjb25zb2xlLmxvZygnQ2xvY2snLCAnU3RvcCcpXG4gICAgaWYgKHRoaXMuaXNQYXVzZWQgPT09IHRydWUpIHsgcmV0dXJuIH1cbiAgICB0aGlzLmlzUGF1c2VkID0gdHJ1ZVxuICAgIGlmICh0aGlzLmlzUHVwcGV0ID09PSB0cnVlKSB7XG4gICAgICBjb25zb2xlLndhcm4oJ0Nsb2NrJywgJ0V4dGVybmFsIE1pZGkgY29udHJvbCcpXG4gICAgfSBlbHNlIHtcbiAgICAgIGlmIChtc2cgPT09IHRydWUgfHwgY2xpZW50LmlvLm1pZGkuaXNDbG9jaykgeyBjbGllbnQuaW8ubWlkaS5zZW5kQ2xvY2tTdG9wKCkgfVxuICAgICAgdGhpcy5jbGVhclRpbWVyKClcbiAgICB9XG4gICAgY2xpZW50LmlvLm1pZGkuYWxsTm90ZXNPZmYoKVxuICAgIGNsaWVudC5pby5taWRpLnNpbGVuY2UoKVxuICB9XG5cbiAgLy8gRXh0ZXJuYWwgQ2xvY2tcblxuICBjb25zdCBwdWxzZSA9IHtcbiAgICBjb3VudDogMCxcbiAgICBsYXN0OiBudWxsLFxuICAgIHRpbWVyOiBudWxsLFxuICAgIGZyYW1lOiAwICAvLyBwYXVzZWQgZnJhbWUgY291bnRlclxuICB9XG5cbiAgdGhpcy50YXAgPSBmdW5jdGlvbiAoKSB7XG4gICAgcHVsc2UuY291bnQgPSAocHVsc2UuY291bnQgKyAxKSAlIDZcbiAgICBwdWxzZS5sYXN0ID0gcGVyZm9ybWFuY2Uubm93KClcbiAgICBpZiAoIXRoaXMuaXNQdXBwZXQpIHtcbiAgICAgIGNvbnNvbGUubG9nKCdDbG9jaycsICdQdXBwZXRlZXJpbmcgc3RhcnRzLi4nKVxuICAgICAgdGhpcy5pc1B1cHBldCA9IHRydWVcbiAgICAgIHRoaXMuY2xlYXJUaW1lcigpXG4gICAgICBwdWxzZS50aW1lciA9IHNldEludGVydmFsKCgpID0+IHtcbiAgICAgICAgaWYgKHBlcmZvcm1hbmNlLm5vdygpIC0gcHVsc2UubGFzdCA8IDIwMDApIHsgcmV0dXJuIH1cbiAgICAgICAgdGhpcy51bnRhcCgpXG4gICAgICB9LCAyMDAwKVxuICAgIH1cbiAgICBpZiAocHVsc2UuY291bnQgPT0gMCkge1xuICAgICAgaWYgKHRoaXMuaXNQYXVzZWQpIHsgcHVsc2UuZnJhbWUrKyB9XG4gICAgICBlbHNlIHtcbiAgICAgICAgaWYgKHB1bHNlLmZyYW1lID4gMCkge1xuICAgICAgICAgIHRoaXMuc2V0RnJhbWUoY2xpZW50Lm9yY2EuZiArIHB1bHNlLmZyYW1lKVxuICAgICAgICAgIHB1bHNlLmZyYW1lID0gMFxuICAgICAgICB9XG4gICAgICAgIGNsaWVudC5ydW4oKVxuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHRoaXMudW50YXAgPSBmdW5jdGlvbiAoKSB7XG4gICAgY29uc29sZS5sb2coJ0Nsb2NrJywgJ1B1cHBldGVlcmluZyBzdG9wcy4uJylcbiAgICBjbGVhckludGVydmFsKHB1bHNlLnRpbWVyKVxuICAgIHRoaXMuaXNQdXBwZXQgPSBmYWxzZVxuICAgIHB1bHNlLmZyYW1lID0gMFxuICAgIHB1bHNlLmxhc3QgPSBudWxsXG4gICAgaWYgKCF0aGlzLmlzUGF1c2VkKSB7XG4gICAgICB0aGlzLnNldFRpbWVyKHRoaXMuc3BlZWQudmFsdWUpXG4gICAgfVxuICB9XG5cbiAgLy8gVGltZXJcblxuICB0aGlzLnNldFRpbWVyID0gZnVuY3Rpb24gKGJwbSkge1xuICAgIGlmIChicG0gPCA2MCkgeyBjb25zb2xlLndhcm4oJ0Nsb2NrJywgJ0Vycm9yICcgKyBicG0pOyByZXR1cm4gfVxuICAgIHRoaXMuY2xlYXJUaW1lcigpXG4gICAgd2luZG93LmxvY2FsU3RvcmFnZS5zZXRJdGVtKCdicG0nLCBicG0pXG4gICAgdGhpcy50aW1lciA9IG5ldyBXb3JrZXIod29ya2VyKVxuICAgIHRoaXMudGltZXIucG9zdE1lc3NhZ2UoKDYwMDAwIC8gcGFyc2VJbnQoYnBtKSkgLyA0KVxuICAgIHRoaXMudGltZXIub25tZXNzYWdlID0gKGV2ZW50KSA9PiB7XG4gICAgICBjbGllbnQuaW8ubWlkaS5zZW5kQ2xvY2soKVxuICAgICAgY2xpZW50LnJ1bigpXG4gICAgfVxuICB9XG5cbiAgdGhpcy5jbGVhclRpbWVyID0gZnVuY3Rpb24gKCkge1xuICAgIGlmICh0aGlzLnRpbWVyKSB7XG4gICAgICB0aGlzLnRpbWVyLnRlcm1pbmF0ZSgpXG4gICAgfVxuICAgIHRoaXMudGltZXIgPSBudWxsXG4gIH1cblxuICB0aGlzLnNldEZyYW1lID0gZnVuY3Rpb24gKGYpIHtcbiAgICBpZiAoaXNOYU4oZikpIHsgcmV0dXJuIH1cbiAgICBjbGllbnQub3JjYS5mID0gY2xhbXAoZiwgMCwgOTk5OTk5OSlcbiAgfVxuXG4gIC8vIFVJXG5cbiAgdGhpcy50b1N0cmluZyA9IGZ1bmN0aW9uICgpIHtcbiAgICBjb25zdCBkaWZmID0gdGhpcy5zcGVlZC50YXJnZXQgLSB0aGlzLnNwZWVkLnZhbHVlXG4gICAgY29uc3QgX29mZnNldCA9IE1hdGguYWJzKGRpZmYpID4gNSA/IChkaWZmID4gMCA/IGArJHtkaWZmfWAgOiBkaWZmKSA6ICcnXG4gICAgY29uc3QgX21lc3NhZ2UgPSB0aGlzLmlzUHVwcGV0ID09PSB0cnVlID8gJ21pZGknIDogYCR7dGhpcy5zcGVlZC52YWx1ZX0ke19vZmZzZXR9YFxuICAgIGNvbnN0IF9iZWF0ID0gZGlmZiA9PT0gMCAmJiBjbGllbnQub3JjYS5mICUgNCA9PT0gMCA/ICcqJyA6ICcnXG4gICAgcmV0dXJuIGAke19tZXNzYWdlfSR7X2JlYXR9YFxuICB9XG5cbiAgZnVuY3Rpb24gY2xhbXAgKHYsIG1pbiwgbWF4KSB7IHJldHVybiB2IDwgbWluID8gbWluIDogdiA+IG1heCA/IG1heCA6IHYgfVxufVxuXG4vKioqIEVYUE9SVFMgRlJPTSBleHBvcnRzLWxvYWRlciAqKiovXG5leHBvcnQgZGVmYXVsdCBDbG9jaztcbiIsIid1c2Ugc3RyaWN0J1xuXG5mdW5jdGlvbiBDb21tYW5kZXIgKGNsaWVudCkge1xuICB0aGlzLmlzQWN0aXZlID0gZmFsc2VcbiAgdGhpcy5xdWVyeSA9ICcnXG4gIHRoaXMuaGlzdG9yeSA9IFtdXG4gIHRoaXMuaGlzdG9yeUluZGV4ID0gMFxuXG4gIC8vIExpYnJhcnlcblxuICB0aGlzLnBhc3NpdmVzID0ge1xuICAgIGZpbmQ6IChwKSA9PiB7IGNsaWVudC5jdXJzb3IuZmluZChwLnN0cikgfSxcbiAgICBzZWxlY3Q6IChwKSA9PiB7IGNsaWVudC5jdXJzb3Iuc2VsZWN0KHAueCwgcC55LCBwLncgfHwgMCwgcC5oIHx8IDApIH0sXG4gICAgaW5qZWN0OiAocCkgPT4ge1xuICAgICAgY2xpZW50LmN1cnNvci5zZWxlY3QocC5feCwgcC5feSlcbiAgICAgIGlmIChjbGllbnQuc291cmNlLmNhY2hlW3AuX3N0ciArICcub3JjYSddKSB7XG4gICAgICAgIGNvbnN0IGJsb2NrID0gY2xpZW50LnNvdXJjZS5jYWNoZVtwLl9zdHIgKyAnLm9yY2EnXVxuICAgICAgICBjb25zdCByZWN0ID0gY2xpZW50Lm9yY2EudG9SZWN0KGJsb2NrKVxuICAgICAgICBjbGllbnQuY3Vyc29yLnNjYWxlVG8ocmVjdC54LCByZWN0LnkpXG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgdGhpcy5hY3RpdmVzID0ge1xuICAgIC8vIFBvcnRzXG4gICAgb3NjOiAocCkgPT4geyBjbGllbnQuaW8ub3NjLnNlbGVjdChwLmludCkgfSxcbiAgICB1ZHA6IChwKSA9PiB7XG4gICAgICBjbGllbnQuaW8udWRwLnNlbGVjdE91dHB1dChwLngpXG4gICAgICBpZiAocC55ICE9PSBudWxsKSB7IGNsaWVudC5pby51ZHAuc2VsZWN0SW5wdXQocC55KSB9XG4gICAgfSxcbiAgICBtaWRpOiAocCkgPT4ge1xuICAgICAgY2xpZW50LmlvLm1pZGkuc2VsZWN0T3V0cHV0KHAueClcbiAgICAgIGlmIChwLnkgIT09IG51bGwpIHsgY2xpZW50LmlvLm1pZGkuc2VsZWN0SW5wdXQocC55KSB9XG4gICAgfSxcbiAgICBpcDogKHApID0+IHsgY2xpZW50LmlvLnNldElwKHAuc3RyKSB9LFxuICAgIGNjOiAocCkgPT4geyBjbGllbnQuaW8uY2Muc2V0T2Zmc2V0KHAuaW50KSB9LFxuICAgIHBnOiAocCkgPT4geyBjbGllbnQuaW8uY2Muc3RhY2sucHVzaCh7IGNoYW5uZWw6IGNsYW1wKHAuaW50c1swXSwgMCwgMTUpLCBiYW5rOiBwLmludHNbMV0sIHN1YjogcC5pbnRzWzJdLCBwZ206IGNsYW1wKHAuaW50c1szXSwgMCwgMTI3KSwgdHlwZTogJ3BnJyB9KTsgY2xpZW50LmlvLmNjLnJ1bigpIH0sXG4gICAgLy8gQ3Vyc29yXG4gICAgY29weTogKHApID0+IHsgY2xpZW50LmN1cnNvci5jb3B5KCkgfSxcbiAgICBwYXN0ZTogKHApID0+IHsgY2xpZW50LmN1cnNvci5wYXN0ZSh0cnVlKSB9LFxuICAgIGVyYXNlOiAocCkgPT4geyBjbGllbnQuY3Vyc29yLmVyYXNlKCkgfSxcbiAgICAvLyBDb250cm9sc1xuICAgIHBsYXk6IChwKSA9PiB7IGNsaWVudC5jbG9jay5wbGF5KCkgfSxcbiAgICBzdG9wOiAocCkgPT4geyBjbGllbnQuY2xvY2suc3RvcCgpIH0sXG4gICAgcnVuOiAocCkgPT4geyBjbGllbnQucnVuKCkgfSxcbiAgICAvLyBUaW1lXG4gICAgYXBtOiAocCkgPT4geyBjbGllbnQuY2xvY2suc2V0U3BlZWQobnVsbCwgcC5pbnQpIH0sXG4gICAgYnBtOiAocCkgPT4geyBjbGllbnQuY2xvY2suc2V0U3BlZWQocC5pbnQsIHAuaW50LCB0cnVlKSB9LFxuICAgIGZyYW1lOiAocCkgPT4geyBjbGllbnQuY2xvY2suc2V0RnJhbWUocC5pbnQpIH0sXG4gICAgcmV3aW5kOiAocCkgPT4geyBjbGllbnQuY2xvY2suc2V0RnJhbWUoY2xpZW50Lm9yY2EuZiAtIHAuaW50KSB9LFxuICAgIHNraXA6IChwKSA9PiB7IGNsaWVudC5jbG9jay5zZXRGcmFtZShjbGllbnQub3JjYS5mICsgcC5pbnQpIH0sXG4gICAgdGltZTogKHAsIG9yaWdpbikgPT4ge1xuICAgICAgY29uc3QgZm9ybWF0dGVkID0gbmV3IERhdGUoMjUwICogKGNsaWVudC5vcmNhLmYgKiAoNjAgLyBjbGllbnQuY2xvY2suc3BlZWQudmFsdWUpKSkudG9JU09TdHJpbmcoKS5zdWJzdHIoMTQsIDUpLnJlcGxhY2UoLzovZywgJycpXG4gICAgICBjbGllbnQub3JjYS53cml0ZUJsb2NrKG9yaWdpbiA/IG9yaWdpbi54IDogY2xpZW50LmN1cnNvci54LCBvcmlnaW4gPyBvcmlnaW4ueSA6IGNsaWVudC5jdXJzb3IueSwgYCR7Zm9ybWF0dGVkfWApXG4gICAgfSxcbiAgICAvLyBUaGVtZWluZ1xuICAgIGNvbG9yOiAocCkgPT4ge1xuICAgICAgaWYgKHAucGFydHNbMF0pIHsgY2xpZW50LnRoZW1lLnNldCgnYl9sb3cnLCBwLnBhcnRzWzBdKSB9XG4gICAgICBpZiAocC5wYXJ0c1sxXSkgeyBjbGllbnQudGhlbWUuc2V0KCdiX21lZCcsIHAucGFydHNbMV0pIH1cbiAgICAgIGlmIChwLnBhcnRzWzJdKSB7IGNsaWVudC50aGVtZS5zZXQoJ2JfaGlnaCcsIHAucGFydHNbMl0pIH1cbiAgICB9LFxuICAgIC8vIEVkaXRcbiAgICBmaW5kOiAocCkgPT4geyBjbGllbnQuY3Vyc29yLmZpbmQocC5zdHIpIH0sXG4gICAgc2VsZWN0OiAocCkgPT4geyBjbGllbnQuY3Vyc29yLnNlbGVjdChwLngsIHAueSwgcC53IHx8IDAsIHAuaCB8fCAwKSB9LFxuICAgIGluamVjdDogKHAsIG9yaWdpbikgPT4ge1xuICAgICAgY29uc3QgYmxvY2sgPSBjbGllbnQuc291cmNlLmNhY2hlW3AuX3N0ciArICcub3JjYSddXG4gICAgICBpZiAoIWJsb2NrKSB7IGNvbnNvbGUud2FybignQ29tbWFuZGVyJywgJ1Vua25vd24gYmxvY2s6ICcgKyBwLl9zdHIpOyByZXR1cm4gfVxuICAgICAgY2xpZW50Lm9yY2Eud3JpdGVCbG9jayhvcmlnaW4gPyBvcmlnaW4ueCA6IGNsaWVudC5jdXJzb3IueCwgb3JpZ2luID8gb3JpZ2luLnkgOiBjbGllbnQuY3Vyc29yLnksIGJsb2NrKVxuICAgICAgY2xpZW50LmN1cnNvci5zY2FsZVRvKDAsIDApXG4gICAgfSxcbiAgICB3cml0ZTogKHApID0+IHtcbiAgICAgIGNsaWVudC5vcmNhLndyaXRlQmxvY2socC5feCB8fCBjbGllbnQuY3Vyc29yLngsIHAuX3kgfHwgY2xpZW50LmN1cnNvci55LCBwLl9zdHIpXG4gICAgfVxuICB9XG5cbiAgLy8gTWFrZSBzaG9ydGhhbmRzXG4gIGZvciAoY29uc3QgaWQgaW4gdGhpcy5hY3RpdmVzKSB7XG4gICAgdGhpcy5hY3RpdmVzW2lkLnN1YnN0cigwLCAyKV0gPSB0aGlzLmFjdGl2ZXNbaWRdXG4gIH1cblxuICBmdW5jdGlvbiBQYXJhbSAodmFsKSB7XG4gICAgdGhpcy5zdHIgPSBgJHt2YWx9YFxuICAgIHRoaXMubGVuZ3RoID0gdGhpcy5zdHIubGVuZ3RoXG4gICAgdGhpcy5jaGFycyA9IHRoaXMuc3RyLnNwbGl0KCcnKVxuICAgIHRoaXMuaW50ID0gIWlzTmFOKHZhbCkgPyBwYXJzZUludCh2YWwpIDogbnVsbFxuICAgIHRoaXMucGFydHMgPSB2YWwuc3BsaXQoJzsnKVxuICAgIHRoaXMuaW50cyA9IHRoaXMucGFydHMubWFwKCh2YWwpID0+IHsgcmV0dXJuIHBhcnNlSW50KHZhbCkgfSlcbiAgICB0aGlzLnggPSBwYXJzZUludCh0aGlzLnBhcnRzWzBdKVxuICAgIHRoaXMueSA9IHBhcnNlSW50KHRoaXMucGFydHNbMV0pXG4gICAgdGhpcy53ID0gcGFyc2VJbnQodGhpcy5wYXJ0c1syXSlcbiAgICB0aGlzLmggPSBwYXJzZUludCh0aGlzLnBhcnRzWzNdKVxuICAgIC8vIE9wdGlvbmFscyBQb3NpdGlvbiBTdHlsZVxuICAgIHRoaXMuX3N0ciA9IHRoaXMucGFydHNbMF1cbiAgICB0aGlzLl94ID0gcGFyc2VJbnQodGhpcy5wYXJ0c1sxXSlcbiAgICB0aGlzLl95ID0gcGFyc2VJbnQodGhpcy5wYXJ0c1syXSlcbiAgfVxuXG4gIC8vIEJlZ2luXG5cbiAgdGhpcy5zdGFydCA9IChxID0gJycpID0+IHtcbiAgICB0aGlzLmlzQWN0aXZlID0gdHJ1ZVxuICAgIHRoaXMucXVlcnkgPSBxXG4gICAgY2xpZW50LmN1cnNvci5pbnMgPSBmYWxzZVxuICAgIGNsaWVudC51cGRhdGUoKVxuICB9XG5cbiAgdGhpcy5zdG9wID0gKCkgPT4ge1xuICAgIHRoaXMuaXNBY3RpdmUgPSBmYWxzZVxuICAgIHRoaXMucXVlcnkgPSAnJ1xuICAgIHRoaXMuaGlzdG9yeUluZGV4ID0gdGhpcy5oaXN0b3J5Lmxlbmd0aFxuICAgIGNsaWVudC51cGRhdGUoKVxuICB9XG5cbiAgdGhpcy5lcmFzZSA9IGZ1bmN0aW9uICgpIHtcbiAgICB0aGlzLnF1ZXJ5ID0gdGhpcy5xdWVyeS5zbGljZSgwLCAtMSlcbiAgICB0aGlzLnByZXZpZXcoKVxuICB9XG5cbiAgdGhpcy53cml0ZSA9IChrZXkpID0+IHtcbiAgICBpZiAoa2V5ID09PSAnQmFja3NwYWNlJykgeyB0aGlzLmVyYXNlKCk7IHJldHVybiB9XG4gICAgaWYgKGtleSA9PT0gJ0VudGVyJykgeyB0aGlzLnJ1bigpOyByZXR1cm4gfVxuICAgIGlmIChrZXkgPT09ICdFc2NhcGUnKSB7IHRoaXMuc3RvcCgpOyByZXR1cm4gfVxuICAgIGlmIChrZXkubGVuZ3RoID4gMSkgeyByZXR1cm4gfVxuICAgIHRoaXMucXVlcnkgKz0ga2V5XG4gICAgdGhpcy5wcmV2aWV3KClcbiAgfVxuXG4gIHRoaXMucnVuID0gZnVuY3Rpb24gKCkge1xuICAgIGNvbnN0IHRvb2wgPSB0aGlzLmlzQWN0aXZlID09PSB0cnVlID8gJ2NvbW1hbmRlcicgOiAnY3Vyc29yJ1xuICAgIGNsaWVudFt0b29sXS50cmlnZ2VyKClcbiAgICBjbGllbnQudXBkYXRlKClcbiAgfVxuXG4gIHRoaXMudHJpZ2dlciA9IGZ1bmN0aW9uIChtc2cgPSB0aGlzLnF1ZXJ5LCBvcmlnaW4gPSBudWxsLCBzdG9wcGluZyA9IHRydWUpIHtcbiAgICBjb25zdCBjbWQgPSBgJHttc2d9YC5zcGxpdCgnOicpWzBdLnRyaW0oKS5yZXBsYWNlKC9cXFcvZywgJycpLnRvTG93ZXJDYXNlKClcbiAgICBjb25zdCB2YWwgPSBgJHttc2d9YC5zdWJzdHIoY21kLmxlbmd0aCArIDEpXG4gICAgY29uc3QgZm4gPSB0aGlzLmFjdGl2ZXNbY21kXVxuICAgIGlmICghZm4pIHsgY29uc29sZS53YXJuKCdDb21tYW5kZXInLCBgVW5rbm93biBtZXNzYWdlOiAke21zZ31gKTsgdGhpcy5zdG9wKCk7IHJldHVybiB9XG4gICAgZm4obmV3IFBhcmFtKHZhbCksIG9yaWdpbilcbiAgICB0aGlzLmhpc3RvcnkucHVzaChtc2cpXG4gICAgdGhpcy5oaXN0b3J5SW5kZXggPSB0aGlzLmhpc3RvcnkubGVuZ3RoXG4gICAgaWYgKHN0b3BwaW5nKSB7XG4gICAgICB0aGlzLnN0b3AoKVxuICAgIH1cbiAgfVxuXG4gIHRoaXMucHJldmlldyA9IGZ1bmN0aW9uIChtc2cgPSB0aGlzLnF1ZXJ5KSB7XG4gICAgY29uc3QgY21kID0gYCR7bXNnfWAuc3BsaXQoJzonKVswXS50b0xvd2VyQ2FzZSgpXG4gICAgY29uc3QgdmFsID0gYCR7bXNnfWAuc3Vic3RyKGNtZC5sZW5ndGggKyAxKVxuICAgIGlmICghdGhpcy5wYXNzaXZlc1tjbWRdKSB7IHJldHVybiB9XG4gICAgdGhpcy5wYXNzaXZlc1tjbWRdKG5ldyBQYXJhbSh2YWwpLCBmYWxzZSlcbiAgfVxuXG4gIC8vIEV2ZW50c1xuXG4gIHRoaXMub25LZXlEb3duID0gKGUpID0+IHtcbiAgICBpZiAoZS5jdHJsS2V5IHx8IGUubWV0YUtleSkgeyByZXR1cm4gfVxuICAgIGNsaWVudFt0aGlzLmlzQWN0aXZlID09PSB0cnVlID8gJ2NvbW1hbmRlcicgOiAnY3Vyc29yJ10ud3JpdGUoZS5rZXkpXG4gICAgZS5zdG9wUHJvcGFnYXRpb24oKVxuICB9XG5cbiAgdGhpcy5vbktleVVwID0gKGUpID0+IHtcbiAgICBjbGllbnQudXBkYXRlKClcbiAgfVxuXG4gIC8vIFVJXG5cbiAgdGhpcy50b1N0cmluZyA9IGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gYCR7dGhpcy5xdWVyeX1gXG4gIH1cblxuICAvLyBVdGlsc1xuXG4gIGZ1bmN0aW9uIGNsYW1wICh2LCBtaW4sIG1heCkgeyByZXR1cm4gdiA8IG1pbiA/IG1pbiA6IHYgPiBtYXggPyBtYXggOiB2IH1cbn1cblxuLyoqKiBFWFBPUlRTIEZST00gZXhwb3J0cy1sb2FkZXIgKioqL1xuZXhwb3J0IGRlZmF1bHQgQ29tbWFuZGVyO1xuIiwiJ3VzZSBzdHJpY3QnXG5cbmZ1bmN0aW9uIEN1cnNvciAoY2xpZW50KSB7XG4gIHRoaXMueCA9IDBcbiAgdGhpcy55ID0gMFxuICB0aGlzLncgPSAwXG4gIHRoaXMuaCA9IDBcblxuICB0aGlzLm1pblggPSAwXG4gIHRoaXMubWF4WCA9IDBcbiAgdGhpcy5taW5ZID0gMFxuICB0aGlzLm1heFkgPSAwXG5cbiAgdGhpcy5pbnMgPSBmYWxzZVxuXG4gIHRoaXMuc3RhcnQgPSAoKSA9PiB7XG4gICAgZG9jdW1lbnQub25tb3VzZWRvd24gPSB0aGlzLm9uTW91c2VEb3duXG4gICAgZG9jdW1lbnQub25tb3VzZXVwID0gdGhpcy5vbk1vdXNlVXBcbiAgICBkb2N1bWVudC5vbm1vdXNlbW92ZSA9IHRoaXMub25Nb3VzZU1vdmVcbiAgICBkb2N1bWVudC5vbmNvcHkgPSB0aGlzLm9uQ29weVxuICAgIGRvY3VtZW50Lm9uY3V0ID0gdGhpcy5vbkN1dFxuICAgIGRvY3VtZW50Lm9ucGFzdGUgPSB0aGlzLm9uUGFzdGVcbiAgICBkb2N1bWVudC5vbmNvbnRleHRtZW51ID0gdGhpcy5vbkNvbnRleHRNZW51XG4gIH1cblxuICB0aGlzLnNlbGVjdCA9ICh4ID0gdGhpcy54LCB5ID0gdGhpcy55LCB3ID0gdGhpcy53LCBoID0gdGhpcy5oKSA9PiB7XG4gICAgaWYgKGlzTmFOKHgpIHx8IGlzTmFOKHkpIHx8IGlzTmFOKHcpIHx8IGlzTmFOKGgpKSB7IHJldHVybiB9XG4gICAgY29uc3QgcmVjdCA9IHsgeDogY2xhbXAocGFyc2VJbnQoeCksIDAsIGNsaWVudC5vcmNhLncgLSAxKSwgeTogY2xhbXAocGFyc2VJbnQoeSksIDAsIGNsaWVudC5vcmNhLmggLSAxKSwgdzogY2xhbXAocGFyc2VJbnQodyksIC10aGlzLngsIGNsaWVudC5vcmNhLncgLSAxKSwgaDogY2xhbXAocGFyc2VJbnQoaCksIC10aGlzLnksIGNsaWVudC5vcmNhLmggLSAxKSB9XG5cbiAgICBpZiAodGhpcy54ID09PSByZWN0LnggJiYgdGhpcy55ID09PSByZWN0LnkgJiYgdGhpcy53ID09PSByZWN0LncgJiYgdGhpcy5oID09PSByZWN0LmgpIHtcbiAgICAgIHJldHVybiAvLyBEb24ndCB1cGRhdGUgd2hlbiB1bmNoYW5nZWRcbiAgICB9XG5cbiAgICB0aGlzLnggPSByZWN0LnhcbiAgICB0aGlzLnkgPSByZWN0LnlcbiAgICB0aGlzLncgPSByZWN0LndcbiAgICB0aGlzLmggPSByZWN0LmhcbiAgICB0aGlzLmNhbGN1bGF0ZUJvdW5kcygpXG4gICAgY2xpZW50LnRvZ2dsZUd1aWRlKGZhbHNlKVxuICAgIGNsaWVudC51cGRhdGUoKVxuICB9XG5cbiAgdGhpcy5zZWxlY3RBbGwgPSAoKSA9PiB7XG4gICAgdGhpcy5zZWxlY3QoMCwgMCwgY2xpZW50Lm9yY2EudywgY2xpZW50Lm9yY2EuaClcbiAgICB0aGlzLmlucyA9IGZhbHNlXG4gIH1cblxuICB0aGlzLm1vdmUgPSAoeCwgeSkgPT4ge1xuICAgIHRoaXMuc2VsZWN0KHRoaXMueCArIHBhcnNlSW50KHgpLCB0aGlzLnkgLSBwYXJzZUludCh5KSlcbiAgfVxuXG4gIHRoaXMubW92ZVRvID0gKHgsIHkpID0+IHtcbiAgICB0aGlzLnNlbGVjdCh4LCB5KVxuICB9XG5cbiAgdGhpcy5zY2FsZSA9ICh3LCBoKSA9PiB7XG4gICAgdGhpcy5zZWxlY3QodGhpcy54LCB0aGlzLnksIHRoaXMudyArIHBhcnNlSW50KHcpLCB0aGlzLmggLSBwYXJzZUludChoKSlcbiAgfVxuXG4gIHRoaXMuc2NhbGVUbyA9ICh3LCBoKSA9PiB7XG4gICAgdGhpcy5zZWxlY3QodGhpcy54LCB0aGlzLnksIHcsIGgpXG4gIH1cblxuICB0aGlzLmRyYWcgPSAoeCwgeSkgPT4ge1xuICAgIGlmIChpc05hTih4KSB8fCBpc05hTih5KSkgeyByZXR1cm4gfVxuICAgIHRoaXMuaW5zID0gZmFsc2VcbiAgICBjb25zdCBibG9jayA9IHRoaXMuc2VsZWN0aW9uKClcbiAgICB0aGlzLmVyYXNlKClcbiAgICB0aGlzLm1vdmUoeCwgeSlcbiAgICBjbGllbnQub3JjYS53cml0ZUJsb2NrKHRoaXMubWluWCwgdGhpcy5taW5ZLCBibG9jaylcbiAgICBjbGllbnQuaGlzdG9yeS5yZWNvcmQoY2xpZW50Lm9yY2EucylcbiAgfVxuXG4gIHRoaXMucmVzZXQgPSAocG9zID0gZmFsc2UpID0+IHtcbiAgICB0aGlzLnNlbGVjdChwb3MgPyAwIDogdGhpcy54LCBwb3MgPyAwIDogdGhpcy55LCAwLCAwKVxuICAgIHRoaXMuaW5zID0gMFxuICB9XG5cbiAgdGhpcy5yZWFkID0gKCkgPT4ge1xuICAgIHJldHVybiBjbGllbnQub3JjYS5nbHlwaEF0KHRoaXMueCwgdGhpcy55KVxuICB9XG5cbiAgdGhpcy53cml0ZSA9IChnKSA9PiB7XG4gICAgaWYgKCFjbGllbnQub3JjYS5pc0FsbG93ZWQoZykpIHsgcmV0dXJuIH1cbiAgICBpZiAoY2xpZW50Lm9yY2Eud3JpdGUodGhpcy54LCB0aGlzLnksIGcpICYmIHRoaXMuaW5zKSB7XG4gICAgICB0aGlzLm1vdmUoMSwgMClcbiAgICB9XG4gICAgY2xpZW50Lmhpc3RvcnkucmVjb3JkKGNsaWVudC5vcmNhLnMpXG4gIH1cblxuICB0aGlzLmVyYXNlID0gKCkgPT4ge1xuICAgIGZvciAobGV0IHkgPSB0aGlzLm1pblk7IHkgPD0gdGhpcy5tYXhZOyB5KyspIHtcbiAgICAgIGZvciAobGV0IHggPSB0aGlzLm1pblg7IHggPD0gdGhpcy5tYXhYOyB4KyspIHtcbiAgICAgICAgY2xpZW50Lm9yY2Eud3JpdGUoeCwgeSwgJy4nKVxuICAgICAgfVxuICAgIH1cbiAgICBjbGllbnQuaGlzdG9yeS5yZWNvcmQoY2xpZW50Lm9yY2EucylcbiAgfVxuXG4gIHRoaXMuZmluZCA9IChzdHIpID0+IHtcbiAgICBjb25zdCBpID0gY2xpZW50Lm9yY2Eucy5pbmRleE9mKHN0cilcbiAgICBpZiAoaSA8IDApIHsgcmV0dXJuIH1cbiAgICBjb25zdCBwb3MgPSBjbGllbnQub3JjYS5wb3NBdChpKVxuICAgIHRoaXMuc2VsZWN0KHBvcy54LCBwb3MueSwgc3RyLmxlbmd0aCAtIDEsIDApXG4gIH1cblxuICB0aGlzLmluc3BlY3QgPSAoKSA9PiB7XG4gICAgaWYgKHRoaXMudyAhPT0gMCB8fCB0aGlzLmggIT09IDApIHsgcmV0dXJuICdtdWx0aScgfVxuICAgIGNvbnN0IGluZGV4ID0gY2xpZW50Lm9yY2EuaW5kZXhBdCh0aGlzLngsIHRoaXMueSlcbiAgICBjb25zdCBwb3J0ID0gY2xpZW50LnBvcnRzW2luZGV4XVxuICAgIGlmIChwb3J0KSB7IHJldHVybiBgJHtwb3J0WzNdfWAgfVxuICAgIGlmIChjbGllbnQub3JjYS5sb2NrQXQodGhpcy54LCB0aGlzLnkpKSB7IHJldHVybiAnbG9ja2VkJyB9XG4gICAgcmV0dXJuICdlbXB0eSdcbiAgfVxuXG4gIHRoaXMudHJpZ2dlciA9ICgpID0+IHtcbiAgICBjb25zdCBvcGVyYXRvciA9IGNsaWVudC5vcmNhLm9wZXJhdG9yQXQodGhpcy54LCB0aGlzLnkpXG4gICAgaWYgKCFvcGVyYXRvcikgeyBjb25zb2xlLndhcm4oJ0N1cnNvcicsICdOb3RoaW5nIHRvIHRyaWdnZXIuJyk7IHJldHVybiB9XG4gICAgY29uc29sZS5sb2coJ0N1cnNvcicsICdUcmlnZ2VyOiAnICsgb3BlcmF0b3IubmFtZSlcbiAgICBvcGVyYXRvci5ydW4odHJ1ZSlcbiAgfVxuXG4gIHRoaXMuY29tbWVudCA9ICgpID0+IHtcbiAgICBjb25zdCBibG9jayA9IHRoaXMuc2VsZWN0aW9uKClcbiAgICBjb25zdCBsaW5lcyA9IGJsb2NrLnRyaW0oKS5zcGxpdCgvXFxyP1xcbi8pXG4gICAgY29uc3QgY2hhciA9IGJsb2NrLnN1YnN0cigwLCAxKSA9PT0gJyMnID8gJy4nIDogJyMnXG4gICAgY29uc3QgcmVzID0gbGluZXMubWFwKChsaW5lKSA9PiB7IHJldHVybiBgJHtjaGFyfSR7bGluZS5zdWJzdHIoMSwgbGluZS5sZW5ndGggLSAyKX0ke2NoYXJ9YCB9KS5qb2luKCdcXG4nKVxuICAgIGNsaWVudC5vcmNhLndyaXRlQmxvY2sodGhpcy5taW5YLCB0aGlzLm1pblksIHJlcylcbiAgICBjbGllbnQuaGlzdG9yeS5yZWNvcmQoY2xpZW50Lm9yY2EucylcbiAgfVxuXG4gIHRoaXMudG9VcHBlckNhc2UgPSAoKSA9PiB7XG4gICAgY29uc3QgYmxvY2sgPSB0aGlzLnNlbGVjdGlvbigpLnRvVXBwZXJDYXNlKClcbiAgICBjbGllbnQub3JjYS53cml0ZUJsb2NrKHRoaXMubWluWCwgdGhpcy5taW5ZLCBibG9jaylcbiAgfVxuXG4gIHRoaXMudG9Mb3dlckNhc2UgPSAoKSA9PiB7XG4gICAgY29uc3QgYmxvY2sgPSB0aGlzLnNlbGVjdGlvbigpLnRvTG93ZXJDYXNlKClcbiAgICBjbGllbnQub3JjYS53cml0ZUJsb2NrKHRoaXMubWluWCwgdGhpcy5taW5ZLCBibG9jaylcbiAgfVxuXG4gIHRoaXMudG9SZWN0ID0gKCkgPT4ge1xuICAgIHJldHVybiB7XG4gICAgICB4OiB0aGlzLm1pblgsXG4gICAgICB5OiB0aGlzLm1pblksXG4gICAgICB3OiB0aGlzLm1heFggLSB0aGlzLm1pblggKyAxLFxuICAgICAgaDogdGhpcy5tYXhZIC0gdGhpcy5taW5ZICsgMVxuICAgIH1cbiAgfVxuXG4gIHRoaXMuY2FsY3VsYXRlQm91bmRzID0gKCkgPT4ge1xuICAgIHRoaXMubWluWCA9IHRoaXMueCA8IHRoaXMueCArIHRoaXMudyA/IHRoaXMueCA6IHRoaXMueCArIHRoaXMud1xuICAgIHRoaXMubWluWSA9IHRoaXMueSA8IHRoaXMueSArIHRoaXMuaCA/IHRoaXMueSA6IHRoaXMueSArIHRoaXMuaFxuICAgIHRoaXMubWF4WCA9IHRoaXMueCA+IHRoaXMueCArIHRoaXMudyA/IHRoaXMueCA6IHRoaXMueCArIHRoaXMud1xuICAgIHRoaXMubWF4WSA9IHRoaXMueSA+IHRoaXMueSArIHRoaXMuaCA/IHRoaXMueSA6IHRoaXMueSArIHRoaXMuaFxuICB9XG5cbiAgdGhpcy5zZWxlY3RlZCA9ICh4LCB5LCB3ID0gMCwgaCA9IDApID0+IHtcbiAgICByZXR1cm4geCA+PSB0aGlzLm1pblggJiYgeCA8PSB0aGlzLm1heFggJiYgeSA+PSB0aGlzLm1pblkgJiYgeSA8PSB0aGlzLm1heFlcbiAgfVxuXG4gIHRoaXMuc2VsZWN0aW9uID0gKHJlY3QgPSB0aGlzLnRvUmVjdCgpKSA9PiB7XG4gICAgcmV0dXJuIGNsaWVudC5vcmNhLmdldEJsb2NrKHJlY3QueCwgcmVjdC55LCByZWN0LncsIHJlY3QuaClcbiAgfVxuXG4gIHRoaXMubW91c2VGcm9tID0gbnVsbFxuXG4gIHRoaXMub25Nb3VzZURvd24gPSAoZSkgPT4ge1xuICAgIGlmIChlLmJ1dHRvbiAhPT0gMCkgeyB0aGlzLmN1dCgpOyByZXR1cm4gfVxuICAgIGNvbnN0IHBvcyA9IHRoaXMubW91c2VQaWNrKGUuY2xpZW50WCwgZS5jbGllbnRZKVxuICAgIHRoaXMuc2VsZWN0KHBvcy54LCBwb3MueSwgMCwgMClcbiAgICB0aGlzLm1vdXNlRnJvbSA9IHBvc1xuICB9XG5cbiAgdGhpcy5vbk1vdXNlTW92ZSA9IChlKSA9PiB7XG4gICAgaWYgKCF0aGlzLm1vdXNlRnJvbSkgeyByZXR1cm4gfVxuICAgIGNvbnN0IHBvcyA9IHRoaXMubW91c2VQaWNrKGUuY2xpZW50WCwgZS5jbGllbnRZKVxuICAgIHRoaXMuc2VsZWN0KHRoaXMubW91c2VGcm9tLngsIHRoaXMubW91c2VGcm9tLnksIHBvcy54IC0gdGhpcy5tb3VzZUZyb20ueCwgcG9zLnkgLSB0aGlzLm1vdXNlRnJvbS55KVxuICB9XG5cbiAgdGhpcy5vbk1vdXNlVXAgPSAoZSkgPT4ge1xuICAgIGlmICh0aGlzLm1vdXNlRnJvbSkge1xuICAgICAgY29uc3QgcG9zID0gdGhpcy5tb3VzZVBpY2soZS5jbGllbnRYLCBlLmNsaWVudFkpXG4gICAgICB0aGlzLnNlbGVjdCh0aGlzLm1vdXNlRnJvbS54LCB0aGlzLm1vdXNlRnJvbS55LCBwb3MueCAtIHRoaXMubW91c2VGcm9tLngsIHBvcy55IC0gdGhpcy5tb3VzZUZyb20ueSlcbiAgICB9XG4gICAgdGhpcy5tb3VzZUZyb20gPSBudWxsXG4gIH1cblxuICB0aGlzLm1vdXNlUGljayA9ICh4LCB5LCB3ID0gY2xpZW50LnRpbGUudywgaCA9IGNsaWVudC50aWxlLmgpID0+IHtcbiAgICByZXR1cm4geyB4OiBwYXJzZUludCgoeCAtIDMwKSAvIHcpLCB5OiBwYXJzZUludCgoeSAtIDMwKSAvIGgpIH1cbiAgfVxuXG4gIHRoaXMub25Db250ZXh0TWVudSA9IChlKSA9PiB7XG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpXG4gIH1cblxuICB0aGlzLmNvcHkgPSBmdW5jdGlvbiAoKSB7XG4gICAgZG9jdW1lbnQuZXhlY0NvbW1hbmQoJ2NvcHknKVxuICB9XG5cbiAgdGhpcy5jdXQgPSBmdW5jdGlvbiAoKSB7XG4gICAgZG9jdW1lbnQuZXhlY0NvbW1hbmQoJ2N1dCcpXG4gIH1cblxuICB0aGlzLnBhc3RlID0gZnVuY3Rpb24gKG92ZXJsYXAgPSBmYWxzZSkge1xuICAgIGRvY3VtZW50LmV4ZWNDb21tYW5kKCdwYXN0ZScpXG4gIH1cblxuICB0aGlzLm9uQ29weSA9IChlKSA9PiB7XG4gICAgZS5jbGlwYm9hcmREYXRhLnNldERhdGEoJ3RleHQvcGxhaW4nLCB0aGlzLnNlbGVjdGlvbigpKVxuICAgIGUucHJldmVudERlZmF1bHQoKVxuICB9XG5cbiAgdGhpcy5vbkN1dCA9IChlKSA9PiB7XG4gICAgdGhpcy5vbkNvcHkoZSlcbiAgICB0aGlzLmVyYXNlKClcbiAgfVxuXG4gIHRoaXMub25QYXN0ZSA9IChlKSA9PiB7XG4gICAgY29uc3QgZGF0YSA9IGUuY2xpcGJvYXJkRGF0YS5nZXREYXRhKCd0ZXh0L3BsYWluJykudHJpbSgpXG4gICAgY2xpZW50Lm9yY2Eud3JpdGVCbG9jayh0aGlzLm1pblgsIHRoaXMubWluWSwgZGF0YSwgdGhpcy5pbnMpXG4gICAgY2xpZW50Lmhpc3RvcnkucmVjb3JkKGNsaWVudC5vcmNhLnMpXG4gICAgdGhpcy5zY2FsZVRvKGRhdGEuc3BsaXQoL1xccj9cXG4vKVswXS5sZW5ndGggLSAxLCBkYXRhLnNwbGl0KC9cXHI/XFxuLykubGVuZ3RoIC0gMSlcbiAgICBlLnByZXZlbnREZWZhdWx0KClcbiAgfVxuXG4gIGZ1bmN0aW9uIGNsYW1wICh2LCBtaW4sIG1heCkgeyByZXR1cm4gdiA8IG1pbiA/IG1pbiA6IHYgPiBtYXggPyBtYXggOiB2IH1cbn1cblxuLyoqKiBFWFBPUlRTIEZST00gZXhwb3J0cy1sb2FkZXIgKioqL1xuZXhwb3J0IGRlZmF1bHQgQ3Vyc29yO1xuIiwiLyoqKiBJTVBPUlRTIEZST00gaW1wb3J0cy1sb2FkZXIgKioqL1xuJ3VzZSBzdHJpY3QnO1xuaW1wb3J0IHRyYW5zcG9zZVRhYmxlIGZyb20gXCIuLi90cmFuc3Bvc2UuanNcIjtcblxuJ3VzZSBzdHJpY3QnXG5cbi8qIGdsb2JhbCB0cmFuc3Bvc2VUYWJsZSAqL1xuXG5mdW5jdGlvbiBNaWRpIChjbGllbnQpIHtcbiAgdGhpcy5tb2RlID0gMFxuICB0aGlzLmlzQ2xvY2sgPSBmYWxzZVxuXG4gIHRoaXMub3V0cHV0SW5kZXggPSAtMVxuICB0aGlzLmlucHV0SW5kZXggPSAtMVxuXG4gIHRoaXMub3V0cHV0cyA9IFtdXG4gIHRoaXMuaW5wdXRzID0gW11cbiAgdGhpcy5zdGFjayA9IFtdXG5cbiAgdGhpcy5zdGFydCA9IGZ1bmN0aW9uICgpIHtcbiAgICBjb25zb2xlLmluZm8oJ01pZGkgU3RhcnRpbmcuLicpXG4gICAgdGhpcy5yZWZyZXNoKClcbiAgfVxuXG4gIHRoaXMuY2xlYXIgPSBmdW5jdGlvbiAoKSB7XG4gICAgdGhpcy5zdGFjayA9IHRoaXMuc3RhY2suZmlsdGVyKChpdGVtKSA9PiB7IHJldHVybiBpdGVtIH0pXG4gIH1cblxuICB0aGlzLnJ1biA9IGZ1bmN0aW9uICgpIHtcbiAgICBmb3IgKGNvbnN0IGlkIGluIHRoaXMuc3RhY2spIHtcbiAgICAgIGNvbnN0IGl0ZW0gPSB0aGlzLnN0YWNrW2lkXVxuICAgICAgaWYgKGl0ZW0uaXNQbGF5ZWQgPT09IGZhbHNlKSB7XG4gICAgICAgIHRoaXMucHJlc3MoaXRlbSlcbiAgICAgIH1cbiAgICAgIGlmIChpdGVtLmxlbmd0aCA8IDEpIHtcbiAgICAgICAgdGhpcy5yZWxlYXNlKGl0ZW0sIGlkKVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgaXRlbS5sZW5ndGgtLVxuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHRoaXMudHJpZ2dlciA9IGZ1bmN0aW9uIChpdGVtLCBkb3duKSB7XG4gICAgaWYgKCF0aGlzLm91dHB1dERldmljZSgpKSB7IGNvbnNvbGUud2FybignTUlESScsICdObyBtaWRpIG91dHB1dCEnKTsgcmV0dXJuIH1cblxuICAgIGNvbnN0IHRyYW5zcG9zZWQgPSB0aGlzLnRyYW5zcG9zZShpdGVtLm5vdGUsIGl0ZW0ub2N0YXZlKVxuICAgIGNvbnN0IGNoYW5uZWwgPSAhaXNOYU4oaXRlbS5jaGFubmVsKSA/IHBhcnNlSW50KGl0ZW0uY2hhbm5lbCkgOiBjbGllbnQub3JjYS52YWx1ZU9mKGl0ZW0uY2hhbm5lbClcblxuICAgIGlmICghdHJhbnNwb3NlZCkgeyByZXR1cm4gfVxuXG4gICAgY29uc3QgYyA9IGRvd24gPT09IHRydWUgPyAweDkwICsgY2hhbm5lbCA6IDB4ODAgKyBjaGFubmVsXG4gICAgY29uc3QgbiA9IHRyYW5zcG9zZWQuaWRcbiAgICBjb25zdCB2ID0gcGFyc2VJbnQoKGl0ZW0udmVsb2NpdHkgLyAxNikgKiAxMjcpXG5cbiAgICBpZiAoIW4gfHwgYyA9PT0gMTI3KSB7IHJldHVybiB9XG5cbiAgICB0aGlzLm91dHB1dERldmljZSgpLnNlbmQoW2MsIG4sIHZdKVxuICB9XG5cbiAgdGhpcy5wcmVzcyA9IGZ1bmN0aW9uIChpdGVtKSB7XG4gICAgaWYgKCFpdGVtKSB7IHJldHVybiB9XG4gICAgdGhpcy50cmlnZ2VyKGl0ZW0sIHRydWUpXG4gICAgaXRlbS5pc1BsYXllZCA9IHRydWVcbiAgfVxuXG4gIHRoaXMucmVsZWFzZSA9IGZ1bmN0aW9uIChpdGVtLCBpZCkge1xuICAgIGlmICghaXRlbSkgeyByZXR1cm4gfVxuICAgIHRoaXMudHJpZ2dlcihpdGVtLCBmYWxzZSlcbiAgICBkZWxldGUgdGhpcy5zdGFja1tpZF1cbiAgfVxuXG4gIHRoaXMuc2lsZW5jZSA9IGZ1bmN0aW9uICgpIHtcbiAgICBmb3IgKGNvbnN0IGl0ZW0gb2YgdGhpcy5zdGFjaykge1xuICAgICAgdGhpcy5yZWxlYXNlKGl0ZW0pXG4gICAgfVxuICB9XG5cbiAgdGhpcy5wdXNoID0gZnVuY3Rpb24gKGNoYW5uZWwsIG9jdGF2ZSwgbm90ZSwgdmVsb2NpdHksIGxlbmd0aCwgaXNQbGF5ZWQgPSBmYWxzZSkge1xuICAgIGNvbnN0IGl0ZW0gPSB7IGNoYW5uZWwsIG9jdGF2ZSwgbm90ZSwgdmVsb2NpdHksIGxlbmd0aCwgaXNQbGF5ZWQgfVxuICAgIC8vIFJldHJpZ2dlciBkdXBsaWNhdGVzXG4gICAgZm9yIChjb25zdCBpZCBpbiB0aGlzLnN0YWNrKSB7XG4gICAgICBjb25zdCBkdXAgPSB0aGlzLnN0YWNrW2lkXVxuICAgICAgaWYgKGR1cC5jaGFubmVsID09PSBjaGFubmVsICYmIGR1cC5vY3RhdmUgPT09IG9jdGF2ZSAmJiBkdXAubm90ZSA9PT0gbm90ZSkgeyB0aGlzLnJlbGVhc2UoaXRlbSwgaWQpIH1cbiAgICB9XG4gICAgdGhpcy5zdGFjay5wdXNoKGl0ZW0pXG4gIH1cblxuICB0aGlzLmFsbE5vdGVzT2ZmID0gZnVuY3Rpb24gKCkge1xuICAgIGlmICghdGhpcy5vdXRwdXREZXZpY2UoKSkgeyByZXR1cm4gfVxuICAgIGNvbnNvbGUubG9nKCdNSURJJywgJ0FsbCBOb3RlcyBPZmYnKVxuICAgIGZvciAobGV0IGNoYW4gPSAwOyBjaGFuIDwgMTY7IGNoYW4rKykge1xuICAgICAgdGhpcy5vdXRwdXREZXZpY2UoKS5zZW5kKFsweEIwICsgY2hhbiwgMTIzLCAwXSlcbiAgICB9XG4gIH1cblxuICAvLyBDbG9ja1xuXG4gIHRoaXMudGlja3MgPSBbXVxuXG4gIHRoaXMuc2VuZENsb2NrU3RhcnQgPSBmdW5jdGlvbiAoKSB7XG4gICAgaWYgKCF0aGlzLm91dHB1dERldmljZSgpKSB7IHJldHVybiB9XG4gICAgdGhpcy5pc0Nsb2NrID0gdHJ1ZVxuICAgIHRoaXMub3V0cHV0RGV2aWNlKCkuc2VuZChbMHhGQV0sIDApXG4gICAgY29uc29sZS5sb2coJ01JREknLCAnTUlESSBTdGFydCBTZW50JylcbiAgfVxuXG4gIHRoaXMuc2VuZENsb2NrU3RvcCA9IGZ1bmN0aW9uICgpIHtcbiAgICBpZiAoIXRoaXMub3V0cHV0RGV2aWNlKCkpIHsgcmV0dXJuIH1cbiAgICB0aGlzLmlzQ2xvY2sgPSBmYWxzZVxuICAgIHRoaXMub3V0cHV0RGV2aWNlKCkuc2VuZChbMHhGQ10sIDApXG4gICAgY29uc29sZS5sb2coJ01JREknLCAnTUlESSBTdG9wIFNlbnQnKVxuICB9XG5cbiAgdGhpcy5zZW5kQ2xvY2sgPSBmdW5jdGlvbiAoKSB7XG4gICAgaWYgKCF0aGlzLm91dHB1dERldmljZSgpKSB7IHJldHVybiB9XG4gICAgaWYgKHRoaXMuaXNDbG9jayAhPT0gdHJ1ZSkgeyByZXR1cm4gfVxuXG4gICAgY29uc3QgYnBtID0gY2xpZW50LmNsb2NrLnNwZWVkLnZhbHVlXG4gICAgY29uc3QgZnJhbWVUaW1lID0gKDYwMDAwIC8gYnBtKSAvIDRcbiAgICBjb25zdCBmcmFtZUZyYWcgPSBmcmFtZVRpbWUgLyA2XG5cbiAgICBmb3IgKGxldCBpZCA9IDA7IGlkIDwgNjsgaWQrKykge1xuICAgICAgaWYgKHRoaXMudGlja3NbaWRdKSB7IGNsZWFyVGltZW91dCh0aGlzLnRpY2tzW2lkXSkgfVxuICAgICAgdGhpcy50aWNrc1tpZF0gPSBzZXRUaW1lb3V0KCgpID0+IHsgdGhpcy5vdXRwdXREZXZpY2UoKS5zZW5kKFsweEY4XSwgMCkgfSwgcGFyc2VJbnQoaWQpICogZnJhbWVGcmFnKVxuICAgIH1cbiAgfVxuXG4gIHRoaXMucmVjZWl2ZSA9IGZ1bmN0aW9uIChtc2cpIHtcbiAgICBzd2l0Y2ggKG1zZy5kYXRhWzBdKSB7XG4gICAgICAvLyBDbG9ja1xuICAgICAgY2FzZSAweEY4OlxuICAgICAgICBjbGllbnQuY2xvY2sudGFwKClcbiAgICAgICAgYnJlYWtcbiAgICAgIGNhc2UgMHhGQTpcbiAgICAgICAgY29uc29sZS5sb2coJ01JREknLCAnU3RhcnQgUmVjZWl2ZWQnKVxuICAgICAgICBjbGllbnQuY2xvY2sucGxheShmYWxzZSwgdHJ1ZSlcbiAgICAgICAgYnJlYWtcbiAgICAgIGNhc2UgMHhGQjpcbiAgICAgICAgY29uc29sZS5sb2coJ01JREknLCAnQ29udGludWUgUmVjZWl2ZWQnKVxuICAgICAgICBjbGllbnQuY2xvY2sucGxheSgpXG4gICAgICAgIGJyZWFrXG4gICAgICBjYXNlIDB4RkM6XG4gICAgICAgIGNvbnNvbGUubG9nKCdNSURJJywgJ1N0b3AgUmVjZWl2ZWQnKVxuICAgICAgICBjbGllbnQuY2xvY2suc3RvcCgpXG4gICAgICAgIGJyZWFrXG4gICAgfVxuICB9XG5cbiAgLy8gVG9vbHNcblxuICB0aGlzLnNlbGVjdE91dHB1dCA9IGZ1bmN0aW9uIChpZCkge1xuICAgIGlmIChpZCA9PT0gLTEpIHsgdGhpcy5vdXRwdXRJbmRleCA9IC0xOyBjb25zb2xlLmxvZygnTUlESScsICdTZWxlY3QgT3V0cHV0IERldmljZTogTm9uZScpOyByZXR1cm4gfVxuICAgIGlmICghdGhpcy5vdXRwdXRzW2lkXSkgeyBjb25zb2xlLndhcm4oJ01JREknLGBVbmtub3duIGRldmljZSB3aXRoIGlkICR7aWR9YCk7IHJldHVybiB9XG5cbiAgICB0aGlzLm91dHB1dEluZGV4ID0gcGFyc2VJbnQoaWQpXG4gICAgY29uc29sZS5sb2coJ01JREknLCBgU2VsZWN0IE91dHB1dCBEZXZpY2U6ICR7dGhpcy5vdXRwdXREZXZpY2UoKS5uYW1lfWApXG4gIH1cblxuICB0aGlzLnNlbGVjdElucHV0ID0gZnVuY3Rpb24gKGlkKSB7XG4gICAgaWYgKHRoaXMuaW5wdXREZXZpY2UoKSkgeyB0aGlzLmlucHV0RGV2aWNlKCkub25taWRpbWVzc2FnZSA9IG51bGwgfVxuICAgIGlmIChpZCA9PT0gLTEpIHsgdGhpcy5pbnB1dEluZGV4ID0gLTE7IGNvbnNvbGUubG9nKCdNSURJJywgJ1NlbGVjdCBJbnB1dCBEZXZpY2U6IE5vbmUnKTsgcmV0dXJuIH1cbiAgICBpZiAoIXRoaXMuaW5wdXRzW2lkXSkgeyBjb25zb2xlLndhcm4oJ01JREknLGBVbmtub3duIGRldmljZSB3aXRoIGlkICR7aWR9YCk7IHJldHVybiB9XG5cbiAgICB0aGlzLmlucHV0SW5kZXggPSBwYXJzZUludChpZClcbiAgICB0aGlzLmlucHV0RGV2aWNlKCkub25taWRpbWVzc2FnZSA9IChtc2cpID0+IHsgdGhpcy5yZWNlaXZlKG1zZykgfVxuICAgIGNvbnNvbGUubG9nKCdNSURJJywgYFNlbGVjdCBJbnB1dCBEZXZpY2U6ICR7dGhpcy5pbnB1dERldmljZSgpLm5hbWV9YClcbiAgfVxuXG4gIHRoaXMub3V0cHV0RGV2aWNlID0gZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiB0aGlzLm91dHB1dHNbdGhpcy5vdXRwdXRJbmRleF1cbiAgfVxuXG4gIHRoaXMuaW5wdXREZXZpY2UgPSBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIHRoaXMuaW5wdXRzW3RoaXMuaW5wdXRJbmRleF1cbiAgfVxuXG4gIHRoaXMuc2VsZWN0TmV4dE91dHB1dCA9ICgpID0+IHtcbiAgICB0aGlzLm91dHB1dEluZGV4ID0gdGhpcy5vdXRwdXRJbmRleCA8IHRoaXMub3V0cHV0cy5sZW5ndGggPyB0aGlzLm91dHB1dEluZGV4ICsgMSA6IDBcbiAgICBjbGllbnQudXBkYXRlKClcbiAgfVxuXG4gIHRoaXMuc2VsZWN0TmV4dElucHV0ID0gKCkgPT4ge1xuICAgIGNvbnN0IGlkID0gdGhpcy5pbnB1dEluZGV4IDwgdGhpcy5pbnB1dHMubGVuZ3RoIC0gMSA/IHRoaXMuaW5wdXRJbmRleCArIDEgOiAtMVxuICAgIHRoaXMuc2VsZWN0SW5wdXQoaWQpXG4gICAgY2xpZW50LnVwZGF0ZSgpXG4gIH1cblxuICAvLyBTZXR1cFxuXG4gIHRoaXMucmVmcmVzaCA9IGZ1bmN0aW9uICgpIHtcbiAgICBpZiAoIW5hdmlnYXRvci5yZXF1ZXN0TUlESUFjY2VzcykgeyByZXR1cm4gfVxuICAgIG5hdmlnYXRvci5yZXF1ZXN0TUlESUFjY2VzcygpLnRoZW4odGhpcy5hY2Nlc3MsIChlcnIpID0+IHtcbiAgICAgIGNvbnNvbGUud2FybignTm8gTWlkaScsIGVycilcbiAgICB9KVxuICB9XG5cbiAgdGhpcy5hY2Nlc3MgPSAobWlkaUFjY2VzcykgPT4ge1xuICAgIGNvbnN0IG91dHB1dHMgPSBtaWRpQWNjZXNzLm91dHB1dHMudmFsdWVzKClcbiAgICB0aGlzLm91dHB1dHMgPSBbXVxuICAgIGZvciAobGV0IGkgPSBvdXRwdXRzLm5leHQoKTsgaSAmJiAhaS5kb25lOyBpID0gb3V0cHV0cy5uZXh0KCkpIHtcbiAgICAgIHRoaXMub3V0cHV0cy5wdXNoKGkudmFsdWUpXG4gICAgfVxuICAgIHRoaXMuc2VsZWN0T3V0cHV0KDApXG5cbiAgICBjb25zdCBpbnB1dHMgPSBtaWRpQWNjZXNzLmlucHV0cy52YWx1ZXMoKVxuICAgIHRoaXMuaW5wdXRzID0gW11cbiAgICBmb3IgKGxldCBpID0gaW5wdXRzLm5leHQoKTsgaSAmJiAhaS5kb25lOyBpID0gaW5wdXRzLm5leHQoKSkge1xuICAgICAgdGhpcy5pbnB1dHMucHVzaChpLnZhbHVlKVxuICAgIH1cbiAgICB0aGlzLnNlbGVjdElucHV0KC0xKVxuICB9XG5cbiAgLy8gVUlcblxuICB0aGlzLnRyYW5zcG9zZSA9IGZ1bmN0aW9uIChuLCBvID0gMykge1xuICAgIGlmICghdHJhbnNwb3NlVGFibGVbbl0pIHsgcmV0dXJuIG51bGwgfVxuICAgIGNvbnN0IG9jdGF2ZSA9IGNsYW1wKHBhcnNlSW50KG8pICsgcGFyc2VJbnQodHJhbnNwb3NlVGFibGVbbl0uY2hhckF0KDEpKSwgMCwgOClcbiAgICBjb25zdCBub3RlID0gdHJhbnNwb3NlVGFibGVbbl0uY2hhckF0KDApXG4gICAgY29uc3QgdmFsdWUgPSBbJ0MnLCAnYycsICdEJywgJ2QnLCAnRScsICdGJywgJ2YnLCAnRycsICdnJywgJ0EnLCAnYScsICdCJ10uaW5kZXhPZihub3RlKVxuICAgIGNvbnN0IGlkID0gY2xhbXAoKG9jdGF2ZSAqIDEyKSArIHZhbHVlICsgMjQsIDAsIDEyNylcbiAgICByZXR1cm4geyBpZCwgdmFsdWUsIG5vdGUsIG9jdGF2ZSB9XG4gIH1cblxuICB0aGlzLmNvbnZlcnQgPSBmdW5jdGlvbiAoaWQpIHtcbiAgICBjb25zdCBub3RlID0gWydDJywgJ2MnLCAnRCcsICdkJywgJ0UnLCAnRicsICdmJywgJ0cnLCAnZycsICdBJywgJ2EnLCAnQiddW2lkICUgMTJdXG4gICAgY29uc3Qgb2N0YXZlID0gTWF0aC5mbG9vcihpZCAvIDEyKSAtIDVcbiAgICBjb25zdCBuYW1lID0gYCR7bm90ZX0ke29jdGF2ZX1gXG4gICAgY29uc3Qga2V5ID0gT2JqZWN0LnZhbHVlcyh0cmFuc3Bvc2VUYWJsZSkuaW5kZXhPZihuYW1lKVxuICAgIHJldHVybiBPYmplY3Qua2V5cyh0cmFuc3Bvc2VUYWJsZSlba2V5XVxuICB9XG5cbiAgdGhpcy50b1N0cmluZyA9IGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gIW5hdmlnYXRvci5yZXF1ZXN0TUlESUFjY2VzcyA/ICdObyBNaWRpIFN1cHBvcnQnIDogdGhpcy5vdXRwdXREZXZpY2UoKSA/IGAke3RoaXMub3V0cHV0RGV2aWNlKCkubmFtZX1gIDogJ05vIE1pZGkgRGV2aWNlJ1xuICB9XG5cbiAgdGhpcy50b0lucHV0U3RyaW5nID0gKCkgPT4ge1xuICAgIHJldHVybiAhbmF2aWdhdG9yLnJlcXVlc3RNSURJQWNjZXNzID8gJ05vIE1pZGkgU3VwcG9ydCcgOiB0aGlzLmlucHV0RGV2aWNlKCkgPyBgJHt0aGlzLmlucHV0RGV2aWNlKCkubmFtZX1gIDogJ05vIElucHV0IERldmljZSdcbiAgfVxuXG4gIHRoaXMudG9PdXRwdXRTdHJpbmcgPSAoKSA9PiB7XG4gICAgcmV0dXJuICFuYXZpZ2F0b3IucmVxdWVzdE1JRElBY2Nlc3MgPyAnTm8gTWlkaSBTdXBwb3J0JyA6IHRoaXMub3V0cHV0RGV2aWNlKCkgPyBgJHt0aGlzLm91dHB1dERldmljZSgpLm5hbWV9YCA6ICdObyBPdXRwdXQgRGV2aWNlJ1xuICB9XG5cbiAgdGhpcy5sZW5ndGggPSBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIHRoaXMuc3RhY2subGVuZ3RoXG4gIH1cblxuICBmdW5jdGlvbiBjbGFtcCAodiwgbWluLCBtYXgpIHsgcmV0dXJuIHYgPCBtaW4gPyBtaW4gOiB2ID4gbWF4ID8gbWF4IDogdiB9XG59XG5cbi8qKiogRVhQT1JUUyBGUk9NIGV4cG9ydHMtbG9hZGVyICoqKi9cbmV4cG9ydCBkZWZhdWx0IE1pZGk7XG4iLCIndXNlIHN0cmljdCdcblxuZnVuY3Rpb24gTW9ubyAoY2xpZW50KSB7XG4gIHRoaXMuc3RhY2sgPSB7fVxuXG4gIHRoaXMuc3RhcnQgPSBmdW5jdGlvbiAoKSB7XG4gICAgY29uc29sZS5pbmZvKCdNaWRpTW9ubyBTdGFydGluZy4uJylcbiAgfVxuXG4gIHRoaXMuY2xlYXIgPSBmdW5jdGlvbiAoKSB7XG5cbiAgfVxuXG4gIHRoaXMucnVuID0gZnVuY3Rpb24gKCkge1xuICAgIGZvciAoY29uc3QgaWQgaW4gdGhpcy5zdGFjaykge1xuICAgICAgaWYgKHRoaXMuc3RhY2tbaWRdLmxlbmd0aCA8IDEpIHtcbiAgICAgICAgdGhpcy5yZWxlYXNlKHRoaXMuc3RhY2tbaWRdLCBpZClcbiAgICAgIH1cbiAgICAgIGlmICghdGhpcy5zdGFja1tpZF0pIHsgY29udGludWUgfVxuICAgICAgaWYgKHRoaXMuc3RhY2tbaWRdLmlzUGxheWVkID09PSBmYWxzZSkge1xuICAgICAgICB0aGlzLnByZXNzKHRoaXMuc3RhY2tbaWRdKVxuICAgICAgfVxuICAgICAgdGhpcy5zdGFja1tpZF0ubGVuZ3RoLS1cbiAgICB9XG4gIH1cblxuICB0aGlzLnByZXNzID0gZnVuY3Rpb24gKGl0ZW0pIHtcbiAgICBpZiAoIWl0ZW0pIHsgcmV0dXJuIH1cbiAgICBjbGllbnQuaW8ubWlkaS50cmlnZ2VyKGl0ZW0sIHRydWUpXG4gICAgaXRlbS5pc1BsYXllZCA9IHRydWVcbiAgfVxuXG4gIHRoaXMucmVsZWFzZSA9IGZ1bmN0aW9uIChpdGVtKSB7XG4gICAgaWYgKCFpdGVtKSB7IHJldHVybiB9XG4gICAgY2xpZW50LmlvLm1pZGkudHJpZ2dlcihpdGVtLCBmYWxzZSlcbiAgICBkZWxldGUgdGhpcy5zdGFja1tpdGVtLmNoYW5uZWxdXG4gIH1cblxuICB0aGlzLnNpbGVuY2UgPSBmdW5jdGlvbiAoKSB7XG4gICAgZm9yIChjb25zdCBpdGVtIG9mIHRoaXMuc3RhY2spIHtcbiAgICAgIHRoaXMucmVsZWFzZShpdGVtKVxuICAgIH1cbiAgfVxuXG4gIHRoaXMucHVzaCA9IGZ1bmN0aW9uIChjaGFubmVsLCBvY3RhdmUsIG5vdGUsIHZlbG9jaXR5LCBsZW5ndGgsIGlzUGxheWVkID0gZmFsc2UpIHtcbiAgICBpZiAodGhpcy5zdGFja1tjaGFubmVsXSkge1xuICAgICAgdGhpcy5yZWxlYXNlKHRoaXMuc3RhY2tbY2hhbm5lbF0pXG4gICAgfVxuICAgIHRoaXMuc3RhY2tbY2hhbm5lbF0gPSB7IGNoYW5uZWwsIG9jdGF2ZSwgbm90ZSwgdmVsb2NpdHksIGxlbmd0aCwgaXNQbGF5ZWQgfVxuICB9XG5cbiAgdGhpcy5sZW5ndGggPSBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIE9iamVjdC5rZXlzKHRoaXMuc3RhY2spLmxlbmd0aFxuICB9XG59XG5cbi8qKiogRVhQT1JUUyBGUk9NIGV4cG9ydHMtbG9hZGVyICoqKi9cbmV4cG9ydCBkZWZhdWx0IE1vbm87XG4iLCIndXNlIHN0cmljdCdcblxuZnVuY3Rpb24gT3NjIChjbGllbnQpIHtcbiAgY29uc3Qgb3NjID0gcmVxdWlyZSgnbm9kZS1vc2MnKVxuXG4gIHRoaXMuc3RhY2sgPSBbXVxuICB0aGlzLnNvY2tldCA9IG51bGxcbiAgdGhpcy5wb3J0ID0gbnVsbFxuICB0aGlzLm9wdGlvbnMgPSB7IGRlZmF1bHQ6IDQ5MTYyLCB0aWRhbEN5Y2xlczogNjAxMCwgc29uaWNQaTogNDU1OSwgc3VwZXJDb2xsaWRlcjogNTcxMjAsIG5vcm5zOiAxMDExMSB9XG5cbiAgdGhpcy5zdGFydCA9IGZ1bmN0aW9uICgpIHtcbiAgICBpZiAoIW9zYykgeyBjb25zb2xlLndhcm4oJ09TQycsICdDb3VsZCBub3Qgc3RhcnQuJyk7IHJldHVybiB9XG4gICAgY29uc29sZS5pbmZvKCdPU0MnLCAnU3RhcnRpbmcuLicpXG4gICAgdGhpcy5zZXR1cCgpXG4gICAgdGhpcy5zZWxlY3QoKVxuICB9XG5cbiAgdGhpcy5jbGVhciA9IGZ1bmN0aW9uICgpIHtcbiAgICB0aGlzLnN0YWNrID0gW11cbiAgfVxuXG4gIHRoaXMucnVuID0gZnVuY3Rpb24gKCkge1xuICAgIGZvciAoY29uc3QgaXRlbSBvZiB0aGlzLnN0YWNrKSB7XG4gICAgICB0aGlzLnBsYXkoaXRlbSlcbiAgICB9XG4gIH1cblxuICB0aGlzLnB1c2ggPSBmdW5jdGlvbiAocGF0aCwgbXNnKSB7XG4gICAgdGhpcy5zdGFjay5wdXNoKHsgcGF0aCwgbXNnIH0pXG4gIH1cblxuICB0aGlzLnBsYXkgPSBmdW5jdGlvbiAoeyBwYXRoLCBtc2cgfSkge1xuICAgIGlmICghdGhpcy5zb2NrZXQpIHsgY29uc29sZS53YXJuKCdPU0MnLCAnVW5hdmFpbGFibGUgc29ja2V0Jyk7IHJldHVybiB9XG4gICAgY29uc3Qgb3NjTXNnID0gbmV3IG9zYy5NZXNzYWdlKHBhdGgpXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBtc2cubGVuZ3RoOyBpKyspIHtcbiAgICAgIG9zY01zZy5hcHBlbmQoY2xpZW50Lm9yY2EudmFsdWVPZihtc2cuY2hhckF0KGkpKSlcbiAgICB9XG4gICAgdGhpcy5zb2NrZXQuc2VuZChvc2NNc2csIChlcnIpID0+IHtcbiAgICAgIGlmIChlcnIpIHsgY29uc29sZS53YXJuKGVycikgfVxuICAgIH0pXG4gIH1cblxuICB0aGlzLnNlbGVjdCA9IGZ1bmN0aW9uIChwb3J0ID0gdGhpcy5vcHRpb25zLmRlZmF1bHQpIHtcbiAgICBpZiAocGFyc2VJbnQocG9ydCkgPT09IHRoaXMucG9ydCkgeyBjb25zb2xlLndhcm4oJ09TQycsICdBbHJlYWR5IHNlbGVjdGVkJyk7IHJldHVybiB9XG4gICAgaWYgKGlzTmFOKHBvcnQpIHx8IHBvcnQgPCAxMDAwKSB7IGNvbnNvbGUud2FybignT1NDJywgJ1VuYXZhaWxhYmxlIHBvcnQnKTsgcmV0dXJuIH1cbiAgICBjb25zb2xlLmluZm8oJ09TQycsIGBTZWxlY3RlZCBwb3J0OiAke3BvcnR9YClcbiAgICB0aGlzLnBvcnQgPSBwYXJzZUludChwb3J0KVxuICAgIHRoaXMuc2V0dXAoKVxuICB9XG5cbiAgdGhpcy5zZXR1cCA9IGZ1bmN0aW9uICgpIHtcbiAgICBpZiAoIXRoaXMucG9ydCkgeyByZXR1cm4gfVxuICAgIGlmICh0aGlzLnNvY2tldCkgeyB0aGlzLnNvY2tldC5jbG9zZSgpIH1cbiAgICB0aGlzLnNvY2tldCA9IG5ldyBvc2MuQ2xpZW50KGNsaWVudC5pby5pcCwgdGhpcy5wb3J0KVxuICAgIGNvbnNvbGUuaW5mbygnT1NDJywgYFN0YXJ0ZWQgc29ja2V0IGF0ICR7Y2xpZW50LmlvLmlwfToke3RoaXMucG9ydH1gKVxuICB9XG59XG5cbi8qKiogRVhQT1JUUyBGUk9NIGV4cG9ydHMtbG9hZGVyICoqKi9cbmV4cG9ydCBkZWZhdWx0IE9zYztcbiIsIid1c2Ugc3RyaWN0J1xuXG5mdW5jdGlvbiBVZHAgKGNsaWVudCkge1xuICBjb25zdCBkZ3JhbSA9IHJlcXVpcmUoJ2RncmFtJylcblxuICB0aGlzLnN0YWNrID0gW11cbiAgdGhpcy5wb3J0ID0gbnVsbFxuICB0aGlzLnNvY2tldCA9IGRncmFtID8gZGdyYW0uY3JlYXRlU29ja2V0KCd1ZHA0JykgOiBudWxsXG4gIHRoaXMubGlzdGVuZXIgPSBkZ3JhbSA/IGRncmFtLmNyZWF0ZVNvY2tldCgndWRwNCcpIDogbnVsbFxuXG4gIHRoaXMuc3RhcnQgPSBmdW5jdGlvbiAoKSB7XG4gICAgaWYgKCFkZ3JhbSB8fCAhdGhpcy5zb2NrZXQgfHwgIXRoaXMubGlzdGVuZXIpIHsgY29uc29sZS53YXJuKCdVRFAnLCAnQ291bGQgbm90IHN0YXJ0LicpOyByZXR1cm4gfVxuICAgIGNvbnNvbGUuaW5mbygnVURQJywgJ1N0YXJ0aW5nLi4nKVxuXG4gICAgdGhpcy5zZWxlY3RJbnB1dCgpXG4gICAgdGhpcy5zZWxlY3RPdXRwdXQoKVxuICB9XG5cbiAgdGhpcy5jbGVhciA9IGZ1bmN0aW9uICgpIHtcbiAgICB0aGlzLnN0YWNrID0gW11cbiAgfVxuXG4gIHRoaXMucnVuID0gZnVuY3Rpb24gKCkge1xuICAgIGZvciAoY29uc3QgaXRlbSBvZiB0aGlzLnN0YWNrKSB7XG4gICAgICB0aGlzLnBsYXkoaXRlbSlcbiAgICB9XG4gIH1cblxuICB0aGlzLnB1c2ggPSBmdW5jdGlvbiAobXNnKSB7XG4gICAgdGhpcy5zdGFjay5wdXNoKG1zZylcbiAgfVxuXG4gIHRoaXMucGxheSA9IGZ1bmN0aW9uIChkYXRhKSB7XG4gICAgaWYgKCF0aGlzLnNvY2tldCkgeyByZXR1cm4gfVxuICAgIHRoaXMuc29ja2V0LnNlbmQoQnVmZmVyLmZyb20oYCR7ZGF0YX1gKSwgdGhpcy5wb3J0LCBjbGllbnQuaW8uaXAsIChlcnIpID0+IHtcbiAgICAgIGlmIChlcnIpIHsgY29uc29sZS53YXJuKGVycikgfVxuICAgIH0pXG4gIH1cblxuICB0aGlzLnNlbGVjdE91dHB1dCA9IGZ1bmN0aW9uIChwb3J0ID0gNDkxNjEpIHtcbiAgICBpZiAoIWRncmFtKSB7IGNvbnNvbGUud2FybignVURQJywgJ1VuYXZhaWxhYmxlLicpOyByZXR1cm4gfVxuICAgIGlmIChwYXJzZUludChwb3J0KSA9PT0gdGhpcy5wb3J0KSB7IGNvbnNvbGUud2FybignVURQJywgJ0FscmVhZHkgc2VsZWN0ZWQnKTsgcmV0dXJuIH1cbiAgICBpZiAoaXNOYU4ocG9ydCkgfHwgcG9ydCA8IDEwMDApIHsgY29uc29sZS53YXJuKCdVRFAnLCAnVW5hdmFpbGFibGUgcG9ydCcpOyByZXR1cm4gfVxuXG4gICAgY29uc29sZS5sb2coJ1VEUCcsIGBPdXRwdXQ6ICR7cG9ydH1gKVxuICAgIHRoaXMucG9ydCA9IHBhcnNlSW50KHBvcnQpXG4gIH1cblxuICB0aGlzLnNlbGVjdElucHV0ID0gKHBvcnQgPSA0OTE2MCkgPT4ge1xuICAgIGlmICghZGdyYW0pIHsgY29uc29sZS53YXJuKCdVRFAnLCAnVW5hdmFpbGFibGUuJyk7IHJldHVybiB9XG4gICAgaWYgKHRoaXMubGlzdGVuZXIpIHsgdGhpcy5saXN0ZW5lci5jbG9zZSgpIH1cblxuICAgIGNvbnNvbGUubG9nKCdVRFAnLCBgSW5wdXQ6ICR7cG9ydH1gKVxuICAgIHRoaXMubGlzdGVuZXIgPSBkZ3JhbS5jcmVhdGVTb2NrZXQoJ3VkcDQnKVxuXG4gICAgdGhpcy5saXN0ZW5lci5vbignbWVzc2FnZScsIChtc2csIHJpbmZvKSA9PiB7XG4gICAgICBjbGllbnQuY29tbWFuZGVyLnRyaWdnZXIoYCR7bXNnfWApXG4gICAgfSlcblxuICAgIHRoaXMubGlzdGVuZXIub24oJ2xpc3RlbmluZycsICgpID0+IHtcbiAgICAgIGNvbnN0IGFkZHJlc3MgPSB0aGlzLmxpc3RlbmVyLmFkZHJlc3MoKVxuICAgICAgY29uc29sZS5pbmZvKCdVRFAnLCBgU3RhcnRlZCBzb2NrZXQgYXQgJHthZGRyZXNzLmFkZHJlc3N9OiR7YWRkcmVzcy5wb3J0fWApXG4gICAgfSlcblxuICAgIHRoaXMubGlzdGVuZXIub24oJ2Vycm9yJywgKGVycikgPT4ge1xuICAgICAgY29uc29sZS53YXJuKCdVRFAnLCBgU2VydmVyIGVycm9yOlxcbiAke2Vyci5zdGFja31gKVxuICAgICAgdGhpcy5saXN0ZW5lci5jbG9zZSgpXG4gICAgfSlcblxuICAgIHRoaXMubGlzdGVuZXIuYmluZChwb3J0KVxuICB9XG59XG5cbi8qKiogRVhQT1JUUyBGUk9NIGV4cG9ydHMtbG9hZGVyICoqKi9cbmV4cG9ydCBkZWZhdWx0IFVkcDtcbiIsIi8qKiogSU1QT1JUUyBGUk9NIGltcG9ydHMtbG9hZGVyICoqKi9cbid1c2Ugc3RyaWN0JztcbmltcG9ydCBNaWRpIGZyb20gXCIuL2lvL21pZGkuanNcIjtcbmltcG9ydCBNaWRpQ0MgZnJvbSBcIi4vaW8vY2MuanNcIjtcbmltcG9ydCBNb25vIGZyb20gXCIuL2lvL21vbm8uanNcIjtcbmltcG9ydCBVZHAgZnJvbSBcIi4vaW8vdWRwLmpzXCI7XG5pbXBvcnQgT3NjIGZyb20gXCIuL2lvL29zYy5qc1wiO1xuXG4ndXNlIHN0cmljdCdcblxuLyogZ2xvYmFsIE1pZGkgKi9cbi8qIGdsb2JhbCBNaWRpQ0MgKi9cbi8qIGdsb2JhbCBNb25vICovXG4vKiBnbG9iYWwgVWRwICovXG4vKiBnbG9iYWwgT3NjICovXG5cbmZ1bmN0aW9uIElPIChjbGllbnQpIHtcbiAgdGhpcy5pcCA9ICcxMjcuMC4wLjEnXG5cbiAgdGhpcy5taWRpID0gbmV3IE1pZGkoY2xpZW50KVxuICB0aGlzLmNjID0gbmV3IE1pZGlDQyhjbGllbnQpXG4gIHRoaXMubW9ubyA9IG5ldyBNb25vKGNsaWVudClcbiAgdGhpcy51ZHAgPSBuZXcgVWRwKGNsaWVudClcbiAgdGhpcy5vc2MgPSBuZXcgT3NjKGNsaWVudClcblxuICB0aGlzLnN0YXJ0ID0gZnVuY3Rpb24gKCkge1xuICAgIHRoaXMubWlkaS5zdGFydCgpXG4gICAgdGhpcy5jYy5zdGFydCgpXG4gICAgdGhpcy5tb25vLnN0YXJ0KClcbiAgICB0aGlzLnVkcC5zdGFydCgpXG4gICAgdGhpcy5vc2Muc3RhcnQoKVxuICAgIHRoaXMuY2xlYXIoKVxuICB9XG5cbiAgdGhpcy5jbGVhciA9IGZ1bmN0aW9uICgpIHtcbiAgICB0aGlzLm1pZGkuY2xlYXIoKVxuICAgIHRoaXMuY2MuY2xlYXIoKVxuICAgIHRoaXMubW9uby5jbGVhcigpXG4gICAgdGhpcy51ZHAuY2xlYXIoKVxuICAgIHRoaXMub3NjLmNsZWFyKClcbiAgfVxuXG4gIHRoaXMucnVuID0gZnVuY3Rpb24gKCkge1xuICAgIHRoaXMubWlkaS5ydW4oKVxuICAgIHRoaXMuY2MucnVuKClcbiAgICB0aGlzLm1vbm8ucnVuKClcbiAgICB0aGlzLnVkcC5ydW4oKVxuICAgIHRoaXMub3NjLnJ1bigpXG4gIH1cblxuICB0aGlzLnNpbGVuY2UgPSBmdW5jdGlvbiAoKSB7XG4gICAgdGhpcy5taWRpLnNpbGVuY2UoKVxuICAgIHRoaXMubW9uby5zaWxlbmNlKClcbiAgfVxuXG4gIHRoaXMuc2V0SXAgPSBmdW5jdGlvbiAoYWRkciA9ICcxMjcuMC4wLjEnKSB7XG4gICAgaWYgKHZhbGlkYXRlSVAoYWRkcikgIT09IHRydWUgJiYgYWRkci5pbmRleE9mKCcubG9jYWwnKSA9PT0gLTEpIHsgY29uc29sZS53YXJuKCdJTycsICdJbnZhbGlkIElQJyk7IHJldHVybiB9XG4gICAgdGhpcy5pcCA9IGFkZHJcbiAgICBjb25zb2xlLmxvZygnSU8nLCAnU2V0IHRhcmdldCBJUCB0byAnICsgdGhpcy5pcClcbiAgICB0aGlzLm9zYy5zZXR1cCgpXG4gIH1cblxuICB0aGlzLmxlbmd0aCA9IGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gdGhpcy5taWRpLmxlbmd0aCgpICsgdGhpcy5tb25vLmxlbmd0aCgpICsgdGhpcy5jYy5zdGFjay5sZW5ndGggKyB0aGlzLnVkcC5zdGFjay5sZW5ndGggKyB0aGlzLm9zYy5zdGFjay5sZW5ndGhcbiAgfVxuXG4gIHRoaXMuaW5zcGVjdCA9IGZ1bmN0aW9uIChsaW1pdCA9IGNsaWVudC5ncmlkLncpIHtcbiAgICBsZXQgdGV4dCA9ICcnXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLmxlbmd0aCgpOyBpKyspIHtcbiAgICAgIHRleHQgKz0gJ3wnXG4gICAgfVxuICAgIHJldHVybiBmaWxsKHRleHQsIGxpbWl0LCAnLicpXG4gIH1cblxuICBmdW5jdGlvbiB2YWxpZGF0ZUlQIChhZGRyKSB7IHJldHVybiAhISgvXigyNVswLTVdfDJbMC00XVswLTldfFswMV0/WzAtOV1bMC05XT8pXFwuKDI1WzAtNV18MlswLTRdWzAtOV18WzAxXT9bMC05XVswLTldPylcXC4oMjVbMC01XXwyWzAtNF1bMC05XXxbMDFdP1swLTldWzAtOV0/KVxcLigyNVswLTVdfDJbMC00XVswLTldfFswMV0/WzAtOV1bMC05XT8pJC8udGVzdChhZGRyKSkgfVxuICBmdW5jdGlvbiBmaWxsIChzdHIsIGxlbiwgY2hyKSB7IHdoaWxlIChzdHIubGVuZ3RoIDwgbGVuKSB7IHN0ciArPSBjaHIgfTsgcmV0dXJuIHN0ciB9XG59XG5cbi8qKiogRVhQT1JUUyBGUk9NIGV4cG9ydHMtbG9hZGVyICoqKi9cbmV4cG9ydCBkZWZhdWx0IElPO1xuIiwiLyoqKiBJTVBPUlRTIEZST00gaW1wb3J0cy1sb2FkZXIgKioqL1xuJ3VzZSBzdHJpY3QnO1xuaW1wb3J0IE9wZXJhdG9yIGZyb20gXCIuL29wZXJhdG9yLmpzXCI7XG5cbid1c2Ugc3RyaWN0J1xuXG4vKiBnbG9iYWwgT3BlcmF0b3IgKi9cbi8qIGdsb2JhbCBjbGllbnQgKi9cblxuY29uc3QgbGlicmFyeSA9IHt9XG5cbmxpYnJhcnkuYSA9IGZ1bmN0aW9uIE9wZXJhdG9yQSAob3JjYSwgeCwgeSwgcGFzc2l2ZSkge1xuICBPcGVyYXRvci5jYWxsKHRoaXMsIG9yY2EsIHgsIHksICdhJywgcGFzc2l2ZSlcblxuICB0aGlzLm5hbWUgPSAnYWRkJ1xuICB0aGlzLmluZm8gPSAnT3V0cHV0cyBzdW0gb2YgaW5wdXRzJ1xuXG4gIHRoaXMucG9ydHMuYSA9IHsgeDogLTEsIHk6IDAgfVxuICB0aGlzLnBvcnRzLmIgPSB7IHg6IDEsIHk6IDAgfVxuICB0aGlzLnBvcnRzLm91dHB1dCA9IHsgeDogMCwgeTogMSwgc2Vuc2l0aXZlOiB0cnVlLCBvdXRwdXQ6IHRydWUgfVxuXG4gIHRoaXMub3BlcmF0aW9uID0gZnVuY3Rpb24gKGZvcmNlID0gZmFsc2UpIHtcbiAgICBjb25zdCBhID0gdGhpcy5saXN0ZW4odGhpcy5wb3J0cy5hLCB0cnVlKVxuICAgIGNvbnN0IGIgPSB0aGlzLmxpc3Rlbih0aGlzLnBvcnRzLmIsIHRydWUpXG4gICAgcmV0dXJuIG9yY2Eua2V5T2YoYSArIGIpXG4gIH1cbn1cblxubGlicmFyeS5iID0gZnVuY3Rpb24gT3BlcmF0b3JMIChvcmNhLCB4LCB5LCBwYXNzaXZlKSB7XG4gIE9wZXJhdG9yLmNhbGwodGhpcywgb3JjYSwgeCwgeSwgJ2InLCBwYXNzaXZlKVxuXG4gIHRoaXMubmFtZSA9ICdzdWJ0cmFjdCdcbiAgdGhpcy5pbmZvID0gJ091dHB1dHMgZGlmZmVyZW5jZSBvZiBpbnB1dHMnXG5cbiAgdGhpcy5wb3J0cy5hID0geyB4OiAtMSwgeTogMCB9XG4gIHRoaXMucG9ydHMuYiA9IHsgeDogMSwgeTogMCB9XG4gIHRoaXMucG9ydHMub3V0cHV0ID0geyB4OiAwLCB5OiAxLCBzZW5zaXRpdmU6IHRydWUsIG91dHB1dDogdHJ1ZSB9XG5cbiAgdGhpcy5vcGVyYXRpb24gPSBmdW5jdGlvbiAoZm9yY2UgPSBmYWxzZSkge1xuICAgIGNvbnN0IGEgPSB0aGlzLmxpc3Rlbih0aGlzLnBvcnRzLmEsIHRydWUpXG4gICAgY29uc3QgYiA9IHRoaXMubGlzdGVuKHRoaXMucG9ydHMuYiwgdHJ1ZSlcbiAgICByZXR1cm4gb3JjYS5rZXlPZihNYXRoLmFicyhiIC0gYSkpXG4gIH1cbn1cblxubGlicmFyeS5jID0gZnVuY3Rpb24gT3BlcmF0b3JDIChvcmNhLCB4LCB5LCBwYXNzaXZlKSB7XG4gIE9wZXJhdG9yLmNhbGwodGhpcywgb3JjYSwgeCwgeSwgJ2MnLCBwYXNzaXZlKVxuXG4gIHRoaXMubmFtZSA9ICdjbG9jaydcbiAgdGhpcy5pbmZvID0gJ091dHB1dHMgbW9kdWxvIG9mIGZyYW1lJ1xuXG4gIHRoaXMucG9ydHMucmF0ZSA9IHsgeDogLTEsIHk6IDAsIGNsYW1wOiB7IG1pbjogMSB9IH1cbiAgdGhpcy5wb3J0cy5tb2QgPSB7IHg6IDEsIHk6IDAsIGRlZmF1bHQ6ICc4JyB9XG4gIHRoaXMucG9ydHMub3V0cHV0ID0geyB4OiAwLCB5OiAxLCBzZW5zaXRpdmU6IHRydWUsIG91dHB1dDogdHJ1ZSB9XG5cbiAgdGhpcy5vcGVyYXRpb24gPSBmdW5jdGlvbiAoZm9yY2UgPSBmYWxzZSkge1xuICAgIGNvbnN0IHJhdGUgPSB0aGlzLmxpc3Rlbih0aGlzLnBvcnRzLnJhdGUsIHRydWUpXG4gICAgY29uc3QgbW9kID0gdGhpcy5saXN0ZW4odGhpcy5wb3J0cy5tb2QsIHRydWUpXG4gICAgY29uc3QgdmFsID0gTWF0aC5mbG9vcihvcmNhLmYgLyByYXRlKSAlIG1vZFxuICAgIHJldHVybiBvcmNhLmtleU9mKHZhbClcbiAgfVxufVxuXG5saWJyYXJ5LmQgPSBmdW5jdGlvbiBPcGVyYXRvckQgKG9yY2EsIHgsIHksIHBhc3NpdmUpIHtcbiAgT3BlcmF0b3IuY2FsbCh0aGlzLCBvcmNhLCB4LCB5LCAnZCcsIHBhc3NpdmUpXG5cbiAgdGhpcy5uYW1lID0gJ2RlbGF5J1xuICB0aGlzLmluZm8gPSAnQmFuZ3Mgb24gbW9kdWxvIG9mIGZyYW1lJ1xuXG4gIHRoaXMucG9ydHMucmF0ZSA9IHsgeDogLTEsIHk6IDAsIGNsYW1wOiB7IG1pbjogMSB9IH1cbiAgdGhpcy5wb3J0cy5tb2QgPSB7IHg6IDEsIHk6IDAsIGRlZmF1bHQ6ICc4JyB9XG4gIHRoaXMucG9ydHMub3V0cHV0ID0geyB4OiAwLCB5OiAxLCBiYW5nOiB0cnVlLCBvdXRwdXQ6IHRydWUgfVxuXG4gIHRoaXMub3BlcmF0aW9uID0gZnVuY3Rpb24gKGZvcmNlID0gZmFsc2UpIHtcbiAgICBjb25zdCByYXRlID0gdGhpcy5saXN0ZW4odGhpcy5wb3J0cy5yYXRlLCB0cnVlKVxuICAgIGNvbnN0IG1vZCA9IHRoaXMubGlzdGVuKHRoaXMucG9ydHMubW9kLCB0cnVlKVxuICAgIGNvbnN0IHJlcyA9IG9yY2EuZiAlIChtb2QgKiByYXRlKVxuICAgIHJldHVybiByZXMgPT09IDAgfHwgbW9kID09PSAxXG4gIH1cbn1cblxubGlicmFyeS5lID0gZnVuY3Rpb24gT3BlcmF0b3JFIChvcmNhLCB4LCB5LCBwYXNzaXZlKSB7XG4gIE9wZXJhdG9yLmNhbGwodGhpcywgb3JjYSwgeCwgeSwgJ2UnLCBwYXNzaXZlKVxuXG4gIHRoaXMubmFtZSA9ICdlYXN0J1xuICB0aGlzLmluZm8gPSAnTW92ZXMgZWFzdHdhcmQsIG9yIGJhbmdzJ1xuICB0aGlzLmRyYXcgPSBmYWxzZVxuXG4gIHRoaXMub3BlcmF0aW9uID0gZnVuY3Rpb24gKCkge1xuICAgIHRoaXMubW92ZSgxLCAwKVxuICAgIHRoaXMucGFzc2l2ZSA9IGZhbHNlXG4gIH1cbn1cblxubGlicmFyeS5mID0gZnVuY3Rpb24gT3BlcmF0b3JGIChvcmNhLCB4LCB5LCBwYXNzaXZlKSB7XG4gIE9wZXJhdG9yLmNhbGwodGhpcywgb3JjYSwgeCwgeSwgJ2YnLCBwYXNzaXZlKVxuXG4gIHRoaXMubmFtZSA9ICdpZidcbiAgdGhpcy5pbmZvID0gJ0JhbmdzIGlmIGlucHV0cyBhcmUgZXF1YWwnXG5cbiAgdGhpcy5wb3J0cy5hID0geyB4OiAtMSwgeTogMCB9XG4gIHRoaXMucG9ydHMuYiA9IHsgeDogMSwgeTogMCB9XG4gIHRoaXMucG9ydHMub3V0cHV0ID0geyB4OiAwLCB5OiAxLCBiYW5nOiB0cnVlLCBvdXRwdXQ6IHRydWUgfVxuXG4gIHRoaXMub3BlcmF0aW9uID0gZnVuY3Rpb24gKGZvcmNlID0gZmFsc2UpIHtcbiAgICBjb25zdCBhID0gdGhpcy5saXN0ZW4odGhpcy5wb3J0cy5hKVxuICAgIGNvbnN0IGIgPSB0aGlzLmxpc3Rlbih0aGlzLnBvcnRzLmIpXG4gICAgcmV0dXJuIGEgPT09IGJcbiAgfVxufVxuXG5saWJyYXJ5LmcgPSBmdW5jdGlvbiBPcGVyYXRvckcgKG9yY2EsIHgsIHksIHBhc3NpdmUpIHtcbiAgT3BlcmF0b3IuY2FsbCh0aGlzLCBvcmNhLCB4LCB5LCAnZycsIHBhc3NpdmUpXG5cbiAgdGhpcy5uYW1lID0gJ2dlbmVyYXRvcidcbiAgdGhpcy5pbmZvID0gJ1dyaXRlcyBvcGVyYW5kcyB3aXRoIG9mZnNldCdcblxuICB0aGlzLnBvcnRzLnggPSB7IHg6IC0zLCB5OiAwIH1cbiAgdGhpcy5wb3J0cy55ID0geyB4OiAtMiwgeTogMCB9XG4gIHRoaXMucG9ydHMubGVuID0geyB4OiAtMSwgeTogMCwgY2xhbXA6IHsgbWluOiAxIH0gfVxuXG4gIHRoaXMub3BlcmF0aW9uID0gZnVuY3Rpb24gKGZvcmNlID0gZmFsc2UpIHtcbiAgICBjb25zdCBsZW4gPSB0aGlzLmxpc3Rlbih0aGlzLnBvcnRzLmxlbiwgdHJ1ZSlcbiAgICBjb25zdCB4ID0gdGhpcy5saXN0ZW4odGhpcy5wb3J0cy54LCB0cnVlKVxuICAgIGNvbnN0IHkgPSB0aGlzLmxpc3Rlbih0aGlzLnBvcnRzLnksIHRydWUpICsgMVxuICAgIGZvciAobGV0IG9mZnNldCA9IDA7IG9mZnNldCA8IGxlbjsgb2Zmc2V0KyspIHtcbiAgICAgIGNvbnN0IGluUG9ydCA9IHsgeDogb2Zmc2V0ICsgMSwgeTogMCB9XG4gICAgICBjb25zdCBvdXRQb3J0ID0geyB4OiB4ICsgb2Zmc2V0LCB5OiB5LCBvdXRwdXQ6IHRydWUgfVxuICAgICAgdGhpcy5hZGRQb3J0KGBpbiR7b2Zmc2V0fWAsIGluUG9ydClcbiAgICAgIHRoaXMuYWRkUG9ydChgb3V0JHtvZmZzZXR9YCwgb3V0UG9ydClcbiAgICAgIGNvbnN0IHJlcyA9IHRoaXMubGlzdGVuKGluUG9ydClcbiAgICAgIHRoaXMub3V0cHV0KGAke3Jlc31gLCBvdXRQb3J0KVxuICAgIH1cbiAgfVxufVxuXG5saWJyYXJ5LmggPSBmdW5jdGlvbiBPcGVyYXRvckggKG9yY2EsIHgsIHksIHBhc3NpdmUpIHtcbiAgT3BlcmF0b3IuY2FsbCh0aGlzLCBvcmNhLCB4LCB5LCAnaCcsIHBhc3NpdmUpXG5cbiAgdGhpcy5uYW1lID0gJ2hhbHQnXG4gIHRoaXMuaW5mbyA9ICdIYWx0cyBzb3V0aHdhcmQgb3BlcmFuZCdcblxuICB0aGlzLnBvcnRzLm91dHB1dCA9IHsgeDogMCwgeTogMSwgcmVhZGVyOiB0cnVlLCBvdXRwdXQ6IHRydWUgfVxuXG4gIHRoaXMub3BlcmF0aW9uID0gZnVuY3Rpb24gKGZvcmNlID0gZmFsc2UpIHtcbiAgICBvcmNhLmxvY2sodGhpcy54ICsgdGhpcy5wb3J0cy5vdXRwdXQueCwgdGhpcy55ICsgdGhpcy5wb3J0cy5vdXRwdXQueSlcbiAgICByZXR1cm4gdGhpcy5saXN0ZW4odGhpcy5wb3J0cy5vdXRwdXQsIHRydWUpXG4gIH1cbn1cblxubGlicmFyeS5pID0gZnVuY3Rpb24gT3BlcmF0b3JJIChvcmNhLCB4LCB5LCBwYXNzaXZlKSB7XG4gIE9wZXJhdG9yLmNhbGwodGhpcywgb3JjYSwgeCwgeSwgJ2knLCBwYXNzaXZlKVxuXG4gIHRoaXMubmFtZSA9ICdpbmNyZW1lbnQnXG4gIHRoaXMuaW5mbyA9ICdJbmNyZW1lbnRzIHNvdXRod2FyZCBvcGVyYW5kJ1xuXG4gIHRoaXMucG9ydHMuc3RlcCA9IHsgeDogLTEsIHk6IDAsIGRlZmF1bHQ6ICcxJyB9XG4gIHRoaXMucG9ydHMubW9kID0geyB4OiAxLCB5OiAwIH1cbiAgdGhpcy5wb3J0cy5vdXRwdXQgPSB7IHg6IDAsIHk6IDEsIHNlbnNpdGl2ZTogdHJ1ZSwgcmVhZGVyOiB0cnVlLCBvdXRwdXQ6IHRydWUgfVxuXG4gIHRoaXMub3BlcmF0aW9uID0gZnVuY3Rpb24gKGZvcmNlID0gZmFsc2UpIHtcbiAgICBjb25zdCBzdGVwID0gdGhpcy5saXN0ZW4odGhpcy5wb3J0cy5zdGVwLCB0cnVlKVxuICAgIGNvbnN0IG1vZCA9IHRoaXMubGlzdGVuKHRoaXMucG9ydHMubW9kLCB0cnVlKVxuICAgIGNvbnN0IHZhbCA9IHRoaXMubGlzdGVuKHRoaXMucG9ydHMub3V0cHV0LCB0cnVlKVxuICAgIHJldHVybiBvcmNhLmtleU9mKCh2YWwgKyBzdGVwKSAlIChtb2QgPiAwID8gbW9kIDogMzYpKVxuICB9XG59XG5cbmxpYnJhcnkuaiA9IGZ1bmN0aW9uIE9wZXJhdG9ySiAob3JjYSwgeCwgeSwgcGFzc2l2ZSkge1xuICBPcGVyYXRvci5jYWxsKHRoaXMsIG9yY2EsIHgsIHksICdqJywgcGFzc2l2ZSlcblxuICB0aGlzLm5hbWUgPSAnanVtcGVyJ1xuICB0aGlzLmluZm8gPSAnT3V0cHV0cyBub3J0aHdhcmQgb3BlcmFuZCdcblxuICB0aGlzLnBvcnRzLnZhbCA9IHsgeDogMCwgeTogLTEgfVxuICB0aGlzLnBvcnRzLm91dHB1dCA9IHsgeDogMCwgeTogMSwgb3V0cHV0OiB0cnVlIH1cblxuICB0aGlzLm9wZXJhdGlvbiA9IGZ1bmN0aW9uIChmb3JjZSA9IGZhbHNlKSB7XG4gICAgb3JjYS5sb2NrKHRoaXMueCwgdGhpcy55ICsgMSlcbiAgICByZXR1cm4gdGhpcy5saXN0ZW4odGhpcy5wb3J0cy52YWwpXG4gIH1cbn1cblxubGlicmFyeS5rID0gZnVuY3Rpb24gT3BlcmF0b3JLIChvcmNhLCB4LCB5LCBwYXNzaXZlKSB7XG4gIE9wZXJhdG9yLmNhbGwodGhpcywgb3JjYSwgeCwgeSwgJ2snLCBwYXNzaXZlKVxuXG4gIHRoaXMubmFtZSA9ICdrb25rYXQnXG4gIHRoaXMuaW5mbyA9ICdSZWFkcyBtdWx0aXBsZSB2YXJpYWJsZXMnXG5cbiAgdGhpcy5wb3J0cy5sZW4gPSB7IHg6IC0xLCB5OiAwLCBjbGFtcDogeyBtaW46IDEgfSB9XG5cbiAgdGhpcy5vcGVyYXRpb24gPSBmdW5jdGlvbiAoZm9yY2UgPSBmYWxzZSkge1xuICAgIHRoaXMubGVuID0gdGhpcy5saXN0ZW4odGhpcy5wb3J0cy5sZW4sIHRydWUpXG4gICAgZm9yIChsZXQgb2Zmc2V0ID0gMDsgb2Zmc2V0IDwgdGhpcy5sZW47IG9mZnNldCsrKSB7XG4gICAgICBjb25zdCBrZXkgPSBvcmNhLmdseXBoQXQodGhpcy54ICsgb2Zmc2V0ICsgMSwgdGhpcy55KVxuICAgICAgb3JjYS5sb2NrKHRoaXMueCArIG9mZnNldCArIDEsIHRoaXMueSlcbiAgICAgIGlmIChrZXkgPT09ICcuJykgeyBjb250aW51ZSB9XG4gICAgICBjb25zdCBpblBvcnQgPSB7IHg6IG9mZnNldCArIDEsIHk6IDAgfVxuICAgICAgY29uc3Qgb3V0UG9ydCA9IHsgeDogb2Zmc2V0ICsgMSwgeTogMSwgb3V0cHV0OiB0cnVlIH1cbiAgICAgIHRoaXMuYWRkUG9ydChgaW4ke29mZnNldH1gLCBpblBvcnQpXG4gICAgICB0aGlzLmFkZFBvcnQoYG91dCR7b2Zmc2V0fWAsIG91dFBvcnQpXG4gICAgICBjb25zdCByZXMgPSBvcmNhLnZhbHVlSW4oa2V5KVxuICAgICAgdGhpcy5vdXRwdXQoYCR7cmVzfWAsIG91dFBvcnQpXG4gICAgfVxuICB9XG59XG5cbmxpYnJhcnkubCA9IGZ1bmN0aW9uIE9wZXJhdG9yTCAob3JjYSwgeCwgeSwgcGFzc2l2ZSkge1xuICBPcGVyYXRvci5jYWxsKHRoaXMsIG9yY2EsIHgsIHksICdsJywgcGFzc2l2ZSlcblxuICB0aGlzLm5hbWUgPSAnbGVzc2VyJ1xuICB0aGlzLmluZm8gPSAnT3V0cHV0cyBzbWFsbGVzdCBpbnB1dCdcblxuICB0aGlzLnBvcnRzLmEgPSB7IHg6IC0xLCB5OiAwIH1cbiAgdGhpcy5wb3J0cy5iID0geyB4OiAxLCB5OiAwIH1cbiAgdGhpcy5wb3J0cy5vdXRwdXQgPSB7IHg6IDAsIHk6IDEsIHNlbnNpdGl2ZTogdHJ1ZSwgb3V0cHV0OiB0cnVlIH1cblxuICB0aGlzLm9wZXJhdGlvbiA9IGZ1bmN0aW9uIChmb3JjZSA9IGZhbHNlKSB7XG4gICAgY29uc3QgYSA9IHRoaXMubGlzdGVuKHRoaXMucG9ydHMuYSlcbiAgICBjb25zdCBiID0gdGhpcy5saXN0ZW4odGhpcy5wb3J0cy5iKVxuICAgIHJldHVybiBhICE9PSAnLicgJiYgYiAhPT0gJy4nID8gb3JjYS5rZXlPZihNYXRoLm1pbihvcmNhLnZhbHVlT2YoYSksIG9yY2EudmFsdWVPZihiKSkpIDogJy4nXG4gIH1cbn1cblxubGlicmFyeS5tID0gZnVuY3Rpb24gT3BlcmF0b3JNIChvcmNhLCB4LCB5LCBwYXNzaXZlKSB7XG4gIE9wZXJhdG9yLmNhbGwodGhpcywgb3JjYSwgeCwgeSwgJ20nLCBwYXNzaXZlKVxuXG4gIHRoaXMubmFtZSA9ICdtdWx0aXBseSdcbiAgdGhpcy5pbmZvID0gJ091dHB1dHMgcHJvZHVjdCBvZiBpbnB1dHMnXG5cbiAgdGhpcy5wb3J0cy5hID0geyB4OiAtMSwgeTogMCB9XG4gIHRoaXMucG9ydHMuYiA9IHsgeDogMSwgeTogMCB9XG4gIHRoaXMucG9ydHMub3V0cHV0ID0geyB4OiAwLCB5OiAxLCBzZW5zaXRpdmU6IHRydWUsIG91dHB1dDogdHJ1ZSB9XG5cbiAgdGhpcy5vcGVyYXRpb24gPSBmdW5jdGlvbiAoZm9yY2UgPSBmYWxzZSkge1xuICAgIGNvbnN0IGEgPSB0aGlzLmxpc3Rlbih0aGlzLnBvcnRzLmEsIHRydWUpXG4gICAgY29uc3QgYiA9IHRoaXMubGlzdGVuKHRoaXMucG9ydHMuYiwgdHJ1ZSlcbiAgICByZXR1cm4gb3JjYS5rZXlPZihhICogYilcbiAgfVxufVxuXG5saWJyYXJ5Lm4gPSBmdW5jdGlvbiBPcGVyYXRvck4gKG9yY2EsIHgsIHksIHBhc3NpdmUpIHtcbiAgT3BlcmF0b3IuY2FsbCh0aGlzLCBvcmNhLCB4LCB5LCAnbicsIHBhc3NpdmUpXG5cbiAgdGhpcy5uYW1lID0gJ25vcnRoJ1xuICB0aGlzLmluZm8gPSAnTW92ZXMgTm9ydGh3YXJkLCBvciBiYW5ncydcbiAgdGhpcy5kcmF3ID0gZmFsc2VcblxuICB0aGlzLm9wZXJhdGlvbiA9IGZ1bmN0aW9uICgpIHtcbiAgICB0aGlzLm1vdmUoMCwgLTEpXG4gICAgdGhpcy5wYXNzaXZlID0gZmFsc2VcbiAgfVxufVxuXG5saWJyYXJ5Lm8gPSBmdW5jdGlvbiBPcGVyYXRvck8gKG9yY2EsIHgsIHksIHBhc3NpdmUpIHtcbiAgT3BlcmF0b3IuY2FsbCh0aGlzLCBvcmNhLCB4LCB5LCAnbycsIHBhc3NpdmUpXG5cbiAgdGhpcy5uYW1lID0gJ3JlYWQnXG4gIHRoaXMuaW5mbyA9ICdSZWFkcyBvcGVyYW5kIHdpdGggb2Zmc2V0J1xuXG4gIHRoaXMucG9ydHMueCA9IHsgeDogLTIsIHk6IDAgfVxuICB0aGlzLnBvcnRzLnkgPSB7IHg6IC0xLCB5OiAwIH1cbiAgdGhpcy5wb3J0cy5vdXRwdXQgPSB7IHg6IDAsIHk6IDEsIG91dHB1dDogdHJ1ZSB9XG5cbiAgdGhpcy5vcGVyYXRpb24gPSBmdW5jdGlvbiAoZm9yY2UgPSBmYWxzZSkge1xuICAgIGNvbnN0IHggPSB0aGlzLmxpc3Rlbih0aGlzLnBvcnRzLngsIHRydWUpXG4gICAgY29uc3QgeSA9IHRoaXMubGlzdGVuKHRoaXMucG9ydHMueSwgdHJ1ZSlcbiAgICB0aGlzLmFkZFBvcnQoJ3JlYWQnLCB7IHg6IHggKyAxLCB5OiB5IH0pXG4gICAgcmV0dXJuIHRoaXMubGlzdGVuKHRoaXMucG9ydHMucmVhZClcbiAgfVxufVxuXG5saWJyYXJ5LnAgPSBmdW5jdGlvbiBPcGVyYXRvclAgKG9yY2EsIHgsIHksIHBhc3NpdmUpIHtcbiAgT3BlcmF0b3IuY2FsbCh0aGlzLCBvcmNhLCB4LCB5LCAncCcsIHBhc3NpdmUpXG5cbiAgdGhpcy5uYW1lID0gJ3B1c2gnXG4gIHRoaXMuaW5mbyA9ICdXcml0ZXMgZWFzdHdhcmQgb3BlcmFuZCdcblxuICB0aGlzLnBvcnRzLmtleSA9IHsgeDogLTIsIHk6IDAgfVxuICB0aGlzLnBvcnRzLmxlbiA9IHsgeDogLTEsIHk6IDAsIGNsYW1wOiB7IG1pbjogMSB9IH1cbiAgdGhpcy5wb3J0cy52YWwgPSB7IHg6IDEsIHk6IDAgfVxuXG4gIHRoaXMub3BlcmF0aW9uID0gZnVuY3Rpb24gKGZvcmNlID0gZmFsc2UpIHtcbiAgICBjb25zdCBsZW4gPSB0aGlzLmxpc3Rlbih0aGlzLnBvcnRzLmxlbiwgdHJ1ZSlcbiAgICBjb25zdCBrZXkgPSB0aGlzLmxpc3Rlbih0aGlzLnBvcnRzLmtleSwgdHJ1ZSlcbiAgICBmb3IgKGxldCBvZmZzZXQgPSAwOyBvZmZzZXQgPCBsZW47IG9mZnNldCsrKSB7XG4gICAgICBvcmNhLmxvY2sodGhpcy54ICsgb2Zmc2V0LCB0aGlzLnkgKyAxKVxuICAgIH1cbiAgICB0aGlzLnBvcnRzLm91dHB1dCA9IHsgeDogKGtleSAlIGxlbiksIHk6IDEsIG91dHB1dDogdHJ1ZSB9XG4gICAgcmV0dXJuIHRoaXMubGlzdGVuKHRoaXMucG9ydHMudmFsKVxuICB9XG59XG5cbmxpYnJhcnkucSA9IGZ1bmN0aW9uIE9wZXJhdG9yUSAob3JjYSwgeCwgeSwgcGFzc2l2ZSkge1xuICBPcGVyYXRvci5jYWxsKHRoaXMsIG9yY2EsIHgsIHksICdxJywgcGFzc2l2ZSlcblxuICB0aGlzLm5hbWUgPSAncXVlcnknXG4gIHRoaXMuaW5mbyA9ICdSZWFkcyBvcGVyYW5kcyB3aXRoIG9mZnNldCdcblxuICB0aGlzLnBvcnRzLnggPSB7IHg6IC0zLCB5OiAwIH1cbiAgdGhpcy5wb3J0cy55ID0geyB4OiAtMiwgeTogMCB9XG4gIHRoaXMucG9ydHMubGVuID0geyB4OiAtMSwgeTogMCwgY2xhbXA6IHsgbWluOiAxIH0gfVxuXG4gIHRoaXMub3BlcmF0aW9uID0gZnVuY3Rpb24gKGZvcmNlID0gZmFsc2UpIHtcbiAgICBjb25zdCBsZW4gPSB0aGlzLmxpc3Rlbih0aGlzLnBvcnRzLmxlbiwgdHJ1ZSlcbiAgICBjb25zdCB4ID0gdGhpcy5saXN0ZW4odGhpcy5wb3J0cy54LCB0cnVlKVxuICAgIGNvbnN0IHkgPSB0aGlzLmxpc3Rlbih0aGlzLnBvcnRzLnksIHRydWUpXG4gICAgZm9yIChsZXQgb2Zmc2V0ID0gMDsgb2Zmc2V0IDwgbGVuOyBvZmZzZXQrKykge1xuICAgICAgY29uc3QgaW5Qb3J0ID0geyB4OiB4ICsgb2Zmc2V0ICsgMSwgeTogeSB9XG4gICAgICBjb25zdCBvdXRQb3J0ID0geyB4OiBvZmZzZXQgLSBsZW4gKyAxLCB5OiAxLCBvdXRwdXQ6IHRydWUgfVxuICAgICAgdGhpcy5hZGRQb3J0KGBpbiR7b2Zmc2V0fWAsIGluUG9ydClcbiAgICAgIHRoaXMuYWRkUG9ydChgb3V0JHtvZmZzZXR9YCwgb3V0UG9ydClcbiAgICAgIGNvbnN0IHJlcyA9IHRoaXMubGlzdGVuKGluUG9ydClcbiAgICAgIHRoaXMub3V0cHV0KGAke3Jlc31gLCBvdXRQb3J0KVxuICAgIH1cbiAgfVxufVxuXG5saWJyYXJ5LnIgPSBmdW5jdGlvbiBPcGVyYXRvclIgKG9yY2EsIHgsIHksIHBhc3NpdmUpIHtcbiAgT3BlcmF0b3IuY2FsbCh0aGlzLCBvcmNhLCB4LCB5LCAncicsIHBhc3NpdmUpXG5cbiAgdGhpcy5uYW1lID0gJ3JhbmRvbSdcbiAgdGhpcy5pbmZvID0gJ091dHB1dHMgcmFuZG9tIHZhbHVlJ1xuXG4gIHRoaXMucG9ydHMubWluID0geyB4OiAtMSwgeTogMCB9XG4gIHRoaXMucG9ydHMubWF4ID0geyB4OiAxLCB5OiAwIH1cbiAgdGhpcy5wb3J0cy5vdXRwdXQgPSB7IHg6IDAsIHk6IDEsIHNlbnNpdGl2ZTogdHJ1ZSwgb3V0cHV0OiB0cnVlIH1cblxuICB0aGlzLm9wZXJhdGlvbiA9IGZ1bmN0aW9uIChmb3JjZSA9IGZhbHNlKSB7XG4gICAgY29uc3QgbWluID0gdGhpcy5saXN0ZW4odGhpcy5wb3J0cy5taW4sIHRydWUpXG4gICAgY29uc3QgbWF4ID0gdGhpcy5saXN0ZW4odGhpcy5wb3J0cy5tYXgsIHRydWUpXG4gICAgY29uc3QgdmFsID0gcGFyc2VJbnQoKE1hdGgucmFuZG9tKCkgKiAoKG1heCA+IDAgPyBtYXggOiAzNikgLSBtaW4pKSArIG1pbilcbiAgICByZXR1cm4gb3JjYS5rZXlPZih2YWwpXG4gIH1cbn1cblxubGlicmFyeS5zID0gZnVuY3Rpb24gT3BlcmF0b3JTIChvcmNhLCB4LCB5LCBwYXNzaXZlKSB7XG4gIE9wZXJhdG9yLmNhbGwodGhpcywgb3JjYSwgeCwgeSwgJ3MnLCBwYXNzaXZlKVxuXG4gIHRoaXMubmFtZSA9ICdzb3V0aCdcbiAgdGhpcy5pbmZvID0gJ01vdmVzIHNvdXRod2FyZCwgb3IgYmFuZ3MnXG4gIHRoaXMuZHJhdyA9IGZhbHNlXG5cbiAgdGhpcy5vcGVyYXRpb24gPSBmdW5jdGlvbiAoKSB7XG4gICAgdGhpcy5tb3ZlKDAsIDEpXG4gICAgdGhpcy5wYXNzaXZlID0gZmFsc2VcbiAgfVxufVxuXG5saWJyYXJ5LnQgPSBmdW5jdGlvbiBPcGVyYXRvclQgKG9yY2EsIHgsIHksIHBhc3NpdmUpIHtcbiAgT3BlcmF0b3IuY2FsbCh0aGlzLCBvcmNhLCB4LCB5LCAndCcsIHBhc3NpdmUpXG5cbiAgdGhpcy5uYW1lID0gJ3RyYWNrJ1xuICB0aGlzLmluZm8gPSAnUmVhZHMgZWFzdHdhcmQgb3BlcmFuZCdcblxuICB0aGlzLnBvcnRzLmtleSA9IHsgeDogLTIsIHk6IDAgfVxuICB0aGlzLnBvcnRzLmxlbiA9IHsgeDogLTEsIHk6IDAsIGNsYW1wOiB7IG1pbjogMSB9IH1cbiAgdGhpcy5wb3J0cy5vdXRwdXQgPSB7IHg6IDAsIHk6IDEsIG91dHB1dDogdHJ1ZSB9XG5cbiAgdGhpcy5vcGVyYXRpb24gPSBmdW5jdGlvbiAoZm9yY2UgPSBmYWxzZSkge1xuICAgIGNvbnN0IGxlbiA9IHRoaXMubGlzdGVuKHRoaXMucG9ydHMubGVuLCB0cnVlKVxuICAgIGNvbnN0IGtleSA9IHRoaXMubGlzdGVuKHRoaXMucG9ydHMua2V5LCB0cnVlKVxuICAgIGZvciAobGV0IG9mZnNldCA9IDA7IG9mZnNldCA8IGxlbjsgb2Zmc2V0KyspIHtcbiAgICAgIG9yY2EubG9jayh0aGlzLnggKyBvZmZzZXQgKyAxLCB0aGlzLnkpXG4gICAgfVxuICAgIHRoaXMucG9ydHMudmFsID0geyB4OiAoa2V5ICUgbGVuKSArIDEsIHk6IDAgfVxuICAgIHJldHVybiB0aGlzLmxpc3Rlbih0aGlzLnBvcnRzLnZhbClcbiAgfVxufVxuXG5saWJyYXJ5LnUgPSBmdW5jdGlvbiBPcGVyYXRvclUgKG9yY2EsIHgsIHksIHBhc3NpdmUpIHtcbiAgT3BlcmF0b3IuY2FsbCh0aGlzLCBvcmNhLCB4LCB5LCAndScsIHBhc3NpdmUpXG5cbiAgdGhpcy5uYW1lID0gJ3VjbGlkJ1xuICB0aGlzLmluZm8gPSAnQmFuZ3Mgb24gRXVjbGlkZWFuIHJoeXRobSdcblxuICB0aGlzLnBvcnRzLnN0ZXAgPSB7IHg6IC0xLCB5OiAwLCBjbGFtcDogeyBtaW46IDAgfSwgZGVmYXVsdDogJzEnIH1cbiAgdGhpcy5wb3J0cy5tYXggPSB7IHg6IDEsIHk6IDAsIGNsYW1wOiB7IG1pbjogMSB9LCBkZWZhdWx0OiAnOCcgfVxuICB0aGlzLnBvcnRzLm91dHB1dCA9IHsgeDogMCwgeTogMSwgYmFuZzogdHJ1ZSwgb3V0cHV0OiB0cnVlIH1cblxuICB0aGlzLm9wZXJhdGlvbiA9IGZ1bmN0aW9uIChmb3JjZSA9IGZhbHNlKSB7XG4gICAgY29uc3Qgc3RlcCA9IHRoaXMubGlzdGVuKHRoaXMucG9ydHMuc3RlcCwgdHJ1ZSlcbiAgICBjb25zdCBtYXggPSB0aGlzLmxpc3Rlbih0aGlzLnBvcnRzLm1heCwgdHJ1ZSlcbiAgICBjb25zdCBidWNrZXQgPSAoc3RlcCAqIChvcmNhLmYgKyBtYXggLSAxKSkgJSBtYXggKyBzdGVwXG4gICAgcmV0dXJuIGJ1Y2tldCA+PSBtYXhcbiAgfVxufVxuXG5saWJyYXJ5LnYgPSBmdW5jdGlvbiBPcGVyYXRvclYgKG9yY2EsIHgsIHksIHBhc3NpdmUpIHtcbiAgT3BlcmF0b3IuY2FsbCh0aGlzLCBvcmNhLCB4LCB5LCAndicsIHBhc3NpdmUpXG5cbiAgdGhpcy5uYW1lID0gJ3ZhcmlhYmxlJ1xuICB0aGlzLmluZm8gPSAnUmVhZHMgYW5kIHdyaXRlcyB2YXJpYWJsZSdcblxuICB0aGlzLnBvcnRzLndyaXRlID0geyB4OiAtMSwgeTogMCB9XG4gIHRoaXMucG9ydHMucmVhZCA9IHsgeDogMSwgeTogMCB9XG5cbiAgdGhpcy5vcGVyYXRpb24gPSBmdW5jdGlvbiAoZm9yY2UgPSBmYWxzZSkge1xuICAgIGNvbnN0IHdyaXRlID0gdGhpcy5saXN0ZW4odGhpcy5wb3J0cy53cml0ZSlcbiAgICBjb25zdCByZWFkID0gdGhpcy5saXN0ZW4odGhpcy5wb3J0cy5yZWFkKVxuICAgIGlmICh3cml0ZSA9PT0gJy4nICYmIHJlYWQgIT09ICcuJykge1xuICAgICAgdGhpcy5hZGRQb3J0KCdvdXRwdXQnLCB7IHg6IDAsIHk6IDEgfSlcbiAgICB9XG4gICAgaWYgKHdyaXRlICE9PSAnLicpIHtcbiAgICAgIG9yY2EudmFyaWFibGVzW3dyaXRlXSA9IHJlYWRcbiAgICAgIHJldHVyblxuICAgIH1cbiAgICByZXR1cm4gb3JjYS52YWx1ZUluKHJlYWQpXG4gIH1cbn1cblxubGlicmFyeS53ID0gZnVuY3Rpb24gT3BlcmF0b3JXIChvcmNhLCB4LCB5LCBwYXNzaXZlKSB7XG4gIE9wZXJhdG9yLmNhbGwodGhpcywgb3JjYSwgeCwgeSwgJ3cnLCBwYXNzaXZlKVxuXG4gIHRoaXMubmFtZSA9ICd3ZXN0J1xuICB0aGlzLmluZm8gPSAnTW92ZXMgd2VzdHdhcmQsIG9yIGJhbmdzJ1xuICB0aGlzLmRyYXcgPSBmYWxzZVxuXG4gIHRoaXMub3BlcmF0aW9uID0gZnVuY3Rpb24gKCkge1xuICAgIHRoaXMubW92ZSgtMSwgMClcbiAgICB0aGlzLnBhc3NpdmUgPSBmYWxzZVxuICB9XG59XG5cbmxpYnJhcnkueCA9IGZ1bmN0aW9uIE9wZXJhdG9yWCAob3JjYSwgeCwgeSwgcGFzc2l2ZSkge1xuICBPcGVyYXRvci5jYWxsKHRoaXMsIG9yY2EsIHgsIHksICd4JywgcGFzc2l2ZSlcblxuICB0aGlzLm5hbWUgPSAnd3JpdGUnXG4gIHRoaXMuaW5mbyA9ICdXcml0ZXMgb3BlcmFuZCB3aXRoIG9mZnNldCdcblxuICB0aGlzLnBvcnRzLnggPSB7IHg6IC0yLCB5OiAwIH1cbiAgdGhpcy5wb3J0cy55ID0geyB4OiAtMSwgeTogMCB9XG4gIHRoaXMucG9ydHMudmFsID0geyB4OiAxLCB5OiAwIH1cblxuICB0aGlzLm9wZXJhdGlvbiA9IGZ1bmN0aW9uIChmb3JjZSA9IGZhbHNlKSB7XG4gICAgY29uc3QgeCA9IHRoaXMubGlzdGVuKHRoaXMucG9ydHMueCwgdHJ1ZSlcbiAgICBjb25zdCB5ID0gdGhpcy5saXN0ZW4odGhpcy5wb3J0cy55LCB0cnVlKSArIDFcbiAgICB0aGlzLmFkZFBvcnQoJ291dHB1dCcsIHsgeDogeCwgeTogeSwgb3V0cHV0OiB0cnVlIH0pXG4gICAgcmV0dXJuIHRoaXMubGlzdGVuKHRoaXMucG9ydHMudmFsKVxuICB9XG59XG5cbmxpYnJhcnkueSA9IGZ1bmN0aW9uIE9wZXJhdG9yWSAob3JjYSwgeCwgeSwgcGFzc2l2ZSkge1xuICBPcGVyYXRvci5jYWxsKHRoaXMsIG9yY2EsIHgsIHksICd5JywgcGFzc2l2ZSlcblxuICB0aGlzLm5hbWUgPSAnanltcGVyJ1xuICB0aGlzLmluZm8gPSAnT3V0cHV0cyB3ZXN0d2FyZCBvcGVyYW5kJ1xuXG4gIHRoaXMucG9ydHMudmFsID0geyB4OiAtMSwgeTogMCB9XG4gIHRoaXMucG9ydHMub3V0cHV0ID0geyB4OiAxLCB5OiAwLCBvdXRwdXQ6IHRydWUgfVxuXG4gIHRoaXMub3BlcmF0aW9uID0gZnVuY3Rpb24gKGZvcmNlID0gZmFsc2UpIHtcbiAgICBvcmNhLmxvY2sodGhpcy54ICsgMSwgdGhpcy55KVxuICAgIHJldHVybiB0aGlzLmxpc3Rlbih0aGlzLnBvcnRzLnZhbClcbiAgfVxufVxuXG5saWJyYXJ5LnogPSBmdW5jdGlvbiBPcGVyYXRvclogKG9yY2EsIHgsIHksIHBhc3NpdmUpIHtcbiAgT3BlcmF0b3IuY2FsbCh0aGlzLCBvcmNhLCB4LCB5LCAneicsIHBhc3NpdmUpXG5cbiAgdGhpcy5uYW1lID0gJ2xlcnAnXG4gIHRoaXMuaW5mbyA9ICdUcmFuc2l0aW9ucyBvcGVyYW5kIHRvIHRhcmdldCdcblxuICB0aGlzLnBvcnRzLnJhdGUgPSB7IHg6IC0xLCB5OiAwLCBkZWZhdWx0OiAnMScgfVxuICB0aGlzLnBvcnRzLnRhcmdldCA9IHsgeDogMSwgeTogMCB9XG4gIHRoaXMucG9ydHMub3V0cHV0ID0geyB4OiAwLCB5OiAxLCBzZW5zaXRpdmU6IHRydWUsIHJlYWRlcjogdHJ1ZSwgb3V0cHV0OiB0cnVlIH1cblxuICB0aGlzLm9wZXJhdGlvbiA9IGZ1bmN0aW9uIChmb3JjZSA9IGZhbHNlKSB7XG4gICAgY29uc3QgcmF0ZSA9IHRoaXMubGlzdGVuKHRoaXMucG9ydHMucmF0ZSwgdHJ1ZSlcbiAgICBjb25zdCB0YXJnZXQgPSB0aGlzLmxpc3Rlbih0aGlzLnBvcnRzLnRhcmdldCwgdHJ1ZSlcbiAgICBjb25zdCB2YWwgPSB0aGlzLmxpc3Rlbih0aGlzLnBvcnRzLm91dHB1dCwgdHJ1ZSlcbiAgICBjb25zdCBtb2QgPSB2YWwgPD0gdGFyZ2V0IC0gcmF0ZSA/IHJhdGUgOiB2YWwgPj0gdGFyZ2V0ICsgcmF0ZSA/IC1yYXRlIDogdGFyZ2V0IC0gdmFsXG4gICAgcmV0dXJuIG9yY2Eua2V5T2YodmFsICsgbW9kKVxuICB9XG59XG5cbi8vIFNwZWNpYWxzXG5cbmxpYnJhcnlbJyonXSA9IGZ1bmN0aW9uIE9wZXJhdG9yQmFuZyAob3JjYSwgeCwgeSwgcGFzc2l2ZSkge1xuICBPcGVyYXRvci5jYWxsKHRoaXMsIG9yY2EsIHgsIHksICcqJywgdHJ1ZSlcblxuICB0aGlzLm5hbWUgPSAnYmFuZydcbiAgdGhpcy5pbmZvID0gJ0JhbmdzIG5laWdoYm9yaW5nIG9wZXJhbmRzJ1xuICB0aGlzLmRyYXcgPSBmYWxzZVxuXG4gIHRoaXMucnVuID0gZnVuY3Rpb24gKGZvcmNlID0gZmFsc2UpIHtcbiAgICB0aGlzLmRyYXcgPSBmYWxzZVxuICAgIHRoaXMuZXJhc2UoKVxuICB9XG59XG5cbmxpYnJhcnlbJyMnXSA9IGZ1bmN0aW9uIE9wZXJhdG9yQ29tbWVudCAob3JjYSwgeCwgeSwgcGFzc2l2ZSkge1xuICBPcGVyYXRvci5jYWxsKHRoaXMsIG9yY2EsIHgsIHksICcjJywgdHJ1ZSlcblxuICB0aGlzLm5hbWUgPSAnY29tbWVudCdcbiAgdGhpcy5pbmZvID0gJ0hhbHRzIGxpbmUnXG4gIHRoaXMuZHJhdyA9IGZhbHNlXG5cbiAgdGhpcy5vcGVyYXRpb24gPSBmdW5jdGlvbiAoKSB7XG4gICAgZm9yIChsZXQgeCA9IHRoaXMueCArIDE7IHggPD0gb3JjYS53OyB4KyspIHtcbiAgICAgIG9yY2EubG9jayh4LCB0aGlzLnkpXG4gICAgICBpZiAob3JjYS5nbHlwaEF0KHgsIHRoaXMueSkgPT09IHRoaXMuZ2x5cGgpIHsgYnJlYWsgfVxuICAgIH1cbiAgICBvcmNhLmxvY2sodGhpcy54LCB0aGlzLnkpXG4gIH1cbn1cblxuLy8gSU9cblxubGlicmFyeS4kID0gZnVuY3Rpb24gT3BlcmF0b3JTZWxmIChvcmNhLCB4LCB5LCBwYXNzaXZlKSB7XG4gIE9wZXJhdG9yLmNhbGwodGhpcywgb3JjYSwgeCwgeSwgJyonLCB0cnVlKVxuXG4gIHRoaXMubmFtZSA9ICdzZWxmJ1xuICB0aGlzLmluZm8gPSAnU2VuZHMgT1JDQSBjb21tYW5kJ1xuXG4gIHRoaXMucnVuID0gZnVuY3Rpb24gKGZvcmNlID0gZmFsc2UpIHtcbiAgICBsZXQgbXNnID0gJydcbiAgICBmb3IgKGxldCB4ID0gMTsgeCA8PSAzNjsgeCsrKSB7XG4gICAgICBjb25zdCBnID0gb3JjYS5nbHlwaEF0KHRoaXMueCArIHgsIHRoaXMueSlcbiAgICAgIG9yY2EubG9jayh0aGlzLnggKyB4LCB0aGlzLnkpXG4gICAgICBpZiAoZyA9PT0gJy4nKSB7IGJyZWFrIH1cbiAgICAgIG1zZyArPSBnXG4gICAgfVxuXG4gICAgaWYgKCF0aGlzLmhhc05laWdoYm9yKCcqJykgJiYgZm9yY2UgPT09IGZhbHNlKSB7IHJldHVybiB9XG4gICAgaWYgKG1zZyA9PT0gJycpIHsgcmV0dXJuIH1cblxuICAgIHRoaXMuZHJhdyA9IGZhbHNlXG4gICAgY2xpZW50LmNvbW1hbmRlci50cmlnZ2VyKGAke21zZ31gLCB7IHgsIHk6IHkgKyAxIH0sIGZhbHNlKVxuICB9XG59XG5cbmxpYnJhcnlbJzonXSA9IGZ1bmN0aW9uIE9wZXJhdG9yTWlkaSAob3JjYSwgeCwgeSwgcGFzc2l2ZSkge1xuICBPcGVyYXRvci5jYWxsKHRoaXMsIG9yY2EsIHgsIHksICc6JywgdHJ1ZSlcblxuICB0aGlzLm5hbWUgPSAnbWlkaSdcbiAgdGhpcy5pbmZvID0gJ1NlbmRzIE1JREkgbm90ZSdcbiAgdGhpcy5wb3J0cy5jaGFubmVsID0geyB4OiAxLCB5OiAwIH1cbiAgdGhpcy5wb3J0cy5vY3RhdmUgPSB7IHg6IDIsIHk6IDAsIGNsYW1wOiB7IG1pbjogMCwgbWF4OiA4IH0gfVxuICB0aGlzLnBvcnRzLm5vdGUgPSB7IHg6IDMsIHk6IDAgfVxuICB0aGlzLnBvcnRzLnZlbG9jaXR5ID0geyB4OiA0LCB5OiAwLCBkZWZhdWx0OiAnZicsIGNsYW1wOiB7IG1pbjogMCwgbWF4OiAxNiB9IH1cbiAgdGhpcy5wb3J0cy5sZW5ndGggPSB7IHg6IDUsIHk6IDAsIGRlZmF1bHQ6ICcxJywgY2xhbXA6IHsgbWluOiAwLCBtYXg6IDMyIH0gfVxuXG4gIHRoaXMub3BlcmF0aW9uID0gZnVuY3Rpb24gKGZvcmNlID0gZmFsc2UpIHtcbiAgICBpZiAoIXRoaXMuaGFzTmVpZ2hib3IoJyonKSAmJiBmb3JjZSA9PT0gZmFsc2UpIHsgcmV0dXJuIH1cbiAgICBpZiAodGhpcy5saXN0ZW4odGhpcy5wb3J0cy5jaGFubmVsKSA9PT0gJy4nKSB7IHJldHVybiB9XG4gICAgaWYgKHRoaXMubGlzdGVuKHRoaXMucG9ydHMub2N0YXZlKSA9PT0gJy4nKSB7IHJldHVybiB9XG4gICAgaWYgKHRoaXMubGlzdGVuKHRoaXMucG9ydHMubm90ZSkgPT09ICcuJykgeyByZXR1cm4gfVxuICAgIGlmICghaXNOYU4odGhpcy5saXN0ZW4odGhpcy5wb3J0cy5ub3RlKSkpIHsgcmV0dXJuIH1cblxuICAgIGNvbnN0IGNoYW5uZWwgPSB0aGlzLmxpc3Rlbih0aGlzLnBvcnRzLmNoYW5uZWwsIHRydWUpXG4gICAgaWYgKGNoYW5uZWwgPiAxNSkgeyByZXR1cm4gfVxuICAgIGNvbnN0IG9jdGF2ZSA9IHRoaXMubGlzdGVuKHRoaXMucG9ydHMub2N0YXZlLCB0cnVlKVxuICAgIGNvbnN0IG5vdGUgPSB0aGlzLmxpc3Rlbih0aGlzLnBvcnRzLm5vdGUpXG4gICAgY29uc3QgdmVsb2NpdHkgPSB0aGlzLmxpc3Rlbih0aGlzLnBvcnRzLnZlbG9jaXR5LCB0cnVlKVxuICAgIGNvbnN0IGxlbmd0aCA9IHRoaXMubGlzdGVuKHRoaXMucG9ydHMubGVuZ3RoLCB0cnVlKVxuXG4gICAgY2xpZW50LmlvLm1pZGkucHVzaChjaGFubmVsLCBvY3RhdmUsIG5vdGUsIHZlbG9jaXR5LCBsZW5ndGgpXG5cbiAgICBpZiAoZm9yY2UgPT09IHRydWUpIHtcbiAgICAgIGNsaWVudC5pby5taWRpLnJ1bigpXG4gICAgfVxuXG4gICAgdGhpcy5kcmF3ID0gZmFsc2VcbiAgfVxufVxuXG5saWJyYXJ5WychJ10gPSBmdW5jdGlvbiBPcGVyYXRvckNDIChvcmNhLCB4LCB5KSB7XG4gIE9wZXJhdG9yLmNhbGwodGhpcywgb3JjYSwgeCwgeSwgJyEnLCB0cnVlKVxuXG4gIHRoaXMubmFtZSA9ICdjYydcbiAgdGhpcy5pbmZvID0gJ1NlbmRzIE1JREkgY29udHJvbCBjaGFuZ2UnXG4gIHRoaXMucG9ydHMuY2hhbm5lbCA9IHsgeDogMSwgeTogMCB9XG4gIHRoaXMucG9ydHMua25vYiA9IHsgeDogMiwgeTogMCwgY2xhbXA6IHsgbWluOiAwIH0gfVxuICB0aGlzLnBvcnRzLnZhbHVlID0geyB4OiAzLCB5OiAwLCBjbGFtcDogeyBtaW46IDAgfSB9XG5cbiAgdGhpcy5vcGVyYXRpb24gPSBmdW5jdGlvbiAoZm9yY2UgPSBmYWxzZSkge1xuICAgIGlmICghdGhpcy5oYXNOZWlnaGJvcignKicpICYmIGZvcmNlID09PSBmYWxzZSkgeyByZXR1cm4gfVxuICAgIGlmICh0aGlzLmxpc3Rlbih0aGlzLnBvcnRzLmNoYW5uZWwpID09PSAnLicpIHsgcmV0dXJuIH1cbiAgICBpZiAodGhpcy5saXN0ZW4odGhpcy5wb3J0cy5rbm9iKSA9PT0gJy4nKSB7IHJldHVybiB9XG5cbiAgICBjb25zdCBjaGFubmVsID0gdGhpcy5saXN0ZW4odGhpcy5wb3J0cy5jaGFubmVsLCB0cnVlKVxuICAgIGlmIChjaGFubmVsID4gMTUpIHsgcmV0dXJuIH1cbiAgICBjb25zdCBrbm9iID0gdGhpcy5saXN0ZW4odGhpcy5wb3J0cy5rbm9iLCB0cnVlKVxuICAgIGNvbnN0IHJhd1ZhbHVlID0gdGhpcy5saXN0ZW4odGhpcy5wb3J0cy52YWx1ZSwgdHJ1ZSlcbiAgICBjb25zdCB2YWx1ZSA9IE1hdGguY2VpbCgoMTI3ICogcmF3VmFsdWUpIC8gMzUpXG5cbiAgICBjbGllbnQuaW8uY2Muc3RhY2sucHVzaCh7IGNoYW5uZWwsIGtub2IsIHZhbHVlLCB0eXBlOiAnY2MnIH0pXG5cbiAgICB0aGlzLmRyYXcgPSBmYWxzZVxuXG4gICAgaWYgKGZvcmNlID09PSB0cnVlKSB7XG4gICAgICBjbGllbnQuaW8uY2MucnVuKClcbiAgICB9XG4gIH1cbn1cblxubGlicmFyeVsnPyddID0gZnVuY3Rpb24gT3BlcmF0b3JQQiAob3JjYSwgeCwgeSkge1xuICBPcGVyYXRvci5jYWxsKHRoaXMsIG9yY2EsIHgsIHksICc/JywgdHJ1ZSlcblxuICB0aGlzLm5hbWUgPSAncGInXG4gIHRoaXMuaW5mbyA9ICdTZW5kcyBNSURJIHBpdGNoIGJlbmQnXG4gIHRoaXMucG9ydHMuY2hhbm5lbCA9IHsgeDogMSwgeTogMCwgY2xhbXA6IHsgbWluOiAwLCBtYXg6IDE1IH0gfVxuICB0aGlzLnBvcnRzLmxzYiA9IHsgeDogMiwgeTogMCwgY2xhbXA6IHsgbWluOiAwIH0gfVxuICB0aGlzLnBvcnRzLm1zYiA9IHsgeDogMywgeTogMCwgY2xhbXA6IHsgbWluOiAwIH0gfVxuXG4gIHRoaXMub3BlcmF0aW9uID0gZnVuY3Rpb24gKGZvcmNlID0gZmFsc2UpIHtcbiAgICBpZiAoIXRoaXMuaGFzTmVpZ2hib3IoJyonKSAmJiBmb3JjZSA9PT0gZmFsc2UpIHsgcmV0dXJuIH1cbiAgICBpZiAodGhpcy5saXN0ZW4odGhpcy5wb3J0cy5jaGFubmVsKSA9PT0gJy4nKSB7IHJldHVybiB9XG4gICAgaWYgKHRoaXMubGlzdGVuKHRoaXMucG9ydHMubHNiKSA9PT0gJy4nKSB7IHJldHVybiB9XG5cbiAgICBjb25zdCBjaGFubmVsID0gdGhpcy5saXN0ZW4odGhpcy5wb3J0cy5jaGFubmVsLCB0cnVlKVxuICAgIGNvbnN0IHJhd2xzYiA9IHRoaXMubGlzdGVuKHRoaXMucG9ydHMubHNiLCB0cnVlKVxuICAgIGNvbnN0IGxzYiA9IE1hdGguY2VpbCgoMTI3ICogcmF3bHNiKSAvIDM1KVxuICAgIGNvbnN0IHJhd21zYiA9IHRoaXMubGlzdGVuKHRoaXMucG9ydHMubXNiLCB0cnVlKVxuICAgIGNvbnN0IG1zYiA9IE1hdGguY2VpbCgoMTI3ICogcmF3bXNiKSAvIDM1KVxuXG4gICAgY2xpZW50LmlvLmNjLnN0YWNrLnB1c2goeyBjaGFubmVsLCBsc2IsIG1zYiwgdHlwZTogJ3BiJyB9KVxuXG4gICAgdGhpcy5kcmF3ID0gZmFsc2VcblxuICAgIGlmIChmb3JjZSA9PT0gdHJ1ZSkge1xuICAgICAgY2xpZW50LmlvLmNjLnJ1bigpXG4gICAgfVxuICB9XG59XG5cbmxpYnJhcnlbJyUnXSA9IGZ1bmN0aW9uIE9wZXJhdG9yTW9ubyAob3JjYSwgeCwgeSwgcGFzc2l2ZSkge1xuICBPcGVyYXRvci5jYWxsKHRoaXMsIG9yY2EsIHgsIHksICclJywgdHJ1ZSlcblxuICB0aGlzLm5hbWUgPSAnbW9ubydcbiAgdGhpcy5pbmZvID0gJ1NlbmRzIE1JREkgbW9ub3Bob25pYyBub3RlJ1xuICB0aGlzLnBvcnRzLmNoYW5uZWwgPSB7IHg6IDEsIHk6IDAgfVxuICB0aGlzLnBvcnRzLm9jdGF2ZSA9IHsgeDogMiwgeTogMCwgY2xhbXA6IHsgbWluOiAwLCBtYXg6IDggfSB9XG4gIHRoaXMucG9ydHMubm90ZSA9IHsgeDogMywgeTogMCB9XG4gIHRoaXMucG9ydHMudmVsb2NpdHkgPSB7IHg6IDQsIHk6IDAsIGRlZmF1bHQ6ICdmJywgY2xhbXA6IHsgbWluOiAwLCBtYXg6IDE2IH0gfVxuICB0aGlzLnBvcnRzLmxlbmd0aCA9IHsgeDogNSwgeTogMCwgZGVmYXVsdDogJzEnLCBjbGFtcDogeyBtaW46IDAsIG1heDogMzIgfSB9XG5cbiAgdGhpcy5vcGVyYXRpb24gPSBmdW5jdGlvbiAoZm9yY2UgPSBmYWxzZSkge1xuICAgIGlmICghdGhpcy5oYXNOZWlnaGJvcignKicpICYmIGZvcmNlID09PSBmYWxzZSkgeyByZXR1cm4gfVxuICAgIGlmICh0aGlzLmxpc3Rlbih0aGlzLnBvcnRzLmNoYW5uZWwpID09PSAnLicpIHsgcmV0dXJuIH1cbiAgICBpZiAodGhpcy5saXN0ZW4odGhpcy5wb3J0cy5vY3RhdmUpID09PSAnLicpIHsgcmV0dXJuIH1cbiAgICBpZiAodGhpcy5saXN0ZW4odGhpcy5wb3J0cy5ub3RlKSA9PT0gJy4nKSB7IHJldHVybiB9XG4gICAgaWYgKCFpc05hTih0aGlzLmxpc3Rlbih0aGlzLnBvcnRzLm5vdGUpKSkgeyByZXR1cm4gfVxuXG4gICAgY29uc3QgY2hhbm5lbCA9IHRoaXMubGlzdGVuKHRoaXMucG9ydHMuY2hhbm5lbCwgdHJ1ZSlcbiAgICBpZiAoY2hhbm5lbCA+IDE1KSB7IHJldHVybiB9XG4gICAgY29uc3Qgb2N0YXZlID0gdGhpcy5saXN0ZW4odGhpcy5wb3J0cy5vY3RhdmUsIHRydWUpXG4gICAgY29uc3Qgbm90ZSA9IHRoaXMubGlzdGVuKHRoaXMucG9ydHMubm90ZSlcbiAgICBjb25zdCB2ZWxvY2l0eSA9IHRoaXMubGlzdGVuKHRoaXMucG9ydHMudmVsb2NpdHksIHRydWUpXG4gICAgY29uc3QgbGVuZ3RoID0gdGhpcy5saXN0ZW4odGhpcy5wb3J0cy5sZW5ndGgsIHRydWUpXG5cbiAgICBjbGllbnQuaW8ubW9uby5wdXNoKGNoYW5uZWwsIG9jdGF2ZSwgbm90ZSwgdmVsb2NpdHksIGxlbmd0aClcblxuICAgIGlmIChmb3JjZSA9PT0gdHJ1ZSkge1xuICAgICAgY2xpZW50LmlvLm1vbm8ucnVuKClcbiAgICB9XG5cbiAgICB0aGlzLmRyYXcgPSBmYWxzZVxuICB9XG59XG5cbmxpYnJhcnlbJz0nXSA9IGZ1bmN0aW9uIE9wZXJhdG9yT3NjIChvcmNhLCB4LCB5LCBwYXNzaXZlKSB7XG4gIE9wZXJhdG9yLmNhbGwodGhpcywgb3JjYSwgeCwgeSwgJz0nLCB0cnVlKVxuXG4gIHRoaXMubmFtZSA9ICdvc2MnXG4gIHRoaXMuaW5mbyA9ICdTZW5kcyBPU0MgbWVzc2FnZSdcblxuICB0aGlzLnBvcnRzLnBhdGggPSB7IHg6IDEsIHk6IDAgfVxuXG4gIHRoaXMub3BlcmF0aW9uID0gZnVuY3Rpb24gKGZvcmNlID0gZmFsc2UpIHtcbiAgICBsZXQgbXNnID0gJydcbiAgICBmb3IgKGxldCB4ID0gMjsgeCA8PSAzNjsgeCsrKSB7XG4gICAgICBjb25zdCBnID0gb3JjYS5nbHlwaEF0KHRoaXMueCArIHgsIHRoaXMueSlcbiAgICAgIG9yY2EubG9jayh0aGlzLnggKyB4LCB0aGlzLnkpXG4gICAgICBpZiAoZyA9PT0gJy4nKSB7IGJyZWFrIH1cbiAgICAgIG1zZyArPSBnXG4gICAgfVxuXG4gICAgaWYgKCF0aGlzLmhhc05laWdoYm9yKCcqJykgJiYgZm9yY2UgPT09IGZhbHNlKSB7IHJldHVybiB9XG5cbiAgICBjb25zdCBwYXRoID0gdGhpcy5saXN0ZW4odGhpcy5wb3J0cy5wYXRoKVxuXG4gICAgaWYgKCFwYXRoIHx8IHBhdGggPT09ICcuJykgeyByZXR1cm4gfVxuXG4gICAgdGhpcy5kcmF3ID0gZmFsc2VcbiAgICBjbGllbnQuaW8ub3NjLnB1c2goJy8nICsgcGF0aCwgbXNnKVxuXG4gICAgaWYgKGZvcmNlID09PSB0cnVlKSB7XG4gICAgICBjbGllbnQuaW8ub3NjLnJ1bigpXG4gICAgfVxuICB9XG59XG5cbmxpYnJhcnlbJzsnXSA9IGZ1bmN0aW9uIE9wZXJhdG9yVWRwIChvcmNhLCB4LCB5LCBwYXNzaXZlKSB7XG4gIE9wZXJhdG9yLmNhbGwodGhpcywgb3JjYSwgeCwgeSwgJzsnLCB0cnVlKVxuXG4gIHRoaXMubmFtZSA9ICd1ZHAnXG4gIHRoaXMuaW5mbyA9ICdTZW5kcyBVRFAgbWVzc2FnZSdcblxuICB0aGlzLm9wZXJhdGlvbiA9IGZ1bmN0aW9uIChmb3JjZSA9IGZhbHNlKSB7XG4gICAgbGV0IG1zZyA9ICcnXG4gICAgZm9yIChsZXQgeCA9IDE7IHggPD0gMzY7IHgrKykge1xuICAgICAgY29uc3QgZyA9IG9yY2EuZ2x5cGhBdCh0aGlzLnggKyB4LCB0aGlzLnkpXG4gICAgICBvcmNhLmxvY2sodGhpcy54ICsgeCwgdGhpcy55KVxuICAgICAgaWYgKGcgPT09ICcuJykgeyBicmVhayB9XG4gICAgICBtc2cgKz0gZ1xuICAgIH1cblxuICAgIGlmICghdGhpcy5oYXNOZWlnaGJvcignKicpICYmIGZvcmNlID09PSBmYWxzZSkgeyByZXR1cm4gfVxuXG4gICAgdGhpcy5kcmF3ID0gZmFsc2VcbiAgICBjbGllbnQuaW8udWRwLnB1c2gobXNnKVxuXG4gICAgaWYgKGZvcmNlID09PSB0cnVlKSB7XG4gICAgICBjbGllbnQuaW8udWRwLnJ1bigpXG4gICAgfVxuICB9XG59XG5cbi8vIEFkZCBudW1iZXJzXG5cbmZvciAobGV0IGkgPSAwOyBpIDw9IDk7IGkrKykge1xuICBsaWJyYXJ5W2Ake2l9YF0gPSBmdW5jdGlvbiBPcGVyYXRvck51bGwgKG9yY2EsIHgsIHksIHBhc3NpdmUpIHtcbiAgICBPcGVyYXRvci5jYWxsKHRoaXMsIG9yY2EsIHgsIHksICcuJywgZmFsc2UpXG5cbiAgICB0aGlzLm5hbWUgPSAnbnVsbCdcbiAgICB0aGlzLmluZm8gPSAnZW1wdHknXG5cbiAgICAvLyBPdmVyd3JpdGUgcnVuLCB0byBkaXNhYmxlIGRyYXcuXG4gICAgdGhpcy5ydW4gPSBmdW5jdGlvbiAoZm9yY2UgPSBmYWxzZSkge1xuXG4gICAgfVxuICB9XG59XG5cbi8qKiogRVhQT1JUUyBGUk9NIGV4cG9ydHMtbG9hZGVyICoqKi9cbmV4cG9ydCBkZWZhdWx0IGxpYnJhcnk7XG4iLCIndXNlIHN0cmljdCdcblxuZnVuY3Rpb24gT3BlcmF0b3IgKG9yY2EsIHgsIHksIGdseXBoID0gJy4nLCBwYXNzaXZlID0gZmFsc2UpIHtcbiAgdGhpcy5uYW1lID0gJ3Vua25vd24nXG4gIHRoaXMueCA9IHhcbiAgdGhpcy55ID0geVxuICB0aGlzLnBhc3NpdmUgPSBwYXNzaXZlXG4gIHRoaXMuZHJhdyA9IHBhc3NpdmVcbiAgdGhpcy5nbHlwaCA9IHBhc3NpdmUgPyBnbHlwaC50b1VwcGVyQ2FzZSgpIDogZ2x5cGhcbiAgdGhpcy5pbmZvID0gJy0tJ1xuICB0aGlzLnBvcnRzID0ge31cblxuICAvLyBBY3Rpb25zXG5cbiAgdGhpcy5saXN0ZW4gPSBmdW5jdGlvbiAocG9ydCwgdG9WYWx1ZSA9IGZhbHNlKSB7XG4gICAgaWYgKCFwb3J0KSB7IHJldHVybiAodG9WYWx1ZSA/IDAgOiAnLicpIH1cbiAgICBjb25zdCBnID0gb3JjYS5nbHlwaEF0KHRoaXMueCArIHBvcnQueCwgdGhpcy55ICsgcG9ydC55KVxuICAgIGNvbnN0IGdseXBoID0gKGcgPT09ICcuJyB8fCBnID09PSAnKicpICYmIHBvcnQuZGVmYXVsdCA/IHBvcnQuZGVmYXVsdCA6IGdcbiAgICBpZiAodG9WYWx1ZSkge1xuICAgICAgY29uc3QgbWluID0gcG9ydC5jbGFtcCAmJiBwb3J0LmNsYW1wLm1pbiA/IHBvcnQuY2xhbXAubWluIDogMFxuICAgICAgY29uc3QgbWF4ID0gcG9ydC5jbGFtcCAmJiBwb3J0LmNsYW1wLm1heCA/IHBvcnQuY2xhbXAubWF4IDogMzZcbiAgICAgIHJldHVybiBjbGFtcChvcmNhLnZhbHVlT2YoZ2x5cGgpLCBtaW4sIG1heClcbiAgICB9XG4gICAgcmV0dXJuIGdseXBoXG4gIH1cblxuICB0aGlzLm91dHB1dCA9IGZ1bmN0aW9uIChnLCBwb3J0ID0gdGhpcy5wb3J0cy5vdXRwdXQpIHtcbiAgICBpZiAoIXBvcnQpIHsgY29uc29sZS53YXJuKHRoaXMubmFtZSwgJ1RyeWluZyB0byBvdXRwdXQsIGJ1dCBubyBwb3J0Jyk7IHJldHVybiB9XG4gICAgaWYgKCFnKSB7IHJldHVybiB9XG4gICAgb3JjYS53cml0ZSh0aGlzLnggKyBwb3J0LngsIHRoaXMueSArIHBvcnQueSwgdGhpcy5zaG91bGRVcHBlckNhc2UoKSA9PT0gdHJ1ZSA/IGAke2d9YC50b1VwcGVyQ2FzZSgpIDogZylcbiAgfVxuXG4gIHRoaXMuYmFuZyA9IGZ1bmN0aW9uIChiKSB7XG4gICAgaWYgKCF0aGlzLnBvcnRzLm91dHB1dCkgeyBjb25zb2xlLndhcm4odGhpcy5uYW1lLCAnVHJ5aW5nIHRvIGJhbmcsIGJ1dCBubyBwb3J0Jyk7IHJldHVybiB9XG4gICAgb3JjYS53cml0ZSh0aGlzLnggKyB0aGlzLnBvcnRzLm91dHB1dC54LCB0aGlzLnkgKyB0aGlzLnBvcnRzLm91dHB1dC55LCBiID8gJyonIDogJy4nKVxuICAgIG9yY2EubG9jayh0aGlzLnggKyB0aGlzLnBvcnRzLm91dHB1dC54LCB0aGlzLnkgKyB0aGlzLnBvcnRzLm91dHB1dC55KVxuICB9XG5cbiAgLy8gUGhhc2VzXG5cbiAgdGhpcy5ydW4gPSBmdW5jdGlvbiAoZm9yY2UgPSBmYWxzZSkge1xuICAgIC8vIE9wZXJhdGVcbiAgICBjb25zdCBwYXlsb2FkID0gdGhpcy5vcGVyYXRpb24oZm9yY2UpXG4gICAgLy8gUGVybWlzc2lvbnNcbiAgICBmb3IgKGNvbnN0IHBvcnQgb2YgT2JqZWN0LnZhbHVlcyh0aGlzLnBvcnRzKSkge1xuICAgICAgaWYgKHBvcnQuYmFuZykgeyBjb250aW51ZSB9XG4gICAgICBvcmNhLmxvY2sodGhpcy54ICsgcG9ydC54LCB0aGlzLnkgKyBwb3J0LnkpXG4gICAgfVxuXG4gICAgaWYgKHRoaXMucG9ydHMub3V0cHV0KSB7XG4gICAgICBpZiAodGhpcy5wb3J0cy5vdXRwdXQuYmFuZyA9PT0gdHJ1ZSkge1xuICAgICAgICB0aGlzLmJhbmcocGF5bG9hZClcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMub3V0cHV0KHBheWxvYWQpXG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgdGhpcy5vcGVyYXRpb24gPSBmdW5jdGlvbiAoKSB7XG4gICAgLy8gVXNlZCBpbiBpbmRpdmlkdWFsIG9wZXJhdG9yc1xuICB9XG5cbiAgLy8gSGVscGVyc1xuXG4gIHRoaXMubG9jayA9IGZ1bmN0aW9uICgpIHtcbiAgICBvcmNhLmxvY2sodGhpcy54LCB0aGlzLnkpXG4gIH1cblxuICB0aGlzLnJlcGxhY2UgPSBmdW5jdGlvbiAoZykge1xuICAgIG9yY2Eud3JpdGUodGhpcy54LCB0aGlzLnksIGcpXG4gIH1cblxuICB0aGlzLmVyYXNlID0gZnVuY3Rpb24gKCkge1xuICAgIHRoaXMucmVwbGFjZSgnLicpXG4gIH1cblxuICB0aGlzLmV4cGxvZGUgPSBmdW5jdGlvbiAoKSB7XG4gICAgdGhpcy5yZXBsYWNlKCcqJylcbiAgfVxuXG4gIHRoaXMubW92ZSA9IGZ1bmN0aW9uICh4LCB5KSB7XG4gICAgY29uc3Qgb2Zmc2V0ID0geyB4OiB0aGlzLnggKyB4LCB5OiB0aGlzLnkgKyB5IH1cbiAgICBpZiAoIW9yY2EuaW5Cb3VuZHMob2Zmc2V0LngsIG9mZnNldC55KSkgeyB0aGlzLmV4cGxvZGUoKTsgcmV0dXJuIH1cbiAgICBjb25zdCBjb2xsaWRlciA9IG9yY2EuZ2x5cGhBdChvZmZzZXQueCwgb2Zmc2V0LnkpXG4gICAgaWYgKGNvbGxpZGVyICE9PSAnKicgJiYgY29sbGlkZXIgIT09ICcuJykgeyB0aGlzLmV4cGxvZGUoKTsgcmV0dXJuIH1cbiAgICB0aGlzLmVyYXNlKClcbiAgICB0aGlzLnggKz0geFxuICAgIHRoaXMueSArPSB5XG4gICAgdGhpcy5yZXBsYWNlKHRoaXMuZ2x5cGgpXG4gICAgdGhpcy5sb2NrKClcbiAgfVxuXG4gIHRoaXMuaGFzTmVpZ2hib3IgPSBmdW5jdGlvbiAoZykge1xuICAgIGlmIChvcmNhLmdseXBoQXQodGhpcy54ICsgMSwgdGhpcy55KSA9PT0gZykgeyByZXR1cm4gdHJ1ZSB9XG4gICAgaWYgKG9yY2EuZ2x5cGhBdCh0aGlzLnggLSAxLCB0aGlzLnkpID09PSBnKSB7IHJldHVybiB0cnVlIH1cbiAgICBpZiAob3JjYS5nbHlwaEF0KHRoaXMueCwgdGhpcy55ICsgMSkgPT09IGcpIHsgcmV0dXJuIHRydWUgfVxuICAgIGlmIChvcmNhLmdseXBoQXQodGhpcy54LCB0aGlzLnkgLSAxKSA9PT0gZykgeyByZXR1cm4gdHJ1ZSB9XG4gICAgcmV0dXJuIGZhbHNlXG4gIH1cblxuICAvLyBEb2NzXG5cbiAgdGhpcy5hZGRQb3J0ID0gZnVuY3Rpb24gKG5hbWUsIHBvcykge1xuICAgIHRoaXMucG9ydHNbbmFtZV0gPSBwb3NcbiAgfVxuXG4gIHRoaXMuZ2V0UG9ydHMgPSBmdW5jdGlvbiAoKSB7XG4gICAgY29uc3QgYSA9IFtdXG4gICAgaWYgKHRoaXMuZHJhdyA9PT0gdHJ1ZSkge1xuICAgICAgYS5wdXNoKFt0aGlzLngsIHRoaXMueSwgMCwgYCR7dGhpcy5uYW1lLmNoYXJBdCgwKS50b1VwcGVyQ2FzZSgpICsgdGhpcy5uYW1lLnN1YnN0cmluZygxKS50b0xvd2VyQ2FzZSgpfWBdKVxuICAgIH1cbiAgICBpZiAoIXRoaXMucGFzc2l2ZSkgeyByZXR1cm4gYSB9XG4gICAgZm9yIChjb25zdCBpZCBpbiB0aGlzLnBvcnRzKSB7XG4gICAgICBjb25zdCBwb3J0ID0gdGhpcy5wb3J0c1tpZF1cbiAgICAgIGNvbnN0IHR5cGUgPSBwb3J0Lm91dHB1dCA/IDMgOiBwb3J0LnggPCAwIHx8IHBvcnQueSA8IDAgPyAxIDogMlxuICAgICAgYS5wdXNoKFt0aGlzLnggKyBwb3J0LngsIHRoaXMueSArIHBvcnQueSwgdHlwZSwgYCR7dGhpcy5nbHlwaH0tJHtpZH1gXSlcbiAgICB9XG4gICAgcmV0dXJuIGFcbiAgfVxuXG4gIHRoaXMuc2hvdWxkVXBwZXJDYXNlID0gZnVuY3Rpb24gKHBvcnRzID0gdGhpcy5wb3J0cykge1xuICAgIGlmICghdGhpcy5wb3J0cy5vdXRwdXQgfHwgIXRoaXMucG9ydHMub3V0cHV0LnNlbnNpdGl2ZSkgeyByZXR1cm4gZmFsc2UgfVxuICAgIGNvbnN0IHZhbHVlID0gdGhpcy5saXN0ZW4oeyB4OiAxLCB5OiAwIH0pXG4gICAgaWYgKHZhbHVlLnRvTG93ZXJDYXNlKCkgPT09IHZhbHVlLnRvVXBwZXJDYXNlKCkpIHsgcmV0dXJuIGZhbHNlIH1cbiAgICBpZiAodmFsdWUudG9VcHBlckNhc2UoKSAhPT0gdmFsdWUpIHsgcmV0dXJuIGZhbHNlIH1cbiAgICByZXR1cm4gdHJ1ZVxuICB9XG5cbiAgLy8gRG9jc1xuXG4gIGZ1bmN0aW9uIGNsYW1wICh2LCBtaW4sIG1heCkgeyByZXR1cm4gdiA8IG1pbiA/IG1pbiA6IHYgPiBtYXggPyBtYXggOiB2IH1cbn1cblxuLyoqKiBFWFBPUlRTIEZST00gZXhwb3J0cy1sb2FkZXIgKioqL1xuZXhwb3J0IGRlZmF1bHQgT3BlcmF0b3I7XG4iLCIndXNlIHN0cmljdCdcblxuZnVuY3Rpb24gT3JjYSAobGlicmFyeSkge1xuICB0aGlzLmtleXMgPSAnMDEyMzQ1Njc4OWFiY2RlZmdoaWprbG1ub3BxcnN0dXZ3eHl6Jy5zcGxpdCgnJylcblxuICB0aGlzLncgPSAxIC8vIERlZmF1bHQgV2lkdGhcbiAgdGhpcy5oID0gMSAvLyBEZWZhdWx0IEhlaWdodFxuICB0aGlzLmYgPSAwIC8vIEZyYW1lXG4gIHRoaXMucyA9ICcnIC8vIFN0cmluZ1xuXG4gIHRoaXMubG9ja3MgPSBbXVxuICB0aGlzLnJ1bnRpbWUgPSBbXVxuICB0aGlzLnZhcmlhYmxlcyA9IHt9XG5cbiAgdGhpcy5ydW4gPSBmdW5jdGlvbiAoKSB7XG4gICAgdGhpcy5ydW50aW1lID0gdGhpcy5wYXJzZSgpXG4gICAgdGhpcy5vcGVyYXRlKHRoaXMucnVudGltZSlcbiAgICB0aGlzLmYgKz0gMVxuICB9XG5cbiAgdGhpcy5yZXNldCA9IGZ1bmN0aW9uICh3ID0gdGhpcy53LCBoID0gdGhpcy5oKSB7XG4gICAgdGhpcy5mID0gMFxuICAgIHRoaXMudyA9IHdcbiAgICB0aGlzLmggPSBoXG4gICAgdGhpcy5yZXBsYWNlKG5ldyBBcnJheSgodGhpcy5oICogdGhpcy53KSArIDEpLmpvaW4oJy4nKSlcbiAgfVxuXG4gIHRoaXMubG9hZCA9IGZ1bmN0aW9uICh3LCBoLCBzLCBmID0gMCkge1xuICAgIHRoaXMudyA9IHdcbiAgICB0aGlzLmggPSBoXG4gICAgdGhpcy5mID0gZlxuICAgIHRoaXMucmVwbGFjZSh0aGlzLmNsZWFuKHMpKVxuICAgIHJldHVybiB0aGlzXG4gIH1cblxuICB0aGlzLndyaXRlID0gZnVuY3Rpb24gKHgsIHksIGcpIHtcbiAgICBpZiAoIWcpIHsgcmV0dXJuIGZhbHNlIH1cbiAgICBpZiAoZy5sZW5ndGggIT09IDEpIHsgcmV0dXJuIGZhbHNlIH1cbiAgICBpZiAoIXRoaXMuaW5Cb3VuZHMoeCwgeSkpIHsgcmV0dXJuIGZhbHNlIH1cbiAgICBpZiAodGhpcy5nbHlwaEF0KHgsIHkpID09PSBnKSB7IHJldHVybiBmYWxzZSB9XG4gICAgY29uc3QgaW5kZXggPSB0aGlzLmluZGV4QXQoeCwgeSlcbiAgICBjb25zdCBnbHlwaCA9ICF0aGlzLmlzQWxsb3dlZChnKSA/ICcuJyA6IGdcbiAgICBjb25zdCBzdHJpbmcgPSB0aGlzLnMuc3Vic3RyKDAsIGluZGV4KSArIGdseXBoICsgdGhpcy5zLnN1YnN0cihpbmRleCArIDEpXG4gICAgdGhpcy5yZXBsYWNlKHN0cmluZylcbiAgICByZXR1cm4gdHJ1ZVxuICB9XG5cbiAgdGhpcy5jbGVhbiA9IChzdHIpID0+IHtcbiAgICByZXR1cm4gYCR7c3RyfWAucmVwbGFjZSgvXFxuL2csICcnKS50cmltKCkuc3Vic3RyKDAsIHRoaXMudyAqIHRoaXMuaCkuc3BsaXQoJycpLm1hcCgoZykgPT4ge1xuICAgICAgcmV0dXJuICF0aGlzLmlzQWxsb3dlZChnKSA/ICcuJyA6IGdcbiAgICB9KS5qb2luKCcnKVxuICB9XG5cbiAgdGhpcy5yZXBsYWNlID0gZnVuY3Rpb24gKHMpIHtcbiAgICB0aGlzLnMgPSBzXG4gIH1cblxuICAvLyBPcGVyYXRvcnNcblxuICB0aGlzLnBhcnNlID0gZnVuY3Rpb24gKCkge1xuICAgIGNvbnN0IGEgPSBbXVxuICAgIGZvciAobGV0IHkgPSAwOyB5IDwgdGhpcy5oOyB5KyspIHtcbiAgICAgIGZvciAobGV0IHggPSAwOyB4IDwgdGhpcy53OyB4KyspIHtcbiAgICAgICAgY29uc3QgZyA9IHRoaXMuZ2x5cGhBdCh4LCB5KVxuICAgICAgICBpZiAoZyA9PT0gJy4nIHx8ICF0aGlzLmlzQWxsb3dlZChnKSkgeyBjb250aW51ZSB9XG4gICAgICAgIGEucHVzaChuZXcgbGlicmFyeVtnLnRvTG93ZXJDYXNlKCldKHRoaXMsIHgsIHksIGcgPT09IGcudG9VcHBlckNhc2UoKSkpXG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBhXG4gIH1cblxuICB0aGlzLm9wZXJhdGUgPSBmdW5jdGlvbiAob3BlcmF0b3JzKSB7XG4gICAgdGhpcy5yZWxlYXNlKClcbiAgICBmb3IgKGNvbnN0IG9wZXJhdG9yIG9mIG9wZXJhdG9ycykge1xuICAgICAgaWYgKHRoaXMubG9ja0F0KG9wZXJhdG9yLngsIG9wZXJhdG9yLnkpKSB7IGNvbnRpbnVlIH1cbiAgICAgIGlmIChvcGVyYXRvci5wYXNzaXZlIHx8IG9wZXJhdG9yLmhhc05laWdoYm9yKCcqJykpIHtcbiAgICAgICAgb3BlcmF0b3IucnVuKClcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICB0aGlzLmJvdW5kcyA9IGZ1bmN0aW9uICgpIHtcbiAgICBsZXQgdyA9IDBcbiAgICBsZXQgaCA9IDBcbiAgICBmb3IgKGxldCB5ID0gMDsgeSA8IHRoaXMuaDsgeSsrKSB7XG4gICAgICBmb3IgKGxldCB4ID0gMDsgeCA8IHRoaXMudzsgeCsrKSB7XG4gICAgICAgIGNvbnN0IGcgPSB0aGlzLmdseXBoQXQoeCwgeSlcbiAgICAgICAgaWYgKGcgIT09ICcuJykge1xuICAgICAgICAgIGlmICh4ID4gdykgeyB3ID0geCB9XG4gICAgICAgICAgaWYgKHkgPiBoKSB7IGggPSB5IH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4geyB3LCBoIH1cbiAgfVxuXG4gIC8vIEJsb2Nrc1xuXG4gIHRoaXMuZ2V0QmxvY2sgPSAoeCwgeSwgdywgaCkgPT4ge1xuICAgIGxldCBsaW5lcyA9ICcnXG4gICAgZm9yIChsZXQgX3kgPSB5OyBfeSA8IHkgKyBoOyBfeSsrKSB7XG4gICAgICBsZXQgbGluZSA9ICcnXG4gICAgICBmb3IgKGxldCBfeCA9IHg7IF94IDwgeCArIHc7IF94KyspIHtcbiAgICAgICAgbGluZSArPSB0aGlzLmdseXBoQXQoX3gsIF95KVxuICAgICAgfVxuICAgICAgbGluZXMgKz0gbGluZSArICdcXG4nXG4gICAgfVxuICAgIHJldHVybiBsaW5lc1xuICB9XG5cbiAgdGhpcy53cml0ZUJsb2NrID0gKHgsIHksIGJsb2NrLCBvdmVybGFwID0gZmFsc2UpID0+IHtcbiAgICBpZiAoIWJsb2NrKSB7IHJldHVybiB9XG4gICAgY29uc3QgbGluZXMgPSBibG9jay5zcGxpdCgvXFxyP1xcbi8pXG4gICAgbGV0IF95ID0geVxuICAgIGZvciAoY29uc3QgbGluZSBvZiBsaW5lcykge1xuICAgICAgbGV0IF94ID0geFxuICAgICAgZm9yIChjb25zdCB5IGluIGxpbmUpIHtcbiAgICAgICAgY29uc3QgZ2x5cGggPSBsaW5lW3ldXG4gICAgICAgIHRoaXMud3JpdGUoX3gsIF95LCBvdmVybGFwID09PSB0cnVlICYmIGdseXBoID09PSAnLicgPyB0aGlzLmdseXBoQXQoX3gsIF95KSA6IGdseXBoKVxuICAgICAgICBfeCsrXG4gICAgICB9XG4gICAgICBfeSsrXG4gICAgfVxuICB9XG5cbiAgLy8gTG9ja3NcblxuICB0aGlzLnJlbGVhc2UgPSBmdW5jdGlvbiAoKSB7XG4gICAgdGhpcy5sb2NrcyA9IG5ldyBBcnJheSh0aGlzLncgKiB0aGlzLmgpXG4gICAgdGhpcy52YXJpYWJsZXMgPSB7fVxuICB9XG5cbiAgdGhpcy51bmxvY2sgPSBmdW5jdGlvbiAoeCwgeSkge1xuICAgIHRoaXMubG9ja3NbdGhpcy5pbmRleEF0KHgsIHkpXSA9IG51bGxcbiAgfVxuXG4gIHRoaXMubG9jayA9IGZ1bmN0aW9uICh4LCB5KSB7XG4gICAgaWYgKHRoaXMubG9ja0F0KHgsIHkpKSB7IHJldHVybiB9XG4gICAgdGhpcy5sb2Nrc1t0aGlzLmluZGV4QXQoeCwgeSldID0gdHJ1ZVxuICB9XG5cbiAgLy8gSGVscGVyc1xuXG4gIHRoaXMuaW5Cb3VuZHMgPSBmdW5jdGlvbiAoeCwgeSkge1xuICAgIHJldHVybiBOdW1iZXIuaXNJbnRlZ2VyKHgpICYmIE51bWJlci5pc0ludGVnZXIoeSkgJiYgeCA+PSAwICYmIHggPCB0aGlzLncgJiYgeSA+PSAwICYmIHkgPCB0aGlzLmhcbiAgfVxuXG4gIHRoaXMuaXNBbGxvd2VkID0gZnVuY3Rpb24gKGcpIHtcbiAgICByZXR1cm4gZyA9PT0gJy4nIHx8ICEhbGlicmFyeVtgJHtnfWAudG9Mb3dlckNhc2UoKV1cbiAgfVxuXG4gIHRoaXMuaXNTcGVjaWFsID0gZnVuY3Rpb24gKGcpIHtcbiAgICByZXR1cm4gZy50b0xvd2VyQ2FzZSgpID09PSBnLnRvVXBwZXJDYXNlKCkgJiYgaXNOYU4oZylcbiAgfVxuXG4gIHRoaXMua2V5T2YgPSBmdW5jdGlvbiAodmFsLCB1YyA9IGZhbHNlKSB7XG4gICAgcmV0dXJuIHVjID09PSB0cnVlID8gdGhpcy5rZXlzW3ZhbCAlIDM2XS50b1VwcGVyQ2FzZSgpIDogdGhpcy5rZXlzW3ZhbCAlIDM2XVxuICB9XG5cbiAgdGhpcy52YWx1ZU9mID0gZnVuY3Rpb24gKGcpIHtcbiAgICByZXR1cm4gIWcgfHwgZyA9PT0gJy4nIHx8IGcgPT09ICcqJyA/IDAgOiB0aGlzLmtleXMuaW5kZXhPZihgJHtnfWAudG9Mb3dlckNhc2UoKSlcbiAgfVxuXG4gIHRoaXMuaW5kZXhBdCA9IGZ1bmN0aW9uICh4LCB5KSB7XG4gICAgcmV0dXJuIHRoaXMuaW5Cb3VuZHMoeCwgeSkgPT09IHRydWUgPyB4ICsgKHRoaXMudyAqIHkpIDogLTFcbiAgfVxuXG4gIHRoaXMub3BlcmF0b3JBdCA9IGZ1bmN0aW9uICh4LCB5KSB7XG4gICAgcmV0dXJuIHRoaXMucnVudGltZS5maWx0ZXIoKGl0ZW0pID0+IHsgcmV0dXJuIGl0ZW0ueCA9PT0geCAmJiBpdGVtLnkgPT09IHkgfSlbMF1cbiAgfVxuXG4gIHRoaXMucG9zQXQgPSBmdW5jdGlvbiAoaW5kZXgpIHtcbiAgICByZXR1cm4geyB4OiBpbmRleCAlIHRoaXMudywgeTogcGFyc2VJbnQoaW5kZXggLyB0aGlzLncpIH1cbiAgfVxuXG4gIHRoaXMuZ2x5cGhBdCA9IGZ1bmN0aW9uICh4LCB5KSB7XG4gICAgcmV0dXJuIHRoaXMucy5jaGFyQXQodGhpcy5pbmRleEF0KHgsIHkpKVxuICB9XG5cbiAgdGhpcy52YWx1ZUF0ID0gZnVuY3Rpb24gKHgsIHkpIHtcbiAgICByZXR1cm4gdGhpcy52YWx1ZU9mKHRoaXMuZ2x5cGhBdCh4LCB5KSlcbiAgfVxuXG4gIHRoaXMubG9ja0F0ID0gZnVuY3Rpb24gKHgsIHkpIHtcbiAgICByZXR1cm4gdGhpcy5sb2Nrc1t0aGlzLmluZGV4QXQoeCwgeSldID09PSB0cnVlXG4gIH1cblxuICB0aGlzLnZhbHVlSW4gPSBmdW5jdGlvbiAoa2V5KSB7XG4gICAgcmV0dXJuIHRoaXMudmFyaWFibGVzW2tleV0gfHwgJy4nXG4gIH1cblxuICAvLyBUb29sc1xuXG4gIHRoaXMuZm9ybWF0ID0gKCkgPT4ge1xuICAgIGNvbnN0IGEgPSBbXVxuICAgIGZvciAobGV0IHkgPSAwOyB5IDwgdGhpcy5oOyB5KyspIHtcbiAgICAgIGEucHVzaCh0aGlzLnMuc3Vic3RyKHkgKiB0aGlzLncsIHRoaXMudykpXG4gICAgfVxuICAgIHJldHVybiBhLnJlZHVjZSgoYWNjLCB2YWwpID0+IHtcbiAgICAgIHJldHVybiBgJHthY2N9JHt2YWx9XFxuYFxuICAgIH0sICcnKVxuICB9XG5cbiAgdGhpcy5sZW5ndGggPSAoKSA9PiB7XG4gICAgcmV0dXJuIHRoaXMuc3RyaXAoKS5sZW5ndGhcbiAgfVxuXG4gIHRoaXMuc3RyaXAgPSAoKSA9PiB7XG4gICAgcmV0dXJuIHRoaXMucy5yZXBsYWNlKC9bXmEtekEtWjAtOStdKy9naSwgJycpLnRyaW0oKVxuICB9XG5cbiAgdGhpcy50b1N0cmluZyA9ICgpID0+IHtcbiAgICByZXR1cm4gdGhpcy5mb3JtYXQoKS50cmltKClcbiAgfVxuXG4gIHRoaXMudG9SZWN0ID0gKHN0ciA9IHRoaXMucykgPT4ge1xuICAgIGNvbnN0IGxpbmVzID0gc3RyLnRyaW0oKS5zcGxpdCgvXFxyP1xcbi8pXG4gICAgcmV0dXJuIHsgeDogbGluZXNbMF0ubGVuZ3RoLCB5OiBsaW5lcy5sZW5ndGggfVxuICB9XG5cbiAgdGhpcy5yZXNldCgpXG59XG5cbi8qKiogRVhQT1JUUyBGUk9NIGV4cG9ydHMtbG9hZGVyICoqKi9cbmV4cG9ydCBkZWZhdWx0IE9yY2E7XG4iLCIndXNlIHN0cmljdCdcblxuY29uc3QgdHJhbnNwb3NlVGFibGUgPSB7XG4gIEE6ICdBMCcsXG4gIGE6ICdhMCcsXG4gIEI6ICdCMCcsXG4gIEM6ICdDMCcsXG4gIGM6ICdjMCcsXG4gIEQ6ICdEMCcsXG4gIGQ6ICdkMCcsXG4gIEU6ICdFMCcsXG4gIEY6ICdGMCcsXG4gIGY6ICdmMCcsXG4gIEc6ICdHMCcsXG4gIGc6ICdnMCcsXG4gIEg6ICdBMCcsXG4gIGg6ICdhMCcsXG4gIEk6ICdCMCcsXG4gIEo6ICdDMScsXG4gIGo6ICdjMScsXG4gIEs6ICdEMScsXG4gIGs6ICdkMScsXG4gIEw6ICdFMScsXG4gIE06ICdGMScsXG4gIG06ICdmMScsXG4gIE46ICdHMScsXG4gIG46ICdnMScsXG4gIE86ICdBMScsXG4gIG86ICdhMScsXG4gIFA6ICdCMScsXG4gIFE6ICdDMicsXG4gIHE6ICdjMicsXG4gIFI6ICdEMicsXG4gIHI6ICdkMicsXG4gIFM6ICdFMicsXG4gIFQ6ICdGMicsXG4gIHQ6ICdmMicsXG4gIFU6ICdHMicsXG4gIHU6ICdnMicsXG4gIFY6ICdBMicsXG4gIHY6ICdhMicsXG4gIFc6ICdCMicsXG4gIFg6ICdDMycsXG4gIHg6ICdjMycsXG4gIFk6ICdEMycsXG4gIHk6ICdkMycsXG4gIFo6ICdFMycsXG4gIC8vIENhdGNoIGVcbiAgZTogJ0YwJyxcbiAgbDogJ0YxJyxcbiAgczogJ0YyJyxcbiAgejogJ0YzJyxcbiAgLy8gQ2F0Y2ggYlxuICBiOiAnQzEnLFxuICBpOiAnQzEnLFxuICBwOiAnQzInLFxuICB3OiAnQzMnXG59XG5cbi8qKiogRVhQT1JUUyBGUk9NIGV4cG9ydHMtbG9hZGVyICoqKi9cbmV4cG9ydCBkZWZhdWx0IHRyYW5zcG9zZVRhYmxlO1xuIiwiaW1wb3J0IENsaWVudCBmcm9tIFwiLi9vcmNhL2Rlc2t0b3Avc291cmNlcy9zY3JpcHRzL2NsaWVudFwiO1xuXG5jb25zdCBjbGllbnQgPSAod2luZG93LmNsaWVudCA9IG5ldyBDbGllbnQoKSk7XG5cbmNsaWVudC5pbnN0YWxsKGRvY3VtZW50LmJvZHkpO1xuY2xpZW50LnN0YXJ0KCk7XG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHRpZihfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdKSB7XG5cdFx0cmV0dXJuIF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0uZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiLy8gc3RhcnR1cFxuLy8gTG9hZCBlbnRyeSBtb2R1bGVcbl9fd2VicGFja19yZXF1aXJlX18oXCIuL29yY2EuanNcIik7XG4vLyBUaGlzIGVudHJ5IG1vZHVsZSB1c2VkICdleHBvcnRzJyBzbyBpdCBjYW4ndCBiZSBpbmxpbmVkXG4iXSwic291cmNlUm9vdCI6IiJ9