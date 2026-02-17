<script setup lang="ts">
const isMobileMenuOpen = ref(false);

const headerElementRef = ref<HTMLElement | null>(null);

const globalStore = useGlobalStore();

const { header } = storeToRefs(globalStore);

const {
	theme: headerTheme,
	init: initializeHeaderContrast,
	destroy: destroyHeaderContrast,
} = useAutoHeaderContrast(headerElementRef, {
	baseSelector: ".hero",
});

const textTheme = computed(() => (headerTheme.value === "dark" ? "text-white" : "text-black"));

function toggleMobileMenuVisibility() {
	isMobileMenuOpen.value = !isMobileMenuOpen.value;
}

function closeMobileMenu(): void {
	isMobileMenuOpen.value = false;
}

const route = useRoute();

watch(() => route.fullPath, closeMobileMenu);

onMounted(() => {
	initializeHeaderContrast();
});

onBeforeUnmount(() => {
	destroyHeaderContrast();
});
</script>

<template>
	<header v-if="header" ref="headerElementRef" class="fixed z-50 w-full flex justify-center items-center">
		<nav
			aria-label="main navigation"
			class="w-full py-lg px-lg lg:py-xl lg:px-2xl 2xl:px-4xl border border-white/20 bg-white/40 bg-clip-padding backdrop-filter backdrop-blur-2xl"
			:class="textTheme">
			<div class="flex items-center justify-between max-w-[1600px] mx-auto">
				<NavigationLogo :logo="header.logo" />

				<NavigationLinks />

				<NavigationBurger :isMobileMenuOpen @toggle="toggleMobileMenuVisibility" :theme="headerTheme" />
			</div>
		</nav>
	</header>

	<Teleport to="body">
		<NavigationDropdown :isMobileMenuOpen @close="closeMobileMenu" :class="textTheme" />
	</Teleport>
</template>
