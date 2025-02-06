<script setup lang="ts">
import { ref, onMounted } from 'vue'

interface Testimonial {
  name: string
  role: string
  image: string
  content: string
  rating: number
}

const isVisible = ref(false)
const testimonialsRef = ref<HTMLElement | null>(null)

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

  if (testimonialsRef.value) {
    observer.observe(testimonialsRef.value)
  }
})

const testimonials = ref<Testimonial[]>([
  {
    name: 'Michael Thompson',
    role: 'CEO, Tech Innovations Inc.',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=200&h=200&auto=format&fit=crop',
    content: 'The corporate law team provided exceptional guidance during our merger. Their expertise and attention to detail made a complex process seamless.',
    rating: 5
  },
  {
    name: 'Emily Rodriguez',
    role: 'Small Business Owner',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200&h=200&auto=format&fit=crop',
    content: 'Their real estate legal team helped me navigate multiple property acquisitions. Their knowledge and professionalism are unmatched.',
    rating: 5
  },
  {
    name: 'David Chen',
    role: 'Family Client',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&h=200&auto=format&fit=crop',
    content: 'During a difficult divorce, their family law team showed both compassion and strength in representing my interests. Highly recommended.',
    rating: 5
  }
])
</script>

<template>
  <section
    id="testimonials"
    ref="testimonialsRef"
    class="relative py-12 sm:py-24 dark:bg-gray-950 transition-all duration-1000"
    :class="{ 'opacity-0 translate-y-10': !isVisible, 'opacity-100 translate-y-0': isVisible }"
  >
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center mb-16">
        <h2 class="text-4xl font-bold text-gray-900 dark:text-white mb-4">Client Testimonials</h2>
        <p class="text-xl text-gray-600 dark:text-gray-300">What our clients say about us</p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <div
          v-for="testimonial in testimonials"
          :key="testimonial.name"
          class="group bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-200 dark:border-gray-700"
        >
          <div class="flex items-center mb-6">
            <img
              :src="testimonial.image"
              :alt="testimonial.name"
              class="h-12 w-12 rounded-full object-cover"
            />
            <div class="ml-4">
              <h3 class="text-lg font-semibold text-gray-900 dark:text-white">{{ testimonial.name }}</h3>
              <p class="text-sm text-gray-600 dark:text-gray-400">{{ testimonial.role }}</p>
            </div>
          </div>

          <div class="mb-4 flex">
            <svg
              v-for="star in testimonial.rating"
              :key="star"
              xmlns="http://www.w3.org/2000/svg"
              class="h-5 w-5 text-yellow-400"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
              />
            </svg>
          </div>

          <p class="text-gray-600 dark:text-gray-300 italic">"{{ testimonial.content }}"</p>
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