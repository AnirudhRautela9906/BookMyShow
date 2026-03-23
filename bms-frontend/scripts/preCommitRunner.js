import ora from 'ora';
import chalk from 'chalk';
import { exec } from 'child_process';

// 🔧 helper to run commands with spinner
const runTask = (cmd, label) => {
  return new Promise((resolve, reject) => {
    const spinner = ora({
      text: chalk.blue(label),
      spinner: 'aesthetic',
      isEnabled: process.stdout.isTTY, // only animate if supported
    }).start();

    const child = exec(cmd, { env: process.env });

    let stdout = '';
    let stderr = '';

    child.stdout?.on('data', data => {
      stdout += data.toString();
    });

    child.stderr?.on('data', data => {
      stderr += data.toString();
    });

    child.on('close', code => {
      if (code === 0) {
        spinner.succeed(chalk.green(` ${label} completed`));
        resolve();
      } else {
        spinner.fail(chalk.red(` ${label} failed`));

        console.log(chalk.red('\n❌ Error details:\n'));
        if (stdout) console.log(stdout);
        if (stderr) console.log(stderr);

        reject(new Error(`${label} failed`));
      }
    });
  });
};

// 🔧 helper for sync commands (git add / commit)
const runSync = cmd => {
  return new Promise((resolve, reject) => {
    exec(cmd, (err, stdout, stderr) => {
      if (err) {
        console.log(stderr || err.message);
        reject(err);
      } else {
        resolve(stdout);
      }
    });
  });
};

(async () => {
  console.log(chalk.yellow('\n🚀 All Files moved to Staging area...'));
  console.log(chalk.yellow('\n🚀 Running pre-commit checks...\n'));

  try {
    // ✅ stage initial changes
    await runSync('git add .');

    // ✅ run checks (with animation)
    await runTask('yarn code-check', 'Code checking');
    await runTask('yarn lint', 'Linting');
    await runTask('yarn format', 'Formatting');

    // ✅ re-stage formatted changes
    await runSync('git add .');

    // ✅ get commit message
    const commitMsg = process.argv.slice(2).join(' ');

    if (!commitMsg) {
      console.log(chalk.red('❌ Please provide a commit message'));
      process.exit(1);
    }

    // ✅ commit (no spinner, show output)
    await runSync(`git commit -m "${commitMsg}"`);

    console.log(chalk.green('\n🎉 Commit successful!\n'));
  } catch (err) {
    console.log(chalk.red('\n❌ Commit aborted\n'));
    process.exit(1);
  }
})();