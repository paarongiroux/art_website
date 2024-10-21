const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const http = require('http');
const WebSocket = require('ws');
const path = require('path');
const app = express();

const FRONTEND_URL = process.env.FRONTEND_URL || 'http://localhost:3000'
const PORT = process.env.PORT || 3030;

app.use(cors({
  origin: FRONTEND_URL,
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

app.use(express.static(path.join(__dirname, '/build')));
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '/build/index.html')); //actually may want to set these paths in dotenv config.
});

server.listen(PORT, () => {
  console.log('server listening on port 3030');
});

