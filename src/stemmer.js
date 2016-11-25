export class Stemmer {

    constructor() {
        this.stemmers = {};
        this.stemmers.fr = require('snowball-stemmer.jsx/dest/french-stemmer.common.js').FrenchStemmer;
        this.stemmers.en = require('snowball-stemmer.jsx/dest/french-stemmer.common.js').EnglishStemmer;
    }

    stemKeywords(language, keywords) {

        const stemmerFactory = this.stemmers[language];
        if (!stemmerFactory)
            throw new Error(`Unsupported language ${language}`);

        if (keywords) {
            if (Array.isArray(keywords)) {
                keywords.map((keyword) => {
                    return {originalKeyword: keyword, stemmedKeyword: stem(stemmerFactory, keyword)};
                });
            } else if (typeof keywords === 'string') {

            } else {
                throw new Error('Unsupported keywords argument');
            }
        }
    }

}

function stem(stemmerFactory, keyword) {
    var stemmer = new stemmerFactory();
    return stemmer.stemWord(keyword.toLowerCase());
}