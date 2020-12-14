import { AoCError } from './errors.mjs';
const { argv } = process;

const printHelp = () => {
	console.log(
		`Advent of Code 2020

To run a specified assignment, use:

aoc2020.js <taskNumber>
`
	);
};


export const parseArgs = () => {
	if (argv.length !== 3) {
		console.error('Incorrect parameters.');
		printHelp();
		throw new AoCError(1);
	}

	const [_, __, task] = argv;

	if(['-h', '--help'].includes(task)) {
		printHelp();
		return null;
	}

	return task;
}
