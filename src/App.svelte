<script lang="ts">
import { tick } from "svelte";

	import { AOBGenerator } from "./AOBGen";
	import { tick } from "svelte";

	let aobgen = new AOBGenerator();
	let input = '';
	let wildcardOffsets = false;
	let resultHover = "";
	let inputbox;
	$: result = aobgen.generateAob(input, wildcardOffsets);

	async function handleMouse(inputbox: any, event: MouseEvent | KeyboardEvent, wildcard: boolean) {
		const { selectionStart, selectionEnd, value } = inputbox;
		const selection = value.slice(selectionStart, selectionEnd);
		if (selection === "") {
			resultHover = "";
			return;
		}

		resultHover = aobgen.generateAob(selection, wildcard);
		console.log(selection, selectionStart, selectionEnd)
		await tick();
	}

</script>

<main>
	<textarea bind:value={input} placeholder="Enter the disassembly"
		on:mouseup={event => handleMouse(inputbox, event, wildcardOffsets)}
		bind:this={inputbox}
		rows="20"
	/>
	<div class="info">
		<label for="wildcard">Wildcard offsets: </label>
		<input name="wildcard" type="checkbox" bind:checked={wildcardOffsets} on:change={() => handleMouse(inputbox, null, wildcardOffsets)}>
	</div>
	<p>AOB: {resultHover || result}</p>
	<button on:click={() => navigator.clipboard.writeText(resultHover || result)}>Copy to clipboard</button>
</main>

<style>
	main {
		text-align: center;
		padding: 1em;
		max-width: 240px;
		margin: 0 auto;
		display: flex;
		flex-direction: column;
	}

	.info {
		display: inline-flex;
		font-size: 1em;
	}

	input {
		margin-left: 5px;
		margin-bottom: 0px;
	}

	h1 {
		color: #ff3e00;
		text-transform: uppercase;
		font-size: 4em;
		font-weight: 100;
	}

	@media (min-width: 640px) {
		main {
			max-width: none;
		}
	}
</style>