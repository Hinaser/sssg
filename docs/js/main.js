(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";

var _sub = require("./sub1.part");

$(function () {
  var btn_install = $("#install");
  var btn_init = $("#init");
  var btn_dev = $("#develop");

  btn_install.on("click", function (e) {
    (0, _sub.describeInstall)(e.target);
  });

  btn_init.on("click", function (e) {
    (0, _sub.describeInit)(e.target);
  });

  btn_dev.on("click", function (e) {
    (0, _sub.describeDevelop)(e.target);
  });
}); // global $, jQuery

},{"./sub1.part":2}],2:[function(require,module,exports){
// global $, jQuery
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.describeInstall = describeInstall;
exports.describeInit = describeInit;
exports.describeDevelop = describeDevelop;
function popUp(template) {
  var layer = $("<div>");
  layer.addClass("layer");
  $("body").append(layer);

  var popup = $(".popup");
  popup.removeClass("hidden");
  popup.addClass("template");

  layer.on("click", function (e) {
    popup.addClass("hidden").removeClass("template");
    layer.removeClass("dark");
    setTimeout(function () {
      popup.empty();
      layer.remove();
    }, 0);
  });

  setTimeout(function () {
    layer.addClass("dark");
    popup.append(template);
  }, 0);
}

function describeInstall(elm) {
  var template = $(".templates .install").html();
  popUp(template);
}

function describeInit(elm) {
  var template = $(".templates .init").html();
  popUp(template);
}

function describeDevelop(elm) {
  var template = $(".templates .develop").html();
  popUp(template);
}

},{}]},{},[1])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJwbGF5Z3JvdW5kL3NyYy9qcy9tYWluLmpzIiwicGxheWdyb3VuZC9zcmMvanMvc3ViMS5wYXJ0LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7QUNFQTs7QUFNQSxFQUFFLFlBQU07QUFDTixNQUFNLGNBQWMsRUFBRSxVQUFGLENBQXBCO0FBQ0EsTUFBTSxXQUFXLEVBQUUsT0FBRixDQUFqQjtBQUNBLE1BQU0sVUFBVSxFQUFFLFVBQUYsQ0FBaEI7O0FBRUEsY0FBWSxFQUFaLENBQWUsT0FBZixFQUF3QixVQUFDLENBQUQsRUFBTztBQUM3Qiw4QkFBZ0IsRUFBRSxNQUFsQjtBQUNELEdBRkQ7O0FBSUEsV0FBUyxFQUFULENBQVksT0FBWixFQUFxQixVQUFDLENBQUQsRUFBTztBQUMxQiwyQkFBYSxFQUFFLE1BQWY7QUFDRCxHQUZEOztBQUlBLFVBQVEsRUFBUixDQUFXLE9BQVgsRUFBb0IsVUFBQyxDQUFELEVBQU87QUFDekIsOEJBQWdCLEVBQUUsTUFBbEI7QUFDRCxHQUZEO0FBR0QsQ0FoQkQsRSxDQVJBOzs7QUNBQTtBQUNBOzs7OztRQTBCZ0IsZSxHQUFBLGU7UUFLQSxZLEdBQUEsWTtRQUtBLGUsR0FBQSxlO0FBbENoQixTQUFTLEtBQVQsQ0FBZSxRQUFmLEVBQXdCO0FBQ3RCLE1BQU0sUUFBUSxFQUFFLE9BQUYsQ0FBZDtBQUNBLFFBQU0sUUFBTixDQUFlLE9BQWY7QUFDQSxJQUFFLE1BQUYsRUFBVSxNQUFWLENBQWlCLEtBQWpCOztBQUVBLE1BQU0sUUFBUSxFQUFFLFFBQUYsQ0FBZDtBQUNBLFFBQU0sV0FBTixDQUFrQixRQUFsQjtBQUNBLFFBQU0sUUFBTixDQUFlLFVBQWY7O0FBRUEsUUFBTSxFQUFOLENBQVMsT0FBVCxFQUFrQixVQUFDLENBQUQsRUFBSztBQUNyQixVQUFNLFFBQU4sQ0FBZSxRQUFmLEVBQXlCLFdBQXpCLENBQXFDLFVBQXJDO0FBQ0EsVUFBTSxXQUFOLENBQWtCLE1BQWxCO0FBQ0EsZUFBVyxZQUFNO0FBQ2YsWUFBTSxLQUFOO0FBQ0EsWUFBTSxNQUFOO0FBQ0QsS0FIRCxFQUdHLENBSEg7QUFJRCxHQVBEOztBQVNBLGFBQVcsWUFBSTtBQUNiLFVBQU0sUUFBTixDQUFlLE1BQWY7QUFDQSxVQUFNLE1BQU4sQ0FBYSxRQUFiO0FBQ0QsR0FIRCxFQUdHLENBSEg7QUFJRDs7QUFFTSxTQUFTLGVBQVQsQ0FBeUIsR0FBekIsRUFBNkI7QUFDbEMsTUFBTSxXQUFXLEVBQUUscUJBQUYsRUFBeUIsSUFBekIsRUFBakI7QUFDQSxRQUFNLFFBQU47QUFDRDs7QUFFTSxTQUFTLFlBQVQsQ0FBc0IsR0FBdEIsRUFBMEI7QUFDL0IsTUFBTSxXQUFXLEVBQUUsa0JBQUYsRUFBc0IsSUFBdEIsRUFBakI7QUFDQSxRQUFNLFFBQU47QUFDRDs7QUFFTSxTQUFTLGVBQVQsQ0FBeUIsR0FBekIsRUFBNkI7QUFDbEMsTUFBTSxXQUFXLEVBQUUscUJBQUYsRUFBeUIsSUFBekIsRUFBakI7QUFDQSxRQUFNLFFBQU47QUFDRCIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCIvLyBnbG9iYWwgJCwgalF1ZXJ5XG5cbmltcG9ydCB7XG4gIGRlc2NyaWJlSW5zdGFsbCxcbiAgZGVzY3JpYmVJbml0LFxuICBkZXNjcmliZURldmVsb3Bcbn0gZnJvbSAnLi9zdWIxLnBhcnQnO1xuXG4kKCgpID0+IHtcbiAgY29uc3QgYnRuX2luc3RhbGwgPSAkKFwiI2luc3RhbGxcIik7XG4gIGNvbnN0IGJ0bl9pbml0ID0gJChcIiNpbml0XCIpO1xuICBjb25zdCBidG5fZGV2ID0gJChcIiNkZXZlbG9wXCIpO1xuICBcbiAgYnRuX2luc3RhbGwub24oXCJjbGlja1wiLCAoZSkgPT4ge1xuICAgIGRlc2NyaWJlSW5zdGFsbChlLnRhcmdldCk7XG4gIH0pO1xuICBcbiAgYnRuX2luaXQub24oXCJjbGlja1wiLCAoZSkgPT4ge1xuICAgIGRlc2NyaWJlSW5pdChlLnRhcmdldCk7XG4gIH0pO1xuICBcbiAgYnRuX2Rldi5vbihcImNsaWNrXCIsIChlKSA9PiB7XG4gICAgZGVzY3JpYmVEZXZlbG9wKGUudGFyZ2V0KTtcbiAgfSk7XG59KTtcbiIsIi8vIGdsb2JhbCAkLCBqUXVlcnlcblwidXNlIHN0cmljdFwiO1xuXG5mdW5jdGlvbiBwb3BVcCh0ZW1wbGF0ZSl7XG4gIGNvbnN0IGxheWVyID0gJChcIjxkaXY+XCIpO1xuICBsYXllci5hZGRDbGFzcyhcImxheWVyXCIpO1xuICAkKFwiYm9keVwiKS5hcHBlbmQobGF5ZXIpO1xuICBcbiAgY29uc3QgcG9wdXAgPSAkKFwiLnBvcHVwXCIpO1xuICBwb3B1cC5yZW1vdmVDbGFzcyhcImhpZGRlblwiKTtcbiAgcG9wdXAuYWRkQ2xhc3MoXCJ0ZW1wbGF0ZVwiKTtcbiAgXG4gIGxheWVyLm9uKFwiY2xpY2tcIiwgKGUpPT57XG4gICAgcG9wdXAuYWRkQ2xhc3MoXCJoaWRkZW5cIikucmVtb3ZlQ2xhc3MoXCJ0ZW1wbGF0ZVwiKTtcbiAgICBsYXllci5yZW1vdmVDbGFzcyhcImRhcmtcIik7XG4gICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICBwb3B1cC5lbXB0eSgpO1xuICAgICAgbGF5ZXIucmVtb3ZlKCk7XG4gICAgfSwgMCk7XG4gIH0pO1xuICBcbiAgc2V0VGltZW91dCgoKT0+e1xuICAgIGxheWVyLmFkZENsYXNzKFwiZGFya1wiKTtcbiAgICBwb3B1cC5hcHBlbmQodGVtcGxhdGUpO1xuICB9LCAwKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGRlc2NyaWJlSW5zdGFsbChlbG0pe1xuICBjb25zdCB0ZW1wbGF0ZSA9ICQoXCIudGVtcGxhdGVzIC5pbnN0YWxsXCIpLmh0bWwoKTtcbiAgcG9wVXAodGVtcGxhdGUpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZGVzY3JpYmVJbml0KGVsbSl7XG4gIGNvbnN0IHRlbXBsYXRlID0gJChcIi50ZW1wbGF0ZXMgLmluaXRcIikuaHRtbCgpO1xuICBwb3BVcCh0ZW1wbGF0ZSk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBkZXNjcmliZURldmVsb3AoZWxtKXtcbiAgY29uc3QgdGVtcGxhdGUgPSAkKFwiLnRlbXBsYXRlcyAuZGV2ZWxvcFwiKS5odG1sKCk7XG4gIHBvcFVwKHRlbXBsYXRlKTtcbn1cbiJdfQ==
