var socket = io.connect('http://localhost:8080', { 'forceNew': true });
var chatroom = document.getElementById("chatroom_div")

function sendMessage(){
    let newMessage = document.getElementById("message").value
    socket.emit('newMessage',newMessage)
    
}
socket.on('Update',(message,username)=>{
    chatroom.innerHTML += "<p class='message'>" + username + ": " + message + "</p>"
    chatroom.scrollTo(0,chatroom.scrollHeight);
})
socket.on('loadChatC',(data)=>{
    chatroom.innerHTML = data
    chatroom.scrollTo(0,chatroom.scrollHeight);
})
setInterval(() => {
    saveChat("autosave.html")
}, 30000);

function saveChat(fileName){
    socket.emit('saveChat',chatroom.innerHTML,fileName)
    filesB();
}
