import type { Strapi5ResponseSingle } from "@nuxtjs/strapi";
import type { GlobalConfig } from "~/types/content/singles";

export const useGlobalStore = defineStore("global-config", () => {
	const globalConfig = ref<GlobalConfig | null>(null);

	const loading = ref(false);

	const { findOne } = useStrapi();

	async function fetchGlobalConfig() {
		if (globalConfig.value) {
			return;
		}

		loading.value = true;

		try {
			const res: Strapi5ResponseSingle<GlobalConfig> = await findOne("global-config");

			globalConfig.value = res.data;

			return globalConfig.value;
		} catch (error) {
			console.error("Failed to fetch global config:", error);
		} finally {
			loading.value = false;
		}
	}

	const header = computed(() => globalConfig.value?.navigation);

	const footer = computed(() => globalConfig.value?.footer);

	const seo = computed(() => globalConfig.value?.seo);

	const contact = computed(() => globalConfig.value?.contact);

	return { globalConfig, header, footer, seo, contact, loading, fetchGlobalConfig };
});
