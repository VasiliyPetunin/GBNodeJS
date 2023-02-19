import http from 'http';
import fs from 'fs';
import path from 'path';

const host = 'localhost';
const port = 3000;



const server = http.createServer((request, response) => {

    if (request.url !== '/favicon.ico') {
         
        fs.stat(path.join(process.cwd(), request.url), (err, src) => {
            if (err) response.end(err);
            if (src.isFile()) {

                const readStream = fs.createReadStream(path.join(process.cwd(), request.url), {encoding: 'utf-8'});
                readStream.on('data', (chunk) => {
                    response.write(chunk);
                })
                readStream.on('end', () => {
                    response.end();
                })

            }   else {

                fs.readdir(path.join(process.cwd(), request.url), (err, files) => {
                    if (err) response.end(err);
                    if (files.length === 0) {
                        response.end('CHOOSED DIRECTORY IS EMPTY!');
                    }   else {
                        let filesListHtml = '';
                        files.map((file, index) => {
                            filesListHtml += `<a href="${path.join(request.url, file)}">${++index}.${file}</a>\n`;
                        })
                        response.end(filesListHtml);
                    }
                })

            }
        })

    }   else {
        response.end();
    }

})

server.listen(port, host, () => console.log(`Server running at http://${host}:${port}`));