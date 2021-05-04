import React, { useEffect } from 'react'
import socketIOClient from "socket.io-client";
import './App.css';

function App() {
  const socket = socketIOClient('http://localhost:6969', {
    transports: ['websocket'],
  });

  useEffect(() => {
    socket.on('connect', () => {
      console.log('connected');
    });
    socket.on('event', (data: any) => {
      console.log(data);
    });

  }, []);
  return (
    <div className='App'>
     Socket Proxy test
    </div>
  );
}

export default App;
