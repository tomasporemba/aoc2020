import { parseArgs } from './utils/parseArgs.mjs';
import { listTasks } from './utils/fsUtils.mjs';

const taskId = parseArgs();

if(!taskId) {
	process.exit(0);
}

listTasks()
	.then(tasks => {
		if (!tasks.includes(`${taskId}.mjs`)) {
			console.error(`Assignment ${taskId} is not implemented yet`);
			process.exit(2);
		}

		return import(`./tasks/${taskId}.mjs`)
	})
	.then(async ({ default: task}) => {
		if (!task) {
			console.error(`Missing default export from task ${taskId}!`);
		}
		return task.run();
	})
	.then(console.log)
	.catch(e => {
		console.error(e);
		process.exit(3);
	});
