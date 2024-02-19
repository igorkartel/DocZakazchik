/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/index.scss":
/*!************************!*\
  !*** ./src/index.scss ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./src/components/headerButton.js":
/*!****************************************!*\
  !*** ./src/components/headerButton.js ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   HeaderAfterRender: () => (/* binding */ HeaderAfterRender),
/* harmony export */   HeaderButton: () => (/* binding */ HeaderButton)
/* harmony export */ });
async function HeaderButton() {
  let user = '',
    nouser = ''
  const data = localStorage.getItem('username');
  data? user = 'active' : nouser = 'active'
    
  return (
    `
      <button class='button__log-in ${nouser}'>
        <div class="button__inner">
          <img src="/static/img/user.svg" alt="" class="user-svg"></img>
          <span class="header_log-in">Вход</span>
        </div>
      </button>
      <button class='header__user ${user}'>U</button>
      <div class='header__logout'>
        <button class='header__logout__btn'>Выйти</button>
      </div>
    `
  )
}

function HeaderAfterRender(){
  
  const loginBtn = document.querySelector('.button__log-in'),
    userBtn = document.querySelector('.header__user'),
    logoutBtn = document.querySelector('.header__logout__btn')
    
  
  loginBtn.addEventListener('click', (e) => {
    const body = document.querySelector('body'),
      popup = document.querySelector('.popup')

    popup.classList.toggle('active')
    body.style.overflow = 'hidden'

    setCloseButton()

  })
  
  logoutBtn.addEventListener('click', ()=>{
    fetch('http://127.0.0.1:8000/api/v1/profile/logout/')
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      if ('success' in data) {
        let logout = document.querySelector('.header__logout')
        logout.classList.toggle('active')

        localStorage.removeItem('username')

        const noname = document.querySelector('.button__log-in'),
            user = document.querySelector('.header__user')
        user.classList.toggle('active')
        noname.classList.toggle('active')
      }
    })
  })
    
  userBtn.addEventListener('click', ()=>{
    const userMenu = document.querySelector('.header__logout')
    userMenu.classList.toggle('active')
  })
}

function setCloseButton(){
  let y = 0
  const closes = document.querySelector('.close')
  
  if(document.querySelector('.popup__log-in.active')){
    y = document.querySelector('.popup__log-in.active').offsetTop
    if( window.innerWidth < 481){
      console.log(window.innerWidth)
      closes.style.top = `${y-50}px`
      closes.style.right = `18px`
    } else {
      closes.style.top = `${y-50}px`
      closes.style.right = `${y}px`
    }
  }
}


/***/ }),

/***/ "./src/components/popup.js":
/*!*********************************!*\
  !*** ./src/components/popup.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Popup: () => (/* binding */ Popup),
/* harmony export */   PopupAfterRender: () => (/* binding */ PopupAfterRender)
/* harmony export */ });
/* harmony import */ var _components_headerButton__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../components/headerButton */ "./src/components/headerButton.js");


async function Popup() {

  return (
    `
    <div class="popup__container">
      <div class="close">
        <svg width="50" height="50" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M14.583 14.5834L35.4163 35.4167M14.583 35.4167L35.4163 14.5834" stroke="black" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M14.583 14.5834L35.4163 35.4167M14.583 35.4167L35.4163 14.5834" stroke="black" stroke-opacity="0.2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </div>
      ${loginPopup()}
      ${registerPopup()}
      ${recoveryPopup()}
      ${sendPopup()}
    </div>
    
    `
  )
}

function PopupAfterRender(){
  const loginBtn = document.querySelector('.popup__input_login'),
    registerBtn = document.querySelector('.popup__input_register'),
    restorePassword = document.querySelector('.popup__input_restore'),
    setLoginBtn = document.querySelector('.popup__button-login'),
    setRegisterBtn = document.querySelector('.popup__button-register'),
    fogrotBtn = document.querySelector('.forgot-password_btn'),
    returnLoginBtn = document.querySelector('.popup__button_login'),
    close = document.querySelector('.close'),
    popup = document.querySelector('.popup'),

    login = document.querySelector('.popup__log-in'),
    register = document.querySelector('.popup__register'),
    recovery = document.querySelector('.popup__recovery'),
    send = document.querySelector('.popup__send')

    setRegisterBtn.addEventListener('click', ()=>{
      login.classList.toggle('active')
      register.classList.toggle('active')
      setCloseButton()
    })

    close.addEventListener('click', ()=> {
      const regActive = document.querySelector('.popup__register.active'),
        logActive = document.querySelector('.popup__log-in.active'),
        recActive = document.querySelector('.popup__recovery.active'),
        sendActive = document.querySelector('.popup__send.active'),
        body = document.querySelector('body')
        body.style.overflow = 'auto'
        popup.classList.toggle('active')

        if (!logActive){login.classList.toggle('active')}
        if (recActive){recovery.classList.toggle('active')}
        if (regActive){register.classList.toggle('active')}
        if (sendActive){send.classList.toggle('active')}

    })

    setLoginBtn.addEventListener('click', ()=>{
      login.classList.toggle('active')
      register.classList.toggle('active')
      setCloseButton()
    })

    returnLoginBtn.addEventListener('click', ()=>{
      login.classList.toggle('active')
      recovery.classList.toggle('active')
      setCloseButton()
    })

    fogrotBtn.addEventListener('click', ()=>{
      login.classList.toggle('active')
      recovery.classList.toggle('active')
      setCloseButton()
    })

    restorePassword.addEventListener('click', (e)=>{
      e.preventDefault()
      const form = document.forms.popup__recovery,
        email = form.elements.email.value

      const csrftoken = getCookie('csrftoken')
      const body = JSON.stringify({email: email})

      fetch(`http://127.0.0.1:8000/api/v1/profile/email-check/`, {
        method: 'POST',
        headers: { Accept: 'application/json', 'Content-Type': 'application/json', 'X-CSRFToken': csrftoken,},
        body
      }).then((response) => {
        if (response.status == 201){
          recovery.classList.toggle('active')
          send.classList.toggle('active')
        } else {
          return response.json()
        }
      }).then((data) => {
        console.log(data)
      })
    })

    registerBtn.addEventListener('click', (e)=>{
            
      e.preventDefault()
      const form = document.forms.popup__register,
        username = form.elements.username.value,
        email = form.elements.email.value,
        password = form.elements.password.value,
        password2 = form.elements.password2.value,
        accept_terms = form.elements.accept_terms.value,
        recaptcha = localStorage.getItem('captcha')


      const data = {
          'username': username,
          'email': email,
          'password': password,
          'password2': password2,
          'accept_terms': accept_terms,
          'recaptcha': recaptcha
      }

      auth(data)
    })

    loginBtn.addEventListener('click', (e) => {
      e.preventDefault()
      const form = document.forms.popup__login
      const username = form.elements.username.value
      const password = form.elements.password.value
      const data = {
          'username': username,
          'password': password,
      }

      auth(data)
  })
}

function auth(data){
  let url = null
  'password2' in data ? url = `http://127.0.0.1:8000/api/v1/profile/register/`: url = `http://127.0.0.1:8000/api/v1/profile/login/`
  const csrftoken = getCookie('csrftoken')
  data['csrftoken'] = csrftoken
  async function postData(url, data) {
    const response = await fetch(url, {
      method: "POST",
      headers: {
          "Content-Type": "application/json",
          'X-CSRFToken': csrftoken,
      },
      body: JSON.stringify(data),
    });
    if (response.status == 201) {
      const popup = document.querySelector('.popup'),
        body = document.querySelector('body'),
        login = document.querySelector('.popup__log-in'),
        register = document.querySelector('.popup__register')
    
      popup.classList.toggle('active')
      login.classList.toggle('active')
      register.classList.toggle('active')

      body.style.overflow = 'auto'

      return location.href = 'http://127.0.0.1:8000/api/v1/profile/email-confirmation-sent/'
    }
    return await response.json();
  }
  
  postData(url, data).then((data) => {

    if ('success' in data) {
      const popup = document.querySelector('.popup')
      popup.classList.toggle('active')

      localStorage.setItem('username', data.username)
      
      const headerButton = document.querySelector('#header-button')
      ;(0,_components_headerButton__WEBPACK_IMPORTED_MODULE_0__.HeaderButton)().then((html) => headerButton.innerHTML = html).then(() => (0,_components_headerButton__WEBPACK_IMPORTED_MODULE_0__.HeaderAfterRender)())
      return location.href = `http://127.0.0.1:8000/api/v1/profile/user-profile/${data.id}/`
    } else {
      let error = document.getElementsByClassName('form-error')
      if (!error[0]) {
          const newError = document.getElementsByClassName('error')
          newError[0].classList.toggle('active')
          newError[1].classList.toggle('active')
      }
    }
  });
}

function getCookie(name) {
  let matches = document.cookie.match(new RegExp(
    "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
  ));
  return matches ? decodeURIComponent(matches[1]) : undefined;
}

function setCloseButton(){
  let y = 0
  const closes = document.querySelector('.close')
  
  if(document.querySelector('.popup__log-in.active')){
    y = document.querySelector('.popup__log-in.active').offsetTop
    if( window.innerWidth < 481){
      console.log(window.innerWidth)
      closes.style.top = `${y-50}px`
      closes.style.right = `18px`
    } else {
      closes.style.top = `${y-50}px`
      closes.style.right = `${y}px`
    }
  }else if(document.querySelector('.popup__register.active')){
    console.log(window.innerWidth)
    y = document.querySelector('.popup__register.active').offsetTop
    if( window.innerWidth < 481){
      closes.style.top = `${y-50}px`
      closes.style.right = `18px`
    } else {
      closes.style.top = `${y-50}px`
      closes.style.right = `${y}px`
    }
  }else if(document.querySelector('.popup__recovery.active')){
    console.log(window.innerWidth)
    y = document.querySelector('.popup__recovery.active').offsetTop
    if( window.innerWidth < 481){
      closes.style.top = `${y-50}px`
      closes.style.right = `18px`
    } else {
      closes.style.top = `${y-50}px`
      closes.style.right = `${y}px`
    }
  }
}



function loginPopup() {
  return (
    `
    <form class="popup__log-in active" name="popup__login">
      <label class='form-label'><input class='popup__input' name="username" id="username" type="text" placeholder="Имя пользователя" /><div class='form-error'><div><p class='form-error_message'></p></div></div></label>
      <label class='form-label'><input class='popup__input' name="password" type="password" placeholder="Пароль" /><div class='form-error'><div><p class='form-error_message'></p></div></div></label>
      <input type="submit" value="Войти" class="popup__input_green popup__input_login"/>
      <p class="forgot-password">Забыли пароль? <button type='button' class="forgot-password_btn">Восстановить пароль</button></p>
      <p class="login-using">Войти с помощью</p>
      <div class="popup_links">
        <a href="" class="popup_link">
          <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g clipPath="url(#clip0_924_1247)">
              <path d="M8.19835 29.1946C7.57851 28.9933 6.95868 28.5906 6.54545 27.7852C6.13223 27.3825 5.71901 26.7785 5.09917 25.9732C4.27273 24.7651 3.44628 23.1544 2.82645 21.5436C2.20661 19.7315 2 17.9195 2 16.1074C2 14.094 2.41322 12.4832 3.23967 11.0738C3.8595 9.86577 4.89256 9.0604 5.92562 8.25503C6.95868 7.65101 8.19835 7.24832 9.43801 7.24832C9.85124 7.24832 10.2645 7.24832 10.8843 7.44966C11.2975 7.44966 11.7107 7.65101 12.3306 7.85235C12.9504 8.05369 13.3636 8.25503 13.5702 8.25503C13.9835 8.45638 14.3967 8.45638 14.6033 8.45638C14.8099 8.45638 15.0165 8.45638 15.4298 8.25503C15.6364 8.25503 16.0496 8.05369 16.4628 7.85235C16.876 7.65101 17.2893 7.44966 17.7025 7.44966C18.1157 7.44966 18.5289 7.24832 18.9421 7.24832C19.3554 7.24832 19.9752 7.04698 20.3884 7.24832C21.2149 7.24832 22.0413 7.44966 22.8678 7.85235C24.1074 8.25503 25.1405 9.26175 25.9669 10.2685C25.7603 10.2685 25.3471 10.4698 25.1405 10.8725C24.5207 11.4765 23.9008 12.0805 23.4876 12.6846C23.0744 13.6913 22.6612 14.698 22.6612 15.906C22.6612 17.3154 23.0744 18.5235 23.6942 19.5302C24.1074 20.3356 24.9339 20.9396 25.5537 21.3423C26.1735 21.5436 26.5868 21.745 26.7934 21.9463C26.7934 22.349 26.5868 22.953 26.3802 23.1544C25.9669 24.3624 25.3471 25.1678 24.7273 26.1745C24.1074 26.9799 23.6942 27.5839 23.4876 27.7852C22.8678 28.3893 22.4545 28.9933 21.8347 29.1946C21.4215 29.5973 20.8016 29.7987 19.9752 29.7987C19.562 29.7987 19.1488 29.7987 18.7355 29.5973C18.5289 29.5973 18.1157 29.396 17.7025 29.1946C17.0826 28.9933 16.876 28.7919 16.4628 28.7919C16.0496 28.5906 15.4298 28.5906 15.0165 28.5906C14.6033 28.5906 13.9835 28.5906 13.5702 28.7919C13.157 28.7919 12.7438 28.9933 12.3306 29.1946C11.7107 29.396 11.5041 29.5973 11.2975 29.5973C10.8843 29.7987 10.4711 29.7987 10.0578 29.7987C9.43802 29.7987 8.81818 29.5973 8.19835 29.1946ZM16.876 6.24161C16.0496 6.64429 15.2231 6.84564 14.3967 6.84564C14.1901 6.04027 14.3967 5.2349 14.8099 4.22819C15.2231 3.42282 15.4298 2.81879 16.0496 2.21476C16.6694 1.61074 17.2893 1.00671 18.1157 0.604027C18.9421 0.201343 19.7686 0 20.595 0C20.595 0.805369 20.3884 1.61074 20.1818 2.61745C19.9752 3.42282 19.3554 4.02685 18.9421 4.63087C18.3223 5.43624 17.7025 5.83893 16.876 6.24161Z" fill="black"/>
            </g>
            <defs>
              <clipPath id="clip0_924_1247">
                <rect width="25" height="30" fill="white" transform="translate(2)"/>
              </clipPath>
            </defs>
          </svg>
        </a>
        <a href="" class="popup_link">
          <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g clipPath="url(#clip0_924_1241)">
              <path d="M30 15C30 6.7157 23.2843 -2.67029e-05 15 -2.67029e-05C6.71572 -2.67029e-05 0 6.7157 0 15C0 22.4869 5.48528 28.6925 12.6562 29.8177V19.3359H8.84766V15H12.6562V11.6953C12.6562 7.93591 14.8956 5.85935 18.322 5.85935C19.9631 5.85935 21.6797 6.15232 21.6797 6.15232V9.84372H19.7882C17.9249 9.84372 17.3438 11 17.3438 12.1862V15H21.5039L20.8389 19.3359H17.3438V29.8177C24.5147 28.6925 30 22.4869 30 15Z" fill="white"/>
              <path d="M20.8389 19.3359L21.5039 15H17.3438V12.1862C17.3438 11 17.9249 9.84375 19.7882 9.84375H21.6797V6.15234C21.6797 6.15234 19.9631 5.85938 18.322 5.85938C14.8956 5.85938 12.6563 7.93594 12.6563 11.6953V15H8.84766V19.3359H12.6563V29.8178C13.4199 29.9376 14.2027 30 15 30C15.7973 30 16.5801 29.9376 17.3438 29.8178V19.3359H20.8389Z" fill="black"/>
            </g>
            <defs>
              <clipPath id="clip0_924_1241">
                <rect width="30" height="30" fill="white"/>
              </clipPath>
            </defs>
          </svg>
        </a>
        <a href="" class="popup_link">
          <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M28.2 15.3125C28.2 14.3375 28.1125 13.4 27.95 12.5H15V17.8188H22.4C22.0813 19.5375 21.1125 20.9938 19.6563 21.9688V25.4187H24.1C26.7 23.025 28.2 19.5 28.2 15.3125Z" fill="black"/>
            <path d="M15.0004 28.75C18.7129 28.75 21.8254 27.5188 24.1004 25.4188L19.6566 21.9688C18.4254 22.7938 16.8504 23.2813 15.0004 23.2813C11.4191 23.2813 8.38789 20.8625 7.30664 17.6125H2.71289V21.175C4.97539 25.6688 9.62539 28.75 15.0004 28.75Z" fill="black"/>
            <path d="M7.30625 17.6125C7.03125 16.7875 6.875 15.9062 6.875 15C6.875 14.0937 7.03125 13.2125 7.30625 12.3875V8.82495H2.7125C1.75 10.741 1.24915 12.8557 1.25 15C1.25 17.2187 1.78125 19.3187 2.7125 21.175L7.30625 17.6125Z" fill="black"/>
            <path d="M15.0004 6.71875C17.0191 6.71875 18.8316 7.4125 20.2566 8.775L24.2004 4.83125C21.8191 2.6125 18.7066 1.25 15.0004 1.25C9.62539 1.25 4.97539 4.33125 2.71289 8.825L7.30664 12.3875C8.38789 9.1375 11.4191 6.71875 15.0004 6.71875Z" fill="black"/>
          </svg>
        </a>
      </div>
      <p class="no-account-yet">Нет аккаунта?</p>
      <button type="button" class="popup__button popup__button-register">Зарегистрироваться</button>
    </form>

    `
  )
}

function registerPopup() {
  return (
    `
    <form class="popup__register" name="popup__register">
      <label class='form-label'><input class='popup__input' name="username" type="text" placeholder="Имя пользователя" /><div class='form-error'><div><p class='form-error_message'></p></div></div></label>
      <label class='form-label'><input class='popup__input' name="email" type="email" placeholder="Электронная почта" /><div class='form-error'><div><p class='form-error_message'></p></div></div></label>
      <label class='form-label'><input class='popup__input' name="password" type="password" placeholder="Пароль" /><div class='form-error'><div><p class='form-error_message'></p></div></div></label>
      <label class='form-label'><input class='popup__input' name="password2" type="password" placeholder='Повторить пароль' /><div class='form-error'><div><p class='form-error_message'></p></div></div></label>
      <div class="popup__check">
        <input type="checkbox" name="accept_terms" id="accept_terms" ></input>
        <span class="popup__check_text">Я принимаю условия <a>пользовательского соглашения</a></span>
      </div>
      <div class="popup-recaptcha">
        <div class="g-recaptcha" data-sitekey="6LcQ4VgpAAAAAIB4_vqPGiezzBMek9n30gUqXF3Q" data-callback='getRecaptcha'></div>
      </div>
      <input type="submit" value="Зарегистрироваться" class="popup__input_green popup__input_register"></input>
      <p class="login-using">Зарегистрироваться с помощью</p>
      <div class="popup_links">
        <a href="" class="popup_link">
          <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g clipPath="url(#clip0_924_1247)">
              <path d="M8.19835 29.1946C7.57851 28.9933 6.95868 28.5906 6.54545 27.7852C6.13223 27.3825 5.71901 26.7785 5.09917 25.9732C4.27273 24.7651 3.44628 23.1544 2.82645 21.5436C2.20661 19.7315 2 17.9195 2 16.1074C2 14.094 2.41322 12.4832 3.23967 11.0738C3.8595 9.86577 4.89256 9.0604 5.92562 8.25503C6.95868 7.65101 8.19835 7.24832 9.43801 7.24832C9.85124 7.24832 10.2645 7.24832 10.8843 7.44966C11.2975 7.44966 11.7107 7.65101 12.3306 7.85235C12.9504 8.05369 13.3636 8.25503 13.5702 8.25503C13.9835 8.45638 14.3967 8.45638 14.6033 8.45638C14.8099 8.45638 15.0165 8.45638 15.4298 8.25503C15.6364 8.25503 16.0496 8.05369 16.4628 7.85235C16.876 7.65101 17.2893 7.44966 17.7025 7.44966C18.1157 7.44966 18.5289 7.24832 18.9421 7.24832C19.3554 7.24832 19.9752 7.04698 20.3884 7.24832C21.2149 7.24832 22.0413 7.44966 22.8678 7.85235C24.1074 8.25503 25.1405 9.26175 25.9669 10.2685C25.7603 10.2685 25.3471 10.4698 25.1405 10.8725C24.5207 11.4765 23.9008 12.0805 23.4876 12.6846C23.0744 13.6913 22.6612 14.698 22.6612 15.906C22.6612 17.3154 23.0744 18.5235 23.6942 19.5302C24.1074 20.3356 24.9339 20.9396 25.5537 21.3423C26.1735 21.5436 26.5868 21.745 26.7934 21.9463C26.7934 22.349 26.5868 22.953 26.3802 23.1544C25.9669 24.3624 25.3471 25.1678 24.7273 26.1745C24.1074 26.9799 23.6942 27.5839 23.4876 27.7852C22.8678 28.3893 22.4545 28.9933 21.8347 29.1946C21.4215 29.5973 20.8016 29.7987 19.9752 29.7987C19.562 29.7987 19.1488 29.7987 18.7355 29.5973C18.5289 29.5973 18.1157 29.396 17.7025 29.1946C17.0826 28.9933 16.876 28.7919 16.4628 28.7919C16.0496 28.5906 15.4298 28.5906 15.0165 28.5906C14.6033 28.5906 13.9835 28.5906 13.5702 28.7919C13.157 28.7919 12.7438 28.9933 12.3306 29.1946C11.7107 29.396 11.5041 29.5973 11.2975 29.5973C10.8843 29.7987 10.4711 29.7987 10.0578 29.7987C9.43802 29.7987 8.81818 29.5973 8.19835 29.1946ZM16.876 6.24161C16.0496 6.64429 15.2231 6.84564 14.3967 6.84564C14.1901 6.04027 14.3967 5.2349 14.8099 4.22819C15.2231 3.42282 15.4298 2.81879 16.0496 2.21476C16.6694 1.61074 17.2893 1.00671 18.1157 0.604027C18.9421 0.201343 19.7686 0 20.595 0C20.595 0.805369 20.3884 1.61074 20.1818 2.61745C19.9752 3.42282 19.3554 4.02685 18.9421 4.63087C18.3223 5.43624 17.7025 5.83893 16.876 6.24161Z" fill="black"/>
            </g>
            <defs>
              <clipPath id="clip0_924_1247">
                <rect width="25" height="30" fill="white" transform="translate(2)"/>
              </clipPath>
            </defs>
          </svg>
        </a>
        <a href="" class="popup_link">
          <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g clipPath="url(#clip0_924_1241)">
              <path d="M30 15C30 6.7157 23.2843 -2.67029e-05 15 -2.67029e-05C6.71572 -2.67029e-05 0 6.7157 0 15C0 22.4869 5.48528 28.6925 12.6562 29.8177V19.3359H8.84766V15H12.6562V11.6953C12.6562 7.93591 14.8956 5.85935 18.322 5.85935C19.9631 5.85935 21.6797 6.15232 21.6797 6.15232V9.84372H19.7882C17.9249 9.84372 17.3438 11 17.3438 12.1862V15H21.5039L20.8389 19.3359H17.3438V29.8177C24.5147 28.6925 30 22.4869 30 15Z" fill="white"/>
              <path d="M20.8389 19.3359L21.5039 15H17.3438V12.1862C17.3438 11 17.9249 9.84375 19.7882 9.84375H21.6797V6.15234C21.6797 6.15234 19.9631 5.85938 18.322 5.85938C14.8956 5.85938 12.6563 7.93594 12.6563 11.6953V15H8.84766V19.3359H12.6563V29.8178C13.4199 29.9376 14.2027 30 15 30C15.7973 30 16.5801 29.9376 17.3438 29.8178V19.3359H20.8389Z" fill="black"/>
            </g>
            <defs>
              <clipPath id="clip0_924_1241">
                <rect width="30" height="30" fill="white"/>
              </clipPath>
            </defs>
          </svg>
        </a>
        <a href="" class="popup_link">
          <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M28.2 15.3125C28.2 14.3375 28.1125 13.4 27.95 12.5H15V17.8188H22.4C22.0813 19.5375 21.1125 20.9938 19.6563 21.9688V25.4187H24.1C26.7 23.025 28.2 19.5 28.2 15.3125Z" fill="black"/>
            <path d="M15.0004 28.75C18.7129 28.75 21.8254 27.5188 24.1004 25.4188L19.6566 21.9688C18.4254 22.7938 16.8504 23.2813 15.0004 23.2813C11.4191 23.2813 8.38789 20.8625 7.30664 17.6125H2.71289V21.175C4.97539 25.6688 9.62539 28.75 15.0004 28.75Z" fill="black"/>
            <path d="M7.30625 17.6125C7.03125 16.7875 6.875 15.9062 6.875 15C6.875 14.0937 7.03125 13.2125 7.30625 12.3875V8.82495H2.7125C1.75 10.741 1.24915 12.8557 1.25 15C1.25 17.2187 1.78125 19.3187 2.7125 21.175L7.30625 17.6125Z" fill="black"/>
            <path d="M15.0004 6.71875C17.0191 6.71875 18.8316 7.4125 20.2566 8.775L24.2004 4.83125C21.8191 2.6125 18.7066 1.25 15.0004 1.25C9.62539 1.25 4.97539 4.33125 2.71289 8.825L7.30664 12.3875C8.38789 9.1375 11.4191 6.71875 15.0004 6.71875Z" fill="black"/>
          </svg>
        </a>
      </div>
      <p class="no-account-yet">Уже есть аккаунт?</p>
      <button type="button" class="popup__button popup__button-login">Войти</button>
    </form>

    `
  )
}

function recoveryPopup() {
  return (
    `
    <form class="popup__recovery" name="popup__recovery">
      <label class='form-label'><input class='popup__input' type="email" name="email" placeholder="E-mail, указанный при регистрации" /><div class='form-error'><div><p class='form-error_message'></p></div></div></label>
      <input type="submit" value="Восстановить" class="popup__input_green popup__input_restore"></input>
      <button type="button" class="popup__button popup__button_login">Войти</button>
    </form>
    
    `
  )
}

function sendPopup() {
  return (
    `
      <div class='popup__send'>
        <p>Пожалуйста, проверьте свою электронную почту и нажмите на ссылку подтверждения, чтобы перейти к восстановлению пароля.</p>
        <p>Если письмо не пришло, проверьте папку спам</p>
      </div>

    `
  )
}



/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
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
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
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
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _index_scss__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./index.scss */ "./src/index.scss");
/* harmony import */ var _components_headerButton__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./components/headerButton */ "./src/components/headerButton.js");
/* harmony import */ var _components_popup__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./components/popup */ "./src/components/popup.js");




const popup = document.querySelector('#popup'),
  headerButton = document.querySelector('#header-button'),
  headerBurger = document.querySelector('.header__burger'),
  menu = document.querySelector('.menu'),

  body = document.querySelector('body')

headerBurger.addEventListener('click', ()=>{
  menu.classList.toggle('side')
  menu.classList.toggle('active')
  body.style.overflow = 'hidden'
})

menu.addEventListener('click', (e)=> {
  if(document.querySelector('.menu.side.active')){
    if(e.target.className === 'menu side active'){
      menu.classList.toggle('side')
      menu.classList.toggle('active')
      const body = document.querySelector('body')
      body.style.overflow = 'auto'
    }
  }
})


;(0,_components_headerButton__WEBPACK_IMPORTED_MODULE_1__.HeaderButton)().then((html) => headerButton.innerHTML = html).then(() => (0,_components_headerButton__WEBPACK_IMPORTED_MODULE_1__.HeaderAfterRender)())
;(0,_components_popup__WEBPACK_IMPORTED_MODULE_2__.Popup)().then((html) => popup.innerHTML = html).then(() => (0,_components_popup__WEBPACK_IMPORTED_MODULE_2__.PopupAfterRender)())
})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaGVhZGVyLmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBQUE7Ozs7Ozs7Ozs7Ozs7Ozs7QUNBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esc0NBQXNDLE9BQU87QUFDN0M7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG9DQUFvQyxLQUFLO0FBQ3pDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ087QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0wsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsNEJBQTRCLEtBQUs7QUFDakM7QUFDQSxNQUFNO0FBQ04sNEJBQTRCLEtBQUs7QUFDakMsOEJBQThCLEVBQUU7QUFDaEM7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7OztBQ2pGNEU7QUFDNUU7QUFDTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsUUFBUTtBQUNSLFFBQVE7QUFDUixRQUFRO0FBQ1IsUUFBUTtBQUNSO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esd0JBQXdCO0FBQ3hCLHVCQUF1QjtBQUN2Qix1QkFBdUI7QUFDdkI7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxtQ0FBbUMsYUFBYTtBQUNoRDtBQUNBO0FBQ0E7QUFDQSxtQkFBbUIsMEZBQTBGO0FBQzdHO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBLFVBQVU7QUFDVjtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0EsT0FBTztBQUNQLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBTSx1RUFBWSw0REFBNEQsMkVBQWlCO0FBQy9GO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsWUFBWSw2QkFBNkIscUNBQXFDO0FBQzlFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDRCQUE0QixLQUFLO0FBQ2pDO0FBQ0EsTUFBTTtBQUNOLDRCQUE0QixLQUFLO0FBQ2pDLDhCQUE4QixFQUFFO0FBQ2hDO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBLDRCQUE0QixLQUFLO0FBQ2pDO0FBQ0EsTUFBTTtBQUNOLDRCQUE0QixLQUFLO0FBQ2pDLDhCQUE4QixFQUFFO0FBQ2hDO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBLDRCQUE0QixLQUFLO0FBQ2pDO0FBQ0EsTUFBTTtBQUNOLDRCQUE0QixLQUFLO0FBQ2pDLDhCQUE4QixFQUFFO0FBQ2hDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7VUNuWEE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTs7VUFFQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTs7Ozs7V0N0QkE7V0FDQTtXQUNBO1dBQ0E7V0FDQSx5Q0FBeUMsd0NBQXdDO1dBQ2pGO1dBQ0E7V0FDQTs7Ozs7V0NQQTs7Ozs7V0NBQTtXQUNBO1dBQ0E7V0FDQSx1REFBdUQsaUJBQWlCO1dBQ3hFO1dBQ0EsZ0RBQWdELGFBQWE7V0FDN0Q7Ozs7Ozs7Ozs7Ozs7O0FDTnFCO0FBQ3NEO0FBQ2Y7QUFDNUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNEO0FBQ0E7QUFDQSx1RUFBWSw0REFBNEQsMkVBQWlCO0FBQ3pGLHlEQUFLLHFEQUFxRCxtRUFBZ0IsRyIsInNvdXJjZXMiOlsid2VicGFjazovL2hlYWRlcl9mb290ZXIvLi9zcmMvaW5kZXguc2Nzcz9hNWRlIiwid2VicGFjazovL2hlYWRlcl9mb290ZXIvLi9zcmMvY29tcG9uZW50cy9oZWFkZXJCdXR0b24uanMiLCJ3ZWJwYWNrOi8vaGVhZGVyX2Zvb3Rlci8uL3NyYy9jb21wb25lbnRzL3BvcHVwLmpzIiwid2VicGFjazovL2hlYWRlcl9mb290ZXIvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vaGVhZGVyX2Zvb3Rlci93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vaGVhZGVyX2Zvb3Rlci93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL2hlYWRlcl9mb290ZXIvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9oZWFkZXJfZm9vdGVyLy4vc3JjL2luZGV4LmpzIl0sInNvdXJjZXNDb250ZW50IjpbIi8vIGV4dHJhY3RlZCBieSBtaW5pLWNzcy1leHRyYWN0LXBsdWdpblxuZXhwb3J0IHt9OyIsImV4cG9ydCBhc3luYyBmdW5jdGlvbiBIZWFkZXJCdXR0b24oKSB7XHJcbiAgbGV0IHVzZXIgPSAnJyxcclxuICAgIG5vdXNlciA9ICcnXHJcbiAgY29uc3QgZGF0YSA9IGxvY2FsU3RvcmFnZS5nZXRJdGVtKCd1c2VybmFtZScpO1xyXG4gIGRhdGE/IHVzZXIgPSAnYWN0aXZlJyA6IG5vdXNlciA9ICdhY3RpdmUnXHJcbiAgICBcclxuICByZXR1cm4gKFxyXG4gICAgYFxyXG4gICAgICA8YnV0dG9uIGNsYXNzPSdidXR0b25fX2xvZy1pbiAke25vdXNlcn0nPlxyXG4gICAgICAgIDxkaXYgY2xhc3M9XCJidXR0b25fX2lubmVyXCI+XHJcbiAgICAgICAgICA8aW1nIHNyYz1cIi9zdGF0aWMvaW1nL3VzZXIuc3ZnXCIgYWx0PVwiXCIgY2xhc3M9XCJ1c2VyLXN2Z1wiPjwvaW1nPlxyXG4gICAgICAgICAgPHNwYW4gY2xhc3M9XCJoZWFkZXJfbG9nLWluXCI+0JLRhdC+0LQ8L3NwYW4+XHJcbiAgICAgICAgPC9kaXY+XHJcbiAgICAgIDwvYnV0dG9uPlxyXG4gICAgICA8YnV0dG9uIGNsYXNzPSdoZWFkZXJfX3VzZXIgJHt1c2VyfSc+VTwvYnV0dG9uPlxyXG4gICAgICA8ZGl2IGNsYXNzPSdoZWFkZXJfX2xvZ291dCc+XHJcbiAgICAgICAgPGJ1dHRvbiBjbGFzcz0naGVhZGVyX19sb2dvdXRfX2J0bic+0JLRi9C50YLQuDwvYnV0dG9uPlxyXG4gICAgICA8L2Rpdj5cclxuICAgIGBcclxuICApXHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBIZWFkZXJBZnRlclJlbmRlcigpe1xyXG4gIFxyXG4gIGNvbnN0IGxvZ2luQnRuID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmJ1dHRvbl9fbG9nLWluJyksXHJcbiAgICB1c2VyQnRuID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmhlYWRlcl9fdXNlcicpLFxyXG4gICAgbG9nb3V0QnRuID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmhlYWRlcl9fbG9nb3V0X19idG4nKVxyXG4gICAgXHJcbiAgXHJcbiAgbG9naW5CdG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZSkgPT4ge1xyXG4gICAgY29uc3QgYm9keSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2JvZHknKSxcclxuICAgICAgcG9wdXAgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucG9wdXAnKVxyXG5cclxuICAgIHBvcHVwLmNsYXNzTGlzdC50b2dnbGUoJ2FjdGl2ZScpXHJcbiAgICBib2R5LnN0eWxlLm92ZXJmbG93ID0gJ2hpZGRlbidcclxuXHJcbiAgICBzZXRDbG9zZUJ1dHRvbigpXHJcblxyXG4gIH0pXHJcbiAgXHJcbiAgbG9nb3V0QnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCk9PntcclxuICAgIGZldGNoKCdodHRwOi8vMTI3LjAuMC4xOjgwMDAvYXBpL3YxL3Byb2ZpbGUvbG9nb3V0LycpXHJcbiAgICAudGhlbigocmVzcG9uc2UpID0+IHtcclxuICAgICAgcmV0dXJuIHJlc3BvbnNlLmpzb24oKTtcclxuICAgIH0pXHJcbiAgICAudGhlbigoZGF0YSkgPT4ge1xyXG4gICAgICBpZiAoJ3N1Y2Nlc3MnIGluIGRhdGEpIHtcclxuICAgICAgICBsZXQgbG9nb3V0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmhlYWRlcl9fbG9nb3V0JylcclxuICAgICAgICBsb2dvdXQuY2xhc3NMaXN0LnRvZ2dsZSgnYWN0aXZlJylcclxuXHJcbiAgICAgICAgbG9jYWxTdG9yYWdlLnJlbW92ZUl0ZW0oJ3VzZXJuYW1lJylcclxuXHJcbiAgICAgICAgY29uc3Qgbm9uYW1lID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmJ1dHRvbl9fbG9nLWluJyksXHJcbiAgICAgICAgICAgIHVzZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuaGVhZGVyX191c2VyJylcclxuICAgICAgICB1c2VyLmNsYXNzTGlzdC50b2dnbGUoJ2FjdGl2ZScpXHJcbiAgICAgICAgbm9uYW1lLmNsYXNzTGlzdC50b2dnbGUoJ2FjdGl2ZScpXHJcbiAgICAgIH1cclxuICAgIH0pXHJcbiAgfSlcclxuICAgIFxyXG4gIHVzZXJCdG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKT0+e1xyXG4gICAgY29uc3QgdXNlck1lbnUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuaGVhZGVyX19sb2dvdXQnKVxyXG4gICAgdXNlck1lbnUuY2xhc3NMaXN0LnRvZ2dsZSgnYWN0aXZlJylcclxuICB9KVxyXG59XHJcblxyXG5mdW5jdGlvbiBzZXRDbG9zZUJ1dHRvbigpe1xyXG4gIGxldCB5ID0gMFxyXG4gIGNvbnN0IGNsb3NlcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5jbG9zZScpXHJcbiAgXHJcbiAgaWYoZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnBvcHVwX19sb2ctaW4uYWN0aXZlJykpe1xyXG4gICAgeSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5wb3B1cF9fbG9nLWluLmFjdGl2ZScpLm9mZnNldFRvcFxyXG4gICAgaWYoIHdpbmRvdy5pbm5lcldpZHRoIDwgNDgxKXtcclxuICAgICAgY29uc29sZS5sb2cod2luZG93LmlubmVyV2lkdGgpXHJcbiAgICAgIGNsb3Nlcy5zdHlsZS50b3AgPSBgJHt5LTUwfXB4YFxyXG4gICAgICBjbG9zZXMuc3R5bGUucmlnaHQgPSBgMThweGBcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGNsb3Nlcy5zdHlsZS50b3AgPSBgJHt5LTUwfXB4YFxyXG4gICAgICBjbG9zZXMuc3R5bGUucmlnaHQgPSBgJHt5fXB4YFxyXG4gICAgfVxyXG4gIH1cclxufVxyXG4iLCJpbXBvcnQgeyBIZWFkZXJCdXR0b24sIEhlYWRlckFmdGVyUmVuZGVyIH0gZnJvbSAnLi4vY29tcG9uZW50cy9oZWFkZXJCdXR0b24nXHJcblxyXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gUG9wdXAoKSB7XHJcblxyXG4gIHJldHVybiAoXHJcbiAgICBgXHJcbiAgICA8ZGl2IGNsYXNzPVwicG9wdXBfX2NvbnRhaW5lclwiPlxyXG4gICAgICA8ZGl2IGNsYXNzPVwiY2xvc2VcIj5cclxuICAgICAgICA8c3ZnIHdpZHRoPVwiNTBcIiBoZWlnaHQ9XCI1MFwiIHZpZXdCb3g9XCIwIDAgNTAgNTBcIiBmaWxsPVwibm9uZVwiIHhtbG5zPVwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIj5cclxuICAgICAgICAgIDxwYXRoIGQ9XCJNMTQuNTgzIDE0LjU4MzRMMzUuNDE2MyAzNS40MTY3TTE0LjU4MyAzNS40MTY3TDM1LjQxNjMgMTQuNTgzNFwiIHN0cm9rZT1cImJsYWNrXCIgc3Ryb2tlLWxpbmVjYXA9XCJyb3VuZFwiIHN0cm9rZS1saW5lam9pbj1cInJvdW5kXCIvPlxyXG4gICAgICAgICAgPHBhdGggZD1cIk0xNC41ODMgMTQuNTgzNEwzNS40MTYzIDM1LjQxNjdNMTQuNTgzIDM1LjQxNjdMMzUuNDE2MyAxNC41ODM0XCIgc3Ryb2tlPVwiYmxhY2tcIiBzdHJva2Utb3BhY2l0eT1cIjAuMlwiIHN0cm9rZS1saW5lY2FwPVwicm91bmRcIiBzdHJva2UtbGluZWpvaW49XCJyb3VuZFwiLz5cclxuICAgICAgICA8L3N2Zz5cclxuICAgICAgPC9kaXY+XHJcbiAgICAgICR7bG9naW5Qb3B1cCgpfVxyXG4gICAgICAke3JlZ2lzdGVyUG9wdXAoKX1cclxuICAgICAgJHtyZWNvdmVyeVBvcHVwKCl9XHJcbiAgICAgICR7c2VuZFBvcHVwKCl9XHJcbiAgICA8L2Rpdj5cclxuICAgIFxyXG4gICAgYFxyXG4gIClcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIFBvcHVwQWZ0ZXJSZW5kZXIoKXtcclxuICBjb25zdCBsb2dpbkJ0biA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5wb3B1cF9faW5wdXRfbG9naW4nKSxcclxuICAgIHJlZ2lzdGVyQnRuID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnBvcHVwX19pbnB1dF9yZWdpc3RlcicpLFxyXG4gICAgcmVzdG9yZVBhc3N3b3JkID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnBvcHVwX19pbnB1dF9yZXN0b3JlJyksXHJcbiAgICBzZXRMb2dpbkJ0biA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5wb3B1cF9fYnV0dG9uLWxvZ2luJyksXHJcbiAgICBzZXRSZWdpc3RlckJ0biA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5wb3B1cF9fYnV0dG9uLXJlZ2lzdGVyJyksXHJcbiAgICBmb2dyb3RCdG4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuZm9yZ290LXBhc3N3b3JkX2J0bicpLFxyXG4gICAgcmV0dXJuTG9naW5CdG4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucG9wdXBfX2J1dHRvbl9sb2dpbicpLFxyXG4gICAgY2xvc2UgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuY2xvc2UnKSxcclxuICAgIHBvcHVwID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnBvcHVwJyksXHJcblxyXG4gICAgbG9naW4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucG9wdXBfX2xvZy1pbicpLFxyXG4gICAgcmVnaXN0ZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucG9wdXBfX3JlZ2lzdGVyJyksXHJcbiAgICByZWNvdmVyeSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5wb3B1cF9fcmVjb3ZlcnknKSxcclxuICAgIHNlbmQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucG9wdXBfX3NlbmQnKVxyXG5cclxuICAgIHNldFJlZ2lzdGVyQnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCk9PntcclxuICAgICAgbG9naW4uY2xhc3NMaXN0LnRvZ2dsZSgnYWN0aXZlJylcclxuICAgICAgcmVnaXN0ZXIuY2xhc3NMaXN0LnRvZ2dsZSgnYWN0aXZlJylcclxuICAgICAgc2V0Q2xvc2VCdXR0b24oKVxyXG4gICAgfSlcclxuXHJcbiAgICBjbG9zZS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpPT4ge1xyXG4gICAgICBjb25zdCByZWdBY3RpdmUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucG9wdXBfX3JlZ2lzdGVyLmFjdGl2ZScpLFxyXG4gICAgICAgIGxvZ0FjdGl2ZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5wb3B1cF9fbG9nLWluLmFjdGl2ZScpLFxyXG4gICAgICAgIHJlY0FjdGl2ZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5wb3B1cF9fcmVjb3ZlcnkuYWN0aXZlJyksXHJcbiAgICAgICAgYm9keSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2JvZHknKVxyXG4gICAgICAgIGJvZHkuc3R5bGUub3ZlcmZsb3cgPSAnYXV0bydcclxuICAgICAgICBwb3B1cC5jbGFzc0xpc3QudG9nZ2xlKCdhY3RpdmUnKVxyXG5cclxuICAgICAgICBpZiAoIWxvZ0FjdGl2ZSl7bG9naW4uY2xhc3NMaXN0LnRvZ2dsZSgnYWN0aXZlJyl9XHJcbiAgICAgICAgaWYgKHJlY0FjdGl2ZSl7cmVjb3ZlcnkuY2xhc3NMaXN0LnRvZ2dsZSgnYWN0aXZlJyl9XHJcbiAgICAgICAgaWYgKHJlZ0FjdGl2ZSl7cmVnaXN0ZXIuY2xhc3NMaXN0LnRvZ2dsZSgnYWN0aXZlJyl9XHJcblxyXG4gICAgfSlcclxuXHJcbiAgICBzZXRMb2dpbkJ0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpPT57XHJcbiAgICAgIGxvZ2luLmNsYXNzTGlzdC50b2dnbGUoJ2FjdGl2ZScpXHJcbiAgICAgIHJlZ2lzdGVyLmNsYXNzTGlzdC50b2dnbGUoJ2FjdGl2ZScpXHJcbiAgICAgIHNldENsb3NlQnV0dG9uKClcclxuICAgIH0pXHJcblxyXG4gICAgcmV0dXJuTG9naW5CdG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKT0+e1xyXG4gICAgICBsb2dpbi5jbGFzc0xpc3QudG9nZ2xlKCdhY3RpdmUnKVxyXG4gICAgICByZWNvdmVyeS5jbGFzc0xpc3QudG9nZ2xlKCdhY3RpdmUnKVxyXG4gICAgICBzZXRDbG9zZUJ1dHRvbigpXHJcbiAgICB9KVxyXG5cclxuICAgIGZvZ3JvdEJ0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpPT57XHJcbiAgICAgIGxvZ2luLmNsYXNzTGlzdC50b2dnbGUoJ2FjdGl2ZScpXHJcbiAgICAgIHJlY292ZXJ5LmNsYXNzTGlzdC50b2dnbGUoJ2FjdGl2ZScpXHJcbiAgICAgIHNldENsb3NlQnV0dG9uKClcclxuICAgIH0pXHJcblxyXG4gICAgcmVzdG9yZVBhc3N3b3JkLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGUpPT57XHJcbiAgICAgIGUucHJldmVudERlZmF1bHQoKVxyXG4gICAgICBjb25zdCBmb3JtID0gZG9jdW1lbnQuZm9ybXMucG9wdXBfX3JlY292ZXJ5LFxyXG4gICAgICAgIGVtYWlsID0gZm9ybS5lbGVtZW50cy5lbWFpbC52YWx1ZVxyXG5cclxuICAgICAgY29uc3QgY3NyZnRva2VuID0gZ2V0Q29va2llKCdjc3JmdG9rZW4nKVxyXG4gICAgICBjb25zdCBib2R5ID0gSlNPTi5zdHJpbmdpZnkoe2VtYWlsOiBlbWFpbH0pXHJcblxyXG4gICAgICBmZXRjaChgaHR0cDovLzEyNy4wLjAuMTo4MDAwL2FwaS92MS9wcm9maWxlL2VtYWlsLWNoZWNrL2AsIHtcclxuICAgICAgICBtZXRob2Q6ICdQT1NUJyxcclxuICAgICAgICBoZWFkZXJzOiB7IEFjY2VwdDogJ2FwcGxpY2F0aW9uL2pzb24nLCAnQ29udGVudC1UeXBlJzogJ2FwcGxpY2F0aW9uL2pzb24nLCAnWC1DU1JGVG9rZW4nOiBjc3JmdG9rZW4sfSxcclxuICAgICAgICBib2R5XHJcbiAgICAgIH0pLnRoZW4oKHJlc3BvbnNlKSA9PiB7XHJcbiAgICAgICAgaWYgKHJlc3BvbnNlLnN0YXR1cyA9PSAyMDEpe1xyXG4gICAgICAgICAgcmVjb3ZlcnkuY2xhc3NMaXN0LnRvZ2dsZSgnYWN0aXZlJylcclxuICAgICAgICAgIHNlbmQuY2xhc3NMaXN0LnRvZ2dsZSgnYWN0aXZlJylcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgcmV0dXJuIHJlc3BvbnNlLmpzb24oKVxyXG4gICAgICAgIH1cclxuICAgICAgfSkudGhlbigoZGF0YSkgPT4ge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKGRhdGEpXHJcbiAgICAgIH0pXHJcbiAgICB9KVxyXG5cclxuICAgIHJlZ2lzdGVyQnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGUpPT57XHJcbiAgICAgICAgICAgIFxyXG4gICAgICBlLnByZXZlbnREZWZhdWx0KClcclxuICAgICAgY29uc3QgZm9ybSA9IGRvY3VtZW50LmZvcm1zLnBvcHVwX19yZWdpc3RlcixcclxuICAgICAgICB1c2VybmFtZSA9IGZvcm0uZWxlbWVudHMudXNlcm5hbWUudmFsdWUsXHJcbiAgICAgICAgZW1haWwgPSBmb3JtLmVsZW1lbnRzLmVtYWlsLnZhbHVlLFxyXG4gICAgICAgIHBhc3N3b3JkID0gZm9ybS5lbGVtZW50cy5wYXNzd29yZC52YWx1ZSxcclxuICAgICAgICBwYXNzd29yZDIgPSBmb3JtLmVsZW1lbnRzLnBhc3N3b3JkMi52YWx1ZSxcclxuICAgICAgICBhY2NlcHRfdGVybXMgPSBmb3JtLmVsZW1lbnRzLmFjY2VwdF90ZXJtcy52YWx1ZSxcclxuICAgICAgICByZWNhcHRjaGEgPSBsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnY2FwdGNoYScpXHJcblxyXG5cclxuICAgICAgY29uc3QgZGF0YSA9IHtcclxuICAgICAgICAgICd1c2VybmFtZSc6IHVzZXJuYW1lLFxyXG4gICAgICAgICAgJ2VtYWlsJzogZW1haWwsXHJcbiAgICAgICAgICAncGFzc3dvcmQnOiBwYXNzd29yZCxcclxuICAgICAgICAgICdwYXNzd29yZDInOiBwYXNzd29yZDIsXHJcbiAgICAgICAgICAnYWNjZXB0X3Rlcm1zJzogYWNjZXB0X3Rlcm1zLFxyXG4gICAgICAgICAgJ3JlY2FwdGNoYSc6IHJlY2FwdGNoYVxyXG4gICAgICB9XHJcblxyXG4gICAgICBhdXRoKGRhdGEpXHJcbiAgICB9KVxyXG5cclxuICAgIGxvZ2luQnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGUpID0+IHtcclxuICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpXHJcbiAgICAgIGNvbnN0IGZvcm0gPSBkb2N1bWVudC5mb3Jtcy5wb3B1cF9fbG9naW5cclxuICAgICAgY29uc3QgdXNlcm5hbWUgPSBmb3JtLmVsZW1lbnRzLnVzZXJuYW1lLnZhbHVlXHJcbiAgICAgIGNvbnN0IHBhc3N3b3JkID0gZm9ybS5lbGVtZW50cy5wYXNzd29yZC52YWx1ZVxyXG4gICAgICBjb25zdCBkYXRhID0ge1xyXG4gICAgICAgICAgJ3VzZXJuYW1lJzogdXNlcm5hbWUsXHJcbiAgICAgICAgICAncGFzc3dvcmQnOiBwYXNzd29yZCxcclxuICAgICAgfVxyXG5cclxuICAgICAgYXV0aChkYXRhKVxyXG4gIH0pXHJcbn1cclxuXHJcbmZ1bmN0aW9uIGF1dGgoZGF0YSl7XHJcbiAgbGV0IHVybCA9IG51bGxcclxuICAncGFzc3dvcmQyJyBpbiBkYXRhID8gdXJsID0gYGh0dHA6Ly8xMjcuMC4wLjE6ODAwMC9hcGkvdjEvcHJvZmlsZS9yZWdpc3Rlci9gOiB1cmwgPSBgaHR0cDovLzEyNy4wLjAuMTo4MDAwL2FwaS92MS9wcm9maWxlL2xvZ2luL2BcclxuICBjb25zdCBjc3JmdG9rZW4gPSBnZXRDb29raWUoJ2NzcmZ0b2tlbicpXHJcbiAgZGF0YVsnY3NyZnRva2VuJ10gPSBjc3JmdG9rZW5cclxuICBhc3luYyBmdW5jdGlvbiBwb3N0RGF0YSh1cmwsIGRhdGEpIHtcclxuICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZmV0Y2godXJsLCB7XHJcbiAgICAgIG1ldGhvZDogXCJQT1NUXCIsXHJcbiAgICAgIGhlYWRlcnM6IHtcclxuICAgICAgICAgIFwiQ29udGVudC1UeXBlXCI6IFwiYXBwbGljYXRpb24vanNvblwiLFxyXG4gICAgICAgICAgJ1gtQ1NSRlRva2VuJzogY3NyZnRva2VuLFxyXG4gICAgICB9LFxyXG4gICAgICBib2R5OiBKU09OLnN0cmluZ2lmeShkYXRhKSxcclxuICAgIH0pO1xyXG4gICAgaWYgKHJlc3BvbnNlLnN0YXR1cyA9PSAyMDEpIHtcclxuICAgICAgY29uc3QgcG9wdXAgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucG9wdXAnKSxcclxuICAgICAgICBib2R5ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignYm9keScpLFxyXG4gICAgICAgIGxvZ2luID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnBvcHVwX19sb2ctaW4nKSxcclxuICAgICAgICByZWdpc3RlciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5wb3B1cF9fcmVnaXN0ZXInKVxyXG4gICAgXHJcbiAgICAgIHBvcHVwLmNsYXNzTGlzdC50b2dnbGUoJ2FjdGl2ZScpXHJcbiAgICAgIGxvZ2luLmNsYXNzTGlzdC50b2dnbGUoJ2FjdGl2ZScpXHJcbiAgICAgIHJlZ2lzdGVyLmNsYXNzTGlzdC50b2dnbGUoJ2FjdGl2ZScpXHJcblxyXG4gICAgICBib2R5LnN0eWxlLm92ZXJmbG93ID0gJ2F1dG8nXHJcblxyXG4gICAgICByZXR1cm4gbG9jYXRpb24uaHJlZiA9ICdodHRwOi8vMTI3LjAuMC4xOjgwMDAvYXBpL3YxL3Byb2ZpbGUvZW1haWwtY29uZmlybWF0aW9uLXNlbnQvJ1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIGF3YWl0IHJlc3BvbnNlLmpzb24oKTtcclxuICB9XHJcbiAgXHJcbiAgcG9zdERhdGEodXJsLCBkYXRhKS50aGVuKChkYXRhKSA9PiB7XHJcblxyXG4gICAgaWYgKCdzdWNjZXNzJyBpbiBkYXRhKSB7XHJcbiAgICAgIGNvbnN0IHBvcHVwID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnBvcHVwJylcclxuICAgICAgcG9wdXAuY2xhc3NMaXN0LnRvZ2dsZSgnYWN0aXZlJylcclxuXHJcbiAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCd1c2VybmFtZScsICdKb2hhbicpXHJcblxyXG4gICAgICBjb25zdCBoZWFkZXJCdXR0b24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjaGVhZGVyLWJ1dHRvbicpXHJcbiAgICAgIEhlYWRlckJ1dHRvbigpLnRoZW4oKGh0bWwpID0+IGhlYWRlckJ1dHRvbi5pbm5lckhUTUwgPSBodG1sKS50aGVuKCgpID0+IEhlYWRlckFmdGVyUmVuZGVyKCkpXHJcblxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgbGV0IGVycm9yID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgnZm9ybS1lcnJvcicpXHJcbiAgICAgIGlmICghZXJyb3JbMF0pIHtcclxuICAgICAgICAgIGNvbnN0IG5ld0Vycm9yID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgnZXJyb3InKVxyXG4gICAgICAgICAgbmV3RXJyb3JbMF0uY2xhc3NMaXN0LnRvZ2dsZSgnYWN0aXZlJylcclxuICAgICAgICAgIG5ld0Vycm9yWzFdLmNsYXNzTGlzdC50b2dnbGUoJ2FjdGl2ZScpXHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9KTtcclxufVxyXG5cclxuZnVuY3Rpb24gZ2V0Q29va2llKG5hbWUpIHtcclxuICBsZXQgbWF0Y2hlcyA9IGRvY3VtZW50LmNvb2tpZS5tYXRjaChuZXcgUmVnRXhwKFxyXG4gICAgXCIoPzpefDsgKVwiICsgbmFtZS5yZXBsYWNlKC8oW1xcLiQ/Knx7fVxcKFxcKVxcW1xcXVxcXFxcXC9cXCteXSkvZywgJ1xcXFwkMScpICsgXCI9KFteO10qKVwiXHJcbiAgKSk7XHJcbiAgcmV0dXJuIG1hdGNoZXMgPyBkZWNvZGVVUklDb21wb25lbnQobWF0Y2hlc1sxXSkgOiB1bmRlZmluZWQ7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHNldENsb3NlQnV0dG9uKCl7XHJcbiAgbGV0IHkgPSAwXHJcbiAgY29uc3QgY2xvc2VzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmNsb3NlJylcclxuICBcclxuICBpZihkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucG9wdXBfX2xvZy1pbi5hY3RpdmUnKSl7XHJcbiAgICB5ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnBvcHVwX19sb2ctaW4uYWN0aXZlJykub2Zmc2V0VG9wXHJcbiAgICBpZiggd2luZG93LmlubmVyV2lkdGggPCA0ODEpe1xyXG4gICAgICBjb25zb2xlLmxvZyh3aW5kb3cuaW5uZXJXaWR0aClcclxuICAgICAgY2xvc2VzLnN0eWxlLnRvcCA9IGAke3ktNTB9cHhgXHJcbiAgICAgIGNsb3Nlcy5zdHlsZS5yaWdodCA9IGAxOHB4YFxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgY2xvc2VzLnN0eWxlLnRvcCA9IGAke3ktNTB9cHhgXHJcbiAgICAgIGNsb3Nlcy5zdHlsZS5yaWdodCA9IGAke3l9cHhgXHJcbiAgICB9XHJcbiAgfWVsc2UgaWYoZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnBvcHVwX19yZWdpc3Rlci5hY3RpdmUnKSl7XHJcbiAgICBjb25zb2xlLmxvZyh3aW5kb3cuaW5uZXJXaWR0aClcclxuICAgIHkgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucG9wdXBfX3JlZ2lzdGVyLmFjdGl2ZScpLm9mZnNldFRvcFxyXG4gICAgaWYoIHdpbmRvdy5pbm5lcldpZHRoIDwgNDgxKXtcclxuICAgICAgY2xvc2VzLnN0eWxlLnRvcCA9IGAke3ktNTB9cHhgXHJcbiAgICAgIGNsb3Nlcy5zdHlsZS5yaWdodCA9IGAxOHB4YFxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgY2xvc2VzLnN0eWxlLnRvcCA9IGAke3ktNTB9cHhgXHJcbiAgICAgIGNsb3Nlcy5zdHlsZS5yaWdodCA9IGAke3l9cHhgXHJcbiAgICB9XHJcbiAgfWVsc2UgaWYoZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnBvcHVwX19yZWNvdmVyeS5hY3RpdmUnKSl7XHJcbiAgICBjb25zb2xlLmxvZyh3aW5kb3cuaW5uZXJXaWR0aClcclxuICAgIHkgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucG9wdXBfX3JlY292ZXJ5LmFjdGl2ZScpLm9mZnNldFRvcFxyXG4gICAgaWYoIHdpbmRvdy5pbm5lcldpZHRoIDwgNDgxKXtcclxuICAgICAgY2xvc2VzLnN0eWxlLnRvcCA9IGAke3ktNTB9cHhgXHJcbiAgICAgIGNsb3Nlcy5zdHlsZS5yaWdodCA9IGAxOHB4YFxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgY2xvc2VzLnN0eWxlLnRvcCA9IGAke3ktNTB9cHhgXHJcbiAgICAgIGNsb3Nlcy5zdHlsZS5yaWdodCA9IGAke3l9cHhgXHJcbiAgICB9XHJcbiAgfVxyXG59XHJcblxyXG5cclxuXHJcbmZ1bmN0aW9uIGxvZ2luUG9wdXAoKSB7XHJcbiAgcmV0dXJuIChcclxuICAgIGBcclxuICAgIDxmb3JtIGNsYXNzPVwicG9wdXBfX2xvZy1pbiBhY3RpdmVcIiBuYW1lPVwicG9wdXBfX2xvZ2luXCI+XHJcbiAgICAgIDxsYWJlbCBjbGFzcz0nZm9ybS1sYWJlbCc+PGlucHV0IGNsYXNzPSdwb3B1cF9faW5wdXQnIG5hbWU9XCJ1c2VybmFtZVwiIGlkPVwidXNlcm5hbWVcIiB0eXBlPVwidGV4dFwiIHBsYWNlaG9sZGVyPVwi0JjQvNGPINC/0L7Qu9GM0LfQvtCy0LDRgtC10LvRj1wiIC8+PGRpdiBjbGFzcz0nZm9ybS1lcnJvcic+PGRpdj48cCBjbGFzcz0nZm9ybS1lcnJvcl9tZXNzYWdlJz48L3A+PC9kaXY+PC9kaXY+PC9sYWJlbD5cclxuICAgICAgPGxhYmVsIGNsYXNzPSdmb3JtLWxhYmVsJz48aW5wdXQgY2xhc3M9J3BvcHVwX19pbnB1dCcgbmFtZT1cInBhc3N3b3JkXCIgdHlwZT1cInBhc3N3b3JkXCIgcGxhY2Vob2xkZXI9XCLQn9Cw0YDQvtC70YxcIiAvPjxkaXYgY2xhc3M9J2Zvcm0tZXJyb3InPjxkaXY+PHAgY2xhc3M9J2Zvcm0tZXJyb3JfbWVzc2FnZSc+PC9wPjwvZGl2PjwvZGl2PjwvbGFiZWw+XHJcbiAgICAgIDxpbnB1dCB0eXBlPVwic3VibWl0XCIgdmFsdWU9XCLQktC+0LnRgtC4XCIgY2xhc3M9XCJwb3B1cF9faW5wdXRfZ3JlZW4gcG9wdXBfX2lucHV0X2xvZ2luXCIvPlxyXG4gICAgICA8cCBjbGFzcz1cImZvcmdvdC1wYXNzd29yZFwiPtCX0LDQsdGL0LvQuCDQv9Cw0YDQvtC70Yw/IDxidXR0b24gdHlwZT0nYnV0dG9uJyBjbGFzcz1cImZvcmdvdC1wYXNzd29yZF9idG5cIj7QktC+0YHRgdGC0LDQvdC+0LLQuNGC0Ywg0L/QsNGA0L7Qu9GMPC9idXR0b24+PC9wPlxyXG4gICAgICA8cCBjbGFzcz1cImxvZ2luLXVzaW5nXCI+0JLQvtC50YLQuCDRgSDQv9C+0LzQvtGJ0YzRjjwvcD5cclxuICAgICAgPGRpdiBjbGFzcz1cInBvcHVwX2xpbmtzXCI+XHJcbiAgICAgICAgPGEgaHJlZj1cIlwiIGNsYXNzPVwicG9wdXBfbGlua1wiPlxyXG4gICAgICAgICAgPHN2ZyB3aWR0aD1cIjMwXCIgaGVpZ2h0PVwiMzBcIiB2aWV3Qm94PVwiMCAwIDMwIDMwXCIgZmlsbD1cIm5vbmVcIiB4bWxucz1cImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCI+XHJcbiAgICAgICAgICAgIDxnIGNsaXBQYXRoPVwidXJsKCNjbGlwMF85MjRfMTI0NylcIj5cclxuICAgICAgICAgICAgICA8cGF0aCBkPVwiTTguMTk4MzUgMjkuMTk0NkM3LjU3ODUxIDI4Ljk5MzMgNi45NTg2OCAyOC41OTA2IDYuNTQ1NDUgMjcuNzg1MkM2LjEzMjIzIDI3LjM4MjUgNS43MTkwMSAyNi43Nzg1IDUuMDk5MTcgMjUuOTczMkM0LjI3MjczIDI0Ljc2NTEgMy40NDYyOCAyMy4xNTQ0IDIuODI2NDUgMjEuNTQzNkMyLjIwNjYxIDE5LjczMTUgMiAxNy45MTk1IDIgMTYuMTA3NEMyIDE0LjA5NCAyLjQxMzIyIDEyLjQ4MzIgMy4yMzk2NyAxMS4wNzM4QzMuODU5NSA5Ljg2NTc3IDQuODkyNTYgOS4wNjA0IDUuOTI1NjIgOC4yNTUwM0M2Ljk1ODY4IDcuNjUxMDEgOC4xOTgzNSA3LjI0ODMyIDkuNDM4MDEgNy4yNDgzMkM5Ljg1MTI0IDcuMjQ4MzIgMTAuMjY0NSA3LjI0ODMyIDEwLjg4NDMgNy40NDk2NkMxMS4yOTc1IDcuNDQ5NjYgMTEuNzEwNyA3LjY1MTAxIDEyLjMzMDYgNy44NTIzNUMxMi45NTA0IDguMDUzNjkgMTMuMzYzNiA4LjI1NTAzIDEzLjU3MDIgOC4yNTUwM0MxMy45ODM1IDguNDU2MzggMTQuMzk2NyA4LjQ1NjM4IDE0LjYwMzMgOC40NTYzOEMxNC44MDk5IDguNDU2MzggMTUuMDE2NSA4LjQ1NjM4IDE1LjQyOTggOC4yNTUwM0MxNS42MzY0IDguMjU1MDMgMTYuMDQ5NiA4LjA1MzY5IDE2LjQ2MjggNy44NTIzNUMxNi44NzYgNy42NTEwMSAxNy4yODkzIDcuNDQ5NjYgMTcuNzAyNSA3LjQ0OTY2QzE4LjExNTcgNy40NDk2NiAxOC41Mjg5IDcuMjQ4MzIgMTguOTQyMSA3LjI0ODMyQzE5LjM1NTQgNy4yNDgzMiAxOS45NzUyIDcuMDQ2OTggMjAuMzg4NCA3LjI0ODMyQzIxLjIxNDkgNy4yNDgzMiAyMi4wNDEzIDcuNDQ5NjYgMjIuODY3OCA3Ljg1MjM1QzI0LjEwNzQgOC4yNTUwMyAyNS4xNDA1IDkuMjYxNzUgMjUuOTY2OSAxMC4yNjg1QzI1Ljc2MDMgMTAuMjY4NSAyNS4zNDcxIDEwLjQ2OTggMjUuMTQwNSAxMC44NzI1QzI0LjUyMDcgMTEuNDc2NSAyMy45MDA4IDEyLjA4MDUgMjMuNDg3NiAxMi42ODQ2QzIzLjA3NDQgMTMuNjkxMyAyMi42NjEyIDE0LjY5OCAyMi42NjEyIDE1LjkwNkMyMi42NjEyIDE3LjMxNTQgMjMuMDc0NCAxOC41MjM1IDIzLjY5NDIgMTkuNTMwMkMyNC4xMDc0IDIwLjMzNTYgMjQuOTMzOSAyMC45Mzk2IDI1LjU1MzcgMjEuMzQyM0MyNi4xNzM1IDIxLjU0MzYgMjYuNTg2OCAyMS43NDUgMjYuNzkzNCAyMS45NDYzQzI2Ljc5MzQgMjIuMzQ5IDI2LjU4NjggMjIuOTUzIDI2LjM4MDIgMjMuMTU0NEMyNS45NjY5IDI0LjM2MjQgMjUuMzQ3MSAyNS4xNjc4IDI0LjcyNzMgMjYuMTc0NUMyNC4xMDc0IDI2Ljk3OTkgMjMuNjk0MiAyNy41ODM5IDIzLjQ4NzYgMjcuNzg1MkMyMi44Njc4IDI4LjM4OTMgMjIuNDU0NSAyOC45OTMzIDIxLjgzNDcgMjkuMTk0NkMyMS40MjE1IDI5LjU5NzMgMjAuODAxNiAyOS43OTg3IDE5Ljk3NTIgMjkuNzk4N0MxOS41NjIgMjkuNzk4NyAxOS4xNDg4IDI5Ljc5ODcgMTguNzM1NSAyOS41OTczQzE4LjUyODkgMjkuNTk3MyAxOC4xMTU3IDI5LjM5NiAxNy43MDI1IDI5LjE5NDZDMTcuMDgyNiAyOC45OTMzIDE2Ljg3NiAyOC43OTE5IDE2LjQ2MjggMjguNzkxOUMxNi4wNDk2IDI4LjU5MDYgMTUuNDI5OCAyOC41OTA2IDE1LjAxNjUgMjguNTkwNkMxNC42MDMzIDI4LjU5MDYgMTMuOTgzNSAyOC41OTA2IDEzLjU3MDIgMjguNzkxOUMxMy4xNTcgMjguNzkxOSAxMi43NDM4IDI4Ljk5MzMgMTIuMzMwNiAyOS4xOTQ2QzExLjcxMDcgMjkuMzk2IDExLjUwNDEgMjkuNTk3MyAxMS4yOTc1IDI5LjU5NzNDMTAuODg0MyAyOS43OTg3IDEwLjQ3MTEgMjkuNzk4NyAxMC4wNTc4IDI5Ljc5ODdDOS40MzgwMiAyOS43OTg3IDguODE4MTggMjkuNTk3MyA4LjE5ODM1IDI5LjE5NDZaTTE2Ljg3NiA2LjI0MTYxQzE2LjA0OTYgNi42NDQyOSAxNS4yMjMxIDYuODQ1NjQgMTQuMzk2NyA2Ljg0NTY0QzE0LjE5MDEgNi4wNDAyNyAxNC4zOTY3IDUuMjM0OSAxNC44MDk5IDQuMjI4MTlDMTUuMjIzMSAzLjQyMjgyIDE1LjQyOTggMi44MTg3OSAxNi4wNDk2IDIuMjE0NzZDMTYuNjY5NCAxLjYxMDc0IDE3LjI4OTMgMS4wMDY3MSAxOC4xMTU3IDAuNjA0MDI3QzE4Ljk0MjEgMC4yMDEzNDMgMTkuNzY4NiAwIDIwLjU5NSAwQzIwLjU5NSAwLjgwNTM2OSAyMC4zODg0IDEuNjEwNzQgMjAuMTgxOCAyLjYxNzQ1QzE5Ljk3NTIgMy40MjI4MiAxOS4zNTU0IDQuMDI2ODUgMTguOTQyMSA0LjYzMDg3QzE4LjMyMjMgNS40MzYyNCAxNy43MDI1IDUuODM4OTMgMTYuODc2IDYuMjQxNjFaXCIgZmlsbD1cImJsYWNrXCIvPlxyXG4gICAgICAgICAgICA8L2c+XHJcbiAgICAgICAgICAgIDxkZWZzPlxyXG4gICAgICAgICAgICAgIDxjbGlwUGF0aCBpZD1cImNsaXAwXzkyNF8xMjQ3XCI+XHJcbiAgICAgICAgICAgICAgICA8cmVjdCB3aWR0aD1cIjI1XCIgaGVpZ2h0PVwiMzBcIiBmaWxsPVwid2hpdGVcIiB0cmFuc2Zvcm09XCJ0cmFuc2xhdGUoMilcIi8+XHJcbiAgICAgICAgICAgICAgPC9jbGlwUGF0aD5cclxuICAgICAgICAgICAgPC9kZWZzPlxyXG4gICAgICAgICAgPC9zdmc+XHJcbiAgICAgICAgPC9hPlxyXG4gICAgICAgIDxhIGhyZWY9XCJcIiBjbGFzcz1cInBvcHVwX2xpbmtcIj5cclxuICAgICAgICAgIDxzdmcgd2lkdGg9XCIzMFwiIGhlaWdodD1cIjMwXCIgdmlld0JveD1cIjAgMCAzMCAzMFwiIGZpbGw9XCJub25lXCIgeG1sbnM9XCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiPlxyXG4gICAgICAgICAgICA8ZyBjbGlwUGF0aD1cInVybCgjY2xpcDBfOTI0XzEyNDEpXCI+XHJcbiAgICAgICAgICAgICAgPHBhdGggZD1cIk0zMCAxNUMzMCA2LjcxNTcgMjMuMjg0MyAtMi42NzAyOWUtMDUgMTUgLTIuNjcwMjllLTA1QzYuNzE1NzIgLTIuNjcwMjllLTA1IDAgNi43MTU3IDAgMTVDMCAyMi40ODY5IDUuNDg1MjggMjguNjkyNSAxMi42NTYyIDI5LjgxNzdWMTkuMzM1OUg4Ljg0NzY2VjE1SDEyLjY1NjJWMTEuNjk1M0MxMi42NTYyIDcuOTM1OTEgMTQuODk1NiA1Ljg1OTM1IDE4LjMyMiA1Ljg1OTM1QzE5Ljk2MzEgNS44NTkzNSAyMS42Nzk3IDYuMTUyMzIgMjEuNjc5NyA2LjE1MjMyVjkuODQzNzJIMTkuNzg4MkMxNy45MjQ5IDkuODQzNzIgMTcuMzQzOCAxMSAxNy4zNDM4IDEyLjE4NjJWMTVIMjEuNTAzOUwyMC44Mzg5IDE5LjMzNTlIMTcuMzQzOFYyOS44MTc3QzI0LjUxNDcgMjguNjkyNSAzMCAyMi40ODY5IDMwIDE1WlwiIGZpbGw9XCJ3aGl0ZVwiLz5cclxuICAgICAgICAgICAgICA8cGF0aCBkPVwiTTIwLjgzODkgMTkuMzM1OUwyMS41MDM5IDE1SDE3LjM0MzhWMTIuMTg2MkMxNy4zNDM4IDExIDE3LjkyNDkgOS44NDM3NSAxOS43ODgyIDkuODQzNzVIMjEuNjc5N1Y2LjE1MjM0QzIxLjY3OTcgNi4xNTIzNCAxOS45NjMxIDUuODU5MzggMTguMzIyIDUuODU5MzhDMTQuODk1NiA1Ljg1OTM4IDEyLjY1NjMgNy45MzU5NCAxMi42NTYzIDExLjY5NTNWMTVIOC44NDc2NlYxOS4zMzU5SDEyLjY1NjNWMjkuODE3OEMxMy40MTk5IDI5LjkzNzYgMTQuMjAyNyAzMCAxNSAzMEMxNS43OTczIDMwIDE2LjU4MDEgMjkuOTM3NiAxNy4zNDM4IDI5LjgxNzhWMTkuMzM1OUgyMC44Mzg5WlwiIGZpbGw9XCJibGFja1wiLz5cclxuICAgICAgICAgICAgPC9nPlxyXG4gICAgICAgICAgICA8ZGVmcz5cclxuICAgICAgICAgICAgICA8Y2xpcFBhdGggaWQ9XCJjbGlwMF85MjRfMTI0MVwiPlxyXG4gICAgICAgICAgICAgICAgPHJlY3Qgd2lkdGg9XCIzMFwiIGhlaWdodD1cIjMwXCIgZmlsbD1cIndoaXRlXCIvPlxyXG4gICAgICAgICAgICAgIDwvY2xpcFBhdGg+XHJcbiAgICAgICAgICAgIDwvZGVmcz5cclxuICAgICAgICAgIDwvc3ZnPlxyXG4gICAgICAgIDwvYT5cclxuICAgICAgICA8YSBocmVmPVwiXCIgY2xhc3M9XCJwb3B1cF9saW5rXCI+XHJcbiAgICAgICAgICA8c3ZnIHdpZHRoPVwiMzBcIiBoZWlnaHQ9XCIzMFwiIHZpZXdCb3g9XCIwIDAgMzAgMzBcIiBmaWxsPVwibm9uZVwiIHhtbG5zPVwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIj5cclxuICAgICAgICAgICAgPHBhdGggZD1cIk0yOC4yIDE1LjMxMjVDMjguMiAxNC4zMzc1IDI4LjExMjUgMTMuNCAyNy45NSAxMi41SDE1VjE3LjgxODhIMjIuNEMyMi4wODEzIDE5LjUzNzUgMjEuMTEyNSAyMC45OTM4IDE5LjY1NjMgMjEuOTY4OFYyNS40MTg3SDI0LjFDMjYuNyAyMy4wMjUgMjguMiAxOS41IDI4LjIgMTUuMzEyNVpcIiBmaWxsPVwiYmxhY2tcIi8+XHJcbiAgICAgICAgICAgIDxwYXRoIGQ9XCJNMTUuMDAwNCAyOC43NUMxOC43MTI5IDI4Ljc1IDIxLjgyNTQgMjcuNTE4OCAyNC4xMDA0IDI1LjQxODhMMTkuNjU2NiAyMS45Njg4QzE4LjQyNTQgMjIuNzkzOCAxNi44NTA0IDIzLjI4MTMgMTUuMDAwNCAyMy4yODEzQzExLjQxOTEgMjMuMjgxMyA4LjM4Nzg5IDIwLjg2MjUgNy4zMDY2NCAxNy42MTI1SDIuNzEyODlWMjEuMTc1QzQuOTc1MzkgMjUuNjY4OCA5LjYyNTM5IDI4Ljc1IDE1LjAwMDQgMjguNzVaXCIgZmlsbD1cImJsYWNrXCIvPlxyXG4gICAgICAgICAgICA8cGF0aCBkPVwiTTcuMzA2MjUgMTcuNjEyNUM3LjAzMTI1IDE2Ljc4NzUgNi44NzUgMTUuOTA2MiA2Ljg3NSAxNUM2Ljg3NSAxNC4wOTM3IDcuMDMxMjUgMTMuMjEyNSA3LjMwNjI1IDEyLjM4NzVWOC44MjQ5NUgyLjcxMjVDMS43NSAxMC43NDEgMS4yNDkxNSAxMi44NTU3IDEuMjUgMTVDMS4yNSAxNy4yMTg3IDEuNzgxMjUgMTkuMzE4NyAyLjcxMjUgMjEuMTc1TDcuMzA2MjUgMTcuNjEyNVpcIiBmaWxsPVwiYmxhY2tcIi8+XHJcbiAgICAgICAgICAgIDxwYXRoIGQ9XCJNMTUuMDAwNCA2LjcxODc1QzE3LjAxOTEgNi43MTg3NSAxOC44MzE2IDcuNDEyNSAyMC4yNTY2IDguNzc1TDI0LjIwMDQgNC44MzEyNUMyMS44MTkxIDIuNjEyNSAxOC43MDY2IDEuMjUgMTUuMDAwNCAxLjI1QzkuNjI1MzkgMS4yNSA0Ljk3NTM5IDQuMzMxMjUgMi43MTI4OSA4LjgyNUw3LjMwNjY0IDEyLjM4NzVDOC4zODc4OSA5LjEzNzUgMTEuNDE5MSA2LjcxODc1IDE1LjAwMDQgNi43MTg3NVpcIiBmaWxsPVwiYmxhY2tcIi8+XHJcbiAgICAgICAgICA8L3N2Zz5cclxuICAgICAgICA8L2E+XHJcbiAgICAgIDwvZGl2PlxyXG4gICAgICA8cCBjbGFzcz1cIm5vLWFjY291bnQteWV0XCI+0J3QtdGCINCw0LrQutCw0YPQvdGC0LA/PC9wPlxyXG4gICAgICA8YnV0dG9uIHR5cGU9XCJidXR0b25cIiBjbGFzcz1cInBvcHVwX19idXR0b24gcG9wdXBfX2J1dHRvbi1yZWdpc3RlclwiPtCX0LDRgNC10LPQuNGB0YLRgNC40YDQvtCy0LDRgtGM0YHRjzwvYnV0dG9uPlxyXG4gICAgPC9mb3JtPlxyXG5cclxuICAgIGBcclxuICApXHJcbn1cclxuXHJcbmZ1bmN0aW9uIHJlZ2lzdGVyUG9wdXAoKSB7XHJcbiAgcmV0dXJuIChcclxuICAgIGBcclxuICAgIDxmb3JtIGNsYXNzPVwicG9wdXBfX3JlZ2lzdGVyXCIgbmFtZT1cInBvcHVwX19yZWdpc3RlclwiPlxyXG4gICAgICA8bGFiZWwgY2xhc3M9J2Zvcm0tbGFiZWwnPjxpbnB1dCBjbGFzcz0ncG9wdXBfX2lucHV0JyBuYW1lPVwidXNlcm5hbWVcIiB0eXBlPVwidGV4dFwiIHBsYWNlaG9sZGVyPVwi0JjQvNGPINC/0L7Qu9GM0LfQvtCy0LDRgtC10LvRj1wiIC8+PGRpdiBjbGFzcz0nZm9ybS1lcnJvcic+PGRpdj48cCBjbGFzcz0nZm9ybS1lcnJvcl9tZXNzYWdlJz48L3A+PC9kaXY+PC9kaXY+PC9sYWJlbD5cclxuICAgICAgPGxhYmVsIGNsYXNzPSdmb3JtLWxhYmVsJz48aW5wdXQgY2xhc3M9J3BvcHVwX19pbnB1dCcgbmFtZT1cImVtYWlsXCIgdHlwZT1cImVtYWlsXCIgcGxhY2Vob2xkZXI9XCLQrdC70LXQutGC0YDQvtC90L3QsNGPINC/0L7Rh9GC0LBcIiAvPjxkaXYgY2xhc3M9J2Zvcm0tZXJyb3InPjxkaXY+PHAgY2xhc3M9J2Zvcm0tZXJyb3JfbWVzc2FnZSc+PC9wPjwvZGl2PjwvZGl2PjwvbGFiZWw+XHJcbiAgICAgIDxsYWJlbCBjbGFzcz0nZm9ybS1sYWJlbCc+PGlucHV0IGNsYXNzPSdwb3B1cF9faW5wdXQnIG5hbWU9XCJwYXNzd29yZFwiIHR5cGU9XCJwYXNzd29yZFwiIHBsYWNlaG9sZGVyPVwi0J/QsNGA0L7Qu9GMXCIgLz48ZGl2IGNsYXNzPSdmb3JtLWVycm9yJz48ZGl2PjxwIGNsYXNzPSdmb3JtLWVycm9yX21lc3NhZ2UnPjwvcD48L2Rpdj48L2Rpdj48L2xhYmVsPlxyXG4gICAgICA8bGFiZWwgY2xhc3M9J2Zvcm0tbGFiZWwnPjxpbnB1dCBjbGFzcz0ncG9wdXBfX2lucHV0JyBuYW1lPVwicGFzc3dvcmQyXCIgdHlwZT1cInBhc3N3b3JkXCIgcGxhY2Vob2xkZXI9J9Cf0L7QstGC0L7RgNC40YLRjCDQv9Cw0YDQvtC70YwnIC8+PGRpdiBjbGFzcz0nZm9ybS1lcnJvcic+PGRpdj48cCBjbGFzcz0nZm9ybS1lcnJvcl9tZXNzYWdlJz48L3A+PC9kaXY+PC9kaXY+PC9sYWJlbD5cclxuICAgICAgPGRpdiBjbGFzcz1cInBvcHVwX19jaGVja1wiPlxyXG4gICAgICAgIDxpbnB1dCB0eXBlPVwiY2hlY2tib3hcIiBuYW1lPVwiYWNjZXB0X3Rlcm1zXCIgaWQ9XCJhY2NlcHRfdGVybXNcIiA+PC9pbnB1dD5cclxuICAgICAgICA8c3BhbiBjbGFzcz1cInBvcHVwX19jaGVja190ZXh0XCI+0K8g0L/RgNC40L3QuNC80LDRjiDRg9GB0LvQvtCy0LjRjyA8YT7Qv9C+0LvRjNC30L7QstCw0YLQtdC70YzRgdC60L7Qs9C+INGB0L7Qs9C70LDRiNC10L3QuNGPPC9hPjwvc3Bhbj5cclxuICAgICAgPC9kaXY+XHJcbiAgICAgIDxkaXYgY2xhc3M9XCJwb3B1cC1yZWNhcHRjaGFcIj5cclxuICAgICAgICA8ZGl2IGNsYXNzPVwiZy1yZWNhcHRjaGFcIiBkYXRhLXNpdGVrZXk9XCI2TGNRNFZncEFBQUFBSUI0X3ZxUEdpZXp6Qk1lazluMzBnVXFYRjNRXCIgZGF0YS1jYWxsYmFjaz0nZ2V0UmVjYXB0Y2hhJz48L2Rpdj5cclxuICAgICAgPC9kaXY+XHJcbiAgICAgIDxpbnB1dCB0eXBlPVwic3VibWl0XCIgdmFsdWU9XCLQl9Cw0YDQtdCz0LjRgdGC0YDQuNGA0L7QstCw0YLRjNGB0Y9cIiBjbGFzcz1cInBvcHVwX19pbnB1dF9ncmVlbiBwb3B1cF9faW5wdXRfcmVnaXN0ZXJcIj48L2lucHV0PlxyXG4gICAgICA8cCBjbGFzcz1cImxvZ2luLXVzaW5nXCI+0JfQsNGA0LXQs9C40YHRgtGA0LjRgNC+0LLQsNGC0YzRgdGPINGBINC/0L7QvNC+0YnRjNGOPC9wPlxyXG4gICAgICA8ZGl2IGNsYXNzPVwicG9wdXBfbGlua3NcIj5cclxuICAgICAgICA8YSBocmVmPVwiXCIgY2xhc3M9XCJwb3B1cF9saW5rXCI+XHJcbiAgICAgICAgICA8c3ZnIHdpZHRoPVwiMzBcIiBoZWlnaHQ9XCIzMFwiIHZpZXdCb3g9XCIwIDAgMzAgMzBcIiBmaWxsPVwibm9uZVwiIHhtbG5zPVwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIj5cclxuICAgICAgICAgICAgPGcgY2xpcFBhdGg9XCJ1cmwoI2NsaXAwXzkyNF8xMjQ3KVwiPlxyXG4gICAgICAgICAgICAgIDxwYXRoIGQ9XCJNOC4xOTgzNSAyOS4xOTQ2QzcuNTc4NTEgMjguOTkzMyA2Ljk1ODY4IDI4LjU5MDYgNi41NDU0NSAyNy43ODUyQzYuMTMyMjMgMjcuMzgyNSA1LjcxOTAxIDI2Ljc3ODUgNS4wOTkxNyAyNS45NzMyQzQuMjcyNzMgMjQuNzY1MSAzLjQ0NjI4IDIzLjE1NDQgMi44MjY0NSAyMS41NDM2QzIuMjA2NjEgMTkuNzMxNSAyIDE3LjkxOTUgMiAxNi4xMDc0QzIgMTQuMDk0IDIuNDEzMjIgMTIuNDgzMiAzLjIzOTY3IDExLjA3MzhDMy44NTk1IDkuODY1NzcgNC44OTI1NiA5LjA2MDQgNS45MjU2MiA4LjI1NTAzQzYuOTU4NjggNy42NTEwMSA4LjE5ODM1IDcuMjQ4MzIgOS40MzgwMSA3LjI0ODMyQzkuODUxMjQgNy4yNDgzMiAxMC4yNjQ1IDcuMjQ4MzIgMTAuODg0MyA3LjQ0OTY2QzExLjI5NzUgNy40NDk2NiAxMS43MTA3IDcuNjUxMDEgMTIuMzMwNiA3Ljg1MjM1QzEyLjk1MDQgOC4wNTM2OSAxMy4zNjM2IDguMjU1MDMgMTMuNTcwMiA4LjI1NTAzQzEzLjk4MzUgOC40NTYzOCAxNC4zOTY3IDguNDU2MzggMTQuNjAzMyA4LjQ1NjM4QzE0LjgwOTkgOC40NTYzOCAxNS4wMTY1IDguNDU2MzggMTUuNDI5OCA4LjI1NTAzQzE1LjYzNjQgOC4yNTUwMyAxNi4wNDk2IDguMDUzNjkgMTYuNDYyOCA3Ljg1MjM1QzE2Ljg3NiA3LjY1MTAxIDE3LjI4OTMgNy40NDk2NiAxNy43MDI1IDcuNDQ5NjZDMTguMTE1NyA3LjQ0OTY2IDE4LjUyODkgNy4yNDgzMiAxOC45NDIxIDcuMjQ4MzJDMTkuMzU1NCA3LjI0ODMyIDE5Ljk3NTIgNy4wNDY5OCAyMC4zODg0IDcuMjQ4MzJDMjEuMjE0OSA3LjI0ODMyIDIyLjA0MTMgNy40NDk2NiAyMi44Njc4IDcuODUyMzVDMjQuMTA3NCA4LjI1NTAzIDI1LjE0MDUgOS4yNjE3NSAyNS45NjY5IDEwLjI2ODVDMjUuNzYwMyAxMC4yNjg1IDI1LjM0NzEgMTAuNDY5OCAyNS4xNDA1IDEwLjg3MjVDMjQuNTIwNyAxMS40NzY1IDIzLjkwMDggMTIuMDgwNSAyMy40ODc2IDEyLjY4NDZDMjMuMDc0NCAxMy42OTEzIDIyLjY2MTIgMTQuNjk4IDIyLjY2MTIgMTUuOTA2QzIyLjY2MTIgMTcuMzE1NCAyMy4wNzQ0IDE4LjUyMzUgMjMuNjk0MiAxOS41MzAyQzI0LjEwNzQgMjAuMzM1NiAyNC45MzM5IDIwLjkzOTYgMjUuNTUzNyAyMS4zNDIzQzI2LjE3MzUgMjEuNTQzNiAyNi41ODY4IDIxLjc0NSAyNi43OTM0IDIxLjk0NjNDMjYuNzkzNCAyMi4zNDkgMjYuNTg2OCAyMi45NTMgMjYuMzgwMiAyMy4xNTQ0QzI1Ljk2NjkgMjQuMzYyNCAyNS4zNDcxIDI1LjE2NzggMjQuNzI3MyAyNi4xNzQ1QzI0LjEwNzQgMjYuOTc5OSAyMy42OTQyIDI3LjU4MzkgMjMuNDg3NiAyNy43ODUyQzIyLjg2NzggMjguMzg5MyAyMi40NTQ1IDI4Ljk5MzMgMjEuODM0NyAyOS4xOTQ2QzIxLjQyMTUgMjkuNTk3MyAyMC44MDE2IDI5Ljc5ODcgMTkuOTc1MiAyOS43OTg3QzE5LjU2MiAyOS43OTg3IDE5LjE0ODggMjkuNzk4NyAxOC43MzU1IDI5LjU5NzNDMTguNTI4OSAyOS41OTczIDE4LjExNTcgMjkuMzk2IDE3LjcwMjUgMjkuMTk0NkMxNy4wODI2IDI4Ljk5MzMgMTYuODc2IDI4Ljc5MTkgMTYuNDYyOCAyOC43OTE5QzE2LjA0OTYgMjguNTkwNiAxNS40Mjk4IDI4LjU5MDYgMTUuMDE2NSAyOC41OTA2QzE0LjYwMzMgMjguNTkwNiAxMy45ODM1IDI4LjU5MDYgMTMuNTcwMiAyOC43OTE5QzEzLjE1NyAyOC43OTE5IDEyLjc0MzggMjguOTkzMyAxMi4zMzA2IDI5LjE5NDZDMTEuNzEwNyAyOS4zOTYgMTEuNTA0MSAyOS41OTczIDExLjI5NzUgMjkuNTk3M0MxMC44ODQzIDI5Ljc5ODcgMTAuNDcxMSAyOS43OTg3IDEwLjA1NzggMjkuNzk4N0M5LjQzODAyIDI5Ljc5ODcgOC44MTgxOCAyOS41OTczIDguMTk4MzUgMjkuMTk0NlpNMTYuODc2IDYuMjQxNjFDMTYuMDQ5NiA2LjY0NDI5IDE1LjIyMzEgNi44NDU2NCAxNC4zOTY3IDYuODQ1NjRDMTQuMTkwMSA2LjA0MDI3IDE0LjM5NjcgNS4yMzQ5IDE0LjgwOTkgNC4yMjgxOUMxNS4yMjMxIDMuNDIyODIgMTUuNDI5OCAyLjgxODc5IDE2LjA0OTYgMi4yMTQ3NkMxNi42Njk0IDEuNjEwNzQgMTcuMjg5MyAxLjAwNjcxIDE4LjExNTcgMC42MDQwMjdDMTguOTQyMSAwLjIwMTM0MyAxOS43Njg2IDAgMjAuNTk1IDBDMjAuNTk1IDAuODA1MzY5IDIwLjM4ODQgMS42MTA3NCAyMC4xODE4IDIuNjE3NDVDMTkuOTc1MiAzLjQyMjgyIDE5LjM1NTQgNC4wMjY4NSAxOC45NDIxIDQuNjMwODdDMTguMzIyMyA1LjQzNjI0IDE3LjcwMjUgNS44Mzg5MyAxNi44NzYgNi4yNDE2MVpcIiBmaWxsPVwiYmxhY2tcIi8+XHJcbiAgICAgICAgICAgIDwvZz5cclxuICAgICAgICAgICAgPGRlZnM+XHJcbiAgICAgICAgICAgICAgPGNsaXBQYXRoIGlkPVwiY2xpcDBfOTI0XzEyNDdcIj5cclxuICAgICAgICAgICAgICAgIDxyZWN0IHdpZHRoPVwiMjVcIiBoZWlnaHQ9XCIzMFwiIGZpbGw9XCJ3aGl0ZVwiIHRyYW5zZm9ybT1cInRyYW5zbGF0ZSgyKVwiLz5cclxuICAgICAgICAgICAgICA8L2NsaXBQYXRoPlxyXG4gICAgICAgICAgICA8L2RlZnM+XHJcbiAgICAgICAgICA8L3N2Zz5cclxuICAgICAgICA8L2E+XHJcbiAgICAgICAgPGEgaHJlZj1cIlwiIGNsYXNzPVwicG9wdXBfbGlua1wiPlxyXG4gICAgICAgICAgPHN2ZyB3aWR0aD1cIjMwXCIgaGVpZ2h0PVwiMzBcIiB2aWV3Qm94PVwiMCAwIDMwIDMwXCIgZmlsbD1cIm5vbmVcIiB4bWxucz1cImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCI+XHJcbiAgICAgICAgICAgIDxnIGNsaXBQYXRoPVwidXJsKCNjbGlwMF85MjRfMTI0MSlcIj5cclxuICAgICAgICAgICAgICA8cGF0aCBkPVwiTTMwIDE1QzMwIDYuNzE1NyAyMy4yODQzIC0yLjY3MDI5ZS0wNSAxNSAtMi42NzAyOWUtMDVDNi43MTU3MiAtMi42NzAyOWUtMDUgMCA2LjcxNTcgMCAxNUMwIDIyLjQ4NjkgNS40ODUyOCAyOC42OTI1IDEyLjY1NjIgMjkuODE3N1YxOS4zMzU5SDguODQ3NjZWMTVIMTIuNjU2MlYxMS42OTUzQzEyLjY1NjIgNy45MzU5MSAxNC44OTU2IDUuODU5MzUgMTguMzIyIDUuODU5MzVDMTkuOTYzMSA1Ljg1OTM1IDIxLjY3OTcgNi4xNTIzMiAyMS42Nzk3IDYuMTUyMzJWOS44NDM3MkgxOS43ODgyQzE3LjkyNDkgOS44NDM3MiAxNy4zNDM4IDExIDE3LjM0MzggMTIuMTg2MlYxNUgyMS41MDM5TDIwLjgzODkgMTkuMzM1OUgxNy4zNDM4VjI5LjgxNzdDMjQuNTE0NyAyOC42OTI1IDMwIDIyLjQ4NjkgMzAgMTVaXCIgZmlsbD1cIndoaXRlXCIvPlxyXG4gICAgICAgICAgICAgIDxwYXRoIGQ9XCJNMjAuODM4OSAxOS4zMzU5TDIxLjUwMzkgMTVIMTcuMzQzOFYxMi4xODYyQzE3LjM0MzggMTEgMTcuOTI0OSA5Ljg0Mzc1IDE5Ljc4ODIgOS44NDM3NUgyMS42Nzk3VjYuMTUyMzRDMjEuNjc5NyA2LjE1MjM0IDE5Ljk2MzEgNS44NTkzOCAxOC4zMjIgNS44NTkzOEMxNC44OTU2IDUuODU5MzggMTIuNjU2MyA3LjkzNTk0IDEyLjY1NjMgMTEuNjk1M1YxNUg4Ljg0NzY2VjE5LjMzNTlIMTIuNjU2M1YyOS44MTc4QzEzLjQxOTkgMjkuOTM3NiAxNC4yMDI3IDMwIDE1IDMwQzE1Ljc5NzMgMzAgMTYuNTgwMSAyOS45Mzc2IDE3LjM0MzggMjkuODE3OFYxOS4zMzU5SDIwLjgzODlaXCIgZmlsbD1cImJsYWNrXCIvPlxyXG4gICAgICAgICAgICA8L2c+XHJcbiAgICAgICAgICAgIDxkZWZzPlxyXG4gICAgICAgICAgICAgIDxjbGlwUGF0aCBpZD1cImNsaXAwXzkyNF8xMjQxXCI+XHJcbiAgICAgICAgICAgICAgICA8cmVjdCB3aWR0aD1cIjMwXCIgaGVpZ2h0PVwiMzBcIiBmaWxsPVwid2hpdGVcIi8+XHJcbiAgICAgICAgICAgICAgPC9jbGlwUGF0aD5cclxuICAgICAgICAgICAgPC9kZWZzPlxyXG4gICAgICAgICAgPC9zdmc+XHJcbiAgICAgICAgPC9hPlxyXG4gICAgICAgIDxhIGhyZWY9XCJcIiBjbGFzcz1cInBvcHVwX2xpbmtcIj5cclxuICAgICAgICAgIDxzdmcgd2lkdGg9XCIzMFwiIGhlaWdodD1cIjMwXCIgdmlld0JveD1cIjAgMCAzMCAzMFwiIGZpbGw9XCJub25lXCIgeG1sbnM9XCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiPlxyXG4gICAgICAgICAgICA8cGF0aCBkPVwiTTI4LjIgMTUuMzEyNUMyOC4yIDE0LjMzNzUgMjguMTEyNSAxMy40IDI3Ljk1IDEyLjVIMTVWMTcuODE4OEgyMi40QzIyLjA4MTMgMTkuNTM3NSAyMS4xMTI1IDIwLjk5MzggMTkuNjU2MyAyMS45Njg4VjI1LjQxODdIMjQuMUMyNi43IDIzLjAyNSAyOC4yIDE5LjUgMjguMiAxNS4zMTI1WlwiIGZpbGw9XCJibGFja1wiLz5cclxuICAgICAgICAgICAgPHBhdGggZD1cIk0xNS4wMDA0IDI4Ljc1QzE4LjcxMjkgMjguNzUgMjEuODI1NCAyNy41MTg4IDI0LjEwMDQgMjUuNDE4OEwxOS42NTY2IDIxLjk2ODhDMTguNDI1NCAyMi43OTM4IDE2Ljg1MDQgMjMuMjgxMyAxNS4wMDA0IDIzLjI4MTNDMTEuNDE5MSAyMy4yODEzIDguMzg3ODkgMjAuODYyNSA3LjMwNjY0IDE3LjYxMjVIMi43MTI4OVYyMS4xNzVDNC45NzUzOSAyNS42Njg4IDkuNjI1MzkgMjguNzUgMTUuMDAwNCAyOC43NVpcIiBmaWxsPVwiYmxhY2tcIi8+XHJcbiAgICAgICAgICAgIDxwYXRoIGQ9XCJNNy4zMDYyNSAxNy42MTI1QzcuMDMxMjUgMTYuNzg3NSA2Ljg3NSAxNS45MDYyIDYuODc1IDE1QzYuODc1IDE0LjA5MzcgNy4wMzEyNSAxMy4yMTI1IDcuMzA2MjUgMTIuMzg3NVY4LjgyNDk1SDIuNzEyNUMxLjc1IDEwLjc0MSAxLjI0OTE1IDEyLjg1NTcgMS4yNSAxNUMxLjI1IDE3LjIxODcgMS43ODEyNSAxOS4zMTg3IDIuNzEyNSAyMS4xNzVMNy4zMDYyNSAxNy42MTI1WlwiIGZpbGw9XCJibGFja1wiLz5cclxuICAgICAgICAgICAgPHBhdGggZD1cIk0xNS4wMDA0IDYuNzE4NzVDMTcuMDE5MSA2LjcxODc1IDE4LjgzMTYgNy40MTI1IDIwLjI1NjYgOC43NzVMMjQuMjAwNCA0LjgzMTI1QzIxLjgxOTEgMi42MTI1IDE4LjcwNjYgMS4yNSAxNS4wMDA0IDEuMjVDOS42MjUzOSAxLjI1IDQuOTc1MzkgNC4zMzEyNSAyLjcxMjg5IDguODI1TDcuMzA2NjQgMTIuMzg3NUM4LjM4Nzg5IDkuMTM3NSAxMS40MTkxIDYuNzE4NzUgMTUuMDAwNCA2LjcxODc1WlwiIGZpbGw9XCJibGFja1wiLz5cclxuICAgICAgICAgIDwvc3ZnPlxyXG4gICAgICAgIDwvYT5cclxuICAgICAgPC9kaXY+XHJcbiAgICAgIDxwIGNsYXNzPVwibm8tYWNjb3VudC15ZXRcIj7Qo9C20LUg0LXRgdGC0Ywg0LDQutC60LDRg9C90YI/PC9wPlxyXG4gICAgICA8YnV0dG9uIHR5cGU9XCJidXR0b25cIiBjbGFzcz1cInBvcHVwX19idXR0b24gcG9wdXBfX2J1dHRvbi1sb2dpblwiPtCS0L7QudGC0Lg8L2J1dHRvbj5cclxuICAgIDwvZm9ybT5cclxuXHJcbiAgICBgXHJcbiAgKVxyXG59XHJcblxyXG5mdW5jdGlvbiByZWNvdmVyeVBvcHVwKCkge1xyXG4gIHJldHVybiAoXHJcbiAgICBgXHJcbiAgICA8Zm9ybSBjbGFzcz1cInBvcHVwX19yZWNvdmVyeVwiIG5hbWU9XCJwb3B1cF9fcmVjb3ZlcnlcIj5cclxuICAgICAgPGxhYmVsIGNsYXNzPSdmb3JtLWxhYmVsJz48aW5wdXQgY2xhc3M9J3BvcHVwX19pbnB1dCcgdHlwZT1cImVtYWlsXCIgbmFtZT1cImVtYWlsXCIgcGxhY2Vob2xkZXI9XCJFLW1haWwsINGD0LrQsNC30LDQvdC90YvQuSDQv9GA0Lgg0YDQtdCz0LjRgdGC0YDQsNGG0LjQuFwiIC8+PGRpdiBjbGFzcz0nZm9ybS1lcnJvcic+PGRpdj48cCBjbGFzcz0nZm9ybS1lcnJvcl9tZXNzYWdlJz48L3A+PC9kaXY+PC9kaXY+PC9sYWJlbD5cclxuICAgICAgPGlucHV0IHR5cGU9XCJzdWJtaXRcIiB2YWx1ZT1cItCS0L7RgdGB0YLQsNC90L7QstC40YLRjFwiIGNsYXNzPVwicG9wdXBfX2lucHV0X2dyZWVuIHBvcHVwX19pbnB1dF9yZXN0b3JlXCI+PC9pbnB1dD5cclxuICAgICAgPGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgY2xhc3M9XCJwb3B1cF9fYnV0dG9uIHBvcHVwX19idXR0b25fbG9naW5cIj7QktC+0LnRgtC4PC9idXR0b24+XHJcbiAgICA8L2Zvcm0+XHJcbiAgICBcclxuICAgIGBcclxuICApXHJcbn1cclxuXHJcbmZ1bmN0aW9uIHNlbmRQb3B1cCgpIHtcclxuICByZXR1cm4gKFxyXG4gICAgYFxyXG4gICAgICA8cCBjbGFzcz0ncG9wdXBfX3NlbmQnPtCY0LTQuCDQvdCwINC/0L7Rh9GC0YM8L3A+XHJcblxyXG4gICAgYFxyXG4gIClcclxufVxyXG5cclxuIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJpbXBvcnQgJy4vaW5kZXguc2NzcydcclxuaW1wb3J0IHsgSGVhZGVyQnV0dG9uLCBIZWFkZXJBZnRlclJlbmRlciB9IGZyb20gJy4vY29tcG9uZW50cy9oZWFkZXJCdXR0b24nXHJcbmltcG9ydCB7IFBvcHVwLCBQb3B1cEFmdGVyUmVuZGVyIH0gZnJvbSAnLi9jb21wb25lbnRzL3BvcHVwJ1xyXG5cclxuY29uc3QgcG9wdXAgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjcG9wdXAnKSxcclxuICBoZWFkZXJCdXR0b24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjaGVhZGVyLWJ1dHRvbicpLFxyXG4gIGhlYWRlckJ1cmdlciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5oZWFkZXJfX2J1cmdlcicpLFxyXG4gIG1lbnUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubWVudScpLFxyXG5cclxuICBib2R5ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignYm9keScpXHJcblxyXG5oZWFkZXJCdXJnZXIuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKT0+e1xyXG4gIG1lbnUuY2xhc3NMaXN0LnRvZ2dsZSgnc2lkZScpXHJcbiAgbWVudS5jbGFzc0xpc3QudG9nZ2xlKCdhY3RpdmUnKVxyXG4gIGJvZHkuc3R5bGUub3ZlcmZsb3cgPSAnaGlkZGVuJ1xyXG59KVxyXG5cclxubWVudS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChlKT0+IHtcclxuICBpZihkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubWVudS5zaWRlLmFjdGl2ZScpKXtcclxuICAgIGlmKGUudGFyZ2V0LmNsYXNzTmFtZSA9PT0gJ21lbnUgc2lkZSBhY3RpdmUnKXtcclxuICAgICAgbWVudS5jbGFzc0xpc3QudG9nZ2xlKCdzaWRlJylcclxuICAgICAgbWVudS5jbGFzc0xpc3QudG9nZ2xlKCdhY3RpdmUnKVxyXG4gICAgICBjb25zdCBib2R5ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignYm9keScpXHJcbiAgICAgIGJvZHkuc3R5bGUub3ZlcmZsb3cgPSAnYXV0bydcclxuICAgIH1cclxuICB9XHJcbn0pXHJcblxyXG5cclxuSGVhZGVyQnV0dG9uKCkudGhlbigoaHRtbCkgPT4gaGVhZGVyQnV0dG9uLmlubmVySFRNTCA9IGh0bWwpLnRoZW4oKCkgPT4gSGVhZGVyQWZ0ZXJSZW5kZXIoKSlcclxuUG9wdXAoKS50aGVuKChodG1sKSA9PiBwb3B1cC5pbm5lckhUTUwgPSBodG1sKS50aGVuKCgpID0+IFBvcHVwQWZ0ZXJSZW5kZXIoKSkiXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=