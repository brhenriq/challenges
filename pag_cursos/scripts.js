const modalOverlay = document.querySelector('.modal_overlay');
const cards = document.querySelectorAll('.card');

for(let card of cards){
  card.addEventListener("click", function(){
    const cursoId = card.getAttribute("id");
    modalOverlay.classList.add('active');
    modalOverlay.querySelector("iframe").src=`https://rocketseat.com.br/${cursoId}`;
  });
}

document.querySelector('.close_modal').addEventListener("click", function(){
  modalOverlay.classList.remove('active');
  modalOverlay.querySelector("iframe").src=``;
});

