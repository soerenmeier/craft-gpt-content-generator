<script>
	import { onMount } from 'svelte';

	export let prompts;
	export let fields;
	export let form;
	export let enableAll;
	export let disableAll;

	let combined = fields.getCombined();

	async function save() {
		const save = {};
		for (const field of combined) {
			save[field.id] = field.group;
		}

		try {
			await fields.saveFieldGroups(save);
			window.location.reload();
		} catch (e) {
			console.log('could not save prompt');
			alert('Could not save prompt');
		}
	}

	onMount(() => {
		form.addEventListener('submit', e => {
			e.preventDefault();

			save();
		});

		document.body.addEventListener('keydown', e => {
			if (e.key.toLowerCase() !== 's' || !e.metaKey)
				return;

			e.preventDefault();

			save();
		});

		enableAll.addEventListener('click', e => {
			combined = combined.map(c => {
				if (!c.group)
					c.group = 'default';
				return c;
			});
		});

		disableAll.addEventListener('click', e => {
			combined = combined.map(c => {
				c.group = '';
				return c;
			});
		});
	});
</script>

<div class="tableview tablepane">
	<table class="data fullwidth">
		<thead>
			<tr>
				<th scope="col">Label</th>
				<th scope="col">Handle</th>
				<th scope="col">Field type</th>
				<th scope="col">Group</th>
			</tr>
		</thead>
		<tbody>
			{#each combined as field}
				<tr class="s-10">
					<td>{field.name}</td>
					<td>{field.handle}</td>
					<td>{field.type}</td>
					<td>
						<div class="select">
							<select id="group" name="group" bind:value={field.group}>
								<option value=""></option>
								{#each prompts.groups as group}
									<option value={group.key}>{group.name}</option>
								{/each}
							</select>
						</div>
					</td>
				</tr>
			{/each}
		</tbody>
	</table>
</div>

<!-- <div class="field">
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

<div class="field">
	<div class="heading">
		<label for="group">Group</label>
	</div>
	<div class="input ltr">
		<div class="select">
			<select id="group" name="group" required bind:value={prompt.group}>
				{#each prompts.groups as group}
					<option
						value={group.key}
						selected={prompt.group ? null : (group.key === 'default')}
					>{group.name}</option>
				{/each}
			</select>
		</div>
	</div>
</div> -->