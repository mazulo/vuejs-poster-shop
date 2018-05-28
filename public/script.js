var PRICE = 9.99;

new Vue({
    el: '#app',
    data: {
        total: 0,
        items: [],
        cart: [],
        search: '',
        lastSearch: '',
        loading: false,
        price: PRICE,
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
            this.items = [];
            this.loading = true;
            this.$http.get(`/search/${this.search}`)
            .then(response => {
                this.lastSearch = this.search;
                this.items = response.data;
                this.loading = false;
            })
        }
    },
    filters: {
        currency: function(price) {
            return `$${price.toFixed(2)}`;
        }
    },
    mounted: function() {
        this.search = 'anime';
        this.onSubmit();
    }
});
