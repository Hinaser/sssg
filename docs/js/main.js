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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJsaWIvdGVtcGxhdGVzL3JlYWRtZS9zcmMvanMvQXBwQ29udHJvbGxlci5qcyIsImxpYi90ZW1wbGF0ZXMvcmVhZG1lL3NyYy9qcy9EaXNwYXRjaGVyLmpzIiwibGliL3RlbXBsYXRlcy9yZWFkbWUvc3JjL2pzL21haW4uanMiLCJsaWIvdGVtcGxhdGVzL3JlYWRtZS9zcmMvanMvcGFnZXMvZGV2LnBhcnQuanMiLCJsaWIvdGVtcGxhdGVzL3JlYWRtZS9zcmMvanMvcGFnZXMvaW5kZXgucGFydC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQ0FBOzs7O0FBSUE7Ozs7Ozs7Ozs7SUFFcUIsYTs7O3dCQUNGO0FBQ2YsWUFBTSxJQUFJLFNBQUosQ0FBYyxnREFBZCxDQUFOO0FBQ0Q7OztBQUVELDJCQUFhO0FBQUE7QUFBRTs7Ozs7a0JBTEksYTs7O0FDTnJCOzs7Ozs7Ozs7Ozs7OztBQWNBOzs7Ozs7OztBQUVBOzs7O0FBQ0E7Ozs7Ozs7O0lBRU0sVTtBQUNKLHdCQUFhO0FBQUE7O0FBQ1gsUUFBTSxlQUFlLFNBQVMsY0FBVCxDQUF3QixNQUF4QixDQUFyQjtBQUNBLFNBQUssWUFBTCxHQUFvQixhQUFhLE9BQWIsQ0FBcUIsSUFBekM7O0FBRUEsUUFBTSxhQUFhLGdDQUFuQjs7QUFLQSxTQUFLLFdBQUwsQ0FBaUIsVUFBakI7QUFDRDs7OztnQ0FFVyxVLEVBQVc7QUFBQTs7QUFDckIsaUJBQVcsR0FBWCxDQUFlLFVBQUMsS0FBRDtBQUFBLGVBQVcsTUFBSyxRQUFMLENBQWMsS0FBZCxDQUFYO0FBQUEsT0FBZjtBQUNEOzs7NkJBRVEsSyxFQUFNO0FBQ2IsVUFBRyxLQUFLLFlBQUwsS0FBc0IsTUFBTSxJQUEvQixFQUFxQyxJQUFJLEtBQUo7QUFDdEM7Ozs7OztrQkFHWSxVOzs7OztBQ3hDZjs7Ozs7O0FBRUEsRUFBRSxZQUFNO0FBQ047QUFDRCxDQUZELEUsQ0FIQTs7O0FD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QUFNLFFBQVEsRUFBRSxRQUFGLENBQWQ7QUFDQSxZQUFNLFFBQU4sQ0FBZSxNQUFmOztBQUVBLGlCQUFXLFlBQUk7QUFDYixjQUFNLFdBQU4sQ0FBa0IsUUFBbEI7QUFDQSxjQUFNLE1BQU4sQ0FBYSxRQUFiO0FBQ0EsY0FBTSxJQUFOLENBQVcsV0FBWCxFQUF3QixVQUF4QjtBQUNELE9BSkQsRUFJRyxDQUpIOztBQU1BLFlBQU0sRUFBTixDQUFTLE9BQVQsRUFBa0IsVUFBQyxDQUFELEVBQUs7QUFDckIsY0FBTSxRQUFOLENBQWUsUUFBZjtBQUNBLGNBQU0sV0FBTixDQUFrQixNQUFsQjtBQUNBLG1CQUFXLFlBQU07QUFDZixnQkFBTSxLQUFOO0FBQ0EsZ0JBQU0sTUFBTjtBQUNELFNBSEQsRUFHRyxDQUhIO0FBSUQsT0FQRDtBQVFEOzs7Ozs7a0JBeERrQixlIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsIi8qKlxuICogWW91IGRvbid0IG5lZWQgdG8gZWRpdCB0aGlzIGZpbGUuXG4gKi9cblxuXCJ1c2Ugc3RyaWN0XCI7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEFwcENvbnRyb2xsZXIge1xuICBzdGF0aWMgZ2V0IHBhZ2UoKXtcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKFwic3RhdGljIGdldHRlciBtZXRob2QgJ3BhZ2UnIGlzIG5vdCBpbXBsZW1lbnRlZFwiKTtcbiAgfVxuICBcbiAgY29uc3RydWN0b3IoKXt9XG59XG4iLCIvKipcbiAqIFBhZ2Ugc2NyaXB0IGRpc3BhdGNoZXIuXG4gKlxuICogSW4gY2FzZSB5b3UgY3JlYXRlZCBuZXcgcGFnZSBzY3JpcHQsIGFkZCBlYWNoIG9mIHRoZSBmb2xsb3dpbmcgbGluZXNcbiAqIHRvIHRoaXMgZmlsZS5cbiAqXG4gKiArIGltcG9ydCA8bmFtZT4gZnJvbSBcIi4vcGFnZXMvWFhYWC5wYXJ0XCI7XG4gKiAgIC4uLlxuICogICBjb25zdCBrbGFzc19saXN0ID0gW1xuICogICAgIC4uLlxuICogKyAgIDxuYW1lPixcbiAqICAgXTtcbiAqL1xuXG5cInVzZSBzdHJpY3RcIjtcblxuaW1wb3J0IGluZGV4IGZyb20gXCIuL3BhZ2VzL2luZGV4LnBhcnRcIjtcbmltcG9ydCBkZXYgZnJvbSBcIi4vcGFnZXMvZGV2LnBhcnRcIjtcblxuY2xhc3MgRGlzcGF0Y2hlciB7XG4gIGNvbnN0cnVjdG9yKCl7XG4gICAgY29uc3QgbWFpbl9jb250ZW50ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJtYWluXCIpO1xuICAgIHRoaXMuY3VycmVudF9wYWdlID0gbWFpbl9jb250ZW50LmRhdGFzZXQucGFnZTtcbiAgXG4gICAgY29uc3Qga2xhc3NfbGlzdCA9IFtcbiAgICAgIGluZGV4LFxuICAgICAgZGV2LFxuICAgIF07XG4gICAgXG4gICAgdGhpcy5kaXNwYXRjaEFsbChrbGFzc19saXN0KTtcbiAgfVxuICBcbiAgZGlzcGF0Y2hBbGwoa2xhc3NfbGlzdCl7XG4gICAga2xhc3NfbGlzdC5tYXAoKGtsYXNzKSA9PiB0aGlzLmRpc3BhdGNoKGtsYXNzKSk7XG4gIH1cbiAgXG4gIGRpc3BhdGNoKGtsYXNzKXtcbiAgICBpZih0aGlzLmN1cnJlbnRfcGFnZSA9PT0ga2xhc3MucGFnZSkgbmV3IGtsYXNzKCk7XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgRGlzcGF0Y2hlcjtcbiIsIi8vIGdsb2JhbCAkLCBqUXVlcnlcbmltcG9ydCBEaXNwYXRjaGVyIGZyb20gJy4vRGlzcGF0Y2hlcic7XG5cbiQoKCkgPT4ge1xuICBuZXcgRGlzcGF0Y2hlcigpO1xufSk7XG4iLCJcInVzZSBzdHJpY3RcIjtcblxuaW1wb3J0IEFwcENvbnRyb2xsZXIgZnJvbSBcIi4uL0FwcENvbnRyb2xsZXJcIjtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRGV2Q29udHJvbGxlciBleHRlbmRzIEFwcENvbnRyb2xsZXIge1xuICBzdGF0aWMgZ2V0IHBhZ2UoKSB7XG4gICAgcmV0dXJuIFwiZGV2XCI7XG4gIH1cbiAgXG4gIGNvbnN0cnVjdG9yKCl7XG4gICAgc3VwZXIoKTtcbiAgICBcbiAgICB0aGlzLnNpZGViYXJMb2dvID0gJChcIi5zaWRlYmFyLWxvZ28gPiBpbWdcIik7XG4gICAgdGhpcy5zaWRlYmFyTWVudSA9ICQoXCIuc2lkZWJhci1tZW51IHVsLm5hdiA+IGxpXCIpO1xuICAgIHRoaXMuc2lkZWJhclRvZ2dsZSA9ICQoXCIuc2lkZWJhci10b2dnbGVcIik7XG4gICAgXG4gICAgdGhpcy5zZXRNZW51QW5pbWUoKTtcbiAgICB0aGlzLnNldE1lbnVUb2dnbGVFdmVudCgpO1xuICAgIFxuICAgIHRoaXMuc2lkZWJhckxvZ28ub24oXCJjbGlja1wiLCAoZSkgPT4ge1xuICAgICAgd2luZG93LmxvY2F0aW9uID0gXCIuLi8uLi9cIjtcbiAgICB9KTtcbiAgICBcbiAgICAkKFwiI3NpZGViYXItYXJlYVwiKS5uaWNlU2Nyb2xsKCk7XG4gICAgJChcIiNjb250ZW50LWFyZWFcIikubmljZVNjcm9sbCh7YXV0b2hpZGVtb2RlOiBcImhpZGRlblwifSk7XG4gIFxuICAgIGNvbnN0IGlucHV0ID0gJChcIi5zd2l0Y2hlciAuaW5wdXRcIik7XG4gICAgY29uc3QgZGV2ID0gJChcIi5zd2l0Y2hlciAuZGV2XCIpO1xuICAgIGNvbnN0IG91dHB1dCA9ICQoXCIuc3dpdGNoZXIgLm91dHB1dFwiKTtcbiAgXG4gICAgbGV0IGN1cnJlbnRJbWFnZSA9IDA7XG4gICAgbGV0IHRpbWVyID0gc2V0SW50ZXJ2YWwoKCkgPT4ge1xuICAgICAgaWYoY3VycmVudEltYWdlID09PSAwKSBkZXYudHJpZ2dlcihcImNsaWNrXCIsIFwiYXV0b1wiKTtcbiAgICAgIGlmKGN1cnJlbnRJbWFnZSA9PT0gMSkgb3V0cHV0LnRyaWdnZXIoXCJjbGlja1wiLCBcImF1dG9cIik7XG4gICAgICBpZihjdXJyZW50SW1hZ2UgPT09IDIpIGlucHV0LnRyaWdnZXIoXCJjbGlja1wiLCBcImF1dG9cIik7XG4gICAgICBjdXJyZW50SW1hZ2UgPSArK2N1cnJlbnRJbWFnZSAlIDM7XG4gICAgfSwgMzAwMCk7XG4gICAgXG4gICAgY29uc3Qgc2hvd0lucHV0SW1hZ2UgPSAoZSkgPT4ge1xuICAgICAgJChcIi5vdmVydmlldy1pbWFnZSAuc3dpdGNoZXIgLmJ0blwiKS5yZW1vdmVDbGFzcyhcIm91dFwiKS5yZW1vdmVDbGFzcyhcImRldlwiKTtcbiAgICAgICQoXCIub3ZlcnZpZXctaW1hZ2UgLnNvdXJjZS1zYW1wbGVcIikucmVtb3ZlQ2xhc3MoXCJoaWRkZW5cIik7XG4gICAgICAkKFwiLm92ZXJ2aWV3LWltYWdlIC5kZXYtc2FtcGxlXCIpLmFkZENsYXNzKFwiaGlkZGVuXCIpO1xuICAgICAgJChcIi5vdmVydmlldy1pbWFnZSAucmVzdWx0LXNhbXBsZVwiKS5hZGRDbGFzcyhcImhpZGRlblwiKTtcbiAgICB9O1xuICAgIFxuICAgIGNvbnN0IHNob3dEZXZJbWFnZSA9IChlKSA9PiB7XG4gICAgICAkKFwiLm92ZXJ2aWV3LWltYWdlIC5zd2l0Y2hlciAuYnRuXCIpLnJlbW92ZUNsYXNzKFwib3V0XCIpLmFkZENsYXNzKFwiZGV2XCIpO1xuICAgICAgJChcIi5vdmVydmlldy1pbWFnZSAuc291cmNlLXNhbXBsZVwiKS5hZGRDbGFzcyhcImhpZGRlblwiKTtcbiAgICAgICQoXCIub3ZlcnZpZXctaW1hZ2UgLmRldi1zYW1wbGVcIikucmVtb3ZlQ2xhc3MoXCJoaWRkZW5cIik7XG4gICAgICAkKFwiLm92ZXJ2aWV3LWltYWdlIC5yZXN1bHQtc2FtcGxlXCIpLmFkZENsYXNzKFwiaGlkZGVuXCIpO1xuICAgIH07XG4gIFxuICAgIGNvbnN0IHNob3dPdXRwdXRJbWFnZSA9IChlKSA9PiB7XG4gICAgICAkKFwiLm92ZXJ2aWV3LWltYWdlIC5zd2l0Y2hlciAuYnRuXCIpLnJlbW92ZUNsYXNzKFwiZGV2XCIpLmFkZENsYXNzKFwib3V0XCIpO1xuICAgICAgJChcIi5vdmVydmlldy1pbWFnZSAuc291cmNlLXNhbXBsZVwiKS5hZGRDbGFzcyhcImhpZGRlblwiKTtcbiAgICAgICQoXCIub3ZlcnZpZXctaW1hZ2UgLnJlc3VsdC1zYW1wbGVcIikucmVtb3ZlQ2xhc3MoXCJoaWRkZW5cIik7XG4gICAgICAkKFwiLm92ZXJ2aWV3LWltYWdlIC5kZXYtc2FtcGxlXCIpLmFkZENsYXNzKFwiaGlkZGVuXCIpO1xuICAgIH07XG4gIFxuICAgIGlucHV0Lm9uKFwiY2xpY2tcIiwgc2hvd0lucHV0SW1hZ2UpO1xuICAgIGRldi5vbihcImNsaWNrXCIsIHNob3dEZXZJbWFnZSk7XG4gICAgb3V0cHV0Lm9uKFwiY2xpY2tcIiwgc2hvd091dHB1dEltYWdlKTtcbiAgICAkKFwiLnN3aXRjaGVyIC5jbGlja2FibGVcIikub24oXCJjbGlja1wiLCAoZSwgZGF0YSkgPT4ge1xuICAgICAgaWYoZGF0YSAhPT0gXCJhdXRvXCIgJiYgdGltZXIpe1xuICAgICAgICBjbGVhclRpbWVvdXQodGltZXIpO1xuICAgICAgICB0aW1lciA9IG51bGw7XG4gICAgICB9XG4gICAgfSk7XG4gICAgXG4gICAgJChcIi5jbGlja2FibGUtaW1nXCIpLm9uKFwiY2xpY2tcIiwgKGUpID0+IHtcbiAgICAgIHdpbmRvdy5sb2NhdGlvbiA9ICQoZS50YXJnZXQpLmF0dHIoXCJzcmNcIik7XG4gICAgfSk7XG4gIH1cbiAgXG4gIHNldE1lbnVBbmltZSgpe1xuICAgIGNvbnN0IGhhbmRsZU1lbnVFdmVudCA9IChwYWdlLCBjc3NDbGFzcykgPT4ge1xuICAgICAgY29uc3QgbWVudSA9IHRoaXMuc2lkZWJhck1lbnUuZmluZChgYVtkYXRhLXBhZ2U9JyR7cGFnZX0nXWApO1xuICAgICAgbWVudS5vbihcIm1vdXNlZW50ZXJcIiwgKGUpID0+IHRoaXMuc2lkZWJhckxvZ28uYWRkQ2xhc3MoY3NzQ2xhc3MpKTtcbiAgICAgIG1lbnUub24oXCJtb3VzZWxlYXZlXCIsIChlKSA9PiB0aGlzLnNpZGViYXJMb2dvLnJlbW92ZUNsYXNzKGNzc0NsYXNzKSk7XG4gICAgfTtcbiAgXG4gICAgaGFuZGxlTWVudUV2ZW50KFwib3ZlcnZpZXdcIiwgXCJyb3RhdGU2MFwiKTtcbiAgICBoYW5kbGVNZW51RXZlbnQoXCJ1c2FnZVwiLCBcInJvdGF0ZTEyMFwiKTtcbiAgICBoYW5kbGVNZW51RXZlbnQoXCJidWlsZFwiLCBcInJvdGF0ZTE4MFwiKTtcbiAgICBoYW5kbGVNZW51RXZlbnQoXCJjb2RlX2h0bWxcIiwgXCJyb3RhdGUyNDBcIik7XG4gICAgaGFuZGxlTWVudUV2ZW50KFwiY29kZV9zdHlsZVwiLCBcInJvdGF0ZTMwMFwiKTtcbiAgICBoYW5kbGVNZW51RXZlbnQoXCJjb2RlX2pzXCIsIFwicm90YXRlMzYwXCIpO1xuICB9XG4gIFxuICBzZXRNZW51VG9nZ2xlRXZlbnQoKXtcbiAgICBjb25zdCBzaWRlYmFyQXJlYSA9ICQoXCIjc2lkZWJhci1hcmVhXCIpO1xuICAgIHRoaXMuc2lkZWJhclRvZ2dsZS5vbihcImNsaWNrXCIsIChlKSA9PiB7XG4gICAgICBzaWRlYmFyQXJlYS50b2dnbGVDbGFzcyhcImV4cGFuZFwiKTtcbiAgICB9KTtcbiAgXG4gICAgc2lkZWJhckFyZWEub24oXCJ0cmFuc2l0aW9uZW5kXCIsIChlKSA9PiB7XG4gICAgICBzaWRlYmFyQXJlYS5nZXROaWNlU2Nyb2xsKCkucmVzaXplKCk7XG4gICAgfSk7XG4gIH1cbn1cbiIsIi8vIGdsb2JhbCAkLCBqUXVlcnlcblwidXNlIHN0cmljdFwiO1xuXG5pbXBvcnQgQXBwQ29udHJvbGxlciBmcm9tIFwiLi4vQXBwQ29udHJvbGxlclwiO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBJbmRleENvbnRyb2xsZXIgZXh0ZW5kcyBBcHBDb250cm9sbGVyIHtcbiAgc3RhdGljIGdldCBwYWdlKCkge1xuICAgIHJldHVybiBcImluZGV4XCI7XG4gIH1cbiAgXG4gIGNvbnN0cnVjdG9yKCl7XG4gICAgc3VwZXIoKTtcbiAgICB0aGlzLmluaXRpYWxpemUoKTtcbiAgfVxuICBcbiAgaW5pdGlhbGl6ZSgpe1xuICAgIGNvbnN0IGJ0bl9pbnN0YWxsID0gJChcIiNpbnN0YWxsXCIpO1xuICAgIGNvbnN0IGJ0bl9pbml0ID0gJChcIiNpbml0XCIpO1xuICAgIGNvbnN0IGJ0bl9kZXYgPSAkKFwiI2RldmVsb3BcIik7XG4gIFxuICAgIGJ0bl9pbnN0YWxsLm9uKFwiY2xpY2tcIiwgKGUpID0+IHtcbiAgICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICBjb25zdCB0ZW1wbGF0ZSA9ICQoXCIudGVtcGxhdGVzIC5pbnN0YWxsXCIpLndyYXAoXCI8ZGl2Lz5cIikucGFyZW50KCkuaHRtbCgpO1xuICAgICAgdGhpcy5wb3BVcCh0ZW1wbGF0ZSk7XG4gICAgfSk7XG4gIFxuICAgIGJ0bl9pbml0Lm9uKFwiY2xpY2tcIiwgKGUpID0+IHtcbiAgICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICBjb25zdCB0ZW1wbGF0ZSA9ICQoXCIudGVtcGxhdGVzIC5pbml0XCIpLndyYXAoXCI8ZGl2Lz5cIikucGFyZW50KCkuaHRtbCgpO1xuICAgICAgdGhpcy5wb3BVcCh0ZW1wbGF0ZSk7XG4gICAgfSk7XG4gIFxuICAgIGJ0bl9kZXYub24oXCJjbGlja1wiLCAoZSkgPT4ge1xuICAgICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAgIGNvbnN0IHRlbXBsYXRlID0gJChcIi50ZW1wbGF0ZXMgLmRldmVsb3BcIikud3JhcChcIjxkaXYvPlwiKS5wYXJlbnQoKS5odG1sKCk7XG4gICAgICB0aGlzLnBvcFVwKHRlbXBsYXRlKTtcbiAgICB9KTtcbiAgfVxuICBcbiAgcG9wVXAodGVtcGxhdGUpe1xuICAgIGNvbnN0IGxheWVyID0gJChcIjxkaXY+XCIpO1xuICAgIGxheWVyLmFkZENsYXNzKFwibGF5ZXJcIik7XG4gICAgJChcImJvZHkgI21haW5cIikuYXBwZW5kKGxheWVyKTtcbiAgXG4gICAgY29uc3QgcG9wdXAgPSAkKFwiLnBvcHVwXCIpO1xuICAgIGxheWVyLmFkZENsYXNzKFwiZGFya1wiKTtcbiAgXG4gICAgc2V0VGltZW91dCgoKT0+e1xuICAgICAgcG9wdXAucmVtb3ZlQ2xhc3MoXCJoaWRkZW5cIik7XG4gICAgICBwb3B1cC5hcHBlbmQodGVtcGxhdGUpO1xuICAgICAgcG9wdXAuZmluZChcIi50ZW1wbGF0ZVwiKS5uaWNlU2Nyb2xsKCk7XG4gICAgfSwgMCk7XG5cbiAgICBsYXllci5vbihcImNsaWNrXCIsIChlKT0+e1xuICAgICAgcG9wdXAuYWRkQ2xhc3MoXCJoaWRkZW5cIik7XG4gICAgICBsYXllci5yZW1vdmVDbGFzcyhcImRhcmtcIik7XG4gICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgcG9wdXAuZW1wdHkoKTtcbiAgICAgICAgbGF5ZXIucmVtb3ZlKCk7XG4gICAgICB9LCAwKTtcbiAgICB9KTtcbiAgfVxufVxuIl19
