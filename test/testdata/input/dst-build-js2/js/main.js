(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";

var _sub = require("./sub1.part");

(0, _sub.demo_func1)("Hello").then(function (msg) {
  console.log(msg);
});
console.log(new _sub.Demo_class1().getVal());

},{"./sub1.part":2}],2:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

exports.demo_func1 = demo_func1;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function demo_func1(msg) {
  return new Promise(function (resolve, reject) {
    resolve(msg);
  });
}

var Demo_class1 = exports.Demo_class1 = function () {
  function Demo_class1() {
    _classCallCheck(this, Demo_class1);

    this.testVal1 = 1;
  }

  _createClass(Demo_class1, [{
    key: "getVal",
    value: function getVal() {
      return this.testVal1;
    }
  }]);

  return Demo_class1;
}();

},{}]},{},[1])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJ0ZXN0L3Rlc3RkYXRhL2lucHV0L3NyYy1idWlsZC1qczIvanMvbWFpbi5qcyIsInRlc3QvdGVzdGRhdGEvaW5wdXQvc3JjLWJ1aWxkLWpzMi9qcy9zdWIxLnBhcnQuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7OztBQ0FBOztBQUVBLHFCQUFXLE9BQVgsRUFBb0IsSUFBcEIsQ0FBeUIsVUFBUyxHQUFULEVBQWE7QUFDcEMsVUFBUSxHQUFSLENBQVksR0FBWjtBQUNELENBRkQ7QUFHQSxRQUFRLEdBQVIsQ0FBWSx1QkFBa0IsTUFBbEIsRUFBWjs7Ozs7Ozs7Ozs7UUNMZ0IsVSxHQUFBLFU7Ozs7QUFBVCxTQUFTLFVBQVQsQ0FBb0IsR0FBcEIsRUFBMEM7QUFDL0MsU0FBTyxJQUFJLE9BQUosQ0FBWSxVQUFTLE9BQVQsRUFBa0IsTUFBbEIsRUFBeUI7QUFDMUMsWUFBUSxHQUFSO0FBQ0QsR0FGTSxDQUFQO0FBR0Q7O0lBRVksVyxXQUFBLFc7QUFDWCx5QkFBYTtBQUFBOztBQUNYLFNBQUssUUFBTCxHQUFnQixDQUFoQjtBQUNEOzs7OzZCQUVlO0FBQ2QsYUFBTyxLQUFLLFFBQVo7QUFDRCIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCJpbXBvcnQge2RlbW9fZnVuYzEsIERlbW9fY2xhc3MxfSBmcm9tICcuL3N1YjEucGFydCc7XG5cbmRlbW9fZnVuYzEoXCJIZWxsb1wiKS50aGVuKGZ1bmN0aW9uKG1zZyl7XG4gIGNvbnNvbGUubG9nKG1zZyk7XG59KTtcbmNvbnNvbGUubG9nKG5ldyBEZW1vX2NsYXNzMSgpLmdldFZhbCgpKTsiLCJleHBvcnQgZnVuY3Rpb24gZGVtb19mdW5jMShtc2c6IHN0cmluZykgOlByb21pc2Uge1xuICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24ocmVzb2x2ZSwgcmVqZWN0KXtcbiAgICByZXNvbHZlKG1zZyk7XG4gIH0pO1xufVxuXG5leHBvcnQgY2xhc3MgRGVtb19jbGFzczF7XG4gIGNvbnN0cnVjdG9yKCl7XG4gICAgdGhpcy50ZXN0VmFsMSA9IDE7XG4gIH1cbiAgXG4gIGdldFZhbCgpOiBudW1iZXJ7XG4gICAgcmV0dXJuIHRoaXMudGVzdFZhbDE7XG4gIH1cbn0iXX0=
