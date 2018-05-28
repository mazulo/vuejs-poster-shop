var PRICE = 9.99;

new Vue({
    el: '#app',
    data: {
        total: 0,
        items: [
            { id: 1, title: "Title 1" },
            { id: 2, title: "Title 2" },
            { id: 3, title: "Title 3" },
        ],
        cart: [],
    },
    methods: {
        addItem: function(index) {
            this.total += PRICE;
            item = this.items[index];
            var found = false;
            for (var i = 0; i < this.cart.length; i++) {
                if (this.cart[i].id === item.id) {
                    found = true;
                    this.cart[i].qty++;
                }
            }
            if (!found) {
                this.cart.push({
                    id: item.id,
                    title: item.title,
                    qty: 1,
                    price: PRICE,
                })
            }
        },
        inc: function(item) {
            item.qty++;
            this.total += PRICE;
        },
        dec: function(item) {
            item.qty--;
            this.total -= PRICE;
            if (item.qty <= 0) {
                this.cart = this.cart.filter(i => i.id !== item.id);
            }
        },
    },
    filters: {
        currency: function(price) {
            return `$${price.toFixed(2)}`;
        }
    }
});
