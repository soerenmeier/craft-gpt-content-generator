import PopOver from '../components/popover.svelte';

// Manager
export default class PopOverMan {
	constructor() {
		this.prompts = null;

		this.current = null;
		this.currentField = null;
	}

	setPrompts(prompts) {
		this.prompts = prompts;
	}

	open(field) {
		if (this.current) {
			this.current.$destroy();
			this.current = null;
		}

		if (this.currentField && this.currentField.eq(field)) {
			this.currentField = null;
			return;
		}

		this.currentField = field;

		const el = new PopOver({
			target: document.body,
			props: {
				field,
				prompts: this.prompts,
			},
		});
		el.$on('close', e => {
			el.$destroy();
			if (this.currentField && this.currentField.eq(field)) {
				this.currentField = null;
				this.current = null;
			}
		});
		this.current = el;
	}
}
