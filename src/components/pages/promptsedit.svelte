<script>
	import { onMount } from 'svelte';
	import PromptInstructions from '../promptinstructions.svelte';

	export let prompts;
	export let form;
	export let id;
	export let url;

	let prompt = id ? prompts.get(id) : {};

	async function save() {
		try {
			await prompts.save(prompt);
			window.location = url;
		} catch (e) {
			console.log('could not save prompt');
			alert('Could not save prompt');
		}
	}

	onMount(() => {
		form.addEventListener('submit', async e => {
			e.preventDefault();

			save();
		});

		document.body.addEventListener('keydown', e => {
			if (e.key.toLowerCase() !== 's' || !e.metaKey) return;

			e.preventDefault();

			form.querySelector('[type="submit"]').click();
		});

		form.removeAttribute('data-confirm-unload');
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

<div class="field">
	<div class="heading">
		<label for="group">Group</label>
	</div>
	<div class="input ltr">
		<div class="select">
			<select id="group" name="group" required bind:value={prompt.group}>
				{#each prompts.groups.filter(g => g.canEdit) as group}
					<option
						value={group.key}
						selected={prompt.group ? null : group.key === 'default'}
					>
						{group.name}
					</option>
				{/each}
			</select>
		</div>
	</div>
</div>
