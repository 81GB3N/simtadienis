const { Server } = require('socket.io');

function initializeSocket(server){

  const isLocalhost = window.location.hostname === 'localhost';
  const origin = isLocalhost ? 'http://localhost:3000' : 'https://lic100.lt';  

const io = new Server(server, {
  cors: {
    origin: origin, // Replace with your React frontend URL
    methods: ["GET", "POST"],
  },
});

return io;
}

module.exports = {
initializeSocket
}