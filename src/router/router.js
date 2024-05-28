import { createRouter, createWebHistory } from 'vue-router'
import App from "@/layouts/App.vue";
import { useAuthStore } from '@/stores';
//import Account from "@/layouts/Account.vue";
import HomeView from '../views/HomeView.vue'
import SendMoneyView from '../views/SendMoneyView.vue'
import MakePaymentView from '../views/MakePaymentView.vue'
import TransactionHistoryView from '../views/TransactionHistoryView.vue'
import LoginView from '@/views/LoginView.vue'
import RegisterView from '@/views/RegisterView.vue'

const routes = [
	{
		path: "/",
		component: App,
		children: [
					{path: '/', name: 'home', component: HomeView},
					{path: '/login', name: 'login', component: LoginView},
					{path: '/register', name: 'register', component: RegisterView},
					{path: '/forgot-password', name: 'forgot-password', component: HomeView},
				]
	},
	{
		path: "/history",
		component: App,
		children: [
			{
				path: "/send",
				name: 'send',
				component: SendMoneyView,
			},
            {
				path: "/pay",
				name: 'pay',
				component: MakePaymentView,
			},
			{
				path: "/history",
				name: 'history',
				component: TransactionHistoryView,
			},
		],
	},
]

export const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  linkActiveClass: 'active',
  routes,
  scrollBehavior() {
    // always scroll to top
    return { top: 0 }
  },
})

router.beforeEach(async (to) => {
    // redirect to login page if not logged in and trying to access a restricted page
    const authPages = ['/register','/login','/forgot-password'];
    const protectedPages = ['/send','/profile','/history'];
    const authRequired = protectedPages.includes(to.path);
    const auth = useAuthStore();

    if(authRequired && !auth.isLoggedIn) {
        return '/login';
    }
	if(authPages.includes(to.path) && auth.isLoggedIn) {
		//user is trying to access authentication pages but already logged in
        return '/history';
    }
})