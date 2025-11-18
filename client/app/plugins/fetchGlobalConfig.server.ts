export default defineNuxtPlugin(async () => {
	const globalStore = useGlobalStore();

	if (!globalStore.globalConfigLoaded) {
		await globalStore.fetchGlobalConfig();
	}
});
