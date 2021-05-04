import classes from "*.module.css";
import {
  Avatar,
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
        <Box mb={3} className={classes.formContainer}>
          <form className={classes.formStyling}>
            <TextField label="Message #ROOM"></TextField>
          </form>
        </Box>
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
    height: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "flex-end",
  },
  formStyling: {
    width: "100%",
    borderRadius: "10px",
    backgroundColor: "#40444B",
  },
  textFieldStyling: {},
}));

export default MainPage;
