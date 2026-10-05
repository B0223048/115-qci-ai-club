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

  // 初始化老師專屬快速控制面板
  initTeacherControlPanel();

  selectWeek(WEEKS_DATA.length - 1);
}

// 取得問卷開關狀態 (優先讀取現場面板狀態，預設值皆為關閉 false)
function getSurveyState(week, type) {
  var key = 'w' + week + '_' + type;
  var saved = localStorage.getItem(key);
  if (saved !== null) {
    return saved === 'true';
  }
  // 預設第1週等預設情況
  return false;
}

function setSurveyState(week, type, val) {
  var key = 'w' + week + '_' + type;
  localStorage.setItem(key, val ? 'true' : 'false');
}

// 建立老師專用懸浮控制台
function initTeacherControlPanel() {
  if (document.getElementById('teacherPanel')) return;

  var panel = document.createElement('div');
  panel.id = 'teacherPanel';
  panel.style.position = 'fixed';
  panel.style.bottom = '20px';
  panel.style.right = '20px';
  panel.style.background = '#1e293b';
  panel.style.color = '#ffffff';
  panel.style.padding = '12px 16px';
  panel.style.borderRadius = '10px';
  panel.style.boxShadow = '0 4px 16px rgba(0,0,0,0.3)';
  panel.style.zIndex = '9999';
  panel.style.fontSize = '0.85rem';
  panel.style.display = 'none'; // 預設隱藏

  var title = document.createElement('div');
  title.style.fontWeight = 'bold';
  title.style.marginBottom = '8px';
  title.innerText = '⚙️ 課堂現場問卷控制';

  var btnPre = document.createElement('button');
  btnPre.id = 'togglePreBtn';
  btnPre.style.marginRight = '8px';
  btnPre.style.padding = '6px 10px';
  btnPre.style.borderRadius = '6px';
  btnPre.style.border = 'none';
  btnPre.style.cursor = 'pointer';

  var btnPost = document.createElement('button');
  btnPost.id = 'togglePostBtn';
  btnPost.style.padding = '6px 10px';
  btnPost.style.borderRadius = '6px';
  btnPost.style.border = 'none';
  btnPost.style.cursor = 'pointer';

  btnPre.onclick = function() {
    var curIdx = getCurrentWeekIndex();
    var curWeek = WEEKS_DATA[curIdx].week;
    var curState = getSurveyState(curWeek, 'pre');
    setSurveyState(curWeek, 'pre', !curState);
    selectWeek(curIdx);
  };

  btnPost.onclick = function() {
    var curIdx = getCurrentWeekIndex();
    var curWeek = WEEKS_DATA[curIdx].week;
    var curState = getSurveyState(curWeek, 'post');
    setSurveyState(curWeek, 'post', !curState);
    selectWeek(curIdx);
  };

  panel.appendChild(title);
  panel.appendChild(btnPre);
  panel.appendChild(btnPost);
  document.body.appendChild(panel);

  // 快捷鍵呼叫：按鍵盤 Ctrl + M 即可切換面板顯示/隱藏
  window.addEventListener('keydown', function(e) {
    if (e.ctrlKey && (e.key === 'm' || e.key === 'M')) {
      panel.style.display = panel.style.display === 'none' ? 'block' : 'none';
    }
  });

  // 密技：連按 3 次頂端大標題也可以打開/關閉面板
  var headerH1 = document.querySelector('header h1');
  if (headerH1) {
    var clickCount = 0;
    var timer = null;
    headerH1.style.cursor = 'pointer';
    headerH1.addEventListener('click', function() {
      clickCount++;
      clearTimeout(timer);
      timer = setTimeout(function() { clickCount = 0; }, 600);
      if (clickCount >= 3) {
        panel.style.display = panel.style.display === 'none' ? 'block' : 'none';
        clickCount = 0;
      }
    });
  }
}

function getCurrentWeekIndex() {
  var activeBtn = document.querySelector('.week-btn.active');
  if (!activeBtn) return WEEKS_DATA.length - 1;
  var btns = Array.prototype.slice.call(document.querySelectorAll('.week-btn'));
  return btns.indexOf(activeBtn);
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

  // 讀取當週的現場開關狀態
  var isPreOpen = getSurveyState(data.week, 'pre');
  var isPostOpen = getSurveyState(data.week, 'post');

  // 更新控制面板按鈕文字與顏色
  var btnPre = document.getElementById('togglePreBtn');
  var btnPost = document.getElementById('togglePostBtn');
  if (btnPre) {
    btnPre.innerText = isPreOpen ? '課前問卷：已開啟' : '課前問卷：已隱藏';
    btnPre.style.background = isPreOpen ? '#10b981' : '#64748b';
    btnPre.style.color = '#fff';
  }
  if (btnPost) {
    btnPost.innerText = isPostOpen ? '課後問卷：已開啟' : '課後問卷：已隱藏';
    btnPost.style.background = isPostOpen ? '#10b981' : '#64748b';
    btnPost.style.color = '#fff';
  }

  // 2. 課前問卷（由現場開關控制）
  var preSurveyLink = document.getElementById('preSurveyLink');
  var preSurveyCard = preSurveyLink ? preSurveyLink.closest('.card') : null;
  if (isPreOpen && data.preSurvey && data.preSurvey.trim() !== '' && data.preSurvey !== '#') {
    document.getElementById('preSurveyTitle').innerText = '第 ' + data.week + ' 週 課前問卷調查';
    preSurveyLink.href = data.preSurvey;
    if (preSurveyCard) preSurveyCard.style.display = 'flex';
  } else {
    if (preSurveyCard) preSurveyCard.style.display = 'none';
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

  // 7. 課後問卷（由現場開關控制）
  var postSurveyLink = document.getElementById('postSurveyLink');
  var postSurveyCard = postSurveyLink ? postSurveyLink.closest('.card') : null;
  if (isPostOpen && data.postSurvey && data.postSurvey.trim() !== '' && data.postSurvey !== '#') {
    document.getElementById('postSurveyTitle').innerText = '第 ' + data.week + ' 週 課後問卷調查';
    postSurveyLink.href = data.postSurvey;
    if (postSurveyCard) postSurveyCard.style.display = 'flex';
  } else {
    if (postSurveyCard) postSurveyCard.style.display = 'none';
  }
}

window.addEventListener('DOMContentLoaded', renderWeekButtons);