const dayjs = require('dayjs');

const now = dayjs();

const chats = [
  {
    id: 'chat-harbor-crew',
    name: 'Harbor Crew',
    avatar: 'https://i.pravatar.cc/100?img=24',
    subtitle: 'Dockside reopens at dawn. See you all there.',
    updatedAt: now.subtract(2, 'minute').toISOString(),
    unreadCount: 3,
    muted: false,
    pinned: true,
    type: 'group',
    participants: ['Iris Vega', 'Milo Park', 'Zara Bloom', 'Kai Rowan']
  },
  {
    id: 'chat-luna',
    name: 'Luna Rivera',
    avatar: 'https://i.pravatar.cc/100?img=23',
    subtitle: 'Uploaded the design mock. Thoughts?',
    updatedAt: now.subtract(12, 'minute').toISOString(),
    unreadCount: 0,
    muted: false,
    pinned: false,
    type: 'single',
    participants: ['Iris Vega', 'Luna Rivera']
  },
  {
    id: 'chat-nimbus-lab',
    name: 'Nimbus Lab',
    avatar: 'https://i.pravatar.cc/100?img=45',
    subtitle: 'Sprint retro slides are ready.',
    updatedAt: now.subtract(1, 'hour').toISOString(),
    unreadCount: 0,
    muted: true,
    pinned: false,
    type: 'group',
    participants: ['Iris Vega', 'Nimbus Lab Bot']
  },
  {
    id: 'chat-echo-podcast',
    name: 'Echo Podcast',
    avatar: 'https://i.pravatar.cc/100?img=53',
    subtitle: 'Episode 18 teaser is live!',
    updatedAt: now.subtract(3, 'hour').toISOString(),
    unreadCount: 2,
    muted: false,
    pinned: false,
    type: 'group',
    participants: ['Iris Vega', 'Echo Podcast']
  },
  {
    id: 'chat-maple-coffee',
    name: 'Maple Coffee',
    avatar: 'https://i.pravatar.cc/100?img=8',
    subtitle: 'Bean sampler shipped this morning.',
    updatedAt: now.subtract(1, 'day').toISOString(),
    unreadCount: 0,
    muted: true,
    pinned: false,
    type: 'service',
    participants: ['Iris Vega', 'Maple Coffee Bot']
  },
  {
    id: 'chat-sketch-club',
    name: 'Sketch Club',
    avatar: 'https://i.pravatar.cc/100?img=37',
    subtitle: 'Tonight: urban sketching at the pier.',
    updatedAt: now.subtract(2, 'day').toISOString(),
    unreadCount: 5,
    muted: false,
    pinned: false,
    type: 'group',
    participants: ['Iris Vega', 'Sketch Club', 'Nola Drift']
  },
  {
    id: 'chat-aurora',
    name: 'Aurora Chen',
    avatar: 'https://i.pravatar.cc/100?img=15',
    subtitle: 'Can you review the grant letter?',
    updatedAt: now.subtract(3, 'day').toISOString(),
    unreadCount: 0,
    muted: false,
    pinned: false,
    type: 'single',
    participants: ['Iris Vega', 'Aurora Chen']
  },
  {
    id: 'chat-kinoko-studio',
    name: 'Kinoko Studio',
    avatar: 'https://i.pravatar.cc/100?img=19',
    subtitle: 'Your order #L928 is ready.',
    updatedAt: now.subtract(4, 'day').toISOString(),
    unreadCount: 0,
    muted: true,
    pinned: false,
    type: 'service',
    participants: ['Iris Vega', 'Kinoko Studio Concierge']
  }
];

const chatMessages = {
  'chat-harbor-crew': [
    {
      id: 'msg-harbor-1',
      sender: 'Iris Vega',
      senderId: 'user-self',
      text: 'Morning team, tide charts look friendly tomorrow.',
      timestamp: now.subtract(3, 'minute').toISOString()
    },
    {
      id: 'msg-harbor-2',
      sender: 'Milo Park',
      senderId: 'user-milo',
      text: 'Bringing the lanterns and thermos.',
      timestamp: now.subtract(2, 'minute').toISOString()
    },
    {
      id: 'msg-harbor-3',
      sender: 'Zara Bloom',
      senderId: 'user-zara',
      text: 'Saving spots on the east deck.',
      timestamp: now.subtract(1, 'minute').toISOString()
    }
  ],
  'chat-luna': [
    {
      id: 'msg-luna-1',
      sender: 'Luna Rivera',
      senderId: 'user-luna',
      text: 'Uploaded the design mock. Thoughts?',
      timestamp: now.subtract(12, 'minute').toISOString()
    },
    {
      id: 'msg-luna-2',
      sender: 'Iris Vega',
      senderId: 'user-self',
      text: 'Love the gradients—maybe soften the corner radius?',
      timestamp: now.subtract(8, 'minute').toISOString()
    }
  ],
  'chat-nimbus-lab': [
    {
      id: 'msg-nimbus-1',
      sender: 'Nimbus Lab Bot',
      senderId: 'service-nimbus',
      text: 'Sprint retro slides are ready.',
      timestamp: now.subtract(1, 'hour').toISOString()
    }
  ],
  'chat-echo-podcast': [
    {
      id: 'msg-echo-1',
      sender: 'Echo Podcast',
      senderId: 'service-echo',
      text: 'Episode 18 teaser is live! Tap to listen.',
      timestamp: now.subtract(3, 'hour').toISOString()
    }
  ],
  'chat-maple-coffee': [
    {
      id: 'msg-maple-1',
      sender: 'Maple Coffee',
      senderId: 'service-maple',
      text: 'Bean sampler shipped this morning. Tracking #MC4721.',
      timestamp: now.subtract(1, 'day').toISOString()
    }
  ],
  'chat-sketch-club': [
    {
      id: 'msg-sketch-1',
      sender: 'Sketch Club',
      senderId: 'group-sketch',
      text: 'Tonight: urban sketching at the pier. Bring ink pens!',
      timestamp: now.subtract(2, 'day').toISOString()
    }
  ],
  'chat-aurora': [
    {
      id: 'msg-aurora-1',
      sender: 'Aurora Chen',
      senderId: 'user-aurora',
      text: 'Can you review the grant letter?',
      timestamp: now.subtract(3, 'day').toISOString()
    }
  ],
  'chat-kinoko-studio': [
    {
      id: 'msg-kinoko-1',
      sender: 'Kinoko Studio',
      senderId: 'service-kinoko',
      text: 'Your order #L928 is ready for pickup.',
      timestamp: now.subtract(4, 'day').toISOString()
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
        avatar: 'https://i.pravatar.cc/100?img=15',
        status: '滴滴出行创始人'
      },
      {
        id: 'contact-chen-tianqiao',
        name: '陈天桥',
        avatar: 'https://i.pravatar.cc/100?img=30',
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
        avatar: 'https://i.pravatar.cc/100?img=11',
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
        avatar: 'https://i.pravatar.cc/100?img=17',
        status: '拼多多创始人'
      },
      {
        id: 'contact-he-xiaopeng',
        name: '何小鹏',
        avatar: 'https://i.pravatar.cc/100?img=56',
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
        avatar: 'https://i.pravatar.cc/100?img=4',
        status: '小米科技创始人'
      },
      {
        id: 'contact-li-yanhong',
        name: '李彦宏',
        avatar: 'https://i.pravatar.cc/100?img=28',
        status: '百度创始人'
      },
      {
        id: 'contact-liu-qiangdong',
        name: '刘强东',
        avatar: 'https://i.pravatar.cc/100?img=9',
        status: '京东创始人'
      },
      {
        id: 'contact-luo-yonghao',
        name: '罗永浩',
        avatar: 'https://i.pravatar.cc/100?img=60',
        status: '锤子科技创始人'
      },
      {
        id: 'contact-li-xiang',
        name: '李想',
        avatar: 'https://i.pravatar.cc/100?img=22',
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
        avatar: 'https://i.pravatar.cc/100?img=57',
        status: '阿里巴巴创始人'
      },
      {
        id: 'contact-ma-huateng',
        name: '马化腾',
        avatar: 'https://i.pravatar.cc/100?img=34',
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
        avatar: 'https://i.pravatar.cc/100?img=41',
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
        avatar: 'https://i.pravatar.cc/100?img=45',
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
        avatar: 'https://i.pravatar.cc/100?img=50',
        status: '美团创始人'
      },
      {
        id: 'contact-wang-jianlin',
        name: '王健林',
        avatar: 'https://i.pravatar.cc/100?img=52',
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
        avatar: 'https://i.pravatar.cc/100?img=61',
        status: '新东方创始人'
      },
      {
        id: 'contact-yao-jinbo',
        name: '姚劲波',
        avatar: 'https://i.pravatar.cc/100?img=63',
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
        avatar: 'https://i.pravatar.cc/100?img=70',
        status: '字节跳动创始人'
      },
      {
        id: 'contact-zhou-hongyi',
        name: '周鸿祎',
        avatar: 'https://i.pravatar.cc/100?img=72',
        status: '360创始人'
      },
      {
        id: 'contact-zhang-xiaolong',
        name: '张小龙',
        avatar: 'https://i.pravatar.cc/100?img=74',
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
