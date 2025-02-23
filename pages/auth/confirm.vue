<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { useSupabaseClient, navigateTo } from '#imports'

const supabase = useSupabaseClient()
const checkMessage = ref('Please confirm your email by clicking the link in your inbox. Once confirmed, you will be redirected to your dashboard.')
let intervalId: number | undefined

onMounted(() => {
  intervalId = window.setInterval(async () => {
    const { data: { session } } = await supabase.auth.getSession();
    if (session && session.user && session.user.email_confirmed_at) {
      clearInterval(intervalId);
      navigateTo('/dashboard');
    }
  }, 3000);
});

onUnmounted(() => {
  if (intervalId) clearInterval(intervalId);
});
</script>

<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-zinc-950 py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-md w-full space-y-8 text-center">
      <div class="animate-pulse">
        <h2 class="text-2xl font-semibold text-gray-900 dark:text-white">Authenticating...</h2>
        <p class="mt-2 text-gray-600 dark:text-zinc-400">Please wait while we verify your credentials.</p>
      </div>
    </div>
  </div>
</template>