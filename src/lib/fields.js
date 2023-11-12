export default class Fields {
	constructor(resp) {
		this.list = resp.fields;
		this.fieldGroups = resp.fieldGroups;
		if (!resp.fieldGroups || Array.isArray(resp.fieldGroups))
			this.fieldGroups = {};
	}

	static async load() {
		const resp = await fetch(
			'/actions/gpt-content-generator/settings/get-fields'
		);
		return new Fields(await resp.json());
	}

	getCombined() {
		return this.list.map(f => {
			const { id, handle, type, name } = f;

			return {
				id, handle, type, name,
				group: this.fieldGroups[id] ?? ''
			}
		});
	}

	async saveFieldGroups(fieldGroups) {
		const data = new FormData;
		data.set('fieldGroups', JSON.stringify(fieldGroups));

		const resp = await fetch(
			'/actions/gpt-content-generator/settings/save-field-groups',
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

		this.fieldGroups = await resp.json();
	}
}