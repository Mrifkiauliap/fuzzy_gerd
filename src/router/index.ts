import HasilView from '@/views/HasilView.vue'
import HomeView from '@/views/HomeView.vue'
import NotFound from '@/views/NotFoundView.vue'
import PersonalDataView from '@/views/PersonalDataView.vue'
import SurveyView from '@/views/SurveyView.vue'
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/personal-data',
      name: 'personal-data',
      component: PersonalDataView,
    },
    {
      path: '/survey',
      name: 'survey',
      component: SurveyView,
    },
    {
      path: '/hasil',
      name: 'hasil',
      component: HasilView,
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'not-found',
      component: NotFound,
    },
  ],
})

export default router
