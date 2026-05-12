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
        Insights
      </h1>

      <p class="text-gray-500 dark:text-gray-400">
        Infrastructure recommendations based on live telemetry.
      </p>
    </div>

    <div
      class="
      bg-white dark:bg-gray-900
      border border-gray-200 dark:border-gray-800
      rounded-2xl p-6
      "
    >

      <ul class="space-y-4 list-disc pl-5">

        <li
          v-for="insight in insights"
          :key="insight"

          class="text-gray-700 dark:text-gray-300"
        >
          {{ insight }}
        </li>

      </ul>

    </div>

  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

import { useTelemetryStore } from '@/stores/useTelemetryStore'

const store = useTelemetryStore()

const insights = computed(() => {
  const latest = store.latestPoint

  if (!latest) {
    return [
      'Waiting for telemetry stream...'
    ]
  }

  const result: string[] = []

  if (latest.cpu > 60) {
    result.push(
      'High CPU utilization detected. Consider scaling compute resources.'
    )
  }

  if (latest.memory > 65) {
    result.push(
      'Memory usage is elevated. Monitor for potential leaks or spikes.'
    )
  }

  if (latest.errorRate > 5) {
    result.push(
      'Error rate exceeds normal threshold. Investigate failing services.'
    )
  }

  if (latest.requestsPerSec > 800) {
    result.push(
      'Traffic throughput is increasing rapidly. Autoscaling may be required.'
    )
  }

  if (result.length === 0) {
    result.push(
      'Infrastructure metrics are currently stable.'
    )
  }

  return result
})
</script>