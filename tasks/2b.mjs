import { Task } from '../utils/task.mjs';
import { parsePassword } from './2a.mjs';
import { parseLines } from '../utils/parseFile.js';

// lower and upper are 1 based indices
const isPasswordValid = ({ lower, upper, letter, password }) => {
	if(lower > password.length || upper > password.length) {
		return false;
	}

	const isLower = password[lower - 1] === letter;
	const isUpper = password[upper - 1] === letter;

	return (isLower || isUpper) && !(isLower && isUpper);
}

class Task2b extends Task {
	constructor() {
		super('2b');
	}

	async runTask() {
		return parseLines(this.puzzleData)
			.map(parsePassword)
			.filter(isPasswordValid)
			.length;
	}
}

export default new Task2b();
