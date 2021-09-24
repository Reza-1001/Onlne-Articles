$("document").ready(function () {
	$("#forget-pass").on('click', () => {
		alert(1)
		$("#reset-password-modal").modal();
	})

	$(".login-form").on('submit', function (e) {
		
		if ($('#user-name').val() == "") {
			emptyFiledsAlert($('#user-name'));
			e.preventDefault();
		}
		if ($('#password').val() == "") {
			emptyFiledsAlert($('#password'));
			e.preventDefault();
		}
		
		
		
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
	$("#user-name").on("click", function () {
		$(input).removeClass("empty")
	})
});


function emptyFiledsAlert(el) {
	el.closest('.input-div').find("i").addClass("empty")
	el.closest('div').find('h5').css('color', '#f10303');
	Swal.fire(
		'Empty Fields',
		'Please Enter username and Password',
		'info'
	)
}