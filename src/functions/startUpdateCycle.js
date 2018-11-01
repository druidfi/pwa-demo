export const startUpdateCycle = (seconds, callback) => {
  let timeout = cycle(seconds, update => {
    timeout = update;

    callback();
  });

  return () => clearTimeout(timeout);
};

const cycle = (seconds, callback) => {
  return setTimeout(() => {
    const timeout = cycle(seconds, callback);

    callback(timeout);
  }, 1000 * seconds);
};
