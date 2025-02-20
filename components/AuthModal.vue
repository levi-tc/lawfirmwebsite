<script setup lang="ts">
import { ref } from 'vue'
import { useSupabaseClient, navigateTo } from '#imports'
import { Button } from './ui/button'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from './ui/dialog'

const props = defineProps<{
  mode: 'login' | 'register'
}>()

const email = ref('')
const password = ref('')
const confirmPassword = ref('')
const error = ref('')
const isOpen = ref(false)

const supabase = useSupabaseClient()

async function handleSubmit() {
  try {
    if (props.mode === 'register') {
      if (password.value !== confirmPassword.value) {
        error.value = 'Passwords do not match'
        return
      }

      const { error: signUpError } = await supabase.auth.signUp({
        email: email.value,
        password: password.value
      })

      if (signUpError) throw signUpError
      navigateTo('/auth/confirm')
    } else {
      const { error: signInError } = await supabase.auth.signInWithPassword({
        email: email.value,
        password: password.value
      })

      if (signInError) throw signInError
      navigateTo('/')
    }

    isOpen.value = false
  } catch (e: any) {
    error.value = e.message
  }
}

async function handleSocialLogin(provider: 'google' | 'facebook') {
  try {
    const { error: signInError } = await supabase.auth.signInWithOAuth({
      provider
    })

    if (signInError) throw signInError
  } catch (e: any) {
    error.value = e.message
  }
}
</script>

<template>
  <Dialog v-model:open="isOpen">
    <DialogTrigger asChild>
      <Button variant="outline">
        {{ mode === 'login' ? 'Sign In' : 'Register' }}
      </Button>
    </DialogTrigger>
    <DialogContent class="sm:max-w-[425px]">
      <DialogHeader>
        <DialogTitle>{{ mode === 'login' ? 'Sign In' : 'Create Account' }}</DialogTitle>
      </DialogHeader>
      <form @submit.prevent="handleSubmit" class="space-y-4">
        <div class="space-y-2">
          <label for="email" class="text-sm font-medium">Email</label>
          <input
            id="email"
            v-model="email"
            type="email"
            required
            class="w-full px-3 py-2 border rounded-md dark:border-gray-700 dark:bg-gray-800"
          />
        </div>
        <div class="space-y-2">
          <label for="password" class="text-sm font-medium">Password</label>
          <input
            id="password"
            v-model="password"
            type="password"
            required
            class="w-full px-3 py-2 border rounded-md dark:border-gray-700 dark:bg-gray-800"
          />
        </div>
        <div v-if="mode === 'register'" class="space-y-2">
          <label for="confirm-password" class="text-sm font-medium">Confirm Password</label>
          <input
            id="confirm-password"
            v-model="confirmPassword"
            type="password"
            required
            class="w-full px-3 py-2 border rounded-md dark:border-gray-700 dark:bg-gray-800"
          />
        </div>
        <div v-if="error" class="text-sm text-red-500">{{ error }}</div>
        <Button type="submit" class="w-full">
          {{ mode === 'login' ? 'Sign In' : 'Register' }}
        </Button>
      </form>
      <div class="mt-4 space-y-2">
        <Button @click="handleSocialLogin('google')" variant="outline" class="w-full">
          Continue with Google
        </Button>
        <Button @click="handleSocialLogin('facebook')" variant="outline" class="w-full">
          Continue with Facebook
        </Button>
      </div>
    </DialogContent>
  </Dialog>
</template>