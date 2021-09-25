$("document").ready(function () {
	$("#forget-pass").on('click', () => {
		alert(1)
		$("#reset-password-modal").modal();
	})

	$("#submit-btn").on('click', function () {
		let emptyField = false
		inputs.forEach(el => {
			if ($(el).val().trim() == "") {
				emptyField = true;
				$(el).closest('.input-div').find("i").addClass("empty")
				$(el).closest('div').find('h5').css('color', '#f10303');
				Swal.fire(
					'Empty Fields',
					'Please Enter username and Password',
					'info'
				)
			}
		})
		if (!emptyField)
			$.ajax({
				method: 'POST',
				url: '/login',
				data: $("#login-form").serialize(),
				success: function (data) {
					let icon = "success";
					let msg = data.msg;
					if (data.error) {
						icon = "error";
						msg = data.error;
					}
					Swal.fire({
						icon: `${icon}`,
						title: 'Login',
						text: `${msg}`,
						timer:1500
					})
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
	});
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