const questionsAndAnswers = [
    {
        question: "How should the children be laid out?",
        answers: [
            "A horizontal or vertical list",
            "A grid"
        ]
    },
    {
        question: "Will the children be created at runtime or static?",
        answers: [
            "Runtime, while Playing",
            "Static, created in the designer"
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
let resultDescription;
let answer1;
let answer2;

// Questions
let hasTileLayout = false;
let hasStaticChildren = false;
let doesRequireScroll = false;

let currentQuestion = 0;

function onAnswerClicked(isSecond) {
    const circles = document.querySelectorAll('.circle');
    
    if (currentQuestion === 3) {
        // Restart
        
        currentQuestion = 0;
        displayQuestion()

        const circles = document.querySelectorAll('.circle');
        for (let i = 0; i < 3; i++) {
            circles[i].classList.remove('opaque');
        }
    }
    else {
        switch (currentQuestion) {
            case 0:
                hasTileLayout = isSecond;
                break;
            case 1:
                hasStaticChildren = isSecond;
                break;
            case 2:
                doesRequireScroll = isSecond;
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
}

function displayResult() {
    resultDescription.textContent = "";
    
    if (hasTileLayout) {
        if (hasStaticChildren) {
            if (doesRequireScroll) {
                questionLabel.textContent = "Wrap Box";
            }
            else {
                questionLabel.textContent = "Wrap Box with Scroll Box";
            }
        }
        else {
            if (doesRequireScroll) {
                questionLabel.textContent = "Dynamic Entry Box";
                resultDescription.textContent = "A Dynamic Entry Box is the catch all for when you want to generate widgets at runtime, but don't require scrolling or virtualization. Dynamic Entry Box children are pooled, meaning a destroyed child instance can be reused for new children which improves performance and hitching."
            }
            else {
                questionLabel.textContent = "Tile View";
                resultDescription.textContent = "A Tile View is good for when you need to generate many children at runtime which can be scrolled through. It supports virtualization meaning only the visible children will be rendered (and ones not visible will be destroyed), which can give you a huge performance boost."
            }
        }
    }
    else {
        if (hasStaticChildren) {
            if (doesRequireScroll) {
                questionLabel.textContent = "Horizontal/Vertical Box with Scroll Box";
            }
            else {
                questionLabel.textContent = "Horizontal/Vertical Box";
            }
        }
        else {
            if (doesRequireScroll) {
                questionLabel.textContent = "List View";
                resultDescription.textContent = "A List View is good for when you need to generate many children at runtime which can be scrolled through. It supports virtualization meaning only the visible children will be rendered (and ones not visible will be destroyed), which can give you a huge performance boost."
            }
            else {
                questionLabel.textContent = "Dynamic Entry Box";
                resultDescription.textContent = "A Dynamic Entry Box is the catch all for when you want to generate widgets at runtime, but don't require scrolling or virtualization. Dynamic Entry Box children are pooled, meaning a destroyed child instance can be reused for new children which improves performance and hitching."
            }
        }
    }

    answer1.textContent = "Restart";
    answer2.style.visibility = "hidden";
    resultDescription.style.visibility = "visible";
}

function displayQuestion() {
    const firstQuestion = questionsAndAnswers[currentQuestion].question;
    const firstAnswers = questionsAndAnswers[currentQuestion].answers;

    questionLabel.textContent = firstQuestion;
    answer1.textContent = firstAnswers[0];
    answer2.textContent = firstAnswers[1];

    answer2.style.visibility = "visible";
    resultDescription.style.visibility = "hidden";
}

function onWindowLoaded() {
    questionLabel = document.getElementById("question");
    answer1 = document.getElementById("answer-1");
    answer2 = document.getElementById("answer-2");
    resultDescription = document.getElementById("result-description");

    answer1.onclick = function () {
        onAnswerClicked(false);
    };
    answer2.onclick = function () {
        onAnswerClicked(true);
    };

    displayQuestion();
}

window.addEventListener("load", onWindowLoaded);
