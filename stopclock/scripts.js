let startTime, updatedTime, difference, tInterval;
let running = false;
let laps = [];

const timeDisplay = document.getElementById('time');
const startPauseBtn = document.getElementById('startPauseBtn');
const resetBtn = document.getElementById('resetBtn');
const lapBtn = document.getElementById('lapBtn');
const lapsList = document.getElementById('laps');
const submitBtn = document.getElementById('submit');

function startPause() {
    if (!running) {
        startTime = new Date().getTime() - (difference || 0);
        tInterval = setInterval(updateTime, 1000);
        startPauseBtn.textContent = 'Pause';
        running = true;
    } else {
        clearInterval(tInterval);
        startPauseBtn.textContent = 'Start';
        running = false;
    }
}

function reset() {
    clearInterval(tInterval);
    timeDisplay.textContent = '00:00:00';
    startPauseBtn.textContent = 'Start';
    difference = 0;
    laps = [];
    renderLaps();
    running = false;
}

function lap() {
    if (running) {
        const lapTime = formatTime(difference);
        laps.push(lapTime);
        renderLaps();
    }
}

function updateTime() {
    // Toggle the blink class
    timeDisplay.classList.toggle('blink');
    
    updatedTime = new Date().getTime();
    difference = updatedTime - startTime;
    timeDisplay.textContent = formatTime(difference);

    // Remove the blink class after 200ms
    setTimeout(() => {
        timeDisplay.classList.toggle('blink');
    }, 200);
}

function renderLaps() {
    lapsList.innerHTML = laps.map((lapTime, index) => `<li>Lap ${index + 1}: ${lapTime}</li>`).join('');
}

function formatTime(time) {
    const hours = Math.floor(time / (1000 * 60 * 60));
    const minutes = Math.floor((time % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((time % (1000 * 60)) / 1000);
    return `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
}

function pad(num) {
    return num < 10 ? '0' + num : num;
}

function handleSubmit() {
    alert('Submitted successfully!');
}

startPauseBtn.addEventListener('click', startPause);
resetBtn.addEventListener('click', reset);
lapBtn.addEventListener('click', lap);
submitBtn.addEventListener('click', handleSubmit);
