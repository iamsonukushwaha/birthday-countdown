const timeLeft = document.getElementById('time-left')
const newDate = document.getElementById('date')
const userForm = document.getElementById('form')
const button = document.getElementById('btn')

let nextBirthday
// let nextBirthday = new Date('07/17/2021')  // mm/dd/yyyy


const second = 1000
const minute = second * 60
const hour = minute * 60
const day = hour * 24   // milliseconds
let timerId

function countDown() {
    const today = new Date()
    const timeSpan = nextBirthday - today
    // console.log(timeSpan)

    if (timeSpan <= -day) {
        timeLeft.innerHTML = "Hope you had a nice Birthday!"
        clearInterval(timerId)
        return
    } else if (timeSpan <= 0) {
        timeLeft.innerHTML = "Happy Birthday!!!"
        clearInterval(timerId)
        return
    }

    const days = Math.floor(timeSpan / day)
    const hours = Math.floor((timeSpan % day) / hour)
    const minutes = Math.floor((timeSpan % hour) / minute)
    const seconds = Math.floor((timeSpan % minute) / second)

    timeLeft.innerHTML = days + ' days <br/>' + hours + ' hours <br/>' + minutes + ' minutes <br/>' + seconds + ' seconds '


}

function changeColor() {
    let color = timeLeft.style.color
    // console.log(color)
    if (color == '') {
        timeLeft.style.color = 'yellow'
    }
    if (color == 'yellow') {
        timeLeft.style.color = 'white'
        timeLeft.style.color = ''
    }
}

button.style.display = 'none'
function changeDate() {
    // console.log(newDate.value)
    nextBirthday = new Date(newDate.value)
    if (newDate.value == '') {
        timeLeft.innerHTML = "please enter Birthday"

    } else if (newDate.value <= new Date()) {
        timeLeft.innerHTML = "please enter full date of Birthday"
    } else {
        userForm.style.display = 'none'

        timerId = setInterval(countDown, second)   // call every second

        setInterval(changeColor, second)
    }

}

function btnDisplay() {
    button.style.display = 'initial'
}