export type CookieConsentDecision = "accepted" | "declined";

export type CookieConsentStatus = CookieConsentDecision | "unknown";

const COOKIE_CONSENT_COOKIE_KEY = "cookie_consent_decision";

const COOKIE_CONSENT_COOKIE_MAX_AGE_SECONDS = 60 * 60 * 24 * 180;

export function useCookieConsent() {
	const consentCookieRef = useCookie<CookieConsentDecision | null>(COOKIE_CONSENT_COOKIE_KEY, {
		maxAge: COOKIE_CONSENT_COOKIE_MAX_AGE_SECONDS,
		sameSite: "lax",
		secure: process.env.NODE_ENV === "production",
	});

	const consentStatus = computed<CookieConsentStatus>(() => {
		return consentCookieRef.value ?? "unknown";
	});

	const hasDecided = computed(() => consentStatus.value !== "unknown");

	const shouldShowBanner = computed(() => consentStatus.value === "unknown");

	function acceptCookies() {
		consentCookieRef.value = "accepted";
	}

	function declineCookies() {
		consentCookieRef.value = "declined";
	}

	function resetDecision() {
		consentCookieRef.value = null;
	}

	return {
		consentStatus,
		hasDecided,
		shouldShowBanner,
		acceptCookies,
		declineCookies,
		resetDecision,
	};
}
