import { defineStore } from 'pinia'
import type { TelemetryPoint, TelemetryEvent } from '../types/telemetry'
import {
  generateTelemetry,
  generateEvent
} from '../services/streamGenerator'
import { useUIStore } from './useUIStore'
import { simulateConnectionIssue } from '@/services/streamGenerator'

let streamInterval: number | null = null

export const useTelemetryStore = defineStore('telemetry', {
  state: () => ({
    data: [] as TelemetryPoint[],
    events: [] as TelemetryEvent[],

    isStreaming: false,

    maxPoints: 60,

    selectedRange: '1m'
  }),

  getters: {
    latestPoint: (state) => state.data.at(-1),

    filteredData: (state) => {
      const rangeMap: Record<string, number> = {
        '1m': 60,
        '5m': 300,
        '1h': 3600
      }

      const limit = rangeMap[state.selectedRange]

      return state.data.slice(-limit)
    }
  },

  actions: {
    startStream() {
      if (this.isStreaming) return

      this.isStreaming = true

      streamInterval = window.setInterval(() => {
        const uiStore = useUIStore()

      if (simulateConnectionIssue()) {
        uiStore.setConnectionStatus('reconnecting')

        setTimeout(() => {
          uiStore.setConnectionStatus('connected')
        }, 2000)

        return
      }
        const point = generateTelemetry()

        this.data.push(point)

        // fixed memory window
        if (this.data.length > 3600) {
          this.data.shift()
        }

        const event = generateEvent()

        if (event) {
          this.events.unshift(event)

          if (this.events.length > 50) {
            this.events.pop()
          }
        }
      }, 1000)
    },

    stopStream() {
      this.isStreaming = false

      if (streamInterval) {
        clearInterval(streamInterval)
        streamInterval = null
      }
    },

    setRange(range: '1m' | '5m' | '1h') {
      this.selectedRange = range
    }
  }
})