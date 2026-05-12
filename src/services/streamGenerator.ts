import type { TelemetryPoint, TelemetryEvent } from '../types/telemetry'

let cpu = 35
let memory = 55
let requests = 120
let errorRate = 1
let connections = 300

function clamp(value: number, min: number, max: number) {
  return Math.max(min, Math.min(max, value))
}

function smallDrift(value: number, maxChange: number) {
  const change = (Math.random() - 0.5) * maxChange
  return value + change
}

export function generateTelemetry(): TelemetryPoint {
  cpu = clamp(smallDrift(cpu, 3), 10, 90)
  memory = clamp(smallDrift(memory, 2), 20, 95)
  requests = clamp(smallDrift(requests, 10), 50, 500)
  errorRate = clamp(smallDrift(errorRate, 0.2), 0, 5)
  connections = clamp(smallDrift(connections, 15), 100, 800)

  return {
    timestamp: Date.now(),
    cpu: Number(cpu.toFixed(2)),
    memory: Number(memory.toFixed(2)),
    requestsPerSec: Math.round(requests),
    errorRate: Number(errorRate.toFixed(2)),
    connections: Math.round(connections)
  }
}

export function generateEvent(): TelemetryEvent | null {
  const chance = Math.random()

  if (chance > 0.88) {
    return {
      id: crypto.randomUUID(),
      timestamp: Date.now(),
      level: 'critical',
      message: 'API error rate exceeded threshold'
    }
  }

  if (chance > 0.80) {
    return {
      id: crypto.randomUUID(),
      timestamp: Date.now(),
      level: 'warning',
      message: 'Elevated memory usage detected'
    }
  }

  if (chance > 0.72) {
    return {
      id: crypto.randomUUID(),
      timestamp: Date.now(),
      level: 'info',
      message: 'Background jobs completed successfully'
    }
  }

  return null
}
export function simulateConnectionIssue(): boolean {
  return Math.random() > 0.97
}