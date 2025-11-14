<script setup lang="ts">
const isMenuOpen = ref(false);

const headerRef = ref<HTMLElement | null>(null);

const globalStore = useGlobalStore();

const { header } = storeToRefs(globalStore);

const { theme, init, destroy, force } = useAutoHeaderContrast(headerRef, {
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
		:class="theme === 'dark' ? 'text-white' : 'text-black'">
		<nav
			aria-label="main navigation"
			class="flex items-center justify-between w-[100%] py-lg lg:w-[90%] px-md lg:px-lg border border-white/40 bg-white/40 bg-clip-padding backdrop-filter backdrop-blur-2xl shadow-xl">
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
