<template>
  <section class="w-full py-12 md:py-24 lg:py-32 bg-background">
    <div class="container px-4 md:px-6">
      <h2 class="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center mb-8">Our Latest Videos</h2>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <!-- Video cards will go here -->
        <div class="rounded-lg overflow-hidden shadow-lg">
          <div class="aspect-video relative">
            <!-- Placeholder for video embed -->
            <div class="absolute inset-0 bg-gray-200 flex items-center justify-center">
              <span class="text-gray-500">Video Preview</span>
            </div>
          </div>
          <div class="p-4">
            <h3 class="font-semibold mb-2">Video Title</h3>
            <p class="text-sm text-gray-600">Video description goes here</p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
// Add video-related logic here
</script>