import { defineStore } from 'pinia'

export const useOrderStore = defineStore({
    id: 'order',
    state: () => ({
        order: null,
        client_secret: ''
    }),
    actions: {
		updateReceiverAmount() {
            this.order.receiver_amount = this.order.transfer_amount * 101
		},
	},
	getters: {
		order_info() {
			return this.order
		},
        client_secret() {
			return this.client_secret
		},
    }
});
