import React, { useEffect } from "react";

import socketIOClient from "socket.io-client";

import { ThemeProvider, Box, makeStyles, Theme } from "@material-ui/core";

import "./App.css";
import LandingPage from "./components/LandingPage";
import SidePanel from "./components/Panel";
import { theme } from "./providers/ThemeProvider";
import MainPage from "./components/MainPage";
import SocketProvider from "./providers/SocketContext";
import Giphy from "./components/Giphy";

function App() {
  const classes = useStyles();
  return (
    <>
      <ThemeProvider theme={theme}>
        <SocketProvider>
          <Box className={classes.appContainer}>
            <Box className={classes.flexContainer}>
              <SidePanel />
              <MainPage />
            </Box>
            {/* <Giphy /> */}
            <LandingPage />
          </Box>
        </SocketProvider>
      </ThemeProvider>
    </>
  );
}

const useStyles = makeStyles((theme: Theme) => ({
  flexContainer: {
    display: "flex",
    justifyContent: "center",
  },
  appContainer: {
    width: "100%",
  },
}));

export default App;
