import {
  Box,
  makeStyles,
  Theme,
  Typography,
  Button,
  TextField,
  Snackbar,
} from "@material-ui/core";
import discordDark from "../assets/discord-dark.png";
import { useContext, useEffect, useState } from "react";
import { SocketContext, Message, Room, User } from "../providers/SocketContext";
import ChatMessage from "./ChatMessage";
import GifIcon from "../assets/gif_icon.svg";


// @ts-ignore
import ReactGiphySearchbox from "react-giphy-searchbox";

interface Props {
  inputFieldsOpen: boolean;
  userInfo: User;
  handleInputField: (value: boolean) => void;
}

function MainPage(props: Props) {
  const [messages, setMessages] = useState<any>([] as Message[]);
  const [messageHolder, setMessageHolder] = useState("");
  const classes = useStyles();
  const { creatNewRoom, socket } = useContext(SocketContext);
  const [user, setUser] = useState<string>();
  const [gifGalleryOpen, setGifGalleryOpen] = useState<boolean>(false);
  const [chosenGif, setChosenGif] = useState<string>("");
  const [joinedMessage, setJoinedMessage] = useState<Array<string>>([]);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [gifSelected, setGifSelected] = useState(false);
  const [randomGif, setRandomGif] = useState<string>("");
  const [typing, setTyping] = useState(false);
  const [currentRoom, setCurrentRoom] = useState<string>();
  const [roomAlreadyExists, setRoomAlreadyExists] = useState<boolean>(false);
  const [rooms, setRooms] = useState<Array<Room>>();

  

  const [values, setValues] = useState<Room>({
    roomName: "",
    password: "",
  });

  // Opens the GIF grid and searchbar
  function openGifGallery() {
    if (gifGalleryOpen === false) {
      setGifGalleryOpen(true);
    } else if (gifGalleryOpen === true) {
      setGifGalleryOpen(false);
    }
  }

  // Makes a post to the server with the current state of messageHolder
  function postman() {
    if (messageHolder !== "") {
      socket.emit("chat-message", messageHolder);
    } else {
      return;
    }
  }

  function messagePending(value: string) {
    if (value.length > 0) {
      socket.emit("typing", true);
    } else {
      socket.emit("typing", false);
    }
  }

  useEffect(() => {
    if (!socket) return;
    // If the current message includes a link to Giphy we instantly send it to
    // the socket for posting. This is how we can send gifs from the GIF gallery by clicking them.
    // Then we clear the state to dodge the infinite loop 🌌
    if (messageHolder.includes("giphy.com/embed")) {
      socket.emit("chat-message", messageHolder);
      setMessageHolder("");
    }
  }, [messageHolder]);

  useEffect(() => {
    if (!socket) return;

    const handleCurrentRoom = (room: string) => {
      setCurrentRoom(room);
    };
    const handleCurrentRooms = (rooms: Array<Room>) => {
      setRooms(rooms);
    };

    // any? Cant find correct typing
    const handleChatMessage = function (data: any) {
      console.log(data);
      
      if (!messages) {
        const { messagesInCurrentRoom, loggedInUser } = data;
        setMessages(messagesInCurrentRoom);
      } else {
        const { messagesInCurrentRoom, loggedInUser } = data;
        setMessages(messagesInCurrentRoom);
      }
    };

    const handleJoined = (msg: string) => {
      setJoinedMessage((_prevState) => [...joinedMessage, msg]);
      setSnackbarOpen(true);
    };
    const handleLeft = (msg: string) => {
      setJoinedMessage((_prevState) => [...joinedMessage, msg]);
    };
    const handleTyping = (value: boolean, lUser: User) => {
      setTyping(value);
      setUser(lUser.name);
    };

    // Creates our event listeners.
    // socket.off("user-session", handleUserSession);

    socket.on("chat-message", handleChatMessage);
    socket.on("joined", handleJoined);
    socket.on("left", handleLeft);

    socket.on("current-room", handleCurrentRoom);
    socket.on("typing", handleTyping);
    socket.on("room-session", handleCurrentRooms);

    return () => {
      // Removes all the event listeners (Happy browser is a good browser 🥰)!
      // socket.off("user-session", handleUserSession);
      socket.off("chat-message", handleChatMessage);
      socket.off("joined", handleJoined);
      socket.off("left", handleLeft);
      socket.off("current-room", handleCurrentRoom);
      socket.off("room-session", handleCurrentRooms);
    };
  });

  const handleChange = (e: { target: { name: string; value: string } }) => {
    const { name, value } = e.target;
    setValues((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  function roomExists(newRoom: Room) {
    console.log(newRoom)
    const roomExists = rooms!.find(
      (room: Room) => room.roomName === newRoom.roomName
    );
    if (roomExists) {
      setRoomAlreadyExists(true);
      return;
    } else {
      setRoomAlreadyExists(false);
      props.handleInputField(false);
      creatNewRoom(values, props.userInfo);
      setValues({
        roomName: "",
        password: "",
      });
    }
  }

  function handleSnackbarClose() {
    setSnackbarOpen(false);
  }

  const gifContainerOptions = [
    {
      columns: 2,
      imageWidth: 240,
      gutter: 10,
    },
  ];

  return (
    <Box className={classes.root}>
      {/* If the prop "inputFieldsOpen" from App.tsx is True we render this "modal" 
      where the user can create a room. If not we proceed to render our messages. */}
      {props.inputFieldsOpen ? (
        <Box className={classes.root}>
          <Box className={classes.roomFormContainer}>
            <form
              onSubmit={(e) => {
                e.preventDefault();
              }}
              noValidate
              autoComplete="off"
              className={classes.form}
            >
              <TextField
                error={roomAlreadyExists}
                className={classes.textFieldStyle}
                id="outlined-basic"
                label="Room name..."
                variant="outlined"
                name="roomName"
                inputProps={{ maxLength: 15 }}
                onChange={handleChange}
                helperText="Room name taken"
              />
              <Typography variant="body2">
                Password is not required (but your room might be raided ⚔)
              </Typography>
              <TextField
                className={classes.textFieldStyle}
                id="outlined-basic"
                label="Password..."
                variant="outlined"
                name="password"
                onChange={handleChange}
              />
              <Box>
                <Button
                  type="submit"
                  color="secondary"
                  variant="contained"
                  onClick={() => {
                    roomExists(values);
                  }}
                >
                  Create
                </Button>
              </Box>
            </form>
          </Box>
        </Box>
      ) : (
        <>
          <Box className={classes.contentWrapper}>
            <Box mr={1} className={classes.currentRoomWrapper}>
              <Typography variant="body2">#{currentRoom}</Typography>
            </Box>
            <Box>
              {/* Here we render our snackbar, it pops up at the top when a user joins a room. */}
              {joinedMessage.map((msg, i) => [
                <Snackbar
                  key={i}
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "center",
                  }}
                  autoHideDuration={6000}
                  open={snackbarOpen}
                  onClose={handleSnackbarClose}
                  message={msg}
                />,
              ])}
            </Box>
            <Box
              className={
                messages ? classes.messageContainer : classes.logoContainer
              }
            >
              {/* If there is any messeges in the array we map them in reverse here (newest first). If not we render a logo.  */}
              {messages ? (
                messages
                  .map((m: Message, i: string) => (
                    <ChatMessage
                      time={m.time}
                      profile={m.user}
                      key={i}
                      message={m.message}
                      gifUrl={chosenGif}
                    />
                  ))
                  .reverse()
              ) : (
                <img src={discordDark} alt="" />
              )}
            </Box>
          </Box>
          {gifGalleryOpen ? (
            <Box className={classes.gifContainer}>
              <Box>
                {/* This is our GIF gallery, onSelect sends a gif in the chat */}
                <ReactGiphySearchbox
                  apiKey="nGgKX5djKNAVoYChgFHSzk7Q2tnOs65p"
                  // @ts-ignore
                  onSelect={(item) => {
                    setMessageHolder(item.embed_url);
                  }}
                  autoFocus={true}
                  masonryConfig={gifContainerOptions}
                  poweredByGiphy={false}
                  wrapperClassName={"gifContainer"}
                  searchFormClassName={"gifForm"}
                  listWrapperClassName={"gifList"}
                  searchPlaceholder="Look for dank GIFs 😎..."
                  rating="pg13"
                />
              </Box>
            </Box>
          ) : null}
          <Box mb={3} className={classes.formContainer}>
            <form
              onSubmit={(e) => {
                e.preventDefault();
              }}
              className={classes.formStyling}
            >
              <Box className={classes.formFlex}>
                <Box mr={2} className={classes.inputContainer}>
                  <input
                    id="inputField"
                    placeholder="Send a message..."
                    type="text"
                    autoFocus={true}
                    autoComplete="off"
                    value={messageHolder}
                    className={classes.textFieldStyling}
                    onChange={(event) => {
                      messagePending(event.target.value);
                      setMessageHolder(event.target.value);
                    }}
                  />
                </Box>

                <Box className={classes.gifIconContainer}>
                  <Button
                    className={classes.gifButton}
                    onClick={() => {
                      openGifGallery();
                    }}
                  >
                    <img src={GifIcon} className={classes.gifIcon} alt="" />
                  </Button>
                </Box>

                <Box className={classes.buttonContainer}>
                  <Button
                    type="submit"
                    onClick={() => {
                      socket.emit("typing", false);
                      setChosenGif("");
                      setMessageHolder("");
                      postman();
                      setGifSelected(false);
                    }}
                    color="primary"
                    className={classes.buttonStyling}
                  >
                    Send
                  </Button>
                </Box>
              </Box>
            </form>
          </Box>
          <Box className={classes.messagePending}>
            {typing ? (
              <Typography variant="body2">{user} is typing...</Typography>
            ) : null}
          </Box>
        </>
      )}
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
    width: "100%",
    backgroundColor: "#2C2F33",
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
    color: "#fff",
    fontSize: "1rem",
    outline: "none",
    borderRadius: "10px",
    paddingInline: "1rem",
  },
  inputContainer: {
    width: "100%",
    height: "100%",
    boxShadow: "3px 5px 6px -4px rgba(0,0,0,0.7)",
  },
  sendGifContainer: {
    width: "10%",
    boxShadow: "3px 5px 6px -4px rgba(0,0,0,0.7)",
  },
  inputForm: {
    color: "#fff",
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
    boxShadow: "3px 5px 6px -4px rgba(0,0,0,0.7)",
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
    display: "flex",
    overflow: "auto",
    alignItems: "flex-start",
    flexDirection: "column-reverse",
    "&::-webkit-scrollbar": {
      width: "0.7em",
    },
    "&::-webkit-scrollbar-track": {
      boxShadow: "inset 0 0 6px rgba(0,0,0,0.00)",
      webkitBoxShadow: "inset 0 0 6px rgba(0,0,0,0.00)",
      margin: "1rem",
    },
    "&::-webkit-scrollbar-thumb": {
      backgroundColor: "rgba(0,0,0,.1)",
      outline: "1px solid slategrey",
      border: " 4px solid transparent",
      borderRadius: "8px",
      backgroundClip: "padding-box",
    },
  },
  logoContainer: {
    height: "100%",
    width: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
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
  contentWrapper: {
    width: "100%",
    height: "94%",
    maxHeight: "94%",
  },

  roomFormContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  gifIcon: {
    height: "2.8rem",
    cursor: "pointer",
  },
  gifIconContainer: {
    backgroundColor: "#40444B",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: "5px",
    boxShadow: "3px 5px 6px -4px rgba(0,0,0,0.7)",
  },
  gifButton: {
    height: "2.8rem",
  },
  gifContainer: {
    position: "absolute",
    bottom: "5rem",
    right: "5rem",
    backgroundColor: "#40444B",
    borderRadius: "10px",
  },
  iframeStyle: {
    border: "none",
    cursor: "default",
    width: "100%",
  },

  currentRoomWrapper: {
    position: "absolute",
    right: "0",
  },
  messagePending: {
    bottom: 0,
    position: "absolute",
    marginBottom: ".3rem",
    height: "1rem",
  },
}));

export default MainPage;
