import type { Strapi5ResponseSingle } from "@nuxtjs/strapi";
import type { GlobalConfig } from "~/types/singels/globalConfig";

export const useGlobalStore = defineStore("global-config", () => {
	const globalConfig = ref<GlobalConfig | null>(null);

	const { findOne } = useStrapi();

	async function fetchGlobal() {
		const res: Strapi5ResponseSingle<GlobalConfig> = await findOne("global-config");

		globalConfig.value = res.data;

		return globalConfig.value;
	}

	const header = computed(() => globalConfig.value?.navigation);

	const footer = computed(() => globalConfig.value?.footer);

	const seo = computed(() => globalConfig.value?.seo);

	const contact = computed(() => globalConfig.value?.contact);

	return { globalConfig, header, footer, seo, contact, fetchGlobal };
});
