const players = {
    players: [
        { name: "Player 1", score: 0 },
        { name: "Player 2", score: 0 },
    ],
    outputPlayersName: function () {
        document.getElementById("playerOneName").innerHTML =
            this.players[0].name;
        document.getElementById("playerTwoName").innerHTML =
            this.players[1].name;
    },
    outputPlayersScore: function () {
        document.getElementById("playerOneScore").innerHTML =
            this.players[0].score;
        document.getElementById("playerTwoScore").innerHTML =
            this.players[1].score;
    },
};

const gameQuestions = [
    {
        text: "The capital of Italy?",
        answer: "Roma",
        tips: ["Roma", "Berlin", "Warsawa"],
    },
    {
        text: "The capital of Germany?",
        answer: "Berlin",
        tips: ["Roma", "Berlin", "Warsawa"],
    },
    {
        text: "The capital of Poland?",
        answer: "Warsawa",
        tips: ["Roma", "Berlin", "Warsawa"],
    },
    {
        text: "The capital of France?",
        answer: "Paris",
        tips: ["Roma", "Paris", "Warsawa"],
    },
    {
        text: "The capital of Spain?",
        answer: "Madrid",
        tips: ["Roma", "Berlin", "Madrid"],
    },
];

const gameProcess = {
    questionForGame: [...gameQuestions],
    indexQuestin: undefined,
    processQuestin: {},
    chooseQuestion: function () {
        if (this.questionForGame.length === 0) {
            this.questionForGame = [...gameQuestions];
        }
        this.indexQuestin = Math.floor(
            Math.random() * this.questionForGame.length
        );
        this.processQuestin = this.questionForGame[this.indexQuestin];
    },
    deleteQuestion: function () {
        this.questionForGame.splice(this.indexQuestin, 1);
        console.log(this.questionForGame);
    },
    outputQuestion: function () {
        document
            .getElementById("outputQuestion")
            .removeAttribute("class", "displayNone");
        document.getElementById("question").innerHTML =
            this.processQuestin.text;
    },
    startRound: function () {
        this.chooseQuestion();
        this.outputQuestion();
    },
    outputTips: function () {
        document
            .getElementById("outputTips")
            .removeAttribute("class", "displayNone");

        document.getElementById("tip1").innerHTML = this.processQuestin.tips[0];
        document.getElementById("tip2").innerHTML = this.processQuestin.tips[1];
        document.getElementById("tip3").innerHTML = this.processQuestin.tips[2];

        document
            .getElementById("inputTip1")
            .setAttribute("value", this.processQuestin.tips[0]);
        document
            .getElementById("inputTip2")
            .setAttribute("value", this.processQuestin.tips[1]);
        document
            .getElementById("inputTip3")
            .setAttribute("value", this.processQuestin.tips[2]);
    },
    removeInputQuestion: function () {
        document
            .getElementById("outputQuestion")
            .setAttribute("class", "displayNone");
    },
    removeTips: function () {
        document
            .getElementById("outputTips")
            .setAttribute("class", "displayNone");
    },
    checkingAnswerCorrect: function (playerAnswer) {
        playerAnswer =
            playerAnswer.charAt(0).toUpperCase() + playerAnswer.slice(1);

        const checkingSpaces = playerAnswer.split("").every((element) => {
            if (element !== " ") {
                return true;
            } else {
                alert("Відповідь має бути словом! Введіть одне слово!");
                return false;
            }
        });
        if (!checkingSpaces) {
            return false;
        }
        if (!/[a-zA-Z]/.test(playerAnswer)) {
            alert("Відповідь має бути латинецею!");
            return false;
        }
        return playerAnswer;
    },

    answerCheck: function (playerAnswer) {
        if (playerAnswer) {
            if (this.processQuestin.answer === playerAnswer) {
                this.deleteQuestion();
                return true;
            }
            document.getElementById(
                "notifBlock"
            ).innerHTML = `<div class="notification-wrong">Відповідь не правильна</div>`;
            window.setTimeout(() => {
                document.getElementById("notifBlock").innerHTML = "";
            }, 4000);
            this.deleteQuestion();
            return false;
        }
        return false;
    },
    answerTipCheck: function () {
        if (
            this.processQuestin.answer ===
            document.querySelector("input[type=radio][name=tip]:checked").value
        ) {
            gameControler.playerGuessedTipQuestion();
        } else {
            document.getElementById(
                "notifBlock"
            ).innerHTML = `<div class="notification-wrong">Відповідь не правильна</div>`;
            window.setTimeout(() => {
                document.getElementById("notifBlock").innerHTML = "";
            }, 3000);
            gameControler.gamePlayerSwitch();
        }
        document.querySelector(
            "input[type=radio][name=tip]:checked"
        ).checked = false;
        gameProcess.removeTips();
        gameProcess.deleteQuestion();
        gameProcess.startRound();
    },
    passQuestion: function () {
        gameControler.playerPassQuestion();
        gameControler.gamePlayerSwitch();
        gameProcess.startRound();
    },
};

const gameControler = {
    maxScore: 10,
    gamePlayer: players.players[0],
    gamePlayerSwitch: function () {
        const i = players.players[0];
        if (this.gamePlayer === i) {
            this.gamePlayer = players.players[1];
            document
                .getElementById("activePlayerOne")
                .removeAttribute("class", "activePlayer");
            document
                .getElementById("activePlayerTwo")
                .setAttribute("class", "activePlayer");
        } else {
            this.gamePlayer = players.players[0];
            document
                .getElementById("activePlayerTwo")
                .removeAttribute("class", "activePlayer");
            document
                .getElementById("activePlayerOne")
                .setAttribute("class", "activePlayer");
        }
    },
    playerGuessedQuestion: function () {
        this.gamePlayer.score += 3;
        players.outputPlayersScore();
        this.checkWinner();
        document.getElementById(
            "notifBlock"
        ).innerHTML = `<div class="notification-window">Відповідь правильна +3 бали </div>`;
        window.setTimeout(() => {
            document.getElementById("notifBlock").innerHTML = "";
        }, 3000);
    },
    playerGuessedTipQuestion: function () {
        this.gamePlayer.score += 2;
        players.outputPlayersScore();
        this.checkWinner();
        document.getElementById(
            "notifBlock"
        ).innerHTML = `<div class="notification-window">Відповідь правильна +2 бала </div>`;
        window.setTimeout(() => {
            document.getElementById("notifBlock").innerHTML = "";
        }, 3000);
    },
    playerPassQuestion: function () {
        this.gamePlayer.score += 1;
        players.outputPlayersScore();
        this.checkWinner();
        document.getElementById(
            "notifBlock"
        ).innerHTML = `<div class="notification-window-pass">Питання пропущено +1 бал </div>`;
        window.setTimeout(() => {
            document.getElementById("notifBlock").innerHTML = "";
        }, 3000);
    },
    checkWinner: function () {
        if (this.gamePlayer.score >= 10) {
        }
    },
};

function handleGameButtons(element) {
    const activeButtonId = element.target.id;
    if (activeButtonId === "startButton") {
        document
            .getElementById("startBlock")
            .setAttribute("style", "display:none");
    }
    if (activeButtonId === "namesButton") {
        players.players[0].name = document.getElementById("nameOne").value;
        players.players[1].name = document.getElementById("nameTwo").value;
        console.log(players.players[1].name);
        if (
            document.getElementById("nameOne").value ===
            document.getElementById("nameTwo").value
        ) {
            alert("Імена гравців мають бути різні!");
            document.getElementById("nameOne").value = "";
            document.getElementById("nameTwo").value = "";
            return false;
        }
        document
            .getElementById("inputNames")
            .setAttribute("style", "display:none");
    }
    if (activeButtonId === "answerButton") {
        const answerInput = document.getElementById("answerInput");

        if (!answerInput.value) {
            alert("Ви не ввели відповідь!");
            return false;
        }

        const playerAnswer = gameProcess.checkingAnswerCorrect(
            answerInput.value
        );

        if (!playerAnswer) {
            answerInput.value = "";
            return false;
        }

        if (gameProcess.answerCheck(playerAnswer)) {
            gameControler.playerGuessedQuestion();
            gameProcess.startRound();
        } else {
            gameControler.gamePlayerSwitch();
        }
        gameProcess.startRound();
        answerInput.value = "";
    }
    if (activeButtonId === "passButton") {
        gameProcess.passQuestion();
        document.getElementById("answerInput").value = "";
    }
    if (activeButtonId === "answerTipButton") {
        gameProcess.answerTipCheck();
        document.getElementById("answerInput").value = "";
    }
    if (activeButtonId === "tipsButton") {
        gameProcess.removeInputQuestion();
        gameProcess.outputTips();
    }
}

players.outputPlayersName();
gameProcess.startRound();

window.onload = function () {
    const gameButton = document.getElementsByClassName("inputAnswerButton");
    for (let i = 0; i < gameButton.length; i++) {
        gameButton[i].onclick = handleGameButtons;
    }
};
