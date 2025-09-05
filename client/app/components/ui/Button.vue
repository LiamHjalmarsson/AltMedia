<script setup lang="ts"></script>

<template>
	<button ref="btn" v-bind="$attrs" class="relative font-bold py-xs px-xxl cursor-pointer">
		<span class="relative z-10">
			<slot />
		</span>
		<span ref="bg" class="absolute top-0 left-0 h-full w-10 bg-primary rounded-full" />
	</button>
</template>
