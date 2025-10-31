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
		<div class="flex-2 grow">
			<div>
				<h2
					class="text-heading-lg md:text-heading-xl lg:text-heading-2xl xl:text-heading-3xl font-bold tracking-tight">
					{{ title }}
				</h2>

				<p v-if="description" class="text-xl font-medium">
					{{ description }}
				</p>
			</div>
		</div>

		<ButtonLink
			v-if="has_link && link?.url"
			:url="link.url"
			:label="link.label"
			icon="material-symbols:arrow-forward"
			class="max-lg:hidden w-fit shrink" />
	</div>
</template>
