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
        Logs
      </h1>

      <p class="text-gray-500 dark:text-gray-400">
        Real-time infrastructure activity feed.
      </p>
    </div>

    <div
      class="
      bg-white dark:bg-gray-900
      border border-gray-200 dark:border-gray-800
      rounded-2xl overflow-hidden
      "
    >

      <div class="overflow-x-auto">

        <table class="w-full text-sm">

          <thead
            class="
            bg-gray-50 dark:bg-gray-800
            text-gray-600 dark:text-gray-300
            "
          >
            <tr>
              <th class="text-left px-4 py-3">Level</th>
              <th class="text-left px-4 py-3">Message</th>
              <th class="text-left px-4 py-3">Time</th>
            </tr>
          </thead>

          <tbody>

            <tr
              v-for="event in events"
              :key="event.id"

              class="border-t border-gray-200 dark:border-gray-800"
            >

              <td class="px-4 py-3">
                <span
                  class="text-xs px-2 py-1 rounded-full"

                  :class="{
                    'bg-blue-100 text-blue-600': event.level === 'info',
                    'bg-yellow-100 text-yellow-700': event.level === 'warning',
                    'bg-red-100 text-red-600': event.level === 'critical'
                  }"
                >
                  {{ event.level }}
                </span>
              </td>

              <td class="px-4 py-3">
                {{ event.message }}
              </td>

              <td class="px-4 py-3 text-gray-500 dark:text-gray-400">
                {{ new Date(event.timestamp).toLocaleTimeString() }}
              </td>

            </tr>

          </tbody>

        </table>

      </div>

    </div>

  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

import { useTelemetryStore } from '@/stores/useTelemetryStore'

const store = useTelemetryStore()

const events = computed(() => store.events.slice(0, 20))
</script>