const questions = [
    {
        question: "¿Lista para comenzar esta maravillosa aventura conmigo?",
        options: ["Sí, estoy lista", "No, deja lo pienso"],
        type: "choice"
    },
    {
        question: "Yo sé que sí quieres, mi amor",
        options: ["Sí, era bromita amor", "No, en serio necesito pensarlo"],
        type: "choice"
    },
    {
        question: "Yo sé que sí quieres, mi amor",
        options: ["Sí, era bromita amor", "No, en serio quiero pensarlo"],
        type: "choice",
        message: "COME MRD PS"
    },
    {
        question: "¿Aún no? Vamos, mi amor, no me hagas esperar",
        options: ["Está bien, vamos a la siguiente pregunta"],
        type: "choice"
    },
    {
        question: "¿Me amas, mi amor?",
        options: ["Sí, con todo mi corazón", "No"],
        type: "choice"
    },
    {
        question: "¿Estás completamente segur@?",
        options: ["Sí, estoy segur@", "Déjame pensarlo de nuevo"],
        type: "choice"
    },
    {
        question: "¿Cuál es nuestro próximo destino de ensueño, cariño?",
        options: ["Ica", "Machu Picchu", "Otro"],
        type: "choice"
    },
    {
        question: "En una escala del 1 al 10, ¿cuánto me amas?",
        type: "slider"
    },
    {
        question: "Antes de finalizar, quiero decirte algo muy especial, mi amor...",
        message: "Nunca lo olvides: TÚ ERES LA MEJOR, LA MÁS HERMOSA Y BELLA. Por favor, no olvides cuánto te amo. Eres la dueña de mi corazón. ¡Eres mi princesa y te amooooooooo con mi alma y todo mi corazón! ❤️💖",
        options: ["Yo también te amo con todo mi ser", "Necesito tiempo para procesar esto"],
        type: "choice"
    }
];

let currentQuestion = 0;
const answers = [];

// DOM Elements
const app = document.getElementById('app');
const welcomeScreen = document.getElementById('welcome-screen');
const surveyScreen = document.getElementById('survey-screen');
const summaryScreen = document.getElementById('summary-screen');
const questionContainer = document.getElementById('question-container');
const optionsContainer = document.getElementById('options-container');
const startButton = document.getElementById('start-button');
const restartButton = document.getElementById('restart-button');
const whatsappButton = document.getElementById('whatsapp-button');
const progressBar = document.getElementById('progress-bar');
const heartsContainer = document.getElementById('hearts-container');

// Event Listeners
startButton.addEventListener('click', startSurvey);
restartButton.addEventListener('click', restartSurvey);
whatsappButton.addEventListener('click', shareOnWhatsApp);

function startSurvey() {
    welcomeScreen.classList.add('animate__animated', 'animate__fadeOut');
    setTimeout(() => {
        welcomeScreen.classList.add('hidden');
        surveyScreen.classList.remove('hidden');
        surveyScreen.classList.add('animate__animated', 'animate__fadeIn');
        showQuestion();
        updateProgressBar();
    }, 500);
}

function showQuestion() {
    const question = questions[currentQuestion];
    questionContainer.innerHTML = `<h2 class="animate__animated animate__bounceIn">${question.question}</h2>`;
    optionsContainer.innerHTML = '';

    if (question.message) {
        questionContainer.innerHTML += `<p class="animate__animated animate__fadeIn">${question.message}</p>`;
    }

    if (question.type === 'choice') {
        question.options.forEach((option, index) => {
            const button = document.createElement('button');
            button.textContent = option;
            button.classList.add('btn-secondary', 'animate__animated', 'animate__fadeInUp');
            button.style.animationDelay = `${index * 0.1}s`;
            button.addEventListener('click', () => selectOption(option));
            optionsContainer.appendChild(button);
        });
    } else if (question.type === 'slider') {
        const sliderContainer = document.createElement('div');
        sliderContainer.classList.add('slider-container', 'animate__animated', 'animate__fadeIn');
        
        const slider = document.createElement('input');
        slider.type = 'range';
        slider.min = '1';
        slider.max = '10';
        slider.value = '5';
        
        const sliderValue = document.createElement('span');
        sliderValue.textContent = slider.value;
        sliderValue.classList.add('slider-value');
        
        slider.addEventListener('input', () => {
            sliderValue.textContent = slider.value;
            sliderValue.style.left = `${(slider.value - 1) * 11.1}%`;
        });
        
        const submitButton = document.createElement('button');
        submitButton.textContent = 'Confirmar';
        submitButton.classList.add('btn-primary', 'animate__animated', 'animate__fadeIn');
        submitButton.addEventListener('click', () => selectOption(slider.value));
        
        sliderContainer.appendChild(slider);
        sliderContainer.appendChild(sliderValue);
        optionsContainer.appendChild(sliderContainer);
        optionsContainer.appendChild(submitButton);
    }

    if (question.options && question.options.includes("Otro")) {
        const input = document.createElement('input');
        input.type = 'text';
        input.placeholder = 'Escribe tu lugar soñado aquí, cariño.';
        input.classList.add('animate__animated', 'animate__fadeIn');
        optionsContainer.appendChild(input);

        const submitButton = document.createElement('button');
        submitButton.textContent = 'Confirmar';
        submitButton.classList.add('btn-primary', 'animate__animated', 'animate__fadeIn');
        submitButton.addEventListener('click', () => {
            if (input.value.trim() !== '') {
                selectOption(input.value);
            } else {
                input.classList.add('animate__shakeX');
                setTimeout(() => input.classList.remove('animate__shakeX'), 1000);
            }
        });
        optionsContainer.appendChild(submitButton);
    }
}

function selectOption(option) {
    answers.push(option);

    if (currentQuestion === 3 && option.toLowerCase().includes('sí')) {
        showHearts();
    }

    if (currentQuestion < questions.length - 1) {
        currentQuestion++;
        surveyScreen.classList.add('animate__animated', 'animate__fadeOut');
        setTimeout(() => {
            surveyScreen.classList.remove('animate__fadeOut');
            showQuestion();
            surveyScreen.classList.add('animate__fadeIn');
            updateProgressBar();
        }, 500);
    } else {
        showSummary();
    }
}

function showHearts() {
    for (let i = 0; i < 20; i++) {
        const heart = document.createElement('div');
        heart.className = 'heart animate__animated animate__fadeInUp';
        heart.style.left = `${Math.random() * 100}vw`;
        heart.style.animationDuration = `${Math.random() * 3 + 2}s`;
        heart.style.fontSize = `${Math.random() * 20 + 10}px`;
        heart.innerHTML = '❤️';
        heartsContainer.appendChild(heart);

        setTimeout(() => {
            heart.classList.remove('animate__fadeInUp');
            heart.classList.add('animate__fadeOutUp');
            setTimeout(() => heart.remove(), 1000);
        }, 4000);
    }
}

function showSummary() {
    surveyScreen.classList.add('animate__animated', 'animate__fadeOut');
    setTimeout(() => {
        surveyScreen.classList.add('hidden');
        summaryScreen.classList.remove('hidden');
        summaryScreen.classList.add('animate__animated', 'animate__fadeIn');

        const summaryContent = document.getElementById('summary-content');
        summaryContent.innerHTML = `
            <p class="animate__animated animate__fadeInUp"><strong>¿Lista para comenzar?:</strong> ${answers[0]}</p>
            <p class="animate__animated animate__fadeInUp" style="animation-delay: 0.1s"><strong>Confirmación:</strong> ${answers[1]}</p>
            <p class="animate__animated animate__fadeInUp" style="animation-delay: 0.2s"><strong>¿Me amas?:</strong> ${answers[4]}</p>
            <p class="animate__animated animate__fadeInUp" style="animation-delay: 0.3s"><strong>Confirmación de amor:</strong> ${answers[5]}</p>
            <p class="animate__animated animate__fadeInUp" style="animation-delay: 0.4s"><strong>Nuestro próximo destino:</strong> ${answers[6]}</p>
            <p class="animate__animated animate__fadeInUp" style="animation-delay: 0.5s"><strong>Nivel de amor (1-10):</strong> ${answers[7]}</p>
            <p class="animate__animated animate__fadeInUp" style="animation-delay: 0.6s"><strong>Mensaje final de amor:</strong> ${answers[8]}</p>
        `;
    }, 500);
}

function updateProgressBar() {
    const progress = ((currentQuestion + 1) / questions.length) * 100;
    progressBar.style.width = `${progress}%`;
}

function restartSurvey() {
    currentQuestion = 0;
    answers.length = 0;
    summaryScreen.classList.add('animate__animated', 'animate__fadeOut');
    setTimeout(() => {
        summaryScreen.classList.add('hidden');
        surveyScreen.classList.remove('hidden');
        surveyScreen.classList.add('animate__animated', 'animate__fadeIn');
        showQuestion();
        updateProgressBar();
    }, 500);
}

function shareOnWhatsApp() {
    const phoneNumber = "+51918555152";
    const message = encodeURIComponent(`¡Hola mi amor! Aquí están mis respuestas a tu encuesta de amor:\n\n${answers.join('\n')}`);
    window.open(`https://wa.me/${phoneNumber}?text=${message}`, '_blank');
}

function initFloatingHearts() {
    setInterval(() => {
        const heart = document.createElement('div');
        heart.className = 'heart background-heart';
        heart.style.left = `${Math.random() * 100}vw`;
        heart.style.animationDuration = `${Math.random() * 3 + 2}s`;
        heart.style.fontSize = `${Math.random() * 10 + 5}px`;
        heart.style.opacity = '0.3';
        heart.innerHTML = '❤️';
        heartsContainer.appendChild(heart);

        setTimeout(() => {
            heart.remove();
        }, 5000);
    }, 300);
}

initFloatingHearts();
