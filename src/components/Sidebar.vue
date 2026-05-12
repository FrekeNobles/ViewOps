<template>

  <!-- Mobile Overlay -->
  <div
    v-if="ui.sidebarOpen"
    @click="ui.closeSidebar()"
    class="fixed inset-0 bg-black/50 z-40 md:hidden"
  />

  <!-- Sidebar -->
  <aside
    class="
    fixed md:static top-0 left-0 z-50
    w-64 h-screen
    border-r
    p-4 flex flex-col
    transition-transform duration-300

    bg-white dark:bg-gray-900
    border-gray-200 dark:border-gray-800
    "

    :class="ui.sidebarOpen
      ? 'translate-x-0'
      : '-translate-x-full md:translate-x-0'"
  >

    <!-- Header -->
    <div class="flex items-center justify-between mb-8">

      <div>
        <h2 class="text-2xl font-bold">
          ViewOps
        </h2>

        <p class="text-xs text-gray-500 dark:text-gray-400 mt-1">
          Real-Time Infrastructure Analytics
        </p>
      </div>

      <button
        @click="ui.closeSidebar()"
        class="md:hidden text-gray-500 dark:text-gray-400"
      >
        ✕
      </button>

    </div>

    <!-- Navigation -->
    <nav class="space-y-2 text-sm">

      <RouterLink
        v-for="item in links"
        :key="item.path"
        :to="item.path"

        @click="ui.closeSidebar()"

        class="
        block p-3 rounded-xl transition-all duration-200
        "

        :class="currentPath === item.path
          ? 'bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white'
          : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-white'"
      >
        {{ item.label }}
      </RouterLink>

    </nav>

    <!-- Theme Toggle -->
    <button
      @click="ui.toggleTheme()"

      class="
      mt-6 w-full p-3 rounded-xl text-sm transition-all

      border
      border-gray-200 dark:border-gray-700

      bg-gray-50 dark:bg-gray-800

      text-gray-900 dark:text-gray-100

      hover:bg-gray-100 dark:hover:bg-gray-700
      "
    >
      {{
        ui.theme === 'light'
          ? '🌙 Dark Mode'
          : '☀️ Light Mode'
      }}
    </button>

    <!-- Connection Badge -->
    <div class="mt-auto pt-6">

      <div
        class="
        text-xs rounded-lg px-3 py-2 inline-flex items-center gap-2
        "

        :class="{
          'bg-green-100 dark:bg-green-500/10 text-green-600 dark:text-green-400':
            ui.connectionStatus === 'connected',

          'bg-yellow-100 dark:bg-yellow-500/10 text-yellow-600 dark:text-yellow-400':
            ui.connectionStatus === 'reconnecting',

          'bg-red-100 dark:bg-red-500/10 text-red-600 dark:text-red-400':
            ui.connectionStatus === 'disconnected'
        }"
      >

        <span class="w-2 h-2 rounded-full bg-current"></span>

        {{ ui.connectionStatus }}

      </div>

    </div>

  </aside>

</template>

<script setup lang="ts">
import { computed } from 'vue'
import { RouterLink, useRoute } from 'vue-router'
import { useUIStore } from '@/stores/useUIStore'

const ui = useUIStore()
const route = useRoute()

const currentPath = computed(() => route?.path || '')

const links = [
  { label: 'Overview', path: '/overview' },
  { label: 'Metrics', path: '/metrics' },
  { label: 'Logs', path: '/logs' },
  { label: 'Insights', path: '/insights' }
]
</script>
