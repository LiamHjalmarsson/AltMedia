<script setup lang="ts">
import type { Variant } from "~/types/enums";
import type { Icon } from "~/types/shared";

const props = defineProps<{
	icon: Icon;
	size?: number;
	variant?: Variant;
}>();

const wrapperSize = computed(() => props.size ?? 48);

const iconSize = computed(() => (props.size || 48) * 0.6);

const variantClasses = computed(() => {
	switch (props.variant) {
		case "primary":
			return "bg-primary/10 text-primary border-primary/20";
		case "secondary":
			return "bg-secondary/10 text-secondary border-secondary/20";
		default:
			return "bg-white/5 text-white border-white/10";
	}
});
</script>

<template>
	<span
		role="img"
		class="shadow-primary/40 relative flex justify-center items-center rounded-full shadow-lg p-xs mb-md"
		:class="[variantClasses]"
		:style="{ width: `${wrapperSize}px`, height: `${wrapperSize}px` }">
		<NuxtImg
			v-if="icon.is_image && icon.image?.url"
			:src="icon.image.url"
			:alt="icon.image.alternativeText || ''"
			format="webp,avif"
			quality="85"
			placeholder
			loading="lazy"
			class="object-contain" />

		<Icon v-else-if="icon.icon_name" :name="icon.icon_name" :size="iconSize" aria-hidden="true" />

		<span v-else class="text-xs text-white/60">?</span>
	</span>
</template>
