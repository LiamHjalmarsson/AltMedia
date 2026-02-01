import type { HomePage } from "~/types/singelTypes/homePage";

export const useHomeStore = defineStore("home-page", () => {
	const homePage = ref<HomePage | null>(null);

	const loaded = ref(false);

	const loading = ref(false);

	const { findOne } = useStrapi();

	const hero = computed(() => homePage.value?.hero);

	const hasForm = computed(() => Boolean(homePage.value?.has_form && homePage.value?.form));

	const form = computed(() => homePage.value?.form);

	const blocks = computed(() => homePage.value?.blocks ?? []);

	async function fetchHomePage() {
		if (loaded.value) return homePage.value;

		loading.value = true;

		try {
			const res = await findOne<HomePage>("home-page");

			homePage.value = res.data;

			loaded.value = true;

			return homePage.value;
		} catch (error) {
			homePage.value = null;

			return null;
		} finally {
			loading.value = false;
		}
	}

	return { homePage, hero, form, hasForm, blocks, loading, fetchHomePage };
});
