const { spawn } = require('child_process');
const path = require('path');

const chalk = require('chalk');
const notifier = require('node-notifier');

// Path to the project's root directory
const projectRoot = path.resolve(__dirname, '..');

// Start Eleventy with flags using npx
const eleventyProcess = spawn('npx', ['eleventy', '--serve', '--port=9000'], {
  cwd: projectRoot, // Set the working directory
  shell: true,
  env: { ...process.env, node_env: 'development' }, // Set environment variable
});

// Function to format error messages
const formatErrorMessage = (data) => {
  let message = data.toString();

  // Update error handling based on Eleventy 3.0.0's error format
  message = message.replace(/Problem writing Eleventy templates/, '');
  message = message.replace(/: \(more in DEBUG output\)/, '');
  message = message.slice(0, 200).trim(); // Increased character limit

  return message;
};

// Handle standard output
eleventyProcess.stdout.on('data', (data) => {
  console.info(chalk.green(`[Eleventy]: ${data.toString().trim()}`));
});

// Handle errors
eleventyProcess.stderr.on('data', (data) => {
  const message = formatErrorMessage(data);

  // If the message is empty, do nothing
  if (!message) {
    return;
  }

  // Convert message to lowercase for filtering
  const lowerMessage = message.toLowerCase();

  // Filter out deprecation warnings
  if (lowerMessage.includes('deprecated')) {
    console.warn(chalk.yellow(`[Eleventy Warning]: ${message}`));
    return;
  }

  // Filter out the standard server message (not an actual error)
  if (lowerMessage.includes('server at http://')) {
    // eslint-disable-next-line no-console
    console.log(chalk.green(`[Eleventy Info]: ${message}`));
    return;
  }

  // Ignore benchmark messages if needed
  if (lowerMessage.includes('benchmark')) {
    return;
  }

  // Treat all other messages as errors
  const ERROR_TITLE = 'Eleventy Error';
  console.error(chalk.red(`[${ERROR_TITLE}]: ${message}`));

  notifier.notify({
    title: ERROR_TITLE,
    message,
    sound: true,
    wait: false,
  });
});

// Handle process errors
eleventyProcess.on('error', (error) => {
  const ERROR_TITLE = 'Eleventy Process Error';

  if (!error.message) {
    return;
  }

  console.error(chalk.red(`[${ERROR_TITLE}]: ${error.message}`));

  notifier.notify({
    title: ERROR_TITLE,
    message: error.message,
    sound: true,
    wait: false,
  });
});

// Handle process closure
eleventyProcess.on('close', (code) => {
  console.info(chalk.blue(`Eleventy process exited with code ${code}`));

  // If the process exited with an error, send a notification
  if (code !== 0) {
    console.warn(
      chalk.yellow(`Eleventy exited with a non-zero exit code: ${code}`)
    );

    notifier.notify({
      title: 'Eleventy Process Closed',
      message: `Eleventy exited with code ${code}`,
      sound: true,
      wait: false,
    });
  }
});

// Handle termination signals (e.g., Ctrl+C)
process.on('SIGINT', () => {
  console.info(chalk.yellow('Terminating Eleventy process...'));
  eleventyProcess.kill('SIGINT');
  process.exit();
});
