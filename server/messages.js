const messages = [];

const moment = require("moment");
const giphyRandom = require("giphy-random");

// Fetches a random GIF from Giphy API and returns a string with URL
async function getGif(tag) {
  // Your API key generated at giphy.com
  const API_KEY = "nGgKX5djKNAVoYChgFHSzk7Q2tnOs65p";

  // GET request to Giphy API
  const { data } = await giphyRandom(API_KEY, {
    // Rating set to pg13 to avoid.. yeah.
    rating: "pg13",

    // Tag is your keyword when searhing for that perfect GIF.
    tag: tag,
  });

  // Returns the URL we use to render a GIF in the chat.
  return data.embed_url;
}

async function handleMessages(msg, user, room, time) {
  // The message we return to the user when typing /help in chat.
  const helpMessage =
    "Hi! There are some chat commands you can use on this server. Use `/gif` to post a random GIF. You may also search for a GIF using `/gif doge` (you are free to change doge to whatever you desire). Have fun 😎";

  // If the first letters of the post is /gif we do this
  if (msg.substring(0, 4) === "/gif") {
    // The gifTag is the following letters after /gif. We use this as our keyword when searching for gifs.
    const gifTag = msg.substring(5);

    // We send gifTag into getGif(), if there is no gifTag defined getGif returns a random GIF.
    const randomGif = await getGif(gifTag);
    let message = {
      message: randomGif,
      user,
      room,
      time: moment().format("[Today at] HH:mm:ss"),
    };
    messages.push(message);

    // If the first letters of the post is /help we do this
  } else if (msg.substring(0, 5) === "/help") {
    let message = {
      message: helpMessage,
      user,
      room,
      time: moment().format("[Today at] HH:mm:ss"),
    };
    messages.push(message);

    // If no /command is found we end up here like nothing ever happened. Neat!
  } else {
    const message = {
      message: msg,
      user,
      room,
      time: moment().format("[Today at] HH:mm:ss"),
    };
    messages.push(message);
  }
}

function filterMessages(room) {
  const messagesInCurrentRoom = messages.filter((m) => m.room === room);
  return messagesInCurrentRoom;
}

function getMessages(room, session, io) {
  const messagesInCurrentRoom = messages.filter((m) => m.room === room);
  io.to(room).emit("chat-message", {
    messagesInCurrentRoom,
    loggedInUser: session,
  });
}

module.exports = {
  messages,
  handleMessages,
  filterMessages,
  getMessages,
};
