export class AoCError extends Error {
	exitCode;

	constructor(exitCode, msg) {
		super(msg);
		this.exitCode = exitCode;
	}
}
