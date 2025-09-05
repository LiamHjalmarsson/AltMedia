<script setup lang="ts">
import { onMounted, ref } from "vue";

const btn = ref<HTMLButtonElement | null>(null);

const bg = ref<HTMLElement | null>(null);

const { element, bg: bgRef } = useHoverAnimation();

element.value = btn.value;

bgRef.value = bg.value;
</script>

<template>
	<button ref="btn" v-bind="$attrs" class="relative font-bold py-xs px-xxl cursor-pointer overflow-hidden">
		<span class="relative z-10">
			<slot />
		</span>
		<span ref="bg" class="absolute top-0 left-0 h-full w-10 bg-primary rounded-full" />
	</button>
</template>
