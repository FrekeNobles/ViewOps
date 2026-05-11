export interface TelemetryPoint {
  timestamp: number
  cpu: number
  memory: number
  requestsPerSec: number
  errorRate: number
  connections: number
}

export interface TelemetryEvent {
  id: string
  timestamp: number
  level: 'info' | 'warning' | 'critical'
  message: string
}