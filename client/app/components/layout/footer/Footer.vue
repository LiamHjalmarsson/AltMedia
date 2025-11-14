<script setup lang="ts">
const globalStore = useGlobalStore();

const { footer, contact } = storeToRefs(globalStore);

const year = new Date().getFullYear();
</script>

<template>
	<footer class="bg-black text-white py-5xl">
		<div class="max-w-[1300px] mx-auto px-xl">
			<div class="space-y-4xl">
				<div class="space-y-md flex flex-col items-center justify-center text-center">
					<NuxtImg
						v-if="footer?.logo.url"
						:src="footer.logo.url"
						:alt="footer.logo.alternativeText || ''"
						class="object-cover h-36" />
					<p class="text-white/80 leading-relaxed text-xl" v-if="footer?.description">
						{{ footer?.description }}
					</p>
					<SocialLinks :social-medias="contact?.social_medias || []" class="mx-auto w-fit mt-lg" />
				</div>
				<div class="grid grid-cols-1 sm:grid-cols-4 gap-3xl mb-4xl">
					<FooterColumn v-for="column in footer?.footer_columns" :key="column.title" :column="column" />

					<div class="space-y-md">
						<h3 class="text-xl font-semibold">Kontakt</h3>

						<div class="space-y-xs">
							<p class="text-white/80 hover:text-white transition">{{ contact?.email }}</p>
							<p class="text-white/80 hover:text-white transition">{{ contact?.phone }}</p>
						</div>
					</div>
				</div>
			</div>

			<div class="w-full h-px bg-white/10 my-2xl" />

			<div class="flex flex-col lg:flex-row justify-between items-center gap-lg">
				<p class="text-white/80 text-sm text-center">© {{ year }} Alt Media — Alla rättigheter förbehållna.</p>

				<nav class="flex items-center space-x-xl text-sm">
					<NuxtLink to="/policy" class="text-white/80 hover:text-white transition"
						>Integritetspolicy</NuxtLink
					>
					<NuxtLink to="/cookies" class="text-white/80 hover:text-white transition">Cookies</NuxtLink>
					<NuxtLink to="/contact" class="text-white/80 hover:text-white transition">Kontakt</NuxtLink>
				</nav>
			</div>
		</div>
	</footer>
</template>
