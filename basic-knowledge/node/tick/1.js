function test() { 
    console.log('======>')
    process.nextTick(() => test());
}

test()