const messages = [];

function handleMessages(msg, user, room, time) {
  const message = { message: msg, user, room, time };
  messages.push(message);
}

module.exports = {
  messages,
  handleMessages,
};
