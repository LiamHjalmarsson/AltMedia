<script setup lang="ts">
import type { Page } from "~/types";

const route = useRoute();

const { findOne } = useStrapi();

const slug = computed(() => route.params.slug as string);

const { data: page, error } = await useAsyncData(
	`page-${route.params.slug}`,
	async () => {
		const { data } = await findOne<Page>("pages", route.params.slug as string);

		if (data) {
			return data;
		} else {
			throw createError({
				statusCode: 404,
				statusMessage: "Sidan kunde inte hittas",
			});
		}
	},
	{ server: true, lazy: false, watch: [slug] }
);

if (error.value) {
	throw createError({
		statusCode: error.value.statusCode || 500,
		statusMessage: error.value.statusMessage || "Ett fel uppstod",
	});
}

useAppHead(page?.value?.seo || undefined);
</script>

<template>
	<section v-if="page">
		<BlockRenderer v-if="page.blocks?.length" :blocks="page.blocks" />
	</section>
</template>
