const chainPromises = (pipes, initialData) => pipes.reduce(
    (promise, pipe) => promise.then(pipe),
    Promise.resolve(initialData)
);

module.exports = chainPromises;
