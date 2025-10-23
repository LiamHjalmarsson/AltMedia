<script setup lang="ts">
import type { Link } from "~/types/shared";

defineProps<{ links: Link[] }>();
</script>

<template>
	<div class="flex flex-wrap justify-center md:justify-end gap-md">
		<ButtonLink
			v-for="link in links"
			:key="link.id"
			:to="link.url"
			:variant="link.variant"
			class="min-w-[160px] text-center">
			{{ link.label }}
		</ButtonLink>
	</div>
</template>
