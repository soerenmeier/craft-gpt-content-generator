<script>
	import { createEventDispatcher } from 'svelte';
	import LightSwitch from './lightswitch.svelte';
	import PromptInstructions from './promptinstructions.svelte';

	export let prompts;
	export let prompt;

	const dispatch = createEventDispatcher();

	// let shouldSave = true;

	async function onSubmit(e) {
		// if (!shouldSave) {
		// 	dispatch('save', { prompt });
		// 	return;
		// }

		try {
			const nPrompt = await prompts.save(prompt);

			dispatch('save', { prompt: nPrompt });
		} catch (e) {
			console.log('could not save prompt', e);
			alert('Could not save prompt');
		}
	}
</script>

<div class="editprompt">
	<h5>Edit or create a prompt</h5>

	<form on:submit|preventDefault={onSubmit}>
		<div class="field">
			<div class="heading">
				<label for="gpt-prompt-name">Name</label>
			</div>
			<div class="input ltr">
				<input
					id="gpt-prompt-name"
					type="text"
					class="text fullwidth"
					name="name"
					bind:value={prompt.name}
					required
				/>
			</div>
		</div>

		<div class="field width-100">
			<div class="heading">
				<label for="gpt-prompt-prompt">Prompt</label>
			</div>
			<div class="instructions">
				<PromptInstructions />
			</div>
			<div class="input ltr">
				<textarea
					id="gpt-prompt-prompt"
					name="prompt"
					class="text nicetext fullwidth"
					rows="5"
					bind:value={prompt.prompt}
					required
				></textarea>
			</div>
		</div>

		<!-- {#if (prompt?.id ?? null) === null}
			<div class="field width-100">
				<div class="heading">
					<label for="gpt-prompt-save">Save Prompt</label>
				</div>

				<div class="input ltr">
					<LightSwitch id="gpt-prompt-save" bind:on={shouldSave} name="should-save" />
				</div>
			</div>
		{/if} -->

		<button class="btn submit">Save</button>
		<button type="button" class="btn" on:click={e => dispatch('cancel')}>
			Cancel
		</button>
	</form>
</div>

<style lang="scss">
	.editprompt h5 {
		margin-bottom: 20px;
	}
</style>
