$('document').ready(function () {

    // get article ID
    let articleId = $("#article-id").text();

    // perform a request to get Articles All comments
    $.ajax({
        type: "GET",
        url: `/comment/${articleId}`,
        success: function (response) {
            // send response data to function
            loadComments(response);
        }
    })
})


// Load Comments
function loadComments(response) {
    // add comments number to comment section
    $(".be-comment-block").append(`<h1 class="comments-title">Comments (${response.comments.length})</h1>`)
    // check if article has comment
    if (response.comments.length >= 1) {
        response.comments.forEach(comment => {

            $(".be-comment-block").append(`<div class="be-comment mb-3">
        <div class="be-img-comment">
        
            <a href="blog-detail-2.html">
                <img src="/images/avatar/${comment.writer_id.profileImage}" alt="" class="be-ava-comment">
            </a>
        </div>
        <div class="be-comment-content">

            <span class="be-comment-name">
                <a href="blog-detail-2.html">${comment.writer_id.firstName + " " + comment.writer_id.lastName}</a>
            </span>
            <span class="be-comment-time">
                <i class="fa fa-clock-o"></i>
                ${comment.createdAt}
            </span>
            <p class="be-comment-text">
            ${comment.content}
            
            </p>
            ${(()=>{
                // if user is Admin Enable delete comment Button
                if (response.userRole=="Admin"){
                    return `<div class="d-flex justify-content-end">
                    <a id=${comment._id} class="btn btn-primary pull-right" onclick="deleteComment(this);">Delete Comment</a></div>`}else{return ""}
            })()}
        </div>
    </div>`)
        })
    }
}

function submitComment() {
    var session = '<%=Session["user"] != null%>';
    if ($("#writer-id").text() == "") {
        alert("Your Session has expired");
    } else {
        let commentData = {
            content: $("#comment-text").val(),
            writer_id: $("#writer-id").text(),
            article_id: $("#article-id").text()
        }

        $.ajax({
            type: "POST",
            url: "/comment",
            dataType: "json",
            contentType: "application/json",
            data: JSON.stringify(commentData),
            processData: false,
            success: function (data) {
                alet(data)
            },
            error: function (data) {
                alert(data)
            }
        });
    }
}

function deleteComment(el) {
    let commentId = $(el).attr('id');
    $.ajax({
        url: `/comment/${commentId}`,
        method: 'DELETE',
        success: function (data) {
            console.log(data)
        }
    })
}