for (let i = 1; i < 33; i++) {
    let container = document.querySelector('.container')
    let lilyPad = document.createElement('div')
    lilyPad.classList.add('lily-pad')
    lilyPad.setAttribute('id', 'lily-pad-' + i)
    container.appendChild(lilyPad)
}
let frog = document.querySelector('.frog')
let startPad = document.querySelector('#lily-pad-1')
startPad.appendChild(frog)
function jumpUp() {
    
}
