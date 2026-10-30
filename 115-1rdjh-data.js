// ==========================================
// 仁德國中 115-1 課程資料庫
// ==========================================
const WEEKS_DATA = [
  {
    week: 1,
    date: '2026 年 9 月 4 日',
    preSurvey: 'https://docs.google.com/forms/d/e/1FAIpQLScILzGeHkSZcE_5597TlPxjVD4cW0s7Ed84goCEBfBUFf7YUQ/viewform?usp=dialog',
    postSurvey: '#', 
    apps: [
      { title: '台英日語AI人機共學系統', desc: '說日語學台語', url: 'https://kws.oaselab.org/nutntweng/japanese/', btnText: '前往網站' }
    ]
  },
  {
    week: 2,
    date: '2026 年 9 月 11 日',
    preSurvey: 'https://docs.google.com/forms/d/e/1FAIpQLSeOdsMh7xnw0xPeUvDZGFjEOWv8prWg1EbqHOpfxoTnTWF3Mg/viewform?usp=dialog',
    postSurvey: 'https://docs.google.com/forms/d/e/1FAIpQLSepf1FYNAS71J3_AB7GJPj8fgxG06oFXRcIYoIeOmXui3cSUg/viewform?usp=dialog',
    companionLesson: '本週任務：5年級 線頂買賣',
    showDataTool: true
  },
  {
    week: 3,
    date: '2026 年 9 月 18 日',
    preSurvey: 'https://docs.google.com/forms/d/e/1FAIpQLScHzLzD7rLX_4-LneQAygGsdtlm8V6pm3wVvy_T-HKX6rklYg/viewform?usp=dialog',
    postSurvey: 'https://docs.google.com/forms/d/e/1FAIpQLSeRG6IF6jfAc50Vaf62EH_UdGwFVK-dF0yePLuiEGvjlTIEWA/viewform?usp=dialog',
    companionLesson: '本週任務：5年級 過年',
    showDataTool: true,
    videos: [
      { title: '模糊集合及其應用', desc: '機器學習生活應用 (張智星教授)', url: 'https://youtu.be/yAuwRxo4e7Y?si=CB6eR0npMz_6q1mO', btnText: '觀看影片' }
    ]
  },
  {
    week: 4,
    date: '2026 年 10 月 2 日',
    preSurvey: 'https://docs.google.com/forms/d/e/1FAIpQLSc2k64NZ7Zkh92H1eZ6CTklfZmK_5kX-tpbl-YtPH14Zl1hEQ/viewform?usp=dialog',
    postSurvey: 'https://docs.google.com/forms/d/e/1FAIpQLSfoKjCNQDsf2yEmggGIaryoV6sS_PoMXLvGOhVGjyKqJPlPFQ/viewform?usp=dialog',
    videos: [
      { title: '國產生成式AI對話引擎 TAIDE', desc: '可用台語、客語回應要求｜公視晚間新聞', url: 'https://www.youtube.com/watch?v=5-0wXYhpZBU', btnText: '觀看公視報導' },
      { title: '搞懂「提示工程」', desc: '為什麼別人家的 ChatGPT 這麼聰明？成為專業 AI 溝通師', url: 'https://www.youtube.com/watch?v=d33gWFRZnas', btnText: '觀看提示詞教學' }
    ],
    companionLesson: '本週任務：5年級 地震',
    showDataTool: true,
    apps: [
      { title: '南大台英語 TAIDE 聊天機器人', desc: '練習提示詞體驗', url: 'https://kws.oaselab.org/llama-chat/', btnText: '開始練習提示詞' },

    ]
  },
  {
    week: 5,
    date: '2026 年 10 月 16 日',
    preSurvey: 'https://docs.google.com/forms/d/e/1FAIpQLSds8wf1yXaLD0Dgo1cUlP1xdhdbTwkm_MTD5FXv6RxwShBKKg/viewform?usp=dialog', 
    postSurvey: 'https://docs.google.com/forms/d/e/1FAIpQLSdU0XEPcLvpnDxx9UeHiD09b6f3rbAgX87bNyOYT1KJK6eZDw/viewform?usp=dialog',
    videos: [
      { title: '08232022-CI&AI-FML Metaverse課程(單元2-2) ', desc: '', url: 'https://youtu.be/799_LxL914M?si=5imglm7uEulWgDxu', btnText: '觀看影片 I' },
      { title: '11242023-設計女媧實驗室積木派發至Kebbi Air機器人@臺南市仁德國小資訊課(No. 2)', desc: '', url: 'https://youtu.be/QWmzoRRiJt0', btnText: '觀看影片 I' },
    ],
    apps: [

      { title: '女媧實驗室', desc: '積木程式應用', url: 'https://codelab.nuwarobotics.com/koding/file' },
      { title: '女媧實驗室積木程式應用範例', desc: '於雲端硬碟下載範例於女媧實驗室使用', url: 'https://drive.google.com/file/d/1hOlTZfczusZax65su6pNVhjG-b9T1xI6/view?usp=sharing' },

      { title: 'QCI & AI 平台', desc: '前往QCI&AI平台', url: 'https://kws.oaselab.org/qciai/' },
      { title: '下載CI模型', desc: 'QCI & AI 平台', url: 'https://drive.google.com/file/d/1j8w4kGbYBAghsTsszwMvum6WuTtrqYXi/view' },
      { title: '下載推論資料', desc: 'QCI & AI 平台', url: 'https://docs.google.com/spreadsheets/d/12jxszVbwmQpCAFFqYltZPKQu6mhqJRS9/edit?gid=991754063#gid=991754063' },
    ]
  },
   {
    week: 6,
    date: '2026 年 10 月 30 日',
    preSurvey: 'https://docs.google.com/forms/d/e/1FAIpQLSe_7W9wVBZEwt6RpnWIQtXH8mLTPDC6yREacdJJn5OWa1DJXw/viewform?usp=dialog', 
    postSurvey: 'https://docs.google.com/forms/d/e/1FAIpQLScGGkzD0pjYs-iyfsMe2SeflZzem1p3OSlwBYh7ajL8GC_TbA/viewform?usp=dialog',
    companionLesson: '本週任務：5年級 線頂買賣',
    showDataTool: true,
    videos: [
      { title: 'QCI Data Model (Hardware)', desc: '', url: 'https://sites.google.com/asap.nutn.edu.tw/ai-fml-international-academy/activities-in-taiwan/activity-2026/mphd-ai-camp/mphd_stage1_2_main' },
      { title: '02242026-Stages III: QCI Inference Model by Chao-Cyuan Yue ', desc: '', url: 'https://youtu.be/TjavobkMQsk?si=yY0z7mrFOlhYqFJc&t=104' },

    ],
    apps: [
      { title: 'QCI & AI 平台', desc: '前往 QCI&AI 平台', url: 'https://kws.oaselab.org/qciai/' },
      { title: '下載CI模型', desc: '用於 QCI & AI 平台', url: 'https://drive.google.com/file/d/1j8w4kGbYBAghsTsszwMvum6WuTtrqYXi/view' },
      { title: '台英慧', desc: '虛擬人物互動', url: 'https://kws.oaselab.org/t-alice-v2/' },
      { title: 'Thonny', desc: '下載編譯器', url: 'https://thonny.org/' },
      { title: '全國AI專題競賽-Quantum AI 體驗應用組', desc: '歡迎有興趣同學報名參加', url: 'https://sites.google.com/asap.nutn.edu.tw/2026quantumai/home' },
    ]
  },
/*    {
    week: '6a',
    date: '2026 年 10 月 30 日',
    preSurvey: 'https://docs.google.com/forms/d/e/1FAIpQLSetTnXS0IJLvl-ucEnNRpX70pPba0hMy642QdiydAShGLw6dQ/viewform?usp=dialog', 
    postSurvey: 'https://docs.google.com/forms/d/e/1FAIpQLSf1eAFrzfUcSRMBkg7Eeo3xX9ph5goE2y8HpK2uECLN-h7TdQ/viewform?usp=dialog',
    companionLesson: '本週任務：5年級 線頂買賣',
    showDataTool: true,
    videos: [
      { title: '臺南大學、遊戲公司合作 研發AI虛擬機器人 | 公視台語台 | 20241024', desc: '', url: 'https://youtu.be/gF3bSUDE_SQ'},
      { title: '10292026- 智慧陪伴機器人展示測試(使用義隆電子網路攝影機 - No. 4)', desc: '', url: 'https://youtu.be/OaCIRbtmhy0' },
      { title: '11202024_台英慧環遊台灣品論地方小吃 by Yu-Hsiang Lee (Version 1-No. 1)', desc: '', url: 'https://www.youtube.com/watch?v=R5gDe5l9YKI&list=PLVf2n3pM4O3FO8c5ysLJnEmse61sAhB5c' },
    ],
    apps: [
      { title: '台英慧', desc: '虛擬人物互動', url: 'https://kws.oaselab.org/t-alice-v2/' },
      { title: '長者陪伴機器人', desc: '多模態AI互動體驗', url: 'https://kws.oaselab.org/ai-guardian-nchc/' },
      { title: '智慧型陪伴機器人', desc: '多模態AI互動體驗', url: 'https://kws.oaselab.org/ai-guardian/' },
      { title: '全國AI專題競賽-Quantum AI 體驗應用組', desc: '歡迎有興趣同學報名參加', url: 'https://sites.google.com/asap.nutn.edu.tw/2026quantumai/home' },
    ],
  },*/
];
