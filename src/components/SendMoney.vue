<script setup>
    
   import Header from '@/components/Header.vue'
   import { useTransactionStore, useAuthStore } from '@/stores'
    import { router } from '@/router';
	
    
const transactionStore = useTransactionStore()
    
    
import { onMounted } from 'vue'
    
const user = useAuthStore()
    
onMounted(() => {
    
    paypal.Buttons({
        // Call your server to set up the transaction
        createOrder: function(data, actions) {
            return fetch(import.meta.env.VITE_API_URL+'/api/paypal/order/create/', {
                method: 'post',
                headers: {
                  "Content-Type" : "application/json",
                  "Authorization" : `Bearer ${user.token}`
                },
                body: JSON.stringify({
                    order: [
                      {
                        transfer_amount: transactionStore.transaction.transfer_amount,
                        receiver_amount: transactionStore.transaction.receiver_amount,
                        receiver_phone_number: transactionStore.transaction.receiver_phone_number,
                      },
                    ],
                }),
            }).then(function(res) {
                return res.json();
            }).then(function(orderData) {
                return orderData.id;
            });
        },

        // Call your server to finalize the transaction
        onApprove: function(data, actions) {
            return fetch(import.meta.env.VITE_API_URL+'/api/paypal/order/' + data.orderID + '/capture/', {
                method: 'post'
            }).then(function(res) {
                return res.json();
            }).then(function(orderData) {
                // Three cases to handle:
                //   (1) Recoverable INSTRUMENT_DECLINED -> call actions.restart()
                //   (2) Other non-recoverable errors -> Show a failure message
                //   (3) Successful transaction -> Show confirmation or thank you

                // This example reads a v2/checkout/orders capture response, propagated from the server
                // You could use a different API or structure for your 'orderData'
                var errorDetail = Array.isArray(orderData.details) && orderData.details[0];

                if (errorDetail && errorDetail.issue === 'INSTRUMENT_DECLINED') {
                    return actions.restart(); // Recoverable state, per:
                    // https://developer.paypal.com/docs/checkout/integration-features/funding-failure/
                }

                if (errorDetail) {
                    var msg = 'Sorry, your transaction could not be processed.';
                    if (errorDetail.description) msg += '\n\n' + errorDetail.description;
                    if (orderData.debug_id) msg += ' (' + orderData.debug_id + ')';
                    return msg;//alert(msg); // Show a failure message (try to avoid alerts in production environments)
                }

                // Successful capture! For demo purposes:
                console.log('Capture result', orderData, JSON.stringify(orderData, null, 2));
                router.push('/history')
                //var transaction = orderData.purchase_units[0].payments.captures[0];
                //alert('Transaction '+ transaction.status + ': ' + transaction.id + '\n\nSee console for all available details');

                // Replace the above to show a success message within this page, e.g.
                // const element = document.getElementById('paypal-button-container');
                // element.innerHTML = '';
                // element.innerHTML = '<h3>Thank you for your payment!</h3>';
                // Or go to another URL:  actions.redirect('thank_you.html');
            });
        }

    }).render('#paypal-button-container');
})   

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
            
            <form class="space-y-6 w-full" action="#" method="POST">
              
                <div class="flex w-full gap-4">
                    <div class="w-1/2">
                        <label for="transfer_amount" class="block text-sm font-medium leading-6 text-gray-800">You send (AUD)</label>
                
                  <div class="mt-2 relative flex flex-wrap items-stretch">
                  <input
                    type="number"
                    class="relative block w-[80%] min-w-0 flex-auto rounded-l border-0 py-3.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    placeholder="Amount you want to send..."
                    aria-label="Amount you want to send..."
                    aria-describedby="transfer_amount"
                    v-model="transactionStore.transaction.transfer_amount"
                    @input="updateReceiverAmount()"
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
                    type="number"
                    class="relative block w-[80%] min-w-0 flex-auto rounded-l border-0 py-3.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    placeholder="Amount receiver gets..."
                    aria-label="Amount receiver gets..."
                    aria-describedby="receiver_amount"
                    v-model="transactionStore.transaction.receiver_amount"
                    @input="updateTransferAmount()"
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
                  <p class="text-sm text-gray-600">AUD 1 = KES 101.00. The amount you send is inclusive of our AUD 0.40 fee. By continuing to checkout, you agree to the terms of service.</p>
              <p class="text-center text-gray-800">Pay with PayPal, Debit Card or Credit Card</p>
              <div id="paypal-button-container"></div>
            </form>

            
            <!--
            <div class="w-full">
                <h1 class="text-gray-800 text-xl font-bold text-center">Transaction successful.</h1>
                <p class="text-left text-gray-800 text-center">Kshs {{transactionStore.transaction.receiver_amount}} has been sent to {{transactionStore.transaction.receiver_phone_number}} via MPESA</p>
            </div>
            -->
            
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
	//import createHttp from '@/axios.js'
	
	export default {
		name: 'SendMoney',
		data() {
			return {
                transfer_amount: '',
	            receiver_amount: '',			
                receiver_phone_number: '',
                is_complete: false
			}
		},
        mountedd() {
            this.transfer_amount = 45
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
