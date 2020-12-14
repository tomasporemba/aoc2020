import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const listDir = p => new Promise((resolve, reject) => {
	fs.readdir(
		path.join(__dirname, p),
		{ encoding: 'utf8' },
		(e, files) => {
			if (e) {
				return reject(e);
			}

			resolve(files);
		},
	);
});

export const loadPuzzle = (puzzleNumber) => {
	// puzzle is the same for bot Xa and Xb where X is the number of the day
	const n = puzzleNumber.split('').slice(0, puzzleNumber.length - 1).join('');
	return new Promise((resolve, reject) => {
		fs.readFile(
			path.join(__dirname, `../puzzles/${n}`),
			'utf8',
			(e, data) => {
				if (e) {
					return reject(e);
				}

				resolve(data);
			}
		);
	})
}

export const listPuzzles = () => {
	return listDir('../puzzles');
};

export const listTasks = () => {
	return listDir('../tasks');
};
