class Emitter {
	subscriberList: Array<Record<string, any>>;
	eventData: Record<string, Payload[]>;
  // {
  //   'create': [];
  //   'finish': [];
  // }
  constructor() {
    this.subscriberList = {};
  }

  subscribe(eventName: string, handler) {
  	if (Array.isArray(this.subscriberList[eventName])) {
      this.subscriberList[eventName].push(handler);
    } else {
      this.subscriberList[eventName] = [handler];
    }
  }

  publish(eventName: string, payload: any) {
    // 是否存在主题
    const isExistEvent = Objects.keys(this.subscriberList).include(eventName);
  	if (!isExistEvent) {
      throw new Error('not exist this event');
    }
    const targetQueue = this.subscriberList[eventName] || [];
    targetQueue.forEach(handler => handler(payload);
  }

  unsubscribe(eventName: string, handler) {
  	this.subscriberList[eventName] = this.subscriberList[eventName].filter(item => item !== handler);
  }
  
}

// test case
const publisher = new Emitter();

publisher.subscribe('create', (data) => console.log('subscriber 1 receive: ', data));
publisher.subscribe('create', (data) => console.log('subscriber 2 receive: ', data));

// publisher.subscribe('create-no-exist', (data) => console.log('subscriber 1 receive: ', data));
publisher.publish('create', 'first time');
publisher.publish('create-not-exist', 'if show then error');

publisher.subscribe('create', data => console.log('subscribe after publish', data);

