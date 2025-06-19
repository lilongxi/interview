/**
 * 利用闭包 收集参数的过程
 * @param {*} cb 
 * @returns 
 */
function curry(cb) {
 let target = []
 // 核心考点1
 const len = cb.length
 return function cc(...args) {
  // 核心考点二
  target = [
    ...target,
    ...args,
  ]
  // 核心考点三
  if (target.length < len) {
    return cc
  } else {
    return cb.apply(this, target.slice(0, len))
  }
 }
}

function add(a, b, c) {
    return a + b + c
}

const cadd = curry(add)
console.log(cadd(1)(2)(3))