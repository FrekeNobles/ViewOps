<template>
  <div
    class="
    min-h-screen
    bg-gray-100 dark:bg-gray-950
    text-gray-900 dark:text-gray-100
    transition-colors duration-300
    p-4 md:p-6
    "
  >
    
    <!-- Header -->
    <div class="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">

      <div>
        <h1 class="text-3xl font-bold tracking-tight">
          ViewOps
        </h1>

        <p class="text-sm text-gray-600 dark:text-gray-400 mt-1">
          Real-Time Infrastructure Monitoring Dashboard
        </p>
      </div>

      <DashboardControls />
    </div>

    <!-- Metric Cards -->
    <div class="grid grid-cols-2 lg:grid-cols-5 gap-4 mb-6">

      <div class="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-4">
        <p class="text-sm text-gray-500 dark:text-gray-400 mb-1">
          CPU Usage
        </p>
        <p class="text-2xl font-bold">
          {{ latest?.cpu ?? 0 }}%
        </p>
      </div>

      <div class="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-4">
        <p class="text-sm text-gray-500 dark:text-gray-400 mb-1">
          Memory
        </p>
        <p class="text-2xl font-bold">
          {{ latest?.memory ?? 0 }}%
        </p>
      </div>

      <div class="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-4">
        <p class="text-sm text-gray-500 dark:text-gray-400 mb-1">
          Requests/sec
        </p>
        <p class="text-2xl font-bold">
          {{ latest?.requestsPerSec ?? 0 }}
        </p>
      </div>

      <div class="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-4">
        <p class="text-sm text-gray-500 dark:text-gray-400 mb-1">
          Error Rate
        </p>
        <p class="text-2xl font-bold">
          {{ latest?.errorRate ?? 0 }}%
        </p>
      </div>

      <div class="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-4">
        <p class="text-sm text-gray-500 dark:text-gray-400 mb-1">
          Connections
        </p>
        <p class="text-2xl font-bold">
          {{ latest?.connections ?? 0 }}
        </p>
      </div>

    </div>

    <!-- Charts -->
    <div class="grid grid-cols-1 xl:grid-cols-3 gap-6 mb-6">

      
      <div
        class="
        bg-white dark:bg-gray-900
        border border-gray-200 dark:border-gray-800
        rounded-2xl p-4 h-80
        "
      >
        <div class="flex items-center justify-between mb-4">

          <h2 class="text-sm text-gray-500 dark:text-gray-400">
            Requests / sec
          </h2>

          <span class="text-xs text-purple-500">
            LIVE
          </span>

        </div>

        <RequestsBarChart />
      </div>

      <div class="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-4 h-80">
        <div class="flex items-center justify-between mb-4">
          <h2 class="text-sm text-gray-500 dark:text-gray-400">
            CPU Usage
          </h2>

          <span class="text-xs text-green-500">
            LIVE
          </span>
        </div>

        <CpuChart />
      </div>

      <div class="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-4 h-80">
        <div class="flex items-center justify-between mb-4">
          <h2 class="text-sm text-gray-500 dark:text-gray-400">
            Memory Usage
          </h2>

          <span class="text-xs text-blue-500">
            LIVE
          </span>
        </div>

        <MemoryChart />
      </div>

    </div>

    <!-- Activity Feed -->
    <div class="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-4">

      <div class="flex items-center justify-between mb-4">
        <h2 class="text-sm text-gray-500 dark:text-gray-400">
          Live Activity Feed
        </h2>

        <span class="text-xs text-gray-500">
          {{ events.length }} events
        </span>
      </div>

      <div class="space-y-3 max-h-96 overflow-y-auto pr-1">

        <div
          v-for="event in events"
          :key="event.id"

          class="
          rounded-xl p-3 transition-all duration-300
          bg-gray-50 dark:bg-gray-800
          "
          :class="{
            'border-l-4 border-blue-500': event.level === 'info',
            'border-l-4 border-yellow-500': event.level === 'warning',
            'border-l-4 border-red-500': event.level === 'critical'
          }"
        >

          <div class="flex items-center justify-between mb-1">

            <span
              class="text-xs uppercase tracking-wide"

              :class="{
                'text-blue-500': event.level === 'info',
                'text-yellow-500': event.level === 'warning',
                'text-red-500': event.level === 'critical'
              }"
            >
              {{ event.level }}
            </span>

            <span class="text-xs text-gray-500">
              {{ new Date(event.timestamp).toLocaleTimeString() }}
            </span>

          </div>

          <p class="text-sm text-gray-800 dark:text-gray-200">
            {{ event.message }}
          </p>

        </div>

        <div
          v-if="events.length === 0"
          class="text-center text-gray-500 py-8"
        >
          No activity yet...
        </div>

      </div>

    </div>

  </div>
</template>

<script setup lang="ts">
import { computed, onMounted } from 'vue'

import { useTelemetryStore } from '@/stores/useTelemetryStore'
import RequestsBarChart from '@/components/charts/RequestsBarChart.vue'
import CpuChart from '@/components/charts/CpuChart.vue'
import MemoryChart from '@/components/charts/MemoryChart.vue'
import DashboardControls from '@/components/DashboardControls.vue'

const store = useTelemetryStore()

const latest = computed(() => store.latestPoint)

const events = computed(() => store.events)

onMounted(() => {
  store.startStream()
})
</script>