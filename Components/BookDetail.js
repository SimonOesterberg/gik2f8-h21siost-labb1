//The bookDetail element with all the book information passed being displayed in the correct place

const BookDetail = (book) => {
  let html = `<div class="bg-white shadow rounded-md p-3">
                <div flex flex-col items-center>
                  <h1 class="text-2xl text-center" >${book.title}</h1>
                  <h2 class="text-base text-center"> ${book.author} - ${book.releaseDate}</h2>
                </div>
                <div class="flex flex-col items-center">
                  <img class="rounded-md m-2 w-40" src="${book.coverImage}">
                  <p class="text-sm text-center">${book.pages} pages</p>
                </div>
              </div>`;

  return html;
};