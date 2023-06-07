import fs from "fs";
import tokenize from "./tokenize";
import sentencize from "./sentencize";

const words = JSON.parse(fs.readFileSync("./data/words.json", "utf8"));
const sentiments = JSON.parse(
	fs.readFileSync("./data/sentiments.json", "utf8")
);

function noCaseNoDiacritic(txt: string): string {
	return txt
		.toLowerCase()
		.normalize("NFD")
		.replace(/[\u0300-\u036f]/g, "");
}

export const Sentiments = Object.freeze({
	POSITIVE: "positive",
	NEUTRAL: "neutral",
	NEGATIVE: "negative",
});

export type SentimentResult = {
	score: number;
	comparative: number;
	sentiment: "positive" | "neutral" | "negative";
	positives: string[];
	negatives: string[];
};

export default function getSentiment(text: string): SentimentResult {
	const tokens = tokenize(noCaseNoDiacritic(text), {
		lowerCase: true,
		autoCorrectDataset: words,
		removePunctuation: true,
	});

	const corrected = sentencize(tokens);
	const calculation: number[] = [];
	const positives: string[] = [];
	const negatives: string[] = [];
	let score = 0;

	sentiments.forEach((label) => {
		[
			...corrected.matchAll(new RegExp("\\b" + label.word + "\\b", "g")),
		].forEach(() => {
			calculation.push(label.score);
			score += label.score;

			if (label.score > 0) positives.push(label.word);
			if (label.score < 0) negatives.push(label.word);
		});
	});

	return {
		score,
		comparative: tokens.length > 0 ? score / tokens.length : 0,
		positives,
		negatives,
		sentiment:
			score === 0
				? Sentiments.NEUTRAL
				: score > 0
				? Sentiments.POSITIVE
				: Sentiments.NEGATIVE,
	};
}
