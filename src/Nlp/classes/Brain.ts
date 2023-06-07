import fs from "fs";
import path from "path";
import Nlu from "./Nlu";
import Nlg from "./Nlg";
import getSentiment from "../functions/getSentiment";
import sentencize from "../functions/sentencize";
import tokenize from "../functions/tokenize";
import jaroWinkler from "../functions/jaroWinkler";

const words = JSON.parse(fs.readFileSync("./data/words.json", "utf8"));

export type Answer = {
	text: string;
	score: number;
};

export type Neuron = {
	keywords: string;
	answers: Answer[];
};

export default class Brain {
	public data: Neuron[];
	private path: string;
	private nlu: Nlu;

	constructor(_path: string = path.join(__dirname, "../brain.json")) {
		this.path = _path;
		this.nlu = new Nlu();

		if (!fs.existsSync(this.path)) {
			fs.writeFileSync(this.path, "[]", "utf8");
		}

		this.data = JSON.parse(fs.readFileSync(this.path, "utf8"));
	}

	private save(): void {
		return fs.writeFileSync(this.path, JSON.stringify(this.data));
	}

	public train(context: string[], answer?: string): void {
		const lemmas = context.map((p) => this.nlu.lemmatize(p, true).join(","));
		const keywords = lemmas.join(";");

		const neuronIndex = this.data.findIndex(
			(neuron) => neuron.keywords === keywords
		);

		if (answer) {
			const cleanAnswer = sentencize(
				tokenize(answer, { autoCorrectDataset: words })
			);

			if (neuronIndex === -1) {
				this.data.push({
					keywords,
					answers: [
						{
							text: cleanAnswer,
							score: getSentiment(cleanAnswer).comparative,
						},
					],
				});
			} else {
				this.data[neuronIndex].answers.push({
					text: cleanAnswer,
					score: getSentiment(cleanAnswer).comparative,
				});
			}
		} else if (neuronIndex === -1) {
			this.data.push({
				keywords,
				answers: [],
			});
		}

		return this.save();
	}

	private selectMaxAccuracy(
		keywordsArray: string[],
		i: number = 0
	): { score: number; neuron: Neuron } {
		const keywords = keywordsArray[i];
		let selected = this.data[0];
		let highest = jaroWinkler(selected.keywords, keywords);

		this.data.forEach((neuron) => {
			const score = jaroWinkler(neuron.keywords, keywords);

			if (score > highest) {
				highest = score;
				selected = neuron;
			}
		});

		if (i < keywordsArray.length - 1) {
			const lastScore = this.selectMaxAccuracy(keywordsArray, i + 1);

			if (lastScore.score > highest) return lastScore;
			return { score: highest, neuron: selected };
		}

		return { score: highest, neuron: selected };
	}

	public answer(prompt: string, context: string[] = []): string {
		const keywordsArray = [];

		for (let i = 0; i <= context.length; i++) {
			const lemmas = [this.nlu.lemmatize(prompt, true).join(",")];
			lemmas.push(
				...context.slice(0, i).map((p) => this.nlu.lemmatize(p, true).join(","))
			);

			keywordsArray.push(lemmas.join(";"));
		}

		const { answers } = this.selectMaxAccuracy(keywordsArray).neuron;
		const answer = answers[Math.floor(Math.random() * answers.length)];
		const [startToken] = tokenize(answer.text);

		const nlg = new Nlg(answers.map((a) => a.text));
		return nlg.continue(startToken, { dataSlice: 2, autoCorrect: true });
	}
}
