<script setup lang="ts">
import type { Page } from "~/types";

const route = useRoute();

const { findOne } = useStrapi();

const { data: page, error } = await useAsyncData(
	`page-${route.params.slug}`,
	async () => {
		const res = await findOne<Page>("pages", route.params.slug as string);

		if (res?.data) {
			return res.data;
		} else {
			throw createError({
				statusCode: 404,
				statusMessage: "Sidan kunde inte hittas",
			});
		}
	},
	{ server: true, lazy: true }
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
