"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const Nlu_1 = __importDefault(require("./Nlu"));
const Nlg_1 = __importDefault(require("./Nlg"));
const getSentiment_1 = __importDefault(require("../functions/getSentiment"));
const sentencize_1 = __importDefault(require("../functions/sentencize"));
const tokenize_1 = __importDefault(require("../functions/tokenize"));
const jaroWinkler_1 = __importDefault(require("../functions/jaroWinkler"));
const words = JSON.parse(fs_1.default.readFileSync("./data/words.json", "utf8"));
class Brain {
    constructor(_path = path_1.default.join(__dirname, "../brain.json")) {
        this.path = _path;
        this.nlu = new Nlu_1.default();
        if (!fs_1.default.existsSync(this.path)) {
            fs_1.default.writeFileSync(this.path, "[]", "utf8");
        }
        this.data = JSON.parse(fs_1.default.readFileSync(this.path, "utf8"));
    }
    save() {
        return fs_1.default.writeFileSync(this.path, JSON.stringify(this.data));
    }
    train(context, answer) {
        const lemmas = context.map((p) => this.nlu.lemmatize(p, true).join(","));
        const keywords = lemmas.join(";");
        const neuronIndex = this.data.findIndex((neuron) => neuron.keywords === keywords);
        if (answer) {
            const cleanAnswer = (0, sentencize_1.default)((0, tokenize_1.default)(answer, { autoCorrectDataset: words }));
            if (neuronIndex === -1) {
                this.data.push({
                    keywords,
                    answers: [
                        {
                            text: cleanAnswer,
                            score: (0, getSentiment_1.default)(cleanAnswer).comparative,
                        },
                    ],
                });
            }
            else {
                this.data[neuronIndex].answers.push({
                    text: cleanAnswer,
                    score: (0, getSentiment_1.default)(cleanAnswer).comparative,
                });
            }
        }
        else if (neuronIndex === -1) {
            this.data.push({
                keywords,
                answers: [],
            });
        }
        return this.save();
    }
    selectMaxAccuracy(keywordsArray, i = 0) {
        const keywords = keywordsArray[i];
        let selected = this.data[0];
        let highest = (0, jaroWinkler_1.default)(selected.keywords, keywords);
        this.data.forEach((neuron) => {
            const score = (0, jaroWinkler_1.default)(neuron.keywords, keywords);
            if (score > highest) {
                highest = score;
                selected = neuron;
            }
        });
        if (i < keywordsArray.length - 1) {
            const lastScore = this.selectMaxAccuracy(keywordsArray, i + 1);
            if (lastScore.score > highest)
                return lastScore;
            return { score: highest, neuron: selected };
        }
        return { score: highest, neuron: selected };
    }
    answer(prompt, context = []) {
        const keywordsArray = [];
        for (let i = 0; i <= context.length; i++) {
            const lemmas = [this.nlu.lemmatize(prompt, true).join(",")];
            lemmas.push(...context.slice(0, i).map((p) => this.nlu.lemmatize(p, true).join(",")));
            keywordsArray.push(lemmas.join(";"));
        }
        const { answers } = this.selectMaxAccuracy(keywordsArray).neuron;
        const answer = answers[Math.floor(Math.random() * answers.length)];
        const [startToken] = (0, tokenize_1.default)(answer.text);
        const nlg = new Nlg_1.default(answers.map((a) => a.text));
        return nlg.continue(startToken, { dataSlice: 2, autoCorrect: true });
    }
}
exports.default = Brain;
