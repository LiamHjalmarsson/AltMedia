<!-- pages/om-oss.vue (EN FIL) -->
<script setup lang="ts">
type Link = { label: string; href: string };

const content = {
	story: {
		eyebrow: "EN GÅNG I TIDEN…",
		title: "En historia om samspel",
		body: [
			"Altmedia föddes ur viljan att göra saker på ett bättre sätt. Mindre fluff, mer leverans. Tydligare kommunikation, snabbare väg till lansering och en lösning som håller över tid.",
			"Vi kombinerar form och utveckling för att skapa digitala upplevelser som stärker ditt varumärke och gör det enklare att få kunder — utan att tappa personlighet.",
			"Vi tar inga genvägar. Vi tänker långsiktigt, bygger strukturerat och ser till att resultatet känns lika genomtänkt som det ser ut.",
		],
	},
	rightIntro: {
		body: [
			"Under åren har vi byggt upp en arbetsmetod som är enkel att följa och lätt att lita på. Du ska alltid veta vad som händer, vad som ingår och vad nästa steg är.",
			"Mer maraton än sprint: vi planerar, designar och utvecklar med kvalitet i fokus — så att du får en stabil grund du kan växa med.",
		],
	},
	block: {
		title: "Vad vi kan göra för dig",
		body: [
			"Vi hjälper dig att ta fram en webbplats som gör jobbet. Den ska vara tydlig, snabb och enkel att använda — så att besökaren förstår direkt vad du erbjuder och hur man tar nästa steg.",
			"Vi tar ansvar för helheten: struktur, design, innehåll och teknik. Resultatet blir en modern digital närvaro som känns trygg, professionell och redo att skalas.",
		],
	},
	why: {
		title: "Varför välja oss",
		body: [
			"För att du vill ha en partner som är enkel att jobba med och som levererar det som lovas. Vi kommunicerar rakt, arbetar strukturerat och gör det lätt att ta beslut.",
			"Vi jobbar snabbt men noggrant. Vi bygger med kvalitet i både design och kod — så att du slipper dyra omtag längre fram.",
		],
	},
	process: {
		title: "Vår arbetsprocess",
		body: [
			"Vi börjar med en kort uppstart där vi fångar mål, målgrupp och innehåll. Därefter tar vi fram en tydlig struktur som gör sidan enkel att förstå och navigera.",
			"När riktningen sitter tar vi fram design och bygger en snabb, stabil lösning. Vi testar, finslipar och lanserar — och finns kvar när du vill vidareutveckla.",
		],
	},
	values: {
		title: "Vad vi står för",
		body: [
			"Tydlighet, kvalitet och trygghet i varje steg. Du ska veta vad som ingår, vad som händer nu och vad som kommer sen.",
			"I en tid där mycket kan automatiseras sätter vi det mänskliga i centrum. Kreativitet, känsla och tydlig kommunikation bygger förtroende — och det är grunden i allt vi gör.",
		],
	},
	cta: {
		title: "Vill du se hur vi jobbar?",
		body: "Kika på våra case eller hör av dig så tar vi fram ett upplägg som passar ditt företag.",
		primary: { label: "Se våra case", href: "/case" } as Link,
		secondary: { label: "Kontakta oss", href: "/kontakt" } as Link,
	},
};

/**
 * Fix för “konstig bild”:
 * - Alla porträtt får samma konsekventa aspect ratio + objektposition.
 * - Använd dina egna bilder här (eller Strapi-media).
 */
const images = {
	portraitA: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=1200&q=80",
	portraitB: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=1200&q=80",
	team: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=1600&q=80",
};
</script>

<template>
	<main class="bg-[#f6f4f1] text-neutral-900 py-3xl">
		<div class="mx-auto w-full max-w-[1100px] px-6 py-16 sm:px-10 sm:py-24 pt-3xl">
			<!-- TOP -->
			<section class="grid gap-12 lg:grid-cols-12 lg:gap-16 pt-3xl">
				<!-- Left text -->
				<div class="lg:col-span-6">
					<p class="text-xs tracking-[0.28em] text-neutral-500">
						{{ content.story.eyebrow }}
					</p>

					<h1 class="mt-5 text-[42px] font-semibold leading-[1.04] tracking-tight sm:text-6xl">
						{{ content.story.title }}
					</h1>

					<div class="mt-8 space-y-5 text-[15px] leading-7 text-neutral-600">
						<p v-for="(p, i) in content.story.body" :key="i">{{ p }}</p>
					</div>
				</div>

				<!-- Right collage (cleanare, mer “Atelier”-stil) -->
				<div class="lg:col-span-6">
					<div class="relative mx-auto w-full max-w-[520px]">
						<!-- Top portrait -->
						<div
							class="relative w-[78%] overflow-hidden bg-white ring-1 ring-black/10 shadow-[0_18px_50px_-30px_rgba(0,0,0,0.45)]">
							<!-- samma ratio för att undvika “konstig” crop -->
							<div class="aspect-[3/4]">
								<img
									:src="images.portraitA"
									alt="Altmedia"
									class="h-full w-full object-cover object-center" />
							</div>
						</div>

						<!-- Bottom portrait (offset) -->
						<div
							class="absolute right-0 top-[26%] w-[74%] overflow-hidden bg-white ring-1 ring-black/10 shadow-[0_18px_50px_-30px_rgba(0,0,0,0.45)]">
							<div class="aspect-[3/4]">
								<img
									:src="images.portraitB"
									alt="Altmedia"
									class="h-full w-full object-cover object-center" />
							</div>
						</div>

						<!-- “luft” under collaget -->
						<div class="h-[230px] sm:h-[260px]" />
					</div>
				</div>
			</section>

			<!-- BOTTOM -->
			<section class="mt-20 grid gap-12 lg:mt-28 lg:grid-cols-12 lg:gap-16">
				<!-- Big image -->
				<div class="lg:col-span-7">
					<div class="relative overflow-hidden bg-white">
						<img
							:src="images.team"
							alt="Team"
							class="h-[520px] w-full object-cover object-center sm:h-[640px]" />
						<!-- mjuk övergång till bakgrund -->
						<div
							class="pointer-events-none absolute inset-x-0 bottom-0 h-56 bg-gradient-to-t from-[#f6f4f1] to-transparent" />
					</div>
				</div>

				<!-- Text blocks -->
				<div class="lg:col-span-5">
					<div class="space-y-12">
						<div>
							<h2 class="text-2xl font-semibold tracking-tight">
								{{ content.block.title }}
							</h2>
							<div class="mt-5 space-y-5 text-[15px] leading-7 text-neutral-600">
								<p v-for="(p, i) in content.block.body" :key="i">{{ p }}</p>
							</div>
						</div>

						<div>
							<h2 class="text-2xl font-semibold tracking-tight">
								{{ content.why.title }}
							</h2>
							<div class="mt-5 space-y-5 text-[15px] leading-7 text-neutral-600">
								<p v-for="(p, i) in content.why.body" :key="i">{{ p }}</p>
							</div>
						</div>

						<div>
							<h2 class="text-2xl font-semibold tracking-tight">
								{{ content.process.title }}
							</h2>
							<div class="mt-5 space-y-5 text-[15px] leading-7 text-neutral-600">
								<p v-for="(p, i) in content.process.body" :key="i">{{ p }}</p>
							</div>
						</div>

						<div>
							<h2 class="text-2xl font-semibold tracking-tight">
								{{ content.values.title }}
							</h2>
							<div class="mt-5 space-y-5 text-[15px] leading-7 text-neutral-600">
								<p v-for="(p, i) in content.values.body" :key="i">{{ p }}</p>
							</div>
						</div>

						<!-- CTA (mer lik referensen: outline-knapp) -->
						<div class="pt-2">
							<h3 class="text-lg font-semibold tracking-tight">{{ content.cta.title }}</h3>
							<p class="mt-3 text-[15px] leading-7 text-neutral-600">
								{{ content.cta.body }}
							</p>

							<div class="mt-6 flex flex-wrap gap-3">
								<NuxtLink
									:to="content.cta.primary.href"
									class="inline-flex items-center justify-center border border-neutral-900 bg-transparent px-6 py-3 text-sm font-semibold text-neutral-900 transition hover:bg-neutral-900 hover:text-white">
									{{ content.cta.primary.label }}
								</NuxtLink>

								<NuxtLink
									:to="content.cta.secondary.href"
									class="inline-flex items-center justify-center border border-neutral-300 bg-transparent px-6 py-3 text-sm font-semibold text-neutral-800 transition hover:border-neutral-500">
									{{ content.cta.secondary.label }}
								</NuxtLink>
							</div>
						</div>
					</div>
				</div>
			</section>
		</div>
	</main>
</template>
