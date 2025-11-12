<script setup lang="ts">
import type { Variant } from "~/types";
import type { Button } from "~/types";

const props = defineProps<Button>();

const { element: button, backgroundColor } = useHoverAnimation(props.reversed ?? false);

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
		class="relative font-bold text-lg px-2xl cursor-pointer min-h-[44px] min-w-[44px] rounded-full focus-visible:outline-primary transition flex items-center justify-center space-x-sm">
		<span class="relative flex items-center z-10 px-2xs">
			<Icon
				v-if="icon"
				:name="icon"
				class="transition-all duration-200"
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

		<span
			class="absolute top-0 left-0 h-11 w-full bg-gradient-to-br from-primary to-primary-hover rounded-full lg:hidden" />
	</button>
</template>
