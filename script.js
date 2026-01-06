let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#resetBtn");
let playAgainBtn = document.querySelector("#playAgainBtn");
let msgContainer = document.querySelector(".msgContainer");
let winnerMsg = document.querySelector("#winnerMsg");

let turnX = true;

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
        winnerMsg.innerHTML = `<h1 style = "color: #c5c5c5"><i class="fa-solid fa-handshake"></i> The game is draw</h1>`;
        msgContainer.classList.remove("hide");
        disableBoxes();
    }
};

let showWinner = (w) => {
    winnerMsg.innerHTML = `<h1 style = "color: #c5c5c5">${w} wins the game</h1>`;
    msgContainer.classList.remove("hide");
    disableBoxes();
    turnX = true;
};

let checkWinner = () => {
    for (let cond of winCondition) {

        let valBox1 = boxes[cond[0]].innerText;
        let valBox2 = boxes[cond[1]].innerText;
        let valBox3 = boxes[cond[2]].innerText;

        if (valBox1 !== "" && valBox2 !== "" && valBox3 !== "") {
            if (valBox1 === valBox2 && valBox2 === valBox3) {
                showWinner(valBox1);
                return true;
            }
        }
    }
    return false;
};

boxes.forEach((box) => {
    box.addEventListener("click", () => {
        if (turnX) {
            box.innerText = `X`;
            box.style.color = "#B22222";
            turnX = false;
        } else {
            box.innerText = `O`;
            box.style.color = "#060059ff";
            turnX = true;
        }
        box.disabled = true;

        if (!checkWinner()) {
            checkDraw();
        }
    });
});

playAgainBtn.addEventListener('click',resetScript);
resetBtn.addEventListener('click',resetScript);