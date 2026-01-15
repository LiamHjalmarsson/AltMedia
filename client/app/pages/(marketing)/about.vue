<script setup lang="ts">
const steps = [
	{
		number: "01",
		title: "Bättre synlighet",
		text: "Vi hjälper ditt företag att synas där dina kunder faktiskt letar. Genom strategisk SEO, teknisk optimering och rätt innehåll säkerställer vi att din webbplats får bättre placeringar i sökmotorer och ökad organisk trafik över tid.",
		image: "/images/visibility-01.png",
	},
	{
		number: "02",
		title: "Ökat förtroende",
		text: "En professionell och genomtänkt webbplats signalerar kvalitet och trovärdighet. Vi bygger digitala upplevelser som skapar förtroende direkt – från första intryck till sista klick.",
		image: "/images/visibility-02.png",
	},
	{
		number: "03",
		title: "Tillgängligt för alla",
		text: "Alla ska kunna använda din webbplats, oavsett förutsättningar. Vi bygger tillgängliga lösningar enligt WCAG, med fokus på användbarhet, tydlighet och inkluderande design.",
		image: "/images/visibility-03.png",
	},
	{
		number: "04",
		title: "Stick ut från mängden",
		text: "I en digital värld där allt ser likadant ut hjälper vi dig att särskilja dig. Med stark visuell identitet, tydligt budskap och smart UX skapar vi upplevelser som verkligen fastnar.",
		image: "/images/visibility-04.png",
	},
	{
		number: "05",
		title: "Fler förfrågningar och affärer",
		text: "En snygg webbplats räcker inte – den måste konvertera. Vi optimerar flöden, call-to-actions och struktur för att driva fler förfrågningar, leads och affärer.",
		image: "/images/visibility-05.png",
	},
	{
		number: "06",
		title: "Mät, förstå och förbättra",
		text: "Med data som grund fattar vi bättre beslut. Vi mäter beteenden, analyserar resultat och förbättrar kontinuerligt för att säkerställa att din digitala satsning ger verkligt värde.",
		image: "/images/visibility-06.png",
	},
];
</script>

<template>
	<section class="py-5xl bg-white">
		<div class="max-w-[1200px] mx-auto px-lg">
			<header class="max-w-[700px] mb-4xl">
				<h1 class="text-heading-xl font-bold mb-md">Varför synlighet online är avgörande</h1>
				<p class="text-lg text-black/70 leading-relaxed">
					En bra hemsida handlar om mer än design – det handlar om att bli hittad, skapa förtroende och få
					fler kunder. Här är varför din digitala närvaro spelar så stor roll.
				</p>
			</header>

			<ul class="space-y-4xl">
				<li
					v-for="(step, index) in steps"
					:key="step.number"
					class="grid lg:grid-cols-2 gap-2xl items-center"
					:class="index % 2 === 1 ? 'lg:flex-row-reverse' : ''">
					<div>
						<span class="text-primary font-bold text-lg">
							{{ step.number }}
						</span>
						<h2 class="text-heading-lg font-semibold mt-sm mb-md">
							{{ step.title }}
						</h2>
						<p class="text-black/75 text-lg leading-relaxed max-w-[520px]">
							{{ step.text }}
						</p>
					</div>

					<div class="flex justify-center lg:justify-end">
						<img :src="step.image" :alt="step.title" class="max-w-[280px] w-full h-auto" loading="lazy" />
					</div>
				</li>
			</ul>
		</div>
	</section>
</template>
