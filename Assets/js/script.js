const startButtonEl = document.getElementById('startButton');
const nextButtonEl = document.getElementById('nextButton');
const answerChoiceBoxEl = document.getElementById('answerChoiceBox');
const titleEl = document.getElementById('title');
const questionBoxEl = document.getElementById('questionBox');
const answerButtonsEl = document.getElementById('answerChoices');
const choiceButtonEl = document.getElementById('choiceBtn');
const timerEl = document.getElementById('timerBox');


const questionList = [
    {
        question: "How many i's in this question? In April I winessed little Lizzie see an inn and walk in to it.",
        answers: [
            { text: '4', correct: true },
            { text: '10', correct: false },
            { text: '14', correct: false },
            { text: 'This game seems weird', correct: false },
        ]
    },
       {
           question: "If you have 3 apples and take 2 of those apples how many apples do you have?",
           answers: [
               {text: '1', correct: false},
               {text: '2', correct: false},
               {text: '3', correct: true},
               {text: 'It seems my intial feeling of the game was correct', correct: false},
           ],
       },
       {
           question: "QUestion 3",
           answers: [
               {text: '4', correct: true},
               {text: '10', correct: false},
               {text: '14', correct: false},
               {text: 'This game seems weird', correct: false},
           ],
       } 
]

let randomizeQuestions, currentQuestionNumber;

startButtonEl.addEventListener('click', beginGame);


function beginGame() {

    console.log('started');

    startButtonEl.classList.add('hide');
    nextButtonEl.classList.remove('hide');
    titleEl.classList.add('hide');
    timerEl.classList.remove('hide');
    timer();

    randomizeQuestions = questionList.sort(() => Math.random()- .5);

    currentQuestionNumber = 0;

    answerChoiceBoxEl.classList.remove('hide');
    questionBoxEl.classList.remove('hide');

    nextQuestion();
}

function nextQuestion() {
    showQuestion(randomizeQuestions[currentQuestionNumber]);

}

function showQuestion(question) {
    questionBoxEl.innerText = question.question;
    
}



function selectChoice(event) {

}

function timer() {
    var timeRemaining = 30;

    var interval = setInterval(function () {
        if (timeRemaining > 1) {

            timerEl.textContent ='Time Left: ' + timeRemaining ;

            timeRemaining--;
          } else {

            timerEl.textContent = '';

            clearInterval(timeInterval);
          }
        }, 30000);
}
