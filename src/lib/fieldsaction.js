import PopOverMan from './popoverman.js';
import { Field } from './field.js';

const popOverMan = new PopOverMan();

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

function scanStaticFields(prompts) {
	const titleGroup = prompts.getFieldGroup('title');
	if (!titleGroup) return;
	const inputs = document.querySelectorAll(
		'input[type=text]:not([data-gpt-scanned])'
	);

	for (const input of inputs) {
		input.setAttribute('data-gpt-scanned', '');

		if (input.name !== 'title' && !input.name.endsWith('[title]')) continue;

		const el = newFieldGen(titleGroup, 'craft\\fields\\PlainText');
		input.parentNode.appendChild(el);
		const title = new Field(el);

		renderIcon(title);
	}
}

function scanFields() {
	const fields = document.querySelectorAll(
		'.gpt-content-generator-field[data-not-scanned]'
	);
	for (const fieldGen of fields) {
		fieldGen.removeAttribute('data-not-scanned');

		const field = new Field(fieldGen);
		if (!field.input) continue;

		renderIcon(field);
	}
}

export function init(prompts) {
	popOverMan.setPrompts(prompts);

	scanStaticFields(prompts);
	scanFields();

	document.addEventListener('click', e => {
		// rescan inputs for example if i click to add a matrix field
		setTimeout(() => {
			scanStaticFields(prompts);
			scanFields();
		}, 500);
	});
}
