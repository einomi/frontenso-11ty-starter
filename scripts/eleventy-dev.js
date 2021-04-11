// eslint-disable-next-line security/detect-child-process
const { spawn } = require('child_process');

const notifier = require('node-notifier');
const chalk = require('chalk');

const eleventyProcess = spawn('eleventy', ['--serve', '--port=9000']);

// eslint-disable-next-line no-console
const log = console.log;

eleventyProcess.stdout.on('data', (data) => {
  log(chalk.green(data));
});

eleventyProcess.stderr.on('data', (data) => {
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
  notifier.notify({
    title: 'Eleventy Error',
    message: message.trim(),
  });
});

eleventyProcess.on('error', (error) => {
  chalk.red(error);
  notifier.notify({
    title: 'Eleventy error',
    message: error.message,
  });
});

eleventyProcess.on('close', (code) => {
  log(chalk.blue(`child process exited with code ${code}`));
});
