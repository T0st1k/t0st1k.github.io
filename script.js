const container = document.querySelector('.test .container')
const wrapper = document.querySelector('.test__wrapper')
const form = document.querySelector('.test__form');
const btn = document.querySelector('.test__btn');
const booklet = document.querySelector('.booklet__img-wrapper');
const left = document.querySelector('.img--left');
const right = document.querySelector('.img--right');

let currentQuestion = 0;
let score = 0;
let questions = [
    {
        question: "Вам пришла ссылка на «бесплатные призы» от бренда. Ваши действия?",
        answers: ["Перейду и введу данные", "Сначала проверю адрес сайта", "Перешлю другу"],
        correct: 1
    },
    {
        question: "Какой пароль самый надежный?",
        answers: ["12345678", "MyPassword2024", "G7#p9!kL2_zR"],
        correct: 2
    },
    {
        question: "Что делать при столкновении с кибербуллингом?",
        answers: ["Ответить агрессией", "Заблокировать и пожаловаться", "Удалить страницу"],
        correct: 1
    },
    {
        question: "Зачем нужна двухфакторная аутентификация (2FA)?",
        answers: ["Для защиты и восстановления пароля", "Чтобы память телефона не была занята", "Чтобы давать аккаунт друзьям"],
        correct: 0
    },
    {
        question: "Кто-то просит в соцсетях код из вашего SMS. Что делать?",
        answers: ["Сразу отправить код", "Проигнорировать и скрыть профиль", "Спросить, зачем он нужен"],
        correct: 1
    },
    {
        question: "Вы скачали файл, но антивирус выдал предупреждение. Как поступить?",
        answers: ["Отключить антивирус и открыть файл", "Сразу удалить файл", "Скачать заново"],
        correct: 1
    }];

function showTest() {
    const item = questions[currentQuestion]
    const isLastQuestion = currentQuestion === questions.length - 1;
    const buttonText = isLastQuestion ? 'Завершить тест' : 'Следующий вопрос';

    wrapper.innerHTML = `
    <form class="test__form">
        <h3 class="test__number title">Вопрос №${currentQuestion + 1}</h3>
        <div class="test__progress">
            <div class="test__progress-bar"></div>
        </div>
        <p class="test__text">${item.question}</p>
        <div class="test__answers">
            ${item.answers.map((answer, index) => `
                <input type="radio" id="number${index}" name="answer" value="${index}">
                <label for="number${index}">${answer}</label>
            `).join('')}
        </div>
            <button type="submit" class="test__btn btn" disabled> <span>${buttonText}</span> <img src="img/arrow.svg"></button>
    </form>
    `;
    changeBar();
    animateTest();
}

function animateTest() {
    const form = wrapper.querySelector('.test__form');
    if (!form) return;
    form.classList.remove('test__animate');
    requestAnimationFrame(() => {
        form.classList.add('test__animate');
    });
}

function animateResult() {
    const results = container.querySelector('.results');
    if (!results) return;
    results.classList.remove('result__animate');
    requestAnimationFrame(() => {
        results.classList.add('result__animate');
    });
}

function changeBar() {
    const bar = document.querySelector('.test__progress-bar');
    bar.animate([
        { width: `${(currentQuestion - 1) / questions.length * 100}%` },
        { width: `${currentQuestion / questions.length * 100}%` }
    ], {
        duration: 500,
        easing: 'ease-out',
        fill: 'forwards'
    });
}

function showResult() {
    let result;
    let level;
    const threshold1Third = questions.length / 3;
    const threshold2Third = (questions.length * 2) / 3;

    if (score < threshold1Third) {
        result = "red";
        level = "Низкий";
    } else if (score > threshold2Third) {
        result = "green";
        level = "Высокий";
    } else {
        result = "yellow";
        level = "Средний";
    }

    container.innerHTML = `
    <h2 class="test__title title">Поздравляем, вы прошли тест!</h2>
    <div class="results">
        <p class="result__text desc">Ваш результат:</p>
        <h3 class="result__title">${level} уровень цифровой безопасности</h3>
        <div class="result__content">
            <img class="result__img" src="img/${result}.png">
            <div class="result__card">
                <h3 class="result__card-answers">Правильных<br>ответов:</h3>
                <span class="result__card-number title">${score}/${questions.length}</span>
            </div>
        </div>
        <a class="result__btn btn" href="#secure">Рекомендации по защите</a>
    </div>
    `;
    animateResult();
}

wrapper.addEventListener('change', (event) => {
    if (event.target.name === 'answer') {
        const form = wrapper.querySelector('.test__form');
        const btn = form.querySelector('.test__btn');

        btn.disabled = false;
    }
});

wrapper.addEventListener('submit', (e) => {
    e.preventDefault();

    const form = e.target;
    const selectedAnswer = form.querySelector('input[name="answer"]:checked').value;

    if (selectedAnswer == questions[currentQuestion]["correct"]) {
        score++
    }

    currentQuestion++

    if (currentQuestion < questions.length)
        showTest()
    else {
        showResult()
    }
});

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate');
        }
    });
}, { threshold: 0.1 });

document.querySelectorAll('section').forEach(section => {
    observer.observe(section);
});

function initCenteredScroll() {
    document.addEventListener('click', (event) => {
        const link = event.target.closest('a[href^="#"], button[href^="#"]');
        if (!link) return;

        const href = link.getAttribute('href');
        if (!href || href === '#!' || href === '#') return;

        const targetId = href.slice(1);
        const target = document.getElementById(targetId);
        if (!target) return;

        event.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'center' });
    });
}

initCenteredScroll();

document.querySelectorAll('.card__btn').forEach(btn => {
    btn.addEventListener('click', () => {
        btn.closest('.card').classList.toggle('flipped');
    });
});

left.addEventListener('click', () => {
    booklet.classList.remove('right-active');
    left.classList.add('active');
    right.classList.remove('active');
});

right.addEventListener('click', () => {
    booklet.classList.add('right-active');
    right.classList.add('active');
    left.classList.remove('active');
});