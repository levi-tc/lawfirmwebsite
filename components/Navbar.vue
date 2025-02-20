<script setup lang="ts">
import { ref } from 'vue'
import { useAutoAnimate } from '@formkit/auto-animate/vue'
import { Button } from '@/components/ui/button'
import { NuxtLink } from '#components'
import { Menu, X } from 'lucide-vue-next'
import ThemeToggle from './ThemeToggle.vue'
import { useSupabaseClient, useSupabaseUser } from '#imports'
import AuthModal from './AuthModal.vue'

const isOpen = ref(false)
const [parent] = useAutoAnimate()

const user = useSupabaseUser()
const supabase = useSupabaseClient()

async function handleLogout() {
  try {
    const { error } = await supabase.auth.signOut()
    if (error) throw error
    navigateTo('/auth/login')
  } catch (e) {
    console.error('Error logging out:', e)
  }
}
</script>

<template>
  <nav class="fixed top-0 left-0 right-0 z-50 bg-white/80 dark:bg-zinc-950 backdrop-blur-md">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between h-20">
        <div class="flex items-center">
          <NuxtLink to="/" class="flex items-center">
            <img src="/logo_ro.svg" alt="Cabinet Juridic Logo" class="h-[100px] w-[140px] transition-all duration-200" />
          </NuxtLink>
        </div>

        <!-- Mobile menu button and theme toggle -->
        <div class="flex items-center md:hidden gap-2">
          <ThemeToggle />
          <div v-if="!user" class="flex gap-2">
            <AuthModal mode="login" />
            <AuthModal mode="register" />
          </div>
          <div v-else>
            <Button variant="outline" @click="handleLogout">Logout</Button>
          </div>
          <button
            @click="isOpen = !isOpen"
            class="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-gray-900 hover:bg-white/90 dark:text-white dark:hover:text-white dark:hover:bg-zinc-700/90 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary"
          >
            <span class="sr-only">Open main menu</span>
            <Menu v-if="!isOpen" class="block h-6 w-6" />
            <X v-else class="block h-6 w-6" />
          </button>
        </div>

        <!-- Desktop Navigation -->
        <div class="hidden md:flex items-center space-x-8" ref="parent">
          <NuxtLink to="#services" class="text-lg font-medium text-gray-700 hover:text-gray-900 transition-colors dark:text-white dark:hover:text-gray-100">
            Servicii
          </NuxtLink>
          <NuxtLink to="#attorneys" class="text-lg font-medium text-gray-700 hover:text-gray-900 transition-colors dark:text-white dark:hover:text-gray-100">
            Avocați
          </NuxtLink>
          <NuxtLink to="#about" class="text-lg font-medium text-gray-700 hover:text-gray-900 transition-colors dark:text-white dark:hover:text-gray-100">
            Despre Noi
          </NuxtLink>
          <NuxtLink to="#contact" class="text-lg font-medium text-gray-700 hover:text-gray-900 transition-colors dark:text-white dark:hover:text-gray-100">
            Contact
          </NuxtLink>
          <ThemeToggle /> 
        </div>
      </div>

      <!-- Mobile Navigation -->
      <div
        v-show="isOpen"
        class="md:hidden bg-white/95 dark:bg-black/95 backdrop-blur-md"
        ref="parent"
      >
        <div class="px-2 pt-2 pb-3 space-y-1">
          <NuxtLink
            v-for="(link, index) in ['Servicii', 'Avocați', 'Despre Noi', 'Contact']"
            :key="index"
            :to="'#' + link.toLowerCase().replace(' ', '-')"
            class="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-100/90 dark:text-white dark:hover:text-gray-100 dark:hover:bg-zinc-700/90"
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