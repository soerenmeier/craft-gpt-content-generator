export default class Prompts {
	constructor(list) {
		this.list = list;
	}

	static async load() {
		const resp = await fetch(
			'/actions/gpt-content-generator/prompts/get'
		);
		return new Prompts(await resp.json());
	}

	save(prompt) {
		const updated = this.list.find(p => {
			if (p.id != prompt.id)
				return false;

			p.name = prompt.name;
			p.prompt = prompt.prompt;
			return true;
		});
		if (!updated)
			this.list.push(prompt);

		return this;
	}

	del(prompt) {
		this.list = this.list.filter(p => p.id !== prompt.id);

		return this;
	}
}