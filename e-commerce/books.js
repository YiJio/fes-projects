let books;

async function renderBooks(filter) {

	const booksGrid = document.querySelector('.books-grid');
	booksGrid.classList.add('books-loading');
	if (!books) { books = await getBooks(); }
	booksGrid.classList.remove('books-loading');
	if (filter === 'LOW_TO_HIGH') {
		books.sort((a, b) => (a.salePrice || a.originalPrice) - (b.salePrice || b.originalPrice));
	} else if (filter === 'HIGH_TO_LOW') {
		books.sort((a, b) => (b.salePrice || b.originalPrice) - (a.salePrice || a.originalPrice));
	} else if (filter === 'RATING') {
		books.sort((a, b) => b.rating - a.rating);
	}

	const booksHtml = books.map((book) => {
		return `<div class='book'>
			<div class='book-wrapper'>
				<figure class='book-img-wrapper'>
					<img class='book-img' src='${book.imgSrc}' alt=''>
				</figure>
				<div class='book-title'>${book.title}</div>
				<div class='book-rating'>${ratingsHTML(book.rating)}</div>
				<div class='book-prices'>${priceHTML(book.originalPrice, book.salePrice)}</div>
			</div>
		</div>`;
	}).join('');
	booksGrid.innerHTML = booksHtml;

}

function priceHTML(originalPrice, salePrice) {
	if (!salePrice) { return `<span class='book-price'>$${originalPrice.toFixed(2)}</span>`; }
	return `<span class='book-price original'>$${originalPrice.toFixed(2)}</span><span class='book-price'>$${salePrice.toFixed(2)}</span>`;
}

function ratingsHTML(rating) {
	let ratingHTML = '';
	for (let i = 0; i < Math.floor(rating); i++) { ratingHTML += `<i class='fas fa-star'></i>`; }
	if (!Number.isInteger(rating)) { ratingHTML += `<i class='fas fa-star-half-alt'></i>`; }
	return ratingHTML;
}

function filterBooks(event) {
	renderBooks(event.target.value);
}

setTimeout(() => {
	renderBooks();
});

// data
const bookData = [
	{ id:1, title:'Crack the Coding Interview', imgSrc:'assets/crack the coding interview.png', originalPrice:49.95, salePrice:14.95, rating:4.5 },
	{ id:2, title:'Atomic Habits', imgSrc:'assets/atomic habits.jpg', originalPrice:39, salePrice:'', rating:5 },
	{ id:3, title:'Deep Work', imgSrc:'assets/deep work.jpeg', originalPrice:29, salePrice:12, rating:5 },
	{ id:4, title:'The 10X Rule', imgSrc:'assets/book-1.jpeg', originalPrice:44, salePrice:19, rating:4.5 },
	{ id:5, title:'Be Obsessed Or Be Average', imgSrc:'assets/book-2.jpeg', originalPrice:32, salePrice:17, rating:4 },
	{ id:6, title:'Rich Dad Poor Dad', imgSrc:'assets/book-3.jpeg', originalPrice:70, salePrice:12.5, rating:5 },
	{ id:7, title:'Cashflow Quadrant', imgSrc:'assets/book-4.jpeg', originalPrice:11, salePrice:10, rating:4 },
	{ id:8, title:'48 Laws of Power', imgSrc:'assets/book-5.jpeg', originalPrice:38, salePrice:17.95, rating:4.5 },
	{ id:9, title:'The 5 Second Rule', imgSrc:'assets/book-6.jpeg', originalPrice:35, salePrice:'', rating:2 },
	{ id:10, title:'Your Next Five Moves', imgSrc:'assets/book-7.jpg', originalPrice:40, salePrice:'', rating:4 },
	{ id:11, title:'Mastery', imgSrc:'assets/book-8.jpeg', originalPrice:30, salePrice:'', rating:4.5 },
];

function getBooks() {
	return new Promise((resolve) => {
		setTimeout(() => {
			resolve(bookData);
		}, 1000);
	});
}
