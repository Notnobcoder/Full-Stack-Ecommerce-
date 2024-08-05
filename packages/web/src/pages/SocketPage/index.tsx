

import { useState, useEffect } from "react";
import { Socket, io } from "socket.io-client";
import { FCookie } from "../../utils/cookieGet";

const SERVER_URL = "http://localhost:9000"; // Replace with your server URL
function SocketPage() {
  const [_socket, setSocket] = useState<Socket | null>(null);
  const [connected, setConnected] = useState(false);



  useEffect(() => {
    const newSocket = io(SERVER_URL, {
      auth: {
        token: FCookie.get("admin_token") // Replace with your actual token
      }
    });

    setSocket(newSocket);

    newSocket.on("connect", () => {
      console.log("Connected to server");
      setConnected(true);
    });

    newSocket.on("disconnect", () => {
      console.log("Disconnected from server");
      setConnected(false);
    });

    return () => {
      newSocket.disconnect();
    };
  }, []);

  return (

    <>
      <div>
        <h1>Socket.IO React Client</h1>
        {connected ? <p className="text-3xl text-black">Connected to server</p> : <p>Disconnected from server</p>}
      </div>   <h4 className='text-3xl'>text</h4>
    </>
  )
}

export default SocketPage
