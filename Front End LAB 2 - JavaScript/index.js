function Question(ques, ops, ans) {
    this.ques = ques;
    this.ops = ops;
    this.ans = ans;
}

function Quiz(questions) {
    this.questions = questions;
    this.score = 0;
    this.qIndex = 0;
}

// check if all questions are answered
Quiz.prototype.isQuizEnded = function () {
    return this.qIndex === this.questions.length
}

// list of questions
let questionsList = [
    new Question("JavaScript supports which of the following?",
        ["CSS", "XHTML", "Functions", "HTML"], "Functions"),

    new Question("Which language is used for styling web pages?",
        ["HTML", "JQuery", "CSS", "XML"], "CSS"),

    new Question("Which is not a JavaScript framework?",
        ["Python Script", "JQuery", "Django", "Node.js"], "Django"),

    new Question("Which is used to connect databases?",
        ["PHP", "HTML", "JavaScript", "All"], "PHP"),

    new Question("JavaScript is a:",
        ["Language", "Programming Language", "Development", "All"], "Programming Language"),
]

let quiz = new Quiz(questionsList)

// fetch question by index of questions array 
Quiz.prototype.getQuestionByIndex = function () {
    return this.questions[this.qIndex]
}

// compare chosen option with answer
Quiz.prototype.checkOptionWithAnswer = function (option) {
    if (this.getQuestionByIndex().ans === option) {
        this.score++; // update score if correct answer 
    }

    this.qIndex++; // update question number
}

// properties of option buttons
function handleChoiceBtn(btnId, option) {
    let btn = document.getElementById(btnId)
    btn.onclick = function () {
        // check answer
        quiz.checkOptionWithAnswer(option)

        // load next question
        loadQuestion();
    }

}

// to show questions
function loadQuestion() {
    if (quiz.isQuizEnded()) {
        // show scores
        showScores();
    } else {    
        // show next question
        let question = document.getElementById("question")
        question.innerHTML = quiz.getQuestionByIndex().ques;

        let ops = quiz.getQuestionByIndex().ops;
        for (let i = 0; i < ops.length; i++) {
            let eachOption = document.getElementById("choice" + i);
            eachOption.innerHTML = ops[i];
            handleChoiceBtn("btn" + i, ops[i]);
        } showProgress();
    }
}

loadQuestion();

// to show score and percentage
function showScores() {
    let result = "<h1>Result</h1>"
    result += "<h2 id = 'score'>Your score is " + (quiz.score) + "/" + (quiz.questions.length)
        + " [" + (quiz.score / quiz.questions.length * 100) + "%]</h2>"
    let quizElem = document.getElementById("quiz")
    quizElem.innerHTML = result;
}

// to show progress of questions
function showProgress() {
    let progressElem = document.getElementById("progress")
    progressElem.innerHTML = "Question " + (quiz.qIndex + 1) + " of " + quiz.questions.length;
}


