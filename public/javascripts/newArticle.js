function ShowSnippet(){
  let snippet=tinymce.activeEditor.getContent({
    format: "text",
  }).substring(0,50)
  snippet=snippet.split("\n");
  console.log(snippet);
 $('#load').text(snippet);
}


function Load() {
  $.get("/1.html", function (content) {
    // if you have one tinyMCE box on the page:

    tinymce.activeEditor.setContent(content);

    console.log(
      tinymce.activeEditor.getContent({
        format: "text",
      })
    );
    // $("#load").text(
    //   tinymce.activeEditor.getContent({
    //     format: "text",
    //   })
    // );
  });
}

// function New(){
//     $.get('/new', function (res){

//     })
// }
