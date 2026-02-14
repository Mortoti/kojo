// Surprise button celebration
function triggerSurprise() {
    // Trigger confetti and hearts explosion
    createConfettiExplosion();
    createHeartExplosion();

    // Show special message
    showSpecialMessage();

    // Play celebration animation
    celebrateWithCanvas();
}

// Confetti explosion
function createConfettiExplosion() {
    const colors = ['#FFD93D', '#FF9A3D', '#FF6B9D', '#A8E6CF', '#DDA0DD'];
    const confettiCount = 100;

    for (let i = 0; i < confettiCount; i++) {
        setTimeout(() => {
            const confetti = document.createElement('div');
            confetti.style.cssText = `
                position: fixed;
                width: ${8 + Math.random() * 8}px;
                height: ${8 + Math.random() * 8}px;
                background: ${colors[Math.floor(Math.random() * colors.length)]};
                left: ${window.innerWidth / 2}px;
                top: ${window.innerHeight / 2}px;
                border-radius: ${Math.random() > 0.5 ? '50%' : '0'};
                z-index: 10000;
                pointer-events: none;
            `;

            document.body.appendChild(confetti);

            const angle = (Math.PI * 2 * i) / confettiCount;
            const velocity = 200 + Math.random() * 200;
            const tx = Math.cos(angle) * velocity;
            const ty = Math.sin(angle) * velocity;

            confetti.animate([
                {
                    transform: 'translate(0, 0) rotate(0deg)',
                    opacity: 1
                },
                {
                    transform: `translate(${tx}px, ${ty}px) rotate(${360 + Math.random() * 360}deg)`,
                    opacity: 0
                }
            ], {
                duration: 2000 + Math.random() * 1000,
                easing: 'cubic-bezier(.17,.67,.83,.67)'
            }).onfinish = () => confetti.remove();
        }, i * 10);
    }
}

// Heart explosion
function createHeartExplosion() {
    const hearts = ['💛', '💖', '💝', '💗', '💕', '✨', '🌟', '⭐'];

    for (let i = 0; i < 30; i++) {
        setTimeout(() => {
            const heart = document.createElement('div');
            heart.textContent = hearts[Math.floor(Math.random() * hearts.length)];
            heart.style.cssText = `
                position: fixed;
                font-size: ${1.5 + Math.random() * 2}rem;
                left: ${window.innerWidth / 2}px;
                top: ${window.innerHeight / 2}px;
                z-index: 10000;
                pointer-events: none;
            `;

            document.body.appendChild(heart);

            const angle = Math.random() * Math.PI * 2;
            const distance = 150 + Math.random() * 200;
            const tx = Math.cos(angle) * distance;
            const ty = Math.sin(angle) * distance;

            heart.animate([
                {
                    transform: 'translate(-50%, -50%) scale(0)',
                    opacity: 1
                },
                {
                    transform: `translate(${tx}px, ${ty}px) scale(1)`,
                    opacity: 0
                }
            ], {
                duration: 1500 + Math.random() * 1000,
                easing: 'ease-out'
            }).onfinish = () => heart.remove();
        }, i * 50);
    }
}

// Special message popup
function showSpecialMessage() {
    const message = document.createElement('div');
    message.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%) scale(0);
        background: rgba(255, 255, 255, 0.98);
        padding: 3rem;
        border-radius: 30px;
        box-shadow: 0 20px 60px rgba(255, 154, 61, 0.4);
        z-index: 10001;
        text-align: center;
        max-width: 500px;
        border: 3px solid #FFD93D;
    `;

    message.innerHTML = `
        <div style="font-size: 3rem; margin-bottom: 1rem;">🎉✨🎊</div>
        <h2 style="font-family: 'Pacifico', cursive; color: #FF9A3D; font-size: 2rem; margin-bottom: 1rem;">
            You're Absolutely Amazing, MJ!
        </h2>
        <p style="font-family: 'Poppins', sans-serif; color: #4A4A4A; font-size: 1.1rem; line-height: 1.6;">
            May your Valentine's Day be as special and wonderful as you are! Keep shining bright! 🌟
        </p>
        <button onclick="this.parentElement.remove()" style="
            margin-top: 2rem;
            padding: 1rem 2rem;
            background: linear-gradient(135deg, #FFD93D, #FF9A3D);
            border: none;
            border-radius: 50px;
            color: white;
            font-family: 'Quicksand', sans-serif;
            font-size: 1rem;
            font-weight: 600;
            cursor: pointer;
            box-shadow: 0 5px 15px rgba(255, 154, 61, 0.3);
        ">
            Thanks! 💛
        </button>
    `;

    document.body.appendChild(message);

    // Animate in
    setTimeout(() => {
        message.style.transition = 'transform 0.5s cubic-bezier(.34,1.56,.64,1)';
        message.style.transform = 'translate(-50%, -50%) scale(1)';
    }, 100);
}

// Canvas celebration
function celebrateWithCanvas() {
    const canvas = document.getElementById('celebrationCanvas');
    const ctx = canvas.getContext('2d');

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles = [];
    const particleCount = 50;

    class Particle {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = canvas.height + 10;
            this.size = 3 + Math.random() * 5;
            this.speedY = -3 - Math.random() * 3;
            this.speedX = -1 + Math.random() * 2;
            this.color = `hsl(${Math.random() * 60 + 30}, 100%, 60%)`;
            this.life = 100;
        }

        update() {
            this.y += this.speedY;
            this.x += this.speedX;
            this.life -= 1;
        }

        draw() {
            ctx.fillStyle = this.color;
            ctx.globalAlpha = this.life / 100;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fill();
            ctx.globalAlpha = 1;
        }
    }

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        if (particles.length < particleCount) {
            particles.push(new Particle());
        }

        for (let i = particles.length - 1; i >= 0; i--) {
            particles[i].update();
            particles[i].draw();

            if (particles[i].life <= 0 || particles[i].y < -10) {
                particles.splice(i, 1);
            }
        }

        if (particles.length > 0) {
            requestAnimationFrame(animate);
        } else {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
        }
    }

    animate();
}

// Random floating sparkles
function createFloatingSparkles() {
    setInterval(() => {
        const sparkle = document.createElement('div');
        sparkle.textContent = ['✨', '⭐', '💫', '🌟'][Math.floor(Math.random() * 4)];
        sparkle.style.cssText = `
            position: fixed;
            left: ${Math.random() * window.innerWidth}px;
            top: ${window.innerHeight + 20}px;
            font-size: ${1 + Math.random() * 1.5}rem;
            pointer-events: none;
            z-index: 1;
        `;

        document.body.appendChild(sparkle);

        sparkle.animate([
            {
                transform: 'translateY(0) rotate(0deg)',
                opacity: 0.8
            },
            {
                transform: `translateY(-${window.innerHeight + 100}px) rotate(${360 + Math.random() * 360}deg)`,
                opacity: 0
            }
        ], {
            duration: 5000 + Math.random() * 3000,
            easing: 'linear'
        }).onfinish = () => sparkle.remove();
    }, 2000);
}

// Gentle cursor trail
let lastX = 0;
let lastY = 0;

document.addEventListener('mousemove', (e) => {
    if (Math.random() > 0.95) {
        const trail = document.createElement('div');
        trail.style.cssText = `
            position: fixed;
            left: ${e.clientX}px;
            top: ${e.clientY}px;
            width: ${5 + Math.random() * 5}px;
            height: ${5 + Math.random() * 5}px;
            background: ${['#FFD93D', '#FF9A3D', '#FF6B9D'][Math.floor(Math.random() * 3)]};
            border-radius: 50%;
            pointer-events: none;
            z-index: 999;
        `;

        document.body.appendChild(trail);

        trail.animate([
            {
                transform: 'translate(-50%, -50%) scale(1)',
                opacity: 0.6
            },
            {
                transform: 'translate(-50%, -50%) scale(0)',
                opacity: 0
            }
        ], {
            duration: 800,
            easing: 'ease-out'
        }).onfinish = () => trail.remove();
    }
});

// Scroll animations
function initScrollAnimations() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = 'cardSlideIn 0.8s ease-out forwards';
            }
        });
    }, {
        threshold: 0.1
    });

    const cards = document.querySelectorAll('.card');
    cards.forEach(card => observer.observe(card));
}

// Add shimmer to cards on hover
document.querySelectorAll('.card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'scale(1.02)';
        this.style.transition = 'transform 0.3s ease';
    });

    card.addEventListener('mouseleave', function() {
        this.style.transform = 'scale(1)';
    });
});

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    createFloatingSparkles();
    initScrollAnimations();

    // Auto-trigger small celebration after 2 seconds
    setTimeout(() => {
        const smallCelebration = () => {
            for (let i = 0; i < 10; i++) {
                setTimeout(() => {
                    const sparkle = document.createElement('div');
                    sparkle.textContent = '✨';
                    sparkle.style.cssText = `
                        position: fixed;
                        left: ${Math.random() * window.innerWidth}px;
                        top: ${Math.random() * window.innerHeight}px;
                        font-size: 2rem;
                        pointer-events: none;
                        z-index: 1000;
                    `;

                    document.body.appendChild(sparkle);

                    sparkle.animate([
                        { opacity: 0, transform: 'scale(0)' },
                        { opacity: 1, transform: 'scale(1.5)' },
                        { opacity: 0, transform: 'scale(0)' }
                    ], {
                        duration: 2000,
                        easing: 'ease-out'
                    }).onfinish = () => sparkle.remove();
                }, i * 200);
            }
        };

        smallCelebration();
    }, 2000);
});

// Window resize handler
window.addEventListener('resize', () => {
    const canvas = document.getElementById('celebrationCanvas');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

console.log('💛 Happy Valentine\'s Day, MJ! 💛');
console.log('From Nana Kwadwo with warm wishes! 🌟');