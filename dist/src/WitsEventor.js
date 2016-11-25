"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.WitsEventor = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _keywordExtractor = require("./keyword-extractor");

var _datesExtractor = require("./datesExtractor");

var _stemmer = require("./stemmer");

var _underscore = require("underscore");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var WitsEventor = exports.WitsEventor = function () {
    function WitsEventor() {
        _classCallCheck(this, WitsEventor);

        this.subjectDictionaries = {};
        this.actionDictionaries = {};
        this.dateExtractor = new _datesExtractor.DateExtractor();
    }

    _createClass(WitsEventor, [{
        key: "addSubjectDictionary",
        value: function addSubjectDictionary(language, subjects) {
            this.subjectDictionaries[language] = buildDictionary(language, subjects);
        }
    }, {
        key: "addActionDictionary",
        value: function addActionDictionary(language, actions) {
            this.actionDictionaries[language] = buildDictionary(language, actions);
        }
    }, {
        key: "getEventFromInput",
        value: function getEventFromInput(userInput) {
            var dateExtractionResult = this.dateExtractor.extractDatesFromText(userInput);
            if (dateExtractionResult) {
                var keywords = (0, _keywordExtractor.generateKeywords)(dateExtractionResult.usedLanguage, dateExtractionResult.textWithoutDatesKeywords);
                var stemmingResult = new _stemmer.Stemmer().stemKeywords(dateExtractionResult.usedLanguage, keywords);
                var stemmedKeywords = _underscore._.pluck(stemmingResult, 'stemmedKeyword');
                var subject = findSubject.call(this, dateExtractionResult.usedLanguage, stemmedKeywords);
                if (subject) {
                    var action = findAction.call(this, dateExtractionResult.usedLanguage, stemmedKeywords);
                    return {
                        originalInput: userInput,
                        time: dateExtractionResult.extractedDates[0].dateTextExtracted,
                        action: action,
                        subject: subject
                    };
                } else {
                    return {
                        "originalInput": userInput,
                        "error": "No subject found"
                    };
                }
            } else {
                return {
                    "originalInput": userInput,
                    "error": "No dates found"
                };
            }
        }
    }]);

    return WitsEventor;
}();

function findSubject(language, stemmedKeywords) {
    var dict = this.subjectDictionaries[language];
    return findFirstDictionary(dict, stemmedKeywords);
}

function findAction(language, stemmedKeywords) {
    var dict = this.actionDictionaries[language];
    return findFirstDictionary(dict, stemmedKeywords);
}

function findFirstDictionary(dictionary, stemmedKeywords) {
    if (!dictionary) return undefined;
    var foundKeyword = _underscore._.find(stemmedKeywords, function (stemmedKeyword) {
        return dictionary[stemmedKeyword];
    });
    if (foundKeyword) {
        return dictionary[foundKeyword];
    }
}

function buildDictionary(language, words) {
    if (typeof language !== 'string') {
        throw new Error('expecting a string language');
    }
    if (!Array.isArray(words)) {
        throw new Error('dictionary content should be an array of words');
    }

    var dict = {};
    words.forEach(function (word) {
        var stemmingResult = new _stemmer.Stemmer().stemKeywords(language, word);
        dict[stemmingResult.stemmedKeyword] = word;
    });

    return dict;
}
//# sourceMappingURL=WitsEventor.js.map