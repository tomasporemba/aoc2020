import { Task } from '../utils/task.mjs';

export const sumOfNumbers = numbers => {
	const hashMap = {};

	numbers.forEach((n1, index, origNumbers) => {
		origNumbers
			.slice(index)
			.forEach(n2 => {
				hashMap[`${n1}:${n2}`] = n1 + n2;
			})
	});

	return hashMap;
};


class Task1A extends Task {
	constructor() {
		super('1a');
	}

	async runTask() {
		const numbers = this.puzzleData
			.split('\r\n')
			.filter(line => !!line.length)
			.map(Number);

		const [numbersLabel] = Object.entries(sumOfNumbers(numbers))
			.find(([_, sum]) => sum === 2020);

		const [first, second] = numbersLabel.split(':');
		return +first * +second;
	}
}

export default new Task1A();
