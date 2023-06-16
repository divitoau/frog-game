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
function getPadNumber() {
    let currentPad = frog.parentElement;
    let currentPadNumber = parseInt((currentPad.getAttribute('id')).substring(9));
    return currentPadNumber;
}

function jumpDown(number) {
    if (number > 25) {
        return number
    } else {
        return number + 8
    }
}

function jumpUp(number) {
    if (number < 8) {
        return number
    } else {
        return number - 8
    }
}

function jumpLeft(number) {
    if (number === 1  ||
        number === 9  ||
        number === 17 ||
        number === 25) {
        return number
    } else {
        return number - 1
        }
}

function jumpRight(number) {
    if (number === 8  ||
        number === 16 ||
        number === 24 ||
        number === 32) {
        return number
    } else {
        return number + 1
    }
}

function landOnNewPad(number) {
    let newPad = document.getElementById('lily-pad-' + number)
    newPad.appendChild(frog)
}
window.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowDown') {
        landOnNewPad(jumpDown(getPadNumber()))
    } else if (e.key === 'ArrowUp') {
        landOnNewPad(jumpUp(getPadNumber()))
    } else if (e.key === 'ArrowLeft') {
        landOnNewPad(jumpLeft(getPadNumber()))
    } else if (e.key === 'ArrowRight') {
        landOnNewPad(jumpRight(getPadNumber()))
    }
});