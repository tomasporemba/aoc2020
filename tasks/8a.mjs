import { Task } from '../utils/task.mjs';
import { parseLines } from '../utils/parseFile.js';

const InstructionTypes = Object.freeze({
	ACC: 'acc',
	JMP: 'jmp',
	NOP: 'nop',
});

const parseInst = line => {
	const [inst, operand] = line.split(' ');
	const parsedOperand = +operand;

	switch (inst) {
		case InstructionTypes.ACC:
			return new AccInst(parsedOperand);
		case InstructionTypes.JMP:
			return new JmpInst(parsedOperand);
		case InstructionTypes.NOP:
			return new NoopInst(parsedOperand);
		default:
			throw new Error('Unknown instruction');
	}
}

class LoopError extends Error {
	result = null;

	constructor(result) {
		super();
		this.result = result;
	}
}

class Inst {
	/**
	 *
	 * @type {number}
	 */
	operand = null;
	alreadyRun = false;

	/**
	 *
	 * @param {number} operand
	 */
	constructor(operand) {
		this.operand = operand;
	}

	/**
	 *
	 * @param {Machine} machine
	 */
	runInst(machine) {
		throw new Error('Not implemented');
	}

	/**
	 *
	 * @param {Machine} machine
	 */
	run(machine) {
		try {
			this.canRun();
		} catch {
			throw new LoopError(machine.acc);
		}

		this.runInst(machine);
	}

	canRun() {
		if (this.alreadyRun) {
			throw new Error('Loop found.');
		}

		this.alreadyRun = true;
	}
}

export class JmpInst extends Inst {
	runInst(machine) {
		machine.ip += this.operand;
	}
}

class AccInst extends Inst {
	runInst(machine) {
		machine.acc += this.operand;
		machine.ip++;
	}
}

export class NoopInst extends Inst {
	runInst(machine) {
		machine.ip++;
	}
}

export class Machine {
	acc = 0;
	ip = 0;
	/**
	 *
	 * @type {Inst[]}
	 */
	instructions = null;

	/**
	 *
	 * @param {Inst[]} instructions
	 */
	constructor(instructions) {
		this.instructions = instructions;
	}

	/**
	 *
	 * @return {boolean} Returns whether there are not more instructions to be run
	 * @throws {LoopError} If an instruction is encountered for the second time (loop is detected)
	 */
	step() {
		const currentInst = this.instructions[this.ip];
		currentInst.run(this);

		return this.ip === this.instructions.length;
	}

	/**
	 *
	 * @param index Index of instruction to swap
	 * @return {boolean} Signals whether instruction was swapped
	 */
	swapInstruction(index) {
		const [inst] = this.instructions.splice(index, 1);

		const newInst = (
			inst instanceof NoopInst ? new JmpInst(inst.operand) :
			inst instanceof JmpInst ? new NoopInst(inst.operand) :
			inst
		);

		this.instructions.splice(index, 0, newInst);

		return !(inst instanceof AccInst);
	}
}

export const parseInstructions = input => parseLines(input)
	.map(parseInst);

export const createMachine = input => new Machine(parseInstructions(input));

class Task8a extends Task {
	constructor() {
		super('8a');
	}

	async runTask() {
		const machine = createMachine(this.puzzleData);

		try {
			while (true) {
				machine.step();
			}
		} catch (e) {
			if (e instanceof LoopError) {
				return e.result;
			}

			throw e;
		}
	}
}

export default new Task8a();
