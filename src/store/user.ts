import { defineStore } from 'pinia'

export const userStore = defineStore('user', {
  state: () => ({
    user: {
      isLogin: false,
      isAdmin: false,
      token: '',
    },
  }),
  actions: {
    login(token: string, isAdmin: boolean) {
      this.user.isLogin = true
      this.user.isAdmin = isAdmin
      this.user.token = token
    },
    logout() {
      this.$reset()
    },
  },
})
