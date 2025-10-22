<template>
	<button
		type="button"
		aria-label="Läs mer om innehållet"
		class="inline-flex items-center text-sm font-semibold text-primary cursor-pointer group focus-visible:outline-primary min-h-[44px] min-w-[44px]">
		<slot>Läs mer</slot>
		<span
			class="opacity-0 -translate-x-xs transition-all duration-300 pl-sm group-hover:opacity-100 group-hover:translate-x-0">
			➔
		</span>
	</button>
</template>
