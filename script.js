let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#resetBtn");
let playAgainBtn = document.querySelector("#playAgainBtn");
let msgContainer = document.querySelector(".msgContainer");
let winnerMsg = document.querySelector("#winnerMsg");

let turnX = false;

let winCondition = [[0,1,2], [0,3,6], [0,4,8], [1,4,7], [2,5,8], [2,4,6], [3,4,5], [6,7,8]];

const disableBoxes = () => {
    for(let box of boxes) {
        box.disabled = true;
    }
};

const enableBoxes = () => {
    for(let box of boxes) {
        box.disabled = false;
        box.innerText = "";
    }
};

let resetScript = () => {
    turnX = true;
    enableBoxes();
    msgContainer.classList.add("hide");
};

let checkDraw = () => {
    let draw = 0;
    for (let b of boxes) {
        if (b.innerText != ``) {
            draw ++;
        }
    }
    if (draw == 9){
        winnerMsg.innerHTML = `<h1 style = "color: #c5c5c5"><i class="fa-solid fa-handshake"></i>the game is draw</h1>`;
        msgContainer.classList.remove("hide");
        disableBoxes();
    }
};

let showWinner = (w) => {
    winnerMsg.innerHTML = `<h1 style = "color: #c5c5c5">${w} wins the game</h1>`;
    msgContainer.classList.remove("hide");
    disableBoxes();
    turn0 = true
};

let checkWinner = () => {
    for (let cond of winCondition) {

        let valBox1 = boxes[cond[0]].innerHTML;
        let valBox2 = boxes[cond[1]].innerHTML;
        let valBox3 = boxes[cond[2]].innerHTML;

        if (valBox1 !== "" && valBox2 !== "" && valBox3 !== "") {
            if (valBox1 === valBox2 && valBox2 === valBox3) {
                console.log("winner");
                showWinner(valBox1);
            }
        }
    }
};

boxes.forEach((box) => {
    box.addEventListener("click", () => {
        if (turnX) {
            box.innerText = `O`;
            box.style = `color : #060059ff`;
            turnX = false;
        } else {
            box.innerText = `X`;
            box.style = `color : #B22222`;
            turnX = true;
        }
        box.disabled = true;

        checkWinner();
        checkDraw();
    });
});

playAgainBtn.addEventListener('click',resetScript);
resetBtn.addEventListener('click',resetScript);