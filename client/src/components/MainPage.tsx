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
  Snackbar,
} from "@material-ui/core";
import moment from "moment";
import discordDark from "../assets/discord-dark.png";
import React, { useContext, useEffect, useState } from "react";
import { SocketContext } from "../providers/SocketContext";
import ChatMessage from "./ChatMessage";
import GifIcon from "../assets/gif_icon.svg";

// @ts-ignore
import ReactGiphySearchbox from "react-giphy-searchbox";
// @ts-ignore
import giphyRandom from "giphy-random";
import { LocalLibraryTwoTone } from "@material-ui/icons";

interface Props {
  inputFieldsOpen: any;
  userInfo: any;
  handleInputField: (value: boolean) => void;
}

function MainPage(props: Props) {
  const [messages, setMessages] = useState<any>();
  const [messageHolder, setMessageHolder] = useState("");
  const classes = useStyles();
  const { creatNewRoom, socket, room } = useContext(SocketContext);
  const [user, setUser] = useState<any>();
  const [gifGalleryOpen, setGifGalleryOpen] = useState<boolean>(false);
  const [chosenGif, setChosenGif] = useState<string>("");
  const [joinedMessage, setJoinedMessage] = useState<any>([]);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [gifSelected, setGifSelected] = useState(false);
  const [randomGif, setRandomGif] = useState<string>("");

  const [values, setValues] = useState<object>({
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
    console.log("GIF panel is open");
  }

  // Makes a post to the server with the current state of messageHolder
  function postman() {
    socket.emit("chat-message", messageHolder);
  }

  useEffect(() => {
    if (!socket) return;
    if (messageHolder.includes("giphy.com/")) {
      socket.emit("chat-message", messageHolder);
      setMessageHolder("");
    }
    console.log("useeffect fired");
  }, [messageHolder]);

  useEffect(() => {
    if (!socket) return;

    const handleUserSession = (lUser: any) => {
      setUser(lUser);
    };
    const handleChatMessage = function (data: any) {
      if (!messages) {
        const { messagesInCurrentRoom, loggedInUser } = data;
        setMessages(messagesInCurrentRoom);
        console.log(messages);
      } else {
        const { messagesInCurrentRoom, loggedInUser } = data;
        setMessages(messagesInCurrentRoom);
        console.log(messages);
      }
    };
    const handleJoined = (msg: string) => {
      setJoinedMessage((_prevState: any) => [...joinedMessage, msg]);
      setSnackbarOpen(true);
    };
    const handleLeft = (msg: string) => {
      console.log(msg);
      setJoinedMessage((_prevState: any) => [...joinedMessage, msg]);
    };

    socket.on("user-session", handleUserSession);
    socket.on("chat-message", handleChatMessage);
    socket.on("joined", handleJoined);
    socket.on("left", handleLeft);

    return () => {
      socket.off("user-session", handleUserSession);
      socket.off("chat-message", handleChatMessage);
      socket.off("joined", handleJoined);
      socket.off("left", handleLeft);
    };
  });

  const handleChange = (e: { target: { name: string; value: string } }) => {
    const { name, value } = e.target;
    setValues((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

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
                className={classes.textFieldStyle}
                id="outlined-basic"
                label="Room name..."
                variant="outlined"
                name="roomName"
                inputProps={{ maxLength: 15 }}
                onChange={handleChange}
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
                    creatNewRoom(values, props.userInfo);
                    props.handleInputField(false);
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
            <Box>
              {joinedMessage.map((msg: string) => [
                <Snackbar
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
              {messages ? (
                messages
                  .map((m: any, i: any) => (
                    <ChatMessage
                      time={moment().format("LT")}
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
                      // addMessageToArray();
                      setChosenGif("");
                      setMessageHolder("");
                      // clearInput();
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
    // height: "100%",
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
      // margin: "0 30px",
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
}));

export default MainPage;
