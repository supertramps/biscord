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
import moment from "moment";
import discordDark from "../assets/discord-dark.png";
import { useContext, useEffect, useState } from "react";
import { SocketContext } from "../providers/SocketContext";
import ChatMessage from "./ChatMessage";
import GifIcon from "../assets/gif_icon.svg";
// @ts-ignore
import ReactGiphySearchbox from "react-giphy-searchbox";

interface Props {
  inputFieldsOpen: any;
  userInfo: any;
}

function MainPage(props: Props) {
  const [messages, setMessages] = useState<string[]>();
  const [messageHolder, setMessageHolder] = useState("");
  const classes = useStyles();
  const { creatNewRoom, socket } = useContext(SocketContext);
  const [user, setUser] = useState<any>();
  const [trimedName, setTrimedName] = useState<string>("");
  const [gifGalleryOpen, setGifGalleryOpen] = useState<boolean>(false);

  const [values, setValues] = useState<Object>({
    roomName: "",
    password: "",
  });

  function trimForAvatar() {
    const trimedName: string = user.name.slice(0, 1);
    setTrimedName(trimedName);
  }

  function openGifGallery() {
    if (gifGalleryOpen === false) {
      setGifGalleryOpen(true);
    } else if (gifGalleryOpen === true) {
      setGifGalleryOpen(false);
    }

    console.log("GIF panel is open");
  }

  useEffect(() => {
    const loadUser = async () => {
      if (!socket) {
        return;
      }
      await socket.on("user-session", (lUser: any) => {
        setUser(lUser);
      });
    };
    loadUser();
  });

  const addMessageToArray = () => {
    if (!messages) {
      trimForAvatar();
      setMessages([messageHolder]);
    } else if (messages) {
      trimForAvatar();
      setMessages([...messages, messageHolder]);
    }
  };

  const handleChange = (e: { target: { name: string; value: string } }) => {
    const { name, value } = e.target;
    setValues((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const gifContainerOptions = [
    {
      columns: 2,
      imageWidth: 240,
      gutter: 5,
    },
  ];

  return (
    <Box className={classes.root}>
      {props.inputFieldsOpen ? (
        <Box className={classes.root}>
          <Box className={classes.roomFormContainer}>
            <form noValidate autoComplete="off" className={classes.form}>
              <TextField
                className={classes.textFieldStyle}
                id="outlined-basic"
                label="Room name..."
                variant="outlined"
                name="roomName"
                onChange={handleChange}
              />
              <TextField
                className={classes.textFieldStyle}
                id="outlined-basic"
                label="Password..."
                variant="outlined"
                name="password"
                onChange={handleChange}
              />
            </form>
            <Button
              onClick={() => {
                creatNewRoom(values, props.userInfo);
              }}
            >
              Create
            </Button>
          </Box>
        </Box>
      ) : (
        <>
          <Box className={classes.contentWrapper}>
            <Box
              className={
                messages ? classes.messageContainer : classes.logoContainer
              }
            >
              {messages ? (
                messages
                  .map((m, i) => (
                    <ChatMessage
                      time={moment().format("MMM Do YY")}
                      avatar={trimedName}
                      profile={user.name}
                      key={i}
                      message={m}
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
                  onSelect={(item) => console.log(item)}
                  autoFocus={true}
                  masonryConfig={gifContainerOptions}
                  poweredByGiphy={false}
                  wrapperClassName={"gifContainer"}
                  searchFormClassName={"gifForm"}
                  listWrapperClassName={"gifList"}
                  searchPlaceholder="Look for dank GIFs"
                />
              </Box>
            </Box>
          ) : null}
          <Box mb={3} className={classes.formContainer}>
            <form className={classes.formStyling}>
              <Box className={classes.formFlex}>
                <Box mr={2} className={classes.inputContainer}>
                  <input
                    placeholder="Message #React"
                    type="text"
                    className={classes.textFieldStyling}
                    onChange={(event) => setMessageHolder(event.target.value)}
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
                    onClick={addMessageToArray}
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
    height: "100%",
  },

  roomFormContainer: {
    display: "flex",
    flexDirection: "column",
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
}));

export default MainPage;
