function noCaseNoDiacritic(txt: string): string {
	return txt
		.toLowerCase()
		.normalize("NFD")
		.replace(/[\u0300-\u036f]/g, "");
}

export default function jaroWinkler(string1: string, string2: string): number {
	string1 = noCaseNoDiacritic(string1);
	string2 = noCaseNoDiacritic(string2);

	if (string1.length === 0 || string2.length === 0) return 0;
	if (string1 === string2) return 1;

	const matchWindow =
		Math.floor(Math.max(string1.length, string2.length) / 2.0) - 1;
	const matches1 = new Array(string1.length);
	const matches2 = new Array(string2.length);

	let m = 0;
	let t = 0;
	let i = 0;
	let k = 0;

	for (i = 0; i < string1.length; i++) {
		const start = Math.max(0, i - matchWindow);
		const end = Math.min(i + matchWindow + 1, string2.length);

		for (k = start; k < end; k++) {
			if (matches2[k]) {
				continue;
			}
			if (string1[i] !== string2[k]) {
				continue;
			}

			matches1[i] = true;
			matches2[k] = true;
			m++;

			break;
		}
	}

	if (m === 0) return 0;

	k = 0;
	for (i = 0; i < string1.length; i++) {
		if (!matches1[i]) continue;

		while (!matches2[k]) k++;
		if (string1[i] !== string2[k]) t++;

		k++;
	}

	t = t / 2.0;

	const jaro = (m / string1.length + m / string2.length + (m - t) / m) / 3.0;

	const p = 0.1;
	let l = 0;
	while (string1[l] === string2[l] && l < 4) l++;

	return jaro + l * p * (1 - jaro);
}
