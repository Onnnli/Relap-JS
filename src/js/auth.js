import {isValidEmail} from './utils'
import {isValidPass} from './utils'


//==========  Аутентификация   =====================//

const reg = document.querySelector('.reg');
const auth = document.querySelector('#authBg');
const authReg = document.querySelector('#formReg');

reg.addEventListener('click', function() {
    auth.style.display = "none";
    authReg.style.display = "block"
})
// нажатие на кнопку зарегистириваться 
         

/// =====================form reg ================

let form = document.querySelector('#authReg'); //добавляем форму
form.addEventListener('submit', singUp); //{once: true} -- вызывает 1 раз

// проверка валидации почты при заполнении

let submitSingIn = document.querySelector('#submitReg');
const mailRegistration = form.querySelector('#mailReg');


submitSingIn.disabled = true;

mailRegistration.addEventListener('input', () => {
    if (isValidEmail(mailRegistration.value)){
        submitSingIn.disabled = false;
        mailRegistration.style.border = '1px solid green'
        console.log('Правильный емайл');
    } else {
        mailRegistration.style.border = '1px solid red'
        console.log('Неправильный емайл');
    }
})




let out = document.querySelector('.out'); // для вывода сообщений



// проверка валидации пароля при заполнении

const passRegistration = document.querySelector('#passReg');
const passRegistrationCheck = document.querySelector('#passReg2');

passRegistration.addEventListener('input', () => {
    if (!isValidPass(passRegistration.value)){
        passRegistration.style.border = '1px solid red';
        console.log('Пароль должен быть не менее 6 символов!');
        out.innerHTML = 'Пароль должен быть не менее 6 символов!';
    }else {
        passRegistration.style.border = '1px solid green';
        out.innerHTML = ''
    }
});



passRegistrationCheck.addEventListener('input', () => {
    if (isValidPass(passRegistration.value) && passRegistration.value === passRegistrationCheck.value){
        submitSingIn.disabled = false;
        passRegistrationCheck.style.border = '1px solid green';
        passRegistration.style.border = '1px solid green'
        console.log('Верный пароль');
        out.innerHTML = ' ';
    } else  {
        passRegistrationCheck.style.border = '1px solid red';
        passRegistration.style.border = '1px solid red';
        console.log('Пароли не совпадают!');
        out.innerHTML = 'Пароли не совпадают!';
    }
});


//

function singUp(event) {
    event.preventDefault(); 
    
    try{
        
        createUser(mailRegistration.value, passRegistration.value)
            .then( (token) => {trueLogIn(token);
                            console.log('получилось', token);},
                    (err) => {console.error('не получилось', err);})

    } catch (error){
        console.log('catch', error);
    }
}


//запрос на сервер

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


submitSingIn.addEventListener('click', function(){
    auth.style.display = "block";
    authReg.style.display = "none"
});


/// =============вход===========

let formAuth = document.querySelector('#auth'); //добавляем форму
formAuth.addEventListener('submit', authWithEmail);


const email = document.querySelector('#mail');
const password = document.querySelector('#pass');


function authWithEmail(event) {
    event.preventDefault(); 
    try{
        authUser(email.value, password.value)
            .then((token) => {trueLogIn(token);})
    } catch (error){
        console.log('catch ', error);
    }
}

export function authUser(userEmail, userPassword) {
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



export function checkToken () {
    const token =  localStorage.getItem('token');
    return token
}

window.onload = function() {
        if(checkToken()){
            content()
        }
    }

function trueLogIn(token) {
    if(token != undefined) {
        localStorage.setItem('token', JSON.stringify(token));
        //console.log(typeof(JSON.stringify(email.value)));
        if(!!email.value == false){
            localStorage.setItem('email', JSON.stringify(mailRegistration.value));
        }else{
            localStorage.setItem('email',  JSON.stringify(email.value));
        }

            if(checkToken()){
                return fetch(`https://final-project-41ed3-default-rtdb.firebaseio.com/content.json?auth=${token}`)
                    .then(response => response.json())
                    .then(data => {data, 
                        out.innerHTML = 'Вы вошли',
                        content()})
                    }
        } else {

            console.log('Не верный логин и пароль');
            out.innerHTML = 'Не верный логин и пароль'
    } 
};

const homeContent = document.querySelector('.home-content');

function content(){  

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