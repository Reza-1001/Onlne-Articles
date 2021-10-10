$('document').ready(function () {



  firstRequest();
  secondRequest();

  
  
})



function firstRequest() {
  $.ajax({
    type: "GET",
    url: '/users/statistics',
    success: function (response) {
      console.log(response);
      // send response data to function
      loadUserStatistics(response);

    }
  })

}


function secondRequest() {
  $.ajax({
    type: "POST",
    url: '/article/statistics',
    success: function (response) {
      console.log(response);
      // send response data to function
      loadArticleStatistics(response);
    }
  })
}



function loadUserStatistics(response) {
  $('#all-users').text(response.allUsers)
  $('#new-users').text(response.newUsers)
  $('#user-list').html("");
  $('#user-requests-table tbody').html("");
  response.recentUsers.forEach(user => {
    $('#user-list').append(`<li>
      <img style="border-radius:50%;width:100px;height:100px" src="/images/avatar/${user.profileImage}" alt=${user.userName}>
      <a class="users-list-name" href="#">${user.firstName + " " + user.lastName}</a>
      <span class="users-list-date">${user.createAt.toLocalDate}</span>
      </li>`)
  })

  response.users.forEach(user => {
    $('#user-requests-table tbody').append(` <tr id=${user._id}>
    <td>${user.userName}</td>
    <td>${user.firstName+" "+user.lastName}</td>
    <td><button class="btn btn-sm btn-outline-secondary badge bg-warning" type="button"
            onclick="resetPassword(this);">Reset Pass</button></td>
</tr>`)
  })
}

function loadArticleStatistics(response) {
  $('#new-articles').text(response.newArticles)
  $('#all-articles').text(response.allArticles)
  response.recentArticles.forEach(article => {
    $('#article-list').append(`<li>
      <img style="border-radius:50%;width:100px;height:100px" src="/images/article/${article.avatar}" alt=${article.title}>
      <a class="users-list-name" href="/article/${article._id}">${article.title}</a>
      <span class="users-list-date">${article.writer.userName}</span>
      </li>`)
  })
}




// reset user password to a default value
function resetPassword(el) {
  var result = confirm("Reset Password?");
  if (result) {
    let userId = $(el).closest('tr').attr("id");
    $.ajax({
      url: `/users/reset_pass/${userId}`,
      type: 'GET',
      success: function (result) {
        console.log(result)
        // window.location.reload();
        firstRequest();
      }
    });
  }
}