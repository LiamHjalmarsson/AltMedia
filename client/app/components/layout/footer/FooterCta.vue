<script setup lang="ts">
const globalStore = useGlobalStore();

const { footer, contact } = storeToRefs(globalStore);
</script>

<template>
	<section class="overflow-hidden text-light my-2xl" v-if="footer?.cta">
		<div class="relative mx-auto max-w-[1300px] px-sm py-xl sm:px-md lg:px-lg">
			<div class="rounded-3xl border border-light/10 bg-bg-dark shadow-xl shadow-primary/10 p-xl text-center">
				<p class="text-sm font-semibold tracking-widest uppercase text-secondary/80">{{ footer.cta.title }}</p>
				<h2 class="mt-md text-3xl font-semibold sm:text-4xl">
					{{ footer.cta.title }}
				</h2>
				<p class="mx-auto mt-md text-base text-light/80">
					{{ footer.cta.description }}
				</p>
				<div class="mt-lg flex flex-col items-center justify-center space-x-xl sm:flex-row">
					<ButtonSecondaryLink>
						{{ contact?.email }}
					</ButtonSecondaryLink>
					<ButtonLink to="/startProject" aria-label="Starta ett projekt nu">
						Starta projekt
						<Icon name="lucide:rocket" size="18" class="ml-md" />
					</ButtonLink>
				</div>
			</div>
		</div>
	</section>
</template>
