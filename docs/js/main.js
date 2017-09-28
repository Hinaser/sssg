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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJsaWIvdGVtcGxhdGVzL3JlYWRtZS9zcmMvanMvQXBwQ29udHJvbGxlci5qcyIsImxpYi90ZW1wbGF0ZXMvcmVhZG1lL3NyYy9qcy9EaXNwYXRjaGVyLmpzIiwibGliL3RlbXBsYXRlcy9yZWFkbWUvc3JjL2pzL21haW4uanMiLCJsaWIvdGVtcGxhdGVzL3JlYWRtZS9zcmMvanMvcGFnZXMvZGV2LnBhcnQuanMiLCJsaWIvdGVtcGxhdGVzL3JlYWRtZS9zcmMvanMvcGFnZXMvaW5kZXgucGFydC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQ0FBOzs7O0FBSUE7Ozs7Ozs7Ozs7SUFFcUIsYTs7O3dCQUNGO0FBQ2YsWUFBTSxJQUFJLFNBQUosQ0FBYyxnREFBZCxDQUFOO0FBQ0Q7OztBQUVELDJCQUFhO0FBQUE7QUFBRTs7Ozs7a0JBTEksYTs7O0FDTnJCOzs7Ozs7Ozs7Ozs7OztBQWNBOzs7Ozs7OztBQUVBOzs7O0FBQ0E7Ozs7Ozs7O0lBRU0sVTtBQUNKLHdCQUFhO0FBQUE7O0FBQ1gsUUFBTSxlQUFlLFNBQVMsY0FBVCxDQUF3QixNQUF4QixDQUFyQjtBQUNBLFNBQUssWUFBTCxHQUFvQixhQUFhLE9BQWIsQ0FBcUIsSUFBekM7O0FBRUEsUUFBTSxhQUFhLGdDQUFuQjs7QUFLQSxTQUFLLFdBQUwsQ0FBaUIsVUFBakI7QUFDRDs7OztnQ0FFVyxVLEVBQVc7QUFBQTs7QUFDckIsaUJBQVcsR0FBWCxDQUFlLFVBQUMsS0FBRDtBQUFBLGVBQVcsTUFBSyxRQUFMLENBQWMsS0FBZCxDQUFYO0FBQUEsT0FBZjtBQUNEOzs7NkJBRVEsSyxFQUFNO0FBQ2IsVUFBRyxLQUFLLFlBQUwsS0FBc0IsTUFBTSxJQUEvQixFQUFxQyxJQUFJLEtBQUo7QUFDdEM7Ozs7OztrQkFHWSxVOzs7OztBQ3hDZjs7Ozs7O0FBRUEsRUFBRSxZQUFNO0FBQ047QUFDRCxDQUZELEUsQ0FIQTs7O0FD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LFdBQVgsRUFBd0IsVUFBeEI7QUFDRCxPQUpELEVBSUcsQ0FKSDs7QUFNQSxZQUFNLEVBQU4sQ0FBUyxPQUFULEVBQWtCLFVBQUMsQ0FBRCxFQUFLO0FBQ3JCLGNBQU0sUUFBTixDQUFlLFFBQWY7QUFDQSxjQUFNLFdBQU4sQ0FBa0IsTUFBbEI7QUFDQSxtQkFBVyxZQUFNO0FBQ2YsZ0JBQU0sS0FBTjtBQUNBLGdCQUFNLE1BQU47QUFDRCxTQUhELEVBR0csQ0FISDtBQUlELE9BUEQ7QUFRRDs7Ozs7O2tCQXhEa0IsZSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCIvKipcbiAqIFlvdSBkb24ndCBuZWVkIHRvIGVkaXQgdGhpcyBmaWxlLlxuICovXG5cblwidXNlIHN0cmljdFwiO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBBcHBDb250cm9sbGVyIHtcbiAgc3RhdGljIGdldCBwYWdlKCl7XG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcihcInN0YXRpYyBnZXR0ZXIgbWV0aG9kICdwYWdlJyBpcyBub3QgaW1wbGVtZW50ZWRcIik7XG4gIH1cbiAgXG4gIGNvbnN0cnVjdG9yKCl7fVxufVxuIiwiLyoqXG4gKiBQYWdlIHNjcmlwdCBkaXNwYXRjaGVyLlxuICpcbiAqIEluIGNhc2UgeW91IGNyZWF0ZWQgbmV3IHBhZ2Ugc2NyaXB0LCBhZGQgZWFjaCBvZiB0aGUgZm9sbG93aW5nIGxpbmVzXG4gKiB0byB0aGlzIGZpbGUuXG4gKlxuICogKyBpbXBvcnQgPG5hbWU+IGZyb20gXCIuL3BhZ2VzL1hYWFgucGFydFwiO1xuICogICAuLi5cbiAqICAgY29uc3Qga2xhc3NfbGlzdCA9IFtcbiAqICAgICAuLi5cbiAqICsgICA8bmFtZT4sXG4gKiAgIF07XG4gKi9cblxuXCJ1c2Ugc3RyaWN0XCI7XG5cbmltcG9ydCBpbmRleCBmcm9tIFwiLi9wYWdlcy9pbmRleC5wYXJ0XCI7XG5pbXBvcnQgZGV2IGZyb20gXCIuL3BhZ2VzL2Rldi5wYXJ0XCI7XG5cbmNsYXNzIERpc3BhdGNoZXIge1xuICBjb25zdHJ1Y3Rvcigpe1xuICAgIGNvbnN0IG1haW5fY29udGVudCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwibWFpblwiKTtcbiAgICB0aGlzLmN1cnJlbnRfcGFnZSA9IG1haW5fY29udGVudC5kYXRhc2V0LnBhZ2U7XG4gIFxuICAgIGNvbnN0IGtsYXNzX2xpc3QgPSBbXG4gICAgICBpbmRleCxcbiAgICAgIGRldixcbiAgICBdO1xuICAgIFxuICAgIHRoaXMuZGlzcGF0Y2hBbGwoa2xhc3NfbGlzdCk7XG4gIH1cbiAgXG4gIGRpc3BhdGNoQWxsKGtsYXNzX2xpc3Qpe1xuICAgIGtsYXNzX2xpc3QubWFwKChrbGFzcykgPT4gdGhpcy5kaXNwYXRjaChrbGFzcykpO1xuICB9XG4gIFxuICBkaXNwYXRjaChrbGFzcyl7XG4gICAgaWYodGhpcy5jdXJyZW50X3BhZ2UgPT09IGtsYXNzLnBhZ2UpIG5ldyBrbGFzcygpO1xuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IERpc3BhdGNoZXI7XG4iLCIvLyBnbG9iYWwgJCwgalF1ZXJ5XG5pbXBvcnQgRGlzcGF0Y2hlciBmcm9tICcuL0Rpc3BhdGNoZXInO1xuXG4kKCgpID0+IHtcbiAgbmV3IERpc3BhdGNoZXIoKTtcbn0pO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbmltcG9ydCBBcHBDb250cm9sbGVyIGZyb20gXCIuLi9BcHBDb250cm9sbGVyXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIERldkNvbnRyb2xsZXIgZXh0ZW5kcyBBcHBDb250cm9sbGVyIHtcbiAgc3RhdGljIGdldCBwYWdlKCkge1xuICAgIHJldHVybiBcImRldlwiO1xuICB9XG4gIFxuICBjb25zdHJ1Y3Rvcigpe1xuICAgIHN1cGVyKCk7XG4gICAgXG4gICAgdGhpcy5zaWRlYmFyTG9nbyA9ICQoXCIuc2lkZWJhci1sb2dvID4gaW1nXCIpO1xuICAgIHRoaXMuc2lkZWJhck1lbnUgPSAkKFwiLnNpZGViYXItbWVudSB1bC5uYXYgPiBsaVwiKTtcbiAgICB0aGlzLnNpZGViYXJUb2dnbGUgPSAkKFwiLnNpZGViYXItdG9nZ2xlXCIpO1xuICAgIFxuICAgIHRoaXMuc2V0TWVudUFuaW1lKCk7XG4gICAgdGhpcy5zZXRNZW51VG9nZ2xlRXZlbnQoKTtcbiAgICBcbiAgICB0aGlzLnNpZGViYXJMb2dvLm9uKFwiY2xpY2tcIiwgKGUpID0+IHtcbiAgICAgIHdpbmRvdy5sb2NhdGlvbiA9IFwiLi4vLi4vXCI7XG4gICAgfSk7XG4gICAgXG4gICAgJChcIiNzaWRlYmFyLWFyZWFcIikubmljZVNjcm9sbCgpO1xuICAgICQoXCIjY29udGVudC1hcmVhXCIpLm5pY2VTY3JvbGwoe2F1dG9oaWRlbW9kZTogXCJoaWRkZW5cIn0pO1xuICBcbiAgICBjb25zdCBpbnB1dCA9ICQoXCIuc3dpdGNoZXIgLmlucHV0XCIpO1xuICAgIGNvbnN0IGRldiA9ICQoXCIuc3dpdGNoZXIgLmRldlwiKTtcbiAgICBjb25zdCBvdXRwdXQgPSAkKFwiLnN3aXRjaGVyIC5vdXRwdXRcIik7XG4gIFxuICAgIGxldCBjdXJyZW50SW1hZ2UgPSAwO1xuICAgIGxldCB0aW1lciA9IHNldEludGVydmFsKCgpID0+IHtcbiAgICAgIGlmKGN1cnJlbnRJbWFnZSA9PT0gMCkgZGV2LnRyaWdnZXIoXCJjbGlja1wiLCBcImF1dG9cIik7XG4gICAgICBpZihjdXJyZW50SW1hZ2UgPT09IDEpIG91dHB1dC50cmlnZ2VyKFwiY2xpY2tcIiwgXCJhdXRvXCIpO1xuICAgICAgaWYoY3VycmVudEltYWdlID09PSAyKSBpbnB1dC50cmlnZ2VyKFwiY2xpY2tcIiwgXCJhdXRvXCIpO1xuICAgICAgY3VycmVudEltYWdlID0gKytjdXJyZW50SW1hZ2UgJSAzO1xuICAgIH0sIDMwMDApO1xuICAgIFxuICAgIGNvbnN0IHNob3dJbnB1dEltYWdlID0gKGUpID0+IHtcbiAgICAgICQoXCIub3ZlcnZpZXctaW1hZ2UgLnN3aXRjaGVyIC5idG5cIikucmVtb3ZlQ2xhc3MoXCJvdXRcIikucmVtb3ZlQ2xhc3MoXCJkZXZcIik7XG4gICAgICAkKFwiLm92ZXJ2aWV3LWltYWdlIC5zb3VyY2Utc2FtcGxlXCIpLnJlbW92ZUNsYXNzKFwiaGlkZGVuXCIpO1xuICAgICAgJChcIi5vdmVydmlldy1pbWFnZSAuZGV2LXNhbXBsZVwiKS5hZGRDbGFzcyhcImhpZGRlblwiKTtcbiAgICAgICQoXCIub3ZlcnZpZXctaW1hZ2UgLnJlc3VsdC1zYW1wbGVcIikuYWRkQ2xhc3MoXCJoaWRkZW5cIik7XG4gICAgfTtcbiAgICBcbiAgICBjb25zdCBzaG93RGV2SW1hZ2UgPSAoZSkgPT4ge1xuICAgICAgJChcIi5vdmVydmlldy1pbWFnZSAuc3dpdGNoZXIgLmJ0blwiKS5yZW1vdmVDbGFzcyhcIm91dFwiKS5hZGRDbGFzcyhcImRldlwiKTtcbiAgICAgICQoXCIub3ZlcnZpZXctaW1hZ2UgLnNvdXJjZS1zYW1wbGVcIikuYWRkQ2xhc3MoXCJoaWRkZW5cIik7XG4gICAgICAkKFwiLm92ZXJ2aWV3LWltYWdlIC5kZXYtc2FtcGxlXCIpLnJlbW92ZUNsYXNzKFwiaGlkZGVuXCIpO1xuICAgICAgJChcIi5vdmVydmlldy1pbWFnZSAucmVzdWx0LXNhbXBsZVwiKS5hZGRDbGFzcyhcImhpZGRlblwiKTtcbiAgICB9O1xuICBcbiAgICBjb25zdCBzaG93T3V0cHV0SW1hZ2UgPSAoZSkgPT4ge1xuICAgICAgJChcIi5vdmVydmlldy1pbWFnZSAuc3dpdGNoZXIgLmJ0blwiKS5yZW1vdmVDbGFzcyhcImRldlwiKS5hZGRDbGFzcyhcIm91dFwiKTtcbiAgICAgICQoXCIub3ZlcnZpZXctaW1hZ2UgLnNvdXJjZS1zYW1wbGVcIikuYWRkQ2xhc3MoXCJoaWRkZW5cIik7XG4gICAgICAkKFwiLm92ZXJ2aWV3LWltYWdlIC5yZXN1bHQtc2FtcGxlXCIpLnJlbW92ZUNsYXNzKFwiaGlkZGVuXCIpO1xuICAgICAgJChcIi5vdmVydmlldy1pbWFnZSAuZGV2LXNhbXBsZVwiKS5hZGRDbGFzcyhcImhpZGRlblwiKTtcbiAgICB9O1xuICBcbiAgICBpbnB1dC5vbihcImNsaWNrXCIsIHNob3dJbnB1dEltYWdlKTtcbiAgICBkZXYub24oXCJjbGlja1wiLCBzaG93RGV2SW1hZ2UpO1xuICAgIG91dHB1dC5vbihcImNsaWNrXCIsIHNob3dPdXRwdXRJbWFnZSk7XG4gICAgJChcIi5zd2l0Y2hlciAuY2xpY2thYmxlXCIpLm9uKFwiY2xpY2tcIiwgKGUsIGRhdGEpID0+IHtcbiAgICAgIGlmKGRhdGEgIT09IFwiYXV0b1wiICYmIHRpbWVyKXtcbiAgICAgICAgY2xlYXJUaW1lb3V0KHRpbWVyKTtcbiAgICAgICAgdGltZXIgPSBudWxsO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG4gIFxuICBzZXRNZW51QW5pbWUoKXtcbiAgICBjb25zdCBoYW5kbGVNZW51RXZlbnQgPSAocGFnZSwgY3NzQ2xhc3MpID0+IHtcbiAgICAgIGNvbnN0IG1lbnUgPSB0aGlzLnNpZGViYXJNZW51LmZpbmQoYGFbZGF0YS1wYWdlPScke3BhZ2V9J11gKTtcbiAgICAgIG1lbnUub24oXCJtb3VzZWVudGVyXCIsIChlKSA9PiB0aGlzLnNpZGViYXJMb2dvLmFkZENsYXNzKGNzc0NsYXNzKSk7XG4gICAgICBtZW51Lm9uKFwibW91c2VsZWF2ZVwiLCAoZSkgPT4gdGhpcy5zaWRlYmFyTG9nby5yZW1vdmVDbGFzcyhjc3NDbGFzcykpO1xuICAgIH07XG4gIFxuICAgIGhhbmRsZU1lbnVFdmVudChcIm92ZXJ2aWV3XCIsIFwicm90YXRlNjBcIik7XG4gICAgaGFuZGxlTWVudUV2ZW50KFwidXNhZ2VcIiwgXCJyb3RhdGUxMjBcIik7XG4gICAgaGFuZGxlTWVudUV2ZW50KFwiYnVpbGRcIiwgXCJyb3RhdGUxODBcIik7XG4gICAgaGFuZGxlTWVudUV2ZW50KFwiY29kZV9odG1sXCIsIFwicm90YXRlMjQwXCIpO1xuICAgIGhhbmRsZU1lbnVFdmVudChcImNvZGVfc3R5bGVcIiwgXCJyb3RhdGUzMDBcIik7XG4gICAgaGFuZGxlTWVudUV2ZW50KFwiY29kZV9qc1wiLCBcInJvdGF0ZTM2MFwiKTtcbiAgfVxuICBcbiAgc2V0TWVudVRvZ2dsZUV2ZW50KCl7XG4gICAgY29uc3Qgc2lkZWJhckFyZWEgPSAkKFwiI3NpZGViYXItYXJlYVwiKTtcbiAgICB0aGlzLnNpZGViYXJUb2dnbGUub24oXCJjbGlja1wiLCAoZSkgPT4ge1xuICAgICAgc2lkZWJhckFyZWEudG9nZ2xlQ2xhc3MoXCJleHBhbmRcIik7XG4gICAgfSk7XG4gIFxuICAgIHNpZGViYXJBcmVhLm9uKFwidHJhbnNpdGlvbmVuZFwiLCAoZSkgPT4ge1xuICAgICAgc2lkZWJhckFyZWEuZ2V0TmljZVNjcm9sbCgpLnJlc2l6ZSgpO1xuICAgIH0pO1xuICB9XG59XG4iLCIvLyBnbG9iYWwgJCwgalF1ZXJ5XG5cInVzZSBzdHJpY3RcIjtcblxuaW1wb3J0IEFwcENvbnRyb2xsZXIgZnJvbSBcIi4uL0FwcENvbnRyb2xsZXJcIjtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgSW5kZXhDb250cm9sbGVyIGV4dGVuZHMgQXBwQ29udHJvbGxlciB7XG4gIHN0YXRpYyBnZXQgcGFnZSgpIHtcbiAgICByZXR1cm4gXCJpbmRleFwiO1xuICB9XG4gIFxuICBjb25zdHJ1Y3Rvcigpe1xuICAgIHN1cGVyKCk7XG4gICAgdGhpcy5pbml0aWFsaXplKCk7XG4gIH1cbiAgXG4gIGluaXRpYWxpemUoKXtcbiAgICBjb25zdCBidG5faW5zdGFsbCA9ICQoXCIjaW5zdGFsbFwiKTtcbiAgICBjb25zdCBidG5faW5pdCA9ICQoXCIjaW5pdFwiKTtcbiAgICBjb25zdCBidG5fZGV2ID0gJChcIiNkZXZlbG9wXCIpO1xuICBcbiAgICBidG5faW5zdGFsbC5vbihcImNsaWNrXCIsIChlKSA9PiB7XG4gICAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xuICAgICAgY29uc3QgdGVtcGxhdGUgPSAkKFwiLnRlbXBsYXRlcyAuaW5zdGFsbFwiKS53cmFwKFwiPGRpdi8+XCIpLnBhcmVudCgpLmh0bWwoKTtcbiAgICAgIHRoaXMucG9wVXAodGVtcGxhdGUpO1xuICAgIH0pO1xuICBcbiAgICBidG5faW5pdC5vbihcImNsaWNrXCIsIChlKSA9PiB7XG4gICAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xuICAgICAgY29uc3QgdGVtcGxhdGUgPSAkKFwiLnRlbXBsYXRlcyAuaW5pdFwiKS53cmFwKFwiPGRpdi8+XCIpLnBhcmVudCgpLmh0bWwoKTtcbiAgICAgIHRoaXMucG9wVXAodGVtcGxhdGUpO1xuICAgIH0pO1xuICBcbiAgICBidG5fZGV2Lm9uKFwiY2xpY2tcIiwgKGUpID0+IHtcbiAgICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICBjb25zdCB0ZW1wbGF0ZSA9ICQoXCIudGVtcGxhdGVzIC5kZXZlbG9wXCIpLndyYXAoXCI8ZGl2Lz5cIikucGFyZW50KCkuaHRtbCgpO1xuICAgICAgdGhpcy5wb3BVcCh0ZW1wbGF0ZSk7XG4gICAgfSk7XG4gIH1cbiAgXG4gIHBvcFVwKHRlbXBsYXRlKXtcbiAgICBjb25zdCBsYXllciA9ICQoXCI8ZGl2PlwiKTtcbiAgICBsYXllci5hZGRDbGFzcyhcImxheWVyXCIpO1xuICAgICQoXCJib2R5ICNtYWluXCIpLmFwcGVuZChsYXllcik7XG4gIFxuICAgIGNvbnN0IHBvcHVwID0gJChcIi5wb3B1cFwiKTtcbiAgICBsYXllci5hZGRDbGFzcyhcImRhcmtcIik7XG4gIFxuICAgIHNldFRpbWVvdXQoKCk9PntcbiAgICAgIHBvcHVwLnJlbW92ZUNsYXNzKFwiaGlkZGVuXCIpO1xuICAgICAgcG9wdXAuYXBwZW5kKHRlbXBsYXRlKTtcbiAgICAgIHBvcHVwLmZpbmQoXCIudGVtcGxhdGVcIikubmljZVNjcm9sbCgpO1xuICAgIH0sIDApO1xuXG4gICAgbGF5ZXIub24oXCJjbGlja1wiLCAoZSk9PntcbiAgICAgIHBvcHVwLmFkZENsYXNzKFwiaGlkZGVuXCIpO1xuICAgICAgbGF5ZXIucmVtb3ZlQ2xhc3MoXCJkYXJrXCIpO1xuICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgIHBvcHVwLmVtcHR5KCk7XG4gICAgICAgIGxheWVyLnJlbW92ZSgpO1xuICAgICAgfSwgMCk7XG4gICAgfSk7XG4gIH1cbn1cbiJdfQ==
