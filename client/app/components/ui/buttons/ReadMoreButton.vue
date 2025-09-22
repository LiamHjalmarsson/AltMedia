<template>
	<button
		type="button"
		class="inline-flex items-center text-sm font-semibold font-heading text-primary cursor-pointer group">
		<slot>Läs mer</slot>
		<span
			class="opacity-0 -translate-x-xs transition-all duration-300 pl-sm group-hover:opacity-100 group-hover:translate-x-0">
			➔
		</span>
	</button>
</template>
