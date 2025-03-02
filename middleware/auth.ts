import { defineNuxtRouteMiddleware, useSupabaseClient, navigateTo } from '#imports'

export default defineNuxtRouteMiddleware(async (to, from) => {
  const supabase = useSupabaseClient()
  
  // Check if user is authenticated using getUser() which verifies with the server
  const { data: { user }, error: userError } = await supabase.auth.getUser()
  
  // If no authenticated user exists or there's an error, redirect to login page
  if (userError || !user) {
    return navigateTo('/auth/login')
  }
  
  // Check if user has a profile in the database
  const { data: profile, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .single()
  
  // If no profile exists, redirect to complete registration
  if (error || !profile) {
    return navigateTo('/auth/complete-registration')
  }
}) 