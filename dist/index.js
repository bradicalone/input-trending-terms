"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _wrapNativeSuper(Class) { var _cache = typeof Map === "function" ? new Map() : undefined; _wrapNativeSuper = function _wrapNativeSuper(Class) { if (Class === null || !_isNativeFunction(Class)) return Class; if (typeof Class !== "function") { throw new TypeError("Super expression must either be null or a function"); } if (typeof _cache !== "undefined") { if (_cache.has(Class)) return _cache.get(Class); _cache.set(Class, Wrapper); } function Wrapper() { return _construct(Class, arguments, _getPrototypeOf(this).constructor); } Wrapper.prototype = Object.create(Class.prototype, { constructor: { value: Wrapper, enumerable: false, writable: true, configurable: true } }); return _setPrototypeOf(Wrapper, Class); }; return _wrapNativeSuper(Class); }

function _construct(Parent, args, Class) { if (_isNativeReflectConstruct()) { _construct = Reflect.construct.bind(); } else { _construct = function _construct(Parent, args, Class) { var a = [null]; a.push.apply(a, args); var Constructor = Function.bind.apply(Parent, a); var instance = new Constructor(); if (Class) _setPrototypeOf(instance, Class.prototype); return instance; }; } return _construct.apply(null, arguments); }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _isNativeFunction(fn) { return Function.toString.call(fn).indexOf("[native code]") !== -1; }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

/**
* @param {Object} data Information about the loader.
* @param {String} data.containerId The element id of the loader cirlces is going to be in
* @param {number} data.count how many rotated circles.
* @param {String} data.hasElText class name if there is a element with text
* @param {String} data.textElId class name of element if <hasElText> is true
*/
function inputRotate() {
  var buttonsContainer = document.querySelector('.rotate_controls');
  var slogans = Array.from(document.querySelectorAll('.c_input-wrap span'));
  var components = document.querySelectorAll('.c_input-wrap, .rotate_controls');
  var startPos = slogans.length - 1;
  var intervalID, hiddenElement;
  var dist = 0;
  var duration = 1000;
  var rotation = 0;

  var rotate = function rotate() {
    slogans[startPos].style.transition = 'transform .8s ease-out';
    slogans[startPos].style.transform = "translateY(".concat(dist, "%)"); // Previous element

    if (dist == 100) {
      slogans[startPos - 1].style.transition = 'transform .8s ease-out';
      slogans[startPos - 1].style.transform = "translateY(".concat(dist - 100, "%)");
    } // When transformed below add element to begining of array


    if (dist === 200) {
      var lastItem = slogans.pop();
      lastItem.style.transition = 'none';
      lastItem.style.transform = null;
      slogans.unshift(lastItem);
      dist = 0;
    }

    dist += 100;
    rotation++;
  };

  var init = function init() {
    rotate();
    return function () {
      return intervalID = setInterval(function () {
        if (rotation++ >= 3) rotate();
      }, duration);
    };
  };

  var startRotate = init();
  startRotate();

  buttonsContainer.onclick = function (e) {
    var id = e.target.id;

    if (id == 'c_input-pause') {
      clearInterval(intervalID);
      e.target.style.display = 'none';
      if (hiddenElement) hiddenElement.style.display = 'block';
      return hiddenElement = e.target;
    }

    startRotate();
    console.log(hiddenElement);
    e.target.style.display = 'none';
    hiddenElement.style.display = 'block';
    hiddenElement = e.target;
  };

  document.getElementsByClassName('c_input')[0].onclick = function (e) {
    console.log('e:', e.target);
    components[0].style.display = 'none';
    components[1].style.display = 'none';
    clearInterval(intervalID);
  };
} // inputRotate()


var InputRotate = /*#__PURE__*/function (_HTMLElement) {
  _inherits(InputRotate, _HTMLElement);

  var _super = _createSuper(InputRotate);

  function InputRotate() {
    var _this;

    _classCallCheck(this, InputRotate);

    _this = _super.call(this);
    _this.buttonsContainer = _this.querySelector('.rotate_controls');
    _this.slogans = Array.from(_this.querySelectorAll('.c_input-wrap span'));
    _this.components = _this.querySelectorAll('.c_input-wrap, .rotate_controls');
    _this.startPos = _this.slogans.length - 1;
    if (!_this.startPos) return _possibleConstructorReturn(_this, console.log('Need at least two items'));
    _this.intervalID = 0;
    _this.hiddenElement = null;
    _this.dist = 0;
    _this.duration = 1000;
    _this.rotation = 0;

    _this.buttonsContainer.onclick = function (e) {
      var id = e.target.id;

      if (id == 'c_input-pause') {
        clearInterval(_this.intervalID);
        e.target.style.display = 'none';
        if (_this.hiddenElement) _this.hiddenElement.style.display = 'block';
        return _this.hiddenElement = e.target;
      }

      _this.startRotate();

      console.log(_this.hiddenElement);
      e.target.style.display = 'none';
      _this.hiddenElement.style.display = 'block';
      _this.hiddenElement = e.target;
    };

    _this.getElementsByClassName('c_input')[0].onclick = function (e) {
      console.log('e:', e.target);
      _this.components[0].style.display = 'none';
      _this.components[1].style.display = 'none';

      _this.clearInterval(_this.intervalID);
    };

    _this.startRotate = _this.init();

    _this.startRotate();

    return _this;
  }

  _createClass(InputRotate, [{
    key: "rotate",
    value: function rotate() {
      var slogans = this.slogans;
      var startPos = this.startPos;
      console.log('startPos :', startPos);
      slogans[startPos].style.transition = 'transform .8s ease-out';
      slogans[startPos].style.transform = "translateY(".concat(this.dist, "%)"); // Previous element

      if (this.dist == 100) {
        slogans[startPos - 1].style.transition = 'transform .8s ease-out';
        slogans[startPos - 1].style.transform = "translateY(".concat(this.dist - 100, "%)");
      } // When transformed below add element to begining of array


      if (this.dist === 200) {
        var lastItem = slogans.pop();
        lastItem.style.transition = 'none';
        lastItem.style.transform = null;
        slogans.unshift(lastItem);
        this.dist = 0;
      }

      this.dist += 100;
      this.rotation++;
    }
  }, {
    key: "init",
    value: function init() {
      var _this2 = this;

      this.rotate();
      return function () {
        return _this2.intervalID = setInterval(function () {
          if (_this2.rotation++ >= 3) _this2.rotate();
        }, _this2.duration);
      };
    }
  }]);

  return InputRotate;
}( /*#__PURE__*/_wrapNativeSuper(HTMLElement));

customElements.define('input-rotate', InputRotate);
