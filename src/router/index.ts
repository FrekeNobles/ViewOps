import { createRouter, createWebHistory } from 'vue-router'

import Dashboard from '@/views/Dashboard.vue'
import MetricsView from '@/views/MetricsView.vue'
import LogsView from '@/views/LogsView.vue'
import InsightsView from '@/views/InsightsView.vue'

const router = createRouter({
  history: createWebHistory(),

  routes: [
    {
      path: '/',
      redirect: '/overview'
    },

    {
      path: '/overview',
      component: Dashboard
    },

    {
      path: '/metrics',
      component: MetricsView
    },

    {
      path: '/logs',
      component: LogsView
    },

    {
      path: '/insights',
      component: InsightsView
    }
  ]
})

export default router