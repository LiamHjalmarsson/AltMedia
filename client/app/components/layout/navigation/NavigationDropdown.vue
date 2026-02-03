<script setup lang="ts">
import gsap from "gsap";

const props = defineProps<{
	isMobileMenuOpen: boolean;
}>();

const emit = defineEmits(["close"]);

const globalStore = useGlobalStore();

const { header } = storeToRefs(globalStore);

const dropdownWrapperRef = ref<HTMLElement | null>(null);

const isRendered = ref(false);

const route = useRoute();

function emitCloseRequest(): void {
	emit("close");
}

function animateDropdownOpen() {
	if (!dropdownWrapperRef.value) {
		return;
	}

	gsap.killTweensOf(dropdownWrapperRef.value);

	gsap.fromTo(
		dropdownWrapperRef.value,
		{
			height: 0,
			opacity: 0,
		},
		{
			height: "auto",
			opacity: 1,
			duration: 0.35,
			ease: "power2.out",
		},
	);
}

function animateDropdownClose(): Promise<void> {
	return new Promise((resolve) => {
		if (!dropdownWrapperRef.value) {
			return resolve();
		}

		gsap.killTweensOf(dropdownWrapperRef.value);

		gsap.to(dropdownWrapperRef.value, {
			height: 0,
			opacity: 0,
			duration: 0.3,
			ease: "power2.in",
			onComplete: resolve,
		});
	});
}

watch(
	() => props.isMobileMenuOpen,
	async (open: boolean) => {
		if (open) {
			isRendered.value = true;

			await nextTick();

			animateDropdownOpen();

			return;
		}

		await animateDropdownClose();

		isRendered.value = false;
	},
	{ immediate: true },
);

watch(
	() => route.fullPath,
	() => {
		if (props.isMobileMenuOpen) emitCloseRequest();
	},
);
</script>

<template>
	<div v-if="isRendered" id="mobile-menu" class="fixed top-28 left-0 w-full z-40 lg:hidden px-md">
		<div
			ref="dropdownWrapperRef"
			class="overflow-hidden border border-white/20 bg-white/20 bg-clip-padding backdrop-filter backdrop-blur-2xl shadow-2xl">
			<ul class="flex flex-col space-y-md p-lg">
				<li
					v-for="link in header?.links"
					:key="link.label"
					class="text-lg font-semibold text-center py-xs cursor-pointer">
					<MenuLink
						:link
						@click="emitCloseRequest"
						class="px-md py-2xs block font-semibold text-lg text-center w-full" />
				</li>

				<li v-if="header?.cta" class="pt-sm">
					<NuxtLink
						:to="header.cta.url"
						@click="emitCloseRequest"
						class="block text-center font-semibold text-heading-xs leading-[1.8] px-lg py-xs bg-primary text-white font-heading transition-colors duration-300 hover:bg-primary-dark focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary max-w-44 mx-auto rounded-xl">
						{{ header.cta.label }}
					</NuxtLink>
				</li>
			</ul>
		</div>
	</div>
</template>
