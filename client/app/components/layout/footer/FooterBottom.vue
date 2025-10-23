<script setup lang="ts">
import type { SocialMedia } from "~/types/content/singles";

defineProps<{
	year: number;
	socials: SocialMedia[];
}>();
</script>

<template>
	<div
		class="border-t border-light/10 pt-xl mt-xl flex flex-col md:flex-row justify-between items-center text-center gap-lg">
		<div class="w-1/4" />

		<div class="text-center text-sm lg:text-md text-gray font-semibold w-full xl:w-2/4">
			© {{ year }} Alt media. Alla rättigheter förbehållna.
		</div>

		<SocialLinks :social-medias="socials" class="w-1/4" />
	</div>
</template>
