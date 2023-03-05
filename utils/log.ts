import * as dayjs from 'dayjs';
import * as utc from 'dayjs/plugin/utc';
import * as timezone from 'dayjs/plugin/timezone';
dayjs.extend(utc);
dayjs.extend(timezone);

import { yellow, green, red } from 'colorette';

const timeNow = () => dayjs().tz(process.env.TZ || 'America/Chicago').format('MM/DD/YYYY hh:mm:ss');

const msg = (func: any, message: string) => func(yellow(`[${timeNow()}]`) + ' ' + green(message));

const error = (message = 'Unknown error', err:Error) => {
    console.error(yellow(timeNow()) + ' Error: ' + red(message));
    console.error(err);
};

const info = (message:string) => {
    console.log(message);
    msg(console.info, message);
};
const warn = (message:string) => msg(console.warn, `${yellow('WARNING ->')} -> ${message}`);

export {
    error,
    info,
    warn,
};