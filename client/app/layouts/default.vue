<template>
	<div class="min-h-screen flex flex-col">
		<Navigation />

		<main id="main-content" class="grow">
			<slot />
		</main>

		<FooterCta />

		<Footer />
	</div>
</template>
