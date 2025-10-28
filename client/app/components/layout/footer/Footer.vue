<script setup lang="ts">
const globalStore = useGlobalStore();

const { footer, contact } = storeToRefs(globalStore);

const currentYear = new Date().getFullYear();
</script>

<template>
	<footer class="p-xl xl:p-2xl bg-dark text-light">
		<div>
			<div class="mx-auto w-full h-full max-w-[1300px] px-2xl">
				<nav
					aria-label="Sidfotsnavigation"
					class="mb-2xl flex max-md:space-y-lg max-md:flex-col justify-between items-center xl:items-start">
					<FooterColumn v-for="column in footer?.footer_columns" :key="column.title" :column />
				</nav>

				<FooterBottom :year="currentYear" :socials="contact?.social_medias || []" />
			</div>
		</div>
	</footer>
</template>
