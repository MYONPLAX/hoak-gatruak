<script lang="ts">
	import Key from './Key.svelte';
	import { keyList } from './calcKey.ts';
</script>

<section class="window-acrylic">
	{#each keyList as keyContainer}
		<div>
			{#each keyContainer as key}
				<Key {key} />
			{/each}
		</div>
	{/each}
</section>

<style>
	section {
		display: grid;
		grid-template-rows: 1fr 1fr 1fr 1fr;
		max-width: 80vw;
		width: 100%;
		min-width: 400px;
		height: max-content;
		padding: 1rem 0;
	}

	div {
		display: grid;
		grid-template-columns: 1fr 1fr 1fr 1fr;
		padding: 0.5rem 1rem;
		gap: 1rem;
	}

	@media screen and (max-width: 520px) {
		section {
			min-width: 270px;
		}
	}

	@media screen and (max-width: 350px) {
		section {
			min-width: 250px;
		}
	}

	@media screen and (max-height: 750px) {
		section {
			justify-content: center;
			font-size: 10px;
			max-width: 200px;
			min-width: 200px;
			padding: 0.5rem;
		}

		div {
			padding: 0.25rem 0;
			gap: auto;
		}
	}
</style>
