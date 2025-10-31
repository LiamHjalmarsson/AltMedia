<script setup lang="ts">
import type { Variant } from "~/types/enums";
import type { Button } from "~/types/shared";

defineProps<Button>();

const { element: button, backgroundColor } = useHoverAnimation();

const variantClass: Record<Variant, string> = {
	primary: "bg-gradient-to-br from-primary to-primary-hover border-primary",
	secondary: "bg-primary/10",
	ghost: "text-primary",
	outline: "border border-primary",
};
</script>

<template>
	<button
		ref="button"
		v-bind="$attrs"
		class="relative font-bold py-xs px-2xl cursor-pointer min-h-[44px] min-w-[44px] rounded-full focus-visible:outline-primary transition">
		<span class="relative flex items-center max-lg:justify-center z-10 max-lg:text-light">
			{{ label }}

			<Icon v-if="icon" :name="icon" class="ml-md" />
		</span>

		<span
			ref="backgroundColor"
			class="absolute top-0 left-0 h-10 w-10 border max-lg:hidden rounded-full"
			:class="[variantClass[variant]]" />

		<span
			class="absolute top-0 left-0 h-11 w-full bg-gradient-to-br from-primary to-primary-hover rounded-full lg:hidden" />
	</button>
</template>
