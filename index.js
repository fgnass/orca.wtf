/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./orca.deps.js":
/*!**********************!*\
  !*** ./orca.deps.js ***!
  \**********************/
/*! unknown exports (runtime-defined) */
/*! runtime requirements: module */
/*! CommonJS bailout: module.exports is used directly at 8:0-14 */
/***/ ((module) => {

/**
 * Orca isn't built using ES modules but uses globals instead.
 * This file describes the exports/imports of each file so that
 * we can turn them into proper modules during the build process.
 *
 * The format of each entry is [file, export, ...imports]
 */
module.exports = [
  ["core/io/cc.js", "MidiCC"],
  ["core/io/midi.js", "Midi", "transposeTable"],
  ["core/io/mono.js", "Mono"],
  ["core/io/osc.js", "Osc"],
  ["core/io/udp.js", "Udp"],
  ["core/io.js", "IO", "Midi", "MidiCC", "Mono", "Udp", "Osc"],
  ["core/library.js", "library", "Operator"],
  ["core/operator.js", "Operator"],
  ["core/orca.js", "Orca"],
  ["core/transpose.js", "transposeTable"],
  ["lib/acels.js", "Acels"],
  ["lib/history.js", "History"],
  ["lib/source.js", "Source"],
  ["lib/theme.js", "Theme"],
  [
    "client.js",
    "Client",
    "library",
    "Acels",
    "Source",
    "History",
    "Orca",
    "IO",
    "Cursor",
    "Commander",
    "Clock",
    "Theme",
  ],
  ["clock.js", "Clock"],
  ["commander.js", "Commander"],
  ["cursor.js", "Cursor"],
];


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
(() => {
/*!******************!*\
  !*** ./index.js ***!
  \******************/
/*! unknown exports (runtime-defined) */
/*! runtime requirements: __webpack_require__ */
const orcaDeps = __webpack_require__(/*! ./orca.deps */ "./orca.deps.js");



})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9vcmNhLnd0Zi8uL29yY2EuZGVwcy5qcyIsIndlYnBhY2s6Ly9vcmNhLnd0Zi93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9vcmNhLnd0Zi8uL2luZGV4LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7OztBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7O1VDdkNBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBOztVQUVBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBOzs7Ozs7Ozs7QUNyQkEsaUJBQWlCLG1CQUFPLENBQUMsbUNBQWEiLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIE9yY2EgaXNuJ3QgYnVpbHQgdXNpbmcgRVMgbW9kdWxlcyBidXQgdXNlcyBnbG9iYWxzIGluc3RlYWQuXG4gKiBUaGlzIGZpbGUgZGVzY3JpYmVzIHRoZSBleHBvcnRzL2ltcG9ydHMgb2YgZWFjaCBmaWxlIHNvIHRoYXRcbiAqIHdlIGNhbiB0dXJuIHRoZW0gaW50byBwcm9wZXIgbW9kdWxlcyBkdXJpbmcgdGhlIGJ1aWxkIHByb2Nlc3MuXG4gKlxuICogVGhlIGZvcm1hdCBvZiBlYWNoIGVudHJ5IGlzIFtmaWxlLCBleHBvcnQsIC4uLmltcG9ydHNdXG4gKi9cbm1vZHVsZS5leHBvcnRzID0gW1xuICBbXCJjb3JlL2lvL2NjLmpzXCIsIFwiTWlkaUNDXCJdLFxuICBbXCJjb3JlL2lvL21pZGkuanNcIiwgXCJNaWRpXCIsIFwidHJhbnNwb3NlVGFibGVcIl0sXG4gIFtcImNvcmUvaW8vbW9uby5qc1wiLCBcIk1vbm9cIl0sXG4gIFtcImNvcmUvaW8vb3NjLmpzXCIsIFwiT3NjXCJdLFxuICBbXCJjb3JlL2lvL3VkcC5qc1wiLCBcIlVkcFwiXSxcbiAgW1wiY29yZS9pby5qc1wiLCBcIklPXCIsIFwiTWlkaVwiLCBcIk1pZGlDQ1wiLCBcIk1vbm9cIiwgXCJVZHBcIiwgXCJPc2NcIl0sXG4gIFtcImNvcmUvbGlicmFyeS5qc1wiLCBcImxpYnJhcnlcIiwgXCJPcGVyYXRvclwiXSxcbiAgW1wiY29yZS9vcGVyYXRvci5qc1wiLCBcIk9wZXJhdG9yXCJdLFxuICBbXCJjb3JlL29yY2EuanNcIiwgXCJPcmNhXCJdLFxuICBbXCJjb3JlL3RyYW5zcG9zZS5qc1wiLCBcInRyYW5zcG9zZVRhYmxlXCJdLFxuICBbXCJsaWIvYWNlbHMuanNcIiwgXCJBY2Vsc1wiXSxcbiAgW1wibGliL2hpc3RvcnkuanNcIiwgXCJIaXN0b3J5XCJdLFxuICBbXCJsaWIvc291cmNlLmpzXCIsIFwiU291cmNlXCJdLFxuICBbXCJsaWIvdGhlbWUuanNcIiwgXCJUaGVtZVwiXSxcbiAgW1xuICAgIFwiY2xpZW50LmpzXCIsXG4gICAgXCJDbGllbnRcIixcbiAgICBcImxpYnJhcnlcIixcbiAgICBcIkFjZWxzXCIsXG4gICAgXCJTb3VyY2VcIixcbiAgICBcIkhpc3RvcnlcIixcbiAgICBcIk9yY2FcIixcbiAgICBcIklPXCIsXG4gICAgXCJDdXJzb3JcIixcbiAgICBcIkNvbW1hbmRlclwiLFxuICAgIFwiQ2xvY2tcIixcbiAgICBcIlRoZW1lXCIsXG4gIF0sXG4gIFtcImNsb2NrLmpzXCIsIFwiQ2xvY2tcIl0sXG4gIFtcImNvbW1hbmRlci5qc1wiLCBcIkNvbW1hbmRlclwiXSxcbiAgW1wiY3Vyc29yLmpzXCIsIFwiQ3Vyc29yXCJdLFxuXTtcbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdGlmKF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0pIHtcblx0XHRyZXR1cm4gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiY29uc3Qgb3JjYURlcHMgPSByZXF1aXJlKFwiLi9vcmNhLmRlcHNcIik7XG5cblxuIl0sInNvdXJjZVJvb3QiOiIifQ==