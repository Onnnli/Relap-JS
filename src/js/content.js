// кнопка выйти 
import {allClient} from './contact'

const unAuth = document.querySelector('#unAuth');

unAuth.addEventListener('click', function() {
    localStorage.removeItem('token');
    localStorage.removeItem('email');
    document.location.reload();
})

//основные секции

const contactContent = document.querySelector('.contact-content');
const mapContent = document.querySelector('.map-content');

const menu = document.getElementById('menu');
const allContent = document.getElementsByClassName('content');
const linkMenu = document.getElementsByClassName('link-nav');

function activeTab(event) {
    if (event.target.className == 'link-nav') {
        for (let i = 0; i < linkMenu.length; i++) {
            if (event.target == linkMenu[i]) {
                if(linkMenu[1]){
                    allClient();
                }
                allContent[i].classList.remove('hide');
                allContent[i].classList.add('show');
                linkMenu[i].classList.add('active-tabs')
            }else{
                allContent[i].classList.add('hide');
                allContent[i].classList.remove('show');
                linkMenu[i].classList.remove('active-tabs')
            }             
        }
    }
}

menu.onclick = activeTab;

let browser, ua = navigator.userAgent;
if (ua.indexOf("Firefox") > -1) {
     browser = "Mozilla Firefox";
} else if (ua.indexOf("Opera") > -1) {
     browser = "Opera";
} else if (ua.indexOf("Trident") > -1) {
     browser = "Microsoft Internet Explorer";
} else if (ua.indexOf("Edge") > -1) {
     browser = "Microsoft Edge";
} else if (ua.indexOf("Chrome") > -1) {
    browser = "Google Chrome";
} else if (ua.indexOf("Safari") > -1) {
    browser = "Apple Safari";
} else {
    browser = "unknown";
}
console.log(browser);

const agent = document.querySelector('.agent');
agent.innerHTML = `Вы зашли с ${browser}`

//modal

const closeModal = document.querySelector('.close-btn');
const openModal = document.querySelector('.modal');
const modalOverlay = document.querySelector('.modal-overlay');

closeModal.addEventListener('click', function(){
    modalOverlay.classList.remove('open');      
    modalOverlay.classList.add('close');
})

openModal.addEventListener('click', function(event){
    event.preventDefault()
    modalOverlay.classList.remove('close');
    modalOverlay.classList.add('open');
})