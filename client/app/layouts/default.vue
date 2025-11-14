<script setup lang="ts"></script>

<template>
	<div class="min-h-screen flex flex-col">
		<Navigation />

		<main class="grow">
			<slot />
		</main>

		<FooterCta />

		<Footer />
	</div>
</template>
