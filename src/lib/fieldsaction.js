import PopOverMan from './popoverman.js';
import { Field } from './field.js';

const popOverMan = new PopOverMan;

function renderIcon(field) {
	const icon = document.createElement('span');
	icon.classList.add('gpt-click-icon');
	icon.innerText = 'ai';

	field.input.appendIcon(icon);

	icon.addEventListener('click', async e => {
		popOverMan.open(field);
	});
}

function newFieldGen(group, type) {
	const el = document.createElement('div');
	el.dataset.group = group;
	el.dataset.type = type;

	return el;
}

function scanStaticFields(form, prompts) {
	let title = form.querySelector('input[name=title]');
	const titleGroup = prompts.getFieldGroup('title');
	if (title && titleGroup && prompts.canViewGroup(titleGroup)) {
		const el = newFieldGen(titleGroup, 'craft\\fields\\PlainText');
		title.parentNode.appendChild(el);
		title = new Field(el);

		renderIcon(title);
	}
}

function scanFields(form) {
	const fields = form.querySelectorAll(
		'.gpt-content-generator-field[data-not-scanned]'
	);
	for (const fieldGen of fields) {
		fieldGen.removeAttribute('data-not-scanned');

		const field = new Field(fieldGen);
		if (!field.input)
			continue;

		renderIcon(field);
	}
}

function whichEditPath() {
	if (!window.Craft)
		return null;

	const p = Craft.path;

	if (p.startsWith('globals/'))
		return 'globals';
	if (p.startsWith('entries/') && p.split('/').length > 2)
		return 'entries';
	if (p.startsWith('edit/'))
		return 'entries';

	return null;

	// if (document.body.classList.contains('edit-global-set'))
	// 	return true;
}

export function init(prompts) {
	const page = whichEditPath();
	if (!page)
		return console.log('not edit page');

	popOverMan.setPrompts(prompts);



	const form = document.getElementById('main-form');

	// Craft.siteId Craft.sites

	scanStaticFields(form, prompts);
	scanFields(document.body);

	document.addEventListener('click', e => {
		// rescan inputs for example if i click to add a matrix field
		setTimeout(() => {
			scanFields(document.body);
		}, 500);
	});
}