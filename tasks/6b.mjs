import { Task } from '../utils/task.mjs';
import { parseFormsFile } from './6a.mjs';

const getGroupAnswers = group => {
	const answerSet = new Set(
		group.flatMap(form => form.split(''))
	);

	return [...answerSet]
		.filter(answer => group.every(form => form.includes(answer)))
		.length;
}

class Task6b extends Task {
	constructor() {
		super('6b');
	}

	async runTask() {
		return parseFormsFile(this.puzzleData)
			.map(getGroupAnswers)
			.reduce((sum, size) => sum + size, 0);
	}
}

export default new Task6b()
