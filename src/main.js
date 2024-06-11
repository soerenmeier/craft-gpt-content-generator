import './style.scss';

import Prompts from './lib/prompts.js';
import Fields from './lib/fields.js';
import PromptsTable from './components/pages/promptstable.svelte';
import PromptsEdit from './components/pages/promptsedit.svelte';
import FieldsList from './components/pages/fieldslist.svelte';
import { init as initFields } from './lib/fieldsaction.js';

function initPromptsList(prompts) {
	const promptsList = document.getElementById('prompts-list-table');
	if (!promptsList) return;

	const url = new URL(promptsList.dataset.url);

	new PromptsTable({
		target: promptsList,
		props: {
			prompts,
			url: url.origin + url.pathname,
		},
	});
}

function initPromptsEdit(prompts) {
	const promptsEdit = document.getElementById('prompts-edit');
	if (!promptsEdit) return;

	const form = document.getElementById('main-form');
	form.removeAttribute('novalidate');
	const url = new URL(promptsEdit.dataset.url);

	new PromptsEdit({
		target: promptsEdit,
		props: {
			prompts,
			form,
			id: promptsEdit.dataset.id,
			url: url.origin + url.pathname,
		},
	});
}

async function initFieldsList(prompts) {
	const fieldsList = document.getElementById('gpt-fields-list');
	if (!fieldsList) return;

	// load fields
	const fields = await Fields.load();

	const form = document.getElementById('main-form');
	form.removeAttribute('novalidate');

	const enableAll = document.getElementById('enable-all');
	const disableAll = document.getElementById('disable-all');

	new FieldsList({
		target: fieldsList,
		props: {
			prompts,
			fields,
			form,
			enableAll,
			disableAll,
		},
	});
}

async function main() {
	const prompts = await Prompts.load();

	initPromptsList(prompts);
	initPromptsEdit(prompts);
	initFieldsList(prompts);

	initFields(prompts);
}
main();
