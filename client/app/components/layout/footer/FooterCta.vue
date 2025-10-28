<script setup lang="ts">
const globalStore = useGlobalStore();

const { footer, contact } = storeToRefs(globalStore);
</script>

<template>
	<section v-if="footer?.cta" class="relative overflow-hidden text-light lg:mt-2xl">
		<div class="relative px-xl py-3xl lg:p-3xl shadow-xl shadow-primary/10">
			<video class="absolute inset-0 w-full h-full object-cover opacity-30" autoplay muted loop playsinline>
				<source src="/videos/cta.mp4" type="video/mp4" />
			</video>

			<div class="absolute inset-0 bg-bg-dark/70"></div>

			<div class="relative text-center lg:p-3xl w-full max-w-[900px] mx-auto">
				<p class="text-sm font-semibold tracking-widest uppercase text-secondary/80">
					{{ footer.cta.title }}
				</p>

				<h2 class="mt-md text-3xl font-semibold sm:text-4xl">
					{{ footer.cta.title }}
				</h2>

				<p class="mx-auto mt-md text-base text-light/80">
					{{ footer.cta.description }}
				</p>

				<div
					class="mt-xl w-full flex flex-col items-center justify-center max-md:space-y-lg md:space-x-xl max-md:max-w-[250px] max-w-[500px] md:flex-row mx-auto">
					<ButtonSecondaryLink class="flex-1 w-full">
						{{ contact?.email }}
					</ButtonSecondaryLink>

					<ButtonLink to="/startProject" aria-label="Starta ett projekt nu" class="flex-1 w-full">
						Starta projekt
						<Icon name="lucide:rocket" size="18" class="ml-md" />
					</ButtonLink>
				</div>
			</div>
		</div>
	</section>
</template>
