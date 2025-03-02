<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useSupabaseClient } from '#imports'
import Hero from '../components/Hero.vue'

// Add definePageMeta to apply the auth middleware
definePageMeta({
  middleware: ['auth']
})

const supabase = useSupabaseClient()
const errorMsg = ref('')

async function ensureProfile() {
  const { data: { user }, error: userError } = await supabase.auth.getUser();
  if (userError) {
    console.error('Error fetching authenticated user:', userError);
    errorMsg.value = 'Authentication error. Please try logging in again.';
    return;
  }
  
  if (user) {
    // Check if the profile record already exists
    const { data: profiles, error: selectError } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', user.id);
    if (selectError) {
      console.error('Error fetching profile:', selectError);
      return;
    }
    // If no profile exists, create one
    if (!profiles || profiles.length === 0) {
      const { error: insertError } = await supabase
        .from('profiles')
        .insert([{ 
          id: user.id,
          first_name: (user.user_metadata && user.user_metadata.first_name) || '',
          last_name: (user.user_metadata && user.user_metadata.last_name) || '',
          email: user.email
        }]);
      if (insertError) {
        console.error('Error inserting profile:', insertError);
        errorMsg.value = 'There was an error creating your profile.';
      }
    }
  }
}

onMounted(() => {
  ensureProfile();
});
</script>

<template>
  <div class="p-4">
    <h1 class="text-2xl font-bold">Dashboard</h1>
    <p>Welcome to your dashboard!</p>
    <p v-if="errorMsg" class="text-red-500">{{ errorMsg }}</p>
  </div>
</template>

<style>
</style>