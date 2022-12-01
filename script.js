'use strict';

let bookList = [];

//Variable to store the bookDetailContainer that will be added later if a search result is hovered over
let bookDetailContainer;

//Moved root out of renderBookList as I intend to use it in other functions
//Was worried it might make the .removeChild non-functioning but it seems to work fine
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

  //Add eventlisteners for each of the newly added search results
  for (let item of document.getElementsByClassName('book-list__item')) {

    //On mouse enter, render book with ID of the hovered over search result
    item.addEventListener('mouseenter', (e) => {
      renderBookWithId(e.target.getAttribute('book-id'));
    })
    
    //On mouse leave, toggle visibility of the bookDetailContainer
    item.addEventListener('mouseleave', (e) => {
      bookDetailContainer.classList.toggle("invisible");
    })

    //On mouse move, keep the bookDetailContainer positioned at the cursors position
    item.addEventListener('mousemove', (e) => {
      positionElement(bookDetailContainer, e.clientY, e.clientX);
    })
    
  }
}

//Fetch the details of the currently hovered over book based on the passed ID and pass the data to the renderBookDetail function
async function renderBookWithId(id) {
  await fetch('https://gik2f8-labs.herokuapp.com/books/' + id)
    .then((result) => result.json())
    .then((book) => {
      renderBookDetail(book)
    })
    .catch((e) => e);
}

// Add/Change the information of the book currently hovered over based on the passed data
function renderBookDetail(book) {

  //If the bookDetailContainer has been added to the page, update it. Otherwise add it and the bookDetail card
  if (bookDetailContainer) {
    document.getElementById('bookDetailContainer').innerHTML = BookDetail(book);
  } else {
    //Add the bookDetailContainer and the bookDetail card based on the html stored in the seperate js file
    root.insertAdjacentHTML('beforeend', BookDetailContainer(book));

    bookDetailContainer = document.getElementById('bookDetailContainer');

    //To keep the bookDetailContainer at the cursors position even when initially added use the positionElement function on creation
    positionElement(bookDetailContainer, MouseEvent.clientY, MouseEvent.clientX);
  }

  //Toggle visibility of the bookDetailContainer
  bookDetailContainer.classList.toggle('invisible');
}

//Position passed element to passed position on page
function positionElement(element, top, left) {

  //Only attempt to position element if the element is defined
  if (element) {

    //If the card would cause the page size to increase, mode the element up just enough not to instead
    if ((top + element.offsetHeight) > window.innerHeight) {
      top = window.innerHeight - element.offsetHeight;
    }

    element.style.top = top + 'px';
    element.style.left = left + 'px';
  }
}