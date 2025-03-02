<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-zinc-950 py-12 px-4">
    <div class="max-w-md w-full space-y-4">
      <h2 class="text-2xl font-bold text-center">Email Confirmation</h2>
      <p class="text-center">
        Please check your inbox for a confirmation email. Once you have verified your email, click the button below.
      </p>
      <div class="bg-blue-50 dark:bg-blue-900/30 p-4 rounded-md">
        <p class="text-sm text-blue-800 dark:text-blue-200">
          <strong>Next step:</strong> After verifying your email, you'll need to complete your profile by adding your first name, last name, and username.
        </p>
      </div>
      <button @click="checkVerification" class="w-full py-2 bg-blue-600 text-white rounded">
        I've verified my email
      </button>
      <p v-if="error" class="text-red-600 text-center">{{ error }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useSupabaseClient, navigateTo } from '#imports';

const supabase = useSupabaseClient();
const error = ref('');

async function checkVerification() {
  // Refresh the session to get latest user data
  const { data: { session }, error: sessionError } = await supabase.auth.getSession();
  if (sessionError) {
    error.value = sessionError.message;
    return;
  }
  if (session && session.user) {
    // Check if the email is verified. The property may be 'confirmed_at' or 'email_confirmed_at' depending on your Supabase setup.
    if (session.user.confirmed_at) {
      // Redirect to complete registration page
      navigateTo('/auth/complete-registration');
    } else {
      error.value = 'Email not verified yet. Please check your inbox and click the confirmation link.';
    }
  } else {
    error.value = 'No active session found. Please log in again.';
  }
}
</script>

<style scoped>
.max-w-md {
  max-width: 420px;
}
</style>