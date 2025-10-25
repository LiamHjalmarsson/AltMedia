<script setup lang="ts">
import type { Heading } from "~/types/shared";

const { align_content } = defineProps<Heading>();

const alignClass = computed(() => {
	if (align_content === "center") {
		return "text-center";
	}

	if (align_content === "right") {
		return "text-right";
	}

	return "text-left";
});
</script>

<template>
	<div :class="[alignClass, has_link ? 'flex justify-between items-center w-full' : '']">
		<div>
			<span class="block text-sm font-semibold uppercase tracking-widest text-primary"> Våra kärntjänster </span>

			<h2
				class="text-heading-lg md:text-heading-xl lg:text-heading-2xl xl:text-heading-3xl 2xl:text-heading-4xl font-bold tracking-tight">
				{{ title }}
			</h2>
		</div>

		<ButtonLink v-if="has_link && link?.url" :to="link.url" class="max-lg:hidden">
			{{ link.label }}
			<Icon name="material-symbols:arrow-forward" size="18" class="ml-sm" />
		</ButtonLink>
	</div>
</template>
