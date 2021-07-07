const timeLeft = document.getElementById('time-left')
const newDate = document.getElementById('date')
const content = document.getElementById('content')
const userForm = document.getElementById('form')
const button = document.getElementById('btn')

let nextBirthday
// let nextBirthday = new Date('07/17/2021')  // mm/dd/yyyy

timeLeft.innerHTML = `please enter full date of <span id="next">next</span> Birthday e.g., mm/dd/yyyy`;

const second = 1000
const minute = second * 60
const hour = minute * 60
const day = hour * 24   // milliseconds
let timerId

function getUsername() {
    const username = document.getElementById('name').value
    const h1 = document.createElement('h1')
    h1.innerHTML = `${username} <br/> `
    content.append(h1)
}

function countDown() {
    const today = new Date()
    const timeSpan = nextBirthday - today
    // console.log(timeSpan)

    if (timeSpan <= -day) {
        content.style.display = "none"
        timeLeft.innerHTML = "Hope you had a nice Birthday!"
        clearInterval(timerId)
        return
    } else if (timeSpan <= 0) {
        content.style.display = "none"
        timeLeft.innerHTML = ` Happy Birthday!!! <br/> `
        clearInterval(timerId)
        return
    }

    const days = Math.floor(timeSpan / day)
    const hours = Math.floor((timeSpan % day) / hour)
    const minutes = Math.floor((timeSpan % hour) / minute)
    const seconds = Math.floor((timeSpan % minute) / second)

    timeLeft.innerHTML = ` ${days} days <br/>  ${hours}  hours <br/>  ${minutes} minutes <br/>  ${seconds} seconds 
    `;


}

function changeColor() {
    let color = timeLeft.style.color
    // console.log(color)
    if (color == '') {
        timeLeft.style.color = 'blue'
    }
    if (color == 'blue') {
        timeLeft.style.color = 'white'
        timeLeft.style.color = ''
    }
}

button.style.display = 'none'

function changeDate() {
    // console.log(newDate.value)
    const dateValue = document.getElementById('date').value
    // console.log(dateValue.length)
    nextBirthday = new Date(newDate.value)
    if (newDate.value == '') {
        timeLeft.innerHTML = `Enter <span id="next">next</span> Birthday e.g., mm/dd/yyyy`;

    } else if (dateValue.length < 10) {
        timeLeft.innerHTML = `please enter full date of <span id="next">next</span> Birthday e.g., mm/dd/yyyy`;
    } else {
        userForm.style.display = 'none'
        timerId = setInterval(countDown, second)   // call every second
        getUsername();
        setInterval(changeColor, second)
    }

}

function btnDisplay() {
    button.style.display = 'initial'
    timeLeft.innerHTML = ''
}
