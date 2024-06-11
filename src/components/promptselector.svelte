<script>
	import { createEventDispatcher } from 'svelte';

	export let prompts;
	export let group;

	const dispatch = createEventDispatcher();

	function onNewPrompt(e) {
		dispatch('new');
	}
</script>

<div class="promptselector">
	<h5>Select a prompt</h5>

	<div class="list">
		{#each prompts.getByGroup(group) as prompt}
			<div class="prompt">
				<button
					type="button"
					on:click={e => dispatch('select', { prompt })}
				>
					{prompt.name}
				</button>
				{#if prompts.canEditGroup(group)}
					<button
						type="button"
						class="edit"
						data-icon="edit"
						on:click={e => dispatch('edit', { prompt })}
					></button>
					<button
						type="button"
						class="delete"
						data-icon="trash"
						on:click={e => dispatch('delete', { prompt })}
					></button>
				{/if}
			</div>
		{/each}
	</div>

	{#if prompts.canEditGroup(group)}
		<button type="button" class="btn" on:click={onNewPrompt}>
			+ New Prompt
		</button>
	{/if}
</div>

<style lang="scss">
	.list {
		margin-bottom: 10px;

		.prompt {
			display: grid;
			grid-template-columns: 1fr auto auto;
			// grid-gap: 5px;
			width: 100%;
			border-bottom: 1px solid var(--gray-200);
		}

		button {
			display: block;
			text-align: left;
			padding: 5px 0;

			&:hover {
				opacity: 0.5;
			}

			&[data-icon] {
				padding: 5px;
			}
		}
	}

	.new {
		// background-color: var(--gray-050);
	}
</style>
