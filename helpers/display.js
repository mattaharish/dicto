const chalk = require('chalk');
module.exports = {
    'single': (data, type) => {
        let s = '------------------------\n'
        data.forEach(d => {
            for (let [key, value] of Object.entries(d)) {
                if (key !== 'Category') {
                    s = s + `${chalk.green(key)}: \n\n`
                    value.forEach((v, index) => {
                        if (v.text) {
                            s = s + `${index + 1}. ${v.text} \n`
                        } else {
                            s = s + `${index + 1}. ${v} \n`
                        }
                    })
                    if(value.length === 0) {
                        s = s + chalk.red(`No ${key} found :( for this category`)
                    }
                    s = s + '\n'
                    s = s + '------------------------\n'
                } else {
                    s = s + `${key} : ${value} \n\n`
                }
            }
        })
        return s
    },
    'full': (data) => {
        let s = '****************************\n'
        for (let [key, value] of Object.entries(data)) {
            s = s + `${chalk.blue(key)} \n\n`
            for (let [k, v] of Object.entries(value)) {
                s = s + `${chalk.green(k)} \n\n`
                if(v.length === 0) {
                    s = s + chalk.red(`No ${k} found :( for this category`)
                }
                v.forEach((i, index) => {
                    if (i.text) {
                        s = s + `${index + 1}. ${i.text} \n`
                    } else {
                        s = s + `${index + 1}. ${i} \n`
                    }
                })
                s = s + '\n'
            }
            s = s + '****************************\n'
        }
        return s;
    }
}