const messages = [];

function handleMessages(msg, user, room, time) {
  const message = { message: msg, user, room, time };
  messages.push(message);
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
