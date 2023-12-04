<template>
  <div>
    <div class="relative md:ml-64 bg-blue-50">
      <div class="px-4 md:px-8 mx-auto w-full pt-4">
		<div style="min-height: 20rem;">
        <router-view />
		</div>
		<div class="mt-8">
      </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "AccountLayout"
}
</script>
