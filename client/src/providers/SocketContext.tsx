import { createContext, useEffect, useState } from "react";
import socketIOClient from "socket.io-client";

export interface Message {}
export interface User {}
export interface Room {}

interface State {}

export const SocketContext = createContext<State>({});

interface Props {
  children: Object;
}

function SocketProvider(props: Props) {
  const [messages, setMessages] = useState<any>([] as Message[]);
  const [room, setRoom] = useState<any>([] as Room[]);
  const [user, setUser] = useState<any>([] as User[]);

  let socket = socketIOClient("http://localhost:6969", {
    transports: ["websocket"],
  });

  useEffect(() => {
    socket.on("connect", () => {
      console.log("connected");
    });
    socket.on("event", (data: any) => {
      console.log(data);
    });
  }, []);

  return (
    <SocketContext.Provider value={{}}>{props.children}</SocketContext.Provider>
  );
}

export const SocketConsumer = SocketContext.Consumer;
export default SocketProvider;
