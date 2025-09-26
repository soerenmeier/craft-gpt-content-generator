<script>
	import { onMount, tick, createEventDispatcher } from 'svelte';
	import PromptSelector from './promptselector.svelte';
	import EditPrompt from './editprompt.svelte';
	import GeneratedText from './generatedtext.svelte';
	import { isPromptsError } from '../lib/prompts.js';

	const dispatch = createEventDispatcher();

	// input or textarea
	export let field;
	export let prompts;

	let contEl;
	let mounted = null;
	let editPrompt = null;
	let generatePrompt = null;
	let generateError = null;
	let generatedText = null;

	function updatePosition() {
		const rect = field.input.cont.getBoundingClientRect();

		const height = contEl.offsetHeight;

		if (rect.top < height) {
			// the popup has not enough space at the top so let's move down
			contEl.style.top = rect.bottom + 'px';
			contEl.style.bottom = 'auto';
		} else {
			contEl.style.top = 'auto';
			contEl.style.bottom = window.innerHeight - rect.top + 'px';
		}

		contEl.style.right = window.innerWidth - rect.right + 'px';
		contEl.style.maxWidth =
			Math.min(800, field.input.cont.offsetWidth) + 'px';
	}

	function onScroll() {
		updatePosition();
	}

	function onResize() {
		updatePosition();
	}

	function onWindowClick(e) {
		const dif = Date.now() - mounted;
		if (dif < 100) return;

		// if the click was inside
		if (contEl.contains(e.target) || !document.body.contains(e.target))
			return;

		// only close if no prompt is being generated
		if (generatePrompt) return;

		// else let's close the prompt
		dispatch('close');
	}

	async function onNewPrompt(e) {
		editPrompt = {
			name: '',
			prompt: '',
			group: field.group,
		};
		await tick();
		updatePosition();
	}

	function onSelectPrompt(e) {
		const prompt = e.detail.prompt;

		generate(prompt.prompt);
	}

	function onPromptSave(e) {
		const prompt = e.detail.prompt;
		prompts = prompts;

		editPrompt = null;
	}

	async function onPromptEdit(e) {
		editPrompt = e.detail.prompt;
		await tick();
		updatePosition();
	}

	async function onPromptDelete(e) {
		const prompt = e.detail.prompt;

		try {
			await prompts.del(prompt);
			prompts = prompts;
		} catch (e) {
			console.log('failed to generate');
			alert('could not delete prompt');
		}
	}

	function onAccept(e) {
		field.setValue(generatedText);
		dispatch('close');
	}

	function onRegenerate(e) {
		generatedText = null;
		generate(generatePrompt, false);
	}

	async function generate(prompt, isNew = true) {
		generateError = null;

		if (isNew) {
			const ctx = {
				field: {
					name: field.name(),
					label: field.label(),
					instructions: field.instructions(),
					value: field.value(),
				},
			};

			if (window?.Craft?.siteId) ctx.siteId = Craft.siteId;

			generatePrompt = {
				prompt,
				ctx,
			};
		}

		try {
			generatedText = await prompts.execute(
				generatePrompt.prompt,
				generatePrompt.ctx,
			);
		} catch (e) {
			if (isPromptsError(e)) generateError = e.message;
			else generateError = 'could not generate';
		}
	}

	onMount(() => {
		mounted = Date.now();
		updatePosition();
	});
</script>

<svelte:window
	on:scroll={onScroll}
	on:resize={onResize}
	on:click={onWindowClick}
/>

<div class="gpt-popover-cont" bind:this={contEl}>
	<div class="gpt-popover">
		{#if generatedText !== null}
			<GeneratedText
				text={generatedText}
				on:accept={onAccept}
				on:regenerate={onRegenerate}
				on:cancel={e => {
					generatedText = null;
					generatePrompt = null;
				}}
			/>
		{:else if generatePrompt}
			{#if generateError}
				<p>{generateError}</p>
			{:else}
				<p>Generating...</p>
			{/if}
		{:else if editPrompt}
			<EditPrompt
				{prompts}
				prompt={editPrompt}
				on:save={onPromptSave}
				on:cancel={e => (editPrompt = null)}
			/>
		{:else}
			<PromptSelector
				{prompts}
				group={field.group}
				on:new={onNewPrompt}
				on:select={onSelectPrompt}
				on:edit={onPromptEdit}
				on:delete={onPromptDelete}
			/>
		{/if}
	</div>
</div>

<style lang="scss">
	.gpt-popover-cont {
		position: fixed;
		z-index: 9999;
		padding: 5px 0;
	}

	.gpt-popover {
		min-width: 350px;
		min-height: 100px;
		padding: 10px 15px;
		// border: 1px solid var(--hairline-color);
		// background-color: var(--gray-050);
		background-color: white;
		border-radius: var(--large-border-radius);
		box-shadow:
			0 0 0 1px #cdd8e4,
			0 2px 12px rgba(205, 216, 228, 0.5);

		:global {
			h5 {
				font-weight: bold;
				margin-bottom: 10px;
			}
		}
	}
</style>
