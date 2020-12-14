import { Task } from '../utils/task.mjs';

const isPasswordValid = ({ letter, upper, lower, password }) => {
	const letterCount = password
		.split('')
		.filter(l => l === letter)
		.length;

	return upper >= letterCount && lower <= letterCount;
}

export const parsePassword = line => {
	const [bounds, letter, password] = line.split(' ');
	const [lower, upper] = bounds.split('-').map(Number);

	return {
		lower,
		upper,
		password,
		letter: letter[0],
	};
}

class Task2b extends Task {
	constructor() {
		super('2a');
	}

	async runTask() {
		return this.puzzleData
			.split('\r\n')
			.filter(line => !!line.length)
			.map(parsePassword)
			.filter(isPasswordValid)
			.length
	}
}

export default new Task2b();
