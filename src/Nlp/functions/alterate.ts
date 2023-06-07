import fs from "fs";
import { LemType } from "./lemmatize";

const synonymsList: { [key: string]: { type: LemType; synonyms: string[] } } =
	JSON.parse(fs.readFileSync("./data/synonyms.json", "utf-8"));

function noCaseNoDiacritic(txt: string): string {
	return txt
		.toLowerCase()
		.normalize("NFD")
		.replace(/[\u0300-\u036f]/g, "");
}

export default function alterate(
	tokens: string[],
	alterationLevel = 0.5
): string[] {
	const newTokens: string[] = [];

	for (let i = 0; i < tokens.length; i++) {
		const defaultToken = noCaseNoDiacritic(tokens[i]);
		const synonyms = synonymsList[defaultToken]?.synonyms;

		if (Math.random() < alterationLevel && synonyms) {
			const synonym = synonyms[Math.floor(Math.random() * synonyms.length)];
			newTokens.push(synonym);
		} else {
			newTokens.push(defaultToken);
		}
	}

	return newTokens;
}
