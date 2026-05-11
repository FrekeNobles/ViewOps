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

  // keep it stable → low event frequency
  if (chance > 0.85) {
    const events = [
      'Minor latency spike detected',
      'Cache hit rate slightly dropped',
      'API response time increased',
      'Background job delay observed'
    ]

    return {
      id: crypto.randomUUID(),
      timestamp: Date.now(),
      level: 'warning',
      message: events[Math.floor(Math.random() * events.length)]
    }
  }

  return null
}