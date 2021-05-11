
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
    console.log(data)
    /* return rooms; */
}



module.exports = {rooms,createNewRoom, removeRoom};