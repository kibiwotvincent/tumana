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
          <div v-show="! payment_success" class="flex items-center justify-center">
            <form class="space-y-4 w-full" @submit.prevent="makePayment">
                <div class="flex w-full gap-4">
                    <div class="w-1/2">
                        <label for="transfer_amount" class="block text-sm font-medium leading-6 text-gray-800">Transfer Amount</label>
                    </div>
                    <div class="w-1/2 text-right">
                        <label for="transfer_amount" class="block text-sm font-bold leading-6 text-gray-900">AUD {{ transactionStore.order_info.transfer_amount }}</label>
                    </div>
                </div>
                <div class="flex w-full gap-4">
                    <div class="w-1/2">
                        <label for="transfer_amount" class="block text-sm font-medium leading-6 text-gray-800">Receiver {{ transactionStore.order_info.receiver_phone_number }} Gets</label>
                    </div>
                    <div class="w-1/2 text-right">
                        <label for="transfer_amount" class="block text-sm font-bold leading-6 text-gray-900">KES {{ transactionStore.order_info.receiver_amount }}</label>
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
                <div class="pt-2"></div>
                <p class="text-center text-gray-800">Enter Your Credit/Debit Card Details</p>
                <div id="card-element" class="block w-full rounded-md border-0 px-2.5 py-3.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"></div>
                <div id="card-errors" class="text-danger" role="alert" @keyup="resetErrors">{{ cardErrors }}</div>
                <div class="pt-2"></div>
              <button type="submit" class="flex w-full justify-center rounded-md bg-indigo-600 mt-4 py-3.5 text- font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                Complete Payment
              </button>  
            </form>
          </div>
          
          <div v-show="payment_success" class="flex items-center justify-center">
            <div class="w-full">
                <p class="text-center font-bold text-gray-800">Payment Succesful!</p>
                <div class="alert alert-success my-4">Transaction has been processed successfully. View Trasaction status from transaction history page.</div>
                <a href="/history" class="flex w-full justify-center rounded-md bg-indigo-600 mt-4 py-3.5 text- font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                    View Transaction History
                </a>  
            </div>
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
    import { ref } from 'vue';
	import createHttp from '@/axios.js'
    
    var publishableKey = import.meta.env.VITE_STRIPE_KEY
    const stripe = Stripe(publishableKey);
    
    const cardElement = ref(null);
	
	export default {
		name: 'MakePayment',
		data() {
			return {
                transfer_amount: '',
	            receiver_amount: '',			
                receiver_phone_number: '',
                is_complete: false,
                payment_intent_secret: '',
                payment_success: false
			}
		},
        mounted() {
            const elements = stripe.elements();

            // Set up Stripe.js and Elements to use in checkout form
            const style = {
                base: {
                    color: '#32325d',
                    fontFamily: 'Arial, sans-serif',
                    fontSmoothing: 'antialiased',
                    fontSize: '16px',
                    '::placeholder': {
                        color: '#aab7c4'
                    }
                },
                invalid: {
                    color: '#fa755a',
                    iconColor: '#fa755a'
                }
            };

            const card = elements.create('card', {style: style, hidePostalCode: true});
            
            setTimeout(function() {
                //delay rendering card element by 2 seconds
                card.mount('#card-element');
            }, 2000);
    
            cardElement.value = card

        },
        methods: {
			async makePayment() {
				const transactionStore = useTransactionStore()

                const {paymentIntent, error} = await stripe.confirmCardPayment(transactionStore.order_client_secret, {
                        payment_method: {
                            card: cardElement.value
                        }
                    }
                );

                if (error) {
                    const displayError = document.getElementById('card-errors');
                    displayError.textContent = error.message;
                } else {
                    if (paymentIntent.status === 'succeeded') {
                        this.payment_success = true
                    }
                }
            },
            resetErrors() {
                // Handle real-time validation errors from the card Element
                const displayError = document.getElementById('card-errors');
                displayError.textContent = '';
            }
        }
    }
</script>
