// ========================================================
// 【Google Apps Script 即時 API 網址 (0快取)】
// ========================================================
var GAS_API_URL = 'https://script.google.com/macros/s/AKfycbwVzvRU3EfAwqt_2fz4ITRmHPy5X7lM3wV1WkOtpBoyONdAbTsFoRAoakNvsKecuYy1/exec';

var REMOTE_SWITCH = {
  preSurvey: true,
  postSurvey: false
};

// 即時取得開關狀態
function fetchSurveySwitches() {
  if (!GAS_API_URL || GAS_API_URL.indexOf('AKfycb') === -1) return;

  fetch(GAS_API_URL + '?_t=' + new Date().getTime())
    .then(function(res) {
      return res.json();
    })
    .then(function(data) {
      var changed = (REMOTE_SWITCH.preSurvey !== data.preSurvey || REMOTE_SWITCH.postSurvey !== data.postSurvey);
      REMOTE_SWITCH.preSurvey = data.preSurvey;
      REMOTE_SWITCH.postSurvey = data.postSurvey;

      if (changed) {
        var activeBtn = document.querySelector('.week-btn.active');
        if (activeBtn) {
          var btns = Array.prototype.slice.call(document.querySelectorAll('.week-btn'));
          selectWeek(btns.indexOf(activeBtn));
        }
      }
    })
    .catch(function(err) {
      console.warn('API 讀取失敗：', err);
    });
}

function renderWeekButtons() {
  var list = document.getElementById('weekBtnList');
  list.innerHTML = '';
  for (var i = 0; i < WEEKS_DATA.length; i++) {
    (function(idx) {
      var item = WEEKS_DATA[idx];
      var btn = document.createElement('button');
      btn.className = 'week-btn' + (idx === WEEKS_DATA.length - 1 ? ' active' : '');
      var datePart = item.date.indexOf('年') !== -1 ? item.date.split('年')[1].trim() : item.date;
      btn.innerText = '第 ' + item.week + ' 週 (' + datePart + ')';
      btn.onclick = function() {
        selectWeek(idx);
      };
      list.appendChild(btn);
    })(i);
  }

  selectWeek(WEEKS_DATA.length - 1);

  // 初次執行與每 4 秒輪詢一次
  fetchSurveySwitches();
  setInterval(fetchSurveySwitches, 4000);
}

function selectWeek(index) {
  var data = WEEKS_DATA[index];
  if (!data) return;

  var btns = document.querySelectorAll('.week-btn');
  for (var i = 0; i < btns.length; i++) {
    btns[i].classList.toggle('active', i === index);
  }

  // 1. 課堂日期
  document.getElementById('headerDate').innerText = '📅 課堂日期：' + data.date;

  // 2. 課前問卷
  var preSurveyLink = document.getElementById('preSurveyLink');
  var preSurveyCard = preSurveyLink ? preSurveyLink.closest('.card') : null;
  if (REMOTE_SWITCH.preSurvey && data.preSurvey && data.preSurvey.trim() !== '' && data.preSurvey !== '#') {
    document.getElementById('preSurveyTitle').innerText = '第 ' + data.week + ' 週 課前問卷調查';
    preSurveyLink.href = data.preSurvey;
    if (preSurveyCard) preSurveyCard.style.display = 'flex';
  } else {
    if (preSurveyCard) preSurveyCard.style.display = 'none';
  }

  // 3. 作業繳交雲端硬碟 (永福國小專屬：若該週沒設定則隱藏)
  var homeworkLink = document.getElementById('homeworkLink');
  var homeworkCard = homeworkLink ? homeworkLink.closest('.card') : null;
  if (data.homeworkDrive && data.homeworkDrive.trim() !== '' && data.homeworkDrive !== '#') {
    document.getElementById('homeworkTitle').innerText = '第 ' + data.week + ' 週 作業繳交雲端硬碟';
    homeworkLink.href = data.homeworkDrive;
    if (homeworkCard) homeworkCard.style.display = 'flex';
  } else {
    if (homeworkCard) homeworkCard.style.display = 'none';
  }

  // 4. 概念式學習 / 影音區塊 (支援多部影片清單)
  var classCard = document.getElementById('weeklyClassCard');
  var videoList = data.videos || (data.classUrl && data.classUrl !== '#' ? [{
    title: data.classTitle || '課堂影音與補充',
    desc: data.classDesc || '',
    url: data.classUrl,
    btnText: data.classLink || '觀看影片'
  }] : []);

  if (videoList.length > 0 && classCard) {
    classCard.innerHTML = '';

    var topDiv = document.createElement('div');
    var tag = document.createElement('span');
    tag.className = 'card-tag tag-task';
    tag.style.background = '#fef08a';
    tag.style.color = '#854d0e';
    tag.innerText = '概念式學習';

    var headerDiv = document.createElement('div');
    headerDiv.className = 'card-header';
    var iconDiv = document.createElement('div');
    iconDiv.className = 'card-icon';
    iconDiv.innerText = '📺';

    var infoDiv = document.createElement('div');
    infoDiv.className = 'card-info';
    var h4 = document.createElement('h4');
    h4.innerText = '第 ' + data.week + ' 週 概念式學習';
    var p = document.createElement('p');

    infoDiv.appendChild(h4);
    infoDiv.appendChild(p);
    headerDiv.appendChild(iconDiv);
    headerDiv.appendChild(infoDiv);
    topDiv.appendChild(tag);
    topDiv.appendChild(headerDiv);

    var listDiv = document.createElement('div');
    listDiv.style.display = 'flex';
    listDiv.style.flexDirection = 'column';
    listDiv.style.gap = '8px';
    listDiv.style.marginTop = '8px';

    for (var v = 0; v < videoList.length; v++) {
      var itemV = videoList[v];
      var btnA = document.createElement('a');
      btnA.href = itemV.url;
      btnA.target = '_blank';
      btnA.className = 'card-btn btn-primary';
      btnA.style.marginTop = '0';
      btnA.style.borderColor = '#fde047';
      btnA.style.color = '#854d0e';
      btnA.style.background = '#fef9c3';
      btnA.style.textAlign = 'left';
      btnA.style.padding = '8px 12px';

      var strong = document.createElement('strong');
      strong.innerText = itemV.title;
      btnA.appendChild(strong);

      if (itemV.desc) {
        var descDiv = document.createElement('div');
        descDiv.style.fontSize = '0.75rem';
        descDiv.style.color = '#a16207';
        descDiv.innerText = itemV.desc;
        btnA.appendChild(descDiv);
      }
      listDiv.appendChild(btnA);
    }

    classCard.appendChild(topDiv);
    classCard.appendChild(listDiv);
    classCard.style.display = 'flex';
  } else if (classCard) {
    classCard.style.display = 'none';
  }

  // 5. 舊課綱體驗：台英語學伴卡片
  var companionCard = document.getElementById('companionCard');
  if (companionCard) {
    if (data.companionLesson && data.companionLesson.trim() !== '') {
      companionCard.style.display = 'flex';
      var taskElem = document.getElementById('companionTask');
      if (taskElem) {
        taskElem.innerText = '📖 ' + data.companionLesson;
        taskElem.style.display = 'inline-block';
      }
    } else {
      companionCard.style.display = 'none';
    }
  }

  // 6. 舊課綱小工具：資料模型蒐集小工具
  var dataToolCard = document.getElementById('dataToolCard');
  if (dataToolCard) {
    dataToolCard.style.display = data.showDataTool ? 'flex' : 'none';
  }

  // 7. 新課綱體驗：GAI 體驗應用 (修正變數名稱 gInfoDiv)
  var gaiAppCard = document.getElementById('gaiAppCard');
  if (gaiAppCard) {
    if (data.apps && data.apps.length > 0) {
      gaiAppCard.innerHTML = '';

      var gTopDiv = document.createElement('div');
      var gTag = document.createElement('span');
      gTag.className = 'card-tag tag-exp';
      gTag.innerText = '體驗式學習';

      var gHeaderDiv = document.createElement('div');
      gHeaderDiv.className = 'card-header';
      var gIconDiv = document.createElement('div');
      gIconDiv.className = 'card-icon';
      gIconDiv.innerText = '🚀';

      var gInfoDiv = document.createElement('div');
      gInfoDiv.className = 'card-info';
      var gH4 = document.createElement('h4');
      gH4.innerText = '第 ' + data.week + ' 週 體驗式學習';
      var gP = document.createElement('p');

      gInfoDiv.appendChild(gH4);
      gInfoDiv.appendChild(gP);
      gHeaderDiv.appendChild(gIconDiv);
      gHeaderDiv.appendChild(gInfoDiv); // 變數修正為 gInfoDiv
      gTopDiv.appendChild(gTag);
      gTopDiv.appendChild(gHeaderDiv);

      var gListDiv = document.createElement('div');
      gListDiv.style.display = 'flex';
      gListDiv.style.flexDirection = 'column';
      gListDiv.style.gap = '8px';
      gListDiv.style.marginTop = '8px';

      for (var a = 0; a < data.apps.length; a++) {
        var itemA = data.apps[a];
        var gBtnA = document.createElement('a');
        gBtnA.href = itemA.url;
        gBtnA.target = '_blank';
        gBtnA.className = 'card-btn btn-primary';
        gBtnA.style.marginTop = '0';
        gBtnA.style.background = '#ede9fe';
        gBtnA.style.color = '#6d28d9';
        gBtnA.style.borderColor = '#ddd6fe';
        gBtnA.style.textAlign = 'left';
        gBtnA.style.padding = '8px 12px';

        var gStrong = document.createElement('strong');
        gStrong.innerText = itemA.title;
        gBtnA.appendChild(gStrong);

        if (itemA.desc) {
          var gDescDiv = document.createElement('div');
          gDescDiv.style.fontSize = '0.75rem';
          gDescDiv.style.color = '#7c3aed';
          gDescDiv.innerText = itemA.desc;
          gBtnA.appendChild(gDescDiv);
        }
        gListDiv.appendChild(gBtnA);
      }

      gaiAppCard.appendChild(gTopDiv);
      gaiAppCard.appendChild(gListDiv);
      gaiAppCard.style.display = 'flex';
    } else {
      gaiAppCard.style.display = 'none';
    }
  }

  // 8. 課後問卷
  var postSurveyLink = document.getElementById('postSurveyLink');
  var postSurveyCard = postSurveyLink ? postSurveyLink.closest('.card') : null;
  if (REMOTE_SWITCH.postSurvey && data.postSurvey && data.postSurvey.trim() !== '' && data.postSurvey !== '#') {
    document.getElementById('postSurveyTitle').innerText = '第 ' + data.week + ' 週 課後問卷調查';
    postSurveyLink.href = data.postSurvey;
    if (postSurveyCard) postSurveyCard.style.display = 'flex';
  } else {
    if (postSurveyCard) postSurveyCard.style.display = 'none';
  }
}

// 永福國小密碼框解鎖功能
// 向 Apps Script 驗證密碼
function checkSheetPwd() {
  var inputElem = document.getElementById('sheetPwdInput');
  var unlockBtn = document.getElementById('sheetUnlockBtn');
  if (!inputElem) return;

  var pwd = inputElem.value.trim();
  if (!pwd) {
    alert('請輸入密碼！');
    return;
  }

  unlockBtn.disabled = true;
  unlockBtn.innerText = '驗證中...';

  fetch(GAS_API_URL + '?pwd=' + encodeURIComponent(pwd) + '&_t=' + new Date().getTime())
    .then(function(res) {
      return res.json();
    })
    .then(function(data) {
      unlockBtn.disabled = false;
      unlockBtn.innerText = '解鎖';

      if (data.success && data.url) {
        // 驗證成功：直接另開分頁前往真實網址
        window.open(data.url, '_blank');
        inputElem.value = '';
      } else {
        alert('密碼錯誤！請詢問社團課老師或助教。');
      }
    })
    .catch(function(err) {
      unlockBtn.disabled = false;
      unlockBtn.innerText = '解鎖';
      alert('連線失敗，請重試！');
      console.warn(err);
    });
}

window.addEventListener('DOMContentLoaded', renderWeekButtons);