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
      var path = window.location.pathname.split(/\//);
      console.log(path);
      if (path[path.length - 2] === "contents") {
        window.location = "../";
      }
    });

    $("#sidebar-area").niceScroll();
    $("#content-area").niceScroll({
      autohidemode: "hidden",
      zindex: 100
    });

    var input = $(".switcher .input");
    var dev = $(".switcher .dev");
    var output = $(".switcher .output");

    var currentImage = 0;
    var timer = setInterval(function () {
      if (currentImage === 0) dev.trigger("click", "auto");
      if (currentImage === 1) output.trigger("click", "auto");
      if (currentImage === 2) input.trigger("click", "auto");
      currentImage = ++currentImage % 3;
    }, 3000);

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

    input.on("click", showInputImage);
    dev.on("click", showDevImage);
    output.on("click", showOutputImage);
    $(".switcher .clickable").on("click", function (e, data) {
      if (data !== "auto" && timer) {
        clearTimeout(timer);
        timer = null;
      }
    });

    $(".clickable-img").on("click", function (e) {
      window.location = $(e.target).attr("src");
    });
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
      handleMenuEvent("usage", "rotate120");
      handleMenuEvent("build", "rotate180");
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJsaWIvdGVtcGxhdGVzL3JlYWRtZS9zcmMvanMvQXBwQ29udHJvbGxlci5qcyIsImxpYi90ZW1wbGF0ZXMvcmVhZG1lL3NyYy9qcy9EaXNwYXRjaGVyLmpzIiwibGliL3RlbXBsYXRlcy9yZWFkbWUvc3JjL2pzL21haW4uanMiLCJsaWIvdGVtcGxhdGVzL3JlYWRtZS9zcmMvanMvcGFnZXMvZGV2LnBhcnQuanMiLCJsaWIvdGVtcGxhdGVzL3JlYWRtZS9zcmMvanMvcGFnZXMvaW5kZXgucGFydC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQ0FBOzs7O0FBSUE7Ozs7Ozs7Ozs7SUFFcUIsYTs7O3dCQUNGO0FBQ2YsWUFBTSxJQUFJLFNBQUosQ0FBYyxnREFBZCxDQUFOO0FBQ0Q7OztBQUVELDJCQUFhO0FBQUE7QUFBRTs7Ozs7a0JBTEksYTs7O0FDTnJCOzs7Ozs7Ozs7Ozs7OztBQWNBOzs7Ozs7OztBQUVBOzs7O0FBQ0E7Ozs7Ozs7O0lBRU0sVTtBQUNKLHdCQUFhO0FBQUE7O0FBQ1gsUUFBTSxlQUFlLFNBQVMsY0FBVCxDQUF3QixNQUF4QixDQUFyQjtBQUNBLFNBQUssWUFBTCxHQUFvQixhQUFhLE9BQWIsQ0FBcUIsSUFBekM7O0FBRUEsUUFBTSxhQUFhLGdDQUFuQjs7QUFLQSxTQUFLLFdBQUwsQ0FBaUIsVUFBakI7QUFDRDs7OztnQ0FFVyxVLEVBQVc7QUFBQTs7QUFDckIsaUJBQVcsR0FBWCxDQUFlLFVBQUMsS0FBRDtBQUFBLGVBQVcsTUFBSyxRQUFMLENBQWMsS0FBZCxDQUFYO0FBQUEsT0FBZjtBQUNEOzs7NkJBRVEsSyxFQUFNO0FBQ2IsVUFBRyxLQUFLLFlBQUwsS0FBc0IsTUFBTSxJQUEvQixFQUFxQyxJQUFJLEtBQUo7QUFDdEM7Ozs7OztrQkFHWSxVOzs7OztBQ3hDZjs7Ozs7O0FBRUEsRUFBRSxZQUFNO0FBQ047QUFDRCxDQUZELEUsQ0FIQTs7O0FD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RCxJQUFqRCxFQUFqQjtBQUNBLGVBQUssS0FBTCxDQUFXLFFBQVg7QUFDRCxPQUpEO0FBS0Q7OzswQkFFSyxRLEVBQVM7QUFDYixVQUFNLFFBQVEsRUFBRSxPQUFGLENBQWQ7QUFDQSxZQUFNLFFBQU4sQ0FBZSxPQUFmO0FBQ0EsUUFBRSxZQUFGLEVBQWdCLE1BQWhCLENBQXVCLEtBQXZCOztBQUVBLFVBQU0sUUFBUSxFQUFFLFFBQUYsQ0FBZDtBQUNBLFlBQU0sUUFBTixDQUFlLE1BQWY7O0FBRUEsaUJBQVcsWUFBSTtBQUNiLGNBQU0sV0FBTixDQUFrQixRQUFsQjtBQUNBLGNBQU0sTUFBTixDQUFhLFFBQWI7QUFDQSxjQUFNLElBQU4sQ0FBVyxXQUFYLEVBQXdCLFVBQXhCO0FBQ0QsT0FKRCxFQUlHLENBSkg7O0FBTUEsWUFBTSxFQUFOLENBQVMsT0FBVCxFQUFrQixVQUFDLENBQUQsRUFBSztBQUNyQixjQUFNLFFBQU4sQ0FBZSxRQUFmO0FBQ0EsY0FBTSxXQUFOLENBQWtCLE1BQWxCO0FBQ0EsbUJBQVcsWUFBTTtBQUNmLGdCQUFNLEtBQU47QUFDQSxnQkFBTSxNQUFOO0FBQ0QsU0FIRCxFQUdHLENBSEg7QUFJRCxPQVBEO0FBUUQ7Ozs7OztrQkF4RGtCLGUiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiLyoqXG4gKiBZb3UgZG9uJ3QgbmVlZCB0byBlZGl0IHRoaXMgZmlsZS5cbiAqL1xuXG5cInVzZSBzdHJpY3RcIjtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQXBwQ29udHJvbGxlciB7XG4gIHN0YXRpYyBnZXQgcGFnZSgpe1xuICAgIHRocm93IG5ldyBUeXBlRXJyb3IoXCJzdGF0aWMgZ2V0dGVyIG1ldGhvZCAncGFnZScgaXMgbm90IGltcGxlbWVudGVkXCIpO1xuICB9XG4gIFxuICBjb25zdHJ1Y3Rvcigpe31cbn1cbiIsIi8qKlxuICogUGFnZSBzY3JpcHQgZGlzcGF0Y2hlci5cbiAqXG4gKiBJbiBjYXNlIHlvdSBjcmVhdGVkIG5ldyBwYWdlIHNjcmlwdCwgYWRkIGVhY2ggb2YgdGhlIGZvbGxvd2luZyBsaW5lc1xuICogdG8gdGhpcyBmaWxlLlxuICpcbiAqICsgaW1wb3J0IDxuYW1lPiBmcm9tIFwiLi9wYWdlcy9YWFhYLnBhcnRcIjtcbiAqICAgLi4uXG4gKiAgIGNvbnN0IGtsYXNzX2xpc3QgPSBbXG4gKiAgICAgLi4uXG4gKiArICAgPG5hbWU+LFxuICogICBdO1xuICovXG5cblwidXNlIHN0cmljdFwiO1xuXG5pbXBvcnQgaW5kZXggZnJvbSBcIi4vcGFnZXMvaW5kZXgucGFydFwiO1xuaW1wb3J0IGRldiBmcm9tIFwiLi9wYWdlcy9kZXYucGFydFwiO1xuXG5jbGFzcyBEaXNwYXRjaGVyIHtcbiAgY29uc3RydWN0b3IoKXtcbiAgICBjb25zdCBtYWluX2NvbnRlbnQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcIm1haW5cIik7XG4gICAgdGhpcy5jdXJyZW50X3BhZ2UgPSBtYWluX2NvbnRlbnQuZGF0YXNldC5wYWdlO1xuICBcbiAgICBjb25zdCBrbGFzc19saXN0ID0gW1xuICAgICAgaW5kZXgsXG4gICAgICBkZXYsXG4gICAgXTtcbiAgICBcbiAgICB0aGlzLmRpc3BhdGNoQWxsKGtsYXNzX2xpc3QpO1xuICB9XG4gIFxuICBkaXNwYXRjaEFsbChrbGFzc19saXN0KXtcbiAgICBrbGFzc19saXN0Lm1hcCgoa2xhc3MpID0+IHRoaXMuZGlzcGF0Y2goa2xhc3MpKTtcbiAgfVxuICBcbiAgZGlzcGF0Y2goa2xhc3Mpe1xuICAgIGlmKHRoaXMuY3VycmVudF9wYWdlID09PSBrbGFzcy5wYWdlKSBuZXcga2xhc3MoKTtcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBEaXNwYXRjaGVyO1xuIiwiLy8gZ2xvYmFsICQsIGpRdWVyeVxuaW1wb3J0IERpc3BhdGNoZXIgZnJvbSAnLi9EaXNwYXRjaGVyJztcblxuJCgoKSA9PiB7XG4gIG5ldyBEaXNwYXRjaGVyKCk7XG59KTtcbiIsIlwidXNlIHN0cmljdFwiO1xuXG5pbXBvcnQgQXBwQ29udHJvbGxlciBmcm9tIFwiLi4vQXBwQ29udHJvbGxlclwiO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBEZXZDb250cm9sbGVyIGV4dGVuZHMgQXBwQ29udHJvbGxlciB7XG4gIHN0YXRpYyBnZXQgcGFnZSgpIHtcbiAgICByZXR1cm4gXCJkZXZcIjtcbiAgfVxuICBcbiAgY29uc3RydWN0b3IoKXtcbiAgICBzdXBlcigpO1xuICAgIFxuICAgIHRoaXMuc2lkZWJhckxvZ28gPSAkKFwiLnNpZGViYXItbG9nbyA+IGltZ1wiKTtcbiAgICB0aGlzLnNpZGViYXJNZW51ID0gJChcIi5zaWRlYmFyLW1lbnUgdWwubmF2ID4gbGlcIik7XG4gICAgdGhpcy5zaWRlYmFyVG9nZ2xlID0gJChcIi5zaWRlYmFyLXRvZ2dsZVwiKTtcbiAgICBcbiAgICB0aGlzLnNldE1lbnVBbmltZSgpO1xuICAgIHRoaXMuc2V0TWVudVRvZ2dsZUV2ZW50KCk7XG4gICAgXG4gICAgdGhpcy5zaWRlYmFyTG9nby5vbihcImNsaWNrXCIsIChlKSA9PiB7XG4gICAgICBjb25zdCBwYXRoID0gd2luZG93LmxvY2F0aW9uLnBhdGhuYW1lLnNwbGl0KC9cXC8vKTtcbiAgICAgIGNvbnNvbGUubG9nKHBhdGgpO1xuICAgICAgaWYocGF0aFtwYXRoLmxlbmd0aC0yXSA9PT0gXCJjb250ZW50c1wiKXtcbiAgICAgICAgd2luZG93LmxvY2F0aW9uID0gXCIuLi9cIjtcbiAgICAgIH1cbiAgICB9KTtcbiAgICBcbiAgICAkKFwiI3NpZGViYXItYXJlYVwiKS5uaWNlU2Nyb2xsKCk7XG4gICAgJChcIiNjb250ZW50LWFyZWFcIikubmljZVNjcm9sbCh7XG4gICAgICBhdXRvaGlkZW1vZGU6IFwiaGlkZGVuXCIsXG4gICAgICB6aW5kZXg6IDEwMFxuICAgIH0pO1xuICBcbiAgICBjb25zdCBpbnB1dCA9ICQoXCIuc3dpdGNoZXIgLmlucHV0XCIpO1xuICAgIGNvbnN0IGRldiA9ICQoXCIuc3dpdGNoZXIgLmRldlwiKTtcbiAgICBjb25zdCBvdXRwdXQgPSAkKFwiLnN3aXRjaGVyIC5vdXRwdXRcIik7XG4gIFxuICAgIGxldCBjdXJyZW50SW1hZ2UgPSAwO1xuICAgIGxldCB0aW1lciA9IHNldEludGVydmFsKCgpID0+IHtcbiAgICAgIGlmKGN1cnJlbnRJbWFnZSA9PT0gMCkgZGV2LnRyaWdnZXIoXCJjbGlja1wiLCBcImF1dG9cIik7XG4gICAgICBpZihjdXJyZW50SW1hZ2UgPT09IDEpIG91dHB1dC50cmlnZ2VyKFwiY2xpY2tcIiwgXCJhdXRvXCIpO1xuICAgICAgaWYoY3VycmVudEltYWdlID09PSAyKSBpbnB1dC50cmlnZ2VyKFwiY2xpY2tcIiwgXCJhdXRvXCIpO1xuICAgICAgY3VycmVudEltYWdlID0gKytjdXJyZW50SW1hZ2UgJSAzO1xuICAgIH0sIDMwMDApO1xuICAgIFxuICAgIGNvbnN0IHNob3dJbnB1dEltYWdlID0gKGUpID0+IHtcbiAgICAgICQoXCIub3ZlcnZpZXctaW1hZ2UgLnN3aXRjaGVyIC5idG5cIikucmVtb3ZlQ2xhc3MoXCJvdXRcIikucmVtb3ZlQ2xhc3MoXCJkZXZcIik7XG4gICAgICAkKFwiLm92ZXJ2aWV3LWltYWdlIC5zb3VyY2Utc2FtcGxlXCIpLnJlbW92ZUNsYXNzKFwiaGlkZGVuXCIpO1xuICAgICAgJChcIi5vdmVydmlldy1pbWFnZSAuZGV2LXNhbXBsZVwiKS5hZGRDbGFzcyhcImhpZGRlblwiKTtcbiAgICAgICQoXCIub3ZlcnZpZXctaW1hZ2UgLnJlc3VsdC1zYW1wbGVcIikuYWRkQ2xhc3MoXCJoaWRkZW5cIik7XG4gICAgfTtcbiAgICBcbiAgICBjb25zdCBzaG93RGV2SW1hZ2UgPSAoZSkgPT4ge1xuICAgICAgJChcIi5vdmVydmlldy1pbWFnZSAuc3dpdGNoZXIgLmJ0blwiKS5yZW1vdmVDbGFzcyhcIm91dFwiKS5hZGRDbGFzcyhcImRldlwiKTtcbiAgICAgICQoXCIub3ZlcnZpZXctaW1hZ2UgLnNvdXJjZS1zYW1wbGVcIikuYWRkQ2xhc3MoXCJoaWRkZW5cIik7XG4gICAgICAkKFwiLm92ZXJ2aWV3LWltYWdlIC5kZXYtc2FtcGxlXCIpLnJlbW92ZUNsYXNzKFwiaGlkZGVuXCIpO1xuICAgICAgJChcIi5vdmVydmlldy1pbWFnZSAucmVzdWx0LXNhbXBsZVwiKS5hZGRDbGFzcyhcImhpZGRlblwiKTtcbiAgICB9O1xuICBcbiAgICBjb25zdCBzaG93T3V0cHV0SW1hZ2UgPSAoZSkgPT4ge1xuICAgICAgJChcIi5vdmVydmlldy1pbWFnZSAuc3dpdGNoZXIgLmJ0blwiKS5yZW1vdmVDbGFzcyhcImRldlwiKS5hZGRDbGFzcyhcIm91dFwiKTtcbiAgICAgICQoXCIub3ZlcnZpZXctaW1hZ2UgLnNvdXJjZS1zYW1wbGVcIikuYWRkQ2xhc3MoXCJoaWRkZW5cIik7XG4gICAgICAkKFwiLm92ZXJ2aWV3LWltYWdlIC5yZXN1bHQtc2FtcGxlXCIpLnJlbW92ZUNsYXNzKFwiaGlkZGVuXCIpO1xuICAgICAgJChcIi5vdmVydmlldy1pbWFnZSAuZGV2LXNhbXBsZVwiKS5hZGRDbGFzcyhcImhpZGRlblwiKTtcbiAgICB9O1xuICBcbiAgICBpbnB1dC5vbihcImNsaWNrXCIsIHNob3dJbnB1dEltYWdlKTtcbiAgICBkZXYub24oXCJjbGlja1wiLCBzaG93RGV2SW1hZ2UpO1xuICAgIG91dHB1dC5vbihcImNsaWNrXCIsIHNob3dPdXRwdXRJbWFnZSk7XG4gICAgJChcIi5zd2l0Y2hlciAuY2xpY2thYmxlXCIpLm9uKFwiY2xpY2tcIiwgKGUsIGRhdGEpID0+IHtcbiAgICAgIGlmKGRhdGEgIT09IFwiYXV0b1wiICYmIHRpbWVyKXtcbiAgICAgICAgY2xlYXJUaW1lb3V0KHRpbWVyKTtcbiAgICAgICAgdGltZXIgPSBudWxsO1xuICAgICAgfVxuICAgIH0pO1xuICAgIFxuICAgICQoXCIuY2xpY2thYmxlLWltZ1wiKS5vbihcImNsaWNrXCIsIChlKSA9PiB7XG4gICAgICB3aW5kb3cubG9jYXRpb24gPSAkKGUudGFyZ2V0KS5hdHRyKFwic3JjXCIpO1xuICAgIH0pO1xuICB9XG4gIFxuICBzZXRNZW51QW5pbWUoKXtcbiAgICBjb25zdCBoYW5kbGVNZW51RXZlbnQgPSAocGFnZSwgY3NzQ2xhc3MpID0+IHtcbiAgICAgIGNvbnN0IG1lbnUgPSB0aGlzLnNpZGViYXJNZW51LmZpbmQoYGFbZGF0YS1wYWdlPScke3BhZ2V9J11gKTtcbiAgICAgIG1lbnUub24oXCJtb3VzZWVudGVyXCIsIChlKSA9PiB0aGlzLnNpZGViYXJMb2dvLmFkZENsYXNzKGNzc0NsYXNzKSk7XG4gICAgICBtZW51Lm9uKFwibW91c2VsZWF2ZVwiLCAoZSkgPT4gdGhpcy5zaWRlYmFyTG9nby5yZW1vdmVDbGFzcyhjc3NDbGFzcykpO1xuICAgIH07XG4gIFxuICAgIGhhbmRsZU1lbnVFdmVudChcIm92ZXJ2aWV3XCIsIFwicm90YXRlNjBcIik7XG4gICAgaGFuZGxlTWVudUV2ZW50KFwidXNhZ2VcIiwgXCJyb3RhdGUxMjBcIik7XG4gICAgaGFuZGxlTWVudUV2ZW50KFwiYnVpbGRcIiwgXCJyb3RhdGUxODBcIik7XG4gICAgaGFuZGxlTWVudUV2ZW50KFwiY29kZV9odG1sXCIsIFwicm90YXRlMjQwXCIpO1xuICAgIGhhbmRsZU1lbnVFdmVudChcImNvZGVfc3R5bGVcIiwgXCJyb3RhdGUzMDBcIik7XG4gICAgaGFuZGxlTWVudUV2ZW50KFwiY29kZV9qc1wiLCBcInJvdGF0ZTM2MFwiKTtcbiAgfVxuICBcbiAgc2V0TWVudVRvZ2dsZUV2ZW50KCl7XG4gICAgY29uc3Qgc2lkZWJhckFyZWEgPSAkKFwiI3NpZGViYXItYXJlYVwiKTtcbiAgICB0aGlzLnNpZGViYXJUb2dnbGUub24oXCJjbGlja1wiLCAoZSkgPT4ge1xuICAgICAgc2lkZWJhckFyZWEudG9nZ2xlQ2xhc3MoXCJleHBhbmRcIik7XG4gICAgfSk7XG4gIFxuICAgIHNpZGViYXJBcmVhLm9uKFwidHJhbnNpdGlvbmVuZFwiLCAoZSkgPT4ge1xuICAgICAgc2lkZWJhckFyZWEuZ2V0TmljZVNjcm9sbCgpLnJlc2l6ZSgpO1xuICAgIH0pO1xuICB9XG59XG4iLCIvLyBnbG9iYWwgJCwgalF1ZXJ5XG5cInVzZSBzdHJpY3RcIjtcblxuaW1wb3J0IEFwcENvbnRyb2xsZXIgZnJvbSBcIi4uL0FwcENvbnRyb2xsZXJcIjtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgSW5kZXhDb250cm9sbGVyIGV4dGVuZHMgQXBwQ29udHJvbGxlciB7XG4gIHN0YXRpYyBnZXQgcGFnZSgpIHtcbiAgICByZXR1cm4gXCJpbmRleFwiO1xuICB9XG4gIFxuICBjb25zdHJ1Y3Rvcigpe1xuICAgIHN1cGVyKCk7XG4gICAgdGhpcy5pbml0aWFsaXplKCk7XG4gIH1cbiAgXG4gIGluaXRpYWxpemUoKXtcbiAgICBjb25zdCBidG5faW5zdGFsbCA9ICQoXCIjaW5zdGFsbFwiKTtcbiAgICBjb25zdCBidG5faW5pdCA9ICQoXCIjaW5pdFwiKTtcbiAgICBjb25zdCBidG5fZGV2ID0gJChcIiNkZXZlbG9wXCIpO1xuICBcbiAgICBidG5faW5zdGFsbC5vbihcImNsaWNrXCIsIChlKSA9PiB7XG4gICAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xuICAgICAgY29uc3QgdGVtcGxhdGUgPSAkKFwiLnRlbXBsYXRlcyAuaW5zdGFsbFwiKS53cmFwKFwiPGRpdi8+XCIpLnBhcmVudCgpLmh0bWwoKTtcbiAgICAgIHRoaXMucG9wVXAodGVtcGxhdGUpO1xuICAgIH0pO1xuICBcbiAgICBidG5faW5pdC5vbihcImNsaWNrXCIsIChlKSA9PiB7XG4gICAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xuICAgICAgY29uc3QgdGVtcGxhdGUgPSAkKFwiLnRlbXBsYXRlcyAuaW5pdFwiKS53cmFwKFwiPGRpdi8+XCIpLnBhcmVudCgpLmh0bWwoKTtcbiAgICAgIHRoaXMucG9wVXAodGVtcGxhdGUpO1xuICAgIH0pO1xuICBcbiAgICBidG5fZGV2Lm9uKFwiY2xpY2tcIiwgKGUpID0+IHtcbiAgICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICBjb25zdCB0ZW1wbGF0ZSA9ICQoXCIudGVtcGxhdGVzIC5kZXZlbG9wXCIpLndyYXAoXCI8ZGl2Lz5cIikucGFyZW50KCkuaHRtbCgpO1xuICAgICAgdGhpcy5wb3BVcCh0ZW1wbGF0ZSk7XG4gICAgfSk7XG4gIH1cbiAgXG4gIHBvcFVwKHRlbXBsYXRlKXtcbiAgICBjb25zdCBsYXllciA9ICQoXCI8ZGl2PlwiKTtcbiAgICBsYXllci5hZGRDbGFzcyhcImxheWVyXCIpO1xuICAgICQoXCJib2R5ICNtYWluXCIpLmFwcGVuZChsYXllcik7XG4gIFxuICAgIGNvbnN0IHBvcHVwID0gJChcIi5wb3B1cFwiKTtcbiAgICBsYXllci5hZGRDbGFzcyhcImRhcmtcIik7XG4gIFxuICAgIHNldFRpbWVvdXQoKCk9PntcbiAgICAgIHBvcHVwLnJlbW92ZUNsYXNzKFwiaGlkZGVuXCIpO1xuICAgICAgcG9wdXAuYXBwZW5kKHRlbXBsYXRlKTtcbiAgICAgIHBvcHVwLmZpbmQoXCIudGVtcGxhdGVcIikubmljZVNjcm9sbCgpO1xuICAgIH0sIDApO1xuXG4gICAgbGF5ZXIub24oXCJjbGlja1wiLCAoZSk9PntcbiAgICAgIHBvcHVwLmFkZENsYXNzKFwiaGlkZGVuXCIpO1xuICAgICAgbGF5ZXIucmVtb3ZlQ2xhc3MoXCJkYXJrXCIpO1xuICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgIHBvcHVwLmVtcHR5KCk7XG4gICAgICAgIGxheWVyLnJlbW92ZSgpO1xuICAgICAgfSwgMCk7XG4gICAgfSk7XG4gIH1cbn1cbiJdfQ==
