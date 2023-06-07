export default function allIndexOf(
	array: (string | number)[],
	value: string | number
) {
	const indexes = [];
	let index = array.indexOf(value, 0);

	while (index > -1) {
		indexes.push(index);
		index = array.indexOf(value, index + 1);
	}

	return indexes;
}
