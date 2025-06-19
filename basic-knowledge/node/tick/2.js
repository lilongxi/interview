function test() { 
    console.log('=====<<<<')
    setTimeout(() => test(), 0);
  }

  test()