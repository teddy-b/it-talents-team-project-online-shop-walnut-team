var Admin = (function() {
	var $loginUsername = $('#loginForm #loginUsername'),
		$loginPassword = $('#loginForm #loginPassword');

	function Admin() {
		var _username = localStorage.getItem('wlnt-admin-username') || '',
			_password = '';

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

	Admin.prototype.login = function() {
		if (this.getUsername()) {
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

				localStorage.setItem('wlnt-admin-username', this.getUsername());
			// }
		// });
	};

	Admin.prototype.logout = function() {
		$('#bs-example-navbar-collapse-1 #loggedin').hide();
		$('#bs-example-navbar-collapse-1 #loggedout').show();

		this.setUsername('');
		this.setPassword('');

		localStorage.removeItem('wlnt-admin-username');
	};

	return Admin;
}());

(function() {
	var admin = new Admin();

	if (localStorage.getItem('wlnt-admin-username')) {
		$('#bs-example-navbar-collapse-1 #loggedout').hide();
		$('#bs-example-navbar-collapse-1 #loggedin').show();
	} else {
		$('#bs-example-navbar-collapse-1 #loggedout').show();
		$('#bs-example-navbar-collapse-1 #loggedin').hide();
	}

	$('#loginAdminBtn').on('click', function() {
		admin.login();
	}).on('submit', function() {
		return false;
	});

	$('#logoutAdminBtn').on('click', function() {
		admin.logout();
	}).on('submit', function() {
		return false;
	});
}());