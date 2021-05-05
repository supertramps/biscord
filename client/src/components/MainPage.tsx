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
import { useContext, useState } from "react";
import { SocketContext } from "../providers/SocketContext";
import ChatMessage from "./ChatMessage";

interface Props{
  inputFieldsOpen: any;
  userInfo: any;
}

function MainPage(props: Props) {
  const [messages, setMessages] = useState<string[]>();
  const [messageHolder, setMessageHolder] = useState("");
  const classes = useStyles();
  const {creatNewRoom} = useContext(SocketContext)
  const [values, setValues] = useState<Object>({
    roomName: "",
    password: "",
  })

  const addMessageToArray = () => {
    if (!messages) {
      setMessages([messageHolder]);
    } else if (messages) {
      setMessages([...messages, messageHolder]);
    }
  };

  // const today = moment();
  // const postTime = moment();
  // let timeShort = "m";
  // let diff = today.diff(postTime, "seconds");

  // if (diff >= 1) {
  //   diff = today.diff(postTime, "hours");
  //   timeShort = "h";
  // }
  // if (diff >= 24 && timeShort === "h") {
  //   diff = today.diff(postTime, "days");
  //   timeShort = "d";
  // }


  

  const handleChange = (e: { target: { name: string; value: string; }; }) => {
    const { name, value } = e.target;
    setValues((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  
  return (
    <Box className={classes.root}>
      { props.inputFieldsOpen ? (
        <Box className={classes.root}>
        <Box className={classes.messageContainer}>
          <img src={discordDark} alt="" />
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
              creatNewRoom(values, props.userInfo)
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
                  profile={"Z"}
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
    margin: '1rem',
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

}));

export default MainPage;
