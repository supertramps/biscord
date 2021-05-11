const messages = [];
const moment = require("moment")

function handleMessages(msg, user, room, time) {
  const message = { message: msg, user, room, time: moment().format("[Today at] HH:mm:ss") };
  console.log(messages);
  messages.push(message, "EEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEE");
}

function filterMessages(room) {
  const messagesInCurrentRoom = messages.filter(m => m.room === room);
  return messagesInCurrentRoom;
}

function getMessages(room, session, io) {
  const messagesInCurrentRoom = messages.filter(m => m.room === room);
  io.to(room).emit("chat-message", {
    messagesInCurrentRoom,
    loggedInUser: session,
  });
}

module.exports = {
  messages,
  handleMessages,
  filterMessages,
  getMessages
};
