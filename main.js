document.addEventListener('DOMContentLoaded', () => {

	/**
	 * This section is for the slide-in animation of each section.
	 */
	function reveal() {
		var sections = document.getElementsByTagName('section');
		var windowHeight = window.innerHeight;
		for (var i = 0; i < sections.length; i++) {
			var elementTop = sections[i].getBoundingClientRect().top;
			var elementBottom = sections[i].getBoundingClientRect().bottom;
			var elementVisible = 10;
			// check if section is visible and has not animated the first time
			if ((elementTop < windowHeight - elementVisible) && (elementBottom > 0 && !sections[i].classList.contains('animated'))) {
				// odd numbered sections
				if ((i + 1) % 2 !== 0) { sections[i].classList.add('slide-left'); }
				// even numbered sections
				else { sections[i].classList.add('slide-right'); }
				// add animated class to mark finished first time
				sections[i].classList.add('animated');
			}
		}
	}

	// animate on load
	window.addEventListener('load', reveal);
	// animate on scroll
	window.addEventListener('scroll', reveal);

	/**
	 * This section is for toggling menu for mobile screens.
	 */
	var menu = document.querySelector('.menu');
	var menuBtn = document.querySelector('.menu-btn');
	menuBtn.addEventListener('click', () => {
		if (menu.classList.contains('bounce-in')) {
			// if menu already opebned, remove animation class to close it
			menu.classList.remove('bounce-in');
			menuBtn.innerHTML = '<i class="fa-solid fa-bars"></i>';
		} else {
			// otherwise open it with animation
			menu.classList.add('bounce-in');
			menuBtn.innerHTML = '<i class="fa-solid fa-times"></i>';
		}
	});

	var menuLinks = document.querySelectorAll('.menu-link');
	menuLinks.forEach((link, i) => {
		link.addEventListener('click', () => {
			// remove animation class to close menu when clicking on links
			menu.classList.remove('bounce-in');
			menuBtn.innerHTML = '<i class="fa-solid fa-bars"></i>';
		})
	})


	/**
	 * This section is for the FAQ accordions.
	 */
	var accordions = document.querySelectorAll('.accordion');
	accordions.forEach((accordion, i) => {
		accordion.addEventListener('click', () => {
			// save previous class list of current element
			var classes = accordion.classList;
			// remove all active classes so that only the current one is active,
			// this is necessary because we only want 1 active accordion,
			// otherwise multiple accordion can be toggled
			// (which is still a nice design but Treact website didn't do this)
			accordions.forEach((element, j) => {
				if (j !== i) { element.classList.remove('active'); }
			})
			// check if previous classes had active, remove it
			if (classes.contains('active')) { accordion.classList.remove('active'); }
			// otherwise add it
			else { accordion.classList.add('active'); }
		});
	});

	/**
	 * This section is for the review carousel.
	 */
	var carousel = document.querySelector('.carousel-wrapper');
	var reviews = document.querySelectorAll('.review');
	var prevBtn = document.getElementById('btn-prev');
	var nextBtn = document.getElementById('btn-next');

	let isDragging = false;
	let startPos = 0, currentTranslate = 0, prevTranslate = 0, currentIndex = 0;
	let animationID;

	reviews.forEach((item, index) => {
		item.addEventListener('dragstart', (e) => e.preventDefault());
		item.addEventListener('mousedown', dragStart(index));
		item.addEventListener('mouseup', dragEnd);
		item.addEventListener('mousemove', dragMove);
		item.addEventListener('mouseleave', dragEnd);
	});

	nextBtn.addEventListener('click', () => {
		currentIndex = (currentIndex + 1) % reviews.length;
		setReview();
	});

	prevBtn.addEventListener('click', () => {
		currentIndex = (currentIndex - 1 + reviews.length) % reviews.length;
		setReview();
	});

	function dragStart(index) {
		return function (event) {
			currentIndex = index;
			startPos = event.pageX;
			isDragging = true;
			animationID = requestAnimationFrame(animation);
			carousel.style.cursor = 'grabbing';
		}
	}

	function dragMove(event) {
		if (!isDragging) return;
		const currentPosition = event.pageX;
		currentTranslate = prevTranslate + currentPosition - startPos;
	}

	function dragEnd() {
		cancelAnimationFrame(animationID);
		isDragging = false;
		const movedBy = currentTranslate - prevTranslate;
		if (movedBy < -100) { currentIndex = (currentIndex + 1) % reviews.length; }
		if (movedBy > 100) { currentIndex = (currentIndex - 1 + reviews.length) % reviews.length; }
		setReview();
		carousel.style.cursor = 'grab';
	}

	function animation() {
		carousel.style.transform = `translateX(${currentTranslate}px)`;
		if (isDragging) requestAnimationFrame(animation);
	}

	function setReview() {
		currentTranslate = currentIndex * -carousel.offsetWidth;
		prevTranslate = currentTranslate;
		carousel.style.transform = `translateX(${currentTranslate}px)`;
	}

	window.addEventListener('resize', setReview);

});