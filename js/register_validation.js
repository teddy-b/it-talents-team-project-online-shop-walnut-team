
var registerUsername = document.getElementById("registerUsrename");
var registerEmail = document.getElementById("email");
var registerPassword = document.getElementById("registerPassword");
var registerRepeatPassword = document.getElementById("repeatPassword");
var p = document.getElementById("registerErrors");

function validateRegister() {
	
	
	if(registerUsername.value.length < 5){
		p.innerHTML += "Username must be at least 5 characters long!"
	} else {
		p.innerHTML = "";
	}
	
	if(registerEmail.value.length == 0){
		p.innerHTML += "</br>You must enter an email!"
	} else {
		p.innerHTML = "";
	}
	
	if(registerPassword.value.length < 6){
		p.innerHTML += "</br>Your password must be at least 6 characters long!"
	} else {
		p.innerHTML = "";

	}
	
	if(registerRepeatPassword.value === registerPassword.value){
		
	} else {
		p.innerHTML += "</br>Please enter the same password as above!"
	}

}