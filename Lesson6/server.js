import http from "http";
import { Server } from 'socket.io';
import fs from "fs";
import path from "path";

const host = "localhost";
const port = 3000;


const server = http.createServer((req, res) => {
  if (req.method === 'GET') {
    const filePath = path.join(process.cwd(), "./index.html");
    const rs = fs.createReadStream(filePath);

    rs.pipe(res);
  }
});
const io = new Server(server);

let currentUsersCount = 0;

io.on('connection', (client) => {
  console.log(`Websocket connected ${client.id}`) 
  const uid = Date.now().toString(36) + Math.random().toString(36).substr(2)
 
  currentUsersCount++
  client.broadcast.emit('server-usersCount', {usersCount: `${currentUsersCount} users are connected now`})
  client.emit('server-usersCount', {usersCount: `${currentUsersCount} users are connected now`})
  
  client.broadcast.emit('server-msg', {msg: `User ${uid} connected`})

  client.on('client-msg', (data) => {
    client.broadcast.emit('server-msg', { msg: `User ${uid} sent: ${data.msg}` })
    client.emit('server-msg', { msg: `You sent: ${data.msg}` })
  })

  client.on('disconnect', () => {
    currentUsersCount--
    client.broadcast.emit('server-usersCount', {usersCount: `${currentUsersCount} users are connected now`})
    client.broadcast.emit('server-msg', {msg: `User ${uid} disconnected`})
  })
})

server.listen(port, host, () =>
  console.log(`Server running at http://${host}:${port}`)
);
