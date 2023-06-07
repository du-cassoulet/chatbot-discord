import jaroWinkler from "./jaroWinkler";

export default function autoCorrect(
	dataset: string[],
	word: string,
	tolerance: number = 0.95
): string {
	let selected = word;
	let score = 0;

	dataset.forEach((w) => {
		const s = jaroWinkler(word, w);

		if (s > Math.max(score, tolerance)) {
			score = s;
			selected = w;
		}
	});

	if (word.toLowerCase() === selected.toLowerCase()) return word;
	return selected;
}
