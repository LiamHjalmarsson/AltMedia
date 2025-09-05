<script setup lang="ts">
import { storeToRefs } from "pinia";

const globalStore = useGlobalStore();

const { header } = storeToRefs(globalStore);

defineProps<{
	isMenuOpen: boolean;
}>();

const emit = defineEmits<{
	(e: "close"): void;
}>();
</script>

<template>
	<div
		v-show="isMenuOpen"
		id="mobile-menu"
		class="fixed top-32 left-0 md:-left-14 w-full flex justify-center md:justify-end z-40 lg:hidden">
		<div>
			<ul
				class="w-[90%] md:w-fit rounded-2xl flex flex-col transform-origin-top p-lg gap-md bg-light/10 bg-clip-padding backdrop-filter backdrop-blur-2xl shadow-2xl">
				<li v-for="link in header?.links" :key="link.label" class="transition-opacity duration-500">
					<NuxtLink
						:to="link.url"
						@click="emit('close')"
						class="block font-semibold text-lg text-center px-md py-xs">
						{{ link.label }}
					</NuxtLink>
				</li>
			</ul>
		</div>
	</div>
</template>
