var Cart = (function() {
	function Cart() {
		var _products = [];

		this.getProducts = function() {
			return _products;
		};
	}

	Cart.prototype.addProduct = function(product) {
		this.getProducts().push(product);
	};

	Cart.prototype.removeProduct = function(product) {
		
	};

	return Cart;
}());