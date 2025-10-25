<script setup lang="ts"></script>

<template>
	<NuxtLink
		to="mailto:hello@altmedia.se"
		class="inline-flex min-h-[44px] min-w-[44px] items-center justify-center gap-2 rounded-full border border-light/30 px-lg py-sm text-sm font-semibold text-light transition hover:border-primary hover:text-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary">
		<slot />
	</NuxtLink>
</template>
