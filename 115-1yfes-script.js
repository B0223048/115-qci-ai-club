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

  // 3. 更新作業繳交雲端硬碟連結
  document.getElementById('homeworkTitle').innerText = `第 ${data.week} 週 作業繳交雲端硬碟`;
  document.getElementById('homeworkLink').href = data.homeworkDrive;

  // 4. 更新 Action 1 台英語學伴的每週課次提示
  const taskElem = document.getElementById('companionTask');
  if (data.companionLesson) {
    taskElem.innerText = `📖 ${data.companionLesson}`;
    taskElem.style.display = 'inline-block';
  } else {
    taskElem.style.display = 'none';
  }

  // 5. 更新每週影片卡片（支援自訂標題與內文說明）
  const classCard = document.getElementById('weeklyClassCard');
  const classLink = document.getElementById('weeklyClassLink');
  const classTitle = document.getElementById('weeklyClassTitle');
  const classDesc = document.getElementById('weeklyClassDesc');
  const classTask = document.getElementById('weeklyClassTask');

  if (data.classUrl && data.classUrl.trim() !== '' && data.classUrl !== '#') {
    if (classTask) classTask.innerText = data.classTask || '課堂補充';
    const subTitle = data.classTitle || '課堂影音與補充';
    classTitle.innerText = '第 ' + data.week + ' 週 ' + subTitle;
    classDesc.innerText = data.classDesc || '點擊觀看本週主題的精彩影片或教學示範！';
    classLink.href = data.classUrl;

    classCard.style.display = 'flex';
  } else {
    classCard.style.display = 'none';
  }
}

// 使用 AES-GCM 進行解密
async function decryptSpreadsheetUrl(password) {
  // 真實試算表網址經由密碼 "yfes" 加密後的安全數據
  const encryptedHex = "0d207c08a4918e7c2c9d64593845b4625b035a98bf494fc7c22956cf2ce4a067ed778385db1f9ce0aa018e6981885b525d81b490494498305f884102d8471c0807b539bf991da7df37119ff3a03aa786c52a36b3b27b40bcab25dfc5e0da2eb6d22ef14ae99368dcf06869a835aeeeb8bb2201";
  const ivHex = "3a23a318287714856f6a782e";

  try {
    const enc = new TextEncoder();
    const pwHash = await crypto.subtle.digest("SHA-256", enc.encode(password));
    const key = await crypto.subtle.importKey("raw", pwHash, { name: "AES-GCM" }, false, ["decrypt"]);
    
    const iv = new Uint8Array(ivHex.match(/.{1,2}/g).map(byte => parseInt(byte, 16)));
    const cipherBuffer = new Uint8Array(encryptedHex.match(/.{1,2}/g).map(byte => parseInt(byte, 16)));

    const decrypted = await crypto.subtle.decrypt({ name: "AES-GCM", iv }, key, cipherBuffer);
    return new TextDecoder().decode(decrypted);
  } catch (e) {
    return null;
  }
}

// 學生帳號分配表密碼驗證
async function checkSheetPwd() {
  const pwd = document.getElementById('sheetPwdInput').value.trim();
  const decryptedUrl = await decryptSpreadsheetUrl(pwd);

  if (decryptedUrl && decryptedUrl.startsWith('https://docs.google.com/')) {
    const linkElem = document.getElementById('sheetRealLink');
    linkElem.href = decryptedUrl;
    linkElem.style.display = 'block';
    document.getElementById('sheetPwdInput').style.display = 'none';
    document.getElementById('sheetUnlockBtn').style.display = 'none';
  } else {
    alert('密碼錯誤！請詢問社團課老師或助教。');
  }
}

window.addEventListener('DOMContentLoaded', renderWeekButtons);