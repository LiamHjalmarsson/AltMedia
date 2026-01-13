<script setup lang="ts">
import type { NuxtError } from "#app";

const props = defineProps<{
	error: NuxtError;
}>();
</script>

<template>
	<main class="min-h-screen flex items-center justify-center bg-white px-xl py-4xl">
		<section class="max-w-container-md w-full text-center">
			<p class="text-primary font-bold text-[144px] font-heading">
				{{ error?.statusCode || "Error" }}
			</p>

			<h1 class="text-heading-3xl font-extrabold tracking-tight text-black">Sidan kunde inte hittas</h1>

			<p class="mt-sm text-black/80 text-md">
				Länken du följde verkar vara trasig eller sidan har flyttats. Du kan försöka gå tillbaka till
				startsidan.
			</p>

			<div class="mt-lg flex items-center justify-center gap-sm">
				<ButtonLink variant="primary" url="/" label="Gå till startsidan" size="lg" />
			</div>
		</section>
	</main>
</template>
