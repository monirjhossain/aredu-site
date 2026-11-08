import { fetchUniversities, fetchUniversityBySlug } from './universities.js'
import { fetchScholarships, fetchScholarshipBySlug } from './scholarships.js'
import { fetchMajors, fetchMajorBySlug } from './majors.js'
import { fetchCities } from './cities.js'
import { fetchServices } from './services.js'

let started = false

/** Warm localStorage + memory so list/detail pages paint instantly. */
export function prefetchCatalogs() {
  if (started) return
  started = true

  const run = () => {
    Promise.allSettled([
      fetchUniversities({ perPage: 100 }),
      fetchScholarships({ perPage: 100 }),
      fetchMajors({ perPage: 200 }),
      fetchCities({ perPage: 100 }),
      fetchServices({ perPage: 20 }),
    ]).catch(() => {})
  }

  if (typeof requestIdleCallback === 'function') {
    requestIdleCallback(run, { timeout: 1500 })
  } else {
    setTimeout(run, 400)
  }
}

export function prefetchUniversity(slug) {
  if (!slug) return
  fetchUniversityBySlug(slug).catch(() => {})
}

export function prefetchScholarship(slug) {
  if (!slug) return
  fetchScholarshipBySlug(slug).catch(() => {})
}

export function prefetchMajor(slug) {
  if (!slug) return
  fetchMajorBySlug(slug).catch(() => {})
}
