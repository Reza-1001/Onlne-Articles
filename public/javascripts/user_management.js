// send a request for get All users List
$("document").ready(function () {
    $.ajax({
        url: '/users/',
        type: "GET",
        success: function (data) {

            // send recieved data to a function for loadng users list table
            loadUsersTable(data);
        }
    })

    // perform a request with search keyword 
    $("#search-button").on('click', function () {
        let searchValue = $("#search-value").val();
        $.ajax({
            url: `/users?search=${searchValue}`,
            type: "GET",
            success: function (data) {

                // send recieved data to a function for loadng users list table
                loadUsersTable(data);
            }
        })
    })
})



// *****************************************************************************************************
//                                  LOAD USER'S DATA IN TABLE
// *****************************************************************************************************
function loadUsersTable(userList) {

    // empty table for loading new data
    $("tbody").html("");
    // create a table row for each user
    userList.forEach(function (user, i) {
        $("tbody").append(`<tr id=${user._id}>
    <td class="align-middle">
       ${i+1}
    </td>
    <td class="align-middle">
        <img src="/images/avatar/${user.profileImage}" style="width: 35px; height: 35px; border-radius: 50%;"></div>
        ${user.firstName+" "+user.lastName}</td>
    <td class="text-nowrap align-middle"><span>${user.createAt}</span></td>
    <td class="text-center align-middle">Active</td>
    <td class="text-center align-middle">
        <div class="btn-group align-top">
          
            <button class="btn btn-sm btn-outline-secondary badge"
                type="button" onclick=deleteUser(this);><i class="fa fa-trash"></i></button>
        </div>
    </td>
 </tr>`)
    })
}


// *****************************************************************************************************
//                                  DELETE A BLOGGER
// *****************************************************************************************************
function deleteUser(el) {
    // get user id for delete
    let userId = $(el).closest('tr').attr("id");
    // delete request with user Id 
    $.ajax({
        url: `/users/${userId}`,
        type: 'DELETE',
        success: function (result) {
            // Do something with the result

            window.location.reload();
        }
    });
}