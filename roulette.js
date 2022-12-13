document.addEventListener("keypress", function onEvent(event) {
    if (event.key === "/") {
        let inputs = document.getElementsByClassName('percent_input')
        for (let i = 0; i < inputs.length; i += 1) {
            if (inputs[i].style.display === 'none') {
                inputs[i].style.removeProperty('display');
            } else {
                inputs[i].style.display = 'none' 
            }
        }
    }
});

const addClassToAll = (classToAdd, elements, id) => {
    for (let i = 0; i < elements.length; i += 1) {
        if (elements[i].parentElement.parentElement.id === id) {
            elements[i].classList.add(classToAdd)
        }
    }
}

const removeClass = (classToRemove, elements, id) => {
    for (let i = 0; i < elements.length; i += 1) {
        if (elements[i].parentElement.parentElement.id === id) {
            elements[i].classList.remove(classToRemove)
        }
    }
}

const random100 = () => {
    return Math.random() * 100;
}

let states = {}

let allWords = document.getElementsByClassName("word")
let box

function select(id) {
    if (random100(0, 100) < parseInt(document.getElementById('percent' + id).value)) {
        addClassToAll("word_2nd", allWords, id) //steal
        thisImg = document.getElementById('imgS' + id)
        thisImg.classList.add('pop_up')
        box.classList.add('gold_border')
    } else {
        addClassToAll("word_1st", allWords, id) //keep
        thisImg = document.getElementById('imgK' + id)
        thisImg.classList.add('pop_up')
    }
}

function rollagain(id) {
    removeClass("word_2nd", allWords, id)
    removeClass("word_1st", allWords, id)
    box.classList.remove('gold_border')
    thisImg = document.getElementById('imgS' + id)
    thisImg.classList.remove('pop_up')
    thisImg = document.getElementById('imgK' + id)
    thisImg.classList.remove('pop_up')
}

function renderTiles(noOfTiles) {
    states = {}

    let main = document.getElementById('main')
    let child = main.lastElementChild
    while (child) {
        main.removeChild(child)
        child = main.lastElementChild
    }

    for (let i = 0; i < parseInt(noOfTiles); i++) {
        const id = `this${i}`
        let group = document.createElement('div')
        group.className = 'group'
        // group.id = `group${id}`
        group.onmousedown = function clicked(e) {
            box = document.getElementById(id)
        
            if (id in states) {
                if (states[id] === 'stopped') {
                    rollagain(id)
                    states[id] = 'rolling'
                } else {
                    select(id)
                    states[id] = 'stopped'
                }
            } else {
                select(id)
                states[id] = 'stopped'
            }
        }

        let rotate = document.createElement('div')
        rotate.className = 'rotate'
        rotate.id = id
        
        let input = document.createElement('input')
        input.id = 'percent' + id
        input.type = 'text'
        input.setAttribute("value", 20);
        input.placeholder = '20'
        input.className = 'percent_input'
        input.style.display = 'none'

        let words = document.createElement('words')
        words.className = 'words'

        const keep = document.createElement('span')
        keep.className = 'word'
        keep.textContent = 'KEEP'

        const steal = document.createElement('span')
        steal.className = 'word'
        steal.textContent = 'STEAL'

        words.appendChild(keep)
        words.appendChild(steal)
        words.appendChild(keep.cloneNode(true))

        rotate.appendChild(words)

        group.appendChild(rotate)
        group.appendChild(input)

        let imgSteal = new Image()
        imgSteal.src = '_steal.png'
        imgSteal.id = 'imgS' + id

        let imgKeep = new Image()
        imgKeep.src = '_keep.png'
        imgKeep.id = 'imgK' + id

        group.appendChild(imgSteal)
        group.appendChild(imgKeep)

        main.appendChild(group)
    }
}

function stopall() {
    let cards = document.getElementsByClassName('rotate')
    for (let i = 0; i < cards.length; i += 1) {
        setTimeout(() => {
            const id = cards[i].id
            box = document.getElementById(id)

            if (id in states) {
                if (states[id] === 'rolling') {
                    select(id)
                    states[id] = 'stopped'
                }
            } else {
                select(id)
                states[id] = 'stopped'
            }
        }, Math.random() * 300)
    }
}

function resetall() {
    let cards = document.getElementsByClassName('rotate')
    for (let i = 0; i < cards.length; i += 1) {
        const id = cards[i].id
        box = document.getElementById(id)

        if (id in states) {
            if (states[id] === 'stopped') {
                rollagain(id)
                states[id] = 'rolling'
            }
        }
    }
}

function saveToBrowserGifts(text) {
    localStorage.setItem('giftsList', text)
}

function saveToBrowserStolen(text) {
    localStorage.setItem('stolenList', text)
}

function loadFromBrowser() {
    const gifts = localStorage.getItem('giftsList')
    const stolen = localStorage.getItem('stolenList')
    giftsArea = document.getElementById('gifts')
    giftsArea.value = gifts
    stolenArea = document.getElementById('stolen')
    stolenArea.value = stolen
}