export interface ServicePrice {
  "<1.5kg": number;
  "1.5-3kg": number;
  "3-5kg": number;
  "5-7kg": number;
  "7-10kg": number;
  "10-15kg": number;
  "15-20kg": number;
  "20-30kg": number;
  duration: string;
}

export interface Service {
  id: number;
  name: string;
  description: string;
  prices: ServicePrice;
  image: string;
}

export interface AdditionalService {
  id: number;
  name: string;
  price: number | string;
  description: string;
}

export interface DyeService {
  id: number;
  name: string;
  description: string;
  regular: {
    under10kg: number;
    "10-15kg": number;
  };
  premium: {
    under10kg: number;
    "10-15kg": number;
  };
}

export interface VIPPackage {
  id: number;
  name: string;
  type: "VIP6" | "VIP10";
  description: string;
  dogPrices: {
    "under5kg": number;
    "5-10kg": number;
    "10-15kg": number;
  };
  catPrices: {
    "under3kg": number;
    "3-6kg": number;
  };
  benefits: string[];
  duration: string;
  image: string;
}

export const mainServices: Service[] = [
  {
    id: 1,
    name: "Tắm + Vệ sinh (Lông Ngắn)",
    description: "Tắm và vệ sinh cho thú cưng lông ngắn",
    prices: {
      "<1.5kg": 70000,
      "1.5-3kg": 90000,
      "3-5kg": 110000,
      "5-7kg": 140000,
      "7-10kg": 180000,
      "10-15kg": 230000,
      "15-20kg": 280000,
      "20-30kg": 360000,
      duration: "30p - 1h"
    },
    image: "https://images.unsplash.com/photo-1730403257848-a38a393f1b60?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjdXRlJTIwZG9nJTIwZ3Jvb21pbmclMjBzYWxvbnxlbnwxfHx8fDE3NzM3MzkwMzd8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
  },
  {
    id: 2,
    name: "Tắm + VS (Lông dài)",
    description: "Tắm và vệ sinh cho thú cưng lông dài",
    prices: {
      "<1.5kg": 80000,
      "1.5-3kg": 110000,
      "3-5kg": 130000,
      "5-7kg": 160000,
      "7-10kg": 210000,
      "10-15kg": 260000,
      "15-20kg": 330000,
      "20-30kg": 400000,
      duration: "30p - 1.5h"
    },
    image: "https://images.unsplash.com/photo-1760449405897-db4e78473ff9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYXQlMjBncm9vbWluZyUyMHNlcnZpY2V8ZW58MXx8fHwxNzczNzY0ODY3fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
  },
  {
    id: 3,
    name: "Cạo lông toàn thân",
    description: "Dịch vụ cạo lông toàn thân cho thú cưng",
    prices: {
      "<1.5kg": 90000,
      "1.5-3kg": 100000,
      "3-5kg": 120000,
      "5-7kg": 140000,
      "7-10kg": 150000,
      "10-15kg": 160000,
      "15-20kg": 170000,
      "20-30kg": 180000,
      duration: "30p - 1h"
    },
    image: "https://images.unsplash.com/photo-1635717850365-b2f7de8f61e5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwZXQlMjBzcGElMjB0cmVhdG1lbnR8ZW58MXx8fHwxNzczNzY0ODY3fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
  },
  {
    id: 4,
    name: "SPA Cắt tỉa 1",
    description: "Gói spa cắt tỉa cơ bản",
    prices: {
      "<1.5kg": 180000,
      "1.5-3kg": 230000,
      "3-5kg": 260000,
      "5-7kg": 310000,
      "7-10kg": 360000,
      "10-15kg": 420000,
      "15-20kg": 490000,
      "20-30kg": 560000,
      duration: "2h - 3.5h"
    },
    image: "https://images.unsplash.com/photo-1730403257848-a38a393f1b60?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjdXRlJTIwZG9nJTIwZ3Jvb21pbmclMjBzYWxvbnxlbnwxfHx8fDE3NzM3MzkwMzd8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
  },
  {
    id: 5,
    name: "SPA Cắt tỉa 2",
    description: "Gói spa cắt tỉa cao cấp",
    prices: {
      "<1.5kg": 220000,
      "1.5-3kg": 260000,
      "3-5kg": 300000,
      "5-7kg": 350000,
      "7-10kg": 410000,
      "10-15kg": 470000,
      "15-20kg": 530000,
      "20-30kg": 590000,
      duration: "3h - 4h"
    },
    image: "https://images.unsplash.com/photo-1635717850365-b2f7de8f61e5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwZXQlMjBzcGElMjB0cmVhdG1lbnR8ZW58MXx8fHwxNzczNzY0ODY3fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
  },
  {
    id: 6,
    name: "SPA Cắt tỉa 3",
    description: "Gói spa cắt tỉa cao cấp nhất",
    prices: {
      "<1.5kg": 250000,
      "1.5-3kg": 290000,
      "3-5kg": 330000,
      "5-7kg": 380000,
      "7-10kg": 450000,
      "10-15kg": 510000,
      "15-20kg": 570000,
      "20-30kg": 630000,
      duration: "3.5h - 5h"
    },
    image: "https://images.unsplash.com/photo-1730403257848-a38a393f1b60?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjdXRlJTIwZG9nJTIwZ3Jvb21pbmclMjBzYWxvbnxlbnwxfHx8fDE3NzM3MzkwMzd8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
  }
];

export const additionalServices: AdditionalService[] = [
  {
    id: 1,
    name: "Tắm nấm hoặc trị bọ",
    price: 40000,
    description: "Điều trị nấm và ve rận chuyên sâu"
  },
  {
    id: 2,
    name: "Phụ phí chó mèo hung dữ",
    price: 20000,
    description: "Chi phí bảo đảm an toàn"
  },
  {
    id: 3,
    name: "Gỡ rối lông (Tẩy thuốc tê)",
    price: 20000,
    description: "Gỡ rối và làm mềm lông"
  },
  {
    id: 4,
    name: "Vệ sinh tai",
    price: 30000,
    description: "Vệ sinh tai chuyên sâu"
  },
  {
    id: 5,
    name: "Bấm móng chân",
    price: 25000,
    description: "Cắt tỉa móng chuyên nghiệp"
  },
  {
    id: 6,
    name: "Nhuộm móng",
    price: 50000,
    description: "Nhuộm móng đủ màu sắc"
  },
  {
    id: 7,
    name: "Đánh răng",
    price: 35000,
    description: "Vệ sinh răng miệng"
  },
  {
    id: 8,
    name: "Massage thư giãn",
    price: 100000,
    description: "Massage toàn thân 30 phút"
  },
  {
    id: 9,
    name: "Tắm khô (không nước)",
    price: 80000,
    description: "Tắm khô cho thú cưng không thích nước"
  }
];

export const dyeServices: DyeService[] = [
  {
    id: 1,
    name: "2 tai",
    description: "Nhuộm 2 tai",
    regular: {
      under10kg: 90000,
      "10-15kg": 100000
    },
    premium: {
      under10kg: 170000,
      "10-15kg": 180000
    }
  },
  {
    id: 2,
    name: "Đuôi",
    description: "Nhuộm đuôi",
    regular: {
      under10kg: 65000, // Average of 30k-100k
      "10-15kg": 65000
    },
    premium: {
      under10kg: 90000, // Average of 30k-150k
      "10-15kg": 90000
    }
  },
  {
    id: 3,
    name: "4 chân",
    description: "Nhuộm 4 chân",
    regular: {
      under10kg: 160000,
      "10-15kg": 170000
    },
    premium: {
      under10kg: 270000,
      "10-15kg": 280000
    }
  },
  {
    id: 4,
    name: "Combo (Tai, đuôi, chân)",
    description: "Gói combo nhuộm toàn bộ",
    regular: {
      under10kg: 290000,
      "10-15kg": 300000
    },
    premium: {
      under10kg: 470000,
      "10-15kg": 480000
    }
  }
];

export const vipPackages: VIPPackage[] = [
  {
    id: 1,
    name: "VIP6",
    type: "VIP6",
    description: "Tủi đa 6 lần 1 tháng - Free spa nhé, free bấm gọi mút",
    dogPrices: {
      "under5kg": 499000,
      "5-10kg": 869000,
      "10-15kg": 1119000
    },
    catPrices: {
      "under3kg": 469000,
      "3-6kg": 569000
    },
    benefits: [
      "Tắm tối đa 6 lần trong 1 tháng",
      "Free spa",
      "Free bấm gọi mút (cắt móng)",
      "Ưu tiên đặt lịch"
    ],
    duration: "30 ngày",
    image: "https://images.unsplash.com/photo-1730403257848-a38a393f1b60?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjdXRlJTIwZG9nJTIwZ3Jvb21pbmclMjBzYWxvbnxlbnwxfHx8fDE3NzM3MzkwMzd8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
  },
  {
    id: 2,
    name: "VIP10",
    type: "VIP10",
    description: "Tủi đa 10 lần 1 tháng - Free spa nhé, free bấm gọi mút, giảm 30% gội SPA",
    dogPrices: {
      "under5kg": 599000,
      "5-10kg": 999000,
      "10-15kg": 1599000
    },
    catPrices: {
      "under3kg": 599000,
      "3-6kg": 769000
    },
    benefits: [
      "Tắm tối đa 10 lần trong 1 tháng",
      "Free spa",
      "Free bấm gọi mút (cắt móng)",
      "Giảm 30% gội SPA đối với VIP10",
      "Ưu tiên đặt lịch cao nhất"
    ],
    duration: "30 ngày",
    image: "https://images.unsplash.com/photo-1635717850365-b2f7de8f61e5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwZXQlMjBzcGElMjB0cmVhdG1lbnR8ZW58MXx8fHwxNzczNzY0ODY3fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
  }
];