document.getElementById('moreInfoBtn').addEventListener('click', function() {
    const moreInfo = document.getElementById('moreInfo');
    moreInfo.classList.toggle('hidden');
});
document.getElementById('submitCommentBtn').addEventListener('click', function() {
    const commentInput = document.getElementById('commentInput');
    const commentDisplay = document.getElementById('commentsDisplay');
    if (commentInput.value.trim() !== "") {
        const newComment = document.createElement('div');
        newComment.classList.add('comment');
        newComment.textContent = commentInput.value;
        commentDisplay.appendChild(newComment);
        commentInput.value = ""; // Limpiar el campo de texto
    } else {
        alert("Por favor, escribe un comentario antes de enviar.");
    }
});