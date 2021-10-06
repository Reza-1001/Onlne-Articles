$("document").ready(function () {
	let userName = $("#user-name");
	let phoneNumber = $("#phone-number");
	let password1 = $("#passowrd1");
	let password2 = $("#passowrd2");
	let elements = [userName, phoneNumber];
	let numberPattern = /^[0-9]*$/;


	// remove whitespace in username and phone Number
	elements.forEach(element => {
		$(element).keydown(function () {
			// allowing only digits in phone Number
			if (element == phoneNumber) {
				if (!numberPattern.test(element.val())) {
					$(element).val($(element).val().slice(0, $(element).val().length - 1))
				}
			}
			if ($(element).val().charAt($(element).val().length - 1) == " ")
				$(element).val($(element).val().slice(0, $(element).val().length - 1))
		})
	})


	$("#submit-btn").on('click', function () {
		let validation = validateRegistrationInfo();
		if (validation == true) {
			$.ajax({
				method: 'POST',
				url: '/register',
				data: $(".data-form").serialize(),
				success: function (data) {
					let icon = "success";
					let msg = data.msg;
					if (data.error) {
						icon = "error";
						msg = data.error;
					}
					Swal.fire({
						icon: `${icon}`,
						title: 'Register',
						text: `${msg}`,
						timer: 1500
					})
					if (data.msg)
						window.location.href = "/login";
				},
				error: function (data) {
					Swal.fire(
						'Registration failed',
						'Please check youre information and try again',
						'failed'
					)
				}

			})
		}

	});

	$('#register-btn').click(function () {
		validateRegistrationInfo();
	})


})

const inputs = document.querySelectorAll(".input");

function addcl() {
	let parent = this.parentNode.parentNode;
	parent.classList.add("focus");
}

function remcl() {
	let parent = this.parentNode.parentNode;
	if (this.value == "") {
		parent.classList.remove("focus");

	}
}


inputs.forEach(input => {
	input.addEventListener("focus", addcl);
	input.addEventListener("blur", remcl);

});


// *****************************************************************************************************
//                                  VALIDATE INPUTS
// *****************************************************************************************************
function validateRegistrationInfo() {
	inputs.forEach(async el => {
		if ($(el).val().trim() == "") {
			await $(el).closest('.input-div').find("i").addClass("empty")
			$(el).closest('div').find('h5').css('color', '#f10303');
			Swal.fire(
				'Empty Fields',
				'Please Enter username and Password',
				'info'
			)
		}
	})
	if ($(password1).val() !== $(password2).val()) {
		Swal.fire(
			':(',
			'Password and confirm password does not match',
			'info'
		)
		return false
	}
	if ($(password1).val().length < 8) {
		Swal.fire(
			':(',
			'Password must be at least 8 characters long',
			'info'
		)
		return false
	}
	return true;
}


function showPass() {
	let password = $("#password1")[0];
	let value = password.value;
	if ($("#show-pass")[0].classList.contains("fa-eye-slash")) {
		password.type = "text";
		$("#show-pass").removeClass("fa-eye-slash")
		$("#show-pass").addClass("fa-eye")
	} else {
		password.type = "password";
		$("#show-pass").addClass("fa-eye-slash")
		$("#show-pass").removeClass("fa-eye")
	}
	password.value = value
}