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

<script lang="ts">
    import { tick } from "svelte";
    import { CURRENT_VERSION } from "../current_version"

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
		await tick();
	}

</script>

<main>
	<p>AOB generator tool. Paste your x64dbg or Cheat Engine disassembly to generate an AOB.<br>
		You can also select a portion of the disassembly to generate that specific AOB.</p>
	<p>This project is <bold>heavily</bold> based off <a href="https://github.com/FransBouma/InjectableGenericCameraSystem/tree/master/Tools/AOBGen">Frans's work</a></p>
	<textarea bind:value={input} placeholder="Enter the disassembly"
		on:mouseup={event => handleMouse(inputbox, event, wildcardOffsets)}
		bind:this={inputbox}
		rows="20"
	/>
	<div class="info">
		<label for="wildcard">Wildcard offsets: </label>
		<input name="wildcard" type="checkbox" bind:checked={wildcardOffsets} on:change={() => handleMouse(inputbox, null, wildcardOffsets)}>
	</div>
	<p>AOB: <code>{resultHover || result}</code></p>
	<button on:click={() => navigator.clipboard.writeText(resultHover || result)}>Copy to clipboard</button>
    <p>Current version: {CURRENT_VERSION}</p>
</main>

