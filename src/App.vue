<template>
  <div class="flex bg-gray-100 dark:bg-gray-950
text-gray-900 dark:text-gray-100
transition-colors duration-300">

    <Sidebar />

    <div class="flex-1 min-h-screen">

      <!-- Mobile Topbar -->
      <header
        class="md:hidden h-14 border-b border-gray-800
        flex items-center px-4"
      >

        <button
          @click="ui.toggleSidebar()"
          class="text-xl"
        >
          ☰
        </button>
        

      </header>

      <main>
        <RouterView />
      </main>

    </div>

  </div>
</template>

<script setup lang="ts">
import { RouterView } from 'vue-router'

import Sidebar from '@/components/Sidebar.vue'

import { useUIStore } from '@/stores/useUIStore'

const ui = useUIStore()
</script>