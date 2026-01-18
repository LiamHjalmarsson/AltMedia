<script setup lang="ts"></script>

<template>
	<div ref="rootRef" class="absolute inset-0 overflow-hidden pointer-events-none bg-white" aria-hidden="true">
		<div class="absolute inset-0 aurora" data-aurora="1" />
		<div class="absolute inset-0 aurora aurora--2" data-aurora="2" />

		<div class="absolute inset-0 bottom-fade" />
	</div>
</template>

<style scoped>
.aurora {
	background: radial-gradient(70% 80% at 22% 28%, rgba(116, 114, 226, 0.38) 0%, rgba(116, 114, 226, 0) 62%),
		radial-gradient(65% 75% at 78% 36%, rgba(174, 68, 90, 0.28) 0%, rgba(174, 68, 90, 0) 66%),
		radial-gradient(75% 85% at 52% 82%, rgba(242, 147, 69, 0.24) 0%, rgba(242, 147, 69, 0) 60%);
	filter: blur(52px) saturate(135%);
	opacity: 0.9;
	transform: translate3d(0, 0, 0);
	will-change: transform;
}

.aurora--2 {
	opacity: 0.55;
	filter: blur(70px) saturate(145%);
}

.bottom-fade {
	background: linear-gradient(
		180deg,
		rgba(249, 250, 250, 0) 0%,
		rgba(249, 250, 250, 0) 60%,
		rgba(249, 250, 250, 0.35) 78%,
		rgba(249, 250, 250, 0.75) 92%,
		rgba(249, 250, 250, 1) 100%
	);
	pointer-events: none;
}
</style>
