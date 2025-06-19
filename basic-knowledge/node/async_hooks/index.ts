import { AsyncResource } from 'async_hooks';

/**
 * asyncId: 唯一标识当前异步资源 
 * triggerAsyncId: 表示是谁创建了这个资源
 * async_hooks 的区别在于隐私自动监听所有的异步资源
 * AsyncResource 需要通过 runInAsyncScope 方法来执行
 * create(asyncId, type, triggerAsyncId, resource)
   before(asyncId)
   after(asyncId)
   destroy(asyncId)
 */

const async_hooks = require('async_hooks');

const store = new Map();

async_hooks.createHook({
  init(asyncId, type, triggerAsyncId, resource) {
    console.log('init', { asyncId, type, triggerAsyncId, resource });
  },
  before(asyncId) {
    console.log('before', { asyncId });
  },
  after(asyncId) {
    console.log('after', { asyncId });
  },
  destroy(asyncId) {
    console.log('destroy', { asyncId });
  },
  promiseResolve(asyncId) {
    console.log('promiseResolve', { asyncId });
  }
}).enable();

module.exports = {
    setContext(context) {
        store.set(async_hooks.executionAsyncId(), context);
    },
    getContext() {
        return store.get(async_hooks.executionAsyncId());
    }
};

class MyAsyncResource extends AsyncResource {
  constructor() {
    super('MyAsyncResource');
  }
}
const resource = new MyAsyncResource();