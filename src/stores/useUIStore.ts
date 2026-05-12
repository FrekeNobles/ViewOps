import { defineStore } from 'pinia'

type ConnectionStatus =
  | 'connected'
  | 'reconnecting'
  | 'disconnected'

type ThemeMode =
  | 'light'
  | 'dark'

export const useUIStore = defineStore('ui', {
  state: () => ({
    sidebarOpen: false,

    connectionStatus: 'connected' as ConnectionStatus,

    theme: (localStorage.getItem('theme') as ThemeMode) || 'light'
  }),

  actions: {
    toggleSidebar() {
      this.sidebarOpen = !this.sidebarOpen
    },

    closeSidebar() {
      this.sidebarOpen = false
    },

    setConnectionStatus(status: ConnectionStatus) {
      this.connectionStatus = status
    },

    initializeTheme() {
  const savedTheme = this.theme

  document.documentElement.classList.toggle(
    'dark',
    savedTheme === 'dark'
  )
},

toggleTheme() {
  this.theme = this.theme === 'light' ? 'dark' : 'light'

  localStorage.setItem('theme', this.theme)

  document.documentElement.classList.toggle(
    'dark',
    this.theme === 'dark'
  )
}
  }
})