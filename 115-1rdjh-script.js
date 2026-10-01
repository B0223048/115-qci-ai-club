function renderWeekButtons() {
  const list = document.getElementById('weekBtnList');
  list.innerHTML = WEEKS_DATA.map((item, idx) => `
    <button class="week-btn ${idx === WEEKS_DATA.length - 1 ? 'active' : ''}" onclick="selectWeek(${idx})">
      第 ${item.week} 週 (${item.date.split('年')[1].trim()})
    </button>
  `).join('');

  // 預設選中最後一週（最新一週）
  selectWeek(WEEKS_DATA.length - 1);
}

function selectWeek(index) {
  const data = WEEKS_DATA[index];
  if (!data) return;

  // 更新按鈕樣式
  document.querySelectorAll('.week-btn').forEach((btn, i) => {
    btn.classList.toggle('active', i === index);
  });

  // 1. 更新頂端日期
  document.getElementById('headerDate').innerText = `📅 課堂日期：${data.date}`;

  // 2. 更新課前與課後問卷
  document.getElementById('preSurveyTitle').innerText = `第 ${data.week} 週 課前問卷調查`;
  document.getElementById('preSurveyLink').href = data.preSurvey;

  document.getElementById('postSurveyTitle').innerText = `第 ${data.week} 週 課後問卷調查`;
  document.getElementById('postSurveyLink').href = data.postSurvey;


  // 4. 更新 Action 1 台英語學伴的每週課次提示
  const taskElem = document.getElementById('companionTask');
  if (data.companionLesson) {
    taskElem.innerText = `📖 ${data.companionLesson}`;
    taskElem.style.display = 'inline-block';
  } else {
    taskElem.style.display = 'none';
  }

// 5. 更新每週影片/補充資源卡片
  const classCard = document.getElementById('weeklyClassCard');
  const classLink = document.getElementById('weeklyClassLink');
  const classTitle = document.getElementById('weeklyClassTitle');
  const classDesc = document.getElementById('weeklyClassDesc');
  const classTask = document.getElementById('weeklyClassTask');

  if (data.classUrl && data.classUrl.trim() !== '' && data.classUrl !== '#') {
    if (classTask) classTask.innerText = data.classTask || '課堂補充';
    const subTitle = data.classTitle || '課堂影音與補充';
    classTitle.innerText = '第 ' + data.week + ' 週 ' + subTitle;
    
    // 補上說明內文更新
    if (classDesc) classDesc.innerText = data.classDesc || '';
    
    // 補上超連結與按鈕文字更新
    if (classLink) {
      classLink.href = data.classUrl;
      classLink.innerText = data.classLink || data.weeklyClassLink || '前往補充內容';
    }

    classCard.style.display = 'flex';
  } else {
    classCard.style.display = 'none';
  }
}
window.addEventListener('DOMContentLoaded', renderWeekButtons);