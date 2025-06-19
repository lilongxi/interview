var fps_compatibility= function () {
    return (
        window.requestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        function (callback) {
            window.setTimeout(callback, 1000 / 60);
        }
    );
}();

var fps_config={
  lastFameTime : performance.now(),
  frame: 0
}

var fps_loop = function() {
    // 首帧 和 第二帧的差值
    var _first =  performance.now()
    fps_config.frame++;
    // 这个方法每秒钟会被调用很多次 但是 fps 需要一秒计算一次 所以 +1000
    if (_first > 1000 + fps_config.lastFameTime) {
        // 正常取 frame 参数即可 但是为了准确性 用frame的总次数除以时间来表示每秒帧数 frame * 1000 是因为时间是千分位
        var fps = Math.round(( fps_config.frame * 1000 ) / ( _first - fps_config.lastFameTime ));
        console.log(`time: ${new Date()} fps is：`, fps);
        // 计算完更新状态 准备下一次计算
        fps_config.frame = 0;    
        fps_config.lastFameTime = _first ;    
    };          
    fps_compatibility(fps_loop);   
}

fps_loop();

function isBlocking(fpsList, below=20, last=3) {
  var count = 0
  for(var i = 0; i < fpsList.length; i++) {
    if (fpsList[i] && fpsList[i] < below) {
      count++;
    } else {
      count = 0
    }
    if (count >= last) {
      return true
    }
  }
  return false
}
