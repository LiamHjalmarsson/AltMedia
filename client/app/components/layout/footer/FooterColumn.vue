<script setup lang="ts">
import type { FooterColumn } from "~/types";

defineProps<{ column: FooterColumn }>();
</script>

<template>
	<div class="space-y-md">
		<NuxtLink :to="column.url" class="block text-white transition font-medium text-2xl">
			{{ column.title }}
		</NuxtLink>

		<ul class="space-y-sm">
			<li v-for="link in column.links" :key="link.label">
				<NuxtLink :to="link.url" class="block text-white/80 hover:text-white transition font-medium">
					{{ link.label }}
				</NuxtLink>
			</li>
		</ul>
	</div>
</template>
