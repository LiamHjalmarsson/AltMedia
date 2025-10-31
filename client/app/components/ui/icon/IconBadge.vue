<script setup lang="ts">
import type { Variant } from "~/types/enums";
import type { Icon } from "~/types/shared";

const props = defineProps<{
	icon: Icon;
	size?: number;
	variant?: Variant;
}>();

const iconSize = computed(() => (props.size || 48) * 0.6);
</script>

<template>
	<span
		class="shadow-primary/40 relative flex justify-center items-center rounded-full shadow-lg p-xs mb-md"
		:class="[
			variant === 'primary' && 'bg-primary/10 text-primary border-primary/20',
			variant === 'secondary' && 'bg-secondary/10 text-secondary border-secondary/20',
		]"
		:style="{ width: `${size || 48}px`, height: `${size || 48}px` }"
		role="img">
		<NuxtImg
			v-if="icon.is_image && icon.image?.url"
			:src="icon.image.url"
			:alt="icon.image.alternativeText || ''"
			format="webp"
			quality="85"
			placeholder
			loading="lazy"
			class="object-contain" />

		<Icon v-else-if="icon.icon_name" :name="icon.icon_name" :size="iconSize" />

		<span v-else class="text-xs text-light/60">?</span>
	</span>
</template>
