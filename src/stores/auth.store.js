import { defineStore } from 'pinia';

import { fetchWrapper } from '@/helpers';
import { router } from '@/router';

const baseUrl = import.meta.env.VITE_API_URL+'/api/users';

export const useAuthStore = defineStore({
    id: 'auth',
    state: () => ({
        // initialize state from local storage to enable user to stay logged in
        activeUser: JSON.parse(localStorage.getItem('user')),
        returnUrl: '/history'
    }),
    actions: {
		async register(first_name, last_name, email, password, password_confirmation) {
            const response = await fetchWrapper.post(baseUrl+'/register', { first_name, last_name, email, password, password_confirmation });
			
			if(response && response.status == 200) {
				// redirect to login
				router.push('/login');
			}
        },
        async login(email, password) {
		const response = await fetchWrapper.post(baseUrl+'/login', { email, password })

			if(response && response.status == 200) {
				const user = response.data;
				
				// update pinia state
				this.activeUser = user;
				
				console.log(user)

				// store user details and api access token in local storage to keep user logged in between page refreshes
				localStorage.setItem('user', JSON.stringify(user));

				// redirect to previous url or default to account dashboard
				router.push(this.returnUrl || '/');
			}
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
			return (this.activeUser !== null && this.activeUser.token !== '')
		}
    }
});
