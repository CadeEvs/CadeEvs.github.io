const questionsAndAnswers = [
    {
        question: "How should the children be laid out?",
        answers: [
            "A horizontal or vertical list",
            "A grid/tile"
        ]
    },
    {
        question: "Will the children be created at runtime or static?",
        answers: [
            "Runtime, while Playing",
            "Static, created in th designer"
        ]
    },
    {
        question: "Should all items be visible on the screen at once or will you need to scroll?",
        answers: [
            "All visible at once",
            "Need to scroll"
        ]
    }
];

// Elements
let questionLabel;
let answer1;
let answer2;

// Questions
let hasTileLayout = false;
let hasRuntimeChildren = false;
let isAllVisible = false;

let currentQuestion = 0;

function onAnswerClicked(isSecond) {
    const circles = document.querySelectorAll('.circle');
    
    if (currentQuestion === 3) {
        // Restart
        
        currentQuestion = 0;
        displayQuestion()

        const circles = document.querySelectorAll('.circle');
        for (let i = 0; i < 4; i++) {
            circles[i].classList.remove('opaque');
        }
    }
    
    switch (currentQuestion) {
        case 0:
            hasTileLayout = isSecond;
            break;
        case 1:
            hasRuntimeChildren = isSecond;
            break;
        case 2:
            isAllVisible = isSecond;
            break;
    }
    
    currentQuestion++;
    
    if (currentQuestion === 3) {
        displayResult();
        
        circles[2].classList.add("opaque");
    }
    else {
        displayQuestion(currentQuestion);
        
        circles[currentQuestion - 1].classList.add("opaque");
    }
}

function displayResult() {
    if (hasTileLayout) {
        if (hasRuntimeChildren) {
            if (isAllVisible) {
                questionLabel.textContent = "Dynamic Entry Box";
            }
            else {
                questionLabel.textContent = "Tile View";
            }
        }
        else {
            if (isAllVisible) {
                questionLabel.textContent = "Wrap Box";
            }
            else {
                questionLabel.textContent = "Wrap Box with Scroll Box";
            }
        }
    }
    else {
        if (hasRuntimeChildren) {
            if (isAllVisible) {
                questionLabel.textContent = "Dynamic Entry Box";
            }
            else {
                questionLabel.textContent = "List View";
            }
        }
        else {
            if (isAllVisible) {
                questionLabel.textContent = "Horizontal/Vertical Box";
            }
            else {
                questionLabel.textContent = "Horizontal/Vertical Box with Scroll Box";
            }
        }
    }

    answer1.textContent = "Restart";
    answer2.style.visibility = "hidden";
}

function displayQuestion() {
    const firstQuestion = questionsAndAnswers[currentQuestion].question;
    const firstAnswers = questionsAndAnswers[currentQuestion].answers;

    questionLabel.textContent = firstQuestion;
    answer1.textContent = firstAnswers[0];
    answer2.textContent = firstAnswers[1];

    answer2.style.visibility = "visible";
}

function onWindowLoaded() {
    questionLabel = document.getElementById("question");
    answer1 = document.getElementById("answer-1");
    answer2 = document.getElementById("answer-2");

    answer1.onclick = function () {
        onAnswerClicked(false);
    };
    answer2.onclick = function () {
        onAnswerClicked(true);
    };

    displayQuestion();
}

window.addEventListener("load", onWindowLoaded);
