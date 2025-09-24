<script setup lang="ts">
import type { FooterColumn } from "~/types/content/singles";

defineProps<{ column: FooterColumn }>();
</script>

<template>
	<div class="flex flex-col font-heading max-lg:text-center">
		<NuxtLink :to="column.url" class="text-heading-xs lg:text-heading-sm font-semibold">
			{{ column.title }}
		</NuxtLink>

		<ul v-if="column.links?.length" class="mt-sm">
			<li v-for="subLink in column.links" :key="subLink.label" class="mb-sm">
				<MenuLink :link="subLink" />
			</li>
		</ul>
	</div>
</template>
