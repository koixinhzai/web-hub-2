// Sample images from picsum.photos (random stock photos, not real people/venues).
// Seed is fixed per item so the photo set stays consistent on every page load.
function gallery(seed, count = 6) {
  return Array.from({ length: count }, (_, i) => `https://picsum.photos/seed/${seed}-${i}/640/480`)
}

export const spas = [
  {
    id: 'serene-lotus-spa',
    name: 'Serene Lotus Spa',
    tagline: 'Therapeutic massage & full-body relaxation',
    categories: ['massage-tri-lieu', 'tri-lieu-toan-than'],
    badges: ['verified', 'popular'],
    area: 'quan-1',
    city: 'Ho Chi Minh City',
    address: '12 Nguyen Hue, District 1',
    rating: 4.8,
    reviewCount: 132,
    cover: gallery('lotus')[0],
    images: gallery('lotus'),
    info: {
      Experience: '8 years in operation',
      Specialty: 'Thai massage, hot stone therapy, acupressure',
      Languages: 'Vietnamese, English',
      'Opening hours': '09:00 – 22:00',
      'Number of therapists': '12',
      Address: '12 Nguyen Hue, District 1, Ho Chi Minh City'
    },
    bio: 'Serene Lotus Spa offers a tranquil space in the heart of the city, specializing in traditional therapeutic massage treatments combined with natural essential oils. Our well-trained, dedicated therapists help clients relieve stress and restore energy.',
    rates: [
      { duration: '60 min', price: 350 },
      { duration: '90 min', price: 480 },
      { duration: '120 min', price: 620 }
    ],
    services: [
      { name: 'Traditional Thai massage', included: true },
      { name: 'Herbal steam sauna', included: true },
      { name: 'Relaxing aromatherapy oil', included: true },
      { name: 'In-depth facial care', included: false, extraPrice: 150 },
      { name: 'Collagen mask treatment', included: false, extraPrice: 90 }
    ],
    reviews: [
      { author: 'thanh.nguyen', date: '2026-06-11', rating: 5, text: 'Very relaxing space, highly skilled therapists. Will come back!' },
      { author: 'minhanh89', date: '2026-05-02', rating: 5, text: 'Professional service, on time, reasonable prices.' },
      { author: 'khachle', date: '2026-03-20', rating: 4, text: 'Good quality, just a bit crowded on weekends.' }
    ]
  },
  {
    id: 'golden-jade-wellness',
    name: 'Golden Jade Wellness',
    tagline: 'Premium facial care & therapy',
    categories: ['cham-soc-da', 'goi-combo'],
    badges: ['verified', 'new'],
    area: 'quan-3',
    city: 'Ho Chi Minh City',
    address: '45 Vo Van Tan, District 3',
    rating: 4.6,
    reviewCount: 58,
    cover: gallery('jade')[0],
    images: gallery('jade'),
    info: {
      Experience: '4 years in operation',
      Specialty: 'Facial treatments, in-depth skin care',
      Languages: 'Vietnamese',
      'Opening hours': '10:00 – 21:00',
      'Number of therapists': '6',
      Address: '45 Vo Van Tan, District 3, Ho Chi Minh City'
    },
    bio: 'Golden Jade Wellness focuses on facial care treatments using natural cosmetics suited for sensitive skin. The cozy, intimate space is ideal for clients seeking a private experience.',
    rates: [
      { duration: '45 min', price: 300 },
      { duration: '75 min', price: 450 }
    ],
    services: [
      { name: 'Deep skin cleansing', included: true },
      { name: 'Facial steaming', included: true },
      { name: 'Neck & shoulder massage', included: false, extraPrice: 120 },
      { name: '24k gold mask treatment', included: false, extraPrice: 200 }
    ],
    reviews: [
      { author: 'lananh', date: '2026-07-01', rating: 5, text: 'My skin felt so smooth and soft after the treatment, the staff were gentle.' },
      { author: 'huong.tran', date: '2026-06-15', rating: 4, text: 'Beautiful space, a bit pricey but the quality is solid.' }
    ]
  },
  {
    id: 'harmony-foot-house',
    name: 'Harmony Foot House',
    tagline: 'Relaxing foot massage & acupressure',
    categories: ['massage-chan'],
    badges: ['verified'],
    area: 'thu-duc',
    city: 'Ho Chi Minh City',
    address: '88 Vo Van Ngan, Thu Duc City',
    rating: 4.7,
    reviewCount: 94,
    cover: gallery('harmony')[0],
    images: gallery('harmony'),
    info: {
      Experience: '6 years in operation',
      Specialty: 'Foot acupressure, herbal foot soak',
      Languages: 'Vietnamese, English',
      'Opening hours': '08:00 – 23:00',
      'Number of therapists': '10',
      Address: '88 Vo Van Ngan, Thu Duc City'
    },
    bio: 'Harmony Foot House specializes in foot care treatments after a long day of work, combining herbal foot soaks with traditional-medicine acupressure to improve circulation and reduce fatigue.',
    rates: [
      { duration: '45 min', price: 200 },
      { duration: '60 min', price: 240 },
      { duration: '90 min', price: 350 }
    ],
    services: [
      { name: 'Herbal foot soak', included: true },
      { name: 'Foot acupressure', included: true },
      { name: 'Herbal tea', included: true },
      { name: 'Add-on shoulder & neck massage', included: false, extraPrice: 300 }
    ],
    reviews: [
      { author: 'phuc.le', date: '2026-04-18', rating: 5, text: 'Amazing foot massage, comfortable chairs, attentive service.' },
      { author: 'anhtuan', date: '2026-02-09', rating: 4, text: 'Great value for the quality, I will recommend it to friends.' }
    ]
  },
  {
    id: 'lotus-breeze-retreat',
    name: 'Lotus Breeze Retreat',
    tagline: 'All-inclusive premium spa combo package',
    categories: ['goi-combo', 'tri-lieu-toan-than'],
    badges: ['popular', 'promo'],
    area: 'binh-thanh',
    city: 'Ho Chi Minh City',
    address: '20 Dien Bien Phu, Binh Thanh',
    rating: 4.9,
    reviewCount: 210,
    cover: gallery('breeze')[0],
    images: gallery('breeze'),
    info: {
      Experience: '10 years in operation',
      Specialty: 'Full-body therapy combo, skin care, sauna',
      Languages: 'Vietnamese, English, Chinese',
      'Opening hours': '09:00 – 22:30',
      'Number of therapists': '20',
      Address: '20 Dien Bien Phu, Binh Thanh'
    },
    bio: 'Lotus Breeze Retreat is the ideal destination for anyone who wants to fully enjoy a day of self-care, with combo packages that blend massage, facial care and sauna in a luxurious setting.',
    rates: [
      { duration: 'Combo 90 min', price: 300 },
      { duration: 'Combo 150 min', price: 400 },
      { duration: 'Half-day combo package', price: 450 }
    ],
    services: [
      { name: 'Full-body massage', included: true },
      { name: 'Facial care', included: true },
      { name: 'Sauna & herbal bath', included: true },
      { name: 'Tea & fruit buffet', included: true },
      { name: 'Light makeup after treatment', included: false, extraPrice: 500 }
    ],
    reviews: [
      { author: 'ngoc.pham', date: '2026-08-02', rating: 5, text: 'Wonderful experience, worth every penny. The staff were very professional.' },
      { author: 'khanhly', date: '2026-07-19', rating: 5, text: 'Luxurious space, thorough service from A to Z.' },
      { author: 'quangminh', date: '2026-06-30', rating: 5, text: 'Booked the half-day combo, well worth it, will return for a special occasion.' }
    ]
  },
  {
    id: 'zen-garden-spa',
    name: 'Zen Garden Spa',
    tagline: 'A meditative space, natural therapy',
    categories: ['massage-tri-lieu', 'cham-soc-da'],
    badges: ['new'],
    area: 'phu-nhuan',
    city: 'Ho Chi Minh City',
    address: '5 Phan Xich Long, Phu Nhuan',
    rating: 4.5,
    reviewCount: 27,
    cover: gallery('zen')[0],
    images: gallery('zen'),
    info: {
      Experience: '2 years in operation',
      Specialty: 'Hot stone massage, meditative therapy',
      Languages: 'Vietnamese',
      'Opening hours': '10:00 – 21:00',
      'Number of therapists': '5',
      Address: '5 Phan Xich Long, Phu Nhuan'
    },
    bio: 'Zen Garden Spa draws inspiration from Eastern meditation philosophy, offering a gentle therapeutic experience amid lush green surroundings that helps clients balance body, mind and spirit.',
    rates: [
      { duration: '60 min', price: 320 },
      { duration: '90 min', price: 460 }
    ],
    services: [
      { name: 'Hot stone massage', included: true },
      { name: 'Meditation music & essential oils', included: true },
      { name: 'Herbal tea after treatment', included: true },
      { name: 'Add-on facial care', included: false, extraPrice: 130 }
    ],
    reviews: [
      { author: 'yenle', date: '2026-08-10', rating: 4, text: 'Very peaceful space, perfect for relaxing on weekends.' },
      { author: 'baotran', date: '2026-07-28', rating: 5, text: 'Newly opened but the service is already quite polished.' }
    ]
  },
  {
    id: 'imperial-heritage-spa',
    name: 'Imperial Heritage Spa',
    tagline: 'Traditional Hue imperial-court therapy',
    categories: ['tri-lieu-toan-than', 'goi-combo'],
    badges: ['verified', 'popular'],
    area: 'hoan-kiem',
    city: 'Hanoi',
    address: '30 Trang Thi, Hoan Kiem',
    rating: 4.7,
    reviewCount: 76,
    cover: gallery('imperial')[0],
    images: gallery('imperial'),
    info: {
      Experience: '7 years in operation',
      Specialty: 'Traditional therapy, imperial-court acupressure',
      Languages: 'Vietnamese, English',
      'Opening hours': '09:00 – 22:00',
      'Number of therapists': '15',
      Address: '30 Trang Thi, Hoan Kiem, Hanoi'
    },
    bio: 'Imperial Heritage Spa recreates traditional therapeutic treatments once used in the royal court, combined with modern techniques for optimal physical recovery.',
    rates: [
      { duration: '60 min', price: 380 },
      { duration: '120 min', price: 680 }
    ],
    services: [
      { name: 'Traditional acupressure', included: true },
      { name: 'Imperial herbal steam sauna', included: true },
      { name: 'Royal lotus tea', included: true },
      { name: 'Add-on nourishing hair care', included: false, extraPrice: 160 }
    ],
    reviews: [
      { author: 'hoangnam', date: '2026-05-25', rating: 5, text: 'Very unique, it truly felt like being pampered like royalty.' },
      { author: 'thuydung', date: '2026-04-14', rating: 4, text: 'Good quality, professional staff.' }
    ]
  }
]

export function findItem(id) {
  return spas.find((s) => s.id === id)
}

export const badgeMeta = {
  verified: { label: 'Verified', color: 'accent' },
  new: { label: 'New', color: 'gold' },
  popular: { label: 'Popular', color: 'danger' },
  promo: { label: 'Promo', color: 'gold' }
}
