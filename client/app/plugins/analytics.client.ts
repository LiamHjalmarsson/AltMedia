export default defineNuxtPlugin(() => {
	const { consentStatus } = useCookieConsent();

	watch(
		() => consentStatus.value,
		(currentConsentStatus) => {
			if (currentConsentStatus !== "accepted") return;

			// Initiera analytics här (GTM, Plausible, GA4, etc.)
			// Exempel (pseudo):
			// initializeAnalytics();
		},
		{ immediate: true },
	);
});
