<template>
  <div class="flex flex-wrap items-center gap-3">

    <!-- Start -->
    <button
      @click="store.startStream()"
      class="
      px-4 py-2 rounded-lg font-medium transition-all

      bg-green-600 hover:bg-green-500
      text-white
      shadow-sm
      "
    >
      Start
    </button>

    <!-- Stop -->
    <button
      @click="store.stopStream()"
      class="
      px-4 py-2 rounded-lg font-medium transition-all

      bg-red-600 hover:bg-red-500
      text-white
      shadow-sm
      "
    >
      Stop
    </button>

    <!-- Range Selector -->
    <select
      v-model="store.selectedRange"

      class="
      px-3 py-2 rounded-lg text-sm transition-all

      bg-white dark:bg-gray-900
      text-gray-900 dark:text-gray-100

      border border-gray-200 dark:border-gray-700

      focus:outline-none focus:ring-2 focus:ring-blue-500
      "
    >
      <option value="1m">Last 1 Min</option>
      <option value="5m">Last 5 Mins</option>
      <option value="1h">Last 1 Hour</option>
    </select>

  </div>
</template>

<script setup lang="ts">
import { useTelemetryStore } from '../stores/useTelemetryStore'

const store = useTelemetryStore()
</script>