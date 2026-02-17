<template>
	<div class="flex flex-col min-h-screen">
		<Navigation />

		<main id="main-content" class="grow">
			<slot />
		</main>

		<FooterCta />

		<Footer />
	</div>
</template>
