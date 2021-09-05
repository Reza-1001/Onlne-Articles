$("document").ready(function(){
    let sidebar = document.querySelector(".sidebar");
    let closeBtn = document.querySelector("#btn");
    // let homeSection = document.querySelector(".home-section");
    // let bloggerSection = document.querySelector(".blogger-section");
    // let articleSection = document.querySelector(".article-section");
    // let profileSection = document.querySelector(".profile-section");
    closeBtn.addEventListener("click", () => {
      sidebar.classList.toggle("open");
      menuBtnChange(); //calling the function(optional)
    });
  
  
    $("#articles").click(function () {
      $("#article-submenu").toggle();
    })


      // following are the code to change sidebar button(optional)
  function menuBtnChange() {
    if (sidebar.classList.contains("open")) {
      $('.container').animate({
        marginLeft: '+=260px'
      }, 500)
      closeBtn.classList.replace("bx-menu", "bx-menu-alt-right"); //replacing the iocns class
    } else {
      $('.container').animate({
        marginLeft: '-=260px'
      }, 500)
      closeBtn.classList.replace("bx-menu-alt-right", "bx-menu"); //replacing the iocns class
    }
  }
})