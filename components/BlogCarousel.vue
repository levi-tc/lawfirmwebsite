<script setup lang="ts">
import { ref } from 'vue'
import { Button } from '@/components/ui/button'

interface BlogPost {
  id: number
  title: string
  excerpt: string
  author: string
  date: string
  image: string
  category: string
}

const isVisible = ref(false)
const carouselRef = ref<HTMLElement | null>(null)
const showAll = ref(false)

const blogPosts = ref<BlogPost[]>([
  {
    id: 1,
    title: 'Understanding Corporate Law Reform 2024',
    excerpt: 'Key changes in corporate law and their implications for businesses in the coming year.',
    author: 'Sarah Johnson',
    date: 'March 15, 2024',
    image: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?q=80&w=500&auto=format&fit=crop',
    category: 'Corporate Law'
  },
  {
    id: 2,
    title: 'Estate Planning Essentials',
    excerpt: 'A comprehensive guide to protecting your assets and securing your family\'s future.',
    author: 'Michael Chen',
    date: 'March 12, 2024',
    image: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?q=80&w=500&auto=format&fit=crop',
    category: 'Estate Planning'
  },
  {
    id: 3,
    title: 'Navigating Employment Law Changes',
    excerpt: 'Recent developments in employment law and their impact on workplace policies.',
    author: 'Emily Rodriguez',
    date: 'March 10, 2024',
    image: 'https://images.unsplash.com/photo-1521791136064-7986c2920216?q=80&w=500&auto=format&fit=crop',
    category: 'Employment Law'
  },
  {
    id: 4,
    title: 'Intellectual Property in Digital Age',
    excerpt: 'Protecting your innovations and creative works in the modern digital landscape.',
    author: 'David Smith',
    date: 'March 8, 2024',
    image: 'https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?q=80&w=500&auto=format&fit=crop',
    category: 'IP Law'
  },
  {
    id: 5,
    title: 'Family Law Updates 2024',
    excerpt: 'Recent changes in family law and their implications for domestic cases.',
    author: 'Lisa Anderson',
    date: 'March 5, 2024',
    image: 'https://images.unsplash.com/photo-1594608661623-aa0bd3a69d98?q=80&w=500&auto=format&fit=crop',
    category: 'Family Law'
  },
  {
    id: 6,
    title: 'Real Estate Law Essentials',
    excerpt: 'Understanding the fundamentals of property law and real estate transactions.',
    author: 'James Wilson',
    date: 'March 3, 2024',
    image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?q=80&w=500&auto=format&fit=crop',
    category: 'Real Estate Law'
  }
])

const displayedPosts = computed(() => {
  return showAll.value ? blogPosts.value : blogPosts.value.slice(0, 3)
})

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

  if (carouselRef.value) {
    observer.observe(carouselRef.value)
  }
})
</script>

<template>
  <section
    ref="carouselRef"
    class="relative py-24 dark:bg-gray-900 transition-all duration-1000"
    :class="{ 'opacity-0 translate-y-10': !isVisible, 'opacity-100 translate-y-0': isVisible }"
  >
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center mb-16">
        <h2 class="text-4xl font-bold text-gray-900 dark:text-white mb-4">Legal Insights</h2>
        <p class="text-xl text-gray-600 dark:text-gray-300">Stay informed with our latest legal articles and updates</p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <div
          v-for="post in displayedPosts"
          :key="post.id"
          class="flex flex-col"
        >
          <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 h-full">
            <div class="aspect-video overflow-hidden">
              <img
                :src="post.image"
                :alt="post.title"
                class="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
              />
            </div>
            <div class="p-6 flex flex-col flex-grow">
              <div class="flex items-center justify-between mb-4">
                <span class="px-3 py-1 text-sm font-medium text-blue-600 bg-blue-100 rounded-full dark:text-blue-400 dark:bg-blue-900/50">
                  {{ post.category }}
                </span>
                <span class="text-sm text-gray-500 dark:text-gray-400">{{ post.date }}</span>
              </div>
              <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-2">{{ post.title }}</h3>
              <p class="text-gray-600 dark:text-gray-300 mb-4 flex-grow">{{ post.excerpt }}</p>
              <div class="flex items-center justify-between mt-auto">
                <span class="text-sm font-medium text-gray-700 dark:text-gray-300">By {{ post.author }}</span>
                <Button variant="link" class="text-blue-600 dark:text-blue-400">Read More →</Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="flex justify-center mt-12" v-if="blogPosts.length > 3">
        <Button 
          @click="showAll = !showAll"
          variant="outline"
          class="text-lg px-8"
        >
          {{ showAll ? 'Show Less' : 'Show More' }}
        </Button>
      </div>
    </div>
  </section>
</template>