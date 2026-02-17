<script setup lang="ts">
import type { UiFooterColumnComponent } from "~/types/components/global/footer";

defineProps<{ column: UiFooterColumnComponent }>();
</script>

<template>
	<div class="space-y-sm lg:space-y-md flex-1">
		<NuxtLink
			:to="column.url"
			class="block font-medium text-heading-sm lg:text-heading-md transition hover:text-white/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary">
			{{ column.title }}
		</NuxtLink>

		<ul class="space-y-sm">
			<li v-for="link in column.links" :key="link.label">
				<NuxtLink
					:to="link.url"
					class="block text-white/80 text-sm lg:text-lg hover:text-white transition font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary">
					{{ link.label }}
				</NuxtLink>
			</li>
		</ul>
	</div>
</template>
