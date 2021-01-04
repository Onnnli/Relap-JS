import {isValidEmail} from './utils'
import {isValidPass} from './utils'

const wrapperAuth = document.querySelector('#authBg');
const wrapperReg = document.querySelector('#formReg');

export function сlickToRegister() {
    wrapperAuth.style.display = "none";
    wrapperReg.style.display = "block";
}; // нажатие на кнопку зарегистириваться 



export let registrationForm = document.querySelector('#authReg')

export const mailRegistration = registrationForm.querySelector('#mailReg');

export function mailValidationCheck() {
    if (isValidEmail(mailRegistration.value)){
        mailRegistration.style.border = '1px solid green'
    } else {
        mailRegistration.style.border = '1px solid red'
    }
};
export const passRegistration = document.querySelector('#passReg');

let massageRegistration = document.querySelector('.outReg');

export function passwordValidationCheck(){
    if (!isValidPass(passRegistration.value)){
        massageRegistration.innerHTML = 'Пароль должен быть не менее 6 символов!';
        passRegistration.style.border = '1px solid red';
    }else {
        passRegistration.style.border = '1px solid green';
        massageRegistration.innerHTML = ''
    }
}
export let registrationSubmit = document.querySelector('#submitReg');

export const passwRegistrationCheck = document.querySelector('#passReg2');

export function comparisonOfPasswords() {
    if (isValidPass(passRegistration.value) && passRegistration.value === passwRegistrationCheck.value){
        registrationSubmit.disabled = false;
        passwRegistrationCheck.style.border = '1px solid green';
        passRegistration.style.border = '1px solid green'
        massageRegistration.innerHTML = ' ';
    } else  {
        passwRegistrationCheck.style.border = '1px solid red';
        passRegistration.style.border = '1px solid red';
        massageRegistration.innerHTML = 'Пароли не совпадают!';
    }
}

export function registerNow(){
    wrapperAuth.style.display = "block";
    wrapperReg.style.display = "none"
}




export const email = document.querySelector('#mail');

export const password = document.querySelector('#pass');

export function singUp(event) {
    event.preventDefault(); 
    try{
        createUser(mailRegistration.value, passRegistration.value)
        .then( (token) => {trueLogIn(token)},
                            (err) => {console.error(err);})
                            
                        } catch (error){console.log(error);
    }
}

async function createUser(userEmail, userPassword) {
    const apiKey = 'AIzaSyAWUbWHJ_qonTw1ohTQ9o3JwxqIHl8cXOE' 
    let result = await fetch(`https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${apiKey}`, {
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        mode: 'cors', // no-cors, *cors, same-origin
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        credentials: 'same-origin', // include, *same-origin, omit
        headers: {
            'Content-Type': 'application/json'
        // 'Content-Type': 'application/x-www-form-urlencoded',
    },
        redirect: 'follow', // manual, *follow, error
        referrerPolicy: 'no-referrer', // no-referrer, *client
        body: JSON.stringify({
            email: userEmail,
            password: userPassword,
            returnSecureToken: true}),
        })
        .then(response => response.json())
        .then(data => data.idToken)
        
        return result
    }

let massageAuthorization = document.querySelector('.out'); // для вывода сообщений


function trueLogIn(token) {
    if(token != undefined) {
        localStorage.setItem('token', JSON.stringify(token));
        if(!!email.value == false){
            localStorage.setItem('email', JSON.stringify(mailRegistration.value));
        }else{
            localStorage.setItem('email',  JSON.stringify(email.value));
        }

            if(checkToken()){
                return fetch(`https://final-project-41ed3-default-rtdb.firebaseio.com/content.json?auth=${token}`)
                    .then(response => response.json())
                    .then(data => {data, 
                        massageAuthorization.innerHTML = 'Вы вошли',
                        content()})
                    }
        } else {
            massageAuthorization.innerHTML = 'Не верный логин и пароль'
    } 
};

export function checkToken () {
    const token =  localStorage.getItem('token');
    return token
}


    
export function content(){  
    const homeContent = document.querySelector('.home-content');

    if(checkToken()){
        document.querySelector('.auth-overlay').style.display = 'none';
        let mainContent = document.querySelector('.main');
        mainContent.style.display = 'block';
        homeContent.classList.add('show');
        homeContent.classList.remove('hide');

    }  else {
        console.log('нет токена');
    }
};



export function authWithEmail(event) {
    event.preventDefault(); 
    try{
        authUser(email.value, password.value)
            .then((token) => {trueLogIn(token);})
    } catch (error){
        console.log('catch ', error);
    }
}


function authUser(userEmail, userPassword) {
    const apiKey = 'AIzaSyAWUbWHJ_qonTw1ohTQ9o3JwxqIHl8cXOE' 
    let result = fetch(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${apiKey}`, {
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        mode: 'cors', // no-cors, *cors, same-origin
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        credentials: 'same-origin', // include, *same-origin, omit
        headers: {
            'Content-Type': 'application/json'
        // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        redirect: 'follow', // manual, *follow, error
        referrerPolicy: 'no-referrer', // no-referrer, *client
        body: JSON.stringify({
            email: userEmail,
            password: userPassword,
            returnSecureToken: true}),
        })
        .then(response => response.json())
        .then((data) => data)
        .then(data => data.idToken)
    return result 
}