import type { Strapi5ResponseMany, Strapi5ResponseSingle } from "@nuxtjs/strapi";
import type { Service, Subservice } from "~/types/content/collections";

export const useServiceStore = defineStore("services", () => {
	const services = ref<Service[]>([]);

	const subservices = ref<Subservice[]>([]);

	const currentService = ref<Service | null>(null);

	const currentSubService = ref<Subservice | null>(null);

	const loading = ref(false);

	const { find, findOne } = useStrapi();

	async function fetchServices(title?: string | null) {
		loading.value = true;

		try {
			const params: any = {};

			if (title) {
				params.filters = { title: { $eqi: title } };
			}

			const result: Strapi5ResponseMany<Service> = await find<Service>("services", params);
			services.value = result.data ?? [];
		} catch (error) {
			console.error("Failed to fetch services:", error);

			services.value = [];
		} finally {
			loading.value = false;
		}

		return services.value;
	}

	async function fetchService(slug: string) {
		loading.value = true;

		try {
			const result: Strapi5ResponseSingle<Service> = await findOne<Service>("services", slug);

			currentService.value = result.data;

			return currentSubService.value;
		} catch (error) {
			console.error("Failed to fetch services:", error);

			return null;
		} finally {
			loading.value = false;
		}
	}

	async function fetchSubServices() {
		loading.value = true;

		try {
			const result: Strapi5ResponseMany<Subservice> = await find<Subservice>("subservices");

			subservices.value = result.data ?? [];
		} catch (error) {
			console.error("Failed to fetch subservices:", error);

			subservices.value = [];
		} finally {
			loading.value = false;
		}

		return subservices.value;
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

	return {
		services,
		currentService,
		subservices,
		currentSubService,
		loading,
		fetchServices,
		fetchService,
		fetchSubServices,
		fetchSubService,
	};
});
