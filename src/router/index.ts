import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'layout',
      component:  () => import('../view/Layout/index.vue'),
      children: [
        {
          path: '', 
          name: '首页',
          component: () => import('../view/Home/index.vue')
        },
        {
          path: '/admin',
          name: '管理',
          component: () => import('../view/Admin/index.vue')
        },
        {
          path: '/about',
          name: '关于',
          component: () => import('../view/About/index.vue')
        }
      ]
    },
  ]
})

export default router
