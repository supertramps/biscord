import React, { useEffect, useState } from "react";

import socketIOClient from "socket.io-client";

import { ThemeProvider, Box, makeStyles, Theme } from "@material-ui/core";

import "./App.css";
import LandingPage from "./components/LandingPage";
import SidePanel from "./components/Panel";
import { theme } from "./providers/ThemeProvider";
import MainPage from "./components/MainPage";
import SocketProvider from "./providers/SocketContext";

function App() {
  const classes = useStyles();
  const [openInputs, setOpenInputs] = useState<boolean>(false);

  return (
    <>
      <SocketProvider>
        <Box className={classes.appContainer}>
          <Box className={classes.flexContainer}>
            <SidePanel createInputFields={setOpenInputs}/>
            <MainPage inputFieldsOpen={openInputs}/>
          </Box>
        </Box>
        <ThemeProvider theme={theme}>{<LandingPage />}</ThemeProvider>
      </SocketProvider>
    </>
  );
}

const useStyles = makeStyles((theme: Theme) => ({
  flexContainer: {
    display: "flex",
    justifyContent: "center",
  },
  appContainer: {
    width: "100vw",
  },
}));

export default App;
