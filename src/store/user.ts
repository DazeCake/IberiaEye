import { defineStore } from 'pinia'

export const userStore = defineStore('user', {
    state: () => ({
        user: {
            isLogin: false,
            token: '',
        }
    }),
    actions: {
        login(token: string){
            this.user.token = token
            this.user.isLogin = true
        },
        logout(){
            this.$reset()
        }
    }
})