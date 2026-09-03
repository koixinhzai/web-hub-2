export const categories = [
  { slug: 'massage-tri-lieu', label: 'Therapeutic Massage', title: 'Therapeutic Massage', icon: '💆' },
  { slug: 'cham-soc-da', label: 'Facial Skin Care', title: 'Facial Skin Care', icon: '✨' },
  { slug: 'tri-lieu-toan-than', label: 'Full Body Therapy', title: 'Full Body Therapy', icon: '🌿' },
  { slug: 'massage-chan', label: 'Foot Massage', title: 'Foot Massage', icon: '🦶' },
  { slug: 'goi-combo', label: 'Spa Combo Package', title: 'Spa Combo Package', icon: '🧖' }
]

export function findCategory(slug) {
  return categories.find((c) => c.slug === slug)
}
