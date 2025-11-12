<script setup lang="ts">
const store = useBuildProjectStore();

const { summaryData } = storeToRefs(store);

const mergedSummary = computed<Record<string, string>>(() => {
	const data = { ...summaryData.value };

	const mergedSummary: Record<string, string> = {};

	for (const [key, value] of Object.entries(data)) {
		const val = Array.isArray(value) ? value.join(", ") : (value ?? "");

		if (key.toLowerCase().includes("specificera") && data["Hur ser din budget ut?"]) {
			mergedSummary["Hur ser din budget ut?"] = `${data["Hur ser din budget ut?"]} – ${val}`;

			continue;
		}

		if (key.toLowerCase().includes("beskriv") && data["När behöver du lansera?"]) {
			mergedSummary["När behöver du lansera?"] = `${data["När behöver du lansera?"]} – ${val}`;

			continue;
		}

		if (["Specificera din budget", "Beskriv din tidsplan"].includes(key)) {
			continue;
		}

		mergedSummary[key] = val;
	}

	return mergedSummary;
});
</script>

<template>
	<div class="bg-white shadow-md p-6 rounded-lg">
		<h3 class="text-2xl font-semibold mb-6">Sammanfattning</h3>

		<div class="grid md:grid-cols-2 gap-x-10 gap-y-6">
			<div v-for="(value, key) in mergedSummary" :key="key" class="border-b border-gray-200 pb-3">
				<p class="font-semibold text-lg mb-1">{{ key }}</p>
				<p class="text-gray-700">{{ value }}</p>
			</div>
		</div>
	</div>
</template>
