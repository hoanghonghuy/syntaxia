import { defineStore } from 'pinia'
import type { User } from '~/types/api'

export const useAuthStore = defineStore('auth', () => {
  const user = ref<User | null>(null)
  const loading = ref(false)
  const api = useApi()

  async function fetchMe() {
    loading.value = true
    try {
      user.value = await api.me()
    } catch {
      user.value = null
    } finally {
      loading.value = false
    }
  }

  async function login(email: string, password: string) {
    user.value = await api.login(email, password)
  }

  async function register(email: string, password: string, displayName?: string) {
    user.value = await api.register(email, password, displayName)
  }

  async function logout() {
    await api.logout()
    user.value = null
  }

  async function updateProfile(displayName: string) {
    user.value = await api.updateProfile(displayName)
  }

  async function changePassword(currentPassword: string, newPassword: string) {
    await api.changePassword(currentPassword, newPassword)
  }

  const isAdmin = computed(() => user.value?.role === 'admin')

  return {
    user,
    loading,
    fetchMe,
    login,
    register,
    logout,
    updateProfile,
    changePassword,
    isAdmin,
  }
})
