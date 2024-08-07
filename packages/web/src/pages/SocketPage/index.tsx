import { useState, useEffect } from "react";
import { Socket, io } from "socket.io-client";
import { FCookie } from "../../utils/cookieGet";

const SERVER_URL = "http://localhost:9000"; // Replace with your server URL

function SocketPage() {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [connected, setConnected] = useState(false);
  const [message, setMessage] = useState("");
  const [receivedMessage, setReceivedMessage] = useState("");

  useEffect(() => {
    const newSocket = io(SERVER_URL, {
      auth: {
        token: FCookie.get("admin_token"), // Replace with your actual token
      },
      reconnectionAttempts: 5, // Limit the number of reconnection attempts
      reconnectionDelay: 1000, // Delay between reconnection attempts in milliseconds
      timeout: 20000, // Connection timeout in milliseconds
    });

    setSocket(newSocket);

    newSocket.on("connect", () => {
      console.log("Connected to server");
      setConnected(true);
    });

    newSocket.on("disconnect", (reason) => {
      console.log(`Disconnected from server: ${reason}`);
      setConnected(false);
    });

    newSocket.on("message", (msg) => {
      console.log("Received broadcast message:", msg);
      setReceivedMessage(msg);
    });

    newSocket.on("connect_error", (error) => {
      console.error("Connection error:", error);
    });

    return () => {
      if (newSocket) {
        newSocket.disconnect();
      }
    };
  }, []);

  const handleSendMessage = () => {
    if (socket) {
      console.log("Message sent");
      socket.emit("message", message);
    }
  };

  return (
    <div>
      <h1>Socket.IO React Client</h1>
      {connected ? (
        <p className="text-3xl text-black">Connected to server</p>
      ) : (
        <p>Disconnected from server</p>
      )}
      <div>
        <input
          placeholder="Enter message"
          onChange={(e: any) => setMessage(e.target.value)}
          value={message}
        />
        <button onClick={handleSendMessage}>Send Message</button>

        <h3 className="text-3xl">Messages</h3>
        {receivedMessage && (
          <div>
            <h4>{receivedMessage}</h4>
          </div>
        )}
      </div>
    </div>
  );
}

export default SocketPage;
