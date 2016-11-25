'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Stemmer = exports.Stemmer = function () {
    function Stemmer() {
        _classCallCheck(this, Stemmer);

        this.stemmers = {};
        this.stemmers['fr'] = require('snowball-stemmer.jsx/dest/french-stemmer.common.js').FrenchStemmer;
        this.stemmers['en'] = require('snowball-stemmer.jsx/dest/english-stemmer.common.js').EnglishStemmer;
    }

    _createClass(Stemmer, [{
        key: 'stemKeywords',
        value: function stemKeywords(language, keywords) {

            var stemmerFactory = this.stemmers[language];
            if (!stemmerFactory) throw new Error('Unsupported language ' + language);

            if (keywords) {
                if (Array.isArray(keywords)) {
                    return keywords.map(function (keyword) {
                        return stem(stemmerFactory, keyword);
                    });
                } else if (typeof keywords === 'string') {
                    return stem(stemmerFactory, keywords);
                } else {
                    throw new Error('Unsupported keywords argument');
                }
            }
        }
    }]);

    return Stemmer;
}();

function stem(stemmerFactory, keyword) {
    var stemmer = new stemmerFactory();
    var stemmedWord = stemmer.stemWord(keyword.toLowerCase());
    return { originalKeyword: keyword, stemmedKeyword: stemmedWord };
}
//# sourceMappingURL=stemmer.js.map