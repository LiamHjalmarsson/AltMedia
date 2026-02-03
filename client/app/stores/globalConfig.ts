import type { GlobalConfig } from "~/types/singelTypes/globalConfig";

export const useGlobalStore = defineStore("global-config", () => {
	const globalConfigData = ref<GlobalConfig | null>(null);

	const globalConfigLoaded = ref(false);

	const loading = ref(false);

	const { findOne } = useStrapi();

	const header = computed(() => globalConfigData.value?.navigation);

	const footer = computed(() => globalConfigData.value?.footer);

	const seo = computed(() => globalConfigData.value?.seo);

	const contact = computed(() => globalConfigData.value?.contact);

	async function fetchGlobalConfig(): Promise<GlobalConfig | null> {
		if (globalConfigLoaded.value) return globalConfigData.value;

		loading.value = true;

		try {
			const { data } = await findOne<GlobalConfig>("global-config");

			globalConfigData.value = data;

			globalConfigLoaded.value = true;

			return globalConfigData.value;
		} catch (err) {
			globalConfigData.value = null;

			return null;
		} finally {
			loading.value = false;
		}
	}

	return { globalConfigData, globalConfigLoaded, header, footer, seo, contact, loading, fetchGlobalConfig };
});
