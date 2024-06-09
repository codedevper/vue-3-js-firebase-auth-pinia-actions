<template>
  <div v-if="user">
    <h2>Welcome, {{ user.displayName }}</h2>
    <p>Email: {{ user.email }}</p>
    <p>UID: {{ user.uid }}</p>
    <p>Email Verified: {{ user.emailVerified }}</p>
    <button @click="logout">Logout</button>
  </div>
</template>

<script setup>
import { useAuthStore } from '@/stores/auth'
import { useRouter } from 'vue-router'

const router = useRouter()

const authStore = useAuthStore()

const user = authStore.user

if (!user) {
  router.push({ name: 'login' })
}

const logout = async () => {
  await authStore
    .logout()
    .then(function (response) {
      // handle success
      console.log(response)
      localStorage.removeItem('isLoggedIn')
      localStorage.removeItem('user')
      router.push({ name: 'login' })
    })
    .catch(function (error) {
      // handle error
      console.log(error)
    })
    .finally(function () {
      // always executed
    })
}
</script>

<style lang="scss"></style>
