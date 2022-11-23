'use strict';

let bookList = [];
let bookDetailsRendered = false;
const root = document.getElementById('root');

window.addEventListener('load', () => {
  getAll().then((apiBooks) => (bookList = apiBooks));
});

searchField.addEventListener('keyup', (e) =>
  renderBookList(
    bookList.filter(({ title, author}) => {
      const searchTerm = e.target.value.toLowerCase();
      return (
        title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        author.toLowerCase().includes(searchTerm.toLowerCase())
      );
    })
  )
);

function renderBookList(bookList) {
  const existingElement = document.querySelector('.book-list');

  existingElement && root.removeChild(existingElement);
  bookList.length > 0 && searchField.value && root.insertAdjacentHTML('beforeend', BookList(bookList));

  for (let item of document.getElementsByClassName('book-list__item')) {
    item.addEventListener('mouseenter', (e) => {

      const targetId = e.target.getAttribute('book-id');

      renderBookWithID(targetId);
    })
    
    item.addEventListener('mouseleave', (e) => {
      document.getElementById("bookDetail").classList.toggle("invisible");
    })

    item.addEventListener('mousemove', (e) => {
      positionElement(bookDetail, e.clientY, e.clientX);
    })
    
  }
}

async function renderBookWithID(id) {
  const result = await fetch('https://gik2f8-labs.herokuapp.com/books/' + id)
    .then((result) => result.json())
    .then((book) => {
      renderBookDetail(book)
    })
    .catch((e) => e);
}

function renderBookDetail(book) {

  if (!bookDetailsRendered) {
    root.insertAdjacentHTML('beforeend', BookDetail(book))
    bookDetailsRendered = true;
  }

  console.log(document.getElementById("bookDetail-title").innerHTML);
  document.getElementById("bookDetail-title").innerHTML = book.title;
  document.getElementById("bookDetail-author-release").innerHTML = `${book.author} - ${book.releaseDate}`;
  document.getElementById("bookDetail-cover").setAttribute('src', book.coverImage);
  document.getElementById("bookDetail-pages").innerHTML = book.pages + " pages";

  document.getElementById("bookDetail").classList.toggle("invisible");
}

function positionElement(element, top, left) {
  element.style.top = top + 'px';
  element.style.left = left + 'px';
}