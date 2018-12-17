const request = require('request')

const format = require('./../helpers/format')
const config = require('./../config/config')

const baseRequest = request.defaults({
    baseUrl: 'https://od-api.oxforddictionaries.com:443/api/v1',
    headers: {
        "Accept": "application/json",
        "app_id": config.app_id,
        "app_key": config.app_key
    }
});

module.exports = {
    // Definitions
    getDefinitions: (word) => {
        return new Promise((resolve, reject) => {
            baseRequest.get(`/entries/en/${word}`, (err, result) => {
                if (err) {
                    reject(err)
                }
                if (result && result.statusCode != '404') {
                    let data = JSON.parse(result.body)
                    let r = format.single(data, 'definitions')
                    resolve(r)
                } else {
                    resolve([])
                }
            });
        })
    },


    // Examples 
    getExamples: (word) => {
        return new Promise((resolve, reject) => {
            baseRequest.get(`/entries/en/${word}`, (err, result) => {
                if (err) {
                    reject(err)
                }
                if (result.statusCode != '404') {
                    let data = JSON.parse(result.body)
                    let r = format.single(data, 'examples')
                    resolve(r)
                } else {
                    resolve([])
                }
            })

        })
    },

    // Synonyms
    getSynonyms: (word) => {
        return new Promise((resolve, reject) => {
            baseRequest.get(`/entries/en/${word}/synonyms`, (err, result) => {
                if (err) {
                    reject(err)
                }
                // console.log(result.statusCode)
                if (result.statusCode != '404') {
                    let data = JSON.parse(result.body)
                    let r = format.single(data, 'synonyms')
                    resolve(r)
                } else {
                    resolve([])
                }
            });
        })
    },

    // Antonymns
    getAntonyms: (word) => {
        return new Promise((resolve, reject) => {
            baseRequest.get(`/entries/en/${word}/antonyms`, (err, result) => {
                if (err) {
                    reject(err)
                }
                // console.log(result.statusCode)
                if (result.statusCode != '404') {
                    let data = JSON.parse(result.body)
                    let r = format.single(data, 'antonyms')
                    resolve(r)
                } else {
                    resolve([])
                }
            });
        })
    }
}