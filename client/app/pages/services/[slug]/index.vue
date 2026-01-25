<script setup lang="ts">
const { animateBubbleToHoverState, animateBubbleToIdleState } = useBackgroundBubble();

const route = useRoute();
const serviceStore = useServiceStore();
const { currentService } = storeToRefs(serviceStore);

const slug = computed(() => route.params.slug as string);

await useAsyncData(
	() => `service:${slug.value}`,
	() => serviceStore.fetchService(slug.value),
	{ server: true, lazy: true, watch: [slug] },
);

/**
 * FIX: En composable-instans + "ref i v-for" gör att samma element/animation triggas för alla.
 * Lösning: spara bubble-element per kort och skicka elementet till animate-funktionerna.
 */
const bubbleRefs = ref<HTMLElement[]>([]);

function setBubbleRef(el: Element | ComponentPublicInstance | null, index: number) {
	if (!el) return;
	const element = (el as any)?.$el || el;
	bubbleRefs.value[index] = element as HTMLElement;
}

function onEnter(index: number) {
	animateBubbleToHoverState();
}

function onLeave(index: number) {
	animateBubbleToIdleState();
}
</script>

<template>
	<section class="relative py-4xl lg:py-5xl flex justify-center">
		<div class="w-full max-w-[1300px] px-md md:px-lg lg:px-2xl">
			<article v-if="currentService" class="flex flex-col lg:flex-row gap-2xl lg:gap-3xl my-4xl">
				<figure class="flex-1 flex">
					<NuxtImg
						v-if="currentService.image?.url"
						:src="currentService.image.url"
						:alt="currentService.image.alternativeText || currentService.title"
						format="webp,avif"
						quality="85"
						class="w-full h-full object-cover"
						loading="lazy" />
				</figure>

				<div class="flex-1 flex flex-col justify-center h-full">
					<h1 class="font-bold text-heading-xl md:text-heading-2xl mb-lg">
						{{ currentService.title }}
					</h1>

					<p v-if="currentService.description" class="text-lg mb-xl max-w-[600px]">
						{{ currentService.description }}
					</p>
				</div>
			</article>

			<section v-if="currentService?.subservices?.length" class="mt-4xl">
				<h2 class="font-bold text-heading-lg md:text-heading-xl mb-xl text-primary">Våra delmoment</h2>

				<ul class="mt-2xl grid sm:grid-cols-2 lg:grid-cols-3 gap-xl">
					<li
						v-for="(sub, i) in currentService.subservices"
						:key="sub.id"
						@mouseenter="onEnter(i)"
						@mouseleave="onLeave(i)"
						class="overflow-hidden border border-white/40 relative shadow-lg transition-all duration-300 focus-visible:outline-primary h-full flex flex-col group">
						<NuxtLink class="flex flex-col justify-between h-full p-xl focus-visible:outline-primary">
							<h3 class="font-semibold text-heading-sm md:text-heading-md transition">
								{{ sub.title }}
							</h3>

							<p class="text-sm mt-sm line-clamp-3">Kort beskrivning saknas ännu.</p>

							<div class="mt-lg flex items-center justify-between">
								<ReadMoreButton />

								<span
									class="h-9 w-9 rounded-2xl border border-white/12 bg-white/5 grid place-items-center">
									<Icon name="lucide:sparkles" size="16" />
								</span>
							</div>

							<div
								:ref="(el) => setBubbleRef(el, i)"
								class="pointer-events-none absolute -bottom-5 -left-5 rounded-full w-4 h-4 bg-gradient-to-tr from-secondary/5 via-secondary/10 to-primary/20" />
						</NuxtLink>
					</li>
				</ul>
			</section>
		</div>
	</section>
</template>
