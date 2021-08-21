$("document").ready(function () {
    $.ajax({
        url: '/users/',
        type: "GET",
        success: function (data) {
            console.log(data)
            loadUsersTable(data);
        }
    })




    $('#user-form-modal').on('show.bs.modal', function (event) {
        let userId = $(event.relatedTarget).closest('tr').attr("id")
        $.ajax({
            url: `/users/user${userId}`,
            type: "GET",
            success: function (data) {
                console.log(data)
                loadUserModal(data);
            }
        })
        // var button = $(event.relatedTarget) // Button that triggered the modal
        // var recipient = button.data('whatever') // Extract info from data-* attributes
        // // If necessary, you could initiate an AJAX request here (and then do the updating in a callback).
        // // Update the modal's content. We'll use jQuery here, but you could use a data binding library or other methods instead.
        // var modal = $(this)
        // modal.find('.modal-title').text('New message to ' + recipient)
        // modal.find('.modal-body input').val(recipient)
    })
})




function loadUsersTable(userList) {
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