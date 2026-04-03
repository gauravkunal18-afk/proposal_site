/* =============================================
   NVN.BUILDS — Script ❤️
   Single-page proposal with screen transitions,
   floating hearts, sparkles, and runaway button
   ============================================= */

// ──────────── Floating Hearts Background ────────────
(function createFloatingHearts() {
  const container = document.getElementById('hearts-bg');
  const heartEmojis = ['❤️', '💕', '💗', '💖', '💘', '💝', '✨', '🌸'];
  const heartCount = 25;

  for (let i = 0; i < heartCount; i++) {
    const heart = document.createElement('span');
    heart.classList.add('floating-heart');
    heart.textContent = heartEmojis[Math.floor(Math.random() * heartEmojis.length)];
    heart.style.left = Math.random() * 100 + '%';
    heart.style.animationDuration = (8 + Math.random() * 12) + 's';
    heart.style.animationDelay = (Math.random() * 15) + 's';
    heart.style.fontSize = (0.8 + Math.random() * 1.2) + 'rem';
    container.appendChild(heart);
  }
})();

// ──────────── Sparkle Overlay ────────────
(function createSparkles() {
  const container = document.getElementById('sparkle-overlay');
  const sparkleCount = 30;

  for (let i = 0; i < sparkleCount; i++) {
    const sparkle = document.createElement('span');
    sparkle.classList.add('sparkle');
    sparkle.style.left = Math.random() * 100 + '%';
    sparkle.style.top = Math.random() * 100 + '%';
    sparkle.style.animationDuration = (2 + Math.random() * 3) + 's';
    sparkle.style.animationDelay = (Math.random() * 5) + 's';
    sparkle.style.width = (2 + Math.random() * 4) + 'px';
    sparkle.style.height = sparkle.style.width;
    container.appendChild(sparkle);
  }
})();

// ──────────── Envelope Click → Main Screen ────────────
(function setupEnvelope() {
  const envelope = document.getElementById('envelope');
  if (!envelope) return;

  envelope.addEventListener('click', function () {
    envelope.classList.add('opened');
    setTimeout(function () {
      showScreen('screen-main');
    }, 600);
  });
})();

// ──────────── Screen Transition System ────────────
let isTransitioning = false;

function showScreen(targetId) {
  if (isTransitioning) return;
  isTransitioning = true;

  const currentScreen = document.querySelector('.screen.active');
  const targetScreen = document.getElementById(targetId);

  if (!targetScreen || currentScreen === targetScreen) {
    isTransitioning = false;
    return;
  }

  // Hide current screen
  if (currentScreen) {
    currentScreen.classList.remove('active');
  }

  // Show target screen
  targetScreen.classList.add('active');

  // Reload tenor embeds for the new screen
  reloadTenorEmbeds(targetScreen);

  // If it's the yes screen, burst hearts!
  if (targetId === 'screen-yes') {
    setTimeout(burstHearts, 400);
  }

  isTransitioning = false;
}

// ──────────── Tenor Embed Reload ────────────
function reloadTenorEmbeds(container) {
  // Tenor's embed.js looks for unprocessed .tenor-gif-embed elements
  // We need to re-trigger it
  if (window.tenor && window.tenor.Player) {
    try {
      window.tenor.Player.init();
    } catch (e) {
      // Fallback: re-inject script
    }
  }

  // Alternative: re-insert the script tag to trigger processing
  var oldScripts = document.querySelectorAll('script[src*="tenor.com/embed"]');
  if (oldScripts.length > 0) {
    var s = document.createElement('script');
    s.src = 'https://tenor.com/embed.js';
    s.async = true;
    document.body.appendChild(s);
  }
}

// ──────────── Runaway "No" Button ────────────
(function setupRunawayButton() {
  const btn = document.getElementById('btn-runaway');
  if (!btn) return;

  function moveButton(e) {
    const card = btn.closest('.glass-card');
    if (!card) return;

    const cardRect = card.getBoundingClientRect();
    const btnW = btn.offsetWidth;
    const btnH = btn.offsetHeight;

    // Calculate random position within the card boundaries
    const padding = 20;
    const maxX = cardRect.width - btnW - padding * 2;
    const maxY = cardRect.height - btnH - padding * 2;

    const newX = Math.random() * maxX;
    const newY = Math.random() * maxY;

    btn.style.position = 'absolute';
    btn.style.left = (padding + newX) + 'px';
    btn.style.top = (padding + newY) + 'px';
    btn.style.zIndex = '50';
  }

  btn.addEventListener('mouseenter', moveButton);
  btn.addEventListener('touchstart', function (e) {
    e.preventDefault();
    moveButton(e);
  }, { passive: false });
})();

// ──────────── Heart Burst Effect (Yes screen) ────────────
function burstHearts() {
  const container = document.getElementById('heart-burst');
  if (!container) return;
  container.innerHTML = '';

  const hearts = ['❤️', '💖', '💗', '💕', '💘', '💝', '🥰', '😘', '✨', '🌟'];
  const count = 40;

  for (let i = 0; i < count; i++) {
    const heart = document.createElement('span');
    heart.classList.add('burst-heart');
    heart.textContent = hearts[Math.floor(Math.random() * hearts.length)];

    // Random direction from center
    const angle = (Math.PI * 2 * i) / count + (Math.random() - 0.5) * 0.5;
    const distance = 150 + Math.random() * 350;
    const dx = Math.cos(angle) * distance;
    const dy = Math.sin(angle) * distance;
    const rot = Math.random() * 720 - 360;

    heart.style.left = '50%';
    heart.style.top = '50%';
    heart.style.setProperty('--dx', dx + 'px');
    heart.style.setProperty('--dy', dy + 'px');
    heart.style.setProperty('--rot', rot + 'deg');
    heart.style.animationDelay = (Math.random() * 0.5) + 's';
    heart.style.fontSize = (1 + Math.random() * 1.5) + 'rem';

    container.appendChild(heart);
  }

  // Clean up after animation
  setTimeout(function () {
    container.innerHTML = '';
  }, 3000);
}

// ──────────── Yes Button Growing Effect ────────────
// Make Yes button slightly bigger each time No is pressed
(function setupYesGrowth() {
  let noCount = 0;
  const noButtons = document.querySelectorAll('.btn-no');
  
  noButtons.forEach(function (btn) {
    btn.addEventListener('click', function () {
      noCount++;
      // Make all Yes buttons bigger
      document.querySelectorAll('.btn-yes').forEach(function (yesBtn) {
        const scale = 1 + (noCount * 0.08);
        yesBtn.style.transform = 'scale(' + scale + ')';
        yesBtn.style.boxShadow = '0 ' + (4 + noCount * 2) + 'px ' + (20 + noCount * 5) + 'px rgba(232, 67, 147, ' + (0.35 + noCount * 0.05) + ')';
      });
    });
  });
})();
