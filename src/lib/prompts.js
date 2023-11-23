export class PromptsError extends Error {
	constructor(msg) {
		super(msg);
	}

	__promptsError__() {}
}

export function isPromptsError(e) {
	return typeof e === 'object' && e !== null &&
		typeof e.__promptsError__ === 'function';
}

export default class Prompts {
	constructor(resp) {
		this.list = resp.prompts;
		// [{key, name}]
		this.groups = resp.groups;
		this.fieldGroups = resp.fieldGroups;
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

	getByGroup(key) {
		return this.list.filter(p => p.group === key);
	}

	canViewGroup(key) {
		return !!this.getGroup(key);
	}

	canEditGroup(key) {
		const isAdmin = typeof Craft === 'object' && Craft.userIsAdmin;

		const group = this.getGroup(key);
		const canEdit = group?.canEdit ?? false;

		return canEdit || isAdmin;
	}

	getGroup(key) {
		return this.groups.find(g => g.key === key);
	}

	getFieldGroup(id) {
		return this.fieldGroups[id] ?? null;
	}

	async save(prompt) {
		const data = new FormData;
		if (prompt.id)
			data.set('id', prompt.id);
		data.set('name', prompt.name);
		data.set('prompt', prompt.prompt);
		data.set('group', prompt.group);

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
			p.group = prompt.group;
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
	async execute(finalPrompt, ctx) {
		const data = new FormData;
		data.set('prompt', finalPrompt);
		data.set('context', JSON.stringify(ctx));
		
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

		const json = await resp.json();

		if (json?.error)
			throw new PromptsError(json.error);

		return json;
	}
}