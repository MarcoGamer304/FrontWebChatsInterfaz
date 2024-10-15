import { registerUser, getUserList, setNewMessage } from "./sockets";

const loginBtn = document.getElementById('loginBtn');
const loginModal = document.getElementById('loginModal');
const loginClose = document.getElementById('loginClose')
const loginForm = document.getElementById('loginForm')
const loginSection = document.getElementById('login-section');
const mainSection = document.getElementById('main-section');
const navBurger = document.getElementById('nav-burger');
const navAdd = document.getElementById('nav-add');
const addUseModal = document.getElementById('addUser');
const userClose = document.getElementById('userClose');
const userForm = document.getElementById('userForm');
const optionsModal = document.getElementById('optionsModal');
const optionsClose = document.getElementById('optionsClose');
const globalGroup = document.getElementById('globalGroup');
const logoReturn = document.getElementById('logoReturn');
const insideChat = document.getElementById('inside-chat');
const form = document.getElementById('myForm');

localStorage.clear();
let usernameLocal; 
loginBtn.innerText = localStorage.getItem('username') || 'Login';

loginBtn.addEventListener('click', () => {
    loginModal.showModal();
})

loginClose.addEventListener('click', () => {
    loginModal.close()
})

loginForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const inputUser = document.getElementById('input-login-user')
    localStorage.setItem('username', inputUser.value);
    inputUser.value = '';

    const inputPass = document.getElementById('input-login-pass')
    localStorage.setItem('password', inputPass.value);
    inputPass.value = '';

    loginModal.close();
    login();
});

function login() {
    if (!localStorage.getItem('username')) return;
    console.log('usuario valido');
    usernameLocal = localStorage.getItem('username');

    loginBtn.innerText = usernameLocal;
    loginBtn.disabled = true;

    loginSection.style.display = 'none';
    mainSection.style.display = 'block';

    //send register evt to server
    registerUser();

}
logoReturn.addEventListener('click', () => {
    //resets secctions display
    insideChat.style.display = 'none';
    mainSection.style.display = 'block';

});

navBurger.addEventListener('click', () => {
    optionsModal.showModal();
});

optionsClose.addEventListener('click', () => {
    optionsModal.close();
});

navAdd.addEventListener('click', () => {
    addUseModal.showModal();
    let userList = new Map();
    userList = getUserList();

    const userlistSelector = document.getElementById('userlist');
    userlistSelector.innerHTML = '';

    for (let user of userList) {
        const newOption = document.createElement('option');
        newOption.setAttribute('value', user[1].username);
        newOption.textContent = user[1].username;

        userlistSelector.appendChild(newOption);
    }
});

userClose.addEventListener('click', () => {
    addUseModal.close();
});

userForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const userlist = document.getElementById('userlist');
    console.log(userlist.value);
    addUseModal.close();
});

globalGroup.addEventListener('click', () => {
    mainSection.style.display = 'none';
    insideChat.style.display = 'block';
})

//fix 

form.addEventListener('submit', function (event) {
    event.preventDefault();

    const textConstant = document.getElementById('text');
    const text = textConstant.value;
    textConstant.value = '';
    if (text !== '') {
        setNewMessage(text)
    }
});

export function createPElement(data) {
    const newDiv = document.createElement('div')
    newDiv.className = 'messageContainer';

    const newUser = document.createElement('span')

    console.log('username localStorage: '+ localStorage.getItem('username'))
    console.log('username variable : '+usernameLocal);
    console.log('data username : '+ data.user)

    data.user === usernameLocal ? newUser.innerText = 'Me' : newUser.innerText = data.user;
    
    newUser.className = 'username';
    newDiv.appendChild(newUser);
 
    const newMessage = document.createElement('p')
    newMessage.className = 'message';
    newMessage.innerText = data.message;

    const spanInfo = document.createElement('span')
    spanInfo.innerText = new Date().toLocaleTimeString();
    spanInfo.style.fontSize = '0.7em'

    newDiv.appendChild(newMessage);
    newDiv.appendChild(spanInfo)

    if (data.user === usernameLocal) {
        newDiv.style.alignSelf = 'flex-end'
        newDiv.style.backgroundColor = '#097fe7'
        newDiv.style.color = 'white'
        newUser.style.alignSelf = 'flex-end'
        newMessage.style.alignSelf = 'flex-end'
        spanInfo.style.alignSelf = 'flex-end'
    }
    menssageList.appendChild(newDiv);

    menssageList.scrollTop = menssageList.scrollHeight;
    console.log('Mensaje desde el servidor:', data);
}




