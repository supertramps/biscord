import { createContext, useEffect, useState } from "react";
import io from "socket.io-client";

export interface Message {}
export interface User {
  user: string
}
export interface Room {}

interface State {
  getUserName: (value: any) => void;
}

export const SocketContext = createContext<State>({
    getUserName: () => {},
});

interface Props {
  children: Object;
}

function SocketProvider(props: Props) {
  const [messages, setMessages] = useState<any>([] as Message[]);
  const [room, setRoom] = useState<any>([] as Room[]);
  const [user, setUser] = useState<any>([] as User[]);
  const ENDPOINT = 'localhost:6969'

 

  function getUserName(value: any){
    setUser(value)
  }

  useEffect(() => {
    let socket = io(ENDPOINT, {
      transports: ["websocket"],
    });
    socket.emit('join', user)

    /* socket.on("connect", () => {
      console.log("connected");
    });
    socket.on("event", (data: any) => {
      console.log(data);
    }); */

    /* return () => {
      socket.emit('disconnect');
      socket.off();
    } */
  }, [ENDPOINT, user]);

  return (
    <SocketContext.Provider 
      value={{
        getUserName: getUserName,
      }}>
        {props.children}
    </SocketContext.Provider>
  );
}

export const SocketConsumer = SocketContext.Consumer;
export default SocketProvider;
