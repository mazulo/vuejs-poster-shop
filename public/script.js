var PRICE = 9.99;

new Vue({
    el: '#app',
    data: {
        total: 0,
        items: [],
        cart: [],
        search: '',
        lastSearch: '',
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
                    break;
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
        onSubmit: function() {
            this.$http.get(`/search/${this.search}`)
            .then(response => {
                this.lastSearch = this.search;
                this.items = response.data;
            })
        }
    },
    filters: {
        currency: function(price) {
            return `$${price.toFixed(2)}`;
        }
    }
});
