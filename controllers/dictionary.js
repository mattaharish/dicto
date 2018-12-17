const randomWord = require('random-words')
const chalk = require('chalk');
const {prompt} = require('inquirer')
const spinner = require('ora')('Loading../')

const ha = require('./../helpers/hintandAnswer')
const oxford = require('./../services/oxford')
const format = require('./../helpers/format')
const display = require('./../helpers/display')

let HINT_COUNT = 0

const gameOptions = [{
    type: 'list',
    name: 'Option',
    message: 'Pick One ...',
    choices: ['Try Again', 'Hint', 'Quit']
}]

const answer = {
    type: 'input',
    name: 'answer',
    message: 'Guess and Type the word..'
}

const TakeAnswer = (word, data) => {
    prompt(answer).then(ans => {
        // console.log(ans)
        if (ha.checkAnswer(word, data, ans.answer)) {
            console.log(chalk.blue('Your guess is right, WHOA!'))
        } else {
            console.log(chalk.red('Oops! It is a wrong guess, Continue\n'))
            prompt(gameOptions).then(option => {
                switch (option.Option) {
                    case 'Try Again':
                        TakeAnswer(word, data)
                        break
                    case 'Hint':
                        HINT_COUNT++
                        if (HINT_COUNT < 3) {
                            console.log('---- Hint Below -----\n')
                            console.log(ha.getHint(word, data, HINT_COUNT))
                            TakeAnswer(word, data)
                        } else {
                            console.log(chalk.red('Your HINTS are up :(\n'))
                            console.log(`\n Answer is : ${chalk.green(word)}\n`)
                            getFullDetails(word)
                        }
                        break
                    case 'Quit':
                        console.log(`\n Answer is : ${chalk.green(word)}\n`)
                        getFullDetails(word)
                }
            });
        }
    })
}

// Definitions
const getDefinition = async (word) => {
    try {
        spinner.start()
        let data = await oxford.getDefinitions(word)
        if (data.length > 0) {
            let defs = display.single(data, 'definitions')
            spinner.stop()
            console.log(defs)
        } else {
            console.log(chalk.red('Word Not Found :('))
            spinner.stop()
        }
    } catch (err) {
        spinner.stop()
        console.log(chalk.red(err))
    }
};

// Examples 
const getExamples = async (word) => {
    try {
        spinner.start()
        let data = await oxford.getExamples(word)
        if (data.length > 0) {
            let exs = display.single(data, 'examples')
            spinner.stop()
            console.log(exs)
        } else {
            spinner.stop()
            console.log(chalk.red('Word Not Found :('))
        }
    } catch (err) {
        spinner.stop()
        console.log(chalk.red(err))
    }
};

// Synonyms
const getSynonyms = async (word) => {
    try {
        spinner.start()
        let data = await oxford.getSynonyms(word)
        if (data.length > 0) {
            let syns = display.single(data, 'synonyms')
            spinner.stop()
            console.log(syns)
        } else {
            spinner.stop()
            console.log(chalk.red('Word Not Found :('))
        }
    } catch (err) {
        spinner.stop()
        console.log(chalk.red(err))
    }
};

// Antonymns
const getAntonyms = async (word) => {
    try {
        spinner.start()
        let data = await oxford.getAntonyms(word)
        if (data.length) {
            let ants = display.single(data, 'antonyms')
            spinner.stop()
            console.log(ants)
        } else {
            spinner.stop()
            console.log(chalk.red('Word Not Found :('))
        }
    } catch (err) {
        spinner.stop()
        console.log(chalk.red(err))
    }
};

// Full Details of Word
const getFullDetails = async (word) => {
    try {
        spinner.start()
        let definitions = await oxford.getDefinitions(word)
        let examples = await oxford.getExamples(word)
        let synonyms = await oxford.getSynonyms(word)
        let antonyms = await oxford.getAntonyms(word)
        if (definitions.length === 0 && examples.length === 0 && synonyms.length === 0 && antonyms.length === 0) {
            spinner.stop()
            console.log(chalk.red('Word Not Found :('))
        } else {
            let x = format.full(definitions, examples, synonyms, antonyms)
            let s = display.full(x)
            spinner.stop()
            console.log(s)
        }
    } catch (err) {
        spinner.stop()
        console.log(chalk.red(err))
    }
};

// Full Details of Random Word
const getRandomWord = async () => {
    try {
        spinner.start()
        let word = randomWord()
        let definitions = await oxford.getDefinitions(word)
        let examples = await oxford.getExamples(word)
        let synonyms = await oxford.getSynonyms(word)
        let antonyms = await oxford.getAntonyms(word)
        if (definitions.length === 0 && examples.length === 0 && synonyms.length === 0 && antonyms.length === 0) {
            spinner.stop()
            getRandomWord()
        } else {
            let x = format.full(definitions, examples, synonyms, antonyms)
            let s = display.full(x)
            spinner.stop()
            console.log(`\n word of the day - ${chalk.green(word)}`)
            console.log(s)
        }
    } catch (err) {
        spinner.stop()
        console.log(chalk.red(err))
    }
};

const playGame = async () => {
    try {
        spinner.start()
        let word = randomWord()
        // console.log(word)
        let definitions = await oxford.getDefinitions(word)
        let synonyms = await oxford.getSynonyms(word)
        let antonyms = await oxford.getAntonyms(word)
        let x = format.game(definitions, synonyms, antonyms)
        if (x.definitions && x.definitions.length === 0) {
            module.exports.playGame()
        } else {
            spinner.stop()
            console.log('--------------------')
            console.log(chalk.green(`${x.definitions[0]}`))
            console.log('--------------------')
        }

        TakeAnswer(word, x)
    } catch (err) {
        console.log(chalk.red(err))
    }
}
module.exports = {
    getDefinition,
    getSynonyms,
    getAntonyms,
    getExamples,
    getFullDetails,
    getRandomWord,
    playGame
}