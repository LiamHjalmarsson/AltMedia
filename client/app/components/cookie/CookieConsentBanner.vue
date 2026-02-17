<script setup lang="ts">
const { shouldShowBanner, acceptCookies, declineCookies } = useCookieConsent();

const bannerRootElement = ref<HTMLElement | null>(null);

function handleAcceptClick(): void {
	acceptCookies();
}

function handleDeclineClick(): void {
	declineCookies();
}
</script>

<template>
	<Teleport to="body">
		<Transition name="cookie-consent" appear>
			<div
				v-if="shouldShowBanner"
				ref="bannerRootElement"
				class="fixed bottom-0 right-0 md:bottom-4 md:right-4 z-[9999]"
				role="dialog"
				aria-live="polite"
				aria-label="Cookie-inställningar">
				<div
					class="flex max-md:w-full md:max-w-[550px] flex-col space-y-md md:space-y-xs bg-white/85 backdrop-blur px-xl py-lg md:px-2xl md:py-xl shadow-lg max-md:rounded-t-2xl md:rounded-xl">
					<div class="space-y-xs">
						<p class="text-heading-sm font-semibold">Cookies</p>
						<p class="text-sm text-black/80">
							Vi använder cookies för att förbättra upplevelsen och (om du godkänner) analysera trafik. Du
							kan när som helst ändra ditt val.
						</p>
					</div>

					<div class="flex flex-col max-md:space-y-sm sm:space-x-sm md:flex-row sm:justify-end">
						<button
							type="button"
							class="rounded-lg border border-black px-sm py-xs text-sm font-semibold hover:bg-black/1 cursor-pointer"
							@click="handleDeclineClick">
							Avböj
						</button>

						<button
							type="button"
							class="rounded-lg bg-black px-sm py-xs text-sm font-semibold text-white hover:opacity-90 cursor-pointer"
							@click="handleAcceptClick">
							Acceptera
						</button>
					</div>
				</div>
			</div>
		</Transition>
	</Teleport>
</template>

<style scoped>
/* IN */
.cookie-consent-enter-active {
	transition:
		opacity 200ms ease,
		transform 220ms ease;
}
.cookie-consent-enter-from {
	opacity: 0;
	transform: translate3d(0, 12px, 0) scale(0.98);
}
.cookie-consent-enter-to {
	opacity: 1;
	transform: translate3d(0, 0, 0) scale(1);
}

/* UT */
.cookie-consent-leave-active {
	transition:
		opacity 160ms ease,
		transform 180ms ease;
}
.cookie-consent-leave-from {
	opacity: 1;
	transform: translate3d(0, 0, 0) scale(1);
}
.cookie-consent-leave-to {
	opacity: 0;
	transform: translate3d(0, 12px, 0) scale(0.98);
}
</style>
