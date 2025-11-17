<script setup lang="ts">
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
	<header v-if="header" ref="headerRef" class="fixed p-md lg:p-xl z-50 w-full flex justify-center items-center">
		<nav
			aria-label="main navigation"
			class="flex items-center justify-between w-[100%] py-lg lg:w-[80%] max-w-[1400px] px-md lg:px-lg border border-white/20 bg-white/20 bg-clip-padding backdrop-filter backdrop-blur-2xl shadow-xl"
			:class="theme === 'dark' ? 'text-white' : 'text-black'">
			<NavigationLogo :logo="header.logo" />

			<NavigationLinks />

			<NavigationBurger :isMenuOpen @toggle="toggleMenu" :theme />
		</nav>
	</header>

	<Teleport to="body">
		<NavigationDropdown
			:isMenuOpen
			@close="isMenuOpen = false"
			:class="theme === 'dark' ? 'text-white' : 'text-black'" />
	</Teleport>
</template>
