function updateArticle() {
    let snippet = tinymce.activeEditor.getContent({
        format: "text",
    }).substring(0, 200)
    snippet = snippet.split("\n");
    $("#snippet").val(snippet);

    $("#save-article").submit();
    // let data = new FormData();
    // data.append('title', $("#title").val())
    // data.append('category', $("#category").val())
    // data.append('mytext', $("#mytextarea").val())
    // data.append('snippet', $("#snippet").val())
    // if ($('#article-avatar')[0].files[0] != undefined)
    //     data.append('avatar', $('#article-avatar')[0].files[0])
   

    // $.ajax({
    //     url: `/article/update/${articleId}`,
    //     type: "POST",
    //     data: data,
    //     contentType: false, 
    //     processData: false,
    // });
}

// let article=JSON.parse($("#article").text());

// $.get(`${article.info.content}`, function (content) {
// tinymce.activeEditor.setContent("Hello World");
//   });