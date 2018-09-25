function submitEmail() {
	//Get email from form
	var email = document.getElementById("emailInput").value;

	if(email.match(/.+\@.+\..+/g) != null) {
		//Hide warning div
		$('#emailWarning').attr("hidden", true);

		//Send it to the login server to verify login
		var urlstring = "https://us-central1-ucsb-ieee.cloudfunctions.net/addToEmailList?email=" + email;

		var settings = {
		  "async": true,
		  "crossDomain": true,
		  "url": urlstring,
		  "method": "GET"
		}

		$.ajax(settings).done(function (response) {
			console.log(response);
		  if(response.success == true) { //valid
		  	$('#myModal').modal('show');

		  	document.getElementById("modalEmail").innerHTML = "Email: " + response.email;
		  	document.getElementById("emailInput").value = "";

		  	setTimeout(function() {
		  		$('#myModal').modal('hide');
        },5000);
		  }
		});
	}
	else {
		//Show warning div
		$('#emailWarning').removeAttr("hidden");
	}
}

function appendDomain(domain) {
	//Get email from form
	var email = document.getElementById("emailInput").value;

	//Get part before @ symbol
	var emailPrefix = email.substr(0, email.indexOf('@')); 

	if(emailPrefix == "") {
		//There was no @ symbol, just append the email domain
		var newEmail = email + "@" + domain;
	}
	else {
		//There was an @ symbol, append email domain to emailPrefix
		var newEmail = emailPrefix + "@" + domain;
		
	}
	document.getElementById("emailInput").value = newEmail;
}