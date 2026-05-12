import { createRouter, createWebHistory } from 'vue-router'

import Dashboard from '@/views/Dashboard.vue'
import MetricsView from '@/views/MetricsView.vue'
import LogsView from '@/views/LogsView.vue'
import AlertsView from '@/views/AlertsView.vue'
import SettingsView from '@/views/SettingsView.vue'

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
      path: '/alerts',
      component: AlertsView
    },

    {
      path: '/settings',
      component: SettingsView
    }
  ]
})

export default router