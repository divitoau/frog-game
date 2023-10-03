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

let currentFrogPadNumber = 1;
let currentBugPadNumber;
let occupiedPads = [currentBugPadNumber, currentFrogPadNumber];

function landOnNewPad(number) {
  let newPad = document.getElementById("lily-pad-" + number);
  newPad.appendChild(frog);
  currentFrogPadNumber = number;
  occupiedPads.splice(1, 1, number);
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
  occupiedPads.splice(0, 1, newBugPadNumber);
}

spawnBug();

let cornerPadNumbers = [1, 8, 25, 32];
let edgePadNumbers = [2, 3, 4, 5, 6, 7, 9, 16, 17, 24, 26, 27, 28, 29, 30, 31];
let firstBombPadNumber;
let secondBombPadNumber;

class bomb {
  constructor(bombNumber) {
    this.bombNumber = bombNumber;
  }

  padNumber;

  createBomb() {
    let bombImage = document.createElement("img");
    bombImage.setAttribute("src", "img/bomb.png");
    bombImage.classList.add("bomb", "item");
    return bombImage;
  }

  spawnBomb() {
    let newBombPadNumber = getRandomInt();
    while (occupiedPads.includes(newBombPadNumber)) {
      newBombPadNumber = getRandomInt();
    }
    let bombSpawnPad = document.getElementById("lily-pad-" + newBombPadNumber);
    if (!this.padNumber) {
      bombSpawnPad.appendChild(this.createBomb());
    } else {
      bombSpawnPad.appendChild(
        document.getElementById("lily-pad-" + this.padNumber).firstChild
      );
    }
    this.padNumber = newBombPadNumber;
  }
}

function dificultyUp() {
  let newBomb = new bomb(1);
  if (score > 4) {
    newBomb.spawnBomb();
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
    score = 0;
    scoreText.innerText = "Bugs: " + score;
    startPad.appendChild(frog);
    currentFrogPadNumber = 1;
    spawnBug();
  }
}

window.addEventListener("keydown", checkIfEatBug);
window.addEventListener("keydown", checkIfDead);
