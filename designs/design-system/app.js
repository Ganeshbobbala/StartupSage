// Navigation Switcher
document.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    
    // Remove active from all links and sections
    document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
    document.querySelectorAll('.doc-section').forEach(s => s.classList.remove('active'));
    
    // Add active to current link and section
    const targetSectionId = link.getAttribute('data-section');
    link.classList.add('active');
    
    const targetSection = document.getElementById(targetSectionId);
    if (targetSection) {
      targetSection.classList.add('active');
    }
  });
});

// Theme Switcher (Light / Dark Mode)
const themeToggle = document.getElementById('theme-toggle');
if (themeToggle) {
  themeToggle.addEventListener('change', () => {
    if (themeToggle.checked) {
      document.documentElement.setAttribute('data-theme', 'dark');
    } else {
      document.documentElement.setAttribute('data-theme', 'light');
    }
  });
}

// Clipboard Copy Helper for Color Cards
document.querySelectorAll('.color-card').forEach(card => {
  card.addEventListener('click', () => {
    const hex = card.getAttribute('data-color');
    if (hex && navigator.clipboard) {
      navigator.clipboard.writeText(hex).then(() => {
        const hexEl = card.querySelector('.color-hex');
        if (hexEl) {
          const originalText = hexEl.textContent;
          hexEl.textContent = 'Copied!';
          hexEl.style.color = 'var(--success)';
          setTimeout(() => {
            hexEl.textContent = originalText;
            hexEl.style.color = '';
          }, 1200);
        }
      }).catch(err => console.error('Clipboard copy failed:', err));
    }
  });
});

// Clipboard Copy Helper for Code Snippets
function copyCode(button) {
  if (!button || !navigator.clipboard) return;
  const container = button.nextElementSibling;
  if (!container) return;
  const codeBlock = container.querySelector('code');
  if (!codeBlock) return;
  
  navigator.clipboard.writeText(codeBlock.textContent).then(() => {
    const originalText = button.textContent;
    button.textContent = 'Copied!';
    setTimeout(() => {
      button.textContent = originalText;
    }, 1200);
  }).catch(err => console.error('Clipboard copy failed:', err));
}

// Clipboard Copy Helper for Textareas (Developer Tokens)
function copyTextarea(id) {
  const textarea = document.getElementById(id);
  if (!textarea) return;
  textarea.select();
  document.execCommand('copy');
  
  // Visual feedback on the button
  const button = textarea.previousElementSibling;
  if (button) {
    const originalText = button.textContent;
    button.textContent = 'Copied!';
    setTimeout(() => {
      button.textContent = originalText;
    }, 1200);
  }
}

// 1 & 2. Interactive Button State Controller
function setBtnState(type, state) {
  const btn = document.getElementById(`${type}-btn-preview`);
  const card = document.getElementById(`comp-${type}-btn`);
  if (!btn || !card) return;
  
  // Reset all state controls highlights
  card.querySelectorAll('.control-btn').forEach(b => b.classList.remove('active'));
  
  // Highlight clicked control button
  const event = window.event;
  if (event && event.target) {
    event.target.classList.add('active');
  }

  // Remove existing mock state classes
  btn.classList.remove('state-hover', 'state-pressed');
  btn.removeAttribute('disabled');

  // Apply new state
  if (state === 'hover') {
    btn.classList.add('state-hover');
  } else if (state === 'pressed') {
    btn.classList.add('state-pressed');
  } else if (state === 'disabled') {
    btn.setAttribute('disabled', 'true');
  }
}

// 5. Interactive Content Card Progress Controller
function setCardProgress(pct) {
  const fill = document.getElementById('card-progress-fill');
  const label = document.getElementById('card-pct-label');
  const card = document.getElementById('comp-content-card');
  if (!fill || !label || !card) return;

  // Reset controls active state
  card.querySelectorAll('.control-btn').forEach(b => b.classList.remove('active'));
  
  // Highlight clicked control
  if (window.event && window.event.target) {
    window.event.target.classList.add('active');
  } else {
    // Fallback if triggered programmatically
    const btn = document.getElementById(`btn-card-${pct}`);
    if (btn) btn.classList.add('active');
  }

  // Update progress width and text label
  fill.style.width = `${pct}%`;
  label.textContent = `${pct}%`;
}

// 6. Interactive Bottom Nav Tab Switcher
function switchNavTab(tabElement, screenName) {
  if (!tabElement) return;
  const nav = tabElement.closest('.bottom-nav');
  if (!nav) return;
  nav.querySelectorAll('.nav-tab').forEach(tab => tab.classList.remove('active'));
  
  tabElement.classList.add('active');
  
  const screenLabel = document.getElementById('nav-screen-label');
  if (screenLabel) {
    screenLabel.textContent = `${screenName} Screen`;
  }
}

// 7. Interactive Input Field Variant Controller
function setInputVariant(variant) {
  const field = document.getElementById('input-field-preview');
  const label = document.getElementById('input-preview-label');
  const container = document.getElementById('input-container-preview');
  const errorMsg = document.getElementById('input-error-msg');
  const card = document.getElementById('comp-input-field');
  if (!field || !label || !container || !errorMsg || !card) return;

  // Reset controls
  card.querySelectorAll('.control-btn').forEach(b => b.classList.remove('active'));
  if (window.event && window.event.target) {
    window.event.target.classList.add('active');
  }

  // Clear all states
  field.classList.remove('state-focus', 'state-filled', 'state-error', 'state-disabled');
  field.removeAttribute('disabled');
  container.classList.remove('error');
  errorMsg.style.display = 'none';
  label.style.color = '';

  if (variant === 'default') {
    field.value = '';
    field.placeholder = 'Enter your name';
  } else if (variant === 'focus') {
    field.value = 'Gani';
    field.classList.add('state-focus');
    field.focus();
  } else if (variant === 'filled') {
    field.value = 'Ganesh Bobbala';
    field.classList.add('state-filled');
  } else if (variant === 'error') {
    field.value = 'G@nesh123';
    field.classList.add('state-error');
    container.classList.add('error');
    errorMsg.style.display = 'flex';
  } else if (variant === 'disabled') {
    field.value = 'Ganesh Bobbala';
    field.setAttribute('disabled', 'true');
    field.classList.add('state-disabled');
  }
}

// 8. Interactive Progress Bar Controller
function setProgressBarValue(pct) {
  const fill = document.getElementById('overall-progress-fill');
  const label = document.getElementById('overall-pct-label');
  const card = document.getElementById('comp-progress-bar');
  if (!fill || !label || !card) return;

  // Reset controls
  card.querySelectorAll('.control-btn').forEach(b => b.classList.remove('active'));
  if (window.event && window.event.target) {
    window.event.target.classList.add('active');
  } else {
    const btn = document.getElementById(`btn-overall-${pct}`);
    if (btn) btn.classList.add('active');
  }

  // Update fill width and color based on completion
  fill.style.width = `${pct}%`;
  label.textContent = `${pct}%`;

  if (pct === 100) {
    fill.classList.add('success');
    label.style.color = 'var(--success)';
  } else {
    fill.classList.remove('success');
    label.style.color = 'var(--primary)';
  }
}

// ==========================================
// MOBILE ONBOARDING SIMULATOR LOGIC
// ==========================================

let simSelectedDomain = null;
let simSelectedChallenge = null;

// Navigate between simulator screens
function simGoToFrame(frameNum) {
  // Hide all screens
  document.querySelectorAll('.sim-screen').forEach(screen => {
    screen.classList.remove('active', 'slide-in');
  });

  // Show target screen
  const targetScreen = document.getElementById(`sim-frame-${frameNum}`);
  if (targetScreen) {
    targetScreen.classList.add('active');
    
    // Add slide-in animation unless going back to splash
    if (frameNum !== 1) {
      targetScreen.classList.add('slide-in');
    }
  }
}

// Sparkle Particle Effect Generator (Duolingo Style)
function triggerSparkles(event, card) {
  if (!card || !event) return;
  const rect = card.getBoundingClientRect();
  const x = event.clientX - rect.left;
  const y = event.clientY - rect.top;
  
  const colors = ['#FF7A00', '#22C55E', '#3B82F6', '#F59E0B', '#EF4444', '#EC4899', '#8B5CF6'];
  const particleCount = 14;
  
  for (let i = 0; i < particleCount; i++) {
    const sparkle = document.createElement('div');
    sparkle.className = 'sim-sparkle';
    
    const angle = Math.random() * Math.PI * 2;
    const distance = 15 + Math.random() * 45;
    const dx = Math.cos(angle) * distance;
    const dy = Math.sin(angle) * distance;
    
    sparkle.style.setProperty('--dx', `${dx}px`);
    sparkle.style.setProperty('--dy', `${dy}px`);
    sparkle.style.left = `${x}px`;
    sparkle.style.top = `${y}px`;
    sparkle.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
    
    card.appendChild(sparkle);
    
    setTimeout(() => {
      sparkle.remove();
    }, 750);
  }
}

// Select a learning domain (Frame 2 & 3)
function simSelectDomain(cardElement, domainName) {
  if (!cardElement) return;
  
  // Trigger sparkle effect at click position
  const event = window.event;
  if (event) {
    triggerSparkles(event, cardElement);
  }

  // Remove selection from all cards
  const grid = cardElement.closest('.sim-domain-grid');
  if (grid) {
    grid.querySelectorAll('.sim-domain-card').forEach(card => {
      card.classList.remove('selected');
    });
  }

  // Add selection to clicked card
  cardElement.classList.add('selected');
  simSelectedDomain = domainName;

  // Enable continue button
  const continueBtn = document.getElementById('sim-btn-domain-continue');
  if (continueBtn) {
    continueBtn.removeAttribute('disabled');
  }
}

// Select a challenge (Frame 4)
function simSelectChallenge(cardElement, challengeName) {
  if (!cardElement) return;

  // Trigger sparkle effect
  const event = window.event;
  if (event) {
    triggerSparkles(event, cardElement);
  }

  // Remove selection from all challenge cards
  const list = cardElement.closest('.sim-challenge-list');
  if (list) {
    list.querySelectorAll('.sim-challenge-card').forEach(card => {
      card.classList.remove('selected');
    });
  }

  // Add selection to clicked card
  cardElement.classList.add('selected');
  simSelectedChallenge = challengeName;

  // Enable continue button
  const continueBtn = document.getElementById('sim-btn-challenge-continue');
  if (continueBtn) {
    continueBtn.removeAttribute('disabled');
  }
}

// Reset simulator to Frame 1 (Splash)
function simReset() {
  simSelectedDomain = null;
  simSelectedChallenge = null;

  // Clear selections
  document.querySelectorAll('.sim-domain-card').forEach(card => card.classList.remove('selected'));
  document.querySelectorAll('.sim-challenge-card').forEach(card => card.classList.remove('selected'));

  // Disable buttons
  const domainBtn = document.getElementById('sim-btn-domain-continue');
  if (domainBtn) domainBtn.setAttribute('disabled', 'true');

  const challengeBtn = document.getElementById('sim-btn-challenge-continue');
  if (challengeBtn) challengeBtn.setAttribute('disabled', 'true');

  // Go to Splash
  simGoToFrame(1);
}

console.log("StartupSage Design System Catalog Loaded Successfully.");
