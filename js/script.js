const circularProgressBar = document.querySelector('#circularProgressBar')
const circularProgressBarNumber = document.querySelector('#circularProgressBar .progress-value')
const buttonTypePomodoro = document.querySelector('#buttonTypePomodoro')
const buttonTypeShortBreak = document.querySelector('#buttonTypeShortBreak')

const audio = new Audio('alarm.mp3')

const pomodoroTimerInSeconds = 1500 // 25 minutos
const shortBreakTimerInSeconds = 300 // 5 minutos
const TIMER_TYPE_POMODORO = 'POMODORO'
const TIMER_TYPE_SHORT_BREAK = 'SHORTBREAK'

let progressInterval
let pomodoroType = TIMER_TYPE_POMODORO
let timerValue = pomodoroTimerInSeconds
let multiplierFactor = 360 / timerValue

function formatNumberInStringMinute(number) {
    const minutes = Math.trunc(number / 60).toString().padStart(2, '0')
    const seconds = Math.trunc(number % 60).toString().padStart(2, '0')
    return `${minutes}:${seconds}`
}

const startTimer = () => {
    if (progressInterval) return
    progressInterval = setInterval(() => {
        timerValue --
        setInfoCircularProgressBar()
    }, 1000)
}

const stopTimer = () => {
    clearInterval(progressInterval)
    progressInterval = null
}

const resetTimer = () => {
    clearInterval(progressInterval)
    progressInterval = null

    timerValue = (pomodoroType === TIMER_TYPE_POMODORO)
        ? pomodoroTimerInSeconds
        : shortBreakTimerInSeconds
    multiplierFactor = 360 / timerValue
    setInfoCircularProgressBar()
    audio.pause()
    audio.currentTime = 0
}

function setInfoCircularProgressBar() {
    if (timerValue === 0) {
        stopTimer()
        audio.play()
    }
    circularProgressBarNumber.textContent = formatNumberInStringMinute(timerValue)
    circularProgressBar.style.background = `conic-gradient(var(--blue) ${timerValue * multiplierFactor}deg, var(--purple) 0deg)`
}

const setPomodoroType = (type) => {
    pomodoroType = type
    if (type === TIMER_TYPE_POMODORO) {
        buttonTypePomodoro.classList.add("active")
        buttonTypeShortBreak.classList.remove("active")
    } else {
        buttonTypePomodoro.classList.remove("active")
        buttonTypeShortBreak.classList.add("active")
    }
    resetTimer()
}