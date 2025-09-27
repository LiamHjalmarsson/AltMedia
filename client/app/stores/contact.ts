import type { Strapi5ResponseSingle } from "@nuxtjs/strapi";
import type { ContactPage } from "~/types/content/singles";

export const useContactStore = defineStore("contact", () => {
	const contact = ref<ContactPage | null>(null);

	const loading = ref(false);

	const { findOne } = useStrapi();

	async function fetchContact() {
		loading.value = true;
		try {
			const res: Strapi5ResponseSingle<ContactPage> = await findOne<ContactPage>("contact");

			contact.value = res.data;

			return contact.value;
		} catch (err) {
			console.error("Failed to fetch contact:", err);
		} finally {
			loading.value = false;
		}
	}

	return { contact, loading, fetchContact };
});
