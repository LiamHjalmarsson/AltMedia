<script setup lang="ts">
import type { Theme } from "~/types";

const props = defineProps<{
	isMenuOpen: boolean;
	theme: Theme;
}>();

const emit = defineEmits(["toggle"]);

const barColor = computed(() => {
	return props.theme === "dark" ? "bg-white" : "bg-black";
});

const ariaLabel = computed(() => (props.isMenuOpen ? "Stäng meny" : "Öppna meny"));
</script>

<template>
	<button
		@click="emit('toggle')"
		:aria-label="ariaLabel"
		:aria-expanded="isMenuOpen"
		aria-controls="mobile-menu"
		type="button"
		class="p-xs space-y-2xs rounded-md z-50 cursor-pointer lg:hidden focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none">
		<span
			v-for="number in 3"
			:key="number"
			aria-hidden="true"
			:class="[
				'block h-[3px] w-8 rounded transition-all duration-300 ease-in-out origin-center',
				barColor,
				number === 1 && isMenuOpen ? 'rotate-45 translate-y-[7px]' : '',
				number === 2 && isMenuOpen ? 'opacity-0 scale-0' : '',
				number === 3 && isMenuOpen ? '-rotate-45 -translate-y-[7px]' : '',
			]" />
	</button>
</template>
