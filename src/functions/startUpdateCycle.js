export const startUpdateCycle = (seconds, callback) => {
  let timeout = setInterval(() => {
    callback();
  }, 1000 * seconds);

  return () => clearInterval(timeout);
};
