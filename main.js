// Get user input
document.querySelector(".search").addEventListener("click", () => {
  const search = document.querySelector("#search-query").value;

  fetchBooks(search);

  document.querySelector("#search-query").value = ""; // clear search bar
});

// Redirect "Enter" keypress to search button click

const input = document.querySelector("#search-query");

input.addEventListener("keypress", (event) => {
  if (event.key === "Enter") {
    event.preventDefault();
    document.querySelector(".search").click();
  }
});

const fetchBooks = function (query) {
  const search = query.toLowerCase().replaceAll(/\s+/g, "+");
  const url = `https://www.googleapis.com/books/v1/volumes?q=${search}`;
  try {
    fetch(url, {
      method: "GET",
      dataType: "json",
    })
      .then((data) => data.json()) //.then is a function that is called when the request resolves which accepts a callback
      .then((data) => addBooks(data));
  } catch (error) {
    console.log("Error occurred", error);
  }
};

const addBooks = function (data) {
  const books = [];

  data.items.forEach((item) => {
    const book = {
      title: item.volumeInfo.title || null,
      author: item.volumeInfo.authors
        ? item.volumeInfo.authors.join(", ")
        : null,
      pageCount: item.volumeInfo.pageCount || null,
      isbn: item.volumeInfo.industryIdentifiers
        ? item.volumeInfo.industryIdentifiers[0].identifier
        : null,
      imageURL: item.volumeInfo.imageLinks
        ? item.volumeInfo.imageLinks.thumbnail
        : null,
    };

    books.push(book);

    renderBooks(books);
  });
};

const renderBooks = function (books) {
  // empty books div
  document.querySelector(".books").replaceChildren();

  books.forEach((book) => {
    const template = `
      <div class="book col-md-6">
        <h4>${book.title}</h4>
        <div>Author: <strong>${book.author}</strong></div>
        <div>Pages: <strong>${book.pageCount}</strong></div>
        <div>ISBN: <strong>${book.isbn}</strong></div>
        <img src="${book.imageURL}" alt="" />
      </div>
    `;

    document.querySelector(".books").insertAdjacentHTML("beforeend", template);
  });
};
