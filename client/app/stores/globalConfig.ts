import type { Strapi5ResponseSingle } from "@nuxtjs/strapi";
import type { GlobalConfig } from "~/types";

export const useGlobalStore = defineStore("global-config", () => {
	const globalConfig = ref<GlobalConfig | null>(null);

	const globalConfigLoaded = ref(false);

	const loading = ref(false);

	const { findOne } = useStrapi();

	async function fetchGlobalConfig() {
		if (globalConfigLoaded.value) return;

		loading.value = true;

		try {
			const res: Strapi5ResponseSingle<GlobalConfig> = await findOne<GlobalConfig>("global-config");

			globalConfig.value = res.data;

			globalConfigLoaded.value = true;

			return globalConfig.value;
		} finally {
			loading.value = false;
		}
	}

	const header = computed(() => globalConfig.value?.navigation);

	const footer = computed(() => globalConfig.value?.footer);

	const seo = computed(() => globalConfig.value?.seo);

	const contact = computed(() => globalConfig.value?.contact);

	return { globalConfig, globalConfigLoaded, header, footer, seo, contact, loading, fetchGlobalConfig };
});
