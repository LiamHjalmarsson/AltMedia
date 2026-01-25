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
			</ul>
		</div>
	</div>
</template>
