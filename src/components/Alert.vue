<template>
	<div :class="'alert alert-'+type" role="alert">
		{{ message }}
	</div>
</template>

<script>
export default {
  name: 'AlertComponent',
  props: {
				message: null,
				type: null,
			}
}
</script>

<style scoped>
	.alert-info {
		color:#0c5460;
		background-color:#d1ecf1;
		border-color:#bee5eb;
	}
	.alert-warning {
		color:#856404;
		background-color:#fff3cd;
		border-color:#ffeeba;
	}
	.alert-success {
		color:#155724;
		background-color:#d4edda;
		border-color:#c3e6cb;
	}
	.alert-danger {
		color: #721c24;
		background-color: #f8d7da;
		border-color: #f5c6cb;
	}
	
	.alert {
		position: relative;
		padding: 0.75rem 1.25rem;
		margin-top: 1rem;
		margin-bottom: 1rem;
		border: 1px solid transparent;
		border-radius: 0.25rem;
	}
</style>
