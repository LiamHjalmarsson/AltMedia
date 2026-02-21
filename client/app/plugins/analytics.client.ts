export default defineNuxtPlugin(() => {
	const { consentStatus } = useCookieConsent();

	watch(
		() => consentStatus.value,
		(status) => {
			if (status === "accepted") {
			}
		},
		{ immediate: true },
	);
});
