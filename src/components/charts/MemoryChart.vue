<template>
  <BaseChart :option="option" />
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useTelemetryStore } from '../../stores/useTelemetryStore'
import BaseChart from './BaseChart.vue'

const store = useTelemetryStore()

const option = computed(() => {
  return {
    tooltip: { trigger: 'axis' },
    xAxis: {
      type: 'category',
      data: store.filteredData.map(d =>
        new Date(d.timestamp).toLocaleTimeString()
      )
    },
    yAxis: { type: 'value', max: 100 },
    series: [
      {
        name: 'Memory',
        type: 'line',
        data: store.data.map(d => d.memory),
        smooth: true,
        areaStyle: {
          opacity: 0.3
        },
        showSymbol: false
      }
    ]
  }
})
</script>