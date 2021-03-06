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
import { SocketContext, User, Room } from "../providers/SocketContext";
import searchIcon from "../assets/search_icon.svg";
import onlineIcon from "../assets/online_icon.svg";
import offlineIcon from "../assets/offline_icon.svg";
import passwordIcon from "../assets/password.svg";
import { findByLabelText } from "@testing-library/dom";

interface Props {
  createInputFields: (value: boolean) => void;
  userInfo: any;
}

function SidePanel(props: Props) {
  const classes = useStyles();
  const { socket, room } = useContext(SocketContext);
  const [roomValidationModal, setRoomValidationModal] = useState(false);
  const [user, setUser] = useState<User>();
  const [rooms, setRooms] = useState<Array<Room>>();
  const [statusIcon, setStatusIcon] = useState(offlineIcon);
  const [avatarLetter, setAvatarLetter] = useState<string>("");
  const [userRoom, setCurrentUserRoom] = useState<any>({ password: "" });
  const [selectedRoom, setSelectedRoom] = useState<string>();
  const [password, setPassword] = useState<any>();
  const [passwordMatch, setPasswordMatch] = useState(false);
  const [usersInRoom, setUsersInRoom] = useState<Array<User>>();

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
    const username = user!.name;
    const avatarLetter = username.charAt(0).toUpperCase();
    setAvatarLetter(avatarLetter);
  }

  function switchRooms(userSwitch: User, room: Room) {
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
    const handleUsersInRoom = (users: Array<User>) => {
      setUsersInRoom(users);
    };
    const handleUserSession = (lUser: User) => {
      setUser(lUser);
    };
    const handleRoomSession = (room: Array<Room>) => {
      setRooms(room);
    };
    const handleCurrentRoom = (room: Room) => {
      setCurrentUserRoom(room);
    };

    socket.on("user-session", handleUserSession);
    socket.on("room-session", handleRoomSession);
    socket.on("current-room", handleCurrentRoom);
    socket.on("users-in-room", handleUsersInRoom);

    checkIfOnline();
    checkIfValid();
    if (user) {
      getAvatarLetter();
    }

    return () => {
      socket.off("user-session", handleUserSession);
      socket.off("room-session", handleRoomSession);
      socket.off("current-room", handleCurrentRoom);
      socket.off("users-in-room", handleUsersInRoom);
    };
  });

  const handleChange = (e: { target: { value: string; }; }) => {
    setPassword(e.target.value);
  };

  function checkPassword(password: string) {
    const room = rooms!.find(
      (r: Room) => selectedRoom === r.roomName && password === r.password
    );
    if (room) {
      setPasswordMatch(false);
      switchRooms(userRoom, room);
      handleClose();
    } else {
      setPasswordMatch(true);
    }
  }

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
            ? rooms.map((room: Room, i: number) => (
                <Box key={i} className={classes.roomContainer}>
                  <Link>
                    <Box className={classes.panelRooms}>
                      <Typography
                        variant="body1"
                        onClick={() => {
                          setSelectedRoom(room.roomName);
                          room.password === ""
                            ? switchRooms(userRoom, room)
                            : handleOpen();
                        }}
                      >
                        {room.roomName ? `#${room.roomName}` : null}
                      </Typography>
                      <Box ml={2} mt={1}>
                        {room.password !== "" ? (
                          <img src={passwordIcon} alt="" />
                        ) : null}
                      </Box>
                    </Box>
                  </Link>
                  {usersInRoom
                    ? usersInRoom.map((user: User) =>
                        user.room === room.roomName ? (
                          <>
                            <Box ml={3} className={classes.userList}>
                              <Box>
                                <Avatar
                                  variant="circular"
                                  className={classes.userListAvatar}
                                >
                                  <Typography
                                    className={classes.avatarText}
                                    variant="body2"
                                  >
                                    {user.name.charAt(0).toUpperCase()}
                                  </Typography>
                                </Avatar>
                              </Box>
                              <Box mb={1}>
                                <Typography
                                  className={classes.inRoom}
                                  variant="body2"
                                >
                                  {user.name}
                                </Typography>
                              </Box>
                            </Box>
                          </>
                        ) : null
                      )
                    : null}
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
            <Typography variant="body2">Join room {selectedRoom}</Typography>
            <Box className={classes.passwordContainer}>
              <TextField
                error={passwordMatch}
                className={classes.textFieldStyle}
                color="primary"
                id="outlined-basic"
                label="Password...(???)"
                variant="outlined"
                name="password"
                inputProps={{ className: classes.inputColor }}
                onChange={handleChange}
                helperText={passwordMatch ? "Wrong password" : null}
              />
              <Box mb={2}>
                <Button
                  type="submit"
                  color="secondary"
                  variant="contained"
                  onClick={() => {
                    checkPassword(password);
                  }}
                >
                  Join
                </Button>
              </Box>
            </Box>
          </form>
        </Box>
      </Modal>
    </Box>
  );
}

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    "& .MuiInputBase-input": {
      color: "white",
    },
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
    height: "100vh",
    width: "20vw",
    minWidth: "20rem",
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
  inputColor: {
    color: "#fff",
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
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  textFieldStyle: {
    width: "30rem",
    background: "#23272A",
    margin: "1rem",
    color: "#fefefe",
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
    justifyContent: "center",
  },
  inRoom: {
    paddingLeft: ".5rem",
    paddingTop: "0.5rem",
  },
  userList: {
    display: "flex",
    alignItems: "center",
  },
  userListAvatar: {
    width: "1rem",
    height: "1rem",
    background:
      "linear-gradient(126.18deg, #5317FD -6.87%, rgba(236, 152, 233, 0.91) 125.18%)",
  },
  avatarText: {
    color: "#fefefe",
  },
  passwordContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    height: "100%",
    width: "100%",
    backgroundColor: "#23272A",
  },
}));

export default SidePanel;
