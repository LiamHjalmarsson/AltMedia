<script setup lang="ts">
defineProps<{
	bg?: string;
	id?: string;
}>();
</script>

<template>
	<section
		:id="id"
		:class="['relative w-full flex justify-center items-center p-xs xs:p-sm sm:p-md md:p-lg lg:p-2xl', bg || '']">
		<div class="mx-auto w-full max-w-[1600px] px-xs xs:px-sm sm:px-md md:px-lg lg:px-2xl">
			<slot />
		</div>
	</section>
</template>
