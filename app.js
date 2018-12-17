#!/usr/bin/env node
const program = require('commander')

const control = require('./controllers/dictionary')
// console.log(control)

program
    .version('0.0.1')
    .description('Oxford Dictionary')

program
    .command('def <word>')
    .alias('d')
    .description('Get definition of word')
    .action(control.getDefinition);

program
    .command('ex <word>')
    .alias('e')
    .description('Get Examples of word')
    .action(control.getExamples);

program
    .command('syn <word>')
    .alias('s')
    .description('Get Synonym of word')
    .action(control.getSynonyms);

program
    .command('ant <word>')
    .alias('a')
    .description('Get Antonym of word')
    .action(control.getAntonyms);

program
    .command('full <word>')
    .alias('f')
    .description('Get full details of word')
    .action(control.getFullDetails);

program
    .command('wod')
    .alias('w')
    .description('Get details of a random word')
    .action(control.getRandomWord);

program
    .command('play')
    .alias('p')
    .description('Play a word game')
    .action(control.playGame);

if (!process.argv.slice(2).length || !/[arudl]/.test(process.argv.slice(2))) {
    program.outputHelp();
    process.exit();
}
program.parse(process.argv)