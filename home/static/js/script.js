window.addEventListener("DOMContentLoaded", (event) => {
    const noname = document.querySelector('.button__log-in'),
        user = document.querySelector('.header__user')
        localStorage.getItem('username') ? user.classList.toggle('active') : noname.classList.toggle('active')
    
    const buttonLogin = document.querySelector('.button__log-in'),
        cardsButtonMore = document.querySelector('.cards__button_more'),
        cardsButtonHide = document.querySelector('.cards__button_hide'),

        popup = document.querySelector('.popup'),
        popupButton = document.querySelectorAll('.popup__button'),

        requestButtonLogin = document.querySelector('.popup__input_login'),
        requestButtonRegister = document.querySelector('.popup__input_register'),
        boardCards = document.querySelector('.board__cards_container'),
        buttonLogout = document.querySelector('.header__logout'),
        logout = document.querySelector('.header__logout__btn'),

        about = document.querySelector('.documentation'),
        facts = document.querySelector('.actuality__paragraphs')

    buttonLogin.addEventListener('click', (e) => {
        popup.classList.toggle('active')
    })

    user.addEventListener('click', (e) => { 
        buttonLogout.classList.toggle('active')
    })

    logout.addEventListener('click', (e) => {
        e.preventDefault()
        fetch('http://127.0.0.1:8000/api/v1/profile/logout/')
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            if ('success' in data) {
                let logout = document.querySelector('.header__logout__btn')
                logout.classList.toggle('active')
                localStorage.removeItem('username')
                let noname = document.querySelector('.button__log-in'),
                    user = document.querySelector('.header__user')
                user.classList.toggle('active')
                noname.classList.toggle('active')
                buttonLogout.classList.toggle('active')
            }
        })
    })

    popup.addEventListener('click', (e) => {
        if (e.target.className == 'popup active' || e.target.closest('.close')) {
            popup.classList.toggle('active')
        }
    })

    cardsButtonMore.addEventListener('click', (e) => {
        const button = document.querySelector('.cards__button_h'),
            buttonA = document.querySelector('.cards__button_m')
        buttonA.classList.toggle('active')
        boardCards.classList.toggle('full')
        button.classList.toggle('hide')
        
    })

    cardsButtonHide.addEventListener('click', (e) => {
        const cardsButtonH = document.querySelector('.cards__button_h'),
            cardsButtonM = document.querySelector('.cards__button_m'),
            boardCardsHide = document.querySelector('.board__cards_container')
            boardCardsHide.classList.toggle('full')
        cardsButtonH.classList.toggle('hide')
        cardsButtonM.classList.toggle('active')
    })

    popupButton[0].addEventListener('click', (e) => {
        const login = document.querySelector('.popup__log-in'),
            register = document.querySelector('.popup__register')
        login.classList.toggle('active')
        register.classList.toggle('active')
        let error = document.querySelectorAll('.error.active')
        if (error[0]) {
            error[0].classList.toggle('active')
            error[1].classList.toggle('active')
        }
    })

    popupButton[1].addEventListener('click', (e) => {
        const login = document.querySelector('.popup__log-in'),
            register = document.querySelector('.popup__register')
        login.classList.toggle('active')
        register.classList.toggle('active')
        let error = document.querySelectorAll('.error.active')
        if (error[0]) {
            error[0].classList.toggle('active')
            error[1].classList.toggle('active')
        }
    })

    requestButtonLogin.addEventListener('click', (e) => {
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

    requestButtonRegister.addEventListener('click', (e) => {
        e.preventDefault()
        const form = document.forms.popup__register
        const username = form.elements.username.value
        const email = form.elements.email.value
        const password = form.elements.password.value
        const password2 = form.elements.password2.value
        const data = {
            'username': username,
            'email': email,
            'password': password,
            'password2': password2
        }

        auth(data)
    })

    getAbout(about)
    getFacts(facts)

});

function getFacts(container) {
    fetch('http://127.0.0.1:8000/api/v1/somefacts/')
    .then((response) => {
        return response.json();
    })
    .then((data) => {
        let color = 'lg'
        let counter = 1
        data.map((item) => {
            if (counter === 2) {
                color == 'lg' ? color = 'dg' : color = 'lg'
                counter = 0
            }
            counter++
            container.innerHTML += `<p class="actuality__paragraph ${color}">${item.description}</p>`
        })
    });
}

function getAbout(container) {
    fetch('http://127.0.0.1:8000/api/v1/aboutresource/')
    .then((response) => {
        return response.json();
    })
    .then((data) => {
        data.map((item) => {
            container.innerHTML = `<div class="documentation__main">
            <h1 class="documentation__title">${item.title}</h1>
            <p class="documentation__about">${item.description}</p>
        </div>
        <div class="documentation__video">
            <video width="630px" height="415px" src="${item.file}" controls="controls" poster="${item.image}" class="documentation__video">
                <source src="${item.file}" type='video/mp4">
            </video>
        </div>`
        })
    });
}

function auth(data){
    let url = null
    'password2' in data ? url = 'http://127.0.0.1:8000/api/v1/profile/register/': url = 'http://127.0.0.1:8000/api/v1/profile/login/'
    const csrftoken = getCookie('csrftoken')
    data['csrftoken'] = csrftoken
    async function postData(url, data) {
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                'X-CSRFToken': csrftoken,
                mode: 'same-origin',
                // 'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: JSON.stringify(data),
        });
        return await response.json();
    }
    
    postData(url, data).then((data) => {
        if ('success' in data) {
            const popup = document.querySelector('.popup')
            popup.classList.toggle('active')
            localStorage.setItem('username', 'Johan')
            const noname = document.querySelector('.button__log-in'),
                user = document.querySelector('.header__user')
            if (localStorage.getItem('username')) {user.classList.toggle('active');noname.classList.toggle('active')}
        } else {
            let error = document.getElementsByClassName('error active')
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