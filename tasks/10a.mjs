import { Task } from '../utils/task.mjs';
import { parseLines } from '../utils/parseFile.js';

class Task10a extends Task {
	constructor() {
		super('10a');
	}

	async runTask() {
		const diffs =  parseLines(this.puzzleData)
			.map(l => +l)
			.sort((a, b) => a - b)
			.reduce((totalDiffs, adapter, index, adapterArr) => {
				const prevAdapterVal = index === 0
					? 0
					: adapterArr[index - 1];

				const diff = adapter - prevAdapterVal;

				totalDiffs[diff] = (totalDiffs[diff] || 0) + 1;

				return totalDiffs;
			}, {});

		return diffs[1] * diffs[3];
	}
}

export default new Task10a();
