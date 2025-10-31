<script setup lang="ts">
import { ref } from "vue";
import { storeToRefs } from "pinia";

const isMenuOpen = ref(false);

const headerRef = ref<HTMLElement | null>(null);

const globalStore = useGlobalStore();

const { header } = storeToRefs(globalStore);

const { theme, init, destroy } = useAutoHeaderContrast(headerRef, {
	baseSelector: ".hero",
});

function toggleMenu() {
	isMenuOpen.value = !isMenuOpen.value;
}

onMounted(init);

onBeforeUnmount(destroy);
</script>

<template>
	<header
		v-if="header"
		ref="headerRef"
		class="fixed p-md lg:p-xl z-50 w-full flex justify-center items-center"
		:class="theme === 'dark' ? 'text-light' : 'text-dark'">
		<nav
			aria-label="main navigation"
			class="flex items-center justify-between w-[100%] py-lg lg:w-[90%] px-md lg:px-lg border border-light-gray/40 bg-light/40 bg-clip-padding backdrop-filter backdrop-blur-2xl shadow-xl">
			<NavigationLogo :logo="header.logo" />

			<NavigationLinks />

			<NavigationBurger :isMenuOpen @toggle="toggleMenu" :theme />
		</nav>
	</header>

	<Teleport to="body">
		<NavigationDropdown
			:isMenuOpen
			@close="isMenuOpen = false"
			:class="theme === 'dark' ? 'text-light' : 'text-dark'" />
	</Teleport>
</template>
