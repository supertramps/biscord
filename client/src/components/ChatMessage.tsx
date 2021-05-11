import { Avatar, Box, makeStyles, Theme, Typography } from "@material-ui/core";
import React, { useContext, useEffect, useState } from "react";
import { SocketContext } from "../providers/SocketContext";

interface Iprops {
  message: string;
  profile: any;
  time: string | (string | number)[];
  gifUrl?: string;
}

function ChatMessage(props: Iprops) {
  const classes = useStyles();
  const [avatar, setAvatar] = useState<string>();
  const [profile, setProfile] = useState<string>();

  const handleUser = (value: string) => {
    const trimedName: string = value.charAt(0).toUpperCase();
    setAvatar(trimedName);
    setProfile(value);
  };

  useEffect(() => {
    const hold = async () => {};
    if (!props.profile) {
      return;
    } else {
      handleUser(props.profile);
    }
    hold();
  });

  return (
    <Box className={classes.root}>
      <Box ml={10} mt={3} className={classes.chatMetaData}>
        <Typography variant="body2">{profile}</Typography>
        <Typography variant="body2">{props.time}</Typography>
      </Box>
      <Box className={classes.contentWrapper}>
        <Box ml={2}>
          <Avatar className={classes.avatarStyle}>{avatar}</Avatar>
        </Box>
        {props.message.includes("giphy.com") ? (
          <Box ml={2} className={classes.gifWrapper}>
            <iframe
              className={classes.iframeStyle}
              src={props.message}
              height="200px"
              width="300px"
            ></iframe>
          </Box>
        ) : (
          <Box ml={2} className={classes.messageWrapper}>
            <Box className={classes.textContainer}>
              <Typography
                style={{ wordWrap: "break-word" }}
                noWrap={false}
                display="block"
                variant="body1"
              >
                {props.message}
              </Typography>
            </Box>
          </Box>
        )}
      </Box>
    </Box>
  );
}
const useStyles = makeStyles((theme: Theme) => ({
  root: {
    display: "flex",
    marginBottom: ".5rem",
    width: "100%",
    flexDirection: "column",
  },
  chatMetaData: {
    display: "flex",
    justifyContent: "flex-start",
    "& > * ": {
      margin: "0.5rem",
    },
  },
  contentWrapper: {
    display: "flex",
    position: "relative",
    alignItems: "flex-end",
  },
  messageWrapper: {
    background: "#40444B",
    padding: ".5rem",
    borderRadius: "10px",
    maxWidth: "35vw",
  },
  textContainer: {
    maxWidth: "100%",
  },
  avatarStyle: {
    bottom: 0,
    margin: ".2rem",
    width: "3rem",
    height: "3rem",
    background:
      "linear-gradient(126.18deg, #5317FD -6.87%, rgba(236, 152, 233, 0.91) 125.18%)",
  },
  iframeStyle: {
    border: "none",
    cursor: "default",
    borderRadius: "20px",
  },

  gifWrapper: {
    padding: ".5rem",
    borderRadius: "10px",
  },
}));

export default ChatMessage;
