<script setup lang="ts">
import { ref } from 'vue'
import { Button } from '@/components/ui/button'

interface Attorney {
  name: string
  role: string
  image: string
  description: string
  specialties: string[]
  education: string[]
}

const attorney = ref<Attorney>({
  name: 'Sarah Johnson',
  role: 'Partener Senior',
  image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=500&h=500&auto=format&fit=crop',
  description: 'Cu peste 15 ani de experiență în drept corporativ, Sarah Johnson s-a impus ca un consilier de încredere pentru companii de toate dimensiunile. Abordarea sa strategică și înțelegerea profundă a aspectelor juridice complexe au adus în mod constant rezultate excepționale pentru clienții săi.',
  specialties: [
    'Drept Corporativ',
    'Fuziuni și Achiziții',
    'Litigii Comerciale',
    'Negociere Contracte'
  ],
  education: [
    'Doctor în Drept, Harvard Law School',
    'Licență în Economie, Yale University'
  ]
})
</script>

<template>
  <section class="relative overflow-hidden bg-white dark:bg-gray-900 min-h-[50vh] flex items-center justify-center pt-16 pb-6 lg:pt-28 lg:pb-8 mt-4 lg:mt-8">
    <div class="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="grid lg:grid-cols-2 gap-6 lg:gap-12 items-center">
        <!-- Text Content -->
        <div class="space-y-6 lg:space-y-8 text-center lg:text-left lg:order-1">
          <!-- Text Content Section -->
          <div class="space-y-4">
            <h1 class="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-gray-900 dark:text-white">
              Expertiză in domeniul
              <span class="text-blue-600 block mt-2">Juridic</span>
            </h1>
            <p class="text-lg sm:text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto lg:mx-0">
              Dedicați să oferim servicii juridice excepționale cu o abordare personalizată pentru a răspunde nevoilor dumneavoastră unice.
            </p>
          </div>

          <div class="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
            <Button size="lg" class="text-base sm:text-lg bg-blue-600 hover:bg-blue-700 w-full sm:w-auto px-8" asChild>
              <NuxtLink to="#contact">Programează o Consultație</NuxtLink>
            </Button>
            <Button size="lg" variant="outline" class="text-base sm:text-lg w-full sm:w-auto px-8" asChild>
              <NuxtLink to="#services">Serviciile Noastre</NuxtLink>
            </Button>
          </div>
        </div>

        <!-- Attorney Profile Image with Overlay -->
        <div class="relative aspect-[3/4] sm:aspect-[16/9] lg:aspect-[4/3] overflow-hidden rounded-2xl group lg:order-2 max-w-md mx-auto w-full shadow-2xl">
          <img
            :src="attorney.image"
            :alt="attorney.name"
            class="absolute inset-0 h-full w-full object-cover"
          />
          <div class="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent py-6 px-4">
            <h3 class="text-xl font-semibold text-white mb-2">{{ attorney.name }}</h3>
            <p class="text-sm text-gray-200 line-clamp-2">{{ attorney.description }}</p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>