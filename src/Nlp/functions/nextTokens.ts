import allIndexOf from "./allIndexOf";
import autoCorrect from "./autoCorrect";
import tokenize from "./tokenize";

export type NextWordProbability = {
	word: string;
	probability: number;
};

export default function nextTokens(
	dataset: string[],
	tokens: string[],
	slice: number = 3
): NextWordProbability[] {
	tokens = tokens.slice(-slice);

	const valids = tokens.map((word) =>
		autoCorrect(dataset.map((words) => tokenize(words)).flat(), word, 0)
	);

	function inspect(i = tokens.length) {
		let ends = 0;
		const next: { [key: string]: number } = {};

		dataset.forEach((words) => {
			const tokens = tokenize(words);
			const groups: string[] = [];

			for (let j = 0; j < tokens.length; j++) {
				groups.push(tokens.slice(j, j + i).join(" "));
			}

			const indexes = allIndexOf(groups, valids.join(" "));

			indexes.forEach((index) => {
				const word = tokens[index + i] ?? null;

				if (word === null) {
					ends += 1;
				} else if (next[word]) {
					next[word] += 1;
				} else {
					next[word] = 1;
				}
			});
		});

		if (Object.keys(next).length <= 0 && ends <= 0 && i > 0) {
			return inspect(i - 1);
		}

		const probabilities: NextWordProbability[] = [];
		const sum = Object.values(next).reduce((acc, val) => acc + val, 0) + ends;

		if (ends > 0) {
			probabilities.push({
				word: null,
				probability: ends / sum,
			});
		}

		Object.entries(next).map(([word, value]: [string, number]) => {
			probabilities.push({
				word,
				probability: value / sum,
			});
		});

		return probabilities.sort((a, b) => b.probability - a.probability);
	}

	const next = inspect();
	return next;
}
