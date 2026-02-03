<script setup lang="ts">
const register = inject<(el: HTMLElement, order?: number) => void>("gsapRevealRegister");

const el = ref<HTMLElement | null>(null);

const { order = 0 } = defineProps<{ order?: number }>();

onMounted(() => {
	if (el.value && register) {
		register(el.value, order);
	}
});
</script>

<template>
	<div ref="el" class="will-change-transform will-change-opacity">
		<slot />
	</div>
</template>
