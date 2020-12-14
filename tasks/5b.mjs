import { Task } from '../utils/task.mjs';
import { parseSeatFile } from './5a.mjs';

class Task5b extends Task {
	constructor() {
		super('5b');
	}

	async runTask() {
		return (
			[...parseSeatFile(this.puzzleData)]
				.sort()
				.find((seatID, index, seats) => seatID + 1 !== seats[index + 1])
		) + 1;
	}
}

export default new Task5b();
