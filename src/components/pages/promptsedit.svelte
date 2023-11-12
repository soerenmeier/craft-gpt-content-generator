<script>
	import { onMount } from 'svelte';

	export let prompts;
	export let form;
	export let id;
	export let url;

	let prompt = id ? prompts.get(id) : {};

	onMount(() => {
		form.addEventListener('submit', async e => {
			e.preventDefault();

			try {
				await prompts.save(prompt);
				window.location = url;
			} catch (e) {
				console.log('could not save prompt');
				alert('Could not save prompt');
			}
		});
	});
</script>

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
		>
	</div>
</div>

<div class="field width-100">
	<div class="heading">
		<label for="gpt-prompt-prompt">Prompt</label>
	</div>
	<div class="instructions">
		<p>Use <code>{'{{fieldValue}}'}</code> to insert the value into the prompt. Other properties <code>{'{{fieldName}}'}</code>, <code>{'{{fieldLabel}}'}</code>, <code>{'{{fieldInstructions}}'}</code>.</p>
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