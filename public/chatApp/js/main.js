// const UserDetail=require('../../../model/userDetail')
// const getUserDetails=require('../../../controller/user')

const chatForm=document.getElementById('chat-form')
const chatMessages=document.querySelector('.chat-messages')
const roomName=document.getElementById('room-name')
const userList=document.getElementById('users')

// Get username and room from URL
console.log(location.search, "****************")
const { username, room } = Qs.parse(location.search, {
    ignoreQueryPrefix: true,
  });

// const userInfo=async(req, res)=>{
//   const username=req.body.username;
//   const room=req.body.room;


//   const user=await UserDetail.find({username:username, room:room})

// }

// window.addEventListener("DOMContentLoaded", () => {
//     axios.get("http://localhost:4600/user/get-user")
//         .then((response) => {
//             console.log(response)
//             let username=response.data.userDetails.username;
//             let room=response.data.userDetails.room
//         })
//         .catch((error) => {
//             console.log(error)
//         })
// })

// const {username, room}=getUserInfo.addUser()

// const userDetails = getUserDetails(username, room);
// if (userDetails) {
//   console.log(`Username: ${userDetails.username}, Room: ${userDetails.room}`);
// } else {
//   console.error('Failed to retrieve user details');
// }

// let username=userDetails.username, room=userDetails.room

console.log(username, room)


const socket=io();

//join chatroom
socket.emit('joinRoom', {username, room})

//get room and users
socket.on('roomUsers', ({room, users})=>{
    outputRoomName(room);
    outputUsers(users)
})

//message from server
socket.on('message', message=>{
    console.log(message)
    outputMessage(message)

    //scroll Messages
    chatMessages.scrollTop=chatMessages.scrollHeight;
})

chatForm.addEventListener('submit', e=>{
    e.preventDefault()
    
    //get message text
    const msg= e.target.elements.msg.value;
    
    //Emit message to server
    socket.emit('chatMessage',msg)

    //clear input
    e.target.elements.msg.value='';
    e.target.elements.msg.focus();

})

//output Message to DOM
function outputMessage(message){
   const div=document.createElement('div')
   div.classList.add('message');
   div.innerHTML=`<p class="meta">${message.username}<span>${message.time}</span></p>
   <p class="text">
    ${message.text}
    </p>`;
    document.querySelector('.chat-messages').appendChild(div);
}

//add room name to DOM
function outputRoomName(room){
    roomName.innerText=room;
}

//Add users to DOM
function outputUsers(users){
    userList.innerHTML=`
    ${users.map(user=>`<li>${user.username}</li>`).join('')}
    `
}