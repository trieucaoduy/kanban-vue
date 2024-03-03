import { createRouter, createWebHistory } from "vue-router"
import Kanban from "../pages/Kanban.vue"
import BaseLayout from "../layouts/MainLayout.vue"

const routes = [
  {
    path: "/",
    name: "BaseLayout",
    component: BaseLayout,
    children: [
      {
        path: "/",
        component: Kanban,
      },
    ],
  },
]

const router = createRouter({
  // 4. Provide the history implementation to use. We
  // are using the hash history for simplicity here.
  history: createWebHistory(),
  routes, // short for `routes: routes`
})

export default router
