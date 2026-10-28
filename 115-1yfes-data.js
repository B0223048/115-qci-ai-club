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
    showDataTool: false,
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
      {
    week: 5,
    date: '2026 年 10 月 14 日',
    homeworkDrive: '#',
    preSurvey: 'https://docs.google.com/forms/d/e/1FAIpQLSdUIJR1qYt0sPDgTUDvxo8EtqnUf6EskaqOMJ3w0Lh6yIOTIQ/viewform?usp=dialog',
    postSurvey: 'https://docs.google.com/forms/d/e/1FAIpQLSe7NzDw5Cu21UTCD_4FHNo2i_wRqYmc6x9-Rzg66IjHTfuyIA/viewform?usp=dialog',
    showDataTool: false,
    videos: [
      { title: 'TaiMASU校園學生安全示範影片 @ 臺南市仁德國小', desc: '', url: 'https://www.youtube.com/watch?v=skpASJymA3A' },
      { title: 'TaiMASU 仁德國小場域示範畫面-第一版-1012-2 ', desc: '', url: 'https://www.youtube.com/watch?v=6OwSl-JPwG8' },

    ],
    apps: [
      { title: '長者陪伴機器人', desc: '多模態AI互動體驗', url: 'https://kws.oaselab.org/ai-guardian-nchc/' },
        ]
  },
  {
    week: 6,
    date: '2026 年 10 月 21 日',
    homeworkDrive: '#',
    preSurvey: 'https://docs.google.com/forms/d/e/1FAIpQLSfLK7IByADK7bvezQEB3CTC1XcjCch31xtIeFbyveAbWJtNbg/viewform?usp=dialog',
    postSurvey: 'https://docs.google.com/forms/d/e/1FAIpQLSebIoyoVwbHOPK9Enr2NIYXupJBPYcIeA8toKCFMbLNEFcWIg/viewform',
    showDataTool: false,
    companionLesson: '本週任務：3年級 露營',
    videos: [
      { title: 'QCI Data Model (Hardware)', desc: '', url: 'https://sites.google.com/asap.nutn.edu.tw/ai-fml-international-academy/activities-in-taiwan/activity-2026/mphd-ai-camp/mphd_stage1_2_main' },
      { title: '02242026-Stages III: QCI Inference Model by Chao-Cyuan Yue ', desc: '', url: 'https://youtu.be/TjavobkMQsk?si=yY0z7mrFOlhYqFJc&t=104' },

    ],
    apps: [
      { title: '透過MQTT串接硬體學習工具與QCI&AI平台', desc: '前往QCI&AI平台', url: 'https://kws.oaselab.org/qciai/' },
      { title: '下載CI模型', desc: 'QCI & AI 平台', url: 'https://drive.google.com/file/d/1j8w4kGbYBAghsTsszwMvum6WuTtrqYXi/view' },
      { title: '台英慧', desc: '虛擬人物互動', url: 'https://kws.oaselab.org/t-alice-v2/' },
      { title: 'Thonny', desc: '下載編譯器', url: 'https://thonny.org/' },      
          ]
  },
    {
    week: 7,
    date: '2026 年 10 月 28 日',
    homeworkDrive: 'https://drive.google.com/drive/folders/1GiTFKTvfriDOtd35jOQc4WubpCSQ0tT0?usp=sharing',
    preSurvey: 'https://docs.google.com/forms/d/e/1FAIpQLSf2CAFuptuSE_U4nrfRqL4LBBj-a42SQoqCsrH_7JCiT9fx4g/viewform?usp=dialog',
    postSurvey: 'https://docs.google.com/forms/d/e/1FAIpQLScFaGsJ80MXDYnzRuEoc0dezVWrh3wNO5NetQeYaN9pSJTymg/viewform?usp=dialog',
    showDataTool: true,
    companionLesson: '本週任務：4年級 辦桌/4年級 便利商店',
    videos: [
      { title: '02242026-Stages IV: QCI Fine-Tuned Model by Chao-Cyuan Yue Part. 2', desc: '', url: 'https://www.youtube.com/watch?v=uL4gNwHdDGQ' },
      { title: 'AI-FML人機共學機器學習-第四單元 ', desc: '', url: 'https://sites.google.com/asap.nutn.edu.tw/ai-fml-international-academy/ai-fml-online-class/%E7%AC%AC%E5%9B%9B%E5%96%AE%E5%85%83' },
      { title: 'Stages IV to V: 微調模型及體驗量子模糊推論 ', desc: '', url: 'https://sites.google.com/asap.nutn.edu.tw/ai-fml-international-academy/activities-in-taiwan/activity-2026/mphd-ai-camp/stages-iv-to-v' },

    ],
    apps: [
      { title: 'QCI&AI平台', desc: '微調模型訓練', url: 'https://kws.oaselab.org/qciai/' },
      { title: '下載CI模型', desc: 'QCI & AI 平台', url: 'https://drive.google.com/file/d/1j8w4kGbYBAghsTsszwMvum6WuTtrqYXi/view' },
      { title: '下載CI訓練資料', desc: 'QCI & AI 平台', url: 'https://docs.google.com/spreadsheets/d/1Mui-srb75_gPsaMrKV-DyeLmN8kMYr8W/edit?gid=2020816129#gid=2020816129' },
      { title: '全國AI專題競賽-Quantum AI 體驗應用組', desc: '歡迎有興趣同學報名參加', url: 'https://sites.google.com/asap.nutn.edu.tw/2026quantumai/home' },

          ]
  },
];