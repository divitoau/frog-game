for (let i = 1; i < 33; i++) {
  let lake = document.querySelector(".lake");
  let lilyPad = document.createElement("div");
  lilyPad.classList.add("lily-pad");
  lilyPad.setAttribute("id", "lily-pad-" + i);
  lake.appendChild(lilyPad);
}

let scoreText = document.querySelector(".score-text");
let score = 0;
scoreText.innerText = "Bugs: " + score;

let frog = document.querySelector(".frog");
let startPad = document.querySelector("#lily-pad-1");
startPad.appendChild(frog);

let bug = document.createElement("img");
bug.setAttribute("src", "img/bug.png");
bug.classList.add("bug", "item");

let firstBomb = document.createElement("img");
firstBomb.setAttribute("src", "img/bomb.png");
firstBomb.classList.add("bomb", "item");

let secondBomb = document.createElement("img");
secondBomb.setAttribute("src", "img/bomb.png");
secondBomb.classList.add("bomb", "item");

let currentFrogPadNumber = 1;

function landOnNewPad(number) {
  let newPad = document.getElementById("lily-pad-" + number);
  newPad.appendChild(frog);
  currentFrogPadNumber = number;
}

let frogJumps = (function () {
  function down(number) {
    if (number > 25) {
      return number;
    } else {
      return number + 8;
    }
  }

  function up(number) {
    if (number < 8) {
      return number;
    } else {
      return number - 8;
    }
  }

  function left(number) {
    if ((number + 7) % 8 === 0) {
      return number;
    } else {
      return number - 1;
    }
  }

  function right(number) {
    if (number % 8 === 0) {
      return number;
    } else {
      return number + 1;
    }
  }

  return { down, up, left, right };
})();

window.addEventListener("keydown", (e) => {
  if (e.key === "ArrowDown") {
    landOnNewPad(frogJumps.down(currentFrogPadNumber));
  } else if (e.key === "ArrowUp") {
    landOnNewPad(frogJumps.up(currentFrogPadNumber));
  } else if (e.key === "ArrowLeft") {
    landOnNewPad(frogJumps.left(currentFrogPadNumber));
  } else if (e.key === "ArrowRight") {
    landOnNewPad(frogJumps.right(currentFrogPadNumber));
  }
});

let currentBugPadNumber;

function getRandomInt() {
  return Math.floor(Math.random() * 32 + 1);
}

function spawnBug() {
  newBugPadNumber = getRandomInt();
  while (newBugPadNumber === currentFrogPadNumber) {
    newBugPadNumber = getRandomInt();
  }
  let bugSpawnPad = document.getElementById("lily-pad-" + newBugPadNumber);
  bugSpawnPad.appendChild(bug);
  currentBugPadNumber = newBugPadNumber;
}

spawnBug();

let cornerPadNumbers = [1, 8, 25, 32];
let edgePadNumbers = [2, 3, 4, 5, 6, 7, 9, 16, 17, 24, 26, 27, 28, 29, 30, 31];
let firstBombPadNumber;
let secondBombPadNumber;

function spawnFirstBomb() {
  let newBombPadNumber = getRandomInt();
  let occupiedPads = [currentBugPadNumber, currentFrogPadNumber];
  while (occupiedPads.includes(newBombPadNumber)) {
    newBombPadNumber = getRandomInt();
  }
  let bombSpawnPad = document.getElementById("lily-pad-" + newBombPadNumber);
  bombSpawnPad.appendChild(firstBomb);
  firstBombPadNumber = newBombPadNumber;
}

function spawnSecondBomb() {
  let newBombPadNumber = getRandomInt();
  let occupiedPads = [
    currentBugPadNumber,
    currentFrogPadNumber,
    firstBombPadNumber,
  ];
  while (occupiedPads.includes(newBombPadNumber)) {
    newBombPadNumber = getRandomInt();
  }
  let bombSpawnPad = document.getElementById("lily-pad-" + newBombPadNumber);
  bombSpawnPad.appendChild(secondBomb);
  secondBombPadNumber = newBombPadNumber;
}

function dificultyUp() {
  if (score > 4) {
    spawnFirstBomb();
  }
  if (score > 14) {
    spawnSecondBomb();
  }
}

function checkIfEatBug() {
  if (currentBugPadNumber === currentFrogPadNumber) {
    score++;
    scoreText.innerText = "Bugs: " + score;
    spawnBug();
    dificultyUp();
  }
}

function checkIfDead() {
  if (
    firstBombPadNumber === currentFrogPadNumber ||
    secondBombPadNumber === currentFrogPadNumber
  ) {
    score = 0;
    scoreText.innerText = "Bugs: " + score;
    let firstBombPadElement = document.getElementById(
      "lily-pad-" + firstBombPadNumber
    );
    firstBombPadElement.removeChild(firstBomb);
    firstBombPadNumber = null;
    if (score > 14) {
      let secondBombPadElement = document.getElementById(
        "lily-pad-" + secondBombPadNumber
      );
      secondBombPadElement.removeChild(secondBomb);
      secondBombPadNumber = null;
    }
    startPad.appendChild(frog);
    currentFrogPadNumber = 1;
    spawnBug();
  }
}

window.addEventListener("keydown", checkIfEatBug);
window.addEventListener("keydown", checkIfDead);
