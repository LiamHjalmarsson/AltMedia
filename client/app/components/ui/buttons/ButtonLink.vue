<script setup lang="ts">
import type { Link } from "~/types";

defineProps<Link>();

const { element: linkWrapper, backgroundColor } = useHoverAnimation();
</script>

<template>
	<NuxtLink
		:to="url || '/'"
		:target="is_external ? '_blank' : undefined"
		:rel="is_external ? 'noopener noreferrer' : undefined"
		class="focus-visible:outline-primary flex">
		<div
			ref="linkWrapper"
			class="relative flex items-center justify-center font-bold px-xl max-lg:w-full cursor-pointer min-h-[64px] min-w-[84px] rounded-full focus-visible:outline-primary transition">
			<span class="relative flex items-center z-10 px-lg max-lg:text-white" :class="[textSizeClassBySize[size]]">
				<Icon
					v-if="icon"
					:name="icon"
					aria-hidden="true"
					class="transition-all duration-200 leading-[1.8]"
					:class="reversed ? 'mr-sm order-1' : 'ml-sm order-2'" />
				<span :class="[reversed ? 'order-2' : 'order-1']">{{ label }}</span>
			</span>

			<span
				ref="backgroundColor"
				class="absolute top-0 h-16 w-16 border border-primary rounded-full transition-transform duration-300 ease-out max-lg:hidden"
				:class="variantClassByVariant[variant]"
				:style="{
					left: reversed ? 'calc(100% - 64px)' : '0',
					right: 'auto',
				}" />

			<span
				class="absolute top-0 left-0 h-16 w-full rounded-full lg:hidden"
				:class="variantClassByVariant[variant]" />
		</div>
	</NuxtLink>
</template>
