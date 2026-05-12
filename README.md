# ViewOps — Real-Time DevOps Monitoring Dashboard

## Overview
ViewOps is a real-time infrastructure monitoring dashboard built with Vue 3, TypeScript, TailwindCSS v4, and ECharts. It simulates a production-grade DevOps analytics system with live streaming metrics, charts, logs, and insights.

It visualizes system performance metrics such as CPU usage, memory consumption, request throughput, error rates, and connection counts in real time.

---

## Features

### Real-Time Data Streaming
- Simulated live telemetry updates
- WebSocket-style data flow (mocked)
- Automatic reconnect simulation
- Resilient connection status handling

### Dashboard Visualizations
- Line chart (CPU usage trends)
- Area chart (Memory usage trends)
- Bar chart (Requests per second)
- Live metric cards with animated counters

### Logs & Activity Feed
- Real-time event stream
- Severity-based log classification
- Auto-scrolling feed with user control
- Timestamped events

### Insights Engine
- Rule-based system insights
- Automated recommendations
- Performance anomaly detection (CPU, memory, error rate, traffic spikes)

### UI/UX
- Dark / Light mode support
- Responsive layout (mobile, tablet, desktop)
- Modern SaaS dashboard styling
- System status indicator bar

---

## Tech Stack

- Vue 3 (Composition API)
- TypeScript
- TailwindCSS v4
- Vite
- ECharts
- Pinia (state management)

---

## Project Architecture

### State Management
- `useTelemetryStore`: Handles all streaming data, metrics, and logs
- `useUIStore`: Manages UI state (theme, sidebar, connection status)

### Data Flow
1. Mock telemetry stream generates system metrics
2. Store updates reactive state
3. Components reactively render charts and UI
4. Insights computed from latest telemetry snapshot

---

## Performance Optimization

- Sliding window data (prevents memory overflow)
- Chart data slicing (last N points only)
- Memoized computed values
- Efficient reactive state updates
- Auto-scroll optimization for logs

---

## Setup Instructions

```bash
npm install
npm run dev
```

Build for production:

```bash
npm run build
```

Preview build:

```bash
npm run preview
```

---

## Key Design Decisions

- ECharts chosen for performance under real-time updates
- Sliding window approach used for bar chart stability
- TailwindCSS v4 used for utility-first UI styling
- Mock streaming used instead of real WebSocket for simulation realism
- Component modularization for scalability

---

## Trade-offs

- Mock data instead of real backend streaming (for speed of development)
- Simplified insights engine (rule-based instead of ML-based)
- No backend persistence layer

---

## Future Improvements

- Real WebSocket backend integration
- Kafka-style event streaming simulation
- User authentication layer
- Persistent log storage
- Draggable dashboard widgets
