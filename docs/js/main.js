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

    _this.setMenuAnime();
    _this.setMenuToggleEvent();

    _this.sidebarLogo.on("click", function (e) {
      window.location = "../../";
    });

    $("#sidebar-area").niceScroll();
    $("#content-area").niceScroll({ autohidemode: "hidden" });

    var showInputImage = function showInputImage(e) {
      $(".overview-image .switcher .btn").removeClass("out").removeClass("dev");
      $(".overview-image .source-sample").removeClass("hidden");
      $(".overview-image .dev-sample").addClass("hidden");
      $(".overview-image .result-sample").addClass("hidden");
    };

    var showDevImage = function showDevImage(e) {
      $(".overview-image .switcher .btn").removeClass("out").addClass("dev");
      $(".overview-image .source-sample").addClass("hidden");
      $(".overview-image .dev-sample").removeClass("hidden");
      $(".overview-image .result-sample").addClass("hidden");
    };

    var showOutputImage = function showOutputImage(e) {
      $(".overview-image .switcher .btn").removeClass("dev").addClass("out");
      $(".overview-image .source-sample").addClass("hidden");
      $(".overview-image .result-sample").removeClass("hidden");
      $(".overview-image .dev-sample").addClass("hidden");
    };

    $(".switcher .input").on("click", showInputImage);
    $(".switcher .dev").on("click", showDevImage);
    $(".switcher .output").on("click", showOutputImage);
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

      handleMenuEvent("overview", "rotate60");
      handleMenuEvent("build", "rotate120");
      handleMenuEvent("usage", "rotate180");
      handleMenuEvent("code_html", "rotate240");
      handleMenuEvent("code_style", "rotate300");
      handleMenuEvent("code_js", "rotate360");
    }
  }, {
    key: "setMenuToggleEvent",
    value: function setMenuToggleEvent() {
      var sidebarArea = $("#sidebar-area");
      this.sidebarToggle.on("click", function (e) {
        sidebarArea.toggleClass("expand");
      });

      sidebarArea.on("transitionend", function (e) {
        sidebarArea.getNiceScroll().resize();
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
        e.stopPropagation();
        var template = $(".templates .install").wrap("<div/>").parent().html();
        _this2.popUp(template);
      });

      btn_init.on("click", function (e) {
        e.stopPropagation();
        var template = $(".templates .init").wrap("<div/>").parent().html();
        _this2.popUp(template);
      });

      btn_dev.on("click", function (e) {
        e.stopPropagation();
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJsaWIvdGVtcGxhdGVzL3JlYWRtZS9zcmMvanMvQXBwQ29udHJvbGxlci5qcyIsImxpYi90ZW1wbGF0ZXMvcmVhZG1lL3NyYy9qcy9EaXNwYXRjaGVyLmpzIiwibGliL3RlbXBsYXRlcy9yZWFkbWUvc3JjL2pzL21haW4uanMiLCJsaWIvdGVtcGxhdGVzL3JlYWRtZS9zcmMvanMvcGFnZXMvZGV2LnBhcnQuanMiLCJsaWIvdGVtcGxhdGVzL3JlYWRtZS9zcmMvanMvcGFnZXMvaW5kZXgucGFydC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQ0FBOzs7O0FBSUE7Ozs7Ozs7Ozs7SUFFcUIsYTs7O3dCQUNGO0FBQ2YsWUFBTSxJQUFJLFNBQUosQ0FBYyxnREFBZCxDQUFOO0FBQ0Q7OztBQUVELDJCQUFhO0FBQUE7QUFBRTs7Ozs7a0JBTEksYTs7O0FDTnJCOzs7Ozs7Ozs7Ozs7OztBQWNBOzs7Ozs7OztBQUVBOzs7O0FBQ0E7Ozs7Ozs7O0lBRU0sVTtBQUNKLHdCQUFhO0FBQUE7O0FBQ1gsUUFBTSxlQUFlLFNBQVMsY0FBVCxDQUF3QixNQUF4QixDQUFyQjtBQUNBLFNBQUssWUFBTCxHQUFvQixhQUFhLE9BQWIsQ0FBcUIsSUFBekM7O0FBRUEsUUFBTSxhQUFhLGdDQUFuQjs7QUFLQSxTQUFLLFdBQUwsQ0FBaUIsVUFBakI7QUFDRDs7OztnQ0FFVyxVLEVBQVc7QUFBQTs7QUFDckIsaUJBQVcsR0FBWCxDQUFlLFVBQUMsS0FBRDtBQUFBLGVBQVcsTUFBSyxRQUFMLENBQWMsS0FBZCxDQUFYO0FBQUEsT0FBZjtBQUNEOzs7NkJBRVEsSyxFQUFNO0FBQ2IsVUFBRyxLQUFLLFlBQUwsS0FBc0IsTUFBTSxJQUEvQixFQUFxQyxJQUFJLEtBQUo7QUFDdEM7Ozs7OztrQkFHWSxVOzs7OztBQ3hDZjs7Ozs7O0FBRUEsRUFBRSxZQUFNO0FBQ047QUFDRCxDQUZELEUsQ0FIQTs7O0FD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QyxDQUFELEVBQU87QUFDekIsVUFBRSxlQUFGO0FBQ0EsWUFBTSxXQUFXLEVBQUUscUJBQUYsRUFBeUIsSUFBekIsQ0FBOEIsUUFBOUIsRUFBd0MsTUFBeEMsR0FBaUQsSUFBakQsRUFBakI7QUFDQSxlQUFLLEtBQUwsQ0FBVyxRQUFYO0FBQ0QsT0FKRDtBQUtEOzs7MEJBRUssUSxFQUFTO0FBQ2IsVUFBTSxRQUFRLEVBQUUsT0FBRixDQUFkO0FBQ0EsWUFBTSxRQUFOLENBQWUsT0FBZjtBQUNBLFFBQUUsWUFBRixFQUFnQixNQUFoQixDQUF1QixLQUF2Qjs7QUFFQSxVQUFNLFFBQVEsRUFBRSxRQUFGLENBQWQ7QUFDQSxZQUFNLFFBQU4sQ0FBZSxNQUFmOztBQUVBLGlCQUFXLFlBQUk7QUFDYixjQUFNLFdBQU4sQ0FBa0IsUUFBbEI7QUFDQSxjQUFNLE1BQU4sQ0FBYSxRQUFiO0FBQ0EsY0FBTSxJQUFOLENBQVcsV0FBWCxFQUF3QixVQUF4QjtBQUNELE9BSkQsRUFJRyxDQUpIOztBQU1BLFlBQU0sRUFBTixDQUFTLE9BQVQsRUFBa0IsVUFBQyxDQUFELEVBQUs7QUFDckIsY0FBTSxRQUFOLENBQWUsUUFBZjtBQUNBLGNBQU0sV0FBTixDQUFrQixNQUFsQjtBQUNBLG1CQUFXLFlBQU07QUFDZixnQkFBTSxLQUFOO0FBQ0EsZ0JBQU0sTUFBTjtBQUNELFNBSEQsRUFHRyxDQUhIO0FBSUQsT0FQRDtBQVFEOzs7Ozs7a0JBeERrQixlIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsIi8qKlxuICogWW91IGRvbid0IG5lZWQgdG8gZWRpdCB0aGlzIGZpbGUuXG4gKi9cblxuXCJ1c2Ugc3RyaWN0XCI7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEFwcENvbnRyb2xsZXIge1xuICBzdGF0aWMgZ2V0IHBhZ2UoKXtcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKFwic3RhdGljIGdldHRlciBtZXRob2QgJ3BhZ2UnIGlzIG5vdCBpbXBsZW1lbnRlZFwiKTtcbiAgfVxuICBcbiAgY29uc3RydWN0b3IoKXt9XG59XG4iLCIvKipcbiAqIFBhZ2Ugc2NyaXB0IGRpc3BhdGNoZXIuXG4gKlxuICogSW4gY2FzZSB5b3UgY3JlYXRlZCBuZXcgcGFnZSBzY3JpcHQsIGFkZCBlYWNoIG9mIHRoZSBmb2xsb3dpbmcgbGluZXNcbiAqIHRvIHRoaXMgZmlsZS5cbiAqXG4gKiArIGltcG9ydCA8bmFtZT4gZnJvbSBcIi4vcGFnZXMvWFhYWC5wYXJ0XCI7XG4gKiAgIC4uLlxuICogICBjb25zdCBrbGFzc19saXN0ID0gW1xuICogICAgIC4uLlxuICogKyAgIDxuYW1lPixcbiAqICAgXTtcbiAqL1xuXG5cInVzZSBzdHJpY3RcIjtcblxuaW1wb3J0IGluZGV4IGZyb20gXCIuL3BhZ2VzL2luZGV4LnBhcnRcIjtcbmltcG9ydCBkZXYgZnJvbSBcIi4vcGFnZXMvZGV2LnBhcnRcIjtcblxuY2xhc3MgRGlzcGF0Y2hlciB7XG4gIGNvbnN0cnVjdG9yKCl7XG4gICAgY29uc3QgbWFpbl9jb250ZW50ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJtYWluXCIpO1xuICAgIHRoaXMuY3VycmVudF9wYWdlID0gbWFpbl9jb250ZW50LmRhdGFzZXQucGFnZTtcbiAgXG4gICAgY29uc3Qga2xhc3NfbGlzdCA9IFtcbiAgICAgIGluZGV4LFxuICAgICAgZGV2LFxuICAgIF07XG4gICAgXG4gICAgdGhpcy5kaXNwYXRjaEFsbChrbGFzc19saXN0KTtcbiAgfVxuICBcbiAgZGlzcGF0Y2hBbGwoa2xhc3NfbGlzdCl7XG4gICAga2xhc3NfbGlzdC5tYXAoKGtsYXNzKSA9PiB0aGlzLmRpc3BhdGNoKGtsYXNzKSk7XG4gIH1cbiAgXG4gIGRpc3BhdGNoKGtsYXNzKXtcbiAgICBpZih0aGlzLmN1cnJlbnRfcGFnZSA9PT0ga2xhc3MucGFnZSkgbmV3IGtsYXNzKCk7XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgRGlzcGF0Y2hlcjtcbiIsIi8vIGdsb2JhbCAkLCBqUXVlcnlcbmltcG9ydCBEaXNwYXRjaGVyIGZyb20gJy4vRGlzcGF0Y2hlcic7XG5cbiQoKCkgPT4ge1xuICBuZXcgRGlzcGF0Y2hlcigpO1xufSk7XG4iLCJcInVzZSBzdHJpY3RcIjtcblxuaW1wb3J0IEFwcENvbnRyb2xsZXIgZnJvbSBcIi4uL0FwcENvbnRyb2xsZXJcIjtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRGV2Q29udHJvbGxlciBleHRlbmRzIEFwcENvbnRyb2xsZXIge1xuICBzdGF0aWMgZ2V0IHBhZ2UoKSB7XG4gICAgcmV0dXJuIFwiZGV2XCI7XG4gIH1cbiAgXG4gIGNvbnN0cnVjdG9yKCl7XG4gICAgc3VwZXIoKTtcbiAgICBcbiAgICB0aGlzLnNpZGViYXJMb2dvID0gJChcIi5zaWRlYmFyLWxvZ28gPiBpbWdcIik7XG4gICAgdGhpcy5zaWRlYmFyTWVudSA9ICQoXCIuc2lkZWJhci1tZW51IHVsLm5hdiA+IGxpXCIpO1xuICAgIHRoaXMuc2lkZWJhclRvZ2dsZSA9ICQoXCIuc2lkZWJhci10b2dnbGVcIik7XG4gICAgXG4gICAgdGhpcy5zZXRNZW51QW5pbWUoKTtcbiAgICB0aGlzLnNldE1lbnVUb2dnbGVFdmVudCgpO1xuICAgIFxuICAgIHRoaXMuc2lkZWJhckxvZ28ub24oXCJjbGlja1wiLCAoZSkgPT4ge1xuICAgICAgd2luZG93LmxvY2F0aW9uID0gXCIuLi8uLi9cIjtcbiAgICB9KTtcbiAgICBcbiAgICAkKFwiI3NpZGViYXItYXJlYVwiKS5uaWNlU2Nyb2xsKCk7XG4gICAgJChcIiNjb250ZW50LWFyZWFcIikubmljZVNjcm9sbCh7YXV0b2hpZGVtb2RlOiBcImhpZGRlblwifSk7XG4gICAgXG4gICAgY29uc3Qgc2hvd0lucHV0SW1hZ2UgPSAoZSkgPT4ge1xuICAgICAgJChcIi5vdmVydmlldy1pbWFnZSAuc3dpdGNoZXIgLmJ0blwiKS5yZW1vdmVDbGFzcyhcIm91dFwiKS5yZW1vdmVDbGFzcyhcImRldlwiKTtcbiAgICAgICQoXCIub3ZlcnZpZXctaW1hZ2UgLnNvdXJjZS1zYW1wbGVcIikucmVtb3ZlQ2xhc3MoXCJoaWRkZW5cIik7XG4gICAgICAkKFwiLm92ZXJ2aWV3LWltYWdlIC5kZXYtc2FtcGxlXCIpLmFkZENsYXNzKFwiaGlkZGVuXCIpO1xuICAgICAgJChcIi5vdmVydmlldy1pbWFnZSAucmVzdWx0LXNhbXBsZVwiKS5hZGRDbGFzcyhcImhpZGRlblwiKTtcbiAgICB9O1xuICAgIFxuICAgIGNvbnN0IHNob3dEZXZJbWFnZSA9IChlKSA9PiB7XG4gICAgICAkKFwiLm92ZXJ2aWV3LWltYWdlIC5zd2l0Y2hlciAuYnRuXCIpLnJlbW92ZUNsYXNzKFwib3V0XCIpLmFkZENsYXNzKFwiZGV2XCIpO1xuICAgICAgJChcIi5vdmVydmlldy1pbWFnZSAuc291cmNlLXNhbXBsZVwiKS5hZGRDbGFzcyhcImhpZGRlblwiKTtcbiAgICAgICQoXCIub3ZlcnZpZXctaW1hZ2UgLmRldi1zYW1wbGVcIikucmVtb3ZlQ2xhc3MoXCJoaWRkZW5cIik7XG4gICAgICAkKFwiLm92ZXJ2aWV3LWltYWdlIC5yZXN1bHQtc2FtcGxlXCIpLmFkZENsYXNzKFwiaGlkZGVuXCIpO1xuICAgIH07XG4gIFxuICAgIGNvbnN0IHNob3dPdXRwdXRJbWFnZSA9IChlKSA9PiB7XG4gICAgICAkKFwiLm92ZXJ2aWV3LWltYWdlIC5zd2l0Y2hlciAuYnRuXCIpLnJlbW92ZUNsYXNzKFwiZGV2XCIpLmFkZENsYXNzKFwib3V0XCIpO1xuICAgICAgJChcIi5vdmVydmlldy1pbWFnZSAuc291cmNlLXNhbXBsZVwiKS5hZGRDbGFzcyhcImhpZGRlblwiKTtcbiAgICAgICQoXCIub3ZlcnZpZXctaW1hZ2UgLnJlc3VsdC1zYW1wbGVcIikucmVtb3ZlQ2xhc3MoXCJoaWRkZW5cIik7XG4gICAgICAkKFwiLm92ZXJ2aWV3LWltYWdlIC5kZXYtc2FtcGxlXCIpLmFkZENsYXNzKFwiaGlkZGVuXCIpO1xuICAgIH07XG4gIFxuICAgICQoXCIuc3dpdGNoZXIgLmlucHV0XCIpLm9uKFwiY2xpY2tcIiwgc2hvd0lucHV0SW1hZ2UpO1xuICAgICQoXCIuc3dpdGNoZXIgLmRldlwiKS5vbihcImNsaWNrXCIsIHNob3dEZXZJbWFnZSk7XG4gICAgJChcIi5zd2l0Y2hlciAub3V0cHV0XCIpLm9uKFwiY2xpY2tcIiwgc2hvd091dHB1dEltYWdlKTtcbiAgfVxuICBcbiAgc2V0TWVudUFuaW1lKCl7XG4gICAgY29uc3QgaGFuZGxlTWVudUV2ZW50ID0gKHBhZ2UsIGNzc0NsYXNzKSA9PiB7XG4gICAgICBjb25zdCBtZW51ID0gdGhpcy5zaWRlYmFyTWVudS5maW5kKGBhW2RhdGEtcGFnZT0nJHtwYWdlfSddYCk7XG4gICAgICBtZW51Lm9uKFwibW91c2VlbnRlclwiLCAoZSkgPT4gdGhpcy5zaWRlYmFyTG9nby5hZGRDbGFzcyhjc3NDbGFzcykpO1xuICAgICAgbWVudS5vbihcIm1vdXNlbGVhdmVcIiwgKGUpID0+IHRoaXMuc2lkZWJhckxvZ28ucmVtb3ZlQ2xhc3MoY3NzQ2xhc3MpKTtcbiAgICB9O1xuICBcbiAgICBoYW5kbGVNZW51RXZlbnQoXCJvdmVydmlld1wiLCBcInJvdGF0ZTYwXCIpO1xuICAgIGhhbmRsZU1lbnVFdmVudChcImJ1aWxkXCIsIFwicm90YXRlMTIwXCIpO1xuICAgIGhhbmRsZU1lbnVFdmVudChcInVzYWdlXCIsIFwicm90YXRlMTgwXCIpO1xuICAgIGhhbmRsZU1lbnVFdmVudChcImNvZGVfaHRtbFwiLCBcInJvdGF0ZTI0MFwiKTtcbiAgICBoYW5kbGVNZW51RXZlbnQoXCJjb2RlX3N0eWxlXCIsIFwicm90YXRlMzAwXCIpO1xuICAgIGhhbmRsZU1lbnVFdmVudChcImNvZGVfanNcIiwgXCJyb3RhdGUzNjBcIik7XG4gIH1cbiAgXG4gIHNldE1lbnVUb2dnbGVFdmVudCgpe1xuICAgIGNvbnN0IHNpZGViYXJBcmVhID0gJChcIiNzaWRlYmFyLWFyZWFcIik7XG4gICAgdGhpcy5zaWRlYmFyVG9nZ2xlLm9uKFwiY2xpY2tcIiwgKGUpID0+IHtcbiAgICAgIHNpZGViYXJBcmVhLnRvZ2dsZUNsYXNzKFwiZXhwYW5kXCIpO1xuICAgIH0pO1xuICBcbiAgICBzaWRlYmFyQXJlYS5vbihcInRyYW5zaXRpb25lbmRcIiwgKGUpID0+IHtcbiAgICAgIHNpZGViYXJBcmVhLmdldE5pY2VTY3JvbGwoKS5yZXNpemUoKTtcbiAgICB9KTtcbiAgfVxufVxuIiwiLy8gZ2xvYmFsICQsIGpRdWVyeVxuXCJ1c2Ugc3RyaWN0XCI7XG5cbmltcG9ydCBBcHBDb250cm9sbGVyIGZyb20gXCIuLi9BcHBDb250cm9sbGVyXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEluZGV4Q29udHJvbGxlciBleHRlbmRzIEFwcENvbnRyb2xsZXIge1xuICBzdGF0aWMgZ2V0IHBhZ2UoKSB7XG4gICAgcmV0dXJuIFwiaW5kZXhcIjtcbiAgfVxuICBcbiAgY29uc3RydWN0b3IoKXtcbiAgICBzdXBlcigpO1xuICAgIHRoaXMuaW5pdGlhbGl6ZSgpO1xuICB9XG4gIFxuICBpbml0aWFsaXplKCl7XG4gICAgY29uc3QgYnRuX2luc3RhbGwgPSAkKFwiI2luc3RhbGxcIik7XG4gICAgY29uc3QgYnRuX2luaXQgPSAkKFwiI2luaXRcIik7XG4gICAgY29uc3QgYnRuX2RldiA9ICQoXCIjZGV2ZWxvcFwiKTtcbiAgXG4gICAgYnRuX2luc3RhbGwub24oXCJjbGlja1wiLCAoZSkgPT4ge1xuICAgICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAgIGNvbnN0IHRlbXBsYXRlID0gJChcIi50ZW1wbGF0ZXMgLmluc3RhbGxcIikud3JhcChcIjxkaXYvPlwiKS5wYXJlbnQoKS5odG1sKCk7XG4gICAgICB0aGlzLnBvcFVwKHRlbXBsYXRlKTtcbiAgICB9KTtcbiAgXG4gICAgYnRuX2luaXQub24oXCJjbGlja1wiLCAoZSkgPT4ge1xuICAgICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAgIGNvbnN0IHRlbXBsYXRlID0gJChcIi50ZW1wbGF0ZXMgLmluaXRcIikud3JhcChcIjxkaXYvPlwiKS5wYXJlbnQoKS5odG1sKCk7XG4gICAgICB0aGlzLnBvcFVwKHRlbXBsYXRlKTtcbiAgICB9KTtcbiAgXG4gICAgYnRuX2Rldi5vbihcImNsaWNrXCIsIChlKSA9PiB7XG4gICAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xuICAgICAgY29uc3QgdGVtcGxhdGUgPSAkKFwiLnRlbXBsYXRlcyAuZGV2ZWxvcFwiKS53cmFwKFwiPGRpdi8+XCIpLnBhcmVudCgpLmh0bWwoKTtcbiAgICAgIHRoaXMucG9wVXAodGVtcGxhdGUpO1xuICAgIH0pO1xuICB9XG4gIFxuICBwb3BVcCh0ZW1wbGF0ZSl7XG4gICAgY29uc3QgbGF5ZXIgPSAkKFwiPGRpdj5cIik7XG4gICAgbGF5ZXIuYWRkQ2xhc3MoXCJsYXllclwiKTtcbiAgICAkKFwiYm9keSAjbWFpblwiKS5hcHBlbmQobGF5ZXIpO1xuICBcbiAgICBjb25zdCBwb3B1cCA9ICQoXCIucG9wdXBcIik7XG4gICAgbGF5ZXIuYWRkQ2xhc3MoXCJkYXJrXCIpO1xuICBcbiAgICBzZXRUaW1lb3V0KCgpPT57XG4gICAgICBwb3B1cC5yZW1vdmVDbGFzcyhcImhpZGRlblwiKTtcbiAgICAgIHBvcHVwLmFwcGVuZCh0ZW1wbGF0ZSk7XG4gICAgICBwb3B1cC5maW5kKFwiLnRlbXBsYXRlXCIpLm5pY2VTY3JvbGwoKTtcbiAgICB9LCAwKTtcblxuICAgIGxheWVyLm9uKFwiY2xpY2tcIiwgKGUpPT57XG4gICAgICBwb3B1cC5hZGRDbGFzcyhcImhpZGRlblwiKTtcbiAgICAgIGxheWVyLnJlbW92ZUNsYXNzKFwiZGFya1wiKTtcbiAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICBwb3B1cC5lbXB0eSgpO1xuICAgICAgICBsYXllci5yZW1vdmUoKTtcbiAgICAgIH0sIDApO1xuICAgIH0pO1xuICB9XG59XG4iXX0=
