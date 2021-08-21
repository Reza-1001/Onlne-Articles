let sidebar = document.querySelector(".sidebar");
let closeBtn = document.querySelector("#btn");
let homeSection = document.querySelector(".home-section");
let bloggerSection = document.querySelector(".blogger-section");
let articleSection = document.querySelector(".article-section");
let profileSection = document.querySelector(".profile-section");
closeBtn.addEventListener("click", () => {
  sidebar.classList.toggle("open");
  menuBtnChange(); //calling the function(optional)
});




// following are the code to change sidebar button(optional)
function menuBtnChange() {
  if (sidebar.classList.contains("open")) {
    closeBtn.classList.replace("bx-menu", "bx-menu-alt-right"); //replacing the iocns class
  } else {
    closeBtn.classList.replace("bx-menu-alt-right", "bx-menu"); //replacing the iocns class
  }
}


// $("#home").click(function () {
//   $("#home-section").show();
//   $("#bloggers-section").hide();
//   $("#articles-section").hide();
//   // $("#statistics-section").hide();
//   $("#profile-section").hide();
// })

// $("#bloggers").click(function () {
//   $("#home-section").hide();
//   $("#bloggers-section").show();
//   $("#articles-section").hide();
//   // $("#statistics-section").hide();
//   $("#profile-section").hide();
// })
$("#articles").click(function () {
  $("#article-submenu").toggle();

//   $("#home-section").hide();
//   $("#bloggers-section").hide();
//   $("#articles-section").show();
//   // $("#statistics-section").hide();
//   $("#profile-section").hide();
})
// // $("#statistics").click(function(){
// //   $("#home-section").hide();
// //   $("#bloggers-section").hide();
// //   $("#articles-section").hide();
// //   $("#statistics-section").show();
// //   $("#profile-section").hide();
// // })

// $("#profile").click(function () {
//   $("#home-section").hide();
//   $("#bloggers-section").hide();
//   $("#articles-section").hide();
//   // $("#statistics-section").hide();
//   $("#profile-section").show();
// })


$("#save-password").click(function () {


  $.ajax({
    type: 'PATCH',
    url: '/users',
    processData: false,
    contentType: 'application/json',
    data: JSON.stringify({
      oldPass: $("#old-password").val(),
      newPass: $("#new-password").val()
    }),

    /* success and error handling omitted for brevity */
    success: function (responseData) {
      console.log(responseData)
      if (responseData == true) {
        alert("Password Changed Succesfully")
        $("#old-password").val("");
        $("#new-password").val("");
      } else {
        alert("Current Password incorrect")
        $("#old-password").val("");
      }
    }
  });
})


function readURL(input) {
  if (input.files && input.files[0]) {
    var reader = new FileReader();

    reader.onload = function (e) {
      $('#profile-avatar')
        .attr('src', e.target.result);
    };

    reader.readAsDataURL(input.files[0]);

    // $.ajax({
    //   type: "POST",
    //   dataType: 'text',
    //   url: "/users/avatar",
    //   cache: false,
    //   data: image,
    //   processData: false,
    //   contentType: false,
    //   success: function (data) {
    //     alert(data); // show response from the php script.
    //   }
    // });
    // return false; // avoid to execute the actual submit of the form.


    // $.post('/users/avatar', $('##profile-upload-form').serialize())
  var image = new FormData();
        image.append("avatar", $('#file-input')[0].files[0]);
        $.ajax({
            url: '/users/avatar',
            type: 'POST',
            data: image,
            contentType: false, 
            processData: false,
            success: function (status) {
                // Swal.fire({
                //         position: 'top-end',
                //         icon: 'success',
                //         title: 'Change Avatar was successfully',
                //         showConfirmButton: false,
                //         timer: 1500
                //     })
                window.location.reload();
            },
            error: function (err) {
                //  Swal.fire({
                //         position: 'top-end',
                //         icon: 'error',
                //         title: `you can not change Avatar`,
                //         showConfirmButton: false,
                //         timer: 1500
                //     })
                window.location.reload();
            }
        });
    
    // $("#profile-upload-form").submit();
  }
}

function DeleteAvatar(){
  $.ajax({
    url: '/users/avatar',
    type: 'DELETE',
    success: function(result) {
        // Do something with the result
        window.location.reload();
    }
});
}