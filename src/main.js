import './style.scss';

const KEY = 'gptvis';

function scanInputs() {
	const inputQueries = [
		'#content-container input[type=text]'
	];
	const VALID_NAMES = /^(title|fields.*)$/;

	for (const query of inputQueries) {
		for (const input of document.querySelectorAll(query)) {
			// if we already visited this
			if (input.dataset[KEY])
				continue;

			if (VALID_NAMES.test(input.name)) {
				input.dataset[KEY] = 'valid';
			} else {
				input.dataset[KEY] = 'invalid';
				continue;
			}

			const icon = document.createElement('span');
			icon.classList.add('gpt-click-icon');
			icon.innerText = 'gpt';

			const parent = input.parentNode;
			parent.appendChild(icon);

		}
	}
}

function main() {
	scanInputs();

	document.addEventListener('click', e => {
		// rescan inputs for example if i click to add a matrix field
		scanInputs();
	});
}
main();