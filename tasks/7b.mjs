import { Task } from '../utils/task.mjs';
import { parseBagsFile } from './7a.mjs';

const getBagContentNumber = (bag, allBags) => {
	const { content } = allBags.find(b => b.bag === bag);

	return 1 + [...content.entries()]
		.reduce((sum, [bagName, count]) => {
			if (bagName === 'other bags.') {
				return sum;
			}

			return sum + count * getBagContentNumber(bagName, allBags);
		}, 0);
}

class Task7b extends Task {
	constructor() {
		super('7b');
	}

	async runTask() {
		const bags = parseBagsFile(this.puzzleData)
		return getBagContentNumber('shiny gold', bags) - 1;
	}
}

export default new Task7b();
