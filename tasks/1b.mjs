import { Task } from '../utils/task.mjs';
import { sumOfNumbers } from './1a.mjs';
import { parseLines } from '../utils/parseFile.js';

class Task1b extends Task {
	constructor() {
		super('1b');
	}

	async runTask() {
		const numbers = parseLines(this.puzzleData)
			.map(Number);

		for(const [label, sum] of Object.entries(sumOfNumbers(numbers))) {
			const num = numbers.find(n => n + sum === 2020);

			if(!num) {
				continue;
			}

			const [first, second] = label.split(':');

			if(+first !== num && +second !== num) {
				return +first * +second * num;
			}
		}

	}
}

export default new Task1b();
