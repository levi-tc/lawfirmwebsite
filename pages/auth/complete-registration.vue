<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-zinc-950 py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-md w-full space-y-8">
      <div>
        <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900 dark:text-white">
          Complete Your Registration
        </h2>
      </div>
      <form class="mt-8 space-y-6" @submit.prevent="handleCompleteRegistration">
        <div class="rounded-md shadow-sm -space-y-px">
          <div>
            <label for="email" class="sr-only">Email address</label>
            <input
              id="email"
              v-model="email"
              name="email"
              type="email"
              disabled
              class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 dark:border-zinc-700 placeholder-gray-500 dark:placeholder-zinc-400 text-gray-900 dark:text-white rounded-t-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm bg-white dark:bg-zinc-800"
              placeholder="Email address"
            />
          </div>
          <div>
            <label for="first-name" class="sr-only">First Name</label>
            <input
              id="first-name"
              v-model="firstName"
              name="first-name"
              type="text"
              required
              class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 dark:border-zinc-700 placeholder-gray-500 dark:placeholder-zinc-400 text-gray-900 dark:text-white focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm bg-white dark:bg-zinc-800"
              placeholder="First Name"
            />
          </div>
          <div>
            <label for="last-name" class="sr-only">Last Name</label>
            <input
              id="last-name"
              v-model="lastName"
              name="last-name"
              type="text"
              required
              class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 dark:border-zinc-700 placeholder-gray-500 dark:placeholder-zinc-400 text-gray-900 dark:text-white focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm bg-white dark:bg-zinc-800"
              placeholder="Last Name"
            />
          </div>
          <div>
            <label for="user-name" class="sr-only">User Name</label>
            <input
              id="user-name"
              v-model="userName"
              name="user-name"
              type="text"
              required
              class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 dark:border-zinc-700 placeholder-gray-500 dark:placeholder-zinc-400 text-gray-900 dark:text-white focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm bg-white dark:bg-zinc-800"
              placeholder="User name (handle)"
            />
          </div>
        </div>
        <div v-if="error" class="rounded-md bg-red-50 dark:bg-red-900/50 p-4">
          <div class="flex">
            <div class="flex-shrink-0">
              <svg class="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd" />
              </svg>
            </div>
            <div class="ml-3">
              <p class="text-sm font-medium text-red-800 dark:text-red-200">{{ error }}</p>
            </div>
          </div>
        </div>
        <div>
          <button
            type="submit"
            class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 dark:focus:ring-offset-gray-900"
          >
            Complete Registration
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useSupabaseClient } from '#imports';
import { useRouter } from 'vue-router';
import type { SupabaseClient } from '@supabase/supabase-js';

interface Profile {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  user_name: string;
}

interface Database {
  public: {
    Tables: {
      profiles: {
        Row: Profile;
        Insert: Profile;
      };
    };
  };
}

const supabase = useSupabaseClient();
const typedSupabase = supabase as unknown as SupabaseClient<Database>;
const router = useRouter();

const email = ref('');
const firstName = ref('');
const lastName = ref('');
const userName = ref('');
const error = ref('');

onMounted(async () => {
  // Fetch current session to prefill email
  const { data: { session } } = await supabase.auth.getSession();
  if (session && session.user) {
    email.value = session.user.email;
  } else {
    error.value = 'No active session found.';
  }
});

async function handleCompleteRegistration() {
  try {
    if (!firstName.value || !lastName.value || !userName.value) {
      error.value = 'Please fill in all fields';
      return;
    }
    // Get current user info
    const { data: { user }, error: userError } = await supabase.auth.getUser();
    if (userError || !user) {
      throw new Error('User not found');
    }
    // Prepare profile object
    const profile: Database["public"]["Tables"]["profiles"]["Insert"] = {
      id: user.id,
      first_name: firstName.value,
      last_name: lastName.value,
      email: email.value,
      user_name: userName.value
    };
    const { error: profileError } = await typedSupabase
      .from("profiles")
      .insert([profile]);
    if (profileError) throw profileError;
    router.push('/dashboard');
  } catch (e: any) {
    error.value = e.message;
  }
}
</script>

<style scoped>
/***** Add any necessary styles *****/
</style> 