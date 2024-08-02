const io = require('socket.io-client');

// Conectar ao WebSocket na porta 8080
const socket = io('http://localhost:8080', {
  path: '/socket.io'
});

// Evento de conexão
socket.on('connect', () => {
  console.log('Conectado ao WebSocket');
});

// Evento de desconexão
socket.on('disconnect', () => {
  console.log('Desconectado do WebSocket');
});

// Evento de mensagem
socket.on('msg', (data) => {
  console.log('Mensagem recebida:', data);
  const jsonData = JSON.parse(data); // Parse o JSON recebido
  console.log('JSON Data:', jsonData);
});

// Enviar uma mensagem para o servidor
socket.emit('msg', 'Hello Everybody');
