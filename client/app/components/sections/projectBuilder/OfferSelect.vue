<script setup lang="ts">
import type { Website } from "~/types/content/collections";

defineProps<{
	offers: Website[];
	currentOfferId: number | null;
}>();

const emit = defineEmits(["select"]);
</script>

<template>
	<div class="space-y-xl">
		<h2 class="text-heading-lg font-bold text-center mb-lg">1. Välj ett paket</h2>
	</div>
</template>
