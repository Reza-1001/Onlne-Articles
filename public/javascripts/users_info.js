$("document").ready(function () {
    $.ajax({
        url: '/api/users/',
        type: "GET",
        success: function (data) {
            console.log(data)
            loadUsersTable(data);
        }
    })
})




function loadUsersTable(userList) {
    userList.forEach(function (user) {
        $("tbody").append(`<tr id=${user._id}>
    <td class="align-middle">
        <div
            class="custom-control custom-control-inline custom-checkbox custom-control-nameless m-0 align-top">
            <input type="checkbox" class="custom-control-input" id="item-1">
            <label class="custom-control-label" for="item-1"></label>
        </div>
    </td>
    <td class="align-middle text-center">
        <img src="/images/avatar/${user.profileImage}" style="width: 35px; height: 35px; border-radius: 3px;"></div>
    </td>
    <td class="text-nowrap align-middle">${user.firstName+" "+user.lastName}</td>
    <td class="text-nowrap align-middle"><span>${user.createAt}</span></td>
    <td class="text-center align-middle"><i
            class="fa fa-fw text-secondary cursor-pointer fa-toggle-on"></i>
    </td>
    <td class="text-center align-middle">
        <div class="btn-group align-top">
            <button class="btn btn-sm btn-outline-secondary badge"
                type="button" data-toggle="modal"
                data-target="#user-form-modal">Edit</button>
            <button class="btn btn-sm btn-outline-secondary badge"
                type="button" onclick=deleteUser(this);><i class="fa fa-trash"></i></button>
        </div>
    </td>
 </tr>`)
    })
}


function deleteUser(el){
    let userId=$(el).closest('tr').attr("id");
    $.ajax({
        url: `/api/users/${userId}`,
        type: 'DELETE',
        success: function(result) {
            // Do something with the result
            console.log(result)
            window.location.reload();
        }
    });
} 