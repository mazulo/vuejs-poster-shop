new Vue({
    el: '#app',
    data: {
        total: 0,
        items: [
            { title: "Title 1" },
            { title: "Title 2" },
            { title: "Title 3" },
        ],
        cart: [],
    },
    methods: {
        addItem: function(index) {
            this.total += 9.99;
            this.cart.push(this.items[index]);
        }
    }
});
