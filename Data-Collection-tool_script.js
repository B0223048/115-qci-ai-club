// ====================================================
// 專案全域配置 (Single Source of Truth)
// 往後修改預設權重、門檻或遊戲連結，只要修改這裡！
// ====================================================
const CONFIG = {
  defaultTextWeight: 0.5, // 0.5 代表 55 開；0.7 代表文字 70%、圖片 30%
  minRecordsForGame: 3,   // 解鎖小遊戲需要的筆數
  gameUrl: 'https://kws.oaselab.org/'
};

// 執行時狀態管理
let state = {
  w1: Number((1.0 - CONFIG.defaultTextWeight).toFixed(2)), // 圖片權重
  w2: Number(CONFIG.defaultTextWeight.toFixed(2))          // 文字權重
};

let records = [];
let currentImages = { currImg1: null, currImg2: null };
let exportCount = 0;

// 頁面載入完成時，以 CONFIG 為準初始化畫面
window.addEventListener('DOMContentLoaded', () => {
  const initialSliderVal = Math.round(CONFIG.defaultTextWeight * 100);
  const slider = document.getElementById('weightSlider');
  if (slider) {
    slider.value = initialSliderVal;
  }
  onWeightSliderChange(initialSliderVal);
});

// ----------------------------------------------------
// 權重連動核心（徹底避免 0 || 預設值的型態誤判陷阱）
// ----------------------------------------------------
function onWeightSliderChange(sliderVal) {
  const val = Number(sliderVal);
  const textPercent = val;          // 0 ~ 100
  const imgPercent = 100 - val;     // 100 ~ 0

  state.w1 = Number((imgPercent / 100).toFixed(2));
  state.w2 = Number((textPercent / 100).toFixed(2));

  const pV1Elem = document.getElementById('percentV1');
  const pV2Elem = document.getElementById('percentV2');
  if (pV1Elem) pV1Elem.innerText = `${imgPercent}%`;
  if (pV2Elem) pV2Elem.innerText = `${textPercent}%`;

  // 1. 即時計算 Step 3 預覽分數
  calcHEGAI();

  // 2. 即時連動更新清單頁面
  renderRecordTable();
}

function calcHEGAI() {
  const v1Elem = document.getElementById('v1');
  const v2Elem = document.getElementById('v2');
  if (!v1Elem || !v2Elem) return 0;

  const v1 = v1Elem.value;
  const v2 = v2Elem.value;

  if (v1 === '' || v2 === '' || isNaN(Number(v1)) || isNaN(Number(v2))) {
    const scoreElem = document.getElementById('hegaiFinal');
    if (scoreElem) scoreElem.innerText = '--';
    return 0;
  }

  const finalScore = Number((state.w1 * Number(v1) + state.w2 * Number(v2)).toFixed(1));
  const scoreElem = document.getElementById('hegaiFinal');
  if (scoreElem) scoreElem.innerText = finalScore;
  return finalScore;
}

function renderRecordTable() {
  const tbody = document.getElementById('recordTableBody');
  if (!tbody) return;
  
  const count = records.length;
  document.getElementById('listCount').innerText = `${count} 筆`;
  document.getElementById('tabListCount').innerText = count;

  // 小遊戲按鈕判定 (達門檻解鎖)
  const gameBtn = document.getElementById('gameLinkBtn');
  const gameStatus = document.getElementById('gameLockStatus');
  if (gameBtn && gameStatus) {
    if (count >= CONFIG.minRecordsForGame) {
      gameBtn.disabled = false;
      gameBtn.innerText = '🎮 前往小遊戲';
      gameStatus.innerText = '（已解鎖！）';
      gameStatus.style.color = '#15803d';
    } else {
      gameBtn.disabled = true;
      gameBtn.innerText = '🔒 尚未解鎖';
      gameStatus.innerText = `（再收集 ${CONFIG.minRecordsForGame - count} 筆即可解鎖）`;
      gameStatus.style.color = '#86198f';
    }
  }

  if (count === 0) {
    tbody.innerHTML = '<tr><td colspan="13" style="text-align:center; color:#94a3b8;">目前尚無已暫存的資料</td></tr>';
    return;
  }

  tbody.innerHTML = records.map((r, i) => {
    // 依當前最新權重動態計算分數
    const currentScore = Number((state.w1 * Number(r.v1) + state.w2 * Number(r.v2)).toFixed(1));
    r.finalScore = currentScore;

    return `
      <tr>
        <td>
          <button class="btn-edit" onclick="editRecord(${i})">編輯</button>
          <button class="btn-danger" onclick="deleteRecord(${i})">刪除</button>
        </td>
        <td>${i + 1}</td>
        <td>${r.img1 ? `<img src="${r.img1.base64}" style="max-height:45px; max-width:60px; object-fit:contain;">` : '[無圖]'}</td>
        <td>${r.chinese}</td>
        <td>${r.engText}</td>
        <td>${r.distance}</td>
        <td>${r.light}</td>
        <td style="max-width:160px; overflow:hidden; text-overflow:ellipsis; white-space:nowrap;" title="${r.gaiText}">${r.gaiText}</td>
        <td>${r.hegaiText}</td>
        <td>${r.img2 ? `<img src="${r.img2.base64}" style="max-height:45px; max-width:60px; object-fit:contain;">` : '[無圖]'}</td>
        <td>${r.v1}</td>
        <td>${r.v2}</td>
        <td><b>${currentScore}</b></td>
      </tr>
    `;
  }).join('');

  updateCancelBtnVisibility();
}

// ----------------------------------------------------
// 輸入防呆與同步
// ----------------------------------------------------
function syncInput(sourceId, targetId, triggerCalc = false, min = null, max = null) {
  const source = document.getElementById(sourceId);
  const target = document.getElementById(targetId);
  let val = source.value;

  if (val !== '' && min !== null && max !== null) {
    const num = Number(val);
    source.style.borderColor = (!isNaN(num) && num >= min && num <= max) ? '' : '#dc2626';
  }

  target.value = val;
  if (triggerCalc) calcHEGAI();
}

function isValidNumber(valStr, min, max) {
  if (valStr === '' || valStr === null || valStr === undefined) return false;
  const num = Number(valStr);
  return !isNaN(num) && num >= min && num <= max;
}

function validateStep0(msgElemId) {
  const userName = document.getElementById('userName').value.trim();
  if (!userName) {
    showNotice(msgElemId, '⚠️ 請先在最上方填寫「你的名字」！', true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
    return false;
  }
  return true;
}

// ----------------------------------------------------
// 分頁與導航
// ----------------------------------------------------
function switchTab(tabId, btnId) {
  document.querySelectorAll('.tab-pane').forEach(pane => pane.classList.remove('active'));
  document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
  document.getElementById(tabId).classList.add('active');
  if (btnId) document.getElementById(btnId).classList.add('active');
  updateCancelBtnVisibility();
}

function goBackTo(tabId, btnId) {
  switchTab(tabId, btnId);
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function startNewRecord() {
  if (!validateStep0('exportMsg')) return;
  resetForm();
  switchTab('tab-Step1', 'btn-tab1');
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function cancelToTab4() {
  resetForm();
  switchTab('tab-list', 'btn-tab4');
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function updateCancelBtnVisibility() {
  const isEditing = document.getElementById('editingIndex').value !== '-1';
  document.getElementById('cancelStep1Btn').style.display = (records.length > 0 || isEditing) ? 'block' : 'none';
}

function goToStep2() {
  if (!validateStep0('Step1Msg')) return;

  const chinese = document.getElementById('chinese').value.trim();
  const engText = document.getElementById('engText').value.trim();
  const editingIdx = parseInt(document.getElementById('editingIndex').value, 10);
  const currentImg1 = currentImages.currImg1 || (editingIdx !== -1 ? records[editingIdx].img1 : null);
  const distanceVal = document.getElementById('distance').value;
  const lightVal = document.getElementById('light').value;

  if (!chinese || !engText) {
    showNotice('Step1Msg', '⚠️ 請務必填寫「中文語句」與「翻譯英文句子」！', true);
    return;
  }
  if (!currentImg1) {
    showNotice('Step1Msg', '⚠️ 請先上傳第1張生成圖片 (Generated Image)！', true);
    return;
  }
  if (!isValidNumber(distanceVal, 0, 255) || !isValidNumber(lightVal, 0, 4000)) {
    showNotice('Step1Msg', '⚠️ 請確實填寫或滑動設定「Distance」與「Light」數值！', true);
    return;
  }

  document.getElementById('Step2-ref-img1').src = currentImg1.base64;
  document.getElementById('Step2-ref-img1').style.display = 'block';

  switchTab('tab-Step2', 'btn-tab2');
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function goToStep3() {
  if (!validateStep0('Step2Msg')) return;

  const gaiText = document.getElementById('gaiText').value.trim();
  const hegaiTextVal = document.getElementById('hegaiText').value;

  if (!gaiText) {
    showNotice('Step2Msg', '⚠️ 請輸入 GAIText (反向生成的英文描述)！', true);
    return;
  }
  if (!isValidNumber(hegaiTextVal, 0, 10)) {
    showNotice('Step2Msg', '⚠️ 請設定 HEGAIText 評分！', true);
    return;
  }

  const editingIdx = parseInt(document.getElementById('editingIndex').value, 10);
  const currentImg1 = currentImages.currImg1 || (editingIdx !== -1 ? records[editingIdx].img1 : null);
  document.getElementById('Step3-ref-img1').src = currentImg1.base64;
  document.getElementById('Step3-ref-img1').style.display = 'block';
  document.getElementById('Step3-ref-text').innerText = gaiText;

  calcHEGAI();
  switchTab('tab-Step3', 'btn-tab3');
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function showNotice(elemId, text, isError = false) {
  const box = document.getElementById(elemId);
  box.innerText = text;
  box.className = 'msg-box ' + (isError ? 'msg-error' : 'msg-success');
  box.style.display = 'block';
  setTimeout(() => { box.style.display = 'none'; }, 3500);
}

function handleImage(input, prevId, storeKey) {
  const file = input.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = function(e) {
      const base64 = e.target.result;
      const img = new Image();
      img.onload = function() {
        currentImages[storeKey] = {
          base64: base64,
          ext: file.type.includes('png') ? 'png' : 'jpeg',
          width: img.naturalWidth,
          height: img.naturalHeight
        };
        
        if (storeKey === 'currImg1') {
          document.getElementById(prevId).src = base64;
          document.getElementById(prevId).style.display = 'block';
          document.getElementById('prev1-container').style.display = 'block';
        }
        if (storeKey === 'currImg2') {
          document.getElementById('Step3-ref-img2-v1').src = base64;
          document.getElementById('Step3-ref-img2-v1').style.display = 'block';
          document.getElementById('Step3-ref-img2-v2').src = base64;
          document.getElementById('Step3-ref-img2-v2').style.display = 'block';
        }
      };
      img.src = base64;
    };
    reader.readAsDataURL(file);
  }
}

function calculateFitDimensions(origWidth, origHeight, maxWidth, maxHeight) {
  const ratio = Math.min(maxWidth / origWidth, maxHeight / origHeight);
  return { width: Math.round(origWidth * ratio), height: Math.round(origHeight * ratio) };
}

function saveRecord() {
  if (!validateStep0('actionMsg')) return;

  const chinese = document.getElementById('chinese').value.trim();
  const engText = document.getElementById('engText').value.trim();
  const editingIdx = parseInt(document.getElementById('editingIndex').value, 10);

  const currentImg1 = currentImages.currImg1 || (editingIdx !== -1 ? records[editingIdx].img1 : null);
  const currentImg2 = currentImages.currImg2 || (editingIdx !== -1 ? records[editingIdx].img2 : null);

  if (!currentImg1 || !currentImg2) {
    showNotice('actionMsg', '⚠️ 請完成第2張圖片的上傳後再新增！', true);
    return;
  }
  
  const v1Val = document.getElementById('v1').value;
  const v2Val = document.getElementById('v2').value;
  if (!isValidNumber(v1Val, 0, 10) || !isValidNumber(v2Val, 0, 10)) {
    showNotice('actionMsg', '⚠️ 請設定 HEGAIImage_v1 與 v2 評分！', true);
    return;
  }

  const record = {
    chinese: chinese,
    engText: engText,
    distance: Number(document.getElementById('distance').value),
    light: Number(document.getElementById('light').value),
    gaiText: document.getElementById('gaiText').value.trim(),
    hegaiText: Number(document.getElementById('hegaiText').value),
    v1: Number(v1Val),
    v2: Number(v2Val),
    finalScore: Number(calcHEGAI()),
    img1: currentImg1,
    img2: currentImg2
  };

  if (editingIdx === -1) {
    records.push(record);
    showNotice('exportMsg', '✅ 已成功新增一筆資料！', false);
  } else {
    records[editingIdx] = record;
    document.getElementById('editingIndex').value = '-1';
    document.getElementById('submitBtn').innerText = '💾 儲存並前往收集清單';
    showNotice('exportMsg', `✅ 第 ${editingIdx + 1} 筆資料已更新！`, false);
  }

  renderRecordTable();
  switchTab('tab-list', 'btn-tab4');
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function editRecord(index) {
  const r = records[index];
  document.getElementById('chinese').value = r.chinese === '（未填寫）' ? '' : r.chinese;
  document.getElementById('engText').value = r.engText === '（未填寫）' ? '' : r.engText;
  
  document.getElementById('distance').value = r.distance;
  document.getElementById('distanceRange').value = r.distance;
  document.getElementById('light').value = r.light;
  document.getElementById('lightRange').value = r.light;
  document.getElementById('gaiText').value = r.gaiText;
  document.getElementById('hegaiText').value = r.hegaiText;
  document.getElementById('hegaiTextRange').value = r.hegaiText;
  document.getElementById('v1').value = r.v1;
  document.getElementById('v1Range').value = r.v1;
  document.getElementById('v2').value = r.v2;
  document.getElementById('v2Range').value = r.v2;
  calcHEGAI();

  currentImages.currImg1 = r.img1;
  currentImages.currImg2 = r.img2;

  if (r.img1) {
    document.getElementById('prev1').src = r.img1.base64;
    document.getElementById('prev1').style.display = 'block';
    document.getElementById('prev1-container').style.display = 'block';
  }
  if (r.img2) {
    document.getElementById('Step3-ref-img2-v1').src = r.img2.base64;
    document.getElementById('Step3-ref-img2-v1').style.display = 'block';
    document.getElementById('Step3-ref-img2-v2').src = r.img2.base64;
    document.getElementById('Step3-ref-img2-v2').style.display = 'block';
  }

  document.getElementById('editingIndex').value = index;
  document.getElementById('submitBtn').innerText = `💾 儲存修改 (第 ${index + 1} 筆)`;
  switchTab('tab-Step1', 'btn-tab1');
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function resetForm() {
  const prev1Box = document.getElementById('prev1-container');
  if (prev1Box) prev1Box.style.display = 'none';
  document.getElementById('chinese').value = '';
  document.getElementById('engText').value = '';
  document.getElementById('gaiText').value = '';
  document.getElementById('genImageInput').value = '';
  document.getElementById('gaiImageInput').value = '';
  document.getElementById('prev1').style.display = 'none';
  document.getElementById('Step2-ref-img1').style.display = 'none';
  document.getElementById('Step3-ref-img1').style.display = 'none';
  document.getElementById('Step3-ref-img2-v1').style.display = 'none';
  document.getElementById('Step3-ref-img2-v2').style.display = 'none';
  document.getElementById('Step3-ref-text').innerText = '（尚未輸入文字）';
  
  currentImages = { currImg1: null, currImg2: null };
  document.getElementById('editingIndex').value = '-1';
  document.getElementById('submitBtn').innerText = '💾 儲存並前往收集清單';

  document.getElementById('distance').value = '';
  document.getElementById('distanceRange').value = 127;
  document.getElementById('light').value = '';
  document.getElementById('lightRange').value = 2000;
  document.getElementById('hegaiText').value = '';
  document.getElementById('hegaiTextRange').value = 5;
  document.getElementById('v1').value = '';
  document.getElementById('v1Range').value = 5;
  document.getElementById('v2').value = '';
  document.getElementById('v2Range').value = 5;
  
  document.getElementById('hegaiFinal').innerText = '--';
  updateCancelBtnVisibility();
}

function deleteRecord(index) {
  records.splice(index, 1);
  renderRecordTable();
  if (parseInt(document.getElementById('editingIndex').value, 10) === index) {
    resetForm();
  }
  showNotice('exportMsg', '已刪除該筆資料');
  updateCancelBtnVisibility();
}

function openGame() {
  if (records.length < CONFIG.minRecordsForGame) return;
  window.open(CONFIG.gameUrl, '_blank');
}

// ----------------------------------------------------
// 匯出 Excel（完整支援動態權重公式）
// ----------------------------------------------------
async function exportAllXLSX() {
  if (!validateStep0('exportMsg')) return;

  if (records.length === 0) {
    showNotice('exportMsg', '⚠️ 清單中尚無任何資料可以匯出！', true);
    return;
  }

  const btn = document.getElementById('exportBtn');
  btn.disabled = true;
  btn.innerText = `正在產生 ${records.length} 筆資料之 Excel...`;

  const { w1, w2 } = state;

  try {
    const workbook = new ExcelJS.Workbook();
    const sheet = workbook.addWorksheet('工作表1');

    sheet.columns = [
      { key: 'A', width: 32.25 },
      { key: 'B', width: 13.0 },
      { key: 'C', width: 13.0 },
      { key: 'D', width: 19.75 },
      { key: 'E', width: 18.66 },
      { key: 'F', width: 47.08 },
      { key: 'G', width: 22.66 },
      { key: 'H', width: 26.25 },
      { key: 'I', width: 15.08 },
      { key: 'J', width: 16.66 },
      { key: 'K', width: 15.41 }
    ];

    const mediumBorder = {
      top: { style: 'medium', color: { argb: 'FF000000' } },
      left: { style: 'medium', color: { argb: 'FF000000' } },
      bottom: { style: 'medium', color: { argb: 'FF000000' } },
      right: { style: 'medium', color: { argb: 'FF000000' } }
    };

    const headerRow = sheet.getRow(1);
    const headerValues = [
      'Generated Image',
      'Chinese',
      'Translated English Text',
      'Distance',
      'Light',
      'GAIText (English)\n(Upload the generated image to generate description texts)',
      'HEGAIText',
      'GAIImage (English)\n(Use the translated English to generate a new image)',
      'HEGAIImage_v1',
      'HEGAIImage_v2',
      'HEGAIImage'
    ];

    headerValues.forEach((val, idx) => {
      const cell = headerRow.getCell(idx + 1);
      cell.value = val;
      cell.alignment = { horizontal: 'center', vertical: 'middle', wrapText: true };
      cell.border = mediumBorder;

      if ([4, 5, 7, 11].includes(idx + 1)) {
        cell.font = { name: 'Times New Roman', size: 12, bold: true, color: { argb: 'FFC00000' } };
      } else if ([6, 8, 9, 10].includes(idx + 1)) {
        cell.font = { name: 'Times New Roman', size: 12, bold: false, color: { argb: 'FF7030A0' } };
      } else {
        cell.font = { name: 'Times New Roman', size: 12, bold: false, color: { argb: 'FF000000' } };
      }
    });

    records.forEach((rec, idx) => {
      const rowNum = idx + 2;
      const row = sheet.getRow(rowNum);

      row.getCell(2).value = rec.chinese;
      row.getCell(2).font = { name: '標楷體', size: 12, bold: false, color: { argb: 'FF000000' } };

      row.getCell(3).value = rec.engText;
      row.getCell(3).font = { name: 'Times New Roman', size: 12, bold: true, color: { argb: 'FF7030A0' } };

      row.getCell(4).value = rec.distance;
      row.getCell(4).font = { name: 'Times New Roman', size: 16, bold: true, color: { argb: 'FFC00000' } };

      row.getCell(5).value = rec.light;
      row.getCell(5).font = { name: 'Times New Roman', size: 16, bold: true, color: { argb: 'FFC00000' } };

      row.getCell(6).value = rec.gaiText;
      row.getCell(6).font = { name: 'Times New Roman', size: 12, bold: false, color: { argb: 'FF7030A0' } };

      row.getCell(7).value = rec.hegaiText;
      row.getCell(7).font = { name: 'Times New Roman', size: 16, bold: true, color: { argb: 'FFC00000' } };

      row.getCell(9).value = rec.v1;
      row.getCell(9).font = { name: 'Times New Roman', size: 12, bold: false, color: { argb: 'FF7030A0' } };

      row.getCell(10).value = rec.v2;
      row.getCell(10).font = { name: 'Times New Roman', size: 12, bold: false, color: { argb: 'FF7030A0' } };

      const cellK = row.getCell(11);
      cellK.value = { formula: `${w1}*I${rowNum}+${w2}*J${rowNum}`, result: rec.finalScore };
      cellK.font = { name: 'Times New Roman', size: 16, bold: true, color: { argb: 'FFC00000' } };

      for (let col = 1; col <= 11; col++) {
        const c = row.getCell(col);
        c.border = mediumBorder;
        c.alignment = { horizontal: 'center', vertical: 'middle', wrapText: true };
      }

      const TARGET_PX = 151; 
      const cellH_PX = 255;
      
      if (rec.img1) {
        const cellW1_PX = 230;
        const fit1 = calculateFitDimensions(rec.img1.width, rec.img1.height, TARGET_PX, TARGET_PX);
        const offsetX1 = ((cellW1_PX - fit1.width) / 2) / cellW1_PX;
        const offsetY1 = ((cellH_PX - fit1.height) / 2) / cellH_PX;

        const imgId1 = workbook.addImage({ base64: rec.img1.base64, extension: rec.img1.ext });
        sheet.addImage(imgId1, {
          tl: { col: 0 + offsetX1, row: (rowNum - 1) + offsetY1 },
          ext: { width: fit1.width, height: fit1.height },
          editAs: 'oneCell'
        });
      }

      if (rec.img2) {
        const cellW2_PX = 188;
        const fit2 = calculateFitDimensions(rec.img2.width, rec.img2.height, TARGET_PX, TARGET_PX);
        const offsetX2 = ((cellW2_PX - fit2.width) / 2) / cellW2_PX;
        const offsetY2 = ((cellH_PX - fit2.height) / 2) / cellH_PX;

        const imgId2 = workbook.addImage({ base64: rec.img2.base64, extension: rec.img2.ext });
        sheet.addImage(imgId2, {
          tl: { col: 7 + offsetX2, row: (rowNum - 1) + offsetY2 },
          ext: { width: fit2.width, height: fit2.height },
          editAs: 'oneCell'
        });
      }
    });

    sheet.eachRow((row, rowNumber) => {
      row.height = (rowNumber === 1) ? 47 : 191.25;
    });

    const buffer = await workbook.xlsx.writeBuffer();
    const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    
    exportCount++; 
    const userName = document.getElementById('userName').value.trim() || '未命名';
    const now = new Date();
    const yyyy = now.getFullYear();
    const mm = String(now.getMonth() + 1).padStart(2, '0');
    const dd = String(now.getDate()).padStart(2, '0');
    const todayDate = `${yyyy}${mm}${dd}`;

    link.download = `DataCollectionTemplate_${userName}_${todayDate}-${exportCount}.xlsx`;
    
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showNotice('exportMsg', '🎉 Excel 檔案已成功下載！');
  } catch (err) {
    showNotice('exportMsg', '匯出失敗：' + err.message, true);
  } finally {
    btn.disabled = false;
    btn.innerText = '⬇️ 批次匯出全部資料 (.xlsx)';
  }
}