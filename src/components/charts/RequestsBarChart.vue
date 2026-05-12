<template>
  <v-chart
    class="w-full h-full"
    :option="chartOptions"
    autoresize
  />
</template>

<script setup lang="ts">
import { computed } from 'vue'

import { useTelemetryStore } from '@/stores/useTelemetryStore'

import VChart from 'vue-echarts'

import { use } from 'echarts/core'

import { CanvasRenderer } from 'echarts/renderers'
import {
  GridComponent,
  TooltipComponent,
  LegendComponent
} from 'echarts/components'

import { BarChart } from 'echarts/charts'

const store = useTelemetryStore()

use([
  CanvasRenderer,
  GridComponent,
  TooltipComponent,
  LegendComponent,
  BarChart
])
const recentData = computed(()=>
store.filteredData.slice(-10)
)

const chartOptions = computed(() => ({
  tooltip: {
    trigger: 'axis'
  },

  xAxis: {
    type: 'category',

    data: recentData.value.map(
      point =>
        new Date(point.timestamp)
          .toLocaleTimeString()
    ),

    axisLabel: {
      color: '#9CA3AF'
    }
  },

  yAxis: {
    type: 'value',

    axisLabel: {
      color: '#9CA3AF'
    }
  },

  grid: {
    left: 40,
    right: 10,
    top: 20,
    bottom: 30
  },

  series: [
    {
      name: 'Requests/sec',

      type: 'bar',

      smooth: true,

      data: recentData.value.map(
        point => point.requestsPerSec
      ),

      itemStyle: {
        borderRadius: [6, 6, 0, 0]
      }
    }
  ]
}))
</script>