let buttons = document.querySelectorAll(".but");
let resetGame = document.querySelector("#reset");
let newGame = document.querySelector("#new");
let msg = document.querySelector("#msg");
let msgContainer = document.querySelector(".hide");

let turnO=true;
let count = 0;

const winPatterns=[[0,1,2],
[0,3,6],
[0,4,8],
[1,4,7],
[2,5,8],
[3,4,5],
[6,7,8],
[2,4,6]

];

const reset = () => {
    turnO=true;
    count = 0;
    enableButtons();
    msgContainer.classList.add("hide");
};


buttons.forEach((button) => {
    button.addEventListener("click", () => {
        console.log("box was clicked");
        if(turnO){
            button.innerText="O";
            turnO=false;
        }
        else{
            button.innerText="X"
            turnO=true;
        }
        button.disabled=true;
        count++;

        let isWinner = checkWinner();

        if (count === 9 && !isWinner) {
            gameDraw();
        }
    });
});

const gameDraw = () => {
  msg.innerText = `Game was a Draw.`;
  msgContainer.classList.remove("hide");
  disableButtons();
};

const disableButtons = () => {
    for(let button of buttons) {
       button.disabled = true;
    }
};

const enableButtons = () => {
    for(let button of buttons) {
       button.disabled = false;
       button.innerText= "";
    }
};

const showWinner = (winner) => {
    msg.innerText = `Congratulations, Winner is ${winner} `;
    msgContainer.classList.remove("hide");
    disableButtons();
};

const checkWinner=() => {
    for ( let pattern of winPatterns) {
        let posVal=buttons[pattern[0]].innerText;
        let pos1Val= buttons[pattern[1]].innerText;  
        let pos2Val=buttons[pattern[2]].innerText;

        if(posVal !="" && pos1Val != "" && pos2Val != "") {
            if(posVal == pos1Val && pos1Val == pos2Val) {
                console.log("Winner", posVal);
                showWinner(posVal);
                return true;
            }
        }
    }
};

newGame.addEventListener("click", reset);
resetGame.addEventListener("click", reset);
