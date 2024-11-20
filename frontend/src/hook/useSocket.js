import { useEffect, useRef } from "react";
import { io } from "socket.io-client";

const useSocket = () => {
  const socket = useRef(null);

  useEffect(() => {
    socket.current = io("http://localhost:5000"); // Replace with your backend URL
    return () => socket.current.disconnect();
  }, []);

  return socket;
};

export default useSocket;
