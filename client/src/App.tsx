import React, { useEffect } from "react";
import { ThemeProvider } from "@material-ui/core";

import "./App.css";
import LandingPage from "./componants/LandingPage";
import { theme } from "./providers/ThemeProvider";
import MainPage from "./componants/MainPage";
import SocketProvider from "./providers/SocketContext";

function App() {
 
  return (
    <>
      <SocketProvider>
        <MainPage />
        <ThemeProvider theme={theme}>
          <LandingPage />
        </ThemeProvider>
      </SocketProvider>
    </>
  );
}

export default App;
