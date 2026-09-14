let records = [];
let currentImages = { currImg1: null, currImg2: null };
let exportCount = 0;

// ----------------------------------------------------
// 檢驗功能：第0步的「名字」與「權重」校驗
// ----------------------------------------------------
function validatePart0(msgElemId) {
  const userName = document.getElementById('userName').value.trim();
  const w1 = parseFloat(document.getElementById('weightV1').value);
  const w2 = parseFloat(document.getElementById('weightV2').value);

  if (!userName) {
    showNotice(msgElemId, '⚠️ 請先在最上方設定填寫「你的名字」！', true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
    return false;
  }
  
  // 使用浮點數容差值來檢查是否等於 1
  if (isNaN(w1) || isNaN(w2) || Math.abs((w1 + w2) - 1.0) > 0.001) {
    showNotice(msgElemId, '⚠️ 頂端環境設定的 v1 與 v2 權重相加必須等於 1！', true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
    return false;
  }
  
  return true;
}

function syncInput(sourceId, targetId, triggerCalc = false) {
  const val = document.getElementById(sourceId).value;
  document.getElementById(targetId).value = val;
  if (triggerCalc) calcHEGAI();
}

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
  // 進入新紀錄前，也要先檢查設定有沒有搞錯
  if (!validatePart0('exportMsg')) return;
  
  resetForm();
  switchTab('tab-part1', 'btn-tab1');
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function cancelToTab4() {
  resetForm();
  switchTab('tab-list', 'btn-tab4');
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function updateCancelBtnVisibility() {
  const isEditing = document.getElementById('editingIndex').value !== '-1';
  if (records.length > 0 || isEditing) {
    document.getElementById('cancelPart1Btn').style.display = 'block';
  } else {
    document.getElementById('cancelPart1Btn').style.display = 'none';
  }
}

function goToPart2() {
  // 第一道防線：檢驗 Part 0 全域設定
  if (!validatePart0('part1Msg')) return;

  const chinese = document.getElementById('chinese').value.trim();
  const engText = document.getElementById('engText').value.trim();
  const editingIdx = parseInt(document.getElementById('editingIndex').value);
  const currentImg1 = currentImages.currImg1 || (editingIdx !== -1 ? records[editingIdx].img1 : null);

  if (!chinese || !engText) {
    showNotice('part1Msg', '⚠️ 請務必填寫「中文語句」與「翻譯英文句子」！', true);
    return;
  }
  if (!currentImg1) {
    showNotice('part1Msg', '⚠️ 請先上傳第1張生成圖片 (Generated Image)！', true);
    return;
  }
  if (document.getElementById('distance').value === '' || document.getElementById('light').value === '') {
    showNotice('part1Msg', '⚠️ 請拖曳滑桿或輸入設定 Distance 與 Light 數值！', true);
    return;
  }

  document.getElementById('part2-ref-img1').src = currentImg1.base64;
  document.getElementById('part2-ref-img1').style.display = 'block';

  switchTab('tab-part2', 'btn-tab2');
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function goToPart3() {
  // 隨時防呆，確保過程中設定沒被亂改
  if (!validatePart0('part2Msg')) return;

  const gaiText = document.getElementById('gaiText').value.trim();
  if (!gaiText) {
    showNotice('part2Msg', '⚠️ 請輸入 GAIText (反向生成的英文描述)！', true);
    return;
  }
  
  if (document.getElementById('hegaiText').value === '') {
    showNotice('part2Msg', '⚠️ 請設定 HEGAIText 評分！', true);
    return;
  }

  const editingIdx = parseInt(document.getElementById('editingIndex').value);
  const currentImg1 = currentImages.currImg1 || (editingIdx !== -1 ? records[editingIdx].img1 : null);
  document.getElementById('part3-ref-img1').src = currentImg1.base64;
  document.getElementById('part3-ref-img1').style.display = 'block';
  document.getElementById('part3-ref-text').innerText = gaiText;

  switchTab('tab-part3', 'btn-tab3');
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
        }
        if (storeKey === 'currImg2') {
          document.getElementById('part3-ref-img2-v1').src = base64;
          document.getElementById('part3-ref-img2-v1').style.display = 'block';
          document.getElementById('part3-ref-img2-v2').src = base64;
          document.getElementById('part3-ref-img2-v2').style.display = 'block';
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

function calcHEGAI() {
  const v1 = document.getElementById('v1').value;
  const v2 = document.getElementById('v2').value;
  const w1 = parseFloat(document.getElementById('weightV1').value) || 0;
  const w2 = parseFloat(document.getElementById('weightV2').value) || 0;
  
  if (v1 === '' || v2 === '') {
    document.getElementById('hegaiFinal').innerText = '--';
    return 0;
  }
  
  const finalScore = (w1 * parseFloat(v1) + w2 * parseFloat(v2)).toFixed(1);
  document.getElementById('hegaiFinal').innerText = finalScore;
  return finalScore;
}

function saveRecord() {
  // 儲存前最後一道防線
  if (!validatePart0('actionMsg')) return;

  const chinese = document.getElementById('chinese').value.trim();
  const engText = document.getElementById('engText').value.trim();
  const editingIdx = parseInt(document.getElementById('editingIndex').value);

  const currentImg1 = currentImages.currImg1 || (editingIdx !== -1 ? records[editingIdx].img1 : null);
  const currentImg2 = currentImages.currImg2 || (editingIdx !== -1 ? records[editingIdx].img2 : null);

  if (!currentImg1 || !currentImg2) {
    showNotice('actionMsg', '⚠️ 請完成第2張圖片的上傳後再新增！', true);
    return;
  }
  
  if (document.getElementById('v1').value === '' || document.getElementById('v2').value === '') {
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
    v1: Number(document.getElementById('v1').value),
    v2: Number(document.getElementById('v2').value),
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
  }
  if (r.img2) {
    document.getElementById('part3-ref-img2-v1').src = r.img2.base64;
    document.getElementById('part3-ref-img2-v1').style.display = 'block';
    document.getElementById('part3-ref-img2-v2').src = r.img2.base64;
    document.getElementById('part3-ref-img2-v2').style.display = 'block';
  }

  document.getElementById('editingIndex').value = index;
  document.getElementById('submitBtn').innerText = `💾 儲存修改 (第 ${index + 1} 筆)`;
  switchTab('tab-part1', 'btn-tab1');
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function resetForm() {
  document.getElementById('chinese').value = '';
  document.getElementById('engText').value = '';
  document.getElementById('gaiText').value = '';
  document.getElementById('genImageInput').value = '';
  document.getElementById('gaiImageInput').value = '';
  document.getElementById('prev1').style.display = 'none';
  document.getElementById('part2-ref-img1').style.display = 'none';
  document.getElementById('part3-ref-img1').style.display = 'none';
  document.getElementById('part3-ref-img2-v1').style.display = 'none';
  document.getElementById('part3-ref-img2-v2').style.display = 'none';
  document.getElementById('part3-ref-text').innerText = '（尚未輸入文字）';
  
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
  if (parseInt(document.getElementById('editingIndex').value) === index) {
    resetForm();
  }
  showNotice('exportMsg', '已刪除該筆資料');
  updateCancelBtnVisibility();
}

function renderRecordTable() {
  const tbody = document.getElementById('recordTableBody');
  document.getElementById('listCount').innerText = `${records.length} 筆`;
  document.getElementById('tabListCount').innerText = records.length;

  if (records.length === 0) {
    tbody.innerHTML = '<tr><td colspan="13" style="text-align:center; color:#94a3b8;">目前尚無已暫存的資料</td></tr>';
    return;
  }

  tbody.innerHTML = records.map((r, i) => `
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
      <td><b>${r.finalScore}</b></td>
    </tr>
  `).join('');
  updateCancelBtnVisibility();
}

async function exportAllXLSX() {
  if (!validatePart0('exportMsg')) return;

  if (records.length === 0) {
    showNotice('exportMsg', '⚠️ 清單中尚無任何資料可以匯出！', true);
    return;
  }

  const btn = document.getElementById('exportBtn');
  btn.disabled = true;
  btn.innerText = `正在產生 ${records.length} 筆資料之 Excel...`;

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

      const cellB = row.getCell(2);
      cellB.value = rec.chinese;
      cellB.font = { name: '標楷體', size: 12, bold: false, color: { argb: 'FF000000' } };

      const cellC = row.getCell(3);
      cellC.value = rec.engText;
      cellC.font = { name: 'Times New Roman', size: 12, bold: true, color: { argb: 'FF7030A0' } };

      const cellD = row.getCell(4);
      cellD.value = rec.distance;
      cellD.font = { name: 'Times New Roman', size: 16, bold: true, color: { argb: 'FFC00000' } };

      const cellE = row.getCell(5);
      cellE.value = rec.light;
      cellE.font = { name: 'Times New Roman', size: 16, bold: true, color: { argb: 'FFC00000' } };

      const cellF = row.getCell(6);
      cellF.value = rec.gaiText;
      cellF.font = { name: 'Times New Roman', size: 12, bold: false, color: { argb: 'FF7030A0' } };

      const cellG = row.getCell(7);
      cellG.value = rec.hegaiText;
      cellG.font = { name: 'Times New Roman', size: 16, bold: true, color: { argb: 'FFC00000' } };

      const cellI = row.getCell(9);
      cellI.value = rec.v1;
      cellI.font = { name: 'Times New Roman', size: 12, bold: false, color: { argb: 'FF7030A0' } };

      const cellJ = row.getCell(10);
      cellJ.value = rec.v2;
      cellJ.font = { name: 'Times New Roman', size: 12, bold: false, color: { argb: 'FF7030A0' } };

      const cellK = row.getCell(11);
      cellK.value = { formula: `0.3*I${rowNum}+0.7*J${rowNum}`, result: rec.finalScore };
      cellK.font = { name: 'Times New Roman', size: 16, bold: true, color: { argb: 'FFC00000' } };

      for (let col = 1; col <= 11; col++) {
        const c = row.getCell(col);
        c.border = mediumBorder;
        c.alignment = { horizontal: 'center', vertical: 'middle', wrapText: true };
      }

      // --- 4x4 公分圖片設定 (1 公分約 37.8 像素，4 公分約 151 像素) ---
      const TARGET_PX = 151; 
      const cellH_PX = 255; // 列高 191.25pt 約為 255px
      
      if (rec.img1) {
        const cellW1_PX = 230; // Col A (32.25) 約為 230px
        const fit1 = calculateFitDimensions(rec.img1.width, rec.img1.height, TARGET_PX, TARGET_PX);
        
        // 計算置中偏移
        const offsetX1 = ((cellW1_PX - fit1.width) / 2) / cellW1_PX;
        const offsetY1 = ((cellH_PX - fit1.height) / 2) / cellH_PX;

        const imgId1 = workbook.addImage({ base64: rec.img1.base64, extension: rec.img1.ext });
        sheet.addImage(imgId1, {
          tl: { col: 0 + offsetX1, row: (rowNum - 1) + offsetY1 },
          ext: { width: fit1.width, height: fit1.height },
          editAs: 'oneCell' // 確保圖片跟隨儲存格
        });
      }

      if (rec.img2) {
        const cellW2_PX = 188; // Col H (26.25) 約為 188px
        const fit2 = calculateFitDimensions(rec.img2.width, rec.img2.height, TARGET_PX, TARGET_PX);
        
        // 計算置中偏移
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

    // 每一列的高度設定
    sheet.eachRow((row, rowNumber) => {
      if (rowNumber === 1) {
        row.height = 47;
      } else {
        row.height = 191.25;
      }
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