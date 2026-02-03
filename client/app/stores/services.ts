import type { Service } from "~/types/collectionTypes/service";
import type { Subservice } from "~/types/collectionTypes/subservice";

export const useServiceStore = defineStore("services", () => {
	const services = ref<Service[]>([]);

	const currentService = ref<Service | null>(null);

	const subService = ref<Subservice | null>(null);

	const servicesLoaded = ref(false);

	const loading = ref(false);

	const { find, findOne } = useStrapi();

	async function fetchServices() {
		if (servicesLoaded.value) return services.value;

		loading.value = true;
		try {
			const { data } = await find<Service>("services", {
				sort: ["order:asc"],
			});

			services.value = data ?? [];

			servicesLoaded.value = true;

			return services.value;
		} catch {
			services.value = [];

			return [];
		} finally {
			loading.value = false;
		}
	}

	async function fetchService(slug: string) {
		if (currentService.value?.slug === slug) return currentService.value;

		loading.value = true;

		try {
			const { data } = await findOne<Service>("services", slug);

			currentService.value = data ?? null;

			return currentService.value;
		} catch {
			currentService.value = null;

			return null;
		} finally {
			loading.value = false;
		}
	}

	async function fetchSubService(slug: string) {
		if (subService.value?.slug === slug) return subService.value;

		loading.value = true;
		try {
			const { data } = await findOne<Subservice>("subservices", slug);

			subService.value = data ?? null;

			return subService.value;
		} catch {
			subService.value = null;

			return null;
		} finally {
			loading.value = false;
		}
	}

	return {
		services,
		currentService,
		subService,
		loading,
		fetchServices,
		fetchService,
		fetchSubService,
	};
});
