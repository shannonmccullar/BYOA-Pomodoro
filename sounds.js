// Audio system for Pomodoro Timer using Web Audio API
class AudioManager {
    constructor() {
        this.audioContext = null;
        this.soundEnabled = true;
        this.initAudioContext();
    }

    initAudioContext() {
        try {
            // Create audio context
            this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
        } catch (error) {
            console.log('Web Audio API not supported:', error);
        }
    }

    playBeep(frequency = 800, duration = 0.2, type = 'sine') {
        if (!this.soundEnabled || !this.audioContext) return;

        // Resume audio context if suspended (required for autoplay policies)
        if (this.audioContext.state === 'suspended') {
            this.audioContext.resume();
        }

        const oscillator = this.audioContext.createOscillator();
        const gainNode = this.audioContext.createGain();

        oscillator.connect(gainNode);
        gainNode.connect(this.audioContext.destination);

        oscillator.frequency.setValueAtTime(frequency, this.audioContext.currentTime);
        oscillator.type = type;

        // Create a nice envelope
        gainNode.gain.setValueAtTime(0, this.audioContext.currentTime);
        gainNode.gain.linearRampToValueAtTime(0.3, this.audioContext.currentTime + 0.01);
        gainNode.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + duration);

        oscillator.start(this.audioContext.currentTime);
        oscillator.stop(this.audioContext.currentTime + duration);
    }

    playStartSound() {
        // Play a pleasant ascending tone
        this.playBeep(600, 0.15, 'sine');
        setTimeout(() => this.playBeep(800, 0.15, 'sine'), 150);
    }

    playCompleteSound() {
        // Play a celebratory sequence
        this.playBeep(523, 0.2, 'sine'); // C
        setTimeout(() => this.playBeep(659, 0.2, 'sine'), 200); // E
        setTimeout(() => this.playBeep(784, 0.3, 'sine'), 400); // G
    }

    setSoundEnabled(enabled) {
        this.soundEnabled = enabled;
    }
}

// Create global audio manager instance
window.audioManager = new AudioManager();

// Function to create audio elements (for fallback)
function createAudioElements() {
    const startSound = document.getElementById('start-sound');
    const completeSound = document.getElementById('complete-sound');
    
    if (startSound) {
        startSound.src = "data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmwhBSuBzvLZiTYIG2m98OScTgwOUarm7blmGgU7k9n1unEiBC13yO/eizEIHWq+8+OWT";
    }
    
    if (completeSound) {
        completeSound.src = "data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmwhBSuBzvLZiTYIG2m98OScTgwOUarm7blmGgU7k9n1unEiBC13yO/eizEIHWq+8+OWT";
    }
}

// Initialize audio when DOM is loaded
document.addEventListener('DOMContentLoaded', createAudioElements);
