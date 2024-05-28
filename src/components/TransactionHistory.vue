<script setup>
    import Header from '@/components/Header.vue'
    import Spinner from '@/components/Spinner.vue'
</script>
<template>
  <div class="bg-white">
    <Header />
    <div class="relative isolate px-6 pt-14 lg:px-8">
      <div class="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80" aria-hidden="true">
        <div class="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]" style="clip-path: polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)" />
      </div>
        
      <div class="px-16 w-full py-24 sm:py-32 lg:py-20">
          <h2>Transaction History</h2>
          
          <div class="flex justify-center mt-8" v-show="isLoading">
            <Spinner :size=6 color="red-400" text="Loading transactions..." :show-text=true />
          </div>
          
  <ul v-show="!isLoading" role="list" class="divide-y divide-gray-100 border rounded p-4 mt-4">
    <li v-for="transaction in transactions" :key="transaction.reference_id" class="flex justify-between gap-x-6 py-5">
        
      <div class="flex min-w-0 gap-x-4">
        <div class="min-w-0 flex-auto">
            <p class="mb-2 font-medium text-gray-800">Transaction Ref: {{ transaction.reference_id }}</p>
          <p class="text-sm font-semibold leading-6 text-gray-900">Receiver: {{ transaction.receiver_phone_number }}</p>
          <p class="mt-1 truncate text-xs leading-5 text-gray-500">Transaction Time: {{ transaction.transaction_time }}</p>
        </div>
      </div>
      <div class="shrink-0 sm:flex sm:flex-col sm:items-end">
        <p class="text-l leading-6 text-gray-700 font-bold">Kshs {{ transaction.receiver_amount }}</p>
        <p class="mt-1 text-xs leading-5 text-gray-500">
          STRIPE: {{ transaction.status }}
          </p>
          <p class="text-xs mt-1">M-PESA: {{ transaction.mpesa_status }}</p>
      </div>
    </li>
  </ul>
        </div>

        
        
        
      <div class="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]" aria-hidden="true">
        <div class="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]" style="clip-path: polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)" />
      </div>
    </div>
  </div>
</template>
<script>    
    import createHttp from '@/axios.js'
	
	export default {
		name: 'TransactionHistory',
		components: {
			//
		},
		data() {
			return {
				isLoading: true,
				transactions: []
			}
		},
		mounted() {
			this.fetchUserTransactions()
		},
		methods: {
			async fetchUserTransactions() {
				this.isLoading = true
				this.transactions = []
				const http = createHttp()
				http.get(import.meta.env.VITE_API_URL+'/api/user/transactions')
					.then((response) => {
						this.isLoading = false
						this.transactions = response.data
					})
			}
		}
	}
    
</script>
