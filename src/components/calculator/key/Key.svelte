<script lang="ts">
	import { formula, resultDisplay } from '../stores.ts';
	import { CalcKeyType } from './calcKey.ts';
	import type { CalcKey } from './calcKey.ts';
	import { calculate } from './lib/calculator.js';

	interface Props {
		key: CalcKey;
	}

	let { key }: Props = $props();

	function inputKey() {
		let form = '';
		formula.subscribe((f) => (form = f));

		switch (key.type) {
			case CalcKeyType.Number:
				formula.set((form += key.char));
				break;
			case CalcKeyType.Symbol:
				formula.set((form += key.char));
				break;
			case CalcKeyType.BackSpace:
				formula.set(form.slice(0, -1));
				resultDisplay.set((form = ''));
				break;
			case CalcKeyType.Clear:
				formula.set((form = ''));
				resultDisplay.set((form = ''));
				break;
			case CalcKeyType.Run:
				const result = calculate(form, 3, 1, 64);
				resultDisplay.set(result);
		}
	}
</script>

<button value={key.char} onclick={inputKey}>{key.char}</button>

<style>
	button {
		font-size: 24px;
		min-width: 2rem;
		height: 100%;
		aspect-ratio: 1/1;
		color: white;
		background-color: var(--transparent);
		border: dotted 1px;
		border-radius: 2px;
	}

	button:active {
		background-color: #9999ff80;
	}

	@media screen and (max-width: 520px) {
		button {
			font-size: 16px;
		}
	}

	@media screen and (max-height: 750px) {
		button {
			font-size: 12px;
			width: 2rem;
		}
	}
</style>
