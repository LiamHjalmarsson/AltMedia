<script setup lang="ts">
const isMobileMenuOpen = ref(false);

const headerElementRef = ref<HTMLElement | null>(null);

const globalStore = useGlobalStore();

const { header } = storeToRefs(globalStore);

const {
	theme: headerTheme,
	init: initializeHeaderContrast,
	destroy,
} = useAutoHeaderContrast(headerElementRef, {
	baseSelector: ".hero",
});

const textTheme = computed(() => {
	return headerTheme.value === "dark" ? "text-white" : "text-black";
});

function toggleMobileMenuVisibility() {
	isMobileMenuOpen.value = !isMobileMenuOpen.value;
}

function closeMobileMenu(): void {
	isMobileMenuOpen.value = false;
}

const route = useRoute();
watch(
	() => route.fullPath,
	() => {
		closeMobileMenu();
	},
);

onMounted(() => {
	initializeHeaderContrast();
});

onBeforeUnmount(() => {
	destroy();
});
</script>

<template>
	<header
		v-if="header"
		ref="headerElementRef"
		class="fixed p-md lg:p-lg z-50 w-full flex justify-center items-center">
		<nav
			aria-label="main navigation"
			class="flex items-center justify-between w-[100%] py-lg xl:w-[80%] max-w-[1400px] px-md lg:px-lg border border-white/20 bg-white/40 bg-clip-padding backdrop-filter backdrop-blur-2xl shadow-xl"
			:class="textTheme">
			<NavigationLogo :logo="header.logo" />

			<NavigationLinks />

			<NavigationBurger :isMobileMenuOpen @toggle="toggleMobileMenuVisibility" :theme="headerTheme" />
		</nav>
	</header>

	<Teleport to="body">
		<NavigationDropdown :isMobileMenuOpen @close="closeMobileMenu" :class="textTheme" />
	</Teleport>
</template>
