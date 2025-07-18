// Inspired by https://github.com/firebase/genkit/blob/main/examples/nextjs/dev-server.js
const { spawn } = require('child_process');

const next = spawn(
  'npm',
  ['run', 'next', 'dev', '--', '--port', '9002', '--hostname', '0.0.0.0'],
  {
    stdio: 'inherit',
  }
);
const genkit = spawn(
  'npm',
  ['run', 'genkit:watch', '--', '--port', '4001', '--attach', `${next.pid}`],
  {
    stdio: 'inherit',
  }
);

process.on('SIGINT', () => {
  next.kill('SIGINT');
  genkit.kill('SIGINT');
});
