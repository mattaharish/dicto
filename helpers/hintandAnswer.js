const chalk = require('chalk')

let HINTS = []

module.exports = {

    checkAnswer: (word, data, answer) => {
        // console.log(data.synonyms)
        if (HINTS[0] && HINTS[0] === answer) {
            return false
        } else if (answer === word) {
            return true
        } else if (data.synonyms && data.synonyms.indexOf(answer) > -1) {
            return true
        } else {
            return false
        }
    },

    getHint: (word, data, count) => {
        switch (count) {
            case 1:
                if (data.synonyms && data.synonyms.length) {
                    let hint_syn = data.synonyms[Math.floor(Math.random() * data.synonyms.length)]
                    HINTS.push(hint_syn)
                    return `Synonym of word - ${hint_syn}`
                } else {
                    return `Jumbled form of word - ${chalk.yellow(word.split('').sort().join(''))}`
                }
                break
            case 2:
                if (data.definitions && data.definitions.length) {
                    return `Another definition of word - ${chalk.yellow(data.definitions[Math.floor(Math.random() * data.definitions.length)])}`
                } else {
                    return `Jumbled form of word - ${chalk.yellow(word.split('').sort().join(''))}`
                }
                break
            case 3:
                if (data.antonyms && data.antonyms.length) {
                    return `Antonym of word - ${chalk.yellow(data.antonyms[Math.floor(Math.random() * data.antonyms.length)])}`
                } else {
                    return `Jumbled form of word - ${chalk.yellow(word.split('').sort().join(''))}`
                }
                break
        }
    },
}