// Countdown Timer
const countdownDate = new Date("2024-11-01T05:15:00"); // Set to November 1, 2024, at 5:15 AM
console.log("Countdown Date:", countdownDate); // Debugging line

const countdownFunction = setInterval(() => {
    const now = new Date().getTime();
    const distance = countdownDate - now;

    if (distance < 0) {
        clearInterval(countdownFunction);
        document.getElementById("countdown").innerHTML = "<h2>🎉 Happy Birthday! 🎉</h2>";
        launchConfetti(); // Trigger confetti
        playBirthdaySong(); // Play the special birthday song
        revealSpecialMessage(); // Reveal the special message
        return;
    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    document.getElementById("days").innerText = days;
    document.getElementById("hours").innerText = hours;
    document.getElementById("minutes").innerText = minutes;
    document.getElementById("seconds").innerText = seconds;
}, 1000);

// Confetti Function
function launchConfetti() {
    const duration = 5 * 1000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

    function randomInRange(min, max) {
        return Math.random() * (max - min) + min;
    }

    const interval = setInterval(function() {
        const timeLeft = animationEnd - Date.now();

        if (timeLeft <= 0) {
            return clearInterval(interval);
        }

        const particleCount = 50 * (timeLeft / duration);
        // since particles fall down, start a bit higher than random
        confetti(Object.assign({}, defaults, { 
            particleCount, 
            origin: { x: randomInRange(0, 1), y: Math.random() - 0.2 }
        }));
    }, 250);
}

// Play Birthday Song
function playBirthdaySong() {
    const birthdaySong = document.getElementById('birthday-song');
    birthdaySong.play().then(() => {
        console.log("Birthday song is playing.");
    }).catch((error) => {
        console.log("Autoplay prevented. Creating a fallback button to play the birthday song.");

        // Create a temporary button to trigger audio playback
        const playButton = document.createElement('button');
        playButton.innerText = "🎶 Play Birthday Song 🎶";
        playButton.style.position = 'fixed';
        playButton.style.top = '50%';
        playButton.style.left = '50%';
        playButton.style.transform = 'translate(-50%, -50%)';
        playButton.style.padding = '20px 40px';
        playButton.style.fontSize = '1.5em';
        playButton.style.backgroundColor = '#ff6f61';
        playButton.style.color = '#fff';
        playButton.style.border = 'none';
        playButton.style.borderRadius = '10px';
        playButton.style.cursor = 'pointer';
        playButton.style.zIndex = '1000';
        playButton.style.boxShadow = '0 4px 6px rgba(0,0,0,0.2)';
        playButton.style.transition = 'background-color 0.3s, transform 0.3s';

        // Add hover effects
        playButton.addEventListener('mouseenter', () => {
            playButton.style.backgroundColor = '#e65b50';
            playButton.style.transform = 'translate(-50%, -50%) scale(1.05)';
        });

        playButton.addEventListener('mouseleave', () => {
            playButton.style.backgroundColor = '#ff6f61';
            playButton.style.transform = 'translate(-50%, -50%) scale(1)';
        });

        // Play song on button click
        playButton.addEventListener('click', () => {
            birthdaySong.play().then(() => {
                console.log("Birthday song is playing after user interaction.");
                document.body.removeChild(playButton);
            }).catch((err) => {
                console.log("Failed to play the birthday song:", err);
            });
        });

        document.body.appendChild(playButton);
    });
}

// Reveal Special Message
function revealSpecialMessage() {
    const specialMessage = document.getElementById('special-message');
    specialMessage.classList.remove('hidden');
    specialMessage.classList.add('show');
}

// Background Music
const music = document.getElementById('background-music');

document.addEventListener('DOMContentLoaded', () => {
    // Attempt to play background music automatically
    music.play().then(() => {
        console.log("Background music is playing.");
    }).catch((error) => {
        console.log("Autoplay prevented for background music. Creating a fallback button to play the music.");

        // Create a temporary button to trigger audio playback
        const playMusicButton = document.createElement('button');
        playMusicButton.innerText = "🎵 Play Background Music 🎵";
        playMusicButton.style.position = 'fixed';
        playMusicButton.style.top = '60%';
        playMusicButton.style.left = '50%';
        playMusicButton.style.transform = 'translate(-50%, -50%)';
        playMusicButton.style.padding = '20px 40px';
        playMusicButton.style.fontSize = '1.5em';
        playMusicButton.style.backgroundColor = '#ff6f61';
        playMusicButton.style.color = '#fff';
        playMusicButton.style.border = 'none';
        playMusicButton.style.borderRadius = '10px';
        playMusicButton.style.cursor = 'pointer';
        playMusicButton.style.zIndex = '1000';
        playMusicButton.style.boxShadow = '0 4px 6px rgba(0,0,0,0.2)';
        playMusicButton.style.transition = 'background-color 0.3s, transform 0.3s';

        // Add hover effects
        playMusicButton.addEventListener('mouseenter', () => {
            playMusicButton.style.backgroundColor = '#e65b50';
            playMusicButton.style.transform = 'translate(-50%, -50%) scale(1.05)';
        });

        playMusicButton.addEventListener('mouseleave', () => {
            playMusicButton.style.backgroundColor = '#ff6f61';
            playMusicButton.style.transform = 'translate(-50%, -50%) scale(1)';
        });

        // Play music on button click
        playMusicButton.addEventListener('click', () => {
            music.play().then(() => {
                console.log("Background music is playing after user interaction.");
                document.body.removeChild(playMusicButton);
            }).catch((err) => {
                console.log("Failed to play background music:", err);
            });
        });

        document.body.appendChild(playMusicButton);
    });
});
