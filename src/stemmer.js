export class Stemmer {
    constructor() {
        this.stemmers = {};
        this.stemmers['fr'] = require('snowball-stemmer.jsx/dest/french-stemmer.common.js').FrenchStemmer;
        this.stemmers['en'] = require('snowball-stemmer.jsx/dest/english-stemmer.common.js').EnglishStemmer;
    }

    stemKeywords(language, keywords) {

        const stemmerFactory = this.stemmers[language];
        if (!stemmerFactory)
            throw new Error(`Unsupported language ${language}`);

        if (keywords) {
            if (Array.isArray(keywords)) {
                return keywords.map((keyword) => {
                    return stem(stemmerFactory, keyword);
                });
            } else if (typeof keywords === 'string') {
                return stem(stemmerFactory, keywords);
            } else {
                throw new Error('Unsupported keywords argument');
            }
        }
    }

}

function stem(stemmerFactory, keyword) {
    const stemmer = new stemmerFactory();
    const stemmedWord = stemmer.stemWord(keyword.toLowerCase());
    return {originalKeyword: keyword, stemmedKeyword: stemmedWord};
}