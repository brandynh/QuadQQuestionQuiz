// Selectors to elements in HTML

const startButtonEl = document.getElementById('startButton');
const nextButtonEl = document.getElementById('nextButton');
const answerChoiceBoxEl = document.getElementById('answerChoiceBox');
const titleEl = document.getElementById('title');
const questionBoxEl = document.getElementById('questionBox');
const answerButtonsEl = document.getElementById('answerChoices');
const choiceButtonEl = document.getElementById('choiceBtn');
const timerBoxEl = document.getElementById('timerBox');
const timerEl = document.getElementById('timer');
const scoreBoxEl = document.getElementById('scoreBox')
const scoreEl = document.getElementById('score');
const gameStatsEl = document.getElementById('gameStats');


//Array of Objects

const questionList = [
    {
        question: "Question 1",
        answers: [
            { text: 'Y', correct: true },
            { text: 'N', correct: false },
            { text: 'N', correct: false },
            { text: 'N', correct: false },
        ]
    },
    {
        question: "Question 2",
        answers: [
            { text: 'N.', correct: false },
            { text: 'N.', correct: false },
            { text: 'Y.', correct: true },
            { text: 'N.', correct: false },
        ],
    },
    {
        question: "Question 3",
        answers: [
            { text: '.Y', correct: true },
            { text: '.N', correct: false },
            { text: '.N', correct: false },
            { text: '.N', correct: false },
        ],
    }
]

// Let variable initalized at undefined to be changed for randoming question and tracking question number
let randomizeQuestions, currentQuestionNumber;
// Let variable initalized at undefined to track users score
let userScore = 0;

// Event listeners for control buttons

startButtonEl.addEventListener('click', beginGame);
nextButtonEl.addEventListener('click', () => {
    currentQuestionNumber++;
    nextQuestion();
});


// Start game function

function beginGame() {
    // Hiding elements in HTML after clicking start
    startButtonEl.classList.add('hide');
    titleEl.classList.add('hide');
    // Unhide next button when start is clicked
    nextButtonEl.classList.remove('hide');
    //Displays default score at 0
    scoreEl.textContent = userScore;
    // Calls timer function
    timer();
    // Setting variable array to randomize and sort Objects within Array to assure we don't random a question multiple times
    randomizeQuestions = questionList.sort(() => Math.random() - .5);
    // Setting question Index to track question number
    currentQuestionNumber = 0;
    // Unhide answers when start is clicked
    answerChoiceBoxEl.classList.remove('hide');
    questionBoxEl.classList.remove('hide');
    scoreBoxEl.classList.remove('hide');
    // Calls next question function
    nextQuestion();
}

// This function allows the next question to display

function nextQuestion() {
    resetQuestion();
    showQuestion(randomizeQuestions[currentQuestionNumber]);

}

function showQuestion(question) {
    questionBoxEl.innerText = question.question;
    question.answers.forEach(answer => {
        const button = document.createElement('button')
        button.innerText = answer.text;
        button.classList.add('choiceButton');
        if (answer.correct) {
            button.dataset.correct = answer.correct
        }
        button.addEventListener('click', userChoice);
        answerButtonsEl.appendChild(button);
    });

}

function resetQuestion() {
    nextButtonEl.classList.add('hide');
    while (answerButtonsEl.firstChild) {
        answerButtonsEl.removeChild(answerButtonsEl.firstChild);
    }
}

function userChoice(event) {
    const userSelection = event.target;
    const correct = userSelection.dataset.correct;
    Array.from(answerButtonsEl.children).forEach(button => {
        setStatusClass(button, button.dataset.correct)})
    if(userSelection.dataset.correct){
        userScore += 5;
        nextButtonEl.classList.remove('hide');
        updateUserScore()
    } else {
        userScore--;
        updateUserScore();
    }
    if (randomizeQuestions.length > currentQuestionNumber + 1) {
        nextButtonEl.classList.remove('hide')
    } else {
        endGame();
    }
}

function setStatusClass(element, correct) {
    removeClassStatus(element);
    if (correct) {
        element.classList.add('correct');
    } else {
        element.classList.add('incorrect');
    }
}

function removeClassStatus(element) {
    element.classList.add('correct')
    element.classList.add('incorrect')
    element.classList.remove('hide');
}

function timer() {
    var timeRemaining = 3;
    timerBoxEl.classList.remove('hide');

    var interval = setInterval(function () {
        if (timeRemaining >= 1) {
            timerEl.textContent = 'Time Left: ' + timeRemaining;
            timeRemaining--;
        } else {
            timerEl.textContent = '';
            timerBoxEl.classList.add('hide');
            clearInterval(timeRemaining);
            endGame();
        }
    }, 1000);
}

function updateUserScore() {
    scoreEl.textContent = userScore;
}

function endGame () {
    window.location.href="highScore.html";
}

