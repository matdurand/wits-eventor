"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.WitsEventor = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _datesExtractor = require("./datesExtractor");

var _keywordExtractor = require("./keyword-extractor");

var _stemmer = require("./stemmer");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var WitsEventor = exports.WitsEventor = function () {
    function WitsEventor() {
        _classCallCheck(this, WitsEventor);

        this.dataExtractor = new _datesExtractor.DateExtractor();
        this.stemmer = new _stemmer.Stemmer();
    }

    _createClass(WitsEventor, [{
        key: "getEventFromInput",
        value: function getEventFromInput(userInput) {

            var result = this.dataExtractor.extractDatesFromText(userInput);
            if (result) {
                var keywords = (0, _keywordExtractor.generateKeywords)(result.usedLanguage, result.textWithoutDatesKeywords);
                var stemmedKeywords = this.stemmer.stemKeywords(result.usedLanguage, keywords);
                return {
                    "originalInput": userInput,
                    "time": result.extractedDates[0].dateTextExtracted
                };
            } else {
                return {
                    "originalInput": userInput
                };
            }
        }
    }]);

    return WitsEventor;
}();