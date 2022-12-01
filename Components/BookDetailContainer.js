//The bookDetailContainer which also contains the bookDetail element so that it doesn't have to be added seperately in the script.js file

const BookDetailContainer = (book) => {
  let html = `<div id="bookDetailContainer" class="absolute pointer-events-none">
                ${bookDetail(book)}
              </div>`;

  return html;
};