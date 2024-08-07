import { Server as SocketIOServer } from "socket.io";

const clients = new Map();

export const socketConnection = (httpServer: any) => {
  const io = new SocketIOServer(httpServer, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"],
    },
    pingInterval: 25000, // Adjust the ping interval (default is 25000ms)
    pingTimeout: 60000,  // Adjust the ping timeout (default is 60000ms)
  });

  io.on("connection", (socket) => {
    console.log("A user connected");

    // Assuming you have some way to uniquely identify a client, such as a user ID.
    const clientId = socket.handshake.query.clientId;

    // Check if the client is already connected
    if (clients.has(clientId)) {
      // Disconnect the previous socket
      const previousSocket = clients.get(clientId);
      previousSocket.disconnect();
    }

    // Store the new socket
    clients.set(clientId, socket);

    socket.on("disconnect", (reason) => {
      console.log(`A user disconnected due to: ${reason}`);
      clients.delete(clientId);
    });

    socket.on("message", (msg) => {
      console.log("Received message:", msg);
      socket.broadcast.emit("message", msg);
    });
  });
};
