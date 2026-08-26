import { defineStore } from 'pinia'
import type { User } from '~/types/api'
import { useCatalogStore } from '~/stores/catalog'

export const useAuthStore = defineStore('auth', () => {
  const user = ref<User | null>(null)
  const loading = ref(false)
  const api = useApi()

  function clearUserLearningState() {
    useCatalogStore().clearProgress()
  }

  async function fetchMe() {
    loading.value = true
    try {
      user.value = await api.me()
    } catch {
      user.value = null
      clearUserLearningState()
    } finally {
      loading.value = false
    }
  }

  async function login(email: string, password: string) {
    const nextUser = await api.login(email, password)
    clearUserLearningState()
    user.value = nextUser
  }

  async function register(email: string, password: string, displayName?: string) {
    const nextUser = await api.register(email, password, displayName)
    clearUserLearningState()
    user.value = nextUser
  }

  async function logout() {
    await api.logout()
    user.value = null
    clearUserLearningState()
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