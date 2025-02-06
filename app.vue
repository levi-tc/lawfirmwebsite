<template>
  <div class="main-container">
    <Navbar />
    <div class="content-container">
      <Hero />
      <Services />
      <AboutUs />
      <BlogCarousel />
      <VideoCarousel />
      <Testimonials />
    </div>
    <NuxtRouteAnnouncer />
  </div>
</template>

<style>
.main-container {
  min-height: 100vh;
  overflow-x: hidden;
}

.content-container {
  display: flex;
  flex-direction: column;
  /* gap: 4rem;
  padding: 1rem; */
}

@media (min-width: 768px) {
  .content-container {
    padding: 2rem;
    /* gap: 6rem; */
  }
}
</style>
