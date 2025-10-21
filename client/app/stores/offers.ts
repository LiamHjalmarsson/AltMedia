import { defineStore } from "pinia";
import { ref } from "vue";
import type { Strapi5ResponseMany, Strapi5ResponseSingle } from "@nuxtjs/strapi";
import type { Offer } from "~/types/content/collections";

export const useOfferStore = defineStore("offers", () => {
	const offers = ref<Offer[]>([]);

	const currentOffer = ref<Offer | null>(null);

	const loading = ref(false);

	const { find, findOne } = useStrapi();

	async function fetchOffers() {
		loading.value = true;

		try {
			const res: Strapi5ResponseMany<Offer> = await find<Offer>("offers");

			offers.value = res.data || [];

			return offers.value;
		} catch (error) {
			console.error("Failed to fetch offers:", error);
		} finally {
			loading.value = false;
		}
	}

	async function fetchOffer(slug: string) {
		loading.value = true;

		try {
			const result: Strapi5ResponseSingle<Offer> = await findOne<Offer>("offers", slug);

			currentOffer.value = result.data;

			return currentOffer.value;
		} catch (error) {
			console.error("Failed to fetch offer:", error);
		} finally {
			loading.value = false;
		}
	}

	return {
		offers,
		currentOffer,
		loading,
		fetchOffers,
		fetchOffer,
	};
});
