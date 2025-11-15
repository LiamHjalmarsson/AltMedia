<script setup lang="ts">
import gsap from "gsap";

const props = defineProps<{
	isMenuOpen: boolean;
}>();

const emit = defineEmits(["close"]);

const globalStore = useGlobalStore();

const { header } = storeToRefs(globalStore);

const wrapperRef = ref<HTMLElement | null>(null);

const isRendered = ref(false);

function slideDown() {
	if (!wrapperRef.value) {
		return;
	}

	gsap.killTweensOf(wrapperRef.value);

	gsap.fromTo(
		wrapperRef.value,
		{
			height: 0,
			opacity: 0,
		},
		{
			height: "auto",
			opacity: 1,
			duration: 0.35,
			ease: "power2.out",
		}
	);
}

function slideUp(): Promise<void> {
	return new Promise((resolve) => {
		if (!wrapperRef.value) {
			return resolve();
		}

		gsap.killTweensOf(wrapperRef.value);

		gsap.to(wrapperRef.value, {
			height: 0,
			opacity: 0,
			duration: 0.3,
			ease: "power2.in",
			onComplete: resolve,
		});
	});
}

watch(
	() => props.isMenuOpen,
	async (open: boolean) => {
		if (open) {
			isRendered.value = true;

			await nextTick();

			slideDown();
		} else {
			await slideUp();

			isRendered.value = false;
		}
	}
);
</script>

<template>
	<div v-if="isRendered" id="mobile-menu" class="fixed top-28 left-0 w-full z-40 lg:hidden px-md">
		<div
			ref="wrapperRef"
			class="overflow-hidden border border-white/20 bg-white/20 bg-clip-padding backdrop-filter backdrop-blur-2xl shadow-2xl">
			<ul class="flex flex-col space-y-md p-lg">
				<li
					v-for="link in header?.links"
					:key="link.label"
					role="menu"
					class="text-lg font-semibold text-center py-xs cursor-pointer"
					@click="emit('close')">
					<MenuLink
						:link
						role="menuitem"
						@click="emit('close')"
						class="px-md py-2xs block font-semibold text-lg text-center w-full" />
				</li>
			</ul>
		</div>
	</div>
</template>
