import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/Search.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'search',
      component: HomeView
    },
    {
      path: '/backend',
      name: 'backend',
      component: () => import('../views/Backend.vue')
    },
    {
      path: '/create',
      name: 'create',
      component: () => import('../components/Create.vue')
    },
    {
      path: '/test:quizId',
      name: 'test',
      component: () => import('../views/Test.vue')
    },
    {
      path: '/statics:quizId',
      name: 'statics',
      component: () => import('../components/Statics.vue')
    },
    {
      path: '/fillout:quizId',
      name: 'fillout',
      component: () => import('../components/Fillout.vue')
    },
    {
      path: '/update:quizId',
      name: 'update',
      component: () => import('../components/Update.vue')
    },
    {
      path: '/feedback:quizId',
      name: 'feedback',
      component: () => import('../components/Feedback.vue')
    },
    {
      path: '/feedbackdetail:quizId:quId',
      name: 'feedbackdetail',
      component: () => import('../components/FeedbackDetail.vue')
    },
  ]
})

export default router
