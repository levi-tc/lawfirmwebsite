<script setup lang="ts">
import { ref } from 'vue'
import { useSupabaseClient, navigateTo } from '#imports'
import { SupabaseClient } from '@supabase/supabase-js'
import { useRouter } from 'vue-router'

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

const email = ref('')
const password = ref('')
const confirmPassword = ref('')
const error = ref('')

const supabase = useSupabaseClient()
const typedSupabase = supabase as unknown as SupabaseClient<Database>

// Initialize router outside the function
const router = useRouter();

async function handleRegister() {
  try {
    if (password.value !== confirmPassword.value) {
      error.value = 'Passwords do not match'
      return
    }

    const { data, error: signUpError } = await supabase.auth.signUp({
      email: email.value,
      password: password.value,
      options: {}
    })

    if (signUpError) throw signUpError

    // Redirect user to the email verification page after sign-up
    window.location.href = '/auth/confirm';
  } catch (e: any) {
    error.value = e.message
  }
}

// Updated handleSocialLogin to use browser redirect
async function handleSocialLogin(provider: 'google') {
  try {
    const { error: signInError } = await supabase.auth.signInWithOAuth({
      provider,
      options: {
        redirectTo: 'http://localhost:3000/auth/complete-registration'
      }
    });
    if (signInError) throw signInError;
    // No manual redirect needed; the browser will handle it
  } catch (e: any) {
    error.value = e.message;
  }
}
</script>

<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-zinc-950 py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-md w-full space-y-8">
      <div>
        <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900 dark:text-white">
          Create your account
        </h2>
      </div>
      <form class="mt-8 space-y-6" @submit.prevent="handleRegister">
        <div class="rounded-md shadow-sm -space-y-px ">
          <div>
            <label for="email-address" class="sr-only">Email address</label>
            <input
              id="email-address"
              v-model="email"
              name="email"
              type="email"
              required
              class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 dark:border-zinc-700 placeholder-gray-500 dark:placeholder-zinc-400 text-gray-900 dark:text-white rounded-t-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:focus:ring-blue-400 dark:focus:border-blue-400 focus:z-10 sm:text-sm bg-white dark:bg-zinc-800"
              placeholder="Email address"
            />
          </div>
          <div>
            <label for="password" class="sr-only">Password</label>
            <input
              id="password"
              v-model="password"
              name="password"
              type="password"
              required
              class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 dark:border-zinc-700 placeholder-gray-500 dark:placeholder-zinc-400 text-gray-900 dark:text-white focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:focus:ring-blue-400 dark:focus:border-blue-400 focus:z-10 sm:text-sm bg-white dark:bg-zinc-800"
              placeholder="Password"
            />
          </div>
          <div>
            <label for="confirm-password" class="sr-only">Confirm Password</label>
            <input
              id="confirm-password"
              v-model="confirmPassword"
              name="confirm-password"
              type="password"
              required
              class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 dark:border-zinc-700 placeholder-gray-500 dark:placeholder-zinc-400 text-gray-900 dark:text-white focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:focus:ring-blue-400 dark:focus:border-blue-400 focus:z-10 sm:text-sm bg-white dark:bg-zinc-800"
              placeholder="Confirm password"
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
            Register
          </button>
        </div>

        <div class="mt-4 space-y-3">
          <button
            type="button"
            @click="handleSocialLogin('google')"
            class="w-full flex items-center justify-center px-4 py-2 border border-gray-300 dark:border-zinc-700 rounded-md shadow-sm text-sm font-medium text-gray-700 dark:text-white bg-white dark:bg-zinc-800 hover:bg-gray-50 dark:hover:bg-zinc-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#4285F4] dark:focus:ring-offset-gray-900 transition-colors duration-200"
          >
            <div class="bg-white p-1 rounded mr-2">
              <svg class="h-4 w-4" viewBox="0 0 24 24">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
              </svg>
            </div>
            Continue with Google
          </button>

        </div>

        <div class="text-center">
          <NuxtLink
            to="/auth/login"
            class="font-medium text-blue-600 hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300"
          >
            Already have an account? Sign in
          </NuxtLink>
        </div>
      </form>
    </div>
  </div>
</template>