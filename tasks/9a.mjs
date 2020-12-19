import { Task } from '../utils/task.mjs';
import { parseLines } from '../utils/parseFile.js';

class SumMatrix {
	/**
	 *
	 * @type {number[][]}
	 */
	sums = null;
	/**
	 *
	 * @param {number[]} preamble
	 */
	constructor(preamble) {
		this.sums = preamble
			.map((n, index, arr) => {
				const rest = arr.slice(index + 1);
				return [n, ...rest.map(r => r + n)]
			});
	}

	/**
	 *
	 * @param {number} number
	 */
	add(number) {
		this.sums.splice(0, 1);
		this.sums.push([number]);

		for (const numberRow of this.sums.slice(0, this.sums.length - 1)) {
			numberRow.push(numberRow[0] + number);
		}
	}

	/**
	 *
	 * @param {number} number
	 * @return {boolean}
	 */
	isValid(number) {
		return this.sums.some(([_, ...sums]) => {
			return sums.includes(number);
		});
	}
}


class Task9a extends Task {
	constructor() {
		super('9a');
	}

	async runTask() {
		const numbers = parseLines(this.puzzleData).map(l => +l);
		const preamble = numbers.slice(0, 25);
		const controlNumbers = numbers.slice(25);
		const sums = new SumMatrix(preamble);

		for(const n of controlNumbers) {
			if (!sums.isValid(n)) {
				return n;
			}

			sums.add(n);
		}

		return null;
	}
}

export default new Task9a();
