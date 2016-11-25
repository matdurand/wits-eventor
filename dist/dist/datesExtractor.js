'use strict';

var _typeof2 = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _typeof = typeof Symbol === "function" && _typeof2(Symbol.iterator) === "symbol" ? function (obj) {
    return typeof obj === "undefined" ? "undefined" : _typeof2(obj);
} : function (obj) {
    return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj === "undefined" ? "undefined" : _typeof2(obj);
};

var _createClass = function () {
    function defineProperties(target, props) {
        for (var i = 0; i < props.length; i++) {
            var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
        }
    }return function (Constructor, protoProps, staticProps) {
        if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
    };
}();

function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
    }
}

//Outputs
/*
 * {
 *   originalText,
 *   textWithoutDatesKeywords,
 *   extractedDate : [
 *       {
 *           dateTextExtractedIndex : (position dans l'orginialText),
 *           dateTextExtracted : 'blbabla'
 *           value : La date javascript
 *       },
 *       {
 *
 *       }
 *   ],
 *   usedLanguage (ex : 'fr', 'en')
 * }
 *
 * */

var DateExtractor = exports.DateExtractor = function () {
    function DateExtractor() {
        _classCallCheck(this, DateExtractor);

        this.chrono = require('chrono-node');
    }

    _createClass(DateExtractor, [{
        key: 'extractDatesFromText',
        value: function extractDatesFromText(text) {
            var results = this.chrono.parse(text);
            if (results.length > 0) {
                var _ret = function () {
                    var extractedDates = [];
                    var originalText = text;
                    var textWithoutDatesKeywords = text;
                    var usedLanguage = getTextLanguageFromResult(results[0]);

                    results.forEach(function (result) {
                        extractedDates.push(extractDateFromResult(result));
                        textWithoutDatesKeywords = extractDatesKeyWordFromText(textWithoutDatesKeywords, result);
                    });

                    return {
                        v: {
                            originalText: originalText,
                            textWithoutDatesKeywords: textWithoutDatesKeywords,
                            extractedDates: extractedDates,
                            usedLanguage: usedLanguage
                        }
                    };
                }();

                if ((typeof _ret === 'undefined' ? 'undefined' : _typeof(_ret)) === "object") return _ret.v;
            }
        }
    }]);

    return DateExtractor;
}();

function getTextLanguageFromResult(result) {
    for (var name in result.tags) {
        var languageCode = name.substring(0, 2);
        return languageCode.toLowerCase();
    }
}

function extractDateFromResult(result) {
    var extractedDate = {};
    extractedDate.value = result.ref;
    extractedDate.dateTextExtracted = result.text;
    extractedDate.dateTextExtractedIndex = result.index;
    return extractedDate;
}

function extractDatesKeyWordFromText(textWithoutDatesKeywords, result) {
    return textWithoutDatesKeywords.replace(result.text, '');
}
//# sourceMappingURL=datesExtractor.js.map