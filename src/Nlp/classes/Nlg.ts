import fs from "fs";
import tokenize, { TokenizeOptions } from "../functions/tokenize";
import nextTokens from "../functions/nextTokens";
import sentencize from "../functions/sentencize";
import alterate from "../functions/alterate";

const words = JSON.parse(fs.readFileSync("./data/words.json", "utf8"));

export type ContinueOptions = {
	dataSlice?: number;
	alterateValue?: number;
	autoCorrect?: boolean;
};

export default class Nlg {
	static Constants = {
		DEFAULT_DATA_SLICE: 3,
		DEFAULT_ALTERATE_VALUE: 0.8,
	};

	private dataset: string[];

	constructor(dataset: string[]) {
		this.dataset = dataset;
	}

	public continue(text: string, options?: ContinueOptions) {
		options = {
			dataSlice: options?.dataSlice ?? Nlg.Constants.DEFAULT_DATA_SLICE,
			alterateValue:
				options?.alterateValue ?? Nlg.Constants.DEFAULT_ALTERATE_VALUE,
			autoCorrect: options?.autoCorrect ?? true,
		};

		const tokenizeOptions: TokenizeOptions = {};
		if (options.autoCorrect) tokenizeOptions.autoCorrectDataset = words;

		const tokens = tokenize(text, tokenizeOptions);
		let [token] = tokens;

		while (token !== null) {
			const predictions = nextTokens(this.dataset, tokens, options.dataSlice);
			const random = Math.random();
			let scale = 0;
			token = null;

			for (const prediction of predictions) {
				if (random < prediction.probability + scale) {
					token = prediction.word;
					break;
				}

				scale += prediction.probability;
			}

			if (token !== null) tokens.push(token);
		}

		return sentencize(alterate(tokens, options.alterateValue));
	}
}
