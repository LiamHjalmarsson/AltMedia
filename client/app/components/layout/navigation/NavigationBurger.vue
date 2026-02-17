<script setup lang="ts">
import type { Theme } from "~/types";

const props = defineProps<{
	isMobileMenuOpen: boolean;
	theme: Theme;
}>();

const emit = defineEmits(["toggle"]);

const burgerColor = computed(() => (props.theme === "dark" ? "bg-white" : "bg-black"));

const buttonAriaLabel = computed(() => (props.isMobileMenuOpen ? "Stäng meny" : "Öppna meny"));
</script>

<template>
	<button
		type="button"
		:aria-label="buttonAriaLabel"
		:aria-expanded="isMobileMenuOpen"
		aria-controls="mobile-menu"
		@click="emit('toggle')"
		class="p-xs space-y-2xs rounded-md z-50 cursor-pointer lg:hidden focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none">
		<span
			v-for="number in 3"
			:key="number"
			aria-hidden="true"
			:class="[
				'block h-[3px] w-8 rounded transition-all duration-300 ease-in-out origin-center',
				burgerColor,
				number === 1 && isMobileMenuOpen ? 'rotate-45 translate-y-[7px]' : '',
				number === 2 && isMobileMenuOpen ? 'opacity-0 scale-0' : '',
				number === 3 && isMobileMenuOpen ? '-rotate-45 -translate-y-[7px]' : '',
			]" />
	</button>
</template>
