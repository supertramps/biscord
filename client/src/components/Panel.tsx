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
import { useContext, useEffect, useState } from "react";
import {SocketContext} from "../providers/SocketContext";

function SidePanel() {
  const classes = useStyles();
  const { usersession } = useContext(SocketContext);
  const [user, setUser] = useState<any>("");

useEffect(() => {
  const loadUser = async () => {
    if(!usersession){
      return;
    }
    await usersession.on('user-session', (lUser: any) => {
        setUser(lUser)
    })
  }
  loadUser();
})

console.log(user)
  
  return (
    <Box className={classes.root}>
      <Box className={classes.topContainer}>
        <Box className={classes.searchBarContainer}>
          <TextField placeholder="search..."></TextField>
        </Box>
        <Box mt={2} ml={5} className={classes.roomList}>
          <Typography>#React</Typography>
          <Typography>#Javascript</Typography>
          <Typography>#Node</Typography>
          <Typography>#Typescript</Typography>
        </Box>
      </Box>
      <Box className={classes.bottomContainer}>
        <Box mb={2} className={classes.statusBox}>
          <Box className={classes.statusBoxContent}>
            <Box className={classes.statusBoxFlex}>
              <Box>
                <Avatar>Z</Avatar>
              </Box>
              <Box ml={1}>
                <Typography>{!user.name ? "placeholder" : user.name}
              </Typography>
              </Box>
            </Box>
            <Typography>X</Typography>
          </Box>
          <Box>
            <Typography>Connected</Typography>
          </Box>
        </Box>
        <Box mb={2} className={classes.buttonContainer}>
          <Button className={classes.buttonStyling}>Create Room</Button>
        </Box>
      </Box>
    </Box>
  );
}

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
    height: "100vh",
    width: "20vw",
    backgroundColor: "#23272A",
  },
  roomList: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    width: "80%",
  },
  statusBox: {
    width: "80%",
    height: "6rem",
    backgroundColor: "#40444B",
    borderRadius: "20px",
    padding: "1rem",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
  },
  statusBoxFlex: {
    display: "flex",
  },
  statusBoxContent: {
    display: "flex",
    alignItems: "flex-start",
    justifyContent: "space-between",
  },
  buttonStyling: {
    width: "100%",
    height: "3rem",
    backgroundColor: "#7289DA",
    color: "#fff",
    fontFamily: "whitney",
    borderRadius: "20px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
  },
  buttonContainer: {
    width: "50%",
  },
  bottomContainer: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  searchBarContainer: {
    width: "80%",
    backgroundColor: "#303338",
  },
  topContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "2rem",
    width: "100%",
  },
}));

export default SidePanel;
