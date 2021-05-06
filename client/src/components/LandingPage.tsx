import React, { useContext, useState } from "react";
import {
  Box,
  Button,
  makeStyles,
  TextField,
  Theme,
  Typography,
} from "@material-ui/core";
import logoGif from "../assets/biscord.gif";
import { SocketContext } from "../providers/SocketContext";

function LandingPage() {
  const classes = useStyles();
  const [username, setUsername] = useState<string>("");
  const { getUserName } = useContext(SocketContext);

  function handleChange(value: string) {
    setUsername(value);
  }

  return (
    <Box className={classes.root}>
      <Typography className={classes.logoStyle} variant="h1">
        Biscord
      </Typography>
      <img className={classes.logoIconStyle} src={logoGif} alt="logo.gif" />
      <Typography className={classes.greeterStyle}>
        Like Discord with a 🐝
      </Typography>
      <form noValidate autoComplete="off">
        <TextField
          className={classes.textFieldStyle}
          id="outlined-basic"
          label="Your name..."
          variant="outlined"
          onChange={(event) => handleChange(event.target.value)}
          InputProps={{
            classes: { notchedOutline: classes.noBorder },
          }}
        />
      </form>
      <Box mt={3}>
        <Button
          className={classes.joinButton}
          color="secondary"
          onClick={() => {
            if (username !== "") {
              getUserName(username);
            }
          }}
        >
          Join
        </Button>
      </Box>
    </Box>
  );
}

export default LandingPage;

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    background: "#2C2F33",
  },
  logoIconStyle: {},
  logoStyle: {},
  greeterStyle: {
    margin: "2rem",
  },
  textFieldStyle: {
    width: "30rem",
    background: "#40444B",
    boxShadow: "3px 5px 6px -4px rgba(0,0,0,0.7)",
    borderRadius: "10px",
  },
  joinButton: {
    backgroundColor: "#7289DA",
    color: "#fff",
    fontFamily: "whitney",
  },
  noBorder: {
    border: "none",
  },
}));
