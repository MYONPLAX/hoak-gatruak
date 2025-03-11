<script lang="ts">
	import DisplaySection from './display/DisplaySection.svelte';
	import KeySection from './key/KeySection.svelte';
</script>

<article>
	<DisplaySection />
	<KeySection />
</article>

<style>
	@media screen and (max-height: 500px) {
		article {
			display: grid;
			grid-template-columns: auto auto;
			align-items: center;
			gap: 2rem;
		}
	}
</style>
