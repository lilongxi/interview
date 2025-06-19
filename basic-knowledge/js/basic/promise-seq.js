    console.log('a')

    async function async1() {
        // new Promise
        await async2()
        console.log('b') 
    }

    async function async2() {
      console.log('c') 
    }

    async1()

    setTimeout(function() { 
     console.log('d')
    }, 0)

    new Promise(resolve => {
        console.log('e')
        resolve()
    }).then(function() { 
        console.log('f')
    }).then(function() {
        console.log('g')
    })

    Reflect

    console.log('h')

    // a -> c -> e -> h -> b -> f -> g -> d

    class A {

        #event() {

        }

        a() {
            this.#event()
        }

    }