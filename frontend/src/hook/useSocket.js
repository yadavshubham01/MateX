import { useEffect, useRef } from "react";
import { io } from "socket.io-client";

const useSocket = () => {
  const socket = useRef(null);

  useEffect(() => {
    socket.current = io("https://matex.onrender.com"); 
    return () => socket.current.disconnect();
  }, []);

  return socket;
};

export default useSocket;
