<script setup lang="ts">
import type { FooterColumn } from "~/types";

defineProps<{ column: FooterColumn }>();
</script>

<template>
	<div class="space-y-md">
		<h4 class="text-lg font-semibold text-white">{{ column.title }}</h4>

		<ul class="space-y-sm">
			<li v-for="l in column.links" :key="l.label">
				<NuxtLink :to="l.url" class="block text-light/60 hover:text-white transition font-medium">
					{{ l.label }}
				</NuxtLink>
			</li>
		</ul>
	</div>
</template>
