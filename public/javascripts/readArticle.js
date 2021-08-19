$('document').ready(function () {
    let articleId = $("#article-id").text();
    $.ajax({
        type: "GET",
        url: `/api/comment/${articleId}`,
        success: function (response) {
            console.log(response);
            loadComments(response);
        }
    })
})



function loadComments(response) {
    $(".be-comment-block").append(`<h1 class="comments-title">Comments (${response.length})</h1>`)
    if (response.length >= 1) {
        response.forEach(comment => {
          
            $(".be-comment-block").append(`<div class="be-comment">
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
        </div>
    </div>`)
        })
    }
}

function submitComment() {
    var session = '<%=Session["user"] != null%>';
    if ($("#writer-id").text() == "") {
        alert("Your Session has expired");
    }else{
    let commentData = {
        content: $("#comment-text").val(),
        writer_id: $("#writer-id").text(),
        article_id: $("#article-id").text()
    }
    
    $.ajax({
        type: "POST",
        url: "/api/comment",
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