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
const returnButtonEl = document.getElementById('returnHome');
const highScoreButtonEl = document.getElementById('highScoreScreen');


//Array of Objects Setting questions, answers, and boolean for correct and incorrect choice check

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

// Let variable for timer
let timeRemaining = 20;
// Let variable initalized at undefined to be changed for randoming question and tracking question number
let randomizeQuestions, currentQuestionNumber;
// Let variable initalized at undefined to track users score
let userScore = 0;

// Event listeners for control buttons

    startButtonEl.addEventListener('click', beginGame)
    nextButtonEl.addEventListener('click', () => {
    currentQuestionNumber++;
    nextQuestion();
    });
    returnButtonEl.addEventListener('click', returnHome);
    highScoreButtonEl.addEventListener('click', highScoreScreen);
// Start game function

function beginGame() {
    // Hiding elements in HTML after clicking start
    startButtonEl.classList.add('hide');
    titleEl.classList.add('hide');
    highScoreButtonEl.classList.add('hide');
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

// This function populates the question box with the next question as well as remove old answer button elements and append and assign new ones

function showQuestion(question) {
    questionBoxEl.innerText = question.question;
    // Run a for each look through the array of elements winith answers. For each element we will create a button set the text to the text with answer array add the choiceButton class to the button and set data set for correct answer
    question.answers.forEach(answer => {
        const button = document.createElement('button')
        button.innerText = answer.text;
        button.classList.add('choiceButton');
        if (answer.correct) {
            button.dataset.correct = answer.correct
        }
        // adding event listner to new buttons
        button.addEventListener('click', userChoice);
        // Appends new answer buttons to botton of button list
        answerButtonsEl.appendChild(button);
    });

}

// This function hides the next button and removes the previous answer buttons
function resetQuestion() {
    nextButtonEl.classList.add('hide');
    // While the previous answerbutton elements exist remove them.
    while (answerButtonsEl.firstChild) {
        answerButtonsEl.removeChild(answerButtonsEl.firstChild);
    }
}

//This function determines if the users selection is correct or incorrect, increments or decrements score, and ends the game if there are no more questions.
function userChoice(event) {
    const userSelection = event.target;
    const correct = userSelection.dataset.correct;
    // S
    Array.from(answerButtonsEl.children).forEach(button => {
        setStatusClass(button, button.dataset.correct)
    })
    if (userSelection.dataset.correct) {
        userScore += 5;
        timeRemaining +=2;
        nextButtonEl.classList.remove('hide');
        updateUserScore()
    } else {
        userScore--;
        updateUserScore();
    }
    if (randomizeQuestions.length > currentQuestionNumber + 1) {
        nextButtonEl.classList.remove('hide')
    } else {
        highScoreScreen();
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
    timerBoxEl.classList.remove('hide');

    var interval = setInterval(function () {
        if (timeRemaining >= 1) {
            timerEl.textContent = 'Time Left: ' + timeRemaining;
            timeRemaining--;
        } else {
            timerEl.textContent = '';
            timerBoxEl.classList.add('hide');
            clearInterval(timeRemaining);
            highScoreScreen();
        }
    }, 1000);
}

function updateUserScore() {
    scoreEl.textContent = userScore;
}

function highScoreScreen() {
    window.location.href = "highScore.html";
    returnButtonEl.classList.remove('hide')

}

function returnHome() {
    window.location.href = "index.html"
    returnButtonEl.classList.add('hide')
    highScoreButtonEl.classList.remove('hide');
}
