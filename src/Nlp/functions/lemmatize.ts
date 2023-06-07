import fs from "fs";

const lemmatizer = JSON.parse(
	fs.readFileSync("./data/lemmatizer.json", "utf8")
);

export type LemType =
	| "poncts"
	| "ponctw"
	| "adj"
	| "nc"
	| "coo"
	| "v"
	| "parento"
	| "epsilon"
	| "parentf"
	| "adv"
	| "pres"
	| "ce"
	| "cln"
	| "clg"
	| "cll"
	| "ilimp"
	| "cla"
	| "cld"
	| "prep"
	| "np"
	| "etr"
	| ":GA"
	| ":GN"
	| ":GP"
	| ":GR"
	| ":NV"
	| ":PV"
	| "GA:"
	| "GN:"
	| "GP:"
	| "GR:"
	| "NV:"
	| "PV:"
	| "meta"
	| "adjPref"
	| "advPref"
	| "det"
	| "pro"
	| "sbound"
	| "advneg"
	| "auxAvoir"
	| "auxEtre"
	| "clneg"
	| "clr"
	| "csu"
	| "prel"
	| "pri"
	| "suffAdj"
	| "caimp"
	| "que"
	| "que_restr"
	| "clar"
	| "cldr";

export type LemmatizerItem = {
	type: LemType;
	lemma: string;
	mode: string;
};

export function expandMode(mode: string) {
	return {
		indicatif: /[PFIJ]/.test(mode),
		subjonctif: /[ST]/.test(mode),
		participe: /[KG]/.test(mode),
		present: /[PCYSGW]/.test(mode),
		imparfait: /[IT]/.test(mode),
		conditionnel: /C/.test(mode),
		imperatif: /Y/.test(mode),
		infinitif: /W/.test(mode),
		futur: /F/.test(mode),
		passeSimple: /J/.test(mode),
		passe: /K/.test(mode),
		premierePersonne: /1/.test(mode),
		deuxiemePersonne: /2/.test(mode),
		troisiemePersonne: /3/.test(mode),
		masculin: /m/.test(mode),
		feminin: /f/.test(mode),
		singulier: /s/.test(mode),
		pluriel: /p/.test(mode),
	};
}

export function lem(word: string, type?: LemType): string {
	if (!type) {
		return lemmatizer[word]?.[0]?.lemma ?? word;
	}

	return lemmatizer[word].find((l) => l.type === type)?.lemma ?? word;
}

export function info(word: string): LemmatizerItem[] {
	return lemmatizer[word] ?? [{ type: "np", lemma: word, mode: "ms" }];
}

export default { lem, info, expandMode };
