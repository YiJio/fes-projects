document.addEventListener('DOMContentLoaded', () => {

	let yiji = document.querySelectorAll('.svg-logo-y');
	let o = document.querySelectorAll('.svg-logo-o');
	let ne = document.querySelectorAll('.svg-logo-n');

	yiji.forEach((el, i) => { el.classList.add('svg-up'); });
	o.forEach((el, i) => { el.classList.add('svg-drop'); });
	ne.forEach((el, i) => { el.classList.add('svg-slide'); });

});

let isModalOpen = false;
let contrastToggle = false;
const scaleFactor = 1 / 20;

function moveBackground(e) {
  const shapes = document.querySelectorAll('.shape');
  const x = e.clientX * scaleFactor;
  const y = e.clientY * scaleFactor;
  for (let i = 0; i < shapes.length; ++i) {
    const isOdd = i % 2 !== 0;
    const boolInt = isOdd ? -1 : 1;
    shapes[i].style.transform = `translate(${x * boolInt}px, ${y * boolInt}px) rotate(${x * boolInt * 10}deg)`;
  }
}

function toggleContrast() {
  contrastToggle = !contrastToggle;
  if (contrastToggle) { document.body.classList.add('dark'); }
  else { document.body.classList.remove('dark'); }
}

function toggleModal() {
	if(isModalOpen) {
		isModalOpen = false;
		return document.body.classList.remove('modal-open');
	}
	isModalOpen = true;
	document.body.classList.add('modal-open');
}

function contact(e) {
  e.preventDefault();
  const loading = document.querySelector('.modal-overlay-loading');
  const success = document.querySelector('.modal-overlay-success');
  loading.classList += ' modal-overlay-visible';
  emailjs
    .sendForm('service_x2xaeo7', 'template_tpxl4na', e.target, '1NwaApAvLC5dml1IX')
    .then(() => {
      loading.classList.remove('modal-overlay-visible');
      success.classList += ' modal-overlay-visible';
    })
    .catch(() => {
      loading.classList.remove('modal-overlay-visible');
      alert('The email service is temporarily unavailable. Please contact me directly on inquiry@yijione.com.');
    });
}