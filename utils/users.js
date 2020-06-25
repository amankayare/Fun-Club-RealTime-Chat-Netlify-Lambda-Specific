const users = [];

//join user to specific chat room
function userJoin(id, username, room) {
    const user = { id, username, room };
    users.push(user);
    return user;
}

//get the current user
function getCurrentUser(id) {
    return users.find((user) => user.id === id);

}
//user leaves a chat then return that user and remove it from array
function userLeave(id) {
    const index = users.findIndex(user => user.id === id);

    if (index !== -1) {
        return users.splice(index, 1)[0];
    }
}
//get room users
function getRoomUsers(room) {
    return users.filter((user) => user.room === room);
}
module.exports = {
    userJoin,
    getCurrentUser,
    userLeave,
    getRoomUsers
}