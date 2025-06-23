const WebSocket = require('ws');

// Railway pone automáticamente el puerto en process.env.PORT
const PORT = process.env.PORT || 3000;

const wss = new WebSocket.Server({ port: PORT });

wss.on('connection', function connection(ws) {
  console.log("✅ Cliente conectado");

  ws.on('message', function incoming(message) {
    console.log('📨 Mensaje recibido:', message);

    // Reenvía el mensaje a todos los clientes conectados (broadcast)
    wss.clients.forEach(function each(client) {
      if (client.readyState === WebSocket.OPEN) {
        client.send(message);
      }
    });
  });
});
