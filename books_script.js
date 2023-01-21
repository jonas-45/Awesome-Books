const form = document.getElementById("form");
let booksContainer = document.querySelector(".books-container");
let books = JSON.parse(localStorage.getItem("books")) || [];
let bookId = "";

function showBook(book){
  document.getElementById("no-books").style.display = "none";
  booksContainer.innerHTML += `<div class="single-book book${book.bid}">
  <p class="book-title">${book.title}</p>
  <p class="book-author">${book.author}</p>
  <button type="button" id = "${book.bid}" class="remove-button">Remove</button>
  <hr>
</div>`

AddRemoveListerToButtons();

}

function getBooksFromLocalStorage(){

  if(books.length > 0){
    document.getElementById("no-books").style.display = "none";
    books.forEach((book) => {
      showBook(book);
    })
  }
}

function addBook(event){
  event.preventDefault();
  bookId = Math.floor(Math.random() * 1000);

  let newBook = {
    title: document.getElementById("booktitle").value, 
    author: document.getElementById("bookauthor").value,
    bid: bookId
  };

  books.push(newBook);
  form.reset();
  showBook(newBook); 
  localStorage.setItem("books",JSON.stringify(books));

}

function AddRemoveListerToButtons(){
  let removeButtons = document.querySelectorAll(".remove-button");
  removeButtons.forEach((button,index) => {
    button.addEventListener("click", (e) => {
      removeBook(e.target.id);
    });
  });
}

function removeBook(bid){
  books = books.filter((book) => {
    console.log("bookID: " + book.bid);
    return book.bid != bid;
  })
  localStorage.setItem("books",JSON.stringify(books));
  let bookClass = ".book" + bid;
  booksContainer.removeChild(document.querySelector(bookClass));
  const noBooks = document.getElementById("no-books");
  books.length < 1 ? noBooks.style.display = "block" : noBooks.style.display = "none";
}

function takeOffBook(id){
  books.splice(id,1);
}

getBooksFromLocalStorage(books);

form.addEventListener('submit',addBook);