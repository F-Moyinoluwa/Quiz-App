const questions = [
  {
    question: "Which HTML tag is used for inserting an image?",
    answers: [
      { text: "<img>", correct: true },
      { text: "<image>", correct: false },
      { text: "<pic>", correct: false },
      { text: "<src>", correct: false },
    ],
  },

  {
    question: "Which CSS property changes text color?",
    answers: [
      { text: "font-color", correct: false },
      { text: "text-color", correct: false },
      { text: "color", correct: true },
      { text: "background-color", correct: false },
    ],
  },

  {
    question: "What does DOM stand for?",
    answers: [
      { text: "Document Object Model", correct: true },
      { text: "Data Output Method", correct: false },
      { text: "Digital Order Management", correct: false },
      { text: "Display Output Machine", correct: false },
    ],
  },

  {
    question: "Which JavaScript method selects an element by ID?",
    answers: [
      { text: "getElementById()", correct: true },
      { text: "querySelector()", correct: false },
      { text: "getById()", correct: false },
      { text: "selectElement()", correct: false },
    ],
  },

  {
    question: "Which of the following is a JavaScript framework?",
    answers: [
      { text: "React", correct: true },
      { text: "Bootstrap", correct: false },
      { text: "HTML", correct: false },
      { text: "CSS", correct: false },
    ],
  },

  {
    question: "What is the capital of Nigeria?",
    answers: [
      { text: "Berlin", correct: false },
      { text: "Abuja", correct: true },
      { text: "Rome", correct: false },
      { text: "Madrid", correct: false },
    ],
  },

  {
    question: "Which language runs in a web browser?",
    answers: [
      { text: "Python", correct: false },
      { text: "Java", correct: false },
      { text: "C", correct: false },
      { text: "JavaScript", correct: true },
    ],
  },

  {
    question: "Which of the following is not a Data type?",
    answers: [
      { text: "String", correct: false },
      { text: "Boolean", correct: false },
      { text: "Number", correct: false },
      { text: "function", correct: true },
    ],
  },

  {
    question: "Which of the following is not a JavaScript framework?",
    answers: [
      { text: "React", correct: false },
      { text: "Angular", correct: false },
      { text: "Java", correct: true },
      { text: "Vue", correct: false },
    ],
  },

  {
    question: "Which of the following is not a css framework?",
    answers: [
      { text: "Bootstrap", correct: false },
      { text: "Tailwind", correct: false },
      { text: "Pinia", correct: true },
      { text: "Bulma", correct: false },
    ],
  },
];

const startScreen = document.getElementById("start-screen");
const quizScreen = document.getElementById("quiz-screen");
const usernameInput = document.getElementById("username");
const startBtn = document.getElementById("start-btn");

const questionEl = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextBtn = document.getElementById("next-btn");
const timeDisplay = document.getElementById("time");
const greeting = document.getElementById("greeting");
const time = document.getElementById("time");

let currentQuestionIndex = 0;
let score = 0;
let timer;
let timeLeft = 25;

let name;
startBtn.addEventListener("click", () => {
  name = usernameInput.value.trim();

  if (name === "") {
    alert("Please enter your name.");
    return;
  }
  greeting.innerText = `Good luck, ${name}!`;
  startScreen.style.display = "none";
  quizScreen.style.display = "block";
  startQuiz();
});

function startQuiz() {
  currentQuestionIndex = 0;
  score = 0;
  showQuestion();
  timeDisplay.innerText = `Time: ${timeLeft} secs`;
  startTimer();
  showQuestion();
}

function showQuestion() {
  resetState();
  // startTimer();
  let currentQuestion = questions[currentQuestionIndex];
  questionEl.innerText = currentQuestion.question;

  currentQuestion.answers.forEach((answer) => {
    const button = document.createElement("button");
    button.innerText = answer.text;
    if (answer.correct) button.dataset.correct = true;
    button.addEventListener("click", selectAnswer);
    answerButtons.appendChild(button);
  });
}

function resetState() {
  nextBtn.style.display = "none";
  answerButtons.innerHTML = "";
}

function startTimer() {
  timer = setInterval(() => {
    timeLeft--;
    timeDisplay.innerText = `Time: ${timeLeft} secs`;
    if (timeLeft <= 0) {
      clearInterval(timer);
      showScore();
      // showCorrectAnswer();
    }
  }, 1000);
}

function selectAnswer(e) {
  const selectedBtn = e.target;
  const isCorrect = selectedBtn.dataset.correct === "true";

  if (isCorrect) {
    selectedBtn.classList.add("correct");
    score++;
  } else {
    selectedBtn.classList.add("wrong");
  }

  showCorrectAnswer();
}

function showCorrectAnswer() {
  Array.from(answerButtons.children).forEach((button) => {
    button.disabled = true;
    if (button.dataset.correct === "true") {
      button.classList.add("correct");
    }
  });
  nextBtn.style.display = "block";
}

nextBtn.addEventListener("click", () => {
  currentQuestionIndex++;
  if (currentQuestionIndex < questions.length) {
    showQuestion();
  } else {
    showScore();
  }
});

function showScore() {
  timeDisplay.innerText = "Score";
  resetState();
  if (score < 5) {
    greeting.innerText = `Weldone ${name}, Try again!`;
  }
  questionEl.innerText = `You scored ${score} out of ${questions.length}!`;
  nextBtn.innerText = "Play Again";
  nextBtn.style.display = "block";
  nextBtn.onclick = () => location.reload(); // restart quiz
}
