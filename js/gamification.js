const Gamification = (() => {

  const LEVELS = [
    { name: 'Nowicjusz',    min: 0,    icon: '🌱', color: '#94a3b8' },
    { name: 'Uczeń',        min: 100,  icon: '📖', color: '#3b82f6' },
    { name: 'Technik',      min: 300,  icon: '🔧', color: '#8b5cf6' },
    { name: 'Specjalista',  min: 600,  icon: '⭐', color: '#f59e0b' },
    { name: 'Ekspert',      min: 1000, icon: '🎓', color: '#ef4444' },
    { name: 'Mistrz',       min: 1500, icon: '🏆', color: '#f97316' },
    { name: 'Legenda',      min: 2500, icon: '👑', color: '#eab308' },
  ];

  const XP_AWARDS = {
    daily_login:     10,
    test_complete:   10,
    test_pass:       25,
    correct_answer:   2,
    note_added:       5,
    topic_added:      3,
    topic_studied:    8,
    streak_bonus:    20,
  };

  function getData() {
    const d = Storage.get('gamification');
    return d || { xp: 0, streak: 0, lastActivityDate: null, totalTests: 0, totalCorrect: 0 };
  }

  function saveData(d) { Storage.set('gamification', d); }

  function getLevel(xp) {
    let level = LEVELS[0];
    for (const l of LEVELS) { if (xp >= l.min) level = l; }
    return level;
  }

  function getNextLevel(xp) {
    for (const l of LEVELS) { if (xp < l.min) return l; }
    return null;
  }

  function addXP(action, multiplier = 1) {
    const base = XP_AWARDS[action];
    if (!base) return 0;
    const earned = base * multiplier;

    const d = getData();
    const prevLevel = getLevel(d.xp);
    d.xp += earned;
    const newLevel = getLevel(d.xp);

    d.lastActivityDate = todayStr();
    saveData(d);

    showXPPopup(earned, action);

    if (prevLevel.name !== newLevel.name) {
      setTimeout(() => showLevelUp(newLevel), 600);
    }

    renderSidebar();
    return earned;
  }

  function checkDailyLogin() {
    const d = getData();
    const today = todayStr();

    if (d.lastActivityDate === today) return;

    // Check streak
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const yStr = yesterday.toISOString().split('T')[0];

    if (d.lastActivityDate === yStr) {
      d.streak += 1;
      if (d.streak > 0 && d.streak % 7 === 0) {
        setTimeout(() => addXP('streak_bonus'), 300);
      }
    } else if (d.lastActivityDate !== today) {
      d.streak = 1;
    }

    d.lastActivityDate = today;
    saveData(d);
    addXP('daily_login');
  }

  function recordTestResult(score, total, passed) {
    const d = getData();
    d.totalTests  = (d.totalTests  || 0) + 1;
    d.totalCorrect = (d.totalCorrect || 0) + score;
    saveData(d);
    addXP('test_complete');
    addXP('correct_answer', score);
    if (passed) addXP('test_pass');
  }

  // ── UI ─────────────────────────────────────────────────────────

  function renderSidebar() {
    const el = document.getElementById('sidebarXP');
    if (!el) return;
    const d = getData();
    const level = getLevel(d.xp);
    const next = getNextLevel(d.xp);
    const pct = next ? Math.round(((d.xp - level.min) / (next.min - level.min)) * 100) : 100;

    el.innerHTML = `
      <div class="sidebar-stats">
        <div class="streak-badge" title="Seria dni nauki">🔥 ${d.streak} dni</div>
        <div class="level-badge" style="color:${level.color}" title="Twój poziom">${level.icon} ${level.name}</div>
      </div>
      <div class="xp-bar-wrap" title="${d.xp} XP${next ? ` / ${next.min}` : ''}">
        <div class="xp-bar" style="width:${pct}%;background:${level.color}"></div>
      </div>
      <div class="xp-label">${d.xp} XP${next ? ` → ${next.min}` : ' (MAX)'}</div>`;
  }

  function showXPPopup(amount, action) {
    const popup = document.createElement('div');
    popup.className = 'xp-popup';
    popup.textContent = `+${amount} XP`;
    document.body.appendChild(popup);
    setTimeout(() => popup.classList.add('xp-popup-show'), 10);
    setTimeout(() => { popup.classList.remove('xp-popup-show'); setTimeout(() => popup.remove(), 400); }, 1800);
  }

  function showLevelUp(level) {
    const el = document.getElementById('levelUpBanner');
    if (!el) return;
    el.innerHTML = `${level.icon} Awansowałeś na poziom <strong>${level.name}</strong>!`;
    el.style.display = 'block';
    setTimeout(() => el.style.display = 'none', 4000);
  }

  // ── Notifications ──────────────────────────────────────────────

  function requestNotifications() {
    if (!('Notification' in window)) return Promise.resolve(false);
    return Notification.requestPermission().then(p => p === 'granted');
  }

  function scheduleReminder() {
    if (Notification.permission !== 'granted') return;
    const d = getData();
    const today = todayStr();
    if (d.lastActivityDate === today) return;

    setTimeout(() => {
      if (getData().lastActivityDate !== today) {
        new Notification('Zdaj+ – Pamiętaj o nauce! 📚', {
          body: `Masz serię ${d.streak} dni. Nie przerywaj jej! Rozwiąż jeden test.`,
          icon: 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><text y=".9em" font-size="90">🎯</text></svg>'
        });
      }
    }, 5000);
  }

  function getNotificationStatus() {
    if (!('Notification' in window)) return 'unsupported';
    return Notification.permission;
  }

  // ── Ads ────────────────────────────────────────────────────────

  function isAdFree() { return !!localStorage.getItem('passplus_adfree'); }

  function setAdFree() {
    localStorage.setItem('passplus_adfree', '1');
    document.querySelectorAll('.ad-banner').forEach(el => el.remove());
  }

  function initAds() {
    if (isAdFree()) return;
    // Show ad banner after a short delay so it doesn't block initial load
    setTimeout(() => {
      const banner = document.getElementById('adBanner');
      if (banner) banner.style.display = 'flex';
    }, 2000);
  }

  // ── Utils ──────────────────────────────────────────────────────

  function todayStr() { return new Date().toISOString().split('T')[0]; }

  function init() {
    checkDailyLogin();
    renderSidebar();
    initAds();
    scheduleReminder();
  }

  return {
    init, addXP, recordTestResult, renderSidebar, getData, getLevel, getNextLevel,
    requestNotifications, getNotificationStatus, setAdFree, isAdFree, LEVELS
  };
})();
