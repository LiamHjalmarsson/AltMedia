<script setup lang="ts">
const props = defineProps<{
	label?: string;
	icon?: string;
	size?: number;
	to?: string;
	has_page?: boolean;
}>();

const visibleLabel = computed(() => props.label?.trim() || "Läs mer");

const isLink = computed(() => typeof props.to === "string" && props.to.length > 0);

const baseClasses = computed(() => {
	return "inline-flex items-center font-medium transition group cursor-pointer min-w-[44px] focus-visible:outline-primary text-xs md:text-sm lg:text-md";
});

const iconClasses =
	"ml-xs opacity-0 -translate-x-1 transition-all duration-300 pl-xs group-hover:opacity-100 group-hover:translate-x-0 flex items-center";
</script>

<template>
	<NuxtLink v-if="isLink" :to="props.to" :class="baseClasses" v-bind="$attrs">
		<span>{{ visibleLabel }}</span>

		<Icon
			:name="props.icon || 'lucide:arrow-right'"
			aria-hidden="true"
			:size="props.size || 16"
			:class="iconClasses" />
	</NuxtLink>

	<button v-else type="button" :class="baseClasses" v-bind="$attrs">
		<span>{{ visibleLabel }}</span>

		<Icon
			:name="props.icon || 'lucide:arrow-right'"
			aria-hidden="true"
			:size="props.size || 16"
			:class="iconClasses" />
	</button>
</template>
