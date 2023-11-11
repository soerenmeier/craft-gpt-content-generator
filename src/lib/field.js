export class Field {
	constructor(type, el) {
		this.type = type;
		this.el = el;
	}

	name() {
		throw new Error('could not get name of ' + this.type);
	}

	label() {
		throw new Error('could not get the label of ' + this.type);
	}

	instructions() {
		throw new Error('could not get the instructions of ' + this.type);
	}

	value() {
		throw new Error('could not get value of ' + this.type);
	}

	setValue(val) {
		throw new Error('could not set value of ' + this.type);
	}

	eq(other) {
		return this.type === other.type && this.el === other.el;
	}
}

export class Input extends Field {
	// opts { label: domEl, instructions: domEl }
	constructor(el, opts) {
		super('input', el);

		this.labelEl = opts?.label;
		this.instructionsEl = opts?.instructions;
	}

	name() {
		return this.el.name;
	}

	label() {
		if (this.labelEl)
			return this.labelEl.innerText;
		return '';
	}

	instructions() {
		if (this.instructionsEl)
			return this.instructionsEl.innerText;
		return '';
	}

	value() {
		return this.el.value;
	}

	setValue(v) {
		this.el.value = v;
	}
}

export class Textarea extends Field {
	// opts { label: domEl, instructions: domEl }
	constructor(el, opts) {
		super('textarea', el);

		this.labelEl = opts?.label;
		this.instructionsEl = opts?.instructions;
	}

	name() {
		return this.el.name;
	}

	label() {
		if (this.labelEl)
			return this.labelEl.innerText;
		return '';
	}

	instructions() {
		if (this.instructionsEl)
			return this.instructionsEl.innerText;
		return '';
	}

	value() {
		return this.el.value;
	}

	setValue(v) {
		this.el.value = v;
	}
}