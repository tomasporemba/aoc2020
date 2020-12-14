import { loadPuzzle } from './fsUtils.mjs';

export class Task {
	taskNumber = null;
	puzzleData = '';

	constructor(taskNumber) {
		this.taskNumber = taskNumber;
	}

	async loadPuzzle() {
		this.puzzleData = await loadPuzzle(this.taskNumber);
	}

	async runTask() {
		console.error(`Run for task [${this.taskNumber}] is not defined.`);
		return null;
	}

	async run() {
		await this.loadPuzzle();
		return this.runTask();
	}
}
