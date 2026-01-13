<script setup lang="ts">
import type { Variant } from "~/types";
import type { Button } from "~/types";

const props = defineProps<Button>();

const { element: button, backgroundColor } = useHoverAnimation(props.reversed ?? false);

const variantClass: Record<Variant, string> = {
	primary: "bg-gradient-to-br from-primary to-primary-hover border-primary max-lg:text-white",
	secondary: "bg-primary/10",
	ghost: "text-primary",
	outline: "border border-primary",
};

const sizeClass: Record<Button["size"], string> = {
	xs: "text-sm ",
	sm: "text-md ",
	md: "text-lg ",
	lg: "text-xl ",
	xl: "text-2xl ",
};
</script>

<template>
	<button
		ref="button"
		v-bind="$attrs"
		class="relative flex items-center justify-center font-bold px-xl cursor-pointer min-h-[44px] min-w-[44px] rounded-full focus-visible:outline-primary transition"
		:class="[sizeClass[size]]">
		<span class="relative flex items-center z-10 px-sm">
			<Icon
				v-if="icon"
				:name="icon"
				class="transition-all duration-200 leading-[1.8]"
				:class="reversed ? 'mr-sm order-1' : 'ml-sm order-2'" />
			<span :class="[reversed ? 'order-2' : 'order-1']">{{ label }}</span>
		</span>

		<span
			ref="backgroundColor"
			class="absolute top-0 h-11 w-11 border border-primary rounded-full transition-transform duration-300 ease-out max-lg:hidden"
			:class="variantClass[variant]"
			:style="{
				left: reversed ? 'calc(100% - 44px)' : '0',
				right: 'auto',
			}" />

		<span class="absolute top-0 left-0 h-11 w-full rounded-full lg:hidden" :class="variantClass[variant]" />
	</button>
</template>
