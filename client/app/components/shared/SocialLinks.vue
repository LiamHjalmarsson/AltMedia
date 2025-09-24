<script setup lang="ts">
import type { SocialMedia } from "~/types/content/singles";

defineProps<{ socialMedias: SocialMedia[] }>();
</script>

<template>
	<div class="flex justify-end items-center space-x-md">
		<NuxtLink v-for="social in socialMedias" :key="social.id" :to="social.url" target="_blank" rel="noopener">
			<Icon :name="social.icon?.icon_name" size="24" />
		</NuxtLink>
	</div>
</template>
