<script setup lang="ts">
import type { Button } from "~/types";

const props = defineProps<Button>();

const { element: button, backgroundColor } = useHoverAnimation(props.reversed ?? false);
</script>

<template>
	<button
		ref="button"
		v-bind="$attrs"
		:type="type"
		class="relative flex items-center justify-center font-bold px-2xl cursor-pointer min-h-[64px] min-w-[84px] rounded-full focus-visible:outline-primary transition"
		:class="[textSizeClassBySize[size]]">
		<span class="relative flex items-center z-10 px-lg">
			<Icon
				v-if="icon"
				:name="icon"
				class="transition-all duration-200 leading-[1.8]"
				:class="reversed ? 'mr-sm order-1' : 'ml-sm order-2'" />
			<span :class="[reversed ? 'order-2' : 'order-1']">{{ label }}</span>
		</span>

		<span
			ref="backgroundColor"
			class="absolute top-0 left-0 h-16 w-16 border border-primary rounded-full transition-transform duration-300 ease-out max-lg:hidden"
			:class="variantClassByVariant[variant]" />

		<span
			class="absolute top-0 left-0 h-16 w-full rounded-full lg:hidden"
			:class="variantClassByVariant[variant]" />
	</button>
</template>
