const messages = [];
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
    let message = { message: randomGif, user, room, time };
    messages.push(message);
  } else {
    let message = { message: msg, user, room, time };
    messages.push(message);
  }
  console.log(messages);
}

module.exports = {
  messages,
  handleMessages,
};
