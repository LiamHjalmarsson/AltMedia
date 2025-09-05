<script lang="ts" setup>
import type { Hero } from "~/types/blocks/hero";

const { block } = defineProps<{ block: Hero }>();

const textAlign = computed(() => {
	switch (block.align_content) {
		case "center":
			return " justify-center items-center text-center";
		case "right":
			return " justify-end items-end text-right";
		default:
			return " justify-start items-start text-left";
	}
});
</script>

<template>
	<Section class="hero bg-dark text-light overflow-hidden relative min-h-screen">
		<Container class="flex items-centerrelative z-10">
			<div class="flex w-full" :class="[!block.has_form ? textAlign : '', !block.has_form ? 'gap-2xl' : '']">
				<div
					class="flex flex-col space-y-xl max-w-5xl"
					:class="[!block.has_form ? textAlign : '', !block.has_form ? 'pr-2xl' : '']">
					<h1
						class="text-heading-lg sm:text-heading-xl md:text-heading-2xl lg:text-heading-3xl xl:text-heading-4xl text-light font-bold tracking-tight leading-tight">
						{{ block.title }}
					</h1>

					<p
						v-if="block.description"
						class="text-sm sm:text-md md:text-lg lg:text-xl xl:text-2xl max-sm:text-center">
						{{ block.description }}
					</p>

					<div v-if="block.links" class="mt-xl space-y-lg sm:space-x-2xl w-fit">
						<template v-for="link in block.links">
							<ButtonLink :variant="link.variant" :to="link.url" class="max-sm:w-full max-sm:text-center">
								{{ link.label }}
							</ButtonLink>
						</template>
					</div>
				</div>

				<HeroForm v-if="block.has_form" :form="block.form" />
			</div>
		</Container>

		<div v-if="block.cover" class="w-full absolute inset-0 h-full opacity-15">
			<NuxtImg v-for="image in block.cover" :src="image.url" alt="" class="w-full h-full bg-cover" />
		</div>
	</Section>
</template>
