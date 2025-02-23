<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { useSupabaseClient, navigateTo } from '#imports'
import { SupabaseClient } from '@supabase/supabase-js'

const email = ref('')
const password = ref('')
const error = ref('')

const supabase = useSupabaseClient()
const typedSupabase = supabase as unknown as SupabaseClient<Database>

// Added isOpen ref and submitForm function for storing contact form data into Supabase
const isOpen = ref(false);

interface FormValues {
  name: string;
  email: string;
  phone: string;
  message: string;
}

// Added Contact interface and updated submitForm to insert into 'contacts' table as an array
interface Contact {
  name: string;
  email: string;
  phone: string;
  message: string;
}

// Define a local Database interface for Supabase typings
interface Database {
  public: {
    Tables: {
      contacts: {
        Row: Contact;
        Insert: Contact;
      };
    };
  };
}

async function submitForm(values: FormValues) {
  const contact: Database["public"]["Tables"]["contacts"]["Insert"] = {
    name: values.name,
    email: values.email,
    phone: values.phone,
    message: values.message
  };

  const { data, error: insertError } = await typedSupabase
    .from("contacts")
    .insert([contact]);
  if (insertError) {
    throw insertError;
  }
  return data;
}

const handleSubmit = async (values: FormValues) => {
  try {
    await submitForm(values);
    isOpen.value = false;
  } catch (e) {
    console.error(e);
  }
}

async function handleLogin() {
  try {
    const { error: signInError } = await supabase.auth.signInWithPassword({
      email: email.value,
      password: password.value
    })

    if (signInError) throw signInError

    // Redirect to home page after successful login
    navigateTo('/auth/confirm')
  } catch (e: any) {
    const errorMessage = 'Authentication failed: ' + e.message;
    // Show error to user through UI
    showError(errorMessage);
    navigateTo('/auth/login');
  }
}

async function handleSocialLogin(provider: 'google') {
  try {
    if (provider === 'google') {
      const { error: signInError } = await supabase.auth.signInWithOAuth({
        provider,
        options: {
          redirectTo: 'http://localhost:3000/auth/complete-registration'
        }
      });
      if (signInError) throw signInError;
      // For Google, redirection is handled by the browser after OAuth
    } else {
      const { error: signInError } = await supabase.auth.signInWithOAuth({
        provider
      });
      if (signInError) throw signInError;
      navigateTo('/auth/confirm');
    }
  } catch (e: any) {
    error.value = e.message;
  }
}

onMounted(() => {
  // Removed unnecessary IntersectionObserver code
});
</script>

<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-zinc-950 py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-md w-full space-y-8">
      <div>
        <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900 dark:text-white">
          Sign in to your account
        </h2>
      </div>
      <form class="mt-8 space-y-6" @submit.prevent="handleLogin">
        <div class="rounded-md shadow-sm -space-y-px">
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
              class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 dark:border-zinc-700 placeholder-gray-500 dark:placeholder-zinc-400 text-gray-900 dark:text-white rounded-b-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:focus:ring-blue-400 dark:focus:border-blue-400 focus:z-10 sm:text-sm bg-white dark:bg-zinc-800"
              placeholder="Password"
            />
          </div>
        </div>

        <div v-if="error" class="text-red-500 text-sm text-center">
          {{ error }}
        </div>

        <div>
          <button
            type="submit"
            class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 dark:focus:ring-offset-gray-900"
          >
            Sign in
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

        <div class="text-center mt-4">
          <NuxtLink
            to="/auth/register"
            class="font-medium text-blue-600 hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300"
          >
            Don't have an account? Sign up
          </NuxtLink>
        </div>
      </form>
    </div>
  </div>
</template>