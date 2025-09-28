import { defineStore } from "pinia";
import { ref, computed } from "vue";
import type { Strapi5ResponseSingle } from "@nuxtjs/strapi";
import type { Offer, BuildProject, Subservice } from "~/types/content/collections";

export const useBuildProjectStore = defineStore("buildProject", () => {
	const buildProject = ref<BuildProject | null>(null);

	const currentOffer = ref<Offer | null>(null);

	const selectedSubIds = ref<Set<number>>(new Set());

	const loading = ref(false);

	const { findOne } = useStrapi();

	async function fetchBuildProject() {
		loading.value = true;

		try {
			const result: Strapi5ResponseSingle<BuildProject> = await findOne<BuildProject>("start-a-project");

			buildProject.value = result.data;

			return buildProject.value;
		} catch (error) {
			console.error("Failed to fetch start-project:", error);

			buildProject.value = null;

			return null;
		} finally {
			loading.value = false;
		}
	}

	function setCurrentOffer(offerId: number) {
		if (!buildProject.value) {
			return;
		}

		const found = buildProject.value.offers.find((offer) => offer.id === offerId) || null;

		currentOffer.value = found;

		selectedSubIds.value = new Set(found?.subservices?.map((s) => s.id) || []);
	}

	function toggleSub(subservice: Subservice) {
		if (currentOffer.value?.subservices?.some((sub) => sub.id === subservice.id)) {
			return;
		}

		const next = new Set(selectedSubIds.value);

		next.has(subservice.id) ? next.delete(subservice.id) : next.add(subservice.id);

		selectedSubIds.value = next;
	}

	const offers = computed<Offer[]>(() => buildProject.value?.offers || []);

	const subservices = computed<Subservice[]>(() => buildProject.value?.subservices || []);

	const selectedSubs = computed<Subservice[]>(() => subservices.value.filter((s) => selectedSubIds.value.has(s.id)));

	const totalOnce = computed(() => {
		const base = currentOffer.value?.start_price || 0;

		const add = selectedSubs.value.reduce(
			(sum, subservice) =>
				sum +
				(currentOffer.value?.subservices?.some((inc) => inc.id === subservice.id)
					? 0
					: subservice.price_once || 0),
			0
		);

		return base + add;
	});

	const totalMonthly = computed(() => {
		const base = currentOffer.value?.month_price || 0;

		const add = selectedSubs.value.reduce(
			(sum, subservice) =>
				sum +
				(currentOffer.value?.subservices?.some((inc) => inc.id === subservice.id)
					? 0
					: subservice.price_month || 0),
			0
		);
		return base + add;
	});

	return {
		buildProject,
		currentOffer,
		selectedSubIds,
		loading,

		fetchBuildProject,
		setCurrentOffer,
		toggleSub,

		offers,
		subservices,
		selectedSubs,
		totalOnce,
		totalMonthly,
	};
});
