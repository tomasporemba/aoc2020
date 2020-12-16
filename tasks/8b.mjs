import { Task } from '../utils/task.mjs';
import { createMachine, parseInstructions } from './8a.mjs';

/**
 *
 * @param {Machine} machine
 */
const runMachineToCompletion = machine => {
	while(!machine.step());

	// machine finished executing steps
	return machine.acc;
}

class Task8b extends Task {
	constructor() {
		super('8b');
	}

	async runTask() {
		const instructions = parseInstructions(this.puzzleData);
		const instructionCount = instructions.length;

		for(let i = 0; i < instructionCount; i++) {
			try {
				const machine = createMachine(this.puzzleData);
				if(!machine.swapInstruction(i)) {
					// if instruction was not swapped, try swapping next instruction
					continue;
				}
				return runMachineToCompletion(machine);
			} catch {}
		}

		return null;
	}
}

export default new Task8b();
