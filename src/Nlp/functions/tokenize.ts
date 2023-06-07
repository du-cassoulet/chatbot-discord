import autoCorrect from "./autoCorrect";

export type TokenizeOptions = {
	lowerCase?: boolean;
	removePunctuation?: boolean;
	autoCorrectDataset?: string[];
};

function noDiacritic(txt: string): string {
	return txt.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

export default function tokenize(
	text: string,
	options?: TokenizeOptions
): string[] {
	const result: string[] = [];
	let str = "";
	let punc = "";
	let isUrl = false;

	options = {
		lowerCase: options?.lowerCase ?? false,
		removePunctuation: options?.removePunctuation ?? false,
		autoCorrectDataset: options?.autoCorrectDataset ?? null,
	};

	if (options.lowerCase) text = text.toLowerCase();

	noDiacritic(text)
		.split("")
		.forEach((char, index) => {
			if (/^[.,:;!?'-]$/.test(char) || (isUrl && char === "/")) {
				if (str === "https" || isUrl) {
					isUrl = true;
					str += char;
					return;
				}

				if (
					/^[.-]$/.test(char) &&
					/^[a-zA-Zà-üÀ-Ü0-9{}()[\]<>]$/.test(text[index + 1] ?? "")
				) {
					if (punc !== "" && !options.removePunctuation) {
						result.push(punc);
						punc = "";
					}

					str += char;
				} else {
					if (str !== "") {
						result.push(str);
						str = "";
					}

					punc += char;
				}
			} else if (/^[a-zA-Zà-üÀ-Ü0-9{}()[\]<>]$/.test(char)) {
				if (punc !== "" && !options.removePunctuation) {
					result.push(punc);
					punc = "";
				}

				str += char;
			} else if (str !== "") {
				result.push(str);
				str = "";
				isUrl = false;
			}
		});

	if (str !== "") result.push(str);
	if (punc !== "" && !options.removePunctuation) result.push(punc);

	if (options.autoCorrectDataset !== null) {
		return result.map((token) => {
			if (/^[.,:;!?]+$/.test(token)) return token;
			return autoCorrect(options.autoCorrectDataset, token);
		});
	}

	return result;
}
