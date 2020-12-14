import { Task } from '../utils/task.mjs';
import { parseLines } from '../utils/parseFile.js';

const parseSeatID = line => {
	const [rows, cols] = [line.substr(0, 7), line.substr(7)];

	const row = parseInt(
		rows.split('')
			.map(letter => letter === 'F' ? 0 : 1)
			.join(''),
		2
	);

	const col = parseInt(
		cols.split('')
			.map(letter => letter === 'L' ? 0 : 1)
			.join(''),
		2
	);

	return row * 8 + col;
}

export const parseSeatFile = input => parseLines(input)
	.map(parseSeatID);


class Task5a extends Task {
	constructor() {
		super('5a');
	}

	async runTask() {
		return parseSeatFile(this.puzzleData)
			.reduce((highest, seatID) => highest < seatID ? seatID : highest, 0);
	}
}

export default new Task5a();
