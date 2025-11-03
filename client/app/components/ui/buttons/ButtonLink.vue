<script setup lang="ts">
import type { Variant } from "~/types/enums";
import type { Link } from "~/types/shared";

defineProps<Link>();

const { element: linkWrapper, backgroundColor } = useHoverAnimation();

const variantClass: Record<Variant, string> = {
	primary: "bg-gradient-to-br from-primary to-primary-hover",
	secondary: "bg-primary/10",
	ghost: "text-primary",
	outline: "border border-primary",
};
</script>

<template>
	<NuxtLink
		:to="url || '/'"
		:target="is_external ? '_blank' : undefined"
		:rel="is_external ? 'noopener noreferrer' : undefined"
		:aria-label="label"
		class="focus-visible:outline-primary flex">
		<div
			ref="linkWrapper"
			class="relative py-xs px-xl lg:px-2xl w-full lg:w-fit cursor-pointer min-h-[44px] min-w-[44px]">
			<div class="relative font-bold z-10 flex items-center max-lg:justify-center">
				{{ label }}

				<Icon v-if="icon" :name="icon" size="20" class="ml-md" />
			</div>

			<span
				ref="backgroundColor"
				:class="[variantClass[variant]]"
				class="absolute top-0 left-0 h-10 w-10 max-lg:hidden rounded-full" />

			<span
				class="absolute top-0 left-0 h-11 w-full bg-gradient-to-br from-primary to-primary-hover rounded-full lg:hidden" />
		</div>
	</NuxtLink>
</template>
