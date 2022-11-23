const BookDetail = (book) => {
  let html = `<div id="bookDetail" class="book-detail invisible bg-white shadow rounded-md p-3 absolute pointer-events-none">
                <div flex flex-col items-center>
                  <h1 id="bookDetail-title" class="text-2xl text-center" >${book.title}</h1>
                  <h2 id="bookDetail-author-release" class="text-base text-center"> ${book.author} - ${book.releaseDate}</h2>
                </div>
                <div class="flex flex-col items-center">
                  <img id="bookDetail-cover" class="rounded-md m-2 w-40" src="${book.coverImage}">
                  <p id="bookDetail-pages" class="text-sm text-center">${book.pages} pages</p>
                </div>
              </div>`;

  return html;
};
