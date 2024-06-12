import PopOver from '../components/popover.svelte';

// Manager
export default class PopOverMan {
	constructor() {
		this.prompts = null;

		// { id, comp, field }
		this.actives = [];
		this.id = 0;
	}

	setPrompts(prompts) {
		this.prompts = prompts;
	}

	open(field) {
		// close the popup if it is already open
		let closedSomething = false;
		this.actives = this.actives.filter(active => {
			if (active.field.eq(field)) {
				active.comp.$destroy();
				closedSomething = true;
				return false;
			}

			return true;
		});

		if (closedSomething) return;

		const id = this.id++;

		const el = new PopOver({
			target: document.body,
			props: {
				field,
				prompts: this.prompts,
			},
		});
		el.$on('close', e => {
			el.$destroy();

			this.actives = this.actives.filter(active => active.id !== id);
		});

		this.actives.push({ id, comp: el, field });
	}
}
