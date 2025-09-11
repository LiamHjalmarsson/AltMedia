import type { Strapi5ResponseMany, Strapi5ResponseSingle } from "@nuxtjs/strapi";
import type { Service, Subservice } from "~/types/content/collections";

export const useServiceStore = defineStore("services", () => {
	const services = ref<Service[]>([]);

	const currentService = ref<Service>();

	const currentSubService = ref<Subservice>();

	const { find, findOne } = useStrapi();

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

	async function fetchService(id: string) {
		const result: Strapi5ResponseSingle<Service> = await findOne<Service>("services", id);

		currentService.value = result.data;

		return currentService.value;
	}

	async function fetchSubService(id: string) {
		const result: Strapi5ResponseSingle<Subservice> = await findOne<Subservice>("subservices", id);

		currentSubService.value = result.data;

		return currentService.value;
	}

	return { services, currentService, currentSubService, fetchServices, fetchService, fetchSubService };
});
