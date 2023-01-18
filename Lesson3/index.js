import { createReadStream, createWriteStream } from 'node:fs';
import * as readline from 'node:readline';

const rs = createReadStream('./access_tmp.log', () => {
    encoding: 'utf-8'
});
rs.on('end', () => console.log('Reading is completed!'));
rs.on('error', err => console.log('error reading:  ' + err.message));

const wsTo89_123_1_41_log = createWriteStream('./89.123.1.41_requests.log', {flags: 'a'});
wsTo89_123_1_41_log.on('end', () => console.log('89.123.1.41_requests.log writing is completed!'));
wsTo89_123_1_41_log.on('error', err => console.log(err.message));

const wsTo34_48_240_111_log = createWriteStream('./34.48.240.111_requests.log', {flags: 'a'});
wsTo34_48_240_111_log.on('end', () => console.log('34.48.240.111_requests.log writing is completed!'));
wsTo34_48_240_111_log.on('error', err => console.log(err.message));

const rl = readline.createInterface({input: rs});

rl.on('line', (string) => {
    if (string.includes('89.123.1.41')) {
        wsTo89_123_1_41_log.write('\n' + string);
    }
    if (string.includes('34.48.240.111')) {
        wsTo34_48_240_111_log.write('\n' + string);
    }
});