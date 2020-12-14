import { Task } from '../utils/task.mjs';

/**
 *
 * @param input
 * @return {(string[])[]}
 */
export const parseFormsFile = input => input
	.split('\r\n\r\n')
	.map(group => group
		.split('\r\n')
		.filter(l => !!l.length)
	);

/**
 *
 * @param {string[]} group
 * @return {Set<string>}
 */
const getGroupAnswers = group => {
	return new Set(
		group.flatMap(form => form.split(''))
	);
}

class Task6a extends Task {
	constructor() {
		super('6a');
	}

	async runTask() {
		return parseFormsFile(this.puzzleData)
			.map(getGroupAnswers)
			.map(set => set.size)
			.reduce((sum, size) => sum + size, 0);
	}
}

export default new Task6a();
