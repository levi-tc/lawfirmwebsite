<script setup lang="ts">
import { ref } from 'vue'

const isVisible = ref(false)
const aboutRef = ref<HTMLElement | null>(null)

onMounted(() => {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          isVisible.value = true
          observer.disconnect()
        }
      })
    },
    {
      threshold: 0.1
    }
  )

  if (aboutRef.value) {
    observer.observe(aboutRef.value)
  }
})
</script>

<template>
  <section
    id="about"
    ref="aboutRef"
    class="relative py-16 sm:py-20 bg-gray-200 dark:bg-zinc-900  transition-all duration-300 flex items-center rounded-3xl mx-4 sm:mx-6 lg:mx-8"
    :class="{ 'opacity-0 translate-y-10': !isVisible, 'opacity-100 translate-y-0': isVisible }"
  >
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center mb-16">
        <h2 class="text-4xl font-bold text-gray-900 dark:text-white mb-4">Despre Noi</h2>
        <p class="text-xl text-gray-600 dark:text-gray-300">Dedicați Excelenței în Servicii Juridice</p>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center justify-items-center">
        <div class="space-y-6 text-center max-w-xl bg-white dark:bg-zinc-800 p-8 rounded-2xl shadow-lg">
          <h3 class="text-2xl font-semibold text-gray-900 dark:text-white">Misiunea Noastră</h3>
          <p class="text-lg text-gray-600 dark:text-gray-300">
            La LawFirm, suntem dedicați să oferim reprezentare juridică excepțională, menținând cele mai înalte standarde de integritate profesională. Misiunea noastră este de a oferi soluții juridice inovatoare, adaptate nevoilor unice ale fiecărui client.
          </p>
          
          <h3 class="text-2xl font-semibold text-gray-900 dark:text-white">Valorile Noastre</h3>
          <ul class="space-y-4 inline-block text-left mx-auto bg-gray-100 dark:bg-zinc-900 p-6 rounded-xl">
            <li class="flex items-start">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-blue-600 mr-2 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
              </svg>
              <span class="text-lg text-gray-600 dark:text-gray-300">Excelență în fiecare aspect al practicii noastre</span>
            </li>
            <li class="flex items-start">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-blue-600 mr-2 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
              </svg>
              <span class="text-lg text-gray-600 dark:text-gray-300">Angajament neclintit pentru succesul clienților</span>
            </li>
            <li class="flex items-start">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-blue-600 mr-2 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
              </svg>
              <span class="text-lg text-gray-600 dark:text-gray-300">Integritate și transparență în toate relațiile</span>
            </li>
          </ul>
        </div>

        <div class="relative rounded-2xl overflow-hidden shadow-xl">
          <img
            src="https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=1200&h=800&auto=format&fit=crop"
            alt="Interior birou juridic"
            class="w-full h-full object-cover"
          />
          <div class="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent">
            <div class="absolute bottom-0 left-0 right-0 p-6">
              <p class="text-white text-lg font-medium">Biroul nostru în inima orașului</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>