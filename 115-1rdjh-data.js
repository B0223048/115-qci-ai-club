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
      { title: '11242023-設計女媧實驗室積木派發至Kebbi Air機器人@臺南市仁德國小資訊課(No. 2)', desc: '', url: 'https://youtu.be/QWmzoRRiJt0', btnText: '觀看影片 I' },
      { title: '08232022-CI&AI-FML Metaverse課程(單元2-2)', desc: '', url: 'https://youtu.be/799_LxL914M?si=5imglm7uEulWgDxu', btnText: '' },
  
    ],
    apps: [
      { title: '女媧實驗室', desc: '積木程式應用', url: 'https://codelab.nuwarobotics.com/koding/file' },
      { title: '女媧實驗室積木程式應用範例', desc: '於雲端硬碟下載範例於女媧實驗室使用', url: 'https://drive.google.com/file/d/1hOlTZfczusZax65su6pNVhjG-b9T1xI6/view?usp=sharing' },
      { title: 'QCI & AI-FML平台', desc: '體驗實作推論模型', url: 'https://kws.oaselab.org/qciai/' },
      { title: 'QCI & AI-FML平台', desc: '下載CI模型', url: 'https://drive.google.com/file/d/1j8w4kGbYBAghsTsszwMvum6WuTtrqYXi/view' },
      { title: 'QCI & AI-FML平台', desc: '下載推論資料', url: 'https://docs.google.com/spreadsheets/d/12jxszVbwmQpCAFFqYltZPKQu6mhqJRS9/edit?gid=991754063#gid=991754063' },
    ]
  }
];
