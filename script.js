
const boxes = document.querySelectorAll(".box");
let turnO = Math.random() < 0.5;
let xScore = 0;
let oScore = 0;

const winPatterns = [
  [0,1,2], [3,4,5], [6,7,8],
  [0,3,6], [1,4,7], [2,5,8],
  [0,4,8], [2,4,6]
];

const disableAllBoxes = () => {
  boxes.forEach(box => box.disabled = true);
};

const checkWin = () => {
  let isDraw = true;
  for (const pattern of winPatterns) {
    const [a, b, c] = pattern;
    if (
      boxes[a].innerText &&
      boxes[a].innerText === boxes[b].innerText &&
      boxes[b].innerText === boxes[c].innerText
    ) {
      boxes[a].classList.add('winner');
      boxes[b].classList.add('winner');
      boxes[c].classList.add('winner');

      disableAllBoxes();
      const winner = boxes[a].innerText;
      if (winner === "X") {
        xScore++;
        document.getElementById("X").innerText = xScore;
      } else {
        oScore++;
        document.getElementById("O").innerText = oScore;
      }
      document.getElementById("status").innerText = `Player ${winner} wins! 🎉`;
      return;
    }
  }

  boxes.forEach(box => {
    if (box.innerText === "") isDraw = false;
  });

  if (isDraw) {
    disableAllBoxes();
    document.getElementById("status").innerText = "It's a draw! 🤝";
  }
};

const startBtn = document.getElementById('startBtn');
const resetBtn = document.getElementById('resetBtn');

const resetBoard = () => {
  boxes.forEach(box => {
    box.innerText = "";
    box.disabled = false;
    box.classList.remove('winner', 'o', 'x');
  });
  turnO = Math.random() < 0.5;
  document.getElementById("status").innerText = `Player ${turnO ? "O" : "X"}'s turn`;
};

startBtn.addEventListener("click", resetBoard);

resetBtn.addEventListener("click", () => {
  resetBoard();
  xScore = 0;
  oScore = 0;
  document.getElementById("X").innerText = 0;
  document.getElementById("O").innerText = 0;
});

boxes.forEach(box => {
  box.addEventListener("click", () => {
    if (turnO) {
      box.innerText = "O";
      box.classList.add('o');
      turnO = false;
    } else {
      box.innerText = "X";
      box.classList.add('x');
      turnO = true;
    }
    box.disabled = true;
    checkWin();

    if (!document.getElementById("status").innerText.includes("wins") &&
        !document.getElementById("status").innerText.includes("draw")) {
      document.getElementById("status").innerText = `Player ${turnO ? "O" : "X"}'s turn`;
    }
  });
});