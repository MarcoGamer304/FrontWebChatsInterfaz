import { io } from "socket.io-client";
import { createPElement } from "./index";

const socket = io.connect('https://backwebchatinterfaz-production.up.railway.app/');
let userList = new Map();

export function registerUser() {
    socket.emit('userRegister', localStorage.getItem('username'));
}

socket.on('updateUser', (data) => {
    userList = data;
    console.log(userList);
    //index 0: username
    //index 1: object = username && socket id;
});

export function getUserList(){
    return userList;
}

export function setNewMessage(text){
    socket.emit('newMessage', text)
}

socket.on('respuestaServidor', (data) => {
    createPElement(data)
});