<template>
  <div class="main-container">
    <Navbar />
    <div class="content-container">
      <!-- <Hero />
      <Services />
      <AboutUs />
      <BlogCarousel />
      <VideoCarousel /> 
      <Testimonials />
      <Contact /> -->
      <NuxtPage />
    </div>
    <NuxtRouteAnnouncer />
    <Footer />
  </div>
</template>

<script setup>
import Footer from './components/Footer.vue'
</script>

<style>
.main-container {
  min-height: 100vh;
  overflow-x: hidden;
  position: relative;
}

.content-container {
  display: flex;
  flex-direction: column;
  gap: 4rem;
  padding-top: 5rem;
  overflow-y: auto;
}

@media (min-width: 768px) {
  .content-container {
    padding: 2rem;
    /* gap: 6rem; */
  }
}
</style>
