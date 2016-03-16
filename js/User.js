var User = (function() {
	var $registerUsername = $('#registerForm #registerUsername'),
		$registerEmail = $('#registerForm #registerEmail'),
		$registerPassword = $('#registerForm #registerPassword'),
		$repeatPassword = $('#registerForm #repeatPassword'),
		$loginUsername = $('#loginForm #loginUsername'),
		$loginPassword = $('#loginForm #loginPassword');

	function User() {
		var _username = localStorage.getItem('wlnt-username') || '',
			_password = '',
			_firstName = '',
			_lastName = '',
			_email = '',
			_cart = [],
			_favourites = [];

		this.getUsername = function() {
			return _username;
		};

		this.setUsername = function(username) {
			_username = username;
		};

		this.getPassword = function() {
			return _password;
		};

		this.setPassword = function(password) {
			_password = password;
		};

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
		showMsg($registerUsername, msg);
		
		msg = validateField('Email', $registerEmail);
		showMsg($registerEmail, msg);
		
		msg = validateField('Password', $registerPassword);
		showMsg($registerPassword, msg);
		
		if ($repeatPassword.val().length < 1){
			msg = 'Repeat password is required!';
		} else if ($repeatPassword.val() !== $registerPassword.val()){
			msg = 'Two passwords don\'t match!';
		} else {
			msg = '';
		}

		showMsg($repeatPassword, msg);
		
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

	function validateLogin() {
		var msg = '';

		msg = validateRequired('Username', $loginUsername);
		showMsg($loginUsername, msg);
		
		msg = validateRequired('Password', $loginPassword);
		showMsg($loginPassword, msg);
		
		if (!($('#loginForm .has-error').length)) {
			return true;
		}
	}

	function validateRequired(field, $dom) {
		var msg = '';

		if ($dom.val().length < 1){
			msg = field + ' is required!';
		} else if ($dom.val().length > 20){
			msg = field + ' is too long!';
		}else {
			msg = '';
		}

		return msg;
	}

	function showMsg(field, msg) {
		if (msg && field.siblings('.help-block').length) {
			field.siblings('.help-block').html(msg);
		} else 
		if (msg) {
			field.parent()
				.addClass('has-error')
				.addClass('has-feedback');

			$('<span />')
				.addClass('glyphicon')
				.addClass('glyphicon-remove')
				.addClass('form-control-feedback')
				.appendTo(field.parent());

			$('<span />').addClass('help-block')
				.html(msg)
				.appendTo(field.parent());
		} else {
			field.parent()
				.removeClass('has-error')
				.addClass('has-success')
				.addClass('has-feedback');

			field.siblings('.help-block').remove();

			if (field.siblings('.glyphicon-remove').length) {
				field.siblings('.glyphicon-remove')
					.removeClass('glyphicon-remove')
					.addClass('glyphicon-ok');
			} else {
				$('<span />')
					.addClass('glyphicon')
					.addClass('glyphicon-ok')
					.addClass('form-control-feedback')
					.appendTo(field.parent());
			}
		}
	}

	User.prototype.register = function() {
		if (localStorage.getItem('wlnt-username')) {
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
		// 	url: 'server.php',
		// 	method: 'POST',
		//	contentType: 'application/json',
		// 	data: JSON.stringify(data),
		// 	success: function() {
				$('#register #registerForm').hide();
				$('#register #success').show();
				$('#registerForm')[0].reset();
			// }
		// });
	};

	User.prototype.login = function() {
		if (localStorage.getItem('wlnt-username')) {
			alert('You are already logged in!');
			return;
		}

		if (!validateLogin()) {
			return;
		}

		this.setUsername($loginUsername.val());
		this.setPassword($loginPassword.val());

		data = {
			username: this.getUsername(),
			password: this.getPassword()
		};

		// $.ajax({
		// 	url: 'server.php',
		// 	method: 'PUT',
		//	contentType: 'application/json',
		// 	data: JSON.stringify(data),
		// 	success: function() {
				$('#login-modal').modal('hide');
				$('#bs-example-navbar-collapse-1 #loggedout').hide();
				$('#bs-example-navbar-collapse-1 #loggedin').show();

				$('#loginForm')[0].reset();

				localStorage.setItem('wlnt-username', this.getUsername());
			// }
		// });
	};

	User.prototype.logout = function() {
		$('#bs-example-navbar-collapse-1 #loggedin').hide();
		$('#bs-example-navbar-collapse-1 #loggedout').show();

		this.setUsername('');
		this.setPassword('');

		localStorage.removeItem('wlnt-username');
	};

	User.prototype.addFavourite = function(favourite) {
		this.getFavourites().push(favourite);
	};

	return User;
}());

(function() {
	var user = new User();

	if (localStorage.getItem('wlnt-username')) {
		$('#bs-example-navbar-collapse-1 #loggedout').hide();
		$('#bs-example-navbar-collapse-1 #loggedin').show();
	} else {
		$('#bs-example-navbar-collapse-1 #loggedout').show();
		$('#bs-example-navbar-collapse-1 #loggedin').hide();
	}

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