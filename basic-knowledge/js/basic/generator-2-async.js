function asyncGenerator(generatorFunc) {
    return function (...args) {
        const generator = generatorFunc(...args)
        const handle = function(result) {
            if (result.done) return Promise.resolve(result.value)
            return Promise.resolve(result.value)
            .then(v => handle(generator.next(v)))
            .catch(e => handle(generator.throw(e)))
        }
        return handle(generator.next())
    }
}
