<script setup lang="ts">
import type { Subservice, Offer } from "~/types/content/collections";

defineProps<{
	subservices: Subservice[];
	selectedIds: Set<number>;
	currentOffer: Offer | null;
}>();

const emit = defineEmits(["toggle"]);

function toggleSub(sub: Subservice) {
	emit("toggle", sub);
}
</script>

<template>
	<div class="space-y-xl">
		<h2 class="text-heading-lg font-bold text-center">2. Välj tillägg</h2>

		<Grid class="md:grid-cols-2 gap-xl">
			<div
				v-for="sub in subservices"
				:key="sub.id"
				@click="toggleSub(sub)"
				class="group relative cursor-pointer rounded-2xl border shadow-md p-lg transition hover:shadow-lg"
				:class="[
					selectedIds.has(sub.id) || currentOffer?.subservices?.some((s) => s.id === sub.id)
						? 'border-primary ring-2 ring-primary/50 bg-primary/5'
						: 'border-light/20 bg-white',
				]">
				<div class="flex flex-col space-y-sm">
					<h3 class="text-heading-sm font-semibold">{{ sub.title }}</h3>

					<p v-if="sub.price_once || sub.price_month" class="text-sm text-dark-gray">
						<span v-if="sub.price_once">+ {{ sub.price_once }} kr engångs</span>
						<span v-if="sub.price_month"> · {{ sub.price_month }} kr/mån</span>
					</p>

					<p
						v-if="currentOffer?.subservices?.some((s) => s.id === sub.id)"
						class="text-xs text-green-600 font-semibold">
						Ingår i paketet
					</p>
				</div>

				<div
					v-if="selectedIds.has(sub.id)"
					class="absolute top-3 right-3 bg-primary text-light w-sm h-sm rounded-full">
					<Icon name="lucide:check" size="16" />
				</div>
			</div>
		</Grid>
	</div>
</template>
