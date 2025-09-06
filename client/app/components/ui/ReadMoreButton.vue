<template>
	<button
		type="button"
		class="inline-flex items-center gap-1 text-sm font-semibold font-heading text-primary cursor-pointer group">
		<slot>Läs mer</slot>
		<span
			class="opacity-0 -translate-x-1 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0">
			➔
		</span>
	</button>
</template>
