<template>
  <div class="content-container">
    <Hero />
    <Services />
    <AboutUs />
    <BlogCarousel />
    <Testimonials />
    <Contact />

  </div>
</template>

<script setup>
import Hero from '../components/Hero.vue'
import Services from '../components/Services.vue'
import AboutUs from '../components/AboutUs.vue'
import BlogCarousel from '../components/BlogCarousel.vue'
import Testimonials from '../components/Testimonials.vue'
import Contact from '../components/Contact.vue'
</script>

<style scoped>
.content-container {
  display: flex;
  flex-direction: column;
  gap: 4rem;
  padding-top: 0.2rem;
  overflow-y: auto;
}

@media (min-width: 768px) {
  .content-container {
    padding: 2rem;
  }
}
</style>