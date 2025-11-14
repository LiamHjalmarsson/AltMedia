<script setup lang="ts">
import type { FooterColumn } from "~/types";

defineProps<{ column: FooterColumn }>();
</script>

<template>
	<div class="space-y-md">
		<h4 class="text-lg font-semibold text-white">{{ column.title }}</h4>

		<ul class="space-y-sm">
			<li v-for="link in column.links" :key="link.label">
				<NuxtLink :to="link.url" class="block text-white/60 hover:text-white transition font-medium">
					{{ link.label }}
				</NuxtLink>
			</li>
		</ul>
	</div>
</template>
