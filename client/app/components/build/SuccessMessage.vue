<script setup lang="ts">
const store = useBuildProjectStore();

const { summaryFlat } = storeToRefs(store);

const { contact } = useGlobalStore();
</script>

<template>
	<section class="flex items-center justify-center px-md">
		<div class="max-w-[800px] w-full p-3xl text-center animate-in-up">
			<div class="mx-auto w-24 h-24 bg-primary rounded-full flex items-center justify-center mb-xl">
				<Icon name="lucide:check" />
			</div>

			<h1 class="text-heading-xl font-extrabold mb-sm">Tack för din förfrågan</h1>

			<p class="text-black/80 text-lg max-w-[600px] mx-auto mb-2xl">
				Vi återkommer till dig så snart som möjligt. Här är din sammanställning:
			</p>

			<div
				class="text-left max-w-[600px] mx-auto bg-white rounded-2xl shadow-md border border-black/10 p-xl mb-3xl">
				<div v-for="(value, key) in summaryFlat" :key="key" class="flex justify-between items-start py-sm">
					<p class="font-medium text-black/80">{{ key }}</p>
					<p class="font-semibold text-black text-right">{{ value }}</p>
				</div>
			</div>

			<div class="mt-3xl text-sm text-black/80">
				<p>
					<NuxtLink :to="`mailto:${contact?.email}`" class="text-primary hover:underline">
						{{ contact?.email }}
					</NuxtLink>
				</p>
				<p>{{ contact?.phone }}</p>
			</div>
		</div>
	</section>
</template>
