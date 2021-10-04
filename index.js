const emailField = document.getElementById("emailInput");
const modalTitle = document.getElementById("modalTitle");
const modalBody = document.getElementById("modalBody");
const modalEmail = document.getElementById("modalEmail");

function submitEmail() {
    // Get email from form
    var email = emailField.value;

    if (email.match(/.+\@.+\..+/g) != null) {
        // Hide warning div
        $('#emailWarning').attr("hidden", true);

        // Show modal div, display waiting
        $('#loadingIcon').removeAttr("hidden");
        modalTitle.innerHTML = "Please Wait";
        modalBody.innerHTML = modalEmail.value = "";
        $('#myModal').modal('show');

        // Send email address to mailing list endpoint
        var urlstring = "https://nextjs.ucsbieee.org/api/mailing-list/add";

        var body = {
            email: email
        };

        var settings = {
            "async": true,
            "crossDomain": true,
            "url": urlstring,
            "method": "POST",
            "body": new URLSearchParams(body).toString()
        };

        $.ajax(settings).done(function (response) {
            console.log(response);
            if (response.success) {
                // Valid, show success screen
                $('#loadingIcon').attr("hidden", true);
                modalTitle.innerHTML = "Success!";
                modalBody.innerHTML = "Success! We will add you to the mailing list shortly!";
                modalEmail.innerHTML = "Email: " + response.email;
                emailField.value = "";

                setTimeout(function () {
                    $('#myModal').modal('hide');
                }, 5000);
            }
        });
    } else {
        // Show warning div
        $('#emailWarning').removeAttr("hidden");
    }
}

function appendDomain(domain) {
    // Get email from form
    var email = emailField.value;

    // Get part before @ symbol
    var emailPrefix = email.substr(0, email.indexOf('@'));

    if (emailPrefix == "") {
        // There was no @ symbol, just append the email domain
        var newEmail = email + "@" + domain;
    } else {
        // There was an @ symbol, append email domain to emailPrefix
        var newEmail = emailPrefix + "@" + domain;

    }
    emailField.value = newEmail;
}

function clearEmail() {
    emailField.value = "";
    emailField.focus();
}
