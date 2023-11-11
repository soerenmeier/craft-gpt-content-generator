<script>
	export let id = null;
	export let on;
	export let name;
</script>

<button
	type="button"
	class="lightswitch"
	class:on
	role="switch"
	aria-checked={!!on}
	on:click={e => on = !on}
>
	<div class="lightswitch-container">
		<div class="handle"></div>
	</div>
	<input type="hidden" {name} value={+(!!on)}>
</button>