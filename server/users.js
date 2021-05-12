const users = [];

function addUser({ id, name, room }) {
  const val = Math.floor(1000 + Math.random() * 9000);
  const user = { id, name: `${name}#${val}`, room, password: "" };
  users.push(user);
  return user;
}

function createRoom(id, room, password) {
  users.map((user) => {
    if (user.id === id) {
      user.room = room;
      user.password = password;
      return user;
    } else {
      return user;
    }
  });
  return users;
}

function switchRoom(id, room) {
  users.map((user) => {
    if (user.id === id) {
      user.room = room;
      return user;
    } else {
      return user;
    }
  });
  return users;
}

const getUser = (id) => users.find((user) => user.id === id);

module.exports = {
  addUser,
  getUser,
  createRoom,
  switchRoom,
  users,
};
