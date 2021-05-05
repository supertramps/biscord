import { Avatar, Box, makeStyles, Theme, Typography } from "@material-ui/core";
import React from "react";

interface Iprops {
  message: string;
  profile: string;
  avatar: string;
  time: string | (string | number)[];
}

function ChatMessage(props: Iprops) {
  const classes = useStyles();

  return (
    <Box className={classes.root}>

      <Box ml={2} className={classes.chatMetaData}>
        <Typography variant="body2">{props.profile}</Typography>
        <Typography variant="body2">{props.time}</Typography>
      </Box>
      <Box className={classes.contentWrapper}>
        <Box ml={2}>
          <Avatar className={classes.avatarStyle}>{props.avatar}</Avatar>
        </Box>
        <Box ml={2} className={classes.messageWrapper}>
          <Typography variant="body1">{props.message}</Typography>
        </Box>
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
  },
  avatarStyle: {
    bottom: 0,
    margin: ".2rem",
    width: "3rem",
    height: "3rem",
  },
}));

export default ChatMessage;
