var SHEET_ID = 'YOUR_SHEET_ID_HERE';
var SHEET_CSV_URL = 'https://docs.google.com/spreadsheets/d/' + '1gpH46LEl7ts3tfc60AiSH7R2Jx64TELywEFsyqOsfxo' + '/gviz/tq?tqx=out:csv';

// 全域開關變數（預設：課前開、課後關）
var REMOTE_SWITCH = {
  preSurvey: true,
  postSurvey: false
};

// 向 Google Sheet 讀取最新即時開關狀態
function fetchSurveySwitches() {
  if (!SHEET_ID || SHEET_ID === 'YOUR_SHEET_ID_HERE') return;

  var xhr = new XMLHttpRequest();
  // 加 timestamp 避免瀏覽器快取舊資料
  xhr.open('GET', SHEET_CSV_URL + '&_t=' + new Date().getTime(), true);
  xhr.onload = function() {
    if (xhr.status >= 200 && xhr.status < 300) {
      var lines = xhr.responseText.split('\n');
      for (var i = 0; i < lines.length; i++) {
        var row = lines[i].replace(/"/g, '').split(',');
        if (row.length >= 2) {
          var name = row[0].trim();
          var state = row[1].trim().toUpperCase();
          if (name.indexOf('課前') !== -1) {
            REMOTE_SWITCH.preSurvey = (state === 'ON' || state === 'TRUE' || state === '1');
          }
          if (name.indexOf('課後') !== -1) {
            REMOTE_SWITCH.postSurvey = (state === 'ON' || state === 'TRUE' || state === '1');
          }
        }
      }
      // 讀取成功後，更新目前畫面的卡片顯示
      updateSurveyCardsVisibility();
    }
  };
  xhr.send();
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

  // 初次載入與每 10 秒自動輪詢一次試算表開關狀態
  fetchSurveySwitches();
  setInterval(fetchSurveySwitches, 10000);
}

// 專門動態更新課前與課後問卷卡片是否顯示
function updateSurveyCardsVisibility() {
  var activeBtn = document.querySelector('.week-btn.active');
  if (!activeBtn) return;
  var btns = Array.prototype.slice.call(document.querySelectorAll('.week-btn'));
  var index = btns.indexOf(activeBtn);
  var data = WEEKS_DATA[index];
  if (!data) return;

  // 1. 課前問卷
  var preSurveyLink = document.getElementById('preSurveyLink');
  var preSurveyCard = preSurveyLink ? preSurveyLink.closest('.card') : null;
  if (REMOTE_SWITCH.preSurvey && data.preSurvey && data.preSurvey.trim() !== '' && data.preSurvey !== '#') {
    if (preSurveyCard) preSurveyCard.style.display = 'flex';
  } else {
    if (preSurveyCard) preSurveyCard.style.display = 'none';
  }

  // 2. 課後問卷
  var postSurveyLink = document.getElementById('postSurveyLink');
  var postSurveyCard = postSurveyLink ? postSurveyLink.closest('.card') : null;
  if (REMOTE_SWITCH.postSurvey && data.postSurvey && data.postSurvey.trim() !== '' && data.postSurvey !== '#') {
    if (postSurveyCard) postSurveyCard.style.display = 'flex';
  } else {
    if (postSurveyCard) postSurveyCard.style.display = 'none';
  }
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

  // 2. 課前問卷初始化
  var preSurveyLink = document.getElementById('preSurveyLink');
  if (preSurveyLink && data.preSurvey) {
    document.getElementById('preSurveyTitle').innerText = '第 ' + data.week + ' 週 課前問卷調查';
    preSurveyLink.href = data.preSurvey;
  }

  // 3. 概念式學習 / 影音區塊
  var classCard = document.getElementById('weeklyClassCard');
  var videoList = data.videos || (data.classUrl && data.classUrl !== '#' ? [{
    title: data.classTitle || '課堂影音與補充',
    desc: data.classDesc || '',
    url: data.classUrl,
    btnText: data.classLink || data.weeklyClassLink || '前往補充內容'
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

  // 4. 舊課綱體驗：台英語學伴卡片
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

  // 5. 舊課綱小工具：資料模型蒐集小工具
  var dataToolCard = document.getElementById('dataToolCard');
  if (dataToolCard) {
    dataToolCard.style.display = data.showDataTool ? 'flex' : 'none';
  }

  // 6. 新課綱體驗：GAI 體驗應用
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
      gH4.innerText = '第 ' + data.week + ' 週 GAI 體驗式學習';
      var gP = document.createElement('p');

      gInfoDiv.appendChild(gH4);
      gInfoDiv.appendChild(gP);
      gHeaderDiv.appendChild(gIconDiv);
      gHeaderDiv.appendChild(gInfoDiv);
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

  // 7. 課後問卷初始化
  var postSurveyLink = document.getElementById('postSurveyLink');
  if (postSurveyLink && data.postSurvey) {
    document.getElementById('postSurveyTitle').innerText = '第 ' + data.week + ' 週 課後問卷調查';
    postSurveyLink.href = data.postSurvey;
  }

  // 執行顯隱更新
  updateSurveyCardsVisibility();
}

window.addEventListener('DOMContentLoaded', renderWeekButtons);