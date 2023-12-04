import axios from 'axios';
import { useAuthStore } from '@/stores';

export default function createHttp(config = {}) {
	const user = useAuthStore()
	
	if(user.token !== '') {
		const headers = {}
		headers.Authorization = `Bearer ${user.token}`
		config.headers = headers
	}
	
	return axios.create(config)
}