var Admin = (function() {
	var $loginUsername = $('#loginForm #loginUsername'),
		$loginPassword = $('#loginForm #loginPassword');

	function Admin() {
		Person.call(this);
	}

	Admin.prototype = Object.create(Person.prototype);
	Admin.constructor = Admin();

	Admin.prototype.login = function() {
		Person.prototype.login.call(this);
	};

	Admin.prototype.logout = function() {
		Person.prototype.logout.call(this);
	};

	return Admin;
}());

(function() {
	var admin = new Admin();

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