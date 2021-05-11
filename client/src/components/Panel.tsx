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
import { SocketContext } from "../providers/SocketContext";
import searchIcon from "../assets/search_icon.svg";
import onlineIcon from "../assets/online_icon.svg";
import offlineIcon from "../assets/offline_icon.svg";
import passwordIcon from "../assets/password.svg";

interface Props {
  createInputFields: any;
  userInfo: any;
}

function SidePanel(props: Props) {
  const classes = useStyles();
  const { socket, room } = useContext(SocketContext);
  const [roomValidationModal, setRoomValidationModal] = useState(false);
  const [user, setUser] = useState<any>();
  const [rooms, setRooms] = useState<any>();
  const [statusIcon, setStatusIcon] = useState<any>(offlineIcon);
  const [avatarLetter, setAvatarLetter] = useState<string>("");
  const [userRoom, setCurrentUserRoom] = useState<any>({ password: "" });
  const [selectedRoom, setSelectedRoom] = useState<any>()

  console.log(rooms)

  const handleOpen = () => {
    setRoomValidationModal(true);
  };

  const handleClose = () => {
    setRoomValidationModal(false);
  };

  // Checks if there is a user, changes connection status
  function checkIfOnline() {
    if (!user) {
      setStatusIcon(offlineIcon);
    } else {
      setStatusIcon(onlineIcon);
    }
  }

  // Get first letter from user.name to set as avatar
  function getAvatarLetter() {
    const username = user.name;
    const avatarLetter = username.charAt(0).toUpperCase();
    setAvatarLetter(avatarLetter);
  }

  function switchRooms(userSwitch: any, room: any) {
    socket.emit("switch-room", { userSwitch, room });
  }

  const checkIfValid = () => {
    if (!userRoom) {
      return;
    } else {
      return userRoom;
    }
  };

  useEffect(() => {
    if (!socket) return;

    const handleUserSession = (lUser: any) => {
      setUser(lUser);
    };
    const handleRoomSession = (room: any) => {
      setRooms(room);
    };
    const handleCurrentRoom = (room: any) => {
      setCurrentUserRoom(room);
    };

    socket.on("user-session", handleUserSession);
    socket.on("room-session", handleRoomSession);
    socket.on("current-room", handleCurrentRoom);

    checkIfOnline();
    checkIfValid();
    if (user) {
      getAvatarLetter();
    }
  });

  return (
    <Box className={classes.root}>
      <Box className={classes.topContainer}>
        <Box className={classes.searchBarContainer}>
          <Box>
            <input
              placeholder="Search..."
              type="text"
              className={classes.searchBarContainer}
            />
          </Box>
          <img src={searchIcon} alt="" />
        </Box>
        <Box mt={2} ml={5} className={classes.roomList}>
          {rooms
            ? rooms.map((room: any, i: number) => (
                <Box className={classes.roomContainer}>
                  <Link>
                    <Box className={classes.panelRooms}>
                      <Typography
                        key={i}
                        variant="body1"
                        onClick={() => {
                          setSelectedRoom(room.roomName)
                          room.password === "" 
                          ? switchRooms(userRoom, room) 
                          : handleOpen()
                        }}
                      >
                        {room.roomName ? `#${room.roomName}` : null}
                      </Typography>
                      <Box ml={2} mt={1}>
                        {room.password !== "" ? <img src={passwordIcon} alt="" /> : null}
                      </Box>
                    </Box>
                  </Link>
                </Box>
              ))
            : null}
        </Box>
      </Box>
      <Box className={classes.bottomContainer}>
        <Box mb={2} className={classes.statusBox}>
          <Box className={classes.statusBoxContent}>
            <Box className={classes.statusBoxFlex}>
              <Box>
                {!user ? null : (
                  <Avatar className={classes.avatarStyling}>
                    {avatarLetter}
                  </Avatar>
                )}
              </Box>
              <Box ml={1}>
                <Typography>{!user ? "Please log in" : user.name}</Typography>
              </Box>
            </Box>
          </Box>
          <Box mt={1} className={classes.connectionStatus}>
            <Box mr={1}>
              <img src={statusIcon} alt="" />
            </Box>
            {!user ? (
              <Typography variant="body2">Disconnected</Typography>
            ) : (
              <Typography variant="body2">Connected</Typography>
            )}
          </Box>
        </Box>
        <Box mb={3} className={classes.buttonContainer}>
          <Button
            className={classes.buttonStyling}
            onClick={() => {
              props.createInputFields(true);
              props.userInfo(user);
            }}
          >
            Create Room
          </Button>
        </Box>
      </Box>
    <Modal
        className={classes.modal}
        open={roomValidationModal}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
    >
          <Box className={classes.roomFormContainer}>
            <form
              onSubmit={(e) => {
                e.preventDefault();
              }}
              noValidate
              autoComplete="off"
              className={classes.form}
            >
              <Typography variant="body2">
                Join room {selectedRoom}
              </Typography>
              <TextField
                className={classes.textFieldStyle}
                id="outlined-basic"
                label="Password...(⚔)"
                variant="outlined"
                name="password"
              />
              <Box>
                <Button
                  type="submit"
                  color="secondary"
                  variant="contained"
                  onClick={() => {
                   
                  }}
                >
                  Join
                </Button>
              </Box>
            </form>
          </Box>
      </Modal>
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
    minWidth: "10rem",
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
    boxShadow: "3px 5px 6px -4px rgba(0,0,0,0.7)",
  },
  statusBoxFlex: {
    display: "flex",
  },
  statusBoxContent: {
    display: "flex",
    alignItems: "flex-start",
    justifyContent: "space-between",
  },
  avatarStyling: {
    background:
      "linear-gradient(126.18deg, #5317FD -6.87%, rgba(236, 152, 233, 0.91) 125.18%)",
  },
  connectionStatus: {
    display: "flex",
    alignItems: "center",
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
    boxShadow: "3px 5px 6px -4px rgba(0,0,0,0.7)",
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
    height: "2.8rem",
    backgroundColor: "#40444B",
    border: "none",
    fontFamily: "whitney",
    color: "#fff",
    fontSize: "1rem",
    outline: "none",
    borderRadius: "10px",
    paddingInline: "1rem",
    display: "flex",
    justifyContent: "space-between",
  },
  topContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "2rem",
    width: "100%",
  },
  roomContainer: {
    width: "100%",
    
    alignItems: "center",
    justifyContent: "flex-start",
  },
  panelRooms: {
    display: "flex",
  },
  modal : {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  textFieldStyle: {
    width: "30rem",
    background: "#40444B",
    margin: "1rem",
  },
  form: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
  },
  roomFormContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: 'center',
  },
}));

export default SidePanel;
