let sidebar = document.querySelector(".sidebar");
let closeBtn = document.querySelector("#btn");
let searchBtn = document.querySelector(".bx-search");
let homeSection= document.querySelector(".home-section");
let bloggerSection= document.querySelector(".blogger-section");
let articleSection= document.querySelector(".article-section");
let profileSection= document.querySelector(".profile-section");
closeBtn.addEventListener("click", ()=>{
  sidebar.classList.toggle("open");
  menuBtnChange();//calling the function(optional)
});

searchBtn.addEventListener("click", ()=>{ // Sidebar open when you click on the search iocn
  sidebar.classList.toggle("open");
  menuBtnChange(); //calling the function(optional)
});

// following are the code to change sidebar button(optional)
function menuBtnChange() {
 if(sidebar.classList.contains("open")){
   closeBtn.classList.replace("bx-menu", "bx-menu-alt-right");//replacing the iocns class
 }else {
   closeBtn.classList.replace("bx-menu-alt-right","bx-menu");//replacing the iocns class
 }
}

$("#home").click(function(){
  $("#home-section").show();
  $("#bloggers-section").hide();
  $("#articles-section").hide();
  // $("#statistics-section").hide();
  $("#profile-section").hide();
})

$("#bloggers").click(function(){
  $("#home-section").hide();
  $("#bloggers-section").show();
  $("#articles-section").hide();
  // $("#statistics-section").hide();
  $("#profile-section").hide();
})
$("#articles").click(function(){
  $("#home-section").hide();
  $("#bloggers-section").hide();
  $("#articles-section").show();
  // $("#statistics-section").hide();
  $("#profile-section").hide();
})
// $("#statistics").click(function(){
//   $("#home-section").hide();
//   $("#bloggers-section").hide();
//   $("#articles-section").hide();
//   $("#statistics-section").show();
//   $("#profile-section").hide();
// })

$("#profile").click(function(){
  $("#home-section").hide();
  $("#bloggers-section").hide();
  $("#articles-section").hide();
  // $("#statistics-section").hide();
  $("#profile-section").show();
})


$("#save-password").click(function(){


  $.ajax({
    type: 'PATCH',
    url: '/api/users',
    processData: false,
    contentType: 'application/json',
    data: JSON.stringify({
      oldPass:$("#old-password").val(),
      newPass:$("#new-password").val()
    }),
    
    /* success and error handling omitted for brevity */
    success: function(responseData){
      console.log(responseData)
     if (responseData==true){
         alert("Current Password incorrect")
         $("#old-password").val("");
         $("#new-password").val("");
     }else{
         alert("Password Changed Succesfully")
         $("#old-password").val("");
     }
  }
 });
})