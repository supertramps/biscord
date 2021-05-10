function handleIncomingMessage(msgContent, user, room, time) {
   const message = {
    user: user,
    room: room,
    content: msgContent,
    time: time,
  };
  return message;
}

module.exports = {
  handleIncomingMessage,
};
