const moreButton = document.querySelectorAll('.more');

for (let i = 0; i < moreButton.length; i++) {
  moreButton[i].addEventListener('click', () => {
    moreButton[i].children[1].classList.toggle('d-none');
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