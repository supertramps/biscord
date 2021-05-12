import React, { useEffect, useState } from "react";

import socketIOClient from "socket.io-client";

import { ThemeProvider, Box, makeStyles, Theme } from "@material-ui/core";

import "./App.css";
import LandingPage from "./components/LandingPage";
import SidePanel from "./components/Panel";
import { theme } from "./providers/ThemeProvider";
import MainPage from "./components/MainPage";
import SocketProvider, { User } from "./providers/SocketContext";

function App() {
  const classes = useStyles();
  const [openInputs, setOpenInputs] = useState<boolean>(false);
  const [userInfo, setUserInfo] = useState<any>();
  const [usernameSet, setUsernameSet] = useState(false);

  function setRenders(value: boolean) {
    setUsernameSet(value);
  }
  function handleInputField(value:boolean){
    setOpenInputs(value)
  }

  return (
    <>
      <ThemeProvider theme={theme}>
        <SocketProvider>
          {!usernameSet ? (
            <LandingPage usernameSet={setRenders} />
          ) : (
            <Box className={classes.appContainer}>
              <Box className={classes.flexContainer}>
                <SidePanel
                  createInputFields={setOpenInputs}
                  userInfo={setUserInfo}
                />
                <MainPage handleInputField={handleInputField} inputFieldsOpen={openInputs} userInfo={userInfo} />
              </Box>
            </Box>
          )}
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
