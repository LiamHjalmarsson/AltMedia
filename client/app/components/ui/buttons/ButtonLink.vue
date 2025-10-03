<script setup lang="ts">
const { to, external = false } = defineProps<{ to: string; external?: boolean }>();

const { element: linkWrapper, backgroundColor } = useHoverAnimation();
</script>

<template>
	<NuxtLink :to="to || '/'" :target="external ? '_blank' : undefined">
		<div
			ref="linkWrapper"
			:to="to || '/'"
			:target="external ? '_blank' : undefined"
			class="relative py-xs px-xxl w-fit cursor-pointer">
			<div class="relative font-bold z-10">
				<slot />
			</div>
			<span ref="backgroundColor" class="absolute top-0 left-0 h-10 w-10 bg-primary rounded-full" />
		</div>
	</NuxtLink>
</template>
