// Función para cargar comentarios desde Local Storage
function loadComments() {
    const commentsDisplay = document.getElementById('commentsDisplay');
    const comments = JSON.parse(localStorage.getItem('comments')) || [];
    comments.forEach(comment => {
        const newComment = document.createElement('div');
        newComment.classList.add('comment');
        newComment.textContent = comment;
        commentsDisplay.appendChild(newComment);
    });
}
// Cargar comentarios al iniciar
loadComments();
document.getElementById('moreInfoBtn').addEventListener('click', function() {
    const moreInfo = document.getElementById('moreInfo');
    moreInfo.classList.toggle('hidden');
});
document.getElementById('submitCommentBtn').addEventListener('click', function() {
    const commentInput = document.getElementById('commentInput');
    const commentsDisplay = document.getElementById('commentsDisplay');
    if (commentInput.value.trim() !== "") {
        const newComment = document.createElement('div');
        newComment.classList.add('comment');
        newComment.textContent = commentInput.value;
        commentsDisplay.appendChild(newComment);
        // Guardar el comentario en Local Storage
        const comments = JSON.parse(localStorage.getItem('comments')) || [];
        comments.push(commentInput.value);
        localStorage.setItem('comments', JSON.stringify(comments));
        commentInput.value = ""; // Limpiar el campo de texto
    } else {
        alert("Por favor, escribe un comentario antes de enviar.");
    }
});