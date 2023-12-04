import { defineStore } from 'pinia'

export const useTransactionStore = defineStore({
    id: 'transaction',
    state: () => ({
        order: {
					'transfer_amount' : '',
					'receiver_amount' : '', 
					'receiver_phone_number' : ''
				}
    }),
    actions: {
		updateReceiverAmount() {
            this.order.receiver_amount = this.order.transfer_amount * 101
		},
        updateTransferAmount() {
            this.order.transfer_amount = this.order.receiver_amount / 101
		},
	},
	getters: {
		transaction() {
			return this.order
		},
    }
});
