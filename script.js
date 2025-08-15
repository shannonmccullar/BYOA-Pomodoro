class PomodoroTimer {
    constructor() {
        this.timeLeft = 25 * 60; // 25 minutes in seconds
        this.totalTime = 25 * 60;
        this.isRunning = false;
        this.interval = null;
        this.sessionCount = 0;
        this.currentMode = 'focus';
        
        this.initializeElements();
        this.initializeAudio();
        this.bindEvents();
        this.updateDisplay();
    }

    initializeElements() {
        this.timeDisplay = document.getElementById('time');
        this.timerLabel = document.getElementById('timer-label');
        this.startBtn = document.getElementById('start-btn');
        this.pauseBtn = document.getElementById('pause-btn');
        this.resetBtn = document.getElementById('reset-btn');
        this.sessionCountDisplay = document.getElementById('session-count');
        this.progressFill = document.getElementById('progress-fill');
        this.modeButtons = document.querySelectorAll('.mode-btn');
        this.soundToggle = document.getElementById('sound-toggle');
    }

    initializeAudio() {
        // Use Web Audio API for better sound control
        this.audioManager = window.audioManager;
        
        // Fallback to HTML audio elements if Web Audio API is not available
        this.startSound = document.getElementById('start-sound');
        this.completeSound = document.getElementById('complete-sound');
        
        if (this.startSound) {
            this.startSound.volume = 0.3;
        }
        if (this.completeSound) {
            this.completeSound.volume = 0.4;
        }
    }

    bindEvents() {
        this.startBtn.addEventListener('click', () => this.start());
        this.pauseBtn.addEventListener('click', () => this.pause());
        this.resetBtn.addEventListener('click', () => this.reset());
        
        this.modeButtons.forEach(btn => {
            btn.addEventListener('click', (e) => this.switchMode(e.target));
        });

        // Sound toggle functionality
        this.soundToggle.addEventListener('change', (e) => {
            if (this.audioManager) {
                this.audioManager.setSoundEnabled(e.target.checked);
            }
        });

        // Add keyboard shortcuts
        document.addEventListener('keydown', (e) => {
            if (e.code === 'Space') {
                e.preventDefault();
                if (this.isRunning) {
                    this.pause();
                } else {
                    this.start();
                }
            } else if (e.code === 'KeyR') {
                this.reset();
            }
        });
    }

    playSound(soundType) {
        if (!this.soundToggle.checked) return;
        
        // Use Web Audio API if available
        if (this.audioManager && this.audioManager.audioContext) {
            if (soundType === 'start') {
                this.audioManager.playStartSound();
            } else if (soundType === 'complete') {
                this.audioManager.playCompleteSound();
            }
        } else {
            // Fallback to HTML audio elements
            let soundElement = null;
            if (soundType === 'start' && this.startSound) {
                soundElement = this.startSound;
            } else if (soundType === 'complete' && this.completeSound) {
                soundElement = this.completeSound;
            }
            
            if (soundElement) {
                soundElement.currentTime = 0;
                soundElement.play().catch(error => {
                    console.log('Audio playback prevented:', error);
                });
            }
        }
    }

    start() {
        if (this.isRunning) return;
        
        this.isRunning = true;
        this.startBtn.disabled = true;
        this.pauseBtn.disabled = false;
        
        // Play start sound
        this.playSound('start');
        
        this.interval = setInterval(() => {
            this.timeLeft--;
            this.updateDisplay();
            
            if (this.timeLeft <= 0) {
                this.complete();
            }
        }, 1000);
    }

    pause() {
        if (!this.isRunning) return;
        
        this.isRunning = false;
        this.startBtn.disabled = false;
        this.pauseBtn.disabled = true;
        
        clearInterval(this.interval);
    }

    reset() {
        this.pause();
        this.timeLeft = this.totalTime;
        this.updateDisplay();
    }

    switchMode(button) {
        // Remove active class from all buttons
        this.modeButtons.forEach(btn => btn.classList.remove('active'));
        
        // Add active class to clicked button
        button.classList.add('active');
        
        // Get new time and label
        const newTime = parseInt(button.dataset.time) * 60;
        const newLabel = button.dataset.label;
        
        // Update timer state
        this.totalTime = newTime;
        this.timeLeft = newTime;
        this.currentMode = button.textContent.toLowerCase().replace(' ', '-');
        
        // Update display
        this.timerLabel.textContent = newLabel;
        this.updateDisplay();
        
        // Reset if timer was running
        if (this.isRunning) {
            this.reset();
        }
    }

    complete() {
        this.pause();
        
        // Increment session count for focus sessions
        if (this.currentMode === 'focus') {
            this.sessionCount++;
            this.sessionCountDisplay.textContent = this.sessionCount;
        }
        
        // Play complete sound
        this.playSound('complete');
        
        // Show notification
        this.showNotification();
        
        // Add completion animation
        this.timeDisplay.classList.add('timer-complete');
        setTimeout(() => {
            this.timeDisplay.classList.remove('timer-complete');
        }, 500);
        
        // Auto-switch to next mode
        this.autoSwitchMode();
    }

    autoSwitchMode() {
        if (this.currentMode === 'focus') {
            // After focus, switch to short break
            const shortBreakBtn = Array.from(this.modeButtons).find(btn => 
                btn.textContent === 'Short Break'
            );
            if (shortBreakBtn) {
                this.switchMode(shortBreakBtn);
            }
        } else if (this.currentMode === 'short-break') {
            // After short break, switch back to focus
            const focusBtn = Array.from(this.modeButtons).find(btn => 
                btn.textContent === 'Focus'
            );
            if (focusBtn) {
                this.switchMode(focusBtn);
            }
        } else if (this.currentMode === 'long-break') {
            // After long break, switch back to focus
            const focusBtn = Array.from(this.modeButtons).find(btn => 
                btn.textContent === 'Focus'
            );
            if (focusBtn) {
                this.switchMode(focusBtn);
            }
        }
    }

    showNotification() {
        const title = this.currentMode === 'focus' ? 'Focus Session Complete!' : 'Break Time!';
        const message = this.currentMode === 'focus' 
            ? 'Great job! Time for a break.' 
            : 'Break is over. Ready to focus again?';
        
        // Check if browser supports notifications
        if ('Notification' in window && Notification.permission === 'granted') {
            new Notification(title, {
                body: message,
                icon: 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><text y=".9em" font-size="90">🍅</text></svg>'
            });
        }
        
        // Fallback: show alert
        if (Notification.permission !== 'granted') {
            alert(`${title}\n${message}`);
        }
    }

    updateDisplay() {
        const minutes = Math.floor(this.timeLeft / 60);
        const seconds = this.timeLeft % 60;
        const timeString = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
        
        this.timeDisplay.textContent = timeString;
        
        // Update tab title with countdown
        if (this.isRunning) {
            document.title = `(${timeString}) Pomodoro Timer`;
        } else {
            document.title = 'Pomodoro Timer';
        }
        
        // Update progress bar
        const progress = ((this.totalTime - this.timeLeft) / this.totalTime) * 100;
        this.progressFill.style.width = `${progress}%`;
    }

    requestNotificationPermission() {
        if ('Notification' in window && Notification.permission === 'default') {
            Notification.requestPermission();
        }
    }
}

// Initialize the timer when the page loads
document.addEventListener('DOMContentLoaded', () => {
    const timer = new PomodoroTimer();
    
    // Request notification permission
    timer.requestNotificationPermission();
    
    // Add some helpful tips
    const tips = [
        'Press Space to start/pause the timer',
        'Press R to reset the timer',
        'Complete 4 focus sessions for a long break',
        'Take breaks to maintain productivity'
    ];
    
    // Show a random tip in the footer
    const footer = document.querySelector('footer p');
    const randomTip = tips[Math.floor(Math.random() * tips.length)];
    footer.textContent = randomTip;
});
