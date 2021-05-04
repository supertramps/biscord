import {
  Avatar,
  // Icon,
  Box,
  makeStyles,
  Theme,
  Typography,
  Link,
  Button,
  Modal,
  TextField,
  Tooltip,
  Zoom,
} from "@material-ui/core";

import { useContext } from "react";
import SocketContext, { SocketConsumer } from "../providers/SocketContext";


function MainPage() {
  const classes = useStyles();
  return (

    <Box className={classes.root}>
      <Typography variant="body1">Test</Typography>
      <Typography variant="body2">super</Typography>
      <Typography variant="h5">BISCORD</Typography>
      <Box className={classes.messageContainer}></Box>
      <Box mb={3} className={classes.formContainer}>
        <form className={classes.formStyling}>
          <Box className={classes.formFlex}>
            <Box mr={2} className={classes.inputContainer}>
              <input
                placeholder="Message #React"
                type="text"
                className={classes.textFieldStyling}
              />
            </Box>
            <Box className={classes.buttonContainer}>
              <Button color="primary" className={classes.buttonStyling}>
                Send
              </Button>
            </Box>
          </Box>
        </form>
      </Box>
  );
}

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    backgroundColor: "#36393F",
  },
  formContainer: {
    width: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "flex-end",
  },
  formStyling: {
    width: "100%",
    borderRadius: "10px",
    backgroundColor: "transparent",
  },
  textFieldStyling: {
    width: "100%",
    height: "2.8rem",
    backgroundColor: "#40444B",
    border: "none",
    fontFamily: "whitney",
    color: "fff",
    fontSize: "1rem",
    outline: "none",
    borderRadius: "10px",
    paddingInline: "1rem",
  },
  inputContainer: {
    width: "100%",
    height: "100%",
  },
  buttonContainer: {
    marginLeft: "2rem",
  },
  buttonStyling: {
    width: "9.5rem",
    height: "2.8rem",
    backgroundColor: "#7289DA",
    color: "#fff",
    fontFamily: "whitney",
  },
  formFlex: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    paddingLeft: "1rem",
    paddingRight: "1rem",
  },
  messageContainer: {
    height: "100%",
    width: "100%",
  },
}));

export default MainPage;
