// The existing microgreens photograph is the temporary editorial visual.
// Put the named images in public/images/sections/ to use them after a rebuild.
const sectionImages = import.meta.glob('/public/images/sections/*.{jpg,jpeg,png,webp}', { eager: true, query: '?url', import: 'default' })
const fallback = '/images/microgreens/microgreens-asset.jpg'

export const landingImages = {
  hero: sectionImages['/public/images/sections/hero-lifestyle.jpg'] || fallback,
  introduction: sectionImages['/public/images/sections/seed-to-growth.jpg'] || fallback,
}
