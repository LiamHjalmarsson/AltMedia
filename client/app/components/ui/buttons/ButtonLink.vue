<script setup lang="ts">
const { to, external = false, ariaLabel } = defineProps<{ to: string; external?: boolean; ariaLabel?: string }>();

const { element: linkWrapper, backgroundColor } = useHoverAnimation();
</script>

<template>
	<NuxtLink
		:to="to || '/'"
		:target="external ? '_blank' : undefined"
		:rel="external ? 'noopener noreferrer' : undefined"
		:aria-label="ariaLabel"
		class="focus-visible:outline-primary flex">
		<div
			ref="linkWrapper"
			class="relative py-xs px-xl lg:px-2xl w-full lg:w-fit cursor-pointer min-h-[44px] min-w-[44px]">
			<div class="relative font-bold z-10 flex items-center max-lg:justify-center">
				<slot />
			</div>

			<span
				ref="backgroundColor"
				class="absolute top-0 left-0 h-10 w-10 max-lg:hidden bg-gradient-to-br from-primary to-primary-hover rounded-full" />

			<span
				class="absolute top-0 left-0 h-11 w-full bg-gradient-to-br from-primary to-primary-hover rounded-full lg:hidden" />
		</div>
	</NuxtLink>
</template>
