import { Task } from '../utils/task.mjs';
import { parsePassportFile, PassportFields, RequiredFields } from './4a.mjs';

const isInRange = (val, lower, upper) => {
	const year = +val;
	return year >= lower && year <= upper;
}

const pidRegex = /[0-9]*/;
const hclRegex = /#[0-9a-f]*/;
const eclVals = ['amb', 'blu', 'brn', 'gry', 'grn', 'hzl', 'oth'];

const byrValid = val => isInRange(val, 1920, 2002);
const iyrValid = val => isInRange(val, 2010, 2020);
const eyrValid = val => isInRange(val, 2020, 2030);

const hgtValid = val => {
	const [height, units] = [val.substring(0, val.length - 2), val.substring(val.length - 2)];

	switch(units) {
		case 'cm': return isInRange(height, 150, 193);
		case 'in': return isInRange(height, 59, 76);
		default: return false;
	}
};

const hclValid = val => val.length === 7 && hclRegex.test(val);
const eclValid = val => eclVals.includes(val);
const pidValid = val => val.length === 9 && pidRegex.test(val);

const Validations = Object.freeze({
	[RequiredFields.BYR]: byrValid,
	[RequiredFields.IYR]: iyrValid,
	[RequiredFields.EYR]: eyrValid,
	[RequiredFields.HGT]: hgtValid,
	[RequiredFields.HCL]: hclValid,
	[RequiredFields.ECL]: eclValid,
	[RequiredFields.PID]: pidValid,
	[PassportFields.CID]: () => true,
});

/**
 *
 * @param {Map} passport
 * @return boolean
 */
const isPassportValid = passport => {
	return Object.values(RequiredFields)
		.every(val => passport.has(val) && Validations[val](passport.get(val)));
}

class Task4b extends Task {
	constructor() {
		super('4b');
	}

	async runTask() {
		return parsePassportFile(this.puzzleData)
			.filter(isPassportValid)
			.length;
	}
}

export default new Task4b();
