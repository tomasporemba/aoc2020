import { Task } from '../utils/task.mjs';
import { parseLines } from '../utils/parseFile.js';

const COLS_STEP = 3;

const getColumn = (currentLine, len) => {
	return (currentLine * COLS_STEP) % len;
}


class Task3a extends Task {
	constructor() {
		super('3a');
	}

	async runTask() {
		return parseLines(this.puzzleData)
			.map((line, index) => {
				return line[getColumn(index, line.length)] === '#';
			})
			.filter(isHit => isHit)
			.length;
	}
}

export default new Task3a();
