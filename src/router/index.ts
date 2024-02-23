import { createRouter, createWebHistory } from 'vue-router'
import Kanban from '../pages/Kanban.vue'

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Kanban',
      component: Kanban
    },
  ]
})

export default router
