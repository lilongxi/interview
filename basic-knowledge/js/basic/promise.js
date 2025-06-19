const Fake = {
    all(promises) {
        return new Promise((resolve, reject) => {
            const result = []
            let index = 0
            promises.forEach((promise, idx) => {
                promise
                .then((v) => {
                    result[idx] = v
                    index++
                    if (index === promises.length) resolve(result)
                })
                .catch(reject)
            });
        })
    },
    race(promises) {
        return new Promise((resolve, reject) => {
            promises.forEach(promise => promise.then(resolve).catch(reject))
        })
    },
    finally(called) {
        const cacheThis = this.constructor || Promise.prototype.constructor
        return this.then(
            v => cacheThis.resolve(called()).then(() => v),
            reason => cacheThis.resolve(called()).then(() => {
                throw reason
            })
        )
    },
    allSettled(promises) {
        return new Promise((resolve) => {
            const result = []
            let index = 0
            promises.forEach((promise, idx) => {
                promise
                    .then(value => {
                        result[idx] = {
                            status: '',
                            value
                        }
                    })
                    .catch(error => {
                        result[idx] = {
                            status: '',
                            value: error
                        }
                    })
                    .finally(() => {
                        index++
                        if (index === promises.length) resolve(result)
                    })
            })
        })
    }
}