import React, { useContext, useState } from "react";
import {
  Box,
  Button,
  makeStyles,
  TextField,
  Theme,
  Typography,
} from "@material-ui/core";
import logoGif from "../assets/biscord.gif"
import {SocketContext} from "../providers/SocketContext";



function LandingPage() {
  const classes = useStyles();
  const [username, setUsername] = useState<string>("")
  const { getUserName } = useContext(SocketContext)
 
  function handleChange(value: string){
    setUsername(value)
  }

  return (
    <Box className={classes.root}>
      <Typography className={classes.logoStyle} variant="h1">Biscord</Typography>
      <img className={classes.logoIconStyle} src={logoGif} alt="logo.gif" />
      <Typography className={classes.greeterStyle}>Like Discord, but with a B</Typography>
      <form noValidate autoComplete="off">
        <TextField 
          className={classes.textFieldStyle} 
          id="outlined-basic" 
          label="Your name..." 
          variant="outlined" 
          onChange={(event) => handleChange(event.target.value)}
        />
      </form>
        <Button
          onClick={() => {
            if(username !== ""){
            getUserName(username)
            }
          }}
        >
          Join
        </Button>
    </Box>
  );
}

export default LandingPage;

const useStyles = makeStyles((theme: Theme) => ({
    root: {
        display:"flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",   
        background: "#2C2F33"
    },
    logoIconStyle: {},
    logoStyle: {
    },
    greeterStyle: {
        margin: "2rem"
    },
    textFieldStyle: {
        width: "30rem",
        background: "#40444B"
    }

}));
