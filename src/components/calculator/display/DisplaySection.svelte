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
		max-width: 80vw;
		width: 400px;
		min-width: 400px;
		margin-bottom: 1rem;
	}

	div {
		display: flex;
		overflow-x: auto;
		width: 100%;
		height: 4rem;
		align-items: center;
		text-align: center;
		color: white;
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
			font-size: 14px;
			max-width: 200px;
			width: 100%;
			min-width: 200px;
			padding: 0 0.5rem;
			height: max-content;
		}
	}
</style>
