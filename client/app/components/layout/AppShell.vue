<script setup lang="ts">
defineProps<{ showCta?: boolean }>();
</script>

<template>
	<div class="min-h-screen flex flex-col">
		<Navigation />

		<main class="grow">
			<slot />
		</main>

		<FooterCta v-if="showCta" />

		<Footer />
	</div>
</template>
