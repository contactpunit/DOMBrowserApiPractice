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
/******/ 	__webpack_require__.p = "assets/scripts/";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/app.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/App/Component.js":
/*!******************************!*\
  !*** ./src/App/Component.js ***!
  \******************************/
/*! exports provided: Component */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"Component\", function() { return Component; });\nclass Component {\n    constructor(hostElementId, insertBefore = false) {\n        if (hostElementId) {\n            this.hostElement = document.getElementById(hostElementId);\n        } else {\n            this.hostElement = document.body;\n        }\n        this.insertBefore = insertBefore;\n    }\n\n    detach() {\n        if (this.element) {\n            this.element.remove();\n        }\n    }\n\n    attach() {\n        this.hostElement.insertAdjacentElement(this.insertBefore\n            ? 'afterbegin'\n            : 'beforeend',\n        this.element\n        );\n    }\n}\n\n//# sourceURL=webpack:///./src/App/Component.js?");

/***/ }),

/***/ "./src/App/ProjectItem.js":
/*!********************************!*\
  !*** ./src/App/ProjectItem.js ***!
  \********************************/
/*! exports provided: ProjectItem */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"ProjectItem\", function() { return ProjectItem; });\n/* harmony import */ var _Utils_DomHelper__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Utils/DomHelper */ \"./src/Utils/DomHelper.js\");\n/* harmony import */ var _ToolTip__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ToolTip */ \"./src/App/ToolTip.js\");\n\n\n\nclass ProjectItem {\n    constructor(id, updateProjectListFunction, type) {\n        this.id = id;\n        this.updateProjectListHandler = updateProjectListFunction;\n        this.connectMoreInfoButton();\n        this.connectSwitchButton(type);\n        this.connectDrag();\n        this.hasActiveTooltip = false;\n    }\n\n    showMoreInfoHandler() {\n        if (this.hasActiveTooltip) {\n            return;\n        }\n        const projectElement = document.getElementById(this.id);\n        const toolTipText = projectElement.dataset.extraInfo;\n        const tooltip = new _ToolTip__WEBPACK_IMPORTED_MODULE_1__[\"Tooltip\"](() => {\n            this.hasActiveTooltip = false;\n        },\n        toolTipText,\n        this.id);\n        tooltip.attach();\n        this.hasActiveTooltip = true\n    }\n\n    connectDrag() {\n        document.getElementById(this.id).addEventListener('dragstart',\n            (event) => {\n                event.dataTransfer.setData('text/plain',\n                    this.id);\n                event.dataTransfer.effectAllowed = 'move';\n            })\n    }\n\n    connectMoreInfoButton() {\n        const projItemElement = document.getElementById(this.id);\n        const moreInfoBtn = projItemElement.\n            querySelector('button:first-of-type');\n        moreInfoBtn.addEventListener('click',\n            this.showMoreInfoHandler.bind(this))\n    }\n\n    connectSwitchButton(type) {\n        const projItemElement = document.getElementById(this.id);\n        let switchButton = projItemElement.querySelector('button:last-of-type');\n        switchButton = _Utils_DomHelper__WEBPACK_IMPORTED_MODULE_0__[\"DomHelper\"].clearEventListeners(switchButton);\n        switchButton.textContent = type === 'active'\n            ? 'Finish'\n            : 'Activate';\n        switchButton.addEventListener('click',\n            this.updateProjectListHandler.bind(null,\n                this.id));\n    }\n\n    update(updateProjectFunc, type) {\n        this.updateProjectListHandler = updateProjectFunc;\n        this.connectSwitchButton(type);\n\n    }\n}\n\n//# sourceURL=webpack:///./src/App/ProjectItem.js?");

/***/ }),

/***/ "./src/App/ProjectList.js":
/*!********************************!*\
  !*** ./src/App/ProjectList.js ***!
  \********************************/
/*! exports provided: ProjectList */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"ProjectList\", function() { return ProjectList; });\n/* harmony import */ var _Utils_DomHelper__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Utils/DomHelper */ \"./src/Utils/DomHelper.js\");\n/* harmony import */ var _ProjectItem__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ProjectItem */ \"./src/App/ProjectItem.js\");\n\n\n\nclass ProjectList {\n    constructor(type) {\n        this.projects = []\n        this.type = type;\n        const prjItems = document.querySelectorAll(`#${type}-projects li`);\n        for (const projItem of prjItems) {\n            this.projects.push(new _ProjectItem__WEBPACK_IMPORTED_MODULE_1__[\"ProjectItem\"](\n                projItem.id,\n                this.switchProject.bind(this),\n                type));\n        }\n        this.connectDroppable();\n    }\n\n    connectDroppable() {\n        const list = document.querySelector(`#${this.type}-projects ul`);\n        list.addEventListener('dragover',\n            (event) => {\n                if (event.dataTransfer.types[0] === 'text/plain') {\n                    event.preventDefault();\n                }\n            });\n        list.addEventListener('dragenter',\n            (event) => {\n                if (event.dataTransfer.types[0] === 'text/plain') {\n                    list.parentElement.classList.add('droppable');\n                    event.preventDefault();\n                }\n            });\n\n        list.addEventListener('dragleave',\n            (event) => {\n                if (event.relatedTarget.closest(\n                    `#${this.type}-projects ul`) !== list) {\n                    list.parentElement.classList.remove('droppable');\n                }\n            });\n\n        list.addEventListener('drop',\n            (event) => {\n                const prjId = event.dataTransfer.getData('text/plain');\n                if (this.projects.find((fid) => fid.id === prjId)) {\n                    return;\n                }\n                document.\n                    getElementById(prjId).\n                    querySelector('button:last-of-type').\n                    click();\n                list.parentElement.classList.remove('droppable');\n                event.preventDefault();\n            })\n    }\n\n    switchProject(projId) {\n        this.switchHandler(this.projects.find((pj) => pj.id === projId));\n        this.projects = this.projects.filter((pj) => pj.id !== projId);\n    }\n\n    setSwitchHandlerFunction(switchHandlerFunction) {\n        this.switchHandler = switchHandlerFunction;\n    }\n\n    addProject(project) {\n        this.projects.push(project);\n        _Utils_DomHelper__WEBPACK_IMPORTED_MODULE_0__[\"DomHelper\"].moveElement(project.id,\n            `#${this.type}-projects ul`);\n        project.update(this.switchProject.bind(this),\n            this.type);\n    }\n}\n\n//# sourceURL=webpack:///./src/App/ProjectList.js?");

/***/ }),

/***/ "./src/App/ToolTip.js":
/*!****************************!*\
  !*** ./src/App/ToolTip.js ***!
  \****************************/
/*! exports provided: Tooltip */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"Tooltip\", function() { return Tooltip; });\n/* harmony import */ var _Component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Component */ \"./src/App/Component.js\");\n\n\nclass Tooltip extends _Component__WEBPACK_IMPORTED_MODULE_0__[\"Component\"] {\n    constructor(closeNotfierFn, toolTipText, hostElementId) {\n        super(hostElementId);\n        this.closeNotifier = closeNotfierFn;\n        this.text = toolTipText;\n        this.closeTooltip = () => {\n            this.detach();\n            this.closeNotifier();\n        };\n        this.create();\n    }\n\n    create() {\n        const tooltipElement = document.createElement('div');\n        tooltipElement.className = 'card';\n        const tooltipTemplate = document.getElementById('tooltip');\n        const tooltipBody = document.importNode(tooltipTemplate.content,\n            true);\n        tooltipBody.querySelector('p').textContent = this.text;\n        tooltipElement.append(tooltipBody);\n\n        const hostElPosLeft = this.hostElement.offsetLeft;\n        const hostElPosTop = this.hostElement.offsetTop;\n        const hostElHeight = this.hostElement.clientHeight;\n        const parentElScrolling = this.hostElement.parentElement.scrollTop;\n\n        const x = hostElPosLeft + 20;\n        const y = hostElPosTop + hostElHeight - parentElScrolling - 10;\n        tooltipElement.style.position = 'absolute';\n        tooltipElement.style.left = `${x} + px`;\n        tooltipElement.style.top = `${y} + px`;\n\n        tooltipElement.addEventListener('click',\n            this.closeToolTip);\n        this.element = tooltipElement;\n    }\n}\n\n//# sourceURL=webpack:///./src/App/ToolTip.js?");

/***/ }),

/***/ "./src/Utils/DomHelper.js":
/*!********************************!*\
  !*** ./src/Utils/DomHelper.js ***!
  \********************************/
/*! exports provided: DomHelper */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"DomHelper\", function() { return DomHelper; });\nclass DomHelper {\n    static clearEventListeners(element) {\n        const clonedElement = element.cloneNode(true);\n        element.replaceWith(clonedElement);\n\n        return clonedElement;\n    }\n\n    static moveElement(elementId, newDestinationSelector) {\n        const element = document.getElementById(elementId);\n        const destinationElement = document.querySelector(\n            newDestinationSelector);\n        destinationElement.append(element);\n        element.scrollIntoView({ behavior: 'smooth' });\n    }\n}\n\n//# sourceURL=webpack:///./src/Utils/DomHelper.js?");

/***/ }),

/***/ "./src/app.js":
/*!********************!*\
  !*** ./src/app.js ***!
  \********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _App_ProjectList__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./App/ProjectList */ \"./src/App/ProjectList.js\");\n\n\nclass App {\n    static init() {\n        const activeProjectList = new _App_ProjectList__WEBPACK_IMPORTED_MODULE_0__[\"ProjectList\"]('active');\n        const finishedProjectList = new _App_ProjectList__WEBPACK_IMPORTED_MODULE_0__[\"ProjectList\"]('finished');\n        activeProjectList.setSwitchHandlerFunction(\n            finishedProjectList.addProject.bind(finishedProjectList)\n        );\n        finishedProjectList.setSwitchHandlerFunction(\n            activeProjectList.addProject.bind(activeProjectList)\n        );\n\n    }\n}\n\nApp.init();\n\n//# sourceURL=webpack:///./src/app.js?");

/***/ })

/******/ });