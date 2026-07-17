// ==========================================
// STARTUPSAGE CLIENT APP ROUTING & INTERACTIONS
// ==========================================

// Global App State
let appState = {
  xp: 450,
  coins: 150,
  streak: 3,
  currentLevel: 2,
  unlockedStage: 0, // 0 to 6
  selectedDomain: "",
  selectedChallenge: "Smart Healthcare Assistant",
  selectedIdea: "",
  emotionCheckedIn: "",
  canvasFilled: false,
  mvpBudget: 100,
  mvpImpactScore: 0, // 0 to 100
  selectedFeaturesCount: 0,
  currentOnboardingSlide: 1
};

// Elements Cache
const elements = {
  screens: {},
  tabs: {},
  navItems: {},
  valStreak: null,
  valCoins: null,
  userCoinsBadges: [],
  sparkMascot: null,
  sparkBubble: null,
  confettiCanvas: null
};

// Initialize App
window.addEventListener('DOMContentLoaded', () => {
  // Cache Screen and Tab DOM references
  const screenList = ['splash', 'onboarding', 'login', 'stage0', 'stage1', 'stage2', 'stage3', 'stage4', 'stage5', 'finalpitch'];
  screenList.forEach(id => {
    elements.screens[id] = document.getElementById(`scr-${id}`);
  });

  const tabList = ['dashboard', 'journey', 'leaderboard', 'profile', 'settings'];
  tabList.forEach(id => {
    elements.tabs[id] = document.getElementById(`tab-${id}`);
    elements.navItems[id] = document.getElementById(`nav-${id}`);
  });

  elements.valStreak = document.getElementById('val-streak');
  elements.valCoins = document.getElementById('val-coins');
  elements.userCoinsBadges = document.querySelectorAll('.user-coins');
  elements.sparkMascot = document.getElementById('spark-mascot');
  elements.sparkBubble = document.getElementById('spark-bubble');
  elements.confettiCanvas = document.getElementById('confetti-canvas');

  // Load state and update indicators
  updateStateIndicators();
  triggerSparkMascot("Hi, I'm Spark! Let's start our startup journey! 🚀", 5000);
});

// ------------------------------------------
// Navigation & Routing Engine
// ------------------------------------------

function goToScreen(screenId) {
  // Hide all screens
  Object.values(elements.screens).forEach(screen => {
    if (screen) screen.classList.remove('active');
  });
  
  // Hide main app views unless screenId is mainapp
  const isMainApp = (screenId === 'mainapp');
  const bottomNav = document.getElementById('sim-bottom-nav');
  
  if (isMainApp) {
    if (bottomNav) bottomNav.style.display = 'flex';
    // Switch to active tab
    const activeTab = Object.keys(elements.tabs).find(key => elements.tabs[key] && elements.tabs[key].style.display === 'flex') || 'dashboard';
    simSwitchTab(activeTab);
  } else {
    if (bottomNav) bottomNav.style.display = 'none';
    // Show specific screen
    if (elements.screens[screenId]) {
      elements.screens[screenId].classList.add('active');
      elements.screens[screenId].style.display = 'flex';
    }
  }

  // Handle Mascot prompts depending on screen
  if (screenId === 'stage1') {
    triggerSparkMascot("Compare these 3 generated ideas! Tap one to inspect user reactions. 😍", 6000);
  } else if (screenId === 'stage2') {
    triggerSparkMascot("Let's plan your business details! Tap the canvas toggle to see a filled example.", 6000);
  } else if (screenId === 'stage3') {
    triggerSparkMascot("Choose questions to survey your target users. Let's gather real proof!", 6000);
  } else if (screenId === 'stage4') {
    triggerSparkMascot("Select high-impact features under our 🪙 100 budget limit!", 6000);
  } else if (screenId === 'stage5') {
    triggerSparkMascot("Pre-flight checks passed! Tap the big rocket to launch your startup! 🚀", 5000);
  } else if (screenId === 'finalpitch') {
    triggerSparkMascot("Funding secured! You are officially an entrepreneur! 🎓🏆", 6000);
    triggerConfetti();
  }
}

function simSwitchTab(tabId) {
  // Hide all tabs & screens
  Object.values(elements.screens).forEach(screen => {
    if (screen) screen.classList.remove('active');
  });
  Object.values(elements.tabs).forEach(tab => {
    if (tab) tab.style.display = 'none';
  });
  Object.values(elements.navItems).forEach(item => {
    if (item) item.classList.remove('active');
  });

  // Display selected tab inside screen context
  if (elements.tabs[tabId]) {
    elements.tabs[tabId].style.display = 'flex';
  }
  if (elements.navItems[tabId]) {
    elements.navItems[tabId].classList.add('active');
  }

  // Show bottom navigation bar
  const bottomNav = document.getElementById('sim-bottom-nav');
  if (bottomNav) bottomNav.style.display = 'flex';

  // Highlight Spark helper tips
  if (tabId === 'dashboard') {
    triggerSparkMascot("Welcome back! Finish today's Daily Mission to earn extra Coins! 🪙", 4000);
  } else if (tabId === 'journey') {
    triggerSparkMascot("Welcome to Adventure Map! Click on Island 0 to begin your quest path.", 5000);
    renderJourneyMapLocks();
  }
}

// Update Coins, XP, Level displays
function updateStateIndicators() {
  if (elements.valStreak) elements.valStreak.textContent = appState.streak;
  if (elements.valCoins) elements.valCoins.textContent = appState.coins;
  elements.userCoinsBadges.forEach(badge => {
    badge.textContent = appState.coins;
  });

  // Dynamic status indicators
  const pName = document.getElementById('cert-startup-name');
  if (pName) pName.textContent = appState.selectedChallenge;
}

// ------------------------------------------
// Spark Mascot Comments engine
// ------------------------------------------

function triggerSparkMascot(message, duration = 4000) {
  if (!elements.sparkMascot || !elements.sparkBubble) return;

  // Set message
  elements.sparkBubble.innerHTML = message;

  // Show Spark
  elements.sparkMascot.classList.add('active');

  // Hide after duration
  setTimeout(() => {
    elements.sparkMascot.classList.remove('active');
  }, duration);
}

// ------------------------------------------
// Pre-App Flow (Splash, Onboarding, Login)
// ------------------------------------------

function setSlide(slideNum) {
  appState.currentOnboardingSlide = slideNum;
  const slides = document.querySelectorAll('.onboarding-slide');
  const dots = document.querySelectorAll('.onboarding-dot');
  
  slides.forEach((s, idx) => {
    s.classList.toggle('active', idx === (slideNum - 1));
  });
  dots.forEach((d, idx) => {
    d.classList.toggle('active', idx === (slideNum - 1));
  });

  const btnNext = document.getElementById('btn-onboarding-next');
  if (btnNext) {
    btnNext.textContent = slideNum === 3 ? "Let's Go! 🚀" : "Continue";
  }
}

function nextSlide() {
  if (appState.currentOnboardingSlide < 3) {
    setSlide(appState.currentOnboardingSlide + 1);
  } else {
    goToScreen('login');
  }
}

function completeLogin(type) {
  appState.coins += 50; // Welcome reward
  appState.xp += 100;
  updateStateIndicators();
  goToScreen('mainapp');
  simSwitchTab('dashboard');
  triggerSparkMascot(`Log in successful with ${type}! Claimed +50 Welcome Coins! 🪙`, 5000);
  triggerSparklesAtCenter();
}

// ------------------------------------------
// Stage 0: The Spark
// ------------------------------------------

function goStage0Page(pageNum) {
  const pages = document.querySelectorAll('.stage0-subpage');
  pages.forEach((p, idx) => {
    p.classList.toggle('active', idx === (pageNum - 1));
  });

  const stepIndicator = document.getElementById('stage0-step-indicator');
  if (stepIndicator) {
    stepIndicator.textContent = `Step ${pageNum} of 3`;
  }
}

function simSelectDomain(cardElement, domainName) {
  // Clear previous domain selects
  const cards = document.querySelectorAll('.sim-domain-card');
  cards.forEach(c => c.classList.remove('selected'));

  // Mark this card selected
  cardElement.classList.add('selected');
  appState.selectedDomain = domainName;

  // Activate continue button
  const btn = document.getElementById('sim-btn-domain-continue');
  if (btn) btn.removeAttribute('disabled');

  triggerSparkles(cardElement);
  triggerSparkMascot(`Awesome chosen: ${domainName}! Let's select a startup challenge next.`, 4000);
}

function simSelectChallenge(cardElement, challengeName) {
  const cards = document.querySelectorAll('.sim-challenge-card');
  cards.forEach(c => c.classList.remove('selected'));

  cardElement.classList.add('selected');
  appState.selectedChallenge = challengeName;

  const btn = document.getElementById('sim-btn-challenge-continue');
  if (btn) btn.removeAttribute('disabled');

  triggerSparkles(cardElement);
  triggerSparkMascot(`You chose "${challengeName}"! Ready to solve?`, 4000);
}

function completeStage0() {
  appState.xp += 100;
  appState.unlockedStage = Math.max(appState.unlockedStage, 1);
  updateStateIndicators();
  triggerSparkMascot("Stage 0 Complete! Unlocked Stage 1: The Idea on Adventure Map! 💡", 5000);
  
  goToScreen('mainapp');
  simSwitchTab('journey');
  triggerConfetti();
}

// ------------------------------------------
// Stage 1: The Idea
// ------------------------------------------

function selectIdeaCard(cardElement, ideaName) {
  const cards = document.querySelectorAll('.idea-card');
  cards.forEach(c => c.classList.remove('expanded'));

  cardElement.classList.add('expanded');
  appState.selectedIdea = ideaName;

  // Show decision panel & check-in
  document.getElementById('stage1-decision-panel').style.display = 'block';
  document.getElementById('stage1-emotional-checkin').style.display = 'block';

  triggerSparkles(cardElement);
  triggerSparkMascot(`Selected "${ideaName}". Do you want to build this or improve it?`, 4000);
}

function chooseStartupIdea() {
  document.getElementById('stage1-complete-actions').style.display = 'block';
  triggerSparkMascot("Great choice! Now complete the emotional check-in to proceed.", 4000);
  triggerSparklesAtCenter();
}

function improveSelectedIdea() {
  triggerSparkMascot("Spark AI: 'How about making the diagnostics offline and solar-powered?' Idea improved! +10 XP", 5000);
  appState.xp += 10;
  updateStateIndicators();
}

function checkinEmotion(emotion) {
  appState.emotionCheckedIn = emotion;
  const buttons = document.querySelectorAll('.emoji-option-btn');
  buttons.forEach(btn => {
    btn.classList.toggle('selected', btn.querySelector('.emoji-lbl').textContent === emotion.split(' ')[1]);
  });
  triggerSparkMascot(`Thanks for sharing! Feeling ${emotion} is a great step! Let's continue.`, 4000);
}

function completeStage1() {
  appState.xp += 150;
  appState.unlockedStage = Math.max(appState.unlockedStage, 2);
  updateStateIndicators();
  triggerSparkMascot("Stage 1 Complete! Unlocked Stage 2: The Plan! 📋", 5000);
  
  goToScreen('mainapp');
  simSwitchTab('journey');
  triggerConfetti();
}

// ------------------------------------------
// Stage 2: The Plan (Business Model Canvas)
// ------------------------------------------

function toggleCanvasFilledState() {
  appState.canvasFilled = !appState.canvasFilled;
  const grid = document.getElementById('canvas-grid-box');
  const toggleBtn = document.getElementById('btn-toggle-canvas');
  
  if (appState.canvasFilled) {
    toggleBtn.textContent = "Toggle: Filled Canvas";
    grid.innerHTML = `
      <div class="canvas-block-card filled">
        <h5>🏥 Problem</h5>
        <div class="canvas-card-body">Rural health clinics lack diagnostics tools.</div>
      </div>
      <div class="canvas-block-card filled">
        <h5>💡 Solution</h5>
        <div class="canvas-card-body">Offline diagnostic assistant app.</div>
      </div>
      <div class="canvas-block-card filled">
        <h5>🎯 Target Users</h5>
        <div class="canvas-card-body">Village nurses & rural clinics.</div>
      </div>
      <div class="canvas-block-card filled">
        <h5>🪙 Revenue Model</h5>
        <div class="canvas-card-body">Subscription grants from government health bodies.</div>
      </div>
      <div class="canvas-block-card filled">
        <h5>📉 Cost Structure</h5>
        <div class="canvas-card-body">AI model host hosting, translation, database.</div>
      </div>
    `;
    document.getElementById('ai-realitycheck-panel').style.display = 'block';
    document.getElementById('stage2-complete-actions').style.display = 'block';
    triggerSparkMascot("Great! The canvas is filled. Read Spark's AI Reality Check suggestion! 🤖", 5000);
  } else {
    toggleBtn.textContent = "Toggle: Empty Canvas";
    grid.innerHTML = `
      <div class="canvas-block-card">
        <h5>🏥 Problem</h5>
        <div class="canvas-card-body empty">Empty Card</div>
      </div>
      <div class="canvas-block-card">
        <h5>💡 Solution</h5>
        <div class="canvas-card-body empty">Empty Card</div>
      </div>
      <div class="canvas-block-card">
        <h5>🎯 Target Users</h5>
        <div class="canvas-card-body empty">Empty Card</div>
      </div>
      <div class="canvas-block-card">
        <h5>🪙 Revenue Model</h5>
        <div class="canvas-card-body empty">Empty Card</div>
      </div>
      <div class="canvas-block-card">
        <h5>📉 Cost Structure</h5>
        <div class="canvas-card-body empty">Empty Card</div>
      </div>
    `;
    document.getElementById('ai-realitycheck-panel').style.display = 'none';
    document.getElementById('stage2-complete-actions').style.display = 'none';
  }
}

function canvasAskAI() {
  const textMsg = document.getElementById('ai-realitycheck-text');
  const loader = document.getElementById('ai-realitycheck-loader');
  
  textMsg.style.display = 'none';
  loader.style.display = 'block';

  setTimeout(() => {
    loader.style.display = 'none';
    textMsg.style.display = 'block';
    textMsg.innerHTML = "💡 <strong>Spark:</strong> 'Rural clinics receive government grants. You can charge local health budgets rather than patients directly!'";
    triggerSparklesAtCenter();
  }, 2000);
}

function canvasImproveIdea() {
  appState.coins += 20;
  updateStateIndicators();
  triggerSparkMascot("Idea improved! Claimed +20 Coins! 🪙", 4000);
}

function completeStage2() {
  appState.xp += 200;
  appState.unlockedStage = Math.max(appState.unlockedStage, 3);
  updateStateIndicators();
  triggerSparkMascot("Stage 2 Complete! Unlocked Stage 3: Validation! 📊", 5000);
  
  goToScreen('mainapp');
  simSwitchTab('journey');
  triggerConfetti();
}

// ------------------------------------------
// Stage 3: The Validation
// ------------------------------------------

function toggleSurveyChip(chipElement) {
  chipElement.classList.toggle('selected');
  
  // Count selected chips
  const selectedChips = document.querySelectorAll('.survey-chip.selected');
  const btn = document.getElementById('btn-trigger-survey');
  
  if (selectedChips.length > 0) {
    btn.removeAttribute('disabled');
    btn.textContent = `Send Survey with ${selectedChips.length} Question(s) 📊`;
  } else {
    btn.setAttribute('disabled', 'true');
    btn.textContent = "Send Survey to 100 Students 📊";
  }
}

function sendSurveyValidation() {
  document.getElementById('survey-results-box').style.display = 'block';
  triggerSparkMascot("Survey launched! Responses received. Virtual feedback generated! 📊", 4000);
  triggerSparklesAtCenter();
}

function completeStage3() {
  appState.xp += 150;
  appState.unlockedStage = Math.max(appState.unlockedStage, 4);
  updateStateIndicators();
  triggerSparkMascot("Stage 3 Complete! Unlocked Stage 4: Build MVP! 🔨", 5000);
  
  goToScreen('mainapp');
  simSwitchTab('journey');
  triggerConfetti();
}

// ------------------------------------------
// Stage 4: Build MVP
// ------------------------------------------

function toggleMVPFeature(itemElement, cost, impact) {
  const isSelected = itemElement.classList.toggle('selected');
  
  if (isSelected) {
    if (appState.mvpBudget >= cost) {
      appState.mvpBudget -= cost;
      appState.selectedFeaturesCount++;
      if (impact === 'High') {
        appState.mvpImpactScore += 40;
      } else {
        appState.mvpImpactScore += 10;
      }
    } else {
      // Over budget
      itemElement.classList.remove('selected');
      triggerSparkMascot("Not enough budget! Try removing other features.", 3000);
      return;
    }
  } else {
    appState.mvpBudget += cost;
    appState.selectedFeaturesCount--;
    if (impact === 'High') {
      appState.mvpImpactScore -= 40;
    } else {
      appState.mvpImpactScore -= 10;
    }
  }

  // Update Displays
  document.getElementById('mvp-budget-val').textContent = `🪙 ${appState.mvpBudget}`;
  
  const scoreLbl = document.getElementById('mvp-impact-val');
  if (appState.mvpImpactScore >= 80) {
    scoreLbl.textContent = "High 🔥";
    scoreLbl.style.color = "var(--success)";
  } else if (appState.mvpImpactScore >= 40) {
    scoreLbl.textContent = "Medium ⚡";
    scoreLbl.style.color = "var(--warning)";
  } else {
    scoreLbl.textContent = "Low ❄️";
    scoreLbl.style.color = "var(--error)";
  }

  const buildBtn = document.getElementById('btn-build-mvp');
  if (appState.selectedFeaturesCount > 0) {
    buildBtn.removeAttribute('disabled');
  } else {
    buildBtn.setAttribute('disabled', 'true');
  }

  triggerSparkles(itemElement);
}

function completeStage4() {
  appState.xp += 200;
  appState.unlockedStage = Math.max(appState.unlockedStage, 5);
  updateStateIndicators();
  triggerSparkMascot("Stage 4 Complete! Unlocked Stage 5: The Launch! 🚀", 5000);
  
  goToScreen('mainapp');
  simSwitchTab('journey');
  triggerConfetti();
}

// ------------------------------------------
// Stage 5: The Launch (Rocket Animation)
// ------------------------------------------

function triggerRocketPropulsion() {
  const rocket = document.getElementById('launch-rocket-bezel');
  const exhaust = document.getElementById('launch-exhaust-flame');
  const btnLaunch = document.getElementById('btn-startup-launch');
  const btnCont = document.getElementById('btn-launch-continue');

  btnLaunch.setAttribute('disabled', 'true');
  btnLaunch.textContent = "Ignition starting...";

  // 1. Shaking rumble
  rocket.classList.add('rumble-shake');
  exhaust.style.display = 'block';
  exhaust.style.height = '40px';
  triggerSparkMascot("Spark: 'All engines running! 3... 2... 1...'", 2500);

  // 2. Blastoff lift
  setTimeout(() => {
    rocket.classList.remove('rumble-shake');
    rocket.classList.add('blast-off');
    exhaust.style.height = '80px';
    triggerSparkMascot("Blastoff! Your startup is launched! 🚀✨", 4000);
    triggerConfetti();
  }, 3000);

  // 3. Reveal next steps
  setTimeout(() => {
    btnLaunch.style.display = 'none';
    btnCont.style.display = 'block';
  }, 5000);
}

function completeStage5() {
  appState.xp += 250;
  appState.unlockedStage = Math.max(appState.unlockedStage, 6);
  updateStateIndicators();
  goToScreen('finalpitch');
}

function finishFinalPitch() {
  appState.xp += 300;
  appState.coins += 100;
  updateStateIndicators();
  triggerSparkMascot("Wow! You finished the entire journey and earned your certificate! 🎓", 6000);
  
  // Unlock all nodes
  goToScreen('mainapp');
  simSwitchTab('journey');
  triggerConfetti();
}

// ------------------------------------------
// Journey Map lock rendering
// ------------------------------------------

function renderJourneyMapLocks() {
  const stageList = [
    { id: 'node-stage0', num: 0 },
    { id: 'node-stage1', num: 1 },
    { id: 'node-stage2', num: 2 },
    { id: 'node-stage3', num: 3 },
    { id: 'node-stage4', num: 4 },
    { id: 'node-stage5', num: 5 },
    { id: 'node-final-pitch', num: 6 }
  ];

  stageList.forEach(st => {
    const el = document.getElementById(st.id);
    if (!el) return;

    if (appState.unlockedStage >= st.num) {
      el.classList.remove('node-locked');
      el.classList.add('node-unlocked');
      const lockBadge = el.querySelector('.node-cloud-lock');
      if (lockBadge) {
        lockBadge.className = 'node-badge-status';
        lockBadge.textContent = '⭐ Start';
      }
    } else {
      el.classList.add('node-locked');
      el.classList.remove('node-unlocked');
      const statBadge = el.querySelector('.node-badge-status');
      if (statBadge) {
        statBadge.className = 'node-cloud-lock';
        statBadge.textContent = '🔒 Locked';
      }
    }
  });
}

function tryLaunchStage(stageNum) {
  if (appState.unlockedStage >= stageNum) {
    if (stageNum === 1) goToScreen('stage1');
    else if (stageNum === 2) goToScreen('stage2');
    else if (stageNum === 3) goToScreen('stage3');
    else if (stageNum === 4) goToScreen('stage4');
    else if (stageNum === 5) goToScreen('stage5');
    else if (stageNum === 'final-pitch') goToScreen('finalpitch');
  } else {
    triggerSparkMascot(`This stage is locked! Complete Stage ${stageNum - 1} first. 🔒`, 3000);
  }
}

// ------------------------------------------
// Settings controls & Resets
// ------------------------------------------

function toggleDarkModeSetting(checkbox) {
  const isDark = checkbox.checked;
  document.documentElement.setAttribute('data-theme', isDark ? 'dark' : 'light');
  triggerSparkMascot(`Theme switched to ${isDark ? 'Dark Mode' : 'Light Mode'}!`, 3000);
}

function simFullReset() {
  appState = {
    xp: 450,
    coins: 150,
    streak: 3,
    currentLevel: 2,
    unlockedStage: 0,
    selectedDomain: "",
    selectedChallenge: "Smart Healthcare Assistant",
    selectedIdea: "",
    emotionCheckedIn: "",
    canvasFilled: false,
    mvpBudget: 100,
    mvpImpactScore: 0,
    selectedFeaturesCount: 0,
    currentOnboardingSlide: 1
  };
  
  // Reset settings checklist check
  document.getElementById('settings-dark-mode').checked = false;
  document.documentElement.setAttribute('data-theme', 'light');

  updateStateIndicators();
  goToScreen('splash');
  setSlide(1);
  triggerSparkMascot("All student progress has been reset! Let's start fresh. 🚀", 5000);
}

// ------------------------------------------
// Sparkles & Confetti Animations engine
// ------------------------------------------

function triggerSparkles(element) {
  const rect = element.getBoundingClientRect();
  const x = rect.left + rect.width / 2;
  const y = rect.top + rect.height / 2;
  createSparkleExplosion(x, y);
}

function triggerSparklesAtCenter() {
  const x = window.innerWidth / 2;
  const y = window.innerHeight / 2;
  createSparkleExplosion(x, y);
}

function createSparkleExplosion(x, y) {
  for (let i = 0; i < 20; i++) {
    const sparkle = document.createElement('div');
    sparkle.className = 'sim-sparkle';
    
    // Colorful sparkles
    const colors = ['#FF7A00', '#3B82F6', '#22C55E', '#EC4899', '#F59E0B', '#A855F7'];
    sparkle.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
    
    // Set coordinates relative to viewport
    sparkle.style.left = `${x}px`;
    sparkle.style.top = `${y}px`;
    
    // Spread angle
    const angle = Math.random() * Math.PI * 2;
    const distance = 40 + Math.random() * 50;
    const dx = Math.cos(angle) * distance;
    const dy = Math.sin(angle) * distance;
    
    sparkle.style.setProperty('--dx', `${dx}px`);
    sparkle.style.setProperty('--dy', `${dy}px`);
    
    document.body.appendChild(sparkle);
    
    // Clean up
    setTimeout(() => {
      sparkle.remove();
    }, 750);
  }
}

function triggerConfetti() {
  if (!elements.confettiCanvas) return;
  elements.confettiCanvas.innerHTML = '';
  
  for (let i = 0; i < 60; i++) {
    const conf = document.createElement('div');
    conf.className = 'confetti-piece';
    
    const colors = ['#FF7A00', '#EC4899', '#3B82F6', '#22C55E', '#F59E0B', '#A855F7'];
    conf.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
    
    conf.style.left = `${Math.random() * 100}%`;
    conf.style.top = `-20px`;
    conf.style.width = `${6 + Math.random() * 8}px`;
    conf.style.height = `${12 + Math.random() * 12}px`;
    
    // Delay and drift speed
    conf.style.animationDelay = `${Math.random() * 1.5}s`;
    conf.style.setProperty('--drift-x', `${-50 + Math.random() * 100}px`);
    
    elements.confettiCanvas.appendChild(conf);
    
    // Clean up
    setTimeout(() => {
      conf.remove();
    }, 4000);
  }
}
