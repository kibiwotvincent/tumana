<template>
  <div role="status" class="inline flex items-center">
    <svg
      :class="spinnerClass"
      viewBox="0 0 100 101"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
        fill="currentColor"
      />
      <path
        d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348..."
        fill="currentFill"
      />
    </svg>

    <span :class="showText ? 'text-gray-700 ml-2' : 'sr-only'">
      {{ text }}
    </span>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  size: { type: String, default: 'sm' },
  color: { type: String, default: 'blue-600' },
  text: { type: String, default: 'Loading...' },
  showText: { type: Boolean, default: false }
})

const spinnerClass = computed(() => {
  const sizes = {
    sm: 'w-5 h-5',
    md: 'w-6 h-6',
    lg: 'w-8 h-8'
  }

  return [
    'inline animate-spin text-gray-200',
    sizes[props.size],
    `fill-${props.color}`
  ]
})
</script>