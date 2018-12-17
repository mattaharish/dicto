module.exports = {
    'single': (data, type) => {
        let ex = [];
        if (data && data.results) {
            data.results.forEach(r => {
                if (r && r.lexicalEntries) {
                    r.lexicalEntries.forEach((lex) => {
                        let temp = {}
                        temp.Category = lex.lexicalCategory
                        temp[type] = []
                        if (lex && lex.entries) {
                            lex.entries.forEach(e => {
                                if (e && e.senses) {
                                    e.senses.forEach(s => {
                                        if (s && s[type] && s[type].length > 0) {
                                            temp[type] = [...temp[type], ...s[type]]
                                        }
                                    });
                                }
                            });
                        }
                        ex.push(temp)
                    });
                }
            });
        }
        return ex;
    },
    'full': (definitions, examples, synonyms, antonyms) => {
        let data = {}
        for (let i = 0; i < definitions.length; i++) {
            if (!data[definitions[i]['Category']]) {
                data[definitions[i]['Category']] = {}
            }
            data[definitions[i]['Category']] = { ...data[definitions[i]['Category']], ...{'definitions': definitions[i]['definitions']}}
        }
        for (let i = 0; i < examples.length; i++) {
            if (!data[examples[i]['Category']]) {
                data[examples[i]['Category']] = {}
            }
            data[examples[i]['Category']] = { ...data[examples[i]['Category']], ...{'examples': examples[i]['examples']}}
        }
        for (let i = 0; i < synonyms.length; i++) {
            if (!data[synonyms[i]['Category']]) {
                data[synonyms[i]['Category']] = {}
            }
            data[synonyms[i]['Category']] = { ...data[synonyms[i]['Category']], ...{'synonyms': synonyms[i]['synonyms']}}
        }
        for (let i = 0; i < antonyms.length; i++) {
            if (!data[antonyms[i]['Category']]) {
                data[antonyms[i]['Category']] = {}
            }
            data[antonyms[i]['Category']] = { ...data[antonyms[i]['Category']], ...{'antonyms': antonyms[i]['antonyms']}}
        }
        return data
    },
    'game': (definitions, synonyms, antonyms) => {
        let data = {}
        definitions.forEach(d => {
            if(!data['definitions']) {
                data['definitions'] = []
            }
            data['definitions'] = [...data['definitions'], ...d['definitions']]
        })

        synonyms.forEach(s => {
            if(!data['synonyms']) {
                data['synonyms'] = []
            }
            data['synonyms'] = [...data['synonyms'], ...s['synonyms']]
        })
        
        if (data['synonyms']) {
            data['synonyms'] = data['synonyms'].map(s => {
                return s.text
            })
        }

        antonyms.forEach(a => {
            if(!data['antonyms']) {
                data['antonyms'] = []
            }
            data['antonyms'] = [...data['antonyms'], ...a['antonyms']]
        }
        )
        
        if (data['antonyms']) {
            data['antonyms'] = data['antonyms'].map(a => {
                return a.text
            })
        }

        return data
    }
}