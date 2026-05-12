<template>
  <div
    class="
    min-h-screen p-6
    bg-gray-100 dark:bg-gray-950
    text-gray-900 dark:text-gray-100
    transition-colors duration-300
    "
  >

    <div class="mb-6">
      <h1 class="text-3xl font-bold mb-2">
        Metrics
      </h1>

      <p class="text-gray-500 dark:text-gray-400">
        Live infrastructure metrics and system telemetry.
      </p>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">

      <div
        v-for="metric in metrics"
        :key="metric.label"

        class="
        bg-white dark:bg-gray-900
        border border-gray-200 dark:border-gray-800
        rounded-2xl p-5
        "
      >

        <p class="text-sm text-gray-500 dark:text-gray-400 mb-2">
          {{ metric.label }}
        </p>

        <p class="text-3xl font-bold">
          {{ metric.value }}{{ metric.unit }}
        </p>

      </div>

    </div>

  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

import { useTelemetryStore } from '@/stores/useTelemetryStore'

const store = useTelemetryStore()

const metrics = computed(() => {
  const latest = store.latestPoint

  if (!latest) {
    return []
  }

  return [
    {
      label: 'CPU Usage',
      value: latest.cpu,
      unit: '%'
    },

    {
      label: 'Memory Usage',
      value: latest.memory,
      unit: '%'
    },

    {
      label: 'Requests/sec',
      value: latest.requestsPerSec,
      unit: ''
    },

    {
      label: 'Connections',
      value: latest.connections,
      unit: ''
    }
  ]
})
</script>