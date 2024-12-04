// script.js

let startTime, elapsedTime = 0;
let timerInterval;
const timeDisplay = document.getElementById('time-display');
const startButton = document.getElementById('start-button');
const pauseButton = document.getElementById('pause-button');
const resetButton = document.getElementById('reset-button');
const lapButton = document.getElementById('lap-button');
const lapsList = document.getElementById('laps-list');

// Format time as HH:MM:SS.ms
function formatTime(ms) {
  const milliseconds = Math.floor(ms % 1000 / 10);
  const seconds = Math.floor(ms / 1000) % 60;
  const minutes = Math.floor(ms / (1000 * 60)) % 60;
  const hours = Math.floor(ms / (1000 * 60 * 60));

  return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}.${milliseconds.toString().padStart(2, '0')}`;
}

// Start the stopwatch
function startStopwatch() {
  startTime = Date.now() - elapsedTime;
  timerInterval = setInterval(() => {
    elapsedTime = Date.now() - startTime;
    timeDisplay.textContent = formatTime(elapsedTime);
  }, 10);
  toggleButtons(true);
}

// Pause the stopwatch
function pauseStopwatch() {
  clearInterval(timerInterval);
  toggleButtons(false);
}

// Reset the stopwatch
function resetStopwatch() {
  clearInterval(timerInterval);
  elapsedTime = 0;
  timeDisplay.textContent = '00:00:00.00';
  lapsList.innerHTML = '';
  toggleButtons(false, true);
}

// Record lap time
function recordLap() {
  const lapTime = document.createElement('li');
  lapTime.textContent = formatTime(elapsedTime);
  lapsList.appendChild(lapTime);
}

// Toggle button states
function toggleButtons(running, reset = false) {
  startButton.disabled = running;
  pauseButton.disabled = !running;
  lapButton.disabled = !running;
  resetButton.disabled = reset && !running;
}

// Event listeners
startButton.addEventListener('click', startStopwatch);
pauseButton.addEventListener('click', pauseStopwatch);
resetButton.addEventListener('click', resetStopwatch);
lapButton.addEventListener('click', recordLap);
