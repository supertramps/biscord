

let rooms = [{
    roomName: "Lobby",
    password: "",
}];

function createNewRoom(name,password){
    const room = {roomName: name, password: password};
    rooms.push(room);
    return room;
}

function removeRoom(data){
    const newRooms = rooms.filter(r => data.find(r2 => r.roomName === r2.room))
    const filteredIfRoomDuplicate = [...new Map(newRooms.map(room => [room.roomName, room])).values()]
    return filteredIfRoomDuplicate;
}

module.exports = {rooms,createNewRoom, removeRoom};