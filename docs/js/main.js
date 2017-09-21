(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
/**
 * You don't need to edit this file.
 */

"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var AppController = function () {
  _createClass(AppController, null, [{
    key: "page",
    get: function get() {
      throw new TypeError("static getter method 'page' is not implemented");
    }
  }]);

  function AppController() {
    _classCallCheck(this, AppController);
  }

  return AppController;
}();

exports.default = AppController;

},{}],2:[function(require,module,exports){
/**
 * Page script dispatcher.
 *
 * In case you created new page script, add each of the following lines
 * to this file.
 *
 * + import <name> from "./pages/XXXX.part";
 *   ...
 *   const klass_list = [
 *     ...
 * +   <name>,
 *   ];
 */

"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _index = require("./pages/index.part");

var _index2 = _interopRequireDefault(_index);

var _dev = require("./pages/dev.part");

var _dev2 = _interopRequireDefault(_dev);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Dispatcher = function () {
  function Dispatcher() {
    _classCallCheck(this, Dispatcher);

    var main_content = document.getElementById("main");
    this.current_page = main_content.dataset.page;

    var klass_list = [_index2.default, _dev2.default];

    this.dispatchAll(klass_list);
  }

  _createClass(Dispatcher, [{
    key: "dispatchAll",
    value: function dispatchAll(klass_list) {
      var _this = this;

      klass_list.map(function (klass) {
        return _this.dispatch(klass);
      });
    }
  }, {
    key: "dispatch",
    value: function dispatch(klass) {
      if (this.current_page === klass.page) new klass();
    }
  }]);

  return Dispatcher;
}();

exports.default = Dispatcher;

},{"./pages/dev.part":4,"./pages/index.part":5}],3:[function(require,module,exports){
'use strict';

var _Dispatcher = require('./Dispatcher');

var _Dispatcher2 = _interopRequireDefault(_Dispatcher);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

$(function () {
  new _Dispatcher2.default();
}); // global $, jQuery

},{"./Dispatcher":2}],4:[function(require,module,exports){
/**
 * global $, jQuery
 */
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _AppController2 = require("../AppController");

var _AppController3 = _interopRequireDefault(_AppController2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var DevController = function (_AppController) {
  _inherits(DevController, _AppController);

  _createClass(DevController, null, [{
    key: "page",
    get: function get() {
      return "dev";
    }
  }]);

  function DevController() {
    _classCallCheck(this, DevController);

    var _this = _possibleConstructorReturn(this, (DevController.__proto__ || Object.getPrototypeOf(DevController)).call(this));

    _this.sidebarLogo = $(".sidebar-logo > img");
    _this.sidebarMenu = $(".sidebar-menu ul.nav > li");
    _this.sidebarToggle = $(".sidebar-toggle");
    _this.mainDiv = $("#main");

    _this.setMenuAnime();
    _this.setMenuToggleEvent();

    _this.sidebarLogo.on("click", function (e) {
      window.location = "../../";
    });

    $("#content-area").niceScroll();
    return _this;
  }

  _createClass(DevController, [{
    key: "setMenuAnime",
    value: function setMenuAnime() {
      var _this2 = this;

      var handleMenuEvent = function handleMenuEvent(page, cssClass) {
        var menu = _this2.sidebarMenu.find("a[data-page='" + page + "']");
        menu.on("mouseenter", function (e) {
          return _this2.sidebarLogo.addClass(cssClass);
        });
        menu.on("mouseleave", function (e) {
          return _this2.sidebarLogo.removeClass(cssClass);
        });
      };

      handleMenuEvent("overview", "rotate72");
      handleMenuEvent("code_html", "rotate144");
      handleMenuEvent("code_style", "rotate216");
      handleMenuEvent("code_js", "rotate288");
      handleMenuEvent("misc", "rotate");
    }
  }, {
    key: "setMenuToggleEvent",
    value: function setMenuToggleEvent() {
      this.sidebarToggle.on("click", function (e) {
        $("#sidebar-area").toggleClass("expand");
      });
    }
  }]);

  return DevController;
}(_AppController3.default);

exports.default = DevController;

},{"../AppController":1}],5:[function(require,module,exports){
// global $, jQuery
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _AppController2 = require("../AppController");

var _AppController3 = _interopRequireDefault(_AppController2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var IndexController = function (_AppController) {
  _inherits(IndexController, _AppController);

  _createClass(IndexController, null, [{
    key: "page",
    get: function get() {
      return "index";
    }
  }]);

  function IndexController() {
    _classCallCheck(this, IndexController);

    var _this = _possibleConstructorReturn(this, (IndexController.__proto__ || Object.getPrototypeOf(IndexController)).call(this));

    _this.initialize();
    return _this;
  }

  _createClass(IndexController, [{
    key: "initialize",
    value: function initialize() {
      var _this2 = this;

      var btn_install = $("#install");
      var btn_init = $("#init");
      var btn_dev = $("#develop");

      btn_install.on("click", function (e) {
        var template = $(".templates .install").wrap("<div/>").parent().html();
        _this2.popUp(template);
      });

      btn_init.on("click", function (e) {
        var template = $(".templates .init").wrap("<div/>").parent().html();
        _this2.popUp(template);
      });

      btn_dev.on("click", function (e) {
        var template = $(".templates .develop").wrap("<div/>").parent().html();
        _this2.popUp(template);
      });
    }
  }, {
    key: "popUp",
    value: function popUp(template) {
      var layer = $("<div>");
      layer.addClass("layer");
      $("body #main").append(layer);

      var popup = $(".popup");
      layer.addClass("dark");

      setTimeout(function () {
        popup.removeClass("hidden");
        popup.append(template);
        popup.find(".template").niceScroll();
      }, 0);

      layer.on("click", function (e) {
        popup.addClass("hidden");
        layer.removeClass("dark");
        setTimeout(function () {
          popup.empty();
          layer.remove();
        }, 0);
      });
    }
  }]);

  return IndexController;
}(_AppController3.default);

exports.default = IndexController;

},{"../AppController":1}]},{},[3])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJwbGF5Z3JvdW5kL3NyYy9qcy9BcHBDb250cm9sbGVyLmpzIiwicGxheWdyb3VuZC9zcmMvanMvRGlzcGF0Y2hlci5qcyIsInBsYXlncm91bmQvc3JjL2pzL21haW4uanMiLCJwbGF5Z3JvdW5kL3NyYy9qcy9wYWdlcy9kZXYucGFydC5qcyIsInBsYXlncm91bmQvc3JjL2pzL3BhZ2VzL2luZGV4LnBhcnQuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNBQTs7OztBQUlBOzs7Ozs7Ozs7O0lBRXFCLGE7Ozt3QkFDRjtBQUNmLFlBQU0sSUFBSSxTQUFKLENBQWMsZ0RBQWQsQ0FBTjtBQUNEOzs7QUFFRCwyQkFBYTtBQUFBO0FBQUU7Ozs7O2tCQUxJLGE7OztBQ05yQjs7Ozs7Ozs7Ozs7Ozs7QUFjQTs7Ozs7Ozs7QUFFQTs7OztBQUNBOzs7Ozs7OztJQUVNLFU7QUFDSix3QkFBYTtBQUFBOztBQUNYLFFBQU0sZUFBZSxTQUFTLGNBQVQsQ0FBd0IsTUFBeEIsQ0FBckI7QUFDQSxTQUFLLFlBQUwsR0FBb0IsYUFBYSxPQUFiLENBQXFCLElBQXpDOztBQUVBLFFBQU0sYUFBYSxnQ0FBbkI7O0FBS0EsU0FBSyxXQUFMLENBQWlCLFVBQWpCO0FBQ0Q7Ozs7Z0NBRVcsVSxFQUFXO0FBQUE7O0FBQ3JCLGlCQUFXLEdBQVgsQ0FBZSxVQUFDLEtBQUQ7QUFBQSxlQUFXLE1BQUssUUFBTCxDQUFjLEtBQWQsQ0FBWDtBQUFBLE9BQWY7QUFDRDs7OzZCQUVRLEssRUFBTTtBQUNiLFVBQUcsS0FBSyxZQUFMLEtBQXNCLE1BQU0sSUFBL0IsRUFBcUMsSUFBSSxLQUFKO0FBQ3RDOzs7Ozs7a0JBR1ksVTs7Ozs7QUN4Q2Y7Ozs7OztBQUVBLEVBQUUsWUFBTTtBQUNOO0FBQ0QsQ0FGRCxFLENBSEE7OztBQ0FBOzs7QUFHQTs7Ozs7Ozs7QUFFQTs7Ozs7Ozs7Ozs7O0lBRXFCLGE7Ozs7O3dCQUNE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QUFDQSxRQUFFLFlBQUYsRUFBZ0IsTUFBaEIsQ0FBdUIsS0FBdkI7O0FBRUEsVUFBTSxRQUFRLEVBQUUsUUFBRixDQUFkO0FBQ0EsWUFBTSxRQUFOLENBQWUsTUFBZjs7QUFFQSxpQkFBVyxZQUFJO0FBQ2IsY0FBTSxXQUFOLENBQWtCLFFBQWxCO0FBQ0EsY0FBTSxNQUFOLENBQWEsUUFBYjtBQUNBLGNBQU0sSUFBTixDQUFXLFdBQVgsRUFBd0IsVUFBeEI7QUFDRCxPQUpELEVBSUcsQ0FKSDs7QUFNQSxZQUFNLEVBQU4sQ0FBUyxPQUFULEVBQWtCLFVBQUMsQ0FBRCxFQUFLO0FBQ3JCLGNBQU0sUUFBTixDQUFlLFFBQWY7QUFDQSxjQUFNLFdBQU4sQ0FBa0IsTUFBbEI7QUFDQSxtQkFBVyxZQUFNO0FBQ2YsZ0JBQU0sS0FBTjtBQUNBLGdCQUFNLE1BQU47QUFDRCxTQUhELEVBR0csQ0FISDtBQUlELE9BUEQ7QUFRRDs7Ozs7O2tCQXJEa0IsZSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCIvKipcbiAqIFlvdSBkb24ndCBuZWVkIHRvIGVkaXQgdGhpcyBmaWxlLlxuICovXG5cblwidXNlIHN0cmljdFwiO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBBcHBDb250cm9sbGVyIHtcbiAgc3RhdGljIGdldCBwYWdlKCl7XG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcihcInN0YXRpYyBnZXR0ZXIgbWV0aG9kICdwYWdlJyBpcyBub3QgaW1wbGVtZW50ZWRcIik7XG4gIH1cbiAgXG4gIGNvbnN0cnVjdG9yKCl7fVxufVxuIiwiLyoqXG4gKiBQYWdlIHNjcmlwdCBkaXNwYXRjaGVyLlxuICpcbiAqIEluIGNhc2UgeW91IGNyZWF0ZWQgbmV3IHBhZ2Ugc2NyaXB0LCBhZGQgZWFjaCBvZiB0aGUgZm9sbG93aW5nIGxpbmVzXG4gKiB0byB0aGlzIGZpbGUuXG4gKlxuICogKyBpbXBvcnQgPG5hbWU+IGZyb20gXCIuL3BhZ2VzL1hYWFgucGFydFwiO1xuICogICAuLi5cbiAqICAgY29uc3Qga2xhc3NfbGlzdCA9IFtcbiAqICAgICAuLi5cbiAqICsgICA8bmFtZT4sXG4gKiAgIF07XG4gKi9cblxuXCJ1c2Ugc3RyaWN0XCI7XG5cbmltcG9ydCBpbmRleCBmcm9tIFwiLi9wYWdlcy9pbmRleC5wYXJ0XCI7XG5pbXBvcnQgZGV2IGZyb20gXCIuL3BhZ2VzL2Rldi5wYXJ0XCI7XG5cbmNsYXNzIERpc3BhdGNoZXIge1xuICBjb25zdHJ1Y3Rvcigpe1xuICAgIGNvbnN0IG1haW5fY29udGVudCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwibWFpblwiKTtcbiAgICB0aGlzLmN1cnJlbnRfcGFnZSA9IG1haW5fY29udGVudC5kYXRhc2V0LnBhZ2U7XG4gIFxuICAgIGNvbnN0IGtsYXNzX2xpc3QgPSBbXG4gICAgICBpbmRleCxcbiAgICAgIGRldixcbiAgICBdO1xuICAgIFxuICAgIHRoaXMuZGlzcGF0Y2hBbGwoa2xhc3NfbGlzdCk7XG4gIH1cbiAgXG4gIGRpc3BhdGNoQWxsKGtsYXNzX2xpc3Qpe1xuICAgIGtsYXNzX2xpc3QubWFwKChrbGFzcykgPT4gdGhpcy5kaXNwYXRjaChrbGFzcykpO1xuICB9XG4gIFxuICBkaXNwYXRjaChrbGFzcyl7XG4gICAgaWYodGhpcy5jdXJyZW50X3BhZ2UgPT09IGtsYXNzLnBhZ2UpIG5ldyBrbGFzcygpO1xuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IERpc3BhdGNoZXI7XG4iLCIvLyBnbG9iYWwgJCwgalF1ZXJ5XG5pbXBvcnQgRGlzcGF0Y2hlciBmcm9tICcuL0Rpc3BhdGNoZXInO1xuXG4kKCgpID0+IHtcbiAgbmV3IERpc3BhdGNoZXIoKTtcbn0pO1xuIiwiLyoqXG4gKiBnbG9iYWwgJCwgalF1ZXJ5XG4gKi9cblwidXNlIHN0cmljdFwiO1xuXG5pbXBvcnQgQXBwQ29udHJvbGxlciBmcm9tIFwiLi4vQXBwQ29udHJvbGxlclwiO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBEZXZDb250cm9sbGVyIGV4dGVuZHMgQXBwQ29udHJvbGxlciB7XG4gIHN0YXRpYyBnZXQgcGFnZSgpIHtcbiAgICByZXR1cm4gXCJkZXZcIjtcbiAgfVxuICBcbiAgY29uc3RydWN0b3IoKXtcbiAgICBzdXBlcigpO1xuICAgIFxuICAgIHRoaXMuc2lkZWJhckxvZ28gPSAkKFwiLnNpZGViYXItbG9nbyA+IGltZ1wiKTtcbiAgICB0aGlzLnNpZGViYXJNZW51ID0gJChcIi5zaWRlYmFyLW1lbnUgdWwubmF2ID4gbGlcIik7XG4gICAgdGhpcy5zaWRlYmFyVG9nZ2xlID0gJChcIi5zaWRlYmFyLXRvZ2dsZVwiKTtcbiAgICB0aGlzLm1haW5EaXYgPSAkKFwiI21haW5cIik7XG4gICAgXG4gICAgdGhpcy5zZXRNZW51QW5pbWUoKTtcbiAgICB0aGlzLnNldE1lbnVUb2dnbGVFdmVudCgpO1xuICAgIFxuICAgIHRoaXMuc2lkZWJhckxvZ28ub24oXCJjbGlja1wiLCAoZSkgPT4ge1xuICAgICAgd2luZG93LmxvY2F0aW9uID0gXCIuLi8uLi9cIjtcbiAgICB9KTtcbiAgICBcbiAgICAkKFwiI2NvbnRlbnQtYXJlYVwiKS5uaWNlU2Nyb2xsKCk7XG4gIH1cbiAgXG4gIHNldE1lbnVBbmltZSgpe1xuICAgIGNvbnN0IGhhbmRsZU1lbnVFdmVudCA9IChwYWdlLCBjc3NDbGFzcykgPT4ge1xuICAgICAgY29uc3QgbWVudSA9IHRoaXMuc2lkZWJhck1lbnUuZmluZChgYVtkYXRhLXBhZ2U9JyR7cGFnZX0nXWApO1xuICAgICAgbWVudS5vbihcIm1vdXNlZW50ZXJcIiwgKGUpID0+IHRoaXMuc2lkZWJhckxvZ28uYWRkQ2xhc3MoY3NzQ2xhc3MpKTtcbiAgICAgIG1lbnUub24oXCJtb3VzZWxlYXZlXCIsIChlKSA9PiB0aGlzLnNpZGViYXJMb2dvLnJlbW92ZUNsYXNzKGNzc0NsYXNzKSk7XG4gICAgfTtcbiAgXG4gICAgaGFuZGxlTWVudUV2ZW50KFwib3ZlcnZpZXdcIiwgXCJyb3RhdGU3MlwiKTtcbiAgICBoYW5kbGVNZW51RXZlbnQoXCJjb2RlX2h0bWxcIiwgXCJyb3RhdGUxNDRcIik7XG4gICAgaGFuZGxlTWVudUV2ZW50KFwiY29kZV9zdHlsZVwiLCBcInJvdGF0ZTIxNlwiKTtcbiAgICBoYW5kbGVNZW51RXZlbnQoXCJjb2RlX2pzXCIsIFwicm90YXRlMjg4XCIpO1xuICAgIGhhbmRsZU1lbnVFdmVudChcIm1pc2NcIiwgXCJyb3RhdGVcIik7XG4gIH1cbiAgXG4gIHNldE1lbnVUb2dnbGVFdmVudCgpe1xuICAgIHRoaXMuc2lkZWJhclRvZ2dsZS5vbihcImNsaWNrXCIsIChlKSA9PiB7XG4gICAgICAkKFwiI3NpZGViYXItYXJlYVwiKS50b2dnbGVDbGFzcyhcImV4cGFuZFwiKTtcbiAgICB9KTtcbiAgfVxufVxuIiwiLy8gZ2xvYmFsICQsIGpRdWVyeVxuXCJ1c2Ugc3RyaWN0XCI7XG5cbmltcG9ydCBBcHBDb250cm9sbGVyIGZyb20gXCIuLi9BcHBDb250cm9sbGVyXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEluZGV4Q29udHJvbGxlciBleHRlbmRzIEFwcENvbnRyb2xsZXIge1xuICBzdGF0aWMgZ2V0IHBhZ2UoKSB7XG4gICAgcmV0dXJuIFwiaW5kZXhcIjtcbiAgfVxuICBcbiAgY29uc3RydWN0b3IoKXtcbiAgICBzdXBlcigpO1xuICAgIHRoaXMuaW5pdGlhbGl6ZSgpO1xuICB9XG4gIFxuICBpbml0aWFsaXplKCl7XG4gICAgY29uc3QgYnRuX2luc3RhbGwgPSAkKFwiI2luc3RhbGxcIik7XG4gICAgY29uc3QgYnRuX2luaXQgPSAkKFwiI2luaXRcIik7XG4gICAgY29uc3QgYnRuX2RldiA9ICQoXCIjZGV2ZWxvcFwiKTtcbiAgXG4gICAgYnRuX2luc3RhbGwub24oXCJjbGlja1wiLCAoZSkgPT4ge1xuICAgICAgY29uc3QgdGVtcGxhdGUgPSAkKFwiLnRlbXBsYXRlcyAuaW5zdGFsbFwiKS53cmFwKFwiPGRpdi8+XCIpLnBhcmVudCgpLmh0bWwoKTtcbiAgICAgIHRoaXMucG9wVXAodGVtcGxhdGUpO1xuICAgIH0pO1xuICBcbiAgICBidG5faW5pdC5vbihcImNsaWNrXCIsIChlKSA9PiB7XG4gICAgICBjb25zdCB0ZW1wbGF0ZSA9ICQoXCIudGVtcGxhdGVzIC5pbml0XCIpLndyYXAoXCI8ZGl2Lz5cIikucGFyZW50KCkuaHRtbCgpO1xuICAgICAgdGhpcy5wb3BVcCh0ZW1wbGF0ZSk7XG4gICAgfSk7XG4gIFxuICAgIGJ0bl9kZXYub24oXCJjbGlja1wiLCAoZSkgPT4ge1xuICAgICAgY29uc3QgdGVtcGxhdGUgPSAkKFwiLnRlbXBsYXRlcyAuZGV2ZWxvcFwiKS53cmFwKFwiPGRpdi8+XCIpLnBhcmVudCgpLmh0bWwoKTtcbiAgICAgIHRoaXMucG9wVXAodGVtcGxhdGUpO1xuICAgIH0pO1xuICB9XG4gIFxuICBwb3BVcCh0ZW1wbGF0ZSl7XG4gICAgY29uc3QgbGF5ZXIgPSAkKFwiPGRpdj5cIik7XG4gICAgbGF5ZXIuYWRkQ2xhc3MoXCJsYXllclwiKTtcbiAgICAkKFwiYm9keSAjbWFpblwiKS5hcHBlbmQobGF5ZXIpO1xuICBcbiAgICBjb25zdCBwb3B1cCA9ICQoXCIucG9wdXBcIik7XG4gICAgbGF5ZXIuYWRkQ2xhc3MoXCJkYXJrXCIpO1xuICBcbiAgICBzZXRUaW1lb3V0KCgpPT57XG4gICAgICBwb3B1cC5yZW1vdmVDbGFzcyhcImhpZGRlblwiKTtcbiAgICAgIHBvcHVwLmFwcGVuZCh0ZW1wbGF0ZSk7XG4gICAgICBwb3B1cC5maW5kKFwiLnRlbXBsYXRlXCIpLm5pY2VTY3JvbGwoKTtcbiAgICB9LCAwKTtcbiAgXG4gICAgbGF5ZXIub24oXCJjbGlja1wiLCAoZSk9PntcbiAgICAgIHBvcHVwLmFkZENsYXNzKFwiaGlkZGVuXCIpO1xuICAgICAgbGF5ZXIucmVtb3ZlQ2xhc3MoXCJkYXJrXCIpO1xuICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgIHBvcHVwLmVtcHR5KCk7XG4gICAgICAgIGxheWVyLnJlbW92ZSgpO1xuICAgICAgfSwgMCk7XG4gICAgfSk7XG4gIH1cbn1cbiJdfQ==
