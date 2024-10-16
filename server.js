const express = require('express');
const cors = require('cors');
const http = require('http');
const WebSocket = require('ws');
const path = require('path');
const app = express();

app.use(cors({
  origin: "aaronislonely.com",
  credentials: true
}));

app.use(express.json());

const server = http.createServer(app);

const wss = new WebSocket.Server({server});
wss.on('connection', function connection(ws) {
  ws.on('message', function incoming(data) {
    wss.clients.forEach(function each(client) {
      if (client !== ws && client.readyState === WebSocket.OPEN) {
        client.send(data);
      }
    });
  });
});

app.use(express.static("/var/www/lonely/build"));
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '/build/index.html'));
});

server.listen(3030, () => {
  console.log('server listening on port 3030');
});

