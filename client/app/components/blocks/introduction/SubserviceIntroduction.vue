<script setup lang="ts">
import type { Subservice } from "~/types/content/collections";

defineProps<{ subservice: Subservice }>();
</script>

<template>
	<section class="relative w-full flex justify-center items-center p-xs xs:p-sm sm:p-md md:p-lg lg:p-2xl">
		<div class="mx-auto w-full h-full px-xs xs:px-sm sm:px-md md:px-lg lg:px-2xl max-w-[1600px]">
			<div class="grid md:grid-cols-4 gap-md md:gap-lg lg:gap-xl xl:gap-2xl">
				<div class="md:col-span-3 md:pr-2xl">
					<h1 class="text-heading-xl font-bold mb-sm">
						{{ subservice.title }}
					</h1>
					<ClientOnly>
						<StrapiBlocksText :nodes="subservice.content || []" />
					</ClientOnly>
				</div>

				<aside v-if="subservice.tags?.length" aria-label="Taggar för delmoment">
					<h2 class="text-heading-lg font-bold mb-sm mt-xs">Vad vi gjort</h2>
					<ul class="space-y-md grow">
						<li v-for="(tag, i) in subservice.tags" :key="tag.id" class="flex items-center">
							<span
								class="w-6 h-6 flex justify-center items-center text-heading-sm font-semibold font-heading text-primary p-sm border border-primary bg-primary-disabled rounded-full"
								aria-hidden="true">
								{{ i + 1 }}
							</span>
							<span class="sr-only">Punkt {{ i + 1 }}:</span>
							<span class="text-heading-xs font-medium ml-md first-letter:capitalize truncate">
								{{ tag.title }}
							</span>
						</li>
					</ul>
				</aside>
			</div>
		</div>
	</section>
</template>
