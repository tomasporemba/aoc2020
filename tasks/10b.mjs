import { Task } from '../utils/task.mjs';
import { parseLines } from '../utils/parseFile.js';

/**
 *
 * @param {number} adapter
 * @param {number[]} remainingAdapters
 */
const getCombinations = (adapter, remainingAdapters) => {
	const possibleAdapters = remainingAdapters.filter(ra => ra > adapter && ra - adapter <= 3);

	if (possibleAdapters.length === 0) {
		return 1;
	}

	return possibleAdapters.reduce((sum, ad) => {
		return sum + getCombinations(ad, remainingAdapters.filter(a => a !== ad));
	}, 0);
}

class Task10b extends Task {
	constructor() {
		super('10b');
	}

	// sad spaghetti noises
	async runTask() {
		let allAdapters = parseLines(this.puzzleData)
			.map(l => +l)
			.sort((a, b) => a - b);

		allAdapters = [0, ...allAdapters];

		const expandedAdapters = new Map();

		// get next possible adapters for each adapter
		for(const adapter of allAdapters) {
			const possibleAdapters = allAdapters.filter(aa => aa > adapter && aa - adapter <= 3);
			expandedAdapters.set(adapter, { sum: 0, possibleAdapters });
		}

		// get the number of possible combinations beginning from the end of the adapter sequence
		for(const adapter of [...allAdapters].sort((a, b) => b - a)) {
			const evaluated = expandedAdapters.get(adapter);

			if (evaluated.possibleAdapters.length === 0) {
				evaluated.sum = 1;
				continue;
			}

			evaluated.sum = evaluated.possibleAdapters
				.reduce((sum, pa) => {
					return sum + expandedAdapters.get(pa).sum;
				}, 0);
		}

		return expandedAdapters.get(allAdapters[0]).sum;
	}
}

export default new Task10b();
