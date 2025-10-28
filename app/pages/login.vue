<template>
  <div>
    <UContainer>
      <h1>Login</h1>
      <UForm @submit="login">
        <UInput v-model="username" placeholder="Username" />
        <UInput v-model="password" type="password" placeholder="Password" />
        <UButton type="submit" :loading="loading">Login</UButton>
      </UForm>
      <UAlert v-if="error" color="red">{{ error }}</UAlert>
    </UContainer>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useLoginStore } from '../stores/login'
import { useRouter } from 'vue-router'

const username = ref('')
const password = ref('')
const error = ref('')
const loading = ref(false)
const userStore = useLoginStore()
const router = useRouter()

async function login(e) {
  e.preventDefault()
  loading.value = true
  error.value = ''
  try {
    await userStore.login(username.value, password.value)
    router.push('/')
  } catch (e) {
    error.value = 'Invalid credentials'
  }
  loading.value = false
}
</script>