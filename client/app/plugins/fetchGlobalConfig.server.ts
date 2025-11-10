export default defineNuxtPlugin(async () => {
	const globalStore = useGlobalStore();

	if (!globalStore.globalConfig) {
		await globalStore.fetchGlobalConfig();
	}
});
