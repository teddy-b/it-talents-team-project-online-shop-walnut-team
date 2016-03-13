var Product = (function() {
	function Product(id, category, brand, model, image, price, promoPrice, specifications) {
		var _id = id,
			_category = category,
			_brand = brand,
			_model = model,
			_image = image,
			_price = price,
			_promoPrice = promoPrice,
			_specifications = specifications;

		this.getId = function() {
			return _id;
		};

		this.setId = function(id) {
			_id = id;
		};
		
		this.getCategory = function() {
			return _category;
		};

		this.setCategory = function(category) {
			_category = category;
		};

		this.getBrand = function() {
			return _brand;
		};

		this.setBrand = function(brand) {
			_brand = brand;
		};

		this.getModel = function() {
			return _model;
		};

		this.setModel = function(model) {
			_model = model;
		};

		this.getImage = function() {
			return _image;
		};

		this.setImage = function(image) {
			_image = image;
		};

		this.getPrice = function() {
			return _price;
		};

		this.setPrice = function(price) {
			_price = price;
		};

		this.getPromoPrice = function() {
			return _promoPrice;
		};

		this.setPromoPrice = function(promoPrice) {
			_promoPrice = promoPrice;
		};

		this.getSpecifications = function() {
			return _specifications;
		};

		this.setSpecifications = function(specifications) {
			_specifications = specifications;
		};
	}

	Product.prototype.addToCart = function(cart) {
		cart.addProduct(this);
	};

	Product.prototype.addToFavourites = function(favourites) {
		favourites.addProduct(this);
	};

	Product.prototype.showPage = function() {
		// $.ajax({
		// 	method: "GET",
		// 	url: "server.php",
		// 	contentType: "application/JSON",
		// 	data: this.getId(),
		// 	success: function(product) {
		// 		console.log(product);

				
		// 	}
		// });
	};

	return Product;
}());