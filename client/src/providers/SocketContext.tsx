import { createContext, useEffect, useState } from "react";
import io from "socket.io-client";
import { ObjectType } from "typescript";

export interface Message {
  message: string,
  user: string,
  room: string,
  time: string,
}
export interface User {
  id: string,
  name: string,
  room: string,
  password: string,
}
export interface Room {
  roomName: string,
  password: string
}

interface State {
  socket: any;
  room: any;
  getUserName: (value: any) => void;
  creatNewRoom: (roomInfo: object, userInfo: object) => void;
}

export const SocketContext = createContext<State>({
    socket: "",
    room: {},
    getUserName: () => {},
    creatNewRoom: () => {},
});

interface Props {
  children: Object;
}

function SocketProvider(props: Props) {
  const [messages, setMessages] = useState<any>([] as Message[]);
  const [room, setRoom] = useState<any>([] as Room[]);
  const [user, setUser] = useState<any>("user");
  const [socket, setSocket] = useState<any>()
  const ENDPOINT = 'localhost:6969'
  
  function getUserName(value: any){
    setUser(value)
  }

  function createNewRoom(roomInfo: object, userInfo: any){
    socket.emit('create-room', {roomInfo, userInfo})
    socket.on('room-session', (room: any) => {
      setRoom(room)
    })
  }

  useEffect(() => {
    if(user !== "user") { 
      let socket = io(ENDPOINT, {
        transports: ["websocket"],
      });
      setSocket(socket)
      socket.emit('join-lobby', user)
    }
  }, [ENDPOINT, user]);

  useEffect(() => {

  })

  return (
    <SocketContext.Provider 
      value={{
        socket: socket,
        room: room,
        getUserName: getUserName,
        creatNewRoom: createNewRoom,
      }}>
        {props.children}
    </SocketContext.Provider>
  );
}

export const SocketConsumer = SocketContext.Consumer;
export default SocketProvider;

