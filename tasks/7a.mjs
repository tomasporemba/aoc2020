import { Task } from '../utils/task.mjs';
import { parseLines } from '../utils/parseFile.js';

const parseBagContentPart = bagDef => {
	const [count, ad1, ad2] = bagDef.split(' ');

	return [
		`${ad1} ${ad2}`,
		count,
	];
};

const parseBag = bagSentence => bagSentence.split(' ').slice(0, 2).join(' ');
const parseBagContent = content =>
	new Map(
		content
			.split(',')
			.map(l => l.trim())
			.map(parseBagContentPart)
	);

const parseBagLine = line => {
	const [first, second] = line.split('contain');

	return {
		bag: parseBag(first.trim()),
		content: parseBagContent(second.trim()),
	};
};

export const parseBagsFile = input => parseLines(input)
	.map(parseBagLine);

/**
 *
 * @param {Set<string>} currentSet
 * @param {Array} allBags
 */
const expandBagSet = (currentSet, allBags) => {
	const newSet = new Set([...currentSet]);

	for(const bag of currentSet) {
		allBags.filter(b => b.content.has(bag))
			.forEach(bag => newSet.add(bag.bag))
	}

	return newSet;
}

class Task7a extends Task {
	constructor() {
		super('7a');
	}

	async runTask() {
		const bags = parseBagsFile(this.puzzleData);

		let containing = new Set(['shiny gold']);

		while(true) {
			const newContaining = expandBagSet(containing, bags);

			if (containing.size === newContaining.size) {
				containing = newContaining;
				break;
			}

			containing = newContaining;
		}

		return containing.size - 1;
	}
}

export default new Task7a();
