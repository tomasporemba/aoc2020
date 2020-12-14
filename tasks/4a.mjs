import { Task } from '../utils/task.mjs';

export const PassportFields = Object.freeze({
	BYR: 'byr',
	IYR: 'iyr',
	EYR: 'eyr',
	HGT: 'hgt',
	HCL: 'hcl',
	ECL: 'ecl',
	PID: 'pid',
	CID: 'cid',
});

export const RequiredFields = (fieldObj => {
	const {
		CID: optionalField,
		...requiredFields
	} = fieldObj;

	return Object.freeze(requiredFields);
})(PassportFields);


/**
 *
 * @param {string} line
 * @return {Map<string, string>}
 */
const parsePassport = line => new Map(
	line
		.split(/\s/)
		.filter(l => !!l.length)
		.map(field => field.split(':'))
);


export const parsePassportFile = input => input
	.split('\r\n\r\n')
	.map(parsePassport);

/**
 *
 * @param {Map} passport
 * @return {boolean}
 */
const isPassportValid = passport => Object.values(RequiredFields)
	.every(field => passport.has(field));

class Task4a extends Task {
	constructor() {
		super('4a');
	}

	async runTask() {
		return parsePassportFile(this.puzzleData)
			.filter(isPassportValid)
			.length;
	}
}

export default new Task4a();
