<script setup lang="ts">
import { Button } from './ui/button'
</script>

<template>
  <footer class="bg-gray-100 dark:bg-zinc-900 mt-16 rounded-t-3xl">
    <div class="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
      <div class="grid grid-cols-1 gap-8 lg:grid-cols-4 text-center lg:text-left">
        <!-- Company Info -->
        <div class="space-y-4 flex flex-col items-center lg:items-start">
          <h3 class="text-lg font-semibold text-gray-900 dark:text-white">Law Firm</h3>
          <p class="text-gray-600 dark:text-gray-300">
            Dedicated to providing exceptional legal services with integrity and professionalism.
          </p>
          <div class="flex space-x-4">
            <a href="#" class="text-gray-500 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-500">
              <span class="sr-only">Facebook</span>
              <svg class="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
              </svg>
            </a>
            <a href="#" class="text-gray-500 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-500">
              <span class="sr-only">Twitter</span>
              <svg class="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
              </svg>
            </a>
            <a href="#" class="text-gray-500 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-500">
              <span class="sr-only">LinkedIn</span>
              <svg class="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
              </svg>
            </a>
          </div>
        </div>

        <!-- Quick Links -->
        <div class="space-y-4 flex flex-col items-center lg:items-start">
          <h3 class="text-lg font-semibold text-gray-900 dark:text-white">Quick Links</h3>
          <ul class="space-y-3">
            <li>
              <NuxtLink to="#services" class="text-gray-600 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-500">Services</NuxtLink>
            </li>
            <li>
              <NuxtLink to="#about" class="text-gray-600 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-500">About Us</NuxtLink>
            </li>
            <li>
              <NuxtLink to="#contact" class="text-gray-600 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-500">Contact</NuxtLink>
            </li>
          </ul>
        </div>

        <!-- Contact Info -->
        <div class="space-y-4 flex flex-col items-center lg:items-start">
          <h3 class="text-lg font-semibold text-gray-900 dark:text-white">Contact Info</h3>
          <ul class="space-y-3">
            <li class="flex items-center space-x-3 text-gray-600 dark:text-gray-300">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <span>123 Law Street, City, State 12345</span>
            </li>
            <li class="flex items-center space-x-3 text-gray-600 dark:text-gray-300">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              <span>(123) 456-7890</span>
            </li>
            <li class="flex items-center space-x-3 text-gray-600 dark:text-gray-300">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              <span>info@lawfirm.com</span>
            </li>
          </ul>
        </div>

        <!-- Newsletter -->
        <div class="space-y-4 flex flex-col items-center lg:items-start">
          <h3 class="text-lg font-semibold text-gray-900 dark:text-white">Newsletter</h3>
          <p class="text-gray-600 dark:text-gray-300">Subscribe to our newsletter for updates and legal insights.</p>
          <form class="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-2 w-full max-w-md">
            <Input type="email" placeholder="Your email" class="flex-1 w-full" />
            <Button type="submit" class="w-full sm:w-auto">Subscribe</Button>
          </form>
        </div>
      </div>

      <!-- Copyright -->
      <div class="mt-12 border-t border-gray-200 dark:border-gray-800 pt-8">
        <p class="text-center text-gray-500 dark:text-gray-400">
          © {{ new Date().getFullYear() }} Law Firm. All rights reserved.
        </p>
      </div>
    </div>
  </footer>
</template>