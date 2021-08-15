const moreButton = document.querySelectorAll('.more');

for (let i = 0; i < moreButton.length; i++) {
  moreButton[i].addEventListener('click', () => {
    moreButton[i].children[1].classList.toggle('d-none');
  });
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

  });
}

function saveArticle(){
  let snippet=tinymce.activeEditor.getContent({
    format: "text",
  }).substring(0,200)
  snippet=snippet.split("\n");
  alert(snippet)
$("#snippet").val(snippet);
$("#save-article").submit();
}