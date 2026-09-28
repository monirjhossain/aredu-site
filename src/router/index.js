import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', name: 'home', component: () => import('../pages/HomePage.vue') },
    { path: '/universities', name: 'universities', component: () => import('../pages/UniversitiesPage.vue') },
    { path: '/scholarships', name: 'scholarships', component: () => import('../pages/ScholarshipsPage.vue') },
    { path: '/scholarships/:slug/apply', name: 'scholarship-apply', component: () => import('../pages/scholarship/ScholarshipApplyPage.vue') },
    { path: '/majors', name: 'majors', component: () => import('../pages/MajorsPage.vue') },
    { path: '/cities', name: 'cities', component: () => import('../pages/CitiesPage.vue') },
    { path: '/services', name: 'services', component: () => import('../pages/ServicesPage.vue') },
    { path: '/map', name: 'map', component: () => import('../pages/MapPage.vue') },
    { path: '/compare', name: 'compare', component: () => import('../pages/ComparePage.vue') },
    { path: '/about', name: 'about', component: () => import('../pages/AboutPage.vue') },
    { path: '/contact', name: 'contact', component: () => import('../pages/ContactPage.vue') },
    { path: '/login', name: 'login', component: () => import('../pages/LoginPage.vue') },
    { path: '/register', name: 'register', component: () => import('../pages/RegisterPage.vue') },
    { path: '/tools/find-university', name: 'find-university', component: () => import('../pages/tools/FindUniversityPage.vue') },
    { path: '/tools/scholarship-checker', name: 'scholarship-checker', component: () => import('../pages/tools/ScholarshipCheckerPage.vue') },
    { path: '/tools/cost-calculator', name: 'cost-calculator', component: () => import('../pages/tools/CostCalculatorPage.vue') },
    { path: '/tools/gpa-converter', name: 'gpa-converter', component: () => import('../pages/tools/GpaConverterPage.vue') },
    { path: '/study/:slug', name: 'degree', component: () => import('../pages/study/DegreePage.vue') },
    { path: '/service/:slug', name: 'service', component: () => import('../pages/service/ServiceDetailPage.vue') },
    { path: '/university/:slug', name: 'university', component: () => import('../pages/university/UniversityDetailPage.vue') },
    { path: '/scholarship/:slug', name: 'scholarship', component: () => import('../pages/scholarship/ScholarshipDetailPage.vue') },
    { path: '/city/:slug', name: 'city', component: () => import('../pages/city/CityDetailPage.vue') },
    { path: '/major/:slug', name: 'major', component: () => import('../pages/major/MajorDetailPage.vue') },
    { path: '/region/:slug', name: 'region', component: () => import('../pages/region/RegionPage.vue') },
    { path: '/:pathMatch(.*)*', name: 'not-found', component: () => import('../pages/NotFoundPage.vue') },
  ],
  scrollBehavior() {
    return { top: 0 }
  },
})

export default router
