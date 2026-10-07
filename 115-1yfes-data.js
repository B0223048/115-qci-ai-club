// ==========================================
// 【每週維護區】：在 homeworkDrive 貼上你的 Google Drive 作業夾網址！
// ==========================================
const WEEKS_DATA = [
  {
    week: 1,
    date: '2026 年 9 月 16 日',
    companionLesson: '本週任務：3年級 下晡的點心',
    homeworkDrive: 'https://drive.google.com/drive/folders/1UaOzdNGhYsl-3kBFgWowx6hhQF_eiHBp?usp=drive_link',
    preSurvey: 'https://docs.google.com/forms/d/e/1FAIpQLSeLpSYxC_3L7kbQJXTCNplTduvZSJlr95Bjzb5w6u0qDYPzqw/viewform?usp=dialog',
    postSurvey: 'https://docs.google.com/forms/d/e/1FAIpQLSd7RFL2USTPD1BXtf2QKcnjXUKfmlGdqfAERE37mTeedw_UvA/viewform?usp=dialog',
    showDataTool: true,
  },
  {
    week: 2,
    date: '2026 年 9 月 23 日',
    companionLesson: '本週任務：3年級 露營',
    homeworkDrive: 'https://drive.google.com/drive/folders/1ldmw_vvUf37AqPLKu_ZZO6ccZCAU6hSj?usp=drive_link',
    preSurvey: 'https://docs.google.com/forms/d/e/1FAIpQLSeb_jr16HpbhQGFL4Isc9aRl6y7w9S2Zh6e0QGlf_zh1ScQNw/viewform?usp=dialog',
    postSurvey: 'https://docs.google.com/forms/d/e/1FAIpQLSdOXNa9YumwsABAJ58MrkpAIe_om3pyoMc9iOxPNqO1tvCjxg/viewform?usp=dialog',
    showDataTool: true,
    videos: [
      { title: '模糊集合及其應用', desc: '機器學習生活應用 (張智星教授)', url: 'https://youtu.be/yAuwRxo4e7Y?si=CB6eR0npMz_6q1mO', btnText: '觀看影片' }
    ]
  },
  {
    week: 3,
    date: '2026 年 9 月 30 日',
    companionLesson: '本週任務：3年級 去旅行',
    homeworkDrive: 'https://drive.google.com/drive/folders/1oi5Y6zWq_R8UsBNSx92_x-v9LEFY0CxI?usp=drive_link',
    preSurvey: 'https://docs.google.com/forms/d/e/1FAIpQLSfxsRZjsYdE19FDgI6ViijjTJhSQUOL8zufS_N4bcVZPSS0Lw/viewform?usp=dialog',
    postSurvey: 'https://docs.google.com/forms/d/e/1FAIpQLScGC3WQt1qfKJkJKWJVRrmuCzN1DfII3PXIU27YCrWQLwPXPQ/viewform?usp=dialog',
    showDataTool: true,
  },
    {
    week: 4,
    date: '2026 年 10 月 7 日',
    homeworkDrive: '#',
    preSurvey: 'https://docs.google.com/forms/d/e/1FAIpQLSdnbpg_VsSSHFb5NT2Zlj9DEMoqGtsbdLwDaG7IH9F-hQ1spw/viewform?usp=dialog',
    postSurvey: 'https://docs.google.com/forms/d/e/1FAIpQLSfi9muzZksURqqTQ4Q8VYEEllM1rHc-mXy-AsfHfh5n9rZBcQ/viewform?usp=dialog',
    showDataTool: true,
    videos: [
      { title: '10272025-南大TAIDE大型語言模型台英語對話機器人對話 (TAIDE 70B + RAG)', desc: '', url: 'https://youtu.be/a1sEcMhc4OI' },
      { title: '11242023-設計女媧實驗室積木派發至Kebbi Air 機器人 @ 臺南市仁德國小資訊課(No. 2) ', desc: '', url: 'https://youtu.be/QWmzoRRiJt0' },

    ],
    apps: [
      { title: '南大台英語 TAIDE 聊天AI機器人', desc: '練習提示詞體驗', url: 'https://kws.oaselab.org/llama-chat/' },
{ title: 'Goolge Gemini', desc: '練習提示詞體驗', url: 'https://gemini.google.com/app?hl=zh-TW' },
      { title: '女媧實驗室', desc: '積木程式應用', url: 'https://codelab.nuwarobotics.com/koding/file' },
      { title: '女媧實驗室積木程式應用範例', desc: '於雲端硬碟下載範例於女媧實驗室使用', url: 'https://drive.google.com/file/d/1kyiLmCLjNWoFOoOBsHI3G8zEv-jNstMI/view?usp=sharing' },
    ]
  },
];