Vue.component('heading', {
    render: function(createElement) {
        return createElement(
            'h' + this.level,
            [
                createElement('a', {
                    attrs: {
                        name: 'headerId',
                        href: ''
                    }
                }, 'this is a tag')
            ]
        )
    }
})