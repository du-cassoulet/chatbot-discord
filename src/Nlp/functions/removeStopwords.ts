import fs from "fs";

const stopwords = JSON.parse(fs.readFileSync("./data/stopwords.json", "utf8"));

export default function removeStopwords(tokens: string[]): string[] {
	return tokens.filter(
		(token) =>
			!stopwords.includes(token.toLowerCase()) && !/^[.,:;!?]+$/.test(token)
	);
}
