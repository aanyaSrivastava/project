let gameSeq = [];
let userSeq = [];

let started = false;
let level = 0;
let max = 0;

let h2 = document.querySelector("h2");
let btns = ['red','blue','green','yellow'];
let btnAll = document.querySelectorAll(".btn");

document.addEventListener("keypress" ,function() {
    if (started == false ) {
        console.log("game started");            //game starts only once
        started = true;

        levelUp();
    }
})

function levelUp() {
    userSeq = [];
    level++;
    if (level>max) {
        max = level;
    }

    h2.innerText = `Level ${level}`;

    let btnIdx = Math.floor(Math.random() * 3);

    let randomBtn = document.querySelector(`.${btns[btnIdx]}`);
    gameSeq.push(btns[btnIdx]);
    console.log(gameSeq);

    gameFlash(randomBtn);
}

function gameFlash(btn) {
    btn.classList.add("flash");

    setTimeout(function() {
        btn.classList.remove("flash");           //function scope of btn
    },250);
}

function userFlash(btn) {
    btn.classList.add("userflash");

    setTimeout(function() {
        btn.classList.remove("userflash");           //function scope of btn
    },250);
}

for (btn of btnAll) {
    btn.addEventListener("click", btnPress);                //btnPress() already executes the program there 4 times
}

function btnPress() {           // runs each time the button is pressed

    // console.log(this);      //returns entire tag of button pressed

    userFlash(this);

    userColor = this.getAttribute("id");

    // console.log(userColor); 

    userSeq.push(userColor); 

    // console.log(userSeq.length);

    checkAns(userSeq.length-1);
}

function checkAns(idx) {
    if (userSeq[idx] === gameSeq[idx]) {            // check same index for both
        if (userSeq.length == gameSeq.length) {             // check length of userSeq, if not same as gameSeq the user presses another button
            setTimeout(levelUp,1000);
        }   
    }
    else {
        h2.innerHTML = `Game over! Your score was <b> ${level-1}.</b> <br> Press any key to start. <br> Highest score is ${max-1}.`;
        document.querySelector("body").style.backgroundColor = "red";
        setTimeout(function() {
            document.querySelector("body").style.backgroundColor = "white";
        }, 200);
        reset();
    }
}

function reset() {
    started = false;
    level = 0;
    gameSeq = [];
    userSeq = [];
}