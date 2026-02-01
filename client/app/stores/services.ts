import type { Service } from "~/types/collectionTypes/service";
import type { Subservice } from "~/types/collectionTypes/subservice";

export const useServiceStore = defineStore("services", () => {
	const services = ref<Service[]>([]);

	const subservices = ref<Subservice[]>([]);

	const currentService = ref<Service | null>(null);

	const currentSubService = ref<Subservice | null>(null);

	const servicesLoaded = ref(false);

	const loading = ref(false);

	const { find, findOne } = useStrapi();

	const servicesSorted = computed(() => services.value.slice().sort((a, b) => (a.order ?? 999) - (b.order ?? 999)));

	async function fetchServices() {
		if (servicesLoaded.value) return servicesSorted.value;

		loading.value = true;
		try {
			const res = await find<Service>("services", {
				sort: ["order:asc"],
			});

			services.value = res.data ?? [];

			servicesLoaded.value = true;

			return servicesSorted.value;
		} catch {
			services.value = [];

			return [];
		} finally {
			loading.value = false;
		}
	}

	async function fetchService(slug: string) {
		if (currentService.value?.slug === slug) return currentService.value;

		const cached = services.value.find((service) => service.slug === slug);

		if (cached) {
			currentService.value = cached;

			return cached;
		}

		loading.value = true;

		try {
			const res = await findOne<Service>("services", slug);

			currentService.value = res.data ?? null;

			return currentService.value;
		} catch {
			currentService.value = null;

			return null;
		} finally {
			loading.value = false;
		}
	}

	async function fetchSubService(slug: string) {
		if (currentSubService.value?.slug === slug) return currentSubService.value;

		const cached = subservices.value.find((s) => s.slug === slug);

		if (cached) {
			currentSubService.value = cached;

			return cached;
		}

		loading.value = true;
		try {
			const res = await findOne<Subservice>("subservices", slug);

			currentSubService.value = res.data ?? null;

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
		fetchSubService,
	};
});
