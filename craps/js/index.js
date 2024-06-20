import { BetTypes } from "./bet.js";
import { BetOptions, StandardPropKeys } from "./bet-options.js";
import { updateDice } from "./die.js";
import { Quiz } from "./quiz.js";

export const answerBox = document.getElementById("answerBox");
export const answerButton = document.getElementById("answerButton");
export const betTypes = BetTypes();
export const betTypeList = document.getElementById("betTypeList");
export const betQuestionLabel = document.getElementById("betQuestionLabel");
export const questionCountBox = document.getElementById("questionCountBox");
export const resetButton = document.getElementById("resetButton");
export const timerLabel = document.getElementById("timerLabel");
export const answersCountLabel = document.getElementById("answersCountLabel");
export const questionCountLabel = document.getElementById("questionCountLabel");
export const countOfIncorrectAnswersLabel = document.getElementById("countOfIncorrectAnswersLabel");
export const countOfCorrectAnswersLabel = document.getElementById("countOfCorrectAnswersLabel");
export const questionList = document.getElementById("questionList");
export const gameComplete = document.getElementById("gameComplete");

const settingsButton = document.getElementById("settingsButton");
const settingsDialog = document.getElementById("settingsDialog");
const closeButton = document.querySelector(".close-button");
let quiz = null;
settingsButton.addEventListener("click", () => {
    settingsDialog.classList.add("show");
});

closeButton.addEventListener("click", () => {
    settingsDialog.classList.remove("show");
});

window.addEventListener("click", (event) => {
    if (event.target === settingsDialog) {
        settingsDialog.classList.remove("show");
    }
});

function initialize() {
    if (localStorage.getItem("questionCountBox")) {
        questionCountBox.value = localStorage.getItem("questionCountBox");
    }

    let list = [];
    betTypes.forEach(b => {
        const checked = localStorage.getItem(b) ? "" : "checked";
        list.push(`<li><input type="checkbox" data-bet-name="${b}" ${checked}>${b}</li>`);
    });

    betTypeList.innerHTML = list.join('');

    let nodes = betTypeList.querySelectorAll("input");
    [].filter.call(nodes, function (checkbox) {
        checkbox.onclick = function () {
            const key = checkbox.dataset.betName;
            if (checkbox.checked)
                localStorage.removeItem(key);
            else
                localStorage.setItem(key, "unchecked");
        };
    });

    questionCountBox.onchange = () => {
        window.localStorage.setItem('questionCountBox', questionCountBox.value);
    };

    resetButton.onclick = newQuiz;
}

function newQuiz() {
    answerBox.value = "";
    betQuestionLabel.innerText = "";
    betQuestionLabel.classList.remove("hideValue");
    gameComplete.classList.add("hideValue");
    answerBox.focus();
    timerLabel.innerText = "00:00:00.000";

    if (quiz) quiz.stop();

    quiz = new Quiz(questionCountBox.value, onQuestionTimeUpdate, function (quiz, question) {
        betQuestionLabel.innerText = question.name;
        updateDice(question.bet.dice);
        let selectedNode = document.querySelector(`ul#questionList li.selected`);
        if (selectedNode) selectedNode.classList.remove("selected");
        const nodes = document.querySelectorAll(`ul#questionList li`);
        if (nodes.length > quiz.selectedIndex && quiz.selectedIndex > -1) {
            selectedNode = nodes[quiz.selectedIndex];
            const prevNode = nodes[quiz.selectedIndex - 1];
            selectedNode.classList.add("selected");
            if (prevNode) prevNode.scrollIntoView(true);
        }
    });

    quiz.onTimeUpdate = (stopWatch) => {
        timerLabel.innerText = stopWatch.value;
    };

    answersCountLabel.innerText = 0;
    questionCountLabel.innerText = questionCountBox.value;
    countOfCorrectAnswersLabel.innerText = 0;
    countOfIncorrectAnswersLabel.innerText = 0;

    const list = [];
    for (let i = 0; i < quiz.questions.length; i++) {
        const question = quiz.questions[i];
        list.push(`<li>${question.name}<span class="questionStopWatchLabel"></span></li>\r\n`);
    }
    questionList.innerHTML = list.join("");
    const nodes = document.querySelectorAll(`ul#questionList li`);
    for (let i = 0; i < nodes.length; i++) {
        const node = nodes[i];
        node.onclick = _ => {
            quiz.goto(i);
            answerButton.focus();
        };
    }

    window.quiz = quiz;
}

answerButton.onclick = () => {
    const nodes = document.querySelectorAll(`ul#questionList li`);
    if (betQuestionLabel.classList.contains("hideValue")) return;
    const question = quiz.selection;
    if (question) {
        question.answer = +answerBox.value;
        const currentNode = nodes[quiz.selectedIndex];
        if (currentNode) {
            currentNode.classList.remove(!question.isCorrect ? "correct" : "incorrect");
            currentNode.classList.add(question.isCorrect ? "correct" : "incorrect");
        }
        answersCountLabel.innerText = quiz.countOfCorrectAnswers;
        countOfIncorrectAnswersLabel.innerText = quiz.countOfIncorrectAnswers;
        countOfCorrectAnswersLabel.innerText = quiz.countOfCorrectAnswers;
        if (quiz.complete) {
            quiz.stopWatch.stop();
            gameComplete.classList.remove("hideValue");
            return;
        }
        quiz.next();
    }
    answerBox.value = "";
    answerBox.focus();
};

answerBox.addEventListener("keyup", function (event) {
    if (event.keyCode === 13) {
        event.preventDefault();
        answerButton.click();
    } else {
        const question = quiz.selection;
        if (question && question.bet.payout == +answerBox.value) {
            answerButton.click();
        }
    }
});

function onQuestionTimeUpdate(stopWatch, index) {
    const nodes = document.querySelectorAll(`ul#questionList li`);
    if (nodes.length > index) {
        const node = nodes[index].querySelector("span.questionStopWatchLabel");
        node.innerText = stopWatch.value;
    }
}

initialize();
newQuiz();
