var Person = (function() {
	var $loginUsername = $('#loginForm #loginUsername'),
		$loginPassword = $('#loginForm #loginPassword');

	function Person() {
		var _username = '',
			_password = '',
			_isLogged = false;

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

		this.getIsLogged = function() {
			return _isLogged;
		};

		this.setIsLogged = function(isLogged) {
			_isLogged = isLogged;
		};
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

	Person.prototype.login = function() {
		if (this.getIsLogged()) {
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

	Person.prototype.logout = function() {
		$('#bs-example-navbar-collapse-1 #loggedin').hide();
		$('#bs-example-navbar-collapse-1 #loggedout').show();
		this.setIsLogged(false);
	};

	return Person;
}());