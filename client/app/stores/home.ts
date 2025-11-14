import type { Strapi5ResponseSingle } from "@nuxtjs/strapi";
import type { HomePage } from "~/types";

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
			return null;
		} finally {
			loading.value = false;
		}
	}

	const hero = computed(() => homePage.value?.hero);

	const hasForm = computed(() => Boolean(homePage.value?.has_form && homePage.value?.form));

	const form = computed(() => homePage.value?.form);

	const blocks = computed(() => homePage.value?.blocks ?? []);

	return { homePage, hero, form, hasForm, blocks, loading, fetchHomePage };
});
