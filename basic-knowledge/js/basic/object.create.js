/**
 * 实现一个 Object.create
 * 本质是一种原型式继承
 */

function objectCreate(object) {
   function factroy() {}
   factroy.prototype = object
   return new factroy()
}
