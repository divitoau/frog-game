for (let i = 1; i < 33; i++) {
    let container = document.querySelector('.container');
    let lilyPad = document.createElement('div');
    lilyPad.classList.add('lily-pad');
    lilyPad.setAttribute('id', 'lily-pad-' + i);
    container.appendChild(lilyPad);
}

let frog = document.querySelector('.frog');
let startPad = document.querySelector('#lily-pad-1');
startPad.appendChild(frog);
let bug = document.createElement('img');
bug.setAttribute('src', 'img/bug.png');
bug.classList.add('bug');
function frogPadNumber() {
    let currentPad = frog.parentElement;
    let currentPadNumber = parseInt((currentPad.getAttribute('id')).substring(9));
    return currentPadNumber;
}

function landOnNewPad(number) {
    let newPad = document.getElementById('lily-pad-' + number)
    newPad.appendChild(frog)
}

let frogJumps = (function () {
    function down(number) {
        if (number > 25) {
            return number
        } else {
            return number + 8
        }
    }

    function up(number) {
        if (number < 8) {
            return number
        } else {
            return number - 8
        }
    }

    function left(number) {
        if (number === 1 ||
            number === 9 ||
            number === 17 ||
            number === 25) {
            return number
        } else {
            return number - 1
        }
    }

    function right(number) {
        if (number === 8 ||
            number === 16 ||
            number === 24 ||
            number === 32) {
            return number
        } else {
            return number + 1
        }
    }

    return { down, up, left, right }

})();

window.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowDown') {
        landOnNewPad(frogJumps.down(frogPadNumber()))
    } else if (e.key === 'ArrowUp') {
        landOnNewPad(frogJumps.up(frogPadNumber()))
    } else if (e.key === 'ArrowLeft') {
        landOnNewPad(frogJumps.left(frogPadNumber()))
    } else if (e.key === 'ArrowRight') {
        landOnNewPad(frogJumps.right(frogPadNumber()))
    }
});

function getRandomInt() {
    return Math.floor((Math.random() * 32) + 1)
}

function spawnBug(number) {
    if (number === frogPadNumber() && number < 16) {
        number = number + 17
    } else if (number === frogPadNumber() && number > 15) {
        number = number - 15
    }
    let bugSpawnPad = document.getElementById('lily-pad-' + number);
    bugSpawnPad.appendChild(bug);
}
spawnBug(getRandomInt());

function checkIfTogether() {
    let bugPadCurrent = bug.closest('.lily-pad');
    let frogPadCurrent = frog.closest('.lily-pad');
    if (bugPadCurrent === frogPadCurrent) {
        console.log('yum');
        spawnBug(getRandomInt());
    }
}
window.addEventListener('keydown', checkIfTogether);