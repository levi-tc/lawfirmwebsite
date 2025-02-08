<script setup lang="ts">
import { ref } from 'vue'
import { useAutoAnimate } from '@formkit/auto-animate/vue'
import { Button } from '@/components/ui/button'
import { NuxtLink } from '#components'
import { Menu, X } from 'lucide-vue-next'

defineProps<{
  canLogin?: boolean
  canRegister?: boolean
}>()

const isOpen = ref(false)
const [parent] = useAutoAnimate()
</script>

<template>
  <nav class="md:fixed top-0 left-0 right-0 z-50 mx-auto max-w-[calc(100%-2.5rem)] bg-gray-50 shadow-xl rounded-2xl mx-5 mt-5 dark:bg-gray-800 border border-gray-200/50 dark:border-gray-700/50">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between h-16">
        <div class="flex items-center">
          <NuxtLink to="/" class="text-2xl font-bold text-gray-900 hover:text-gray-700 transition-colors dark:text-white dark:hover:text-gray-300">
            Cabinet Juridic
          </NuxtLink>
        </div>

        <!-- Mobile menu button -->
        <div class="flex items-center md:hidden">
          <button
            @click="isOpen = !isOpen"
            class="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-gray-900 hover:bg-gray-100 dark:text-gray-300 dark:hover:text-white dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary"
          >
            <span class="sr-only">Open main menu</span>
            <Menu v-if="!isOpen" class="block h-6 w-6" />
            <X v-else class="block h-6 w-6" />
          </button>
        </div>

        <!-- Desktop Navigation -->
        <div class="hidden md:flex items-center space-x-8" ref="parent">
          <NuxtLink to="#services" class="text-lg font-medium text-gray-700 hover:text-gray-900 transition-colors dark:text-gray-300 dark:hover:text-white">
            Servicii
          </NuxtLink>
          <NuxtLink to="#attorneys" class="text-lg font-medium text-gray-700 hover:text-gray-900 transition-colors dark:text-gray-300 dark:hover:text-white">
            Avocați
          </NuxtLink>
          <NuxtLink to="#about" class="text-lg font-medium text-gray-700 hover:text-gray-900 transition-colors dark:text-gray-300 dark:hover:text-white">
            Despre Noi
          </NuxtLink>
          <NuxtLink to="#contact" class="text-lg font-medium text-gray-700 hover:text-gray-900 transition-colors dark:text-gray-300 dark:hover:text-white">
            Contact
          </NuxtLink>
        </div>
      </div>

      <!-- Mobile Navigation -->
      <div
        v-show="isOpen"
        class="md:hidden"
        ref="parent"
      >
        <div class="px-2 pt-2 pb-3 space-y-1">
          <NuxtLink
            v-for="(link, index) in ['Servicii', 'Avocați', 'Despre Noi', 'Contact']"
            :key="index"
            :to="'#' + link.toLowerCase().replace(' ', '-')"
            class="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-100 dark:text-gray-300 dark:hover:text-white dark:hover:bg-gray-700"
            @click="isOpen = false"
          >
            {{ link }}
          </NuxtLink>
        </div>
      </div>
    </div>
  </nav>
</template>
<style scoped>
nav {
  /* Removed floating animation */
}
</style>