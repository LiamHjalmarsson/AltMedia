import { defineStore } from "pinia";
import type { Strapi5ResponseMany, Strapi5ResponseSingle } from "@nuxtjs/strapi";
import type { Service, Subservice } from "~/types/content/collections";

export const useServiceStore = defineStore("services", () => {
	const services = ref<Service[]>([]);

	const subservices = ref<Subservice[]>([]);

	const currentService = ref<Service | null>(null);

	const currentSubService = ref<Subservice | null>(null);

	const loading = ref(false);

	const { find, findOne } = useStrapi();

	async function fetchServices() {
		loading.value = true;
		try {
			const result: Strapi5ResponseMany<Service> = await find<Service>("services");

			services.value = result.data ?? [];
		} catch {
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

			return currentService.value;
		} catch {
			currentService.value = null;
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
		} catch {
			subservices.value = [];
		} finally {
			loading.value = false;
		}
		return subservices.value;
	}

	async function fetchSubService(slug: string) {
		loading.value = true;
		try {
			const result: Strapi5ResponseSingle<Subservice> = await findOne<Subservice>("subservices", slug);

			currentSubService.value = result.data;

			return currentSubService.value;
		} catch {
			currentSubService.value = null;

			return null;
		} finally {
			loading.value = false;
		}
	}

	return {
		services,
		subservices,
		currentService,
		currentSubService,
		loading,
		fetchServices,
		fetchService,
		fetchSubServices,
		fetchSubService,
	};
});
