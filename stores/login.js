import { defineStore } from 'pinia'
import { ref } from 'vue'
import { useCookie } from 'nuxt/app'

export const useLoginStore = defineStore('login', () => {
  const user = ref(null)
  const error = ref('')
  // Store tokens in cookies
  const accessToken = useCookie('access_token', { sameSite: 'strict', secure: true })
  const refreshToken = useCookie('refresh_token', { sameSite: 'strict', secure: true })

  async function login(username, password) {
    error.value = ''
    try {
      const res = await fetch('https://dummyjson.com/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username,
          password,
          expiresInMins: 1440 // 1 day
        })
        // credentials: 'include' --> to be updated w/ new API CORS settings HTTP-only cookie
      })
      if (!res.ok) throw new Error('Invalid credentials')
      const data = await res.json()
      // Save only user info (exclude tokens)
      const { accessToken: at, refreshToken: rt, ...userInfo } = data
      user.value = userInfo
      accessToken.value = at
      refreshToken.value = rt
    } catch (e) {
      error.value = e.message || 'Login error'
      user.value = null
      accessToken.value = null
      refreshToken.value = null
    }
  }

  async function logout() {
    user.value = null
    accessToken.value = null
    refreshToken.value = null
  }

  return { user, error, accessToken, refreshToken, login, logout }
}, {
  persist: true
})