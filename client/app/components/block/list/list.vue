<script setup lang="ts">
import type { List } from "~/types/blocks/list";

defineProps<{ block: List }>();
</script>

<template>
	<Section class="bg-bg-dark text-light">
		<Container>
			<Heading
				:title="block.heading.title"
				:align_content="block.heading.align_content"
				class="mb-sm md:mb-md lg:mb-lg xl:mb-xl" />

			<Grid class="md:grid-cols-1">
				<ListItem v-for="(item, i) in block.items" :key="item.id" :item :number="i + 1" />
			</Grid>
		</Container>
	</Section>
</template>
