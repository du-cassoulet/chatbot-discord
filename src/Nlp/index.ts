import BrainClass from "./classes/Brain";
import NlgClass from "./classes/Nlg";
import NluClass from "./classes/Nlu";

import allIndexOfFunction from "./functions/allIndexOf";
import autoCorrectFunction from "./functions/autoCorrect";
import getSentimentFunction from "./functions/getSentiment";
import jaroWinklerFunction from "./functions/jaroWinkler";
import nextTokensFunction from "./functions/nextTokens";
import removeStopwordsFunction from "./functions/removeStopwords";
import sentencizeFunction from "./functions/sentencize";
import tokenizeFunction from "./functions/tokenize";
import alterateFunction from "./functions/alterate";

import lemmatizeGroup from "./functions/lemmatize";

export const Brain = BrainClass;
export const Nlg = NlgClass;
export const Nlu = NluClass;

export const allIndexOf = allIndexOfFunction;
export const autoCorrect = autoCorrectFunction;
export const getSentiment = getSentimentFunction;
export const jaroWinkler = jaroWinklerFunction;
export const nextTokens = nextTokensFunction;
export const removeStopwords = removeStopwordsFunction;
export const sentencize = sentencizeFunction;
export const tokenize = tokenizeFunction;
export const alterate = alterateFunction;

export const lemmatize = lemmatizeGroup;

export default {
	Brain,
	Nlu,
	Nlg,
	allIndexOf,
	autoCorrect,
	getSentiment,
	jaroWinkler,
	nextTokens,
	removeStopwords,
	sentencize,
	tokenize,
	alterate,
	lemmatize,
};
