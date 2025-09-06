import type { Strapi5ResponseMany } from "@nuxtjs/strapi";
import type { Service } from "~/types/content/collections";

export const useServiceStore = defineStore("services", () => {
	const services = ref<Service[]>([]);

	const { find } = useStrapi();

	async function fetchServices(title?: string | null) {
		const params: {
			filters?: {
				title: { $eqi: string };
			};
		} = {};

		if (title) {
			params.filters = {
				title: { $eqi: title },
			};
		}

		const result: Strapi5ResponseMany<Service> = await find<Service>("services", params);

		services.value = result.data || [];

		return services.value;
	}

	return { services, fetchServices };
});
