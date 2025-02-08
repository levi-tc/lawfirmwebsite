<script setup lang="ts">
import { onMounted } from 'vue'
import { useSupabaseClient } from '#imports'
import { navigateTo } from '#imports'

const supabase = useSupabaseClient()

onMounted(async () => {
  try {
    const { error } = await supabase.auth.getSession()
    if (error) throw error
    
    // Redirect to home page after successful authentication
    navigateTo('/')
  } catch (e: any) {
    console.error('Error during authentication:', e.message)
    navigateTo('/auth/login')
  }
})
</script>

<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-md w-full space-y-8 text-center">
      <div class="animate-pulse">
        <h2 class="text-2xl font-semibold text-gray-900 dark:text-white">Authenticating...</h2>
        <p class="mt-2 text-gray-600 dark:text-gray-400">Please wait while we verify your credentials.</p>
      </div>
    </div>
  </div>
</template>