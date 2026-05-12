<template>
  <v-chart class="chart" :option="option" autoresize />
</template>

<script setup lang="ts">
import VChart from 'vue-echarts'
import { use } from 'echarts/core'
import { LineChart, BarChart} from 'echarts/charts'
import {
  GridComponent,
  TooltipComponent,
  LegendComponent
} from 'echarts/components'
import { CanvasRenderer } from 'echarts/renderers'

use([
  LineChart,
  BarChart,
  //AreaChart,
  GridComponent,
  TooltipComponent,
  LegendComponent,
  CanvasRenderer
])

defineProps<{
  option: any
}>()
</script>

<style scoped>
.chart {
  width: 100%;
  height: 100%;
}
</style>