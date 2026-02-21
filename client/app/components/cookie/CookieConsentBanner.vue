<script setup lang="ts">
const { shouldShowBanner, acceptCookies, declineCookies } = useCookieConsent();

function handleAcceptClick() {
	acceptCookies();
}

function handleDeclineClick() {
	declineCookies();
}
</script>

<template>
	<ClientOnly>
		<Teleport to="body">
			<Transition name="cookie-consent" appear>
				<div
					v-if="shouldShowBanner"
					role="dialog"
					aria-live="polite"
					aria-label="Cookie-inställningar"
					class="fixed bottom-0 right-0 md:bottom-4 md:right-4 z-[9999]">
					<div
						class="flex max-md:w-full md:max-w-[550px] flex-col space-y-md md:space-y-xs bg-white/85 backdrop-blur px-xl py-lg md:px-2xl md:py-xl shadow-lg max-md:rounded-t-2xl md:rounded-xl">
						<div class="space-y-xs">
							<p class="text-heading-sm font-semibold">Cookies</p>
							<p class="text-sm text-black/80">
								Vi använder cookies för att förbättra upplevelsen och (om du godkänner) analysera
								trafik. Du kan när som helst ändra ditt val.
							</p>
						</div>

						<div class="flex flex-col max-md:space-y-sm sm:space-x-sm md:flex-row sm:justify-end">
							<button
								type="button"
								class="rounded-lg border border-black px-md min-w-34 py-xs text-sm font-semibold hover:bg-black/1 cursor-pointer"
								@click="handleDeclineClick">
								Avböj
							</button>

							<button
								type="button"
								class="rounded-lg bg-black px-md min-w-34 py-xs text-sm font-semibold text-white hover:opacity-90 cursor-pointer"
								@click="handleAcceptClick">
								Acceptera
							</button>
						</div>
					</div>
				</div>
			</Transition>
		</Teleport>
	</ClientOnly>
</template>
