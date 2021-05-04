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
      <Typography variant="h1">Biscord</Typography>
      <img src={logoGif} alt="logo.gif" />
      <Typography>Like Discord, but with a B</Typography>
      <form noValidate autoComplete="off">
        <TextField id="outlined-basic" label="Outlined" variant="outlined" />
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

}));
