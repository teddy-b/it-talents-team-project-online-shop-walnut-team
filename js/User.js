var User = (function() {
	var $registerUsername = $('#registerForm #registerUsername'),
		$registerEmail = $('#registerForm #registerEmail'),
		$registerPassword = $('#registerForm #registerPassword'),
		$repeatPassword = $('#registerForm #repeatPassword'),
		$loginUsername = $('#loginForm #loginUsername'),
		$loginPassword = $('#loginForm #loginPassword');

	function User(cart) {
		var _username = '',
			_firstName = '',
			_lastName = '',
			_email = '',
			_password = '',
			_cart = [],
			_favourites = [],
			_isLogged = false;

		this.getUsername = function() {
			return _username;
		};

		this.setUsername = function(username) {
			_username = username;
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

		this.getPassword = function() {
			return _password;
		};

		this.setPassword = function(password) {
			_password = password;
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

		this.getIsLogged = function() {
			return _isLogged;
		};

		this.setIsLogged = function(isLogged) {
			_isLogged = isLogged;
		};
	}

	function validateRegistration() {
		var msg = '';

		msg = validateField('Username', $registerUsername);
		ShowMsg($registerUsername, msg);
		
		msg = validateField('Email', $registerEmail);
		ShowMsg($registerEmail, msg);
		
		msg = validateField('Password', $registerPassword);
		ShowMsg($registerPassword, msg);
		
		if ($repeatPassword.val().length < 1){
			msg = 'Repeat password is required!';
		} else if ($repeatPassword.val() !== $registerPassword.val()){
			msg = 'Two passwords don\'t match!';
		} else {
			msg = '';
		}

		ShowMsg($repeatPassword, msg);
		
		if (!($('#registerForm .has-error').length)) {
			return true;
		}
	}

	function validateLogin() {
		var msg = '';

		msg = validateRequired('Username', $loginUsername);
		ShowMsg($loginUsername, msg);
		
		msg = validateRequired('Password', $loginPassword);
		ShowMsg($loginPassword, msg);
		
		if (!($('#loginForm .has-error').length)) {
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

	function ShowMsg(field, msg) {
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

	User.prototype.login = function() {
		if (this.getIsLogged()) {
			alert('You are already logged in!');
			return;
		}

		if (!validateLogin()) {
			return;
		}

		this.setUsername($registerUsername.val());
		this.setPassword($registerPassword.val());

		data = {
			username: this.getUsername(),
			password: this.getPassword()
		};

		// $.ajax({
		// 	method: "POST",
		// 	url: "server.php",
		//	contentType: "application/JSON",
		// 	data: data,
		// 	success: function() {
				$('#login-modal').modal('hide');
				$('#bs-example-navbar-collapse-1 #loggedout').hide();
				$('#bs-example-navbar-collapse-1 #loggedin').show();
				this.setIsLogged(true);
			// }
		// });
	};

	User.prototype.logout = function() {
		$('#bs-example-navbar-collapse-1 #loggedin').hide();
		$('#bs-example-navbar-collapse-1 #loggedout').show();
		this.setIsLogged(false);
	};

	return User;
}());