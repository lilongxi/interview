function pLimit(concurrency: number) {
    const queue: (() => void)[] = [];
    let activeCount = 0;
  
    const next = () => {
      if (queue.length === 0 || activeCount >= concurrency) return;
      const run = queue.shift();
      run?.();
    };
  
    const runTask = <T>(fn: () => Promise<T>): Promise<T> => {
      return new Promise<T>((resolve, reject) => {
        const task = () => {
          activeCount++;
          fn()
            .then(resolve)
            .catch(reject)
            .finally(() => {
              activeCount--;
              next();
            });
        };
  
        queue.push(task);
        next();
      });
    };
  
    return runTask;
  }
  