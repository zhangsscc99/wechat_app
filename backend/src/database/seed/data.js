const dayjs = require('dayjs');

const now = dayjs();

const chats = [
  {
    id: 'chat-tech-leaders',
    name: '互联网大佬群',
    avatar: 'https://i.pravatar.cc/150?img=68',
    subtitle: '马云: 明天早上9点开会讨论新项目',
    updatedAt: now.subtract(2, 'minute').toISOString(),
    unreadCount: 5,
    muted: false,
    pinned: true,
    type: 'group',
    participants: ['我', '马云', '马化腾', '雷军', '刘强东']
  },
  {
    id: 'chat-mayun',
    name: '马云',
    avatar: 'https://i.pravatar.cc/150?img=12',
    subtitle: '下周的阿里云峰会记得参加',
    updatedAt: now.subtract(15, 'minute').toISOString(),
    unreadCount: 0,
    muted: false,
    pinned: false,
    type: 'single',
    participants: ['我', '马云']
  },
  {
    id: 'chat-mahuateng',
    name: '马化腾',
    avatar: 'https://i.pravatar.cc/150?img=13',
    subtitle: '微信生态的新功能要不要了解一下？',
    updatedAt: now.subtract(1, 'hour').toISOString(),
    unreadCount: 0,
    muted: true,
    pinned: false,
    type: 'single',
    participants: ['我', '马化腾']
  },
  {
    id: 'chat-leijun',
    name: '雷军',
    avatar: 'https://i.pravatar.cc/150?img=14',
    subtitle: '小米14 Pro已经发布了，你觉得怎么样？',
    updatedAt: now.subtract(3, 'hour').toISOString(),
    unreadCount: 2,
    muted: false,
    pinned: false,
    type: 'single',
    participants: ['我', '雷军']
  },
  {
    id: 'chat-liuqiangdong',
    name: '刘强东',
    avatar: 'https://i.pravatar.cc/150?img=15',
    subtitle: '京东物流的效率又提升了',
    updatedAt: now.subtract(1, 'day').toISOString(),
    unreadCount: 0,
    muted: true,
    pinned: false,
    type: 'single',
    participants: ['我', '刘强东']
  },
  {
    id: 'chat-zhangyiming',
    name: '张一鸣',
    avatar: 'https://i.pravatar.cc/150?img=33',
    subtitle: '抖音的新算法上线了，效果不错',
    updatedAt: now.subtract(2, 'day').toISOString(),
    unreadCount: 3,
    muted: false,
    pinned: false,
    type: 'single',
    participants: ['我', '张一鸣']
  },
  {
    id: 'chat-huangzheng',
    name: '黄峥',
    avatar: 'https://i.pravatar.cc/150?img=59',
    subtitle: '拼多多Q3财报出来了，超预期',
    updatedAt: now.subtract(3, 'day').toISOString(),
    unreadCount: 0,
    muted: false,
    pinned: false,
    type: 'single',
    participants: ['我', '黄峥']
  },
  {
    id: 'chat-dinglei',
    name: '丁磊',
    avatar: 'https://i.pravatar.cc/150?img=60',
    subtitle: '网易云音乐会员送你一个',
    updatedAt: now.subtract(4, 'day').toISOString(),
    unreadCount: 0,
    muted: true,
    pinned: false,
    type: 'single',
    participants: ['我', '丁磊']
  },
  {
    id: 'chat-wangxing',
    name: '王兴',
    avatar: 'https://i.pravatar.cc/150?img=61',
    subtitle: '美团外卖的即时配送又快了10分钟',
    updatedAt: now.subtract(5, 'day').toISOString(),
    unreadCount: 1,
    muted: false,
    pinned: false,
    type: 'single',
    participants: ['我', '王兴']
  },
  {
    id: 'chat-liyanhong',
    name: '李彦宏',
    avatar: 'https://i.pravatar.cc/150?img=62',
    subtitle: '百度AI的新进展想跟你聊聊',
    updatedAt: now.subtract(6, 'day').toISOString(),
    unreadCount: 0,
    muted: false,
    pinned: false,
    type: 'single',
    participants: ['我', '李彦宏']
  }
];

const chatMessages = {
  'chat-tech-leaders': [
    {
      id: 'msg-group-1',
      sender: '雷军',
      senderId: 'user-leijun',
      text: '大家好，小米汽车的销量突破10万台了！',
      timestamp: now.subtract(5, 'minute').toISOString()
    },
    {
      id: 'msg-group-2',
      sender: '马化腾',
      senderId: 'user-mahuateng',
      text: '恭喜恭喜！微信也准备推出新功能支持智能汽车',
      timestamp: now.subtract(4, 'minute').toISOString()
    },
    {
      id: 'msg-group-3',
      sender: '刘强东',
      senderId: 'user-liuqiangdong',
      text: '京东物流可以帮忙配送汽车配件',
      timestamp: now.subtract(3, 'minute').toISOString()
    },
    {
      id: 'msg-group-4',
      sender: '马云',
      senderId: 'user-mayun',
      text: '明天早上9点开会讨论新项目',
      timestamp: now.subtract(2, 'minute').toISOString()
    }
  ],
  'chat-mayun': [
    {
      id: 'msg-mayun-1',
      sender: '马云',
      senderId: 'user-mayun',
      text: '下周的阿里云峰会记得参加',
      timestamp: now.subtract(16, 'minute').toISOString()
    },
    {
      id: 'msg-mayun-2',
      sender: '我',
      senderId: 'user-self',
      text: '好的，我一定到场',
      timestamp: now.subtract(15, 'minute').toISOString()
    }
  ],
  'chat-mahuateng': [
    {
      id: 'msg-mahuateng-1',
      sender: '马化腾',
      senderId: 'user-mahuateng',
      text: '微信生态的新功能要不要了解一下？',
      timestamp: now.subtract(1, 'hour').toISOString()
    }
  ],
  'chat-leijun': [
    {
      id: 'msg-leijun-1',
      sender: '雷军',
      senderId: 'user-leijun',
      text: '小米14 Pro已经发布了，你觉得怎么样？',
      timestamp: now.subtract(4, 'hour').toISOString()
    },
    {
      id: 'msg-leijun-2',
      sender: '我',
      senderId: 'user-self',
      text: '拍照效果很赞，续航也不错',
      timestamp: now.subtract(3, 'hour').toISOString()
    }
  ],
  'chat-liuqiangdong': [
    {
      id: 'msg-liuqiangdong-1',
      sender: '刘强东',
      senderId: 'user-liuqiangdong',
      text: '京东物流的效率又提升了',
      timestamp: now.subtract(1, 'day').toISOString()
    }
  ],
  'chat-zhangyiming': [
    {
      id: 'msg-zhangyiming-1',
      sender: '张一鸣',
      senderId: 'user-zhangyiming',
      text: '抖音的新算法上线了，效果不错',
      timestamp: now.subtract(2, 'day').toISOString()
    }
  ],
  'chat-huangzheng': [
    {
      id: 'msg-huangzheng-1',
      sender: '黄峥',
      senderId: 'user-huangzheng',
      text: '拼多多Q3财报出来了，超预期',
      timestamp: now.subtract(3, 'day').toISOString()
    }
  ],
  'chat-dinglei': [
    {
      id: 'msg-dinglei-1',
      sender: '丁磊',
      senderId: 'user-dinglei',
      text: '网易云音乐会员送你一个',
      timestamp: now.subtract(4, 'day').toISOString()
    }
  ],
  'chat-wangxing': [
    {
      id: 'msg-wangxing-1',
      sender: '王兴',
      senderId: 'user-wangxing',
      text: '美团外卖的即时配送又快了10分钟',
      timestamp: now.subtract(5, 'day').toISOString()
    }
  ],
  'chat-liyanhong': [
    {
      id: 'msg-liyanhong-1',
      sender: '李彦宏',
      senderId: 'user-liyanhong',
      text: '百度AI的新进展想跟你聊聊',
      timestamp: now.subtract(6, 'day').toISOString()
    }
  ]
};

const contactShortcuts = [
  {
    id: 'new-friends',
    icon: 'user-plus',
    label: '新的朋友'
  },
  {
    id: 'chat-only',
    icon: 'chat-only',
    label: '仅聊天的朋友'
  },
  {
    id: 'groups',
    icon: 'group-chat',
    label: '群聊'
  },
  {
    id: 'tags',
    icon: 'tag',
    label: '标签'
  },
  {
    id: 'official',
    icon: 'official',
    label: '公众号'
  },
  {
    id: 'services',
    icon: 'service',
    label: '服务号'
  }
];

const contactSections = [
  {
    letter: 'C',
    contacts: [
      {
        id: 'contact-cheng-wei',
        name: '程维',
        avatar: 'https://i.pravatar.cc/150?img=51',
        status: '滴滴出行创始人'
      },
      {
        id: 'contact-chen-tianqiao',
        name: '陈天桥',
        avatar: 'https://i.pravatar.cc/150?img=52',
        status: '盛大网络创始人'
      }
    ]
  },
  {
    letter: 'D',
    contacts: [
      {
        id: 'contact-ding-lei',
        name: '丁磊',
        avatar: 'https://i.pravatar.cc/150?img=60',
        status: '网易创始人'
      }
    ]
  },
  {
    letter: 'H',
    contacts: [
      {
        id: 'contact-huang-zheng',
        name: '黄峥',
        avatar: 'https://i.pravatar.cc/150?img=59',
        status: '拼多多创始人'
      },
      {
        id: 'contact-he-xiaopeng',
        name: '何小鹏',
        avatar: 'https://i.pravatar.cc/150?img=58',
        status: '小鹏汽车创始人'
      }
    ]
  },
  {
    letter: 'L',
    contacts: [
      {
        id: 'contact-lei-jun',
        name: '雷军',
        avatar: 'https://i.pravatar.cc/150?img=14',
        status: '小米科技创始人'
      },
      {
        id: 'contact-li-yanhong',
        name: '李彦宏',
        avatar: 'https://i.pravatar.cc/150?img=62',
        status: '百度创始人'
      },
      {
        id: 'contact-liu-qiangdong',
        name: '刘强东',
        avatar: 'https://i.pravatar.cc/150?img=15',
        status: '京东创始人'
      },
      {
        id: 'contact-luo-yonghao',
        name: '罗永浩',
        avatar: 'https://i.pravatar.cc/150?img=56',
        status: '锤子科技创始人'
      },
      {
        id: 'contact-li-xiang',
        name: '李想',
        avatar: 'https://i.pravatar.cc/150?img=57',
        status: '理想汽车创始人'
      }
    ]
  },
  {
    letter: 'M',
    contacts: [
      {
        id: 'contact-ma-yun',
        name: '马云',
        avatar: 'https://i.pravatar.cc/150?img=12',
        status: '阿里巴巴创始人'
      },
      {
        id: 'contact-ma-huateng',
        name: '马化腾',
        avatar: 'https://i.pravatar.cc/150?img=13',
        status: '腾讯创始人'
      }
    ]
  },
  {
    letter: 'P',
    contacts: [
      {
        id: 'contact-pan-shiyi',
        name: '潘石屹',
        avatar: 'https://i.pravatar.cc/150?img=67',
        status: 'SOHO中国创始人'
      }
    ]
  },
  {
    letter: 'S',
    contacts: [
      {
        id: 'contact-shen-nanpeng',
        name: '沈南鹏',
        avatar: 'https://i.pravatar.cc/150?img=66',
        status: '红杉资本创始人'
      }
    ]
  },
  {
    letter: 'W',
    contacts: [
      {
        id: 'contact-wang-xing',
        name: '王兴',
        avatar: 'https://i.pravatar.cc/150?img=61',
        status: '美团创始人'
      },
      {
        id: 'contact-wang-jianlin',
        name: '王健林',
        avatar: 'https://i.pravatar.cc/150?img=65',
        status: '万达集团创始人'
      }
    ]
  },
  {
    letter: 'Y',
    contacts: [
      {
        id: 'contact-yu-minhong',
        name: '俞敏洪',
        avatar: 'https://i.pravatar.cc/150?img=64',
        status: '新东方创始人'
      },
      {
        id: 'contact-yao-jinbo',
        name: '姚劲波',
        avatar: 'https://i.pravatar.cc/150?img=63',
        status: '58同城创始人'
      }
    ]
  },
  {
    letter: 'Z',
    contacts: [
      {
        id: 'contact-zhang-yiming',
        name: '张一鸣',
        avatar: 'https://i.pravatar.cc/150?img=33',
        status: '字节跳动创始人'
      },
      {
        id: 'contact-zhou-hongyi',
        name: '周鸿祎',
        avatar: 'https://i.pravatar.cc/150?img=53',
        status: '360创始人'
      },
      {
        id: 'contact-zhang-xiaolong',
        name: '张小龙',
        avatar: 'https://i.pravatar.cc/150?img=54',
        status: '微信之父'
      }
    ]
  }
];

const discoverItems = [
  {
    id: 'moments',
    title: '朋友圈',
    subtitle: 'Catch new adventures from friends',
    icon: 'moments',
    badge: 2
  },
  {
    id: 'live',
    title: '直播',
    subtitle: 'Nova Ray is live now',
    icon: 'live',
    badge: 1
  },
  {
    id: 'scan',
    title: '扫一扫',
    subtitle: 'Scan QR codes and posters',
    icon: 'scan',
    badge: 0
  },
  {
    id: 'listen',
    title: '听一听',
    subtitle: 'Fresh audio stories tonight',
    icon: 'listen',
    badge: 0
  },
  {
    id: 'games',
    title: '游戏',
    subtitle: 'Challenge friends to Cloud Runner',
    icon: 'games',
    badge: 1
  },
  {
    id: 'mini-apps',
    title: '小程序',
    subtitle: 'Recently used by you',
    icon: 'mini-app',
    badge: 0
  }
];

const profile = {
  user: {
    id: 'user-self',
    name: 'Iris Vega',
    avatar: 'https://i.pravatar.cc/200?img=33',
    cover: 'https://images.unsplash.com/photo-1526402467221-956c11367cd0?auto=format&fit=crop&w=1200&q=60',
    wechatId: 'iris_wander',
    tagline: 'Collecting sea breeze postcards'
  },
  quickActions: [
    { id: 'status', label: '+ 状态' },
    { id: 'friends', label: '朋友', extra: '等7个朋友' }
  ],
  sections: [
    {
      id: 'services',
      title: '服务',
      icon: 'services',
      navigation: true
    },
    {
      id: 'favorites',
      title: '收藏',
      icon: 'favorites',
      navigation: true
    },
    {
      id: 'moments',
      title: '朋友圈',
      icon: 'moments',
      navigation: true
    },
    {
      id: 'orders',
      title: '订单与卡包',
      icon: 'wallet',
      navigation: true
    },
    {
      id: 'stickers',
      title: '表情',
      icon: 'emoji',
      navigation: true
    },
    {
      id: 'settings',
      title: '设置',
      icon: 'settings',
      navigation: true
    }
  ]
};

const moments = [
  {
    id: 'moment-iris',
    author: {
      name: 'Iris Vega',
      avatar: 'https://i.pravatar.cc/100?img=33'
    },
    content: '导师让我写一份潮汐日志，其实挺有意思的。',
    createdAt: now.subtract(21, 'minute').toISOString(),
    replies: [
      {
        id: 'reply-1',
        author: 'Iris Vega',
        text: '等我完成就发你参考。'
      }
    ],
    media: [
      'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=400&q=80',
      'https://images.unsplash.com/photo-1528150177503-b07e0f3c4c8f?auto=format&fit=crop&w=400&q=80'
    ]
  },
  {
    id: 'moment-briana',
    author: {
      name: 'Briana Shore',
      avatar: 'https://i.pravatar.cc/100?img=47'
    },
    content:
      '刚认识了海边牧歌学院的贤艾与贤安导师，好开心。等我度过这周就好好向你请教仪式的奥秘。',
    createdAt: now.subtract(22, 'minute').toISOString(),
    media: [
      'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=400&q=80',
      'https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=400&q=80',
      'https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=400&q=80'
    ]
  },
  {
    id: 'moment-keanu',
    author: {
      name: 'Keanu Frost',
      avatar: 'https://i.pravatar.cc/100?img=31'
    },
    content:
      '刚看完 Alex 的舞台剧 live，能量爆棚！准备写一份观后感分享给大家。',
    createdAt: now.subtract(25, 'minute').toISOString(),
    media: []
  }
];

module.exports = {
  chats,
  chatMessages,
  contactShortcuts,
  contactSections,
  discoverItems,
  profile,
  moments
};
