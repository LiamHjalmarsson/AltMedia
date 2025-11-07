<script setup lang="ts">
import type { Variant } from "~/types/enums";
import type { Link } from "~/types/shared";

defineProps<Link>();

const { element: linkWrapper, backgroundColor } = useHoverAnimation();

const variantClass: Record<Variant, string> = {
	primary: "bg-gradient-to-br from-primary to-primary-hover",
	secondary: "bg-primary/10",
	ghost: "text-primary",
	outline: "border-2 border-primary",
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
			<span class="relative flex items-center z-10">
				<Icon
					v-if="icon"
					:name="icon"
					class="transition-all duration-200"
					:class="reversed ? 'mr-sm order-1' : 'ml-sm order-2'" />
				<span :class="[reversed ? 'order-2' : 'order-1']">{{ label }}</span>
			</span>

			<span
				ref="backgroundColor"
				class="absolute top-0 h-10 w-10 border border-primary rounded-full transition-transform duration-300 ease-out max-lg:hidden"
				:class="variantClass[variant]"
				:style="{
					left: reversed ? 'calc(100% - 2.5rem)' : '0',
					right: 'auto',
				}" />

			<span
				class="absolute top-0 left-0 h-11 w-full bg-gradient-to-br from-primary to-primary-hover rounded-full lg:hidden" />
		</div>
	</NuxtLink>
</template>
