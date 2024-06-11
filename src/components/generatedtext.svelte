<script>
	import { createEventDispatcher } from 'svelte';

	export let text;

	const dispatch = createEventDispatcher();
</script>

<div class="generated-text">
	<p>{text}</p>

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
