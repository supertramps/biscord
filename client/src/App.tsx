import React, { useEffect } from "react";
import socketIOClient from "socket.io-client";
import { ThemeProvider } from "@material-ui/core";

import "./App.css";
import LandingPage from "./componants/LandingPage";
import { theme } from "./providers/ThemeProvider";
import MainPage from "./componants/MainPage";

function App() {
  const socket = socketIOClient("http://localhost:6969", {
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
    <>
      <MainPage />
      <ThemeProvider theme={theme}>
        <LandingPage />
      </ThemeProvider>
    </>
  );
}

export default App;
