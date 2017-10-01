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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJ0ZXN0L3Rlc3RkYXRhL2lucHV0L3NyYy1idWlsZC1qcy9qcy9tYWluLmpzIiwidGVzdC90ZXN0ZGF0YS9pbnB1dC9zcmMtYnVpbGQtanMvanMvc3ViMS5wYXJ0LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7QUNBQTs7QUFFQSxxQkFBVyxPQUFYLEVBQW9CLElBQXBCLENBQXlCLFVBQVMsR0FBVCxFQUFhO0FBQ3BDLFVBQVEsR0FBUixDQUFZLEdBQVo7QUFDRCxDQUZEO0FBR0EsUUFBUSxHQUFSLENBQVksdUJBQWtCLE1BQWxCLEVBQVo7Ozs7Ozs7Ozs7O1FDTGdCLFUsR0FBQSxVOzs7O0FBQVQsU0FBUyxVQUFULENBQW9CLEdBQXBCLEVBQTBDO0FBQy9DLFNBQU8sSUFBSSxPQUFKLENBQVksVUFBUyxPQUFULEVBQWtCLE1BQWxCLEVBQXlCO0FBQzFDLFlBQVEsR0FBUjtBQUNELEdBRk0sQ0FBUDtBQUdEOztJQUVZLFcsV0FBQSxXO0FBQ1gseUJBQWE7QUFBQTs7QUFDWCxTQUFLLFFBQUwsR0FBZ0IsQ0FBaEI7QUFDRDs7Ozs2QkFFZTtBQUNkLGFBQU8sS0FBSyxRQUFaO0FBQ0QiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiaW1wb3J0IHtkZW1vX2Z1bmMxLCBEZW1vX2NsYXNzMX0gZnJvbSAnLi9zdWIxLnBhcnQnO1xuXG5kZW1vX2Z1bmMxKFwiSGVsbG9cIikudGhlbihmdW5jdGlvbihtc2cpe1xuICBjb25zb2xlLmxvZyhtc2cpO1xufSk7XG5jb25zb2xlLmxvZyhuZXcgRGVtb19jbGFzczEoKS5nZXRWYWwoKSk7IiwiZXhwb3J0IGZ1bmN0aW9uIGRlbW9fZnVuYzEobXNnOiBzdHJpbmcpIDpQcm9taXNlIHtcbiAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uKHJlc29sdmUsIHJlamVjdCl7XG4gICAgcmVzb2x2ZShtc2cpO1xuICB9KTtcbn1cblxuZXhwb3J0IGNsYXNzIERlbW9fY2xhc3Mxe1xuICBjb25zdHJ1Y3Rvcigpe1xuICAgIHRoaXMudGVzdFZhbDEgPSAxO1xuICB9XG4gIFxuICBnZXRWYWwoKTogbnVtYmVye1xuICAgIHJldHVybiB0aGlzLnRlc3RWYWwxO1xuICB9XG59Il19
