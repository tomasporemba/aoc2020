/**
 *
 * @param {string} input
 * @return {string[]}
 */
export const parseLines = input => input
	.split('\r\n')
	.filter(line => !!line.length);
