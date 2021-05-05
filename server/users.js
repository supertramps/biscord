
const users = [];


function addUser({id, name}){
    /* name = name.trim().toLowerCase(); */
    const exisitingUser = users.find((user) => user.name === name);
    if(exisitingUser){
        return { error: "Usernmae is taken"}
    }
    const user = { id, name}; 
    users.push(user);
    return user
}

function addUserToRoom(id, room){
    const exisitingUser = users.find((user) => user.id === id);
    if(exisitingUser){
        const user = { ...exisitingUser, room: room }
        console.log(user)
        return user
    } 
}

function removeUser(id){
    const index = users.findIndex((user) => user.id === id);

    if (index !== -1){
        return users.splice(index, 1)[0]
    }
}

const getUser = (id) =>  users.find((user) => user.id === id);

const getUsersInRoom = (room) => users.filter((user) => user.room === room)

module.exports = { addUser, removeUser, getUser, getUsersInRoom, addUserToRoom}