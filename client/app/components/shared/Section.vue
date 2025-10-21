<script setup lang="ts">
defineProps<{
	bgColor?: string;
	id?: string;
}>();
</script>

<template>
	<section
		:id="id"
		class="relative w-full flex justify-center items-center p-xs xs:p-sm sm:p-md md:p-lg lg:p-2xl"
		:style="bgColor ? { backgroundColor: bgColor } : undefined">
		<slot />
	</section>
</template>
