// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    '@nuxtjs/supabase',
    '@nuxtjs/tailwindcss',
    'shadcn-nuxt',
    '@formkit/auto-animate'
  ],
  compatibilityDate: '2025-02-05',
  alias: {
    '@/lib/utils': './lib/utils.ts',
  },
  supabase: {
      redirect: false,
      redirectOptions: {
        login: '/auth/login',
        callback: '/auth/confirm',
        include: undefined,
        exclude: [],
        cookieRedirect: false
      }
    }
})