<script setup lang="ts">
import type { FooterColumn } from "~/types";

defineProps<{ column: FooterColumn }>();
</script>

<template>
	<div class="space-y-md">
		<h3 class="block text-white transition font-medium text-2xl">
			<NuxtLink
				:to="column.url"
				class="transition hover:text-white/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary">
				{{ column.title }}
			</NuxtLink>
		</h3>

		<ul class="space-y-sm">
			<li v-for="link in column.links" :key="link.label">
				<NuxtLink
					:to="link.url"
					class="block text-white/80 hover:text-white transition font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary">
					{{ link.label }}
				</NuxtLink>
			</li>
		</ul>
	</div>
</template>
