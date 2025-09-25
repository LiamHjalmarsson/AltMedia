<script setup lang="ts">
import { ref, watch, provide, onMounted, onBeforeUnmount, inject, computed } from "vue";
import gsap from "gsap";

const props = defineProps<{
	modelValue?: string | number | (string | number)[];
	multiple?: boolean;
}>();

const emit = defineEmits(["update:modelValue"]);

const isOpen = ref(false);

const dropdownRef = ref<HTMLDivElement | null>(null);

const optionsRef = ref<HTMLDivElement | null>(null);

provide("selectValue", (value: string | number) => selectValue(value));

provide("currentValue", props.modelValue);

const selectedOptions = computed(() => {
	if (Array.isArray(props.modelValue)) {
		return props.modelValue;
	}
	return props.modelValue ? [props.modelValue] : [];
});

function selectValue(value: string | number) {
	if (props.multiple) {
		const options = Array.isArray(props.modelValue) ? [...props.modelValue] : [];

		if (options.includes(value)) {
			emit(
				"update:modelValue",
				options.filter((option) => option !== value)
			);
		} else {
			emit("update:modelValue", [...options, value]);
		}
	} else {
		emit("update:modelValue", value);
	}
}

function toggle() {
	isOpen.value = !isOpen.value;
}

function handleClickOutside(e: MouseEvent) {
	if (dropdownRef.value && !dropdownRef.value.contains(e.target as Node)) {
		isOpen.value = false;
	}
}

onMounted(() => {
	document.addEventListener("click", handleClickOutside);
});

onBeforeUnmount(() => {
	document.removeEventListener("click", handleClickOutside);
});

watch(isOpen, (open) => {
	if (!optionsRef.value) {
		return;
	}

	if (open) {
		gsap.fromTo(
			optionsRef.value,
			{ height: 0, opacity: 0 },
			{ height: "auto", opacity: 1, duration: 0.3, ease: "power3.out" }
		);
	} else {
		gsap.to(optionsRef.value, {
			height: 0,
			opacity: 0,
			duration: 0.3,
			ease: "power2.inOut",
		});
	}
});
</script>

<template>
	<div ref="dropdownRef" class="relative w-full">
		<button
			type="button"
			class="w-full py-xs px-sm rounded-lg outline-none backdrop-blur-lg transition shadow-xl bg-dark-gray/10 border-light/5 border cursor-pointer text-start flex items-center justify-between"
			@click="toggle">
			<slot name="label">Välj tjänst</slot>
		</button>

		<div
			ref="optionsRef"
			class="absolute left-0 top-10 mt-sm w-full overflow-hidden rounded-lg border border-light/10 bg-dark backdrop-blur-lg shadow-lg z-10 h-0 opacity-0">
			<div class="flex flex-col max-h-64 overflow-y-auto">
				<slot />
			</div>
		</div>

		<div v-if="selectedOptions.length" class="mt-sm px-2xs space-x-xs">
			<button
				v-for="option in selectedOptions"
				:key="option"
				class="text-sm text-light-gray px-sm py-2xs rounded-full bg-primary">
				{{ option }}
			</button>
		</div>
	</div>
</template>
