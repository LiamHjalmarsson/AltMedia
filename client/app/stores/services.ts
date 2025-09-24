import type { Strapi5ResponseMany, Strapi5ResponseSingle } from "@nuxtjs/strapi";
import type { Service, Subservice } from "~/types/content/collections";

export const useServiceStore = defineStore("services", () => {
	const services = ref<Service[]>([]);

	const currentService = ref<Service | null>(null);

	const currentSubService = ref<Subservice | null>(null);

	const loading = ref(false);

	const { find, findOne } = useStrapi();

	async function fetchServices(title?: string | null) {
		loading.value = true;

		try {
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
		} catch (error) {
			console.error("Failed to fetch services:", error);
		} finally {
			loading.value = false;
		}
	}

	async function fetchService(slug: string) {
		const res: Strapi5ResponseMany<Service> = await find<Service>("services", {
			filters: { slug: { $eq: slug } },
		});

		console.log(res.data);

		currentService.value = res.data?.[0] ?? null;

		return currentService.value;
	}

	async function fetchSubService(slug: string) {
		loading.value = false;

		try {
			const result: Strapi5ResponseSingle<Subservice> = await findOne<Subservice>("subservices", slug);

			currentSubService.value = result.data;

			return currentService.value;
		} catch (error) {
			console.error("Failed to fetch", error);
		} finally {
			loading.value = false;
		}
	}

	return { services, currentService, currentSubService, loading, fetchServices, fetchService, fetchSubService };
});
