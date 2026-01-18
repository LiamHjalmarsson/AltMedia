<script setup lang="ts">
const globalStore = useGlobalStore();

const { footer, contact } = storeToRefs(globalStore);

const year = new Date().getFullYear();
</script>

<template>
	<footer class="bg-black text-white py-5xl">
		<div class="max-w-[1300px] mx-auto px-xl">
			<div class="space-y-2xl lg:space-y-3xl">
				<div class="space-y-md flex flex-col items-center justify-center text-center">
					<NuxtImg
						v-if="footer?.logo.url"
						:src="footer.logo.url"
						:alt="footer.logo.alternativeText || 'Alt media'"
						loading="lazy"
						width="450"
						height="300"
						format="webp,avif"
						quality="85"
						class="object-contain" />

					<p v-if="footer?.description" class="text-white/90 text-heading-xs max-w-[950px] mt-xl">
						{{ footer?.description }}
					</p>

					<SocialLinks :social-medias="contact?.social_medias || []" class="mx-auto w-fit mt-md" />
				</div>

				<div class="flex flex-col md:flex-row justify-between gap-3xl mb-2xl lg:mb-4xl">
					<FooterColumn
						v-for="column in footer?.footer_columns"
						:key="column.title"
						:column="column"
						class="max-lg:text-center" />

					<div class="space-y-md max-lg:text-center">
						<span class="block font-medium text-heading-md">Kontakt</span>

						<address class="space-y-xs not-italic flex flex-col">
							<NuxtLink
								:to="`mailto:${contact?.email}`"
								class="block text-white/80 text-lg hover:text-white transition font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
								>{{ contact?.email }}</NuxtLink
							>
							<NuxtLink
								:to="`tel:${contact?.phone}`"
								class="block text-white/80 text-lg hover:text-white transition font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
								>{{ contact?.phone }}</NuxtLink
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
					class="flex max-lg:flex-col max-lg:space-y-xl items-center lg:space-x-xl text-sm">
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
