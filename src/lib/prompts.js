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

	get(id) {
		id = parseInt(id);
		return this.list.find(p => p.id === id);
	}

	async save(prompt) {
		const data = new FormData;
		if (prompt.id)
			data.set('id', prompt.id);
		data.set('name', prompt.name);
		data.set('prompt', prompt.prompt);

		const resp = await fetch(
			'/actions/gpt-content-generator/prompts/save',
			{
				method: 'POST',
				body: data,
				headers: {
					Accept: 'application/json'
				}
			}
		);
		if (!resp.ok)
			throw new Error('not ok');
		prompt = await resp.json();

		// update data

		const updated = this.list.find(p => {
			if (p.id != prompt.id)
				return false;

			p.name = prompt.name;
			p.prompt = prompt.prompt;
			return true;
		});
		if (!updated)
			this.list.push(prompt);

		return prompt;
	}

	async del(prompt) {
		const data = new FormData;
		data.set('id', prompt.id);

		const resp = await fetch(
			'/actions/gpt-content-generator/prompts/delete',
			{
				method: 'POST',
				body: data,
				headers: {
					Accept: 'application/json'
				}
			}
		);
		if (!resp.ok)
			throw new Error('not ok');

		// update data

		this.list = this.list.filter(p => p.id !== prompt.id);
	}

	// finalPrompt: str
	async execute(finalPrompt) {
		const data = new FormData;
		data.set('prompt', finalPrompt);
		
		const resp = await fetch(
			'/actions/gpt-content-generator/prompts/execute',
			{
				method: 'POST',
				body: data,
				headers: {
					Accept: 'application/json'
				}
			}
		);
		if (!resp.ok)
			throw new Error('not ok');

		return await resp.json();
	}
}