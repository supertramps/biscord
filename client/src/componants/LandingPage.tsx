import React from "react";
import {
  Box,
  makeStyles,
  TextField,
  Theme,
  Typography,
} from "@material-ui/core";
import logoGif from "../assets/biscord.gif"

function LandingPage() {
  const classes = useStyles();
  return (
    <Box className={classes.root}>
      <Typography className={classes.logoStyle} variant="h1">Biscord</Typography>
      <img className={classes.logoIconStyle} src={logoGif} alt="logo.gif" />
      <Typography className={classes.greeterStyle}>Like Discord, but with a B</Typography>
      <form noValidate autoComplete="off">
        <TextField className={classes.textFieldStyle} id="outlined-basic" label="Your name..." variant="outlined" />
      </form>
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
