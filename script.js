const questions = [
    {
        question: "¿List@ para comenzar esta maravillosa aventura conmigo?",
        options: ["Sí, estoy list@", "No, necesito pensarlo"],
        type: "choice"
    },
    {
        question: "yo se que si",
        options: ["Sí, era bormita amor", "No"],
        type: "choice"
    },
    {
        question: "aun no? come mierda",
        options: ["vamos a la pregunta"],
        type: "choice"
    },
    {
        question: "¿Me amas, mi amor?",
        options: ["Sí", "No"],
        type: "choice"
    },
    {
        question: "¿Me amas, mi amor?",
        options: ["Sí", "No"],
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
        message: "Nunca lo olvides QUE TU ERES LA MEJOR LA MAS HERMOSA Y BELLA porfavor no olvides de cuánto te amo eres la que esta de mi corazón. ¡Eres mi princesa y te amooooooooo con mi alma y todo mi corazon! ❤️💖",
        options: ["Sí, yo también te amo", "No, no siento lo mismo"],
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
    welcomeScreen.classList.add('hidden');
    surveyScreen.classList.remove('hidden');
    showQuestion();
    updateProgressBar();
}

function showQuestion() {
    const question = questions[currentQuestion];
    questionContainer.innerHTML = `<h2>${question.question}</h2>`;
    optionsContainer.innerHTML = '';

    if (question.message) {
        questionContainer.innerHTML += `<p>${question.message}</p>`;
    }

    if (question.type === 'choice') {
        question.options.forEach((option, index) => {
            const button = document.createElement('button');
            button.textContent = option;
            button.classList.add('btn-secondary', 'animate__animated', 'animate__fadeIn');
            button.style.animationDelay = `${index * 0.1}s`;
            button.addEventListener('click', () => selectOption(option));
            optionsContainer.appendChild(button);
        });
    } else if (question.type === 'slider') {
        const slider = document.createElement('input');
        slider.type = 'range';
        slider.min = '1';
        slider.max = '10';
        slider.value = '5';
        slider.classList.add('animate__animated', 'animate__fadeIn');
        
        const sliderValue = document.createElement('span');
        sliderValue.textContent = slider.value;
        
        slider.addEventListener('input', () => {
            sliderValue.textContent = slider.value;
        });
        
        const submitButton = document.createElement('button');
        submitButton.textContent = 'Confirmar';
        submitButton.classList.add('btn-primary', 'animate__animated', 'animate__fadeIn');
        submitButton.addEventListener('click', () => selectOption(slider.value));
        
        optionsContainer.appendChild(slider);
        optionsContainer.appendChild(sliderValue);
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
        submitButton.addEventListener('click', () => selectOption(input.value));
        optionsContainer.appendChild(submitButton);
    }
}

function selectOption(option) {
    answers.push(option);

    if (currentQuestion === 1 && option === "Sí") {
        showHearts();
    }

    if (currentQuestion < questions.length - 1) {
        currentQuestion++;
        showQuestion();
        updateProgressBar();
    } else {
        showSummary();
    }
}

function showHearts() {
    for (let i = 0; i < 20; i++) {
        const heart = document.createElement('div');
        heart.className = 'heart';
        heart.style.left = `${Math.random() * 100}vw`;
        heart.style.animationDuration = `${Math.random() * 3 + 2}s`;
        heart.style.fontSize = `${Math.random() * 20 + 10}px`;
        heart.innerHTML = '❤️';
        heartsContainer.appendChild(heart);

        setTimeout(() => {
            heart.remove();
        }, 5000);
    }
}

function showSummary() {
    surveyScreen.classList.add('hidden');
    summaryScreen.classList.remove('hidden');

    const summaryContent = document.getElementById('summary-content');
    summaryContent.innerHTML = `
        <p><strong>¿List@ para comenzar?:</strong> ${answers[0]}</p>
        <p><strong>¿Me amas?:</strong> ${answers[1]}</p>
        <p><strong>Lugar próximo de viaje:</strong> ${answers[2]}</p>
        <p><strong>Nivel de amor (1-10):</strong> ${answers[3]}</p>
        <p><strong>Mensaje Especial de Amor:</strong> ${answers[4]}</p>
    `;
}

function updateProgressBar() {
    const progress = (currentQuestion / questions.length) * 100;
    progressBar.style.width = `${progress}%`;
}

function restartSurvey() {
    currentQuestion = 0;
    answers.length = 0;
    summaryScreen.classList.add('hidden');
    surveyScreen.classList.remove('hidden');
    showQuestion();
    updateProgressBar();
}

function shareOnWhatsApp() {
    const phoneNumber = "+51918555152";
    const message = encodeURIComponent(`¡Hola mi amor! Aquí están mis respuestas a tu encuesta de amor:\n\n${answers.join('\n')}`);
    window.open(`https://wa.me/${phoneNumber}?text=${message}`, '_blank');
}

// Inicializar corazones flotantes
function initFloatingHearts() {
    setInterval(() => {
        const heart = document.createElement('div');
        heart.className = 'heart';
        heart.style.left = `${Math.random() * 100}vw`;
        heart.style.animationDuration = `${Math.random() * 3 + 2}s`;
        heart.style.fontSize = `${Math.random() * 10 + 5}px`;
        heart.innerHTML = '❤️';
        heartsContainer.appendChild(heart);

        setTimeout(() => {
            heart.remove();
        }, 5000);
    }, 300);
}

initFloatingHearts();