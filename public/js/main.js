//To connect to the central server
const socket = io();

const chatForm = document.getElementById('chat-form');
const chatMessage = document.querySelector('.chat-messages');
const roomName = document.getElementById('room-name');
const userList = document.getElementById('online-table');

//get username and room from parameter using qs.js CDN
const { username, room } = Qs.parse(location.search, {
    ignoreQueryPrefix: true
});


//Already in room with same username
socket.emit('checkExistUser', { username, room });
socket.on("my error", function (msg) {
    alert(msg);
    socket.destroy();
    window.location.href = "https://fun-club-realtime-chat.herokuapp.com";

});




//join room
socket.emit('joinRoom', { username, room });

//get rooms and online user information
socket.on('roomUsers', ({ room, users }) => {

    console.log('room:', room);
    console.log('userList: ', users);
    //display the room name in sidebar
    outputRoomName(room);
    //display the online list in sidebar
    outputUsers(users);

});



//To recieve all msg's from server
socket.on('message', message => {

    console.log(message);

    //Output the message to our chat screen or dom implementation
    outputMessage(message);

    //After each message scroll down all the time
    chatMessage.scrollTop = chatMessage.scrollHeight;
    console.log('msg recived in main.js')


});

//submit message
chatForm.addEventListener('submit', (e) => {
    e.preventDefault();

    //getting the input message from form by using id=msg
    const msg = e.target.elements.msg.value;
    //console.log('input message: ', message);

    //Emit message to server
    socket.emit('chatMessage', msg);

    //after sending message clear the input and focus on
    e.target.elements.msg.value = '';
    e.target.elements.msg.focus();

});

//Output the message to our chat screen or dom implementation
function outputMessage(message) {
    console.log('output funtion in main.js')
    const div = document.createElement('div');
    div.classList.add('message');
    div.innerHTML = `<img src="image/${message.username}.png" class="avatar-img" onerror="this.src='image/male-avatar.png';this.onerror='';">
    <p class="meta">${message.username} <span>${message.time}</span></p>
    <p class="text">
     ${message.text}
    </p>`;
    document.querySelector('.chat-messages').appendChild(div);
    chatMessage.scrollTop = chatMessage.scrollHeight;

}

//output the room name to sidebar implementaion
function outputRoomName(room) {
    roomName.innerText = room;
}

//output the online user list to sidebar implementation

/*
function outputUsers(users) {
    userList.innerHTML = `
    ${users.map((user) => ` <tr>
    <td><img class="avatar-img" src="image/${user.username}.png   " alt="Avatar"></td>
    <td>
      <p id="celeb-name-1">${user.username}</p>
    </td>
  </tr>`).join('')}`;
}
*/
function outputUsers(users) {
    userList.innerHTML = `
    ${users.map((user) => ` <tr>
    <td> <img src="image/${user.username}.png" class="avatar-img" onerror="this.src='image/male-avatar.png';this.onerror='';">
    </td>
    <td>
      <p id="celeb-name-1">${user.username}</p>
    </td>
  </tr>`).join('')}`;
}