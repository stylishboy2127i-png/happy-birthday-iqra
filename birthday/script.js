// ❤️ Professional Romantic Birthday Website - Taimoor & Iqra ❤️

// ==================== CONFIGURATION ====================
const CONFIG = {
    password: "2127",                    // Unlock password (case-insensitive)
    loveStartDate: "2024-01-01",         // 💕 Apna start date change karein (YYYY-MM-DD)
    birthdayDate: "",                    // e.g. "22 August" - khaali chhoda to auto text
};

// ==================== PRELOADER ====================
window.addEventListener('load', () => {
    const fill = document.getElementById('preloaderFill');
    const preloader = document.getElementById('preloader');
    let progress = 0;

    const interval = setInterval(() => {
        progress += Math.random() * 25;
        if (progress >= 100) {
            progress = 100;
            clearInterval(interval);
            setTimeout(() => {
                preloader.classList.add('hidden');
            }, 400);
        }
        fill.style.width = progress + '%';
    }, 200);
});

// ==================== SCROLL PROGRESS ====================
window.addEventListener('scroll', () => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const pct = (scrollTop / docHeight) * 100;
    document.getElementById('scrollProgress').style.width = pct + '%';
});

// ==================== FLOATING HEARTS ====================
function createFloatingHearts() {
    const heartsBg = document.getElementById('heartsBg');
    const symbols = ['💗', '💖', '💕', '💘', '❤️', '🩷', '💝', '🥰'];

    function spawn() {
        const el = document.createElement('div');
        el.classList.add('floating-heart');
        el.textContent = symbols[Math.floor(Math.random() * symbols.length)];
        el.style.left = Math.random() * 100 + '%';
        el.style.fontSize = (14 + Math.random() * 28) + 'px';
        el.style.animationDuration = (7 + Math.random() * 9) + 's';
        heartsBg.appendChild(el);
        setTimeout(() => el.remove(), 17000);
    }

    for (let i = 0; i < 6; i++) setTimeout(spawn, i * 500);
    setInterval(spawn, 900);
}

// ==================== FLOATING BALLOONS ====================
function createBalloons() {
    const bg = document.getElementById('balloonsBg');
    const balloons = ['🎈', '🎀', '🎊'];

    function spawn() {
        const el = document.createElement('div');
        el.classList.add('floating-balloon');
        el.textContent = balloons[Math.floor(Math.random() * balloons.length)];
        el.style.left = Math.random() * 100 + '%';
        el.style.fontSize = (30 + Math.random() * 30) + 'px';
        el.style.animationDuration = (14 + Math.random() * 10) + 's';
        bg.appendChild(el);
        setTimeout(() => el.remove(), 25000);
    }

    setInterval(spawn, 3500);
}

// ==================== LOCK SCREEN ====================
function initLockScreen() {
    const passwordInput = document.getElementById('passwordInput');
    const togglePassword = document.getElementById('togglePassword');
    const unlockBtn = document.getElementById('unlockBtn');
    const hintText = document.getElementById('hintText');
    const lockScreen = document.getElementById('lockScreen');

    togglePassword.addEventListener('click', () => {
        if (passwordInput.type === 'password') {
            passwordInput.type = 'text';
            togglePassword.textContent = '🙈';
        } else {
            passwordInput.type = 'password';
            togglePassword.textContent = '👁️';
        }
    });

    function tryUnlock() {
        const entered = passwordInput.value.trim().toLowerCase();
        if (entered === CONFIG.password.toLowerCase()) {
            lockScreen.style.opacity = '0';
            lockScreen.style.transition = 'opacity 0.9s ease';
            setTimeout(() => {
                lockScreen.classList.remove('active');
                showSection('heroSection');
                launchConfetti();
                startCounter();
                initBlowCandles();
            }, 900);
        } else {
            hintText.textContent = 'Oops! Try again 💔 Hint: her name';
            lockScreen.classList.add('shake');
            setTimeout(() => lockScreen.classList.remove('shake'), 600);
            passwordInput.value = '';
            passwordInput.focus();
        }
    }

    unlockBtn.addEventListener('click', tryUnlock);
    passwordInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') tryUnlock();
    });
}

// ==================== SECTION NAVIGATION ====================
function showSection(sectionId) {
    document.querySelectorAll('.hero-section, .video-intro-section, .reasons-section, .memories-section, .timeline-section, .video-section, .letter-section, .wishes-section, .cake-section')
        .forEach(s => s.classList.remove('active'));

    const target = document.getElementById(sectionId);
    if (target) {
        target.classList.add('active');
        setTimeout(() => target.scrollIntoView({ behavior: 'smooth', block: 'start' }), 100);
        animateVisibleSection(sectionId);

        // If video intro section - start curtain + autoplay
        if (sectionId === 'videoIntroSection') {
            initVideoIntro();
        }
    }
}

// ==================== CONFETTI ====================
function launchConfetti() {
    if (typeof confetti === 'undefined') return;
    const duration = 4500;
    const end = Date.now() + duration;
    const colors = ['#ff2d78', '#ff69b4', '#ff1493', '#ffd700', '#ff85c0', '#ff6b6b'];

    (function frame() {
        confetti({ particleCount: 5, angle: 60, spread: 55, origin: { x: 0, y: 0.7 }, colors, scalar: 1.2 });
        confetti({ particleCount: 5, angle: 120, spread: 55, origin: { x: 1, y: 0.7 }, colors, scalar: 1.2 });
        if (Date.now() < end) requestAnimationFrame(frame);
    })();

    setTimeout(() => {
        confetti({
            particleCount: 35, spread: 100, origin: { y: 0.5, x: 0.5 },
            colors: ['#ff2d78', '#ff69b4', '#ff1493'], shapes: ['circle'], scalar: 1.5, startVelocity: 30
        });
    }, 500);
}

function miniConfetti() {
    if (typeof confetti === 'undefined') return;
    confetti({
        particleCount: 45, spread: 75, origin: { y: 0.6, x: 0.5 },
        colors: ['#ff2d78', '#ff69b4', '#ffd700', '#ff1493'], scalar: 1.1
    });
}

// ==================== COUNTER (Days of Love) ====================
function startCounter() {
    const el = document.getElementById('daysCounter');
    const start = new Date(CONFIG.loveStartDate);
    const now = new Date();
    const target = Math.max(1, Math.floor((now - start) / 86400000));

    let current = 0;
    const step = Math.max(1, Math.floor(target / 60));
    const interval = setInterval(() => {
        current += step;
        if (current >= target) {
            current = target;
            clearInterval(interval);
        }
        el.textContent = current.toLocaleString();
    }, 30);
}

// ==================== PARTICLES CANVAS (Hero) ====================
function initParticlesCanvas() {
    const canvas = document.getElementById('particlesCanvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let particles = [];
    let w, h;

    function resize() {
        w = canvas.width = canvas.offsetWidth;
        h = canvas.height = canvas.offsetHeight;
    }
    resize();
    window.addEventListener('resize', resize);

    class Particle {
        constructor() { this.reset(); }
        reset() {
            this.x = Math.random() * w;
            this.y = Math.random() * h;
            this.size = Math.random() * 3 + 1;
            this.speedY = -(Math.random() * 0.5 + 0.15);
            this.speedX = (Math.random() - 0.5) * 0.3;
            this.opacity = Math.random() * 0.5 + 0.2;
            this.color = Math.random() > 0.5 ? '#ff69b4' : '#ff2d78';
        }
        update() {
            this.y += this.speedY;
            this.x += this.speedX;
            if (this.y < -10) this.reset();
        }
        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fillStyle = this.color;
            ctx.globalAlpha = this.opacity;
            ctx.fill();
            ctx.globalAlpha = 1;
        }
    }

    for (let i = 0; i < 80; i++) particles.push(new Particle());

    function animate() {
        ctx.clearRect(0, 0, w, h);
        particles.forEach(p => { p.update(); p.draw(); });
        requestAnimationFrame(animate);
    }
    animate();
}

// ==================== COMPLIMENTS ====================
function initCompliments() {
    const compliments = [
        "You have the most beautiful smile in the entire universe 💖",
        "Your eyes shine brighter than a thousand stars ✨",
        "Every love song reminds me of you 🎵",
        "You are the reason I believe in love 💕",
        "Your laugh is my favorite sound in the world 😊",
        "I fall in love with you a little more every day 💗",
        "You make my world a better place just by being in it 🌍",
        "Your kindness inspires me to be a better person 🥰",
        "I am the luckiest person alive to call you mine 💍",
        "Your hugs are my favorite place in the whole world 🤗",
        "You are my today and all of my tomorrows 📅",
        "My heart chose you and it will choose you every time 💓",
        "You make ordinary moments feel magical ✨",
        "Being with you feels like coming home 🏡",
        "You are the best thing that ever happened to me 🎁",
    ];

    const btn = document.getElementById('complimentBtn');
    const text = document.getElementById('complimentText');
    let lastIdx = -1;

    btn.addEventListener('click', () => {
        text.style.opacity = '0';
        setTimeout(() => {
            let idx;
            do { idx = Math.floor(Math.random() * compliments.length); } while (idx === lastIdx);
            lastIdx = idx;
            text.textContent = compliments[idx];
            text.style.opacity = '1';
            miniConfetti();
        }, 300);
    });
}

// ==================== SECTION NAVIGATION BUTTONS ====================
function initNavButtons() {
    const map = [
        ['startJourneyBtn', 'videoIntroSection'],    // Hero -> Video Intro (after cake)
        ['videoIntroContinueBtn', 'reasonsSection'],  // Video -> Reasons
        ['reasonsContinueBtn', 'timelineSection'],    // Reasons -> Timeline
        ['timelineContinueBtn', 'memoriesSection'],   // Timeline -> Memories
        ['memoriesContinueBtn', 'videoSection'],      // Memories -> Video
        ['videoContinueBtn', 'letterSection'],        // Video -> Letter
        ['letterContinueBtn', 'wishesSection'],       // Letter -> Wishes
        ['wishesContinueBtn', 'cakeSection'],         // Wishes -> Cake
    ];

    map.forEach(([btnId, sectionId]) => {
        const btn = document.getElementById(btnId);
        if (btn) {
            btn.addEventListener('click', () => {
                miniConfetti();
                setTimeout(() => showSection(sectionId), 350);
            });
        }
    });
}

// ==================== VIDEO INTRO (Auto Play) ====================
let videoIntroStarted = false;

function initVideoIntro() {
    const section = document.getElementById('videoIntroSection');
    const video = document.getElementById('introVideo');
    const overlay = document.getElementById('viOverlay');
    const playBig = document.getElementById('viPlayBig');
    const loading = document.getElementById('viLoading');
    const playPause = document.getElementById('viPlayPause');
    const timeEl = document.getElementById('viTime');
    const progress = document.getElementById('viProgress');
    const progressFill = document.getElementById('viProgressFill');
    const muteBtn = document.getElementById('viMute');
    const replayBtn = document.getElementById('viReplay');
    const fullBtn = document.getElementById('viFull');

    // Floating hearts in this section
    createViHearts();

    // Curtain reveal - open after slight delay
    setTimeout(() => {
        section.classList.add('curtain-open');
    }, 600);

    // Auto play video after curtain opens
    if (!videoIntroStarted) {
        videoIntroStarted = true;

        setTimeout(() => {
            video.currentTime = 0;
            video.play().then(() => {
                overlay.classList.add('hidden');
                loading.style.display = 'none';
            }).catch(() => {
                // Autoplay blocked - show play button
                loading.textContent = 'Tap play to start ▶';
            });
        }, 1800);
    } else {
        // Already played once - resume
        if (video.paused && video.currentTime === 0) {
            video.play().then(() => overlay.classList.add('hidden')).catch(() => {});
        }
    }

    // Big play button
    playBig.addEventListener('click', () => {
        video.play().then(() => {
            overlay.classList.add('hidden');
            launchMiniIfConfetti();
        }).catch(() => {
            alert('Video load nahi hui - bubu.mp4 website folder mein rakhein!');
        });
    });

    // Video events
    video.addEventListener('play', () => {
        overlay.classList.add('hidden');
        playPause.textContent = '⏸';
    });

    video.addEventListener('pause', () => {
        if (!video.ended) overlay.classList.remove('hidden');
        playPause.textContent = '▶';
    });

    video.addEventListener('ended', () => {
        overlay.classList.remove('hidden');
        playBig.innerHTML = '<span class="vi-play-tri">↻</span>';
        loading.textContent = 'Replay? ▶';
        loading.style.display = 'block';
        launchMiniIfConfetti();
    });

    video.addEventListener('timeupdate', () => {
        if (video.duration) {
            const pct = (video.currentTime / video.duration) * 100;
            progressFill.style.width = pct + '%';
            timeEl.textContent = fmt(video.currentTime) + ' / ' + fmt(video.duration);
        }
    });

    video.addEventListener('loadedmetadata', () => {
        timeEl.textContent = '00:00 / ' + fmt(video.duration);
    });

    // Controls
    playPause.addEventListener('click', () => {
        if (video.paused) video.play();
        else video.pause();
    });

    progress.addEventListener('click', (e) => {
        if (video.duration) {
            const rect = progress.getBoundingClientRect();
            video.currentTime = ((e.clientX - rect.left) / rect.width) * video.duration;
        }
    });

    muteBtn.addEventListener('click', () => {
        video.muted = !video.muted;
        muteBtn.textContent = video.muted ? '🔇' : '🔊';
    });

    replayBtn.addEventListener('click', () => {
        video.currentTime = 0;
        video.play();
        overlay.classList.add('hidden');
    });

    fullBtn.addEventListener('click', () => {
        if (video.requestFullscreen) video.requestFullscreen();
        else if (video.webkitEnterFullscreen) video.webkitEnterFullscreen();
    });

    // Click video area to toggle play
    video.addEventListener('click', () => {
        if (video.paused) video.play();
        else video.pause();
    });
}

function launchMiniIfConfetti() {
    if (typeof confetti !== 'undefined') miniConfetti();
}

// Floating hearts inside video section
function createViHearts() {
    const container = document.getElementById('viHearts');
    if (!container || container.dataset.done) return;
    container.dataset.done = '1';

    const symbols = ['💗', '💖', '💕', '❤️', '🩷'];

    function spawn() {
        const el = document.createElement('div');
        el.classList.add('vi-heart');
        el.textContent = symbols[Math.floor(Math.random() * symbols.length)];
        el.style.left = Math.random() * 100 + '%';
        el.style.fontSize = (16 + Math.random() * 24) + 'px';
        el.style.animationDuration = (8 + Math.random() * 8) + 's';
        container.appendChild(el);
        setTimeout(() => el.remove(), 17000);
    }

    for (let i = 0; i < 5; i++) setTimeout(spawn, i * 600);
    setInterval(() => {
        if (document.getElementById('videoIntroSection').classList.contains('active')) {
            spawn();
        }
    }, 1200);
}

// ==================== VIDEO PLAYER (Original Section) ====================
function initVideoPlayer() {
    const video = document.getElementById('loveVideo');
    const overlay = document.getElementById('videoOverlay');
    const playBtn = document.getElementById('playVideoBtn');
    const vcPlay = document.getElementById('vcPlay');
    const vcMute = document.getElementById('vcMute');
    const vcFull = document.getElementById('vcFull');
    const progressBar = document.getElementById('progressBar');
    const videoTime = document.getElementById('videoTime');
    const vcProgress = document.getElementById('vcProgress');

    function togglePlay() {
        if (video.paused) {
            video.play().catch(() => {
                alert('🎬 Video add karein: website folder mein "our-video.mp4" rakhein');
            });
        } else {
            video.pause();
        }
    }

    playBtn.addEventListener('click', togglePlay);
    vcPlay.addEventListener('click', togglePlay);
    video.addEventListener('click', togglePlay);

    video.addEventListener('play', () => {
        overlay.classList.add('hidden');
        vcPlay.textContent = '⏸';
    });

    video.addEventListener('pause', () => {
        overlay.classList.remove('hidden');
        vcPlay.textContent = '▶';
    });

    video.addEventListener('timeupdate', () => {
        if (video.duration) {
            const pct = (video.currentTime / video.duration) * 100;
            progressBar.style.width = pct + '%';
            videoTime.textContent = fmt(video.currentTime) + ' / ' + fmt(video.duration);
        }
    });

    vcProgress.addEventListener('click', (e) => {
        if (video.duration) {
            const rect = vcProgress.getBoundingClientRect();
            video.currentTime = ((e.clientX - rect.left) / rect.width) * video.duration;
        }
    });

    vcMute.addEventListener('click', () => {
        video.muted = !video.muted;
        vcMute.textContent = video.muted ? '🔇' : '🔊';
    });

    vcFull.addEventListener('click', () => {
        if (video.requestFullscreen) video.requestFullscreen();
    });
}

function fmt(sec) {
    const m = Math.floor(sec / 60);
    const s = Math.floor(sec % 60);
    return String(m).padStart(2, '0') + ':' + String(s).padStart(2, '0');
}

// ==================== LETTER (Envelope + Typewriter) ====================
function initLetter() {
    const envelopeWrap = document.getElementById('envelopeWrap');
    const letterCard = document.getElementById('letterCard');
    const letterContinueBtn = document.getElementById('letterContinueBtn');
    const letterDate = document.getElementById('letterDate');

    // Set today's date in letter
    const now = new Date();
    letterDate.textContent = now.toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });

    envelopeWrap.addEventListener('click', () => {
        envelopeWrap.classList.add('opened');
        setTimeout(() => {
            letterCard.classList.add('revealed');
            envelopeWrap.style.display = 'none';
            launchConfetti();
            typewriterSequence();
            setTimeout(() => {
                letterContinueBtn.style.display = 'inline-block';
            }, 2500);
        }, 700);
    });
}

function typewriterSequence() {
    const lines = ['typewriter1', 'typewriter2', 'typewriter3', 'typewriter4'];
    let delay = 300;

    lines.forEach((id) => {
        const el = document.getElementById(id);
        if (!el) return;
        const fullText = el.textContent;
        el.textContent = '';
        el.style.opacity = '1';

        setTimeout(() => {
            let i = 0;
            const interval = setInterval(() => {
                el.textContent = fullText.slice(0, i + 1);
                i++;
                if (i >= fullText.length) clearInterval(interval);
            }, 18);
        }, delay);

        delay += fullText.length * 18 + 250;
    });
}

// ==================== FIREWORKS (Canvas) ====================
function initFireworks() {
    const canvas = document.getElementById('fireworksCanvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let w, h;
    const fireworks = [];
    const particles = [];
    const colors = ['#ff2d78', '#ff69b4', '#ffd700', '#ff1493', '#ff85c0', '#fff', '#ff6b6b'];

    function resize() {
        w = canvas.width = canvas.offsetWidth;
        h = canvas.height = canvas.offsetHeight;
    }
    resize();
    window.addEventListener('resize', resize);

    class Firework {
        constructor() {
            this.x = Math.random() * w;
            this.y = h;
            this.targetY = Math.random() * h * 0.5 + 50;
            this.speed = Math.random() * 3 + 4;
            this.color = colors[Math.floor(Math.random() * colors.length)];
            this.alive = true;
        }
        update() {
            this.y -= this.speed;
            if (this.y <= this.targetY) {
                this.alive = false;
                explode(this.x, this.y, this.color);
            }
        }
        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, 2.5, 0, Math.PI * 2);
            ctx.fillStyle = this.color;
            ctx.shadowBlur = 12;
            ctx.shadowColor = this.color;
            ctx.fill();
            ctx.shadowBlur = 0;
        }
    }

    function explode(x, y, color) {
        for (let i = 0; i < 50; i++) {
            const angle = (Math.PI * 2 / 50) * i;
            const speed = Math.random() * 4 + 1.5;
            particles.push({
                x, y,
                vx: Math.cos(angle) * speed,
                vy: Math.sin(angle) * speed,
                life: 1,
                color,
                size: Math.random() * 2.5 + 1,
            });
        }
    }

    function animate() {
        ctx.clearRect(0, 0, w, h);

        if (Math.random() < 0.03) fireworks.push(new Firework());

        for (let i = fireworks.length - 1; i >= 0; i--) {
            fireworks[i].update();
            fireworks[i].draw();
            if (!fireworks[i].alive) fireworks.splice(i, 1);
        }

        for (let i = particles.length - 1; i >= 0; i--) {
            const p = particles[i];
            p.x += p.vx;
            p.y += p.vy;
            p.vy += 0.04;
            p.vx *= 0.99;
            p.life -= 0.015;

            if (p.life <= 0) { particles.splice(i, 1); continue; }

            ctx.globalAlpha = p.life;
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
            ctx.fillStyle = p.color;
            ctx.shadowBlur = 8;
            ctx.shadowColor = p.color;
            ctx.fill();
            ctx.globalAlpha = 1;
            ctx.shadowBlur = 0;
        }

        requestAnimationFrame(animate);
    }
    animate();
}

// ==================== BLOW CANDLES (Hero) ====================
function initBlowCandles() {
    const btn = document.getElementById('blowHeroBtn');
    const hint = document.getElementById('blowHeroHint');
    const cake = document.getElementById('heroCake');
    if (!btn || !cake) return;
    let blown = false;

    btn.addEventListener('click', () => {
        if (blown) return;
        blown = true;

        cake.classList.add('blown');
        hint.textContent = '🎉 Wish granted! 🌟';
        hint.style.color = '#ffd700';
        btn.textContent = '🎂 Wish Made!';
        btn.style.background = 'linear-gradient(135deg, #ffd700, #ff8c00)';

        launchConfetti();
        setTimeout(() => launchConfetti(), 800);
        setTimeout(() => launchConfetti(), 1600);

        // Relight after 4 seconds
        setTimeout(() => {
            cake.classList.remove('blown');
            hint.textContent = 'Make a wish first! 🌟';
            hint.style.color = '';
            btn.textContent = '🌬️ Blow the Candles!';
            btn.style.background = '';
            blown = false;
        }, 4000);
    });
}

// ==================== MUSIC / SONGS ====================
function initMusic() {
    const audio = document.getElementById('bgMusic');
    const musicToggle = document.getElementById('musicToggle');
    const songName = document.getElementById('songName');
    const progressFill = document.getElementById('musicProgressFill');
    const dockToggle = document.getElementById('songDockToggle');
    const dockPanel = document.getElementById('songDockPanel');
    const songBtns = document.querySelectorAll('.song-btn[data-song]');
    const stopBtn = document.getElementById('stopSongBtn');
    let currentBtn = null;

    // Song dock toggle
    dockToggle.addEventListener('click', () => {
        dockPanel.classList.toggle('open');
    });

    // Close dock when clicking outside
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.song-dock')) {
            dockPanel.classList.remove('open');
        }
    });

    // Play selected song
    songBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const src = btn.dataset.song;
            const name = btn.dataset.name;

            if (currentBtn) currentBtn.classList.remove('active-song');
            btn.classList.add('active-song');
            currentBtn = btn;

            audio.src = src;
            audio.play().then(() => {
                songName.textContent = '🎶 ' + name;
                musicToggle.textContent = '🔊';
            }).catch(() => {
                songName.textContent = '⚠️ ' + name + ' (MP3 file not found)';
                alert('🎵 "' + src + '" file website folder mein rakhein!\n\nSongs to download:\n1. Tera Ban Jaunga\n2. Raataan Lambiyan\n3. Dil Diyan Gallan\n4. Tum Se Hi\n5. Kesariya');
            });

            dockPanel.classList.remove('open');
        });
    });

    stopBtn.addEventListener('click', () => {
        audio.pause();
        audio.currentTime = 0;
        if (currentBtn) currentBtn.classList.remove('active-song');
        currentBtn = null;
        musicToggle.textContent = '🔇';
        songName.textContent = 'Select a song below 🎶';
        dockPanel.classList.remove('open');
    });

    // Mute toggle
    musicToggle.addEventListener('click', () => {
        if (!audio.src) {
            dockPanel.classList.add('open');
            return;
        }
        if (audio.paused) {
            audio.play();
            musicToggle.textContent = '🔊';
        } else {
            audio.pause();
            musicToggle.textContent = '🔇';
        }
    });

    // Progress
    audio.addEventListener('timeupdate', () => {
        if (audio.duration) {
            progressFill.style.width = (audio.currentTime / audio.duration) * 100 + '%';
        }
    });
}

// ==================== HERO DATE ====================
function initHeroDate() {
    const el = document.getElementById('heroDate');
    if (CONFIG.birthdayDate) {
        el.textContent = '📅 ' + CONFIG.birthdayDate + ' 📅';
    } else {
        el.textContent = '📅 Your Special Day 📅';
    }

    // Letter date also handled in initLetter
}

// ==================== SCROLL FADE ANIMATIONS ====================
function animateVisibleSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (!section) return;

    const elements = section.querySelectorAll('.reason-card, .wish-card, .timeline-item, .polaroid-frame, .gallery-tile');
    elements.forEach((el, i) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(35px)';
        el.style.transition = 'opacity 0.7s ease, transform 0.7s ease';

        setTimeout(() => {
            el.style.opacity = '1';
            el.style.transform = 'translateY(0)';
        }, 150 + i * 100);
    });
}

// ==================== KEYBOARD EASTER EGG ====================
function initEasterEgg() {
    const keys = ['i', 'q', 'r', 'a'];
    let buffer = '';

    document.addEventListener('keydown', (e) => {
        buffer += e.key.toLowerCase();
        if (buffer.length > 4) buffer = buffer.slice(-4);
        if (buffer === keys.join('')) {
            launchConfetti();
            buffer = '';
        }
    });
}

// ==================== INIT EVERYTHING ====================
document.addEventListener('DOMContentLoaded', () => {
    createFloatingHearts();
    createBalloons();
    initLockScreen();
    initNavButtons();
    initVideoPlayer();
    initLetter();
    initCompliments();
    initMusic();
    initHeroDate();
    initEasterEgg();
    createHeroSparkles();

    // Particles canvas - init after hero shows
    setTimeout(initParticlesCanvas, 100);
    setTimeout(startCakeBubbles, 500);

    // Fireworks - init when cake section first shown
    const cakeObserver = new MutationObserver(() => {
        const cakeSection = document.getElementById('cakeSection');
        if (cakeSection.classList.contains('active')) {
            initFireworks();
            initBlowCandles();
            cakeObserver.disconnect();
        }
    });

    const cakeSection = document.getElementById('cakeSection');
    if (cakeSection) {
        cakeObserver.observe(cakeSection, { attributes: true, attributeFilter: ['class'] });
    }
});

// ==================== HERO SPARKLES ====================
function createHeroSparkles() {
    const container = document.getElementById('heroSparkles');
    if (!container) return;

    function spawn() {
        const s = document.createElement('div');
        s.classList.add('sparkle');
        s.style.left = Math.random() * 100 + '%';
        s.style.top = Math.random() * 100 + '%';
        s.style.animationDelay = Math.random() * 2 + 's';
        s.style.animationDuration = (1.5 + Math.random() * 2) + 's';
        s.style.transform = 'scale(' + (0.5 + Math.random() * 1) + ')';
        container.appendChild(s);
        setTimeout(() => s.remove(), 4000);
    }

    for (let i = 0; i < 12; i++) setTimeout(spawn, i * 250);
    setInterval(spawn, 500);
}

// ==================== CAKE BUBBLES (Hero Cake) ====================
function startCakeBubbles() {
    const container = document.getElementById('cakeBubbles');
    if (!container) return;

    function spawn() {
        const b = document.createElement('div');
        b.classList.add('cake-bubble');
        b.style.left = (20 + Math.random() * 60) + '%';
        b.style.bottom = '30%';
        b.style.width = (4 + Math.random() * 7) + 'px';
        b.style.height = b.style.width;
        b.style.animationDuration = (2 + Math.random() * 2) + 's';
        const colors = ['#ff69b4', '#ff2d78', '#ffd700', '#fff', '#ff85c0'];
        b.style.background = colors[Math.floor(Math.random() * colors.length)];
        container.appendChild(b);
        setTimeout(() => b.remove(), 4000);
    }

    setInterval(spawn, 350);
}
