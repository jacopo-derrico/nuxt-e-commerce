import { defineStore } from 'pinia'
import { ref } from 'vue'
import { useCookie } from 'nuxt/app'

export const useLoginStore = defineStore('login', () => {
  const user = ref(null)
  const error = ref('')
  const token = useCookie('auth_token', { sameSite: 'strict', secure: true })

  async function login(username, password) {
    error.value = ''
    try {
      const res = await fetch('https://dummyjson.com/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username,
          password,
          expiresInMins: 30
        }),
        // credentials: 'include' --> to be updated w/ new API CORS settings HTTP-only cookie
      })
      if (!res.ok) throw new Error('Invalid credentials')
      const data = await res.json()
      user.value = data
      token.value = data.token // Save token in cookie
    } catch (e) {
      error.value = e.message || 'Login error'
      user.value = null
      token.value = null
    }
  }

  async function logout() {
    user.value = null
    token.value = null // Remove token from cookie
  }

  return { user, error, token, login, logout }
})