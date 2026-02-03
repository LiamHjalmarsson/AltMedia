<script setup lang="ts">
import type { Variant } from "~/types";
import type { UiIconComponent } from "~/types/components/ui/icon";

const props = defineProps<{
	icon: UiIconComponent;
	size?: number;
	variant?: Variant;
}>();

const wrapperSize = computed(() => props.size ?? 48);

const iconSize = computed(() => (props.size || 48) * 0.6);
</script>

<template>
	<span
		role="img"
		class="relative flex justify-center items-center"
		:style="{ width: `${wrapperSize}px`, height: `${wrapperSize}px` }">
		<NuxtImg
			v-if="icon.is_image && icon.image?.url"
			:src="icon.image.url"
			:alt="icon.image.alternativeText || ''"
			format="webp,avif"
			quality="85"
			placeholder
			loading="lazy"
			class="object-contain absolute h-full w-full" />

		<Icon v-else-if="icon.icon_name" :name="icon.icon_name" :size="iconSize" aria-hidden="true" />

		<span v-else class="text-xs text-white/60">?</span>
	</span>
</template>
