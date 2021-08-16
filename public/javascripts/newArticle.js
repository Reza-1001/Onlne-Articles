const moreButton = document.querySelectorAll('.more');

for (let i = 0; i < moreButton.length; i++) {
  moreButton[i].addEventListener('click', () => {
    moreButton[i].children[1].classList.toggle('d-none');
  });
}


function saveArticle() {
  alert(1)
  let snippet = tinymce.activeEditor.getContent({
    format: "text",
  }).substring(0, 200)
  snippet = snippet.split("\n");
  alert(snippet)
  $("#snippet").val(snippet);
  $("#save-article").submit();
}


function deleteArticle(el) {
  let articleId = el.id;
  $.ajax({
    url: `/api/article/${articleId}`,
    type: 'DELETE',
    success: function (result) {
      alert("Article Deleted");
      window.location.reload();
    }
  });
}