import { Avatar, Box, makeStyles, Theme, Typography } from "@material-ui/core";
import React from "react";

function ChatMessage() {
  const classes = useStyles();

  return (
    <Box className={classes.root}>
      <Box className={classes.chatMetaData}>
        <Typography variant="body2">Zazzi</Typography>
        <Typography variant="body2">Today</Typography>
      </Box>
      <Box className={classes.contentWrapper}>
        <Avatar className={classes.avatarStyle}>Z</Avatar>
        <Box className={classes.messageWrapper}>
          <Typography>Chat message here lol</Typography>
        </Box>
      </Box>
    </Box>
  );
}
const useStyles = makeStyles((theme: Theme) => ({
  root: {
    display: "flex",
    justifyContent: "flex-end",
    flexDirection: "column",
    position: "absolute",
    left: "25rem",
    height: "80%",
  },
  chatMetaData: {
    display: "flex",
    "& > * ": {
      margin: "0.5rem",
    },
  },
  contentWrapper: {
    display: "flex",
    position: "relative",
  },
  messageWrapper: {
    background: "#40444B",
    padding: "1rem",
  },
  avatarStyle: {
    bottom: 0,
    left: "-3rem",
    margin: ".2rem",
    position: "absolute",
  },
}));

export default ChatMessage;
