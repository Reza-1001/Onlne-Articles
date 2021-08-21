$("document").ready(function () {
    $.ajax({
        url: '/users/',
        type: "GET",
        success: function (data) {
            console.log(data)
            loadUsersTable(data);
        }
    })


    $("#search-button").on('click', function () {
        let searchValue=$("#search-value").val();
        $.ajax({
            url: `/users?search=${searchValue}`,
            type: "GET",
            success: function (data) {
                console.log(data)
                loadUsersTable(data);
            }
        })
    })
})




function loadUsersTable(userList) {
    $("tbody").html("");
    userList.forEach(function (user, i) {
        $("tbody").append(`<tr id=${user._id}>
    <td class="align-middle">
       ${i+1}
    </td>
    <td class="align-middle">
        <img src="/images/avatar/${user.profileImage}" style="width: 35px; height: 35px; border-radius: 3px;"></div>
        ${user.firstName+" "+user.lastName}</td>
    <td class="text-nowrap align-middle"><span>${user.createAt}</span></td>
    <td class="text-center align-middle">Active</td>
    <td class="text-center align-middle">
        <div class="btn-group align-top">
            <button class="btn btn-sm btn-outline-secondary badge" type="button">Reset Pass</button>
            <button class="btn btn-sm btn-outline-secondary badge"
                type="button" onclick=deleteUser(this);><i class="fa fa-trash"></i></button>
        </div>
    </td>
 </tr>`)
    })
}


function deleteUser(el) {
    let userId = $(el).closest('tr').attr("id");
    $.ajax({
        url: `/users/${userId}`,
        type: 'DELETE',
        success: function (result) {
            // Do something with the result
            console.log(result)
            window.location.reload();
        }
    });
}