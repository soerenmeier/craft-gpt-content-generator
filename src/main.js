import './style.scss';
import PopOverMan from './lib/popoverman.js';
import Prompts from './lib/prompts.js';
import { Input, Textarea } from './lib/field.js';
import PromptsTable from './components/pages/promptstable.svelte';

const KEY = 'gptvis';
const popOverMan = new PopOverMan;

function scanInputs() {
	const inputQueries = [
		'#content-container input[type=text]',
		'#content-container textarea'
	];
	const VALID_NAMES = /^(title|fields.*)$/;

	for (const query of inputQueries) {
		for (const input of document.querySelectorAll(query)) {
			// if we already visited this
			if (input.dataset[KEY])
				continue;

			if (getComputedStyle(input).display === 'none')
				return;

			if (VALID_NAMES.test(input.name)) {
				input.dataset[KEY] = 'valid';
			} else {
				input.dataset[KEY] = 'invalid';
				continue;
			}

			// let's find the label
			const label = input.parentNode.parentNode.querySelector('label');
			const instructions = input.parentNode.parentNode.querySelector('.instructions');

			const nodeName = input.nodeName.toLowerCase();
			let field;
			if (nodeName === 'input')
				field = new Input(input, { label, instructions });
			else if (nodeName === 'textarea')
				field = new Textarea(input, { label, instructions });

			const icon = document.createElement('span');
			icon.classList.add('gpt-click-icon');
			icon.classList.add('gpt-click-icon-' + nodeName);
			icon.innerText = 'ai';

			const parent = input.parentNode;
			parent.appendChild(icon);

			icon.addEventListener('click', async e => {
				popOverMan.open(field);
			});
		}
	}
}

function initPromptsList(prompts) {
	const promptsList = document.getElementById('prompts-list-table');
	if (!promptsList)
		return;

	const url = new URL(promptsList.dataset.url);

	new PromptsTable({
		target: promptsList,
		props: {
			prompts,
			url: url.origin + url.pathname
		}
	});
}

async function main() {
	const prompts = await Prompts.load();
	// popOverMan.setPrompts(prompts);

	// scanInputs();

	// document.addEventListener('click', e => {
	// 	// rescan inputs for example if i click to add a matrix field
	// 	scanInputs();
	// });

	initPromptsList(prompts);
}
main();