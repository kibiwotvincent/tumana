<script setup>
   import Header from '@/components/Header.vue'
    
   import { useTransactionStore, useAuthStore } from '@/stores'
   import { router } from '@/router';
    
   const transactionStore = useTransactionStore()
</script>
<template>
  <div class="bg-white">
    <Header />
    <div class="relative isolate px-6 pt-14 lg:px-8">
      <div class="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80" aria-hidden="true">
        <div class="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]" style="clip-path: polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)" />
      </div>
        
      <div class="mx-auto max-w-2xl py-32 sm:py-48 lg:py-20">
      <div class="p-4">
        <div class="flex items-center justify-center">
            
            <form class="space-y-6 w-full" @submit.prevent="transactionStore.createOrder()">
                <div class="flex w-full gap-4">
                    <div class="w-1/2">
                        <label for="transfer_amount" class="block text-sm font-medium leading-6 text-gray-800">You send (AUD)</label>
                
                  <div class="mt-2 relative flex flex-wrap items-stretch">
                  <input
                    type="text"
                    class="relative block w-[80%] min-w-0 flex-auto rounded-l border-0 py-3.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    placeholder="Amount you want to send..."
                    aria-label="Amount you want to send..."
                    aria-describedby="transfer_amount"
                    v-model="transactionStore.transaction.transfer_amount"
                    @input="updateReceiverAmount()"
                    required
                    />
                      
                  <span
                    class="flex items-center w-[20%] whitespace-nowrap rounded-r border-r border-t border-b text-center border-gray-300 bg-white p-2"
                        >
                      <img alt="Vue logo" class="logo" src="@/assets/australia.png" width="60" height="40" />
                      </span>
                  </div>
              </div>

              <div class="w-1/2">
                <label for="receiver_amount" class="block text-sm font-medium leading-6 text-gray-800">Recipient gets (KSH)</label>
                <div class="mt-2 relative flex flex-wrap items-stretch">
                  <input
                    type="text"
                    class="relative block w-[80%] min-w-0 flex-auto rounded-l border-0 py-3.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    placeholder="Amount receiver gets..."
                    aria-label="Amount receiver gets..."
                    aria-describedby="receiver_amount"
                    v-model="transactionStore.transaction.receiver_amount"
                    @input="updateTransferAmount()"
                    required
                    />
                      
                  <span
                    class="flex items-center w-[20%] whitespace-nowrap rounded-r border-r border-t border-b text-center border-gray-300 bg-white p-2"
                        >
                      <img alt="Vue logo" class="logo" src="@/assets/kenya.png" width="60" height="40" />
                      </span>
                  </div>
              </div>
                  </div>

              <div>
                <label for="receiver_phone_number" class="block text-sm font-medium leading-6 text-gray-800">Recipient's phone number</label>
                <div class="mt-2">
                  <input 
                         id="receiver_phone_number" 
                         v-model="transactionStore.transaction.receiver_phone_number"
                         type="text"
                         required 
                         placeholder="Receiver MPESA number"
                         aria-label="Receiver MPESA number"
                         aria-describedby="receiver_phone_number"
                         class="block w-full rounded-md border-0 py-3.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                         />
                </div>
              </div>
                <div class="flex w-full gap-4">
                    <div class="w-1/2">
                        <label for="transfer_amount" class="block text-sm font-medium leading-6 text-gray-800">Exchange Rate</label>
                    </div>
                    <div class="w-1/2 text-right">
                        <label for="transfer_amount" class="block text-sm font-bold leading-6 text-gray-900">AUD 1 = KES {{ transactionStore.transaction.exchange_rate }}</label>
                    </div>
                </div>
                <div class="flex w-full gap-4">
                    <div class="w-1/2">
                        <label for="transfer_amount" class="block text-sm font-medium leading-6 text-gray-800">Transfer Fee</label>
                    </div>
                    <div class="w-1/2 text-right">
                        <label for="transfer_amount" class="block text-sm font-bold leading-6 text-gray-900">AUD {{ transactionStore.transaction.transfer_fee }}</label>
                    </div>
                </div>
                <div class="flex w-full gap-4">
                    <div class="w-1/2">
                        <label for="transfer_amount" class="block text-sm font-medium leading-6 text-gray-800">Amount you will pay</label>
                    </div>
                    <div class="w-1/2 text-right">
                        <label for="transfer_amount" class="block text-lg font-bold leading-6 text-indigo-600">AUD {{ transactionStore.transaction.total_amount }}</label>
                    </div>
                </div>
              <div>
                  <button type="submit" class="flex w-full justify-center rounded-md bg-indigo-600 py-3.5 text- font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                    Pay with Credit Card or Debit Card
                  </button>  
              </div>
            </form>
            
        </div>
      </div>
    </div>
        
      <div class="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]" aria-hidden="true">
        <div class="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]" style="clip-path: polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)" />
      </div>
    </div>
  </div>
</template>
<script>
	
	export default {
		name: 'SendMoney',
		data() {
			return {
                transfer_amount: '',
	            receiver_amount: '',			
                receiver_phone_number: '',
                is_complete: false,
                payment_intent_secret: ''
			}
		},
        mounted() {
            const transactionStore = useTransactionStore()
            transactionStore.setExchangeRate()
            transactionStore.setTransferFee()
        },
        methods: {
			updateReceiverAmount() {
				const transactionStore = useTransactionStore()
                transactionStore.updateReceiverAmount()
			},
            updateTransferAmount() {
                const transactionStore = useTransactionStore()
                transactionStore.updateTransferAmount()
			},
        }
    }
</script>
