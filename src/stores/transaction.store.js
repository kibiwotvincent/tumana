import { defineStore } from 'pinia'
import { router } from '@/router';
import  http  from '@/utils/http'

export const useTransactionStore = defineStore({
    id: 'transaction',
    state: () => ({
        order: {
					'transfer_amount' : '',
					'receiver_amount' : '', 
					'receiver_phone_number' : '',
                    'exchange_rate': 0,
                    'transfer_fee': 0,
                    'total_amount': 0,
                    'saved_order_info': {},
                    'client_secret': ''
				}
    }),
    actions: {
		updateReceiverAmount() {
            this.order.receiver_amount = this.order.transfer_amount * this.order.exchange_rate
            this.order.total_amount = parseFloat(this.order.transfer_amount) + this.order.transfer_fee
		},
        updateTransferAmount() {
            this.order.transfer_amount = this.order.receiver_amount / this.order.exchange_rate
            this.order.total_amount = parseFloat(this.order.transfer_amount) + this.order.transfer_fee
		},
        setExchangeRate() {
			http.get('/exchange_rate')
			.then((response) => {
				this.order.exchange_rate = parseFloat(response.data.rate)
			})
        },
        setTransferFee() {
			http.get('/fees')
			.then((response) => {
				this.order.transfer_fee = parseFloat(response.data.fees)
			})
        },
        createOrder() {
			http.post('/order/create', {'transfer_amount': this.order.transfer_amount, 'receiver_phone_number' : this.order.receiver_phone_number})
            .then((response) => {
                this.order.saved_order_info = response.data.order
                this.order.client_secret = response.data.client_secret
				router.push('/pay');
			})
		},
	},
	getters: {
		transaction() {
			return this.order
		},
        order_info() {
            return this.order.saved_order_info
        },
        order_client_secret() {
            return this.order.client_secret
        }
    }
});
