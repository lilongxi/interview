// 'use strict'

globalThis.nameA = 'leelongxi'
ageA = 100

require('./b')
console.log(name, globalThis.age)

console.log(exports === module.exports)