<script setup lang="ts">
defineProps<{
	modelValue?: string | number;
	label?: string;
	name?: string;
	type?: "text" | "textarea" | string;
	error?: string;
	icon?: string;
	rows?: number;
}>();

const emit = defineEmits(["update:modelValue"]);

function onInput(event: Event) {
	const element = event.target as HTMLInputElement | HTMLTextAreaElement;

	emit("update:modelValue", element.value);
}

const inputClasses =
	"w-full px-lg py-sm xl:py-md border text-md bg-white shadow-lg transition-all duration-200 border-black/10  focus:border-primary focus:ring-2 focus:ring-primary rounded-xl placeholder:text-2xs rounded-2xl";
</script>

<template>
	<div class="space-y-xs w-full">
		<label
			v-if="label"
			:for="name"
			class="text-2xs lg:text-sm font-medium select-none cursor-pointer inline-flex gap-1">
			{{ label }}
			<span v-if="$attrs.required" class="text-primary">*</span>
		</label>

		<div class="relative">
			<textarea
				v-if="type === 'textarea'"
				v-bind="$attrs"
				:value="modelValue"
				@input="onInput"
				:rows="rows"
				:name="name"
				:class="inputClasses + ' resize-none'" />

			<input
				v-else
				v-bind="$attrs"
				:value="modelValue"
				@input="onInput"
				:type="type"
				:name="name"
				:class="[inputClasses]" />

			<Icon
				v-if="icon"
				:name="icon"
				class="absolute right-4 top-1/2 -translate-y-1/2 text-black/40 pointer-events-none"
				size="18" />
		</div>

		<p v-if="error" role="alert" class="text-error text-sm font-medium mt-1">
			{{ error }}
		</p>
	</div>
</template>
