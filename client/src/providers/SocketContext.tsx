import { createContext, useEffect, useState } from "react";

export interface Message {

}
export interface User {

}
export interface Room {

}

interface State {

}

export const SocketContext = createContext<State>({
 
});

interface Props {
  children: Object;
}

function PostProvider(props: Props) {
  const [messages, setMessages] = useState<any>([] as Message[]);
  const [room, setRoom] = useState<any>([] as Room[]);
  const [user, setUser] = useState<any>([] as User[]);
 
  useEffect(() => {
  }, []);


  return (
    <SocketContext.Provider
      value={{
      }}
    >
      {props.children}
    </SocketContext.Provider>
  );
}

export const SocketConsumer = SocketContext.Consumer;
export default SocketContext;
