<script setup lang="ts">
const globalStore = useGlobalStore();

const { footer, contact } = storeToRefs(globalStore);

const year = new Date().getFullYear();

const socialMedias = computed(() => contact.value?.social_medias ?? []);

const contactEmail = computed(() => contact.value?.email?.trim() || "");

const contactPhone = computed(() => contact.value?.phone?.trim() || "");
</script>

<template>
	<footer class="bg-black text-white py-5xl">
		<div class="max-w-[1300px] mx-auto px-xl">
			<div class="space-y-2xl lg:space-y-3xl">
				<div class="flex flex-col items-center justify-center text-center">
					<NuxtImg
						v-if="footer?.logo.url"
						:src="footer.logo.url"
						:alt="footer.logo.alternativeText || 'Alt media'"
						loading="lazy"
						width="350"
						height="250"
						format="webp,avif"
						quality="85"
						class="object-contain" />

					<p
						v-if="footer?.description"
						class="text-white/80 text-sm md:text-lg lg:text-xl max-w-[950px] mt-xl">
						{{ footer?.description }}
					</p>

					<SocialLinks :social-medias="socialMedias" class="mx-auto w-fit mt-xl" />
				</div>

				<div class="flex flex-col md:flex-row justify-between gap-xl md:gap-2xl lg:gap-3xl mb-2xl lg:mb-4xl">
					<FooterColumn
						v-for="column in footer?.footer_columns"
						:key="column.title"
						:column="column"
						class="max-lg:text-center" />

					<div class="space-y-sm lg:space-y-md max-lg:text-center">
						<span class="block font-medium text-heading-sm lg:text-heading-md">Kontakt</span>

						<address class="space-y-xs not-italic flex flex-col">
							<NuxtLink
								v-if="contactEmail"
								:to="`mailto:${contactEmail}`"
								class="block text-white/80 text-sm lg:text-lg hover:text-white transition font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
								>{{ contactEmail }}</NuxtLink
							>
							<NuxtLink
								v-if="contactPhone"
								:to="`tel:${contactPhone}`"
								class="block text-white/80 text-sm lg:text-lg hover:text-white transition font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
								>{{ contactPhone }}</NuxtLink
							>
						</address>
					</div>
				</div>
			</div>

			<div class="w-full h-px bg-white/10 my-2xl" />

			<div class="flex flex-col lg:flex-row justify-between items-center gap-xl lg:gap-lg mt-2xl lg:mt-4xl">
				<p class="text-white/80 text-sm text-center leading-[1.4]">
					© {{ year }} Alt Media — Alla rättigheter förbehållna.
				</p>

				<nav
					aria-label="Legal navigation"
					class="flex max-lg:flex-col items-center space-y-md lg:space-x-xl text-sm">
					<NuxtLink to="/policy" class="text-white/80 hover:text-white transition font-medium"
						>Integritetspolicy</NuxtLink
					>
					<NuxtLink to="/cookies" class="text-white/80 hover:text-white transition font-medium"
						>Cookies</NuxtLink
					>
					<NuxtLink to="/contact" class="text-white/80 hover:text-white transition font-medium"
						>Kontakt</NuxtLink
					>
				</nav>
			</div>
		</div>
	</footer>
</template>
