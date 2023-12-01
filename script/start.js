const cp = require('child_process');
const utils = require('./lib/utils');
const electronPath = utils.getAbsoluteElectronExec();

const child = cp.spawn(electronPath, process.argv.slice(2), { stdio: 'inherit' });
child.on('close', (code) => process.exit(code));

const handleTerminationSignal = (signal) =>
  process.on(signal, () => {
    child.kill(signal);
  });

handleTerminationSignal('SIGINT');
handleTerminationSignal('SIGTERM');
