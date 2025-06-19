Promise.resolve().then(() => console.log('2'))
process.nextTick(() => console.log('1'))

// 1 2