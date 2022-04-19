// eslint-disable-next-line security/detect-child-process
const { spawn } = require('child_process');

const notifier = require('node-notifier');
const chalk = require('chalk');

const eleventyProcess = spawn('eleventy', ['--serve', '--port=9000'], {
  shell: true,
});

// eslint-disable-next-line no-console
const log = console.log;

eleventyProcess.stdout.on('data', (data) => {
  log(chalk.green(data));
});

const ERROR_TITLE = 'Eleventy Error';

eleventyProcess.stderr.on('data', (data) => {
  log(chalk.red(ERROR_TITLE));
  log(chalk.red(data.toString()));
  const message = data
    .toString()
    .replace('Problem writing Eleventy templates', '')
    .replace(': (more in DEBUG output)', '')
    .slice(0, 100)
    .trim();
  if (!message) {
    return;
  }
  if (message.toLowerCase().includes('benchmark')) {
    return;
  }
  notifier.notify({
    title: ERROR_TITLE,
    message,
  });
});

eleventyProcess.on('error', (error) => {
  if (!error.message) {
    return;
  }
  log(chalk.red(error.message));
  notifier.notify({
    title: ERROR_TITLE,
    message: error.message,
  });
});

eleventyProcess.on('close', (code) => {
  log(chalk.blue(`child process exited with code ${code}`));
});
