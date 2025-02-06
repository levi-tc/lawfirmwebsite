<script setup lang="ts">
import { ref } from 'vue'
import { useAutoAnimate } from '@formkit/auto-animate/vue'
import { Button } from '@/components/ui/button'
import { NuxtLink } from '#components'

defineProps<{
  canLogin?: boolean
  canRegister?: boolean
}>()

const isOpen = ref(false)
const [parent] = useAutoAnimate()
</script>

<template>
  <nav class="fixed top-0 left-0 right-0 z-50 bg-gray-50 shadow-xl dark:bg-gray-800 border border-gray-200/50 dark:border-gray-700/50 sm:mx-auto sm:max-w-[calc(100%-2.5rem)] sm:rounded-2xl sm:mt-5 sm:mx-5">
    <div class="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
      <div class="flex justify-between h-14 sm:h-16">
        <div class="flex items-center">
          <NuxtLink to="/" class="text-xl sm:text-2xl font-bold text-gray-900 hover:text-gray-700 transition-colors dark:text-white dark:hover:text-gray-300">
            LawFirm
          </NuxtLink>
        </div>

        <!-- Desktop Navigation -->
        <div class="hidden md:flex items-center space-x-8" ref="parent">
          <NuxtLink to="#services" class="text-lg font-medium text-gray-700 hover:text-gray-900 transition-colors dark:text-gray-300 dark:hover:text-white">
            Services
          </NuxtLink>
          <NuxtLink to="#attorneys" class="text-lg font-medium text-gray-700 hover:text-gray-900 transition-colors dark:text-gray-300 dark:hover:text-white">
            Attorneys
          </NuxtLink>
          <NuxtLink to="#testimonials" class="text-lg font-medium text-gray-700 hover:text-gray-900 transition-colors dark:text-gray-300 dark:hover:text-white">
            Testimonials
          </NuxtLink>
          <NuxtLink to="#contact" class="text-lg font-medium text-gray-700 hover:text-gray-900 transition-colors dark:text-gray-300 dark:hover:text-white">
            Contact
          </NuxtLink>
        </div>

        <!-- Mobile menu button -->
        <div class="flex items-center md:hidden">
          <button
            @click="isOpen = !isOpen"
            class="inline-flex items-center justify-center p-2 rounded-lg text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500 dark:hover:bg-gray-700 dark:hover:text-white"
          >
            <span class="sr-only">Open main menu</span>
            <svg
              class="block h-5 w-5 sm:h-6 sm:w-6"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>
      </div>

      <!-- Mobile Navigation Menu -->
      <div :class="{ block: isOpen, hidden: !isOpen }" class="md:hidden">
        <div class="px-2 pt-2 pb-3 space-y-1">
          <NuxtLink
            to="#services"
            class="block px-3 py-2.5 rounded-lg text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50 transition-colors dark:text-gray-300 dark:hover:text-white dark:hover:bg-gray-700"
          >
            Services
          </NuxtLink>
          <NuxtLink
            to="#attorneys"
            class="block px-3 py-2.5 rounded-lg text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50 transition-colors dark:text-gray-300 dark:hover:text-white dark:hover:bg-gray-700"
          >
            Attorneys
          </NuxtLink>
          <NuxtLink
            to="#testimonials"
            class="block px-3 py-2.5 rounded-lg text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50 transition-colors dark:text-gray-300 dark:hover:text-white dark:hover:bg-gray-700"
          >
            Testimonials
          </NuxtLink>
          <NuxtLink
            to="#contact"
            class="block px-3 py-2.5 rounded-lg text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50 transition-colors dark:text-gray-300 dark:hover:text-white dark:hover:bg-gray-700"
          >
            Contact
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