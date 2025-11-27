export class Field {
	// if the input is not present ignore this field
	constructor(fieldGen) {
		this.fieldGen = fieldGen;
		this.contEl = fieldGen.parentNode.parentNode;
		this.group = fieldGen.dataset.group;

		this.input = null;

		this.labelEl = this.contEl.querySelector('label');
		this.instructionsEl = this.contEl.querySelector('.instructions');

		switch (fieldGen.dataset.type) {
			case 'craft\\fields\\PlainText':
				this.input = new PlainText(fieldGen.parentNode);
				break;

			case 'craft\\redactor\\Field':
				this.input = new Redactor(fieldGen.parentNode);
				break;

			case 'craft\\ckeditor\\Field':
				this.input = new CkEditor(fieldGen.parentNode);
				break;

			case 'spicyweb\\tinymce\\fields\\TinyMCE':
				this.input = new TinyMCE(fieldGen.parentNode);
				break;

			case 'verbb\\vizy\\fields\\VizyField':
				this.input = new Vizy(fieldGen.parentNode);
				break;

			default:
				console.log('unknown type: ' + fieldGen.dataset.type);
		}
	}

	name() {
		return this.input.name();
	}

	label() {
		if (this.labelEl) return this.labelEl.innerText;
		return '';
	}

	instructions() {
		if (this.instructionsEl) return this.instructionsEl.innerText;
		return '';
	}

	value() {
		return this.input.value();
	}

	setValue(val) {
		return this.input.setValue(val);
	}

	eq(other) {
		return this.input.eq(other.input);
	}
}

export class Input {
	constructor(type, cont) {
		this.type = type;
		this.cont = cont;
	}

	name() {
		throw new Error('could not get name of ' + this.type);
	}

	value() {
		throw new Error('could not get value of ' + this.type);
	}

	setValue(val) {
		throw new Error('could not set value of ' + this.type);
	}

	appendIcon(icon) {
		this.cont.appendChild(icon);
	}

	eq(other) {
		return this.type === other.type && this.cont === other.cont;
	}
}

export class PlainText extends Input {
	constructor(cont) {
		super('plainText', cont);

		const input = cont.querySelector('input');
		const textarea = cont.querySelector('textarea');

		this.el = input || textarea;
	}

	name() {
		return this.el.name;
	}

	value() {
		return this.el.value;
	}

	setValue(v) {
		this.el.value = v;
	}

	appendIcon(icon) {
		if (this.el.nodeName.toLowerCase() === 'input')
			icon.classList.add('gpt-align-center');
		this.cont.appendChild(icon);

		this.el.style.paddingRight = '30px';
	}
}

export class Redactor extends Input {
	constructor(cont) {
		super('redactor', cont);

		this.el = cont.querySelector('textarea');
	}

	name() {
		return this.el.name;
	}

	value() {
		return this.el.value;
	}

	setValue(v) {
		$R(this.el, 'source.setCode', v);
	}
}

export class CkEditor extends Input {
	constructor(cont) {
		super('ckeditor', cont);

		this.el = cont.querySelector('textarea');
		this.instance = this.cont.querySelector(
			'.ck-editor__editable',
		).ckeditorInstance;
	}

	name() {
		return this.el.name;
	}

	value() {
		return this.instance.getData();
	}

	setValue(v) {
		this.instance.setData(v);
	}
}

export class TinyMCE extends Input {
	constructor(cont) {
		super('tinymce', cont);

		this.el = cont.querySelector('textarea');
	}

	name() {
		return this.el.name;
	}

	value() {
		return this.el.value;
	}

	setValue(v) {
		if (typeof window.tinymce === 'undefined') {
			console.log('tinymce is not defined');
			return;
		}

		window.tinymce.get(this.el.id).setContent(v);
	}
}

const vizyEditorMap = new WeakMap();

document.addEventListener('onVizyConfigReady', () => {
	Craft.Vizy.Config.registerExtensions((extensions, vizyInput) => {
		const inputEl = vizyInput.$el?.querySelector('input');
		if (!inputEl) return;
		vizyEditorMap.set(inputEl, vizyInput);
	});
});

const VIZY_BLOCK_REGEX = /<vizy-block>.*?<\/vizy-block>/gm;
const VIZY_BLOCK_SHORT_REGEX = /<vizy-block\s*\/>/gm;

export class Vizy extends Input {
	constructor(cont) {
		super('vizy', cont);

		this.el = cont.querySelector('input');
	}

	name() {
		return this.el.name;
	}

	editor() {
		const ed = vizyEditorMap.get(this.el)?.editor;
		if (!ed)
			alert('could not find vizy editor instance for ' + this.name());
		return ed;
	}

	value() {
		let html = this.editor().getHTML();
		html = html.replace(VIZY_BLOCK_REGEX, '<vizy-block/>');

		return html;
	}

	setValue(v) {
		const html = this.editor().getHTML();

		const blocks = html.match(VIZY_BLOCK_REGEX) ?? [];

		let idx = 0;

		v = v.replace(VIZY_BLOCK_SHORT_REGEX, () => {
			const block = blocks[idx++];
			if (!block) console.error('could not find vizy block', idx - 1);
			return block ?? '';
		});

		this.editor().chain().focus().setContent(v, true).run();
	}
}
