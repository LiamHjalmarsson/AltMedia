import type { Strapi5ResponseSingle } from "@nuxtjs/strapi";
import type { HomePage } from "~/types/content/singles";

export const useHomeStore = defineStore("home-page", () => {
	const homePage = ref<HomePage | null>(null);

	const loading = ref(false);

	const { findOne } = useStrapi();

	async function fetchHomePage() {
		if (homePage.value) {
			return homePage.value;
		}

		loading.value = true;

		try {
			const res: Strapi5ResponseSingle<HomePage> = await findOne<HomePage>("home-page");

			homePage.value = res.data;

			return homePage.value;
		} catch (error) {
			console.error("Failed to fetch home page:", error);
		} finally {
			loading.value = false;
		}
	}

	return { homePage, loading, fetchHomePage };
});
