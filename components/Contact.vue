<script setup lang="ts">
import { ref } from 'vue'
import { Button } from '../components/ui/button'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { useForm } from 'vee-validate'
import * as z from 'zod'

const isOpen = ref(false)

const formSchema = z.object({
  name: z.string().min(2, 'Numele trebuie să aibă cel puțin 2 caractere'),
  email: z.string().email('Vă rugăm să introduceți o adresă de email validă'),
  phone: z.string().min(10, 'Vă rugăm să introduceți un număr de telefon valid'),
  message: z.string().min(10, 'Mesajul trebuie să aibă cel puțin 10 caractere')
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
  <section id="contact" class="py-16 dark:bg-transparent rounded-3xl mx-4 sm:mx-6 lg:mx-8">
    <div class="container mx-auto px-4">
      <div class="grid md:grid-cols-2 gap-8">
        <!-- Platform Recommendation Section -->
        <div class="bg-white dark:bg-zinc-800 p-8 rounded-2xl shadow-lg transform transition-transform hover:scale-[1.02]">
          <h2 class="text-3xl font-bold mb-4 text-gray-900 dark:text-white">Aflați Mai Multe Despre Serviciile Noastre</h2>
          <p class="text-gray-600 dark:text-zinc-300 mb-6">
            Visit our comprehensive platform to explore detailed information about our legal services,
            case studies, and success stories. Get insights into how we can help protect your rights
            and achieve the best possible outcomes for your case.
          </p>
          <Button class="w-full md:w-auto rounded-xl" variant="default" size="lg">
            Explorează Platforma Noastră
          </Button>
        </div>

        <!-- Contact Form Section -->
        <div class="bg-white dark:bg-zinc-800 p-8 rounded-2xl shadow-lg transform transition-transform hover:scale-[1.02]">
          <h2 class="text-3xl font-bold mb-4 text-gray-900 dark:text-white">Contactează-ne</h2>
          <p class="text-gray-600 dark:text-gray-300 mb-6">
            Aveți întrebări sau aveți nevoie de asistență juridică? Echipa noastră este aici pentru a vă ajuta.
            Contactați-ne direct prin formular sau sunați-ne.
          </p>
          
          <Dialog v-model:open="isOpen">
            <DialogTrigger as-child>
              <Button class="w-full md:w-auto rounded-xl" variant="default" size="lg">
                Contactează-ne Acum
              </Button>
            </DialogTrigger>
            <DialogContent class="sm:max-w-[425px] rounded-2xl">
              <DialogHeader>
                <DialogTitle>Formular de Contact</DialogTitle>
              </DialogHeader>
              <form @submit="handleSubmit" class="space-y-4">
                <div class="space-y-2">
                  <label for="name" class="text-sm font-medium">Nume</label>
                  <Input
                    id="name"
                    v-model="form.name"
                    placeholder="Numele dumneavoastră"
                    :error="form.errors.name"
                  />
                </div>
                <div class="space-y-2">
                  <label for="email" class="text-sm font-medium">Email</label>
                  <Input
                    id="email"
                    type="email"
                    v-model="form.email"
                    placeholder="email@exemplu.com"
                    :error="form.errors.email"
                  />
                </div>
                <div class="space-y-2">
                  <label for="phone" class="text-sm font-medium">Telefon</label>
                  <Input
                    id="phone"
                    type="tel"
                    v-model="form.phone"
                    placeholder="Numărul dumneavoastră de telefon"
                    :error="form.errors.phone"
                  />
                </div>
                <div class="space-y-2">
                  <label for="message" class="text-sm font-medium">Mesaj</label>
                  <Textarea
                    id="message"
                    v-model="form.message"
                    placeholder="Mesajul dumneavoastră"
                    :error="form.errors.message"
                  />
                </div>
                <div class="flex justify-end">
                  <Button type="submit" variant="default">Trimite Mesaj</Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>

          <div class="mt-6 text-center">
            <p class="text-gray-600 dark:text-gray-300">
              Sau sunați-ne direct la:
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