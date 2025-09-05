<script setup lang="ts">
import { storeToRefs } from "pinia";

const globalStore = useGlobalStore();

const { header } = storeToRefs(globalStore);

defineProps<{
	isMenuOpen: boolean;
}>();

const emit = defineEmits<{
	(e: "close"): void;
}>();

const { onEnter, onLeave } = useCollapse();
</script>

<template>
	<Transition @enter="onEnter" @leave="onLeave">
		<div
			v-show="isMenuOpen"
			id="mobile-menu"
			class="fixed top-24 -left-0 md:-left-6 w-full flex justify-center md:justify-end z-40 lg:hidden p-lg">
			<div
				class="bg-light/10 bg-clip-padding backdrop-filter backdrop-blur-2xl p-lg shadow-2xl overflow-hidden transform-origin-top w-[95%] md:w-fit rounded-2xl">
				<ul class="flex flex-col space-y-md">
					<li
						v-for="link in header?.links"
						:key="link.label"
						class="transition-opacity duration-500 relative">
						<MenuLink
							:link
							class="px-md py-xxs block font-semibold text-lg text-center w-full"
							@click="emit('close')" />
					</li>
				</ul>
			</div>
		</div>
	</Transition>
</template>
