const messages = [];

const moment = require("moment")
const giphyRandom = require("giphy-random");
  
// Fetches a random GIF from Giphy API and returns a string with URL
async function getGif(tag) {
  const API_KEY = "nGgKX5djKNAVoYChgFHSzk7Q2tnOs65p";

  const { data } = await giphyRandom(API_KEY, {
    rating: "pg13",
    tag: tag,
  });
  return data.embed_url;
}

async function handleMessages(msg, user, room, time) {
  console.log(msg.substring(0, 4));
  if (msg.substring(0, 4) === "/gif") {
    const gifTag = msg.substring(5);
    const randomGif = await getGif(gifTag);
    console.log(randomGif);
    let message = { message: randomGif, user, room, time: moment().format("[Today at] HH:mm:ss") };
    messages.push(message);
  } else {
    const message = { message: msg, user, room, time: moment().format("[Today at] HH:mm:ss") };
    messages.push(message);
  }
  console.log(messages);
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
