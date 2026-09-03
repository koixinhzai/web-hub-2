// Shared, lazily-fetched-once caches for data that many components need read-only
// (categories for the nav, badge metadata for every <Badge>, area/city groups for
// the sidebar). Avoids re-fetching the same small tables from every component instance.
import { ref } from 'vue'
import { fetchCategories } from '../api/categories'
import { fetchBadges, toBadgeMeta } from '../api/badges'
import { fetchLocationGroups } from '../api/locations'

function createCachedFetcher(fetcher, initial) {
  const data = ref(initial)
  let promise = null
  function ensure() {
    if (!promise) {
      promise = fetcher().then((result) => { data.value = result }).catch(() => {})
    }
    return promise
  }
  return { data, ensure }
}

const categoriesCache = createCachedFetcher(fetchCategories, [])
const badgeMetaCache = createCachedFetcher(() => fetchBadges().then(toBadgeMeta), {})
const locationGroupsCache = createCachedFetcher(fetchLocationGroups, [])

export function useCategories() {
  categoriesCache.ensure()
  return categoriesCache.data
}

export function useBadgeMeta() {
  badgeMetaCache.ensure()
  return badgeMetaCache.data
}

export function useLocationGroups() {
  locationGroupsCache.ensure()
  return locationGroupsCache.data
}
