// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    '@nuxtjs/supabase',
    '@nuxtjs/tailwindcss',
    'shadcn-nuxt',
    '@formkit/auto-animate',
    '@nuxtjs/color-mode'
  ],
  compatibilityDate: '2025-02-05',
  alias: {
    '@/lib/utils': './lib/utils.ts',
  },
  nitro: {
    routeRules: {
      '/**': { cors: true }
    },
    devProxy: {
      '/api': {
        target: 'http://localhost:3000',
        changeOrigin: true,
        prependPath: true
      }
    }
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
    },
  colorMode: {
    classSuffix: '',
    preference: 'system',
    fallback: 'light',
    dataValue: 'theme',
    storageKey: 'nuxt-color-mode',
    classPrefix: '',
    componentName: 'ColorScheme',
    globalName: '__NUXT_COLOR_MODE__',
    hid: 'nuxt-color-mode-script',
    storage: 'localStorage'
  }
})