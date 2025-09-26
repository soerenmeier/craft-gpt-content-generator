<script>
	import { createEventDispatcher } from 'svelte';

	export let text;

	const dispatch = createEventDispatcher();
</script>

<div class="generated-text">
	<div class="generated-text-content">{text}</div>

	<button type="button" class="btn submit" on:click={e => dispatch('accept')}>
		Ok
	</button>
	<button type="button" class="btn" on:click={e => dispatch('regenerate')}>
		Regenerate
	</button>
	<button type="button" class="btn" on:click={e => dispatch('cancel')}>
		Cancel
	</button>
</div>

<style lang="scss">
	.generated-text-content {
		max-height: 40vh;
		overflow-y: auto;
		margin-block-end: 1em;
	}
</style>
