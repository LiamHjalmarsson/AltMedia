<script lang="ts" setup>
import type { Hero } from "~/types/content/blocks";

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
	<section class="hero bg-dark text-light overflow-hidden relative min-h-screen flex justify-center items-center">
		<div class="flex items-center relative z-10 p-sm xs:p-md md:p-lg lg:p-2xl">
			<div
				class="flex w-full items-center"
				:class="[!block.has_form ? textAlign : '', block.has_form ? 'gap-2xl max-xl:flex-col' : '']">
				<div
					class="flex flex-col space-y-xl max-w-5xl"
					:class="[
						!block.has_form ? textAlign : '',
						block.has_form ? 'xl:pr-2xl max-xl:items-center max-xl:text-center' : '',
					]">
					<h1
						class="text-heading-lg sm:text-heading-xl md:text-heading-2xl lg:text-heading-3xl xl:text-heading-4xl text-light font-bold tracking-tight leading-tight">
						{{ block.title }}
					</h1>

					<p
						v-if="block.description"
						class="text-sm sm:text-md md:text-lg lg:text-xl xl:text-2xl max-sm:text-center">
						{{ block.description }}
					</p>

					<div v-if="block.links" class="mt-md space-y-lg sm:space-x-2xl w-fit">
						<template v-for="link in block.links">
							<ButtonLink :variant="link.variant" :to="link.url" class="max-sm:w-full max-sm:text-center">
								{{ link.label }}
							</ButtonLink>
						</template>
					</div>
				</div>

				<slot />
			</div>
		</div>

		<div v-if="block.cover" class="absolute inset-0 z-0">
			<NuxtImg
				v-for="image in block.cover"
				:key="image.id"
				:src="image.url"
				alt=""
				class="h-full w-full object-cover opacity-20" />
		</div>
	</section>
</template>
