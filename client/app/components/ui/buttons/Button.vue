<script setup lang="ts">
import type { UiButtonComponent } from "~/types/components/ui/button";

const props = defineProps<UiButtonComponent>();

const { element: button, backgroundColor } = useHoverAnimation(props.reversed ?? false);
</script>

<template>
	<button
		ref="button"
		v-bind="$attrs"
		:type="type"
		class="relative flex items-center justify-center font-bold px-2xl cursor-pointer min-h-12 max-md:w-full lg:min-h-[64px] min-w-[84px] rounded-full focus-visible:outline-primary transition text-xs md:text-md lg:text-lg"
		:class="[textSizeClassBySize[size], variant === 'primary' ? 'max-lg:text-white' : '']">
		<span class="relative flex items-center z-10 px-lg">
			<Icon
				v-if="icon"
				:name="icon"
				class="transition-all duration-200"
				:class="reversed ? 'mr-sm order-1' : 'ml-sm order-2'" />
			<span :class="[reversed ? 'order-2' : 'order-1']">{{ label }}</span>
		</span>

		<span
			ref="backgroundColor"
			class="absolute top-0 left-0 h-16 w-16 border border-primary rounded-full transition-transform duration-300 ease-out max-lg:hidden"
			:class="variantClassByVariant[variant]" />

		<span
			class="absolute top-0 left-0 h-12 w-full rounded-full lg:hidden"
			:class="variantClassByVariant[variant]" />
	</button>
</template>
