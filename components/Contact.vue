<script setup lang="ts">
import { ref } from 'vue'
import { Button } from '../components/ui/button'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/Dialog'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { useForm } from 'vee-validate'
import * as z from 'zod'

const isOpen = ref(false)

const formSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email'),
  phone: z.string().min(10, 'Please enter a valid phone number'),
  message: z.string().min(10, 'Message must be at least 10 characters')
})

const form = useForm({
  validationSchema: formSchema
})

const handleSubmit = async (values) => {
  // Handle form submission here
  console.log(values)
  isOpen.value = false
}
</script>

<template>
  <section id="contact" class="py-16 dark:bg-gray-900 rounded-3xl mx-4 sm:mx-6 lg:mx-8">
    <div class="container mx-auto px-4">
      <div class="grid md:grid-cols-2 gap-8">
        <!-- Platform Recommendation Section -->
        <div class="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg transform transition-transform hover:scale-[1.02]">
          <h2 class="text-3xl font-bold mb-4 text-gray-900 dark:text-white">Learn More About Our Services</h2>
          <p class="text-gray-600 dark:text-gray-300 mb-6">
            Visit our comprehensive platform to explore detailed information about our legal services,
            case studies, and success stories. Get insights into how we can help protect your rights
            and achieve the best possible outcomes for your case.
          </p>
          <Button class="w-full md:w-auto rounded-xl" variant="default" size="lg">
            Explore Our Platform
          </Button>
        </div>

        <!-- Contact Form Section -->
        <div class="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg transform transition-transform hover:scale-[1.02]">
          <h2 class="text-3xl font-bold mb-4 text-gray-900 dark:text-white">Get in Touch</h2>
          <p class="text-gray-600 dark:text-gray-300 mb-6">
            Have questions or need legal assistance? Our team is here to help.
            Contact us directly through our form or give us a call.
          </p>
          
          <Dialog v-model:open="isOpen">
            <DialogTrigger as-child>
              <Button class="w-full md:w-auto rounded-xl" variant="default" size="lg">
                Contact Us Now
              </Button>
            </DialogTrigger>
            <DialogContent class="sm:max-w-[425px] rounded-2xl">
              <DialogHeader>
                <DialogTitle>Contact Form</DialogTitle>
              </DialogHeader>
              <form @submit="handleSubmit" class="space-y-4">
                <div class="space-y-2">
                  <label for="name" class="text-sm font-medium">Name</label>
                  <Input
                    id="name"
                    v-model="form.name"
                    placeholder="Your name"
                    :error="form.errors.name"
                  />
                </div>
                <div class="space-y-2">
                  <label for="email" class="text-sm font-medium">Email</label>
                  <Input
                    id="email"
                    type="email"
                    v-model="form.email"
                    placeholder="your@email.com"
                    :error="form.errors.email"
                  />
                </div>
                <div class="space-y-2">
                  <label for="phone" class="text-sm font-medium">Phone</label>
                  <Input
                    id="phone"
                    type="tel"
                    v-model="form.phone"
                    placeholder="Your phone number"
                    :error="form.errors.phone"
                  />
                </div>
                <div class="space-y-2">
                  <label for="message" class="text-sm font-medium">Message</label>
                  <Textarea
                    id="message"
                    v-model="form.message"
                    placeholder="Your message"
                    :error="form.errors.message"
                  />
                </div>
                <div class="flex justify-end">
                  <Button type="submit" variant="default">Send Message</Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>

          <div class="mt-6 text-center">
            <p class="text-gray-600 dark:text-gray-300">
              Or call us directly at:
              <a href="tel:+1234567890" class="text-primary hover:underline font-medium">
                (123) 456-7890
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>