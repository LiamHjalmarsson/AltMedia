<script setup lang="ts">
import type { SocialMedia } from "~/types";

defineProps<{
	socialMedias: SocialMedia[];
	size?: "sm" | "md" | "lg";
}>();

const sizeClass = {
	sm: "w-10 h-10 text-md",
	md: "w-12 h-12 text-lg",
	lg: "w-14 h-14 text-xl",
};

function getAriaLabel(media: SocialMedia) {
	if (media.title) {
		return `Besök oss på ${media.title}`;
	}

	try {
		const url = new URL(media.url);

		return `Öppna ${url.hostname}`;
	} catch {
		return "Öppna länk";
	}
}
</script>

<template>
	<ul class="flex items-center space-x-lg">
		<li v-for="social in socialMedias" :key="social.id">
			<NuxtLink
				:to="social.url"
				target="_blank"
				:aria-label="getAriaLabel(social)"
				rel="noopener noreferrer"
				class="rounded-full bg-white/10 hover:bg-white/15 transition flex items-center justify-center focus-visible:ring-2 focus-visible:ring-primary"
				:class="sizeClass[size || 'md']">
				<Icon :name="social.icon?.icon_name" class="text-white" />
			</NuxtLink>
		</li>
	</ul>
</template>
