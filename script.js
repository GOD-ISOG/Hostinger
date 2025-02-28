// Inicializa EmailJS
(function(){
    emailjs.init("TU_USER_ID"); // Reemplaza con tu User ID de EmailJS
})();
// Función para cargar comentarios desde Local Storage
function loadComments() {
    const commentsDisplay = document.getElementById('commentsDisplay');
    const comments = JSON.parse(localStorage.getItem('comments')) || [];
    comments.forEach(comment => {
        const newComment = document.createElement('div');
        newComment.classList.add('comment');
        newComment.innerHTML = `<strong>${comment.name}</strong>: ${comment.text}`;
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
    const nameInput = document.getElementById('nameInput');
    const phoneInput = document.getElementById('phoneInput');
    const emailInput = document.getElementById('emailInput');
    const commentInput = document.getElementById('commentInput');
    const commentsDisplay = document.getElementById('commentsDisplay');
    if (nameInput.value.trim() !== "" && phoneInput.value.trim() !== "" && emailInput.value.trim() !== "" && commentInput.value.trim() !== "") {
        const newComment = {
            name: nameInput.value,
            phone: phoneInput.value,
            email: emailInput.value,
            text: commentInput.value
        };
        // Guardar el comentario en Local Storage
        const comments = JSON.parse(localStorage.getItem('comments')) || [];
        comments.push(newComment);
        localStorage.setItem('comments', JSON.stringify(comments));
        // Mostrar el nuevo comentario
        const commentElement = document.createElement('div');
        commentElement.classList.add('comment');
        commentElement.innerHTML = `<strong>${newComment.name}</strong>: ${newComment.text}`;
        commentsDisplay.appendChild(commentElement);
        // Enviar el correo
        emailjs.send("service_0p7n46g", "TU_TEMPLATE_ID", {
            name: newComment.name,
            phone: newComment.phone,
            email: newComment.email,
            message: newComment.text
        })
        .then(function(response) {
            console.log('SUCCESS!', response.status, response.text);
        }, function(error) {
            console.log('FAILED...', error);
        });
        // Limpiar los campos de texto
        nameInput.value = "";
        phoneInput.value = "";
        emailInput.value = "";
        commentInput.value = "";
    } else {
        alert("Por favor, completa todos los campos antes de enviar.");
    }
});