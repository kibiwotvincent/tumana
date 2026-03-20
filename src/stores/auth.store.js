import { defineStore } from 'pinia';
import { router } from '@/router';
import  http  from '@/utils/http'

export const useAuthStore = defineStore({
    id: 'auth',
    state: () => ({
        // initialize state from local storage to enable user to stay logged in
        activeUser: (() => {
                        try {
                            return JSON.parse(localStorage.getItem('user'));
                        } catch (e) {
                            return null;
                        }
                    })()
    }),
    actions: {
      async register(first_name, last_name, email, password, password_confirmation) {
        const response = await http.post('/users/register', {
            first_name, last_name, email, password, password_confirmation
        });

        router.push('/login');
      },
      async login(email, password) {
        const response = await http.post('/users/login', { email, password });

        const user = response.data;
        this.activeUser = user;
        localStorage.setItem('user', JSON.stringify(user));

        router.push('/history');
      },
      logout() {
          this.activeUser = null;
          localStorage.removeItem('user');
          router.push('/login');
      }
    },
    getters: {
      user() {
        return this.activeUser
      },
      token() {
        return (this.activeUser == null) ? '' : this.activeUser.token
      },
      isLoggedIn() {
          return this.activeUser !== null && this.activeUser?.token
      }
    }
});
