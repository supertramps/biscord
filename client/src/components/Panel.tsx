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
import {SocketContext } from "../providers/SocketContext";

interface Props {
  createInputFields: any;
  userInfo: any;
}

function SidePanel(props:Props) {
  const classes = useStyles();
  const { socket, room } = useContext(SocketContext);
  const [user, setUser] = useState<any>();
  
  console.log(room)

  useEffect(() => {
    const loadUser = async () => {
      if(!socket){
        return;
      }
      await socket.on('user-session', (lUser: any) => {
          setUser(lUser)
      })
    }
    loadUser();
  })

  return (
    <Box className={classes.root}>
      <Box className={classes.topContainer}>
        <Box className={classes.searchBarContainer}>
          <TextField placeholder="search..."></TextField>
        </Box>
        <Box mt={2} ml={5} className={classes.roomList}>
<<<<<<< HEAD
          {
          rooms ? rooms.map((room: any) => 
            <Box>
             <Link>
               <Typography 
                  variant="body1"
                  onClick={()=>{
                    console.log(room)
                  }}
               >
                {`#${room.room}`}
                </Typography>
             </Link>
           </Box>
          ) : null}
=======
          <Box>
            <Link>
              <Typography variant="body1">{`#${room.room}`}</Typography>
            </Link>
          </Box>
          <Box>
            <Typography variant="body1">#Javascript</Typography>
          </Box>
          <Box>
            <Typography variant="body1">#Node</Typography>
          </Box>
          <Box>
            <Typography variant="body1">#Typescript</Typography>
          </Box>
>>>>>>> parent of 681406e (niiiice)
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
                <Typography>
                {!user ? "placeholder" : user.name}
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
        <Button 
            className={classes.buttonStyling}
            onClick={() => {
              
            }}
          >
            Join Room
          </Button>
          <Button 
            className={classes.buttonStyling}
            onClick={() => {
              props.createInputFields(true)
              props.userInfo(user)
            }}
          >
            Create Room
          </Button>
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
