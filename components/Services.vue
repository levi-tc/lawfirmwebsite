<script setup lang="ts">
import { ref, onMounted } from 'vue'

interface Service {
  title: string
  description: string
  icon: string
}

const isVisible = ref(false)
const servicesRef = ref<HTMLElement | null>(null)

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

  if (servicesRef.value) {
    observer.observe(servicesRef.value)
  }
})

const services = ref<Service[]>([
  {
    title: 'Drept Corporativ',
    description: 'Consultanță specializată în formarea companiilor, fuziuni și achiziții, și guvernanță corporativă.',
    icon: 'M20 7L12 3L4 7M20 7L12 11M20 7V17L12 21M12 11L4 7M12 11V21M4 7V17L12 21'
  },
  {
    title: 'Drept Familial',
    description: 'Reprezentare cu empatie în divorț, custodie și alte aspecte juridice familiale.',
    icon: 'M2 20h.01m18 0h.01M4 20h.01m2 0h.01m2 0h.01m2 0h.01m2 0h.01M3 20a1 1 0 1 1 0-2a1 1 0 0 1 0 2m4 0a1 1 0 1 1 0-2a1 1 0 0 1 0 2m4 0a1 1 0 1 1 0-2a1 1 0 0 1 0 2M4 4h16a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1'
  },
  {
    title: 'Drept Imobiliar',
    description: 'Servicii juridice complete pentru tranzacții imobiliare, închirieri și litigii imobiliare.',
    icon: 'M3 21h18M3 10h18M3 7l9-4l9 4M4 10v11m16-11v11M8 14v3m4-3v3m4-3v3'
  },
  {
    title: 'Litigii',
    description: 'Reprezentare și pledoarie puternică în litigii civile și comerciale.',
    icon: 'M3 21h18M3 7v1a3 3 0 0 0 3 3h12a3 3 0 0 0 3-3V7m-2-4H7a2 2 0 0 0-2 2v12m14-12v12M3 3l18 18'
  }
])
</script>

<template>
  <section
    id="services"
    ref="servicesRef"
    class="relative min-h-[40vh] py-8 sm:py-12 lg:py-20 bg-white dark:bg-transparent transition-all duration-300"
    :class="{ 'opacity-0 translate-y-10': !isVisible, 'opacity-100 translate-y-0': isVisible }"
  >
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
        <div
          v-for="service in services"
          :key="service.title"
          class="group relative bg-white dark:bg-black p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-200 dark:border-zinc-800"
        >
          <div class="absolute -top-3 left-4">
            <div class="bg-blue-600 rounded-lg p-2 inline-flex">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-5 w-5 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                stroke-width="2"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  :d="service.icon"
                />
              </svg>
            </div>
          </div>

          <h3 class="mt-6 text-lg font-semibold text-gray-900 dark:text-white mb-2">
            {{ service.title }}
          </h3>
          <p class="text-sm text-gray-600 dark:text-gray-300">
            {{ service.description }}
          </p>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.group:hover {
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
}
</style>