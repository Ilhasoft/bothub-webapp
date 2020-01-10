class TableColumn {
	
	constructor(label, field, component, transform) {
		this.label = label;
		this.field = field;
		this.component = component;
		this.transform = transform;
	}

	transformText(text) {
		// console.log(this.transform)
		if (this.transform == null) return text;
		return this.transform(text);
	}

	defaults() {
		return {
			label: "",
			field: "",
			component: null,
			transform: null
		}
	}
}

export default TableColumn;