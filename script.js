// Initialize AOS (Animate On Scroll) Library
// Adding AOS via CDN
(function() {
    const aosCSS = document.createElement('link');
    aosCSS.rel = 'stylesheet';
    aosCSS.href = 'https://unpkg.com/aos@2.3.1/dist/aos.css';
    document.head.appendChild(aosCSS);

    const aosJS = document.createElement('script');
    aosJS.src = 'https://unpkg.com/aos@2.3.1/dist/aos.js';
    aosJS.onload = function() {
        AOS.init({
            duration: 1200,
            easing: 'ease-out-cubic',
            once: false,
            mirror: true,
            offset: 100
        });
    };
    document.body.appendChild(aosJS);
})();

// Particles System
class ParticlesSystem {
    constructor() {
        this.container = document.getElementById('particles-container');
        this.particles = [];
        this.init();
    }

    init() {
        // Create floating particles
        for (let i = 0; i < 50; i++) {
            this.createParticle();
        }
    }

    createParticle() {
        const particle = document.createElement('div');
        const size = Math.random() * 4 + 2;
        const x = Math.random() * window.innerWidth;
        const y = Math.random() * window.innerHeight;
        const duration = Math.random() * 20 + 10;
        const delay = Math.random() * 5;

        particle.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            background: rgba(212, 175, 55, ${Math.random() * 0.5 + 0.3});
            border-radius: 50%;
            left: ${x}px;
            top: ${y}px;
            pointer-events: none;
            animation: particleFloat ${duration}s ease-in-out ${delay}s infinite;
            box-shadow: 0 0 ${size * 3}px rgba(212, 175, 55, 0.5);
        `;

        this.container.appendChild(particle);
        this.particles.push(particle);
    }
}

// Add particle float animation
const style = document.createElement('style');
style.textContent = `
    @keyframes particleFloat {
        0%, 100% {
            transform: translateY(0) translateX(0);
            opacity: 0.3;
        }
        25% {
            transform: translateY(-100px) translateX(50px);
            opacity: 0.8;
        }
        50% {
            transform: translateY(-200px) translateX(-50px);
            opacity: 0.5;
        }
        75% {
            transform: translateY(-100px) translateX(30px);
            opacity: 0.8;
        }
    }
`;
document.head.appendChild(style);

// Celebration Canvas - Continuous Golden Confetti
class CelebrationCanvas {
    constructor() {
        this.canvas = document.getElementById('celebrationCanvas');
        this.ctx = this.canvas.getContext('2d');
        this.confetti = [];
        this.resize();
        this.init();

        window.addEventListener('resize', () => this.resize());
    }

    resize() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }

    init() {
        // Create initial confetti burst
        for (let i = 0; i < 100; i++) {
            this.confetti.push(new Confetti(this.canvas.width, this.canvas.height));
        }

        this.animate();

        // Add new confetti periodically
        setInterval(() => {
            for (let i = 0; i < 5; i++) {
                this.confetti.push(new Confetti(this.canvas.width, this.canvas.height));
            }
        }, 500);
    }

    animate() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        for (let i = this.confetti.length - 1; i >= 0; i--) {
            this.confetti[i].update();
            this.confetti[i].draw(this.ctx);

            if (this.confetti[i].y > this.canvas.height + 100) {
                this.confetti.splice(i, 1);
            }
        }

        requestAnimationFrame(() => this.animate());
    }
}

class Confetti {
    constructor(canvasWidth, canvasHeight) {
        this.x = Math.random() * canvasWidth;
        this.y = -50;
        this.size = Math.random() * 8 + 4;
        this.speedY = Math.random() * 3 + 1;
        this.speedX = Math.random() * 2 - 1;
        this.color = this.getGoldenColor();
        this.rotation = Math.random() * 360;
        this.rotationSpeed = Math.random() * 5 - 2.5;
        this.opacity = Math.random() * 0.5 + 0.5;
    }

    getGoldenColor() {
        const colors = [
            '#D4AF37',
            '#F4E4C1',
            '#B8860B',
            '#FFD700',
            '#FFF8E7'
        ];
        return colors[Math.floor(Math.random() * colors.length)];
    }

    update() {
        this.y += this.speedY;
        this.x += this.speedX;
        this.rotation += this.rotationSpeed;
    }

    draw(ctx) {
        ctx.save();
        ctx.globalAlpha = this.opacity;
        ctx.translate(this.x, this.y);
        ctx.rotate(this.rotation * Math.PI / 180);
        ctx.fillStyle = this.color;
        ctx.fillRect(-this.size / 2, -this.size / 2, this.size, this.size);
        ctx.restore();
    }
}

// Photo Upload Handlers
function setupPhotoUpload() {
    const photo1 = document.getElementById('dadPhoto1');
    const photo2 = document.getElementById('dadPhoto2');

    // Add click to upload functionality
    [photo1, photo2].forEach((photo, index) => {
        photo.style.cursor = 'pointer';
        photo.addEventListener('click', function() {
            const input = document.createElement('input');
            input.type = 'file';
            input.accept = 'image/*';
            input.onchange = function(e) {
                const file = e.target.files[0];
                if (file) {
                    const reader = new FileReader();
                    reader.onload = function(event) {
                        photo.src = event.target.result;
                        // Save to localStorage
                        localStorage.setItem(`dadPhoto${index + 1}`, event.target.result);
                    };
                    reader.readAsDataURL(file);
                }
            };
            input.click();
        });

        // Load saved photos from localStorage
        const savedPhoto = localStorage.getItem(`dadPhoto${index + 1}`);
        if (savedPhoto) {
            photo.src = savedPhoto;
        }
    });
}

// Parallax Scrolling Effects
class ParallaxEffect {
    constructor() {
        this.init();
    }

    init() {
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;

            // Hero parallax
            const hero = document.getElementById('hero');
            if (hero) {
                const heroContent = hero.querySelector('.hero-content');
                if (heroContent) {
                    heroContent.style.transform = `translateY(${scrolled * 0.5}px)`;
                    heroContent.style.opacity = 1 - (scrolled / 800);
                }
            }

            // Light rays rotation
            const lightRays = document.querySelector('.light-rays');
            if (lightRays) {
                lightRays.style.transform = `translateX(-50%) rotate(${scrolled * 0.1}deg)`;
            }

            // Photo frames 3D effect
            const frames = document.querySelectorAll('.photo-frame');
            frames.forEach((frame, index) => {
                const rect = frame.getBoundingClientRect();
                const centerY = rect.top + rect.height / 2;
                const windowCenterY = window.innerHeight / 2;
                const distance = centerY - windowCenterY;
                const rotation = (distance / window.innerHeight) * 15;

                if (rect.top < window.innerHeight && rect.bottom > 0) {
                    frame.style.transform = `
                        perspective(1000px) 
                        rotateY(${index % 2 === 0 ? rotation : -rotation}deg)
                        rotateX(${rotation * 0.5}deg)
                    `;
                }
            });
        });
    }
}

// 3D Mouse Movement Effect on Photo Frames
function setup3DEffect() {
    const frames = document.querySelectorAll('.photo-frame');

    frames.forEach(frame => {
        frame.addEventListener('mousemove', (e) => {
            const rect = frame.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const rotateX = ((y - centerY) / centerY) * 10;
            const rotateY = ((centerX - x) / centerX) * 10;

            frame.style.transform = `
                perspective(1000px)
                rotateX(${rotateX}deg)
                rotateY(${rotateY}deg)
                translateY(-20px)
                scale(1.05)
            `;
        });

        frame.addEventListener('mouseleave', () => {
            frame.style.transform = 'perspective(1000px) rotateX(0) rotateY(0)';
        });
    });
}

// Sparkle Effect on Scroll
class SparkleEffect {
    constructor() {
        this.sparkles = [];
        this.init();
    }

    init() {
        window.addEventListener('scroll', () => {
            if (Math.random() > 0.9) {
                this.createSparkle();
            }
        });
    }

    createSparkle() {
        const sparkle = document.createElement('div');
        sparkle.textContent = '✨';
        sparkle.style.cssText = `
            position: fixed;
            left: ${Math.random() * window.innerWidth}px;
            top: ${Math.random() * window.innerHeight}px;
            font-size: ${Math.random() * 20 + 10}px;
            pointer-events: none;
            z-index: 9998;
        `;

        document.body.appendChild(sparkle);

        sparkle.animate([
            { opacity: 0, transform: 'scale(0) rotate(0deg)' },
            { opacity: 1, transform: 'scale(1.5) rotate(180deg)' },
            { opacity: 0, transform: 'scale(0) rotate(360deg)' }
        ], {
            duration: 2000,
            easing: 'ease-out'
        }).onfinish = () => sparkle.remove();
    }
}

// Text Reveal Animation
function setupTextReveal() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const text = entry.target;
                text.style.animation = 'textReveal 1s ease-out forwards';
            }
        });
    }, { threshold: 0.5 });

    const textElements = document.querySelectorAll('.gratitude-card p, .message-block p, .tribute-paragraph');
    textElements.forEach(el => observer.observe(el));
}

const textRevealStyle = document.createElement('style');
textRevealStyle.textContent = `
    @keyframes textReveal {
        from {
            opacity: 0;
            transform: translateY(20px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
`;
document.head.appendChild(textRevealStyle);

// Music Toggle with birthday.mp3
const audio = document.getElementById('birthdayMusic');
const musicToggle = document.getElementById('musicToggle');

if (musicToggle && audio) {
    // Auto-play attempt (some browsers block this)
    const playMusic = () => {
        audio.play().catch(err => {
            console.log('Autoplay blocked. Click the music button to play.');
        });
    };

    // Try to play after user interaction
    document.addEventListener('click', playMusic, { once: true });

    // Music toggle button
    musicToggle.addEventListener('click', function(e) {
        e.stopPropagation();
        if (audio.paused) {
            audio.play();
            this.innerHTML = '<span class="music-icon">🔇</span>';
            this.style.animation = 'musicPulse 1s ease-in-out infinite';
        } else {
            audio.pause();
            this.innerHTML = '<span class="music-icon">🎵</span>';
            this.style.animation = 'none';
        }
    });

    // Add music pulse animation
    const musicPulseStyle = document.createElement('style');
    musicPulseStyle.textContent = `
        @keyframes musicPulse {
            0%, 100% { transform: scale(1); }
            50% { transform: scale(1.1); }
        }
    `;
    document.head.appendChild(musicPulseStyle);
}

// Smooth Scroll for Anchor Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Golden Particle Trail on Mouse Move
class MouseTrail {
    constructor() {
        this.init();
    }

    init() {
        let lastX = 0;
        let lastY = 0;
        let isMoving = false;

        document.addEventListener('mousemove', (e) => {
            if (!isMoving && Math.random() > 0.95) {
                isMoving = true;
                setTimeout(() => isMoving = false, 50);

                this.createTrailParticle(e.clientX, e.clientY);
            }
        });
    }

    createTrailParticle(x, y) {
        const particle = document.createElement('div');
        const size = Math.random() * 6 + 3;

        particle.style.cssText = `
            position: fixed;
            left: ${x}px;
            top: ${y}px;
            width: ${size}px;
            height: ${size}px;
            background: radial-gradient(circle, rgba(212, 175, 55, 0.8), transparent);
            border-radius: 50%;
            pointer-events: none;
            z-index: 9997;
        `;

        document.body.appendChild(particle);

        particle.animate([
            { opacity: 0.8, transform: 'translate(-50%, -50%) scale(1)' },
            { opacity: 0, transform: 'translate(-50%, -50%) scale(0)' }
        ], {
            duration: 1000,
            easing: 'ease-out'
        }).onfinish = () => particle.remove();
    }
}

// Easter Egg: Triple Click for Big Celebration
let clickCount = 0;
let clickTimer = null;

document.addEventListener('click', (e) => {
    clickCount++;

    if (clickCount === 1) {
        clickTimer = setTimeout(() => {
            clickCount = 0;
        }, 500);
    } else if (clickCount === 3) {
        clearTimeout(clickTimer);
        clickCount = 0;
        triggerBigCelebration(e.clientX, e.clientY);
    }
});

function triggerBigCelebration(x, y) {
    // Create massive golden explosion
    for (let i = 0; i < 100; i++) {
        setTimeout(() => {
            const particle = document.createElement('div');
            particle.textContent = ['🎂', '🎉', '🎊', '✨', '⭐', '💛', '👑'][Math.floor(Math.random() * 7)];
            particle.style.cssText = `
                position: fixed;
                left: ${x}px;
                top: ${y}px;
                font-size: ${Math.random() * 30 + 20}px;
                pointer-events: none;
                z-index: 10000;
            `;

            document.body.appendChild(particle);

            const angle = (Math.PI * 2 * i) / 100;
            const velocity = 200 + Math.random() * 300;
            const tx = Math.cos(angle) * velocity;
            const ty = Math.sin(angle) * velocity;

            particle.animate([
                { transform: 'translate(-50%, -50%) scale(0) rotate(0deg)', opacity: 1 },
                { transform: `translate(${tx}px, ${ty}px) scale(1) rotate(${360}deg)`, opacity: 0 }
            ], {
                duration: 2000 + Math.random() * 1000,
                easing: 'cubic-bezier(.17,.67,.83,.67)'
            }).onfinish = () => particle.remove();
        }, i * 20);
    }

    // Show special message
    const message = document.createElement('div');
    message.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%) scale(0);
        background: linear-gradient(135deg, #D4AF37, #B8860B);
        padding: 3rem 4rem;
        border-radius: 30px;
        box-shadow: 0 30px 80px rgba(212, 175, 55, 0.5);
        z-index: 10001;
        text-align: center;
        border: 5px solid #F4E4C1;
    `;

    message.innerHTML = `
        <h2 style="font-family: 'Playfair Display', serif; font-size: 3rem; color: #0A1128; margin-bottom: 1rem;">🎉 SURPRISE! 🎉</h2>
        <p style="font-family: 'Montserrat', sans-serif; font-size: 1.3rem; color: #0A1128;">Happy Birthday to the BEST Dad Ever!</p>
        <button onclick="this.parentElement.remove()" style="
            margin-top: 2rem;
            padding: 1rem 3rem;
            background: #0A1128;
            border: none;
            border-radius: 50px;
            color: #D4AF37;
            font-family: 'Montserrat', sans-serif;
            font-size: 1.1rem;
            font-weight: 600;
            cursor: pointer;
            box-shadow: 0 10px 30px rgba(10, 17, 40, 0.3);
        ">Thank You! 👑</button>
    `;

    document.body.appendChild(message);

    setTimeout(() => {
        message.style.transition = 'transform 0.6s cubic-bezier(.34,1.56,.64,1)';
        message.style.transform = 'translate(-50%, -50%) scale(1)';
    }, 100);
}

// Initialize Everything
document.addEventListener('DOMContentLoaded', () => {
    console.log('🎂 Happy Birthday Dad! 🎂');
    console.log('Made with love by Kojo');

    // Initialize all systems
    new ParticlesSystem();
    new CelebrationCanvas();
    new ParallaxEffect();
    new SparkleEffect();
    new MouseTrail();

    setupPhotoUpload();
    setup3DEffect();
    setupTextReveal();

    // Show initial celebration after page loads
    setTimeout(() => {
        const centerX = window.innerWidth / 2;
        const centerY = window.innerHeight / 2;
        triggerBigCelebration(centerX, centerY);
    }, 2000);
});

// Resize handler
window.addEventListener('resize', () => {
    // Reinitialize canvas
    const celebration = new CelebrationCanvas();
});