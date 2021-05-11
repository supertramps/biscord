
const rooms = [{
    roomName: "Lobby",
    password: "",
}];

//if getRooms does not exist remove it. 

function createNewRoom(name,password){
    const room = {roomName: name, password: password};
    rooms.push(room);
    return room;
}

function removeRoom(data){
    const newRooms = rooms.filter(r => data.find(r2 => r.roomName === r2.room))
    return newRooms;
}

module.exports = {rooms,createNewRoom, removeRoom};