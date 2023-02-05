#!/usr/bin/env node

import { createReadStream, createWriteStream } from 'node:fs';
import * as readline from 'node:readline';
import path from 'path';
import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';
import inquirer from 'inquirer';
import fs from 'fs';

const __dirname = '/home/vpnin/gbnodejsproject/Lesson4/';

const options = yargs(hideBin(process.argv))
    .usage('Usage: -s <substring>')
    .option('s', {
        alias: 'substring',
        describe: 'Substring which has to be found in lines of choosed file',
        demandOption: true
    }).argv

const chooseFileToRead = (subpathToFile = '', prevSubpathToFile = '') => {
    let pathToFile = path.join(prevSubpathToFile, subpathToFile);

    fs.readdir(path.join(__dirname, pathToFile), (err, files) => {
        if (err) console.log(err);
        if (files.length === 0) throw new Error('CHOOSED DIRECTORY IS EMPTY!');
        inquirer.prompt({
            name: 'fileName',
            type: 'list',
            message: 'Choose file',
            choices: [...files]
        })
        .then(({ fileName }) => {
            fs.stat(path.join(__dirname, pathToFile, fileName), (err, src) => {
                if (err) console.log(err);
                if (!src.isFile()) {
                    chooseFileToRead(fileName, pathToFile);
                }   else {

                    const rs = createReadStream(path.join(__dirname, pathToFile, fileName), () => {
                        encoding: 'utf-8'
                    });
                    rs.on('end', () => console.log('Reading is completed!'));
                    rs.on('error', err => console.log('error reading:  ' + err.message));
                    
                    const ws = createWriteStream('./excerpt_from_file.log', {flags: 'a'});
                    ws.on('end', () => console.log('excerpt_from_file.log writing is completed!'));
                    ws.on('error', err => console.log(err.message));
                    
                    const rl = readline.createInterface({input: rs});
                    
                    rl.on('line', (string) => {
                        if (string.includes(options.s)) {
                            ws.write('\n' + string);
                        }
                    });

                }
            });
        });
    });
};

chooseFileToRead();