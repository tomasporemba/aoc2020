import { Task } from '../utils/task.mjs';
import { parseLines } from '../utils/parseFile.js';

const isTreeHit = (line, position) => line[position] === '#';
const getColumn = (line, step, length) => {
	return (line * step) % length;
}

const getTreeHitCount = (lines, isHitFn) => {
	return lines
		.map((line, index) => isHitFn(line, index))
		.filter(isHit => isHit)
		.length;
}

class Task3b extends Task {
	constructor() {
		super('3b');
	}

	async runTask() {
		const lines = parseLines(this.puzzleData);

		return [
			// 1 right, 1 down
			getTreeHitCount(lines, (line, index) => isTreeHit(line, getColumn(index, 1, line.length))),
			// 3 right, 1 down
			getTreeHitCount(lines, (line, index) => isTreeHit(line, getColumn(index, 3, line.length))),
			// 5 right, 1 down
			getTreeHitCount(lines, (line, index) => isTreeHit(line, getColumn(index, 5, line.length))),
			// 7 right, 1 down
			getTreeHitCount(lines, (line, index) => isTreeHit(line, getColumn(index, 7, line.length))),
			// 1 right, 2 down
			getTreeHitCount(
				lines.filter((_, index) => index % 2 === 0),
				(line, index) => isTreeHit(line, getColumn(index, 1, line.length))
			),
		].reduce((product, treeNumber) => product * treeNumber, 1);
	}
}

export default new Task3b();
