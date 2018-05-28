var PRICE = 9.99;
var SPLIT_EVERY = 10;

new Vue({
    el: '#app',
    data: {
        total: 0,
        items: [],
        results: [],
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
            if (this.search.length) {
                this.items = [];
                this.loading = true;
                this.$http.get(`/search/${this.search}`)
                .then(response => {
                    this.lastSearch = this.search;
                    this.results = response.data;
                    this.appendItems();
                    this.loading = false;
                })
            }
        },
        appendItems: function() {
            if (this.items.length < this.results.length) {
                var append = this.results.slice(this.items.length, this.items.length + SPLIT_EVERY);
                this.items = this.items.concat(append);
            }
        },
    },
    filters: {
        currency: function(price) {
            return `$${price.toFixed(2)}`;
        }
    },
    computed: {
        noMoreItems: function() {
            return this.items.length > 0 && this.items.length === this.results.length;
        },
    },
    mounted: function() {
        this.search = 'anime';
        this.onSubmit();

        var vueInstance = this;
        var elem = document.getElementById('product-list-bottom');
        var watcher = scrollMonitor.create(elem);
        watcher.enterViewport(function() {
            vueInstance.appendItems();
        });
    }
});
