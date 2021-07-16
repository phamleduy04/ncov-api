const moment = require('moment-timezone');
const chalk = require('chalk');

const timeNow = () => moment().tz('America/Chicago').format("MM-DD-YYYY hh:mm:ss");
const msg = (func, message) => func(chalk.yellow(`[${timeNow()}]`) + ' ' + chalk.green(message));

const err = (message = 'Unkown Err!', err) => {
    console.error(chalk.yellow(timeNow()) + ' Error: ' + chalk.red(message));
    console.error(err);
};

const info = (message) => msg(console.info, message);
const warn = (message) => msg(console.warn, `${chalk.yellow('WARNING ->')} -> ${message}`);


module.exports = {
    err,
    info,
    warn,
};