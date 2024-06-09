<template>
  <div>
    <p v-if="error">{{ error }}</p>
    <form @submit.prevent="register">
      <input v-model="email" type="email" placeholder="Email" required />
      <input v-model="password" type="password" placeholder="Password" required />
      <button type="submit">Register</button>
    </form>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useAuthStore } from '@/stores/auth'
import { useRouter } from 'vue-router'

const router = useRouter()

const authStore = useAuthStore()

const email = ref('')
const password = ref('')

const register = async () => {
  await authStore
    .register(email.value, password.value)
    .then(function (response) {
      // handle success
      console.log(response)
      localStorage.setItem('isLoggedIn', true)
      localStorage.setItem('user', JSON.stringify(response.user))
      router.push({ name: 'profile' })
    })
    .catch(function (error) {
      // handle error
      console.log(error)
    })
    .finally(function () {
      // always executed
    })
}

const error = computed(() => authStore.error)
</script>
