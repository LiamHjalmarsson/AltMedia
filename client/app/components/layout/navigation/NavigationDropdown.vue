<script setup lang="ts">
import { storeToRefs } from "pinia";

defineProps<{
	isMenuOpen: boolean;
}>();

const emit = defineEmits(["close"]);

const globalStore = useGlobalStore();

const { header } = storeToRefs(globalStore);

const { onEnter, onLeave } = useCollapse();
</script>

<template>
	<Transition @enter="onEnter" @leave="onLeave">
		<div
			v-show="isMenuOpen"
			id="mobile-menu"
			class="fixed top-28 -left-0 md:-left-6 w-full flex justify-center md:justify-end z-40 lg:hidden p-lg">
			<div
				class="bg-white/10 bg-clip-padding backdrop-filter backdrop-blur-2xl p-lg shadow-2xl overflow-hidden transform-origin-top w-[95%] md:w-fit rounded-xl">
				<ul class="flex flex-col space-y-md">
					<li
						v-for="link in header?.links"
						:key="link.label"
						role="menu"
						class="transition-opacity duration-500 relative">
						<MenuLink
							:link
							role="menuitem"
							@click="emit('close')"
							class="px-md py-2xs block font-semibold text-lg text-center w-full" />
					</li>
				</ul>
			</div>
		</div>
	</Transition>
</template>
