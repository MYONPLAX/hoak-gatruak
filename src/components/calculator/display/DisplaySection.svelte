<script lang="ts">
	import { formula, resultDisplay } from '../stores.ts';
</script>

<section class="window-acrylic">
	<div id="formula"><p>{$formula}</p></div>
	<div id="result"><p>{$resultDisplay}</p></div>
</section>

<style>
	section {
		font-size: 1.1rem;
		width: 400px;
		margin-bottom: 1rem;
		padding: 0.5rem;
	}

	div {
		display: flex;
		overflow-x: auto;
		width: 100%;
		height: 4rem;
		align-items: center;
		text-align: center;
		color: white;
		background-color: var(--dark-a80);
		backdrop-filter: blur(5px);
	}

	p {
		width: inherit;
		margin: 0;
		text-align: center;
	}

	#result {
		text-wrap: balance;
	}

	@media screen and (max-width: 520px) {
		section {
			width: 270px;
		}
	}

	@media screen and (max-width: 350px) {
		section {
			width: 250px;
		}
	}

	@media screen and (max-height: 750px) {
		section {
			font-size: 16px;
			width: 200px;
			height: max-content;
		}
	}
</style>
