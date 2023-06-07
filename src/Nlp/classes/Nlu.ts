import fs from "fs";
import { LemType, info } from "../functions/lemmatize";
import tokenize from "../functions/tokenize";

const words = JSON.parse(fs.readFileSync("./data/words.json", "utf8"));

export default class Nlu {
	constructor() {}

	public lemmatize(text: string, removePuncuation: boolean) {
		const tokens = tokenize(text, {
			lowerCase: true,
			autoCorrectDataset: words,
		});

		let lastType: LemType | null = null;

		const lemmas = tokens.map((token) => {
			const tokenInfo = info(token);
			let [selectedToken] = tokenInfo;

			if (/(?:cl[adnr])|(?:np)/.test(lastType)) {
				selectedToken = tokenInfo.find((ti) => ti.type === "v") ?? tokenInfo[0];
			}

			lastType = selectedToken.type;

			return selectedToken.lemma;
		});

		if (removePuncuation) {
			return lemmas.filter((lemma) => !/^[.,:;!?]+$/.test(lemma));
		}

		return lemmas;
	}
}
