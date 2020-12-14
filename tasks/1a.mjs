import { Task } from '../utils/task.mjs';

class Task1A extends Task {
	constructor() {
		super('1a');
	}

	async runTask() {
		const lines = this.puzzleData
			.split('\n')
			.filter(line => line.length > 0);

		return `This is a solution for ${this.taskNumber}`;
	}
}

export default new Task1A();
