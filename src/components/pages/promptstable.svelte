<script>
	export let prompts;
	export let url;

	async function onDelete(e, prompt) {
		if (!confirm('Delete the Prompt?'))
			return;

		try {
			await prompts.del(prompt);
			prompts = prompts;
		} catch (e) {
			console.log('could not delete prompt');
			alert('Failed to delete the prompt');
		}
	}
</script>

{#if !prompts.list.length}
	<div class="zilch"><p>No Prompts exist yet.</p></div>
{:else}
	<div class="tableview">
		<div class="vue-admin-tablepane tablepane">
			<table class="vuetable data fullwidth">
				<thead>
					<tr>
						<th>Name</th>
						<th>Group</th>
						<th>Prompt</th>
						<th class="thin"></th>
					</tr>
				</thead>
				<tbody class="vuetable-body">
					{#each prompts.list as prompt}
						<tr>
							<td>
								{#if prompts.canEditGroup(prompt.group)}
									<a href={url + '/prompts/' + prompt.id}>{prompt.name}</a>
								{:else}
									{prompt.name}
								{/if}
							</td>
							<td>
								<span class="light">{prompts.getGroup(prompt.group)?.name ?? ''}</span>
							</td>
							<td>
								<span class="light">{prompt.prompt}</span>
							</td>
							<td>
								{#if prompts.canEditGroup(prompt.group)}
									<a title="Delete" role="button" href="#" class="delete icon" on:click|preventDefault={e => onDelete(e, prompt)}></a>
								{/if}
							</td>
						</tr>
					{/each}
				</tbody>
			</table>
		</div>
		<!---->
	</div>
{/if}