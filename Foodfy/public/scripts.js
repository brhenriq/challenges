const modalOverlay = document.querySelector('.modal_overlay');
const cards = document.querySelectorAll('.card');

for(let card of cards){
  card.addEventListener("click", function(){
    const receitaId = card.getAttribute("id");
    modalOverlay.classList.add('active');
    modalOverlay.querySelector("img").src = `/assets/${receitaId}.png`
  });
}

document.querySelector('.close_modal').addEventListener("click", function(){
  modalOverlay.classList.remove('active');
  modalOverlay.querySelector("iframe").src=``;
});