const users = [
    {
        "id": "UOivvYk5-EvfoI8qAAAF",
        "name": "asdasdsdf",
        "room": "asdasd"
    },
    {
        "id": "EN7n_2f2LJkKnw0dAAAH",
        "name": "asdassdfsdf",
        "room": "asdas"
    }
];

function addUser({id, name}){
    const exisitingUser = users.find((user) => user.name === name);
    if(exisitingUser){
        return { error: "Usernmae is taken"}
    }
    const user = { id, name}; 
    users.push(user);
    return user
}

function addUserToRoom(id, room){
    users.map(user => {
        if(user.id === id){
            user.room = room
            return user.room
        } else {
            return user
        }
    }) 
    return users;
}

function removeUser(id){
    const index = users.findIndex((user) => user.id === id);

    if (index !== -1){
        return users.splice(index, 1)[0]
    }
}

const getUser = (id) =>  users.find((user) => user.id === id);

const getUsersInRoom = (room) => users.filter((user) => user.room === room)

module.exports = { addUser, removeUser, getUser, getUsersInRoom, addUserToRoom, users}