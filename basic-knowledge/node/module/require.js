
const _load = function(request, parent, isMain) {
    //  计算绝对路径
    var filename = Module._resolveFilename(request, parent);
    //  第一步：如果有缓存，取出缓存
    var cachedModule = Module._cache[filename];
    if (cachedModule) {
      return cachedModule.exports;
    }
    // 第二步：是否为内置模块
    if (NativeModule.exists(filename)) {
      return NativeModule.require(filename);
    }
    // 第三步：生成模块实例，存入缓存
    var module = new Module(filename, parent);
    Module._cache[filename] = module;
    // 第四步：加载模块
    try {
      module.load(filename);
      hadException = false;
    } finally {
      if (hadException) {
        delete Module._cache[filename];
      }
    }
    // 第五步：输出模块的exports属性
    return module.exports;
}