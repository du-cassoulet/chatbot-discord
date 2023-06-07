export default function sentencize(tokens: string[]): string {
	return tokens
		.join(" ")
		.replace(/\s(,|\.|:)/g, "$1")
		.replace(/\s('|-)\s/g, "$1");
}
