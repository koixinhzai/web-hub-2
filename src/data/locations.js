export const locationGroups = [
  {
    group: 'Ho Chi Minh City',
    areas: [
      { slug: 'quan-1', label: 'District 1', count: 18 },
      { slug: 'quan-3', label: 'District 3', count: 11 },
      { slug: 'thu-duc', label: 'Thu Duc City', count: 9 },
      { slug: 'binh-thanh', label: 'Binh Thanh', count: 7 },
      { slug: 'phu-nhuan', label: 'Phu Nhuan', count: 5 }
    ]
  },
  {
    group: 'Hanoi',
    areas: [
      { slug: 'hoan-kiem', label: 'Hoan Kiem', count: 14 },
      { slug: 'tay-ho', label: 'Tay Ho', count: 8 },
      { slug: 'cau-giay', label: 'Cau Giay', count: 6 }
    ]
  },
  {
    group: 'Da Nang',
    areas: [
      { slug: 'hai-chau', label: 'Hai Chau', count: 10 },
      { slug: 'son-tra', label: 'Son Tra', count: 6 }
    ]
  }
]

export function findArea(slug) {
  for (const g of locationGroups) {
    const a = g.areas.find((x) => x.slug === slug)
    if (a) return a
  }
  return null
}
