import { Task } from '../utils/task.mjs';
import Task9a from './9a.mjs';
import { parseLines } from '../utils/parseFile.js';


class Task9b extends Task {
	constructor() {
		super('9b');
	}

	async runTask() {
		const numbers = parseLines(this.puzzleData).map(l => +l);
		const invalidNumber = await Task9a.run();

		let startIndex = 0;
		let endIndex = 0
		outer:
			for (; startIndex < numbers.length; startIndex++) {
				endIndex = startIndex + 1;

				for (; endIndex < numbers.length; endIndex++) {
					const sum = numbers.slice(startIndex, endIndex + 1).reduce((sum, n) => sum + n, 0);

					if (sum === invalidNumber) {
						break outer;
					}

					if (sum > invalidNumber) {
						break;
					}
				}
			}

		const range = numbers.slice(startIndex, endIndex + 1).sort();
		return range[0] + range[range.length - 1];
	}
}

export default new Task9b();
