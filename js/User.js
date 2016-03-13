var User = (function() {
	var $registerUsername = $('#registerForm #registerUsername'),
		$registerEmail = $('#registerForm #registerEmail'),
		$registerPassword = $('#registerForm #registerPassword'),
		$repeatPassword = $('#registerForm #repeatPassword'),
		$loginUsername = $('#loginForm #loginUsername'),
		$loginPassword = $('#loginForm #loginPassword');

	function User(cart) {
		var _firstName = '',
			_lastName = '',
			_email = '',
			_cart = [],
			_favourites = [];

		Person.call(this);

		this.getFirstName = function() {
			return _firstName;
		};

		this.setFirstName = function(firstName) {
			_firstName = firstName;
		};

		this.getLastName = function() {
			return _lastName;
		};

		this.setLastName = function(lastName) {
			_lastName = lastName;
		};

		this.getEmail = function() {
			return _email;
		};

		this.setEmail = function(email) {
			_email = email;
		};

		this.getCart = function() {
			return _cart;
		};

		this.setCart = function(cart) {
			_cart = cart;
		};

		this.getFavourites = function() {
			return _favourites;
		};

		this.setFavourites = function(favourites) {
			_favourites = favourites;
		};
	}

	function validateRegistration() {
		var msg = '';

		msg = validateField('Username', $registerUsername);
		Person.showMsg.call(this, $registerUsername, msg);
		
		msg = validateField('Email', $registerEmail);
		Person.showMsg.call(this, $registerEmail, msg);
		
		msg = validateField('Password', $registerPassword);
		Person.showMsg.call(this, $registerPassword, msg);
		
		if ($repeatPassword.val().length < 1){
			msg = 'Repeat password is required!';
		} else if ($repeatPassword.val() !== $registerPassword.val()){
			msg = 'Two passwords don\'t match!';
		} else {
			msg = '';
		}

		Person.showMsg.call(this, $repeatPassword, msg);
		
		if (!($('#registerForm .has-error').length)) {
			return true;
		}
	}

	function validateField(field, $dom) {
		var msg = '';

		if ($dom.val().length < 1){
			msg = field + ' is required!';
		} else if ($dom.val().length < 5){
			msg = field + ' must be at least 5 characters long!';
		} else if ($dom.val().length > 20){
			msg = field + ' cannot be longer than 20 characters!';
		}else {
			msg = '';
		}

		return msg;
	}

	User.prototype = Object.create(Person.prototype);
	User.constructor = User();

	User.prototype.login = function() {
		Person.prototype.login.call(this);
	};

	User.prototype.logout = function() {
		Person.prototype.logout.call(this);
	};

	User.prototype.register = function() {
		if (this.getIsLogged()) {
			alert('You are already logged in!');
			return;
		}

		if (!validateRegistration()) {
			return;
		}

		this.setUsername($registerUsername.val());
		this.setEmail($registerEmail.val());
		this.setPassword($registerPassword.val());

		data = {
			username: this.getUsername(),
			email: this.getEmail(),
			password: this.getPassword()
		};

		// $.ajax({
		// 	method: "POST",
		// 	url: "server.php",
		//	contentType: "application/JSON",
		// 	data: data,
		// 	success: function() {
				$('#register #registerForm').hide();
				$('#register #success').show();
			// }
		// });
	};

	return User;
}());

(function() {
	var user = new User();

	$('#registerBtn').on('click', function() {
		user.register();
	}).on('submit', function() {
		return false;
	});

	$('#loginBtn').on('click', function() {
		user.login();
	}).on('submit', function() {
		return false;
	});

	$('#logoutBtn').on('click', function() {
		user.logout();
	}).on('submit', function() {
		return false;
	});
}());