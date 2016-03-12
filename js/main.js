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