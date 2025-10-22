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
		<div
			class="w-[100%] py-lg lg:w-[80%] max-w-[1000px] px-md rounded-xl bg-light/20 bg-clip-padding backdrop-filter backdrop-blur-2xl shadow-xl">
			<nav class="flex items-center justify-between" aria-label="main navigation">
				<NuxtLink to="/" aria-label="Home">
					<NuxtImg
						:src="header.logo?.url"
						:alt="header.logo?.alternativeText || 'Alt Media logotyp'"
						width="180"
						height="30"
						sizes="120px sm:150px md:180px"
						format="webp"
						quality="85"
						fit="contain"
						loading="eager" />
				</NuxtLink>

				<NavigationLinks />

				<NavigationBurger :isMenuOpen @toggle="toggleMenu" :theme />
			</nav>
		</div>
	</header>

	<Teleport to="body">
		<NavigationDropdown
			:isMenuOpen
			@close="isMenuOpen = false"
			:class="theme === 'dark' ? 'text-light' : 'text-dark'" />
	</Teleport>
</template>
