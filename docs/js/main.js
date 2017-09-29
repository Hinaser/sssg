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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJsaWIvdGVtcGxhdGVzL3JlYWRtZS9zcmMvanMvQXBwQ29udHJvbGxlci5qcyIsImxpYi90ZW1wbGF0ZXMvcmVhZG1lL3NyYy9qcy9EaXNwYXRjaGVyLmpzIiwibGliL3RlbXBsYXRlcy9yZWFkbWUvc3JjL2pzL21haW4uanMiLCJsaWIvdGVtcGxhdGVzL3JlYWRtZS9zcmMvanMvcGFnZXMvZGV2LnBhcnQuanMiLCJsaWIvdGVtcGxhdGVzL3JlYWRtZS9zcmMvanMvcGFnZXMvaW5kZXgucGFydC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQ0FBOzs7O0FBSUE7Ozs7Ozs7Ozs7SUFFcUIsYTs7O3dCQUNGO0FBQ2YsWUFBTSxJQUFJLFNBQUosQ0FBYyxnREFBZCxDQUFOO0FBQ0Q7OztBQUVELDJCQUFhO0FBQUE7QUFBRTs7Ozs7a0JBTEksYTs7O0FDTnJCOzs7Ozs7Ozs7Ozs7OztBQWNBOzs7Ozs7OztBQUVBOzs7O0FBQ0E7Ozs7Ozs7O0lBRU0sVTtBQUNKLHdCQUFhO0FBQUE7O0FBQ1gsUUFBTSxlQUFlLFNBQVMsY0FBVCxDQUF3QixNQUF4QixDQUFyQjtBQUNBLFNBQUssWUFBTCxHQUFvQixhQUFhLE9BQWIsQ0FBcUIsSUFBekM7O0FBRUEsUUFBTSxhQUFhLGdDQUFuQjs7QUFLQSxTQUFLLFdBQUwsQ0FBaUIsVUFBakI7QUFDRDs7OztnQ0FFVyxVLEVBQVc7QUFBQTs7QUFDckIsaUJBQVcsR0FBWCxDQUFlLFVBQUMsS0FBRDtBQUFBLGVBQVcsTUFBSyxRQUFMLENBQWMsS0FBZCxDQUFYO0FBQUEsT0FBZjtBQUNEOzs7NkJBRVEsSyxFQUFNO0FBQ2IsVUFBRyxLQUFLLFlBQUwsS0FBc0IsTUFBTSxJQUEvQixFQUFxQyxJQUFJLEtBQUo7QUFDdEM7Ozs7OztrQkFHWSxVOzs7OztBQ3hDZjs7Ozs7O0FBRUEsRUFBRSxZQUFNO0FBQ047QUFDRCxDQUZELEUsQ0FIQTs7O0FD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Q0FBdUIsS0FBdkI7O0FBRUEsVUFBTSxRQUFRLEVBQUUsUUFBRixDQUFkO0FBQ0EsWUFBTSxRQUFOLENBQWUsTUFBZjs7QUFFQSxpQkFBVyxZQUFJO0FBQ2IsY0FBTSxXQUFOLENBQWtCLFFBQWxCO0FBQ0EsY0FBTSxNQUFOLENBQWEsUUFBYjtBQUNBLGNBQU0sSUFBTixDQUFXLFdBQVgsRUFBd0IsVUFBeEI7QUFDRCxPQUpELEVBSUcsQ0FKSDs7QUFNQSxZQUFNLEVBQU4sQ0FBUyxPQUFULEVBQWtCLFVBQUMsQ0FBRCxFQUFLO0FBQ3JCLGNBQU0sUUFBTixDQUFlLFFBQWY7QUFDQSxjQUFNLFdBQU4sQ0FBa0IsTUFBbEI7QUFDQSxtQkFBVyxZQUFNO0FBQ2YsZ0JBQU0sS0FBTjtBQUNBLGdCQUFNLE1BQU47QUFDRCxTQUhELEVBR0csQ0FISDtBQUlELE9BUEQ7QUFRRDs7Ozs7O2tCQXhEa0IsZSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCIvKipcbiAqIFlvdSBkb24ndCBuZWVkIHRvIGVkaXQgdGhpcyBmaWxlLlxuICovXG5cblwidXNlIHN0cmljdFwiO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBBcHBDb250cm9sbGVyIHtcbiAgc3RhdGljIGdldCBwYWdlKCl7XG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcihcInN0YXRpYyBnZXR0ZXIgbWV0aG9kICdwYWdlJyBpcyBub3QgaW1wbGVtZW50ZWRcIik7XG4gIH1cbiAgXG4gIGNvbnN0cnVjdG9yKCl7fVxufVxuIiwiLyoqXG4gKiBQYWdlIHNjcmlwdCBkaXNwYXRjaGVyLlxuICpcbiAqIEluIGNhc2UgeW91IGNyZWF0ZWQgbmV3IHBhZ2Ugc2NyaXB0LCBhZGQgZWFjaCBvZiB0aGUgZm9sbG93aW5nIGxpbmVzXG4gKiB0byB0aGlzIGZpbGUuXG4gKlxuICogKyBpbXBvcnQgPG5hbWU+IGZyb20gXCIuL3BhZ2VzL1hYWFgucGFydFwiO1xuICogICAuLi5cbiAqICAgY29uc3Qga2xhc3NfbGlzdCA9IFtcbiAqICAgICAuLi5cbiAqICsgICA8bmFtZT4sXG4gKiAgIF07XG4gKi9cblxuXCJ1c2Ugc3RyaWN0XCI7XG5cbmltcG9ydCBpbmRleCBmcm9tIFwiLi9wYWdlcy9pbmRleC5wYXJ0XCI7XG5pbXBvcnQgZGV2IGZyb20gXCIuL3BhZ2VzL2Rldi5wYXJ0XCI7XG5cbmNsYXNzIERpc3BhdGNoZXIge1xuICBjb25zdHJ1Y3Rvcigpe1xuICAgIGNvbnN0IG1haW5fY29udGVudCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwibWFpblwiKTtcbiAgICB0aGlzLmN1cnJlbnRfcGFnZSA9IG1haW5fY29udGVudC5kYXRhc2V0LnBhZ2U7XG4gIFxuICAgIGNvbnN0IGtsYXNzX2xpc3QgPSBbXG4gICAgICBpbmRleCxcbiAgICAgIGRldixcbiAgICBdO1xuICAgIFxuICAgIHRoaXMuZGlzcGF0Y2hBbGwoa2xhc3NfbGlzdCk7XG4gIH1cbiAgXG4gIGRpc3BhdGNoQWxsKGtsYXNzX2xpc3Qpe1xuICAgIGtsYXNzX2xpc3QubWFwKChrbGFzcykgPT4gdGhpcy5kaXNwYXRjaChrbGFzcykpO1xuICB9XG4gIFxuICBkaXNwYXRjaChrbGFzcyl7XG4gICAgaWYodGhpcy5jdXJyZW50X3BhZ2UgPT09IGtsYXNzLnBhZ2UpIG5ldyBrbGFzcygpO1xuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IERpc3BhdGNoZXI7XG4iLCIvLyBnbG9iYWwgJCwgalF1ZXJ5XG5pbXBvcnQgRGlzcGF0Y2hlciBmcm9tICcuL0Rpc3BhdGNoZXInO1xuXG4kKCgpID0+IHtcbiAgbmV3IERpc3BhdGNoZXIoKTtcbn0pO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbmltcG9ydCBBcHBDb250cm9sbGVyIGZyb20gXCIuLi9BcHBDb250cm9sbGVyXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIERldkNvbnRyb2xsZXIgZXh0ZW5kcyBBcHBDb250cm9sbGVyIHtcbiAgc3RhdGljIGdldCBwYWdlKCkge1xuICAgIHJldHVybiBcImRldlwiO1xuICB9XG4gIFxuICBjb25zdHJ1Y3Rvcigpe1xuICAgIHN1cGVyKCk7XG4gICAgXG4gICAgdGhpcy5zaWRlYmFyTG9nbyA9ICQoXCIuc2lkZWJhci1sb2dvID4gaW1nXCIpO1xuICAgIHRoaXMuc2lkZWJhck1lbnUgPSAkKFwiLnNpZGViYXItbWVudSB1bC5uYXYgPiBsaVwiKTtcbiAgICB0aGlzLnNpZGViYXJUb2dnbGUgPSAkKFwiLnNpZGViYXItdG9nZ2xlXCIpO1xuICAgIFxuICAgIHRoaXMuc2V0TWVudUFuaW1lKCk7XG4gICAgdGhpcy5zZXRNZW51VG9nZ2xlRXZlbnQoKTtcbiAgICBcbiAgICB0aGlzLnNpZGViYXJMb2dvLm9uKFwiY2xpY2tcIiwgKGUpID0+IHtcbiAgICAgIHdpbmRvdy5sb2NhdGlvbiA9IFwiLi4vLi4vXCI7XG4gICAgfSk7XG4gICAgXG4gICAgJChcIiNzaWRlYmFyLWFyZWFcIikubmljZVNjcm9sbCgpO1xuICAgICQoXCIjY29udGVudC1hcmVhXCIpLm5pY2VTY3JvbGwoe1xuICAgICAgYXV0b2hpZGVtb2RlOiBcImhpZGRlblwiLFxuICAgICAgemluZGV4OiAxMDBcbiAgICB9KTtcbiAgXG4gICAgY29uc3QgaW5wdXQgPSAkKFwiLnN3aXRjaGVyIC5pbnB1dFwiKTtcbiAgICBjb25zdCBkZXYgPSAkKFwiLnN3aXRjaGVyIC5kZXZcIik7XG4gICAgY29uc3Qgb3V0cHV0ID0gJChcIi5zd2l0Y2hlciAub3V0cHV0XCIpO1xuICBcbiAgICBsZXQgY3VycmVudEltYWdlID0gMDtcbiAgICBsZXQgdGltZXIgPSBzZXRJbnRlcnZhbCgoKSA9PiB7XG4gICAgICBpZihjdXJyZW50SW1hZ2UgPT09IDApIGRldi50cmlnZ2VyKFwiY2xpY2tcIiwgXCJhdXRvXCIpO1xuICAgICAgaWYoY3VycmVudEltYWdlID09PSAxKSBvdXRwdXQudHJpZ2dlcihcImNsaWNrXCIsIFwiYXV0b1wiKTtcbiAgICAgIGlmKGN1cnJlbnRJbWFnZSA9PT0gMikgaW5wdXQudHJpZ2dlcihcImNsaWNrXCIsIFwiYXV0b1wiKTtcbiAgICAgIGN1cnJlbnRJbWFnZSA9ICsrY3VycmVudEltYWdlICUgMztcbiAgICB9LCAzMDAwKTtcbiAgICBcbiAgICBjb25zdCBzaG93SW5wdXRJbWFnZSA9IChlKSA9PiB7XG4gICAgICAkKFwiLm92ZXJ2aWV3LWltYWdlIC5zd2l0Y2hlciAuYnRuXCIpLnJlbW92ZUNsYXNzKFwib3V0XCIpLnJlbW92ZUNsYXNzKFwiZGV2XCIpO1xuICAgICAgJChcIi5vdmVydmlldy1pbWFnZSAuc291cmNlLXNhbXBsZVwiKS5yZW1vdmVDbGFzcyhcImhpZGRlblwiKTtcbiAgICAgICQoXCIub3ZlcnZpZXctaW1hZ2UgLmRldi1zYW1wbGVcIikuYWRkQ2xhc3MoXCJoaWRkZW5cIik7XG4gICAgICAkKFwiLm92ZXJ2aWV3LWltYWdlIC5yZXN1bHQtc2FtcGxlXCIpLmFkZENsYXNzKFwiaGlkZGVuXCIpO1xuICAgIH07XG4gICAgXG4gICAgY29uc3Qgc2hvd0RldkltYWdlID0gKGUpID0+IHtcbiAgICAgICQoXCIub3ZlcnZpZXctaW1hZ2UgLnN3aXRjaGVyIC5idG5cIikucmVtb3ZlQ2xhc3MoXCJvdXRcIikuYWRkQ2xhc3MoXCJkZXZcIik7XG4gICAgICAkKFwiLm92ZXJ2aWV3LWltYWdlIC5zb3VyY2Utc2FtcGxlXCIpLmFkZENsYXNzKFwiaGlkZGVuXCIpO1xuICAgICAgJChcIi5vdmVydmlldy1pbWFnZSAuZGV2LXNhbXBsZVwiKS5yZW1vdmVDbGFzcyhcImhpZGRlblwiKTtcbiAgICAgICQoXCIub3ZlcnZpZXctaW1hZ2UgLnJlc3VsdC1zYW1wbGVcIikuYWRkQ2xhc3MoXCJoaWRkZW5cIik7XG4gICAgfTtcbiAgXG4gICAgY29uc3Qgc2hvd091dHB1dEltYWdlID0gKGUpID0+IHtcbiAgICAgICQoXCIub3ZlcnZpZXctaW1hZ2UgLnN3aXRjaGVyIC5idG5cIikucmVtb3ZlQ2xhc3MoXCJkZXZcIikuYWRkQ2xhc3MoXCJvdXRcIik7XG4gICAgICAkKFwiLm92ZXJ2aWV3LWltYWdlIC5zb3VyY2Utc2FtcGxlXCIpLmFkZENsYXNzKFwiaGlkZGVuXCIpO1xuICAgICAgJChcIi5vdmVydmlldy1pbWFnZSAucmVzdWx0LXNhbXBsZVwiKS5yZW1vdmVDbGFzcyhcImhpZGRlblwiKTtcbiAgICAgICQoXCIub3ZlcnZpZXctaW1hZ2UgLmRldi1zYW1wbGVcIikuYWRkQ2xhc3MoXCJoaWRkZW5cIik7XG4gICAgfTtcbiAgXG4gICAgaW5wdXQub24oXCJjbGlja1wiLCBzaG93SW5wdXRJbWFnZSk7XG4gICAgZGV2Lm9uKFwiY2xpY2tcIiwgc2hvd0RldkltYWdlKTtcbiAgICBvdXRwdXQub24oXCJjbGlja1wiLCBzaG93T3V0cHV0SW1hZ2UpO1xuICAgICQoXCIuc3dpdGNoZXIgLmNsaWNrYWJsZVwiKS5vbihcImNsaWNrXCIsIChlLCBkYXRhKSA9PiB7XG4gICAgICBpZihkYXRhICE9PSBcImF1dG9cIiAmJiB0aW1lcil7XG4gICAgICAgIGNsZWFyVGltZW91dCh0aW1lcik7XG4gICAgICAgIHRpbWVyID0gbnVsbDtcbiAgICAgIH1cbiAgICB9KTtcbiAgICBcbiAgICAkKFwiLmNsaWNrYWJsZS1pbWdcIikub24oXCJjbGlja1wiLCAoZSkgPT4ge1xuICAgICAgd2luZG93LmxvY2F0aW9uID0gJChlLnRhcmdldCkuYXR0cihcInNyY1wiKTtcbiAgICB9KTtcbiAgfVxuICBcbiAgc2V0TWVudUFuaW1lKCl7XG4gICAgY29uc3QgaGFuZGxlTWVudUV2ZW50ID0gKHBhZ2UsIGNzc0NsYXNzKSA9PiB7XG4gICAgICBjb25zdCBtZW51ID0gdGhpcy5zaWRlYmFyTWVudS5maW5kKGBhW2RhdGEtcGFnZT0nJHtwYWdlfSddYCk7XG4gICAgICBtZW51Lm9uKFwibW91c2VlbnRlclwiLCAoZSkgPT4gdGhpcy5zaWRlYmFyTG9nby5hZGRDbGFzcyhjc3NDbGFzcykpO1xuICAgICAgbWVudS5vbihcIm1vdXNlbGVhdmVcIiwgKGUpID0+IHRoaXMuc2lkZWJhckxvZ28ucmVtb3ZlQ2xhc3MoY3NzQ2xhc3MpKTtcbiAgICB9O1xuICBcbiAgICBoYW5kbGVNZW51RXZlbnQoXCJvdmVydmlld1wiLCBcInJvdGF0ZTYwXCIpO1xuICAgIGhhbmRsZU1lbnVFdmVudChcInVzYWdlXCIsIFwicm90YXRlMTIwXCIpO1xuICAgIGhhbmRsZU1lbnVFdmVudChcImJ1aWxkXCIsIFwicm90YXRlMTgwXCIpO1xuICAgIGhhbmRsZU1lbnVFdmVudChcImNvZGVfaHRtbFwiLCBcInJvdGF0ZTI0MFwiKTtcbiAgICBoYW5kbGVNZW51RXZlbnQoXCJjb2RlX3N0eWxlXCIsIFwicm90YXRlMzAwXCIpO1xuICAgIGhhbmRsZU1lbnVFdmVudChcImNvZGVfanNcIiwgXCJyb3RhdGUzNjBcIik7XG4gIH1cbiAgXG4gIHNldE1lbnVUb2dnbGVFdmVudCgpe1xuICAgIGNvbnN0IHNpZGViYXJBcmVhID0gJChcIiNzaWRlYmFyLWFyZWFcIik7XG4gICAgdGhpcy5zaWRlYmFyVG9nZ2xlLm9uKFwiY2xpY2tcIiwgKGUpID0+IHtcbiAgICAgIHNpZGViYXJBcmVhLnRvZ2dsZUNsYXNzKFwiZXhwYW5kXCIpO1xuICAgIH0pO1xuICBcbiAgICBzaWRlYmFyQXJlYS5vbihcInRyYW5zaXRpb25lbmRcIiwgKGUpID0+IHtcbiAgICAgIHNpZGViYXJBcmVhLmdldE5pY2VTY3JvbGwoKS5yZXNpemUoKTtcbiAgICB9KTtcbiAgfVxufVxuIiwiLy8gZ2xvYmFsICQsIGpRdWVyeVxuXCJ1c2Ugc3RyaWN0XCI7XG5cbmltcG9ydCBBcHBDb250cm9sbGVyIGZyb20gXCIuLi9BcHBDb250cm9sbGVyXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEluZGV4Q29udHJvbGxlciBleHRlbmRzIEFwcENvbnRyb2xsZXIge1xuICBzdGF0aWMgZ2V0IHBhZ2UoKSB7XG4gICAgcmV0dXJuIFwiaW5kZXhcIjtcbiAgfVxuICBcbiAgY29uc3RydWN0b3IoKXtcbiAgICBzdXBlcigpO1xuICAgIHRoaXMuaW5pdGlhbGl6ZSgpO1xuICB9XG4gIFxuICBpbml0aWFsaXplKCl7XG4gICAgY29uc3QgYnRuX2luc3RhbGwgPSAkKFwiI2luc3RhbGxcIik7XG4gICAgY29uc3QgYnRuX2luaXQgPSAkKFwiI2luaXRcIik7XG4gICAgY29uc3QgYnRuX2RldiA9ICQoXCIjZGV2ZWxvcFwiKTtcbiAgXG4gICAgYnRuX2luc3RhbGwub24oXCJjbGlja1wiLCAoZSkgPT4ge1xuICAgICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAgIGNvbnN0IHRlbXBsYXRlID0gJChcIi50ZW1wbGF0ZXMgLmluc3RhbGxcIikud3JhcChcIjxkaXYvPlwiKS5wYXJlbnQoKS5odG1sKCk7XG4gICAgICB0aGlzLnBvcFVwKHRlbXBsYXRlKTtcbiAgICB9KTtcbiAgXG4gICAgYnRuX2luaXQub24oXCJjbGlja1wiLCAoZSkgPT4ge1xuICAgICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAgIGNvbnN0IHRlbXBsYXRlID0gJChcIi50ZW1wbGF0ZXMgLmluaXRcIikud3JhcChcIjxkaXYvPlwiKS5wYXJlbnQoKS5odG1sKCk7XG4gICAgICB0aGlzLnBvcFVwKHRlbXBsYXRlKTtcbiAgICB9KTtcbiAgXG4gICAgYnRuX2Rldi5vbihcImNsaWNrXCIsIChlKSA9PiB7XG4gICAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xuICAgICAgY29uc3QgdGVtcGxhdGUgPSAkKFwiLnRlbXBsYXRlcyAuZGV2ZWxvcFwiKS53cmFwKFwiPGRpdi8+XCIpLnBhcmVudCgpLmh0bWwoKTtcbiAgICAgIHRoaXMucG9wVXAodGVtcGxhdGUpO1xuICAgIH0pO1xuICB9XG4gIFxuICBwb3BVcCh0ZW1wbGF0ZSl7XG4gICAgY29uc3QgbGF5ZXIgPSAkKFwiPGRpdj5cIik7XG4gICAgbGF5ZXIuYWRkQ2xhc3MoXCJsYXllclwiKTtcbiAgICAkKFwiYm9keSAjbWFpblwiKS5hcHBlbmQobGF5ZXIpO1xuICBcbiAgICBjb25zdCBwb3B1cCA9ICQoXCIucG9wdXBcIik7XG4gICAgbGF5ZXIuYWRkQ2xhc3MoXCJkYXJrXCIpO1xuICBcbiAgICBzZXRUaW1lb3V0KCgpPT57XG4gICAgICBwb3B1cC5yZW1vdmVDbGFzcyhcImhpZGRlblwiKTtcbiAgICAgIHBvcHVwLmFwcGVuZCh0ZW1wbGF0ZSk7XG4gICAgICBwb3B1cC5maW5kKFwiLnRlbXBsYXRlXCIpLm5pY2VTY3JvbGwoKTtcbiAgICB9LCAwKTtcblxuICAgIGxheWVyLm9uKFwiY2xpY2tcIiwgKGUpPT57XG4gICAgICBwb3B1cC5hZGRDbGFzcyhcImhpZGRlblwiKTtcbiAgICAgIGxheWVyLnJlbW92ZUNsYXNzKFwiZGFya1wiKTtcbiAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICBwb3B1cC5lbXB0eSgpO1xuICAgICAgICBsYXllci5yZW1vdmUoKTtcbiAgICAgIH0sIDApO1xuICAgIH0pO1xuICB9XG59XG4iXX0=
