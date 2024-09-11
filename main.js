/**
 * This section is for the FAQ accordions.
 */
var accordions = document.querySelectorAll('.accordion');
accordions.forEach(function(accordion, i) {
	accordion.addEventListener('click', function() {
		// save previous class list of current element
		var classes = this.classList;
		// remove all active classes so that only the current one is active,
		// this is necessary because we only want 1 active accordion,
		// otherwise multiple accordion can be toggled
		// (which is still a nice design but Treact website didn't do this)
		accordions.forEach(function(element, j) {
			if(j !== i) {	element.classList.remove('active'); }
		})
		// check if previous classes had active, remove it
		if(classes.contains('active')) { this.classList.remove('active'); }
		// otherwise add it
		else { this.classList.add('active'); }
	});
});

/**
 * This section is for the review carousel.
 */
var carousel = document.querySelector('.carousel-wrapper');
var reviews = document.querySelectorAll('.review');
var prevBtn = document.getElementById('btn-prev');
var nextBtn = document.getElementById('btn-next');

let startX, scrollLeft, isDown = false;
let currentIndex = 0;

carousel.addEventListener('mousedown', (e) => {
	isDown = true;
	carousel.classList.add('active');
  startX = e.pageX - carousel.offsetLeft;
  scrollLeft = carousel.scrollLeft;
});
carousel.addEventListener('mouseleave', (e) => {
	isDown = false;
	carousel.classList.remove('active');
});
carousel.addEventListener('mouseup', (e) => {
	isDown = false;
	carousel.classList.remove('active');
});
carousel.addEventListener('mousemove', (e) => {
	if(!isDown) return;
	e.preventDefault();
  const x = e.pageX - carousel.offsetLeft;
  const walk = (x - startX) * 2;
  carousel.scrollLeft = scrollLeft - walk;
});
// function that scrolls to the review by pagination buttons
function scrollToReview(index) {
	if(index >= reviews.length) { index = 0; }
	if(index < 0) { index = reviews.length - 1; }
	var width = reviews[0].offsetWidth;
	carousel.scrollTo({ left:width * index, behavior:'smooth' });
	currentIndex = index;
}
prevBtn.addEventListener('click', () => {
  scrollToReview(currentIndex - 1);
});
nextBtn.addEventListener('click', () => {
  scrollToReview(currentIndex + 1);
});