import { Server as SocketIOServer, Socket } from "socket.io"


export const socketConnection = (httpServer: any) => {

  const io = new SocketIOServer(httpServer, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"]
    }
  })
  io.use((socket: Socket, next: any) => {
    const { token } = socket.handshake.auth;

    if (!token) {
      return next(new Error('no token available'));
    }
    console.log(token)

    console.log(process.env.JWT_SECRET)
    next()
    // try {
    //   const payload = jwt.verify(token, process.env.JWT_SECRET as string);
    //   console.log("Token payload:", payload);
    //   socket.data.user = payload; // Attach payload to socket data if needed
    //   next();
    // } catch (error) {
    //   console.error("Token verification error:", error);
    //   next(new Error("Authentication error"));
    // }

  });


  io.on("connection", (socket) => {
    console.log("A user connected")

    socket.on("disconnect", () => {
      console.log("A user disconnected")
    })
  })
}


