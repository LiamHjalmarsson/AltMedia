<script setup lang="ts">
const store = useBuildProjectStore();

const { summaryData } = storeToRefs(store);

const mergedSummary = computed<Record<string, string>>(() => {
	const data = { ...summaryData.value };

	const mergedSummary: Record<string, string> = {};

	for (const [key, value] of Object.entries(data)) {
		const val = Array.isArray(value) ? value.join(", ") : value ?? "";

		if (key.toLowerCase().includes("specificera") && data["Hur ser din budget ut?"]) {
			const budgetRaw = data["Hur ser din budget ut?"];

			const base = Array.isArray(budgetRaw) ? budgetRaw.join(", ") : budgetRaw ?? "";

			if (base === "Annat (specificera)") {
				mergedSummary["Hur ser din budget ut?"] = val;
			} else {
				mergedSummary["Hur ser din budget ut?"] = base;
			}
			continue;
		}

		if (key.toLowerCase().includes("beskriv") && data["När behöver du lansera?"]) {
			const launchRaw = data["När behöver du lansera?"];

			const launch = Array.isArray(launchRaw) ? launchRaw.join(", ") : launchRaw ?? "";

			if (launch === "Annat (specificera)") {
				mergedSummary["När behöver du lansera?"] = val;
			} else {
				mergedSummary["När behöver du lansera?"] = launch;
			}

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
	<div class="bg-white shadow-md p-xl">
		<h3 class="text-2xl font-semibold mb-lg">Sammanfattning</h3>

		<div class="grid max-xl:grid-cols-2 gap-x-lg gap-y-lg">
			<div v-for="(value, key) in mergedSummary" :key="key" class="border-b border-gray-200 pb-3">
				<p class="font-semibold text-lg mb-1">{{ key }}</p>
				<p class="text-dark/80">{{ value }}</p>
			</div>
		</div>
	</div>
</template>
