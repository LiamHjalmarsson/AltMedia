<script setup lang="ts">
import { ref } from "vue";
import { storeToRefs } from "pinia";

const globalStore = useGlobalStore();

const { header } = storeToRefs(globalStore);

const isMenuOpen = ref(false);

const headerRef = ref<HTMLElement | null>(null);

const { theme, init, destroy } = useAutoHeaderContrast(headerRef, {
	baseSelector: ".hero",
});

onMounted(init);

onBeforeUnmount(destroy);

function toggleMenu() {
	isMenuOpen.value = !isMenuOpen.value;
}
</script>

<template>
	<header
		v-if="header"
		ref="headerRef"
		class="fixed p-lg z-50 w-full flex justify-center items-center"
		:class="theme === 'dark' ? 'text-light' : 'text-dark'">
		<div
			class="w-[95%] lg:w-[80%] max-w-[1000px] px-md rounded-xl bg-light/20 bg-clip-padding backdrop-filter backdrop-blur-2xl shadow-xl">
			<nav class="flex items-center justify-between" aria-label="main navigation">
				<NuxtLink to="/" aria-label="Home">
					<NuxtImg
						:src="header.logo?.url"
						:width="header.logo?.width"
						:height="header.logo?.height"
						format="webp"
						quality="80"
						:alt="header.logo?.alternativeText || ''" />
				</NuxtLink>

				<NavigationLinks />

				<BurgerMenu :is-menu-open="isMenuOpen" @toggle="toggleMenu" :theme />
			</nav>
		</div>
	</header>

	<Teleport to="body">
		<MobilMenu
			:is-menu-open="isMenuOpen"
			@close="isMenuOpen = false"
			:class="theme === 'dark' ? 'text-light' : 'text-dark'" />
	</Teleport>
</template>
