/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./js/auth.js":
/*!********************!*\
  !*** ./js/auth.js ***!
  \********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "authUser": () => /* binding */ authUser,
/* harmony export */   "checkToken": () => /* binding */ checkToken
/* harmony export */ });
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./utils */ "./js/utils.js");
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }


 //==========  Аутентификация   =====================//

var reg = document.querySelector('.reg');
var auth = document.querySelector('#authBg');
var authReg = document.querySelector('#formReg');
reg.addEventListener('click', function () {
  auth.style.display = "none";
  authReg.style.display = "block";
}); // нажатие на кнопку зарегистириваться 
/// =====================form reg ================

var form = document.querySelector('#authReg'); //добавляем форму

form.addEventListener('submit', singUp); //{once: true} -- вызывает 1 раз
// проверка валидации почты при заполнении

var submitSingIn = document.querySelector('#submitReg');
var mailRegistration = form.querySelector('#mailReg');
submitSingIn.disabled = true;
mailRegistration.addEventListener('input', function () {
  if ((0,_utils__WEBPACK_IMPORTED_MODULE_0__.isValidEmail)(mailRegistration.value)) {
    submitSingIn.disabled = false;
    mailRegistration.style.border = '1px solid green';
    console.log('Правильный емайл');
  } else {
    mailRegistration.style.border = '1px solid red';
    console.log('Неправильный емайл');
  }
});
var out = document.querySelector('.out'); // для вывода сообщений
// проверка валидации пароля при заполнении

var passRegistration = document.querySelector('#passReg');
var passRegistrationCheck = document.querySelector('#passReg2');
passRegistration.addEventListener('input', function () {
  if (!(0,_utils__WEBPACK_IMPORTED_MODULE_0__.isValidPass)(passRegistration.value)) {
    passRegistration.style.border = '1px solid red';
    console.log('Пароль должен быть не менее 6 символов!');
    out.innerHTML = 'Пароль должен быть не менее 6 символов!';
  } else {
    passRegistration.style.border = '1px solid green';
    out.innerHTML = '';
  }
});
passRegistrationCheck.addEventListener('input', function () {
  if ((0,_utils__WEBPACK_IMPORTED_MODULE_0__.isValidPass)(passRegistration.value) && passRegistration.value === passRegistrationCheck.value) {
    submitSingIn.disabled = false;
    passRegistrationCheck.style.border = '1px solid green';
    passRegistration.style.border = '1px solid green';
    console.log('Верный пароль');
    out.innerHTML = ' ';
  } else {
    passRegistrationCheck.style.border = '1px solid red';
    passRegistration.style.border = '1px solid red';
    console.log('Пароли не совпадают!');
    out.innerHTML = 'Пароли не совпадают!';
  }
}); //

function singUp(event) {
  event.preventDefault();

  try {
    createUser(mailRegistration.value, passRegistration.value).then(function (token) {
      trueLogIn(token);
      console.log('получилось', token);
    }, function (err) {
      console.error('не получилось', err);
    });
  } catch (error) {
    console.log('catch', error);
  }
} //запрос на сервер


function createUser(_x, _x2) {
  return _createUser.apply(this, arguments);
}

function _createUser() {
  _createUser = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(userEmail, userPassword) {
    var apiKey, result;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            apiKey = 'AIzaSyAWUbWHJ_qonTw1ohTQ9o3JwxqIHl8cXOE';
            _context.next = 3;
            return fetch("https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=".concat(apiKey), {
              method: 'POST',
              // *GET, POST, PUT, DELETE, etc.
              mode: 'cors',
              // no-cors, *cors, same-origin
              cache: 'no-cache',
              // *default, no-cache, reload, force-cache, only-if-cached
              credentials: 'same-origin',
              // include, *same-origin, omit
              headers: {
                'Content-Type': 'application/json' // 'Content-Type': 'application/x-www-form-urlencoded',

              },
              redirect: 'follow',
              // manual, *follow, error
              referrerPolicy: 'no-referrer',
              // no-referrer, *client
              body: JSON.stringify({
                email: userEmail,
                password: userPassword,
                returnSecureToken: true
              })
            }).then(function (response) {
              return response.json();
            }).then(function (data) {
              return data.idToken;
            });

          case 3:
            result = _context.sent;
            return _context.abrupt("return", result);

          case 5:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  return _createUser.apply(this, arguments);
}

submitSingIn.addEventListener('click', function () {
  auth.style.display = "block";
  authReg.style.display = "none";
}); /// =============вход===========

var formAuth = document.querySelector('#auth'); //добавляем форму

formAuth.addEventListener('submit', authWithEmail);
var email = document.querySelector('#mail');
var password = document.querySelector('#pass');

function authWithEmail(event) {
  event.preventDefault();

  try {
    authUser(email.value, password.value).then(function (token) {
      trueLogIn(token);
    });
  } catch (error) {
    console.log('catch ', error);
  }
}

function authUser(userEmail, userPassword) {
  var apiKey = 'AIzaSyAWUbWHJ_qonTw1ohTQ9o3JwxqIHl8cXOE';
  var result = fetch("https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=".concat(apiKey), {
    method: 'POST',
    // *GET, POST, PUT, DELETE, etc.
    mode: 'cors',
    // no-cors, *cors, same-origin
    cache: 'no-cache',
    // *default, no-cache, reload, force-cache, only-if-cached
    credentials: 'same-origin',
    // include, *same-origin, omit
    headers: {
      'Content-Type': 'application/json' // 'Content-Type': 'application/x-www-form-urlencoded',

    },
    redirect: 'follow',
    // manual, *follow, error
    referrerPolicy: 'no-referrer',
    // no-referrer, *client
    body: JSON.stringify({
      email: userEmail,
      password: userPassword,
      returnSecureToken: true
    })
  }).then(function (response) {
    return response.json();
  }).then(function (data) {
    return data;
  }).then(function (data) {
    return data.idToken;
  });
  return result;
}
function checkToken() {
  var token = localStorage.getItem('token');
  return token;
}

window.onload = function () {
  if (checkToken()) {
    content();
  }
};

function trueLogIn(token) {
  if (token != undefined) {
    localStorage.setItem('token', JSON.stringify(token)); //console.log(typeof(JSON.stringify(email.value)));

    if (!!email.value == false) {
      localStorage.setItem('email', JSON.stringify(mailRegistration.value));
    } else {
      localStorage.setItem('email', JSON.stringify(email.value));
    }

    if (checkToken()) {
      return fetch("https://final-project-41ed3-default-rtdb.firebaseio.com/content.json?auth=".concat(token)).then(function (response) {
        return response.json();
      }).then(function (data) {
        data, out.innerHTML = 'Вы вошли', content();
      });
    }
  } else {
    console.log('Не верный логин и пароль');
    out.innerHTML = 'Не верный логин и пароль';
  }
}

;
var homeContent = document.querySelector('.home-content');

function content() {
  if (checkToken()) {
    document.querySelector('.auth-overlay').style.display = 'none';
    var mainContent = document.querySelector('.main');
    mainContent.style.display = 'block';
    homeContent.classList.add('show');
    homeContent.classList.remove('hide');
  } else {
    console.log('нет токена');
  }
}

;

/***/ }),

/***/ "./js/contact.js":
/*!***********************!*\
  !*** ./js/contact.js ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "allClient": () => /* binding */ allClient
/* harmony export */ });
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! lodash */ "../node_modules/lodash/lodash.js");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! moment */ "../node_modules/moment/moment.js");
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(moment__WEBPACK_IMPORTED_MODULE_1__);


moment__WEBPACK_IMPORTED_MODULE_1___default()().format();
function allClient() {
  var result = fetch('https://gist.githubusercontent.com/oDASCo/3f4014d24dc79e1e29b58bfa96afaa1b/raw/677516ee3bd278f7e3d805108596ca431d00b629/db.json').then(function (response) {
    return response.json();
  }).then(function (data) {
    takeNameClient(data);
  });
  return result;
}
;
var attribute = {
  'name': {
    'label': 'Имя'
  },
  'company': {
    'label': 'Компания'
  },
  'email': {
    'label': 'E-mail'
  },
  'phone': {
    'label': 'Телефон'
  },
  'balance': {
    'label': 'Баланс'
  },
  'registered': {
    'label': 'Регистрация'
  },
  'delete': {
    'label': 'Удалить'
  }
};
var table = document.querySelector('.table-client');

function takeNameClient(client) {
  //рисовали заголовок 
  var headingRow = document.createElement('tr');

  for (var key in attribute) {
    var nameHeadingRow = document.createElement('th');

    if (attribute[key].label) {
      nameHeadingRow.textContent = attribute[key].label;
    } else {
      nameHeadingRow.textContent = key;
    }

    headingRow.append(nameHeadingRow);
  }

  table.append(headingRow); //вставить по ключам заголовка в таблицу

  var female = 0;
  var male = 0;
  var numBalFemale = [];
  var maxBalanceFemale = 0;
  var numBalMale = [];
  var maxBalanceMale = 0;

  var _loop = function _loop(i) {
    var cli = client[i]; // ВСТАВКА В ВТОРОСТ

    if (cli.gender === 'female' && cli.balance) {
      female++;
      var bal = cli.balance;
      var newBal = bal.replace('$', '').replace(',', '').trim();
      numBalFemale.push(+newBal);
      maxBalanceFemale = Math.max.apply(null, numBalFemale);
    } else {
      male++;
      var _bal = cli.balance;

      var _newBal = _bal.replace('$', '').replace(',', '').trim();

      numBalMale.push(+_newBal);
      maxBalanceMale = Math.max.apply(null, numBalMale);
    }

    var maleAmount = document.querySelector('.maleAmount');
    maleAmount.textContent = male;
    var femaleAmount = document.querySelector('.femaleAmount');
    femaleAmount.textContent = female;
    var a = maxBalanceFemale.toString();
    var aa = a.slice(0, 1);
    var ab = a.slice(1);
    var b = maxBalanceMale.toString();
    var ba = b.slice(0, 1);
    var bb = b.slice(1);
    document.querySelector('.maxFemale').textContent = "$ ".concat(aa, ", ").concat(ab);
    document.querySelector('.maxMale').textContent = "$ ".concat(ba, ", ").concat(bb); // ЗАПОЛНЕНИЕ ОСНОВНОЙ

    var row = document.createElement('tr');

    if (cli.isActive) {
      row.style.backgroundColor = 'white';
      row.style.color = '#333333';
      row.style.boxShadow = '0px 5px 15px 5px rgba(0,0,0,0.5)';
    } else {
      row.style.color = '#33333356';
    }

    for (var _key in attribute) {
      var column = document.createElement('td');
      row.append(column);
      table.append(row);
      column.textContent = cli[_key];

      if (attribute[_key].label === 'Удалить' || attribute[_key].label === 'Регистрация') {
        if (attribute[_key].label === 'Удалить') {
          var btnDelete = "<p class='btnDelete'> X </p>";
          column.innerHTML = btnDelete;

          column.onclick = function () {
            var modal = document.querySelector('.delete-overlay');
            modal.classList.remove('close');
            modal.classList.add('open');
            var text = document.querySelector('.delete-text');
            text.innerHTML = "\u0412\u044B \u0434\u0435\u0439\u0441\u0442\u0432\u0438\u0442\u0435\u043B\u044C\u043D\u043E \u0445\u043E\u0442\u0438\u0442\u0435 \u0443\u0434\u0430\u043B\u0438\u0442\u044C ".concat(cli.name, "?");

            document.querySelector('.yes').onclick = function () {
              modal.classList.add('close');
              modal.classList.remove('open');
              row.remove();
              var success = document.querySelector('.success-delete');

              function sh() {
                success.classList.add('open');
                success.classList.remove('close');
              }

              setTimeout(sh, 700);

              function cl() {
                success.classList.add('close');
                success.classList.remove('open');
              }

              setTimeout(cl, 2000);
            };

            document.querySelector('.no').onclick = function () {
              modal.classList.add('close');
              modal.classList.remove('open');
            };
          };
        } else {
          var thisTime = cli[_key];
          thisTime = thisTime.split('T').join(' '); // удаляем букву Т

          var time = moment__WEBPACK_IMPORTED_MODULE_1___default()(thisTime);
          var timeFormate = time.format("Do MMMM YYYY");
          column.innerHTML = timeFormate;
        }
      }
    }
  };

  for (var i = 0; i < client.length; i++) {
    _loop(i);
  }

  var blockTab = document.querySelector('.blockTable');
  var btnScroll = document.createElement('div');
  btnScroll.classList.add('btnScroll');
  btnScroll.textContent = "\u2191";
  blockTab.addEventListener('scroll', function () {
    if (blockTab.scrollTop > 500) {
      btnScroll.style.opacity = '100';
    } else {
      btnScroll.style.opacity = '0';
    }

    blockTab.append(btnScroll);
    btnScroll.addEventListener('click', function n() {
      if (blockTab.scrollTop > 0) {
        blockTab.scrollBy(0, -100);
        setTimeout(n(), 20);
      }
    });
  });
  return true;
}

/***/ }),

/***/ "./js/content.js":
/*!***********************!*\
  !*** ./js/content.js ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _contact__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./contact */ "./js/contact.js");
// кнопка выйти 

var unAuth = document.querySelector('#unAuth');
unAuth.addEventListener('click', function () {
  localStorage.removeItem('token');
  localStorage.removeItem('email');
  document.location.reload();
}); //основные секции

var contactContent = document.querySelector('.contact-content');
var mapContent = document.querySelector('.map-content');
var menu = document.getElementById('menu');
var allContent = document.getElementsByClassName('content');
var linkMenu = document.getElementsByClassName('link-nav');

function activeTab(event) {
  if (event.target.className == 'link-nav') {
    for (var i = 0; i < linkMenu.length; i++) {
      if (event.target == linkMenu[i]) {
        if (linkMenu[1]) {
          (0,_contact__WEBPACK_IMPORTED_MODULE_0__.allClient)();
        }

        allContent[i].classList.remove('hide');
        allContent[i].classList.add('show');
        linkMenu[i].classList.add('active-tabs');
      } else {
        allContent[i].classList.add('hide');
        allContent[i].classList.remove('show');
        linkMenu[i].classList.remove('active-tabs');
      }
    }
  }
}

menu.onclick = activeTab;
var browser,
    ua = navigator.userAgent;

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
var agent = document.querySelector('.agent');
agent.innerHTML = "\u0412\u044B \u0437\u0430\u0448\u043B\u0438 \u0441 ".concat(browser); //modal

var closeModal = document.querySelector('.close-btn');
var openModal = document.querySelector('.modal');
var modalOverlay = document.querySelector('.modal-overlay');
closeModal.addEventListener('click', function () {
  modalOverlay.classList.remove('open');
  modalOverlay.classList.add('close');
});
openModal.addEventListener('click', function (event) {
  event.preventDefault();
  modalOverlay.classList.remove('close');
  modalOverlay.classList.add('open');
});

/***/ }),

/***/ "./js/index.js":
/*!*********************!*\
  !*** ./js/index.js ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_polyfill__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/polyfill */ "../node_modules/@babel/polyfill/lib/index.js");
/* harmony import */ var _babel_polyfill__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_polyfill__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _auth__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./auth */ "./js/auth.js");
/* harmony import */ var _content__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./content */ "./js/content.js");
/* harmony import */ var _contact__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./contact */ "./js/contact.js");
/* harmony import */ var _scss_main_scss__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../scss/main.scss */ "./scss/main.scss");






/***/ }),

/***/ "./js/utils.js":
/*!*********************!*\
  !*** ./js/utils.js ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "isValidPass": () => /* binding */ isValidPass,
/* harmony export */   "isValidEmail": () => /* binding */ isValidEmail
/* harmony export */ });
function isValidPass(value) {
  return value.length >= 6;
}
;
function isValidEmail(value) {
  var mailFormat = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  var valid = new RegExp(mailFormat).test(value);
  return valid;
} // YUP
// JOI

/***/ }),

/***/ "./scss/main.scss":
/*!************************!*\
  !*** ./scss/main.scss ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "../node_modules/moment/locale sync recursive ^\\.\\/.*$":
/*!****************************************************!*\
  !*** ../node_modules/moment/locale/ sync ^\.\/.*$ ***!
  \****************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var map = {
	"./af": "../node_modules/moment/locale/af.js",
	"./af.js": "../node_modules/moment/locale/af.js",
	"./ar": "../node_modules/moment/locale/ar.js",
	"./ar-dz": "../node_modules/moment/locale/ar-dz.js",
	"./ar-dz.js": "../node_modules/moment/locale/ar-dz.js",
	"./ar-kw": "../node_modules/moment/locale/ar-kw.js",
	"./ar-kw.js": "../node_modules/moment/locale/ar-kw.js",
	"./ar-ly": "../node_modules/moment/locale/ar-ly.js",
	"./ar-ly.js": "../node_modules/moment/locale/ar-ly.js",
	"./ar-ma": "../node_modules/moment/locale/ar-ma.js",
	"./ar-ma.js": "../node_modules/moment/locale/ar-ma.js",
	"./ar-sa": "../node_modules/moment/locale/ar-sa.js",
	"./ar-sa.js": "../node_modules/moment/locale/ar-sa.js",
	"./ar-tn": "../node_modules/moment/locale/ar-tn.js",
	"./ar-tn.js": "../node_modules/moment/locale/ar-tn.js",
	"./ar.js": "../node_modules/moment/locale/ar.js",
	"./az": "../node_modules/moment/locale/az.js",
	"./az.js": "../node_modules/moment/locale/az.js",
	"./be": "../node_modules/moment/locale/be.js",
	"./be.js": "../node_modules/moment/locale/be.js",
	"./bg": "../node_modules/moment/locale/bg.js",
	"./bg.js": "../node_modules/moment/locale/bg.js",
	"./bm": "../node_modules/moment/locale/bm.js",
	"./bm.js": "../node_modules/moment/locale/bm.js",
	"./bn": "../node_modules/moment/locale/bn.js",
	"./bn-bd": "../node_modules/moment/locale/bn-bd.js",
	"./bn-bd.js": "../node_modules/moment/locale/bn-bd.js",
	"./bn.js": "../node_modules/moment/locale/bn.js",
	"./bo": "../node_modules/moment/locale/bo.js",
	"./bo.js": "../node_modules/moment/locale/bo.js",
	"./br": "../node_modules/moment/locale/br.js",
	"./br.js": "../node_modules/moment/locale/br.js",
	"./bs": "../node_modules/moment/locale/bs.js",
	"./bs.js": "../node_modules/moment/locale/bs.js",
	"./ca": "../node_modules/moment/locale/ca.js",
	"./ca.js": "../node_modules/moment/locale/ca.js",
	"./cs": "../node_modules/moment/locale/cs.js",
	"./cs.js": "../node_modules/moment/locale/cs.js",
	"./cv": "../node_modules/moment/locale/cv.js",
	"./cv.js": "../node_modules/moment/locale/cv.js",
	"./cy": "../node_modules/moment/locale/cy.js",
	"./cy.js": "../node_modules/moment/locale/cy.js",
	"./da": "../node_modules/moment/locale/da.js",
	"./da.js": "../node_modules/moment/locale/da.js",
	"./de": "../node_modules/moment/locale/de.js",
	"./de-at": "../node_modules/moment/locale/de-at.js",
	"./de-at.js": "../node_modules/moment/locale/de-at.js",
	"./de-ch": "../node_modules/moment/locale/de-ch.js",
	"./de-ch.js": "../node_modules/moment/locale/de-ch.js",
	"./de.js": "../node_modules/moment/locale/de.js",
	"./dv": "../node_modules/moment/locale/dv.js",
	"./dv.js": "../node_modules/moment/locale/dv.js",
	"./el": "../node_modules/moment/locale/el.js",
	"./el.js": "../node_modules/moment/locale/el.js",
	"./en-au": "../node_modules/moment/locale/en-au.js",
	"./en-au.js": "../node_modules/moment/locale/en-au.js",
	"./en-ca": "../node_modules/moment/locale/en-ca.js",
	"./en-ca.js": "../node_modules/moment/locale/en-ca.js",
	"./en-gb": "../node_modules/moment/locale/en-gb.js",
	"./en-gb.js": "../node_modules/moment/locale/en-gb.js",
	"./en-ie": "../node_modules/moment/locale/en-ie.js",
	"./en-ie.js": "../node_modules/moment/locale/en-ie.js",
	"./en-il": "../node_modules/moment/locale/en-il.js",
	"./en-il.js": "../node_modules/moment/locale/en-il.js",
	"./en-in": "../node_modules/moment/locale/en-in.js",
	"./en-in.js": "../node_modules/moment/locale/en-in.js",
	"./en-nz": "../node_modules/moment/locale/en-nz.js",
	"./en-nz.js": "../node_modules/moment/locale/en-nz.js",
	"./en-sg": "../node_modules/moment/locale/en-sg.js",
	"./en-sg.js": "../node_modules/moment/locale/en-sg.js",
	"./eo": "../node_modules/moment/locale/eo.js",
	"./eo.js": "../node_modules/moment/locale/eo.js",
	"./es": "../node_modules/moment/locale/es.js",
	"./es-do": "../node_modules/moment/locale/es-do.js",
	"./es-do.js": "../node_modules/moment/locale/es-do.js",
	"./es-mx": "../node_modules/moment/locale/es-mx.js",
	"./es-mx.js": "../node_modules/moment/locale/es-mx.js",
	"./es-us": "../node_modules/moment/locale/es-us.js",
	"./es-us.js": "../node_modules/moment/locale/es-us.js",
	"./es.js": "../node_modules/moment/locale/es.js",
	"./et": "../node_modules/moment/locale/et.js",
	"./et.js": "../node_modules/moment/locale/et.js",
	"./eu": "../node_modules/moment/locale/eu.js",
	"./eu.js": "../node_modules/moment/locale/eu.js",
	"./fa": "../node_modules/moment/locale/fa.js",
	"./fa.js": "../node_modules/moment/locale/fa.js",
	"./fi": "../node_modules/moment/locale/fi.js",
	"./fi.js": "../node_modules/moment/locale/fi.js",
	"./fil": "../node_modules/moment/locale/fil.js",
	"./fil.js": "../node_modules/moment/locale/fil.js",
	"./fo": "../node_modules/moment/locale/fo.js",
	"./fo.js": "../node_modules/moment/locale/fo.js",
	"./fr": "../node_modules/moment/locale/fr.js",
	"./fr-ca": "../node_modules/moment/locale/fr-ca.js",
	"./fr-ca.js": "../node_modules/moment/locale/fr-ca.js",
	"./fr-ch": "../node_modules/moment/locale/fr-ch.js",
	"./fr-ch.js": "../node_modules/moment/locale/fr-ch.js",
	"./fr.js": "../node_modules/moment/locale/fr.js",
	"./fy": "../node_modules/moment/locale/fy.js",
	"./fy.js": "../node_modules/moment/locale/fy.js",
	"./ga": "../node_modules/moment/locale/ga.js",
	"./ga.js": "../node_modules/moment/locale/ga.js",
	"./gd": "../node_modules/moment/locale/gd.js",
	"./gd.js": "../node_modules/moment/locale/gd.js",
	"./gl": "../node_modules/moment/locale/gl.js",
	"./gl.js": "../node_modules/moment/locale/gl.js",
	"./gom-deva": "../node_modules/moment/locale/gom-deva.js",
	"./gom-deva.js": "../node_modules/moment/locale/gom-deva.js",
	"./gom-latn": "../node_modules/moment/locale/gom-latn.js",
	"./gom-latn.js": "../node_modules/moment/locale/gom-latn.js",
	"./gu": "../node_modules/moment/locale/gu.js",
	"./gu.js": "../node_modules/moment/locale/gu.js",
	"./he": "../node_modules/moment/locale/he.js",
	"./he.js": "../node_modules/moment/locale/he.js",
	"./hi": "../node_modules/moment/locale/hi.js",
	"./hi.js": "../node_modules/moment/locale/hi.js",
	"./hr": "../node_modules/moment/locale/hr.js",
	"./hr.js": "../node_modules/moment/locale/hr.js",
	"./hu": "../node_modules/moment/locale/hu.js",
	"./hu.js": "../node_modules/moment/locale/hu.js",
	"./hy-am": "../node_modules/moment/locale/hy-am.js",
	"./hy-am.js": "../node_modules/moment/locale/hy-am.js",
	"./id": "../node_modules/moment/locale/id.js",
	"./id.js": "../node_modules/moment/locale/id.js",
	"./is": "../node_modules/moment/locale/is.js",
	"./is.js": "../node_modules/moment/locale/is.js",
	"./it": "../node_modules/moment/locale/it.js",
	"./it-ch": "../node_modules/moment/locale/it-ch.js",
	"./it-ch.js": "../node_modules/moment/locale/it-ch.js",
	"./it.js": "../node_modules/moment/locale/it.js",
	"./ja": "../node_modules/moment/locale/ja.js",
	"./ja.js": "../node_modules/moment/locale/ja.js",
	"./jv": "../node_modules/moment/locale/jv.js",
	"./jv.js": "../node_modules/moment/locale/jv.js",
	"./ka": "../node_modules/moment/locale/ka.js",
	"./ka.js": "../node_modules/moment/locale/ka.js",
	"./kk": "../node_modules/moment/locale/kk.js",
	"./kk.js": "../node_modules/moment/locale/kk.js",
	"./km": "../node_modules/moment/locale/km.js",
	"./km.js": "../node_modules/moment/locale/km.js",
	"./kn": "../node_modules/moment/locale/kn.js",
	"./kn.js": "../node_modules/moment/locale/kn.js",
	"./ko": "../node_modules/moment/locale/ko.js",
	"./ko.js": "../node_modules/moment/locale/ko.js",
	"./ku": "../node_modules/moment/locale/ku.js",
	"./ku.js": "../node_modules/moment/locale/ku.js",
	"./ky": "../node_modules/moment/locale/ky.js",
	"./ky.js": "../node_modules/moment/locale/ky.js",
	"./lb": "../node_modules/moment/locale/lb.js",
	"./lb.js": "../node_modules/moment/locale/lb.js",
	"./lo": "../node_modules/moment/locale/lo.js",
	"./lo.js": "../node_modules/moment/locale/lo.js",
	"./lt": "../node_modules/moment/locale/lt.js",
	"./lt.js": "../node_modules/moment/locale/lt.js",
	"./lv": "../node_modules/moment/locale/lv.js",
	"./lv.js": "../node_modules/moment/locale/lv.js",
	"./me": "../node_modules/moment/locale/me.js",
	"./me.js": "../node_modules/moment/locale/me.js",
	"./mi": "../node_modules/moment/locale/mi.js",
	"./mi.js": "../node_modules/moment/locale/mi.js",
	"./mk": "../node_modules/moment/locale/mk.js",
	"./mk.js": "../node_modules/moment/locale/mk.js",
	"./ml": "../node_modules/moment/locale/ml.js",
	"./ml.js": "../node_modules/moment/locale/ml.js",
	"./mn": "../node_modules/moment/locale/mn.js",
	"./mn.js": "../node_modules/moment/locale/mn.js",
	"./mr": "../node_modules/moment/locale/mr.js",
	"./mr.js": "../node_modules/moment/locale/mr.js",
	"./ms": "../node_modules/moment/locale/ms.js",
	"./ms-my": "../node_modules/moment/locale/ms-my.js",
	"./ms-my.js": "../node_modules/moment/locale/ms-my.js",
	"./ms.js": "../node_modules/moment/locale/ms.js",
	"./mt": "../node_modules/moment/locale/mt.js",
	"./mt.js": "../node_modules/moment/locale/mt.js",
	"./my": "../node_modules/moment/locale/my.js",
	"./my.js": "../node_modules/moment/locale/my.js",
	"./nb": "../node_modules/moment/locale/nb.js",
	"./nb.js": "../node_modules/moment/locale/nb.js",
	"./ne": "../node_modules/moment/locale/ne.js",
	"./ne.js": "../node_modules/moment/locale/ne.js",
	"./nl": "../node_modules/moment/locale/nl.js",
	"./nl-be": "../node_modules/moment/locale/nl-be.js",
	"./nl-be.js": "../node_modules/moment/locale/nl-be.js",
	"./nl.js": "../node_modules/moment/locale/nl.js",
	"./nn": "../node_modules/moment/locale/nn.js",
	"./nn.js": "../node_modules/moment/locale/nn.js",
	"./oc-lnc": "../node_modules/moment/locale/oc-lnc.js",
	"./oc-lnc.js": "../node_modules/moment/locale/oc-lnc.js",
	"./pa-in": "../node_modules/moment/locale/pa-in.js",
	"./pa-in.js": "../node_modules/moment/locale/pa-in.js",
	"./pl": "../node_modules/moment/locale/pl.js",
	"./pl.js": "../node_modules/moment/locale/pl.js",
	"./pt": "../node_modules/moment/locale/pt.js",
	"./pt-br": "../node_modules/moment/locale/pt-br.js",
	"./pt-br.js": "../node_modules/moment/locale/pt-br.js",
	"./pt.js": "../node_modules/moment/locale/pt.js",
	"./ro": "../node_modules/moment/locale/ro.js",
	"./ro.js": "../node_modules/moment/locale/ro.js",
	"./ru": "../node_modules/moment/locale/ru.js",
	"./ru.js": "../node_modules/moment/locale/ru.js",
	"./sd": "../node_modules/moment/locale/sd.js",
	"./sd.js": "../node_modules/moment/locale/sd.js",
	"./se": "../node_modules/moment/locale/se.js",
	"./se.js": "../node_modules/moment/locale/se.js",
	"./si": "../node_modules/moment/locale/si.js",
	"./si.js": "../node_modules/moment/locale/si.js",
	"./sk": "../node_modules/moment/locale/sk.js",
	"./sk.js": "../node_modules/moment/locale/sk.js",
	"./sl": "../node_modules/moment/locale/sl.js",
	"./sl.js": "../node_modules/moment/locale/sl.js",
	"./sq": "../node_modules/moment/locale/sq.js",
	"./sq.js": "../node_modules/moment/locale/sq.js",
	"./sr": "../node_modules/moment/locale/sr.js",
	"./sr-cyrl": "../node_modules/moment/locale/sr-cyrl.js",
	"./sr-cyrl.js": "../node_modules/moment/locale/sr-cyrl.js",
	"./sr.js": "../node_modules/moment/locale/sr.js",
	"./ss": "../node_modules/moment/locale/ss.js",
	"./ss.js": "../node_modules/moment/locale/ss.js",
	"./sv": "../node_modules/moment/locale/sv.js",
	"./sv.js": "../node_modules/moment/locale/sv.js",
	"./sw": "../node_modules/moment/locale/sw.js",
	"./sw.js": "../node_modules/moment/locale/sw.js",
	"./ta": "../node_modules/moment/locale/ta.js",
	"./ta.js": "../node_modules/moment/locale/ta.js",
	"./te": "../node_modules/moment/locale/te.js",
	"./te.js": "../node_modules/moment/locale/te.js",
	"./tet": "../node_modules/moment/locale/tet.js",
	"./tet.js": "../node_modules/moment/locale/tet.js",
	"./tg": "../node_modules/moment/locale/tg.js",
	"./tg.js": "../node_modules/moment/locale/tg.js",
	"./th": "../node_modules/moment/locale/th.js",
	"./th.js": "../node_modules/moment/locale/th.js",
	"./tk": "../node_modules/moment/locale/tk.js",
	"./tk.js": "../node_modules/moment/locale/tk.js",
	"./tl-ph": "../node_modules/moment/locale/tl-ph.js",
	"./tl-ph.js": "../node_modules/moment/locale/tl-ph.js",
	"./tlh": "../node_modules/moment/locale/tlh.js",
	"./tlh.js": "../node_modules/moment/locale/tlh.js",
	"./tr": "../node_modules/moment/locale/tr.js",
	"./tr.js": "../node_modules/moment/locale/tr.js",
	"./tzl": "../node_modules/moment/locale/tzl.js",
	"./tzl.js": "../node_modules/moment/locale/tzl.js",
	"./tzm": "../node_modules/moment/locale/tzm.js",
	"./tzm-latn": "../node_modules/moment/locale/tzm-latn.js",
	"./tzm-latn.js": "../node_modules/moment/locale/tzm-latn.js",
	"./tzm.js": "../node_modules/moment/locale/tzm.js",
	"./ug-cn": "../node_modules/moment/locale/ug-cn.js",
	"./ug-cn.js": "../node_modules/moment/locale/ug-cn.js",
	"./uk": "../node_modules/moment/locale/uk.js",
	"./uk.js": "../node_modules/moment/locale/uk.js",
	"./ur": "../node_modules/moment/locale/ur.js",
	"./ur.js": "../node_modules/moment/locale/ur.js",
	"./uz": "../node_modules/moment/locale/uz.js",
	"./uz-latn": "../node_modules/moment/locale/uz-latn.js",
	"./uz-latn.js": "../node_modules/moment/locale/uz-latn.js",
	"./uz.js": "../node_modules/moment/locale/uz.js",
	"./vi": "../node_modules/moment/locale/vi.js",
	"./vi.js": "../node_modules/moment/locale/vi.js",
	"./x-pseudo": "../node_modules/moment/locale/x-pseudo.js",
	"./x-pseudo.js": "../node_modules/moment/locale/x-pseudo.js",
	"./yo": "../node_modules/moment/locale/yo.js",
	"./yo.js": "../node_modules/moment/locale/yo.js",
	"./zh-cn": "../node_modules/moment/locale/zh-cn.js",
	"./zh-cn.js": "../node_modules/moment/locale/zh-cn.js",
	"./zh-hk": "../node_modules/moment/locale/zh-hk.js",
	"./zh-hk.js": "../node_modules/moment/locale/zh-hk.js",
	"./zh-mo": "../node_modules/moment/locale/zh-mo.js",
	"./zh-mo.js": "../node_modules/moment/locale/zh-mo.js",
	"./zh-tw": "../node_modules/moment/locale/zh-tw.js",
	"./zh-tw.js": "../node_modules/moment/locale/zh-tw.js"
};


function webpackContext(req) {
	var id = webpackContextResolve(req);
	return __webpack_require__(id);
}
function webpackContextResolve(req) {
	if(!__webpack_require__.o(map, req)) {
		var e = new Error("Cannot find module '" + req + "'");
		e.code = 'MODULE_NOT_FOUND';
		throw e;
	}
	return map[req];
}
webpackContext.keys = function webpackContextKeys() {
	return Object.keys(map);
};
webpackContext.resolve = webpackContextResolve;
module.exports = webpackContext;
webpackContext.id = "../node_modules/moment/locale sync recursive ^\\.\\/.*$";

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		if(__webpack_module_cache__[moduleId]) {
/******/ 			return __webpack_module_cache__[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			id: moduleId,
/******/ 			loaded: false,
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = __webpack_modules__;
/******/ 	
/******/ 	// the startup function
/******/ 	// It's empty as some runtime module handles the default behavior
/******/ 	__webpack_require__.x = x => {}
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => module['default'] :
/******/ 				() => module;
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/global */
/******/ 	(() => {
/******/ 		__webpack_require__.g = (function() {
/******/ 			if (typeof globalThis === 'object') return globalThis;
/******/ 			try {
/******/ 				return this || new Function('return this')();
/******/ 			} catch (e) {
/******/ 				if (typeof window === 'object') return window;
/******/ 			}
/******/ 		})();
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => Object.prototype.hasOwnProperty.call(obj, prop)
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/node module decorator */
/******/ 	(() => {
/******/ 		__webpack_require__.nmd = (module) => {
/******/ 			module.paths = [];
/******/ 			if (!module.children) module.children = [];
/******/ 			return module;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/jsonp chunk loading */
/******/ 	(() => {
/******/ 		// no baseURI
/******/ 		
/******/ 		// object to store loaded and loading chunks
/******/ 		// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 		// Promise = chunk loading, 0 = chunk loaded
/******/ 		var installedChunks = {
/******/ 			"main": 0
/******/ 		};
/******/ 		
/******/ 		var deferredModules = [
/******/ 			["./js/index.js","vendors-node_modules_babel_polyfill_lib_index_js-node_modules_lodash_lodash_js-node_modules_m-7e6bce"]
/******/ 		];
/******/ 		// no chunk on demand loading
/******/ 		
/******/ 		// no prefetching
/******/ 		
/******/ 		// no preloaded
/******/ 		
/******/ 		// no HMR
/******/ 		
/******/ 		// no HMR manifest
/******/ 		
/******/ 		var checkDeferredModules = x => {};
/******/ 		
/******/ 		// install a JSONP callback for chunk loading
/******/ 		var webpackJsonpCallback = (parentChunkLoadingFunction, data) => {
/******/ 			var [chunkIds, moreModules, runtime, executeModules] = data;
/******/ 			// add "moreModules" to the modules object,
/******/ 			// then flag all "chunkIds" as loaded and fire callback
/******/ 			var moduleId, chunkId, i = 0, resolves = [];
/******/ 			for(;i < chunkIds.length; i++) {
/******/ 				chunkId = chunkIds[i];
/******/ 				if(__webpack_require__.o(installedChunks, chunkId) && installedChunks[chunkId]) {
/******/ 					resolves.push(installedChunks[chunkId][0]);
/******/ 				}
/******/ 				installedChunks[chunkId] = 0;
/******/ 			}
/******/ 			for(moduleId in moreModules) {
/******/ 				if(__webpack_require__.o(moreModules, moduleId)) {
/******/ 					__webpack_require__.m[moduleId] = moreModules[moduleId];
/******/ 				}
/******/ 			}
/******/ 			if(runtime) runtime(__webpack_require__);
/******/ 			if(parentChunkLoadingFunction) parentChunkLoadingFunction(data);
/******/ 			while(resolves.length) {
/******/ 				resolves.shift()();
/******/ 			}
/******/ 		
/******/ 			// add entry modules from loaded chunk to deferred list
/******/ 			if(executeModules) deferredModules.push.apply(deferredModules, executeModules);
/******/ 		
/******/ 			// run deferred modules when all chunks ready
/******/ 			return checkDeferredModules();
/******/ 		}
/******/ 		
/******/ 		var chunkLoadingGlobal = self["webpackChunk"] = self["webpackChunk"] || [];
/******/ 		chunkLoadingGlobal.forEach(webpackJsonpCallback.bind(null, 0));
/******/ 		chunkLoadingGlobal.push = webpackJsonpCallback.bind(null, chunkLoadingGlobal.push.bind(chunkLoadingGlobal));
/******/ 		
/******/ 		function checkDeferredModulesImpl() {
/******/ 			var result;
/******/ 			for(var i = 0; i < deferredModules.length; i++) {
/******/ 				var deferredModule = deferredModules[i];
/******/ 				var fulfilled = true;
/******/ 				for(var j = 1; j < deferredModule.length; j++) {
/******/ 					var depId = deferredModule[j];
/******/ 					if(installedChunks[depId] !== 0) fulfilled = false;
/******/ 				}
/******/ 				if(fulfilled) {
/******/ 					deferredModules.splice(i--, 1);
/******/ 					result = __webpack_require__(__webpack_require__.s = deferredModule[0]);
/******/ 				}
/******/ 			}
/******/ 			if(deferredModules.length === 0) {
/******/ 				__webpack_require__.x();
/******/ 				__webpack_require__.x = x => {};
/******/ 			}
/******/ 			return result;
/******/ 		}
/******/ 		var startup = __webpack_require__.x;
/******/ 		__webpack_require__.x = () => {
/******/ 			// reset startup function so it can be called again when more startup code is added
/******/ 			__webpack_require__.x = startup || (x => {});
/******/ 			return (checkDeferredModules = checkDeferredModulesImpl)();
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	// run startup
/******/ 	return __webpack_require__.x();
/******/ })()
;
//# sourceMappingURL=main.js.map